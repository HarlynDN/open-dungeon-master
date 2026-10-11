import { createTranslator } from "./translator.ts";
import { featTermLabel } from "./feat-presentations.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";
import type { AppLocale } from "./locales.ts";
import type { FeatSpellSpec } from "../srd/feat-spells.ts";

const ENGINE_LABELS = {
  "[pc_attack powerAttack]": "callingUi.featChoice.engine.power",
  "[use_reaction]": "callingUi.featChoice.engine.reaction",
  "[pc_attack bonusAttack feature]": "callingUi.featChoice.engine.bonusAttack",
  "[pc_attack stunShot]": "callingUi.featChoice.engine.stun",
  "[take_action bonus]": "callingUi.featChoice.engine.bonus",
  "[server]": "callingUi.featChoice.engine.server",
  "[cast tools]": "callingUi.featChoice.engine.casting",
} as const;

// Tool tags describe engine coverage, never a translated protocol argument.
export function featEngineLabel(tag: string, locale: AppLocale): string {
  const key = ENGINE_LABELS[tag as keyof typeof ENGINE_LABELS];
  return locale === "en" || !key ? tag : createTranslator(locale)(key);
}

export function featChoiceSpellLabel(feat: string, taught: FeatSpellSpec, kind: "cantrips" | "spells", level: number, index: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  // Preserve the existing English ordinal format; display grammar is separate
  // from the level/class/school filters sent to the content API.
  const ordinal = locale === "en" ? level === 1 ? "1st" : `${level}th` : level;
  const spell = kind === "cantrips"
    ? t(taught.attackCantrip ? "callingUi.featChoice.attackCantrip" : "callingUi.featChoice.cantrip")
    : t("callingUi.featChoice.spell", {
      level: ordinal,
      school: taught.schools.length ? t("callingUi.featChoice.school", { schools: taught.schools.map(school => spellGearTermLabel("school", school, locale)).join(t("callingUi.featChoice.or")) }) : "",
      ritual: taught.ritualBook ? t("callingUi.featChoice.ritual") : "",
    });
  return t("callingUi.featChoice.spellLabel", { feat: featTermLabel("feat", feat, locale), spell, index });
}
