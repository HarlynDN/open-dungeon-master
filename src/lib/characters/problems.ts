import type { CharacterRuleCode } from "../i18n/character-rule-messages.ts";
import type { Ability } from "../schemas/abilities.ts";

// Display data only. Canonical names remain in args and the old English
// problem remains byte-for-byte available to engine/API consumers.
export type RuleTermKind = "class" | "race" | "background" | "ability" | "skill" | "spell" | "equipment" | "tool" | "language" | "feat" | "armorTraining" | "damage" | "featureSource" | "school" | "spellKind" | "spellCountKind" | "kitOption" | "toolCategory" | "optionCategory" | "castingKind" | "fightingStyle";
export type RuleTerm = { kind: "term"; type: RuleTermKind; value: string };
export type RuleAbilityRequirement = { kind: "abilityRequirement"; alternatives: Ability[][]; minimum: number };
export type RuleSkillOffers = {
  kind: "skillOffers";
  offers: { source: RuleTerm | "repeated"; count: number; from: string[] | null }[];
  fixed: string[];
};
export type RuleToolOffers = {
  kind: "toolOffers";
  offers: { count: number; label: string; from: string[] }[];
};
export type RuleFeatCondition =
  | { type: "abilities"; abilities: Ability[]; minimum: number }
  | { type: "armor"; weight: "light" | "medium" | "heavy" }
  | { type: "casting" | "elf" | "vehicle" }
  | { type: "level"; minimum: number }
  | { type: "skills"; skills: string[] }
  | { type: "weapons"; category: "simple" | "martial" | "ranged" | "melee"; form: "ranged" | "melee" | null }
  | { type: "source"; value: string };
export type RuleFeatPrerequisite = { kind: "featPrerequisite"; parts: RuleFeatCondition[] };
export type RuleFeatPickKind = "skills" | "languages" | "tools" | "weapons" | "armor" | "expertise" | "damage";
export type RuleFeatPicks = { kind: "featPicks"; picks: { count: number; kinds: RuleFeatPickKind[] }[] };
export type RuleFeatSpellPicks = {
  kind: "featSpellPicks";
  classList: boolean; ability: boolean; cantrips: number; attackCantrip: boolean;
  spells: number; spellLevel: number; schools: string[]; ritual: boolean;
};
export type RuleKitSlot = { kind: "kitSlot"; filter: "simple" | "simple-melee" | "martial" | "martial-melee" | "instrument"; except: string[] };
export type RuleGearAlternatives = { kind: "gearAlternatives"; alternatives: { items: { name: string; qty: number }[]; tools: string[] | null }[] };
export type RuleSubclass = { kind: "subclass"; classId: string; value: string };
export type RuleValue = string | number | RuleTerm | RuleAbilityRequirement | RuleSkillOffers | RuleToolOffers | RuleFeatPrerequisite | RuleFeatPicks | RuleFeatSpellPicks | RuleKitSlot | RuleGearAlternatives | RuleSubclass | RuleValue[];
export type RuleArgs = Record<string, RuleValue>;
export type RuleProblem = { code: CharacterRuleCode; args: RuleArgs; english: string };
export type UntranslatedRuleProblem = { code: "untranslated"; args: Record<string, never>; english: string };
export type RuleProblemDetail = RuleProblem | UntranslatedRuleProblem;
export type RuleProblemSink = (problem: RuleProblem) => void;

export const ruleTerm = (type: RuleTermKind, value: string): RuleTerm => ({ kind: "term", type, value });

export function ruleDetail(code: CharacterRuleCode, args: RuleArgs, english: string): RuleProblem {
  return { code, args: structuredClone(args), english };
}

// An optional collector does not change the pure validator's return shape.
// No locale or UI dictionary is imported at runtime by the rules engine.
export function ruleReporter(problems: string[], sink?: RuleProblemSink) {
  return (code: CharacterRuleCode, args: RuleArgs, english: string) => {
    problems.push(english);
    sink?.(ruleDetail(code, args, english));
  };
}

// The final English list defines order and deduplication. Never omit a
// problem merely because its emitter has not been migrated yet.
export function completeRuleDetails(problems: string[], reported: RuleProblem[]): RuleProblemDetail[] {
  const byEnglish = new Map<string, RuleProblem>();
  for (const detail of reported) if (!byEnglish.has(detail.english)) byEnglish.set(detail.english, detail);
  return problems.map(english => byEnglish.get(english) ?? { code: "untranslated", args: {}, english });
}
