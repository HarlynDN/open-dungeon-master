import type { ImageBackend } from "../types.ts";
import type { ClientCapabilities } from "../use-capabilities.ts";
import { TTS_VOICES, type TtsVoiceId } from "../tts-voices.ts";
import { createTranslator, type MessageKey } from "./translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";

const VOICE_KEYS: Record<TtsVoiceId, MessageKey> = {
  af_heart: "voicePicker.af_heart", af_bella: "voicePicker.af_bella", af_aoede: "voicePicker.af_aoede", af_nicole: "voicePicker.af_nicole",
  am_michael: "voicePicker.am_michael", am_fenrir: "voicePicker.am_fenrir", am_puck: "voicePicker.am_puck",
  bf_emma: "voicePicker.bf_emma", bm_george: "voicePicker.bm_george", bm_fable: "voicePicker.bm_fable",
  zf_xiaobei: "voicePicker.zf_xiaobei", zf_xiaoni: "voicePicker.zf_xiaoni", zf_xiaoxiao: "voicePicker.zf_xiaoxiao", zf_xiaoyi: "voicePicker.zf_xiaoyi",
  zm_yunjian: "voicePicker.zm_yunjian", zm_yunxia: "voicePicker.zm_yunxia", zm_yunxi: "voicePicker.zm_yunxi", zm_yunyang: "voicePicker.zm_yunyang",
};

export function voiceDisplayLabel(voice: { id: string; label: string }, locale: AppLocale = DEFAULT_LOCALE) {
  // A custom backend may reuse a known ID with its own name. Translate only
  // the repository-owned label, keeping cached/API voice rows language-neutral.
  const stock = TTS_VOICES.find(row => row.id === voice.id && row.label === voice.label);
  return stock ? createTranslator(locale)(VOICE_KEYS[stock.id]) : voice.label;
}

export function narrationNote(tts: ClientCapabilities["tts"] | undefined, locale: AppLocale = DEFAULT_LOCALE) {
  if (!tts?.provider) return null;
  const t = createTranslator(locale);
  if (tts.provider === "off") return { warning: true, text: t("media.speech.off") };
  const server = t(tts.provider === "kokoro" ? "media.speech.kokoro" : "media.speech.openai");
  const local = tts.place === "local";
  const where = local ? t("media.local") : tts.place ? t("media.remote", { place: tts.place }) : t("media.unknown");
  if (!tts.reachable) return { warning: true, text: t("media.speech.unreachable", { server, where }) };
  return { warning: false, text: t("media.speech.reachable", { server, where }) + (local ? t("media.speech.local") : "") + t("media.speech.settings") };
}

export function imagesNote(backend: ImageBackend, capabilities: ClientCapabilities | null, locale: AppLocale = DEFAULT_LOCALE) {
  if (!capabilities) return null;
  const t = createTranslator(locale);
  const place = capabilities.images.openaiPlace;
  const where = backend !== "openai" || !place ? "" : place === "local" ? t("media.images.local") : t("media.images.remote", { place });
  return t("media.images", { painter: t(`media.painter.${backend}`), where });
}
