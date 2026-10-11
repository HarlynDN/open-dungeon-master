import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { register } from "node:module";
import { uiLiterals, translationKeys } from "./lib/ui-localization.mjs";
import { removeTempDir } from "./lib/remove-temp-dir.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-chinese-ui-contracts");
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "odm-ui-contracts-"));
process.env.SQLITE_DB_PATH = path.join(dir, "test.sqlite");
process.env.DB_ENCRYPTION_KEY = randomBytes(32).toString("hex");
process.env.ODM_SETUP_CODE = "TEST-ONLY-UI-CODE";
process.env.DEFAULT_TEXT_PROVIDER = "none";
register("./lib/register-routes.mjs", import.meta.url);
globalThis.__odmTestCookies = new Map();
const registerRoute = await import("../src/app/api/auth/register/route.ts");
const loginRoute = await import("../src/app/api/auth/login/route.ts");
const passwordRoute = await import("../src/app/api/auth/change-password/route.ts");
const starterRoute = await import("../src/app/api/starter/route.ts");
const joinRoute = await import("../src/app/api/campaigns/join/route.ts");
const { getUserByUsername, getUserSettings, updateUserSettings } = await import("../src/lib/db/users.ts");
const { apiErrorText } = await import("../src/lib/i18n/api-errors.ts");
const { createTranslator } = await import("../src/lib/i18n/messages.ts");
const post = (route, body) => route.POST(new Request("http://test/auth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));

try {
  await test("the first Chinese signup persists the choice before its setup redirect; legacy signup retains its default", async () => {
    const response = await post(registerRoute, { username: "chinese-admin", password: "test-password", setupCode: "TEST-ONLY-UI-CODE", uiLocale: "zh-CN" });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).claimedServer, true);
    assert.equal(getUserSettings(getUserByUsername("chinese-admin").id).uiLocale, "zh-CN");
    assert.equal((await post(registerRoute, { username: "legacy-player", password: "test-password" })).status, 201);
    assert.equal(getUserSettings(getUserByUsername("legacy-player").id).uiLocale, undefined);
    assert.equal((await post(registerRoute, { username: "invalid-player", password: "test-password", uiLocale: "fr" })).status, 400);
    assert.equal(getUserByUsername("invalid-player"), null);
  });
  await test("real login errors keep English compatibility and render Chinese without losing numeric retry parameters", async () => {
    const wrong = await post(loginRoute, { username: "chinese-admin", password: "wrong" });
    assert.equal(wrong.status, 401);
    const data = await wrong.json();
    assert.equal(data.error, "Wrong username or password.");
    assert.equal(apiErrorText("zh-CN", data, "common.requestFailed"), "用户名或密码错误。");
    assert.equal(apiErrorText("en", data, "common.requestFailed"), "Wrong username or password.");
    assert.equal(apiErrorText("zh-CN", { errorCode: "rate_limited", retryAfterSec: 37 }, "common.requestFailed"), "尝试次数过多，请在 37 秒后重试。");
    assert.equal(apiErrorText("zh-CN", { error: "An unrecognized English response" }, "common.requestFailed"), "请求失败，请重试。");
    const duplicate = await post(registerRoute, { username: "chinese-admin", password: "test-password" });
    assert.equal(duplicate.status, 409);
    assert.equal(apiErrorText("zh-CN", await duplicate.json(), "common.requestFailed"), "此用户名已被使用。");
  });
  await test("logging in or changing a password does not overwrite account language or audio settings", async () => {
    const user = getUserByUsername("chinese-admin");
    updateUserSettings(user.id, { narrationVolume: 0.4 });
    assert.equal((await post(loginRoute, { username: user.username, password: "test-password", uiLocale: "en" })).status, 200);
    const wrong = await post(passwordRoute, { currentPassword: "wrong", newPassword: "test-new-password" });
    assert.equal(wrong.status, 403);
    assert.equal(apiErrorText("zh-CN", await wrong.json(), "password.failed"), "当前密码错误。");
    assert.equal((await post(passwordRoute, { currentPassword: "test-password", newPassword: "test-new-password" })).status, 200);
    assert.deepEqual(getUserSettings(user.id), { uiLocale: "zh-CN", narrationVolume: 0.4 });
  });
  await test("quick-start campaigns inherit the authenticated account locale too", async () => {
    const response = await post(starterRoute, { solo: true });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).campaign.gameSettings.locale, "zh-CN");
  });
  await test("room-code failures are localized through stable codes and do not erase the original error", async () => {
    const wrong = await post(joinRoute, { inviteCode: "NOSUCHRM" });
    assert.equal(wrong.status, 400);
    const data = await wrong.json();
    assert.equal(data.error, "No campaign with that invite code.");
    assert.equal(apiErrorText("zh-CN", data, "home.joinFailed"), "此房间码没有对应此服务器上的战役。");
    const short = await post(joinRoute, { inviteCode: "xx" });
    assert.equal(apiErrorText("zh-CN", await short.json(), "home.joinFailed"), "请输入 4–12 个字符的房间码。");
  });
  await test("AST audit finds prose in text, conditional attributes, templates, display configuration and notices, but preserves protocols", () => {
    const source = 'const opts = [{ value: "do", label: "Take action" }]; const title = "Welcome"; setError("Try again"); const view = <button className="w-full" data-mode="do" title={busy ? "Wait" : `Ready ${name}`} aria-label="Send">Hello {bad ? "Wrong" : t("common.close")}</button>;';
    const texts = uiLiterals("example.tsx", source).map(row => row.text);
    for (const text of ["Take action", "Welcome", "Try again", "Wait", "Ready", "Send", "Hello", "Wrong"]) assert.ok(texts.includes(text), text);
    for (const invariant of ["do", "w-full", "common.close"]) assert.ok(!texts.includes(invariant), invariant);
    assert.equal(uiLiterals("example.tsx", 'setError("password.mismatch");', [], new Set(["password.mismatch"])).length, 0);
  });
  await test("rich messages accept only known keys, collect conditional keys, and still audit ordinary message props and authored children", () => {
    const source = '<><LocalizedText message="rich.one" values={{name}}/><LocalizedText message={plural ? "rich.many" : "rich.one"}>Authored prose</LocalizedText><LocalizedText message="rich.unknown"/><Notice message="rich.one"/><Notice message="Try again"/></>';
    const keys = new Set(["rich.one", "rich.many"]);
    const rows = uiLiterals("example.tsx", source, [], keys);
    assert.deepEqual(rows.map(row => row.text), ["Authored prose", "rich.unknown", "rich.one", "Try again"]);
    assert.deepEqual(translationKeys("example.tsx", source), ["rich.one", "rich.many", "rich.one", "rich.unknown"]);
  });
  await test("linked legal wording keeps both languages' slot order and requires every placeholder", () => {
    assert.equal(createTranslator("zh-CN")("auth.termsAgreement", { terms: "[条款]", privacy: "[隐私]" }), "创建账户即表示你接受此服务器的[条款]和[隐私]。");
    assert.match(createTranslator("en")("auth.termsAgreement", { terms: "[terms]", privacy: "[privacy]" }), /\[terms\] and \[privacy\]/);
    assert.throws(() => createTranslator("zh-CN")("auth.termsAgreement", { terms: "[条款]" }), /privacy/);
  });
  await test("action errors with titles remain safe to re-render after switching UI language", () => {
    const error = { error: 'Could not delete "Old English title".' };
    assert.equal(apiErrorText("zh-CN", error, "home.deleteFailed", { title: "Old English title" }), "未能删除“Old English title”。");
    assert.equal(apiErrorText("en", error, "home.deleteFailed", { title: "Old English title" }), error.error);
    assert.equal(apiErrorText("zh-CN", {}, "home.cloneFailed"), "未能创建副本。");
    assert.throws(() => apiErrorText("zh-CN", {}, "home.deleteFailed"), /title/);
  });
} finally {
  delete globalThis.__odmTestCookies;
  delete globalThis.__odmTestToken;
  removeTempDir(dir);
}
finish();
