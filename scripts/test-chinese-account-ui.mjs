import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-chinese-account-ui");
const world = await openWorld({ status: "lobby", gameSettings: { locale: "zh-CN" } });
const { getUserSettings, getUserById, NO_PASSWORD_SENTINEL, createUser } = await import("../src/lib/db/users.ts");
const { saveGlobalConfig } = await import("../src/lib/db/app-settings.ts");
const { listConnectionGrants } = await import("../src/lib/agents/grants.ts");
const { createTranslator, MESSAGE_CATALOGS } = await import("../src/lib/i18n/messages.ts");
const { readUiResponse, requestErrorText, loadErrorText } = await import("../src/lib/i18n/api-errors.ts");
const { accountGraceCopy, accountDate, accountRequestError, parseAccountServerInfo, deleteAccountReady, discordNoticeKey, diceLookLabel, agentScopeLabel, agentSetupInstructions, agentProgramLabel, agentConnectionActivity, agentFirstCallText } = await import("../src/lib/i18n/account-presentations.ts");
const { AGENT_PROGRAMS, agentSetupLine } = await import("../src/lib/agents/setup-line.ts");
const { AGENT_SCOPE_CHOICES } = await import("../src/lib/i18n/account-metadata.ts");
const { DICE_LOOK_PRESETS, DICE_TEXTURES, DICE_MATERIALS } = await import("../src/lib/dice/dice-look.ts");
const profile = await world.route("profile");
const blocks = await world.route("profile/blocks");
const agents = await world.route("profile/agents");
const root = path.resolve(import.meta.dirname, "..");
const request = (method, body) => new Request("http://127.0.0.1/test", { method, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });

await test("deletion policy must come from the server, with correct immediate/one/many copy", () => {
  for (const days of [0, 1, 14, 30]) {
    const source = { serverName: "自写服务器名称", version: "0.26.0", accountDeletionGraceDays: days, deviceWorld: false };
    const view = parseAccountServerInfo(source);
    assert.equal(view.graceDays, days); assert.equal(view.serverName, source.serverName);
    if (days === 0) assert.match(accountGraceCopy(days, "zh-CN"), /立即删除/);
    else { assert.match(accountGraceCopy(days, "zh-CN"), new RegExp(`${days} 天后`)); assert.match(accountGraceCopy(days, "en"), new RegExp(`${days} day${days === 1 ? "," : "s,"}`)); }
  }
  for (const bad of [null, {}, { serverName: "test", version: "1", deviceWorld: false }, { serverName: "test", version: "1", deviceWorld: false, accountDeletionGraceDays: -1 }, { serverName: "test", version: "1", deviceWorld: false, accountDeletionGraceDays: "14" }]) assert.throws(() => parseAccountServerInfo(bad));
  assert.equal(deleteAccountReady(false, "DELETE"), true);
  for (const wrong of ["delete", " 删除 ", "注销", " DELETE"]) assert.equal(deleteAccountReady(false, wrong), false);
  assert.equal(deleteAccountReady(true, ""), false); assert.equal(deleteAccountReady(true, "原密码"), true);
  assert.equal(discordNoticeKey(new URLSearchParams("linked=1")), "account.discordSuccess");
  assert.equal(discordNoticeKey(new URLSearchParams("error=discord_taken")), "account.discordTaken");
  assert.equal(discordNoticeKey(new URLSearchParams("error=future")), null);
});

await test("account dates and persisted errors render in the chosen UI locale", async () => {
  const instant = "2026-10-11T05:00:00Z";
  assert.match(accountDate(instant, "zh-CN"), /2026年10月11日/);
  assert.match(accountDate(instant, "en"), /October 11, 2026/);
  assert.equal(accountDate("invalid", "zh-CN"), "日期未知");
  const error = await readUiResponse(Promise.resolve(Response.json({ error: "Password is wrong." }, { status: 403 })), "account.deleteError").catch((e) => accountRequestError(e, "account.deleteError"));
  assert.equal(requestErrorText("en", error), "Password is wrong."); assert.equal(requestErrorText("zh-CN", error), "密码不正确。");
  const network = await readUiResponse(Promise.reject(new Error("offline")), "account.profileLoadError").catch((e) => accountRequestError(e, "account.profileLoadError"));
  assert.equal(requestErrorText("en", network), MESSAGE_CATALOGS.en["prep.networkError"]);
  assert.equal(requestErrorText("zh-CN", network), MESSAGE_CATALOGS["zh-CN"]["prep.networkError"]);
  assert.match(loadErrorText("zh-CN", "The blocked list did not load. HTTP 503.", "blocks.loadError"), /无法读取屏蔽/);
  assert.equal(requestErrorText("zh-CN", accountRequestError(new Error("Canvas unavailable."), "avatar.processError")), MESSAGE_CATALOGS["zh-CN"]["avatar.canvasError"]);
});

await test("dice and permission labels preserve engine/source identifiers and authored names", () => {
  for (const [kind, rows] of [["preset", DICE_LOOK_PRESETS], ["texture", DICE_TEXTURES], ["material", DICE_MATERIALS]]) for (const row of rows) {
    assert.equal(diceLookLabel(kind, row.id, "en"), row.label);
    assert.match(diceLookLabel(kind, row.id, "zh-CN"), /\p{Script=Han}/u);
  }
  assert.equal(diceLookLabel("preset", "new-custom-id", "zh-CN"), "new-custom-id");
  for (const scope of AGENT_SCOPE_CHOICES) for (const field of ["label", "hint"]) assert.equal(agentScopeLabel(scope.id, "en", field), scope[field]);
  assert.equal(agentScopeLabel("future-scope", "zh-CN"), "future-scope");
  assert.deepEqual(AGENT_SCOPE_CHOICES.map((scope) => scope.id), ["read", "play", "characters", "campaigns", "dm"]);
});

await test("MCP setup bytes remain canonical while instructions and activity notes localize", () => {
  const url = "http://127.0.0.1/api/mcp", token = "synthetic-test-token";
  for (const program of AGENT_PROGRAMS) {
    const wire = agentSetupLine(program.value, url, token);
    assert.ok(wire.text.includes(url) && wire.text.includes(token));
    assert.ok(!/\p{Script=Han}/u.test(wire.text));
    assert.equal(agentSetupInstructions(program.value, "en"), wire.where);
    assert.ok(agentProgramLabel(program.value, "zh-CN"));
  }
  assert.equal(agentSetupLine("codex", url, token).text, `[mcp_servers.odm]\nurl = "${url}"\nhttp_headers = { Authorization = "Bearer ${token}" }`);
  const own = { grantId: "own", tool: "pc_attack", createdAt: "2026-10-11T05:00:00Z" };
  assert.deepEqual(agentConnectionActivity({ grants: [], recent: [{ ...own, grantId: "other" }, own] }, "own"), { tool: "pc_attack", createdAt: own.createdAt });
  assert.equal(agentConnectionActivity({ grants: [], recent: [own] }, "other"), null);
  assert.deepEqual(agentConnectionActivity({ grants: [{ id: "own", lastUsedAt: own.createdAt }], recent: [] }, "own"), { tool: "", createdAt: own.createdAt });
  for (const bad of [null, {}, { grants: [], recent: [{ ...own, createdAt: 4 }] }]) assert.throws(() => agentConnectionActivity(bad, "own"));
  assert.match(agentFirstCallText(own, "zh-CN"), /首次调用（pc_attack）/);
  assert.match(agentFirstCallText({ tool: "", createdAt: "" }, "zh-CN"), /已连接/);
});

await test("real profile/locale/dice writes retain partial merging and passwords", async () => {
  world.signIn(world.owner);
  const chosen = DICE_LOOK_PRESETS.find((p) => p.id === "ice").look;
  assert.equal((await profile.PATCH(request("PATCH", { settings: { diceLook: chosen, uiLocale: "zh-CN" } }))).status, 200);
  assert.equal((await profile.PATCH(request("PATCH", { settings: { uiLocale: "en" } }))).status, 200);
  assert.deepEqual(getUserSettings(world.owner.id).diceLook, chosen);
  assert.equal(getUserSettings(world.owner.id).uiLocale, "en");
  assert.equal(world.campaign().gameSettings.locale, "zh-CN");
  const before = getUserById(world.owner.id);
  const invalid = await profile.PATCH(request("PATCH", { settings: { diceLook: { ...chosen, texture: "龙鳞" } } }));
  assert.equal(invalid.status, 400); assert.deepEqual(getUserSettings(world.owner.id).diceLook, chosen);
  const wrong = await profile.DELETE(request("DELETE", { password: "not-the-password" }));
  assert.equal(wrong.status, 403); assert.equal(getUserById(world.owner.id).deletionDueAt, before.deletionDueAt);
});

await test("real blocks and grants are account scoped with Chinese labels kept out of wire values", async () => {
  const other = world.addUser("另一个玩家");
  world.signIn(world.owner);
  assert.equal((await blocks.POST(request("POST", { userId: other.id }))).status, 200);
  let response = await blocks.GET(); let data = await response.json();
  assert.equal(data.blocked.length, 1); assert.equal(data.blocked[0].username, other.username);
  assert.equal((await blocks.DELETE(request("DELETE", { userId: other.id }))).status, 200);
  data = await (await blocks.GET()).json(); assert.equal(data.blocked.length, 0);
  const created = await agents.POST(request("POST", { name: "本地审校助手", scopes: ["read"], campaignId: world.campaignId }));
  assert.equal(created.status, 200); const grantData = await created.json();
  assert.equal(grantData.grant.name, "本地审校助手"); assert.deepEqual(grantData.grant.scopes, ["read"]);
  // Do not print or retain the one-use raw token; only inspect route shapes.
  assert.equal(typeof grantData.token, "string");
  assert.equal((await agents.POST(request("POST", { name: "错误权限", scopes: ["读取"] }))).status, 400);
  world.signIn(other);
  data = await (await agents.GET(request("GET"))).json(); assert.equal(data.grants.length, 0);
  const revoke = await world.route("profile/agents/[grantId]");
  assert.equal((await revoke.DELETE(request("DELETE"), { params: Promise.resolve({ grantId: grantData.grant.id }) })).status, 404);
  world.signIn(world.owner);
  assert.equal((await revoke.DELETE(request("DELETE"), { params: Promise.resolve({ grantId: grantData.grant.id }) })).status, 200);
  assert.equal(listConnectionGrants(world.owner.id).length, 0);
});

await test("real providers expose immediate grace, device flags and login-only confirmation truth", async () => {
  saveGlobalConfig({ accountDeletionGraceDays: 0 });
  const providers = await world.route("auth/providers");
  const view = parseAccountServerInfo(await (await providers.GET()).json());
  assert.equal(view.graceDays, 0); assert.equal(view.deviceWorld, false);
  const discordOnly = createUser("discord-only-preview", NO_PASSWORD_SENTINEL);
  world.signIn(discordOnly);
  const meRoute = await world.route("auth/me");
  const data = await (await meRoute.GET()).json(); assert.equal(data.user.hasPassword, false);
});

await test("account controls keep confirmation and protocol values unlocalized", () => {
  for (const file of ["src/app/settings/page.tsx", "src/app/settings/DeleteAccountDialog.tsx", "src/app/settings/ConnectedAgentsSection.tsx", "src/components/DiceLookEditor.tsx", "src/components/AgentConnectLines.tsx"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node) => {
      if (ts.isPropertyAssignment(node) && ["scopes", "campaignId", "texture", "material", "settings", "password", "value", "url", "token"].includes(node.name.getText(ast))) assert.ok(!/^t\(/.test(node.initializer.getText(ast)), `${file}: translated protocol value`);
      ts.forEachChild(node, visit);
    }; visit(ast);
    if (file.endsWith("DeleteAccountDialog.tsx")) { assert.doesNotMatch(source, /<form\b|onSubmit=/); assert.match(source, /hasPassword \? "password" : "text"/); }
    if (file.endsWith("settings/page.tsx")) { assert.doesNotMatch(source, /graceDays\s*\?\?\s*14/); assert.match(source, /disabled=\{!about \|\| Boolean\(policyError\)\}/); }
    if (file.endsWith("ConnectedAgentsSection.tsx")) assert.match(source, /campaigns === null \|\| Boolean\(campaignError\)/);
  }
  assert.equal(createTranslator("zh-CN")("deleteAccount.word"), "输入 DELETE 以确认");
});
world.close();
finish();
