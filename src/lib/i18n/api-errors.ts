import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Stable auth response codes are additive: the English error remains
// available to API consumers, while UI rendering survives locale changes.
export const AUTH_ERROR_KEYS = {
  invalid_input: "auth.invalidInput", username_rules: "auth.usernameRules", password_rules: "auth.passwordRules",
  rate_limited: "auth.rateLimited", wrong_credentials: "auth.wrongCredentials", username_taken: "auth.usernameTaken",
  signups_disabled: "auth.signupsDisabled", invite_required: "auth.inviteRequired", invite_invalid: "auth.inviteInvalid",
  setup_wrong: "auth.setupWrong", setup_required: "auth.setupRequired", setup_finished: "auth.setupFinished",
  room_required: "auth.roomRequired", room_invalid: "auth.roomInvalid", room_full: "auth.roomFull", room_unavailable: "auth.roomUnavailable",
  session_expired: "auth.sessionExpired", wrong_current_password: "password.wrongCurrent",
  room_code_format: "home.roomCodeFormat", password_required: "auth.passwordRequired",
  lobby_empty: "lobby.blocker.empty", lobby_no_player: "lobby.blocker.no_player",
  lobby_no_character: "lobby.blocker.no_character", lobby_not_ready: "lobby.blocker.not_ready",
} satisfies Record<string, MessageKey>;

export type ApiUiError = { error?: string; errorCode?: string; retryAfterSec?: number };
// Keep the response and fallback key in state, not an already translated
// string: a failed request must switch language with the surrounding page.
export type UiRequestError = { data: ApiUiError; fallback: MessageKey };
class UiRequestFailure extends Error {
  readonly ui: UiRequestError;
  constructor(ui: UiRequestError) { super(ui.data.error ?? ui.fallback); this.ui = ui; }
}
export function uiRequestError(error: unknown, fallback: MessageKey): UiRequestError {
  return error instanceof UiRequestFailure ? error.ui : { data: {}, fallback };
}
export async function readUiResponse<T>(request: Promise<Response>, fallback: MessageKey): Promise<T> {
  let response: Response;
  try { response = await request; }
  catch { throw new UiRequestFailure({ data: {}, fallback: "prep.networkError" }); }
  const data = await response.json().catch(() => null);
  if (!response.ok || (data === null && response.status !== 204)) {
    throw new UiRequestFailure({ data: data && typeof data === "object" ? data : {}, fallback });
  }
  return (data ?? {}) as T;
}
export function requestErrorText(locale: AppLocale, error: UiRequestError | null): string {
  return error ? apiErrorText(locale, error.data, error.fallback) : "";
}
// Compatibility with the shared list loader's English diagnostic. Keep the
// original diagnostic in state so switching UI language rerenders a failure.
export function loadErrorText(locale: AppLocale, error: string, fallback: MessageKey): string {
  return requestErrorText(locale, error ? { data: { error }, fallback } : null);
}
export function apiErrorText(locale: AppLocale, data: ApiUiError, fallback: MessageKey, params?: Record<string, string | number>): string {
  const key = data.errorCode && AUTH_ERROR_KEYS[data.errorCode as keyof typeof AUTH_ERROR_KEYS];
  if (key) return createTranslator(locale)(key, { seconds: data.retryAfterSec ?? 0 });
  return locale === "en" && data.error ? data.error : createTranslator(locale)(fallback, params);
}
