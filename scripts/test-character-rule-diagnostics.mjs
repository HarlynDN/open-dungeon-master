import { readValidationJson } from "./lib/validation-json.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { characterRuleFixtures } from "./lib/character-rule-fixtures.mjs";
import { characterSpellRuns } from "./lib/character-spell-fixtures.mjs";
import { characterGearRuns } from "./lib/character-gear-fixtures.mjs";
import { characterFeatRuns } from "./lib/character-feat-fixtures.mjs";
import { characterTrainingFixtures } from "./lib/character-training-fixtures.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-character-rule-diagnostics");
const world = await openWorld({ status: "lobby" });
const root = path.resolve(import.meta.dirname, "..");
const { legalityContextsFor } = await import("../src/lib/characters/catalog.ts");
const { legalizeSheet } = await import("../src/lib/srd/sheet-legality.ts");
const { createSheetSchema } = await import("../src/lib/schemas/sheet.ts");
const { ruleReporter, completeRuleDetails } = await import("../src/lib/characters/problems.ts");
const { refusal } = await import("../src/lib/characters/admit.ts");
const { characterRuleProblems, characterErrorText, ruleValueText } = await import("../src/lib/i18n/character-presentations.ts");
const { CHARACTER_RULE_CODES, CHARACTER_RULE_MESSAGES } = await import("../src/lib/i18n/character-rule-messages.ts");
const { multiclassPrereq } = await import("../src/lib/srd/multiclass.ts");
const goldens = readValidationJson(path.join(root, "docs/validation/character-rule-goldens.json"));
const stable = value => JSON.stringify(value, (_key, item) => item && typeof item === "object" && !Array.isArray(item)
  ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b))) : item);
const hash = value => createHash("sha256").update(stable(value)).digest("hex");
const runs = characterRuleFixtures().map(row => {
  // The pure rules also guard a too-long class list. Its route schema
  // rejects it earlier; bypass that one size bound for the pure-rule case.
  const sheet = { ...createSheetSchema.parse({ ...row.sheet, classes: [] }), classes: row.sheet.classes ?? [] };
  const context = { ...legalityContextsFor({ door: "library", level: 1, userId: world.owner.id, sheet, ...row.context })[0], rollDie: () => 1 };
  const reported = [];
  const result = legalizeSheet(sheet, { ...context, onProblem: detail => reported.push(detail) });
  return { name: row.name, sheet, context, result, reported, details: completeRuleDetails(result.problems, reported) };
});
const { judgeProficiencies } = await import("../src/lib/srd/legality/proficiencies.ts");
const trainingRuns = (await characterTrainingFixtures()).map(row => {
  const reported = [];
  const result = judgeProficiencies({ ...row.input, onProblem: detail => reported.push(detail) });
  return { name: row.name, reported, result };
});

const featRuns = await characterFeatRuns();
const spellRuns = await characterSpellRuns();
const gearRuns = await characterGearRuns();

await test("27 English refusals and reviewed upstream derived sheets remain identical", () => {
  assert.equal(runs.length, 27); assert.equal(goldens.fixtures.length, runs.length);
  for (const run of runs) {
    const before = goldens.fixtures.find(row => row.name === run.name); assert.ok(before, run.name);
    assert.deepEqual(run.result.problems, before.problems, run.name);
    assert.equal(hash(run.result.sheet), before.sheetSha256, run.name);
    assert.deepEqual(run.result.rolled ?? null, before.rolled, run.name);
    const plain = legalizeSheet(run.sheet, run.context);
    assert.deepEqual(plain, run.result, `collecting metadata changed ${run.name}`);
  }
});

await test("every core code is exercised by an actual validator outcome and renders without a missing argument", async () => {
  const seen = new Set();
  for (const run of [...runs, ...trainingRuns, ...featRuns, ...spellRuns, ...gearRuns]) for (const detail of run.reported) {
    assert.ok((run.problems ?? run.result.problems).includes(detail.english), `${run.name}: phantom diagnosis`);
    seen.add(detail.code);
    const text = characterRuleProblems({ problems: [detail.english], problemDetails: [detail] }, "zh-CN");
    assert.ok(text && !text.includes("规则说明（中文翻译待补）"), `${run.name}: unusable metadata ${detail.code}`);
    for (const match of CHARACTER_RULE_MESSAGES.en[detail.code].matchAll(/\{(\w+)\}/g)) assert.ok(Object.hasOwn(detail.args, match[1]), detail.code);
  }
  const {applyFeatGrants,featGrantSpec} = await import('../src/lib/srd/feat-grants.ts');
  const details = [];
  const verdict = applyFeatGrants({proficiencies:{skills:[],expertise:[],tools:[],weapons:[],armor:[],languages:[]},feats:[{name:'Authored training',desc:'',spec:{...featGrantSpec(''),skills:1,skillsFrom:['arcana']}}],choices:{'Authored training':{skills:['stealth']}},strict:true,onProblem:detail=>details.push(detail)});
  assert.equal(details.length,1);
  assert.match(characterRuleProblems({problems:verdict.problems,problemDetails:details},'zh-CN'), /隐匿.*奥秘/);
  details.forEach(detail=>seen.add(detail.code));
  assert.deepEqual([...seen].sort(), [...CHARACTER_RULE_CODES].sort());
});

await test("Chinese explanations retain rule limits, score order, alternatives and offending authored values", () => {
  const text = name => { const run = runs.find(row => row.name === name); return characterRuleProblems({ problems: run.result.problems, problemDetails: run.details }, "zh-CN"); };
  assert.match(text("two-unknown-choices"), /missing_custom_race.*种族|种族.*missing_custom_race/);
  assert.match(text("two-unknown-choices"), /missing_custom_background.*背景|背景.*missing_custom_background/);
  assert.ok(text("authored-choice-punctuation").includes("自定义{str}种族\n未安装"));
  assert.match(text("multiclass-prerequisites"), /力量 13或敏捷 13/); assert.match(text("multiclass-prerequisites"), /智力 13/);
  assert.match(text("hit-point-range"), /400/); assert.match(text("ability-cap"), /力量.*24.*20/);
  assert.match(text("ancestry-invalid"), /unknown_dragon/); assert.match(text("ancestry-missing"), /赤铜.*白龙/);
  assert.match(text("ability-method"), /15.*14.*13.*12.*10.*8.*27/);
  assert.equal(ruleValueText({ kind: "term", type: "equipment", value: "Longsword +1" }, "zh-CN"), "长剑 +1");
});

await test("the original mixed unknown spell/feat/skill refusal now reports every individual Chinese problem", () => {
  const run = runs.find(row => row.name === "unmigrated-spell-feat-skill");
  assert.ok(run.result.problems.length > 1); assert.ok(run.details.every(row => row.code !== "untranslated"));
  const text = characterRuleProblems({ problems: run.result.problems, problemDetails: run.details }, "zh-CN");
  assert.ok(!text.includes("中文翻译待补"));
  for (const name of ["unknown_spell", "unknown_feat", "unknown_skill"]) assert.ok(text.includes(name));
  assert.equal(characterRuleProblems({ problems: run.result.problems, problemDetails: run.details }, "en"), run.result.problems.join("\n"));
});

await test("malformed, missing, unrelated and helper-key metadata cannot erase or replace problems", () => {
  const original = "Original unknown problem.";
  const render = problemDetails => characterRuleProblems({ problems: [original, "Second problem."], problemDetails }, "zh-CN");
  for (const details of [null, {}, [null], [{ english: original, code: "ruleProblem.raceUnknown", args: {} }], [{ english: original, code: "ruleProblem.requirementAnd", args: {} }], [{ english: "a different source", code: "ruleProblem.classDuplicate", args: {} }], [{ english: original, code: "ruleProblem.raceUnknown", args: { race: { kind: "term", type: "unknown", value: "x" } } }]]) {
    const text = render(details); assert.ok(text.includes(original)); assert.ok(text.includes("Second problem."));
  }
  assert.equal(characterRuleProblems({ problems: "not an array" }, "zh-CN"), "");
  assert.equal(characterRuleProblems({ problems: [null, "", "  "] }, "zh-CN"), "");
});

await test("collector data cannot mutate shared class prerequisites or rule results", () => {
  const run = runs.find(row => row.name === "multiclass-prerequisites");
  const before = structuredClone(multiclassPrereq("fighter"));
  const result = legalizeSheet(run.sheet, { ...run.context, onProblem: detail => {
    if (detail.args.requirement?.kind === "abilityRequirement") detail.args.requirement.alternatives[0][0] = "cha";
  } });
  assert.deepEqual(multiclassPrereq("fighter"), before); assert.deepEqual(result, run.result);
});

await test("refusal transport is additive, retains status and English bytes, and follows original order", async () => {
  const list = []; const reported = []; const report = ruleReporter(list, detail => reported.push(detail));
  report("ruleProblem.classUnknown", { class: "custom" }, "First."); report("ruleProblem.raceUnknown", { race: "custom" }, "Second.");
  assert.deepEqual(completeRuleDetails(["Second.", "Unknown.", "First."], reported).map(row => row.english), ["Second.", "Unknown.", "First."]);
  const old = refusal(["First.", "Second."], 422); assert.equal(old.status, 422);
  assert.deepEqual(await old.json(), { error: "First.", problems: ["First.", "Second."] });
  const response = refusal(list, 400, completeRuleDetails(list, reported));
  const data = await response.json(); assert.equal(response.status, 400); assert.equal(data.error, "First."); assert.deepEqual(data.problems, list);
  assert.equal(characterErrorText({ data, fallback: "characterHost.saveError" }, "en"), "First.\nSecond.");
});

await test("the real library route returns both translated invalid choices without storing a character", async () => {
  world.signIn(world.owner); const route = await world.route("characters");
  const run = runs.find(row => row.name === "two-unknown-choices");
  const request = new Request("http://127.0.0.1/test", { method: "POST", body: JSON.stringify({ level: 1, role: "pc", sheet: run.sheet }) });
  const response = await route.POST(request); assert.equal(response.status, 400); const data = await response.json();
  assert.equal(data.error, data.problems[0]); assert.equal(data.problemDetails.length, data.problems.length);
  assert.deepEqual(data.problemDetails.map(row => row.code), ["ruleProblem.raceUnknown", "ruleProblem.backgroundUnknown"]);
  const chinese = characterErrorText({ data, fallback: "characterHost.saveError" }, "zh-CN");
  assert.match(chinese, /种族/); assert.match(chinese, /背景/); assert.ok(!chinese.includes("中文翻译待补"));
  assert.deepEqual((await (await route.GET(new Request("http://127.0.0.1/test"))).json()).characters, []);
});

await test("all eight admission response paths carry details and migrated emitters reject new bare English problems", () => {
  const routes = ["src/app/api/characters/route.ts", "src/app/api/characters/import/route.ts", "src/app/api/characters/[characterId]/route.ts", "src/app/api/campaigns/[campaignId]/sheet/route.ts", "src/app/api/campaigns/[campaignId]/sheet/pregen/route.ts", "src/app/api/campaigns/[campaignId]/companions/create/route.ts"];
  let calls = 0;
  for (const file of routes) {
    const source = fs.readFileSync(path.join(root, file), "utf8"); const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const walk = node => { if (ts.isCallExpression(node) && node.expression.getText(ast) === "refusal") { calls++; assert.equal(node.arguments.length, 3); const owner = node.arguments[0].getText(ast).split(".")[0]; assert.equal(node.arguments[2].getText(ast), `${owner}.problemDetails`); } ts.forEachChild(node, walk); }; walk(ast);
  }
  assert.equal(calls, 8);
  for (const file of ["src/lib/srd/sheet-legality.ts", "src/lib/srd/legality/abilities.ts"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8"); const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const walk = node => {
      if (ts.isCallExpression(node) && node.expression.getText(ast) === "problems.push") for (const arg of node.arguments) if (!ts.isSpreadElement(arg)) assert.equal(arg.getText(ast), "applied.error", `new uncoded problem in ${file}`);
      ts.forEachChild(node, walk);
    }; walk(ast);
  }
});
world.close(); finish();
