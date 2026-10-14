"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator, type MessageKey } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { combatName } from "@/lib/i18n/combat-ui-presentations";
import { Keyboard, LocateFixed, Lock, Maximize2, Unlock, Users, ZoomIn, ZoomOut } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/cn";
import { TILE_FEET } from "@/lib/battlemap/types";
import { playingSheet } from "@/lib/battlemap/hand-table";

import { TokenFace, type FaceLookup } from "@/app/campaigns/[campaignId]/BoardChrome";
import { DmInitiativePanel } from "@/app/campaigns/[campaignId]/DmInitiativePanel";
import type { PublicEncounter } from "@/lib/db/encounter-view";

// Two pieces of BattleMapPanel that carry no state of their own, split out so
// the panel stays readable: the camera buttons in the board's corner, and the
// order the initiative rail opens.

const CAMERA_BUTTON =
  "motion-press rounded-md border border-stone-700/80 bg-stone-950/85 p-1 text-stone-300 hover:text-stone-100";

// What the board does with the keyboard and the mouse (issue 90). The keys
// only reach the board while it has focus, so the list says that first.
const BOARD_KEYS: Array<{ keys: string[]; does: MessageKey }> = [
  { keys: ["←", "↑", "↓", "→"], does: "boardUi.keys.moveView" },
  { keys: ["+", "−"], does: "boardUi.keys.zoom" },
  { keys: ["0"], does: "boardUi.keys.fit" },
  { keys: ["Esc"], does: "boardUi.keys.cancel" },
  { keys: ["Scroll"], does: "boardUi.keys.pointer" },
  { keys: ["Drag"], does: "boardUi.keys.moveView" },
];

// The short form, shown for a few seconds each time the board takes the
// keyboard (board.css fades it), so the keys are learned by using the board
// and not by hunting for a help page. Hidden where there is no keyboard to
// speak of.
export function BoardKeyStrip() {
  const { t } = useLocale();
  return (
    <div className="board-keys-strip" aria-hidden="true">
      <span>
        <span className="kbd-key">←</span>
        <span className="kbd-key">↑</span>
        <span className="kbd-key">↓</span>
        <span className="kbd-key">→</span>{t("boardUi.strip.move")}
      </span>
      <span>
        <span className="kbd-key">+</span>
        <span className="kbd-key">−</span>{t("boardUi.strip.zoom")}
      </span>
      <span>
        <span className="kbd-key">0</span>{t("boardUi.strip.fit")}
      </span>
    </div>
  );
}

// Camera controls: corner buttons for everyone, the follow toggle for a
// player in a fight, and the DM's pull, lock and free.
export function BoardCameraControls({
  onZoomIn,
  onZoomOut,
  onFit,
  followTurn,
  onFollowTurn,
  onDirect,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  // Null when this seat has no follow toggle (the DM, or a scene board).
  followTurn: boolean | null;
  onFollowTurn: () => void;
  // Present for the DM seat only.
  onDirect?: (mode: "pull" | "lock" | "free") => void;
}) {
  const { t } = useLocale();
  const [keysOpen, setKeysOpen] = useState(false);
  return (
    <div className={cn("board-cam absolute bottom-2 right-2 z-10 flex flex-col gap-1", onDirect && "board-cam-long")}>
      {keysOpen ? (
        <div
          id="board-keys-card"
          role="note"
          className="board-keys-card"
          onKeyDown={(event) => {
            if (isComposingInput(event)) return;
            if (event.key === "Escape") {
              event.stopPropagation();
              setKeysOpen(false);
            }
          }}
        >
          <p className="board-eyebrow mb-1.5">{t("boardUi.keys.title")}</p>
          <dl>
            {BOARD_KEYS.map((row) => (
              <div key={row.keys.join()}>
                <dt>
                  {row.keys.map((key) => (
                    <span key={key} className="kbd-key">
                      {key === "Scroll" ? t("boardUi.keys.scroll") : key === "Drag" ? t("boardUi.keys.drag") : key}
                    </span>
                  ))}
                </dt>
                <dd>{t(row.does)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-1.5 text-[10px] leading-snug text-[#8f8aab]">
            {t("boardUi.keys.focus")}
          </p>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setKeysOpen((open) => !open)}
        aria-label={t("boardUi.keys.label")}
        aria-expanded={keysOpen}
        aria-controls="board-keys-card"
        title={t("boardUi.keys.tip")}
        className={cn(CAMERA_BUTTON, "board-keys-button", keysOpen && "border-amber-600/80 text-amber-200")}
      >
        <Keyboard className="size-4" />
      </button>
      <button type="button" onClick={onZoomIn} aria-label={t("boardUi.camera.in")} className={CAMERA_BUTTON}>
        <ZoomIn className="size-4" />
      </button>
      <button type="button" onClick={onZoomOut} aria-label={t("boardUi.camera.out")} className={CAMERA_BUTTON}>
        <ZoomOut className="size-4" />
      </button>
      <button type="button" onClick={onFit} aria-label={t("boardUi.camera.fit")} className={CAMERA_BUTTON}>
        <Maximize2 className="size-4" />
      </button>
      {followTurn !== null ? (
        <button
          type="button"
          onClick={onFollowTurn}
          aria-pressed={followTurn}
          aria-label={t("boardUi.camera.follow")}
          title={t("boardUi.camera.follow")}
          className={cn(
            "motion-press rounded-md border p-1",
            followTurn
              ? "border-amber-600/80 bg-amber-950/70 text-amber-200"
              : "border-stone-700/80 bg-stone-950/85 text-stone-400 hover:border-amber-500/50 hover:text-amber-100 hover:shadow-glow-gold",
          )}
        >
          <LocateFixed className="size-4" />
        </button>
      ) : null}
      {onDirect ? (
        <>
          <button
            type="button"
            title={t("boardUi.camera.pullTip")}
            aria-label={t("boardUi.camera.pull")}
            onClick={() => onDirect("pull")}
            className="motion-press rounded-md border border-amber-700/70 bg-stone-950/85 p-1 text-amber-200 hover:bg-amber-950/60"
          >
            <Users className="size-4" />
          </button>
          <button
            type="button"
            title={t("boardUi.camera.lockTip")}
            aria-label={t("boardUi.camera.lock")}
            onClick={() => onDirect("lock")}
            className={CAMERA_BUTTON}
          >
            <Lock className="size-4" />
          </button>
          <button
            type="button"
            title={t("boardUi.camera.free")}
            aria-label={t("boardUi.camera.free")}
            onClick={() => onDirect("free")}
            className={CAMERA_BUTTON}
          >
            <Unlock className="size-4" />
          </button>
        </>
      ) : null}
    </div>
  );
}

// The rail on the board is display only; a tap opens the order itself: the
// DM's editable panel, the plain list for everyone else.
export function BoardOrderDialog({
  open,
  onOpenChange,
  campaignId,
  encounter,
  round,
  canDirect,
  faceOf,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  encounter: PublicEncounter | null;
  round: number;
  canDirect: boolean;
  faceOf: FaceLookup;
}) {
  const { locale, t } = useLocale();
  return (
    <Dialog
      open={open && Boolean(encounter)}
      onOpenChange={onOpenChange}
      title={t("boardUi.order.title", { round })}
      width="w-[min(94vw,26rem)]"
    >
      {encounter && canDirect ? (
        <DmInitiativePanel campaignId={campaignId} encounter={encounter} faceOf={faceOf} />
      ) : encounter ? (
        <ol className="space-y-1">
          {encounter.order.map((entry, index) => (
            <li
              key={`${entry.id}-${index}`}
              className={cn(
                "flex items-center gap-2 rounded-md border px-2 py-1 text-sm",
                index === encounter.turnIndex
                  ? "border-amber-700 bg-amber-950/40 text-amber-100"
                  : "border-stone-800 text-stone-300",
              )}
            >
              <TokenFace
                candidates={faceOf(entry)}
                name={combatName(entry.name, entry.kind, locale)}
                enemy={entry.kind === "enemy"}
                className="size-7 rounded-full border border-stone-700"
              />
              <span className="min-w-0 flex-1 truncate">{combatName(entry.name, entry.kind, locale)}{entry.reflex ? <sup className="motion-pop ml-0.5 text-[9px] text-amber-300" title={entry.extra ? t("combatUi.order.extraHint", { feature: entry.extra }) : t("boardUi.order.reflexTip")}>{t(entry.extra ? "combatUi.order.extra" : "boardUi.order.second")}</sup> : null}</span>
              {index === encounter.turnIndex ? (
                <span className="text-[10px] uppercase tracking-wide text-amber-300">{t("boardUi.order.now")}</span>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
    </Dialog>
  );
}

// The line under the board saying what a tap does now, for the DM's tools
// and for a player's turn. Split from BattleMapPanel.tsx.
export function boardHintText(input: {
  canDirect: boolean;
  tool: string;
  teleporting: boolean;
  held: boolean;
  liveOrigin: boolean;
  pointing: boolean;
  drawing: boolean;
  targeting: boolean;
  canMove: boolean;
  scene: boolean;
  budgetLeft: number;
  hasToken: boolean;
}, locale: AppLocale = DEFAULT_LOCALE): string {
  const t = createTranslator(locale);
  const { canDirect, tool, teleporting, held, liveOrigin, pointing, drawing, targeting, canMove, scene } = input;
  return canDirect
    ? tool === "draw"
      ? t("boardUi.hint.drawDm")
      : teleporting
      ? t("boardUi.hint.teleport")
      : held
        ? t("boardUi.hint.held")
        : tool === "measure"
          ? liveOrigin
            ? t("boardUi.hint.direction")
            : t("boardUi.hint.origin")
          : tool === "point"
            ? t("boardUi.hint.pointDm")
            : tool === "place"
              ? t("boardUi.hint.place")
              : t("boardUi.hint.dm")
    : pointing
      ? t("boardUi.hint.point")
      : drawing
        ? t("boardUi.hint.draw")
      : targeting
        ? t("boardUi.hint.target")
        : canMove
          ? scene
            ? t("boardUi.hint.scene")
            : t("boardUi.hint.move", { feet: input.budgetLeft * TILE_FEET })
          : input.hasToken
            ? t("boardUi.hint.wait")
            : t("boardUi.hint.noToken");
}

// The turn order under the board, the pointer's entry lit; a thief's second
// turn in round 1 is marked (Thief's Reflexes). Split from BattleMapPanel.tsx.
export function BoardOrderStrip({ encounter, faceOf }: { encounter: PublicEncounter | null | undefined; faceOf: FaceLookup }) {
  const { locale, t } = useLocale();
  if (!encounter?.orderReady) return null;
  return (
    <ol className="flex flex-wrap gap-1 text-[11px] text-stone-400">
      {encounter.order.map((entry, index) => (
        <li
          key={`${entry.id}-${index}`}
          className={cn(
            "flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2",
            index === encounter.turnIndex ? "bg-amber-950/60 font-medium text-amber-300" : "bg-stone-900",
          )}
        >
          <TokenFace
            candidates={faceOf(entry)}
            name={combatName(entry.name, entry.kind, locale)}
            enemy={entry.kind === "enemy"}
            className={cn(
              "size-5 rounded-full border",
              index === encounter.turnIndex ? "border-amber-500" : "border-stone-700",
            )}
          />
          {combatName(entry.name, entry.kind, locale)}
          {entry.hidden ? t("boardUi.order.hidden") : ""}
          {entry.reflex ? <sup className="motion-pop ml-0.5 text-[9px] text-amber-300" title={entry.extra ? t("combatUi.order.extraHint", { feature: entry.extra }) : t("boardUi.order.reflexTip")}>{t(entry.extra ? "combatUi.order.extra" : "boardUi.order.second")}</sup> : null}
        </li>
      ))}
    </ol>
  );
}

// Which of their characters a player runs, for the enlarged tabletop: the
// dialog covers the Party panel's Play as, so the choice is offered here too
// (issue #189). Nothing for a player with one character, or a table that
// seats one each. The switch is the same request the Party panel sends; the
// stream's roster_updated moves the Hand, the HUD and the board after it.
export function PlayAsStrip({
  campaignId,
  sheets,
  meUserId,
  activeSheetId,
  multiCharacter,
}: {
  campaignId: string;
  sheets: Array<{ id: string; name: string; userId: string; isCompanion?: boolean }>;
  meUserId: string;
  activeSheetId: string;
  multiCharacter: string;
}) {
  const { t: syncT } = useSyncLocale();
  const [switching, setSwitching] = useState("");
  const own = sheets.filter((sheet) => sheet.userId === meUserId && !sheet.isCompanion);
  if (!meUserId || multiCharacter === "off" || own.length < 2) {
    return null;
  }
  const playing = playingSheet(sheets, meUserId, activeSheetId);
  async function playAs(sheetId: string) {
    setSwitching(sheetId);
    try {
      await fetch(`/api/campaigns/${campaignId}/sheet/switch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId: sheetId }),
      });
    } finally {
      setSwitching("");
    }
  }
  return (
    <div role="radiogroup" aria-label={syncT("upstreamUi.38ae74823bc4")} data-pill-group="" className="flex items-center gap-1">
      <span className="eyebrow mr-1 text-[9px] text-stone-400">{syncT("upstreamUi.38ae74823bc4")}</span>
      {own.map((sheet) => {
        const current = playing?.id === sheet.id;
        return (
          <button
            key={sheet.id}
            type="button"
            role="radio"
            aria-checked={current}
            aria-disabled={switching === sheet.id}
            data-on={current ? "" : undefined}
            onClick={() => {
              if (!current && switching !== sheet.id) void playAs(sheet.id);
            }}
            className={cn(
              "motion-press rounded-full border px-2 py-0.5 text-[11px] transition-colors duration-[var(--dur-quick,150ms)]",
              current
                ? "border-amber-500/60 bg-amber-400/10 text-amber-200"
                : "border-stone-700 text-stone-300 hover:border-amber-500/60 hover:text-amber-200",
              switching === sheet.id && "opacity-50",
            )}
          >
            {sheet.name}
          </button>
        );
      })}
    </div>
  );
}
