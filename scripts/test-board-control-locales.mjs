// Camera/mode/notice display callbacks only; no map motion or rule resolution.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['BoardMoveModes','BoardMoveNotes','BoardPanelParts'].map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`);
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const r=await openCombatRenderer({files,stubs:{'@/app/campaigns/[campaignId]/DmInitiativePanel':url('export const DmInitiativePanel=()=>null;')}});
const {boardRulerText,boardMoveNoteText,boardDisplayName}=await import('../src/lib/i18n/board-control-presentations.ts');
const moves={jumpFeet:15,highJumpFeet:3,runningStart:true,drag:{factor:2,names:['Wolf','Authored {enemy}']}};
const original=structuredClone(moves);let selected;
let html=r.render('BoardMoveModes',{mode:'jump',moves,onMode:mode=>selected=mode},'zh-CN');assert(html.includes('步行')&&html.includes('跳跃')&&html.includes('拖拽'));
r.elements().find(e=>e.props.role==='radio'&&e.props.children==='拖拽').props.onClick();assert.equal(selected,'drag');assert.deepEqual(moves,original);
assert.equal(r.components.moveModeHint('jump',moves),'Long jump: up to 15 feet in a straight line, each foot a foot of movement. Tap where you land.');assert(r.components.moveModeHint('drag',moves,'zh-CN').includes('每格移动成本加倍'));
const input={canDirect:false,tool:'handle',teleporting:false,held:false,liveOrigin:false,pointing:false,drawing:false,targeting:false,canMove:true,scene:false,budgetLeft:3,hasToken:true};
assert.equal(r.components.boardHintText(input),'Tap a highlighted tile to move (15 ft left this turn). Tap your figure for actions.');assert(r.components.boardHintText(input,'zh-CN').includes('剩余 15 英尺'));
for(const text of ['10 ft','10 ft dragging','10 ft jump','out of reach']){assert.equal(boardRulerText(text,'en'),text);assert.notEqual(boardRulerText(text,'zh-CN'),text);}assert.equal(boardRulerText('Authored ruler','zh-CN'),'Authored ruler');
assert.equal(boardDisplayName('Wolf','zh-CN',[{name:'Wolf',kind:'pc'},{name:'Wolf',kind:'enemy'}]),'Wolf');
const names=[{name:'Wolf',kind:'enemy'},{name:'阿明',kind:'pc'}];
for(const source of [
 'Jumped 15 feet and landed prone (Acrobatics 8 against DC 10 in difficult terrain). A high jump reaches 3 feet.',
 'Wolf gets no opportunity attack on 阿明: Mobile (attacked in melee this turn).',
 'Wolf takes an opportunity attack as 阿明 pulls away and misses (7 vs AC 15).',
 'Wolf takes an opportunity attack as 阿明 pulls away: hit for 3 damage (cold). 阿明 is prone.',
 '阿明 fails the DEX save against Web (DC 13).',
 'Evasion: 阿明 takes no damage.',
 '阿明 takes 3 piercing damage from moving through Spike Growth.',
 'It is held fast at (2,3).',
 '阿明 is pushed to (2,3).',
 '阿明 loses their concentration on Bless.',
 ]){assert.equal(boardMoveNoteText(source,'en',names),source);assert.notEqual(boardMoveNoteText(source,'zh-CN',names),source);}
assert.equal(boardMoveNoteText('Authored note {raw}.','zh-CN',names),'Authored note {raw}.');assert.equal(boardMoveNoteText('Evasion: 阿明 takes half damage.','zh-CN',names),'闪避：阿明仅受一半伤害。');
html=r.render('BoardMoveNotes',{notes:[{id:1,tone:'move',text:'Jumped 15 feet and landed on their feet.'}],names},'zh-CN');assert(html.includes('跳跃 15 英尺')&&html.includes('站稳'));
const calls=[],cp={onZoomIn:()=>calls.push('in'),onZoomOut:()=>calls.push('out'),onFit:()=>calls.push('fit'),followTurn:true,onFollowTurn:()=>calls.push('follow'),onDirect:mode=>calls.push(mode)};
r.render('BoardCameraControls',cp,'zh-CN');for(const label of ['放大','缩小','显示整张地图','跟随当前回合','将全桌视野拉到当前画面','将全桌视野锁定到当前画面','解除全桌视野锁定'])r.elements().find(e=>e.props['aria-label']===label).props.onClick();assert.deepEqual(calls,['in','out','fit','follow','pull','lock','free']);
const encounter={orderReady:true,turnIndex:0,order:[{id:'pc',name:'Wolf',kind:'pc'},{id:'enemy',name:'Wolf',kind:'enemy',reflex:true}]};
html=r.render('BoardOrderStrip',{encounter,faceOf:()=>[]},'zh-CN');assert(html.includes('Wolf')&&html.includes('狼')&&html.includes('第二次'));assert.equal(encounter.order[1].name,'Wolf');
console.log('PASS: localized board mode/camera/order/ruler and native move notices, unchanged raw names/costs/commands, canonical mode/camera callbacks and protected PC names (display only, no real move).');
