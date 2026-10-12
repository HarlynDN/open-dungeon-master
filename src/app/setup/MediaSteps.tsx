"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { setupSpeechErrorText } from "@/lib/i18n/setup-media-presentations";

import { Check, Loader2, X, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { registerOutput, releaseOutput } from "@/lib/audio-devices";
import { ui } from "@/lib/ui";
import { Select } from "@/components/ui/Select";
import { BuiltinSpeechCard } from "@/app/admin/BuiltinSpeechCard";
import { HarnessPictureTest } from "@/app/admin/HarnessPictureTest";
import type { Draft } from "@/app/setup/draft";
import { ChoiceCard, ChoiceCards, Lamp, host, type ScanResult } from "@/app/setup/SetupParts";

// Pictures and Voice: optional, so each offers "none" as a real answer, and
// each prefers what the scan found on this computer (free) over anything
// billed to a key.

type Update = (change: (draft: Draft) => Draft) => void;

const KOKORO_COMMAND = "docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest";
// Protocol examples stay byte-for-byte identical across UI locales.
const MEDIA_EXAMPLES = { apiKey: "sk-...", comfy: "http://127.0.0.1:8188", kokoro: "http://127.0.0.1:8880", voice: "af_heart" } as const;

const MEDIA_GUIDE = "https://github.com/Lebbitheplow/open-dungeon-master/blob/main/docs/media-setup.md";

function KeyField({ label, value, onChange, saved, hint }: { label: string; value: string; onChange: (value: string) => void; saved: boolean; hint: string }) {
  const { t } = useLocale();
  return (
    <label className="reveal block">
      <span className="mb-1 block text-xs font-medium text-stone-400">{label}</span>
      <input
        type="password"
        className={ui.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={saved ? t("setupMedia.key.saved") : MEDIA_EXAMPLES.apiKey}
        autoComplete="off"
      />
      <span className="mt-1 block text-[11px] text-stone-500">{hint}</span>
    </label>
  );
}

export function PicturesStep({
  draft,
  update,
  scan,
  scanning,
  storyIsOpenAi,
  agentPaints,
  agentVerified,
  agentLabel,
  onAgentVerified,
  openaiKeySaved,
}: {
  draft: Draft;
  update: Update;
  scan: ScanResult | null;
  scanning: boolean;
  storyIsOpenAi: boolean;
  // The storyteller chosen on the last step has an image tool of its own.
  agentPaints: boolean;
  // A test picture has come back from it on this server.
  agentVerified: boolean;
  agentLabel: string;
  onAgentVerified: () => void;
  openaiKeySaved: boolean;
}) {
  const { t } = useLocale();
  const comfy = scan?.comfyui ?? null;
  const pick = (pictures: Draft["pictures"]) =>
    update((current) => ({
      ...current,
      pictures,
      comfy: pictures === "comfyui" && !current.comfy.url && comfy ? { url: comfy.url, checkpoint: current.comfy.checkpoint || comfy.checkpoints[0] || "" } : current.comfy,
    }));
  const setComfy = (patch: Partial<Draft["comfy"]>) => update((current) => ({ ...current, comfy: { ...current.comfy, ...patch } }));

  return (
    <div className="space-y-4">
      <ChoiceCards label={t("setupMedia.pictures.title")}>
        <ChoiceCard
          picked={draft.pictures === "comfyui"}
          onPick={() => pick("comfyui")}
          glyph="sense-truesight"
          title={t("setupMedia.pictures.comfyTitle")}
          sub={t("setupMedia.pictures.comfyHelp")}
          badge={scanning ? { text: t("setupMedia.looking"), tone: "off" } : comfy ? { text: t("setupMedia.found"), tone: "ready" } : { text: t("setupMedia.notFound"), tone: "off" }}
        />
        <ChoiceCard
          picked={draft.pictures === "openai"}
          onPick={() => pick("openai")}
          glyph="tab-admin"
          title={t("setupMedia.pictures.openaiTitle")}
          sub={t(storyIsOpenAi ? "setupMedia.pictures.sharedKey" : "setupMedia.pictures.separateKey")}
        />
        {agentPaints ? (
          <ChoiceCard
            picked={draft.pictures === "agent"}
            onPick={() => pick("agent")}
            glyph="system-share"
            title={t("setupMedia.pictures.agentTitle", { label: agentLabel })}
            sub={
              agentVerified
                ? t("setupMedia.pictures.agentVerified", { label: agentLabel })
                : t("setupMedia.pictures.agentTest", { label: agentLabel })
            }
            badge={agentVerified ? { text: t("setupMedia.tested"), tone: "ready" } : null}
          />
        ) : null}
        <ChoiceCard
          picked={draft.pictures === "none"}
          onPick={() => pick("none")}
          glyph="tab-handout"
          title={t("setupMedia.pictures.noneTitle")}
          sub={t("setupMedia.pictures.noneHelp")}
        />
      </ChoiceCards>

      {draft.pictures === "comfyui" ? (
        <div key="comfy" className="reveal-height space-y-3">
          {!comfy && !scanning ? (
            <p className="su-note">
              {t("setupMedia.pictures.notRunning")}{" "}
              <a href={MEDIA_GUIDE} target="_blank" rel="noreferrer" className="text-amber-200 underline">
                {t("setupMedia.pictures.installGuide")}
              </a>
              .
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.address")}</span>
              <input className={ui.input} value={draft.comfy.url} onChange={(event) => setComfy({ url: event.target.value })} placeholder={MEDIA_EXAMPLES.comfy} />
            </label>
            {comfy?.checkpoints.length ? (
              <div role="group" aria-label={t("setupMedia.pictures.modelFile")} className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.checkpoint")}</span>
                <Select
                  value={draft.comfy.checkpoint}
                  onChange={(checkpoint) => setComfy({ checkpoint })}
                  options={comfy.checkpoints.map((name) => ({ value: name, label: name }))}
                  label={t("setupMedia.pictures.checkpoint")}
                  className="w-full"
                />
              </div>
            ) : (
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.checkpoint")}</span>
                <input className={ui.input} value={draft.comfy.checkpoint} onChange={(event) => setComfy({ checkpoint: event.target.value })} placeholder={t("setupMedia.pictures.fileHint")} />
              </label>
            )}
          </div>
          <p className="text-[11px] text-stone-500">{t("setupMedia.pictures.compatible")}</p>
        </div>
      ) : draft.pictures === "agent" ? (
        <div key="agent" className="reveal-height">
          <HarnessPictureTest
            saved
            picturesVerified={agentVerified}
            picturesForTables={false}
            offerAdopt={false}
            onVerified={onAgentVerified}
          />
        </div>
      ) : draft.pictures === "openai" ? (
        <div key="openai" className="reveal-height space-y-3">
          {storyIsOpenAi ? (
            <p className="su-note">{t("setupMedia.pictures.useStoryKey")}</p>
          ) : (
            <KeyField
              label={t("setupMedia.key.label")}
              value={draft.picturesKey}
              onChange={(picturesKey) => update((current) => ({ ...current, picturesKey }))}
              saved={openaiKeySaved}
              hint={t("setupMedia.pictures.keyHelp")}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

type TestResult = { ok: boolean; model?: string; voice?: string; audio?: string; error?: string };

function NarrationTest({ body }: { body: Record<string, string> }) {
  const { locale, t } = useLocale();
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function test() {
    setTesting(true);
    setResult(null);
    audioRef.current?.pause();
    try {
      const response = await fetch("/api/admin/tts-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => null)) as TestResult | null;
      const readable = response.ok && data && typeof data.ok === "boolean" && (!data.ok || typeof data.audio === "string" && data.audio.length > 0);
      const result: TestResult = readable ? data : { ok: false, error: data?.error || "The test request failed without an answer." };
      setResult(result);
      if (result.ok && result.audio) {
        if (audioRef.current) releaseOutput(audioRef.current);
        const audio = registerOutput(new Audio(result.audio));
        audioRef.current = audio;
        audio.onended = () => releaseOutput(audio);
        void audio.play().catch(() => {});
      }
    } catch {
      setResult({ ok: false, error: "Could not reach this server." });
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="space-y-2">
      <button type="button" onClick={test} disabled={testing} aria-busy={testing} className={ui.btnSmall}>
        {testing ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />} {t("setupMedia.test.hear")}
      </button>
      {result?.ok ? (
        <p role="status" className="live-in flex items-center gap-1 text-sm text-emerald-400">
          <Check className="tick-in size-4" /> {t("setupMedia.test.success", { model: result.model ?? "", voice: result.voice ?? "" })}
        </p>
      ) : result ? (
        <p role="alert" className="motion-shake flex items-start gap-1 text-sm text-red-400">
          <X className="mt-0.5 size-4 shrink-0" /> {setupSpeechErrorText(result.error || "The speech server did not answer.", locale)}
        </p>
      ) : null}
    </div>
  );
}

export function VoiceStep({
  draft,
  update,
  scan,
  scanning,
  storyIsOpenAi,
  ttsKeySaved,
}: {
  draft: Draft;
  update: Update;
  scan: ScanResult | null;
  scanning: boolean;
  storyIsOpenAi: boolean;
  ttsKeySaved: boolean;
}) {
  const { t } = useLocale();
  const kokoro = scan?.kokoro ?? null;
  const whisper = scan?.whisper ?? null;
  const pick = (narration: Draft["narration"]) =>
    update((current) => ({
      ...current,
      narration,
      kokoro:
        narration === "kokoro" && !current.kokoro.url && kokoro
          ? { url: kokoro.url, voice: current.kokoro.voice || (kokoro.voices.includes("af_heart") ? "af_heart" : kokoro.voices[0] ?? "") }
          : current.kokoro,
    }));
  const setKokoro = (patch: Partial<Draft["kokoro"]>) => update((current) => ({ ...current, kokoro: { ...current.kokoro, ...patch } }));

  return (
    <div className="space-y-4">
      <ChoiceCards label={t("setupMedia.voice.title")}>
        <ChoiceCard
          picked={draft.narration === "kokoro"}
          onPick={() => pick("kokoro")}
          glyph="tab-ambience"
          title={t("setupMedia.voice.kokoroTitle")}
          sub={t("setupMedia.voice.kokoroHelp")}
          badge={scanning ? { text: t("setupMedia.looking"), tone: "off" } : kokoro ? { text: t("setupMedia.found"), tone: "ready" } : { text: t("setupMedia.notFound"), tone: "off" }}
        />
        <ChoiceCard
          picked={draft.narration === "openai"}
          onPick={() => pick("openai")}
          glyph="tab-admin"
          title={t("setupMedia.voice.openaiTitle")}
          sub={t(storyIsOpenAi ? "setupMedia.voice.sharedKey" : "setupMedia.voice.separateKey")}
        />
        <ChoiceCard
          picked={draft.narration === "off"}
          onPick={() => pick("off")}
          glyph="tab-handout"
          title={t("setupMedia.voice.offTitle")}
          sub={t("setupMedia.voice.offHelp")}
        />
      </ChoiceCards>

      {draft.narration === "kokoro" ? (
        <div key="kokoro" className="reveal-height space-y-3">
          {!kokoro && !scanning ? (
            <p className="su-note">
              {t("setupMedia.voice.notRunning")}{" "}
              <code className="text-amber-100">{KOKORO_COMMAND}</code>.{" "}
              <a href={MEDIA_GUIDE} target="_blank" rel="noreferrer" className="text-amber-200 underline">
                {t("setupMedia.voice.guide")}
              </a>
              .
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.voice.address")}</span>
              <input className={ui.input} value={draft.kokoro.url} onChange={(event) => setKokoro({ url: event.target.value })} placeholder={MEDIA_EXAMPLES.kokoro} />
            </label>
            {kokoro?.voices.length ? (
              <div role="group" aria-label={t("setupMedia.voice.default")} className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.voice.default")}</span>
                <Select
                  value={draft.kokoro.voice}
                  onChange={(voice) => setKokoro({ voice })}
                  options={kokoro.voices.map((voice) => ({ value: voice, label: voice }))}
                  label={t("setupMedia.voice.default")}
                  className="w-full"
                />
              </div>
            ) : (
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.voice.default")}</span>
                <input className={ui.input} value={draft.kokoro.voice} onChange={(event) => setKokoro({ voice: event.target.value })} placeholder={MEDIA_EXAMPLES.voice} />
              </label>
            )}
          </div>
          <NarrationTest body={{ provider: "kokoro", kokoroUrl: draft.kokoro.url, voice: draft.kokoro.voice }} />
        </div>
      ) : draft.narration === "openai" ? (
        <div key="openai" className="reveal-height space-y-3">
          {storyIsOpenAi ? null : (
            <KeyField
              label={t("setupMedia.key.label")}
              value={draft.narrationKey}
              onChange={(narrationKey) => update((current) => ({ ...current, narrationKey }))}
              saved={ttsKeySaved}
              hint={t("setupMedia.voice.keyHelp")}
            />
          )}
          <NarrationTest body={{ provider: "openai", baseUrl: "", apiKey: draft.narrationKey }} />
        </div>
      ) : null}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-stone-200">{t("setupMedia.dictation.title")}</h4>
        {whisper ? (
          <p className="su-row text-sm text-stone-300">
            <Lamp tone="ok" /> {t("setupMedia.dictation.whisper", { host: host(whisper.url) })}
          </p>
        ) : storyIsOpenAi ? (
          <p className="su-row text-sm text-stone-300">
            <Lamp tone="ok" /> {t("setupMedia.dictation.openai")}
          </p>
        ) : (
          <>
            <p className="text-xs text-stone-500">
              {t("setupMedia.dictation.builtin")}
            </p>
            <BuiltinSpeechCard />
          </>
        )}
      </div>
    </div>
  );
}
