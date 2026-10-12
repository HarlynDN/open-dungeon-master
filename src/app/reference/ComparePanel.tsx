"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { comparisonName, compareCellView, metricText, metricNotice, METRIC_NOTICES } from "@/lib/i18n/reference-metrics-presentations";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { EmptyState } from "@/components/EmptyState";
import { D20Spinner } from "@/components/ui/D20Spinner";
import { Switch } from "@/components/ui/Switch";
import type { CompareKind, CompareTable } from "@/lib/reference/compare";

// Several monsters or spells side by side, with the rows that differ marked.
//
// The picking happens in the browse tab, which already knows how to search;
// this panel only renders what was picked. "Only what differs" is on by
// default, because a comparison of two SRD spells is mostly rows that agree
// and those rows are not why anyone opened this.

export type CompareSelection = {
  kind: CompareKind;
  entries: Array<{ slug: string; name: string; source?: string; documentSlug?: string }>;
};

export function ComparePanel({
  selection,
  onRemove,
  onClear,
}: {
  selection: CompareSelection;
  onRemove: (slug: string) => void;
  onClear: () => void;
}) {
  const { t, locale } = useLocale();
  const [table, setTable] = useState<CompareTable | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlyDiffering, setOnlyDiffering] = useState(true);

  const slugs = selection.entries.map((entry) => entry.slug).join("|");

  useEffect(() => {
    const picked = slugs ? slugs.split("|") : [];
    let cancelled = false;
    // Debounced, and every setState inside the timeout rather than the effect
    // body: ticking a third box while the second is still in flight should
    // not fire two requests, and the lint rule bans a synchronous setState
    // in an effect anyway.
    const timer = setTimeout(async () => {
      if (picked.length < 2) {
        setTable(null);
        setError("");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("/api/reference/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: selection.kind, slugs: picked }),
        });
        const data = await response.json();
        if (cancelled) {
          return;
        }
        if (!response.ok) {
          setError(data.error ?? METRIC_NOTICES.compare);
          setTable(null);
          return;
        }
        setError("");
        setTable(data.table);
      } catch {
        if (!cancelled) {
          setError(METRIC_NOTICES.compare);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [slugs, selection.kind]);

  if (selection.entries.length < 2) {
    return (
      <EmptyState
        art="scrolls"
        title={t("referenceMetrics.ui.empty")}
        hint={t("referenceMetrics.ui.sameKind")}
      />
    );
  }

  const rows = table ? table.rows.filter((row) => !onlyDiffering || row.differs) : [];

  return (
    <div>
      <div className="stagger-pop mb-3 flex flex-wrap items-center gap-2">
        {selection.entries.map((entry) => (
          <span
            key={entry.slug}
            className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-400/10 py-0.5 pl-3 pr-1 text-xs text-amber-100"
          >
            {comparisonName(selection.kind, entry, locale, table)}
            <button
              type="button"
              onClick={() => onRemove(entry.slug)}
              aria-label={t("referenceMetrics.ui.remove", { name: comparisonName(selection.kind, entry, locale, table) })}
              className="motion-nudge inline-flex size-7 items-center justify-center rounded-full text-stone-400 hover:text-amber-200"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <button type="button" onClick={onClear} className={ui.btnSmall}>
          {t("referenceMetrics.ui.clear")}
        </button>
      </div>

      {loading ? (
        <p className="reveal flex items-center gap-2 text-sm text-stone-500">
          <D20Spinner className="size-4 text-amber-300" /> {t("referenceMetrics.ui.building")}
        </p>
      ) : null}
      {error ? <p role="alert" className="motion-shake text-sm text-red-300">{metricNotice(error, locale)}</p> : null}

      {table ? (
        <>
          <div className="mb-3 flex items-center gap-2 text-xs text-stone-400">
            <Switch on={onlyDiffering} onChange={setOnlyDiffering} label={t("referenceMetrics.ui.onlyDiffering")} />
            {t("referenceMetrics.ui.diffCount", { different: table.differingRows, total: table.rows.length })}
          </div>

          <div className="panel overflow-x-auto rounded-xl">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-amber-500/20 bg-stone-950/60">
                  <th className="px-3 py-2" />
                  {table.columns.map((column) => (
                    <th
                      key={column.slug}
                      className={cn(
                        "px-3 py-2 font-display font-normal tracking-wide",
                        column.source === "homebrew" ? "text-amber-300" : "text-amber-100",
                      )}
                    >
                      {comparisonName(table.kind, column, locale)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-stone-800/60 last:border-0">
                    <th className="section-head-title whitespace-nowrap px-3 py-2 text-left font-normal">
                      {metricText(row.label, locale, "row")}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={`${metricText(row.label, locale, "row")}-${table.columns[index]?.slug ?? index}`}
                        className={cn(
                          "px-3 py-2 align-top",
                          row.differs ? "text-stone-100" : "text-stone-400",
                        )}
                      >
                        {compareCellView(table.kind, row.label, cell, locale).text}
                        {cell.detail ? (
                          <span className="block text-xs text-stone-500">{compareCellView(table.kind, row.label, cell, locale).detail}</span>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
                {!rows.length ? (
                  <tr>
                    <td
                      colSpan={table.columns.length + 1}
                      className="px-3 py-4 text-sm text-stone-500"
                    >
                      {t("referenceMetrics.ui.allSame")}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
