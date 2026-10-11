import { scopedCatalog } from "./translator.ts";
import { CONDITION_BLURBS, SPELL_SCHOOL_BLURBS, WEAPON_PROPERTY_BLURBS, DAMAGE_TYPE_BLURBS, SIZE_BLURBS,
  glossaryText, type GlossaryEntry } from "../help/terms.ts";
import { describeSkill } from "../help/index.ts";
import skillsJson from "../srd/skills.json";
import type { BUILDER_PICKER_MESSAGES as BUILDER_PICKER_MESSAGES_Shape } from "./builder-picker-messages.ts";
import { CLOSED_GAME_HELP_METADATA } from "./closed-game-help-messages.ts";
import type { CLOSED_GAME_HELP_MESSAGES as CLOSED_GAME_HELP_MESSAGES_Shape } from "./closed-game-help-messages.ts";
import { skillHelpText } from "./game-help-presentations.ts";
import { skillLabel } from "./character-presentations.ts";
import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

const sources: Record<string, Record<string, string>> = { condition: CONDITION_BLURBS, school: SPELL_SCHOOL_BLURBS,
  property: WEAPON_PROPERTY_BLURBS, damage: DAMAGE_TYPE_BLURBS, size: SIZE_BLURBS };

// Source text must match too: an authored explanation with a stock name is
// still the author's content. This projection never changes list membership.
export function glossaryEntriesView(entries: readonly GlossaryEntry[], locale: AppLocale): GlossaryEntry[] {
  if (locale === "en") return [...entries];
  const t = createTranslator(locale);
  return entries.map(entry => {
    const row = CLOSED_GAME_HELP_METADATA.find(row => row.name === entry.name.toLowerCase()
      && sources[row.kind][row.name] === entry.blurb);
    if (row) return { name: t(row.nameKey), blurb: t(row.blurbKey) };
    const skill = skillsJson.skills.find(row => row.name === entry.name && describeSkill(row.id) === entry.blurb);
    if (skill) return { name: skillLabel(skill.id, locale), blurb: skillHelpText(skill.id, locale) ?? entry.blurb };
    const alignment = Object.keys(BUILDER_PICKER_MESSAGES.en).find(key => key.startsWith("builderPicker.alignment.")
      && BUILDER_PICKER_MESSAGES.en[key as keyof typeof BUILDER_PICKER_MESSAGES.en] === entry.name);
    if (alignment) {
      const blurb = alignment.replace("builderPicker.alignment.", "builderPicker.alignmentBlurb.") as MessageKey;
      if (BUILDER_PICKER_MESSAGES.en[blurb as keyof typeof BUILDER_PICKER_MESSAGES.en] === entry.blurb) {
        return { name: t(alignment as MessageKey), blurb: t(blurb) };
      }
    }
    return entry;
  });
}

export function glossaryListText(entries: readonly GlossaryEntry[], locale: AppLocale): string {
  if (locale === "en") return glossaryText(entries);
  const t = createTranslator(locale);
  return glossaryEntriesView(entries, locale).map(entry => t("closedHelp.line", entry)).join("\n\n");
}

export function glossaryTitle(title: string, locale: AppLocale): string {
  if (locale === "en") return title;
  const key = Object.keys(CLOSED_GAME_HELP_MESSAGES.en).find(key => !key.includes(".name") && !key.includes(".blurb")
    && CLOSED_GAME_HELP_MESSAGES.en[key as keyof typeof CLOSED_GAME_HELP_MESSAGES.en] === title);
  return key ? createTranslator(locale)(key as MessageKey) : title;
}

const BUILDER_PICKER_MESSAGES = scopedCatalog<typeof BUILDER_PICKER_MESSAGES_Shape>("builderPicker.");

const CLOSED_GAME_HELP_MESSAGES = scopedCatalog<typeof CLOSED_GAME_HELP_MESSAGES_Shape>("closedHelp.");
