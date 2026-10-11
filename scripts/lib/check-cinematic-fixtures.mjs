import {BASE_ROLL} from './roll-presentation-fixtures.mjs';
const file='src/app/campaigns/[campaignId]/CinematicParts.tsx';
export const CINE_SHEETS=[{id:'pc',userId:'u',name:'Goblin, vs 米拉_2',class:'Fighter',race:'Human',level:2,currentHp:7,maxHp:12,conditions:[],inventory:[],isCompanion:false}];
export const CINE_ENCOUNTER={status:'active',orderReady:true,round:2,turnIndex:0,order:[{id:'e',kind:'enemy',name:'Goblin 2',initiative:15},{id:'pc',kind:'pc',name:CINE_SHEETS[0].name,initiative:10},{id:'e2',kind:'enemy',name:'Goblin 3',hidden:true,reflex:true,initiative:5}],enemies:[{id:'e',name:'Goblin 2',type:'humanoid',cr:0.25}],acting:{id:'e'}};
export const checkRows=()=>[
 {kind:'group',detail:'Goblin: group stealth check',presentation:{kind:'check',term:{kind:'skill',key:'stealth'},owner:{name:'Goblin',kind:'proper'},context:{kind:'group'}}},
 {kind:'contest',detail:'Goblin 2: Perception (contest)',presentation:{kind:'check',term:{kind:'skill',key:'perception'},owner:{name:'Goblin 2',kind:'enemy'},context:{kind:'contest'}}},
 {kind:'hide',detail:'Goblin: Stealth to hide: stealth',presentation:{kind:'check',term:{kind:'skill',key:'stealth'},owner:{name:'Goblin',kind:'proper'},context:{kind:'hide'}}},
 {kind:'shove',detail:'Goblin: Athletics to shove Goblin 2: athletics',presentation:{kind:'check',term:{kind:'skill',key:'athletics'},owner:{name:'Goblin',kind:'proper'},context:{kind:'shove',target:{name:'Goblin 2',kind:'enemy'}}}},
 {kind:'authored',detail:'Authored <title>: perception',presentation:{kind:'check',term:{kind:'skill',key:'perception'},context:{kind:'authored',text:'Authored <title>'}}},
];
export function checkCinematicFixtures(renderer,locale='en'){
 const rows=[];const add=(name,component,props,options)=>rows.push({name,html:renderer.render(component,props,locale,options)});
 for(const row of checkRows())add('check/'+row.kind,'RollCard',{roll:{...BASE_ROLL,...row,kind:'skill_check'},characterName:'Goblin'});
 add('backdrop','SceneBackdrop',{messages:[],cover:null,genre:'fantasy',seed:'fixture'});
 add('ribbon','InitiativeRibbon',{encounter:CINE_ENCOUNTER,sheets:CINE_SHEETS,genre:'fantasy'});
 add('ribbon/wait','InitiativeRibbon',{encounter:{...CINE_ENCOUNTER,orderReady:false},sheets:[],genre:null});
 add('party','PartyRail',{sheets:CINE_SHEETS,meUserId:'u',encounter:CINE_ENCOUNTER,genre:'fantasy'});
 add('party/empty','PartyRail',{sheets:[],meUserId:'u',encounter:null,genre:null});
 add('quest','QuestGlance',{quests:['Goblin: Authored quest <script>'],onOpen:()=>{}});
 add('quest/empty','QuestGlance',{quests:[],onOpen:()=>{}});
 add('order','TabletopOrder',{encounter:CINE_ENCOUNTER,faceOf:()=>[],children:'Authored child'});
 add('order/wait','TabletopOrder',{encounter:null,faceOf:()=>[]});
 const base={campaignId:'c',messages:[],rolls:[],sheets:CINE_SHEETS,members:[{userId:'u',username:'Mira'}],isDm:false,steersStory:true,kind:'do',onKindChange:()=>{},input:'挥剑',setInput:()=>{},sending:false,inputBlocked:false,placeholder:'Authored placeholder',onSubmit:()=>{}};
 add('chronicle/empty','TabletopChronicle',base);
 add('chronicle/dm','TabletopChronicle',{...base,isDm:true,inputBlocked:true,sending:true});
 add('chronicle/no-composer','TabletopChronicle',{...base,composer:false});
 const messages=[{id:'dm',authorType:'dm',content:'第一段。 [roll:00000000-0000-0000-0000-000000000001] 后续正文。'},{id:'player',authorType:'player',characterId:'pc',content:'自定义台词'},{id:'unknown',authorType:'player',content:'未知人物台词'},{id:'system',authorType:'system',content:'Authored system prose'}];
 for(const [name,patch]of [['plain',{}],['attack',{kind:'attack',detail:'Longsword vs Goblin 2',success:true,attacker:{kind:'sheet',id:'pc',name:'Mira'},presentation:{kind:'against',what:'Longsword',target:{name:'Goblin 2',kind:'enemy'}}}],['fail',{kind:'attack',success:false}],['nat20',{breakdown:{...BASE_ROLL.breakdown,crit:'nat20'}}],['nat1',{breakdown:{...BASE_ROLL.breakdown,crit:'nat1'}}],['secret',{visibility:'secret'}]]){
  const roll={...BASE_ROLL,...patch,id:'00000000-0000-0000-0000-000000000001'};
  add('toast/'+name,'RollToast',{latestRoll:{roll,seq:2},sheets:CINE_SHEETS},{queues:{[file]:[{roll,seq:2},2]}});
  add('chronicle/'+name,'TabletopChronicle',{...base,messages,rolls:[roll]});
 }
 add('toast/initial','RollToast',{latestRoll:{roll:BASE_ROLL,seq:1},sheets:CINE_SHEETS});
 return rows;
}
