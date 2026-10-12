import { DEFAULT_LOCALE, LOCALE_DEFINITIONS, type AppLocale } from "./locales.ts";

// A narration selection follows the campaign's text locale, not the viewer's
// interface preference. Return the literal excerpt; never translate it or
// make a second selection after a menu/dialog has taken focus.
export function selectedNarrationExcerpt(raw: string, locale: AppLocale = DEFAULT_LOCALE): string {
  const text = raw.trim();
  return text.length >= LOCALE_DEFINITIONS[locale].narrationSelectionMinLength ? text : "";
}
