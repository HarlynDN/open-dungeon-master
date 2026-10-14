"""Download pinned official Chinese weights/config/voices; never overwrite v1.0."""
import hashlib
import os
from pathlib import Path
from huggingface_hub import snapshot_download

REVISION = "01e7505bd6a7a2ac4975463114c3a7650a9f7218"
root = Path(os.environ.get("KOKORO_ZH_DIR", "models/zh"))
snapshot_download("hexgrad/Kokoro-82M-v1.1-zh", revision=REVISION,
                  allow_patterns=["config.json", "kokoro-v1_1-zh.pth", "voices/z*.pt"], local_dir=root)
assert hashlib.sha256((root / "kokoro-v1_1-zh.pth").read_bytes()).hexdigest() == "b1d8410fa44dfb5c15471fd6c4225ea6b4e9ac7fa03c98e8bea47a9928476e2b"
print("Verified official v1.1-zh model; Chinese voices:", len(list((root / "voices").glob("z*.pt"))))
