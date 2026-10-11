import { scopedCatalog } from "./translator.ts";
import { builderTermLabel } from "./builder-name-presentations.ts";
import type { CHARACTER_NAME_MESSAGES as CHARACTER_NAME_MESSAGES_Shape } from "./character-name-messages.ts";
import type { CHARACTER_EXTRA_NAME_MESSAGES as CHARACTER_EXTRA_NAME_MESSAGES_Shape } from "./character-extra-name-messages.ts";
import { CHARACTER_SUBCLASS_METADATA } from "./character-subclass-metadata.ts";
import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { readUiResponse, requestErrorText, type ApiUiError, type UiRequestError } from "./api-errors.ts";
import { accountRequestError } from "./account-presentations.ts";
import { refusalText } from "../../app/characters/builder/refusal.ts";
import type { Genre } from "../schemas/game-settings.ts";
import { createSheetSchema } from "../schemas/sheet.ts";
import { CHARACTER_RULE_CODES } from "./character-rule-messages.ts";
import type { CHARACTER_RULE_MESSAGES as CHARACTER_RULE_MESSAGES_Shape } from "./character-rule-messages.ts";
import { referenceDisplayName } from "./references.ts";
import type { RuleValue, RuleProblemDetail, RuleFeatCondition } from "../characters/problems.ts";
import { trainingLabel } from "./training-presentations.ts";
import { featTermLabel } from "./feat-presentations.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";

const nameKey = (value: string) => value.trim().toLowerCase().replace(/[ -]+/g, "_");

export function characterLabel(kind: "race" | "class" | "background", value: string, locale: AppLocale): string {
  const names = { ...CHARACTER_NAME_MESSAGES.en, ...CHARACTER_EXTRA_NAME_MESSAGES.en };
  const direct = `rule.${kind}.${nameKey(value)}`;
  const prefix = `rule.${kind}.`;
  const key = Object.hasOwn(names, direct) ? direct : Object.keys(names).find((key) => key.startsWith(prefix) && names[key as keyof typeof names].toLowerCase() === value.trim().toLowerCase());
  return key ? createTranslator(locale)(key as MessageKey) : value;
}
export function subclassLabel(classId: string, value: string, locale: AppLocale): string {
  const rows = CHARACTER_SUBCLASS_METADATA[nameKey(classId) as keyof typeof CHARACTER_SUBCLASS_METADATA];
  const matches = rows?.filter((row) => [row.name, ...row.aliases].some((name) => name.toLowerCase() === value.trim().toLowerCase()));
  return matches?.length === 1 ? createTranslator(locale)(matches[0].key) : value;
}
export function characterCopyName(name: string, locale: AppLocale): string { return createTranslator(locale)("library.copyName", { name }); }
const EVENT_KINDS = ["achievement", "item", "relationship", "death", "level_up", "story"] as const;
export function characterEventLabel(kind: string, locale: AppLocale): string {
  return EVENT_KINDS.some((entry) => entry === kind) ? createTranslator(locale)(`sheet.event.${kind}` as MessageKey) : kind;
}
const ABILITY_IDS = ["str", "dex", "con", "int", "wis", "cha"] as const;
export function abilityLabel(id: string, locale: AppLocale, short = false): string {
  return ABILITY_IDS.some((entry) => entry === id) ? createTranslator(locale)(`sheet.${short ? "abilityShort" : "ability"}.${id}` as MessageKey) : id;
}
const SKILL_IDS = ["acrobatics", "animal_handling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleight_of_hand", "stealth", "survival"];
export function skillLabel(id: string, locale: AppLocale): string {
  return SKILL_IDS.includes(id) ? createTranslator(locale)(`sheet.skill.${id}` as MessageKey) : id;
}
const DERIVED_LABELS = { proficiency: "proficiency", features: "features", "subclass features": "subclass", "magic items": "items", expertise: "expertise", "half proficiency": "half", untrained: "untrained", base: "base", Perception: "perception", Investigation: "investigation" } as const;
export function derivedLabel(label: string, locale: AppLocale): string {
  const ability = /^(STR|DEX|CON|INT|WIS|CHA) modifier$/.exec(label);
  if (ability) return createTranslator(locale)("sheet.derived.ability", { ability: locale === "en" ? ability[1] : abilityLabel(ability[1].toLowerCase(), locale) });
  const key = DERIVED_LABELS[label as keyof typeof DERIVED_LABELS];
  return key ? createTranslator(locale)(`sheet.derived.${key}`) : label;
}

export type CharacterUiError = UiRequestError & { data: ApiUiError & { problems?: string[]; problemDetails?: unknown; fileName?: string }; status?: number };
class CharacterRequestFailure extends Error {
  readonly ui: CharacterUiError;
  constructor(ui: CharacterUiError) { super(ui.data.error ?? ui.fallback); this.ui = ui; }
}
export async function readCharacterResponse<T>(request: Promise<Response>, fallback: MessageKey): Promise<T> {
  let status: number | undefined;
  try {
    const response = await request; status = response.status;
    return await readUiResponse<T>(Promise.resolve(response), fallback);
  } catch (cause) {
    throw new CharacterRequestFailure({ ...accountRequestError(cause, status === undefined ? "prep.networkError" : fallback), status });
  }
}
export function characterRequestError(cause: unknown, fallback: MessageKey): CharacterUiError {
  return cause instanceof CharacterRequestFailure ? cause.ui : accountRequestError(cause, fallback);
}
export const CHARACTER_ERROR_KEYS = {
  "Character not found.": "library.notFound", "Character not found in your library.": "seat.libraryMissing",
  "You already have a character in this campaign.": "seat.taken", "Characters can only be changed in the lobby.": "seat.lobbyOnly",
  "This server has no image model to paint with. Upload a portrait instead.": "seat.noImage",
} satisfies Record<string, MessageKey>;
export function characterErrorText(error: CharacterUiError | null, locale: AppLocale): string {
  if (!error) return "";
  const t = createTranslator(locale);
  if (error.data.fileName) return t("library.importJson", { name: error.data.fileName });
  const known = error.data.error && CHARACTER_ERROR_KEYS[error.data.error as keyof typeof CHARACTER_ERROR_KEYS];
  if (known) return t(known);
  // English stays in the original protocol. Every other locale uses the
  // coded diagnostic; migration gaps retain each complete source problem.
  if (locale === "en") return refusalText(error.data, requestErrorText(locale, error));
  const rules = characterRuleProblems(error.data, locale);
  if (rules) return rules;
  return requestErrorText(locale, error);
}

const RULE_TERM_KINDS = ["class", "race", "background", "ability", "skill", "spell", "equipment", "tool", "language", "feat", "armorTraining", "damage", "featureSource", "school", "spellKind", "spellCountKind", "kitOption", "toolCategory", "optionCategory", "castingKind", "fightingStyle"];
const KIT_SLOT_FILTERS = ["simple", "simple-melee", "martial", "martial-melee", "instrument"];
const FEAT_PICK_KINDS = ["skills", "languages", "tools", "weapons", "armor", "expertise", "damage"];
const ruleStrings = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 100 && value.every(entry => typeof entry === "string");
const ruleCount = (value: unknown) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;
function isFeatCondition(value: unknown): value is RuleFeatCondition {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const row = value as Record<string, unknown>;
  if (["casting", "elf", "vehicle"].includes(row.type as string)) return true;
  if (row.type === "source") return typeof row.value === "string";
  if (row.type === "armor") return ["light", "medium", "heavy"].includes(row.weight as string);
  if (row.type === "skills") return ruleStrings(row.skills) && row.skills.length > 0;
  if (row.type === "weapons") return ["simple", "martial", "ranged", "melee"].includes(row.category as string) && (row.form === null || ["ranged", "melee"].includes(row.form as string));
  const minimum = typeof row.minimum === "number" && Number.isInteger(row.minimum) && row.minimum >= 0;
  if (row.type === "level") return minimum;
  return row.type === "abilities" && minimum && ruleStrings(row.abilities) && row.abilities.length > 0 && row.abilities.length <= 6 && row.abilities.every(ability => ABILITY_IDS.some(id => id === ability));
}
export function isRuleValue(value: unknown, depth = 0): value is RuleValue {
  if (depth > 5) return false;
  if (typeof value === "string") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.length <= 100 && value.every(entry => isRuleValue(entry, depth + 1));
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  if (row.kind === "term") return typeof row.type === "string" && RULE_TERM_KINDS.includes(row.type) && typeof row.value === "string";
  if (row.kind === "abilityRequirement") return typeof row.minimum === "number" && Number.isFinite(row.minimum)
    && Array.isArray(row.alternatives) && row.alternatives.length <= 10
    && row.alternatives.every(group => Array.isArray(group) && group.length <= 6 && group.every(ability => typeof ability === "string" && ABILITY_IDS.some(id => id === ability)));
  if (row.kind === "skillOffers") return ruleStrings(row.fixed) && Array.isArray(row.offers) && row.offers.length <= 20
    && row.offers.every(offer => offer && typeof offer === "object" && ruleCount(offer.count)
      && (offer.from === null || ruleStrings(offer.from))
      && (offer.source === "repeated" || (isRuleValue(offer.source, depth + 1) && offer.source.kind === "term" && ["class", "race", "background"].includes(offer.source.type))));
  if (row.kind === "toolOffers") return Array.isArray(row.offers) && row.offers.length <= 20
    && row.offers.every(offer => offer && typeof offer === "object" && ruleCount(offer.count) && typeof offer.label === "string" && ruleStrings(offer.from));
  if (row.kind === "featPrerequisite") return Array.isArray(row.parts) && row.parts.length > 0 && row.parts.length <= 20 && row.parts.every(isFeatCondition);
  if (row.kind === "featPicks") return Array.isArray(row.picks) && row.picks.length > 0 && row.picks.length <= 20
    && row.picks.every(pick => pick && typeof pick === "object" && ruleCount(pick.count) && ruleStrings(pick.kinds) && pick.kinds.length > 0 && pick.kinds.length <= 7 && pick.kinds.every((kind: unknown) => typeof kind === "string" && FEAT_PICK_KINDS.includes(kind)));
  if (row.kind === "subclass") return typeof row.classId === "string" && typeof row.value === "string";
  if (row.kind === "featSpellPicks") return ["classList", "ability", "attackCantrip", "ritual"].every(key => typeof row[key] === "boolean")
    && ["cantrips", "spells", "spellLevel"].every(key => ruleCount(row[key])) && ruleStrings(row.schools)
    && (row.classList === true || row.ability === true || Number(row.cantrips) > 0 || Number(row.spells) > 0);
  if (row.kind === "kitSlot") return KIT_SLOT_FILTERS.includes(row.filter as string) && ruleStrings(row.except);
  if (row.kind === "gearAlternatives") return Array.isArray(row.alternatives) && row.alternatives.length > 0 && row.alternatives.length <= 20
    && row.alternatives.every(alt => alt && typeof alt === "object" && (alt.tools === null || (ruleStrings(alt.tools) && alt.tools.length > 0))
      && Array.isArray(alt.items) && alt.items.length <= 100 && alt.items.every((item: unknown) => item && typeof item === "object" && typeof (item as Record<string, unknown>).name === "string"
        && typeof (item as Record<string, unknown>).qty === "number" && Number.isInteger((item as Record<string, unknown>).qty) && Number((item as Record<string, unknown>).qty) > 0 && Number((item as Record<string, unknown>).qty) <= 999)
      && (alt.items.length > 0 || (Array.isArray(alt.tools) && alt.tools.length > 0)));
  return false;
}

export function ruleValueText(value: RuleValue, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return new Intl.ListFormat(locale, { type: "conjunction" }).format(value.map(entry => ruleValueText(entry, locale)));
  if (value.kind === "abilityRequirement") return value.alternatives.length
    ? value.alternatives.map(group => group.map(id => `${abilityLabel(id, locale)} ${value.minimum}`).join(t("ruleDetail.requirementAnd"))).join(t("ruleDetail.requirementOr"))
    : t("ruleDetail.noPrerequisite");
  if (value.kind === "skillOffers") {
    const offered = value.offers.map(offer => t("ruleDetail.skillOffer", {
      source: offer.source === "repeated" ? t("ruleDetail.repeatedSkill") : ruleValueText(offer.source, locale),
      count: offer.count,
      choices: offer.from === null ? t("ruleDetail.anySkill") : ruleValueText(offer.from.map(id => ({ kind: "term", type: "skill", value: id })), locale),
    })).join(" ") || t("ruleDetail.noSkillChoice");
    return offered + (value.fixed.length ? " " + t("ruleDetail.fixedSkills", { skills: ruleValueText(value.fixed.map(id => ({ kind: "term", type: "skill", value: id })), locale) }) : "");
  }
  if (value.kind === "toolOffers") return value.offers.map(offer => t("ruleDetail.toolOffer", {
    count: offer.count, category: trainingLabel("toolCategory", offer.label, locale),
    choices: ruleValueText(offer.from.map(name => ({ kind: "term", type: "tool", value: name })), locale),
  })).join("; ");
  if (value.kind === "featPrerequisite") return value.parts.map(part => {
    switch (part.type) {
      case "abilities": {
        const alternatives = part.abilities.map(ability => `${abilityLabel(ability, locale)} ${part.minimum}`).join(t("ruleDetail.requirementOr"));
        return part.abilities.length > 1 && value.parts.length > 1 ? t("ruleDetail.requirementGroup", { requirements: alternatives }) : alternatives;
      }
      case "armor": return t("ruleDetail.featArmorRequirement", { armor: featTermLabel("armorTraining", part.weight, locale) });
      case "casting": return t("ruleDetail.featCastingRequirement");
      case "elf": return t("ruleDetail.featElfRequirement");
      case "vehicle": return t("ruleDetail.featVehicleRequirement");
      case "level": return t("ruleDetail.featLevelRequirement", { minimum: part.minimum });
      case "skills": {
        const choices = t("ruleDetail.featSkillsRequirement", { skills: part.skills.map(skill => skillLabel(skill, locale)).join(t("ruleDetail.requirementOr")) });
        return part.skills.length > 1 && value.parts.length > 1 ? t("ruleDetail.requirementGroup", { requirements: choices }) : choices;
      }
      case "weapons": return t("ruleDetail.featWeaponsRequirement", { category: t(`ruleDetail.weaponCategory.${part.category}`), form: part.form ? t(`ruleDetail.weaponForm.${part.form}`) : "" });
      case "source": return t("ruleDetail.featSourceRequirement", { source: part.value });
    }
  }).join(t("ruleDetail.requirementAnd"));
  if (value.kind === "featPicks") return value.picks.map(pick => t("ruleDetail.featPick", {
    count: pick.count, kinds: pick.kinds.map(kind => t(`ruleDetail.featPick.${kind}`)).join(t("ruleDetail.requirementOr")),
  }).trim()).join(t("ruleDetail.listSeparator"));
  if (value.kind === "subclass") return subclassLabel(value.classId, value.value, locale);
  if (value.kind === "featSpellPicks") {
    const choices: string[] = [];
    if (value.classList) choices.push(t("ruleDetail.featSpellListPick"));
    if (value.ability) choices.push(t("ruleDetail.featSpellAbilityPick"));
    if (value.cantrips) choices.push(t("ruleDetail.featSpellCantripPick", { count: value.cantrips, kind: spellGearTermLabel("spellKind", value.attackCantrip ? "attack cantrip" : "cantrip", locale) }).trim());
    if (value.spells) choices.push(t("ruleDetail.featSpellLevelPick", {
      count: value.spells, level: value.spellLevel,
      schools: value.schools.length ? t("ruleDetail.featSpellSchoolsWord", { schools: value.schools.map(school => spellGearTermLabel("school", school, locale)).join(t("ruleDetail.requirementOr")) }) : "",
      ritual: value.ritual ? t("ruleDetail.featSpellRitualWord") : "",
    }).trim());
    return choices.join(t("ruleDetail.listSeparator"));
  }
  if (value.kind === "kitSlot") {
    const slot = t(`ruleDetail.kitSlot.${value.filter}`);
    return value.except.length ? t("ruleDetail.kitSlotExcept", { slot, except: ruleValueText(value.except.map(name => ({ kind: "term", type: "tool", value: name })), locale) }) : slot;
  }
  if (value.kind === "gearAlternatives") return value.alternatives.map(alt => alt.tools
    ? t("ruleDetail.gearToolChoice", { choices: ruleValueText(alt.tools.map(name => ({ kind: "term", type: "tool", value: name })), locale) })
    : alt.items.map(item => t("ruleDetail.gearQuantity", { item: ruleValueText({ kind: "term", type: "equipment", value: item.name }, locale), count: item.qty })).join(t("ruleDetail.listSeparator"))
  ).join(t("ruleDetail.requirementOr"));
  if (["class", "race", "background"].includes(value.type)) return characterLabel(value.type as "class" | "race" | "background", value.value, locale);
  if (value.type === "ability") return abilityLabel(value.value, locale);
  if (value.type === "skill") return trainingLabel("tool", skillLabel(value.value, locale), locale);
  if (value.type === "tool" || value.type === "language" || value.type === "toolCategory") return trainingLabel(value.type, value.value, locale);
  if (value.type === "optionCategory" || value.type === "castingKind" || value.type === "fightingStyle") return builderTermLabel(value.type, value.value, locale);
  if (value.type === "feat" || value.type === "armorTraining" || value.type === "damage" || value.type === "featureSource") return featTermLabel(value.type, value.value, locale);
  if (value.type === "school" || value.type === "spellKind" || value.type === "spellCountKind" || value.type === "kitOption") return spellGearTermLabel(value.type, value.value, locale);
  const name = referenceDisplayName(value.type as "spell" | "equipment", value.value, locale);
  return value.type === "equipment" ? trainingLabel("tool", name, locale) : name;
}

// Validate untrusted response data before interpreting it as a catalog key.
// Its source sentence must identify an actual problem, and every template
// argument must be present. Unknown or malformed metadata cannot erase one.
function usableRuleDetail(value: unknown): value is RuleProblemDetail {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const row = value as Record<string, unknown>;
  if (typeof row.english !== "string" || !row.args || typeof row.args !== "object" || Array.isArray(row.args)) return false;
  if (row.code === "untranslated") return true;
  if (typeof row.code !== "string" || !CHARACTER_RULE_CODES.some(code => code === row.code)) return false;
  if (!Object.values(row.args).every(entry => isRuleValue(entry))) return false;
  const placeholders = CHARACTER_RULE_MESSAGES.en[row.code as keyof typeof CHARACTER_RULE_MESSAGES.en].matchAll(/\{(\w+)\}/g);
  return [...placeholders].every(match => Object.hasOwn(row.args as object, match[1]));
}

export function characterRuleProblems(data: { problems?: unknown; problemDetails?: unknown }, locale: AppLocale): string {
  if (!Array.isArray(data.problems)) return "";
  const problems = data.problems.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "");
  if (locale === "en") return problems.join("\n");
  const details = Array.isArray(data.problemDetails) ? data.problemDetails.filter(usableRuleDetail) : [];
  const t = createTranslator(locale);
  return problems.map(source => {
    const detail = details.find(row => row.english === source && row.code !== "untranslated");
    if (!detail || detail.code === "untranslated") return t("ruleProblem.untranslated", { source });
    return t(detail.code, Object.fromEntries(Object.entries(detail.args).map(([key, value]) => [key, ruleValueText(value, locale)])));
  }).join("\n");
}

export function requireCharacter<T extends { id: string; name: string }>(data: { character?: T }): T {
  if (!data || typeof data !== "object" || !data.character || typeof data.character.id !== "string" || typeof data.character.name !== "string") throw new Error("Malformed character response.");
  const row = data.character as T & Record<string, unknown>;
  if (["race", "class", "subclass", "background"].some((key) => typeof row[key] !== "string") || typeof row.level !== "number" || !Number.isInteger(row.level) || row.level < 1 || row.level > 20) throw new Error("Malformed character identity.");
  if (row.sheet !== undefined && !createSheetSchema.safeParse(row.sheet).success) throw new Error("Malformed character sheet.");
  return data.character;
}
export function requireCharacterList<T extends { id: string; name: string }>(data: { characters?: T[] }): T[] {
  if (!data || typeof data !== "object" || !Array.isArray(data.characters)) throw new Error("Malformed character library response.");
  return data.characters.map((character) => requireCharacter({ character }));
}
export type SeatCampaign = { id: string; title: string; status?: string; kind?: string; isWorkshop?: boolean; startingLevel?: number };
export function seatCampaigns(data: { campaigns?: SeatCampaign[] }): SeatCampaign[] {
  if (!data || typeof data !== "object" || !Array.isArray(data.campaigns) || data.campaigns.some((row) => !row || typeof row.id !== "string" || typeof row.title !== "string")) throw new Error("Malformed campaign list response.");
  return data.campaigns.filter((row) => row.status !== "ended" && row.kind !== "workshop" && !row.isWorkshop);
}
export type CharacterCreationData<T> = { level: number; genre?: Genre; worldPackId: string; library: T[]; currentLibraryId: string | null; libraryLevel: number | null };
export function characterCreationData<T extends { id: string; name: string }>(
  campaignData: { campaign: { startingLevel: number; gameSettings: { genre?: Genre; worldPack?: string } } },
  charactersData: { characters: T[] },
  sheetData: { sheet: { libraryCharacterId?: string } | null; libraryLevel?: number | null },
): CharacterCreationData<T> {
  const campaign = campaignData?.campaign;
  if (!campaign || !Number.isInteger(campaign.startingLevel) || campaign.startingLevel < 1 || campaign.startingLevel > 20 || !campaign.gameSettings || !sheetData || !("sheet" in sheetData)
    || (sheetData.sheet !== null && typeof sheetData.sheet !== "object")) throw new Error("Malformed character creation data.");
  const library = requireCharacterList(charactersData);
  const libraryLevel = sheetData.libraryLevel ?? null;
  if (libraryLevel !== null && (!Number.isInteger(libraryLevel) || libraryLevel < 1 || libraryLevel > 20)) throw new Error("Malformed linked character level.");
  const currentLibraryId = sheetData.sheet?.libraryCharacterId ?? null;
  if (currentLibraryId !== null && typeof currentLibraryId !== "string") throw new Error("Malformed library character link.");
  return { level: campaign.startingLevel, genre: campaign.gameSettings.genre, worldPackId: campaign.gameSettings.worldPack ?? "", library, currentLibraryId, libraryLevel };
}

const CHARACTER_NAME_MESSAGES = scopedCatalog<typeof CHARACTER_NAME_MESSAGES_Shape>("rule.");

const CHARACTER_EXTRA_NAME_MESSAGES = scopedCatalog<typeof CHARACTER_EXTRA_NAME_MESSAGES_Shape>("rule.");

const CHARACTER_RULE_MESSAGES = scopedCatalog<typeof CHARACTER_RULE_MESSAGES_Shape>("rule");
