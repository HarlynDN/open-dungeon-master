"use client";

import { referenceRowDescription } from "@/lib/i18n/reference-ui-presentations";

import { Loader2, Plus } from "lucide-react";
import { spellSummaryView } from "@/lib/i18n/spell-ui-presentations";
import { nativeItemHelp } from "@/lib/i18n/magic-item-material-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { nativeFeatHelp } from "@/lib/i18n/feature-material-presentations";
import { pickerName } from "@/lib/i18n/gear-ui-presentations";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { InfoButton } from "@/components/ui/InfoDialog";
import { describeContentEntry } from "@/lib/help";
import { useContentSearch, type PickerEntry } from "./useContentSearch";

export type { PickerEntry } from "./useContentSearch";

// Debounced search-and-add against /api/content/[kind]. Used for spells,
// items, and feats in the character builder.
//
// The results render inline rather than absolutely positioned. Every caller
// now sits inside a pane that scrolls on its own (a wizard step, a dialog),
// and an absolute list is clipped by that pane's overflow: the rows arrive,
// draw below the fold and never appear, which reads as "no results" for a
// search that in fact found ninety. MultiContentPicker learned this first.
export default function ContentPicker({
  kind,
  extraParams = {},
  placeholder,
  onPick,
  renderMeta,
}: {
  kind: "spells" | "items" | "feats";
  extraParams?: Record<string, string>;
  placeholder: string;
  onPick: (entry: PickerEntry) => void;
  renderMeta?: (entry: PickerEntry) => string;
}) {
  const { locale, t } = useLocale();
  const { query, setQuery, results, setResults, open, setOpen, loading, unavailable, failed, retry, unadmitted } =
    useContentSearch(kind, extraParams);
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

  return (
    <div ref={container}>
      <div className="relative">
        <input
          value={query}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            if (!next.trim()) {
              setResults([]);
              setOpen(false);
            }
          }}
          onFocus={() => results.length && setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-200 outline-none focus:border-amber-300"
        />
        {loading ? (
          <Loader2 className="absolute right-3 top-2.5 size-4 animate-spin text-stone-500" />
        ) : null}
      </div>
      {unavailable ? (
        <p className="mt-1 rounded-lg border border-amber-900/50 bg-amber-950/20 px-3 py-2 text-xs text-amber-200/80">
          {t(failed ? "pickerFlow.loadFailed" : "gearUi.packMissing")}
          {failed ? <button type="button" onClick={retry} className="ml-2 underline">{t("pickerFlow.retry")}</button> : null}
        </p>
      ) : open && !results.length && query.trim() && !loading ? (
        <p className="mt-1 rounded-lg border border-stone-800 bg-stone-950/60 px-3 py-2 text-xs text-stone-500">
          {t("gearUi.noMatch", { query: query.trim() })}
        </p>
      ) : null}
      {unadmitted.length ? (
        <p className="mt-1 text-[11px] text-stone-500">
          {t(unadmitted.length === 1 ? "gearUi.unadmittedOne" : "gearUi.unadmittedMany", { names: unadmitted.join(", ") })}
        </p>
      ) : null}
      {open && results.length ? (
        <ul className="mt-1 max-h-64 w-full overflow-y-auto panel panel-smoke rounded-lg">
          {results.map((entry) => (
            <li key={entry.slug} className="flex items-center gap-1 pr-2 hover:bg-stone-800">
              <button
                type="button"
                onClick={() => {
                  onPick(entry);
                  setQuery("");
                  setOpen(false);
                }}
                className="flex grow items-center justify-between gap-2 px-3 py-2 text-left"
              >
                <span className="flex items-center gap-1.5">
                  <Plus className="size-3.5 shrink-0 text-amber-200" />
                  <span
                    className={cn(entry.source === "homebrew" && "text-amber-300")}
                  >
                    {pickerName(kind, entry, locale)}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-stone-500">
                  {entry.source === "homebrew"
                    ? t("gearUi.homebrew")
                    : (renderMeta?.(entry) ?? "")}
                </span>
              </button>
              {/* The row already carries the full entry, so reading a spell
                  before adding it costs no extra request. */}
              <InfoButton
                label={pickerName(kind, entry, locale)}
                meta={kind === "spells" ? spellSummaryView(entry.data, locale, entry.source === "homebrew") : undefined}
                text={kind === "feats" && entry.source !== "homebrew" ? nativeFeatHelp(entry.name, describeContentEntry(entry.data), locale) : kind === "items" ? nativeItemHelp(entry, describeContentEntry(entry.data), locale) : referenceRowDescription(kind, entry, locale)}
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
