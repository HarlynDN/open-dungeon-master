// Focused display integration: no model, audio, network or rule mutations.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {MESSAGE_CATALOGS} from '../src/lib/i18n/messages.ts';
import {NATIVE_FEATURE_MATERIAL, NATIVE_FEAT_MATERIAL} from '../src/lib/i18n/feature-material-metadata.ts';
import {THEMED_FEATURE_MATERIAL} from '../src/lib/i18n/themed-feature-metadata.ts';
import {SUBCLASS_FEATURE_MATERIAL} from '../src/lib/i18n/subclass-feature-metadata.ts';
const {nativeFeatureName, nativeFeatureHelp, nativeFeatHelp, nativeFeatPrerequisite} = await import('../src/lib/i18n/feature-material-presentations.ts');
import {normalizeRulesText} from '../src/lib/help/rules-text.ts';
const {authoredArchetypeDescription} = await import('../src/lib/content/authored-archetype.ts');
const {nativeArchetypeHelp, subclassHelpText} = await import('../src/lib/i18n/calling-material-presentations.ts');
const {referenceDisplayName} = await import('../src/lib/i18n/references.ts');
const {describeFeature} = await import('../src/lib/help/index.ts');
const {authoredFeatDesc, featAbilityIncrease} = await import('../src/lib/srd/feat-effects.ts');
const {featGrantSpec} = await import('../src/lib/srd/feat-grant-text.ts');

// Verify this material batch against the actual authored source/resolver, not
// a copied English golden. Unknown or changed prose must remain untouched.
const authoredSubclasses = JSON.parse(fs.readFileSync(new URL('../src/lib/srd/subclasses.json', import.meta.url), 'utf8')).classes;
const materialId = row => [row.classId, row.subclass, row.name].join('::');
const expectedMaterial = Object.entries(authoredSubclasses).flatMap(([classId, subclasses]) =>
  subclasses.flatMap(subclass => Object.values(subclass.levels).flat().map(feature =>
    materialId({classId, subclass: subclass.name, name: feature.n}))));
assert.deepEqual(SUBCLASS_FEATURE_MATERIAL.map(materialId).sort(), expectedMaterial.sort(),
  'Every authored subclass feature must have a localized source binding.');
for (const row of SUBCLASS_FEATURE_MATERIAL) {
  const subclass = authoredSubclasses[row.classId].find(entry => entry.name === row.subclass);
  const feature = Object.values(subclass.levels).flat().find(entry => entry.n === row.name);
  assert.equal(MESSAGE_CATALOGS.en[row.nameKey], feature.n);
  assert.equal(MESSAGE_CATALOGS.en[row.descriptionKey], feature.d);
  assert.equal(describeFeature(row.classId, row.subclass, row.name), feature.d);
  assert.equal(nativeFeatureName(row.name, 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][row.nameKey]);
  assert.equal(nativeFeatureHelp(row.classId, row.name, feature.d, 'en'), feature.d);
  assert.equal(nativeFeatureHelp(row.classId, row.name, feature.d, 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]);
  assert.equal(nativeFeatureHelp(row.classId, row.name, feature.d + ' Authored extension.', 'zh-CN'), feature.d + ' Authored extension.');
  assert.equal(nativeFeatureHelp('authored-class', row.name, feature.d, 'zh-CN'), feature.d);
}

// Reviewed bindings must match actual theme tables, not a name-only lookup.
const themedSource=[];
for(const file of fs.readdirSync(new URL('../src/lib/classes/',import.meta.url)).filter(file=>file.endsWith('-features.json'))){
 const data=JSON.parse(fs.readFileSync(new URL('../src/lib/classes/'+file,import.meta.url),'utf8'));
 for(const [classId,table] of Object.entries(data.classes)) for(const feature of [...Object.values(table.levels).flat(),...Object.values(table.subclass.levels).flat()])
  themedSource.push({classId,subclass:table.subclass.name,...feature,theme:file.replace('-features.json','')});
}
const themeSourceBefore=JSON.stringify(themedSource);
const cyberSource=themedSource.filter(row=>row.theme==='cyberpunk');
const cyberClassIds=new Set(cyberSource.map(row=>row.classId));
assert.equal(cyberClassIds.size,6);assert.equal(cyberSource.length,119);
assert.deepEqual(THEMED_FEATURE_MATERIAL.filter(row=>cyberClassIds.has(row.classId)).map(row=>row.classId+'::'+row.name).sort(),cyberSource.map(row=>row.classId+'::'+row.n).sort());
for(const row of THEMED_FEATURE_MATERIAL){
 const original=themedSource.find(entry=>entry.classId===row.classId&&entry.n===row.name);assert(original);
 assert.equal(MESSAGE_CATALOGS.en[row.nameKey],original.n);
 assert.equal(MESSAGE_CATALOGS.en[row.descriptionKey],original.d);
 const source=describeFeature(row.classId,original.subclass,row.name);
 assert.equal(nativeFeatureName(row.name,'en',row.classId),row.name);
 assert.equal(nativeFeatureName(row.name,'zh-CN',row.classId),MESSAGE_CATALOGS['zh-CN'][row.nameKey]);
 assert.equal(nativeFeatureHelp(row.classId,row.name,source,'en'),source);
 assert.equal(nativeFeatureHelp(row.classId,row.name,source,'zh-CN'),MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]);
 assert.equal(nativeFeatureHelp(row.classId,row.name,source+' Authored expansion.','zh-CN'),source+' Authored expansion.');
 assert.equal(nativeFeatureHelp('authored-class',row.name,source,'zh-CN'),source);
 const numeric=text=>new Set((text.replace(/(\d)[–-](?=\d)/g,'$1 ').match(/[+-]?\d+(?:\.\d+)?/g)??[]).map(Number));
 if(row.descriptionKey.startsWith('callingMaterial.themedFeature.')) for(const number of numeric(original.d)) assert(numeric(MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]).has(number),row.descriptionKey+':'+number);
 const dice=text=>(text.match(/\b\d+d\d+\b/g)??[]);
 assert.deepEqual(dice(MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]),dice(original.d),row.descriptionKey);
}
assert.equal(JSON.stringify(themedSource),themeSourceBefore);

// Full authored content, not just the already-reviewed one-line fallback.
let archetypeCount = 0;
for (const [classId, entries] of Object.entries(authoredSubclasses)) for (const entry of entries) {
  archetypeCount++;
  const before = JSON.stringify(entry);
  const oldLevels = Object.entries(entry.levels).sort((a,b)=>+a[0]-b[0])
    .map(([level, features])=>`**Level ${level}.** `+features.map(f=>`*${f.n}.* ${f.d}`).join(' ')).join('\n\n');
  const oldSpells = entry.spells ? '\n\n**Always-prepared spells.** '+Object.entries(entry.spells)
    .sort((a,b)=>+a[0]-b[0]).map(([level,names])=>`Level ${level}: ${names.join(', ')}.`).join(' ') : '';
  const source = authoredArchetypeDescription(entry);
  assert.equal(source, `${entry.desc}\n\n${oldLevels}${oldSpells}`); // exact pre-edit importer contract
  const provenance = {documentSlug:'odm-expanded',source:'open5e'};
  assert.equal(subclassHelpText(classId,entry.name,'en',source,provenance),source);
  const chinese = subclassHelpText(classId,entry.name,'zh-CN',source,provenance);
  assert.notEqual(chinese,source);
  assert.equal(nativeArchetypeHelp(classId,entry.name,normalizeRulesText(source),'zh-CN',provenance),chinese);
  for (const [level,features] of Object.entries(entry.levels)) {
    assert(chinese.includes(`**${level} 级。**`));
    for (const feature of features) {
      const row = SUBCLASS_FEATURE_MATERIAL.find(row=>row.classId===classId&&row.subclass===entry.name&&row.name===feature.n);
      assert(chinese.includes(MESSAGE_CATALOGS['zh-CN'][row.nameKey]));
      assert(chinese.includes(MESSAGE_CATALOGS['zh-CN'][row.descriptionKey]));
    }
  }
  for (const names of Object.values(entry.spells??{})) for (const name of names) {
    const label=referenceDisplayName('spell',name,'zh-CN');
    assert.notEqual(label,name, `missing spell label: ${classId}/${entry.name}/${name}`);
    assert(chinese.includes(label));
  }
  for (const metadata of [{source:'homebrew'}, {documentSlug:'third-party-book'}])
    assert.equal(subclassHelpText(classId,entry.name,'zh-CN',source,metadata),source);
  for (const changed of [source+' Authored addition.', source.replace(entry.desc,'Authored introduction.')])
    assert.equal(nativeArchetypeHelp(classId,entry.name,changed,'zh-CN',provenance),changed);
  assert.equal(nativeArchetypeHelp('unrelated-class',entry.name,source,'zh-CN',provenance),source);
  assert.equal(JSON.stringify(entry),before);
}
assert.equal(archetypeCount,105);

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

const multiclass = {classId: 'fighter', subclass: 'Eldritch Knight',
  classes: [{id: 'fighter', subclass: 'Eldritch Knight'}, {id: 'cleric', subclass: 'Tempest Domain'}, {id: 'monk', subclass: 'Way of the Open Hand'}],
  features: [{name: 'Divine Strike', source: 'class', classId: 'cleric', level: 8},
    {name: 'Timeless Body', source: 'class', classId: 'monk', level: 15},
    {name: 'Second Wind', source: 'class', level: 1},
    {name: 'Authored gift', source: 'story', classId: 'cleric'}]};
const multiclassSource = JSON.stringify(multiclass);
for (const locale of ['en', 'zh-CN']) {
  chips.render('FeatureChips', multiclass, locale);
  const projected = chips.elements().find(element => element.props.items).props.items;
  for (const [index, classId, subclass] of [[0, 'cleric', 'Tempest Domain'], [1, 'monk', 'Way of the Open Hand'], [2, 'fighter', 'Eldritch Knight']]) {
    const name = multiclass.features[index].name;
    assert.equal(projected[index].text, nativeFeatureHelp(classId, name, describeFeature(classId, subclass, name), locale));
    assert.equal(projected[index].icon.family, `class-${classId}`);
  }
  if (locale === 'zh-CN') { assert(projected[0].text.includes('雷鸣')); assert(projected[1].text.includes('不再需要食物或水')); }
  assert.deepEqual(projected.map(row => row.id), multiclass.features.map(row => row.name));
  assert.equal(projected[3].name, 'Authored gift');
  assert.equal(projected[3].icon.family, 'class-fighter');
}
for (const classes of [[], [{id: 'cleric', subclass: 'Nature Domain'}, {id: 'cleric', subclass: 'Tempest Domain'}]]) {
  chips.render('FeatureChips', {...multiclass, classes, subclass: 'Nature Domain'}, 'zh-CN');
  const projected = chips.elements().find(element => element.props.items).props.items;
  const generic = describeFeature('cleric', '', 'Divine Strike');
  assert.equal(projected[0].text, nativeFeatureHelp('cleric', 'Divine Strike', generic, 'zh-CN'));
}
assert.equal(JSON.stringify(multiclass), multiclassSource);

const infoFile = 'src/components/ui/InfoDialog.tsx';
const info = await openCombatRenderer({files: [infoFile], stubs: {
  '@/components/ui/Dialog': url('export const Dialog=({children})=>children;'),
  '@/components/ui/Tooltip': url('export const Tooltip=({children})=>children;'),
  '@/lib/content-scope': url('export const useContentCampaign=()=>null;export const scopeQuery=()=>"";'),
}});
const infoProps = {open: true, onOpenChange: () => {}, title: 'Tough', reference: {kind: 'feats', name: 'Tough', slug: 'tough'}};
const loaded = text => ({queues: {[infoFile]: [{text, loading: false,
  for: JSON.stringify([infoProps.reference.kind, infoProps.reference.slug, infoProps.reference.name, null, 0])}]}});
const source = authoredFeatDesc('Tough');
assert.equal(hash(info.render('InfoDialog', infoProps, 'en', loaded(source))), golden.dialog);
assert(info.render('InfoDialog', infoProps, 'zh-CN', loaded(source)).includes(MESSAGE_CATALOGS['zh-CN'][NATIVE_FEAT_MATERIAL.find(row => row.name === 'Tough').descriptionKey]));
// The same raw loaded text rerenders in English; it was not translated in state.
assert.equal(hash(info.render('InfoDialog', infoProps, 'en', loaded(source))), golden.dialog);
assert(info.render('InfoDialog', infoProps, 'zh-CN', loaded('Authored Tough replacement.')).includes('Authored Tough replacement.'));

// One grouped creation -> sheet check for the newly shared core projection.
const {srdClassOptions} = await import('../src/lib/characters/options.ts');
const calling = await openCombatRenderer({files: ['src/app/characters/builder/steps/CallingStep.tsx'], stubs: {
  ...chipStubs,
  '../OptionCardGrid': url('export const OptionCardGrid=()=>null;'),
  '../OptionPicker': url('export default ()=>null;'),
  './ClassChoices': url('export const ClassChoices=()=>null;'),
}});
for (const [classId, featureName, chinese, subclass = ''] of [
  ['rogue', 'Sneak Attack', '偷袭'], ['fighter', 'Second Wind', '回气'],
  ['barbarian', 'Totem Spirit', '图腾精魂', 'Path of the Totem Warrior'],
  ['fighter', 'War Magic', '战争魔法', 'Eldritch Knight'],
  ['rogue', 'Psychic Blades', '心灵之刃', 'Soulknife'],
  ['sorcerer', 'Bastion of Law', '秩序堡垒', 'Clockwork Soul'],
  ['warlock', 'Healing Light', '治愈之光', 'The Celestial'],
  ['wizard', 'Extra Attack', '额外攻击', 'Bladesinging'],
  ['cleric', 'Divine Strike', '神圣打击', 'Nature Domain'],
  ['cleric', 'Divine Strike', '神圣打击', 'Tempest Domain'],
  ['druid', 'Combat Wild Shape', '战斗荒野形态', 'Circle of the Moon'],
  ['paladin', 'Channel Divinity: Guided Strike', '引导神力：引导打击', 'Oath of Conquest'],
  ['bard', 'Psychic Blades', '心灵之刃', 'College of Whispers'],
  ['monk', 'Hand of Healing', '治疗之手', 'Way of Mercy'],
  ['ranger', 'Planar Warrior', '位面战士', 'Horizon Walker'],
  ['artificer', 'Alchemical Savant', '炼金学者', 'Alchemist'],
]) {
  const feature = {name: featureName, source: 'class', level: 1};
  const klass = srdClassOptions().find(row => row.id === classId);
  const props = {state: {subclass, gender: '', chosenSkills: [], racialSkills: [], backgroundSkills: []},
    derived: {effectiveLevel: 1, grantedFeatures: [feature]}, actions: {}, klass, pack: null,
    classes: [], classGroups: [], subclassGroups: [], offersSubclass: false, subclassLockedAt: null, chosenArchetype: null};
  const before = JSON.stringify(feature);
  for (const locale of ['en', 'zh-CN']) {
    const name = locale === 'en' ? featureName : chinese;
    assert(calling.render('CallingStep', props, locale).includes(name));
    const tooltip = calling.elements().find(row => row.props.label === name && row.props.meta);
    assert(tooltip);
    assert.equal(tooltip.props.text, nativeFeatureHelp(classId, featureName, describeFeature(classId, subclass, featureName), locale));
    if (classId === 'cleric' && featureName === 'Divine Strike' && locale === 'zh-CN') {
      assert(tooltip.props.text.includes(subclass === 'Nature Domain' ? '冷冻、火焰或闪电' : '雷鸣'));
    }
    assert(chips.render('FeatureChips', {features: [feature], classId, subclass}, locale).includes(name));
    assert.equal(chips.elements().find(row => row.props.items).props.items[0].id, featureName);
  }
  const replacement = {features: [{from: featureName, name: 'Authored calling', blurb: 'Authored feature help.'}]};
  assert(calling.render('CallingStep', {...props, pack: replacement}, 'zh-CN').includes('Authored calling'));
  assert.equal(calling.elements().find(row => row.props.label === 'Authored calling').props.text, 'Authored feature help.');
  // Even an explicit overlay retaining the English name is an authored choice.
  calling.render('CallingStep', {...props, pack: {features: [{from: featureName, name: featureName, blurb: 'Authored help.'}]}}, 'zh-CN');
  assert.equal(calling.elements().find(row => row.props.label === featureName).props.text, 'Authored help.');
  assert.equal(nativeFeatureHelp(classId, featureName, 'Authored replacement.', 'zh-CN'), 'Authored replacement.');
  assert.equal(JSON.stringify(feature), before);
}

// One real creator and lazy help path, with the same raw state in both locales.
const archetypeEntry=authoredSubclasses.artificer.find(row=>row.name==='Alchemist');
const archetype={id:'artificer-alchemist',name:archetypeEntry.name,desc:authoredArchetypeDescription(archetypeEntry),source:'open5e',documentSlug:'odm-expanded'};
const archetypeProps={state:{subclass:archetype.name,gender:'',chosenSkills:[],racialSkills:[],backgroundSkills:[]},
 derived:{effectiveLevel:3,grantedFeatures:[]},actions:{},klass:srdClassOptions().find(row=>row.id==='artificer'),pack:null,
 classes:[],classGroups:[],subclassGroups:[],offersSubclass:true,subclassLockedAt:null,chosenArchetype:archetype};
const archetypeInfo={open:true,onOpenChange:()=>{},title:archetype.name,reference:{kind:'archetypes',name:archetype.name,slug:archetype.id}};
for(const locale of ['zh-CN','en']){
 const expected=nativeArchetypeHelp('artificer',archetype.name,archetype.desc,locale,archetype);
 calling.render('CallingStep',archetypeProps,locale);
 const tooltip=calling.elements().find(e=>e.props.reference?.kind==='archetypes');
 assert(tooltip);assert.equal(tooltip.props.text,expected);assert.equal(tooltip.props.reference.slug,archetype.id);
 const rawState={text:normalizeRulesText(archetype.desc),loading:false,name:archetype.name,classId:'artificer',source:archetype.source,documentSlug:archetype.documentSlug,
  for:JSON.stringify(['archetypes',archetype.id,archetype.name,null,0])};
 const stateBefore=JSON.stringify(rawState);
 const html=info.render('InfoDialog',archetypeInfo,locale,{queues:{[infoFile]:[rawState]}});
 assert(html.includes(locale==='en'?'Always-prepared spells':'始终准备的法术'));
 assert(html.includes(locale==='en'?'Experimental Elixir':'实验灵药'));
 assert.equal(JSON.stringify(rawState),stateBefore);
 const custom=info.render('InfoDialog',archetypeInfo,locale,{queues:{[infoFile]:[{...rawState,source:'homebrew'}]}});
 assert(custom.includes('Always-prepared spells'));assert(custom.includes('Experimental Elixir'));
}
// The same six complete native classes reach actual creation and sheet views.
for(const classId of cyberClassIds){
 const klass=srdClassOptions().find(row=>row.id===classId);assert(klass);
 const source=cyberSource.filter(row=>row.classId===classId);
 const features=source.map(row=>({name:row.n,source:'class',classId,level:1}));
 const props={state:{subclass:source[0].subclass,gender:'',chosenSkills:[],racialSkills:[],backgroundSkills:[]},
  derived:{effectiveLevel:20,grantedFeatures:features},actions:{},klass,pack:null,
  classes:[],classGroups:[],subclassGroups:[],offersSubclass:false,subclassLockedAt:null,chosenArchetype:null};
 for(const locale of ['zh-CN','en']){
  calling.render('CallingStep',props,locale);
  const tooltips=calling.elements().filter(row=>row.props.meta&&typeof row.props.text==='string');
  chips.render('FeatureChips',{features,classId,subclass:source[0].subclass},locale);
  const sheetRows=chips.elements().find(e=>e.props.items).props.items;
  assert.deepEqual(sheetRows.map(row=>row.id),features.map(row=>row.name));
  for(const original of source){
   const name=nativeFeatureName(original.n,locale,classId),help=nativeFeatureHelp(classId,original.n,describeFeature(classId,original.subclass,original.n),locale);
   assert(tooltips.some(row=>row.props.label===name&&row.props.text===help),classId+':'+original.n+':'+locale);
   assert(sheetRows.some(row=>row.name===name&&row.text===help),classId+':'+original.n+':'+locale);
  }
 }
 chips.render('FeatureChips',{features:[{name:source[0].n,source:'story'}],classId},'zh-CN');
 assert.equal(chips.elements().find(e=>e.props.items).props.items[0].name,source[0].n);
}
console.log(`PASS: ${THEMED_FEATURE_MATERIAL.length} source-bound theme feature projections, exact English source/dice/numbers, all 119 cyberpunk features across six actual creator/sheet flows, class ownership and authored overrides.`);
console.log('PASS: all 105 authored full archetype documents, importer byte parity, level/feature/spell display, actual creator and lazy help, English switching and source provenance preserved.');
console.log('PASS: 146 native feature and 54 feat summaries, class overrides, source-bound display, unchanged parser inputs, canonical chip/reference identities, lazy feat help and English render parity.');
console.log('PASS: bilingual core features across actual creation and sheet components; localized tooltip props, canonical identities and explicit pack names/help preserved.');
console.log(`PASS: ${SUBCLASS_FEATURE_MATERIAL.length} authored subclass source bindings and actual creation/sheet projections for the registered classes; subclass-specific help, changed and unrelated-class prose preserved.`);
console.log('PASS: multiclass feature help/icon ownership, legacy primary fallback, missing/ambiguous secondary subclasses, canonical IDs and story names preserved.');
