import { TERMINOLOGY, type TerminologyEntry } from "./terminology.ts";
import type { AppLocale } from "./locales.ts";

export type TerminologyIssue = { source: string; keys: string[]; detail: string };

// Exact, context-bound policies are errors. Equal English with different
// translations is only a warning: Light, Shield and Goblin have distinct senses.
export function auditTerminology(
  source: Readonly<Record<string, string>>,
  translated: Readonly<Record<string, string>>,
  locale: AppLocale,
  entries: readonly TerminologyEntry[] = TERMINOLOGY[locale],
) {
  const errors: TerminologyIssue[] = [];
  const warnings: TerminologyIssue[] = [];
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) errors.push({ source: entry.source, keys: [], detail: `Duplicate terminology ID: ${entry.id}` });
    ids.add(entry.id);
    const keys = entry.matchSource ? [...new Set([...(entry.keys ?? []), ...Object.keys(source).filter(key => source[key] === entry.source)])] : entry.keys ?? [];
    for (const key of keys) {
      if (source[key] !== entry.source || translated[key] !== entry.preferred) {
        errors.push({ source: entry.source, keys: [key], detail: `Expected ${entry.preferred} in ${entry.id}; found ${translated[key] ?? "missing"}` });
      }
      for (const forbidden of entry.forbidden ?? []) {
        if (translated[key]?.includes(forbidden)) errors.push({ source: entry.source, keys: [key], detail: `Forbidden in this context: ${forbidden}` });
      }
    }
  }
  const groups = new Map<string, string[]>();
  for (const [key, text] of Object.entries(source)) {
    if (text.length > 45 || /[{}\n]/u.test(text)) continue;
    const normalized = text.trim().toLowerCase();
    groups.set(normalized, [...(groups.get(normalized) ?? []), key]);
  }
  for (const [text, keys] of groups) {
    if (new Set(keys.map(key => translated[key])).size > 1) warnings.push({ source: text, keys,
      detail: keys.map(key => `${key}=${translated[key]}`).join("; ") });
  }
  return { errors, warnings };
}
