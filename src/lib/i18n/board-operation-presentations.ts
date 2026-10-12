import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { conditionLabel } from "./condition-presentations.ts";

const compiled = new Map<string, RegExp>();
const numeric = new Set(["reach", "feet", "left", "x", "y", "count"]);
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Only whole owned diagnostic frames match. The server/model result stays
// English; locale projection never changes a rule, token ID or stored note.
export function boardOperationErrorText(raw: string, locale: AppLocale, who: (name: string) => string = name => name): string | null {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  for (const [key, source] of Object.entries(catalogFor("en", "boardOpsUi.refusal."))) {
    let pattern = compiled.get(source);
    if (!pattern) {
      let at = 0, expression = "^";
      const seen = new Set<string>();
      for (const slot of source.matchAll(/\{(\w+)\}/g)) {
        expression += escape(source.slice(at, slot.index));
        const name = slot[1];
        expression += seen.has(name) ? `\\k<${name}>` : `(?<${name}>${numeric.has(name) ? "-?\\d+(?:\\.\\d+)?" : "[^\\n]+?"})`;
        seen.add(name);
        at = slot.index + slot[0].length;
      }
      pattern = new RegExp(expression + escape(source.slice(at)) + "$", "u");
      compiled.set(source, pattern);
    }
    const match = pattern.exec(raw);
    if (!match) continue;
    const args = { ...match.groups };
    if (args.name) args.name = args.name === "another combatant" ? t("boardOpsUi.otherCombatant") : who(args.name);
    if (args.cause) {
      const exhausted = /^exhaustion level (\d+)$/.exec(args.cause);
      args.cause = exhausted ? t("boardOpsUi.exhaustion", { level: exhausted[1] }) : args.cause === "a condition"
        ? t("boardOpsUi.aCondition") : args.cause.split(", ").map(name => conditionLabel(name, locale)).join(t("boardUi.list"));
    }
    return t(key as MessageKey, args);
  }
  return null;
}
