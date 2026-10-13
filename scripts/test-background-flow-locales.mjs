// One grouped native-source/creation-flow check. No network, model or snapshots.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {srdBackgroundOptions,srdRaceOptions}=await import('../src/lib/characters/options.ts');
const {backgroundField,backgroundHelp,backgroundGrantView}=await import('../src/lib/i18n/background-material-presentations.ts');
const {builderOptionName}=await import('../src/lib/i18n/builder-picker-presentations.ts');
const {BACKGROUND_MATERIAL}=await import('../src/lib/i18n/background-material-metadata.ts');
const {createTranslator}=await import('../src/lib/i18n/translator.ts');
const backgrounds=srdBackgroundOptions(),races=srdRaceOptions();
assert.deepEqual(BACKGROUND_MATERIAL.map(row=>row.id).sort(),backgrounds.map(row=>row.id).sort());
for(const row of backgrounds){
 const before=JSON.stringify(row),feature=`**Feature: ${row.feature}.**${row.featureDesc?` ${row.featureDesc}`:''}`;
 assert.equal(backgroundHelp(row,'en'),[row.blurb,feature,row.desc].filter(Boolean).join('\n\n'));
 for(const field of ['blurb','feature','featureDesc']){
  assert.equal(backgroundField(row,field,'en'),row[field]);assert.notEqual(backgroundField(row,field,'zh-CN'),row[field]);
  const modified={...row,[field]:'Authored replacement.'};assert.equal(backgroundField(modified,field,'zh-CN'),modified[field]);
  assert.equal(backgroundField({...row,source:'homebrew'},field,'zh-CN'),row[field]);
  assert.equal(backgroundField({...row,documentSlug:'third-party-book'},field,'zh-CN'),row[field]);
 }
 assert(backgroundHelp({...row,packBlurb:'Authored world premise.'},'zh-CN').startsWith('Authored world premise.'));
 assert.equal(JSON.stringify(row),before);
 const grantName=`${row.feature} (${row.name})`;
 assert.equal(backgroundGrantView(grantName,row.featureDesc,'en').name,grantName);
 assert.notEqual(backgroundGrantView(grantName,row.featureDesc,'zh-CN').name,grantName);
 assert.equal(backgroundGrantView(grantName,'Authored grant help.','zh-CN').help,'Authored grant help.');
}
assert.equal(builderOptionName('background',{...backgrounds[0],source:'homebrew'},'zh-CN'),backgrounds[0].name);
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const groupFile='src/app/characters/builder/usePickerGroups.ts';
const r=await openCombatRenderer({files:['src/app/characters/builder/steps/IdentityStep.tsx','src/app/characters/builder/RacialChoicesSection.tsx','src/app/characters/builder/LineageCarousel.tsx','src/components/sheet/SheetParts.tsx',groupFile],
 sourceOf:file=>fs.readFileSync(file,'utf8')+(file===groupFile?'\nexport function BackgroundGroupsProbe(props){const result=usePickerGroups(props);return <i data-groups={result.backgroundGroups}/>;}':''),
 stubs:{'@/components/ui/InfoDialog':url('export const InfoButton=()=>null;export const InfoDialog=()=>null;export const renderRules=text=>text;export const InfoChipList=({items})=>items.map(row=>row.name+" | "+row.text).join(" || ");'),
 '@/components/ui/Dialog':url('export const Dialog=({children,title,footer})=>[title,children,footer];'),
 '@/components/UnofficialPackNotice':url('export const UnofficialPackNotice=()=>null;'),
 '../OptionPicker':url('export default ()=>null;'),
  './FeatChoicesFields':url('export default ()=>null;'),
 '@/app/characters/builder/CatalogBrowser':url('export default ()=>null;'),
 '@/app/characters/builder/ContentPicker':url('export default ()=>null;'),
}});
let toolPicked,chosenId,closed=false;
for(const locale of ['en','zh-CN']){
 r.render('BackgroundGroupsProbe',{races:[],rawRaces:[],classes:[],rawClasses:[],backgrounds,pack:null,genre:'high_fantasy',klass:undefined,subclass:'',effectiveLevel:1,archetypes:[],locale},locale);
 const options=r.elements().find(e=>e.props['data-groups']).props['data-groups'].flatMap(group=>group.options);
 assert.equal(options.find(row=>row.id===backgrounds[0].id).infoText,backgroundHelp(backgrounds[0],locale));
 assert.deepEqual(options.map(row=>row.id).sort(),backgrounds.map(row=>row.id).sort());
 const state={name:'Authored hero {name}',gender:'',level:1,alignment:'LG',backgroundSkills:[],chosenSkills:[],racialSkills:[]};
 r.render('IdentityStep',{state,pack:null,packInstalled:true,alignmentGroups:[],backgroundGroups:[],background:backgrounds[0]},locale);
 const feature=backgroundField(backgrounds[0],'feature',locale),help=r.elements().find(e=>e.props.label===feature);
 assert(help);assert.equal(help.props.text,backgroundField(backgrounds[0],'featureDesc',locale));
 const granted={name:`${backgrounds[0].feature} (${backgrounds[0].name})`,source:'background'};
 r.render('FeatureChips',{features:[granted],classId:'fighter'},locale);
 const chip=r.elements().find(e=>e.props.items).props.items[0];
 assert.equal(chip.id,granted.name);assert.equal(chip.name,backgroundGrantView(granted.name,backgrounds[0].featureDesc,locale).name);
 assert.equal(chip.text,backgroundField(backgrounds[0],'featureDesc',locale));
 const race=races.find(row=>row.id==='hill_dwarf');
 r.render('RacialChoicesSection',{race,grantedSkills:[],asi:[],skills:[],cantrip:'',tool:'',inputClass:'',onAsiChange:()=>{},onSkillsChange:()=>{},onCantripChange:()=>{},onToolChange:value=>toolPicked=value},locale);
 const tool=r.elements().find(e=>Array.isArray(e.props.options)&&e.props.options.some(o=>o.value===race.toolChoice.from[0]));
 assert(tool);tool.props.onChange(race.toolChoice.from[0]);assert.equal(toolPicked,race.toolChoice.from[0]);
 const slide={...race,art:'',group:null,recommended:false,info:{text:null}};
 r.render('LineageCarousel',{slides:[slide],index:0,chosenId:'',onIndexChange:value=>closed=value===null,onChoose:id=>chosenId=id},locale);
 const chooseCaption=createTranslator(locale)('lineageUi.choose',{name:builderOptionName('race',race,locale)});
 const choose=r.elements().find(e=>e.type==='button'&&e.props.children===chooseCaption);
 assert(choose);choose.props.onClick();assert.equal(chosenId,race.id);assert(closed);
}
// One actual sheet check for saved canonical training and race-owned traits.
const training={languages:['Common','Dwarvish','Elvish','Draconic','Authored tongue'],tools:["thieves' tools","tinker's tools","smith's tools","alchemist's supplies",'Authored tool'],armor:['light','medium','shields','Authored armor'],weapons:['simple weapons','battleaxes','handaxes','light hammers','warhammers','Authored weapons']};
const original=JSON.stringify(training);
const enTraining=r.render('TrainingLines',{proficiencies:training},'en');
for(const values of Object.values(training))for(const value of values)assert(enTraining.includes(value.replaceAll("'",'&#x27;')),value);
const zhTraining=r.render('TrainingLines',{proficiencies:training},'zh-CN');
for(const term of ['通用语','矮人语','精灵语','龙语','盗贼工具','修补匠工具','铁匠工具','炼金工具','轻甲','中甲','盾牌','简易武器','战斧','手斧','轻锤','战锤','Authored tongue','Authored tool','Authored armor','Authored weapons'])assert(zhTraining.includes(term),term);
assert.equal(JSON.stringify(training),original);
const {srdRaceFor}=await import('../src/lib/content/race-options.ts');
const {lineageFeatureName}=await import('../src/lib/i18n/lineage-presentations.ts');
for(const race of races){
 const native=srdRaceFor(race.id);if(!native)continue;
 const features=native.traits.map(name=>({name,source:'race'}));const before=JSON.stringify(features);
 for(const locale of ['en','zh-CN']){
  r.render('FeatureChips',{features,raceId:race.id,classId:'artificer'},locale);
  const rows=r.elements().find(e=>e.props.items).props.items;
  assert.deepEqual(rows.map(row=>row.id),features.map(row=>row.name));
  assert.deepEqual(rows.map(row=>row.name),features.map(row=>lineageFeatureName(race.id,row.name,locale)));
  if(locale==='zh-CN')for(const row of rows)assert(/\p{Script=Han}/u.test(row.name),row.name);
 }
 assert.equal(JSON.stringify(features),before);
}
for(const [source,raceId,name] of [['story','hill_dwarf','Stonecunning'],['race','custom_race','Stonecunning'],['race','hill_dwarf','Authored trait'],['race','human','Stonecunning']]){
 r.render('FeatureChips',{features:[{name,source}],raceId,classId:'artificer'},'zh-CN');
 assert.equal(r.elements().find(e=>e.props.items).props.items[0].name,name);
}
console.log('PASS: all 49 bundled background introductions/features/help bind to actual source, exact English assembly and authored/third-party preservation; actual bilingual picker groups, identity tooltips, racial tool callbacks and lineage choice IDs.');
