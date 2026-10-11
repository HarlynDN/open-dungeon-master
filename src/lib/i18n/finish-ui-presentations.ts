import { hitPointsLine } from "../../app/characters/builder/derivedReasons.ts";
import { fixedDieValue } from "../srd/hit-points.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export function localizedHitPointsLine(input: Parameters<typeof hitPointsLine>[0], locale: AppLocale): ReturnType<typeof hitPointsLine> {
  const original = hitPointsLine(input);
  if (locale === "en") return original;
  const t = createTranslator(locale);
  const key = input.kept ? "finishUi.hpKept" : input.level <= 1 ? "finishUi.hpFirst" : input.method === "rolled" ? "finishUi.hpRolled" : input.method === "max" ? "finishUi.hpMax" : "finishUi.hpFixed";
  return {
    value: !input.kept && input.level > 1 && input.method === "rolled" ? t("finishUi.hpRange", input.range) : original.value,
    reason: t(key, { die: input.hitDie, value: input.method === "max" ? input.hitDie : fixedDieValue(input.hitDie), tableNote: input.atTable ? "" : t("finishUi.hpTableNote") }),
  };
}

export function finishRulesErrorText(english: string, locale: AppLocale): string {
  for (const key of ["finishUi.rulesReadError", "finishUi.rulesNetworkError"] as const) {
    if (english === createTranslator("en")(key)) return createTranslator(locale)(key);
  }
  return english;
}
