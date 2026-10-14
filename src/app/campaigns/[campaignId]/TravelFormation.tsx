"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { formationView, type FormationChange } from "@/lib/dm/formation-logic";
import type { PartyState } from "@/lib/dm/party-logic";
import { replayAnimation } from "@/lib/motion/replay";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { ui } from "@/lib/ui";

// The party's travel formation (issue 230), for every seat: the order in
// force, who is not placed yet, and a change waiting on answers. The party
// lead (or the DM seat at a table a person runs) arranges it; a player whose
// character a change moves agrees or asks for a change, for each of their
// characters. The DM reads the same record on every turn.
export function TravelFormation({
  campaignId,
  sheets,
  party,
  meUserId,
  arranges,
}: {
  campaignId: string;
  // The characters the formation arranges: those in play, companions too.
  sheets: CharacterSheet[];
  party: Pick<PartyState, "marchingOrder" | "formationChange"> | undefined;
  meUserId: string;
  arranges: boolean;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const [editing, setEditing] = useState<string[] | null>(null);
  const [moved, setMoved] = useState<{ id: string; seq: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [asking, setAsking] = useState<{ id: string; note: string } | null>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const partyIds = sheets.map((sheet) => sheet.id);
  const order = party?.marchingOrder ?? [];
  const change: FormationChange | null = party?.formationChange ?? null;
  const { placed, unplaced } = formationView(order, partyIds);
  const byId = new Map(sheets.map((sheet) => [sheet.id, sheet]));
  const nameOf = (id: string) => byId.get(id)?.name ?? syncT("upstreamUi.coord.someone");

  if (sheets.length < 2) {
    return null;
  }

  const say = (text: string) => {
    setNotice(text);
    replayAnimation(noticeRef.current, "shake-x var(--dur-beat) var(--ease-snap) both");
  };
  async function send(body: Record<string, unknown>): Promise<boolean> {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/party/formation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        say(data.error || "Could not change the formation.");
        return false;
      }
      return true;
    } catch {
      say("Could not reach the server.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  // Where a character stands, said for a list read aloud as much as seen.
  const rankWord = (index: number, length: number) =>
    length < 2 ? "" : index === 0 ? "Front" : index === length - 1 ? "Rear" : "Middle";
  const who = (id: string) => {
    const sheet = byId.get(id);
    return sheet?.isCompanion ? "ally the DM plays" : sheet?.userId === meUserId ? "yours" : "";
  };

  const list = (ids: string[], tone: "active" | "proposed") => (
    <ol className="flex flex-col gap-1">
      {ids.map((id, index) => (
        <li
          key={`${id}:${moved?.id === id ? moved.seq : 0}`}
          className="formation-row flex min-h-9 items-center gap-2 rounded-lg border px-2 py-1"
          data-tone={tone}
          data-moved={moved?.id === id ? "true" : undefined}
          style={{ "--i": index } as CSSProperties}
        >
          <span className="formation-rank font-mono text-[11px] text-amber-200/90">{index + 1}</span>
          <span className="min-w-0 flex-1 truncate text-sm text-stone-100">{nameOf(id)}</span>
          {who(id) ? <span className="shrink-0 text-[10px] text-stone-500">{upstreamOwnedText(who(id), locale)}</span> : null}
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-stone-400">{upstreamOwnedText(rankWord(index, ids.length), locale)}</span>
        </li>
      ))}
    </ol>
  );

  // The answers a change is waiting on, and the buttons a player answers
  // with for each of their own characters it moves.
  const answers = (pending: FormationChange) => (
    <ul className="mt-2 flex flex-col gap-1.5">
      {pending.affected.map((id) => {
        const answer = pending.answers[id];
        const mine = byId.get(id)?.userId === meUserId;
        return (
          <li key={id} className="text-xs">
            <span className="text-stone-200">{nameOf(id)}</span>{" "}
            <span
              className={cn(
                "formation-answer rounded-full border px-1.5 py-px text-[10px] uppercase tracking-wider",
                answer?.answer === "agree"
                  ? "border-emerald-400/50 text-emerald-200"
                  : answer?.answer === "change"
                    ? "border-amber-400/60 text-amber-200"
                    : "border-stone-600 text-stone-400",
              )}
            >
              {answer?.answer === "agree" ? syncT("upstreamUi.d6210ef09e18") : answer?.answer === "change" ? syncT("upstreamUi.c8781da41445") : syncT("upstreamUi.6e293a8c009e")}
            </span>
            {answer?.note ? <span className="ml-1 italic text-stone-300">&ldquo;{answer.note}&rdquo;</span> : null}
            {mine ? (
              asking?.id === id ? (
                <span className="mt-1.5 flex flex-col gap-1.5">
                  <textarea
                    value={asking.note}
                    onChange={(event) => setAsking({ id, note: event.target.value.slice(0, 160) })}
                    maxLength={160}
                    rows={2}
                    aria-label={syncT("upstreamUi.formationChange", { name: nameOf(id) })}
                    placeholder={syncT("upstreamUi.726a1f4d03dc")}
                    className={cn(ui.input, "text-xs")}
                  />
                  <span className="flex gap-1.5">
                    <button
                      type="button"
                      disabled={busy}
                      className={cn(ui.btnSmall, "text-xs")}
                      onClick={async () => {
                        if (await send({ do: "answer", characterId: id, answer: "change", note: asking.note })) setAsking(null);
                      }}
                    >
                      {syncT("upstreamUi.f6f4688ff23d")}</button>
                    <button type="button" className={cn(ui.btnSmall, "text-xs")} onClick={() => setAsking(null)}>
                      {syncT("upstreamUi.19766ed6ccb2")}</button>
                  </span>
                </span>
              ) : (
                <span className="mt-1 flex gap-1.5">
                  <button
                    type="button"
                    disabled={busy || answer?.answer === "agree"}
                    className={cn(ui.btnSmall, "text-xs")}
                    onClick={() => void send({ do: "answer", characterId: id, answer: "agree" })}
                  >
                    {syncT("upstreamUi.da288642c92f")}</button>
                  <button type="button" disabled={busy} className={cn(ui.btnSmall, "text-xs")} onClick={() => setAsking({ id, note: "" })}>
                    {syncT("upstreamUi.f445fc4ffc97")}</button>
                </span>
              )
            ) : null}
          </li>
        );
      })}
    </ul>
  );

  // ---- the lead's editor ----

  const draft = editing ?? [];
  const left = partyIds.filter((id) => !draft.includes(id));
  const step = (id: string, direction: -1 | 1) => {
    const index = draft.indexOf(id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= draft.length) return;
    const next = [...draft];
    [next[index], next[target]] = [next[target], next[index]];
    setEditing(next);
    setMoved((current) => ({ id, seq: (current?.seq ?? 0) + 1 }));
  };
  async function save(mode: "set" | "propose") {
    if (!draft.length) {
      say("Put at least one character in the formation.");
      return;
    }
    if (await send({ do: mode, order: draft })) setEditing(null);
  }

  return (
    <section className="formation reveal space-y-2" aria-label={syncT("upstreamUi.c983ae1e9fb2")}>
      <SectionHead title={syncT("upstreamUi.c983ae1e9fb2")} glyph="cue-travel" level="h3" aside={placed.length ? `${placed.length}` : undefined} />
      <p ref={noticeRef} role="alert" className={cn("text-xs text-red-300", notice ? "" : "hidden")}>
        {upstreamOwnedText(notice, locale)}
      </p>
      {editing ? (
        <div className="formation-editor space-y-2 rounded-xl border border-amber-500/30 bg-stone-900/60 p-2.5">
          <p className="text-xs text-stone-400">{syncT("upstreamUi.a2b335608c6a")}</p>
          <ol className="flex flex-col gap-1">
            {draft.map((id, index) => (
              <li
                key={`${id}:${moved?.id === id ? moved.seq : 0}`}
                className="formation-row flex min-h-10 items-center gap-1.5 rounded-lg border px-2 py-1"
                data-tone="editing"
                data-moved={moved?.id === id ? "true" : undefined}
              >
                <span className="formation-rank font-mono text-[11px] text-amber-200/90">{index + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-stone-100">{nameOf(id)}</span>
                <button type="button" className="formation-step motion-press" aria-label={syncT("upstreamUi.formationFront", { name: nameOf(id) })} disabled={index === 0} onClick={() => step(id, -1)}>
                  <ArrowUp className="size-4" />
                </button>
                <button type="button" className="formation-step motion-press" aria-label={syncT("upstreamUi.formationRear", { name: nameOf(id) })} disabled={index === draft.length - 1} onClick={() => step(id, 1)}>
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  className={cn(ui.btnSmall, "text-[11px]")}
                  aria-label={syncT("upstreamUi.formationLeave", { name: nameOf(id) })}
                  onClick={() => setEditing(draft.filter((entry) => entry !== id))}
                >
                  {syncT("upstreamUi.9a3c5460432b")}</button>
              </li>
            ))}
          </ol>
          {left.length ? (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
              <span>{syncT("upstreamUi.3b426a0b9c81")}</span>
              {left.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={cn(ui.btnSmall, "text-[11px]")}
                  onClick={() => {
                    setEditing([...draft, id]);
                    setMoved((current) => ({ id, seq: (current?.seq ?? 0) + 1 }));
                  }}
                >
                  {syncT("upstreamUi.formationAdd", { name: nameOf(id) })}
                </button>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button type="button" disabled={busy} className={cn(ui.btnPrimary, "text-xs")} onClick={() => void save("set")}>
              {syncT("upstreamUi.b7d0a349ffa8")}</button>
            <button type="button" disabled={busy} className={cn(ui.btnSecondary, "text-xs")} onClick={() => void save("propose")}>
              {syncT("upstreamUi.63e10b7200a3")}</button>
            <button type="button" className={cn(ui.btnSmall, "text-xs")} onClick={() => setEditing(null)}>
              {syncT("upstreamUi.19766ed6ccb2")}</button>
          </div>
          <p className="text-[11px] text-stone-500">
            {syncT("upstreamUi.f4909f127444")}</p>
        </div>
      ) : (
        <>
          {placed.length ? (
            list(placed, "active")
          ) : (
            <p className="text-xs text-stone-500">
              {syncT("upstreamUi.aff7d74e18ff")}{" "}
              {arranges ? syncT("upstreamUi.b9c3215a2990") : syncT("upstreamUi.68c16e7e09c9")}
            </p>
          )}
          {unplaced.length ? (
            <p className="text-xs text-stone-400">
              {syncT("upstreamUi.formationUnplaced", { names: unplaced.map(nameOf).join(locale === "en" ? ", " : "、") })}
            </p>
          ) : null}
          {change?.status === "proposed" ? (
            <div className="formation-proposal rounded-xl border border-dashed border-amber-400/50 bg-amber-400/5 p-2.5">
              <p className="mb-1.5 text-[11px] uppercase tracking-[0.18em] text-amber-200/90">
                {syncT("upstreamUi.formationProposed", { who: change.byName || syncT("upstreamUi.partyLead") })}
              </p>
              {list(change.order, "proposed")}
              {answers(change)}
              {arranges ? (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  <button type="button" disabled={busy} className={cn(ui.btnSmall, "text-xs")} onClick={() => void send({ do: "activate" })}>
                    {syncT("upstreamUi.5e576b60fb9f")}</button>
                  <button type="button" disabled={busy} className={cn(ui.btnSmall, "text-xs")} onClick={() => void send({ do: "withdraw" })}>
                    {syncT("upstreamUi.164546a9c548")}</button>
                </span>
              ) : null}
            </div>
          ) : change && change.affected.length ? (
            <div className="formation-moved rounded-xl border border-stone-700/60 bg-stone-900/50 p-2.5">
              <p className="text-xs text-stone-300">
                {syncT("upstreamUi.formationMoved", { who: change.byName || syncT("upstreamUi.partyLeadCapital"), names: change.affected.map(nameOf).join(locale === "en" ? ", " : "、") })}
              </p>
              {answers(change)}
              {arranges ? (
                <button type="button" disabled={busy} className={cn(ui.btnSmall, "mt-2 text-xs")} onClick={() => void send({ do: "withdraw" })}>
                  {syncT("upstreamUi.b2e4a8088c27")}</button>
              ) : null}
            </div>
          ) : null}
          {arranges ? (
            <button
              type="button"
              className={cn(ui.btnSecondary, "w-full text-xs")}
              onClick={() => {
                setNotice("");
                setEditing([...placed, ...unplaced]);
              }}
            >
              {placed.length ? syncT("upstreamUi.1b677e5e1c5c") : syncT("upstreamUi.228fa9f78a1c")}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
