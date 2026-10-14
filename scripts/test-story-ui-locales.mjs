// Local rendering and mocked requests only; never rewinds a live campaign.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {storyRenderer,storyCases,storyFile,chapter,openChapter,arc,arcQueue,parentQueue} from './lib/story-ui-fixtures.mjs';
const {storyText,storyKindLabel}=await import('../src/lib/i18n/story-presentations.ts');
const {rollbackWarnings}=await import('../src/lib/dm/rollback-logic.ts');
const {applyBeatEdit}=await import('../src/lib/dm/arc-edit-logic.ts');
const renderer=await storyRenderer();const upstream=await storyRenderer(file=>[storyFile].includes(file)?execFileSync('git',['show',`2b0b6b6e:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8'));
const q=values=>({queues:{[storyFile]:values}});

for(const row of storyCases())assert.equal(renderer.render(row.component,row.props,'en',row.options),upstream.render(row.component,row.props,'en',row.options),row.name+' upstream English');
const before=structuredClone(arc);
const full=renderer.render('ArcCard',{campaignId:'c'},'zh-CN',q(arcQueue()));
for(const text of ['DM 剧情线','第 1 幕','当前','地点','NPC 遭遇','Authored premise.','Authored pending beat.','Authored role','Authored trigger'])assert(full.includes(text),text);
assert.deepEqual(arc,before);
const contexts=renderer.elements().filter(e=>e.props.items).map(e=>e.props.items);
const pending=contexts.find(items=>items.some(item=>item.id==='now'));
assert.deepEqual(pending.map(item=>item.id),['now','up','down','reword','skip']);
assert(pending.every(item=>/[\u3400-\u9fff]/.test(item.label)));
assert(contexts.some(items=>items.length===0),'settled beats expose no mutation menu');
const warnings=[];
for(const count of [1,3])warnings.push(...rollbackWarnings({targetChapterIndex:2,boundarySeq:5,messagesToDelete:count,chaptersToDelete:count,activeEncounter:true,inFlightTurn:true,pendingRolls:1,pendingProposals:1,sheetsToRemove:['Authored {name}']}));
for(const warning of warnings){assert.equal(storyText(warning,'en'),warning);assert.notEqual(storyText(warning,'zh-CN'),warning);}
assert(warnings.some(warning=>storyText(warning,'zh-CN').includes('Authored {name}')));
for(const kind of ['place','npc','item','objective','fight','narrative'])assert(storyKindLabel('waypoint',kind,'zh-CN')!==kind||kind==='npc');
for(const kind of ['npc_encounter','ally','twist','betrayal','deadline','discovery','setpiece'])assert.notEqual(storyKindLabel('event',kind,'zh-CN'),kind);
assert.equal(storyText('Authored refusal {value}.','zh-CN'),'Authored refusal {value}.');
assert.equal(storyKindLabel('event','authored_event','zh-CN'),'authored event');
const parent={campaignId:'c',chapters:[],steersStory:false};
for(const locale of ['en','zh-CN']){
 renderer.status(false);let html=renderer.render('StoryPanel',parent,locale);
 assert(!html.includes('loadError')&&!html.includes('story has not begun')&&!html.includes('故事尚未开始'));
 renderer.status(true);html=renderer.render('StoryPanel',parent,locale);assert(html.includes(locale==='en'?'The story has not begun':'故事尚未开始'));
 renderer.status(false,'The chapters did not load. The server could not be reached.');
 html=renderer.render('StoryPanel',parent,locale);assert(html.includes(locale==='en'?'could not be reached':'无法连接服务器'));
 renderer.elements().find(e=>e.props.onRetry).props.onRetry();
 assert(renderer.updates().some(update=>update.at===2&&typeof update.value==='function'&&update.value(0)===1));
}
renderer.status(true,'The chapters did not load. The server answered 403.');
let kept=renderer.render('StoryPanel',{...parent,chapters:[chapter,openChapter]},'zh-CN',q(parentQueue()));
assert(kept.includes('403')&&kept.includes('Authored title'));
renderer.status(true);
const oldFetch=globalThis.fetch;const calls=[];let reply={status:200,data:{arc}};
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});return new Response(JSON.stringify(reply.data),{status:reply.status,headers:{'Content-Type':'application/json'}});};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
try{
 renderer.render('ArcCard',{campaignId:'c'},'zh-CN',q(arcQueue()));
 const menu=renderer.elements().find(e=>e.props.items?.some(item=>item.id==='now')).props.items;
 menu.find(item=>item.id==='now').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/arc',method:'PATCH',body:{op:'setNow',beat:2}});
 renderer.render('ArcCard',{campaignId:'c'},'zh-CN',q(arcQueue()));
 renderer.elements().find(e=>e.type==='input'&&e.props.type==='checkbox').props.onChange({target:{checked:true}});await tick();assert.deepEqual(calls.pop().body,{op:'waypoint',beat:1,index:0,done:true});
 renderer.render('ArcCard',{campaignId:'c'},'zh-CN',q(arcQueue({editingBeat:2,draft:' 中文节点 '})));
 const input=renderer.elements().find(e=>e.type==='input'&&e.props.onKeyDown).props;
 const count=calls.length;input.onKeyDown({key:'Enter',nativeEvent:{isComposing:true}});await tick();assert.equal(calls.length,count,'IME Enter must not submit');
 input.onKeyDown({key:'Enter',nativeEvent:{isComposing:false}});await tick();assert.deepEqual(calls.pop().body,{op:'rename',beat:2,text:'中文节点'});
 renderer.render('ChapterCard',{campaignId:'c',chapter,steersStory:true},'zh-CN',q([true,true,' 原始标题 ','原始摘要 {literal}.',false]));
 renderer.elements().find(e=>e.props.onClick&&e.props.children?.some?.(child=>child==='保存')).props.onClick();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/chapters/chapter-1',method:'PATCH',body:{title:'原始标题',summary:'原始摘要 {literal}.'}});
 const lead={campaignId:'c',chapters:[chapter,openChapter],steersStory:true};
 reply={status:409,data:{warnings:rollbackWarnings({targetChapterIndex:2,messagesToDelete:3,chaptersToDelete:0,activeEncounter:false,inFlightTurn:false,pendingRolls:0,pendingProposals:0,sheetsToRemove:[]})}};
 renderer.render('StoryPanel',lead,'zh-CN',q(parentQueue()));
 renderer.elements().find(e=>e.props.title==='丢弃本章进展，恢复到本章开始时').props.onClick();await tick();
 assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/chapters/rollback',method:'POST',body:{chapterIndex:2,confirm:false}});
 const target=renderer.updates().find(update=>update.at===3&&update.value?.warnings).value;
 assert.deepEqual(target,{chapterIndex:2,warnings:reply.data.warnings});
 reply={status:200,data:{ok:true}};
 const confirm=renderer.render('StoryPanel',lead,'zh-CN',q(parentQueue({target})));
 assert(confirm.includes('3 条消息将被删除')&&confirm.includes('此操作无法撤销'));
 renderer.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false&&e.props.children?.some?.(child=>child===' 回退')).props.onClick();await tick();
 assert.deepEqual(calls.pop().body,{chapterIndex:2,confirm:true});
}finally{globalThis.fetch=oldFetch;}
// A real native edit refusal must remain recognizable after future source edits.
for(const edit of [{op:'rename',beat:3,text:'No'},{op:'waypoint',beat:3,index:0,done:true},{op:'skip',beat:3},{op:'setNow',beat:3},{op:'move',beat:2,direction:'down'},{op:'add',act:99,text:'No'},{op:'rename',beat:99,text:'No'},{op:'add',act:1,text:''}]){
 const result=applyBeatEdit(arc,edit);assert(result.error);assert.notEqual(storyText(result.error,'zh-CN'),result.error);
}
console.log('PASS: 17 English story states, localized native warnings/refusals, preserved authored arc/history, canonical menu/PATCH data, IME handling, empty/load/retry states and two-step rewind confirmation (mock requests only).');
