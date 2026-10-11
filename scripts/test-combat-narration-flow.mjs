// Real engine/DB/turn loop; scripted model and speech transport. This proves
// persistence, streaming and TTS inputs, not a real voice's pronunciation.
import assert from "node:assert/strict";
import { openWorld } from "./lib/enforce-world.mjs";
import { combatKit, TRAINED } from "./lib/enforce-combat.mjs";
import { fakeModel, reply, call } from "./lib/enforce-narrator.mjs";

const world = await openWorld({ gameSettings: { locale: "zh-CN", ttsEnabled: true, worldSimulation: false, narrationGuard: true } });
const kit = await combatKit(world);
const model = await fakeModel();
model.pointAt(world);
const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
saveGlobalConfig({ speech: { ttsProvider: "kokoro", kokoroUrl: "http://127.0.0.1:8880" } });
const { getDmTurn } = await import("../src/lib/db/dm-turns.ts");
const { updateGameSettings } = await import("../src/lib/db/campaigns.ts");
const { subscribe } = await import("../src/lib/events.ts");
const hero = world.addHero({ name: "阿明", class: "fighter", level: 1, abilities: { str: 16 }, proficiencies: TRAINED, equipment: [{ name: "Longsword", qty: 1 }] });
const originalFetch = globalThis.fetch;
const spoken = [];
let outage = false;
globalThis.fetch = async (url, init) => {
  if (String(url).includes("/audio/speech")) {
    spoken.push(JSON.parse(init.body).input);
    return new Response(new Uint8Array([73, 68, 51, 0]), { headers: { "content-type": "audio/mpeg" } });
  }
  if (outage && String(url).includes("/chat/completions") && !JSON.parse(init.body).stream) return Response.json({ error: "controlled rewrite outage" }, { status: 503 });
  return originalFetch(url, init);
};
let passed = 0;
try {
  for (const mode of ["corrected", "still-wrong", "empty", "outage"]) {
    // Distinct speeds avoid a cached identical fallback bypassing the speech
    // transport this test intentionally observes.
    updateGameSettings(world.campaignId, { ttsSpeed: 1 + passed / 10 });
    await kit.endFight();
    await kit.fight(1, { heroFaces: { [hero.id]: 19 } });
    const enemy = world.enemies()[0];
    kit.place(hero.id, 5, 5); kit.place(enemy.id, 5, 6);
    world.clearDice(); world.dice(1); world.diceLog(); spoken.length = 0;
    const wrong = "阿明的长剑刺入哥布林的胸膛，鲜血沿着剑刃滴落。";
    const corrected = "阿明的攻击未命中哥布林。剑尖掠过它的身旁，靴底擦过石板，金属的寒光在狭窄通道中一闪而过。";
    const chunks = [];
    const unsubscribe = subscribe(world.campaignId, chunk => chunks.push(chunk), world.owner.id);
    outage = mode === "outage";
    model.script([
      reply({ calls: [call("pc_attack", { characterId: hero.id, targetEnemyId: enemy.id, weapon: "Longsword" })] }),
      reply({ text: wrong }), reply({ text: mode === "corrected" ? corrected : mode === "empty" ? "" : wrong }),
    ]);
    const message = await model.turn(world, "我用长剑攻击哥布林一次。", hero.id);
    await Promise.all(Object.values(globalThis.__odmMediaQueues ?? {}));
    unsubscribe(); outage = false;
    assert.ok(message);
    assert.match(message.content, /战斗结果[\s\S]*未命中/);
    assert.doesNotMatch(message.content, /刺入哥布林的胸膛|鲜血沿着剑刃/);
    assert.equal(kit.enemy(enemy.id).currentHp, kit.enemy(enemy.id).maxHp);
    assert.equal(world.diceLog().filter(row => row.forced).length, 1, "the correction replayed a die roll");
    const turn = getDmTurn(message.dmTurnId);
    assert.equal(turn.callIndex, 3);
    assert.equal(turn.rollIds.length, 1);
    assert.ok(chunks.every(chunk => !chunk.includes("event: dm_delta")), "unvalidated combat prose streamed to the table");
    if (mode === "corrected") assert.ok(message.content.endsWith(corrected));
    else assert.equal((message.content.match(/未命中/g) ?? []).length, 1, "fallback duplicated conclusions");
    for (let i=0; i<100 && !spoken.length; i++) await new Promise(resolve => setTimeout(resolve, 20));
    assert.ok(spoken.length, "final narration did not reach TTS");
    assert.ok(spoken.every(text => !text.includes("刺入哥布林的胸膛") && !text.includes("鲜血沿着剑刃")));
    assert.ok(spoken.join(" ").includes("未命中"));
    const correctionRequest = model.requests.filter(request => !request.stream).at(-1);
    if (correctionRequest) { assert.ok(correctionRequest.tool_choice === undefined || correctionRequest.tool_choice === "none"); assert.ok(!correctionRequest.tools?.length); }
    passed++; console.log(`ok: ${mode}: engine state, final message, stream and speech input`);
  }
  console.log(`test-combat-narration-flow: ${passed} passed`);
} finally { globalThis.fetch = originalFetch; model.close(); world.close(); }
