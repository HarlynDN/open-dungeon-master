import { LOCALE_DEFINITIONS, type AppLocale } from "./i18n/locales.ts";

// Stock Kokoro names encode their language. Unknown compatible-server names
// and descriptions stay explicit user choices, rather than guessed languages.
export function voiceSupportsLocale(voice: string, locale: AppLocale): boolean {
  const prefixes = LOCALE_DEFINITIONS[locale].tts.voicePrefixes;
  return voice.split("+").every(part => !/^[a-z][fm]_/.test(part.trim()) || prefixes.some(prefix => part.trim().startsWith(prefix)));
}

export function localeNarratorVoice(voice: string, locale: AppLocale, fallback = ""): string {
  const legacyChinese = /^(?:zf_(?:xiaobei|xiaoni|xiaoxiao|xiaoyi)|zm_(?:yunjian|yunxi|yunxia|yunyang))$/;
  const normalize = (value: string) => locale === "zh-CN" && legacyChinese.test(value.trim()) ? LOCALE_DEFINITIONS[locale].tts.defaultVoice : value.trim();
  voice = normalize(voice); fallback = normalize(fallback);
  const asked = voice.trim() || fallback.trim() || LOCALE_DEFINITIONS[locale].tts.defaultVoice;
  if (voiceSupportsLocale(asked, locale)) return asked;
  return fallback.trim() && voiceSupportsLocale(fallback.trim(), locale) ? fallback.trim() : LOCALE_DEFINITIONS[locale].tts.defaultVoice;
}
