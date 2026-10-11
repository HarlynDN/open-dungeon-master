import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";
import type { FactCategory } from "../dm/fact-logic.ts";
import type { BlockKind } from "../dm/context-budget.ts";

const FACT_KEYS = {
  location: "memoryUi.fact.category.location", npc: "memoryUi.fact.category.npc",
  promise: "memoryUi.fact.category.promise", world: "memoryUi.fact.category.world",
  party: "memoryUi.fact.category.party", lore: "memoryUi.fact.category.lore",
} as const satisfies Record<FactCategory, MessageKey>;
const CONTEXT_KEYS = {
  safety: "memoryUi.context.kind.safety", contract: "memoryUi.context.kind.contract",
  rules: "memoryUi.context.kind.rules", sky: "memoryUi.context.kind.sky",
  state: "memoryUi.context.kind.state", factions: "memoryUi.context.kind.factions",
  quests: "memoryUi.context.kind.quests", shop: "memoryUi.context.kind.shop",
  retrieval: "memoryUi.context.kind.retrieval", chapters: "memoryUi.context.kind.chapters",
  history: "memoryUi.context.kind.history", tools: "memoryUi.context.kind.tools",
} as const satisfies Record<BlockKind, MessageKey>;
export const factCategoryLabel = (value: FactCategory, locale: AppLocale) => createTranslator(locale)(FACT_KEYS[value]);
export const contextKindLabel = (value: BlockKind, locale: AppLocale) => createTranslator(locale)(CONTEXT_KEYS[value]);

// Native trace frames are displayed through the catalog; diagnostics, IDs and
// authored text stay untouched in storage and on the model-facing protocol.
export function contextReasonText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  if (source === "always included") return t("memoryUi.context.reason.always");
  if (source === "fits") return t("memoryUi.context.reason.fits");
  const kind = /^over the ([a-z]+) budget \(([0-9]+) > ([0-9]+) tokens left\)$/.exec(source);
  if (kind && Object.hasOwn(CONTEXT_KEYS, kind[1])) {
    return t("memoryUi.context.reason.kind", { kind: contextKindLabel(kind[1] as BlockKind, locale), tokens: kind[2], left: kind[3] });
  }
  const total = /^over the total context budget \(([0-9]+) > ([0-9]+) tokens\)$/.exec(source);
  return total ? t("memoryUi.context.reason.total", { tokens: total[1], limit: total[2] }) : source;
}

export function memoryText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  const prefix = "The pins did not load. ";
  if (source.startsWith(prefix)) return t("memoryUi.error.pinLoad", { reason: memoryText(source.slice(prefix.length), locale) });
  const row = Object.entries(catalogFor("en", "memoryUi.error.")).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  return row ? t(row[0] as MessageKey) : controlText(source, locale);
}
