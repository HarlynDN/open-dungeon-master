import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";
import type { FactionAttitude } from "../dm/faction-logic.ts";
import type { QuestStatus } from "../dm/quest-logic.ts";

const ATTITUDES = {
  hostile: "recordUi.faction.attitude.hostile", wary: "recordUi.faction.attitude.wary",
  neutral: "recordUi.faction.attitude.neutral", friendly: "recordUi.faction.attitude.friendly",
  allied: "recordUi.faction.attitude.allied",
} as const satisfies Record<FactionAttitude, MessageKey>;
const STATUSES = {
  active: "recordUi.quest.status.active", done: "recordUi.quest.status.done",
  failed: "recordUi.quest.status.failed", hidden: "recordUi.quest.status.hidden",
} as const satisfies Record<QuestStatus, MessageKey>;
const REPUTATIONS = {
  hunted: "recordUi.faction.reputation.hunted", disliked: "recordUi.faction.reputation.disliked",
  suspected: "recordUi.faction.reputation.suspected", unknown: "recordUi.faction.reputation.unknown",
  noticed: "recordUi.faction.reputation.noticed", trusted: "recordUi.faction.reputation.trusted",
  honoured: "recordUi.faction.reputation.honoured",
} as const satisfies Record<string, MessageKey>;
function label(keys: Partial<Record<string, MessageKey>>, source: string, locale: AppLocale): string {
  const key = Object.hasOwn(keys, source) ? keys[source] : undefined;
  return key ? createTranslator(locale)(key) : source;
}
export const factionAttitudeLabel = (source: string, locale: AppLocale) => label(ATTITUDES, source, locale);
export const factionStandingLabel = (source: string, locale: AppLocale) => label(REPUTATIONS, source, locale);
export const questStatusLabel = (source: QuestStatus, locale: AppLocale) => label(STATUSES, source, locale);

// Match only native diagnostic frames. Store server text unchanged so a UI
// locale switch merely redraws it, never replays a write or rewrites history.
export function recordText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  for (const [prefix, key] of [
    ["The factions did not load. ", "recordUi.error.factionLoad"],
    ["The quest log did not load. ", "recordUi.error.questLoad"],
  ] as const) {
    if (source.startsWith(prefix)) return t(key, { reason: recordText(source.slice(prefix.length), locale) });
  }
  const row = Object.entries(catalogFor("en", "recordUi.error.")).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  if (row) return t(row[0] as MessageKey);
  const status = /^The server answered ([0-9]+)\.$/.exec(source);
  return status ? t("recordUi.error.status", { status: status[1] }) : controlText(source, locale);
}
