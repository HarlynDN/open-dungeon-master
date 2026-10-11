import assert from "node:assert/strict";
import { collectCombatFacts, renderCombatFacts, combatFallback, combatNarrationContent, combatNarrationPrompt, COMBAT_PRESENTATIONS } from "../src/lib/dm/combat-narration.ts";
import { resolveNarration } from "../src/lib/dm/narration-policy.ts";
import { APP_LOCALES } from "../src/lib/i18n/locales.ts";
import { checkNarration } from "../src/lib/dm/engine-boundary.ts";

const conversation = entries => [
  { role: "assistant", content: "", tool_calls: entries.map((entry, i) => ({ id: `c${i}`, function: { name: entry.tool ?? "pc_attack", arguments: JSON.stringify(entry.args ?? {}) } })) },
  ...entries.map((entry, i) => ({ role: "tool", tool_call_id: `c${i}`, content: JSON.stringify(entry.result) })),
];
let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log(`ok: ${name}`); }
const miss = conversation([{ args: { characterId: "hero", targetEnemyId: "e1" }, result: { attacker: "阿明", target: "Goblin 1", hit: false, rolled: 3, vsAc: 13 } }]);

await test("every registered locale renders engine facts without changing protocols", () => {
  assert.deepEqual(Object.keys(COMBAT_PRESENTATIONS), [...APP_LOCALES]);
  const before = structuredClone(miss);
  const facts = collectCombatFacts(miss);
  assert.equal(facts[0].actor.id, "hero");
  assert.equal(facts[0].target.id, "e1");
  assert.equal(facts[0].hit, false);
  assert.match(renderCombatFacts(facts, "zh-CN"), /阿明对哥布林 1.*未命中/);
  assert.match(renderCombatFacts(facts, "en"), /Goblin 1.*misses/);
  assert.doesNotMatch(renderCombatFacts(facts, "zh-CN"), /13|AC|3点/);
  assert.deepEqual(miss, before);
});
await test("individual calls and multiattack swings preserve conflicting outcomes and IDs", () => {
  const messages = conversation([
    { args: { targetEnemyId: "e1" }, result: { target: "Goblin 1", hit: false } },
    { args: { targetEnemyId: "e2" }, result: { target: "Goblin 2", hit: true, crit: true, damage: 0 } },
    { tool: "enemy_attack", args: { enemyId: "e1", targetCharacterId: "hero" }, result: { target: "阿明", hit: true, totalDamage: 5, swings: [{ hit: false }, { hit: true, damage: 5 }] } },
  ]);
  const facts = collectCombatFacts(messages, { names: { e1: "Goblin 1" } });
  assert.equal(new Set(facts.map(f => f.id)).size, facts.length);
  assert.deepEqual(facts.filter(f => f.kind === "attack").map(f => [f.target.id, f.hit, f.swing]), [["e1", false, undefined], ["e2", true, undefined], ["hero", false, 1], ["hero", true, 2]]);
  const rendered = renderCombatFacts(facts, "zh-CN");
  assert.match(rendered, /重击命中.*受到0点伤害/s);
  assert.equal((rendered.match(/5点伤害/g) ?? []).length, 1, "multiattack total was counted twice");
});
await test("downed is not dead; bodies, negation, metaphor and quoted speech are checked conservatively", () => {
  assert.equal(checkNarration({ locale: "zh-CN", conversation: miss, narration: "短剑刺入哥布林的胸膛。" })[0].kind, "hit");
  for (const narration of ["短剑没有刺入哥布林的胸膛。", "短剑刺入哥布林身旁的泥土。", "「短剑刺入哥布林的胸膛！」有人喊道。", "如果短剑刺入哥布林的胸膛，战斗就会结束。"])
    assert.deepEqual(checkNarration({ locale: "zh-CN", conversation: miss, narration }), []);
  const down = conversation([{ result: { target: "Goblin 1", name: "Goblin 1", hit: true, damage: 7, hp: "0/40", knockedOut: true } }]);
  assert.match(renderCombatFacts(collectCombatFacts(down), "zh-CN"), /倒地，尚未被判定死亡/);
  assert.equal(checkNarration({ locale: "zh-CN", conversation: down, narration: "哥布林死了。" })[0].kind, "death");
});
await test("nested targets, actual slot spend, free casts, previews and refusals do not invent outcomes", () => {
  const messages = conversation([
    { tool: "aoe_damage", args: { characterId: "hero", spell: "Fireball" }, result: { results: [{ target: "Goblin 1", damage: 12, dead: true }, { target: "Goblin 2", damage: 6 }] } },
    { tool: "use_spell_slot", args: { characterId: "hero", level: 3, spell: "Fireball" }, result: { ok: true, slot: "cast as a ritual: no slot spent", slotLevel: 3 } },
    { tool: "use_spell_slot", args: { characterId: "hero", level: 3 }, result: { ok: true, dryRun: true, slotLevel: 3 } },
    { tool: "cast_at_enemy", args: { characterId: "hero", targetEnemyId: "e1", spell: "Fireball" }, result: { error: "Counterspelled", countered: true, slotSpent: "level 3: 1/2 left" } },
  ]);
  const facts = collectCombatFacts(messages, { names: { hero: "阿明", e1: "Goblin 1" } });
  assert.equal(facts.filter(f => f.kind === "resource").length, 1);
  assert.equal(facts.filter(f => f.kind === "refused").length, 1);
  assert.match(renderCombatFacts(facts, "zh-CN"), /3环法术位/);
  assert.doesNotMatch(renderCombatFacts(facts, "zh-CN"), /Counterspelled|1\/2/);
  assert.equal(collectCombatFacts(conversation([{ tool: "search_lore", result: { damage: 99, name: "Goblin" } }])).length, 0);
});
await test("fallback uses engine facts or live state and preserves roll markers exactly once", () => {
  const fallback = combatFallback(miss, "zh-CN");
  const final = combatNarrationContent(`[roll:abc]\n\n${fallback}`, miss, "zh-CN");
  assert.equal((final.match(/未命中/g) ?? []).length, 1);
  assert.equal((final.match(/\[roll:abc\]/g) ?? []).length, 1);
  assert.match(combatFallback([], "zh-CN", { live: { enemies: [{ id: "e1", name: "Goblin 1", hp: 0, maxHp: 40, status: "alive" }] } }), /倒地/);
  assert.match(combatNarrationPrompt(miss, "zh-CN"), /\[0:result:attack\]/);
});
await test("an opportunity attack does not inherit the original player's identity", () => {
  const messages = conversation([{ result: { attacker: "阿明", target: "Goblin 1", hit: false,
    opportunityAttacks: [{ target: "阿明", hit: true, damage: 5 }] } }]);
  const nested = collectCombatFacts(messages).find(fact => fact.source.path.includes("opportunityAttacks"));
  assert.equal(nested.actor, undefined);
  assert.equal(nested.target.name, "阿明");
});
await test("enemy casting and pet ownership do not attribute attacks to the player", () => {
  const messages = conversation([
    { tool: "cast_at_player", args: { casterEnemyId: "e1", characterId: "hero", spell: "Fireball" }, result: { ok: true, target: "阿明", damage: 10 } },
    { tool: "pet_attack", args: { characterId: "hero", targetEnemyId: "e1" }, result: { ok: true, name: "Goblin 1", hit: true } },
  ]);
  const facts = collectCombatFacts(messages, { names: { e1: "Goblin 1", hero: "阿明" } });
  const spell = facts.find(fact => fact.kind === "spell");
  assert.equal(spell.actor.id, "e1");
  assert.equal(facts.find(fact => fact.source.tool === "pet_attack").actor, undefined);
  assert.match(renderCombatFacts(facts, "zh-CN"), /哥布林 1的火球术施法已登记/);
});
await test("one rewrite; all detected contradictions must be gone; every failure drops incorrect prose", async () => {
  for (const reply of [null, "", "Understood.", "命中了！仍然有矛盾。", new Error("offline")]) {
    let calls = 0;
    const result = await resolveNarration({ narration: "命中了！这是原始错误叙事。".repeat(5), valid: text => !text.includes("命中了"), rewrite: async () => { calls++; if (reply instanceof Error) throw reply; return reply; }, fallback: () => "未命中。" });
    assert.equal(result.status, "fallback");
    assert.equal(result.narration, "未命中。");
    assert.equal(calls, 1);
  }
  const corrected = await resolveNarration({ narration: "命中了！", valid: text => text === "未命中，哥布林侧身躲开了攻击。", rewrite: async () => "未命中，哥布林侧身躲开了攻击。", fallback: () => "fallback" });
  assert.equal(corrected.status, "corrected");
});
console.log(`test-combat-narration: ${passed} passed`);
