// Display and callback checks, mock requests/assets; no real drawing, sound/model generation or map mutation.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const base='src/app/campaigns/[campaignId]/',files=['MapPanel','MapSceneTools','MapRail'].map(x=>base+x+'.tsx'),panel=files[0],scene=files[1],url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const stubs={
 '@/lib/image-encode':url('export const encodeImageForUpload=async()=>({dataUrl:"data:mock",type:"image/png"});'),
 '@/lib/use-capabilities':url('export const useCapabilities=()=>null;export const offersImages=()=>true;'),
 '@/components/SkyLayer':url('export const SkyLayer=()=>null;'),
 '@/app/campaigns/[campaignId]/TheatreInserts':url('export const TheatreInserts=()=>null;'),
 '@/app/campaigns/[campaignId]/StampPicker':url('export const StampPicker=()=>null;'),
 '@/app/campaigns/[campaignId]/MapToolbox':url('export * from '+JSON.stringify(new URL('../src/app/campaigns/[campaignId]/mapToolState.ts',import.meta.url).href)+';'),
};
const r=await openCombatRenderer({files,stubs}),before=await openCombatRenderer({files,stubs,sourceOf:file=>files.includes(file)?execFileSync('git',['show',`e17c1e8d:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8')});
const {MODES,DEFAULT_MAP_TOOLS,LIBRARY_CAPS}=await import('../src/app/campaigns/[campaignId]/mapToolState.ts');
const {cueOptions}=await import('../src/lib/ambience/catalog.ts');
const {mapRailEntry,sceneCueLabel,mapPopulateNote,MAP_SCENE_FAILURES}=await import('../src/lib/i18n/map-scene-presentations.ts');
const no=()=>{},location={id:'l',name:'Authored {name}',isCurrent:true,mapImage:{url:'/uploads/place.png'},connections:['Authored road'],layoutDescription:'Authored layout'},mapProps={campaignId:'c',locations:[location],steersStory:true};
const cases=[['MapPanel',mapProps],['MapPanel',{...mapProps,locations:[]}],['MapPanel',{...mapProps,locations:[{...location,mapImage:null}],mediaStatus:{l:{state:'queued'}}}],
 ['LightDial',{value:{brightRadius:4,dimRadius:8},onChange:no,count:3,onClear:no}],['LabelDial',{value:{text:'Authored {text}',dmOnly:true},onChange:no,count:2,onClear:no}],['PropDial',{value:{name:'Authored {name}',kind:'npc'},onChange:no,count:2,npcNames:['Authored bystander']}],
 ['ZoneDial',{value:'dark',kind:'magical_darkness',onChange:no,onKind:no,count:3,onClear:no}],['DoorHint',{}],['AmbienceControls',{value:{bed:'dungeon',music:'battle'},onChange:no}],['OverlayControls',{overlayPath:'/uploads/overlay.png',onChange:no}],['MapRail',{tools:DEFAULT_MAP_TOOLS,caps:LIBRARY_CAPS,onTools:no,onHelp:no,orientation:'strip'}]];
for(const[name,props]of cases)assert.equal(r.render(name,props,'en'),before.render(name,props,'en'),name+' English display preserved');
for(const entry of MODES){const original=structuredClone({...entry,icon:null});assert.notEqual(mapRailEntry(entry,'zh-CN').label,entry.label);assert.notEqual(mapRailEntry(entry,'zh-CN').hint,entry.hint);assert.deepEqual({...entry,icon:null},original);}
assert.equal(mapRailEntry({...MODES[0],label:'Custom label',hint:'Custom hint'},'zh-CN').label,'Custom label');
for(const option of [...cueOptions('bed'),...cueOptions('music')])assert.notEqual(sceneCueLabel(option,'zh-CN'),option.label);
assert.equal(sceneCueLabel({value:'dungeon',label:'Authored sound'},'zh-CN'),'Authored sound');
let light;let html=r.render('LightDial',{value:{brightRadius:2,dimRadius:3},onChange:value=>light=value,count:3,onClear:no},'zh-CN');assert(html.includes('火把')&&html.includes('熄灭全部 3'));r.elements().find(e=>e.props.label==='亮光').props.onChange(5);assert.deepEqual(light,{brightRadius:5,dimRadius:5});
let label;r.render('LabelDial',{value:{text:'Authored {text}',dmOnly:false},onChange:value=>label=value,count:0},'zh-CN');r.elements().find(e=>e.props.label==='仅自己可见').props.onChange(true);assert.deepEqual(label,{text:'Authored {text}',dmOnly:true});
let zone;r.render('ZoneDial',{value:'dim',kind:'light',onChange:no,onKind:value=>zone=value,count:0},'zh-CN');r.elements().find(e=>e.props.children==='魔法黑暗').props.onClick();assert.equal(zone,'magical_darkness');
let ambience;r.render('AmbienceControls',{value:{bed:'dungeon',music:'battle'},onChange:value=>ambience=value},'zh-CN');const music=r.elements().find(e=>e.props.label==='音乐');assert(music.props.options.some(x=>x.value==='boss'&&x.label==='强敌来袭'));music.props.onChange('boss');assert.deepEqual(ambience,{bed:'dungeon',music:'boss'});
let selected;r.render('MapRail',{tools:DEFAULT_MAP_TOOLS,caps:LIBRARY_CAPS,onTools:value=>selected=value,orientation:'strip'},'zh-CN');r.elements().find(e=>e.props['data-map-tool']==='door').props.onClick();assert.equal(selected.mode,'door');assert.equal(selected.brush,'wall');
assert.equal(mapPopulateNote({npcs:2,shops:1,hook:'Authored {hook}'},'en'),'2 people and 1 shops now live here. Hook: Authored {hook}');assert(mapPopulateNote({npcs:2,shops:1,hook:'Authored {hook}'},'zh-CN').includes('Authored {hook}'));
const originalFetch=globalThis.fetch,calls=[];let overlay;
globalThis.fetch=async(path,options)=>{calls.push({path,method:options.method,body:options.body?JSON.parse(options.body):undefined});return {ok:true,json:async()=>path==='/api/upload'?{url:'/uploads/new.png'}:path.endsWith('/populate')?{npcs:2,shops:1,hook:{title:'Authored {hook}'}}:{ok:true}};};
const flush=()=>new Promise(resolve=>setImmediate(resolve));
try{
 r.render('MapPanel',mapProps,'zh-CN');const populate=r.elements().find(e=>typeof e.type!=='string'&&e.props.title==='为地点生成人物、商店、传闻和冒险引子');populate.props.onClick();await flush();assert.deepEqual(calls.at(-1),{path:'/api/campaigns/c/locations/l/populate',method:'POST',body:{}});assert(r.updates().some(x=>x.file===panel&&x.at===2&&x.value.npcs===2&&x.value.hook==='Authored {hook}'));
 const input=r.elements().find(e=>e.type==='input'&&e.props.type==='file');input.props.onChange({target:{files:[{name:'Authored.png'}],value:'file'}});await flush();assert.deepEqual(calls.at(-1),{path:'/api/campaigns/c/locations/l/map',method:'POST',body:{imageUrl:'/uploads/new.png'}});
 r.render('MapPanel',mapProps,'zh-CN');r.elements().find(e=>e.props['aria-label']==='改用默认图片').props.onClick();await flush();assert.equal(calls.at(-1).method,'DELETE');
 r.render('OverlayControls',{overlayPath:'',onChange:value=>overlay=value},'zh-CN');r.elements().find(e=>e.type==='input').props.onChange({target:{files:[{name:'Authored overlay.png'}],value:'file'}});await flush();assert.equal(overlay,'/uploads/new.png');assert.deepEqual(calls.at(-1).body,{dataUrl:'data:mock',name:'Authored overlay.png',type:'image/png'});
 globalThis.fetch=async()=>{throw new Error('offline');};r.render('MapPanel',mapProps,'zh-CN');r.elements().find(e=>e.props.title==='为地点生成人物、商店、传闻和冒险引子').props.onClick();await flush();assert(r.updates().some(x=>x.file===panel&&x.at===2&&x.value===MAP_SCENE_FAILURES.network));assert(r.updates().some(x=>x.file===panel&&x.at===1&&x.value===false));
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: location/scene/rail captions, 11 exact English renders, all native sound/tool labels, raw authored data, light/privacy/zone/sound/mode and populate/upload/clear callbacks plus network recovery (mock transport, no real map/audio/model operation).');
