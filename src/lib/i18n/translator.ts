import type { AppLocale } from "./locales.ts";
import type { MessageKey } from "./messages.ts";
export type { MessageKey } from "./messages.ts";

export type MessageCatalog = Partial<Record<MessageKey, string>>;
export type LocaleCatalogs = Partial<Record<AppLocale, MessageCatalog>>;

// Immutable, public app copy cached by locale, never by the current user.
// There is no process-global "active locale" to leak between SSR requests.
declare global {
  // Public, immutable locale copy also survives dev HMR and native ESM
  // renderer imports. Never put user text or the selected locale here.
  var __odmLocaleResources: { catalogs: LocaleCatalogs; registered: WeakSet<object> } | undefined;
}
const { catalogs, registered } = globalThis.__odmLocaleResources ??= { catalogs: {}, registered: new WeakSet<object>() };
export function registerMessages(resources: LocaleCatalogs) {
  if (registered.has(resources)) return;
  registered.add(resources);
  for (const [locale, messages] of Object.entries(resources)) {
    const key = locale as AppLocale;
    catalogs[key] = { ...catalogs[key], ...messages };
  }
}

export function catalogFor(locale: AppLocale, prefix = ""): MessageCatalog {
  return Object.fromEntries(Object.entries(catalogs[locale] ?? {}).filter(([key]) => key.startsWith(prefix)));
}

// A typed view for existing source-recognition helpers. Values are supplied
// by the nearest resource boundary, not statically imported by each helper.
export function scopedCatalog<T>(prefix: string): T {
  return new Proxy({}, { get: (_, locale: AppLocale) => catalogFor(locale, prefix) }) as T;
}

function missing(diagnostic: string, fallback: string): string {
  if (process.env.NODE_ENV !== "production") throw new Error(diagnostic);
  console.error(`[i18n] ${diagnostic}`);
  return fallback;
}

export function messageTemplate(locale: AppLocale, key: MessageKey): string {
  return catalogs[locale]?.[key] ?? missing(`Missing translation resource: ${locale}.${key}`, key);
}

export function createTranslator(locale: AppLocale) {
  return (key: MessageKey, params?: Record<string, string | number>): string =>
    messageTemplate(locale, key).replace(/\{(\w+)\}/g, (_, name: string) => {
      if (params?.[name] === undefined) return missing(`Missing translation parameter: ${key}.${name}`, `{${name}}`);
      return String(params[name]);
    });
}
