import assert from 'node:assert/strict';

// Compare numeric facts per cell, allowing translated word order, never moving
// quantities between effects. Specific source conversion repairs are hash-bound
// in the coverage manifest and affect this comparison only, not English data.
const normalize = text => text.replace(/[–−]/g, '-');
const quantities = text => (normalize(text).match(/\b(?:\d+d\d+|d\d+)\b|(?<![A-Za-z0-9])[+×÷-]?\d+(?:,\d{3})*(?:\/\d+)?[½¼¾]?/gi) ?? []).sort();
function cardIdentity(text) {
  const ranks = { ace: 'A', king: 'K', queen: 'Q', jack: 'J', ten: '10', nine: '9', eight: '8', two: '2' };
  const suits = { hearts: '红桃', diamonds: '方块', spades: '黑桃', clubs: '梅花' };
  const match = /^(\w+) of (hearts|diamonds|spades|clubs)$/i.exec(text);
  if (match) {
    assert.ok(ranks[match[1].toLowerCase()], 'Unknown playing card rank');
    return suits[match[2].toLowerCase()] + ranks[match[1].toLowerCase()];
  }
  const jokers = { 'Jokers (2)': 'joker:2', '两张王牌（2）': 'joker:2', 'Joker (with TM)': 'joker:tm', '有 TM 标记的王牌': 'joker:tm', 'Joker (without TM)': 'joker:no-tm', '无 TM 标记的王牌': 'joker:no-tm' };
  if (jokers[text]) return jokers[text];
  assert.match(text, /^(红桃|方块|黑桃|梅花)\s*(A|K|Q|J|10|9|8|2)$/);
  return text.replace(/\s/g, '');
}
export function compareItemTables(page, sourceTables, targetTables, review, sourceHash) {
  if (review) assert.equal(review.sourceHash, sourceHash, page.id + ': stale table review');
  const sources = structuredClone(sourceTables);
  for (const split of review?.splits ?? []) {
    const rows = sources[split.table].rows;
    const at = rows.findIndex(row => row[0] === split.row);
    assert.ok(at >= 0, page.id + ': missing reviewed row');
    const marker = ' ' + split.nextRow + ' ';
    const parts = rows[at][1].split(marker);
    assert.equal(parts.length, 2, page.id + ': reviewed split must occur exactly once');
    rows.splice(at, 1, [split.row, parts[0]], [split.nextRow, parts[1]]);
  }
  assert.equal(targetTables.length, sources.length, page.id + ': table count');
  for (let t = 0; t < sources.length; t++) {
    const source = sources[t], target = targetTables[t];
    assert.equal(target.head.length, source.head.length, page.id + ': columns');
    assert.equal(target.rows.length, source.rows.length, page.id + ': rows');
    for (let r = 0; r < source.rows.length; r++) {
      assert.equal(target.rows[r].length, source.rows[r].length, page.id + ': cells');
      for (let c = 0; c < source.rows[r].length; c++) {
        let en = source.rows[r][c], zh = target.rows[r][c];
        const label = `${page.id}: table ${t} row ${r} cell ${c}`;
        if (c === 0 && source.head[0] === 'Playing Card') {
          assert.equal(cardIdentity(zh), cardIdentity(en), label + ': card identity');
          continue;
        }
        for (const phrase of review?.sharedQuantities ?? []) {
          if (t !== phrase.table || source.rows[r][0] !== phrase.row || c !== phrase.cell) continue;
          assert.equal(en.split(phrase.en).length, 2, label + ': reviewed English phrase');
          assert.equal(zh.split(phrase.zh).length, 2, label + ': reviewed Chinese phrase');
          en = en.replace(phrase.en, phrase.canonical);
          zh = zh.replace(phrase.zh, phrase.canonical);
        }
        assert.deepEqual(quantities(zh), quantities(en), label + ': quantities');
      }
    }
  }
}
