// Focused entry/companion UI and new pregen text projection. No live creation.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['CharacterGate','PregenPicker','CompanionBuilderDialog'].map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`),[,pregenFile,companionFile]=files;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const react=JSON.stringify(import.meta.resolve("react"));
const r=await openCombatRenderer({files,stubs:{
 'next/link':url(`import {createElement as h} from ${react};export default function Link({children,href,...rest}){return h("a",{...rest,href},children);}`),
 '@/app/characters/builder/CharacterBuilder':url('export default function CharacterBuilder(){return null;}'),
}});
const {PREGENS,pregenSummaries}=await import('../src/lib/starter/pregens.ts');
const {pregenText,pregenSheet,entryCharacterError}=await import('../src/lib/i18n/entry-character-presentations.ts');
const q=(file,values)=>({queues:{[file]:values}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
for(const pregen of PREGENS){
 const snapshot=structuredClone(pregen.sheet);
 assert.equal(pregenText(pregen.id,'blurb',pregen.blurb,'en'),pregen.blurb);
 const localized=pregenSheet(pregen.id,pregen.sheet,'zh-CN');assert.notEqual(localized.backstory,pregen.sheet.backstory);
 assert.deepEqual({...localized,backstory:pregen.sheet.backstory},snapshot);assert.deepEqual(pregen.sheet,snapshot);
 assert.equal(pregenSheet(pregen.id,pregen.sheet,'en'),pregen.sheet);
 assert.equal(pregenText(pregen.id,'blurb','Authored replacement','zh-CN'),'Authored replacement');
}
assert.equal(pregenText('custom','tagline','Authored hero','zh-CN'),'Authored hero');
let html=r.render('CharacterGate',{campaignId:'native-id'},'zh-CN');assert(html.includes('创建角色')&&html.includes('/campaigns/native-id/character'));
const heroes=pregenSummaries(),loadError={data:{},fallback:'entryCharacter.error.heroes'};
html=r.render('PregenPicker',{campaignId:'c'},'zh-CN',q(pregenFile,[heroes,'',null,loadError,0]));assert(html.includes('人类野蛮人')&&html.includes('治疗伤口')&&html.includes('未能加载预设英雄')&&html.includes('重试'));
html=r.render('PregenPicker',{campaignId:'c'},'en',q(pregenFile,[heroes,'',null,null,0]));assert(html.includes(heroes[0].tagline));
assert.equal(entryCharacterError({data:{error:'first problem',problems:['first problem','second problem']},fallback:'entryCharacter.error.create'},'en'),'first problem\nsecond problem');
assert.equal(entryCharacterError({data:{error:'Authored error {raw}.'},fallback:'entryCharacter.error.create'},'zh-CN'),'Authored error {raw}.');
assert.equal(entryCharacterError({data:{error:'The party already has its full number of companions.'},fallback:'entryCharacter.error.create'},'zh-CN'),'队伍同伴数量已达上限。');
let closed=0,created=0;const cp={campaignId:'c',level:3,onClose:()=>closed++,onCreated:()=>created++};
const library=[{id:'library-id',name:'Authored {companion}',level:2,class:'fighter'}];
r.render('CompanionBuilderDialog',cp,'zh-CN',q(companionFile,[false,null,library,null]));assert(r.elements().some(e=>e.props.submitLabel==='添加同伴'));
const oldFetch=globalThis.fetch,calls=[];let mode='ok';
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});if(mode==='network')throw Error('synthetic');return new Response(JSON.stringify(mode==='refuse'?{error:'The party already has its full number of companions.'}:{characters:library}),{status:mode==='refuse'?409:200});};
try{
 r.render('PregenPicker',{campaignId:'c'},'zh-CN',q(pregenFile,[heroes,'',null,null,0]));await r.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false).props.onClick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/sheet/pregen',method:'POST',body:{id:heroes[0].id}});
 r.render('CompanionBuilderDialog',cp,'zh-CN',q(companionFile,[false,null,library,null]));r.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false).props.onClick();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/companions/create',method:'POST',body:{libraryCharacterId:'library-id'}});assert.equal(created,1);assert.equal(closed,1);
 const sheet=PREGENS[0].sheet;r.render('CompanionBuilderDialog',cp,'zh-CN');await r.elements().find(e=>e.props.submitLabel).props.onSubmit({sheet});assert.deepEqual(calls.pop().body,{sheet});
 mode='refuse';r.render('CompanionBuilderDialog',cp,'zh-CN',q(companionFile,[false,null,library,null]));r.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false).props.onClick();await tick();assert.equal(created,2);assert.equal(closed,2);assert(r.updates().some(u=>u.at===1&&u.value?.data.error==='The party already has its full number of companions.'));calls.length=0;
 mode='network';r.render('CompanionBuilderDialog',cp,'zh-CN',q(companionFile,[false,null,library,{data:{},fallback:'entryCharacter.error.library'}]));r.elements().find(e=>e.type==='button'&&e.props.children==='重试').props.onClick();await tick();assert(r.updates().some(u=>u.at===3&&u.value?.fallback==='prep.networkError'));assert(!r.updates().some(u=>u.at===2));
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: localized character-entry and companion UI, four source-matched pregen summaries/backstories with unchanged mechanics, canonical hero/library/sheet requests and retained library on retry failure (mock transport only).');
