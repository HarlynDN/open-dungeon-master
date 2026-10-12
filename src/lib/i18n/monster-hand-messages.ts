import { defineMessages } from "./catalog.ts";
export const MONSTER_HAND_MESSAGES = /*#__PURE__*/ defineMessages({
  "monsterHandUi.status.alive": {"en": "alive", "zh-CN": "存活"},
  "monsterHandUi.status.fled": {"en": "fled", "zh-CN": "已逃离"},
  "monsterHandUi.status.dead": {"en": "dead", "zh-CN": "死亡"},
  "monsterHandUi.frame.higher": {"en": "{number} or higher", "zh-CN": "{number} 或更高"},
  "monsterHandUi.frame.usedMany": {"en": "{name} has used {action} all {count} times and cannot use it again today. Pick another action.", "zh-CN": "{name}的{action}已使用 {count} 次，当前不能再次使用。请选择其他动作。"},
  "monsterHandUi.frame.usedOne": {"en": "{name} has used {action} already and cannot use it again today. Pick another action.", "zh-CN": "{name}的{action}可用次数已用完，当前不能再次使用。请选择其他动作。"},
  "monsterHandUi.frame.recharge": {"en": "{name}'s {action} has not recharged: it comes back on a {threshold} on the d6 rolled at the start of its turn. Pick another action.", "zh-CN": "{name}的{action}尚未充能。其回合开始时掷 d6，骰出 {threshold} 即可恢复。请选择其他动作。"},
  "monsterHandUi.frame.alreadyActed": {"en": "{name} has already taken its action this round (round {round}). It acts again next round; legendary actions and reactions are separate.", "zh-CN": "{name}已在第 {round} 轮使用动作，下一轮才能再次行动；传奇动作和反应另行计算。"},
  "monsterHandUi.frame.initiative": {"en": "Initiative is still being rolled, so {name} cannot act yet. Roll initiative for every character first.", "zh-CN": "先攻尚未确定，{name}暂时无法行动。请先为所有角色掷先攻。"},
  "monsterHandUi.frame.surprised": {"en": "{name} is surprised and does nothing in the first round. It acts from round 2.", "zh-CN": "{name}受到突袭，第一轮无法行动，从第二轮起可以行动。"},
  "monsterHandUi.frame.held": {"en": "{name} is {condition} and loses its action this turn.", "zh-CN": "{name}处于{condition}状态，本回合无法使用动作。"},
  "monsterHandUi.frame.incapacitated": {"en": "{name} is {condition} and cannot act until the condition ends.", "zh-CN": "{name}处于{condition}状态，结束该状态前无法行动。"},
  "monsterHandUi.frame.status": {"en": "{name} is {condition} and cannot act.", "zh-CN": "{name}处于{condition}状态，无法行动。"},
  "monsterHandUi.copy.m0": {
    "en": "The monsters' hand",
    "zh-CN": "怪物手牌"
  },
  "monsterHandUi.copy.m1": {
    "en": "Enemy turns",
    "zh-CN": "敌方回合"
  },
  "monsterHandUi.copy.m2": {
    "en": "The monsters",
    "zh-CN": "怪物"
  },
  "monsterHandUi.copy.m3": {
    "en": "Play a monster's action as a card; the engine rolls it.",
    "zh-CN": "选择怪物行动卡，游戏会按规则掷骰。"
  },
  "monsterHandUi.copy.m4": {
    "en": "Play the rest for me",
    "zh-CN": "自动处理剩余行动"
  },
  "monsterHandUi.copy.m5": {
    "en": "Hand on the turn",
    "zh-CN": "交接回合"
  },
  "monsterHandUi.copy.m6": {
    "en": "Show the monsters' cards",
    "zh-CN": "显示怪物手牌"
  },
  "monsterHandUi.copy.m7": {
    "en": "Hide the monsters' cards",
    "zh-CN": "隐藏怪物手牌"
  },
  "monsterHandUi.copy.m8": {
    "en": "Which monster",
    "zh-CN": "选择怪物"
  },
  "monsterHandUi.copy.m9": {
    "en": "due",
    "zh-CN": "待行动"
  },
  "monsterHandUi.copy.m10": {
    "en": "Ready when you are.",
    "zh-CN": "已准备就绪。"
  },
  "monsterHandUi.copy.m11": {
    "en": "Pick everyone caught in it.",
    "zh-CN": "选择所有受影响的目标。"
  },
  "monsterHandUi.copy.m12": {
    "en": "Pick a target.",
    "zh-CN": "选择目标。"
  },
  "monsterHandUi.copy.m13": {
    "en": "Targets",
    "zh-CN": "目标"
  },
  "monsterHandUi.copy.m14": {
    "en": "Nobody is standing to be attacked.",
    "zh-CN": "没有可攻击的存活角色。"
  },
  "monsterHandUi.copy.m15": {
    "en": "Roll",
    "zh-CN": "掷骰"
  },
  "monsterHandUi.copy.m16": {
    "en": "Back",
    "zh-CN": "返回"
  },
  "monsterHandUi.copy.m17": {
    "en": "Let it flee",
    "zh-CN": "让它逃离"
  },
  "monsterHandUi.copy.m18": {
    "en": "Dismiss the result",
    "zh-CN": "关闭结果"
  },
  "monsterHandUi.copy.m19": {
    "en": "Straight",
    "zh-CN": "普通"
  },
  "monsterHandUi.copy.m20": {
    "en": "Advantage",
    "zh-CN": "优势"
  },
  "monsterHandUi.copy.m21": {
    "en": "Disadvantage",
    "zh-CN": "劣势"
  },
  "monsterHandUi.copy.m22": {
    "en": "Put the cards away. The console still has every action.",
    "zh-CN": "收起手牌，控制台仍可使用所有操作。"
  },
  "monsterHandUi.copy.m23": {
    "en": "the next turn",
    "zh-CN": "下一回合"
  },
  "monsterHandUi.copy.m24": {
    "en": "The engine would not take that.",
    "zh-CN": "这次行动未能生效。"
  },
  "monsterHandUi.copy.m25": {
    "en": "The order would not take that.",
    "zh-CN": "未能交接回合。"
  },
  "monsterHandUi.copy.m26": {
    "en": "Could not reach the table.",
    "zh-CN": "无法连接游戏服务器。"
  },
  "monsterHandUi.copy.m27": {
    "en": "Flee",
    "zh-CN": "逃离"
  },
  "monsterHandUi.copy.m28": {
    "en": "A spell attack.",
    "zh-CN": "法术攻击。"
  },
  "monsterHandUi.copy.m29": {
    "en": "Half damage on a save.",
    "zh-CN": "豁免成功时伤害减半。"
  },
  "monsterHandUi.copy.m30": {
    "en": "Leaves the fight alive. The party still earns it.",
    "zh-CN": "活着离开战斗，队伍仍获得对应经验值。"
  },
  "monsterHandUi.copy.m31": {
    "en": "Bite",
    "zh-CN": "啃咬"
  },
  "monsterHandUi.copy.m32": {
    "en": "Claw",
    "zh-CN": "爪击"
  },
  "monsterHandUi.copy.m33": {
    "en": "Claws",
    "zh-CN": "爪击"
  },
  "monsterHandUi.copy.m34": {
    "en": "Beak",
    "zh-CN": "喙击"
  },
  "monsterHandUi.copy.m35": {
    "en": "Fist",
    "zh-CN": "拳击"
  },
  "monsterHandUi.copy.m36": {
    "en": "Gore",
    "zh-CN": "冲撞"
  },
  "monsterHandUi.copy.m37": {
    "en": "Tail",
    "zh-CN": "尾击"
  },
  "monsterHandUi.copy.m38": {
    "en": "Tentacles",
    "zh-CN": "触手"
  },
  "monsterHandUi.copy.m39": {
    "en": "Tusk",
    "zh-CN": "獠牙"
  },
  "monsterHandUi.copy.m40": {
    "en": "Ram",
    "zh-CN": "冲撞"
  },
  "monsterHandUi.copy.m41": {
    "en": "Talons",
    "zh-CN": "利爪"
  },
  "monsterHandUi.copy.m42": {
    "en": "Constrict",
    "zh-CN": "绞缠"
  },
  "monsterHandUi.copy.m43": {
    "en": "Strike",
    "zh-CN": "打击"
  },
  "monsterHandUi.copy.m44": {
    "en": "Fire Breath",
    "zh-CN": "火焰吐息"
  },
  "monsterHandUi.copy.m45": {
    "en": "Cold Breath",
    "zh-CN": "寒冷吐息"
  },
  "monsterHandUi.copy.m46": {
    "en": "Lightning Breath",
    "zh-CN": "闪电吐息"
  },
  "monsterHandUi.copy.m47": {
    "en": "Acid Breath",
    "zh-CN": "强酸吐息"
  },
  "monsterHandUi.copy.m48": {
    "en": "Poison Breath",
    "zh-CN": "毒素吐息"
  },
  "monsterHandUi.copy.m49": {
    "en": "Sleep Breath",
    "zh-CN": "睡眠吐息"
  },
  "monsterHandUi.copy.m50": {
    "en": "Paralyzing Breath",
    "zh-CN": "麻痹吐息"
  },
  "monsterHandUi.copy.m51": {
    "en": "Slowing Breath",
    "zh-CN": "迟缓吐息"
  },
  "monsterHandUi.copy.m52": {
    "en": "Repulsion Breath",
    "zh-CN": "推离吐息"
  },
  "monsterHandUi.frame.before": {
    "en": "Before {name}: play each one, then hand on the turn.",
    "zh-CN": "在{name}行动前，处理每个敌人的行动，然后交接回合。"
  },
  "monsterHandUi.frame.hp": {
    "en": "{current}/{max} hp",
    "zh-CN": "生命值 {current}/{max}"
  },
  "monsterHandUi.frame.ac": {
    "en": " · AC {ac}",
    "zh-CN": " · 护甲等级 {ac}"
  },
  "monsterHandUi.frame.party": {
    "en": "{current}/{max} hp · AC {ac}",
    "zh-CN": "生命值 {current}/{max} · 护甲等级 {ac}"
  },
  "monsterHandUi.frame.acted": {
    "en": " · acted",
    "zh-CN": " · 已行动"
  },
  "monsterHandUi.frame.cards": {
    "en": "{name}'s cards",
    "zh-CN": "{name}的手牌"
  },
  "monsterHandUi.frame.manual": {
    "en": "By hand: {names}",
    "zh-CN": "手动处理：{names}"
  },
  "monsterHandUi.frame.aim": {
    "en": "Lined up on {names}.",
    "zh-CN": "已选目标：{names}。"
  },
  "monsterHandUi.frame.play": {
    "en": "Play {name}",
    "zh-CN": "使用{name}"
  },
  "monsterHandUi.frame.attack": {
    "en": "{name} attacks {targets} with its {action}.",
    "zh-CN": "{name}使用{action}攻击{targets}。"
  },
  "monsterHandUi.frame.attackNone": {
    "en": "{name} attacks with its {action}.",
    "zh-CN": "{name}使用{action}攻击。"
  },
  "monsterHandUi.frame.ability": {
    "en": "{name} uses {action} on {targets}.",
    "zh-CN": "{name}对{targets}使用{action}。"
  },
  "monsterHandUi.frame.abilityNone": {
    "en": "{name} uses {action}.",
    "zh-CN": "{name}使用{action}。"
  },
  "monsterHandUi.frame.flee": {
    "en": "{name} breaks off and flees.",
    "zh-CN": "{name}脱离战斗并逃离。"
  },
  "monsterHandUi.frame.routine": {
    "en": "Multiattack: {swings}. One card plays the whole routine.",
    "zh-CN": "多重攻击：{swings}。使用一次此卡即可执行整套攻击。"
  },
  "monsterHandUi.frame.swing": {
    "en": "{count} {name}",
    "zh-CN": "{count} 次{name}"
  },
  "monsterHandUi.frame.roundOne": {
    "en": "Lasts {count} round.",
    "zh-CN": "持续 {count} 轮。"
  },
  "monsterHandUi.frame.roundMany": {
    "en": "Lasts {count} rounds.",
    "zh-CN": "持续 {count} 轮。"
  },
  "monsterHandUi.frame.list": {
    "en": ", ",
    "zh-CN": "、"
  }
});
