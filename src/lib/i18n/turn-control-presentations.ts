import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { apiErrorText, type UiRequestError } from "./api-errors.ts";
import { referenceDisplayName } from "./references.ts";

const PIP_KEYS = {
  Action: "turnUi.pip.action", Bonus: "turnUi.pip.bonus", Reaction: "turnUi.pip.reaction",
} satisfies Record<string, MessageKey>;
export function turnPipLabel(label: string, locale: AppLocale): string {
  const key = PIP_KEYS[label as keyof typeof PIP_KEYS];
  return key ? createTranslator(locale)(key) : label;
}
const OUTCOME_KEYS = {
  victory: "turnUi.summary.victory", enemies_fled: "turnUi.summary.enemies_fled",
  party_fled: "turnUi.summary.party_fled", party_defeated: "turnUi.summary.party_defeated",
  truce: "turnUi.summary.truce",
} satisfies Record<string, MessageKey>;
export function fightOutcomeLabel(outcome: string, locale: AppLocale): string {
  const key = OUTCOME_KEYS[outcome as keyof typeof OUTCOME_KEYS];
  return key ? createTranslator(locale)(key) : outcome.replace(/_/g, " ");
}
function waitingEnemyNames(raw: string, names: readonly string[], locale: AppLocale): string {
  const paths: string[][] = [];
  const candidates = [...new Set(names)].filter(Boolean);
  const visit = (left: string, path: string[]) => {
    if (paths.length > 1) return;
    for (const name of candidates) {
      if (left === name) paths.push([...path, name]);
      else if (left.startsWith(`${name} and `)) visit(left.slice(name.length + 5), [...path, name]);
    }
  };
  visit(raw, []);
  // Resolve only a unique list of actual enemy names. "Salt and Stone"
  // stays one proper name, and ambiguous/custom diagnostics stay literal.
  return paths.length === 1
    ? paths[0].map(name => referenceDisplayName("monster", name, locale)).join(", ")
    : referenceDisplayName("monster", raw, locale);
}
export function turnControlErrorText(error: UiRequestError | null, locale: AppLocale, enemyNames: readonly string[] = []): string {
  if (!error) return "";
  const raw = error.data.error;
  if (locale === "en" && raw) return raw;
  const known = raw && Object.entries(catalogFor("en", "turnUi.error.")).find(([, source]) => source === raw);
  if (known) return createTranslator(locale)(known[0] as MessageKey);
  const due = raw && /^(.*?) (?:acts|act) first: wait for (?:its turn|their turns), then take yours\.$/.exec(raw);
  if (due) return createTranslator(locale)("turnUi.error.enemiesDue", {
    // This diagnostic explicitly names enemies; an unknown/custom name is
    // preserved. Don't split proper names on a word such as "and".
    names: waitingEnemyNames(due[1], enemyNames, locale),
  });
  return apiErrorText(locale, error.data, error.fallback);
}
