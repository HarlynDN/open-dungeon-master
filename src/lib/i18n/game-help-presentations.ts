import { glossaryTerm, describeSkill, type GlossaryTerm } from "../help/index.ts";
import skillsJson from "../srd/skills.json";
import { GAME_HELP_METADATA } from "./game-help-messages.ts";
import { skillLabel } from "./character-presentations.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

// Display projections only. Rules/model callers retain the original helpers
// and English source data, and glossary IDs never change with the locale.
export function glossaryTermView(id: string, locale: AppLocale): GlossaryTerm | null {
  const source = glossaryTerm(id);
  if (!source || locale === "en") return source;
  const t = createTranslator(locale);
  const row = GAME_HELP_METADATA.find(row => row.id === id);
  if (!row) return { ...source, term: t("gameHelp.pending", { source: source.term }) };
  return { id: source.id, term: t(row.termKey), short: t(row.shortKey),
    ...("longKey" in row ? { long: t(row.longKey) } : {}) };
}

export function skillHelpText(skillId: string, locale: AppLocale): string | null {
  const original = describeSkill(skillId);
  if (!original || locale === "en") return original;
  const skill = skillsJson.skills.find(row => row.id === skillId.trim().toLowerCase());
  if (!skill) return original;
  const ability = glossaryTermView(skill.ability, locale);
  return createTranslator(locale)("gameHelp.skillUses", {
    skill: skillLabel(skill.id, locale), ability: ability?.term ?? skill.ability.toUpperCase(),
    description: ability?.short ?? "",
  }).trim();
}
