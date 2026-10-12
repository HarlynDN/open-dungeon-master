import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { HandCard } from "../battlemap/hand-core.ts";
import { monsterSentence, swingsLine } from "../battlemap/monster-hand.ts";
import { MONSTER_HAND_TEXT } from "./monster-hand-metadata.ts";
import { referenceDisplayName } from "./references.ts";
import { combatName, combatTermLabel } from "./combat-ui-presentations.ts";
export const MONSTER_HAND_NOTICES = { refused: "The engine would not take that.", order: "The order would not take that.", network: "Could not reach the table.", many: "Pick everyone caught in it.", target: "Pick a target." } as const;
type FrameKey = Extract<MessageKey, `monsterHandUi.frame.${string}`> extends `monsterHandUi.frame.${infer Key}` ? Key : never;
export function monsterHandFrame(key: FrameKey, values: Record<string, string | number>, locale: AppLocale): string { return createTranslator(locale)(`monsterHandUi.frame.${key}` as MessageKey, values); }
export function monsterHandText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const key = Object.hasOwn(MONSTER_HAND_TEXT, raw) ? MONSTER_HAND_TEXT[raw as keyof typeof MONSTER_HAND_TEXT] : undefined;
  return key ? createTranslator(locale)(key) : raw;
}
// Mechanism labels only. Unknown custom titles stay literal, and the intent
// keeps its original attack/ability name independently from these captions.
export function monsterActionName(raw: string, locale: AppLocale): string { return referenceDisplayName("equipment", monsterHandText(raw, locale), locale); }
export function monsterCardName(card: HandCard, locale: AppLocale): string {
  const intent = card.intent;
  if (intent.card !== "monster" || locale === "en") return card.name;
  if (intent.action === "flee") return card.name === "Flee" ? monsterHandText(card.name, locale) : card.name;
  const original = intent.action === "attack" ? intent.attackName : intent.ability?.name;
  return original === card.name ? monsterActionName(card.name, locale) : card.name;
}
export function monsterCardRules(card: HandCard, locale: AppLocale): string {
  if (locale === "en" || card.intent.card !== "monster" || card.ruleSegments?.join(" ") !== card.rules) return card.rules;
  return card.ruleSegments.map(note => {
    if (card.monsterSwings && note === swingsLine([...card.monsterSwings])) {
      const counts = new Map<string, number>();
      for (const name of card.monsterSwings) counts.set(name, (counts.get(name) ?? 0) + 1);
      return monsterHandFrame("routine", { swings: [...counts].map(([name, count]) => monsterHandFrame("swing", { count, name: monsterActionName(name, locale) }, locale)).join(monsterHandFrame("list", {}, locale)) }, locale);
    }
    const round = /^Lasts (\d+) (round|rounds)\.$/.exec(note);
    return round ? monsterHandFrame(round[2] === "round" ? "roundOne" : "roundMany", { count: round[1] }, locale) : monsterHandText(note, locale);
  }).join(" ");
}
export function monsterHandSentence(name: string, card: HandCard, targets: readonly string[], locale: AppLocale): string {
  if (locale === "en") return monsterSentence(name, card, [...targets]);
  const intent = card.intent;
  if (intent.card !== "monster") return "";
  const values = { name: combatName(name, "enemy", locale), action: monsterCardName(card, locale), targets: targets.join(monsterHandFrame("list", {}, locale)) };
  return monsterHandFrame(intent.action === "attack" ? targets.length ? "attack" : "attackNone" : intent.action === "ability" ? targets.length ? "ability" : "abilityNone" : "flee", values, locale);
}
export function monsterHandRefusal(raw: string, locale: AppLocale, enemyNames: readonly string[] = []): string {
  if (locale === "en" || !raw) return raw;
  const name = (source: string) => enemyNames.includes(source) ? combatName(source, "enemy", locale) : source;
  const specs: Array<[RegExp, FrameKey, string[]]> = [
    [/^([\s\S]+) is ([a-z ]+) and cannot act\.$/, "status", ["name", "condition"]],
    [/^([\s\S]+) is ([a-z ]+) and cannot act until the condition ends\.$/, "incapacitated", ["name", "condition"]],
    [/^([\s\S]+) is ([a-z ]+) and loses its action this turn\.$/, "held", ["name", "condition"]],
    [/^([\s\S]+) is surprised and does nothing in the first round\. It acts from round 2\.$/, "surprised", ["name"]],
    [/^Initiative is still being rolled, so ([\s\S]+) cannot act yet\. Roll initiative for every character first\.$/, "initiative", ["name"]],
    [/^([\s\S]+) has already taken its action this round \(round (\d+)\)\. It acts again next round; legendary actions and reactions are separate\.$/, "alreadyActed", ["name", "round"]],
    [/^([\s\S]+)'s ([\s\S]+) has not recharged: it comes back on a (\d+(?: or higher)?) on the d6 rolled at the start of its turn\. Pick another action\.$/, "recharge", ["name", "action", "threshold"]],
    [/^([\s\S]+) has used ([\s\S]+) already and cannot use it again today\. Pick another action\.$/, "usedOne", ["name", "action"]],
    [/^([\s\S]+) has used ([\s\S]+) all (\d+) times and cannot use it again today\. Pick another action\.$/, "usedMany", ["name", "action", "count"]],
  ];
  for (const [pattern, key, fields] of specs) {
    const match = pattern.exec(raw);
    if (!match) continue;
    const values: Record<string, string> = Object.fromEntries(fields.map((field, i) => [field, match[i + 1]]));
    values.name = name(values.name);
    if (values.condition) values.condition = monsterHandText(combatTermLabel("condition", values.condition, locale), locale);
    if (values.action) values.action = monsterActionName(values.action, locale);
    if (values.threshold?.endsWith(" or higher")) values.threshold = monsterHandFrame("higher", { number: values.threshold.slice(0, -" or higher".length) }, locale);
    return monsterHandFrame(key, values, locale);
  }
  return monsterHandText(raw, locale);
}
