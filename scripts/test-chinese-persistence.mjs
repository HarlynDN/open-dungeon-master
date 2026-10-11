import "../src/lib/i18n/messages.ts";
// Exercise the real account and campaign routes against a scratch database.
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { register } from "node:module";
import { randomBytes } from "node:crypto";
import { removeTempDir } from "./lib/remove-temp-dir.mjs";

const dir = mkdtempSync(path.join(os.tmpdir(), "odm-locales-"));
process.env.SQLITE_DB_PATH = path.join(dir, "test.sqlite");
process.env.DB_ENCRYPTION_KEY = randomBytes(32).toString("hex");
register("./lib/register-routes.mjs", import.meta.url);
const { createUser, getUserSettings, updateUserSettings } = await import("../src/lib/db/users.ts");
const { mintSession } = await import("../src/lib/auth.ts");
const profile = await import("../src/app/api/profile/route.ts");
const campaigns = await import("../src/app/api/campaigns/route.ts");
const settings = await import("../src/app/api/campaigns/[campaignId]/settings/route.ts");
const { createCampaign, getCampaignById } = await import("../src/lib/db/campaigns.ts");
const { insertCampaignMessage, listMessagesInSeqRange } = await import("../src/lib/db/messages.ts");

const user = createUser("locale-player", "x", { isAdmin: true });
globalThis.__odmTestToken = mintSession(user.id).token;
const request = (payload, method = "PATCH") => new Request("http://localhost/api/test", {
  method, headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
});
let passed = 0;
let legacyId;
async function test(name, run) { await run(); passed++; console.log(`ok: ${name}`); }

try {
  await test("profile locale patches merge with audio preferences and reject unsupported codes", async () => {
    updateUserSettings(user.id, { narrationVolume: 0.3, ambienceMuted: true });
    assert.equal((await profile.PATCH(request({ settings: { uiLocale: "zh-CN" } }))).status, 200);
    assert.deepEqual(getUserSettings(user.id), { narrationVolume: 0.3, ambienceMuted: true, uiLocale: "zh-CN" });
    assert.equal((await profile.PATCH(request({ settings: { uiLocale: "fr" } }))).status, 400);
    assert.equal(getUserSettings(user.id).uiLocale, "zh-CN");
  });
  await test("new campaigns inherit the creator's UI locale unless explicitly set", async () => {
    const created = await campaigns.POST(request({ title: "中文战役" }, "POST"));
    assert.equal(created.status, 201);
    assert.equal((await created.json()).campaign.gameSettings.locale, "zh-CN");
    const explicit = await campaigns.POST(request({ title: "English campaign", gameSettings: { locale: "en" } }, "POST"));
    assert.equal((await explicit.json()).campaign.gameSettings.locale, "en");
  });
  await test("old campaigns stay English, campaign switching never rewrites history or UI preferences", async () => {
    const campaign = createCampaign(user.id, { title: "Legacy", description: "", theme: "", maxPlayers: 4, startingLevel: 1, difficulty: "normal" });
    legacyId = campaign.id;
    assert.equal(campaign.gameSettings.locale, "en");
    insertCampaignMessage({ campaignId: campaign.id, seq: 1, authorType: "dm", content: "The old English story." });
    const context = { params: Promise.resolve({ campaignId: campaign.id }) };
    assert.equal((await settings.PATCH(request({ locale: "zh-CN" }), context)).status, 200);
    assert.equal(getCampaignById(campaign.id).gameSettings.locale, "zh-CN");
    assert.equal(listMessagesInSeqRange(campaign.id, 1, 1)[0].content, "The old English story.");
    assert.equal(getUserSettings(user.id).uiLocale, "zh-CN");
    assert.equal((await settings.PATCH(request({ mapsEnabled: false }), context)).status, 200);
    assert.equal(getCampaignById(campaign.id).gameSettings.locale, "zh-CN");
  });
  await test("a different account defaults to English and cannot change another table's language", async () => {
    const other = createUser("other-player", "x");
    globalThis.__odmTestToken = mintSession(other.id).token;
    const response = await campaigns.POST(request({ title: "Another table" }, "POST"));
    assert.equal((await response.json()).campaign.gameSettings.locale, "en");
    const refused = await settings.PATCH(request({ locale: "en" }), { params: Promise.resolve({ campaignId: legacyId }) });
    assert.ok(refused.status >= 400);
    assert.equal(getCampaignById(legacyId).gameSettings.locale, "zh-CN");
  });
  console.log(`test-chinese-persistence: ${passed} passed`);
} finally {
  delete globalThis.__odmTestToken;
  removeTempDir(dir);
}
