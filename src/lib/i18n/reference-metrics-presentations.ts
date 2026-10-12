import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { abilityLabel, characterLabel } from "./character-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { spellGearTermLabel } from "./spell-gear-presentations.ts";
import { damageListLabel } from "./sheet-play-presentations.ts";
import { referenceRowName } from "./reference-ui-presentations.ts";
import type { CompareCell, CompareKind, CompareTable } from "../reference/compare.ts";
import type { CalcField } from "../reference/calculators.ts";

export const METRIC_NOTICES = { compare: "That comparison could not be built." } as const;
const escape = (text: string) => text.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
const indexes = new Map<string, Map<string, MessageKey>>();
const frameSets = new Map<string, Array<{ key: MessageKey; expression: RegExp }>>();

function exact(raw: string, locale: AppLocale, section: string): string {
  const prefix = `referenceMetrics.${section}.`;
  let index = indexes.get(prefix);
  if (!index) {
    index = new Map(Object.entries(catalogFor("en", prefix)).filter(([, text]) => !/\{\w+\}/.test(text)).map(([key, text]) => [text.toLowerCase(), key as MessageKey]));
    indexes.set(prefix, index);
  }
  const key = index.get(raw.toLowerCase());
  return key ? createTranslator(locale)(key) : raw;
}

// Complete owned numeric frames only. Repeated placeholders agree; numeric
// captures cannot absorb prose. Unknown diagnostics and authored data stay raw.
function framed(raw: string, locale: AppLocale, section: "frame" | "notice"): string {
  const prefix = `referenceMetrics.${section}.`;
  let frames = frameSets.get(prefix);
  if (!frames) {
    frames = Object.entries(catalogFor("en", prefix)).filter(([, text]) => /\{\w+\}/.test(text)).map(([key, source]) => {
      let at = 0, expression = "^";
      const seen = new Set<string>();
      for (const slot of source.matchAll(/\{(\w+)\}/g)) {
        const name = slot[1];
        expression += escape(source.slice(at, slot.index));
        const capture = /plural$/i.test(name) ? "s?" : name === "size" ? "tiny|small|medium|large|huge|gargantuan"
          : name === "dice" ? "\\d+d\\d+" : name === "slug" ? "[\\s\\S]+?"
          : name === "cr" ? "\\d+(?:/\\d+|\\.\\d+)?" : "[+-]?\\d[\\d.,\\u00a0\\u202f]*";
        expression += seen.has(name) ? `\\k<${name}>` : `(?<${name}>${capture})`;
        seen.add(name); at = slot.index! + slot[0].length;
      }
      return { key: key as MessageKey, expression: new RegExp(expression + escape(source.slice(at)) + "$", "i") };
    });
    frameSets.set(prefix, frames);
  }
  for (const frame of frames) {
    const matched = frame.expression.exec(raw);
    if (!matched) continue;
    const args = { ...matched.groups };
    if (args.size) args.size = exact(args.size, locale, "size");
    return createTranslator(locale)(frame.key, args);
  }
  return raw;
}

export function metricText(raw: string, locale: AppLocale, section = "calc"): string {
  if (!raw || locale === "en") return raw;
  const label = exact(raw, locale, section);
  return label !== raw ? label : framed(raw, locale, "frame");
}

export function metricNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const label = exact(raw, locale, "notice");
  return label !== raw ? label : framed(raw, locale, "notice");
}

export function calculatorChoice(field: CalcField, option: { value: string; label: string }, locale: AppLocale): string {
  return metricText(option.label, locale, field.key === "size" ? "size" : "calc");
}

type CompareEntry = { slug: string; name: string; source?: string; documentSlug?: string };
export function comparisonName(kind: CompareKind, entry: CompareEntry, locale: AppLocale, table?: CompareTable | null): string {
  const source = entry.source ? entry : table?.kind === kind ? table.columns.find(column => column.slug === entry.slug) ?? entry : entry;
  return referenceRowName(kind, { ...source, source: source.source ?? "", data: {} }, locale);
}

function factText(raw: string, locale: AppLocale): string {
  const exactFact = exact(raw, locale, "fact");
  if (exactFact !== raw) return exactFact;
  return framed(raw, locale, "frame");
}

// Row identity is retained from the pure comparison builder. Only generated
// facts/known vocabulary translate; material and trait prose stay authored.
export function compareCellView(kind: CompareKind, label: string, cell: CompareCell, locale: AppLocale): CompareCell {
  if (locale === "en") return cell;
  let text = cell.text, detail = cell.detail;
  const common = factText(text, locale);
  if (label === "Level") {
    if (text === "cantrip") text = createTranslator(locale)("referenceUi.badge.cantrip");
    else {
      const level = /^level (\d+)$/.exec(text);
      if (level) text = createTranslator(locale)("referenceUi.badge.level", { level: level[1] });
    }
  } else if (common !== text) text = common;
  else if (label === "School") text = spellGearTermLabel("school", text, locale);
  else if (label === "Size") text = exact(text, locale, "size");
  else if (label === "Resistances" || label === "Immunities") text = damageListLabel(text, locale);
  else if (label === "Condition immunities") text = text.split(/,\s*/).map(part => conditionLabel(part, locale)).join(createTranslator(locale)("sheet.separator"));
  else if (label === "Classes") text = text.split(/,\s*/).map(part => characterLabel("class", part.trim(), locale)).join(createTranslator(locale)("sheet.separator"));
  else if (label === "Saving throws" && /^(?:(?:STR|DEX|CON|INT|WIS|CHA) [+-]?\d+ ?)+$/.test(text)) {
    text = text.replace(/(STR|DEX|CON|INT|WIS|CHA) ([+-]?\d+)/g, (_all, ability: string, modifier: string) => `${abilityLabel(ability.toLowerCase(), locale)} ${modifier}`);
  }
  if (detail && label !== "Traits" && label !== "Components") {
    const known = exact(detail, locale, "deriveNote");
    detail = known !== detail ? known : factText(detail, locale);
  }
  return { ...cell, text, ...(detail === undefined ? {} : { detail }) };
}
