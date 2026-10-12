import { REFERENCE_NAMES, type ReferenceKind } from "./reference-names.ts";
import type { AppLocale } from "./locales.ts";
import { glossaryTerms } from "../help/index.ts";
import { glossaryTermView } from "./game-help-presentations.ts";

// Search aliases only; names, source text, citations and the actual question
// sent to the model remain canonical/raw. New registered locales participate.
export function referenceSearchNames(kind: ReferenceKind, query: string, locale: AppLocale): string[] {
  const wanted = query.trim().normalize("NFKC").toLowerCase();
  if (!wanted || locale === "en") return [];
  return Object.entries(REFERENCE_NAMES[locale][kind] ?? {}).filter(([, aliases]) =>
    aliases.some(alias => alias.normalize("NFKC").toLowerCase().includes(wanted))).map(([name]) => name);
}

export function deskSearchQuestion(question: string, locale: AppLocale): string {
  if (locale === "en") return question;
  const wanted = question.normalize("NFKC").toLowerCase();
  const matches: Array<{ alias: string; name: string }> = [];
  for (const kind of ["spell", "monster", "equipment"] as const) for (const [name, aliases] of Object.entries(REFERENCE_NAMES[locale][kind] ?? {})) {
    for (const alias of aliases) if (alias.length > 1 && wanted.includes(alias.toLowerCase())) matches.push({ alias, name });
  }
  for (const term of glossaryTerms()) {
    const alias = glossaryTermView(term.id, locale)?.term;
    if (alias && alias !== term.term && wanted.includes(alias.toLowerCase())) matches.push({ alias, name: term.term });
  }
  matches.sort((a, b) => b.alias.length - a.alias.length);
  const selected: typeof matches = [];
  for (const match of matches) if (!selected.some(previous => previous.alias.includes(match.alias))) selected.push(match);
  const aliases = [...new Set(selected.map(match => match.name))].slice(0, 6);
  return aliases.length ? `${question} ${aliases.map(name => JSON.stringify(name)).join(" ")}` : question;
}
