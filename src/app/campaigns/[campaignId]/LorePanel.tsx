"use client";

import { loadErrorText, readUiResponse, requestErrorText, uiRequestError, type UiRequestError } from "@/lib/i18n/api-errors";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { copyLoreTitle, loreCategoryLabel, parseCommaList } from "@/lib/i18n/prep-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { EmptyState } from "@/components/EmptyState";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTourPrepare } from "@/lib/tours/prepare";
import { collectTags } from "@/lib/workshop/pickers";
import { WORLD_LORE_CATEGORIES, type LoreLinkTarget } from "@/lib/dm/world-lore-logic";
import { SectionHead } from "@/components/ui/SectionHead";
import { Sheet } from "@/components/ui/Sheet";
import { KitButton, LoadFailed, PanelLoading } from "./PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { LoreEntryActions } from "@/app/workshop/lore/LoreEntryActions";
import { LoreEditorForm } from "@/app/workshop/lore/LoreEditorForm";
import { LoreEntryRow, MentionedIn } from "@/app/workshop/lore/LoreEntryRow";
import { LoreBody } from "@/app/workshop/lore/LoreFields";
import { LoreRows } from "@/app/workshop/lore/LoreRows";
import { blankLoreDraft, draftFromEntry, type LoreDraft, type LoreEntryView } from "@/app/workshop/lore/types";

// World lore builder: the lead's world bible. Entries feed the DM prompt
// (pinned always, the rest retrieved by relevance) and the search_lore
// tool. Party-visible, lead-edited, usable before and during the campaign.
//
// Two layouts over one set of requests. "list" is the campaign's: entries
// grouped by category, each expanding in place, the author form inline at
// the top. "rows" is the workshop's: a search box over full-width rows, and
// the same form with the same buttons in a sheet.
export function LorePanel({
  campaignId,
  campaignLocale = DEFAULT_LOCALE,
  steersStory,
  isDm = false,
  layout = "list",
  members,
}: {
  campaignId: string;
  campaignLocale?: AppLocale;
  steersStory: boolean;
  // Holds the DM seat. "Show this now" and the cast and bestiary link
  // lists go through DM-only routes, so an AI campaign's lead edits the
  // binder without them.
  isDm?: boolean;
  layout?: "list" | "rows";
  // The table, for the "some players" audience. Absent in the workshop.
  members?: Array<{ userId: string; username: string }>;
}) {
  const { locale, t } = useLocale();
  const [loading, setLoading] = useState(true);
  // Whether a load has landed and what the last one said (issue 140): a
  // refused list is shown in the server's words, never as "no lore yet".
  const { loaded, loadError, settle } = useLoadStatus();
  const [reload, setReload] = useState(0);
  const [entries, setEntries] = useState<LoreEntryView[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  // Rows only: an entry opened by somebody who cannot edit it, so they can
  // still read the whole of it.
  const [readingId, setReadingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LoreDraft>(blankLoreDraft());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  // Names beyond the lore itself that a [[link]] can point at.
  const [linkTargets, setLinkTargets] = useState<{ cast: string[]; monsters: string[] } | null>(
    null,
  );
  const rows = layout === "rows";

  useEffect(() => {
    let cancelled = false;
    readLoad<{ entries?: LoreEntryView[] }>(fetch(`/api/campaigns/${campaignId}/lore`), "The lore").then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      if (outcome.payload && Array.isArray(outcome.payload.entries)) {
        setEntries(outcome.payload.entries);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, reload, settle]);
  const retry = () => {
    setLoading(true);
    setReload((current) => current + 1);
  };

  // What [[links]] in a body may point at: the other entries. An NPC or a
  // place by that name is the workshop's to resolve later; here a link to
  // an entry opens it.
  const targets: LoreLinkTarget[] = entries.map((entry) => ({ kind: "lore", id: entry.id, name: entry.title }));
  function followLink(target: LoreLinkTarget) {
    const entry = entries.find((candidate) => candidate.id === target.id);
    if (entry) {
      if (steersStory) {
        startEdit(entry);
      } else {
        setReadingId(entry.id);
      }
    }
  }

  function startAdd() {
    setDraft(blankLoreDraft());
    setEditingId(null);
    setAdding(true);
  }

  // The tour's "open the editor" step, answered where the editor is a sheet.
  useTourPrepare((name) => {
    if (name === "open-lore-editor" && rows && steersStory && !adding && editingId === null) {
      startAdd();
    }
  });

  function startEdit(entry: LoreEntryView) {
    setDraft(draftFromEntry(entry));
    setAdding(false);
    setEditingId(entry.id);
  }

  function closeEditor() {
    setAdding(false);
    setEditingId(null);
    setReadingId(null);
  }

  async function submitDraft() {
    if (!draft.title.trim() || !draft.body.trim()) return;
    setBusy(true); setError(null);
    try {
      const payload = { ...draft, tags: parseCommaList(draft.tags), audience: draft.audience?.length ? draft.audience : null };
      const data = await readUiResponse<{ entry?: LoreEntryView }>(fetch(`/api/campaigns/${campaignId}/lore${editingId ? `/${editingId}` : ""}`, { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }), "lore.saveError");
      if (data.entry) setEntries(current => editingId ? current.map(entry => entry.id === editingId ? data.entry! : entry) : [...current, data.entry!]);
      setAdding(false); setEditingId(null);
    } catch (failure) { setError(uiRequestError(failure, "lore.saveError")); }
    finally { setBusy(false); }
  }
  async function togglePin(entry: LoreEntryView) {
    setError(null);
    try {
      const data = await readUiResponse<{ entry?: LoreEntryView }>(fetch(`/api/campaigns/${campaignId}/lore/${entry.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pinned: !entry.pinned }) }), "lore.pinError");
      if (data.entry) setEntries(current => current.map(row => row.id === entry.id ? data.entry! : row));
    } catch (failure) { setError(uiRequestError(failure, "lore.pinError")); }
  }
  async function remove(entryId: string): Promise<boolean> {
    setError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/lore/${entryId}`, { method: "DELETE" }), "lore.removeError");
      setEntries(current => current.filter(entry => entry.id !== entryId));
      return true;
    } catch (failure) { setError(uiRequestError(failure, "lore.removeError")); return false; }
  }
  async function duplicate(entry: LoreEntryView) {
    setBusy(true); setError(null);
    try {
      const payload = { category: entry.category, title: copyLoreTitle(entry.title, campaignLocale), body: entry.body, tags: entry.tags, visibility: entry.visibility, imagePath: entry.imagePath, audience: entry.audience ?? null, attachmentPath: entry.attachmentPath ?? "", style: entry.style ?? "plain" };
      const data = await readUiResponse<{ entry?: LoreEntryView }>(fetch(`/api/campaigns/${campaignId}/lore`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }), "lore.saveError");
      if (data.entry) setEntries(current => [...current, data.entry!]);
    } catch (failure) { setError(uiRequestError(failure, "lore.saveError")); }
    finally { setBusy(false); }
  }

  const categories = WORLD_LORE_CATEGORIES.filter((category) =>
    entries.some((entry) => entry.category === category),
  );

  const editorOpen = adding || editingId !== null;

  // [[Link]] another entry by picking it: every name the body renderer
  // resolves, not only other lore. The cast and the DM's own monsters are
  // read once the editor opens, since they are only needed for this list.
  useEffect(() => {
    // Not the DM: the lists stay empty and no DM route is asked.
    if (!editorOpen || linkTargets !== null || !isDm) {
      return;
    }
    let cancelled = false;
    Promise.all([
      fetch(`/api/campaigns/${campaignId}/dm/npcs`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { npcs?: Array<{ name: string }> } | null) =>
          (data?.npcs ?? []).map((npc) => npc.name),
        )
        .catch(() => [] as string[]),
      fetch(`/api/campaigns/${campaignId}/dm/bestiary`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { monsters?: Array<{ draft: { name: string } }> } | null) =>
          (data?.monsters ?? []).map((monster) => monster.draft.name),
        )
        .catch(() => [] as string[]),
    ]).then(([cast, monsters]) => {
      if (!cancelled) {
        setLinkTargets({ cast, monsters });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [editorOpen, linkTargets, campaignId, isDm]);
  const linkable = [
    ...entries
      .filter((entry) => entry.id !== editingId)
      .map((entry) => ({ value: entry.title, label: t("lore.linkLore", { name: entry.title }) })),
    ...(linkTargets?.cast ?? []).map((name) => ({ value: name, label: t("lore.linkCast", { name }) })),
    ...(linkTargets?.monsters ?? []).map((name) => ({ value: name, label: t("lore.linkMonster", { name }) })),
  ];
  const knownTags = collectTags(entries);

  // Show this now (section 5.2): the same engine call the model makes.
  async function showNow(entry: LoreEntryView) {
    setError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/dm/invoke`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "show_handout", args: { loreId: entry.id } }) }), "lore.showError");
    } catch (failure) { setError(uiRequestError(failure, "lore.showError")); }
  }

  // The author form is the same fields in both layouts; only what wraps it
  // differs.
  const editorForm = (
    <>
      {error ? <p role="alert" className="text-xs text-red-300">{requestErrorText(locale, error)}</p> : null}
      <LoreEditorForm
        draft={draft}
        onChange={setDraft}
        linkable={linkable}
        knownTags={knownTags}
        members={members}
        targets={targets}
        rows={rows}
      />
      <div className="flex gap-1.5" data-tour="lore-save">
        <KitButton tone="primary" onClick={submitDraft} disabled={busy || !draft.title.trim() || !draft.body.trim()} busy={busy}>
          {editingId ? t("prep.save") : t("prep.add")}
        </KitButton>
        <KitButton
          onClick={() => {
            setAdding(false);
            setEditingId(null);
          }}
        >
          <X className="size-3.5" />  {t("prep.cancel")} </KitButton>
      </div>
    </>
  );

  if (rows) {
    const editing = editingId ? entries.find((entry) => entry.id === editingId) ?? null : null;
    const reading = readingId ? entries.find((entry) => entry.id === readingId) ?? null : null;
    return (
      <div className="space-y-3">
        {error ? <p role="alert" className="text-xs text-red-300">{requestErrorText(locale, error)}</p> : null}
        {loaded && loadError ? <LoadFailed error={loadErrorText(locale, loadError, "lore.loadError")} onRetry={retry} /> : null}
        {loading ? (
          <PanelLoading label={t("prep.loading")} />
        ) : !loaded && loadError ? (
          <LoadFailed error={loadErrorText(locale, loadError, "lore.loadError")} onRetry={retry} />
        ) : (
          <LoreRows
            entries={entries}
            steersStory={steersStory}
            onOpen={(entry) => (steersStory ? startEdit(entry) : setReadingId(entry.id))}
            onNew={startAdd}
          />
        )}
        <Sheet
          open={editorOpen || reading !== null}
          onOpenChange={(next) => {
            if (!next) {
              closeEditor();
            }
          }}
          title={editing?.title || reading?.title || t("lore.new")}
          className="lg:w-[min(92vw,40rem)]"
        >
          {editorOpen ? (
            <div className="reveal space-y-1.5">
              {editorForm}
              {editing ? (
                <LoreEntryActions
                  entry={editing}
                  onPin={() => void togglePin(editing)}
                  onDuplicate={() => void duplicate(editing)}
                  onDelete={() => void remove(editing.id).then(removed => { if (removed) closeEditor(); })}
                />
              ) : null}
            </div>
          ) : reading ? (
            <div className="reveal space-y-1">
              <LoreBody entry={reading} targets={targets} onLink={followLink} dmView={steersStory} />
              {reading.tags.length ? (
                <p className="reveal text-[11px] text-stone-500">{reading.tags.join(" · ")}</p>
              ) : null}
              <MentionedIn campaignId={campaignId} entryId={reading.id} onOpen={followLink} />
            </div>
          ) : null}
        </Sheet>
      </div>
    );
  }

  return (
    <div className="panel rounded-lg p-3">
      {error && !editorOpen ? <p role="alert" className="text-xs text-red-300">{requestErrorText(locale, error)}</p> : null}
      <SectionHead
        title={t("lore.heading")}
        glyph="system-lore"
        aside={
          steersStory && !editorOpen ? (
            <KitButton onClick={startAdd}>
              <Plus className="size-3.5" />  {t("lore.add")} </KitButton>
          ) : null
        }
      />
      {loading ? (
        <PanelLoading label={t("prep.loading")} />
      ) : null}
      {!loading && loadError ? <LoadFailed error={loadErrorText(locale, loadError, "lore.loadError")} onRetry={retry} /> : null}
      {!loading && loaded && !loadError && !entries.length && !editorOpen ? (
        <EmptyState size="sm" art="scrolls" title={steersStory ? t("lore.emptyLead") : t("lore.emptyPlayer")} />
      ) : null}
      {editorOpen ? (
        <div className="reveal mb-2 space-y-1.5 rounded-lg border border-amber-500/20 bg-stone-950/60 p-2.5">
          {editorForm}
        </div>
      ) : null}
      {categories.map((category) => (
        <div key={category} className="mb-2">
          <SectionHead title={loreCategoryLabel(category, locale)} glyph="tab-journal" level="h4" aside={entries.filter((entry) => entry.category === category).length} />
          <ul className="stagger space-y-1">
            {entries
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <LoreEntryRow
                  key={entry.id}
                  entry={entry}
                  steersStory={steersStory}
                  targets={targets}
                  onLink={followLink}
                  campaignId={campaignId}
                  onShow={isDm && entry.visibility === "party" ? () => void showNow(entry) : undefined}
                  onEdit={() => startEdit(entry)}
                  onPin={() => void togglePin(entry)}
                  onDuplicate={() => void duplicate(entry)}
                  onDelete={() => void remove(entry.id)}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
