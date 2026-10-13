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
const untouched = rulebookPages().find(page => page.kind === 'spell' && !LOCALIZED_SPELL_PAGES.some(row => row.id === page.id));
assert.equal(rulebookPageDisplay(untouched, 'zh-CN').md, untouched.md);
console.log('Rulebook: 8 complete Chinese spell pages, actual bilingual rendering, source/canonical preservation and translated cross-reference passed.');
