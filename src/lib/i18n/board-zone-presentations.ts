import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { referenceDisplayName } from "./references.ts";
import type { AppLocale } from "./locales.ts";
import type { ViewZone } from "../dm/zone-view.ts";

export function boardZoneSpellName(name: string, locale: AppLocale): string {
  if (locale === "en") return name;
  const key = Object.entries(catalogFor("en", "boardZone.name.")).find(([, source]) => source.toLowerCase() === name.toLowerCase())?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : referenceDisplayName("spell", name, locale);
}

// Require the entire native label frame and original summary. An unknown
// replacement/pack paragraph stays literal, even if it uses a stock spell name.
export function boardZoneLabel(zone: Pick<ViewZone, "spell" | "label">, locale: AppLocale): string {
  if (locale === "en") return zone.label;
  const key = Object.entries(catalogFor("en", "boardZone.summary.")).find(([, source]) => zone.label === `${zone.spell}: ${source}`)?.[0];
  return key ? createTranslator(locale)("boardZone.label", {
    spell: boardZoneSpellName(zone.spell, locale), summary: createTranslator(locale)(key as MessageKey),
  }) : zone.label;
}

// Preserve the old Latin estimate and allow full-width glyphs their own em.
// This is a layout estimate, independent of the application's current locale.
export function boardTextWidth(text: string, size: number, latinRatio: number, padding: number): number {
  return Array.from(text).reduce((width, char) => width + size * (/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Hangul}/u.test(char) ? 1 : latinRatio), padding);
}
