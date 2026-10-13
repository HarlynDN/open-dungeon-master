import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

export function rulebookCorpusIdentity(pages, sourceHash) {
  const kinds = {};
  for (const page of pages) kinds[page.kind] = (kinds[page.kind] ?? 0) + 1;
  return {
    pageCount: pages.length,
    kinds,
    sha256: createHash('sha256').update(JSON.stringify(pages.map(page => [page.id, sourceHash(page)]))).digest('hex'),
  };
}

// Expected delivery is independent of the available translation catalogs.
export function verifyRulebookCoverage(manifest, pages, sourceHash, display, { full = false } = {}) {
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.locale, 'zh-CN');
  assert.deepEqual(manifest.corpus, rulebookCorpusIdentity(pages, sourceHash), 'Canonical corpus changed; review its source bindings');
  const byId = new Map(pages.map(page => [page.id, page]));
  const required = new Set();
  for (const row of manifest.requiredPages) {
    assert.ok(!required.has(row.id), 'Duplicate required page: ' + row.id);
    required.add(row.id);
    const page = byId.get(row.id);
    assert.ok(page, 'Unknown required page: ' + row.id);
    assert.equal(row.kind, page.kind, 'Wrong page kind: ' + row.id);
    assert.equal(row.sourceHash, sourceHash(page), 'Stale source binding: ' + row.id);
    assert.equal(display(page, manifest.locale).translated, true, 'Missing required translation: ' + row.id);
  }
  const kinds = {};
  const missingIds = [];
  for (const page of pages) {
    const group = kinds[page.kind] ??= { total: 0, translated: 0, remaining: 0 };
    group.total++;
    if (display(page, manifest.locale).translated) {
      assert.ok(required.has(page.id), 'Translation omitted from delivery manifest: ' + page.id);
      group.translated++;
    } else {
      group.remaining++;
      missingIds.push(page.id);
    }
  }
  if (full) assert.equal(missingIds.length, 0, 'Incomplete rulebook: ' + missingIds.join(', '));
  return { total: pages.length, translated: pages.length - missingIds.length, kinds, missingIds };
}
