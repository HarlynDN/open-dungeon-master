import { scopedCatalog } from "./translator.ts";
import type { BuilderFeedback } from "../characters/builder-feedback.ts";
import type { AppLocale } from "./locales.ts";
import { createTranslator } from "./translator.ts";
import { BUILDER_DROP_KINDS, BUILDER_GATE_CODES } from "./builder-messages.ts";
import type { BUILDER_MESSAGES as BUILDER_MESSAGES_Shape } from "./builder-messages.ts";
import { abilityLabel, characterRuleProblems, isRuleValue, ruleValueText, skillLabel } from "./character-presentations.ts";
import { builderTermLabel } from "./builder-name-presentations.ts";
import { trainingLabel } from "./training-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import type { DroppedPick } from "../../app/characters/builder/reconcile.ts";
import type { DroppedNotice } from "../../app/characters/builder/useBuilderState.ts";
import { FIGHTING_STYLES } from "../srd/feature-effects.ts";
import { SRD_SKILLS } from "../srd/index.ts";
import type { ToolChoice } from "../srd/tool-choices.ts";

export function builderToolChoicesText(choices: ToolChoice[], locale: AppLocale): string {
  if (locale === "en") {
    const words: Record<number, string> = { 1: "one", 2: "two", 3: "three" };
    return choices.map(choice => `${words[choice.count] ?? choice.count} ${choice.label}${choice.count === 1 || choice.label.endsWith("s") ? "" : "s"}`).join(" and ");
  }
  const t = createTranslator(locale);
  return new Intl.ListFormat(locale, { type: "conjunction" }).format(choices.map(choice => t("builderIdentity.toolCount", {
    count: choice.count, category: trainingLabel("toolCategory", choice.label, locale),
  })));
}

export function builderFeedbackText(feedback: BuilderFeedback | null, locale: AppLocale): string {
  if (!feedback) return "";
  if (locale === "en") return feedback.message;
  const t = createTranslator(locale), view = feedback.presentation;
  const pending = () => t("builder.feedbackPending", { source: feedback.message });
  if (!view || typeof view !== "object") return pending();
  if (view.kind === "rules") {
    if (!Array.isArray(view.problems) || !view.problems.length || !view.problems.every(value => typeof value === "string" && value.trim())
      || !Number.isInteger(view.more) || view.more < 0 || view.more > 100) return pending();
    const first = characterRuleProblems({ problems: view.problems.slice(0, 1), problemDetails: view.problemDetails }, locale);
    return view.more ? t("builder.moreEquipmentProblems", { first, count: view.more }) : first;
  }
  if (view.kind !== "gate" || !BUILDER_GATE_CODES.some(code => code === view.code)
    || !view.args || typeof view.args !== "object" || Array.isArray(view.args) || !Object.values(view.args).every(value => isRuleValue(value))) return pending();
  const placeholders = BUILDER_MESSAGES.en[view.code].matchAll(/\{(\w+)\}/g);
  if (![...placeholders].every(match => Object.hasOwn(view.args, match[1]))) return pending();
  const args = Object.fromEntries(Object.entries(view.args).map(([key, value]) => [key, ruleValueText(value, locale)]));
  if (view.code === "builderGate.spellWarning" && args.name === "") args.name = t("builder.character");
  return t(view.code, args);
}

function droppedName(drop: DroppedPick, locale: AppLocale): string {
  switch (drop.target) {
    case "classSkills": case "racialSkills": case "backgroundSkills": case "expertise":
      return locale === "en" ? SRD_SKILLS.find(skill => skill.id === drop.value)?.name ?? drop.value : skillLabel(drop.value, locale);
    case "styles": {
      const name = FIGHTING_STYLES.find(style => style.id === drop.value)?.name ?? drop.value;
      return builderTermLabel("fightingStyle", name, locale);
    }
    case "racialAsi": return abilityLabel(drop.value, locale);
    case "racialTool": return trainingLabel("tool", drop.value, locale);
    case "languages": return trainingLabel("language", drop.value, locale);
    case "racialCantrip": case "spells": return referenceDisplayName("spell", drop.value, locale);
    default: return drop.value;
  }
}

export function builderDroppedText({ because, drops }: DroppedNotice, stepLabel: string | undefined, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (locale === "en") {
    const list = drops.map(drop => `${drop.label} ${droppedName(drop, locale)}`);
    const named = list.length <= 2 ? list.join(" and ") : `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
    const where = stepLabel ? ` Anything still owed is asked for on the ${stepLabel} step.` : "";
    if (because === "stored character") return `${list.length === 1 ? "A stored pick is" : "Stored picks are"} no longer on offer: ${named}.${where}`;
    if (because === "content pack") return `The content pack's rows set aside ${named}.${where}`;
    return `Changing the ${because} set aside ${named}: ${list.length === 1 ? "it no longer fits" : "they no longer fit"}.${where}`;
  }
  const picks = new Intl.ListFormat(locale, { type: "conjunction" }).format(drops.map(drop => {
    const entry = BUILDER_DROP_KINDS.find(row => row.name === drop.label);
    return t("builder.dropEntry", { kind: entry ? t(entry.key) : drop.label, name: droppedName(drop, locale) });
  }));
  const where = stepLabel ? t("builder.droppedWhere", { step: stepLabel }) : "";
  if (because === "stored character") return t("builder.droppedStored", { picks, where });
  if (because === "content pack") return t("builder.droppedPack", { picks, where });
  const key = `builder.dropReason.${because}` as keyof typeof BUILDER_MESSAGES.en;
  return t("builder.droppedChange", { picks, where, reason: Object.hasOwn(BUILDER_MESSAGES.en, key) ? t(key) : because });
}

const BUILDER_MESSAGES = scopedCatalog<typeof BUILDER_MESSAGES_Shape>("builder");
