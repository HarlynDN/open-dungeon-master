import { APP_LOCALES, type AppLocale } from "./locales.ts";

// Co-locate a message's translations for review. Registering another locale
// requires every entry to supply it; there is no implicit English fallback.
export function defineMessages<const T extends Record<string, Record<AppLocale, string>>>(entries: T) {
  return Object.fromEntries(APP_LOCALES.map(locale => [
    locale,
    Object.fromEntries(Object.entries(entries).map(([key, values]) => [key, values[locale]])),
  ])) as Record<AppLocale, { [K in keyof T]: string }>;
}
