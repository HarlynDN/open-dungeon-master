import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import { register } from "node:module";
import { suite } from "./lib/enforce-harness.mjs";
register("./lib/register-alias.mjs", import.meta.url);
const { test, finish } = suite("test-chinese-table-settings");
const { tableInfo, parseSafetyList, personalityPresentation } = await import("../src/lib/i18n/settings-presentations.ts");
const { normalizeSafety } = await import("../src/lib/dm/safety-logic.ts");
const { tableSheet, flipRow, featuresOn } = await import("../src/app/create-campaign/table-sheet.ts");
const { coverSheet } = await import("../src/app/create-campaign/cover-sheet.ts");

const draft = {
  locale: "en", genre: "high_fantasy", difficulty: "normal", campaignLength: "standard",
  startingLevel: 3, maxPlayers: 4, title: "Player's original title", theme: "玩家自写世界",
  dicePolicy: "real_allowed", companions: "full", relationships: "on", romance: "on",
  multiCharacter: "one_active", presentation: "theatre", aiStorySetup: true,
  narrationGuard: true, worldSimulation: true, ttsEnabled: true, mapsEnabled: true,
  ambienceEnabled: true, ambienceAuto: true, midGameJoinOpen: true,
  holdSubmissions: true, multiclassingEnabled: true, inventoryApprovals: true,
  vitalsApprovals: true, boardDrawing: true, enemyIntent: true,
};
const gates = { solo: false, aiNarrates: true, ttsAvailable: false, mapsAvailable: false };

await test("UI language changes labels while every table feature, gate and transition remains canonical", () => {
  const original = structuredClone(draft);
  const en = tableSheet(draft, gates);
  const zh = tableSheet(draft, gates, "zh-CN");
  assert.deepEqual(tableSheet(draft, gates, "en"), en);
  const mechanics = groups => groups.map(({ id, rows }) => ({
    id,
    rows: rows.map(row => Object.fromEntries(Object.entries(row).filter(([key]) => key !== "label" && key !== "hint"))),
  }));
  assert.deepEqual(mechanics(zh), mechanics(en));
  assert.equal(zh.flatMap(group => group.rows).find(row => row.key === "ttsEnabled").hint, "此服务器没有语音服务");
  assert.deepEqual(flipRow(draft, "multiCharacter"), { multiCharacter: "all_active" });
  assert.equal(featuresOn(draft, gates), 14);
  assert.deepEqual(draft, original);
});
await test("Chinese review preserves authored strings and campaign locale, including English pack names", () => {
  const before = structuredClone(draft);
  const zh = coverSheet(draft, gates, "Author's English world pack", "zh-CN");
  assert.equal(zh.title, draft.title);
  assert.equal(zh.theme, draft.theme);
  assert.equal(zh.party, "4 名玩家 · 3 级");
  assert.equal(zh.dice, "允许实体骰子");
  assert.equal(zh.difficulty, "普通");
  assert.match(zh.setting, /^Author's English world pack（/);
  assert.deepEqual(draft, before);
  assert.equal(coverSheet({ ...draft, title: "", theme: "" }, { solo: true, aiNarrates: false }, null, "zh-CN").stampSub, "3 级");
});
await test("Chinese safety punctuation persists separate limits without translating player text or bypassing caps", () => {
  const lines = parseSafetyList("蜘蛛，伤害儿童、betrayal,  torture  ,，、");
  assert.deepEqual(lines, ["蜘蛛", "伤害儿童", "betrayal", "torture"]);
  assert.deepEqual(normalizeSafety({ lines }).lines, lines);
  assert.deepEqual(parseSafetyList("spiders, harm to children"), ["spiders", "harm to children"]);
  assert.equal(parseSafetyList(Array.from({ length: 20 }, (_, n) => `禁区${n}`).join("、")).length, 12);
});
await test("stock DM presentation translates only server-owned source copies, leaving custom presets intact", () => {
  const stock = { userId: null, name: "The Storyteller", blurb: "Warm, generous, sweeping." };
  assert.equal(personalityPresentation(stock, "zh-CN").name, "说书人");
  assert.deepEqual(personalityPresentation(stock, "en"), { name: stock.name, blurb: stock.blurb });
  for (const custom of [{ ...stock, userId: "player" }, { ...stock, blurb: "Server author's own prose" }]) {
    assert.deepEqual(personalityPresentation(custom, "zh-CN"), { name: custom.name, blurb: custom.blurb });
  }
  assert.match(tableInfo("narrationGuard", "zh-CN").text, /不会改变任何角色卡/);
  assert.match(tableInfo("romance", "en").text, /Requires Bonds/);
});
finish();
