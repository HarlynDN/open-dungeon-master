import assert from "node:assert/strict";
import { MESSAGE_CATALOGS } from "../src/lib/i18n/messages.ts";
import { auditTerminology } from "../src/lib/i18n/terminology-audit.ts";
import { TERMINOLOGY } from "../src/lib/i18n/terminology.ts";
import { APP_LOCALES } from "../src/lib/i18n/locales.ts";
import { referenceDisplayName, referencePresentation, resolveReference } from "../src/lib/i18n/references.ts";
import { generationLocaleRule } from "../src/lib/i18n/generation.ts";
import { checkNarration } from "../src/lib/dm/engine-boundary.ts";

assert.deepEqual(Object.keys(TERMINOLOGY), [...APP_LOCALES]);
assert.equal(auditTerminology(MESSAGE_CATALOGS.en, MESSAGE_CATALOGS["zh-CN"], "zh-CN").errors.length, 0);
// User-selected labels must agree across character creation, speech/prose
// names and tool aliases. Related creatures are separate editorial entries.
assert.equal(MESSAGE_CATALOGS["zh-CN"]["rule.race.goblin"], "哥布林");
assert.equal(MESSAGE_CATALOGS["zh-CN"]["training.language.goblin"], "哥布林语");
assert.equal(MESSAGE_CATALOGS["zh-CN"]["rule.race.rock_gnome"], "岩侏儒");
assert.equal(MESSAGE_CATALOGS["zh-CN"]["training.language.gnomish"], "侏儒语");
assert.equal(referenceDisplayName("monster", "Bugbear", "zh-CN"), "熊地精");
assert.equal(referenceDisplayName("monster", "Hobgoblin", "zh-CN"), "大地精");
const source = { factions: "Factions", alignment: "Alignment", loading: "Loading", ammo: "Loading" };
const entries = [{ id: "factions", source: "Factions", preferred: "势力", scope: "ui", matchSource: true, forbidden: ["阵营"] }];
const good = auditTerminology(source, { factions: "势力", alignment: "阵营", loading: "正在加载", ammo: "装填" }, "zh-CN", entries);
assert.equal(good.errors.length, 0);
assert.equal(good.warnings.length, 1, "different meanings must remain warnings");
assert.ok(auditTerminology(source, { factions: "阵营", alignment: "阵营" }, "zh-CN", entries).errors.length > 0);
assert.ok(auditTerminology({ newKey: "Factions" }, { newKey: "阵营" }, "zh-CN", entries).errors.length > 0, "new keys cannot bypass a source-bound policy");

const enemies = [{ id: "e1", name: "Goblin 1" }, { id: "e2", name: "Goblin 2" }];
assert.deepEqual(referencePresentation("monster", enemies[1], "zh-CN"), { id: "e2", canonicalName: "Goblin 2", displayName: "哥布林 2", aliases: ["哥布林 2", "地精 2"] });
assert.equal(resolveReference("monster", "地精 2", enemies, "zh-CN").entry.id, "e2");
assert.equal(resolveReference("monster", "哥布林 2", enemies, "zh-CN").entry.id, "e2");
assert.equal(referenceDisplayName("monster", "Goblin King Gruk", "zh-CN"), "Goblin King Gruk");
assert.equal(referenceDisplayName("monster", "Goblin 2", "en"), "Goblin 2");
assert.match(generationLocaleRule("zh-CN"), /goblin = 哥布林/);
assert.match(generationLocaleRule("zh-CN"), /custom proper names/);
assert.match(generationLocaleRule("zh-CN"), /canonical English name or ID/);
assert.doesNotMatch(generationLocaleRule("en"), /goblin = 哥布林/);
const conversation = [
  { role: "assistant", tool_calls: [{ id: "a", function: { name: "pc_attack", arguments: '{}' } }] },
  { role: "tool", tool_call_id: "a", content: JSON.stringify({ target: "Goblin 2", hit: false }) },
];
for (const name of ["地精", "地精 2", "哥布林 2", "Goblin 2"]) assert.ok(checkNarration({ locale: "zh-CN", conversation, narration: `长剑击中了${name}。` }).some(issue => issue.kind === "hit"), name);
assert.deepEqual(checkNarration({ locale: "zh-CN", conversation, narration: "长剑击中了地精王。" }), []);
console.log("test-terminology: catalog policy, context warnings, aliases, identity, proper names and guard passed");
