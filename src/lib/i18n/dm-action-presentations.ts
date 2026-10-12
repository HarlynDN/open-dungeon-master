import { DM_ACTION_METADATA } from "./dm-action-metadata.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

const entries = new Map<string, typeof DM_ACTION_METADATA[number]>(DM_ACTION_METADATA.map(entry => [entry.name, entry]));
export function dmActionSource(entry: { name: string; label: string; summary: string }) {
  const source = entries.get(entry.name);
  return source?.label === entry.label && source.summary === entry.summary ? source : null;
}
// Only identical repository captions translate; model reasons remain narrative
// in the campaign locale, and canonical action/argument IDs never change.
export function dmActionView<T extends { name: string; label: string; summary: string }>(entry: T, locale: AppLocale): T {
  const source = dmActionSource(entry);
  if (locale === "en" || !source) return entry;
  const t = createTranslator(locale);
  return { ...entry, label: t(source.labelKey), summary: t(source.summaryKey) };
}
