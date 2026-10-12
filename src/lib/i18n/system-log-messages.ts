import { defineMessages } from "./catalog.ts";
export const SYSTEM_LOG_MESSAGES = /*#__PURE__*/ defineMessages({
  "playerLog.detail.sneakName": {"en": "Sneak Attack", "zh-CN": "偷袭"},
  "playerLog.detail.resistAll": {"en": "resistant to all damage: halved", "zh-CN": "对所有伤害具有抗性：伤害减半"},
  "playerLog.detail.immune": {"en": "immune to {type} damage: no damage", "zh-CN": "对{type}伤害免疫：未受伤害"},
  "playerLog.detail.resist": {"en": "resistant to {type} damage: halved", "zh-CN": "对{type}伤害具有抗性：伤害减半"},
  "playerLog.detail.vulnerable": {"en": "vulnerable to {type} damage: doubled", "zh-CN": "对{type}伤害具有易伤：伤害加倍"},
  "playerLog.detail.both": {"en": "resistant and vulnerable to {type} damage: halved, then doubled", "zh-CN": "对{type}伤害同时具有抗性和易伤：先减半，再加倍"},
  "playerLog.detail.part": {"en": "{amount} {type}{note}", "zh-CN": "{amount} 点{type}伤害{note}"},
  "playerLog.detail.sneak": {"en": "{feature}: +{dice}d6{bonus}", "zh-CN": "{feature}：额外 {dice}d6{bonus}"},
  "playerLog.detail.sneakBonus": {"en": " ({feature}: +{dice}d6)", "zh-CN": "（{feature}：额外 {dice}d6）"},
  "playerLog.detail.sentinel": {"en": "Sentinel: its speed is 0 for the rest of the turn", "zh-CN": "哨兵：目标速度在本回合剩余时间降为 0"},
  "playerLog.detail.spent": {"en": "{feature} already used this turn: no extra dice", "zh-CN": "本回合已使用{feature}：不再增加伤害骰"},
  "playerLog.detail.greatWeapon": {"en": "Great Weapon Fighting: rerolling damage dice of {threshold} or less", "zh-CN": "巨武器战斗：重新掷出结果不大于 {threshold} 的伤害骰"},

  "playerLog.opportunity.enemyMiss": {"en": "{actor} takes an opportunity attack as {target} pulls away and misses ({total} vs AC {ac}).", "zh-CN": "{target}离开近战范围时，{actor}发动机会攻击，但未命中（攻击总值 {total}，护甲等级 {ac}）。"},
  "playerLog.opportunity.enemyHit": {"en": "{actor} takes an opportunity attack as {target} pulls away: {critical}{damage} damage{details}.{conditions}", "zh-CN": "{target}离开近战范围时，{actor}发动机会攻击并命中{critical}，骰出 {damage} 点伤害{details}。{conditions}"},
  "playerLog.opportunity.pcMiss": {"en": "{actor} swings at {target} as it breaks away and misses ({total} vs AC {ac}{parry}).", "zh-CN": "{target}离开近战范围时，{actor}发动机会攻击，但未命中（攻击总值 {total}，护甲等级 {ac}）{parry}。"},
  "playerLog.opportunity.pcHit": {"en": "{actor} catches {target} with an opportunity attack as it breaks away: {critical}{damage} damage{details}. {state}", "zh-CN": "{target}离开近战范围时，{actor}的机会攻击命中{critical}，造成 {damage} 点伤害{details}。{state}"},
  "playerLog.opportunity.evaded": {"en": "{actor} gets no opportunity attack on {target}: {feature} (attacked in melee this turn).", "zh-CN": "{target}本回合已在近战中攻击{actor}，因{feature}而不会引发其机会攻击。"},
  "playerLog.opportunity.critical": {"en": "a critical hit, ", "zh-CN": "（重击）"},
  "playerLog.opportunity.parry": {"en": "; {target} parries: +{bonus} AC", "zh-CN": "；{target}使用反应格挡，护甲等级增加 {bonus}，将此次攻击变为未命中"},
  "playerLog.opportunity.dropped": {"en": "{target} drops.", "zh-CN": "{target}倒下了。"},
  "playerLog.opportunity.health": {"en": "It is now {health}.", "zh-CN": "其当前状况为{health}。"},
  "playerLog.opportunity.conditions": {"en": " {target} is {conditions}.", "zh-CN": "{target}陷入{conditions}状态。"},
  "playerLog.opportunity.details": {"en": " ({notes})", "zh-CN": "（{notes}）"},

  "playerLog.item.stow": {
    "en": "{actor} puts {item}{quantity} in the party's pack.",
    "zh-CN": "{actor}将{item}{quantity}放入队伍共享背包。"
  },
  "playerLog.item.take": {
    "en": "{actor} takes {item}{quantity} from the party's pack.",
    "zh-CN": "{actor}从队伍共享背包取出{item}{quantity}。"
  },
  "playerLog.quantity": {
    "en": " x{count}",
    "zh-CN": " ×{count}"
  },
  "playerLog.coins.deposit": {
    "en": "{actor} puts {coins} in the common purse.",
    "zh-CN": "{actor}将 {coins} 存入队伍公款。"
  },
  "playerLog.coins.withdraw": {
    "en": "{actor} takes {coins} from the common purse.",
    "zh-CN": "{actor}从队伍公款取出 {coins}。"
  },
  "playerLog.xp": {
    "en": "The party divides {spent} experience between {names}.",
    "zh-CN": "队伍向{names}分配了 {spent} 点经验。"
  },
  "playerLog.list": {
    "en": ", ",
    "zh-CN": "、"
  },
  "playerLog.denom.cp": {
    "en": "cp",
    "zh-CN": "铜币"
  },
  "playerLog.denom.sp": {
    "en": "sp",
    "zh-CN": "银币"
  },
  "playerLog.denom.ep": {
    "en": "ep",
    "zh-CN": "琥珀金币"
  },
  "playerLog.denom.gp": {
    "en": "gp",
    "zh-CN": "金币"
  },
  "playerLog.denom.pp": {
    "en": "pp",
    "zh-CN": "铂金币"
  }
});
