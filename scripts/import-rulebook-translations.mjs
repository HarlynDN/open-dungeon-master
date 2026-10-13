import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

export function prepareRulebookTranslations(drafts, catalog, manifest, pages, sourceHash, anchors) {
  const byId = new Map(pages.map(page => [page.id, page]));
  const updated = { ...catalog };
  const required = new Map(manifest.requiredPages.map(row => [row.id, row]));
  assert.ok(Object.keys(drafts).length, 'No translation drafts');
  for (const [id, draft] of Object.entries(drafts)) {
    const page = byId.get(id);
    assert.ok(page, 'Unknown canonical page: ' + id);
    assert.ok(typeof draft.title === 'string' && draft.title.trim(), id + ': title');
    assert.ok(typeof draft.md === 'string' && draft.md.trim() && draft.md !== page.md, id + ': complete translated body');
    if (draft.meta !== undefined) assert.equal(typeof draft.meta, 'string', id + ': metadata');
    assert.equal(anchors(draft.md).length, anchors(page.md).length, id + ': heading/sidebars');
    updated[id] = { sourceHash: sourceHash(page), title: draft.title, md: draft.md, ...(draft.meta === undefined ? {} : { meta: draft.meta }) };
    required.set(id, { id, kind: page.kind, sourceHash: sourceHash(page) });
  }
  return { catalog: updated, manifest: { ...manifest, requiredPages: pages.filter(page => required.has(page.id)).map(page => required.get(page.id)) } };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  assert.ok(process.argv[2], 'Usage: node scripts/import-rulebook-translations.mjs <reviewed-drafts.json>');
  register('./lib/register-alias.mjs', import.meta.url);
  const { rulebookPages } = await import('../src/lib/rulebook/book.ts');
  const { nativeBookSourceHash, rulebookPageDisplay } = await import('../src/lib/rulebook/localized-pages.ts');
  const { bookAnchorIds, parseBook } = await import('../src/lib/rulebook/markdown.ts');
  const { verifyRulebookCoverage } = await import('./lib/rulebook-coverage.mjs');
  const catalogPath = new URL('../src/lib/rulebook/locales/zh-CN.json', import.meta.url);
  const manifestPath = new URL('../docs/validation/rulebook-translation-coverage.json', import.meta.url);
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const pages = rulebookPages();
  // Source changes require review before this importer may update delivery data.
  verifyRulebookCoverage(manifest, pages, nativeBookSourceHash, rulebookPageDisplay);
  const drafts = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const result = prepareRulebookTranslations(drafts, catalog, manifest, pages, nativeBookSourceHash, md => bookAnchorIds(parseBook(md)));
  writeFileSync(catalogPath, JSON.stringify(result.catalog, null, 2) + '\n');
  writeFileSync(manifestPath, JSON.stringify(result.manifest, null, 2) + '\n');
  console.log('Imported canonical-source-bound drafts: ' + Object.keys(drafts).join(', ') + '. Run the bilingual page check before committing.');
}
