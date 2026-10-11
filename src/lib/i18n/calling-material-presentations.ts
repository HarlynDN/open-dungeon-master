import { scopedCatalog } from "./translator.ts";
import { CALLING_CLASS_BLURBS, CALLING_SUBCLASS_BLURBS } from "./calling-material-messages.ts";
import type { CALLING_MATERIAL_MESSAGES as CALLING_MATERIAL_MESSAGES_Shape } from "./calling-material-messages.ts";
import { subclassBlurb } from "../srd/features.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

type ClassIntroduction = {
  id?: string; name?: string; packBlurb?: string; blurb?: string; desc?: string;
};

// Translate only the unchanged bundled fragment. A pack's pitch and full
// content entry remain independently authored, even when they reuse an ID.
export function classHelpText(entry: ClassIntroduction, locale: AppLocale): string | undefined {
  let brief = entry.packBlurb || entry.blurb;
  if (locale !== "en" && !entry.packBlurb) {
    const row = CALLING_CLASS_BLURBS.find(row => row.id === entry.id && row.name === entry.name);
    if (row && brief === CALLING_MATERIAL_MESSAGES.en[row.key]) brief = createTranslator(locale)(row.key);
  }
  const parts = [brief, entry.desc].filter(Boolean);
  return parts.length ? parts.join("\n\n") : undefined;
}

// The original resolver handles native aliases. Complete content-pack or
// workshop descriptions keep their original override precedence and text.
export function subclassHelpText(classId: string, name: string, locale: AppLocale, description?: string): string | null {
  if (description) return description;
  const source = subclassBlurb(classId, name);
  if (locale === "en" || !source) return source;
  const row = CALLING_SUBCLASS_BLURBS.find(row => row.classId === classId && CALLING_MATERIAL_MESSAGES.en[row.key] === source);
  const t = createTranslator(locale);
  return row ? t(row.key) : t("callingMaterial.pending", { source });
}

const CALLING_MATERIAL_MESSAGES = scopedCatalog<typeof CALLING_MATERIAL_MESSAGES_Shape>("callingMaterial.");
