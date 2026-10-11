import assert from "node:assert/strict";
import { openWorld } from "./lib/enforce-world.mjs";
const world = await openWorld({ gameSettings: { locale: "zh-CN" } });
const { buildGameStateBlock } = await import("../src/lib/dm/prompt.ts");
try {
  const enemy = (enemyId, name) => ({ enemyId, name, hp: "8/8", ac: 13, status: "alive", conditions: [], attacks: [], traits: [], resist: "", immune: "", vulnerable: "", concentration: null });
  const encounter = { round: 1, orderReady: true, order: [{ name: "Goblin", current: true }, { name: "Goblin 2", current: false, enemyId: "e2" }], awaitingInitiative: [], turnBudget: null, movementLeft: null, awaitingPlayer: null,
    enemies: [enemy("e1", "Goblin 1"), enemy("e2", "Goblin 2"), enemy("named", "Goblin King Gruk")], map: null };
  const state = { campaign: world.campaign(), members: [], sheets: [], recentRolls: [], storySummary: "", encounter };
  const text = buildGameStateBlock(state);
  assert.match(text, /地精 1 \(canonical name: Goblin 1;.*\[enemyId=e1\]/);
  assert.match(text, /地精 2 \(canonical name: Goblin 2;.*\[enemyId=e2\]/);
  assert.match(text, /Goblin King Gruk \[enemyId=named\]/);
  assert.match(text, /Initiative order: Goblin \(CURRENT TURN\) > 地精 2/);
  assert.equal(encounter.enemies[1].name, "Goblin 2", "presentation cannot mutate stored names");
  const english = buildGameStateBlock({ ...state, campaign: { ...state.campaign, gameSettings: { ...state.campaign.gameSettings, locale: "en" } } });
  assert.match(english, /- Goblin 2 \[enemyId=e2\]/);
  assert.doesNotMatch(english, /地精|canonical name: Goblin/);
  console.log("test-localized-combat-prompt: Chinese roster, distinct IDs, custom names, initiative and English behavior passed");
} finally { world.close(); }
