export async function characterGearFixtures() {
  const { CLASS_KITS } = await import("../../src/lib/srd/starting-kit-data.ts");
  const { GENRE_KITS } = await import("../../src/lib/srd/genre-kits.ts");
  const kits = [], background = [], wealth = [];
  const who = { armor: ["heavy"], weapons: ["martial"] };
  for (const [className, kit] of Object.entries({ ...CLASS_KITS, ...GENRE_KITS })) {
    kits.push({ name: "kit-valid-" + className, kit, sent: null, who, className });
    kits.push({ name: "kit-invalid-option-" + className, kit, sent: { options: kit.lines.map(() => 99), picks: [] }, who, className });
  }
  for (const [name, className, sent, training] of [
    ["kit-cleric-untrained", "cleric", { options: [1, 2] }, { armor: ["light", "medium"], weapons: ["simple"] }],
    ["kit-cleric-domain", "cleric", { options: [1, 2] }, { armor: ["light", "medium"], weapons: ["simple"], subclass: "War Domain" }],
    ["kit-martial-melee", "barbarian", { options: [1], picks: ["Longbow"] }, who],
    ["kit-simple", "fighter", { options: [0, 0, 1, 0], picks: ["Longsword", "fictional_weapon"] }, who],
    ["kit-simple-melee", "druid", { options: [0, 1], picks: ["Shortbow"] }, who],
    ["kit-instrument-excluded", "bard", { options: [0, 0, 1], picks: ["Lute"] }, who],
    ["kit-instrument-invalid", "bard", { options: [0, 0, 1], picks: ["云海{kit}\n乐器"] }, who],
    ["kit-two-slots", "fighter", { options: [0, 1], picks: ["Dagger", "Shortbow"] }, who],
  ]) kits.push({ name, kit: CLASS_KITS[className], sent, who: training, className });
  for (const [name, equipment, picks, tools = [], backgroundTools = []] of [
    ["background-simple-outside", ["A dagger or a light hammer"], ["Longsword"]],
    ["background-simple-valid", ["A dagger or a light hammer"], ["Light hammer"]],
    ["background-ammo-outside", ["A shortbow with 20 arrows or a hunting trap"], ["missing_pick"]],
    ["background-kind-outside", ["A lute or other musical instrument"], ["Thieves' tools"]],
    ["background-kind-valid", ["A lute or other musical instrument"], ["Flute"]],
    ["background-tool-grant", ["A set of artisan's tools of your choice"], [], ["smith's tools"], ["one type of artisan's tools"]],
    ["background-default", ["A dagger or a light hammer"], []],
    ["background-unparsed", ["云海信物"], ["arbitrary"]],
    ["background-authored-punctuation", ["A dagger or a light hammer"], ["自订{item}\n无此物品"]],
  ]) background.push({ name, equipment, input: { tools, backgroundTools, picks } });
  const prices = { Dagger: { copper: 200, magic: false }, Torch: { copper: 1, magic: false }, "Longsword +1": { copper: 10000, magic: true }, "no_price": { copper: null, magic: false } };
  const add = (name, equipment, freeKit = [], coinCopper = 100) => wealth.push({ name, input: { equipment, freeKit, coinCopper, priceOf: value => prices[value] ?? { copper: null, magic: false } } });
  add("gear-homebrew", [{ name: "云海{item}\n神器", qty: 1, slug: "homebrew:custom" }]);
  add("gear-magic", [{ name: "Longsword +1", qty: 1 }]);
  add("gear-no-price", [{ name: "no_price", qty: 1 }]);
  add("gear-cost-whole", [{ name: "Dagger", qty: 2 }]);
  add("gear-cost-decimal", [{ name: "Torch", qty: 3 }], [], 1);
  add("gear-free-partial", [{ name: "Dagger", qty: 2 }], ["Dagger"], 200);
  add("gear-free-magic", [{ name: "Longsword +1", qty: 1 }], ["Longsword +1"]);
  add("gear-suppressed-cost", [{ name: "Dagger", qty: 2 }, { name: "no_price", qty: 1 }]);
  add("gear-multiple-errors", [{ name: "no_price", qty: 1 }, { name: "Longsword +1", qty: 1 }, { name: "云海信物", qty: 1, slug: "homebrew:test" }]);
  return { kits, background, wealth };
}

export async function characterGearRuns() {
  const { resolveKit } = await import("../../src/lib/srd/starting-kit.ts");
  const { expandBackgroundGear } = await import("../../src/lib/srd/gear-choices.ts");
  const { judgeStartingGear } = await import("../../src/lib/srd/starting-wealth.ts");
  const rows = await characterGearFixtures(), runs = [];
  for (const [kind, validate] of [
    ["kits", (row, sink) => resolveKit(row.kit, row.sent, row.who, row.className, sink)],
    ["background", (row, sink) => expandBackgroundGear(row.equipment, { ...row.input, onProblem: sink })],
    ["wealth", (row, sink) => judgeStartingGear({ ...row.input, onProblem: sink })],
  ]) for (const row of rows[kind]) {
    const reported = [], result = validate(row, detail => reported.push(detail));
    runs.push({ ...row, kind, result, reported, problems: result.problems });
  }
  return runs;
}
