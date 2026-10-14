import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {checkCinematicFixtures} from './lib/check-cinematic-fixtures.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
import {BASE_ROLL} from './lib/roll-presentation-fixtures.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {openWorld} from './lib/enforce-world.mjs';
import {call} from './lib/enforce-campaign.mjs';
const root=path.resolve(import.meta.dirname,'..');const {test,finish}=suite('test-chinese-check-cinematic');
const renderer=await openCombatRenderer();const zh=checkCinematicFixtures(renderer,'zh-CN');
const html=name=>{const row=zh.find(row=>row.name===name);assert.ok(row,name);return row.html;};
const {rollPresentationLabel,rollPresentationActor}=await import('../src/lib/i18n/roll-presentations.ts');
const {parseRollPresentation}=await import('../src/lib/roll-presentation.ts');
const {localizedRollCardLabel}=await import('../src/lib/i18n/combat-ui-presentations.ts');
const {listRecentRolls}=await import('../src/lib/db/rolls.ts');
const {getDatabase}=await import('../src/lib/db/core.ts');
const world=await openWorld({gameSettings:{dicePolicy:"real_allowed"}});const hero=world.addHero({name:'Goblin, vs 米拉_2',class:'fighter',level:2,abilities:{str:10,dex:10,con:10,wis:10},proficiencies:{saves:['str','con'],skills:[],expertise:[],languages:['Common'],tools:[],armor:[],weapons:[]}});const ally=world.addHero({name:'阿明',class:'fighter',level:2,abilities:{str:10,dex:10}});
await test('30 original English component renders remain byte-for-byte equal to c2d86838',()=>{
 assert.deepEqual(checkCinematicFixtures(renderer),readValidationJson(path.join(root,'docs/validation/check-cinematic-goldens.json')));
 assert.match(html('check/group'),/Goblin.*群体隐匿检定/);assert.match(html('check/contest'),/哥布林 2.*察觉.*对抗检定/);
 assert.match(html('check/shove'),/Goblin.*运动.*推撞哥布林 2/);assert.match(html('check/authored'),/Authored &lt;title&gt;.*察觉/);
 assert.match(html('ribbon'),/第 2 轮.*哥布林 2.*Goblin, vs 米拉_2/);assert.doesNotMatch(html('ribbon'),/哥布林 3/);
 assert.match(html('party'),/Goblin, vs 米拉_2.*生命值 7\/12/);assert.match(html('party'),/战士/);
 assert.match(html('order'),/哥布林 3.*已隐藏.*额外回合/);
 assert.match(html('quest'),/任务.*Goblin.*Authored quest &lt;script&gt;/);
 assert.match(html('toast/attack'),/长剑.*哥布林 2/);assert.match(html('chronicle/attack'),/命中.*长剑.*哥布林 2/);
 assert.match(html('chronicle/secret'),/自定义台词.*未知人物台词.*Authored system prose/);
 assert.match(html('chronicle/empty'),/冒险纪事.*故事尚未开始.*发送/);
});
await test('composer mode values, submission, dictation and IME Enter behavior stay canonical',()=>{
 let mode=null,submitted=0,text='';
 const props={messages:[],rolls:[],sheets:[],members:[],isDm:false,steersStory:true,kind:'do',onKindChange:value=>mode=value,maxChars:2000,input:'先前文字',setInput:value=>text=value,sending:false,inputBlocked:false,placeholder:'Authored placeholder',onSubmit:()=>submitted++};
 renderer.render('TabletopChronicle',props,'zh-CN');
 const elems=renderer.elements(),buttons=elems.filter(e=>e.type==='button'&&e.props['data-mode']);
 assert.deepEqual(buttons.map(e=>e.props['data-mode']),['do','say','ooc','lead']);buttons[1].props.onClick();assert.equal(mode,'say');
 const input=elems.find(e=>e.type==='textarea');
 input.props.onKeyDown({key:'Enter',shiftKey:false,nativeEvent:{isComposing:true},preventDefault:()=>assert.fail('composing')});assert.equal(submitted,0);
 input.props.onKeyDown({key:'Enter',shiftKey:false,keyCode:229,preventDefault:()=>assert.fail('Safari composing')});assert.equal(submitted,0);
 input.props.onKeyDown({key:'Enter',shiftKey:true,preventDefault:()=>assert.fail('multiline')});assert.equal(submitted,0);
 input.props.onKeyDown({key:'Enter',shiftKey:false,preventDefault:()=>{}});assert.equal(submitted,1);
 const dictation=elems.find(e=>typeof e.props.onTranscript==='function');dictation.props.onTranscript('下一句');assert.match(text,/先前文字.*下一句/);
 elems.find(e=>e.type==='form').props.onSubmit({});assert.equal(submitted,2);
});
await test('typed check data survives restart, rejects malformed/future context and strips private fields',()=>{
 for(const p of [{kind:'check',term:null},{kind:'check',term:{kind:'future',key:'str'}},{kind:'check',term:{kind:'skill',key:'stealth'},context:{kind:'future'}},{kind:'check',term:{kind:'ability',key:'con'},owner:{name:'Goblin',kind:'future'}}])assert.equal(parseRollPresentation(p),undefined);
 const p=parseRollPresentation({kind:'check',term:{kind:'skill',key:'stealth',dc:15},owner:{name:'Goblin',kind:'proper',id:'secret'},context:{kind:'group',total:20},success:true});
 assert.deepEqual(p,{kind:'check',term:{kind:'skill',key:'stealth'},owner:{name:'Goblin',kind:'proper'},context:{kind:'group'}});
 assert.match(rollPresentationLabel({kind:'check',term:{kind:'skill',key:'acrobatics'},context:{kind:'land-jump'}},'zh-CN'),/特技.*难度 10/);
 assert.match(rollPresentationLabel({kind:'check',term:{kind:'skill',key:'athletics'},context:{kind:'escape-grapple',target:{name:'Goblin 2',kind:'enemy'},difficulty:13}},'zh-CN'),/哥布林 2.*难度 13/);
 assert.equal(parseRollPresentation({kind:'check',term:{kind:'skill',key:'athletics'},context:{kind:'escape-grapple',difficulty:13}}),undefined);
 const authored={kind:'check',term:{kind:'skill',key:'perception'},context:{kind:'authored',text:'Goblin, vs _ <script>'}};
 const before=structuredClone(authored);assert.match(rollPresentationLabel(authored,'zh-CN'),/Goblin, vs _ <script>/);assert.deepEqual(authored,before);
});
await test('actual group check uses the same dice and half-success rule; captions persist without translating proper names',async()=>{
 world.dice(12,2);const out=await world.invoke('group_check',{ability:'str',dc:10,characterIds:[hero.id,ally.id]});world.clearDice();assert.equal(out.ok,true,out.error);
 assert.equal(out.result.successes,1);assert.equal(out.result.total,2);assert.equal(out.result.passed,true);
 const rolls=listRecentRolls(world.campaignId,20).filter(r=>r.presentation?.context?.kind==='group');assert.equal(rolls.length,2);assert.deepEqual(rolls.map(r=>r.total).sort((a,b)=>a-b),[2,12]);
 for(const roll of rolls){assert.match(roll.detail,/: group str check/);assert.match(localizedRollCardLabel(roll,undefined,'zh-CN'),/群体力量检定/);assert.equal(roll.presentation.owner.kind,'proper');}
 getDatabase().close();globalThis.__localRoleplayDb=undefined;assert.deepEqual(listRecentRolls(world.campaignId,20).filter(r=>r.presentation?.context?.kind==='group').map(r=>r.presentation),rolls.map(r=>r.presentation));
});
await test('actual opposing roll and request roll keep hidden results and tie DC while localizing the enemy role',async()=>{
 world.dice(8,8);const out=await world.invoke('request_roll',{characterId:hero.id,kind:'skill_check',skill:'stealth',againstMonster:'goblin'});world.clearDice();assert.equal(out.ok,true,out.error);
 const rolls=listRecentRolls(world.campaignId,30),opp=rolls.find(r=>r.presentation?.context?.kind==='contest');assert.ok(opp);
 const mine=rolls.find(r=>r.characterId===hero.id&&r.detail==='stealth');assert.ok(mine);assert.equal(mine.dc,opp.total+1);assert.equal(opp.visibility,'dm');assert.equal(rollPresentationActor(opp.presentation,'zh-CN'),'哥布林');
 assert.match(rollPresentationLabel(mine.presentation,'zh-CN'),/隐匿/);assert.ok(!Object.hasOwn(opp.presentation,'total'));
 const {redactRoll}=await import('../src/lib/dm/viewer.ts');const redacted=redactRoll(opp);assert.equal(redacted.total,null);assert.equal(redacted.dc,null);assert.equal(redacted.breakdown,null);
});
await test('forced concentration/source saves and feature saves keep expressions, outcome, original detail and authored names',async()=>{
 const {rollCharacterSave}=await import('../src/lib/dm/forced-save.ts');const {checkRoll}=await import('../src/lib/roll-labels.ts');const {rollFeatureSave}=await import('../src/lib/dm/contest-roll.ts');
 world.dice(11);const saved=rollCharacterSave(world.campaign(),null,world.sheet(hero.id),'con',10,checkRoll('CON save to keep concentration (Bless)','ability','con',{kind:'concentration',name:'Bless'}));world.clearDice();assert.equal(saved.success,true);assert.equal(saved.total,13);
 let stored=listRecentRolls(world.campaignId,1)[0];assert.equal(stored.detail,'CON save to keep concentration (Bless)');assert.equal(stored.expression,'1d20+2');assert.match(rollPresentationLabel(stored.presentation,'zh-CN'),/体质.*维持专注.*祝福/);
 world.dice(9);rollFeatureSave(world.campaign(),world.sheet(hero.id),'wis',10,'Authored feature Goblin');world.clearDice();stored=listRecentRolls(world.campaignId,1)[0];assert.match(rollPresentationLabel(stored.presentation,'zh-CN'),/感知.*Authored feature Goblin/);
});
await test('actual grapple producers keep the action outcome and typed attacker/defender captions',async()=>{
 await world.beginFight([{monster:'goblin',count:1}],{heroFaces:{[hero.id]:18,[ally.id]:11}});const enemy=world.enemies()[0];
 const {layMap}=await import('./lib/enforce-spells.mjs');await layMap(world,['....','....'],{[hero.id]:{x:0,y:0},[enemy.id]:{x:1,y:0},[ally.id]:{x:0,y:1}});
 world.dice(18,1);const out=await world.invoke('take_action',{characterId:hero.id,action:'grapple',targetEnemyId:enemy.id});world.clearDice();assert.equal(out.ok,true,out.error);assert.equal(out.result.success,true);
 const rolls=listRecentRolls(world.campaignId,30),mine=rolls.find(r=>r.presentation?.context?.kind==='grapple'),defender=rolls.find(r=>r.presentation?.term?.key==='athletics_or_acrobatics');assert.ok(mine);assert.ok(defender);
 assert.equal(mine.presentation.owner.name,hero.name);assert.equal(mine.presentation.target,undefined);assert.equal(mine.presentation.context.target.name,enemy.displayName);assert.match(localizedRollCardLabel(mine,undefined,'zh-CN'),/Goblin, vs 米拉_2.*擒抱哥布林/);
 assert.match(localizedRollCardLabel(defender,undefined,'zh-CN'),/哥布林.*运动或特技.*对抗检定/);assert.ok(world.enemies()[0].conditions.includes('grappled'));
});
await test('the cinematic toast omits concealed results and the chronicle uses a hidden-roll caption',()=>{
 const hidden={...BASE_ROLL,total:null,success:null,breakdown:null,dc:null,hidden:true,visibility:'dm',id:'00000000-0000-0000-0000-000000000001'};
 const file='src/app/campaigns/[campaignId]/CinematicParts.tsx';assert.equal(renderer.render('RollToast',{latestRoll:{roll:hidden,seq:2},sheets:[]},'zh-CN',{queues:{[file]:[null,1]}}),'');
 const props={messages:[{id:'m',authorType:'dm',content:'[roll:'+hidden.id+']'}],rolls:[hidden],sheets:[],members:[],isDm:false,steersStory:false,kind:'do',onKindChange:()=>{},maxChars:2000,input:'',setInput:()=>{},sending:false,inputBlocked:false,placeholder:'',onSubmit:()=>{},composer:false};
 for(const locale of ['en','zh-CN']){const html=renderer.render('TabletopChronicle',props,locale);assert.doesNotMatch(html,/ = |null|Natural|天然/);assert.match(html,locale==='en'?/rolled behind the screen/:/在屏幕后掷骰/);}
});
await test('reviewed caption/UI source and catalog fingerprints match',()=>{
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/check-cinematic-translations.json')));
 for(const [file,hash]of Object.entries({...review.sourceSha256,...review.catalogSha256}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
});
await test('a real held check retains localized detail through submission without changing its authored reason',async()=>{
 const {setMemberRealDice}=await import('../src/lib/db/campaigns.ts');const {listOpenPendingRolls}=await import('../src/lib/db/dm-turns.ts');
 setMemberRealDice(world.campaignId,hero.userId,true);
 const out=await world.invoke('request_roll',{characterId:hero.id,kind:'skill_check',skill:'perception',dc:12,reason:'Authored reason Goblin'});assert.equal(out.ok,true,out.error);assert.equal(out.result.parked,true);
 const pending=listOpenPendingRolls(world.campaignId)[0];assert.ok(pending.presentation);assert.equal(pending.reason,'Authored reason Goblin');
 world.signIn({id:hero.userId});const route=await world.route('campaigns/[campaignId]/pending-rolls/[pendingRollId]');const submitted=await call(route,'POST',{dice:[15]},{campaignId:world.campaignId,pendingRollId:pending.id});assert.equal(submitted.status,200,JSON.stringify(submitted.json));
 const roll=listRecentRolls(world.campaignId,1)[0];assert.equal(roll.presentation.physical,true);assert.match(rollPresentationLabel(roll.presentation,'zh-CN'),/察觉.*实体骰/);
});
world.close();finish();
