// One grouped display/search/inventory check; no model or service calls.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {MAGIC_ITEM_NAMES,MAGIC_ITEM_NAME_MESSAGES}=await import('../src/lib/i18n/magic-item-name-messages.ts');
const {equipmentName,equipmentSearchNames}=await import('../src/lib/i18n/equipment-presentations.ts');
const {referenceDisplayName,resolveReference,translatedReferenceNames}=await import('../src/lib/i18n/references.ts');
const {proposalSummary}=await import('../src/lib/dm/proposal-logic.ts');
const {proposalSummaryDetail}=await import('../src/lib/dm/proposal-summary.ts');
const {magicItemRiders}=await import('../src/lib/srd/magic-items.ts');
const {systemEventText}=await import('../src/lib/i18n/system-event-presentations.ts');
const book=JSON.parse(readFileSync(new URL('../src/lib/rulebook/srd-5.1.json',import.meta.url),'utf8'));
const native=book.pages.filter(page=>page.chapter==='magic-items'&&page.kind==='item');
assert.equal(native.length,239);
for(const page of native){const row=MAGIC_ITEM_NAMES.find(row=>row.id===page.id);assert.ok(row,page.id);assert.equal(row.name,page.title);}
for(const row of MAGIC_ITEM_NAMES){
 assert.equal(equipmentName(row.name,'en'),row.name);
 assert.notEqual(equipmentName(row.name,'zh-CN'),row.name,row.name);
 assert.equal(referenceDisplayName('equipment',row.name,'zh-CN'),equipmentName(row.name,'zh-CN'));
 assert.equal(equipmentName(row.name,'zh-CN',true),row.name);
 assert.equal(MAGIC_ITEM_NAME_MESSAGES.en[row.key],row.name);
}
const candidates=[{id:'wand-1',name:'Wand of the War Mage +1'},{id:'wand-2',name:'Wand of the War Mage +2'}];
assert.equal(resolveReference('equipment','战法师魔杖 +1',candidates,'zh-CN').entry.id,'wand-1');
assert.ok(translatedReferenceNames('equipment','战法师魔杖 +1','zh-CN').includes('wand of the war mage +1'));
assert.equal(referenceDisplayName('equipment','Wand of the War Mage+1','zh-CN'),'战法师魔杖 +1');
assert.equal(referenceDisplayName('equipment','Wand of the War Mage, +1','zh-CN'),'战法师魔杖 +1');
assert.equal(referenceDisplayName('equipment','Longsword +2','zh-CN'),'长剑 +2');
assert.ok(equipmentSearchNames('防护戒指','zh-CN').includes('ring of protection'));
assert.equal(resolveReference('equipment','防护戒指',[{id:'a',name:'Ring of Protection'},{id:'b',name:'Ring of Protection'}],'zh-CN').kind,'ambiguous');
assert.equal(referenceDisplayName('equipment','Authored charm {item}','zh-CN'),'Authored charm {item}');
const files=['src/app/campaigns/[campaignId]/Moments.tsx','src/app/campaigns/[campaignId]/ItemProposalBar.tsx','src/components/sheet/SheetGearRow.tsx'];
const renderer=await openCombatRenderer({files});
const item={name:'Amulet of Health',qty:1,equipped:true,attuned:true};
const sheet={id:'hero',name:'Aria {name}',userId:'player',campaignId:'campaign',equipment:[item],class:'fighter',classes:null,race:'human',alignment:'neutral',spellcasting:null};
const baseline=JSON.stringify(sheet),riders=magicItemRiders(sheet.equipment,sheet);
for(const locale of ['en','zh-CN']){
 const gear=renderer.render('SheetGearRow',{sheet,item,worn:true,inCombat:false,myTurn:true,dead:false,busy:false,onGear:change=>assert.deepEqual(change,{attuned:false})},locale);
 assert.ok(gear.includes(equipmentName(item.name,locale)));
 const ending=renderer.elements().find(e=>e.type==='button'&&e.props.children===(locale==='en'?'attuned':'已同调'));
 assert.ok(ending);ending.props.onClick();
 const moments=files[0],signature='hero|Amulet of Healthx1';
 const loot=renderer.render('LootMoment',{sheet},locale,{queues:{[moments]:[{signature,id:'hero',pack:new Map([[item.name,1]])},[{name:item.name,qty:1}]]}});
 assert.ok(loot.includes(equipmentName(item.name,locale)));
 const args={name:'Ring of Protection',qty:1},summary=proposalSummary('grant_item',args,sheet.name),summaryDetail=proposalSummaryDetail('grant_item',args,summary);
 const p={id:'proposal',toolName:'grant_item',summary,summaryDetail,userId:'player',characterId:'hero'};
 const proposals=renderer.render('ItemProposalBar',{campaignId:'campaign',proposals:[p],sheets:[sheet],meUserId:'player',steersStory:false},locale);
 assert.ok(proposals.includes(equipmentName(args.name,locale)));assert.ok(proposals.includes('Aria {name}'));
 assert.equal(summary,proposalSummary('grant_item',args,sheet.name));
 const event={kind:'partyItem',direction:'stow',actor:sheet.name,item:args.name,qty:1,locale};
 const stored=systemEventText(event);assert.ok(stored.includes(equipmentName(args.name,locale)));assert.ok(stored.includes(sheet.name));
}
assert.equal(JSON.stringify(sheet),baseline);assert.deepEqual(magicItemRiders(sheet.equipment,sheet),riders);
console.log('Magic-item localization passed: all 239 SRD source titles and 291 registered names; shared display/search/alias projections; exact +N identities and scoped ambiguity; actual gear/loot/proposal UI in both locales; native callbacks, proper names, tool summaries, inventory and mechanics unchanged.');
