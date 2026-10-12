import { defineMessages } from "./catalog.ts";

// Structured audit/timeline projection; stored reasons and protocol fields stay raw.
export const FEED_MESSAGES = /*#__PURE__*/ defineMessages({
  "feedUi.undo.title": {
    "en": "Undo anyway?",
    "zh-CN": "仍然撤销？"
  },
  "feedUi.undo.description": {
    "en": "Newer changes touched the same fields; undoing will overwrite them.",
    "zh-CN": "较新的修改涉及同样的字段，撤销会覆盖这些修改。"
  },
  "feedUi.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "feedUi.undo.confirm": {
    "en": " Undo anyway",
    "zh-CN": " 仍然撤销"
  },
  "feedUi.empty": {
    "en": "No stat changes yet. Damage, loot, XP, conditions, and milestones the DM applies will show here.",
    "zh-CN": "暂无数值变更。DM 处理的伤害、战利品、经验值、状态和里程碑会显示在这里。"
  },
  "feedUi.undo.turnTip": {
    "en": "Undo every sheet change from this DM turn (stats only)",
    "zh-CN": "撤销此 DM 回合中的所有角色卡变更（仅数值）"
  },
  "feedUi.undo.turn": {
    "en": "Revert this turn ({count})",
    "zh-CN": "撤销此回合（{count} 项）"
  },
  "feedUi.undo.undone": {
    "en": "undone",
    "zh-CN": "已撤销"
  },
  "feedUi.undo.tip": {
    "en": "Undo this change (restores the sheet fields it touched)",
    "zh-CN": "撤销此项变更（恢复涉及的角色卡字段）"
  },
  "feedUi.undo.label": {
    "en": "Undo this change",
    "zh-CN": "撤销此项变更"
  },
  "feedUi.someone": {
    "en": "Someone",
    "zh-CN": "某位角色"
  },
  "feedUi.separator": {
    "en": ", ",
    "zh-CN": "、"
  },
  "feedUi.timeline.loading": {
    "en": "Laying out the years...",
    "zh-CN": "正在整理时间线……"
  },
  "feedUi.timeline.title": {
    "en": "Timeline",
    "zh-CN": "时间线"
  },
  "feedUi.timeline.filters": {
    "en": "Show on the line",
    "zh-CN": "时间线显示内容"
  },
  "feedUi.timeline.empty": {
    "en": "Nothing has happened yet. The first closed chapter starts the line.",
    "zh-CN": "暂无事件。第一个章节结束后，时间线就会开始记录。"
  },
  "feedUi.timeline.dm": {
    "en": "DM",
    "zh-CN": "DM"
  },
  "feedUi.timeline.chapterTitle": {
    "en": "Chapter {index}",
    "zh-CN": "第 {index} 章"
  },
  "feedUi.timeline.actTitle": {
    "en": "End of Act {numeral}{name}",
    "zh-CN": "第 {numeral} 幕结束{name}"
  },
  "feedUi.timeline.actName": {
    "en": ": {name}",
    "zh-CN": "：{name}"
  },
  "feedUi.timeline.sessionTitle": {
    "en": "Session",
    "zh-CN": "场次"
  },
  "feedUi.timeline.nowTitle": {
    "en": "Now",
    "zh-CN": "现在"
  },
  "feedUi.audit.formBreak": {
    "en": "{name}'s {form} form breaks{carryover}",
    "zh-CN": "{name}的{form}形态解除{carryover}"
  },
  "feedUi.audit.carryover": {
    "en": ", {amount} damage carrying through",
    "zh-CN": "，{amount} 点伤害溢出至本体"
  },
  "feedUi.audit.formDamage": {
    "en": "{name}'s {form} form takes {amount} damage ({hp} beast HP)",
    "zh-CN": "{name}的{form}形态受到 {amount} 点伤害（形态生命值 {hp}）"
  },
  "feedUi.audit.endurance": {
    "en": "{name} holds on at 1 HP ({feature})",
    "zh-CN": "{name}凭借{feature}挺住，生命值保留为 1"
  },
  "feedUi.audit.damage": {
    "en": "{name} takes {amount} damage{type} ({hp} HP)",
    "zh-CN": "{name}受到 {amount} 点伤害{type}（生命值 {hp}）"
  },
  "feedUi.audit.damageType": {
    "en": " ({type})",
    "zh-CN": "（{type}）"
  },
  "feedUi.audit.heal": {
    "en": "{name} heals {amount} ({hp} HP)",
    "zh-CN": "{name}获得 {amount} 点治疗（生命值 {hp}）"
  },
  "feedUi.audit.xp": {
    "en": "{name} gains {amount} XP ({total} total)",
    "zh-CN": "{name}获得 {amount} 点经验值（总计 {total}）"
  },
  "feedUi.audit.goldGain": {
    "en": "{name} gains {amount} gold ({gold} gp)",
    "zh-CN": "{name}获得 {amount} 金币（当前 {gold} 金币）"
  },
  "feedUi.audit.goldLose": {
    "en": "{name} loses {amount} gold ({gold} gp)",
    "zh-CN": "{name}失去 {amount} 金币（当前 {gold} 金币）"
  },
  "feedUi.audit.itemGrant": {
    "en": "{name} receives {item}{qty}",
    "zh-CN": "{name}获得{item}{qty}"
  },
  "feedUi.audit.itemRemove": {
    "en": "{name} loses {item}{qty}",
    "zh-CN": "{name}失去{item}{qty}"
  },
  "feedUi.audit.qty": {
    "en": " x{qty}",
    "zh-CN": " ×{qty}"
  },
  "feedUi.audit.conditionSet": {
    "en": "{name} is {condition}",
    "zh-CN": "{name}陷入{condition}状态"
  },
  "feedUi.audit.conditionClear": {
    "en": "{name} is no longer {condition}",
    "zh-CN": "{name}不再处于{condition}状态"
  },
  "feedUi.audit.slot": {
    "en": "{name} expends a level {level} spell slot",
    "zh-CN": "{name}消耗了一个 {level} 环法术位"
  },
  "feedUi.audit.itemUse": {
    "en": "{name} uses {item}",
    "zh-CN": "{name}使用{item}"
  },
  "feedUi.audit.sell": {
    "en": "{name} sells {item}{qty} for {price} gold",
    "zh-CN": "{name}出售{item}{qty}，获得 {price} 金币"
  },
  "feedUi.audit.buy": {
    "en": "{name} buys {item}{qty} for {price} gold",
    "zh-CN": "{name}购买{item}{qty}，花费 {price} 金币"
  },
  "feedUi.audit.resourceReceive": {
    "en": "{name} receives {resource} from {from}",
    "zh-CN": "{name}从{from}获得{resource}"
  },
  "feedUi.audit.resourceSpend": {
    "en": "{name} spends {uses}{resource}",
    "zh-CN": "{name}消耗{resource}{uses}"
  },
  "feedUi.audit.uses": {
    "en": "{count} uses of ",
    "zh-CN": "（{count} 次）"
  },
  "feedUi.audit.tempHp": {
    "en": "{name} gains {amount} temporary HP",
    "zh-CN": "{name}获得 {amount} 点临时生命值"
  },
  "feedUi.audit.spellRemove": {
    "en": "{name} loses the spell {spell}",
    "zh-CN": "{name}失去法术{spell}"
  },
  "feedUi.audit.spellLearn": {
    "en": "{name} learns the spell {spell}",
    "zh-CN": "{name}学会法术{spell}"
  },
  "feedUi.audit.update": {
    "en": "The DM rewrites {name}'s sheet{fields}",
    "zh-CN": "DM 重写了{name}的角色卡{fields}"
  },
  "feedUi.audit.undo": {
    "en": "Party lead undid a change to {name}",
    "zh-CN": "队长撤销了对{name}的一项变更"
  },
  "feedUi.audit.leadEdit": {
    "en": "Party lead corrected {name}{fields}",
    "zh-CN": "队长修正了{name}{fields}"
  },
  "feedUi.audit.playerAdjust": {
    "en": "{name}'s player adjusted their counters{fields}",
    "zh-CN": "{name}的玩家调整了计数器{fields}"
  },
  "feedUi.audit.fields": {
    "en": " ({fields})",
    "zh-CN": "（{fields}）"
  },
  "feedUi.audit.fallback": {
    "en": "{name}: {kind}",
    "zh-CN": "{name}：{kind}"
  },
  "feedUi.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "feedUi.error.undo": {
    "en": "That change could not be undone.",
    "zh-CN": "未能撤销这项变更。"
  },
  "feedUi.error.auditMissing": {
    "en": "Audit entry not found.",
    "zh-CN": "找不到该变更记录。"
  },
  "feedUi.error.undone": {
    "en": "That change was already undone.",
    "zh-CN": "这项变更已被撤销。"
  },
  "feedUi.error.old": {
    "en": "That change predates undo support.",
    "zh-CN": "这项变更创建于撤销功能启用之前。"
  },
  "feedUi.error.restore": {
    "en": "The recorded pre-image could not be restored.",
    "zh-CN": "无法恢复已记录的原始状态。"
  },
  "feedUi.error.characterMissing": {
    "en": "Character not found.",
    "zh-CN": "找不到该角色。"
  },
  "feedUi.error.invalidTurn": {
    "en": "Invalid revert request.",
    "zh-CN": "撤销回合的请求无效。"
  },
  "feedUi.error.emptyTurn": {
    "en": "Nothing left to revert for that turn.",
    "zh-CN": "该回合已没有可撤销的变更。"
  },
  "feedUi.error.timeline": {
    "en": "The timeline did not load. {reason}",
    "zh-CN": "时间线未能加载。{reason}"
  },
  "feedUi.warning": {
    "en": "A newer {kind} change ({reason}) also touched: {fields}.",
    "zh-CN": "较新的{kind}变更（{reason}）也修改了这些字段：{fields}。"
  },
  "feedUi.warning.noReason": {
    "en": "no reason",
    "zh-CN": "未说明原因"
  },
  "feedUi.timeline.kind.chapter": {
    "en": "Chapters",
    "zh-CN": "章节"
  },
  "feedUi.timeline.kind.act": {
    "en": "Acts",
    "zh-CN": "幕"
  },
  "feedUi.timeline.kind.fact": {
    "en": "Facts",
    "zh-CN": "事实"
  },
  "feedUi.timeline.kind.session": {
    "en": "Sessions",
    "zh-CN": "场次"
  },
  "feedUi.timeline.kind.arc": {
    "en": "World arcs",
    "zh-CN": "世界支线"
  },
  "feedUi.timeline.kind.event": {
    "en": "Calendar",
    "zh-CN": "日历"
  },
  "feedUi.timeline.kind.now": {
    "en": "Now",
    "zh-CN": "现在"
  },
  "feedUi.field.name": {
    "en": "name",
    "zh-CN": "名称"
  },
  "feedUi.field.race": {
    "en": "race",
    "zh-CN": "种族"
  },
  "feedUi.field.class": {
    "en": "class",
    "zh-CN": "职业"
  },
  "feedUi.field.level": {
    "en": "level",
    "zh-CN": "等级"
  },
  "feedUi.field.subclass": {
    "en": "subclass",
    "zh-CN": "子职业"
  },
  "feedUi.field.background": {
    "en": "background",
    "zh-CN": "背景"
  },
  "feedUi.field.abilities": {
    "en": "abilities",
    "zh-CN": "属性"
  },
  "feedUi.field.maxHp": {
    "en": "maxHp",
    "zh-CN": "生命值上限"
  },
  "feedUi.field.currentHp": {
    "en": "currentHp",
    "zh-CN": "当前生命值"
  },
  "feedUi.field.tempHp": {
    "en": "tempHp",
    "zh-CN": "临时生命值"
  },
  "feedUi.field.ac": {
    "en": "ac",
    "zh-CN": "护甲等级"
  },
  "feedUi.field.speed": {
    "en": "speed",
    "zh-CN": "速度"
  },
  "feedUi.field.xp": {
    "en": "xp",
    "zh-CN": "经验值"
  },
  "feedUi.field.gold": {
    "en": "gold",
    "zh-CN": "金币"
  },
  "feedUi.field.copper": {
    "en": "copper",
    "zh-CN": "铜币"
  },
  "feedUi.field.equipment": {
    "en": "equipment",
    "zh-CN": "装备"
  },
  "feedUi.field.features": {
    "en": "features",
    "zh-CN": "职业特性"
  },
  "feedUi.field.feats": {
    "en": "feats",
    "zh-CN": "专长"
  },
  "feedUi.field.conditions": {
    "en": "conditions",
    "zh-CN": "状态"
  },
  "feedUi.field.conditionMeta": {
    "en": "conditionMeta",
    "zh-CN": "状态详情"
  },
  "feedUi.field.exhaustion": {
    "en": "exhaustion",
    "zh-CN": "力竭"
  },
  "feedUi.field.concentratingOn": {
    "en": "concentratingOn",
    "zh-CN": "专注法术"
  },
  "feedUi.field.spellcasting": {
    "en": "spellcasting",
    "zh-CN": "施法"
  },
  "feedUi.field.hitDice": {
    "en": "hitDice",
    "zh-CN": "生命骰"
  },
  "feedUi.field.hitDicePools": {
    "en": "hitDicePools",
    "zh-CN": "生命骰池"
  },
  "feedUi.field.resources": {
    "en": "resources",
    "zh-CN": "资源"
  },
  "feedUi.field.deathSaves": {
    "en": "deathSaves",
    "zh-CN": "死亡豁免"
  },
  "feedUi.field.classes": {
    "en": "classes",
    "zh-CN": "兼职职业"
  },
  "feedUi.field.wildShape": {
    "en": "wildShape",
    "zh-CN": "荒野形态"
  },
  "feedUi.field.proficiencies": {
    "en": "proficiencies",
    "zh-CN": "熟练项"
  },
  "feedUi.kind.apply_damage": {
    "en": "apply_damage",
    "zh-CN": "伤害"
  },
  "feedUi.kind.heal": {
    "en": "heal",
    "zh-CN": "治疗"
  },
  "feedUi.kind.award_xp": {
    "en": "award_xp",
    "zh-CN": "经验值奖励"
  },
  "feedUi.kind.modify_gold": {
    "en": "modify_gold",
    "zh-CN": "金币变动"
  },
  "feedUi.kind.grant_item": {
    "en": "grant_item",
    "zh-CN": "物品获得"
  },
  "feedUi.kind.remove_item": {
    "en": "remove_item",
    "zh-CN": "物品移除"
  },
  "feedUi.kind.set_condition": {
    "en": "set_condition",
    "zh-CN": "状态施加"
  },
  "feedUi.kind.clear_condition": {
    "en": "clear_condition",
    "zh-CN": "状态解除"
  },
  "feedUi.kind.use_spell_slot": {
    "en": "use_spell_slot",
    "zh-CN": "法术位消耗"
  },
  "feedUi.kind.use_item": {
    "en": "use_item",
    "zh-CN": "物品使用"
  },
  "feedUi.kind.purchase": {
    "en": "purchase",
    "zh-CN": "买卖"
  },
  "feedUi.kind.use_resource": {
    "en": "use_resource",
    "zh-CN": "资源消耗"
  },
  "feedUi.kind.grant_temp_hp": {
    "en": "grant_temp_hp",
    "zh-CN": "临时生命值"
  },
  "feedUi.kind.learn_spell": {
    "en": "learn_spell",
    "zh-CN": "法术学习"
  },
  "feedUi.kind.update_sheet": {
    "en": "update_sheet",
    "zh-CN": "角色卡更新"
  },
  "feedUi.kind.undo": {
    "en": "undo",
    "zh-CN": "撤销"
  },
  "feedUi.kind.lead_edit": {
    "en": "lead_edit",
    "zh-CN": "队长修正"
  },
  "feedUi.kind.player_adjust": {
    "en": "player_adjust",
    "zh-CN": "玩家调整"
  },
  "feedUi.kind.rest_short": {
    "en": "rest_short",
    "zh-CN": "短休"
  },
  "feedUi.kind.rest_long": {
    "en": "rest_long",
    "zh-CN": "长休"
  },
  "feedUi.kind.attune": {
    "en": "attune",
    "zh-CN": "同调"
  },
  "feedUi.kind.reveal_item": {
    "en": "reveal_item",
    "zh-CN": "物品鉴定"
  },
  "feedUi.kind.trade": {
    "en": "trade",
    "zh-CN": "交易"
  },
  "feedUi.kind.concentration": {
    "en": "concentration",
    "zh-CN": "专注"
  },
  "feedUi.kind.death_state": {
    "en": "death_state",
    "zh-CN": "死亡状态"
  }
});
