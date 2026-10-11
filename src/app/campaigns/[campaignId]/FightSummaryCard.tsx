"use client";

import { Swords, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { EncounterSummary } from "@/lib/dm/encounter-summary";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { fightOutcomeLabel } from "@/lib/i18n/turn-control-presentations";

// After the fight (docs/vtt-parity-implementation-plan.md 4.2): small gold
// stat tiles, display numerals over eyebrow labels, fading up one after
// another. Dismissed by hand; the next fight replaces it.

function Tile({ label, value, index }: { label: string; value: number | string; index: number }) {
  return (
    <div
      className="animate-fade-up rounded-md border border-amber-900/50 bg-stone-950/70 px-2 py-1.5 text-center"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <p className="font-display text-lg text-amber-100">{value}</p>
      <p className="eyebrow text-[9px] text-stone-500">{label}</p>
    </div>
  );
}

export function FightSummaryCard({ summary, onDismiss, className }: { summary: EncounterSummary; onDismiss: () => void; className?: string }) {
  const { t, locale } = useLocale();
  const minutes = Math.max(1, Math.round(summary.seconds / 60));
  const top = [...summary.fighters].sort((a, b) => b.dealt - a.dealt)[0];
  const tiles: Array<[string, number | string]> = [
    [t("turnUi.summary.rounds"), summary.rounds],
    [t("turnUi.summary.minutes"), minutes],
    [t("turnUi.summary.dealt"), summary.totals.dealt],
    [t("turnUi.summary.taken"), summary.totals.taken],
    [t("turnUi.summary.healed"), summary.totals.healed],
    [t("turnUi.summary.slain"), summary.kills],
    [t("turnUi.summary.nat20s"), summary.totals.nat20s],
    [t("turnUi.summary.nat1s"), summary.totals.nat1s],
  ];
  return (
    <section className={cn("texture-noise rounded-xl border border-amber-800/50 bg-stone-950/85 p-3 shadow-elev-1", className)} aria-label={t("turnUi.summary.title")}>
      <div className="mb-2 flex items-center gap-2">
        <Swords className="size-4 text-amber-500" />
        <p className="eyebrow text-[10px] text-amber-300/80">{t("turnUi.summary.title")}</p>
        <span className="text-xs capitalize text-stone-400">{fightOutcomeLabel(summary.outcome, locale)}</span>
        <button type="button" onClick={onDismiss} aria-label={t("turnUi.summary.dismiss")} className="ml-auto rounded p-1 text-stone-500 hover:text-stone-200">
          <X className="size-3.5" />
        </button>
      </div>
      <div className="stagger-up grid grid-cols-4 gap-1.5 sm:grid-cols-8">
        {tiles.map(([label, value], index) => (
          <Tile key={label} label={label} value={value} index={index} />
        ))}
      </div>
      {top && top.dealt > 0 ? (
        <p className="reveal mt-2 text-[11px] text-stone-400">
          {t("turnUi.summary.top", { name: top.name, damage: top.dealt,
            others: summary.fighters.length > 1 ? t("turnUi.summary.others", {
              lines: summary.fighters.map((line) => t("turnUi.summary.line", { name: line.name, dealt: line.dealt, taken: line.taken })).join(", "),
            }) : "",
          })}
        </p>
      ) : null}
    </section>
  );
}
