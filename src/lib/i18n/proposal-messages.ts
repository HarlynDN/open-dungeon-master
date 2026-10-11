import { defineMessages } from "./catalog.ts";

// Approval and player trade controls; tool protocols remain English.
export const PROPOSAL_MESSAGES = defineMessages({
  "sessionUi.trade.error.unreadable": { en: "The offer could not be read.", "zh-CN": "无法读取这项交易提议。" },
  "sessionUi.trade.error.emptyStored": { en: "The offer is empty.", "zh-CN": "这项交易提议没有内容。" },
  "sessionUi.trade.error.left": { en: "One of the characters has left the table.", "zh-CN": "其中一名角色已离开此战役。" },
  "sessionUi.trade.failure.giveItem": { en: "{who} no longer carries {item}.", "zh-CN": "{who}已没有足够的{item}来完成交易。" },
  "sessionUi.trade.failure.wantItem": { en: "{who} does not carry {item}.", "zh-CN": "{who}没有足够的{item}来完成交易。" },
  "sessionUi.trade.failure.giveCoin": { en: "{who} no longer has {coin}.", "zh-CN": "{who}已没有交易所需的 {coin}。" },
  "sessionUi.trade.failure.wantCoin": { en: "{who} does not have {coin}.", "zh-CN": "{who}没有交易所需的 {coin}。" },
  "sessionUi.proposal.accept": {
    "en": "Accept",
    "zh-CN": "接受"
  },
  "sessionUi.proposal.decline": {
    "en": "Decline",
    "zh-CN": "拒绝"
  },
  "sessionUi.proposal.withdraw": {
    "en": "Withdraw",
    "zh-CN": "撤回"
  },
  "sessionUi.proposal.character": {
    "en": "a character",
    "zh-CN": "一名角色"
  },
  "sessionUi.proposal.waiting": {
    "en": "waiting on {name}",
    "zh-CN": "等待{name}确认"
  },
  "sessionUi.proposal.giveItem": {
    "en": "Give {item} to {who}",
    "zh-CN": "将{item}交给{who}"
  },
  "sessionUi.proposal.takeItem": {
    "en": "Take {item} from {who}",
    "zh-CN": "收走{who}的{item}"
  },
  "sessionUi.proposal.itemQty": {
    "en": "{name} x{qty}",
    "zh-CN": "{name} ×{qty}"
  },
  "sessionUi.proposal.unknownItem": {
    "en": "an item",
    "zh-CN": "某件物品"
  },
  "sessionUi.proposal.giveGold": {
    "en": "Give {amount} gold to {who}",
    "zh-CN": "给予{who} {amount} 枚金币"
  },
  "sessionUi.proposal.takeGold": {
    "en": "Take {amount} gold from {who}",
    "zh-CN": "从{who}处扣除 {amount} 枚金币"
  },
  "sessionUi.proposal.buy": {
    "en": "{who} buys {item} for {gold} gold",
    "zh-CN": "{who}以 {gold} 枚金币购买{item}"
  },
  "sessionUi.proposal.sell": {
    "en": "{who} sells {item} for {gold} gold",
    "zh-CN": "{who}以 {gold} 枚金币出售{item}"
  },
  "sessionUi.proposal.damage": {
    "en": "Deal {amount} {type}damage to {who}",
    "zh-CN": "对{who}造成 {amount} 点{type}伤害"
  },
  "sessionUi.proposal.heal": {
    "en": "Heal {who} for {amount}",
    "zh-CN": "为{who}治疗 {amount} 点生命值"
  },
  "sessionUi.proposal.healSpell": {
    "en": "Heal {who} with {spell}",
    "zh-CN": "使用{spell}为{who}治疗"
  },
  "sessionUi.proposal.healSpellAmount": {
    "en": "Heal {who} with {spell} ({amount})",
    "zh-CN": "使用{spell}为{who}治疗（指定治疗量 {amount}）"
  },
  "sessionUi.proposal.tempHp": {
    "en": "Give {who} {amount} temporary hit points",
    "zh-CN": "给予{who} {amount} 点临时生命值"
  },
  "sessionUi.proposal.condition": {
    "en": "Make {who} {condition}",
    "zh-CN": "为{who}施加{condition}"
  },
  "sessionUi.proposal.conditionRounds": {
    "en": "Make {who} {condition} for {rounds} rounds",
    "zh-CN": "为{who}施加{condition}，持续 {rounds} 回合"
  },
  "sessionUi.proposal.clearCondition": {
    "en": "Clear {condition} from {who}",
    "zh-CN": "移除{who}的{condition}效果"
  },
  "sessionUi.proposal.unknownCondition": {
    "en": "a condition",
    "zh-CN": "某种状态"
  },
  "sessionUi.proposal.error.failed": {
    "en": "That did not work.",
    "zh-CN": "操作未成功。"
  },
  "sessionUi.proposal.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "sessionUi.proposal.error.action": {
    "en": "Invalid action.",
    "zh-CN": "操作无效。"
  },
  "sessionUi.proposal.error.missing": {
    "en": "Offer not found.",
    "zh-CN": "未找到这项提议。"
  },
  "sessionUi.proposal.error.resolved": {
    "en": "The offer was already resolved.",
    "zh-CN": "这项提议已经处理。"
  },
  "sessionUi.proposal.error.permission": {
    "en": "Only the offer's player or the lead can do that.",
    "zh-CN": "只有角色的玩家或队长可以处理这项提议。"
  },
  "sessionUi.proposal.error.tradePermission": {
    "en": "Only the other side, the offerer or the lead can do that.",
    "zh-CN": "只有交易对方、提议者或队长可以处理这项交易。"
  },
  "sessionUi.proposal.error.tradeApply": {
    "en": "The trade could not go through: {detail}",
    "zh-CN": "交易未能完成：{detail}"
  },
  "sessionUi.proposal.error.offerApply": {
    "en": "The offer could not be applied: {detail}",
    "zh-CN": "这项变更未能生效：{detail}"
  },
  "sessionUi.trade.title": {
    "en": "Trade with {name}",
    "zh-CN": "与{name}交易"
  },
  "sessionUi.trade.gives": {
    "en": "{name} gives",
    "zh-CN": "{name}交付"
  },
  "sessionUi.trade.mine": {
    "en": "From my pack",
    "zh-CN": "从我的背包中选择"
  },
  "sessionUi.trade.theirs": {
    "en": "From their pack",
    "zh-CN": "从对方背包中选择"
  },
  "sessionUi.trade.coin": {
    "en": "Coin",
    "zh-CN": "钱币"
  },
  "sessionUi.trade.goldLimit": {
    "en": "gp of {max}",
    "zh-CN": "枚金币，上限 {max}"
  },
  "sessionUi.trade.empty": {
    "en": "Nothing carried.",
    "zh-CN": "背包为空。"
  },
  "sessionUi.trade.quantity": {
    "en": "How many {name}",
    "zh-CN": "{name}的数量"
  },
  "sessionUi.trade.cancel": {
    "en": "Never mind",
    "zh-CN": "取消"
  },
  "sessionUi.trade.offer": {
    "en": "Offer the trade",
    "zh-CN": "提出交易"
  },
  "sessionUi.trade.summary": {
    "en": "{from} offers {give} to {to} for {want}",
    "zh-CN": "{from}向{to}提出交易：交付{give}，换取{want}"
  },
  "sessionUi.trade.nothing": {
    "en": "nothing",
    "zh-CN": "无"
  },
  "sessionUi.trade.list": {
    "en": ", ",
    "zh-CN": "、"
  },
  "sessionUi.trade.error.failed": {
    "en": "The offer could not be made.",
    "zh-CN": "无法提出交易。"
  },
  "sessionUi.trade.error.empty": {
    "en": "Offer something, or ask for something.",
    "zh-CN": "请选择要交付或索取的物品、钱币。"
  },
  "sessionUi.trade.error.noCharacter": {
    "en": "You have no character to trade with.",
    "zh-CN": "你还没有可用于交易的角色。"
  },
  "sessionUi.trade.error.other": {
    "en": "Pick another character at this table.",
    "zh-CN": "请选择此战役中的另一名角色。"
  }
});
