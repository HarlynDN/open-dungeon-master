"""Local OpenAI-compatible router: Chinese 1.1, existing English 1.0 service."""
import hashlib
import io
import json
import os
from pathlib import Path
import re
import threading
import urllib.error
import urllib.request

from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel, Field

VERSION = "1.0.0"
ZH_MODEL = "kokoro-v1.1-zh"
ZH_HASH = "b1d8410fa44dfb5c15471fd6c4225ea6b4e9ac7fa03c98e8bea47a9928476e2b"
MODEL_DIR = Path(os.environ.get("KOKORO_ZH_DIR", "models/zh"))
EN_URL = os.environ.get("KOKORO_EN_URL", "http://127.0.0.1:8880").rstrip("/")
app = FastAPI(title="ODM Kokoro bilingual router", version=VERSION)
_lock = threading.Lock()
_pipeline = None
# Loopback calls must not be sent to an externally configured HTTP proxy.
_http = urllib.request.build_opener(urllib.request.ProxyHandler({}))


def chinese_voices():
    return sorted(p.stem for p in (MODEL_DIR / "voices").glob("*.pt")
                  if re.fullmatch(r"z[fm]_\d{3}", p.stem))


def upstream(route, payload=None):
    req = urllib.request.Request(EN_URL + route,
        data=None if payload is None else json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"})
    try:
        with _http.open(req, timeout=180 if payload else 4) as r:
            return r.read(), r.headers.get("Content-Type", "audio/mpeg")
    except urllib.error.HTTPError as e:
        raise HTTPException(e.code, "English Kokoro service rejected the request") from e
    except (OSError, TimeoutError) as e:
        raise HTTPException(502, "English Kokoro service is unavailable") from e


@app.get("/health")
def health():
    return {"service": app.title, "version": VERSION, "chineseModel": ZH_MODEL,
            "chineseModelSha256": ZH_HASH, "chineseLoaded": _pipeline is not None,
            "chineseVoiceCount": len(chinese_voices()), "englishModel": "kokoro-v1.0"}


@app.get("/v1/audio/voices")
def voices(model: str = "kokoro"):
    if model == ZH_MODEL:
        return {"voices": chinese_voices(), "model": ZH_MODEL}
    if model not in ("kokoro", "kokoro-v1.0"):
        raise HTTPException(400, "Unknown model")
    raw, _ = upstream("/v1/audio/voices")
    entries = json.loads(raw).get("voices", [])
    ids = [v if isinstance(v, str) else v.get("id", "") for v in entries]
    return {"voices": [v for v in ids if re.match(r"[ab][fm]_", v)], "model": "kokoro-v1.0"}


class Speech(BaseModel):
    model: str = "kokoro"
    input: str = Field(min_length=1, max_length=5000)
    voice: str = Field(min_length=1, max_length=120)
    speed: float = Field(default=1, ge=0.5, le=2)
    response_format: str = "mp3"
    lang_code: str | None = None


def load_chinese():
    global _pipeline
    if _pipeline is None:
        import torch
        from kokoro import KModel, KPipeline
        file = MODEL_DIR / "kokoro-v1_1-zh.pth"
        if hashlib.sha256(file.read_bytes()).hexdigest() != ZH_HASH:
            raise RuntimeError("Chinese model hash mismatch")
        torch.set_num_threads(int(os.environ.get("KOKORO_CPU_THREADS", "4")))
        repo = "hexgrad/Kokoro-82M-v1.1-zh"
        model = KModel(repo_id=repo, config=str(MODEL_DIR / "config.json"), model=str(file)).to("cpu").eval()
        english = KPipeline(lang_code="a", model=False, repo_id="hexgrad/Kokoro-82M")
        _pipeline = KPipeline(lang_code="z", repo_id=repo, model=model,
                              en_callable=lambda text: english.g2p(text)[0], device="cpu")
    return _pipeline


@app.post("/v1/audio/speech")
def speech(body: Speech):
    if not body.input.strip():
        raise HTTPException(400, "Empty speech")
    if body.response_format not in ("mp3", "wav"):
        raise HTTPException(400, "Supported formats: mp3, wav")
    if body.model in ("kokoro", "kokoro-v1.0"):
        if body.lang_code == "z" or not all(re.fullmatch(r"[ab][fm]_[\w]+(?:\(\d+\))?", v.strip()) for v in body.voice.split("+")):
            raise HTTPException(400, "Chinese requests require kokoro-v1.1-zh and a v1.1 voice")
        payload = body.model_dump(exclude_none=True)
        payload["model"] = "kokoro"
        audio, content_type = upstream("/v1/audio/speech", payload)
        return Response(audio, media_type=content_type, headers={"X-Kokoro-Model": "kokoro-v1.0"})
    if body.model != ZH_MODEL:
        raise HTTPException(400, "Unknown model")
    if body.lang_code not in (None, "z") or body.voice not in chinese_voices():
        raise HTTPException(400, "Choose an installed v1.1 Chinese voice")
    if not _lock.acquire(timeout=120):
        raise HTTPException(503, "Chinese speech queue is busy")
    try:
        import numpy as np
        import soundfile as sf
        pipe = load_chinese()
        chunks = [r.audio.numpy() for r in pipe(body.input, voice=str(MODEL_DIR / "voices" / (body.voice + ".pt")), speed=body.speed)]
        if not chunks:
            raise HTTPException(422, "No speakable text")
        audio = np.concatenate(chunks)
        if not np.isfinite(audio).all() or len(audio) == 0:
            raise HTTPException(500, "Invalid synthesized audio")
        buffer = io.BytesIO()
        sf.write(buffer, audio, 24000, format=body.response_format.upper())
        return Response(buffer.getvalue(), media_type="audio/mpeg" if body.response_format == "mp3" else "audio/wav",
                        headers={"X-Kokoro-Model": ZH_MODEL, "X-Kokoro-Model-SHA256": ZH_HASH})
    finally:
        _lock.release()
