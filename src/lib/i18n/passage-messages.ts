import { defineMessages } from "./catalog.ts";

// Transcript chrome only: old prose, marker IDs and action protocols stay literal.
export const PASSAGE_MESSAGES = /*#__PURE__*/ defineMessages({
  "passageUi.copy.name": {
    "en": "Copy text",
    "zh-CN": "复制文字"
  },
  "passageUi.copy.label": {
    "en": "Copy this message's text",
    "zh-CN": "复制这条消息的文字"
  },
  "passageUi.copy.hint": {
    "en": "Copy: put this message's words on the clipboard",
    "zh-CN": "复制：将这条消息的文字放入剪贴板"
  },
  "passageUi.dispute.name": {
    "en": "Dispute",
    "zh-CN": "提出异议"
  },
  "passageUi.dispute.label": {
    "en": "Dispute this ruling",
    "zh-CN": "对这项裁定提出异议"
  },
  "passageUi.dispute.hint": {
    "en": "Dispute: object to what the narrator ruled here; whoever steers the story settles it, or the table votes",
    "zh-CN": "异议：对这段叙事的裁定提出异议，由主持者处理或全桌投票"
  },
  "passageUi.report.name": {
    "en": "Report",
    "zh-CN": "举报"
  },
  "passageUi.report.passage": {
    "en": "Report this passage",
    "zh-CN": "举报这段叙事"
  },
  "passageUi.report.message": {
    "en": "Report this message",
    "zh-CN": "举报这条消息"
  },
  "passageUi.report.passageHint": {
    "en": "Report: flag this passage to the admins of this server",
    "zh-CN": "举报：将这段叙事提交给服务器管理员"
  },
  "passageUi.report.messageHint": {
    "en": "Report: flag this message to the admins of this server, or block the player",
    "zh-CN": "举报：将这条消息提交给服务器管理员，或屏蔽该玩家"
  },
  "passageUi.player": {
    "en": "Player",
    "zh-CN": "玩家"
  },
  "passageUi.lead": {
    "en": "Party Lead",
    "zh-CN": "队长"
  },
  "passageUi.blocked": {
    "en": "A message from a player you blocked",
    "zh-CN": "来自已屏蔽玩家的消息"
  },
  "passageUi.playerActions": {
    "en": "{name}: message actions",
    "zh-CN": "{name}：消息操作"
  },
  "passageUi.reroll.name": {
    "en": "Reroll",
    "zh-CN": "重新叙述"
  },
  "passageUi.reroll.label": {
    "en": "Reroll this narration",
    "zh-CN": "重新叙述这一段"
  },
  "passageUi.reroll.hint": {
    "en": "Reroll: have the DM write this moment again, with the same dice and outcome",
    "zh-CN": "重新叙述：让 DM 重写这一刻，骰点与结果保持不变"
  },
  "passageUi.continue.name": {
    "en": "Continue the scene",
    "zh-CN": "续写场景"
  },
  "passageUi.continue.label": {
    "en": "Continue this scene",
    "zh-CN": "续写这个场景"
  },
  "passageUi.continue.hint": {
    "en": "Continue: have the DM keep writing from where this stopped, without moving the story on",
    "zh-CN": "续写：让 DM 从此处继续描写，不推进故事"
  },
  "passageUi.edit.name": {
    "en": "Edit",
    "zh-CN": "编辑"
  },
  "passageUi.edit.label": {
    "en": "Edit this narration",
    "zh-CN": "编辑这段叙事"
  },
  "passageUi.edit.hint": {
    "en": "Edit: fix what the DM said. Mechanics are untouched, and every dice marker must survive",
    "zh-CN": "编辑：修正 DM 的叙述，规则结果保持不变，所有骰子标记都必须保留"
  },
  "passageUi.remember.name": {
    "en": "Remember",
    "zh-CN": "记住"
  },
  "passageUi.remember.label": {
    "en": "Pin this to the DM's memory",
    "zh-CN": "固定到 DM 的记忆"
  },
  "passageUi.remember.hint": {
    "en": "Remember: keep your selected text (or this whole message) in front of the DM every turn",
    "zh-CN": "记住：将选中的文字或整条消息固定为 DM 每个回合都能看到的记忆"
  },
  "passageUi.lore.name": {
    "en": "Lore check",
    "zh-CN": "核对背景"
  },
  "passageUi.lore.label": {
    "en": "Lore check this passage",
    "zh-CN": "核对这段叙事的背景"
  },
  "passageUi.lore.hint": {
    "en": "Lore check: flag this passage (or your selected text) against the campaign record",
    "zh-CN": "核对背景：对照战役记录核查这段叙事或选中的文字"
  },
  "passageUi.canon.name": {
    "en": "Pin as canon",
    "zh-CN": "固定为事实"
  },
  "passageUi.canon.label": {
    "en": "Pin this passage as canon",
    "zh-CN": "将这段叙事固定为事实"
  },
  "passageUi.canon.hint": {
    "en": "Pin as canon: keep this passage (or your selected text) in front of the DM permanently",
    "zh-CN": "固定为事实：让 DM 始终看到这段叙事或选中的文字"
  },
  "passageUi.picture.replace": {
    "en": "Replace the picture",
    "zh-CN": "更换图片"
  },
  "passageUi.picture.add": {
    "en": "Add a picture",
    "zh-CN": "添加图片"
  },
  "passageUi.picture.replaceHint": {
    "en": "Replace picture: put an image of your own under this passage",
    "zh-CN": "更换图片：将自己的图片放在这段叙事下方"
  },
  "passageUi.picture.addHint": {
    "en": "Add a picture: put an image of your own under this passage",
    "zh-CN": "添加图片：将自己的图片放在这段叙事下方"
  },
  "passageUi.read.name": {
    "en": "Read aloud",
    "zh-CN": "朗读"
  },
  "passageUi.read.label": {
    "en": "Read this passage aloud",
    "zh-CN": "朗读这段叙事"
  },
  "passageUi.dm": {
    "en": "Dungeon Master",
    "zh-CN": "地下城主"
  },
  "passageUi.scene": {
    "en": "Scene",
    "zh-CN": "场景"
  },
  "passageUi.trying": {
    "en": "Trying…",
    "zh-CN": "正在重试……"
  },
  "passageUi.retry": {
    "en": "Try again",
    "zh-CN": "重试"
  },
  "passageUi.error.upload": {
    "en": "That image would not upload.",
    "zh-CN": "未能上传图片。"
  },
  "passageUi.error.attach": {
    "en": "Could not put that picture under the passage.",
    "zh-CN": "未能将图片添加到叙事下方。"
  },
  "passageUi.previous": {
    "en": "Previous take",
    "zh-CN": "上一版"
  },
  "passageUi.next": {
    "en": "Next take",
    "zh-CN": "下一版"
  },
  "passageUi.actions": {
    "en": "Passage actions",
    "zh-CN": "叙事操作"
  },
  "passageUi.illustrating": {
    "en": "Illustrating the scene...",
    "zh-CN": "正在绘制场景……"
  },
  "passageUi.charting": {
    "en": "Charting the area...",
    "zh-CN": "正在绘制区域地图……"
  },
  "passageUi.speaker": {
    "en": "{name}, through the DM",
    "zh-CN": "{name}（由 DM 代述）"
  },
  "passageUi.map": {
    "en": "Map of {name}",
    "zh-CN": "{name}的地图"
  },
  "passageUi.notVoiced": {
    "en": "This passage was not read aloud. {reason}",
    "zh-CN": "这段叙事未能朗读。{reason}"
  },
  "passageUi.editor.narration": {
    "en": "Narration",
    "zh-CN": "叙事"
  },
  "passageUi.editor.save": {
    "en": " Save",
    "zh-CN": " 保存"
  },
  "passageUi.editor.cancel": {
    "en": " Cancel",
    "zh-CN": " 取消"
  },
  "passageUi.editor.keys": {
    "en": "Enter saves, Shift+Enter for a new line, Escape cancels. Keep the dice markers.",
    "zh-CN": "Enter 保存，Shift+Enter 换行，Escape 取消。请保留骰子标记。"
  },
  "passageUi.reroll.title": {
    "en": "Reroll the narration",
    "zh-CN": "重新叙述"
  },
  "passageUi.close": {
    "en": "Close",
    "zh-CN": "关闭"
  },
  "passageUi.reroll.variation": {
    "en": "Variation",
    "zh-CN": "变化幅度"
  },
  "passageUi.reroll.drift": {
    "en": "How far this take may drift from the last",
    "zh-CN": "这一版与上一版措辞的差异幅度"
  },
  "passageUi.reroll.guidance": {
    "en": "Guidance for this take (optional)",
    "zh-CN": "本次叙述指引（可选）"
  },
  "passageUi.reroll.placeholder": {
    "en": "darker, more dialogue, shorter...",
    "zh-CN": "更阴暗、更多对话、更简短……"
  },
  "passageUi.reroll.description": {
    "en": "The DM says the same moment in different words. Nothing else moves: the same rolls, the same damage, the same outcome. Take {taken} of {max}.",
    "zh-CN": "DM 会用不同措辞叙述同一时刻。骰点、伤害和结果都保持不变。当前为第 {taken} 版，共可保留 {max} 版。"
  },
  "passageUi.reroll.capped": {
    "en": " That is every take; browse them and pick one.",
    "zh-CN": " 已达到版本上限，请浏览并选择已有版本。"
  },
  "passageUi.reroll.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "passageUi.reroll.writing": {
    "en": " Writing...",
    "zh-CN": " 正在撰写……"
  },
  "passageUi.preset.darker": {
    "en": "darker",
    "zh-CN": "更阴暗"
  },
  "passageUi.preset.dialogue": {
    "en": "more dialogue",
    "zh-CN": "更多对话"
  },
  "passageUi.preset.shorter": {
    "en": "shorter",
    "zh-CN": "更简短"
  },
  "passageUi.preset.sensory": {
    "en": "more sensory detail",
    "zh-CN": "更多感官细节"
  },
  "passageUi.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "passageUi.error.reroll": {
    "en": "The reroll failed; try again.",
    "zh-CN": "重新叙述失败，请重试。"
  },
  "passageUi.error.edit": {
    "en": "Could not save the edit.",
    "zh-CN": "未能保存修改。"
  },
  "passageUi.error.invalidEdit": {
    "en": "Invalid edit.",
    "zh-CN": "编辑内容无效。"
  },
  "passageUi.error.messageMissing": {
    "en": "Message not found.",
    "zh-CN": "找不到该消息。"
  },
  "passageUi.error.editOnly": {
    "en": "Only DM narration can be edited.",
    "zh-CN": "只能编辑 DM 的叙事。"
  },
  "passageUi.error.empty": {
    "en": "The narration cannot be empty.",
    "zh-CN": "叙事内容不能为空。"
  },
  "passageUi.error.length": {
    "en": "That is longer than a narration can be.",
    "zh-CN": "叙事内容过长。"
  },
  "passageUi.error.invalidReroll": {
    "en": "Invalid reroll request.",
    "zh-CN": "重新叙述的请求无效。"
  },
  "passageUi.error.invalidSelect": {
    "en": "Invalid select request.",
    "zh-CN": "选择版本的请求无效。"
  },
  "passageUi.error.latest": {
    "en": "Only the DM's most recent message can be rerolled.",
    "zh-CN": "只能重新叙述 DM 的最新消息。"
  },
  "passageUi.error.midTurn": {
    "en": "The DM is mid-turn; try again after.",
    "zh-CN": "DM 正在处理回合，请稍后重试。"
  },
  "passageUi.error.onlyDM": {
    "en": "Only DM narration can be rerolled.",
    "zh-CN": "只能重新叙述 DM 的叙事。"
  },
  "passageUi.error.old": {
    "en": "This narration predates rerolls; there is no turn to replay.",
    "zh-CN": "这段叙事创建于重新叙述功能启用之前，没有可重放的回合。"
  },
  "passageUi.error.turnMissing": {
    "en": "The turn behind this narration is gone.",
    "zh-CN": "这段叙事对应的回合已不存在。"
  },
  "passageUi.error.conversationMissing": {
    "en": "This narration has no stored conversation to replay.",
    "zh-CN": "这段叙事没有已保存的对话可供重放。"
  },
  "passageUi.error.dmEmpty": {
    "en": "The DM returned nothing; try again.",
    "zh-CN": "DM 没有返回内容，请重试。"
  },
  "passageUi.error.store": {
    "en": "Could not store the new take.",
    "zh-CN": "未能保存新的叙述版本。"
  },
  "passageUi.error.noTake": {
    "en": "No such take.",
    "zh-CN": "找不到该叙述版本。"
  },
  "passageUi.error.select": {
    "en": "Could not select that take.",
    "zh-CN": "未能选择该叙述版本。"
  },
  "passageUi.error.cap": {
    "en": "That is all {max} takes; pick one.",
    "zh-CN": "已达到 {max} 版上限，请选择已有版本。"
  },
  "passageUi.error.drop": {
    "en": "That edit drops a dice roll ({marker}). Keep every roll marker so the dice stay in the record.",
    "zh-CN": "这次编辑删除了骰子标记（{marker}）。请保留所有标记，以免骰子记录消失。"
  },
  "passageUi.error.repeat": {
    "en": "That edit repeats a dice roll ({marker}). Each roll may appear once.",
    "zh-CN": "这次编辑重复了骰子标记（{marker}）。每项骰子记录只能出现一次。"
  },
  "passageUi.error.add": {
    "en": "That edit adds a dice roll ({marker}) the turn never made.",
    "zh-CN": "这次编辑添加了该回合不存在的骰子标记（{marker}）。"
  },
  "passageUi.error.voicedOnly": {
    "en": "Only the DM's narration can be voiced.",
    "zh-CN": "只能朗读 DM 的叙事。"
  },
  "passageUi.error.voiceOff": {
    "en": "Narration is switched off on this server (Admin > Speech).",
    "zh-CN": "此服务器已关闭朗读（管理员设置 > 语音）。"
  },
  "passageUi.error.voiceFail": {
    "en": "Narration failed. {reason}",
    "zh-CN": "朗读失败。{reason}"
  },
  "passageUi.error.voiceService": {
    "en": "Narration failed. Check that the speech service is reachable.",
    "zh-CN": "朗读失败，请检查语音服务是否可连接。"
  },
  "passageUi.error.uploaded": {
    "en": "That is not an uploaded image.",
    "zh-CN": "这不是已上传的图片。"
  },
  "passageUi.error.passageMissing": {
    "en": "That passage is no longer there.",
    "zh-CN": "这段叙事已不存在。"
  },
  "passageUi.error.dmPicture": {
    "en": "Only a DM passage can carry a picture.",
    "zh-CN": "只能为 DM 的叙事添加图片。"
  }
});
