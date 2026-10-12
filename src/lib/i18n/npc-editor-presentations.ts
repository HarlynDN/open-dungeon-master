import { AXIS_LABELS, describeAxis, describeNpc, describeRelation, type AxisName, type NpcDraft } from "../npcs/forge.ts";
import { PERSONALITY_AXES, clampAxis } from "../dm/npc-logic.ts";
import { npcRoleLabel, type NpcRoleOption } from "../placeholders.ts";
import { NPC_ROLE_METADATA } from "./npc-role-metadata.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export function npcAxisName(axis: AxisName, locale: AppLocale): string {
  return locale === "en" ? AXIS_LABELS[axis].name : createTranslator(locale)(`npcEditor.axis.${axis}.name`);
}
export function npcAxisDescription(axis: AxisName, value: number, locale: AppLocale): string {
  if (locale === "en") return describeAxis(axis, value);
  const t = createTranslator(locale), score = clampAxis(value);
  if (!score) return t("npcEditor.neither");
  const word = t(`npcEditor.axis.${axis}.${score > 0 ? "high" : "low"}`);
  return Math.abs(score) >= 2 ? t("npcEditor.very", { word }) : word;
}
export function npcRelationDescription(score: number, locale: AppLocale): string {
  if (locale === "en") return describeRelation(score);
  const keys = ["npcEditor.relation.-3", "npcEditor.relation.-2", "npcEditor.relation.-1", "npcEditor.relation.0", "npcEditor.relation.1", "npcEditor.relation.2", "npcEditor.relation.3"] as const;
  return createTranslator(locale)(keys[clampAxis(score) + 3]);
}
export function npcGraphRelation(score: number, locale: AppLocale): string {
  const word = score >= 2 ? "close" : score >= 1 ? "friendly" : score <= -2 ? "hates" : score <= -1 ? "wary" : "knows";
  return locale === "en" ? word : createTranslator(locale)(`npcEditor.graphRelation.${word}`);
}
export function npcGoalLabel(field: "scene" | "session" | "ambition", locale: AppLocale): string {
  return createTranslator(locale)(`npcEditor.goal.${field}`);
}
export function npcDraftDescription(draft: NpcDraft, locale: AppLocale): string {
  if (locale === "en") return describeNpc(draft);
  const t = createTranslator(locale);
  const traits = draft.personality ? PERSONALITY_AXES.filter(axis => clampAxis(draft.personality![axis]) !== 0)
    .map(axis => npcAxisDescription(axis, draft.personality![axis], locale)).join(t("npcEditor.traitJoin")) : "";
  return [draft.trait, traits, draft.location].map(part => part.trim()).filter(Boolean).join(t("npcEditor.summaryJoin"));
}

// Translate only registered source options. Authored roles remain free text;
// selected display labels resolve back to IDs before the draft is saved.
export function npcRoleOptionLabel(role: NpcRoleOption, locale: AppLocale): string {
  const source = NPC_ROLE_METADATA.find(entry => entry.id === role.id && entry.label === role.label);
  return locale === "en" || !source ? role.label : createTranslator(locale)(source.key);
}
export function npcRoleInput(value: string, roles: readonly NpcRoleOption[], locale: AppLocale): string {
  const role = roles.find(entry => entry.id === value);
  return locale === "en" || !role ? value : npcRoleOptionLabel(role, locale);
}
export function npcRoleFromInput(value: string, roles: readonly NpcRoleOption[], locale: AppLocale): string {
  if (locale === "en") return value;
  const candidates = roles.filter(role => npcRoleOptionLabel(role, locale) === value);
  return candidates.length === 1 ? candidates[0].id : value;
}
export function npcRoleDisplay(value: string, locale: AppLocale): string {
  if (locale === "en") return npcRoleLabel(value);
  const id = value.trim().toLowerCase().replace(/[\s_]/g, "-");
  const source = NPC_ROLE_METADATA.find(entry => entry.id === id);
  return source ? createTranslator(locale)(source.key) : value.trim();
}
