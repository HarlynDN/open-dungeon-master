"use client";

import { Check, ImageIcon, Loader2, Minus, Wand2, X } from "lucide-react";
import { useState } from "react";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { setupFlowMessage, SETUP_FLOW_ERRORS } from "@/lib/i18n/setup-flow-presentations";
import { createTranslator, type MessageKey } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";

// The agent program's picture test, painted the way the tables paint
// (src/lib/harness/picture-test.ts): the tables' own picture door and queue,
// a landscape location map, the saved file, then the campaigns themselves.
// A pass offers the one step that makes it paint for them: on, the default,
// and the campaigns stranded on a backend that cannot paint moved onto it.

type Stage = { id: string; ok: boolean | null; detail?: string };
type CampaignRow = { id: string; title: string; kind: string; backend: string; picturesOn: boolean; canPaint: boolean };
type Result = { image?: { url: string }; stages?: Stage[]; campaigns?: CampaignRow[]; wouldMove?: number; error?: string };
type Moved = { id: string; title: string; from: string; mapsTurnedOn: boolean };

const STAGE_LABELS: Record<string, MessageKey> = {
  painted: "setupFlow.picture.stage.painted",
  saved: "setupFlow.picture.stage.saved",
  shape: "setupFlow.picture.stage.shape",
};
const STAGE_ORDER = ["painted", "saved", "shape"];

const BACKEND_NAMES: Record<string, MessageKey> = {
  comfyui: "setupFlow.picture.backend.comfyui",
  openai: "setupFlow.picture.backend.openai",
  "mflux-hs": "setupFlow.picture.backend.flux",
  "sdnq-hs": "setupFlow.picture.backend.flux",
  harness: "setupFlow.picture.backend.agent",
};

function names(rows: Array<{ title: string }>, locale: AppLocale): string {
  const t = createTranslator(locale);
  const titles = rows.map((row) => row.title);
  const separator = t("setupFlow.picture.separator");
  return titles.length > 3 ? t("setupFlow.picture.more", { titles: titles.slice(0, 3).join(separator), count: titles.length - 3 }) : titles.join(separator);
}

export function HarnessPictureTest({
  saved,
  picturesVerified,
  picturesForTables,
  offerAdopt = true,
  onVerified,
  onAdopted,
}: {
  saved: boolean;
  picturesVerified: boolean;
  // Already the tables' picture backend, switched on.
  picturesForTables: boolean;
  // The guided setup saves the choice on its own Continue instead.
  offerAdopt?: boolean;
  onVerified: () => void;
  onAdopted?: () => void;
}) {
  const { t, locale } = useLocale();
  const [painting, setPainting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [adopting, setAdopting] = useState(false);
  const [moved, setMoved] = useState<Moved[] | null>(null);
  const [adoptError, setAdoptError] = useState("");

  async function paint() {
    setPainting(true);
    setResult(null);
    setMoved(null);
    try {
      const response = await fetch("/api/admin/harness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "picture" }),
      });
      const data = (await response.json().catch(() => ({}))) as Result;
      setResult(response.ok && data.image ? data : { ...data, error: data.error ?? "No picture came back." });
      if (response.ok && data.image) {
        onVerified();
      }
    } catch {
      setResult({ error: SETUP_FLOW_ERRORS.network });
    } finally {
      setPainting(false);
    }
  }

  async function adopt() {
    setAdopting(true);
    setAdoptError("");
    try {
      const response = await fetch("/api/admin/harness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "adopt" }),
      });
      const data = (await response.json().catch(() => ({}))) as { moved?: Moved[]; error?: string };
      if (!response.ok) {
        setAdoptError(data.error ?? SETUP_FLOW_ERRORS.switch);
        return;
      }
      setMoved(data.moved ?? []);
      onAdopted?.();
    } catch {
      setAdoptError(SETUP_FLOW_ERRORS.network);
    } finally {
      setAdopting(false);
    }
  }

  const stages: Stage[] = painting
    ? STAGE_ORDER.map((id) => ({ id, ok: null }))
    : (result?.stages ?? []);
  const passed = Boolean(result?.image);
  const campaigns = (result?.campaigns ?? []).filter((row) => row.kind === "campaign" && row.picturesOn);
  const onAgent = campaigns.filter((row) => row.backend === "harness");
  const stranded = campaigns.filter((row) => row.backend !== "harness" && !row.canPaint);
  const keeping = campaigns.filter((row) => row.backend !== "harness" && row.canPaint);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={ui.btnSmall} onClick={paint} disabled={!saved || painting} aria-busy={painting}>
          {painting ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
          {picturesVerified ? t("setupFlow.picture.again") : t("setupFlow.picture.test")}
        </button>
        <span className="text-xs text-stone-500">
          {t("setupFlow.picture.help")}
        </span>
      </div>

      {stages.length ? (
        <ol className="hx-stages" aria-live="polite">
          {stages.map((stage, index) => {
            const state = stage.ok === null ? (painting ? "wait" : "skip") : stage.ok ? "ok" : "bad";
            return (
              <li key={stage.id} className="hx-stage live-in" data-state={state} style={{ animationDelay: `${index * 60}ms` }}>
                <span className="hx-stage-mark mt-0.5">
                  {state === "ok" ? (
                    <Check key="ok" className="tick-in size-4 text-emerald-400" />
                  ) : state === "bad" ? (
                    <X key="bad" className="tick-in size-4 text-red-400" />
                  ) : state === "wait" ? (
                    <Loader2 className="size-4 animate-spin text-stone-500" />
                  ) : (
                    <Minus className="size-4 text-stone-600" />
                  )}
                </span>
                <span>
                  <span className={state === "bad" ? "text-red-300" : state === "ok" ? "text-stone-200" : "text-stone-500"}>
                    {STAGE_LABELS[stage.id] ? t(STAGE_LABELS[stage.id]) : stage.id}
                  </span>
                  {stage.detail ? <span className="block text-xs text-stone-500">{setupFlowMessage(stage.detail, locale)}</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}

      {painting ? (
        <div className="hx-picture breathe aspect-[3/2] bg-stone-900" aria-label={t("setupFlow.picture.painting")} />
      ) : result?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={result.image.url} src={result.image.url} alt={t("setupFlow.picture.map")} className="hx-picture aspect-[3/2]" />
      ) : null}

      {result && !passed && result.error ? (
        <p role="alert" className="motion-shake text-sm text-red-400">
          {setupFlowMessage(result.error, locale)}
        </p>
      ) : null}

      {passed ? (
        <div className="live-in space-y-2 text-sm">
          {moved ? (
            <p role="status" className="flex items-start gap-1.5 text-emerald-400">
              <Check className="tick-in mt-0.5 size-4 shrink-0" />
              <span>
                {t("setupFlow.picture.adopted")}
                {moved.length
                  ? t(moved.length === 1 ? "setupFlow.picture.movedOne" : "setupFlow.picture.movedMany", { count: moved.length, names: names(moved, locale), maps: moved.some((row) => row.mapsTurnedOn) ? t("setupFlow.picture.maps") : "" })
                  : ""}
              </span>
            </p>
          ) : !offerAdopt ? (
            <p className="text-stone-300">
              {t("setupFlow.picture.works")}
              {stranded.length
                ? t(stranded.length === 1 ? "setupFlow.picture.continueOne" : "setupFlow.picture.continueMany", { count: stranded.length, names: names(stranded, locale) })
                : t("setupFlow.picture.continue")}
            </p>
          ) : picturesForTables ? (
            <p className="text-stone-300">
              {t("setupFlow.picture.already", { campaigns: onAgent.length ? t(onAgent.length === 1 ? "setupFlow.picture.countOne" : "setupFlow.picture.countMany", { count: onAgent.length }) : "" })}
            </p>
          ) : (
            <div className="su-note space-y-2">
              <p>
                {t("setupFlow.picture.unused")}
                {stranded.length
                  ? t(stranded.length === 1 ? "setupFlow.picture.strandedOne" : "setupFlow.picture.strandedMany", { count: stranded.length, names: names(stranded, locale) })
                  : ""}
              </p>
              <button type="button" className={ui.btnSecondary} onClick={adopt} disabled={adopting} aria-busy={adopting}>
                {adopting ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />} {t("setupFlow.picture.adopt")}
              </button>
            </div>
          )}
          {keeping.length ? (
            <p className="text-xs text-stone-500">
              {t(keeping.length === 1 ? "setupFlow.picture.keepingOne" : "setupFlow.picture.keepingMany", { count: keeping.length, backends: [...new Set(keeping.map((row) => BACKEND_NAMES[row.backend] ? t(BACKEND_NAMES[row.backend]) : row.backend))].join(t("setupFlow.picture.separator")) })}
            </p>
          ) : null}
          {adoptError ? (
            <p role="alert" className="motion-shake text-sm text-red-400">
              {setupFlowMessage(adoptError, locale)}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
