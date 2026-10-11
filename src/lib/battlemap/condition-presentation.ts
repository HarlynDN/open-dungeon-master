import type { ConditionMetaLike } from "./condition-notes";

// Public display data, not a second rules representation. Producers resolve
// identities against the viewer's allowed names before constructing it.
export type ConditionDisplayName = { name: string; kind: "enemy" | "proper" };
export type ConditionNameLookup = (id: string) => ConditionDisplayName | null;
export type ConditionDuration =
  | { kind: "rounds"; rounds: number }
  | { kind: "turn"; phase: "start" | "end"; next: boolean; who?: ConditionDisplayName };
export type ConditionSource =
  | { kind: "trigger"; text: string }
  | { kind: "engine"; value: "stable" | "knocked out" | "check" }
  | { kind: "creature"; who: ConditionDisplayName };
export type ConditionPresentation =
  | { kind: "effect"; name: string; effectId?: string; duration?: ConditionDuration;
      saveEnds?: { ability: string; dc: number }; source?: ConditionSource; spell?: string }
  | { kind: "concentration"; spell: string }
  | { kind: "exhaustion"; level: number }
  | { kind: "death-track"; successes: number; failures: number; stable: boolean }
  | { kind: "knocked-out" }
  | { kind: "regenerating"; stopped: boolean }
  | { kind: "silence"; spell: string };

export function conditionPresentation(
  name: string, meta: ConditionMetaLike | undefined, nameOf: ConditionNameLookup,
  holderId?: string, effectId?: string,
): Extract<ConditionPresentation, { kind: "effect" }> {
  const result: Extract<ConditionPresentation, { kind: "effect" }> = { kind: "effect", name };
  if (effectId) result.effectId = effectId;
  if (!meta) return result;
  const turnId = meta.untilTurnEndOf || meta.untilTurnOf;
  if (turnId) {
    const who = turnId === holderId ? null : nameOf(turnId);
    result.duration = { kind: "turn", phase: meta.untilTurnEndOf ? "end" : "start",
      next: meta.untilTurnEndOf ? !meta.turnBegun : true, ...(who ? { who } : {}) };
  } else if (typeof meta.rounds === "number" && meta.rounds > 0) {
    result.duration = { kind: "rounds", rounds: meta.rounds };
  }
  if (meta.saveEnds) result.saveEnds = { ...meta.saveEnds };
  const raw = meta.source?.trim() ?? "";
  const lower = raw.toLowerCase();
  if (name.trim().toLowerCase() === "readied" && raw) result.source = { kind: "trigger", text: raw };
  else if (lower === "stable" || lower === "knocked out" || lower === "check") result.source = { kind: "engine", value: lower };
  else if (raw) {
    const who = nameOf(raw);
    if (who) result.source = { kind: "creature", who };
  }
  if (meta.spell) result.spell = meta.spell;
  return result;
}

export function conditionNamesLookup(entries: Array<{ id: string; name: string; kind: string }>): ConditionNameLookup {
  const names = new Map(entries.map(entry => [entry.id, { name: entry.name,
    kind: entry.kind === "enemy" ? "enemy" as const : "proper" as const }]));
  return id => names.get(id) ?? null;
}
