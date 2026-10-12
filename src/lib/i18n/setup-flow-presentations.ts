import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { setupAgentMessage } from "./setup-guide-presentations.ts";

export const SETUP_FLOW_ERRORS = {
  "network": "Could not reach the server.",
  "unreachable": "Could not reach this server.",
  "save": "Could not save. Try again.",
  "connection": "Could not make the connection.",
  "testRun": "The test could not run.",
  "switch": "Could not switch the tables over.",
  "inviteCreate": "Could not create the invite."
} as const;

// Project complete repository-owned setup frames only. Keep raw replies in
// state; provider/CLI diagnostics, model IDs, commands and user titles stay literal.
export function setupFlowMessage(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  const exact = Object.entries(catalogFor("en", "setupFlow.")).find(([key, value]) =>
    (key.startsWith("setupFlow.error.") || key.startsWith("setupFlow.detail.")) && value === raw && !/\{\w+\}/.test(value));
  if (exact) return t(exact[0] as MessageKey);
  let m = /^(.+) wants its API key\.$/.exec(raw);
  if (m) return t("setupFlow.detail.needsKey", { host: m[1] });
  m = /^(.+) wants an API key\.$/.exec(raw);
  if (m) return t("setupFlow.detail.needsAKey", { host: m[1] });
  m = /^Nothing answered at (.+)\. Is the server running, and is the address right\?$/.exec(raw);
  if (m) return t("setupFlow.detail.unanswered", { host: m[1] });
  m = /^(.+) turned the key down\. Check it was copied whole\.$/.exec(raw);
  if (m) return t("setupFlow.detail.turnedDown", { host: m[1] });
  m = /^(.+) answered (\d+) when asked for its models\.$/.exec(raw);
  if (m) return t("setupFlow.detail.status", { host: m[1], status: m[2] });
  m = /^(.+) lists no chat models\. Load one, then look again\.$/.exec(raw);
  if (m) return t("setupFlow.detail.noModels", { host: m[1] });
  m = /^(\d+(?:\.\d+)?|\?) s through the tables' own picture queue$/.exec(raw);
  if (m) return t("setupFlow.detail.queue", { seconds: m[1] });
  m = /^(\d+) x (\d+), not the landscape a map asks for; the table crops it$/.exec(raw);
  if (m) return t("setupFlow.detail.shape", { width: m[1], height: m[2] });
  m = /^It replied "([\s\S]*)" instead of the tool's answer\.$/.exec(raw);
  if (m) return t("setupFlow.detail.reply", { reply: m[1] });
  m = /^(.+) was not found\.$/.exec(raw);
  if (m) return t("setupFlow.detail.notFound", { label: m[1] });
  m = /^Run `([^`]+)` on this machine\.$/.exec(raw);
  if (m) return t("setupFlow.detail.signIn", { command: m[1] });
  const load = /^The invite codes did not load\. ([\s\S]+)$/.exec(raw);
  if (load) return t("setupFlow.error.invitesLoad", { reason: setupFlowMessage(load[1], locale) });
  const http = /^The server answered (\d+)\.$/.exec(raw);
  if (http) return t("setupFlow.error.httpRead", { status: http[1] });
  return setupAgentMessage(raw, locale);
}
