import { defineMessages } from "./catalog.ts";

// Sources are global UI; tray copy loads with campaign content. Protocols stay canonical.
export const DICE_CONTROL_MESSAGES = /*#__PURE__*/ defineMessages({
  "diceTrayUi.title": {
    "en": "Roll dice",
    "zh-CN": "掷骰"
  },
  "diceTrayUi.addDie": {
    "en": "Add a die",
    "zh-CN": "添加骰子"
  },
  "diceTrayUi.die": {
    "en": "Add a d{sides}{count}",
    "zh-CN": "添加 d{sides}{count}"
  },
  "diceTrayUi.dieCount": {
    "en": " ({count} in the pool)",
    "zh-CN": "（骰池已有 {count} 枚）"
  },
  "diceTrayUi.dice": {
    "en": "Dice",
    "zh-CN": "骰子"
  },
  "diceTrayUi.bonus": {
    "en": "Bonus",
    "zh-CN": "调整值"
  },
  "diceTrayUi.expression": {
    "en": "Tap dice, or type 2d6+3",
    "zh-CN": "点击骰子，或输入 2d6+3"
  },
  "diceTrayUi.empty": {
    "en": "Empty the tray",
    "zh-CN": "清空骰盘"
  },
  "diceTrayUi.secret": {
    "en": "Roll in secret",
    "zh-CN": "秘密掷骰"
  },
  "diceTrayUi.public": {
    "en": "Off: the whole table sees the roll.",
    "zh-CN": "关闭：全桌都能看到掷骰结果。"
  },
  "diceTrayUi.rolling": {
    "en": "Rolling",
    "zh-CN": "正在掷骰"
  },
  "diceTrayUi.roll": {
    "en": "Roll",
    "zh-CN": "掷骰"
  },
  "diceTrayUi.results": {
    "en": "Your rolls",
    "zh-CN": "你的掷骰结果"
  },
  "diceTrayUi.resultSecret": {
    "en": "Secret",
    "zh-CN": "秘密"
  },
  "diceTrayUi.error.roll": {
    "en": "Those dice could not be rolled.",
    "zh-CN": "未能完成掷骰。"
  },
  "diceTrayUi.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "diceTrayUi.audience.dm": {
    "en": "Only you see it. The table is not told a die was rolled.",
    "zh-CN": "只有你能看到，其他玩家不会获知此次掷骰。"
  },
  "diceTrayUi.audience.aiLead": {
    "en": "Only you and the AI storyteller see it.",
    "zh-CN": "只有你和 AI DM 能看到。"
  },
  "diceTrayUi.audience.aiPlayer": {
    "en": "Only you, the AI storyteller and the party lead see it.",
    "zh-CN": "只有你、AI DM 和队长能看到。"
  },
  "diceTrayUi.audience.human": {
    "en": "Only you and the DM see it. The rest of the table is not told.",
    "zh-CN": "只有你和 DM 能看到，其他玩家不会获知此次掷骰。"
  },
  "diceTrayUi.error.request": {
    "en": "Invalid roll request.",
    "zh-CN": "掷骰请求无效。"
  },
  "diceTrayUi.error.bad": {
    "en": "Bad dice expression.",
    "zh-CN": "骰子表达式无效。"
  },
  "diceTrayUi.error.empty": {
    "en": "Empty dice expression.",
    "zh-CN": "骰子表达式不能为空。"
  },
  "diceTrayUi.error.terms": {
    "en": "Too many terms in dice expression.",
    "zh-CN": "骰子表达式中的项过多。"
  },
  "diceTrayUi.error.noDie": {
    "en": "A roll needs at least one die, such as 1d20+3: a bare number is not a roll.",
    "zh-CN": "表达式必须至少包含一枚骰子，例如 1d20+3；单独的数字不能作为掷骰。"
  },
  "diceTrayUi.error.flat": {
    "en": "A roll's flat bonus is at most {limit} either way: roll the dice and add the rest at the table.",
    "zh-CN": "固定调整值最多为正负 {limit}。请先掷骰，再由游戏桌处理其余修正。"
  },
  "diceTrayUi.error.invalid": {
    "en": "Invalid dice expression: {expression}",
    "zh-CN": "骰子表达式无效：{expression}"
  },
  "diceTrayUi.error.term": {
    "en": "Invalid dice term: {term}",
    "zh-CN": "骰子项无效：{term}"
  },
  "diceTrayUi.error.count": {
    "en": "Dice count out of range in: {term}",
    "zh-CN": "骰子数量超出范围：{term}"
  },
  "diceTrayUi.error.size": {
    "en": "Die size out of range in: {term}",
    "zh-CN": "骰子面数超出范围：{term}"
  },
  "diceTrayUi.error.keep": {
    "en": "Keep count out of range in: {term}",
    "zh-CN": "保留骰子的数量超出范围：{term}"
  },
  "diceTrayUi.error.reroll": {
    "en": "Reroll threshold out of range in: {term}",
    "zh-CN": "重掷阈值超出范围：{term}"
  },
  "diceSourceUi.button": {
    "en": "Dice sources",
    "zh-CN": "骰子来源"
  },
  "diceSourceUi.tip": {
    "en": "Choose where each of your dice is rolled: typed, digital, or a Pixels Bluetooth die.",
    "zh-CN": "为每种骰子选择来源：手动输入、电子掷骰或 Pixels 蓝牙骰子。"
  },
  "diceSourceUi.title": {
    "en": "Your dice sources",
    "zh-CN": "你的骰子来源"
  },
  "diceSourceUi.unsupported": {
    "en": "Bluetooth dice need a Chromium browser (Chrome, Edge, or Opera). You can still choose typed or digital sources below. On Linux, enable",
    "zh-CN": "蓝牙骰子需要 Chromium 浏览器（Chrome、Edge 或 Opera）。你仍可在下方选择手动输入或电子掷骰。Linux 用户需启用"
  },
  "diceSourceUi.bluetooth": {
    "en": "Bluetooth dice",
    "zh-CN": "蓝牙骰子"
  },
  "diceSourceUi.connect": {
    "en": "Connect a Pixels die",
    "zh-CN": "连接 Pixels 骰子"
  },
  "diceSourceUi.blink": {
    "en": "Blink {name} so you can spot it",
    "zh-CN": "让{name}闪烁以便辨认"
  },
  "diceSourceUi.blinkTip": {
    "en": "Blink this die so you can spot it",
    "zh-CN": "让此骰子闪烁以便辨认"
  },
  "diceSourceUi.forget": {
    "en": "Forget {name}",
    "zh-CN": "移除{name}"
  },
  "diceSourceUi.forgetTip": {
    "en": "Forget this die",
    "zh-CN": "移除此骰子"
  },
  "diceSourceUi.none": {
    "en": "No dice connected. Connect one to assign it below.",
    "zh-CN": "尚未连接骰子。连接后即可在下方分配来源。"
  },
  "diceSourceUi.each": {
    "en": "Roll each die with",
    "zh-CN": "各类骰子的掷骰来源"
  },
  "diceSourceUi.assigned": {
    "en": "Assigned dice only apply while your physical-dice toggle is on. An assigned Bluetooth die that is offline falls back to typing.",
    "zh-CN": "分配的来源仅在开启实体骰选项时生效。已分配的蓝牙骰子离线时，会改为手动输入。"
  },
  "diceSourceUi.where": {
    "en": "Where the d{sides} comes from",
    "zh-CN": "d{sides} 的来源"
  },
  "diceSourceUi.manual": {
    "en": "Type it (tabletop die)",
    "zh-CN": "手动输入（实体骰）"
  },
  "diceSourceUi.digital": {
    "en": "Digital roll",
    "zh-CN": "电子掷骰"
  },
  "diceSourceUi.offline": {
    "en": "Assigned Pixels die (offline)",
    "zh-CN": "已分配的 Pixels 骰子（离线）"
  },
  "diceSourceUi.error.unsupported": {
    "en": "That die type isn't supported yet.",
    "zh-CN": "暂不支持这种骰子。"
  },
  "diceSourceUi.error.network": {
    "en": "Could not connect the Bluetooth die. {reason}",
    "zh-CN": "无法连接蓝牙骰子。{reason}"
  },
  "diceSourceUi.error.permission": {
    "en": "The browser did not allow this Bluetooth operation. {reason}",
    "zh-CN": "浏览器未允许此次蓝牙操作。{reason}"
  },
  "diceSourceUi.error.security": {
    "en": "The browser restricted Bluetooth access. {reason}",
    "zh-CN": "浏览器限制了蓝牙访问。{reason}"
  },
  "diceSourceUi.error.failed": {
    "en": "The die could not connect. {reason}",
    "zh-CN": "骰子连接失败。{reason}"
  }
});
