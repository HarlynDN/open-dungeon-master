import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {register} from 'node:module';
import ts from 'typescript';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
register('./register-routes.mjs',import.meta.url);
const root=path.resolve(import.meta.dirname,'../..');
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');

// Actual owned JSX, event handlers and rule helpers. Only the information
// dialog shell and network search input are replaced. Catalog states are
// seeded through real React state so its actual row renderer is exercised.
export async function openGearRenderer() {
  const shells=url(`import {createElement as h} from ${JSON.stringify(import.meta.resolve('react'))};
    export const InfoButton=({label,reference,text,meta})=>h('button',{'data-reference':JSON.stringify(reference),'data-text':text,'data-meta':meta},label);
    export const Ribbon=({children,className})=>h('div',{className},children);
    export const Dialog=({children,title})=>h('section',null,h('h2',null,title),children);
    export const Tooltip=({children})=>children;
    export const GameIcon=()=>null;`);
  const searchState={current:{query:'',results:[],open:false,loading:false,unavailable:false,unadmitted:[]}};
  const stateToken='odm-gear-fixtures-'+Math.random();
  globalThis[stateToken]=searchState;
  const hook=url(`export const useContentSearch=()=>({...globalThis[${JSON.stringify(stateToken)}].current,setQuery:()=>{},setResults:()=>{},setOpen:()=>{}});`);
  const catalogState={current:[]};const catalogToken=stateToken+'-catalog';globalThis[catalogToken]=catalogState;
  const react=url(`export * from ${JSON.stringify(import.meta.resolve('react'))}; import {useState as realUseState} from ${JSON.stringify(import.meta.resolve('react'))}; export function useState(initial){const queue=globalThis[${JSON.stringify(catalogToken)}].current;return realUseState(queue.length?queue.shift():initial);}`);
  const aliases={'@/components/ui/InfoDialog':shells,'@/components/ui/Ribbon':shells,'./useContentSearch':hook,
    '@/components/ui/Dialog':shells,'@/components/ui/Tooltip':shells,'@/components/ui/GameIcon':shells};
  const moduleUrl=(file,overrides={})=>{
    const full=path.join(root,file);
    const source=fs.readFileSync(full,'utf8')+(file==='src/components/ui/InfoDialog.tsx'?'\nexport {ItemBody, ContentBody};':'');
    const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
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
  const provider=moduleUrl('src/lib/i18n/LocaleProvider.tsx');aliases['@/lib/i18n/LocaleProvider']=provider;
  aliases['@/lib/i18n/LocalizedText']=moduleUrl('src/lib/i18n/LocalizedText.tsx',{'./LocaleProvider':provider});
  const catalog=moduleUrl('src/app/characters/builder/CatalogBrowser.tsx',{react});aliases['./CatalogBrowser']=catalog;
  const content=moduleUrl('src/app/characters/builder/ContentPicker.tsx');aliases['./ContentPicker']=content;
  const components={};
  for(const file of ['EquipmentSection','KitChoicesSection','BackgroundKitSection'])components[file]=(await import(moduleUrl('src/app/characters/builder/'+file+'.tsx'))).default;
  const p=await import(provider);components.CatalogBrowser=(await import(catalog)).default;components.ContentPicker=(await import(content)).default;
  const info=await import(moduleUrl('src/components/ui/InfoDialog.tsx',{react}));
  components.ItemBody=info.ItemBody;components.ContentBody=info.ContentBody;
  const render=(component,props,locale='en',search={},catalogStates=[])=>{
    searchState.current={query:'',results:[],open:false,loading:false,unavailable:false,unadmitted:[],...search};catalogState.current=[...catalogStates];
    return renderToStaticMarkup(h(p.LocaleProvider,{initialLocale:locale},h(component,props))).replace(/[\t\n\r ]+/g,' ');
  };
  return {components,render};
}

export async function gearUiFixtures(renderer,locale='en') {
  const {CLASS_KITS}=await import('../../src/lib/srd/starting-kit-data.ts');
  const {GENRE_KITS}=await import('../../src/lib/srd/genre-kits.ts');
  const {resolveKit}=await import('../../src/lib/srd/starting-kit.ts');
  const {expandBackgroundGear}=await import('../../src/lib/srd/gear-choices.ts');
  const view=await import('../../src/lib/i18n/gear-ui-presentations.ts');
  const {characterLabel}=await import('../../src/lib/i18n/character-presentations.ts');
  const result=[],none=()=>{};
  const add=(name,component,props,search,catalog)=>result.push({name,html:renderer.render(renderer.components[component],props,locale,search,catalog)});
  const training={armor:['heavy'],weapons:['martial']};
  for(const[className,kit]of Object.entries({...CLASS_KITS,...GENRE_KITS})){
    const variants=[['first',null]];kit.lines.forEach((line,at)=>line.options.forEach((_option,index)=>{if(index)variants.push([at+'/'+index,{options:kit.lines.map((_row,i)=>i===at?index:0)}]);}));
    for(const[variant,sent]of variants)add('kit/'+className+'/'+variant,'KitChoicesSection',{kit,choices:resolveKit(kit,sent,training).choices,training,className:locale==='en'?className:characterLabel('class',className,locale),armorClass:view.localizedArmorClassLine(18,['Chain Mail 16','Shield +2'],locale),onOption:none,onPick:none});
  }
  for(const [name,lines,picks,tools]of [
    ['weapon',['A dagger or a light hammer'],[],[]],['weapon-second',['A dagger or a light hammer'],['Light hammer'],[]],
    ['ammo',['A shortbow with 20 arrows or a hunting trap'],[],[]],['instrument',['A lute or other musical instrument'],['Flute'],[]],
    ['tool-filled',["A set of artisan's tools of your choice"],[],["smith's tools"]],['tool-owed',["A set of artisan's tools of your choice"],[],[]],
    ['authored',['Authored {item}\n<script>'],[],[]],
  ])add('background/'+name,'BackgroundKitSection',{kit:expandBackgroundGear(lines,{picks,tools,backgroundTools:["one type of artisan's tools"]}),backgroundName:name==='authored'?'Authored {background}':characterLabel('background','Acolyte',locale),onPick:none});
  const eq=[{name:'Chain Mail',qty:1},{name:'Shield',qty:1},{name:'Torch',qty:5},{name:'Authored {item}\n<script>',qty:1,slug:'homebrew:cloud'}];
  const purse={gold:15,copper:0,source:'Authored {source}\n<script>',problems:[],wealth:null};
  for(const[name,props]of [
    ['empty',{equipment:[],suggestions:[]}],['kit',{equipment:eq,suggestions:[{name:'Longsword',note:'1d8 slashing'},{name:'Plate',note:'AC 18'}]}],
    ['starter-full',{equipment:['Backpack','Bedroll','Rations (1 day)','Rope, Hempen (50 feet)','Torch','Waterskin'].map(name=>({name,qty:1})),suggestions:[]}],
    ['problems',{equipment:eq,suggestions:[],purse:{...purse,gold:0,copper:27,problems:['Authored {problem}\n<script>','Second original problem']}}],
    ['wealth-unrolled',{equipment:[],suggestions:[],purse:{...purse,wealth:{dice:'5d4 x 10 gp',rolled:null,busy:false,error:'',onRoll:none}}}],
    ['wealth-busy',{equipment:[],suggestions:[],purse:{...purse,wealth:{dice:'5d4 x 10 gp',rolled:null,busy:true,error:'Could not reach the server to roll your starting wealth.',onRoll:none}}}],
    ['wealth-rolled',{equipment:[],suggestions:[],purse:{...purse,wealth:{dice:'5d4 x 10 gp',rolled:{faces:[1,2,3,4,1],gold:110},busy:false,error:'',onRoll:none}}}],
  ])add('equipment/'+name,'EquipmentSection',{purse,onAdd:none,onAddMany:none,onRemove:none,inputClass:'',...props});
  const row={name:'Longsword',slug:'longsword',kind:'weapon',source:'open5e',data:{},rarity:'common'};
  for(const[name,search]of [['empty',{}],['missing',{unavailable:true}],['no-match',{open:true,query:'Authored {query}\n<script>'}],['unadmitted',{unadmitted:['Authored {one}','Authored {two}']}],['rows',{open:true,query:'sword',results:[row,{...row,name:'Authored {item}\n<script>',slug:'homebrew:cloud',source:'homebrew'}]}]])add('search/'+name,'ContentPicker',{kind:'items',placeholder:'Authored placeholder',onPick:none,renderMeta:entry=>entry.rarity},search);
  const section={key:'weapons',label:'Authored section'};
  for(const[name,state]of [['closed',[]],['empty',[true,['weapons'],{},[],false,'']],['missing',[true,['weapons'],{},[],true,'']],['loading',[true,['weapons'],{},['weapons'],false,'']],['rows',[true,['weapons'],{weapons:{rows:[row],truncated:true}},[],false,'']],['filtered',[true,['weapons'],{weapons:{rows:[row],truncated:false}},[],false,'missing']]])add('catalog/'+name,'CatalogBrowser',{kind:'items',buttonLabel:'Authored browse',sections:[section],selectedNames:['Longsword'],onPick:none,onUnpick:none,recommended:{label:'Authored recommended',note:'Authored note',entries:[{name:'Dagger',note:'1d4 piercing'}]}},undefined,state);
  return result;
}
