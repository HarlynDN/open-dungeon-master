import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Keep the original API diagnostic in component state. Displaying it in a
// different locale never resubmits the note/whisper/report/dispute.
export function journalErrorText(raw: string, locale: AppLocale, fallback: MessageKey): string {
  if (!raw || locale === "en") return raw;
  const key = Object.entries(catalogFor("en", "journalUi.error.")).find(([, source]) => source === raw)?.[0];
  return createTranslator(locale)((key ?? fallback) as MessageKey);
}
