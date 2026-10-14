// Offline policy/database regression. Real-model measurements are produced
// separately by calibrate-bilingual-embeddings.mjs, never downloaded in tests.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
// This suite is the explicit opt-in path. The default-install regression is
// exercised separately by test-embedding-reindex.mjs.
process.env.EMBEDDING_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
process.env.EMBEDDING_DTYPE = "q8";
await import("./lib/enforce-campaign.mjs");
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-bilingual-embedding-policy");
const { embeddingProfile } = await import("../src/lib/embedding-profiles.ts");
const { EMBEDDING_KEY, ACTIVE_EMBEDDING_PROFILE } = await import("../src/lib/embeddings.ts");
const { normalizeStoryArc } = await import("../src/lib/dm/arc-logic.ts");
const { setStoryArc } = await import("../src/lib/db/campaigns.ts");
const { tickWaypointsFromCalls } = await import("../src/lib/dm/waypoint-tick.ts");
const { lexicalMatch } = await import("../src/lib/dm/waypoint-logic.ts");
const { insertFact, getFactById } = await import("../src/lib/db/facts.ts");
const { embedMissingVectors } = await import("../src/lib/dm/embedding-reindex.ts");
const { getDatabase } = await import("../src/lib/db/core.ts");

await test("recorded real-model acceptance belongs to the unchanged fixed fixtures", () => {
  const report = JSON.parse(readFileSync(new URL("../docs/validation/bilingual-embeddings.json", import.meta.url), "utf8"));
  for (const fixture of report.fixtures) {
    const current = createHash("sha256").update(readFileSync(new URL(`../${fixture.file}`, import.meta.url))).digest("hex");
    assert.equal(current, fixture.sha256, `${fixture.file} changed; rerun calibration`);
  }
  assert.ok(Object.values(report.acceptance).every(Boolean));
  const multilingual = report.reports.find(row => row.key === "Xenova/paraphrase-multilingual-MiniLM-L12-v2@q8");
  assert.equal(multilingual.dimensions, 384);
  assert.ok(multilingual.mutations.every(row => !row.enabled));
  assert.equal(multilingual.assets.length, 4);
});
await test("only the validated model/dtype profile governs retrieval and semantic mutation", () => {
  assert.equal(EMBEDDING_KEY, "Xenova/paraphrase-multilingual-MiniLM-L12-v2@q8");
  assert.equal(ACTIVE_EMBEDDING_PROFILE.loreFloor, 0.28);
  assert.equal(ACTIVE_EMBEDDING_PROFILE.sceneFloor, 0.25);
  assert.equal(ACTIVE_EMBEDDING_PROFILE.waypointMatch, null);
  assert.equal(ACTIVE_EMBEDDING_PROFILE.factDuplicate, null);
  assert.equal(embeddingProfile("Xenova/paraphrase-multilingual-MiniLM-L12-v2@fp32").waypointMatch, null);
  assert.equal(embeddingProfile("unknown/model@q8").factDuplicate, null);
  assert.equal(embeddingProfile("Xenova/all-MiniLM-L6-v2@fp32").waypointMatch, 0.62);
});
await test("CJK exact names match without conflating directional or personal names", () => {
  assert.equal(lexicalMatch("抵达东门", "东门"), true);
  assert.equal(lexicalMatch("抵达东门", "西门"), false);
  assert.equal(lexicalMatch("找到失踪的马拉", "玛莉"), false);
  assert.equal(lexicalMatch("到达沉没大教堂", "湖底教堂"), false);
  assert.equal(lexicalMatch("找到金库钥匙", "金库钥匙"), true);
});
await test("even identical stub embeddings cannot tick the wrong waypoint; exact Chinese still ticks", async () => {
  const world = await openWorld({ gameSettings: { locale: "zh-CN" } });
  setStoryArc(world.campaignId, normalizeStoryArc({ premise: "前往城门", beats: [{ text: "到达城门", status: "active", act: 1, waypoints: [{ kind: "place", text: "抵达东门" }] }, { text: "进入城市", status: "pending", act: 1 }, { text: "寻找孩子", status: "pending", act: 1 }] }));
  const wrong = await tickWaypointsFromCalls(world.campaignId, [{ name: "move_party", rawArguments: '{"name":"西门"}' }]);
  assert.deepEqual(wrong, []);
  assert.equal(world.campaign().storyArc.beats[0].waypoints[0].done, false);
  const right = await tickWaypointsFromCalls(world.campaignId, [{ name: "move_party", rawArguments: '{"name":"东门"}' }]);
  assert.deepEqual(right, ["抵达东门"]);
  assert.equal(world.campaign().storyArc.beats[0].waypoints[0].done, true);
});
await test("opposite/numeric facts retain their states after embedding and semantic maintenance", async () => {
  const world = await openWorld({ gameSettings: { locale: "zh-CN" } });
  const rows = ["队伍拥有十枚金币。", "队伍拥有二十枚金币。", "东门已经开放。", "东门尚未开放。"].map(fact => insertFact({ campaignId: world.campaignId, category: "world", subject: "", fact, source: "manual" }));
  await embedMissingVectors();
  for (const row of rows) {
    assert.equal(getFactById(row.id).status, "active");
    const stored = getDatabase().prepare("SELECT length(embedding) AS n FROM world_facts WHERE id = ?").get(row.id);
    assert.equal(stored.n, 384 * 4, "facts are still indexed for search");
  }
});
finish();
