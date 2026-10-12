// One focused contract check for the grouped setup flow, not per-component snapshots.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
import {setupFlowMessage} from '../src/lib/i18n/setup-flow-presentations.ts';

const native = [
  ['local.test:8001 wants an API key.', 'local.test:8001'],
  ['local.test:8001 answered 503 when asked for its models.', '503'],
  ['It replied "Raw reply {value}" instead of the tool\'s answer.', 'Raw reply {value}'],
  ["2.5 s through the tables' own picture queue", '2.5'],
  ['The invite codes did not load. Admins only.', '管理员'],
];
for(const [raw,kept] of native){assert.equal(setupFlowMessage(raw,'en'),raw);const zh=setupFlowMessage(raw,'zh-CN');assert.notEqual(zh,raw);assert(zh.includes(kept));}
assert.equal(setupFlowMessage('External provider diagnostic {raw}','zh-CN'),'External provider diagnostic {raw}');
const story='src/app/setup/StorytellerStep.tsx',picture='src/app/admin/HarnessPictureTest.tsx',agent='src/app/setup/YourAgentStep.tsx';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const r=await openCombatRenderer({files:[story,picture,agent],sourceOf:file=>fs.readFileSync(file,'utf8')+(file===story?'\nexport {KeyPanel};':''),stubs:{
 '@/app/admin/BackendProbe':url('export const BackendProbe=()=>null;'),
 '@/app/setup/AgentPanel':url('export const AgentPanel=()=>null;'),
 '@/components/AgentConnectLines':url('export const AgentConnectLines=()=>null;'),
}});
const no=()=>{},emptyList={state:'idle',models:[],recommended:'',error:'',needsKey:false};
const draft={story:'key',key:{provider:'openai',baseUrl:'',apiKey:'',model:'',list:emptyList}};
let changed;
for(const locale of ['en','zh-CN']){
 const html=r.render('KeyPanel',{draft,update:change=>changed=change(draft),savedKeyFor:null},locale,{queues:{[story]:[false,'openrouter']}});
 assert(html.includes(locale==='en'?'That looks like an OpenRouter key':'此密钥看起来来自 OpenRouter'));
 r.elements().find(e=>e.type==='input'&&e.props.type==='password').props.onChange({target:{value:'sk-or-fixture-key'}});
 assert.equal(changed.key.provider,'openrouter');assert.equal(changed.key.apiKey,'sk-or-fixture-key');assert(r.updates().some(u=>u.value==='openrouter'));
}
const rows=[{id:'c1',title:'Authored campaign',kind:'campaign',backend:'external-provider',picturesOn:true,canPaint:true},{id:'c2',title:'自定义战役',kind:'campaign',backend:'none',picturesOn:true,canPaint:false}];
const html=r.render('HarnessPictureTest',{saved:true,picturesVerified:true,picturesForTables:false,onVerified:no},'zh-CN',{queues:{[picture]:[false,{image:{url:'fixture-map'},campaigns:rows},false,null,'']}});
assert(html.includes('自定义战役')&&html.includes('external-provider')&&html.includes('生成图片'));
const original=globalThis.fetch;let call,made;
try{
 globalThis.fetch=async(path,options)=>{call={path,body:JSON.parse(options.body)};return {ok:true,json:async()=>({grant:{id:'fixture-id'},token:'fixture-token',mcpUrl:'fixture-url'})};};
 r.render('YourAgentStep',{made:null,onMade:value=>made=value},'zh-CN');
 await r.elements().find(e=>e.type==='button'&&e.props.onClick).props.onClick();
 assert.deepEqual(call,{path:'/api/profile/agents',body:{name:'我的 AI 程序',scopes:['read','play','dm'],campaignId:null}});
 assert.equal(made.id,'fixture-id');
}finally{globalThis.fetch=original;}
console.log('PASS: grouped setup dynamic errors/raw details, bilingual provider-switch state and canonical key/provider callbacks, picture counts/authored names/external backend, localized personal-agent default and native scope/request contract (mock transport only).');
