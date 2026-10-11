// Focused display integration: no model, audio, network or rule mutations.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {MESSAGE_CATALOGS} from '../src/lib/i18n/messages.ts';
import {NATIVE_FEATURE_MATERIAL, NATIVE_FEAT_MATERIAL} from '../src/lib/i18n/feature-material-metadata.ts';
const {nativeFeatureName, nativeFeatureHelp, nativeFeatHelp, nativeFeatPrerequisite} = await import('../src/lib/i18n/feature-material-presentations.ts');
import {normalizeRulesText} from '../src/lib/help/rules-text.ts';
const {describeFeature} = await import('../src/lib/help/index.ts');
const {authoredFeatDesc, featAbilityIncrease} = await import('../src/lib/srd/feat-effects.ts');
const {featGrantSpec} = await import('../src/lib/srd/feat-grant-text.ts');

for (const row of NATIVE_FEATURE_MATERIAL) {
  const source = MESSAGE_CATALOGS.en[row.descriptionKey];
  assert.equal(nativeFeatureName(row.name, 'en'), row.name);
  assert.equal(nativeFeatureHelp(row.classId ?? 'fighter', row.name, source, 'en'), source);
  assert.equal(nativeFeatureHelp(row.classId ?? 'fighter', row.name, source, 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]);
  assert.equal(nativeFeatureHelp(row.classId ?? 'fighter', row.name, 'Authored replacement.', 'zh-CN'), 'Authored replacement.');
}
const monk = NATIVE_FEATURE_MATERIAL.find(row => row.classId === 'monk');
const druid = NATIVE_FEATURE_MATERIAL.find(row => row.classId === 'druid');
assert.notEqual(MESSAGE_CATALOGS['zh-CN'][monk.descriptionKey], MESSAGE_CATALOGS['zh-CN'][druid.descriptionKey]);
assert.equal(nativeFeatureHelp('druid', monk.name, MESSAGE_CATALOGS.en[monk.descriptionKey], 'zh-CN'), MESSAGE_CATALOGS.en[monk.descriptionKey]);
assert.equal(nativeFeatureName('Authored ability', 'zh-CN'), 'Authored ability');
assert(nativeFeatureHelp('warlock', 'Invocation: Agonizing Blast', describeFeature('warlock', '', 'Invocation: Agonizing Blast'), 'zh-CN').includes('魅力'));
for (const row of NATIVE_FEAT_MATERIAL) {
  const source = authoredFeatDesc(row.name);
  assert.equal(source, MESSAGE_CATALOGS.en[row.descriptionKey]);
  const before = {ability: featAbilityIncrease(row.name, source), grants: featGrantSpec(source)};
  assert.equal(nativeFeatHelp(row.name, source, 'en'), source);
  assert.equal(nativeFeatHelp(row.name, normalizeRulesText(source), 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]);
  assert.equal(nativeFeatHelp(row.name, source + '\n\nExtra pack effect.', 'zh-CN'), source + '\n\nExtra pack effect.');
  if (row.prerequisiteKey) assert.equal(nativeFeatPrerequisite(row.name, MESSAGE_CATALOGS.en[row.prerequisiteKey], 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][row.prerequisiteKey]);
  assert.deepEqual({ability: featAbilityIncrease(row.name, authoredFeatDesc(row.name)), grants: featGrantSpec(authoredFeatDesc(row.name))}, before);
}
assert.equal(nativeFeatHelp('Tough', 'Authored Tough replacement.', 'zh-CN'), 'Authored Tough replacement.');
assert.equal(nativeFeatHelp('Authored name', authoredFeatDesc('Tough'), 'zh-CN'), authoredFeatDesc('Tough'));

const url = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const chipStubs = {'@/components/ui/InfoDialog': url('export const InfoChipList=({items})=>items.map(row=>row.name+" | "+row.text).join(" || ");export const InfoButton=()=>null;export const InfoDialog=()=>null;')};
const chips = await openCombatRenderer({files: ['src/components/sheet/SheetParts.tsx'], stubs: chipStubs});
const featureProps = {features: [{name: 'Extra Attack', source: 'class'}, {name: 'Timeless Body', source: 'class'}], classId: 'monk'};
const featProps = {feats: ['Tough', 'Athlete'], classId: 'fighter'};
const golden = JSON.parse(fs.readFileSync(new URL('./fixtures/feature-material-en.json', import.meta.url), 'utf8')).sha256;
const hash = html => createHash('sha256').update(html).digest('hex');
assert.equal(hash(chips.render('FeatureChips', featureProps, 'en')), golden.features);
assert.equal(hash(chips.render('FeatChips', featProps, 'en')), golden.feats);
assert(chips.render('FeatureChips', featureProps, 'zh-CN').includes('不再需要食物或水'));
let rows = chips.elements().find(element => element.props.items).props.items;
assert.deepEqual(rows.map(row => row.id), featureProps.features.map(row => row.name));
assert.deepEqual(rows.map(row => row.icon.key), featureProps.features.map(row => row.name));
assert(chips.render('FeatureChips', {...featureProps, features: [{name: 'Extra Attack', source: 'story'}]}, 'zh-CN').includes('Extra Attack'));
assert(chips.render('FeatChips', featProps, 'zh-CN').includes('强健'));
rows = chips.elements().find(element => element.props.items).props.items;
assert.deepEqual(rows.map(row => row.id), featProps.feats);
assert.deepEqual(rows.map(row => row.icon.key), featProps.feats);
assert.deepEqual(rows.map(row => row.reference.name), featProps.feats);
assert.deepEqual(rows.map(row => row.reference.slug), ['tough', 'athlete']);

const infoFile = 'src/components/ui/InfoDialog.tsx';
const info = await openCombatRenderer({files: [infoFile], stubs: {
  '@/components/ui/Dialog': url('export const Dialog=({children})=>children;'),
  '@/components/ui/Tooltip': url('export const Tooltip=({children})=>children;'),
  '@/lib/content-scope': url('export const useContentCampaign=()=>null;export const scopeQuery=()=>"";'),
}});
const infoProps = {open: true, onOpenChange: () => {}, title: 'Tough', reference: {kind: 'feats', name: 'Tough', slug: 'tough'}};
const loaded = text => ({queues: {[infoFile]: [{text, loading: false}]}});
const source = authoredFeatDesc('Tough');
assert.equal(hash(info.render('InfoDialog', infoProps, 'en', loaded(source))), golden.dialog);
assert(info.render('InfoDialog', infoProps, 'zh-CN', loaded(source)).includes(MESSAGE_CATALOGS['zh-CN'][NATIVE_FEAT_MATERIAL.find(row => row.name === 'Tough').descriptionKey]));
// The same raw loaded text rerenders in English; it was not translated in state.
assert.equal(hash(info.render('InfoDialog', infoProps, 'en', loaded(source))), golden.dialog);
assert(info.render('InfoDialog', infoProps, 'zh-CN', loaded('Authored Tough replacement.')).includes('Authored Tough replacement.'));
console.log('PASS: 146 native feature and 54 feat summaries, class overrides, source-bound display, unchanged parser inputs, canonical chip/reference identities, lazy feat help and English render parity.');
