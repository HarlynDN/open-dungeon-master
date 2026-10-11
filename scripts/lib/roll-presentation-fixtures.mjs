export const BASE_ROLL = {id:'r',campaignId:'c',characterId:'pc',requestedBy:'dm',kind:'damage',detail:'Fireball on Goblin 2, Goblin',expression:'1d6',advantage:'none',dc:null,total:3,success:null,breakdown:{expression:'1d6',total:3,terms:[{kind:'dice',sign:1,count:1,sides:6,dice:[{sides:6,value:3,kept:true}],subtotal:3}]},visibility:'public',messageId:null,targetEnemyId:null,applied:false,attacker:{kind:'sheet',id:'pc',name:'Mira'},createdAt:'2020-01-01T00:00:00Z'};
export function rollPresentationRows(){
 const enemy={name:'Goblin 2',kind:'enemy'},proper={name:'Goblin',kind:'proper'};
 const rows=[];const add=(name,patch)=>rows.push({name,roll:{...BASE_ROLL,...patch},characterName:'Goblin'});
 for(const [name,target]of [['enemy',enemy],['proper',proper],['authored',{name:'Goblin King Gruk',kind:'enemy'}],['punctuation',{name:'Goblin, vs Mira <script>_2',kind:'proper'}]])add('target/'+name,{detail:'Longsword vs '+target.name,presentation:{kind:'against',what:'Longsword',target}});
 for(const what of ['Longsword +1','Longsword (opportunity attack)','Acid Arrow (half on a miss)','Acid Arrow (second burn)','Bite','Claw','Bite (CRIT)','Authored attack <script>'])add('action/'+what,{detail:what+' vs Goblin 2',presentation:{kind:'against',what,target:enemy}});
 for(const [name,what,targets,damageType]of [['mixed','Fireball',[enemy,proper]],['empty','Fireball',[]],['typed','Fireball',[enemy],'fire'],['unnamed','area effect',[enemy],'fire'],['comma','Fireball',[{name:'Goblin, Goblin 2',kind:'proper'},enemy]],['authored','Authored area <script>',[proper],'Authored type']])add('area/'+name,{detail:what+(damageType?' ('+damageType+')':'')+(targets.length?' on '+targets.map(t=>t.name).join(', '):''),presentation:{kind:'area',what,targets,...(damageType?{damageType}:{})}});
 add('area/hidden-caster',{detail:'Fireball on Goblin',attacker:{kind:'enemy',id:'e',name:'Someone unseen'},presentation:{kind:'area',what:'Fireball',targets:[proper],actorUnseen:true}});
 const notes=['exhaustion 3: disadvantage on saving throws','blessed: +1d4 to the save','baned: -1d4 to the save','Beacon of Hope: advantage','Diehard: advantage','Lucky: a natural 1 on the d20 is rerolled once','Lucky: a luck point buys an extra d20, the best kept','spends their Inspiration: advantage',"Goblin's aura (within 10 ft): +3 on saving throws",'Authored effect: +1d4 to the save'];
 for(const [name,notesUsed]of [['plain',[]],['notes',notes]])add('death/'+name,{kind:'saving_throw',detail:'death save'+(notesUsed.length?' ('+notesUsed.join('; ')+')':''),attacker:null,dc:10,success:true,presentation:{kind:'death-save',notes:notesUsed}});
 add('death/recovery',{kind:'custom',detail:'hours until Goblin regains 1 hit point (1d4)',attacker:null,presentation:{kind:'stable-recovery',name:'Goblin'}});
 add('blind',{hidden:true,dc:null,total:null,success:null,breakdown:null,presentation:{kind:'area',what:'Fireball',targets:[enemy]}});
 add('legacy',{detail:'Longsword vs Goblin'});
 add('custom',{kind:'custom',detail:'Authored {detail} <script>',attacker:null});
 return rows;
}
export function rollPresentationFixtures(renderer,locale='en'){
 return rollPresentationRows().map(({name,roll,characterName})=>({name,html:renderer.render('RollCard',{roll,characterName},locale)}));
}
