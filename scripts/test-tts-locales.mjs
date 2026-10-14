// One grouped locale/voice/request/cache/UI check, with mock audio transport.
// Does not claim real Kokoro audio, acoustic quality or browser playback.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {openWorld} from './lib/enforce-world.mjs';
const {planSpeech,speechRequests,chunkSentences}=await import('../src/lib/tts-segments.ts');
const {localeNarratorVoice,voiceSupportsLocale}=await import('../src/lib/tts-locale.ts');
const {synthesizeSpeech,voicesForLocale}=await import('../src/lib/tts-backend.ts');
const {renderSpeech}=await import('../src/lib/tts-render.ts');
const {enqueueNarrationAudio,voicePreviewName,renderVoicePreview,narrationAudioPath}=await import('../src/lib/tts.ts');
const {normalizeGameSettings}=await import('../src/lib/schemas/game-settings.ts');
const {openCombatRenderer}=await import('./lib/combat-ui-fixtures.mjs');
const w=await openWorld({gameSettings:{locale:'zh-CN'}}),hero=w.addHero({name:'阿明',class:'fighter',level:3});
w.signIn({id:hero.userId});
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'odm-tts-locale-')),cwd=process.cwd(),savedFetch=globalThis.fetch;
process.chdir(dir);process.env.TTS_PROVIDER='kokoro';process.env.KOKORO_URL='http://speech.test';process.env.TTS_MODEL='kokoro';process.env.TTS_VOICE='af_heart';
const calls=[];
globalThis.fetch=async(url,init={})=>{
 const address=String(url);
 if(new URL(address).pathname.endsWith('/audio/voices'))return Response.json({voices:['af_heart','bm_fable','zf_001','zm_010']});
 if(address.endsWith('/audio/speech')){const body=JSON.parse(init.body);calls.push(body);return new Response(Buffer.from('mock-audio:'+body.input));}
 throw new Error('Unexpected network in locale test: '+address);
};
try{
 assert.equal(localeNarratorVoice('af_heart','zh-CN'),'zf_001');assert.equal(localeNarratorVoice('bm_fable','en'),'bm_fable');assert.equal(localeNarratorVoice('zf_001','en'),'af_heart');
 assert.equal(localeNarratorVoice('af_heart','zh-CN','zm_010'),'zm_010');assert.equal(localeNarratorVoice('Custom narrator','zh-CN'),'Custom narrator');assert.equal(voiceSupportsLocale('af_heart(30)+bm_fable(70)','zh-CN'),false);
 assert.deepEqual(voicesForLocale(['af_heart','bm_fable','zf_001'],'zh-CN'),['zf_001']);
 const text='“准备好了吗？”她问。你还有两个一环法术位；现在掷先攻！'+('前方传来脚步声……随后陷入寂静。'.repeat(25));
 const plan=planSpeech(text,{locale:'zh-CN',narratorVoice:'af_heart',cast:[{name:'她',voiceId:'bm_fable',speed:1.1}],speaker:{kind:'npc',id:'n',name:'她'}});
 assert.equal(plan.length,1);assert.equal(plan[0].voice,'zf_001');assert.equal(plan[0].speaker,null);
 const requests=speechRequests(plan);assert.ok(requests.length>2);assert.ok(Array.from(requests[0].text).length<=80);assert.ok(requests.every(r=>Array.from(r.text).length<=160&&r.locale==='zh-CN'&&r.voice==='zf_001'));
 assert.equal(requests.map(r=>r.text).join('').replace(/\s/g,''),text.replace(/\s/g,''));
 assert.deepEqual(chunkSentences('你好。”再见。',4,4,'zh-CN'),['你好。”','再见。']);
 const emoji=chunkSentences('甲'.repeat(79)+'😀乙'.repeat(100),80,160,'zh-CN');assert.equal(emoji.join(''),'甲'.repeat(79)+'😀乙'.repeat(100));assert.ok(emoji.every(s=>!/[\uD800-\uDBFF]$/.test(s)&&! /^[\uDC00-\uDFFF]/.test(s)));
 const backend={provider:'kokoro',v1:'http://speech.test/v1',model:'kokoro',apiKey:'',defaultVoice:'af_heart'};
 await synthesizeSpeech('恢复7点生命值，掷1d20。','af_heart',1,backend,'zh-CN');assert.equal(calls.at(-1).voice,'zf_001');assert.equal(calls.at(-1).lang_code,'z');assert.equal(calls.at(-1).model,'kokoro-v1.1-zh');
 await synthesizeSpeech('Roll for initiative.','bm_fable',1,backend);assert.equal(calls.at(-1).voice,'bm_fable');assert.ok(!Object.hasOwn(calls.at(-1),'lang_code'));
 const shared={text:'Cache language 7',voice:'Custom narrator',speed:1};let before=calls.length;
 await renderSpeech([shared,{...shared,locale:'zh-CN'}],backend);assert.equal(calls.length,before+2);await renderSpeech([{...shared,locale:'zh-CN'}],backend);assert.equal(calls.length,before+2);
 assert.notEqual(voicePreviewName('af_heart',backend),voicePreviewName('af_heart',backend,'zh-CN'));
 assert.notEqual(voicePreviewName('af_heart',backend,'zh-CN'),voicePreviewName('af_heart',{...backend,defaultVoice:'zm_010'},'zh-CN'));
 before=calls.length;await renderVoicePreview('af_heart','zh-CN');assert.match(calls.at(-1).input,/七点生命值/);await renderVoicePreview('af_heart','zh-CN');assert.equal(calls.length,before+1);await renderVoicePreview('af_heart');assert.match(calls.at(-1).input,/The tavern door/);assert.equal(calls.length,before+2);
 const route=await w.route('tts/voices');const response=await route.GET(new Request('http://test/api/tts/voices?locale=zh-CN'));assert.equal(response.status,200);const list=await response.json();assert.deepEqual(list.voices.map(v=>v.id),['zf_001','zm_010']);assert.equal(list.defaultVoice,'zf_001');
 const message=w.say('dm',text);before=calls.length;await enqueueNarrationAudio(w.campaignId,message.id,text,[],{locale:'zh-CN',ttsVoice:'af_heart',ttsAutoCast:true},{kind:'npc',id:'n',name:'她'});
 assert.ok(calls.length>before);assert.ok(calls.slice(before).every(c=>c.voice==='zf_001'&&c.lang_code==='z'));assert.ok(fs.existsSync(narrationAudioPath(w.campaignId,message.id)));
 const files=['src/components/VoicePicker.tsx','src/app/create-campaign/NarratorFields.tsx','src/app/campaigns/[campaignId]/CharacterVoices.tsx'];
 const renderer=await openCombatRenderer({files});
 const picker=renderer.render('VoicePicker',{value:'af_heart',speechLocale:'zh-CN',label:'Narrator',onChange(){}},'zh-CN');assert.match(picker,/zf_001/);assert.ok(!picker.includes('温暖女声'));
 const settings=normalizeGameSettings({locale:'zh-CN',ttsEnabled:true,ttsVoice:'af_heart',ttsAutoCast:true});
 const creator=renderer.render('NarratorFields',{draft:settings,patch(){},gates:{aiNarrates:true,solo:false}},'en');assert.match(creator,/one narrator voice/);
 const characters=renderer.render('CharacterVoices',{campaignId:w.campaignId,settings,steersStory:true,patch(){}},'zh-CN');assert.match(characters,/单旁白/);assert.ok(!characters.includes('自动分配'));
 const castRoute=await w.route('campaigns/[campaignId]/voices');w.signIn(w.owner);const denied=await castRoute.POST(new Request('http://test/cast',{method:'POST'}),{params:Promise.resolve({campaignId:w.campaignId})});assert.equal(denied.status,409);
 console.log('TTS locales passed: Unicode sentence/quote/hard boundaries, one Chinese narrator despite cast settings, Chinese Kokoro language/voice payloads, English request parity, clip/preview locale and fallback-voice cache isolation, actual narration queue and voice/cast routes, bilingual creator/voice UI. Audio transport is mocked; real service/playback remains pending.');
}finally{globalThis.fetch=savedFetch;process.chdir(cwd);fs.rmSync(dir,{recursive:true,force:true});w.close();}
