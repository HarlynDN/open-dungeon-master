import { HELP_TOURS } from "./app-help-metadata.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Keep callback identities and authored tour copy separate from display text.
export function helpTourView(tour: { label: string; detail: string }, locale: AppLocale): { label: string; detail: string } {
  const row = HELP_TOURS.find(row => row.label === tour.label && row.detail === tour.detail);
  if (locale === "en" || !row) return { label: tour.label, detail: tour.detail };
  const t = createTranslator(locale);
  return { label: t(row.labelKey), detail: t(row.detailKey) };
}
