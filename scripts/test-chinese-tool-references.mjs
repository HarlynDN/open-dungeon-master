import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import "./lib/enforce-campaign.mjs";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-chinese-tool-references");
const { resolveReference, referenceDisplayName } = await import("../src/lib/i18n/references.ts");
const { canonicalizeToolReferences } = await import("../src/lib/dm/tool-references.ts");
const { dispatchAdjudication } = await import("../src/lib/dm/invoke-dispatch.ts");
const { createDmTurn } = await import("../src/lib/db/dm-turns.ts");
const { createHomebrew } = await import("../src/lib/db/homebrew.ts");
const { insertShop } = await import("../src/lib/db/shops.ts");
const { setParty, getParty } = await import("../src/lib/db/party.ts");
const { createUser } = await import("../src/lib/db/users.ts");
const world = await openWorld({ gameSettings: { locale: "zh-CN", inventoryApprovals: false } });
const hero = world.addHero({
  name: "阿明", class: "wizard", level: 5, gold: 100, abilities: { int: 16 },
  equipment: [{ name: "Longsword", qty: 1 }, { name: "Potion of Healing", qty: 2 }, { name: "Rope", qty: 2 }],
  spellcasting: { ability: "int", slots: { 1: { max: 4, used: 0 }, 3: { max: 2, used: 0 } }, prepared: ["Magic Missile", "Fireball"], known: [], cantrips: ["Fire Bolt"], spellbook: ["Magic Missile", "Fireball"] },
});
function context() {
  const sheets = world.sheets();
  return { campaign: world.campaign(), sheets, sheetsById: new Map(sheets.map(sheet => [sheet.id, sheet])) };
}
const refs = (name, args) => canonicalizeToolReferences(name, JSON.stringify(args), context());
const normalized = (name, args) => {
  const out = refs(name, args);
  assert.ok("args" in out, JSON.stringify(out));
  return JSON.parse(out.args);
};

await test("canonical IDs and names precede localized aliases; ambiguous aliases never guess", () => {
  const entries = [{ id: "first", name: "Fireball" }, { id: "second", name: "Ice Spell", aliases: ["火球术"] }];
  assert.equal(resolveReference("spell", "first", entries, "zh-CN").entry.name, "Fireball");
  assert.equal(resolveReference("spell", "Fireball", entries, "zh-CN").entry.id, "first");
  assert.equal(resolveReference("spell", "火球术", [{ id: "a", name: "Fireball" }, { id: "b", name: "fireball" }], "zh-CN").kind, "ambiguous");
  assert.equal(resolveReference("spell", "火球术", [...entries, { id: "third", name: "火球术" }], "zh-CN").entry.id, "third");
  assert.equal(referenceDisplayName("equipment", "Longsword +1", "zh-CN"), "长剑 +1");
  assert.equal(resolveReference("equipment", "长剑+1", [{ id: "owned", name: "Longsword +1" }], "zh-CN").entry.id, "owned");
});
await test("spell fields normalize without changing narrative text, enums or the original arguments", () => {
  const args = { characterId: hero.id, spell: "火球术", reason: "火球术照亮了森林。", saveAbility: "dex", damage: "8d6" };
  const original = structuredClone(args);
  assert.deepEqual(normalized("cast_at_enemy", args), { ...args, spell: "Fireball" });
  assert.deepEqual(args, original);
  assert.equal(normalized("use_spell_slot", { name: "魔法飞弹" }).name, "Magic Missile");
  assert.equal(normalized("pc_attack", { spell: "火焰箭" }).spell, "Fire Bolt");
  assert.equal(normalized("learn_spell", { spell: "fireball" }).spell, "fireball");
  assert.equal(normalized("set_npc", { name: "火球术", reason: "故事" }).name, "火球术");
});
await test("a real cast through dispatch spends the actual spell slot once", async () => {
  const out = await dispatchAdjudication("use_spell_slot", JSON.stringify({ characterId: hero.id, spell: "魔法飞弹", level: 1 }), { ...context(), turn: createDmTurn(world.campaignId, [], "human_dm"), realDiceUserIds: new Set() });
  assert.equal(out.ok, true, JSON.stringify(out));
  assert.equal(world.sheet(hero.id).spellcasting.slots[1].used, 1);
});
await test("localized weapons do not grant ownership or choose a different bonus item", async () => {
  assert.equal(normalized("pc_attack", { characterId: hero.id, weapon: "长剑" }).weapon, "Longsword");
  assert.equal(normalized("pc_attack", { characterId: hero.id, weapon: "长弓" }).weapon, "Longbow");
  const { buildAttackProfile } = await import("../src/lib/dm/pc-attack-profile.ts");
  const out = buildAttackProfile(world.campaignId, world.sheet(hero.id), normalized("pc_attack", { characterId: hero.id, weapon: "长弓" }));
  assert.match(out.error, /not carrying|does not carry|carries no/);
  assert.equal(normalized("pc_attack", { characterId: hero.id, weapon: "徒手攻击" }).weapon, "Unarmed strike");
  assert.equal(refs("pc_attack", { characterId: hero.id, weapon: "长剑+1" }).result.retry, true);
});
await test("consumables resolve only within the character's pack and retain real effects", async () => {
  const before = world.sheet(hero.id).equipment;
  const missing = refs("use_item", { characterId: hero.id, item: "火球魔杖" });
  assert.equal(missing.result.retry, true);
  assert.deepEqual(world.sheet(hero.id).equipment, before);
  const used = await world.invoke("use_item", { characterId: hero.id, item: "治疗药水" });
  assert.equal(used.ok, true, JSON.stringify(used));
  assert.equal(world.sheet(hero.id).equipment.find(item => item.name === "Potion of Healing").qty, 1);
});
await test("party transfer and buying resolve within the source pack or shop", async () => {
  setParty(world.campaignId, { ...getParty(world.campaignId), inventory: [{ name: "Torch", qty: 2 }] });
  assert.equal(normalized("party_stash", { characterId: hero.id, do: "take", name: "火把" }).name, "Torch");
  const taken = await world.invoke("party_stash", { characterId: hero.id, do: "take", name: "火把", qty: 1 });
  assert.equal(taken.ok, true, JSON.stringify(taken));
  assert.equal(getParty(world.campaignId).inventory[0].qty, 1);
  const shop = insertShop(world.campaignId, { name: "杂货店", kind: "general", size: "village", stock: [{ itemName: "Rope", qty: 3, priceCp: 100 }] });
  const bought = await world.invoke("buy_item", { characterId: hero.id, shop: shop.id, item: "绳索", qty: 1 });
  assert.equal(bought.ok, true, JSON.stringify(bought));
  assert.equal(world.sheet(hero.id).equipment.find(item => item.name === "Rope").qty, 3);
});
await test("monster references normalize nested/flat requests while in-world names remain Chinese", async () => {
  const args = normalized("start_encounter", { enemies: [{ monster: "哥布林", name: "洞穴守卫", count: 1 }] });
  assert.equal(args.enemies[0].monster, "goblin");
  assert.equal(args.enemies[0].name, "洞穴守卫");
  assert.equal(normalized("add_enemies", { monster: "地精", name: "阿绿" }).monster, "goblin");
  assert.equal(normalized("request_roll", { againstMonster: "哥布林" }).againstMonster, "goblin");
  const encounter = await world.beginFight([{ monster: "哥布林", name: "洞穴守卫" }]);
  assert.ok(encounter.id);
  assert.equal(world.enemies()[0].displayName, "洞穴守卫");
});
await test("homebrew IDs/names stay scoped to the table; unpublished Chinese names stay canonical", () => {
  const outsider = createUser("alias-outsider", "x");
  const privateSpell = createHomebrew(outsider.id, { kind: "spell", name: "秘密魔法", data: { level: 1 } });
  const allowedSpell = createHomebrew(world.owner.id, { kind: "spell", name: "自创魔法", data: { level: 1 } });
  assert.equal(normalized("use_spell_slot", { spell: `homebrew:${allowedSpell.id}` }).spell, "自创魔法");
  assert.equal(normalized("use_spell_slot", { spell: "自创魔法" }).spell, "自创魔法");
  assert.equal(normalized("use_spell_slot", { spell: `homebrew:${privateSpell.id}` }).spell, `homebrew:${privateSpell.id}`);
});
await test("malformed calls preserve the engine's rejection and English campaigns retain original behavior", () => {
  for (const text of ["{", "null", "[]", "12"]) assert.equal(canonicalizeToolReferences("use_item", text, context()).args, text);
  const english = { ...context(), campaign: { ...world.campaign(), gameSettings: { ...world.campaign().gameSettings, locale: "en" } } };
  assert.equal(JSON.parse(canonicalizeToolReferences("cast_buff", '{"spell":"火球术"}', english).args).spell, "火球术");
  assert.equal(JSON.parse(canonicalizeToolReferences("cast_buff", '{"spell":"Magic Missile"}', english).args).spell, "Magic Missile");
  for (const spell of ["Acid Arrow", "Faithful Hound", "Melf's Acid Arrow"]) {
    const sent = JSON.stringify({ spell });
    assert.equal(canonicalizeToolReferences("cast_buff", sent, english).args, sent);
  }
});

await test("the built-in DM loop executes Chinese references and retains the original wire call", async () => {
  const kit = await openWorld({ gameSettings: { locale: "zh-CN", stages: { compaction: false, chapterSummary: false }, ttsEnabled: false } });
  const mage = kit.addHero({ class: "wizard", level: 3, spellcasting: { ability: "int", slots: { 1: { max: 4, used: 0 } }, prepared: ["Magic Missile"], known: [], cantrips: [], spellbook: ["Magic Missile"] } });
  const { normalizeSettings } = await import("../src/lib/db/settings.ts");
  const { updateStorySettings } = await import("../src/lib/db/campaigns.ts");
  const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
  const { reenterDmTurn } = await import("../src/lib/dm/turn.ts");
  const { getDmTurn } = await import("../src/lib/db/dm-turns.ts");
  updateStorySettings(kit.campaignId, { ...normalizeSettings(), textProvider: "custom", customBaseUrl: "http://127.0.0.1:8080/v1", customModel: "test-only", customApiKey: "", imageGenerationEnabled: false });
  saveGlobalConfig({ text: { provider: "custom", customBaseUrl: "http://127.0.0.1:8080/v1", customModel: "test-only", customApiKey: "" } });
  const sent = JSON.stringify({ characterId: mage.id, spell: "魔法飞弹", level: 1 });
  const turn = createDmTurn(kit.campaignId, [{ role: "system", content: "Answer the player's request." }, { role: "user", content: "施放魔法飞弹。" }]);
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    const delta = calls === 1 ? { content: "", tool_calls: [{ index: 0, id: "cast-zh", type: "function", function: { name: "use_spell_slot", arguments: sent } }] } : { content: "阿明施放了魔法飞弹，三道光芒划过寂静的夜空。" };
    return new Response(`data: ${JSON.stringify({ choices: [{ delta, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`, { headers: { "content-type": "text/event-stream" } });
  };
  try {
    await reenterDmTurn(kit.campaign(), turn);
    const stored = getDmTurn(turn.id);
    assert.equal(stored.status, "done");
    const wire = stored.conversation.flatMap(message => message.tool_calls ?? []).find(call => call.id === "cast-zh");
    assert.equal(wire.function.arguments, sent);
    const result = stored.conversation.find(message => message.role === "tool" && message.tool_call_id === "cast-zh");
    assert.equal(JSON.parse(result.content).ok, true, result.content);
    assert.equal(kit.sheet(mage.id).spellcasting.slots[1].used, 1);
    assert.equal(calls, 2);
  } finally { globalThis.fetch = originalFetch; }
});

finish();
