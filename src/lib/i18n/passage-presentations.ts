import { surfaceErrorText } from "./surface-presentations.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";

const PRESETS: Partial<Record<string, MessageKey>> = {
  darker: "passageUi.preset.darker", "more dialogue": "passageUi.preset.dialogue",
  shorter: "passageUi.preset.shorter", "more sensory detail": "passageUi.preset.sensory",
};
export function renarratePresetLabel(source: string, locale: AppLocale): string {
  const key = Object.hasOwn(PRESETS, source) ? PRESETS[source] : undefined;
  return key ? createTranslator(locale)(key) : source;
}

// Project only recognized native frames. Roll markers and authored messages
// never pass through translation, nor are historical bodies rewritten.
export function passageText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const surface = surfaceErrorText(source, locale);
  if (surface !== source) return surface;
  const t = createTranslator(locale);
  const row = Object.entries(catalogFor("en", "passageUi.error.")).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  if (row) return t(row[0] as MessageKey);
  const cap = /^That is all ([0-9]+) takes; pick one\.$/.exec(source);
  if (cap) return t("passageUi.error.cap", { max: cap[1] });
  const marker = "(\\[roll:[0-9a-f-]{36}\\])";
  const patterns = [
    [new RegExp(`^That edit drops a dice roll \\(${marker}\\)\\. Keep every roll marker so the dice stay in the record\\.$`), "passageUi.error.drop"],
    [new RegExp(`^That edit repeats a dice roll \\(${marker}\\)\\. Each roll may appear once\\.$`), "passageUi.error.repeat"],
    [new RegExp(`^That edit adds a dice roll \\(${marker}\\) the turn never made\\.$`), "passageUi.error.add"],
  ] as const;
  for (const [pattern, key] of patterns) {
    const match = pattern.exec(source);
    if (match) return t(key, { marker: match[1] });
  }
  const prefix = "Narration failed. ";
  return source.startsWith(prefix) ? t("passageUi.error.voiceFail", { reason: controlText(source.slice(prefix.length), locale) }) : controlText(source, locale);
}
