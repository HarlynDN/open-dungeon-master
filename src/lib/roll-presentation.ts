// Locale-neutral public caption data only. There are no fields for result
// values, entity IDs or private adjudication context; authored text stays
// literal. A blind roll can keep the same caption it already disclosed.
export type RollDisplayName = { name: string; kind: "enemy" | "proper" };
export type RollPresentation = (
  | { kind: "against"; what: string; target: RollDisplayName }
  | { kind: "area"; what: string; targets: RollDisplayName[]; damageType?: string; actorUnseen?: true }
  | { kind: "death-save"; notes: string[] }
  | { kind: "stable-recovery"; name: string }
) & { physical?: true };
export type RollDetail = { detail: string; presentation: RollPresentation };

// Older rows have no caption data. Unknown/malformed data falls back to the
// original detail, and extra fields from a restored DB are never projected.
export function parseRollPresentation(raw: unknown): RollPresentation | undefined {
  if (!raw || typeof raw !== "object") return;
  const p = raw as Record<string, unknown>;
  if (p.physical !== undefined && p.physical !== true) return;
  const physical = <T extends RollPresentation>(value: T): T => p.physical ? { ...value, physical: true } : value;
  const name = (value: unknown): RollDisplayName | undefined => {
    if (!value || typeof value !== "object") return;
    const n = value as Record<string, unknown>;
    return typeof n.name === "string" && (n.kind === "enemy" || n.kind === "proper")
      ? { name: n.name, kind: n.kind } : undefined;
  };
  if (p.kind === "against" && typeof p.what === "string") {
    const target = name(p.target);
    if (target) return physical({ kind: "against", what: p.what, target });
  }
  if (p.kind === "area" && typeof p.what === "string" && Array.isArray(p.targets)) {
    const targets = [...p.targets].map(name);
    if (targets.some(target => !target)) return;
    if (p.damageType !== undefined && typeof p.damageType !== "string") return;
    if (p.actorUnseen !== undefined && p.actorUnseen !== true) return;
    return physical({ kind: "area", what: p.what, targets: targets as RollDisplayName[],
      ...(typeof p.damageType === "string" ? { damageType: p.damageType } : {}),
      ...(p.actorUnseen ? { actorUnseen: true } : {}) });
  }
  if (p.kind === "death-save" && Array.isArray(p.notes) && [...p.notes].every(note => typeof note === "string")) {
    return physical({ kind: "death-save", notes: [...p.notes] });
  }
  if (p.kind === "stable-recovery" && typeof p.name === "string") return physical({ kind: "stable-recovery", name: p.name });
}
