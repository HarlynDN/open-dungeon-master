"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { AlertTriangle, Hammer, Info, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { FieldLabel } from "@/app/workshop/kit";
import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import {
  IMPORT_KINDS,
  SINGULAR_KINDS,
  type ImportKind,
  type ImportPlan,
} from "@/lib/workshop/import";
import { IMPORT_ERRORS, importErrorText, importReceiptText, importWarningText, type ImportReceipt } from "@/lib/i18n/import-flow-presentations";
import type { ImportSourceSummary } from "@/app/workshop/types";

// Choosing what crosses over into a table.
//
// The source is a workshop or another campaign. Both are campaigns rows
// holding the same content tables, so both are the same copy, and the server
// decides which ones this person may copy out of
// (src/lib/db/import-sources.ts).
//
// Used in two places with one difference. In the lobby a campaign already
// exists, so the picker asks the server what the import WOULD do and shows
// the collisions and overwrites. At campaign creation there is no campaign
// yet, so there is nothing to collide with: a fresh table is empty, and the
// counts from the source are the whole truth.

export type ImportSelection = {
  sourceId: string;
  select: ImportKind[];
  houseRules: "replace" | "append";
  // What an earlier import from the same source brought: kept as this
  // campaign has it, or copied again under a number.
  again?: "skip" | "copy";
  // A board meeting the arc the table is playing: left alone, or added as
  // the next act (#157).
  arc?: "leave" | "append";
};

export const EMPTY_SELECTION: ImportSelection = {
  sourceId: "",
  select: [],
  houseRules: "replace",
  again: "skip",
  arc: "leave",
};

export function ContentImportPicker({
  campaignId,
  selection,
  onChange,
  onImported,
}: {
  // Omitted at campaign creation, where the target does not exist yet.
  campaignId?: string;
  selection: ImportSelection;
  onChange: (selection: ImportSelection) => void;
  // Only meaningful with a campaignId: importing happens immediately.
  onImported?: (copied: number) => void;
}) {
  const [sources, setSources] = useState<ImportSourceSummary[]>([]);
  const { t, locale } = useLocale();
  const [loading, setLoading] = useState(true);
  const [sourceError, setSourceError] = useState("");
  const [sourceRetry, setSourceRetry] = useState(0);
  const [planState, setPlanState] = useState<{ key: string; plan: ImportPlan | null; error: string; pending: boolean } | null>(null);
  const [planRetry, setPlanRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ receipt: ImportReceipt } | { error: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(async () => {
      if (controller.signal.aborted) return;
      setLoading(true);
      setSourceError("");
      try {
        const response = await fetch("/api/import-sources", { signal: controller.signal });
        const data = await response.json().catch(() => ({}));
        if (controller.signal.aborted) return;
        if (!response.ok || !Array.isArray(data.sources)) {
          setSourceError(IMPORT_ERRORS.loadFailed);
          return;
        }
        setSources(data.sources);
      } catch {
        if (!controller.signal.aborted) setSourceError(IMPORT_ERRORS.network);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    });
    return () => controller.abort();
  }, [sourceRetry]);

  // A campaign cannot import from itself, and offering it would be the one
  // option guaranteed to fail.
  const offered = sources.filter((source) => source.id !== campaignId);
  const workshops = offered.filter((source) => source.kind === "workshop");
  const campaigns = offered.filter((source) => source.kind !== "workshop");
  const chosen = offered.find((source) => source.id === selection.sourceId) ?? null;

  // The available kinds are the ones this source actually holds. Offering a
  // tickbox for something that would copy nothing is a lie the DM only
  // discovers after pressing the button.
  const available = chosen
    ? IMPORT_KINDS.filter((kind) => (chosen.contents?.[kind] ?? 0) > 0)
    : [];

  // A matching request key prevents a previous source's warnings from
  // flashing on the next selection before the effect starts. Aborting keeps
  // slower previews from replacing a newer one or its failure state.
  const params = new URLSearchParams({ sourceId: selection.sourceId, again: selection.again ?? "skip", arc: selection.arc ?? "leave" });
  for (const kind of selection.select) params.append("select", kind);
  const planUrl = campaignId && selection.sourceId && selection.select.length
    ? `/api/campaigns/${campaignId}/import?${params}` : "";
  const planKey = `${planUrl}#${planRetry}`;
  const currentPlan = planState?.key === planKey ? planState : null;
  const plan = currentPlan?.plan ?? null;
  const planning = Boolean(planUrl) && (!currentPlan || currentPlan.pending);
  const planError = currentPlan?.error ?? "";

  useEffect(() => {
    if (!planUrl) return;
    const controller = new AbortController();
    void Promise.resolve().then(async () => {
      if (controller.signal.aborted) return;
      setPlanState({ key: planKey, plan: null, error: "", pending: true });
      try {
        const response = await fetch(planUrl, { signal: controller.signal });
        const data = await response.json().catch(() => ({}));
        if (controller.signal.aborted) return;
        setPlanState({ key: planKey, plan: response.ok ? data.plan ?? null : null,
          error: response.ok && data.plan ? "" : typeof data.error === "string" ? data.error : IMPORT_ERRORS.planFailed, pending: false });
      } catch {
        if (!controller.signal.aborted) setPlanState({ key: planKey, plan: null, error: IMPORT_ERRORS.network, pending: false });
      }
    });
    return () => controller.abort();
  }, [planUrl, planKey]);

  function choose(source: ImportSourceSummary | null) {
    if (!source) {
      onChange(EMPTY_SELECTION);
      return;
    }
    // Everything the source has, ticked. Bringing all of it is the common
    // case, and unticking is easier than hunting for what exists.
    onChange({
      ...selection,
      sourceId: source.id,
      select: IMPORT_KINDS.filter((kind) => (source.contents?.[kind] ?? 0) > 0),
    });
  }

  function toggle(kind: ImportKind) {
    onChange({
      ...selection,
      select: selection.select.includes(kind)
        ? selection.select.filter((entry) => entry !== kind)
        : [...selection.select, kind],
    });
  }

  async function importNow() {
    if (!campaignId || !selection.sourceId || !selection.select.length || busy || planning || planError || !plan || plan.empty) {
      return;
    }
    setBusy(true);
    setNote(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selection),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.error || typeof data.copied !== "number") {
        setNote({ error: typeof data.error === "string" ? data.error : IMPORT_ERRORS.failed });
        return;
      }
      setNote({ receipt: data });
      // Clearing the ticks re-runs the plan effect, which clears the plan.
      // Refetching here as well raced it with the old ticks and left the
      // last import's warnings and notes on screen.
      onChange({ ...selection, select: [] });
      onImported?.(data.copied ?? 0);
    } catch {
      setNote({ error: IMPORT_ERRORS.network });
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <Loader2 className="size-4 animate-spin text-stone-500" />;
  }

  const sourceFailure = sourceError ? (
    <div role="alert" className="flex items-center gap-2 text-xs text-red-300">
      <span>{importErrorText(sourceError, locale)}</span>
      <button type="button" className={ui.btnSmall} onClick={() => setSourceRetry(value => value + 1)}>{t("importFlow.retry")}</button>
    </div>
  ) : null;

  if (!offered.length) {
    if (sourceFailure) return sourceFailure;
    return (
      <p className="text-xs text-stone-500">
        {t("import.empty")}</p>
    );
  }

  return (
    <div className="space-y-3">
      {sourceFailure}
      <div className="block">
        <FieldLabel className="mb-1 block">{t("import.startFrom")}</FieldLabel>
        <Select
          label={t("import.startFrom")}
          value={selection.sourceId}
          onChange={(id) => choose(offered.find((source) => source.id === id) ?? null)}
          options={[
            { value: "", label: t("import.none") },
            ...workshops.map((source) => ({
              value: source.id,
              label: source.title,
              group: t("import.workshops"),
              icon: { kind: "glyph" as const, key: "system-storyboard" },
            })),
            ...campaigns.map((source) => ({
              value: source.id,
              label: source.title,
              group: t("import.campaigns"),
              icon: { kind: "glyph" as const, key: "tab-campaigns" },
            })),
          ]}
        />
      </div>

      {chosen ? (
        available.length ? (
          <>
            <div className="stagger space-y-1">
              {available.map((kind) => (
                <div key={kind} className="flex min-h-9 items-center gap-2 text-sm text-stone-300">
                  <Switch on={selection.select.includes(kind)} onChange={() => toggle(kind)} label={t(`import.kind.${kind}`)} />
                  <span>{t(`import.kind.${kind}`)}</span>
                  {SINGULAR_KINDS.has(kind) ? null : (
                    <span className="text-xs text-stone-500">({chosen.contents[kind]})</span>
                  )}
                </div>
              ))}
            </div>

            {selection.select.includes("houseRules") ? (
              <div className="block">
                <FieldLabel className="mb-1 block">{t("import.houseRules")}</FieldLabel>
                <Select<"replace" | "append">
                  label={t("import.houseRules")}
                  value={selection.houseRules}
                  onChange={(houseRules) => onChange({ ...selection, houseRules })}
                  options={[
                    { value: "replace", label: t("import.replace") },
                    { value: "append", label: t("import.appendRules") },
                  ]}
                />
              </div>
            ) : null}

            {selection.select.includes("storyboard") && plan?.board?.targetHasArc ? (
              <div className="reveal block">
                <FieldLabel className="mb-1 block">{t("import.beats")}</FieldLabel>
                <Select<"leave" | "append">
                  label={t("import.beats")}
                  value={selection.arc ?? "leave"}
                  onChange={(arc) => onChange({ ...selection, arc })}
                  options={[
                    {
                      value: "leave",
                      label: t("import.leaveArc"),
                      hint: t("import.leaveArcHint"),
                    },
                    {
                      value: "append",
                      label: t("import.addAct", { act: plan.board.act }),
                      hint: t("import.appendArcHint"),
                    },
                  ]}
                />
              </div>
            ) : null}

            {plan?.kept || selection.again === "copy" ? (
              <div className="reveal block">
                <FieldLabel className="mb-1 block">{t("import.alreadyHere")}</FieldLabel>
                <Select<"skip" | "copy">
                  label={t("import.alreadyHere")}
                  value={selection.again ?? "skip"}
                  onChange={(again) => onChange({ ...selection, again })}
                  options={[
                    { value: "skip", label: t("import.keep") },
                    { value: "copy", label: t("import.copyAgain") },
                  ]}
                />
              </div>
            ) : null}

            {planning ? <p role="status" className="text-xs text-stone-400">{t("importFlow.planning")}</p> : null}
            {planError ? <div role="alert" className="flex items-center gap-2 text-xs text-red-300">
              <span>{importErrorText(planError, locale)}</span>
              <button type="button" className={ui.btnSmall} onClick={() => setPlanRetry(value => value + 1)}>{t("importFlow.retry")}</button>
            </div> : null}

            {plan?.warnings.length ? (
              <ul className="stagger space-y-1">
                {plan.warnings.map((warning, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-1.5 text-xs text-amber-300/90"
                  >
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                    <span>{importWarningText(warning, locale)}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {plan?.notes?.length ? (
              <ul className="stagger space-y-1">
                {plan.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs text-stone-400">
                    <Info className="mt-0.5 size-3.5 shrink-0 text-sky-300/70" />
                    <span>{importWarningText(note, locale)}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {campaignId ? (
              <div className="reveal flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={importNow}
                  disabled={busy || !selection.select.length || planning || Boolean(planError) || !plan || plan.empty}
                  className={ui.btnSmall}
                >
                  {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Hammer className="size-3.5" />}
                  {t("import.bringIn")}</button>
                {note ? <span role={"error" in note ? "alert" : "status"} className={`live-in text-xs ${"error" in note ? "text-red-300" : "text-emerald-400"}`}>
                  {"error" in note ? importErrorText(note.error, locale) : importReceiptText(note.receipt, locale)}
                </span> : null}
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                {t("import.afterCreation")}</p>
            )}
          </>
        ) : (
          <p className="text-xs text-stone-500">
            {chosen.kind === "workshop"
              ? t("import.emptyWorkshop")
              : t("import.emptyCampaign")}
          </p>
        )
      ) : null}
    </div>
  );
}

// Posts the chosen import after a campaign row exists. Mirrors
// submitWorldSetup in src/app/WorldSetupFields.tsx, which is the same
// pattern for the same reason: the campaign has to exist before anything can
// be written into it.
export async function submitContentImport(campaignId: string, selection: ImportSelection) {
  if (!selection.sourceId || !selection.select.length) {
    return;
  }
  await fetch(`/api/campaigns/${campaignId}/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selection),
  }).catch(() => undefined);
}
