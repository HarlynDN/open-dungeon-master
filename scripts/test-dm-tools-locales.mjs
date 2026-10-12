// One grouped DM-tool check: localized metadata/readouts, CJK candidates and wire callbacks.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {register} from 'node:module';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
register('./lib/register-alias.mjs',import.meta.url);
const {ADJUDICATIONS}=await import('../src/lib/dm/invoke-catalog.ts');
const {DM_ACTION_METADATA}=await import('../src/lib/i18n/dm-action-metadata.ts');
const {DM_ACTION_MESSAGES}=await import('../src/lib/i18n/dm-action-messages.ts');
const {DM_ACTION_KEYWORDS}=await import('../src/lib/i18n/dm-action-keywords.ts');
const {dmActionView,dmActionSource}=await import('../src/lib/i18n/dm-action-presentations.ts');
const {rankAdjudications}=await import('../src/lib/dm/assist-logic.ts');
const {dmToolsText}=await import('../src/lib/i18n/dm-tools-presentations.ts');
const {workbench}=await import('../src/lib/dm/encounter-workbench.ts');
assert.equal(DM_ACTION_METADATA.length,ADJUDICATIONS.length);
for(const entry of ADJUDICATIONS){const source=dmActionSource(entry);assert(source,entry.name);assert.deepEqual(dmActionView(entry,'en'),entry);assert.equal(dmActionView(entry,'zh-CN').name,entry.name);assert.notEqual(dmActionView(entry,'zh-CN').label,entry.label);}
const changed={...ADJUDICATIONS[0],label:'Authored action'};assert.equal(dmActionView(changed,'zh-CN'),changed);
const localizedText=entry=>{const source=dmActionSource(entry);return source?[{label:DM_ACTION_MESSAGES['zh-CN'][source.labelKey],summary:DM_ACTION_MESSAGES['zh-CN'][source.summaryKey],keywords:DM_ACTION_KEYWORDS['zh-CN'][entry.name]}]:[];};
for(const [intent,wanted]of [['我用剑攻击敌人','pc_attack'],['我要治疗受伤的角色','heal'],['我们进行长休','take_rest'],['我试着说服守卫让我们通过','social_check'],['我们开始战斗并掷先攻','start_encounter'],['我要调查房间寻找线索','request_roll']])assert(rankAdjudications(intent,ADJUDICATIONS,{inEncounter:true,localizedText}).some(row=>row.entry.name===wanted),intent);
const outOfFight=rankAdjudications('我挥剑攻击敌人',ADJUDICATIONS,{inEncounter:false,localizedText});assert(outOfFight.every(row=>!row.entry.needsEncounter));
for(const intent of ['I stab the guard','Can I sneak past the guard?','We make camp for the night'])assert.deepEqual(rankAdjudications(intent,ADJUDICATIONS,{inEncounter:true,localizedText}),rankAdjudications(intent,ADJUDICATIONS,{inEncounter:true}));
assert.equal(dmToolsText('The tables did not load. The server could not be reached.','zh-CN'),'随机表加载失败。无法连接服务器。');
assert.equal(dmToolsText('Unknown authored diagnostic {raw}','zh-CN'),'Unknown authored diagnostic {raw}');
const stats={ac:13,maxHp:30,dexMod:1,speed:'30',attacks:[{name:'Scimitar',toHit:4,damage:'1d6+2',type:'slashing'}],traits:[],resist:'',immune:'',cr:1,xp:200};
for(const levels of [[3,3,3,3],[3],[3,3,3,3,3,3]]){
 const readout=workbench({partyLevels:levels,roster:[{name:'Authored A',count:2,stats},{name:'Authored B',count:1,stats:{...stats,cr:.5,xp:100}}]}),before=JSON.stringify(readout);
 for(const part of [...readout.budget.parts,...readout.attrition.party.parts,...readout.attrition.monsters.parts]){
  assert.equal(dmToolsText(part.detail,'en'),part.detail);const zh=dmToolsText(part.detail,'zh-CN');if(/[A-Za-z]/.test(part.detail.replace(/x\d*|;| /g,'')))assert.notEqual(zh,part.detail,part.detail);assert(!/[A-Za-z]/.test(zh.replace(/Authored [AB]|CR|DC|XP|\d+d\d+|x\d+(?:\.\d+)?|\bx\b/g,'')),zh);
 }
 assert.notEqual(dmToolsText(readout.attrition.outcome,'zh-CN'),readout.attrition.outcome);for(const raw of readout.attrition.warnings)assert.notEqual(dmToolsText(raw,'zh-CN'),raw);assert.equal(JSON.stringify(readout),before);
}
const assist='src/app/campaigns/[campaignId]/DmAssistPanel.tsx',odds='src/app/campaigns/[campaignId]/DmOddsPanel.tsx',tables='src/app/campaigns/[campaignId]/DmTablesPanel.tsx';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const r=await openCombatRenderer({files:[assist,odds,tables],sourceOf:file=>{const s=fs.readFileSync(file,"utf8");return s+(file===assist?'\nexport {IntentSuggest};':'');},stubs:{
 '@/app/campaigns/[campaignId]/DmActionForm':url('export const DmActionForm=()=>null;'),
 '@/app/workshop/tables/RefPicker':url('export const RefPicker=()=>null;'),
 '@/app/workshop/tables/StatblockFinder':url('export const inputClass="";export const StatblockFinder=()=>null;'),
 '@/app/workshop/tables/TableRows':url('export const TableRows=()=>null;'),
 '@/lib/use-capabilities':url('export const useCapabilities=()=>null;export const offersStoryModel=()=>false;'),
}});

let html=r.render('OddsCalculator',{variantRules:{powerfulCritical:false,criticalDamageMods:false}},'zh-CN');assert(html.includes('命中概率')&&html.includes('护甲等级'));
r.elements().find(e=>e.props.options&&e.props.label==='掷骰方式').props.onChange('advantage');assert(r.updates().some(row=>row.at===3&&row.value==='advantage'));
const nativeTableText='Nothing. That result is not on the table.',table={id:'T1',name:'Authored table',entries:[{min:1,max:1,text:nativeTableText}],noReplacement:false,drawn:[]};
for(const missingResult of [false,true]){
 html=r.render('DmTablesPanel',{campaignId:'fixture',layout:'list'},'zh-CN',{queues:{[tables]:[[table],'','','','','',false,false,'',{tableId:'T1',total:1,text:nativeTableText,chain:[],remaining:null,missingResult}]}});
 assert(html.includes(missingResult?'该点数没有对应的随机表条目。':nativeTableText));
}
const originalFetch=globalThis.fetch;let called;
try{
 globalThis.fetch=async(path,options)=>{called={path,body:JSON.parse(options.body)};return {ok:true,json:async()=>({suggestions:[]})};};
 r.render('IntentSuggest',{campaignId:'fixture',sheets:[],encounter:null,intent:'我要调查房间',onIntentChange:()=>{}},'zh-CN');
 await r.elements().find(e=>e.props.title==='仅按关键词匹配操作目录，不调用模型。').props.onClick();
 assert.deepEqual(called,{path:'/api/campaigns/fixture/dm/assist/suggest',body:{intent:'我要调查房间',useModel:false}});
 globalThis.fetch=async(path,options)=>{called={path,body:JSON.parse(options.body)};return {ok:true,json:async()=>({total:1})};};
 r.render('DmTablesPanel',{campaignId:'fixture',layout:'list'},'zh-CN',{queues:{[tables]:[[table],'','','','','',false,false,'',null]}});
 await r.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false&&e.props.onClick&&e.props.children==='掷骰').props.onClick();
 assert.deepEqual(called,{path:'/api/campaigns/fixture/dm/roll-tables/T1/roll',body:{visibility:'dm'}});assert(r.updates().some(row=>row.at===9&&row.value?.missingResult===true));
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: 99 source-bound action captions, 6 Chinese intent paths with encounter gating/English ranking parity, 3 real workbench readouts preserving numbers/source names, native odds/suggestion/private-roll callbacks and authored-vs-missing table results. Mock transport only.');
