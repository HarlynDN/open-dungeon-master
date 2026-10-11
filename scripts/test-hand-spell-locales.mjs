// Focused spell-note display contracts; no DB, model, audio or full rules suite.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {spellCards}=await import('../src/lib/battlemap/hand-spells.ts');
const {FRESH_TURN}=await import('../src/lib/battlemap/hand-core.ts');
const {bundledSpellFacts}=await import('../src/lib/srd/spell-facts.ts');
const {MECH_OVERRIDES}=await import('../src/lib/srd/spell-mechanics.ts');
const {handRuleText,handCardMaterial}=await import('../src/lib/i18n/hand-material-presentations.ts');
const {intentBody}=await import('../src/lib/battlemap/hand-play.ts');
const {HAND_SPELL_MESSAGES}=await import('../src/lib/i18n/hand-spell-messages.ts');
const ownedNotes=new Set([
 ...Object.values(MECH_OVERRIDES).map(row=>row.note),
 ...JSON.parse(fs.readFileSync(new URL('../src/lib/srd/authored-spells.json',import.meta.url),'utf8')).spells.map(row=>row.mech?.note),
].filter(Boolean));
for(const note of ownedNotes){
 assert(Object.values(HAND_SPELL_MESSAGES.en).includes(note),'new native note needs review: '+note);
 assert.equal(handRuleText(note,'en'),note);
 assert.match(handRuleText(note,'zh-CN'),/\p{Script=Han}/u);
 assert.notEqual(handRuleText(note,'zh-CN'),note);
}
const names=['Web','Magic Missile','Eldritch Blast'];
const sheet={id:'s1',campaignId:'c1',userId:'u1',libraryCharacterId:null,name:'Mira',race:'human',class:'wizard',subclass:'',background:'',alignment:'',gender:'',
 level:7,xp:0,abilities:{str:10,dex:14,con:14,int:16,wis:12,cha:12},maxHp:36,currentHp:36,tempHp:0,ac:12,acOverride:false,speed:30,
 hitDice:{die:'d6',total:7,spent:0},classes:[],hitDicePools:null,
 proficiencies:{saves:['int','wis'],skills:[],expertise:[],languages:[],tools:[],armor:[],weapons:[]},
 equipment:[{name:'Arcane Focus',qty:1}],gold:0,copper:0,feats:[],features:[],conditions:[],conditionMeta:{},resources:{},wildShape:null,pets:[],exhaustion:0,
 spellcasting:{ability:'int',slots:{1:{max:4,used:0},2:{max:3,used:0}},known:[],prepared:['Web','Magic Missile'],cantrips:['Eldritch Blast']},
 deathSaves:null,concentratingOn:'Bless',portrait:null,notes:'',backstory:'',isCompanion:false,companionKind:null,personality:'',createdAt:'',updatedAt:''};
const facts=Object.fromEntries(names.map(name=>{
 const f=bundledSpellFacts(name);assert(f,name);
 return [name.toLowerCase(),{level:f.level,castingTime:'1 action',range:'60 feet',school:'',desc:'',higherLevel:'',concentration:name==='Web',facts:f}];
}));
const makeCards=(spells=facts)=>spellCards(sheet,FRESH_TURN,{cantripAbilityRiders:[]},{spells});
const cards=makeCards();assert.equal(cards.length,names.length);
const snapshot=structuredClone(cards);
const web=cards.find(card=>card.name==='Web');assert(web);
assert.equal(web.ruleSegments.length,2);
assert(web.rules.includes(MECH_OVERRIDES.web.note));
assert.equal(handCardMaterial(web,'en').rules,web.rules);
const zh=handCardMaterial(web,'zh-CN').rules;
assert(zh.includes('祝福术'));assert(zh.includes('2d4'));assert(zh.includes('火焰'));assert(!/[A-Za-z]{2,}/.test(zh));
assert.equal(handCardMaterial({...web,rules:'An authored replacement.'},'zh-CN').rules,'An authored replacement.','stale boundaries cannot override source');
const custom='Jade fog follows the song. Keep its authored meaning.';
const customCard=makeCards({...facts,web:{...facts.web,mech:{resolution:'utility',note:custom}}}).find(card=>card.name==='Web');assert(customCard);
const customZh=handCardMaterial(customCard,'zh-CN').rules;assert(customZh.includes('祝福术'));assert(customZh.endsWith(custom));
const aim={kind:'enemy',id:'e1',name:'Authored target',ac:14,conditions:[]};
const body=intentBody(web,aim,[],{});assert.equal(body.spell,'Web');assert.equal(body.slotLevel,2);
assert(!Object.hasOwn(body,'ruleSegments'));assert.deepEqual(cards,snapshot);
const renderer=await openCombatRenderer({files:['src/app/campaigns/[campaignId]/HandCardFace.tsx']});
const props={card:web,index:0,offset:0,step:4,aim,conditions:[],attached:false,onPick:()=>{}};
assert(renderer.render('HandCardFace',props,'en').includes('Restrained until it breaks free'));
let picked;const html=renderer.render('HandCardFace',{...props,onPick:card=>picked=card},'zh-CN');
assert(html.includes('2d4'));assert(html.includes('蛛网'));assert(!html.includes('Restrained until'));
renderer.elements().find(element=>element.type==='button').props.onClick();assert.equal(picked,web);
console.log('PASS: '+ownedNotes.size+' owned spell notes; native multi-sentence/concentration cards, stale/custom fallback, English text, canonical intent and real card callback.');
