// Opt-in acceptance: spends the user's existing Codex subscription, uses a
// disposable DB and real engine tools. Forced dice make expected outcomes fixed.
// Run: node scripts/accept-chinese-combat.mjs /absolute/output.json
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { openWorld } from "./lib/enforce-world.mjs";
import { combatKit, TRAINED } from "./lib/enforce-combat.mjs";

const output = path.resolve(process.argv[2] ?? "docs/validation/chinese-combat-runtime.json");
const world = await openWorld({ gameSettings: { locale: "zh-CN", ttsEnabled: false, worldSimulation: false, narrationGuard: true, stages: { compaction: false } } });
const dir = path.dirname(process.env.SQLITE_DB_PATH);
let MODEL = process.env.HARNESS_MODEL ?? "";
delete process.env.HARNESS_FAKE;
const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
const { updateStorySettings, allocateSeq } = await import("../src/lib/db/campaigns.ts");
const { insertCampaignMessage, listRecentMessages } = await import("../src/lib/db/messages.ts");
const { getDmTurn } = await import("../src/lib/db/dm-turns.ts");
const { startDmTurn } = await import("../src/lib/dm/turn.ts");
const { enforceEngineBoundary } = await import("../src/lib/dm/narration-guard.ts");
const { checkNarration, collectExchanges } = await import("../src/lib/dm/engine-boundary.ts");
const { collectCombatFacts, renderCombatFacts } = await import("../src/lib/dm/combat-narration.ts");
const { handleMcpRequest } = await import("../src/lib/agents/mcp-server.ts");
const { probeHarness } = await import("../src/lib/harness/status.ts");
const { activeBridgeSessions } = await import("../src/lib/harness/bridge.ts");
const server = http.createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const response = await handleMcpRequest(new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method, headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
    }));
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) { res.writeHead(500); res.end(String(error)); }
});
await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
process.env.HARNESS_MCP_URL = `http://127.0.0.1:${server.address().port}/api/mcp`;
setTimeout(() => { console.error("Acceptance exceeded 15 minutes"); process.exit(1); }, 900000).unref();
// Resolve Codex's actual default without printing account/config contents.
const { startJsonRpc } = await import("../src/lib/harness/jsonrpc-stdio.ts");
const { codexArgs, userCodexMcpServers } = await import("../src/lib/harness/adapters/codex.ts");
const { buildChildEnv } = await import("../src/lib/harness/child-env.ts");
const { childPath } = await import("../src/lib/harness/discover.ts");
const configText = fs.readFileSync(path.join(os.homedir(), ".codex", "config.toml"), "utf8");
const peer = startJsonRpc("codex", codexArgs({mcpUrl:null, images:false, disableServers:userCodexMcpServers(configText)}),
 {cwd:dir,env:buildChildEnv(process.env,"codex",await childPath("codex"),{HOME:os.homedir()})},
 {onNotification(){},onRequest(){return {decision:"decline"};},onExit(){}});
try {
 await peer.request("initialize",{clientInfo:{name:"odm_chinese_acceptance",version:"1"},capabilities:{experimentalApi:true}});
 peer.notify("initialized",{});
 const resolved=await peer.request("thread/start",{cwd:dir,approvalPolicy:"never",sandbox:"read-only",ephemeral:true,baseInstructions:"Only report Chinese game narrative when prompted. Do not use any tools."});
 MODEL ||= resolved.model;
 assert.ok(MODEL,"Codex did not report its resolved default model");
 console.log(`Resolved default model: ${MODEL}`);
} finally {peer.kill();}

saveGlobalConfig({ harness: { id: "codex", model: MODEL, utilityModel: MODEL }, text: { provider: "harness" }, speech: { ttsProvider: "off" } });
const status = await probeHarness("codex", { refresh: true });
assert.ok(status.installed, status.message);
updateStorySettings(world.campaignId, { textProvider: "harness", imageGenerationEnabled: false, autoImages: false });
const kit = await combatKit(world);
const hero = world.addHero({ name: "阿明", class: "fighter", level: 1, abilities: { str: 16 }, proficiencies: TRAINED, equipment: [{ name: "Longsword", qty: 1 }] });
const report = { model: MODEL, cliVersion: status.version, locale: "zh-CN", backend: "codex subscription", forcedDice: true, cases: [], correction: null, tts: "not configured; only final text contract tested elsewhere" };
const cases = [
  { id: "miss", count: 1, hp: 40, faces: [1], hit: false },
  { id: "hit-survives", count: 1, hp: 40, faces: [15, 4], hit: true },
  { id: "death", count: 1, hp: 3, faces: [15, 4], hit: true, dead: true },
  { id: "nonlethal", count: 1, hp: 3, faces: [15, 4], hit: true, downed: true },
  { id: "second-identical-enemy", count: 2, hp: 40, faces: [15, 4], hit: true },
  { id: "spell-slot", count: 1, hp: 40, faces: [2, 2, 2], spell: true },
];
try {
 for (const scenario of cases.filter(row => !process.env.ACCEPT_CASES || process.env.ACCEPT_CASES.split(",").includes(row.id))) {
  await kit.endFight();
  const actor = scenario.spell ? world.addHero({ name: "米拉", class: "wizard", level: 3, abilities: { int: 16 }, proficiencies: TRAINED,
    spellcasting: { ability: "int", slots: { 1: { max: 4, used: 0 } }, prepared: ["Magic Missile"], known: ["Magic Missile"], cantrips: [] } }) : hero;
  if (scenario.count > 1) world.addHero({ name: "阿岚", class: "fighter", level: 1 });
  await kit.fight(scenario.count, { heroFaces: { [hero.id]: scenario.spell ? 1 : 19, [actor.id]: 19 } });
  const enemies = world.enemies();
  const enemy = enemies.at(-1);
  for (let i=0; i<enemies.length; i++) { kit.place(enemies[i].id, 5+i, 6); }
  kit.place(hero.id, 5, 5);
  if (actor.id !== hero.id) kit.place(actor.id, 4, 5);
  kit.setEnemy(enemy.id, { currentHp: scenario.hp });
  world.clearDice(); world.dice(...scenario.faces);
  insertCampaignMessage({ campaignId: world.campaignId, seq: allocateSeq(world.campaignId), authorType: "player", userId: actor.userId, characterId: actor.id,
    content: scenario.spell ? `我向 ${enemy.displayName} 施放一次一环魔法飞弹（Magic Missile）。请调用 cast_at_enemy，让引擎扣除法术位并判定伤害。只施放一次，随后用中文描写，不要结束我的回合。` : `我用长剑攻击 ${enemy.displayName} 一次${scenario.downed ? "，选择非致命攻击（nonlethal=true），击倒而不杀死" : ""}。请调用 pc_attack，由引擎判定，随后用中文描写动作。只攻击一次，不替我选择其他行动，也不要结束我的回合。` });
  const started = Date.now();
  await startDmTurn(world.campaignId);
  const message = listRecentMessages(world.campaignId, 5).filter(row => row.authorType === "dm").at(-1);
  assert.ok(message?.dmTurnId, `${scenario.id}: no DM message`);
  const turn = getDmTurn(message.dmTurnId);
  assert.equal(turn.status, "done");
  const exchanges = collectExchanges(turn.conversation);
  const attacks = exchanges.filter(entry => entry.name === "pc_attack" && typeof entry.result?.hit === "boolean");
  if (scenario.spell) {
    const cast = exchanges.filter(entry => entry.name === "cast_at_enemy" && entry.result?.ok === true);
    assert.equal(cast.length, 1, "must resolve one casting");
    assert.equal(JSON.parse(cast[0].arguments).targetEnemyId, enemy.id);
    assert.equal(world.sheet(actor.id).spellcasting.slots[1].used, 1);
  } else {
    assert.equal(attacks.length, 1, `${scenario.id}: must resolve exactly one attack`);
    assert.equal(attacks[0].result.hit, scenario.hit);
    assert.equal(JSON.parse(attacks[0].arguments).targetEnemyId, enemy.id);
  }
  if (scenario.dead) assert.equal(attacks[0].result.dead, true);
  if (scenario.downed) { assert.equal(attacks[0].result.knockedOut, true); assert.notEqual(attacks[0].result.dead, true); }
  const facts = collectCombatFacts(turn.conversation, { names: { [actor.id]: actor.name } });
  const conclusions = renderCombatFacts(facts, "zh-CN");
  assert.ok(message.content.includes(conclusions));
  if (scenario.spell) assert.match(conclusions, /1环法术位/);
  assert.match(message.content, /战斗结果/);
  assert.deepEqual(checkNarration({ conversation: turn.conversation, narration: turn.narrationParts.join("\n\n"), locale: "zh-CN", partyNames: [hero.name] }), []);
  assert.equal(activeBridgeSessions(), 0);
  report.cases.push({ id: scenario.id, seconds: +((Date.now()-started)/1000).toFixed(2), calls: turn.callIndex, facts, narration: turn.narrationParts.join("\n\n"), finalText: message.content, rolls: world.diceLog(), passed: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2)+"\n");
  console.log(`${scenario.id}: PASS (${report.cases.at(-1).seconds}s)\n${message.content}`);
  if (scenario.id === "miss") {
    const replay = structuredClone(turn);
    replay.narrationParts = ["阿明的长剑刺入哥布林的胸膛，鲜血沿着剑刃滴落。哥布林发出一声痛苦的哀嚎，踉跄着向后退去，仍然挡在狭窄的通道中央。"];
    const beforeHp = kit.enemy(enemy.id).currentHp;
    world.diceLog();
    const beforeCall = replay.callIndex;
    await enforceEngineBoundary(world.campaign(), replay, [world.sheet(hero.id)]);
    const text = replay.narrationParts.join("\n\n");
    assert.equal(replay.callIndex, beforeCall+1);
    assert.equal(kit.enemy(enemy.id).currentHp, beforeHp);
    assert.equal(world.diceLog().length, 0, "correction rolled dice");
    assert.deepEqual(checkNarration({ conversation: replay.conversation, narration: text, locale: "zh-CN" }), []);
    assert.doesNotMatch(text, /刺入哥布林的胸膛/);
    report.correction = { injectedWrongNarration: true, realCodexRewrite: true, finalText: text, additionalCalls: 1, additionalRolls: 0, hpUnchanged: true };
  }
 }
 fs.writeFileSync(output, JSON.stringify(report, null, 2)+"\n");
 console.log("CHINESE COMBAT ACCEPTANCE PASS");
} finally { server.close(); world.close(); }
