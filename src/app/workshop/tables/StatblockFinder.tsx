"use client";

import { referenceDisplayName } from "@/lib/i18n/references";
import { monsterUiFrame } from "@/lib/i18n/monster-ui-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { consoleUiText, consoleFrame, consoleNotice, CONSOLE_NOTICES } from "@/lib/i18n/dm-console-presentations";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { MonsterTile, ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";

// Monster lookup: the campaign's own genre catalog, then the exact numbers
// start_encounter would spawn. A CR with no match falls back to the DMG's
// by-CR baseline, which is arithmetic rather than invention.
//
// Moved here unchanged from DmTablesPanel so the workshop can fold it into
// a card of its own. The DM console still gets the open section it always
// had; the workshop passes collapsible and gets a header that opens it.

export const inputClass = ui.input;

type StatblockMatch = { slug: string; name: string; cr: number; type: string; blurb: string; ownedName?: boolean };

export function StatblockFinder({
  campaignId,
  collapsible = false,
}: {
  campaignId: string;
  collapsible?: boolean;
}) {
  const { locale } = useLocale();
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<StatblockMatch[]>([]);
  // The table's setting, for the boss plate on high-rating matches.
  const [genre, setGenre] = useState("");
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null);
  const [busy, setBusy] = useState(false);
  // Closed by default in the workshop: the tables are what the DM came for,
  // and a lookup that is not in use should not push the rows down.
  const [open, setOpen] = useState(false);

  async function search() {
    setBusy(true);
    setError("");
    setDetail(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/assist/statblock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, ...(locale === "en" ? {} : { locale }) }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { setError(data.error ?? CONSOLE_NOTICES.lookup); return; }
      setMatches(data.matches ?? []);
      setGenre(typeof data.genre === "string" ? data.genre : "");
    } catch {
      setError(CONSOLE_NOTICES.network);
    } finally {
      setBusy(false);
    }
  }

  async function openStatblock(slug: string) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/assist/statblock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: slug }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { setError(data.error ?? CONSOLE_NOTICES.lookup); return; }
      setDetail(data.statblock ?? null);
    } catch {
      setError(CONSOLE_NOTICES.network);
    } finally {
      setBusy(false);
    }
  }

  const stats = detail?.stats as
    | { ac: number; maxHp: number; cr: number; speed: string; attacks: Array<{ name: string; toHit: number; damage: string }> }
    | undefined;

  const controls = (
    <>
      <div className="flex gap-1.5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value.slice(0, 80))}
          placeholder={consoleUiText("wolf, or leave empty for what fits the party", locale)}
          className={inputClass}
        />
        <button
          type="button"
          onClick={search}
          disabled={busy}
          className={cn(ui.btnSecondary, "shrink-0")}
        >
          {consoleUiText("Search", locale)}</button>
      </div>
      {error ? <p role="alert" className="text-xs text-red-300">{consoleNotice(error, locale)}</p> : null}
      {matches.length ? (
        <ul className="stagger mt-1.5 space-y-1">
          {matches.map((match) => (
            <li key={match.slug}>
              <button
                type="button"
                onClick={() => openStatblock(match.slug)}
                className={cn(ui.btnSmall, "w-full text-left")}
              >
                <MonsterTile
                  type={match.type}
                  cr={match.cr}
                  genre={genre}
                  seed={match.slug}
                  size="size-8"
                />
                <span className="text-xs text-stone-200">
                  {match.ownedName ? referenceDisplayName("monster", match.name, locale) : match.name}
                  <span className="ml-1.5 text-stone-500">{monsterUiFrame("cr", { cr: match.cr }, locale)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {stats ? (
        <div className="panel reveal mt-2 rounded-lg px-3 py-2 text-xs text-stone-300">
          <p className="text-stone-200">
            {detail?.baselineName ? consoleFrame("baselineName", { cr: stats.cr }, locale) : detail?.ownedName ? referenceDisplayName("monster", String(detail.name ?? ""), locale) : String(detail?.name ?? "")}
            {detail?.synthesized ? (
              <span className="ml-1.5 font-display text-[10px] tracking-wide text-amber-300/80">
                {consoleUiText("DMG baseline", locale)}</span>
            ) : null}
          </p>
          <p className="text-stone-500">
            {consoleFrame("statline", { ac: stats.ac, hp: stats.maxHp, cr: stats.cr, speed: stats.speed }, locale)}
          </p>
          {stats.attacks.map((attack) => (
            <p key={attack.name} className="text-stone-400">
              {consoleFrame("attackline", { name: attack.name, hit: attack.toHit, damage: attack.damage }, locale)}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );

  if (collapsible) {
    return (
      <section className={`${ui.card} p-3`} data-tour="tables-lookup">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="flex min-h-10 w-full items-center gap-2 text-left font-display text-sm tracking-wide text-amber-100"
        >
          <GameIcon icon={{ kind: "glyph", key: "system-bestiary" }} size="size-7" />
          {consoleUiText("Look up a monster", locale)}{open ? (
            <ChevronDown className="ml-auto size-4 text-stone-500" />
          ) : (
            <ChevronRight className="ml-auto size-4 text-stone-500" />
          )}
        </button>
        {open ? <div className="reveal mt-3">{controls}</div> : null}
      </section>
    );
  }

  return (
    <section className="panel rounded-xl p-3">
      <SectionHead title={consoleUiText("Look up a monster", locale)} glyph="system-bestiary" />
      {controls}
    </section>
  );
}
