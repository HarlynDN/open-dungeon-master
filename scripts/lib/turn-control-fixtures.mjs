import {openCombatRenderer} from './combat-ui-fixtures.mjs';
const url=code=>'data:text/javascript;base64,'+Buffer.from(code).toString('base64');
export const turnControlFiles=['FloorBanners','LeadFloorControl','HaltedTurnBanner','FightSummaryCard','CharacterMenu','HandPips','HandTutorial'].map(name=>`src/app/campaigns/[campaignId]/${name}.tsx`);
export function openTurnControlRenderer(options={}) {
  // Render closed Radix menu content so every permission branch is reviewed;
  // actual handlers/permissions come from the production CharacterMenu.
  const menu=url(`export const Root=({children})=>children,Trigger=Root,Portal=Root,Content=Root,Item=Root,Separator=()=>null;`);
  return openCombatRenderer({...options,files:turnControlFiles,stubs:{
    '@radix-ui/react-dropdown-menu':menu,
    '@/app/campaigns/[campaignId]/ReportDialog':url('export const ReportDialog=()=>null;'),
  }});
}
export const hero={id:'hero',campaignId:'campaign-id',userId:'u',name:'Goblin',isCompanion:false};
export const ally={...hero,id:'ally',userId:'v',name:'阿明'};
export const encounter={id:'fight',round:2,orderReady:true,order:[
  {kind:'pc',id:'hero',name:'Goblin',hidden:false},
  {kind:'enemy',id:'enemy-id',name:'Goblin 2',hidden:false},
  {kind:'pc',id:'hero',name:'Goblin',reflex:true,hidden:false},
],turnIndex:2,acting:{id:'hero',name:'Goblin'},enemies:[{id:'enemy-id',name:'Goblin 2'}],enemyTurns:true};
export const initiative={mode:'initiative',round:2,userIds:['u'],currentName:'Goblin'};
export const spotlight={mode:'spotlight',userIds:['u','v'],respondedUserIds:['u'],prompt:'Authored question Goblin'};
export const summary={outcome:'victory',rounds:3,seconds:119,kills:1,fled:0,fighters:[
  {characterId:'hero',name:'Goblin',dealt:17,taken:2,healed:7,nat20s:1,nat1s:0},
  {characterId:'ally',name:'阿明',dealt:8,taken:4,healed:0,nat20s:0,nat1s:1},
],totals:{dealt:25,taken:6,healed:7,nat20s:1,nat1s:1}};
const noop=()=>{};
export function turnControlFixtures(renderer,locale='en') {
  const rows=[],add=(name,component,props,options)=>rows.push({name,html:renderer.render(component,props,locale,options)});
  const floorProps={campaignId:'campaign-id',floor:initiative,spotlighted:[hero,ally],heldSpotlightNames:['Goblin','阿明'],encounter,steersStory:true,meUserId:'u',onRelease:noop};
  for(const [name,floor,patch] of [
    ['initiative',initiative,{}],['fallback',initiative,{encounter:null}],['watching',initiative,{steersStory:false,meUserId:'v'}],
    ['spotlight',spotlight,{}],['unanswered',{...spotlight,respondedUserIds:[]},{}],
    ['spotlight-empty',spotlight,{spotlighted:[]}],['enemies',{mode:'hold',next:initiative},{}],
    ['held',{mode:'hold',next:spotlight},{}],['open',{mode:'open'},{}],
  ])add('floor/'+name,'FloorBanners',{...floorProps,floor,...patch});
  const floorFile=turnControlFiles[0];
  add('floor/refusal','FloorBanners',floorProps,{queues:{[floorFile]:[false,{data:{error:'Goblin 2 acts first: wait for its turn, then take yours.'},fallback:'turnUi.error.end'}]}});
  for(const floor of [initiative,{mode:'open'},{mode:'hold',next:spotlight},spotlight])add('lead/'+floor.mode,'LeadFloorControl',{campaignId:'campaign-id',floor,sheets:[hero,ally],encounter});
  add('lead/empty','LeadFloorControl',{campaignId:'campaign-id',floor:{mode:'open'},sheets:[]});
  add('lead/picked','LeadFloorControl',{campaignId:'campaign-id',floor:{mode:'open'},sheets:[hero,ally]},{queues:{[turnControlFiles[1]]:[false,'',['ally'],'Authored question']}});
  for(const canRetry of [true,false])add('halted/'+canRetry,'HaltedTurnBanner',{campaignId:'campaign-id',turnId:'turn-id',content:'The DM ran into a problem: Authored backend diagnostic Goblin',canRetry});
  for(const outcome of ['victory','enemies_fled','party_fled','party_defeated','truce','authored_result'])add('summary/'+outcome,'FightSummaryCard',{summary:{...summary,outcome},onDismiss:noop});
  add('summary/no-damage','FightSummaryCard',{summary:{...summary,fighters:[]},onDismiss:noop});
  add('pips','HandPips',{pips:[{label:'Action',used:false},{label:'Bonus',used:true},{label:'Reaction',used:false}],flurryStrikes:2});
  add('pips/authored','HandPips',{pips:[{label:'Authored Goblin budget',used:false}],flurryStrikes:0});
  add('tutorial','HandTutorial',{onDismiss:noop});
  const menuProps={sheet:hero,steersStory:true,leadUserId:'other',canTransferLead:true,onViewSheet:noop,onNotes:noop,onAdjust:noop,onMessage:noop,onTrade:noop,canModerate:true,canMute:true};
  for(const [name,patch] of [['all',{}],['muted',{muted:true}],['companion',{sheet:{...hero,isCompanion:true}}],['own',{steersStory:false,canTransferLead:false,canModerate:false,canMute:false,onMessage:undefined,onTrade:undefined}]])add('menu/'+name,'CharacterMenu',{...menuProps,...patch});
  return rows;
}
