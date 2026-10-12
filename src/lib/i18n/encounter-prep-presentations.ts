import { createTranslator } from "./translator.ts";
import { dmToolsText } from "./dm-tools-presentations.ts";
import { referenceRowName } from "./reference-ui-presentations.ts";
import type { AppLocale } from "./locales.ts";

export type RosterMonster = { slug: string; name: string; cr: number; type: string; art?: string; source?: string; documentSlug?: string };
export function rosterMonsterName(entry: RosterMonster, locale: AppLocale): string {
  return referenceRowName("monsters", { ...entry, source: entry.source ?? "", data: {} }, locale);
}
// A one-character CJK creature name is meaningful; a single Latin letter still
// waits for more input. This is a query rule, not a campaign-language override.
export function monsterSearchReady(query: string): boolean {
  const term = query.trim();
  return term.length >= 2 || /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]$/u.test(term);
}
export function encounterBudgetTick(source: string, locale: AppLocale): string {
  const keys = { easy: "encounterPrep.tick.easy", medium: "encounterPrep.tick.medium", hard: "encounterPrep.tick.hard", deadly: "encounterPrep.tick.deadly", ceiling: "encounterPrep.tick.ceiling" } as const;
  return Object.hasOwn(keys, source) ? createTranslator(locale)(keys[source as keyof typeof keys]) : source;
}
export function encounterPrepError(source: string, locale: AppLocale): string {
  if (!source || locale === "en") return source;
  const t = createTranslator(locale);
  const load = /^(The tables|The cast|The lore|The bestiary|The monster search) did not load\. ([\s\S]+)$/.exec(source);
  if (load) {
    const keys = { "The tables": "encounterPrep.load.tables", "The cast": "encounterPrep.load.cast", "The lore": "encounterPrep.load.lore", "The bestiary": "encounterPrep.load.bestiary", "The monster search": "encounterPrep.load.monsterSearch" } as const;
    return t("encounterPrep.loadFailed", { what: t(keys[load[1] as keyof typeof keys]), reason: encounterPrepError(load[2], locale) });
  }
  const status = /^The server answered (\d{3})\.$/.exec(source);
  return status ? t("encounterPrep.status", { status: status[1] }) : dmToolsText(source, locale);
}
