import assert from 'node:assert/strict';
import {assertReviewedMessages} from './lib/reviewed-messages.mjs';
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {openWorld} from './lib/enforce-world.mjs';import {suite} from './lib/enforce-harness.mjs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';import {specialCaptionRows,specialCaptionFixtures} from './lib/special-caption-fixtures.mjs';import {specialCallContracts} from './lib/special-caption-contracts.mjs';import {readValidationJson} from './lib/validation-json.mjs';
const root=path.resolve(import.meta.dirname,'..'),{test,finish}=suite('test-chinese-special-captions'),world=await openWorld(),renderer=await openCombatRenderer();
const {parseRollPresentation}=await import('../src/lib/roll-presentation.ts');const {localizedRollCardLabel}=await import('../src/lib/i18n/combat-ui-presentations.ts');
const {listRecentRolls}=await import('../src/lib/db/rolls.ts');const {getDatabase}=await import('../src/lib/db/core.ts');const {createDmTurn}=await import('../src/lib/db/dm-turns.ts');
const {saveRoll,specialRoll}=await import('../src/lib/roll-labels.ts');const {characterSave,publicDie}=await import('../src/lib/dm/between-io.ts');
const hero=world.addHero({name:'Goblin, vs 米拉_2',class:'fighter',level:2,maxHp:30,abilities:{con:10}}),recent=()=>listRecentRolls(world.campaignId,200),last=()=>recent().at(-1),caption=roll=>localizedRollCardLabel(roll,hero.name,'zh-CN');
await test('94 original call contracts preserve dice, DC, result inputs, English details and visibility',()=>{
 const files=[...new Set(readValidationJson(path.join(root,'docs/validation/special-caption-contracts.json')).map(row=>row.file))];
 assert.deepEqual(specialCallContracts(files,file=>fs.readFileSync(path.join(root,file),'utf8')),readValidationJson(path.join(root,'docs/validation/special-caption-contracts.json')));
});
await test('52 original English component renders stay exact; Chinese captions preserve types, thresholds, units and proper names',()=>{
 assert.deepEqual(specialCaptionFixtures(renderer),readValidationJson(path.join(root,'docs/validation/special-caption-goldens.json')));
 const rows=specialCaptionFixtures(renderer,'zh-CN'),html=name=>rows.find(row=>row.name===name).html;
 for(const [name,text] of [['heal','回气'],['heal','治疗量'],['heal-target','Goblin, vs 米拉_2'],['temp','临时生命值'],['max','上限增量'],['pool','生命值总量'],['poison','刺客之血'],['hours','小时数'],['charges','充能次数'],['last','最后一次'],['dawn','黎明'],['ray','哥布林 2'],['ray-proper','Goblin, vs 米拉_2'],['kit','2 枚生命骰'],['rest','1 枚生命骰'],['rest-extras','休憩曲 d6 + 厨师 d8'],['mirror','8 或更高'],['blink','11 或更高'],['intervention','10 或更低'],['gold','2d6 × 10'],['onset','视腐病'],['onset','天数'],['onset-authored','Fireball'],['madness-long','长期疯狂效果'],['madness-hours','每点 10 小时'],['fever-dc','降低值'],['stabilize','稳定'],['scroll','火球术卷轴'],['midnight','午夜之泪'],['round','第 2 轮'],['forced-march','第 9 小时'],['escape','力量或敏捷'],['enemy','哥布林 2'],['literal','Fireball']]) assert.ok(html(name).includes(text),name+': '+text+' in '+html(name));
 assert.doesNotMatch(html('blind'),/Difficulty|难度|1d6|= 3/);assert.doesNotMatch(html('onset-authored'),/火球术/);
 for(const {roll}of specialCaptionRows()){const before=structuredClone(roll);caption(roll);assert.deepEqual(roll,before);}
});
await test('restored special metadata strips results and IDs, malformed variants fall back; authored same-name captions remain literal',()=>{
 const raw={kind:'special',context:{kind:'healing-target',name:'Fireball',literalName:true,target:{kind:'proper',name:'Goblin',id:'private'},dice:'1d8',secret:'hidden'},owner:{kind:'enemy',name:'Goblin 2',id:'private'},total:99};
 assert.deepEqual(parseRollPresentation(raw),{kind:'special',context:{kind:'healing-target',name:'Fireball',literalName:true,target:{kind:'proper',name:'Goblin'},dice:'1d8'},owner:{kind:'enemy',name:'Goblin 2'}});
 for(const context of [{kind:'healing-target',name:'Cure Wounds'},{kind:'healing',name:'Fireball',literalName:false},{kind:'mirror',threshold:NaN},{kind:'short-rest',count:1,songDie:6},{kind:'affliction-onset',name:'Fever',unit:'minutes'},{kind:'madness',term:{toString(){throw Error('must not coerce')}}},{kind:'future'}]) assert.equal(parseRollPresentation({...raw,context}),undefined);
 assert.equal(parseRollPresentation({kind:'check',term:{kind:'ability',key:'con'},context:{kind:'hourly-endurance',activity:{toString(){throw Error('must not coerce')}},hour:1}}),undefined);
});
await test('real healing potion preserves one inventory spend, original total and HP ceiling with localized dice caption',async()=>{
 world.patch(hero.id,{currentHp:28,equipment:[{name:'Potion of Healing',qty:2}]});world.diceLog();world.dice(3,4);
 const out=await world.invoke('use_item',{characterId:hero.id,item:'Potion of Healing'});assert.equal(out.ok,true,out.error);assert.equal(world.clearDice(),0);
 assert.equal(world.sheet(hero.id).currentHp,30);assert.equal(world.sheet(hero.id).equipment[0].qty,1);assert.deepEqual(world.diceLog().map(d=>d.sides),[4,4]);assert.equal(last().total,9);assert.equal(last().detail,'Potion of Healing (2d4+2)');assert.match(caption(last()),/治疗药水.*治疗量.*2d4\+2/);
});
await test('Second Wind keeps one resource use and refuses a second use, without rerolling',async()=>{
 world.patch(hero.id,{currentHp:5,resources:{second_wind:{max:1,used:0}}});world.dice(6);
 const out=await world.invoke('use_resource',{characterId:hero.id,resource:'second_wind'});assert.equal(out.ok,true,out.error);assert.equal(world.clearDice(),0);assert.equal(world.sheet(hero.id).resources.second_wind.used,1);assert.equal(world.sheet(hero.id).currentHp,13);assert.match(caption(last()),/回气.*治疗量/);const count=recent().length;
 const again=await world.invoke('use_resource',{characterId:hero.id,resource:'second_wind'});assert.equal(again.ok,false);assert.equal(recent().length,count);
});
await test('poison potion preserves damage then save, DC and single consumption; scroll failure burns the scroll without spending a slot',async()=>{
 world.patch(hero.id,{currentHp:30,conditions:[],conditionMeta:{},equipment:[{name:'Potion of Poison',qty:1}]});const before=new Set(recent().map(r=>r.id));world.dice(2,2,2,20);
 const out=await world.invoke('use_item',{characterId:hero.id,item:'Potion of Poison'});assert.equal(out.ok,true,out.error);assert.equal(world.clearDice(),0);assert.equal(world.sheet(hero.id).currentHp,24);assert.equal(world.sheet(hero.id).equipment.length,0);
 const rolls=recent().filter(r=>!before.has(r.id));assert.equal(rolls.length,2);assert.equal(rolls[0].total,6);assert.equal(rolls[1].dc,13);assert.equal(rolls[1].success,true);assert.match(caption(rolls[0]),/毒素伤害/);assert.match(caption(rolls[1]),/体质.*豁免/);
 const mage=world.addHero({class:'wizard',level:1,maxHp:10,abilities:{int:16},spellcasting:{ability:'int',slots:{1:{max:2,used:0}},prepared:[],known:[],cantrips:[]},equipment:[{name:'Spell Scroll (Fireball)',qty:1}]});world.patch(mage.id,{equipment:[{name:'Spell Scroll (Fireball)',qty:1}]});world.dice(2);
 const failed=await world.invoke('use_item',{characterId:mage.id,item:'Spell Scroll (Fireball)'});assert.equal(failed.ok,true,failed.error);assert.equal(failed.result.spellCast,false);assert.equal(world.clearDice(),0);assert.equal(world.sheet(mage.id).equipment.length,0);assert.equal(world.sheet(mage.id).spellcasting.slots['1'].used,0);assert.equal(last().dc,13);assert.equal(last().total,5);assert.match(caption(last()),/智力.*火球术卷轴/);
});
await test('short-rest dice and extras roll once, keep HP ceiling, spent hit dice and presentation across reopening',async()=>{
 const {spendHitDice}=await import('../src/lib/dm/hit-dice.ts');world.patch(hero.id,{currentHp:29,conditions:[],conditionMeta:{},hitDice:{die:'d10',total:2,spent:0}});world.diceLog();world.dice(6,3,4);
 const out=spendHitDice({campaign:world.campaign(),turnId:null,sheetId:hero.id,requested:1,songDie:'d6',chefDie:'d8',reason:'short rest',requestedBy:'player'});assert.ok(!out.error,out.error);assert.equal(world.clearDice(),0);assert.equal(world.sheet(hero.id).currentHp,30);assert.equal(world.sheet(hero.id).hitDice.spent,1);assert.deepEqual(world.diceLog().map(d=>d.sides),[10,6,8]);const roll=last();assert.equal(roll.detail,'short rest: 1 hit die + Song of Rest d6 + Chef d8');assert.match(caption(roll),/1 枚生命骰.*休憩曲 d6.*厨师 d8/);
 getDatabase().close();globalThis.__localRoleplayDb=undefined;assert.deepEqual(recent().find(r=>r.id===roll.id).presentation,roll.presentation);
});
await test('downtime automatic failure produces no dice; two endurance hours keep separate DCs, one exhaustion and two turn roll IDs',async()=>{
 const {hourlyConSaves}=await import('../src/lib/dm/endurance.ts');world.patch(hero.id,{conditions:['paralyzed'],conditionMeta:{},exhaustion:0});const before=recent().length;world.diceLog();const save=characterSave(world.campaign(),world.sheet(hero.id),{ability:'dex',dc:13,detail:saveRoll('DEX save vs authored','dex',{kind:'save-against',name:'Fireball',literalName:true})});assert.equal(save.autoFailed,true);assert.equal(recent().length,before);assert.equal(world.diceLog().length,0);
 world.patch(hero.id,{conditions:[],conditionMeta:{}});const sheet=world.sheet(hero.id),turn=createDmTurn(world.campaignId,[],'human_dm');world.dice(1,20);
 const hours=hourlyConSaves({campaign:world.campaign(),turn,sheet,hours:[{hour:1,dc:11},{hour:2,dc:12}],detail:hour=>saveRoll(`${sheet.name}: CON save vs forced march, hour ${8+hour}`,'con',{kind:'hourly-endurance',activity:'forced-march',hour:8+hour},{name:sheet.name,kind:'proper'}),reason:'forced march',sheets:[sheet],sheetsById:new Map([[sheet.id,sheet]])});assert.equal(world.clearDice(),0);assert.deepEqual(hours.map(h=>h.failed),[true,false]);assert.equal(world.sheet(hero.id).exhaustion,1);assert.equal(turn.rollIds.length,2);assert.deepEqual(recent().slice(-2).map(r=>r.dc),[11,12]);assert.match(caption(last()),/第 10 小时.*体质/);
 world.patch(hero.id,{conditions:[],conditionMeta:{},exhaustion:0});
});
await test('real madness uses one effect die and a duration in tens of hours, without altering the clock multiplier',async()=>{
 const {inflictMadness}=await import('../src/lib/dm/afflictions.ts');world.dice(1,2);const out=inflictMadness(world.campaign(),'human',world.sheet(hero.id),'long',{});assert.equal(world.clearDice(),0);assert.equal(out.lasts,'20 hours');assert.equal(last().total,2);assert.match(caption(last()),/每点 10 小时/);assert.match(caption(recent().at(-2)),/长期疯狂效果/);world.patch(hero.id,{conditions:[],conditionMeta:{}});
});
await test('Mirror Image threshold rolls only once and keeps the duplicate transition',async()=>{
 const {mirrorImageDecoy}=await import('../src/lib/dm/spell-defenses.ts');world.patch(hero.id,{conditions:['mirror image'],conditionMeta:{}});world.dice(6);const out=mirrorImageDecoy(world.campaignId,hero.id,20);assert.equal(world.clearDice(),0);assert.ok(out);assert.ok(world.sheet(hero.id).conditions.includes('mirror image (2)'));assert.match(caption(last()),/6 或更高/);world.patch(hero.id,{conditions:[],conditionMeta:{}});
});
await test('DM-only special rolls stay private and safe when redacted; unannotated freeform details remain exact',async()=>{
 const {dmRoll}=await import('../src/lib/dm/roll-card.ts'),{redactRoll}=await import('../src/lib/dm/viewer.ts');world.dice(3);dmRoll(world.campaignId,null,'custom',specialRoll('Goblin 2: Confusion',{kind:'confusion'},{kind:'enemy',name:'Goblin 2'}),'1d10');assert.equal(world.clearDice(),0);const roll=last();assert.equal(roll.visibility,'dm');assert.match(caption(roll),/哥布林 2.*困惑术/);const hidden=redactRoll(roll);assert.equal(hidden.total,null);assert.equal(hidden.breakdown,null);assert.equal(hidden.dc,null);
 world.dice(3);publicDie(world.campaign(),world.sheet(hero.id),'1d6','Authored Fireball, vs Goblin');assert.equal(world.clearDice(),0);assert.equal(last().presentation,undefined);assert.equal(last().detail,'Authored Fireball, vs Goblin');
});
await test('real enemy spell escape uses the original best ability modifier and spends one action, with a DM-only caption',async()=>{
 const {getActiveEncounter,getEnemy,patchEnemyConditions}=await import('../src/lib/db/encounters.ts');const {spellMechanicsFor}=await import('../src/lib/content/index.ts');const {enemySpellEscape}=await import('../src/lib/dm/spell-escape.ts');
 await world.beginFight([{monster:'goblin',count:1}],{heroFaces:{[hero.id]:20}});const enemy=world.enemies()[0],held=spellMechanicsFor({spell:'Web'}).mech.condition.name;patchEnemyConditions(enemy.id,[held],{[held]:{spell:'Web',source:hero.id}});const turn=createDmTurn(world.campaignId,[],'human_dm');const before=new Set(recent().map(r=>r.id));world.dice(20);
 const out=enemySpellEscape(world.campaign(),turn,getEnemy(enemy.id));assert.equal(world.clearDice(),0);assert.equal(out.ok,true,out.error);assert.equal(out.success,true);const rolls=recent().filter(r=>!before.has(r.id));assert.equal(rolls.length,1);assert.equal(rolls[0].visibility,'dm');assert.equal(rolls[0].total,20+Math.floor(((enemy.stats.abilities?.str??10)-10)/2));assert.equal(turn.rollIds.length,1);assert.match(caption(rolls[0]),/哥布林.*力量.*蛛网术/);assert.ok(!getEnemy(enemy.id).conditions.includes(held));const n=recent().length;const refused=enemySpellEscape(world.campaign(),turn,getEnemy(enemy.id));assert.ok(refused.error);assert.equal(recent().length,n);assert.ok(getActiveEncounter(world.campaignId));
});
await test('source-reviewed fingerprints remain exact',()=>{
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/special-caption-translations.json')));
 for(const [file,hash] of Object.entries(review.sourceSha256))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
 assertReviewedMessages(review);
});
world.close();finish();
