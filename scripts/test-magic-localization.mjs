// One grouped display/search/inventory check; no model or service calls.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {openGearRenderer} from './lib/gear-ui-fixtures.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
const {MAGIC_ITEM_NAMES,MAGIC_ITEM_NAME_MESSAGES}=await import('../src/lib/i18n/magic-item-name-messages.ts');
const {equipmentName,equipmentSearchNames}=await import('../src/lib/i18n/equipment-presentations.ts');
const {referenceDisplayName,resolveReference,translatedReferenceNames}=await import('../src/lib/i18n/references.ts');
const {proposalSummary}=await import('../src/lib/dm/proposal-logic.ts');
const {proposalSummaryDetail}=await import('../src/lib/dm/proposal-summary.ts');
const {magicItemRiders}=await import('../src/lib/srd/magic-items.ts');
const {systemEventText}=await import('../src/lib/i18n/system-event-presentations.ts');
const {MAGIC_ITEM_MATERIAL}=await import('../src/lib/i18n/magic-item-material-metadata.ts');
const {nativeItemHelp}=await import('../src/lib/i18n/magic-item-material-presentations.ts');
const {MESSAGE_CATALOGS}=await import('../src/lib/i18n/messages.ts');
const {bundledItemRows}=await import('../src/lib/rulebook/catalog-rows.ts');
const {buildItemSheet}=await import('../src/lib/help/item-sheet.ts');
const {describeContentEntry}=await import('../src/lib/help/index.ts');
const {itemSheetView}=await import('../src/lib/i18n/equipment-help-presentations.ts');
const {normalizeRulesText,stripMarkdown,firstSentence}=await import('../src/lib/help/rules-text.ts');
assert.equal(firstSentence('饮用后，你获得*动物友谊*。下一句。'),'饮用后，你获得动物友谊。');
assert.equal(firstSentence('他说：“*剑*发光了！”随后离开。'),'他说：“剑发光了！”');
assert.equal(firstSentence('You gain *advantage*. Other rules.'),'You gain advantage.');
assert.equal(stripMarkdown('这把*剑*造成_光耀_伤害。'),'这把剑造成光耀伤害。');
assert.equal(stripMarkdown('spell_attack_bonus'),'spell_attack_bonus');
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
const bodies=bundledItemRows(),infoFile='src/components/ui/InfoDialog.tsx';
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const scopeStub=url('export const useContentCampaign=()=>null;export const scopeQuery=()=>"";export const scopedParams=p=>p;');
const info=await openCombatRenderer({files:[infoFile],stubs:{
 '@/components/ui/Dialog':url('export const Dialog=({children})=>children;'),
 '@/components/ui/Tooltip':url('export const Tooltip=({children})=>children;'),
 '@/lib/content-scope':scopeStub,
}});
const wearable=/^(Amulet|Belt|Boots|Bracers|Brooch|Cape|Cloak|Eyes|Gauntlets|Gloves|Goggles|Hat|Headband|Helm|Ioun Stone|Mantle|Medallion|Necklace|Periapt|Robe|Slippers|Winged)\b/;
const utilityItems=new Set(["apparatus-of-the-crab","bag-of-beans","bag-of-devouring","bag-of-holding","bag-of-tricks","bead-of-force","bowl-of-commanding-water-elementals","brazier-of-commanding-fire-elementals","broom-of-flying","candle-of-invocation","carpet-of-flying","censer-of-controlling-air-elementals","chime-of-opening","circlet-of-blasting","crystal-ball","cube-of-force","cubic-gate","decanter-of-endless-water","deck-of-illusions","deck-of-many-things","dimensional-shackles","dust-of-disappearance","dust-of-dryness","dust-of-sneezing-and-choking","efficient-quiver","efreeti-bottle","elemental-gem","eversmoking-bottle","feather-token"]);
const reviewedNative=native.filter(row=>/^(Potion|Oil|Ring|Wand) of /.test(row.title)||/^(Armor|Weapon|Rod|Staff)/.test(row.meta)||wearable.test(row.title)||utilityItems.has(row.id));
assert.equal(native.filter(row=>wearable.test(row.title)).length,49);
assert.deepEqual(MAGIC_ITEM_MATERIAL.map(row=>row.id).sort(),reviewedNative.map(row=>row.id).sort());
const visibleText=html=>html.replace(/<[^>]+>/g,' ').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&');
const numeric=text=>new Set((text.replace(/(\d)[–-](?=\d)/g,'$1 ').match(/[+-]?\d+(?:\.\d+)?/g)??[]).map(Number));
for(const row of MAGIC_ITEM_MATERIAL){
 const entry=bodies.find(entry=>entry.rulebook===row.id);assert(entry,row.id);
 const source=describeContentEntry(entry.data),saved=JSON.stringify(entry),raw=buildItemSheet(entry.name,[entry.data]);
 assert.equal(normalizeRulesText(MESSAGE_CATALOGS.en[row.key]),source);
 const meta=reviewedNative.find(page=>page.id===row.id).meta;
 assert.equal(MESSAGE_CATALOGS.en[row.metaKey],meta);
 for(const number of numeric(meta)) assert(numeric(MESSAGE_CATALOGS['zh-CN'][row.metaKey]).has(number),row.id+':metadata:'+number);
 const zh=nativeItemHelp(entry,source,'zh-CN');assert.equal(zh,MESSAGE_CATALOGS['zh-CN'][row.key]);assert.match(zh,/\p{Script=Han}/u);
 assert.equal(nativeItemHelp(entry,source,'en'),source);
 for(const number of numeric(source)) assert(numeric(zh).has(number),row.id+':'+number);
 assert.deepEqual(zh.match(/\b\d*d\d+\b/g),source.match(/\b\d*d\d+\b/g),row.id);
 for(const replacement of [{...entry,source:'homebrew'},{...entry,documentSlug:'other-book'},{...entry,name:'Authored potion'}]) assert.equal(nativeItemHelp(replacement,source,'zh-CN'),source);
 assert.equal(nativeItemHelp(entry,source+' Authored addition.','zh-CN'),source+' Authored addition.');
 for(const locale of ['en','zh-CN']){
  const projected=itemSheetView(raw,locale,entry);assert.equal(projected.description,locale==='en'?source:nativeItemHelp(entry,source,locale,{includeMetadata:true}));
  assert.deepEqual(numeric(JSON.stringify({...projected,description:null})),numeric(JSON.stringify({...raw,description:null})),row.id+':stats');
  assert.deepEqual({...projected,description:raw.description,type:raw.type,rarity:raw.rarity,armor:raw.armor,weapon:raw.weapon,weight:raw.weight,cost:raw.cost},{...raw});
  const html=info.render('InfoDialog',{open:true,onOpenChange:()=>{},title:equipmentName(entry.name,locale),reference:{kind:'items',slug:entry.slug,name:entry.name}},locale,{queues:{[infoFile]:[{sheet:raw,loading:false,descriptionOwner:entry}]}});
  assert(html.includes(locale==='en'?'Description':'说明'));
  if(locale!=='en') assert(html.includes(MESSAGE_CATALOGS[locale][row.metaKey]),row.id+':metadata');
  const text=visibleText(html);
  assert(text.replace(/\s+/g,'').includes(stripMarkdown((locale==='en'?source:zh).split('\n\n')[0]).replace(/\s+/g,'').slice(0,64)),row.id+':body:'+locale);
 }
 const custom=info.render('InfoDialog',{open:true,onOpenChange:()=>{},title:entry.name,reference:{kind:'items',slug:entry.slug,name:entry.name}},'zh-CN',{queues:{[infoFile]:[{sheet:raw,loading:false,descriptionOwner:{...entry,source:'homebrew'}}]}});
 assert(visibleText(custom).replace(/\s+/g,'').includes(stripMarkdown(source.split('\n\n')[0]).replace(/\s+/g,'').slice(0,64)),row.id+':authored');assert.equal(JSON.stringify(entry),saved);
}
// The same cached canonical row feeds all four pickers. Check display props and
// callbacks rather than snapshotting another catalog or issuing network calls.
const healing=bodies.find(entry=>entry.name==='Potion of Healing'),custom={...healing,source:'homebrew',slug:'custom-potion'};
const pickerFiles=['src/components/ui/ContentPick.tsx',...['ContentPicker','MultiContentPicker','CatalogBrowser'].map(name=>`src/app/characters/builder/${name}.tsx`)];
const exports={ [pickerFiles[1]]:'ContentPicker', [pickerFiles[2]]:'MultiContentPicker', [pickerFiles[3]]:'CatalogBrowser' };
const hook=url('export const useContentSearch=()=>({query:"",results:'+JSON.stringify([healing,custom])+',open:true,loading:false,unavailable:false,unadmitted:[],setQuery:()=>{},setResults:()=>{},setOpen:()=>{}});');
const pickers=await openCombatRenderer({files:pickerFiles,sourceOf:file=>readFileSync(new URL('../'+file,import.meta.url),'utf8')+(exports[file]?`\nexport {${exports[file]}};`:''),stubs:{
 './useContentSearch':hook,'@/app/characters/builder/useContentSearch':hook,
 '@/components/ui/InfoDialog':url('export const InfoButton=()=>null;'),
 '@/lib/content-scope':scopeStub,
}});
for(const locale of ['en','zh-CN']) for(const component of ['ContentPick','ContentPicker','MultiContentPicker','CatalogBrowser']){
 const picked=[],props={kind:'items',placeholder:'Search',label:'Items',selectedNames:[],onPick:entry=>picked.push(entry),onAdd:entries=>picked.push(...entries),buttonLabel:'Browse',sections:[{key:'potions',label:'Potions'}]};
 const key=JSON.stringify(['items','','potions','']);
 pickers.render(component,props,locale,component==='CatalogBrowser'?{queues:{[pickerFiles[3]]:[true,['potions'],{[key]:{rows:[healing,custom],truncated:false}},[],'']}}:component==='MultiContentPicker'?{queues:{[pickerFiles[2]]:[[{name:healing.name,source:healing.source}]]}}:{});
 const tips=pickers.elements().filter(row=>typeof row.props.text==='string'&&typeof row.props.label==='string');
 assert(tips.some(row=>row.props.reference?.slug===healing.slug&&row.props.text===nativeItemHelp(healing,describeContentEntry(healing.data),locale)),component+':'+locale);
 assert(tips.some(row=>row.props.text===describeContentEntry(custom.data)&&row.props.label===custom.name),component+':custom:'+locale);
 const handler=component==='CatalogBrowser'?'toggleRow(entry)':component==='MultiContentPicker'?'onAdd(':'onPick(entry)';
 const button=pickers.elements().find(row=>row.type==='button'&&String(row.props.onClick).includes(handler));
 assert(button,component);button.props.onClick();assert.deepEqual(picked,component==='MultiContentPicker'?[{name:healing.name}]:[healing]);
}
const frozen=readValidationJson(new URL('../docs/validation/character-gear-help-goldens.json',import.meta.url).pathname);
const gear=await openGearRenderer();assert.equal(frozen.fixtures.length,185);
for(const row of frozen.fixtures){
 const state=row.sheet!==undefined?{sheet:row.sheet,loading:false}:{sheet:null,loading:row.name==='loading'};
 assert.equal(gear.render(gear.components.ItemBody,{reference:{kind:'items',slug:row.slug??'authored',name:row.name}},'en',{},[state]),row.html,row.name);
}
console.log(`PASS: all ${MAGIC_ITEM_MATERIAL.length} native potion/oil, ring, wand, armor, weapon, rod, staff, wearable and utility bodies and headers, full tables, exact source/signed numbers/dice, actual bilingual item dialogs and four picker flows, English switching, canonical picks and authored/other-book/changed-text overrides.`);
console.log('PASS: all 185 original frozen English item cards unchanged.');
console.log('Magic-item localization passed: all 239 SRD source titles and 291 registered names; shared display/search/alias projections; exact +N identities and scoped ambiguity; actual gear/loot/proposal UI in both locales; native callbacks, proper names, tool summaries, inventory and mechanics unchanged.');
