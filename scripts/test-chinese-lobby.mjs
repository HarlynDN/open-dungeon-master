import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-chinese-lobby");
const world = await openWorld({ status: "lobby", gameSettings: { dmMode: "human", locale: "zh-CN" } });
const { lobbyBlockerReason, lobbyBlocker } = await import("../src/lib/dm/viewer.ts");
const { lobbyBlockerText, characterKindLabel } = await import("../src/lib/i18n/lobby-presentations.ts");
const { apiErrorText, requestErrorText } = await import("../src/lib/i18n/api-errors.ts");
const { setMemberReady, joinByInviteCode } = await import("../src/lib/db/campaigns.ts");
const campaignRoute = await world.route("campaigns/[campaignId]");
const context = { params: Promise.resolve({ campaignId: world.campaignId }) };
const start = async (user = world.owner) => {
  world.signIn(user);
  return campaignRoute.PATCH(new Request("http://test/", {
    method: "PATCH", body: JSON.stringify({ status: "active" }),
  }), context);
};
const seats = { dmMode: "human", humanDmUserId: world.owner.id, assistantDmUserId: null };

await test("stable gate reasons preserve empty, DM-only and player-sheet precedence", () => {
  for (const [lobby, reason] of [
    [[], "empty"],
    [[{ userId: world.owner.id, ready: true, hasSheet: false }], "no_player"],
    [[{ userId: "p", ready: false, hasSheet: false }], "no_character"],
    [[{ userId: "p", ready: false, hasSheet: true }], "not_ready"],
    [[{ userId: world.owner.id, ready: true, hasSheet: false }, { userId: "p", ready: true, hasSheet: true }], null],
  ]) {
    assert.equal(lobbyBlockerReason(seats, lobby), reason);
    assert.equal(lobbyBlockerText(reason, "en"), lobbyBlocker(seats, lobby));
    assert.equal(Boolean(lobbyBlockerText(reason, "zh-CN")), Boolean(reason));
  }
});

await test("real start route reports the same gate even when readiness changes after UI render", async () => {
  let response = await start();
  assert.equal(response.status, 400);
  let body = await response.json();
  assert.equal(body.errorCode, "lobby_no_player");
  assert.equal(apiErrorText("zh-CN", body, "lobby.startError"), "正在等待玩家加入。");

  const player = world.addUser("player");
  assert.ok(!("error" in joinByInviteCode(player.id, world.campaign().inviteCode)));
  response = await start();
  assert.equal(response.status, 400);
  body = await response.json();
  assert.equal(body.errorCode, "lobby_no_character");
  assert.equal(body.error, "Every player needs a character before the adventure starts.");

  world.addHero({ user: player, name: "林河", race: "high_elf", class: "wizard" });
  setMemberReady(world.campaignId, player.id, true);
  response = await start();
  assert.equal(response.status, 400);
  body = await response.json();
  assert.equal(body.errorCode, "lobby_not_ready", "DM readiness still matters without a sheet");
  setMemberReady(world.campaignId, world.owner.id, true);
  assert.equal((await start(player)).status, 403, "translation must not grant start authority to a player");
  response = await start();
  assert.equal(response.status, 200);
  assert.equal(world.campaign().status, "active");
  assert.equal(world.campaign().gameSettings.locale, "zh-CN");
});

await test("built-in display names do not rewrite stored IDs or unfamiliar homebrew names", () => {
  const sheet = Object.freeze({ race: "high_elf", class: "wizard" });
  assert.equal(characterKindLabel("race", sheet.race, "zh-CN"), "高等精灵");
  assert.equal(characterKindLabel("class", sheet.class, "zh-CN"), "法师");
  assert.equal(characterKindLabel("race", sheet.race, "en"), "high elf");
  assert.equal(characterKindLabel("class", sheet.class), "wizard");
  assert.equal(characterKindLabel("class", "Clock Keeper", "zh-CN"), "Clock Keeper");
  assert.equal(characterKindLabel("race", "云海旅人", "zh-CN"), "云海旅人");
  assert.deepEqual(sheet, { race: "high_elf", class: "wizard" });
});

await test("pending failures translate at render time and retain specific gate codes", () => {
  const error = Object.freeze({ data: { error: "backend detail" }, fallback: "invite.rotateError" });
  assert.equal(requestErrorText("en", error), "backend detail");
  assert.equal(requestErrorText("zh-CN", error), "未能生成新邀请码，请重试。");
  assert.equal(requestErrorText("en", error), "backend detail");
  const coded = { data: { errorCode: "lobby_not_ready", error: "legacy" }, fallback: "lobby.startError" };
  assert.equal(requestErrorText("zh-CN", coded), "正在等待所有人准备就绪。");
  assert.equal(requestErrorText("en", coded), "Waiting for everyone to ready up.");
  assert.equal(requestErrorText("zh-CN", null), "");
});

world.close();
finish();
