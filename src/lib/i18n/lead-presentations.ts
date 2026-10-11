import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";

// Keep the raw server response in state; changing UI language cannot replay
// a transfer/toggle, alter a share address, or translate another user's name.
export function leadErrorText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const row = Object.entries(catalogFor("en", "leadUi.error.")).find(([, text]) => text === source);
  return row ? createTranslator(locale)(row[0] as MessageKey) : controlText(source, locale);
}
