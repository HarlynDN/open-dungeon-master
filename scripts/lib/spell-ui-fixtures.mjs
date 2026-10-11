import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {register} from 'node:module';
register('./register-routes.mjs',import.meta.url);
const root=path.resolve(import.meta.dirname,'../..');
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');

// Render actual spell picker/book and finish JSX. Only network pools and
// peripheral dialog/equipment shells are replaced; event closures are captured
// from the real JSX runtime, including the picker cap/prepare/suggestion logic.
export async function openSpellRenderer() {
  const token='odm-spell-fixtures-'+Math.random();
  const state={queue:[],updates:[],nodes:[],pool:[],loading:false,lookups:new Map()};globalThis[token]=state;
  const shells=url(`import {createElement as h} from ${JSON.stringify(import.meta.resolve('react'))};
    export const InfoButton=({label,reference,text,meta,note})=>h('button',{'data-reference':JSON.stringify(reference),'data-text':text,'data-meta':meta,'data-note':note},label);
    export const GameIcon=()=>null; export const HpExplainerButton=()=>null;
    export const GameTerm=({id,children})=>h('span',{'data-term':id},children);
    export const Ribbon=({children})=>children; export const knownTraining=()=>({});
    export default ()=>null;`);
  const hook=url(`export const useSpellPool=()=>({pool:globalThis[${JSON.stringify(token)}].pool,loading:globalThis[${JSON.stringify(token)}].loading});export const useSpellLookups=()=>globalThis[${JSON.stringify(token)}].lookups;`);
  const react=url(`export * from ${JSON.stringify(import.meta.resolve('react'))};import {useState as real} from ${JSON.stringify(import.meta.resolve('react'))};export function useState(initial){const s=globalThis[${JSON.stringify(token)}],i=s.updates.length;const [value]=real(s.queue.length?s.queue.shift():initial);s.updates.push(value);return [value,next=>{s.updates[i]=typeof next==='function'?next(s.updates[i]):next}];}`);
  const jsx=url(`import {jsx as real,jsxs as reals,Fragment} from ${JSON.stringify(import.meta.resolve('react/jsx-runtime'))};export {Fragment};export function jsx(...args){const n=real(...args);globalThis[${JSON.stringify(token)}].nodes.push(n);return n}export function jsxs(...args){const n=reals(...args);globalThis[${JSON.stringify(token)}].nodes.push(n);return n}`);
  const aliases=Object.fromEntries(['@/components/ui/InfoDialog','@/components/ui/GameIcon','@/components/ui/GameTerm','@/components/ui/Ribbon','../EquipmentSection','../KitChoicesSection','../BackgroundKitSection','../AbilityExplainers','./AbilityExplainers','./FeatChoicesFields','../FeatChoicesFields','@/components/ui/Reveal'].map(k=>[k,shells]));
  aliases['@/components/sheet/useSpellPool']=hook;aliases['./useSpellPool']=hook;aliases['react']=react;aliases['react/jsx-runtime']=jsx;
  const cache=new Map();
  const moduleUrl=file=>{
    if(cache.has(file))return cache.get(file);
    const full=path.join(root,file),suffix=file.endsWith('SpellsGearStep.tsx')?'\nexport {SpellsSection};':file.endsWith('SheetSpells.tsx')?'\nexport {CasterBook,buildTiles};':'';
    const compiled=ts.transpileModule(fs.readFileSync(full,'utf8')+suffix,{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
    const linked=url(compiled.replace(/from (["'])([^"']+)\1/g,(_all,_quote,spec)=>{
      let target=file==='src/lib/i18n/LocaleProvider.tsx'&&spec==='react'?import.meta.resolve('react'):aliases[spec];if(!target){if(spec.startsWith('.')||spec.startsWith('@/')){
        const bare=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(full),spec);
        const found=['','.ts','.tsx','/index.ts','/index.tsx'].map(ext=>bare+ext).find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
        if(!found)throw new Error('Cannot resolve '+spec+' from '+file);
        target=found.endsWith('.tsx')?moduleUrl(path.relative(root,found)):pathToFileURL(found).href;
      }else target=import.meta.resolve(spec);}return 'from '+JSON.stringify(target);
    }));cache.set(file,linked);return linked;
  };
  const provider=moduleUrl('src/lib/i18n/LocaleProvider.tsx');aliases['@/lib/i18n/LocaleProvider']=provider;
  // hpExplainerInput only; this import would otherwise pull the full unrelated
  // ability editor into a spell fixture.
  aliases['./AbilitiesStep']=url(`export function hpExplainerInput(){return null}`);
  const [p,book,step,finish,sheet]=await Promise.all([import(provider),import(moduleUrl('src/components/sheet/SpellBook.tsx')),import(moduleUrl('src/app/characters/builder/steps/SpellsGearStep.tsx')),import(moduleUrl('src/app/characters/builder/steps/FinishStep.tsx')),import(moduleUrl('src/components/sheet/SheetSpells.tsx'))]);
  const render=(component,props,locale='en',seed={})=>{
    state.queue=[...(seed.queue??[])];state.updates=[];state.nodes=[];state.pool=seed.pool??[];state.loading=seed.loading??false;state.lookups=seed.lookups??new Map();
    return renderToStaticMarkup(h(p.LocaleProvider,{initialLocale:locale},h(component,props))).replace(/[\t\n\r ]+/g,' ');
  };
  return {render,book,step,finish,sheet,state};
}

const none=()=>{};
export const spellPool=[
  {name:'Fire Bolt',level:0,data:{level_int:0,school:'evocation',casting_time:'1 action',range:'120 feet'}},
  {name:'Light',level:0},{name:'Mage Hand',level:0},
  {name:'Shield',level:1,data:{level_int:1,school:'abjuration',casting_time:'1 reaction',range:'Self'}},
  {name:'Magic Missile',level:1},{name:'Sleep',level:1},{name:'Armor of Agathys',level:1},
  {name:'Cloud {spell}',level:1,source:'homebrew',data:{desc:'Authored Cloud rules.'}},
];
export function spellStepProps(overrides={}) {
  const state={spells:[],cantrips:[],bookPrepared:[],subclass:'',level:1,setSpells:none,setCantrips:none,setBookPrepared:none};
  const derived={spellAdvice:{count:2,label:'known spells'},cantripAdvice:2,chosenCantrips:[],chosenSpells:[],chosenPrepared:[],maxSpellLevel:1,starters:null,subclassSpells:[],racialCantrips:[],featSpells:{cantrips:[],spells:[]},spellSearchClass:'bard',spellStyle:'known',spellbookAdvice:null};
  return {state:{...state,...overrides.state},derived:{...derived,...overrides.derived},klass:{id:'bard',name:'Bard',...overrides.klass},pack:overrides.pack??null};
}
export function finishProps(overrides={}) {
  const state={portrait:null,setPortrait:none,appearance:'Authored appearance',setAppearance:none,backstory:'Authored backstory',setBackstory:none,feats:[],setFeats:none,hpOverride:null,keepsStoredGear:false};
  const derived={preview:{maxHp:8,hpRange:{min:4,max:8},hpMethod:'fixed',derived:{initiative:2,passivePerception:11,spellSaveDc:13,spellAttack:5}},acInfo:{ac:12,parts:['10','DEX +2']},ac:12,effectiveLevel:1,purse:{gold:15,copper:3,spentCopper:0,problems:[],method:'kit'},fullEquipment:[]};
  return {state:{...state,...overrides.state},derived:{...derived,...overrides.derived},race:{id:'high_elf',name:'High Elf',speed:30,...overrides.race},klass:{id:'wizard',name:'Wizard',hitDie:6,...overrides.klass},background:{id:'acolyte',name:'Acolyte',purse:15},table:{rules:null,rulesError:'',retryRules:none,...overrides.table},initial:overrides.initial,paintsPortraits:overrides.paintsPortraits??true,onUploadPortrait:none,error:overrides.error??''};
}
export async function spellUiFixtures(locale='en',{renderer}={}) {
  renderer??=await openSpellRenderer();const rows=[];const add=(name,component,props,seed)=>rows.push({name,html:renderer.render(component,props,locale,seed)});
  for(const style of ['known','prepared','spellbook'])for(const full of [false,true])for(const phase of style==='spellbook'?['book','prepare']:['book']){
    const chosen=full?['Shield','Magic Missile']:[];
    const props=spellStepProps({state:{spells:chosen,cantrips:full?['Fire Bolt','Light']:[],bookPrepared:style==='spellbook'&&full?['Shield','Magic Missile']:[]},derived:{spellStyle:style,chosenSpells:chosen,chosenCantrips:full?['Fire Bolt','Light']:[],chosenPrepared:style==='spellbook'&&full?chosen:[],spellbookAdvice:style==='spellbook'?2:null,spellAdvice:{count:2,label:style==='known'?'known spells':'prepared spells'},spellSearchClass:style==='known'?'bard':style==='spellbook'?'wizard':'cleric'},klass:{id:style==='known'?'bard':style==='spellbook'?'wizard':'cleric',name:style==='known'?'Bard':style==='spellbook'?'Wizard':'Cleric'}});
    add('step/'+style+'/'+full+'/'+phase,renderer.step.SpellsSection,props,{pool:spellPool,queue:[phase,'']});
  }
  add('step/grants',renderer.step.SpellsSection,spellStepProps({derived:{subclassSpells:['Shield'],racialCantrips:['Light'],featSpells:{cantrips:['Fire Bolt'],spells:['Magic Missile']}}}),{pool:spellPool});
  add('step/borrowed',renderer.step.SpellsSection,spellStepProps({klass:{id:'sci_psion',name:'Psion',genres:['sci-fi']}}),{pool:spellPool});
  add('step/loading',renderer.step.SpellsSection,spellStepProps(),{loading:true});
  add('step/empty',renderer.step.SpellsSection,spellStepProps());
  for(const needle of ['','Light','光亮','Cloud','自订'])add('book/search/'+needle,renderer.book.SpellBook,{maxLevel:1,tiles:spellPool.map((row,i)=>({...row,state:i<5?['ready','pending','granted','inBook','available'][i]:'available',homebrew:row.source==='homebrew',suggested:i===0}))},{queue:[needle,null,{key:'',order:[]}]});
  add('book/reskin',renderer.book.SpellBook,{maxLevel:1,tiles:[{name:'Shield',label:'Cloud shield',level:1,state:'ready'},{name:'Light',level:null,state:'pending'}]});
  for(const paintsPortraits of [true,false])for(const portrait of [null,{url:'/uploads/review.png'}])for(const kept of [false,true])add(`finish/portrait/${paintsPortraits}/${!!portrait}/${kept}`,renderer.finish.FinishStep,finishProps({paintsPortraits,state:{portrait},initial:kept?{portrait}:undefined}));
  for(const method of ['fixed','rolled','max'])add('finish/hp/'+method,renderer.finish.FinishStep,finishProps({derived:{effectiveLevel:4,preview:{maxHp:24,hpRange:{min:9,max:24},hpMethod:method,derived:{initiative:2,passivePerception:11,spellSaveDc:13,spellAttack:5}}}}));
  add('finish/stored',renderer.finish.FinishStep,finishProps({state:{hpOverride:24,keepsStoredGear:true,feats:['Athlete','Cloud {feat}']}}));
  add('finish/error',renderer.finish.FinishStep,finishProps({error:'Authored error\nSecond reason',table:{rulesError:'Authored rules error'}}));
  add('finish/rolled-wealth',renderer.finish.FinishStep,finishProps({derived:{purse:{gold:35,copper:0,spentCopper:500,problems:[],method:'rolled'}},table:{wealth:{faces:[4],gold:40},wealthBusy:false,wealthError:'',rollWealth:none}}));
  for(const style of ['known','prepared','spellbook'])for(const editing of [false,true])add('sheet/'+style+'/'+editing,renderer.sheet.CasterBook,sheetSpellProps(style),{pool:spellPool,queue:[editing,false,null]});
  return rows;
}

export function sheetSpellProps(style='prepared') {
  const classId=style==='known'?'bard':style==='spellbook'?'wizard':'cleric';
  return {view:{classId,level:3,ability:style==='spellbook'?'int':'wis',subclass:'',style,known:style==='known'?['Shield']:[],prepared:style==='known'?[]:['Shield'],pending:style==='known'?[]:['Sleep'],cantrips:['Light'],spellbook:style==='spellbook'?['Shield','Sleep','Magic Missile']:[]},sheet:{id:'review-sheet',campaignId:'review-campaign',abilities:{str:10,dex:14,con:12,int:16,wis:16,cha:14}},editable:true,showClass:true};
}
