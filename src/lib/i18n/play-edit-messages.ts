import { defineMessages } from "./catalog.ts";

// Native correction controls and reusable multi-picker chrome.
export const PLAY_EDIT_MESSAGES = defineMessages({
  "sheetPlay.between.line.madnessEmpty": { en: "{term}-term madness ()", "zh-CN": "{term}疯狂" },
  "sheetPlay.between.line.madnessEmptyTime": { en: "{term}-term madness (, {hours} h left)", "zh-CN": "{term}疯狂（剩余 {hours} 小时）" },
  "sheetPlay.between.term.indefinite": { en: "indefinite", "zh-CN": "不定期" },
  "sheetPlay.between.line.infected": {
    "en": "infected with {name}, symptoms in {hours} h",
    "zh-CN": "感染{name}，症状将在 {hours} 小时后出现"
  },
  "sheetPlay.between.line.recover": {
    "en": "{name} ({count} of {required} rest saves toward a cure)",
    "zh-CN": "{name}（康复所需的休息豁免已成功 {count}/{required} 次）"
  },
  "sheetPlay.between.line.cackle": {
    "en": "Cackle Fever (DC {dc}, {count} of 3 failed rest saves)",
    "zh-CN": "狂笑热（难度 {dc}，休息豁免已失败 {count}/3 次）"
  },
  "sheetPlay.between.line.sight": {
    "en": "Sight Rot (-{penalty}, {doses} of 3 Eyebright doses)",
    "zh-CN": "视腐病（减值 -{penalty}，小米草已服用 {doses}/3 剂）"
  },
  "sheetPlay.between.line.flaw": {
    "en": "indefinite madness, flaw: {flaw}",
    "zh-CN": "不定期疯狂，缺陷：{flaw}"
  },
  "sheetPlay.between.line.madness": {
    "en": "{term}-term madness ({conditions})",
    "zh-CN": "{term}疯狂（{conditions}）"
  },
  "sheetPlay.between.line.madnessTime": {
    "en": "{term}-term madness ({conditions}, {hours} h left)",
    "zh-CN": "{term}疯狂（{conditions}，剩余 {hours} 小时）"
  },
  "sheetPlay.between.line.poisonTime": {
    "en": "{name}, next save in {hours} h",
    "zh-CN": "{name}，下次豁免在 {hours} 小时后"
  },
  "sheetPlay.between.line.lifestyle": {
    "en": "lifestyle {lifestyle} ({cost} a day, paid at each dawn in town)",
    "zh-CN": "生活方式：{lifestyle}（每天 {cost}，在城镇中每逢黎明支付）"
  },
  "sheetPlay.between.line.crafting": {
    "en": "crafting {item} {progress} of {total}",
    "zh-CN": "制作{item}，进度 {progress}/{total}"
  },
  "sheetPlay.between.line.training": {
    "en": "training {subject} {days}/250 days",
    "zh-CN": "学习{subject}，进度 {days}/250 天"
  },
  "sheetPlay.between.line.research": {
    "en": "researching {topic} ({days} days)",
    "zh-CN": "研究{topic}（已进行 {days} 天）"
  },
  "sheetPlay.between.line.recuperating": {
    "en": "recuperating {days}/3 days",
    "zh-CN": "休养，进度 {days}/3 天"
  },
  "sheetPlay.between.term.short": {
    "en": "short",
    "zh-CN": "短期"
  },
  "sheetPlay.between.term.long": {
    "en": "long",
    "zh-CN": "长期"
  },
  "sheetPlay.between.lifestyle.wretched": {
    "en": "wretched",
    "zh-CN": "赤贫"
  },
  "sheetPlay.between.lifestyle.squalid": {
    "en": "squalid",
    "zh-CN": "污秽"
  },
  "sheetPlay.between.lifestyle.poor": {
    "en": "poor",
    "zh-CN": "贫寒"
  },
  "sheetPlay.between.lifestyle.modest": {
    "en": "modest",
    "zh-CN": "简朴"
  },
  "sheetPlay.between.lifestyle.comfortable": {
    "en": "comfortable",
    "zh-CN": "舒适"
  },
  "sheetPlay.between.lifestyle.wealthy": {
    "en": "wealthy",
    "zh-CN": "富裕"
  },
  "sheetPlay.between.lifestyle.aristocratic": {
    "en": "aristocratic",
    "zh-CN": "贵族"
  },
  "sheetPlay.between.name.cackle_fever": {
    "en": "Cackle Fever",
    "zh-CN": "狂笑热"
  },
  "sheetPlay.between.name.sewer_plague": {
    "en": "Sewer Plague",
    "zh-CN": "下水道瘟疫"
  },
  "sheetPlay.between.name.sight_rot": {
    "en": "Sight Rot",
    "zh-CN": "视腐病"
  },
  "sheetPlay.between.name.assassins_blood": {
    "en": "assassins blood",
    "zh-CN": "刺客之血"
  },
  "sheetPlay.between.name.burnt_othur_fumes": {
    "en": "burnt othur fumes",
    "zh-CN": "燃烧奥瑟烟"
  },
  "sheetPlay.between.name.crawler_mucus": {
    "en": "crawler mucus",
    "zh-CN": "爬行者黏液"
  },
  "sheetPlay.between.name.drow_poison": {
    "en": "drow poison",
    "zh-CN": "卓尔毒药"
  },
  "sheetPlay.between.name.essence_of_ether": {
    "en": "essence of ether",
    "zh-CN": "以太精华"
  },
  "sheetPlay.between.name.malice": {
    "en": "malice",
    "zh-CN": "恶意"
  },
  "sheetPlay.between.name.midnight_tears": {
    "en": "midnight tears",
    "zh-CN": "午夜之泪"
  },
  "sheetPlay.between.name.oil_of_taggit": {
    "en": "oil of taggit",
    "zh-CN": "塔吉特油"
  },
  "sheetPlay.between.name.pale_tincture": {
    "en": "pale tincture",
    "zh-CN": "苍白酊剂"
  },
  "sheetPlay.between.name.purple_worm_poison": {
    "en": "purple worm poison",
    "zh-CN": "紫虫毒液"
  },
  "sheetPlay.between.name.serpent_venom": {
    "en": "serpent venom",
    "zh-CN": "蛇毒"
  },
  "sheetPlay.between.name.torpor": {
    "en": "torpor",
    "zh-CN": "迟滞"
  },
  "sheetPlay.between.name.truth_serum": {
    "en": "truth serum",
    "zh-CN": "吐真剂"
  },
  "sheetPlay.between.name.wyvern_poison": {
    "en": "wyvern poison",
    "zh-CN": "飞龙毒液"
  },
  "sheetPlay.between.coin.gp": {
    "en": "gp",
    "zh-CN": "金币"
  },
  "sheetPlay.between.coin.sp": {
    "en": "sp",
    "zh-CN": "银币"
  },
  "sheetPlay.between.coin.cp": {
    "en": "cp",
    "zh-CN": "铜币"
  },
  "sheetPlay.between.coin.pp": {
    "en": "pp",
    "zh-CN": "铂金币"
  },
  "sheetDialog.edit.done": { en: "Done", "zh-CN": "完成" },
  "sheetDialog.edit.save": { en: "Save", "zh-CN": "保存" },
  "sheetDialog.edit.title": {
    "en": "Adjust {name}",
    "zh-CN": "调整{name}"
  },
  "sheetDialog.edit.intro": {
    "en": "Party lead correction of stats, items, and spells. Changes are logged to the session event log.",
    "zh-CN": "队长可修正角色数值、物品和法术。更改会记录在本次游戏的事件日志中。"
  },
  "sheetDialog.edit.numbers": {
    "en": "Numbers",
    "zh-CN": "数值"
  },
  "sheetDialog.edit.hp": {
    "en": "HP",
    "zh-CN": "生命值"
  },
  "sheetDialog.edit.tempHp": {
    "en": "Temp HP",
    "zh-CN": "临时生命值"
  },
  "sheetDialog.edit.maxHp": {
    "en": "Max HP",
    "zh-CN": "生命值上限"
  },
  "sheetDialog.edit.gold": {
    "en": "Gold",
    "zh-CN": "金币"
  },
  "sheetDialog.edit.xp": {
    "en": "XP",
    "zh-CN": "经验值"
  },
  "sheetDialog.edit.ac": {
    "en": "AC",
    "zh-CN": "护甲等级"
  },
  "sheetDialog.edit.pin": {
    "en": "Pin the armor class by hand",
    "zh-CN": "手动固定护甲等级"
  },
  "sheetDialog.edit.pinned": {
    "en": "Pinned. Armor would set {ac}. Unpin to hand it back.",
    "zh-CN": "已手动固定。按装备计算应为 {ac}；取消固定可恢复自动计算。"
  },
  "sheetDialog.edit.armor": {
    "en": "Armor sets it:",
    "zh-CN": "按装备计算："
  },
  "sheetDialog.edit.facing": {
    "en": "Attacks face {ac} right now: spells and forms on top ride along.",
    "zh-CN": "当前攻击判定使用的护甲等级为 {ac}，已包含法术和变身效果。"
  },
  "sheetDialog.edit.conditions": {
    "en": "Conditions (comma separated)",
    "zh-CN": "状态（用逗号分隔）"
  },
  "sheetDialog.edit.conditionExample": {
    "en": "poisoned, prone",
    "zh-CN": "中毒，倒地"
  },
  "sheetDialog.edit.items": {
    "en": "Items",
    "zh-CN": "物品"
  },
  "sheetDialog.edit.itemName": {
    "en": "Item name",
    "zh-CN": "物品名称"
  },
  "sheetDialog.edit.item": {
    "en": "item",
    "zh-CN": "物品"
  },
  "sheetDialog.edit.quantity": {
    "en": "Quantity of {name}",
    "zh-CN": "{name}的数量"
  },
  "sheetDialog.edit.removeItem": {
    "en": "Remove item",
    "zh-CN": "移除物品"
  },
  "sheetDialog.edit.searchItems": {
    "en": "Search items to add",
    "zh-CN": "搜索要添加的物品"
  },
  "sheetDialog.edit.spells": {
    "en": "Spells",
    "zh-CN": "法术"
  },
  "sheetDialog.edit.cantrips": {
    "en": "Cantrips",
    "zh-CN": "戏法"
  },
  "sheetDialog.edit.searchCantrips": {
    "en": "Search cantrips to add",
    "zh-CN": "搜索要添加的戏法"
  },
  "sheetDialog.edit.cantrip": {
    "en": "cantrip",
    "zh-CN": "戏法"
  },
  "sheetDialog.edit.level": {
    "en": "level {level}",
    "zh-CN": "{level}环"
  },
  "sheetDialog.edit.known": {
    "en": "Known",
    "zh-CN": "已知法术"
  },
  "sheetDialog.edit.searchKnown": {
    "en": "Search spells to add as known",
    "zh-CN": "搜索要加入已知列表的法术"
  },
  "sheetDialog.edit.spellbook": {
    "en": "Spellbook",
    "zh-CN": "法术书"
  },
  "sheetDialog.edit.searchBook": {
    "en": "Search spells to write in the spellbook",
    "zh-CN": "搜索要抄入法术书的法术"
  },
  "sheetDialog.edit.prepared": {
    "en": "Prepared",
    "zh-CN": "已准备法术"
  },
  "sheetDialog.edit.searchPrepared": {
    "en": "Search spells to add as prepared",
    "zh-CN": "搜索要准备的法术"
  },
  "sheetDialog.edit.pending": {
    "en": "Prepared at the next long rest",
    "zh-CN": "下次长休后准备"
  },
  "sheetDialog.edit.feats": {
    "en": "Feats",
    "zh-CN": "专长"
  },
  "sheetDialog.edit.searchFeats": {
    "en": "Search feats to add",
    "zh-CN": "搜索要添加的专长"
  },
  "sheetDialog.edit.reason": {
    "en": "Reason (shown in the log)",
    "zh-CN": "原因（会显示在日志中）"
  },
  "sheetDialog.edit.reasonExample": {
    "en": "DM double-counted the goblin's hit",
    "zh-CN": "DM 重复计算了这次攻击的伤害"
  },
  "sheetDialog.edit.held": {
    "en": "Saved. The server held these to what the sheet has:",
    "zh-CN": "已保存。以下消耗值已调整为角色卡允许的上限："
  },
  "sheetDialog.edit.worn": {
    "en": "worn",
    "zh-CN": "已穿戴"
  },
  "sheetDialog.edit.attuned": {
    "en": "attuned",
    "zh-CN": "已同调"
  },
  "sheetDialog.edit.attuning": {
    "en": "attunes at the next rest",
    "zh-CN": "下次休息后完成同调"
  },
  "sheetDialog.edit.unidentified": {
    "en": "unidentified",
    "zh-CN": "未鉴定"
  },
  "sheetDialog.edit.charges": {
    "en": "{count} charges",
    "zh-CN": "{count} 次充能"
  },
  "sheetDialog.edit.remove": {
    "en": "Remove {name}",
    "zh-CN": "移除{name}"
  },
  "sheetDialog.edit.pact": {
    "en": "Pact",
    "zh-CN": "契约"
  },
  "sheetDialog.edit.slotShort": {
    "en": "L{level}",
    "zh-CN": "{level}环"
  },
  "sheetDialog.edit.slotLevel": {
    "en": "Level {level}",
    "zh-CN": "{level}环"
  },
  "sheetDialog.edit.slotCounts": {
    "en": "{level} used/max",
    "zh-CN": "{level} 已用/上限"
  },
  "sheetDialog.edit.slotsUsed": {
    "en": "{level} slots used",
    "zh-CN": "{level}法术位已用数量"
  },
  "sheetDialog.edit.slotsMax": {
    "en": "{level} slots max",
    "zh-CN": "{level}法术位上限"
  },
  "sheetDialog.edit.error.save": {
    "en": "Could not save the correction.",
    "zh-CN": "无法保存修正。"
  },
  "sheetDialog.edit.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "sheetDialog.edit.error.missing": {
    "en": "Character not found.",
    "zh-CN": "未找到角色。"
  },
  "sheetDialog.edit.error.invalid": {
    "en": "Invalid sheet update.",
    "zh-CN": "角色卡更改无效。"
  },
  "sheetDialog.edit.held.resource": {
    "en": "{name} has {max}, so {max} are spent, not {used}",
    "zh-CN": "{name}的上限为 {max}，已用数量已从 {used} 调整为 {max}。"
  },
  "sheetDialog.edit.held.hitDice": {
    "en": "there are {max} hit dice, so {max} are spent, not {used}",
    "zh-CN": "生命骰总数为 {max}，已用数量已从 {used} 调整为 {max}。"
  },
  "sheetDialog.edit.held.classDice": {
    "en": "{class} has {max} hit dice, so {max} are spent, not {used}",
    "zh-CN": "{class}的生命骰总数为 {max}，已用数量已从 {used} 调整为 {max}。"
  },
  "sheetDialog.edit.held.slots": {
    "en": "there are {max} level {level} slots, so {max} are spent, not {used}",
    "zh-CN": "{level}环法术位的上限为 {max}，已用数量已从 {used} 调整为 {max}。"
  },
  "sheetDialog.edit.held.pact": {
    "en": "there are {max} pact slots, so {max} are spent, not {used}",
    "zh-CN": "契约法术位的上限为 {max}，已用数量已从 {used} 调整为 {max}。"
  },
  "gearUi.multi.already": {
    "en": "already added",
    "zh-CN": "已添加"
  },
  "gearUi.multi.homebrew": {
    "en": "homebrew",
    "zh-CN": "自制内容"
  },
  "gearUi.multi.custom": {
    "en": "Add \"{name}\" as custom",
    "zh-CN": "将“{name}”添加为自定义内容"
  },
  "gearUi.multi.packMissing": {
    "en": "Content pack not installed; add entries by name instead.",
    "zh-CN": "未安装内容包；也可以按名称添加自定义内容。"
  },
  "gearUi.multi.unadmittedOne": {
    "en": "Your own {names} is not offered at this table: whoever runs it keeps a copy to admit one.",
    "zh-CN": "你的自制内容 {names} 尚未获准用于此战役；主持人保留副本后即可准入。"
  },
  "gearUi.multi.unadmittedMany": {
    "en": "Your own {names} are not offered at this table: whoever runs it keeps a copy to admit one.",
    "zh-CN": "你的自制内容 {names} 尚未获准用于此战役；主持人保留副本后即可准入。"
  },
  "gearUi.multi.remove": {
    "en": "Remove {name}",
    "zh-CN": "移除{name}"
  },
  "gearUi.multi.add": {
    "en": "Add {count}",
    "zh-CN": "添加 {count} 项"
  },
  "sheetPlay.between.title": {
    "en": "Between adventures",
    "zh-CN": "冒险间歇"
  },
  "sheetPlay.between.secret": {
    "en": "(DM only)",
    "zh-CN": "（仅 DM 可见）"
  }
});
