import { scopedCatalog } from "./translator.ts";
import type { AppLocale } from './locales.ts';
import { EQUIPMENT_NAMES } from "./equipment-name-messages.ts";
import type { EQUIPMENT_NAME_MESSAGES as EQUIPMENT_NAME_MESSAGES_Shape } from "./equipment-name-messages.ts";
import { REFERENCE_NAMES } from './reference-names.ts';
import { referenceDisplayName } from './references.ts';

const normalize = (value: string) => value.trim().toLowerCase().replace(/[‘’]/g, "'");
const nativeNames = new Map(EQUIPMENT_NAMES.map(row => [normalize(row.name), row.key]));

export function equipmentName(value: string, locale: AppLocale, homebrew = false): string {
  if (locale === 'en' || homebrew) return value;
  const key = nativeNames.get(normalize(value));
  if (key) return EQUIPMENT_NAME_MESSAGES[locale][key];
  const bonus = /^(.*?)\s*(\+[1-3])$/.exec(value.trim());
  if (bonus && nativeNames.has(normalize(bonus[1]))) return `${equipmentName(bonus[1], locale)} ${bonus[2]}`;
  return referenceDisplayName("equipment", value, locale);
}

// Match translated names and the established synonyms, including fragments.
// Only registered canonical names/terms are added; callers enforce scope.
export function equipmentSearchNames(query: string, locale: AppLocale): string[] {
  if (locale === 'en' || !query.trim()) return [];
  const wanted = normalize(query);
  return [...new Set(Object.entries(REFERENCE_NAMES[locale].equipment ?? {})
    .filter(([, aliases]) => aliases.some(alias => normalize(alias).includes(wanted)))
    .map(([name]) => name))];
}

const EQUIPMENT_NAME_MESSAGES = scopedCatalog<typeof EQUIPMENT_NAME_MESSAGES_Shape>("equipmentName.");
