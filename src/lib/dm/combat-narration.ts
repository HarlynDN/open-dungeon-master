import { collectExchanges, type GuardMessage, type LiveState } from "./engine-boundary.ts";
import { normalizeLocale, type AppLocale } from "../i18n/locales.ts";
import { referenceAliases } from "../i18n/reference-names.ts";
import { referenceDisplayName } from "../i18n/references.ts";

export type CombatReference = { id?: string; name: string; kind?: "monster" | "proper" };
export type CombatFactSource = { exchange: number; tool: string; path: string };
type FactBase = { id: string; source: CombatFactSource };
// Facts retain individual calls/swings, never a single hit flag per monster name.
// They are presentation data only: rendering/retrying must not invoke the engine.
type CombatFactData = (
  | { kind: "attack"; actor?: CombatReference; target: CombatReference; hit: boolean; damage?: number; critical: boolean; swing?: number }
  | { kind: "damage"; target: CombatReference; amount: number }
  | { kind: "healing"; target: CombatReference; amount: number }
  | { kind: "state"; target: CombatReference; state: "alive" | "downed" | "dead"; unconscious?: boolean }
  | { kind: "spell"; actor?: CombatReference; spell: string; resolution: "cast" | "accounted" }
  | { kind: "resource"; actor?: CombatReference; resource: string; level?: number }
  | { kind: "refused"; actor?: CombatReference; target?: CombatReference; reason: "countered" | "refused" | "unconfirmed" }
);
export type CombatFact = FactBase & CombatFactData;
export type CombatFactOptions = { names?: Readonly<Record<string, string>>; live?: LiveState | null; resolveName?: (id: string) => string | undefined; allowText?: (text: string) => boolean };

const COMBAT_TOOLS = new Set([
  "pc_attack", "enemy_attack", "pet_attack", "cast_at_enemy", "cast_at_player", "aoe_damage",
  "damage_enemy", "apply_damage", "heal", "use_spell_slot", "use_resource", "cast_buff", "use_item",
]);
const object = (value: unknown): Record<string, unknown> | null => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";
const amount = (value: unknown): number | undefined => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;

export function collectCombatFacts(conversation: readonly GuardMessage[], options: CombatFactOptions = {}): CombatFact[] {
  const facts: CombatFact[] = [];
  const names = { ...options.names, ...Object.fromEntries((options.live?.enemies ?? []).map(enemy => [enemy.id, enemy.name])) };
  const reference = (id: unknown, name?: unknown, kind: CombatReference["kind"] = "proper"): CombatReference | undefined => {
    const key = text(id);
    const label = text(name) || names[key] || (key ? options.resolveName?.(key) : undefined);
    return label ? { ...(key ? { id: key } : {}), name: label, kind } : undefined;
  };
  collectExchanges(conversation).forEach((exchange, index) => {
    if (!COMBAT_TOOLS.has(exchange.name) || !exchange.result) return; // parked calls have no outcome
    let args: Record<string, unknown> = {};
    try { args = object(JSON.parse(exchange.arguments)) ?? {}; } catch { /* invalid call */ }
    const result = exchange.result;
    // The same key means different things across tools: characterId is the
    // victim of cast_at_player and the owner, not the attacker, of pet_attack.
    const actorId = exchange.name === "enemy_attack" ? args.enemyId
      : exchange.name === "cast_at_player" ? args.casterEnemyId
        : exchange.name === "pet_attack" ? args.petId : args.characterId;
    const actor = reference(actorId, result.attacker ?? result.caster, ["enemy_attack", "cast_at_player"].includes(exchange.name) ? "monster" : "proper");
    const targetKind = args.targetCharacterId ? "proper" : args.targetEnemyId || ["pc_attack", "pet_attack", "cast_at_enemy", "damage_enemy", "aoe_damage"].includes(exchange.name) ? "monster" : "proper";
    const target = reference(args.targetEnemyId ?? args.targetCharacterId ?? args.characterId ?? args.enemyId, result.target ?? result.name, targetKind);
    const push = (path: string, data: CombatFactData) => {
      facts.push({ ...data, id: `${index}:${path}:${data.kind}`, source: { exchange: index, tool: exchange.name, path } } as CombatFact);
    };
    if (result.dryRun === true) return;
    const slotLine = text(result.slotSpent ?? result.slot);
    const slotLevel = /^(?:pact slot )?level (\d+):/i.exec(slotLine);
    if (slotLevel) push("slot", { kind: "resource", actor, resource: "spellSlot", level: Number(slotLevel[1]) });
    if ("error" in result || result.ok === false) {
      push("result", { kind: "refused", actor, target, reason: result.countered === true ? "countered" : "error" in result ? "refused" : "unconfirmed" });
      return; // a refusal does not prove a slot or resource was refunded
    }
    const walk = (row: Record<string, unknown>, path: string, inherited?: CombatReference, inheritedActor: CombatReference | null | undefined = actor, rowKind: CombatReference["kind"] = targetKind) => {
      if ("error" in row || row.ok === false) return;
      const explicit = reference(row.targetId ?? row.enemyId ?? row.characterId, row.target ?? row.name, row.enemyId ? "monster" : row.characterId ? "proper" : rowKind);
      const who = explicit && !explicit.id && explicit.name === inherited?.name ? { ...inherited, ...explicit } : explicit ?? inherited;
      const explicitActor = reference(row.attackerId, row.attacker, inheritedActor?.kind);
      const rowActor = explicitActor && !explicitActor.id && explicitActor.name === inheritedActor?.name
        ? { ...inheritedActor, ...explicitActor } : explicitActor ?? inheritedActor ?? undefined;
      const swings = Array.isArray(row.swings) ? row.swings : [];
      if (who && typeof row.hit === "boolean" && !swings.length) {
        push(path, { kind: "attack", actor: rowActor, target: who, hit: row.hit,
          ...(row.hit && amount(row.damageApplied ?? row.damage ?? row.totalDamage) !== undefined ? { damage: amount(row.damageApplied ?? row.damage ?? row.totalDamage) } : {}),
          critical: row.hit && row.crit === true });
      } else if (who && typeof row.hit !== "boolean") {
        const damage = amount(row.damageApplied ?? row.damage ?? row.totalDamage ?? row.taken);
        if (damage !== undefined) push(path, { kind: "damage", target: who, amount: damage });
      }
      if (who && amount(row.healed ?? row.healing) !== undefined) push(path, { kind: "healing", target: who, amount: amount(row.healed ?? row.healing)! });
      if (who && (row.dead === true || row.slain === true)) push(path, { kind: "state", target: who, state: "dead" });
      else if (who && [row.dropped, row.downed, row.down, row.knockedOut].includes(true)) push(path, { kind: "state", target: who, state: "downed",
        ...(row.knockedOut === true || (Array.isArray(row.conditions) && row.conditions.includes("unconscious")) ? { unconscious: true } : {}) });
      // Only actual outcome subtrees, never stat blocks, previews or arbitrary numbers.
      for (const key of ["swings", "results", "targets", "opportunityAttacks"]) {
        const rows = row[key];
        if (!Array.isArray(rows)) continue;
        rows.forEach((child, childIndex) => {
          const entry = object(child);
          if (!entry) return;
          const before = facts.length;
          walk(entry, `${path}.${key}.${childIndex}`, who, key === "opportunityAttacks" ? null : rowActor, key === "opportunityAttacks" ? "proper" : rowKind);
          if (key === "swings") for (const fact of facts.slice(before)) if (fact.kind === "attack") fact.swing = childIndex + 1;
        });
      }
    };
    walk(result, "result", target);
    if (exchange.name === "use_resource" && text(args.resource ?? args.name)) {
      push("resource", { kind: "resource", actor, resource: text(args.resource ?? args.name) });
    }
    if (["cast_at_enemy", "cast_at_player", "cast_buff", "aoe_damage", "use_spell_slot"].includes(exchange.name) && text(args.spell)) {
      push("spell", { kind: "spell", actor, spell: text(args.spell),
        resolution: ["cast_at_enemy", "cast_at_player", "cast_buff"].includes(exchange.name) && result.ok === true ? "cast" : "accounted" });
    }
  });
  return facts;
}

type CombatPresentation = {
  heading: string; fallback: string; actor: string; target: string;
  reference: (name: string) => string;
  attack: (actor: string, target: string, hit: boolean, critical: boolean, swing?: number) => string;
  damage: (target: string, amount: number) => string;
  healing: (target: string, amount: number) => string;
  state: (target: string, state: "alive" | "downed" | "dead", unconscious?: boolean) => string;
  spell: (actor: string, spell: string, resolution: "cast" | "accounted") => string;
  resource: (actor: string, resource: string, level?: number) => string;
  refused: (actor: string, target: string, reason: "countered" | "refused" | "unconfirmed") => string;
};
// Adding an AppLocale requires a renderer, not conditionals in the engine.
export const COMBAT_PRESENTATIONS: Record<AppLocale, CombatPresentation> = {
  en: {
    reference: name => name,
    heading: "Combat results", fallback: "The moment pauses. Choose your next action.", actor: "The attacker", target: "the target",
    attack: (actor, target, hit, critical, swing) => `${actor}'s ${swing ? `attack ${swing}` : "attack"} on ${target} ${hit ? critical ? "is a critical hit" : "hits" : "misses"}.`,
    damage: (target, value) => `${target} takes ${value} damage.`, healing: (target, value) => `${target} receives ${value} healing.`,
    state: (target, state) => `${target} ${state === "dead" ? "is dead" : state === "downed" ? "is down, not confirmed dead" : "is still alive"}.`,
    spell: (actor, spell) => `${actor}'s casting of ${spell} is recorded.`,
    resource: (actor, resource, level) => level ? `${actor} spent a level ${level} spell slot.` : `${actor} used ${resource}.`,
    refused: (actor, target) => `The engine did not confirm ${actor}'s action on ${target} as successful.`,
  },
  "zh-CN": {
    reference: name => /\d$/.test(name) ? `${name} ` : name,
    heading: "战斗结果", fallback: "这一幕暂告一段落，请选择下一步行动。", actor: "攻击者", target: "目标",
    attack: (actor, target, hit, critical, swing) => `${actor}对${target}的${swing ? `第${swing}次` : "这次"}攻击${hit ? critical ? "重击命中" : "命中" : "未命中"}。`,
    damage: (target, value) => `${target}受到 ${value} 点伤害。`, healing: (target, value) => `${target}获得 ${value} 点治疗。`,
    state: (target, state, unconscious) => `${target}${state === "dead" ? "已经死亡" : state === "downed" ? unconscious ? "倒地失去意识，仍然活着" : "倒下了" : "仍然存活"}。`,
    spell: (actor, spell, resolution) => resolution === "cast" ? `${actor}施放了${spell}。` : `${spell}的效果尚待确认。`,
    resource: (actor, resource, level) => level ? `${actor}消耗了 1 个 ${level} 环法术位。` : `${actor}使用了${resource}。`,
    refused: (actor, target, reason) => reason === "countered" ? `${actor}的法术被反制，未能生效。`
      : reason === "refused" ? `${actor}无法对${target}完成这次行动。` : `${actor}对${target}的这次行动结果尚未确定。`,
  },
};

export function renderCombatFacts(facts: readonly CombatFact[], locale: AppLocale): string {
  const selected = normalizeLocale(locale);
  const renderer = COMBAT_PRESENTATIONS[selected];
  const name = (reference: CombatReference | undefined, fallback: string) => {
    if (!reference) return fallback;
    const label = reference.kind === "monster" ? referenceDisplayName("monster", reference.name, selected) : reference.name;
    return renderer.reference(label);
  };
  return facts.map(fact => {
    if (fact.kind === "attack") return [
      renderer.attack(name(fact.actor, renderer.actor), name(fact.target, renderer.target), fact.hit, fact.critical, fact.swing),
      ...(fact.damage === undefined ? [] : [renderer.damage(name(fact.target, renderer.target), fact.damage)]),
    ].join(" ");
    if (fact.kind === "damage" || fact.kind === "healing") return renderer[fact.kind](name(fact.target, renderer.target), fact.amount);
    if (fact.kind === "state") return renderer.state(name(fact.target, renderer.target), fact.state, fact.unconscious);
    if (fact.kind === "spell") return renderer.spell(name(fact.actor, renderer.actor), referenceAliases("spell", fact.spell.toLowerCase(), selected)[0] ?? fact.spell, fact.resolution);
    if (fact.kind === "resource") return renderer.resource(name(fact.actor, renderer.actor), fact.resource, fact.level);
    return renderer.refused(name(fact.actor, renderer.actor), name(fact.target, renderer.target), fact.reason);
  }).join("\n");
}

export function combatFallback(conversation: readonly GuardMessage[], locale: AppLocale, options: CombatFactOptions = {}): string {
  let facts = collectCombatFacts(conversation, options);
  if (!facts.length && options.live) {
    facts = options.live.enemies.filter(enemy => enemy.status === "alive" || enemy.status === "dead").map(enemy => ({
      id: `live:${enemy.id}`, source: { exchange: -1, tool: "liveState", path: enemy.id }, kind: "state",
      target: { id: enemy.id, name: enemy.name, kind: "monster" }, state: enemy.status === "dead" ? "dead" : enemy.hp <= 0 ? "downed" : "alive",
    }));
  }
  return renderCombatFacts(facts, locale) || COMBAT_PRESENTATIONS[normalizeLocale(locale)].fallback;
}

export function combatNarrationPrompt(conversation: readonly GuardMessage[], locale: AppLocale, options: CombatFactOptions = {}): string {
  const facts = collectCombatFacts(conversation, options);
  if (!facts.length) return "";
  return `[System: engine combat facts]\n${facts.map(fact => `[${fact.id}] ${renderCombatFacts([fact], locale)}`).join("\n")}\nThese are already resolved facts, in event order. The server presents these conclusions separately. Describe the actions, atmosphere and dialogue in the campaign locale, consistent with EVERY event. Use explicit target names when stating hit/miss/death. A hit is not necessarily damage; downed is not dead. Never replay tools, recompute damage, invent state changes, or repeat this fact list in your prose.`;
}

export function combatConclusions(conversation: readonly GuardMessage[], locale: AppLocale, options: CombatFactOptions = {}): string {
  const rendered = renderCombatFacts(collectCombatFacts(conversation, options), locale);
  return rendered ? `**${COMBAT_PRESENTATIONS[normalizeLocale(locale)].heading}**\n${rendered}` : "";
}

export function combatNarrationContent(narration: string, conversation: readonly GuardMessage[], locale: AppLocale, options: CombatFactOptions = {}): string {
  const proposed = combatConclusions(conversation, locale, options);
  const conclusions = !options.allowText || options.allowText(proposed) ? proposed : "";
  const plain = renderCombatFacts(collectCombatFacts(conversation, options), locale);
  if (conclusions && narration.replace(/\[roll:[^\]]*\]/g, "").trim() === plain) {
    return [conclusions, ...(narration.match(/\[roll:[^\]]*\]/g) ?? [])].join("\n\n");
  }
  return [conclusions, narration].filter(Boolean).join("\n\n");
}
