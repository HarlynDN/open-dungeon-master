import { defineMessages } from "./catalog.ts";

// Owned choice labels; canonical picks and source descriptions stay English.
export const FEAT_CHOICE_MESSAGES = /*#__PURE__*/ defineMessages({
  "callingUi.featChoice.choices": {
    "en": "{feat} choices",
    "zh-CN": "{feat}的选择"
  },
  "callingUi.featChoice.shared": {
    "en": "Any {count} of {kinds}, in any combination",
    "zh-CN": "从{kinds}中任选 {count} 项，可任意组合"
  },
  "callingUi.featChoice.left": {
    "en": " · {count} still to choose",
    "zh-CN": " · 还需选择 {count} 项"
  },
  "callingUi.featChoice.category.languages": {
    "en": "languages",
    "zh-CN": "语言"
  },
  "callingUi.featChoice.category.skills": {
    "en": "skills",
    "zh-CN": "技能"
  },
  "callingUi.featChoice.category.expertise": {
    "en": "expertise",
    "zh-CN": "专精"
  },
  "callingUi.featChoice.category.armor": {
    "en": "shields",
    "zh-CN": "盾牌"
  },
  "callingUi.featChoice.category.tools": {
    "en": "tools",
    "zh-CN": "工具"
  },
  "callingUi.featChoice.category.weapons": {
    "en": "weapons",
    "zh-CN": "武器"
  },
  "callingUi.featChoice.increaseAny": {
    "en": "+1 to an ability of your choice",
    "zh-CN": "任选一项属性 +1"
  },
  "callingUi.featChoice.increase": {
    "en": "+1 {abilities}",
    "zh-CN": "{abilities} +1"
  },
  "callingUi.featChoice.applied.armor": {
    "en": "armor training",
    "zh-CN": "护甲熟练"
  },
  "callingUi.featChoice.applied.weapons": {
    "en": "weapon training",
    "zh-CN": "武器熟练"
  },
  "callingUi.featChoice.applied.tools": {
    "en": "tool training",
    "zh-CN": "工具熟练"
  },
  "callingUi.featChoice.applied.any": {
    "en": "{count} picks in any combination",
    "zh-CN": "可任意组合的 {count} 项选择"
  },
  "callingUi.featChoice.applied.spells": {
    "en": "spells",
    "zh-CN": "法术"
  },
  "callingUi.featChoice.applied.damage": {
    "en": "the damage type",
    "zh-CN": "伤害类型选择"
  },
  "callingUi.featChoice.applied.combat": {
    "en": "its combat rules {tag}",
    "zh-CN": "{tag}"
  },
  "callingUi.featChoice.coverage": {
    "en": "The table applies {applied}; the DM runs the rest from the feat's text.",
    "zh-CN": "自动应用的效果：{applied}。其余效果由 DM 按专长说明处理。"
  },
  "callingUi.featChoice.noCoverage": {
    "en": "Nothing of this feat is applied by the table itself; the DM runs it from its text.",
    "zh-CN": "此专长的效果由 DM 按说明处理，目前不会自动应用。"
  },
  "callingUi.featChoice.listSeparator": {
    "en": ", ",
    "zh-CN": "、"
  },
  "callingUi.featChoice.or": {
    "en": " or ",
    "zh-CN": "或"
  },
  "callingUi.featChoice.skill": {
    "en": "Skill proficiency ({limit})",
    "zh-CN": "技能熟练（{limit}）"
  },
  "callingUi.featChoice.upTo": {
    "en": "up to {count}",
    "zh-CN": "最多 {count} 项"
  },
  "callingUi.featChoice.yourChoice": {
    "en": "{count} of your choice",
    "zh-CN": "任选 {count} 项"
  },
  "callingUi.featChoice.expertise": {
    "en": "Expertise ({count} of your skills)",
    "zh-CN": "专精（从已有技能中选择 {count} 项）"
  },
  "callingUi.featChoice.pickSkill": {
    "en": "Pick a skill first.",
    "zh-CN": "请先选择一项技能。"
  },
  "callingUi.featChoice.change": {
    "en": "Tap to change",
    "zh-CN": "点击更改"
  },
  "callingUi.featChoice.pickList": {
    "en": "Pick the spell list first.",
    "zh-CN": "请先选择法术列表。"
  },
  "callingUi.featChoice.label.language": {
    "en": "{feat} language {index}",
    "zh-CN": "{feat}的语言 {index}"
  },
  "callingUi.featChoice.choose.language": {
    "en": "Choose a language...",
    "zh-CN": "选择语言……"
  },
  "callingUi.featChoice.label.weapon": {
    "en": "{feat} weapon {index}",
    "zh-CN": "{feat}的武器 {index}"
  },
  "callingUi.featChoice.choose.weapon": {
    "en": "Choose a weapon...",
    "zh-CN": "选择武器……"
  },
  "callingUi.featChoice.label.damage": {
    "en": "{feat} damage type",
    "zh-CN": "{feat}的伤害类型"
  },
  "callingUi.featChoice.choose.damage": {
    "en": "Choose a damage type...",
    "zh-CN": "选择伤害类型……"
  },
  "callingUi.featChoice.label.list": {
    "en": "{feat} spell list",
    "zh-CN": "{feat}的法术列表"
  },
  "callingUi.featChoice.choose.list": {
    "en": "Choose a spell list...",
    "zh-CN": "选择法术列表……"
  },
  "callingUi.featChoice.label.ability": {
    "en": "{feat} spellcasting ability",
    "zh-CN": "{feat}的施法属性"
  },
  "callingUi.featChoice.choose.ability": {
    "en": "Choose the ability...",
    "zh-CN": "选择属性……"
  },
  "callingUi.featChoice.label.armor": {
    "en": "{feat} armor {index}",
    "zh-CN": "{feat}的护甲熟练 {index}"
  },
  "callingUi.featChoice.choose.armor": {
    "en": "Choose armor training...",
    "zh-CN": "选择护甲熟练……"
  },
  "callingUi.featChoice.label.tool": {
    "en": "{feat} tool {index}",
    "zh-CN": "{feat}的工具 {index}"
  },
  "callingUi.featChoice.choose.tool": {
    "en": "Choose a tool...",
    "zh-CN": "选择工具……"
  },
  "callingUi.featChoice.known": {
    "en": "Known from the feat: {spells}{free}.",
    "zh-CN": "此专长授予的已知法术：{spells}{free}。"
  },
  "callingUi.featChoice.free": {
    "en": ", castable once per long rest without a slot",
    "zh-CN": "，每次长休后可不消耗法术位施放一次"
  },
  "callingUi.featChoice.fixed": {
    "en": "Granted outright: {training}.",
    "zh-CN": "直接获得：{training}。"
  },
  "callingUi.featChoice.searchCantrips": {
    "en": "Search cantrips...",
    "zh-CN": "搜索戏法……"
  },
  "callingUi.featChoice.searchSpells": {
    "en": "Search spells...",
    "zh-CN": "搜索法术……"
  },
  "callingUi.featChoice.spellLabel": {
    "en": "{feat} {spell} {index}",
    "zh-CN": "{feat}：{spell} {index}"
  },
  "callingUi.featChoice.attackCantrip": {
    "en": "attack cantrip",
    "zh-CN": "攻击戏法"
  },
  "callingUi.featChoice.cantrip": {
    "en": "cantrip",
    "zh-CN": "戏法"
  },
  "callingUi.featChoice.spell": {
    "en": "{level}-level {school}{ritual}spell",
    "zh-CN": "{level}环{school}{ritual}法术"
  },
  "callingUi.featChoice.school": {
    "en": "{schools} ",
    "zh-CN": "{schools}系"
  },
  "callingUi.featChoice.ritual": {
    "en": "ritual ",
    "zh-CN": "仪式"
  },
  "callingUi.featChoice.engine.power": {
    "en": "[pc_attack powerAttack]",
    "zh-CN": "强力攻击规则"
  },
  "callingUi.featChoice.engine.reaction": {
    "en": "[use_reaction]",
    "zh-CN": "反应规则"
  },
  "callingUi.featChoice.engine.bonusAttack": {
    "en": "[pc_attack bonusAttack feature]",
    "zh-CN": "附赠攻击规则"
  },
  "callingUi.featChoice.engine.stun": {
    "en": "[pc_attack stunShot]",
    "zh-CN": "震慑射击规则"
  },
  "callingUi.featChoice.engine.bonus": {
    "en": "[take_action bonus]",
    "zh-CN": "附赠动作规则"
  },
  "callingUi.featChoice.engine.server": {
    "en": "[server]",
    "zh-CN": "自动结算的战斗效果"
  },
  "callingUi.featChoice.engine.casting": {
    "en": "[cast tools]",
    "zh-CN": "施法规则"
  },
  "sessionUi.entry.loading": {
    "en": "Opening the entry...",
    "zh-CN": "正在打开条目……"
  },
  "sessionUi.entry.missing": {
    "en": "That entry is not one you can read, or it has been removed.",
    "zh-CN": "你无权查看此条目，或条目已被移除。"
  },
  "sessionUi.open.missing": {
    "en": "Campaign not found.",
    "zh-CN": "找不到此战役。"
  },
  "sessionUi.open.answered": {
    "en": "Answered by {origin}",
    "zh-CN": "响应来自 {origin}"
  },
  "sessionUi.open.back": {
    "en": "Back to campaigns",
    "zh-CN": "返回战役列表"
  },
  "sessionUi.open.tableSignIn": {
    "en": "Sign in as a member of this table to show it.",
    "zh-CN": "请以此战役成员的身份登录后查看游戏桌面。"
  },
  "sessionUi.open.load": {
    "en": "Could not load the campaign.",
    "zh-CN": "无法加载战役。"
  },
  "sessionUi.open.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "sessionUi.open.notLoggedIn": {
    "en": "Not logged in.",
    "zh-CN": "尚未登录。"
  },
  "sessionUi.open.password": {
    "en": "Set a new password to continue.",
    "zh-CN": "请先设置新密码，再继续。"
  }
});
