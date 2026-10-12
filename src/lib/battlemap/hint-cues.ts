import type { AppLocale } from "../i18n/locales.ts";
import type { MapTheme } from "./generate.ts";
import type { AmbientLight } from "./types.ts";

type Cue = Exclude<MapTheme, "field"> | AmbientLight | "rough";
type CueSet = { patterns: Record<Cue, RegExp>; splitWords: boolean };

// Locale adapters describe keywords only. Generator priority, enum values and
// seeded geometry stay language independent. English patterns retain their
// existing boundaries/quirks to preserve saved seed regeneration.
export const MAP_HINT_CUES = {
  en: { splitWords: false, patterns: {
    cave: /\bcave|cavern|dungeon|crypt|tomb|tunnel|mine|underdark|barrow\b/,
    swamp: /\bswamp|marsh|bog|mire|fen\b/,
    forest: /\bforest|wood|grove|jungle|thicket\b/,
    riverside: /\briver|lake|shore|beach|sewer|canal|dock|harbor\b/,
    interior: /\bstreet|alley|warehouse|tavern|inn|room|hall|temple|church|castle|keep|tower|deck|ship|manor|library\b/,
    dark: /\bnight|midnight|moonlit|dark|darkness|pitch-black\b/,
    dim: /\bdim|dusk|twilight|torchlit|candlelit|foggy|misty\b/,
    bright: /\bdaylight|noon|sunny|bright\b/,
    rough: /\brubble|ice|mud|sand|snow\b/,
  } },
  "zh-CN": { splitWords: true, patterns: {
    cave: /地下城|幽暗地域|地下墓穴|洞穴|洞窟|墓穴|陵墓|坟墓|隧道|矿井|古墓/u,
    swamp: /沼泽|湿地|泥沼|泥潭/u,
    forest: /森林|树林|丛林|林地|树丛/u,
    riverside: /河流|河岸|河边|湖泊|湖畔|海岸|海滩|沙滩|下水道|运河|码头|港口|水域/u,
    interior: /图书馆|仓库|酒馆|旅店|房间|大厅|神殿|教堂|城堡|要塞|高塔|甲板|船舱|庄园|街道|小巷/u,
    dark: /黑夜|夜晚|午夜|月光|黑暗|漆黑|夜间/u,
    dim: /昏暗|黄昏|暮色|火把|烛光|蜡烛|浓雾|薄雾/u,
    bright: /日光|白昼|正午|晴朗|明亮/u,
    rough: /碎石|瓦砾|冰面|冰雪|泥地|泥泞|泥土|沙地|沙子|积雪/u,
  } },
} satisfies Record<AppLocale, CueSet>;

export function mapHintMatches(text: string, cue: Cue): boolean {
  return Object.values(MAP_HINT_CUES).some(adapter => adapter.patterns[cue].test(text));
}

const wordPattern = new RegExp(Object.values(MAP_HINT_CUES).filter(adapter => adapter.splitWords)
  .flatMap(adapter => Object.values(adapter.patterns).map(pattern => pattern.source)).join("|"), "gu");

// English whitespace tokens retain their native punctuation. Other locale
// adapters can expose cue spans inside unspaced text, without losing the
// user's remaining words or inventing an English translation of the hint.
export function splitMapHintWords(hint: string): string[] {
  return hint.split(/\s+/).filter(Boolean).flatMap(part => {
    const words: string[] = [];
    let at = 0;
    for (const match of part.matchAll(wordPattern)) {
      if (match.index > at) words.push(part.slice(at, match.index));
      words.push(match[0]);
      at = match.index + match[0].length;
    }
    if (at < part.length) words.push(part.slice(at));
    return words;
  });
}

export function normalizeMapHintWord(part: string): string {
  const localized = [...part.matchAll(wordPattern)].some(match => match.index === 0 && match[0] === part);
  return localized ? part.toLowerCase() : part.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
}
