import assert from 'node:assert/strict';
import {readValidationJson} from './lib/validation-json.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {openCombatRenderer,combatUiFixtures} from './lib/combat-ui-fixtures.mjs';
import {combatErrorText,combatName,combatTermLabel,encounterHealthLabel,pendingRollLabel} from '../src/lib/i18n/combat-ui-presentations.ts';
const {test,finish}=suite('test-chinese-combat-ui');
const renderer=await openCombatRenderer();
const en=combatUiFixtures(renderer),zh=combatUiFixtures(renderer,'zh-CN');
const baseline=readValidationJson(new URL('../docs/validation/combat-ui-goldens.json',import.meta.url).pathname);
const of=(rows,name)=>{const row=rows.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/g,' ');
const controls=html=>[...html.matchAll(/<(button|input|select|option)\b([^>]*)>/g)].map(row=>({tag:row[1],attrs:(row[2].match(/(?:type|disabled|value|min|max|aria-busy|aria-pressed)="[^"]*"/g)??[]).sort()}));
const pendingFile='src/app/campaigns/[campaignId]/PendingRollCard.tsx';
const orderFile='src/app/campaigns/[campaignId]/DmInitiativePanel.tsx';
const encounterFile='src/app/campaigns/[campaignId]/EncounterPanel.tsx';
const pending={id:'roll-id',userId:'u',characterId:'hero',kind:'skill_check',detail:'perception',expression:'1d20+3',advantage:'none',dc:12,reason:'Authored reason',createdAt:'2020-01-01T00:00:00Z'};
const rollProps={campaignId:'campaign-id',pending,sheets:[{id:'hero',name:'Aria',resources:{inspiration:{max:1,used:0}}}],members:[{userId:'u',useRealDice:true,holdRolls:false}],meUserId:'u',steersStory:false};
const enemy={id:'enemy-id',name:'Goblin 2',type:'humanoid',cr:0.25,status:'alive',health:'healthy',conditions:[],groupKey:'g'};
const encounter={id:'fight',round:2,orderReady:true,order:[{kind:'pc',id:'hero',name:'Aria',initiative:15},{kind:'enemy',id:'enemy-id',name:'Goblin 2',initiative:10}],turnIndex:0,enemies:[enemy],enemiesDue:[]};
const flatten=value=>Array.isArray(value)?value.map(flatten).join(''):value&&typeof value==='object'?flatten(value.props?.children):value??'';
const button=predicate=>{const found=renderer.elements().find(element=>element.type==='button'&&predicate(element.props));assert.ok(found,'Expected actionable button');return found.props;};
const click=async props=>{assert.ok(!props.disabled,'Button must be enabled');await props.onClick();await new Promise(resolve=>setImmediate(resolve));};
async function withFetch(reply,fn){
  const original=globalThis.fetch,calls=[];
  globalThis.fetch=async(url,options)=>{calls.push({url,method:options?.method,body:options?.body?JSON.parse(options.body):null});return typeof reply==='function'?reply(calls.length):new Response(JSON.stringify(reply??{}),{status:200});};
  try{await fn(calls);}finally{globalThis.fetch=original;}
}

await test('38 immutable English renders stay exact; Chinese controls and displayed quantities preserve the original projections',()=>{
  assert.equal(baseline.length,38);assert.deepEqual(en,baseline);
  for(let i=0;i<en.length;i++){
    assert.equal(en[i].name,zh[i].name);assert.deepEqual(controls(zh[i].html),controls(en[i].html),en[i].name);
    if(en[i].name==='condition/authored')assert.equal(zh[i].html,en[i].html,'Authored conditions are preserved');
    else assert.match(zh[i].html,/\p{Script=Han}/u,en[i].name);
    // "2nd turn" is rendered as "额外回合"; its meaning is checked below.
    if(en[i].name!=='order/hidden-reflex')assert.deepEqual(text(zh[i].html).match(/\d+(?:\.\d+)?/g),text(en[i].html).match(/\d+(?:\.\d+)?/g),en[i].name);
  }
  assert.match(of(zh,'roll/success'),/技能检定.*察觉/);assert.match(of(zh,'roll/success'),/成功！/);
  assert.match(of(zh,'roll/failure'),/失败！/);
  assert.match(of(zh,'roll/blind'),/在屏幕后掷骰/);
  assert.doesNotMatch(of(zh,'roll/blind'),/难度 12|DC 12|成功！/);
  assert.match(of(zh,'roll/enemy'),/哥布林 2.*短棒 对Aria/);
  assert.match(of(zh,'order/hidden-reflex'),/已隐藏.*盗贼反射：第一轮额外获得一个回合.*额外回合/);
  assert.match(of(zh,'plate'),/哥布林 1.*即将倒下.*中毒.*四分之三掩护.*夹击.*远程攻击具有劣势/);
  assert.match(of(zh,'targets/full'),/哥布林 1.*伤势严重.*15 英尺/);
  for(const name of ['roll/authored','modifier','pending/manual','pending/pixel','condition/authored'])assert.match(text(of(zh,name)),/Authored/,name);
});

await test('catalog terms localize by role; player names and authored strings survive and display helpers never mutate inputs',()=>{
  assert.equal(combatName('Goblin 2','enemy','zh-CN'),'哥布林 2');
  assert.equal(combatName('Goblin 2','pc','zh-CN'),'Goblin 2');
  assert.equal(combatName('Goblin King Gruk','enemy','zh-CN'),'Goblin King Gruk');
  assert.equal(combatTermLabel('ability','Wisdom','zh-CN'),'感知');
  assert.equal(combatTermLabel('skill','perception','zh-CN'),'察觉');
  assert.equal(combatTermLabel('condition','poisoned','zh-CN'),'中毒');
  assert.equal(combatTermLabel('condition','Authored {condition}','zh-CN'),'Authored {condition}');
  assert.equal(pendingRollLabel({...pending,kind:'authored_roll',detail:'Authored {detail}'},'Aria','en'),'Aria: authored roll (Authored {detail})');
  const copy=structuredClone(encounter);
  renderer.render('DmInitiativePanel',{campaignId:'campaign-id',encounter},'zh-CN');assert.deepEqual(encounter,copy);
  renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter,steersStory:false},'zh-CN');assert.deepEqual(encounter,copy);
});

await test('down, nonlethal unconsciousness, regeneration and actual death remain distinct; a collapsed mob does not count downed members as standing',()=>{
  assert.equal(encounterHealthLabel({...enemy,health:'dead'},'zh-CN'),'倒下');
  assert.equal(encounterHealthLabel({...enemy,health:'dead',status:'dead'},'zh-CN'),'死亡');
  assert.equal(encounterHealthLabel({...enemy,health:'dead',knockedOut:true},'zh-CN'),'已击昏');
  assert.match(of(zh,'encounter/knocked-out'),/仍然活着.*不会进入濒死状态/);
  assert.match(of(zh,'encounter/regenerating'),/倒下但尚未死亡.*回合开始时再生/);
  assert.match(of(zh,'encounter/regeneration-stopped'),/阻止再生的伤害.*回合开始时死亡/);
  const group={...encounter,enemies:[enemy,{...enemy,id:'down',health:'dead',knockedOut:true},{...enemy,id:'regen',health:'dead',regenerating:{stopped:false}}]};
  assert.match(renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter:group,steersStory:false},'zh-CN'),/1 名仍在战斗/);
  assert.match(renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter:group,steersStory:false},'en'),/1 standing/);
  assert.doesNotMatch(of(zh,'encounter/normal'),/护甲等级 13|3\/8/);
  assert.match(of(zh,'encounter/dm-health'),/3\/8 护甲等级 13/);
});

await test('raw API errors rerender in both locales; known refusals retain names and dice bounds, unknown Chinese diagnostics use a safe localized fallback',()=>{
  for(const [raw,expected]of [['That roll was already resolved.','这次掷骰已经结算'],['Die 2 must be a whole number from 1 to 20.','第 2 颗骰的数值必须是 1 至 20 的整数'],['Aria is already at the bottom.','Aria已位于最后'],["It is already Aria's turn.",'当前已经是Aria的回合']]){
    const error={data:{error:raw},fallback:'combatUi.error.rollSubmit'};
    assert.equal(combatErrorText(error,'en'),raw);assert.ok(combatErrorText(error,'zh-CN').includes(expected));
  }
  const error={data:{error:'An unknown English server diagnostic'},fallback:'combatUi.error.rollSubmit'};
  for(const locale of ['en','zh-CN']){
    const html=renderer.render('PendingRollCard',rollProps,locale,{queues:{[pendingFile]:[{},false,error]}});
    assert.ok(html.includes(locale==='en'?error.data.error:'未能提交掷骰'));
  }
  const orderError={data:{error:'No active encounter.'},fallback:'combatUi.error.order'};
  assert.match(renderer.render('DmInitiativePanel',{campaignId:'campaign-id',encounter},'zh-CN',{queues:{[orderFile]:[false,orderError]}}),/当前没有进行中的遭遇/);
  assert.match(renderer.render('PendingRollCard',{...rollProps,meUserId:'owner',steersStory:true},'zh-CN',{queues:{[pendingFile]:[{},false,error]}}),/role="alert"[^>]*>未能提交掷骰/);
});

await test('actual pending-roll buttons submit unchanged manual, digital, Inspiration and preference payloads in both locales',async()=>{
  for(const locale of ['en','zh-CN'])await withFetch({},async calls=>{
    renderer.render('PendingRollCard',rollProps,locale,{queues:{[pendingFile]:[{0:'12'},false,null]}});
    await click(button(p=>flatten(p.children)===(locale==='en'?'Submit roll':'提交掷骰')));
    assert.deepEqual(calls.pop(),{url:'/api/campaigns/campaign-id/pending-rolls/roll-id',method:'POST',body:{dice:[12]}});
    renderer.render('PendingRollCard',rollProps,locale);
    await click(button(p=>flatten(p.children)===(locale==='en'?'Roll digitally instead':'改用电子骰')));
    assert.deepEqual(calls.pop(),{url:'/api/campaigns/campaign-id/pending-rolls/roll-id',method:'POST',body:{fallback:'digital'}});
    renderer.render('PendingRollCard',rollProps,locale);
    await click(button(p=>p.title===(locale==='en'?'Spend your Inspiration: advantage on this roll.':'消耗激励，为这次掷骰获得优势。')));
    assert.deepEqual(calls.pop(),{url:'/api/campaigns/campaign-id/pending-rolls/roll-id/inspiration',method:'POST',body:null});
    renderer.render('PendingRollCard',{...rollProps,members:[{userId:'u',holdRolls:true,useRealDice:false}]},locale);
    await click(button(p=>flatten(p.children)===(locale==='en'?'Stop holding my rolls':'不再等待我确认掷骰')));
    assert.deepEqual(calls.pop(),{url:'/api/campaigns/campaign-id/members/me',method:'PATCH',body:{holdRolls:false}});
    assert.equal(calls.length,0);
  });
});

await test('initiative controls retain IDs, direction and typed names; target chips return canonical IDs in both locales',async()=>{
  for(const locale of ['en','zh-CN'])await withFetch({},async calls=>{
    renderer.render('DmInitiativePanel',{campaignId:'campaign-id',encounter},locale);
    await click(button(p=>p['aria-label']===(locale==='en'?'Move Goblin 2 up the order':'将哥布林 2上移')));
    assert.deepEqual(calls.pop().body,{op:'move',id:'enemy-id',direction:'up'});
    renderer.render('DmInitiativePanel',{campaignId:'campaign-id',encounter},locale);
    await click(button(p=>p['aria-label']===(locale==='en'?'Back a turn':'上一个回合')));
    assert.deepEqual(calls.pop().body,{op:'step',direction:'back'});
    renderer.render('DmInitiativePanel',{campaignId:'campaign-id',encounter},locale,{queues:{[orderFile]:[false,null,true,'Authored NPC',12]}});
    await click(button(p=>flatten(p.children)===(locale==='en'?'Add':'添加')));
    assert.deepEqual(calls.pop().body,{op:'insert',name:'Authored NPC',initiative:12});
    let picked=null;renderer.render('TargetChips',{targets:[{token:{id:'enemy-id',name:'Goblin 2',kind:'enemy'},face:[],feet:15}],onPick:id=>{picked=id;}},locale);
    await click(button(()=>true));assert.equal(picked,'enemy-id');
  });
});

await test('failed combat requests store raw errors and switching language can display them; ending/forcing a fight requires the existing confirmations',async()=>{
  await withFetch(()=>new Response(JSON.stringify({error:'That roll was already resolved.'}),{status:409}),async()=>{
    renderer.render('PendingRollCard',rollProps,'zh-CN');await click(button(p=>flatten(p.children)==='改用电子骰'));
    const update=renderer.updates().find(row=>row.file===pendingFile&&row.at===2&&row.value?.data?.error);assert.ok(update);
    assert.equal(update.value.data.error,'That roll was already resolved.');assert.equal(combatErrorText(update.value,'en'),'That roll was already resolved.');assert.match(combatErrorText(update.value,'zh-CN'),/已经结算/);
  });
  await withFetch(()=>{throw new Error('Simulated network failure');},async calls=>{
    renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter,steersStory:true,canEditOrder:true},'zh-CN',{confirmReplies:[true]});
    await click(button(p=>flatten(p.children)==='结束遭遇'));assert.equal(calls.length,1);assert.deepEqual(calls[0].body,{name:'end_encounter',args:{}});
    const update=renderer.updates().find(row=>row.file===encounterFile&&row.at===2&&row.value?.fallback==='combatUi.error.network');assert.ok(update);
    const html=renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter,steersStory:true},'zh-CN',{queues:{[encounterFile]:[false,[],update.value]}});assert.match(html,/role="alert"[^>]*>无法连接服务器/);
  });
  await withFetch(index=>new Response(JSON.stringify(index===1?{error:'No active encounter.'}:{}),{status:index===1?409:200}),async calls=>{
    renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter,steersStory:true,canEditOrder:true},'zh-CN',{confirmReplies:[true,true]});
    await click(button(p=>flatten(p.children)==='结束遭遇'));assert.equal(calls.length,2);assert.equal(calls[1].method,'DELETE');assert.equal(calls[1].url,'/api/campaigns/campaign-id/encounter');
    const prompts=renderer.confirmations();assert.equal(prompts.length,2);assert.match(prompts[0][0],/授予经验值.*无法重新开启/);assert.match(prompts[1][0],/当前没有进行中的遭遇.*不会授予经验值/);
  });
  await withFetch({},async calls=>{
    renderer.render('EncounterPanel',{campaignId:'campaign-id',encounter,steersStory:true},'zh-CN');
    await click(button(p=>flatten(p.children)==='结束遭遇'));assert.equal(calls.length,0);assert.match(renderer.confirmations()[0][0],/不会结算结果或授予经验值/);
  });
});
finish();
