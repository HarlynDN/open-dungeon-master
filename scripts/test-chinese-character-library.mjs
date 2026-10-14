import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { openWorld, heroInput } from "./lib/enforce-world.mjs";
import { LEGAL_FIGHTER, LEGAL_WIZARD } from "./lib/enforce-creation.mjs";
import { suite } from "./lib/enforce-harness.mjs";
const { test, finish } = suite("test-chinese-character-library");
const world = await openWorld({ status: "lobby", startingLevel: 1, gameSettings: { locale: "zh-CN", hpMethod: "average" } });
const { createCharacter, getCharacterForUser } = await import("../src/lib/db/characters.ts");
const { updateUserSettings } = await import("../src/lib/db/users.ts");
const { computeSheetDerived, SRD_CLASSES, SRD_RACES, SRD_BACKGROUNDS, SRD_SKILLS } = await import("../src/lib/srd/index.ts");
const { subclassNamesFor } = await import("../src/lib/srd/features.ts");
const { characterLabel, subclassLabel, derivedLabel, abilityLabel, skillLabel, characterEventLabel, requireCharacter, requireCharacterList, characterCreationData, seatCampaigns, readCharacterResponse, characterRequestError, characterErrorText } = await import("../src/lib/i18n/character-presentations.ts");
const { createTranslator } = await import("../src/lib/i18n/messages.ts");
const { CHARACTER_SUBCLASS_METADATA } = await import("../src/lib/i18n/character-subclass-metadata.ts");
const listRoute = await world.route("characters");
const characterRoute = await world.route("characters/[characterId]");
const cloneRoute = await world.route("characters/[characterId]/clone");
const sheetRoute = await world.route("campaigns/[campaignId]/sheet");
const req = (method, body) => new Request("http://127.0.0.1/test", { method, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
const params = (characterId) => ({ params: Promise.resolve({ characterId }) });
const campaignParams = { params: Promise.resolve({ campaignId: world.campaignId }) };
const input = heroInput({ name: "林河", class: "fighter", level: 3, subclass: "Champion", portrait: { url: "/uploads/test-library.png" }, abilities: { str: 13, dex: 13, con: 13, int: 13, wis: 13, cha: 13 }, proficiencies: { saves: ["str", "con"], skills: ["athletics", "perception"], expertise: [], languages: ["Common"], tools: [], armor: ["light armor", "medium armor", "heavy armor", "shields"], weapons: ["simple weapons", "martial weapons"] } });
const original = createCharacter(world.owner.id, 3, input);
world.signIn(world.owner);
const root = path.resolve(import.meta.dirname, "..");

await test("stock identity labels project known identifiers while custom names remain authored", () => {
  for (const [kind, rows] of [["class", SRD_CLASSES], ["race", SRD_RACES], ["background", SRD_BACKGROUNDS]]) for (const row of rows) {
    assert.equal(characterLabel(kind, row.id, "en"), row.name);
    assert.match(characterLabel(kind, row.id, "zh-CN"), /\p{Script=Han}/u);
    assert.equal(characterLabel(kind, row.name, "en"), row.name);
  }
  for (const kind of ["class", "race", "background"]) for (const name of ["Clock Keeper", "云海旅人", "my_custom_row"]) assert.equal(characterLabel(kind, name, "zh-CN"), name);
  assert.equal(subclassLabel("fighter", "Champion", "zh-CN"), "勇士");
  assert.equal(subclassLabel("wizard", "Champion", "zh-CN"), "Champion");
  for (const [classId, rows] of Object.entries(CHARACTER_SUBCLASS_METADATA)) for (const row of rows) {
    assert.ok(subclassNamesFor(classId).includes(row.name));
    assert.equal(subclassLabel(classId, row.name, "en"), row.name);
    for (const alias of row.aliases) assert.equal(subclassLabel(classId, alias, "zh-CN"), subclassLabel(classId, row.name, "zh-CN"));
  }
});

await test("sheet labels and derived explanations localize without changing any calculation", () => {
  const computed = computeSheetDerived({ ...original.sheet, level: 3 });
  const before = structuredClone(computed);
  const parts = [...Object.values(computed.parts.saves).flat(), ...Object.values(computed.parts.skills).flat(), ...computed.parts.initiative, ...computed.parts.passivePerception];
  for (const part of parts) { assert.equal(derivedLabel(part.label, "en"), part.label); assert.match(derivedLabel(part.label, "zh-CN"), /\p{Script=Han}/u); }
  assert.deepEqual(computed, before);
  for (const id of ["str", "dex", "con", "int", "wis", "cha"]) assert.match(abilityLabel(id, "zh-CN"), /\p{Script=Han}/u);
  for (const skill of SRD_SKILLS) assert.equal(skillLabel(skill.id, "en"), skill.name);
  assert.equal(characterEventLabel("level_up", "zh-CN"), "升级"); assert.equal(characterEventLabel("authored-kind", "zh-CN"), "authored-kind");
});

await test("unreadable and failed character requests retain status and switch presentation", async () => {
  const conflict = await readCharacterResponse(Promise.resolve(Response.json({ error: "You already have a character in this campaign." }, { status: 409 })), "seat.error").catch((cause) => characterRequestError(cause, "seat.error"));
  assert.equal(conflict.status, 409); assert.equal(characterErrorText(conflict, "zh-CN"), "你在这个战役中已经有角色。"); assert.equal(characterErrorText(conflict, "en"), conflict.data.error);
  for (const promise of [Promise.resolve(new Response("<html>proxy</html>", { status: 200 })), Promise.reject(new Error("offline"))]) {
    const failure = await readCharacterResponse(promise, "library.loadError").catch((cause) => characterRequestError(cause, "library.loadError"));
    assert.match(characterErrorText(failure, "zh-CN"), /无法|连接/);
  }
  const problems = ["One choice is missing.", "Another choice is missing."];
  const detail = await readCharacterResponse(Promise.resolve(Response.json({ error: problems[0], problems }, { status: 400 })), "characterHost.saveError").catch((cause) => characterRequestError(cause, "characterHost.saveError"));
  assert.deepEqual(detail.data.problems, problems); assert.equal(characterErrorText(detail, "en"), problems.join("\n"));
});

await test("real list and detail reads are private, and malformed reads cannot present empty or level-one data", async () => {
  const rows = requireCharacterList(await (await listRoute.GET(req("GET"))).json()); assert.ok(rows.some((row) => row.id === original.id));
  const detail = await (await characterRoute.GET(req("GET"), params(original.id))).json(); assert.equal(requireCharacter(detail).name, "林河");
  const context = characterCreationData({ campaign: { startingLevel: 5, gameSettings: { genre: "high-fantasy", worldPack: "custom-world" } } }, { characters: rows }, { sheet: null, libraryLevel: null });
  assert.equal(context.level, 5); assert.equal(context.worldPackId, "custom-world"); assert.equal(context.currentLibraryId, null);
  for (const malformed of [null, {}, { characters: [{}] }, { characters: [{ ...original, class: null }] }]) assert.throws(() => requireCharacterList(malformed));
  for (const level of [undefined, 0, 21, "5"]) assert.throws(() => characterCreationData({ campaign: { startingLevel: level, gameSettings: {} } }, { characters: rows }, { sheet: null }));
  const stranger = world.addUser("另一个角色所有者"); world.signIn(stranger);
  assert.equal((await characterRoute.GET(req("GET"), params(original.id))).status, 404);
  assert.deepEqual(requireCharacterList(await (await listRoute.GET(req("GET"))).json()), []);
  world.signIn(world.owner);
});

await test("real copies use the personal locale, keep the source intact and deduplicate names", async () => {
  const before = getCharacterForUser(world.owner.id, original.id);
  updateUserSettings(world.owner.id, { uiLocale: "zh-CN" });
  const copy = requireCharacter(await (await cloneRoute.POST(req("POST"), params(original.id))).json());
  assert.equal(copy.name, "林河（副本）"); assert.equal(copy.class, "fighter"); assert.equal(copy.race, "human"); assert.equal(copy.sheet.subclass, "Champion");
  assert.deepEqual({ ...copy.sheet, name: before.sheet.name }, before.sheet);
  const second = requireCharacter(await (await cloneRoute.POST(req("POST"), params(original.id))).json()); assert.notEqual(second.name, copy.name);
  updateUserSettings(world.owner.id, { uiLocale: "en" });
  const english = requireCharacter(await (await cloneRoute.POST(req("POST"), params(original.id))).json()); assert.equal(english.name, "林河 (copy)");
  assert.deepEqual(getCharacterForUser(world.owner.id, original.id), before);
});

await test("campaign selection filters inactive/workshop rows and retains authored titles", () => {
  const source = { campaigns: [{ id: "one", title: "钟楼", status: "lobby" }, { id: "two", title: "水畔", status: "playing" }, { id: "ended", title: "旧冒险", status: "ended" }, { id: "workshop", title: "素材", kind: "workshop" }, { id: "old-workshop", title: "素材二", isWorkshop: true }] };
  assert.deepEqual(seatCampaigns(source).map((row) => row.title), ["钟楼", "水畔"]);
  assert.throws(() => seatCampaigns({})); assert.throws(() => seatCampaigns({ campaigns: [null] }));
  assert.match(createTranslator("zh-CN")("seat.down", { name: "林河", level: 1, old: 3 }), /1 级.*3 级/);
});

await test("the actual seat route adapts the campaign copy and keeps canonical library data", async () => {
  const before = getCharacterForUser(world.owner.id, original.id);
  const response = await sheetRoute.POST(req("POST", { libraryCharacterId: original.id }), campaignParams);
  const data = await response.json(); assert.equal(response.status, 201, data.error);
  assert.equal(data.sheet.level, 1); assert.equal(data.sheet.name, "林河"); assert.equal(data.sheet.class, "fighter");
  assert.deepEqual(getCharacterForUser(world.owner.id, original.id), before);
  const again = await sheetRoute.POST(req("POST", { libraryCharacterId: original.id }), campaignParams);
  assert.equal(again.status, 201);
  assert.equal((await again.json()).sheet.id, data.sheet.id, "re-seating the same library character is idempotent");
});

await test("display translation stays out of request identifiers, and failed creation reads cannot guess level one", () => {
  for (const file of ["src/app/characters/page.tsx", "src/app/characters/new/page.tsx", "src/app/characters/[characterId]/UseInCampaignDialog.tsx", "src/app/campaigns/[campaignId]/character/page.tsx", "src/components/sheet/SheetParts.tsx"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8"); const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node) => { if (ts.isPropertyAssignment(node) && ["libraryCharacterId", "editLibraryCharacterId", "sheet", "role", "portrait", "slug"].includes(node.name.getText(ast))) assert.ok(!/^t\(/.test(node.initializer.getText(ast)), file); ts.forEachChild(node, visit); }; visit(ast);
    if (file.endsWith("character/page.tsx")) assert.doesNotMatch(source, /setLevel\(1\)|startingLevel\s*\?\?\s*1/);
  }
});

await test("real admission refusals identify individual core, training, feat, spell and equipment problems in Chinese", async () => {
  const before = requireCharacterList(await (await listRoute.GET(req("GET"))).json()).map(row => row.id).sort();
  const bad = { ...heroInput({ name: "无效角色" }), race: "missing_custom_race" };
  const response = await listRoute.POST(req("POST", { level: 1, role: "pc", sheet: bad }));
  assert.equal(response.status, 400, "invalid race must be rejected by the real admission route");
  const data = await response.json(); assert.ok(Array.isArray(data.problems) && data.problems.length);
  const text = characterErrorText({ data, fallback: "characterHost.saveError" }, "zh-CN");
  assert.ok(text.includes("missing_custom_race") && text.includes("种族"));
  // Broaden the old single unknown-race check across the independent
  // validators. The diagnostic suites also exercise all 80 emitted codes
  // against frozen verdicts, including limits and successful choices.
  const choices = { ...LEGAL_WIZARD, feats: ["unknown_feat"], proficiencies: { ...LEGAL_WIZARD.proficiencies, skills: ["unknown_skill"] }, spellcasting: { ...LEGAL_WIZARD.spellcasting, prepared: ["unknown_spell"] } };
  const samples = [
    choices,
    { ...structuredClone(LEGAL_WIZARD), spellcasting: { ...LEGAL_WIZARD.spellcasting, cantrips: ["Fireball"], prepared: ["Light", "Bless"] } },
    { ...structuredClone(LEGAL_FIGHTER), equipment: [...LEGAL_FIGHTER.equipment, { name: "Longsword +1", qty: 1 }, { name: "missing_item", qty: 1 }], kitChoices: { options: [2], picks: [] } },
    { ...structuredClone(LEGAL_FIGHTER), equipment: [...LEGAL_FIGHTER.equipment, { name: "Dagger", qty: 30 }] },
    { ...structuredClone(LEGAL_FIGHTER), race: "variant_human", feats: ["Magic Initiate"], featChoices: { "Magic Initiate": { list: "wizard", cantrips: ["Fireball", "Light"], spells: ["Bless"] } } },
  ];
  const seen = new Set(data.problemDetails.map(detail => detail.code));
  for (const sheet of samples) {
    const rejected = await listRoute.POST(req("POST", { level: 1, role: "pc", sheet }));
    assert.equal(rejected.status, 400); const all = await rejected.json();
    assert.ok(Array.isArray(all.problems) && all.problems.length, JSON.stringify(all));
    assert.deepEqual(all.problemDetails.map(detail => detail.english), all.problems);
    assert.ok(all.problemDetails.every(detail => detail.code !== "untranslated"));
    all.problemDetails.forEach(detail => seen.add(detail.code));
    const translated = characterErrorText({ data: all, fallback: "characterHost.saveError" }, "zh-CN");
    assert.ok(!translated.includes("中文翻译待补"), translated);
    assert.equal(characterErrorText({ data: all, fallback: "characterHost.saveError" }, "en"), all.problems.join("\n"));
  }
  for (const code of ["raceUnknown", "featUnknown", "trainingSkillUnknown", "spellUnknown", "spellNotCantrip", "spellCantripFiled", "spellClassList", "gearKitOptions", "gearMagic", "gearNoPrice", "gearBudget", "featSpellLevel", "featSpellClassList"]) assert.ok(seen.has(`ruleProblem.${code}`), code);
  assert.deepEqual(requireCharacterList(await (await listRoute.GET(req("GET"))).json()).map(row => row.id).sort(), before);
});
world.close(); finish();
