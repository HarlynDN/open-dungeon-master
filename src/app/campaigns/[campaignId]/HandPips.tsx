"use client";

import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { turnPipLabel } from "@/lib/i18n/turn-control-presentations";

// The Hand's turn pips, the engine's count (src/lib/battlemap/hand-table.ts
// turnPips), and the Flurry of Blows strikes bought and not yet made (the
// engine's flurryStrikes), played with the Unarmed strike card. Split from
// Hand.tsx.
export function HandPips({
  pips,
  flurryStrikes,
}: {
  pips: Array<{ label: string; used: boolean }>;
  flurryStrikes?: number;
}) {
  const { t, locale } = useLocale();
  return (
    <>
      {pips.map((pip) => (
        <span
          key={pip.label}
          data-used={pip.used ? "true" : undefined}
          // The strike through a spent pip is drawn by hand-motion.css, which eases it in.
          className={cn(
            "hand-pip rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
            pip.used ? "border-stone-700/60 text-stone-600" : "border-amber-500/45 bg-amber-500/10 text-amber-200",
          )}
          aria-label={t(pip.used ? "turnUi.pip.spent" : "turnUi.pip.available", { label: turnPipLabel(pip.label, locale) })}
        >
          {turnPipLabel(pip.label, locale)}
        </span>
      ))}
      {flurryStrikes ? (
        <span
          key={`flurry-${flurryStrikes}`}
          className="hand-pip motion-pop rounded-full border border-amber-500/45 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-200"
          aria-label={t("turnUi.pip.flurryHint", { count: flurryStrikes })}
        >
          {t("turnUi.pip.flurry", { count: flurryStrikes })}
        </span>
      ) : null}
    </>
  );
}
