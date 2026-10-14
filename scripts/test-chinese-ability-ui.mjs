import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {abilityUiFixtures,abilityDiceFixtures,openAbilityRenderer} from './lib/ability-ui-fixtures.mjs';
import {ABILITY_UI_MESSAGES} from "../src/lib/i18n/ability-ui-messages.ts";
import {suite} from './lib/enforce-harness.mjs';
const {test,finish}=suite('test-chinese-ability-ui');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>readValidationJson(path.join(root,file));
const before=read('docs/validation/character-ability-ui-goldens.json');
const view=await import('../src/lib/i18n/ability-ui-presentations.ts');
const {gainLabel}=await import('../src/app/characters/builder/abilityGains.ts');
const {hpBreakdown,summaryLine}=await import('../src/app/characters/builder/abilityDice.ts');
const renderer=await openAbilityRenderer();
const en=await abilityUiFixtures('en',{renderer}),zh=await abilityUiFixtures('zh-CN',{renderer});
const of=(rows,name)=>{const row=rows.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const numbers=html=>{const result=new Map();for(const n of text(html).match(/[+-]?\d+(?:\.\d+)?/g)??[])result.set(n,(result.get(n)??0)+1);return result;};
const controls=html=>[...html.matchAll(/<(button|select|option|input|output|span)\b([^>]*)>/g)].map(row=>({tag:row[1],attrs:(row[2].match(/(?:type|disabled|aria-busy|aria-pressed|value|data-count|data-placed|data-filled|data-held|data-drop|data-reference|data-section|data-feat)="[^"]*"/g)??[]).sort()}));

await test('44 frozen actual English JSX projections remain exact, including empty/full, budget, roll, gains, ASI and complete health explainers',()=>{
  assert.equal(before.fixtures.length,44);assert.deepEqual(en,before.fixtures);
  assert.deepEqual(view.abilityMethodRows('en',70,renderer.editor.STANDARD_ARRAY),before.methods);
  for(const row of before.reroll)assert.equal(view.abilityRerollRule(row.below,'en'),row.text);
});

await test('Chinese actual components retain every numeric mechanic, original control value, disabled/pressed state and canonical reference',()=>{
  assert.equal(zh.length,en.length);
  for(let i=0;i<en.length;i++){
    assert.equal(zh[i].name,en[i].name);assert.match(text(zh[i].html),/\p{Script=Han}/u);
    assert.deepEqual(controls(zh[i].html),controls(en[i].html),en[i].name);
    const actual=numbers(zh[i].html);for(const[n,count]of numbers(en[i].html))assert.ok((actual.get(n)??0)>=count,en[i].name+' missing '+n);
  }
  assert.match(of(zh,'editor/point-min'),/剩余 27 点/);assert.match(of(zh,'editor/point-overspent'),/剩余 -27 点/);
  assert.match(of(zh,'editor/roll-tray'),/总和 78/);assert.match(of(zh,'editor/roll-tray'),/只有总和低于 70/);
  assert.match(of(zh,'editor/gains'),/8 级提升（已达上限）/);assert.match(of(zh,'editor/gains'),/原初勇士/);
  assert.match(of(zh,'methods/pointbuy'),/27 点预算.*8 开始/);assert.match(of(zh,'asi/plus2'),/力量从 18 提高至 20（\+5）/);
  assert.match(of(zh,'hp/10/3'),/体质 15.*\+2.*后续 2 级共增加 18.*31/);
});

await test('actual dice accessibility keeps every English render, face, pip, offset and dropped marker while switching Chinese labels',()=>{
  const baseline=read('docs/validation/character-ability-dice-goldens.json');
  const english=abilityDiceFixtures(renderer),chinese=abilityDiceFixtures(renderer,'zh-CN');
  assert.equal(baseline.fixtures.length,5);assert.deepEqual(english,baseline.fixtures);
  const withoutLabel=html=>html.replace(/aria-label="[^"]*"/,'');
  for(let i=0;i<english.length;i++) {
    assert.deepEqual(withoutLabel(chinese[i].html),withoutLabel(english[i].html));
    assert.match(chinese[i].html,i===0?/aria-label="尚未掷骰"/:/aria-label="掷出 (?:1, 2, 3, 4|4, 3, 2, 1)；其中点数 1 的骰子被去掉"/);
  }
});

await test('all current reroll thresholds, gains and summary variants keep rules and verbatim authored braces/markup',()=>{
  for(const below of [0,-1,1,70,80]){
    const methods=view.abilityMethodRows('zh-CN',below,[15,14,13,12,10,8]);assert.match(methods[2].info,below<=0?/不允许再次/:new RegExp('低于 '+below));
    assert.deepEqual(methods.map(row=>row.id),['standard','pointbuy','roll']);
  }
  for(const source of ['at level 4','at level 8','Primal Champion','Linguist','Authored {feat}\n<script>'])for(const capped of [true,false]){
    const gain={source,amount:capped?0:2,capped},saved=structuredClone(gain);
    assert.equal(view.abilityGainText(gain,'en'),gainLabel(gain));assert.match(view.abilityGainText(gain,'zh-CN'),/^\+\d/);assert.deepEqual(gain,saved);
    if(source.startsWith('Authored'))assert.ok(view.abilityGainText(gain,'zh-CN').includes(source));
  }
  for(const method of ['standard','pointbuy','roll'])for(const best of [null,{label:'Strength',final:18},{label:'Authored {ability}\n<script>',final:21}]){
    const input={method,best,who:'Authored {hero}\n<script>'};assert.equal(view.abilitySummaryText(input,'en'),summaryLine(input));
    if(best){const result=view.abilitySummaryText(input,'zh-CN');assert.ok(result.includes(input.who));if(best.label.startsWith('Authored'))assert.ok(result.includes(best.label));}
  }
  const authored=of(zh,'asi/authored');assert.ok(authored.includes('Cloud {feat} &lt;script&gt;'));assert.ok(!authored.includes('<script>'));
});

await test('actual health input preserves raw English/override values, localizes native class labels and keeps pack names distinct from mechanics',()=>{
  const state={hpOverride:42},derived={shownAbilities:{con:15},effectiveLevel:3};
  const klass={id:'fighter',name:'Fighter',hitDie:10};
  const english=renderer.step.hpExplainerInput(state,derived,{id:'hill_dwarf'},klass);
  assert.deepEqual(english,{className:'Fighter',hitDie:10,con:15,level:3,bonusPerLevel:1,override:42});
  const chinese=renderer.step.hpExplainerInput(state,derived,{id:'hill_dwarf'},klass,'zh-CN');
  assert.deepEqual(chinese,{...english,className:'战士'});assert.deepEqual(hpBreakdown(chinese),hpBreakdown(english));
  const authored={...klass,name:'Authored {class}\n<script>',packName:'Authored {class}\n<script>',packBlurb:'Complete authored prose'};
  assert.equal(renderer.step.hpExplainerInput(state,derived,null,authored,'en').className,authored.name);
  assert.equal(renderer.step.hpExplainerInput(state,derived,null,authored,'zh-CN').className,authored.packName);
  assert.equal(renderer.step.hpExplainerInput(state,{...derived,shownAbilities:null},null,klass,'zh-CN'),null);
  assert.equal(view.abilityRowLabel('str','Authored {strength}','zh-CN'),'Authored {strength}');
});

await test('the actual server-roll request preserves its protocol and kept dice, and all ordinary errors switch language from raw state',async()=>{
  const {requestAbilityPool}=await import('../src/app/characters/builder/useTableRules.ts');
  const originalFetch=globalThis.fetch;let sent;
  const throws=Array.from({length:6},()=>({dice:[1,2,3,4],dropIndex:0,total:9}));
  try{
    globalThis.fetch=async(url,options)=>{sent={url,options};return Response.json({abilities:{throws,kept:true,createdAt:'2026-10-10T12:00:00Z',rerollBelow:80}});};
    const answer=await requestAbilityPool();assert.equal(sent.url,'/api/characters/rolls');assert.equal(sent.options.method,'POST');assert.deepEqual(JSON.parse(sent.options.body),{kind:'abilities'});
    assert.deepEqual(answer.pool.map(({roll,total})=>({dice:roll.dice,dropIndex:roll.dropIndex,total})),throws);assert.equal(answer.rerollBelow,80);assert.equal(answer.kept,true);
    for(const[source,status]of [['Not logged in.',401],['The server could not roll the dice. Try again.',502],["Say which dice to roll: the ability scores, or a class's starting wealth at a table.",400]]){
      globalThis.fetch=async()=>Response.json({error:source},{status});const result=await requestAbilityPool();assert.deepEqual(result,{error:source});assert.equal(view.abilityRollErrorText(source,'en'),source);assert.match(view.abilityRollErrorText(source,'zh-CN'),/\p{Script=Han}/u);
    }
    globalThis.fetch=async()=>{throw new Error('offline');};const failure=await requestAbilityPool();assert.equal(failure.error,'Could not reach the server to roll the dice.');assert.match(view.abilityRollErrorText(failure.error,'zh-CN'),/无法连接/);
    const extra='Authored {diagnostic}\nfull source';assert.ok(view.abilityRollErrorText(extra,'zh-CN').includes(extra));assert.equal(view.abilityRollErrorText('','zh-CN'),'');
  }finally{globalThis.fetch=originalFetch;}
});

await test('original arithmetic source and reviewed translation/display fingerprints remain unchanged/current',()=>{
  for(const file of ['src/app/characters/builder/abilityGains.ts','src/lib/srd/point-buy.ts','src/lib/srd/asi.ts'])assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),before.originalSources[file],file);
  const review=read('docs/validation/character-ability-translations.json');for(const[file,hash]of Object.entries({...review.sources,...review.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
  assert.deepEqual(Object.keys(ABILITY_UI_MESSAGES['zh-CN']).sort(),Object.keys(ABILITY_UI_MESSAGES.en).sort());
});
finish();
