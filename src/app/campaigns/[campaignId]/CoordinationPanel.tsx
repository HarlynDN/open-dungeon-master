"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { coordinationPlace } from "@/lib/i18n/coordination-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { Check, ListOrdered, Loader2, Minus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/SectionHead";
import { PanelError, kitButtonClass, panelField } from "./PanelKit";
import { SequenceEditor } from "./SequenceEditor";
import {
  PLAN_MAX_CHARS,
  orderKey,
  sequenceOf,
  unconfirmedOrder,
  waitingOn,
  type CoordinationEntry,
  type CoordinationPhase,
  type PlanSequence,
} from "@/lib/dm/coordination-logic";

// The plan the party is coordinating (issue 254), above the composer for
// every seat. Each player drafts a line per character they control, changes
// it until they mark it Ready, or passes; anyone in the plan may ask a
// companion for something; the lead can resolve it early (the missing pass)
// or set it aside. What each character means to do is shown to the whole
// party, so they can fit their moves together. Nothing reaches the DM until
// the plan resolves (src/lib/dm/coordination.ts). When the lead puts the
// plan in order (issue 292) every seat sees it as numbered steps, and a
// player whose Ready the new order took back is told where they stand now.


export function CoordinationPanel({
  campaignId,
  phase,
  meUserId,
  steersStory,
}: {
  campaignId: string;
  phase: CoordinationPhase;
  meUserId: string;
  steersStory: boolean;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // The lead's order being edited, before it is saved for everyone.
  const [ordering, setOrdering] = useState<PlanSequence | null>(null);
  const waiting = waitingOn(phase);
  const mine = phase.entries.some((entry) => !entry.companion && entry.userId === meUserId);
  const sequence = sequenceOf(phase);
  const unconfirmed = unconfirmedOrder(phase);
  const byId = new Map(phase.entries.map((entry) => [entry.characterId, entry]));

  async function send(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/coordination`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? syncT("upstreamUi.bbd50729e5f9"));
        return false;
      }
      return true;
    } catch {
      setError(syncT("upstreamUi.a1b564859cbf"));
      return false;
    } finally {
      setBusy(false);
    }
  }

  const draftOf = (entry: CoordinationEntry) => drafts[entry.characterId] ?? entry.text;
  const setDraft = (entry: CoordinationEntry, text: string) =>
    setDrafts((current) => ({ ...current, [entry.characterId]: text.slice(0, PLAN_MAX_CHARS) }));
  const settle = async (entry: CoordinationEntry, state: "drafting" | "ready" | "pass") => {
    if (await send({ action: "plan", characterId: entry.characterId, text: draftOf(entry), state, orderSeen: orderKey(phase) })) {
      setDrafts((current) => {
        const next = { ...current };
        delete next[entry.characterId];
        return next;
      });
    }
  };

  const saveOrder = async (next: PlanSequence | null) => {
    if (await send({ action: "order", sequence: next })) {
      setOrdering(null);
    }
  };

  // Each character's line in the plan.
  const entryRow = (entry: CoordinationEntry): ReactNode => {
    const own = !entry.companion && entry.userId === meUserId;
    const settled = entry.state === "ready" || entry.state === "pass";
    return (
      <li
        key={entry.characterId}
        data-coordination-entry={entry.characterId}
        data-state={entry.state}
        data-order-changed={entry.orderChanged ? "" : undefined}
        className={cn(
          "rounded-md border px-2.5 py-2 transition-colors duration-200",
          entry.state === "ready"
            ? "border-emerald-700/50 bg-emerald-950/15"
            : entry.orderChanged
              ? "border-amber-500/60 bg-amber-950/20"
              : "border-stone-800 bg-stone-950/40",
        )}
      >
        <div className="flex items-center gap-1.5 text-xs">
          {entry.state === "ready" ? (
            <Check className="motion-pop size-3.5 text-emerald-400" aria-hidden="true" />
          ) : entry.state === "pass" ? (
            <Minus className="size-3.5 text-stone-500" aria-hidden="true" />
          ) : (
            <span className="inline-block size-3.5 text-center text-[10px] leading-3 text-amber-300" aria-hidden="true">
              ...
            </span>
          )}
          <span className="font-medium text-stone-200">{entry.name}</span>
          <span className="text-[11px] text-stone-500">
            {entry.companion
              ? entry.text
                ? syncT("upstreamUi.coord.requested", { who: entry.requestedBy ?? syncT("upstreamUi.coord.party") })
                : syncT("upstreamUi.930ae61ee6b0")
              : entry.orderChanged
                ? syncT("upstreamUi.3bda48dafb63")
                : syncT(`upstreamUi.coord.${entry.state}`)}
          </span>
        </div>

        {own && entry.orderChanged ? (
          <p role="status" className="motion-pop mt-1.5 rounded border border-amber-500/40 bg-amber-950/30 px-2 py-1 text-[11px] text-amber-100" data-order-notice>
            {syncT("upstreamUi.coord.orderChanged", { place: sequence ? syncT("upstreamUi.coord.nowAt", { name: entry.name, place: coordinationPlace(phase, entry.characterId, locale) }) : syncT("upstreamUi.coord.allNow") })}
          </p>
        ) : null}

        {own && !settled ? (
          <div className="mt-1.5 space-y-1.5">
            <textarea
              value={draftOf(entry)}
              onChange={(event) => setDraft(entry, event.target.value)}
              rows={2}
              maxLength={PLAN_MAX_CHARS}
              placeholder={
                sequence
                  ? syncT("upstreamUi.coord.stepPrompt", { name: entry.name })
                  : syncT("upstreamUi.coord.prompt", { name: entry.name })
              }
              aria-label={syncT("upstreamUi.coord.part", { name: entry.name })}
              className={cn(panelField, "w-full resize-y text-xs")}
            />
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                disabled={busy || !draftOf(entry).trim()}
                onClick={() => void settle(entry, "ready")}
                className={kitButtonClass("primary")}
                data-coordination-ready
              >
                {busy ? <Loader2 className="size-3.5 animate-spin" /> : null}
                {syncT("upstreamUi.5fa7aac5375c")}</button>
              <button
                type="button"
                disabled={busy || draftOf(entry) === entry.text}
                onClick={() => void settle(entry, "drafting")}
                className={kitButtonClass("small")}
              >
                {syncT("upstreamUi.c8a8ad725e36")}</button>
              <button type="button" disabled={busy} onClick={() => void settle(entry, "pass")} className={kitButtonClass("small")} data-coordination-pass>
                {syncT("upstreamUi.ebdf8cc00bc4")}</button>
            </div>
          </div>
        ) : entry.text ? (
          <p className="mt-1 whitespace-pre-wrap text-xs text-stone-300" data-coordination-text>
            {entry.text}
          </p>
        ) : null}

        {own && settled ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => void send({ action: "plan", characterId: entry.characterId, state: "drafting" })}
            className={cn(kitButtonClass("small"), "mt-1.5")}
            data-coordination-change
          >
            {syncT("upstreamUi.c0bf75bd78bf")}</button>
        ) : null}

        {entry.companion && mine ? (
          <div className="mt-1.5 flex gap-1.5">
            <input
              value={draftOf(entry)}
              onChange={(event) => setDraft(entry, event.target.value)}
              maxLength={PLAN_MAX_CHARS}
              placeholder={syncT("upstreamUi.coord.askPrompt", { name: entry.name })}
              aria-label={syncT("upstreamUi.coord.askLabel", { name: entry.name })}
              className={cn(panelField, "w-auto min-w-0 flex-1 text-xs")}
            />
            <button
              type="button"
              disabled={busy || draftOf(entry) === entry.text}
              onClick={async () => {
                if (await send({ action: "request", characterId: entry.characterId, text: draftOf(entry) })) {
                  setDrafts((current) => {
                    const next = { ...current };
                    delete next[entry.characterId];
                    return next;
                  });
                }
              }}
              className={kitButtonClass("small", "shrink-0")}
              data-coordination-request
            >
              {draftOf(entry).trim() ? syncT("upstreamUi.coord.ask") : syncT("upstreamUi.164546a9c548")}
            </button>
          </div>
        ) : null}
      </li>
    );
  };

  return (
    <section className="panel ornate reveal mb-2 rounded-lg border-amber-500/40 p-3" data-coordination={phase.id} data-ordered={sequence ? "" : undefined} aria-label={syncT("upstreamUi.ef1bb997e66c")}>
      <SectionHead
        title={syncT("upstreamUi.f59897ea0ab8")}
        glyph="tab-party"
        level="h3"
        aside={waiting.length ? syncT("upstreamUi.coord.waitingCount", { count: waiting.length }) : syncT("upstreamUi.coord.allReady")}
      />
      <p className="mb-2 text-xs text-stone-400">
        {phase.prompt ? <span className="mr-1 font-serif italic text-amber-200/80">{phase.prompt}</span> : null}
        {sequence
          ? syncT("upstreamUi.7c96df370ee0")
          : syncT("upstreamUi.1d1f4d2e4da2")}
      </p>
      {sequence ? (
        <ol className="stagger space-y-2" aria-label={syncT("upstreamUi.c88b69013747")}>
          {sequence.map((ids, index) => {
            const members = ids.flatMap((id) => (byId.has(id) ? [byId.get(id)!] : []));
            const passedBefore = sequence
              .slice(0, index)
              .flat()
              .flatMap((id) => (byId.get(id)?.state === "pass" ? [byId.get(id)!.name] : []));
            return (
              <li key={`step-${index}-${ids.join("+")}`} data-coordination-step={index + 1} className="reveal">
                <p className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-wide text-amber-200/80">
                  <span className="rounded-full border border-amber-500/40 px-1.5 font-medium tabular-nums">{index + 1}</span>
                  {index === 0 ? syncT("upstreamUi.coord.first") : syncT("upstreamUi.coord.afterStep", { step: index })}
                  {members.length > 1 ? <span className="normal-case tracking-normal text-stone-400">{syncT("upstreamUi.coord.together")}</span> : null}
                </p>
                {passedBefore.length ? (
                  <p className="mb-1 text-[11px] text-amber-300/80" data-step-pass-note>
                    {syncT(passedBefore.length === 1 ? "upstreamUi.coord.passedOne" : "upstreamUi.coord.passedMany", { names: passedBefore.join(locale === "en" ? ", " : "、"), pronoun: passedBefore.length === 1 ? "it" : "them" })}
                  </p>
                ) : null}
                <ul className="space-y-2">{members.map(entryRow)}</ul>
              </li>
            );
          })}
        </ol>
      ) : (
        <ul className="stagger space-y-2">{phase.entries.map(entryRow)}</ul>
      )}

      {steersStory && ordering ? (
        <div className="reveal mt-2 rounded-md border border-amber-500/30 bg-stone-950/50 p-2" data-coordination-ordering>
          <p className="mb-1.5 text-[11px] text-stone-400">
            {syncT("upstreamUi.16630c2ae41d")}</p>
          <SequenceEditor
            items={phase.entries.map((entry) => ({ id: entry.characterId, name: entry.name, companion: entry.companion }))}
            sequence={ordering}
            onChange={setOrdering}
            disabled={busy}
            label={syncT("upstreamUi.dda7ee33137e")}
          />
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <button
              type="button"
              disabled={busy}
              onClick={() => void saveOrder(ordering.length > 1 ? ordering : null)}
              className={kitButtonClass("primary")}
              data-coordination-save-order
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : null}
              {ordering.length > 1 ? syncT("upstreamUi.f2146e42a5bd") : syncT("upstreamUi.8069fe4b1ec2")}
            </button>
            {sequence ? (
              <button type="button" disabled={busy} onClick={() => void saveOrder(null)} className={kitButtonClass("small")} data-coordination-clear-order>
                {syncT("upstreamUi.f90683717cd2")}</button>
            ) : null}
            <button type="button" disabled={busy} onClick={() => setOrdering(null)} className={kitButtonClass("small")}>
              {syncT("upstreamUi.19766ed6ccb2")}</button>
          </div>
        </div>
      ) : null}

      {steersStory ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {!ordering ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => setOrdering(sequence ?? phase.entries.map((entry) => [entry.characterId]))}
              className={kitButtonClass("small")}
              data-coordination-order
            >
              <ListOrdered className="size-3.5" />
              {sequence ? syncT("upstreamUi.55e62a99425a") : syncT("upstreamUi.f46da3257885")}
            </button>
          ) : null}
          <button
            type="button"
            disabled={busy || unconfirmed.length > 0}
            onClick={() => void send({ action: "resolve" })}
            className={kitButtonClass("small")}
            title={
              unconfirmed.length
                ? syncT(unconfirmed.length === 1 ? "upstreamUi.coord.reconfirmOne" : "upstreamUi.coord.reconfirmMany", { names: unconfirmed.join(locale === "en" ? " and " : "、"), verb: unconfirmed.length === 1 ? "was" : "were" })
                : waiting.length
                  ? syncT("upstreamUi.coord.willPass", { names: waiting.join(locale === "en" ? ", " : "、") })
                  : syncT("upstreamUi.786ba018b367")
            }
            data-coordination-resolve
          >
            {waiting.length ? syncT("upstreamUi.coord.resolveNow", { names: waiting.join(locale === "en" ? ", " : "、") }) : syncT("upstreamUi.2613894a1866")}
          </button>
          <button type="button" disabled={busy} onClick={() => void send({ action: "cancel" })} className={kitButtonClass("small")} data-coordination-cancel>
            {syncT("upstreamUi.c5b8d818139a")}</button>
        </div>
      ) : null}
      {steersStory && unconfirmed.length ? (
        <p className="motion-pop mt-1.5 text-[11px] text-amber-300" role="status" data-order-waiting>
          {syncT("upstreamUi.coord.waitingAgain", { names: unconfirmed.join(locale === "en" ? " and " : "、") })}
        </p>
      ) : null}
      {error ? <PanelError className="mt-1.5">{upstreamOwnedText(error, locale)}</PanelError> : null}
    </section>
  );
}
