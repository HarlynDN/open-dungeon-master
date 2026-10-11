import { readValidationJson } from "./lib/validation-json.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { LEGAL_FIGHTER } from "./lib/enforce-creation.mjs";
import { characterTrainingFixtures } from "./lib/character-training-fixtures.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-character-training-diagnostics");
const world = await openWorld({ status: "lobby" });
const root = path.resolve(import.meta.dirname, "..");
const { judgeProficiencies } = await import("../src/lib/srd/legality/proficiencies.ts");
const { toolChoiceOf, toolPickProblem, toolPicksOwed, ARTISANS_TOOLS, MUSICAL_INSTRUMENTS, GAMING_SETS } = await import("../src/lib/srd/tool-choices.ts");
const { completeRuleDetails } = await import("../src/lib/characters/problems.ts");
const { characterRuleProblems, characterErrorText } = await import("../src/lib/i18n/character-presentations.ts");
const { trainingLabel } = await import("../src/lib/i18n/training-presentations.ts");
const { CHARACTER_RULE_CODES } = await import("../src/lib/i18n/character-rule-messages.ts");
const { CHARACTER_TRAINING_NAMES, CHARACTER_TRAINING_NAME_MESSAGES } = await import("../src/lib/i18n/character-training-name-messages.ts");
const { SRD_CLASSES, SRD_RACES, SRD_BACKGROUNDS } = await import("../src/lib/srd/index.ts");
const { STANDARD_LANGUAGES } = await import("../src/lib/content/mechanics.ts");
const before = readValidationJson(path.join(root, "docs/validation/character-training-goldens.json"));
const rows = await characterTrainingFixtures();
const runs = rows.map(row => {
  const reported = [];
  const result = judgeProficiencies({ ...row.input, onProblem: detail => reported.push(detail) });
  return { ...row, result, reported, details: completeRuleDetails(result.problems, reported) };
});
const chinese = name => { const run = runs.find(row => row.name === name); assert.ok(run); return characterRuleProblems({ problems: run.result.problems, problemDetails: run.details }, "zh-CN"); };

await test("all 33 original training verdicts and derived proficiencies remain byte-equivalent", () => {
  assert.equal(runs.length, 33); assert.equal(before.fixtures.length, runs.length);
  for (const run of runs) {
    assert.deepEqual(run.result, before.fixtures.find(row => row.name === run.name)?.result, run.name);
    assert.deepEqual(judgeProficiencies(run.input), run.result, `collector changed ${run.name}`);
  }
});

await test("all 16 tool-helper choices, refusals and remaining-pick sentences retain their original results", () => {
  assert.equal(before.tools.length, 16);
  for (const row of before.tools) {
    const choice = toolChoiceOf(row.entry); assert.deepEqual(choice, row.choice);
    for (const [helper, expected] of [[toolPickProblem, row.problem], [toolPicksOwed, row.owed]]) {
      const reported = []; assert.equal(helper([choice], row.picks, detail => reported.push(detail)), expected);
      assert.equal(helper([choice], row.picks), expected);
      assert.deepEqual(reported.map(detail => detail.english), expected ? [expected] : []);
    }
  }
});

await test("every training diagnosis is exercised and no suppressed duplicate produces a phantom detail", () => {
  const seen = new Set();
  for (const run of runs) {
    assert.deepEqual(run.reported.map(detail => detail.english), run.result.problems, run.name);
    assert.ok(run.details.every(detail => detail.code !== "untranslated"), run.name);
    for (const detail of run.details) seen.add(detail.code);
    const text = chinese(run.name); assert.ok(!text.includes("中文翻译待补"), run.name);
    assert.equal(characterRuleProblems({ problems: run.result.problems, problemDetails: run.details }, "en"), run.result.problems.join("\n"));
  }
  assert.deepEqual([...seen].sort(), CHARACTER_RULE_CODES.filter(code => code.startsWith("ruleProblem.training")).sort());
  const partial = runs.find(row => row.name === "tools-partial-bard");
  assert.equal(partial.result.problems.length, 1); assert.equal(partial.reported.length, 1);
});

await test("skill failures retain restricted lists, fixed grants, repeated grants and all multiclass sources", () => {
  assert.match(chinese("skills-outside-list"), /奥秘.*战士.*2.*运动.*察觉/);
  assert.match(chinese("skills-fixed-grants"), /固定授予.*运动.*威吓/);
  assert.match(chinese("skills-pack-background"), /钟楼学者.*1.*历史.*洞悉/);
  assert.match(chinese("skills-any-and-repeated"), /任意技能/); assert.match(chinese("skills-any-and-repeated"), /重复授予.*1/);
  assert.match(chinese("skills-no-slots"), /战士.*0.*历史/);
  assert.match(chinese("skills-no-class"), /没有自选技能名额/);
  assert.match(chinese("skills-secondary-class"), /游荡者.*1/);
  assert.match(chinese("unknown-skill"), /authored_skill.*18/);
  assert.equal(chinese("skills-held-edit"), "");
});

await test("tool failures retain categories, precise owed counts and named pack alternatives", () => {
  assert.match(chinese("racial-tool-offered"), /长笛.*铁匠工具.*酿造工具.*石匠工具/);
  assert.ok(chinese("racial-tool-no-choice").includes("custom{kit}\n名称"));
  assert.match(chinese("racial-tool-no-choice"), /不授予自选/);
  assert.match(chinese("tools-missing-bard"), /3 项乐器.*风笛.*鼓.*长笛/);
  assert.match(chinese("tools-partial-bard"), /2 项乐器/);
  assert.match(chinese("tools-monk-alternatives"), /工匠工具或乐器/);
  assert.match(chinese("tools-gaming-and-instrument"), /1 项游戏器具.*1 项乐器/);
  assert.match(chinese("tools-named-pack"), /盗贼工具.*伪造工具.*易容工具/);
  assert.equal(chinese("tools-valid-bard"), ""); assert.equal(chinese("tools-held-answer"), ""); assert.equal(chinese("tools-legacy-wording"), "");
});

await test("expertise and fictional-language failures preserve all limits and authored names", () => {
  assert.match(chinese("expertise-not-trained"), /专精.*奥秘/);
  assert.match(chinese("expertise-too-many"), /2 项专精.*3 项/);
  assert.match(chinese("expertise-no-grant"), /游荡者.*1.*6.*吟游诗人.*3.*10/);
  assert.match(chinese("expertise-fighter-tools"), /盗贼工具/);
  assert.equal(chinese("expertise-rogue-tools"), ""); assert.equal(chinese("expertise-held-edit"), "");
  assert.match(chinese("language-with-background"), /人类.*士兵.*1.*2.*精灵语.*矮人语/);
  assert.match(chinese("language-authored-and-secret"), /0.*3.*德鲁伊语.*盗贼暗语.*云海语/);
  assert.equal(chinese("language-held-edit"), "");
});

await test("stock training names match current source inventories and reviewed translation fingerprints", () => {
  const tools = new Set([...ARTISANS_TOOLS, ...MUSICAL_INSTRUMENTS, ...GAMING_SETS]);
  for (const row of [...SRD_CLASSES, ...SRD_RACES, ...SRD_BACKGROUNDS]) {
    for (const value of row.tools ?? []) if (!toolChoiceOf(value)) tools.add(value);
    for (const value of row.toolChoice?.from ?? []) tools.add(value);
  }
  const languages = new Set([...STANDARD_LANGUAGES, ...SRD_CLASSES.flatMap(row => row.languages ?? [])]);
  const source = fs.readFileSync(path.join(root, "src/lib/srd/tool-choices.ts"), "utf8");
  const ast = ts.createSourceFile("tool-choices.ts", source, ts.ScriptTarget.Latest, true);
  let categories;
  const walk = node => { if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "kinds") categories = node.initializer.elements.map(entry => entry.elements[2].text); ts.forEachChild(node, walk); }; walk(ast);
  assert.ok(categories?.length);
  const categoryNames = new Set(["tool"]);
  for (let mask = 1; mask < 2 ** categories.length; mask++) categoryNames.add(categories.filter((_, index) => mask & (1 << index)).join(" or "));
  for (const [kind, names] of [["tool", tools], ["language", languages], ["toolCategory", categoryNames]]) assert.deepEqual(CHARACTER_TRAINING_NAMES.filter(row => row.type === kind).map(row => row.name).sort(), [...names].sort(), kind);
  for (const row of CHARACTER_TRAINING_NAMES) {
    assert.equal(CHARACTER_TRAINING_NAME_MESSAGES.en[row.key], row.name);
    assert.match(trainingLabel(row.type, row.name, "zh-CN"), /\p{Script=Han}/u);
    assert.equal(trainingLabel(row.type, row.name, "en"), row.name);
  }
  const record = readValidationJson(path.join(root, "docs/validation/character-training-translations.json"));
  assert.equal(record.status, "source-compared-by-implementation-agent");
  for (const [file, expected] of Object.entries(record.sourceSha256)) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), expected, file);
  assert.equal(record.catalogSha256, createHash("sha256").update(fs.readFileSync(path.join(root, "src/lib/i18n/character-training-name-messages.ts"))).digest("hex"));
});

await test("unknown authored names and canonical sheet values are never translated in place", () => {
  for (const kind of ["tool", "language", "toolCategory"]) for (const value of ["云海语", "Clock Kit", "unregistered_category", "custom{kit}\n名称"]) assert.equal(trainingLabel(kind, value, "zh-CN"), value);
  assert.equal(trainingLabel("tool", "Thieves’ Tools", "zh-CN"), "盗贼工具");
  const originals = rows.map(row => structuredClone({ ...row.input, classOf: undefined }));
  rows.forEach(row => judgeProficiencies({ ...row.input, onProblem: () => {} }));
  assert.deepEqual(rows.map(row => ({ ...row.input, classOf: undefined })), originals);
});

await test("malformed rich choices cannot throw, erase problems or replace them with helper text", () => {
  const source = "Original training problem.";
  const badOffers = [null, {}, { kind: "skillOffers", offers: [null], fixed: [] }, { kind: "skillOffers", offers: [{ source: null, count: 1, from: null }], fixed: [] }, { kind: "skillOffers", offers: [{ source: "repeated", count: -1, from: null }], fixed: [] }, { kind: "toolOffers", offers: [{ count: 1, label: "tool", from: [null] }] }, { kind: "toolOffers", offers: new Array(21).fill({ count: 1, label: "tool", from: [] }) }];
  for (const offers of badOffers) {
    const detail = { code: "ruleProblem.trainingSkillsOffered", english: source, args: { choices: [], offers } };
    const text = characterRuleProblems({ problems: [source], problemDetails: [detail] }, "zh-CN");
    assert.ok(text.includes(source)); assert.ok(text.includes("中文翻译待补"));
  }
  for (const code of ["ruleDetail.skillOffer", "ruleDetail.toolOffer", "ruleDetail.requirementAnd"]) assert.ok(characterRuleProblems({ problems: [source], problemDetails: [{ code, english: source, args: {} }] }, "zh-CN").includes(source));
});

await test("collector mutation cannot alter tool offers, original inputs or the derived verdict", () => {
  const run = runs.find(row => row.name === "tools-monk-alternatives");
  const result = judgeProficiencies({ ...run.input, onProblem: detail => { if (detail.args.offers?.kind === "toolOffers") detail.args.offers.offers[0].from[0] = "mutated"; } });
  assert.deepEqual(result, run.result);
  const choices = [toolChoiceOf("one gaming set")]; const original = structuredClone(choices);
  toolPickProblem(choices, ["flute"], detail => { detail.args.offers.offers[0].from.length = 0; });
  assert.deepEqual(choices, original); assert.ok(GAMING_SETS.includes("dice set"));
});

await test("the real library admission route returns all coded training failures and writes no character", async () => {
  world.signIn(world.owner); const route = await world.route("characters");
  const sheet = { ...LEGAL_FIGHTER, proficiencies: { ...LEGAL_FIGHTER.proficiencies, skills: ["arcana", "authored_skill"], expertise: ["athletics"], languages: ["Common", "Elvish", "Dwarvish"], tools: ["flute", "vehicles (land)"] } };
  const response = await route.POST(new Request("http://127.0.0.1/test", { method: "POST", body: JSON.stringify({ level: 1, role: "pc", sheet }) }));
  assert.equal(response.status, 400); const data = await response.json();
  assert.ok(data.problems.length >= 5); assert.equal(data.problemDetails.length, data.problems.length);
  assert.ok(data.problemDetails.every(detail => detail.code.startsWith("ruleProblem.training")), JSON.stringify(data.problemDetails));
  assert.equal(characterErrorText({ data, fallback: "characterHost.saveError" }, "en"), data.problems.join("\n"));
  const text = characterErrorText({ data, fallback: "characterHost.saveError" }, "zh-CN");
  assert.match(text, /长笛/); assert.match(text, /奥秘/); assert.match(text, /authored_skill/); assert.match(text, /专精/); assert.match(text, /游戏内语言/); assert.ok(!text.includes("中文翻译待补"));
  assert.deepEqual((await (await route.GET(new Request("http://127.0.0.1/test"))).json()).characters, []);
});

await test("all proficiency scalar emitters are coded or explicitly supplied by coded tool helpers", () => {
  const file = "src/lib/srd/legality/proficiencies.ts";
  const source = fs.readFileSync(path.join(root, file), "utf8"); const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const walk = node => { if (ts.isCallExpression(node) && node.expression.getText(ast) === "problems.push") for (const arg of node.arguments) assert.ok(["problem", "owed"].includes(arg.getText(ast)), "uncoded scalar refusal: " + arg.getText(ast)); ts.forEachChild(node, walk); }; walk(ast);
  assert.match(source, /toolPickProblem\(granted\.choices, toolPicks, input\.onProblem\)/);
  assert.match(source, /if \(owedDetail\) input\.onProblem\?\.\(owedDetail\)/);
  const sheet = fs.readFileSync(path.join(root, "src/lib/srd/sheet-legality.ts"), "utf8");
  assert.match(sheet, /judgeProficiencies\(\{\s*onProblem: policy\.judgesPicks \? context\.onProblem : undefined/);
});
world.close(); finish();
