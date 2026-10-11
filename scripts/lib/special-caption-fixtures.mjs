import {BASE_ROLL} from './roll-presentation-fixtures.mjs';
export function specialCaptionRows(){
 const enemy={name:'Goblin 2',kind:'enemy'},proper={name:'Goblin, vs 米拉_2',kind:'proper'};
 const specs=[
 ['named','Overchannel',{kind:'named',name:'Overchannel'}],
 ['heal','Second Wind (1d10+2)',{kind:'healing',name:'Second Wind',dice:'1d10+2'}],
 ['heal-target','Cure Wounds on Goblin, vs 米拉_2 (1d8+3)',{kind:'healing-target',name:'Cure Wounds',target:proper,dice:'1d8+3'}],
 ['temp','False Life: temporary hit points',{kind:'temporary-hp',name:'False Life'}],
 ['max',"Heroes' Feast: Goblin, vs 米拉_2's hit point maximum",{kind:'hp-max',name:"Heroes' Feast",target:proper}],
 ['pool','Sleep: hit points it can affect',{kind:'hp-pool',name:'Sleep'}],
 ['hours','Potion of Gaseous Form: hours it lasts',{kind:'item-hours',name:'Potion of Gaseous Form'}],
 ['poison',"Assassin's Blood: it was poison",{kind:'poison-damage',name:"Assassin's Blood"}],
 ['charges','Wand of Fireballs: charges it holds',{kind:'charges',name:'Wand of Fireballs'}],
 ['last','Wand of Fireballs: the last charge',{kind:'last-charge',name:'Wand of Fireballs'}],
 ['dawn','Wand of Fireballs regains charges at dawn',{kind:'dawn-charges',name:'Wand of Fireballs'}],
 ['ray','Prismatic Spray: the ray that strikes Goblin 2',{kind:'ray',target:enemy}],
 ['ray-proper','Prismatic Spray: the ray that strikes Goblin, vs 米拉_2',{kind:'ray',target:proper}],
 ['npc','Reaction roll for Goblin, vs 米拉_2',{kind:'npc-reaction',target:proper}],
 ['kit',"Healer: a healer's kit use on Goblin, vs 米拉_2 (1d6 + 4 + 2 Hit Dice)",{kind:'healer-kit',target:proper,hitDice:2}],
 ['rest','short rest: 1 hit die',{kind:'short-rest',count:1}],
 ['rest-extras','short rest: 2 hit dice + Song of Rest d6 + Chef d8',{kind:'short-rest',count:2,songDie:'d6',chefDie:'d8'}],
 ['mirror','Mirror Image (8 or higher turns the attack)',{kind:'mirror',threshold:8}],
 ['blink','Blink (11 or higher: to the Ethereal Plane)',{kind:'blink'}],
 ['intervention','Divine Intervention (at or under 10)',{kind:'intervention',level:10}],
 ['gold','Treasure: gold (2d6 × 10)',{kind:'treasure',dice:'2d6',multiplier:10}],
 ['onset','Sight Rot: days until symptoms',{kind:'affliction-onset',name:'Sight Rot',unit:'days'}],
 ['onset-authored','Fireball: hours until symptoms',{kind:'affliction-onset',name:'Fireball',unit:'hours',literalName:true}],
 ...['short','long','indefinite'].map(term=>['madness-'+term,term+'-term madness',{kind:'madness',term}]),
 ...[['madness-blind','blinded on a 1, deafened otherwise'],['madness-minutes','minutes of short-term madness'],['madness-hours','tens of hours of long-term madness'],['fever-dc',"cackle fever's DC drops"],['fever-damage',"cackle fever's mad laughter"],['confusion','Confusion'],['recharge','recharge']].map(([kind,detail])=>[kind,detail,{kind}]),
 ['literal','Fireball: healing',{kind:'healing',name:'Fireball',literalName:true}],
 ];
 const rows=specs.map(([name,detail,context])=>({name,roll:{...BASE_ROLL,attacker:null,kind:'custom',detail,presentation:{kind:'special',context}},characterName:proper.name}));
 const checks=[['stabilize',{kind:'stabilize',target:proper},'medicine','skill','medicine, to stabilize Goblin, vs 米拉_2'],['recuperation',{kind:'recuperation'}],['half-water',{kind:'half-water'}],['madness-save',{kind:'madness-save'}],['madness-confusion',{kind:'madness-confusion'},'wis'],['fever-laughter',{kind:'fever-laughter'}],['rest-save',{kind:'after-rest',name:'Cackle Fever'}],['midnight',{kind:'at-midnight',name:'Midnight Tears'}],['daily',{kind:'daily',name:'Pale Tincture'}],['scroll',{kind:'scroll-reading',name:'Fireball'},'int','ability'],['round',{kind:'poison-round',name:'Burnt Othur Fumes',round:2}],...['forced-march','heat','cold'].map(activity=>[activity,{kind:'hourly-endurance',activity,hour:9}]),['escape',{kind:'escape-spell',name:'Web'},'strength_or_dexterity','ability']];
 for(const [name,context,key='con',kind='ability',detail='Goblin 2: CON save'] of checks) rows.push({name,roll:{...BASE_ROLL,kind:'saving_throw',attacker:null,detail,presentation:{kind:'check',term:{kind,key},context,owner:enemy}},characterName:proper.name});
 const owned={...rows.find(row=>row.name==='confusion').roll,characterId:null,visibility:'dm',detail:'Goblin 2: Confusion',presentation:{kind:'special',context:{kind:'confusion'},owner:enemy}};
 rows.push({name:'enemy',roll:owned},{name:'blind',roll:{...owned,hidden:true,total:null,dc:null,success:null,breakdown:null}});
 rows.push({name:'legacy',roll:{...BASE_ROLL,kind:'custom',attacker:null,detail:'Authored Fireball 3 & <script>'}});
 return rows;
}
export function specialCaptionFixtures(renderer,locale='en'){return specialCaptionRows().map(({name,roll,characterName})=>({name,html:renderer.render('RollCard',{roll,characterName},locale)}));}
