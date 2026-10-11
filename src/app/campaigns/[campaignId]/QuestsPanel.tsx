"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { questStatusLabel, recordText } from "@/lib/i18n/record-presentations";
import { createTranslator } from "@/lib/i18n/translator";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { EmptyState } from "@/components/EmptyState";
import { Check, EyeOff, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import type { Quest, QuestStatus } from "@/lib/dm/quest-logic";
import { GlyphChip, KitButton, LoadFailed, panelField, PanelLoading, panelRow, Tick, TickMark } from "./PanelKit";
import { DictateField } from "@/components/DictateField";
import { appendDictation } from "@/lib/dictation";

// The quest log (docs/vtt-parity-implementation-plan.md 5.7): what the
// arc compiled and what the DM wrote, with objectives the DM ticks by
// hand. Players read the party's; the DM's own rows are marked.

const STATUS_GLYPH: Record<QuestStatus, string> = { active: "quest-active", done: "quest-done", failed: "quest-failed", hidden: "quest-hidden" };
const statusOptions = (locale: Parameters<typeof questStatusLabel>[1]) => (Object.keys(STATUS_GLYPH) as QuestStatus[]).map((status) => ({
  value: status,
  label: questStatusLabel(status, locale),
  icon: { kind: "glyph" as const, key: STATUS_GLYPH[status] },
}));

export function QuestsPanel({ campaignId, steersStory, refreshKey }: { campaignId: string; steersStory: boolean; refreshKey: number }) {
  const { locale, t } = useLocale();
  const [mutationError, setMutationError] = useState("");
  const [quests, setQuests] = useState<Quest[] | null>(null);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();

  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState("");
  const [busy, setBusy] = useState(false);

  const [reload, setReload] = useState(0);
  const load = useCallback(() => setReload((current) => current + 1), []);

  useEffect(() => {
    let cancelled = false;
    readLoad<{ quests?: Quest[] }>(fetch(`/api/campaigns/${campaignId}/quests`), "The quest log").then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      if (outcome.payload) {
        setQuests(outcome.payload.quests ?? []);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, refreshKey, reload, settle]);

  async function mutate(request: Promise<Response>): Promise<{ quest?: Quest } | null> {
    setMutationError("");
    try {
      const response = await request;
      const data = await response.json().catch(() => ({}));
      if (response.ok) return data;
      setMutationError(typeof data.error === "string" ? data.error : createTranslator("en")("recordUi.error.mutation"));
    } catch {
      setMutationError(createTranslator("en")("recordUi.error.network"));
    }
    return null;
  }

  async function patch(questId: string, body: Record<string, unknown>) {
    const data = await mutate(fetch(`/api/campaigns/${campaignId}/quests/${questId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }));
    if (data?.quest) {
      const next = data.quest;
      setQuests((current) => (current ?? []).map((quest) => (quest.id === next.id ? next : quest)));
    }
  }

  async function add() {
    if (!title.trim()) {
      return;
    }
    setBusy(true);
    try {
      const saved = await mutate(fetch(`/api/campaigns/${campaignId}/quests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, objectives: lines.split("\n").map((line) => line.trim()).filter(Boolean) }),
      }));
      if (saved) {
        setTitle("");
        setLines("");
        setAdding(false);
        load();
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(quest: Quest) {
    if (!(await appConfirm(t("recordUi.quest.removeConfirm", { title: quest.title }), { actionLabel: t("recordUi.quest.removeAction"), tone: "danger" }))) {
      return;
    }
    if (!await mutate(fetch(`/api/campaigns/${campaignId}/quests/${quest.id}`, { method: "DELETE" }))) return;
    setQuests((current) => (current ?? []).filter((entry) => entry.id !== quest.id));
  }

  if (quests === null && loadError) {
    return <LoadFailed error={recordText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} />;
  }

  if (quests === null) {
    return <PanelLoading label={t("recordUi.quest.loading")} />;
  }
  const active = quests.filter((quest) => quest.status === "active");
  const settled = quests.filter((quest) => quest.status !== "active");
  return (
    <div className="space-y-2">
      {mutationError ? <p role="alert" className="text-xs text-red-300">{recordText(mutationError, locale)}</p> : null}
      {quests.length > 0 && loaded && loadError ? <LoadFailed error={recordText(loadError, locale)} onRetry={load} /> : null}
      <SectionHead
        title={t("recordUi.quest.title")}
        glyph="tab-quests"
        aside={
          steersStory && !adding ? (
            <KitButton onClick={() => setAdding(true)}>
              <Plus className="size-3.5" />{t("recordUi.quest.write")}
            </KitButton>
          ) : quests.length ? (
            <span className="text-[11px] text-stone-500">{t("recordUi.quest.activeCount", { count: active.length })}</span>
          ) : null
        }
      />
      {adding ? (
        <div className="panel reveal space-y-1.5 rounded-lg p-2.5">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder={t("recordUi.quest.titleExample")}
            aria-label={t("recordUi.quest.titleLabel")}
            className={panelField}
          />
          <DictateField label={t("recordUi.quest.objectives")} onTranscript={(text) => setLines((current) => appendDictation(current.trim() ? `${current.trimEnd()}\n` : "", text))}>
            <textarea
              value={lines}
              onChange={(event) => setLines(event.target.value)}
              rows={3}
              placeholder={t("recordUi.quest.objectiveExample")}
              aria-label={t("recordUi.quest.objectiveLines")}
              className={cn(panelField, "leading-5")}
            />
          </DictateField>
          <div className="flex gap-1.5">
            <KitButton tone="primary" disabled={busy || !title.trim()} busy={busy} onClick={() => void add()}>
              {busy ? null : <Check className="size-3.5" />}{t("recordUi.quest.add")}
            </KitButton>
            <KitButton onClick={() => setAdding(false)}>
              <X className="size-3.5" />{t("recordUi.quest.cancel")}
            </KitButton>
          </div>
        </div>
      ) : null}
      {!quests.length ? (loadError ? <LoadFailed error={recordText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} /> : loaded ? <EmptyState size="sm" art="scrolls" title={t("recordUi.quest.empty")} /> : null) : null}
      <ul className="stagger space-y-1.5">
        {[...active, ...settled].map((quest) => (
          <QuestRow key={quest.id} quest={quest} steersStory={steersStory} onPatch={(body) => void patch(quest.id, body)} onRemove={() => void remove(quest)} />
        ))}
      </ul>
    </div>
  );
}

function QuestRow({
  quest,
  steersStory,
  onPatch,
  onRemove,
}: {
  quest: Quest;
  steersStory: boolean;
  onPatch: (body: Record<string, unknown>) => void;
  onRemove: () => void;
}) {
  const { locale, t } = useLocale();
  const done = quest.objectives.filter((objective) => objective.done).length;
  // The same doors as the row's own controls, for a right-click or a long press.
  const items: ContextMenuItem[] = steersStory
    ? [
        ...(Object.keys(STATUS_GLYPH) as QuestStatus[]).map((status) => ({
          id: status,
          label: t("recordUi.quest.mark", { status: questStatusLabel(status, locale).toLowerCase() }),
          glyph: STATUS_GLYPH[status],
          disabled: quest.status === status,
          onSelect: () => onPatch({ status }),
        })),
        ...(quest.source === "dm"
          ? [{ id: "remove", label: t("recordUi.quest.remove"), glyph: "quest-failed", tone: "danger" as const, separated: true, onSelect: onRemove }]
          : []),
      ]
    : [];
  return (
    <ContextMenu as="li" items={items} label={quest.title} className={cn(panelRow, quest.status !== "active" && "opacity-70")}>
      <div className="flex flex-wrap items-center gap-1.5">
        <GameIcon icon={{ kind: "glyph", key: STATUS_GLYPH[quest.status] }} size="size-6" className="shrink-0" />
        {quest.visibility === "dm" ? <EyeOff className="size-3.5 shrink-0 text-violet-300" aria-label={t("recordUi.quest.private")} /> : null}
        <span className="min-w-[9rem] flex-1 text-sm font-medium leading-5 text-stone-100">{quest.title}</span>
        {quest.objectives.length ? (
          <span key={done} className="count-pop text-[11px] tabular-nums text-stone-400">
            {done}/{quest.objectives.length}
          </span>
        ) : null}
        {steersStory ? (
          <Select<QuestStatus>
            value={quest.status}
            onChange={(status) => onPatch({ status })}
            options={statusOptions(locale)}
            label={t("recordUi.quest.status")}
            size="sm"
            align="end"
            className="pk-w-26"
          />
        ) : (
          <GlyphChip glyph={STATUS_GLYPH[quest.status]}>{questStatusLabel(quest.status, locale)}</GlyphChip>
        )}
        {steersStory && quest.source === "dm" ? (
          <KitButton tone="iconDanger" always onClick={onRemove} aria-label={t("recordUi.quest.remove")}>
            <Trash2 className="size-3.5" />
          </KitButton>
        ) : null}
      </div>
      {quest.objectives.length ? (
        <ul className="reveal mt-1.5 space-y-1">
          {quest.objectives.map((objective) => (
            <li key={objective.id} className="flex items-center gap-2 text-xs">
              {steersStory ? (
                <Tick
                  checked={objective.done}
                  label={t("recordUi.quest.doneObjective", { text: objective.text })}
                  onChange={(checked) =>
                    onPatch({
                      objectives: quest.objectives.map((entry) => (entry.id === objective.id ? { ...entry, done: checked } : entry)),
                    })
                  }
                />
              ) : (
                <TickMark checked={objective.done} />
              )}
              <span className={cn(objective.done ? "text-stone-500 line-through" : "text-stone-300")}>{objective.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {quest.source === "arc" ? <p className="reveal mt-1 text-[11px] text-stone-500">{t("recordUi.quest.sourceStory")}</p> : null}
    </ContextMenu>
  );
}
