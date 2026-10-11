import type { AppLocale } from "./locales.ts";
import { ZH_CN_GLOSSARY } from "./glossary.zh-CN.ts";

export type TerminologyEntry = {
  id: string;
  source: string;
  preferred: string;
  scope: "rule" | "language" | "monster" | "ui";
  keys?: readonly string[];
  aliases?: readonly string[];
  forbidden?: readonly string[];
  matchSource?: boolean;
  note?: string;
};

// New locales must register their policy explicitly. Tool identifiers and
// stored history never come from this player-facing terminology registry.
export const TERMINOLOGY: Record<AppLocale, readonly TerminologyEntry[]> = {
  en: [],
  "zh-CN": ZH_CN_GLOSSARY,
};

export function terminologyAliases(scope: TerminologyEntry["scope"], locale: AppLocale): Record<string, readonly string[]> {
  return Object.fromEntries(TERMINOLOGY[locale].filter(entry => entry.scope === scope)
    .map(entry => [entry.source.toLowerCase(), [entry.preferred, ...(entry.aliases ?? [])]]));
}
