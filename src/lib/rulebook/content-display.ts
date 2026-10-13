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
  const source = describeContentEntry(entry.data, { includeHigherLevels: kind === "spells", includeMonsterActions: kind === "monsters" });
  if (!source) return entry;
  let text = source;
  if (kind === "spells") text = nativeSpellHelp(entry, source, locale) ?? source;
  else if (kind === "items") text = nativeItemHelp(entry, source, locale) ?? source;
  else if (kind === "monsters") {
    const id = rulebookPageIdFor("monster", entry.name);
    const page = book.pages.find(page => page.id === id) as RulebookPage | undefined;
    if (page) {
      const display = rulebookPageDisplay(page, locale);
      if (display.translated) {
        if (normalizeRulesText(page.md) === source) text = display.md;
        else if (!describeContentEntry(entry.data)) {
          // Pair complete source paragraphs only when the reviewed translation
          // preserves their boundaries. Formatting/dice spacing is immaterial;
          // changed wording or numbers must retain the original paragraph.
          const en = page.md.split(/\n\n+/);
          const zh = display.md.split(/\n\n+/);
          const key = (value: string) => normalizeRulesText(value).replace(/\*/g, "").replace(/\bft\./g, "feet").replace(/\s+/g, "");
          if (en.length === zh.length) {
            const pairs = new Map<string, string>();
            if (locale === "zh-CN") pairs.set(key("###### Traits"), "###### 特性");
            const ambiguous = new Set<string>();
            en.forEach((block, index) => {
              const sourceKey = key(block);
              if (pairs.has(sourceKey) && pairs.get(sourceKey) !== zh[index]) ambiguous.add(sourceKey);
              pairs.set(sourceKey, zh[index]);
            });
            text = source.split(/\n\n+/).map(block => ambiguous.has(key(block)) ? block : pairs.get(key(block)) ?? block).join("\n\n");
          }
        }
      }
    }
  }
  return text === source ? entry : { ...entry, display: { locale, source, text } };
}
