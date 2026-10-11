import { createTranslator, messageTemplate, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { referenceDisplayName } from "./references.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";
import { characterRuleProblems } from "./character-presentations.ts";
import { SPELL_STARTER_TEXTS, SPELL_SUPPORT_TEXTS } from "./spell-material-messages.ts";
import { spellSummary } from "../help/index.ts";
import { spellSupportFor } from "../srd/spell-support.ts";
import type { RuleProblem } from "../characters/problems.ts";

// A world overlay or homebrew name has its own author. The translated label
// never replaces the tile's canonical name, slug or onTile argument.
export function spellTileName(tile: { name: string; label?: string; homebrew?: boolean }, locale: AppLocale): string {
  if (tile.homebrew || (tile.label !== undefined && tile.label !== tile.name)) return tile.label ?? tile.name;
  return referenceDisplayName("spell", tile.name, locale);
}

export function spellTileMatches(tile: Parameters<typeof spellTileName>[0], query: string, locale: AppLocale): boolean {
  const wanted = query.trim().toLowerCase();
  return [tile.name, tile.label ?? tile.name, spellTileName(tile, locale)].some(name => name.toLowerCase().includes(wanted));
}

export function spellStarterText(english: string, locale: AppLocale): string {
  const row = SPELL_STARTER_TEXTS.find(row => row.english === english);
  return row ? createTranslator(locale)(row.key) : english;
}

export function spellSupportNote(name: string, locale: AppLocale): string | undefined {
  const support = spellSupportFor(name);
  if (!support) return undefined;
  const row = SPELL_SUPPORT_TEXTS.find(row => row.english === support.manual && row.kind === support.kind);
  const manual = row ? createTranslator(locale)(row.key) : support.manual;
  return createTranslator(locale)(support.kind === "partial" ? "spellUi.partialNote" : "spellUi.narratedNote", { manual });
}

export function spellCountLabel(english: string, locale: AppLocale): string {
  if (locale === "en") return english;
  const t = createTranslator(locale);
  if (english === "known spells" || english === "spells known") return `${t("spellUi.known")}${t("spellUi.spells")}`;
  if (english === "prepared spells" || english === "spells prepared") return `${t("spellUi.prepared")}${t("spellUi.spells")}`;
  return english === "spells" ? t("spellUi.spells") : english;
}

export type SpellChoiceNotice =
  | { key: MessageKey; args: Record<string, string | number>; spell?: { name: string; label?: string; homebrew?: boolean }; countLabel?: string }
  | { english: string; details: RuleProblem[] };

// Keep semantic refusal data in state, so switching locale updates an already
// visible cap or school refusal without rerunning the selection action.
export function spellChoiceNoticeText(notice: SpellChoiceNotice | null, locale: AppLocale): string {
  if (!notice) return "";
  if ("english" in notice) return characterRuleProblems({ problems: [notice.english], problemDetails: notice.details }, locale);
  return createTranslator(locale)(notice.key, {
    ...notice.args,
    ...(notice.spell ? { name: spellTileName(notice.spell, locale) } : {}),
    ...(notice.countLabel ? { label: spellCountLabel(notice.countLabel, locale) } : {}),
  });
}

function spellFact(value: string, locale: AppLocale): string {
  if (locale === "en") return value;
  const t = createTranslator(locale);
  const words: Record<string, MessageKey> = { "1 action": "spellUi.action", "1 bonus action": "spellUi.bonusAction", "1 reaction": "spellUi.reaction", self: "spellUi.self", touch: "spellUi.touch", sight: "spellUi.sight", unlimited: "spellUi.unlimited" };
  const word = words[value.toLowerCase()];
  if (word) return t(word);
  const unit = /^(\d+(?:\.\d+)?) (feet|foot|minutes?|hours?)$/i.exec(value);
  return unit ? t(/^f/i.test(unit[2]) ? "spellUi.feet" : /^m/i.test(unit[2]) ? "spellUi.minutes" : "spellUi.hours", { count: unit[1], plural: unit[1] === "1" ? "" : "s" }) : value;
}

// Same factual fields/flags as the original summary. Unrecognized authored
// casting/range text stays verbatim; no inferred spell mechanics are added.
export function spellSummaryView(data: Record<string, unknown> | undefined, locale: AppLocale, homebrew = false): string {
  if (locale === "en" || homebrew || !data) return spellSummary(data);
  const t = createTranslator(locale);
  const level = Number(data.level_int ?? data.level ?? 0);
  const school = String((data.school as { name?: string })?.name ?? data.school ?? "").toLowerCase();
  const flagged = (value: unknown) => value === true || value === 1 || (typeof value === "string" && /^(yes|true)$/i.test(value.trim()));
  return [
    t(level === 0 ? "spellUi.summaryCantrip" : "spellUi.summaryLevel", { level, school: spellGearTermLabel("school", school, locale) }),
    spellFact(String(data.casting_time ?? ""), locale), spellFact(String(data.range ?? ""), locale),
    flagged(data.concentration) ? t("spellUi.concentration") : "", flagged(data.ritual) ? t("spellUi.ritual") : "",
  ].filter(Boolean).join(" · ");
}

const preparationKeys = ["doneNote", "serverOld", "changeHttp", "networkError", "noCharacter", "characterMissing", "doesNotCast", "noCasterClass", "nameSpell", "knownPolicy", "cantripPolicy", "notPending", "wontPrepare", "subclassPolicy", "notPrepared", "unprepared", "alreadyPrepared", "alreadyPending", "notInBook", "bookLevelPolicy", "notOnClassList", "preparationCap", "prepareAfterRest"] as const;
const preparationPatterns = preparationKeys.map(suffix => {
  const key = `spellUi.${suffix}` as const;
  const escaped = messageTemplate("en", key).replace(/[.*+?^$()|[\]\\]/g, "\\$&");
  return { key, suffix, pattern: new RegExp(`^${escaped.replace(/\{(\w+)\}/g, (_, name: string) => `(?<${name}>[\\s\\S]+?)`)}$`) };
});

// Compatibility projection of the existing preparation protocol. The original
// response/audit stays English; only exact full templates are recognized.
// Unknown diagnostics remain visible in full, and actor names are not spells.
export function spellPreparationText(english: string, locale: AppLocale, spell?: Parameters<typeof spellTileName>[0]): string {
  if (locale === "en") return english;
  for (const row of preparationPatterns) {
    const match = row.pattern.exec(english);
    if (!match) continue;
    const args = { ...match.groups };
    if (args.name && !["doesNotCast", "noCasterClass"].includes(row.suffix)) {
      args.name = spellTileName(spell && spell.name === args.name ? spell : { name: args.name }, locale);
    }
    if (args.label) args.label = spellCountLabel(args.label, locale);
    return createTranslator(locale)(row.key, args);
  }
  return english;
}
