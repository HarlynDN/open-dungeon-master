import fs from 'node:fs';import {openCombatRenderer} from './combat-ui-fixtures.mjs';
export const marketFile='src/app/campaigns/[campaignId]/MarketPanel.tsx',editorFile='src/app/campaigns/[campaignId]/MarketShopEditor.tsx',pickFile='src/components/ui/ContentPick.tsx';
const root=new URL('../../',import.meta.url),url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
export async function marketRenderer(sourceOf){
 const token='odm-market-'+Math.random();const state={loaded:true,loadError:'',query:'匕首',results:[{name:'Dagger',slug:'dagger',source:'open5e',kind:'weapon',data:{}}],searches:[]};globalThis[token]=state;
 const bare=sourceOf??(file=>fs.readFileSync(new URL(file,root),'utf8'));
 const renderer=await openCombatRenderer({files:[marketFile,editorFile,pickFile],sourceOf:file=>bare(file)+(file===editorFile?'\nexport {CoinField};\n':''),stubs:{
  '@/lib/load-state':url('export const readLoad=()=>Promise.resolve({});export const useLoadStatus=()=>({...globalThis['+JSON.stringify(token)+'],settle:()=>{}});'),
  '@/components/ui/Select':url('export const Select=({label,options})=>label+" | "+options.map(row=>row.label).join(" / ");'),
  '@/components/ui/NumberStepper':url('export const NumberStepper=({label,value,suffix})=>label+" | "+value+" "+(suffix??"");'),
  '@/components/ui/ContextMenu':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const ContextMenu=({as="div",children,className})=>h(as,{className},children);'),
  '@/components/EmptyState':url('export const EmptyState=({title,hint})=>[title,hint];'),
  '@/components/ui/InfoDialog':url('export const InfoButton=()=>null;export const InfoDialog=()=>null;'),
  '@/app/characters/builder/useContentSearch':url('export function useContentSearch(kind,extra){const s=globalThis['+JSON.stringify(token)+'];s.searches.push({kind,extra});return {...s,open:true,loading:false,unavailable:false,setQuery:()=>{},setOpen:()=>{}};}'),
  './PanelKit':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const KitButton=({children,onClick,title,disabled,"aria-label":label})=>h("button",{onClick,title,disabled,"aria-label":label},children);export const LoadFailed=({error})=>error;export const PanelLoading=({label})=>label;export const SettingToggle=({children})=>children;export const panelField="field";'),
 }});
 return {...renderer,state};
}
export const shop={id:'shop',name:'Authored shop',kind:'smith',size:'village',locationId:'place',keeperNpcId:'npc',restockDays:1,preparedStock:[{itemName:'Dagger',qty:2,priceCp:150,note:'Authored note'}],locationName:'Authored place',keeperName:'Authored keeper',keeperPortrait:'',stock:[{itemName:'Dagger',qty:2,priceCp:150,askingCp:165,note:'Authored note'},{itemName:'Authored item',qty:1,priceCp:50,askingCp:55,note:''}],buys:true,markup:1.1,haggledBy:[]};
export const sheet={id:'pc',gold:3,copper:25,equipment:[{name:'Dagger',qty:2},{name:'Authored item',qty:1}]};
export const place={id:'place',name:'Authored place'},keeper={id:'npc',name:'Authored keeper'};
export const marketDraft={name:'Authored new shop',kind:'smith',size:'city',locationId:'place',keeperNpcId:'npc',stockFromPack:false};
export const marketQueue=(p={})=>['shops'in p?p.shops:[shop],p.here??place,[place],[keeper],p.canPrep??false,p.editing??'',p.busy??'',p.error??'',p.opening??false,p.draft??marketDraft,0];
export const editorDraft={name:shop.name,kind:shop.kind,size:shop.size,locationId:shop.locationId,keeperNpcId:shop.keeperNpcId,buys:true,restockDays:1,markup:'1.1'};
export const editorQueue=(p={})=>[p.draft??editorDraft,p.lines??shop.preparedStock,p.busy??'',p.error??''];
export function marketCases(){const mq=p=>({queues:{[marketFile]:marketQueue(p)}}),eq=p=>({queues:{[editorFile]:editorQueue(p)}});const mp={campaignId:'c',steersStory:false,mySheet:sheet},ep={campaignId:'c',shop,places:[place],keepers:[keeper],onSaved:()=>{},onCancel:()=>{}};
 return [
  ...[['loading',{shops:null}],['empty',{shops:[]}],['player',{}],['prep',{canPrep:true}],['opening',{canPrep:true,opening:true}],['cannot-buy',{busy:'other'}],['haggle',{error:'Haggled well: prices a step lower.'}],['refusal',{error:'Authored shop has only 1 of Dagger.'}]].map(([name,p])=>({name,component:'MarketPanel',props:mp,options:mq(p)})),
  ...[['editor',{}],['editor-empty',{lines:[]}],['editor-busy',{busy:'save'}],['editor-unnamed',{lines:[{itemName:'',qty:1,priceCp:100,note:''}]}],['editor-refusal',{error:'That place is not in this campaign.'}]].map(([name,p])=>({name,component:'MarketShopEditor',props:ep,options:eq(p)})),
  {name:'coin',component:'CoinField',props:{value:165,label:'price',onChange:()=>{}}},
  {name:'coin-draft',component:'CoinField',props:{value:165,label:'price',onChange:()=>{}},options:{queues:{[editorFile]:['2 sp 5 cp',false,'en']}}},
  {name:'catalog',component:'ContentPick',props:{kind:'items',label:'item',placeholder:'find',onPick:()=>{}}},
 ];
}
