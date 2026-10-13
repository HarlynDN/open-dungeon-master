// The character-sheet PDF builder in Node: a fighter comes out as a real PDF
// with a fillable form. The portrait path is the browser's job (WebP is
// transcoded there, see src/lib/pdf/download.ts); here the sheet has none,
// which is the common case for a fresh character anyway.
import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import { register } from "node:module";
import { PDFDocument } from "pdf-lib";

register("./lib/register-alias.mjs", import.meta.url);

const { buildCharacterSheetPdf, libraryToPdfCharacter } = await import(
  "../src/lib/pdf/character-sheet-pdf.ts"
);
const { createSheetSchema } = await import("../src/lib/schemas/sheet.ts");

let passed = 0;
async function test(name, fn) {
  await fn();
  passed += 1;
}

const sheet = createSheetSchema.parse({
  name: "Brunhilde Ironvow",
  race: "human",
  class: "fighter",
  abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
  maxHp: 12,
  ac: 16,
  hitDice: { die: "d10", total: 1, spent: 0 },
  proficiencies: {
    saves: ["str", "con"],
    skills: ["athletics", "perception"],
    languages: ["common"],
    tools: [],
    armor: ["all armor", "shields"],
    weapons: ["simple weapons", "martial weapons"],
  },
  equipment: [{ name: "Longsword", qty: 1 }, { name: "Chain mail", qty: 1 }],
  features: [{ name: "Second Wind", source: "class", level: 1 }],
});

await test("a fighter builds to a PDF with a fillable form", async () => {
  const character = libraryToPdfCharacter({
    name: sheet.name,
    race: sheet.race,
    class: sheet.class,
    subclass: "",
    background: "soldier",
    level: 1,
    sheet,
  });
  const bytes = await buildCharacterSheetPdf(character);
  assert.ok(bytes.length > 1000, "PDF has substance");
  const head = Buffer.from(bytes.subarray(0, 5)).toString("latin1");
  assert.equal(head, "%PDF-");
  const doc = await PDFDocument.load(bytes);
  const fields = doc.getForm().getFields();
  assert.ok(fields.length > 1, `expected several AcroForm fields, got ${fields.length}`);
  assert.equal(doc.getPageCount(), 1, "a non-caster gets one page");
});

await test("pre-fetched portrait bytes are embedded without a fetch", async () => {
  // Smallest valid PNG: 1x1 transparent pixel.
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "base64",
  );
  const character = libraryToPdfCharacter({
    name: sheet.name,
    race: sheet.race,
    class: sheet.class,
    subclass: "",
    background: "",
    level: 1,
    sheet: { ...sheet, portrait: { url: "/uploads/nonexistent.png" } },
  });
  const bytes = await buildCharacterSheetPdf(character, { portraitBytes: new Uint8Array(png) });
  const doc = await PDFDocument.load(bytes);
  // pdf-lib registers every embedded image as an XObject in the page tree.
  const text = Buffer.from(bytes).toString("latin1");
  assert.ok(text.includes("/Subtype /Image"), "an image XObject is present");
  assert.equal(doc.getPageCount(), 1);
});

await test("Chinese authored names and notes survive in editable fields", async () => {
  const character=libraryToPdfCharacter({name:'林河',race:sheet.race,class:sheet.class,subclass:'',background:'soldier',level:1,sheet:{...sheet,name:'林河',backstory:'在城门守候。',notes:'保留中文笔记。'}});
  const bytes=await buildCharacterSheetPdf(character,{locale:'zh-CN',fontBytes:fs.readFileSync(new URL('../public/fonts/NotoSansSC-Regular.ttf',import.meta.url))});
  const doc=await PDFDocument.load(bytes);
  const fields=doc.getForm().getFields().filter(field=>typeof field.getText==='function');
  assert(fields.some(field=>field.getText()==='林河'));
  assert(fields.some(field=>field.getText()==='战士 1'));
  assert(fields.some(field=>field.getText()?.includes('长剑')));
  assert(fields.some(field=>field.getText()?.includes('所有护甲')));
  assert(fields.some(field=>field.getText()?.includes('在城门守候。')));
  assert(fields.some(field=>field.getText()?.includes('保留中文笔记。')));
  assert(fields.every(field=>field.acroField.getWidgets().every(widget=>Boolean(widget.getNormalAppearance()))));
  if(process.env.ODM_PDF_PREVIEW)fs.writeFileSync(process.env.ODM_PDF_PREVIEW,bytes);
});
await test("Chinese caster sheet preserves mechanics, native names and editable spell lists", async () => {
  const character=libraryToPdfCharacter({name:'星澜',race:'human',class:'wizard',subclass:'',background:'sage',level:1,sheet:{...sheet,name:'星澜',class:'wizard',features:[],spellcasting:{ability:'int',slots:{1:{max:2,used:1}},prepared:['Magic Missile'],known:[],cantrips:['Fire Bolt'],spellbook:['Magic Missile','Shield']}}});
  const snapshot=structuredClone(character);
  const fontBytes=fs.readFileSync(new URL('../public/fonts/NotoSansSC-Regular.ttf',import.meta.url));
  const bytes=await buildCharacterSheetPdf(character,{locale:'zh-CN',fontBytes});
  const doc=await PDFDocument.load(bytes),values=doc.getForm().getFields().filter(f=>typeof f.getText==='function').map(f=>f.getText());
  assert.equal(doc.getPageCount(),2);assert(values.some(v=>v==='法师 施法'));
  assert(values.some(v=>v?.includes('魔法飞弹')&&v.includes('护盾术')&&v.includes('火焰箭')));
  assert.deepEqual(character,snapshot);
  const english=await PDFDocument.load(await buildCharacterSheetPdf(character,{locale:'en',fontBytes}));
  const enValues=english.getForm().getFields().filter(f=>typeof f.getText==='function').map(f=>f.getText());
  assert(enValues.includes('星澜'));assert(enValues.includes('Wizard Spellcasting'));assert(enValues.some(v=>v?.includes('Magic Missile')));
  if(process.env.ODM_PDF_PREVIEW)fs.writeFileSync(process.env.ODM_PDF_PREVIEW.replace('.pdf','-caster.pdf'),bytes);
});
console.log(`test-character-pdf: ${passed} passed`);
