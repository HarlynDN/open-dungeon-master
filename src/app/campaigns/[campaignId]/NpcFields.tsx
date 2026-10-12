"use client";

import { npcAxisName, npcAxisDescription, npcRelationDescription } from "@/lib/i18n/npc-editor-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { PERSONALITY_AXES } from "@/lib/dm/npc-logic";
import {
  BLANK_PERSONALITY,
  removeRelation,
  setRelation,
  type NpcDraft,
  type RelationGraph,
} from "@/lib/npcs/forge";

// The three parts of the NPC forge that are more than a text box.
//
// Split out of DmNpcForgePanel for the same reason MapTools was split out of
// the map studio: the panel around them is fetching, saving and error
// handling, and these are the fields themselves. Neither half decides
// anything; every change here becomes a draft the server validates
// (src/lib/npcs/forge.ts).

// Who somebody is, as words rather than as numbers. The slider moves an
// integer the engine drifts and compares; the label beside it is the only
// part a DM should have to think in.
export function PersonalitySliders({
  draft,
  onChange,
}: {
  draft: NpcDraft;
  onChange: (draft: NpcDraft) => void;
}) {
  const { locale, t } = useLocale();
  const personality = draft.personality ?? BLANK_PERSONALITY;
  return (
    <>
      {PERSONALITY_AXES.map((axis) => (
        <label key={axis} className="flex items-center gap-2 text-[11px] text-stone-500">
          <span className="w-16 shrink-0">{npcAxisName(axis, locale)}</span>
          <Slider
            min={-3}
            max={3}
            step={1}
            value={personality[axis] ?? 0}
            onChange={(next) =>
              onChange({
                ...draft,
                personality: { ...personality, [axis]: next },
              })
            }
            label={npcAxisName(axis, locale)}
            className="min-w-0 flex-1"
          />
          <span className="w-24 shrink-0 text-right text-stone-400">
            {npcAxisDescription(axis, personality[axis] ?? 0, locale)}
          </span>
        </label>
      ))}
      <p className="text-[10px] text-stone-600">
        {t("npcEditor.personalityNote")}
      </p>
    </>
  );
}

export const GOAL_FIELDS = [
  ["scene", "Right now, in the next scene"],
  ["session", "Working toward over a few sessions"],
  ["ambition", "What they would give up everything for"],
] as const;

export type GoalField = (typeof GOAL_FIELDS)[number][0];

// Typing a goal is not the same as generating one: an emptied box has to
// clear the goal, where a generated blank has to leave it alone.
export function setGoal(draft: NpcDraft, field: GoalField, value: string): NpcDraft {
  const text = value.slice(0, field === "ambition" ? 300 : 200);
  if (field === "session") {
    return {
      ...draft,
      goals: {
        ...draft.goals,
        session: text
          ? {
              text,
              // The progress belongs to the chapter engine, which advances it
              // on background dice; editing the words must not reset it.
              progress: draft.goals.session?.progress ?? 0,
              target: draft.goals.session?.target ?? 3,
            }
          : undefined,
      },
    };
  }
  return { ...draft, goals: { ...draft.goals, [field]: text || undefined } };
}

export function goalText(draft: NpcDraft, field: GoalField): string {
  return field === "session"
    ? draft.goals.session?.text ?? ""
    : (draft.goals[field] as string | undefined) ?? "";
}

// How somebody feels about other people, and the half of that a stored JSON
// field cannot say: whether the other person agrees, and whether they exist.
// Relations are stored per NPC, so a grudge is one-sided until the other side
// writes one back, which is true to life and worth showing.
export function RelationEditor({
  draft,
  graph,
  others,
  onChange,
}: {
  draft: NpcDraft;
  graph: RelationGraph;
  // Everyone else on the roster, so a link can be made by picking a name
  // rather than by typing one and hoping.
  others: string[];
  onChange: (draft: NpcDraft) => void;
}) {
  const { locale, t } = useLocale();
  const edgeFor = (name: string) =>
    graph.edges.find((entry) => {
      const pair = [entry.from.toLowerCase(), entry.to.toLowerCase()];
      return pair.includes(name.toLowerCase()) && pair.includes(draft.name.toLowerCase());
    });

  return (
    <>
      {draft.relations.map((relation) => {
        const edge = edgeFor(relation.npcName);
        const theirScore = edge?.from === draft.name ? edge?.backScore ?? 0 : edge?.score ?? 0;
        return (
          <div key={relation.npcName} className="flex flex-wrap items-center gap-1.5">
            <span className="w-24 shrink-0 truncate text-xs text-stone-300">
              {relation.npcName}
            </span>
            <Slider
              min={-3}
              max={3}
              step={1}
              value={relation.score}
              onChange={(next) =>
                onChange({
                  ...draft,
                  relations: setRelation(draft.relations, relation.npcName, next, relation.note),
                })
              }
              label={t("npcEditor.relationLabel", { name: relation.npcName })}
              className="w-24 shrink-0"
            />
            <span className="w-20 shrink-0 text-[11px] text-stone-400">
              {npcRelationDescription(relation.score, locale)}
            </span>
            <input
              value={relation.note ?? ""}
              onChange={(event) =>
                onChange({
                  ...draft,
                  relations: setRelation(
                    draft.relations,
                    relation.npcName,
                    relation.score,
                    event.target.value,
                  ),
                })
              }
              placeholder={t("npcEditor.why")}
              className="min-w-20 flex-1 rounded-md border border-stone-700 bg-stone-950 px-1.5 py-0.5 text-[11px] text-stone-400"
            />
            {edge?.dangling ? (
              <span className="text-[10px] text-amber-300/80">{t("npcEditor.dangling")}</span>
            ) : edge?.mutual ? (
              <span className="text-[10px] text-stone-600">
                {t("npcEditor.mutual", { relation: npcRelationDescription(theirScore, locale) })}
              </span>
            ) : (
              <span className="text-[10px] text-stone-600">{t("npcEditor.oneSided")}</span>
            )}
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...draft,
                  relations: removeRelation(draft.relations, relation.npcName),
                })
              }
              aria-label={t("npcEditor.removeRelation", { name: relation.npcName })}
              className="text-stone-600 hover:text-red-300"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-1">
        {others
          .filter(
            (name) =>
              !draft.relations.some(
                (relation) => relation.npcName.toLowerCase() === name.toLowerCase(),
              ),
          )
          .map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange({ ...draft, relations: setRelation(draft.relations, name, 0) })}
              className="rounded-md border border-stone-700 px-1.5 py-0.5 text-[10px] text-stone-500 hover:text-stone-200"
            >
              + {name}
            </button>
          ))}
      </div>
    </>
  );
}
