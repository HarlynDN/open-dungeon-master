import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { Suggestion } from "../workshop/board.ts";
import type { CompileSummary } from "../workshop/board-compile.ts";
import { encounterPrepError } from "./encounter-prep-presentations.ts";

export const STORYBOARD_NOTICES = {"add": "That card could not be added.", "save": "That card could not be saved.", "delete": "That card could not be deleted.", "shared": "That could not be changed.", "network": "Could not reach the server.", "whisper": "The whisper did not go through.", "table": "Could not reach the table."} as const;

type FrameKey = Extract<MessageKey, `storyboardUi.frame.${string}`> extends `storyboardUi.frame.${infer Key}` ? Key : never;
let captions: Map<string, MessageKey> | undefined;
export function storyboardFrame(key: FrameKey, values: Record<string, string | number>, locale: AppLocale): string {
  return createTranslator(locale)(`storyboardUi.frame.${key}` as MessageKey, values);
}
export function storyboardText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  captions ??= new Map(Object.entries(catalogFor("en", "storyboardUi.copy.")).map(([key, value]) => [value, key as MessageKey]));
  const key = captions.get(raw);
  return key ? createTranslator(locale)(key) : raw;
}
export function storyboardNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const load = /^The storyboard did not load\. ([\s\S]+)$/.exec(raw);
  if (load) return createTranslator(locale)("storyboardUi.loadFailed", { reason: encounterPrepError(load[1], locale) });
  const full = /^A board holds (\d+) cards\. Split this into a second workshop\.$/.exec(raw);
  if (full) return storyboardFrame("boardFull", { count: full[1] }, locale);
  const nested = /^"([\s\S]+)" draws on a shared workshop itself\. Pick the one it draws on instead\.$/.exec(raw);
  if (nested) return storyboardFrame("nested", { name: nested[1] }, locale);
  return encounterPrepError(storyboardText(raw, locale), locale);
}
// This view accepts only the native producer's exact title/reason pairs. It
// never scans saved card bodies or re-translates authored titles. Unknown
// extensions keep their own strings, while new locales share the same frames.
export function storyboardSuggestion(suggestion: Suggestion, locale: AppLocale): Pick<Suggestion, "title" | "reason"> {
  const raw = { title: suggestion.title, reason: suggestion.reason };
  if (locale === "en") return raw;
  const structural: Record<string, [string, string]> = {
    "missing:hook": ["Why would they go?", "There is nothing on the board a party would walk toward. Everything here happens whether they turn up or not."],
    "missing:setting": ["Where this happens", "Nothing on the board is anywhere. The first question at the table is where they are."],
    "missing:event": ["What it leads to", "There is history here and nothing happening. Backstory the party never collides with is backstory they never learn."],
  };
  const fixed = Object.hasOwn(structural, suggestion.id) ? structural[suggestion.id] : undefined;
  if (fixed && raw.title === fixed[0] && raw.reason === fixed[1]) return { title: storyboardText(raw.title, locale), reason: storyboardText(raw.reason, locale) };
  const specs: Array<[string, RegExp, FrameKey, FrameKey]> = [
    ["payoff:", /^What happens when they follow "([\s\S]+)"$/, "payoffTitle", "payoffReason"],
    ["reason:", /^Why they are at "([\s\S]+)"$/, "reasonTitle", "reasonReason"],
    ["reveal:", /^How they find out about "([\s\S]+)"$/, "revealTitle", "revealReason"],
    ["choice:", /^The other way out of "([\s\S]+)"$/, "choiceTitle", "choiceReason"],
    ["context:", /^What sets up "([\s\S]+)"$/, "contextTitle", "contextReason"],
  ];
  for (const [prefix, pattern, titleKey, reasonKey] of specs) {
    if (!suggestion.id.startsWith(prefix)) continue;
    const matched = pattern.exec(raw.title);
    if (!matched) continue;
    const name = matched[1];
    const values = { name, other: "" };
    if (prefix === "choice:") {
      const start = `"${name}" offers one route of several, and "`, end = '" is the only one drawn.';
      if (!raw.reason.startsWith(start) || !raw.reason.endsWith(end)) continue;
      values.other = raw.reason.slice(start.length, -end.length);
    }
    if (raw.reason === storyboardFrame(reasonKey, values, "en")) return { title: storyboardFrame(titleKey, values, locale), reason: storyboardFrame(reasonKey, values, locale) };
  }
  const unused: Array<[string, FrameKey]> = [["npcs", "unusedNpc"], ["maps", "unusedMap"], ["encounters", "unusedEncounter"], ["locations", "unusedLocation"]];
  for (const [bucket, key] of unused) {
    const values = { name: raw.title };
    if (suggestion.id.startsWith(`unused:${bucket}:`) && raw.reason === storyboardFrame(key, values, "en")) return { title: raw.title, reason: storyboardFrame(key, values, locale) };
  }
  if (suggestion.id.startsWith("link:") && raw.reason === storyboardFrame("linkReason", { name: raw.title }, "en")) return { title: raw.title, reason: storyboardFrame("linkReason", { name: raw.title }, locale) };
  return raw;
}
export function storyboardSummary(summary: CompileSummary, locale: AppLocale): { text: string; refusal: string } {
  const patterns: Array<[RegExp, FrameKey]> = [
    [/^(\d+) lore entr(?:y|ies)$/, "lore"], [/^(\d+) quests?$/, "quests"], [/^(\d+) prepared encounters?$/, "encounters"], [/^(\d+) DM-only notes?$/, "notes"],
    [/^(\d+) planned moments? on routes that may not be taken$/, "moments"], [/^a new act of up to (\d+) beats?$/, "act"], [/^a story arc of (\d+) beats$/, "arc"],
  ];
  const items = summary.lines.map((line) => {
    if (locale === "en") return line;
    for (const [pattern, key] of patterns) { const match = pattern.exec(line); if (match) return storyboardFrame(key, { count: match[1] }, locale); }
    return line;
  }).join(storyboardFrame("list", {}, locale));
  const short = /^An arc needs at least (\d+) things that happen; the board has (\d+)\.$/.exec(summary.arcRefusal);
  return {
    text: items ? storyboardFrame("import", { items }, locale) : storyboardText("Nothing yet. Cards become lore, quests, prepared fights, DM notes and the story arc.", locale),
    refusal: short ? storyboardFrame("arcShort", { min: short[1], count: short[2] }, locale) : storyboardText(summary.arcRefusal, locale),
  };
}
