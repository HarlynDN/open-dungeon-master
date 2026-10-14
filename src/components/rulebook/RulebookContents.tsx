"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { bookText, bookFrame, bookHeader, bookChapterTitle } from "@/lib/i18n/book-ui-presentations";

import "@/app/styles/rulebook.css";
import { Bookmark, ChevronRight, Search, X } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { cjkHighlightRuns } from "@/lib/rulebook/highlight";
import type { ContentsChapter, ContentsEntry, RulebookContents as Contents, RulebookPart, SearchHit } from "@/lib/rulebook/types";
import { Digits } from "./RulebookPage";

// The left-hand page: the book's name, a search line, the rules a table
// reaches for mid-session, the reader's bookmarks, and the contents, book by
// book (players, Dungeon Master, monsters) and chapter by chapter, each opening onto its pages with dotted leaders and
// folios. While something is typed in the search line, what it found takes
// the contents' place.

export type OpenFromContents = (id: string, at?: string, terms?: string[]) => void;

function Highlighted({ text, words }: { text: string; words: string[] }) {
  if (words.some(term => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(term))) {
    return <>{cjkHighlightRuns(text, words).map((run, index) => run.marked
      ? <mark key={index} className="rb-mark">{run.text}</mark> : run.text)}</>;
  }
  const parts = text.split(/([\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*)/u);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0 || !part) return part;
        return words.includes(part.toLowerCase().replace(/’/g, "'")) ? (
          <mark key={index} className="rb-mark">
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
}

// "3rd-level evocation" reads "evocation" beside a spell's name; a monster
// shows its size and type.
function aside(entry: ContentsEntry): string | null {
  if (!entry.meta) return null;
  if (entry.kind === "spell") return entry.meta.replace(/^\d\w*-level\s+/i, "").replace(/\s*cantrip$/i, "");
  if (entry.kind === "monster") return entry.meta.split(",")[0];
  return null;
}

function EntryRow({ entry, current, onOpen }: { entry: ContentsEntry; current: boolean; onOpen: (id: string) => void }) {
  const { locale } = useLocale();
  const display = entry.display?.locale === locale ? entry.display : undefined;
  const note = aside(display ? { ...entry, ...display } : entry);
  return (
    <button type="button" className="rb-entry" data-on={current || undefined} aria-current={current ? "page" : undefined} onClick={() => onOpen(entry.id)}>
      <span className="rb-entry-title">
        <Digits text={display?.title ?? entry.title} />
        {note ? <span className="rb-entry-note">{note}</span> : null}
      </span>
      <span className="rb-leader" aria-hidden="true" />
      <span className="rb-entry-folio">{entry.folio}</span>
    </button>
  );
}

function ChapterBody({ chapter, current, onOpen }: { chapter: ContentsChapter; current: string | null; onOpen: (id: string) => void }) {
  const { locale } = useLocale();
  // Long chapters (spells by level, monsters and items by letter) are cut
  // into groups; the short ones list their pages straight.
  const groups = useMemo(() => {
    const out: Array<{ name: string | null; entries: ContentsEntry[] }> = [];
    for (const entry of chapter.entries) {
      const name = entry.group ?? null;
      const last = out[out.length - 1];
      if (last && last.name === name) last.entries.push(entry);
      else out.push({ name, entries: [entry] });
    }
    return out;
  }, [chapter.entries]);
  return (
    <div className="rb-chapter-pages">
      <p className="rb-chapter-blurb">{bookHeader("chapter", chapter.id, "blurb", chapter.blurb, locale)}</p>
      {groups.map((group, index) => (
        <div key={`${group.name ?? "intro"}-${index}`} className="rb-group">
          {group.name ? (
            <p className="rb-group-name">
              <Digits text={bookText(group.name, locale)} />
            </p>
          ) : null}
          <div className={cn("rb-group-entries", group.entries.length > 12 && "rb-group-wide")}>
            {group.entries.map((entry) => (
              <EntryRow key={entry.id} entry={entry} current={entry.id === current} onOpen={onOpen} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RulebookContents({
  contents,
  current,
  bookmarks,
  onOpen,
  searchRef,
}: {
  contents: Contents | null;
  current: string | null;
  bookmarks: string[];
  onOpen: OpenFromContents;
  searchRef: RefObject<HTMLInputElement | null>;
}) {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ query: string; hits: SearchHit[] } | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const currentChapter = useMemo(
    () => contents?.chapters.find((chapter) => chapter.entries.some((entry) => entry.id === current))?.id ?? null,
    [contents, current],
  );
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  // Chapters that have been opened keep their pages mounted, so closing one
  // animates instead of emptying at once.
  const [mounted, setMounted] = useState<Set<string>>(() => new Set());
  const [seenChapter, setSeenChapter] = useState<string | null>(null);
  if (currentChapter !== seenChapter) {
    setSeenChapter(currentChapter);
    if (currentChapter && !open.has(currentChapter)) {
      setOpen(new Set(open).add(currentChapter));
      setMounted(new Set(mounted).add(currentChapter));
    }
  }

  const asked = useRef("");
  useEffect(() => {
    const q = query.trim();
    asked.current = q;
    if (!q) return;
    let live = true;
    const timer = setTimeout(async () => {
      setSearchFailed(false);
      setSearching(true);
      try {
        const response = await fetch(`/api/rulebook/search?q=${encodeURIComponent(q)}${locale === "en" ? "" : `&locale=${encodeURIComponent(locale)}`}`);
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        if (live && asked.current === q) setResult({ query: q, hits: data.hits ?? [] });
      } catch {
        if (live && asked.current === q) { setResult(null); setSearchFailed(true); }
      } finally {
        if (live && asked.current === q) setSearching(false);
      }
    }, 180);
    return () => { live = false; clearTimeout(timer); };
  }, [query, locale, retry]);

  const entries = useMemo(() => {
    const map = new Map<string, ContentsEntry>();
    for (const chapter of contents?.chapters ?? []) for (const entry of chapter.entries) map.set(entry.id, entry);
    return map;
  }, [contents]);

  function toggle(id: string) {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
    if (!mounted.has(id)) setMounted(new Set(mounted).add(id));
  }

  // The contents in its three books, then whatever no book claims (the
  // appendices). Every heading and chapter takes the next step of the ink-in.
  const sections = useMemo(() => {
    const out: Array<{ part: RulebookPart | null; delay: number; chapters: Array<{ chapter: ContentsChapter; delay: number }> }> = [];
    const partOf = new Map<string, RulebookPart>();
    for (const part of contents?.parts ?? []) for (const id of part.chapters) partOf.set(id, part);
    let step = 0;
    for (const chapter of contents?.chapters ?? []) {
      const part = partOf.get(chapter.id) ?? null;
      let last = out[out.length - 1];
      if (!last || last.part !== part) {
        last = { part, delay: part ? step++ : step, chapters: [] };
        out.push(last);
      }
      last.chapters.push({ chapter, delay: step++ });
    }
    return out;
  }, [contents]);

  const searchingNow = Boolean(query.trim());
  const shown = searchingNow && result?.query === query.trim() ? result : null;
  const marks = useMemo(() => bookmarks.map((id) => entries.get(id)).filter((entry): entry is ContentsEntry => Boolean(entry)), [bookmarks, entries]);

  return (
    <div className="rb-contents" data-no-motion>
      <header className="rb-contents-head">
        <p className="rb-running">Open Dungeon Master</p>
        <h2 className="rb-book-title">{bookText("The Rulebook", locale)}</h2>
        <p className="rb-book-sub">{bookText("Fifth Edition · System Reference Document 5.1", locale)}</p>
        <p className="rb-book-sub">{bookText("Read in English or Simplified Chinese. Search rule text, names, and terms.", locale)}</p>
      </header>

      <label className="rb-search">
        <Search className="rb-search-icon" aria-hidden="true" />
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (isComposingInput(event)) return;
            if (event.key === "Escape" && query) {
              event.stopPropagation();
              setQuery("");
            }
            if (event.key === "Enter" && shown?.hits[0]) {
              const hit = shown.hits[0];
              onOpen(hit.page, hit.at, hit.words);
            }
          }}
          placeholder={bookText("Seek a rule, a spell, a monster", locale)}
          aria-label={bookText("Search the rulebook", locale)}
          spellCheck={false}
          enterKeyHint="search"
        />
        {searching ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/assets/ui/quill.webp" alt="" className="rb-quill" />
        ) : query ? (
          <button type="button" className="rb-search-clear" aria-label={bookText("Clear the search", locale)} onClick={() => setQuery("")}>
            <X className="size-3.5" />
          </button>
        ) : null}
        <span className="rb-search-ink" aria-hidden="true" />
      </label>

      {searchingNow ? (
        <section className="rb-results" aria-live="polite">
          {searchFailed ? <div role="alert" className="rb-trouble">
            <p>{bookText("Search failed. Please try again.", locale)}</p>
            <button type="button" className="rb-chip" onClick={() => setRetry(value => value + 1)}>{bookText("Try again", locale)}</button>
          </div> : shown ? (
            <>
              <p className="rb-results-count">
                {shown.hits.length
                  ? bookFrame(shown.hits.length === 40 ? "foundFirst" : shown.hits.length === 1 ? "foundOne" : "foundMany", { count: shown.hits.length }, locale)
                  : bookText("Nothing in the book matches that.", locale)}
              </p>
              <ol className="rb-hits" key={shown.query}>
                {shown.hits.map((hit, index) => (
                  <li key={`${hit.page}-${hit.at ?? ""}`} style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}>
                    <button type="button" className="rb-hit" data-on={hit.page === current || undefined} onClick={() => onOpen(hit.page, hit.at, hit.words)}>
                      <span className="rb-hit-where">
                        {hit.numeral} &middot; <Digits text={bookChapterTitle(hit.chapter, locale)} />
                      </span>
                      <span className="rb-hit-title">
                        <Digits text={hit.title} />
                        {hit.heading && hit.heading !== hit.title ? (
                          <>
                            <span className="rb-hit-sep" aria-hidden="true">
                              &rsaquo;
                            </span>
                            <Digits text={hit.heading} />
                          </>
                        ) : null}
                      </span>
                      <span className="rb-hit-snippet">
                        <Highlighted text={hit.snippet} words={hit.words} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="rb-results-count">{bookText("Turning the pages…", locale)}</p>
          )}
        </section>
      ) : (
        <div className="rb-contents-body">
          {contents ? (
            <>
              <section className="rb-quick" aria-label={bookText("At the table", locale)}>
                <p className="rb-section-label">{bookText("At the table", locale)}</p>
                <div className="rb-chips">
                  {contents.quick.map((link) => (
                    <button key={bookText(link.label, locale)} type="button" className="rb-chip motion-press" onClick={() => onOpen(link.page, link.at)}>
                      {bookText(link.label, locale)}
                    </button>
                  ))}
                </div>
              </section>

              {marks.length ? (
                <section className="rb-marks" aria-label={bookText("Bookmarks", locale)}>
                  <p className="rb-section-label">
                    <Bookmark className="size-3.5" aria-hidden="true" />  {bookText("Bookmarks", locale)} </p>
                  {marks.map((entry) => (
                    <EntryRow key={entry.id} entry={entry} current={entry.id === current} onOpen={(id) => onOpen(id)} />
                  ))}
                </section>
              ) : null}

              <nav aria-label={bookText("Contents", locale)}>
                <p className="rb-section-label">{bookText("Contents", locale)}</p>
                {sections.map((section) => (
                  <section key={section.part?.id ?? "appendices"} className="rb-part" aria-label={section.part ? bookHeader("part", section.part.id, "title", section.part.title, locale) : undefined}>
                    {section.part ? (
                      <header className="rb-part-head" style={{ animationDelay: `${120 + section.delay * 30}ms` }}>
                        <p className="rb-part-numeral">{bookFrame("book", { numeral: section.part.numeral }, locale)}</p>
                        <h3 className="rb-part-title">{bookHeader("part", section.part.id, "title", section.part.title, locale)}</h3>
                        <p className="rb-part-blurb">{bookHeader("part", section.part.id, "blurb", section.part.blurb, locale)}</p>
                      </header>
                    ) : null}
                    <ol className="rb-chapters">
                      {section.chapters.map(({ chapter, delay }) => {
                        const isOpen = open.has(chapter.id);
                        return (
                          <li key={chapter.id} className="rb-chapter" data-open={isOpen || undefined} style={{ animationDelay: `${120 + delay * 30}ms` }}>
                            <button type="button" className="rb-chapter-row" aria-expanded={isOpen} onClick={() => toggle(chapter.id)}>
                              <span className="rb-numeral">{chapter.numeral}</span>
                              <span className="rb-chapter-title">
                                <Digits text={bookHeader("chapter", chapter.id, "title", chapter.title, locale)} />
                              </span>
                              <span className="rb-leader" aria-hidden="true" />
                              <span className="rb-entry-folio">{chapter.entries[0]?.folio}</span>
                              <ChevronRight className="rb-chevron" aria-hidden="true" />
                            </button>
                            <div className="rb-chapter-body">
                              <div className="rb-chapter-inner">
                                {mounted.has(chapter.id) ? <ChapterBody chapter={chapter} current={current} onOpen={(id) => onOpen(id)} /> : null}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </nav>

              <p className="rb-legal">
                 {bookText("This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC, licensed under", locale)}{" "}
                <a href={contents.source.licenseUrl} target="_blank" rel="noreferrer">
                  CC-BY-4.0
                </a>
                .{" "}
                <button type="button" className="rb-xref" onClick={() => onOpen("legal-information")}>
                   {bookText("Legal information", locale)} </button>
              </p>
            </>
          ) : (
            <p className="rb-results-count">{bookText("Opening the book…", locale)}</p>
          )}
        </div>
      )}
    </div>
  );
}
