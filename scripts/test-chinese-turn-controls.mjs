import assert from 'node:assert/strict';
import {suite} from './lib/enforce-harness.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
import {openTurnControlRenderer,turnControlFixtures,turnControlFiles,hero,ally,encounter,initiative,summary} from './lib/turn-control-fixtures.mjs';
import {turnControlErrorText,fightOutcomeLabel,turnPipLabel} from '../src/lib/i18n/turn-control-presentations.ts';
const {test,finish}=suite('test-chinese-turn-controls');
const renderer=await openTurnControlRenderer();
const flatten=value=>Array.isArray(value)?value.map(flatten).join(''):value&&typeof value==='object'?flatten(value.props?.children):value??'';
const control=(kind,label)=>{
  const element=renderer.elements().find(({type,props})=>(kind==='button'?type==='button':!!props.onSelect)&&flatten(props.children).trim()===label);
  assert.ok(element,`Missing ${kind}: ${label}`);return element.props;
};
async function withFetch(reply,fn) {
  const original=globalThis.fetch,calls=[];
  globalThis.fetch=async(url,options)=>{
    calls.push({url,method:options?.method,body:options?.body?JSON.parse(options.body):null});
    if(reply instanceof Error)throw reply;
    return new Response(JSON.stringify(reply??{}),{status:reply?.error?409:200});
  };
  try{await fn(calls);}finally{globalThis.fetch=original;}
}
const floorProps={campaignId:'campaign-id',floor:initiative,spotlighted:[hero,ally],heldSpotlightNames:[],encounter,steersStory:true,meUserId:'u',onRelease:()=>{}};

await test('32 pre-edit English renders remain byte-identical; localized controls preserve permissions and numeric summaries',()=>{
  const baseline=readValidationJson(new URL('../docs/validation/turn-control-ui-goldens.json',import.meta.url).pathname);
  const en=turnControlFixtures(renderer),zh=turnControlFixtures(renderer,'zh-CN');
  assert.equal(baseline.length,32);assert.deepEqual(en,baseline);
  const attrs=html=>[...html.matchAll(/<(button|input|select)\b([^>]*)>/g)].map(row=>({tag:row[1],attrs:(row[2].match(/(?:type|disabled|value|maxLength|aria-busy|aria-pressed)="[^"]*"/g)??[]).sort()}));
  for(let i=0;i<en.length;i++) {
    assert.equal(en[i].name,zh[i].name);assert.deepEqual(attrs(en[i].html),attrs(zh[i].html),en[i].name);
    if(en[i].name!=='floor/open')assert.match(zh[i].html,/\p{Script=Han}/u,en[i].name);
    if(en[i].name.startsWith('summary/')||en[i].name==='pips')assert.deepEqual(zh[i].html.match(/\d+/g),en[i].html.match(/\d+/g),en[i].name);
  }
  const of=name=>zh.find(row=>row.name===name).html;
  assert.match(of('floor/initiative'),/哥布林 2/);assert.match(of('floor/initiative'),/>Goblin</);
  assert.match(of('floor/refusal'),/哥布林 2先行动/);
  assert.match(of('floor/spotlight'),/Authored question Goblin/);
  assert.match(of('halted/true'),/Authored backend diagnostic Goblin/);
  assert.match(of('summary/authored_result'),/authored result/);
  assert.match(of('pips/authored'),/Authored Goblin budget/);
  const copy=structuredClone({encounter,summary,hero});turnControlFixtures(renderer,'zh-CN');
  assert.deepEqual({encounter,summary,hero},copy);
});

await test('end turn and release retain their transport and refusal state switches language without another request',async()=>{
  const raw='Goblin 2 acts first: wait for its turn, then take yours.';
  await withFetch({error:raw},async calls=>{
    renderer.render('FloorBanners',floorProps,'zh-CN');await control('button','结束回合').onClick();
    assert.deepEqual(calls,[{url:'/api/campaigns/campaign-id/encounter/end-turn',method:'POST',body:null}]);
    const error=renderer.updates().findLast(update=>update.at===1&&update.value?.data)?.value;
    assert.equal(error.data.error,raw);
    for(const [locale,expected] of [['zh-CN','哥布林 2先行动'],['en',raw]]) {
      const html=renderer.render('FloorBanners',floorProps,locale,{queues:{[turnControlFiles[0]]:[false,error]}});
      assert.ok(html.includes(expected),html);
    }
    assert.equal(calls.length,1);
  });
  let released=0;renderer.render('FloorBanners',{...floorProps,onRelease:()=>released++},'zh-CN');
  control('button','跳过回合').onClick();assert.equal(released,1);
  renderer.render('FloorBanners',{...floorProps,steersStory:false,meUserId:'v'},'zh-CN');
  assert.equal(renderer.elements().filter(({type,props})=>type==='button'&&props.onClick).length,0);
});

await test('lead spotlight sends original selected IDs and authored Chinese prompt; floor modes stay canonical',async()=>{
  const props={campaignId:'campaign-id',floor:{mode:'open'},sheets:[hero,ally],encounter};
  await withFetch({},async calls=>{
    renderer.render('LeadFloorControl',props,'zh-CN',{queues:{[turnControlFiles[1]]:[false,null,['ally'],'  你打算怎么做？  ']}});
    await control('button','指定玩家行动').onClick();
    assert.deepEqual(calls[0],{url:'/api/campaigns/campaign-id/floor',method:'POST',body:{set:'spotlight',characterIds:['ally'],prompt:'你打算怎么做？'}});
    renderer.render('LeadFloorControl',props,'zh-CN');await control('button','暂停并讨论').onClick();
    assert.deepEqual(calls[1].body,{set:'hold'});
    renderer.render('LeadFloorControl',{...props,floor:{mode:'hold',next:{mode:'open'}}},'zh-CN');await control('button','允许自由行动').onClick();
    assert.deepEqual(calls[2].body,{set:'open'});
  });
});

await test('halted retry sends only the existing turn ID; busy and non-authority branches cannot start a new retry',async()=>{
  const props={campaignId:'campaign-id',turnId:'turn-id',content:'The DM ran into a problem: diagnostic',canRetry:true};
  await withFetch({error:'That turn is waiting on dice. Submit the roll to continue.'},async calls=>{
    renderer.render('HaltedTurnBanner',props,'zh-CN');await control('button','重试本回合').onClick();
    assert.deepEqual(calls,[{url:'/api/campaigns/campaign-id/dm-turn/retry',method:'POST',body:{turnId:'turn-id'}}]);
    const error=renderer.updates().findLast(update=>update.at===1&&update.value?.data)?.value;
    assert.match(renderer.render('HaltedTurnBanner',props,'zh-CN',{queues:{[turnControlFiles[2]]:[false,error]}}),/等待掷骰/);
    renderer.render('HaltedTurnBanner',props,'zh-CN',{queues:{[turnControlFiles[2]]:[true,null]}});
    const busy=control('button','正在继续本回合…');assert.equal(busy.disabled,true);await busy.onClick();assert.equal(calls.length,1);
    renderer.render('HaltedTurnBanner',{...props,canRetry:false},'zh-CN');
    assert.equal(renderer.elements().filter(({type,props})=>type==='button'&&props.onClick).length,0);
  });
});

await test('menu callbacks, lead transfer, mute and companion removal use the original entities and request values',async()=>{
  let opened=0;const props={sheet:hero,steersStory:true,leadUserId:'other',canTransferLead:true,onViewSheet:()=>opened++,onNotes:()=>{},onAdjust:()=>{},canMute:true};
  await withFetch({},async calls=>{
    renderer.render('CharacterMenu',props,'zh-CN');
    let prevented=false;control('item','查看角色卡').onSelect({preventDefault:()=>prevented=true});
    await new Promise(resolve=>setTimeout(resolve,5));assert.equal(prevented,true);assert.equal(opened,1);
    await control('item','设为队长').onSelect();await control('item','禁言玩家').onSelect();
    renderer.render('CharacterMenu',{...props,sheet:{...hero,isCompanion:true}},'zh-CN');await control('item','遣散伙伴').onSelect();
    assert.deepEqual(calls,[
      {url:'/api/campaigns/campaign-id/lead',method:'POST',body:{userId:'u'}},
      {url:'/api/campaigns/campaign-id/mute',method:'POST',body:{userId:'u',muted:true}},
      {url:'/api/campaigns/campaign-id/companions/hero',method:'DELETE',body:null},
    ]);
  });
});

await test('diagnostics distinguish enemy lists from proper names and retain exact English; network failures rerender in either locale',async()=>{
  const error=raw=>({data:{error:raw},fallback:'turnUi.error.end'});
  const plural='Goblin 1 and Salt and Stone and Goblin 2 act first: wait for their turns, then take yours.';
  assert.equal(turnControlErrorText(error(plural),'en'),plural);
  assert.match(turnControlErrorText(error(plural),'zh-CN',['Salt and Stone','Goblin 2','Goblin 1']),/哥布林 1, Salt and Stone, 哥布林 2先行动/);
  const ambiguous='Salt and Stone acts first: wait for its turn, then take yours.';
  assert.match(turnControlErrorText(error(ambiguous),'zh-CN',['Salt','Stone','Salt and Stone']),/Salt and Stone先行动/);
  assert.match(turnControlErrorText(error('Only the Dungeon Master can do that.'),'zh-CN'),/仅地下城主/);
  assert.equal(turnPipLabel('Authored budget','zh-CN'),'Authored budget');
  assert.equal(fightOutcomeLabel('authored_outcome','zh-CN'),'authored outcome');
  await withFetch(new Error('offline'),async calls=>{
    renderer.render('FloorBanners',floorProps,'zh-CN');await control('button','结束回合').onClick();
    const stored=renderer.updates().findLast(update=>update.at===1&&update.value?.fallback)?.value;
    assert.equal(stored.fallback,'turnUi.error.table');assert.match(turnControlErrorText(stored,'zh-CN'),/无法连接游戏/);
    assert.equal(turnControlErrorText(stored,'en'),'Could not reach the table.');assert.equal(calls.length,1);
  });
});
finish();
