// Main-play UI must include literal dynamic imports; computed paths stay unknown.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {parseUiSource,uiModuleSpecifier} from './lib/ui-localization.mjs';
const paths=source=>{const found=[];const visit=node=>{const value=uiModuleSpecifier(node);if(value!==null)found.push(value);ts.forEachChild(node,visit);};visit(parseUiSource('fixture.tsx',source));return found;};
assert.deepEqual(paths(`import A from './static'; export { B } from './exports';
 const L=lazy(()=>import('@/app/lazy').then(m=>({default:m.Page})));
 const D=dynamic(()=>import(\`./template\`)); const json=import('./json',{with:{type:'json'}});
 const unknown=import('./'+selected); const interpolated=import(\`./\${selected}\`);`),['./static','./exports','@/app/lazy','./template','./json']);
const actual=fs.readFileSync(new URL('../src/app/campaigns/[campaignId]/SessionView.tsx',import.meta.url),'utf8');
assert(paths(actual).includes('@/app/campaigns/[campaignId]/LevelUpDialog'));
const manifest=JSON.parse(fs.readFileSync(new URL('../docs/validation/ui-localization.json',import.meta.url),'utf8'));
assert(manifest.files.some(row=>row.path==='src/app/campaigns/[campaignId]/LevelUpDialog.tsx'));
console.log('PASS: static imports/exports, literal lazy/dynamic imports and import options; computed paths excluded; actual guided level-up belongs to the main-flow manifest.');
