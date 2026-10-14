"use client";
import { createTranslator } from "@/lib/i18n/translator";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { ArrowDown, ArrowUp, Check, GripVertical, ListRestart, Rows3 } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { CampaignMember } from "@/lib/campaign-types";
import {
  moveInPartyOrder,
  normalizePartyOrder,
  orderParty,
  placeInPartyOrder,
  samePartyOrder,
} from "@/lib/party-order";
import { KitButton, PanelError } from "./PanelKit";

// Arrange the Party panel (issue 240): each viewer puts the cards in their
// own order, kept on their membership so it follows their account. A drag
// handle for a pointer or a finger, up and down for a keyboard or a thumb,
// and nothing here opens a sheet or takes a seat: the handle is its own
// control, apart from the card's button.

const EMPTY: string[] = [];

export type PartyDrag = { id: string; over: { id: string; side: "before" | "after" } | null };

export function usePartyOrder<T extends { id: string }>({
  campaignId,
  member,
  cards,
}: {
  campaignId: string;
  member: CampaignMember | undefined;
  cards: readonly T[];
}) {
  const saved = member?.partyOrder ?? EMPTY;
  const savedKey = saved.join("|");
  // The list as this seat last put it, shown ahead of the account's copy
  // while saves are in flight and until the stream echoes the last one
  // back (quick successive moves each build on the one before, never on an
  // earlier echo). It is let go a moment after the last save lands, so a
  // change from another device shows once this seat is idle.
  const [local, setLocal] = useState<string[] | null>(null);
  const [inFlight, setInFlight] = useState(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const order = local && (inFlight > 0 || savedKey !== local.join("|")) ? local : saved;
  const [arranging, setArranging] = useState(false);
  const [error, setError] = useState("");
  const [moved, setMoved] = useState("");
  const [drag, setDrag] = useState<PartyDrag | null>(null);
  const movedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (movedTimer.current) clearTimeout(movedTimer.current);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

  const ids = cards.map((card) => card.id);
  const ordered = orderParty(cards, normalizePartyOrder(order, ids));
  const shownIds = ordered.map((card) => card.id);

  async function save(next: string[], id: string) {
    setLocal(next);
    setError("");
    setInFlight((count) => count + 1);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    if (id) {
      setMoved("");
      if (movedTimer.current) clearTimeout(movedTimer.current);
      // Next frame, so the attribute leaves and returns and the card settles
      // again even when the same card moves twice.
      requestAnimationFrame(() => {
        setMoved(id);
        movedTimer.current = setTimeout(() => setMoved(""), 700);
      });
    }
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/members/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partyOrder: next }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setLocal(null);
        setError(String(data.error ?? "The order could not be saved."));
      }
    } catch {
      setLocal(null);
      setError(createTranslator("en")("upstreamUi.native.partyNetwork"));
    } finally {
      setInFlight((count) => {
        if (count === 1) {
          // The echo is normally here already (same order, no visible
          // change); if it is not, the account's copy takes over a moment
          // later.
          if (settleTimer.current) clearTimeout(settleTimer.current);
          settleTimer.current = setTimeout(() => setLocal(null), 3_000);
        }
        return count - 1;
      });
    }
  }

  return {
    ordered,
    arranging,
    setArranging,
    error,
    moved,
    drag,
    setDrag,
    // Whether this viewer has an order of their own (else the campaign's).
    custom: normalizePartyOrder(order, ids).length > 0,
    move: (id: string, delta: number) => {
      const next = moveInPartyOrder(shownIds, id, delta);
      if (!samePartyOrder(next, shownIds)) void save(next, id);
    },
    place: (id: string, targetId: string, side: "before" | "after") => {
      const next = placeInPartyOrder(shownIds, id, targetId, side);
      if (!samePartyOrder(next, shownIds)) void save(next, id);
    },
    reset: () => {
      if (order.length || saved.length) void save([], "");
    },
  };
}

// The row above the cards: Arrange, then Done and Reset order while
// arranging. Only when there is more than one card to arrange.
export function PartyOrderBar({
  count,
  arranging,
  custom,
  error,
  onToggle,
  onReset,
}: {
  count: number;
  arranging: boolean;
  custom: boolean;
  error: string;
  onToggle: () => void;
  onReset: () => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  if (count < 2) {
    return null;
  }
  return (
    <div className="party-order-bar" data-arranging={arranging ? "" : undefined}>
      <div className="flex flex-wrap items-center gap-1.5">
        <KitButton
          onClick={onToggle}
          aria-pressed={arranging}
          title={arranging ? syncT("upstreamUi.902dcdd05c6d") : syncT("upstreamUi.5a8f7e793475")}
          className="party-order-toggle"
        >
          {arranging ? <Check className="size-3.5" /> : <Rows3 className="size-3.5" />}
          {arranging ? syncT("upstreamUi.11a6767d5674") : syncT("upstreamUi.d557a972ab06")}
        </KitButton>
        {arranging && custom ? (
          <KitButton onClick={onReset} title={syncT("upstreamUi.ca3e99078a66")} className="party-order-reset">
            <ListRestart className="size-3.5" /> {syncT("upstreamUi.78643863b6f8")}</KitButton>
        ) : null}
        {arranging ? (
          <span className="reveal text-[11px] text-stone-500">{syncT("upstreamUi.c3aa70c6a710")}</span>
        ) : null}
      </div>
      {error ? <PanelError>{upstreamOwnedText(error, locale)}</PanelError> : null}
    </div>
  );
}

// The handle on one card while arranging: a grip to drag with a pointer or
// a finger (arrow keys move it from the keyboard) and an arrow each way.
export function PartyOrderHandle({
  id,
  name,
  index,
  count,
  drag,
  onMove,
  onPlace,
  onDrag,
}: {
  id: string;
  name: string;
  index: number;
  count: number;
  drag: PartyDrag | null;
  onMove: (id: string, delta: number) => void;
  onPlace: (id: string, targetId: string, side: "before" | "after") => void;
  onDrag: (drag: PartyDrag | null) => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const dragging = drag?.id === id;

  // Where the pointer is over the list: the card under it and which half.
  function overAt(x: number, y: number): PartyDrag["over"] {
    for (const element of document.elementsFromPoint(x, y)) {
      const card = (element as HTMLElement).closest?.("[data-party-card]") as HTMLElement | null;
      if (!card) continue;
      const targetId = card.dataset.partyCard ?? "";
      if (!targetId || targetId === id) return null;
      const rect = card.getBoundingClientRect();
      return { id: targetId, side: y < rect.top + rect.height / 2 ? "before" : "after" };
    }
    return null;
  }
  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    onDrag({ id, over: null });
  }
  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    onDrag({ id, over: overAt(event.clientX, event.clientY) });
  }
  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const over = overAt(event.clientX, event.clientY);
    onDrag(null);
    if (over) onPlace(id, over.id, over.side);
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      onMove(id, event.key === "ArrowUp" ? -1 : 1);
    }
  }
  return (
    <span className="party-order-handle" data-dragging={dragging ? "" : undefined}>
      <button
        type="button"
        className={cn("party-grip motion-press", dragging && "party-grip-active")}
        aria-label={syncT("upstreamUi.partyDrag", { name })}
        title={syncT("upstreamUi.c8f9f73a9012")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => onDrag(null)}
        onKeyDown={onKeyDown}
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
      <KitButton
        onClick={() => onMove(id, -1)}
        disabled={index <= 0}
        aria-label={syncT("upstreamUi.partyUp", { name })}
        title={syncT("upstreamUi.c66feb5eb8f2")}
        className="party-order-step"
      >
        <ArrowUp className="size-3.5" />
      </KitButton>
      <KitButton
        onClick={() => onMove(id, 1)}
        disabled={index >= count - 1}
        aria-label={syncT("upstreamUi.partyDown", { name })}
        title={syncT("upstreamUi.40bb50da160c")}
        className="party-order-step"
      >
        <ArrowDown className="size-3.5" />
      </KitButton>
    </span>
  );
}
