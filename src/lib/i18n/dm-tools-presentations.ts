export const DM_TOOL_NOTICES = {
  "intent": "Could not work that out.",
  "noIntent": "Nothing in the engine matches that. It may just be narration.",
  "network": "Could not reach the server.",
  "lookup": "Could not look that up.",
  "npcSave": "That did not save.",
  "copy": "That could not be copied.",
  "npcGenerate": "The model had nothing to say.",
  "upload": "That image would not upload.",
  "prepSave": "That could not be saved.",
  "delete": "That could not be deleted.",
  "deploy": "That could not be deployed.",
  "tableDraft": "Could not draft that.",
  "tableSave": "Could not save that.",
  "tableRoll": "Could not roll that.",
  "noTableResult": "Nothing. That result is not on the table.",
  "tableReset": "Could not reset that.",
  "tableCopy": "Could not copy that.",
  "workbench": "That roster could not be costed.",
  "modelNetwork": "The model could not be reached.",
  "modelEmpty": "The model returned nothing usable.",
  "invalid": "Invalid request.",
  "rosterEmpty": "A roster needs at least one monster.",
  "tablePrompt": "Say what the table should be about.",
  "cued": "Cued. The storyteller runs it, map and plan included, as soon as the scene allows. The players are not told.",
  "uncued": "Cue taken back.",
  "deployed": "The fight is on the table. Ask the party for initiative.",
  "unreachable": "The server could not be reached.",
  "unreadable": "The server's answer could not be read."
} as const;

import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { metricText } from "./reference-metrics-presentations.ts";

// Locale projection only: state keeps original API/readout text. Unknown
// diagnostics, authored names and model prose stay literal.
const escape = (text: string) => text.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
let exact: Map<string, MessageKey> | undefined;
let frames: Array<{ key: MessageKey; pattern: RegExp }> | undefined;
function prepare() {
  if (exact && frames) return;
  const source = Object.entries(catalogFor("en", "dmToolsUi."));
  exact = new Map(source.filter(([, text]) => !/\{\w+\}/.test(text)).map(([key, text]) => [text.toLowerCase(), key as MessageKey]));
  frames = source.filter(([key, text]) => key.startsWith("dmToolsUi.frame.") && /\{\w+\}/.test(text)).map(([key, text]) => {
    let at = 0, expression = "^";
    const seen = new Set<string>();
    for (const slot of text.matchAll(/\{(\w+)\}/g)) {
      const name = slot[1];
      expression += escape(text.slice(at, slot.index));
      const capture = name === "dice" ? "[+-]?(?:\\d+d\\d+|\\d+)(?:\\s*[+-]\\s*(?:\\d+d\\d+|\\d+))*"
        : name === "cr" ? "\\d+(?:/\\d+|\\.\\d+)?" : name === "levels" ? "\\d+(?:, \\d+)*"
        : name === "name" ? "(?:(?!; )[\\s\\S])+?" : ["lines", "reason"].includes(name) ? "[\\s\\S]+?"
        : name === "what" ? "The tables|The cast|The prepared fights" : "[+-]?\\d[\\d.,]*";
      expression += seen.has(name) ? `\\k<${name}>` : `(?<${name}>${capture})`;
      seen.add(name); at = slot.index! + slot[0].length;
    }
    return { key: key as MessageKey, pattern: new RegExp(expression + escape(text.slice(at)) + "$", "i") };
  });
}
export function dmToolsText(raw: string, locale: AppLocale, depth = 0): string {
  if (!raw || locale === "en" || depth > 4) return raw;
  prepare();
  const t = createTranslator(locale), key = exact!.get(raw.toLowerCase());
  if (key) return t(key);
  for (const frame of frames!) {
    const matched = frame.pattern.exec(raw);
    if (!matched) continue;
    const args = { ...matched.groups };
    if (args.lines) {
      const lines = args.lines.split("; "), translated = lines.map(line => dmToolsText(line, locale, depth + 1));
      if (translated.some((line, index) => line === lines[index] && /[A-Za-z]/.test(line))) return raw;
      args.lines = translated.join("；");
    }
    if (args.reason) args.reason = dmToolsText(args.reason, locale, depth + 1);
    if (args.what) args.what = dmToolsText(args.what, locale, depth + 1);
    return t(frame.key, args);
  }
  // XP/HP decomposition rows are all known before translating any of them.
  if (raw.includes("; ")) {
    const rows = raw.split("; "), translated = rows.map(row => dmToolsText(row, locale, depth + 1));
    if (translated.every((row, index) => row !== rows[index] || !/[A-Za-z]/.test(row))) return translated.join("；");
  }
  for (const source of [
    " A party of one or two feels a pack one band harder, so the multiplier is a step up.",
    " A party of six or more feels a pack one band easier, so the multiplier is a step down.",
  ]) if (raw.endsWith(source)) {
    const prefix = raw.slice(0, -source.length), translated = dmToolsText(prefix, locale, depth + 1);
    if (translated !== prefix) return translated + dmToolsText(source, locale, depth + 1);
  }
  return metricText(raw, locale);
}
