import assert from 'node:assert/strict';
import { register } from 'node:module';
register('./lib/register-alias.mjs', import.meta.url);
const { rulebookPage, rulebookPages } = await import('../src/lib/rulebook/book.ts');
const { rulebookPageDisplay } = await import('../src/lib/rulebook/localized-pages.ts');
const { LOCALIZED_SPELL_PAGES } = await import('../src/lib/rulebook/localized-page-metadata.ts');
const { openCombatRenderer } = await import('./lib/combat-ui-fixtures.mjs');
const stub = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const renderer = await openCombatRenderer({ files: ['src/components/rulebook/RulebookPage.tsx'], stubs: {
  './PagePrep': stub('export const PagePrep=()=>null;'),
}});
const xrefs = new Map([['magic missile', 'magic-missile'], ['魔法飞弹', 'magic-missile']]);
for (const row of LOCALIZED_SPELL_PAGES) {
  const data = rulebookPage(row.id);
  const original = JSON.stringify(data);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  assert.equal(display.translated, true, row.id);
  const html = renderer.render('RulebookPage', { data: { ...data, display }, terms: [], xrefs, onOpen: () => {} }, 'zh-CN');
  assert.ok(html.includes(display.title), row.id);
  assert.ok(html.includes('施法时间') && html.includes('法术成分'), row.id);
  assert.ok(!html.includes('Casting Time') && !html.includes('At Higher Levels'), row.id);
  const en = rulebookPageDisplay(data.page, 'en');
  assert.equal(en.md, data.page.md);
  const english = renderer.render('RulebookPage', { data: { ...data, display: en }, terms: [], xrefs, onOpen: () => {} }, 'en');
  assert.ok(english.includes('Casting Time'));
  // Switching away from a cached display must never show the previous language.
  const switched = renderer.render('RulebookPage', { data: { ...data, display }, terms: [], xrefs, onOpen: () => {} }, 'en');
  assert.ok(switched.includes('Casting Time') && !switched.includes('施法时间'));
  assert.equal(JSON.stringify(data), original);
  assert.equal(rulebookPageDisplay({ ...data.page, md: data.page.md.replace('**Range:**', '**Range:** changed') }, 'zh-CN').translated, false);
  assert.equal(rulebookPageDisplay({ ...data.page, md: data.page.md + '\n\nExtra rule.' }, 'zh-CN').translated, false);
}
const shield = rulebookPage('shield');
let opened; 
renderer.render('RulebookPage', { data: { ...shield, display: rulebookPageDisplay(shield.page, 'zh-CN') }, terms: [], xrefs, onOpen: id => { opened = id; } }, 'zh-CN');
const link = renderer.elements().find(element => element.type === 'button' && element.props.className === 'rb-xref');
assert.ok(link, 'Translated spell reference remains clickable');
link.props.onClick();
assert.equal(opened, 'magic-missile');

const items = rulebookPages().filter(page => page.kind === 'item');
assert.equal(items.length, 239);
for (const page of items) {
  const before = JSON.stringify(page);
  const display = rulebookPageDisplay(page, 'zh-CN');
  assert.equal(display.translated, true, page.id);
  assert.match(display.title, /[\u4e00-\u9fff]/, page.id);
  assert.equal(rulebookPageDisplay(page, 'en').md, page.md);
  assert.equal(rulebookPageDisplay({ ...page, meta: page.meta + ' authored variant' }, 'zh-CN').translated, false);
  assert.equal(rulebookPageDisplay({ ...page, md: page.md + '\n\nExtra rule.' }, 'zh-CN').translated, false);
  assert.equal(JSON.stringify(page), before);
}
// Exercise complete tables and embedded blocks in the real book renderer.
for (const id of ['bag-of-tricks', 'deck-of-many-things', 'figurine-of-wondrous-power', 'staff-of-the-magi']) {
  const data = rulebookPage(id);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  const html = renderer.render('RulebookPage', { data: { ...data, display }, terms: [], xrefs, onOpen: () => {} }, 'zh-CN');
  assert.ok(html.includes(display.title), id);
}
for (const page of rulebookPages().filter(page => page.kind === 'spell' && /(?:cantrip|[12]\w*-level)/.test(page.meta))) {
  assert.ok(LOCALIZED_SPELL_PAGES.some(row => row.id === page.id), 'Missing complete low-level book page: ' + page.id);
}

const untouched = rulebookPages().find(page => page.kind === 'spell' && !LOCALIZED_SPELL_PAGES.some(row => row.id === page.id));
assert.equal(rulebookPageDisplay(untouched, 'zh-CN').md, untouched.md);
console.log(`Rulebook: ${LOCALIZED_SPELL_PAGES.length} complete Chinese spell pages and ${items.length} full item pages; bilingual rendering, source/canonical preservation and translated cross-reference passed.`);
