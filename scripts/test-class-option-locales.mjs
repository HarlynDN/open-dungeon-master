// Current native option source, actual builder callbacks and selected-feature help.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {classOptionView,classOptionFeatureName,classOptionHelp}=await import('../src/lib/i18n/class-option-presentations.ts');
const {toolGrantCategoryLabel}=await import('../src/lib/i18n/training-presentations.ts');
assert.equal(toolGrantCategoryLabel('musical instrument',1,'en'),'musical instrument');assert.equal(toolGrantCategoryLabel('musical instrument',3,'en'),'musical instruments');assert.equal(toolGrantCategoryLabel('musical instrument',3,'zh-CN'),'乐器');
const {optionsOfKind,optionKindMeta,optionFeatureName}=await import('../src/lib/srd/options.ts');
const {describeFeature}=await import('../src/lib/help/index.ts');
const kinds=['invocation','maneuver','metamagic','pact_boon','infusion','rune','discipline','hunters_prey','defensive_tactics','hunter_multiattack','superior_hunters_defense'];
const slots=kinds.map(kind=>({kind,label:optionKindMeta(kind).label,total:1,remaining:1,chosen:[],options:optionsOfKind(kind)}));
let count=0;
for(const slot of slots)for(const row of slot.options){
 const before=structuredClone(row),en=classOptionView(row,'en'),zh=classOptionView(row,'zh-CN');assert.deepEqual(en,{name:row.n,description:row.d,requirement:row.req});assert.notEqual(zh.name,row.n);assert.notEqual(zh.description,row.d);if(row.req)assert.notEqual(zh.requirement,row.req);assert.deepEqual(row,before);
 const canonical=optionFeatureName(row.k,row.n),help=describeFeature('warlock','',canonical);assert.equal(classOptionFeatureName(canonical,'en'),canonical);assert.notEqual(classOptionFeatureName(canonical,'zh-CN'),canonical);assert.equal(classOptionHelp(canonical,help,'en'),help);assert(classOptionHelp(canonical,help,'zh-CN').includes(zh.description));
 for(const patch of [{d:'Authored replacement.'},{req:'Authored requirement.'},{k:'authored'},{n:'Authored name'}]){const custom={...row,...patch};assert.deepEqual(classOptionView(custom,'zh-CN'),{name:custom.n,description:custom.d,requirement:custom.req});}
 assert.equal(classOptionHelp(canonical,'Authored replacement.','zh-CN'),'Authored replacement.');assert.equal(classOptionFeatureName('Authored '+canonical,'zh-CN'),'Authored '+canonical);count++;
}
assert.equal(count,135);
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const files=['src/app/characters/builder/steps/ClassChoices.tsx','src/components/sheet/SheetParts.tsx'];
const stubs={'@/components/ui/InfoDialog':url('export const InfoDialog=()=>null;export const InfoButton=()=>null;export const InfoChipList=({items})=>items.map(row=>row.name+" | "+row.text).join(" || ");')};
const renderer=await openCombatRenderer({files,stubs});const picked=[];
const props={state:{expertisePicks:[],stylePicks:[]},derived:{effectiveLevel:1,proficientSkills:[],styleSlots:0,optionSlots:slots,toolGrants:{choices:[],chosen:[],left:[]}},actions:{toggleOption:(slot,name)=>picked.push([slot.kind,name])},klass:undefined};
const features=slots.flatMap(slot=>slot.options.map(row=>({name:optionFeatureName(row.k,row.n),source:'choice'})));
const featureProps={features,classId:'warlock',subclass:''};
const golden=new URL('./fixtures/class-option-en.json',import.meta.url);const cases=[['builder','ClassChoices',props],['sheet','FeatureChips',featureProps]];
const hashes=JSON.parse(fs.readFileSync(golden,'utf8')).sha256;for(const [label,name,p]of cases)assert.equal(createHash('sha256').update(renderer.render(name,p,'en')).digest('hex'),hashes[label],label+' English');
const html=renderer.render('ClassChoices',props,'zh-CN');for(const slot of slots)for(const row of slot.options)assert(html.includes(classOptionView(row,'zh-CN').name));
// Actual callbacks must select the original row, never its localized display name.
for(const button of renderer.elements().filter(e=>e.type==='button'&&e.props['aria-pressed']!==undefined&&e.props.onClick))button.props.onClick();assert.deepEqual(picked,slots.flatMap(slot=>slot.options.map(row=>[slot.kind,row.n])));
const sheetHtml=renderer.render('FeatureChips',featureProps,'zh-CN');assert(sheetHtml.includes('痛苦魔爆'));assert(!sheetHtml.includes('Agonizing Blast'));assert(sheetHtml.includes('术法点'));const chipRows=renderer.elements().find(e=>e.props.items).props.items;assert.deepEqual(chipRows.map(row=>row.id),features.map(row=>row.name));assert.deepEqual(chipRows.map(row=>row.icon.key),features.map(row=>row.name));
const story={features:[{name:'Invocation: Agonizing Blast',source:'story'}],classId:'warlock'};assert(renderer.render('FeatureChips',story,'zh-CN').includes('Invocation: Agonizing Blast'));
console.log('PASS: 135 source-bound native descriptions/names/requirements, exact English parity, authored override preservation, actual Chinese builder callbacks with canonical picks, localized selected-feature help and story-name preservation.');
