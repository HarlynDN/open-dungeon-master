import { defineMessages } from "./catalog.ts";

// Player-facing quest/faction controls; authored content and protocol values stay raw.
export const RECORD_MESSAGES = /*#__PURE__*/ defineMessages({
  "recordUi.faction.title": {
    "en": "Factions",
    "zh-CN": "势力"
  },
  "recordUi.faction.loading": {
    "en": "Reading the banners...",
    "zh-CN": "正在读取势力资料……"
  },
  "recordUi.faction.nameExample": {
    "en": "The Reed Court",
    "zh-CN": "芦苇宫廷"
  },
  "recordUi.faction.name": {
    "en": "Faction name",
    "zh-CN": "势力名称"
  },
  "recordUi.faction.blurb": {
    "en": "What the table knows of them",
    "zh-CN": "玩家已知的势力信息"
  },
  "recordUi.faction.goal": {
    "en": "What they want",
    "zh-CN": "势力目标"
  },
  "recordUi.faction.privateGoal": {
    "en": "What they want (only you read this)",
    "zh-CN": "势力目标（仅你可见）"
  },
  "recordUi.faction.attitude": {
    "en": "Attitude",
    "zh-CN": "态度"
  },
  "recordUi.faction.power": {
    "en": "Power",
    "zh-CN": "实力"
  },
  "recordUi.faction.tags": {
    "en": "Tags, comma separated",
    "zh-CN": "标签，以英文逗号分隔"
  },
  "recordUi.faction.empty": {
    "en": "No factions yet. The powers of this world are unnamed.",
    "zh-CN": "暂无势力，这个世界的各方力量尚未命名。"
  },
  "recordUi.addOne": {
    "en": " Add one",
    "zh-CN": " 添加势力"
  },
  "recordUi.cancel": {
    "en": " Cancel",
    "zh-CN": " 取消"
  },
  "recordUi.editButton": {
    "en": " Edit",
    "zh-CN": " 编辑"
  },
  "recordUi.add": {
    "en": "Add",
    "zh-CN": "添加"
  },
  "recordUi.save": {
    "en": "Save",
    "zh-CN": "保存"
  },
  "recordUi.edit": {
    "en": "Edit",
    "zh-CN": "编辑"
  },
  "recordUi.faction.removeConfirm": {
    "en": "Take {name} out of the world?",
    "zh-CN": "从世界中移除{name}？"
  },
  "recordUi.faction.removeAction": {
    "en": "Take them out",
    "zh-CN": "移除势力"
  },
  "recordUi.faction.remove": {
    "en": "Remove {name}",
    "zh-CN": "移除{name}"
  },
  "recordUi.faction.standingOption": {
    "en": "Standing {value}: {label}",
    "zh-CN": "声望 {value}：{label}"
  },
  "recordUi.faction.standing": {
    "en": "Standing {value}",
    "zh-CN": "声望 {value}"
  },
  "recordUi.faction.standingTip": {
    "en": "The party is {label} to them",
    "zh-CN": "他们对队伍的评价：{label}"
  },
  "recordUi.faction.powerValue": {
    "en": "power {value}",
    "zh-CN": "实力 {value}"
  },
  "recordUi.faction.goalValue": {
    "en": "Goal: {goal}",
    "zh-CN": "目标：{goal}"
  },
  "recordUi.faction.members": {
    "en": "Members: {names}",
    "zh-CN": "成员：{names}"
  },
  "recordUi.separator": {
    "en": ", ",
    "zh-CN": "、"
  },
  "recordUi.quest.title": {
    "en": "Quest log",
    "zh-CN": "任务日志"
  },
  "recordUi.quest.loading": {
    "en": "Opening the log...",
    "zh-CN": "正在打开任务日志……"
  },
  "recordUi.quest.titleExample": {
    "en": "Find the miller's daughter",
    "zh-CN": "寻找磨坊主的女儿"
  },
  "recordUi.quest.titleLabel": {
    "en": "Quest title",
    "zh-CN": "任务标题"
  },
  "recordUi.quest.objectives": {
    "en": "Objectives",
    "zh-CN": "目标"
  },
  "recordUi.quest.objectiveLines": {
    "en": "Objectives, one per line",
    "zh-CN": "目标，每行一项"
  },
  "recordUi.quest.empty": {
    "en": "Nothing on the log yet.",
    "zh-CN": "任务日志暂无记录。"
  },
  "recordUi.quest.private": {
    "en": "DM only",
    "zh-CN": "仅 DM 可见"
  },
  "recordUi.quest.status": {
    "en": "Status",
    "zh-CN": "状态"
  },
  "recordUi.quest.removeAction": {
    "en": "Take it off",
    "zh-CN": "移除任务"
  },
  "recordUi.quest.remove": {
    "en": "Take it off the log",
    "zh-CN": "从任务日志中移除"
  },
  "recordUi.quest.objectiveExample": {
    "en": "Objectives, one per line:\nAsk at the mill\nSearch the weir",
    "zh-CN": "目标，每行一项：\n前往磨坊询问\n搜查堰坝"
  },
  "recordUi.quest.write": {
    "en": " Write one",
    "zh-CN": " 新建任务"
  },
  "recordUi.quest.add": {
    "en": " Add",
    "zh-CN": " 添加"
  },
  "recordUi.quest.cancel": {
    "en": " Cancel",
    "zh-CN": " 取消"
  },
  "recordUi.quest.activeCount": {
    "en": "{count} active",
    "zh-CN": "{count} 项进行中"
  },
  "recordUi.quest.removeConfirm": {
    "en": "Take \"{title}\" off the log?",
    "zh-CN": "从任务日志中移除“{title}”？"
  },
  "recordUi.quest.mark": {
    "en": "Mark {status}",
    "zh-CN": "标记为{status}"
  },
  "recordUi.quest.doneObjective": {
    "en": "Done: {text}",
    "zh-CN": "已完成：{text}"
  },
  "recordUi.quest.sourceStory": {
    "en": "From the story",
    "zh-CN": "来自故事"
  },
  "recordUi.faction.attitude.hostile": {
    "en": "hostile",
    "zh-CN": "敌对"
  },
  "recordUi.faction.attitude.wary": {
    "en": "wary",
    "zh-CN": "戒备"
  },
  "recordUi.faction.attitude.neutral": {
    "en": "neutral",
    "zh-CN": "中立"
  },
  "recordUi.faction.attitude.friendly": {
    "en": "friendly",
    "zh-CN": "友好"
  },
  "recordUi.faction.attitude.allied": {
    "en": "allied",
    "zh-CN": "盟友"
  },
  "recordUi.faction.reputation.hunted": {
    "en": "hunted",
    "zh-CN": "遭到追捕"
  },
  "recordUi.faction.reputation.disliked": {
    "en": "disliked",
    "zh-CN": "受到嫌恶"
  },
  "recordUi.faction.reputation.suspected": {
    "en": "suspected",
    "zh-CN": "遭到怀疑"
  },
  "recordUi.faction.reputation.unknown": {
    "en": "unknown",
    "zh-CN": "无人知晓"
  },
  "recordUi.faction.reputation.noticed": {
    "en": "noticed",
    "zh-CN": "受到关注"
  },
  "recordUi.faction.reputation.trusted": {
    "en": "trusted",
    "zh-CN": "受到信任"
  },
  "recordUi.faction.reputation.honoured": {
    "en": "honoured",
    "zh-CN": "备受尊重"
  },
  "recordUi.quest.status.active": {
    "en": "Active",
    "zh-CN": "进行中"
  },
  "recordUi.quest.status.done": {
    "en": "Done",
    "zh-CN": "已完成"
  },
  "recordUi.quest.status.failed": {
    "en": "Failed",
    "zh-CN": "失败"
  },
  "recordUi.quest.status.hidden": {
    "en": "Hidden",
    "zh-CN": "隐藏"
  },
  "recordUi.error.factionLoad": {
    "en": "The factions did not load. {reason}",
    "zh-CN": "势力资料未能加载。{reason}"
  },
  "recordUi.error.questLoad": {
    "en": "The quest log did not load. {reason}",
    "zh-CN": "任务日志未能加载。{reason}"
  },
  "recordUi.error.mutation": {
    "en": "That change was not saved.",
    "zh-CN": "此次修改未保存。"
  },
  "recordUi.error.network": {
    "en": "The server could not be reached.",
    "zh-CN": "无法连接服务器。"
  },
  "recordUi.error.unreadable": {
    "en": "The server's answer could not be read.",
    "zh-CN": "无法读取服务器响应。"
  },
  "recordUi.error.status": {
    "en": "The server answered {status}.",
    "zh-CN": "服务器返回状态码 {status}。"
  },
  "recordUi.error.factionName": {
    "en": "A faction needs a name.",
    "zh-CN": "势力需要一个名称。"
  },
  "recordUi.error.questTitle": {
    "en": "A quest needs a title.",
    "zh-CN": "任务需要一个标题。"
  },
  "recordUi.error.factionMissing": {
    "en": "Faction not found.",
    "zh-CN": "找不到该势力。"
  },
  "recordUi.error.questMissing": {
    "en": "Quest not found.",
    "zh-CN": "找不到该任务。"
  },
  "recordUi.error.upload": {
    "en": "Not an uploaded file.",
    "zh-CN": "这不是已上传的文件。"
  }
});
