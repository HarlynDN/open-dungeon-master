// Region presentation/operation callbacks with mock transport and no canvas/model mutation.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const base='src/app/campaigns/[campaignId]/',toolsFile=base+'OverworldTools.tsx',authorFile=base+'OverworldAuthoring.tsx',panelFile=base+'OverworldPanel.tsx';
const files=[toolsFile,authorFile,panelFile],url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const stubs={
 '@/lib/image-encode':url('export const encodeImageForUpload=async file=>({dataUrl:"data:mock",type:"image/png"});'),
 '@/lib/use-capabilities':url('export const useCapabilities=()=>null;export const offersStoryModel=()=>true;'),
 '@/components/DictateField':url('export const DictateField=({children})=>children;'),
 '@/app/campaigns/[campaignId]/useOverworldView':url('export const useOverworldView=()=>({view:{x:0,y:0,zoom:1},fit:()=>{},down:()=>{},move:()=>{},up:()=>{},zoomBy:()=>{}});'),
};
const r=await openCombatRenderer({files,stubs});
const old=await openCombatRenderer({files,stubs,sourceOf:file=>files.includes(file)?execFileSync('git',['show',`a90de75a:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8')});
const {skinForGenre,DEFAULT_OVERWORLD_PARAMS}=await import('../src/lib/overworld/logic.ts');
const {regionImportNote,regionErrorText,regionTerrainLabel,regionSizeLabel,REGION_FAILURES}=await import('../src/lib/i18n/region-presentations.ts');
const skin=skinForGenre('dark_fantasy'),data={map:{seed:1,width:96,height:72,terrain:'p',pins:[],partyXy:null,params:DEFAULT_OVERWORLD_PARAMS,paths:[],labels:[],backdropPath:'',notes:'Authored {notes}'},locations:[]};
const no=()=>{},modes={mode:'paint',onMode:no,partyPlaced:true,onPartyTransit:no,pinsCount:2,onClearPins:no,regenBusy:false,onRegenerate:no};
const paint={skin,brush:'water',onBrush:no,radius:1,onRadius:no,stranded:[{id:'l',name:'Authored {place}'}],undo:{canUndo:true,canRedo:false,onUndo:no,onRedo:no}};
const line={kind:'road',onKind:no,pendingCount:2,label:'Authored {road}',onLabel:no,onFinish:no,onUndo:no,onCancel:no};
const report={cells:4,places:1,routes:2,rivers:3,width:48,height:36},raw='Read 4 cells into a 48 by 36 map, with 1 places, 2 roads and 3 rivers.';
const fileProps={backdropPath:'/uploads/map.png',onBackdrop:no,onExport:no,exporting:false,onImport:no,importing:false,importNote:raw,importReport:report,mapSize:{width:96,height:72}};
const authorProps={campaignId:'c',data,onData:no},authorQueue=patch=>{const q=[true,'Authored description',null,DEFAULT_OVERWORLD_PARAMS,data.map.notes,{width:96,height:72},'Authored place','Authored blurb',false,''];for(const [index,value]of Object.entries(patch??{}))q[index]=value;return {queues:{[authorFile]:q}};};
for(const [name,props,options]of [
 ['ModeBar',modes],['TileLegend',{skin}],['PaintTools',paint],['LineTools',line],['LabelTools',{size:'large',onSize:no}],['FileTools',fileProps],
 ['OverworldAuthoring',authorProps,authorQueue()],['OverworldAuthoring',authorProps,authorQueue({2:{params:DEFAULT_OVERWORLD_PARAMS,places:[{name:'Authored {place}',blurb:'Authored blurb'}],note:'Authored plan'}})],
 ['OverworldPanel',{campaignId:'c',genre:'dark_fantasy',steersStory:true}],
 ])assert.equal(r.render(name,props,'en',options),old.render(name,props,'en',options),name+' English display preserved');
for(const ask of [null,{kind:'rename',locationId:'l'},{kind:'label',at:{x:1,y:2}},{kind:'pin',at:{x:1,y:2}}])assert.deepEqual(r.components.askCopy(ask,'large','Authored {place}'),old.components.askCopy(ask,'large','Authored {place}'));
assert.equal(r.components.askCopy({kind:'rename',locationId:'l'},'large','Authored {place}','zh-CN').defaultValue,'Authored {place}');assert.equal(r.components.askCopy(null,'small','','zh-CN').allowEmpty,true);
let mode;let html=r.render('ModeBar',{...modes,onMode:value=>mode=value},'zh-CN');assert(html.includes('绘制线路')&&html.includes('点击地图'));r.elements().find(e=>e.type==='button'&&e.props.children.at(-1)==='添加标记').props.onClick();assert.equal(mode,'pin');
let brush,radius;html=r.render('PaintTools',{...paint,onBrush:value=>brush=value,onRadius:value=>radius=value},'zh-CN');assert(html.includes('海洋与湖泊')&&html.includes('Authored {place}')&&html.includes('水域'));r.elements().find(e=>e.type==='button'&&e.props.children.at(-1)==='森林').props.onClick();assert.equal(brush,'forest');const paintSlider=r.elements().find(e=>e.props.label==='画笔大小');paintSlider.props.onChange(2);assert.equal(radius,2);assert.equal(paintSlider.props.min,0);
let kind,label;html=r.render('LineTools',{...line,onKind:value=>kind=value,onLabel:value=>label=value,pendingCount:0},'zh-CN');assert(html.includes('为道路命名'));r.elements().find(e=>e.type==='button'&&e.props.children==='河流').props.onClick();assert.equal(kind,'river');r.elements().find(e=>e.type==='input').props.onChange({target:{value:'自创 {label}'}});assert.equal(label,'自创 {label}');
assert.equal(regionTerrainLabel('Unknown authored terrain','zh-CN'),'Unknown authored terrain');assert.equal(regionSizeLabel({width:19,height:23},'zh-CN'),'19 × 23');assert.equal(regionImportNote('Authored report','zh-CN'),'Authored report');assert(regionImportNote(raw,'zh-CN',report).includes('4 个地形格'));assert.equal(regionErrorText('Opaque diagnostic','zh-CN','regionUi.error.upload'),'未能上传图片。');assert.equal(regionErrorText('Opaque diagnostic','en'),'Opaque diagnostic');
const originalFetch=globalThis.fetch,calls=[];let backdrop,imported,nextData;
globalThis.fetch=async(path,options)=>{calls.push({path,method:options.method,body:JSON.parse(options.body)});return {ok:true,json:async()=>path==='/api/upload'?{url:'/uploads/new.png'}:path.endsWith('/import')?{...data,summary:{cells:4,places:1,routes:2,rivers:3}}:path.endsWith('/describe')?{plan:{params:DEFAULT_OVERWORLD_PARAMS,places:[],note:'模型建议'}}:{...data}};};
const flush=()=>new Promise(resolve=>setImmediate(resolve));
try{
 r.render('FileTools',{...fileProps,onBackdrop:value=>backdrop=value,onImport:(texts,size)=>imported={texts,size}},'zh-CN');const inputs=r.elements().filter(e=>e.type==='input'&&e.props.type==='file');inputs[0].props.onChange({target:{files:[{name:'Authored.png'}],value:'file'}});await flush();assert.equal(backdrop,'/uploads/new.png');assert.deepEqual(calls.at(-1),{path:'/api/upload',method:'POST',body:{dataUrl:'data:mock',name:'Authored.png',type:'image/png'}});
 inputs[1].props.onChange({target:{files:[{text:async()=>'{"raw":"GeoJSON"}'}],value:'file'}});await flush();assert.deepEqual(imported,{texts:['{"raw":"GeoJSON"}'],size:{width:96,height:72}});
 inputs[1].props.onChange({target:{files:[{text:async()=>{throw new Error('read');}}],value:'file'}});await flush();assert(r.updates().some(u=>u.file===toolsFile&&u.value===REGION_FAILURES.files));
 const out=await r.components.importAzgaarFiles('c',['{"raw":1}'],{width:48,height:36});assert.deepEqual(calls.at(-1).body,{files:['{"raw":1}'],width:48,height:36});assert.equal(out.data.summary,undefined);assert.deepEqual(out.report,{cells:4,places:1,routes:2,rivers:3,width:96,height:72});assert.equal(out.note,'Read 4 cells into a 96 by 72 map, with 1 places, 2 roads and 3 rivers.');
 r.render('OverworldAuthoring',{...authorProps,onData:value=>nextData=value},'zh-CN',authorQueue());r.elements().find(e=>e.type==='button'&&e.props.children==='添加到地图').props.onClick();await flush();assert.deepEqual(calls.at(-1),{path:'/api/campaigns/c/overworld',method:'PATCH',body:{places:[{name:'Authored place',blurb:'Authored blurb'}]}});assert.equal(nextData.map.seed,1);
 r.render('OverworldAuthoring',authorProps,'zh-CN',authorQueue());const parameter=r.elements().find(e=>e.props.label==='海平面');parameter.props.onChange(35);assert(r.updates().some(u=>u.file===authorFile&&u.at===3&&u.value.seaLevel===0.35));
 r.elements().find(e=>e.type==='button'&&e.props.children.at?.(-1)==='从描述生成地形参数').props.onClick();await flush();assert.deepEqual(calls.at(-1).body,{description:'Authored description'});assert(r.updates().some(u=>u.file===authorFile&&u.at===2&&u.value?.note==='模型建议'));assert(!r.updates().some(u=>u.file===authorFile&&u.value===REGION_FAILURES.network));
 globalThis.fetch=async()=>{throw new Error('offline');};r.render('OverworldAuthoring',authorProps,'zh-CN',authorQueue());r.elements().find(e=>e.type==='button'&&e.props.children==='添加到地图').props.onClick();await flush();assert(r.updates().some(u=>u.file===authorFile&&u.value===REGION_FAILURES.network));assert(r.updates().some(u=>u.file===authorFile&&u.at===8&&u.value===false));assert(!r.updates().some(u=>u.file===authorFile&&u.at===6&&u.value===''));
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: region tools/legend/authoring/notes/import captions, nine exact English renders, canonical modes/brushes/path/size/JSON/import/upload/place/describe callbacks and network/read failure feedback (mock transport, no real map/model operation).');
