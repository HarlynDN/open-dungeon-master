import assert from 'node:assert/strict';
import { register } from 'node:module';
register('./lib/register-alias.mjs', import.meta.url);
const { bundledSpellRows } = await import('../src/lib/rulebook/catalog-rows.ts');
const { describeContentEntry } = await import('../src/lib/help/index.ts');
const { nativeSpellHelp } = await import('../src/lib/i18n/spell-help-presentations.ts');
const { SPELL_HELP } = await import('../src/lib/i18n/spell-help-metadata.ts');
await import('../src/lib/i18n/messages.ts');
const rows = bundledSpellRows();
for (const entry of SPELL_HELP) {
  const native = rows.find(row => row.name === entry.name);
  assert.ok(native, entry.name);
  const before = JSON.stringify(native);
  const source = describeContentEntry(native.data, { includeHigherLevels: true });
  const chinese = nativeSpellHelp(native, source, 'zh-CN');
  assert.notEqual(chinese, source, entry.name);
  assert.match(chinese, /[\u4e00-\u9fff]/);
  assert.equal(nativeSpellHelp(native, source, 'en'), source);
  assert.equal(nativeSpellHelp({ ...native, source: 'homebrew' }, source, 'zh-CN'), source);
  assert.equal(nativeSpellHelp({ ...native, documentSlug: 'other-book' }, source, 'zh-CN'), source);
  assert.equal(nativeSpellHelp(native, source + '\nAn authored extra effect.', 'zh-CN'), source + '\nAn authored extra effect.');
  // Quantities, dice and bonuses must survive the original full-source projection.
  const numbers = text => text.replace(/\d+(?:st|nd|rd|th)\b/g, '').match(/\d+(?:d\d+)?/g) ?? [];
  for (const number of new Set(numbers(source))) assert.ok(chinese.includes(number), entry.name + ': ' + number);
  if (native.data.higher_level) {
    assert.match(source, /At Higher Levels/);
    assert.match(chinese, /升环施法/);
    const bodyOnly = describeContentEntry(native.data);
    assert.equal(nativeSpellHelp(native, bodyOnly, 'zh-CN'), bodyOnly, 'Never accept a partial body as the complete spell');
  }
  assert.equal(JSON.stringify(native), before, 'Display must not alter canonical mechanics');
}
// The first playable tier must not quietly lose a source as the catalog evolves.
for (const row of rows.filter(row => Number(row.data.level_int ?? row.level) <= 1)) {
  assert.ok(SPELL_HELP.some(entry => entry.name === row.name), 'Missing cantrip/first-level body: ' + row.name);
}
const friendship = rows.find(row => row.name === 'Animal Friendship');
assert.match(nativeSpellHelp(friendship, describeContentEntry(friendship.data, { includeHigherLevels: true }), 'zh-CN'), /每比一环高一环，就能额外影响一个野兽/);
const missile = rows.find(row => row.name === 'Magic Missile');
assert.match(nativeSpellHelp(missile, describeContentEntry(missile.data, { includeHigherLevels: true }), 'zh-CN'), /额外产生一枚飞弹/);
console.log(`Native spell help: ${SPELL_HELP.length} complete source-bound bilingual descriptions; higher-level clauses and variant preservation passed.`);
