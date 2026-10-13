import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { referenceDisplayName } from "./references.ts";
import { equipmentName } from "./equipment-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { nativeFeatureName, nativeFeatHelp } from "./feature-material-presentations.ts";
import { builderOptionName } from "./builder-picker-presentations.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";
import { gearRarity } from "./gear-ui-presentations.ts";
import { glossaryTermView } from "./game-help-presentations.ts";
import { describeContentEntry } from "../help/index.ts";
import { spellStarterText } from "./spell-ui-presentations.ts";

export const REFERENCE_NOTICES = { desk: "The desk could not answer that." } as const;
type ReferenceRow = { display?: { locale: AppLocale; source: string; text: string }; name: string; source: string; slug?: string; documentSlug?: string; data: Record<string, unknown> };
const owned = (row: ReferenceRow) => row.source !== "homebrew" && ["wotc-srd", "odm-expanded"].includes(row.documentSlug ?? "");

export function referenceRowName(kind: string, row: ReferenceRow, locale: AppLocale): string {
  if (locale === "en" || !owned(row)) return row.name;
  if (kind === "spells") return referenceDisplayName("spell", row.name, locale);
  if (kind === "monsters") return referenceDisplayName("monster", row.name, locale);
  if (kind === "items") return equipmentName(row.name, locale);
  if (kind === "conditions") return conditionLabel(row.name, locale);
  if (kind === "feats") return nativeFeatureName(row.name, locale);
  if (kind === "races" || kind === "backgrounds") return builderOptionName(kind === "races" ? "race" : "background", { id: row.slug ?? "", name: row.name, documentSlug: row.documentSlug }, locale);
  return row.name;
}

// Only already-reviewed identical owned summaries are translated. A pack's
// extended description or authored prose is never replaced by a name match.
export function referenceRowDescription(kind: string, row: ReferenceRow, locale: AppLocale): string | null {
  const source = describeContentEntry(row.data, { includeHigherLevels: kind === "spells", includeMonsterActions: kind === "monsters" });
  if (!source || !owned(row) || locale === "en") return source;
  if (row.display?.locale === locale && row.display.source === source) return row.display.text;
  if (kind === "feats") return nativeFeatHelp(row.name, source, locale) ?? source;
  if (kind === "spells") return spellStarterText(source, locale);
  return source;
}

export function referenceOrigin(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const entry = Object.entries(catalogFor("en", "referenceUi.origin.")).find(([, value]) => value === raw);
  return entry ? createTranslator(locale)(entry[0] as MessageKey) : raw;
}

export function referenceSourceName(source: { kind: string; ref: string; name?: string; origin?: string }, locale: AppLocale): string {
  if (locale === "en") return source.name ?? "";
  if (source.kind === "glossary" && source.ref.startsWith("glossary:") && source.origin === "the rules basics") return glossaryTermView(source.ref.slice(9), locale)?.term ?? source.name ?? "";
  if (source.origin !== `SRD ${source.kind}` || !source.name) return source.name ?? "";
  return referenceRowName(`${source.kind === "item" ? "item" : source.kind}s`, { name: source.name, source: "open5e", documentSlug: "wotc-srd", data: {} }, locale);
}

export function referenceNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const entry = Object.entries(catalogFor("en", "referenceUi.notice.")).find(([, value]) => value === raw);
  return entry ? createTranslator(locale)(entry[0] as MessageKey) : raw;
}

export function referenceBadgeText(category: string, row: { source: string }, badge: { key: string; text: string }, locale: AppLocale): string {
  if (locale === "en") return badge.text;
  const t = createTranslator(locale);
  if (badge.key === "source" && badge.text === "homebrew") return t("referenceUi.badge.homebrew");
  if (category === "spells") {
    if (badge.key === "level") {
      const level = /^level (\d+)$/.exec(badge.text);
      return level ? t("referenceUi.badge.level", { level: level[1] }) : badge.text === "cantrip" ? t("referenceUi.badge.cantrip") : badge.text;
    }
    if (badge.key === "ritual" || badge.key === "conc") return t(badge.key === "ritual" ? "referenceUi.badge.ritual" : "referenceUi.badge.concentration");
    if (badge.key === "school") return spellGearTermLabel("school", badge.text, locale);
  }
  if (category === "items" && row.source !== "homebrew") {
    if (badge.key === "rarity") return gearRarity(badge.text, locale);
    if (badge.key === "kind") {
      const entry = Object.entries(catalogFor("en", "referenceUi.badge.")).find(([, value]) => value === badge.text);
      if (entry) return t(entry[0] as MessageKey);
    }
  }
  if (category === "monsters" && badge.key === "type" && row.source !== "homebrew") {
    const entry = Object.entries(catalogFor("en", "referenceUi.badge.type.")).find(([, value]) => value === badge.text);
    if (entry) return t(entry[0] as MessageKey);
  }
  return badge.text;
}
