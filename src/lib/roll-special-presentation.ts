import type { RollDisplayName } from "./roll-presentation";

// These are public caption parameters, not roll results or rule inputs.
export type RollSpecialContext =
  | { kind: "named" | "healing" | "temporary-hp" | "hp-pool" | "item-hours" | "poison-damage" | "charges" | "last-charge" | "dawn-charges"; name: string; literalName?: true; dice?: string }
  | { kind: "hp-max" | "healing-target"; name: string; target: RollDisplayName; dice?: string; literalName?: true }
  | { kind: "ray" | "npc-reaction"; target: RollDisplayName }
  | { kind: "healer-kit"; target: RollDisplayName; hitDice: number }
  | { kind: "short-rest"; count: number; songDie?: string; chefDie?: string }
  | { kind: "mirror"; threshold: number }
  | { kind: "intervention"; level: number }
  | { kind: "treasure"; dice: string; multiplier: number }
  | { kind: "affliction-onset"; name: string; unit: "hours" | "days"; literalName?: true }
  | { kind: "madness"; term: "short" | "long" | "indefinite" }
  | { kind: "blink" | "confusion" | "recharge" | "madness-blind" | "madness-minutes" | "madness-hours" | "fever-dc" | "fever-damage" };

export function parseRollSpecialContext(raw: unknown): RollSpecialContext | undefined {
  if (!raw || typeof raw !== "object") return;
  const c = raw as Record<string, unknown>;
  if (typeof c.kind !== "string") return;
  const name = (value: unknown): RollDisplayName | undefined => {
    if (!value || typeof value !== "object") return;
    const n = value as Record<string, unknown>;
    return typeof n.name === "string" && (n.kind === "enemy" || n.kind === "proper") ? { name: n.name, kind: n.kind } : undefined;
  };
  const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
  if (["blink", "confusion", "recharge", "madness-blind", "madness-minutes", "madness-hours", "fever-dc", "fever-damage"].includes(c.kind)) return { kind: c.kind } as RollSpecialContext;
  if (c.kind === "madness" && typeof c.term === "string" && ["short", "long", "indefinite"].includes(c.term)) return { kind: "madness", term: c.term as "short" | "long" | "indefinite" };
  if (c.kind === "mirror" && finite(c.threshold)) return { kind: "mirror", threshold: c.threshold };
  if (c.kind === "intervention" && finite(c.level)) return { kind: "intervention", level: c.level };
  if (c.kind === "treasure" && finite(c.multiplier) && typeof c.dice === "string") return { kind: "treasure", dice: c.dice, multiplier: c.multiplier };
  if (c.kind === "short-rest" && finite(c.count)) {
    if ([c.songDie, c.chefDie].some(value => value !== undefined && typeof value !== "string")) return;
    return { kind: "short-rest", count: c.count, ...(typeof c.songDie === "string" ? { songDie: c.songDie } : {}), ...(typeof c.chefDie === "string" ? { chefDie: c.chefDie } : {}) };
  }
  const target = c.target === undefined ? undefined : name(c.target);
  if (c.target !== undefined && !target) return;
  if (["ray", "npc-reaction"].includes(c.kind) && target) return { kind: c.kind, target } as RollSpecialContext;
  if (c.kind === "healer-kit" && target && finite(c.hitDice)) return { kind: "healer-kit", target, hitDice: c.hitDice };
  if (c.literalName !== undefined && c.literalName !== true) return;
  const literal = c.literalName ? { literalName: true as const } : {};
  if (c.kind === "affliction-onset" && typeof c.name === "string" && (c.unit === "hours" || c.unit === "days")) return { kind: "affliction-onset", name: c.name, unit: c.unit, ...literal };
  if (["named", "healing", "temporary-hp", "hp-pool", "item-hours", "poison-damage", "charges", "last-charge", "dawn-charges", "hp-max", "healing-target"].includes(c.kind) && typeof c.name === "string") {
    if (c.dice !== undefined && typeof c.dice !== "string") return;
    if (["hp-max", "healing-target"].includes(c.kind) && !target) return;
    return { kind: c.kind, name: c.name, ...literal, ...(target ? { target } : {}), ...(typeof c.dice === "string" ? { dice: c.dice } : {}) } as RollSpecialContext;
  }
}
