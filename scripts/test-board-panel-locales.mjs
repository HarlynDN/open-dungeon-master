// Display/shortcut integration only; mocked camera/stage and no real board mutations.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const base='src/app/campaigns/[campaignId]/',main=base+'BattleMapPanel.tsx',areaFile=base+'BoardAreaAim.tsx';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const shells=names=>url(names.map(n=>`export const ${n}=()=>null;`).join('\n'));
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
const r=await openCombatRenderer({files:[main,areaFile,base+'TokenHud.tsx',base+'DmSquarePick.tsx'],stubs,sourceOf:file=>{
 const source=fs.readFileSync(file,'utf8');
 return file===areaFile ? source+'\nexport function AreaFixture(props) { const state=useAreaAim(props.view,props.direct,null); props.capture(state); return <output>{state.hint}</output>; }' : source;
}});
const {boardPanelErrorText,boardSquareLabel}=await import('../src/lib/i18n/board-control-presentations.ts');
const {areaFor}=await import('../src/lib/battlemap/hand-area.ts');
const wolf={id:'e',refId:'e',name:'Wolf',kind:'enemy',x:3,y:3},pc={id:'p',refId:'p',name:'Authored {name}',kind:'pc',x:1,y:1};
let text='',picked;
const actions=r.components.playerActions(pc,s=>text=s,m=>picked=m,undefined,undefined,'zh-CN');
actions.find(a=>a.id==='dodge').onPick();assert.equal(text,'我执行闪避动作。');actions.find(a=>a.id==='cast').onPick();assert.equal(picked,'cast');
const english=r.components.playerActions(pc,s=>text=s,()=>{});english.find(a=>a.id==='help').onPick();assert.equal(text,'I take the Help action for ');
let refused='';const blocked=r.components.playerActions(pc,()=>assert.fail(),()=>assert.fail(),{dash:'Authored refusal'},s=>refused=s,'zh-CN');blocked.find(a=>a.id==='dash').onPick();assert.equal(refused,'Authored refusal');
let hidden;const dm=r.components.dmActions({...wolf,hidden:true},{hold:()=>{},teleport:()=>{},visibility:value=>hidden=value,damage:()=>{},heal:()=>{},condition:()=>{},remove:()=>{}},'zh-CN');
dm.find(a=>a.id==='visibility').onPick();assert.equal(hidden,false);assert.equal(dm.find(a=>a.id==='visibility').label,'显示');assert.deepEqual(dm.map(a=>a.id),['hold','teleport','visibility','damage','condition']);
let html=r.render('TokenHud',{token:pc,boardWidth:10,boardHeight:10,footprint:1,actions,hint:'Authored hint',onClose:()=>{}},'zh-CN');assert(html.includes('Authored {name}的操作')&&html.includes('闪避')&&html.includes('Authored hint'));
const view={mapId:'map',board:'combat',width:10,height:10,terrain:'.'.repeat(100),tokens:[pc,wolf],myTokenId:'p',reachable:[11],budgetLeft:6,tokenFootprint:{},tokenHealth:{},tokenConditions:{},turn:{tokenId:'p',round:2},currentTurnName:pc.name,round:2};
let captured;const hand={source:'hand',cardId:'card',area:areaFor('Web'),pick:{}};
html=r.render('AreaFixture',{view,direct:false,capture:s=>captured=s},'zh-CN',{queues:{[areaFile]:[hand]}});assert(html.includes('蛛网术')&&html.includes('点击'));
const emitted=[],oldWindow=globalThis.window;globalThis.window={dispatchEvent:e=>emitted.push(e)};
try{assert.equal(captured.tap(2,3),true);assert.deepEqual(emitted.at(-1).detail,{cardId:'card',pick:{at:{x:2,y:3}}});
 const request={requestId:'req',role:'at',label:'Area centre, column',area:null};
 html=r.render('AreaFixture',{view,direct:true,capture:s=>captured=s},'zh-CN',{queues:{[areaFile]:[{source:'console',request}]}});assert(html.includes('区域中心所在列'));captured.tap(4,5);assert.deepEqual(emitted.at(-1).detail,{requestId:'req',square:{x:4,y:5}});
 const field={name:'atX',label:'Area centre, column',square:{role:'at',row:'atY'}};
 r.render('DmSquarePick',{requestId:'req',field,values:{atX:2,atY:3},onPick:()=>{}},'zh-CN');r.elements().find(e=>e.type==='button').props.onClick();assert.equal(emitted.at(-1).detail.label,field.label);assert.deepEqual(emitted.at(-1).detail.at,{x:2,y:3});
}finally{globalThis.window=oldWindow;}
assert.equal(boardSquareLabel('Authored {label}','zh-CN'),'Authored {label}');assert.equal(boardPanelErrorText('Name it first.','zh-CN'),'请先输入名称。');assert.equal(boardPanelErrorText('Authored engine diagnostic','zh-CN'),'Authored engine diagnostic');assert.equal(boardPanelErrorText('Give a number of hit points.','en'),'Give a number of hit points.');
const queues=()=>[false,false,'Name it first.',false,null,null,null,'handle',null,'npc','','sphere',20,null,null,null,'attack',null,null,true,null,null,false,false,'p:2',null,false,'stroke','gold',false,null,null];
let composed;html=r.render('BattleMapPanel',{campaignId:'c',view,encounter:null,sheets:[],refreshBattleMap:async()=>{},onCompose:s=>composed=s},'zh-CN',{queues:{[main]:queues()}});
assert(html.includes('第 2 轮')&&html.includes('请先输入名称。'));
r.elements().find(e=>e.type?.name==='BattleMapGrid').props.onTokenClick('e');assert.equal(composed,'我攻击狼。');assert.equal(wolf.name,'Wolf');
const q=queues();q[16]='cast';r.render('BattleMapPanel',{campaignId:'c',view,encounter:null,sheets:[],refreshBattleMap:async()=>{},onCompose:s=>composed=s},'en',{queues:{[main]:q}});r.elements().find(e=>e.type?.name==='BattleMapGrid').props.onTokenClick('e');assert.equal(composed,'I cast  at Wolf.');
const drawq=queues();drawq[16]=null;drawq[26]=true;
r.render('BattleMapPanel',{campaignId:'c',view,encounter:null,sheets:[],refreshBattleMap:async()=>{}},'zh-CN',{queues:{[main]:drawq}});
r.elements().find(e=>e.type==='button'&&e.props.children==='箭头').props.onClick();assert(r.updates().some(u=>u.file===main&&u.value==='arrow'));
r.elements().find(e=>e.type==='button'&&e.props['aria-label']==='苔绿色画笔').props.onClick();assert(r.updates().some(u=>u.file===main&&u.value==='moss'));
console.log('PASS: Chinese board/HUD/action captions, preserved default English, raw unknown diagnostics/names, canonical area events, visibility flag and target callbacks (mock stage, no real move or engine mutation).');
