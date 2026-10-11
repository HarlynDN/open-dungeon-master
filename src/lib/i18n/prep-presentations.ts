import type { WorldLoreCategory } from "../dm/world-lore-logic.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";
import { createTranslator } from "./translator.ts";

export function loreCategoryLabel(category: WorldLoreCategory, locale: AppLocale = DEFAULT_LOCALE): string {
  return createTranslator(locale)(`lore.category.${category}`);
}
export function copyLoreTitle(title: string, campaignLocale: AppLocale = DEFAULT_LOCALE): string {
  return createTranslator(campaignLocale)("lore.copyTitle", { title });
}
// Delimiters are UI syntax; the authored terms themselves remain unchanged.
export function parseCommaList(text: string, limit = Infinity): string[] {
  return text.split(/[,，、]/u).map(term => term.trim()).filter(Boolean).slice(0, limit);
}
export function sessionWhenLabel(startsAt: string, locale: AppLocale = DEFAULT_LOCALE): string {
  return new Date(startsAt).toLocaleString(locale, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
