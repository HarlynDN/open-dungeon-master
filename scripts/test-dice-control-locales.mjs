// Device/roll UI only: fake Bluetooth and transport, no real dice or rolls.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['DiceTrayDialog','DiceSourcesDialog'].map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`),[trayFile,sourceFile]=files;
const state={sources:{20:'pixel:offline'},pixels:[{systemId:'p6',name:'自定 {骰子}',faceCount:6}],supported:true,choices:[],hardware:[],failure:null},token='odm-dice-controls-'+Math.random();globalThis[token]=state;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const sourceModule=new URL('../src/lib/dice/dice-sources.ts',import.meta.url).href;
const r=await openCombatRenderer({files,sourceOf:file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')+(file===trayFile?'\nexport {ResultRow};':'')+(file===sourceFile?'\nexport {SourceRow};':''),stubs:{
 '@/lib/dice/dice-sources':url(`export {DIE_SIDES,pixelSource,pixelSystemId} from ${JSON.stringify(sourceModule)};export const useDiceSources=()=>{const s=globalThis[${JSON.stringify(token)}];return [s.sources,(sides,value)=>s.choices.push({sides,value})];};`),
 '@/lib/dice/pixels-dice':url(`const s=globalThis[${JSON.stringify(token)}];export const getConnectedPixels=()=>s.pixels;export const getConnectedPixelsServer=getConnectedPixels;export const onPixelsChanged=()=>()=>{};export const isWebBluetoothAvailable=()=>s.supported;export const connectNewPixel=async()=>{s.hardware.push('connect');if(s.failure)throw s.failure;};export const reconnectPixel=async()=>null;export const disconnectPixel=async id=>s.hardware.push(['disconnect',id]);export const identifyPixel=async id=>s.hardware.push(['identify',id]);`),
}});
const {diceAudienceText,diceTrayText,diceConnectionFailure,diceConnectionText}=await import('../src/lib/i18n/dice-control-presentations.ts');
const {pixelChooserFailure}=await import("../src/lib/dice/pixel-chooser-errors.ts");
const {messageScope}=await import('../src/lib/i18n/resource-scope.ts');
const q=(file,v)=>({queues:{[file]:v}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
assert.equal(messageScope('diceSourceUi.title'),'ui','standalone settings require global UI resources');assert.equal(messageScope('diceTrayUi.title'),'content');
for(const seat of [{dmSeat:true,steersStory:true,aiTable:false},{dmSeat:false,steersStory:true,aiTable:true},{dmSeat:false,steersStory:false,aiTable:true},{dmSeat:false,steersStory:false,aiTable:false}]){
 const source=r.components.secretAudience(seat);assert.equal(diceAudienceText(source,'en'),source);assert.notEqual(diceAudienceText(source,'zh-CN'),source);
}
assert.equal(diceTrayText('Invalid dice expression: {expression}','zh-CN'),'骰子表达式无效：{expression}');
assert.equal(diceAudienceText('Authored audience','zh-CN'),'Authored audience');assert.equal(diceTrayText('Invalid dice term: 2d6+','zh-CN'),'骰子项无效：2d6+');assert.equal(diceTrayText('Authored diagnostic','zh-CN'),'Authored diagnostic');
assert.equal(diceConnectionFailure(pixelChooserFailure({name:'NotFoundError',message:'用户取消了选择'})),null);assert.equal(diceConnectionFailure(pixelChooserFailure({name:'AbortError',message:'已中止'})),null);
assert(diceConnectionFailure({name:'NotFoundError',message:'Service missing'}),'a connection-phase NotFoundError remains visible');
assert(diceConnectionText({name:'SecurityError',message:'Native detail'},'zh-CN').includes('浏览器限制')&&diceConnectionText({name:'SecurityError',message:'Native detail'},'zh-CN').includes('Native detail'));
const roll={id:'roll-id',expression:'1d20',total:20,breakdown:{crit:'nat20',terms:[{kind:'dice',sign:1,dice:[{value:20}]}]}};
let html=r.render('ResultRow',{result:{roll,secret:true},fresh:true},'zh-CN');assert(html.includes('天然 20')&&html.includes('秘密')&&html.includes('1d20'));
html=r.render('DiceSourcesPanel',{},'zh-CN');assert(html.includes('蓝牙骰子')&&html.includes('自定 {骰子}'));
const rows=r.elements().filter(e=>e.props.options?.some(o=>o.value==='digital'));assert(rows.some(e=>e.props.options.some(o=>o.value==='pixel:offline'&&o.label.includes('离线'))));rows.find(e=>e.props.label==='d6 的来源').props.onChange('pixel:p6');assert.deepEqual(state.choices.pop(),{sides:6,value:'pixel:p6'});
r.elements().find(e=>e.props.title==='让此骰子闪烁以便辨认').props.onClick();r.elements().find(e=>e.props.title==='移除此骰子').props.onClick();assert.deepEqual(state.hardware.splice(0),[['identify','p6'],['disconnect','p6']]);
state.failure=pixelChooserFailure({name:'NotFoundError',message:'用户取消'});r.render('DiceSourcesPanel',{},'zh-CN');await r.elements().find(e=>e.type==='button'&&e.props.children?.some?.(c=>c==='连接 Pixels 骰子')).props.onClick();assert(!r.updates().some(u=>u.at===1&&u.value));
state.supported=false;html=r.render('DiceSourcesPanel',{},'zh-CN');assert(html.includes('手动输入')&&html.includes('chrome://flags/#enable-web-bluetooth'));state.supported=true;
const oldFetch=globalThis.fetch,calls=[];let mode='ok';globalThis.fetch=async(url,init)=>{calls.push({url,body:JSON.parse(init.body)});return new Response(JSON.stringify(mode==='refuse'?{error:'Invalid dice expression: 2d6+'}:{roll}),{status:mode==='refuse'?400:201});};
try{
 const props={open:true,onOpenChange:()=>{},campaignId:'c',audience:r.components.secretAudience({dmSeat:false,steersStory:true,aiTable:true})};
 r.render('DiceTrayDialog',props,'zh-CN',q(trayFile,[{dice:{6:2},bonus:3},null,true,false,'',[]]));r.elements().find(e=>e.type==='button'&&e.props.className?.includes('dice-tray-roll')).props.onClick();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/rolls',body:{expression:'2d6+3',secret:true}});
 const update=r.updates().find(u=>u.at===5);assert.equal(update.value([])[0].secret,true);assert.equal(update.value([])[0].roll.id,'roll-id');
 mode='refuse';r.render('DiceTrayDialog',props,'zh-CN',q(trayFile,[{dice:{},bonus:0},'2d6+',false,false,'',[]]));r.elements().find(e=>e.type==='button'&&e.props.className?.includes('dice-tray-roll')).props.onClick();await tick();assert(r.updates().some(u=>u.at===4&&u.value==='Invalid dice expression: 2d6+'));assert(!r.updates().some(u=>u.at===5));
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: localized tray/source UI with global settings resources, unchanged audiences/expressions/source and device IDs, Unicode cancellation handling and canonical secret-roll requests/refusals (fake device/transport only).');
