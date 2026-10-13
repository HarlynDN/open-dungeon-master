import type { AppLocale } from "./locales.ts";
import { MAGIC_ITEM_MATERIAL } from "./magic-item-material-metadata.ts";
import { createTranslator, registeredMessageTemplate } from "./translator.ts";
import { normalizeRulesText } from "../help/rules-text.ts";

export type ItemMaterialIdentity = { name?: string; source?: string; documentSlug?: string };

// Match the complete source, never a first sentence or a familiar item name
// alone. Workshop/other-book overrides keep their authored text.
export function nativeItemHelp(identity: ItemMaterialIdentity, source: string | null, locale: AppLocale, options: { includeMetadata?: boolean } = {}): string | null {
  if (locale === "en" || !source || identity.source === "homebrew"
    || (identity.documentSlug && identity.documentSlug !== "wotc-srd")) return source;
  const row = MAGIC_ITEM_MATERIAL.find(row => row.name === identity.name);
  if (!row) return source;
  const original = registeredMessageTemplate("en", row.key);
  if (!original || registeredMessageTemplate(locale, row.key) === undefined
    || normalizeRulesText(source) !== normalizeRulesText(original)) return source;
  const t = createTranslator(locale);
  if (!options.includeMetadata) return t(row.key);
  // Detailed cards retain the source's special attunement restrictions. Picker
  // previews still begin with the effect, not a repeated rarity/type heading.
  if (registeredMessageTemplate(locale, row.metaKey) === undefined) return source;
  return `*${t(row.metaKey)}*\n\n${t(row.key)}`;
}
