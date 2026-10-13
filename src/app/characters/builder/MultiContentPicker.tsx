"use client";

import { nativeItemHelp } from "@/lib/i18n/magic-item-material-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { pickerName } from "@/lib/i18n/gear-ui-presentations";
import { spellSummaryView } from "@/lib/i18n/spell-ui-presentations";
import { Check, Loader2, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { InfoButton } from "@/components/ui/InfoDialog";
import { describeContentEntry, spellSummary } from "@/lib/help";
import { useContentSearch, type PickerEntry } from "./useContentSearch";

// `level` rides along for spells, so a cantrip picked here lands in the
// cantrip list rather than among the levelled spells.
export type MultiPick = { name: string; slug?: string; level?: number };

// Searchable multi-select against /api/content/[kind]: result rows toggle
// into a pending chip strip and one "Add" commits them all, so nobody has
// to know exact names in advance. A free-text row keeps homebrew possible
// and is the only path when the content pack is not installed. The results
// render inline (not absolutely positioned) so the picker works inside
// scrolling dialogs.
export default function MultiContentPicker({
  kind,
  extraParams = {},
  placeholder,
  selectedNames = [],
  onAdd,
  renderMeta,
}: {
  kind: "spells" | "items" | "feats";
  extraParams?: Record<string, string>;
  placeholder: string;
  // Names already on the sheet; shown checked and not re-addable.
  selectedNames?: string[];
  onAdd: (entries: MultiPick[]) => void;
  renderMeta?: (entry: PickerEntry) => string;
}) {
  const { locale, t } = useLocale();
  const { query, setQuery, results, setResults, open, setOpen, loading, unavailable, failed, retry, unadmitted } =
    useContentSearch(kind, extraParams);
  const [pending, setPending] = useState<Array<MultiPick & { source?: PickerEntry["source"] }>>([]);
  const container = useRef<HTMLDivElement>(null);

  // The browse list opens on focus, so clicking elsewhere must collapse it
  // (pending chips stay put until added or removed).
  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (container.current && !container.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [setOpen]);

  const selectedLower = new Set(selectedNames.map((name) => name.trim().toLowerCase()));
  const pendingLower = new Set(pending.map((pick) => pick.name.trim().toLowerCase()));
  const trimmedQuery = query.trim();
  const pendingName = (pick: MultiPick & { source?: PickerEntry["source"] }) => pickerName(kind, { name: pick.name, source: pick.source ?? "homebrew" }, locale);

  function togglePending(entry: PickerEntry) {
    const key = entry.name.trim().toLowerCase();
    setPending((picks) =>
      picks.some((pick) => pick.name.trim().toLowerCase() === key)
        ? picks.filter((pick) => pick.name.trim().toLowerCase() !== key)
        : [...picks, { name: entry.name, slug: entry.slug, level: entry.level, source: entry.source }],
    );
  }

  function addCustom() {
    const key = trimmedQuery.toLowerCase();
    if (!key || selectedLower.has(key) || pendingLower.has(key)) {
      return;
    }
    setPending((picks) => [...picks, { name: trimmedQuery, source: "homebrew" }]);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  function commit() {
    if (!pending.length) {
      return;
    }
    // Display provenance is internal; callbacks retain the original shape.
    onAdd(pending.map(pick => {
      const value = { ...pick };
      delete value.source;
      return value;
    }));
    setPending([]);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={container}>
      <div className="relative">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-200 outline-none focus:border-amber-300"
        />
        {loading ? (
          <Loader2 className="absolute right-3 top-2.5 size-4 animate-spin text-stone-500" />
        ) : null}
      </div>
      {open && (results.length || trimmedQuery || unavailable) ? (
        <ul className="mt-1 max-h-48 overflow-y-auto rounded-lg panel panel-smoke">
          {results.map((entry) => {
            const displayName = pickerName(kind, entry, locale);
            const key = entry.name.trim().toLowerCase();
            const alreadyOn = selectedLower.has(key);
            const picked = pendingLower.has(key);
            return (
              <li
                key={entry.slug}
                className={cn(
                  "flex items-center gap-1 pr-2 hover:bg-stone-800",
                  alreadyOn && "opacity-50",
                )}
              >
                <button
                  type="button"
                  disabled={alreadyOn}
                  onClick={() => togglePending(entry)}
                  className="flex grow items-center justify-between gap-2 px-3 py-1.5 text-left text-sm"
                >
                  <span className="flex items-center gap-1.5">
                    {picked || alreadyOn ? (
                      <Check className="size-3.5 shrink-0 text-amber-200" />
                    ) : (
                      <Plus className="size-3.5 shrink-0 text-stone-600" />
                    )}
                    <span className={cn(entry.source === "homebrew" && "text-amber-300")}>
                      {displayName}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-stone-500">
                    {alreadyOn
                      ? t("gearUi.multi.already")
                      : entry.source === "homebrew"
                        ? t("gearUi.multi.homebrew")
                        : (renderMeta?.(entry) ?? "")}
                  </span>
                </button>
                <InfoButton
                  label={displayName}
                  meta={kind === "spells" ? (locale === "en" ? spellSummary(entry.data) : spellSummaryView(entry.data, locale, entry.source === "homebrew")) : undefined}
                  text={kind === "items" ? nativeItemHelp(entry, describeContentEntry(entry.data), locale) : describeContentEntry(entry.data)}
                  reference={entry.source === "homebrew" ? undefined : { kind, slug: entry.slug, name: entry.name }}
                />
              </li>
            );
          })}
          {trimmedQuery &&
          !selectedLower.has(trimmedQuery.toLowerCase()) &&
          !results.some((entry) => entry.name.trim().toLowerCase() === trimmedQuery.toLowerCase() || pickerName(kind, entry, locale).trim().toLowerCase() === trimmedQuery.toLowerCase()) ? (
            <li className="border-t border-stone-800">
              <button
                type="button"
                onClick={addCustom}
                className="flex w-full items-center gap-1.5 px-3 py-1.5 text-left text-sm text-amber-300 hover:bg-stone-800"
              >
                <Plus className="size-3.5 shrink-0" /> {t("gearUi.multi.custom", { name: trimmedQuery })}
              </button>
            </li>
          ) : null}
          {unavailable ? (
            <li className="px-3 py-1.5 text-xs text-stone-500">
              {t(failed ? "pickerFlow.loadFailed" : "gearUi.multi.packMissing")}
              {failed ? <button type="button" onClick={retry} className="ml-2 underline">{t("pickerFlow.retry")}</button> : null}
            </li>
          ) : null}
          {unadmitted.length ? (
            <li className="px-3 py-1.5 text-[11px] text-stone-500">
              {t(unadmitted.length === 1 ? "gearUi.multi.unadmittedOne" : "gearUi.multi.unadmittedMany", { names: unadmitted.join(", ") })}
            </li>
          ) : null}
        </ul>
      ) : null}
      {pending.length ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {pending.map((pick) => (
            <span
              key={pick.name}
              className="flex items-center gap-1 rounded-full bg-stone-800 px-2 py-0.5 text-xs text-stone-200"
            >
              {pendingName(pick)}
              <button
                type="button"
                onClick={() =>
                  setPending((picks) => picks.filter((entry) => entry.name !== pick.name))
                }
                aria-label={t("gearUi.multi.remove", { name: pendingName(pick) })}
                className="text-stone-500 hover:text-red-400"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={commit}
            className="rounded-full bg-amber-300 px-2.5 py-0.5 text-xs font-medium text-stone-950 hover:bg-amber-200"
          >
            {t("gearUi.multi.add", { count: pending.length })}
          </button>
        </div>
      ) : null}
    </div>
  );
}
