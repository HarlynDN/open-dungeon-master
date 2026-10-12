// One grouped scratch-database and display check. No real inbox, browser
// notification permission, model, audio or external message transport.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {randomBytes} from 'node:crypto';
import {register} from 'node:module';
import {removeTempDir} from './lib/remove-temp-dir.mjs';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'odm-entry-inbox-'));
process.env.SQLITE_DB_PATH=path.join(dir,'test.sqlite');
process.env.DB_ENCRYPTION_KEY=randomBytes(32).toString('hex');
register('./lib/register-alias.mjs',import.meta.url);
try {
 const {openCombatRenderer}=await import('./lib/combat-ui-fixtures.mjs');
 const {createUser,updateUserSettings}=await import('../src/lib/db/users.ts');
 const {getDatabase}=await import('../src/lib/db/core.ts');
 const {getCampaignById}=await import('../src/lib/db/campaigns.ts');
 const {notifyUsers,listNotifications,unreadCount,markNotificationsRead}=await import('../src/lib/db/notifications.ts');
 const {NOTIFICATION_FIELDS,parseNotificationPresentation}=await import('../src/lib/notification-presentations.ts');
 const {notificationText}=await import('../src/lib/i18n/notification-presentations.ts');
 const {STARTER_ONE_SHOT,createStarterCampaign}=await import('../src/lib/starter/one-shot.ts');
 const {starterMaterial}=await import('../src/lib/i18n/starter-material-presentations.ts');
 const {pregenSummaries}=await import('../src/lib/starter/pregens.ts');
 const {pregenText}=await import('../src/lib/i18n/entry-character-presentations.ts');
 const {createScheduledSession}=await import('../src/lib/db/scheduling.ts');
 const {runJobsOnce}=await import('../src/lib/jobs.ts');
 const host=createUser('Host','x'),other=createUser('Other','x');
 const english=createStarterCampaign(host.id,{solo:false});
 assert.equal(english.title,STARTER_ONE_SHOT.title);assert.equal(english.description,STARTER_ONE_SHOT.description);
 updateUserSettings(host.id,{uiLocale:'zh-CN'});
 const chinese=createStarterCampaign(host.id,{solo:true});
 assert.equal(chinese.gameSettings.locale,'zh-CN');assert.equal(chinese.maxPlayers,1);
 assert.equal(chinese.description,starterMaterial(STARTER_ONE_SHOT,'zh-CN').description);
 assert.notEqual(chinese.title,english.title);
 assert.equal(getCampaignById(chinese.id).dmOutline,STARTER_ONE_SHOT.outline);
 assert.equal(getCampaignById(english.id).dmOutline,STARTER_ONE_SHOT.outline);
 const explicit=createStarterCampaign(host.id,{solo:false,locale:'en'});assert.equal(explicit.title,english.title);assert.equal(explicit.gameSettings.locale,'en');
 assert.equal(starterMaterial({...STARTER_ONE_SHOT,description:'Authored premise.'},'zh-CN').description,'Authored premise.');
 const params={actor:'Authored {actor}',campaign:'Authored campaign {when}',roomCode:'ABC123',session:'',startsAt:'2026-10-14T22:30:00.000Z'};
 for(const code of Object.keys(NOTIFICATION_FIELDS)){
  const presentation={code,params:Object.fromEntries(NOTIFICATION_FIELDS[code].map(field=>[field,params[field]]))};
  notifyUsers([host.id],{kind:code,body:`Exact English ${code}.`,presentation});
  const row=listNotifications(host.id,200).find(row=>row.kind===code);assert.deepEqual(row.presentation,presentation);
  assert.equal(notificationText(row,'en'),row.body);assert.notEqual(notificationText(row,'zh-CN'),row.body);
  if('actor' in presentation.params)assert(notificationText(row,'zh-CN').includes(params.actor));
  if('campaign' in presentation.params)assert(notificationText(row,'zh-CN').includes(params.campaign));
  if('startsAt' in presentation.params)assert(notificationText(row,'zh-CN').includes('22:30 UTC'));
 }
 notifyUsers([host.id],{kind:'legacy',body:'Original old notification.'});
 const legacy=listNotifications(host.id).find(row=>row.kind==='legacy');assert(!Object.hasOwn(legacy,'presentation'));assert.equal(notificationText(legacy,'zh-CN'),legacy.body);
 getDatabase().prepare('UPDATE notifications SET presentation_json=? WHERE id=?').run('{broken',legacy.id);
 assert(!Object.hasOwn(listNotifications(host.id).find(row=>row.id===legacy.id),'presentation'));
 for(const value of [{code:'unknown',params:{}},{code:'friendRequest',params:{}},{code:'sessionSoon',params:{campaign:'c',session:'s',startsAt:'bad'}}])assert.equal(parseNotificationPresentation(value),undefined);
 assert(unreadCount(host.id)>0);assert.equal(unreadCount(other.id),0);markNotificationsRead(other.id,legacy.id);assert.equal(listNotifications(host.id).find(row=>row.id===legacy.id).readAt,null);
 markNotificationsRead(host.id,legacy.id);assert(listNotifications(host.id).find(row=>row.id===legacy.id).readAt);
 const now=Date.now();createScheduledSession(english.id,host.id,{title:'',startsAt:new Date(now+30*60_000).toISOString(),durationMin:60,note:''});
 runJobsOnce(now);const soon=listNotifications(host.id,200).find(row=>row.kind==='session_reminder');assert(soon?.presentation);assert.equal(soon.presentation.params.session,'');assert(notificationText(soon,'zh-CN').includes('本次聚会'));
 runJobsOnce(now+30*60_000);assert(listNotifications(host.id,200).some(row=>row.kind==='session_starting'&&row.presentation?.code==='sessionStarting'));
 const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
 const starterFile='src/app/home/StarterDialog.tsx',bellFile='src/components/NotificationBell.tsx';
 const r=await openCombatRenderer({files:[starterFile,bellFile],stubs:{'@/components/ui/Dialog':url('export const Dialog=({children})=>children;')}});
 const originalFetch=globalThis.fetch,calls=[];globalThis.fetch=async(address,init)=>{calls.push({address,body:JSON.parse(init.body)});return new Response(JSON.stringify({campaign:{id:'native-campaign'}}),{status:201});};
 try {
  for(const locale of ['en','zh-CN']){
   const material=starterMaterial(STARTER_ONE_SHOT,locale);
   const data={oneShot:material,pregens:pregenSummaries().map(hero=>({...hero,tagline:pregenText(hero.id,'tagline',hero.tagline,locale),blurb:pregenText(hero.id,'blurb',hero.blurb,locale)}))};
   const props={open:true,onOpenChange:()=>{},onCreated:id=>assert.equal(id,'native-campaign')};
   const html=r.render('StarterDialog',props,locale,{queues:{[starterFile]:[{locale,data},'',null,false,0,null]}});
   assert(html.includes(material.title.replaceAll("'",'&#x27;')));assert(html.includes(data.pregens[0].tagline));
   const button=r.elements().find(e=>e.type==='button'&&e.props['aria-busy']===false);await button.props.onClick();assert.deepEqual(calls.pop(),{address:'/api/starter',body:{solo:true,locale}});
   const legacyAndNew=[legacy,listNotifications(host.id).find(row=>row.kind==='friendRequest')];
   const bell=r.render('NotificationBell',{},locale,{queues:{[bellFile]:[true,legacyAndNew,2]}});
   assert(bell.includes(legacy.body));assert(bell.includes(notificationText(legacyAndNew[1],locale)));
  }
  const failed=r.render('StarterDialog',{open:true,onOpenChange:()=>{},onCreated:()=>{}},'zh-CN',{queues:{[starterFile]:[null,'',null,false,0,'zh-CN']}});
  assert(failed.includes('重试'));r.elements().find(e=>e.type==='button'&&e.props.children==='重试').props.onClick();
  const retry=r.updates().find(u=>u.at===4);assert.equal(retry.value(0),1);
  assert(r.updates().some(u=>u.at===5&&u.value===null));
 }finally{globalThis.fetch=originalFetch;}
 console.log('PASS: original English and locale-inherited/explicit starter creation, source-bound premise and pregen cards, unchanged DM outline; all new notification facts persist with English/Chinese display, UTC instant and authored names; old/malformed inbox bodies, read isolation, actual reminder jobs, bilingual starter/bell render and canonical creation/retry callbacks.');
}finally{await removeTempDir(dir);}
