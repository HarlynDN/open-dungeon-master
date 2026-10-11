import { readValidationJson } from "./lib/validation-json.mjs";
import "../src/lib/i18n/messages.ts";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {register} from 'node:module';
import ts from 'typescript';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {pathToFileURL} from 'node:url';
import {suite} from './lib/enforce-harness.mjs';
register('./lib/register-routes.mjs',import.meta.url);
const {test,finish}=suite('test-chinese-game-help');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>readValidationJson(path.join(root,file));
const before=read('docs/validation/game-help-ui-goldens.json');
const closed=read('docs/validation/closed-game-help-ui-goldens.json');
const h=await import('../src/lib/help/index.ts');
const terms=await import('../src/lib/help/terms.ts');
const {glossaryTermView,skillHelpText}=await import('../src/lib/i18n/game-help-presentations.ts');
const {glossaryEntriesView,glossaryListText,glossaryTitle}=await import('../src/lib/i18n/closed-game-help-presentations.ts');
const {GAME_HELP_MESSAGES,GAME_HELP_METADATA}=await import('../src/lib/i18n/game-help-messages.ts');
const {CLOSED_GAME_HELP_MESSAGES,CLOSED_GAME_HELP_METADATA}=await import('../src/lib/i18n/closed-game-help-messages.ts');
const {ALIGNMENT_LABELS}=await import('../src/app/characters/builder/usePickerGroups.ts');
const {callingCardFacts,fightingStyleDescription}=await import('../src/lib/i18n/calling-presentations.ts');
const {FIGHTING_STYLES}=await import('../src/lib/srd/feature-effects.ts');
const {srdClassOptions}=await import('../src/lib/characters/options.ts');
const {messageParts}=await import('../src/lib/i18n/message-parts.ts');
const calling=read('docs/validation/character-calling-ui-goldens.json');
const {builderOptionSearchNames,builderOptionName}=await import('../src/lib/i18n/builder-picker-presentations.ts');
const {filterGroups}=await import('../src/app/characters/builder/lineage.ts');
const sources={condition:terms.CONDITION_BLURBS,school:terms.SPELL_SCHOOL_BLURBS,property:terms.WEAPON_PROPERTY_BLURBS,damage:terms.DAMAGE_TYPE_BLURBS,size:terms.SIZE_BLURBS};
const numeric=text=>(text.match(/[+-]?\d+(?:\.\d+)?/g)??[]).reduce((map,n)=>map.set(n,(map.get(n)??0)+1),new Map());
const numbersKept=(source,view,id)=>{for(const[n,count]of numeric(source))assert.ok((numeric(view).get(n)??0)>=count,`${id}: missing numeric mechanic ${n}`);};

await test('all 43 original term/short/long records and default English model helpers remain exactly unchanged',()=>{
 assert.equal(before.terms.length,43);assert.equal(GAME_HELP_METADATA.length,43);assert.deepEqual(h.glossaryTerms(),before.terms);
 for(const row of before.terms){assert.deepEqual(h.glossaryTerm(row.id),row);assert.deepEqual(glossaryTermView(row.id,'en'),row);
  const meta=GAME_HELP_METADATA.find(meta=>meta.id===row.id);assert.ok(meta);
  for(const part of ['term','short','long'])assert.equal(GAME_HELP_MESSAGES.en[meta[part+'Key']],row[part]);
 }
 for(const row of before.unknownTerms)assert.deepEqual(glossaryTermView(row.id,'en'),row.value);
});

await test('all complete Chinese glossary bodies preserve signed numeric mechanics and source IDs without mutating originals',()=>{
 for(const row of before.terms){const original=structuredClone(h.glossaryTerm(row.id)),view=glossaryTermView(row.id,'zh-CN');
  assert.equal(view.id,row.id);for(const part of ['term','short','long']){assert.match(view[part],/\p{Script=Han}/u);assert.ok(!view[part].includes('翻译待补'));numbersKept(row[part],view[part],row.id+'/'+part);}
  assert.deepEqual(h.glossaryTerm(row.id),original);
 }
 assert.match(glossaryTermView('concentration','zh-CN').long,/体质豁免.*10.*一半.*较高.*失败.*结束法术/);
 assert.match(glossaryTermView('modifier','zh-CN').long,/减去 10.*除以 2.*向下取整.*16.*\+3.*8.*-1/);
 assert.match(glossaryTermView('death_save','zh-CN').long,/三次成功.*稳定.*三次失败.*死亡.*20.*1 点.*1.*两次失败/);
 for(const row of before.unknownTerms)assert.deepEqual(glossaryTermView(row.id,'zh-CN'),row.value);
});

await test('18 skill help displays use the original normalization and localized ability explanation, while source helpers stay English',()=>{
 assert.equal(before.skills.length,18);
 for(const row of before.skills){for(const id of [row.source.id,row.source.id.toUpperCase(),' '+row.source.id+' ']){
  assert.equal(skillHelpText(id,'en'),row.english);assert.equal(h.describeSkill(id),row.english);
  const view=skillHelpText(id,'zh-CN');assert.match(view,/使用/);assert.ok(view.includes(glossaryTermView(row.source.ability,'zh-CN').short));
 }
 }
 for(const row of before.unknownSkills){assert.equal(skillHelpText(row.id,'zh-CN'),row.value);assert.equal(skillHelpText(row.id,'en'),row.value);}
});

await test('55 original closed-vocabulary explanations translate completely, retaining numeric distances, ordering, membership and English capitalization',()=>{
 assert.equal(CLOSED_GAME_HELP_METADATA.length,55);assert.deepEqual(sources,closed.kinds);
 for(const[kind,rows]of Object.entries(closed.kinds)){
  const entries=Object.entries(rows).map(([name,blurb])=>({name,blurb}));const original=structuredClone(entries);
  assert.deepEqual(glossaryEntriesView(entries,'en'),entries);assert.equal(glossaryListText(entries,'en'),terms.glossaryText(entries));
  const views=glossaryEntriesView(entries,'zh-CN');assert.equal(views.length,entries.length);
  for(let i=0;i<entries.length;i++){assert.match(views[i].name,/\p{Script=Han}/u);assert.match(views[i].blurb,/\p{Script=Han}/u);numbersKept(entries[i].blurb,views[i].blurb,kind+'/'+entries[i].name);
   const meta=CLOSED_GAME_HELP_METADATA.find(row=>row.kind===kind&&row.name===entries[i].name);assert.equal(CLOSED_GAME_HELP_MESSAGES.en[meta.blurbKey],entries[i].blurb);
  }
  assert.deepEqual(entries,original);
  const titled=entries.map(row=>({...row,name:row.name[0].toUpperCase()+row.name.slice(1)}));assert.deepEqual(glossaryEntriesView(titled,'en'),titled);
  assert.deepEqual(glossaryEntriesView(titled,'zh-CN'),views);
 }
});

await test('legacy skill/alignment list entries translate only when their complete source matches; authored text and unknown titles stay verbatim',()=>{
 const skills=before.skills.map(row=>({name:row.source.name,blurb:row.english}));const alignments=Object.values(ALIGNMENT_LABELS);
 for(const entries of [skills,alignments]){assert.deepEqual(glossaryEntriesView(entries,'en'),entries);for(const view of glossaryEntriesView(entries,'zh-CN')){assert.match(view.name,/\p{Script=Han}/u);assert.match(view.blurb,/\p{Script=Han}/u);}}
 const authored=[{name:'invisible',blurb:'Authored {spell}\ncomplete source'},{name:'Arcana',blurb:'Authored {skill}'},{name:'Lawful Good',blurb:'Authored ethics'},{name:'Cloud {hero}',blurb:'Entire authored\nbody'}];
 assert.deepEqual(glossaryEntriesView(authored,'zh-CN'),authored);assert.deepEqual(glossaryEntriesView(authored,'en'),authored);
 for(const title of ['Conditions','Schools of magic','Weapon properties','Damage types','Sizes','Skills','Alignments']){assert.equal(glossaryTitle(title,'en'),title);assert.match(glossaryTitle(title,'zh-CN'),/\p{Script=Han}/u);}
 assert.equal(glossaryTitle('Authored {list}','zh-CN'),'Authored {list}');
 assert.match(glossaryListText([{name:'poisoned',blurb:sources.condition.poisoned}],'zh-CN'),/^中毒：.*攻击掷骰.*属性检定.*劣势/);
});

await test('49 original class-card fact projections and all six fighting style records preserve English and canonical sources',()=>{
 assert.deepEqual(JSON.parse(JSON.stringify(srdClassOptions())),calling.cards.map(row=>row.entry));assert.deepEqual(FIGHTING_STYLES,calling.styles);
 for(const row of calling.cards){const option={id:row.entry.id,name:row.entry.name};const en=callingCardFacts(row.entry,option,'en');
  assert.equal(en.tagline,row.view.tagline);assert.deepEqual(en.chips,row.view.chips);
  const zh=callingCardFacts(row.entry,option,'zh-CN');assert.match(zh.tagline,/豁免/);assert.equal(zh.chips[0],en.chips[0]);assert.equal(zh.chips.length,en.chips.length);
 }
 for(const style of calling.styles){assert.equal(fightingStyleDescription(style,'en'),style.description);const zh=fightingStyleDescription(style,'zh-CN');assert.match(zh,/\p{Script=Han}/u);numbersKept(style.description,zh,style.id);}
 const authored={id:'archery',description:'Authored {bonus}\ncomplete rules'};assert.equal(fightingStyleDescription(authored,'zh-CN'),authored.description);
 const pack={...calling.cards[0].entry,packName:'Cloud {class}'},option={id:pack.id,name:pack.packName,meta:'d8 · Artificer',source:'Authored {book}'};
 const en=callingCardFacts(pack,option,'en'),zh=callingCardFacts(pack,option,'zh-CN');assert.equal(en.canonical,'Artificer');assert.equal(zh.canonical,'Artificer');assert.ok(zh.tagline.startsWith('Artificer · Authored {book} · '));
});

await test('all registered stock name aliases stay searchable after switching either UI locale, while authored names stay exact',()=>{
 const fighter=calling.cards.find(row=>row.entry.id==='fighter').entry;
 for(const locale of ['en','zh-CN']){const group=[{label:null,options:[{id:fighter.id,name:builderOptionName('class',fighter,locale),searchTerms:builderOptionSearchNames('class',fighter)}]}];
  for(const query of ['战士','fighter'])assert.deepEqual(filterGroups(group,query).flatMap(g=>g.options.map(row=>row.id)),['fighter']);
 }
 const authored={...fighter,name:'Cloud {hero}\nWarrior'};assert.deepEqual(builderOptionSearchNames('class',authored),[authored.name]);
});

await test('rich messages reorder UI nodes per sentence, interpolate only once and preserve unprovided placeholders and numeric zero',()=>{
 const node={type:'interactive-term',id:'skill'};const values={term:node,name:'Authored {term}<script>',count:0};
 assert.deepEqual(messageParts('Read {term} for {name}: {count}.',values),['Read ',node,' for ','Authored {term}<script>',': ',0,'.']);
 assert.deepEqual(messageParts('{name}：{count}，查看{term}。',values),['Authored {term}<script>','：',0,'，查看',node,'。']);
 assert.deepEqual(messageParts('{missing} {constructor}',{}),['{missing}',' ','{constructor}']);
 assert.deepEqual(messageParts('Plain sentence',{}),['Plain sentence']);assert.deepEqual(messageParts('',{}),[]);
});

await test('the actual rich message component renders complete English and Chinese templates through the locale provider without string-parameter errors',async()=>{
 const moduleUrl=(file,overrides={})=>{
  const full=path.join(root,file);const output=ts.transpileModule(fs.readFileSync(full,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
  const linked=output.replace(/from (["'])([^"']+)\1/g,(_all,_quote,spec)=>{
   let url=overrides[spec];if(!url){if(spec.startsWith('.')){const bare=path.resolve(path.dirname(full),spec);const found=['','.ts','.tsx'].map(ext=>bare+ext).find(file=>fs.existsSync(file));assert.ok(found,spec);url=pathToFileURL(found).href;}else url=import.meta.resolve(spec);}
   return 'from '+JSON.stringify(url);
  });return 'data:text/javascript;base64,'+Buffer.from(linked).toString('base64');
 };
 const providerUrl=moduleUrl('src/lib/i18n/LocaleProvider.tsx');const {LocaleProvider}=await import(providerUrl);
 const {LocalizedText}=await import(moduleUrl('src/lib/i18n/LocalizedText.tsx',{'./LocaleProvider':providerUrl}));
 for(const locale of ['en','zh-CN']){
  const markup=renderToStaticMarkup(createElement(LocaleProvider,{initialLocale:locale},createElement(LocalizedText,{message:'callingUi.subclassLocked',values:{class:'Authored {subclass}<script>',subclass:createElement('button',{'data-rule-id':'subclass'},locale==='en'?'subclass':'子职业'),unlock:3,level:1}})));
  assert.ok(markup.includes('Authored {subclass}&lt;script&gt;'));assert.ok(!markup.includes('<script>'));assert.ok(markup.includes('data-rule-id="subclass"'));assert.ok(markup.includes(locale==='en'?' at level 3;':'在 3 级选择'));assert.ok(markup.includes(locale==='en'?'level 1.':'1 级时'));
 }
});

await test('reviewed source and catalog fingerprints remain current',()=>{
 const review=read('docs/validation/game-help-translations.json');
 const callingReview=read('docs/validation/character-calling-translations.json');
 for(const[file,hash]of Object.entries({...callingReview.sources,...callingReview.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
 for(const[file,hash]of Object.entries({...review.sources,...review.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
 for(const[file,hash]of Object.entries(before.sources)){if(file==='src/components/ui/GameTerm.tsx')continue;assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,'original source '+file);}
});
finish();
