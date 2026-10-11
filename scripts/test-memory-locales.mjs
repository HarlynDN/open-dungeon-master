// Focused owned UI/protocol check. No live API, prompt generation or model call.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['FactsPanel','PinsPanel','ContextPanel'].map(name=>`src/app/campaigns/[campaignId]/${name}.tsx`),[factsFile,pinsFile,contextFile]=files;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const load={loaded:true,loadError:''},token='odm-memory-load-'+Math.random();globalThis[token]=load;
const r=await openCombatRenderer({files,sourceOf:file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')+(file===factsFile?'\nexport {FactCard,FactComposer};':'')+(file===pinsFile?'\nexport {PinItem};':''),stubs:{
 '@/lib/load-state':url(`export const readLoad=async()=>({payload:{},error:null});export const useLoadStatus=()=>({...globalThis[${JSON.stringify(token)}],settle:()=>{}});`),
 '@/components/DictateField':url('export const DictateField=({children})=>children;'),
}});
const {factCategoryLabel,contextKindLabel,contextReasonText,memoryText}=await import('../src/lib/i18n/memory-presentations.ts');
const q=(file,values)=>({queues:{[file]:values}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
const fact={id:'f',subject:'Authored {subject}',fact:'Authored fact',category:'npc',knownBy:'party',pinned:true};
const secret={...fact,id:'secret',knownBy:'dm',fact:'Authored secret'};
let refreshed=0;const fp={campaignId:'c',fact,steersStory:true,refresh:async()=>refreshed++};
let html=r.render('FactCard',fp,'zh-CN');assert(html.includes('人物')&&html.includes('Authored fact')&&html.includes('Authored {subject}'));
html=r.render('FactCard',fp,'en');assert(html.includes('People')&&html.includes('Unpin'));
assert.equal(factCategoryLabel('promise','en'),'Promises & debts');assert.equal(contextKindLabel('factions','zh-CN'),'势力');
assert.equal(contextReasonText('Authored reason {raw}.','zh-CN'),'Authored reason {raw}.');assert.equal(memoryText('Authored failure.','zh-CN'),'Authored failure.');
const reason='over the history budget (200 > 100 tokens left)';assert.equal(contextReasonText(reason,'en'),reason);assert(contextReasonText(reason,'zh-CN').includes('聊天记录额度'));
const trace={promptTokens:300,limitTokens:500,blocks:[{id:'authored-id',kind:'history',tokens:200,position:1,included:false,reason},{id:'protocol-id',kind:'contract',tokens:100,position:2,included:true,reason:'always included'}]};
html=r.render('ContextPanel',{campaignId:'c'},'zh-CN',q(contextFile,[trace,'',false,'',0]));assert(html.includes('已舍弃')&&html.includes('始终包含')&&html.includes('authored-id'));
const pin={id:'p',messageId:'message-id',text:'Authored excerpt',isFullMessage:false,createdAt:''};
load.loadError='The pins did not load. The server could not be reached.';html=r.render('PinsPanel',{campaignId:'c',version:0},'zh-CN',q(pinsFile,['',[pin],0]));assert(html.includes('Authored excerpt')&&html.includes('固定记忆未能加载'));load.loadError='';
const oldFetch=globalThis.fetch,calls=[];let mode='ok';
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method??'GET',body:init?.body?JSON.parse(init.body):null});if(mode==='network')throw Error('synthetic');return new Response(JSON.stringify(mode==='refuse'?{error:'Fact not found.'}:{facts:[secret,fact]}),{status:mode==='refuse'?404:200});};
const menu=id=>r.elements().find(e=>e.props.items?.some(i=>i.id===id)).props.items.find(i=>i.id===id);
try{
 r.render('FactCard',fp,'zh-CN');menu('pin').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/facts',method:'PATCH',body:{factId:'f',pinned:false}});assert.equal(refreshed,1);
 r.render('FactCard',fp,'zh-CN');menu('retire').onSelect();await tick();assert.equal(calls.pop().body.status,'retired');
 mode='refuse';r.render('FactCard',fp,'zh-CN',q(factsFile,['',true,'修订内容',false]));await r.elements().find(e=>e.props.tone==='primary'&&e.props.onClick).props.onClick();assert(!r.updates().some(u=>u.at===1&&u.value===false));assert(r.updates().some(u=>u.at===0&&u.value==='Fact not found.'));assert.equal(calls.pop().body.fact,'修订内容');
 mode='ok';r.render('FactComposer',{campaignId:'c',refresh:async()=>refreshed++},'zh-CN',q(factsFile,['promise','  自定主题  ','  自定事实  ',false,'']));await r.elements().find(e=>e.props.tone==='secondary'&&e.props.onClick).props.onClick();assert.deepEqual(calls.pop().body,{category:'promise',subject:'自定主题',fact:'自定事实'});
 r.render('FactsPanel',{campaignId:'c',facts:[],steersStory:true,refreshFacts:async()=>refreshed++},'zh-CN',q(factsFile,['',[secret]]));await r.elements().find(e=>e.props.fact?.id==='secret').props.refresh();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/facts?secrets=1',method:'GET',body:null});assert(r.updates().some(u=>u.at===1&&Array.isArray(u.value)&&u.value.length===1&&u.value[0].knownBy==='dm'));
 r.render('PinsPanel',{campaignId:'c',version:0},'zh-CN',q(pinsFile,['',[pin],0]));menu('unpin').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/pins',method:'DELETE',body:{pinId:'p'}});
 mode='network';r.render('PinsPanel',{campaignId:'c',version:0},'zh-CN',q(pinsFile,['',[pin],0]));menu('unpin').onSelect();await tick();assert(!r.updates().some(u=>u.at===2));assert(r.updates().some(u=>u.at===0&&u.value==='Could not reach the server.'));calls.length=0;
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: Chinese fact/pin/context UI, raw authored content and trace IDs, canonical pin/retire/create/delete requests, retained failed edit and explicit secret refetch (mock transport only).');
