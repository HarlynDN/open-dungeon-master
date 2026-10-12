// Focused display and changed failure/import callbacks; no browser or live map mutation.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { openCombatRenderer } from './lib/combat-ui-fixtures.mjs';
const { DEFAULT_MAP_TOOLS } = await import('../src/app/campaigns/[campaignId]/mapToolState.ts');
const { mapLibraryErrorText, mapImportNoteText, mapImportFeedbackText } = await import('../src/lib/i18n/map-library-presentations.ts');

const { mapToastText } = await import('../src/lib/i18n/map-inspection-presentations.ts');
const base = 'src/app/campaigns/[campaignId]/';
const shell = base + 'MapEditorShell.tsx', library = base + 'DmMapLibraryPanel.tsx';
const details = 'src/app/workshop/maps/MapDetails.tsx', files = [shell, details, library];
const url = text => 'data:text/javascript;base64,' + Buffer.from(text).toString('base64');
const stubs = {
  '@/app/workshop/maps/MapEditor': url('export const MapEditor=props=>{globalThis.__mapLibraryEditor=props;return null;};'),
  '@/app/workshop/maps/MapCreateControls': url('export const MapCreateControls=props=>{globalThis.__mapLibraryCreate=props;return null;};'),
  '@/app/workshop/maps/MapGallery': url('export const MapGallery=props=>{globalThis.__mapLibraryGallery=props;return null;};'),
  '@/lib/image-encode': url('export const encodeImageForUpload=async()=>({dataUrl:"encoded",type:"image/png"});'),
  '@/lib/load-state': url(`export {readLoad} from ${JSON.stringify(pathToFileURL(process.cwd() + '/src/lib/load-state.ts').href)};export const useLoadStatus=()=>({loaded:globalThis.__mapLibraryLoad.loaded,loadError:globalThis.__mapLibraryLoad.error,settle:outcome=>globalThis.__mapLibraryLoad.outcomes.push(outcome)});`),
  '@/app/campaigns/[campaignId]/MapToasts': url('export const MapToastStack=()=>null;export const useMapToasts=()=>({toasts:[],push:(text,tone)=>globalThis.__mapLibraryNotices.push({text,tone})});'),
};
const r = await openCombatRenderer({ files, stubs });
const before = await openCombatRenderer({ files, stubs, sourceOf: file => files.includes(file)
  ? execFileSync('git', ['show', `d7142d98:${file}`], { encoding: 'utf8' }) : fs.readFileSync(file, 'utf8') });
const no = () => {}, map = { id:'m', name:'Authored {name}', tags:['Authored tag'], notes:'Authored notes', width:4, height:4, terrain:'.'.repeat(16), theme:'field', ambient:'bright', lights:[], labels:[], props:[], zones:[], overlayPath:null, ambience:null };
const state = { maps:[map], board:null, hasParty:true, workshop:false };
const words = { words:{name:map.name,tags:map.tags,notes:map.notes}, tagText:map.tags.join(', '), state:'idle', flush:no,setName:no,setNotes:no,setTagText:no,setTags:no };
const shellProps = { title:'Authored map', grid:true,onGrid:no,dmView:true,onDmView:no,zoom:1.2,controls:{current:{zoomIn:no,zoomOut:no,fit:no}},tools:DEFAULT_MAP_TOOLS,onTools:no,caps:{},options:'Authored options',canvas:'Authored canvas',side:'Authored side',toasts:[],undo:{canUndo:true,canRedo:true,onUndo:no,onRedo:no},back:3 };
const queue = (report=null,error='') => [state,'m',true,false,DEFAULT_MAP_TOOLS,false,error,report];
globalThis.__mapLibraryLoad = { loaded:true,error:'',outcomes:[] };
globalThis.__mapLibraryNotices = [];
let renders = 0;
for (const wide of [false,true]) {
  const opts={queues:{[shell]:[wide,null]}};
  assert.equal(r.render('MapEditorShell',shellProps,'en',opts),before.render('MapEditorShell',shellProps,'en',opts));renders++;
}
for (const sheet of ['tool','layers']) {
  const opts={queues:{[shell]:[false,sheet]}};
  assert.equal(r.render('MapEditorShell',shellProps,'en',opts),before.render('MapEditorShell',shellProps,'en',opts));renders++;
  assert(r.render('MapEditorShell',shellProps,'zh-CN',opts).includes(sheet==='tool'?'工具选项':'图层'));
}
for (const [name,props] of [['MapNameField',{words}],['MapDetailsPanel',{words,knownTags:['Authored tag','Another {tag}']} ]]) {
  assert.equal(r.render(name,props,'en'),before.render(name,props,'en'));renders++;
}
for (const layout of ['drawer','gallery']) {
  assert.equal(r.render('DmMapLibraryPanel',{campaignId:'c',layout},'en',{queues:{[library]:queue()}}),before.render('DmMapLibraryPanel',{campaignId:'c',layout},'en',{queues:{[library]:queue('')}}));renders++;
}
let grid,dm,zoom=0,undo=0;
r.render('MapEditorShell',{...shellProps,onGrid:value=>grid=value,onDmView:value=>dm=value,controls:{current:{zoomOut:()=>zoom--,zoomIn:()=>zoom++,fit:no}},undo:{...shellProps.undo,onUndo:()=>undo++}},'zh-CN',{queues:{[shell]:[true,null]}});
r.elements().find(e=>e.props.title==='显示地图网格线').props.onClick();
r.elements().find(e=>e.props.title?.startsWith('关闭后显示玩家视角')).props.onClick();
r.elements().find(e=>e.props['aria-label']==='缩小').props.onClick();
r.elements().find(e=>e.props['aria-label']==='撤销').props.onClick();
assert.equal(grid,false);assert.equal(dm,false);assert.equal(zoom,-1);assert.equal(undo,1);
let name,notes,tagText,tags;
r.render('MapNameField',{words:{...words,setName:value=>name=value}},'zh-CN');
const nameInput=r.elements().find(e=>e.type==='input');assert.equal(nameInput.props.value,map.name);nameInput.props.onChange({target:{value:'我的 {name}'}});assert.equal(name,'我的 {name}');
r.render('MapDetailsPanel',{words:{...words,setNotes:value=>notes=value,setTagText:value=>tagText=value,setTags:value=>tags=value},knownTags:['Another {tag}']},'zh-CN');
r.elements().find(e=>e.type==='textarea').props.onChange({target:{value:'作者笔记 {notes}'}});
r.elements().find(e=>e.type==='input'&&e.props['aria-label']==='标签').props.onChange({target:{value:'墓穴, {tag}'}});
r.elements().find(e=>e.props.prompt==='添加已有标签').props.onPick('Another {tag}');
assert.equal(notes,'作者笔记 {notes}');assert.equal(tagText,'墓穴, {tag}');assert.deepEqual(tags,['Authored tag','Another {tag}']);
assert.equal(mapLibraryErrorText('The maps did not load. The server answered 403.','zh-CN'),'未能加载地图库。服务器返回状态码 403。');
assert.equal(mapLibraryErrorText('The maps did not load. The server could not be reached.','zh-CN'),'未能加载地图库。无法连接服务器。');
assert.equal(mapToastText('That map could not be removed.','refused','zh-CN'),'未能删除地图。');
assert.equal(mapImportNoteText('Authored 2 lights came across.','zh-CN'),'Authored 2 lights came across.');
const nativeNotes=['The walls the rules use are the ones read out of the file, not the ones in the picture. Check them and paint any the import missed.','2 of 3 doors did not land between two open tiles and were left out. Paint them in where they belong.','1 light came across, and the map starts dark.'];
const report={notes:nativeNotes,pictureError:'it would not upload.'},reportCopy=structuredClone(report);
const cn=mapImportFeedbackText(report,'zh-CN');assert(cn.includes('其中 2 扇')&&cn.includes('共 3 扇')&&cn.includes('1 个光源')&&cn.includes('底图未能导入'));assert.deepEqual(report,reportCopy);
assert.equal(mapImportFeedbackText(report,'en'),nativeNotes.join(' ')+' The picture did not come along: it would not upload.');
let html=r.render('DmMapLibraryPanel',{campaignId:'c'},'zh-CN',{queues:{[library]:queue(report)}});assert(html.includes('Authored {name}')&&html.includes('底图未能导入'));
const originalFetch=globalThis.fetch,calls=[];
const renderLibrary=()=>{globalThis.__mapLibraryNotices=[];r.render('DmMapLibraryPanel',{campaignId:'c'},'zh-CN',{queues:{[library]:queue()}});return globalThis.__mapLibraryEditor;};
const record=(path,options)=>calls.push({path,method:options?.method??'GET',body:options?.body?JSON.parse(options.body):undefined});
try {
  globalThis.fetch=async(path,options)=>{record(path,options);return {ok:false,status:403,json:async()=>({error:'Only the Dungeon Master can do that.'})};};
  await renderLibrary().remove();assert(!r.updates().some(row=>row.file===library&&(row.at===1||row.at===2)));assert(globalThis.__mapLibraryNotices.length===1);assert(r.updates().some(row=>row.at===5&&row.value===false));
  globalThis.fetch=async(path,options)=>{record(path,options);return {ok:true,status:200,json:async()=>options?.method?{map:{...map,id:'copy'},notes:nativeNotes}:state};};
  await renderLibrary().remove();assert(r.updates().some(row=>row.at===1&&row.value===''));assert(r.updates().some(row=>row.at===2&&row.value===false));
  await renderLibrary().duplicate();const create=calls.find(row=>row.body?.do==='create');assert.equal(create.body.name,'Authored {name}（副本）');const carry=calls.find(row=>row.path.endsWith('/copy')&&row.method==='PATCH');assert.equal(carry.body.replaceTerrain,map.terrain);assert.equal(carry.body.notes,map.notes);assert.deepEqual(carry.body.tags,map.tags);
  await renderLibrary().act('open-scene');assert(calls.some(row=>row.body?.do==='open-scene'&&Object.keys(row.body).length===1));
  globalThis.fetch=async(path,options)=>{record(path,options);if(path==='/api/upload')throw new Error('offline');return {ok:true,status:200,json:async()=>options?.method?{map,notes:nativeNotes}:state};};
  renderLibrary();const file={name:'Authored.dd2vtt',text:async()=>JSON.stringify({image:'A'.repeat(32),resolution:{map_size:{x:4,y:4}}})};
  globalThis.__mapLibraryCreate.onImport(file);await new Promise(resolve=>setImmediate(resolve));
  const imported=calls.find(row=>row.body?.do==='import-uvtt');assert(imported);assert(calls.some(row=>row.path==='/api/upload'));assert(!('image' in imported.body.file));assert(!('backdropPath' in imported.body));assert.equal(imported.body.name,'Authored');assert(r.updates().some(row=>row.at===7&&row.value?.notes?.length===3&&row.value.pictureError==='it would not upload.'));
  globalThis.fetch=async()=>{throw new Error('offline');};const editor=renderLibrary();assert.equal(await editor.patch({notes:'原文 {note}'}),false);await editor.act('deploy');await editor.remove();assert.equal(globalThis.__mapLibraryNotices.length,3);assert(r.updates().some(row=>row.at===5&&row.value===false));
} finally { globalThis.fetch=originalFetch;for(const key of ['__mapLibraryEditor','__mapLibraryCreate','__mapLibraryGallery','__mapLibraryLoad','__mapLibraryNotices'])delete globalThis[key]; }
console.log(`PASS: ${renders} exact English renders; bilingual shell/details/library display and native callbacks; all import notices retained, image failure keeps geometry, refused delete retains editor, raw authored copy fields and network feedback (mock transport).`);
