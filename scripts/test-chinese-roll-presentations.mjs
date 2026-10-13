import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {call} from './lib/enforce-campaign.mjs';
import {openWorld} from './lib/enforce-world.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
const root=path.resolve(import.meta.dirname,'..');
const storage=await openWorld();
const {test,finish}=suite('test-chinese-roll-presentations');
const {openCombatRenderer}=await import('./lib/combat-ui-fixtures.mjs');
const {BASE_ROLL,rollPresentationRows,rollPresentationFixtures}=await import('./lib/roll-presentation-fixtures.mjs');
const {parseRollPresentation}=await import('../src/lib/roll-presentation.ts');
const {rollPresentationLabel,rollNoteLabel,rollActionLabel,pendingRollReason}=await import('../src/lib/i18n/roll-presentations.ts');
const {localizedRollCardLabel}=await import('../src/lib/i18n/combat-ui-presentations.ts');
const {insertRoll,getRoll,listRecentRolls}=await import('../src/lib/db/rolls.ts');
const {getDatabase}=await import('../src/lib/db/core.ts');
const {listOpenPendingRolls,getPendingRoll}=await import('../src/lib/db/dm-turns.ts');
const {setMemberRealDice}=await import('../src/lib/db/campaigns.ts');
const {redactRoll}=await import('../src/lib/dm/viewer.ts');
const {table,FIGHTER,closeTables}=await import('./lib/enforce-spell-kit.mjs');
const {layMap}=await import('./lib/enforce-spells.mjs');
const renderer=await openCombatRenderer();
const zh=rollPresentationFixtures(renderer,'zh-CN');
const html=name=>{const row=zh.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const restart=()=>{getDatabase().close();globalThis.__localRoleplayDb=undefined;getDatabase();};

await test('25 original English roll-card renders remain exact; Chinese captions retain proper and authored names',()=>{
 assert.deepEqual(rollPresentationFixtures(renderer),readValidationJson(path.join(root,'docs/validation/roll-presentation-goldens.json')));
 assert.match(html('target/enemy'),/长剑.*哥布林 2/);
 assert.match(html('target/proper'),/长剑.*Goblin/);assert.doesNotMatch(html('target/proper'),/哥布林/);
 assert.match(html('target/punctuation'),/Goblin, vs Mira &lt;script&gt;_2/);
 assert.match(html('area/mixed'),/火球术.*哥布林 2、Goblin/);
 assert.match(html('area/comma'),/Goblin, Goblin 2、哥布林 2/);
 assert.match(html('area/unnamed'),/范围效果.*火焰/);
 assert.match(html('area/hidden-caster'),/未现身者/);assert.doesNotMatch(html('area/hidden-caster'),/Someone unseen/);
 for(const name of ['target/authored','action/Authored attack <script>','area/authored','custom'])assert.match(html(name),/Authored|Goblin King Gruk/);
 assert.match(html('death/plain'),/死亡豁免/);assert.match(html('death/recovery'),/Goblin恢复 1 点生命值所需的小时数（1d4）/);
 assert.match(html('action/Longsword (opportunity attack)'),/借机攻击/);
 assert.match(html('action/Acid Arrow (half on a miss)'),/未命中时造成一半伤害/);
 assert.match(html('action/Bite (CRIT)'),/啮咬（重击）/);
 const old={...BASE_ROLL,detail:'Longsword vs Goblin'};
 assert.match(localizedRollCardLabel(old,'Aria','zh-CN'),/Goblin/);assert.doesNotMatch(localizedRollCardLabel(old,'Aria','zh-CN'),/哥布林/);
});
await test('stock death modifiers and hazard frames preserve mechanics, while unknown note prose stays literal',()=>{
 for(const name of ["Order's Wrath",'Bite again (Stand Against the Tide)','Bite (Stand Against the Tide)','Longsword again, at disadvantage (Protection)']) {
  assert.equal(rollActionLabel(name,'en'),name);
  assert.doesNotMatch(rollActionLabel(name,'zh-CN'),/[A-Za-z]{3,}/,name);
 }
 assert.match(rollActionLabel('Authored strike again, at disadvantage (Protection)','zh-CN'),/Authored strike/);
 for(const name of ['Authored strike','Authored strike again (Authored reaction)','Authored strike (Authored reaction)']) assert.equal(rollActionLabel(name,'zh-CN'),name);
 assert.match(html('death/notes'),/力竭 3 级.*豁免具有劣势/);
 assert.match(html('death/notes'),/祝福.*\+1d4/);assert.match(html('death/notes'),/灾祸.*-1d4/);
 assert.match(html('death/notes'),/Goblin的灵光.*10 英尺.*\+3/);
 assert.match(html('death/notes'),/Authored effect/);
 assert.equal(rollNoteLabel('Authored prose <script>','zh-CN'),'Authored prose <script>');
 assert.equal(rollActionLabel('20 ft fall (2d6 bludgeoning)','zh-CN'),'坠落 20 英尺（2d6 钝击伤害）');
 assert.equal(rollActionLabel('20 ft fall into Goblin (2d6 bludgeoning)','zh-CN'),'坠落 20 英尺，落入Goblin（2d6 钝击伤害）');
 assert.match(rollActionLabel('Prismatic Spray (red)','zh-CN'),/红色/);
 for(const row of rollPresentationRows()){const before=structuredClone(row);renderer.render('RollCard',{roll:row.roll,characterName:row.characterName},'zh-CN');assert.deepEqual(row,before);}
});
await test('malformed or future caption data falls back safely; new projection cannot carry result fields or IDs',()=>{
 for(const raw of [null,[],{kind:'future'},{kind:'against',what:'Bite',target:{name:'Goblin',kind:'untrusted'}},{kind:'area',what:'Fireball',targets:[null]},{kind:'death-save',notes:[null]},{kind:'death-save',notes:Array(1)},{kind:'area',what:'Fireball',targets:Array(1)},{kind:'area',what:'Fireball',targets:[],actorUnseen:false}]){
  assert.equal(parseRollPresentation(raw),undefined);assert.equal(rollPresentationLabel(raw,'zh-CN'),undefined);
  assert.doesNotThrow(()=>localizedRollCardLabel({...BASE_ROLL,presentation:raw},'Aria','zh-CN'));
 }
 const p=parseRollPresentation({kind:'against',what:'Bite',target:{name:'Goblin',kind:'proper',id:'secret'},dc:99,total:666,success:true});
 assert.deepEqual(p,{kind:'against',what:'Bite',target:{name:'Goblin',kind:'proper'}});
 const blind=redactRoll({...BASE_ROLL,presentation:p});
 const rendered=renderer.render('RollCard',{roll:blind,characterName:'Goblin'},'zh-CN');
 assert.match(rendered,/在屏幕后掷骰/);assert.doesNotMatch(rendered,/99|666|secret|= 3/);
});
await test('new roll captions survive reopening; legacy database rows upgrade with no invented metadata',()=>{
 const presentation={kind:'against',what:'Longsword',target:{name:'Goblin',kind:'proper'}};
 const roll=insertRoll({campaignId:storage.campaignId,requestedBy:'dm',kind:'attack',attacker:null,detail:'Longsword vs Goblin',presentation,result:BASE_ROLL.breakdown});
 restart();assert.deepEqual(getRoll(roll.id).presentation,presentation);
 getDatabase().exec('ALTER TABLE rolls DROP COLUMN presentation_json; ALTER TABLE pending_rolls DROP COLUMN presentation_json');
 restart();const old=getRoll(roll.id);assert.equal(old.detail,'Longsword vs Goblin');assert.equal(old.presentation,undefined);
 for(const table of ['rolls','pending_rolls'])assert.ok(getDatabase().prepare('PRAGMA table_info('+table+')').all().some(row=>row.name==='presentation_json'));
});
await test('real physical attack, damage and restart preserve target roles without publishing private adjudication data',async()=>{
 const {world,sheets:[hero],enemies:[enemy]}=await table([{...FIGHTER,name:'Goblin'}],1,{}, {gameSettings:{dicePolicy:'real_allowed'}});
 setMemberRealDice(world.campaignId,hero.userId,true);
 const outcome=await world.invoke('pc_attack',{characterId:hero.id,targetEnemyId:enemy.id,enemyId:enemy.id});assert.equal(outcome.ok,true,outcome.error);
 const route=await world.route('campaigns/[campaignId]/pending-rolls/[pendingRollId]');
 for(const [kind,faces]of [['attack',[18]],['damage',[5]]]){
  const pending=listOpenPendingRolls(world.campaignId).find(row=>row.kind===kind);assert.ok(pending,kind);
  assert.deepEqual(pending.presentation.target,{name:enemy.displayName,kind:'enemy'});
  const props={campaignId:world.campaignId,pending,sheets:[hero],members:[{userId:hero.userId,useRealDice:true,holdRolls:false}],meUserId:hero.userId,steersStory:false};
  const caption=renderer.render('PendingRollCard',props,'zh-CN');assert.match(caption,/长剑.*哥布林/);assert.doesNotMatch(caption,/attack against|damage against/);
  const legacy=structuredClone(pending);delete legacy.presentation;
  assert.equal(renderer.render('PendingRollCard',props),renderer.render('PendingRollCard',{...props,pending:legacy}));
  assert.equal(pendingRollReason({...pending,reason:'Authored reason'},'zh-CN'),'Authored reason');
  assert.doesNotMatch(JSON.stringify(pending.presentation),/targetAc|targetEnemyId|enemyId|dc/);
  restart();assert.deepEqual(getPendingRoll(pending.id).presentation,pending.presentation);
  world.signIn({id:hero.userId});const out=await call(route,'POST',{dice:faces},{campaignId:world.campaignId,pendingRollId:pending.id});assert.equal(out.status,200,JSON.stringify(out.json));
 }
 const rolls=listRecentRolls(world.campaignId,100).filter(row=>['attack','damage'].includes(row.kind));assert.equal(rolls.length,2);
 for(const roll of rolls){assert.equal(roll.presentation.physical,true);assert.equal(roll.presentation.target.kind,'enemy');assert.equal(roll.detail,'Longsword vs '+enemy.displayName+' (physical)');assert.match(renderer.render('RollCard',{roll,characterName:hero.name},'zh-CN'),/Goblin.*哥布林.*实体骰/);}
});
await test('actual area damage excludes hidden targets and caster names, preserving a player named Goblin',async()=>{
 const {world,sheets:[hero],enemies:[hiddenCaster,shown,hiddenTarget]}=await table([{...FIGHTER,name:'Goblin'}],3,{spells:['Fireball']});
 await layMap(world,['..........','..........','..........'],{[hero.id]:{x:0,y:0},[hiddenCaster.id]:{x:7,y:1},[shown.id]:{x:2,y:1},[hiddenTarget.id]:{x:3,y:1}});
 for(const enemy of [hiddenCaster,hiddenTarget])getDatabase().prepare('UPDATE battle_tokens SET hidden=1 WHERE ref_id=?').run(enemy.id);
 world.dice(...Array(8).fill(3),1,1,1);
 const out=await world.invoke('aoe_damage',{casterEnemyId:hiddenCaster.id,spell:'Fireball',enemyIds:[shown.id,hiddenTarget.id],characterIds:[hero.id],saveAbility:'dex',dc:15,damage:'8d6',type:'fire'});world.clearDice();assert.equal(out.ok,true,out.error);
 const roll=listRecentRolls(world.campaignId,100).find(row=>row.kind==='damage');assert.ok(roll);
 assert.deepEqual(roll.presentation.targets,[{name:shown.displayName,kind:'enemy'},{name:hero.name,kind:'proper'}]);assert.equal(roll.presentation.actorUnseen,true);
 assert.equal(roll.detail,'Fireball on '+shown.displayName+', Goblin');
 for(const secret of [hiddenCaster.id,hiddenTarget.id,hiddenCaster.displayName,hiddenTarget.displayName])assert.ok(!JSON.stringify(roll.presentation).includes(secret));
 const rendered=renderer.render('RollCard',{roll,characterName:hero.name},'zh-CN');assert.match(rendered,/未现身者.*火球术.*哥布林 2、Goblin/);
});
await test('actual death-save and stable-recovery cards display in Chinese without changing their rolls or application',async()=>{
 const {rollDeathSave,rollStableTimer}=await import('../src/lib/dm/death.ts');
 const hero=storage.addHero({name:'Goblin',level:3});storage.patch(hero.id,{currentHp:0,exhaustion:3,conditions:['unconscious','blessed'],deathSaves:{successes:0,failures:0,stable:false,dead:false}});
 storage.dice(12,3,2);rollDeathSave(storage.campaign(),hero.id);storage.clearDice();
 const death=listRecentRolls(storage.campaignId,100).find(row=>row.presentation?.kind==='death-save');assert.ok(death);
 assert.equal(death.expression,'2d20kl1+1d4');assert.equal(death.total,5);assert.equal(storage.sheet(hero.id).deathSaves.failures,1);
 assert.match(renderer.render('RollCard',{roll:death,characterName:hero.name},'zh-CN'),/死亡豁免.*力竭 3 级.*祝福.*\+1d4/);
 const before=storage.sheet(hero.id);storage.dice(4);const timer=rollStableTimer(storage.campaign(),before);storage.clearDice();assert.equal(timer.hours,4);assert.deepEqual(storage.sheet(hero.id),before);
 const recovery=listRecentRolls(storage.campaignId,100).find(row=>row.presentation?.kind==='stable-recovery');assert.equal(recovery.total,4);assert.match(renderer.render('RollCard',{roll:recovery,characterName:hero.name},'zh-CN'),/恢复 1 点生命值所需的小时数（1d4）/);
});
await test('the source-compared caption catalog and stock note generators keep their reviewed fingerprints',()=>{
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/roll-presentation-translations.json'),'utf8'));
 for(const [file,hash]of Object.entries({...review.sourceSha256,...review.catalogSha256}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
});
closeTables();storage.close();finish();
