"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { setupSpeechErrorText } from "@/lib/i18n/setup-media-presentations";

import { Check, Loader2, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { registerOutput, releaseOutput } from "@/lib/audio-devices";
import { CHECKPOINT_PRESET, comfyModel } from "@/lib/image-models/catalog";
import { honoursNegative } from "@/lib/image-models/workflow";
import { ui } from "@/lib/ui";
import { Select } from "@/components/ui/Select";
import { comfyModelOptions, comfyModelPatch, fetchComfyModels } from "@/app/admin/AdminImagesSection";
import { BuiltinSpeechCard } from "@/app/admin/BuiltinSpeechCard";
import { ModelChoiceField } from "@/app/admin/ModelChoice";
import type { ModelChoices } from "@/lib/model-registry/registry";
import { BLANK, SPEECH_MODELS, fromEnv } from "@/app/admin/model-blanks";
import type { EnvDefaults } from "@/app/admin/AdminSettingsFields";
import { HarnessPictureTest } from "@/app/admin/HarnessPictureTest";
import { comfyFromScan, type Draft, type ModelField } from "@/app/setup/draft";
import { ChoiceCard, ChoiceCards, Lamp, host, type ScanResult } from "@/app/setup/SetupParts";

const OPENAI_V1 = "https://api.openai.com/v1";

// A model field's answer, remembered so that coming back to the step never
// fills a None the admin chose (Draft.answered).
const answer = (current: Draft, field: ModelField): Draft["answered"] =>
  current.answered.includes(field) ? current.answered : [...current.answered, field];
// A Whisper service's only model already runs a blank field, which then
// follows the service; the recommended model is filled only among several.
const severalListed = (choices: ModelChoices) => choices.models.filter((model) => model.listed).length > 1;

// Pictures and Voice: optional, so each offers "none" as a real answer, and
// each prefers what the scan found on this computer (free) over anything
// billed to a key.

type Update = (change: (draft: Draft) => Draft) => void;

const KOKORO_COMMAND = "docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest";
// Protocol examples stay byte-for-byte identical across UI locales.
const MEDIA_EXAMPLES = { apiKey: "sk-...", comfy: "http://127.0.0.1:8188", kokoro: "http://127.0.0.1:8880", voice: "af_heart" } as const;

const MEDIA_GUIDE = "https://github.com/Lebbitheplow/open-dungeon-master/blob/main/docs/media-setup.md";
type SetupComfyModels = NonNullable<ScanResult["comfyui"]> & { error: string | null };

const sameComfyAddress = (left: string, right: string) => left.replace(/\/+$/, "") === right.replace(/\/+$/, "");

export async function loadSetupComfyModels(
  url: string,
  scanned: ScanResult["comfyui"],
  signal: AbortSignal,
): Promise<SetupComfyModels | null> {
  const address = url.trim();
  if (!address) return null;
  if (scanned && sameComfyAddress(address, scanned.url)) return { ...scanned, url: address, error: null };
  const found = await fetchComfyModels(address, signal);
  return { url: address, checkpoints: found.checkpoints, models: found.models, hardware: found.hardware, error: found.error };
}

// The best model measured on this hardware, when this ComfyUI lacks it and
// has none as good: worth a line in the wizard.
export function betterModelHint(comfy: SetupComfyModels | null): string {
  if (!comfy?.hardware || comfy.error) return "";
  const recommended = comfy.models.filter((model) => model.verified?.verdict === "recommended");
  if (!recommended.length || recommended.some((model) => !model.missing.length)) return "";
  const best = recommended[0];
  return `Measured best on ${comfy.hardware.label}: ${comfyModel(best.id)?.label ?? best.id}, about ${Math.round(best.verified!.seconds.square)} s a picture. This ComfyUI lacks its files (${best.downloadGb} GB); Admin > Images lists them.`;
}

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
  env,
  onComfyOffers,
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
  env: EnvDefaults;
  // Told whether the ComfyUI at the draft's address offers a model or a
  // checkpoint to pick, which holds Continue until one is picked.
  onComfyOffers?: (offers: boolean) => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const { t } = useLocale();
  const scannedComfy = scan?.comfyui ?? null;
  const address = draft.comfy.url.trim();
  const scanMatches = Boolean(scannedComfy && sameComfyAddress(address, scannedComfy.url));
  const [checkedComfy, setCheckedComfy] = useState<SetupComfyModels | null>(null);

  useEffect(() => {
    if (draft.pictures !== "comfyui" || !address || scanMatches) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void loadSetupComfyModels(address, scannedComfy, controller.signal)
        .then((found) => {
          if (!controller.signal.aborted) setCheckedComfy(found);
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setCheckedComfy({ url: address, checkpoints: [], models: [], hardware: null, error: "Could not check ComfyUI. Check its address." });
          }
        });
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [address, draft.pictures, scannedComfy, scanMatches]);

  const comfy = scanMatches && scannedComfy
    ? { ...scannedComfy, url: address, error: null }
    : checkedComfy?.url === address ? checkedComfy : null;
  const checkingComfy = Boolean(address && draft.pictures === "comfyui" && !comfy);
  // The same choices as Admin > Images: catalog models this ComfyUI has every
  // file for, measured ones first, then its checkpoints.
  const options = comfyModelOptions(draft.comfy, comfy && { ...comfy, device: null }, locale);
  const chosenModel = draft.comfy.preset !== CHECKPOINT_PRESET ? comfyModel(draft.comfy.preset) : undefined;
  // The same test that shows the picker below.
  const comfyOffers = Boolean(comfy && !comfy.error && (comfy.checkpoints.length || options.length > 1));
  useEffect(() => {
    onComfyOffers?.(comfyOffers);
  }, [comfyOffers, onComfyOffers]);
  const pick = (pictures: Draft["pictures"]) =>
    update((current) => ({
      ...current,
      pictures,
      comfy: pictures === "comfyui" && !current.comfy.url && scannedComfy ? comfyFromScan(current.comfy, scannedComfy) : current.comfy,
    }));
  const setComfy = (patch: Partial<Draft["comfy"]>) => update((current) => ({ ...current, comfy: { ...current.comfy, ...patch } }));

  return (
    <div className="space-y-4">
      <ChoiceCards label={t("setupMedia.pictures.title")}>
        <ChoiceCard
          picked={draft.pictures === "comfyui"}
          onPick={() => pick("comfyui")}
          glyph="ui-paint"
          title={t("setupMedia.pictures.comfyTitle")}
          sub={t("setupMedia.pictures.comfyHelp")}
          badge={scanning || checkingComfy ? { text: t("setupMedia.looking"), tone: "off" } : comfy && !comfy.error ? { text: t("setupMedia.found"), tone: "ready" } : { text: t("setupMedia.notFound"), tone: "off" }}
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
          {!address && !scanning ? (
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
              <input className={ui.input} value={draft.comfy.url} onChange={(event) => { setCheckedComfy(null); setComfy({ url: event.target.value }); }} placeholder={MEDIA_EXAMPLES.comfy} />
            </label>
            {checkingComfy ? (
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.checkpoint")}</span>
                <input className={ui.input} disabled placeholder={t("setupMedia.pictures.checking")} />
              </label>
            ) : comfy && (comfy.checkpoints.length || options.length > 1) ? (
              <div role="group" aria-label={t("setupMedia.pictures.imageModel")} className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.imageModel")}</span>
                <Select
                  value={draft.comfy.preset !== CHECKPOINT_PRESET ? `preset:${draft.comfy.preset}` : `checkpoint:${draft.comfy.checkpoint}`}
                  onChange={(value) => {
                    const patch = comfyModelPatch(value, options);
                    if (!patch) return;
                    setComfy({
                      preset: patch.comfyWorkflowPreset ?? CHECKPOINT_PRESET,
                      ...(patch.comfyCheckpoint !== undefined ? { checkpoint: patch.comfyCheckpoint } : {}),
                    });
                  }}
                  options={options}
                  label={t("setupMedia.pictures.imageModel")}
                  className="w-full"
                />
              </div>
            ) : (
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupMedia.pictures.checkpoint")}</span>
                <input className={ui.input} value={draft.comfy.checkpoint} onChange={(event) => setComfy({ checkpoint: event.target.value, preset: "checkpoint" })} placeholder={t("setupMedia.pictures.fileHint")} />
              </label>
            )}
          </div>
          {comfy?.error ? <p role="alert" className="text-xs text-red-300">{upstreamOwnedText(comfy.error, locale)}</p> : checkingComfy ? <p role="status" className="text-xs text-stone-500">{t("setupMedia.pictures.checking")}</p> : null}
          <p className="text-[11px] text-stone-500">
            {chosenModel && !honoursNegative(chosenModel)
              ? t("setupMedia.pictures.noNegative", { model: chosenModel.label })
              : t("setupMedia.pictures.compatible")}
          </p>
          {betterModelHint(comfy) ? <p className="text-[11px] text-stone-500">{upstreamOwnedText(betterModelHint(comfy), locale)}</p> : null}
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
          <ModelChoiceField
            label={syncT("upstreamUi.8f43585c74d8")}
            hint={syncT("upstreamUi.60d9fa6a5193")}
            role="image"
            provider="images"
            apiKey={draft.picturesKey}
            value={draft.picturesModel}
            onChange={(picturesModel) => update((current) => ({ ...current, picturesModel, answered: answer(current, "pictures") }))}
            blankLabel={env.openaiImageModel ? fromEnv(env.openaiImageModel, "OPENAI_IMAGE_MODEL") : BLANK.picture}
            preselect={!env.openaiImageModel && !draft.answered.includes("pictures")}
          />
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
  env,
}: {
  draft: Draft;
  update: Update;
  scan: ScanResult | null;
  scanning: boolean;
  storyIsOpenAi: boolean;
  ttsKeySaved: boolean;
  env: EnvDefaults;
}) {
  const { t: syncT } = useSyncLocale();
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
          glyph="ui-speech"
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
          <ModelChoiceField
            label={syncT("upstreamUi.8abd5fe18616")}
            role="narration"
            provider="speech"
            baseUrl={OPENAI_V1}
            apiKey={draft.narrationKey}
            value={draft.narrationModel}
            onChange={(narrationModel) => update((current) => ({ ...current, narrationModel, answered: answer(current, "narration") }))}
            narrow={SPEECH_MODELS.narration}
            blankLabel={env.ttsModel ? fromEnv(env.ttsModel, "TTS_MODEL") : BLANK.narration}
            preselect={!env.ttsModel && !draft.answered.includes("narration")}
          />
          <NarrationTest body={{ provider: "openai", baseUrl: "", apiKey: draft.narrationKey, model: draft.narrationModel }} />
        </div>
      ) : null}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-stone-200">{t("setupMedia.dictation.title")}</h4>
        {whisper ? (
          <>
            <p className="su-row text-sm text-stone-300">
              <Lamp tone="ok" /> {t("setupMedia.dictation.whisperSelected", { host: host(whisper.url) })}
            </p>
            <ModelChoiceField
              label={t("setupMedia.dictation.whisperModel")}
              role="dictation"
              provider="speech"
              baseUrl={whisper.url}
              value={draft.dictation.whisperModel}
              onChange={(whisperModel) =>
                update((current) => ({ ...current, dictation: { ...current.dictation, whisperModel }, answered: answer(current, "whisper") }))
              }
              narrow={SPEECH_MODELS.dictation}
              blankLabel={env.sttModel ? fromEnv(env.sttModel, "STT_MODEL") : BLANK.whisper}
              preselect={!env.sttModel && !draft.answered.includes("whisper") && severalListed}
            />
          </>
        ) : storyIsOpenAi ? (
          <>
            <p className="su-row text-sm text-stone-300">
              <Lamp tone="ok" /> {t("setupMedia.dictation.openaiSelected")}
            </p>
            <ModelChoiceField
              label={t("setupMedia.dictation.model")}
              role="dictation"
              provider="speech"
              baseUrl={env.openaiImageBaseUrl || OPENAI_V1}
              value={draft.dictation.openaiModel}
              onChange={(openaiModel) =>
                update((current) => ({ ...current, dictation: { ...current.dictation, openaiModel }, answered: answer(current, "transcription") }))
              }
              narrow={SPEECH_MODELS.dictation}
              blankLabel={env.sttOpenaiModel ? fromEnv(env.sttOpenaiModel, "STT_OPENAI_MODEL") : BLANK.transcription}
              preselect={!env.sttOpenaiModel && !draft.answered.includes("transcription")}
            />
          </>
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
