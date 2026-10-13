import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {suite} from './lib/enforce-harness.mjs';
import {openSpellRenderer,spellUiFixtures,spellStepProps,spellPool,sheetSpellProps} from './lib/spell-ui-fixtures.mjs';
const {test,finish}=suite('test-chinese-spell-ui');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>readValidationJson(path.join(root,file));
const view=await import('../src/lib/i18n/spell-ui-presentations.ts');
const hpView=await import('../src/lib/i18n/finish-ui-presentations.ts');
const {SPELL_NAMES,SPELL_NAME_MESSAGES}=await import('../src/lib/i18n/spell-name-messages.ts');
const {SPELL_SUPPORT_TEXTS,SPELL_STARTER_TEXTS}=await import('../src/lib/i18n/spell-material-messages.ts');
const {spellSupportFor}=await import('../src/lib/srd/spell-support.ts');
const {changePreparation}=await import('../src/lib/srd/spell-prep.ts');
const {hitPointsLine}=await import('../src/app/characters/builder/derivedReasons.ts');
const {thirdCasterSchoolProblem}=await import('../src/lib/srd/third-caster.ts');
const {createTranslator}=await import('../src/lib/i18n/messages.ts');
const renderer=await openSpellRenderer();
const en=await spellUiFixtures('en',{renderer}),zh=await spellUiFixtures('zh-CN',{renderer});
const of=(rows,name)=>{const r=rows.find(r=>r.name===name);assert.ok(r,name);return r.html;};
const book=()=>{const n=renderer.state.nodes.find(n=>n.type===renderer.book.SpellBook);assert.ok(n);return n.props;};
const controls=html=>[...html.matchAll(/<(?:button|input|textarea|option)\b([^>]*)>/g)].map(r=>(r[1].match(/(?:disabled|aria-pressed|aria-selected|value|data-reference)="[^"]*"/g)??[]).sort());
const setters=props=>{
 const stored={spells:[...props.state.spells],cantrips:[...props.state.cantrips],bookPrepared:[...props.state.bookPrepared]};
 for(const key of Object.keys(stored))props.state['set'+key[0].toUpperCase()+key.slice(1)]=next=>stored[key]=typeof next==='function'?next(stored[key]):next;
 return stored;
};

await test('app chrome imports before content resources and preparation resumes after lazy loading',()=>{
 execFileSync(process.execPath,['--input-type=module','--eval',`
   import assert from 'node:assert/strict';
   import fs from 'node:fs';
   import {register} from 'node:module';
   register('./scripts/lib/register-alias.mjs',new URL('./',import.meta.url));
   await import('./src/lib/i18n/import-flow-presentations.ts');
   const {spellPreparationText}=await import('./src/lib/i18n/spell-ui-presentations.ts');
   const raw='Shield does not cast spells.';
   assert.equal(spellPreparationText(raw,'zh-CN'),raw);
   const {registerMessages}=await import('./src/lib/i18n/translator.ts');
   registerMessages(Object.fromEntries(['en','zh-CN'].map(locale=>[locale,JSON.parse(fs.readFileSync('src/lib/i18n/resources/'+locale+'.content.json','utf8'))])));
   assert.equal(spellPreparationText(raw,'zh-CN'),'Shield无法施法。');
   assert.equal(spellPreparationText(raw,'en'),raw);
 `],{cwd:root,stdio:'pipe'});
});

await test('38 original English picker/book/finish/sheet projections remain exact and canonical controls retain their values',()=>{
 const before=read('docs/validation/character-spell-ui-goldens.json');assert.equal(before.rows.length,38);assert.deepEqual(en,before.rows);
 for(let i=0;i<en.length;i++)if(!en[i].name.startsWith('book/search/'))assert.deepEqual(controls(zh[i].html).map(r=>JSON.stringify(r)).sort(),controls(en[i].html).map(r=>JSON.stringify(r)).sort(),en[i].name);
 assert.match(of(zh,'step/spellbook/false/book'),/填写法术书.*从书中准备法术/);
 assert.match(of(zh,'step/grants'),/来自种族.*|来自专长/);
 assert.match(of(zh,'finish/hp/rolled'),/9 至 24.*d6/);
 assert.match(of(zh,'finish/stored'),/保留已保存角色/);assert.match(of(zh,'finish/stored'),/运动健将.*Cloud \{feat\}/);
 assert.match(of(zh,'sheet/prepared/true'),/长休后.*立即取消准备/);
 assert.match(of(zh,'finish/portrait/false/false/false'),/上传图片.*外貌.*背景故事/);
});

await test('all 517 checklist names and printed aliases translate while authored/reskinned names and English survive verbatim',()=>{
 const manifest=read('src/lib/srd/manifest/spells.json').spells;assert.equal(SPELL_NAMES.length,517);
 assert.deepEqual(SPELL_NAMES.map(r=>({name:r.name,aliases:r.aliases})),manifest.map(r=>({name:r.n,aliases:r.a??[]})));
 for(const row of SPELL_NAMES)for(const name of [row.name,...row.aliases]){
   assert.equal(view.spellTileName({name},'en'),name);assert.match(view.spellTileName({name},'zh-CN'),/\p{Script=Han}/u,name);
   assert.equal(view.spellTileName({name,homebrew:true},'zh-CN'),name);
 }
 assert.equal(view.spellTileName({name:'Shield',label:'Cloud Shield'},'zh-CN'),'Cloud Shield');
 assert.equal(view.spellTileName({name:'Cloud {spell}\n<custom>'},'zh-CN'),'Cloud {spell}\n<custom>');
 assert.deepEqual(Object.keys(SPELL_NAME_MESSAGES.en),Object.keys(SPELL_NAME_MESSAGES['zh-CN']));
 for(const query of ['Light','光亮'])assert.match(of(zh,'book/search/'+query),/data-reference="[^\"]*light[^\"]*"/);
 assert.ok(!of(zh,'book/search/Cloud').includes('data-reference=')); // homebrew has no native reference
 assert.ok(view.spellTileMatches({name:'Shield',label:'Cloud Shield'},'Shield','zh-CN'));
 assert.ok(!view.spellTileMatches({name:'Shield',homebrew:true},'护盾','zh-CN'));
});

await test('actual picker handlers select canonical names and enforce cantrip/known/book/prepared caps in both locales',()=>{
 for(const locale of ['en','zh-CN']){
  const p=spellStepProps(),stored=setters(p);renderer.render(renderer.step.SpellsSection,p,locale,{pool:spellPool});
  book().onTile(book().tiles.find(r=>r.name==='Shield'));assert.deepEqual(stored.spells,['Shield']);
  book().onTile(book().tiles.find(r=>r.name==='Light'));assert.deepEqual(stored.cantrips,['Light']);
  for(const [style,phase,kind] of [['known','book','spells'],['spellbook','book','spells'],['spellbook','prepare','bookPrepared']]){
    const selected=['Shield','Magic Missile'];const p=spellStepProps({state:{spells:[...selected],bookPrepared:[...selected],cantrips:['Fire Bolt','Light']},derived:{spellStyle:style,chosenSpells:selected,chosenPrepared:selected,chosenCantrips:['Fire Bolt','Light'],spellbookAdvice:2}});
    if(phase==='prepare')p.state.spells.push('Sleep');
    const data=setters(p),before=structuredClone(data);renderer.render(renderer.step.SpellsSection,p,locale,{pool:spellPool,queue:[phase,null]});
    book().onTile(book().tiles.find(r=>r.name==='Sleep'));assert.deepEqual(data,before,kind);
    const notice=renderer.state.updates[1];assert.match(view.spellChoiceNoticeText(notice,'zh-CN'),/2.*睡眠术/);assert.match(view.spellChoiceNoticeText(notice,'en'),/2.*Sleep/);
    book().onTile(book().tiles.find(r=>r.name==='Mage Hand'));assert.deepEqual(data,before);
    assert.match(view.spellChoiceNoticeText(renderer.state.updates[1],'zh-CN'),/2.*法师之手/);
  }
  const p1=spellStepProps({state:{cantrips:['Light']},derived:{cantripAdvice:1,chosenCantrips:['Light']}});setters(p1);renderer.render(renderer.step.SpellsSection,p1,locale,{pool:spellPool});book().onTile(book().tiles.find(r=>r.name==='Mage Hand'));
  assert.equal(view.spellChoiceNoticeText(renderer.state.updates[1],'en'),'You already know 1 cantrip. Remove one to choose Mage Hand.');
 }
});

await test('actual suggested fill and school refusal preserve original lists, prepare counts and rule verdicts',()=>{
 const source=read('src/lib/help/starter-spells.json').classes.wizard;
 for(const locale of ['en','zh-CN']){
  const p=spellStepProps({state:{spells:['Shield'],bookPrepared:['Shield']},derived:{spellStyle:'spellbook',spellbookAdvice:6,spellAdvice:{count:2,label:'spells prepared'},chosenSpells:['Shield'],chosenPrepared:['Shield'],starters:source}});const stored=setters(p);
  renderer.render(renderer.step.SpellsSection,p,locale,{pool:spellPool});
  const button=renderer.state.nodes.find(n=>n.type==='button'&&n.props.children===createTranslator(locale)('spellUi.fillSuggested'));assert.ok(button);button.props.onClick();
  assert.deepEqual(stored.spells,['Shield','Magic Missile','Sleep','Detect Magic','Mage Armor']);assert.deepEqual(stored.bookPrepared,['Shield','Magic Missile']);assert.deepEqual(stored.cantrips,['Fire Bolt','Mage Hand']);
  const p2=spellStepProps({state:{spells:['Sleep'],subclass:'Eldritch Knight',level:3},klass:{id:'fighter',name:'Fighter'},derived:{chosenSpells:['Sleep'],spellAdvice:{count:3,label:'spells known'},spellSearchClass:'wizard'}});const unchanged=setters(p2);
  const pool=[...spellPool,{name:'Charm Person',level:1,data:{school:'enchantment'}}];renderer.render(renderer.step.SpellsSection,p2,locale,{pool});
  const tile=book().tiles.find(r=>r.name==='Charm Person');assert.equal(tile.blocked,createTranslator(locale)('spellUi.outsideSchools'));book().onTile(tile);
  assert.deepEqual(unchanged.spells,['Sleep']);const notice=renderer.state.updates[1];const original=thirdCasterSchoolProblem({classId:'fighter',subclass:'Eldritch Knight',level:3,spells:[{name:'Sleep',school:'enchantment'},{name:'Charm Person',school:'enchantment'}]});assert.equal(notice.english,original);
  assert.match(view.spellChoiceNoticeText(notice,'zh-CN'),/防护.*塑能.*2/);assert.equal(view.spellChoiceNoticeText(notice,'en'),original);
 }
});

await test('28 manual-cast notes and nine original starter notes preserve every stated number and source guard',()=>{
 assert.equal(SPELL_SUPPORT_TEXTS.length,28);assert.equal(SPELL_STARTER_TEXTS.length,9);
 for(const row of SPELL_SUPPORT_TEXTS){const original=spellSupportFor(row.name);assert.equal(original.manual,row.english);assert.equal(original.kind,row.kind);const english=view.spellSupportNote(row.name,'en'),chinese=view.spellSupportNote(row.name,'zh-CN');assert.ok(english.endsWith(row.english));assert.match(chinese,/DM/);assert.deepEqual(chinese.match(/\d+(?:d\d+)?/g),row.english.match(/\d+(?:d\d+)?/g),row.name);}
 for(const row of SPELL_STARTER_TEXTS){assert.equal(read('src/lib/help/starter-spells.json').classes[row.classId].why,row.english);assert.match(view.spellStarterText(row.english,'zh-CN'),/\p{Script=Han}/u);assert.equal(view.spellStarterText(row.english,'en'),row.english)}
 assert.equal(view.spellStarterText('Authored starter {text}','zh-CN'),'Authored starter {text}');
 const data={level:3,school:{name:'Evocation'},casting_time:'1 bonus action',range:'60 feet',concentration:'yes',ritual:'no'};const before=structuredClone(data);assert.equal(view.spellSummaryView(data,'zh-CN'),'3 环塑能法术 · 1 个附赠动作 · 60 英尺 · 专注');assert.equal(view.spellSummaryView(data,'en'),'level 3 evocation · 1 bonus action · 60 feet · concentration');assert.deepEqual(data,before);
 assert.equal(view.spellSummaryView(data,'zh-CN',true),view.spellSummaryView(data,'en'));
 assert.ok(view.spellSummaryView({...data,range:'Authored range',casting_time:'Authored casting'},'zh-CN').includes('Authored casting · Authored range'));
});

await test('all HP display branches preserve the original numbers, input and fixed/rolled/kept timing',()=>{
 for(const hitDie of [6,8,10,12])for(const level of [1,4])for(const method of ['fixed','rolled','max'])for(const kept of [false,true])for(const atTable of [false,true]){
  const input={hitDie,level,maxHp:28,range:{min:8,max:28},method,kept,atTable};const before=structuredClone(input),original=hitPointsLine(input);
  assert.deepEqual(hpView.localizedHitPointsLine(input,'en'),original);const chinese=hpView.localizedHitPointsLine(input,'zh-CN');assert.equal(chinese.value,original.value.replace(' to ',' 至 '));assert.match(chinese.reason,/\p{Script=Han}/u);assert.deepEqual(input,before);
 }
 assert.equal(hpView.finishRulesErrorText(createTranslator('en')('finishUi.rulesNetworkError'),'zh-CN'),createTranslator('zh-CN')('finishUi.rulesNetworkError'));
 assert.equal(hpView.finishRulesErrorText('Authored full error','zh-CN'),'Authored full error');
});

await test('existing preparation results project every built-in refusal/note without rewriting the engine result',()=>{
 const abilities={str:10,dex:14,con:12,int:16,wis:16,cha:14};const base=sheetSpellProps('spellbook').view;
 const cases=[
 [base,'prepare','',false],[{...base,style:'known'},'prepare','Shield',false],[base,'prepare','Light',false],
 [base,'cancel','Magic Missile',false],[base,'cancel','Sleep',false],[base,'unprepare','Magic Missile',false],[base,'unprepare','Shield',false],
 [base,'prepare','Shield',false],[base,'prepare','Sleep',false],[base,'prepare','Detect Magic',false],
 [{...base,spellbook:['Fireball']},'prepare','Fireball',false],
 [{...base,style:'prepared'},'prepare','Magic Missile',false],
 [{...base,level:1,prepared:['Shield','Magic Missile','Detect Magic','Mage Armor'],pending:[]},'prepare','Sleep',true],
 [{...base,pending:[]},'prepare','Sleep',false],
 [{...base,classId:'cleric',style:'prepared',subclass:'Life Domain',prepared:[]},'unprepare','Bless',true],
 ];
 for(const [input,action,name,inClassList] of cases){const before=structuredClone(input),result=changePreparation(input,action,name,{abilities,inClassList}),raw=result.error??result.note;assert.ok(raw);assert.equal(view.spellPreparationText(raw,'en'),raw);assert.match(view.spellPreparationText(raw,'zh-CN'),/\p{Script=Han}/u,raw);assert.deepEqual(input,before);}
 assert.equal(view.spellPreparationText('Shield will be prepared after the next long rest.','zh-CN',{name:'Shield',homebrew:true}),'Shield将在下次长休后准备完成。');
 assert.equal(view.spellPreparationText('Shield does not cast spells.','zh-CN'),'Shield无法施法。');
 assert.equal(view.spellPreparationText('Authored {unknown}\ncomplete error','zh-CN'),'Authored {unknown}\ncomplete error');
});

await test('actual sheet preparation callbacks submit the same canonical action/body and retain raw response across locales',async()=>{
 const original=globalThis.fetch;
 try {for(const locale of ['en','zh-CN'])for(const [name,action,expectedState,note] of [['Sleep','cancel','pending','Sleep will not be prepared.'],['Shield','unprepare','ready','Shield is no longer prepared. Preparing it again takes a long rest.'],['Magic Missile','prepare','inBook','Magic Missile will be prepared after the next long rest.']]){
   let sent;globalThis.fetch=async(url,opts)=>{sent={url,body:JSON.parse(opts.body)};return Response.json({note})};
   renderer.render(renderer.sheet.CasterBook,sheetSpellProps('spellbook'),locale,{pool:spellPool,queue:[true,false,null]});
   const tile=book().tiles.find(r=>r.name===name);assert.equal(tile.state,expectedState);await book().onTile(tile);
   assert.deepEqual(sent,{url:'/api/campaigns/review-campaign/sheet/spells',body:{action,spell:name,classId:'wizard',sheetId:'review-sheet'}});
   const message=renderer.state.updates[2];assert.equal(message.text,note);assert.equal(message.spell.name,name);assert.match(view.spellPreparationText(message.text,'zh-CN',message.spell),/\p{Script=Han}/u);
 }}finally{globalThis.fetch=original;}
});

await test('mechanics remain frozen and current translation fingerprints include all owned display sources',()=>{
 const record=read('docs/validation/character-spell-ui-translations.json');
 for(const[file,expected]of Object.entries({...record.unchangedMechanics,...record.sources,...record.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),expected,file);
 assert.match(record.status,/implementation-agent/);
});
finish();
