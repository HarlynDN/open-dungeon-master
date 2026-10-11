import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { Speaker } from "../dm/speech.ts";
import type { AppLocale } from "./locales.ts";

// Narrator role labels are system copy. NPC/player/monster names and authored
// narrator names remain literal, even when they resemble those role labels.
export function speechSpeakerLabel(speaker: Speaker, locale: AppLocale): string {
  if (speaker.kind !== "narrator") return speaker.name;
  const t = createTranslator(locale);
  if (speaker.name === "Dungeon Master") return t("passageUi.dm");
  return !speaker.name || speaker.name === "Narrator" ? t("chatUi.narrator") : speaker.name;
}
export function chatText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const row = Object.entries(catalogFor("en", "chatUi.error.")).find(([, text]) => text === source);
  return row ? createTranslator(locale)(row[0] as MessageKey) : controlText(source, locale);
}
