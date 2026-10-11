import assert from 'node:assert/strict';
import {assertReviewedMessages} from './lib/reviewed-messages.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {openWorld} from './lib/enforce-world.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
const root = path.resolve(import.meta.dirname, '..');
const world = await openWorld({gameSettings: {locale: 'zh-CN', hpMethod: 'rolled'}});
const {test, finish} = suite('test-chinese-sheet-party');
const {openSheetPartyRenderer, sheetPartyFixtures, sheetStateOutputs, SHEET_STATE} = await import('./lib/sheet-party-fixtures.mjs');
const view = await import('../src/components/sheet/sheet-state.ts');
const {conditionNamesLookup} = await import('../src/lib/battlemap/condition-presentation.ts');
const {hitDieMessageText, resourceLabel} = await import('../src/lib/i18n/sheet-play-presentations.ts');
const {MESSAGE_CATALOGS} = await import('../src/lib/i18n/messages.ts');
const {SHEET_PLAY_MESSAGES} = await import('../src/lib/i18n/sheet-play-messages.ts');
const {parseRollPresentation} = await import('../src/lib/roll-presentation.ts');
const {specialRoll} = await import('../src/lib/roll-labels.ts');
const {localizedRollCardLabel} = await import('../src/lib/i18n/combat-ui-presentations.ts');
const {specialCallContracts} = await import('./lib/special-caption-contracts.mjs');
const {listRecentRolls} = await import('../src/lib/db/rolls.ts');
const {getDatabase} = await import('../src/lib/db/core.ts');
const renderer = await openSheetPartyRenderer();
const en = sheetPartyFixtures(renderer), zh = sheetPartyFixtures(renderer, 'zh-CN');
const html = name => {const row = zh.find(row => row.name === name); assert.ok(row, name); return row.html;};
const original = readValidationJson(path.join(root, 'docs/validation/sheet-party-goldens.json'));
const sheet = patch => ({...structuredClone(SHEET_STATE), ...patch});
const stateFile = 'src/components/sheet/SheetState.tsx';

await test('32 original English renders, 11 state views and the rolled-level request contract remain exact', () => {
  assert.equal(original.baselineCommit, '5599665c'); assert.equal(en.length, 32);
  assert.deepEqual(en, original.englishRenders);
  assert.deepEqual(sheetStateOutputs(view), original.stateViews);
  assert.deepEqual(specialCallContracts(['src/app/api/campaigns/[campaignId]/sheet/route.ts'], file => fs.readFileSync(path.join(root, file), 'utf8')), original.levelCallContracts);
});
await test('Chinese state chips retain death counts, exhaustion effects and proper authored triggers', () => {
  assert.equal(html('state/exhaustion/0'), '');
  assert.match(html('state/exhaustion/5'), /属性检定具有劣势.*速度减半.*攻击和豁免具有劣势.*生命值上限减半.*速度为 0/);
  assert.doesNotMatch(html('state/exhaustion/6'), /死亡/, 'the display must not add an outcome the engine note does not state');
  assert.match(html('state/dying'), /成功 1 次，失败 2 次.*濒死 1\/2/);
  assert.match(html('state/stable'), /生命值为 0.*不再进行死亡豁免.*伤势稳定/);
  assert.match(html('state/dead'), /复生.*死亡/);
  assert.match(html('state/incapacitated'), /Goblin无法采取动作或反应.*无法行动/);
  assert.match(html('state/concentration'), /专注：定身人类/);
  assert.match(html('state/authored-concentration'), /Authored Fireball &lt;script&gt;/);
  assert.match(html('state/readied'), /Fireball: the door opens &lt;script&gt;/);
  assert.doesNotMatch(html('state/readied'), /火球术/);
});
await test('localized HP, speed, defenses and item charges cannot change computed numbers or sheet data', () => {
  const before = structuredClone(SHEET_STATE);
  const translated = sheetStateOutputs(view, 'zh-CN'), english = sheetStateOutputs(view);
  for (let index = 0; index < translated.cases.length; index++) {
    const a = translated.cases[index], b = english.cases[index];
    assert.deepEqual([a.hp.max, a.hp.stored, a.speed.speed, a.speed.base, a.tags.map(tag => [tag.id, tag.tone])], [b.hp.max, b.hp.stored, b.speed.speed, b.speed.base, b.tags.map(tag => [tag.id, tag.tone])]);
  }
  assert.match(translated.cases.find(row => row.name === 'exhausted').hp.note, /等级 4.*减半.*40/);
  assert.match(translated.cases.find(row => row.name === 'stopped').speed.notes.join(' '), /擒抱：速度为 0/);
  assert.match(html('defenses'), /钝击.*穿刺.*挥砍.*火焰.*毒素/);
  assert.deepEqual(translated.speeds, ['飞行 60 英尺', '游泳 30 英尺']);
  assert.equal(translated.charges.charges, '4/7 次充能');
  assert.deepEqual({...translated.charges, charges: null}, {...english.charges, charges: null});
  assert.deepEqual(SHEET_STATE, before);
});
await test('condition notes distinguish visible numbered enemies, proper names and undisclosed identities', () => {
  const names = conditionNamesLookup([{id: 'proper', name: 'Goblin', kind: 'pc'}, {id: 'enemy', name: 'Goblin 2', kind: 'enemy'}]);
  const nameOf = id => names(id)?.name ?? null;
  const meta = {frightened: {source: 'enemy', untilTurnEndOf: 'enemy', turnBegun: true, saveEnds: {ability: 'wis', dc: 13}, spell: 'Fear'}};
  const shown = sheet({conditions: ['frightened'], conditionMeta: meta}), before = structuredClone(shown);
  assert.match(view.conditionDetail(shown, 'frightened', nameOf, 'zh-CN', names), /哥布林 2 的本回合结束.*感知.*13.*来自哥布林 2（恐惧术）/);
  const proper = sheet({conditionMeta: {frightened: {...meta.frightened, source: 'proper', untilTurnEndOf: 'proper'}}});
  assert.match(view.conditionDetail(proper, 'frightened', nameOf, 'zh-CN', names), /Goblin.*来自Goblin/);
  const hidden = sheet({conditionMeta: {frightened: {...meta.frightened, source: 'private-id', untilTurnEndOf: 'private-id'}}});
  assert.doesNotMatch(view.conditionDetail(hidden, 'frightened', nameOf, 'zh-CN', names), /private-id|Goblin|哥布林/);
  assert.deepEqual(shown, before);
  assert.match(html('conditions/legacy'), /中毒.*2 分钟.*Authored &lt;script&gt;/);
});
await test('party cards localize catalog identities, statistics and conditions while retaining player names', () => {
  assert.match(html('party/basic'), /Goblin.*哥布林 战士 3.*17\/20.*护甲等级.*被动察觉.*先攻/);
  assert.match(html('party/basic'), /来自哥布林 2（恐惧术）.*定身人类.*升至 4 级/);
  assert.match(html('party/multi'), /Fireball &lt;script&gt;.*战士 2 \/ 法师 1/);
  assert.match(html('party/multi'), /照明：剩余 10 分钟/);
  assert.match(html('party/companion'), /野兽.*自身.*狼.*创建伙伴/);
  assert.match(html('party/dice'), /实体骰子：开启.*保存到角色库/);
  assert.doesNotMatch(html('party/basic'), /exhaustion|Concentrating|Level up|frightened/);
});
await test('slot and resource controls keep limits, disabled states and original callbacks', () => {
  let spent = 0, recovered = 0;
  const props = {label: '二环', left: 0, max: 3, spends: true, corrects: true, busy: false, onSpend: () => spent++, onRecover: () => recovered++};
  renderer.render('SlotRow', props, 'zh-CN');
  const spend = renderer.elements().find(({type, props}) => type === 'button' && props['aria-label'] === '消耗一个二环法术位');
  const recover = renderer.elements().find(({type, props}) => type === 'button' && props['aria-label'] === '恢复一个二环法术位');
  assert.equal(spend.props.disabled, true); assert.equal(recover.props.disabled, false);
  recover.props.onClick(); assert.deepEqual([spent, recovered], [0, 1]);
  assert.match(html('resource/overchannel'), /上次长休后已使用 2 次/);
  assert.match(html('resource/relentless_rage'), /下次难度 15/);
  assert.match(html('resource/signature_spell_1'), /触发时由服务器消耗.*长休后恢复/);
  assert.equal(resourceLabel('rage', 'rage', 'zh-CN'), '狂暴');
  assert.equal(resourceLabel('inspiration', 'inspiration', 'zh-CN'), '激励');
  assert.equal(resourceLabel('authored', 'Fireball <script>', 'en'), 'Fireball <script>');
});
await test('full hit-die refusal templates rerender names as proper text and retain unknown diagnostics', () => {
  const source = Object.entries(MESSAGE_CATALOGS.en).filter(([key]) => key.startsWith('sheetPlay.hitDie.error.'));
  assert.equal(source.length, 9);
  for (const [key, text] of source) {
    const original = text.replace('{name}', 'Goblin <script>');
    assert.equal(hitDieMessageText(original, 'en'), original);
    assert.equal(hitDieMessageText(original, 'zh-CN'), MESSAGE_CATALOGS['zh-CN'][key].replace('{name}', 'Goblin <script>'));
  }
  assert.equal(hitDieMessageText('Authored diagnostic <script>', 'zh-CN'), 'Authored diagnostic <script>');
  assert.equal(hitDieMessageText('Not logged in.', 'en'), 'Not logged in.');
  assert.equal(hitDieMessageText('Not logged in.', 'zh-CN'), '请先登录。');
  assert.equal(hitDieMessageText('Set a new password to continue.', 'zh-CN'), '请设置新密码后继续。');
});
await test('actual hit-die button submits one die, heals once on the real route and rerenders success in both languages', async () => {
  const hero = world.addHero({name: 'Goblin', class: 'fighter', level: 2, maxHp: 30, abilities: {con: 14}});
  const {subscribe} = await import('../src/lib/events.ts');
  const leave = subscribe(world.campaignId, () => {}, hero.userId);
  world.patch(hero.id, {currentHp: 10});
  assert.equal((await world.invoke('take_rest', {kind: 'short'})).ok, true);
  const route = await world.route('campaigns/[campaignId]/sheet/hit-dice');
  world.signIn(world.owner); const calls = [], realFetch = globalThis.fetch;
  renderer.render('HitDiceSpend', {sheet: world.sheet(hero.id), mine: true, inCombat: false}, 'zh-CN', {queues: {[stateFile]: [true, false, null, 0]}});
  const button = renderer.elements().find(({type, props}) => type === 'button' && typeof props.onClick === 'function');
  world.dice(7); const before = listRecentRolls(world.campaignId, 100).length;
  globalThis.fetch = async (url, options) => {calls.push({url, ...options}); return route.POST(new Request('http://odm.test/hit-dice', options), {params: Promise.resolve({campaignId: world.campaignId})});};
  try {button.props.onClick(); await new Promise(resolve => setImmediate(resolve)); await new Promise(resolve => setImmediate(resolve));}
  finally {globalThis.fetch = realFetch; leave();}
  assert.equal(world.clearDice(), 0); assert.equal(calls.length, 1); assert.deepEqual(JSON.parse(calls[0].body), {dice: 1});
  assert.equal(calls[0].url, `/api/campaigns/${world.campaignId}/sheet/hit-dice`); assert.equal(calls[0].method, 'POST');
  assert.equal(world.sheet(hero.id).currentHp, 19); assert.equal(world.sheet(hero.id).hitDice.spent, 1);
  assert.equal(listRecentRolls(world.campaignId, 100).length, before + 1);
  const result = renderer.updates().find(row => row.file === stateFile && row.at === 2 && row.value?.tone === 'ok')?.value;
  assert.ok(result); const options = {queues: {[stateFile]: [true, false, result, 0]}};
  assert.match(renderer.render('HitDiceSpend', {sheet: world.sheet(hero.id), mine: true, inCombat: false}, 'zh-CN', options), /恢复 9 点生命值.*当前 19\/30/);
  assert.match(renderer.render('HitDiceSpend', {sheet: world.sheet(hero.id), mine: true, inCombat: false}, 'en', options), /Rolled: 9 hit points back \(now 19\/30\)\./);
});
await test('party physical-dice toggle and character-switch handlers preserve canonical payloads and composition guards', async () => {
  const calls = [], realFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {calls.push({url, ...options}); return Response.json({ok: true});};
  try {
    const props = {sheets: [sheet({})], meUserId: 'u', realDiceAllowed: true, members: [{userId: 'u', useRealDice: true}]};
    renderer.render('PartyPanel', props, 'zh-CN');
    const toggle = renderer.elements().find(({props}) => props.label === '实体骰子' && typeof props.onToggle === 'function');
    assert.ok(toggle); toggle.props.onToggle(); await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(JSON.parse(calls[0].body), {useRealDice: false}); assert.equal(calls[0].url, '/api/campaigns/c/members/me');
    renderer.render('PartyPanel', {...props, campaignId: 'c', sheets: [sheet({}), sheet({id: 'other'})], multiCharacter: 'one_active', activeSheetId: 'hero'}, 'zh-CN');
    const switcher = renderer.elements().find(({type, props}) => type === 'span' && props.role === 'button');
    let prevented = 0;
    switcher.props.onKeyDown({key: 'Enter', nativeEvent: {isComposing: true}, preventDefault: () => prevented++, stopPropagation: () => {}});
    assert.equal(calls.length, 1); assert.equal(prevented, 0);
    switcher.props.onKeyDown({key: 'Enter', nativeEvent: {isComposing: false}, preventDefault: () => prevented++, stopPropagation: () => {}});
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(calls.length, 2); assert.equal(prevented, 1); assert.deepEqual(JSON.parse(calls[1].body), {characterId: 'other'});
  } finally {globalThis.fetch = realFetch;}
});
await test('the real earned rolled-level request rolls once, preserves spent dice and persists the Chinese caption', async () => {
  const table = await openWorld({gameSettings: {locale: 'zh-CN', hpMethod: 'rolled'}});
  const hero = table.addHero({name: '阿明', class: 'fighter', level: 1, maxHp: 12, abilities: {str: 16, con: 14}});
  table.patch(hero.id, {hitDice: {die: 'd10', total: 1, spent: 1}, currentHp: 5});
  assert.equal((await table.invoke('award_xp', {characterIds: [hero.id], amount: 300, reason: 'earned in play'})).ok, true);
  const {patchSheetAs} = await import('./lib/enforce-srd-progression.mjs');
  const route = await table.route('campaigns/[campaignId]/sheet'); table.dice(7);
  const response = await patchSheetAs(table, route, table.owner, {level: 2});
  assert.equal(response.status, 200, JSON.stringify(response)); assert.equal(table.clearDice(), 0);
  const rolls = listRecentRolls(table.campaignId, 100); assert.equal(rolls.length, 1);
  assert.equal(rolls[0].detail, 'level 2: hit die d10'); assert.equal(rolls[0].expression, '1d10'); assert.equal(rolls[0].total, 7);
  assert.equal(table.sheet(hero.id).maxHp, 21); assert.equal(table.sheet(hero.id).currentHp, 14);
  assert.deepEqual(table.sheet(hero.id).hitDice, {die: 'd10', total: 2, spent: 1});
  assert.match(localizedRollCardLabel(rolls[0], '阿明', 'zh-CN'), /阿明.*升至 2 级：生命骰 d10/);
  const before = structuredClone(rolls[0]); getDatabase().close(); globalThis.__localRoleplayDb = undefined;
  assert.deepEqual(listRecentRolls(table.campaignId, 100)[0], before);
  assert.equal((await patchSheetAs(table, route, table.owner, {level: 3})).status, 403);
  assert.equal(listRecentRolls(table.campaignId, 100).length, 1); table.close();
});
await test('malformed optional caption metadata cannot reinterpret legacy or authored rolls', () => {
  const base = specialRoll('level 2: hit die d10', {kind: 'level-up', level: 2, sides: 10});
  assert.ok(parseRollPresentation(base.presentation));
  assert.ok(parseRollPresentation(specialRoll('level 2: hit die d4', {kind: 'level-up', level: 2, sides: 4}).presentation), 'custom class die sizes remain displayable');
  for (const context of [{kind: 'level-up', level: '2', sides: 10}, {kind: 'level-up', level: 2, sides: Infinity}, {kind: 'level-up', level: 2, sides: -1}]) assert.equal(parseRollPresentation({...base.presentation, context}), undefined);
  assert.equal(resourceLabel('homebrew', 'Authored <script>', 'zh-CN'), 'Authored <script>');
  assert.equal(resourceLabel('homebrew', 'Fireball', 'zh-CN'), 'Fireball');
  assert.equal(resourceLabel('tip', 'Authored resource', 'zh-CN'), 'Authored resource');
  assert.equal(resourceLabel('free_cast_misty_step', 'Free cast', 'zh-CN'), '迷雾步（免费施法）');
});
await test('source-compared fingerprints and the content delivery boundary remain current', () => {
  const review = JSON.parse(fs.readFileSync(path.join(root, 'docs/validation/sheet-party-translations.json')));
  for (const [file, hash] of Object.entries(review.sourceSha256)) assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'), hash, file);
  assertReviewedMessages(review);
  for (const locale of ['en', 'zh-CN']) {
    const ui = JSON.parse(fs.readFileSync(path.join(root, `src/lib/i18n/resources/${locale}.ui.json`)));
    const content = JSON.parse(fs.readFileSync(path.join(root, `src/lib/i18n/resources/${locale}.content.json`)));
    assert.equal(Object.keys(ui).some(key => key.startsWith('sheetPlay.')), false);
    // Verify this batch's original 149 entries; later resource translations
    // can share the namespace without rewriting this review's fixed scope.
    const keys = Object.keys(SHEET_PLAY_MESSAGES[locale]);
    assert.equal(keys.length, 149);
    for (const key of keys) assert.equal(content[key], MESSAGE_CATALOGS[locale][key]);
  }
});
world.close(); finish();
