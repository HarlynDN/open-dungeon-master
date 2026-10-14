// Changed condition input/failure display and request recovery only; no live engine or model.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {boardPanelErrorText}=await import('../src/lib/i18n/board-control-presentations.ts');
const {resolveConditionInput,conditionLabel}=await import('../src/lib/i18n/condition-presentations.ts');
const {createTranslator,catalogFor,registerMessages,messageTemplate}=await import('../src/lib/i18n/translator.ts');
const {planLongJump}=await import('../src/lib/srd/jump.ts');
const t=createTranslator('en'),params={name:'Authored {name}',cause:'grappled, restrained',reach:10,feet:15,left:5,x:2,y:1,count:24,options:'first, second'};
let frames=0;
for(const key of Object.keys(catalogFor('en','boardOpsUi.refusal.'))){const raw=t(key,params);assert.equal(boardPanelErrorText(raw,'en'),raw);assert.notEqual(boardPanelErrorText(raw,'zh-CN'),raw,key);frames++;}
assert.equal(boardPanelErrorText('Authored unknown diagnostic','zh-CN'),'Authored unknown diagnostic');assert.equal(boardPanelErrorText('Nobody can land at (text,2).','zh-CN'),'Nobody can land at (text,2).');
assert(boardPanelErrorText('You cannot move while exhaustion level 5 holds you (speed 0).','zh-CN').includes('5 级力竭'));
const jumpBase={terrain:'.'.repeat(25),width:5,height:5,occupied:new Set(),from:{x:1,y:1},to:{x:3,y:1},strength:20,runningStart:true,budgetTiles:10,name:'Authored {name}'};
for(const patch of [{strength:5},{budgetTiles:1},{to:{x:1,y:1}},{terrain:'.'.repeat(7)+'#'+'.'.repeat(17)},{terrain:'.'.repeat(7)+'|'+'.'.repeat(17)},{occupied:new Set([7])},{occupied:new Set([8])},{to:{x:-1,y:1}}]){const result=planLongJump({...jumpBase,...patch});assert(!result.ok);assert.notEqual(boardPanelErrorText(result.error,'zh-CN'),result.error);}
const basic=Object.keys(catalogFor('en','closedHelp.condition.')).filter(key=>key.endsWith('.name')).map(key=>key.slice('closedHelp.condition.'.length,-5));
for(const name of basic){const result=resolveConditionInput(conditionLabel(name,'zh-CN'),'zh-CN');assert.equal(result.name,name,'basic condition '+name);}
assert.deepEqual(resolveConditionInput('Authored {condition}','zh-CN'),{name:'Authored {condition}'});assert.deepEqual(resolveConditionInput('Prone ','en'),{name:'Prone '});assert.deepEqual(resolveConditionInput('prone','zh-CN'),{name:'prone'});
const base='src/app/campaigns/[campaignId]/',main=base+'BattleMapPanel.tsx',roll='src/app/workshop/maps/MapRollPanel.tsx',files=[main,roll];
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');const shells=names=>url(names.map(n=>`export const ${n}=()=>null;`).join('\n'));
const stubs={
 '@/app/campaigns/[campaignId]/BattleMapGrid':shells(['BattleMapGrid']),
 '@/app/campaigns/[campaignId]/DmBoardControls':shells(['BoardToolRail','MeasureControls','PlaceTokenForm']),
 '@/app/campaigns/[campaignId]/usePaintedMap':url('export const usePaintedMap=()=>null;'),
 '@/app/campaigns/[campaignId]/useBoardCamera':url('export const useBoardCamera=()=>({frameRef:{current:null},attachFrame:()=>{},camera:{x:0,y:0,zoom:1},frameProps:{},locked:false,zoomIn:()=>{},zoomOut:()=>{},reset:()=>{}});'),
 '@/app/campaigns/[campaignId]/BoardMoveModes':url('export const JumpArc=()=>null;export const BoardMoveHints=()=>null;export const useBoardMoveModes=view=>({gridView:view,moveMode:"walk",setMoveMode:()=>{},leap:null,moveBody:{},landed:()=>{}});'),
 '@/app/campaigns/[campaignId]/BoardChrome':shells(['FieldDie','InitiativeRail','TargetChips','TokenFace','TokenPlate','TurnBanner','TurnHud']),
 '@/app/campaigns/[campaignId]/BoardIntent':shells(['IntentLayer']),
 '@/app/campaigns/[campaignId]/CinematicParts':shells(['TabletopOrder']),
 '@/app/campaigns/[campaignId]/DmInitiativePanel':shells(['DmInitiativePanel']),
 '@/components/SkyLayer':shells(['SkyLayer']),
};
const r=await openCombatRenderer({files,stubs}),before=await openCombatRenderer({files,stubs,sourceOf:file=>files.includes(file)?execFileSync('git',['show',`2b0b6b6e:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8')});
const pc={id:'p',refId:'p',name:'Authored {name}',kind:'pc',x:1,y:1},view={mapId:'map',board:'combat',width:10,height:10,terrain:'.'.repeat(100),tokens:[pc],myTokenId:'p',reachable:[11],budgetLeft:6,tokenFootprint:{},tokenHealth:{},tokenConditions:{},turn:{tokenId:'p',round:2},currentTurnName:pc.name,round:2};
const queues=()=>[false,false,'',false,null,null,null,'handle',null,'npc','','sphere',20,null,null,null,null,null,null,true,null,null,false,false,'p:2',null,false,'stroke','gold',false,null,null];
let refreshed=0;const props={campaignId:'c',view,encounter:null,sheets:[],canDirect:true,refreshBattleMap:async()=>refreshed++};
const conditionQ=queues();conditionQ[18]={kind:'condition',tokenId:'p'};
let renders=0;
for(const state of [queues(),conditionQ]){const options={queues:{[main]:state}};assert.equal(r.render('BattleMapPanel',props,'en',options),before.render('BattleMapPanel',props,'en',options));renders++;}
for(const state of [['','',false,0,null],['dungeon','',false,1,123],['cave','forest',true,2,123]]){const options={queues:{[roll]:state}};const p={width:20,height:15,genre:null,onRoll:()=>{}};assert.equal(r.render('MapRollPanel',p,'en',options),before.render('MapRollPanel',p,'en',options));renders++;}
assert(r.render('MapRollPanel',{width:20,height:15,genre:null,onRoll:()=>{}},'zh-CN',{queues:{[roll]:['forest','',false,1,123]}}).includes('森林'));
const originalFetch=globalThis.fetch,calls=[];const drain=()=>new Promise(resolve=>setImmediate(resolve));
const renderPrompt=()=>{r.render('BattleMapPanel',props,'zh-CN',{queues:{[main]:conditionQ}});return r.elements().find(e=>e.props.label==='状态（中文译名、英文原名或自定义名称）');};
try{
 globalThis.fetch=async(path,options)=>{calls.push({path,body:JSON.parse(options.body)});return {ok:true,json:async()=>({result:{ok:true}})};};
 const prompt=renderPrompt();assert.equal(prompt.props.placeholder,'倒地');prompt.props.onSubmit('倒地');await drain();assert.deepEqual(calls.at(-1).body,{name:'set_condition',args:{characterId:'p',condition:'prone'}});assert.equal(refreshed,1);
 const key='combatDetail.effect.empty_body.name',original=messageTemplate('zh-CN',key);
 try{registerMessages({'zh-CN':{[key]:'倒地'}});assert('candidates'in resolveConditionInput('倒地','zh-CN'));const count=calls.length;renderPrompt().props.onSubmit('倒地');await drain();assert.equal(calls.length,count);assert(r.updates().some(row=>row.file===main&&typeof row.value==='string'&&row.value.startsWith('That condition name matches')));}finally{registerMessages({'zh-CN':{[key]:original}});}
 globalThis.fetch=async()=>({ok:false,json:async()=>({})});renderPrompt().props.onSubmit('中毒');await drain();assert(r.updates().some(row=>row.file===main&&row.value==='That was not allowed.'));
 globalThis.fetch=async()=>{throw new Error('offline');};
 const eraseQ=queues();eraseQ[7]='draw';r.render('BattleMapPanel',props,'zh-CN',{queues:{[main]:eraseQ}});r.elements().find(e=>e.type==='button'&&e.props.title==='清除所有标记').props.onClick();await drain();
 assert(r.updates().some(row=>row.file===main&&row.value==='Could not reach the table.'));assert(r.updates().some(row=>row.file===main&&row.at===1&&row.value===false));
 const measureQ=queues();measureQ[7]='measure';measureQ[14]={mapId:'map',x:1,y:1};r.render('BattleMapPanel',props,'zh-CN',{queues:{[main]:measureQ}});r.elements().find(e=>e.type?.name==='BattleMapGrid').props.onTileClick(2,2);await drain();assert(r.updates().some(row=>row.file===main&&row.value==='Could not reach the table.'));assert(r.updates().some(row=>row.file===main&&row.at===1&&row.value===false));assert(!r.updates().some(row=>row.file===main&&row.at===14&&row.value===null));
}finally{globalThis.fetch=originalFetch;}
console.log(`PASS: ${frames} owned refusal frames, eight native jump refusals, ${basic.length} exact basic Chinese condition aliases, authored/English names, ${renders} exact English renders, canonical condition request/ambiguous-input block, HTTP refusal and erase/measure network recovery (mock stage/transport).`);
