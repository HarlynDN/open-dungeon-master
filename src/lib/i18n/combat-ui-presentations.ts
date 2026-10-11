import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { apiErrorText, type UiRequestError } from "./api-errors.ts";
import { referenceDisplayName } from "./references.ts";
import { rollCardLabel } from "../roll-labels.ts";
import type { StoredRoll } from "../db/rolls.ts";
import { rollPresentationLabel, unseenRollActor } from "./roll-presentations.ts";

// Display projection only. Stored English details and all rule inputs remain
// untouched; arbitrary prose/custom rolls are not translated by replacement.
const ROLL_KEYS = { skill_check: "skill_check", saving_throw: "saving_throw", ability_check: "ability_check", attack: "attack", damage: "damage", initiative: "initiative", custom: "custom" } as const;
export function rollKindLabel(kind: string, locale: AppLocale): string {
  return createTranslator(locale)(`combatUi.roll.${ROLL_KEYS[kind as keyof typeof ROLL_KEYS] ?? "custom"}`);
}
export function combatName(name: string, kind: string, locale: AppLocale): string {
  return kind === "enemy" ? referenceDisplayName("monster", name, locale) : name;
}
export function combatTermLabel(kind: "ability" | "skill" | "condition", value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const prefix = kind === "condition" ? "closedHelp.condition." : `sheet.${kind}.`;
  const source = catalogFor("en", prefix);
  const normalized = value.trim().toLowerCase().replace(/[ -]+/g, "_");
  const direct = `${prefix}${normalized}${kind === "condition" ? ".name" : ""}`;
  const key = Object.hasOwn(source, direct) ? direct : Object.keys(source).find(key => source[key as MessageKey]?.toLowerCase() === value.trim().toLowerCase());
  return key ? createTranslator(locale)(key as MessageKey) : value;
}
type RollLabelInput = Pick<StoredRoll, "kind" | "detail" | "attacker" | "presentation">;
type RollDetailInput = Omit<RollLabelInput, "kind"> & { kind: string };
export function rollDetailLabel(roll: RollDetailInput, locale: AppLocale, sheetName?: string): string {
  const detail = roll.detail.replaceAll("_", " ");
  if (locale === "en") return detail;
  const presentation = rollPresentationLabel(roll.presentation, locale);
  if (presentation !== undefined) return presentation;
  if (roll.kind === "custom") return detail;
  if (["skill_check", "saving_throw", "ability_check"].includes(roll.kind)) {
    const kind = roll.kind === "skill_check" ? "skill" : "ability";
    const prefix = sheetName && detail.startsWith(`${sheetName}: `) ? `${sheetName}: ` : "";
    const raw = prefix ? detail.slice(prefix.length) : detail;
    const translated = combatTermLabel(kind, raw, locale);
    return prefix && translated !== raw ? `${sheetName}：${translated}` : translated;
  }
  if (roll.attacker && ["attack", "damage"].includes(roll.kind)) {
    const match = /^(.*?) vs (.*)$/.exec(detail);
    if (match) {
      const what = referenceDisplayName("spell", match[1], locale);
      const tool = referenceDisplayName("equipment", what, locale);
      // Old rows do not identify their target. Attacker kind cannot tell
      // whether it attacked a player, a pet or an enemy with the same name.
      const target = match[2];
      return createTranslator(locale)("combatUi.roll.against", { what: tool, target });
    }
  }
  return detail;
}
export function localizedRollCardLabel(roll: RollLabelInput, sheetName: string | undefined, locale: AppLocale): string {
  if (locale === "en") return rollCardLabel(roll, sheetName);
  const who = unseenRollActor(roll.presentation, locale) ?? (roll.attacker ? combatName(roll.attacker.name, roll.attacker.kind, locale) : sheetName);
  const detail = rollPresentationLabel(roll.presentation, locale) ?? rollDetailLabel(roll, locale, sheetName);
  return `${who ? `${who} · ` : ""}${rollKindLabel(roll.kind, locale)}${detail ? `（${detail}）` : ""}`;
}
export function pendingRollLabel(roll: Pick<RollDetailInput, "kind" | "detail" | "presentation">, name: string | undefined, locale: AppLocale): string {
  const t = createTranslator(locale);
  const detail = rollDetailLabel({ ...roll, attacker: null }, locale, name);
  return t("combatUi.pending.label", { name: name ?? t("combatUi.pending.someone"),
    kind: locale === "en" ? roll.kind.replaceAll("_", " ") : rollKindLabel(roll.kind, locale),
    detail: detail ? t("combatUi.pending.detail", { detail }) : "" });
}
export function diceListLabel(parts: string[], locale: AppLocale): string {
  const t = createTranslator(locale);
  return parts.length > 1 ? `${parts.slice(0, -1).join(t("combatUi.pending.listSeparator"))}${t("combatUi.pending.listAnd")}${parts.at(-1)}` : parts[0] ?? "";
}
export function regeneratingLabel(stopped: boolean, locale: AppLocale): string {
  return createTranslator(locale)(stopped ? "combatUi.encounter.regenStoppedHint" : "combatUi.encounter.regenActiveHint");
}
export function encounterHealthLabel(enemy: { status: string; health: string; knockedOut?: boolean; regenerating?: { stopped: boolean } | null }, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (enemy.status === "fled") return t("combatUi.encounter.fled");
  if (enemy.knockedOut) return t("combatUi.encounter.knockedOut");
  if (enemy.regenerating) return t(enemy.regenerating.stopped ? "combatUi.encounter.regenStopped" : "combatUi.encounter.regenActive");
  if (enemy.status === "dead") return t("combatUi.encounter.slain");
  const keys = { healthy: "healthy", wounded: "wounded", bloodied: "bloodied", "near death": "nearDeath", dead: "dead" } as const;
  const key = keys[enemy.health as keyof typeof keys];
  return key ? t(`combatUi.encounter.health.${key}`) : enemy.health;
}
const COMBAT_ERROR_KEYS = {
  "Roll not found.": "combatUi.error.rollMissing",
  "That roll was already resolved.": "combatUi.error.rollResolved",
  "This is not your roll.": "combatUi.error.rollNotYours",
  "Invalid roll submission.": "combatUi.error.rollInvalid",
  "Invalid dice values.": "combatUi.error.diceInvalid",
  "Too many die values for this roll.": "combatUi.error.diceTooMany",
  "Not enough die values for this roll.": "combatUi.error.diceTooFew",
  "This roll is thrown by the server: release it to roll, since typed dice count only for a player rolling real dice at a table that allows them.": "combatUi.error.serverRoll",
  "Only the character's own player spends their Inspiration.": "combatUi.error.inspirationOwn",
  "Only a character's own roll can take their Inspiration.": "combatUi.error.inspirationRollOwn",
  "Inspiration gives advantage on an attack roll, a saving throw or an ability check; this roll is none of those.": "combatUi.error.inspirationKind",
  "This roll already has advantage, so Inspiration would add nothing. Keep it for another roll.": "combatUi.error.inspirationAdvantage",
  "Inspiration gives advantage on a d20 roll, and this roll has no d20 to double.": "combatUi.error.inspirationD20",
  "That is not an edit the order takes.": "combatUi.error.orderInvalid",
  "There is no initiative order to step through.": "combatUi.error.orderMissing",
  "There is nobody else in the order to hand the turn to.": "combatUi.error.orderAlone",
  "A combatant needs a name.": "combatUi.error.orderName",
  "That combatant is already in the order.": "combatUi.error.orderDuplicate",
  "That combatant is not in the initiative order.": "combatUi.error.orderEntryMissing",
  "The last combatant cannot be taken out of the order.": "combatUi.error.orderLast",
  "No active encounter.": "combatUi.error.noEncounter",
  "Could not submit the roll.": "combatUi.error.rollSubmit",
  "Could not spend your Inspiration.": "combatUi.error.inspiration",
  "Could not reach the server.": "combatUi.error.network",
  "Could not reach the table.": "combatUi.error.orderNetwork",
  "The order would not take that.": "combatUi.error.order",
} satisfies Record<string, MessageKey>;
export function combatErrorText(error: UiRequestError | string | null, locale: AppLocale, fallback: MessageKey = "combatUi.error.order"): string {
  if (!error) return "";
  const ui = typeof error === "string" ? { data: { error }, fallback } : error;
  const raw = ui.data.error;
  // English API diagnostics stay byte-for-byte intact for existing clients.
  if (locale === "en" && raw) return raw;
  const t = createTranslator(locale);
  const known = raw && COMBAT_ERROR_KEYS[raw as keyof typeof COMBAT_ERROR_KEYS];
  if (known) return t(known);
  let match = raw && /^Die (\d+) must be a whole number from 1 to (\d+)\.$/.exec(raw);
  if (match) return t("combatUi.error.dieRange", { index: match[1], sides: match[2] });
  match = raw && /^(.*?) holds no Inspiration to spend\. The DM awards it\.$/.exec(raw);
  if (match) return t("combatUi.error.inspirationEmpty", { name: match[1] });
  match = raw && /^(.*?) is already at the (top|bottom)\.$/.exec(raw);
  if (match) return t("combatUi.error.orderEdge", { name: match[1], edge: t(match[2] === "top" ? "combatUi.error.orderTop" : "combatUi.error.orderBottom") });
  match = raw && /^The turn only rests on player characters; (.*?) is yours to run whenever you like\.$/.exec(raw);
  if (match) return t("combatUi.error.orderNpc", { name: match[1] });
  match = raw && /^It is already (.*?)'s turn\.$/.exec(raw);
  if (match) return t("combatUi.error.orderCurrent", { name: match[1] });
  return apiErrorText(locale, ui.data, ui.fallback);
}
