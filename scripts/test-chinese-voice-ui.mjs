import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-chinese-voice-ui");
const world = await openWorld({ status: "lobby", gameSettings: { dmMode: "human", locale: "zh-CN", voice: { enabled: true } } });
const { joinByInviteCode, setHumanDm, updateGameSettings } = await import("../src/lib/db/campaigns.ts");
const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
const { createTranslator, MESSAGE_CATALOGS } = await import("../src/lib/i18n/messages.ts");
const { readUiResponse, requestErrorText } = await import("../src/lib/i18n/api-errors.ts");
const { voiceRequestError, microphoneBlockError, microphoneLabel, voiceChannelLabel, voiceDockTip, parseVoiceAvailability, parseVoiceChannels, voiceWarningText, VOICE_FLOOR_KEYS, VOICE_BLOCK_KEYS, VOICE_ERROR_KEYS } = await import("../src/lib/i18n/voice-presentations.ts");
const { FLOOR_VOICE_LABELS, TRANSMIT_BLOCK_LABELS, mayTransmit } = await import("../src/lib/voice/turn-logic.ts");
const { TABLE_CHANNEL_ID, TABLE_CHANNEL_NAME, getRoom } = await import("../src/lib/voice/room.ts");
const root = path.resolve(import.meta.dirname, "..");
setHumanDm(world.campaignId, world.owner.id);
const player = world.addUser("voice-reader");
assert.ok(!("error" in joinByInviteCode(player.id, world.campaign().inviteCode)));
const context = { params: Promise.resolve({ campaignId: world.campaignId }) };
const route = await world.route("campaigns/[campaignId]/voice");
const channelsRoute = await world.route("campaigns/[campaignId]/voice/channels");
const req = (body) => new Request("http://test/", body ? { method: "POST", body: JSON.stringify(body) } : {});
const fakePeer = (user) => ({ userId: user.id, username: user.username, joinedAt: new Date().toISOString(), channelId: TABLE_CHANNEL_ID, muted: false, forceMuted: false, handRaisedAt: null, sayRange: "normal", sendTransport: null, recvTransport: null, producer: { closed: false }, consumers: new Map() });

await test("stock table translation requires both engine ID and original name", () => {
  const stock = { id: TABLE_CHANNEL_ID, name: TABLE_CHANNEL_NAME };
  assert.equal(voiceChannelLabel(stock, "en"), TABLE_CHANNEL_NAME);
  assert.equal(voiceChannelLabel(stock, "zh-CN"), "游戏桌");
  for (const custom of [{ id: "side-1", name: "The Table" }, { id: "table", name: "自写房间" }, { id: "side-1", name: "密谈室" }]) assert.equal(voiceChannelLabel(custom, "zh-CN"), custom.name);
  assert.deepEqual(stock, { id: "table", name: "The Table" });
  assert.equal(microphoneLabel("", 1, "en"), "Microphone 2");
  assert.equal(microphoneLabel("", 1, "zh-CN"), "麦克风 2");
  assert.equal(microphoneLabel("USB Studio Microphone", 1, "zh-CN"), "USB Studio Microphone");
  assert.match(voiceDockTip(true, 1, "en"), /1 person$/);
  assert.match(voiceDockTip(true, 3, "en"), /3 people$/);
  assert.match(voiceDockTip(false, 3, "zh-CN"), /3 人在通话/);
});

await test("translated floor notes preserve server authority and all canonical modes", () => {
  for (const [id, key] of Object.entries(VOICE_FLOOR_KEYS)) assert.equal(MESSAGE_CATALOGS.en[key], FLOOR_VOICE_LABELS[id]);
  for (const [id, key] of Object.entries(VOICE_BLOCK_KEYS)) assert.equal(MESSAGE_CATALOGS.en[key], TRANSMIT_BLOCK_LABELS[id]);
  assert.deepEqual(mayTransmit("hold", [], { userId: player.id, adjudicates: false }, "strict"), { mayTransmit: false, block: "dm_holds_floor" });
  assert.equal(mayTransmit("hold", [], { userId: world.owner.id, adjudicates: true }, "strict").mayTransmit, true);
  assert.match(createTranslator("zh-CN")(VOICE_BLOCK_KEYS.not_your_turn), /先攻回合/);
});

await test("microphone and server errors rerender in either language after failure", async () => {
  for (const reason of ["insecure", "unsupported"]) assert.match(requestErrorText("zh-CN", microphoneBlockError(reason)), reason === "insecure" ? /HTTPS/ : /不支持/);
  for (const [name, phrase] of [["NotAllowedError", "权限被拒绝"], ["NotFoundError", "未找到"], ["NotReadableError", "占用"]]) {
    const error = new Error("Browser's original diagnostic"); error.name = name;
    const view = voiceRequestError(error, "voice.joinError");
    assert.equal(requestErrorText("en", view), error.message);
    assert.match(requestErrorText("zh-CN", view), new RegExp(phrase));
  }
  const failure = await readUiResponse(Promise.resolve(Response.json({ error: "That is enough side rooms." }, { status: 400 })), "voice.channelsWriteError").catch((e) => voiceRequestError(e, "voice.channelsWriteError"));
  assert.equal(requestErrorText("en", failure), "That is enough side rooms.");
  assert.match(requestErrorText("zh-CN", failure), /数量上限/);
  const network = await readUiResponse(Promise.reject(new Error("offline")), "voice.probeError").catch((e) => voiceRequestError(e, "voice.probeError"));
  assert.equal(requestErrorText("en", network), MESSAGE_CATALOGS.en["prep.networkError"]);
  assert.equal(requestErrorText("zh-CN", network), MESSAGE_CATALOGS["zh-CN"]["prep.networkError"]);
  assert.equal(requestErrorText("en", voiceRequestError(new Error("Future backend diagnostic"), "voice.joinError")), "Future backend diagnostic");
  assert.match(requestErrorText("zh-CN", voiceRequestError(new Error("Future backend diagnostic"), "voice.joinError")), /无法加入/);
});

await test("malformed probes cannot masquerade as a disabled service", () => {
  const base = { available: true, unavailableReason: "", mode: "sfu", peers: [], warning: null };
  assert.deepEqual(parseVoiceAvailability(base), base);
  for (const bad of [null, {}, { ...base, available: "false" }, { ...base, mode: "future" }, { ...base, peers: [{}] }, { ...base, unavailableReason: "server" }, { ...base, available: false }]) assert.throws(() => parseVoiceAvailability(bad));
  assert.deepEqual(parseVoiceAvailability({ ...base, available: false, unavailableReason: "campaign" }).unavailableReason, "campaign");
  assert.deepEqual(parseVoiceChannels({ channels: [{ id: "table", name: "The Table" }] }), [{ id: "table", name: "The Table" }]);
  for (const bad of [{}, { channels: null }, { channels: [{}] }, { channels: [null] }]) assert.throws(() => parseVoiceChannels(bad));
  const warning = MESSAGE_CATALOGS.en["voice.unroutableWarning"];
  assert.equal(voiceWarningText(warning, "en"), warning);
  assert.match(voiceWarningText(warning, "zh-CN"), /远程玩家/);
  assert.equal(voiceWarningText("New server warning", "en"), "New server warning");
  assert.match(voiceWarningText("New server warning", "zh-CN"), /报告了警告/);
});

await test("real voice probe distinguishes server/campaign switches and rejects nonmembers", async () => {
  world.signIn(world.owner);
  saveGlobalConfig({ voiceChat: { mode: "sfu", enabled: "off" } });
  let view = parseVoiceAvailability(await (await route.GET(req(), context)).json());
  assert.equal(view.available, false); assert.equal(view.unavailableReason, "server");
  assert.equal((await channelsRoute.GET(req(), context)).status, 403);
  saveGlobalConfig({ voiceChat: { mode: "sfu", enabled: "on" } });
  updateGameSettings(world.campaignId, { voice: { enabled: false } });
  view = parseVoiceAvailability(await (await route.GET(req(), context)).json());
  assert.equal(view.available, false); assert.equal(view.unavailableReason, "campaign");
  updateGameSettings(world.campaignId, { voice: { enabled: true } });
  view = parseVoiceAvailability(await (await route.GET(req(), context)).json());
  assert.equal(view.available, true); assert.equal(view.unavailableReason, "");
  world.signIn(world.addUser("outsider"));
  assert.equal((await route.GET(req(), context)).status, 404);
});

await test("real room routes accept Chinese names and retain story authority and canonical IDs", async () => {
  getRoom(world.campaignId); // Initializes the in-memory registry; no native media worker.
  const peers = new Map([[player.id, fakePeer(player)], [world.owner.id, fakePeer(world.owner)]]);
  const room = { campaignId: world.campaignId, channels: [{ id: TABLE_CHANNEL_ID, name: TABLE_CHANNEL_NAME }], peers, audibility: new Map() };
  globalThis.__odmVoiceRegistry.rooms.set(world.campaignId, room);
  world.signIn(world.owner);
  let response = await channelsRoute.POST(req({ action: "open", name: "钟楼密谈室" }), context);
  assert.equal(response.status, 200);
  let view = parseVoiceChannels(await response.json());
  const side = view.find((c) => c.name === "钟楼密谈室"); assert.ok(side); assert.notEqual(side.id, side.name);
  response = await channelsRoute.POST(req({ action: "move", userId: player.id, channelId: side.id }), context);
  assert.equal(response.status, 200); assert.equal(peers.get(player.id).channelId, side.id);
  world.signIn(player);
  assert.equal((await channelsRoute.GET(req(), context)).status, 200);
  for (const action of ["open", "close", "move", "recall"]) assert.equal((await channelsRoute.POST(req({ action, name: "未经授权", channelId: side.id, userId: player.id }), context)).status, 403);
  assert.equal(room.channels.length, 2); assert.equal(peers.get(player.id).channelId, side.id);
  world.signIn(world.owner);
  assert.equal((await channelsRoute.POST(req({ action: "close", channelId: side.id }), context)).status, 200);
  assert.equal(peers.get(player.id).channelId, TABLE_CHANNEL_ID);
  assert.deepEqual(room.channels, [{ id: "table", name: "The Table" }]);
  const probe = parseVoiceAvailability(await (await route.GET(req(), context)).json());
  assert.equal(probe.peers.length, 2); assert.equal(probe.peers.find((p) => p.userId === player.id).username, player.username);
  globalThis.__odmVoiceRegistry.rooms.delete(world.campaignId);
});

await test("known route diagnostics stay source compared, unknown ones use contextual fallbacks", () => {
  const routeFiles = fs.readdirSync(path.join(root, "src/app/api/campaigns/[campaignId]/voice"), { recursive: true }).filter((file) => file.endsWith("route.ts"));
  const source = routeFiles.map((file) => fs.readFileSync(path.join(root, "src/app/api/campaigns/[campaignId]/voice", file), "utf8")).join("\n") + fs.readFileSync(path.join(root, "src/lib/voice/gate.ts"), "utf8");
  for (const [error, key] of Object.entries(VOICE_ERROR_KEYS)) { assert.ok(source.includes(JSON.stringify(error)), `Review changed route diagnostic: ${error}`); assert.ok(MESSAGE_CATALOGS["zh-CN"][key]); }
});

await test("UI protocol values stay canonical and dock close keeps its single panel mounted", () => {
  for (const filename of ["VoicePanel.tsx", "VoicePanelParts.tsx", "VoicePeerRow.tsx", "VoiceDock.tsx", "useVoiceRoom.ts"]) {
    const source = fs.readFileSync(path.join(root, "src/app/campaigns/[campaignId]", filename), "utf8");
    const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node) => {
      if (ts.isBinaryExpression(node) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(node.operatorToken.kind)) assert.ok(!/t\(/.test(node.left.getText(ast)) && !/^t\(/.test(node.right.getText(ast)), `${filename}: translated protocol comparison`);
      if (ts.isPropertyAssignment(node) && ["value", "action", "channelId", "userId", "sayRange", "mode"].includes(node.name.getText(ast))) assert.ok(!/^t\(/.test(node.initializer.getText(ast)), `${filename}: translated wire value`);
      ts.forEachChild(node, visit);
    }; visit(ast);
    if (filename === "VoicePanelParts.tsx") { assert.match(source, /if \(await onAction/); assert.match(source, /current === draft/); assert.match(source, /pending \|\| !newRoom.trim\(\)/); }
    if (filename === "VoiceDock.tsx") { assert.equal((source.match(/<VoicePanel\b/g) ?? []).length, 1); assert.match(source, /open \? "block" : "hidden"/); }
    if (filename === "useVoiceRoom.ts") { assert.match(source, /campaignId === campaignId/); assert.match(source, /probe.attempt === probeAttempt/); assert.match(source, /if \(cancelled\) return/); assert.match(source, /setError\(microphoneBlockError\(blocked\)\)/); assert.doesNotMatch(source, /label: device.label \|\|/); }
  }
});
world.close();
finish();
