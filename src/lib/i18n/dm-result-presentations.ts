import type { ResultPresentation } from "../dm/catalog-result.ts";
import type { AppLocale } from "./locales.ts";
import { DM_RESULT_METADATA } from "./dm-result-metadata.ts";
import { createTranslator } from "./translator.ts";
import { dmCatalogText } from "./dm-field-presentations.ts";
import { dmToolsText } from "./dm-tools-presentations.ts";
import { combatName, combatTermLabel } from "./combat-ui-presentations.ts";
import { referenceDisplayName } from "./references.ts";

export type DmResultNames = { characters: readonly string[]; enemies: readonly string[] };
export function dmResultPresentation(locale: AppLocale, names: DmResultNames): ResultPresentation | undefined {
  if (locale === "en") return undefined;
  const t = createTranslator(locale), metadata = DM_RESULT_METADATA;
  const name = (source: string) => names.characters.includes(source) || !names.enemies.includes(source)
    ? source : combatName(source, "enemy", locale);
  const frame = (source: string, values: Record<string, string | number>) => Object.hasOwn(metadata.frames, source)
    ? t(metadata.frames[source as keyof typeof metadata.frames], values)
    : source.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
  const term = (kind: string, value: string): string => {
    if (["name", "target", "character", "enemy"].includes(kind)) return name(value);
    if (["spell", "concentrationBroken"].includes(kind)) return referenceDisplayName("spell", value, locale);
    if (kind === "ability") return combatTermLabel("ability", value, locale);
    if (["condition", "conditionApplied"].includes(kind)) return combatTermLabel("condition", value, locale);
    if (["health", "color"].includes(kind) && Object.hasOwn(metadata.terms, value)) return t(metadata.terms[value as keyof typeof metadata.terms]);
    if (kind === "health" && value === "dead") return frame("dead", {});
    if (kind === "damageType") return dmCatalogText(value[0]?.toUpperCase() + value.slice(1), locale);
    return value;
  };
  return { frame, term, join: (parts, separator) => parts.join(separator === ", " ? t("dmResult.separator") : separator),
    label: (key, fallback) => Object.hasOwn(metadata.labels, key) ? t(metadata.labels[key as keyof typeof metadata.labels]) : fallback,
    native: (source, key) => {
      if (["health", "conditionApplied", "spell"].includes(key)) return term(key, source);
      if (key === "dying") {
        const m = /^(\d+) successes?, (\d+) failures?$/.exec(source);
        if (m) return frame("{successes} successes, {failures} failures", { successes: m[1], failures: m[2] });
      }
      if (key === "resistance") {
        const m = /^(.+) is (resistant|immune|vulnerable) to ([a-z]+)\.?$/.exec(source);
        if (m && (names.characters.includes(m[1]) || names.enemies.includes(m[1]))) {
          return frame(`{name} is ${m[2]} to {type}`, { name: name(m[1]), type: term("damageType", m[3]) });
        }
      }
      const waiting = /^Waiting on initiative from (.+?)\.(?:\s|$)/.exec(source);
      if (key === "combat" && waiting) {
        const captured = waiting[1].split(", ");
        if (captured.every(entry => names.characters.includes(entry))) {
          const rest = source.slice(waiting[0].length).trim();
          return frame("Waiting on initiative from {names}.", { names: captured.join(t("dmResult.nameSeparator")) }) + (rest ? " " + dmToolsText(rest, locale) : "");
        }
      }
      // Known native diagnostics only; arbitrary story/pack prose remains literal.
      return dmToolsText(source, locale);
    },
  };
}
