import type { ClassOption } from "../characters/options.ts";
import type { Reskinned } from "../worlds/reskin-logic.ts";
import type { PickerOption } from "../../app/characters/builder/OptionPicker.tsx";
import { LINEAGE_TRAIT_DISPLAY } from "./lineage-material-messages.ts";
import { CALLING_STYLE_METADATA } from "./calling-ui-messages.ts";
import { FIGHTING_STYLES } from "../srd/feature-effects.ts";
import { abilityLabel } from "./character-presentations.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export function callingCardFacts(entry: Reskinned<ClassOption> | undefined, option: PickerOption, locale: AppLocale) {
  const canonical = entry?.packName ? option.meta?.split(" · ")[1] : undefined;
  const t = createTranslator(locale);
  const saves = entry ? (locale === "en" ? `Saves ${entry.saves.map(save => save.toUpperCase()).join(" ")}`
    : t("callingUi.cardSaves", { abilities: entry.saves.map(save => abilityLabel(save, locale, true)).join(" ") })) : "";
  return { canonical, tagline: [canonical, option.source, saves].filter(Boolean).join(" · "),
    chips: entry ? [`d${entry.hitDie}`, ...(entry.spellAbility ? [locale === "en" ? `${entry.spellAbility.toUpperCase()} caster`
      : t("callingUi.caster", { ability: abilityLabel(entry.spellAbility, locale, true) })] : [])] : [] };
}

export function fightingStyleDescription(style: { id: string; description: string }, locale: AppLocale): string {
  const source = FIGHTING_STYLES.find(row => row.id === style.id);
  const meta = CALLING_STYLE_METADATA.find(row => row.id === style.id);
  return locale === "en" || !meta || source?.description !== style.description ? style.description : createTranslator(locale)(meta.key);
}

export function grantingTraitLabel(trait: string, locale: AppLocale): string {
  if (locale === "en") return trait;
  const row = LINEAGE_TRAIT_DISPLAY.find(row => row.head === trait || row.line === trait);
  return row ? createTranslator(locale)(row.headKey) : trait;
}
