import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {suite} from './lib/enforce-harness.mjs';
import {assertReviewedMessages,generatedCatalogs,SHARED_CATALOG_FILES} from './lib/reviewed-messages.mjs';
import {MESSAGE_CATALOGS} from '../src/lib/i18n/messages.ts';
const root = path.resolve(import.meta.dirname,'..');
const {test,finish} = suite('test-reviewed-messages');
const manifest = JSON.parse(fs.readFileSync(path.join(root,'docs/validation/reviewed-message-scopes.json')));
const generated = generatedCatalogs();
const records = ['character-calling-translations','character-calling-material-translations','chinese-combat-ui-checks',
  'sheet-party-translations','special-caption-translations','chinese-terminology-checks'].map(name=>JSON.parse(fs.readFileSync(path.join(root,`docs/validation/${name}.json`))));
const options = {manifest,generated};
await test('six existing reviews retain their fixed bilingual values and delivery scopes without aggregate byte locks',()=>{
  assert.equal(manifest.baselineCommit,'bf87a494');
  assert.equal(Object.keys(manifest.groups).length,6);
  for (const record of records) {
    assertReviewedMessages(record,options);
    assert.ok(record.semanticReviews.length);
    for (const fields of [record.sources,record.sourceSha256]) for (const file of Object.keys(fields??{})) assert.ok(!SHARED_CATALOG_FILES.has(file),file);
  }
});
await test('unrelated namespace additions and key order or JSON formatting cannot invalidate an old review',()=>{
  const catalogs = Object.fromEntries(Object.entries(MESSAGE_CATALOGS).map(([locale,values])=>[locale,
    {...Object.fromEntries(Object.entries(values).reverse()),'sheetDialog.unrelated':'New copy','callingUi.newUnreviewedKey':'New copy'}]));
  const reordered = JSON.parse(JSON.stringify(catalogs,null,4));
  for (const record of records) assertReviewedMessages(record,{...options,catalogs,generated:reordered});
});
await test('reviewed English, Chinese, removed keys and changed interpolation fields still fail',()=>{
  const record=records[0],key=manifest.groups[record.semanticReviews[0]].keys[0];
  for (const locale of ['en','zh-CN']) {
    const catalogs=structuredClone(MESSAGE_CATALOGS);catalogs[locale][key]+=' changed';
    assert.throws(()=>assertReviewedMessages(record,{...options,catalogs}),/reviewed source or translation changed/);
    delete catalogs[locale][key];
    assert.throws(()=>assertReviewedMessages(record,{...options,catalogs}),/Reviewed message missing/);
  }
  const catalogs=structuredClone(MESSAGE_CATALOGS);
  const parameterKey=manifest.groups['calling-ui'].keys.find(key=>/\{\w+\}/.test(catalogs.en[key]));assert.ok(parameterKey);
  catalogs['zh-CN'][parameterKey]=catalogs['zh-CN'][parameterKey].replace(/\{\w+\}/,'{wrongParameter}');
  assert.throws(()=>assertReviewedMessages(record,{...options,catalogs}),/reviewed source or translation changed/);
});
await test('a stale generated translation or a changed resource boundary still fails',()=>{
  const record=records[3],key=manifest.groups['sheet-party'].keys[0],stale=structuredClone(generated);
  stale['zh-CN'][key]+=' stale';
  assert.throws(()=>assertReviewedMessages(record,{...options,generated:stale}),/generated reviewed messages differ/);
  assert.throws(()=>assertReviewedMessages(record,{...options,scopeOf:()=> 'ui'}),/reviewed delivery scope changed/);
});
await test('the user-selected Goblin terms remain reviewed independently of unrelated UI copy',()=>{
  const record=records[5];assert.equal(MESSAGE_CATALOGS['zh-CN']['rule.race.goblin'],'哥布林');
  assert.equal(MESSAGE_CATALOGS['zh-CN']['training.language.goblin'],'哥布林语');
  assert.deepEqual(record.retiredSharedByteFingerprints.approvedPriorValueChanges,['rule.race.goblin','training.language.goblin']);
  const catalogs=structuredClone(MESSAGE_CATALOGS);catalogs['zh-CN']['rule.race.goblin']='地精';
  assert.throws(()=>assertReviewedMessages(record,{...options,catalogs}),/reviewed source or translation changed/);
});
finish();
