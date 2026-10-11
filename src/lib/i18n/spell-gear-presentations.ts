import { CHARACTER_SPELL_GEAR_NAMES } from "./character-spell-gear-name-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export type SpellGearDisplayKind = typeof CHARACTER_SPELL_GEAR_NAMES[number]["type"];
const normalize = (value: string) => value.trim().toLowerCase().replace(/[‘’]/g, "'");

export function spellGearTermLabel(type: SpellGearDisplayKind, value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const row = CHARACTER_SPELL_GEAR_NAMES.find(entry => entry.type === type && normalize(entry.name) === normalize(value));
  return row ? createTranslator(locale)(row.key) : value;
}
