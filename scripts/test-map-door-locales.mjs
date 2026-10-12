// Only the corrected door display contract: no animation or map/door engine mutation.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const r=await openCombatRenderer({files:['src/app/campaigns/[campaignId]/BattleMapGrid.tsx'],stubs:{'@/app/campaigns/[campaignId]/BoardFx':url('export const FxLayer=()=>null;export const useFxPlayer=()=>[];'),'@/components/ParticleCanvas':url('export const ParticleCanvas=()=>null;')}});
const {DOOR_STATES}=await import('../src/lib/battlemap/scene.ts');
assert.deepEqual(DOOR_STATES,['locked','secret']);
const doors=Object.fromEntries(DOOR_STATES.map((state,i)=>[`${i},0`,state]));
const view={mapId:'map',board:'scene',theme:'field',width:2,height:2,terrain:'....',visible:[0,1,2,3],explored:[0,1,2,3],reachable:[],tokens:[],currentTurnName:'',tokenFootprint:{},tokenHealth:{},tokenConditions:{},tokenElevation:{},tokenAuras:{},targets:[],drawings:[],labels:[],lights:[],spellZones:[],doors};
let html=r.render('BattleMapGrid',{view,sheets:[]},'zh-CN');assert(html.includes('门已上锁')&&html.includes('暗门'));assert(r.elements().some(e=>e.type==='text'&&e.props.children==='锁')&&r.elements().some(e=>e.type==='text'&&e.props.children==='暗'));assert(!html.includes('卡住'));
r.render('BattleMapGrid',{view,sheets:[]},'en');assert(r.elements().some(e=>e.type==='text'&&e.props.children==='L')&&r.elements().some(e=>e.type==='text'&&e.props.children==='S'));assert.deepEqual(doors,{'0,0':'locked','1,0':'secret'});
console.log('PASS: actual locked/secret door states show 锁/暗 and unchanged English L/S; stored door values preserved (display only).');
