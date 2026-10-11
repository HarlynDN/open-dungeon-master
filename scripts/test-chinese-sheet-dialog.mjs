import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {openWorld} from './lib/enforce-world.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
import {openSheetDialogRenderer, sheetDialogFixtures, dialogSheet, DIALOG_FILE} from './lib/sheet-dialog-fixtures.mjs';
const root=path.resolve(import.meta.dirname,'..');
const world = await openWorld({gameSettings:{locale:'zh-CN'}});
const {test,finish} = suite('test-chinese-sheet-dialog');
const renderer = await openSheetDialogRenderer();
const {MESSAGE_CATALOGS} = await import('../src/lib/i18n/messages.ts');
const {registerLocaleScope} = await import('../src/lib/i18n/client-catalogs.ts');
registerLocaleScope(MESSAGE_CATALOGS,'content');
const {RESOURCE_DEFS, UNLIMITED_USES} = await import('../src/lib/srd/class-resources.ts');
const authoredResources = JSON.parse(fs.readFileSync(path.join(root,'src/lib/srd/authored-resources.json'),'utf8')).resources;
const {resourceLabel} = await import('../src/lib/i18n/sheet-play-presentations.ts');
const {sheetTimePassed, sheetUsageMessage, sheetResourceHelp, sheetArmorParts, sheetOwedChoice} = await import('../src/lib/i18n/sheet-dialog-presentations.ts');
const en = sheetDialogFixtures(renderer), zh = sheetDialogFixtures(renderer,'zh-CN');
const html = name => {const row=zh.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const own = {mine:true,steersStory:true,corrects:true,onClose:()=>{},onAdjust:()=>{}};

await test('26 original English dialog, gear and feature-choice renders remain byte-equivalent',()=>{
  const golden=readValidationJson(path.join(root,'docs/validation/sheet-dialog-goldens.json'));
  assert.equal(golden.baselineCommit,'bf87a494');assert.equal(en.length,26);
  assert.deepEqual(en,golden.englishRenders);
});
await test('Chinese identity, derived data, load and wild-shape views retain original values and proper names',()=>{
  assert.match(html('dialog/multiclass'),/Goblin.*3 级哥布林 战士 2 \/ 法师 1 · 士兵 · 守序善良/);
  assert.match(html('dialog/basic'),/生命值.*17.*40.*护甲等级.*速度.*30 英尺.*10 金币.*300 经验值.*2\/3d10/);
  assert.match(html('dialog/equipment'),/74\.2\+\/150 磅/);
  assert.match(html('dialog/equipment'),/1 件物品重量未知/);
  assert.match(html('dialog/equipment'),/全身板甲.*长剑 \+1/);
  assert.match(html('dialog/heavy'),/110\.2\/150 磅/);
  assert.match(html('dialog/heavy'),/速度降低 20 英尺.*力量、敏捷和体质/);
  assert.match(html('dialog/overload'),/只能以 5 英尺的速度拖动/);
  assert.match(html('dialog/wild-shape'),/荒野形态：狼.*野兽生命值 5\/11.*护甲等级 13.*Goblin.*17\/40/);
  assert.equal(sheetArmorParts(['Plate 18','DEX +2','bonus +1','Authored armor 9'],'zh-CN'),'全身板甲 18 + 敏捷 +2 + 加值 +1 + Authored armor 9');
  assert.equal(sheetArmorParts(['Draconic Resilience 13','DEX +2'],'zh-CN'),'龙族体魄 13 + 敏捷 +2');
  assert.equal(sheetOwedChoice('1 Fighter skill','zh-CN'),'1 项战士技能');
  assert.equal(sheetOwedChoice('Authored choice <script>','zh-CN'),'Authored choice <script>');
});
await test('authored notes remain escaped and visible only to the sheet owner',()=>{
  assert.match(html('dialog/private'),/仅自己可见.*Authored note &lt;script&gt;/);
  assert.match(html('dialog/private'),/Goblin is my proper name\./);
  const hidden=renderer.render('CharacterSheetDialog',{...own,mine:false,sheet:dialogSheet({notes:'private secret',backstory:'public story'})},'zh-CN');
  assert.doesNotMatch(hidden,/private secret|仅自己可见/);assert.match(hidden,/public story/);
});
await test('casting/resource help localizes 174 native explanations without changing engine guidance or unknown text',()=>{
  assert.match(html('dialog/spells'),/智力.*难度.*攻击加值.*1环.*2环.*戏法不消耗法术位/);
  assert.match(html('dialog/pact'),/邪术师.*契约法术位，2环.*短休后恢复/);
  const keys=Object.keys(MESSAGE_CATALOGS.en).filter(k=>k.startsWith('sheetDialog.resourceHelp.'));
  assert.equal(keys.length,174);
  for(const key of keys){
    const id=key.split('.').at(-1),def=RESOURCE_DEFS.find(row=>row.id===id);
    assert.ok(def,id);assert.equal(MESSAGE_CATALOGS.en[key],def.guidance);
    assert.equal(sheetResourceHelp(id,def.guidance,'en'),def.guidance);
    assert.notEqual(sheetResourceHelp(id,def.guidance,'zh-CN'),def.guidance);
  }
  assert.match(sheetResourceHelp('second_wind',RESOURCE_DEFS.find(r=>r.id==='second_wind').guidance,'zh-CN'),/附赠动作.*1d10.*战士等级/);
  assert.equal(sheetResourceHelp('second_wind','Authored override <script>','zh-CN'),'Authored override <script>');
  assert.equal(sheetResourceHelp('homebrew','Fireball <script>','zh-CN'),'Fireball <script>');
});
await test('all 140 authored resource rows render localized names/help with source dice and shared terminology intact',()=>{
  assert.equal(authoredResources.length,140);
  const resources=Object.fromEntries(authoredResources.map(row=>[row.id,{max:2,used:1}]));
  const sheet=dialogSheet({resources:{...resources,overchannel:{max:UNLIMITED_USES,used:2},homebrew:{max:3,used:1}}});
  const before=structuredClone(sheet);
  const dice=text=>(text.match(/\b(?:\d+)?d\d+s?\b/g)??[]).map(term=>term.toLowerCase().replace(/s$/,''));
  for(const locale of ['en','zh-CN']){
    renderer.render('CharacterSheetDialog',{...own,sheet},locale);
    const helps=renderer.elements().filter(row=>typeof row.props.text==='string'&&typeof row.props.label==='string');
    for(const row of authoredResources){
      const nameKey='sheetPlay.resourceName.'+row.id,helpKey='sheetDialog.resourceHelp.'+row.id;
      assert.equal(MESSAGE_CATALOGS.en[nameKey],row.displayName,row.id);
      assert.equal(MESSAGE_CATALOGS.en[helpKey],row.guidance,row.id);
      assert.ok(helps.some(button=>button.props.label===MESSAGE_CATALOGS[locale][nameKey]&&button.props.text===MESSAGE_CATALOGS[locale][helpKey]),locale+':'+row.id);
      assert.deepEqual(dice(MESSAGE_CATALOGS['zh-CN'][helpKey]),dice(row.guidance),row.id);
      for(const key of Object.keys(MESSAGE_CATALOGS.en).filter(key=>!key.startsWith('sheetPlay.resourceName.')&&MESSAGE_CATALOGS.en[key].toLowerCase()===row.displayName.toLowerCase()))
        assert.equal(MESSAGE_CATALOGS['zh-CN'][nameKey],MESSAGE_CATALOGS['zh-CN'][key],row.id+':'+key);
    }
    const title=MESSAGE_CATALOGS[locale]['sheetDialog.resourceHelp.overchannel'];
    assert.ok(renderer.elements().some(row=>row.type==='span'&&row.props.title===title),'unlimited resource tooltip: '+locale);
  }
  assert.equal(resourceLabel('homebrew','Authored name <script>','zh-CN'),'Authored name <script>');
  assert.equal(sheetResourceHelp('sub_bladesong','Authored override <script>','zh-CN'),'Authored override <script>');
  assert.deepEqual(sheet,before);
});
await test('gear gates and wear/attunement callbacks keep canonical flags and names',()=>{
  assert.match(html('gear/plate'),/全身板甲.*穿戴/);
  assert.match(html('gear/shield-offturn'),/目前不是你的回合/);
  assert.match(html('gear/cursed'),/受到诅咒.*移除诅咒/);
  assert.match(html('gear/attuning'),/下次休息时完成同调.*取消/);
  const changes=[];
  const item={name:'Shield',qty:1,equipped:false};
  const props={sheet:dialogSheet({equipment:[item]}),item,worn:false,inCombat:true,myTurn:false,dead:false,busy:false,onGear:change=>changes.push(change)};
  renderer.render('SheetGearRow',props,'zh-CN');
  assert.equal(renderer.elements().find(row=>row.type==='button').props.disabled,true);
  renderer.render('SheetGearRow',{...props,myTurn:true},'zh-CN');
  const button=renderer.elements().find(row=>row.type==='button');assert.equal(button.props.disabled,false);
  button.props.onClick();assert.deepEqual(changes,[{equipped:true}]);
  const unknown={name:'Goblin King Gruk <script>',qty:1};
  assert.match(renderer.render('SheetGearRow',{...props,item:unknown},'zh-CN'),/Goblin King Gruk &lt;script&gt;/);
});
await test('full refusal and timing templates rerender, retain proper names, and never drop unknown suffixes',()=>{
  assert.match(html('dialog/refusal'),/Goblin并未携带所选物品/);
  assert.match(html('dialog/time'),/穿上全身板甲需要 10 分钟/);
  assert.equal(sheetUsageMessage('Goblin is dead and spends nothing.','zh-CN'),'Goblin已死亡，无法消耗资源。');
  assert.match(sheetUsageMessage('Staff of Power can be attuned only by a sorcerer, warlock, or wizard, and Goblin is not one.','zh-CN'),/术士、邪术师或法师.*Goblin/);
  const timing='Taking off Leather Armor takes 1 minute. Putting on Plate takes 10 minutes.';
  assert.equal(sheetTimePassed(timing,'en'),timing);
  assert.equal(sheetTimePassed(timing,'zh-CN'),'脱下皮甲需要 1 分钟。 穿上全身板甲需要 10 分钟。');
  assert.equal(sheetTimePassed(timing+' Authored suffix','zh-CN'),timing+' Authored suffix');
  assert.equal(sheetUsageMessage('Authored diagnostic <script>','zh-CN'),'Authored diagnostic <script>');
  const error={text:'The change did not reach the server.',at:'usage'};
  const props={...own,sheet:dialogSheet({})},opts={queues:{[DIALOG_FILE]:[false,false,error,null]}};
  assert.match(renderer.render('CharacterSheetDialog',props,'zh-CN',opts),/未能将变动请求发送到服务器/);
  assert.match(renderer.render('CharacterSheetDialog',props,'en',opts),/The change did not reach the server\./);
});
await test('all six native choices submit one localized action with untouched resource/variant protocol',async()=>{
  const calls=[],realFetch=globalThis.fetch;
  globalThis.fetch=async(url,options)=>{calls.push({url,...options});return Response.json({ok:true});};
  try{
    for(const [classId,subclass,feature,level,variant,label] of [
      ['barbarian','Path of the Totem Warrior','Totem Spirit',3,'Bear','熊'],
      ['barbarian','Path of the Totem Warrior','Aspect of the Beast',6,'Eagle','鹰'],
      ['barbarian','Path of the Totem Warrior','Totemic Attunement',14,'Wolf','狼'],
      ['wizard','School of Transmutation',"Transmuter's Stone",6,'Darkvision','黑暗视觉'],
      ['warlock','The Genie','Elemental Gift',6,'Fire','火焰'],
      ['artificer','Armorer','Armor Model',3,'Guardian','守护者'],
    ]){
      const sheet=dialogSheet({class:classId,subclass,features:[{name:feature}],level});
      renderer.render('FeatureChoicePicker',{sheet,mine:true,inCombat:false,campaignLocale:'zh-CN'},'zh-CN');
      const button=renderer.elements().find(({type,props})=>type==='button'&&props.title==='选择'+label);
      assert.ok(button,feature);assert.equal(button.props.disabled,false);
      const before=calls.length;button.props.onClick();await new Promise(resolve=>setImmediate(resolve));
      assert.equal(calls.length,before+1);const request=JSON.parse(calls.at(-1).body);
      assert.deepEqual(request.intent,{card:'feature',resourceId:feature,variant});
      assert.equal(request.kind,'do');assert.match(request.content,new RegExp('选择'+label+'。$'));
      assert.equal(calls.at(-1).url,'/api/campaigns/c/actions');
    }
    renderer.render('FeatureChoicePicker',{sheet:dialogSheet({class:'barbarian',subclass:'Path of the Totem Warrior',features:[{name:'Totem Spirit'}]}),mine:true,inCombat:true},'zh-CN');
    assert.ok(renderer.elements().filter(row=>row.type==='button').every(row=>row.props.disabled));
  }finally{globalThis.fetch=realFetch;}
});
await test('actual dialog slot spend posts once, and the next cast uses the existing manual payment once',async()=>{
  const hero=world.addHero({name:'Goblin',class:'wizard',level:3,maxHp:20,spellcasting:{ability:'int',slots:{1:{max:4,used:0},2:{max:2,used:0}},known:['Magic Missile'],prepared:['Magic Missile']}});
  world.signIn(world.owner);
  const route=await world.route('campaigns/[campaignId]/sheet/usage'),calls=[],realFetch=globalThis.fetch;
  globalThis.fetch=async(url,options)=>{calls.push({url,...options});return route.POST(new Request('http://odm.test/usage',options),{params:Promise.resolve({campaignId:world.campaignId})});};
  renderer.render('CharacterSheetDialog',{...own,sheet:world.sheet(hero.id)},'zh-CN');
  const spend=renderer.elements().find(({type,props})=>type==='button'&&props['aria-label']==='消耗一个1环法术位');
  assert.ok(spend);assert.equal(spend.props.disabled,false);
  try{spend.props.onClick();await new Promise(resolve=>setImmediate(resolve));await new Promise(resolve=>setImmediate(resolve));}
  finally{globalThis.fetch=realFetch;}
  assert.equal(calls.length,1);assert.deepEqual(JSON.parse(calls[0].body),{slots:{1:1}});
  assert.equal(world.sheet(hero.id).spellcasting.slots[1].used,1);
  const outcome=await world.invoke('use_spell_slot',{characterId:hero.id,spell:'Magic Missile',level:1});
  assert.equal(outcome.ok,true,JSON.stringify(outcome));
  assert.equal(world.sheet(hero.id).spellcasting.slots[1].used,1,'a hand-marked payment must not be spent twice');
});
await test('feature choice actions follow campaign locale independently of personal UI locale',async()=>{
  const sheet=dialogSheet({class:'barbarian',subclass:'Path of the Totem Warrior',features:[{name:'Totem Spirit'}]});
  const calls=[],realFetch=globalThis.fetch;
  globalThis.fetch=async(_url,options)=>{calls.push(JSON.parse(options.body));return Response.json({ok:true});};
  try{
    for(const [ui,campaign,title] of [['zh-CN','en','选择熊'],['en','zh-CN','Choose Bear']]){
      renderer.render('FeatureChoicePicker',{sheet,mine:true,inCombat:false,campaignLocale:campaign},ui);
      const button=renderer.elements().find(({type,props})=>type==='button'&&props.title===title);
      assert.ok(button);button.props.onClick();await new Promise(resolve=>setImmediate(resolve));
    }
  }finally{globalThis.fetch=realFetch;}
  assert.equal(calls[0].content,'I choose Bear for Totem Spirit.');
  assert.equal(calls[1].content,'我为图腾精魂选择熊。');
  for(const request of calls) assert.deepEqual(request.intent,{card:'feature',resourceId:'Totem Spirit',variant:'Bear'});
});
await test('a cold English UI loads the Chinese campaign catalog before issuing its one action',()=>{
  const output=execFileSync(process.execPath,[path.join(root,'scripts/lib/sheet-choice-locale-check.mjs')],{cwd:root,encoding:'utf8',timeout:10000});
  assert.match(output,/cold campaign locale: one correctly localized action/);
});
await test('actual dialog armor button charges ten minutes once and returns a rerenderable time note',async()=>{
  const hero=world.addHero({name:'阿明',class:'fighter',level:1,equipment:[{name:'Plate',qty:1,equipped:false}]});
  world.signIn(world.owner);
  const {getClock}=await import('../src/lib/db/clock.ts');
  const route=await world.route('campaigns/[campaignId]/sheet/usage'),before=getClock(world.campaignId),calls=[],realFetch=globalThis.fetch;
  const props={...own,mine:false,sheet:world.sheet(hero.id)};
  globalThis.fetch=async(url,options)=>{calls.push({url,...options});return route.POST(new Request('http://odm.test/usage',options),{params:Promise.resolve({campaignId:world.campaignId})});};
  renderer.render('CharacterSheetDialog',{...props,mine:true},'zh-CN');
  const wear=renderer.elements().find(({type,props})=>type==='button'&&props.children==='穿戴');assert.ok(wear);
  // The real owner field uses its own authenticated sheet; sign in the
  // second hero's player for the owner-visible wear control.
  const {getUserById}=await import('../src/lib/db/users.ts');world.signIn(getUserById(hero.userId));
  try{wear.props.onClick();await new Promise(resolve=>setImmediate(resolve));await new Promise(resolve=>setImmediate(resolve));}
  finally{globalThis.fetch=realFetch;}
  assert.equal(calls.length,1);assert.deepEqual(JSON.parse(calls[0].body),{gear:{Plate:{equipped:true}}});
  assert.equal(world.sheet(hero.id).equipment[0].equipped,true);
  const after=getClock(world.campaignId);assert.equal(after.instant-before.instant,10);
  const time=renderer.updates().find(row=>row.file===DIALOG_FILE&&row.at===3&&typeof row.value==='string')?.value;
  assert.equal(time,'Putting on Plate takes 10 minutes.');assert.equal(sheetTimePassed(time,'zh-CN'),'穿上全身板甲需要 10 分钟。');
});
await test('new sheet dialog/material keys stay in route content resources and out of root UI resources',()=>{
  for(const locale of ['en','zh-CN']){
    const ui=JSON.parse(fs.readFileSync(path.join(root,`src/lib/i18n/resources/${locale}.ui.json`)));
    const content=JSON.parse(fs.readFileSync(path.join(root,`src/lib/i18n/resources/${locale}.content.json`)));
    const keys=Object.keys(MESSAGE_CATALOGS[locale]).filter(k=>k.startsWith('sheetDialog.'));
    assert.ok(keys.length>160);for(const key of keys){assert.equal(ui[key],undefined);assert.equal(content[key],MESSAGE_CATALOGS[locale][key]);}
  }
});
await test('Chinese and English resource counter clicks post one canonical usage update and preserve real short-rest recharge',async()=>{
  const hero=world.addHero({name:'阿明',class:'fighter',level:3,subclass:'Battle Master',features:[{name:'Combat Superiority'}]});
  const {getUserById}=await import('../src/lib/db/users.ts');world.signIn(getUserById(hero.userId));
  const route=await world.route('campaigns/[campaignId]/sheet/usage');
  const calls=[],realFetch=globalThis.fetch;
  globalThis.fetch=async(url,options)=>{calls.push({url,...options});return route.POST(new Request('http://odm.test/usage',options),{params:Promise.resolve({campaignId:world.campaignId})});};
  try{
    for(const locale of ['zh-CN','en']){
      world.patch(hero.id,{resources:{sub_superiority_dice:{max:4,used:0}}});
      renderer.render('CharacterSheetDialog',{...own,sheet:world.sheet(hero.id)},locale);
      const row=renderer.elements().find(({props})=>props.id==='sub_superiority_dice'&&typeof props.onSpend==='function');assert.ok(row);
      assert.equal(row.props.name,locale==='zh-CN'?'卓越骰':'Superiority Dice');
      const before=calls.length;row.props.onSpend();await new Promise(resolve=>setImmediate(resolve));await new Promise(resolve=>setImmediate(resolve));
      assert.equal(calls.length-before,1);assert.deepEqual(JSON.parse(calls.at(-1).body),{resources:{sub_superiority_dice:1}});
      assert.equal(world.sheet(hero.id).resources.sub_superiority_dice.used,1);
    }
  }finally{globalThis.fetch=realFetch;}
  const {getClock}=await import('../src/lib/db/clock.ts');const before=getClock(world.campaignId).instant;
  const rested=await world.invoke('take_rest',{kind:'short'});assert.equal(rested.ok,true,JSON.stringify(rested));
  assert.deepEqual(world.sheet(hero.id).resources.sub_superiority_dice,{max:4,used:0});
  assert.equal(getClock(world.campaignId).instant-before,60);
});
world.close();finish();
