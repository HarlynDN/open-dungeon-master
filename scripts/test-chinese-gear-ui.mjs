import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {openWorld} from './lib/enforce-world.mjs';
import {call} from './lib/enforce-campaign.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {openGearRenderer,gearUiFixtures} from './lib/gear-ui-fixtures.mjs';
const {test,finish}=suite('test-chinese-gear-ui');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>readValidationJson(path.join(root,file));
const before=read('docs/validation/character-gear-ui-goldens.json');
const helpBefore=read('docs/validation/character-gear-help-goldens.json');
const view=await import('../src/lib/i18n/gear-ui-presentations.ts');
const names=await import('../src/lib/i18n/equipment-name-messages.ts');
const searchView=await import('../src/lib/i18n/equipment-presentations.ts');
const {itemSheetView}=await import('../src/lib/i18n/equipment-help-presentations.ts');
const {bundledGearRows}=await import('../src/lib/workshop/bundled-gear-rows.ts');
const {buildItemSheet}=await import('../src/lib/help/item-sheet.ts');
const {nativeEquipmentSearch}=await import('../src/lib/content/native-equipment-search.ts');
const {purseViewFor,armorClassLine}=await import('../src/app/characters/builder/derivedReasons.ts');
const renderer=await openGearRenderer();
const en=await gearUiFixtures(renderer),zh=await gearUiFixtures(renderer,'zh-CN');
const of=(rows,name)=>{const row=rows.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const controls=html=>[...html.matchAll(/<(button|select|option|input|span)\b([^>]*)>/g)].map(row=>({tag:row[1],attrs:(row[2].match(/(?:type|disabled|aria-busy|aria-pressed|value|data-reference|data-section)="[^"]*"/g)??[]).sort()}));
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&(?:amp|lt|gt|quot);/g,' ');

await test('113 frozen actual English equipment/kit/background/search/catalog projections remain exact',()=>{
  assert.equal(before.fixtures.length,113);assert.deepEqual(en,before.fixtures);
  for(let i=0;i<en.length;i++){
    assert.equal(zh[i].name,en[i].name);if(/^(kit|equipment)\//.test(en[i].name))assert.match(text(zh[i].html),/\p{Script=Han}/u,en[i].name);
    assert.deepEqual(controls(zh[i].html),controls(en[i].html),en[i].name);
  }
  assert.match(of(zh,'equipment/kit'),/长剑.*1d8 挥砍/);
  assert.match(of(zh,'equipment/kit'),/护甲等级 18/);
  assert.match(of(zh,'equipment/wealth-rolled'),/110.*金币/);
  assert.match(of(zh,'equipment/wealth-busy'),/无法连接/);
  assert.match(of(zh,'background/ammo'),/短弓与 20 支箭/);
  assert.match(of(zh,'background/weapon-second'),/aria-pressed="true"[^>]*><span[^>]*>\(b\)<\/span> 轻锤/);
  assert.match(of(zh,'catalog/rows'),/长剑/);
  const row={name:'Shortbow',slug:'srd-gear:shortbow',source:'srd',kind:'weapon',data:{},cost:'25 gp'};
  const state=[true,['items:weapon'],{'items:weapon':{rows:[row],truncated:false}},[],false,''];
  const props={equipment:[],suggestions:[],purse:{gold:15,copper:0,source:'Authored source',problems:[],wealth:null},inputClass:'',onAdd:()=>{},onRemove:()=>{},onAddMany:()=>{}};
  assert.match(renderer.render(renderer.components.EquipmentSection,props,'en',{},state),/Shortbow.*25 gp/);
  assert.match(renderer.render(renderer.components.EquipmentSection,props,'zh-CN',{},state),/短弓.*25 金币/);
});

await test('native equipment names and all native background fragments translate without altering canonical names or authored content',async()=>{
  for(const row of names.EQUIPMENT_NAMES){
    assert.equal(view.equipmentName(row.name,'en'),row.name);
    assert.match(view.equipmentName(row.name,'zh-CN'),/\p{Script=Han}/u,row.name);
    assert.equal(view.equipmentName(row.name,'zh-CN',true),row.name);
  }
  assert.equal(view.equipmentName('Longsword +2','zh-CN'),'长剑 +2');
  assert.equal(view.gearNote('+2 AC','en'),'+2 AC');assert.equal(view.gearNote('+2 AC','zh-CN'),'护甲等级 +2');
  assert.equal(view.equipmentName('Authored {item}\n<script>','zh-CN'),'Authored {item}\n<script>');
  assert.equal(view.pickerName('items',{name:'Longsword',source:'homebrew'},'zh-CN'),'Longsword');
  assert.equal(view.pickerMatches('items',{name:'Longsword',source:'srd'},'长剑','zh-CN'),true);
  assert.equal(view.pickerMatches('items',{name:'Longsword',source:'srd'},'long','zh-CN'),true);
  assert.equal(view.pickerMatches('items',{name:'Longsword',source:'homebrew'},'长剑','zh-CN'),false);
  const {resolveBackgroundGear}=await import('../src/lib/srd/adventuring-gear.ts');
  const {expandBackgroundGear}=await import('../src/lib/srd/gear-choices.ts');
  for(const bg of read('src/lib/srd/backgrounds.json').backgrounds){
    const kit=expandBackgroundGear(resolveBackgroundGear(bg.equipment),{picks:[],tools:[],backgroundTools:bg.tools});
    for(const name of kit.names)if(!/^\d[\d,]* gp$/.test(name))assert.notEqual(view.equipmentName(name,'zh-CN'),name,bg.id+': '+name);
    for(const choice of kit.choices){assert.notEqual(view.backgroundGearLabel(choice.line,'zh-CN'),choice.line);for(const alt of choice.alternatives)assert.notEqual(view.backgroundAlternativeLabel(alt,'zh-CN'),alt.label);}
    for(const tool of kit.toolLines)assert.notEqual(view.backgroundGearLabel(tool.line,'zh-CN'),tool.line);
  }
});

await test('185 frozen actual English item cards remain exact; Chinese cards retain every source fact and number',()=>{
  assert.equal(helpBefore.fixtures.length,185);
  const numeric=value=>(JSON.stringify(value).match(/\d+(?:\.\d+)?/g)??[]).sort();
  for(const [index,row]of helpBefore.fixtures.entries()){
    const state=row.sheet!==undefined?{sheet:row.sheet,loading:false}:{sheet:null,loading:row.name==='loading'};
    const props={reference:{kind:'items',slug:row.slug??'authored',name:row.name}};
    assert.equal(renderer.render(renderer.components.ItemBody,props,'en',{},[state]),row.html,row.name);
    const html=renderer.render(renderer.components.ItemBody,props,'zh-CN',{},[state]);assert.match(text(html),/\p{Script=Han}/u,row.name);
    if(row.sheet){
      const source=bundledGearRows()[index];assert.equal(source.slug,row.slug);assert.equal(source.name,row.name);
      const raw=buildItemSheet(row.name,[source.data]);assert.deepEqual(raw,row.sheet);
      const saved=structuredClone(raw),translated=itemSheetView(raw,'zh-CN');assert.deepEqual(raw,saved,row.name);
      assert.deepEqual(numeric(translated),numeric(raw),row.name);
      assert.equal(translated.description,raw.description);assert.equal(translated.bonus,raw.bonus);
      assert.equal(translated.attunement,raw.attunement);assert.equal(translated.armor?.strength,raw.armor?.strength);
      assert.equal(translated.armor?.stealthDisadvantage,raw.armor?.stealthDisadvantage);
      assert.doesNotMatch(text(html),/\b(?:Weight|Value|Damage|Armor|Dexterity|Strength|Stealth|Versatile|Finesse|Loading|Ammunition|range)\b/);
    }
  }
  const authored={...helpBefore.fixtures.find(row=>row.name==='Longsword').sheet,type:'Authored {type}',description:'Authored {rules}\n<script>',weapon:{damage:'1d8',damageType:'authored',damageBlurb:'Authored {damage}',range:'Authored {range}',properties:[{name:'Finesse',blurb:'Authored {property}'}]}};
  const translated=itemSheetView(authored,'zh-CN');assert.equal(translated.description,authored.description);assert.equal(translated.type,authored.type);assert.deepEqual(translated.weapon,authored.weapon);
});

await test('purse and armor display keep the original arithmetic, server dice and callbacks, including explicit authored labels',()=>{
  const onRoll=()=>{},table={wealth:null,wealthBusy:false,wealthError:'',rollWealth:onRoll};
  for(const method of ['kit','rolled'])for(const keepsStoredGear of [false,true])for(const spentCopper of [0,25,127]){
    const input={purse:{gold:12,copper:27,spentCopper,problems:['Authored problem','Authored problem'],method},keepsStoredGear,backgroundName:'Acolyte',backgroundPurse:15,classId:'fighter',className:'Fighter',table};
    const original=purseViewFor(input),saved={...input,purse:structuredClone(input.purse)};
    assert.deepEqual(view.localizedPurseView(input,'en'),original);
    const translated=view.localizedPurseView(input,'zh-CN');assert.deepEqual({...translated,source:original.source},original);assert.match(translated.source,/\p{Script=Han}/u);
    assert.deepEqual(input,saved);if(translated.wealth)assert.equal(translated.wealth.onRoll,onRoll);
    const custom=view.localizedPurseView(input,'zh-CN',{className:'Fighter {reskin}',backgroundName:'Acolyte {author}'});
    if(!keepsStoredGear)assert.ok(custom.source.includes(method==='rolled'?'Fighter {reskin}':'Acolyte {author}'));
  }
  for(const parts of [undefined,['Chain Mail 16','Shield +2'],['Unarmored 10','DEX +3'],['Authored {item} 17']]){
    assert.deepEqual(view.localizedArmorClassLine(18,parts,'en'),armorClassLine(18,parts));assert.equal(view.localizedArmorClassLine(18,parts,'zh-CN').value,'18');
  }
  assert.equal(view.gearWealthDiceText('5d4 x 10 gp','en'),'5d4 x 10 gp');assert.equal(view.gearWealthDiceText('5d4 x 10 gp','zh-CN'),'5d4 x 10 金币');assert.equal(view.gearWealthDiceText('Authored dice','zh-CN'),'Authored dice');
  for(const[source,translated]of [['25 gp','25 金币'],['2 sp','2 银币'],['5 cp','5 铜币']]){assert.equal(view.gearCostText(source,'en'),source);assert.equal(view.gearCostText(source,'zh-CN'),translated);}assert.equal(view.gearCostText('Authored cost','zh-CN'),'Authored cost');
  assert.ok(view.localizedArmorClassLine(16,['Chain Mail 16'],'zh-CN',['Chain Mail']).reason.includes('Chain Mail 16'));
});

await test('Chinese equipment search merges authorized/native rows once, keeps filed precedence, kind and pagination',()=>{
  assert.ok(searchView.equipmentSearchNames('长剑','zh-CN').includes('longsword'));assert.ok(searchView.equipmentSearchNames('绳索','zh-CN').includes('rope'));assert.deepEqual(searchView.equipmentSearchNames('长剑','en'),[]);
  const filed={name:'Longsword',slug:'filed-long',source:'open5e',documentSlug:'wotc-srd'};
  const brew={name:'Longsword',slug:'homebrew:own',source:'homebrew'};
  const search=(q,offset,limit)=>(q==='longsword'?[filed,brew]:[]).slice(offset,offset+limit);
  const found=nativeEquipmentSearch({q:'长剑',kind:'weapon',locale:'zh-CN',offset:0,limit:200,search});
  assert.deepEqual(found,[filed,brew].sort((a,b)=>a.name.localeCompare(b.name,'en')));assert.ok(!found.some(row=>row.slug==='srd-gear:longsword'));
  const all=nativeEquipmentSearch({q:'',kind:'gear',locale:'zh-CN',offset:0,limit:200,search:()=>[]});assert.ok(all.length>100);assert.ok(all.every(row=>row.kind==='gear'));
  const first=nativeEquipmentSearch({q:'',kind:'gear',locale:'zh-CN',offset:0,limit:12,search:()=>[]});const next=nativeEquipmentSearch({q:'',kind:'gear',locale:'zh-CN',offset:12,limit:12,search:()=>[]});assert.deepEqual([...first,...next],all.slice(0,24));assert.equal(new Set([...first,...next].map(row=>row.slug)).size,24);
});

const world=await openWorld();const content=await world.route('content/[kind]');const detail=await world.route('content/[kind]/[slug]');
const {createHomebrew}=await import('../src/lib/db/homebrew.ts');const {createUser}=await import('../src/lib/db/users.ts');
const ownerItem=createHomebrew(world.owner.id,{kind:'item',name:'长剑 {owner}',data:{desc:'Authored {description}',itemKind:'gear',weight:1,cost:2}});
const outsider=createUser('gear-private','x');const privateItem=createHomebrew(outsider.id,{kind:'item',name:'长剑 {private}',data:{desc:'Private',itemKind:'gear',weight:1,cost:2}});
const api=async(params)=>{world.signIn(world.owner);return call(content,'GET',undefined,{kind:'items'},'http://test/api/content/items?'+new URLSearchParams(params));};
await test('real item API searches Chinese and English with original prices, guards scope, preserves legacy queries and resolves native detail',async()=>{
  const zh=await api({q:'长剑',native:'1',locale:'zh-CN',limit:'200'}),en=await api({q:'longsword',native:'1',locale:'en',limit:'200'});
  assert.equal(zh.status,200);assert.equal(en.status,200);
  const sword=zh.json.results.find(row=>row.name==='Longsword');assert.ok(sword);assert.equal(sword.price.copper,1500);assert.ok(en.json.results.some(row=>row.name==='Longsword'));
  assert.ok(zh.json.results.some(row=>row.slug==='homebrew:'+ownerItem.id));assert.ok(!zh.json.results.some(row=>row.slug==='homebrew:'+privateItem.id));
  const bow=(await api({q:'短弓',native:'1',locale:'zh-CN',kind:'weapon'})).json.results;assert.ok(bow.some(row=>row.name==='Shortbow'));assert.ok(bow.every(row=>row.kind==='weapon'));
  const rope=(await api({q:'绳索',native:'1',locale:'zh-CN',kind:'gear'})).json.results;assert.ok(rope.some(row=>row.name==='Rope, Hempen (50 feet)'));
  const legacy=await api({q:'长剑',locale:'zh-CN',limit:'200'});assert.ok(!legacy.json.results.some(row=>row.slug.startsWith('srd-gear:')));assert.ok(legacy.json.results.some(row=>row.slug==='homebrew:'+ownerItem.id));
  const bad=await api({native:'1',locale:'zh-CN',campaign:'not-authorized'});assert.equal(bad.status,404);
  const found=await call(detail,'GET',undefined,{kind:'items',slug:sword.slug},'http://test/api/content/items/'+encodeURIComponent(sword.slug));assert.equal(found.status,200);assert.equal(found.json.entry.name,'Longsword');
  const all=(await api({native:'1',locale:'zh-CN',kind:'armor',limit:'200'})).json.results;
  const first=(await api({native:'1',locale:'zh-CN',kind:'armor',limit:'6',offset:'0'})).json.results;
  const next=(await api({native:'1',locale:'zh-CN',kind:'armor',limit:'6',offset:'6'})).json.results;assert.deepEqual([...first,...next],all.slice(0,12));
});

await test('unchanged rule/content sources and bilingual key completeness remain explicit',async()=>{
  for(const file of ['src/lib/help/item-sheet.ts','src/lib/help/terms.ts','src/lib/workshop/bundled-gear-rows.ts'])assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),helpBefore.originalSources[file],file);
  for(const file of ['src/lib/srd/starting-kit.ts','src/lib/srd/starting-kit-data.ts','src/lib/srd/genre-kits.ts','src/lib/srd/gear-choices.ts','src/app/characters/builder/derivedReasons.ts'])assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),before.originalSources[file],file);
  for(const [file,name]of [['gear-ui-messages.ts','GEAR_UI_MESSAGES'],['equipment-name-messages.ts','EQUIPMENT_NAME_MESSAGES'],['equipment-help-messages.ts','EQUIPMENT_HELP_MESSAGES']]){const catalog=(await import('../src/lib/i18n/'+file))[name];assert.deepEqual(Object.keys(catalog.en).sort(),Object.keys(catalog['zh-CN']).sort());}
  const review=read('docs/validation/character-gear-translations.json');for(const[file,hash]of Object.entries({...review.sources,...review.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
});
world.close();finish();
