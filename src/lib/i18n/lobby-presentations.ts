import { scopedCatalog } from "./translator.ts";
import type { LobbyBlockerReason } from "../dm/viewer.ts";
import { createTranslator } from "./translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";
import type { CHARACTER_NAME_MESSAGES as CHARACTER_NAME_MESSAGES_Shape } from "./character-name-messages.ts";

export function lobbyBlockerText(reason: LobbyBlockerReason | null, locale: AppLocale = DEFAULT_LOCALE): string {
  return reason ? createTranslator(locale)(`lobby.blocker.${reason}`) : "";
}

// Stored sheets carry canonical IDs for built-ins and arbitrary names for
// homebrew. Translate only registered IDs; custom text is shown as written.
// English keeps the lobby's existing ID display, including underscore spaces.
export function characterKindLabel(kind: "race" | "class", value: string, locale: AppLocale = DEFAULT_LOCALE): string {
  const key = `rule.${kind}.${value.toLowerCase()}` as keyof typeof CHARACTER_NAME_MESSAGES.en;
  if (locale !== "en" && Object.hasOwn(CHARACTER_NAME_MESSAGES[locale], key)) return CHARACTER_NAME_MESSAGES[locale][key];
  return kind === "race" ? value.replaceAll("_", " ") : value;
}

const CHARACTER_NAME_MESSAGES = scopedCatalog<typeof CHARACTER_NAME_MESSAGES_Shape>("rule.");
