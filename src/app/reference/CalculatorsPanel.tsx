"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { metricText, calculatorChoice } from "@/lib/i18n/reference-metrics-presentations";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { Select } from "@/components/ui/Select";
import { CALCULATORS, type CalcInput } from "@/lib/reference/calculators";

// Every table calculation on one screen.
//
// No route: src/lib/reference/calculators.ts is pure, so it runs here and the
// numbers move as the inputs do. Each answer shows its PARTS under the
// headline, because the point is not the number, it is being able to see
// which input produced it.

export function CalculatorsPanel() {
  const { t, locale } = useLocale();
  const [openId, setOpenId] = useState(CALCULATORS[0]?.id ?? "");
  const [inputs, setInputs] = useState<Record<string, CalcInput>>(() =>
    Object.fromEntries(CALCULATORS.map((calculator) => [calculator.id, { ...calculator.defaults }])),
  );

  const calculator = CALCULATORS.find((entry) => entry.id === openId) ?? CALCULATORS[0];
  const input = inputs[calculator.id] ?? calculator.defaults;
  const result = useMemo(() => calculator.run(input), [calculator, input]);

  function set(key: string, value: string) {
    setInputs((previous) => ({
      ...previous,
      [calculator.id]: { ...(previous[calculator.id] ?? calculator.defaults), [key]: value },
    }));
  }

  return (
    <div>
      <div data-pill-group="" role="group" aria-label={t("referenceMetrics.ui.calculator")} className="stagger-pop mb-3 flex flex-wrap gap-1.5">
        {CALCULATORS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setOpenId(entry.id)}
            data-on={entry.id === calculator.id ? "" : undefined}
            aria-pressed={entry.id === calculator.id}
            className={cn(
              "motion-press min-h-9 rounded-full border px-3 py-1 text-xs transition-colors",
              entry.id === calculator.id
                ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
                : "border-stone-700/70 text-stone-400 hover:border-amber-500/40 hover:text-stone-200",
            )}
          >
            {metricText(entry.label, locale)}
          </button>
        ))}
      </div>

      <p className="mb-3 text-sm text-stone-400">{metricText(calculator.blurb, locale)}</p>

      <div className="stagger-up mb-4 grid gap-3 sm:grid-cols-2">
        {calculator.fields.map((field) => (
          <div key={field.key} role="group" aria-label={metricText(field.label, locale)}>
            <span className="mb-1 block text-xs text-stone-400">
              {metricText(field.label, locale)}
              {field.kind === "number" && field.suffix ? ` (${metricText(field.suffix, locale)})` : ""}
            </span>
            {field.kind === "number" ? (
              <NumberStepper
                label={metricText(field.label, locale)}
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
                value={Number(input[field.key] ?? 0) || 0}
                onChange={(next) => set(field.key, String(next))}
              />
            ) : (
              <Select
                label={metricText(field.label, locale)}
                value={String(input[field.key] ?? "")}
                onChange={(next) => set(field.key, next)}
                options={field.options.map((option) => ({ value: option.value, label: calculatorChoice(field, option, locale) }))}
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="panel ornate rounded-xl p-4">
        <p key={result.headline} className="gold-title count-pop font-display text-2xl">{metricText(result.headline, locale, calculator.id === "encounter-budget" ? "verdict" : "calc")}</p>
        <ul className="stagger mt-3 space-y-2">
          {result.parts.map((part) => (
            <li key={part.label} className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-stone-400">{metricText(part.label, locale)}</span>
              <span className="text-right">
                <span className="block text-sm text-stone-200">{metricText(part.value, locale, calculator.id === "spell-dc" ? "difficulty" : "calc")}</span>
                {part.detail ? (
                  <span className="block text-xs text-stone-500">{metricText(part.detail, locale)}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
        {result.note ? (
          <p className="reveal mt-3 border-t border-amber-500/15 pt-3 text-xs text-stone-500">{metricText(result.note, locale)}</p>
        ) : null}
      </div>
    </div>
  );
}
