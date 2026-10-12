import { surfaceErrorText } from "./surface-presentations.ts";
import { COMPOSER_GATE_SOURCE, type ComposerGatePhase } from "./composer-gate-metadata.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { turnControlErrorText } from "./turn-control-presentations.ts";

// Recognize only complete native frames. Captured names/quotes stay literal;
// unknown authored copy is never translated by substring replacement.
function nativeFrame(raw: string, locale: AppLocale, prefix: string): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  for (const [key, source] of Object.entries(catalogFor("en", prefix))) {
    const params = [...source.matchAll(/\{(\w+)\}/g)].map(match => match[1]);
    const pattern = source.split(/\{\w+\}/g).map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("([\\s\\S]*?)");
    const match = new RegExp(`^${pattern}$`).exec(raw);
    if (match) return t(key as MessageKey, Object.fromEntries(params.map((name, index) => [name, match[index + 1]])));
  }
  return raw;
}
export function composerPlaceholderText(raw: string, locale: AppLocale): string {
  return nativeFrame(raw, locale, "composeUi.placeholder.");
}
export function storyCadenceText(raw: string, locale: AppLocale): string {
  return nativeFrame(raw, locale, "composeUi.story.");
}
export function askCitationLabel(kind: string, locale: AppLocale): string {
  return nativeFrame(kind, locale, "composeUi.citation.");
}
export function composeErrorText(raw: string, locale: AppLocale, fallback: MessageKey, enemyNames: readonly string[] = []): string {
  if (!raw || locale === "en") return raw;
  const surface = surfaceErrorText(raw, locale);
  if (surface !== raw) return surface;
  const localized = nativeFrame(raw, locale, "composeUi.error.");
  if (localized !== raw) return localized;
  return turnControlErrorText({ data: { error: raw }, fallback }, locale, enemyNames);
}

// Eligibility selects a typed UI phase; translated text never determines who
// may act. English defaults also work in pure callers without a UI provider.
export function composerGatePlaceholder(phase: ComposerGatePhase, params: Record<string, string | number>, locale: AppLocale): string {
  return locale === "en" ? COMPOSER_GATE_SOURCE[phase].replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`))
    : createTranslator(locale)(`composeUi.placeholder.${phase}`, params);
}
