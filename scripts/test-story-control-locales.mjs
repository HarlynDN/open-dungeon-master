// Local JSX and fake transport; never merges live NPCs or changes real models.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';import {z} from 'zod';
import {controlRenderer,controlCases,npcFile,aiFile,npcs,suggestions,npcQueue,aiQueue,settings,drafts,kept} from './lib/story-control-ui-fixtures.mjs';
const {controlText}=await import('../src/lib/i18n/story-control-presentations.ts');
const {planMerge,planRename}=await import('../src/lib/dm/entity-review-logic.ts');
const renderer=await controlRenderer();
const upstream=await controlRenderer(file=>[npcFile,aiFile].includes(file)?execFileSync('git',['show',`2b0b6b6e:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8'));
for(const row of controlCases()){
 assert.equal(renderer.render(row.component,row.props,'en',row.options),upstream.render(row.component,row.props,'en',row.options),row.name+' upstream English');
 const original=renderer.elements().filter(e=>e.props.options).map(e=>({value:e.props.value,options:e.props.options.map(row=>row.value)}));
 const zh=renderer.render(row.component,row.props,'zh-CN',row.options);
 assert.deepEqual(renderer.elements().filter(e=>e.props.options).map(e=>({value:e.props.value,options:e.props.options.map(row=>row.value)})),original,'canonical '+row.name);
 assert(!zh.includes('Storyteller:')&&!zh.includes('Possible duplicates'));
 for(const input of renderer.elements().filter(e=>e.type==='input'&&e.props.type==='password'))assert.equal(input.props.value,'','masked key must stay hidden');
}
const nq=p=>({queues:{[npcFile]:npcQueue(p)}}),aq=p=>({queues:{[aiFile]:aiQueue(p)}});
const before=structuredClone(npcs);
let html=renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({}));
assert(html.includes('Authored one')&&html.includes('Alias {literal}')&&html.includes('友好')&&html.includes('已归档'));assert.deepEqual(npcs,before);
for(const source of [planMerge({name:'',aliases:[]},npcs[1]).error,planMerge(npcs[0],npcs[0]).error,planRename(npcs[0],'').error,planRename(npcs[0],npcs[0].name).error])assert.notEqual(controlText(source,'zh-CN'),source);
assert(controlText('Another NPC is already called "名字 {raw}". Merge them instead.','zh-CN').includes('名字 {raw}'));
assert(controlText("The server's Authored agent is kept for campaigns an administrator leads.",'zh-CN').includes('Authored agent'));
assert.equal(controlText('Authored response {raw}.','zh-CN'),'Authored response {raw}.');
for(const limit of [200,400,500]){
 const source=z.string().trim().max(limit).safeParse('x'.repeat(limit+1)).error.issues[0].message;
 assert.equal(controlText(source,'en'),source);assert(controlText(source,'zh-CN').includes(String(limit))&&!controlText(source,'zh-CN').includes('Too big'));
}
html=renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({loaded:false,npcs:[],suggestions:[],loadError:'The NPC roster did not load. The server could not be reached.'}));
assert(html.includes('无法连接服务器')&&!html.includes('暂无人物'));
html=renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({loadError:'The NPC roster did not load. The server answered 403.'}));assert(html.includes('403')&&html.includes('Authored one'));
const oldFetch=globalThis.fetch,calls=[];let mode='ok',error='NPC not found.';
globalThis.fetch=async(url,init)=>{
 calls.push({url,method:init?.method??'GET',body:init?.body?JSON.parse(init.body):null});
 if(mode==='network')throw new Error('synthetic network failure');
 if(mode==='refuse')return new Response(JSON.stringify({error}),{status:409});
 return new Response(JSON.stringify(init?.method==='PATCH'?{settings:{hasCustomApiKey:true,hasUtilityApiKey:true,imagesReady:true}}:{npcs,suggestions}),{status:200});
};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const selects=()=>renderer.elements().filter(e=>e.props.options).map(e=>e.props);
const choose=label=>selects().find(p=>p.label===label);
const buttonText=e=>Array.isArray(e.props.children)?e.props.children.filter(x=>typeof x==='string').join(''):e.props.children;
try{
 renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({}));
 renderer.elements().find(e=>e.type==='button'&&buttonText(e)===' 保留“Authored one”').props.onClick();await tick();
 assert.deepEqual(calls.find(c=>c.method==='POST').body,{action:'merge',keepId:'n1',mergeId:'n2'});calls.length=0;
 renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({}));
 renderer.elements().find(e=>e.type==='button'&&buttonText(e)===' 保留“Authored two”').props.onClick();await tick();assert.deepEqual(calls.find(c=>c.method==='POST').body,{action:'merge',keepId:'n2',mergeId:'n1'});calls.length=0;
 renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({}));
 renderer.elements().find(e=>e.type==='button'&&buttonText(e)===' 是不同人物').props.onClick();await tick();assert.deepEqual(calls.find(c=>c.method==='POST').body,{action:'dismiss',name:'Authored one',matches:'Authored two'});calls.length=0;
 renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({renaming:'n1',draft:' 中文名字 '}));
 const rename=renderer.elements().find(e=>e.type==='input').props;
 rename.onKeyDown({key:'Enter',nativeEvent:{isComposing:true}});await tick();assert.equal(calls.length,0);
 rename.onKeyDown({key:'Enter',nativeEvent:{isComposing:false}});await tick();assert.deepEqual(calls.find(c=>c.method==='POST').body,{action:'rename',npcId:'n1',name:'中文名字'});calls.length=0;
 renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({loaded:false,npcs:[],suggestions:[],loadError:'The NPC roster did not load. The server could not be reached.'}));
 renderer.elements().find(e=>e.type==='button').props.onClick();await tick();assert.equal(calls[0].url,'/api/campaigns/c/npcs/review');assert(renderer.updates().some(u=>u.at===2&&u.value===true));calls.length=0;
 mode='refuse';renderer.render('NpcReviewPanel',{campaignId:'c'},'zh-CN',nq({loaded:false,npcs:[],suggestions:[],loadError:'The NPC roster did not load. The server could not be reached.'}));renderer.elements().find(e=>e.type==='button').props.onClick();await tick();assert(renderer.updates().some(u=>u.at===7&&typeof u.value==='string'&&u.value.includes('NPC not found.')));assert(!renderer.updates().some(u=>u.at===2&&u.value===true));calls.length=0;
 mode='ok';
 const aiProps={campaignId:'c',settings,steersStory:true};
 renderer.render('StoryAiPanel',aiProps,'zh-CN',aq({harness:{offered:true,pictures:true,label:'Authored agent',model:'Authored model'}}));
 await choose('主持模型').onChange('harness');assert.deepEqual(calls.pop().body,{textProvider:'harness'});
 await choose('辅助模型提供方').onChange('local');assert.deepEqual(calls.pop().body,{utilityProvider:'local'});
 await choose('图像').onChange('off');assert.deepEqual(calls.pop().body,{imageGenerationEnabled:false});
 await choose('图像').onChange('openai');assert.deepEqual(calls.pop().body,{imageBackend:'openai',imageGenerationEnabled:true});
 await choose('图像形状').onChange('portrait');assert.deepEqual(calls.pop().body,{aspect:'portrait'});
 await choose('图像生成速度').onChange('slow');assert.deepEqual(calls.pop().body,{imageMode:'slow'});
 await choose('旁白长度').onChange('huge');assert.deepEqual(calls.pop().body,{proseSize:'huge'});
 renderer.render('StoryAiPanel',aiProps,'zh-CN',aq({}));
 for(const key of renderer.elements().filter(e=>e.type==='input'&&e.props.type==='password'))key.props.onBlur();await tick();assert.equal(calls.length,0,'untouched secret sentinel must not PATCH');
 renderer.render('StoryAiPanel',aiProps,'zh-CN',aq({drafts:{...drafts,customModel:' 模型-id ',customApiKey:'synthetic-only'}}));
 const modelInput=renderer.elements().find(e=>e.type==='input'&&e.props.value===' 模型-id ').props;let blurred=0;
 modelInput.onKeyDown({key:'Enter',nativeEvent:{isComposing:true},currentTarget:{blur:()=>blurred++}});assert.equal(blurred,0);
 modelInput.onKeyDown({key:'Enter',nativeEvent:{isComposing:false},currentTarget:{blur:()=>blurred++}});assert.equal(blurred,1);
 modelInput.onBlur();await tick();assert.deepEqual(calls.pop().body,{customModel:'模型-id'});
 renderer.elements().find(e=>e.type==='input'&&e.props.type==='password'&&e.props.value==='synthetic-only').props.onBlur();await tick();assert.deepEqual(calls.pop().body,{customApiKey:'synthetic-only'});assert(renderer.updates().some(u=>u.at===11&&typeof u.value==='function'&&u.value(drafts).customApiKey===kept));
 mode='refuse';error='That change was not saved.';renderer.render('StoryAiPanel',aiProps,'zh-CN',aq({}));await choose('旁白长度').onChange('huge');assert(renderer.updates().some(u=>u.at===1&&u.value===error));
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: 20 English roster/settings states, canonical selector values and NPC/model PATCH data, masked-key preservation, IME handling, native validation/refusals and load/retry without false-empty or data loss (mock transport only).');
