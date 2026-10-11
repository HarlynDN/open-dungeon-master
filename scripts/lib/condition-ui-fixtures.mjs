import {CONDITION_EFFECTS} from '../../src/lib/srd/condition-effects.ts';
import {conditionStageRows,characterStageRows,enemyStageRows} from '../../src/lib/battlemap/view-stage.ts';

export const visibleNames=new Map([
  ['hero',{name:'Goblin',kind:'proper'}],
  ['ally',{name:'Aria',kind:'proper'}],
  ['enemy',{name:'Goblin 2',kind:'enemy'}],
]);
const nameOf=id=>visibleNames.get(id)?.name??null;
const presentationNameOf=id=>visibleNames.get(id)??null;
export function conditionFixtureRows() {
  const result=[];
  const add=(name,rows)=>rows.forEach((row,index)=>result.push({name:name+(rows.length>1?'/'+index:''),row}));
  const condition=(name,label,meta)=>add(name,conditionStageRows({id:'hero',conditions:[label],conditionMeta:{[label]:meta}},nameOf,presentationNameOf));
  for(const effect of CONDITION_EFFECTS)condition('effect/'+effect.id,effect.match[0],{rounds:3});
  for(const rounds of [1,3,9,10,11,600,610,4800,28800,30000])condition('duration/'+rounds,'poisoned',{rounds});
  condition('turn/own-start','stunned',{untilTurnOf:'hero'});
  condition('turn/enemy-start','stunned',{untilTurnOf:'enemy'});
  condition('turn/proper-start','stunned',{untilTurnOf:'ally'});
  condition('turn/hidden-start','stunned',{untilTurnOf:'hidden'});
  condition('turn/next-end','stunned',{untilTurnEndOf:'enemy'});
  condition('turn/current-end','stunned',{untilTurnEndOf:'enemy',turnBegun:true});
  condition('turn/own-end','stunned',{untilTurnEndOf:'hero'});
  condition('turn/hidden-end','stunned',{untilTurnEndOf:'hidden',turnBegun:true});
  condition('turn/priority','stunned',{rounds:3,untilTurnOf:'ally',untilTurnEndOf:'enemy',turnBegun:true});
  condition('source/enemy','frightened',{source:'enemy',saveEnds:{ability:'wis',dc:13},spell:'Fear'});
  condition('source/proper','charmed',{source:'hero',spell:'Charm Person'});
  condition('source/hidden','frightened',{source:'hidden',spell:'Fear'});
  for(const source of ['stable','knocked out','check'])condition('source/'+source,'unconscious',{source});
  condition('source/trigger','readied',{source:'Authored: Goblin opens the door <script>',spell:'Magic Missile'});
  condition('source/authored-spell','blessed',{spell:'Authored Magic <script>'});
  for(const label of ['Authored condition <script>','blessed by Authored','absorb elements (fire)','absorbed strike (2d6 cold)','hexed (strength)'])condition('label/'+label,label,undefined);
  for(const level of [1,2,3,4,5,6])add('special/exhaustion-'+level,characterStageRows({id:'hero',conditions:[],currentHp:10,exhaustion:level},nameOf,presentationNameOf));
  add('special/concentration',characterStageRows({id:'hero',conditions:[],currentHp:10,concentratingOn:'Hold Person'},nameOf,presentationNameOf));
  add('special/stable',characterStageRows({id:'hero',conditions:[],currentHp:0,deathSaves:{successes:3,failures:1,stable:true}},nameOf,presentationNameOf));
  add('special/dying',characterStageRows({id:'hero',conditions:[],currentHp:0,deathSaves:{successes:1,failures:2}},nameOf,presentationNameOf));
  for(const source of ['knocked out','regenerating'])for(const stopped of [false,true])add('special/'+source+'/'+stopped,enemyStageRows({id:'enemy',conditions:['unconscious',...(stopped?['regeneration stopped']:[])],currentHp:0,conditionMeta:{unconscious:{source}}},nameOf,presentationNameOf));
  result.push({name:'special/silence',row:{id:'deafened',label:'Deafened (Silence)',note:'no sound inside: no spell with a verbal component, immune to thunder damage',presentation:{kind:'silence',spell:'Silence'}}});
  return result;
}
export function conditionUiFixtures(renderer,locale='en') {
  return conditionFixtureRows().map(({name,row})=>({name,html:renderer.render('ConditionChip',row,locale)}));
}
