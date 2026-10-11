import type { AppLocale } from "./locales.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { referenceDisplayName } from "./references.ts";
import { CONDITION_MATERIAL_INDEX } from "./condition-material-index.ts";
import { parseRollPresentation, type RollPresentation } from "../roll-presentation.ts";

// Translate catalog terms and recognized engine frames; names and arbitrary
// prose never pass through substring replacement or comma-based splitting.
export function rollActionLabel(what: string, locale: AppLocale): string {
  if (locale === "en") return what;
  const t = createTranslator(locale);
  const suffix = /^(.*) \((opportunity attack|half on a miss|second burn|CRIT)\)$/.exec(what);
  if (suffix) {
    const keys = { "opportunity attack": "opportunity", "half on a miss": "halfMiss", "second burn": "secondBurn", CRIT: "crit" };
    return t(`combatRoll.suffix.${keys[suffix[2] as keyof typeof keys]}` as MessageKey, { name: rollActionLabel(suffix[1], locale) });
  }
  if (what === "the effect") return t("combatCheck.effect");
  if (what === "area effect") return t("combatRoll.areaEffect");
  const features = { ...catalogFor("en", "combatCheck.feature."), ...catalogFor("en", "combatSpecial.name.") };
  const featureKey = Object.keys(features).find(key => features[key as MessageKey]?.toLowerCase() === what.toLowerCase());
  if (featureKey) return t(featureKey as MessageKey);
  if (what.toLowerCase() === "quivering palm") return t("combatDetail.effect.quivering_palm.name");
  let frame = /^(\d+) ft fall \((\d+d\d+) bludgeoning\)$/.exec(what);
  if (frame) return t("combatRoll.fall", { feet: frame[1], dice: frame[2] });
  frame = /^(\d+) ft fall into (.*) \((\d+d\d+) bludgeoning\)$/.exec(what);
  if (frame) return t("combatRoll.trapFall", { feet: frame[1], name: frame[2], dice: frame[3] });
  frame = /^(.*) attacks \(vs AC (\d+)\)$/.exec(what);
  if (frame) return t("combatRoll.trapAttack", { name: frame[1], ac: frame[2] });
  frame = /^(.*) \(([^()]*)\)$/.exec(what);
  if (frame) {
    const parameters = { ...catalogFor("en", "combatDetail.damage."), ...catalogFor("en", "combatRoll.color.") };
    const value = frame[2];
    const key = Object.keys(parameters).find(key => parameters[key as MessageKey] === value);
    if (key) return t("combatDetail.parameter", { name: rollActionLabel(frame[1], locale), value: t(key as MessageKey) });
  }
  const source = catalogFor("en", "combatRoll.action.");
  const key = Object.keys(source).find(key => source[key as MessageKey]?.toLowerCase() === what.toLowerCase());
  return key ? t(key as MessageKey) : referenceDisplayName("equipment", referenceDisplayName("spell", what, locale), locale);
}

function noteName(name: string, locale: AppLocale): string {
  const row = CONDITION_MATERIAL_INDEX.find(row => row.match.some(alias => alias === name.toLowerCase()));
  if (row) return createTranslator(locale)(`combatDetail.effect.${row.id}.name` as MessageKey);
  if (name.toLowerCase() === "bardic inspiration") return createTranslator(locale)("combatDetail.condition.bardicInspiration");
  return rollActionLabel(name, locale);
}
export function rollNoteLabel(note: string, locale: AppLocale): string {
  if (locale === "en") return note;
  const t = createTranslator(locale);
  const exact: Record<string, MessageKey> = {
    "Lucky: a natural 1 on the d20 is rerolled once": "combatRoll.note.luckyReroll",
    "Lucky: a luck point buys an extra d20, the best kept": "combatRoll.note.luckyPoint",
    "spends their Inspiration: advantage": "combatRoll.note.inspiration",
  };
  if (exact[note]) return t(exact[note]);
  let match = /^exhaustion (\d+): disadvantage on saving throws$/.exec(note);
  if (match) return t("combatRoll.note.exhaustion", { level: match[1] });
  match = /^(.*): ([+-]\d+(?:d\d+)?) to (?:the save|saves)$/.exec(note);
  if (match) return t("combatRoll.note.saveBonus", { name: noteName(match[1], locale), bonus: match[2] });
  match = /^(.*): (advantage|disadvantage)$/.exec(note);
  if (match) return t(match[2] === "advantage" ? "combatRoll.note.advantage" : "combatRoll.note.disadvantage", { name: noteName(match[1], locale) });
  match = /^spends their (.*): ([+-]\d+d\d+)$/.exec(note);
  if (match) return t("combatRoll.note.spendDie", { name: noteName(match[1], locale), die: match[2] });
  match = /^(.*)'s aura \(within (\d+) ft\): ([+-]\d+) on saving throws$/.exec(note);
  if (match) return t("combatRoll.note.aura", { name: match[1], feet: match[2], bonus: match[3] });
  return note;
}

export function rollCheckTerm(kind: "skill" | "ability", value: string, locale: AppLocale): string {
  if (value === "strength_or_dexterity") return createTranslator(locale)("combatCheck.eitherAbility");
  if (value === "athletics_or_acrobatics") return createTranslator(locale)("combatCheck.either");
  const prefix = `sheet.${kind}.`, source = catalogFor("en", prefix);
  const direct = `${prefix}${value.trim().toLowerCase().replace(/[ -]+/g, "_")}`;
  const key = Object.hasOwn(source, direct) ? direct : Object.keys(source).find(key => source[key as MessageKey]?.toLowerCase() === value.trim().toLowerCase());
  return key ? createTranslator(locale)(key as MessageKey) : value;
}

export function rollPresentationLabel(raw: unknown, locale: AppLocale): string | undefined {
  const p = parseRollPresentation(raw);
  if (!p) return;
  const t = createTranslator(locale);
  let detail = "";
  switch (p.kind) {
    case "against": detail = t("combatUi.roll.against", { what: rollActionLabel(p.what, locale),
      target: p.target.kind === "enemy" ? referenceDisplayName("monster", p.target.name, locale) : p.target.name }); break;
    case "area": {
      const damage = p.damageType ? catalogFor("en", "combatDetail.damage.") : {};
      const damageKey = Object.keys(damage).find(key => damage[key as MessageKey] === p.damageType);
      const name = rollActionLabel(p.what, locale);
      const what = p.damageType ? t("combatDetail.parameter", { name, value: damageKey ? t(damageKey as MessageKey) : p.damageType }) : name;
      const targets = p.targets.map(target => target.kind === "enemy" ? referenceDisplayName("monster", target.name, locale) : target.name);
      detail = targets.length ? t("combatRoll.area", { what, targets: targets.join(t("combatRoll.list")) }) : what;
      break;
    }
    case "death-save": {
      detail = t("combatRoll.death");
      if (p.notes.length) detail = t("combatRoll.notes", { detail, notes: p.notes.map(note => rollNoteLabel(note, locale)).join(t("combatRoll.noteSeparator")) });
      break;
    }
    case "check": {
      const term = rollCheckTerm(p.term.kind, p.term.key, locale), c = p.context;
      if (!c) { detail = term; break; }
      const values: Record<string, string | number> = { term };
      if ("target" in c && c.target) values.target = c.target.kind === "enemy" ? referenceDisplayName("monster", c.target.name, locale) : c.target.name;
      if ("name" in c) {
        const conditions = catalogFor("en", "closedHelp.condition.");
        const conditionKey = Object.keys(conditions).find(key => key.endsWith(".name") && conditions[key as MessageKey]?.toLowerCase() === c.name.toLowerCase());
        values.name = c.literalName ? c.name : conditionKey ? t(conditionKey as MessageKey) : noteName(c.name, locale);
      }
      if ("from" in c) values.from = c.from.kind === "enemy" ? referenceDisplayName("monster", c.from.name, locale).replace(/(\d)$/, "$1 ") : c.from.name;
      if ("text" in c) values.text = c.text;
      if ("hour" in c) values.hour = c.hour;
      if ("round" in c) values.round = c.round;
      const frame = c.kind === "hourly-endurance" ? `${c.kind}.${c.activity}`
        : c.kind === "escape-grapple" && c.target && typeof c.difficulty === "number" ? "escape-grapple-target" : c.kind;
      if ("difficulty" in c && typeof c.difficulty === "number") values.difficulty = c.difficulty;
      detail = t(`combatCheck.${frame}` as MessageKey, values);
      break;
    }
    case "special": {
      const c = p.context;
      const values: Record<string, string | number> = {};
      if ("name" in c) values.name = c.literalName ? c.name : noteName(c.name, locale);
      if ("target" in c) values.target = c.target.kind === "enemy" ? referenceDisplayName("monster", c.target.name, locale) : c.target.name;
      if ("hitDice" in c) values.hitDice = c.hitDice;
      if ("threshold" in c) values.threshold = c.threshold;
      if ("level" in c) values.level = c.level;
      if ("count" in c) values.count = c.count;
      if ("multiplier" in c) { values.multiplier = c.multiplier; values.dice = c.dice; }
      if (c.kind === "affliction-onset") values.unit = t(`combatSpecial.unit.${c.unit}`);
      detail = t(`combatSpecial.${c.kind === "madness" ? `madness.${c.term}` : c.kind}` as MessageKey, values);
      if (c.kind === "short-rest") {
        if (c.songDie) detail = t("combatSpecial.song", { detail, dice: c.songDie });
        if (c.chefDie) detail = t("combatSpecial.chef", { detail, dice: c.chefDie });
      } else if ("dice" in c && c.dice && c.kind !== "treasure") detail = t("combatSpecial.with-dice", { detail, dice: c.dice });
      break;
    }
    case "stable-recovery": detail = t("combatRoll.recovery", { name: p.name }); break;
  }
  return p.physical ? t("combatRoll.physical", { detail }) : detail;
}

export function rollPresentationActor(presentation: RollPresentation | undefined, locale: AppLocale): string | undefined {
  const p = parseRollPresentation(presentation);
  if ((p?.kind === "check" || p?.kind === "special") && p.owner) return p.owner.kind === "enemy" ? referenceDisplayName("monster", p.owner.name, locale) : p.owner.name;
  return p?.kind === "area" && p.actorUnseen ? createTranslator(locale)("combatRoll.someoneUnseen") : undefined;
}

export function pendingRollReason(roll: { kind: string; reason: string; presentation?: RollPresentation }, locale: AppLocale): string {
  if (locale === "en") return roll.reason;
  const p = parseRollPresentation(roll.presentation);
  // Only the engine's two exact attack-stage reasons are constructed here.
  // A freeform reason stays literal even when its roll has caption metadata.
  if (p?.kind !== "against" || !["attack", "damage"].includes(roll.kind)
    || roll.reason !== `${p.what} ${roll.kind} against ${p.target.name}`) return roll.reason;
  return createTranslator(locale)(roll.kind === "attack" ? "combatRoll.pending.attack" : "combatRoll.pending.damage", {
    what: rollActionLabel(p.what, locale), target: p.target.kind === "enemy" ? referenceDisplayName("monster", p.target.name, locale) : p.target.name,
  });
}
