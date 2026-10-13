// Builds a fillable (editable AcroForm) character-sheet PDF from a character,
// laid out to resemble the official 5e sheet. Pure client/Node code on top of
// pdf-lib; every value lands in a named text field or checkbox so the output
// stays editable in any PDF reader. Derived numbers (saves, skills, spell DC,
// attack bonuses) come from the same SRD helpers the app UI uses, so the sheet
// never invents a modifier.

import {
  PDFDocument,
  type PDFFont,
  type PDFForm,
  type PDFPage,
  StandardFonts,
  TextAlignment,
  rgb,
} from "pdf-lib";
import type {
  AbilityScores,
  ClassEntry,
  CreateSheetInput,
  EquipmentItem,
  HitDice,
  Proficiencies,
  SheetAttachment,
  SheetFeature,
  Spellcasting,
} from "@/lib/schemas/sheet";
import {
  computeSheetDerived,
  findClass,
  formatModifier,
  SRD_SKILLS,
  XP_THRESHOLDS,
} from "@/lib/srd";
import { classListFor, slotTableFor } from "@/lib/srd/multiclass";
import { weaponAttackProfile, weaponOf } from "@/lib/dm/attack-logic";
import { matchWeapon } from "@/lib/srd/weapons";
import type { AppLocale } from "../i18n/locales.ts";
import { pdfLabel } from "./labels.ts";
import { characterLabel, skillLabel, subclassLabel } from "../i18n/character-presentations.ts";
import { referenceDisplayName } from "../i18n/references.ts";
import { nativeFeatureName } from "../i18n/feature-material-presentations.ts";
import { featTermLabel } from "../i18n/feat-presentations.ts";
import { sheetTrainingLabel } from "../i18n/training-presentations.ts";
import { damageListLabel } from "../i18n/sheet-play-presentations.ts";

// The subset of a character the sheet renders. The runtime CharacterSheet is
// structurally assignable to this, so the in-session dialog passes its `sheet`
// straight through; library characters go through libraryToPdfCharacter first.
export type PdfCharacter = {
  name: string;
  race: string;
  class: string;
  subclass: string;
  background: string;
  alignment: string;
  level: number;
  xp: number;
  abilities: AbilityScores;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  ac: number;
  speed: number;
  hitDice: HitDice;
  classes: ClassEntry[];
  proficiencies: Proficiencies;
  equipment: EquipmentItem[];
  gold: number;
  feats: string[];
  features: SheetFeature[];
  spellcasting: Spellcasting;
  portrait: SheetAttachment | null;
  notes: string;
  backstory: string;
};

// Library characters store a CreateSheetInput (no runtime currentHp/xp) plus a
// scalar level; fold those into the shape the builder expects.
export function libraryToPdfCharacter(character: {
  name: string;
  race: string;
  class: string;
  subclass: string;
  background: string;
  level: number;
  xp?: number;
  sheet: CreateSheetInput;
}): PdfCharacter {
  const s = character.sheet;
  const level = Math.max(1, Math.min(20, character.level));
  return {
    name: s.name || character.name,
    race: s.race || character.race,
    class: s.class || character.class,
    subclass: s.subclass || character.subclass,
    background: s.background || character.background,
    alignment: s.alignment,
    level,
    xp: character.xp ?? XP_THRESHOLDS[level - 1] ?? 0,
    abilities: s.abilities,
    maxHp: s.maxHp,
    currentHp: s.maxHp,
    tempHp: 0,
    ac: s.ac,
    speed: s.speed,
    hitDice: s.hitDice,
    classes: s.classes ?? [],
    proficiencies: s.proficiencies,
    equipment: s.equipment,
    gold: s.gold,
    feats: s.feats,
    features: s.features,
    spellcasting: s.spellcasting,
    portrait: s.portrait,
    notes: s.notes,
    backstory: s.backstory,
  };
}

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 24;
const INK = rgb(0.12, 0.11, 0.1);
const LINE = rgb(0.55, 0.5, 0.44);
const FILL = rgb(0.98, 0.97, 0.95);

function titleCase(value: string): string {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Standard fonts encode WinAnsi only; swap the smart punctuation player text
// tends to carry and drop anything left that would throw on setText.
function sanitize(value: string): string {
  return (value ?? "")
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, "");
}

// One drawing context bundles the page, form, fonts, and a counter that keeps
// every field name unique.
type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  form: PDFForm;
  font: PDFFont;
  latin: PDFFont;
  bold: PDFFont;
  unicode: boolean;
  locale: AppLocale;
  n: number;
};

function box(ctx: Ctx, x: number, y: number, w: number, h: number, filled = false) {
  ctx.page.drawRectangle({
    x,
    y,
    width: w,
    height: h,
    borderColor: LINE,
    borderWidth: 1,
    color: filled ? FILL : undefined,
  });
}

function caption(ctx: Ctx, x: number, y: number, text: string, size = 6.5) {
  ctx.page.drawText(pdfLabel(text, ctx.locale).toUpperCase(), { x, y, size, font: ctx.bold, color: LINE });
}

function heading(ctx: Ctx, x: number, y: number, text: string, size = 8) {
  ctx.page.drawText(pdfLabel(text, ctx.locale).toUpperCase(), { x, y, size, font: ctx.bold, color: INK });
}

// Create a placed, pre-filled text field. Every value on the sheet goes
// through here so the whole document is editable.
function field(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  value: string,
  opts: { size?: number; align?: TextAlignment; multiline?: boolean } = {},
) {
  const f = ctx.form.createTextField(`f${ctx.n++}`);
  const fieldFont = ctx.unicode && /^[\x09\x0a\x0d\x20-\x7e]*$/.test(value) ? ctx.latin : ctx.font;
  f.setText(ctx.unicode ? value : sanitize(value));
  if (opts.multiline) {
    f.enableMultiline();
  }
  if (opts.align) {
    f.setAlignment(opts.align);
  }
  f.addToPage(ctx.page, {
    x,
    y,
    width: w,
    height: h,
    font: fieldFont,
    textColor: INK,
    borderWidth: 0,
    backgroundColor: undefined,
  });
  const requested = opts.size ?? 9;
  const valueWidth = value && !opts.multiline ? fieldFont.widthOfTextAtSize(ctx.unicode ? value : sanitize(value), 1) : 0;
  f.setFontSize(opts.multiline ? requested : Math.min(requested, (w - 4) / Math.max(1, valueWidth), h * 0.8));
  f.updateAppearances(fieldFont);
  return f;
}

function checkbox(ctx: Ctx, x: number, y: number, size: number, checked: boolean) {
  const c = ctx.form.createCheckBox(`c${ctx.n++}`);
  c.addToPage(ctx.page, { x, y, width: size, height: size, borderColor: LINE, borderWidth: 1 });
  if (checked) {
    c.check();
  }
}

// A bordered box with a caption underneath it, the pattern the whole sheet is
// built from (AC, ability scores, HP...).
function stat(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  size = 13,
) {
  box(ctx, x, y, w, h, true);
  field(ctx, x + 2, y + 12, w - 4, h - 14, value, { size, align: TextAlignment.Center });
  caption(ctx, x + (w - ctx.bold.widthOfTextAtSize(pdfLabel(label, ctx.locale).toUpperCase(), 6.5)) / 2, y + 3, label);
}

// Prefers bytes the caller already fetched (the browser half transcodes
// WebP to PNG first, since pdf-lib only embeds PNG and JPEG); falls back to
// fetching the url itself so a Node caller with a PNG portrait still works.
async function drawPortrait(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  source: { url?: string; bytes?: Uint8Array },
) {
  box(ctx, x, y, w, h, true);
  caption(ctx, x + 3, y + 3, "Appearance");
  if (!source.bytes && !source.url) {
    return;
  }
  try {
    const bytes = source.bytes ?? (await (await fetch(source.url as string)).arrayBuffer());
    let image;
    try {
      image = await ctx.doc.embedPng(bytes);
    } catch {
      image = await ctx.doc.embedJpg(bytes);
    }
    const pad = 4;
    const scale = Math.min((w - pad * 2) / image.width, (h - pad * 2 - 8) / image.height);
    const iw = image.width * scale;
    const ih = image.height * scale;
    ctx.page.drawImage(image, {
      x: x + (w - iw) / 2,
      y: y + (h - ih) / 2 + 4,
      width: iw,
      height: ih,
    });
  } catch {
    // Portrait is optional; a fetch/decoding failure just leaves the box blank.
  }
}

function drawHeader(ctx: Ctx, c: PdfCharacter) {
  const top = PAGE_H - MARGIN;
  // Name plate.
  box(ctx, MARGIN, top - 46, 250, 46, true);
  field(ctx, MARGIN + 6, top - 30, 238, 22, c.name, { size: 16 });
  caption(ctx, MARGIN + 6, top - 44, "Character Name");

  // Class & level, background, race, alignment, XP grid.
  const classes = classListFor(c);
  const classLine = classes
    .map((entry) => `${ctx.locale === "en" ? titleCase(findClass(entry.id)?.name ?? entry.id) : characterLabel("class", entry.id, ctx.locale)} ${entry.level}`)
    .join(" / ");
  const gx = MARGIN + 262;
  const gw = PAGE_W - MARGIN - gx;
  const cellW = gw / 3;
  const cells: Array<[string, string]> = [
    ["Class & Level", classLine],
    ["Race", ctx.locale === "en" ? titleCase(c.race) : characterLabel("race", c.race, ctx.locale)],
    ["Background", ctx.locale === "en" ? titleCase(c.background) : characterLabel("background", c.background, ctx.locale)],
    ["Alignment", pdfLabel(c.alignment, ctx.locale)],
    ["Experience", String(c.xp)],
    ["Subclass", subclassLabel(c.class, c.subclass, ctx.locale)],
  ];
  cells.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = gx + col * cellW;
    const cy = top - 22 - row * 24;
    field(ctx, cx + 2, cy, cellW - 4, 12, value, { size: 8 });
    ctx.page.drawLine({
      start: { x: cx + 2, y: cy - 1 },
      end: { x: cx + cellW - 2, y: cy - 1 },
      thickness: 0.5,
      color: LINE,
    });
    caption(ctx, cx + 2, cy - 10, label, 6);
  });
}

function drawAbilities(ctx: Ctx, c: PdfCharacter, derived: ReturnType<typeof computeSheetDerived>) {
  const x = MARGIN;
  let y = PAGE_H - MARGIN - 62;
  const w = 58;
  const h = 52;
  for (const ability of ["str", "dex", "con", "int", "wis", "cha"] as const) {
    box(ctx, x, y - h, w, h, true);
    caption(ctx, x + w / 2 - 9, y - 10, ability.toUpperCase(), 7);
    field(ctx, x + 6, y - 34, w - 12, 16, formatModifier(derived.abilityMods[ability]), {
      size: 15,
      align: TextAlignment.Center,
    });
    // Score circle.
    ctx.page.drawEllipse({ x: x + w / 2, y: y - h + 10, xScale: 12, yScale: 9, borderColor: LINE, borderWidth: 1, color: rgb(1, 1, 1) });
    field(ctx, x + w / 2 - 12, y - h + 4, 24, 12, String(c.abilities[ability]), {
      size: 9,
      align: TextAlignment.Center,
    });
    y -= h + 6;
  }
}

function drawSavesAndSkills(
  ctx: Ctx,
  c: PdfCharacter,
  derived: ReturnType<typeof computeSheetDerived>,
) {
  const x = MARGIN + 60;
  const w = 114;
  let y = PAGE_H - MARGIN - 60;

  // Inspiration + proficiency bonus.
  stat(ctx, x, y - 26, w / 2 - 3, 26, "Inspir.", "", 12);
  stat(ctx, x + w / 2 + 3, y - 26, w / 2 - 3, 26, "Prof Bonus", formatModifier(derived.proficiencyBonus), 12);
  y -= 36;

  // Saving throws.
  box(ctx, x, y - 96, w, 96, true);
  heading(ctx, x + 4, y - 11, "Saving Throws");
  let ry = y - 24;
  for (const ability of ["str", "dex", "con", "int", "wis", "cha"] as const) {
    checkbox(ctx, x + 5, ry, 8, c.proficiencies.saves.includes(ability));
    field(ctx, x + 16, ry - 2, 20, 12, formatModifier(derived.saves[ability]), { size: 8, align: TextAlignment.Center });
    ctx.page.drawText(pdfLabel(ability.toUpperCase(), ctx.locale), { x: x + 40, y: ry, size: 7, font: ctx.font, color: INK });
    ry -= 12;
  }
  y -= 106;

  // Skills.
  const skillsH = SRD_SKILLS.length * 12 + 16;
  box(ctx, x, y - skillsH, w, skillsH, true);
  heading(ctx, x + 4, y - 11, "Skills");
  ry = y - 24;
  const expertise = c.proficiencies.expertise ?? [];
  for (const skill of SRD_SKILLS) {
    const proficient = c.proficiencies.skills.includes(skill.id) || expertise.includes(skill.id);
    checkbox(ctx, x + 5, ry, 8, proficient);
    field(ctx, x + 16, ry - 2, 20, 12, formatModifier(derived.skills[skill.id] ?? 0), { size: 8, align: TextAlignment.Center });
    ctx.page.drawText(`${skillLabel(skill.id, ctx.locale)} (${pdfLabel(skill.ability.toUpperCase(), ctx.locale)})`, {
      x: x + 40,
      y: ry,
      size: 6,
      font: ctx.font,
      color: INK,
    });
    ry -= 12;
  }
  y -= skillsH + 8;

  // Passive perception.
  box(ctx, x, y - 22, w, 22, true);
  field(ctx, x + 4, y - 16, 26, 14, String(derived.passivePerception), { size: 11, align: TextAlignment.Center });
  caption(ctx, x + 34, y - 14, "Passive Perception", 6);
}

function drawCombat(ctx: Ctx, c: PdfCharacter, derived: ReturnType<typeof computeSheetDerived>) {
  const x = 200;
  const w = 190;
  let y = PAGE_H - MARGIN - 60;

  // AC / Initiative / Speed.
  const third = (w - 8) / 3;
  stat(ctx, x, y - 44, third, 44, "Armor Class", String(c.ac), 15);
  stat(ctx, x + third + 4, y - 44, third, 44, "Initiative", formatModifier(derived.initiative), 15);
  stat(ctx, x + (third + 4) * 2, y - 44, third, 44, "Speed", `${c.speed} ${pdfLabel("ft", ctx.locale)}`, 13);
  y -= 54;

  // Hit points.
  stat(ctx, x, y - 30, third, 30, "Max HP", String(c.maxHp), 12);
  stat(ctx, x + third + 4, y - 30, third, 30, "Current HP", String(c.currentHp), 12);
  stat(ctx, x + (third + 4) * 2, y - 30, third, 30, "Temp HP", c.tempHp ? String(c.tempHp) : "", 12);
  y -= 40;

  // Hit dice + death saves.
  const half = (w - 6) / 2;
  stat(ctx, x, y - 30, half, 30, "Hit Dice", `${c.hitDice.total}${c.hitDice.die}`, 11);
  box(ctx, x + half + 6, y - 30, half, 30, true);
  ctx.page.drawText(pdfLabel("Successes", ctx.locale), { x: x + half + 10, y: y - 11, size: 6, font: ctx.font, color: INK });
  ctx.page.drawText(pdfLabel("Failures", ctx.locale), { x: x + half + 10, y: y - 21, size: 6, font: ctx.font, color: INK });
  field(ctx, x + half + 48, y - 13, half - 52, 9, "", { size: 8 });
  field(ctx, x + half + 48, y - 23, half - 52, 9, "", { size: 8 });
  caption(ctx, x + half + 10, y - 29, "Death Saves");
  y -= 40;

  // Attacks.
  const attacks = weaponAttacks(c, derived);
  const rowsH = 8 * 12 + 28;
  box(ctx, x, y - rowsH, w, rowsH, true);
  heading(ctx, x + 4, y - 11, "Attacks & Spellcasting");
  ctx.page.drawText(pdfLabel("Name", ctx.locale), { x: x + 4, y: y - 22, size: 6, font: ctx.bold, color: LINE });
  ctx.page.drawText(pdfLabel("Atk", ctx.locale), { x: x + w - 78, y: y - 22, size: 6, font: ctx.bold, color: LINE });
  ctx.page.drawText(pdfLabel("Damage / Type", ctx.locale), { x: x + w - 58, y: y - 22, size: 6, font: ctx.bold, color: LINE });
  let ry = y - 34;
  for (let i = 0; i < 8; i += 1) {
    const a = attacks[i];
    field(ctx, x + 4, ry, w - 84, 11, a ? referenceDisplayName("equipment", a.name, ctx.locale) : "", { size: 8 });
    field(ctx, x + w - 80, ry, 20, 11, a ? formatModifier(a.toHit) : "", { size: 8, align: TextAlignment.Center });
    field(ctx, x + w - 58, ry, 54, 11, a ? `${a.damage} ${damageListLabel(a.type, ctx.locale)}`.trim() : "", { size: 7 });
    ry -= 12;
  }
  y -= rowsH + 8;

  // Equipment + gold.
  const eqH = y - MARGIN - 20;
  box(ctx, x, MARGIN + 18, w, eqH, true);
  heading(ctx, x + 4, y - 11, "Equipment");
  const eqText = c.equipment
    .map((item) => (item.qty > 1 ? `${referenceDisplayName("equipment", item.name, ctx.locale)} x${item.qty}` : referenceDisplayName("equipment", item.name, ctx.locale)))
    .join("\n");
  field(ctx, x + 4, MARGIN + 22, w - 8, eqH - 18, eqText, { size: 8, multiline: true });
  box(ctx, x, MARGIN, w, 16, true);
  caption(ctx, x + 4, MARGIN + 5, "Gold");
  field(ctx, x + 30, MARGIN + 2, w - 34, 12, String(c.gold), { size: 9 });
}

async function drawTraits(ctx: Ctx, c: PdfCharacter, portraitBytes?: Uint8Array) {
  const x = 398;
  const w = PAGE_W - MARGIN - x;
  let y = PAGE_H - MARGIN - 60;

  // Portrait at the top of the right column.
  await drawPortrait(ctx, x, y - 104, w, 104, { url: c.portrait?.url, bytes: portraitBytes });
  y -= 112;

  // Features & traits (features + feats).
  const featText = [
    ...c.features.map((f) => f.source === "story" ? f.name : nativeFeatureName(f.name, ctx.locale, f.classId ?? c.class)),
    ...c.feats.map((name) => `${pdfLabel("Feat", ctx.locale)}: ${featTermLabel("feat", name, ctx.locale)}`),
  ].join("\n");
  const featH = 176;
  box(ctx, x, y - featH, w, featH, true);
  heading(ctx, x + 4, y - 11, "Features & Traits");
  field(ctx, x + 4, y - featH + 3, w - 8, featH - 16, featText, { size: 8, multiline: true });
  y -= featH + 8;

  // Other proficiencies & languages.
  const p = c.proficiencies;
  const profText = [
    p.armor.length ? `${pdfLabel("Armor", ctx.locale)}: ${p.armor.map(value => pdfLabel(sheetTrainingLabel("armor", value, ctx.locale), ctx.locale)).join(", ")}` : "",
    p.weapons.length ? `${pdfLabel("Weapons", ctx.locale)}: ${p.weapons.map(value => sheetTrainingLabel("weapon", value, ctx.locale)).join(", ")}` : "",
    p.tools.length ? `${pdfLabel("Tools", ctx.locale)}: ${p.tools.map(value => sheetTrainingLabel("tool", value, ctx.locale)).join(", ")}` : "",
    p.languages.length ? `${pdfLabel("Languages", ctx.locale)}: ${p.languages.map(value => sheetTrainingLabel("language", value, ctx.locale)).join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const profH = 120;
  box(ctx, x, y - profH, w, profH, true);
  heading(ctx, x + 4, y - 11, "Other Proficiencies & Languages");
  field(ctx, x + 4, y - profH + 3, w - 8, profH - 16, profText, { size: 8, multiline: true });
  y -= profH + 8;

  // Backstory / notes down to the bottom margin.
  const bioH = y - MARGIN;
  box(ctx, x, MARGIN, w, bioH, true);
  heading(ctx, x + 4, y - 11, "Backstory & Notes");
  const bioText = [c.backstory, c.notes].filter(Boolean).join("\n\n");
  field(ctx, x + 4, MARGIN + 3, w - 8, bioH - 16, bioText, { size: 8, multiline: true });
}

type WeaponRow = { name: string; toHit: number; damage: string; type: string };

function weaponAttacks(
  c: PdfCharacter,
  derived: ReturnType<typeof computeSheetDerived>,
): WeaponRow[] {
  const rows: WeaponRow[] = [];
  for (const item of c.equipment) {
    const srd = weaponOf(item) ?? matchWeapon(item.name);
    if (!srd) {
      continue;
    }
    const profile = weaponAttackProfile(derived, c.proficiencies.weapons, {
      displayName: item.name,
      srd,
      unarmed: false,
    });
    rows.push({
      name: profile.weapon,
      toHit: profile.toHit,
      damage: profile.damageExpression,
      type: profile.damageType,
    });
    if (rows.length >= 8) {
      break;
    }
  }
  return rows;
}

function drawSpellPage(ctx: Ctx, c: PdfCharacter, derived: ReturnType<typeof computeSheetDerived>) {
  const sc = c.spellcasting;
  if (!sc) {
    return;
  }
  let y = PAGE_H - MARGIN;

  // Header line: class, ability, save DC, attack bonus.
  const casterName = titleCase(
    classListFor(c).find((entry) => findClass(entry.id)?.spellAbility)?.id ?? c.class,
  );
  box(ctx, MARGIN, y - 40, PAGE_W - MARGIN * 2, 40, true);
  field(ctx, MARGIN + 6, y - 28, 200, 20, `${characterLabel("class", casterName, ctx.locale)} ${pdfLabel("Spellcasting", ctx.locale)}`, { size: 13 });
  const infoX = MARGIN + 230;
  stat(ctx, infoX, y - 34, 90, 30, "Ability", pdfLabel(sc.ability.toUpperCase(), ctx.locale), 11);
  stat(ctx, infoX + 96, y - 34, 90, 30, "Spell Save DC", String(derived.spellSaveDc ?? ""), 11);
  stat(ctx, infoX + 192, y - 34, 90, 30, "Spell Atk", formatModifier(derived.spellAttack ?? 0), 11);
  y -= 52;

  // Slot table.
  const slots = slotTableFor(c);
  const stored = sc.slots ?? {};
  box(ctx, MARGIN, y - 44, PAGE_W - MARGIN * 2, 44, true);
  heading(ctx, MARGIN + 4, y - 11, "Spell Slots");
  const colW = (PAGE_W - MARGIN * 2) / 10;
  for (let lvl = 1; lvl <= 9; lvl += 1) {
    const cx = MARGIN + (lvl - 1) * colW;
    // The character's own tracked slots win; the computed table fills in for
    // levels the app hasn't materialized yet.
    const max = stored[String(lvl)]?.max ?? slots[String(lvl)] ?? 0;
    caption(ctx, cx + colW / 2 - 3, y - 20, String(lvl), 8);
    field(ctx, cx + 2, y - 40, colW - 4, 16, max ? String(max) : "", { size: 10, align: TextAlignment.Center });
    ctx.page.drawText(max ? `${pdfLabel("used", ctx.locale)} ${stored[String(lvl)]?.used ?? 0}` : "", {
      x: cx + 4,
      y: y - 30,
      size: 5,
      font: ctx.font,
      color: LINE,
    });
  }
  // Pact magic column.
  if (sc.pact) {
    const cx = MARGIN + 9 * colW;
    caption(ctx, cx + 2, y - 20, `${pdfLabel("Pact", ctx.locale)} ${sc.pact.level}`, 6);
    field(ctx, cx + 2, y - 40, colW - 4, 16, String(sc.pact.max), { size: 10, align: TextAlignment.Center });
  }
  y -= 54;

  // Cantrips, then known / prepared spells.
  const spellText = [
    sc.cantrips?.length ? `${pdfLabel("Cantrips", ctx.locale)}:\n${sc.cantrips.map(name => referenceDisplayName("spell", name, ctx.locale)).join(", ")}` : "",
    sc.prepared.length ? `${pdfLabel("Prepared", ctx.locale)}:\n${sc.prepared.map(name => referenceDisplayName("spell", name, ctx.locale)).join(", ")}` : "",
    sc.known.length ? `${pdfLabel("Known", ctx.locale)}:\n${sc.known.map(name => referenceDisplayName("spell", name, ctx.locale)).join(", ")}` : "",
    sc.pending?.length ? `${pdfLabel("Prepared after the next long rest", ctx.locale)}:\n${sc.pending.map(name => referenceDisplayName("spell", name, ctx.locale)).join(", ")}` : "",
    sc.spellbook?.length ? `${pdfLabel("Spellbook", ctx.locale)}:\n${sc.spellbook.map(name => referenceDisplayName("spell", name, ctx.locale)).join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  const listH = y - MARGIN;
  box(ctx, MARGIN, MARGIN, PAGE_W - MARGIN * 2, listH, true);
  heading(ctx, MARGIN + 4, y - 11, "Spells");
  field(ctx, MARGIN + 4, MARGIN + 3, PAGE_W - MARGIN * 2 - 8, listH - 16, spellText, {
    size: 9,
    multiline: true,
  });
}

export type BuildPdfOptions = {
  // Pre-fetched PNG or JPEG portrait bytes. When given, the builder never
  // fetches the portrait url itself.
  portraitBytes?: Uint8Array;
  // A caller-supplied Unicode font keeps authored Chinese text in editable
  // fields. Browser callers fetch the bundled font only on export.
  fontBytes?: Uint8Array;
  locale?: AppLocale;
};

export async function buildCharacterSheetPdf(
  character: PdfCharacter,
  options: BuildPdfOptions = {},
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  if (options.fontBytes) {
    const { default: fontkit } = await import("@pdf-lib/fontkit");
    doc.registerFontkit(fontkit);
  }
  const font = await doc.embedFont(options.fontBytes ?? StandardFonts.Helvetica);
  const bold = options.fontBytes ? font : await doc.embedFont(StandardFonts.HelveticaBold);
  const latin = options.fontBytes ? await doc.embedFont(StandardFonts.Helvetica) : font;
  const form = doc.getForm();
  const derived = computeSheetDerived(character);

  const page1 = doc.addPage([PAGE_W, PAGE_H]);
  const ctx: Ctx = { doc, page: page1, form, font, latin, bold, unicode: Boolean(options.fontBytes), locale: options.locale ?? "en", n: 0 };
  drawHeader(ctx, character);
  drawAbilities(ctx, character, derived);
  drawSavesAndSkills(ctx, character, derived);
  drawCombat(ctx, character, derived);
  await drawTraits(ctx, character, options.portraitBytes);

  if (character.spellcasting) {
    ctx.page = doc.addPage([PAGE_W, PAGE_H]);
    drawSpellPage(ctx, character, derived);
  }

  form.updateFieldAppearances(font);
  return doc.save();
}
