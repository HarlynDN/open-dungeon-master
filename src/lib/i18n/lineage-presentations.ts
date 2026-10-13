import { asiChips, lineageChoices, lineageTagline, parseTrait, srdRaceFor, traitLines, type LineageEntry, type ParsedTrait } from "../../app/characters/builder/lineage.ts";
import type { RaceOption, BackgroundOption } from "../characters/options.ts";
import { characterLabel, abilityLabel } from "./character-presentations.ts";
import { builderOptionName } from "./builder-picker-presentations.ts";
import { LINEAGE_TRAIT_DISPLAY } from "./lineage-material-messages.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { trainingLabel } from "./training-presentations.ts";
import { describeRace } from "../help/index.ts";

export function lineageHelpText(id: string, locale: AppLocale): string | null {
  const source = describeRace(id);
  const race = srdRaceFor(id);
  if (locale === "en" || !race) return source;
  const t = createTranslator(locale);
  return t("lineageUi.traitsText", { parts: lineageDescription(race, locale, t("lineageUi.traitSeparator")) });
}

export function lineageTraitView(line: string, entry: LineageEntry, locale: AppLocale): ParsedTrait {
  const parsed = parseTrait(line, entry);
  if (locale === "en" || !srdRaceFor(entry.id)) return parsed;
  const row = LINEAGE_TRAIT_DISPLAY.find(row => row.line === line && row.head === parsed.head && row.body === parsed.body);
  const t = createTranslator(locale);
  if (!row) return { head: t("lineageUi.pending", { source: parsed.head }), body: parsed.body };
  return { head: t(row.headKey), body: "bodyKey" in row ? t(row.bodyKey) : null };
}

export function lineageDescription(entry: { id: string; note?: string }, locale: AppLocale, separator = " · "): string {
  const lines = traitLines(entry);
  if (locale === "en" || !srdRaceFor(entry.id)) return lines.join(separator);
  const t = createTranslator(locale);
  return lines.map(line => {
    const row = LINEAGE_TRAIT_DISPLAY.find(row => row.line === line);
    return row ? t(row.lineKey) : t("lineageUi.pending", { source: line });
  }).join(separator);
}

export function lineageChipViews(entry: LineageEntry, locale: AppLocale) {
  const chips = asiChips(entry.asi);
  if (locale === "en") return chips;
  const t = createTranslator(locale);
  return chips.map(chip => {
    const ability = chip.ability === "ALL" ? t("lineageUi.allAbilities") : abilityLabel(chip.ability.toLowerCase(), locale, true);
    return { ...chip, ability, label: `${ability} ${chip.bonus}` };
  });
}

const TAGLINE_KEYS = {
  "Built to endure": "lineageUi.tagline.str", "Quick and sure": "lineageUi.tagline.dex",
  "Hard to put down": "lineageUi.tagline.con", "Studied and sharp": "lineageUi.tagline.int",
  Watchful: "lineageUi.tagline.wis", "Commands a room": "lineageUi.tagline.cha",
  Adaptable: "lineageUi.tagline.all", "Yours to shape": "lineageUi.tagline.choice",
} as const;
export function lineageTaglineView(entry: LineageEntry, locale: AppLocale): string {
  const text = lineageTagline(entry);
  const key = TAGLINE_KEYS[text as keyof typeof TAGLINE_KEYS];
  return locale === "en" || !key ? text : createTranslator(locale)(key);
}

export function lineageChoiceViews(entry: LineageEntry, locale: AppLocale): string[] {
  if (locale === "en") return lineageChoices(entry);
  const t = createTranslator(locale), out: string[] = [];
  if (entry.asiChoice) out.push(t("lineageUi.choice.ability", { count: entry.asiChoice.count, amount: entry.asiChoice.amount }));
  if (entry.bonusLanguages) out.push(t("lineageUi.choice.language", { count: entry.bonusLanguages }));
  if (entry.skillChoice) out.push(t("lineageUi.choice.skill", { count: entry.skillChoice.count }));
  if (entry.cantripChoice) out.push(t("lineageUi.choice.cantrip", { count: entry.cantripChoice.count, class: characterLabel("class", entry.cantripChoice.list, locale) }));
  if (entry.toolChoice) out.push(t("lineageUi.choice.tool", { count: entry.toolChoice.count }));
  return out;
}

type RaceLanguages = Pick<RaceOption, "id" | "name" | "languages" | "bonusLanguages" | "languageChoice">;
type BackgroundLanguages = Pick<BackgroundOption, "id" | "name" | "languages" | "knownLanguages">;
export function lineageLanguageHelp(race: RaceLanguages, background: BackgroundLanguages | undefined, locale: AppLocale): string {
  if (locale === "en") {
    const parts = [`${race.name} speaks ${race.languages.join(" and ")}`];
    const choice = race.languageChoice;
    const open = race.bonusLanguages - (choice?.count ?? 0);
    if (choice) parts.push(`plus ${choice.count === 1 ? "one" : choice.count} of ${choice.from.join(", ")}`);
    if (open > 0) parts.push(`${choice ? "and" : "plus"} ${open} of your choice`);
    if (background?.knownLanguages?.length) parts.push(`and ${background.knownLanguages.join(" and ")} from your ${background.name} background`);
    if (background?.languages) parts.push(`${race.bonusLanguages > 0 ? "and" : "plus"} ${background.languages} more from your ${background.name} background`);
    return `${parts.join(" ")}.`;
  }
  const t = createTranslator(locale);
  const names = (values: string[]) => new Intl.ListFormat(locale, { type: "conjunction" }).format(values.map(value => trainingLabel("language", value, locale)));
  const backgroundName = background?.id ? builderOptionName("background", background, locale) : background?.name ?? "";
  const parts = [t("lineageUi.languageBase", { race: builderOptionName("race", race, locale), languages: names(race.languages) })];
  const choice = race.languageChoice;
  if (choice) parts.push(t("lineageUi.languageRestricted", { count: choice.count, languages: names(choice.from) }));
  const open = race.bonusLanguages - (choice?.count ?? 0);
  if (open > 0) parts.push(t("lineageUi.languageOpen", { count: open }));
  if (background?.knownLanguages?.length) parts.push(t("lineageUi.languageKnownBackground", { languages: names(background.knownLanguages), background: backgroundName }));
  if (background?.languages) parts.push(t("lineageUi.languageBackground", { count: background.languages, background: backgroundName }));
  return t("lineageUi.languageSentence", { parts: parts.join("") });
}

// Only an exact trait granted by this native race may use the race catalog.
// A story feature or another race's/custom trait is never name-translated.
export function lineageFeatureName(raceId: string | undefined, line: string, locale: AppLocale): string {
  if (locale === "en" || !raceId) return line;
  const race = srdRaceFor(raceId);
  if (!race?.traits.includes(line)) return line;
  const row = LINEAGE_TRAIT_DISPLAY.find(entry => entry.line === line);
  return row ? createTranslator(locale)(row.lineKey) : line;
}
