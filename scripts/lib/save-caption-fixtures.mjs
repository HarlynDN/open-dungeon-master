import {BASE_ROLL} from './roll-presentation-fixtures.mjs';
export function saveCaptionRows(){
 const enemy={name:'Goblin 2',kind:'enemy'},proper={name:'Goblin, vs 米拉_2',kind:'proper'};
 const specs=[
 ['spell',{kind:'save-against',name:'Hold Person'},'WIS save against Hold Person'],
 ['keep',{kind:'keep-concentration'},'WIS save to keep concentrating'],
 ['concentration',{kind:'concentration',name:'Bless'},'concentration on Bless (WIS save)'],
 ['slayer',{kind:'concentration-slayer',name:'Bless'},'concentration on Bless (WIS save, Mage Slayer: disadvantage)'],
 ['zone',{kind:'concentration-zone',name:'Earthquake'},'WIS save to keep concentration in Earthquake'],
 ['fissure',{kind:'fissure',name:'Earthquake'},'WIS save against a fissure of Earthquake'],
 ['violet',{kind:'violet',name:'Prismatic Spray'},"WIS save against Prismatic Spray's violet ray"],
 ['hurt',{kind:'save-after-damage',name:'Hideous Laughter'},'WIS save against Hideous Laughter (hurt)'],
 ['end',{kind:'end-condition',name:'frightened'},'WIS save to end frightened'],
 ['avoid',{kind:'avoid-condition',name:'charmed'},'WIS save against being charmed'],
 ['land',{kind:'land-feet'},'WIS save to land on their feet'],
 ['from-enemy',{kind:'save-from',name:'Bite',from:enemy},"WIS save vs Goblin 2's Bite"],
 ['from-proper',{kind:'save-from',name:"Nature's Sanctuary",from:proper},"WIS save against Goblin, vs 米拉_2's Nature's Sanctuary"],
 ['authored',{kind:'save-against',name:'Fireball',literalName:true},'WIS save against Fireball'],
 ['fortitude',{kind:'feature-save',name:'Undead Fortitude'},'Undead Fortitude (WIS save)'],
 ['rage',{kind:'feature-save',name:'Relentless Rage'},'WIS save, Relentless Rage'],
 ['reroll',{kind:'feature-reroll',name:'Indomitable'},'WIS save, Indomitable reroll'],
 ['authored-reroll',{kind:'feature-reroll',name:'Goblin, vs _ <script>',literalName:true},'WIS save, Goblin, vs _ <script> reroll'],
 ['dragon',{kind:'save-against',name:'Draconic Presence'},'WIS save against Draconic Presence'],
 ['palm',{kind:'save-against',name:'Quivering Palm'},'WIS save against Quivering Palm'],
 ['mote',{kind:'save-against',name:"the mote's burst"},"WIS save against the mote's burst"],
 ];
 const rows=specs.map(([name,context,detail])=>({name,roll:{...BASE_ROLL,kind:'saving_throw',attacker:null,characterId:'pc',dc:10,success:false,detail,presentation:{kind:'check',term:{kind:'ability',key:'wis'},context,owner:proper}},characterName:proper.name}));
 rows.push({name:'enemy',roll:{...rows[0].roll,detail:'Goblin 2: WIS save against Hold Person',characterId:null,visibility:'dm',presentation:{...rows[0].roll.presentation,owner:enemy}},characterName:undefined});
 rows.push({name:'blind',roll:{...rows.at(-1).roll,hidden:true,expression:'',total:null,dc:null,success:null,breakdown:null},characterName:undefined});
 return rows;
}
export function saveCaptionFixtures(renderer,locale='en'){return saveCaptionRows().map(({name,roll,characterName})=>({name,html:renderer.render('RollCard',{roll,characterName},locale)}));}
