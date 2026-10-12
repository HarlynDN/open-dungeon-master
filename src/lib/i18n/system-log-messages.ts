import { defineMessages } from "./catalog.ts";
export const SYSTEM_LOG_MESSAGES = /*#__PURE__*/ defineMessages({
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
