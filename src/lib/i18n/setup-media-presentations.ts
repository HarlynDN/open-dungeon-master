import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Locale projection of owned test/tts-backend diagnostics only. Keep raw
// replies in state and upstream details, hosts, endpoints and IDs literal.
export function setupSpeechErrorText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  const exact = Object.entries(catalogFor("en", "setupMedia.error.")).find(([, value]) => value === raw && !/\{\w+\}/.test(value));
  if (exact) return t(exact[0] as MessageKey);
  const prefix = /^(The Kokoro speech server|The speech server) (.+)$/.exec(raw);
  if (!prefix) return raw;
  const server = t(prefix[1] === "The Kokoro speech server" ? "setupMedia.error.kokoro" : "setupMedia.error.server"), reason = prefix[2];
  let m = /^refused the API key \(HTTP (401|403)\)\.$/.exec(reason);
  if (m) return t("setupMedia.error.refused", { server, status: m[1] });
  m = /^has no speech endpoint at (.+) \(HTTP 404\)\.$/.exec(reason);
  if (m) return t("setupMedia.error.endpoint", { server, endpoint: m[1] });
  m = /^answered HTTP (\d+)(?:: (.*))?\.$/.exec(reason);
  if (m) return t("setupMedia.error.http", { server, status: m[1], detail: m[2] ? t("setupMedia.error.detail", { detail: m[2] }) : "" });
  if (reason === "took too long to answer.") return t("setupMedia.error.timeout", { server });
  if (reason === "answered without any audio.") return t("setupMedia.error.emptyAudio", { server });
  m = /^could not be reached at (.+)\.$/.exec(reason);
  return m ? t("setupMedia.error.unreachable", { server, host: m[1] }) : raw;
}
