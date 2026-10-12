// Compound/native notice display and ephemeral actor context only. No live combat or model.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {boardMoveNoteText}=await import('../src/lib/i18n/board-control-presentations.ts');
const {boardMoveDamageDetails}=await import('../src/lib/i18n/board-move-effect-presentations.ts');
const {damageAdjust}=await import('../src/lib/dm/damage-logic.ts');
const {combatName}=await import('../src/lib/i18n/combat-ui-presentations.ts');
const {moveNotesFrom}=await import('../src/lib/battlemap/board-move.ts');
const actor='阿岚',names=[{name:actor,kind:'pc'},{name:'Rat',kind:'enemy'}];
const cases=[
 `${actor} takes 7 piercing damage from moving through Spike Growth and falls.`,
 `${actor} takes 7 damage from entering Wall of Fire and falls.`,
 `${actor} takes no damage from entering Wall of Fire.`,
 `${actor}'s Rat form drops to 0 hit points from moving through Spike Growth and its own form returns.`,
 `${actor}'s Rat form drops to 0 hit points from entering Wall of Fire and its own form returns. ${actor} takes 3 fire damage from entering Wall of Fire.`,
 `${actor}'s Rat form drops to 0 hit points from entering Wall of Fire and its own form returns. ${actor} takes 3 fire damage from entering Wall of Fire and falls.`,
 `Stinking Cloud drifts 10 feet away from ${actor} to (2,3).`,
 'The ground heaves under Earthquake.',
 'A fissure 30 feet deep opens along rows 2 to 3.',
 'A fissure 40 feet deep opens along columns 3 to 4.',
 `${actor} keeps their footing at the fissure's edge.`,
 "Rat keeps its footing at the fissure's edge.",
 `${actor} falls 30 feet into the fissure (9 bludgeoning) and lands prone.`,
 'Rat falls 30 feet into the fissure and lands prone. Rat takes 9 bludgeoning damage from falling 30 feet into a fissure.',
 'Rat falls 30 feet into the fissure and lands prone. Rat takes 9 bludgeoning damage from falling 30 feet into a fissure and falls.',
 "A fissure opening under a structure brings it down (narrate it); the board keeps the creatures that fell in where they stand, at the fissure's bottom.",
];
for(const source of cases){assert.equal(boardMoveNoteText(source,'en',names),source);const cn=boardMoveNoteText(source,'zh-CN',names);assert.notEqual(cn,source);assert(!/and falls|form returns|into a fissure|Stinking Cloud|Earthquake/.test(cn),cn);assert(source.includes(actor)?cn.includes(actor):true);}
for(const suffix of ['Authored outcome.','Unknown 17 stuff.']){const raw=`${actor}'s Rat form drops to 0 hit points from entering Wall of Fire and its own form returns. ${suffix}`;assert.equal(boardMoveNoteText(raw,'zh-CN',names),raw);}
assert.equal(boardMoveNoteText('Rat falls 30 feet into the fissure and lands prone. Authored ending.','zh-CN',names),'Rat falls 30 feet into the fissure and lands prone. Authored ending.');
assert.equal(boardMoveNoteText('Authored {note}.','zh-CN',names),'Authored {note}.');
assert.equal(boardMoveDamageDetails('7 coins, Authored {note}','zh-CN',name=>name),'7 coins、Authored {note}');
assert.equal(boardMoveDamageDetails(`${actor} is immune to coins damage: no damage`,'zh-CN',name=>name),`${actor} is immune to coins damage: no damage`);
let mitigations=0;
for(const [resist,immune,vulnerable,options]of [['fire','','',{}],['','fire','',{}],['','','fire',{}],['fire','','fire',{}],['','','',{resistAll:true}]]){
 const result=damageAdjust(7,'fire',resist,immune,vulnerable,options);assert(result.note);const raw=`${actor} is ${result.note}`,cn=boardMoveDamageDetails(raw,'zh-CN',name=>name);assert.notEqual(cn,raw);assert(cn.includes(actor));mitigations++;
}
const raw=`Rat takes an opportunity attack as ${actor} pulls away: hit for 7 damage (${actor} is resistant to fire damage: halved).`,cn=boardMoveNoteText(raw,'zh-CN',names);
assert(cn.includes('伤害掷骰为 7 点')&&cn.includes('伤害减半')&&!cn.includes('resistant'));assert.equal(damageAdjust(7,'fire','fire','','').amount,3);
const typed=boardMoveNoteText(`Rat takes an opportunity attack as ${actor} pulls away: a critical hit for 10 damage (7 piercing, 3 fire). ${actor} is prone and poisoned.`,'zh-CN',names);assert(typed.includes('7 点')&&typed.includes('3 点')&&!typed.includes('piercing')&&!typed.includes('poisoned'));
const file='src/app/campaigns/[campaignId]/BoardMoveNotes.tsx',fixture='\nexport function NotesFixture(props){props.capture(useMoveNotes());return null;}';
const r=await openCombatRenderer({files:[file],sourceOf:f=>fs.readFileSync(f,'utf8')+(f===file?fixture:'')}),before=await openCombatRenderer({files:[file],sourceOf:f=>f===file?execFileSync('git',['show',`29e8dad1:${f}`],{encoding:'utf8'}):fs.readFileSync(f,'utf8')});
for(const [i,source]of cases.entries()){const props={notes:[{id:1,text:source,tone:['move','ground','struck'][i%3]}],names};assert.equal(r.render('BoardMoveNotes',props,'en'),before.render('BoardMoveNotes',props,'en'));}
const originalTimeout=globalThis.setTimeout,originalClear=globalThis.clearTimeout;let controls;
try{
 globalThis.setTimeout=()=>1;globalThis.clearTimeout=()=>{};
 r.render('NotesFixture',{capture:value=>controls=value},'zh-CN');
 const source='Rat takes 4 fire damage from entering Wall of Fire and falls.',body={zoneEffects:[source]},bodyCopy=structuredClone(body),rows=[{name:'Rat',kind:'enemy'}];
 controls.push(moveNotesFrom(body),rows);const updater=r.updates().find(row=>typeof row.value==='function').value,shown=updater([]);assert.equal(shown[0].text,source);assert.equal(shown[0].id,1);assert.equal(shown[0].tone,'ground');assert.notEqual(shown[0].namesSnapshot[0],rows[0]);rows[0].name='Renamed';assert.equal(shown[0].namesSnapshot[0].name,'Rat');assert.deepEqual(body,bodyCopy);
 const html=r.render('BoardMoveNotes',{notes:shown,names:[]},'zh-CN');assert(html.includes(combatName('Rat','enemy','zh-CN'))&&!html.includes('Rat')&&html.includes('倒下'));
 assert(r.render('BoardMoveNotes',{notes:shown,names:[]},'en').includes(source));
}finally{globalThis.setTimeout=originalTimeout;globalThis.clearTimeout=originalClear;}
console.log(`PASS: ${cases.length} whole outcome frames/exact English renders, five actual mitigation notes, damage-roll distinction, unknown compounds preserved, raw body unchanged and actor snapshot after removal/rename (mock timers, no live engine/model).`);
