// Server-only projection: book prose never enters the reader's client bundle.
import "../i18n/messages.ts";
import type { AppLocale } from "../i18n/locales.ts";
import { registeredMessageTemplate } from "../i18n/translator.ts";
import { referenceDisplayName } from "../i18n/references.ts";
import { nativeSpellHelp } from "../i18n/spell-help-presentations.ts";
import { describeContentEntry } from "../help/index.ts";
import { spellFieldsFromPage } from "./catalog-rows.ts";
import { LOCALIZED_SPELL_PAGES } from "./localized-page-metadata.ts";
import type { RulebookPage, RulebookPageResponse } from "./types.ts";

export function rulebookPageDisplay(page: RulebookPageResponse["page"] | RulebookPage, locale: AppLocale): NonNullable<RulebookPageResponse["display"]> {
  const original = { locale, translated: false, title: page.title, meta: page.meta, md: page.md };
  if (locale === "en" || page.kind !== "spell") return original;
  const row = LOCALIZED_SPELL_PAGES.find(row => row.id === page.id && row.name === page.title);
  if (!row) return original;
  const header = registeredMessageTemplate("en", row.headerKey);
  const translatedHeader = registeredMessageTemplate(locale, row.headerKey);
  const meta = registeredMessageTemplate(locale, row.metaKey);
  if (!header || !translatedHeader || !meta || !page.md.trim().startsWith(`${header}\n\n`)
    || page.meta !== registeredMessageTemplate("en", row.metaKey)) return original;
  const body = describeContentEntry(spellFieldsFromPage(page), { includeHigherLevels: true });
  const translatedBody = nativeSpellHelp({ name: page.title, source: "srd", documentSlug: "wotc-srd" }, body, locale);
  if (!translatedBody || translatedBody === body) return original;
  return { locale, translated: true, title: referenceDisplayName("spell", page.title, locale), meta,
    md: `${translatedHeader}\n\n${translatedBody}` };
}
