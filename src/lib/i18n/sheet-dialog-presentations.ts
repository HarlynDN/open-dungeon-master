import type { AppLocale } from "./locales.ts";
import { catalogFor, createTranslator, messageTemplate, type MessageKey } from "./translator.ts";
import { abilityLabel, characterLabel, derivedLabel, subclassLabel } from "./character-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { conditionLabel } from "./condition-presentations.ts";
import type { CharacterSheet } from "../schemas/sheet.ts";
import type { DerivedPart } from "../srd/index.ts";
import type { Encumbrance } from "../srd/encumbrance.ts";
import { formatModifier } from "../srd/index.ts";

const titleCase = (value: string) => value.replace(/[-_]/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());

function catalogLabel(value: string, prefix: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const source = catalogFor("en", prefix);
  const key = Object.keys(source).find(key => source[key as MessageKey]?.toLowerCase() === value.toLowerCase());
  return key ? createTranslator(locale)(key as MessageKey) : value;
}

export function sheetIdentity(sheet: CharacterSheet, locale: AppLocale): string {
  const classes = (sheet.classes?.length ?? 0) > 1
    ? (sheet.classes ?? []).map(entry => `${locale === "en" ? titleCase(entry.id) : characterLabel("class", entry.id, locale)} ${entry.level}`).join(" / ")
    : `${locale === "en" ? titleCase(sheet.class) : characterLabel("class", sheet.class, locale)}${sheet.subclass ? ` (${locale === "en" ? titleCase(sheet.subclass) : subclassLabel(sheet.class, sheet.subclass, locale)})` : ""}`;
  const alignment = catalogLabel(sheet.alignment ?? "", "builderPicker.alignment.", locale);
  return createTranslator(locale)("sheetDialog.identity", {
    level: sheet.level, race: locale === "en" ? titleCase(sheet.race) : characterLabel("race", sheet.race, locale), classes,
    background: sheet.background ? ` · ${locale === "en" ? titleCase(sheet.background) : characterLabel("background", sheet.background, locale)}` : "",
    alignment: sheet.alignment ? ` · ${alignment}` : "",
  });
}

export function sheetDerivedParts(parts: DerivedPart[], locale: AppLocale): string {
  return parts.map(part => `${formatModifier(part.value)} ${derivedLabel(part.label, locale)}`).join(", ");
}

export function sheetArmorParts(parts: string[], locale: AppLocale): string {
  return parts.map(part => {
    if (locale === "en") return part;
    const match = /^(.*) ([+-]?\d+)$/.exec(part);
    if (!match) return part;
    const label = /^(STR|DEX|CON|INT|WIS|CHA)$/.test(match[1])
      ? abilityLabel(match[1].toLowerCase(), locale, true)
      : catalogLabel(referenceDisplayName("equipment", match[1], locale), "sheetDialog.ac.", locale);
    return `${label} ${match[2]}`;
  }).join(" + ");
}

export function sheetLoadNote(load: Encumbrance, enabled: boolean, locale: AppLocale): string {
  const t = createTranslator(locale);
  const note = locale === "en" ? load.note ?? t("sheetDialog.load.none")
    : load.tier === "heavily_encumbered" ? t("sheetDialog.load.heavy", {carried: load.carriedLb, limit: load.heavilyEncumberedAtLb})
      : load.tier === "encumbered" ? t("sheetDialog.load.encumbered", {carried: load.carriedLb, limit: load.encumberedAtLb}) : t("sheetDialog.load.none");
  return (load.overCapacity ? t("sheetDialog.load.over", {capacity: load.capacityLb})
    : enabled ? t("sheetDialog.load.variant", {note, capacity: load.capacityLb}) : t("sheetDialog.load.off", {capacity: load.capacityLb}))
    + (load.unweighed ? t("sheetDialog.load.unweighed", {count: load.unweighed, word: t(load.unweighed === 1 ? "sheetDialog.item.one" : "sheetDialog.item.many")}) : "");
}

// Match whole native templates; unknown authored text is never partly rewritten.
function nativeTemplate(text: string, prefix: string): {key: MessageKey; args: Record<string, string>} | null {
  const source = catalogFor("en", prefix);
  for (const key of Object.keys(source)) {
    const escaped = messageTemplate("en", key as MessageKey).replace(/[.*+?^$()|[\]\\]/g, "\\$&");
    const match = new RegExp(`^${escaped.replace(/\{(\w+)\}/g, (_, name: string) => `(?<${name}>${["count", "minutes", "cap", "level"].includes(name) ? "\\d+" : "[\\s\\S]+?"})`)}$`).exec(text);
    if (match) return {key: key as MessageKey, args: match.groups ?? {}};
  }
  return null;
}

export function sheetOwedChoice(text: string, locale: AppLocale): string {
  if (locale === "en") return text;
  const match = nativeTemplate(text, "sheetDialog.owed.");
  if (!match) return text;
  const args = {...match.args};
  if (args.word && !["skill", "skills", "Improvement", "Improvements", "proficiency", "proficiencies"].includes(args.word)) return text;
  if (args.classLevel && args.classLevel !== args.class) return text;
  for (const name of ["class", "classLevel"]) if (args[name]) args[name] = characterLabel("class", args[name], locale);
  if (args.word) args.word = catalogLabel(args.word, "sheetDialog.owed.", locale);
  return createTranslator(locale)(match.key, args);
}

export function sheetFeatureChoice(value: string, locale: AppLocale): string {
  return catalogLabel(value, "sheetDialog.choice.feature.", locale);
}
export function sheetChoiceOption(value: string, locale: AppLocale): string {
  return catalogLabel(value.replace(/\b\w/g, letter => letter.toUpperCase()), "sheetDialog.choice.option.", locale);
}

export function sheetResourceHelp(id: string, original: string | undefined, locale: AppLocale): string | undefined {
  const key = `sheetDialog.resourceHelp.${id}` as MessageKey;
  return original && original === catalogFor("en", "sheetDialog.resourceHelp.")[key] ? createTranslator(locale)(key) : original;
}

export function sheetUsageMessage(text: string, locale: AppLocale): string {
  if (locale === "en") return text;
  for (const key of ["abilityUi.errorSession", "auth.passwordRequired"] as const) {
    if (text === messageTemplate("en", key)) return createTranslator(locale)(key);
  }
  const match = nativeTemplate(text, "sheetDialog.error.") ?? nativeTemplate(text, "sheetDialog.choice.error.");
  if (!match) return text;
  const args = {...match.args};
  if (args.item) args.item = referenceDisplayName("equipment", args.item, locale);
  if (args.eligible) args.eligible = catalogLabel(args.eligible, "sheetDialog.attunement.", locale);
  if (args.holder) args.holder = catalogLabel(args.holder, "sheetDialog.attunement.", locale);
  if (args.condition) args.condition = conditionLabel(args.condition, locale);
  return createTranslator(locale)(match.key, args);
}

export function sheetTimePassed(text: string, locale: AppLocale): string {
  if (locale === "en") return text;
  // The route can join multiple dressing/attunement sentences. Translate all
  // of them only when each complete line is recognized; never lose a suffix.
  const lines = text.match(/(?:Putting on|Taking off) [\s\S]+? takes \d+ minutes?\.|Ending the attunement to [\s\S]+? takes a short rest spent with it \(1 hour\)\./g);
  if (!lines || lines.join(" ") !== text) return text;
  return lines.map(line => {
    const match = nativeTemplate(line, "sheetDialog.time.");
    if (!match) return line;
    const args = {...match.args};
    if (args.item) args.item = referenceDisplayName("equipment", args.item, locale);
    if (args.word) args.word = catalogLabel(args.word, "sheetDialog.time.", locale);
    return createTranslator(locale)(match.key, args);
  }).join(" ");
}
