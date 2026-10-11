import { readValidationJson } from "./lib/validation-json.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { LEGAL_FIGHTER, LEGAL_WIZARD } from "./lib/enforce-creation.mjs";
import { characterSpellFixtures, characterSpellRuns } from "./lib/character-spell-fixtures.mjs";
import { characterGearFixtures, characterGearRuns } from "./lib/character-gear-fixtures.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-character-spell-gear-diagnostics");
const world = await openWorld({ status: "lobby" });
const root = path.resolve(import.meta.dirname, "..");
const { judgeSpellcasting } = await import("../src/lib/srd/legality/spells.ts");
const { featSpellGrants, featSpellSpec, featSpellsOwed } = await import("../src/lib/srd/feat-spells.ts");
const { spellListProblems } = await import("../src/lib/srd/spell-prep.ts");
const { thirdCasterSchoolProblem } = await import("../src/lib/srd/third-caster.ts");
const { resolveKit, startingKitFor } = await import("../src/lib/srd/starting-kit.ts");
const { expandBackgroundGear } = await import("../src/lib/srd/gear-choices.ts");
const { judgeStartingGear } = await import("../src/lib/srd/starting-wealth.ts");
const { completeRuleDetails } = await import("../src/lib/characters/problems.ts");
const { characterRuleProblems, characterErrorText } = await import("../src/lib/i18n/character-presentations.ts");
const { spellGearTermLabel } = await import("../src/lib/i18n/spell-gear-presentations.ts");
const { CHARACTER_RULE_CODES } = await import("../src/lib/i18n/character-rule-messages.ts");
const { CHARACTER_SPELL_GEAR_NAMES, CHARACTER_SPELL_GEAR_NAME_MESSAGES } = await import("../src/lib/i18n/character-spell-gear-name-messages.ts");
const { CLASS_KITS } = await import("../src/lib/srd/starting-kit-data.ts");
const { GENRE_KITS } = await import("../src/lib/srd/genre-kits.ts");
const beforeSpell = readValidationJson(path.join(root, "docs/validation/character-spell-goldens.json"));
const beforeGear = readValidationJson(path.join(root, "docs/validation/character-gear-goldens.json"));
const spells = await characterSpellFixtures(), gear = await characterGearFixtures();
const runs = [...await characterSpellRuns(), ...await characterGearRuns()];
const plain = {
  casting: row => judgeSpellcasting(row.input), featSpells: row => featSpellGrants(row.input),
  lists: row => spellListProblems(row.sheet, row.options), schools: row => thirdCasterSchoolProblem(row.input),
  kits: row => resolveKit(row.kit, row.sent, row.who, row.className),
  background: row => expandBackgroundGear(row.equipment, row.input), wealth: row => judgeStartingGear(row.input),
};
const runOf = name => { const run = runs.find(row => row.name === name); assert.ok(run, name); return run; };
const chinese = name => { const run = runOf(name); return characterRuleProblems({ problems: run.problems, problemDetails: completeRuleDetails(run.problems, run.reported) }, "zh-CN"); };

await test("all 77 original spell verdicts preserve English, spell lists, grants, slots and school policy", () => {
  const rows = runs.filter(row => Object.hasOwn(beforeSpell, row.kind)); assert.equal(rows.length, 77);
  for (const run of rows) {
    assert.deepEqual(run.result, beforeSpell[run.kind].find(row => row.name === run.name)?.result, run.name);
    assert.deepEqual(plain[run.kind](run), run.result, `${run.name}: collector changed rules`);
  }
});

await test("all 124 original kit, background and purse verdicts preserve items, choices and spending", () => {
  const rows = runs.filter(row => Object.hasOwn(beforeGear, row.kind)); assert.equal(rows.length, 124);
  for (const run of rows) {
    assert.deepEqual(run.result, beforeGear[run.kind].find(row => row.name === run.name)?.result, run.name);
    assert.deepEqual(plain[run.kind](run), run.result, `${run.name}: collector changed rules`);
  }
});

await test("all 28 new codes occur in actual refusals with no omitted or phantom diagnostics", () => {
  const seen = new Set();
  for (const run of runs) {
    assert.deepEqual([...new Set(run.reported.map(detail => detail.english))], run.problems, run.name);
    run.reported.forEach(detail => seen.add(detail.code));
    const text = chinese(run.name); assert.ok(!text.includes("中文翻译待补"), `${run.name}: ${text}`);
    assert.equal(characterRuleProblems({ problems: run.problems, problemDetails: run.reported }, "en"), run.problems.join("\n"));
  }
  assert.equal(seen.size, 28);
  assert.deepEqual([...seen].sort(), CHARACTER_RULE_CODES.filter(code => ["ruleProblem.spell", "ruleProblem.featSpell", "ruleProblem.gear"].some(prefix => code.startsWith(prefix))).sort());
});

await test("spell refusals retain filing, separate class levels, race lists, caps and named unknown terms", () => {
  assert.match(chinese("levelled-as-cantrip"), /火球术.*3 环.*戏法列表/);
  assert.match(chinese("cantrip-as-spell"), /光亮术.*戏法列表/);
  assert.match(chinese("off-class"), /祝福术.*法师法术列表/);
  assert.match(chinese("known-prepared-apart"), /已知法术列表/);
  assert.match(chinese("racial-off-list"), /圣火术.*种族戏法/);
  assert.match(chinese("cantrip-limit"), /4 个戏法.*5 个/);
  assert.match(chinese("known-limit"), /2 个已知法术.*3 个/);
  assert.match(chinese("prepared-limit"), /4 个准备法术（含待长休的法术）.*5 个/);
  assert.match(chinese("book-limit"), /6 个法术.*7 个/);
  assert.match(chinese("no-slots"), /尚未取得法术位.*治疗伤口/);
  assert.match(chinese("pack-above-level"), /云海之门.*5 环.*1 级.*1 环/);
  assert.match(chinese("multiclass-caps"), /1 级.*1 环/);
  assert.ok(chinese("unknown-spell").includes("自订{spell}\n云海法术"));
  for (const name of ["noncaster-empty", "noncaster-unjudged", "held-unknown", "legacy-known-prepared", "racial-valid", "book-in-play", "all-unjudged", "innate-free"]) assert.equal(chinese(name), "", name);
});

await test("feat-spell refusals preserve required class/ability, attack cantrips, levels, schools and ritual tags", () => {
  assert.match(chinese("feat-spells-owed-choice"), /职业法术列表.*施法属性.*2 个戏法.*1 个 1 环法术/);
  assert.match(chinese("feat-spells-owed-sniper"), /法术狙击手.*1 个攻击戏法/);
  assert.match(chinese("feat-spells-owed-fey"), /妖精触碰.*1 个 1 环预言或惑控学派的法术/);
  assert.match(chinese("feat-spells-owed-ritual"), /仪式施法者.*2 个 1 环仪式法术/);
  assert.match(chinese("feat-spells-list-outside"), /圣武士.*可选范围/);
  assert.match(chinese("feat-spells-level"), /火球术.*3.*0 环/);
  assert.match(chinese("feat-spells-school"), /魔法飞弹.*塑能学派.*预言.*惑控/);
  assert.match(chinese("feat-spells-ritual"), /护盾术.*没有仪式标签/);
  assert.equal(chinese("feat-spells-valid"), ""); assert.equal(chinese("feat-spells-nonstrict"), "");
  for (const row of spells.featSpells) {
    const feat = row.input.feats[0], picks = Object.values(row.input.choices)[0], spec = featSpellSpec(feat.desc), reported = [];
    const result = featSpellsOwed(feat.name, spec, picks, detail => reported.push(detail));
    assert.equal(result, beforeSpell.owed.find(item => item.name === row.name).result);
    assert.equal(featSpellsOwed(feat.name, spec, picks), result);
    assert.deepEqual(reported.map(detail => detail.english), result ? [result] : []);
  }
});

await test("third-caster diagnoses retain subclass, school allowances and legacy held policy", () => {
  assert.match(chinese("third-caster-schools"), /3 级.*防护.*塑能.*1 个法术.*2 个/);
  assert.match(chinese("third-caster-rogue-schools"), /惑控.*幻术.*1 个法术.*2 个/);
  assert.ok(!chinese("third-caster-schools").includes("Eldritch Knight"));
  assert.ok(!chinese("third-caster-rogue-schools").includes("Arcane Trickster"));
  for (const name of ["third-caster-held-schools", "school-held", "school-not-third"]) assert.equal(chinese(name), "");
  assert.match(chinese("school-object"), /惑控.*幻术/);
});

await test("kit and background diagnoses preserve full alternatives, trained choices, instrument exceptions and ammo", () => {
  assert.match(chinese("kit-invalid-option-fighter"), /链甲.*皮甲.*长弓.*20支箭矢/);
  assert.match(chinese("kit-cleric-untrained"), /战锤（须熟练）.*钉头锤/);
  assert.match(chinese("kit-cleric-untrained"), /链甲（须熟练）.*鳞甲.*皮甲/);
  // The frozen fighter fixture has no simple-weapon slot. Check that
  // category against the actual monk kit without rewriting the baseline.
  const simpleDetails = [];
  const simple = resolveKit(CLASS_KITS.monk, { options: [1], picks: ["fictional_weapon"] }, { armor: [], weapons: ["simple"] }, "monk", detail => simpleDetails.push(detail));
  assert.equal(simple.problems.length, 1);
  assert.match(characterRuleProblems({ problems: simple.problems, problemDetails: simpleDetails }, "zh-CN"), /fictional_weapon.*简易武器/);
  assert.match(chinese("kit-simple-melee"), /短弓.*简易近战武器/);
  assert.match(chinese("kit-martial-melee"), /长弓.*军用近战武器/);
  assert.match(chinese("kit-instrument-excluded"), /鲁特琴.*不能选择鲁特琴/);
  assert.ok(chinese("kit-instrument-invalid").includes("云海{kit}\n乐器"));
  assert.match(chinese("background-simple-outside"), /匕首 × 1或轻锤 × 1.*长剑/);
  assert.match(chinese("background-ammo-outside"), /短弓 × 1.*箭矢 × 20/);
  assert.match(chinese("background-kind-outside"), /鲁特琴.*乐器|鲁特琴.*长笛/);
  for (const name of ["kit-cleric-domain", "background-simple-valid", "background-kind-valid", "background-tool-grant", "background-default", "background-unparsed"]) assert.equal(chinese(name), "", name);
  assert.ok(chinese("background-authored-punctuation").includes("自订{item}\n无此物品"));
});

await test("purse diagnoses retain decimal money, partial free allowances and cost suppression", () => {
  assert.match(chinese("gear-homebrew"), /自制装备/); assert.ok(chinese("gear-homebrew").includes("云海{item}\n神器"));
  assert.match(chinese("gear-magic"), /长剑 \+1.*魔法物品/);
  assert.match(chinese("gear-no-price"), /no_price.*没有列明价格/);
  assert.match(chinese("gear-cost-whole"), /4 金币.*1 金币.*3 金币/);
  assert.match(chinese("gear-cost-decimal"), /0.03 金币.*0.01 金币.*0.02 金币/);
  assert.equal(chinese("gear-free-partial"), ""); assert.equal(chinese("gear-free-magic"), "");
  assert.ok(!chinese("gear-suppressed-cost").includes("金币"));
  assert.equal(runOf("gear-multiple-errors").reported.length, 3);
});

await test("metadata cannot mutate shared kit/feat data and malformed rich data cannot erase original problems", () => {
  const row = gear.kits.find(row => row.name === "kit-instrument-excluded"), before = structuredClone(row.kit);
  assert.deepEqual(resolveKit(row.kit, row.sent, row.who, row.className, detail => { if (detail.args.slot?.kind === "kitSlot") detail.args.slot.except.splice(0); }), runOf(row.name).result);
  assert.deepEqual(row.kit, before);
  const feat = spells.featSpells.find(row => row.name === "feat-spells-owed-fey");
  assert.deepEqual(featSpellGrants({ ...feat.input, onProblem: detail => { if (detail.args.choices?.kind === "featSpellPicks") detail.args.choices.schools.splice(0); } }), runOf(feat.name).result);
  const original = "Full original failure.";
  const render = (code, args) => characterRuleProblems({ problems: [original], problemDetails: [{ code, args, english: original }] }, "zh-CN");
  const valid = runOf("feat-spells-owed-fey").reported[0];
  for (const choices of [null, { ...valid.args.choices, schools: [null] }, { ...valid.args.choices, cantrips: Infinity }, { ...valid.args.choices, classList: "yes" }, { ...valid.args.choices, classList: false, ability: false, cantrips: 0, spells: 0 }]) assert.ok(render(valid.code, { ...valid.args, choices }).includes(original));
  const kit = runOf("kit-instrument-excluded").reported[0];
  for (const slot of [{ kind: "kitSlot", filter: "unknown", except: [] }, { kind: "kitSlot", filter: "instrument", except: [null] }]) assert.ok(render(kit.code, { ...kit.args, slot }).includes(original));
  const bg = runOf("background-simple-outside").reported[0];
  for (const choices of [{ kind: "gearAlternatives", alternatives: [null] }, { kind: "gearAlternatives", alternatives: [{ items: [{ name: "item", qty: Infinity }], tools: null }] }, { kind: "gearAlternatives", alternatives: [{ items: [], tools: null }] }, { kind: "gearAlternatives", alternatives: [{ items: [], tools: [] }] }]) assert.ok(render(bg.code, { ...bg.args, choices }).includes(original));
});

await test("86 exact stock kit labels and the new spell terms match reviewed source fingerprints", () => {
  const labels = [...new Set(Object.values({ ...CLASS_KITS, ...GENRE_KITS }).flatMap(kit => kit.lines.flatMap(line => line.options.map(option => option.label))))];
  assert.equal(labels.length, 86); assert.deepEqual(CHARACTER_SPELL_GEAR_NAMES.filter(row => row.type === "kitOption").map(row => row.name), labels);
  const review = readValidationJson(path.join(root, "docs/validation/character-spell-gear-translations.json"));
  for (const [file, expected] of Object.entries(review.sources)) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), expected, file);
  assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, review.catalog))).digest("hex"), review.catalogSha256);
  assert.deepEqual(Object.keys(CHARACTER_SPELL_GEAR_NAME_MESSAGES.en).sort(), Object.keys(CHARACTER_SPELL_GEAR_NAME_MESSAGES["zh-CN"]).sort());
  for (const row of CHARACTER_SPELL_GEAR_NAMES) {
    assert.equal(spellGearTermLabel(row.type, row.name, "en"), row.name);
    assert.match(spellGearTermLabel(row.type, row.name, "zh-CN"), /\p{Script=Han}/u);
  }
  assert.equal(spellGearTermLabel("kitOption", "云海包", "zh-CN"), "云海包");
});

await test("real library admission reports every spell, feat-spell and gear problem without a write", async () => {
  world.signIn(world.owner); const route = await world.route("characters");
  const sheets = [
    { ...structuredClone(LEGAL_WIZARD), spellcasting: { ...LEGAL_WIZARD.spellcasting, cantrips: ["Fireball"], prepared: ["Light", "Bless", "unknown_spell"] } },
    { ...structuredClone(LEGAL_FIGHTER), equipment: [...LEGAL_FIGHTER.equipment, { name: "Longsword +1", qty: 1 }, { name: "missing_item", qty: 1 }], kitChoices: { options: [2], picks: [] } },
    { ...structuredClone(LEGAL_FIGHTER), equipment: [...LEGAL_FIGHTER.equipment, { name: "Dagger", qty: 30 }] },
    { ...structuredClone(LEGAL_FIGHTER), race: "variant_human", feats: ["Magic Initiate"], featChoices: { "Magic Initiate": { list: "wizard", cantrips: ["Fireball", "Light"], spells: ["Bless"] } } },
  ];
  const seen = new Set();
  for (const sheet of sheets) {
    const response = await route.POST(new Request("http://127.0.0.1/test", { method: "POST", body: JSON.stringify({ level: 1, role: "pc", sheet }) }));
    assert.equal(response.status, 400); const data = await response.json();
    assert.ok(Array.isArray(data.problems) && data.problems.length, JSON.stringify(data));
    assert.equal(data.error, data.problems[0]); assert.deepEqual(data.problemDetails.map(detail => detail.english), data.problems);
    assert.ok(data.problemDetails.every(detail => detail.code !== "untranslated"), JSON.stringify(data.problemDetails));
    const text = characterErrorText({ data, fallback: "characterHost.saveError" }, "zh-CN"); assert.ok(!text.includes("中文翻译待补"), text);
    data.problemDetails.forEach(detail => seen.add(detail.code));
    assert.equal(characterErrorText({ data, fallback: "characterHost.saveError" }, "en"), data.problems.join("\n"));
  }
  for (const code of ["spellUnknown", "spellNotCantrip", "spellCantripFiled", "spellClassList", "gearKitOptions", "gearMagic", "gearNoPrice", "gearBudget", "featSpellLevel", "featSpellClassList"]) assert.ok(seen.has(`ruleProblem.${code}`), code);
  assert.deepEqual((await (await route.GET(new Request("http://127.0.0.1/test"))).json()).characters, []);
});

await test("migrated spell/gear emitters reject new bare diagnostics and kit wrappers forward the sink", () => {
  const allowed = { "src/lib/srd/legality/spells.ts": ["schools"], "src/lib/srd/feat-spells.ts": ["owed"] };
  for (const file of ["src/lib/srd/legality/spells.ts", "src/lib/srd/feat-spells.ts", "src/lib/srd/spell-prep.ts", "src/lib/srd/starting-kit.ts", "src/lib/srd/starting-wealth.ts", "src/lib/srd/gear-choices.ts"]) {
    const ast = ts.createSourceFile(file, fs.readFileSync(path.join(root, file), "utf8"), ts.ScriptTarget.Latest, true);
    const walk = node => { if (ts.isCallExpression(node) && node.expression.getText(ast) === "problems.push") for (const arg of node.arguments) if (!ts.isSpreadElement(arg)) assert.ok((allowed[file] ?? []).includes(arg.getText(ast)), file); ts.forEachChild(node, walk); }; walk(ast);
  }
  const row = gear.kits.find(row => row.name === "kit-invalid-option-fighter"), reported = [];
  assert.deepEqual(startingKitFor({ id: "fighter", armor: ["heavy"], weapons: ["martial"] }, row.sent, "", "fighter", detail => reported.push(detail)).problems, runOf(row.name).problems);
  assert.deepEqual(reported.map(detail => detail.english), runOf(row.name).problems);
  const sheet = fs.readFileSync(path.join(root, "src/lib/srd/sheet-legality.ts"), "utf8");
  assert.match(sheet, /judgeSpellcasting\(\{\s*onProblem: context.onProblem/);
  assert.match(sheet, /featSpellGrants\(\{\s*onProblem: policy.judgesPicks \? context.onProblem : undefined/);
  assert.equal([...sheet.matchAll(/judgeStartingGear\(\{\s*onProblem: context.onProblem/g)].length, 2);
});
world.close(); finish();
