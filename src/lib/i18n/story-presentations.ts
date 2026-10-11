import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { campaignEntryError } from "./campaign-entry-presentations.ts";
import { romanNumeral } from "../dm/arc-logic.ts";
import type { ArcEventKind, WaypointKind } from "../dm/arc-logic.ts";
import type { AppLocale } from "./locales.ts";

const WAYPOINT_KEYS = {
  place: "storyUi.kind.waypoint.place", npc: "storyUi.kind.waypoint.npc",
  item: "storyUi.kind.waypoint.item", objective: "storyUi.kind.waypoint.objective",
  fight: "storyUi.kind.waypoint.fight", narrative: "storyUi.kind.waypoint.narrative",
} as const satisfies Record<WaypointKind, MessageKey>;
const EVENT_KEYS = {
  npc_encounter: "storyUi.kind.event.npc_encounter", ally: "storyUi.kind.event.ally",
  twist: "storyUi.kind.event.twist", betrayal: "storyUi.kind.event.betrayal",
  deadline: "storyUi.kind.event.deadline", discovery: "storyUi.kind.event.discovery",
  setpiece: "storyUi.kind.event.setpiece",
} as const satisfies Record<ArcEventKind, MessageKey>;

export function storyActNumber(act: number, locale: AppLocale): string | number {
  return locale === "en" ? romanNumeral(act) : act;
}

export function storyKindLabel(kind: "waypoint" | "event", value: string, locale: AppLocale): string {
  const keys: Partial<Record<string, MessageKey>> = kind === "waypoint" ? WAYPOINT_KEYS : EVENT_KEYS;
  const key = Object.hasOwn(keys, value) ? keys[value] : undefined;
  if (locale !== "en" && key) return createTranslator(locale)(key);
  return kind === "event" ? value.replaceAll("_", " ") : value;
}

// Projection only. Raw errors/warnings remain in state for locale switching;
// unknown server messages and all quoted character names remain verbatim.
export function storyText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  const entry = campaignEntryError(source, locale);
  if (entry !== source) return entry;
  const prefix = "The chapters did not load. ";
  if (source.startsWith(prefix)) return t("storyUi.error.chapters", { reason: storyText(source.slice(prefix.length), locale) });
  const rows = { ...catalogFor("en", "storyUi.error."), ...catalogFor("en", "storyUi.warning.") };
  const exact = Object.entries(rows).find(([, value]) => value === source && !/\{\w+\}/.test(value));
  if (exact) return t(exact[0] as MessageKey);
  const limit = /^The arc is already at its (\d+)-beat limit\.$/.exec(source);
  if (limit) return t("storyUi.error.beatLimit", { count: limit[1] });
  const status = /^The server answered (\d+)\.$/.exec(source);
  if (status) return t("storyUi.error.http", { status: status[1] });
  const messages = /^(\d+) messages? after the chapter (\d+) boundary will be deleted\.$/.exec(source);
  if (messages) return t(Number(messages[1]) === 1 ? "storyUi.warning.messages.single" : "storyUi.warning.messages.many", { count: messages[1], chapter: messages[2] });
  const chapters = /^(\d+) later chapters? will be deleted along with their summaries\.$/.exec(source);
  if (chapters) return t(Number(chapters[1]) === 1 ? "storyUi.warning.chapters.single" : "storyUi.warning.chapters.many", { count: chapters[1] });
  const member = /^([\s\S]+) joined after this point and will be removed from the campaign\.$/.exec(source);
  return member ? t("storyUi.warning.member", { name: member[1] }) : source;
}
