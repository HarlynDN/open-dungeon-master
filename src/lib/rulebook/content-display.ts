// Server projection. Original catalog data remains available to engine callers.
import type { AppLocale } from "../i18n/locales.ts";
import { nativeSpellHelp } from "../i18n/spell-help-presentations.ts";
import { nativeItemHelp } from "../i18n/magic-item-material-presentations.ts";
import { describeContentEntry } from "../help/index.ts";
import { normalizeRulesText } from "../help/rules-text.ts";
import { rulebookPageIdFor } from "./catalog-rows.ts";
import { rulebookPageDisplay } from "./localized-pages.ts";
import book from "./srd-5.1.json";
import type { RulebookPage } from "./types.ts";

export function contentDisplay<T extends { name: string; source: string; documentSlug?: string; data: Record<string, unknown> }>(kind: string, entry: T, locale: AppLocale): T & { display?: { locale: AppLocale; source: string; text: string } } {
  if (locale === "en" || entry.source === "homebrew" || entry.documentSlug !== "wotc-srd") return entry;
  const source = describeContentEntry(entry.data);
  if (!source) return entry;
  let text = source;
  if (kind === "spells") text = nativeSpellHelp(entry, source, locale) ?? source;
  else if (kind === "items") text = nativeItemHelp(entry, source, locale) ?? source;
  else if (kind === "monsters") {
    const id = rulebookPageIdFor("monster", entry.name);
    const page = book.pages.find(page => page.id === id) as RulebookPage | undefined;
    if (page && normalizeRulesText(page.md) === source) {
      const display = rulebookPageDisplay(page, locale);
      if (display.translated) text = display.md;
    }
  }
  return text === source ? entry : { ...entry, display: { locale, source, text } };
}
