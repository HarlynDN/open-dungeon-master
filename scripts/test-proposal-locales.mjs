// New approval/trade presentation and transport contracts only; no live model.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {proposalSummary}=await import('../src/lib/dm/proposal-logic.ts');
const {proposalSummaryDetail}=await import('../src/lib/dm/proposal-summary.ts');
const {publicItemProposal}=await import('../src/lib/dm/proposal-intercept.ts');
const {computeTrade,tradeSummary}=await import('../src/lib/dm/trade-logic.ts');
const {tradeFailureDetail}=await import('../src/lib/dm/trade-presentation.ts');
const {proposalSummaryText,tradeSummaryText,proposalErrorText}=await import('../src/lib/i18n/proposal-presentations.ts');
const who='Mira to Someone: [v2] for 3';
const rows=[['grant_item',{name:'Longsword',qty:2}],['remove_item',{name:'Rope',qty:1}],['modify_gold',{delta:7}],['modify_gold',{delta:-2}],['purchase',{item:'Longsword',price:15,qty:2,action:'buy'}],['purchase',{item:'Rope',price:1,action:'sell'}],
 ['apply_damage',{amount:7,type:'fire'}],['apply_damage',{amount:3}],['heal',{amount:8}],['heal',{spell:'Cure Wounds'}],['heal',{spell:'Cure Wounds',amount:5}],['heal',{amount:4,temp:true}],['set_condition',{condition:'poisoned',rounds:3}],['set_condition',{condition:'prone',rounds:1}],['set_condition',{condition:'prone'}],['clear_condition',{condition:'poisoned'}]];
let proposal;
for(const [toolName,args]of rows){const summary=proposalSummary(toolName,args,who),summaryDetail=proposalSummaryDetail(toolName,args,summary);assert(summaryDetail);assert.equal(summaryDetail.characterName,who);const input={toolName,summary,summaryDetail},before=structuredClone(input);const zh=proposalSummaryText(input,'zh-CN');assert.notEqual(zh,summary);assert(zh.includes(who));assert.equal(proposalSummaryText(input,'en'),summary);assert.deepEqual(input,before);proposal??=input;}
assert.equal(proposalSummaryDetail('grant_item',{name:'{{odm-proposal-actor}}'},proposalSummary('grant_item',{name:'{{odm-proposal-actor}}'},who)),null);
assert.equal(proposalSummaryDetail('grant_item',{name:'Longsword'},'Authored offer.'),null);
assert.equal(proposalSummaryDetail('purchase',{item:'Longsword',price:1e300,qty:1e300,action:'buy'},'Authored offer.'),null);
const authoredArgs={name:'Authored token to Aria',qty:2},authoredSummary=proposalSummary('grant_item',authoredArgs,who);
assert(proposalSummaryText({toolName:'grant_item',summary:authoredSummary,summaryDetail:proposalSummaryDetail('grant_item',authoredArgs,authoredSummary)},'zh-CN').includes(authoredArgs.name));
for(const bad of [undefined,{...proposal.summaryDetail,english:'stale'},{...proposal.summaryDetail,args:{name:'Longsword',qty:9}},{...proposal.summaryDetail,characterName:'Someone else'},{...proposal.summaryDetail,version:2}])assert.equal(proposalSummaryText({...proposal,summaryDetail:bad},'zh-CN'),proposal.summary);
const record={id:'p1',campaignId:'c1',turnId:'t1',characterId:'s1',userId:'u1',toolName:proposal.toolName,argsJson:JSON.stringify({...proposal.summaryDetail.args,characterId:'s1',privateDiagnostic:'private'}),summary:proposal.summary,reason:'Authored reason.',status:'pending',seq:1,createdAt:'2026-10-12T00:00:00Z',resolvedAt:null,toCharacterId:''};
const snapshot=structuredClone(record),publicView=publicItemProposal(record);assert(publicView.summaryDetail);assert(!JSON.stringify(publicView).includes('private'));assert(!('argsJson' in publicView));assert.equal(publicView.summary,record.summary);assert.deepEqual(record,snapshot);assert(!publicItemProposal({...record,argsJson:'bad JSON'}).summaryDetail);
const me={id:'s1',campaignId:'c1',userId:'u1',name:'Mira',gold:10,copper:0,equipment:[{name:'Longsword',qty:2}]};
const them={id:'s2',campaignId:'c1',userId:'u2',name:'Aria',gold:10,copper:0,equipment:[{name:'Rope',qty:2}]};
const offer={toCharacterId:them.id,give:[{name:'Longsword',qty:2}],giveCp:135,want:[{name:'Rope',qty:1}],wantCp:200};
const tradeRaw=tradeSummary(offer,me.name,them.name),offerBefore=structuredClone(offer),tradeZh=tradeSummaryText(tradeRaw,offer,me.name,them.name,'zh-CN');assert(tradeZh.includes('长剑 ×2'));assert(tradeZh.includes('1 金币 3 银币 5 铜币'));assert.equal(tradeSummaryText(tradeRaw,offer,me.name,them.name,'en'),tradeRaw);assert.equal(tradeSummaryText(tradeRaw,offer,'Renamed player',them.name,'zh-CN'),tradeRaw);assert.deepEqual(offer,offerBefore);
for(const failed of [{...offer,want:[],wantCp:0,giveCp:0},{...offer,give:[],giveCp:0,wantCp:0},{...offer,give:[],want:[],wantCp:0},{...offer,give:[],want:[],giveCp:0}]){
 const emptyMe={...me,equipment:[],gold:0},emptyThem={...them,equipment:[],gold:0};const computed=computeTrade(emptyMe,emptyThem,failed);assert('error' in computed);const detail=tradeFailureDetail(computed.error,failed,me.name,them.name);assert(detail);assert.notEqual(proposalErrorText(computed.error,'zh-CN',detail),computed.error);assert.equal(proposalErrorText(computed.error,'en',detail),computed.error);assert(!proposalErrorText('The trade could not go through: '+computed.error,'zh-CN',detail).includes('no longer'));assert.equal(proposalErrorText(computed.error,'zh-CN',{...detail,who:'Stale name'}),computed.error);
}
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const files=['src/app/campaigns/[campaignId]/ItemProposalBar.tsx','src/app/campaigns/[campaignId]/TradeDialog.tsx'];
const stubs={'@/components/ui/Dialog':url('export const Dialog=({children})=>children;')};
const renderer=await openCombatRenderer({files,stubs});
const tradeProposal={...publicView,id:'trade1',toolName:'trade',summary:tradeRaw,toCharacterId:them.id,offer,summaryDetail:undefined};
const base={campaignId:'c1',proposals:[publicView],sheets:[me,them],meUserId:'u1',steersStory:false};
const cases=[['owner','ItemProposalBar',base],['lead','ItemProposalBar',{...base,meUserId:'lead',steersStory:true}],['viewer','ItemProposalBar',{...base,meUserId:'u3'}],['trade-proposer','ItemProposalBar',{...base,proposals:[tradeProposal]}],['trade-counterparty','ItemProposalBar',{...base,proposals:[tradeProposal],meUserId:'u2'}],['trade-dialog','TradeDialog',{campaignId:'c1',me,them,onClose:()=>{}}]];
const frozenFile=new URL('./fixtures/proposal-en.json',import.meta.url);
const hashes=JSON.parse(fs.readFileSync(frozenFile,'utf8')).sha256;for(const [label,name,props]of cases)assert.equal(createHash('sha256').update(renderer.render(name,props,'en')).digest('hex'),hashes[label],'English '+label);
const hasLabel=(children,label)=>Array.isArray(children)?children.includes(label):children===label;
const originalFetch=globalThis.fetch,calls=[];
try{
 globalThis.fetch=async(path,init)=>{calls.push({path,body:JSON.parse(init.body)});return{ok:true,json:async()=>({})};};
 for(const [props,label,action]of [[base,'接受','approve'],[base,'拒绝','decline'],[{...base,proposals:[tradeProposal]},'撤回','cancel']]){const html=renderer.render('ItemProposalBar',props,'zh-CN');assert(html.includes('长剑'));await renderer.elements().find(e=>hasLabel(e.props.children,label)&&e.props.onClick).props.onClick();assert.deepEqual(calls.at(-1).body,{action});}
 const picked={queues:{[files[1]]:[{Longsword:2},{Rope:1},1,2,false,null]}};const html=renderer.render('TradeDialog',cases[5][2],'zh-CN',picked);assert(html.includes('长剑'));assert(html.includes('从对方背包中选择'));renderer.elements().find(e=>e.props.label==='长剑的数量'&&e.props.onChange).props.onChange(1);assert(renderer.updates().some(update=>update.value?.Longsword===1));
 renderer.elements().find(e=>e.type==='button'&&Array.isArray(e.props.children)&&e.props.children.includes('提出交易')).props.onClick();await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(calls.at(-1).body,{toCharacterId:'s2',give:[{name:'Longsword',qty:2}],giveCp:100,want:[{name:'Rope',qty:1}],wantCp:200});
 globalThis.fetch=async()=>{throw new Error('test offline');};renderer.render('ItemProposalBar',base,'zh-CN');await renderer.elements().find(e=>hasLabel(e.props.children,'接受')&&e.props.onClick).props.onClick();assert(renderer.updates().some(update=>update.value?.text==='Could not reach the server.'));assert(renderer.updates().some(update=>update.value===''));
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: 16 native offer branches, source-bound metadata/privacy, four real trade refusals, six unchanged English JSX renders, Chinese canonical approve/decline/withdraw/trade requests and network fallback.');
