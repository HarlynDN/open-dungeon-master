"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { GameIcon } from "@/components/ui/GameIcon";
import { cn } from "@/lib/cn";
import type { HandCard } from "@/lib/battlemap/hand";
import {
  HAND_SEATS,
  addToHand,
  missingFromHand,
  moveInHand,
  removeFromHand,
  type HandLayout,
} from "@/lib/battlemap/hand-layout";
import { handCardName, handCostLabel } from "@/lib/i18n/hand-presentations";
import { replayAnimation } from "@/lib/motion/replay";

// Customize Hand (issue 231): every card the character holds right now, each
// marked In Hand or In More, with the seats counted. Adding past the last
// seat is refused in words and changes nothing; the player chooses what goes.
// Placement only: a card in More is played from there exactly as before, and
// every card keeps the rules' own reason when it cannot be played.
export function HandArrange({
  cards,
  working,
  arranged,
  urgent,
  displaced,
  fresh,
  onChange,
  onReset,
  onDone,
}: {
  // Every card in the hand now, in the hand's own order.
  cards: HandCard[];
  // The layout being arranged: the saved one, or what the automatic split
  // shows now (startingLayout), so the first change moves one card.
  working: HandLayout;
  // Whether the player has a saved arrangement (else the hand is automatic).
  arranged: boolean;
  // Cards the moment has seated ahead of the chosen ones (Escape, Stand up).
  urgent: HandCard[];
  displaced: HandCard[];
  fresh: HandCard[];
  onChange: (layout: HandLayout) => Promise<string | null>;
  onReset: () => Promise<string | null>;
  onDone: () => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const [notice, setNotice] = useState("");
  const [moved, setMoved] = useState<{ id: string; seq: number } | null>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const byId = new Map(cards.map((card) => [card.id, card]));
  const inHand = working.fan.map((id) => byId.get(id)).filter((card): card is HandCard => Boolean(card));
  const chosen = new Set(working.fan);
  const inMore = cards.filter((card) => !chosen.has(card.id) && card.id !== "basic:end-turn" && !urgent.includes(card));
  const missing = missingFromHand(working, cards).length;
  const freshIds = new Set(fresh.map((card) => card.id));
  const used = working.fan.length;

  const refuse = (text: string) => {
    setNotice(text);
    replayAnimation(noticeRef.current, "shake-x var(--dur-beat) var(--ease-snap) both");
  };
  const apply = async (layout: HandLayout, id: string) => {
    setNotice("");
    setMoved((current) => ({ id, seq: (current?.seq ?? 0) + 1 }));
    const error = await onChange(layout);
    if (error) refuse(error);
  };

  const row = (card: HandCard, index: number, place: "hand" | "more") => {
    const seat = place === "hand" ? working.fan.indexOf(card.id) : -1;
    const flash = moved?.id === card.id;
    return (
      <li
        key={`${card.id}:${flash ? moved?.seq : 0}`}
        className="hand-arrange-row"
        data-place={place}
        data-moved={flash ? "true" : undefined}
        style={{ "--i": index } as CSSProperties}
      >
        <div className="flex min-h-14 w-full items-center gap-2 rounded-xl border border-stone-700/60 bg-stone-900/50 px-2.5 py-2">
          <GameIcon icon={card.icon} size="size-9" />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="truncate font-display text-sm font-semibold text-stone-100">{handCardName(card, locale)}</span>
              <span
                className={cn(
                  "hand-arrange-badge shrink-0 rounded-full border px-1.5 py-px text-[10px] uppercase tracking-wider",
                  place === "hand"
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-200"
                    : "border-stone-600/70 bg-stone-800/60 text-stone-400",
                )}
              >
                {place === "hand" ? syncT("upstreamUi.handSeat", { seat: seat + 1 }) : syncT("upstreamUi.a4bf297601ae")}
              </span>
              {freshIds.has(card.id) ? (
                <span className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-1.5 py-px text-[10px] uppercase tracking-wider text-emerald-200">
                  {syncT("upstreamUi.18fdd549b2ed")}</span>
              ) : null}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-amber-200/80">{handCostLabel(card.cost, locale)}</span>
          </span>
          {place === "hand" ? (
            <span className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="hand-arrange-step motion-press"
                aria-label={syncT("upstreamUi.handMoveLeft", { name: handCardName(card, locale) })}
                disabled={seat <= 0}
                onClick={() => void apply(moveInHand(working, card.id, -1), card.id)}
              >
                <ArrowUp className="size-4" />
              </button>
              <button
                type="button"
                className="hand-arrange-step motion-press"
                aria-label={syncT("upstreamUi.handMoveRight", { name: handCardName(card, locale) })}
                disabled={seat >= working.fan.length - 1}
                onClick={() => void apply(moveInHand(working, card.id, 1), card.id)}
              >
                <ArrowDown className="size-4" />
              </button>
              <button
                type="button"
                className="hand-arrange-move motion-press"
                onClick={() => void apply(removeFromHand(working, card.id), card.id)}
              >
                {syncT("upstreamUi.088751951e98")}</button>
            </span>
          ) : (
            <button
              type="button"
              className="hand-arrange-move motion-press"
              data-full={used >= HAND_SEATS ? "true" : undefined}
              onClick={() => {
                const next = addToHand(working, card);
                if ("error" in next) {
                  refuse(next.error);
                  return;
                }
                void apply(next.layout, card.id);
              }}
            >
              {syncT("upstreamUi.33af3744f677")}</button>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="hand-arrange-seats" aria-label={syncT("upstreamUi.handCount", { used, max: HAND_SEATS })}>
          {Array.from({ length: HAND_SEATS }, (_, index) => (
            <span key={index} className="hand-arrange-seat" data-filled={index < used ? "true" : undefined} />
          ))}
        </span>
        <span className="text-xs text-stone-300">
          {syncT("upstreamUi.handCountHint", { used, max: HAND_SEATS })}
        </span>
      </div>
      {urgent.length ? (
        <p className="reveal mb-2 rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
          {syncT(urgent.length === 1 ? "upstreamUi.handUrgentOne" : "upstreamUi.handUrgentMany", {
            names: urgent.map(card => handCardName(card, locale)).join(locale === "en" ? " and " : "、"),
            displaced: displaced.length ? syncT(displaced.length === 1 ? "upstreamUi.handDisplacedOne" : "upstreamUi.handDisplacedMany", { names: displaced.map(card => handCardName(card, locale)).join(locale === "en" ? ", " : "、") }) : "",
          })}
        </p>
      ) : null}
      {missing ? (
        <p className="mb-2 text-xs text-stone-400">
          {syncT(missing === 1 ? "upstreamUi.handMissingOne" : "upstreamUi.handMissingMany", { count: missing })}
        </p>
      ) : null}
      <p
        ref={noticeRef}
        role="alert"
        className={cn("mb-2 rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-2 text-xs text-red-200", notice ? "" : "hidden")}
      >
        {upstreamOwnedText(notice, locale)}
      </p>
      <div className="-mx-1 min-h-0 overflow-y-auto px-1 pb-1">
        <h3 className="mb-1.5 font-display text-[11px] uppercase tracking-[0.2em] text-amber-200/90">{syncT("upstreamUi.504465b9aed9")}</h3>
        {inHand.length ? (
          <ul className="flex flex-col gap-1.5">{inHand.map((card, index) => row(card, index, "hand"))}</ul>
        ) : (
          <p className="text-xs text-stone-500">{syncT("upstreamUi.59e2db8ad989")}</p>
        )}
        <h3 className="mb-1.5 mt-4 font-display text-[11px] uppercase tracking-[0.2em] text-stone-400">{syncT("upstreamUi.a4bf297601ae")}</h3>
        {inMore.length ? (
          <ul className="flex flex-col gap-1.5">{inMore.map((card, index) => row(card, index + inHand.length, "more"))}</ul>
        ) : (
          <p className="text-xs text-stone-500">{syncT("upstreamUi.07ebe7056b5f")}</p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-700/50 pt-3">
        <button type="button" onClick={onDone} className="hand-arrange-done motion-press">
          {syncT("upstreamUi.11a6767d5674")}</button>
        {arranged ? (
          <button
            type="button"
            className="hand-arrange-move motion-press"
            onClick={async () => {
              setNotice("");
              const error = await onReset();
              if (error) refuse(error);
            }}
          >
            {syncT("upstreamUi.0c2860d83d0a")}</button>
        ) : (
          <span className="text-xs text-stone-500">{syncT("upstreamUi.f7d5f49d22ad")}</span>
        )}
      </div>
    </div>
  );
}
