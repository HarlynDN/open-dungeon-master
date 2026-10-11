import { LEGAL_FIGHTER } from "./enforce-creation.mjs";

// Pure inputs for the existing rules, before adding display diagnostics.
// The snapshot includes every English problem and a hash of the derived
// sheet, so a display migration cannot quietly change admission or math.
export function characterRuleFixtures() {
  const sheet = () => structuredClone(LEGAL_FIGHTER);
  const cases = [];
  const add = (name, patch = {}, context = {}) => cases.push({ name, sheet: { ...sheet(), ...patch }, context });
  add("legal-library");
  add("unknown-class", { class: "unregistered_class" });
  add("unknown-race", { race: "missing_custom_race" });
  add("unknown-background", { background: "unregistered_background" });
  add("two-unknown-choices", { race: "missing_custom_race", background: "missing_custom_background" });
  add("authored-choice-punctuation", { race: "自定义{str}种族\n未安装" });
  add("duplicate-classes", { classes: [{ id: "fighter", level: 1 }, { id: "fighter", level: 1 }] }, { door: "import", level: 2 });
  add("too-many-classes", { classes: ["fighter", "wizard", "rogue", "cleric", "sorcerer", "bard", "monk"].map(id => ({ id, level: 1 })) }, { door: "import", level: 7 });
  add("wrong-first-class", { classes: [{ id: "wizard", level: 1 }, { id: "fighter", level: 1 }] }, { door: "import", level: 2 });
  add("class-level-total", { classes: [{ id: "fighter", level: 2 }, { id: "wizard", level: 1 }] }, { door: "import", level: 2 });
  add("unknown-second-class", { classes: [{ id: "fighter", level: 1 }, { id: "unknown_second_class", level: 1 }] }, { door: "import", level: 2 });
  add("multiclass-prerequisites", { classes: [{ id: "fighter", level: 1 }, { id: "wizard", level: 1 }], abilities: { str: 12, dex: 12, con: 14, int: 12, wis: 11, cha: 9 } }, { door: "import", level: 2 });
  add("unearned-second-class", { classes: [{ id: "fighter", level: 1 }, { id: "wizard", level: 1 }] }, { level: 2, baseline: { sheet: sheet(), level: 1 } });
  add("unknown-subclass", { subclass: "authored_unregistered_subclass" }, { level: 3 });
  add("racial-increase", { race: "half_elf", racialChoices: { asi: ["cha", "cha"] } });
  add("unearned-improvement", { asiChoices: [{ mode: "plus2", ability: "str" }] });
  add("missing-racial-feat", { race: "variant_human" });
  add("hit-point-range", { maxHp: 400 }, { door: "import" });
  add("racial-cantrip", { race: "high_elf", racialChoices: { cantrip: "Fireball" } });
  add("ancestry-invalid", { race: "dragonborn", racialChoices: { ancestry: "unknown_dragon" } });
  add("ancestry-missing", { race: "dragonborn" });
  add("imported-wealth", { gold: 999999 }, { door: "import" });
  add("imported-attunement", { equipment: ["a", "b", "c", "d"].map(name => ({ name, qty: 1, attuned: true })) }, { door: "import" });
  add("ability-cap", { abilities: { ...sheet().abilities, str: 24 } });
  add("ability-bounds", { abilities: { ...sheet().abilities, str: 2 } }, { door: "import" });
  add("ability-method", { abilities: { str: 20, dex: 20, con: 20, int: 20, wis: 20, cha: 20 } });
  add("unmigrated-spell-feat-skill", { race: "high_elf", class: "wizard", feats: ["unknown_feat"], proficiencies: { ...sheet().proficiencies, skills: ["unknown_skill"] }, spellcasting: { ability: "int", known: [], prepared: ["unknown_spell"], cantrips: [], slots: {} } });
  return cases;
}
