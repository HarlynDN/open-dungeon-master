// Focused contracts for grouped reference/social display and bilingual retrieval.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {register} from 'node:module';
register('./lib/register-alias.mjs',import.meta.url);
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {referenceRowName,referenceSourceName,referenceRowDescription,referenceBadgeText}=await import('../src/lib/i18n/reference-ui-presentations.ts');
const {socialNotice}=await import('../src/lib/i18n/reference-social-presentations.ts');
const {deskSearchQuestion,referenceSearchNames}=await import('../src/lib/i18n/reference-search.ts');
const {deskTerms,selectEvidence,renderEvidence}=await import('../src/lib/reference/desk-logic.ts');
const {localizedReferenceSearch}=await import('../src/lib/content/localized-reference-search.ts');
const {nativeEquipmentSearch}=await import('../src/lib/content/native-equipment-search.ts');

assert(referenceSearchNames('spell','火球','zh-CN').includes('fireball'));
assert.equal(deskSearchQuestion('Does Fireball need concentration?','en'),'Does Fireball need concentration?');
const question=deskSearchQuestion('火球术是否需要专注？','zh-CN');
assert(question.includes('fireball')&&question.toLowerCase().includes('concentration'));
const sources=[{kind:'spell',ref:'spell:fireball',name:'Fireball',origin:'SRD spell',text:'Fireball. Each creature takes fire damage.'},{kind:'spell',ref:'spell:light',name:'Light',origin:'SRD spell',text:'You touch one object.'},{kind:'ruling',ref:'ruling:own',name:'自定义规则',origin:'Authored rules',text:'这里的隐匿检定具有优势。'}];
const found=selectEvidence(question,sources);assert(found.some(row=>row.ref==='spell:fireball'));assert(!found.some(row=>row.ref==='spell:light'));assert.equal(renderEvidence(found),renderEvidence([sources[0]]));
assert(deskTerms('隐匿检定').includes('隐匿'));assert.equal(selectEvidence('隐匿检定',sources)[0].ref,'ruling:own');
const authored={name:'Fireball',source:'homebrew',documentSlug:'wotc-srd',data:{desc:'Authored description {raw}'}};
assert.equal(referenceRowName('spells',authored,'zh-CN'),'Fireball');assert.equal(referenceRowDescription('spells',authored,'zh-CN'),'Authored description {raw}');
assert.equal(referenceRowName('spells',{...authored,source:'open5e',documentSlug:'third-party'},'zh-CN'),'Fireball');
assert.equal(referenceSourceName({kind:'spell',ref:'spell:fireball',name:'Fireball',origin:'SRD spell'},'zh-CN'),'火球术');
assert.equal(referenceBadgeText('spells',{source:'open5e'},{key:'level',text:'level 3'},'zh-CN'),'3环');
assert.equal(socialNotice('Too many requests. Try again in 12s.','zh-CN'),'请求过于频繁，请在 12 秒后重试。');
assert.equal(socialNotice('Unknown external response {raw}','zh-CN'),'Unknown external response {raw}');
const brew={slug:'homebrew:own',name:'火球术（自制）',source:'homebrew'};
const pack=Array.from({length:205},(_,i)=>({slug:'spell:'+i,name:'Fireball '+String(i).padStart(3,'0'),source:'open5e'}));
const search=(q,offset,limit)=>q==='火球'? [brew] : q==='fireball'? [brew,...pack.slice(offset,offset+limit)]:[];
const base={q:'火球',kind:'spell',locale:'zh-CN',offset:0,limit:60,search};
const first=localizedReferenceSearch(base),second=localizedReferenceSearch({...base,offset:60});
assert.equal(first.length,61);assert.equal(first[0].slug,brew.slug);assert.equal(second.length,60);assert.equal(second[0].slug,'spell:60');assert(!second.some(row=>row.source==='homebrew'));assert.equal(new Set([...first,...second].map(row=>row.slug)).size,121);
const equipment={q:'自定义',locale:'zh-CN',offset:0,limit:1,separateHomebrew:true,search:()=>[brew,{slug:'item:p',name:'Authored pack item',source:'open5e'}]};
assert.equal(nativeEquipmentSearch(equipment).length,2);assert.equal(nativeEquipmentSearch({...equipment,offset:1}).length,0);
const friends='src/app/friends/page.tsx',reference='src/app/reference/page.tsx',about='src/components/AboutDialog.tsx';
const dataUrl=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const reactUrl=import.meta.resolve('react');
const renderer=await openCombatRenderer({files:[friends,reference,about],stubs:{
 'next/link':dataUrl(`import {createElement as h} from ${JSON.stringify(reactUrl)};export default function Link({children,href}){return h('a',{href},children);}`),
 '@/components/PageShell':dataUrl(`import {createElement as h} from ${JSON.stringify(reactUrl)};export const PageShell=({children,title})=>h('main',null,title,children);export const PageSection=({children,heading})=>h('section',null,heading,children);export const PageNotice=({children})=>h('div',null,children);export const PageLoading=()=>null;`),
},sourceOf:file=>fs.readFileSync(file,'utf8').replace('export default function FriendsPage','export function FriendsPage').replace('export default function ReferencePage','export function ReferencePage')+(file===about?'\nexport {buildLine};':'')});
let html=renderer.render('FriendsPage',{},'zh-CN',{queues:{[friends]:[{friends:[],incoming:[],outgoing:[]},[],false,true,'',false,{text:'Request sent.',error:false},{}]}});assert(html.includes('好友请求已发送')&&html.includes('添加好友'));
html=renderer.render('ReferencePage',{},'zh-CN',{queues:{[reference]:['browse','glossary','专注']}});assert(html.includes('专注')&&html.includes('基础规则'));
const build={known:true,release:false,tag:'v1.0.0',version:'1.0.0',ahead:2,dirty:true};
assert.equal(renderer.components.buildLine(build,'en'),'2 changes newer than the v1.0.0 release. Built with local changes that are in no commit.');assert(renderer.components.buildLine(build,'zh-CN').includes('尚未提交'));
console.log('PASS: bilingual owned/source-gated display, original citation text, Chinese alias and house-rule retrieval, stable combined alias/equipment paging, social raw notices and current-locale glossary/about display. Pure fixtures; no real model/social/network/clipboard actions.');
