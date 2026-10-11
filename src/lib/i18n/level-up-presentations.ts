import { ALL_CLASSES } from "../srd/index.ts";
import { describeGrant, describePrereq, multiclassPrereq, type MulticlassGrant } from "../srd/multiclass.ts";
import { abilityLabel, characterLabel, subclassLabel } from "./character-presentations.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { featTermLabel } from "./feat-presentations.ts";
import { trainingLabel } from "./training-presentations.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { playEditNotice } from "./play-edit-presentations.ts";
import type { AppLocale } from "./locales.ts";

export function levelUpPrerequisite(classId: string, locale: AppLocale): string {
  if (locale === "en") return describePrereq(classId);
  const t = createTranslator(locale), requirements = multiclassPrereq(classId);
  return requirements ? requirements.map(group => group.map(id => `${abilityLabel(id, locale)} 13`).join(t("ruleDetail.requirementAnd"))).join(t("ruleDetail.requirementOr")) : t("ruleDetail.noPrerequisite");
}
function prerequisiteText(source: string, locale: AppLocale): string {
  const row = ALL_CLASSES.find(entry => describePrereq(entry.id) === source);
  return row ? levelUpPrerequisite(row.id, locale) : source;
}
function grantTerm(source: string, locale: AppLocale): string {
  const row = Object.entries(catalogFor("en", "sessionUi.level.grantTerm.")).find(([, name]) => name === source);
  if (row) return createTranslator(locale)(row[0] as MessageKey);
  const equipment = referenceDisplayName("equipment", source, locale);
  return equipment !== source ? equipment : trainingLabel("toolCategory", trainingLabel("tool", source, locale), locale);
}

export function levelUpGrants(grant: MulticlassGrant, locale: AppLocale): string {
  if (locale === "en") return describeGrant(grant);
  const t = createTranslator(locale);
  const parts = [
    ...grant.armor.map(name => featTermLabel("armorTraining", name.replace(/ armor$/, ""), locale)),
    ...grant.weapons.map(name => name === "simple weapons" ? t("sessionUi.level.grant.simple") : name === "martial weapons" ? t("sessionUi.level.grant.martial") : grantTerm(name, locale)),
    ...grant.tools.map(name => name === "one musical instrument" ? t("sessionUi.level.grant.instrument") : grantTerm(name, locale)),
  ];
  if (grant.skillChoice) parts.push(t(grant.skillChoice.from.length ? "sessionUi.level.grant.classSkill" : "sessionUi.level.grant.anySkill"));
  return parts.length ? parts.join(t("sessionUi.level.list")) : t("sessionUi.level.grant.none");
}
export function levelUpClassLine(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const match = /^ \((.+) (\d+)\)$/.exec(source);
  return match ? createTranslator(locale)("sessionUi.level.classLine", { class: characterLabel("class", match[1], locale), level: match[2] }) : source;
}

// Whole known frames only. Stored server responses and history remain English;
// unknown authored diagnostics are kept intact. No choice or rule computation.
export function levelUpNotice(source: string, locale: AppLocale): string {
  if (locale === "en" || !source) return source;
  const t = createTranslator(locale);
  for (const prefix of ["sessionUi.level.block.", "sessionUi.level.extra.", "sessionUi.level.error.", "sessionUi.level.spell."]) {
    for (const [key, frame] of Object.entries(catalogFor("en", prefix))) {
      const names: string[] = [];
      const escaped = frame.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
      const pattern = escaped.replace(/\{(\w+)\}/g, (_, name: string) => {
        if (names.includes(name)) return `\\k<${name}>`;
        names.push(name);
        return `(?<${name}>${["level", "required", "xp", "count", "amount"].includes(name) ? "\\d+" : "[\\s\\S]+?"})`;
      });
      const match = new RegExp(`^${pattern}$`).exec(source);
      if (!match) continue;
      const args = { ...match.groups };
      if (args.class) args.class = characterLabel("class", args.class, locale);
      if (args.requirements) args.requirements = prerequisiteText(args.requirements, locale);
      if (prefix === "sessionUi.level.spell." && args.name) args.name = referenceDisplayName("spell", args.name, locale);
      return t(key as MessageKey, args);
    }
  }
  if (source === "The level-up was refused.") return t("sessionUi.level.refused");
  if (source === "Could not reach the server.") return t("sessionUi.level.network");
  const school = /^An (Eldritch Knight|Arcane Trickster) of level (\d+) learns (\w+) and (\w+) spells, and (\d+) from any other school; this would make (\d+)\. Pick an \3 or \4 spell instead\.$/.exec(source);
  if (school) return t("sessionUi.level.schoolRefusal", {
    subclass: subclassLabel(school[1] === "Eldritch Knight" ? "fighter" : "rogue", school[1], locale),
    level: school[2], first: spellGearTermLabel("school", school[3], locale), second: spellGearTermLabel("school", school[4], locale), limit: school[5], count: school[6],
  });
  return playEditNotice(source, locale);
}
