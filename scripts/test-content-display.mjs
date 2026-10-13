import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';
register('./lib/register-alias.mjs', import.meta.url);
const { contentDisplay } = await import('../src/lib/rulebook/content-display.ts');
const { referenceRowDescription } = await import('../src/lib/i18n/reference-ui-presentations.ts');
const book = JSON.parse(readFileSync(new URL('../src/lib/rulebook/srd-5.1.json', import.meta.url)));
const page = book.pages.find(page => page.id === 'goblin');
const row = { name: page.title, source: 'srd', documentSlug: 'wotc-srd', data: { desc: page.md } };
const before = JSON.stringify(row);
const translated = contentDisplay('monsters', row, 'zh-CN');
assert.ok(translated.display?.text.includes('地精'));
assert.equal(referenceRowDescription('monsters', translated, 'zh-CN'), translated.display.text);
assert.equal(referenceRowDescription('monsters', translated, 'en'), translated.display.source);
assert.equal(JSON.stringify(row), before);
assert.equal(translated.data, row.data);
assert.equal(contentDisplay('monsters', row, 'en'), row);
for (const other of [
  { ...row, source: 'homebrew' },
  { ...row, documentSlug: 'other-book' },
  { ...row, name: 'Custom Goblin' },
  { ...row, data: { desc: page.md + '\nChanged ability.' } },
]) assert.equal(contentDisplay('monsters', other, 'zh-CN'), other);
const stale = { ...translated, data: { desc: 'Changed after projection.' } };
assert.equal(referenceRowDescription('monsters', stale, 'zh-CN'), 'Changed after projection.');
console.log('content-display: source identity, Chinese consumer, English switch, mutation and stale/custom refusal passed');

const { bundledSpellRows, bundledItemRows } = await import('../src/lib/rulebook/catalog-rows.ts');
const { describeContentEntry } = await import('../src/lib/help/index.ts');
let spellCount = 0, itemCount = 0;
for (const [kind, rows] of [['spells', bundledSpellRows()], ['items', bundledItemRows()]]) {
  for (const native of rows) {
    const original = describeContentEntry(native.data, { includeHigherLevels: kind === 'spells' });
    const shown = contentDisplay(kind, native, 'zh-CN');
    assert.ok(shown.display, native.name + ': complete native projection');
    assert.equal(shown.display.source, original);
    assert.equal(referenceRowDescription(kind, shown, 'zh-CN'), shown.display.text);
    assert.equal(referenceRowDescription(kind, shown, 'en'), original);
    assert.equal(shown.data, native.data);
    const changed = { ...native, data: { ...native.data, desc: String(native.data.desc ?? '') + '\nCustom alteration.' } };
    assert.equal(contentDisplay(kind, changed, 'zh-CN'), changed);
    if (kind === 'spells') spellCount++; else itemCount++;
  }
}
console.log(`content-display: ${spellCount} complete spells and ${itemCount} items, Chinese/English and changed-source refusal passed`);

const fixtures = JSON.parse(readFileSync(new URL('./fixtures/srd-monster-rows.json', import.meta.url))).rows;
let translatedMonsters = 0;
for (const fixture of fixtures) {
  const native = { ...fixture, source: 'open5e', documentSlug: 'wotc-srd' };
  const source = describeContentEntry(native.data, { includeMonsterActions: true });
  assert.ok(source?.includes('Actions'), native.name);
  const shown = contentDisplay('monsters', native, 'zh-CN');
  assert.equal(shown.data, native.data);
  assert.equal(referenceRowDescription('monsters', shown, 'en'), source);
  if (shown.display) {
    translatedMonsters++;
    assert.equal(referenceRowDescription('monsters', shown, 'zh-CN'), shown.display.text);
    assert.deepEqual(shown.display.text.match(/\d+/g), source.match(/\d+/g), native.name);
  }
  const altered = structuredClone(native);
  altered.data.actions[0].desc = 'Custom ability causes 999 damage.';
  const changed = contentDisplay('monsters', altered, 'zh-CN');
  assert.ok((changed.display?.text ?? describeContentEntry(altered.data, { includeMonsterActions: true })).includes('Custom ability causes 999 damage.'));
}
assert.ok(translatedMonsters > 0);
console.log(`structured monster prose: ${fixtures.length} source rows checked, ${translatedMonsters} have matching translated paragraphs; unmatched paragraphs retained`);

const aboleth = fixtures.find(row => row.name === 'Aboleth');
const abolethView = contentDisplay('monsters', { ...aboleth, source: 'open5e', documentSlug: 'wotc-srd' }, 'zh-CN');
assert.ok(abolethView.display.text.includes('黏液云'));
assert.ok(!abolethView.display.text.includes('###### Traits'));
const changedReach = structuredClone(aboleth);
changedReach.data.special_abilities.find(row => row.name === 'Mucous Cloud').desc = changedReach.data.special_abilities.find(row => row.name === 'Mucous Cloud').desc.replace('5 ft.', '6 ft.');
const reachView = contentDisplay('monsters', { ...changedReach, source: 'open5e', documentSlug: 'wotc-srd' }, 'zh-CN');
assert.ok(reachView.display.text.includes('6 ft.'));
console.log('monster prose: equivalent foot units translate; changed reach remains authored');
