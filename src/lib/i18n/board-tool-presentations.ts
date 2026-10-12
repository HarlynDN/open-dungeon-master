import { createTranslator, type MessageKey } from "./translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";
import { combatName } from "./combat-ui-presentations.ts";
import { conditionDisplay, type ConditionDisplayRow } from "./condition-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { HEALTH_LABEL, type HealthWord } from "../battlemap/health-words.ts";
import { intentSentence, type TokenIntent } from "../battlemap/intent.ts";

type NamedToken = { name: string; kind: string };
export function boardCaughtName(entry: { name: string; enemyId?: string; characterId?: string }, locale: AppLocale): string {
  return entry.enemyId && !entry.characterId ? combatName(entry.name, "enemy", locale) : entry.name;
}
export function boardIntentSentence(intent: TokenIntent, actor: NamedToken, target: NamedToken | undefined, locale: AppLocale): string {
  if (locale === "en") return intentSentence(intent, actor.name, target?.name);
  const t = createTranslator(locale);
  // Only complete known resource names for a typed intent; arbitrary prose
  // is kept literally, without guessing or replacing parts of a sentence.
  const verb = intent.verbKind === "spell" ? referenceDisplayName("spell", intent.verb, locale)
    : intent.verbKind === "melee" || intent.verbKind === "ranged" ? referenceDisplayName("equipment", intent.verb, locale) : intent.verb;
  return t(intent.source === "likely" ? "boardTools.intent.likely" : "boardTools.intent.declared", {
    actor: combatName(actor.name, actor.kind, locale), verb,
    target: target ? t("boardTools.intent.target", { name: combatName(target.name, target.kind, locale) }) : "",
  });
}
export function boardTokenTitle(token: NamedToken, health?: HealthWord, conditions: readonly ConditionDisplayRow[] = [], locale: AppLocale = DEFAULT_LOCALE): string {
  if (locale === "en") return [token.name, health ? HEALTH_LABEL[health] ?? health : null,
    ...conditions.map(c => c.note ? `${c.label} (${c.rounds ? `${c.rounds} rd, ` : ""}${c.note})` : c.rounds ? `${c.label} (${c.rounds})` : c.label),
  ].filter(Boolean).join(" · ");
  const t = createTranslator(locale);
  return [combatName(token.name, token.kind, locale), health ? t(`combatUi.board.health.${health}` as MessageKey) : null,
    ...conditions.map(c => { const display = conditionDisplay(c, locale); return t("boardTools.stage.condition", {
      label: display.label, rounds: display.rounds, note: display.note ? t("boardTools.stage.note", { note: display.note }) : "",
    }); }),
  ].filter(Boolean).join(" · ");
}
