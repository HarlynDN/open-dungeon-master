"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { rosterMonsterName, monsterSearchReady, encounterPrepError, type RosterMonster } from "@/lib/i18n/encounter-prep-presentations";
import { readLoad } from "@/lib/load-state";

import { Loader2, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { MonsterTile } from "@/lib/ui";
import { crLabel } from "@/lib/bestiary/derive-cr";
import { addToRoster, formatRoster, parseRoster } from "@/lib/dm/encounter-template-logic";

const input =
  "rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200 focus:border-amber-500/50 focus:outline-none";

const chip = "rounded-full border px-2 py-0.5 text-[10px] transition-colors duration-150";

// Filling a roster by looking rather than by remembering.
//
// The prepared-encounter box takes the same shorthand the console's "Start a
// fight" takes, which is right, and which also means a DM has to already
// know that a bullywug exists and how it is spelled. This searches what this
// world actually holds (the content pack and every monster this DM has
// built) and appends the pick to the roster the person is writing, leaving
// every line of it typeable.
export function MonsterRosterPicker({
  campaignId,
  roster,
  onChange,
}: {
  campaignId: string;
  roster: string;
  onChange: (roster: string) => void;
}) {
  const { locale, t } = useLocale();
  const [loadError, setLoadError] = useState("");
  const [searched, setSearched] = useState(false);
  const [retries, setRetries] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    RosterMonster[]
  >([]);
  // The table's setting, for the boss plate on high-rating results.
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounced so a search fires on the pause, not the keystroke. Everything
  // that touches state happens in the timer or in a .then, never in the
  // effect body, so this reads to React as subscribing to an external system
  // rather than as a render that sets state.
  useEffect(() => {
    const term = query.trim();
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!monsterSearchReady(term)) {
        setResults([]);
        setLoading(false);
        setLoadError("");
        setSearched(false);
        return;
      }
      setLoading(true);
      setLoadError("");
      const params = new URLSearchParams({ q: term });
      if (locale !== "en") { params.set("localized", "1"); params.set("locale", locale); }
      readLoad<{
        found: RosterMonster[];
        monsters: Array<{ draft: { name: string; stats: { cr: number; type?: string } }; slug: string }>;
        genre?: string;
      }>(fetch(`/api/campaigns/${campaignId}/dm/bestiary?${params}`), "The monster search")
        .then(outcome => {
          if (cancelled) return;
          setLoading(false);
          setSearched(true);
          if (!outcome.payload) {
            setResults([]);
            setLoadError(outcome.error);
            return;
          }
          const payload = outcome.payload;
          setGenre(payload.genre ?? "");
          // Authored monsters keep their names and retain first-pick priority.
          const mine = payload.monsters
            .filter(monster => monster.draft.name.toLowerCase().includes(term.toLowerCase()))
            .map(monster => ({ slug: monster.slug, name: monster.draft.name,
              cr: monster.draft.stats.cr, type: monster.draft.stats.type ?? "", source: "homebrew" }));
          setResults([...mine, ...payload.found].slice(0, 24));
        });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [campaignId, query, locale, retries]);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1.5 size-3.5 text-stone-600" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("encounterPrep.searchHint")}
          aria-label={t("encounterPrep.searchLabel")}
          className={cn(input, "w-full pl-7")}
        />
        {loading ? (
          <Loader2 className="absolute right-2 top-1.5 size-3.5 animate-spin text-stone-600" />
        ) : null}
      </div>
      {loadError ? (
        <div role="alert" className="flex items-center gap-2 text-xs text-red-300">
          <span>{encounterPrepError(loadError, locale)}</span>
          <button type="button" onClick={() => setRetries(current => current + 1)} className={chip}>{t("encounterPrep.retry")}</button>
        </div>
      ) : searched && !loading && !results.length ? (
        <p className="text-xs text-stone-500">{t("encounterPrep.searchEmpty")}</p>
      ) : null}
      {results.length ? (
        <div className="reveal flex flex-wrap gap-1">
          {results.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => onChange(formatRoster(addToRoster(parseRoster(roster), entry.name)))}
              className={cn(chip, "border-stone-700 text-stone-400 hover:text-amber-100")}
            >
              <Plus className="mr-0.5 inline size-2.5" />
              <MonsterTile
                type={entry.type}
                cr={entry.cr}
                genre={genre}
                seed={entry.slug}
                art={entry.art}
                size="size-5"
                className="mr-1 inline-flex align-middle"
              />
              {rosterMonsterName(entry, locale)}
              <span className="ml-1 text-stone-600">{t("encounterPrep.cr", { cr: crLabel(entry.cr) })}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

