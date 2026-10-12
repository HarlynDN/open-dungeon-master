import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { dmToolsText } from "./dm-tools-presentations.ts";
import { encounterPrepError } from "./encounter-prep-presentations.ts";
import { combatName } from "./combat-ui-presentations.ts";
import { BEAT_KIND_LABELS, type BeatKind } from "../dm/beat-logic.ts";
import type { DmCover } from "../dm/delegation.ts";

export const CONSOLE_NOTICES = { network: "Could not reach the server.", floor: "Could not change who may act.", monsters: "The monsters could not act.", noAct: "Nothing to do.", cover: "Could not hand it over.", draft: "Could not write a draft.", record: "Could not record that.", lookup: "Could not look up a monster.", refused: "The engine refused that." } as const;
type ConsoleFrameKey = Extract<MessageKey, `dmConsoleUi.frame.${string}`> extends `dmConsoleUi.frame.${infer Key}` ? Key : never;
let captions: Map<string, MessageKey> | undefined;
export function consoleFrame(key: ConsoleFrameKey, values: Record<string, string | number>, locale: AppLocale): string {
  return createTranslator(locale)(`dmConsoleUi.frame.${key}` as MessageKey, values);
}
export function consoleUiText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  captions ??= new Map(Object.entries(catalogFor("en", "dmConsoleUi.copy.")).map(([key, text]) => [text, key as MessageKey]));
  const key = captions.get(raw);
  return key ? createTranslator(locale)(key) : raw;
}
const TABS = { assist: "Assist", combat: "Combat", party: "Party", world: "World", social: "Social", story: "Story", table: "Table", maps: "Maps", cast: "Cast", bestiary: "Bestiary", storyboard: "Storyboard", tables: "Tables" } as const;
export function consoleTabLabel(tab: keyof typeof TABS, locale: AppLocale): string { return consoleUiText(TABS[tab], locale); }
export function consoleBeatKind(kind: string, locale: AppLocale): string {
  return consoleUiText(Object.hasOwn(BEAT_KIND_LABELS, kind) ? BEAT_KIND_LABELS[kind as BeatKind] : "Beat", locale);
}
export function consoleFloorStatus(mode: "open" | "hold" | "spotlight" | "initiative", locale: AppLocale): string {
  return createTranslator(locale)(`dmConsoleUi.floor.${mode}`);
}
export function consoleCoverText(cover: DmCover | null, locale: AppLocale): string {
  if (!cover) return "";
  return cover.turnsLeft <= 0 ? consoleUiText("The DM has the table back.", locale)
    : cover.turnsLeft === 1 ? consoleUiText("The DM stepped away; the AI is answering one more time.", locale)
    : consoleFrame("coverNotice", { count: cover.turnsLeft }, locale);
}
export function monsterTurnReceipt(count: number): string {
  return count ? `${count} ${count === 1 ? "monster" : "monsters"} acted. See the log.` : CONSOLE_NOTICES.noAct;
}
export function consoleNotice(raw: string, locale: AppLocale, names: readonly string[] = []): string {
  if (!raw || locale === "en") return raw;
  const received = /^(\d+) (monster|monsters) acted\. See the log\.$/.exec(raw);
  if (received) return consoleFrame(received[2] === "monster" ? "monsterOne" : "monsterMany", { count: received[1] }, locale);
  const name = (value: string) => names.includes(value) ? combatName(value, "enemy", locale) : value;
  const max = /^([\s\S]+) has (\d+) hit points at most\.$/.exec(raw);
  if (max) return consoleFrame("hpMax", { name: name(max[1]), max: max[2] }, locale);
  const unavailable = /^([\s\S]+) is (dead|fled); only a creature still in the fight can have its hit points corrected\.$/.exec(raw);
  if (unavailable) return consoleFrame("hpUnavailable", { name: name(unavailable[1]), status: consoleFrame(unavailable[2] === "dead" ? "dead" : "fled", {}, locale) }, locale);
  const zero = /^Hit points are corrected to 1 or more; dropping ([\s\S]+) to 0 goes through Damage an enemy, so the engine decides what the fall means\.$/.exec(raw);
  if (zero) return consoleFrame("hpZero", { name: name(zero[1]) }, locale);
  if (raw === "Name the enemy and the hit points it now has.") return consoleFrame("hpMissing", {}, locale);
  if (raw === "That enemy is not in the fight running now.") return consoleFrame("hpNoFight", {}, locale);
  if (raw === CONSOLE_NOTICES.floor) return consoleFrame("floorFail", {}, locale);
  if (raw === CONSOLE_NOTICES.lookup) return consoleFrame("lookupFail", {}, locale);
  if (raw === CONSOLE_NOTICES.refused) return createTranslator(locale)("dmField.refused");
  // Only known native diagnostics are projected. Table/story prose stays raw.
  return encounterPrepError(dmToolsText(consoleUiText(raw, locale), locale), locale);
}
export function tableCoverageText(value: { die: number; gaps: number; overlaps: number }, locale: AppLocale): string {
  if (!value.gaps && !value.overlaps) return consoleFrame("covers", { die: value.die }, locale);
  const parts = [];
  if (value.gaps) parts.push(consoleFrame(value.gaps === 1 ? "gapOne" : "gapMany", { count: value.gaps }, locale));
  if (value.overlaps) parts.push(consoleFrame(value.overlaps === 1 ? "overlapOne" : "overlapMany", { count: value.overlaps }, locale));
  return parts.join(consoleFrame("list", {}, locale));
}
