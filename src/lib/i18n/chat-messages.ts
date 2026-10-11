import { defineMessages } from "./catalog.ts";

// Side-chat/media chrome only. Private content and actor names remain literal.
export const CHAT_MESSAGES = /*#__PURE__*/ defineMessages({
  "chatUi.title": {
    "en": "Private chats",
    "zh-CN": "私聊"
  },
  "chatUi.participants": {
    "en": "Who's in it?",
    "zh-CN": "选择聊天成员"
  },
  "chatUi.groupName": {
    "en": "Group name (optional)",
    "zh-CN": "群聊名称（可选）"
  },
  "chatUi.all": {
    "en": "All chats",
    "zh-CN": "所有聊天"
  },
  "chatUi.send": {
    "en": "Send",
    "zh-CN": "发送"
  },
  "chatUi.new": {
    "en": " New",
    "zh-CN": " 新建"
  },
  "chatUi.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "chatUi.start": {
    "en": "Start chat",
    "zh-CN": "开始聊天"
  },
  "chatUi.privacy": {
    "en": "Only the people in a chat can read it. The AI Dungeon Master never sees these.",
    "zh-CN": "仅聊天成员可以阅读。AI DM 看不到这些内容。"
  },
  "chatUi.empty": {
    "en": "No side chats yet. Whisper a party member from their card, or start one here.",
    "zh-CN": "暂无私聊。你可以从队伍成员的卡片发起私聊，或在这里创建聊天。"
  },
  "chatUi.someone": {
    "en": "someone",
    "zh-CN": "某位玩家"
  },
  "chatUi.separator": {
    "en": ", ",
    "zh-CN": "、"
  },
  "chatUi.chime.muted": {
    "en": "Chime muted",
    "zh-CN": "提示音已关闭"
  },
  "chatUi.chime.on": {
    "en": "Chime on",
    "zh-CN": "提示音已开启"
  },
  "chatUi.chime.mutedTip": {
    "en": "Chime muted. Click to play a chime when a private message arrives.",
    "zh-CN": "提示音已关闭。点击后，收到私聊消息时会播放提示音。"
  },
  "chatUi.chime.onTip": {
    "en": "The chime plays when a private message arrives. Click to mute.",
    "zh-CN": "收到私聊消息时会播放提示音。点击可关闭。"
  },
  "chatUi.retry": {
    "en": "Try again",
    "zh-CN": "重试"
  },
  "chatUi.message": {
    "en": "Message {name}",
    "zh-CN": "发送消息给{name}"
  },
  "chatUi.error.open": {
    "en": "Could not open the chat.",
    "zh-CN": "未能打开聊天。"
  },
  "chatUi.error.create": {
    "en": "Could not create the chat.",
    "zh-CN": "未能创建聊天。"
  },
  "chatUi.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "chatUi.error.pick": {
    "en": "Pick at least one member.",
    "zh-CN": "请至少选择一位成员。"
  },
  "chatUi.error.send": {
    "en": "Could not send.",
    "zh-CN": "未能发送消息。"
  },
  "chatUi.error.load": {
    "en": "Could not load the chat messages.",
    "zh-CN": "未能加载聊天消息。"
  },
  "chatUi.media.failed": {
    "en": "Illustration failed; the story carries on.",
    "zh-CN": "插图生成失败，故事仍会继续。"
  },
  "chatUi.media.queued": {
    "en": "Waiting for the render queue...",
    "zh-CN": "正在等待生成队列……"
  },
  "chatUi.narrator": {
    "en": "Narrator",
    "zh-CN": "叙述者"
  },
  "chatUi.error.input": {
    "en": "Invalid input.",
    "zh-CN": "输入内容无效。"
  },
  "chatUi.error.other": {
    "en": "Pick at least one other member.",
    "zh-CN": "请至少选择一位其他成员。"
  },
  "chatUi.error.members": {
    "en": "Everyone in a chat must be in the campaign.",
    "zh-CN": "聊天成员必须全部属于此战役。"
  },
  "chatUi.error.blockedCreate": {
    "en": "You cannot open a chat with a player one of you has blocked.",
    "zh-CN": "你们之间存在屏蔽关系，无法创建聊天。"
  },
  "chatUi.error.direct": {
    "en": "A direct chat has exactly one other member.",
    "zh-CN": "私聊只能选择一位其他成员。"
  },
  "chatUi.error.notFound": {
    "en": "Not found.",
    "zh-CN": "找不到该聊天。"
  },
  "chatUi.error.blockedSend": {
    "en": "One of you has blocked the other.",
    "zh-CN": "你们之间存在屏蔽关系。"
  },
  "chatUi.error.empty": {
    "en": "Message can't be empty.",
    "zh-CN": "消息不能为空。"
  }
});
