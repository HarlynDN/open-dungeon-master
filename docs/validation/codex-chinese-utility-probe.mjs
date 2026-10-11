import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {randomBytes} from 'node:crypto';
import {register} from 'node:module';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'odm-codex-utility-'));
process.env.SQLITE_DB_PATH=path.join(dir,'test.sqlite');
process.env.DB_ENCRYPTION_KEY=randomBytes(32).toString('hex');
delete process.env.HARNESS_FAKE;
process.on('exit',()=>fs.rmSync(dir,{recursive:true,force:true}));
setTimeout(()=>{console.error('Utility acceptance timed out');process.exit(1);},210000).unref();
register('file:///Users/haolindeng/Documents/Projects/open-dungeon-master/scripts/lib/register-alias.mjs',import.meta.url);
const {saveGlobalConfig}=await import('file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/db/app-settings.ts');
const {requestUtilityMessage}=await import('file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/dm/model.ts');
const {activeBridgeSessions}=await import('file:///Users/haolindeng/Documents/Projects/open-dungeon-master/src/lib/harness/bridge.ts');
saveGlobalConfig({harness:{id:'codex',model:'gpt-6-astra',utilityModel:'gpt-6-astra'},text:{provider:'harness'}});
let streamed='';
const started=Date.now();
const result=await requestUtilityMessage({textProvider:'harness',utilityProvider:'harness',utilityModel:''},[
 {role:'system',content:'Summarize the supplied game facts in JSON. Keep keys summary, characterId, hp and needsHelp exactly; return a single JSON object with no markdown fences. Do not invent details.'},
 {role:'user',content:'角色 char_123 的生命值为 8，位于渡口，需要人帮助搬走挡路的货车。'}
],{locale:'zh-CN',timeoutMs:180000,onDelta:part=>streamed+=part});
assert.ok(!result.error,result.error?await result.error.text():'');
const content=String(result.message?.content??'');
const data=JSON.parse(content);
assert.deepEqual(Object.keys(data).sort(),['characterId','hp','needsHelp','summary'].sort());
assert.equal(data.characterId,'char_123');assert.equal(data.hp,8);assert.equal(data.needsHelp,true);
assert.match(data.summary,/\p{Script=Han}/u);assert.match(data.summary,/渡口/);assert.match(data.summary,/货车/);
assert.ok(streamed.length>0,'No streamed utility output');assert.equal(activeBridgeSessions(),0);
console.log(JSON.stringify({status:'PASS',model:'gpt-6-astra',role:'utility',locale:'zh-CN',ms:Date.now()-started,streamed:streamed.length>0,result:data},null,2));
process.exit(0);
