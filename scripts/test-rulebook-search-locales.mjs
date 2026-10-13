import assert from 'node:assert/strict';
import { register } from 'node:module';
register('./lib/register-alias.mjs', import.meta.url);
const { rulebookSearch, rulebookPage } = await import('../src/lib/rulebook/book.ts');
const { rulebookPageDisplay } = await import('../src/lib/rulebook/localized-pages.ts');
const { queryTerms, snippetFor, cjkHighlightRuns } = await import('../src/lib/rulebook/search.ts');
for (const [query, page, at] of [
  ['中毒', 'conditions', 'poisoned'], ['法术专注', 'spellcasting', 'concentration'], ['如何维持专注', 'spellcasting', 'concentration'], ['力竭', 'conditions', 'exhaustion'],
  ['魔法飞弹', 'magic-missile', undefined], ['体质调整值每提高1', 'beyond-1st-level', undefined],
]) {
  const result = rulebookSearch(query, undefined, 'zh-CN');
  assert.ok(result.terms.length);
  assert.equal(result.hits[0]?.page, page, query);
  if (at) assert.equal(result.hits[0].at, at, query);
  assert.match(result.hits[0].snippet, /[\u4e00-\u9fff]/);
}
assert.ok(rulebookSearch('熟练加值', undefined, 'zh-CN').hits.some(hit => hit.page === 'beyond-1st-level'));
assert.ok(rulebookSearch('魔', undefined, 'zh-CN').hits.some(hit => hit.page === 'magic-missile'));
assert.ok(rulebookSearch('至少100金币', undefined, 'zh-CN').hits.some(hit => hit.page === 'identify'));
for (const query of ['Magic Missile', '魔法飞弹']) {
  const first = rulebookSearch(query, undefined, 'zh-CN').hits[0];
  assert.equal(first.page, 'magic-missile');
  assert.equal(first.title, '魔法飞弹');
  assert.match(first.snippet, /施法|力场/);
}
assert.equal(rulebookSearch('exhaustion', undefined, 'zh-CN').hits[0].at, 'exhaustion');
assert.equal(rulebookSearch('exhaustion', undefined, 'en').hits[0].heading, 'Exhaustion');
assert.deepEqual(rulebookSearch('完全不存在的规则词组', undefined, 'zh-CN').hits, []);
assert.deepEqual(rulebookSearch('   ', undefined, 'zh-CN'), { hits: [], terms: [] });
const snippet = snippetFor('甲'.repeat(250) + '中毒' + '乙'.repeat(250), queryTerms('中毒'));
assert.ok(snippet.includes('中毒') && snippet.length < 220);
assert.deepEqual(cjkHighlightRuns('你的生命值上限。', queryTerms('生命值上限')),
  [{ text: '你的', marked: false }, { text: '生命值上限', marked: true }, { text: '。', marked: false }]);
const { openCombatRenderer } = await import('./lib/combat-ui-fixtures.mjs');
const stub = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const renderer = await openCombatRenderer({ files: ['src/components/rulebook/RulebookPage.tsx'], stubs: {
  './PagePrep': stub('export const PagePrep=()=>null;'),
}});
const data = rulebookPage('conditions');
const display = rulebookPageDisplay(data.page, 'zh-CN');
display.md = display.md.replace('中毒生物的', '<script>alert(1)</script>中毒生物的');
const html = renderer.render('RulebookPage', { data: { ...data, display }, terms: queryTerms('中毒'), at: 'poisoned', xrefs: new Map(), onOpen: () => {} }, 'zh-CN');
assert.ok(html.includes('<mark class="rb-mark">中毒</mark>'));
assert.ok(html.includes('&lt;script&gt;') && !html.includes('<script>'));
console.log('Chinese rulebook full-text/alias search, native anchors, bilingual result isolation, snippets and safe CJK highlighting passed.');
