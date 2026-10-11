import fs from "node:fs";

export async function characterSpellFixtures() {
  const { srdClassOptions } = await import("../../src/lib/characters/options.ts");
  // Read the bundled checklist and spell rows; no model, DB or network lookup.
  const { checklistSpell } = await import("../../src/lib/srd/spell-lists.ts");
  const { bundledSpellSchool, bundledSpellFacts } = await import("../../src/lib/srd/spell-facts.ts");
  const stock = JSON.parse(fs.readFileSync(new URL("../../src/lib/srd/authored-feats.json", import.meta.url), "utf8")).feats;
  const classes = srdClassOptions();
  const scores = { str: 10, dex: 14, con: 14, int: 16, wis: 16, cha: 16 };
  const spellOf = name => {
    const row = checklistSpell(name);
    if (row) return { name: row.name, level: row.level, classes: row.classes, school: bundledSpellSchool(row.name), ritual: bundledSpellFacts(row.name)?.ritual };
    return name === "云海之门" ? { name, level: 5, classes: ["wizard"], school: "conjuration", ritual: false } : null;
  };
  const cast = patch => ({ ability: "int", slots: {}, known: [], prepared: [], cantrips: [], ...patch });
  const casting = [], featSpells = [], lists = [], schools = [];
  const add = (name, classId, level, spells, patch = {}, subclass = "") => casting.push({ name, input: { sent: spells === null ? null : cast(spells), classes: [{ id: classId, level, subclass }], classOf: id => classes.find(row => row.id === id) ?? null, abilities: scores, spellOf, racialCantrip: null, judgeLists: true, bookAllowance: true, ...patch } });
  add("noncaster-spells", "fighter", 1, { known: ["Light", "Magic Missile", "Fireball", "Shield"] });
  add("noncaster-empty", "fighter", 1, null);
  add("noncaster-unjudged", "fighter", 1, { known: ["Magic Missile"] }, { judgeLists: false });
  add("unknown-spell", "wizard", 1, { prepared: ["自订{spell}\n云海法术"] });
  add("levelled-as-cantrip", "wizard", 1, { cantrips: ["Fireball"] });
  add("cantrip-as-spell", "wizard", 1, { prepared: ["Light"] });
  add("off-class", "wizard", 1, { prepared: ["Bless"] });
  add("pack-above-level", "wizard", 1, { prepared: ["云海之门"] });
  add("bundled-above-level", "wizard", 1, { prepared: ["Fireball"] });
  add("held-unknown", "wizard", 1, { prepared: ["old_authored_spell"] }, { held: cast({ prepared: ["old_authored_spell"] }) });
  add("known-prepared-apart", "sorcerer", 1, { ability: "cha", known: ["Magic Missile"], prepared: ["Shield"], pending: ["Sleep"] });
  add("legacy-known-prepared", "sorcerer", 1, { ability: "cha", prepared: ["Shield"] });
  add("racial-off-list", "cleric", 1, { ability: "wis" }, { racialCantrip: { name: "Sacred Flame", list: "wizard" } });
  add("racial-valid", "cleric", 1, { ability: "wis" }, { racialCantrip: { name: "Light", list: "wizard" } });
  add("racial-not-cantrip", "wizard", 1, {}, { racialCantrip: { name: "Fireball", list: "wizard" } });
  add("cantrip-limit", "sorcerer", 1, { ability: "cha", cantrips: ["Fire Bolt", "Light", "Mage Hand", "Prestidigitation", "Ray of Frost"] });
  add("known-limit", "sorcerer", 1, { ability: "cha", known: ["Magic Missile", "Shield", "Sleep"] });
  add("prepared-limit", "cleric", 1, { ability: "wis", prepared: ["Healing Word", "Shield of Faith", "Guiding Bolt", "Command", "Sanctuary"] });
  const book = ["Magic Missile", "Shield", "Sleep", "Mage Armor", "Detect Magic", "Find Familiar", "Burning Hands"];
  add("book-limit", "wizard", 1, { prepared: ["Magic Missile"], spellbook: book });
  add("book-in-play", "wizard", 1, { prepared: ["Magic Missile"], spellbook: book }, { bookAllowance: false });
  add("no-slots", "paladin", 1, { ability: "cha", prepared: ["Cure Wounds"] });
  add("third-caster-schools", "fighter", 3, { known: ["Charm Person", "Color Spray"] }, {}, "Eldritch Knight");
  add("third-caster-held-schools", "fighter", 3, { known: ["Charm Person", "Color Spray"] }, { held: cast({ known: ["Charm Person", "Color Spray"] }) }, "Eldritch Knight");
  add("third-caster-rogue-schools", "rogue", 3, { known: ["Shield", "Magic Missile"] }, {}, "Arcane Trickster");
  add("multiclass-caps", "wizard", 1, { casters: [{ classId: "wizard", ability: "int", known: [], prepared: ["Fireball"], cantrips: [] }, { classId: "cleric", ability: "wis", known: [], prepared: ["Bless"], cantrips: [] }] }, { classes: [{ id: "wizard", level: 1 }, { id: "cleric", level: 1 }] });
  add("multiclass-legacy", "wizard", 1, { prepared: ["Shield"] }, { classes: [{ id: "wizard", level: 1 }, { id: "warlock", level: 1 }] });
  add("all-unjudged", "wizard", 1, { cantrips: ["Fireball"], prepared: ["unknown_spell"] }, { judgeLists: false });
  add("innate-free", "cleric", 1, { ability: "wis", cantrips: ["Guidance", "Light", "Sacred Flame"] }, { innateCantrips: ["Thaumaturgy"] });
  const grant = (name, feat, picks, desc, strict = true, lookup = spellOf) => featSpells.push({ name, input: { feats: [{ name: feat, desc: desc ?? stock.find(row => row.name === feat).desc }], choices: { [feat]: picks }, raisedAbility: () => "wis", spellOf: lookup, strict } });
  grant("feat-spells-owed-fey", "Fey Touched", {});
  grant("feat-spells-owed-sniper", "Spell Sniper", {});
  grant("feat-spells-owed-ritual", "Ritual Caster", {});
  grant("feat-spells-owed-initiate", "Magic Initiate", {});
  grant("feat-spells-list-outside", "Magic Initiate", { list: "paladin", cantrips: ["Light", "Mage Hand"], spells: ["Bless"] });
  grant("feat-spells-unknown", "Magic Initiate", { list: "wizard", cantrips: ["unknown_cantrip", "Light"], spells: ["unknown_spell"] });
  grant("feat-spells-level", "Magic Initiate", { list: "wizard", cantrips: ["Fireball", "Light"], spells: ["Light"] });
  grant("feat-spells-off-list", "Magic Initiate", { list: "wizard", cantrips: ["Sacred Flame", "Light"], spells: ["Bless"] });
  grant("feat-spells-school", "Fey Touched", { spells: ["Magic Missile"] });
  grant("feat-spells-ritual", "Ritual Caster", { list: "wizard", spells: ["Shield", "Magic Missile"] });
  grant("feat-spells-valid", "Magic Initiate", { list: "wizard", cantrips: ["Light", "Mage Hand"], spells: ["Shield"] });
  grant("feat-spells-nonstrict", "Magic Initiate", { list: "wizard", cantrips: ["unknown_cantrip"], spells: ["unknown_spell"] }, undefined, false);
  grant("feat-spells-no-lookup", "Spell Sniper", { cantrips: ["Light"] }, undefined, true, undefined);
  // Undefined must remain undefined rather than receive the default lookup.
  featSpells.at(-1).input.spellOf = undefined;
  const modern = "You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability for this feat's spells (choose when you select this feat). Choose a level 1 spell from the same list you selected for this feat's cantrips.";
  grant("feat-spells-owed-choice", "云海施法", {}, modern);
  for (const row of casting) lists.push({ name: "lists-" + row.name, sheet: { class: row.input.classes[0].id, subclass: row.input.classes[0].subclass ?? "", classes: row.input.classes.length > 1 ? row.input.classes : [], level: row.input.classes.reduce((sum, row) => sum + row.level, 0), abilities: scores, spellcasting: row.input.sent }, options: { bookAllowance: row.input.bookAllowance } });
  lists.push({ name: "lists-free-count", sheet: lists.find(row => row.name === "lists-cantrip-limit").sheet, options: { freeCantripCount: 1 } });
  lists.push({ name: "lists-free-named", sheet: lists.find(row => row.name === "lists-cantrip-limit").sheet, options: { freeCantrips: ["Fire Bolt"] } });
  lists.push({ name: "lists-free-spells", sheet: lists.find(row => row.name === "lists-bundled-above-level").sheet, options: { freeSpells: ["Fireball"] } });
  for (const [name, input] of [
    ["school-fighter", { classId: "fighter", subclass: "Eldritch Knight", level: 3, spells: [{ name: "Charm Person", school: "enchantment" }, { name: "Color Spray", school: "illusion" }] }],
    ["school-held", { classId: "fighter", subclass: "Eldritch Knight", level: 3, heldOutside: 2, spells: [{ name: "Charm Person", school: "enchantment" }, { name: "Color Spray", school: "illusion" }] }],
    ["school-object", { classId: "rogue", subclass: "Arcane Trickster", level: 3, spells: [{ name: "Shield", school: { name: "Abjuration" } }, { name: "Magic Missile", school: { key: "evocation" } }] }],
    ["school-not-third", { classId: "wizard", subclass: "", level: 1, spells: [{ name: "Light", school: "evocation" }] }],
  ]) schools.push({ name, input });
  return { casting, featSpells, lists, schools };
}

export async function characterSpellRuns() {
  const { judgeSpellcasting } = await import("../../src/lib/srd/legality/spells.ts");
  const { featSpellGrants } = await import("../../src/lib/srd/feat-spells.ts");
  const { spellListProblems } = await import("../../src/lib/srd/spell-prep.ts");
  const { thirdCasterSchoolProblem } = await import("../../src/lib/srd/third-caster.ts");
  const rows = await characterSpellFixtures(), runs = [];
  for (const [kind, validate] of [
    ["casting", (row, sink) => judgeSpellcasting({ ...row.input, onProblem: sink })],
    ["featSpells", (row, sink) => featSpellGrants({ ...row.input, onProblem: sink })],
    ["lists", (row, sink) => spellListProblems(row.sheet, { ...row.options, onProblem: sink })],
    ["schools", (row, sink) => thirdCasterSchoolProblem({ ...row.input, onProblem: sink })],
  ]) for (const row of rows[kind]) {
    const reported = [], result = validate(row, detail => reported.push(detail));
    runs.push({ ...row, kind, result, reported, problems: Array.isArray(result) ? result : typeof result === "string" ? [result] : result?.problems ?? [] });
  }
  return runs;
}
