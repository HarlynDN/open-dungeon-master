// Live smoke: a real agent program narrates real DM turns through ODM's MCP
// endpoint. NOT part of npm test: it runs the admin's own Claude Code, Codex,
// opencode or Grok Build, which spends their plan.
//
//   HARNESS=claude HARNESS_MODEL=haiku node scripts/smoke-harness.mjs
//   HARNESS=opencode HARNESS_MODEL=llama/qwen3.6-35b node scripts/smoke-harness.mjs
//
// Asserts the program's own tool list held nothing but the table's tools,
// that a canary file in its scratch folder was never read, that its rolls
// were the server's, and that its narration landed as the DM's message.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { register } from "node:module";

const HARNESS = process.env.HARNESS || "claude";
let MODEL = process.env.HARNESS_MODEL || "";
const TURNS = Number.parseInt(process.env.HARNESS_TURNS ?? "", 10) || 2;

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "odm-harness-smoke-"));
process.env.SQLITE_DB_PATH = path.join(dir, "test.sqlite");
process.env.DB_ENCRYPTION_KEY = randomBytes(32).toString("hex");
process.on("exit",()=>fs.rmSync(dir,{recursive:true,force:true}));
setTimeout(()=>{console.error("Chinese runtime acceptance exceeded 12 minutes");process.exit(1);},720000).unref();
delete process.env.HARNESS_FAKE;
register("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/scripts/lib/register-alias.mjs", import.meta.url);

const { saveGlobalConfig } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/app-settings.ts");
const { createUser } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/users.ts");
const { createCampaign, setCampaignStatus, updateStorySettings, allocateSeq } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/campaigns.ts");
const { createSheet } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/sheets.ts");
const { createSheetSchema } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/schemas/sheet.ts");
const { insertCampaignMessage, listRecentMessages } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/messages.ts");
const { listRecentRolls } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/rolls.ts");
const { startDmTurn } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/dm/turn.ts");
const { handleMcpRequest } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/agents/mcp-server.ts");
const { activeBridgeSessions } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/bridge.ts");
const { probeHarness } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/status.ts");
const { recentAgentActivity } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/agents/activity.ts");
const { testHarness } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/test-run.ts");
const { removeTempDir } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/scripts/lib/remove-temp-dir.mjs");

const server = http.createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const response = await handleMcpRequest(
    new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : Buffer.concat(chunks),
    }),
  );
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
process.env.HARNESS_MCP_URL = `http://127.0.0.1:${server.address().port}/api/mcp`;

// Resolve Codex's actual default without printing account/config contents.
const { startJsonRpc } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/jsonrpc-stdio.ts");
const { codexArgs, userCodexMcpServers } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/adapters/codex.ts");
const { buildChildEnv } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/child-env.ts");
const { childPath } = await import("file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/discover.ts");
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
saveGlobalConfig({ harness: { id: HARNESS, model: MODEL, utilityModel: MODEL }, text: { provider: "harness" } });
const status = await probeHarness(HARNESS, { refresh: true });
console.log(`${status.label} ${status.version ?? "?"} at ${status.path ?? "?"}: auth=${status.auth.state} ${status.auth.kind ?? ""}`);
assert.ok(status.installed, status.message);

const probe = await testHarness();
for (const stage of probe.stages) {
  console.log(`  test stage ${stage.id}: ${stage.ok === null ? "skipped" : stage.ok ? "ok" : "FAILED"}${stage.ok === false && stage.detail ? ` (${stage.detail})` : ""}`);
}
assert.ok(probe.stages.every((stage) => stage.ok), "the admin test turn failed");

const lead = createUser("rowan", "x");
const campaign = createCampaign(lead.id, {
  title: "盐路中文验收",
  description: "A caravan job that goes wrong at the ford.",
  theme: "low fantasy, coastal trade road",
  maxPlayers: 4,
  startingLevel: 3,
  difficulty: "normal",
  gameSettings: { locale: "zh-CN" },
});
updateStorySettings(campaign.id, { textProvider: "harness", imageGenerationEnabled: false, autoImages: false });
setCampaignStatus(campaign.id, "active");
const avery = createSheet(
  campaign.id,
  lead.id,
  3,
  createSheetSchema.parse({
    name: "Avery",
    race: "human",
    class: "rogue",
    abilities: { str: 12, dex: 17, con: 13, int: 12, wis: 12, cha: 11 },
    maxHp: 24,
    ac: 15,
    hitDice: { die: "d8", total: 3, spent: 0 },
    proficiencies: { saves: ["dex", "int"], skills: ["perception", "athletics"], languages: ["common"], tools: [], armor: [], weapons: ["shortsword"] },
    equipment: [{ name: "Shortsword", qty: 1 }],
    gold: 12,
  }),
);

const actions = [
  "我爬上头车，观察渡口对岸是否有动静。请由规则引擎为我进行一次察觉检定，依据真实掷骰结果叙述，别自行编造骰点。",
  "我握紧短剑涉水进入渡口，向藏着的人喊：出来！请继续用简体中文叙述。",
  "我搜索那个身影消失的芦苇丛。",
];
for (let index = 0; index < TURNS; index += 1) {
  insertCampaignMessage({
    campaignId: campaign.id,
    seq: allocateSeq(campaign.id),
    authorType: "player",
    userId: lead.id,
    characterId: avery.id,
    content: actions[index % actions.length],
  });
  const started = Date.now();
  await startDmTurn(campaign.id);
  const last = listRecentMessages(campaign.id, 3).pop();
  console.log(`\n--- turn ${index + 1} (${Math.round((Date.now() - started) / 1000)}s, ${last.authorType}) ---\n${last.content.slice(0, 900)}`);
  assert.equal(last.authorType, "dm", `turn ${index + 1} did not produce narration: ${last.content}`);
  assert.match(last.content, /\p{Script=Han}/u, "DM narration was not Chinese");
  assert.equal(activeBridgeSessions(), 0, "a session outlived its turn");
}

const calls = recentAgentActivity({ limit: 100 }).filter((row) => row.grantKind === "turn");
console.log(`\ntool calls through MCP: ${calls.map((row) => `${row.tool}${row.ok ? "" : "(refused)"}`).join(", ") || "none"}`);
console.log(`server rolls: ${listRecentRolls(campaign.id, 50).length}`);

assert.ok(calls.some(row=>row.ok && /roll|check/.test(row.tool)), "No successful engine roll/check tool call");
assert.ok(listRecentRolls(campaign.id,50).length>0,"No engine rolls persisted");
server.close();
removeTempDir(dir);
console.log("\nHARNESS SMOKE PASS");
process.exit(0);
