// English comparison uses the pre-batch 51a839a6 checkpoint, never current HEAD.
// Presentational checks only: no real clipboard, map mutation, rule resolution or animation.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const base='src/app/campaigns/[campaignId]/',files=['DmBoardControls','BoardIntent','BoardStage','BattleMapGrid'].map(n=>base+n+'.tsx');
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const stubs={'@/app/campaigns/[campaignId]/BoardFx':url('export const FxLayer=()=>null;export const useFxPlayer=()=>[];'),'@/components/ParticleCanvas':url('export const ParticleCanvas=()=>null;'),'@/components/ui/HostSvgImage':url('export const HostSvgImage=()=>null;'),'@/app/campaigns/[campaignId]/BoardChrome':url('export const TokenFace=()=>null;')};
const r=await openCombatRenderer({files,stubs});
const before=await openCombatRenderer({files,stubs,sourceOf:file=>files.includes(file)?execFileSync('git',['show',`51a839a6:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8')});
const {boardCaughtName,boardIntentSentence,boardTokenTitle}=await import('../src/lib/i18n/board-tool-presentations.ts');
const wolf={id:'e',refId:'e',kind:'enemy',name:'Wolf',x:2,y:2},pc={id:'p',refId:'p',kind:'pc',name:'Wolf',x:4,y:2};
const no=()=>{},caught=[{enemyId:'e',name:'Wolf'},{characterId:'p',name:'Wolf'},{enemyId:'e2',name:'Authored {name}'}],original=structuredClone(caught);
const measure={shape:'sphere',sizeFeet:20,caught,onShape:no,onSize:no,onClear:no};
const intent={actorTokenId:'e',targetTokenId:'p',verbKind:'spell',verb:'Web',source:'likely',round:2};
const intents={tokens:[wolf,pc],intents:[intent],footprints:{},boardWidth:10,boardHeight:10,round:2,faceOf:()=>[]};
const figure={token:wolf,footprint:1,health:'scratched',conditions:[{id:'poisoned',label:'poisoned',rounds:2,note:'Authored {note}'}],clickable:true};
for(const [name,props,options] of [
 ['BoardToolRail',{tool:'measure',onTool:no,disabled:false}],
 ['PlaceTokenForm',{kind:'npc',name:'',onKind:no,onName:no}],
 ['PlaceTokenForm',{kind:'prop',name:'Authored {name}',onKind:no,onName:no}],
 ['MeasureControls',measure],
 ['TokenCard',{token:{...wolf,hidden:true},hp:{current:3,max:12},held:true,busy:false,onHold:no,onVisibility:no,onRemove:no,onClose:no}],
 ['IntentLayer',intents,{queues:{[base+'BoardIntent.tsx']:['e']}}],
 ['TokenFigure',figure],
 ])assert.equal(r.render(name,props,'en',options),before.render(name,props,'en',options),name+' English render preserved');
let chosen;let html=r.render('BoardToolRail',{tool:'measure',onTool:x=>chosen=x,disabled:false},'zh-CN');assert(html.includes('测量区域'));r.elements().find(e=>e.type==='button'&&e.props.title==='放置棋子').props.onClick();assert.equal(chosen,'place');
let named;r.render('PlaceTokenForm',{kind:'npc',name:'Authored {name}',onKind:x=>chosen=x,onName:x=>named=x},'zh-CN');r.elements().find(e=>e.type==='button'&&e.props.children==='物件').props.onClick();assert.equal(chosen,'prop');r.elements().find(e=>e.type==='input').props.onChange({target:{value:'自创 {name}'}});assert.equal(named,'自创 {name}');
let shape,feet,cleared=false;html=r.render('MeasureControls',{...measure,onShape:x=>shape=x,onSize:x=>feet=x,onClear:()=>cleared=true},'zh-CN');assert(html.includes('影响目标：狼、Wolf、Authored {name}')&&html.includes('半径')&&html.includes('20 英尺'));
r.elements().find(e=>e.type==='button'&&e.props.children==='锥形').props.onClick();assert.equal(shape,'cone');
const slider=r.elements().find(e=>e.props.label==='范围半径（英尺）');assert.deepEqual([slider.props.min,slider.props.max,slider.props.step,slider.props.value],[5,60,5,20]);slider.props.onChange(35);assert.equal(feet,35);assert.equal(slider.props.bubble(35),'35 英尺');
r.elements().find(e=>e.type==='button'&&e.props.children==='清除测量').props.onClick();assert(cleared);
let clipboard;const previous=Object.getOwnPropertyDescriptor(globalThis,'navigator');Object.defineProperty(globalThis,'navigator',{configurable:true,value:{clipboard:{writeText:value=>{clipboard=value;}}}});
try{r.elements().find(e=>e.type==='button'&&e.props.children==='复制敌人 ID').props.onClick();assert.equal(clipboard,'e, e2');}finally{if(previous)Object.defineProperty(globalThis,'navigator',previous);else delete globalThis.navigator;}
assert.deepEqual(caught,original);assert.equal(boardCaughtName({name:'Wolf',enemyId:'e',characterId:'p'},'zh-CN'),'Wolf');
let hidden;html=r.render('TokenCard',{token:{...wolf,hidden:true},hp:{current:3,max:12},held:true,busy:false,onHold:no,onVisibility:x=>hidden=x,onRemove:no,onClose:no},'zh-CN');assert(html.includes('生命值 3 / 12')&&html.includes('对队伍隐藏'));r.elements().find(e=>e.type==='button'&&e.props.children.at?.(-1)==='显示').props.onClick();assert.equal(hidden,false);
assert.equal(boardIntentSentence(intent,wolf,pc,'zh-CN'),'狼可能会：蛛网术（目标：Wolf）');html=r.render('IntentLayer',intents,'zh-CN',{queues:{[base+'BoardIntent.tsx']:['e']}});assert(html.includes('狼可能会：蛛网术（目标：Wolf）'));r.elements().find(e=>e.type==='button').props.onFocus();assert(r.updates().some(u=>u.value==='e'));assert.equal(intent.verb,'Web');
assert.equal(r.render('IntentLayer',{...intents,tokens:[wolf]},'zh-CN'),'');
html=r.render('TokenFigure',figure,'zh-CN');assert(html.includes('狼 · 轻伤 · 中毒')&&html.includes('Authored {note}')&&html.includes('data-token-id="e"'));assert.equal(boardTokenTitle(pc,'scratched',figure.conditions).startsWith('Wolf · Scratched'),true);
const gridView={mapId:'map',board:'scene',theme:'field',width:2,height:2,terrain:'....',visible:[0,1,2,3],explored:[0,1,2,3],reachable:[],tokens:[],currentTurnName:'',tokenFootprint:{},tokenHealth:{},tokenConditions:{},tokenElevation:{},tokenAuras:{},targets:[],drawings:[],labels:[],lights:[],spellZones:[],doors:{'0,0':'locked','1,0':'stuck'}};
html=r.render('BattleMapGrid',{view:gridView,sheets:[]},'zh-CN');assert(html.includes('aria-label="战斗地图"')&&html.includes('门已上锁')&&html.includes('门已卡住'));assert(r.elements().some(e=>e.type==='text'&&e.props.children==='锁')&&r.elements().some(e=>e.type==='text'&&e.props.children==='卡'));assert.deepEqual(gridView.doors,{'0,0':'locked','1,0':'stuck'});
html=r.render('BattleMapGrid',{view:gridView,sheets:[]},'en');assert(r.elements().some(e=>e.type==='text'&&e.props.children==='L')&&r.elements().some(e=>e.type==='text'&&e.props.children==='S'));
console.log('PASS: board tools/measure/place/intent/figure/door captions, seven unchanged English renders, protected PC/custom names, canonical clipboard IDs/shape/size/visibility callbacks and projected intent filtering (display only).');
