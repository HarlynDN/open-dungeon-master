"use client";

import { nativeItemHelp } from "@/lib/i18n/magic-item-material-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { catalogFor } from "@/lib/i18n/translator";
import { pickerName, gearRarity, gearKind } from "@/lib/i18n/gear-ui-presentations";
import { nativeFeatHelp } from "@/lib/i18n/feature-material-presentations";
import { useEffect, useRef } from "react";
import { Loader2, Search } from "lucide-react";
import { InfoButton } from "@/components/ui/InfoDialog";
import { cn } from "@/lib/cn";
import { describeContentEntry, spellSummary } from "@/lib/help";
import { useContentSearch, type PickerEntry } from "@/app/characters/builder/useContentSearch";

// Search-and-pick over the content pack (/api/content/<kind>): spells,
// items, monsters, conditions. The list opens on focus with a browsable
// default and narrows as the person types; a pick hands the entry back and
// clears the box. Renders nothing when the pack is not installed, so the
// typed field beside it is all a bare server shows.
//
// Every row carries a ⓘ, reading the description off the row it already has,
// so a DM never has to add a spell to a stat block to find out what it does.
// The list is in the flow rather than absolutely positioned: these fields sit
// inside editor sheets that scroll, and an absolute list opening near the
// bottom of one is clipped away entirely.

const input =
  "rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200 focus:border-amber-500/50 focus:outline-none";

export function ContentPick({
  kind,
  placeholder,
  label,
  onPick,
  className,
  extraParams,
}: {
  kind: "spells" | "items" | "monsters" | "conditions" | "feats";
  placeholder: string;
  label: string;
  onPick: (entry: PickerEntry) => void;
  className?: string;
  extraParams?: Record<string, string>;
}) {
  const { locale, t } = useLocale();
  // Shared deferred editors without content resources keep their source names.
  const hasNames = locale !== "en" && Object.keys(catalogFor(locale, "equipmentName.")).length > 0;
  const displayName = (entry: PickerEntry) => hasNames && ["items", "spells", "feats"].includes(kind) ? pickerName(kind, entry, locale) : entry.name;
  const { query, setQuery, results, open, setOpen, loading, unavailable } = useContentSearch(
    kind,
    { ...extraParams, locale },
  );
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (container.current && !container.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [setOpen]);

  if (unavailable) return null;

  return (
    <div ref={container} className={className}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-stone-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder={placeholder}
          aria-label={label}
          className={cn(input, "w-full pl-7")}
        />
        {loading ? (
          <Loader2 className="absolute right-2 top-1/2 size-3.5 -translate-y-1/2 animate-spin text-stone-500" />
        ) : null}
      </div>
      {open && !results.length && query.trim() && !loading ? (
        <p className="reveal mt-1 rounded-lg border border-stone-800 bg-stone-950/60 px-3 py-1.5 text-[11px] text-stone-500">
          {t("catalogPick.noMatch", { query: query.trim() })}
        </p>
      ) : null}
      {open && results.length ? (
        <ul className="reveal panel panel-smoke mt-1 max-h-56 w-full overflow-y-auto rounded-lg">
          {results.slice(0, 40).map((entry) => (
            <li key={entry.slug} className="flex items-center gap-1 pr-2 hover:bg-stone-800">
              <button
                type="button"
                onClick={() => {
                  onPick(entry);
                  setQuery("");
                  setOpen(false);
                }}
                className="flex grow items-center justify-between gap-2 px-3 py-1.5 text-left text-sm"
              >
                <span className={cn(entry.source === "homebrew" && "text-amber-300")}>{displayName(entry)}</span>
                <span className="text-[11px] text-stone-500">
                  {entry.level !== undefined ? t("catalogPick.level", { level: entry.level }) : (entry.rarity ? hasNames ? gearRarity(entry.rarity, locale) : entry.rarity : entry.kind ? hasNames ? gearKind(entry.kind, locale) : entry.kind : "")}
                </span>
              </button>
              <InfoButton
                label={displayName(entry)}
                meta={kind === "spells" ? spellSummary(entry.data) : undefined}
                text={kind === "feats" && hasNames && entry.source !== "homebrew" ? nativeFeatHelp(entry.name, describeContentEntry(entry.data), locale) : kind === "items" ? nativeItemHelp(entry, describeContentEntry(entry.data), locale) : describeContentEntry(entry.data)}
                reference={
                  entry.source === "homebrew" ? undefined : { kind, slug: entry.slug, name: entry.name }
                }
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
