import fs from "node:fs";

// Captured against the original validators before the display migration.
// Stock descriptions and synthetic pack wording cover both strict and held
// policies, compound prerequisites and shared pick budgets.
export function characterFeatFixtures() {
  const stock = JSON.parse(fs.readFileSync(new URL("../../src/lib/srd/authored-feats.json", import.meta.url), "utf8")).feats;
  const scores = () => ({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
  const who = () => ({ abilities: scores(), armor: [], casts: false, raceId: "human", raceName: "Human", skills: [], tools: [], weapons: [], level: 1 });
  const feats = [];
  const add = (name, input = {}, catalog = stock) => feats.push({ name, input: { sent: [], recorded: [], racialFeats: 0, unrecordedSlots: 0, held: [], who: who(), ...input, featOf: value => catalog.find(row => row.name.toLowerCase() === value.toLowerCase()) ?? null } });
  add("feat-valid-racial", { sent: ["Alert"], racialFeats: 1 });
  add("feat-no-slot", { sent: ["Alert", "Lucky"] });
  add("feat-extra-slots", { sent: ["Alert", "Lucky"], racialFeats: 1 });
  add("feat-recorded-duplicates", { sent: ["alert", "Alert", ""], recorded: ["Alert"] });
  add("feat-held-unknown", { sent: ["not_installed"], held: ["not_installed"] });
  add("feat-unknown", { sent: ["未知{feat}\n自订专长"], racialFeats: 1 });
  for (const row of stock.filter(row => row.prerequisite)) {
    add(`stock-unmet-${row.name}`, { sent: [row.name], racialFeats: 1 });
    add(`stock-met-${row.name}`, { sent: [row.name], racialFeats: 1, who: { ...who(), abilities: { str: 20, dex: 20, con: 20, int: 20, wis: 20, cha: 20 }, armor: ["light", "medium", "heavy"], casts: true, raceId: "high_elf", raceName: "Elf" } });
  }
  const pack = [
    "Requires Dexterity 13 or higher", "*Wisdom 13 or higher*", "N/A", "none", "-",
    "Prerequisite: Proficiency with Survival, 8th level or higher",
    "Wisdom 13 or higher and the Ki class feature", "Strength or Dexterity 13 or higher",
    "Proficiency in one of the following skills: Stealth or Survival",
    "Proficiency with at least one type of vehicle", "Proficiency with a martial weapon",
    "Proficiency with a simple ranged weapon", "Proficiency with ranged weapons",
    "Proficiency with melee weapons", "Proficiency with navigator's tools",
    "Fame 13 or higher", "The ability to cast spells", "Ability to cast one spell",
    "You gain proficiency in the Stealth and Survival skills.", "8th level or higher",
  ];
  for (const [index, prerequisite] of pack.entries()) {
    const catalog = [{ name: "云海专长", desc: "", prerequisite }];
    add(`pack-unmet-${index}`, { sent: ["云海专长"], racialFeats: 1 }, catalog);
    add(`pack-met-${index}`, { sent: ["云海专长"], racialFeats: 1, who: { ...who(), abilities: { str: 20, dex: 20, con: 20, int: 20, wis: 20, cha: 20 }, casts: true, skills: ["survival"], tools: ["vehicles (land)"], weapons: ["Longbow", "simple"], level: 20 } }, catalog);
    add(`pack-unspecified-${index}`, { sent: ["云海专长"], racialFeats: 1, who: { abilities: scores(), armor: [], casts: false, raceId: "human", raceName: "Human" } }, catalog);
  }
  const featureBase = { sent: [], held: [], raceTraits: [], backgroundFeature: null, derived: [], allowPlainStory: false, sameBackground: false };
  const features = [
    ["feature-story-unearned", { sent: [{ name: "钟楼{boon}\n祝福", source: "story" }] }],
    ["feature-feat-unearned", { sent: [{ name: "Extra Attack", source: "feat" }] }],
    ["feature-import-plain", { sent: [{ name: "钟楼祝福", source: "story" }], allowPlainStory: true }],
    ["feature-import-mechanical", { sent: [{ name: "Extra Attack", source: "story" }], allowPlainStory: true }],
    ["feature-held", { sent: [{ name: "Extra Attack", source: "feat" }], held: [{ name: "Extra Attack", source: "feat" }] }],
    ["feature-choice-and-invalid", { sent: [{ name: "Fighting Style: Defense", source: "choice" }, { name: "fictional_style", source: "choice" }] }],
    ["feature-granted", { sent: [{ name: "Sneak Attack", source: "class" }], raceTraits: ["云海步"], derived: ["Racial cantrip: Light"], backgroundFeature: "钟楼学者 (Sage)" }],
    ["feature-background-held", { sent: [{ name: "钟楼学者", source: "background" }], held: [{ name: "钟楼学者", source: "background" }], sameBackground: true, backgroundFeature: "钟楼学者 (Sage)" }],
  ].map(([name, input]) => ({ name, input: { ...featureBase, ...input } }));
  const half = [
    ["half-no-picks", []], ["half-fixed-actor", [{ feat: "Actor", ability: null }]],
    ["half-missing", [{ feat: "Resilient", ability: null }]],
    ["half-valid-save", [{ feat: "Resilient", ability: "con" }]],
    ["half-invalid", [{ feat: "Fey Touched", ability: "str" }]],
    ["half-sequential-refusal", [{ feat: "Actor", ability: null }, { feat: "Resilient", ability: null }]],
    ["half-pack-missing", [{ feat: "云海专长", ability: null, desc: "Increase your Strength or Wisdom by 1, to a maximum of 20." }]],
    ["half-pack-valid", [{ feat: "云海专长", ability: "wis", desc: "Increase your Strength or Wisdom by 1, to a maximum of 20." }]],
    ["half-capped", [{ feat: "Resilient", ability: "str" }], { ...scores(), str: 20 }],
  ].map(([name, picks, abilities]) => ({ name, abilities: abilities ?? scores(), picks }));
  const proficiencies = () => ({ saves: [], skills: ["athletics"], expertise: ["athletics"], languages: ["Common"], tools: ["thieves' tools"], weapons: [], armor: ["light"] });
  const grants = [];
  const grant = (name, feat, choices, desc, strict = true) => grants.push({ name, input: { proficiencies: proficiencies(), feats: [{ name: feat, desc: desc ?? stock.find(row => row.name === feat).desc }], choices: { [feat]: choices }, strict } });
  grant("grant-owed-languages", "Linguist", {});
  grant("grant-language-duplicate", "Linguist", { languages: ["Common", "Elvish", "云海语"] });
  grant("grant-skills-unknown-and-held", "Skilled", { skills: ["not_a_skill", "athletics", "arcana"] });
  grant("grant-expertise-missing-training", "Skill Expert", { skills: ["arcana"], expertise: ["history"] });
  grant("grant-expertise-duplicate", "Skill Expert", { skills: ["arcana"], expertise: ["athletics"] });
  grant("grant-tools-outside", "云海工具", { tools: ["flute"] }, "You gain proficiency with one type of artisan's tools of your choice.");
  grant("grant-tools-duplicate", "云海工具", { tools: ["thieves' tools"] }, "You gain proficiency with one tool of your choice.");
  grant("grant-weapons-unknown", "Weapon Master", { weapons: ["not_a_weapon", "Longsword", "Shortbow", "Dagger"] });
  grant("grant-weapons-outside", "云海武器", { weapons: ["Dagger"] }, "You gain proficiency with a martial weapon or shields.");
  grant("grant-armor-outside", "云海护甲", { armor: ["heavy"] }, "You gain proficiency with a martial weapon or shields.");
  grant("grant-armor-duplicate", "云海护甲", { armor: ["light"] }, "You gain proficiency with disguise kit or light armor.");
  grant("grant-damage-outside", "Elemental Adept", { damageType: "radiant" });
  grant("grant-damage-missing", "Elemental Adept", {});
  grant("grant-valid", "Skill Expert", { skills: ["arcana"], expertise: ["arcana"] });
  grant("grant-nonstrict", "Skilled", { skills: ["not_a_skill", "athletics", "arcana"] }, undefined, false);
  grant("grant-shared-owed", "云海组合", {}, "You gain proficiency in any combination of three skills or tools of your choice.");
  grant("grant-combined-owed", "云海组合", {}, "You learn three languages. You gain proficiency in one skill of your choice and expertise in one skill of your choice. You gain proficiency with two weapons of your choice. You gain proficiency with one tool of your choice.");
  return { feats, features, half, grants };
}

export async function characterFeatRuns() {
  const { judgeFeats, judgeFeatures } = await import("../../src/lib/srd/legality/features.ts");
  const { applyHalfFeats } = await import("../../src/lib/srd/legality/half-feats.ts");
  const { applyFeatGrants } = await import("../../src/lib/srd/feat-grants.ts");
  const rows = characterFeatFixtures();
  const runs = [];
  for (const [kind, validate] of [
    ["feats", (row, sink) => judgeFeats({ ...row.input, onProblem: sink })],
    ["features", (row, sink) => judgeFeatures({ ...row.input, onProblem: sink })],
    ["half", (row, sink) => applyHalfFeats(row.abilities, row.picks, sink)],
    ["grants", (row, sink) => applyFeatGrants({ ...row.input, onProblem: sink })],
  ]) for (const row of rows[kind]) {
    const reported = [];
    const result = validate(row, detail => reported.push(detail));
    runs.push({ ...row, kind, result, reported, problems: result.problems ?? (result.error ? [result.error] : []) });
  }
  return runs;
}
