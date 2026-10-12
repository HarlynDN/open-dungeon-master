// Structured display and fake undo transport only; never changes real sheets.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['EventLog','TimelinePanel'].map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`),[eventFile,timelineFile]=files;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64'),load={loaded:true,loadError:''},token='odm-feed-load-'+Math.random();globalThis[token]=load;
const r=await openCombatRenderer({files,sourceOf:file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')+(file===eventFile?'\nexport {ConfirmUndoDialog};':''),stubs:{
 '@/lib/load-state':url(`export const readLoad=async()=>({payload:{},error:null});export const useLoadStatus=()=>({...globalThis[${JSON.stringify(token)}],settle:()=>{}});`),
}});
const {describeAuditEntry,feedText,timelineRowView}=await import('../src/lib/i18n/feed-presentations.ts');
const {buildTimeline}=await import('../src/lib/dm/timeline-logic.ts');
const {CALENDAR_PRESETS}=await import('../src/lib/dm/calendar.ts');
const q=(file,values)=>({queues:{[file]:values}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
for(const [kind,delta,expected]of [
 ['apply_damage',{amount:7,type:'fire',currentHp:3},'Aria takes 7 damage (fire) (3 HP)'],
 ['apply_damage',{form:'Brown Bear',reverted:true,carryover:2},"Aria's Brown Bear form breaks, 2 damage carrying through"],
 ['heal',{amount:7,newHp:10},'Aria heals 7 (10 HP)'],
 ['purchase',{action:'sell',item:'Dagger',qty:2,price:2},'Aria sells Dagger x2 for 4 gold'],
 ['modify_gold',{delta:-2,gold:10},'Aria loses 2 gold (10 gp)'],
 ['use_resource',{resource:'Action Surge',spent:2},'Aria spends 2 uses of Action Surge'],
 ['update_sheet',{currentHp:4,ac:15},"The DM rewrites Aria's sheet (currentHp, ac)"],
 ['rest_short',{},'Aria: rest_short'],
 ]){
 const snapshot=structuredClone(delta);assert.equal(describeAuditEntry({kind,delta},'Aria','en'),expected);assert.notEqual(describeAuditEntry({kind,delta},'Aria','zh-CN'),expected);assert.deepEqual(delta,snapshot);
}
assert(!describeAuditEntry({kind:'apply_damage',delta:{deathWard:true}},'Aria','zh-CN').includes('undefined'));
assert.equal(describeAuditEntry({kind:'custom',delta:{}},'自定 {角色}','zh-CN'),'自定 {角色}：custom');
const warning='A newer apply_damage change (Authored reason {raw}) also touched: currentHp, conditions.';
assert(feedText(warning,'zh-CN').includes('当前生命值、状态')&&feedText(warning,'zh-CN').includes('Authored reason {raw}'));
const sources={chapters:[{id:'c1',index:1,title:'',summary:'“到了！”随后继续。',seqEnd:1,clockLabel:'旧日期原文',status:'closed'},{id:'c2',index:2,title:'Chapter 2',summary:'Authored summary.',seqEnd:2,clockLabel:'',status:'closed'}],acts:[{act:1,sagaIndex:1,title:'自定 {幕名}',recap:'Recap.',endedSeq:2,clockLabel:''}],facts:[],sessions:[],arcs:[],now:{seq:3,clockLabel:'Original clock',instant:0}};
const snapshot=structuredClone(sources),rows=buildTimeline(sources,false);assert.deepEqual(sources,snapshot);assert.equal(rows[0].detail,'“到了！”');
assert.equal(timelineRowView(rows.find(row=>row.id==='chapter-c1'),'zh-CN').title,'第 1 章');assert.equal(timelineRowView(rows.find(row=>row.id==='chapter-c2'),'zh-CN').title,'Chapter 2','authored title resembling native fallback is protected');
assert.equal(timelineRowView(rows.find(row=>row.kind==='act'),'en').title,'End of Act I: 自定 {幕名}');
assert.equal(timelineRowView(rows.find(row=>row.kind==='now'),'zh-CN').title,'现在');assert.notEqual(timelineRowView(rows.find(row=>row.kind==='now'),'zh-CN',CALENDAR_PRESETS[0]).detail,'Original clock');
load.loadError='The timeline did not load. The server could not be reached.';let html=r.render('TimelinePanel',{campaignId:'c',refreshKey:0},'zh-CN',q(timelineFile,[rows,0,new Set(),CALENDAR_PRESETS[0]]));assert(html.includes('第 1 章')&&html.includes('Chapter 2')&&html.includes('时间线未能加载'));load.loadError='';
const entry={id:'audit',characterId:'pc',characterName:'自定 {角色}',kind:'heal',delta:{amount:7,newHp:10},reason:'Authored reason',seq:1,undoable:true,turnId:'turn'};
const ep={campaignId:'c',auditLog:[entry,{...entry,id:'audit-2',seq:2}],sheets:[],steersStory:true};
html=r.render('EventLog',ep,'zh-CN');assert(html.includes('获得 7 点治疗')&&html.includes('Authored reason')&&html.includes('撤销此回合'));
const oldFetch=globalThis.fetch,calls=[];let mode='conflict';
globalThis.fetch=async(url,init)=>{calls.push({url,body:JSON.parse(init.body)});return new Response(JSON.stringify(mode==='conflict'?{warnings:[warning]}:{ok:true}),{status:mode==='conflict'?409:200});};
try{
 r.render('EventLog',ep,'zh-CN');await r.elements().find(e=>e.props['aria-label']==='撤销此项变更').props.onClick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/audit/audit-2/undo',body:{}});
 const confirmation=r.updates().find(u=>u.at===2&&u.value?.warnings).value;assert.deepEqual(confirmation.warnings,[warning]);mode='ok';await confirmation.run();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/audit/audit-2/undo',body:{confirm:true}});
 r.render('EventLog',ep,'zh-CN');await r.elements().find(e=>e.props.title==='撤销此 DM 回合中的所有角色卡变更（仅数值）').props.onClick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/audit/revert-turn',body:{turnId:'turn'}});
 let cancelled=0;r.render('ConfirmUndoDialog',{warnings:[warning],busy:true,onConfirm:()=>{},onCancel:()=>cancelled++},'zh-CN');r.elements().find(e=>e.props.open===true&&e.props.onOpenChange).props.onOpenChange(false);assert.equal(cancelled,0);
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: English audit wording and Chinese structured facts, protected authored titles/reasons, Chinese summary boundary and generated timeline/calendar display, retained load rows and canonical two-step undo/revert requests (mock transport only).');
