// Resource display names are indexed by canonical ID. This pure adapter is
// shared by server prompts/conclusions without importing the rules engine.
import { APP_LOCALES, type AppLocale } from "./locales.ts";
import { SHEET_PLAY_MESSAGES } from "./sheet-play-messages.ts";
import { AUTHORED_RESOURCE_MESSAGES } from "./authored-resource-messages.ts";
import { ADDITIONAL_RESOURCE_MESSAGES } from "./additional-resource-messages.ts";
import { referenceDisplayName, resolveNamedReference } from "./references.ts";
import { freeCastResourceId, freeCastResourceText, freeCastSpellOf, isFreeCastResource } from "../srd/feat-spells.ts";

const catalogs = new Map<AppLocale, Record<string, string>>(APP_LOCALES.map(locale => [locale, {
  ...SHEET_PLAY_MESSAGES[locale],
  ...AUTHORED_RESOURCE_MESSAGES[locale],
  ...ADDITIONAL_RESOURCE_MESSAGES[locale],
}]));
const prefix = "sheetPlay.resourceName.";
const names = Object.entries(catalogs.get("en") ?? {}).filter(([key]) => key.startsWith(prefix))
  .map(([key, name]) => ({ id: key.slice(prefix.length), name }));

export function resourceDisplayName(id: string, fallback: string, locale: AppLocale): string {
  if (locale !== "en" && isFreeCastResource(id) && freeCastSpellOf(id)
    && fallback === freeCastResourceText(id).name) {
    return SHEET_PLAY_MESSAGES[locale]["sheetPlay.resource.freeCast"].replace("{spell}", () => referenceDisplayName("spell", freeCastResourceText(id).spell, locale));
  }
  const key = prefix + id;
  // Custom/overridden definitions are not translated merely for reusing an ID.
  return catalogs.get("en")?.[key] === fallback ? catalogs.get(locale)?.[key] ?? fallback : fallback;
}

export function resourceNameForProse(term: string, locale: AppLocale): string {
  if (locale === "en") return term;
  const found = resolveNamedReference(term, names, row => [resourceDisplayName(row.id, row.name, locale)]);
  if (found.kind === "matched") return resourceDisplayName(found.entry.id, found.entry.name, locale);
  if (found.kind === "ambiguous") {
    const labels = new Set(found.choices.map(row => resourceDisplayName(row.id, row.name, locale)));
    if (labels.size === 1) return resourceDisplayName(found.choices[0].id, found.choices[0].name, locale);
  }
  const free = /^(.+) \(free cast\)$/.exec(term);
  if (free) return resourceDisplayName(freeCastResourceId(free[1]), term, locale);
  return term;
}
