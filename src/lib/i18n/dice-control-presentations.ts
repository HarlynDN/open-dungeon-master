import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { PIXEL_SELECTION_CANCELLED } from "../dice/pixel-chooser-errors.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";

function exact(source: string, prefix: string, locale: AppLocale): string | undefined {
  const row = Object.entries(catalogFor("en", prefix)).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  return row ? createTranslator(locale)(row[0] as MessageKey) : undefined;
}
export function diceAudienceText(source: string, locale: AppLocale): string {
  return locale === "en" ? source : exact(source, "diceTrayUi.audience.", locale) ?? source;
}
export function diceTrayText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const known = exact(source, "diceTrayUi.error.", locale);
  if (known) return known;
  const t = createTranslator(locale);
  const patterns = [
    [/^Invalid dice expression: ([\s\S]+)$/, "diceTrayUi.error.invalid", "expression"],
    [/^Invalid dice term: ([\s\S]+)$/, "diceTrayUi.error.term", "term"],
    [/^Dice count out of range in: ([\s\S]+)$/, "diceTrayUi.error.count", "term"],
    [/^Die size out of range in: ([\s\S]+)$/, "diceTrayUi.error.size", "term"],
    [/^Keep count out of range in: ([\s\S]+)$/, "diceTrayUi.error.keep", "term"],
    [/^Reroll threshold out of range in: ([\s\S]+)$/, "diceTrayUi.error.reroll", "term"],
    [/^A roll's flat bonus is at most ([0-9]+) either way: roll the dice and add the rest at the table\.$/, "diceTrayUi.error.flat", "limit"],
  ] as const;
  for (const [pattern, key, parameter] of patterns) {
    const match = pattern.exec(source);
    if (match) return t(key, { [parameter]: match[1] });
  }
  return controlText(source, locale);
}
export type DiceConnectionFailure = { name: string; message: string };
// The chooser signal survives localization. Later connection errors remain visible.
// The English message filter remains
// for SDKs that wrap cancellation in a plain Error instead of a DOMException.
export function diceConnectionFailure(cause: unknown): DiceConnectionFailure | null {
  if (!cause || typeof cause !== "object") return null;
  const error = cause as { name?: unknown; message?: unknown };
  const name = typeof error.name === "string" ? error.name : "";
  const message = typeof error.message === "string" ? error.message : "";
  if (name === PIXEL_SELECTION_CANCELLED || !message || /cancel|user gesture|no devices/i.test(message)) return null;
  return { name, message };
}
export function diceConnectionText(error: DiceConnectionFailure | null, locale: AppLocale): string {
  if (!error) return "";
  if (locale === "en") return error.message;
  const known = exact(error.message, "diceSourceUi.error.", locale);
  if (known) return known;
  const key = error.name === "NetworkError" ? "diceSourceUi.error.network"
    : error.name === "NotAllowedError" ? "diceSourceUi.error.permission"
    : error.name === "SecurityError" ? "diceSourceUi.error.security" : "diceSourceUi.error.failed";
  return createTranslator(locale)(key, { reason: error.message });
}
