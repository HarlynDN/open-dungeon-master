// Searching the rulebook. Every page is cut at its headings into passages
// (the same cut markdown.ts makes, so a hit's anchor is one the reader drew),
// and a query matches a passage when every word in it appears in the page
// title, the passage heading or the passage text. The last word may be half
// typed. Titles and headings outrank body text, so "grapple" lands on
// Grappling in Combat before the monsters that grapple.
//
// Words are compared by a light stem ("grappling", "grappled" and "grapple"
// are one word) that the reader also uses to highlight what matched.
import { blockText, parseBook, preserveBookAnchors, stripInline, type BookBlock } from "./markdown";
import type { RulebookKind, RulebookPage, SearchHit } from "./types";

const STOP = new Set(["a", "an", "and", "the", "of", "to", "in", "on", "or", "for", "is", "it", "at", "by", "be", "as", "with", "do", "does", "how", "what", "when", "can", "i", "you", "my"]);
const CJK_STOP = new Set(["的", "了", "在", "是", "和", "与", "及", "如何", "什么", "怎么"]);
const segmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter(undefined, { granularity: "word" }) : null;

export function stem(word: string): string {
  let w = word.toLowerCase().replace(/['’]s$/, "").replace(/['’]/g, "");
  if (w.length > 4 && w.endsWith("ies")) w = `${w.slice(0, -3)}y`;
  else if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  else if (w.length > 4 && /(ss|x|ch|sh)es$/.test(w)) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us")) w = w.slice(0, -1);
  if (w.length > 4 && w.endsWith("e")) w = w.slice(0, -1);
  // "grappl" from grapple and grappling, "attack" from attacks and attacked.
  return w;
}

export function words(text: string, mode: "index" | "query" = "index"): string[] {
  const tokens = text.toLowerCase().match(/[a-z0-9]+(?:['’][a-z]+)?|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu) ?? [];
  return tokens.flatMap(token => {
    const chars = [...token];
    if (/^[a-z0-9]/.test(token) || chars.length === 1) return [token];
    const grams = chars.slice(0, -1).map((char, index) => char + chars[index + 1]);
    const segmented = segmenter ? [...segmenter.segment(token)].filter(part => part.isWordLike).map(part => part.segment) : [];
    // Queries use words; crossing a word boundary must not add a mandatory
    // bigram (法术专注 must match 法术…专注). Indexes keep bigrams for names
    // and partial typing, even when ICU's dictionary splits them differently.
    return mode === "query" && segmented.length ? segmented : [...new Set([...segmented, ...grams])];
  });
}

// The query as the stems it will be matched by, stop words dropped unless
// they are all there is.
export function queryTerms(query: string): string[] {
  const all = words(query, "query");
  const kept = all.filter((word) => !STOP.has(word) && !CJK_STOP.has(word));
  return [...new Set((kept.length ? kept : all).map(stem))];
}

type Passage = {
  page: RulebookPage;
  heading?: string;
  at?: string;
  text: string;
  lower: string;
  counts: Map<string, number>;
  headingStems: Set<string>;
};

type PageEntry = {
  page: RulebookPage;
  titleStems: Set<string>;
  titleLower: string;
  passages: Passage[];
};

export type RulebookIndex = {
  pages: PageEntry[];
  chapters: Map<string, { numeral: string; title: string }>;
};

function countStems(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of words(text)) {
    const key = stem(word);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function passage(page: RulebookPage, heading: string | undefined, at: string | undefined, parts: string[]): Passage {
  const text = parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  return {
    page,
    heading,
    at,
    text,
    lower: text.toLowerCase(),
    counts: countStems(`${heading ?? ""} ${text}`),
    headingStems: new Set(words(heading ?? "").map(stem)),
  };
}

// A page's passages: its opening text, then one per heading (and one per
// titled sidebar, which is where the SRD keeps rules like Combat Step by Step).
function passagesOf(page: RulebookPage, blocks: BookBlock[]): Passage[] {
  const out: Passage[] = [];
  let heading: string | undefined;
  let at: string | undefined;
  let parts: string[] = [];
  const close = () => {
    if (heading || parts.length) out.push(passage(page, heading, at, parts));
  };
  for (const block of blocks) {
    if (block.kind === "heading") {
      close();
      heading = stripInline(block.text);
      at = block.anchor;
      parts = [];
      continue;
    }
    if (block.kind === "sidebar" && block.title && block.anchor) {
      out.push(passage(page, stripInline(block.title), block.anchor, block.blocks.map(blockText)));
      continue;
    }
    parts.push(blockText(block));
  }
  close();
  return out;
}

export function buildIndex(
  pages: RulebookPage[],
  chapters: Array<{ id: string; numeral: string; title: string }>,
  anchors?: ReadonlyMap<string, readonly string[]>,
): RulebookIndex {
  return {
    pages: pages.map((page) => ({
      page,
      titleStems: new Set(words(page.title).map(stem)),
      titleLower: page.title.toLowerCase(),
      passages: passagesOf(page, anchors?.has(page.id)
        ? preserveBookAnchors(parseBook(page.md), anchors.get(page.id)!) ?? parseBook(page.md) : parseBook(page.md)),
    })),
    chapters: new Map(chapters.map((chapter) => [chapter.id, { numeral: chapter.numeral, title: chapter.title }])),
  };
}

// Rules text outranks an entry that merely mentions a word, all else equal.
const KIND_WEIGHT: Record<RulebookKind, number> = { rules: 14, class: 8, race: 8, spell: 4, item: 2, monster: 0 };

function hasTerm(stems: Map<string, number> | Set<string>, term: string, prefix: boolean): boolean {
  if (stems.has(term)) return true;
  if (!prefix || (term.length < 2 && !/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(term))) return false;
  for (const key of stems.keys()) if (key.startsWith(term)) return true;
  return false;
}

function countTerm(counts: Map<string, number>, term: string, prefix: boolean): number {
  const exact = counts.get(term) ?? 0;
  if (exact || !prefix) return exact;
  let total = 0;
  for (const [key, count] of counts) if (key.startsWith(term)) total += count;
  return total;
}

// About 200 characters around the first matching word, cut at word edges.
export function snippetFor(text: string, terms: string[], width = 200): string {
  let first = -1;
  const pattern = /[a-z0-9]+(?:['’][a-z]+)?/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const key = stem(match[0]);
    if (terms.some((term) => key === term || key.startsWith(term))) {
      first = match.index;
      break;
    }
  }
  const cjk = terms.filter(term => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(term));
  for (const term of cjk) {
    const at = text.toLowerCase().indexOf(term);
    if (at >= 0 && (first < 0 || at < first)) first = at;
  }
  if (text.length <= width) return text;
  if (first < 0) first = 0;
  let start = Math.max(0, first - Math.floor(width / 3));
  if (start > 0 && !cjk.length) {
    const space = text.indexOf(" ", start);
    start = space === -1 ? start : space + 1;
  }
  let end = Math.min(text.length, start + width);
  if (end < text.length && !cjk.length) {
    const space = text.lastIndexOf(" ", end);
    end = space > start ? space : end;
  }
  return `${start > 0 ? "… " : ""}${text.slice(start, end).trim()}${end < text.length ? " …" : ""}`;
}

// A canonical/alias search can find an English title while the reader displays
// Chinese. Use the same canonical passage identity to return its visible prose.
export function localizedSearchHit(index: RulebookIndex, hit: SearchHit, terms: string[]): SearchHit {
  const entry = index.pages.find(entry => entry.page.id === hit.page);
  if (!entry) return hit;
  const passage = entry.passages.find(passage => passage.at === hit.at);
  return { ...hit, title: entry.page.title, chapter: index.chapters.get(entry.page.chapter)?.title ?? hit.chapter,
    heading: passage?.heading ?? hit.heading, snippet: passage ? snippetFor(passage.text, terms) : hit.snippet };
}

// Literal CJK terms may overlap (生命, 命值). Merge intervals so the visible
// phrase is highlighted once; React still escapes every returned text segment.
export function cjkHighlightRuns(text: string, terms: string[]): Array<{ text: string; marked: boolean }> {
  const ranges: Array<[number, number]> = [];
  for (const match of text.matchAll(/[a-z0-9]+(?:['’][a-z]+)?/gi)) {
    const key = stem(match[0]);
    if (terms.some(term => key === term || key.startsWith(term))) ranges.push([match.index, match.index + match[0].length]);
  }
  for (const term of terms.filter(term => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(term))) {
    let at = text.indexOf(term);
    while (at >= 0) { ranges.push([at, at + term.length]); at = text.indexOf(term, at + 1); }
  }
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const previous = merged.at(-1);
    if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
    else merged.push([...range]);
  }
  const runs: Array<{ text: string; marked: boolean }> = [];
  let at = 0;
  for (const [start, end] of merged) {
    if (start > at) runs.push({ text: text.slice(at, start), marked: false });
    runs.push({ text: text.slice(start, end), marked: true }); at = end;
  }
  if (at < text.length) runs.push({ text: text.slice(at), marked: false });
  return runs;
}

export function searchRulebook(index: RulebookIndex, query: string, limit = 40): SearchHit[] {
  const terms = queryTerms(query);
  if (!terms.length) return [];
  const phrase = query.trim().toLowerCase();
  // The last word may still be being typed.
  const typed = /[a-z0-9\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]$/iu.test(query.trim());
  const isPrefix = (position: number) => typed && position === terms.length - 1;
  const hits: SearchHit[] = [];

  for (const entry of index.pages) {
    const { page } = entry;
    const chapter = index.chapters.get(page.chapter);
    const pageHits: SearchHit[] = [];
    const titleAll = terms.every((term, position) => hasTerm(entry.titleStems, term, isPrefix(position)));
    entry.passages.forEach((item, passageIndex) => {
      const matches = terms.every(
        (term, position) =>
          hasTerm(entry.titleStems, term, isPrefix(position)) || hasTerm(item.counts, term, isPrefix(position)),
      );
      if (!matches) return;
      let score = KIND_WEIGHT[page.kind];
      const opening = passageIndex === 0 && !item.heading;
      if (opening || (passageIndex === 0 && titleAll)) {
        if (entry.titleLower === phrase) score += 1000;
        else if (titleAll) score += 220;
      }
      terms.forEach((term, position) => {
        if (hasTerm(entry.titleStems, term, isPrefix(position))) score += opening ? 40 : 6;
        if (hasTerm(item.headingStems, term, isPrefix(position))) score += 30;
        score += Math.min(countTerm(item.counts, term, isPrefix(position)), 6) * 2;
      });
      const headingLower = item.heading?.toLowerCase();
      if (headingLower === phrase) score += 600;
      else if (item.heading && terms.every((term, position) => hasTerm(item.headingStems, term, isPrefix(position)))) score += 160;
      if (phrase.length > 3 && item.lower.includes(phrase)) score += 40;
      pageHits.push({
        page: page.id,
        title: page.title,
        kind: page.kind,
        chapter: chapter?.title ?? "",
        numeral: chapter?.numeral ?? "",
        heading: item.heading,
        at: item.at,
        snippet: snippetFor(item.text, terms),
        score,
      });
    });
    pageHits.sort((a, b) => b.score - a.score);
    hits.push(...pageHits.slice(0, 3));
  }
  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return hits.slice(0, limit);
}
