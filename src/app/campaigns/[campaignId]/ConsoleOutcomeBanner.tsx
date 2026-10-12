"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { dmActionView } from "@/lib/i18n/dm-action-presentations";
import { dmResultPresentation, type DmResultNames } from "@/lib/i18n/dm-result-presentations";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { describeAdjudicationResult, type ResultLine } from "@/lib/dm/catalog-result";

// What the DM console's "Start a fight" said (the ambush's surprise rolls,
// who is placed where), kept for the Battle tab. Starting a fight moves the
// panel to the board, which took the console and its result off screen
// before anyone could read it; the result now waits on the board until it
// is dismissed.

type HeldResult = { result: unknown; action: { name: string; label: string; summary: string }; names: DmResultNames };
type Held = { campaignId: string; title: string; lines: ResultLine[]; seq: number; source?: HeldResult };

let held: Held | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function holdConsoleOutcome(campaignId: string, title: string, lines: ResultLine[], source?: HeldResult) {
  held = { campaignId, title, lines, source, seq: (held?.seq ?? 0) + 1 };
  for (const listener of listeners) listener();
}

function dismiss() {
  held = null;
  for (const listener of listeners) listener();
}

export function ConsoleOutcomeBanner({ campaignId }: { campaignId: string }) {
  const { locale, t } = useLocale();
  const shown = useSyncExternalStore(subscribe, () => held, () => null);
  if (!shown || shown.campaignId !== campaignId || !shown.lines.length) return null;
  const title = shown.source ? dmActionView(shown.source.action, locale).label : shown.title;
  const lines = shown.source ? describeAdjudicationResult(shown.source.result, dmResultPresentation(locale, shown.source.names)) : shown.lines;
  return (
    <div
      key={shown.seq}
      role="status"
      className="reveal-banner mb-2 rounded-lg border border-amber-500/30 bg-stone-950/80 px-3 py-2 text-xs"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="gold-title font-display text-[11px] uppercase tracking-[0.18em]">{title}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dmField.dismiss")}
          className="motion-press flex size-7 items-center justify-center rounded-md text-stone-500 hover:text-amber-200"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <ul className="stagger mt-1 space-y-0.5">
        {lines.map((line, index) => (
          <li
            key={`${index}-${line.text}`}
            className={cn(
              line.tone === "bad" ? "text-ember-300" : line.tone === "good" ? "text-emerald-300" : "text-stone-200",
            )}
          >
            {line.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
