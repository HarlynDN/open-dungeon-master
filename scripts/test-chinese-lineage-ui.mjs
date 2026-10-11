import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { register } from "node:module";
import { suite } from "./lib/enforce-harness.mjs";
register("./lib/register-routes.mjs", import.meta.url);
const { test, finish } = suite("test-chinese-lineage-ui");
const root = path.resolve(import.meta.dirname, "..");
const before = readValidationJson(path.join(root, "docs/validation/character-lineage-ui-goldens.json"));
const l = await import("../src/app/characters/builder/lineage.ts");
const p = await import("../src/lib/i18n/lineage-presentations.ts");
const { LINEAGE_TRAIT_DISPLAY } = await import("../src/lib/i18n/lineage-material-messages.ts");
const { draconicAncestryLabel } = await import("../src/lib/i18n/racial-presentations.ts");
const { DRACONIC_ANCESTRIES } = await import("../src/lib/srd/racial-grants.ts");
const { srdRaceOptions } = await import("../src/lib/characters/options.ts");
const { describeRace } = await import("../src/lib/help/index.ts");

await test("all 31 frozen native projections retain source traits, choices, bonuses and every gender's art", () => {
  const actual = srdRaceOptions().map(race => ({ id: race.id, source: race,
    tagline: l.lineageTagline(race), chips: l.asiChips(race.asi), choices: l.lineageChoices(race),
    traits: l.traitLines(race).map(line => ({ line, parsed: l.parseTrait(line, race) })),
    art: ["Female", "Male", "Nonbinary", null].map(gender => l.lineageArt(race.id, race.name, gender)) }));
  assert.equal(actual.length, 31); assert.deepEqual(JSON.parse(JSON.stringify(actual)), before.material);
  for (const row of actual) {
    assert.equal(p.lineageTaglineView(row.source, "en"), row.tagline);
    assert.deepEqual(p.lineageChipViews(row.source, "en"), row.chips);
    assert.deepEqual(p.lineageChoiceViews(row.source, "en"), row.choices);
    assert.equal(p.lineageHelpText(row.id, "en"), describeRace(row.id));
    for (const trait of row.traits) assert.deepEqual(p.lineageTraitView(trait.line, row.source, "en"), trait.parsed);
  }
});

await test("1552 frozen language explanations retain English counts, restricted lists and background grammar", () => {
  assert.equal(before.languages.length, 1552);
  for (const row of before.languages) {
    const original = structuredClone(row);
    assert.equal(p.lineageLanguageHelp(row.race, row.background ?? undefined, "en"), row.english);
    const chinese = p.lineageLanguageHelp(row.race, row.background ?? undefined, "zh-CN");
    assert.match(chinese, /掌握/); assert.ok(!chinese.includes("翻译待补"));
    if (row.race.languageChoice) assert.ok(chinese.includes(`选择 ${row.race.languageChoice.count} 门`));
    const open = row.race.bonusLanguages - (row.race.languageChoice?.count ?? 0);
    if (open > 0) assert.ok(chinese.includes(`自选 ${open} 门语言`));
    if (row.background?.languages) assert.ok(chinese.includes(`另提供 ${row.background.languages} 门自选语言`));
    assert.deepEqual(row, original);
  }
  const authored = before.languages.at(-2);
  const translated = p.lineageLanguageHelp(authored.race, authored.background, "zh-CN");
  assert.ok(translated.includes(authored.race.name)); assert.ok(translated.includes(authored.background.name));
  assert.match(translated, /从通用语和地底通用语中选择 1 门.*自选 2 门语言.*精灵语.*另提供 2 门/s);
});

await test("90 source-compared trait forms translate all native bodies without reparsing Chinese or changing numeric mechanics", () => {
  assert.equal(LINEAGE_TRAIT_DISPLAY.length, 90);
  const seen = new Set();
  const numeric = value => (value.match(/\d+d\d+|d\d+|\d+/g) ?? []).reduce((map, value) => map.set(value, (map.get(value) ?? 0) + 1), new Map());
  for (const row of before.material) {
    const source = structuredClone(row.source);
    assert.match(p.lineageDescription(source, "zh-CN"), /\p{Script=Han}/u);
    assert.ok(!p.lineageHelpText(row.id, "zh-CN").includes("翻译待补"));
    for (const { line, parsed } of row.traits) {
      seen.add(line);
      const view = p.lineageTraitView(line, source, "zh-CN");
      assert.match(view.head, /\p{Script=Han}/u); assert.equal(view.body === null, parsed.body === null);
      if (view.body) assert.match(view.body, /\p{Script=Han}/u);
      assert.ok(!view.head.includes("翻译待补"));
      const required = numeric(parsed.head + " " + (parsed.body ?? "")), displayed = numeric(view.head + " " + (view.body ?? ""));
      for (const [number, count] of required) assert.ok(displayed.get(number) >= count, `${row.id}: ${line}: ${number}`);
    }
    assert.deepEqual(source, row.source);
    assert.deepEqual(p.lineageChipViews(source, "zh-CN").map(chip => chip.bonus), row.chips.map(chip => chip.bonus));
    assert.equal(p.lineageChoiceViews(source, "zh-CN").length, row.choices.length);
  }
  assert.equal(seen.size, 90);
  const custom = { ...before.material[0].source, id: "authored-race", note: "Cloud trait (authored {detail}\nwhole text)", name: "Cloud" };
  for (const line of l.traitLines(custom)) assert.deepEqual(p.lineageTraitView(line, custom, "zh-CN"), l.parseTrait(line, custom));
  assert.equal(p.lineageHelpText(custom.id, "zh-CN"), null);
  const unknown = "New native trait (complete source)";
  const fallback = p.lineageTraitView(unknown, before.material[0].source, "zh-CN");
  assert.match(fallback.head, /翻译待补.*New native trait/); assert.equal(fallback.body, "Complete source.");
});

await test("ten draconic labels preserve original English and Chinese geometry, resistance and save ability", () => {
  assert.equal(DRACONIC_ANCESTRIES.length, 10);
  const original = structuredClone(DRACONIC_ANCESTRIES);
  for (const entry of DRACONIC_ANCESTRIES) {
    assert.equal(draconicAncestryLabel(entry, "en"), `${entry.dragon} (${entry.damageType}, ${entry.area}, ${entry.save.toUpperCase()} save)`);
    const view = draconicAncestryLabel(entry, "zh-CN");
    assert.match(view, /龙（.*豁免）/);
    assert.ok(view.includes(entry.save === "dex" ? "敏捷" : "体质"));
    assert.ok(view.includes(entry.area.includes("line") ? "宽 5 英尺、长 30 英尺的线形" : "15 英尺锥形"));
  }
  assert.deepEqual(DRACONIC_ANCESTRIES, original);
  assert.match(draconicAncestryLabel(DRACONIC_ANCESTRIES.find(row => row.id === "green"), "zh-CN"), /绿龙.*毒素.*体质/);
});

await test("translated cards retain bilingual/mixed queries, every existing search result, ordering and folded selection", () => {
  const old = [{ label: "Core", options: [{ id: "human", name: "Human" }, { id: "high_elf", name: "Elf (High)" }] }];
  const bilingual = [{ label: "Core", options: [{ id: "human", name: "人类", searchTerms: ["Human", "human"] }, { id: "high_elf", name: "高等精灵", searchTerms: ["Elf (High)", "high_elf"] }] }];
  const ids = groups => groups.flatMap(group => group.options.map(row => row.id));
  for (const query of ["", "human", "elf", "high elf", "no match"]) assert.deepEqual(ids(l.filterGroups(bilingual, query)), ids(l.filterGroups(old, query)));
  assert.deepEqual(ids(l.filterGroups(bilingual, "高等 elf")), ["high_elf"]);
  assert.deepEqual(ids(l.filterGroups(bilingual, "高等精灵")), ["high_elf"]);
  const folded = l.foldGroups(bilingual, { limit: 0, keepId: "high_elf" });
  assert.deepEqual(ids(folded.groups), ["high_elf"]); assert.equal(folded.hidden, 1);
});

await test("source/catalog review is current and component callbacks still pass source identifiers", () => {
  const review = readValidationJson(path.join(root, "docs/validation/character-lineage-translations.json"));
  for (const [file, hash] of Object.entries({ ...review.sources, ...review.catalogs })) assert.equal(createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"), hash, file);
  const source = file => fs.readFileSync(path.join(root, file), "utf8");
  const ancestry = source("src/app/characters/builder/steps/AncestryStep.tsx");
  assert.match(ancestry, /value: language as string, label: trainingLabel/);
  assert.match(ancestry, /displayName: option\.name/); assert.match(ancestry, /srdRaceFor\(entry\.id\)\?\.name/);
  const choices = source("src/app/characters/builder/RacialChoicesSection.tsx");
  assert.match(choices, /value: entry\.id/); assert.match(choices, /onCantripChange\(entry\.name\)/);
  assert.match(choices, /value: entry, label: trainingLabel/); assert.match(choices, /params: \{ class: race\.cantripChoice\.list, level: "0" \}/);
});
finish();
