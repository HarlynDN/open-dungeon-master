// One grouped canvas/controls check; mock drawing context, no image snapshots.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {uiLiterals} from './lib/ui-localization.mjs';
const {drawBackdropHandles,drawScene}=await import('../src/app/campaigns/[campaignId]/terrainDraw.ts');
const {saveOverworldPng}=await import('../src/app/campaigns/[campaignId]/overworldDraw.ts');
const {createTranslator}=await import('../src/lib/i18n/translator.ts');
const {regionErrorText}=await import('../src/lib/i18n/region-presentations.ts');
function canvas(){const calls=[];const context=new Proxy({}, {get:(_target,key)=> (...args)=>calls.push([key,...args]),set:()=>true});return{context,calls};}
const rect={x:3,y:4,width:327.5,height:240},legacy=canvas();
drawBackdropHandles(legacy.context,rect,10);
assert.deepEqual(legacy.calls.find(row=>row[0]==='fillText'),['fillText','one square is 32.8 px of picture',8,17]);
for(const locale of ['en','zh-CN']){
 const t=createTranslator(locale),paint=canvas();
 drawBackdropHandles(paint.context,rect,10,pixels=>t('mapEditorUi.backdrop.pixels',{pixels}));
 assert.deepEqual(paint.calls.filter(row=>row[0]!=='fillText'),legacy.calls.filter(row=>row[0]!=='fillText'));
 if(locale==='en')assert.deepEqual(paint.calls,legacy.calls);
 else assert.equal(paint.calls.find(row=>row[0]==='fillText')[1],'每格对应 32.8 像素底图');
}
const scene={labels:[{x:1,y:1,text:'自订地名 {name}',dmOnly:true}],props:[{x:2,y:1,name:'Authored NPC {name}',kind:'npc'},{x:3,y:1,name:'自订物件',kind:'crate'}],doors:{'0,0':'locked'}};
const raw=JSON.stringify(scene),drawn=canvas();drawScene(drawn.context,scene,{width:5,height:5,tile:32,backdrop:null});
for(const label of [scene.labels[0].text,...scene.props.map(prop=>prop.name)])assert(drawn.calls.some(row=>row[0]==='fillText'&&row[1]===label));
assert.equal(JSON.stringify(scene),raw);
const oldDocument=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>null})};
try{const failure=await saveOverworldPng({map:{width:4,height:4}},{genre:'high_fantasy'});assert.equal(failure,'The map would not render.');assert.equal(regionErrorText(failure,'en'),failure);assert.equal(regionErrorText(failure,'zh-CN'),'未能生成地图图片。');}finally{globalThis.document=oldDocument;}
assert(uiLiterals('example.ts','ctx.fillText("Plain canvas caption", 0, 0)').some(row=>row.kind==='Canvas text'));
assert(uiLiterals('example.ts','ctx.strokeText(`Caption ${value}`, 0, 0)').some(row=>row.kind==='Canvas text'));
assert.equal(uiLiterals('example.ts','ctx.fillText(t("mapEditorUi.backdrop.pixels", { pixels }), 0, 0)').length,0);
assert.equal(uiLiterals('example.ts','ctx.fillText(authoredLabel, 0, 0); ctx.fillText("●", 0, 0)').length,0);
const r=await openCombatRenderer({files:['src/app/campaigns/[campaignId]/mapUi.tsx','src/app/campaigns/[campaignId]/terrainCanvasParts.tsx']});
let changes=0;const click=()=>changes++,icon=()=>null;
for(const locale of ['en','zh-CN']){
 const caption=locale==='en'?'Fit map':'适应地图';
 const button=r.render('ZoomButton',{label:caption,icon,onClick:click},locale);assert(button.includes(`aria-label="${caption}"`));r.elements().find(e=>e.type==='button').props.onClick();
 const range=r.render('RangeRow',{label:caption,value:42,min:1,max:100,readout:'42%',onChange:value=>assert.equal(value,43)},locale);assert(range.includes(caption));
 r.elements().find(e=>e.props.onChange&&e.props.value===42).props.onChange(43);
 const ants=r.render('SelectionAnts',{boxes:[{x0:1,y0:2,x1:3,y1:4}],width:10,height:10},locale);assert(ants.includes('width="3"'));
}
assert.equal(changes,2);
console.log('PASS: bilingual actual backdrop drawing with exact legacy English/geometry parity, authored scene labels and source data unchanged, native export error localization, Canvas literal scanner, pass-through control labels/callbacks and selection geometry.');
