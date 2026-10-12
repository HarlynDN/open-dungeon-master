import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { BOOK_TEXT_KEYS, BOOK_HEADERS } from "./book-ui-metadata.ts";
import { entryNotice } from "./entry-ui-presentations.ts";
export const BOOK_NOTICES = { emptyWorkshops: "Make a workshop first: your homebrew lives in your workshops.", workshops: "Could not load your workshops.", network: "Could not reach the server." } as const;
type FrameKey = Extract<MessageKey, `bookUi.frame.${string}`> extends `bookUi.frame.${infer Key}` ? Key : never;
export function bookFrame(key: FrameKey, values: Record<string, string | number>, locale: AppLocale): string { return createTranslator(locale)(`bookUi.frame.${key}` as MessageKey, values); }
export function bookText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const key = Object.hasOwn(BOOK_TEXT_KEYS, raw) ? BOOK_TEXT_KEYS[raw as keyof typeof BOOK_TEXT_KEYS] : undefined;
  return key ? createTranslator(locale)(key) : raw;
}
// Navigation metadata only. Body Markdown, entry names, source/legal URLs and
// cross-reference IDs remain the original SRD; overrides keep their own words.
export function bookHeader(kind: "chapter" | "part", id: string, field: "title" | "blurb", source: string, locale: AppLocale): string {
  const lookup = `${kind}:${id}`;
  const row = Object.hasOwn(BOOK_HEADERS, lookup) ? BOOK_HEADERS[lookup as keyof typeof BOOK_HEADERS] : undefined;
  return locale !== "en" && row?.[field] === source ? createTranslator(locale)(`bookUi.${kind}.${id}.${field}` as MessageKey) : source;
}
export function bookNotice(raw: string, locale: AppLocale): string { return entryNotice(bookText(raw, locale), locale); }
export function bookCrosswalk(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const item = /^Workshop: Items; the engine runs its ([\s\S]+)$/.exec(raw);
  if (item) {
    const fields = item[1].split(", ");
    // Only the native mechanics fields participate; a custom explanation is
    // not rewritten merely because its opening words match.
    if (fields.every(field => ["weapon", "armor", "weapon riders", "armor riders", "charges", "checks", "spells", "effects"].includes(field))) return bookFrame("itemEngine", { fields: fields.map(field => bookText(field, locale)).join(bookFrame("list", {}, locale)) }, locale);
  }
  return bookText(raw, locale);
}

export function bookChapterTitle(source: string, locale: AppLocale): string {
  const entry = Object.entries(BOOK_HEADERS).find(([id, row]) => id.startsWith("chapter:") && row.title === source);
  return entry ? bookHeader("chapter", entry[0].slice("chapter:".length), "title", source, locale) : source;
}
