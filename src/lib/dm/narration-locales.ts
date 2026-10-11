import type { AppLocale } from "../i18n/locales.ts";

// Adapters read natural-language claims; the engine facts and English
// protocol remain shared. A new locale registers an adapter explicitly.
export type NarrationLocaleAdapter = {
  clauses: (clauses: readonly string[]) => string[];
  hedged: (clause: string) => boolean;
  negated: (clause: string) => boolean;
  claim: (kind: "hit" | "miss" | "death" | "downed", names: readonly string[], clause: string) => boolean;
  numbers: (clause: string) => Array<{ value: number; kind: "damage" | "healing" }>;
  hasCasting: (clause: string) => boolean;
  casts: (caster: string, spells: readonly string[], clause: string) => boolean;
  encounter: (narration: string, clauses: readonly string[]) => boolean;
};

const HEDGE = /仿佛|好像|似乎|差点|几乎|险些|可能|也许|或许|如果|假如|倘若|要是|即将|将要|准备|试图|打算|想要|企图|声称|宣称|据说|以为|认为|相信|怀疑|猜测|听说|记得|曾经|之前|先前|刚才/u;
const NEGATED = /没有|并未|未曾|未能|没能|不会|不能|不要|并不|不曾|不再|不是|并非|未命中|没命中|未击中|没有击中|未死|没死|未死亡|没死亡/u;
const HIT = "击中|命中|刺中|砍中|咬中|砸中|打中|击伤|刺伤|砍伤";
const MISS = "未命中|没命中|没有命中|未击中|没有击中|没击中";
const DEAD = "死亡|死去|死了|死掉|被杀死|被斩杀|倒地身亡|倒地死亡|断了气|断气|失去生命|已经身亡|当场毙命|一命呜呼";
const DOWNED = "昏迷|失去意识|不省人事|倒地不起|生命值降至\\s*0|生命值降为\\s*0";
const OBJECT_PREFIX = "(?:那只|这只|那名|这名|那个|这个|一只|一名|一个)?";
const AFTER_NAME = "(?=$|[\\s，。！？；：,.!?;:]|[的了后并而])";

function escaped(name: string): string {
  return name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s*");
}

// Avoid attributing a claim about 小阿明/哥布林王 to 阿明/哥布林. Chinese
// predicates may touch a name, so English \b is not a usable boundary.
function subject(name: string): string {
  return `(?<![\\p{L}\\p{N}_])${OBJECT_PREFIX}${escaped(name)}`;
}

function claims(kind: "hit" | "miss" | "death" | "downed", names: readonly string[], clause: string): boolean {
  if (HEDGE.test(clause)) return false;
  if (kind !== "miss" && NEGATED.test(clause)) return false;
  // "没有命中" is a miss assertion; "并不是没有命中" denies that assertion.
  if (kind === "miss" && /(?:不是|并非|并不|没有)(?:没有|没|未)(?:命中|击中|落空)|不要/u.test(clause)) return false;
  return names.some(name => {
    const target = `${OBJECT_PREFIX}${escaped(name)}${AFTER_NAME}`;
    const who = subject(name);
    let pattern: string;
    if (kind === "hit") {
      pattern = `(?:${HIT})(?:了)?\\s*${target}|${who}\\s*(?:被|遭到|遭受)(?:[^，。！？；]{0,12}?)(?:${HIT})|(?:刺入|刺进|扎入|贯穿|穿透)(?:了)?\\s*${OBJECT_PREFIX}${escaped(name)}(?:的)?(?:胸膛|胸口|身体|腹部|肩膀|喉咙|咽喉)`;
    } else if (kind === "miss") {
      pattern = `(?:${MISS})(?:了)?\\s*${target}|(?:对|朝|向)\\s*${escaped(name)}(?:的攻击|的这一击|挥出的一击)\\s*(?:落空|失手|没有命中)|${who}\\s*(?:避开了|躲开了)(?:这一击|攻击)`;
    } else if (kind === "death") {
      pattern = `${who}\\s*(?:已经|当场|立刻|就此)?(?:${DEAD})|(?:杀死|斩杀|击杀)(?:了)?\\s*${target}|${who}的(?:尸体|遗体)`;
    } else {
      pattern = `${who}\\s*(?:已经|当场|立刻|倒地|陷入|倒下并)?(?:${DOWNED})`;
    }
    return new RegExp(pattern, "iu").test(clause);
  });
}

const DIGITS: Record<string, number> = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
function smallNumber(raw: string): number {
  const ascii = raw.replace(/[０-９]/g, char => String(char.charCodeAt(0) - 0xff10));
  if (/^\d+$/.test(ascii)) return Number(ascii);
  let total = 0;
  let digit = 0;
  for (const char of raw) {
    if (char === "十" || char === "百") {
      total += (digit || 1) * (char === "十" ? 10 : 100);
      digit = 0;
    } else {
      digit = DIGITS[char] ?? 0;
    }
  }
  return total + digit;
}
const VALUE = "(?:[0-9０-９]{1,3}|[零〇一二两三四五六七八九十百]{1,6})";
function numberClaims(clause: string) {
  if (HEDGE.test(clause) || NEGATED.test(clause)) return [];
  const damage = new RegExp(`(?<![\\w０-９])(${VALUE})\\s*点?\\s*(伤害|治疗)`, "gu");
  const healing = new RegExp(`(?:恢复|回复|治愈)(?:了)?\\s*(${VALUE})\\s*点?\\s*(?:生命值|生命|HP)`, "giu");
  return [
    ...[...clause.matchAll(damage)].map(match => ({ value: smallNumber(match[1]), kind: match[2] === "治疗" ? "healing" as const : "damage" as const })),
    ...[...clause.matchAll(healing)].map(match => ({ value: smallNumber(match[1]), kind: "healing" as const })),
  ];
}

const zhCN: NarrationLocaleAdapter = {
  // A denial of one action must not suppress the next independent assertion.
  // Conditional/reported/remembered sentences retain their whole scope: a
  // comma cannot turn the consequence of "if" into an actual event.
  clauses: clauses => clauses.flatMap(clause => HEDGE.test(clause) ? [clause]
    : clause.split(/[，,]|(?:但是|然而|随后|接着)/u).map(part => part.trim()).filter(Boolean)),
  hedged: clause => HEDGE.test(clause),
  negated: clause => NEGATED.test(clause),
  claim: claims,
  numbers: numberClaims,
  hasCasting: clause => /施放|施展|释放/u.test(clause),
  casts: (caster, spells, clause) => !HEDGE.test(clause) && !NEGATED.test(clause) && spells.some(spell =>
    new RegExp(`${subject(caster)}\\s*(?:现在|随后|立刻|成功地|成功)?(?:施放|施展|释放)(?:了)?\\s*(?:法术)?[《〈]?${escaped(spell)}[》〉]?${AFTER_NAME}`, "iu").test(clause)),
  encounter: (narration, clauses) => {
    if (clauses.some(clause => !HEDGE.test(clause) && !NEGATED.test(clause) && /战斗开始|遭遇战开始|开始战斗|进入战斗|(?:掷|投掷|骰掷)(?:出)?先攻/u.test(clause))) return true;
    if (HEDGE.test(narration) || NEGATED.test(narration)) return false;
    return /(?:^|[\n*#>-])\s*\**敌人\**\s*[：:]/u.test(narration) && /挑战等级\s*\d|\bCR\s*\d|先攻|突袭/u.test(narration);
  },
};

export const NARRATION_LOCALE_ADAPTERS: Record<AppLocale, NarrationLocaleAdapter | null> = {
  en: null, // The original English matchers live in engine-boundary.ts.
  "zh-CN": zhCN,
};
