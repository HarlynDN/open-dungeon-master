import { defineMessages } from "./catalog.ts";

export const GEAR_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "gearUi.listSeparator": { "en": ", ", "zh-CN": "、" },
  "gearUi.sp": { "en": "sp", "zh-CN": "银币" },
  "gearUi.quantity": { "en": "{name} x{quantity}", "zh-CN": "{name} ×{quantity}" },
  "gearUi.wealthDice": { "en": "{dice} gp", "zh-CN": "{dice} 金币" },
  "gearUi.background.shortbow with 20 arrows": { "en": "Shortbow with 20 arrows", "zh-CN": "短弓与 20 支箭" },
  "gearUi.acNote": { "en": "AC {ac}", "zh-CN": "防御等级 {ac}" },
  "gearUi.acBonusNote": { "en": "{bonus} AC", "zh-CN": "防御等级 {bonus}" },
  "gearUi.equipment": {
    "en": "Equipment",
    "zh-CN": "装备"
  },
  "gearUi.suggested": {
    "en": "Suggested for your class:",
    "zh-CN": "为你的职业推荐："
  },
  "gearUi.suggestedHeading": {
    "en": "Suggested for your class",
    "zh-CN": "职业推荐"
  },
  "gearUi.recommendedNote": {
    "en": "What this class is proficient with, plus the kit everyone carries.",
    "zh-CN": "此职业熟练使用的装备，以及每位冒险者都会携带的基本用品。"
  },
  "gearUi.adds": {
    "en": "Adds {items}.",
    "zh-CN": "添加{items}。"
  },
  "gearUi.starterComplete": {
    "en": "Your kit already carries the basics: a backpack, bedroll, rations, rope, torches and a waterskin.",
    "zh-CN": "你的套装已包含基本用品：背包、铺盖卷、口粮、绳索、火把和水袋。"
  },
  "gearUi.starterOne": {
    "en": "Add adventurer's starter pack ({count} item the kit lacks)",
    "zh-CN": "补齐冒险者基本用品（还缺 {count} 种）"
  },
  "gearUi.starterMany": {
    "en": "Add adventurer's starter pack ({count} items the kit lacks)",
    "zh-CN": "补齐冒险者基本用品（还缺 {count} 种）"
  },
  "gearUi.starterAlready": {
    "en": "Starter pack already in the kit",
    "zh-CN": "套装已包含基本用品"
  },
  "gearUi.plusSearch": {
    "en": "plus search armor, weapons, and gear:",
    "zh-CN": "也可以搜索护甲、武器和其他装备："
  },
  "gearUi.searchItems": {
    "en": "Search items (e.g. longsword, chain mail, rope)",
    "zh-CN": "搜索物品（例如：长剑、链甲、绳索）"
  },
  "gearUi.browseItems": {
    "en": "Browse every weapon, armor and item",
    "zh-CN": "浏览所有武器、护甲和物品"
  },
  "gearUi.kit": {
    "en": "kit",
    "zh-CN": "基本用品"
  },
  "gearUi.weapons": {
    "en": "Weapons",
    "zh-CN": "武器"
  },
  "gearUi.armor": {
    "en": "Armor and shields",
    "zh-CN": "护甲与盾牌"
  },
  "gearUi.adventuring": {
    "en": "Adventuring gear",
    "zh-CN": "冒险用品"
  },
  "gearUi.magic": {
    "en": "Magic items",
    "zh-CN": "魔法物品"
  },
  "gearUi.askMagic": {
    "en": "Ask your DM before starting with one of these.",
    "zh-CN": "创建角色时如要携带这些物品，请先和地下城主确认。"
  },
  "gearUi.rarityUnknown": {
    "en": "Rarity not given",
    "zh-CN": "未注明稀有度"
  },
  "gearUi.coinLeft": {
    "en": "Coin left after the gear",
    "zh-CN": "购置装备后的余额"
  },
  "gearUi.gp": {
    "en": "gp",
    "zh-CN": "金币"
  },
  "gearUi.cp": {
    "en": "cp",
    "zh-CN": "铜币"
  },
  "gearUi.rollWealth": {
    "en": "Roll starting wealth ({dice})",
    "zh-CN": "掷初始财富骰（{dice}）"
  },
  "gearUi.rolledWealth": {
    "en": "The server rolled {faces} on {dice}: {gold} gp. ",
    "zh-CN": "服务器掷 {dice}，骰面为 {faces}：共 {gold} 金币。 "
  },
  "gearUi.unpaidOne": {
    "en": "One item above cannot be paid for; the Continue button waits on that.",
    "zh-CN": "上方有一项物品无法购买；处理后才能继续。"
  },
  "gearUi.unpaidMany": {
    "en": "{count} items above cannot be paid for; the Continue button waits on that.",
    "zh-CN": "上方有 {count} 项物品无法购买；处理后才能继续。"
  },
  "gearUi.kitSourceOdm": {
    "en": "The {class}'s kit, free. Remove what you will not carry.",
    "zh-CN": "这是{class}的免费初始装备。不携带的物品可以移除。"
  },
  "gearUi.kitSourceBook": {
    "en": "The {class}'s starting equipment, free. Where the book offers a choice, pick one.",
    "zh-CN": "这是{class}的免费初始装备。有多个选项时，请选择一个。"
  },
  "gearUi.kitChoice": {
    "en": "Equipment choice {number}",
    "zh-CN": "装备选择 {number}"
  },
  "gearUi.acWithKit": {
    "en": "Armor class with this kit",
    "zh-CN": "使用此套装的防御等级"
  },
  "gearUi.acWorn": {
    "en": "From what is worn: {parts}.",
    "zh-CN": "根据穿戴的装备：{parts}。"
  },
  "gearUi.acEmpty": {
    "en": "10 plus Dexterity with nothing worn.",
    "zh-CN": "未穿戴装备时为 10 加敏捷调整值。"
  },
  "gearUi.unarmored": {
    "en": "Unarmored",
    "zh-CN": "未着甲"
  },
  "gearUi.bonus": {
    "en": "bonus",
    "zh-CN": "加值"
  },
  "gearUi.backgroundKit": {
    "en": "The {background}'s kit, free. Where it offers a choice, pick one.",
    "zh-CN": "这是{background}背景的免费初始装备。有多个选项时，请选择一个。"
  },
  "gearUi.backgroundChoice": {
    "en": "{background} kit choice {number}",
    "zh-CN": "{background}背景装备选择 {number}"
  },
  "gearUi.which": {
    "en": "Which {item}",
    "zh-CN": "选择{item}"
  },
  "gearUi.fromTool": {
    "en": "from your tool proficiency",
    "zh-CN": "来自你的工具熟练"
  },
  "gearUi.toolOwed": {
    "en": "the tool you pick on the Calling step.",
    "zh-CN": "你在职业步骤中选择的工具。"
  },
  "gearUi.purseStored": {
    "en": "The coin this character already carries; gear added now is paid from it.{spent}",
    "zh-CN": "角色原本携带的钱币；现在添加的装备从中扣费。{spent}"
  },
  "gearUi.purseRolled": {
    "en": "This table rolls a {class}'s starting wealth in place of the class kit, and every item is bought from it.{spent}",
    "zh-CN": "此战役以掷骰决定{class}的初始财富，替代职业套装；所有物品都需从中购买。{spent}"
  },
  "gearUi.purseNeedRoll": {
    "en": "This table rolls a {class}'s starting wealth ({dice}) in place of the class kit. Roll it, then buy your gear.",
    "zh-CN": "此战役以掷骰决定{class}的初始财富（{dice}），替代职业套装。请先掷骰，再购买装备。"
  },
  "gearUi.purseBackground": {
    "en": "The {background} background's purse of {gold} gp. The class and background kit is free; anything more is bought from the purse.{spent}",
    "zh-CN": "{background}背景提供 {gold} 金币。职业和背景套装免费，额外物品需从这些钱币中购买。{spent}"
  },
  "gearUi.bought": {
    "en": " Bought: {coin}.",
    "zh-CN": " 已购买：{coin}。"
  },
  "gearUi.errorWealth": {
    "en": "The server could not roll your starting wealth. Try again.",
    "zh-CN": "服务器未能掷出初始财富，请重试。"
  },
  "gearUi.errorWealthNetwork": {
    "en": "Could not reach the server to roll your starting wealth.",
    "zh-CN": "无法连接服务器掷初始财富骰。"
  },
  "gearUi.errorCampaign": {
    "en": "That campaign is not one of yours.",
    "zh-CN": "你没有加入此战役。"
  },
  "gearUi.errorWealthMethod": {
    "en": "This table starts characters with their class's equipment and their background's coin; starting wealth is not rolled here.",
    "zh-CN": "此战役使用职业装备和背景钱币作为初始资源，不掷初始财富骰。"
  },
  "gearUi.narrow": {
    "en": "Narrow this list...",
    "zh-CN": "筛选此列表……"
  },
  "gearUi.narrowAria": {
    "en": "Narrow the browsed list",
    "zh-CN": "筛选浏览列表"
  },
  "gearUi.packMissing": {
    "en": "The content pack is not installed on this server, so there is nothing to search or browse. Whoever runs it can install it with: node scripts/import-open5e.mjs",
    "zh-CN": "此服务器尚未安装资料包，目前没有可搜索或浏览的内容。服务器管理员可运行 node scripts/import-open5e.mjs 安装。"
  },
  "gearUi.listMissing": {
    "en": "The content pack is not installed on this server, so there is nothing to list. Whoever runs it can install it with: node scripts/import-open5e.mjs",
    "zh-CN": "此服务器尚未安装资料包，目前没有可列出的内容。服务器管理员可运行 node scripts/import-open5e.mjs 安装。"
  },
  "gearUi.noMatch": {
    "en": "Nothing matched \"{query}\". Try fewer letters, or pick from the full list.",
    "zh-CN": "没有与“{query}”匹配的结果。可以缩短搜索词，或从完整列表中选择。"
  },
  "gearUi.unadmittedOne": {
    "en": "Your own {names} is not offered at this table: whoever runs it keeps a copy in their workshop to admit one.",
    "zh-CN": "你制作的{names}尚未获准用于此战役；战役主持人可在自己的工坊中保留副本并准许使用。"
  },
  "gearUi.unadmittedMany": {
    "en": "Your own {names} are not offered at this table: whoever runs it keeps a copy in their workshop to admit one.",
    "zh-CN": "你制作的{names}尚未获准用于此战役；战役主持人可在自己的工坊中保留副本并准许使用。"
  },
  "gearUi.homebrew": {
    "en": "homebrew",
    "zh-CN": "自制内容"
  },
  "gearUi.nothing": {
    "en": "Nothing here.",
    "zh-CN": "这里暂无内容。"
  },
  "gearUi.truncated": {
    "en": "Showing the first {count}. Search by name above for the rest.",
    "zh-CN": "目前显示前 {count} 项。其余内容可在上方按名称搜索。"
  },
  "gearUi.rarity.common": {
    "en": "Common",
    "zh-CN": "普通"
  },
  "gearUi.rarity.uncommon": {
    "en": "Uncommon",
    "zh-CN": "非普通"
  },
  "gearUi.rarity.rare": {
    "en": "Rare",
    "zh-CN": "珍稀"
  },
  "gearUi.rarity.very rare": {
    "en": "Very rare",
    "zh-CN": "极珍稀"
  },
  "gearUi.rarity.legendary": {
    "en": "Legendary",
    "zh-CN": "传奇"
  },
  "gearUi.rarity.artifact": {
    "en": "Artifact",
    "zh-CN": "神器"
  },
  "gearUi.kind.weapon": {
    "en": "weapon",
    "zh-CN": "武器"
  },
  "gearUi.kind.armor": {
    "en": "armor",
    "zh-CN": "护甲"
  },
  "gearUi.kind.gear": {
    "en": "gear",
    "zh-CN": "用品"
  },
  "gearUi.kind.magic_item": {
    "en": "magic_item",
    "zh-CN": "魔法物品"
  },
  "gearUi.slot.simple": {
    "en": "A simple weapon",
    "zh-CN": "一件简易武器"
  },
  "gearUi.slot.simple-melee": {
    "en": "A simple melee weapon",
    "zh-CN": "一件简易近战武器"
  },
  "gearUi.slot.martial": {
    "en": "A martial weapon",
    "zh-CN": "一件军用武器"
  },
  "gearUi.slot.martial-melee": {
    "en": "A martial melee weapon",
    "zh-CN": "一件军用近战武器"
  },
  "gearUi.slot.instrument": {
    "en": "A musical instrument",
    "zh-CN": "一件乐器"
  },
  "gearUi.slotExcept": {
    "en": "{slot} other than the {except}",
    "zh-CN": "{slot}（不含{except}）"
  },
  "gearUi.background.other musical instrument": {
    "en": "Other musical instrument",
    "zh-CN": "其他乐器"
  },
  "gearUi.background.artisan's tools": {
    "en": "Artisan's tools",
    "zh-CN": "工匠工具"
  },
  "gearUi.background.a set of artisan's tools of your choice": {
    "en": "A set of artisan's tools of your choice",
    "zh-CN": "自选一套工匠工具"
  }
});
