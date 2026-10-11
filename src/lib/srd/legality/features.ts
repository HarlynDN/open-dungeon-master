// Features and feats: what a request may carry, and what it may not.
//
// Class features, racial traits and the background's feature are granted by
// the server from its tables, so a request's copies are dropped. A "choice"
// feature is the player's pick from a list a class opens (a fighting style,
// an invocation) and is kept only when it names a real option. A "story" or
// "feat" feature is how whoever runs the table hands out a boon in play: a
// PLAYER's request may keep the ones the stored character already holds and
// may add none, because the engines read features by name and a name like
// "Extra Attack (3)" carries the real mechanic whatever its source says.
import { ruleReporter, ruleTerm, type RuleFeatCondition, type RuleFeatPrerequisite, type RuleProblemSink } from "@/lib/characters/problems";
import type { Ability, AbilityScores, SheetFeature } from "@/lib/schemas/sheet";
import { ALL_CLASSES, SRD_RACES } from "@/lib/srd";
import { ALL_SKILLS } from "@/lib/content/mechanics";
import { readsAsRules } from "@/lib/srd/feat-text";
import { SRD_ARMOR, isArmorProficient } from "@/lib/srd/armor";
import { SRD_WEAPONS } from "@/lib/srd/weapons";
import { populateResources } from "@/lib/srd/class-resources";
import {
  chosenFightingStyles,
  combatRiders,
  defenseRiders,
  FIGHTING_STYLES,
} from "@/lib/srd/feature-effects";
import { classFeaturesFor, subclassNamesFor } from "@/lib/srd/features";
import { findOptionByFeatureName } from "@/lib/srd/options";
import { ABILITY_NAMES, lower, type FeatFacts } from "@/lib/srd/legality/types";

let tableNames: Set<string> | null = null;

// Every name a class table, a subclass table or a bundled race hands out.
function grantedNames(): Set<string> {
  if (tableNames) {
    return tableNames;
  }
  const names = new Set<string>();
  for (const klass of ALL_CLASSES) {
    for (const subclass of ["", ...subclassNamesFor(klass.id)]) {
      for (const feature of classFeaturesFor(klass.id, subclass, 20)) {
        names.add(lower(feature.name));
      }
    }
  }
  for (const race of SRD_RACES) {
    for (const trait of race.traits) {
      names.add(lower(trait));
    }
  }
  tableNames = names;
  return names;
}

const flat = (value: unknown) =>
  JSON.stringify(value, (_key, entry) => (entry instanceof Set ? [...entry] : entry));

const PLAIN = { class: "", level: 20, features: [] as Array<{ name: string }> };
let plainRiders: string | null = null;

// Whether a feature of this name does something in the engines: it sizes a
// counter, moves a combat or defense number, or is a name the class and race
// tables grant. A name that does none of these is a line of text.
export function isMechanicalFeature(name: string): boolean {
  const key = lower(name);
  if (!key) {
    return false;
  }
  if (grantedNames().has(key)) {
    return true;
  }
  if (findOptionByFeatureName(name) || chosenFightingStyles([{ name }]).length) {
    return true;
  }
  if (Object.keys(populateResources([{ name }], 20, {}, undefined)).length) {
    return true;
  }
  plainRiders ??= flat([combatRiders(PLAIN), defenseRiders(PLAIN)]);
  const held = { ...PLAIN, features: [{ name }] };
  return flat([combatRiders(held), defenseRiders(held)]) !== plainRiders;
}

// A pick from a list a class feature opens. Whether the class has the slot
// for it is populateFeaturesForClasses's to decide; this is only "is it a
// pick at all".
export function isChoiceFeature(name: string): boolean {
  if (findOptionByFeatureName(name)) {
    return true;
  }
  const [style] = chosenFightingStyles([{ name }]);
  return (
    style !== undefined &&
    FIGHTING_STYLES.some((entry) => lower(entry.name) === lower(style))
  );
}

export type FeatureInput = {
  onProblem?: RuleProblemSink;
  sent: SheetFeature[];
  // Features the stored character holds, on an edit.
  held: SheetFeature[];
  // Trait names of a race the bundled tables do not describe, from the
  // catalog's own row.
  raceTraits: string[];
  // The background feature of a background the bundled tables do not
  // describe, already in "Feature (Background)" form.
  backgroundFeature: string | null;
  // Story features the server itself derives (a non-caster's racial cantrip).
  derived: string[];
  // A file may carry boons earned at another table; they are kept when
  // their names do nothing in the engines.
  allowPlainStory: boolean;
  // Whether the stored character has the background the request names.
  sameBackground: boolean;
};

export type FeatureVerdict = { problems: string[]; features: SheetFeature[] };

export function judgeFeatures(input: FeatureInput): FeatureVerdict {
  const problems: string[] = [];
  const report = ruleReporter(problems, input.onProblem);
  const features: SheetFeature[] = [];
  const held = new Map(input.held.map((feature) => [lower(feature.name), feature]));
  const derived = new Set(input.derived.map(lower));
  for (const feature of input.sent) {
    const key = lower(feature.name);
    if (feature.source === "choice") {
      if (isChoiceFeature(feature.name)) {
        features.push({ name: feature.name, source: "choice" });
      }
      continue;
    }
    if (feature.source === "background") {
      // The background's feature is the server's to grant. One the stored
      // character already holds under the same background stays as it is
      // written there.
      const kept = held.get(key);
      if (input.sameBackground && kept?.source === "background") {
        features.push(kept);
      }
      continue;
    }
    if (feature.source !== "story" && feature.source !== "feat") {
      // Class and race entries are the server's to grant.
      continue;
    }
    if (derived.has(key)) {
      continue;
    }
    const earned = held.get(key);
    if (earned && (earned.source === "story" || earned.source === "feat")) {
      features.push(earned);
      continue;
    }
    if (input.allowPlainStory && !isMechanicalFeature(feature.name)) {
      features.push({ name: feature.name, source: feature.source });
      continue;
    }
    report("ruleProblem.featureUnearned", { feature: feature.name, source: ruleTerm("featureSource", feature.source) },
      `"${feature.name}" is a ${feature.source} feature, and those are granted in play by whoever runs the table; a character's features come from its class, race and background. Remove it.`,
    );
  }
  for (const name of input.derived) {
    features.push({ name: name.slice(0, 80), source: "story" });
  }
  for (const name of input.raceTraits) {
    features.push({ name: name.slice(0, 80), source: "race" });
  }
  const granted = (input.backgroundFeature ?? "").slice(0, 80);
  // Not beside a stored copy of the same feature under a shorter name.
  const stem = lower(granted.replace(/\s*\([^)]*\)\s*$/, ""));
  if (
    granted &&
    !features.some(
      (feature) =>
        feature.source === "background" &&
        (lower(feature.name) === lower(granted) || lower(feature.name) === stem),
    )
  ) {
    features.push({ name: granted, source: "background" });
  }
  return { problems, features };
}

// ---- feats ----

export type FeatInput = {
  onProblem?: RuleProblemSink;
  sent: string[];
  // Feats taken with an improvement, as the sheet records them.
  recorded: string[];
  // Feats the race hands out (the variant human's one).
  racialFeats: number;
  // Improvements earned that the sheet records no choice for: each may have
  // been a feat taken in play.
  unrecordedSlots: number;
  held: string[];
  featOf: (name: string) => FeatFacts | null;
  who: FeatCandidate;
};

export type FeatCandidate = {
  abilities: AbilityScores;
  armor: string[];
  casts: boolean;
  raceId: string;
  raceName: string;
  // Known where the caller has them; a prerequisite that asks about one
  // the caller left out is not checked.
  skills?: string[];
  tools?: string[];
  weapons?: string[];
  level?: number;
};

const ABILITY_BY_NAME = Object.fromEntries(
  Object.entries(ABILITY_NAMES).map(([id, name]) => [name.toLowerCase(), id as Ability]),
);

// A prerequisite as the packs write it, down to its requirements: "*Wisdom
// 13 or higher*" (Tome of Heroes' emphasis), "Requires Dexterity 13 or
// higher", "Prerequisite: Proficiency with Survival, 8th level or higher",
// "N/A". A field holding the feat's rules instead (see feat-text.ts) asks
// nothing.
function prerequisiteText(raw: string): string {
  const text = raw
    .replace(/[*_]/g, "")
    .replace(/^\s*(?:prerequisites?:?|requires|requirements?:?)\s*/i, "")
    .replace(/[.\s]+$/, "")
    .trim();
  if (/^(?:n\/a|none|-)$/i.test(text) || readsAsRules(text)) {
    return "";
  }
  return text;
}

const MARTIAL_WEAPONS = SRD_WEAPONS.filter((weapon) => weapon.category === "martial").map((weapon) => weapon.name.toLowerCase());
const RANGED_WEAPONS = SRD_WEAPONS.filter((weapon) => weapon.kind === "ranged").map((weapon) => weapon.name.toLowerCase());

// Whether one requirement is not met. A requirement of a kind the server
// cannot check (a prestige rating, a class feature by name) is met.
// Classify the prerequisite source once for both enforcement and display.
// An uncheckable condition retains its source; it is never silently omitted.
function requirementOf(requirement: string): RuleFeatCondition {
  const part = requirement.toLowerCase().replace(/^(?:the|a|an) /, "").trim();
  const scores = /^(\w+)(?: or (\w+))? (\d+)(?: or higher)?$/.exec(part);
  if (scores) {
    const abilities = [scores[1], scores[2]].filter(Boolean)
      .map((name) => ABILITY_BY_NAME[name.toLowerCase()]).filter(Boolean);
    return abilities.length ? { type: "abilities", abilities, minimum: Number(scores[3]) } : { type: "source", value: requirement };
  }
  const armor = /^proficiency with (light|medium|heavy) armor$/.exec(part);
  if (armor) return { type: "armor", weight: armor[1] as "light" | "medium" | "heavy" };
  if (/^(?:ability to cast (?:at least )?one spell|ability to cast spells|spellcasting or pact magic)$/.test(part)) return { type: "casting" };
  if (/^elf or half-elf$/.test(part)) return { type: "elf" };
  const level = /^(\d+)(?:st|nd|rd|th) level or higher$/.exec(part);
  if (level) return { type: "level", minimum: Number(level[1]) };
  const trained = /^proficiency (?:in|with) (?:at least )?(?:one of the following skills: )?(.+?)(?: skills?)?$/.exec(part);
  if (!trained) return { type: "source", value: requirement };
  const wanted = trained[1];
  const skills = ALL_SKILLS.filter((id) => new RegExp(`\\b${id.replace(/_/g, " ")}\\b`).test(wanted));
  if (skills.length) return { type: "skills", skills };
  if (/\btype of vehicle\b|\bvehicles?\b/.test(wanted)) return { type: "vehicle" };
  const weapon = /^(?:one |a )?(martial|simple|ranged|melee)(?: (ranged|melee))? weapons?$/.exec(wanted);
  if (weapon) return { type: "weapons", category: weapon[1] as "martial" | "simple" | "ranged" | "melee", form: weapon[2] as "ranged" | "melee" || null };
  return { type: "source", value: requirement };
}

function requirementUnmet(requirement: RuleFeatCondition, who: FeatCandidate): boolean {
  switch (requirement.type) {
    case "abilities": return !requirement.abilities.some((ability) => who.abilities[ability] >= requirement.minimum);
    case "armor": {
      const sample = { light: "Leather", medium: "Breastplate", heavy: "Plate" }[requirement.weight];
      const piece = SRD_ARMOR.find((entry) => entry.name === sample);
      return !(piece && isArmorProficient(who.armor, piece));
    }
    case "casting": return !who.casts;
    case "elf": return !/elf|drow/i.test(`${who.raceId} ${who.raceName}`);
    case "level": return who.level !== undefined && who.level < requirement.minimum;
    case "skills": return who.skills !== undefined && !requirement.skills.some((skill) => who.skills!.some((held) => lower(held) === skill));
    case "vehicle": return who.tools !== undefined && !who.tools.some((tool) => /vehicle/i.test(tool));
    case "weapons": {
      if (who.weapons === undefined) return false;
      const held = who.weapons.map(lower);
      const names = requirement.category === "martial" ? MARTIAL_WEAPONS : requirement.category === "ranged" || requirement.form === "ranged" ? RANGED_WEAPONS : [];
      const broad = requirement.category === "simple" ? ["simple", "martial"] : requirement.category === "martial" ? ["martial"] : ["simple", "martial"];
      return !(held.some((entry) => broad.includes(entry)) || held.some((entry) => names.includes(entry)));
    }
    case "source": return false;
  }
}

function prerequisiteParts(text: string): RuleFeatPrerequisite {
  return { kind: "featPrerequisite", parts: text
    .split(/\s+and\s+|,\s*(?=(?:proficien|strength|dexterity|constitution|intelligence|wisdom|charisma|the ability|ability)\b|\d)/i)
    .map((entry) => entry.trim()).filter(Boolean).map(requirementOf) };
}

// What a feat's prerequisite asks that this character does not meet, or
// null. Each requirement in turn ("Wisdom 13 or higher and the Ki class
// feature", "Proficiency with Survival, 8th level or higher"); one the
// server cannot check is left to the table.
export function unmetPrerequisite(prerequisite: string, who: FeatCandidate): string | null {
  const text = prerequisiteText(prerequisite);
  if (!text) {
    return null;
  }
  return prerequisiteParts(text).parts.some((requirement) => requirementUnmet(requirement, who)) ? text : null;
}

export type FeatVerdict = { problems: string[]; feats: string[]; slotsUsed: number };

export function judgeFeats(input: FeatInput): FeatVerdict {
  const problems: string[] = [];
  const report = ruleReporter(problems, input.onProblem);
  const held = new Set(input.held.map(lower));
  const seen = new Set<string>();
  const feats: string[] = [];
  for (const name of [...input.recorded, ...input.sent]) {
    const key = lower(name);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    feats.push(name);
  }
  const recorded = new Set(input.recorded.map(lower));
  const extra = feats.filter((name) => !recorded.has(lower(name)) && !held.has(lower(name)));
  const room = input.racialFeats + input.unrecordedSlots;
  if (extra.length > room) {
    report(room ? "ruleProblem.featLimit" : "ruleProblem.featNoImprovement", { count: extra.length, room, feats: extra.map(name => ruleTerm("feat", name)) },
      room
        ? `This character has room for ${room} feat${room === 1 ? "" : "s"} beyond the improvements on record; ${extra.join(", ")} ${extra.length === 1 ? "is" : "are"} too many.`
        : `A feat is taken in place of an Ability Score Improvement; ${extra.join(", ")} ${extra.length === 1 ? "has" : "have"} no improvement behind ${extra.length === 1 ? "it" : "them"}.`,
    );
  }
  for (const name of feats) {
    if (held.has(lower(name))) {
      continue;
    }
    const facts = input.featOf(name);
    if (!facts) {
      report("ruleProblem.featUnknown", { feat: ruleTerm("feat", name) }, `"${name}" is not a feat this server knows; pick one from the feat list.`);
      continue;
    }
    const unmet = unmetPrerequisite(facts.prerequisite, input.who);
    if (unmet) {
      report("ruleProblem.featPrerequisite", { feat: ruleTerm("feat", facts.name), requirement: prerequisiteParts(unmet) }, `${facts.name} requires ${unmet}, which this character does not have.`);
    }
  }
  // Feats beyond the race's own were paid for with improvements taken in play.
  const slotsUsed = Math.max(0, extra.length - input.racialFeats);
  return { problems, feats, slotsUsed };
}
