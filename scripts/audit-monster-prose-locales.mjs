import { register } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
register('./lib/register-alias.mjs', import.meta.url);
const { contentDisplay } = await import('../src/lib/rulebook/content-display.ts');
const { describeContentEntry } = await import('../src/lib/help/index.ts');
const fixtures = JSON.parse(readFileSync(new URL('./fixtures/srd-monster-rows.json', import.meta.url))).rows;
const rows = fixtures.map(row => {
  const entry = { ...row, source: 'open5e', documentSlug: 'wotc-srd' };
  const source = describeContentEntry(row.data, { includeMonsterActions: true }) ?? '';
  const display = contentDisplay('monsters', entry, 'zh-CN').display?.text ?? source;
  const blocks = display.split(/\n\n+/).filter(Boolean);
  const pending = blocks.filter(block => /[a-z]{4}/i.test(block) && !/[\u3400-\u9fff]/.test(block));
  return { name: row.name, slug: row.slug, blocks: blocks.length, untranslatedBlocks: pending.length,
    pending: pending.map(block => ({ heading: block.split('\n')[0].slice(0, 120), source: block })) };
});
const report = { version: 1, scope: '14 checked-in SRD monster fixtures; not the deployed catalog or a full localization acceptance',
  detection: 'Entirely Latin prose blocks; mixed-language blocks require separate review. Zero is not proof of complete translation.', rows };
if (process.argv.includes('--write')) writeFileSync(new URL('../docs/validation/monster-prose-localization.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(rows.map(({ name, blocks, untranslatedBlocks }) => ({ name, blocks, untranslatedBlocks }))));
