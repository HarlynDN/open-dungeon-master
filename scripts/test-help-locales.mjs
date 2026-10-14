// Focused owned-help rendering/actions and independently loaded language scopes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {helpRenderer,helpCases,helpFile,partsFile} from './lib/help-ui-fixtures.mjs';
import {HELP_TOPICS,HELP_TOURS} from '../src/lib/i18n/app-help-metadata.ts';
import {MESSAGE_CATALOGS} from '../src/lib/i18n/messages.ts';
const {helpTourView}=await import('../src/lib/i18n/app-help-presentations.ts');
const renderer=await helpRenderer();
// Pin English behavior to the accepted upstream UI (including Lucide upgrade).
const upstream=await helpRenderer(file=>[helpFile,partsFile].includes(file)?execFileSync('git',['show',`2b0b6b6e:${file}`],{encoding:'utf8'}):fs.readFileSync(file,'utf8'));
for(const row of helpCases())assert.equal(renderer.render('HelpDialog',row.props,'en',row.options),upstream.render('HelpDialog',row.props,'en',row.options),row.name+' upstream English');
const close=[];
const start=[];
const tours=HELP_TOURS.map((row,index)=>({...row,onStart:()=>start.push(index)}));
const props={open:true,onOpenChange:open=>close.push(open),tours};
const html=renderer.render('HelpDialog',props,'zh-CN');
assert(html.includes('与 DM 交流')&&html.includes('不会改变规则已算出的数值'));
assert(html.includes('游戏桌面导览')&&html.includes('DM 控制台导览'));
for(const href of ['/reference','/rulebook','/licenses'])assert(html.includes('href="'+href+'"'));
const sections=[...html.matchAll(/<section id="([^"]+)"/g)].map(match=>match[1]);
const idOf=topic=>'help-'+topic.canonical.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'');
assert.deepEqual(sections,HELP_TOPICS.map(idOf));
let buttons=renderer.elements().filter(e=>e.type==='button'&&e.props.onClick);
const scroll=[];
const oldWindow=globalThis.window,oldDocument=globalThis.document;
try {
 globalThis.window={matchMedia:()=>({matches:true})};
 globalThis.document={getElementById:id=>({scrollIntoView:options=>scroll.push({id,options})})};
 const contents=buttons.filter(e=>e.props.title===undefined);
 assert.equal(contents.length,HELP_TOPICS.length);
 contents.forEach(e=>e.props.onClick());
 assert.deepEqual(scroll.map(row=>row.id),sections);
 assert(scroll.every(row=>row.options.behavior==='auto'));
} finally {
 if(oldWindow===undefined)delete globalThis.window;else globalThis.window=oldWindow;
 if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;
}
buttons.filter(e=>e.props.title!==undefined).forEach(e=>e.props.onClick());
assert.deepEqual(close,[false,false]);assert.deepEqual(start,[0,1]);
for(const needle of ['骰子','Dice']){
 const searched=renderer.render('HelpContents',{withTours:false},'zh-CN',{queues:{[partsFile]:[needle]}});
 assert(searched.includes('骰子'));
 assert.equal(renderer.elements().filter(e=>e.type==='button').length,1);
}
assert(renderer.render('HelpContents',{withTours:false},'zh-CN',{queues:{[partsFile]:['no-topic-match']}}).includes('没有找到此主题'));
assert(!renderer.render('HelpContents',{withTours:false},'zh-CN').includes('操作导览'));
const authored={label:'Authored tour',detail:'Authored detail.'};
assert.deepEqual(helpTourView(authored,'zh-CN'),authored);
const replacement={label:HELP_TOURS[0].label,detail:'Authored replacement.'};
assert.deepEqual(helpTourView(replacement,'zh-CN'),replacement);
assert(renderer.render('HelpDialog',{...props,tours:[{...authored,onStart:()=>{}}]},'zh-CN').includes('Authored detail.'));
const loading=renderer.render('HelpDialog',props,'zh-CN',{queues:{[helpFile]:['en',null,0]}});
assert(loading.includes('正在加载')&&!loading.includes('与 DM 交流'));
const failed=renderer.render('HelpDialog',props,'zh-CN',{queues:{[helpFile]:[null,'zh-CN',0]}});
assert(failed.includes('无法加载帮助内容'));
renderer.elements().find(e=>e.type==='button').props.onClick();
assert(renderer.updates().some(update=>update.at===1&&update.value===null));
assert(renderer.updates().some(update=>update.at===2&&typeof update.value==='function'&&update.value(0)===1));
// A fresh process has no whole source catalog registration. Loading Chinese
// help must not fetch/register English help, UI or campaign material.
execFileSync(process.execPath,['--input-type=module','-e',`
 import assert from 'node:assert/strict';
 import {catalogFor} from './src/lib/i18n/translator.ts';
 import {loadLocaleMessages} from './src/lib/i18n/client-catalogs.ts';
 assert.equal(Object.keys(catalogFor('zh-CN')).length,0);
 await loadLocaleMessages('zh-CN','help');
 assert.equal(catalogFor('zh-CN')['appHelp.fragment.0'],'帮助');
 assert.equal(catalogFor('zh-CN')['common.loading'],undefined);
 assert.equal(catalogFor('zh-CN')['sheetDialog.abilities'],undefined);
 assert.equal(Object.keys(catalogFor('en')).length,0);
 await loadLocaleMessages('en','help');
 assert.equal(catalogFor('en')['appHelp.fragment.0'],'Help');
 assert.equal(catalogFor('en')['common.loading'],undefined);
`],{cwd:new URL('../',import.meta.url),env:{...process.env,NODE_NO_WARNINGS:'1'},stdio:'pipe'});
for(const locale of ['en','zh-CN']) {
 const ui=JSON.parse(fs.readFileSync(new URL('../src/lib/i18n/resources/'+locale+'.ui.json',import.meta.url),'utf8'));
 const content=JSON.parse(fs.readFileSync(new URL('../src/lib/i18n/resources/'+locale+'.content.json',import.meta.url),'utf8'));
 const help=JSON.parse(fs.readFileSync(new URL('../src/lib/i18n/resources/'+locale+'.help.json',import.meta.url),'utf8'));
 for(const key of Object.keys(MESSAGE_CATALOGS[locale]).filter(key=>key.startsWith('appHelp.'))){assert.equal(ui[key],undefined);assert.equal(content[key],undefined);assert.equal(help[key],MESSAGE_CATALOGS[locale][key]);}
}
console.log('PASS: five English help states, 17 stable Chinese topic anchors/actions, bilingual search, source-bound tours, loading/retry, preserved links and independently lazy-loaded language payloads.');
