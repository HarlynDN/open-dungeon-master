import { readValidationJson } from "./lib/validation-json.mjs";
import {assertReviewedMessages} from './lib/reviewed-messages.mjs';
import "../src/lib/i18n/messages.ts";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {register} from 'node:module';
import {suite} from './lib/enforce-harness.mjs';
register('./lib/register-routes.mjs',import.meta.url);
const{test,finish}=suite('test-chinese-calling-material');
const root=path.resolve(import.meta.dirname,'..');
const read=file=>readValidationJson(path.join(root,file));
const before=read('docs/validation/character-calling-material-ui-goldens.json');
const{classHelpText,subclassHelpText}=await import('../src/lib/i18n/calling-material-presentations.ts');
const{CALLING_MATERIAL_MESSAGES,CALLING_CLASS_BLURBS,CALLING_SUBCLASS_BLURBS}=await import('../src/lib/i18n/calling-material-messages.ts');
const{srdClassOptions}=await import('../src/lib/characters/options.ts');
const{subclassNamesFor,subclassBlurb}=await import('../src/lib/srd/features.ts');
const{classInfoText}=await import('../src/app/characters/builder/usePickerGroups.ts');
const{characterPickerUiFixtures}=await import('./lib/character-picker-ui-fixtures.mjs');
const numeric=text=>new Set(text?.match(/[+-]?\d+(?:\.\d+)?/g)??[]);
const numbersKept=(source,view)=>{for(const number of numeric(source))assert.ok(numeric(view).has(number),number);};

await test('49 original full class introductions and 153 subclass projections remain exactly English, with unchanged source/model helpers',()=>{
 assert.equal(before.classes.length,49);assert.equal(before.subclasses.length,153);
 const classes=srdClassOptions();
 assert.deepEqual(classes.map(entry=>({id:entry.id,name:entry.name,blurb:entry.blurb??null,info:classInfoText(entry)??null})),before.classes);
 assert.deepEqual(classes.flatMap(entry=>subclassNamesFor(entry.id).map(name=>({classId:entry.id,name,blurb:subclassBlurb(entry.id,name)}))),before.subclasses);
 for(const entry of classes){const original=before.classes.find(row=>row.id===entry.id);assert.equal(classHelpText(entry,'en'),original.info??undefined);assert.equal(classInfoText(entry,'en'),original.info??undefined);}
 for(const row of before.subclasses)assert.equal(subclassHelpText(row.classId,row.name,'en'),row.blurb);
});

await test('all 49 Chinese class bodies are complete catalog translations; separately authored paragraphs and source objects remain intact',()=>{
 assert.equal(CALLING_CLASS_BLURBS.length,49);
 for(const entry of srdClassOptions()){
  const original=structuredClone(entry),meta=CALLING_CLASS_BLURBS.find(row=>row.id===entry.id),view=classHelpText(entry,'zh-CN');
  assert.equal(CALLING_MATERIAL_MESSAGES.en[meta.key],entry.blurb);assert.equal(view,CALLING_MATERIAL_MESSAGES['zh-CN'][meta.key]);assert.match(view,/\p{Script=Han}/u);numbersKept(entry.blurb,view);
  const desc='Entire authored {class}\nsecond paragraph';
  assert.equal(classHelpText({...entry,desc},'zh-CN'),view+'\n\n'+desc);assert.equal(classHelpText({...entry,desc},'en'),entry.blurb+'\n\n'+desc);
  assert.deepEqual(entry,original);
 }
 const fighter=srdClassOptions().find(row=>row.id==='fighter');
 for(const change of [{blurb:'Authored complete {class}'},{name:'Cloud {class}'},{id:'cloud'},{packBlurb:'Authored pack\ncomplete {name}'}]){
  const entry={...fighter,...change};assert.equal(classHelpText(entry,'zh-CN'),classHelpText(entry,'en'));
 }
 assert.equal(classHelpText({},'zh-CN'),undefined);assert.equal(classHelpText({desc:'Full authored source'},'zh-CN'),'Full authored source');
});

await test('117 complete Chinese subclass introductions preserve numeric mechanics, while 36 originally absent bodies stay absent',()=>{
 assert.equal(CALLING_SUBCLASS_BLURBS.length,117);let empty=0;
 for(const row of before.subclasses){const view=subclassHelpText(row.classId,row.name,'zh-CN');
  if(row.blurb===null){empty++;assert.equal(view,null);continue;}
  const meta=CALLING_SUBCLASS_BLURBS.find(meta=>meta.classId===row.classId&&meta.name===row.name);assert.ok(meta);
  assert.equal(CALLING_MATERIAL_MESSAGES.en[meta.key],row.blurb);assert.equal(view,CALLING_MATERIAL_MESSAGES['zh-CN'][meta.key]);assert.match(view,/\p{Script=Han}/u);assert.ok(!view.includes('翻译待补'));numbersKept(row.blurb,view);
 }
 assert.equal(empty,36);
 assert.match(subclassHelpText('barbarian','Path of the Storm Herald','zh-CN'),/10 英尺.*沙漠.*极地.*海上风暴/);
 assert.match(subclassHelpText('fighter','Champion','zh-CN'),/19.*重击.*运动.*第二种战斗风格/);
 assert.match(subclassHelpText('druid','Circle of the Land','zh-CN'),/额外法术.*额外戏法.*短休.*恢复法术位/);
 assert.match(subclassHelpText('cleric','Life Domain','zh-CN'),/治疗效果更强.*重甲.*始终处于准备状态/);
});

await test('native alias normalization remains original, and complete content-pack/workshop overrides retain precedence and literal braces',()=>{
 const tables=[read('src/lib/srd/class-features.json'),read('src/lib/srd/subclasses.json')];let aliases=0;
 for(const table of tables)for(const[classId,value]of Object.entries(table.classes))for(const entry of Array.isArray(value)?value:value.subclasses??[]){
  const source=subclassBlurb(classId,entry.name);
  for(const alias of [entry.name.toUpperCase(),' '+entry.name+' ',...(entry.aliases??[])]){
   assert.equal(subclassHelpText(classId,alias,'en'),subclassBlurb(classId,alias));
   if(subclassBlurb(classId,alias)===source)assert.equal(subclassHelpText(classId,alias,'zh-CN'),subclassHelpText(classId,entry.name,'zh-CN'));
   aliases++;
  }
 }
 assert.ok(aliases>=234);
 for(const desc of ['Entire authored {subclass}\nsecond paragraph',' ',before.subclasses.find(row=>row.blurb).blurb])for(const locale of ['en','zh-CN'])assert.equal(subclassHelpText('fighter','Champion',locale,desc),desc);
 for(const locale of ['en','zh-CN']){assert.equal(subclassHelpText('unknown','Cloud',locale),null);assert.equal(subclassHelpText('fighter','Unknown',locale),null);assert.equal(subclassHelpText('fighter','Champion',locale,''),subclassHelpText('fighter','Champion',locale));}
});

await test('the real picker hook keeps every frozen English projection and binds native Chinese bodies without translating authored rows',async()=>{
 const golden=read('docs/validation/character-picker-ui-goldens.json');const en=await characterPickerUiFixtures('en'),zh=await characterPickerUiFixtures('zh-CN');
 assert.deepEqual(JSON.parse(JSON.stringify(en.map(({name,output})=>({name,output})))),golden.fixtures);
 for(let index=0;index<en.length;index++){
  const input=en[index].input,original=en[index].output,view=zh[index].output;
  for(const kind of ['classGroups','subclassGroups']){
   const oldRows=original[kind].flatMap(group=>group.options),newRows=view[kind].flatMap(group=>group.options);
   assert.deepEqual(newRows.map(({id,reference,source})=>({id,reference,source})),oldRows.map(({id,reference,source})=>({id,reference,source})));
   for(let i=0;i<oldRows.length;i++){
    const old=oldRows[i],actual=newRows[i];let expected=old.infoText;
    if(kind==='classGroups'){
     const entry=input.classes.find(row=>row.id===old.id),meta=CALLING_CLASS_BLURBS.find(row=>row.id===entry?.id&&row.name===entry?.name);
     if(meta&&!entry.packBlurb&&entry.blurb===CALLING_MATERIAL_MESSAGES.en[meta.key])expected=[CALLING_MATERIAL_MESSAGES['zh-CN'][meta.key],entry.desc].filter(Boolean).join('\n\n');
    }else{
     const override=input.archetypes.find(row=>row.name.toLowerCase()===old.id.toLowerCase())?.desc;
     const meta=CALLING_SUBCLASS_BLURBS.find(row=>row.classId===input.klass?.id&&row.name===old.id);
     if(!override&&meta&&old.infoText===CALLING_MATERIAL_MESSAGES.en[meta.key])expected=CALLING_MATERIAL_MESSAGES['zh-CN'][meta.key];
    }
    assert.equal(actual.infoText,expected,en[index].name+'/'+kind+'/'+old.id);
   }
  }
 }
});

await test('original mechanism sources and source-compared translation fingerprints stay current',()=>{
 const review=read('docs/validation/character-calling-material-translations.json');
 for(const[file,hash]of Object.entries({...before.sources,...review.sources,...review.catalogs}))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,file);
 assertReviewedMessages(review);
 assertReviewedMessages(read('docs/validation/character-calling-translations.json'));
});
finish();
