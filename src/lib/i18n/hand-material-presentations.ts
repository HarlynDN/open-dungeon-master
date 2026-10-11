import type { AppLocale } from "./locales.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { handCostLabel, handTermLabel } from "./hand-presentations.ts";
import { combatTermLabel } from "./combat-ui-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { damageListLabel, resourceLabel } from "./sheet-play-presentations.ts";
import { reactionHitText } from "../battlemap/hand-react.ts";
import type { HandCard } from "../battlemap/hand-core.ts";
import type { PreviewRow } from "../battlemap/hand-play.ts";
import type { PublicLastHit } from "../db/encounter-view.ts";

export const HAND_SEND_FAILURE = "Could not send your action.";
export const HAND_NETWORK_FAILURE = "Could not reach the server.";
export { handChoiceLabel } from "./hand-presentations.ts";
const compiledFrames = new Map<string, RegExp>();
const numeric = new Set(["feet", "reach", "cover", "dc", "level", "required", "count", "left", "max", "amount"]);
const escape = (value: string) => value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");

// Match a whole registered source frame. Repeated placeholders must agree;
// numeric captures cannot absorb prose, and unknown frames retain their text.
function nativeFrame(text: string, prefix: string): { key: MessageKey; args: Record<string, string> } | null {
  const frames = Object.entries(catalogFor("en", prefix)).sort(([, a], [, b]) =>
    (b ?? "").replace(/\{\w+\}/g, "").length - (a ?? "").replace(/\{\w+\}/g, "").length);
  for (const [key, source] of frames) {
    if (!source) continue;
    let pattern = compiledFrames.get(source);
    if (!pattern) {
      const seen = new Set<string>();
      let at = 0, expression = "^";
      for (const slot of source.matchAll(/\{(\w+)\}/g)) {
        expression += escape(source.slice(at, slot.index));
        const name = slot[1];
        const capture = name === "feet" || name === "range" ? "\\d+(?:/\\d+)?" : numeric.has(name) || (name === "current" && prefix === "handMaterial.health.") ? "\\d+" : name === "dice" ? "[+-]?(?:\\d+d\\d+|\\d+)(?:\\s*[+-]\\s*(?:\\d+d\\d+|\\d+))*"
          : name === "die" ? "d\\d+" : "[\\s\\S]+?";
        expression += seen.has(name) ? `\\k<${name}>` : `(?<${name}>${capture})`;
        seen.add(name); at = slot.index! + slot[0].length;
      }
      pattern = new RegExp(expression + escape(source.slice(at)) + "$");
      compiledFrames.set(source, pattern);
    }
    const match = pattern.exec(text);
    if (match) return { key: key as MessageKey, args: match.groups ?? {} };
  }
  return null;
}

function exactLabel(text: string, prefix: string, locale: AppLocale): string {
  const key = Object.entries(catalogFor("en", prefix)).find(([, source]) => source && !/\{\w+\}/.test(source) && source.toLowerCase() === text.toLowerCase())?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : text;
}
function ability(text: string, locale: AppLocale): string {
  const ids: Record<string, string> = { STR: "str", DEX: "dex", CON: "con", INT: "int", WIS: "wis", CHA: "cha" };
  return combatTermLabel("ability", ids[text] ?? text, locale);
}
function mechanic(text: string, locale: AppLocale): string {
  const casting = nativeFrame(text, "handMaterial.term.");
  if (casting?.key === "handMaterial.term.cast") return createTranslator(locale)(casting.key, {
    spell: referenceDisplayName("spell", casting.args.spell, locale),
  });
  const term = handTermLabel(text, locale);
  if (term !== text) return term;
  const spell = referenceDisplayName("spell", text, locale);
  return spell !== text ? spell : referenceDisplayName("equipment", text, locale);
}

export function handRefusalText(raw: string, locale: AppLocale): string {
  if (locale === "en" || !raw) return raw;
  const frame = nativeFrame(raw, "handMaterial.error.");
  if (!frame) return raw;
  const args = { ...frame.args };
  if (args.act) {
    const act = exactLabel(args.act, "handMaterial.act.", locale);
    if (act === args.act) return raw;
    args.act = act;
  }
  if (args.condition) args.condition = conditionLabel(args.condition, locale);
  for (const key of ["what", "feature"] as const) if (args[key]) args[key] = mechanic(args[key], locale);
  if (args.spell) args.spell = referenceDisplayName("spell", args.spell, locale);
  if (args.form) args.form = referenceDisplayName("monster", args.form, locale);
  if (args.armor) {
    const items = args.armor.split(" and ");
    const labels = items.map(value => mechanic(value, locale));
    if (labels.every((value, index) => value !== items[index])) args.armor = labels.join(createTranslator(locale)("handMaterial.join.and"));
  }
  if (args.focus) {
    const foci = args.focus.split(" or ");
    const labels = foci.map(value => exactLabel(value, "handMaterial.focus.", locale));
    // Unknown focus kinds may be authored content. Keep the complete native
    // message instead of guessing its meaning or dropping a requirement.
    if (labels.some((value, index) => value === foci[index])) return raw;
    args.focus = labels.join(createTranslator(locale)("handMaterial.join.or"));
  }
  return createTranslator(locale)(frame.key, args);
}

export function handRuleText(raw: string, locale: AppLocale): string {
  if (locale === "en" || !raw) return raw;
  const bonus = /^(.+[.!?]) ([^:]+): a bonus action(?: for (\d+) ki)?\.$/.exec(raw);
  if (bonus) {
    const rule = handRuleText(bonus[1], locale);
    if (rule !== bonus[1]) return rule + createTranslator(locale)(bonus[3] ? "handMaterial.rules.bonusKi" : "handMaterial.rules.bonus", {
      feature: mechanic(bonus[2], locale), amount: bonus[3] ?? "",
    });
    return raw;
  }
  const frame = nativeFrame(raw, "handMaterial.rules.");
  if (frame) {
    const args = { ...frame.args };
    if (args.type) args.type = damageListLabel(args.type, locale);
    if (args.feature) args.feature = mechanic(args.feature, locale);
    if (args.spell) args.spell = referenceDisplayName("spell", args.spell, locale);
    if (args.ability) args.ability = args.ability.split(" or ").map(value => ability(value, locale)).join(createTranslator(locale)("handMaterial.join.or"));
    if (args.against) args.against = handFactText(args.against, locale);
    return createTranslator(locale)(frame.key, args);
  }
  // Native hand generators join up to two complete owned sentences. Require
  // every sentence to be recognized before translating the combined frame.
  const parts = raw.match(/[^.!?]+[.!?](?: |$)/g);
  if (parts && parts.join("").trimEnd() === raw && parts.length > 1) {
    const translated = parts.map(part => handRuleText(part.trim(), locale));
    if (translated.every((part, index) => part !== parts[index].trim())) return translated.join(" ");
  }
  return raw;
}

export function handFactText(raw: string, locale: AppLocale): string {
  if (locale === "en" || !raw) return raw;
  const t = createTranslator(locale);
  const known = exactLabel(raw, "handMaterial.fact.", locale);
  if (known !== raw) return known;
  let match = /^([+-]?\d+) vs AC (~?\d+) · (\d+%)(?: · (advantage|disadvantage))?$/.exec(raw);
  if (match) return t("handMaterial.fact.hitOdds", { bonus: match[1], ac: match[2], chance: match[3], advantage: match[4] ? ` · ${t(`handMaterial.fact.${match[4]}` as MessageKey)}` : "" });
  match = /^(STR|DEX|CON|INT|WIS|CHA) save(?: vs DC (\d+)| DC (\d+))?$/.exec(raw);
  if (match) return t(match[2] || match[3] ? "handMaterial.fact.saveDc" : "handMaterial.fact.save", { ability: ability(match[1], locale), dc: match[2] ?? match[3] ?? "" });
  const frame = nativeFrame(raw, "handMaterial.fact.");
  if (frame && !["handMaterial.fact.hitOdds", "handMaterial.fact.save", "handMaterial.fact.saveDc"].includes(frame.key)) return t(frame.key, frame.args);
  match = /^(Athletics|Acrobatics|Stealth|Perception|Investigation|Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) ([+-]\d+)$/.exec(raw);
  if (match) return `${combatTermLabel(["Athletics", "Acrobatics", "Stealth", "Perception", "Investigation"].includes(match[1]) ? "skill" : "ability", match[1], locale)} ${match[2]}`;
  // Damage type and status are structured card facts, not free-form prose.
  match = /^([+\d][\dd+\- ]*) (\w+)$/.exec(raw);
  if (match) {
    const type = damageListLabel(match[2], locale);
    if (type !== match[2]) return `${match[1]} ${type}`;
  }
  if (raw.includes(", ")) {
    const parts = raw.split(", ");
    const translated = parts.map(part => handFactText(part, locale));
    return translated.every((part, index) => part !== parts[index]) ? translated.join(t("handMaterial.join.facts")) : raw;
  }
  const damage = damageListLabel(raw, locale);
  return damage !== raw ? damage : conditionLabel(raw, locale);
}

export function handResourceText(raw: string, locale: AppLocale, resourceId?: string): string {
  if (locale === "en" || !raw) return raw;
  const frame = nativeFrame(raw, "handMaterial.resource.");
  if (frame) return createTranslator(locale)(frame.key, frame.args);
  const pool = /^(.*?) (\d+\/\d+)$/.exec(raw);
  if (pool) return `${resourceId ? resourceLabel(resourceId, pool[1], locale) : mechanic(pool[1], locale)} ${pool[2]}`;
  return raw;
}

export function handTargetNote(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  return raw.split(" · ").map(part => {
    const frame = nativeFrame(part, "handMaterial.health.");
    return frame ? createTranslator(locale)(frame.key, frame.args) : handFactText(part, locale);
  }).join(" · ");
}

type CardMaterial = Pick<HandCard, "range" | "dice" | "roll" | "rules" | "resource" | "condition" | "disabled">;
export function handCardMaterial(card: HandCard, locale: AppLocale): CardMaterial {
  let rules = handRuleText(card.rules, locale);
  if (locale !== "en" && card.intent.card === "feature") {
    const key = `sheetDialog.resourceHelp.${card.intent.resourceId}` as MessageKey;
    const source = catalogFor("en", "sheetDialog.resourceHelp.")[key];
    // A native resource card abbreviates reviewed guidance to its first
    // sentence. Chinese shows the already-reviewed complete guidance.
    if (source && card.rules === source.split(". ")[0].replace(/\.?$/, ".")) rules = createTranslator(locale)(key);
  }
  return { range: handFactText(card.range, locale), dice: handFactText(card.dice, locale), roll: handFactText(card.roll, locale), rules,
    resource: handResourceText(card.resource, locale, card.intent.card === "feature" ? card.intent.resourceId : undefined),
    condition: handFactText(card.condition, locale), disabled: card.disabled ? handRefusalText(card.disabled, locale) : null };
}

export function handPreviewRow(row: PreviewRow, locale: AppLocale): PreviewRow {
  if (locale === "en") return row;
  const key = exactLabel(row.key, "handMaterial.row.", locale);
  if (key === row.key) return row;
  let value = handFactText(row.value, locale);
  if (row.key === "Cost") {
    // Slot counters contain their own middle dot; split only the cost lead.
    const at = row.value.indexOf(" · ");
    const costs = { Action: "action", "Bonus action": "bonus", Reaction: "reaction", Rider: "rider", Free: "free" } as const;
    const lead = at < 0 ? row.value : row.value.slice(0, at);
    const cost = costs[lead as keyof typeof costs];
    value = cost ? handCostLabel(cost, locale) + (at < 0 ? "" : ` · ${handResourceText(row.value.slice(at + 3), locale)}`) : row.value;
  }
  return { ...row, key, value };
}

export type HandReactionContext = {
  hits: readonly PublicLastHit[];
  viewerId: string;
  party: ReadonlyArray<{ id: string; name: string }>;
  enemies: ReadonlyArray<{ id: string; name: string }>;
};
export function handReactionPrompt(card: HandCard, locale: AppLocale, context?: HandReactionContext): string {
  const raw = card.prompt ?? "";
  if (locale === "en" || !context) return raw;
  const t = createTranslator(locale);
  for (const hit of context.hits) {
    const who = hit.characterId === context.viewerId ? "you" : context.party.find(entry => entry.id === hit.characterId)?.name;
    if (!who || reactionHitText(hit, who) !== raw) continue;
    const whom = who === "you" && hit.characterId === context.viewerId ? t("handMaterial.react.you") : who;
    if (hit.source === "fall") return t("handMaterial.react.fall", { who: whom, damage: hit.damage });
    const enemy = context.enemies.find(entry => entry.id === hit.attackerId && entry.name === hit.attacker);
    const attacker = enemy ? referenceDisplayName("monster", hit.attacker, locale) : hit.attacker;
    return t("handMaterial.react.hit", { attacker, attack: mechanic(hit.attack, locale), who: whom })
      + (hit.damage ? t("handMaterial.react.damage", { damage: hit.damage, type: hit.type ? damageListLabel(hit.type, locale) : "" }) : "");
  }
  return raw;
}
