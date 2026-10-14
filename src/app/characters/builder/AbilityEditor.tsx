"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { abilityLabel } from "@/lib/i18n/character-presentations";
import { LocalizedText } from "@/lib/i18n/LocalizedText";
import { abilityMethodRows, abilityGainText, abilityRollErrorText } from "@/lib/i18n/ability-ui-presentations";
import { Dices } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type DragEvent, type ReactNode } from "react";
import { GameTerm } from "@/components/ui/GameTerm";
import { CountPop } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { abilityMod, formatModifier } from "@/lib/srd";
import { POINT_BUY_MAX, POINT_BUY_MIN, pointBuyCost, pointBuyRemaining } from "@/lib/srd/point-buy";
import type { Ability } from "@/lib/schemas/sheet";
import { ui } from "@/lib/ui";
import {
  REROLL_BELOW,
  ROW_SETTLE_MS,
  ROW_STAGGER_MS,
  TOTAL_POP_MS,
  assignStandard,
  canRerollPool,
  placeFromPool,
  poolSum,
  rollTier,
  scoresFromSlots,
  type PoolEntry,
  type PoolSlots,
} from "./abilityDice";
import { gainLabel, type AbilityGain } from "./abilityGains";
import { HelpDot, MethodInfoDialog, type HpExplainerInput } from "./AbilityExplainers";
import { AbilitySummary } from "./AbilitySummary";
import { DiceDefs, DiceRow } from "./Dice";
import { fetchOpenAbilityPool, requestAbilityPool, type AbilityPoolAnswer } from "./useTableRules";
import { useContentCampaign } from "@/lib/content-scope";

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
export type AbilityMethod = "standard" | "pointbuy" | "roll";

export const ABILITY_LABELS: Record<Ability, string> = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma",
};

const ABILITY_KEYS = Object.keys(ABILITY_LABELS) as Ability[];

export type AbilityState = Record<Ability, number | null>;

const EMPTY_SLOTS: PoolSlots<Ability> = { str: null, dex: null, con: null, int: null, wis: null, cha: null };

const DRAG_TYPE = "application/x-odm-pool";

// Method-aware ability score editor: standard array slots, 27-point buy
// steppers, or 4d6-drop-lowest, where all six throws land in a tray at once
// and are then placed on the abilities by tap or drag. There is no rolling a
// single ability and no typing a score in. Racial bonuses and the later
// gains (improvements, half-feats, Primal Champion) are displayed but applied
// by the parent.
export default function AbilityEditor({
  method,
  onMethodChange,
  scores,
  onScoresChange,
  pool,
  onPoolChange,
  slots,
  onSlotsChange,
  racialBonus,
  gains = {},
  asiCount = 0,
  who = "",
  hp = null,
}: {
  method: AbilityMethod;
  onMethodChange: (method: AbilityMethod) => void;
  scores: AbilityState;
  onScoresChange: (scores: AbilityState) => void;
  // The six 4d6 totals (null until thrown) and which ability holds each.
  pool: PoolEntry[] | null;
  onPoolChange: (pool: PoolEntry[] | null) => void;
  slots: PoolSlots<Ability>;
  onSlotsChange: (slots: PoolSlots<Ability>) => void;
  racialBonus: Partial<Record<Ability, number>>;
  // What each score gains after the race's bonus, in the server's order and
  // already capped (abilityGains.ts): "+1 Linguist", "+2 at level 4".
  gains?: Partial<Record<Ability, AbilityGain[]>>;
  // Ability score improvements the chosen level has earned; > 0 adds a hint
  // that base scores are level-1 rules and the bonuses are picked below.
  asiCount?: number;
  // "half-orc paladin", for the summary's sentence.
  who?: string;
  // What the health explainer under the summary works from.
  hp?: HpExplainerInput | null;
}) {
  const { locale, t } = useLocale();
  // The toss in the air. Display only: the pool itself is committed the
  // moment the dice leave the hand, so nothing is lost if the player moves
  // on mid-toss.
  const [phases, setPhases] = useState<Array<"rolling" | "settled">>([]);
  const [tossId, setTossId] = useState(0);
  // The throw in hand, waiting for an ability to land on.
  const [held, setHeld] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<Ability | "tray" | null>(null);
  const [methodInfoOpen, setMethodInfoOpen] = useState(false);
  // The dice are the server's: while it answers the throw button waits, and
  // a refusal is shown in its words beside the tray.
  const [asking, setAsking] = useState(false);
  const [rollError, setRollError] = useState("");
  const timers = useRef<number[]>([]);
  // A six already on record for this player (issue #128): shown as kept,
  // with when it was thrown, never as dice in the air. `openPool` is what
  // the server had when the builder opened; `keptAt` says the tray's six
  // are that kept roll (null when thrown before the server kept dates).
  const [openPool, setOpenPool] = useState<AbilityPoolAnswer | null>(null);
  const [keptAt, setKeptAt] = useState<string | null | undefined>(undefined);
  // Built at a table, the dice are rolled under that table's rule (its own,
  // or the server's when it set none), and the words say so.
  const campaignId = useContentCampaign();
  // The reroll rule where the character is made; the bundled default until
  // the server has answered.
  const [rerollBelow, setRerollBelow] = useState(REROLL_BELOW);
  function learnRule(answer: { rerollBelow: number }) {
    setRerollBelow(answer.rerollBelow);
  }
  function adoptOpen(answer: { open: AbilityPoolAnswer | null; rerollBelow: number }) {
    learnRule(answer);
    setOpenPool(answer.open);
  }
  // The kept six into the tray, settled, no toss.
  function showKept(answer: AbilityPoolAnswer) {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    setHeld(null);
    setTossId((id) => id + 1);
    setPhases(answer.pool.map(() => "settled" as const));
    setKeptAt(answer.createdAt);
    onPoolChange(answer.pool);
    onSlotsChange(EMPTY_SLOTS);
    onScoresChange(scoresFromSlots(EMPTY_SLOTS, answer.pool));
  }

  // Once, when the builder opens. A new character with a kept roll on
  // record and the 4d6 method already chosen sees it at once, as kept,
  // instead of a Roll button that would "throw" the same six again;
  // switching to the method later does the same (switchMethod).
  const openedWith = useRef({ method, pool });
  useEffect(() => {
    let cancelled = false;
    fetchOpenAbilityPool(campaignId).then((answer) => {
      if (cancelled || !answer) {
        return;
      }
      adoptOpen(answer);
      if (answer.open && openedWith.current.method === "roll" && openedWith.current.pool === null) {
        showKept(answer.open);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) window.clearTimeout(id);
    };
  }, []);

  const methods = abilityMethodRows(locale, rerollBelow, STANDARD_ARRAY);
  const pointBuyScores = ABILITY_KEYS.map((key) => scores[key] ?? POINT_BUY_MIN);
  const remaining = method === "pointbuy" ? pointBuyRemaining(pointBuyScores) : 0;
  const anyRolling = method === "roll" && phases.some((phase) => phase === "rolling");
  const placedCount = ABILITY_KEYS.filter((key) => slots[key] !== null).length;
  const complete = ABILITY_KEYS.every((key) => scores[key] !== null);
  const total = pool ? poolSum(pool) : 0;
  const rerollOpen = canRerollPool(pool, rerollBelow);
  const keptDate =
    keptAt ? new Date(keptAt).toLocaleDateString(locale === "en" ? undefined : locale, { month: "short", day: "numeric" }) : "";
  const ownerOf = (index: number) => ABILITY_KEYS.find((key) => slots[key] === index) ?? null;

  function switchMethod(next: AbilityMethod) {
    setHeld(null);
    onMethodChange(next);
    if (next === "roll" && pool === null && openPool) {
      showKept(openPool);
      return;
    }
    onScoresChange(
      next === "pointbuy"
        ? { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 }
        : next === "roll" && pool
          ? scoresFromSlots(slots, pool)
          : { str: null, dex: null, con: null, int: null, wis: null, cha: null },
    );
  }

  async function throwPool() {
    if (!rerollOpen || anyRolling || asking) {
      return;
    }
    setAsking(true);
    setRollError("");
    const answer = await requestAbilityPool(campaignId);
    setAsking(false);
    if ("error" in answer) {
      setRollError(answer.error);
      return;
    }
    learnRule(answer);
    setOpenPool(answer);
    if (answer.kept) {
      // Already on record: shown as kept, not thrown again (issue #128).
      showKept(answer);
      return;
    }
    setKeptAt(undefined);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const thrown = answer.pool;
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    setHeld(null);
    setTossId((id) => id + 1);
    setPhases(thrown.map(() => (still ? "settled" : "rolling")));
    if (!still) {
      thrown.forEach((_, index) => {
        timers.current.push(
          window.setTimeout(() => {
            setPhases((current) => current.map((phase, at) => (at === index ? "settled" : phase)));
          }, ROW_SETTLE_MS + index * ROW_STAGGER_MS),
        );
      });
    }
    onPoolChange(thrown);
    onSlotsChange(EMPTY_SLOTS);
    onScoresChange(scoresFromSlots(EMPTY_SLOTS, thrown));
  }

  function commitSlots(next: PoolSlots<Ability>) {
    if (!pool) return;
    onSlotsChange(next);
    onScoresChange(scoresFromSlots(next, pool));
  }

  function place(ability: Ability, index: number) {
    commitSlots(placeFromPool(slots, ability, index));
    setHeld(null);
  }

  function returnToTray(index: number) {
    const owner = ownerOf(index);
    if (owner) commitSlots({ ...slots, [owner]: null });
    setHeld(null);
  }

  // A tap on a socket: with a throw in hand it lands there (its own throw
  // goes back to the tray); with an empty hand it picks up what the socket
  // holds, so it can be moved on to another ability.
  function tapSocket(ability: Ability) {
    const mine = slots[ability];
    if (held !== null) {
      place(ability, held);
    } else if (mine !== null) {
      setHeld(mine);
    }
  }

  function nudgeBuy(ability: Ability, delta: number) {
    const value = Math.max(POINT_BUY_MIN, Math.min(POINT_BUY_MAX, (scores[ability] ?? POINT_BUY_MIN) + delta));
    onScoresChange({ ...scores, [ability]: value });
  }

  function startDrag(event: DragEvent, index: number) {
    event.dataTransfer.setData(DRAG_TYPE, String(index));
    event.dataTransfer.effectAllowed = "move";
    setHeld(index);
  }

  function dragInto(event: DragEvent, target: Ability | "tray") {
    if (!event.dataTransfer.types.includes(DRAG_TYPE)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dropTarget !== target) setDropTarget(target);
  }

  function dropInto(event: DragEvent, target: Ability | "tray") {
    const raw = event.dataTransfer.getData(DRAG_TYPE);
    setDropTarget(null);
    if (raw === "") return;
    event.preventDefault();
    const index = Number(raw);
    if (target === "tray") returnToTray(index);
    else place(target, index);
  }

  return (
    <section className="panel rounded-xl p-3 sm:p-4">
      <DiceDefs />
      <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <h2 className="eyebrow w-full text-xs text-amber-200/90 sm:w-auto">
          <GameTerm id="ability_score">{t("abilityUi.scores")}</GameTerm>
        </h2>
        <div className="method-switch">
          {methods.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => (entry.id === method ? undefined : switchMethod(entry.id))}
              aria-pressed={method === entry.id}
              className="method-option"
            >
              <span>{entry.label}</span>
            </button>
          ))}
          {/* Which of the three to use is the question a first character
              actually gets stuck on, so the answer sits on the control. */}
          <HelpDot
            label={t("abilityUi.about", { method: methods.find((entry) => entry.id === method)?.label ?? t("abilityUi.waysFallback") })}
            onClick={() => setMethodInfoOpen(true)}
            className="-my-px size-[30px]"
          />
        </div>
        {method === "pointbuy" ? (
          <span className={cn("font-mono text-[11px]", remaining < 0 ? "text-red-400" : "text-stone-400")} aria-live="polite">
            {t("abilityUi.pointsLeft", { count: remaining })}
          </span>
        ) : null}
        {method === "roll" ? (
          <>
            <span className="inline-flex items-center gap-2">
              <span className="eyebrow text-[10px] tracking-[0.18em] text-amber-500/80">{t("abilityUi.dropLowest")}</span>
              {pool ? (
                <span className="font-mono text-[10.5px] text-stone-500" aria-live="polite">
                  {t("abilityUi.placed", { count: placedCount })}
                </span>
              ) : null}
            </span>
            {pool ? (
              <button
                type="button"
                onClick={throwPool}
                disabled={anyRolling || asking || !rerollOpen}
                aria-busy={asking}
                title={
                  rerollOpen
                    ? t("abilityUi.rerollTitleOpen", { below: rerollBelow })
                    : rerollBelow <= 0
                      ? t("abilityUi.rerollTitleNone")
                      : t("abilityUi.rerollTitleClosed", { below: rerollBelow })
                }
                className={cn(ui.btnSmall, "ml-auto px-2.5 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40")}
              >
                <Dices className="size-3.5" /> {t("abilityUi.reroll")}
              </button>
            ) : null}
          </>
        ) : null}
      </div>
      {method !== "roll" && openPool ? (
        // The roll on record is not lost by choosing another method; it
        // waits for a character that uses it (issue #128).
        <p className="mb-3 text-xs text-stone-500" aria-live="polite">
          {t("abilityUi.openPool", { numbers: openPool.pool.map((entry) => entry.total).join(", ") })}
        </p>
      ) : null}
      {asiCount > 0 ? (
        <p className="mb-3 text-xs text-stone-500">
          <LocalizedText message={asiCount === 1 ? "abilityUi.baseHintOne" : "abilityUi.baseHintMany"} values={{
            improvements: <span className="text-amber-200">{t(asiCount === 1 ? "abilityUi.improvementsOne" : "abilityUi.improvementsMany", { count: asiCount })}</span>,
          }} />
        </p>
      ) : null}

      {method === "roll" ? (
        <div
          className="pool-tray mb-3"
          data-empty={!pool || undefined}
          data-drop={dropTarget === "tray" || undefined}
          onDragOver={(event) => dragInto(event, "tray")}
          onDragLeave={() => setDropTarget(null)}
          onDrop={(event) => dropInto(event, "tray")}
        >
          {pool ? (
            <>
              <div className="pool-grid" role="group" aria-label={t("abilityUi.sixThrows")}>
                {pool.map((entry, index) => {
                  const phase = phases[index] ?? "settled";
                  const rolling = anyRolling && phase === "rolling";
                  const owner = ownerOf(index);
                  const inHand = held === index;
                  return (
                    <button
                      key={`${tossId}-${index}`}
                      type="button"
                      className="pool-token"
                      data-phase={anyRolling ? phase : undefined}
                      data-held={inHand || undefined}
                      data-placed={owner ? true : undefined}
                      draggable={!anyRolling}
                      disabled={anyRolling}
                      aria-pressed={inHand}
                      aria-label={t(owner ? "abilityUi.throwPlaced" : "abilityUi.throwFree", { total: entry.total, ability: owner ? abilityLabel(owner, locale) : "" })}
                      onClick={() => setHeld(inHand ? null : index)}
                      onDragStart={(event) => startDrag(event, index)}
                      onDragEnd={() => {
                        setDropTarget(null);
                        setHeld(null);
                      }}
                      style={
                        {
                          "--delay": `${anyRolling ? index * ROW_STAGGER_MS : 0}ms`,
                          "--pop": `${TOTAL_POP_MS}ms`,
                        } as CSSProperties
                      }
                    >
                      {entry.roll ? (
                        <span className="pool-dice">
                          <DiceRow roll={{ ...entry.roll, phase: anyRolling ? phase : "settled" }} />
                        </span>
                      ) : (
                        <span className="pool-saved">{t("abilityUi.fromSheet")}</span>
                      )}
                      <span className={cn("dice-total", `roll-tier-${rollTier(entry.total)}`)} data-phase={rolling ? "rolling" : undefined}>
                        {entry.total}
                      </span>
                      <span className="pool-tag">{owner ? locale === "en" ? owner.toUpperCase() : abilityLabel(owner, locale, true) : t(inHand ? "abilityUi.inHand" : "abilityUi.free")}</span>
                    </button>
                  );
                })}
              </div>
              <p className="pool-note" aria-live="polite">
                {anyRolling ? (
                  t("abilityUi.rollingAir")
                ) : (
                  <>
                    {keptAt !== undefined ? (
                      <>
                        <span className="text-amber-200">{keptDate ? t("abilityUi.keptDate", { date: keptDate }) : t("abilityUi.kept")}</span>
                        <span className="text-stone-600"> · </span>
                      </>
                    ) : null}
                    <span className="font-mono text-amber-200">{t("abilityUi.total", { total })}</span>
                    <span className="text-stone-600"> · </span>
                    {rerollOpen
                      ? t("abilityUi.under", { below: rerollBelow })
                      : rerollBelow <= 0
                        ? t("abilityUi.noSecond")
                        : keptAt !== undefined
                          ? t("abilityUi.keptUnder", { below: rerollBelow })
                          : t("abilityUi.closedUnder", { below: rerollBelow })}
                    <span className="block text-stone-500">
                      {held !== null
                        ? t("abilityUi.tapAbility")
                        : placedCount < 6
                          ? t("abilityUi.tapThrow")
                          : t("abilityUi.swapPlaced")}
                    </span>
                  </>
                )}
              </p>
            </>
          ) : (
            <div className="pool-empty">
              <p className="font-display text-[15px] font-semibold text-stone-100">{t("abilityUi.poolEmptyTitle")}</p>
              <p className="max-w-sm text-xs text-stone-400">
                {t("abilityUi.poolEmptyInfo")}
              </p>
              <button
                type="button"
                onClick={throwPool}
                disabled={asking}
                aria-busy={asking}
                className="pool-throw motion-press disabled:opacity-60"
              >
                <Dices className={cn("size-4", asking && "animate-spin")} /> {t(asking ? "abilityUi.rolling" : "abilityUi.rollDice")}
              </button>
              <p className="max-w-sm text-[11px] text-stone-500">
                {t("abilityUi.serverKeeps")}
              </p>
            </div>
          )}
        </div>
      ) : null}
      {method === "roll" && rollError ? (
        <p role="alert" className="reveal motion-shake mb-3 text-xs text-red-400">
          {abilityRollErrorText(rollError, locale)}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        {ABILITY_KEYS.map((ability) => {
          const bonus = racialBonus[ability] ?? 0;
          const extra = gains[ability] ?? [];
          const assigned = scores[ability];
          const finalScore =
            assigned !== null ? assigned + bonus + extra.reduce((sum, gain) => sum + gain.amount, 0) : null;
          // Racial bonus, then every later gain by name, then the final. A
          // gain the player just made or changed lands (reveal-pop, keyed by
          // its words so the others stay put) and the final pops when it
          // moves.
          const notes: Array<{ key: string; tone: string; motion?: string; body: ReactNode }> = [
            ...(bonus ? [{ key: "racial", tone: "text-amber-300", body: t("abilityUi.racialBonus", { bonus }) }] : []),
            ...extra.map((gain) => ({
              key: `gain-${gainLabel(gain)}`,
              tone: "text-amber-200",
              motion: "reveal-pop",
              body: abilityGainText(gain, locale),
            })),
            ...(finalScore !== null
              ? [
                  {
                    key: "final",
                    tone: "",
                    body: (
                      <>
                        {t("abilityUi.final")} <CountPop value={finalScore}>{finalScore}</CountPop> ({formatModifier(abilityMod(finalScore))})
                      </>
                    ),
                  },
                ]
              : []),
          ];
          const label = abilityLabel(ability, locale);
          const slot = method === "roll" ? slots[ability] : null;
          const armed = method === "roll" && held !== null && !anyRolling;
          return (
            <div
              key={ability}
              className="dice-row"
              data-armed={armed || undefined}
              data-drop={dropTarget === ability || undefined}
              onDragOver={method === "roll" && pool ? (event) => dragInto(event, ability) : undefined}
              onDragLeave={method === "roll" ? () => setDropTarget(null) : undefined}
              onDrop={method === "roll" && pool ? (event) => dropInto(event, ability) : undefined}
            >
              <span className="dice-abbr" aria-hidden="true">
                {locale === "en" ? ability.toUpperCase() : abilityLabel(ability, locale, true)}
              </span>
              {/* The bonuses and the final score ride under the name, so the
                  controls keep one line in the builder's column; with feats
                  and improvements the notes wrap between whole pieces. */}
              <span className="flex min-w-0 flex-[1_1_104px] flex-col gap-px">
                <span className="truncate font-display text-[13.5px] font-semibold text-stone-100">
                  <GameTerm id={ability}>{label}</GameTerm>
                </span>
                {notes.length ? (
                  <span className="flex flex-wrap gap-x-1 font-mono text-[10px] leading-snug text-stone-400" data-ability-notes={ability}>
                    {notes.map((note, index) => (
                      <span key={note.key} className={cn("whitespace-nowrap", note.motion)}>
                        {index ? <span className="text-stone-600">· </span> : null}
                        <span className={note.tone || undefined}>{note.body}</span>
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>

              {method === "roll" ? (
                <button
                  type="button"
                  className="pool-socket"
                  data-filled={slot !== null || undefined}
                  data-held={slot !== null && held === slot ? true : undefined}
                  disabled={!pool || anyRolling || (slot === null && held === null)}
                  draggable={slot !== null && !anyRolling}
                  onClick={() => tapSocket(ability)}
                  onDragStart={slot !== null ? (event) => startDrag(event, slot) : undefined}
                  onDragEnd={() => {
                    setDropTarget(null);
                    setHeld(null);
                  }}
                  aria-label={
                    slot !== null
                      ? t("abilityUi.socketHeld", { ability: label, score: assigned ?? 0, action: t(held === slot ? "abilityUi.socketReturn" : held !== null ? "abilityUi.socketSwap" : "abilityUi.socketPick") })
                      : held !== null
                        ? t("abilityUi.socketPlace", { ability: label })
                        : t("abilityUi.socketEmpty", { ability: label })
                  }
                >
                  {slot !== null && assigned !== null ? (
                    <span key={`${tossId}-${slot}`} className={cn("pool-socket-value", `roll-tier-${rollTier(assigned)}`)}>
                      {assigned}
                    </span>
                  ) : (
                    <span className="pool-socket-hint">{armed ? t("abilityUi.place") : "—"}</span>
                  )}
                </button>
              ) : null}

              {method === "standard" ? (
                <span className="flex min-w-[192px] flex-[1_1_192px] items-center gap-[5px]" role="group" aria-label={t("abilityUi.scoreGroup", { ability: label })}>
                  {STANDARD_ARRAY.map((value) => {
                    const mine = assigned === value;
                    const taken = !mine && ABILITY_KEYS.some((key) => scores[key] === value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => onScoresChange(assignStandard(scores, ability, value))}
                        aria-pressed={mine}
                        aria-label={t(taken ? "abilityUi.scoreTaken" : "abilityUi.scoreAvailable", { ability: label, score: value })}
                        data-taken={taken || undefined}
                        className="slot-button"
                      >
                        {value}
                      </button>
                    );
                  })}
                </span>
              ) : null}

              {method === "pointbuy" ? (
                <span className="flex min-w-[150px] flex-[1_1_192px] items-center gap-[7px]">
                  <button
                    type="button"
                    onClick={() => nudgeBuy(ability, -1)}
                    disabled={(assigned ?? POINT_BUY_MIN) <= POINT_BUY_MIN}
                    aria-label={t("abilityUi.lower", { ability: label })}
                    className="step-button"
                  >
                    −
                  </button>
                  <span className="flex flex-1 flex-col items-center leading-none" aria-live="polite">
                    <span className="font-display text-[19px] font-bold text-amber-100">{assigned ?? POINT_BUY_MIN}</span>
                    <span className="mt-0.5 font-mono text-[9px] text-stone-500">
                      {t("abilityUi.cost", { cost: pointBuyCost(assigned ?? POINT_BUY_MIN) })}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => nudgeBuy(ability, 1)}
                    disabled={(assigned ?? POINT_BUY_MIN) >= POINT_BUY_MAX}
                    aria-label={t("abilityUi.raise", { ability: label })}
                    className="step-button"
                  >
                    +
                  </button>
                </span>
              ) : null}

            </div>
          );
        })}
      </div>

      {complete && !anyRolling ? (
        <AbilitySummary
          key={method}
          method={method}
          who={who}
          hp={hp}
          rows={ABILITY_KEYS.map((ability) => ({
            ability,
            label: ABILITY_LABELS[ability],
            base: scores[ability] ?? 0,
            bonus: racialBonus[ability] ?? 0,
            added: (gains[ability] ?? []).reduce((sum, gain) => sum + gain.amount, 0),
          }))}
        />
      ) : null}

      <MethodInfoDialog
        open={methodInfoOpen}
        onOpenChange={setMethodInfoOpen}
        methods={methods}
        current={method}
      />
    </section>
  );
}
