// Focused correction/picker/downtime display and native callback contracts.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {coherentCorrection}=await import('../src/lib/dm/correction-rules.ts');
const {catalogFor}=await import('../src/lib/i18n/translator.ts');
const {editConditionDisplay,editConditionDraft,editConditionValues,playEditNotice,betweenLineText}=await import('../src/lib/i18n/play-edit-presentations.ts');
const numbers=text=>(text.match(/\d+(?:\.\d+)?/g)??[]).sort();
const nativePatch={resources:{ki:{max:2,used:5}},hitDice:{total:3,spent:8},hitDicePools:[{classId:'wizard',total:2,spent:5}],spellcasting:{slots:{1:{max:2,used:7}},pact:{max:1,used:3,level:2}}};
const correction=coherentCorrection(nativePatch),snapshot=structuredClone(correction);
assert.equal(correction.held.length,5);
for(const raw of correction.held){const zh=playEditNotice(raw,'zh-CN');assert.notEqual(zh,raw);assert.deepEqual(numbers(zh),numbers(raw));assert.equal(playEditNotice(raw,'en'),raw);}
for(const raw of ['Authored restriction.', 'there are 2 hit dice, so 3 are spent, not 5','there are many hit dice, so many are spent, not few'])assert.equal(playEditNotice(raw,'zh-CN'),raw);
assert.deepEqual(correction,snapshot);
assert.deepEqual(editConditionValues('中毒，倒地、 Authored effect','zh-CN'),['poisoned','prone','Authored effect']);
assert.equal(editConditionDraft('中毒，','zh-CN'),'poisoned，');assert.equal(editConditionDisplay('poisoned，','zh-CN'),'中毒，');
assert.deepEqual(editConditionValues('Poisoned, Authored effect','en'),['Poisoned','Authored effect']);
// Draft storage remains canonical, so switching locale cannot save Chinese IDs.
const canonical=editConditionDraft('中毒，倒地','zh-CN');assert.deepEqual(editConditionValues(canonical,'en'),['poisoned','prone']);
assert.equal(editConditionDisplay('Named condition (prone)','zh-CN'),'Named condition (prone)');
const between=[
 'infected with Sewer Plague, symptoms in 5 h','Authored disease (1 of 3 rest saves toward a cure)',
 'Cackle Fever (DC 13, 1 of 3 failed rest saves)','Sight Rot (-2, 1 of 3 Eyebright doses)',
 'indefinite madness, flaw: Authored flaw — untouched.','short-term madness (poisoned, blinded)',
 'long-term madness (poisoned, 4 h left)','midnight tears, next save in 3 h',
 'lifestyle modest (1 gp a day, paid at each dawn in town)','crafting Longsword 2 gp 5 sp of 15 gp',
 'training Common 12/250 days','researching Authored topic (3 days)','recuperating 2/3 days'];
for(const raw of between){const zh=betweenLineText(raw,'zh-CN');assert.notEqual(zh,raw);assert.deepEqual(numbers(zh),numbers(raw));assert.equal(betweenLineText(raw,'en'),raw);}
for(const raw of Object.values(catalogFor('en','sheetPlay.between.name.')))assert.notEqual(betweenLineText(raw,'zh-CN'),raw);
assert(betweenLineText(between[4],'zh-CN').includes('Authored flaw — untouched.'));assert(betweenLineText(between[10],'zh-CN').includes('通用语'));
for(const raw of ['Authored disease','lifestyle authored (1 gp a day, paid at each dawn in town)','crafting Longsword many coins of 15 gp','authored-term madness (poisoned)'])assert.equal(betweenLineText(raw,'zh-CN'),raw);
assert.equal(betweenLineText('long-term madness ()','zh-CN'),'长期疯狂');
assert.equal(betweenLineText('long-term madness (, 3 h left)','zh-CN'),'长期疯狂（剩余 3 小时）');
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const searchState={query:'长剑',results:[{slug:'longsword',name:'Longsword',source:'srd',kind:'weapon',data:{}}],open:true,loading:false,unavailable:false,unadmitted:[]};
const stubs={
 '@radix-ui/react-dialog':url('export const Root=({children})=>children; export const Portal=Root,Overlay=Root,Content=Root,Title=Root,Close=Root;'),
 '@/components/ui/InfoDialog':url('export const InfoButton=()=>null;'),
 './useContentSearch':url('export const useContentSearch=()=>globalThis.__odmPlayEditSearch;')};
globalThis.__odmPlayEditSearch={...searchState,setQuery:()=>{},setResults:()=>{},setOpen:()=>{}};
const files=['src/app/campaigns/[campaignId]/LeadEditDialog.tsx','src/app/campaigns/[campaignId]/LeadEditParts.tsx','src/app/characters/builder/MultiContentPicker.tsx','src/components/sheet/SheetBetween.tsx'];
const renderer=await openCombatRenderer({files,stubs});
const sheet={id:'s1',campaignId:'c1',userId:'u1',name:'Mira',race:'human',class:'fighter',subclass:'',level:4,classes:[],
 abilities:{str:16,dex:14,con:14,int:12,wis:16,cha:10},maxHp:40,currentHp:25,tempHp:0,ac:12,acOverride:false,speed:30,
 proficiencies:{saves:[],skills:[],expertise:[],languages:[],tools:[],armor:[],weapons:[]},equipment:[],feats:[],features:[],spellcasting:null,
 conditions:['Poisoned'],conditionMeta:{},resources:{},wildShape:null,exhaustion:0,deathSaves:null,concentratingOn:null,gold:2,xp:100};
const cases=[['ItemFlags',{item:{name:'Authored item',qty:1,equipped:true,attuned:true,identified:false,charges:3}}],
 ['ChipList',{values:['Magic Missile','Authored spell'],kind:'spell',onRemove:()=>{}}],
 ['SlotSteppers',{levels:['1','pact'],slots:{1:{max:'2',used:'1'},pact:{max:'1',used:'0'}},onChange:()=>{}}],
 ['LeadEditDialog',{campaignId:'c1',sheet,onClose:()=>{}}],
 ['SheetBetween',{sheet},{queues:{[files[3]]:[between.map(text=>({text,kind:'between',secret:true}))]}}]];
const fingerprints=JSON.parse(fs.readFileSync(new URL('./fixtures/play-edit-en.json',import.meta.url),'utf8')).sha256;
for(const [name,props,options]of cases)assert.equal(createHash('sha256').update(renderer.render(name,props,'en',options)).digest('hex'),fingerprints[name],'Frozen pre-edit English JSX '+name);
let removed;const chips=renderer.render('ChipList',{values:['Magic Missile','Authored spell'],kind:'spell',onRemove:value=>removed=value},'zh-CN');assert(chips.includes('魔法飞弹'));assert(chips.includes('Authored spell'));
renderer.elements().find(e=>e.props['aria-label']==='移除魔法飞弹').props.onClick();assert.equal(removed,'Magic Missile');
let slotUpdate;renderer.render('SlotSteppers',{levels:['1','pact'],slots:{1:{max:'2',used:'1'},pact:{max:'1',used:'0'}},onChange:update=>slotUpdate=update},'zh-CN');
renderer.elements().find(e=>e.props.label==='契约法术位已用数量'&&e.props.onChange).props.onChange(1);assert.deepEqual(slotUpdate({pact:{max:'1',used:'0'}}),{pact:{max:'1',used:'1'}});
let selected;const pending={name:'Longsword',slug:'longsword',level:undefined,source:'srd'};
const pickerProps={kind:'items',placeholder:'搜索物品',selectedNames:[],onAdd:rows=>selected=rows};
const picker=renderer.render('default',pickerProps,'zh-CN',{queues:{[files[2]]:[[pending]]}});assert(picker.includes('长剑'));assert(!picker.includes('添加为自定义'));
renderer.elements().find(e=>e.type==='button'&&e.props.children==='添加 1 项').props.onClick();assert.deepEqual(selected,[{name:'Longsword',slug:'longsword',level:undefined}]);
const customPicker=renderer.render('default',pickerProps,'zh-CN',{queues:{[files[2]]:[[{name:'Longsword',source:'homebrew'}]]}});assert(customPicker.includes('Longsword'));
const chinese=renderer.render('LeadEditDialog',cases[3][1],'zh-CN');assert(chinese.includes('调整Mira'));assert(chinese.includes('状态（用逗号分隔）'));assert(chinese.includes('value="中毒"'));
renderer.elements().find(e=>e.type==='input'&&e.props.placeholder==='中毒，倒地').props.onChange({target:{value:'中毒，倒地'}});
assert(renderer.updates().some(update=>update.value==='poisoned，prone'));
const queued=[String(sheet.currentHp),'0','40','12',false,[],'2','100',canonical,[],[],[],[],[],[],{},[],'测试修正',false,''];
renderer.render('LeadEditDialog',cases[3][1],'zh-CN',{queues:{[files[0]]:queued}});
const originalFetch=globalThis.fetch;let patch;
try{globalThis.fetch=async(_url,init)=>{assert.equal(init.method,'PATCH');patch=JSON.parse(init.body);return{ok:true,json:async()=>({})};};renderer.elements().find(e=>e.props.children==='保存'&&e.props.onClick).props.onClick();await new Promise(resolve=>setImmediate(resolve));}finally{globalThis.fetch=originalFetch;}
assert.deepEqual(patch,{reason:'测试修正',conditions:['poisoned','prone']});
const downtime=renderer.render('SheetBetween',{sheet},'zh-CN',{queues:{[files[3]]:[between.map(text=>({text,kind:'between',secret:true}))]}});assert(downtime.includes('冒险间歇'));assert(downtime.includes('仅 DM 可见'));assert(!downtime.includes('symptoms in'));
console.log('PASS: correction limits, reversible condition editing, 13 native downtime frames, 5 unchanged English JSX cases, Chinese canonical picker/remove/slot/PATCH callbacks and custom-name fallback.');
