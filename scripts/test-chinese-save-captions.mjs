import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';import {saveCaptionRows,saveCaptionFixtures} from './lib/save-caption-fixtures.mjs';import {saveCallContracts} from './lib/save-caption-contracts.mjs';import {readValidationJson} from './lib/validation-json.mjs';
import {openWorld} from './lib/enforce-world.mjs';import {suite} from './lib/enforce-harness.mjs';
const root=path.resolve(import.meta.dirname,'..'),{test,finish}=suite('test-chinese-save-captions');
const {parseRollPresentation}=await import('../src/lib/roll-presentation.ts');const {rollPresentationLabel}=await import('../src/lib/i18n/roll-presentations.ts');const {localizedRollCardLabel}=await import('../src/lib/i18n/combat-ui-presentations.ts');
const renderer=await openCombatRenderer(),world=await openWorld();
const hero=world.addHero({name:'Goblin, vs 米拉_2',class:'fighter',level:2,abilities:{con:10,wis:10},proficiencies:{saves:['str','con'],skills:[],expertise:[],languages:['Common'],tools:[],armor:[],weapons:[]}});
const {listRecentRolls}=await import('../src/lib/db/rolls.ts');const {getDatabase}=await import('../src/lib/db/core.ts');const {rollEnemySave,rollCharacterSave}=await import('../src/lib/dm/forced-save.ts');const {saveRoll}=await import('../src/lib/roll-labels.ts');
const {getActiveEncounter,getEnemy,patchEnemyConditions,saveEncounter,setEnemyConcentration}=await import('../src/lib/db/encounters.ts');
const recent=()=>listRecentRolls(world.campaignId,100),caption=roll=>localizedRollCardLabel(roll,hero.name,'zh-CN');
await test('all 60 original save call inputs, flags, records and English details remain unchanged',()=>{
 const files=fs.readdirSync(path.join(root,'src/lib/dm')).filter(file=>file.endsWith('.ts')).map(file=>'src/lib/dm/'+file).sort();
 assert.deepEqual(saveCallContracts(files,file=>fs.readFileSync(path.join(root,file),'utf8')),readValidationJson(path.join(root,'docs/validation/save-caption-contracts.json')));
});
await test('23 original English component renders remain exact; Chinese purposes, sources and literal names render',()=>{
 assert.deepEqual(saveCaptionFixtures(renderer),readValidationJson(path.join(root,'docs/validation/save-caption-goldens.json')));
 const rows=saveCaptionFixtures(renderer,'zh-CN'),html=name=>rows.find(row=>row.name===name).html;
 for(const [name,words]of [['spell',['感知','定身人类']],['keep',['维持专注']],['concentration',['祝福']],['slayer',['法师杀手','劣势']],['zone',['地震术']],['fissure',['裂隙']],['violet',['虹彩喷射','紫色光线']],['hurt',['受伤后']],['end',['恐慌','结束']],['avoid',['魅惑']],['land',['落地时站稳']],['from-enemy',['哥布林 2 的','啮咬']],['from-proper',['Goblin, vs 米拉_2','自然庇护']],['authored',['Fireball']],['fortitude',['亡灵韧性']],['rage',['不屈狂暴']],['reroll',['不屈重掷']],['authored-reroll',['Goblin, vs _ &lt;script&gt;']],['dragon',['龙族威仪']],['palm',['颤震掌']],['mote',['潜能微光的爆发']]])for(const word of words)assert.ok(html(name).includes(word),name+': '+word+' in '+html(name));
 assert.match(html('enemy'),/哥布林 2/);assert.doesNotMatch(html('blind'),/Difficulty|难度 10|1d6|= 3/);
 for(const {roll}of saveCaptionRows()){const before=structuredClone(roll);rollPresentationLabel(roll.presentation,'zh-CN');assert.deepEqual(roll,before);}
});
await test('restored source metadata filters private fields and rejects malformed typed names and flags',()=>{
 const p={kind:'check',term:{kind:'ability',key:'con',dc:20},context:{kind:'save-from',name:'Bite',from:{kind:'enemy',name:'Goblin 2',id:'hidden'},literalName:true,secret:'private'},total:18};
 assert.deepEqual(parseRollPresentation(p),{kind:'check',term:{kind:'ability',key:'con'},context:{kind:'save-from',name:'Bite',from:{kind:'enemy',name:'Goblin 2'},literalName:true}});
 for(const context of [{kind:'save-from',name:'Bite'}, {kind:'save-from',name:'Bite',from:{kind:'future',name:'Goblin'}},{kind:'save-against',name:'Fireball',literalName:false},{kind:'future',name:'Fireball'}])assert.equal(parseRollPresentation({...p,context}),undefined);
});
await world.beginFight([{monster:'goblin',count:1}],{heroFaces:{[hero.id]:18}});let enemy=world.enemies()[0];
await test('recorded enemy saves preserve hidden visibility, dice and failures across restart; absent records stay absent',()=>{
 world.dice(11);const save=rollEnemySave(world.campaignId,enemy,'wis',12,{magical:true,record:saveRoll(`${enemy.displayName}: WIS save against Hold Person`,'wis',{kind:'save-against',name:'Hold Person'},{name:enemy.displayName,kind:'enemy'})});assert.equal(world.clearDice(),0);
 const stored=recent().at(-1);assert.equal(stored.detail,`${enemy.displayName}: WIS save against Hold Person`);assert.equal(stored.visibility,'dm');assert.equal(stored.total,save.total);assert.match(caption(stored),/哥布林.*定身人类/);
 const n=recent().length;world.dice(12);rollEnemySave(world.campaignId,enemy,'wis',12);assert.equal(world.clearDice(),0);assert.equal(recent().length,n);
 getDatabase().close();globalThis.__localRoleplayDb=undefined;assert.deepEqual(recent().find(r=>r.id===stored.id).presentation,stored.presentation);
});
await test('automatic failure and Legendary Resistance retain their no-roll and single-spend behavior',()=>{
 const held={...enemy,conditions:['paralyzed'],conditionMeta:{}};const n=recent().length;
 world.diceLog();let out=rollEnemySave(world.campaignId,held,'dex',10,{record:saveRoll('DEX save against Fireball','dex',{kind:'save-against',name:'Fireball'})});assert.equal(out.autoFailed,true);assert.equal(out.total,null);assert.equal(world.diceLog().length,0);assert.equal(recent().length,n);
 const encounter=getActiveEncounter(world.campaignId);encounter.legendary.pools[enemy.id]={actions:3,resistances:1};saveEncounter(encounter);
 out=rollEnemySave(world.campaignId,held,'dex',10,{resist:true,record:saveRoll('DEX save against Fireball','dex',{kind:'save-against',name:'Fireball'})});assert.equal(out.success,true);assert.equal(out.legendaryResistance,true);assert.equal(getActiveEncounter(world.campaignId).legendary.pools[enemy.id].resistances,0);assert.equal(recent().length,n);
 world.patch(hero.id,{conditions:['paralyzed'],conditionMeta:{}});out=rollCharacterSave(world.campaign(),null,world.sheet(hero.id),'dex',10,saveRoll('DEX save against Fireball','dex',{kind:'save-against',name:'Fireball'}));assert.equal(out.autoFailed,true);assert.equal(recent().length,n);world.patch(hero.id,{conditions:[],conditionMeta:{}});
});
await test('real condition-end upkeep rolls once per holder, releases conditions and preserves PC/enemy visibility',async()=>{
 const {endTurnSaves}=await import('../src/lib/dm/condition-tick.ts');
 const meta={frightened:{saveEnds:{ability:'wis',dc:10},source:hero.id,spell:'Fear'}};
 patchEnemyConditions(enemy.id,['frightened'],meta);world.patch(hero.id,{conditions:['frightened'],conditionMeta:meta});const before=new Set(recent().map(r=>r.id));
 world.dice(20,20);endTurnSaves(world.campaign(),getActiveEncounter(world.campaignId),[hero.id,enemy.id]);assert.equal(world.clearDice(),0);
 const rolls=recent().filter(r=>!before.has(r.id));assert.equal(rolls.length,2);assert.deepEqual(rolls.map(r=>r.visibility).sort(),['dm','public']);for(const roll of rolls){assert.equal(roll.presentation.context.kind,'end-condition');assert.match(caption(roll),/结束.*恐慌/);assert.match(roll.detail,/WIS save to end frightened/);assert.equal(roll.dc,10);}
 assert.ok(!getEnemy(enemy.id).conditions.includes('frightened'));assert.ok(!world.sheet(hero.id).conditions.includes('frightened'));
});
await test('real on-hit rider keeps its save DC/outcome and source identity without translating a proper player name',async()=>{
 const {resolveOnHit}=await import('../src/lib/dm/enemy-hit.ts');const {createDmTurn}=await import('../src/lib/db/dm-turns.ts');const turn=createDmTurn(world.campaignId,[],'human_dm');const sheet=world.sheet(hero.id);
 world.dice(1);const out=resolveOnHit(world.campaign(),turn,getEnemy(enemy.id),{name:'Bite',onHit:{save:'con',dc:12,condition:'poisoned'}},hero.id,{sheets:[sheet],sheetsById:new Map([[sheet.id,sheet]])});assert.equal(world.clearDice(),0);assert.equal(out.riderSaved,false);
 const roll=recent().at(-1);assert.equal(roll.detail,`${hero.name}: CON save vs ${enemy.displayName}'s Bite`);assert.equal(roll.dc,12);assert.equal(roll.total,3);assert.match(caption(roll),/Goblin, vs 米拉_2.*哥布林.*啮咬/);assert.ok(world.sheet(hero.id).conditions.includes('poisoned'));world.patch(hero.id,{conditions:[],conditionMeta:{}});
 const {redactRoll}=await import('../src/lib/dm/viewer.ts');const secret=recent().find(r=>r.visibility==='dm');const hidden=redactRoll(secret);assert.equal(hidden.total,null);assert.equal(hidden.dc,null);assert.equal(hidden.breakdown,null);
});
await test('real enemy damage concentration records its spell and disadvantage but preserves one save and HP application',async()=>{
 const {applyEnemyDamage}=await import('../src/lib/dm/enemy-damage.ts');const {createDmTurn}=await import('../src/lib/db/dm-turns.ts');const turn=createDmTurn(world.campaignId,[],'human_dm');const sheet=world.sheet(hero.id);setEnemyConcentration(enemy.id,'Bless');const before=getEnemy(enemy.id);
 world.diceLog();world.dice(20,20);applyEnemyDamage(world.campaign(),turn,getActiveEncounter(world.campaignId),before,1,[sheet],new Map([[sheet.id,sheet]]),'force',{concentrationDisadvantage:true});assert.equal(world.clearDice(),0);
 const roll=recent().at(-1);assert.equal(roll.kind,'saving_throw');assert.equal(roll.visibility,'dm');assert.equal(roll.advantage,'disadvantage');assert.equal(roll.dc,10);assert.equal(roll.presentation.context.kind,'concentration-slayer');assert.match(roll.detail,/Mage Slayer: disadvantage/);assert.match(caption(roll),/祝福.*法师杀手.*劣势/);assert.equal(getEnemy(enemy.id).currentHp,before.currentHp-1);assert.equal(getEnemy(enemy.id).concentration,'Bless');assert.equal(world.diceLog().filter(d=>d.sides===20).length,2);
});
await test('feature rerolls retain English rule-facing labels and custom names stay literal even if they match a spell',async()=>{
 const {rollFeatureSave}=await import('../src/lib/dm/contest-roll.ts');
 world.dice(15);rollFeatureSave(world.campaign(),world.sheet(hero.id),'con',10,'Indomitable reroll',undefined,{kind:'feature-reroll',name:'Indomitable'});assert.equal(world.clearDice(),0);let roll=recent().at(-1);assert.equal(roll.detail,`${hero.name}: CON save, Indomitable reroll`);assert.match(caption(roll),/体质.*不屈重掷/);
 world.dice(15);rollFeatureSave(world.campaign(),world.sheet(hero.id),'con',10,'Fireball');assert.equal(world.clearDice(),0);roll=recent().at(-1);assert.match(caption(roll),/Fireball/);assert.doesNotMatch(caption(roll),/火球术/);
});
await test('source-compared fingerprints and prior resources/baselines retain recorded integrity',()=>{
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/save-caption-translations.json')));
 for(const [file,hash]of Object.entries(review.sourceSha256))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
});
world.close();finish();
