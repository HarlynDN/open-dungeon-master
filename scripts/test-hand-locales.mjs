// Lightweight locale contracts: native numbers/refusals and real JSX callbacks.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {deriveHand,FRESH_TURN}=await import('../src/lib/battlemap/hand.ts');
const {previewRows,intentBody}=await import('../src/lib/battlemap/hand-play.ts');
const {canAct}=await import('../src/lib/dm/can-act.ts');
const {freshBudget,spendAction}=await import('../src/lib/dm/action-budget.ts');
const {reactionCards,reactionHitText}=await import('../src/lib/battlemap/hand-react.ts');
const material=await import('../src/lib/i18n/hand-material-presentations.ts');
const {handSentence}=await import('../src/lib/i18n/hand-presentations.ts');
// A complete native character fixture; no server, model or device access.
const makeSheet=(overrides={})=>({
 id:'s1',campaignId:'c1',userId:'u1',libraryCharacterId:null,name:'Aria',race:'human',class:'fighter',subclass:'',background:'',alignment:'',gender:'',
 level:4,xp:0,abilities:{str:16,dex:14,con:14,int:10,wis:12,cha:10},maxHp:36,currentHp:36,tempHp:0,ac:16,acOverride:false,speed:30,
 hitDice:{die:'d10',total:4,spent:0},classes:[],hitDicePools:null,
 proficiencies:{saves:['str','con'],skills:['athletics'],expertise:[],languages:[],tools:[],armor:[],weapons:['simple','martial']},
 equipment:[],gold:0,copper:0,feats:[],features:[],spellcasting:null,conditions:[],conditionMeta:{},resources:{},wildShape:null,pets:[],exhaustion:0,
 deathSaves:null,concentratingOn:null,portrait:null,notes:'',backstory:'',isCompanion:false,companionKind:null,personality:'',createdAt:'',updatedAt:'',...overrides
});
const actor="Aria [v2]'s 3.7";
const sheet=makeSheet({name:actor,equipment:[{name:'Longsword',qty:1}],resources:{second_wind:{max:1,used:0}},features:[{name:'Uncanny Dodge',source:'class'}]});
const cards=deriveHand(sheet,FRESH_TURN);
const attack=cards.find(c=>c.intent.card==='attack'&&c.intent.weapon==='Longsword');assert(attack);
const aim={id:'e1',name:'Authored foe',kind:'enemy',ac:14,cr:.5,conditions:[],edge:{cover:2,flanking:true,adjacent:true,blocked:false}};
const numbers=s=>s.match(/[+-]?\d+(?:\.\d+)?/g);
const before=structuredClone(cards);
for(const card of cards){
 const en=material.handCardMaterial(card,'en');for(const field of Object.keys(en))assert.equal(en[field],card[field]);
 const zh=material.handCardMaterial(card,'zh-CN');
 if(card.intent.card==='basic')assert.match(zh.rules,/\p{Script=Han}/u);
 for(const row of previewRows(card,aim)){
  assert.equal(material.handPreviewRow(row,'en'),row);
  const projected=material.handPreviewRow(row,'zh-CN');
  assert.equal(projected.tone,row.tone);
  assert.deepEqual(numbers(projected.value),numbers(row.value),'preview numbers remain native: '+row.key);
 }
}
assert.deepEqual(cards,before);
const resource=cards.find(c=>c.intent.card==='feature'&&c.intent.resourceId==='second_wind');assert(resource);
assert.match(material.handCardMaterial(resource,'zh-CN').rules,/\p{Script=Han}/u);
for(const [raw,word] of [['heals up to 7','最多'],['heals d6 a die','每个骰'],['DC 15, half on a save','减半'],['5 ft / 20/60 ft','英尺']])assert(material.handFactText(raw,'zh-CN').includes(word),raw);
for(const raw of ['Authored, Self','Slot X · 2/3','Mira is inspired: unregistered prose.'])assert.equal(material.handFactText(raw,'zh-CN'),raw);
const unknown={key:'Authored row',value:'Self',tone:'plain'};assert.equal(material.handPreviewRow(unknown,'zh-CN'),unknown);
const encounter={orderReady:true,round:1,turnIndex:0,order:[{kind:'pc',characterId:sheet.id,userId:sheet.userId,name:sheet.name,initiative:10}],surprisedIds:[]};
let refused=0;
for(const patch of [{sheet:{deathSaves:{dead:true}}},{sheet:{currentHp:0}},{sheet:{conditions:['stunned']}},{encounter:{surprisedIds:[sheet.id]}},{encounter:{orderReady:false}},{encounter:{order:[{kind:'npc',npcId:'other',name:'Echo',initiative:15}]}}]){
 const verdict=canAct({sheet:{...sheet,...patch.sheet},encounter:{...encounter,...patch.encounter},kind:'attack'});assert(!verdict.ok);
 const zh=material.handRefusalText(verdict.error,'zh-CN');assert.notEqual(zh,verdict.error);assert(zh.includes(actor));assert.equal(material.handRefusalText(verdict.error,'en'),verdict.error);refused++;
}
for(const bonusUsed of [false,true])for(const extraActions of [0,1]){
 const result=spendAction({...freshBudget({ownerId:sheet.id,round:1}),actionUsed:true,bonusUsed,extraActions},'action','Fireball',actor);assert(!result.ok);
 const zh=material.handRefusalText(result.error,'zh-CN');assert.notEqual(zh,result.error);assert(zh.includes(actor));assert.equal(zh.includes('附赠动作'),!bonusUsed);refused++;
}
assert.equal(material.handRefusalText("Aria is dead and cannot invent a new act. Only magic that raises the dead brings them back.",'zh-CN'),"Aria is dead and cannot invent a new act. Only magic that raises the dead brings them back.");
const nativeBonus='Double your movement this turn. Cunning Action: a bonus action.';assert(!/[A-Za-z]/.test(material.handRuleText(nativeBonus,'zh-CN')));
const hit={characterId:sheet.id,attackerId:'e1',attacker:'Ogre',attack:'Club',source:'attack',hit:true,damage:7,type:'bludgeoning',ranged:false,answered:[]};
const react=reactionCards(sheet,FRESH_TURN,[hit],[sheet]);assert(react.length);
const context={hits:[hit],viewerId:sheet.id,party:[sheet],enemies:[{id:'e1',name:'Ogre'}]};
const prompt=material.handReactionPrompt(react[0],'zh-CN',context);assert(!prompt.includes('Ogre'));assert(prompt.includes('7'));
assert.equal(material.handReactionPrompt(react[0],'en',context),reactionHitText(hit,'you'));
assert(material.handReactionPrompt(react[0],'zh-CN',{...context,enemies:[]}).includes('Ogre'),'unidentified attacker name stays literal');
assert.equal(material.handReactionPrompt(react[0],'zh-CN',{...context,hits:[{...hit,damage:8}]}),react[0].prompt,'stale source record is not reinterpreted');
const card={...attack,type:'spell',name:'Heat Metal',intent:{card:'spell',spell:'Heat Metal',slotLevel:2},choice:{arg:'variant',label:'The metal',options:[{value:'',label:'A held object'},{value:'armor',label:'Worn armor'}],fallback:''}};
const choiceBefore=structuredClone(card);
assert.match(handSentence(card,aim,[],{choice:'armor'},'zh-CN'),/穿着的护甲/);
assert.equal(intentBody(card,aim,[],{choice:'armor'}).variant,'armor');
assert.deepEqual(card,choiceBefore);
const files=['HandCardFace','HandAimBar','HandReactPrompt','HandMoreSheet'].map(name=>'src/app/campaigns/[campaignId]/'+name+'.tsx');
const data=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const stubs={'@/components/ui/Sheet':data('import {createElement} from '+JSON.stringify(import.meta.resolve('react'))+';export const Sheet=({children,title})=>createElement("section",null,title,children);')};
const renderer=await openCombatRenderer({files,stubs});
const target={...aim,note:'bloodied · half cover · flanked'};
const fixtures=[
 ['HandCardFace',{card:attack,index:0,offset:0,step:4,aim,conditions:[],attached:false,onPick:()=>{}}],
 ['HandAimBar',{card,targets:[target],aim:target,onAim:()=>{},riders:[],onDropRider:()=>{},rows:previewRows(card,aim),sentence:'Authored sentence',sending:false,choice:'armor',blocked:null,onBack:()=>{},onEdit:()=>{},onCommit:()=>{},onChoice:()=>{}}],
 ['HandReactPrompt',{cards:react,pickedId:null,onPick:()=>{},context}],
 ['HandMoreSheet',{open:true,onOpenChange:()=>{},cards,waitingNote:null,isWaiting:()=>false,onPick:()=>{},aim,conditions:[]}]
];
assert(renderer.render('HandAimBar',fixtures[1][1],'en').includes('Worn armor'),'English choice label unchanged');
let chosen;renderer.render('HandAimBar',{...fixtures[1][1],onChoice:value=>chosen=value},'zh-CN');
const choiceButton=renderer.elements().find(e=>e.type==='button'&&e.props.role==='radio'&&e.props['aria-checked']===true);assert(choiceButton);choiceButton.props.onClick();assert.equal(chosen,'armor');
let picked;renderer.render('HandReactPrompt',{...fixtures[2][1],onPick:value=>picked=value},'zh-CN');
renderer.elements().find(e=>e.type==='button').props.onClick();assert.equal(picked,react[0]);
const html=renderer.render('HandCardFace',fixtures[0][1],'zh-CN');assert(!html.includes('slashing'));assert(html.includes('英尺'));
console.log('PASS: native hand facts/preview numbers, '+refused+' engine refusal cases, source-record reaction matching, English card fields, canonical choice/reaction callbacks.');

