import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import "./lib/enforce-world.mjs";
import { characterBuilderUiFixtures, builderUiSnapshot } from "./lib/character-builder-ui-fixtures.mjs";
import { characterPickerUiFixtures } from "./lib/character-picker-ui-fixtures.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-chinese-builder-feedback");
const root = path.resolve(import.meta.dirname, "..");
const { builderFeedbackText, builderDroppedText, builderToolChoicesText } = await import("../src/lib/i18n/builder-presentations.ts");
const { builderOptionName } = await import("../src/lib/i18n/builder-picker-presentations.ts");
const { builderTermLabel } = await import("../src/lib/i18n/builder-name-presentations.ts");
const { BUILDER_GATE_CODES, BUILDER_TERMS } = await import("../src/lib/i18n/builder-messages.ts");
const { builderGate, builderRules } = await import("../src/lib/characters/builder-feedback.ts");
const { reconcilePicks } = await import("../src/app/characters/builder/reconcile.ts");
const { featOwed, featGrantSpec } = await import("../src/lib/srd/feat-grants.ts");
const rows = await characterBuilderUiFixtures();
const before = readValidationJson(path.join(root, "docs/validation/character-builder-ui-goldens.json"));
const rowOf = name => { const row = rows.find(row => row.name === name); assert.ok(row, name); return row; };
const viewOf = name => { const row = rowOf(name); return row.section === "all" ? row.validation : row.gates[row.section]; };
const text = name => builderFeedbackText(viewOf(name), "zh-CN");

await test("45 frozen gate/validation results retain English, target routing, canonical sheets and every purse amount", () => {
  assert.equal(rows.length, 45);
  assert.deepEqual(rows.map(builderUiSnapshot), before.fixtures);
  assert.equal(rowOf("valid-fighter").validation, null); assert.equal(rowOf("valid-wizard").validation, null);
  for (const row of rows) for (const view of [...Object.values(row.gates), row.validation]) if (view) assert.equal(builderFeedbackText(view, "en"), view.message);
});

await test("all 32 builder gate codes are emitted by real functions and translated without missing arguments", () => {
  const seen = new Set();
  for (const row of rows) for (const view of [...Object.values(row.gates), row.validation]) if (view) {
    const translated = builderFeedbackText(view, "zh-CN");
    assert.match(translated, /\p{Script=Han}/u); assert.ok(!translated.includes("中文翻译待补"), `${row.name}: ${translated}`);
    if (view.presentation.kind === "gate") seen.add(view.presentation.code);
  }
  assert.equal(seen.size, 32); assert.deepEqual([...seen].sort(), [...BUILDER_GATE_CODES].sort());
});

await test("Chinese gates retain choice types, quotas, method bounds, spell filing and authored names", () => {
  assert.ok(text("identity-background-skill").includes("云海{background}\n旅人"));
  assert.match(text("ancestry-language"), /1 门语言/); assert.match(text("ancestry-feat-picks"), /语言学家.*3.*语言/);
  assert.match(text("calling-tools"), /3.*乐器/); assert.match(text("calling-subclass"), /战士.*3 级/);
  assert.match(text("calling-expertise"), /2.*专精技能/); assert.match(text("calling-option"), /2.*魔能祈唤/);
  assert.ok(text("calling-option-authored").includes("Cloud rites"));
  assert.match(text("abilities-standard"), /15, 14, 13, 12, 10, 8/); assert.match(text("abilities-point-range"), /8.*15.*16/);
  assert.match(text("abilities-point-budget"), /27 点预算.*27 点/); assert.match(text("abilities-asi"), /4 级.*属性值提升/);
  assert.match(text("spells-book-more"), /6 个法术.*法术书/); assert.match(text("spells-book-prepare"), /法术书.*4 个法术/);
  assert.match(text("spells-known-more"), /2.*已知法术/); assert.match(text("spells-prepared-more"), /4.*准备法术/);
  assert.match(text("spells-too-many"), /移除 1.*上限为 4/);
  assert.ok(text("spell-warning-authored").includes("自订{name}\n林河")); assert.ok(text("spell-warning-authored").includes("Cloud rites"));
  assert.match(text("spell-warning"), /无法施法.*再次点击提交/);
});

await test("the actual derived purse carries each kit/budget diagnosis, preserving first and remaining count", () => {
  for (const name of ["gear-magic", "gear-multiple", "gear-budget", "gear-kit-option", "gear-kit-slot"]) {
    const purse = rowOf(name).input.derived.purse;
    assert.deepEqual(purse.problemDetails.map(detail => detail.english), purse.problems);
    assert.ok(purse.problemDetails.every(detail => detail.code !== "untranslated"));
  }
  assert.match(text("gear-magic"), /长剑 \+1.*魔法物品/);
  assert.match(text("gear-multiple"), /还列出了 1 条问题/); assert.match(text("gear-budget"), /60 金币.*10 金币.*50 金币/);
  assert.match(text("gear-kit-option"), /链甲.*皮甲.*长弓.*20支箭矢/); assert.match(text("gear-kit-slot"), /短弓.*军用武器/);
  const original = "Authored first\nproblem.";
  const view = { message: original, presentation: builderRules([original], [], 0) };
  assert.ok(builderFeedbackText(view, "zh-CN").includes(original), "multiline first problem cannot be truncated");
});

await test("featOwed forwards only the selected training or spell diagnosis and retains the original result", () => {
  for (const [feat, desc] of [["Cloud feat", "You learn three languages of your choice."], ["Cloud spell", "You learn two cantrips of your choice from the wizard spell list."]]) {
    const spec = featGrantSpec(desc), reported = [];
    const result = featOwed(feat, spec, {}, detail => reported.push(detail));
    assert.ok(result); assert.equal(featOwed(feat, spec, {}), result);
    assert.deepEqual(reported.map(detail => detail.english), [result]);
    assert.ok(!builderFeedbackText({ message: result, presentation: builderRules([result], reported) }, "zh-CN").includes("中文翻译待补"));
  }
  const reported = []; const spec = featGrantSpec("You learn three languages of your choice.");
  assert.equal(featOwed("Cloud feat", spec, { languages: ["Common", "Dwarvish", "Elvish"] }, detail => reported.push(detail)), null);
  assert.deepEqual(reported, []);
});

await test("the actual reconciliation drops retain canonical values while fourteen kinds and change reasons localize", () => {
  const { drops } = reconcilePicks({ chosenSkills: ["perception"], racialSkills: ["insight"], racialAsi: ["str"], racialCantrip: "Light", racialTool: "smith's tools", backgroundSkills: ["history"], bonusLanguages: ["Dwarvish"], subclass: "Champion", expertisePicks: ["perception"], stylePicks: ["archery"], optionPicks: ["Invocation: Agonizing Blast"], spells: ["Magic Missile"], bookPrepared: ["Magic Missile"], cantrips: ["Fire Bolt"] }, { level: 1 });
  assert.equal(new Set(drops.map(drop => drop.label)).size, 14);
  const snapshot = structuredClone(drops);
  for (const because of ["race", "class", "background", "subclass", "level", "stored character", "content pack"]) {
    const translated = builderDroppedText({ because, drops }, "种族", "zh-CN");
    assert.match(translated, /已被移除|不再符合当前条件/); assert.match(translated, /察觉/); assert.match(translated, /矮人语/); assert.match(translated, /箭术/); assert.match(translated, /光亮术/); assert.match(translated, /力量/); assert.match(translated, /若仍有待选项.*种族/);
  }
  assert.deepEqual(drops, snapshot);
  const languages = [{ label: "bonus language", value: "Dwarvish", target: "languages" }, { label: "bonus language", value: "Giant", target: "languages" }];
  assert.equal(builderDroppedText({ because: "race", drops: languages }, "Ancestry", "en"), "Changing the race set aside bonus language Dwarvish and bonus language Giant: they no longer fit. Anything still owed is asked for on the Ancestry step.");
  assert.equal(builderDroppedText({ because: "stored character", drops: languages.slice(0, 1) }, undefined, "en"), "A stored pick is no longer on offer: bonus language Dwarvish.");
  const authored = "云海{language}\n方言";
  assert.ok(builderDroppedText({ because: "race", drops: [{ ...languages[0], value: authored }] }, undefined, "zh-CN").includes(authored));
});

await test("bad metadata preserves complete original instructions and copied display args cannot change shared sources", () => {
  const source = "Full original\ninstruction.";
  for (const presentation of [undefined, null, { kind: "gate", code: "unknown", args: {} }, { kind: "gate", code: "builderGate.languages", args: {} }, { kind: "gate", code: "builderGate.languages", args: { count: Infinity } }, { kind: "rules", problems: [], more: 0 }, { kind: "rules", problems: [source], more: NaN }]) assert.ok(builderFeedbackText({ message: source, presentation }, "zh-CN").includes(source));
  const args = { names: ["Common", "Dwarvish"] }; const view = builderGate("builderGate.languages", args); view.args.names.splice(0);
  assert.deepEqual(args.names, ["Common", "Dwarvish"]);
  const gear = rowOf("gear-multiple").input.derived.purse;
  const copied = builderRules(gear.problems, gear.problemDetails); copied.problems.splice(0); copied.problemDetails.splice(0);
  assert.ok(gear.problems.length && gear.problemDetails.length);
});

await test("stock option/style and all 28 bundled casting labels are displayed through a source-reviewed catalog", () => {
  const review = readValidationJson(path.join(root, "docs/validation/character-builder-feedback-translations.json"));
  for (const [file, hash] of Object.entries(review.sources)) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), hash, file);
  assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, review.catalog))).digest("hex"), review.catalogSha256);
  const casting = new Set();
  const walk = value => { if (Array.isArray(value)) value.forEach(walk); else if (value && typeof value === "object") { if (value.castingLabel) casting.add(value.castingLabel); Object.values(value).forEach(walk); } };
  for (const dir of ["src/lib/classes", "src/lib/worlds/bundled"]) for (const file of fs.readdirSync(path.join(root, dir)).filter(file => file.endsWith(".json"))) walk(readValidationJson(path.join(root, dir, file)));
  assert.equal(casting.size, 28);
  for (const term of BUILDER_TERMS) { assert.equal(builderTermLabel(term.kind, term.name, "en"), term.name); assert.match(builderTermLabel(term.kind, term.name, "zh-CN"), /\p{Script=Han}/u); }
  for (const name of casting) assert.ok(BUILDER_TERMS.some(term => term.kind === "castingKind" && term.name === name), name);
  assert.equal(builderTermLabel("castingKind", "Cloud rites", "zh-CN"), "Cloud rites");
});

await test("every gate carries display data, local errors stay coded, and focus uses a language-independent info marker", () => {
  const submit = fs.readFileSync(path.join(root, "src/app/characters/builder/submit.ts"), "utf8");
  const ast = ts.createSourceFile("submit.ts", submit, ts.ScriptTarget.Latest, true);
  let calls = 0; const walk = node => { if (ts.isCallExpression(node) && node.expression.getText(ast) === "block") { calls++; assert.equal(node.arguments.length, 3); } ts.forEachChild(node, walk); }; walk(ast); assert.ok(calls >= 30);
  const shell = fs.readFileSync(path.join(root, "src/app/characters/builder/CharacterBuilder.tsx"), "utf8");
  assert.match(shell, /state\.setLocalError\(problem\)/); assert.match(shell, /builderFeedbackText\(state\.localError, locale\)/);
  assert.match(shell, /button:not\(\.creator-help\):not\(\[data-info-trigger\]\)/); assert.doesNotMatch(shell, /aria-label\^=/);
  assert.match(fs.readFileSync(path.join(root, "src/components/ui/InfoDialog.tsx"), "utf8"), /data-info-trigger/);
  for (const file of ["src/lib/characters/builder-feedback.ts", "src/app/characters/builder/submit.ts"]) {
    const source = ts.createSourceFile(file, fs.readFileSync(path.join(root, file), "utf8"), ts.ScriptTarget.Latest, true);
    for (const node of source.statements) if (ts.isImportDeclaration(node) && /i18n/.test(node.moduleSpecifier.text)) assert.ok(node.importClause?.isTypeOnly);
  }
});
await test("13 frozen picker outputs retain complete English and locale changes preserve every ID, source reference, order and unlock", async () => {
  const frozen = readValidationJson(path.join(root, "docs/validation/character-picker-ui-goldens.json"));
  const english = await characterPickerUiFixtures("en"), chinese = await characterPickerUiFixtures("zh-CN");
  assert.equal(english.length, 13);
  assert.deepEqual(JSON.parse(JSON.stringify(english.map(({ name, output }) => ({ name, output })))), frozen.fixtures);
  const mechanics = output => Object.fromEntries(Object.entries(output).filter(([key]) => key !== "alignmentInfo").map(([key, value]) => [key,
    key.endsWith("Groups") ? value.map(group => ({ recommended: group.recommended, options: group.options.map(({ id, source, reference }) => ({ id, source, reference })) })) : value]));
  for (let index = 0; index < english.length; index++) {
    assert.deepEqual(mechanics(chinese[index].output), mechanics(english[index].output), english[index].name);
    assert.match(chinese[index].output.alignmentInfo, /阵营.*规则/);
    for (const group of chinese[index].output.alignmentGroups) for (const option of group.options) {
      assert.match(option.name, /善良|中立|邪恶/); assert.match(option.infoText, /\p{Script=Han}/u);
    }
    // Native lineage summaries now have their own reviewed display corpus.
    // Native class/subclass help now has its own frozen projections and
    // source-compared tests in test-chinese-calling-material.mjs. Background
    // help still retains the complete source pending migration.
    for (const kind of ["backgroundGroups"]) assert.deepEqual(chinese[index].output[kind].flatMap(group => group.options.map(option => option.infoText)), english[index].output[kind].flatMap(group => group.options.map(option => option.infoText)));
  }
  const reskin = chinese.find(row => row.name === "pack-reskin").output;
  for (const [kind, id, name] of [["raceGroups", "human", "云海{race}\nCitizen"], ["classGroups", "fighter", "云海{class}\nKeeper"], ["backgroundGroups", "soldier", "云海{background}\nSoldier"]]) assert.equal(reskin[kind].flatMap(group => group.options).find(option => option.id === id).name, name);
  const core = chinese.find(row => row.name === "core-unlocked").output;
  assert.equal(core.classGroups.flatMap(group => group.options).find(option => option.id === "fighter").name, "战士");
  assert.equal(core.subclassGroups.flatMap(group => group.options).find(option => option.id === "Champion").name, "勇士");
  assert.equal(builderOptionName("class", { id: "fighter", name: "Fighter", documentSlug: "external-book" }, "zh-CN"), "Fighter");
  assert.equal(builderOptionName("class", { id: "fighter", name: "Authored {name}\nKeeper" }, "zh-CN"), "Authored {name}\nKeeper");
});

await test("identity tool counts preserve original English grammar, actual choices and authored categories", async () => {
  const { splitToolGrants } = await import("../src/lib/srd/tool-choices.ts");
  const { openBuilder } = await import("./lib/enforce-builder.mjs");
  const builder = await openBuilder();
  let checked = 0;
  for (const background of builder.backgrounds) {
    const choices = splitToolGrants(background.tools).choices, snapshot = structuredClone(choices);
    const words = { 1: "one", 2: "two", 3: "three" };
    const old = choices.map(choice => `${words[choice.count] ?? choice.count} ${choice.label}${choice.count === 1 || choice.label.endsWith("s") ? "" : "s"}`).join(" and ");
    assert.equal(builderToolChoicesText(choices, "en"), old);
    if (choices.length) { checked++; assert.match(builderToolChoicesText(choices, "zh-CN"), /种/); }
    assert.deepEqual(choices, snapshot);
  }
  assert.ok(checked);
  const custom = [{ count: 3, label: "Authored {tools}\nWorkbench", from: ["Cloud tool"] }];
  assert.ok(builderToolChoicesText(custom, "zh-CN").includes(custom[0].label));
  const identity = fs.readFileSync(path.join(root, "src/app/characters/builder/steps/IdentityStep.tsx"), "utf8");
  assert.match(identity, /const GENDERS = \["Female", "Male", "Nonbinary"\]/);
  assert.match(identity, /GENDERS\.map\(\(value\) => \(\{ value, label:/); assert.match(identity, /value: "pc"/); assert.match(identity, /value: "companion"/);
  const review = readValidationJson(path.join(root, "docs/validation/character-builder-identity-translations.json"));
  for (const [file, hash] of Object.entries({ ...review.sources, ...review.catalogs })) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), hash, file);
});
finish();
