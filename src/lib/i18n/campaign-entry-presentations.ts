import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// The stream retains raw refusal/network text so a locale switch rerenders it.
// Unrecognized responses (including authored text) remain visible verbatim.
export function campaignEntryError(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const row = Object.entries(catalogFor("en", "sessionUi.open.")).find(([, value]) => value === source && !/\{\w+\}/.test(value));
  return row ? createTranslator(locale)(row[0] as MessageKey) : source;
}
