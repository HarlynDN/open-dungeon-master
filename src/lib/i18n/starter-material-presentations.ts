import { createTranslator, messageTemplate } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export function starterMaterial<T extends { title: string; tagline: string; description: string; theme: string }>(source: T, locale: AppLocale): T {
  if (locale === "en") return source;
  const translated = { ...source };
  for (const field of ["title", "tagline", "description", "theme"] as const) {
    const key = `starter.material.${field}` as const;
    if (source[field] === messageTemplate("en", key)) translated[field] = createTranslator(locale)(key);
  }
  return translated;
}
