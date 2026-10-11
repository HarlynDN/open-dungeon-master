// Focused display and mocked interaction checks; no live campaign or sharing.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {leadRenderer,leadCases,leadFile,seatProps,inviteProps,panelProps} from './lib/lead-ui-fixtures.mjs';
const r=await leadRenderer();
const {leadErrorText}=await import('../src/lib/i18n/lead-presentations.ts');
const {buildShareLinks}=await import('../src/lib/share-link.ts');
const golden=JSON.parse(fs.readFileSync(new URL('./fixtures/lead-ui-en.json',import.meta.url),'utf8')).sha256;
const q=v=>({queues:{[leadFile]:v}}), tick=()=>new Promise(resolve=>setImmediate(resolve));
for(const row of leadCases())assert.equal(createHash('sha256').update(r.render(row.component,row.props,'en',row.options)).digest('hex'),golden[row.name],row.name+' English');
let html=r.render('LeadPanel',panelProps,'zh-CN');
assert(html.includes('邀请')&&html.includes('战役资料')&&html.includes('Authored campaign')&&html.includes('A1B2C3'));
html=r.render('LeadSeatCard',seatProps,'zh-CN');
assert(html.includes('用户 {literal}')&&html.includes('阿明')&&!html.includes('Authored lead')&&!html.includes('Authored DM')&&!html.includes('Authored companion'));
for(const locale of ['en','zh-CN']){
 const source='That user is not in this campaign.';
 html=r.render('LeadSeatCard',seatProps,locale,q(['',source]));
 assert(html.includes(leadErrorText(source,locale)));
}
assert.equal(leadErrorText('Authored refusal {raw}.','zh-CN'),'Authored refusal {raw}.');
for(const source of ['That change was not saved.','The lead did not change.','Could not reach the table.','Only the party lead or the owner can transfer the lead.','Invalid game settings.'])assert.notEqual(leadErrorText(source,'zh-CN'),source);
const human={...panelProps,campaign:{...panelProps.campaign,gameSettings:{dmMode:'human'}}};
html=r.render('LeadPanel',{...human,steersStory:false},'zh-CN');
assert(html.includes('邀请')&&html.includes('战役资料')&&html.includes('管理邀请')&&!html.includes('待批准的笔记')&&!html.includes('预备的战斗与地图'));
assert(!r.elements().some(e=>e.props.onChange&&e.props.label?.includes('中途加入')));
html=r.render('LeadPanel',{...human,isLead:false,canTransferLead:false},'zh-CN');
assert(html.includes('故事控制')&&html.includes('待批准的笔记')&&!html.includes('战役资料')&&!html.includes('邀请')&&!html.includes('引导故事'));
html=r.render('LeadPanel',{...human,steersStory:false},'en');assert(html.includes('You manage invites and campaign details.'));
const oldFetch=globalThis.fetch,calls=[];
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});return new Response('{}');};
const transfer=()=>r.elements().find(e=>e.props.onClick&&e.props.children==='设为队长').props.onClick();
try{
 r.render('LeadSeatCard',seatProps,'zh-CN',{confirmReplies:[false]});await transfer();assert.equal(calls.length,0);
 assert.equal(r.confirmations()[0].args?.[0]??r.confirmations()[0][0],'将用户 {literal}设为队长？转交后你将无法再使用此标签页。');
 r.render('LeadSeatCard',seatProps,'zh-CN',{confirmReplies:[true]});await transfer();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/lead',method:'POST',body:{userId:'next'}});
 r.render('InvitesCard',inviteProps,'zh-CN',q([false,false,'','https://example.test']));
 r.elements().find(e=>e.props.onChange&&e.props.label?.includes('中途加入')).props.onChange();await tick();
 assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/settings',method:'PATCH',body:{midGameJoinOpen:false}});
 for(const locale of ['en','zh-CN']){
  r.render('InvitesCard',inviteProps,locale,q([false,false,'','https://example.test']));
  await r.elements().find(e=>e.props.onClick&&e.props.title===(locale==='en'?'Copy the invite link':'复制邀请链接')).props.onClick();
  const links=buildShareLinks({publicOrigin:'https://example.test',inviteCode:'A1B2C3'});assert.equal(r.copies.at(-1),links.appUrl||links.joinUrl);
 }
 r.render('InvitesCard',inviteProps,'zh-CN');r.elements().find(e=>e.props.title==='显示邀请二维码与分享选项'&&e.props.onClick).props.onClick();assert(r.updates().some(u=>u.at===1&&u.value===true));
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: nine English lead-panel states, Chinese role labels and raw names, transfer cancellation/canonical requests, joining toggle and unchanged invite addresses (mock transport only).');
