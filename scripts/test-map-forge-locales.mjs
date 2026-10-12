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
const oldModule=async file=>import(url(ts.transpileModule(execFileSync('git',['show',`eb31dc57:${file}`],{encoding:'utf8'}),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText));
const oldGenerator=await oldModule('src/lib/battlemap/generate.ts'),oldForge=await oldModule('src/app/workshop/maps/forge.ts');
const labels={cave:'Cave',forest:'Forest',swamp:'Swamp',riverside:'Water',interior:'Indoors',field:'Open ground'};
const pairs=[['dark forest','黑暗森林'],['muddy swamp at dusk','黄昏的泥泞沼泽'],['a cave at noon','正午洞穴'],['torchlit warehouse','火把照亮的仓库'],['moonlit river','月光下的河流'],['rubble field','碎石遍布的旷野'],['sand shore','沙地海岸'],['snow forest','积雪森林'],['a flooded crypt, pitch-black','漆黑的墓穴']];
let regressions=0;
for(const seed of [1,123])for(const [english,chinese]of pairs){
 const input={seed,width:20,height:15,pcCount:4,enemyCount:4,hint:english};
 const old=oldGenerator.generateBattleMap(input);assert.deepEqual(generateBattleMap(input),old);regressions++;
 assert.deepEqual(generateBattleMap({...input,hint:chinese}),old,'Chinese and English cues drive identical native geometry');
 assert.deepEqual(generateBattleMap({...input,hint:undefined,layoutDescription:chinese}),old,'Chinese DM layout uses the same cue path');
 const read=forge.readHint(english);assert.deepEqual(read,oldForge.readHint(english));
 assert.deepEqual(mapForgeExplanation(read,{theme:'',ambient:''},'en'),oldForge.explainRead(read,{theme:'',ambient:''},theme=>labels[theme]));
 assert.deepEqual(mapForgeExplanation(read,{theme:'forest',ambient:'bright'},'en'),oldForge.explainRead(read,{theme:'forest',ambient:'bright'},theme=>labels[theme]));
}
for(const hint of ['office','cavernous','tomb, DARK!','sewer noon ice','somewhere',''])assert.deepEqual(forge.readHint(hint),oldForge.readHint(hint));
const read=forge.readHint('黑暗森林中遍布碎石。');assert.equal(read.theme,'forest');assert.equal(read.ambient,'dark');assert.equal(read.themeWord,'森林');assert.equal(read.lightWord,'黑暗');assert.equal(read.roughWord,'碎石');assert.equal(read.words.map(word=>word.text).join(''),'黑暗森林中遍布碎石。');
const cn=mapForgeExplanation(read,{theme:'',ambient:''},'zh-CN').join(' ');assert(cn.includes('“森林”')&&cn.includes('“黑暗”')&&cn.includes('“碎石”')&&!cn.includes('forest'));
const roll={...forge.FORGE_START,seed:123,hint:'  黑暗森林中遍布碎石。  '};assert.equal(forge.createBodyFor(roll).hint,'黑暗森林中遍布碎石。');assert.equal(roll.hint,'  黑暗森林中遍布碎石。  ');
assert.equal(mapSkinName({id:'stone-dungeon',name:'Authored Stone dungeon'},'zh-CN'),'Authored Stone dungeon');assert.equal(mapSkinName({id:'custom',name:'Stone dungeon'},'zh-CN'),'Stone dungeon');for(const skin of SKINS){assert.equal(mapSkinName(skin,'en'),skin.name);assert.notEqual(mapSkinName(skin,'zh-CN'),skin.name);}assert.equal(mapSkinGroup('This setting','zh-CN'),'当前设定');assert.equal(mapSkinGroup('Authored setting','zh-CN'),'Authored setting');
const base='src/app/workshop/maps/',file=base+'MapForge.tsx',files=[file,base+'ForgePreview.tsx',base+'MapCreateControls.tsx'];
const stubs={'@/app/campaigns/[campaignId]/useMapPaint':url('export const useCatalogue=()=>null;export const useMapThumb=()=>null;export const usePaintedGround=()=>null;')};
const r=await openCombatRenderer({files,stubs}),before=await openCombatRenderer({files,stubs,sourceOf:f=>files.includes(f)?execFileSync('git',['show',`eb31dc57:${f}`],{encoding:'utf8'}):fs.readFileSync(f,'utf8')});
const map=forge.forgeGenerate(roll),shown={roll,map,rollId:1,stretch:1};
const queue=(name='',settings=forge.FORGE_START,current=null,history=[])=>[name,settings,undefined,{id:'',bind:{}},current,history,false];
const no=()=>{},props={surface:'library',genre:null,busy:false,generate:no,onCreate:no,onImport:no};
let renders=0;
for(const [patch,state]of [[{},queue()],[{},queue('Authored {name}',{...forge.FORGE_START,hint:'a dark forest'})],[{board:'fight'},queue('Authored {name}',{...forge.FORGE_START,hint:'a dark forest'},shown,[shown])],[{surface:'studio'},queue()],[{surface:'studio',busy:true},queue('')]]){
 // The old generator did not recognize Chinese. Use an English history roll
 // here so this compares unchanged English copy and native layout only.
 const fixed=structuredClone(state);if(fixed[4]){fixed[4].roll.hint='rubble dark forest';fixed[5][0].roll.hint='rubble dark forest';}
 const options={queues:{[file]:fixed}};
 assert.equal(r.render('MapForge',{...props,...patch},'en',options),before.render('MapForge',{...props,...patch},'en',options));renders++;
}
let payload,generated,imported;r.render('MapForge',{...props,onCreate:async body=>{payload=body;return {map};},generate:async value=>{generated=value;return map;},onImport:value=>imported=value},'zh-CN',{queues:{[file]:queue(' 作者 {name} ',roll,shown,[shown])}});
assert(r.elements().some(e=>e.props.title?.includes('种子 123')));const buttons=r.elements().filter(e=>e.type==='button');
const keep=buttons.find(e=>e.props.children?.some?.(child=>child?.props?.children==='保存地图'));await keep.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(payload.name,'作者 {name}');assert.equal(payload.seed,123);assert.equal(payload.hint,'黑暗森林中遍布碎石。');assert.equal(payload.width,20);
const blank=buttons.find(e=>e.props.children==='空白岩地');blank.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(payload.blank,'rock');assert.equal(payload.do,'create');assert.equal(payload.name,'作者 {name}');
const rollButton=buttons.find(e=>e.props.children?.some?.(child=>child?.props?.children==='再生成一张'));rollButton.props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.equal(generated.hint,roll.hint);assert.equal(generated.width,20);assert(Number.isInteger(generated.seed));
const fileInput=r.elements().find(e=>e.type==='input'&&e.props.type==='file'),rawFile={name:'Authored.dd2vtt'};fileInput.props.onChange({target:{files:[rawFile],value:'picked'}});assert.equal(imported,rawFile);
const skinSelect=r.elements().find(e=>e.props.label==='样式');skinSelect.props.onChange('sunken-crypt');assert(r.updates().some(row=>row.at===3&&row.value.id==='sunken-crypt'&&Object.keys(row.value.bind).length===0));
r.render('MapCreateControls',{busy:false,board:null,genre:'horror',onCreate:no,onImport:no},'zh-CN');const child=r.elements().find(e=>e.type?.name==='MapForge');assert.deepEqual(await child.props.generate(roll),forge.forgeGenerate(roll,'horror'));
console.log(`PASS: ${regressions} seeded English map comparisons, nine Chinese cue/DM-layout equivalents, English read-back quirks, unspaced Chinese cue facts, raw hints, ${renders} exact English UI renders and native keep/blank/roll/import/skin/delegate callbacks. No live map/model/browser.`);
