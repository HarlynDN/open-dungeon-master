import type { AppLocale } from "../i18n/locales.ts";
import { referenceSearchNames } from "../i18n/reference-search.ts";
import { GAME_HELP_MESSAGES, GAME_HELP_METADATA } from "../i18n/game-help-messages.ts";

// Read-only query expansion over registered names/terms. Original queries and
// page IDs/text stay intact; omitted/en locale retains the legacy search path.
export function rulebookSearchQueries(query: string, locale: AppLocale): string[] {
  if (locale === "en") return [query];
  const wanted = query.trim().normalize("NFKC").toLowerCase();
  if (!wanted) return [query];
  const aliases: string[] = [];
  for (const kind of ["spell", "monster", "equipment"] as const) aliases.push(...referenceSearchNames(kind, query, locale));
  for (const row of GAME_HELP_METADATA) {
    const translated = GAME_HELP_MESSAGES[locale][row.termKey].normalize("NFKC").toLowerCase();
    if (translated.includes(wanted)) aliases.push(GAME_HELP_MESSAGES.en[row.termKey]);
  }
  const terms = [...new Set(aliases)].slice(0, 6);
  return terms.length ? terms : [query];
}
