import { CHARACTER_TRAINING_NAMES } from "./character-training-name-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { referenceDisplayName } from "./references.ts";
import { featTermLabel } from "./feat-presentations.ts";

export type TrainingTermKind = "tool" | "language" | "toolCategory";
const normalize = (value: string) => value.trim().toLowerCase().replace(/[‘’]/g, "'");

// These are fictional-language/tool display names, never UI locale codes.
// Preserve authored or pack-specific names that have no registered label.
export function trainingLabel(kind: TrainingTermKind, value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const wanted = normalize(value);
  const row = CHARACTER_TRAINING_NAMES.find(entry => entry.type === kind && normalize(entry.name) === wanted);
  return row ? createTranslator(locale)(row.key) : kind === "tool" ? featTermLabel("tool", value, locale) : value;
}

// The legacy English picker pluralizes the category; display-only grammar.
// Other locales use their registered category name without an English suffix.
export function toolGrantCategoryLabel(value: string, count: number, locale: AppLocale): string {
  return locale === "en" ? `${value}${count === 1 ? "" : "s"}` : trainingLabel("toolCategory", value, locale);
}

// Stored proficiencies remain canonical. Only registered names/categories are
// projected; custom tools and weapon names keep their complete authored text.
export function sheetTrainingLabel(kind: "language" | "tool" | "armor" | "weapon", value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  if (kind === "language" || kind === "tool") return trainingLabel(kind, value, locale);
  if (kind === "armor") {
    const name = value.replace(/ armor$/, "");
    const translated = featTermLabel("armorTraining", name, locale);
    return translated === name ? value : translated;
  }
  const normalized = normalize(value);
  const category = normalized === "simple weapons" ? "sessionUi.level.grant.simple"
    : normalized === "martial weapons" ? "sessionUi.level.grant.martial" : null;
  if (category) return createTranslator(locale)(category);
  for (const name of [value, normalized.endsWith("s") ? normalized.slice(0, -1) : value]) {
    const translated = referenceDisplayName("equipment", name, locale);
    if (translated !== name) return translated;
  }
  return value;
}
