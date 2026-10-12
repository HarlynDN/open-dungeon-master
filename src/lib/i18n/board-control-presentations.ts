import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { referenceDisplayName } from "./references.ts";
import { combatName } from "./combat-ui-presentations.ts";
import { abilityLabel, skillLabel } from "./character-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { damageListLabel } from "./sheet-play-presentations.ts";
import { featTermLabel } from "./feat-presentations.ts";
import { nativeFeatureName } from "./feature-material-presentations.ts";
import { handRefusalText } from "./hand-material-presentations.ts";
import { boardOperationErrorText } from "./board-operation-presentations.ts";
import type { AppLocale } from "./locales.ts";

export type BoardDisplayName = { name: string; kind: string };
export function boardDisplayName(name: string, locale: AppLocale, names: readonly BoardDisplayName[]): string {
  const matches = names.filter(row => row.name === name);
  return matches.length && matches.every(row => row.kind === "enemy") ? combatName(name, "enemy", locale) : name;
}
export function boardRulerText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  if (source === "out of reach") return t("boardUi.ruler.unreachable");
  const match = /^([0-9]+(?:\.[0-9]+)?) ft(?: (dragging|jump))?$/.exec(source);
  return match ? t(match[2] === "dragging" ? "boardUi.ruler.drag" : match[2] === "jump" ? "boardUi.ruler.jump" : "boardUi.ruler.feet", { feet: match[1] }) : source;
}
// Complete known frames only. The original English note remains in state and
// model/tool results; unknown pack prose and diagnostics are kept literally.
export function boardMoveNoteText(source: string, locale: AppLocale, names: readonly BoardDisplayName[] = []): string {
  if (locale === "en") return source;
  const t = createTranslator(locale), spell = (name: string) => referenceDisplayName("spell", name, locale);
  const who = (name: string) => boardDisplayName(name, locale, names);
  const conditions = (value: string) => value.split(" and ").map(name => conditionLabel(name, locale)).join(t("boardUi.and"));
  let m = /^Jumped ([0-9]+(?:\.[0-9]+)?) feet and landed ([\s\S]+?)\.(?: A high jump reaches ([0-9]+(?:\.[0-9]+)?) feet\.)?$/.exec(source);
  if (m) {
    let landed = m[2] === "on their feet" ? t("boardUi.note.upright") : m[2];
    const check = /^(prone|on their feet) \(Acrobatics (-?[0-9]+) against DC 10( in difficult terrain)?\)$/.exec(m[2]);
    if (check) landed = t("boardUi.note.landCheck", { state: t(check[1] === "prone" ? "boardUi.note.prone" : "boardUi.note.upright"), skill: skillLabel("acrobatics", locale), roll: check[2], terrain: check[3] ? t("boardUi.note.terrain") : "" });
    return t("boardUi.note.jump", { feet: m[1], landed, high: m[3] ? t("boardUi.note.high", { feet: m[3] }) : "" });
  }
  m = /^(.*) takes an opportunity attack as (.*) pulls away and misses \((-?[0-9]+) vs AC ([0-9]+)\)\.$/.exec(source);
  if (m) return t("boardUi.note.opMiss", { enemy: combatName(m[1], "enemy", locale), name: m[2], roll: m[3], ac: m[4] });
  m = /^(.*) takes an opportunity attack as (.*) pulls away: (a critical hit for |hit for )([0-9]+) damage(?: \(([^\n]*)\))?\.(?: (.*) is (.*)\.)?$/.exec(source);
  if (m) return t("boardUi.note.opHit", { enemy: combatName(m[1], "enemy", locale), name: m[2], hit: t(m[3] === "hit for " ? "boardUi.note.hit" : "boardUi.note.crit"), amount: m[4], types: m[5] ? t("boardUi.note.types", { types: damageListLabel(m[5], locale) }) : "", rider: m[6] ? t("boardUi.note.rider", { name: m[6], conditions: conditions(m[7]) }) : "" });
  m = /^(.*) gets no opportunity attack on (.*): (.*) \(attacked in melee this turn\)\.$/.exec(source);
  if (m) return t("boardUi.note.evade", { enemy: combatName(m[1], "enemy", locale), name: m[2], feature: featTermLabel("feat", nativeFeatureName(m[3], locale), locale) });
  m = /^(.*) (fails|makes) (its|the) (STR|DEX|CON|INT|WIS|CHA) save against (.*) \(DC ([0-9]+)\)\.$/.exec(source);
  if (m) return t("boardUi.note.save", { name: m[3] === "its" ? combatName(m[1], "enemy", locale) : m[1], result: t(m[2] === "fails" ? "boardUi.note.saveFail" : "boardUi.note.savePass"), ability: abilityLabel(m[4].toLowerCase(), locale), spell: spell(m[5]), dc: m[6] });
  m = /^Evasion: (.*) takes (no damage|half damage)\.$/.exec(source);
  if (m) return t(m[2] === "no damage" ? "boardUi.note.evasionNo" : "boardUi.note.evasionHalf", { name: m[1] });
  m = /^(.*) takes ([0-9]+)(?: ([a-z]+))? damage from (.*)\.$/.exec(source);
  if (m) {
    const effect = /^(entering|moving through) (.*)$/.exec(m[4]);
    const from = effect ? t(effect[1] === "entering" ? "boardUi.note.entering" : "boardUi.note.through", { spell: spell(effect[2]) }) : spell(m[4]);
    return t("boardUi.note.damage", { name: who(m[1]), amount: m[2], type: m[3] ? damageListLabel(m[3], locale) : "", source: from });
  }
  m = /^(.*) is pushed to \((-?[0-9]+),(-?[0-9]+)\)\.$/.exec(source);
  if (m) return t("boardUi.note.push", { name: who(m[1]), x: m[2], y: m[3] });
  m = /^It is held fast at \((-?[0-9]+),(-?[0-9]+)\)\.$/.exec(source);
  if (m) return t("boardUi.note.held", { x: m[1], y: m[2] });
  m = /^(.*) spends (its|their) action this turn retching\.$/.exec(source);
  if (m) return t("boardUi.note.retc", { name: m[2] === "its" ? combatName(m[1], "enemy", locale) : m[1] });
  m = /^(.*) loses (its|their) concentration on (.*)\.$/.exec(source);
  if (m) return t("boardUi.note.concentration", { name: m[2] === "its" ? combatName(m[1], "enemy", locale) : m[1], spell: spell(m[3]) });
  m = /^(.*) is knocked prone by (.*)\.$/.exec(source);
  if (m) return t("boardUi.note.knocked", { name: who(m[1]), spell: spell(m[2]) });
  m = /^(.*) is ([a-z_]+) by (.*)\.$/.exec(source);
  return m ? t("boardUi.note.condition", { name: who(m[1]), condition: conditionLabel(m[2], locale), spell: spell(m[3]) }) : source;
}

// Raw diagnostics remain available; only owned complete messages are translated.
export function boardPanelErrorText(raw: string, locale: AppLocale, names: readonly BoardDisplayName[] = []): string {
  if (locale === "en" || !raw) return raw;
  const known = Object.entries(catalogFor("en", "boardUi.error.")).find(([, source]) => source === raw);
  return known ? createTranslator(locale)(known[0] as MessageKey)
    : boardOperationErrorText(raw, locale, name => boardDisplayName(name, locale, names)) ?? handRefusalText(raw, locale);
}

export function boardSquareLabel(raw: string, locale: AppLocale): string {
  const key = Object.entries(catalogFor("en", "boardUi.area.")).find(([key, source]) => (key === "boardUi.area.centre" || key === "boardUi.area.toward") && source === raw)?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : raw;
}
