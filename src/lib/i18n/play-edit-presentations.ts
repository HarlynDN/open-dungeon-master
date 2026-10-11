import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { characterLabel } from "./character-presentations.ts";
import { resourceLabel } from "./sheet-play-presentations.ts";
import { trainingLabel } from "./training-presentations.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { sheetUsageMessage } from "./sheet-dialog-presentations.ts";

const frames = new Map<string, RegExp>();
const numeric = new Set(["max", "used", "level", "hours", "count", "required", "penalty", "doses", "days", "dc"]);
function nativeFrame(raw: string, prefix: string): { key: MessageKey; args: Record<string, string> } | null {
  const sources = Object.entries(catalogFor("en", prefix)).sort(([, a], [, b]) => b.replace(/\{\w+\}/g, "").length - a.replace(/\{\w+\}/g, "").length);
  for (const [key, source] of sources) {
    let pattern = frames.get(source);
    if (!pattern) {
      const seen = new Set<string>();
      let at = 0, expression = "^";
      const escape = (text: string) => text.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
      for (const slot of source.matchAll(/\{(\w+)\}/g)) {
        const name = slot[1];
        expression += escape(source.slice(at, slot.index));
        expression += seen.has(name) ? `\\k<${name}>` : `(?<${name}>${numeric.has(name) ? "\\d+" : name === "conditions" ? "[\\s\\S]*?" : "[\\s\\S]+?"})`;
        seen.add(name); at = slot.index! + slot[0].length;
      }
      pattern = new RegExp(expression + escape(source.slice(at)) + "$");
      frames.set(source, pattern);
    }
    const match = pattern.exec(raw);
    if (match) return { key: key as MessageKey, args: match.groups ?? {} };
  }
  return null;
}
function exactLabel(raw: string, prefix: string, locale: AppLocale): string {
  const entry = Object.entries(catalogFor("en", prefix)).find(([, source]) => source.toLowerCase() === raw.toLowerCase());
  return entry ? createTranslator(locale)(entry[0] as MessageKey) : raw;
}

// Whole native correction frames only. Repeated counts must agree; custom
// diagnostics and resource names remain complete rather than being guessed.
export function playEditNotice(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const frame = nativeFrame(raw, "sheetDialog.edit.held.") ?? nativeFrame(raw, "sheetDialog.edit.error.");
  if (!frame) return sheetUsageMessage(raw, locale);
  const args = { ...frame.args };
  if (args.class) args.class = characterLabel("class", args.class, locale);
  if (args.name) args.name = resourceLabel(args.name.replace(/ /g, "_"), args.name, locale);
  return createTranslator(locale)(frame.key, args);
}

function coins(raw: string, locale: AppLocale): string | null {
  if (!/^(?:\d+(?:\.\d+)? (?:gp|sp|cp|pp))(?: \d+(?:\.\d+)? (?:gp|sp|cp|pp))*$/.test(raw)) return null;
  return raw.replace(/\b(gp|sp|cp|pp)\b/g, value => createTranslator(locale)(`sheetPlay.between.coin.${value}` as MessageKey));
}

// The API keeps the narrator's original English lines and its secrecy filter.
// Translate complete known frames for the viewer, preserving freeform topics,
// custom diseases/flaws and every engine count, cost and duration.
export function betweenLineText(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const frame = nativeFrame(raw, "sheetPlay.between.line.");
  if (!frame) return exactLabel(raw, "sheetPlay.between.name.", locale);
  const args = { ...frame.args };
  if (args.name) args.name = exactLabel(args.name, "sheetPlay.between.name.", locale);
  if (args.item) args.item = referenceDisplayName("equipment", args.item, locale);
  if (args.subject) args.subject = trainingLabel("tool", trainingLabel("language", args.subject, locale), locale);
  if (args.conditions) args.conditions = args.conditions.split(", ").map(value => conditionLabel(value, locale)).join("、");
  if (args.term) {
    const term = exactLabel(args.term, "sheetPlay.between.term.", locale);
    if (term === args.term) return raw;
    args.term = term;
  }
  if (args.lifestyle) {
    const lifestyle = exactLabel(args.lifestyle, "sheetPlay.between.lifestyle.", locale);
    if (lifestyle === args.lifestyle) return raw;
    args.lifestyle = lifestyle;
  }
  for (const key of ["cost", "progress", "total"]) if (args[key]) {
    const value = coins(args[key], locale);
    if (!value) return raw;
    args[key] = value;
  }
  return createTranslator(locale)(frame.key, args);
}

function standardConditions() {
  return Object.entries(catalogFor("en", "closedHelp.condition.")).filter(([key]) => key.endsWith(".name"));
}

// Only complete standard condition labels are reversible. Unknown authored
// effects and partially typed text stay literal. Both Chinese comma forms
// work; the stored patch still carries canonical English condition names.
export function editConditionDisplay(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  return raw.replace(/[^,，、]+/g, part => {
    const entry = standardConditions().find(([, source]) => source.toLowerCase() === part.trim().toLowerCase());
    return entry ? part.replace(part.trim(), t(entry[0] as MessageKey)) : part;
  });
}
export function editConditionDraft(raw: string, locale: AppLocale): string {
  const t = createTranslator(locale);
  return raw.replace(/[^,，、]+/g, part => {
    const value = part.trim();
    // Native casing is preserved; only an exact translated label becomes an ID.
    if (standardConditions().some(([, source]) => source.toLowerCase() === value.toLowerCase())) return part;
    const matches = standardConditions().filter(([key]) => t(key as MessageKey) === value);
    return matches.length === 1 ? part.replace(value, matches[0][1].toLowerCase()) : part;
  });
}
export function editConditionValues(raw: string, locale: AppLocale): string[] {
  return editConditionDraft(raw, locale).split(/[,，、]/).map(part => part.trim()).filter(Boolean);
}
