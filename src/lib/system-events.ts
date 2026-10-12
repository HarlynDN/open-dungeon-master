import { isAppLocale, type AppLocale } from "./i18n/locales.ts";

// Native event facts, not translated protocol values. New families can extend
// this union and their display catalog without inspecting historical prose.
export type OpportunityEventData = {
  kind: "opportunity";
  mode: "enemyHit" | "enemyMiss" | "evaded" | "pcHit" | "pcMiss";
  actor: string; target: string; english: string;
  total?: number; ac?: number; damage?: number; critical?: boolean;
  feature?: string; parryBonus?: number; health?: string; dropped?: boolean;
  details?: string[]; conditions?: string[];
};
export type DeathEventData = {
  kind: "death"; outcome: "massive" | "wounds" | "revive" | "stable" | "dead" | "save" | "wake";
  actor: string; english: string; total?: number; success?: boolean;
  successes?: number; failures?: number; hours?: number;
};
export type RestEventData = {
  kind: "rest"; rest: "short" | "long"; minutes: number; english: string;
  // Already rendered once in the campaign locale, alongside the native instant.
  // A later calendar edit/UI switch must not reinterpret a historical date.
  clockText?: string; instant?: number;
  skipped: Array<{ actor: string; reason: "dead" | "zeroHp" | "tooSoon" }>;
};
export type SystemEventData =
  | DeathEventData | RestEventData
  | OpportunityEventData
  | { kind: "partyItem"; direction: "stow" | "take"; actor: string; item: string; qty: number }
  | { kind: "partyCoins"; direction: "deposit" | "withdraw"; actor: string; copper: number }
  | { kind: "partyXp"; spent: number; names: string[] };
export type SystemEvent = SystemEventData & { locale: AppLocale };
export function parseSystemEvent(raw: unknown): SystemEvent | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const event = raw as Record<string, unknown>;
  if (!isAppLocale(event.locale)) return undefined;
  const integer = (value: unknown) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
  if (event.kind === "death" && ["massive", "wounds", "revive", "stable", "dead", "save", "wake"].includes(String(event.outcome)) && typeof event.actor === "string" && typeof event.english === "string") {
    const result: DeathEventData & { locale: AppLocale } = { kind: "death", outcome: event.outcome as DeathEventData["outcome"], actor: event.actor, english: event.english, locale: event.locale };
    if (event.outcome === "stable") {
      if (!integer(event.hours) || Number(event.hours) < 1) return undefined;
      result.hours = Number(event.hours);
    }
    if (event.outcome === "save") {
      if (typeof event.total !== "number" || !Number.isSafeInteger(event.total) || typeof event.success !== "boolean" || !integer(event.successes) || !integer(event.failures) || Number(event.successes) > 3 || Number(event.failures) > 3) return undefined;
      Object.assign(result, { total: event.total, success: event.success, successes: event.successes, failures: event.failures });
    }
    return result;
  }
  if (event.kind === "rest" && (event.rest === "short" || event.rest === "long") && integer(event.minutes) && typeof event.english === "string" && Array.isArray(event.skipped)) {
    const skipped: RestEventData["skipped"] = [];
    for (const row of event.skipped) {
      if (!row || typeof row !== "object" || typeof row.actor !== "string" || !["dead", "zeroHp", "tooSoon"].includes(row.reason)) return undefined;
      skipped.push({ actor: row.actor, reason: row.reason });
    }
    if (event.clockText !== undefined && typeof event.clockText !== "string") return undefined;
    if (event.instant !== undefined && !integer(event.instant)) return undefined;
    return { kind: "rest", rest: event.rest, minutes: Number(event.minutes), english: event.english, skipped, locale: event.locale, ...(typeof event.clockText === "string" ? { clockText: event.clockText } : {}), ...(event.instant !== undefined ? { instant: Number(event.instant) } : {}) };
  }
  if (event.kind === "opportunity" && ["enemyHit", "enemyMiss", "evaded", "pcHit", "pcMiss"].includes(String(event.mode)) && typeof event.actor === "string" && typeof event.target === "string" && typeof event.english === "string") {
    const result: OpportunityEventData & { locale: AppLocale } = { kind: "opportunity", mode: event.mode as OpportunityEventData["mode"], actor: event.actor, target: event.target, english: event.english, locale: event.locale };
    for (const key of ["total", "ac", "damage", "parryBonus"] as const) {
      if (event[key] !== undefined) {
        if (typeof event[key] !== "number" || !Number.isSafeInteger(event[key])) return undefined;
        result[key] = event[key];
      }
    }
    for (const key of ["feature", "health"] as const) if (event[key] !== undefined) {
      if (typeof event[key] !== "string") return undefined;
      result[key] = event[key];
    }
    for (const key of ["critical", "dropped"] as const) if (event[key] !== undefined) {
      if (typeof event[key] !== "boolean") return undefined;
      result[key] = event[key];
    }
    for (const key of ["details", "conditions"] as const) if (event[key] !== undefined) {
      if (!Array.isArray(event[key]) || !event[key].every(value => typeof value === "string")) return undefined;
      result[key] = [...event[key]];
    }
    if (result.mode !== "evaded" && (result.total === undefined || result.ac === undefined)) return undefined;
    if (["enemyHit", "pcHit"].includes(result.mode) && (result.damage === undefined || result.damage < 0)) return undefined;
    if (result.mode === "evaded" && result.feature === undefined) return undefined;
    return result;
  }
  if (event.kind === "partyItem" && (event.direction === "stow" || event.direction === "take") && typeof event.actor === "string" && typeof event.item === "string" && integer(event.qty) && Number(event.qty) > 0) {
    return { kind: event.kind, direction: event.direction, actor: event.actor, item: event.item, qty: event.qty as number, locale: event.locale };
  }
  if (event.kind === "partyCoins" && (event.direction === "deposit" || event.direction === "withdraw") && typeof event.actor === "string" && integer(event.copper)) {
    return { kind: event.kind, direction: event.direction, actor: event.actor, copper: event.copper as number, locale: event.locale };
  }
  if (event.kind === "partyXp" && integer(event.spent) && Array.isArray(event.names) && event.names.every(name => typeof name === "string")) {
    return { kind: event.kind, spent: event.spent as number, names: [...event.names], locale: event.locale };
  }
  return undefined;
}
export function systemEventGlyph(event: SystemEvent | undefined): string | undefined {
  switch (event?.kind) {
    case "death": return "rest-death-save";
    case "rest": return event.rest === "long" ? "rest-long" : "rest-short";
    case "opportunity": return event.mode === "evaded" ? "cue-calm" : "cue-battle";
    case "partyItem": return "tab-party";
    case "partyCoins": return "cue-coin";
    case "partyXp": return "rest-level-up";
    default: return undefined;
  }
}
