import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { breakdown, formatCopper, parseCoins, type Denomination } from "../srd/currency.ts";
import type { ShopKind, ShopSize } from "../dm/shop-logic.ts";
import type { AppLocale } from "./locales.ts";

const KIND_KEYS = {
  general: "marketUi.kind.general", smith: "marketUi.kind.smith", apothecary: "marketUi.kind.apothecary",
  outfitter: "marketUi.kind.outfitter", curiosities: "marketUi.kind.curiosities",
} as const satisfies Record<ShopKind, MessageKey>;
const SIZE_KEYS = {
  hamlet: "marketUi.size.hamlet", village: "marketUi.size.village", town: "marketUi.size.town", city: "marketUi.size.city",
} as const satisfies Record<ShopSize, MessageKey>;
const COIN_KEYS = {
  cp: "marketUi.coin.cp", sp: "marketUi.coin.sp", ep: "marketUi.coin.ep", gp: "marketUi.coin.gp", pp: "marketUi.coin.pp",
} as const satisfies Record<Denomination, MessageKey>;
function label(keys: Partial<Record<string, MessageKey>>, value: string, locale: AppLocale): string {
  const key = Object.hasOwn(keys, value) ? keys[value] : undefined;
  return key ? createTranslator(locale)(key) : value;
}
export const marketKindLabel = (value: string, locale: AppLocale) => label(KIND_KEYS, value, locale);
export const marketSizeLabel = (value: string, locale: AppLocale) => label(SIZE_KEYS, value, locale);
export function marketMarkupLabel(step: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  return step === 1 ? t("marketUi.markup.list") : step < 1 ? t("marketUi.markup.off", { percent: Math.round((1 - step) * 100) }) : step === 2 ? t("marketUi.markup.double") : t("marketUi.markup.more", { percent: Math.round((step - 1) * 100) });
}
export function marketCoinText(total: number, locale: AppLocale): string {
  if (locale === "en") return formatCopper(total);
  const t = createTranslator(locale);
  const rows = breakdown(total);
  return (rows.length ? rows : [{ count: 0, denomination: "gp" as const }]).map(row => t("marketUi.coin.count", { count: row.count, coin: t(COIN_KEYS[row.denomination]) })).join(" ");
}

// Input aliases come from the locale catalog; adding a language does not
// require another business-code branch. The engine still parses canonical
// denominations and performs all rounding. Reject unknown Unicode units
// rather than accidentally treating each number as bare gold.
export function parseMarketCoins(source: string, locale: AppLocale): number | null {
  let text = locale === "en" ? source : source.normalize("NFKC").replaceAll(",", "").replaceAll("，", "");
  if (locale !== "en") {
    text = text.replace(/(^|\s)\.(\d)/g, (_match, prefix: string, digit: string) => `${prefix}0.${digit}`);
    const t = createTranslator(locale);
    const names = Object.entries(COIN_KEYS).map(([code, key]) => ({ code, word: t(key) })).sort((a, b) => b.word.length - a.word.length);
    for (const { code, word } of names) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      text = text.replace(new RegExp(`(\\d+(?:\\.\\d+)?\\s*)${escaped}(?=$|\\s|\\d|,)`, "giu"), `$1${code} `);
    }
  }
  if ([...text].some(char => /\p{L}/u.test(char) && !/[a-z]/i.test(char))) return null;
  if (locale !== "en") {
    // The engine's permissive prose parser can skip an unknown fragment.
    // An editable price must consume the whole input instead of charging
    // for only its recognized half (or interpreting a fraction as two sums).
    const tokens = /\d+(?:\.\d+)?\s*(?:[a-z]+(?:\s+pieces?)?)?/gi;
    let end = 0;
    for (const token of text.matchAll(tokens)) {
      if (!/^\s*(?:\+|and)?\s*$/i.test(text.slice(end, token.index)) || parseCoins(token[0]) === null) return null;
      end = token.index + token[0].length;
    }
    if (end === 0 || text.slice(end).trim()) return null;
  }
  return parseCoins(text);
}

const itemName = (name: string, locale: AppLocale) => referenceDisplayName("equipment", name, locale);
const coinSource = (source: string, locale: AppLocale) => {
  const amount = parseCoins(source);
  return amount === null ? source : marketCoinText(amount, locale);
};
// English diagnostics are kept in state/model protocols; only display changes.
export function marketText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  const prefix = "The market did not load. ";
  if (source.startsWith(prefix)) return t("marketUi.error.load", { reason: marketText(source.slice(prefix.length), locale) });
  const row = Object.entries(catalogFor("en", "marketUi.error.")).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  if (row) return t(row[0] as MessageKey);
  const haggle = /^(Haggled well|The keeper is unmoved): prices ([\s\S]+)\.$/.exec(source);
  if (haggle) {
    const prices = haggle[2] === "a step lower" ? t("marketUi.haggle.lower") : haggle[2] === "a step higher" ? t("marketUi.haggle.higher") : haggle[2] === "rise" ? t("marketUi.haggle.rise") : haggle[2];
    return t(haggle[1] === "Haggled well" ? "marketUi.haggle.good" : "marketUi.haggle.bad", { prices });
  }
  const quantity = /^([\s\S]+) has only (\d+) of ([\s\S]+)\.$/.exec(source);
  if (quantity) return t("marketUi.error.qty", { shop: quantity[1], qty: quantity[2], item: itemName(quantity[3], locale) });
  const afford = /^([\s\S]+) x(\d+) costs ([^;]+); ([\s\S]+) carries (.+)\. They cannot afford it\.$/.exec(source);
  if (afford) return t("marketUi.error.afford", { item: itemName(afford[1], locale), qty: afford[2], cost: coinSource(afford[3], locale), name: afford[4], purse: coinSource(afford[5], locale) });
  const noBuy = /^([\s\S]+) does not buy\.$/.exec(source);
  if (noBuy) return t("marketUi.error.noBuy", { shop: noBuy[1] });
  const carry = /^([\s\S]+) does not carry "([\s\S]+)"\.$/.exec(source);
  if (carry) return t("marketUi.error.carry", { name: carry[1], item: itemName(carry[2], locale) });
  const haggled = /^([\s\S]+) already tried their luck with ([\s\S]+)'s keeper\.$/.exec(source);
  if (haggled) return t("marketUi.error.haggled", { name: haggled[1], shop: haggled[2] });
  const noPrice = /^The pack has no price for "([\s\S]+)"; pass priceCp for what the keeper pays each\.$/.exec(source);
  if (noPrice) return t("marketUi.error.noPrice", { item: itemName(noPrice[1], locale) });
  const noStock = /^([\s\S]+) does not stock "([\s\S]+)"\. On the shelf: ([\s\S]+)\.$/.exec(source);
  if (noStock) return t("marketUi.error.noStock", { shop: noStock[1], item: itemName(noStock[2], locale), stock: noStock[3] === "nothing" ? t("marketUi.nothing") : noStock[3] });
  const noShop = /^No shop called "([\s\S]+)" here\.( Open one with open_shop first\.)?$/.exec(source);
  if (noShop) return t(noShop[2] ? "marketUi.error.openFirst" : "marketUi.error.noShop", { shop: noShop[1] });
  const capacity = /^([\s\S]+) can carry ([\d.]+) lb \(Strength x 15\) and would be carrying ([\d.]+) lb with ([\s\S]+)\. They cannot carry it: give it to someone else, leave something behind, or drag it \(the lift tool\) at 5 feet\. Nothing was bought\.$/.exec(source);
  return capacity ? t("marketUi.error.capacity", { name: capacity[1], capacity: capacity[2], weight: capacity[3], item: itemName(capacity[4], locale) }) : controlText(source, locale);
}
