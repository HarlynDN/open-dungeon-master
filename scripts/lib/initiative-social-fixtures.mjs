import {BASE_ROLL} from './roll-presentation-fixtures.mjs';

export const INITIATIVE_SOCIAL_FILES = [
  'encounter-open', 'invoke-roll', 'encounter-tools', 'encounter-spawn',
  'initiative', 'companion-tools', 'summon-store', 'social-tools',
  'relationship-tools', 'shop-tools', 'enemy-reactions', 'authored-spend-effects',
].map(name => `src/lib/dm/${name}.ts`);

export function initiativeSocialRows() {
  const enemy = {name: 'Goblin 2', kind: 'enemy'};
  const proper = {name: 'Goblin, vs 米拉_2', kind: 'proper'};
  const rows = [];
  const add = (name, kind, detail, presentation, patch = {}) => rows.push({
    name, characterName: proper.name,
    roll: {...BASE_ROLL, attacker: null, kind, detail, presentation, ...patch},
  });
  add('initiative/pc', 'initiative', 'initiative', {kind: 'initiative'});
  add('initiative/enemy', 'initiative', 'Goblin 2: initiative', {kind: 'initiative', owner: enemy}, {characterId: null, visibility: 'dm'});
  add('initiative/proper', 'initiative', 'Goblin, vs 米拉_2: initiative', {kind: 'initiative', owner: proper});
  add('initiative/summon', 'initiative', 'Goblin 2: initiative', {kind: 'initiative', owner: enemy});
  add('initiative/physical', 'initiative', 'initiative', {kind: 'initiative', physical: true});
  for (const [name, key, context, detail, owner = proper, kind = 'skill_check'] of [
    ['ambush/pc', 'stealth', {kind: 'ambush'}, 'stealth, lying in wait'],
    ['ambush/enemy', 'stealth', {kind: 'ambush'}, 'Goblin 2: stealth, lying in wait', enemy],
    ['social/persuade', 'persuasion', {kind: 'influence', target: proper}, 'Goblin, vs 米拉_2: persuasion on Goblin, vs 米拉_2'],
    ['social/deceive', 'deception', {kind: 'influence', target: proper}, 'Goblin, vs 米拉_2: deception on Goblin, vs 米拉_2'],
    ['social/intimidate', 'intimidation', {kind: 'influence', target: {kind: 'proper', name: 'Goblin'}}, 'Goblin, vs 米拉_2: intimidation on Goblin'],
    ['relationship', 'performance', {kind: 'relationship', target: proper}, 'Goblin, vs 米拉_2: performance toward Goblin, vs 米拉_2'],
    ['shop', 'persuasion', {kind: 'haggle', shop: 'Fireball & <script>'}, 'Goblin, vs 米拉_2: haggling at Fireball & <script>'],
    ['deception-insight', 'deception', {kind: 'deception-insight', target: proper}, "Goblin 2: Deception against Goblin, vs 米拉_2's Insight", enemy],
    ['counterspell', 'int', {kind: 'counterspell-dc', name: 'Cone of Cold', difficulty: 15}, 'Goblin 2: Counterspell against Cone of Cold (INT check, DC 15)', enemy, 'ability_check'],
    ['counterspell/authored', 'cha', {kind: 'counterspell-dc', name: 'Fireball', difficulty: 19, literalName: true}, 'Goblin 2: Counterspell against Fireball (CHA check, DC 19)', enemy, 'ability_check'],
  ]) add(name, kind, detail, {kind: 'check', term: {kind: kind === 'ability_check' ? 'ability' : 'skill', key}, context, owner});
  add('agreement', 'custom', `${proper.name}: whether they agree`, {kind: 'special', context: {kind: 'agreement', target: proper}}, {characterId: null, visibility: 'dm'});
  add('legacy', 'initiative', 'Goblin: initiative', undefined);
  add('authored', 'custom', 'Fireball on Goblin 2', undefined);
  const blind = rows.find(row => row.name === 'counterspell').roll;
  add('blind', 'ability_check', blind.detail, blind.presentation, {hidden: true, dc: null, total: null, success: null, breakdown: null, visibility: 'dm'});
  return rows;
}

export function initiativeSocialFixtures(renderer, locale = 'en') {
  const rows = initiativeSocialRows();
  const result = rows.map(({name, roll, characterName}) => ({name, html: renderer.render('RollCard', {roll, characterName}, locale)}));
  for (const row of rows.filter(row => ['initiative/enemy', 'social/persuade', 'counterspell', 'agreement'].includes(row.name))) {
    const roll = {...row.roll, id: '00000000-0000-0000-0000-000000000001'};
    const sheets = [{id: 'pc', userId: 'u', name: row.characterName}];
    result.push({name: 'toast/' + row.name, html: renderer.render('RollToast', {latestRoll: {roll, seq: 2}, sheets}, locale,
      {queues: {'src/app/campaigns/[campaignId]/CinematicParts.tsx': [{roll, seq: 2}, 2]}})});
    result.push({name: 'chronicle/' + row.name, html: renderer.render('TabletopChronicle', {
      messages: [{id: 'm', authorType: 'dm', content: '[roll:' + roll.id + ']'}], rolls: [roll], sheets, members: [],
      isDm: true, steersStory: true, kind: 'do', onKindChange: () => {}, input: '', setInput: () => {},
      sending: false, inputBlocked: false, placeholder: '', onSubmit: () => {}, composer: false,
    }, locale)});
  }
  return result;
}
