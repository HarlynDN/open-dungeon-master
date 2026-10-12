import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { metricText } from "./reference-metrics-presentations.ts";
import { referenceBadgeText } from "./reference-ui-presentations.ts";
import { dmCatalogText } from "./dm-field-presentations.ts";
import { dmToolsText } from "./dm-tools-presentations.ts";
import { encounterPrepError } from "./encounter-prep-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { abilityLabel } from "./character-presentations.ts";
import { DAMAGE_TYPES, CONDITIONS } from "../bestiary/kit.ts";
import type { MonsterDraft } from "../bestiary/monster-draft.ts";

type MonsterUiFrameKey = Extract<MessageKey, `monsterUi.frame.${string}`> extends `monsterUi.frame.${infer Key}` ? Key : never;
let captions: Map<string, MessageKey> | undefined;
export function monsterUiFrame(key: MonsterUiFrameKey, values: Record<string, string | number>, locale: AppLocale): string {
  return createTranslator(locale)(`monsterUi.frame.${key}` as MessageKey, values);
}
export function monsterClosedTerm(kind: "damage" | "condition" | "size" | "type", value: string, locale: AppLocale): string {
  if (locale === "en" || !value) return value;
  if (kind === "condition") return conditionLabel(value, locale);
  if (kind === "damage" && value === "untyped") return monsterUiText(value, locale);
  if (kind === "size") return metricText(value, locale, "size");
  if (kind === "type") return referenceBadgeText("monsters", { source: "open5e" }, { key: "type", text: value.toLowerCase() }, locale);
  return DAMAGE_TYPES.some(type => type === value.toLowerCase()) ? dmCatalogText(value[0].toUpperCase() + value.slice(1).toLowerCase(), locale) : value;
}
export function monsterTypedValue(kind: "damage" | "condition", value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const source = kind === "damage" ? [...DAMAGE_TYPES, "untyped"] : CONDITIONS;
  const candidates = source.filter(term => monsterClosedTerm(kind, term, locale) === value);
  return candidates.length === 1 ? candidates[0] : value;
}
export function monsterUiText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  captions ??= new Map(Object.entries(catalogFor("en", "monsterUi.copy.")).map(([key, text]) => [text, key as MessageKey]));
  const key = captions.get(raw);
  if (key) return createTranslator(locale)(key);
  const save = /^(STR|DEX|CON|INT|WIS|CHA) save$/.exec(raw);
  if (save) return monsterUiFrame("save", { ability: abilityLabel(save[1].toLowerCase(), locale) }, locale);
  const size = /^(Tiny|Small|Medium|Large|Huge|Gargantuan) or smaller$/.exec(raw);
  if (size) return monsterUiFrame("sizeLimit", { size: monsterClosedTerm("size", size[1], locale) }, locale);
  const range = /^(\d+) to (\d+)$/.exec(raw);
  if (range) return monsterUiFrame("rangeExpected", { min: range[1], max: range[2] }, locale);
  const chassis = /^d(\d+) hit die: at least (\d+) hit points, ((?:STR|DEX|CON|INT|WIS|CHA)(?: and (?:STR|DEX|CON|INT|WIS|CHA))*) saves at \+(\d+) or better\.$/.exec(raw);
  if (chassis) return monsterUiFrame("chassis", { die: chassis[1], hp: chassis[2], saves: chassis[3].split(" and ").map(ability => abilityLabel(ability.toLowerCase(), locale)).join(monsterUiFrame("and", {}, locale)), bonus: chassis[4] }, locale);
  return metricText(raw, locale);
}
export function monsterSummary(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const m = /^CR ([\d./]+), AC (\d+), (\d+) hp(?:, the numbers say CR ([\d./]+))?$/.exec(raw);
  return m ? monsterUiFrame("summary", { cr: m[1], ac: m[2], hp: m[3], suffix: m[4] ? monsterUiFrame("summaryDifference", { cr: m[4] }, locale) : "" }, locale) : raw;
}
export function monsterAttackExtras(attack: MonsterDraft["stats"]["attacks"][number], locale: AppLocale): string {
  const bits = [attack.range ? monsterUiFrame("range", attack.range, locale)
    : attack.reach && attack.reach > 5 ? monsterUiFrame("reach", { feet: attack.reach }, locale) : "",
    attack.riders?.length ? `+${attack.riders.map(rider => monsterClosedTerm("damage", rider.type, locale)).join(monsterUiFrame("rangeJoin", {}, locale))}` : "",
    attack.onHit?.condition ? monsterClosedTerm("condition", attack.onHit.condition, locale) : attack.onHit?.damage ? monsterUiText("on hit", locale) : ""].filter(Boolean);
  return bits.length ? bits.join(" · ") : monsterUiText("Details", locale);
}
export function monsterTemplateNote(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const enough = /^Half-(black|blue|brass|bronze|copper|gold|green|red|silver|white) dragon: CR ([\d.]+) meets the template's challenge (\d+), so the rating stands\.$/.exec(raw);
  if (enough) return monsterUiFrame("halfEnough", { color: monsterUiText(enough[1], locale), cr: enough[2], challenge: enough[3] }, locale);
  const below = /^Half-(black|blue|brass|bronze|copper|gold|green|red|silver|white) dragon: below challenge (\d+) the SRD asks for the rating to be worked out again; the rating panel shows what the numbers now support\.$/.exec(raw);
  if (below) return monsterUiFrame("halfBelow", { color: monsterUiText(below[1], locale), challenge: below[2] }, locale);
  const refusal = /^Only a beast, humanoid, giant or monstrosity can become a half-dragon; this is a ([a-z]+)\.$/.exec(raw);
  return refusal ? monsterUiFrame("halfRefused", { type: monsterClosedTerm("type", refusal[1], locale) }, locale) : raw;
}
export const MONSTER_NETWORK_FAILURE = "Could not reach the server.";
export function monsterUiError(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const known = Object.entries(catalogFor("en", "monsterUi.error.")).find(([, value]) => value === raw);
  if (known) return createTranslator(locale)(known[0] as MessageKey);
  const cap = /^The block holds (\d+) (attacks|abilities)\.$/.exec(raw);
  if (cap) return monsterUiFrame(cap[2] === "attacks" ? "attackCap" : "abilityCap", { count: cap[1] }, locale);
  const traitCap = /^The block is full at (\d+) lines\.$/.exec(raw);
  if (traitCap) return monsterUiFrame("traitCap", { count: traitCap[1] }, locale);
  const fixed = { "That could not be built.": "buildError", "A monster needs a name.": "nameError", "An attack needs a name.": "attackNameError" } as const;
  if (Object.hasOwn(fixed, raw)) return monsterUiFrame(fixed[raw as keyof typeof fixed], {}, locale);
  const dice = /^"([\s\S]+)" is not a dice expression the table can roll\.$/.exec(raw);
  if (dice) return monsterUiFrame("diceError", { dice: dice[1] }, locale);
  const damage = /^([\s\S]+) has no damage\.$/.exec(raw);
  if (damage) return monsterUiFrame("damageError", { name: damage[1] }, locale);
  const missing = /^([\s\S]+) is not in the content pack on this server, so there is no block to copy\.$/.exec(raw);
  return missing ? monsterUiFrame("missingCopy", { name: missing[1] }, locale) : encounterPrepError(dmToolsText(raw, locale), locale);
}

export const MONSTER_PANEL_NOTICES = { built: "That could not be built.", saved: "That could not be saved.", deleted: "That could not be deleted." } as const;
export function monsterMissingCopyNotice(name: string): string {
  return `${name} is not in the content pack on this server, so there is no block to copy.`;
}
