"use client";

import { useCallback, useEffect, useState } from "react";
import { metricText } from "@/lib/i18n/reference-metrics-presentations";
import { EmptyState } from "@/components/EmptyState";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { dmToolsText, DM_TOOL_NOTICES } from "@/lib/i18n/dm-tools-presentations";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Listed, RowMenu, panelRow } from "@/app/campaigns/[campaignId]/PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { formatRoster, TEMPLATE_NAME_MAX } from "@/lib/dm/encounter-template-logic";
import { thresholdsForParty } from "@/lib/srd/encounter-math";
import { targetPartyLevels, type TargetParty } from "@/lib/workshop/kind";
import { Sheet } from "@/components/ui/Sheet";
import { useTourPrepare } from "@/lib/tours/prepare";
import { DmWorkbenchPanel } from "@/app/campaigns/[campaignId]/DmWorkbenchPanel";
import { EncounterForm } from "@/app/workshop/encounters/EncounterForm";
import { EncounterRows } from "@/app/workshop/encounters/EncounterRows";
import {
  EMPTY_ENCOUNTER_DRAFT,
  type EncounterDraft,
  type MapOption,
  type PreparedEncounter,
  type TemplateReadout,
} from "@/app/workshop/encounters/types";

// Prepared encounters: the roster a DM writes down before the session and
// deploys in one action.
//
// The difficulty line under each one is not stored. It is recomputed on
// every read from the party as it stands today, because the party levels up
// between the prep and the table and a saved verdict would quietly go stale.
//
// Two layouts over one set of requests. "list" is the DM console's: the
// prepared fights as compact entries with the create form underneath. "rows"
// is the workshop's: the what-if workbench folded into a card at the top,
// one full-width row per fight with a CR budget bar, and the editor in a
// sheet. The bar's thresholds come from the target party the caller passes,
// through the same thresholdsForParty the workbench route and the target
// party bar read, so the three never disagree about what "deadly" is.

function DifficultyLine({ readout }: { readout: TemplateReadout }) {
  const { t, locale } = useLocale();
  if (readout.unknownMonster) {
    return (
      <p className="text-[11px] text-red-400">
        {t("dmToolsUi.prep.unknownMonster", { name: readout.unknownMonster })}
      </p>
    );
  }
  return (
    <p className={cn("text-[11px]", readout.tooDeadly ? "text-red-400" : "text-stone-400")}>
      {t(readout.count === 1 ? "dmToolsUi.prep.readoutOne" : "dmToolsUi.prep.readoutMany", { count: readout.count, verdict: metricText(readout.verdict.replace(/_/g, " "), locale, "verdict"), xp: readout.adjustedXp, ceiling: readout.ceiling })}
      {readout.tooDeadly ? t("dmToolsUi.prep.refused") : ""}
    </p>
  );
}

export function DmEncounterPrepPanel({
  campaignId,
  layout = "list",
  targetParty,
  cue = false,
}: {
  campaignId: string;
  layout?: "list" | "rows";
  // The lead's desk at an AI-narrated table (#154): Deploy becomes a cue the
  // storyteller runs when the scene reaches the fight, and can be taken back.
  cue?: boolean;
  // Read only in rows mode: the party the CR budget bar is drawn against. A
  // workshop declares one; a real campaign has no need of it because the
  // console never shows the bar.
  targetParty?: TargetParty;
}) {
  const { t, locale } = useLocale();
  const [templates, setTemplates] = useState<PreparedEncounter[]>([]);
  const [draft, setDraft] = useState<EncounterDraft>(EMPTY_ENCOUNTER_DRAFT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [maps, setMaps] = useState<MapOption[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const rows = layout === "rows";

  // The state lands in a .then callback rather than after an await, so the
  // refetch reads as "subscribe to an external system" to React and to the
  // effect linter, which is what it is.
  // A refused or failed list is settled, not dropped (issue 140), so the
  // list says "nothing prepared" only once the server has said so.
  const { loaded, loadError, settle } = useLoadStatus();
  const load = useCallback(
    () =>
      readLoad<{ templates: PreparedEncounter[] }>(fetch(`/api/campaigns/${campaignId}/dm/encounter-templates`), "The prepared fights").then(
        (outcome) => {
          if (outcome.payload) {
            setTemplates(outcome.payload.templates);
          }
          settle(outcome);
        },
      ),
    [campaignId, settle],
  );

  // The map drawer, for the "On which map" link. Same load-once shape as the
  // templates themselves.
  const loadMaps = useCallback(
    () =>
      fetch(`/api/campaigns/${campaignId}/dm/maps`)
        .then((response) => (response.ok ? response.json() : null))
        .then((payload: { maps: MapOption[] } | null) => {
          if (payload) {
            setMaps(payload.maps);
          }
        })
        .catch(() => {
          // transient; the picker just offers the generator until the next load
        }),
    [campaignId],
  );

  // The server costs every roster against the party it knows about, so when
  // the workshop's target party changes the readouts are stale until refetched.
  const partyKey = targetParty ? `${targetParty.size}:${targetParty.level}` : "";
  useEffect(() => {
    void load();
    void loadMaps();
  }, [load, loadMaps, partyKey]);

  // The tour's "open the editor" step, answered only where the editor is a
  // sheet; in the console the form is always on screen.
  useTourPrepare((name) => {
    if (name === "open-encounter-editor" && rows && !editorOpen) openEditor(null);
  });

  function openEditor(template: PreparedEncounter | null) {
    setError("");
    setNote("");
    setEditingId(template?.id ?? null);
    setDraft(
      template
        ? {
            name: template.name,
            enemies: formatRoster(template.enemies),
            battlefield: template.battlefield,
            scene: template.map.scene ?? "",
            notes: template.notes,
            mapId: template.map.mapId ?? "",
            extras: template.extras,
          }
        : EMPTY_ENCOUNTER_DRAFT,
    );
    setEditorOpen(true);
  }

  // One request for both a new fight and an edit to an old one: the create
  // and update routes take the same body, so the only difference is where it
  // goes. The list layout never sets editingId and so always creates.
  async function save() {
    setBusy(true);
    setError("");
    setNote("");
    try {
      const base = `/api/campaigns/${campaignId}/dm/encounter-templates`;
      const response = await fetch(editingId ? `${base}/${editingId}` : base, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          enemies: draft.enemies,
          battlefield: draft.battlefield,
          notes: draft.notes,
          map: { mapId: draft.mapId || null, scene: draft.scene || null },
          extras: draft.extras,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError((payload as { error?: string }).error ?? DM_TOOL_NOTICES.prepSave);
        return;
      }
      setDraft(EMPTY_ENCOUNTER_DRAFT);
      setEditingId(null);
      setEditorOpen(false);
      await load();
    } finally {
      setBusy(false);
    }
  }

  // A second copy of the fight, for the version-two-of-this-ambush workflow:
  // same create route, name suffixed, linked map carried along.
  async function duplicate(template: PreparedEncounter) {
    setBusy(true);
    setError("");
    setNote("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/encounter-templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: t("dmToolsUi.copyName", { name: template.name }).slice(0, TEMPLATE_NAME_MAX),
          enemies: formatRoster(template.enemies),
          battlefield: template.battlefield,
          notes: template.notes,
          map: template.map,
          extras: template.extras,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError((payload as { error?: string }).error ?? DM_TOOL_NOTICES.copy);
        return;
      }
      await load();
    } finally {
      setBusy(false);
    }
  }

  // Asks first, and a refusal is shown rather than swallowed.
  async function remove(template: PreparedEncounter) {
    const id = template.id;
    if (!(await appConfirm(t("dmToolsUi.prep.deleteConfirm", { name: template.name }), { actionLabel: t("dmToolsUi.delete") }))) {
      return;
    }
    setError("");
    setNote("");
    const response = await fetch(`/api/campaigns/${campaignId}/dm/encounter-templates/${id}`, { method: "DELETE" }).catch(() => null);
    if (!response?.ok) {
      const payload = (await response?.json().catch(() => ({}))) as { error?: string } | undefined;
      setError(payload?.error ?? (response ? DM_TOOL_NOTICES.delete : DM_TOOL_NOTICES.network));
      return;
    }
    if (editingId === id) {
      setEditingId(null);
      setEditorOpen(false);
    }
    await load();
  }

  async function deploy(id: string, cueIt = true) {
    setBusy(true);
    setError("");
    setNote("");
    try {
      const response = await fetch(
        `/api/campaigns/${campaignId}/dm/encounter-templates/${id}/deploy`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cue ? { cue: cueIt } : {}),
        },
      );
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        mapError?: string | null;
        cued?: boolean;
      };
      if (!response.ok) {
        setError(payload.error ?? DM_TOOL_NOTICES.deploy);
        return;
      }
      if (payload.cued !== undefined) {
        setNote(
          payload.cued
            ? DM_TOOL_NOTICES.cued
            : DM_TOOL_NOTICES.uncued,
        );
        await load();
        return;
      }
      setNote(
        payload.mapError
          ? `The fight is on the table. Its saved map could not be used: ${payload.mapError}`
          : DM_TOOL_NOTICES.deployed,
      );
    } finally {
      setBusy(false);
    }
  }

  const feedback = (
    <>
      {error ? <p className="motion-shake text-[11px] text-red-400">{dmToolsText(error, locale)}</p> : null}
      {note ? <p className="live-in text-[11px] text-emerald-400">{dmToolsText(note, locale)}</p> : null}
    </>
  );

  if (rows) {
    const thresholds = targetParty ? thresholdsForParty(targetPartyLevels(targetParty)) : null;
    const editing = templates.find((template) => template.id === editingId) ?? null;
    return (
      <div className="space-y-3">
        <DmWorkbenchPanel campaignId={campaignId} collapsible />
        <Listed loaded={loaded} error={dmToolsText(loadError, locale)} onRetry={() => void load()} loading={t("dmToolsUi.prep.loading")}>
          <EncounterRows
            encounters={templates}
            maps={maps}
            thresholds={thresholds}
            busy={busy}
            onOpen={openEditor}
            onDeploy={(template) => void deploy(template.id)}
            onDuplicate={(template) => void duplicate(template)}
            onDelete={(template) => void remove(template)}
          />
        </Listed>
        {feedback}
        <Sheet
          open={editorOpen}
          onOpenChange={setEditorOpen}
          title={editing ? editing.name : t("dmToolsUi.prep.new")}
          className="lg:w-[min(92vw,40rem)]"
        >
          <EncounterForm
            campaignId={campaignId}
            value={draft}
            onChange={setDraft}
            maps={maps}
            busy={busy}
            submitLabel={editing ? t("dmToolsUi.save") : t("dmToolsUi.prep.prepare")}
            onSubmit={() => void save()}
            variant="sheet"
          />
          <div className="mt-2">{feedback}</div>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <section>
        <SectionHead
          title={t("dmToolsUi.prep.title")}
          glyph="system-encounters"
          aside={templates.length ? <span key={templates.length} className="count-pop">{templates.length}</span> : undefined}
        />
        <Listed loaded={loaded} error={dmToolsText(loadError, locale)} onRetry={() => void load()} loading={t("dmToolsUi.prep.loading")}>
        {templates.length ? (
          <ul className="stagger space-y-1.5">
            {templates.map((template) => {
              // Deploy stays the row's one visible button; the two that were
              // icons keep the names they announced, in the row's menu.
              const deployLabel = cue ? (template.cued ? t("dmToolsUi.prep.takeBack") : t("dmToolsUi.prep.cueStory")) : t("dmToolsUi.prep.deploy");
              const items: ContextMenuItem[] = [
                {
                  id: "deploy",
                  label: deployLabel,
                  glyph: "tab-battle",
                  disabled: busy,
                  onSelect: () => void deploy(template.id, !template.cued),
                },
                { id: "duplicate", label: t("dmToolsUi.duplicateName", { name: template.name }), glyph: "ui-duplicate", disabled: busy, onSelect: () => void duplicate(template) },
                { id: "delete", label: t("dmToolsUi.deleteName", { name: template.name }), glyph: "ui-delete", tone: "danger", separated: true, onSelect: () => void remove(template) },
              ];
              return (
                <ContextMenu key={template.id} as="li" items={items} label={template.name} className={panelRow}>
                  <div className="flex items-start gap-2">
                    <GameIcon icon={{ kind: "glyph", key: "system-encounters" }} size="size-7" className="mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-stone-100">
                        {template.name}
                        {cue && template.cued ? (
                          <span className="live-in ml-1.5 rounded-sm border border-amber-500/40 px-1 text-[10px] text-amber-300">{t("dmToolsUi.prep.cued")}</span>
                        ) : null}
                      </p>
                      <p className="truncate text-xs text-stone-400">
                        {formatRoster(template.enemies).replace(/\n/g, ", ")}
                        {template.battlefield ? t("dmToolsUi.prep.on", { place: template.battlefield }) : ""}
                      </p>
                      <DifficultyLine readout={template.readout} />
                      {template.notes ? (
                        <p className="reveal mt-0.5 whitespace-pre-wrap text-[11px] text-stone-500">
                          {template.notes}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <button
                        type="button"
                        disabled={busy}
                        aria-busy={busy}
                        onClick={() => void deploy(template.id, !template.cued)}
                        className={cn(cue && template.cued ? ui.btnSecondary : ui.btnPrimary, "h-9 px-3 text-[11px]")}
                      >
                        {cue ? (template.cued ? t("dmToolsUi.prep.takeBackShort") : t("dmToolsUi.prep.cue")) : t("dmToolsUi.prep.deploy")}
                      </button>
                      <RowMenu items={items} label={template.name} />
                    </div>
                  </div>
                </ContextMenu>
              );
            })}
          </ul>
        ) : (
          <EmptyState size="sm" art="map" title={t("dmToolsUi.prep.empty")} />
        )}
        </Listed>
      </section>

      <EncounterForm
        campaignId={campaignId}
        value={draft}
        onChange={setDraft}
        maps={maps}
        busy={busy}
        submitLabel={t("dmToolsUi.prep.prepare")}
        onSubmit={() => void save()}
      />

      {feedback}
    </div>
  );
}
