// Real local service + ODM narration queue, isolated DB. No DM model calls.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {openWorld} from './lib/enforce-world.mjs';
const {enqueueNarrationAudio,narrationAudioPath}=await import('../src/lib/tts.ts');
const {saveGlobalConfig}=await import('../src/lib/db/app-settings.ts');
const output=path.resolve(process.argv[2] ?? path.join(os.tmpdir(),'odm-dual-narration'));
fs.mkdirSync(output,{recursive:true});
const w=await openWorld({gameSettings:{locale:'zh-CN'}});
saveGlobalConfig({speech:{ttsProvider:'kokoro',kokoroUrl:process.env.KOKORO_ROUTER_URL ?? 'http://127.0.0.1:8881',ttsModel:'kokoro',ttsVoice:'af_heart',ttsApiKey:''}});
const saved=globalThis.fetch,calls=[];
globalThis.fetch=async(url,init)=>{
 if(String(url).endsWith('/audio/speech')) calls.push(JSON.parse(init.body));
 return saved(url,init);
};
try{
 const rows=[];
 for(const [locale,voice,text] of [
  ['zh-CN','zm_095','夜色笼罩着古老的神殿。你推开石门，听见远处传来脚步声。米拉施放魔法飞弹，哥布林受到七点伤害。现在，你准备怎么做？'.repeat(4)],
  ['en','bm_fable','The tavern door creaks open. Roll for initiative, adventurer.'],
 ]){
  const message=w.say('dm',text),before=calls.length;
  await enqueueNarrationAudio(w.campaignId,message.id,text,{locale,ttsVoice:voice});
  const file=narrationAudioPath(w.campaignId,message.id);assert.ok(fs.existsSync(file));
  const requests=calls.slice(before);assert.ok(requests.length>0);
  assert.ok(requests.every(r=>r.model===(locale==='en'?'kokoro':'kokoro-v1.1-zh')&&r.voice===voice));
  if(locale==='zh-CN')assert.ok(requests.length>1);
  const first=fs.readFileSync(file),count=calls.length;
  await enqueueNarrationAudio(w.campaignId,message.id,text,{locale,ttsVoice:voice});
  assert.equal(calls.length,count,'same model/text/voice replay must reuse clips');
  assert.deepEqual(fs.readFileSync(file),first);
  fs.writeFileSync(path.join(output,locale+'.mp3'),first);
  rows.push({locale,voice,model:requests[0].model,chunks:requests.length,bytes:first.length,replayCacheHit:true});
 }
 fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(rows,null,2));
 console.log(JSON.stringify(rows,null,2));
}finally{globalThis.fetch=saved;w.close();}
