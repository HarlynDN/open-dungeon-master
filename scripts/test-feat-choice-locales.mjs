// Owned display and actual selection callbacks, without model/audio/network calls.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {choiceRenderer,choiceCases,labelCases} from './lib/feat-choice-ui-fixtures.mjs';
const {campaignEntryError} = await import('../src/lib/i18n/campaign-entry-presentations.ts');
const renderer = await choiceRenderer();
const cases = choiceCases();
const labels = labelCases();
const golden = JSON.parse(fs.readFileSync(new URL('./fixtures/feat-choice-en.json',import.meta.url),'utf8'));
// Compare the accepted v0.27 UI directly: it adds fixed-only grants and
// restricted skill/expertise choices. Keep the historical fixture intact.
const upstreamFiles = new Set(['src/app/characters/builder/FeatChoicesFields.tsx','src/app/campaigns/[campaignId]/LabelSheet.tsx']);
const upstream = await choiceRenderer(file => upstreamFiles.has(file)
  ? execFileSync('git', ['show', `2b0b6b6e:${file}`], {encoding:'utf8'})
  : fs.readFileSync(file,'utf8'));
assert.equal(cases.length,golden.choiceStates);
for(const row of cases) assert.equal(renderer.render('default',row.props,'en'),upstream.render('default',row.props,'en'),`Upstream English choices: ${row.name}`);
for(const row of labels) assert.equal(renderer.render('LabelSheet',row.props,'en',row.options),upstream.render('LabelSheet',row.props,'en',row.options),`Upstream English map label: ${row.name}`);
const rowFor = name => cases.find(row=>row.name===name).props;
const changed = [];
function show(name,picks) {
  const props = {...rowFor(name),onChange: next=>changed.push(next),...(picks ? {picks} : {})};
  const before = structuredClone({spec:props.spec,picks:props.picks,known:props.known});
  const html = renderer.render('default',props,'zh-CN');
  assert.deepEqual({spec:props.spec,picks:props.picks,known:props.known},before);
  return html;
}
const elements = () => renderer.elements();
const select = label => elements().find(e=>e.props.options && e.props.label.includes(label)).props;
const pill = label => elements().find(e=>e.props.onClick && e.props.label===label).props;
for(const row of cases) {
  const html = renderer.render('default',row.props,'zh-CN');
  assert(!html.includes('The table applies')&&!html.includes('Nothing of this feat'));
  assert(!html.includes('[pc_attack')&&!html.includes('[use_reaction]')&&!html.includes('[server]')&&!html.includes('[cast tools]'));
}
assert(show('Linguist').includes('语言学家'));
select('语言').onChange('Draconic');
assert.deepEqual(changed.pop(),{languages:['Draconic']});
assert(show('Skill Expert').includes('技能熟练'));
pill('隐匿').onClick();
assert.deepEqual(changed.pop(),{skills:['stealth']});
show('Skill Expert',{skills:['stealth']});
const expert = elements().filter(e=>e.props.label==='隐匿'&&e.props.onClick).at(-1).props;
expert.onClick();
assert.deepEqual(changed.pop(),{skills:['stealth'],expertise:['stealth']});
show('Skilled',{skills:['stealth','perception'],tools:["thieves' tools"]});
pill('特技').onClick();
assert.deepEqual(changed.pop(),{skills:['stealth','perception'],tools:["thieves' tools"]},'shared count must not grow');
show('Authored pick choices');
select('武器').onChange('Dagger');
assert.deepEqual(changed.pop(),{weapons:['Dagger']});
select('工具').onChange("thieves' tools");
assert.deepEqual(changed.pop(),{tools:["thieves' tools"]});
select('护甲').onChange('shields');
assert.deepEqual(changed.pop(),{armor:['shields']});
show('Elemental Adept');
select('伤害类型').onChange('fire');
assert.deepEqual(changed.pop(),{damageType:'fire'});
const spellPicks={list:'wizard',cantrips:['Mage Hand'],spells:['Shield']};
assert(show('Magic Initiate',spellPicks).includes('法师之手'));
select('法术列表').onChange('sorcerer');
assert.deepEqual(changed.pop(),{list:'sorcerer',cantrips:[],spells:[]});
show('Magic Initiate',{list:'wizard'});
const picker = elements().find(e=>e.props.extraParams?.level==='1').props;
assert.deepEqual(picker.extraParams,{level:'1',exact:'1',class:'wizard'});
picker.onPick({name:'Shield'});
assert.deepEqual(changed.pop(),{list:'wizard',spells:['Shield']});
assert(show('Authored ritual choices',{list:'wizard'}).includes('施法属性'));
select('施法属性').onChange('int');
assert.deepEqual(changed.pop(),{list:'wizard',ability:'int'});
show('Authored ritual choices');
const ritual = elements().find(e=>e.props.extraParams).props;
assert.deepEqual(ritual.extraParams,{level:'2',exact:'1',class:'wizard',school:'illusion,enchantment'});
assert(renderer.render('LabelSheet',labels[0].props,'zh-CN',labels[0].options).includes('正在打开条目'));
assert(renderer.render('LabelSheet',labels[1].props,'zh-CN',labels[1].options).includes('无权查看'));
assert(renderer.render('LabelSheet',labels[2].props,'zh-CN',labels[2].options).includes('Authored lore content.'));
assert(renderer.render('LabelSheet',labels[3].props,'zh-CN').includes('Authored map title'));
for(const [source,zh] of [
  ['Campaign not found.','找不到此战役。'],['Could not load the campaign.','无法加载战役。'],
  ['Could not reach the server.','无法连接服务器。'],['Set a new password to continue.','请先设置新密码，再继续。'],
]) {
  assert.equal(campaignEntryError(source,'en'),source);
  assert.equal(campaignEntryError(source,'zh-CN'),zh);
}
assert.equal(campaignEntryError('Authored refusal {value}.','zh-CN'),'Authored refusal {value}.');
console.log('PASS: 60 English feat-choice states, Chinese canonical training/spell callbacks and filters, shared-pick cap, four map-entry states, authored content and campaign error preservation.');
