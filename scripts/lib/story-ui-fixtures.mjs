import fs from 'node:fs';
import {openCombatRenderer} from './combat-ui-fixtures.mjs';
export const storyFile='src/app/campaigns/[campaignId]/StoryPanel.tsx';
const root=new URL('../../',import.meta.url);
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
export async function storyRenderer(sourceOf) {
 const token='odm-story-'+Math.random();const state={loaded:true,loadError:''};globalThis[token]=state;
 const bare=sourceOf??(file=>fs.readFileSync(new URL(file,root),'utf8'));
 const renderer=await openCombatRenderer({sourceOf:file=>bare(file)+(file===storyFile?'\nexport {ChapterCard,ActHeading,ArcCard,ConfirmRewindDialog};\n':''),files:[storyFile],stubs:{
  '@/lib/use-capabilities':url('export const useCapabilities=()=>({});export const offersStoryModel=()=>true;'),
  '@/lib/load-state':url('export const readLoad=()=>Promise.resolve({});export const useLoadStatus=()=>({...globalThis['+JSON.stringify(token)+'],settle:()=>{}});'),
  '@/components/ui/ContextMenu':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const ContextMenu=({as,children,className})=>h(as,{className},children);'),
  '@/components/ui/Book':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const Book=({open,title,entries})=>open?h("article",{title},entries.map(e=>h("section",{key:e.id},e.kicker+" | "+e.heading+" | "+e.body+" | "+(e.note??"")))):null;'),
  '@/components/EmptyState':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const EmptyState=({title,hint})=>h("div",null,title,hint);'),
  '@/components/DictateField':url('export const DictateField=({children})=>children;'),
  './ExportMenu':url('export const ExportMenu=()=>null;'),
  './NpcReviewPanel':url('export const NpcReviewPanel=()=>null;'),
  './PanelKit':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const KitButton=({children,onClick,title,disabled})=>h("button",{onClick,title,disabled},children);export const LoadFailed=({error,onRetry})=>h("button",{onClick:onRetry},error);export const PanelError=({children})=>h("p",{role:"alert"},children);export const PanelLoading=({label})=>label;export const RowMenu=()=>null;export const panelField="field";'),
  '@radix-ui/react-alert-dialog':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const Root=({children})=>children;export const Portal=Root;export const Overlay=()=>null;export const Content=({children,className})=>h("div",{className},children);export const Title=({children,className})=>h("h2",{className},children);export const Description=({children,className})=>h("p",{className},children);export const Cancel=({children,className})=>h("button",{className},children);'),
 }});
 return {...renderer,status:(loaded,loadError='')=>Object.assign(state,{loaded,loadError})};
}
export const chapter={id:'chapter-1',index:1,status:'closed',title:'Authored title',summary:'Authored summary {literal}.',highlights:['Authored highlight.'],act:1,saga:1};
export const openChapter={...chapter,id:'chapter-2',index:2,status:'open',summary:'',highlights:[]};
export const arc={acts:1,premise:'Authored premise.',stakes:'Authored stakes.',antagonist:'Authored adversary',finale:'Authored finale.',beats:[
 {act:1,text:'Authored current beat.',status:'active',waypoints:[{kind:'place',text:'Authored location.',done:false},{kind:'narrative',text:'Authored narrative.',done:true}]},
 {act:1,text:'Authored pending beat.',detail:'Authored detail.',status:'pending'},
 {act:1,text:'Authored played beat.',status:'done'},
 {act:1,text:'Authored skipped beat.',status:'skipped'},
 ],subArcs:[{id:'sa1',name:'Authored thread',goal:'Authored goal',status:'active'}],cast:[{id:'n1',name:'Authored NPC',role:'Authored role',agenda:'Authored agenda.',status:'active'}],events:[{id:'event1',name:'Authored event',kind:'npc_encounter',trigger:'Authored trigger',status:'pending'}],saga:{sagaIndex:2,title:'Authored saga',plannedActs:3,sketches:[{act:2,status:'sketch',milestone:'Authored milestone.',boss:{name:'Authored boss'},allies:[{name:'Authored ally'}]},{act:3,status:'sketch',milestone:'Authored next milestone.',allies:[{},{}]}],priorSagas:[{title:'Authored prior saga',resolution:'Authored resolution.'}],finaleBoss:{name:'Authored finale boss'}}};
export const arcQueue=(patch={})=>[patch.expanded??true,patch.loading??false,patch.regenerating??false,'arc' in patch?patch.arc:arc,patch.outline??'',patch.editingBeat??null,patch.addingToAct??null,patch.draft??'',patch.beatBusy??false,patch.beatError??''];
export const parentQueue=(patch={})=>[false,[1,2],0,patch.target??null,false,patch.reading??false,[{act:1,sagaIndex:1,title:'Authored act',recap:'Authored recap.'}]];
export function storyCases() {
 const q=values=>({queues:{[storyFile]:values}});
 return [
  {name:'chapter-collapsed',component:'ChapterCard',props:{campaignId:'c',chapter,steersStory:false}},
  {name:'chapter-expanded',component:'ChapterCard',props:{campaignId:'c',chapter,steersStory:true,onRewind:()=>{}},options:q([true,false,chapter.title,chapter.summary,false])},
  {name:'chapter-editing',component:'ChapterCard',props:{campaignId:'c',chapter,steersStory:true},options:q([true,true,'Authored edited title','Authored edited summary.',false])},
  {name:'chapter-no-summary',component:'ChapterCard',props:{campaignId:'c',chapter:{...chapter,title:'',summary:''},steersStory:false},options:q([true,false,'','',false])},
  {name:'act-heading',component:'ActHeading',props:{act:2,title:'Authored act title',recap:'Authored act recap.'}},
  ...[['arc-full',{}],['arc-loading',{loading:true}],['arc-empty',{arc:null}],['arc-outline',{arc:null,outline:'Authored outline.'}],['arc-editing',{editingBeat:2,draft:'Authored replacement.'}],['arc-adding',{addingToAct:1,draft:'Authored new beat.'}],['arc-busy',{regenerating:true,beatBusy:true}],['arc-refusal',{beatError:'That beat already played. Its text is part of the record now.'}]].map(([name,patch])=>({name,component:'ArcCard',props:{campaignId:'c'},options:q(arcQueue(patch))})),
  {name:'story-player',component:'StoryPanel',props:{campaignId:'c',chapters:[chapter,openChapter],steersStory:false},options:q(parentQueue())},
  {name:'story-lead',component:'StoryPanel',props:{campaignId:'c',chapters:[chapter,openChapter],steersStory:true},options:q(parentQueue())},
  {name:'story-book',component:'StoryPanel',props:{campaignId:'c',chapters:[chapter,openChapter],steersStory:false},options:q(parentQueue({reading:true}))},
  {name:'confirm-rewind',component:'ConfirmRewindDialog',props:{chapterIndex:2,warnings:['3 messages after the chapter 2 boundary will be deleted.','The active combat encounter will be discarded.','Authored warning.'],busy:false,onConfirm:()=>{},onCancel:()=>{}}},
 ];
}
