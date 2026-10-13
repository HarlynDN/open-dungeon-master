// The rulebook on the server: the SRD 5.1 pages (srd-5.1.json, built by
// scripts/import-srd-rulebook.mjs), the contents, one page with its
// neighbours, and search. The book is read once per process and never
// changes while it runs; the search index is built on the first search.
import type { AppLocale } from "../i18n/locales.ts";
import { rulebookSearchQueries } from "./search-locales.ts";
import { rulebookPageDisplay } from "./localized-pages.ts";
import { bookHeader } from "../i18n/book-ui-presentations.ts";
import data from "./srd-5.1.json";
import { buildIndex, localizedSearchHit, queryTerms, searchRulebook, type RulebookIndex } from "./search";
import type {
  ContentsChapter,
  QuickLink,
  RulebookContents,
  RulebookData,
  RulebookPage,
  RulebookPageResponse,
  SearchResponse,
} from "./types";

const book = data as RulebookData;

// The rules a table reaches for in the middle of a session. Every anchor is
// asserted to exist by scripts/test-rulebook.mjs.
export const QUICK_LINKS: QuickLink[] = [
  { label: "Conditions", page: "conditions" },
  { label: "Actions in combat", page: "combat", at: "actions-in-combat" },
  { label: "Opportunity attacks", page: "combat", at: "opportunity-attacks" },
  { label: "Grappling", page: "combat", at: "grappling" },
  { label: "Cover", page: "combat", at: "cover" },
  { label: "Death saves", page: "combat", at: "death-saving-throws" },
  { label: "Advantage", page: "using-ability-scores", at: "advantage-and-disadvantage" },
  { label: "Hiding", page: "using-ability-scores", at: "hiding" },
  { label: "Concentration", page: "spellcasting", at: "concentration" },
  { label: "Resting", page: "adventuring", at: "resting" },
  { label: "Exhaustion", page: "conditions", at: "exhaustion" },
  { label: "Travel pace", page: "adventuring", at: "travel-pace" },
];

const byId = new Map<string, { page: RulebookPage; index: number }>(
  book.pages.map((page, index) => [page.id, { page, index }]),
);
const chapterById = new Map(book.chapters.map((chapter) => [chapter.id, chapter]));

let contents: RulebookContents | null = null;
let index: RulebookIndex | null = null;
const localizedIndexes = new Map<AppLocale, RulebookIndex>();

export function rulebookContents(locale: AppLocale = "en"): RulebookContents {
  if (locale !== "en") {
    const original = rulebookContents();
    return { ...original, chapters: original.chapters.map(chapter => ({ ...chapter,
      entries: chapter.entries.map(entry => {
        const page = byId.get(entry.id)!.page;
        const display = rulebookPageDisplay(page, locale);
        return { ...entry, display: { locale, title: display.title, meta: display.meta } };
      }),
    })) };
  }
  if (contents) return contents;
  const chapters: ContentsChapter[] = book.chapters.map((chapter) => ({
    id: chapter.id,
    numeral: chapter.numeral,
    title: chapter.title,
    blurb: chapter.blurb,
    entries: chapter.pages.map((id) => {
      const { page, index: at } = byId.get(id)!;
      return {
        id: page.id,
        title: page.title,
        kind: page.kind,
        ...(page.meta ? { meta: page.meta } : {}),
        ...(page.group ? { group: page.group } : {}),
        ...(page.family ? { family: page.family } : {}),
        folio: at + 1,
      };
    }),
  }));
  contents = { source: book.source, parts: book.parts, chapters, quick: QUICK_LINKS, pageCount: book.pages.length };
  return contents;
}

export function rulebookPage(id: string, locale?: AppLocale): RulebookPageResponse | null {
  const found = byId.get(id);
  if (!found) return null;
  const { chapter: chapterId, ...page } = found.page;
  const chapter = chapterById.get(chapterId)!;
  const link = (at: number) => {
    const neighbour = book.pages[at];
    return neighbour ? { id: neighbour.id, title: neighbour.title } : null;
  };
  return {
    ...(locale ? { display: {
      ...rulebookPageDisplay(found.page, locale),
      prevTitle: book.pages[found.index - 1] ? rulebookPageDisplay(book.pages[found.index - 1], locale).title : undefined,
      nextTitle: book.pages[found.index + 1] ? rulebookPageDisplay(book.pages[found.index + 1], locale).title : undefined,
    } } : {}),
    page: { ...page, folio: found.index + 1 },
    chapter: { id: chapter.id, numeral: chapter.numeral, title: chapter.title },
    prev: link(found.index - 1),
    next: link(found.index + 1),
  };
}

export function rulebookSearch(query: string, limit?: number, locale: AppLocale = "en"): SearchResponse {
  index ??= buildIndex(book.pages, book.chapters);
  if (locale === "en") return { hits: searchRulebook(index, query, limit), terms: queryTerms(query) };
  let localized = localizedIndexes.get(locale);
  if (!localized) {
    const anchors = new Map<string, string[]>();
    const pages = book.pages.map(page => {
      const display = rulebookPageDisplay(page, locale);
      if (display.anchors) anchors.set(page.id, display.anchors);
      return display.translated ? { ...page, title: display.title, meta: display.meta, md: display.md } : page;
    });
    localized = buildIndex(pages, book.chapters.map(chapter => ({ ...chapter,
      title: bookHeader("chapter", chapter.id, "title", chapter.title, locale) })), anchors);
    localizedIndexes.set(locale, localized);
  }
  const queries = [...new Set([query, ...rulebookSearchQueries(query, locale)])];
  const terms = queryTerms(query);
  // Alternatives are separate searches: concatenating unrelated aliases would
  // require every name in one passage and erase the native exact-title boost.
  const byPassage = new Map<string, SearchResponse["hits"][number]>();
  for (const candidate of queries) {
    for (const hit of [...searchRulebook(localized, candidate, limit), ...searchRulebook(index, candidate, limit)]) {
      const key = `${hit.page}:${hit.at ?? ""}`;
      if ((byPassage.get(key)?.score ?? -Infinity) < hit.score) byPassage.set(key, localizedSearchHit(localized, hit, terms));
    }
  }
  const requestedTitle = query.trim().normalize("NFKC").toLowerCase();
  const exactTitle = (hit: SearchResponse["hits"][number]) => [hit.title, byId.get(hit.page)?.page.title]
    .some(title => title?.normalize("NFKC").toLowerCase() === requestedTitle);
  // Scores from aliases with different word counts are not directly comparable.
  // A literal native/canonical title takes priority over related expanded names.
  return { hits: [...byPassage.values()].sort((a, b) => Number(exactTitle(b)) - Number(exactTitle(a))
    || b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit ?? 40), terms };
}

export function rulebookPages(): RulebookPage[] {
  return book.pages;
}
