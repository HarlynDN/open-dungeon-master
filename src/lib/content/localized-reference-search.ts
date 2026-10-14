import { compareNames } from "../language/text-logic";
import type { AppLocale } from "../i18n/locales.ts";
import { referenceSearchNames } from "../i18n/reference-search.ts";
import type { ReferenceKind } from "../i18n/reference-names.ts";

// Opt-in alias search over the same authorized rows, with a single stable
// pack offset. Homebrew accompanies the first page and never costs pack slots.
export function localizedReferenceSearch<T extends { slug: string; name: string; source: string }>(input: {
  q: string; kind: ReferenceKind; locale: AppLocale; offset: number; limit: number;
  search: (q: string, offset: number, limit: number) => T[];
}): T[] {
  const aliases = referenceSearchNames(input.kind, input.q, input.locale);
  if (!aliases.length) return input.search(input.q, input.offset, input.limit);
  const rows = new Map<string, T>();
  for (const q of [...new Set([input.q, ...aliases])]) {
    for (let offset = 0; offset < 1600; offset += 200) {
      const page = input.search(q, offset, 200);
      for (const row of page) if (!rows.has(row.slug)) rows.set(row.slug, row);
      if (page.filter(row => row.source !== "homebrew").length < 200) break;
    }
  }
  const result = [...rows.values()];
  const homebrew = input.offset === 0 ? result.filter(row => row.source === "homebrew") : [];
  const pack = result.filter(row => row.source !== "homebrew").sort((a, b) => compareNames(a.name, b.name) || compareNames(a.slug, b.slug));
  return [...homebrew, ...pack.slice(input.offset, input.offset + input.limit)];
}
