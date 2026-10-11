// Locale-neutral public caption data only. There are no fields for result
// values, entity IDs or private adjudication context; authored text stays
// literal. A blind roll can keep the same caption it already disclosed.
export type RollDisplayName = { name: string; kind: "enemy" | "proper" };
export type RollCheckContext =
  | { kind: "group" | "contest" | "hide" | "search" | "hold-grapple" | "land-jump" }
  | { kind: "grapple" | "shove" | "insight-deception"; target: RollDisplayName }
  | { kind: "dispel" | "counterspell" | "escape-spell" | "save-against" | "concentration" | "feature-save"; name: string }
  | { kind: "escape-grapple"; target?: RollDisplayName; difficulty?: number }
  | { kind: "authored"; text: string };
export type RollPresentation = (
  | { kind: "against"; what: string; target: RollDisplayName }
  | { kind: "area"; what: string; targets: RollDisplayName[]; damageType?: string; actorUnseen?: true }
  | { kind: "death-save"; notes: string[] }
  | { kind: "stable-recovery"; name: string }
  | { kind: "check"; term: { kind: "skill" | "ability"; key: string }; owner?: RollDisplayName; context?: RollCheckContext }
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
  if (p.kind === "check" && p.term && typeof p.term === "object") {
    const term = p.term as Record<string, unknown>;
    if ((term.kind !== "skill" && term.kind !== "ability") || typeof term.key !== "string") return;
    const owner = p.owner === undefined ? undefined : name(p.owner);
    if (p.owner !== undefined && !owner) return;
    let context: RollCheckContext | undefined;
    if (p.context !== undefined) {
      if (!p.context || typeof p.context !== "object") return;
      const c = p.context as Record<string, unknown>;
      if (typeof c.kind !== "string") return;
      if (c.kind === "escape-grapple") {
        const target = c.target === undefined ? undefined : name(c.target);
        if ((c.target !== undefined && !target) || (c.difficulty !== undefined && (typeof c.difficulty !== "number" || !Number.isFinite(c.difficulty) || !target))) return;
        context = { kind: "escape-grapple", ...(target ? { target } : {}), ...(typeof c.difficulty === "number" ? { difficulty: c.difficulty } : {}) };
      } else if (["group", "contest", "hide", "search", "hold-grapple", "land-jump"].includes(c.kind)) {
        context = { kind: c.kind } as RollCheckContext;
      } else if (["grapple", "shove", "insight-deception"].includes(c.kind)) {
        const target = name(c.target);
        if (!target) return;
        context = { kind: c.kind, target } as RollCheckContext;
      } else if (["dispel", "counterspell", "escape-spell", "save-against", "concentration", "feature-save"].includes(c.kind) && typeof c.name === "string") {
        context = { kind: c.kind, name: c.name } as RollCheckContext;
      } else if (c.kind === "authored" && typeof c.text === "string") context = { kind: "authored", text: c.text };
      else return;
    }
    return physical({ kind: "check", term: { kind: term.kind, key: term.key }, ...(owner ? { owner } : {}), ...(context ? { context } : {}) });
  }
}
