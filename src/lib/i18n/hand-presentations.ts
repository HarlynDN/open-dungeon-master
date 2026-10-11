import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { referenceDisplayName } from "./references.ts";
import { sessionSourceText } from "./session-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { combatTermLabel } from "./combat-ui-presentations.ts";
import { sheetChoiceOption } from "./sheet-dialog-presentations.ts";
import { chosenValue, composeSentence, costLabel, type HandAim, type HandChoices } from "../battlemap/hand-play.ts";
import { describePick, hasPick, type HandArea, type AreaPick } from "../battlemap/hand-area.ts";
import type { HandAttackOptionId, HandCard, HandCost } from "../battlemap/hand-core.ts";

export function handTermLabel(name: string, locale: AppLocale): string {
  if (locale === "en") return name;
  const t = createTranslator(locale);
  const matches = ["handUi.term.", "handMaterial.term.", "sheetPlay.resourceName.", "combatCheck.feature.", "combatSpecial.name.", "sheetDialog.choice.feature.", "combatDetail.effect."].flatMap(prefix =>
    Object.entries(catalogFor("en", prefix)).filter(([key, source]) => (prefix !== "combatDetail.effect." || key.endsWith(".name")) && source.toLowerCase() === name.toLowerCase())
      .map(([key]) => t(key as MessageKey)),
  );
  const labels = [...new Set(matches)];
  return labels.length === 1 ? labels[0] : name;
}

export function handCardName(card: HandCard, locale: AppLocale): string {
  if (locale === "en") return card.name;
  const intent = card.intent;
  if ((intent.card === "spell" || intent.card === "reaction") && intent.spell === card.name) return referenceDisplayName("spell", card.name, locale);
  if (intent.card === "attack" && intent.weapon.toLowerCase() === card.name.toLowerCase()) return referenceDisplayName("equipment", intent.weapon, locale);
  const t = createTranslator(locale);
  if (intent.card === "attack" && intent.offHand && card.name === `Off-hand ${intent.weapon}`) return t("handMaterial.name.offhand", { weapon: referenceDisplayName("equipment", intent.weapon, locale) });
  if (intent.card === "attack" && intent.attack?.bonusAttack === "martial arts" && card.name === "Martial Arts strike") return t("handMaterial.name.martialArtsStrike");
  if (intent.card === "attack" && intent.attack?.bonusAttack && card.name.endsWith(" attack")) return t("handMaterial.name.attackBonus", { feature: handTermLabel(card.name.slice(0, -7), locale) });
  if (intent.card === "basic" && intent.action === "escape" && card.name.startsWith("Escape: ")) return t("handMaterial.name.escape", { spell: referenceDisplayName("spell", card.name.slice(8), locale) });
  if (intent.card === "basic" && intent.bonus) {
    const parts = card.name.split(": ");
    if (parts.length === 2) return t("handMaterial.name.bonus", { feature: referenceDisplayName("spell", handTermLabel(parts[0], locale), locale), action: handTermLabel(parts[1], locale) });
  }
  return handTermLabel(card.name, locale);
}

export function handChoiceLabel(card: HandCard, label: string, locale: AppLocale): string {
  if (locale === "en") return label;
  const key = Object.entries(catalogFor("en", "handMaterial.choice.")).find(([, source]) => source === label)?.[0];
  if (key) return createTranslator(locale)(key as MessageKey);
  if (card.choice?.arg === "readySpell") return referenceDisplayName("spell", label, locale);
  // Condition selectors also carry ability names and command words. Only
  // project recognized labels; callbacks keep the original option value.
  const condition = conditionLabel(label, locale);
  if (condition !== label) return condition;
  const ability = combatTermLabel("ability", label, locale);
  if (ability !== label) return ability;
  const option = sheetChoiceOption(label, locale);
  return option === label.replace(/\b\w/g, letter => letter.toUpperCase()) ? label : option;
}

export function handAimName(aim: HandAim, locale: AppLocale): string {
  return aim.kind === "enemy" ? referenceDisplayName("monster", aim.name, locale) : aim.name;
}

export function handCostLabel(cost: HandCost, locale: AppLocale): string {
  return locale === "en" ? costLabel(cost) : createTranslator(locale)(cost === "bonus" ? "handUi.cost.bonusFull" : `handUi.cost.${cost}`);
}

export function handAreaDescription(area: HandArea, pick: AreaPick, locale: AppLocale): string {
  if (locale === "en") return describePick(area, pick);
  const t = createTranslator(locale);
  const point = (p: { x: number; y: number }) => `(${p.x},${p.y})`;
  if (area.pick === "none") return t("handUi.area.self");
  if (area.pick === "direction") return pick.toward ? t("handUi.area.direction", { point: point(pick.toward) }) : "";
  if (area.pick === "wall") {
    if (!pick.at) return "";
    return pick.toward && (pick.toward.x !== pick.at.x || pick.toward.y !== pick.at.y)
      ? t("handUi.area.wall", { at: point(pick.at), toward: point(pick.toward) })
      : t("handUi.area.start", { at: point(pick.at) });
  }
  return pick.at ? t("handUi.area.point", { point: point(pick.at) }) : "";
}

const OPTION_KEYS = {
  reckless: "handUi.option.reckless", stunningStrike: "handUi.option.stunningStrike", nonlethal: "handUi.option.nonlethal",
  useInspiration: "handUi.option.useInspiration", strokeOfLuck: "handUi.option.strokeOfLuck", hurlThroughHell: "handUi.option.hurlThroughHell",
  rapidStrike: "handUi.option.rapidStrike", "openHand:prone": "handUi.option.openHandProne", "openHand:push": "handUi.option.openHandPush",
  "openHand:no reactions": "handUi.option.openHandReaction",
} satisfies Record<HandAttackOptionId, MessageKey>;

type SentenceRenderer = (card: HandCard, aim: HandAim | null, riders: HandCard[], choices: HandChoices, locale: AppLocale) => string;
const catalogSentence: SentenceRenderer = (card, aim, riders, choices, locale) => {
  const t = createTranslator(locale);
  const intent = card.intent;
  const who = aim?.kind === "self" ? t("handUi.sent.myself")
    : aim ? (aim.kind === "enemy" ? referenceDisplayName("monster", aim.name, locale) : aim.name) : "";
  const named = (name: string) => handTermLabel(name, locale);
  const slot = (level: number | null | undefined, key: MessageKey = "handUi.sent.slot") => level ? t(key, { level }) : "";
  const chosen = chosenValue(card, choices);
  const label = card.choice?.options.find(option => option.value === chosen)?.label ?? chosen;
  const choice = label ? t("handUi.sent.choice", { choice: handChoiceLabel(card, label, locale) }) : "";
  if (intent.card === "attack") {
    const weapon = intent.weapon === "Unarmed strike" ? t("handUi.sent.unarmed")
      : t("handUi.sent.weapon", { weapon: referenceDisplayName("equipment", intent.weapon, locale) });
    const bonus = intent.attack?.bonusAttack;
    const feature = bonus === "frenzy" ? t("handUi.term.frenzy") : bonus === "martial arts" ? t("handUi.term.martialArts") : named(card.name.replace(/ attack$/, ""));
    const lead = intent.offHand ? t("handUi.sent.offhand", { weapon, against: who ? t("handUi.sent.against", { who }) : "" })
      : bonus ? t("handUi.sent.bonusAttack", { who: who || t("handUi.sent.enemy"), weapon, feature })
      : t("handUi.sent.attack", { who: who || t("handUi.sent.enemy"), weapon });
    const options = (choices.options ?? []).map(id => OPTION_KEYS[id] ? t(OPTION_KEYS[id]) : "").join("");
    const attached = riders.map(rider => {
      if (rider.intent.card !== "rider") return "";
      return rider.intent.rider === "Divine Smite" ? t("handUi.sent.smite", { slot: slot(rider.intent.slotLevel, "handUi.sent.slotWith") })
        : t("handUi.sent.riderAttack", { name: named(rider.intent.rider) });
    }).join("");
    return lead + options + attached;
  }
  if (intent.card === "reaction") {
    const at = who ? t(aim?.kind === "enemy" ? "handUi.sent.reactionAt" : "handUi.sent.reactionFor", { who }) : "";
    return intent.spell ? t("handUi.sent.castReaction", { spell: referenceDisplayName("spell", intent.spell, locale), at, slot: intent.slotLevel && intent.slotLevel > 1 ? slot(intent.slotLevel) : "" })
      : t("handUi.sent.featureReaction", { feature: named(intent.feature), at });
  }
  if (intent.card === "spell") return t("handUi.sent.cast", {
    spell: referenceDisplayName("spell", intent.spell, locale), choice,
    where: who ? t(aim?.kind === "enemy" ? "handUi.sent.at" : "handUi.sent.on", { who }) : "",
    area: card.area && hasPick(card.area, choices.area) ? t("handUi.sent.area", { area: handAreaDescription(card.area, choices.area ?? {}, locale) }) : "",
    how: card.cost === "bonus" ? t("handUi.sent.bonus") : card.cost === "reaction" ? t("handUi.sent.reaction") : "", slot: slot(intent.slotLevel),
  });
  if (intent.card === "feature") {
    const params = { name: named(card.name) + choice, where: who && aim?.kind !== "self" ? t("handUi.sent.on", { who }) : "", how: card.cost === "bonus" ? t("handUi.sent.bonus") : "" };
    // A quantity may spend ki/points, not restore HP. Keep the prompt neutral
    // and retain the two-space gap used by the composer's caret placement.
    const unit = card.unit === "ki" ? t("handUi.unit.ki") : card.unit === "points" ? t("handUi.term.points")
      : !card.unit || card.unit === "hit points" ? t("handUi.term.hitPoints") : card.unit;
    return card.compose ? t("handUi.sent.pool", { ...params, unit }) : t("handUi.sent.feature", params);
  }
  if (intent.card === "rider") return t("handUi.sent.rider", { name: named(intent.rider) });
  if (intent.card === "monster") return "";
  const route = intent.bonus ? card.name.split(":")[0].trim() : "";
  const bonus = route ? t("handUi.sent.basicBonus", { feature: named(route) }) : "";
  switch (intent.action) {
    case "dodge": return t("handUi.sent.dodge", { bonus });
    case "dash": return t("handUi.sent.dash", { bonus });
    case "disengage": return t("handUi.sent.disengage", { bonus });
    case "help": return t("handUi.sent.help", { who: who || t("handUi.sent.ally") });
    case "hide": return t("handUi.sent.hide", { bonus });
    case "search": return t("handUi.sent.search");
    case "escape": return card.name.startsWith("Escape: ") ? t("handUi.sent.escapeSpell", { spell: referenceDisplayName("spell", card.name.slice(8), locale) }) : t("handUi.sent.escape");
    case "ready": {
      const trigger = choices.trigger?.trim().replace(/[.。]+$/u, "");
      return trigger ? t("handUi.sent.ready", { held: chosen ? referenceDisplayName("spell", chosen, locale) : t("handUi.sent.heldAttack"), trigger }) : t("handUi.sent.readyBlank");
    }
    case "grapple": return t("handUi.sent.grapple", { who: who || t("handUi.sent.enemy") });
    case "shove": return t("handUi.sent.shove", { who: who || t("handUi.sent.enemy") });
    case "use-object": return t("handUi.sent.object", { bonus });
    case "end-turn": return t("handUi.sent.end");
    case "stand-up": return t("handUi.sent.stand");
  }
};

// Register the grammar explicitly when adding a locale. English delegates to
// the unchanged engine helper; structured intents always use the native card.
const SENTENCE_RENDERERS: Record<AppLocale, SentenceRenderer> = { en: composeSentence, "zh-CN": catalogSentence };
export function handSentence(card: HandCard, aim: HandAim | null, riders: HandCard[] = [], choices: HandChoices = {}, locale: AppLocale = "en"): string {
  return SENTENCE_RENDERERS[locale](card, aim, riders, choices, locale);
}
export function handAreaHintText(raw: string, locale: AppLocale): string {
  return sessionSourceText(raw, locale, "handUi.area.hint.");
}
