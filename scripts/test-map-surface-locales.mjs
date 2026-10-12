// Owned catalog/display/search contracts and actual picker callbacks. No art/browser/server requests.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {mapSkinNote,mapMaterialLabel,mapMaterialRole,localizedMaterialChoices}=await import('../src/lib/i18n/map-surface-presentations.ts');
const {SKINS,SKIN_CHARS,SKIN_ROLES,skinById}=await import('../src/lib/battlemap/skins.ts');
const {materialChoices,SET_LABELS}=await import('../src/app/campaigns/[campaignId]/mapCatalogue.ts');
const {registeredMessageTemplate}=await import('../src/lib/i18n/translator.ts');
const {messageScope}=await import('../src/lib/i18n/resource-scope.ts');
const tiles=JSON.parse(fs.readFileSync('public/assets/tiles/manifest.json','utf8')).tiles;
const original=structuredClone(tiles);
for(const [id,label]of Object.entries(SET_LABELS))assert.equal(registeredMessageTemplate('en',`mapEditorUi.set.${id}`),label);

for(const tile of tiles){
 assert.equal(registeredMessageTemplate('en',`mapSurfaceUi.material.${tile.id}`),tile.label??tile.id);
 assert.equal(mapMaterialLabel(tile,'en'),tile.label??tile.id);assert.notEqual(mapMaterialLabel(tile,'zh-CN'),tile.label??tile.id);
 assert.equal(mapMaterialLabel(tile.id,'zh-CN'),mapMaterialLabel(tile,'zh-CN'));
}
for(const skin of SKINS){assert.equal(registeredMessageTemplate('en',`mapSurfaceUi.skinNote.${skin.id}`),skin.note);assert.equal(mapSkinNote(skin,'en'),skin.note);assert.notEqual(mapSkinNote(skin,'zh-CN'),skin.note);}
for(const char of SKIN_CHARS){assert.equal(mapMaterialRole(char,'en'),SKIN_ROLES[char].label);const native=materialChoices(tiles,char,'cyberpunk','field',''),zh=localizedMaterialChoices(tiles,char,'cyberpunk','field','','zh-CN');assert.deepEqual(zh.map(group=>group.tiles),native.map(group=>group.tiles));for(let i=0;i<zh.length;i++)for(let j=0;j<zh[i].tiles.length;j++)assert.equal(zh[i].tiles[j],native[i].tiles[j]);}
assert.deepEqual(tiles,original);assert.equal(messageScope('mapSurfaceUi.heading'),'content');assert.equal(messageScope('listUi.search'),'ui');
assert.equal(mapMaterialLabel({id:'flagstone-granite',label:'Authored granite {name}'},'zh-CN'),'Authored granite {name}');assert.equal(mapMaterialLabel({id:'custom',label:'Flagstone granite'},'zh-CN'),'Flagstone granite');assert.equal(mapMaterialLabel('custom','zh-CN'),'custom');assert.equal(mapSkinNote({...SKINS[0],note:'Authored {note}'},'zh-CN'),'Authored {note}');
const translated=localizedMaterialChoices(tiles,'.',null,'interior','花岗岩','zh-CN');assert.equal(translated.length,1);assert.equal(translated[0].tiles.length,1);assert.equal(translated[0].tiles[0],tiles.find(tile=>tile.id==='flagstone-granite'));
const custom={id:'custom',category:'floor',src:'/authored.png',label:'自定义 {name}'};assert.equal(localizedMaterialChoices([custom],'.',null,'field','自定义','zh-CN')[0].tiles[0],custom);
assert.deepEqual(localizedMaterialChoices(tiles,'.',null,'field','granite','en'),materialChoices(tiles,'.',null,'field','granite'));
const panel='src/app/campaigns/[campaignId]/MapTilesetPanel.tsx',gallery='src/app/workshop/maps/MapGallery.tsx',list='src/components/ui/ListControls.tsx';
const files=[panel,gallery,list],url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const source=(file,old)=>{const text=old&&files.includes(file)?execFileSync('git',['show',`3f078801:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8');return file===panel?text+'\nexport {MaterialPicker};':text;};
const stubs={'@/app/campaigns/[campaignId]/useMapPaint':url('export const useMapThumb=()=>null;export const stampsOf=()=>[];')};
const r=await openCombatRenderer({files,stubs,sourceOf:file=>source(file,false)}),before=await openCombatRenderer({files,stubs,sourceOf:file=>source(file,true)});
const no=()=>{},skin=skinById('stone-dungeon'),catalogue={tiles:tiles.filter(tile=>Object.values(skin.bind).includes(tile.id)).concat(custom),objects:[]};
const panelProps={skin:{id:'',bind:{}},resolved:skin,genre:null,theme:'interior',catalogue,counts:{'.':10,'#':5,'~':2,',':1,'+':1,'|':2},painted:true,onPainted:no,onSkin:no};
const picker={char:'.',tiles:catalogue.tiles,genre:null,theme:'interior',current:skin.bind['.'],skinsOwn:skin.bind['.'],onPick:no,onClose:no};
const map={id:'m',name:'Authored {map}',tags:['Authored {tag}'],updatedAt:'2026-01-01',width:4,height:4,terrain:'.'.repeat(16),theme:'interior',props:[],backdrop:null,skin:{id:'',bind:{}}};
let renders=0;
for(const [name,props,options]of [
 ['MapTilesetPanel',panelProps],['MapTilesetPanel',{...panelProps,painted:false,onSkin:undefined}],['MapTilesetPanel',{...panelProps,skin:{id:'',bind:{'.':'custom'}}}],
 ['MaterialPicker',picker],['MaterialPicker',picker,{queues:{[panel]:['missing']}}],['MaterialPicker',{...picker,char:'+'}],
 ['MapGallery',{maps:[],selectedId:'',onOpen:no}],['MapGallery',{maps:[map],selectedId:'m',onOpen:no}],['MapGallery',{maps:[map],selectedId:'m',onOpen:no},{queues:{[list]:['missing','','recent']}}],
 ]){assert.equal(r.render(name,props,'en',options),before.render(name,props,'en',options),name+' English render');renders++;}
let painted,picked;
let html=r.render('MapTilesetPanel',{...panelProps,onPainted:value=>painted=value,onSkin:value=>picked=value},'zh-CN',{queues:{[panel]:['.','']}});assert(html.includes('地形材质')&&html.includes('花岗岩石板')&&html.includes('长着苔藓'));
r.elements().find(e=>e.props.title==='使用纯色地形图。此选项只影响当前设备的显示，不改变地图。').props.onClick();assert.equal(painted,false);
const choices=r.elements().find(e=>e.props.label==='样式');assert(choices.props.options.some(option=>option.label==='沉没墓穴'&&option.value==='sunken-crypt'));choices.props.onChange('sunken-crypt');assert.deepEqual(picked,{id:'sunken-crypt',bind:{}});
assert(r.elements().some(e=>e.props.title==='地面：选择材质'));
// Capture the real child callback; no locale display name may enter the bind.
const child=r.elements().find(e=>e.type?.name==='MaterialPicker');child.props.onPick('custom');assert.deepEqual(picked,{id:'',bind:{'.':'custom'}});child.props.onPick(skin.bind['.']);assert.deepEqual(picked,{id:'',bind:{}});
let material;r.render('MaterialPicker',{...picker,onPick:value=>material=value},'zh-CN',{queues:{[panel]:['花岗岩']}});const materialButton=r.elements().find(e=>e.type==='button'&&e.props['aria-pressed']===true);materialButton.props.onClick();assert.equal(material,'flagstone-granite');
let opened;html=r.render('MapGallery',{maps:[map],selectedId:'m',onOpen:value=>opened=value},'zh-CN');assert(html.includes('石造地牢')&&html.includes('Authored {map}')&&html.includes('Authored {tag}'));r.elements().find(e=>e.props['aria-label']==='打开Authored {map}').props.onClick();assert.equal(opened,map);
let query,tag,sort;const controls={query:'',setQuery:value=>query=value,tag:'',setTag:value=>tag=value,sort:'recent',setSort:value=>sort=value,tags:['Authored {tag}']};
assert.equal(r.render('ListControls',{controls},'en'),before.render('ListControls',{controls},'en'));renders++;
assert.equal(r.render('ListControls',{controls,placeholder:'Authored prompt'},'en'),before.render('ListControls',{controls,placeholder:'Authored prompt'},'en'));renders++;
r.render('ListControls',{controls},'zh-CN');r.elements().find(e=>e.type==='input'&&e.props.placeholder==='按名称搜索').props.onChange({target:{value:'原名 {name}'}});r.elements().find(e=>e.type==='button'&&e.props.children==='Authored {tag}').props.onClick();r.elements().find(e=>e.props.title==='按名称排序').props.onClick();assert.equal(query,'原名 {name}');assert.equal(tag,'Authored {tag}');assert.equal(sort,'name');
console.log(`PASS: ${tiles.length} owned material names, ${SKINS.length} notes and six roles source-matched; native categories/order/identities and Chinese/raw-name search; ${renders} exact English renders; original selection/bind/view/filter callbacks. No live art/browser/model/server.`);
