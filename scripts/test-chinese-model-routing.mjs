import "../src/lib/i18n/messages.ts";
// Actual model wrappers with controlled upstream replies, including the
// utility fallback and the harness adapter. This does not attest to a real
// deployment model's Chinese quality.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { register } from "node:module";
import { removeTempDir } from "./lib/remove-temp-dir.mjs";

const dir = mkdtempSync(path.join(os.tmpdir(), "odm-locale-routing-"));
process.env.SQLITE_DB_PATH = path.join(dir, "test.sqlite");
process.env.DB_ENCRYPTION_KEY = randomBytes(32).toString("hex");
process.env.HARNESS_FAKE = "1";
process.env.HARNESS_FAKE_SCRIPT = path.join(dir, "script.json");
writeFileSync(process.env.HARNESS_FAKE_SCRIPT, JSON.stringify([[{ text: "你来到城门。" }]]));
register("./lib/register-alias.mjs", import.meta.url);
const { requestDmMessage, requestUtilityMessage } = await import("../src/lib/dm/model.ts");
const { normalizeSettings } = await import("../src/lib/db/settings.ts");
const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
saveGlobalConfig({ harness: { id: "claude", model: "fake-model" }, text: { provider: "custom" } });

const base = {
  ...normalizeSettings(),
  textProvider: "custom", customBaseUrl: "http://127.0.0.1:8080/v1", customModel: "test-story", customApiKey: "",
  utilityProvider: "custom", utilityBaseUrl: "http://127.0.0.1:8080/v1", utilityModel: "test-utility", utilityApiKey: "",
};
const messages = [{ role: "system", content: "Return JSON with title and quote. Quotes must be verbatim." }, { role: "user", content: 'Source: "The gate is locked." 请回答。' }];
const original = structuredClone(messages);
const upstreamFetch = globalThis.fetch;
const calls = [];
const readerCalls = [];
let failUtility = false;
let replyContent = '{"title":"城门","quote":"The gate is locked."}';
let replyTools;
globalThis.fetch = async (url, options) => {
  const body = JSON.parse(options?.body ?? "{}");
  if (!body.messages) return Response.json({ models: [], capabilities: ["completion", "tools"] });
  if (body.messages[0]?.content?.startsWith("You read one passage of a tabletop RPG")) {
    readerCalls.push(body);
    return Response.json({ choices: [{ message: { content: '{"claims":[]}' }, finish_reason: "stop" }] });
  }
  calls.push({ url: String(url), body });
  if (failUtility && body.model === "test-utility") return new Response("Model unavailable", { status: 503 });
  const message = { content: replyContent, ...(replyTools ? { tool_calls: replyTools } : {}) };
  return Response.json(String(url).includes("/api/chat") ? { message } : { choices: [{ message, finish_reason: "stop" }] });
};
let passed = 0;
async function test(name, run) { calls.length = 0; await run(); passed++; console.log(`ok: ${name}`); }
function checkLocale(body, locale) {
  const system = body.messages.find(message => message.role === "system").content;
  assert.equal((system.match(/\[ODM output locale:/g) ?? []).length, 1);
  assert.ok(system.includes(`[ODM output locale: ${locale}]`));
  assert.equal(body.messages[1].content, original[1].content);
  assert.equal(body.locale, undefined, "application locale is not an unsupported upstream parameter");
}
try {
  await test("custom story and utility calls both carry Chinese output policy", async () => {
    assert.equal((await requestDmMessage(base, messages, { locale: "zh-CN" })).error, undefined);
    assert.equal((await requestUtilityMessage(base, messages, { locale: "zh-CN" })).error, undefined);
    assert.deepEqual(calls.map(call => call.body.model), ["test-story", "test-utility"]);
    calls.forEach(call => checkLocale(call.body, "zh-CN"));
    assert.deepEqual(messages, original);
  });
  await test("utility fallback retains a single Chinese policy on the story model", async () => {
    failUtility = true;
    assert.equal((await requestUtilityMessage(base, messages, { locale: "zh-CN" })).error, undefined);
    assert.deepEqual(calls.map(call => call.body.model), ["test-utility", "test-story"]);
    calls.forEach(call => checkLocale(call.body, "zh-CN"));
    failUtility = false;
  });
  await test("local story and local utility retain output locale and selected model", async () => {
    await requestDmMessage({ ...base, textProvider: "local", localTextModel: "qwen-test" }, messages, { locale: "zh-CN" });
    await requestUtilityMessage({ ...base, utilityProvider: "local" }, messages, { locale: "zh-CN" });
    assert.deepEqual(calls.map(call => call.body.model), ["qwen-test", "test-utility"]);
    calls.forEach(call => checkLocale(call.body, "zh-CN"));
  });
  await test("English selection sends an English policy without changing source text", async () => {
    await requestDmMessage(base, messages, { locale: "en" });
    checkLocale(calls[0].body, "en");
  });
  await test("harness story and utility receive the same locale rule", async () => {
    const harness = { ...base, textProvider: "harness", utilityProvider: "harness", utilityModel: "" };
    globalThis.__odmFakeHarnessLog = [];
    assert.equal((await requestDmMessage(harness, messages, { locale: "zh-CN", toolChoice: "none" })).error, undefined);
    assert.equal((await requestUtilityMessage(harness, messages, { locale: "zh-CN" })).error, undefined);
    const starts = globalThis.__odmFakeHarnessLog.filter(entry => entry.kind === "start");
    assert.equal(starts.length, 2);
    starts.forEach(entry => assert.match(entry.detail.system, /ODM output locale: zh-CN/));
  });
  await test("Chinese guard rewrites once with no tools and cannot replay a returned attack", async () => {
    const { createUser } = await import("../src/lib/db/users.ts");
    const { createCampaign, getCampaignById, updateStorySettings } = await import("../src/lib/db/campaigns.ts");
    const { createDmTurn } = await import("../src/lib/db/dm-turns.ts");
    const { enforceEngineBoundary } = await import("../src/lib/dm/narration-guard.ts");
    const user = createUser("guard-admin", "x", { isAdmin: true });
    const created = createCampaign(user.id, { title: "守卫测试", description: "", theme: "", startingLevel: 1, maxPlayers: 4, difficulty: "normal", gameSettings: { locale: "zh-CN" } });
    updateStorySettings(created.id, base);
    const campaign = getCampaignById(created.id);
    const turn = createDmTurn(campaign.id, [
      ...messages,
      { role: "assistant", content: "", tool_calls: [{ id: "swing", function: { name: "pc_attack", arguments: '{"weapon":"Longsword"}' } }] },
      { role: "tool", tool_call_id: "swing", content: '{"target":"Goblin 1","hit":false,"rolled":9}' },
    ]);
    const narrative = "阿明击中了哥布林。风掠过狭窄的街道，远处传来脚步声。";
    turn.narrationParts = [narrative];
    replyContent = "阿明的攻击没有命中哥布林。风掠过狭窄的街道，远处传来脚步声。";
    replyTools = [{ id: "must-not-replay", function: { name: "pc_attack", arguments: '{"weapon":"Longsword"}' } }];
    const before = structuredClone({ rollIds: turn.rollIds, mutationCount: turn.mutationCount, conversation: turn.conversation });
    await enforceEngineBoundary(campaign, turn, []);
    assert.equal(calls.length, 1);
    assert.equal(readerCalls.length, 2, "initial and rewritten narration are checked by the utility reader");
    readerCalls.forEach(body => assert.equal(body.model, "test-utility"));
    assert.ok(calls[0].body.tool_choice === undefined || calls[0].body.tool_choice === "none");
    assert.ok(!calls[0].body.tools?.length);
    assert.match(calls[0].body.messages.at(-1).content, /不要重复执行动作/);
    assert.equal(turn.narrationParts.join("\n\n"), replyContent);
    assert.equal(turn.callIndex, 1);
    assert.deepEqual({ rollIds: turn.rollIds, mutationCount: turn.mutationCount, conversation: turn.conversation }, before);
    replyTools = undefined;
    const { readAgentNarration } = await import("../src/lib/dm/agent-turn.ts");
    assert.match((await readAgentNarration(campaign, "战斗开始！")).problem, /start_encounter/);
  });
  console.log(`test-chinese-model-routing: ${passed} passed`);
} finally {
  globalThis.fetch = upstreamFetch;
  delete globalThis.__odmFakeHarnessLog;
  removeTempDir(dir);
}
