import { BUILDER_TERMS } from "./builder-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export type BuilderTermKind = "optionCategory" | "castingKind" | "fightingStyle";
const normalize = (value: string) => value.trim().toLowerCase().replace(/[_-]/g, " ");

// Display a registered term only. A content pack's own terminology stays
// authored; none of these labels are written to a sheet or tool argument.
export function builderTermLabel(kind: BuilderTermKind, value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const row = BUILDER_TERMS.find(term => term.kind === kind && normalize(term.name) === normalize(value));
  return row ? createTranslator(locale)(row.key) : value;
}
