// Server-only projection: book prose never enters the reader's client bundle.
import "../i18n/messages.ts";
import { createHash } from "node:crypto";
import nativeChinesePages from "./locales/zh-CN.json";
import { bookAnchorIds, parseBook } from "./markdown.ts";
import type { AppLocale } from "../i18n/locales.ts";
import { registeredMessageTemplate } from "../i18n/translator.ts";
import { referenceDisplayName } from "../i18n/references.ts";
import { nativeSpellHelp } from "../i18n/spell-help-presentations.ts";
import { nativeItemHelp } from "../i18n/magic-item-material-presentations.ts";
import { MAGIC_ITEM_MATERIAL } from "../i18n/magic-item-material-metadata.ts";
import { MAGIC_ITEM_NAMES } from "../i18n/magic-item-name-messages.ts";
import { describeContentEntry } from "../help/index.ts";
import { spellFieldsFromPage } from "./catalog-rows.ts";
import { LOCALIZED_SPELL_PAGES } from "./localized-page-metadata.ts";
import type { RulebookPage, RulebookPageResponse } from "./types.ts";

type NativePage = RulebookPageResponse["page"] | RulebookPage;
const nativePages: Partial<Record<AppLocale, Record<string, { sourceHash: string; title: string; md: string; meta?: string }>>> = {
  "zh-CN": nativeChinesePages,
};

export function nativeBookSourceHash(page: NativePage): string {
  return createHash("sha256").update(JSON.stringify([page.id, page.title, page.kind, page.meta ?? "", page.md])).digest("hex");
}

export function rulebookPageDisplay(page: RulebookPageResponse["page"] | RulebookPage, locale: AppLocale): NonNullable<RulebookPageResponse["display"]> {
  const original = { locale, translated: false, title: page.title, meta: page.meta, md: page.md };
  if (locale === "en") return original;
  const native = nativePages[locale]?.[page.id];
  if (native && native.sourceHash === nativeBookSourceHash(page)) {
    const anchors = bookAnchorIds(parseBook(page.md));
    if (anchors.length !== bookAnchorIds(parseBook(native.md)).length) return original;
    return { locale, translated: true, title: native.title, meta: native.meta, md: native.md, anchors };
  }
  if (page.kind === "item") {
    const row = MAGIC_ITEM_MATERIAL.find(row => row.id === page.id && row.name === page.title);
    const nameRow = MAGIC_ITEM_NAMES.find(row => row.id === page.id && row.name === page.title);
    if (!row || !nameRow || page.meta !== registeredMessageTemplate("en", row.metaKey)) return original;
    const blocks = page.md.trim().split(/\n\n+/);
    if (blocks[0] !== `*${page.meta}*`) return original;
    const body = blocks.slice(1).join("\n\n");
    const translatedBody = nativeItemHelp({ name: page.title, source: "srd", documentSlug: "wotc-srd" }, body, locale);
    const meta = registeredMessageTemplate(locale, row.metaKey);
    const title = registeredMessageTemplate(locale, nameRow.key);
    if (!translatedBody || translatedBody === body || !meta || !title) return original;
    return { locale, translated: true, title, meta, md: `*${meta}*\n\n${translatedBody}` };
  }
  if (page.kind !== "spell") return original;
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
