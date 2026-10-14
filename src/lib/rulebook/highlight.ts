// Search sends matched surface words; highlighting never loads a stemmer.
// Literal CJK terms may overlap (生命, 命值). Merge intervals so the visible
// phrase is highlighted once; React still escapes every returned text segment.
export function cjkHighlightRuns(text: string, terms: string[]): Array<{ text: string; marked: boolean }> {
  const ranges: Array<[number, number]> = [];
  for (const match of text.matchAll(/[a-z0-9]+(?:['’][a-z]+)?/gi)) {
    const key = match[0].toLowerCase().replace(/’/g, "'");
    if (terms.includes(key)) ranges.push([match.index, match.index + match[0].length]);
  }
  for (const term of terms.filter(term => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(term))) {
    let at = text.indexOf(term);
    while (at >= 0) { ranges.push([at, at + term.length]); at = text.indexOf(term, at + 1); }
  }
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const previous = merged.at(-1);
    if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
    else merged.push([...range]);
  }
  const runs: Array<{ text: string; marked: boolean }> = [];
  let at = 0;
  for (const [start, end] of merged) {
    if (start > at) runs.push({ text: text.slice(at, start), marked: false });
    runs.push({ text: text.slice(start, end), marked: true }); at = end;
  }
  if (at < text.length) runs.push({ text: text.slice(at), marked: false });
  return runs;
}
