"use client";

import { X } from "lucide-react";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// The first fight's two-row card (docs/visual-overhaul-plan.md 5.7): play a
// card, or type your move. Shown once per browser through the tours' own
// once-only flag, and brought back by the Hand's question mark.
export const HAND_TUTORIAL_ID = "battle-hand-intro";

const ROWS = [
  {
    tag: "turnUi.tutorial.cardTag",
    titleKey: "turnUi.tutorial.cardTitle",
    body: "turnUi.tutorial.cardBody",
    className: "border-amber-500/45 bg-amber-500/10",
    tagClassName: "border-amber-400/60 text-amber-200",
  },
  {
    tag: "turnUi.tutorial.typeTag",
    titleKey: "turnUi.tutorial.typeTitle",
    body: "turnUi.tutorial.typeBody",
    className: "border-stone-600/50 bg-stone-950/60",
    tagClassName: "border-stone-500/60 text-stone-300",
  },
] as const;

export function HandTutorial({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useLocale();
  return (
    <div className="mb-2 animate-fade-up rounded-xl border border-stone-700/60 bg-stone-950/80 p-2.5" role="note" aria-label={t("turnUi.tutorial.label")}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-display text-xs uppercase tracking-[0.18em] text-amber-200/90">{t("turnUi.tutorial.title")}</span>
        <button type="button" onClick={onDismiss} aria-label={t("turnUi.tutorial.close")} className="flex size-9 items-center justify-center rounded-lg text-stone-500 hover:text-amber-200">
          <X className="size-4" />
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {ROWS.map((row) => (
          <div key={row.tag} className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${row.className}`}>
            <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-display text-[9px] uppercase tracking-[0.16em] ${row.tagClassName}`}>
              {t(row.tag)}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-sm font-semibold text-stone-100">{t(row.titleKey)}</span>
              <span className="block font-serif text-[13px] leading-snug text-stone-400">{t(row.body)}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <button type="button" onClick={onDismiss} className={ui.btnSmall}>
          {t("turnUi.tutorial.gotIt")}
        </button>
      </div>
    </div>
  );
}
