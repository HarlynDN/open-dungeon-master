import { scopedCatalog } from "./translator.ts";
import type { ItemSheet } from '../help/item-sheet.ts';
import { WEAPON_PROPERTY_BLURBS, DAMAGE_TYPE_BLURBS } from '../help/terms.ts';
import { glossaryEntriesView } from './closed-game-help-presentations.ts';
import type { EQUIPMENT_HELP_MESSAGES as EQUIPMENT_HELP_MESSAGES_Shape } from "./equipment-help-messages.ts";
import { createTranslator } from './translator.ts';
import { featTermLabel } from './feat-presentations.ts';
import { gearRarity } from './gear-ui-presentations.ts';
import type { AppLocale } from './locales.ts';

// A display-only projection of the existing item sheet. Unknown pack/author
// prose remains verbatim, even when its name is a stock property or item.
export function itemSheetView(sheet: ItemSheet, locale: AppLocale): ItemSheet {
  if (locale === 'en') return sheet;
  const t = createTranslator(locale);
  const unit = (value: string | null, pattern: RegExp, key: 'weightValue' | 'rangeValue' | 'goldValue' | 'silverValue' | 'copperValue') => {
    const match = value && pattern.exec(value);
    return match ? t(`itemHelp.${key}`, { value: match[1] }) : value;
  };
  const typeKey = Object.keys(EQUIPMENT_HELP_MESSAGES.en).find(key => key.startsWith('itemHelp.type.') && EQUIPMENT_HELP_MESSAGES.en[key as keyof typeof EQUIPMENT_HELP_MESSAGES.en] === sheet.type);
  const armor = sheet.armor ? { ...sheet.armor } : null;
  if (armor) {
    const capped = /^(\d+) \+ Dex \(max (\d+)\)$/.exec(armor.ac);
    const full = /^(\d+) \+ Dex$/.exec(armor.ac);
    if (capped) armor.ac = t('itemHelp.acDexCap', { base: capped[1], cap: capped[2] });
    else if (full) armor.ac = t('itemHelp.acDex', { base: full[1] });
    const cap = armor.dex && /^Add your Dexterity modifier, up to \+(\d+)\.$/.exec(armor.dex);
    if (cap) armor.dex = t('itemHelp.dexCap', { cap: cap[1] });
    else if (armor.dex === EQUIPMENT_HELP_MESSAGES.en['itemHelp.dexFull']) armor.dex = t('itemHelp.dexFull');
    else if (armor.dex === EQUIPMENT_HELP_MESSAGES.en['itemHelp.dexNone']) armor.dex = t('itemHelp.dexNone');
  }
  const weapon = sheet.weapon ? { ...sheet.weapon, properties: sheet.weapon.properties.map(property => {
    const match = /^(.+?)(?: \((.+)\))?$/.exec(property.name);
    const base = match?.[1].toLowerCase();
    if (!base || property.blurb !== WEAPON_PROPERTY_BLURBS[base]) return property;
    const [entry] = glossaryEntriesView([{ name: base, blurb: property.blurb! }], locale);
    const range = match?.[2] && /^range ([\d/]+)$/.exec(match[2]);
    return { name: match?.[2] ? t('itemHelp.propertyWithValue', { property: entry.name, value: range ? t('itemHelp.propertyRange', { value: range[1] }) : match[2] }) : entry.name, blurb: entry.blurb };
  }) } : null;
  if (weapon) {
    weapon.range = unit(weapon.range, /^([\d/]+) ft\.$/, 'rangeValue');
    const damage = weapon.damageType;
    if (damage && weapon.damageBlurb === DAMAGE_TYPE_BLURBS[damage]) weapon.damageBlurb = glossaryEntriesView([{ name: damage, blurb: weapon.damageBlurb! }], locale)[0].blurb;
    if (damage) weapon.damageType = featTermLabel('damage', damage, locale);
  }
  return { ...sheet, type: typeKey ? t(typeKey as keyof typeof EQUIPMENT_HELP_MESSAGES.en) : sheet.type,
    rarity: sheet.rarity ? gearRarity(sheet.rarity, locale) : null,
    weight: unit(sheet.weight, /^(\d+(?:\.\d+)?) lb\.$/, 'weightValue'),
    cost: unit(unit(unit(sheet.cost, /^(\d+(?:\.\d+)?) gp$/, 'goldValue'), /^(\d+(?:\.\d+)?) sp$/, 'silverValue'), /^(\d+(?:\.\d+)?) cp$/, 'copperValue'),
    armor, weapon };
}

const EQUIPMENT_HELP_MESSAGES = scopedCatalog<typeof EQUIPMENT_HELP_MESSAGES_Shape>("itemHelp.");
