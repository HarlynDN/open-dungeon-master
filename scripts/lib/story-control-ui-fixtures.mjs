import {openCombatRenderer} from './combat-ui-fixtures.mjs';
export const npcFile='src/app/campaigns/[campaignId]/NpcReviewPanel.tsx';
export const aiFile='src/app/campaigns/[campaignId]/StoryAiPanel.tsx';
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
export function controlRenderer(sourceOf){return openCombatRenderer({sourceOf,files:[npcFile,aiFile],stubs:{
 '@/components/ui/Select':url('export const Select=({label,options})=>label+" | "+options.map(row=>row.label).join(" / ");'),
 '@/lib/shell-host':url('export const shellHost=()=>null;'),
 '@/app/campaigns/[campaignId]/NarrationNote':url('export const ImagesNote=()=>null;'),
}});}
export const npcs=[
 {id:'n1',name:'Authored one',aliases:['Authored alias','Alias {literal}'],attitude:'friendly',location:'Authored location',archived:false},
 {id:'n2',name:'Authored two',aliases:[],attitude:'hostile',location:'',archived:true},
];
export const suggestions=[{name:'Authored one',matches:'Authored two'}];
export const npcQueue=(patch={})=>[patch.npcs??npcs,patch.suggestions??suggestions,patch.loaded??true,patch.busy??false,patch.error??'',patch.renaming??null,patch.draft??'',patch.loadError??''];
export const settings={textProvider:'custom',customBaseUrl:'http://127.0.0.1:8080/v1',customModel:'Authored model',customApiKey:'',utilityProvider:'custom',utilityModel:'Authored utility',utilityBaseUrl:'http://127.0.0.1:8081/v1',utilityApiKey:'',imageGenerationEnabled:true,imageBackend:'comfyui',imageMode:'fast',aspect:'square',autoImages:true,proseSize:'medium'};
export const kept='\u0000keep';
export const drafts={customBaseUrl:settings.customBaseUrl,customModel:settings.customModel,customApiKey:kept,utilityBaseUrl:settings.utilityBaseUrl,utilityModel:settings.utilityModel,utilityApiKey:kept};
export const aiQueue=(patch={})=>[patch.busy??false,patch.error??'',patch.hasCustomKey??false,patch.hasUtilityKey??false,patch.imagesConfigured??true,patch.imagesReady??true,'deviceManaged' in patch?patch.deviceManaged:false,patch.serverManaged??false,patch.harness??null,patch.drafts??drafts];
export function controlCases(){
 const nq=values=>({queues:{[npcFile]:values}}),aq=values=>({queues:{[aiFile]:values}});
 return [
  ...[['npc-loading',{loaded:false}],['npc-empty',{npcs:[],suggestions:[]}],['npc-roster',{}],['npc-edit',{renaming:'n1',draft:'Authored rename'}],['npc-busy',{busy:true}],['npc-error',{error:'Those two could not be merged.'}]].map(([name,patch])=>({name,component:'NpcReviewPanel',props:{campaignId:'c'},options:nq(npcQueue(patch))})),
  ...[['ai-player',false,{},{}],['ai-custom',true,{},{}],['ai-keys',true,{}, {hasCustomKey:true,hasUtilityKey:true}],['ai-local',true,{textProvider:'local',utilityProvider:'local'},{}],['ai-none',true,{textProvider:'none',utilityModel:'',imageGenerationEnabled:false},{}],['ai-harness',true,{textProvider:'harness',imageBackend:'harness'},{harness:{offered:true,pictures:true,label:'Authored agent',model:'Authored agent model'}}],['ai-device',true,{}, {deviceManaged:true}],['ai-server',true,{}, {serverManaged:true}],['ai-device-loading',true,{}, {deviceManaged:null}],['ai-images-missing',true,{}, {imagesConfigured:false}],['ai-key-device',true,{imageBackend:'openai'},{deviceManaged:true,imagesReady:false}],['ai-key-server',true,{imageBackend:'openai'},{serverManaged:true,imagesReady:false}],['ai-key-campaign',true,{imageBackend:'openai'},{imagesReady:false}],['ai-error',true,{}, {error:'That change was not saved.'}]].map(([name,steersStory,s,p])=>({name,component:'StoryAiPanel',props:{campaignId:'c',settings:{...settings,...s},steersStory},options:aq(aiQueue(p))})),
 ];
}
