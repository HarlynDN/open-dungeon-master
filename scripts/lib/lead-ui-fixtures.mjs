import fs from 'node:fs';import {openCombatRenderer} from './combat-ui-fixtures.mjs';
export const leadFile='src/app/campaigns/[campaignId]/LeadPanel.tsx';const root=new URL('../../',import.meta.url),url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
export async function leadRenderer(sourceOf){const token='odm-lead-'+Math.random();const copies=[];globalThis[token]=copies;const bare=sourceOf??(file=>fs.readFileSync(new URL(file,root),'utf8'));
 const r=await openCombatRenderer({files:[leadFile],sourceOf:file=>bare(file)+(file===leadFile?'\nexport {InvitesCard,LeadSeatCard};\n':''),stubs:{
 '@/lib/clipboard':url('export const copyText=async(text)=>{globalThis['+JSON.stringify(token)+'].push(text);return false;};'),
 '@/components/InviteShareDialog':url('export const InviteShareDialog=()=>null;'),
 '@/app/campaigns/[campaignId]/EditCampaignDialog':url('export const EditCampaignDialog=()=>null;'),
 '@/app/campaigns/[campaignId]/LeadFloorControl':url('export const LeadFloorControl=()=>null;'),
 '@/app/campaigns/[campaignId]/DmEncounterPrepPanel':url('export const DmEncounterPrepPanel=()=>null;'),
 '@/app/campaigns/[campaignId]/DmMapLibraryPanel':url('export const DmMapLibraryPanel=()=>null;'),
 '@/app/campaigns/[campaignId]/DirectorPanel':url('export const DirectorArmedBanner=()=>null;export const DirectorPresets=()=>null;'),
 '@/app/campaigns/[campaignId]/NotesPanel':url('export const PendingNotesList=()=>null;export const pendingCampaignNotes=notes=>notes.filter(note=>note.status==="pending");'),
 './PanelKit':url('import {createElement as h} from "'+import.meta.resolve('react')+'";export const KitButton=({children,onClick,title})=>h("button",{onClick,title},children);export const PanelError=({children})=>h("p",{role:"alert"},children);'),
 }});return {...r,copies};}
export const members=[{userId:'lead',username:'Authored lead'},{userId:'dm',username:'Authored DM'},{userId:'next',username:'用户 {literal}'},{userId:'other',username:'Authored other'}];
export const sheets=[{id:'pc',userId:'next',name:'阿明',isCompanion:false},{id:'companion',userId:'other',name:'Authored companion',isCompanion:true}];
export const seatProps={campaignId:'c',members,sheets,leadUserId:'lead',dmUserIds:['dm']};
export const inviteProps={campaignId:'c',inviteCode:'A1B2C3',midGameJoinOpen:true,steersStory:true};
export const panelProps={campaignId:'c',campaign:{id:'c',title:'Authored campaign',description:'Authored premise',theme:'Authored theme',maxPlayers:4,startingLevel:3,difficulty:'normal',dmUserId:'dm',gameSettings:{dmMode:'ai'}},floor:{mode:'open'},sheets,members,notes:[],refreshNotes:async()=>{},meUserId:'lead',inviteCode:'A1B2C3',midGameJoinOpen:true,canTransferLead:true,leadUserId:'lead',steersStory:true,isLead:true};
export function leadCases(){const q=v=>({queues:{[leadFile]:v}});return[
 {name:'invites-open',component:'InvitesCard',props:inviteProps,options:q([false,false,'','https://example.test'])},
 {name:'invites-closed',component:'InvitesCard',props:{...inviteProps,midGameJoinOpen:false}},
 {name:'invites-readonly',component:'InvitesCard',props:{...inviteProps,steersStory:false}},
 {name:'invites-refusal',component:'InvitesCard',props:inviteProps,options:q([false,false,'That change was not saved.',''])},
 {name:'seat',component:'LeadSeatCard',props:seatProps},
 {name:'seat-empty',component:'LeadSeatCard',props:{...seatProps,members:members.slice(0,2)}},
 {name:'seat-refusal',component:'LeadSeatCard',props:seatProps,options:q(['','That user is not in this campaign.'])},
 {name:'panel-ai',component:'LeadPanel',props:panelProps},
 {name:'panel-prep',component:'LeadPanel',props:panelProps,options:q([false,true])},
 ];}
