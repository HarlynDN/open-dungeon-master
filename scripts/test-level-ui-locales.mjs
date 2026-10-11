// Narrow display/choice checks: actual JSX, no model or audio calls.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {ALL_CLASSES}=await import('../src/lib/srd/index.ts');
const {canMulticlassInto,multiclassGrantsFor,describeGrant,describePrereq}=await import('../src/lib/srd/multiclass.ts');
const {thirdCasterSchoolProblem}=await import('../src/lib/srd/third-caster.ts');
const {levelUpNotice,levelUpPrerequisite,levelUpGrants}=await import('../src/lib/i18n/level-up-presentations.ts');
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const files=['src/app/campaigns/[campaignId]/LevelUpDialog.tsx','src/app/campaigns/[campaignId]/Moments.tsx'];
const stubs={
 '@radix-ui/react-dialog':url('export const Root=({children})=>children; export const Portal=Root,Overlay=Root,Content=Root,Title=Root,Close=Root;'),
 '@/components/ui/InfoDialog':url('export const InfoButton=()=>null;export const InfoChipList=({items})=>items.map(row=>row.name).join(" | ");'),
 '@/components/sheet/SpellBook':url('export const SpellBook=({tiles,notice,emptyText})=>[notice,tiles.length?tiles.map(row=>row.note||row.blocked||"").join(" | "):emptyText].filter(Boolean).join(" | ");'),
 '@/components/sheet/useSpellPool':url('export const useSpellPool=()=>({pool:globalThis.__odmLevelPool,loading:false});'),
 '@/app/characters/builder/AsiFeatEditor':url('export default function AsiFeatEditor(){return null;}'),
 '@/app/characters/builder/useFeatDescs':url('export const useFeatDescs=()=>({});'),
 '@/app/characters/builder/useBuilderOptions':url('export const useArchetypes=()=>[];'),
 '@/components/sheet/SheetParts':url('export const PortraitMedallion=({children})=>children;'),
 '@/components/ui/FxSprite':url('export const FxSprite=()=>null;'),
 '@/lib/ui':url('export const CharacterPortrait=()=>null;'),
};
globalThis.__odmLevelPool=[{name:'Magic Missile',level:1,slug:'magic-missile',source:'srd',data:{school:'evocation'}},{name:'Fire Bolt',level:0,slug:'fire-bolt',source:'srd',data:{school:'evocation'}}];
const sheet={id:'s1',campaignId:'c1',userId:'u1',name:'Mira to Someone: v2',race:'human',class:'fighter',subclass:'',level:1,classes:[],gender:'female',
 abilities:{str:16,dex:14,con:14,int:14,wis:14,cha:14},maxHp:12,currentHp:8,tempHp:0,hitDice:{die:'d10',total:1,spent:0},
 proficiencies:{saves:[],skills:['athletics','stealth'],expertise:[],languages:[],tools:[],armor:[],weapons:[]},equipment:[],feats:[],features:[{name:'Fighting Style: Archery',source:'choice'}],spellcasting:null,
 conditions:[],resources:{},exhaustion:0,deathSaves:null,concentratingOn:null,xp:300,ac:14,speed:30,gold:0};
const props=(patch={},settings={})=>({campaignId:'c1',sheet:{...sheet,...patch},multiclassAllowed:false,hpMethod:'average',onDone:()=>{},...settings});
// Every hook remains in the actual component; queues seed otherwise later steps.
const queue=(p,patch={})=>{const s=p.sheet;const state=[s.level,'roll',null,'',[],{},'',[],[],[],[],'',0,false,'',s.class,'',[]];for(const [index,value]of Object.entries(patch))state[index]=value;return {queues:{[files[0]]:state}};};
const wizard=props({class:'wizard',subclass:'School of Evocation',level:2,xp:900,features:[],hitDice:{die:'d6',total:2,spent:1},spellcasting:{ability:'int',slots:{1:{max:3,used:1}},known:[],prepared:['Shield'],spellbook:['Shield'],cantrips:['Mage Hand'],pending:[]}});
const fighter3=props({level:3,xp:2700,subclass:'Champion',hitDice:{die:'d10',total:3,spent:1}});
const cases=[];const add=(name,p,options)=>cases.push([name,'LevelUpDialog',p,options]);
for(const hpMethod of ['average','max','rolled'])add('hp/'+hpMethod,props({}, {hpMethod}));
add('blocked/dead',props({deathSaves:{dead:true}}));add('blocked/zero',props({currentHp:0}));add('blocked/xp',props({xp:0}));add('blocked/cap',props({level:20,xp:355000}));
add('multiclass',props({}, {multiclassAllowed:true}));
add('asi',fighter3,queue(fighter3,{12:1}));
const sub=props({level:2,xp:900});add('subclass',sub,queue(sub,{12:1}));
const style=props({features:[]});add('style',style,queue(style,{12:1}));
add('spells',wizard,queue(wizard,{12:1,8:['Magic Missile'],9:['Fire Bolt']}));
for(const [name,result,hpMethod]of [['roll',{hpGained:7,rolled:5,die:10,classLine:' (Fighter 2)'},'rolled'],['average',{hpGained:8,rolled:null,die:10,classLine:''},'average'],['max',{hpGained:12,rolled:null,die:10,classLine:''},'max']]){const p=props({}, {hpMethod});add('result/'+name,p,queue(p,{2:result}));}
const rogue=props({class:'rogue',level:5,xp:14000,subclass:'Thief',features:[],hitDice:{die:'d8',total:5,spent:1},proficiencies:{...sheet.proficiencies,tools:["thieves' tools"]}});add('expertise',rogue,queue(rogue,{12:1}));
const warlock=props({class:'warlock',level:1,xp:300,features:[],hitDice:{die:'d8',total:1,spent:0},spellcasting:{ability:'cha',slots:{},pact:{level:1,max:1,used:1},known:['Hex'],prepared:[],cantrips:['Eldritch Blast']}});add('options',warlock,queue(warlock,{12:1}));
cases.push(['moment/level','LevelUpMoment',{sheet,level:2,onDone:()=>{}}]);
const rest={id:'r1',kind:'rest_short',characterId:sheet.id,delta:{currentHp:9},reason:'Authored camping reason.'};
for(const [name,entry]of [['short',rest],['long',{...rest,kind:'rest_long'}],['reason',{...rest,delta:{}}]])cases.push(['moment/rest/'+name,'RestMoment',{auditLog:[entry],sheets:[sheet]},{queues:{[files[1]]:['']}}]);
for(const name of ['Longsword','Authored treasure','Longsword +2'])cases.push(['moment/loot/'+name,'LootMoment',{sheet},{queues:{[files[1]]:[{signature:'s1|',id:'s1',pack:new Map()},[{name,qty:2}]]}}]);
for(const firstVisit of [true,false])cases.push(['moment/travel/'+firstVisit,'TravelBanner',{locations:[]},{queues:{[files[1]]:[{id:'',visited:''},{id:'location1',name:'Authored place',firstVisit}]}}]);
const renderer=await openCombatRenderer({files,stubs});
const golden=new URL('./fixtures/level-ui-en.json',import.meta.url);
const hashes=JSON.parse(fs.readFileSync(golden,'utf8')).sha256;for(const [label,name,p,options]of cases)assert.equal(createHash('sha256').update(renderer.render(name,p,'en',options)).digest('hex'),hashes[label],label);
for(const [label,name,p,options]of cases){const zh=renderer.render(name,p,'zh-CN',options);assert.notEqual(zh,renderer.render(name,p,'en',options),label);if(name==='LevelUpDialog')assert(zh.includes('级'));}
// Native multiclass computations are read, never translated or changed.
for(const klass of ALL_CLASSES){const grant=multiclassGrantsFor(klass.id),before=structuredClone(grant);assert.equal(levelUpGrants(grant,'en'),describeGrant(grant));assert.notEqual(levelUpGrants(grant,'zh-CN'),describeGrant(grant));assert(!/[A-Za-z]{3,}/.test(levelUpGrants(grant,'zh-CN')),klass.id+' grant');assert.equal(levelUpPrerequisite(klass.id,'en'),describePrereq(klass.id));assert.notEqual(levelUpPrerequisite(klass.id,'zh-CN'),describePrereq(klass.id));assert.deepEqual(grant,before);const check=canMulticlassInto({...sheet,abilities:{str:8,dex:8,con:8,int:8,wis:8,cha:8}},klass.id);if(check.error)assert.notEqual(levelUpNotice(check.error,'zh-CN'),check.error);}
const school=thirdCasterSchoolProblem({classId:'fighter',subclass:'Eldritch Knight',level:3,spells:[{name:'A',school:'illusion'},{name:'B',school:'illusion'}]});assert(school);assert(levelUpNotice(school,'zh-CN').includes('塑能'));assert.equal(levelUpNotice('Authored restriction.','zh-CN'),'Authored restriction.');assert.equal(levelUpNotice('The level-up was refused.','zh-CN'),'未能完成升级。');
const longZh=renderer.render('RestMoment',cases.find(row=>row[0]==='moment/rest/long')[2],'zh-CN',cases.find(row=>row[0]==='moment/rest/long')[3]);assert(longZh.includes('长休结束'));assert(!longZh.includes('完全恢复'));
const originalFetch=globalThis.fetch;let request;
try{
 globalThis.fetch=async(path,init)=>{request={path,method:init.method,body:JSON.parse(init.body)};return {ok:true,json:async()=>({hpGained:8,rolled:{hp:6}})};};
 const p=props({}, {hpMethod:'rolled'});renderer.render('LevelUpDialog',p,'zh-CN');renderer.elements().find(e=>e.type==='button'&&e.props.children==='确认升级').props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(request,{path:'/api/campaigns/c1/sheet',method:'PATCH',body:{level:2,levelUpClass:'fighter',hpChoice:'roll'}});assert(renderer.updates().some(row=>row.at===2&&row.value.hpGained===8));
 const asi={mode:'plus2',ability:'str'};renderer.render('LevelUpDialog',fighter3,'zh-CN',queue(fighter3,{4:[asi],12:1}));renderer.elements().find(e=>e.type==='button'&&e.props.children==='确认升级').props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(request.body,{level:4,levelUpClass:'fighter',asiChoices:[asi]});
 renderer.render('LevelUpDialog',wizard,'zh-CN',queue(wizard,{12:1,8:['Magic Missile'],9:['Fire Bolt']}));const book=renderer.elements().find(e=>e.props.tiles&&e.props.onTile);book.props.onTile({name:'Magic Missile',level:1});assert(renderer.updates().some(row=>row.at===8&&typeof row.value==='function'));renderer.elements().find(e=>e.type==='button'&&e.props.children==='确认升级').props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(request.body.levelUpSpells,['Magic Missile','Fire Bolt']);
 globalThis.fetch=async()=>{throw new Error('offline');};renderer.render('LevelUpDialog',p,'zh-CN');renderer.elements().find(e=>e.type==='button'&&e.props.children==='确认升级').props.onClick();await new Promise(resolve=>setImmediate(resolve));assert(renderer.updates().some(row=>row.at===14&&row.value==='Could not reach the server.'));assert(renderer.updates().some(row=>row.at===13&&row.value===false));
}finally{globalThis.fetch=originalFetch;delete globalThis.__odmLevelPool;}
console.log('PASS: '+cases.length+' unchanged English JSX states, Chinese guided progression/moments, native multiclass summaries/refusals, school guard, canonical rolled/ASI/spell PATCH callbacks and network recovery.');
