import type { AppLocale } from "./locales.ts";
import { referenceAliases, REFERENCE_NAMES, type ReferenceKind } from "./reference-names.ts";

export type ReferenceCandidate = {
  id: string;
  name: string;
  aliases?: readonly string[];
};

export type ReferenceResolution<T> =
  | { kind: "matched"; entry: T }
  | { kind: "ambiguous"; choices: T[] }
  | { kind: "unknown" };

const key = (name: string) => name.normalize("NFKC").replace(/[‘’]/g, "'").trim().toLowerCase().replace(/\s+/g, " ").replace(/\s*(\+[1-3])$/, " $1");

// An equipment bonus is part of the owned item's name: translating
// Longsword +1 must not turn it into a different, plain Longsword.
export function localizedReferenceAliases(kind: ReferenceKind, name: string, locale: AppLocale): readonly string[] {
  const known = referenceAliases(kind, name, locale);
  const direct = known.length ? known : referenceAliases(kind, key(name), locale);
  if (direct.length) return direct;
  if (kind === "monster") {
    const indexed = /^(.*?)\s+((?:#\s*)?\d+)$/.exec(name.trim());
    return indexed ? referenceAliases(kind, indexed[1], locale).map(alias => `${alias} ${indexed[2]}`) : [];
  }
  if (kind !== "equipment") return direct;
  const bonus = /^(.*?)\s*(\+[1-3])$/.exec(name.trim());
  return bonus ? referenceAliases(kind, bonus[1].trim(), locale).map(alias => `${alias} ${bonus[2]}`) : [];
}

export function referenceDisplayName(kind: ReferenceKind, name: string, locale: AppLocale): string {
  return localizedReferenceAliases(kind, name, locale)[0] ?? name;
}

export function referencePresentation(kind: ReferenceKind, entry: ReferenceCandidate, locale: AppLocale) {
  const aliases = localizedReferenceAliases(kind, entry.name, locale);
  return { id: entry.id, canonicalName: entry.name, displayName: aliases[0] ?? entry.name, aliases };
}

// Callers supply only their own allowed catalog/inventory. This helper
// never loads another author's data or fuzzy-matches a translated name.
export function resolveNamedReference<T extends ReferenceCandidate>(
  term: string,
  candidates: readonly T[],
  localizedAliases: (entry: T) => readonly string[] = () => [],
): ReferenceResolution<T> {
  const wanted = key(term);
  if (!wanted) return { kind: "unknown" };
  const unique = (rows: readonly T[]) => [...new Map(rows.map(row => [row.id, row])).values()];
  const choose = (rows: T[]): ReferenceResolution<T> => rows.length === 1
    ? { kind: "matched", entry: rows[0] }
    : rows.length ? { kind: "ambiguous", choices: rows } : { kind: "unknown" };
  const ids = unique(candidates.filter(row => key(row.id) === wanted));
  if (ids.length) return choose(ids);
  const names = unique(candidates.filter(row => key(row.name) === wanted));
  if (names.length) return choose(names);
  const canonicalAliases = unique(candidates.filter(row => row.aliases?.some(alias => key(alias) === wanted)));
  if (canonicalAliases.length) return choose(canonicalAliases);
  return choose(unique(candidates.filter(row => localizedAliases(row).some(alias => key(alias) === wanted))));
}

export function resolveReference<T extends ReferenceCandidate>(
  kind: ReferenceKind,
  term: string,
  candidates: readonly T[],
  locale: AppLocale,
): ReferenceResolution<T> {
  return resolveNamedReference(term, candidates, row => localizedReferenceAliases(kind, row.name, locale));
}

export function translatedReferenceNames(kind: ReferenceKind, term: string, locale: AppLocale): string[] {
  const wanted = key(term);
  const direct = Object.entries(REFERENCE_NAMES[locale][kind] ?? {})
    .filter(([, aliases]) => aliases.some(alias => key(alias) === wanted))
    .map(([name]) => name);
  // Some +N names are complete registered items (a War Mage wand), not a
  // bonus appended to a mundane base item. Preserve those exact matches.
  if (direct.length) return direct;
  const bonus = kind === "equipment" ? /^(.*?)\s*(\+[1-3])$/.exec(term.trim()) : null;
  if (bonus) return translatedReferenceNames(kind, bonus[1].trim(), locale).map(name => `${name} ${bonus[2]}`);
  return [];
}
