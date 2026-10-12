// Setup display/selection/preview transport contracts; audio and child services are mocked.
import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {setupSpeechErrorText}=await import('../src/lib/i18n/setup-media-presentations.ts');
const {describeSpeechFailure,SpeechHttpError,SpeechEmptyError}=await import('../src/lib/tts-backend.ts');
const {messageScope}=await import('../src/lib/i18n/resource-scope.ts');
assert.equal(messageScope('setupMedia.voice.title'),'ui');
let failures=0;
for(const provider of ['kokoro','openai'])for(const error of [new SpeechHttpError(401,''),new SpeechHttpError(403,''),new SpeechHttpError(404,''),new SpeechHttpError(500,'Raw detail {value}'),Object.assign(new Error('timeout'),{name:'TimeoutError'}),new SpeechEmptyError(),new Error('offline')]){
 const source=describeSpeechFailure(error,{provider,v1:'http://example.test/v1'});assert.equal(setupSpeechErrorText(source,'en'),source);assert.notEqual(setupSpeechErrorText(source,'zh-CN'),source);if(source.includes('Raw detail'))assert(setupSpeechErrorText(source,'zh-CN').includes('Raw detail {value}'));failures++;
}
assert.equal(setupSpeechErrorText('External diagnostic {raw}','zh-CN'),'External diagnostic {raw}');
const file='src/app/setup/MediaSteps.tsx',url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const stubs={
 '@/app/admin/BuiltinSpeechCard':url('export const BuiltinSpeechCard=()=>null;'),
 '@/app/admin/HarnessPictureTest':url('export const HarnessPictureTest=()=>null;'),
 '@/lib/audio-devices':url('export const registerOutput=audio=>{globalThis.__setupMediaOutputs.push(audio);return audio;};export const releaseOutput=audio=>{globalThis.__setupMediaReleases.push(audio);};'),
};
const source=(path,old)=>{let text=old&&path===file?execFileSync('git',['show',`9a6d0613:${path}`],{encoding:'utf8'}):fs.readFileSync(path,'utf8');if(old&&path===file)text=text.replace("Any checkpoint works; the campaign&apos;s genre supplies the art style.","Use a checkpoint compatible with this workflow; the campaign&apos;s genre supplies the art style.");return path===file?text+'\nexport {NarrationTest};':text;};
const r=await openCombatRenderer({files:[file],stubs,sourceOf:path=>source(path,false)}),before=await openCombatRenderer({files:[file],stubs,sourceOf:path=>source(path,true)});
const stable=html=>{const ids=new Map();return html.replace(/radix-_R_[A-Za-z0-9]+_/g,id=>{if(!ids.has(id))ids.set(id,'radix-generated-'+ids.size);return ids.get(id);});};
const no=()=>{},draft={pictures:'none',comfy:{url:'',checkpoint:''},picturesKey:'',narration:'off',kokoro:{url:'',voice:''},narrationKey:''};
const scan={comfyui:{url:'http://host.test:8188',checkpoints:['native.safetensors']},kokoro:{url:'http://host.test:8880',voices:['af_heart','zf_xiaobei']},whisper:{url:'http://host.test:9000'}};
const pictureProps={draft,update:no,scan:null,scanning:false,storyIsOpenAi:false,agentPaints:false,agentVerified:false,agentLabel:'Authored Agent',onAgentVerified:no,openaiKeySaved:false};
const voiceProps={draft,update:no,scan:null,scanning:false,storyIsOpenAi:false,ttsKeySaved:false};
let renders=0;
for(const [name,props,options]of [
 ['PicturesStep',pictureProps],['PicturesStep',{...pictureProps,draft:{...draft,pictures:'comfyui'}}],['PicturesStep',{...pictureProps,scan,draft:{...draft,pictures:'comfyui'}}],
 ['PicturesStep',{...pictureProps,draft:{...draft,pictures:'openai'},openaiKeySaved:true}],['PicturesStep',{...pictureProps,draft:{...draft,pictures:'openai'},storyIsOpenAi:true}],
 ['PicturesStep',{...pictureProps,agentPaints:true,agentVerified:true,draft:{...draft,pictures:'agent'}}],['PicturesStep',{...pictureProps,agentPaints:true}],
 ['VoiceStep',voiceProps],['VoiceStep',{...voiceProps,scan,draft:{...draft,narration:'kokoro'}}],['VoiceStep',{...voiceProps,draft:{...draft,narration:'kokoro'}}],
 ['VoiceStep',{...voiceProps,draft:{...draft,narration:'openai'},ttsKeySaved:true}],['VoiceStep',{...voiceProps,draft:{...draft,narration:'openai'},storyIsOpenAi:true}],
 ['NarrationTest',{body:{provider:'kokoro'}},{queues:{[file]:[false,{ok:true,model:'RawModel',voice:'RawVoice'}]}}],
 ['NarrationTest',{body:{provider:'kokoro'}},{queues:{[file]:[false,{ok:false,error:'The Kokoro speech server took too long to answer.'}]}}],
 ]){assert.equal(stable(r.render(name,props,'en',options)),stable(before.render(name,props,'en',options)),name);renders++;}
let changed,verified=false;
let html=r.render('PicturesStep',{...pictureProps,scan,agentPaints:true,draft:{...draft,pictures:'comfyui'},update:change=>changed=change(draft),onAgentVerified:()=>verified=true},'zh-CN');assert(html.includes('ComfyUI 地址')&&html.includes('兼容的模型'));
r.elements().find(e=>e.props.title==='此电脑上的 ComfyUI').props.onPick();assert.deepEqual(changed.comfy,{url:scan.comfyui.url,checkpoint:'native.safetensors'});assert.equal(changed.pictures,'comfyui');
const files=r.elements().find(e=>e.props.label==='模型文件（checkpoint）'&&e.props.options);assert.deepEqual(files.props.options,[{value:'native.safetensors',label:'native.safetensors'}]);files.props.onChange('other.safetensors');assert.equal(changed.comfy.checkpoint,'other.safetensors');
r.render('PicturesStep',{...pictureProps,agentPaints:true,draft:{...draft,pictures:'agent'},onAgentVerified:()=>verified=true},'zh-CN');r.elements().find(e=>e.props.offerAdopt===false).props.onVerified();assert(verified);
html=r.render('VoiceStep',{...voiceProps,scan,draft:{...draft,narration:'kokoro'},update:change=>changed=change(draft)},'zh-CN');assert(html.includes('默认声音')&&html.includes('host.test:9000'));
r.elements().find(e=>e.props.title==='此电脑上的 Kokoro').props.onPick();assert.deepEqual(changed.kokoro,{url:scan.kokoro.url,voice:'af_heart'});assert.equal(changed.narration,'kokoro');r.elements().find(e=>e.props.label==='默认声音'&&e.props.options).props.onChange('zf_xiaobei');assert.equal(changed.kokoro.voice,'zf_xiaobei');
html=r.render('PicturesStep',{...pictureProps,draft:{...draft,pictures:'openai'},openaiKeySaved:true,update:change=>changed=change(draft)},'zh-CN');assert(html.includes('留空可保留'));r.elements().find(e=>e.type==='input'&&e.props.type==='password').props.onChange({target:{value:'typed-fixture-key'}});assert.equal(changed.picturesKey,'typed-fixture-key');
const originalFetch=globalThis.fetch,originalAudio=globalThis.Audio;globalThis.__setupMediaOutputs=[];globalThis.__setupMediaReleases=[];const calls=[];
try{
 globalThis.Audio=class{constructor(src){this.src=src;}pause(){}play(){return Promise.resolve();}};
 const body={provider:'kokoro',kokoroUrl:'http://host.test:8880',voice:'zf_xiaobei'};
 globalThis.fetch=async(path,options)=>{calls.push({path,body:JSON.parse(options.body)});return {ok:true,json:async()=>({ok:true,model:'raw-model',voice:'zf_xiaobei',audio:'fixture-audio'})};};
 r.render('NarrationTest',{body},'zh-CN');await r.elements().find(e=>e.type==='button').props.onClick();assert.deepEqual(calls.at(-1),{path:'/api/admin/tts-test',body});assert.equal(globalThis.__setupMediaOutputs[0].src,'fixture-audio');assert(r.updates().some(row=>row.at===0&&row.value===false));
 for(const response of [{ok:false,data:{ok:true,audio:'bad'}},{ok:true,data:{ok:true}},{ok:true,data:{ok:false,error:'Raw diagnostic'}}]){
  globalThis.fetch=async()=>({ok:response.ok,json:async()=>response.data});r.render('NarrationTest',{body},'zh-CN');await r.elements().find(e=>e.type==='button').props.onClick();assert(r.updates().some(row=>row.at===1&&row.value?.ok===false));assert.equal(globalThis.__setupMediaOutputs.length,1);
 }
 globalThis.fetch=async()=>{throw new Error('offline');};r.render('NarrationTest',{body},'zh-CN');await r.elements().find(e=>e.type==='button').props.onClick();assert(r.updates().some(row=>row.at===1&&row.value?.error==='Could not reach this server.'));assert(r.updates().some(row=>row.at===0&&row.value===false));
}finally{globalThis.fetch=originalFetch;globalThis.Audio=originalAudio;delete globalThis.__setupMediaOutputs;delete globalThis.__setupMediaReleases;}
console.log(`PASS: ${renders} English renders (one explicit checkpoint-copy correction and generated IDs normalized), ${failures} actual speech-failure frames, bilingual media chrome and unchanged provider/model/voice/key/request callbacks; unreadable/refused/no-audio/network preview handling with mock fetch/audio. No media services, real playback, installs or Chinese STT.`);
