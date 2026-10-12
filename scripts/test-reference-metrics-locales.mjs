// Grouped numeric presentation/provenance checks; no model, database or browser calls.
import assert from 'node:assert/strict';
import {register} from 'node:module';
import {openCombatRenderer} from './lib/combat-ui-fixtures.mjs';
register('./lib/register-alias.mjs',import.meta.url);
const {CALCULATORS}=await import('../src/lib/reference/calculators.ts');
const {buildCompare}=await import('../src/lib/reference/compare.ts');
const {metricText,calculatorChoice,comparisonName,compareCellView,metricNotice}=await import('../src/lib/i18n/reference-metrics-presentations.ts');
const digits=text=>text.match(/[+-]?\d+(?:[,.]\d+)*/g)??[];
let cases=0;
for(const calc of CALCULATORS){
 assert.notEqual(metricText(calc.label,'zh-CN'),calc.label);assert.notEqual(metricText(calc.blurb,'zh-CN'),calc.blurb);
 for(const field of calc.fields){assert.notEqual(metricText(field.label,'zh-CN'),field.label);if(field.kind==='choice')for(const option of field.options){assert.equal(calculatorChoice(field,option,'en'),option.label);if(!option.label.startsWith('CR '))assert.notEqual(calculatorChoice(field,option,'zh-CN'),option.label);}}
 for(const patch of [{},...(calc.id==='travel'?[{pace:'slow',hours:9},{pace:'fast',hours:10}]:calc.id==='carrying'?[{size:'huge',coins:250},{size:'tiny',coins:1}]:calc.id==='treasure'?[{kind:'individual',cr:'0'}]:[])]){
  const input={...calc.defaults,...patch},native=calc.run(input),frozen=JSON.stringify(native);
  for(const [value,section]of [[native.headline,calc.id==='encounter-budget'?'verdict':'calc'],...native.parts.flatMap(part=>[[part.label,'calc'],[part.value,calc.id==='spell-dc'?'difficulty':'calc'],[part.detail,'calc']]),[native.note,'calc']]){
   if(!value)continue;assert.equal(metricText(value,'en',section),value);const zh=metricText(value,'zh-CN',section);assert.deepEqual(digits(zh).sort(),digits(value).sort(),value);
   assert(!/[A-Za-z]/.test(zh.replace(/CR|DC|XP|\d+d\d+|x\d+(?:\.\d+)?/g,'')),`unreviewed calculator output: ${value} => ${zh}`);
  }
  assert.equal(JSON.stringify(native),frozen);cases++;
 }
}
assert.equal(metricText('Medium','zh-CN','verdict'),'适中');assert.equal(metricText('Medium','zh-CN','size'),'中型');
assert.equal(compareCellView('spells','Level',{text:'level 3'},'zh-CN').text,'3环');
assert.equal(compareCellView('spells','Duration',{text:'Concentration, up to 1 minute'},'zh-CN').text,'专注，最长 1 分钟');
assert.deepEqual(compareCellView('spells','Components',{text:'V, S, M',detail:'Authored material {raw}'},'zh-CN'),{text:'V, S, M',detail:'Authored material {raw}'});
assert.equal(compareCellView('monsters','Saving throws',{text:'STR +1 DEX -2 CON +3 INT +0 WIS +1 CHA -1'},'zh-CN').text,'力量 +1 敏捷 -2 体质 +3 智力 +0 感知 +1 魅力 -1');
assert.equal(metricNotice('Nothing on file for "private:slug".','zh-CN'),'未找到条目“private:slug”。');assert.equal(metricNotice('Unrecognized upstream error {raw}','zh-CN'),'Unrecognized upstream error {raw}');
const subjects=[{slug:'magic-missile',name:'Magic Missile',source:'open5e',documentSlug:'wotc-srd',data:{level:1,school:'evocation',range:'120 feet',desc:'3d4+3 damage'}},{slug:'homebrew:own',name:'Magic Missile',source:'homebrew',data:{level:2,school:'Authored school',material:'Authored material'}}];
const table=buildCompare('spells',subjects);assert(!('error'in table));assert.equal(table.columns[0].documentSlug,'wotc-srd');assert(!('documentSlug'in table.columns[1]));assert.equal(comparisonName('spells',table.columns[0],'zh-CN'),'魔法飞弹');assert.equal(comparisonName('spells',table.columns[1],'zh-CN'),'Magic Missile');assert.equal(comparisonName('spells',{...table.columns[0],documentSlug:'third-party'},'zh-CN'),'Magic Missile');
const calculatorFile='src/app/reference/CalculatorsPanel.tsx',compareFile='src/app/reference/ComparePanel.tsx';
const r=await openCombatRenderer({files:[calculatorFile,compareFile]});
const html=r.render('CalculatorsPanel',{},'zh-CN',{queues:{[calculatorFile]:['carrying',{}]}});assert(html.includes('负重能力')&&html.includes('磅'));
r.elements().find(e=>e.props.label==='体型'&&e.props.options).props.onChange('huge');const update=r.updates().find(u=>u.at===1);assert.equal(update.value({carrying:{strength:14,size:'medium',coins:0}}).carrying.size,'huge');
let removed;const comparison=r.render('ComparePanel',{selection:{kind:'spells',entries:table.columns},onRemove:slug=>removed=slug,onClear:()=>{}},'zh-CN',{queues:{[compareFile]:[table,'',false,false]}});assert(comparison.includes('魔法飞弹')&&comparison.includes('Magic Missile')&&comparison.includes('法术环阶'));
r.elements().find(e=>e.props['aria-label']==='移除 魔法飞弹').props.onClick();assert.equal(removed,'magic-missile');
console.log(`PASS: ${cases} calculator result/metadata cases preserve raw English and numeric values; context-specific terms, generated comparison facts, additive source provenance/authored prose and native option/remove callbacks. No real services.`);
