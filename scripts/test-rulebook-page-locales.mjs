import assert from 'node:assert/strict';
import { register } from 'node:module';
register('./lib/register-alias.mjs', import.meta.url);
const { rulebookPage, rulebookPages } = await import('../src/lib/rulebook/book.ts');
const { rulebookPageDisplay, nativeBookSourceHash } = await import('../src/lib/rulebook/localized-pages.ts');
const { default: coverageManifest } = await import('../docs/validation/rulebook-translation-coverage.json', { with: { type: 'json' } });
const { verifyRulebookCoverage } = await import('./lib/rulebook-coverage.mjs');
const { bookAnchorIds, parseBook, preserveBookAnchors } = await import('../src/lib/rulebook/markdown.ts');
const pages = rulebookPages();
const verify = (manifest = coverageManifest, display = rulebookPageDisplay, options) => verifyRulebookCoverage(manifest, pages, nativeBookSourceHash, display, options);
const coverage = verify(coverageManifest, rulebookPageDisplay, { full: process.argv.includes('--final') });

// Native chapters and shared spell help preserve source table structure/values.
// Item source-layout repairs and card identities use the cell-level audit below.
for (const { id, kind } of coverageManifest.requiredPages) {
  if (kind === 'item') continue;
  const data = rulebookPage(id);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  const sourceTables = parseBook(data.page.md).filter(block => block.kind === 'table');
  const translatedTables = parseBook(display.md).filter(block => block.kind === 'table');
  assert.equal(translatedTables.length, sourceTables.length, id + ': complete tables');
  for (let i = 0; i < sourceTables.length; i++) {
    assert.equal(translatedTables[i].head.length, sourceTables[i].head.length, id + ': table columns');
    assert.equal(translatedTables[i].rows.length, sourceTables[i].rows.length, id + ': complete table rows');
    assert.deepEqual(translatedTables[i].rows.map(row => row.length), sourceTables[i].rows.map(row => row.length), id + ': complete table cells');
    const numbers = table => table.rows.flatMap(row => row.flatMap(cell => cell.match(/\b(?:\d+d\d+|d\d+)\b|(?<![A-Za-z0-9])[+−×÷-]?\d+(?:[\d,/]*(?:[½¼¾])?)/gi) ?? []));
    assert.deepEqual(numbers(translatedTables[i]), numbers(sourceTables[i]), id + ': table values');
  }
}
const firstRequired = coverageManifest.requiredPages[0];
assert.throws(() => verify({ ...coverageManifest, requiredPages: [...coverageManifest.requiredPages, firstRequired] }), /Duplicate required page/);
assert.throws(() => verify({ ...coverageManifest, requiredPages: [{ ...firstRequired, id: 'unknown-page' }] }), /Unknown required page/);
assert.throws(() => verify({ ...coverageManifest, requiredPages: [{ ...firstRequired, sourceHash: 'stale' }] }), /Stale source binding/);
assert.throws(() => verify(coverageManifest, (page, locale) => page.id === firstRequired.id ? { translated: false } : rulebookPageDisplay(page, locale)), /Missing required translation/);
assert.throws(() => verify({ ...coverageManifest, requiredPages: coverageManifest.requiredPages.slice(1) }), /Translation omitted from delivery manifest/);
if (coverage.translated !== coverage.total) assert.throws(() => verify(coverageManifest, rulebookPageDisplay, { full: true }), /Incomplete rulebook/);
const { LOCALIZED_SPELL_PAGES } = await import('../src/lib/rulebook/localized-page-metadata.ts');
const { openCombatRenderer } = await import('./lib/combat-ui-fixtures.mjs');
const stub = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const renderer = await openCombatRenderer({ files: ['src/components/rulebook/RulebookPage.tsx'], stubs: {
  './PagePrep': stub('export const PagePrep=()=>null;'),
}});
const xrefs = new Map([['magic missile', 'magic-missile'], ['魔法飞弹', 'magic-missile']]);
const { referenceDisplayName, resolveReference } = await import('../src/lib/i18n/references.ts');
for (const row of coverageManifest.requiredPages.filter(row => row.kind === 'monster')) {
  const data = rulebookPage(row.id);
  const before = JSON.stringify(data);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  // Quantities outside the ability table matter too: HP, attack bonuses,
  // damage dice, DCs, recharge ranges, distances and durations.
  assert.deepEqual(display.md.match(/\d+/g), data.page.md.match(/\d+/g), row.id + ': monster quantities');
  const props = { data: { ...data, display }, terms: [], xrefs, onOpen: () => {} };
  const chinese = renderer.render('RulebookPage', props, 'zh-CN');
  const isNpcGuide = row.id === 'customizing-npcs';
  assert.ok(chinese.includes(display.title), row.id);
  if (isNpcGuide) {
    for (const section of ['种族特性', '替换法术', '更换护甲和武器', '魔法物品']) assert.ok(chinese.includes(section), section);
    assert.ok(!chinese.includes('rb-abilities'), 'NPC guide must remain prose');
  } else {
    assert.ok(chinese.includes('护甲等级'), row.id);
    assert.ok(chinese.includes('rb-abilities'), row.id + ': localized ability table styling');
  }
  assert.ok(!chinese.includes('Armor Class') && !chinese.includes('Melee Weapon Attack'), row.id);
  const english = renderer.render('RulebookPage', props, 'en');
  if (isNpcGuide) {
    for (const section of ['Racial Traits', 'Spell Swaps', 'Armor and Weapon Swaps', 'Magic Items']) assert.ok(english.includes(section), section);
    assert.ok(!english.includes('rb-abilities'));
  } else assert.ok(english.includes('Armor Class') && english.includes('rb-abilities'), row.id);
  assert.equal(rulebookPageDisplay(data.page, 'en').md, data.page.md);
  assert.equal(rulebookPageDisplay({ ...data.page, md: data.page.md + '\n\nAuthored change.' }, 'zh-CN').translated, false);
  if (!isNpcGuide) {
    assert.equal(referenceDisplayName('monster', data.page.title, 'zh-CN'), display.title);
    const candidate = { id: row.id, name: data.page.title };
    assert.equal(resolveReference('monster', display.title, [candidate], 'zh-CN').entry?.id, row.id);
    assert.equal(referenceDisplayName('monster', data.page.title, 'en'), data.page.title);
  }
  assert.equal(JSON.stringify(data), before);
}
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

const { compareItemTables } = await import('./lib/item-table-review.mjs');
const items = rulebookPages().filter(page => page.kind === 'item');
assert.equal(items.length, 239);
for (const page of items) {
  const before = JSON.stringify(page);
  const display = rulebookPageDisplay(page, 'zh-CN');
  assert.equal(display.translated, true, page.id);
  compareItemTables(page, parseBook(page.md).filter(b => b.kind === 'table'), parseBook(display.md).filter(b => b.kind === 'table'), coverageManifest.itemTableReviews?.[page.id], nativeBookSourceHash(page));
  assert.match(display.title, /[\u4e00-\u9fff]/, page.id);
  assert.equal(rulebookPageDisplay(page, 'en').md, page.md);
  assert.equal(rulebookPageDisplay({ ...page, meta: page.meta + ' authored variant' }, 'zh-CN').translated, false);
  assert.equal(rulebookPageDisplay({ ...page, md: page.md + '\n\nExtra rule.' }, 'zh-CN').translated, false);
  assert.equal(JSON.stringify(page), before);
}
// Mutation checks prove that normalization cannot hide lost rows, moved
// quantities, changed dice/roll ranges, card identities, or stale source review.
for (const id of Object.keys(coverageManifest.itemTableReviews ?? {})) {
  assert.ok(items.some(page => page.id === id), 'Unknown reviewed item: ' + id);
}
function rejectTableMutation(id, mutate) {
  const page = items.find(page => page.id === id);
  const source = parseBook(page.md).filter(b => b.kind === 'table');
  const target = parseBook(rulebookPageDisplay(page, 'zh-CN').md).filter(b => b.kind === 'table');
  mutate(target);
  assert.throws(() => compareItemTables(page, source, target, coverageManifest.itemTableReviews?.[id], nativeBookSourceHash(page)));
}
rejectTableMutation('bag-of-beans', tables => tables[0].rows.splice(8, 1));
rejectTableMutation('bag-of-beans', tables => { tables[0].rows[8][0] = '72–80'; });
rejectTableMutation('bag-of-beans', tables => { tables[0].rows[0][1] = tables[0].rows[0][1].replace('5d6', '6d6'); });
rejectTableMutation('robe-of-useful-items', tables => { tables[0].rows[2][1] = tables[0].rows[2][1].replace('10', '20'); });
rejectTableMutation('deck-of-illusions', tables => { tables[0].rows[0][0] = '黑桃 A'; });
rejectTableMutation('deck-of-illusions', tables => { tables[0].rows[4][0] = '红桃 9'; });
rejectTableMutation('deck-of-many-things', tables => { tables[0].rows[20][0] = '无 TM 标记的王牌'; });
rejectTableMutation('deck-of-many-things', tables => { tables[1].rows[0][0] = '16（-3）'; });
{
  const page = items.find(page => page.id === 'bag-of-beans');
  const source = parseBook(page.md).filter(b => b.kind === 'table');
  const target = parseBook(rulebookPageDisplay(page, 'zh-CN').md).filter(b => b.kind === 'table');
  assert.throws(() => compareItemTables(page, source, target, { ...coverageManifest.itemTableReviews[page.id], sourceHash: 'stale' }, nativeBookSourceHash(page)), /stale table review/);
  source[0].rows[7][1] = source[0].rows[7][1].replace('71-80', '72-80');
  assert.throws(() => compareItemTables(page, source, target, coverageManifest.itemTableReviews[page.id], nativeBookSourceHash(page)), /reviewed split/);
}
// Exercise complete tables and embedded blocks in the real book renderer.
for (const id of ['bag-of-tricks', 'deck-of-many-things', 'figurine-of-wondrous-power', 'staff-of-the-magi']) {
  const data = rulebookPage(id);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  const html = renderer.render('RulebookPage', { data: { ...data, display }, terms: [], xrefs, onOpen: () => {} }, 'zh-CN');
  assert.ok(html.replace(/<[^>]+>/g, '').includes(display.title), id);
}
for (const page of rulebookPages().filter(page => page.kind === 'spell' && /(?:cantrip|[12]\w*-level)/.test(page.meta))) {
  assert.ok(LOCALIZED_SPELL_PAGES.some(row => row.id === page.id), 'Missing complete low-level book page: ' + page.id);
}

const { default: nativeCatalog } = await import('../src/lib/rulebook/locales/zh-CN.json', { with: { type: 'json' } });
const { prepareRulebookTranslations } = await import('./import-rulebook-translations.mjs');
const anchors = md => bookAnchorIds(parseBook(md));
const prepare = drafts => prepareRulebookTranslations(drafts, nativeCatalog, coverageManifest, pages, nativeBookSourceHash, anchors);
const samePage = prepare({ conditions: { title: nativeCatalog.conditions.title, md: nativeCatalog.conditions.md } });
assert.deepEqual(samePage.catalog, nativeCatalog);
assert.deepEqual(samePage.manifest, coverageManifest);
assert.throws(() => prepare({ 'unknown-page': { title: '不存在', md: '不存在' } }), /Unknown canonical page/);
assert.throws(() => prepare({ conditions: { title: '状态', md: '遗漏所有段落标题' } }), /heading\/sidebars/);
assert.throws(() => prepare({}), /No translation drafts/);
const nativeRules = Object.keys(nativeCatalog);
for (const id of nativeRules) {
  const data = rulebookPage(id);
  const before = JSON.stringify(data);
  const display = rulebookPageDisplay(data.page, 'zh-CN');
  assert.equal(display.translated, true, id);
  const blocks = preserveBookAnchors(parseBook(display.md), display.anchors);
  assert.ok(blocks);
  assert.deepEqual(bookAnchorIds(blocks), bookAnchorIds(parseBook(data.page.md)));
  const html = renderer.render('RulebookPage', { data: { ...data, display }, terms: [], at: id === 'conditions' ? 'exhaustion' : undefined, xrefs, onOpen: () => {} }, 'zh-CN');
  assert.ok(html.replace(/<[^>]+>/g, '').includes(display.title), id);
  for (const anchor of display.anchors) assert.ok(html.includes('data-anchor="' + anchor + '"'), id + ': ' + anchor);
  assert.equal(rulebookPageDisplay(data.page, 'en').md, data.page.md);
  assert.equal(rulebookPageDisplay({ ...data.page, md: data.page.md + '\nNew authored rule.' }, 'zh-CN').translated, false);
  assert.equal(rulebookPageDisplay({ ...data.page, title: data.page.title + ' variant' }, 'zh-CN').translated, false);
  assert.equal(JSON.stringify(data), before);
}
assert.equal(preserveBookAnchors(parseBook('## 中文标题'), []), null);
const conditions = rulebookPageDisplay(rulebookPage('conditions').page, 'zh-CN');
assert.match(conditions.md, /体内已经存在的毒素或疾病只是暂时停止作用/);
assert.match(conditions.md, /从死亡中复活也会使生物的力竭等级降低 1/);

const untouched = rulebookPages().find(page => page.kind === 'spell' && !LOCALIZED_SPELL_PAGES.some(row => row.id === page.id));
if (untouched && !nativeCatalog[untouched.id]) assert.equal(rulebookPageDisplay(untouched, 'zh-CN').md, untouched.md);
console.log(`Rulebook: ${coverage.translated}/${coverage.total} complete Chinese pages; manifest integrity, bilingual rendering, source/canonical preservation and translated cross-reference passed.`);
console.log(JSON.stringify(coverage.kinds));
if (process.argv.includes('--missing')) console.log(JSON.stringify(coverage.missingIds));
