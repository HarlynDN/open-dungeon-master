import { defineMessages } from "./catalog.ts";

export const EQUIPMENT_HELP_MESSAGES = /*#__PURE__*/ defineMessages({
  "itemHelp.rarity.crystalBall": { "en": "Very rare or legendary", "zh-CN": "极珍稀或传奇" },
  "itemHelp.type.ammunition": {"en": "Weapon (any ammunition)", "zh-CN": "武器（任意弹药）"},
  "itemHelp.type.arrow": {"en": "Weapon (arrow)", "zh-CN": "武器（箭）"},
  "itemHelp.type.axe": {"en": "Weapon (any axe)", "zh-CN": "武器（任意斧）"},
  "itemHelp.type.dagger": {"en": "Weapon (dagger)", "zh-CN": "武器（匕首）"},
  "itemHelp.type.sword": {"en": "Weapon (any sword)", "zh-CN": "武器（任意剑）"},
  "itemHelp.type.warhammer": {"en": "Weapon (warhammer)", "zh-CN": "武器（战锤）"},
  "itemHelp.type.axeSword": {"en": "Weapon (any axe or sword)", "zh-CN": "武器（任意斧或剑）"},
  "itemHelp.type.maul": {"en": "Weapon (maul)", "zh-CN": "武器（巨锤）"},
  "itemHelp.type.rod": {"en": "Rod", "zh-CN": "权杖"},
  "itemHelp.type.javelin": {"en": "Weapon (javelin)", "zh-CN": "武器（标枪）"},
  "itemHelp.type.mace": {"en": "Weapon (mace)", "zh-CN": "武器（钉头锤）"},
  "itemHelp.type.longbow": {"en": "Weapon (longbow)", "zh-CN": "武器（长弓）"},
  "itemHelp.type.scimitar": {"en": "Weapon (scimitar)", "zh-CN": "武器（弯刀）"},
  "itemHelp.type.staff": {"en": "Staff", "zh-CN": "法杖"},
  "itemHelp.type.longsword": {"en": "Weapon (longsword)", "zh-CN": "武器（长剑）"},
  "itemHelp.type.slashingSword": {"en": "Weapon (any sword that deals slashing damage)", "zh-CN": "武器（任意造成挥砍伤害的剑）"},
  "itemHelp.type.trident": {"en": "Weapon (trident)", "zh-CN": "武器（三叉戟）"},
  "itemHelp.type.anyWeapon": {"en": "Weapon (any)", "zh-CN": "武器（任意）"},

  "itemHelp.type.potion": { "en": "Potion", "zh-CN": "药水" },
  "itemHelp.type.ring": { "en": "Ring", "zh-CN": "戒指" },
  "itemHelp.type.wand": { "en": "Wand", "zh-CN": "魔杖" },
  "itemHelp.type.mediumHeavy": { "en": "Armor (medium or heavy, but not hide)", "zh-CN": "护甲（中甲或重甲，兽皮甲除外）" },
  "itemHelp.type.plate": { "en": "Armor (plate)", "zh-CN": "护甲（板甲）" },
  "itemHelp.type.anyArmor": { "en": "Armor (light, medium, or heavy)", "zh-CN": "护甲（轻甲、中甲或重甲）" },
  "itemHelp.type.chainShirt": { "en": "Armor (chain shirt)", "zh-CN": "护甲（链甲衫）" },
  "itemHelp.type.shieldArmor": { "en": "Armor (shield)", "zh-CN": "护甲（盾牌）" },
  "itemHelp.rarity.variable": { "en": "Rarity varies", "zh-CN": "稀有度不一" },
  "itemHelp.rarity.armorBonuses": { "en": "Rare (+1), very rare (+2), or legendary (+3)", "zh-CN": "珍稀（+1）、极珍稀（+2）或传奇（+3）" },
  "itemHelp.rarity.gearBonuses": { "en": "Uncommon (+1), rare (+2), or very rare (+3)", "zh-CN": "非普通（+1）、珍稀（+2）或极珍稀（+3）" },
  "itemHelp.propertyRange": { "en": "range {value}", "zh-CN": "射程 {value}" },
  "itemHelp.loading": {
    "en": "Looking it up...",
    "zh-CN": "正在查阅……"
  },
  "itemHelp.noDescription": {
    "en": "No description available. The content pack may not be installed, or this entry was added by hand.",
    "zh-CN": "暂无说明。内容包可能尚未安装，也可能是手动添加的条目。"
  },
  "itemHelp.noDetails": {
    "en": "No details available. The content pack may not be installed, or this item was added by hand.",
    "zh-CN": "暂无详细信息。内容包可能尚未安装，也可能是手动添加的物品。"
  },
  "itemHelp.attunement": {
    "en": "Requires attunement",
    "zh-CN": "需要同调"
  },
  "itemHelp.magicBonus": {
    "en": "+{bonus} magic",
    "zh-CN": "魔法加值 +{bonus}"
  },
  "itemHelp.weight": {
    "en": "Weight",
    "zh-CN": "重量"
  },
  "itemHelp.value": {
    "en": "Value",
    "zh-CN": "价值"
  },
  "itemHelp.acBonus": {
    "en": "AC bonus",
    "zh-CN": "护甲等级加值"
  },
  "itemHelp.ac": {
    "en": "Armor class",
    "zh-CN": "护甲等级"
  },
  "itemHelp.damage": {
    "en": "Damage",
    "zh-CN": "伤害"
  },
  "itemHelp.none": {
    "en": "None",
    "zh-CN": "无"
  },
  "itemHelp.range": {
    "en": "Range",
    "zh-CN": "射程"
  },
  "itemHelp.shield": {
    "en": "Shield",
    "zh-CN": "盾牌"
  },
  "itemHelp.shieldRule": {
    "en": "Carried in one hand; only one shield counts at a time.",
    "zh-CN": "单手持用；同时只能获得一面盾牌的效果。"
  },
  "itemHelp.dexterity": {
    "en": "Dexterity",
    "zh-CN": "敏捷"
  },
  "itemHelp.strength": {
    "en": "Strength",
    "zh-CN": "力量"
  },
  "itemHelp.strengthRule": {
    "en": "Needs {strength}; below that, your speed drops by 10 feet while wearing it.",
    "zh-CN": "需要力量 {strength}；力量不足时，穿戴该护甲使速度降低 10 尺。"
  },
  "itemHelp.noMinimum": {
    "en": "No minimum.",
    "zh-CN": "无最低要求。"
  },
  "itemHelp.stealth": {
    "en": "Stealth",
    "zh-CN": "隐匿"
  },
  "itemHelp.stealthRule": {
    "en": "Disadvantage on Dexterity (Stealth) checks while wearing it.",
    "zh-CN": "穿戴时进行敏捷（隐匿）检定具有劣势。"
  },
  "itemHelp.noPenalty": {
    "en": "No penalty.",
    "zh-CN": "无减益。"
  },
  "itemHelp.weaponBonus": {
    "en": "+{bonus} weapon",
    "zh-CN": "武器加值 +{bonus}"
  },
  "itemHelp.weaponBonusRule": {
    "en": "Adds {bonus} to attack and damage rolls.",
    "zh-CN": "攻击检定与伤害掷骰均获得 +{bonus}。"
  },
  "itemHelp.noDamage": {
    "en": "No damage",
    "zh-CN": "不造成伤害"
  },
  "itemHelp.noDamageRule": {
    "en": "It does not hurt on its own; its special rules say what it does.",
    "zh-CN": "该物品本身不造成伤害；效果由其特殊规则说明。"
  },
  "itemHelp.armor": {
    "en": "Armor",
    "zh-CN": "护甲"
  },
  "itemHelp.weapon": {
    "en": "Weapon",
    "zh-CN": "武器"
  },
  "itemHelp.description": {
    "en": "Description",
    "zh-CN": "说明"
  },
  "itemHelp.openEntry": {
    "en": "Select the mark beside it for the full entry.",
    "zh-CN": "点击旁边的标记查看完整条目。"
  },
  "itemHelp.dexFull": {
    "en": "Add your full Dexterity modifier.",
    "zh-CN": "加上完整的敏捷调整值。"
  },
  "itemHelp.dexNone": {
    "en": "Dexterity does not add to it.",
    "zh-CN": "不计入敏捷调整值。"
  },
  "itemHelp.dexCap": {
    "en": "Add your Dexterity modifier, up to +{cap}.",
    "zh-CN": "加上敏捷调整值，最高为 +{cap}。"
  },
  "itemHelp.acDex": {
    "en": "{base} + Dex",
    "zh-CN": "{base} + 敏捷调整值"
  },
  "itemHelp.acDexCap": {
    "en": "{base} + Dex (max {cap})",
    "zh-CN": "{base} + 敏捷调整值（最高 {cap}）"
  },
  "itemHelp.weightValue": {
    "en": "{value} lb.",
    "zh-CN": "{value} 磅"
  },
  "itemHelp.rangeValue": {
    "en": "{value} ft.",
    "zh-CN": "{value} 尺"
  },
  "itemHelp.goldValue": {
    "en": "{value} gp",
    "zh-CN": "{value} 金币"
  },
  "itemHelp.silverValue": {
    "en": "{value} sp",
    "zh-CN": "{value} 银币"
  },
  "itemHelp.copperValue": {
    "en": "{value} cp",
    "zh-CN": "{value} 铜币"
  },
  "itemHelp.propertyWithValue": {
    "en": "{property} ({value})",
    "zh-CN": "{property}（{value}）"
  },
  "itemHelp.type.0": {
    "en": "Simple melee weapon",
    "zh-CN": "简易近战武器"
  },
  "itemHelp.type.1": {
    "en": "Simple ranged weapon",
    "zh-CN": "简易远程武器"
  },
  "itemHelp.type.2": {
    "en": "Martial melee weapon",
    "zh-CN": "军用近战武器"
  },
  "itemHelp.type.3": {
    "en": "Martial ranged weapon",
    "zh-CN": "军用远程武器"
  },
  "itemHelp.type.4": {
    "en": "Firearm ranged weapon",
    "zh-CN": "枪械远程武器"
  },
  "itemHelp.type.5": {
    "en": "Firearm melee weapon",
    "zh-CN": "枪械近战武器"
  },
  "itemHelp.type.6": {
    "en": "Light armor",
    "zh-CN": "轻甲"
  },
  "itemHelp.type.7": {
    "en": "Medium armor",
    "zh-CN": "中甲"
  },
  "itemHelp.type.8": {
    "en": "Heavy armor",
    "zh-CN": "重甲"
  },
  "itemHelp.type.9": {
    "en": "Shield",
    "zh-CN": "盾牌"
  },
  "itemHelp.type.10": {
    "en": "Adventuring gear",
    "zh-CN": "冒险用品"
  },
  "itemHelp.type.11": {
    "en": "Magic item",
    "zh-CN": "魔法物品"
  },
  "itemHelp.type.12": {
    "en": "Weapon",
    "zh-CN": "武器"
  },
  "itemHelp.type.13": {
    "en": "Armor",
    "zh-CN": "护甲"
  },
  "itemHelp.type.14": {
    "en": "Gear",
    "zh-CN": "装备"
  },
  "itemHelp.type.15": {
    "en": "Wondrous item",
    "zh-CN": "奇物"
  }
});
