// Palette/options/search/help presentation only; mock transport, no map/keyboard engine mutation.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const base='src/app/campaigns/[campaignId]/',files=['MapTools','MapOptions','StampPicker'].map(x=>base+x+'.tsx').concat('src/components/ui/HotkeyOverlay.tsx');
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64'),stubs={
 '@/lib/image-encode':url('export const encodeImageForUpload=async()=>({dataUrl:"data:mock",type:"image/png"});'),
 '@/app/campaigns/[campaignId]/MapToolbox':url('export * from '+JSON.stringify(new URL('../src/app/campaigns/[campaignId]/mapToolState.ts',import.meta.url).href)+';'),
};
const r=await openCombatRenderer({files,stubs}),before=await openCombatRenderer({files,stubs,sourceOf:file=>files.includes(file)?execFileSync('git',['show',`75b00666:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8')});
const {DEFAULT_MAP_TOOLS,LIBRARY_CAPS,BRUSH_KEYS,mapHotkeyGroups}=await import('../src/app/campaigns/[campaignId]/mapToolState.ts');
const {BRUSHES}=await import('../src/lib/battlemap/paint.ts'),{STAMPS}=await import('../src/lib/battlemap/stamp.ts');
const {DEFAULT_BACKDROP_TRANSFORM}=await import('../src/lib/battlemap/backdrop.ts');
const {localizedStampGroups,localizedMapHotkeyGroups,mapBrushEffect}=await import('../src/lib/i18n/map-editor-presentations.ts');
const {messageScope}=await import('../src/lib/i18n/resource-scope.ts');
const no=()=>{},objects=[{id:'barrel-a',label:'Authored Barrel {label}',src:'/objects/a.png',sets:['tavern']},{id:'custom-b',label:'自定义物件',src:'/objects/b.png',sets:['custom-set']}],original=structuredClone(objects);
const backdrop={path:'/uploads/backdrop.png',transform:{...DEFAULT_BACKDROP_TRANSFORM,offsetX:1,offsetY:2,scale:1.2}},groups=mapHotkeyGroups(LIBRARY_CAPS);
for(const [name,props] of [
 ['BrushPalette',{brush:'climb',radius:1,onRadius:no,onPick:no}],['BrushPalette',{brush:'',onPick:no}],
 ['StampPalette',{stamp:'room',size:{width:5,height:4},onPick:no,onResize:no}],['StampPalette',{stamp:'',size:{width:5,height:4},onPick:no,onResize:no}],
 ['BackdropControls',{backdrop,onChange:no}],['StampPicker',{objects,ownSets:['tavern'],value:'barrel-a',onPick:no}],
 ['MapOptions',{tools:{...DEFAULT_MAP_TOOLS,mode:'brush'},caps:LIBRARY_CAPS,onTools:no}],
 ['HotkeyOverlay',{open:false,onOpenChange:no,groups}],
 ])assert.equal(r.render(name,props,'en'),before.render(name,props,'en'),name+' English display preserved');
const options={tools:DEFAULT_MAP_TOOLS,caps:LIBRARY_CAPS,onTools:no};assert(before.render('MapOptions',options,'en').includes('Keys 1 to 6'));assert(r.render('MapOptions',options,'en').includes('Keys 1 to 7'));assert.equal(Object.keys(BRUSH_KEYS).length,7);
for(const brush of BRUSHES)assert.notEqual(mapBrushEffect(brush,'zh-CN'),mapBrushEffect(brush,'en'));
for(const stamp of STAMPS)assert(r.render('StampPalette',{stamp,size:{width:5,height:4},onPick:no,onResize:no},'zh-CN').includes('英尺'));
let picked,radius;let html=r.render('BrushPalette',{brush:'wall',radius:1,onPick:value=>picked=value,onRadius:value=>radius=value},'zh-CN');assert(html.includes('困难地形')&&html.includes('笔触'));r.elements().find(e=>e.type==='button'&&e.props.title.startsWith('经过时消耗双倍移动距离。')&&e.props.title.includes('（3）')).props.onClick();assert.equal(picked,'water');r.elements().find(e=>e.props['aria-label']==='5 × 5 格').props.onClick();assert.equal(radius,2);
let size;r.render('StampPalette',{stamp:'room',size:{width:5,height:4},onPick:value=>picked=value,onResize:value=>size=value},'zh-CN');r.elements().find(e=>e.props.label==='宽度').props.onChange(7);assert.deepEqual(size,{width:7,height:4});r.elements().find(e=>e.type==='button'&&e.props.title==='普通地面，四周绘制围墙。').props.onClick();assert.equal(picked,'');
let changed;r.render('MapOptions',{tools:{...DEFAULT_MAP_TOOLS,mode:'brush'},caps:LIBRARY_CAPS,onTools:value=>changed=value},'zh-CN');r.elements().find(e=>e.props.onPick&&e.props.brush==='wall').props.onPick('climb');assert.equal(changed.brush,'climb');assert.equal(changed.mode,'brush');
const found=localizedStampGroups(objects,['tavern'],'酒馆','zh-CN');assert.equal(found.length,1);assert.equal(found[0].set,'tavern');assert.equal(found[0].label,'酒馆');assert.equal(found[0].objects[0],objects[0]);assert.equal(localizedStampGroups(objects,[],'自定义','zh-CN')[0].objects[0],objects[1]);
html=r.render('StampPicker',{objects,ownSets:['tavern'],value:undefined,onPick:value=>picked=value},'zh-CN',{queues:{[files[2]]:['酒馆',{}]}});assert(html.includes('酒馆'));r.elements().find(e=>e.type==='button'&&e.props.title==='Authored Barrel {label}').props.onClick();assert.equal(picked,objects[0]);assert.deepEqual(objects,original);
const beforeGroups=structuredClone(groups),zhGroups=localizedMapHotkeyGroups(groups,'zh-CN');assert.equal(zhGroups[0].title,'工具');assert.deepEqual(zhGroups.map(g=>g.rows.map(row=>row.keys)),groups.map(g=>g.rows.map(row=>row.keys)));assert.deepEqual(groups,beforeGroups);assert(zhGroups[1].rows.some(row=>row.keys[0]==='7'&&row.does==='攀爬地形'));assert.equal(messageScope('hotkeyUi.title'),'ui');assert.equal(messageScope('mapEditorUi.options.keys'),'content');
const originalFetch=globalThis.fetch;let request;
globalThis.fetch=async(path,options)=>{request={path,method:options.method,body:JSON.parse(options.body)};return {ok:true,json:async()=>({url:'/uploads/new.png'})};};
try{
 r.render('BackdropControls',{backdrop,onChange:value=>changed=value},'zh-CN');r.elements().find(e=>e.props.label==='水平偏移').props.onChange(3.5);assert.deepEqual(changed,{path:backdrop.path,transform:{...backdrop.transform,offsetX:3.5}});const input=r.elements().find(e=>e.type==='input'&&e.props.type==='file');input.props.onChange({target:{files:[{name:'Authored.png'}],value:'file'}});await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(request,{path:'/api/upload',method:'POST',body:{dataUrl:'data:mock',name:'Authored.png',type:'image/png'}});assert.deepEqual(changed,{path:'/uploads/new.png',transform:backdrop.transform});
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: editor palettes/options/backdrop/stamp search/help, eight preserved English renders plus corrected 1–7 hint, all native brush/stamp references, Chinese set search with raw assets, canonical callbacks/transforms/IDs and unchanged key groups (mock transport).');
