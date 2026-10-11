// Inputs for the training validator, captured before its display migration.
// Canonical stock grants plus synthetic pack grants exercise restricted and
// unrestricted choices, held training and the original duplicate suppression.
export async function characterTrainingFixtures() {
  const { srdRaceOptions, srdClassOptions, srdBackgroundOptions } = await import("../../src/lib/characters/options.ts");
  const races = srdRaceOptions(), classes = srdClassOptions(), backgrounds = srdBackgroundOptions();
  const race = id => structuredClone(races.find(row => row.id === id));
  const klass = id => structuredClone(classes.find(row => row.id === id));
  const background = id => structuredClone(backgrounds.find(row => row.id === id));
  const empty = () => ({ saves: [], skills: [], expertise: [], languages: [], tools: [], armor: [], weapons: [] });
  const base = () => ({ sent: empty(), classes: [{ id: "fighter", level: 1 }], race: race("human"), background: null, racialTool: "" });
  const rows = [];
  const add = (name, patch = {}, overrides = {}) => {
    const input = { ...base(), ...patch };
    const classRows = Object.fromEntries(input.classes.map(entry => [entry.id, { ...klass(entry.id), ...overrides[entry.id] }]));
    rows.push({ name, input: { ...input, classOf: id => classRows[id] ?? null } });
  };
  add("valid-stock-skills", { sent: { ...empty(), skills: ["athletics", "perception"] } });
  add("racial-tool-offered", { race: race("hill_dwarf"), racialTool: "flute" });
  add("racial-tool-no-choice", { racialTool: "custom{kit}\n名称" });
  add("racial-tool-valid-case", { race: race("hill_dwarf"), racialTool: "Smith's Tools" });
  add("unknown-skill", { sent: { ...empty(), skills: ["authored_skill"] } });
  add("skills-outside-list", { sent: { ...empty(), skills: ["arcana"] } });
  add("skills-too-many", { sent: { ...empty(), skills: ["athletics", "perception", "survival"] } });
  add("skills-fixed-grants", { background: background("soldier"), sent: { ...empty(), skills: ["arcana"] } });
  add("skills-pack-background", { background: { ...background("soldier"), name: "钟楼学者", skills: [], skillChoice: { count: 1, from: ["history", "insight"] } }, sent: { ...empty(), skills: ["arcana"] } });
  add("skills-any-and-repeated", { race: { ...race("human"), skills: ["athletics"], skillChoice: { count: 1 } }, background: { ...background("soldier"), skills: ["athletics"] }, sent: { ...empty(), skills: ["athletics", "arcana", "history", "insight", "religion", "deception", "medicine"] } });
  add("skills-no-slots", { sent: { ...empty(), skills: ["athletics"] } }, { fighter: { skillChoices: { count: 0, from: ["history"] } } });
  add("skills-no-class", { sent: { ...empty(), skills: ["athletics"] }, classes: [{ id: "unregistered_class", level: 1 }] }, { unregistered_class: null });
  // Remove the synthetic empty class object so this also tests a missing grant.
  rows.at(-1).input.classOf = () => null;
  add("skills-secondary-class", { classes: [{ id: "fighter", level: 1 }, { id: "rogue", level: 1 }], sent: { ...empty(), skills: ["athletics", "perception", "stealth", "arcana"] } });
  add("skills-held-edit", { sent: { ...empty(), skills: ["arcana", "athletics", "perception"] }, held: { ...empty(), skills: ["arcana"] } });
  add("expertise-not-trained", { sent: { ...empty(), expertise: ["arcana"] } });
  add("expertise-no-grant", { sent: { ...empty(), skills: ["athletics"], expertise: ["athletics"] } });
  add("expertise-too-many", { classes: [{ id: "rogue", level: 1 }], sent: { ...empty(), skills: ["acrobatics", "stealth", "perception"], expertise: ["acrobatics", "stealth", "perception"] } });
  add("expertise-rogue-tools", { classes: [{ id: "rogue", level: 1 }], sent: { ...empty(), expertise: ["thieves' tools"] } });
  add("expertise-fighter-tools", { sent: { ...empty(), expertise: ["thieves' tools"] } });
  add("expertise-held-edit", { sent: { ...empty(), skills: ["athletics"], expertise: ["athletics"] }, held: { ...empty(), skills: ["athletics"], expertise: ["athletics"] } });
  add("language-with-background", { background: background("soldier"), sent: { ...empty(), languages: ["Common", "Elvish", "Dwarvish"] } });
  add("language-without-background", { sent: { ...empty(), languages: ["Common", "Elvish", "Dwarvish"] } });
  add("language-authored-and-secret", { race: { ...race("human"), bonusLanguages: 0 }, sent: { ...empty(), languages: ["Common", "Druidic", "Thieves' Cant", "云海语"] } });
  add("language-held-edit", { sent: { ...empty(), languages: ["Common", "Elvish", "云海语"] }, held: { ...empty(), languages: ["云海语"] } });
  add("tools-missing-bard", { classes: [{ id: "bard", level: 1 }], requireToolPicks: true });
  add("tools-partial-bard", { classes: [{ id: "bard", level: 1 }], requireToolPicks: true, sent: { ...empty(), tools: ["flute"] } });
  add("tools-outside-bard", { classes: [{ id: "bard", level: 1 }], requireToolPicks: true, sent: { ...empty(), tools: ["smith's tools"] } });
  add("tools-valid-bard", { classes: [{ id: "bard", level: 1 }], requireToolPicks: true, sent: { ...empty(), tools: ["flute", "lute", "drum"] } });
  add("tools-monk-alternatives", { classes: [{ id: "monk", level: 1 }], requireToolPicks: true, sent: { ...empty(), tools: ["forgery kit"] } });
  add("tools-gaming-and-instrument", { background: { ...background("soldier"), tools: ["one gaming set", "one musical instrument"] }, requireToolPicks: true });
  add("tools-named-pack", { background: { ...background("soldier"), tools: ["Your choice of one from Thieves' Tools, Forgery Kit, or Disguise Kit"] }, requireToolPicks: true, sent: { ...empty(), tools: ["flute"] } });
  add("tools-held-answer", { classes: [{ id: "bard", level: 1 }], requireToolPicks: true, sent: { ...empty(), tools: ["flute", "lute", "drum"] }, held: { ...empty(), tools: ["flute", "lute", "drum"] } });
  add("tools-legacy-wording", { classes: [{ id: "bard", level: 1 }], sent: { ...empty(), tools: ["three musical instruments of your choice"] } });
  return rows;
}
