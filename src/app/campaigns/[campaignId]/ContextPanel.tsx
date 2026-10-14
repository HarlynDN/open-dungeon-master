"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { contextKindLabel, contextReasonText, memoryText } from "@/lib/i18n/memory-presentations";
import { EmptyState } from "@/components/EmptyState";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import type { BlockKind, ContextTrace } from "@/lib/dm/context-budget";

// "What the DM was actually sent." Lead only, because the underlying prompt
// carries DM-only facts and the secret story arc; see the route for why even
// the token counts stay behind that gate.
//
// The point of this panel is answering one question after a bad turn: was the
// thing the DM forgot even in the prompt? A dropped block with a reason is a
// far better answer than guessing at the model.

// Palette is stone, amber and ember only (src/app/globals.css remaps the
// Tailwind names); anything outside it renders as raw Tailwind and clashes
// with the indigo-and-gold theme.
const KIND_COLOR: Record<BlockKind, string> = {
  safety: "text-ember-300",
  contract: "text-amber-300",
  rules: "text-stone-300",
  sky: "text-stone-300",
  state: "text-amber-200",
  factions: "text-amber-200",
  quests: "text-amber-200",
  shop: "text-amber-200",
  retrieval: "text-ember-300",
  chapters: "text-ember-400",
  history: "text-stone-200",
  tools: "text-stone-400",
};

export function ContextPanel({ campaignId }: { campaignId: string }) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  const [trace, setTrace] = useState<ContextTrace | null>(null);
  const [at, setAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Every state write happens after the await, never synchronously while the
  // effect is running. `reload` is a counter rather than a direct call so the
  // refresh button re-runs the same effect instead of duplicating its logic.
  const [reload, setReload] = useState(0);
  const load = useCallback(() => setReload((count) => count + 1), []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaignId}/context-trace`);
        if (cancelled) {
          return;
        }
        if (!response.ok) {
          setError(response.status === 403 ? createTranslator("en")("memoryUi.error.leadOnly") : createTranslator("en")("memoryUi.error.context"));
          setLoading(false);
          return;
        }
        const data = (await response.json()) as { trace: ContextTrace | null; at?: string };
        if (cancelled) {
          return;
        }
        setError("");
        setTrace(data.trace);
        setAt(data.at ?? "");
      } catch {
        if (!cancelled) {
          setError(createTranslator("en")("memoryUi.error.context"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [campaignId, reload]);

  const pct = trace ? Math.min(100, Math.round((trace.promptTokens / trace.limitTokens) * 100)) : 0;
  const over = trace ? trace.promptTokens > trace.limitTokens : false;

  return (
    <div className="space-y-3 p-3">
      <SectionHead
        title={t("memoryUi.context.title")}
        glyph="tab-context"
        aside={
          <button type="button" onClick={load} className={cn(ui.iconAction, "pk-tap pk-always -my-1 inline-flex items-center justify-center")} aria-label={t("memoryUi.context.refresh")}>
            <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
          </button>
        }
      />
      <p className="-mt-1 text-xs text-stone-500">
        {at ? t("memoryUi.context.lastAt", { time: new Date(at).toLocaleTimeString(locale === "en" ? undefined : locale) }) : t("memoryUi.context.last")}
      </p>

      {error ? <p className="motion-shake text-xs text-red-400">{memoryText(error, locale)}</p> : null}

      {!error && !loading && !trace ? (
        <EmptyState size="sm" art="scrolls" title={t("memoryUi.context.empty")} />
      ) : null}

      {trace ? (
        <>
          <div>
            <div className="mb-1 flex justify-between font-mono text-[11px] text-stone-400">
              <span>
                {t("memoryUi.context.tokens", { used: trace.promptTokens.toLocaleString(locale === "en" ? undefined : locale), limit: trace.limitTokens.toLocaleString(locale === "en" ? undefined : locale) })}
              </span>
              <span className={over ? "text-red-400" : "text-stone-500"}>{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-stone-800">
              <div
                className={cn("bar-ease h-full rounded-full", over ? "bg-red-500" : "bg-amber-500/70")}
                style={{ width: `${Math.max(2, pct)}%` }}
              />
            </div>
          </div>

          {trace.arc ? (
            <div className="panel rounded-lg px-2.5 py-1.5 text-xs" data-testid="arc-trace">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="whitespace-nowrap font-medium text-amber-200">{syncT("upstreamUi.97fd65ddb4a9")}</span>
                <span className="shrink-0 font-mono text-[11px] text-stone-400">
                  {t("upstreamUi.arcBudget", { shown: trace.arc.beats.shown, total: trace.arc.beats.total, chars: trace.arc.chars.toLocaleString(), budget: trace.arc.budgetChars.toLocaleString() })}
                </span>
              </div>
              {trace.arc.events.length ? (
                <ul className="mt-1 space-y-0.5">
                  {trace.arc.events.map((pick) => (
                    <li key={pick.id} className={cn("text-[11px]", pick.included ? "text-stone-400" : "text-red-300/90")}>
                      <span className="font-mono text-stone-500">{pick.id}</span> {pick.name}
                      <span className="text-stone-500">: {pick.included ? contextReasonText(pick.reason, locale) : t("upstreamUi.heldBack", { reason: contextReasonText(pick.reason.replace(/^held back: /, ""), locale) })}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-0.5 text-[11px] text-stone-500">{syncT("upstreamUi.509cf3e5bed6")}</p>
              )}
            </div>
          ) : null}

          {trace.lore ? (
            <div className="panel rounded-lg px-2.5 py-1.5 text-xs" data-testid="lore-trace">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="whitespace-nowrap font-medium text-amber-200">{syncT("upstreamUi.d6b818f31875")}</span>
                <span className="shrink-0 font-mono text-[11px] text-stone-400">
                  {t("upstreamUi.loreBudget", { shown: trace.lore.picks.filter((pick) => pick.included).length, total: trace.lore.picks.filter((pick) => !pick.weak).length, chars: trace.lore.chars.toLocaleString(), budget: trace.lore.budgetChars.toLocaleString() })}
                </span>
              </div>
              {trace.lore.picks.length ? (
                <ul className="mt-1 space-y-0.5">
                  {trace.lore.picks.map((pick) => (
                    <li
                      key={pick.id}
                      title={pick.id}
                      data-lore-pick={pick.included ? "kept" : pick.weak ? "near" : "held"}
                      className={cn("text-[11px]", pick.included ? "text-stone-400" : pick.weak ? "text-stone-500" : "text-red-300/90")}
                    >
                      {pick.title}
                      {pick.secret ? <span className="text-ember-300"> {syncT("upstreamUi.e29aa97e1f8e")}</span> : null}
                      <span className="text-stone-500">: {pick.reason}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-0.5 text-[11px] text-stone-500">{syncT("upstreamUi.3bb965d7e1ee")}</p>
              )}
            </div>
          ) : null}

          <ul className="stagger space-y-1">
            {trace.blocks.map((block) => (
              <li
                key={`${block.position}-${block.id}`}
                className={cn(
                  "panel rounded-lg px-2.5 py-1.5 text-xs",
                  !block.included && "border-red-900/50 bg-red-950/20",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className={cn("font-medium", KIND_COLOR[block.kind])}>
                    {contextKindLabel(block.kind, locale)}
                    <span className="ml-1 font-normal text-stone-500">{block.id}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-stone-400">
                    {block.tokens.toLocaleString()}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-0.5 text-[11px]",
                    block.included ? "text-stone-500" : "text-red-300",
                  )}
                >
                  {block.included ? contextReasonText(block.reason, locale) : t("memoryUi.context.dropped", { reason: contextReasonText(block.reason, locale) })}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
