// Focused UI/interaction validation. All uploads, notices and writes are mocked.
import assert from 'node:assert/strict';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const names=['MessageItem','MessageParts','MessageActions','InlineMessageEditor','RenarrateDialog'],files=names.map(n=>`src/app/campaigns/[campaignId]/${n}.tsx`),[itemFile,,,editorFile,rerollFile]=files;
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const notices=[],token='odm-passage-notices-'+Math.random();globalThis[token]=notices;
const react=JSON.stringify(import.meta.resolve('react'));
const r=await openCombatRenderer({files,stubs:{
 '@/components/ui/ConfirmDialog':url(`export const appNotice=async text=>{globalThis[${JSON.stringify(token)}].push(text);};export const appConfirm=async()=>false;`),
 '@/components/DictateField':url('export const DictateField=({children})=>children;'),
 '@/components/sheet/SheetParts':url('export const PortraitMedallion=({children})=>children;'),
 '@/app/campaigns/[campaignId]/HaltedTurnBanner':url('export const HaltedTurnBanner=()=>null;'),
 '@/app/campaigns/[campaignId]/MessageContent':url(`import {createElement as h} from ${react};export const DmContent=({content})=>h('p',null,content);export const MediaPlaceholder=({label})=>h('span',null,label);`),
 '@/lib/image-encode':url('export const encodeImageForUpload=async()=>({dataUrl:"data:image/png;base64,AAA",type:"image/png"});'),
}});
const {passageText,renarratePresetLabel}=await import('../src/lib/i18n/passage-presentations.ts');
const {checkEdit}=await import('../src/lib/dm/message-edit-logic.ts');
const q=(file,values)=>({queues:{[file]:values}}),tick=()=>new Promise(resolve=>setImmediate(resolve));
const marker='[roll:aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa]',body='Authored {prose} '+marker;
for(const edited of ['删除标记',body+' '+marker,body+' [roll:bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb]']){
 const result=checkEdit(body,edited);assert(!result.ok);assert.equal(passageText(result.reason,'en'),result.reason);assert.notEqual(passageText(result.reason,'zh-CN'),result.reason);assert(passageText(result.reason,'zh-CN').includes('[roll:'));
}
assert.equal(passageText('Authored failure {raw}.','zh-CN'),'Authored failure {raw}.');assert.equal(renarratePresetLabel('darker','en'),'darker');
let saved,cancelled=0;const editor={initial:body,onSave:async text=>{saved=text;return null;},onCancel:()=>cancelled++};
let html=r.render('InlineMessageEditor',editor,'zh-CN');assert(html.includes('保存')&&html.includes('Shift+Enter')&&html.includes(marker));
let field=r.elements().find(e=>e.type==='textarea').props;field.onKeyDown({key:'Enter',nativeEvent:{isComposing:true}});assert.equal(saved,undefined);field.onKeyDown({key:'Enter',shiftKey:false,nativeEvent:{isComposing:false},preventDefault(){}});await tick();assert.equal(saved,body);
r.render('InlineMessageEditor',{...editor,onSave:async()=>{throw Error('synthetic');}},'zh-CN');r.elements().find(e=>e.type==='button'&&e.props.children?.some?.(c=>c===' 保存')).props.onClick();await tick();assert(r.updates().some(u=>u.at===1&&u.value===false)&&r.updates().some(u=>u.at===2&&u.value==='Could not reach the server.'));
const message={id:'m',authorType:'dm',content:body,createdAt:'2020-01-01T00:00:00Z',variants:[body,'Other take'],variantIndex:0};
let chosen,disputed;const mp={campaignId:'c',message,canRetryTurn:false,canIllustrate:true,rollsById:new Map(),sheetsById:new Map(),membersById:new Map(),locationsById:new Map(),sheets:[],mediaStatus:{},mine:false,blocked:false,cast:[],onRenarrate:()=>{},onSelectVariant:(m,i)=>chosen=[m.id,i],onDispute:m=>disputed=m.id};
html=r.render('MessageItem',mp,'zh-CN');assert(html.includes('叙事操作')&&html.includes('地下城主')&&html.includes(body));
r.elements().find(e=>e.props['aria-label']==='下一版').props.onClick();assert.deepEqual(chosen,['m',1]);
const actions=r.elements().find(e=>Array.isArray(e.props.actions)).props.actions;assert(actions.find(a=>a.id==='reroll').name==='重新叙述');actions.find(a=>a.id==='dispute').onSelect();assert.equal(disputed,'m');
html=r.render('PlayerMessage',{message:{...message,userId:null},mine:true,sheets:[],sheetsById:new Map(),membersById:new Map()},'zh-CN');assert(html.includes('玩家：消息操作')&&html.includes(body));
const oldFetch=globalThis.fetch,calls=[];let mode='ok',closed=0;
globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});return new Response(JSON.stringify(mode==='refuse'?{error:'The DM is mid-turn; try again after.'}:{url:'/uploads/mock.png'}),{status:mode==='refuse'?409:200});};
try{
 const rp={campaignId:'c',message,onClose:()=>closed++};
 r.render('RenarrateDialog',rp,'zh-CN',q(rerollFile,['',0.1,false,'','darker']));assert(r.elements().some(e=>e.type==='input'&&e.props.value==='更阴暗'));
 await r.elements().find(e=>e.type==='button'&&e.props.children==='重新叙述').props.onClick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/messages/m/renarrate',method:'POST',body:{action:'reroll',guidance:'darker',tempOffset:0.1}});assert.equal(closed,1);
 r.render('RenarrateDialog',rp,'en',q(rerollFile,['自定指引 {raw}',0.2,false,'',null]));await r.elements().find(e=>e.type==='button'&&e.props.children==='Reroll').props.onClick();assert.equal(calls.pop().body.guidance,'自定指引 {raw}');
 mode='refuse';r.render('RenarrateDialog',rp,'zh-CN');await r.elements().find(e=>e.type==='button'&&e.props.children==='重新叙述').props.onClick();assert.equal(closed,2);assert(r.updates().some(u=>u.at===3&&u.value==='The DM is mid-turn; try again after.'));calls.length=0;
 mode='ok';r.render('MessageItem',mp,'zh-CN');r.elements().find(e=>e.type==='input'&&e.props.type==='file').props.onChange({target:{files:[{name:'自定图片.png'}],value:'selected'}});await tick();assert.deepEqual(calls.map(c=>c.body),[{dataUrl:'data:image/png;base64,AAA',name:'自定图片.png',type:'image/png'},{url:'/uploads/mock.png'}]);
}finally{globalThis.fetch=oldFetch;}
console.log('PASS: localized passage/player actions, raw prose/roll-marker diagnostics, IME-safe edit and recovered failure, canonical variant/reroll/preset/upload callbacks (mock transport only).');
