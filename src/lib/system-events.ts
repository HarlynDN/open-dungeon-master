import { isAppLocale, type AppLocale } from "./i18n/locales.ts";

// Native event facts, not translated protocol values. New families can extend
// this union and their display catalog without inspecting historical prose.
export type SystemEventData =
  | { kind: "partyItem"; direction: "stow" | "take"; actor: string; item: string; qty: number }
  | { kind: "partyCoins"; direction: "deposit" | "withdraw"; actor: string; copper: number }
  | { kind: "partyXp"; spent: number; names: string[] };
export type SystemEvent = SystemEventData & { locale: AppLocale };
export function parseSystemEvent(raw: unknown): SystemEvent | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const event = raw as Record<string, unknown>;
  if (!isAppLocale(event.locale)) return undefined;
  const integer = (value: unknown) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
  if (event.kind === "partyItem" && (event.direction === "stow" || event.direction === "take") && typeof event.actor === "string" && typeof event.item === "string" && integer(event.qty) && Number(event.qty) > 0) {
    return { kind: event.kind, direction: event.direction, actor: event.actor, item: event.item, qty: event.qty as number, locale: event.locale };
  }
  if (event.kind === "partyCoins" && (event.direction === "deposit" || event.direction === "withdraw") && typeof event.actor === "string" && integer(event.copper)) {
    return { kind: event.kind, direction: event.direction, actor: event.actor, copper: event.copper as number, locale: event.locale };
  }
  if (event.kind === "partyXp" && integer(event.spent) && Array.isArray(event.names) && event.names.every(name => typeof name === "string")) {
    return { kind: event.kind, spent: event.spent as number, names: [...event.names], locale: event.locale };
  }
  return undefined;
}
export function systemEventGlyph(event: SystemEvent | undefined): string | undefined {
  switch (event?.kind) {
    case "partyItem": return "tab-party";
    case "partyCoins": return "cue-coin";
    case "partyXp": return "rest-level-up";
    default: return undefined;
  }
}
