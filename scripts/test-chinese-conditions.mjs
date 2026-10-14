import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {openWorld} from './lib/enforce-world.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
const root=path.resolve(import.meta.dirname,'..');
const world=await openWorld();
const {test,finish}=suite('test-chinese-conditions');
const {openCombatRenderer}=await import('./lib/combat-ui-fixtures.mjs');
const {conditionUiFixtures,conditionFixtureRows}=await import('./lib/condition-ui-fixtures.mjs');
const {CONDITION_EFFECTS}=await import('../src/lib/srd/condition-effects.ts');
const {CONDITION_MATERIAL_INDEX}=await import('../src/lib/i18n/condition-material-index.ts');
const {CONDITION_MATERIAL_MESSAGES}=await import('../src/lib/i18n/condition-material-messages.ts');
const {MESSAGE_CATALOGS}=await import('../src/lib/i18n/messages.ts');
const {conditionDisplay,conditionLabel}=await import('../src/lib/i18n/condition-presentations.ts');
const {conditionNamesLookup,conditionPresentation}=await import('../src/lib/battlemap/condition-presentation.ts');
const renderer=await openCombatRenderer();
const en=conditionUiFixtures(renderer),zh=conditionUiFixtures(renderer,'zh-CN');
const byName=(rows,name)=>{const row=rows.find(r=>r.name===name);assert.ok(row,name);return row.html;};

try {
 await test('322 frozen original English condition renders remain exact, including all 274 native effect summaries',()=>{
  const frozen = readValidationJson(path.join(root,'docs/validation/condition-ui-goldens.json'));
  assert.equal(frozen.length,322);
  const frozenNames = new Set(frozen.map(row => row.name));
  assert.deepEqual(en.filter(row => frozenNames.has(row.name)), frozen);
  assert.equal(en.length,334);
  for(const row of zh)if(row.name!=='label/Authored condition <script>')assert.match(row.html,/\p{Script=Han}/u,row.name);
  for(const name of ['label/Authored condition <script>','label/blessed by Authored','source/trigger','source/authored-spell'])assert.match(byName(zh,name),/Authored/);
  assert.match(byName(zh,'label/Authored condition <script>'),/&lt;script&gt;/);
 });
 await test('each source alias and summary is accounted for; dice and numeric mechanics survive translation',()=>{
  assert.equal(CONDITION_EFFECTS.length,286);
  assert.deepEqual(CONDITION_MATERIAL_INDEX,CONDITION_EFFECTS.map(({id,match})=>({id,match})));
  assert.equal(Object.keys(CONDITION_MATERIAL_MESSAGES.en).length,572);
  for(const type of ['acid','bludgeoning','cold','fire','force','lightning','necrotic','piercing','poison','psychic','radiant','slashing','thunder'])assert.equal(MESSAGE_CATALOGS['zh-CN']['combatDetail.damage.'+type],MESSAGE_CATALOGS['zh-CN']['rule.damage.'+type],type);
  const dice=text=>(text.match(/\b(?:\d+)?d\d+\b/g)??[]).sort();
  const numbers=text=>(text.replace(/\b(?:\d+)?d\d+\b/g,'').match(/[-+]?\d+(?:-\d+)?/g)??[]).sort();
  for(const row of CONDITION_EFFECTS){
   const key='combatDetail.effect.'+row.id;
   assert.equal(CONDITION_MATERIAL_MESSAGES.en[key+'.name'],row.match[0]);
   const source=CONDITION_MATERIAL_MESSAGES.en[key+'.summary'];
   const translated=CONDITION_MATERIAL_MESSAGES['zh-CN'][key+'.summary'];
   assert.equal(source,row.summary,row.id);
   assert.deepEqual(dice(translated),dice(source),row.id);
   // These two ordinal spell levels are written as 二环 in the source-compared draft.
   assert.deepEqual(numbers(translated+( ['spiritual_weapon','flame_blade'].includes(row.id)?' 2':'')),numbers(source),row.id);
   for(const alias of row.match){assert.equal(conditionLabel(alias,'en'),alias);assert.match(conditionLabel(alias,'zh-CN'),/\p{Script=Han}/u,alias);}
  }
 });
 await test('turn boundaries, converted durations, save DCs and visible enemy versus proper names render accurately',()=>{
  assert.match(byName(zh,'duration/4800'),/8 小时/);assert.doesNotMatch(byName(zh,'duration/4800'),/4800/);
  assert.match(byName(zh,'duration/610'),/1 小时 1 分钟/);
  assert.match(byName(zh,'duration/30000'),/2 天 2 小时/);
  assert.match(byName(zh,'turn/enemy-start'),/哥布林 2 的下个回合开始/);
  assert.match(byName(zh,'turn/next-end'),/哥布林 2 的下个回合结束/);
  assert.match(byName(zh,'turn/current-end'),/哥布林 2 的本回合结束/);
  assert.match(byName(zh,'turn/priority'),/本回合结束/);assert.doesNotMatch(byName(zh,'turn/priority'),/3 轮|Aria/);
  assert.match(byName(zh,'source/enemy'),/感知豁免成功后结束（难度 13）.*来自哥布林 2（恐惧术）/);
  assert.match(byName(zh,'source/proper'),/来自Goblin（魅惑人类）/);assert.doesNotMatch(byName(zh,'source/proper'),/来自哥布林/);
  assert.doesNotMatch(byName(zh,'turn/hidden-start')+byName(zh,'source/hidden'),/hidden|Goblin 2|哥布林 2/);
  assert.equal(conditionLabel('absorb elements (fire)','zh-CN'),'吸收元素（火焰）');
  assert.equal(conditionLabel('absorbed strike (2d6 cold)','zh-CN'),'吸收元素打击（2d6 寒冷）');
  assert.equal(conditionLabel('hexed (strength)','zh-CN'),'咒缚（力量）');
  for(const [name,label]of [['raging','狂暴'],['dodging','闪避'],['readied','准备动作'],['bardic inspiration (d8)','吟游激励（d8）'],["dark one's own luck (d10)",'黑暗之幸（d10）']])assert.equal(conditionLabel(name,'zh-CN'),label);
 });
 await test('concentration, exhaustion, death saves, nonlethal unconsciousness, regeneration and Silence remain distinct',()=>{
  assert.match(byName(zh,'special/concentration'),/专注：定身人类/);
  assert.match(byName(zh,'special/stable'),/伤势稳定.*失去意识，不再进行死亡豁免/);
  assert.match(byName(zh,'special/dying'),/濒死 1\/2.*成功 1 次，失败 2 次/);
  assert.match(byName(zh,'special/exhaustion-5'),/属性检定具有劣势.*速度减半.*攻击和豁免具有劣势.*生命值上限减半.*速度为 0/);
  assert.doesNotMatch(byName(zh,'special/exhaustion-6'),/死亡/,'translation must not add an outcome absent from the original engine note');
  assert.match(byName(zh,'special/knocked out/false'),/已击昏.*仍然活着/);
  assert.match(byName(zh,'special/regenerating/false'),/正在再生/);
  assert.match(byName(zh,'special/regenerating/true/0'),/将在其回合死亡/);
  assert.match(byName(zh,'special/silence'),/耳聋（沉默术）.*言语成分.*雷鸣伤害/);
 });
 await test('the actual public encounter projection filters hidden sources before adding locale-neutral display data',async()=>{
  const {combatKit}=await import('./lib/enforce-combat.mjs');
  const {publicEncounter}=await import('../src/lib/db/encounter-view.ts');
  world.addHero({name:'Goblin',level:3});
  const kit=await combatKit(world);await kit.fight(2);
  const [shown,hidden]=world.enemies();
  shown.conditions=['frightened'];shown.conditionMeta={frightened:{source:hidden.id,untilTurnEndOf:hidden.id,saveEnds:{ability:'wis',dc:13},spell:'Fear'}};
  const before=structuredClone(shown);
  const view=publicEncounter(world.encounter(),[shown,hidden],{hiddenRefIds:[hidden.id]});
  assert.equal(view.enemies.length,1);
  const p=view.enemies[0].conditionPresentations.frightened;
  assert.equal(p.duration.who,undefined);assert.equal(p.source,undefined);
  assert.doesNotMatch(JSON.stringify(view),new RegExp(hidden.id));
  assert.match(renderer.render('EncounterPanel',{campaignId:world.campaignId,encounter:view,steersStory:false},'zh-CN'),/感知豁免成功后结束/);
  assert.deepEqual(shown,before);
 });
 await test('display projection never changes metadata, IDs, legacy English notes or authored strings',()=>{
  const lookup=conditionNamesLookup([{id:'known',name:'Goblin',kind:'pc'}]);
  const meta={rounds:4800,source:'secret-creature-id',spell:'Authored spell',saveEnds:{ability:'wis',dc:12}};
  const before=structuredClone(meta);
  const p=conditionPresentation('Authored condition',meta,lookup,'hero');
  assert.doesNotMatch(JSON.stringify(p),/secret-creature-id/);
  const rows=conditionFixtureRows();const baseline=structuredClone(rows);
  for(const {row}of rows){conditionDisplay(row,'zh-CN');conditionDisplay(row,'en');}
  assert.deepEqual(rows,baseline);assert.deepEqual(meta,before);
  assert.deepEqual(conditionDisplay({label:'Authored condition',note:'Authored note'},'zh-CN'),{label:'Authored condition',rounds:'',note:'Authored note'});
  const review=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/condition-material-translations.json')));
  for(const [file,hash]of Object.entries({...review.sourceSha256,...review.catalogSha256}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
 });
} finally {world.close();}
finish();
