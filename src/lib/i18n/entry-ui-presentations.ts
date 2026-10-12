import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { ENTRY_TEXT_KEYS } from "./entry-ui-metadata.ts";
import type { ToolGuide } from "../tours/workshop-guide.ts";
import type { TourStep } from "../tours/logic.ts";
import { genreLabel } from "./settings.ts";
import { GENRES } from "../schemas/game-settings-options.ts";

export const ENTRY_NOTICES = { create: "Could not create that workshop.", clone: "Could not duplicate that workshop.", delete: "Could not delete that workshop.", refresh: "Could not refresh the workshop list.", network: "Could not reach the server.", read: "That bundle could not be read.", import: "That bundle could not be imported." } as const;
export function bundleFileTooLarge(max: number): string { return `That file is larger than ${max} MB.`; }

type FrameKey = Extract<MessageKey, `entryHub.frame.${string}`> extends `entryHub.frame.${infer Key}` ? Key : never;
export function entryFrame(key: FrameKey, values: Record<string, string | number>, locale: AppLocale): string {
  return createTranslator(locale)(`entryHub.frame.${key}` as MessageKey, values);
}
export function entryText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const key = Object.hasOwn(ENTRY_TEXT_KEYS, raw) ? ENTRY_TEXT_KEYS[raw as keyof typeof ENTRY_TEXT_KEYS] : undefined;
  return key ? createTranslator(locale)(key) : raw;
}
export function joinGenreLabel(raw: string, locale: AppLocale): string {
  if (locale !== "en" && (GENRES as readonly string[]).includes(raw)) return genreLabel(raw as typeof GENRES[number], locale);
  return raw.replace(/[-_]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
}
// The UI imports only the selected help locale. Guide keys are keyed to native
// producer IDs, never inferred from a player's text or a fuzzy label match.
export function workshopGuideView(guide: ToolGuide, locale: AppLocale): ToolGuide {
  if (locale === "en") return guide;
  const t = createTranslator(locale), prefix = `workshopHelp.guide.${guide.id}`;
  return { ...guide, title: t(`${prefix}.title` as MessageKey), purpose: t(`${prefix}.purpose` as MessageKey),
    steps: guide.steps.map((_, i) => t(`${prefix}.step.${i}` as MessageKey)), tips: guide.tips.map((_, i) => t(`${prefix}.tip.${i}` as MessageKey)) };
}
export function shelfTourView(steps: readonly TourStep[], locale: AppLocale): TourStep[] {
  if (locale === "en") return [...steps];
  const t = createTranslator(locale);
  return steps.map(step => ({ ...step, title: t(`entryHub.tour.${step.id}.title` as MessageKey), body: t(`entryHub.tour.${step.id}.body` as MessageKey) }));
}
// Bounded original system diagnostics retain their English API form in state.
// Unknown pack messages remain literal; no generic prose/name replacement.
export function entryNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const status = /^The server answered (\d{3})\.$/.exec(raw);
  if (status) return entryFrame("status", { status: status[1] }, locale);
  const load = /^Your workshops did not load\. ([\s\S]+)$/.exec(raw);
  if (load) return entryFrame("loadFailed", { reason: entryNotice(load[1], locale) }, locale);
  const frames: Array<[RegExp, FrameKey, string[]]> = [
    [/^That file is larger than (\d+) MB\.$/, "fileLarge", ["max"]],
    [/^That file is (\d+) MB\. A workshop bundle caps at (\d+) MB\.$/, "fileCap", ["size", "max"]],
    [/^That bundle is format version ([\s\S]+); this build reads version (\d+)\.$/, "version", ["version", "current"]],
    [/^That bundle is malformed at ([\s\S]+?): ([\s\S]+)$/, "malformed", ["path", "detail"]],
    [/^Built on ([\s\S]+)'s setting\. It is a fan work and is not affiliated with them\.$/, "fan", ["name"]],
    [/^Carries (\d+) image \(map backdrops and portraits\)\. Only pass on art you made or have the right to share\.$/, "imagesOne", ["count"]],
    [/^Carries (\d+) images \(map backdrops and portraits\)\. Only pass on art you made or have the right to share\.$/, "imagesMany", ["count"]],
    [/^Written as a chapter of the shared workshop "([\s\S]+)"\. The (\d+) record its cards pick from there ride along, so it stands on its own\.$/, "chapterOne", ["name", "count"]],
    [/^Written as a chapter of the shared workshop "([\s\S]+)"\. The (\d+) records its cards pick from there ride along, so it stands on its own\.$/, "chapterMany", ["name", "count"]],
    [/^(\d+) stock line has no item or none in stock and is left out of the Market\.$/, "emptyStockOne", ["count"]],
    [/^(\d+) stock lines have no item or none in stock and are left out of the Market\.$/, "emptyStockMany", ["count"]],
    [/^(\d+) link points at something the bundle does not hold and is dropped\.$/, "danglingOne", ["count"]],
    [/^(\d+) links point at something the bundle does not hold and are dropped\.$/, "danglingMany", ["count"]],
  ];
  for (const [pattern, key, names] of frames) { const match = pattern.exec(raw); if (match) return entryFrame(key, Object.fromEntries(names.map((name, i) => [name, match[i + 1]])), locale); }
  const plugin = /^Carries a world pack draft(?: \("([\s\S]+)"\))?(?: with (\d+) pictures?)?\. It lands in the new workshop's Plugin tool; nothing is installed\.$/.exec(raw);
  if (plugin) return entryFrame("plugin", { name: plugin[1] ? entryFrame("pluginName", { name: plugin[1] }, locale) : "", pictures: plugin[2] ? entryFrame(Number(plugin[2]) === 1 ? "picturesOne" : "picturesMany", { count: plugin[2] }, locale) : "" }, locale);
  const rename = /^(monster|item|spell|feat|background|species|subclass) ([\s\S]+) is "([\s\S]+)" here: your own \2 has other rules\.$/.exec(raw);
  if (rename) return entryFrame("renamed", { kind: entryText(rename[1], locale), name: rename[2], newName: rename[3] }, locale);
  return entryText(raw, locale);
}
