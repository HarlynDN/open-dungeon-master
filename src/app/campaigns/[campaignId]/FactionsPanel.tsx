"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { factionAttitudeLabel, factionStandingLabel, recordText } from "@/lib/i18n/record-presentations";
import { createTranslator } from "@/lib/i18n/translator";
import { EmptyState } from "@/components/EmptyState";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Slider } from "@/components/ui/Slider";
import { LoreImageField } from "@/app/workshop/lore/LoreFields";
import { GlyphChip, KitButton, LoadFailed, PanelLoading, panelField, panelRow } from "./PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { FACTION_ATTITUDES, REPUTATION_MAX, REPUTATION_MIN, reputationLabel, type FactionAttitude } from "@/lib/dm/faction-logic";
import { DictateField } from "@/components/DictateField";
import { appendDictation } from "@/lib/dictation";

// Factions (docs/vtt-parity-implementation-plan.md section 6): a card per
// faction with its crest, its stance, the party's standing on a ladder
// and the members drawn from the cast. Whoever steers the story edits;
// goal and power are theirs alone.

export type FactionView = {
  id: string;
  name: string;
  blurb: string;
  attitude: FactionAttitude;
  tags: string[];
  portraitPath: string;
  standing: number;
  standingLabel: string;
  members: Array<{ id: string; name: string; portraitUrl: string }>;
  goal?: string;
  power?: number;
};

type Draft = { name: string; blurb: string; goal: string; attitude: FactionAttitude; power: number; tags: string; portraitPath: string };

const blank = (): Draft => ({ name: "", blurb: "", goal: "", attitude: "neutral", power: 1, tags: "", portraitPath: "" });

// The attitude ladder has five painted faces; anything a pack adds beyond
// them reads as neutral rather than as a broken image.
const ATTITUDE_GLYPHS = new Set(["allied", "friendly", "neutral", "wary", "hostile"]);
const attitudeGlyph = (attitude: string) => `attitude-${ATTITUDE_GLYPHS.has(attitude) ? attitude : "neutral"}`;

export function FactionsPanel({ campaignId, steersStory, refreshKey = 0 }: { campaignId: string; steersStory: boolean; refreshKey?: number }) {
  const { locale, t } = useLocale();
  const [mutationError, setMutationError] = useState("");
  const [factions, setFactions] = useState<FactionView[] | null>(null);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank());
  const [busy, setBusy] = useState(false);
  const [reload, setReload] = useState(0);
  // A refused list is shown in the server's words, never as "no factions
  // yet" (issue 140); the rows stay up when a later read fails.
  const { loaded, loadError, settle } = useLoadStatus();

  useEffect(() => {
    let cancelled = false;
    readLoad<{ factions?: FactionView[] }>(fetch(`/api/campaigns/${campaignId}/factions`), "The factions").then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      if (outcome.payload) {
        setFactions(outcome.payload.factions ?? []);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, refreshKey, reload, settle]);

  function startEdit(faction: FactionView) {
    setDraft({
      name: faction.name,
      blurb: faction.blurb,
      goal: faction.goal ?? "",
      attitude: faction.attitude,
      power: faction.power ?? 1,
      tags: faction.tags.join(", "),
      portraitPath: faction.portraitPath,
    });
    setEditing(faction.id);
  }

  async function readMutation(request: Promise<Response>): Promise<boolean> {
    setMutationError("");
    try {
      const response = await request;
      if (response.ok) return true;
      const data = await response.json().catch(() => ({}));
      setMutationError(typeof data.error === "string" ? data.error : createTranslator("en")("recordUi.error.mutation"));
    } catch {
      setMutationError(createTranslator("en")("recordUi.error.network"));
    }
    return false;
  }

  async function save() {
    if (!draft.name.trim()) {
      return;
    }
    setBusy(true);
    try {
      const body = { ...draft, tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean) };
      const saved = await readMutation(
        editing === "new"
          ? fetch(`/api/campaigns/${campaignId}/factions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
          : fetch(`/api/campaigns/${campaignId}/factions/${editing}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
      if (saved) {
        setEditing(null);
        setReload((current) => current + 1);
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(faction: FactionView) {
    if (!(await appConfirm(t("recordUi.faction.removeConfirm", { name: faction.name }), { actionLabel: t("recordUi.faction.removeAction"), tone: "danger" }))) {
      return;
    }
    if (!await readMutation(fetch(`/api/campaigns/${campaignId}/factions/${faction.id}`, { method: "DELETE" }))) return;
    setReload((current) => current + 1);
  }

  async function setStanding(faction: FactionView, standing: number) {
    const saved = await readMutation(fetch(`/api/campaigns/${campaignId}/factions/${faction.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ standing }),
    }));
    if (!saved) return;
    setReload((current) => current + 1);
  }

  if (factions === null) {
    return loadError ? <LoadFailed error={recordText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} /> : <PanelLoading label={t("recordUi.faction.loading")} />;
  }
  return (
    <div className="space-y-2">
      {mutationError ? <p role="alert" className="text-xs text-red-300">{recordText(mutationError, locale)}</p> : null}
      {loaded && loadError ? <LoadFailed error={recordText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} /> : null}
      <SectionHead
        title={t("recordUi.faction.title")}
        glyph="tab-factions"
        aside={
          steersStory && editing === null ? (
            <KitButton
              onClick={() => {
                setDraft(blank());
                setEditing("new");
              }}
            >
              <Plus className="size-3.5" />{t("recordUi.addOne")}
            </KitButton>
          ) : factions.length ? (
            factions.length
          ) : null
        }
      />
      {editing !== null ? (
        <div className="panel reveal space-y-1.5 rounded-lg p-2.5">
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} maxLength={80} placeholder={t("recordUi.faction.nameExample")} aria-label={t("recordUi.faction.name")} className={panelField} />
          <DictateField label={t("recordUi.faction.blurb")} onTranscript={(text) => setDraft((current) => ({ ...current, blurb: appendDictation(current.blurb, text, 400) }))}>
            <textarea value={draft.blurb} onChange={(event) => setDraft({ ...draft, blurb: event.target.value })} rows={2} maxLength={400} placeholder={t("recordUi.faction.blurb")} aria-label={t("recordUi.faction.blurb")} className={panelField} />
          </DictateField>
          <DictateField label={t("recordUi.faction.goal")} onTranscript={(text) => setDraft((current) => ({ ...current, goal: appendDictation(current.goal, text, 400) }))}>
            <textarea value={draft.goal} onChange={(event) => setDraft({ ...draft, goal: event.target.value })} rows={2} maxLength={400} placeholder={t("recordUi.faction.privateGoal")} aria-label={t("recordUi.faction.privateGoal")} className={cn(panelField, "border-violet-900/60 focus:border-violet-500/70")} />
          </DictateField>
          <div data-pill-group="" role="group" aria-label={t("recordUi.faction.attitude")} className="flex flex-wrap items-center gap-1">
            {FACTION_ATTITUDES.map((attitude) => (
              <button data-on={draft.attitude === attitude ? "" : undefined} key={attitude} type="button" aria-pressed={draft.attitude === attitude} onClick={() => setDraft({ ...draft, attitude })} className="pk-pill pk-tap motion-press capitalize">
                <GameIcon icon={{ kind: "glyph", key: attitudeGlyph(attitude) }} size="size-4" />
                {factionAttitudeLabel(attitude, locale)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{t("recordUi.faction.power")}</span>
            <Slider min={0} max={5} value={draft.power} onChange={(power) => setDraft({ ...draft, power })} label={t("recordUi.faction.power")} className="min-w-0 flex-1" />
            <span key={draft.power} className="count-pop w-4 text-right tabular-nums text-stone-200">{draft.power}</span>
          </div>
          <input value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder={t("recordUi.faction.tags")} aria-label={t("recordUi.faction.tags")} className={panelField} />
          <LoreImageField imagePath={draft.portraitPath} onChange={(portraitPath) => setDraft({ ...draft, portraitPath })} />
          <div className="flex gap-1.5">
            <KitButton tone="primary" disabled={busy || !draft.name.trim()} busy={busy} onClick={() => void save()}>
              {editing === "new" ? t("recordUi.add") : t("recordUi.save")}
            </KitButton>
            <KitButton onClick={() => setEditing(null)}>
              <X className="size-3.5" />{t("recordUi.cancel")}
            </KitButton>
          </div>
        </div>
      ) : null}
      {!factions.length && editing === null ? <EmptyState size="sm" art="board" title={t("recordUi.faction.empty")} /> : null}
      <ul className="stagger space-y-1.5">
        {factions.map((faction) => {
          const items: ContextMenuItem[] = steersStory
            ? [
                { id: "edit", label: t("recordUi.edit"), glyph: "tab-notes", onSelect: () => startEdit(faction) },
                ...Array.from({ length: REPUTATION_MAX - REPUTATION_MIN + 1 }, (_, index) => REPUTATION_MIN + index).map((step, index) => ({
                  id: `standing-${step}`,
                  label: t("recordUi.faction.standingOption", { value: `${step > 0 ? "+" : ""}${step}`, label: factionStandingLabel(reputationLabel(step), locale) }),
                  glyph: step < 0 ? "attitude-hostile" : step === 0 ? "attitude-neutral" : "attitude-friendly",
                  separated: index === 0,
                  disabled: step === faction.standing,
                  onSelect: () => void setStanding(faction, step),
                })),
                { id: "remove", label: t("recordUi.faction.remove", { name: faction.name }), glyph: "quest-failed", tone: "danger" as const, separated: true, onSelect: () => void remove(faction) },
              ]
            : [];
          return (
            <ContextMenu as="li" key={faction.id} items={items} label={faction.name} className={panelRow}>
              <div className="flex items-start gap-2">
                {faction.portraitPath ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={faction.portraitPath} alt="" className="size-11 shrink-0 rounded-md border border-amber-500/40 object-cover shadow-[0_2px_8px_rgba(4,2,12,0.5)]" />
                ) : (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-stone-900/70">
                    <GameIcon icon={{ kind: "glyph", key: "system-factions" }} size="size-8" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm font-medium text-stone-100">
                    <span className="min-w-0 truncate">{faction.name}</span>
                    <GlyphChip glyph={attitudeGlyph(faction.attitude)} className="capitalize">{factionAttitudeLabel(faction.attitude, locale)}</GlyphChip>
                    {faction.power !== undefined ? <span className="text-[11px] font-normal text-violet-300">{t("recordUi.faction.powerValue", { value: faction.power })}</span> : null}
                  </p>
                  {faction.blurb ? <p className="reveal text-xs leading-5 text-stone-400">{faction.blurb}</p> : null}
                  {faction.goal ? <p className="reveal text-xs italic leading-5 text-violet-300/80">{t("recordUi.faction.goalValue", { goal: faction.goal })}</p> : null}
                  <div className="mt-1 flex items-center gap-1" title={t("recordUi.faction.standingTip", { label: factionStandingLabel(faction.standingLabel, locale) })}>
                    {Array.from({ length: REPUTATION_MAX - REPUTATION_MIN + 1 }, (_, index) => REPUTATION_MIN + index).map((step) => (
                      <button
                        key={step}
                        type="button"
                        disabled={!steersStory}
                        onClick={() => void setStanding(faction, step)}
                        aria-label={t("recordUi.faction.standing", { value: step })}
                        aria-pressed={step === faction.standing}
                        className={cn(
                          "bar-ease h-2.5 w-3.5 rounded-sm enabled:hover:brightness-125 motion-press",
                          step === 0 ? "bg-stone-600" : step < 0 ? (step >= faction.standing ? "bg-red-500/80" : "bg-stone-800") : step <= faction.standing ? "bg-amber-400" : "bg-stone-800",
                        )}
                      />
                    ))}
                    <span key={faction.standing} className="count-pop ml-1 text-[11px] text-stone-400">{factionStandingLabel(reputationLabel(faction.standing), locale)}</span>
                  </div>
                  {faction.members.length ? (
                    <p className="reveal mt-1 text-[11px] text-stone-500">{t("recordUi.faction.members", { names: faction.members.map((member) => member.name).join(t("recordUi.separator")) })}</p>
                  ) : null}
                </div>
                {steersStory ? (
                  <span className="flex shrink-0 flex-col items-center gap-0.5">
                    <KitButton onClick={() => startEdit(faction)}>
                      <Pencil className="size-3" />{t("recordUi.editButton")}
                    </KitButton>
                    <KitButton tone="iconDanger" always onClick={() => void remove(faction)} aria-label={t("recordUi.faction.remove", { name: faction.name })}>
                      <Trash2 className="size-3.5" />
                    </KitButton>
                  </span>
                ) : null}
              </div>
            </ContextMenu>
          );
        })}
      </ul>
    </div>
  );
}
