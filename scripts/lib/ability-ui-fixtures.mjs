import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {register} from 'node:module';
import ts from 'typescript';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

register('./register-routes.mjs', import.meta.url);
const root = path.resolve(import.meta.dirname, '../..');
const url = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');

// Actual changed JSX and actual locale context; only peripheral UI shells
// are replaced. No copy of the ability arithmetic or state handlers lives here.
export async function openAbilityRenderer({exportLegacy = false} = {}) {
  const shells = url(`import {createElement as h} from ${JSON.stringify(import.meta.resolve('react'))};
    export const CountPop=({value,children})=>h('span',{'data-count':value},children??value);
    export const Ribbon=({children,className})=>h('div',{className},children);
    export const GameTerm=({id,children})=>h('span',{'data-term':id},children);
    export const Dialog=({open,title,children})=>open?h('section',{'data-dialog':title},children):null;
    export const DiceDefs=()=>null;
    export const DiceRow=({roll})=>h('span',{'data-dice':roll.dice.join(','),'data-drop':roll.dropIndex},roll.total);
    export const Select=({label,value,options})=>h('select',{'aria-label':label,value,onChange:()=>{}},options.map(o=>h('option',{key:o.value,value:o.value,disabled:o.disabled},o.label)));
    export const InfoButton=({label,reference})=>h('button',{'data-reference':JSON.stringify(reference)},label);
    export const ContentPicker=({placeholder,kind})=>h('input',{placeholder,'data-kind':kind});
    export const CatalogBrowser=({buttonLabel,sections})=>h('div',{},h('button',{},buttonLabel),sections.map(s=>h('span',{'data-section':s.key,key:s.key},s.label)));
    export const knownTraining=()=>({});
    export const FeatChoicesFields=({feat,picks})=>h('output',{'data-feat':feat},JSON.stringify(picks??{}));
    export default ContentPicker;`);
  const aliases = Object.fromEntries(['@/components/ui/Reveal','@/components/ui/Ribbon','@/components/ui/GameTerm','@/components/ui/Dialog','@/components/ui/Select','@/components/ui/InfoDialog','./Dice','./ContentPicker','./CatalogBrowser','./FeatChoicesFields','../FeatChoicesFields'].map(key=>[key,shells]));
  aliases['./CatalogBrowser']=url(`export {CatalogBrowser as default} from ${JSON.stringify(shells)};`);
  for(const key of ['./FeatChoicesFields','../FeatChoicesFields'])aliases[key]=url(`export {FeatChoicesFields as default,knownTraining} from ${JSON.stringify(shells)};`);
  const moduleUrl = (file, overrides = {}, suffix = '') => {
    const full = path.join(root,file);
    const compiled = ts.transpileModule(fs.readFileSync(full,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText + suffix;
    return url(compiled.replace(/from (["'])([^"']+)\1/g,(_all,_quote,spec)=>{
      let linked=overrides[spec]??aliases[spec];
      if(!linked){
        if(spec.startsWith('.')||spec.startsWith('@/')){
          const bare=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(full),spec);
          const found=['','.ts','.tsx','/index.ts','/index.tsx'].map(ext=>bare+ext).find(file=>fs.existsSync(file)&&fs.statSync(file).isFile());
          if(!found)throw new Error('Cannot resolve '+spec+' from '+file);
          linked=found.endsWith('.tsx')?moduleUrl(path.relative(root,found)):pathToFileURL(found).href;
        }else linked=import.meta.resolve(spec);
      }
      return 'from '+JSON.stringify(linked);
    }));
  };
  const provider = moduleUrl('src/lib/i18n/LocaleProvider.tsx');
  aliases['@/lib/i18n/LocaleProvider']=provider;
  aliases['@/lib/i18n/LocalizedText']=moduleUrl('src/lib/i18n/LocalizedText.tsx',{'./LocaleProvider':provider});
  const explainers = moduleUrl('src/app/characters/builder/AbilityExplainers.tsx');
  aliases['./AbilityExplainers']=explainers; aliases['../AbilityExplainers']=explainers;
  const summary = moduleUrl('src/app/characters/builder/AbilitySummary.tsx'); aliases['./AbilitySummary']=summary;
  const editor = moduleUrl('src/app/characters/builder/AbilityEditor.tsx',{},exportLegacy?'\nexport { METHODS, rerollRule };':''); aliases['./AbilityEditor']=editor; aliases['../AbilityEditor']=editor;
  const asi = moduleUrl('src/app/characters/builder/AsiFeatEditor.tsx'); aliases['../AsiFeatEditor']=asi;
  const steps = moduleUrl('src/app/characters/builder/steps/AbilitiesStep.tsx');
  const [p,e,s,a,edit,step,dice] = await Promise.all([import(provider),import(explainers),import(summary),import(asi),import(editor),import(steps),import(moduleUrl('src/app/characters/builder/Dice.tsx'))]);
  const render = (component,props,locale) => renderToStaticMarkup(h(p.LocaleProvider,{initialLocale:locale},h(component,props))).replace(/[\t\n\r ]+/g,' ');
  return {render,editor:edit,explainers:e,summary:s,asi:a,step,dice};
}

export function abilityDiceFixtures(renderer,locale='en') {
  const result=[{name:'empty',html:renderer.render(renderer.dice.DiceRow,{roll:null},locale)}];
  for(const phase of ['rolling','settled'])for(const dropIndex of [0,3]) {
    const roll={dice:dropIndex===0?[1,2,3,4]:[4,3,2,1],dropIndex,total:9,phase,rest:Array.from({length:4},()=>({dx:'0px',dy:'0px',dr:'0deg'}))};
    result.push({name:phase+'/'+dropIndex,html:renderer.render(renderer.dice.DiceRow,{roll},locale)});
  }
  return result;
}

export async function abilityUiFixtures(locale = 'en', {renderer, methodsOverride} = {}) {
  renderer ??= await openAbilityRenderer();
  const {render,editor,explainers,summary,asi} = renderer;
  const methods = methodsOverride ?? (await import('../../src/lib/i18n/ability-ui-presentations.ts')).abilityMethodRows(locale,70,[15,14,13,12,10,8]);
  const keys=['str','dex','con','int','wis','cha'];
  const blank=Object.fromEntries(keys.map(key=>[key,null]));
  const filled={str:15,dex:14,con:13,int:12,wis:10,cha:8};
  const none=()=>{};
  const base={method:'standard',onMethodChange:none,scores:blank,onScoresChange:none,pool:null,onPoolChange:none,slots:blank,onSlotsChange:none,racialBonus:{con:2,wis:1}};
  const pool=[18,16,14,12,10,8].map(total=>({total}));
  const hpView = hp => ({...hp,className:renderer.step.hpExplainerInput({hpOverride:hp.override},{shownAbilities:{con:hp.con},effectiveLevel:hp.level},null,{id:hp.className==='Wizard'?'wizard':'fighter',name:hp.className,hitDie:hp.hitDie},locale).className});
  const result=[];
  const add=(name,component,props)=>result.push({name,html:render(component,props,locale)});
  for(const [name,props] of [
    ['standard-empty',{}],['standard-full',{scores:filled,who:'hill dwarf fighter'}],
    ['point-min',{method:'pointbuy',scores:Object.fromEntries(keys.map(key=>[key,8]))}],
    ['point-full',{method:'pointbuy',scores:filled}],['point-overspent',{method:'pointbuy',scores:Object.fromEntries(keys.map(key=>[key,15]))}],
    ['roll-empty',{method:'roll'}],['roll-tray',{method:'roll',pool}],
    ['roll-placed',{method:'roll',pool,slots:Object.fromEntries(keys.map((key,i)=>[key,i])),scores:Object.fromEntries(keys.map((key,i)=>[key,pool[i].total]))}],
    ['gains',{scores:filled,asiCount:2,gains:{str:[{source:'at level 4',amount:2,capped:false},{source:'at level 8',amount:0,capped:true},{source:'Primal Champion',amount:4,capped:false}],int:[{source:'Linguist',amount:1,capped:false}],wis:[{source:'Authored {feat}\nCloud',amount:1,capped:false}]}}],
  ])add('editor/'+name,editor.default,{...base,...props});
  const labels=editor.ABILITY_LABELS;
  const rows=keys.map(key=>({ability:key,label:labels[key],base:filled[key],bonus:base.racialBonus[key]??0,added:0}));
  for(const method of ['standard','pointbuy','roll'])for(const who of ['','elf wizard','Authored {hero}\n<script>'])add('summary/'+method+'/'+who,summary.AbilitySummary,{method,rows,who});
  add('summary/added',summary.AbilitySummary,{method:'standard',rows:rows.map(row=>({...row,added:row.ability==='str'?2:0})),who:'hill dwarf fighter',hp:hpView({className:'Fighter',hitDie:10,con:15,level:4,bonusPerLevel:1})});
  for(const current of ['standard','pointbuy','roll'])add('methods/'+current,explainers.MethodInfoDialog,{open:true,onOpenChange:none,methods,current});
  for(const hitDie of [6,8,10,12])for(const [level,con,bonusPerLevel,override] of [[1,8,0,null],[2,16,1,null],[3,15,1,42],[20,1,0,0]])add('hp/'+hitDie+'/'+level,explainers.HpExplainerDialog,{open:true,onOpenChange:none,hp:hpView({className:hitDie===6?'Wizard':'Fighter',hitDie,con,level,bonusPerLevel,override})});
  const asiBase={level:12,slotLevels:[4,8,12],baseScores:{str:18,dex:14,con:15,int:10,wis:10,cha:8},onChange:none};
  for(const [name,props] of [['empty',{baseScores:null,choices:[]}],['unresolved',{choices:[]}],['plus2',{choices:[{mode:'plus2',ability:'str'},{mode:'plus1x2',abilities:['con','dex']},null]}],['taken',{choices:[null,null,null],takenInPlay:[true,true,true]}],['feat',{choices:[{mode:'feat',feat:'Athlete',ability:'dex'},null,null]}],['authored',{choices:[{mode:'feat',feat:'Cloud {feat}\n<script>'},null,null]}]])add('asi/'+name,asi.default,{...asiBase,...props});
  return result;
}
