// Material/ritual display and usable inventory examples; no model or full suite.
import assert from 'node:assert/strict';
import './lib/combat-ui-fixtures.mjs';
const {bundledSpellFacts,bundledSpellNames}=await import('../src/lib/srd/spell-facts.ts');
const {materialPlan,materialComponents}=await import('../src/lib/dm/cast-materials.ts');
const {ritualProblem,longCastingProblem}=await import('../src/lib/dm/cast-rules.ts');
const {handComponentText,handRefusalText,handRuleText}=await import('../src/lib/i18n/hand-material-presentations.ts');
const numbers=text=>text.match(/\d[\d,]*(?:\.\d+)?/g);
const sheet={name:"Mira: [v2]'s 3.7",equipment:[],gold:0,copper:0,class:'wizard',classes:[],features:[],feats:[]};
const snapshot=structuredClone(sheet),descriptions=new Set();let refused=0;
const check=(raw)=>{assert.equal(typeof raw,'string');const zh=handRefusalText(raw,'zh-CN');assert.notEqual(zh,raw,raw);assert.equal(handRefusalText(raw,'en'),raw);assert.deepEqual(numbers(zh),numbers(raw));if(raw.includes(sheet.name))assert(zh.includes(sheet.name));const example=/like "([^"]+)"/.exec(raw)?.[1];if(example)assert(zh.includes('"'+example+'"'));refused++;return zh;};
for(const name of bundledSpellNames()){
 const facts=bundledSpellFacts(name);
 if(facts?.materialText)descriptions.add(facts.materialText.replace(/\.$/,''));
 const components=materialComponents(facts);
 for(const c of components)if(c.what)descriptions.add(c.what.replace(/\.$/,''));
 if(!components.length)continue;
 for(const inFight of [false,true]){const result=materialPlan(sheet,facts,{inFight,units:1});assert('error' in result,name);check(result.error);}
}
for(const raw of descriptions){const zh=handComponentText(raw,'zh-CN');assert.notEqual(zh,raw,raw);assert.equal(handComponentText(raw,'en'),raw);assert.deepEqual(numbers(zh),numbers(raw));}
for(const raw of ['2 × platinum ring worth 50 gp each','diamond worth 1000 gp, which the spell consumes',' worth 0.5 gp, which the spell consumes']){const zh=handComponentText(raw,'zh-CN');assert.notEqual(zh,raw);assert.deepEqual(numbers(zh),numbers(raw));}
for(const raw of ['Jade dust worth 20 gp','2 × jade dust worth 20 gp each, which the spell consumes','Authored material — unchanged.'])assert.equal(handComponentText(raw,'zh-CN'),raw);
check(materialPlan(sheet,bundledSpellFacts('Imprisonment'),{inFight:true}).error);
// A partially carried component must not be described as wholly absent. The
// unchanged example is usable by the engine when copied into the inventory.
const clone=bundledSpellFacts('Clone');assert(clone);
const partial={...sheet,equipment:[{name:'Diamond (400 gp)',qty:2},{name:'Vessel (2000 gp)',qty:1}]};
const partialSnapshot=structuredClone(partial);
const missing=materialPlan(partial,clone,{inFight:true});assert('error' in missing);
const zh=check(missing.error);assert(zh.includes('材料不足'));assert(!zh.includes('未携带'));
const example=/like "([^"]+)"/.exec(missing.error)?.[1];assert.equal(example,'Diamond (200 gp)');
const supplied=materialPlan({...partial,equipment:[...partial.equipment,{name:example,qty:1}]},clone,{inFight:true});assert.equal(supplied.kind,'components');assert(supplied.uses.some(use=>use.itemName===example));assert.deepEqual(partial,partialSnapshot);
const detect=bundledSpellFacts('Detect Magic');assert(detect?.ritual);
for(const [spell,facts,caster,inFight]of [['',null,sheet,false],['Authored spell',null,sheet,false],['Fireball',bundledSpellFacts('Fireball'),sheet,false],['Detect Magic',detect,{...sheet,class:'fighter'},false],['Detect Magic',detect,sheet,true]])check(ritualProblem(caster,spell,facts,inFight));
for(const time of [1,10,60,120])check(longCastingProblem({...detect,castingTime:time},true));
const unknown='Authored spell takes an authored interval to cast, far longer than a turn; it cannot be cast in the middle of a fight. It can be cast once the fight is over.';assert.equal(handRefusalText(unknown,'zh-CN'),unknown);
assert.equal(handRuleText('Wolf form.','zh-CN'),'狼形态。');assert.equal(handRuleText('Named authored beast form.','zh-CN'),'Named authored beast形态。');
assert.deepEqual(sheet,snapshot);
console.log('PASS: '+descriptions.size+' native material descriptions, '+refused+' material/ritual/casting refusals, quantities/values/consumption, partial inventory and copyable canonical example; source state unchanged.');
