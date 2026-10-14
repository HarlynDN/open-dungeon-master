// Browser-safe Chinese segmentation shared by recall and the research desk.
import { STOP_LIST } from "./stop-words/english.ts";
const ENGLISH_STOP = new Set(STOP_LIST.split("\n").flatMap(line => line.split("|")[0].trim().split(/\s+/)).filter(Boolean));

export const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const CJK_STOP_WORDS = new Set(["的", "了", "在", "是", "和", "与", "有", "为", "我们", "你们", "他们", "这个", "那个"]);
const wordSegmenter = typeof Intl.Segmenter === "function"
  ? new Intl.Segmenter("zh-CN", { granularity: "word" })
  : null;

export function segmentCjk(token: string): string[] {
  if (wordSegmenter) {
    const words = [...wordSegmenter.segment(token)]
      .filter((part) => part.isWordLike)
      .map((part) => part.segment)
      .filter((part) => CJK.test(part)
        ? !CJK_STOP_WORDS.has(part)
        : part.length > 2 && !ENGLISH_STOP.has(part));
    // ICU can split a domain term across boundaries (e.g. 掷骰子 becomes
    // 掷骰 + 子). Add overlapping CJK bigrams that were not already emitted
    // so a two-character query and a short proper name still find the run.
    const existing = new Set(words);
    const bigrams = [...token.matchAll(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu)]
      .flatMap(([run]) => {
        const chars = [...run];
        return chars.slice(0, -1).map((char, i) => char + chars[i + 1]);
      })
      .filter((word) => !existing.has(word) && !CJK_STOP_WORDS.has(word));
    return [...words, ...bigrams];
  }
  // Engines without ICU word segmentation: preserve two-character terms
  // and overlapping bigrams, rather than treating a paragraph as one word.
  return token.split(/([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+)/u)
    .flatMap((run) => {
      if (!CJK.test(run)) return run.length > 2 && !ENGLISH_STOP.has(run) ? [run] : [];
      const chars = [...run];
      const words = chars.length === 1 ? chars : chars.slice(0, -1).map((char, i) => char + chars[i + 1]);
      return words.filter((word) => !CJK_STOP_WORDS.has(word));
    });
}
