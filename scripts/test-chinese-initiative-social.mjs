import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {openWorld} from './lib/enforce-world.mjs';
import {suite} from './lib/enforce-harness.mjs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {INITIATIVE_SOCIAL_FILES, initiativeSocialFixtures, initiativeSocialRows} from './lib/initiative-social-fixtures.mjs';
import {specialCallContracts} from './lib/special-caption-contracts.mjs';
import {readValidationJson} from './lib/validation-json.mjs';
import {call} from './lib/enforce-campaign.mjs';

const root = path.resolve(import.meta.dirname, '..');
const {test, finish} = suite('test-chinese-initiative-social');
const world = await openWorld({gameSettings: {locale: 'zh-CN', dicePolicy: 'real_allowed'}});
const renderer = await openCombatRenderer();
const {parseRollPresentation} = await import('../src/lib/roll-presentation.ts');
const {localizedRollCardLabel} = await import('../src/lib/i18n/combat-ui-presentations.ts');
const {listRecentRolls} = await import('../src/lib/db/rolls.ts');
const {createDmTurn, listOpenPendingRolls} = await import('../src/lib/db/dm-turns.ts');
const {setMemberRealDice} = await import('../src/lib/db/campaigns.ts');
const {getDatabase} = await import('../src/lib/db/core.ts');
const {upsertNpc, getNpcByName} = await import('../src/lib/db/npcs.ts');
const {getRelationship, patchRelationship} = await import('../src/lib/db/relationships.ts');
const hero = world.addHero({name: 'Goblin, vs 米拉_2', class: 'fighter', level: 5, abilities: {dex: 14, cha: 10, wis: 10}});
const recent = () => listRecentRolls(world.campaignId, 200), last = () => recent().at(-1);
const caption = roll => localizedRollCardLabel(roll, hero.name, 'zh-CN');

await test('22 original producer calls preserve detail, dice, DC, visibility and result inputs', () => {
  assert.deepEqual(specialCallContracts(INITIATIVE_SOCIAL_FILES, file => fs.readFileSync(path.join(root, file), 'utf8')),
    readValidationJson(path.join(root, 'docs/validation/initiative-social-contracts.json')));
});
await test('27 original English component renders stay exact, with Chinese purposes and proper-name boundaries', () => {
  assert.deepEqual(initiativeSocialFixtures(renderer), readValidationJson(path.join(root, 'docs/validation/initiative-social-goldens.json')));
  const zh = initiativeSocialFixtures(renderer, 'zh-CN');
  const html = name => zh.find(row => row.name === name).html;
  for (const [name, pattern] of [
    ['initiative/pc', /Goblin, vs 米拉_2.*先攻/], ['initiative/enemy', /哥布林 2.*先攻/],
    ['initiative/proper', /Goblin, vs 米拉_2.*先攻/], ['initiative/physical', /实体骰/],
    ['ambush/enemy', /哥布林 2.*隐匿检定以设伏/], ['social/persuade', /游说检定以影响Goblin, vs 米拉_2/],
    ['social/deceive', /欺瞒检定/], ['social/intimidate', /威吓检定以影响Goblin/],
    ['relationship', /互动时的表演检定/], ['shop', /Fireball &amp; &lt;script&gt;.*议价.*游说/],
    ['deception-insight', /哥布林 2.*欺瞒.*Goblin, vs 米拉_2的洞悉/],
    ['counterspell', /哥布林 2.*智力.*反制寒冰锥.*难度 15/],
    ['counterspell/authored', /魅力.*反制Fireball.*难度 19/], ['agreement', /Goblin, vs 米拉_2是否同意/],
    ['toast/social/persuade', /游说.*Goblin, vs 米拉_2/], ['chronicle/initiative/enemy', /哥布林 2.*先攻/],
  ]) assert.match(html(name), pattern, name);
    // The original detail already named the Counterspell threshold. A
    // redacted roll conceals the outcome and dice, not its public caption.
    assert.doesNotMatch(html('blind'), /= 3|1d6/);
    assert.match(html('blind'), /在屏幕后掷骰/);
  assert.doesNotMatch(html('counterspell/authored'), /火球术/);
  for (const {roll} of initiativeSocialRows()) {const before = structuredClone(roll); caption(roll); assert.deepEqual(roll, before);}
});
await test('new restored metadata strips private fields and rejects malformed owners, DCs and shop names', () => {
  assert.deepEqual(parseRollPresentation({kind: 'initiative', owner: {name: 'Goblin', kind: 'proper', id: 'private'}, result: 20}),
    {kind: 'initiative', owner: {name: 'Goblin', kind: 'proper'}});
  const check = context => ({kind: 'check', term: {kind: 'ability', key: 'int'}, context});
  for (const raw of [{kind: 'initiative', owner: null}, {kind: 'initiative', physical: false},
    check({kind: 'counterspell-dc', name: 'Fireball', difficulty: NaN}),
    check({kind: 'counterspell-dc', name: 'Fireball', difficulty: 15, literalName: false}),
    check({kind: 'haggle', shop: {toString() {throw Error('must not coerce');}}}),
    check({kind: 'influence', target: {name: 'Goblin', kind: 'future'}})]) assert.equal(parseRollPresentation(raw), undefined);
  assert.deepEqual(parseRollPresentation(check({kind: 'counterspell-dc', name: 'Fireball', difficulty: 15, secret: 'hidden'})).context,
    {kind: 'counterspell-dc', name: 'Fireball', difficulty: 15});
});
await test('opening initiative retains d20 plus Dexterity, order and DM-only enemy caption', async () => {
  await world.beginFight([{monster: 'goblin', count: 1}], {heroFaces: {[hero.id]: 12}, enemyFace: 9});
  const rolls = recent().filter(roll => roll.kind === 'initiative');
  const mine = rolls.find(roll => roll.characterId === hero.id), enemy = rolls.find(roll => roll.visibility === 'dm');
  assert.equal(mine.total, 14); assert.equal(mine.detail, 'initiative'); assert.match(caption(mine), /Goblin, vs 米拉_2.*先攻/);
  assert.ok(enemy); assert.equal(enemy.presentation.owner.kind, 'enemy'); assert.match(caption(enemy), /哥布林.*先攻/);
  assert.equal(world.encounter().order[0].characterId, hero.id);
});
await test('enemy reset and deadlock recovery preserve reroll counts, d20 modifiers and locked order', async () => {
  const {resetInitiative} = await import('../src/lib/dm/initiative.ts');
  const {ensureInitiativeProgress} = await import('../src/lib/dm/encounter-tools.ts');
  const before = recent().length; world.diceLog(); world.dice(7);
  assert.equal(resetInitiative(world.campaign()).ok, true); assert.equal(world.clearDice(), 0);
  assert.equal(recent().length, before + 1); assert.equal(last().visibility, 'dm'); assert.match(caption(last()), /哥布林.*先攻/);
  assert.equal(world.encounter().orderReady, false); world.dice(8);
  assert.ok(ensureInitiativeProgress(world.campaign())); assert.equal(world.clearDice(), 0);
  assert.equal(last().total, 10); assert.equal(last().detail, 'initiative'); assert.equal(last().visibility, 'public');
  assert.equal(world.encounter().orderReady, true); assert.equal(world.diceLog().length, 2);
});
await test('held initiative keeps authored reason and becomes a physical caption on actual route submission', async () => {
  setMemberRealDice(world.campaignId, hero.userId, true);
  const out = await world.invoke('request_roll', {characterId: hero.id, kind: 'initiative', reason: 'Authored reason Goblin'});
  assert.equal(out.ok, true, out.error); assert.equal(out.result.parked, true);
  const pending = listOpenPendingRolls(world.campaignId)[0]; assert.equal(pending.presentation.kind, 'initiative');
  assert.equal(pending.reason, 'Authored reason Goblin');
  world.signIn({id: hero.userId}); const route = await world.route('campaigns/[campaignId]/pending-rolls/[pendingRollId]');
  const response = await call(route, 'POST', {dice: [15]}, {campaignId: world.campaignId, pendingRollId: pending.id});
  assert.equal(response.status, 200, JSON.stringify(response.json)); assert.equal(last().total, 17);
  assert.equal(last().presentation.physical, true); assert.match(caption(last()), /先攻.*实体骰/);
  setMemberRealDice(world.campaignId, hero.userId, false);
});
await test('both ambush sides keep passive-score comparisons and Alert protection', async () => {
  const {decideAmbush} = await import('../src/lib/dm/encounter-open.ts');
  const enemy = world.enemies()[0]; world.patch(hero.id, {feats: ['Alert']});
  world.dice(20); const ambush = decideAmbush(world.campaign(), 'enemies', [enemy], [world.sheet(hero.id)]);
  assert.equal(world.clearDice(), 0); assert.deepEqual(ambush.surprisedIds, []);
  assert.equal(last().visibility, 'dm'); assert.match(caption(last()), /哥布林.*隐匿.*设伏/);
  world.patch(hero.id, {feats: [], conditions: [], conditionMeta: {}}); world.dice(20);
  const party = decideAmbush(world.campaign(), 'party', [enemy], [world.sheet(hero.id)]);
  assert.equal(world.clearDice(), 0); assert.deepEqual(party.surprisedIds, [enemy.id]);
  assert.equal(last().detail, 'stealth, lying in wait'); assert.equal(last().visibility, 'public'); assert.match(caption(last()), /隐匿.*设伏/);
});
await test('actual social influence keeps DC, one shift per exchange and a proper NPC called Goblin', async () => {
  const {handleSocialCheck} = await import('../src/lib/dm/social-tools.ts');
  upsertNpc({campaignId: world.campaignId, name: 'Goblin', attitude: 'indifferent'});
  const turn = createDmTurn(world.campaignId, [], 'human_dm'), sheets = world.sheets();
  world.dice(20); const out = handleSocialCheck(world.campaign(), turn, JSON.stringify({characterId: hero.id, npc: 'Goblin', approach: 'persuade'}), sheets, new Map(sheets.map(sheet => [sheet.id, sheet])));
  assert.equal(world.clearDice(), 0); assert.ok(!out.error, out.error); assert.equal(last().total, 20); assert.equal(last().dc, 15);
  assert.equal(getNpcByName(world.campaignId, 'Goblin').attitude, 'friendly'); assert.match(caption(last()), /游说检定以影响Goblin/);
  assert.equal(last().presentation.context.target.kind, 'proper'); assert.equal(turn.rollIds.length, 1);
  world.dice(1); handleSocialCheck(world.campaign(), turn, JSON.stringify({characterId: hero.id, npc: 'Goblin', approach: 'deceive'}), sheets, new Map(sheets.map(sheet => [sheet.id, sheet])));
  assert.equal(world.clearDice(), 0); assert.equal(getNpcByName(world.campaignId, 'Goblin').attitude, 'friendly'); assert.equal(turn.rollIds.length, 2);
});
await test('real relationship gift and consent keep approval changes, refusal and DM-only consent die', async () => {
  const {handleRelationshipBeat, handleRomanceAdvance} = await import('../src/lib/dm/relationship-tools.ts');
  const sheets = world.sheets(), byId = new Map(sheets.map(sheet => [sheet.id, sheet]));
  world.dice(15); const gifted = handleRelationshipBeat(world.campaign(), createDmTurn(world.campaignId, [], 'human_dm'), JSON.stringify({characterId: hero.id, subject: 'Goblin', beat: 'gift'}), sheets, byId);
  assert.equal(world.clearDice(), 0); assert.ok(!gifted.error, gifted.error); assert.match(caption(last()), /与Goblin互动.*游说检定/);
  const relationship = getRelationship(world.campaignId, hero.id, 'Goblin'); assert.ok(relationship.approval > 0);
  patchRelationship(relationship.id, {approval: 40, romance: 'none', lastShiftTurn: null});
  world.dice(1); const refused = handleRomanceAdvance(world.campaign(), createDmTurn(world.campaignId, [], 'human_dm'), JSON.stringify({characterId: hero.id, subject: 'Goblin', to: 'interested'}), sheets, byId);
  assert.equal(world.clearDice(), 0); assert.equal(refused.accepted, false); assert.equal(last().visibility, 'dm');
  assert.equal(last().total, 1); assert.match(caption(last()), /Goblin是否同意/);
  assert.equal(getRelationship(world.campaignId, hero.id, 'Goblin').romance, 'none');
});
await test('real haggle preserves town DC, price step and refusal of a second attempt with no extra dice', () => {
  // This handler is also reached by the player's shop route; the commerce
  // suite covers authorization and inventory transactions on that route.
  return import('../src/lib/db/shops.ts').then(async ({insertShop, getShop}) => {
    const {handleHaggle} = await import('../src/lib/dm/shop-tools.ts');
    const shop = insertShop(world.campaignId, {name: 'Fireball <script>', size: 'town', markup: 1, stock: []});
    world.dice(13); const out = handleHaggle(world.campaign(), JSON.stringify({characterId: hero.id, shop: shop.id}));
    assert.equal(world.clearDice(), 0); assert.equal(out.ok, true, out.error); assert.equal(out.success, true);
    assert.equal(last().dc, 13); assert.equal(last().total, 13); assert.equal(getShop(shop.id).markup, 0.9);
    assert.match(caption(last()), /Fireball <script>.*议价.*游说/); const count = recent().length;
    assert.ok(handleHaggle(world.campaign(), JSON.stringify({characterId: hero.id, shop: shop.id})).error);
    assert.equal(recent().length, count); assert.deepEqual(getShop(shop.id).haggledBy, [hero.id]);
  });
});
await test('enemy Counterspell keeps the original higher-level DC, spent reaction/slot, private die and no second response', async () => {
  const {combatKit} = await import('./lib/enforce-combat.mjs'); const kit = await combatKit(world);
  const {enemyCounterspell} = await import('../src/lib/dm/enemy-reactions.ts');
  const enemy = world.enemies()[0]; kit.setEnemy(enemy.id, {stats: {abilities: {int: 16}, spellcasting: {dc: 14, attack: 6, ability: 'int', slots: {3: 2}, spells: [{name: 'Counterspell', level: 3}]}}});
  kit.place(hero.id, 5, 5); kit.place(enemy.id, 6, 5); const turn = createDmTurn(world.campaignId, [], 'human_dm');
  world.dice(12); const out = enemyCounterspell(world.campaignId, turn, world.encounter(), world.sheet(hero.id), 'Cone of Cold', 5);
  assert.equal(world.clearDice(), 0); assert.equal(out.countered, true); assert.equal(last().total, 15);
  assert.equal(last().visibility, 'dm'); assert.equal(last().dc, null); assert.equal(last().presentation.context.difficulty, 15);
  assert.match(caption(last()), /智力.*反制寒冰锥.*难度 15/); assert.equal(turn.rollIds.length, 1);
  assert.ok(world.encounter().reactionsUsed.includes(enemy.id)); assert.deepEqual(world.encounter().legendary.abilities[enemy.id].slots, {3: 1});
  assert.equal(enemyCounterspell(world.campaignId, turn, world.encounter(), world.sheet(hero.id), 'Cone of Cold', 5), null);
});
await test('reinforcements add one silent initiative roll, preserve the active turn and translate numbered enemies', async () => {
  const before = recent().length, active = world.encounter().order[world.encounter().turnIndex];
  world.dice(6); const out = await world.invoke('add_enemies', {enemies: [{monster: 'goblin', count: 1}]});
  assert.equal(world.clearDice(), 0); assert.equal(out.ok, true, out.error); assert.equal(recent().length, before + 1);
  assert.equal(last().visibility, 'dm'); assert.match(caption(last()), /哥布林.*先攻/);
  const after = world.encounter(); assert.deepEqual(after.order[after.turnIndex], active); assert.equal(world.enemies().length, 2);
});
await test('a arriving named companion keeps their proper name and real initiative slot', async () => {
  const {finalizeNewCompanion} = await import('../src/lib/dm/companion-tools.ts');
  const {heroInput} = await import('./lib/enforce-world.mjs'); const before = recent().length;
  world.dice(11); const out = finalizeNewCompanion(world.campaign(), 1, heroInput({name: 'Goblin', abilities: {dex: 14}}), 'guest', '');
  assert.equal(world.clearDice(), 0); assert.equal(out.hadEncounter, true); assert.equal(recent().length, before + 1);
  assert.equal(last().characterId, out.sheet.id); assert.equal(last().total, 13);
  assert.match(localizedRollCardLabel(last(), out.sheet.name, 'zh-CN'), /Goblin.*先攻/);
  assert.doesNotMatch(localizedRollCardLabel(last(), out.sheet.name, 'zh-CN'), /哥布林/);
  assert.ok(world.encounter().order.some(entry => entry.characterId === out.sheet.id && entry.initiative === 13));
});
await test('summons roll once as a group, share their original initiative and use the catalog form caption', async () => {
  const {spawnSummons} = await import('../src/lib/dm/summon-store.ts');
  const {summonRecord} = await import('../src/lib/dm/summon-rules.ts');
  const {findSummonForm} = await import('../src/lib/srd/summon-forms.ts'); const form = findSummonForm('Wolf');
  const record = summonRecord(form, {spell: 'Conjure Animals', casterId: hero.id, casterName: hero.name, concentration: true, castId: 'caption-fixture'});
  const before = recent().length; world.dice(9);
  const made = spawnSummons(world.campaign(), world.sheet(hero.id), {form, count: 2, record, rounds: 10, slotLevel: 3, initiative: 'group'});
  assert.equal(world.clearDice(), 0); assert.equal(recent().length, before + 1); assert.equal(made.length, 2);
  assert.equal(last().total, 11); assert.equal(last().detail, 'Wolf: initiative'); assert.match(caption(last()), /狼.*先攻/);
  const entries = world.encounter().order.filter(entry => made.some(sheet => sheet.id === entry.characterId));
  assert.deepEqual(entries.map(entry => entry.initiative), [11, 11]);
});
await test('metadata survives reopening without rewriting existing English or freeform history', () => {
  const rolls = recent(), before = rolls.map(roll => ({id: roll.id, detail: roll.detail, presentation: roll.presentation}));
  getDatabase().close(); globalThis.__localRoleplayDb = undefined;
  assert.deepEqual(recent().map(roll => ({id: roll.id, detail: roll.detail, presentation: roll.presentation})), before);
  const legacy = initiativeSocialRows().find(row => row.name === 'legacy').roll;
  assert.match(caption(legacy), /Goblin: initiative/);
});
await test('source-reviewed fingerprints remain exact', () => {
  const review = JSON.parse(fs.readFileSync(path.join(root, 'docs/validation/initiative-social-translations.json')));
  for (const [file, hash] of Object.entries(review.sourceSha256)) assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'), hash, file);
});
world.close(); finish();
