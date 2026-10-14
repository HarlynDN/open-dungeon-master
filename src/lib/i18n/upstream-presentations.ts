import type { AppLocale } from "./locales";
import { catalogFor, createTranslator, type MessageKey } from "./translator";
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Only whole repository-owned frames are projected. Unknown service output,
// model IDs, hardware identities and authored text remain unchanged.
export function upstreamOwnedText(raw: string, locale: AppLocale): string {
  if (locale === "en" || !raw) return raw;
  const t = createTranslator(locale);
  for (const [key, source] of Object.entries(catalogFor("en", "upstreamUi.native."))) {
    if (!source) continue;
    if (source === raw) return t(key as MessageKey);
    const names: string[] = [];
    const pattern = source.split(/(\{\w+\})/g).map(part => {
      if (!/^\{\w+\}$/.test(part)) return escape(part);
      names.push(part.slice(1, -1)); return "([\\s\\S]+?)";
    }).join("");
    if (!names.length) continue;
    const match = new RegExp("^" + pattern + "$", "u").exec(raw);
    if (match) return t(key as MessageKey, Object.fromEntries(names.map((name, i) => [name, match[i+1]])));
  }
  return raw;
}
export function modelSummaryText(raw: string, locale: AppLocale): string {
  return raw.split(" · ").map(part => upstreamOwnedText(part, locale)).join(" · ");
}
