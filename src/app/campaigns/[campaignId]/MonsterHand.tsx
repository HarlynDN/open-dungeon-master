"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { monsterHandText, monsterHandFrame, monsterCardName, monsterHandSentence, monsterHandRefusal, MONSTER_HAND_NOTICES } from "@/lib/i18n/monster-hand-presentations";
import { combatName, encounterHealthLabel } from "@/lib/i18n/combat-ui-presentations";
import { handRefusalText } from "@/lib/i18n/hand-material-presentations";
import { consoleNotice } from "@/lib/i18n/dm-console-presentations";
import { dmResultPresentation, type DmResultNames } from "@/lib/i18n/dm-result-presentations";
import { handCurrentActorName } from "@/lib/i18n/hand-presentations";

import { ArrowLeft, ChevronDown, Loader2, X } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { memo, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { Tooltip } from "@/components/ui/Tooltip";
import { HandCardFace, HandPreviewRows, typeLabel, typeTone } from "@/app/campaigns/[campaignId]/HandCardFace";
import type { HandCard } from "@/lib/battlemap/hand";
import { previewRows, type HandAim } from "@/lib/battlemap/hand-play";
import {
  deriveMonsterHand,
  monsterInvoke,
  takesManyTargets,
  type MonsterAdvantage,
} from "@/lib/battlemap/monster-hand";
import { describeAdjudicationResult } from "@/lib/dm/catalog-result";
import { effectiveMaxHp } from "@/lib/dm/condition-logic";
import { replayAnimation } from "@/lib/motion/replay";
import { effectiveAcFor } from "@/lib/srd";
import type { PublicEncounter } from "@/lib/db/encounter-view";
import type { CharacterSheet } from "@/lib/schemas/sheet";

// The DM's hand (issue #108): the monsters' turns as cards, above the
// message box where the players' Hand sits. The enemies the pointer walked
// past lead the roster (src/lib/dm/enemies-due.ts); any living enemy can be
// picked, as the console lets the DM correct anything. A played card is the
// console's own invoke call (monster-hand.ts), so the engine's rules hold.

const COLLAPSED_KEY = "odm:monster-hand-collapsed";
const STORE_EVENT = "odm-monster-hand-store";

function subscribeStore(callback: () => void) {
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeCollapsed(on: boolean) {
  try {
    window.localStorage.setItem(COLLAPSED_KEY, on ? "1" : "0");
  } catch {
    // Storage can be denied; the choice then lasts as long as the page.
  }
  window.dispatchEvent(new Event(STORE_EVENT));
}

type PartyChip = HandAim & { note: string };

const ADVANTAGE: Array<[MonsterAdvantage, string]> = [
  ["none", "Straight"],
  ["advantage", "Advantage"],
  ["disadvantage", "Disadvantage"],
];

function MonsterHandInner({
  campaignId,
  sheets,
  encounter,
  leaving,
}: {
  campaignId: string;
  sheets: CharacterSheet[];
  encounter: PublicEncounter;
  // The fight is over and the mount is about to go: the fan folds away.
  leaving?: boolean;
}) {
  const { locale } = useLocale();
  const due = useMemo(() => encounter.enemiesDue ?? [], [encounter.enemiesDue]);
  const dueIds = useMemo(() => new Set(due.map((entry) => entry.id)), [due]);
  // The living enemies with actions to play, the due ones first, in the
  // order they are owed.
  const roster = useMemo(() => {
    const living = encounter.enemies.filter((enemy) => enemy.status === "alive" && enemy.actions);
    const byId = new Map(living.map((enemy) => [enemy.id, enemy]));
    const first = due.flatMap((entry) => (byId.has(entry.id) ? [byId.get(entry.id)!] : []));
    return [...first, ...living.filter((enemy) => !dueIds.has(enemy.id))];
  }, [encounter.enemies, due, dueIds]);

  const [enemyId, setEnemyId] = useState<string | null>(null);
  const selected =
    roster.find((enemy) => enemy.id === enemyId) ??
    roster.find((enemy) => dueIds.has(enemy.id) && !enemy.actions?.acted) ??
    roster[0] ??
    null;
  const cards = selected ? deriveMonsterHand(selected) : [];

  // The party as targets. Their armour class is known to the DM, so the
  // preview's odds are real ones; the chip kind "enemy" is the preview's
  // word for "a target whose AC we know", not a judgement.
  const party = useMemo<PartyChip[]>(
    () =>
      sheets
        .filter((sheet) => !sheet.deathSaves?.dead)
        .map((sheet) => {
          const ac = effectiveAcFor(sheet);
          return {
            id: sheet.id,
            name: sheet.name,
            kind: "enemy" as const,
            nameRole: "character" as const,
            ac,
            conditions: sheet.conditions,
            note: monsterHandFrame("party", { current: sheet.currentHp, max: effectiveMaxHp(sheet), ac }, locale),
          };
        }),
    [sheets, locale],
  );

  const [pickedId, setPickedId] = useState<string | null>(null);
  const [targetIds, setTargetIds] = useState<string[]>([]);
  const [advantage, setAdvantage] = useState<MonsterAdvantage>("none");
  const [sending, setSending] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [receipt, setReceipt] = useState<{ result: unknown; names: DmResultNames } | null>(null);
  const resultNames = useMemo(() => ({ characters: sheets.map(sheet => sheet.name), enemies: encounter.enemies.map(enemy => enemy.name) }), [sheets, encounter.enemies]);
  const lines = useMemo(() => receipt ? describeAdjudicationResult(receipt.result, dmResultPresentation(locale, receipt.names)) : [], [receipt, locale]);
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const collapsed = useSyncExternalStore(subscribeStore, readCollapsed, () => false);

  const picked = cards.find((card) => card.id === pickedId && !card.disabled) ?? null;
  const many = picked ? takesManyTargets(picked) : false;
  const aimed = party.filter((chip) => targetIds.includes(chip.id));
  const aim = aimed[0] ?? null;
  const defaultAim = aim ?? party[0] ?? null;
  const conditions = selected?.conditions ?? EMPTY;
  // Cheap enough to work out each render; the compiler memoizes what it can.
  const rows = picked ? previewRows(picked, picked.target === "none" ? null : defaultAim, conditions) : [];
  const sentence = picked && selected ? monsterHandSentence(selected.name, picked, aimed.map((chip) => chip.name), locale) : "";
  const needsTarget = Boolean(picked && picked.target !== "none");
  const ready = Boolean(picked) && (!needsTarget || aimed.length > 0);

  function say(text: string) {
    setNotice(text);
    replayAnimation(noticeRef.current, "shake-x var(--dur-beat) var(--ease-snap) both");
  }

  function clearAim() {
    setPickedId(null);
    setTargetIds([]);
    setAdvantage("none");
  }

  function pick(card: HandCard) {
    if (card.disabled) {
      say(card.disabled);
      return;
    }
    setNotice("");
    setTargetIds([]);
    setAdvantage("none");
    setPickedId((current) => (current === card.id ? null : card.id));
  }

  function toggleTarget(id: string) {
    setTargetIds((current) => {
      if (!many) {
        return current[0] === id ? [] : [id];
      }
      return current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id];
    });
  }

  async function commit() {
    if (!picked || !selected || sending) {
      return;
    }
    const call = monsterInvoke(picked, targetIds, advantage);
    if (!call) {
      say(many ? MONSTER_HAND_NOTICES.many : MONSTER_HAND_NOTICES.target);
      return;
    }
    setSending(true);
    setNotice("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(call),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; result?: unknown };
      const failure = data.result && typeof data.result === "object" && "error" in data.result && typeof data.result.error === "string" ? data.result.error : "";
      if (!response.ok || failure) {
        // The engine's own reason; the card stays raised to try another way.
        say(failure || data.error || MONSTER_HAND_NOTICES.refused);
        return;
      }
      setReceipt({ result: data.result, names: resultNames });
      clearAim();
    } catch {
      say(MONSTER_HAND_NOTICES.network);
    } finally {
      setSending(false);
    }
  }

  // The initiative panel's two buttons, here too: the hand is where the DM
  // is looking while the enemies are due.
  async function handOn(play: boolean) {
    if (busy) {
      return;
    }
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/initiative`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ op: "enemies", play }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        say(data.error ?? MONSTER_HAND_NOTICES.order);
      } else {
        clearAim();
      }
    } catch {
      say(MONSTER_HAND_NOTICES.network);
    } finally {
      setBusy(false);
    }
  }

  if (!roster.length || !selected) {
    return null;
  }

  const current = encounter.orderReady ? encounter.order[encounter.turnIndex] : undefined;
  const middle = (cards.length - 1) / 2;
  const step = cards.length > 1 ? Math.min(4.4, 13 / (cards.length - 1)) : 0;

  return (
    <section
      className="hand"
      data-tour="monster-hand"
      aria-label={monsterHandText("The monsters' hand", locale)}
      onKeyDown={(event) => {
        if (isComposingInput(event)) return;
        if (event.key === "Escape" && picked) {
          event.stopPropagation();
          clearAim();
        }
      }}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          key={due.length ? "due" : "free"}
          className="hand-label min-w-0 break-words font-display text-[11px] uppercase tracking-[0.22em] text-red-200/90"
        >
          {due.length ? monsterHandText("Enemy turns", locale) : monsterHandText("The monsters", locale)}
        </span>
        <span className="hidden text-[11px] text-stone-500 sm:inline">
          {due.length
            ? monsterHandFrame("before", { name: current ? handCurrentActorName(current.name, locale, encounter) : monsterHandText("the next turn", locale) }, locale)
            : monsterHandText("Play a monster's action as a card; the engine rolls it.", locale)}
        </span>
        <span className="ml-auto flex items-center gap-1">
          {due.length ? (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handOn(true)}
                className="min-h-9 rounded-md border border-red-800 bg-red-950/50 px-2.5 py-1 text-xs text-red-100 disabled:opacity-40 motion-press sm:min-h-7"
              >
                 {monsterHandText("Play the rest for me", locale)} </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handOn(false)}
                className="min-h-9 rounded-md border border-amber-700 bg-amber-950/50 px-2.5 py-1 text-xs text-amber-100 disabled:opacity-40 motion-press sm:min-h-7"
              >
                 {monsterHandText("Hand on the turn", locale)} </button>
            </>
          ) : null}
          <Tooltip content={monsterHandText(collapsed ? "Show the monsters' cards" : "Put the cards away. The console still has every action.", locale)}>
            <button
              type="button"
              onClick={() => {
                clearAim();
                writeCollapsed(!collapsed);
              }}
              aria-expanded={!collapsed}
              aria-label={collapsed ? monsterHandText("Show the monsters' cards", locale) : monsterHandText("Hide the monsters' cards", locale)}
              className="flex size-9 items-center justify-center rounded-lg text-stone-500 hover:text-amber-200 sm:size-7"
            >
              <ChevronDown className={cn("chevron-turn size-4", collapsed && "rotate-180")} />
            </button>
          </Tooltip>
        </span>
      </div>

      {collapsed ? null : (
        <>
          {/* Whose cards: the due enemies first, each with its hit points
              and whether it has acted this round. */}
          <div className="mt-1 flex flex-wrap gap-1.5" role="group" aria-label={monsterHandText("Which monster", locale)}>
            {roster.map((enemy, index) => {
              const isDue = dueIds.has(enemy.id);
              const acted = Boolean(enemy.actions?.acted);
              return (
                <button
                  key={enemy.id}
                  type="button"
                  style={{ "--i": index } as CSSProperties}
                  aria-pressed={enemy.id === selected.id}
                  onClick={() => {
                    setEnemyId(enemy.id);
                    clearAim();
                  }}
                  className={cn(ui.btnSmall, "hand-target min-h-11 flex-col items-start gap-0 px-3 py-1 text-left sm:min-h-9")}
                >
                  <span className={cn("text-[13px] leading-tight text-stone-200", acted && "text-stone-500 line-through")}>
                    {isDue ? <span className="mr-1 inline-block size-1.5 rounded-full bg-red-400 align-middle" aria-label={monsterHandText("due", locale)} /> : null}
                    {combatName(enemy.name, "enemy", locale)}
                  </span>
                  <span className="font-mono text-[10px] leading-tight text-stone-500">
                    {enemy.currentHp !== undefined ? monsterHandFrame("hp", { current: enemy.currentHp, max: enemy.maxHp ?? "" }, locale) : encounterHealthLabel(enemy, locale)}
                    {enemy.ac !== undefined ? monsterHandFrame("ac", { ac: enemy.ac }, locale) : ""}
                    {acted ? monsterHandFrame("acted", {}, locale) : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={selected.id}
            className="hand-fan"
            data-aiming={picked ? "true" : undefined}
            data-folding={leaving ? "true" : undefined}
            role="group"
            aria-label={monsterHandFrame("cards", { name: combatName(selected.name, "enemy", locale) }, locale)}
          >
            {cards.map((card, index) => (
              <HandCardFace
                key={card.id}
                card={card}
                turnContext={encounter}
                index={index}
                offset={index - middle}
                step={step}
                picked={picked?.id === card.id}
                attached={false}
                played={false}
                aim={card.target === "none" ? null : defaultAim}
                conditions={conditions}
                onPick={pick}
              />
            ))}
          </div>

          {selected.actions?.manual?.length ? (
            <p className="mt-1 truncate text-xs text-stone-400" title={selected.actions.manual.join(", ")}>
              {monsterHandFrame("manual", { names: selected.actions.manual.join(monsterHandFrame("list", {}, locale)) }, locale)}
            </p>
          ) : null}

          {picked ? (
            <div className="hand-aim mt-1 rounded-xl border border-red-500/30 bg-stone-950/80 p-2.5 shadow-elev-1">
              <div className="flex min-w-0 items-center gap-2">
                <span className="hand-type-chip" style={{ "--chip-tone": typeTone(picked.type) } as CSSProperties}>
                  {typeLabel(picked.type, locale)}
                </span>
                <span className="min-w-0 truncate font-display text-sm font-semibold text-amber-100">
                  {combatName(selected.name, "enemy", locale)} · {monsterCardName(picked, locale)}
                </span>
                <span className="ml-auto min-w-0 truncate text-xs text-stone-400">
                  {!needsTarget ? monsterHandText("Ready when you are.", locale) : aimed.length ? monsterHandFrame("aim", { names: aimed.map(chip => chip.name).join(monsterHandFrame("list", {}, locale)) }, locale) : many ? monsterHandText("Pick everyone caught in it.", locale) : monsterHandText("Pick a target.", locale)}
                </span>
              </div>

              {needsTarget ? (
                <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={monsterHandText("Targets", locale)}>
                  {party.length ? (
                    party.map((chip, index) => (
                      <button
                        key={chip.id}
                        type="button"
                        style={{ "--i": index } as CSSProperties}
                        aria-pressed={targetIds.includes(chip.id)}
                        onClick={() => toggleTarget(chip.id)}
                        className={cn(ui.btnSmall, "hand-target min-h-11 flex-col items-start gap-0 px-3 py-1 text-left sm:min-h-9")}
                      >
                        <span className="text-[13px] leading-tight text-stone-200">{chip.name}</span>
                        <span className="font-mono text-[10px] leading-tight text-stone-500">{chip.note}</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-stone-500">{monsterHandText("Nobody is standing to be attacked.", locale)}</span>
                  )}
                </div>
              ) : null}

              {picked.intent.card === "monster" && picked.intent.action === "attack" ? (
                <div className="mt-2 flex flex-wrap items-center gap-1.5" data-pill-group="">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500">{monsterHandText("Roll", locale)}</span>
                  {ADVANTAGE.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      data-on={advantage === value ? "" : undefined}
                      aria-pressed={advantage === value}
                      onClick={() => setAdvantage(value)}
                      className={cn(
                        "hand-option inline-flex min-h-9 items-center rounded-full border px-3 text-xs sm:min-h-8",
                        advantage === value
                          ? "border-ember-400/70 bg-ember-500/20 text-orange-100"
                          : "border-stone-600 text-stone-300 hover:border-amber-500/60",
                      )}
                    >
                      {monsterHandText(label, locale)}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="hand-rows-box mt-2">
                <HandPreviewRows rows={rows} />
              </div>
              {sentence ? <p className="mt-2 text-xs italic text-stone-300">{sentence}</p> : null}

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <button type="button" onClick={clearAim} className={cn(ui.btnSmall, "min-h-9")}>
                  <ArrowLeft className="size-3.5" />  {monsterHandText("Back", locale)} </button>
                <button
                  type="button"
                  disabled={!ready || sending}
                  aria-busy={sending}
                  onClick={() => void commit()}
                  className={cn(ui.btnPrimary, "ml-auto min-h-9")}
                >
                  {sending ? <Loader2 className="size-4 animate-spin" /> : null}
                  {picked.intent.card === "monster" && picked.intent.action === "flee" ? monsterHandText("Let it flee", locale) : monsterHandFrame("play", { name: monsterCardName(picked, locale) }, locale)}
                </button>
              </div>
            </div>
          ) : null}

          {lines.length ? (
            <div role="status" className="live-in mt-1 rounded-lg border border-amber-500/30 bg-stone-950/80 px-3 py-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <p className="gold-title font-display text-[11px] uppercase tracking-[0.18em]">{selected.name}</p>
                <button
                  type="button"
                  onClick={() => setReceipt(null)}
                  aria-label={monsterHandText("Dismiss the result", locale)}
                  className="motion-press flex size-7 items-center justify-center rounded-md text-stone-500 hover:text-amber-200"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <ul className="stagger mt-1 space-y-0.5">
                {lines.map((line, index) => (
                  <li
                    key={`${index}-${line.text}`}
                    className={cn(line.tone === "bad" ? "text-ember-300" : line.tone === "good" ? "text-emerald-300" : "text-stone-200")}
                  >
                    {line.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
      <p ref={noticeRef} role="status" className={cn("mt-1 text-xs text-amber-300", notice ? "" : "hidden")}>
        {monsterHandRefusal(consoleNotice(handRefusalText(notice, locale, encounter), locale), locale, resultNames.enemies)}
      </p>
    </section>
  );
}

const EMPTY: string[] = [];

// Memoized like the composer it sits in.
export const MonsterHand = memo(MonsterHandInner);
