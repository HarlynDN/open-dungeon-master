import type { AppLocale } from "./locales.ts";
import { catalogFor, createTranslator, messageTemplate, type MessageKey } from "./translator.ts";
import { conditionDisplay } from "./condition-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { describeExhaustion } from "../dm/condition-logic";
import { freeCastSpellOf, isFreeCastResource } from "../srd/feat-spells";

export function exhaustionSummary(level: number, locale: AppLocale): string {
  if (locale === "en") return describeExhaustion(level);
  return conditionDisplay({ label: "exhaustion", presentation: { kind: "exhaustion", level } }, locale).note;
}

export function damageListLabel(value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const source = catalogFor("en", "combatDetail.damage.");
  return value.split(", ").map(part => {
    const key = Object.keys(source).find(key => source[key as MessageKey] === part);
    return key ? createTranslator(locale)(key as MessageKey) : part;
  }).join(createTranslator(locale)("sheet.separator"));
}

// This helper receives a resource's original UI fallback. Unknown resources
// keep that wording; it never changes the key submitted to the engine.
export function resourceLabel(id: string, fallback: string, locale: AppLocale): string {
  if (locale === "en") return fallback;
  const source = catalogFor("en", "sheetPlay.resourceName.");
  const key = `sheetPlay.resourceName.${id}` as MessageKey;
  if (source[key]) return createTranslator(locale)(key);
  if (isFreeCastResource(id)) return createTranslator(locale)("sheetPlay.resource.freeCast", { spell: referenceDisplayName("spell", freeCastSpellOf(id), locale) });
  return fallback;
}

// Exact complete source templates only, for the existing hit-die endpoint.
// The response itself stays English and can be rerendered after a UI switch.
export function hitDieMessageText(english: string, locale: AppLocale): string {
  if (locale === "en") return english;
  if (english === messageTemplate("en", "abilityUi.errorSession")) return createTranslator(locale)("abilityUi.errorSession");
  if (english === messageTemplate("en", "auth.passwordRequired")) return createTranslator(locale)("auth.passwordRequired");
  const source = catalogFor("en", "sheetPlay.hitDie.error.");
  for (const key of Object.keys(source)) {
    const escaped = messageTemplate("en", key as MessageKey).replace(/[.*+?^$()|[\]\\]/g, "\\$&");
    const match = new RegExp(`^${escaped.replace(/\{(\w+)\}/g, (_, name: string) => `(?<${name}>[\\s\\S]+?)`)}$`).exec(english);
    if (match) return createTranslator(locale)(key as MessageKey, match.groups);
  }
  return english;
}
