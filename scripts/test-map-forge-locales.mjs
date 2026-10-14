// Locale read-back and targeted generator/UI contracts; no live model or browser.
import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {generateBattleMap}=await import('../src/lib/battlemap/generate.ts');
const forge=await import('../src/app/workshop/maps/forge.ts');
const {SKINS}=await import('../src/lib/battlemap/skins.ts');
const {mapForgeExplanation,mapSkinName,mapSkinGroup}=await import('../src/lib/i18n/map-forge-presentations.ts');
const url=text=>'data:text/javascript;base64,'+Buffer.from(text).toString('base64');
const oldModule=async file=>import(url(ts.transpileModule(execFileSync('git',['show',`2b0b6b6e:${file}`],{encoding:'utf8'}),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText));
const oldGenerator=await oldModule('src/lib/battlemap/generate.ts'),oldForge=await oldModule('src/app/workshop/maps/forge.ts');
const labels={cave:'Cave',forest:'Forest',swamp:'Swamp',riverside:'Water',interior:'Indoors',field:'Open ground'};
// Upstream v0.27 replaces prose guessing with canonical scene IDs. Every
// localized picker must submit the same scene and preserve seeded geometry.
const {sceneOptions,cueById}=await import('../src/lib/ambience/catalog.ts');
const {sceneCueLabel}=await import('../src/lib/i18n/map-scene-presentations.ts');
let regressions=0;
for(const seed of [1,123])for(const option of [{value:'',label:'Open ground'},...sceneOptions()]){
 const input={seed,width:20,height:15,pcCount:4,enemyCount:4,scene:option.value||null};
 assert.deepEqual(generateBattleMap(input),oldGenerator.generateBattleMap(input));regressions++;
 if(option.value){assert.equal(sceneCueLabel(option,'en'),option.label);assert.notEqual(sceneCueLabel(option,'zh-CN'),option.label);}
 for(const override of [{theme:'',ambient:''},{theme:'forest',ambient:'bright'}]){
  const settings={...override,scene:option.value};
  assert.deepEqual(mapForgeExplanation(settings,'en'),oldForge.explainForge(settings,theme=>labels[theme],scene=>cueById(scene)?.label??scene));
  assert.match(mapForgeExplanation(settings,'zh-CN').join(' '),/\p{Script=Han}/u);
 }
}
const roll={...forge.FORGE_START,seed:123,scene:'forest'};
assert.equal(forge.createBodyFor(roll).scene,'forest');assert.equal(forge.createBodyFor(roll).hint,undefined);
assert.equal(mapSkinName({id:'stone-dungeon',name:'Authored Stone dungeon'},'zh-CN'),'Authored Stone dungeon');assert.equal(mapSkinName({id:'custom',name:'Stone dungeon'},'zh-CN'),'Stone dungeon');for(const skin of SKINS){assert.equal(mapSkinName(skin,'en'),skin.name);assert.notEqual(mapSkinName(skin,'zh-CN'),skin.name);}assert.equal(mapSkinGroup('This setting','zh-CN'),'当前设定');assert.equal(mapSkinGroup('Authored setting','zh-CN'),'Authored setting');
const base='src/app/workshop/maps/',file=base+'MapForge.tsx',files=[file,base+'ForgePreview.tsx',base+'MapCreateControls.tsx'];
const stubs={'@/app/campaigns/[campaignId]/useMapPaint':url('export const useCatalogue=()=>null;export const useMapThumb=()=>null;export const usePaintedGround=()=>null;')};
const r=await openCombatRenderer({files,stubs}),before=await openCombatRenderer({files,stubs,sourceOf:f=>files.includes(f)?execFileSync('git',['show',`2b0b6b6e:${f}`],{encoding:'utf8'}):fs.readFileSync(f,'utf8')});
const map=forge.forgeGenerate(roll),shown={roll,map,rollId:1,stretch:1};
const queue=(name='',settings=forge.FORGE_START,current=null,history=[])=>[name,settings,undefined,{id:'',bind:{}},current,history,false];
const no=()=>{},props={surface:'library',genre:null,busy:false,generate:no,onCreate:no,onImport:no};
let renders=0;
for(const [patch,state]of [[{},queue()],[{},queue('Authored {name}',{...forge.FORGE_START,scene:'forest'})],[{board:'fight'},queue('Authored {name}',{...forge.FORGE_START,scene:'forest'},shown,[shown])],[{surface:'studio'},queue()],[{surface:'studio',busy:true},queue('')]]){
 // Compare the upstream canonical scene state in the English UI.
 const fixed=structuredClone(state);
 const options={queues:{[file]:fixed}};
 assert.equal(r.render('MapForge',{...props,...patch},'en',options),before.render('MapForge',{...props,...patch},'en',options));renders++;
}
let payload,generated,imported;r.render('MapForge',{...props,onCreate:async body=>{payload=body;return {map};},generate:async value=>{generated=value;return map;},onImport:value=>imported=value},'zh-CN',{queues:{[file]:queue(' 作者 {name} ',roll,shown,[shown])}});
assert(r.elements().some(e=>e.props.title?.includes('种子 123')));const buttons=r.elements().filter(e=>e.type==='button');
const keep=buttons.find(e=>e.props.children?.some?.(child=>child?.props?.children==='保存地图'));await keep.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(payload.name,'作者 {name}');assert.equal(payload.seed,123);assert.equal(payload.scene,'forest');assert.equal(payload.width,20);
const blank=buttons.find(e=>e.props.children==='空白岩地');blank.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(payload.blank,'rock');assert.equal(payload.do,'create');assert.equal(payload.name,'作者 {name}');
const rollButton=buttons.find(e=>e.props.children?.some?.(child=>child?.props?.children==='再生成一张'));rollButton.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(generated.scene,roll.scene);assert.equal(generated.width,20);assert(Number.isInteger(generated.seed));
const fileInput=r.elements().find(e=>e.type==='input'&&e.props.type==='file'),rawFile={name:'Authored.dd2vtt'};fileInput.props.onChange({target:{files:[rawFile],value:'picked'}});assert.equal(imported,rawFile);
const skinSelect=r.elements().find(e=>e.props.label==='样式');skinSelect.props.onChange('sunken-crypt');assert(r.updates().some(row=>row.at===3&&row.value.id==='sunken-crypt'&&Object.keys(row.value.bind).length===0));
r.render('MapCreateControls',{busy:false,board:null,genre:'horror',onCreate:no,onImport:no},'zh-CN');const child=r.elements().find(e=>e.type?.name==='MapForge');assert.deepEqual(await child.props.generate(roll),forge.forgeGenerate(roll,'horror'));
console.log(`PASS: ${regressions} seeded English map comparisons, all canonical scene labels and English read-back, ${renders} exact English UI renders and native keep/blank/roll/import/skin/delegate callbacks. No live map/model/browser.`);
