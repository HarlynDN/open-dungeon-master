import { catalogFor, createTranslator, messageTemplate, type MessageKey } from "./translator.ts";
import { characterErrorText, characterRuleProblems, type CharacterUiError } from "./character-presentations.ts";
import { controlText } from "./story-control-presentations.ts";
import { PREGEN_TEXT_KEYS } from "./entry-character-metadata.ts";
import type { AppLocale } from "./locales.ts";

// Exact native source matches protect custom/pack replacements with the same ID.
export function pregenText(id: string, field: "tagline" | "blurb" | "backstory", source: string, locale: AppLocale): string {
  if (locale === "en" || !Object.hasOwn(PREGEN_TEXT_KEYS, id)) return source;
  const key = PREGEN_TEXT_KEYS[id as keyof typeof PREGEN_TEXT_KEYS][field];
  return source === messageTemplate("en", key) ? createTranslator(locale)(key) : source;
}
// Used only when admitting a new pregen to a campaign. All mechanical fields,
// proper names, existing sheets and authored replacements are kept intact.
export function pregenSheet<T extends { backstory?: string }>(id: string, sheet: T, locale: AppLocale): T {
  if (locale === "en" || typeof sheet.backstory !== "string") return sheet;
  return { ...sheet, backstory: pregenText(id, "backstory", sheet.backstory, locale) };
}
export function entryCharacterError(error: CharacterUiError | null, locale: AppLocale): string {
  if (!error) return "";
  if (locale === "en" || error.data.errorCode) return characterErrorText(error, locale);
  const rules = characterRuleProblems(error.data, locale);
  if (rules) return rules;
  if (!error.data.error) return createTranslator(locale)(error.fallback);
  const row = Object.entries(catalogFor("en", "entryCharacter.error.")).find(([, source]) => source === error.data.error);
  return row ? createTranslator(locale)(row[0] as MessageKey) : controlText(error.data.error, locale);
}
