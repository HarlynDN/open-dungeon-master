import { defineMessages } from "./catalog.ts";

export const DM_RESULT_MESSAGES = /*#__PURE__*/ defineMessages({
  "dmResult.separator": {"en": ", ", "zh-CN": "，"},
  "dmResult.nameSeparator": {"en": ", ", "zh-CN": "、"},
  "dmResult.frame.f000": {
    "en": "made the save{rolled}",
    "zh-CN": "豁免成功{rolled}"
  },
  "dmResult.frame.f001": {
    "en": "failed the save{rolled}",
    "zh-CN": "豁免失败{rolled}"
  },
  "dmResult.frame.f002": {
    "en": "failed automatically: {reason}",
    "zh-CN": "自动失败：{reason}"
  },
  "dmResult.frame.f003": {
    "en": "{damage} damage",
    "zh-CN": "{damage} 点伤害"
  },
  "dmResult.frame.f004": {
    "en": "HP {hp}",
    "zh-CN": "生命值 {hp}"
  },
  "dmResult.frame.f005": {
    "en": "rays {rays}",
    "zh-CN": "光线：{rays}"
  },
  "dmResult.frame.f006": {
    "en": "ray {rays}",
    "zh-CN": "光线：{rays}"
  },
  "dmResult.frame.f007": {
    "en": "temp HP absorbed {amount}",
    "zh-CN": "临时生命值吸收 {amount} 点伤害"
  },
  "dmResult.frame.f008": {
    "en": "concentration on {spell} broken",
    "zh-CN": "{spell}的专注中断"
  },
  "dmResult.frame.f009": {
    "en": "dead",
    "zh-CN": "死亡"
  },
  "dmResult.frame.f010": {
    "en": "down at 0 HP",
    "zh-CN": "生命值降至 0，倒下"
  },
  "dmResult.frame.f011": {
    "en": "no effect",
    "zh-CN": "无效果"
  },
  "dmResult.frame.f012": {
    "en": "{who}: {effects}",
    "zh-CN": "{who}：{effects}"
  },
  "dmResult.frame.f013": {
    "en": "their spell",
    "zh-CN": "法术"
  },
  "dmResult.frame.f014": {
    "en": "rolled {total}",
    "zh-CN": "掷出 {total}"
  },
  "dmResult.frame.f015": {
    "en": "DC {dc}",
    "zh-CN": "DC {dc}"
  },
  "dmResult.frame.f016": {
    "en": "held",
    "zh-CN": "维持"
  },
  "dmResult.frame.f017": {
    "en": "broken",
    "zh-CN": "中断"
  },
  "dmResult.frame.f018": {
    "en": "{rolled} against {dc}",
    "zh-CN": "{rolled}，对抗 {dc}"
  },
  "dmResult.frame.f019": {
    "en": "Concentration on {spell}: {detail}",
    "zh-CN": "{spell}的专注：{detail}"
  },
  "dmResult.frame.f020": {
    "en": "Concentration on {spell}",
    "zh-CN": "{spell}的专注"
  },
  "dmResult.frame.f021": {
    "en": "Done.",
    "zh-CN": "已完成。"
  },
  "dmResult.frame.f022": {
    "en": ", success",
    "zh-CN": "，成功"
  },
  "dmResult.frame.f023": {
    "en": ", failure",
    "zh-CN": "，失败"
  },
  "dmResult.frame.f024": {
    "en": "Rolled {total}{verdict}",
    "zh-CN": "掷出 {total}{verdict}"
  },
  "dmResult.frame.f025": {
    "en": "Success",
    "zh-CN": "成功"
  },
  "dmResult.frame.f026": {
    "en": "Failure",
    "zh-CN": "失败"
  },
  "dmResult.frame.f027": {
    "en": "Critical hit",
    "zh-CN": "重击"
  },
  "dmResult.frame.f028": {
    "en": "Hit",
    "zh-CN": "命中"
  },
  "dmResult.frame.f029": {
    "en": "Miss",
    "zh-CN": "未命中"
  },
  "dmResult.frame.f030": {
    "en": "HP now {hp}",
    "zh-CN": "当前生命值 {hp}"
  },
  "dmResult.frame.f031": {
    "en": "Temporary hit points absorbed {amount}",
    "zh-CN": "临时生命值吸收 {amount} 点伤害"
  },
  "dmResult.frame.f032": {
    "en": "Concentration on {spell} broken",
    "zh-CN": "{spell}的专注中断"
  },
  "dmResult.frame.f033": {
    "en": "Dead",
    "zh-CN": "死亡"
  },
  "dmResult.frame.f034": {
    "en": "Down at 0 HP",
    "zh-CN": "生命值降至 0，倒下"
  },
  "dmResult.frame.f035": {
    "en": "Dying: {detail}",
    "zh-CN": "濒死：{detail}"
  },
  "dmResult.frame.f036": {
    "en": "{ability} save, DC {dc}",
    "zh-CN": "{ability}豁免，DC {dc}"
  },
  "dmResult.frame.f037": {
    "en": "Save DC {dc}",
    "zh-CN": "豁免 DC {dc}"
  },
  "dmResult.frame.f038": {
    "en": "The fight is over.",
    "zh-CN": "战斗结束。"
  },
  "dmResult.frame.f039": {
    "en": "Round {round}",
    "zh-CN": "第 {round} 轮"
  },
  "dmResult.frame.f040": {
    "en": "{label}: {value}",
    "zh-CN": "{label}：{value}"
  },
  "dmResult.frame.f041": {
    "en": "{name} is resistant to {type}",
    "zh-CN": "{name}对{type}伤害具有抗性"
  },
  "dmResult.frame.f042": {
    "en": "{name} is immune to {type}",
    "zh-CN": "{name}对{type}伤害免疫"
  },
  "dmResult.frame.f043": {
    "en": "{name} is vulnerable to {type}",
    "zh-CN": "{name}对{type}伤害易伤"
  },
  "dmResult.frame.f044": {
    "en": "{successes} successes, {failures} failures",
    "zh-CN": "成功 {successes} 次，失败 {failures} 次"
  },
  "dmResult.frame.f045": {
    "en": "Waiting on initiative from {names}.",
    "zh-CN": "等待 {names} 的先攻检定。"
  },
  "dmResult.label.spell": {
    "en": "Spell",
    "zh-CN": "法术"
  },
  "dmResult.label.healed": {
    "en": "Healed",
    "zh-CN": "治疗量"
  },
  "dmResult.label.healing": {
    "en": "Healing",
    "zh-CN": "治疗量"
  },
  "dmResult.label.tempHp": {
    "en": "Temp hp",
    "zh-CN": "临时生命值"
  },
  "dmResult.label.slotSpent": {
    "en": "Slot spent",
    "zh-CN": "消耗法术位"
  },
  "dmResult.label.slotLevel": {
    "en": "Slot level",
    "zh-CN": "法术位环阶"
  },
  "dmResult.label.resource": {
    "en": "Resource",
    "zh-CN": "资源"
  },
  "dmResult.label.spent": {
    "en": "Spent",
    "zh-CN": "已消耗"
  },
  "dmResult.label.remaining": {
    "en": "Remaining",
    "zh-CN": "剩余"
  },
  "dmResult.label.character": {
    "en": "Character",
    "zh-CN": "角色"
  },
  "dmResult.label.enemy": {
    "en": "Enemy",
    "zh-CN": "敌人"
  },
  "dmResult.label.target": {
    "en": "Target",
    "zh-CN": "目标"
  },
  "dmResult.label.name": {
    "en": "Name",
    "zh-CN": "名称"
  },
  "dmResult.label.condition": {
    "en": "Condition",
    "zh-CN": "状态"
  },
  "dmResult.label.conditionApplied": {
    "en": "Condition applied",
    "zh-CN": "已施加状态"
  },
  "dmResult.label.rounds": {
    "en": "Rounds",
    "zh-CN": "轮数"
  },
  "dmResult.label.round": {
    "en": "Round",
    "zh-CN": "轮数"
  },
  "dmResult.label.initiative": {
    "en": "Initiative",
    "zh-CN": "先攻"
  },
  "dmResult.label.xp": {
    "en": "Xp",
    "zh-CN": "经验值"
  },
  "dmResult.label.gold": {
    "en": "Gold",
    "zh-CN": "金币"
  },
  "dmResult.label.item": {
    "en": "Item",
    "zh-CN": "物品"
  },
  "dmResult.label.quantity": {
    "en": "Quantity",
    "zh-CN": "数量"
  },
  "dmResult.label.reaction": {
    "en": "Reaction",
    "zh-CN": "反应"
  },
  "dmResult.label.feature": {
    "en": "Feature",
    "zh-CN": "特性"
  },
  "dmResult.label.damageType": {
    "en": "Damage type",
    "zh-CN": "伤害类型"
  },
  "dmResult.label.ac": {
    "en": "Ac",
    "zh-CN": "护甲等级"
  },
  "dmResult.label.maxHp": {
    "en": "Max hp",
    "zh-CN": "生命值上限"
  },
  "dmResult.label.speed": {
    "en": "Speed",
    "zh-CN": "速度"
  },
  "dmResult.label.temporaryHp": {
    "en": "Temporary hp",
    "zh-CN": "临时生命值"
  },
  "dmResult.label.turn": {
    "en": "Turn",
    "zh-CN": "回合"
  },
  "dmResult.label.exhaustion": {
    "en": "Exhaustion",
    "zh-CN": "力竭等级"
  },
  "dmResult.term.healthy": {
    "en": "healthy",
    "zh-CN": "健康"
  },
  "dmResult.term.wounded": {
    "en": "wounded",
    "zh-CN": "受伤"
  },
  "dmResult.term.bloodied": {
    "en": "bloodied",
    "zh-CN": "重伤"
  },
  "dmResult.term.critical": {
    "en": "critical",
    "zh-CN": "濒危"
  },
  "dmResult.term.red": {
    "en": "red",
    "zh-CN": "红色"
  },
  "dmResult.term.orange": {
    "en": "orange",
    "zh-CN": "橙色"
  },
  "dmResult.term.yellow": {
    "en": "yellow",
    "zh-CN": "黄色"
  },
  "dmResult.term.green": {
    "en": "green",
    "zh-CN": "绿色"
  },
  "dmResult.term.blue": {
    "en": "blue",
    "zh-CN": "蓝色"
  },
  "dmResult.term.indigo": {
    "en": "indigo",
    "zh-CN": "靛色"
  },
  "dmResult.term.violet": {
    "en": "violet",
    "zh-CN": "紫色"
  },
  "dmResult.term.true": {
    "en": "true",
    "zh-CN": "是"
  },
  "dmResult.term.false": {
    "en": "false",
    "zh-CN": "否"
  }
});
