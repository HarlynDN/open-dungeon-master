// Exercise the real builder hook, not a duplicated AC formula. No model/network.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
const {srdRaceOptions,srdClassOptions,srdBackgroundOptions}=await import('../src/lib/characters/options.ts');
const file='src/app/characters/builder/useBuilderDerived.ts';
const r=await openCombatRenderer({files:[file],sourceOf:path=>fs.readFileSync(path,'utf8')+(path===file?`
import {useBuilderState} from './useBuilderState.ts';
export function ArmorProbe({races,classes,backgrounds,styles,equipment}){
 const initial=useBuilderState({races,classes,backgrounds});
 const state={...initial,stylePicks:styles,scores:{str:15,dex:13,con:14,int:8,wis:12,cha:10},keepsStoredGear:true,equipment};
 const result=useBuilderDerived({state,race:races.find(x=>x.id==='hill_dwarf'),klass:classes.find(x=>x.id==='fighter'),background:backgrounds.find(x=>x.id==='acolyte')});
 return <output data-ac={result.ac}/>;
}`:'')});
const base={races:srdRaceOptions(),classes:srdClassOptions(),backgrounds:srdBackgroundOptions()};
for(const locale of ['en','zh-CN']){
 for(const [styles,equipment,expected] of [
  [[],[{name:'Chain mail',qty:1},{name:'Shield',qty:1}],18],
  [['defense'],[{name:'Chain mail',qty:1},{name:'Shield',qty:1}],19],
  [['archery'],[{name:'Chain mail',qty:1},{name:'Shield',qty:1}],18],
  [['defense'],[],11],
 ]){
  r.render('ArmorProbe',{...base,styles,equipment},locale);
  assert.equal(r.elements().find(e=>e.type==='output').props['data-ac'],expected,JSON.stringify({locale,styles,equipment}));
 }
}
console.log('PASS: real builder armor preview includes Defense only while armored, preserves other styles/base AC, and agrees across locales.');
