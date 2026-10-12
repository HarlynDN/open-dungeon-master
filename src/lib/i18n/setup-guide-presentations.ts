import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Program names, paths, model IDs and external diagnostics remain literal.
// Only the harness's complete owned status frames are projected for display.
export function setupAgentMessage(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  const exact = Object.entries(catalogFor("en", "setupGuide.message.")).find(([, value]) => value === raw && !/\{\w+\}/.test(value));
  if (exact) return t(exact[0] as MessageKey);
  const failed = /^(.+) is installed but not signed in on this machine\.$/.exec(raw);
  if (failed) return t("setupGuide.message.signedOut", { label: failed[1] });
  const missing = /^(.+) was not found on this machine\.$/.exec(raw);
  if (missing) return t("setupGuide.message.notFound", { label: missing[1] });
  const path = /^Nothing runnable at (.+)\.$/.exec(raw);
  if (path) return t("setupGuide.message.path", { path: path[1] });
  const ignored = /^(?:(Codex is installed but not signed in on this machine\.) )?This Codex ignores (a setting|settings) the lockdown relies on \((.+)\)\. Update Open Dungeon Master, or hold Codex at a version it supports\.$/.exec(raw);
  if (ignored) return [ignored[1] ? t("setupGuide.message.signedOut", { label: "Codex" }) : "", t(ignored[2] === "a setting" ? "setupGuide.message.codexIgnoredOne" : "setupGuide.message.codexIgnoredMany", { keys: ignored[3] })].filter(Boolean).join(" ");
  return raw;
}
