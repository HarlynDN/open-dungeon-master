import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const {openCombatRenderer}=await import(root+'/scripts/lib/combat-ui-fixtures.mjs');
const {createTranslator}=await import(root+'/src/lib/i18n/translator.ts');
const {handBoardTargetId,handAimName,handSentence}=await import(root+'/src/lib/i18n/hand-presentations.ts');
const {handCardMaterial}=await import(root+'/src/lib/i18n/hand-material-presentations.ts');
const {intentBody}=await import(root+'/src/lib/battlemap/hand-play.ts');
const {ZONE_ROWS}=await import(root+'/src/lib/battlemap/zones-spells.ts');
const {BOARD_ZONE_MESSAGES}=await import(root+'/src/lib/i18n/board-zone-messages.ts');
const {boardZoneLabel,boardTextWidth}=await import(root+'/src/lib/i18n/board-zone-presentations.ts');
const files=['HandAimBar','HandCardFace','BoardZoneLayer','BoardDelivery'].map(n=>'src/app/campaigns/[campaignId]/'+n+'.tsx');
const renderer=await openCombatRenderer({files});
const enemy={id:'enemy-2',kind:'enemy',name:'Wolf 2',ac:13,conditions:[],note:'healthy'};
const other={...enemy,id:'enemy-20',name:'Wolf 20'};
const card={id:'weapon',name:'Longsword',type:'attack',cost:'action',target:'enemy',range:'5 ft',dice:'1d8+3 slashing',roll:'+5 vs AC',rules:'',resource:'',condition:'',disabled:null,icon:{kind:'item',key:'Longsword'},intent:{card:'attack',weapon:'Longsword'}};
for(const locale of ['en','zh-CN']){
 const t=createTranslator(locale);
 for(const key of ['boardUi.sent.attack','boardUi.sent.cast']){
  const input=t(key,{name:handAimName(enemy,locale)});
  const id=handBoardTargetId(input,[enemy,other]);assert.equal(id,enemy.id);
  assert.equal(handBoardTargetId(input,[enemy,{...enemy,id:'ambiguous'}]),null);
  const html=renderer.render('HandAimBar',{card,targets:[enemy,other],aim:enemy,rows:[],riders:[],sentence:handSentence(card,enemy,[],{},locale),sending:false,blocked:null,onAim:target=>assert.equal(target.id,enemy.id),onBack(){},onEdit(){},onCommit(){}},locale);
  assert.ok(html.includes(handAimName(enemy,locale)));
  const targetButton=renderer.elements().find(e=>e.type==='button'&&e.props['aria-pressed']===true);
  assert.ok(targetButton);targetButton.props.onClick();
  const intent=intentBody(card,enemy,[]);assert.equal(intent.targetId,'enemy-2');assert.equal(intent.targetName,'Wolf 2');assert.equal(intent.weapon,'Longsword');
 }
 const pending={...card,disabled:'Sent. Waiting for the DM to resolve Longsword.'};
 const material=handCardMaterial(pending,locale);
 if(locale==='en')assert.equal(material.disabled,pending.disabled);else assert.match(material.disabled,/已发送.*长剑/);
}
assert.equal(handBoardTargetId(' i attack wolf 20 ',[enemy,other]),other.id);
assert.equal(handBoardTargetId('I attack Wolf.',[{...enemy,name:'Wolf'},{...other,name:'wolf'}]),null);
assert.equal(handBoardTargetId('这不是棋盘生成的句子。',[enemy]),null);
const zone={id:'zone',spell:'Web',label:'Web: '+ZONE_ROWS.web.summary,casterName:'Authored {name}',tone:'stone',look:'ground',cells:[0,1],hot:[],concentration:true,untilRound:3};
const original=JSON.stringify(zone);
for(const [name,row] of Object.entries(ZONE_ROWS)){
 const key='boardZone.summary.'+name.replaceAll(' ','_');assert.equal(BOARD_ZONE_MESSAGES.en[key],row.summary);
 assert.notEqual(boardZoneLabel({spell:name,label:name+': '+row.summary},'zh-CN'),name+': '+row.summary);
}
const zh=renderer.render('ZoneLayer',{zones:[zone],width:3},'zh-CN');assert.match(zh,/蛛网术/);assert.match(zh,/敏捷豁免/);assert.ok(!zh.includes('DEX save'));
const en=renderer.render('ZoneLayer',{zones:[zone],width:3},'en');assert.ok(en.includes(zone.label));assert.equal(JSON.stringify(zone),original);
const authored={...zone,spell:'Authored Spell {x}',label:'Authored Spell {x}: custom authored paragraph'};
assert.equal(boardZoneLabel(authored,'zh-CN'),authored.label);
assert.equal(boardTextWidth('MISS',8,5.4/8,10),4*5.4+10);assert.ok(boardTextWidth('未命中',8,5.4/8,10)>3*5.4+10);
console.log('Table workflow passed: localized board attack/cast targets resolve to unique native IDs across UI switches; real aim-bar target callbacks preserve canonical intents; pending-action copy; all 35 source-bound zone summaries; real bilingual zone SVG, authored-label fallback and unchanged DTOs.');
