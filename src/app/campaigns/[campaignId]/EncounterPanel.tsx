"use client";

import { ChevronDown, ChevronRight, Crown, Shield, Skull, Swords, Wind } from "lucide-react";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { MonsterTile } from "@/lib/ui";
import { HEALTH_COLORS } from "@/lib/bestiary/health";
import { DmInitiativePanel } from "@/app/campaigns/[campaignId]/DmInitiativePanel";
import { ConditionChip, type FaceLookup } from "@/app/campaigns/[campaignId]/BoardChrome";
import { familyIconPath } from "@/lib/icons";
import { characterPlaceholder, monsterPlaceholder, npcPlaceholder } from "@/lib/placeholders";
import type { PublicEncounter } from "@/lib/db/encounter-view";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { UiRequestError } from "@/lib/i18n/api-errors";
import { combatErrorText, combatName, encounterHealthLabel, regeneratingLabel } from "@/lib/i18n/combat-ui-presentations";

function crLabel(cr: number): string {
  if (cr === 0.125) return "1/8";
  if (cr === 0.25) return "1/4";
  if (cr === 0.5) return "1/2";
  return String(cr);
}

// Live enemy roster during combat. Deliberately vague: players see health
// states, never numbers; exact HP stays on the server.
export function EncounterPanel({
  campaignId,
  encounter,
  steersStory,
  canEditOrder = false,
  embedded = false,
  genre,
  sheets,
}: {
  campaignId: string;
  encounter: PublicEncounter;
  steersStory: boolean;
  // The DM seat, which is who /dm/initiative answers. A party lead steers the
  // story but does not rearrange the turn order.
  canEditOrder?: boolean;
  embedded?: boolean;
  // The table's setting, so a high-rating enemy draws the genre's boss plate.
  genre?: string | null;
  // The party's sheets, so the order shows the adventurers' faces as well as
  // the monsters'. Without them a player's row falls back to an initial.
  sheets?: CharacterSheet[];
}) {
  const { locale, t } = useLocale();
  const [ending, setEnding] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [error, setError] = useState<UiRequestError | null>(null);
  const errorText = combatErrorText(error, locale);

  // A mob is every enemy from the same stat block. Initiative never rested
  // on enemies one at a time (advanceOrder walks past all of them to the
  // next player), so collapsing four goblins into one line loses nothing and
  // stops a swarm burying the roster. A group of one is just a row.
  const groups = useMemo(() => {
    const byKey = new Map<string, PublicEncounter["enemies"]>();
    for (const enemy of encounter.enemies) {
      const key = enemy.groupKey || enemy.id;
      byKey.set(key, [...(byKey.get(key) ?? []), enemy]);
    }
    return [...byKey.entries()].map(([key, members]) => ({ key, members }));
  }, [encounter.enemies]);

  // Faces for the order, by the same rule the board uses: own portrait, then
  // the plate, then the class emblem (docs/visual-overhaul-plan.md 5.1).
  const faceOf = useMemo<FaceLookup>(() => {
    const sheetsById = new Map((sheets ?? []).map((sheet) => [sheet.id, sheet]));
    const enemiesById = new Map(encounter.enemies.map((enemy) => [enemy.id, enemy]));
    return (entry) => {
      const sheet = sheetsById.get(entry.id);
      if (sheet) {
        return [
          sheet.portrait?.url,
          characterPlaceholder({ race: sheet.race, class: sheet.class, gender: sheet.gender }),
          familyIconPath(`class-${sheet.class}`),
        ];
      }
      const enemy = enemiesById.get(entry.id);
      if (enemy) {
        return [monsterPlaceholder(enemy.type, { cr: enemy.cr, genre, seed: enemy.name })];
      }
      return entry.kind === "npc" ? [npcPlaceholder(null, entry.name)] : [];
    };
  }, [sheets, encounter.enemies, genre]);

  async function forceEnd() {
    if (!await appConfirm(t("combatUi.encounter.abortConfirm"))) {
      return;
    }
    setEnding(true);
    setError(null);
    try {
      await abortFight();
    } catch {
      setError({ data: {}, fallback: "combatUi.error.network" });
    } finally {
      setEnding(false);
    }
  }

  async function abortFight() {
    const response = await fetch(`/api/campaigns/${campaignId}/encounter`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError({ data, fallback: "combatUi.encounter.abortFailed" });
    }
  }

  // The DM's seat ends a fight the way the engine does (end_encounter): XP,
  // the after-the-fight card, the music, the ammunition back. The abort
  // above is a party lead's way out of a wedged fight; a person running the
  // table reached for this button and got no XP and the combat music still
  // playing. The abort stays offered when the engine will not end it.
  async function endFight() {
    if (!await appConfirm(t("combatUi.encounter.endConfirm"), { title: t("combatUi.encounter.endTitle"), actionLabel: t("combatUi.encounter.endAction") })) {
      return;
    }
    setEnding(true);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "end_encounter", args: {} }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        const error = combatErrorText({ data: body, fallback: "combatUi.encounter.endFailed" }, locale);
        if (await appConfirm(t("combatUi.encounter.forceConfirm", { error }), { actionLabel: t("combatUi.encounter.force") })) {
          await abortFight();
        } else {
          setError({ data: body, fallback: "combatUi.encounter.endFailed" });
        }
      }
    } catch {
      setError({ data: {}, fallback: "combatUi.error.network" });
    } finally {
      setEnding(false);
    }
  }

  return (
    <section
      className={cn(
        "rounded-lg border border-red-900/50 bg-red-950/10",
        embedded ? "p-3" : "p-4",
      )}
    >
      <header className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-red-300">
          <Swords className="size-4" />
          {t("combatUi.encounter.combat")}{encounter.orderReady ? t("combatUi.encounter.round", { round: encounter.round }) : t("combatUi.encounter.rolling")}
          {encounter.lair ? (
            <span className={cn("ml-1.5 text-[10px] uppercase tracking-wide", encounter.lair.usedThisRound ? "text-stone-600" : "text-violet-300")}>
              {t(encounter.lair.usedThisRound ? "combatUi.encounter.lairActed" : "combatUi.encounter.lairAwake")}
            </span>
          ) : null}
        </h2>
        {steersStory ? (
          <button
            type="button"
            onClick={canEditOrder ? endFight : forceEnd}
            disabled={ending}
            className="text-xs text-stone-500 hover:text-red-300 disabled:opacity-50 motion-press"
            title={t(canEditOrder ? "combatUi.encounter.endHint" : "combatUi.encounter.abortHint")}
          >
            {t("combatUi.encounter.end")}
          </button>
        ) : null}
      </header>
      <ul className="space-y-1.5">
        {groups.flatMap((group) => {
          const standing = group.members.filter((member) => member.status === "alive" && member.health !== "dead" && !member.knockedOut && !member.regenerating);
          // One of a kind, or a mob the DM has opened up: show the members.
          if (group.members.length === 1 || openGroups.includes(group.key)) {
            const header =
              group.members.length === 1
                ? []
                : [
                    <li key={`${group.key}-header`}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroups((current) =>
                            current.filter((key) => key !== group.key),
                          )
                        }
                        className="flex w-full items-center gap-1 text-xs text-stone-500 hover:text-stone-300"
                      >
                        <ChevronDown className="size-3.5" />
                        {t("combatUi.encounter.groupStanding", { name: combatName(group.members[0].name.replace(/\s+\d+$/, ""), "enemy", locale), standing: standing.length, count: group.members.length })}
                      </button>
                    </li>,
                  ];
            return [...header, ...group.members.map((enemy) => renderEnemy(enemy))];
          }
          return [
            <li key={group.key}>
              <button
                type="button"
                onClick={() => setOpenGroups((current) => [...current, group.key])}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border border-stone-800 bg-stone-950/60 px-2.5 py-1.5 text-left",
                  !standing.length && "opacity-60",
                )}
              >
                <span className="flex min-w-0 items-center gap-1.5 text-sm text-stone-200">
                  <ChevronRight className="size-3.5 shrink-0 text-stone-500" />
                  <MonsterTile
                    type={group.members[0].type}
                    cr={group.members[0].cr}
                    genre={genre}
                    seed={group.members[0].name}
                    size="size-6"
                    className={cn("rounded-full", !standing.length && "grayscale")}
                  />
                  <span className="truncate">
                    {t("combatUi.encounter.groupName", { name: combatName(group.members[0].name.replace(/\s+\d+$/, ""), "enemy", locale), count: group.members.length })}
                  </span>
                  <span className="shrink-0 rounded border border-stone-700 px-1 text-[10px] text-stone-500">
                    {t("combatUi.encounter.cr", { cr: crLabel(group.members[0].cr) })}
                  </span>
                </span>
                <span className="ml-2 shrink-0 text-[10px] text-stone-500">
                  {t("combatUi.encounter.standing", { count: standing.length })}
                </span>
              </button>
            </li>,
          ];
        })}
      </ul>
      {canEditOrder ? (
        <DmInitiativePanel campaignId={campaignId} encounter={encounter} faceOf={faceOf} />
      ) : null}
      {errorText ? <p role="alert" className="mt-2 text-xs text-red-400">{errorText}</p> : null}
    </section>
  );

  function renderEnemy(enemy: PublicEncounter["enemies"][number]) {
          const out = enemy.status !== "alive";
          return (
            <li
              key={enemy.id}
              className={cn(
                "animate-fade-up rounded-md border border-stone-800 bg-stone-950/60 px-2 py-1.5 transition-[color,background-color,border-color,opacity] duration-[260ms] ease-settle hover:border-stone-700",
                out && "opacity-60",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-1.5 text-sm text-stone-200",
                    out && "line-through decoration-stone-500",
                  )}
                >
                  <MonsterTile
                    type={enemy.type}
                    cr={enemy.cr}
                    genre={genre}
                    seed={enemy.name}
                    size="size-8"
                    className={cn("rounded-full", out && "grayscale")}
                  />
                  {enemy.status === "dead" ? (
                    <Skull className="size-3.5 shrink-0 text-stone-500" />
                  ) : enemy.status === "fled" ? (
                    <Wind className="size-3.5 shrink-0 text-stone-500" />
                  ) : null}
                  <span className="truncate">{combatName(enemy.name, "enemy", locale)}</span>
                  <span className="shrink-0 rounded border border-stone-700 px-1 text-[10px] text-stone-500">
                    {t("combatUi.encounter.cr", { cr: crLabel(enemy.cr) })}
                  </span>
                </span>
                <span
                  className={cn(
                    // The health word changes tone the way the ring on the board does.
                    "ml-2 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize transition-colors duration-[420ms] ease-snap",
                    HEALTH_COLORS[enemy.status === "fled" || enemy.knockedOut ? "dead" : enemy.health],
                  )}
                  title={
                    enemy.knockedOut
                      ? t("combatUi.encounter.knockoutHint")
                      : enemy.regenerating
                        ? regeneratingLabel(enemy.regenerating.stopped, locale)
                        : undefined
                  }
                >
                  {/* A nonlethal blow leaves it alive at 0 (src/lib/dm/knockout.ts);
                      a troll lies at 0 until its turn (src/lib/dm/regeneration.ts). */}
                  {encounterHealthLabel(enemy, locale)}
                </span>
                {enemy.regenerating ? (
                  <span
                    key={enemy.regenerating.stopped ? "stopped" : "rising"}
                    title={regeneratingLabel(enemy.regenerating.stopped, locale)}
                    className={cn(
                      "motion-pop ml-1.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px]",
                      enemy.regenerating.stopped
                        ? "border-ember-500/50 bg-ember-500/10 text-ember-300"
                        : "border-emerald-700/50 bg-emerald-950/30 text-emerald-200",
                    )}
                  >
                    {t(enemy.regenerating.stopped ? "combatUi.encounter.diesAtTurn" : "combatUi.encounter.regensAtTurn")}
                  </span>
                ) : null}
                {/* DM only: publicEncounter attaches these for the seat that
                    is allowed them, so their presence is the permission. */}
                {enemy.currentHp !== undefined && enemy.status === "alive" ? (
                  <span className="ml-1.5 shrink-0 rounded-full border border-amber-900/60 bg-amber-950/30 px-2 py-0.5 font-mono text-[10px] text-amber-200/90">
                    {t("combatUi.encounter.dmHealth", { current: enemy.currentHp, max: enemy.maxHp!, ac: enemy.ac! })}
                  </span>
                ) : null}
              </div>
              {enemy.legendary ? (
                <div className="mt-1 flex items-center gap-1" title={t("combatUi.encounter.legendaryHint")}>
                  {Array.from({ length: enemy.legendary.actionsMax }, (_, index) => (
                    <Crown
                      key={`a${index}`}
                      className={cn("size-3", index < enemy.legendary!.actions ? "text-violet-300" : "text-stone-700")}
                    />
                  ))}
                  {Array.from({ length: enemy.legendary.resistancesMax }, (_, index) => (
                    <Shield
                      key={`r${index}`}
                      className={cn("size-3", index < enemy.legendary!.resistances ? "text-amber-300" : "text-stone-700")}
                    />
                  ))}
                </div>
              ) : null}
              {enemy.conditions?.length ? (
                <div className="mt-1 flex flex-wrap gap-1">
                  {enemy.conditions.map((condition) => (
                    <ConditionChip
                      key={condition}
                      label={condition}
                      rounds={enemy.conditionRounds?.[condition]}
                      note={enemy.conditionNotes?.[condition]}
                    />
                  ))}
                </div>
              ) : null}
            </li>
          );
  }
}
