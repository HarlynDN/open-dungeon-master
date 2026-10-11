import { scopedCatalog } from "./translator.ts";
import type { AppLocale } from './locales.ts';
import { createTranslator } from "./translator.ts";
import type { MESSAGE_CATALOGS as MESSAGE_CATALOGS_Shape } from "./messages.ts";
import { equipmentName } from './equipment-presentations.ts';
export { equipmentName } from './equipment-presentations.ts';
import { spellGearTermLabel } from './spell-gear-presentations.ts';
import { referenceDisplayName } from './references.ts';
import { featTermLabel } from './feat-presentations.ts';
import { characterLabel, abilityLabel } from './character-presentations.ts';
import { describeSlot, type KitSlot } from '@/lib/srd/starting-kit';
import { armorClassLine, purseViewFor } from '@/app/characters/builder/derivedReasons';
import type { GearAlternative } from '@/lib/srd/gear-choices';
import type { PickerEntry } from '@/app/characters/builder/useContentSearch';

const normalize = (value: string) => value.trim().toLowerCase().replace(/[‘’]/g, "'");
export function gearNote(value: string, locale: AppLocale): string {
  if (locale === 'en') return value;
  const damage = /^(\d+d\d+(?:\s*[+-]\s*\d+)?) (\w+)$/.exec(value);
  if (damage) return `${damage[1]} ${featTermLabel('damage', damage[2], locale)}`;
  const armor = /^AC (\d+)$/.exec(value);
  if (armor) return createTranslator(locale)('gearUi.acNote', { ac: armor[1] });
  const bonus = /^([+-]\d+) AC$/.exec(value);
  return bonus ? createTranslator(locale)('gearUi.acBonusNote', { bonus: bonus[1] }) : value;
}

export function gearRarity(value: string, locale: AppLocale, capitalize = false): string {
  if (locale === 'en') return capitalize ? value.replace(/^./, c => c.toUpperCase()) : value;
  const key = `gearUi.rarity.${normalize(value)}`;
  return Object.hasOwn(MESSAGE_CATALOGS.en, key) ? createTranslator(locale)(key as keyof typeof MESSAGE_CATALOGS.en) : value;
}

export function gearKind(value: string, locale: AppLocale): string {
  const key = `gearUi.kind.${value}`;
  return locale !== 'en' && Object.hasOwn(MESSAGE_CATALOGS.en, key) ? createTranslator(locale)(key as keyof typeof MESSAGE_CATALOGS.en) : value;
}

export function pickerName(kind: string, row: Pick<PickerEntry, 'name' | 'source'>, locale: AppLocale): string {
  if (row.source === 'homebrew' || locale === 'en') return row.name;
  return kind === 'items' ? equipmentName(row.name, locale) : kind === 'spells' ? referenceDisplayName('spell', row.name, locale) : featTermLabel('feat', row.name, locale);
}

export function pickerMatches(kind: string, row: Pick<PickerEntry, 'name' | 'source'>, needle: string, locale: AppLocale): boolean {
  return row.name.toLowerCase().includes(needle) || pickerName(kind, row, locale).toLowerCase().includes(needle);
}

export function kitSlotText(slot: KitSlot, locale: AppLocale): string {
  if (locale === 'en') return describeSlot(slot).replace(/^./, first => first.toUpperCase());
  const t = createTranslator(locale);
  const text = t(`gearUi.slot.${slot.filter}`);
  return slot.except?.length ? t('gearUi.slotExcept', { slot: text, except: slot.except.map(name => equipmentName(name, locale)).join(t('gearUi.listSeparator')) }) : text;
}

export function backgroundGearLabel(value: string, locale: AppLocale): string {
  if (locale === 'en') return value;
  const key = `gearUi.background.${normalize(value)}`;
  if (Object.hasOwn(MESSAGE_CATALOGS.en, key)) return createTranslator(locale)(key as keyof typeof MESSAGE_CATALOGS.en);
  const kit = spellGearTermLabel('kitOption', value, locale);
  return kit !== value ? kit : equipmentName(value, locale);
}

export function backgroundAlternativeLabel(value: GearAlternative, locale: AppLocale): string {
  return backgroundGearLabel(value.label, locale);
}

export function localizedArmorClassLine(ac: number, parts: string[] | undefined, locale: AppLocale, authoredNames: string[] = []) {
  if (locale === 'en') return armorClassLine(ac, parts);
  const t = createTranslator(locale), authored = new Set(authoredNames.map(normalize));
  const display = (part: string) => {
    const stat = /^(STR|DEX|CON|INT|WIS|CHA) ([+-]?\d+)$/.exec(part);
    if (stat) return `${abilityLabel(stat[1].toLowerCase(), locale)} ${stat[2]}`;
    const base = /^(.*?) ([+-]?\d+)$/.exec(part);
    if (!base) return part;
    const name = authored.has(normalize(base[1])) ? base[1] : base[1] === 'Unarmored' ? t('gearUi.unarmored') : base[1] === 'bonus' ? t('gearUi.bonus') : equipmentName(base[1], locale);
    return `${name} ${base[2]}`;
  };
  return { value: String(ac), reason: parts?.length ? t('gearUi.acWorn', { parts: parts.map(display).join(' + ') }) : t('gearUi.acEmpty') };
}

export function gearCoin(gold: number, copper: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  return `${gold} ${t('gearUi.gp')}${copper ? ` ${copper} ${t('gearUi.cp')}` : ''}`;
}

export function gearCostText(cost: string, locale: AppLocale): string {
  if (locale === 'en') return cost;
  const match = /^(\d+(?:\.\d+)?) (gp|sp|cp)$/.exec(cost);
  return match ? `${match[1]} ${createTranslator(locale)(`gearUi.${match[2] as 'gp' | 'sp' | 'cp'}`)}` : cost;
}

export function gearWealthDiceText(dice: string, locale: AppLocale): string {
  if (locale === 'en') return dice;
  const match = /^(\d+d\d+(?: x \d+)?) gp$/.exec(dice);
  return match ? createTranslator(locale)('gearUi.wealthDice', { dice: match[1] }) : dice;
}

export function localizedPurseView(input: Parameters<typeof purseViewFor>[0], locale: AppLocale, labels?: { className: string; backgroundName: string }) {
  const original = purseViewFor(input);
  if (locale === 'en') return original;
  const t = createTranslator(locale), spentCopper = input.purse.spentCopper;
  const gold = Math.floor(spentCopper / 100), rest = spentCopper % 100;
  const bought = [gold ? `${gold} ${t('gearUi.gp')}` : '', rest ? `${rest} ${t('gearUi.cp')}` : ''].filter(Boolean).join(' ') || `0 ${t('gearUi.gp')}`;
  const spent = spentCopper ? t('gearUi.bought', { coin: bought }) : '';
  const source = input.keepsStoredGear ? t('gearUi.purseStored', { spent })
    : input.purse.method === 'rolled' ? input.table.wealth
      ? t('gearUi.purseRolled', { class: labels?.className ?? characterLabel('class', input.className, locale), spent })
      : t('gearUi.purseNeedRoll', { class: labels?.className ?? characterLabel('class', input.className, locale), dice: gearWealthDiceText(original.wealth!.dice, locale) })
    : t('gearUi.purseBackground', { background: labels?.backgroundName ?? characterLabel('background', input.backgroundName, locale), gold: input.backgroundPurse, spent });
  return { ...original, source };
}

export function gearWealthError(source: string, locale: AppLocale): string {
  if (locale === 'en') return source;
  const keys = ['gearUi.errorWealth', 'gearUi.errorWealthNetwork', 'gearUi.errorCampaign', 'gearUi.errorWealthMethod', 'abilityUi.errorSession', 'abilityUi.errorKind'] as const;
  const key = keys.find(key => MESSAGE_CATALOGS.en[key] === source);
  return key ? createTranslator(locale)(key) : source;
}

const MESSAGE_CATALOGS = scopedCatalog<typeof MESSAGE_CATALOGS_Shape>("gearUi.");
