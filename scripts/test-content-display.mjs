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
