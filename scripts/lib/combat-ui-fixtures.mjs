import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {register} from 'node:module';
import ts from 'typescript';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import '../../src/lib/i18n/messages.ts';
register('./register-routes.mjs',import.meta.url);
const root=path.resolve(import.meta.dirname,'../..');
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');

// Render actual owned JSX with transport/device discovery replaced. Seeded
// state exercises failures and editable panels without issuing mutations.
export async function openCombatRenderer({sourceOf=file=>fs.readFileSync(path.join(root,file),'utf8')}={}) {
  const state={queues:{},diceSources:{},pixels:[],elements:[],confirmations:[],confirmReplies:[],updates:[],cursors:{}};
  const token='odm-combat-ui-'+Math.random();globalThis[token]=state;
  const shells=url(`export const GameIcon=()=>null;export const appConfirm=async(...args)=>{const s=globalThis[${JSON.stringify(token)}];s.confirmations.push(args);return s.confirmReplies.shift()??false;};`);
  const devices=url(`export const useDiceSources=()=>[globalThis[${JSON.stringify(token)}].diceSources];
    export const resolveFaceSource=(preferred)=>preferred??{kind:'manual'};
    export const getConnectedPixels=()=>globalThis[${JSON.stringify(token)}].pixels;
    export const getConnectedPixelsServer=getConnectedPixels;
    export const onPixelsChanged=()=>()=>{};export const onPixelRoll=()=>()=>{};
    export const supportsShake=()=>false;export const useShakeToRoll=()=>false;
    export const onShake=()=>()=>{};export const buzz=()=>{};`);
  const aliases={'@/components/ui/GameIcon':shells,'@/components/ui/ConfirmDialog':shells,
    '@/lib/dice/dice-sources':devices,'@/lib/dice/pixels-dice':devices,'@/lib/dice/shake-to-roll':devices};
  aliases['react/jsx-runtime']=url(`import {jsx as realJsx,jsxs as realJsxs} from ${JSON.stringify(import.meta.resolve('react/jsx-runtime'))};
    export {Fragment} from ${JSON.stringify(import.meta.resolve('react/jsx-runtime'))};
    const capture=(fn,type,props,key)=>{globalThis[${JSON.stringify(token)}].elements.push({type,props});return fn(type,props,key);};
    export const jsx=(type,props,key)=>capture(realJsx,type,props,key);export const jsxs=(type,props,key)=>capture(realJsxs,type,props,key);`);
  const cache=new Map();
  const moduleUrl=file=>{
    if(cache.has(file))return cache.get(file);
    const full=path.join(root,file);
    const react=url(`export * from ${JSON.stringify(import.meta.resolve('react'))};import {useState as realUseState} from ${JSON.stringify(import.meta.resolve('react'))};
      export function useState(initial){const s=globalThis[${JSON.stringify(token)}],file=${JSON.stringify(file)},queue=s.queues[file];
        const at=s.cursors[file]??0;s.cursors[file]=at+1;const [value,set]=realUseState(queue?.length?queue.shift():initial);
        return [value,next=>{s.updates.push({file,at,value:next});set(next);}];}`);
    const compiled=ts.transpileModule(sourceOf(file),{compilerOptions:{module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
    const linked=url(compiled.replace(/from (["'])([^"']+)\1/g,(_all,_quote,spec)=>{
      let target=aliases[spec]??(spec==='react'?react:null);
      if(!target){
        if(spec.startsWith('.')||spec.startsWith('@/')){
          const bare=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(full),spec);
          const found=['','.ts','.tsx','/index.ts','/index.tsx'].map(ext=>bare+ext).find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
          if(!found)throw new Error('Cannot resolve '+spec+' from '+file);
          target=found.endsWith('.tsx')?moduleUrl(path.relative(root,found)):pathToFileURL(found).href;
        }else target=import.meta.resolve(spec);
      }
      return 'from '+JSON.stringify(target);
    }));
    cache.set(file,linked);return linked;
  };
  const provider=moduleUrl('src/lib/i18n/LocaleProvider.tsx');aliases['@/lib/i18n/LocaleProvider']=provider;
  const components={};
  for(const file of ['RollCard','PendingRollCard','SkillCheckCard','EncounterPanel','DmInitiativePanel','BoardChrome','CinematicParts'])Object.assign(components,await import(moduleUrl(`src/app/campaigns/[campaignId]/${file}.tsx`)));
  const {LocaleProvider}=await import(provider);
  const render=(component,props,locale='en',options={})=>{
    state.queues=structuredClone(options.queues??{});state.diceSources=options.diceSources??{};state.pixels=options.pixels??[];
    state.elements=[];state.confirmations=[];state.confirmReplies=[...(options.confirmReplies??[])];state.updates=[];state.cursors={};
    return renderToStaticMarkup(h(LocaleProvider,{initialLocale:locale},h(components[component],props))).replace(/[\t\n\r ]+/g,' ');
  };
  return {components,render,elements:()=>state.elements,confirmations:()=>state.confirmations,updates:()=>state.updates};
}

export function combatUiFixtures(renderer,locale='en') {
  const result=[];const add=(name,component,props,options)=>result.push({name,html:renderer.render(component,props,locale,options)});
  const baseRoll={id:'r',campaignId:'c',characterId:'hero',requestedBy:'dm',kind:'skill_check',detail:'perception',expression:'1d20+3',advantage:'none',dc:12,total:15,success:true,breakdown:{expression:'1d20+3',total:15,terms:[{kind:'dice',sign:1,count:1,sides:20,dice:[{sides:20,value:12,kept:true}],subtotal:12},{kind:'modifier',sign:1,value:3}]},visibility:'public',messageId:null,targetEnemyId:null,applied:false,attacker:null,createdAt:'2020-01-01T00:00:00Z'};
  for(const [name,patch]of [['success',{}],['failure',{success:false,total:8}],['blind',{hidden:true,breakdown:{terms:[]}}],['nat20',{dc:null,success:null,total:23,breakdown:{...baseRoll.breakdown,crit:'nat20'}}],['nat1',{dc:null,success:null,total:4,breakdown:{...baseRoll.breakdown,crit:'nat1'}}],['enemy',{kind:'attack',detail:'Club vs Aria',attacker:{kind:'enemy',id:'e1',name:'Goblin 2'}}],['authored',{kind:'custom',detail:'Authored {detail} <script>'}]])add('roll/'+name,'RollCard',{roll:{...baseRoll,...patch},characterName:'Aria'});
  add('modifier','ModifierBreakdown',{expression:'2d20kh1+3+1d4',caption:'Authored caption'});
  const pending={id:'pending',userId:'u',characterId:'hero',kind:'skill_check',detail:'perception',expression:'1d20+3',advantage:'none',dc:12,reason:'Authored reason',createdAt:'2020-01-01T00:00:00Z'};
  const props={campaignId:'c',pending,sheets:[{id:'hero',name:'Aria',inspiration:true}],members:[{userId:'u',useRealDice:true,holdRolls:false}],meUserId:'u',steersStory:false};
  const pendingFile='src/app/campaigns/[campaignId]/PendingRollCard.tsx';
  for(const [name,patch,options]of [['manual',{}],['advantage',{pending:{...pending,advantage:'advantage'}}],['disadvantage',{pending:{...pending,advantage:'disadvantage'}}],['waiting',{meUserId:'other',steersStory:true}],['held',{members:[{userId:'u',holdRolls:true,useRealDice:false}]}],['digital',{}, {diceSources:{20:{kind:'digital'}}}],['pixel',{}, {diceSources:{20:{kind:'pixel',name:'Authored die',systemId:'px'}}}],['error',{}, {queues:{[pendingFile]:[{},false,'Could not submit the roll.']}}]])add('pending/'+name,'PendingRollCard',{...props,...patch},options);
  const enemy={id:'e1',name:'Goblin 1',type:'humanoid',cr:0.25,status:'alive',health:'healthy',conditions:[],groupKey:'g'};
  const encounter={id:'fight',round:2,orderReady:true,order:[{kind:'pc',id:'hero',name:'Aria',initiative:15},{kind:'enemy',id:'e1',name:'Goblin 1',initiative:10}],turnIndex:0,enemies:[enemy],enemiesDue:[]};
  for(const [name,patch]of [['normal',{}],['initiative',{orderReady:false,staged:[{name:'Goblin 1',kind:'enemy',id:'e1',initiative:10}]}],['mob',{enemies:[enemy,{...enemy,id:'e2',name:'Goblin 2'}]}],['fled',{enemies:[{...enemy,status:'fled'}]}],['knocked-out',{enemies:[{...enemy,health:'dead',knockedOut:true}]}],['regenerating',{enemies:[{...enemy,health:'dead',regenerating:{stopped:false}}]}],['regeneration-stopped',{enemies:[{...enemy,health:'dead',regenerating:{stopped:true}}]}],['dm-health',{enemies:[{...enemy,currentHp:3,maxHp:8,ac:13,legendary:{actions:1,actionsMax:3,resistances:2,resistancesMax:3}}]}]])add('encounter/'+name,'EncounterPanel',{campaignId:'c',encounter:{...encounter,...patch},steersStory:true,canEditOrder:name==='dm-health'});
  for(const [name,patch,options]of [['normal',{}],['waiting',{orderReady:false,staged:[{name:'Goblin 1',kind:'enemy',id:'e1',initiative:10}]}],['due',{enemiesDue:[{id:'e1',name:'Goblin 1',acted:false}]}],['companion',{companionTurn:{name:'Aria'}}],['hidden-reflex',{order:[{kind:'pc',id:'hero',name:'Aria',initiative:15,hidden:true,reflex:true}]}],['adding',{}, {queues:{'src/app/campaigns/[campaignId]/DmInitiativePanel.tsx':[false,'',true,'Authored NPC',12]}}]])add('order/'+name,'DmInitiativePanel',{campaignId:'c',encounter:{...encounter,...patch}},options);
  add('rail','InitiativeRail',{encounter,round:2,faceOf:()=>[],onOpen:()=>{}});
  add('hud/own','TurnHud',{actorName:'Aria',mine:true,budget:{action:true,bonus:false,reaction:true},speedLeftFeet:15,ac:16,hp:{current:4,max:10}});
  add('hud/other','TurnHud',{actorName:'Aria',mine:false});
  add('condition','ConditionChip',{label:'poisoned',rounds:2,note:'Authored note'});
  add('condition/authored','ConditionChip',{label:'Authored condition',note:'Authored note'});
  const token={id:'e1',name:'Goblin 1',kind:'enemy',x:2,y:2};
  add('plate','TokenPlate',{token,boardWidth:10,boardHeight:10,footprint:1,face:[],health:'critical',conditions:[{id:'poisoned',label:'poisoned',rounds:2}],edge:{blocked:false,cover:5,flanking:true,hostileBeside:true,adjacent:false}});
  add('targets/empty','TargetChips',{targets:[],onPick:()=>{}});
  add('targets/full','TargetChips',{targets:[{token,face:[],health:'bloodied',feet:15}],onPick:()=>{}});
  return result;
}
