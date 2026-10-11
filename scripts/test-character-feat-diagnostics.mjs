import { readValidationJson } from "./lib/validation-json.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { LEGAL_FIGHTER } from "./lib/enforce-creation.mjs";
import { characterFeatFixtures, characterFeatRuns } from "./lib/character-feat-fixtures.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-character-feat-diagnostics");
const world = await openWorld({ status: "lobby" });
const root = path.resolve(import.meta.dirname, "..");
const { judgeFeats, judgeFeatures } = await import("../src/lib/srd/legality/features.ts");
const { applyHalfFeats } = await import("../src/lib/srd/legality/half-feats.ts");
const { applyFeatIncrease } = await import("../src/lib/srd/feat-effects.ts");
const { applyFeatGrants, featPicksOwed, featGrantSpec } = await import("../src/lib/srd/feat-grants.ts");
const { completeRuleDetails } = await import("../src/lib/characters/problems.ts");
const { characterRuleProblems, characterErrorText } = await import("../src/lib/i18n/character-presentations.ts");
const { featTermLabel } = await import("../src/lib/i18n/feat-presentations.ts");
const { CHARACTER_RULE_CODES } = await import("../src/lib/i18n/character-rule-messages.ts");
const { CHARACTER_FEAT_NAMES, CHARACTER_FEAT_NAME_MESSAGES } = await import("../src/lib/i18n/character-feat-name-messages.ts");
const goldens = readValidationJson(path.join(root, "docs/validation/character-feat-goldens.json"));
const rows = characterFeatFixtures(), runs = await characterFeatRuns();
const validate = {
  feats: row => judgeFeats(row.input), features: row => judgeFeatures(row.input),
  half: row => applyHalfFeats(row.abilities, row.picks), grants: row => applyFeatGrants(row.input),
};
const runOf = name => { const run = runs.find(row => row.name === name); assert.ok(run, name); return run; };
const chinese = name => { const run = runOf(name); return characterRuleProblems({ problems: run.problems, problemDetails: completeRuleDetails(run.problems, run.reported) }, "zh-CN"); };

await test("all 128 pre-migration feat, feature, half-feat and grant verdicts remain identical", () => {
  assert.equal(runs.length, 128);
  for (const run of runs) {
    const before = goldens[run.kind].find(row => row.name === run.name); assert.ok(before, run.name);
    assert.deepEqual(run.result, before.result, run.name);
    assert.deepEqual(validate[run.kind](run), run.result, `${run.name}: collector changed rules`);
    assert.deepEqual(run.reported.map(detail => detail.english), run.problems, `${run.name}: omitted/phantom detail`);
    assert.equal(characterRuleProblems({ problems: run.problems, problemDetails: run.reported }, "en"), run.problems.join("\n"));
  }
});

await test("all 19 new codes occur in actual refusals and stock explanations render in Chinese", () => {
  const seen = new Set();
  for (const run of runs) {
    for (const detail of run.reported) seen.add(detail.code);
    const text = chinese(run.name);
    if (!run.name.startsWith("pack-")) assert.ok(!text.includes("中文翻译待补"), run.name);
    assert.ok(!/\{(?:feat|choices|count|room|requirement|source|damage|weapon|armor|skill|language|tool)\}/.test(text.replaceAll("未知{feat}", "未知专长")), run.name);
  }
  assert.equal(seen.size, 19);
  assert.deepEqual([...seen].sort(), CHARACTER_RULE_CODES.filter(code => (code.startsWith("ruleProblem.feat") && !code.startsWith("ruleProblem.featSpell")) || code === "ruleProblem.featureUnearned").sort());
});

await test("compound prerequisites retain AND/OR, armor, casting, skills, levels and uncheckable source", () => {
  assert.match(chinese("stock-unmet-Ritual Caster"), /仪式施法者.*智力 13或感知 13/);
  assert.match(chinese("stock-unmet-Heavily Armored"), /重甲训练.*中甲.*熟练/);
  assert.match(chinese("stock-unmet-Elven Accuracy"), /精灵精准.*精灵或半精灵/);
  assert.match(chinese("stock-unmet-War Caster"), /战场施法者.*至少能施放/);
  assert.match(chinese("pack-unmet-5"), /生存.*且至少达到 8 级/);
  const mixed = chinese("pack-unmet-6");
  assert.match(mixed, /感知 13且前置条件（中文翻译待补）：the Ki class feature/);
  assert.match(chinese("pack-unmet-8"), /隐匿或生存/);
  assert.match(chinese("pack-unmet-9"), /载具/);
  assert.match(chinese("pack-unmet-10"), /军用武器/);
  assert.match(chinese("pack-unmet-11"), /简易远程武器/);
  assert.equal(chinese("pack-unspecified-5"), "");
  const reported = [];
  const input = runOf("pack-unmet-7").input;
  const result = judgeFeats({ ...input, featOf: () => ({ name: "云海专长", desc: "", prerequisite: "Strength or Dexterity 13 or higher and 8th level or higher" }), onProblem: detail => reported.push(detail) });
  assert.deepEqual(result.problems, ["云海专长 requires Strength or Dexterity 13 or higher and 8th level or higher, which this character does not have."]);
  assert.match(characterRuleProblems({ problems: result.problems, problemDetails: reported }, "zh-CN"), /（力量 13或敏捷 13）且至少达到 8 级/);
});

await test("half-feat refusals and granted training retain allowed choices and exact quotas", () => {
  assert.match(chinese("half-missing"), /顽强.*力量.*敏捷.*体质.*智力.*感知.*魅力/);
  assert.match(chinese("half-invalid"), /妖精触碰.*智力.*感知.*魅力/);
  assert.match(chinese("grant-combined-owed"), /3 项游戏内语言.*1 项技能熟练项.*1 项技能专精.*2 项武器熟练项.*1 项工具熟练项/);
  assert.match(chinese("grant-shared-owed"), /3 项技能熟练项或工具熟练项/);
  assert.match(chinese("grant-damage-outside"), /光耀.*元素专精.*强酸.*寒冷.*火焰.*闪电.*雷鸣/);
  assert.match(chinese("grant-language-duplicate"), /语言学家.*通用语/);
  assert.match(chinese("grant-expertise-missing-training"), /技能专家.*历史/);
  assert.match(chinese("grant-tools-outside"), /长笛.*铁匠工具/);
  assert.match(chinese("grant-tools-duplicate"), /盗贼工具/);
  assert.match(chinese("grant-weapons-outside"), /匕首.*长剑/);
  assert.match(chinese("grant-armor-outside"), /重甲.*盾牌/);
  assert.match(chinese("grant-armor-duplicate"), /轻甲/);
  assert.equal(chinese("grant-nonstrict"), "");
  assert.ok(chinese("feat-unknown").includes("未知{feat}\n自订专长"));
  assert.match(chinese("feature-story-unearned"), /故事特性.*主持游戏的人/);
});

await test("all 17 owed-pick helper results remain exact and emit only when owed", () => {
  assert.equal(goldens.owed.length, 17);
  for (const row of rows.grants) {
    const feat = row.input.feats[0], spec = featGrantSpec(feat.desc), picks = Object.values(row.input.choices)[0];
    const reported = [], before = goldens.owed.find(item => item.name === row.name);
    const result = featPicksOwed(feat.name, spec, picks, detail => reported.push(detail));
    assert.equal(result, before.result); assert.equal(featPicksOwed(feat.name, spec, picks), result);
    assert.deepEqual(reported.map(detail => detail.english), result ? [result] : []);
  }
});

await test("new metadata is isolated from shared rules and malformed structures retain full original text", () => {
  const row = rows.feats.find(row => row.name === "stock-unmet-Ritual Caster");
  const plain = judgeFeats(row.input);
  const result = judgeFeats({ ...row.input, onProblem: detail => { if (detail.args.requirement?.kind === "featPrerequisite") detail.args.requirement.parts.splice(0); } });
  assert.deepEqual(result, plain);
  const grants = rows.grants.find(row => row.name === "grant-shared-owed");
  const before = applyFeatGrants(grants.input);
  assert.deepEqual(applyFeatGrants({ ...grants.input, onProblem: detail => { if (detail.args.choices?.kind === "featPicks") detail.args.choices.picks[0].kinds.splice(0); } }), before);
  const original = "Full original refusal.";
  for (const requirement of [
    { kind: "featPrerequisite", parts: [null] }, { kind: "featPrerequisite", parts: [{ type: "abilities", abilities: ["unknown"], minimum: 13 }] },
    { kind: "featPrerequisite", parts: [{ type: "weapons", category: "unknown", form: null }] },
    { kind: "featPrerequisite", parts: [{ type: "level", minimum: Infinity }] },
  ]) {
    const text = characterRuleProblems({ problems: [original], problemDetails: [{ code: "ruleProblem.featPrerequisite", args: { feat: "x", requirement }, english: original }] }, "zh-CN");
    assert.ok(text.includes(original)); assert.ok(text.includes("中文翻译待补"));
  }
  for (const choices of [{ kind: "featPicks", picks: [{ count: 3, kinds: ["unknown"] }] }, { kind: "featPicks", picks: [{ count: -1, kinds: ["skills"] }] }]) assert.ok(characterRuleProblems({ problems: [original], problemDetails: [{ code: "ruleProblem.featPicksMissing", args: { feat: "x", choices }, english: original }] }, "zh-CN").includes(original));
  const direct = [];
  const half = runOf("half-missing"); assert.deepEqual(applyFeatIncrease(half.abilities, "Resilient", null, undefined, detail => direct.push(detail)), half.result);
  assert.equal(direct[0].code, "ruleProblem.featAbilityMissing");
});

await test("54 stock feat display names and reviewed translation fingerprints match source", () => {
  const stock = readValidationJson(path.join(root, "src/lib/srd/authored-feats.json")).feats;
  assert.deepEqual(CHARACTER_FEAT_NAMES.filter(row => row.type === "feat").map(row => row.name), stock.map(row => row.name));
  const review = readValidationJson(path.join(root, "docs/validation/character-feat-translations.json"));
  for (const [file, expected] of Object.entries(review.sources)) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), expected, file);
  assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, review.catalog))).digest("hex"), review.catalogSha256);
  assert.deepEqual(Object.keys(CHARACTER_FEAT_NAME_MESSAGES.en).sort(), Object.keys(CHARACTER_FEAT_NAME_MESSAGES["zh-CN"]).sort());
  for (const row of CHARACTER_FEAT_NAMES) { assert.equal(featTermLabel(row.type, row.name, "en"), row.name); assert.equal(featTermLabel(row.type, row.name, "zh-CN"), CHARACTER_FEAT_NAME_MESSAGES["zh-CN"][row.key]); }
  assert.equal(featTermLabel("feat", "自订{feat}\n云海恩赐", "zh-CN"), "自订{feat}\n云海恩赐");
});

await test("real library admission returns feat, half-feat, feature and grant diagnostics without writing", async () => {
  world.signIn(world.owner); const route = await world.route("characters");
  const cases = [
    { ...structuredClone(LEGAL_FIGHTER), feats: ["missing_feat"], features: [{ name: "云海恩赐", source: "story" }] },
    { ...structuredClone(LEGAL_FIGHTER), race: "variant_human", feats: ["Resilient"] },
    { ...structuredClone(LEGAL_FIGHTER), race: "variant_human", feats: ["Linguist"], featChoices: { Linguist: { languages: ["Common", "Elvish", "Giant"] } } },
  ];
  const seen = new Set();
  for (const sheet of cases) {
    const response = await route.POST(new Request("http://127.0.0.1/test", { method: "POST", body: JSON.stringify({ level: 1, role: "pc", sheet }) }));
    assert.equal(response.status, 400); const data = await response.json();
    assert.equal(data.error, data.problems[0]); assert.deepEqual(data.problemDetails.map(row => row.english), data.problems);
    const text = characterErrorText({ data, fallback: "characterHost.saveError" }, "zh-CN");
    assert.ok(!text.includes("中文翻译待补"), text);
    data.problemDetails.forEach(row => seen.add(row.code));
  }
  for (const code of ["featNoImprovement", "featUnknown", "featureUnearned", "featAbilityMissing", "featLanguageDuplicate"]) assert.ok(seen.has(`ruleProblem.${code}`), code);
  assert.deepEqual((await (await route.GET(new Request("http://127.0.0.1/test"))).json()).characters, []);
});

await test("migrated feat validators reject bare English emitters and every admission branch collects", () => {
  for (const file of ["src/lib/srd/legality/features.ts", "src/lib/srd/feat-grants.ts"]) {
    const ast = ts.createSourceFile(file, fs.readFileSync(path.join(root, file), "utf8"), ts.ScriptTarget.Latest, true);
    const walk = node => { if (ts.isCallExpression(node) && node.expression.getText(ast) === "problems.push") assert.equal(node.arguments[0].getText(ast), "owed", file); ts.forEachChild(node, walk); }; walk(ast);
  }
  const sheet = fs.readFileSync(path.join(root, "src/lib/srd/sheet-legality.ts"), "utf8");
  assert.match(sheet, /judgeFeats\(\{\s*onProblem: context.onProblem/);
  assert.match(sheet, /judgeFeatures\(\{\s*onProblem: context.onProblem/);
  assert.match(sheet, /applyHalfFeats\(abilities, halfFeats, context.onProblem\)/);
  assert.match(sheet, /applyFeatGrants\(\{\s*onProblem: policy.judgesPicks \? context.onProblem : undefined/);
});

world.close(); finish();
