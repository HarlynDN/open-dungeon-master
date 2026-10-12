import type { ConditionDisplayName, ConditionDuration, ConditionPresentation } from "../battlemap/condition-presentation";
import { CONDITION_MATERIAL_INDEX } from "./condition-material-index.ts";
import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { referenceDisplayName } from "./references.ts";
import { combatName, combatTermLabel, regeneratingLabel } from "./combat-ui-presentations.ts";

const aliases = CONDITION_MATERIAL_INDEX.flatMap(row => row.match.map(name => ({ name, id: row.id })))
  .sort((a, b) => b.name.length - a.name.length);
const DAMAGE_TYPES = new Set(["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]);
const ABILITIES: Record<string, string> = { str: "str", strength: "str", dex: "dex", dexterity: "dex", con: "con", constitution: "con", int: "int", intelligence: "int", wis: "wis", wisdom: "wis", cha: "cha", charisma: "cha" };
const LEGACY_NAMES: Record<string, string> = { raging: "raging", dodging: "dodging", hidden: "hidden", burrowing: "burrowing", cursed: "cursed", marked: "marked", concentrating: "concentrating", "bardic inspiration": "bardicInspiration", "dark one's own luck": "darkOnesOwnLuck", readied: "readied", hexed: "hexed", "regeneration stopped": "regenerationStopped" };

// Only recognized mechanic parameters are projected. An authored suffix or
// creature/player name is retained, even when it contains a catalog term.
function parameterLabel(value: string, locale: AppLocale): string {
  const lower = value.trim().toLowerCase();
  if (ABILITIES[lower]) return combatTermLabel("ability", ABILITIES[lower], locale);
  if (DAMAGE_TYPES.has(lower)) return createTranslator(locale)(`combatDetail.damage.${lower}` as MessageKey);
  const damage = /^(\d+d\d+(?:\s*[+-]\s*\d+)?) (\w+)$/.exec(lower);
  return damage && DAMAGE_TYPES.has(damage[2])
    ? `${damage[1]} ${createTranslator(locale)(`combatDetail.damage.${damage[2]}` as MessageKey)}` : value;
}
export function conditionLabel(name: string, locale: AppLocale): string {
  if (locale === "en") return name;
  const basic = combatTermLabel("condition", name, locale);
  if (basic !== name) return basic;
  const lower = name.trim().toLowerCase();
  const exact = aliases.find(row => row.name === lower);
  const parameter = exact ? null : /^(.*?)\s*\(([^()]*)\)$/.exec(name.trim());
  const row = exact ?? (parameter && aliases.find(row => row.name === parameter[1].trim().toLowerCase()));
  const legacy = LEGACY_NAMES[parameter ? parameter[1].trim().toLowerCase() : lower];
  if (!row && !legacy) return name;
  const translated = createTranslator(locale)((row ? `combatDetail.effect.${row.id}.name` : `combatDetail.condition.${legacy}`) as MessageKey);
  return parameter ? createTranslator(locale)("combatDetail.parameter", { name: translated, value: parameterLabel(parameter[2], locale) }) : translated;
}

// Resolve only exact displayed mechanic names. English and authored names
// retain their original input; ambiguous translations never guess a rule ID.
export function resolveConditionInput(value: string, locale: AppLocale): { name: string } | { candidates: string[] } {
  if (locale === "en") return { name: value };
  const prefix = "closedHelp.condition.", needle = value.trim().toLowerCase();
  const basic = Object.keys(catalogFor("en", prefix)).filter(key => key.endsWith(".name"))
    .map(key => key.slice(prefix.length, -".name".length));
  const native = [...basic, ...CONDITION_MATERIAL_INDEX.map(row => row.match[0]), ...Object.keys(LEGACY_NAMES)];
  const matches = [...new Set(native.filter(name => conditionLabel(name, locale).trim().toLowerCase() === needle && name !== needle))];
  return matches.length > 1 ? { candidates: matches } : { name: matches[0] ?? value };
}
function visibleName(who: ConditionDisplayName, locale: AppLocale): string {
  return combatName(who.name, who.kind, locale);
}
export function conditionDurationLabel(duration: ConditionDuration, locale: AppLocale): string {
  const t = createTranslator(locale);
  if (duration.kind === "turn") {
    // A numbered creature reads “哥布林 2 的”, without changing its identity.
    const name = duration.who ? visibleName(duration.who, locale).replace(/(\d)$/, "$1 ") : null;
    if (duration.phase === "start") return name ? t("combatDetail.duration.start", { name }) : t("combatDetail.duration.ownStart");
    const turn = t(duration.next ? "combatDetail.duration.next" : "combatDetail.duration.current");
    return name ? t("combatDetail.duration.end", { name, turn }) : t("combatDetail.duration.ownEnd", { turn });
  }
  const rounds = duration.rounds;
  if (rounds < 10) return t("combatDetail.duration.rounds", { count: rounds });
  // Same conversion/rounding as describeConditionDuration. This is display
  // only: the stored rounds and engine tick/expiry behavior are untouched.
  const minutes = Math.ceil(rounds / 10);
  if (minutes < 60) return t("combatDetail.duration.minutes", { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours >= 48) return hours % 24 ? t("combatDetail.duration.daysHours", { days: Math.floor(hours / 24), hours: hours % 24 })
    : t("combatDetail.duration.days", { count: Math.floor(hours / 24) });
  return minutes % 60 ? t("combatDetail.duration.hoursMinutes", { hours, minutes: minutes % 60 })
    : t("combatDetail.duration.hours", { count: hours });
}

export type ConditionDisplayRow = { label: string; rounds?: number; note?: string; presentation?: ConditionPresentation };
export function conditionDisplay(row: ConditionDisplayRow, locale: AppLocale): { label: string; rounds: string; note: string } {
  const t = createTranslator(locale);
  const unchanged = { label: locale === "en" ? row.label : conditionLabel(row.label, locale),
    rounds: row.rounds ? t("combatUi.board.conditionRounds", { rounds: row.rounds }) : "", note: row.note ?? "" };
  if (locale === "en" || !row.presentation) return unchanged;
  const p = row.presentation;
  const result = { label: unchanged.label, rounds: "", note: "" };
  const spellName = (name: string) => referenceDisplayName("spell", name, locale);
  switch (p.kind) {
    case "effect": {
      const notes: string[] = [];
      if (p.effectId) notes.push(t(`combatDetail.effect.${p.effectId}.summary` as MessageKey).replace(/[。.]$/, ""));
      if (p.duration) {
        const duration = conditionDurationLabel(p.duration, locale);
        if (p.duration.kind === "rounds" && row.rounds) result.rounds = ` ${duration}`;
        else notes.push(duration);
      }
      if (p.saveEnds) notes.push(t("combatDetail.save", { ability: combatTermLabel("ability", p.saveEnds.ability, locale), dc: p.saveEnds.dc }));
      let source = "";
      if (p.source?.kind === "trigger") source = t("combatDetail.source.trigger", { text: p.source.text });
      else if (p.source?.kind === "creature") source = t("combatDetail.source.from", { name: visibleName(p.source.who, locale) });
      else if (p.source?.kind === "engine") source = t(p.source.value === "stable" ? "combatDetail.source.stable"
        : p.source.value === "knocked out" ? "combatDetail.source.knockedOut" : "combatDetail.source.check");
      if (p.spell) {
        const spell = spellName(p.spell);
        source = !source ? spell : source.includes(spell) ? source : t("combatDetail.source.spell", { source, spell });
      }
      if (source) notes.push(source);
      result.note = notes.join(t("combatDetail.separator"));
      break;
    }
    case "concentration": result.label = t("combatDetail.concentration", { spell: spellName(p.spell) }); break;
    case "exhaustion": {
      const keys = ["checks", "speedHalf", "attacksSaves", "hpHalf", "speedZero"];
      result.label = t("combatDetail.exhaustion", { level: p.level });
      result.note = t("combatDetail.exhaustion.note", { level: p.level,
        effects: keys.slice(0, Math.min(keys.length, p.level)).map(key => t(`combatDetail.exhaustion.${key}` as MessageKey)).join(t("combatDetail.separator")) });
      break;
    }
    case "death-track": {
      const counts = { successes: p.successes, failures: p.failures };
      result.label = p.stable ? t("combatDetail.death.stable") : t("combatDetail.death.dying", counts);
      result.note = p.stable ? t("combatDetail.death.stableNote") : t("combatDetail.death.saves", counts);
      break;
    }
    case "knocked-out": result.label = t("combatDetail.knockedOut"); result.note = t("combatDetail.knockedOut.note"); break;
    case "regenerating": result.label = t(p.stopped ? "combatDetail.regen.stopped" : "combatDetail.regen.active"); result.note = regeneratingLabel(p.stopped, locale); break;
    case "silence": result.label = t("combatDetail.silence", { spell: spellName(p.spell) }); result.note = t("combatDetail.silence.note"); break;
  }
  return result;
}
