import type { AppLocale } from "../i18n/locales.ts";

// Export-only labels stay in the lazy PDF bundle. Canonical field values are
// translated explicitly by their kind, never through this free-text lookup.
const LABELS: Partial<Record<AppLocale, Readonly<Record<string, string>>>> = {
  "zh-CN": {
    "Character Name": "角色姓名", "Class & Level": "职业与等级", Race: "种族",
    Background: "背景", Alignment: "阵营", Experience: "经验值", Subclass: "子职",
    Appearance: "外貌", "Inspir.": "激励", "Prof Bonus": "熟练加值",
    "Saving Throws": "豁免检定", Skills: "技能", "Passive Perception": "被动察觉",
    "Armor Class": "护甲等级", Initiative: "先攻", Speed: "速度", "Max HP": "生命上限",
    "Current HP": "当前生命", "Temp HP": "临时生命", "Hit Dice": "生命骰",
    Successes: "成功", Failures: "失败", "Death Saves": "死亡豁免",
    "Attacks & Spellcasting": "攻击与施法", Name: "名称", Atk: "攻击", "Damage / Type": "伤害／类型",
    Equipment: "装备", Gold: "金币", "Features & Traits": "特性与特质", Feat: "专长",
    "Other Proficiencies & Languages": "其他熟练项与语言", Armor: "护甲", Weapons: "武器",
    "all armor": "所有护甲", Tools: "工具", Languages: "语言", "Backstory & Notes": "背景故事与笔记",
    Ability: "施法属性", "Spell Save DC": "法术豁免难度", "Spell Atk": "法术攻击",
    Spellcasting: "施法", "Spell Slots": "法术位", Pact: "契约", Spells: "法术",
    Cantrips: "戏法", Prepared: "已准备", Known: "已知", Spellbook: "法术书",
    "Prepared after the next long rest": "下次长休后准备", used: "已用", ft: "英尺",
    STR: "力量", DEX: "敏捷", CON: "体质", INT: "智力", WIS: "感知", CHA: "魅力",
    LG: "守序善良", NG: "中立善良", CG: "混乱善良", LN: "守序中立", N: "绝对中立",
    CN: "混乱中立", LE: "守序邪恶", NE: "中立邪恶", CE: "混乱邪恶",
  },
};
export function pdfLabel(text: string, locale: AppLocale): string {
  return LABELS[locale]?.[text] ?? text;
}
