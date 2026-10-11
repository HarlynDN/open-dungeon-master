import {openCombatRenderer} from './combat-ui-fixtures.mjs';

export const SHEET_PARTY_FILES = ['SheetState', 'SheetCounters', 'SheetParts', 'SheetChoices'].map(name => `src/components/sheet/${name}.tsx`)
  .concat('src/app/campaigns/[campaignId]/PartyPanel.tsx', 'src/app/campaigns/[campaignId]/RollCard.tsx');
export const SHEET_STATE = {
  id: 'hero', userId: 'u', campaignId: 'c', name: 'Goblin', race: 'goblin', class: 'fighter', subclass: '',
  level: 3, xp: 300, background: '', alignment: '', gender: '', appearance: '',
  abilities: {str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10}, maxHp: 40, currentHp: 17, tempHp: 0,
  ac: 12, acOverride: true, speed: 30, hitDice: {die: 'd10', total: 3, spent: 1}, hitDicePools: null,
  proficiencies: {saves: [], skills: [], expertise: [], languages: ['Goblin'], tools: [], armor: [], weapons: []},
  equipment: [], features: [], feats: [], classes: [], resources: {}, conditions: [], conditionMeta: {},
  gold: 10, copper: 0, spellcasting: null, pets: [], notes: '', backstory: '', portrait: null,
  createdAt: '2020-01-01T00:00:00Z', updatedAt: '2020-01-01T00:00:00Z',
};
const url = code => 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
export function openSheetPartyRenderer(options = {}) {
  // Other dialogs and device pickers have their own coverage. Keep this
  // fixture on the actual cards/controls and capture public dialog props.
  const shell = url(`import {createElement as h} from ${JSON.stringify(import.meta.resolve('react'))};
    export const CharacterMenu=()=>null; export const DiceSourcesButton=()=>null; export const DiceLookButton=()=>null;
    export const CharacterNotesDialog=()=>null; export const TradeDialog=()=>null; export const CompanionBuilderDialog=()=>null; export const LeadEditDialog=()=>null;
    export const InfoButton=({label,text})=>h('button',{'data-help':text},label); export const InfoChipList=({items})=>h('div',{'data-items':JSON.stringify(items)});
    export const InfoDialog=()=>null;
    export const AvatarCropDialog=({title})=>h('h2',null,title);
    export const CharacterSheetDialog=({names})=>h('div',{'data-visible-names':JSON.stringify(names.map(({id,name})=>({id,name})))});
    export const Tooltip=({children,content})=>h('span',{'data-tooltip':content},children);`);
  const stubs = Object.fromEntries(['@/app/campaigns/[campaignId]/CharacterMenu', '@/app/campaigns/[campaignId]/CharacterSheetDialog',
    '@/app/campaigns/[campaignId]/DiceSourcesDialog', '@/components/DiceLookEditor', '@/app/settings/AvatarCropDialog', '@/components/ui/Tooltip', '@/components/ui/InfoDialog',
    '@/app/campaigns/[campaignId]/CharacterNotesDialog', '@/app/campaigns/[campaignId]/TradeDialog', '@/app/campaigns/[campaignId]/CompanionBuilderDialog', '@/app/campaigns/[campaignId]/LeadEditDialog'].map(key => [key, shell]));
  return openCombatRenderer({files: SHEET_PARTY_FILES, stubs, ...options});
}

export function sheetPartyFixtures(renderer, locale = 'en') {
  const rows = [];
  const add = (name, component, props, options) => rows.push({name, html: renderer.render(component, props, locale, options)});
  const sheet = patch => ({...structuredClone(SHEET_STATE), ...patch});
  for (const level of [0, 1, 2, 3, 4, 5, 6]) add('state/exhaustion/' + level, 'StateTags', {sheet: sheet({exhaustion: level})});
  for (const [name, patch] of [
    ['dead', {currentHp: 0, deathSaves: {successes: 0, failures: 3, dead: true}}],
    ['stable', {currentHp: 0, deathSaves: {successes: 3, failures: 1, stable: true}}],
    ['dying', {currentHp: 0, deathSaves: {successes: 1, failures: 2}}],
    ['incapacitated', {conditions: ['stunned']}],
    ['concentration', {concentratingOn: 'Hold Person'}],
    ['authored-concentration', {concentratingOn: 'Authored Fireball <script>'}],
    ['readied', {conditions: ['readied'], conditionMeta: {readied: {source: 'Fireball: the door opens <script>'}}}],
    ['readied-no-trigger', {conditions: ['readied']}],
    ['inspiration', {resources: {inspiration: {max: 1, used: 0}}}],
  ]) add('state/' + name, 'StateTags', {sheet: sheet(patch)});
  add('defenses', 'DefensesLine', {sheet: sheet({race: 'tiefling', conditions: ['raging'], features: [{name: 'Purity of Body'}]})});
  add('speeds', 'OtherSpeeds', {speeds: {fly: 60, swim: 30}});
  add('conditions/legacy', 'ConditionChips', {conditions: ['poisoned', 'Authored <script>'], rounds: {poisoned: {rounds: 11}}});
  for (const corrects of [false, true]) add('slots/' + corrects, 'SlotRow', {label: locale === 'en' ? 'Level II' : '二环', left: 1, max: 3, spends: true, corrects, busy: false, onSpend: () => {}, onRecover: () => {}});
  for (const [id, pool] of [['rage', {max: 3, used: 1}], ['relentless_rage', {max: 1, used: 1}], ['overchannel', {max: 1000, used: 2}], ['signature_spell_1', {max: 1, used: 0}]]) {
    add('resource/' + id, 'ResourceRow', {id, pool, name: 'Authored resource', help: 'Authored note <script>', spends: true, corrects: true, busy: false, deadNote: null, onSpend: () => {}, onRecover: () => {}});
  }
  const stateFile = 'src/components/sheet/SheetState.tsx';
  add('hit-dice/closed', 'HitDiceSpend', {sheet: sheet({hitDicePools: [{classId: 'fighter', die: 'd10', total: 2, spent: 1}, {classId: 'wizard', die: 'd6', total: 1, spent: 0}]}), mine: true, inCombat: false});
  add('hit-dice/open', 'HitDiceSpend', {sheet: sheet({}), mine: true, inCombat: false}, {queues: {[stateFile]: [true, false, null, 0]}});
  add('hit-dice/empty', 'HitDiceSpend', {sheet: sheet({hitDice: {die: 'd10', total: 3, spent: 3}}), mine: true, inCombat: false}, {queues: {[stateFile]: [true, false, null, 0]}});
  const encounter = {order: [{id: 'hero', name: 'Goblin', kind: 'pc'}, {id: 'enemy', name: 'Goblin 2', kind: 'enemy'}]};
  const own = sheet({conditions: ['frightened'], conditionMeta: {frightened: {untilTurnEndOf: 'enemy', saveEnds: {ability: 'wis', dc: 13}, source: 'enemy', spell: 'Fear'}}, concentratingOn: 'Hold Person', exhaustion: 4,
    resources: {rage: {max: 3, used: 1}, inspiration: {max: 1, used: 0}}});
  const props = {sheets: [own], meUserId: 'u', leadUserId: 'u', onlineUserIds: ['u'], campaignId: 'c', encounter, onLevelUp: () => {}, levelUpLevel: 4, steersStory: true,
    notes: [{id: 'n', characterId: 'hero', visibility: 'public'}]};
  add('party/basic', 'PartyPanel', props);
  add('party/companion', 'PartyPanel', {...props, sheets: [sheet({isCompanion: true, wildShape: {form: 'Wolf', beastHp: 5, beastMaxHp: 11, beastAc: 13}})], companionsAvailable: true, companionBuildAvailable: true});
  add('party/multi', 'PartyPanel', {...props, sheets: [own, sheet({id: 'hero2', name: 'Fireball <script>', classes: [{id: 'fighter', level: 2}, {id: 'wizard', level: 1}]})], multiCharacter: 'one_active', activeSheetId: 'hero', lights: {hero: {remaining: 10, total: 60}}});
  add('party/dice', 'PartyPanel', {...props, realDiceAllowed: true, sheets: [sheet({libraryCharacterId: 'library'})], members: [{userId: 'u', useRealDice: true}]});
  return rows;
}

export function sheetStateOutputs(view, locale = 'en') {
  const cases = [
    ['base', {}], ['exhausted', {exhaustion: 4}], ['stopped', {conditions: ['grappled']}],
    ['heavy', {abilities: {...SHEET_STATE.abilities, str: 6}, equipment: [{name: 'Plate', qty: 1, equipped: true, weightLb: 65}]}],
    ['concentration', {concentratingOn: 'Hold Person'}],
    ['readied', {conditions: ['readied'], conditionMeta: {readied: {source: 'Fireball: door opens'}}}],
    ['incapacitated', {conditions: ['stunned']}], ['dying', {currentHp: 0, deathSaves: {successes: 2, failures: 1}}],
    ['stable', {currentHp: 0, deathSaves: {successes: 3, failures: 1, stable: true}}],
    ['dead', {currentHp: 0, deathSaves: {successes: 0, failures: 3, dead: true}}],
    ['defenses', {race: 'tiefling', conditions: ['raging'], features: [{name: 'Purity of Body'}]}],
  ].map(([name, patch]) => {
    const sheet = {...structuredClone(SHEET_STATE), ...patch};
    return {name, hp: view.maxHpView(sheet, locale), speed: view.speedView(sheet, {encumbrance: true}, locale), tags: view.stateTags(sheet, locale), defenses: view.defensesView(sheet, locale)};
  });
  return {cases, speeds: view.otherSpeedsLine({fly: 60, swim: 30}, locale), counters: ['rage', 'signature_spell_1', 'overchannel'].map(id => ({id, ...view.counterView(id, {max: id === 'overchannel' ? 99 : 3, used: 1}, locale)})),
    charges: view.itemStatus(SHEET_STATE, {name: 'Wand of Magic Missiles', qty: 1, charges: 4}, locale)};
}
