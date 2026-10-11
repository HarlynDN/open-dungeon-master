import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {MESSAGE_CATALOGS} from '../../src/lib/i18n/messages.ts';
import {messageScope} from '../../src/lib/i18n/resource-scope.ts';

const root = path.resolve(import.meta.dirname, '../..');
export const SHARED_CATALOG_FILES = new Set([
  'src/lib/i18n/messages.ts',
  ...['en','zh-CN'].flatMap(locale=>['ui','content'].map(scope=>`src/lib/i18n/resources/${locale}.${scope}.json`)),
]);
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// A review owns a fixed set of keys, not an aggregate file or every future
// message in its namespace. Include parameter names as part of the contract.
export function reviewedMessageHash(catalog, keys) {
  return hash([...keys].sort().map(key=>{
    assert.equal(typeof catalog[key], 'string', `Reviewed message missing: ${key}`);
    return [key,catalog[key],[...new Set([...catalog[key].matchAll(/\{(\w+)\}/g)].map(match=>match[1]))].sort()];
  }));
}
export function reviewedScopeHash(keys, scopeOf = messageScope) {
  return hash([...keys].sort().map(key=>[key,scopeOf(key)]));
}
export function generatedCatalogs(projectRoot = root) {
  return Object.fromEntries(Object.keys(MESSAGE_CATALOGS).map(locale=>[locale,
    Object.fromEntries(['ui','content'].flatMap(scope=>Object.entries(JSON.parse(fs.readFileSync(path.join(projectRoot,`src/lib/i18n/resources/${locale}.${scope}.json`),'utf8'))))),
  ]));
}
export function assertReviewedMessages(record, {
  catalogs = MESSAGE_CATALOGS, generated = generatedCatalogs(),
  manifest = JSON.parse(fs.readFileSync(path.join(root,'docs/validation/reviewed-message-scopes.json'),'utf8')),
  scopeOf = messageScope,
} = {}) {
  for (const id of record.semanticReviews ?? []) {
    const group = manifest.groups[id];
    assert.ok(group, `Unknown semantic review: ${id}`);
    for (const [locale,expected] of Object.entries(group.messageSha256)) {
      assert.equal(reviewedMessageHash(catalogs[locale],group.keys),expected,`${id}/${locale}: reviewed source or translation changed`);
      assert.equal(reviewedMessageHash(generated[locale],group.keys),expected,`${id}/${locale}: generated reviewed messages differ`);
    }
    assert.equal(reviewedScopeHash(group.keys,scopeOf),group.scopeSha256,`${id}: reviewed delivery scope changed`);
  }
}
