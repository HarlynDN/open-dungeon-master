import { openBuilder } from "./enforce-builder.mjs";

export async function characterBuilderUiFixtures() {
  const builder = await openBuilder();
  const fighterFields = { race: "human", class: "fighter", background: "soldier", bonusLanguages: ["Dwarvish"], chosenSkills: ["perception", "survival"], stylePicks: ["defense"] };
  const wizardFields = { race: "high_elf", class: "wizard", background: "sage", bonusLanguages: ["Dwarvish", "Giant", "Draconic"], chosenSkills: ["investigation", "insight"], racialCantrip: "Ray of Frost", scores: { str: 8, dex: 14, con: 13, int: 15, wis: 12, cha: 10 }, spells: ["Magic Missile", "Shield", "Sleep", "Mage Armor", "Detect Magic", "Burning Hands"], bookPrepared: ["Magic Missile", "Shield", "Sleep", "Mage Armor"], cantrips: ["Fire Bolt", "Light", "Mage Hand"] };
  const fighter = builder.build(fighterFields), wizard = builder.build(wizardFields);
  const klassOf = id => builder.classes.find(row => row.id === id);
  const raceOf = id => builder.races.find(row => row.id === id);
  const backgroundOf = id => builder.backgrounds.find(row => row.id === id);
  const cases = [];
  function add(name, section, base, state = {}, derived = {}, race = raceOf(base.sheet?.race ?? "human"), klass = klassOf(base.sheet?.class ?? "fighter"), background = backgroundOf(base.sheet?.background ?? "soldier")) {
    const input = { state: { ...base.state, ...state }, derived: { ...base.derived, ...derived }, race, klass, background };
    cases.push({ name, section, input });
  }
  add("identity-name", "identity", fighter, { name: " " });
  add("identity-background-skill", "identity", fighter, { backgroundSkills: [] }, {}, raceOf("human"), klassOf("fighter"), { ...backgroundOf("soldier"), name: "云海{background}\n旅人", skillChoice: { count: 1, from: ["history"] } });
  add("ancestry-race", "ancestry", fighter, {}, {}, undefined);
  // Explicit undefined arguments use JS defaults; represent missing rows
  // after constructing the fixture rather than changing the valid stand-in.
  cases.at(-1).input.race = undefined;
  add("ancestry-language", "ancestry", fighter, { bonusLanguages: [] });
  add("ancestry-ability", "ancestry", fighter, { racialAsi: [] }, {}, raceOf("half_elf"));
  add("ancestry-skills", "ancestry", fighter, { racialAsi: ["str", "dex"], racialSkills: [] }, {}, raceOf("half_elf"));
  add("ancestry-tool", "ancestry", fighter, { racialTool: "" }, {}, raceOf("hill_dwarf"));
  add("ancestry-cantrip", "ancestry", fighter, { racialCantrip: "" }, {}, raceOf("high_elf"));
  add("ancestry-feat", "ancestry", fighter, { racialAsi: ["str", "dex"], racialSkills: ["stealth"], feats: [] }, {}, raceOf("variant_human"));
  add("ancestry-feat-picks", "ancestry", fighter, { racialAsi: ["str", "dex"], racialSkills: ["stealth"], feats: ["Linguist"], featChoices: {} }, {}, raceOf("variant_human"));
  add("ancestry-dragon", "ancestry", fighter, { racialAncestry: "" }, {}, raceOf("dragonborn"));
  add("ancestry-repeat", "ancestry", fighter, { repeatSkills: [] }, {}, { ...raceOf("human"), skills: ["athletics"] });
  add("calling-class", "calling", fighter); cases.at(-1).input.klass = undefined;
  add("calling-skills", "calling", fighter, { chosenSkills: [] });
  add("calling-tools", "calling", fighter, {}, { toolGrants: { fixed: [], choices: [{ count: 3, label: "musical instrument", from: ["Lute", "Flute", "Drum"] }], chosen: [], left: [3] } });
  add("calling-subclass", "calling", fighter, { subclass: "" }, { effectiveLevel: 3 });
  add("calling-style", "calling", fighter, { stylePicks: [] });
  add("calling-expertise", "calling", fighter, { chosenSkills: ["perception", "stealth", "sleight_of_hand", "deception"], expertisePicks: [] }, { effectiveLevel: 1, styleSlots: 0 }, raceOf("human"), klassOf("rogue"));
  add("calling-option", "calling", fighter, {}, { optionSlots: [{ remaining: 2, label: "Eldritch Invocation" }] });
  add("calling-option-authored", "calling", fighter, {}, { optionSlots: [{ remaining: 1, label: "Cloud rites" }] });
  add("abilities-missing", "abilities", fighter, {}, { abilities: null });
  add("abilities-standard", "abilities", fighter, { scores: { str: 15, dex: 15, con: 13, int: 12, wis: 10, cha: 8 } });
  add("abilities-point-range", "abilities", fighter, { method: "pointbuy", scores: { str: 16, dex: 8, con: 8, int: 8, wis: 8, cha: 8 } });
  add("abilities-point-budget", "abilities", fighter, { method: "pointbuy", scores: { str: 15, dex: 15, con: 15, int: 15, wis: 15, cha: 15 } });
  add("abilities-roll", "abilities", fighter, { method: "roll", rollPool: [] });
  add("abilities-asi", "abilities", fighter, {}, { activeAsiChoices: [null], asiTakenInPlay: [false], asiSlotLevels: [4] });
  add("abilities-feat-picks", "abilities", fighter, { featChoices: {} }, { activeAsiChoices: [{ mode: "feat", feat: "Linguist" }], asiTakenInPlay: [false], asiSlotLevels: [4] });
  add("spells-cantrip-more", "spells", wizard, {}, { chosenCantrips: [] });
  add("spells-cantrip-less", "spells", wizard, {}, { chosenCantrips: ["Fire Bolt", "Light", "Mage Hand", "Message"] });
  add("spells-book-more", "spells", wizard, {}, { chosenSpells: [] });
  add("spells-book-less", "spells", wizard, {}, { chosenSpells: [...wizard.derived.chosenSpells, "Charm Person"] });
  add("spells-book-prepare", "spells", wizard, {}, { chosenPrepared: [] });
  add("spells-known-more", "spells", wizard, {}, { spellbookAdvice: null, chosenPrepared: [], spellAdvice: { count: 2, label: "spells known" } });
  add("spells-prepared-more", "spells", wizard, {}, { spellbookAdvice: null, chosenPrepared: [], spellAdvice: { count: 4, label: "spells prepared" } });
  add("spells-too-many", "spells", wizard, {}, { chosenPrepared: [...wizard.derived.chosenPrepared, "Detect Magic"] });
  add("gear-magic", "gear", builder.build({ ...fighterFields, equipment: [{ name: "Longsword +1", qty: 1, magic: true }] }));
  add("gear-multiple", "gear", builder.build({ ...fighterFields, equipment: [{ name: "Longsword +1", qty: 1, magic: true }, { name: "云海{item}\n无价", qty: 1 }] }));
  add("gear-budget", "gear", builder.build({ ...fighterFields, equipment: [{ name: "Dagger", qty: 30 }] }));
  add("gear-kit-option", "gear", builder.build({ ...fighterFields, kitChoices: { options: [2], picks: [] } }));
  add("gear-kit-slot", "gear", builder.build({ ...fighterFields, kitChoices: { options: [0, 0], picks: ["Shortbow"] } }));
  add("valid-fighter", "all", fighter);
  add("valid-wizard", "all", wizard);
  const soft = { ...wizard.derived, castingLabel: "spells", cantripAdvice: null, chosenCantrips: [], spellbookAdvice: null, spellAdvice: null, chosenPrepared: [] };
  add("spell-warning", "all", wizard, { spells: [], cantrips: [], spellWarningAck: false }, soft);
  add("spell-warning-authored", "all", wizard, { name: "自订{name}\n林河", spells: [], cantrips: [], spellWarningAck: false }, { ...soft, castingLabel: "Cloud rites" });
  add("validation-missing", "all", fighter, {}, { preview: null });
  for (const row of cases) {
    const { state, derived, race, klass, background } = row.input;
    const s = builder.submit;
    row.gates = { identity: s.identityBlocker(state, background), ancestry: s.ancestryBlocker(state, race, background, derived), calling: s.callingBlocker(klass, state, derived), abilities: s.abilitiesBlocker(derived, state), spells: s.spellsBlocker(state, derived, klass), gear: s.gearBlocker(derived) };
    row.validation = s.validateBuilder(row.input);
    row.result = derived.preview && race && klass && background ? s.buildBuilderResult(row.input) : null;
  }
  return cases;
}

export function builderUiSnapshot(row) {
  const original = value => value && Object.fromEntries(Object.entries(value).filter(([key]) => key !== "presentation"));
  return { name: row.name, section: row.section, gates: Object.fromEntries(Object.entries(row.gates).map(([key, value]) => [key, original(value)])), validation: original(row.validation), result: row.result, purse: row.input.derived.purse && Object.fromEntries(Object.entries(row.input.derived.purse).filter(([key]) => key !== "problemDetails")) };
}
