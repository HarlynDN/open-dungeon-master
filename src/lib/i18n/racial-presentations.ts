import type { DraconicAncestry } from "../srd/racial-grants.ts";
import { abilityLabel } from "./character-presentations.ts";
import { featTermLabel } from "./feat-presentations.ts";
import type { AppLocale } from "./locales.ts";
import { createTranslator } from "./translator.ts";

const DRAGONS = ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"] as const;
export function draconicAncestryLabel(entry: DraconicAncestry, locale: AppLocale): string {
  if (locale === "en") return `${entry.dragon} (${entry.damageType}, ${entry.area}, ${entry.save.toUpperCase()} save)`;
  const t = createTranslator(locale), id = DRAGONS.find(id => id === entry.id);
  const area = entry.area === "5 by 30 ft. line" ? t("racialUi.line") : entry.area === "15 ft. cone" ? t("racialUi.cone") : entry.area;
  return t("racialUi.dragonOption", { dragon: id ? t(`racialUi.dragon.${id}`) : entry.dragon,
    damage: featTermLabel("damage", entry.damageType, locale), area, save: abilityLabel(entry.save, locale) });
}
