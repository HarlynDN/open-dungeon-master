import {openCombatRenderer} from './combat-ui-fixtures.mjs';
import {SHEET_STATE} from './sheet-party-fixtures.mjs';

const url = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
export const DIALOG_FILE = 'src/app/campaigns/[campaignId]/CharacterSheetDialog.tsx';
export const GEAR_FILE = 'src/components/sheet/SheetGearRow.tsx';
export const CHOICE_FILE = 'src/components/sheet/SheetChoices.tsx';
export function openSheetDialogRenderer(options = {}) {
  const shell = url(`import {createElement as h,Fragment} from ${JSON.stringify(import.meta.resolve('react'))};
    export const Root=({children})=>h(Fragment,null,children); export const Portal=Root;
    export const Overlay=()=>null; export const Content=({children,className})=>h('div',{className},children);
    export const Title=({children,className})=>h('h2',{className},children); export const Close=({children})=>h('button',null,children);
    export const Tooltip=({children,content})=>h('span',{'data-tooltip':content},children);
    export const GameTerm=({children,id})=>h('span',{'data-term':id},children);
    export const InfoButton=({label,text})=>h('button',{'data-help':text},label);
    export const InfoChipList=({items})=>h('div',{'data-items':JSON.stringify(items)});
    export const InfoDialog=()=>null; export const downloadCharacterSheetPdf=async()=>{};
    export const ImageLightbox=({alt,caption})=>h('span',{'data-caption':caption},alt);
    export const SheetSpells=()=>null; export const SheetBetween=()=>null;`);
  const stubs = Object.fromEntries(['@radix-ui/react-dialog','@/components/ui/Tooltip','@/components/ui/GameTerm',
    '@/components/ui/InfoDialog','@/lib/pdf/download','@/components/ui/ImageLightbox',
    '@/components/sheet/SheetSpells','@/components/sheet/SheetBetween'].map(key=>[key,shell]));
  return openCombatRenderer({files:[DIALOG_FILE,GEAR_FILE,CHOICE_FILE], stubs, ...options});
}
export function dialogSheet(patch = {}) {return {...structuredClone(SHEET_STATE), ...patch};}
export function sheetDialogFixtures(renderer, locale = 'en') {
  const rows = [], add = (name,component,props,options) => rows.push({name,html:renderer.render(component,props,locale,options)});
  const own = {mine:true,steersStory:true,corrects:true,onClose:()=>{},onAdjust:()=>{}};
  for (const [name,patch,props] of [
    ['basic',{},{}],['private',{notes:'Authored note <script>',backstory:'Goblin is my proper name.'},{}],
    ['multiclass',{race:'goblin',classes:[{id:'fighter',level:2},{id:'wizard',level:1}],alignment:'Lawful Good',background:'Soldier'},{}],
    ['spells',{class:'wizard',level:5,spellcasting:{ability:'int',slots:{1:{max:4,used:1},2:{max:3,used:1}},known:['Fireball'],prepared:['Fireball']}},{}],
    ['pact',{class:'warlock',spellcasting:{ability:'cha',slots:{},pact:{level:2,max:2,used:1},known:['Hex'],prepared:[]}},{}],
    ['equipment',{equipment:[{name:'Plate',qty:1,equipped:true},{name:'Shield',qty:1,equipped:true},{name:'Longsword +1',qty:1,equipped:true},{name:'Authored item <script>',qty:1}],resources:{rage:{max:3,used:1}}},{encumbranceRule:true}],
    ['heavy',{abilities:{...SHEET_STATE.abilities,str:10},equipment:[{name:'Authored weighted item',qty:1,weight:110}]},{encumbranceRule:true}],
    ['overload',{abilities:{...SHEET_STATE.abilities,str:1},equipment:[{name:'Plate',qty:1}]},{}],
    ['wild-shape',{wildShape:{form:'Wolf',beastHp:5,beastMaxHp:11,beastAc:13}},{}],
    ['dead',{currentHp:0,deathSaves:{dead:true,successes:0,failures:3},spellcasting:{ability:'cha',slots:{1:{max:2,used:0}},known:[],prepared:[]}}, {corrects:false}],
  ]) add('dialog/'+name,'CharacterSheetDialog',{...own,sheet:dialogSheet(patch),...props});
  const sheet=dialogSheet({equipment:[{name:'Plate',qty:1,equipped:true}]});
  for (const [name,refusal,timeNote] of [['refusal',{text:'Goblin does not carry one of those items.',at:'gear'},null],['time',null,'Putting on Plate takes 10 minutes.']])
    add('dialog/'+name,'CharacterSheetDialog',{...own,sheet},{queues:{[DIALOG_FILE]:[false,false,refusal,timeNote]}});
  for (const [name,item,props] of [
    ['plate',{name:'Plate',qty:1},{worn:false}],['shield-offturn',{name:'Shield',qty:1},{inCombat:true,myTurn:false}],
    ['shield-ownturn',{name:'Shield',qty:1},{inCombat:true,myTurn:true}],['attuning',{name:'Ring of Protection',qty:1,attuning:true},{}],
    ['cursed',{name:'Berserker Axe',qty:1,attuned:true},{}],['dead',{name:'Plate',qty:1},{dead:true}],
  ]) add('gear/'+name,'SheetGearRow',{sheet:dialogSheet({equipment:[item]}),item,worn:true,inCombat:false,myTurn:false,dead:false,busy:false,onGear:()=>{},...props});
  for (const [classId,feature,level,subclass] of [
    ['barbarian','Totem Spirit',3,'Path of the Totem Warrior'],['barbarian','Aspect of the Beast',6,'Path of the Totem Warrior'],
    ['barbarian','Totemic Attunement',14,'Path of the Totem Warrior'],['wizard',"Transmuter's Stone",6,'School of Transmutation'],
    ['warlock','Elemental Gift',6,'The Genie'],['artificer','Armor Model',3,'Armorer'],
  ]) add('choice/'+feature,'FeatureChoicePicker',{sheet:dialogSheet({class:classId,level,subclass,features:[{name:feature}]}),mine:true,inCombat:false});
  add('choice/locked','FeatureChoicePicker',{sheet:dialogSheet({class:'barbarian',subclass:'Path of the Totem Warrior',features:[{name:'Totem Spirit'}]}),mine:true,inCombat:true});
  add('choice/chosen','FeatureChoicePicker',{sheet:dialogSheet({class:'barbarian',subclass:'Path of the Totem Warrior',features:[{name:'Totem Spirit (Bear)'}]}),mine:true,inCombat:false});
  return rows;
}
