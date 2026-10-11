import type { AppLocale } from "./locales.ts";
import { registerMessages, type MessageCatalog, type LocaleCatalogs } from "./translator.ts";
import type { MessageScope } from "./resource-scope.ts";

// Literal import paths let Next emit independent language/scope chunks.
const loaders: Record<AppLocale, Record<MessageScope, () => Promise<{ default: MessageCatalog }>>> = {
  en: { ui: () => import("./resources/en.ui.json", { with: { type: "json" } }), content: () => import("./resources/en.content.json", { with: { type: "json" } }), help: () => import("./resources/en.help.json", { with: { type: "json" } }) },
  "zh-CN": { ui: () => import("./resources/zh-CN.ui.json", { with: { type: "json" } }), content: () => import("./resources/zh-CN.content.json", { with: { type: "json" } }), help: () => import("./resources/zh-CN.help.json", { with: { type: "json" } }) },
};
const pending = new Map<string, Promise<void>>();
export function registerLocaleScope(resources: LocaleCatalogs, scope: MessageScope) {
  registerMessages(resources);
  for (const locale of Object.keys(resources)) pending.set(`${locale}:${scope}`, Promise.resolve());
}
export function loadLocaleMessages(locale: AppLocale, scope: MessageScope): Promise<void> {
  const key = `${locale}:${scope}`;
  let promise = pending.get(key);
  if (!promise) {
    promise = loaders[locale][scope]().then(({ default: messages }) => { registerMessages({ [locale]: messages }); });
    pending.set(key, promise);
    void promise.catch(() => { pending.delete(key); }); // a retry can recover an interrupted download
  }
  return promise;
}
