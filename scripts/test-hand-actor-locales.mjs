// New form-name/actor display paths only; no model, audio or full rules suite.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {BEAST_FORMS}=await import('../src/lib/srd/beast-forms.ts');
const {deriveHand,FRESH_TURN,waitingHand}=await import('../src/lib/battlemap/hand.ts');
const {intentBody,composeSentence}=await import('../src/lib/battlemap/hand-play.ts');
const {turnFromEncounter}=await import('../src/lib/battlemap/hand-table.ts');
const {publicEncounter}=await import('../src/lib/db/encounter-view.ts');
const {handCardName,handSentence,handCurrentActorName}=await import('../src/lib/i18n/hand-presentations.ts');
const {handRefusalText,handCardMaterial}=await import('../src/lib/i18n/hand-material-presentations.ts');
const sheet={id:'s1',campaignId:'c1',userId:'u1',name:'Mira',race:'human',class:'druid',subclass:'',level:10,classes:[],
 abilities:{str:16,dex:14,con:14,int:12,wis:16,cha:10},maxHp:40,currentHp:40,tempHp:0,ac:12,acOverride:false,speed:30,
 proficiencies:{saves:[],skills:[],expertise:[],languages:[],tools:[],armor:[],weapons:[]},equipment:[],feats:[],features:[],spellcasting:null,
 conditions:[],conditionMeta:{},resources:{},wildShape:null,exhaustion:0,deathSaves:null,concentratingOn:null};
const aim={kind:'enemy',id:'e1',name:'Ogre',ac:11,conditions:[],note:''};
let attacks=0,first;
for(const form of BEAST_FORMS){
 const shaped={...sheet,wildShape:{form:form.name,beastHp:form.hp,beastMaxHp:form.hp,beastAc:form.ac,attacks:structuredClone(form.attacks)}};
 const before=structuredClone(shaped);
 const cards=deriveHand(shaped,FRESH_TURN).filter(card=>card.intent.card==='attack');assert.equal(cards.length,form.attacks.length);
 for(const card of cards){
  const snapshot=structuredClone(card),body=intentBody(card,aim,[],{});
  assert.notEqual(handCardName(card,'zh-CN'),card.name,form.name+' '+card.name);
  assert(handSentence(card,aim,[],{},'zh-CN').includes(handCardName(card,'zh-CN')));
  assert.equal(handSentence(card,aim,[],{},'en'),composeSentence(card,aim,[],{}));
  assert.equal(handCardName(card,'en'),card.name);assert.equal(body.weapon,card.name);assert(!('naturalAttack' in body));
  handCardMaterial(card,'zh-CN');assert.deepEqual(intentBody(card,aim,[],{}),body);assert.deepEqual(card,snapshot);attacks++;first??=card;
 }
 assert.deepEqual(shaped,before);
}
assert.equal(handCardName({...first,naturalAttack:undefined},'zh-CN'),'Bite');
assert.equal(handCardName({...first,rules:'Authored rule.'},'zh-CN'),'Bite');
assert.equal(handCardName({...first,name:'Authored fang',intent:{card:'attack',weapon:'Authored fang'}},'zh-CN'),'Authored fang');
const custom=deriveHand({...sheet,wildShape:{form:'Named beast',beastHp:20,beastMaxHp:20,beastAc:12,attacks:[{name:'Bite',toHit:4,damage:'2d4+2',type:'piercing'}]}},FRESH_TURN).find(card=>card.intent.card==='attack');
assert.equal(custom.naturalAttack,undefined);assert.equal(handCardName(custom,'zh-CN'),'Bite');
const encounter={id:'fight',status:'active',round:2,orderReady:true,turnIndex:1,turnBudget:null,reactionsUsed:[],surprisedIds:[],legendary:{due:[],lair:false},
 order:[{kind:'enemy',enemyId:'secret',name:'Authored ambusher',initiative:20},{kind:'enemy',enemyId:'e1',name:'Ogre',initiative:10}]};
const foe={id:'e1',displayName:'Ogre',status:'alive',currentHp:50,maxHp:50,cr:2,slug:'ogre',conditions:[],conditionMeta:{},stats:{type:'giant'}};
const view=publicEncounter(encounter,[foe],{hiddenRefIds:['secret']});
assert.equal(view.order.length,1);assert.equal(view.turnIndex,1);assert.equal(view.acting.id,'');
assert.equal(handCurrentActorName('Ogre','zh-CN',view),'食人魔');assert.equal(handCurrentActorName('Ogre','en',view),'Ogre');
for(const context of [undefined,{...view,acting:{id:'s9',name:'Ogre'}},{...view,order:[{...view.order[0],kind:'npc'}]},
 {...view,order:[...view.order,{kind:'pc',id:'s9',name:'Ogre',hidden:false}]},{...view,enemies:[]}, {...view,acting:{id:'',name:'Authored foe'}}])assert.equal(handCurrentActorName('Ogre','zh-CN',context),'Ogre');
const hidden=publicEncounter({...encounter,turnIndex:0},[foe],{hiddenRefIds:['secret']});
assert.equal(hidden.acting.concealed,true);assert.equal(hidden.acting.name,'someone unseen');assert.equal(hidden.acting.id,'');
assert(!JSON.stringify(hidden).includes('Authored ambusher'));assert.equal(handCurrentActorName(hidden.acting.name,'zh-CN',hidden),'尚未现身的行动者');
const proper={...view,acting:{id:'s9',name:'someone unseen'},order:[{kind:'pc',id:'s9',name:'someone unseen',hidden:false}]};assert.equal(handCurrentActorName('someone unseen','zh-CN',proper),'someone unseen');
const turn=turnFromEncounter(view,sheet,{myTurn:false});const wait=waitingHand(sheet,turn);assert(wait);
assert(handRefusalText(wait.note,'zh-CN',view).includes('食人魔'));assert(handRefusalText(wait.note,'zh-CN').includes('Ogre'));assert.equal(handRefusalText(wait.note,'en',view),wait.note);
const stale={...view,acting:{id:'',name:'Wolf'}};assert(handRefusalText(wait.note,'zh-CN',stale).includes('Ogre'));
const renderer=await openCombatRenderer({files:['src/app/campaigns/[campaignId]/HandCardFace.tsx','src/app/campaigns/[campaignId]/HandMoreSheet.tsx'],stubs:{'@/components/ui/Sheet':'data:text/javascript;base64,'+Buffer.from('export const Sheet=({children})=>children;').toString('base64')}});
let picked;const props={card:{...first,disabled:wait.note},index:0,offset:0,step:0,picked:false,attached:false,played:false,aim,conditions:[],waiting:false,turnContext:view,onPick:card=>picked=card};
const html=renderer.render('HandCardFace',props,'zh-CN');assert(html.includes('啮咬'));assert(html.includes('食人魔'));
renderer.elements().find(e=>e.type==='button'&&e.props['aria-label']?.startsWith('啮咬')).props.onClick();assert.equal(picked,props.card);assert.equal(picked.intent.weapon,'Bite');
const more=renderer.render('HandMoreSheet',{open:true,onOpenChange:()=>{},cards:[props.card],onPick:()=>{},waitingNote:wait.note,isWaiting:()=>true,aim,conditions:[],turnContext:view},'zh-CN');assert(more.includes('食人魔'));assert(more.includes('啮咬'));
console.log('PASS: '+attacks+' built-in form attacks, canonical attack payloads/English sentences, custom and stale fallback, actual filtered/hidden encounter projection, turn refusal and JSX callback.');
