import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { uiRequestError, type UiRequestError } from "./api-errors.ts";
import { AGENT_SCOPE_CHOICES, THEME_CHOICES } from "./account-metadata.ts";
import type { AgentProgram } from "../agents/setup-line.ts";
import { DICE_LOOK_PRESETS, DICE_MATERIALS, DICE_TEXTURES } from "../dice/dice-look.ts";

export type AccountServerInfo = { serverName: string; version: string; graceDays: number; deviceWorld: boolean };
export function parseAccountServerInfo(data: unknown): AccountServerInfo {
  if (!data || typeof data !== "object" || !("serverName" in data) || typeof data.serverName !== "string"
    || !("version" in data) || typeof data.version !== "string"
    || !("accountDeletionGraceDays" in data) || typeof data.accountDeletionGraceDays !== "number"
    || !Number.isInteger(data.accountDeletionGraceDays) || data.accountDeletionGraceDays < 0
    || !("deviceWorld" in data) || typeof data.deviceWorld !== "boolean") throw new Error("Malformed server account policy.");
  return { serverName: data.serverName, version: data.version, graceDays: data.accountDeletionGraceDays, deviceWorld: data.deviceWorld };
}
export function accountGraceCopy(days: number, locale: AppLocale): string {
  return createTranslator(locale)(days === 0 ? "account.graceImmediate" : days === 1 ? "account.graceOne" : "account.graceMany", { days });
}
export function accountDate(iso: string, locale: AppLocale, style: "long" | "short" | "time" = "long"): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return createTranslator(locale)("account.invalidDate");
  return style === "time" ? date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString(locale, { year: "numeric", month: style, day: "numeric" });
}
export function deleteAccountReady(hasPassword: boolean, confirmation: string): boolean {
  return hasPassword ? confirmation.length > 0 : confirmation === "DELETE";
}
export function discordNoticeKey(query: URLSearchParams): MessageKey | null {
  return query.get("linked") === "1" ? "account.discordSuccess" : query.get("error") === "discord_taken" ? "account.discordTaken" : null;
}
export const ACCOUNT_ERROR_KEYS = {
  "Password is wrong.": "account.deleteWrongPassword", "Password is required.": "account.deletePasswordRequired",
  "Could not read the image.": "avatar.readError", "Canvas unavailable.": "avatar.canvasError",
} satisfies Record<string, MessageKey>;
export function accountRequestError(error: unknown, fallback: MessageKey): UiRequestError {
  const parsed = uiRequestError(error, fallback);
  const diagnostic = parsed.data.error ?? (error instanceof Error && error.message !== parsed.fallback ? error.message : "");
  const key = ACCOUNT_ERROR_KEYS[diagnostic as keyof typeof ACCOUNT_ERROR_KEYS];
  return { data: { ...parsed.data, ...(diagnostic ? { error: diagnostic } : {}) }, fallback: key ?? parsed.fallback };
}
export function agentScopeLabel(id: string, locale: AppLocale, field: "label" | "hint" = "label"): string {
  if (!AGENT_SCOPE_CHOICES.some((scope) => scope.id === id)) return id;
  return createTranslator(locale)(`agents.scope.${id}.${field}` as MessageKey);
}
export function themeChoiceLabel(id: typeof THEME_CHOICES[number]["id"], locale: AppLocale): string {
  return createTranslator(locale)(`appearance.${id}`);
}
export function diceLookLabel(kind: "preset" | "texture" | "material", id: string, locale: AppLocale): string {
  const rows = kind === "preset" ? DICE_LOOK_PRESETS : kind === "texture" ? DICE_TEXTURES : DICE_MATERIALS;
  const row = rows.find((entry) => entry.id === id);
  return row ? createTranslator(locale)(`diceLook.${kind}.${id}` as MessageKey) : id;
}
export function agentProgramLabel(program: AgentProgram, locale: AppLocale): string { return createTranslator(locale)(`agents.program.${program}`); }
export function agentSetupInstructions(program: AgentProgram, locale: AppLocale): string { return createTranslator(locale)(`agents.setup.${program}`); }
export function agentFirstCallText(first: { tool: string; createdAt: string }, locale: AppLocale): string {
  return createTranslator(locale)(first.createdAt ? first.tool ? "agents.firstToolTime" : "agents.firstTime" : first.tool ? "agents.firstTool" : "agents.first", {
    tool: first.tool, time: first.createdAt ? accountDate(first.createdAt, locale, "time") : "",
  });
}
export function agentConnectionActivity(data: unknown, grantId: string): { tool: string; createdAt: string } | null {
  if (!data || typeof data !== "object" || !("grants" in data) || !Array.isArray(data.grants)
    || !("recent" in data) || !Array.isArray(data.recent)) throw new Error("Malformed agent activity response.");
  const calls = data.recent.filter((row) => row && typeof row === "object" && row.grantId === grantId);
  const first = calls.at(-1);
  if (first) {
    if (typeof first.tool !== "string" || typeof first.createdAt !== "string") throw new Error("Malformed agent call.");
    return { tool: first.tool, createdAt: first.createdAt };
  }
  const used = data.grants.find((grant) => grant && typeof grant === "object" && grant.id === grantId)?.lastUsedAt;
  if (used && typeof used !== "string") throw new Error("Malformed agent activity date.");
  return used ? { tool: "", createdAt: used } : null;
}
