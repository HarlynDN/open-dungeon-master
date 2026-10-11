import { CHARACTER_TRAINING_NAMES } from "./character-training-name-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
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
