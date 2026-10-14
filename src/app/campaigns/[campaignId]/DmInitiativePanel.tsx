"use client";

import { extraTurnTag } from "@/lib/battlemap/initiative-rows";
import { ChevronDown, ChevronUp, Clock, ListRestart, Plus, SkipBack, SkipForward, Trash2 } from "lucide-react";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { useState } from "react";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { cn } from "@/lib/cn";
import { ENTRY_NAME_MAX, MAX_INITIATIVE, MIN_INITIATIVE } from "@/lib/dm/initiative-edit";
import type { PublicEncounter } from "@/lib/db/encounter-view";
import { TokenFace, type FaceLookup } from "@/app/campaigns/[campaignId]/BoardChrome";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { UiRequestError } from "@/lib/i18n/api-errors";
import { combatErrorText, combatName } from "@/lib/i18n/combat-ui-presentations";

// The DM's hands on the turn order: reorder it, insert a slot for somebody
// the engine has no stat block for, delay, remove, hand the turn to a
// player, and step back when somebody clicked too fast.
//
// Stepping back moves the pointer and the round counter and nothing else. It
// does not give hit points back or un-tick a condition, because undoing what
// happened is what the audit trail is for, and a rewind that pretended
// otherwise would be worse than no rewind at all.

// Tap targets a thumb can hit on a phone (U:UD10): the icons stay small, the
// buttons around them do not.
const ROW_ICON =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-stone-500 hover:text-stone-200 disabled:opacity-40 motion-nudge";
const HEAD_ICON =
  "inline-flex size-9 items-center justify-center rounded-md border border-stone-700 text-stone-400 hover:text-stone-200 disabled:opacity-40 motion-press";

export function DmInitiativePanel({
  campaignId,
  encounter,
  faceOf,
}: {
  campaignId: string;
  encounter: PublicEncounter;
  // The pictures to try for an entry, best first. A row shows a face, not a
  // letter, wherever the caller knows one (docs/visual-overhaul-plan.md 5.1).
  faceOf?: FaceLookup;
}) {
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState(12);
  const errorText = combatErrorText(error, locale);

  async function send(body: unknown) {
    if (busy) {
      return false;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/initiative`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError({ data, fallback: "combatUi.error.order" });
        return false;
      }
      return true;
    } catch {
      setError({ data: {}, fallback: "combatUi.error.orderNetwork" });
      return false;
    } finally {
      setBusy(false);
    }
  }

  if (!encounter.orderReady) {
    return (
      <div className="mt-2 space-y-1 text-[11px] text-stone-500">
        <p>
          {t("combatUi.order.waiting")}
        </p>
        {encounter.staged?.length ? (
          <p className="reveal text-stone-400">
            {t("combatUi.order.staged", { entries: encounter.staged.map((entry) => `${entry.name} ${entry.initiative}`).join(t("combatUi.pending.listSeparator")) })}
          </p>
        ) : null}
        {errorText ? <p className="text-red-300">{errorText}</p> : null}
      </div>
    );
  }

  const current = encounter.order[encounter.turnIndex];
  const due = encounter.enemiesDue ?? [];

  return (
    <section className="mt-2 space-y-1.5 rounded-lg border border-stone-800 bg-stone-950/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center gap-1">
        <p className="mr-auto text-xs font-medium uppercase tracking-wide text-stone-500">
          {t("combatUi.order.title")}
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => void send({ op: "step", direction: "back" })}
          aria-label={t("combatUi.order.back")}
          title={t("combatUi.order.back")}
          className={HEAD_ICON}
        >
          <SkipBack className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void send({ op: "step", direction: "forward" })}
          aria-label={t("combatUi.order.forward")}
          title={t("combatUi.order.forward")}
          className={HEAD_ICON}
        >
          <SkipForward className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            if (
              await appConfirm(t("combatUi.order.resetConfirm"), {
                title: t("combatUi.order.reset"),
                actionLabel: t("combatUi.order.rollAgain"),
                tone: "plain",
              })
            ) {
              void send({ op: "reset" });
            }
          }}
          aria-label={t("combatUi.order.reset")}
          title={t("combatUi.order.reset")}
          className={HEAD_ICON}
        >
          <ListRestart className="size-3.5" />
        </button>
      </div>
      {due.length ? (
        // The enemies the pointer walked past, held for the DM to play before
        // the next player's turn (src/lib/dm/enemies-due.ts).
        <div className="reveal space-y-1.5 rounded-md border border-red-900/60 bg-red-950/30 px-2 py-1.5">
          <p className="text-xs text-red-100">
            {t("combatUi.order.before", { name: current ? combatName(current.name, current.kind, locale) : t("combatUi.order.nextPlayer") })}
            {due.map((enemy, index) => (
              <span key={enemy.id} className={cn("transition-colors duration-[260ms]", enemy.acted && "text-stone-500 line-through")}>
                {index ? t("combatUi.pending.listSeparator") : ""}
                {combatName(enemy.name, "enemy", locale)}
              </span>
            ))}
          </p>
          <p className="text-[11px] text-stone-400">
            {t("combatUi.order.enemyHelp")}
          </p>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              disabled={busy}
              onClick={() => void send({ op: "enemies", play: true })}
              className="min-h-9 rounded-md border border-red-800 bg-red-950/50 px-3 py-1 text-xs text-red-100 disabled:opacity-40 motion-press"
            >
              {t("combatUi.order.playRest")}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void send({ op: "enemies", play: false })}
              className="min-h-9 rounded-md border border-amber-700 bg-amber-950/50 px-3 py-1 text-xs text-amber-100 disabled:opacity-40 motion-press"
            >
              {t("combatUi.order.handOn")}
            </button>
          </div>
        </div>
      ) : encounter.companionTurn ? (
        <div className="reveal flex flex-wrap items-center gap-1.5 rounded-md border border-sky-900/60 bg-sky-950/30 px-2 py-1.5">
          <p className="mr-auto text-xs text-sky-100">
            {t("combatUi.order.companion", { name: encounter.companionTurn.name })}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void send({ op: "companion" })}
            className="min-h-9 rounded-md border border-sky-800 bg-sky-950/50 px-3 py-1 text-xs text-sky-100 disabled:opacity-40 motion-press"
          >
            {t("combatUi.order.playCompanion")}
          </button>
        </div>
      ) : null}
      <ol className="space-y-1">
        {encounter.order.map((entry, index) => (
          <li
            key={`${entry.id}-${index}`}
            className={cn(
              // The turn passes as a glow that moves, not one that blinks.
              "flex flex-wrap items-center gap-1 rounded-md border px-2 py-1 transition-[color,background-color,border-color,box-shadow] duration-[260ms] ease-settle",
              index === encounter.turnIndex
                ? "border-amber-700 bg-amber-950/40 shadow-glow-gold"
                : "border-stone-800",
            )}
          >
            <span className="w-6 shrink-0 text-right font-mono text-[10px] text-stone-500">
              {entry.initiative ?? ""}
            </span>
            <TokenFace
              candidates={faceOf?.(entry) ?? []}
              name={combatName(entry.name, entry.kind, locale)}
              enemy={entry.kind === "enemy"}
              className={cn(
                "size-6 rounded-full border",
                index === encounter.turnIndex ? "border-amber-500" : "border-stone-700",
                entry.hidden && "opacity-60",
              )}
            />
            <button
              type="button"
              disabled={busy || entry.kind !== "pc" || index === encounter.turnIndex}
              onClick={() => void send({ op: "goto", id: entry.id })}
              title={t(entry.kind === "pc" ? "combatUi.order.giveTurn" : "combatUi.order.playerOnly")}
              className={cn(
                "min-h-9 min-w-0 flex-1 truncate text-left text-xs disabled:cursor-default",
                index === encounter.turnIndex ? "text-amber-100" : "text-stone-300",
                entry.kind === "pc" && index !== encounter.turnIndex && "hover:text-amber-200",
              )}
            >
              {combatName(entry.name, entry.kind, locale)}
              <span className="ml-1.5 text-[10px] text-stone-600">
                {t(`combatUi.order.${entry.kind}`)}
                {entry.hidden ? t("combatUi.order.hidden") : ""}
                {entry.reflex ? (
                  <span className="motion-pop ml-1 text-amber-300" title={entry.extra ? t("combatUi.order.extraHint", { feature: entry.extra }) : t("combatUi.order.reflexHint")}>
                    {t(entry.extra ? "combatUi.order.extra" : "combatUi.order.reflex")}
                  </span>
                ) : null}
              </span>
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void send({ op: "move", id: entry.id, direction: "up" })}
              aria-label={t("combatUi.order.upAria", { name: combatName(entry.name, entry.kind, locale) })}
              title={t("combatUi.order.up")}
              className={ROW_ICON}
            >
              <ChevronUp className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void send({ op: "move", id: entry.id, direction: "down" })}
              aria-label={t("combatUi.order.downAria", { name: combatName(entry.name, entry.kind, locale) })}
              title={t("combatUi.order.down")}
              className={ROW_ICON}
            >
              <ChevronDown className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void send({ op: "delay", id: entry.id })}
              aria-label={t("combatUi.order.delayAria", { name: combatName(entry.name, entry.kind, locale) })}
              title={t("combatUi.order.delay")}
              className={ROW_ICON}
            >
              <Clock className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                if (await appConfirm(t("combatUi.order.removeConfirm", { name: combatName(entry.name, entry.kind, locale) }), { actionLabel: t("combatUi.order.removeAction") })) {
                  void send({ op: "remove", id: entry.id });
                }
              }}
              aria-label={t("combatUi.order.removeAria", { name: combatName(entry.name, entry.kind, locale) })}
              title={t("combatUi.order.remove")}
              className={cn(ROW_ICON, "hover:text-red-300")}
            >
              <Trash2 className="size-3.5" />
            </button>
          </li>
        ))}
      </ol>
      {adding ? (
        <div className="reveal flex flex-wrap items-center gap-1">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={ENTRY_NAME_MAX}
            placeholder={t("combatUi.order.namePlaceholder")}
            className="min-h-9 min-w-0 flex-1 rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200 placeholder:text-stone-600 motion-input"
          />
          <NumberStepper
            value={initiative}
            min={MIN_INITIATIVE}
            max={MAX_INITIATIVE}
            onChange={setInitiative}
            label={t("combatUi.order.initiative")}
            size="sm"
          />
          <button
            type="button"
            disabled={busy || !name.trim()}
            onClick={() => {
              void send({ op: "insert", name: name.trim(), initiative }).then((ok) => {
                if (ok) {
                  setName("");
                  setAdding(false);
                }
              });
            }}
            className="min-h-9 rounded-md border border-amber-700 bg-amber-950/50 px-3 py-1 text-xs text-amber-100 disabled:opacity-40 motion-press"
          >
            {t("combatUi.order.add")}
          </button>
          <button
            type="button"
            onClick={() => setAdding(false)}
            className="min-h-9 rounded-md border border-stone-700 px-3 py-1 text-xs text-stone-400 hover:text-stone-200 motion-press"
          >
            {t("combatUi.order.cancel")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex min-h-9 items-center gap-1 rounded-md border border-stone-700 px-3 py-1 text-xs text-stone-400 hover:text-stone-200 motion-press"
        >
          <Plus className="size-3.5" />
          {t("combatUi.order.slot")}
        </button>
      )}
      <p className="text-[11px] leading-4 text-stone-600">
        {t("combatUi.order.rewindHint")}
      </p>
      {errorText ? <p role="alert" className="motion-shake text-[11px] text-red-400">{errorText}</p> : null}
    </section>
  );
}
