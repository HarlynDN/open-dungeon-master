import fs from 'node:fs';
import {openCombatRenderer} from './combat-ui-fixtures.mjs';
const {featGrantSpec} = await import('../../src/lib/srd/feat-grant-text.ts');
const root = new URL('../../', import.meta.url);
export const choiceFile = 'src/app/characters/builder/FeatChoicesFields.tsx';
export const labelFile = 'src/app/campaigns/[campaignId]/LabelSheet.tsx';
const url = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
export async function choiceRenderer(sourceOf) {
  return openCombatRenderer({sourceOf, files: [choiceFile, labelFile], stubs: {
    '@/components/ui/Select': url('export const Select=({label,placeholder,options})=>label+" | "+placeholder+" | "+options.map(row=>row.label+(row.hint?" ("+row.hint+")":"")).join(" / ");'),
    '@/app/characters/builder/AbilityEditor': url('export const ABILITY_LABELS={str:"Strength",dex:"Dexterity",con:"Constitution",int:"Intelligence",wis:"Wisdom",cha:"Charisma"};'),
    './ContentPicker': url('export default function ContentPicker({placeholder}){return placeholder;}'),
    './steps/shared': url('export const PickPill=({children})=>children;'),
    '@/components/ui/Sheet': url('export const Sheet=({title,children})=>[title,children];'),
    '@/components/ui/Markdown': url('export const Markdown=({source})=>source;'),
  }});
}
export function choiceCases() {
  const known = {languages: [], skills: ['perception'], expertise: [], tools: [], weapons: [], armor: []};
  const native = JSON.parse(fs.readFileSync(new URL('src/lib/srd/authored-feats.json', root), 'utf8')).feats;
  const rows = native.map(row => ({name: row.name, props: {feat: row.name, spec: featGrantSpec(row.desc), desc: row.desc, known, onChange: () => {}}}));
  const base = featGrantSpec('');
  const customs = [
    ['Authored pick', {...base, any: 2, anyKinds: ['armor', 'weapons', 'tools'], armorFrom: ['shields'], weaponsFrom: ['Dagger'], toolsFrom: ["thieves' tools"]}, {}],
    ['Authored training', {...base, skills: 1, fixedSkills: ['stealth'], fixedLanguages: ['Draconic'], armor: ['light'], fixedWeapons: ['Dagger'], fixedTools: ["thieves' tools"]}, {}],
    ['Ritual Caster', featGrantSpec(native.find(row => row.name === 'Ritual Caster').desc), {list: 'wizard', ability: 'int', spells: ['Detect Magic']}],
    ['Skill Expert', featGrantSpec(native.find(row => row.name === 'Skill Expert').desc), {skills: ['stealth'], expertise: ['stealth']}],
    ['Magic Initiate', featGrantSpec(native.find(row => row.name === 'Magic Initiate').desc), {list: 'wizard', cantrips: ['Mage Hand'], spells: ['Shield']}],
    ['Authored ritual', {...base, taught: {...base.taught, spells: 1, spellLevel: 2, ability: "choice", schools: ['illusion', 'enchantment'], ritualBook: true, lists: ['wizard'], fixedSpells: ['Detect Magic'], freeCast: true}}, {}],
  ];
  return [...rows, ...customs.map(([feat,spec,picks]) => ({name: feat+' choices',props: {feat,spec,picks,known,onChange: () => {}}}))];
}
export function labelCases() {
  const label = {id: 'l',text: 'Authored map title',ref: {kind: 'lore',id: 'lore'}};
  const base = {campaignId: 'campaign',label,onClose: () => {}};
  return [
    {name: 'loading',props: base,options: {queues: {[labelFile]: [null,true,false]}}},
    {name: 'missing',props: base,options: {queues: {[labelFile]: [null,false,true]}}},
    {name: 'loaded',props: base,options: {queues: {[labelFile]: [{id:'lore',title:'Authored lore title',body:'Authored lore content.'},false,false]}}},
    {name: 'plain',props: {...base,label: {...label,ref:null}}},
  ];
}
