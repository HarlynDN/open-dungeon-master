import {openCombatRenderer} from './combat-ui-fixtures.mjs';
import {HELP_TOURS} from '../../src/lib/i18n/app-help-metadata.ts';
export const helpFile='src/components/HelpDialog.tsx';
export const partsFile='src/components/HelpParts.tsx';
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
export function helpRenderer(sourceOf) {
  return openCombatRenderer({sourceOf,files:[helpFile,partsFile],stubs:{
    '@/components/ui/Dialog':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const Dialog=({open,title,children})=>open?h("article",null,h("h2",null,title),children):null;'),
    'next/link':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export default function Link({href,className,children}){return h("a",{href,className},children);}'),
  }});
}
export function helpCases() {
  const onOpenChange=()=>{};
  const tours=HELP_TOURS.map(row=>({label:row.label,detail:row.detail,onStart:()=>{}}));
  return [
    {name:'open',props:{open:true,onOpenChange}},
    {name:'tours',props:{open:true,onOpenChange,tours}},
    {name:'closed',props:{open:false,onOpenChange}},
    {name:'searched',props:{open:true,onOpenChange},options:{queues:{[partsFile]:['Dice']}}},
    {name:'no-match',props:{open:true,onOpenChange},options:{queues:{[partsFile]:['no-topic-match']}}},
  ];
}
