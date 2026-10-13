import type { AppLocale } from "./locales.ts";

// Both browsing and search carry server-projected prose. Include viewer locale
// in request/cache identity so translated results cannot outlive a language switch.
export function pickerQueryParams(raw: URLSearchParams, locale: AppLocale): URLSearchParams {
  const params = new URLSearchParams(raw);
  params.set("locale", locale);
  params.set("localized", "1");
  return params;
}
export function pickerSectionKey(kind: string, campaignId: string | null | undefined, section: string, params: URLSearchParams): string {
  return JSON.stringify([kind, campaignId ?? "", section, params.toString()]);
}
