import { scopedCatalog } from "./translator.ts";
import { CALLING_CLASS_BLURBS, CALLING_SUBCLASS_BLURBS } from "./calling-material-messages.ts";
import type { CALLING_MATERIAL_MESSAGES as CALLING_MATERIAL_MESSAGES_Shape } from "./calling-material-messages.ts";
import { AUTHORED_SUBCLASS_ENTRIES, subclassBlurb } from "../srd/features.ts";
import { authoredArchetypeDescription } from "../content/authored-archetype.ts";
import { normalizeRulesText } from "../help/rules-text.ts";
import { SUBCLASS_FEATURE_MATERIAL } from "./subclass-feature-metadata.ts";
import { referenceDisplayName } from "./references.ts";
import { registeredMessageTemplate } from "./translator.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

type ClassIntroduction = {
  id?: string; name?: string; packBlurb?: string; blurb?: string; desc?: string;
  documentSlug?: string; display?: { locale: AppLocale; source: string; text: string };
};

// Translate only the unchanged bundled fragment. A pack's pitch and full
// content entry remain independently authored, even when they reuse an ID.
export function classHelpText(entry: ClassIntroduction, locale: AppLocale): string | undefined {
  let brief = entry.packBlurb || entry.blurb;
  if (locale !== "en" && !entry.packBlurb) {
    const row = CALLING_CLASS_BLURBS.find(row => row.id === entry.id && row.name === entry.name);
    if (row && brief === CALLING_MATERIAL_MESSAGES.en[row.key]) brief = createTranslator(locale)(row.key);
  }
  const desc = locale !== "en" && entry.documentSlug === "wotc-srd" && entry.display?.locale === locale
    && entry.display.source === normalizeRulesText(entry.desc ?? "") ? entry.display.text : entry.desc;
  const parts = [brief, desc].filter(Boolean);
  return parts.length ? parts.join("\n\n") : undefined;
}

// The original resolver handles native aliases. Full descriptions keep override
// precedence; only the exact project-authored document has a locale projection.
export function subclassHelpText(classId: string, name: string, locale: AppLocale, description?: string, provenance?: { source?: string; documentSlug?: string }): string | null {
  if (description) return nativeArchetypeHelp(classId, name, description, locale, provenance);
  const source = subclassBlurb(classId, name);
  if (locale === "en" || !source) return source;
  const row = CALLING_SUBCLASS_BLURBS.find(row => row.classId === classId && CALLING_MATERIAL_MESSAGES.en[row.key] === source);
  const t = createTranslator(locale);
  return row ? t(row.key) : t("callingMaterial.pending", { source });
}

// Only recognize the whole current ODM-authored document. Added paragraphs,
// workshop entries and other books retain their own prose, even with stock names.
export function nativeArchetypeHelp(classId: string, name: string, source: string, locale: AppLocale, provenance?: { source?: string; documentSlug?: string }): string {
  if (locale === "en" || provenance?.source === "homebrew"
    || (provenance?.documentSlug && provenance.documentSlug !== "odm-expanded")) return source;
  const entry = AUTHORED_SUBCLASS_ENTRIES[classId]?.find(entry => entry.name === name);
  if (!entry) return source;
  const original = authoredArchetypeDescription(entry);
  if (source !== original && source !== normalizeRulesText(original)) return source;
  const brief = CALLING_SUBCLASS_BLURBS.find(row => row.classId === classId && CALLING_MATERIAL_MESSAGES.en[row.key] === entry.desc);
  if (!brief) return source;
  const t = createTranslator(locale);
  const levels: string[] = [];
  for (const [level, features] of Object.entries(entry.levels).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const descriptions: string[] = [];
    for (const feature of features) {
      const row = SUBCLASS_FEATURE_MATERIAL.find(row => row.classId === classId && row.subclass === name && row.name === feature.n);
      if (!row || registeredMessageTemplate("en", row.descriptionKey) !== feature.d) return source;
      descriptions.push(t("callingMaterial.archetype.feature", { name: t(row.nameKey), description: t(row.descriptionKey) }));
    }
    levels.push(t("callingMaterial.archetype.level", { level, features: descriptions.join(" ") }));
  }
  const spells = entry.spells ? t("callingMaterial.archetype.spells", {
    levels: Object.entries(entry.spells).sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([level, names]) => t("callingMaterial.archetype.spellLevel", {
        level, spells: new Intl.ListFormat(locale, { type: "conjunction" }).format(names.map(name => referenceDisplayName("spell", name, locale))),
      })).join(" "),
  }) : undefined;
  return [t(brief.key), ...levels, spells].filter(Boolean).join("\n\n");
}

const CALLING_MATERIAL_MESSAGES = scopedCatalog<typeof CALLING_MATERIAL_MESSAGES_Shape>("callingMaterial.");
