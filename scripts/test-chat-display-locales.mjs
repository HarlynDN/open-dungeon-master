// Focused side-chat/media rendering and callbacks; no real messages or audio.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const files=['SideChatPanel','MessageContent','SpeechLine','Prose'].map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`),[chatFile,contentFile]=files;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64'),react=JSON.stringify(import.meta.resolve('react'));
const r=await openCombatRenderer({files,sourceOf:file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')+(file===chatFile?'\nexport {NewChatForm,ThreadView};':''),stubs:{
 '@/app/campaigns/[campaignId]/useChatChime':url('export const useChimeMuted=()=>false;export const setChimeMuted=()=>{};'),
 '@/app/campaigns/[campaignId]/RollCard':url(`import {createElement as h} from ${react};export const RollCard=({roll})=>h("span",{"data-roll-id":roll.id},"roll");`),
}});
const {speechSpeakerLabel,chatText}=await import('../src/lib/i18n/chat-presentations.ts');
const q=(file,values)=>({queues:{[file]:values}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
assert.equal(speechSpeakerLabel({kind:'narrator',id:'',name:'Dungeon Master'},'zh-CN'),'地下城主');
assert.equal(speechSpeakerLabel({kind:'npc',id:'n',name:'Narrator'},'zh-CN'),'Narrator');
assert.equal(chatText('Authored diagnostic {raw}.','zh-CN'),'Authored diagnostic {raw}.');
let html=r.render('MediaPlaceholder',{label:'自定图片标签',fallbackStartedAt:'2020-01-01T00:00:00Z',status:{state:'queued'}},'zh-CN',q(contentFile,[Date.parse('2020-01-01T00:01:00Z')]));assert(html.includes('正在等待生成队列')&&html.includes('1:00'));
html=r.render('MediaPlaceholder',{label:'Authored label',fallbackStartedAt:'2020-01-01T00:00:00Z',status:{state:'failed',reason:'Authored diagnostic'}},'zh-CN');assert(html.includes('插图生成失败')&&html.includes('Authored diagnostic'));
const serviceFailure={state:'failed',reason:'Could not reach ComfyUI at http://127.0.0.1:8188. Start ComfyUI and check the URL.'};
const originalFailure=JSON.stringify(serviceFailure);
for(const locale of ['en','zh-CN']){
 const display=r.render('MediaPlaceholder',{label:'label',fallbackStartedAt:'2020-01-01T00:00:00Z',status:serviceFailure},locale);
 assert(display.includes(locale==='en'?serviceFailure.reason:'暂时无法连接图像服务，请稍后重试。'));
 if(locale==='zh-CN')assert(!display.includes('Start ComfyUI'));
}
assert.equal(JSON.stringify(serviceFailure),originalFailure);
html=r.render('MediaPlaceholder',{label:'label',fallbackStartedAt:'2020-01-01T00:00:00Z',status:{state:'failed',reason:'Not found.'}},'zh-CN');assert(!html.includes('找不到该聊天'),'media errors must not acquire side-chat semantics');
const id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',roll={id,detail:'Canonical detail'};
html=r.render('DmContent',{content:`阿明说：“**原文**不应被改写。” [roll:${id}] 后续。`,rollsById:new Map([[id,roll]]),sheetsById:new Map(),cast:[]},'zh-CN');assert(html.includes('<strong')&&html.includes('原文')&&html.includes(`data-roll-id="${id}"`)&&html.includes('后续。'));
html=r.render('SpeechLine',{speaker:{kind:'pc',id:'pc',name:'𠮷明'},cast:[],children:'自定台词'},'zh-CN');assert(html.includes('𠮷明')&&html.includes('自定台词'));
const members=[{userId:'me',username:'本人'},{userId:'other',username:'自定 {成员}'},{userId:'third',username:'Authored third'}];
const thread={id:'thread',kind:'group',title:'自定 {群聊}',memberUserIds:['me','other','third'],lastSeq:0,unread:0};
html=r.render('SideChatPanel',{campaignId:'c',members,meUserId:'me',threads:[thread],refreshSideChat:async()=>{},openThreadRequest:null,onOpenHandled:()=>{}},'zh-CN');assert(html.includes('私聊')&&html.includes('自定 {群聊}')&&html.includes('AI DM'));
let created;const np={campaignId:'c',members:members.slice(1),onCreated:async id=>created=id,onCancel:()=>{}};
const message={id:'old',authorUserId:'other',content:'Authored private text',seq:1};
const tp={campaignId:'c',thread,label:thread.title,members,meUserId:'me',refreshSideChat:async()=>{},onBack:()=>{}};
const oldFetch=globalThis.fetch,calls=[];let mode='ok';
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method??'GET',body:init?.body?JSON.parse(init.body):null});return new Response(JSON.stringify(mode==='refuse'?{error:'Not found.'}:mode==='malformed'?{}:{thread:{id:'created'},message:{id:'new',authorUserId:'me',content:'自定消息',seq:2},messages:[]}),{status:mode==='refuse'?404:200});};
try{
 r.render('NewChatForm',np,'zh-CN',q(chatFile,[['other','third'],' 自定 {群聊} ',false,'']));await r.elements().find(e=>e.props.tone==='primary'&&e.props.onClick).props.onClick();assert.equal(created,'created');assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/side-chat',method:'POST',body:{kind:'group',memberUserIds:['other','third'],title:'自定 {群聊}'}});
 r.render('ThreadView',tp,'zh-CN',q(chatFile,[[message],' 自定消息 ',false,'','']));await r.elements().find(e=>e.type==='form').props.onSubmit({preventDefault(){}});assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/side-chat/thread/messages',method:'POST',body:{content:'自定消息'}});
 r.render('ThreadView',tp,'zh-CN',q(chatFile,[[message],'自定消息',true,'','']));await r.elements().find(e=>e.type==='form').props.onSubmit({preventDefault(){}});assert.equal(calls.length,0,'no duplicate send while busy');
 mode='malformed';r.render('ThreadView',tp,'zh-CN',q(chatFile,[[message],'保留草稿',false,'','']));await r.elements().find(e=>e.type==='form').props.onSubmit({preventDefault(){}});assert(!r.updates().some(u=>u.at===1&&u.value===''));assert(r.updates().some(u=>u.at===3&&u.value==='Could not send.'));calls.length=0;
 mode='refuse';html=r.render('ThreadView',tp,'zh-CN',q(chatFile,[[message],'',false,'','Could not load the chat messages.']));assert(html.includes('Authored private text')&&html.includes('未能加载聊天消息'));r.elements().find(e=>e.type==='button'&&e.props.children==='重试').props.onClick();await tick();assert.equal(calls.pop().method,'GET');assert(!r.updates().some(u=>u.at===0));assert(r.updates().some(u=>u.at===4&&u.value==='Not found.'));
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: localized private-chat/media/narrator chrome, preserved Unicode names/private prose/roll IDs, canonical group/send callbacks, busy-send guard and retained rows/drafts on read or malformed-send failure (mock transport only).');
