import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { abilityLabel } from "./character-presentations.ts";
import { featTermLabel } from "./feat-presentations.ts";
import { hpBreakdown, summaryLine } from "../../app/characters/builder/abilityDice.ts";
import { gainLabel, type AbilityGain } from "../../app/characters/builder/abilityGains.ts";
import type { HpExplainerInput } from "../../app/characters/builder/AbilityExplainers.tsx";
import { formatModifier } from "../srd/index.ts";
import type { Ability } from "../schemas/sheet.ts";

export function abilityRerollRule(below: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  return below <= 0 ? t("abilityUi.rerollRuleNone") : t("abilityUi.rerollRuleAllowed", { below });
}

export function abilityMethodRows(locale: AppLocale, below: number, standardArray: readonly number[]) {
  const t = createTranslator(locale);
  return [
    { id: "standard" as const, label: t("abilityUi.standard"), info: t("abilityUi.standardInfo", { numbers: standardArray.join(", ") }) },
    { id: "pointbuy" as const, label: t("abilityUi.pointbuy"), info: t("abilityUi.pointbuyInfo") },
    { id: "roll" as const, label: t("abilityUi.roll"), info: t("abilityUi.rollInfo", { rule: abilityRerollRule(below, locale) }) },
  ];
}

// The original gain source and its English key remain stable. Only its
// display is localized, including capped gains that contribute zero.
export function abilityGainText(gain: AbilityGain, locale: AppLocale): string {
  if (locale === "en") return gainLabel(gain);
  const t = createTranslator(locale);
  const level = /^at level (\d+)$/.exec(gain.source);
  const source = level ? t("abilityUi.gainLevel", { level: level[1] })
    : gain.source === "Primal Champion" ? t("abilityUi.primalChampion") : featTermLabel("feat", gain.source, locale);
  return t(gain.capped ? "abilityUi.gainCapped" : "abilityUi.gain", { amount: gain.amount, source });
}

export function abilityRowLabel(ability: Ability, source: string, locale: AppLocale): string {
  return source === abilityLabel(ability, "en") ? abilityLabel(ability, locale) : source;
}

export function abilitySummaryText(input: Parameters<typeof summaryLine>[0], locale: AppLocale): string {
  if (locale === "en") return summaryLine(input);
  const t = createTranslator(locale);
  const lead = t(`abilityUi.lead.${input.method}`);
  if (!input.best) return lead;
  const id = (["str", "dex", "con", "int", "wis", "cha"] as const).find(id => abilityLabel(id, "en") === input.best!.label);
  return t(input.who ? "abilityUi.summaryWho" : "abilityUi.summaryNoWho", {
    lead, ability: id ? abilityLabel(id, locale) : input.best.label, score: input.best.final, who: input.who,
  });
}

export function abilityHpSteps(hp: HpExplainerInput, locale: AppLocale): string[] {
  const t = createTranslator(locale), parts = hpBreakdown(hp);
  return [
    t("abilityUi.hpStep1", { class: locale === "en" ? hp.className.toLowerCase() : hp.className, die: parts.hitDie }),
    t("abilityUi.hpStep2", { con: hp.con, modifier: formatModifier(parts.conMod) }),
    hp.level > 1 ? t(hp.level === 2 ? "abilityUi.hpLaterOne" : "abilityUi.hpLaterMany", {
      average: Math.floor(parts.hitDie / 2) + 1, levels: hp.level - 1, later: parts.laterLevels, total: parts.total,
    }) : t("abilityUi.hpFirst", { total: parts.total }),
    hp.override ? t("abilityUi.hpOverride", { override: hp.override }) : t("abilityUi.hpCanOverride"),
  ];
}

// Keep raw errors in state so a language switch also rerenders a refusal.
// Complete unfamiliar diagnostics remain available rather than being lost.
export function abilityRollErrorText(source: string, locale: AppLocale): string {
  if (locale === "en" || !source) return source;
  const t = createTranslator(locale);
  for (const key of ["abilityUi.errorRoll", "abilityUi.errorNetwork", "abilityUi.errorKind", "abilityUi.errorSession"] as const) {
    if (source === createTranslator("en")(key)) return t(key);
  }
  return t("abilityUi.errorDetails", { source });
}
