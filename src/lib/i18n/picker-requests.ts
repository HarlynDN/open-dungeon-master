import type { AppLocale } from "./locales.ts";

// Only alias search needs a locale. Browsing raw canonical rows can keep its
// cache across interface-language changes; names are projected at render time.
export function pickerQueryParams(raw: URLSearchParams, locale: AppLocale): URLSearchParams {
  const params = new URLSearchParams(raw);
  if (locale !== "en" && params.get("q")?.trim()) params.set("locale", locale);
  return params;
}
export function pickerSectionKey(kind: string, campaignId: string | null | undefined, section: string, params: URLSearchParams): string {
  return JSON.stringify([kind, campaignId ?? "", section, params.toString()]);
}
