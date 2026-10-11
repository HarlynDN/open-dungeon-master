// One focused check of actual owned JSX/callbacks, using fake transport only.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const factionFile='src/app/campaigns/[campaignId]/FactionsPanel.tsx',questFile='src/app/campaigns/[campaignId]/QuestsPanel.tsx';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const loadState={loaded:true,loadError:''},token='odm-record-load-'+Math.random();globalThis[token]=loadState;
const r=await openCombatRenderer({files:[factionFile,questFile],stubs:{
 '@/lib/load-state':url(`export const readLoad=async()=>({payload:{},error:null});export const useLoadStatus=()=>({...globalThis[${JSON.stringify(token)}],settle:()=>{}});`),
 '@/app/workshop/lore/LoreFields':url('export const LoreImageField=()=>null;'),
 '@/components/DictateField':url('export const DictateField=({children})=>children;'),
}});
const {factionStandingLabel,factionAttitudeLabel,questStatusLabel,recordText}=await import('../src/lib/i18n/record-presentations.ts');
const props={campaignId:'c',steersStory:true,refreshKey:0};
const faction={id:'f',name:'Authored {faction}',blurb:'Authored description',goal:'Authored goal',attitude:'wary',tags:['Authored tag'],portraitPath:'',standing:2,standingLabel:'trusted',members:[{id:'npc',name:'Authored member',portraitUrl:''}],power:3};
const quest={id:'q',title:'Authored {quest}',objectives:[{id:'o',text:'Authored objective',done:false}],status:'active',source:'dm',visibility:'party'};
const draft={name:'新势力',blurb:'自定信息',goal:'自定目标',attitude:'allied',power:3,tags:'one, 二',portraitPath:''};
const fq=(editing=null,error='')=>({queues:{[factionFile]:[error,[faction],editing,draft,false,0]}});
const qq=(adding=false,error='')=>({queues:{[questFile]:[error,[quest],adding,'新任务','第一项目标\n\n 第二项目标 ',false,0]}});
let html=r.render('FactionsPanel',props,'zh-CN',fq());assert(html.includes('势力')&&html.includes('戒备')&&html.includes('受到信任')&&html.includes('Authored {faction}')&&html.includes('Authored goal'));
html=r.render('QuestsPanel',{...props,steersStory:false},'zh-CN',qq());assert(html.includes('任务日志')&&html.includes('进行中')&&html.includes('Authored objective'));
for(const [source,label]of [['active','Active'],['done','Done'],['failed','Failed'],['hidden','Hidden']])assert.equal(questStatusLabel(source,'en'),label);
assert.equal(factionAttitudeLabel('wary','en'),'wary');assert.equal(factionStandingLabel('trusted','en'),'trusted');assert.equal(factionStandingLabel('Authored reputation','zh-CN'),'Authored reputation');
loadState.loadError='The quest log did not load. The server could not be reached.';html=r.render('QuestsPanel',props,'zh-CN',qq());assert(html.includes('Authored {quest}')&&html.includes('无法连接服务器'));loadState.loadError='';
assert.equal(recordText('Authored failure {raw}.','zh-CN'),'Authored failure {raw}.');
assert(recordText('The factions did not load. The server answered 403.','zh-CN').includes('403'));
const oldFetch=globalThis.fetch,calls=[];let mode='ok';
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});if(mode==='network')throw Error('synthetic');return new Response(JSON.stringify(mode==='refuse'?{error:'Quest not found.'}:{}),{status:mode==='refuse'?404:200});};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const menu=id=>r.elements().find(e=>e.props.items?.some(i=>i.id===id)).props.items.find(i=>i.id===id);
try{
 r.render('FactionsPanel',props,'zh-CN',fq());menu('standing-3').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/factions/f',method:'PATCH',body:{standing:3}});
 r.render('FactionsPanel',props,'zh-CN',fq('new'));r.elements().find(e=>e.props.onClick&&e.props.children==='添加').props.onClick();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/factions',method:'POST',body:{...draft,tags:['one','二']}});
 r.render('FactionsPanel',props,'zh-CN',{...fq(),confirmReplies:[false]});menu('remove').onSelect();await tick();assert.equal(calls.length,0);assert.equal(r.confirmations()[0][0],'从世界中移除Authored {faction}？');
 r.render('QuestsPanel',props,'zh-CN',qq());menu('done').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/quests/q',method:'PATCH',body:{status:'done'}});
 r.render('QuestsPanel',props,'zh-CN',qq());r.elements().find(e=>e.props.label==='已完成：Authored objective').props.onChange(true);await tick();assert.deepEqual(calls.pop().body,{objectives:[{...quest.objectives[0],done:true}]});
 r.render('QuestsPanel',props,'zh-CN',qq(true));r.elements().find(e=>e.props.busy===false&&e.props.onClick&&Array.isArray(e.props.children)).props.onClick();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/quests',method:'POST',body:{title:'新任务',objectives:['第一项目标','第二项目标']}});
 mode='refuse';r.render('QuestsPanel',props,'zh-CN',{...qq(),confirmReplies:[true]});menu('remove').onSelect();await tick();assert.equal(calls.pop().method,'DELETE');assert(!r.updates().some(u=>u.at===1));assert(r.updates().some(u=>u.at===0&&u.value==='Quest not found.'));
 mode='network';r.render('FactionsPanel',props,'zh-CN',fq('new'));r.elements().find(e=>e.props.onClick&&e.props.children==='添加').props.onClick();await tick();assert(r.updates().some(u=>u.at===0&&u.value==='The server could not be reached.'));assert(!r.updates().some(u=>u.at===2&&u.value===null));calls.length=0;
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: localized quest/faction displays, preserved authored names, canonical status/objective/reputation/create requests, cancellation and retained rows/drafts on failures (mock transport only).');
