import { CHARACTER_FEAT_NAMES } from "./character-feat-name-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export type FeatDisplayKind = typeof CHARACTER_FEAT_NAMES[number]["type"];
const normalize = (value: string) => value.trim().toLowerCase().replace(/[‘’]/g, "'");

// Display only. Unknown authored names remain the author's own words.
export function featTermLabel(type: FeatDisplayKind, value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const row = CHARACTER_FEAT_NAMES.find(entry => entry.type === type && normalize(entry.name) === normalize(value));
  return row ? createTranslator(locale)(row.key) : value;
}
