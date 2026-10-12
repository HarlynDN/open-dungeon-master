// Grouped engine/persistence check for rest, death and reaction display.
import assert from 'node:assert/strict';
import {openWorld} from './lib/enforce-world.mjs';
const {rollDeathSave}=await import('../src/lib/dm/death.ts');
const {tickClockConditions}=await import('../src/lib/dm/condition-tick.ts');
const {listAllMessages,insertCampaignMessage}=await import('../src/lib/db/messages.ts');
const {systemEventText}=await import('../src/lib/i18n/system-event-presentations.ts');
const {parseSystemEvent,systemEventGlyph}=await import('../src/lib/system-events.ts');
const {handReactionPrompt}=await import('../src/lib/i18n/hand-material-presentations.ts');
const {reactionHitText}=await import('../src/lib/battlemap/hand-react.ts');
const worlds=[];
try{
 for(const locale of ['en','zh-CN']){
  const w=await openWorld({gameSettings:{locale}});worlds.push(w);
  const hero=w.addHero({name:'米拉 {hours}',class:'fighter',level:5,abilities:{con:14}});
  const track={successes:0,failures:0,stable:false,dead:false};
  const reset=(extra={})=>w.patch(hero.id,{currentHp:0,deathSaves:{...track},conditions:['unconscious','prone'],conditionMeta:{},exhaustion:0,...extra});
  const latest=kind=>listAllMessages(w.campaignId).findLast(m=>m.systemEvent?.kind===kind);
  function note(outcome,english){const m=latest('death');assert.equal(m.systemEvent.outcome,outcome);assert.equal(m.systemEvent.english,english);assert.equal(m.content,systemEventText(m.systemEvent));assert.ok(parseSystemEvent(m.systemEvent));if(locale==='en')assert.equal(m.content,english);else assert.ok(m.content.includes(hero.name));return m;}
  reset();w.dice(7);rollDeathSave(w.campaign(),hero.id);assert.equal(w.sheet(hero.id).deathSaves.failures,1);
  note('save',`${hero.name} death save: rolled 7, failure (0 successes, 1 failures).`);
  w.dice(12);rollDeathSave(w.campaign(),hero.id);assert.equal(w.sheet(hero.id).deathSaves.successes,1);
  note('save',`${hero.name} death save: rolled 12, success (1 successes, 1 failures).`);
  reset({deathSaves:{...track,successes:2}});w.dice(12,2);rollDeathSave(w.campaign(),hero.id);
  assert.equal(w.sheet(hero.id).deathSaves.stable,true);assert.equal(w.sheet(hero.id).currentHp,0);
  note('stable',`${hero.name} succeeds their third death save and is stable (unconscious at 0 HP). They regain 1 hit point in 2 hours.`);
  const beforeWake=listAllMessages(w.campaignId).length;tickClockConditions(w.campaign(),120);
  assert.equal(w.sheet(hero.id).currentHp,1);assert.equal(w.sheet(hero.id).deathSaves,null);
  const wake=note('wake',`${hero.name} comes round with 1 hit point.`);
  const newMessages=listAllMessages(w.campaignId).slice(beforeWake);assert.equal(newMessages.filter(m=>m.systemEvent?.outcome==='wake').length,1);
  assert.equal(newMessages.filter(m=>m.content.includes('comes round')).length,locale==='en'?1:0);
  if(locale==='zh-CN')assert.match(wake.content,/苏醒/);
  reset();w.dice(20);rollDeathSave(w.campaign(),hero.id);assert.equal(w.sheet(hero.id).currentHp,1);
  note('revive',`${hero.name} rolls a natural 20 on their death save and regains 1 HP!`);
  reset({deathSaves:{...track,failures:2}});w.dice(7);rollDeathSave(w.campaign(),hero.id);assert.equal(w.sheet(hero.id).deathSaves.dead,true);
  note('dead',`${hero.name} fails their final death save and dies.`);
  reset({currentHp:1,deathSaves:null,conditions:[]});let result=await w.invoke('apply_damage',{characterId:hero.id,amount:10000});assert.equal(result.ok,true,result.error);
  assert.equal(w.sheet(hero.id).deathSaves.dead,true);note('massive',`${hero.name} is killed outright by massive damage.`);assert.match(JSON.stringify(result.result),/INSTANTLY/);
  reset({deathSaves:{...track,failures:2}});result=await w.invoke('apply_damage',{characterId:hero.id,amount:1});assert.equal(result.ok,true,result.error);
  assert.equal(w.sheet(hero.id).deathSaves.dead,true);note('wounds',`${hero.name} has died of their wounds.`);
  reset({currentHp:7,deathSaves:null,conditions:[]});
  result=await w.invoke('take_rest',{kind:'short',spend:[]});assert.equal(result.ok,true,result.error);
  let rest=latest('rest');assert.equal(rest.systemEvent.minutes,60);assert.equal(result.result.restedFor,'1 hour');assert.equal(rest.content,systemEventText(rest.systemEvent));
  const dead=w.addHero({name:'倒下的同伴 {actor}',class:'fighter',level:3});w.patch(dead.id,{currentHp:0,deathSaves:{...track,failures:3,dead:true}});
  const zero=w.addHero({name:'受伤的同伴',class:'fighter',level:3});w.patch(zero.id,{currentHp:0,deathSaves:{...track},conditions:['unconscious','prone']});
  result=await w.invoke('take_rest',{kind:'long'});assert.equal(result.ok,true,result.error);
  rest=latest('rest');assert.equal(rest.systemEvent.minutes,480);assert.equal(result.result.restedFor,'8 hours');assert.match(JSON.stringify(result.result),/HP and spell slots are fully restored/);
  assert.equal(w.sheet(hero.id).currentHp,w.sheet(hero.id).maxHp);assert.equal(w.sheet(dead.id).currentHp,0);assert.equal(w.sheet(zero.id).currentHp,0);
  assert.deepEqual(rest.systemEvent.skipped.map(s=>s.reason),['dead','zeroHp']);assert.equal(rest.content,systemEventText(rest.systemEvent));assert.ok(parseSystemEvent(rest.systemEvent));
  if(locale==='en')assert.equal(rest.content,rest.systemEvent.english);else{assert.match(rest.content,/长休（8 小时）/);assert.match(rest.content,/开始长休时生命值为 0/);assert.ok(!rest.content.includes('No benefit from it'));assert.ok(!rest.content.includes('It is now'));}
  result=await w.invoke('take_rest',{kind:'long'});assert.equal(result.ok,true,result.error);assert.ok(latest('rest').systemEvent.skipped.some(s=>s.reason==='tooSoon'&&s.actor===hero.name));
  const old=insertCampaignMessage({campaignId:w.campaignId,seq:1000000,authorType:'system',content:'Original old history.'});assert.equal(listAllMessages(w.campaignId).find(m=>m.id===old.id).content,'Original old history.');
  const hit={source:'attack',attacker:'狼王 {you}',attackerId:'e',attack:'Bite (opportunity attack)',characterId:hero.id,damage:4,type:'piercing'};
  const card={prompt:reactionHitText(hit,'you')},context={hits:[hit],viewerId:hero.id,party:[hero],enemies:[{id:'e',name:hit.attacker}]};
  const prompt=handReactionPrompt(card,locale,context);if(locale==='en')assert.equal(prompt,card.prompt);else{assert.ok(!prompt.includes('Bite'));assert.ok(!prompt.includes('opportunity attack'));assert.ok(prompt.includes(hit.attacker));}
 }
 for(const [minutes,label]of [[5,'5 分钟'],[60,'1 小时'],[480,'8 小时'],[10080,'7 天']]){
  const event={kind:'rest',rest:'long',minutes,english:'Exact English.',skipped:[],locale:'zh-CN'};assert.ok(systemEventText(event).includes(label));assert.equal(systemEventText({...event,locale:'en'}),'Exact English.');assert.ok(systemEventGlyph(event));
 }
 assert.equal(parseSystemEvent({kind:'death',outcome:'save',actor:'x',english:'e',locale:'zh-CN',successes:4,failures:0,total:1,success:false}),undefined);
 assert.equal(parseSystemEvent({kind:'rest',rest:'long',minutes:1,english:'e',locale:'zh-CN',skipped:[{actor:'x',reason:'unknown'}]}),undefined);
 console.log('Survival localization passed: real bilingual death saves, stabilization and one wake note, massive/wound death, short/long rest and all excluded-recipient reasons; native HP/status/timing and English tool fields; persisted typed facts and old history; registered reaction-action display and duration variants.');
}finally{worlds.at(-1)?.close();}
