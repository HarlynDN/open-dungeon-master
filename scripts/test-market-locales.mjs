// Display/input adapters and fake transport only; no real trades/shop deletion.
import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {marketRenderer,marketCases,marketFile,editorFile,shop,sheet,place,keeper,marketQueue,editorQueue,editorDraft,marketDraft} from './lib/market-ui-fixtures.mjs';
const {marketCoinText,parseMarketCoins,marketText}=await import('../src/lib/i18n/market-presentations.ts');
const {formatCopper,parseCoins}=await import('../src/lib/srd/currency.ts');
const r=await marketRenderer();const q=(f,v)=>({queues:{[f]:v}});const hash=s=>createHash('sha256').update(s).digest('hex');
const golden=JSON.parse(fs.readFileSync(new URL('./fixtures/market-ui-en.json',import.meta.url),'utf8')).sha256;
for(const row of marketCases())assert.equal(hash(r.render(row.component,row.props,'en',row.options)),golden[row.name],row.name+' English');
for(const cp of [0,1,9,10,25,99,100,165,999,1000,12345,100000000]){
 assert.equal(marketCoinText(cp,'en'),formatCopper(cp));assert.equal(parseMarketCoins(marketCoinText(cp,'zh-CN'),'zh-CN'),cp);
}
for(const [input,cp]of [['2 银币 5 铜币',25],['2银币5铜币',25],['1.5金币',150],['１金币２银币',120],['1银金币',50],['1铂金币',1000],['2 gp 5铜币',205],['.5金币',50],['1,000金币',100000]])assert.equal(parseMarketCoins(input,'zh-CN'),cp,input);
for(const input of ['2未知币','1金币2unknown','1/2金币','1.2.3金币','-1金币'])assert.equal(parseMarketCoins(input,'zh-CN'),null,input);assert.equal(parseMarketCoins('2 银币','en'),null);
for(const input of ['15 gp','2 sp 5 cp','2 pp 5 sp','1.5','5 arrows'])assert.equal(parseMarketCoins(input,'en'),parseCoins(input));
const mp={campaignId:'c',steersStory:false,mySheet:sheet},ep={campaignId:'c',shop,places:[place],keepers:[keeper],onSaved:()=>{},onCancel:()=>{}};
let html=r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));assert(html.includes('匕首')&&html.includes('Authored shop')&&html.includes('金币')&&html.includes('Authored note'));
assert(r.elements().filter(e=>e.props.items).some(e=>e.props.items.some(row=>row.id==='buy'&&row.label.includes('购买'))));
const refusals=['No such shop.','That place is not in this campaign.',"That keeper is not in this campaign's cast.",'Authored shop has only 1 of Dagger.','Dagger x1 costs 2 gp; 阿明 carries 1 gp. They cannot afford it.','Authored shop does not buy.','阿明 does not carry "Dagger".',"阿明 already tried their luck with Authored shop's keeper.",'The pack has no price for "Dagger"; pass priceCp for what the keeper pays each.','Authored shop does not stock "Dagger". On the shelf: nothing.','No shop called "Authored shop" here. Open one with open_shop first.','阿明 can carry 150 lb (Strength x 15) and would be carrying 160 lb with Dagger. They cannot carry it: give it to someone else, leave something behind, or drag it (the lift tool) at 5 feet. Nothing was bought.'];
for(const source of refusals){assert.equal(marketText(source,'en'),source);assert.notEqual(marketText(source,'zh-CN'),source);}
assert.equal(marketText('Authored refusal {raw}.','zh-CN'),'Authored refusal {raw}.');
assert(marketText('Haggled well: prices a step lower.','zh-CN').includes('降低一档'));
let coin; r.render('CoinField',{value:165,label:'price',onChange:value=>coin=value},'en',q(editorFile,['2 银币 5 铜币',false,'zh-CN']));
const field=r.elements().find(e=>e.type==='input').props;field.onKeyDown({key:'Enter',nativeEvent:{isComposing:true}});assert.equal(coin,undefined);field.onBlur();assert.equal(coin,25,'draft uses the locale in which it was entered');
r.render('ContentPick',{kind:'items',label:'item',placeholder:'find',onPick:()=>{}},'zh-CN');assert(r.state.searches.at(-1).extra.locale==='zh-CN');assert(r.elements().some(e=>e.props.label==='匕首'));
const oldFetch=globalThis.fetch,calls=[];let mode='ok';globalThis.fetch=async(url,init)=>{calls.push({url,method:init?.method,body:init?.body?JSON.parse(init.body):null});if(mode==='network')throw new Error('synthetic network');return new Response(JSON.stringify(mode==='refuse'?{error:'No such shop.'}:{result:{success:true,prices:'a step lower'},shop:{id:'new-shop'}}),{status:mode==='refuse'?409:200});};
const tick=()=>new Promise(resolve=>setImmediate(resolve));const text=e=>Array.isArray(e.props.children)?e.props.children.filter(x=>typeof x==='string').join(''):e.props.children;
try{
 r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));r.elements().find(e=>e.props.items?.some(row=>row.id==='buy')).props.items.find(row=>row.id==='buy').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/shops/shop/trade',method:'POST',body:{action:'buy',item:'Dagger',qty:1,characterId:'pc'}});
 r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));r.elements().find(e=>e.props.onClick&&Array.isArray(e.props.children)&&e.props.children.includes('匕首')).props.onClick();await tick();assert.deepEqual(calls.pop().body,{action:'sell',item:'Dagger',qty:1,characterId:'pc'});
 r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));r.elements().find(e=>e.props.items?.some(row=>row.id==='haggle')).props.items.find(row=>row.id==='haggle').onSelect();await tick();assert.equal(calls.pop().body.action,'haggle');assert(r.updates().some(u=>u.at===7&&u.value==='Haggled well: prices a step lower.'));
 r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue({canPrep:true,opening:true})));r.elements().find(e=>e.props.onClick&&text(e)==='开张').props.onClick();await tick();assert.deepEqual(calls.pop().body,marketDraft);
 r.render('MarketPanel',mp,'zh-CN',{...q(marketFile,marketQueue({canPrep:true})),confirmReplies:[false]});r.elements().find(e=>e.props.items?.some(row=>row.id==='close')).props.items.find(row=>row.id==='close').onSelect();await tick();assert.equal(calls.length,0);assert.equal(r.confirmations()[0].args?.[0]??r.confirmations()[0][0],'永久关闭Authored shop？');
 r.render('MarketPanel',mp,'zh-CN',{...q(marketFile,marketQueue({canPrep:true})),confirmReplies:[true]});r.elements().find(e=>e.props.items?.some(row=>row.id==='close')).props.items.find(row=>row.id==='close').onSelect();await tick();assert.deepEqual(calls.pop(),{url:'/api/campaigns/c/shops/shop',method:'DELETE',body:null});
 mode='network';r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));r.elements().find(e=>e.props.items?.some(row=>row.id==='buy')).props.items.find(row=>row.id==='buy').onSelect();await tick();assert(r.updates().some(u=>u.at===7&&u.value==='Could not reach the server.'));calls.length=0;mode='ok';
 let saved=0;r.render('MarketShopEditor',{...ep,onSaved:()=>saved++},'zh-CN',q(editorFile,editorQueue()));r.elements().find(e=>e.props.onClick&&text(e)==='保存商店').props.onClick();await tick();assert.deepEqual(calls.pop().body,{...editorDraft,markup:1.1,stock:shop.preparedStock});assert.equal(saved,1);
 r.render('MarketShopEditor',ep,'zh-CN',q(editorFile,editorQueue()));r.elements().find(e=>e.props.onClick&&Array.isArray(e.props.children)&&e.props.children.includes(' 立即补货')).props.onClick();await tick();assert.deepEqual(calls.pop().body,{restock:true});
 let selected;r.render('ContentPick',{kind:'items',label:'item',placeholder:'find',onPick:entry=>selected=entry.name},'zh-CN');r.elements().find(e=>e.type==='button').props.onClick();assert.equal(selected,'Dagger');
}finally{globalThis.fetch=oldFetch;}
r.state.loadError='The market did not load. The server could not be reached.';html=r.render('MarketPanel',mp,'zh-CN',q(marketFile,marketQueue()));assert(html.includes('Authored shop')&&html.includes('无法连接服务器'));
console.log('PASS: 16 English market/editor/picker states, currency round-trips and held input locale, canonical trade/create/save/restock requests, Chinese catalog query/picks, confirmation cancellation and retained stock on failed reload (mock transport only).');
