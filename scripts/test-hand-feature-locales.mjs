// New technique/refusal display paths only; no model or full rules suite.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {AUTHORED_TABLE}=await import('../src/lib/srd/authored-effects.ts');
const {authoredBonusAttackProblem}=await import('../src/lib/srd/authored-economy.ts');
const {subclassSpendCards}=await import('../src/lib/battlemap/hand-subclass.ts');
const {FRESH_TURN}=await import('../src/lib/battlemap/hand-core.ts');
const {freshBudget}=await import('../src/lib/dm/action-budget.ts');
const {checkAttackOptions}=await import('../src/lib/dm/pc-attack-options.ts');
const {inspirationProblem,strokeOfLuckProblem}=await import('../src/lib/dm/attack-features.ts');
const {hurlProblem}=await import('../src/lib/dm/attack-choice-rules.ts');
const {noBonusRoute}=await import('../src/lib/dm/bonus-routes.ts');
const {intentBody}=await import('../src/lib/battlemap/hand-play.ts');
const {handTermLabel,handCardName}=await import('../src/lib/i18n/hand-presentations.ts');
const {handRefusalText,handChoiceLabel,handCardMaterial}=await import('../src/lib/i18n/hand-material-presentations.ts');
const names=new Set();
for(const [key,row]of Object.entries(AUTHORED_TABLE))if(row.spends?.length||row.reactions?.length||row.effects?.some(e=>['bonus_attack','bonus_route'].includes(e.kind))){names.add(key.split('::')[1]);for(const s of row.spends??[])names.add(s.name);for(const r of row.reactions??[])names.add(r.name);}
const maneuvers=JSON.parse(fs.readFileSync(new URL('../src/lib/srd/options.json',import.meta.url),'utf8')).options.filter(row=>/maneuver/i.test(row.k)).map(row=>row.n);
for(const name of [...names,...maneuvers]){assert.equal(handTermLabel(name,'en'),name);assert.notEqual(handTermLabel(name,'zh-CN'),name,name);}
const actor="Aria: [v2]'s 3.7";
const sheet={id:'s1',campaignId:'c1',userId:'u1',name:actor,race:'human',class:'fighter',subclass:'',level:7,classes:[],
 abilities:{str:16,dex:14,con:14,int:16,wis:12,cha:10},maxHp:40,currentHp:40,tempHp:0,ac:12,acOverride:false,speed:30,
 proficiencies:{saves:[],skills:[],expertise:[],languages:[],tools:[],armor:[],weapons:[]},equipment:[],feats:[],features:[],spellcasting:null,
 conditions:[],conditionMeta:{},resources:{},wildShape:null,exhaustion:0,deathSaves:null,concentratingOn:null};
const native=structuredClone(sheet),numbers=text=>text.match(/[+-]?\d+(?:\.\d+)?/g);
let refusals=0;
const check=(raw)=>{assert.equal(typeof raw,'string');const zh=handRefusalText(raw,'zh-CN');assert.notEqual(zh,raw,raw);assert.match(zh,/\p{Script=Han}/u);assert.equal(handRefusalText(raw,'en'),raw);assert.deepEqual(numbers(zh),numbers(raw));if(raw.includes(actor))assert(zh.includes(actor),zh);refusals++;return zh;};
check(inspirationProblem(sheet,true));check(strokeOfLuckProblem(sheet,true));check(strokeOfLuckProblem({...sheet,class:'rogue',level:20},true));
check(hurlProblem(sheet,true));check(hurlProblem({...sheet,class:'warlock',subclass:'The Fiend',level:14},true));
for(const action of ['dodge','dash','disengage','hide'])check(noBonusRoute(sheet,action));
const budget=freshBudget({ownerId:sheet.id,round:1});
const profile={unarmed:true,ability:'str',weapon:{name:'Unarmed strike'}};
const input={sheet,args:{},profile,kind:'weapon',atRange:false,derived:{proficiencyBonus:3,abilityMods:{wis:1}},budget};
for(const args of [{bonusAttack:'martial arts'},{stunningStrike:true},{reckless:true},{nonlethal:true},{hordeBreaker:true}]){
 const result=checkAttackOptions({...input,args,atRange:Boolean(args.nonlethal)});assert('refused' in result);check(result.refused);
}
// Full engine-produced combinations, including feat suffixes and proper names
// containing punctuation. Every known hint must survive the projection.
const feats=['Great Weapon Master','Polearm Master','Crossbow Expert','Charger'];
for(const chosen of [[],...feats.map(f=>[f]),feats]){
 const result=checkAttackOptions({...input,args:{bonusAttack:'feature'},sheet:{...sheet,feats:chosen}});assert('refused' in result);check(result.refused);
}
for(const [key,row]of Object.entries(AUTHORED_TABLE))if(row.effects?.some(e=>e.kind==='bonus_attack')){
 const [classId,name]=key.split('::');
 const result=authoredBonusAttackProblem({...sheet,class:classId,features:[{name,source:'class'}]},budget);
 if('refused' in result){check(result.refused);check(actor+': '+result.refused);}
}
for(const raw of [actor+': War Magic\'s bonus-action weapon attack comes after an authored ritual, and that has not happened this turn.',actor+': No feature of theirs grants a bonus-action weapon attack. An authored restriction remains.'])assert.equal(handRefusalText(raw,'zh-CN'),raw);
const card=subclassSpendCards({...sheet,features:[{name:'Telekinetic Adept',source:'class'}]},FRESH_TURN,new Set())[0];assert(card);
assert.equal(handCardName(card,'zh-CN'),'念动能手');assert.match(handCardMaterial(card,'zh-CN').rules,/念动能手/);
assert.equal(handChoiceLabel(card,'Leap','zh-CN'),'灵能跃空');
const aim={kind:'enemy',id:'e1',name:'Authored foe',ac:14,conditions:[],note:''};
const body=intentBody(card,aim,[],{choice:'leap'});assert.equal(body.resourceId,'Telekinetic Adept');assert.equal(body.variant,'leap');
const files=['src/app/campaigns/[campaignId]/HandAimBar.tsx'];const renderer=await openCombatRenderer({files});
let chosen;const props={card,targets:[aim],aim,onAim:()=>{},riders:[],onDropRider:()=>{},rows:[],sentence:'Authored sentence',sending:false,choice:'leap',blocked:null,onBack:()=>{},onEdit:()=>{},onCommit:()=>{},onChoice:value=>chosen=value};
assert(renderer.render('HandAimBar',props,'en').includes('Leap'));const html=renderer.render('HandAimBar',props,'zh-CN');assert(html.includes('灵能跃空'));
renderer.elements().find(e=>e.type==='button'&&e.props.role==='radio'&&e.props['aria-checked']===true).props.onClick();assert.equal(chosen,'leap');assert.deepEqual(sheet,native);
console.log('PASS: '+names.size+' native technique names, '+maneuvers.length+' maneuvers; '+refusals+' native refusal/feat-hint combinations, authored fallback and canonical JSX choice callback.');
