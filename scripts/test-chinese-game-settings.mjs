import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-chinese-game-settings");
const world = await openWorld({ status: "lobby", gameSettings: { dmMode: "human", locale: "zh-CN", customGenreText: "玩家自己的设定" } });
const { gameSettingsSummary } = await import("../src/lib/i18n/game-settings-presentations.ts");
const { voiceDisplayLabel, narrationNote, imagesNote } = await import("../src/lib/i18n/media-presentations.ts");
const { TTS_VOICES } = await import("../src/lib/tts-voices.ts");
const { requestErrorText } = await import("../src/lib/i18n/api-errors.ts");
const { joinByInviteCode, listCampaignsForUser, setAssistantDm, setMemberReady, setDmMode } = await import("../src/lib/db/campaigns.ts");
const { seatLine, slotLine } = await import("../src/app/home/types.ts");
const route = await world.route("campaigns/[campaignId]/settings");
const context = { params: Promise.resolve({ campaignId: world.campaignId }) };
const patch = (user, data) => {
  world.signIn(user);
  return route.PATCH(new Request("http://test/", { method: "PATCH", body: JSON.stringify(data) }), context);
};

await test("read-only summaries preserve authored values and hide AI planning in human-DM mode", () => {
  const settings = structuredClone(world.campaign().gameSettings);
  const original = structuredClone(settings);
  const zh = gameSettingsSummary(settings, "Player's custom voice", "Author's world pack", "zh-CN");
  const en = gameSettingsSummary(settings, "Player's custom voice", "Author's world pack");
  assert.equal(zh.world, "Author's world pack · 真人 DM");
  assert.equal(en.world, "Author's world pack · human DM");
  assert.deepEqual(gameSettingsSummary(settings, "Player's custom voice", "Author's world pack", "en"), en);
  const narrated = gameSettingsSummary({ ...settings, ttsEnabled: true, dmMode: "steered", campaignLength: "epic", aiStorySetup: true }, "Player's custom voice", undefined, "zh-CN");
  assert.match(narrated.world, /AI 叙事，真人引导 · AI 规划故事 · 史诗战役$/);
  assert.match(narrated.narration, /Player's custom voice/);
  assert.deepEqual(settings, original);
});

await test("all approval and relationship combinations remain distinct in each UI language", () => {
  const base = world.campaign().gameSettings;
  for (const locale of ["en", "zh-CN"]) {
    const approvals = new Set();
    for (const inventoryApprovals of [true, false]) for (const vitalsApprovals of [true, false]) {
      approvals.add(gameSettingsSummary({ ...base, inventoryApprovals, vitalsApprovals }, "", undefined, locale).approvals);
    }
    assert.equal(approvals.size, 4);
    const bonds = new Set();
    for (const [relationships, romance] of [["off", "on"], ["on", "off"], ["on", "on"]]) {
      bonds.add(gameSettingsSummary({ ...base, relationships, romance }, "", undefined, locale).bonds);
    }
    assert.equal(bonds.size, 3, "romance setting must not imply enabled bonds");
  }
});

await test("translated voice names never alter IDs, server-owned custom labels or blend syntax", () => {
  const original = structuredClone(TTS_VOICES);
  for (const voice of TTS_VOICES) {
    assert.equal(voiceDisplayLabel(voice), voice.label);
    assert.match(voiceDisplayLabel(voice, "zh-CN"), /（.+）$/);
    const custom = { ...voice, label: "Server owner's custom label" };
    assert.equal(voiceDisplayLabel(custom, "zh-CN"), custom.label);
  }
  const blend = { id: "af_heart(30)+af_bella(70)", label: "混合音色（自定义）" };
  assert.equal(voiceDisplayLabel(blend, "zh-CN"), blend.label);
  assert.deepEqual(TTS_VOICES, original);
});

await test("service notes distinguish unknown, disabled, unreachable, local and external services", () => {
  assert.equal(narrationNote(undefined, "zh-CN"), null);
  assert.equal(narrationNote({ configured: true, reachable: false }, "zh-CN"), null);
  const unknownPlace = narrationNote({ configured: true, reachable: true, provider: "kokoro" }, "zh-CN");
  assert.match(unknownPlace.text, /位置尚未报告/);
  assert.doesNotMatch(unknownPlace.text, /本地网络/);
  assert.match(narrationNote({ provider: "off", reachable: false }, "zh-CN").text, /服务器已关闭/);
  const remote = { configured: true, reachable: false, provider: "openai", place: "speech.example.test" };
  const before = structuredClone(remote);
  assert.equal(narrationNote(remote, "zh-CN").warning, true);
  assert.match(narrationNote(remote, "zh-CN").text, /speech\.example\.test/);
  const reachable = narrationNote({ ...remote, reachable: true }, "zh-CN");
  assert.equal(reachable.warning, false);
  assert.doesNotMatch(reachable.text, /本地网络/);
  assert.match(narrationNote({ ...remote, reachable: true, provider: "kokoro", place: "local" }, "zh-CN").text, /Kokoro.+本地网络/);
  assert.equal(imagesNote("openai", null, "zh-CN"), null);
  const cap = { images: { openaiPlace: "images.example.test" } };
  assert.match(imagesNote("openai", cap, "zh-CN"), /images\.example\.test/);
  assert.doesNotMatch(imagesNote("comfyui", cap, "zh-CN"), /images\.example\.test/);
  assert.deepEqual(remote, before);
});

await test("real settings PATCH preserves partial groups, locale and story authority", async () => {
  const player = world.addUser("player");
  assert.ok(!("error" in joinByInviteCode(player.id, world.campaign().inviteCode)));
  const before = structuredClone(world.campaign().gameSettings);
  const denied = await patch(player, { locale: "en", hpMethod: "max" });
  assert.equal(denied.status, 403);
  assert.deepEqual(world.campaign().gameSettings, before);
  const response = await patch(world.owner, { hpMethod: "rolled", voice: { rules: { hearingRangeFeet: 60 } } });
  assert.equal(response.status, 200);
  const stored = world.campaign().gameSettings;
  assert.equal(stored.locale, "zh-CN");
  assert.equal(stored.customGenreText, before.customGenreText);
  assert.equal(stored.hpMethod, "rolled");
  assert.deepEqual(stored.voice, { ...before.voice, rules: { ...before.voice.rules, hearingRangeFeet: 60 } });
  const invalid = await patch(world.owner, { hpMethod: "每级掷骰" });
  assert.equal(invalid.status, 400, "UI prose is not a protocol value");
  assert.equal(world.campaign().gameSettings.hpMethod, "rolled");
  const error = { data: await invalid.json(), fallback: "panel.saveError" };
  assert.equal(requestErrorText("zh-CN", error), "未能保存这项修改。");
  assert.equal(requestErrorText("en", error), "Invalid game settings.");
});

await test("home counts player capacity independently of readiness and both DM seats", () => {
  const player = world.addUser("another-player");
  joinByInviteCode(player.id, world.campaign().inviteCode);
  const summary = () => listCampaignsForUser(world.owner.id).find(row => row.id === world.campaignId);
  assert.equal(summary().playerCount, 2, "the primary DM does not consume a player seat");
  setMemberReady(world.campaignId, player.id, true);
  assert.equal(summary().playerCount, 2, "ready is a separate state");
  assert.equal(seatLine({ ...summary(), playingAs: null }, world.owner.id, "zh-CN"), "大厅 · 已入座 2/6 人");
  assert.equal(slotLine({ ...summary(), playingAs: null }, player.id, "en"), "2 of 6 seats");
  assert.equal(setAssistantDm(world.campaignId, player.id), true);
  assert.equal(summary().playerCount, 1, "the co-DM also does not consume a player seat");
  setDmMode(world.campaignId, "ai", world.owner.id);
  assert.equal(summary().playerCount, 3, "handing back to AI releases both DM seats into player capacity");
  setAssistantDm(world.campaignId, player.id);
  assert.equal(summary().playerCount, 3, "stale legacy DM columns in AI mode do not remove a player");
});

world.close();
finish();
