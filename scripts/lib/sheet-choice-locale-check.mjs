// Isolated cold client: English UI can submit a Chinese campaign action even
// when that campaign's content catalog has not been delivered on the page.
import assert from 'node:assert/strict';
import {openSheetDialogRenderer, dialogSheet} from './sheet-dialog-fixtures.mjs';
import {messageScope} from '../../src/lib/i18n/resource-scope.ts';
import {catalogFor} from '../../src/lib/i18n/translator.ts';
const renderer=await openSheetDialogRenderer();
const catalogs=globalThis.__odmLocaleResources.catalogs;
catalogs['zh-CN']=Object.fromEntries(Object.entries(catalogs['zh-CN']).filter(([key])=>messageScope(key)==='ui'));
assert.equal(catalogFor('zh-CN')['sheetDialog.choice.action'],undefined);
const calls=[];
let resolveRequest;
const requestSent=new Promise(resolve=>{resolveRequest=resolve;});
globalThis.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});resolveRequest();return Response.json({ok:true});};
renderer.render('FeatureChoicePicker',{
  sheet:dialogSheet({class:'barbarian',subclass:'Path of the Totem Warrior',features:[{name:'Totem Spirit'}]}),
  mine:true,inCombat:false,campaignLocale:'zh-CN',
},'en');
const button=renderer.elements().find(({type,props})=>type==='button'&&props.title==='Choose Bear');
assert.ok(button);button.props.onClick();await requestSent;
assert.equal(calls.length,1);
assert.equal(calls[0].body.content,'我为图腾精魂选择熊。');
assert.deepEqual(calls[0].body.intent,{card:'feature',resourceId:'Totem Spirit',variant:'Bear'});
console.log('cold campaign locale: one correctly localized action');
