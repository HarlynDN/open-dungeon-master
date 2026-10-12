import { defineMessages } from "./catalog.ts";

export const NOTIFICATION_MESSAGES = /*#__PURE__*/ defineMessages({
  "notifications.defaultSession": { en: "the session", "zh-CN": "本次聚会" },
  "notifications.message.friendRequest": { en: "{actor} wants to be friends.", "zh-CN": "{actor} 想与你成为好友。" },
  "notifications.message.friendAccepted": { en: "{actor} accepted your friend request.", "zh-CN": "{actor} 接受了你的好友请求。" },
  "notifications.message.friendInvite": { en: '{actor} invited you to "{campaign}". Join with room code {roomCode}.', "zh-CN": "{actor} 邀请你加入“{campaign}”。使用房间码 {roomCode} 加入。" },
  "notifications.message.reportDm": { en: "{actor} reported a Dungeon Master passage in {campaign}.", "zh-CN": "{actor} 举报了“{campaign}”中的一段 DM 叙事。" },
  "notifications.message.reportPlayer": { en: "{actor} reported a player in {campaign}.", "zh-CN": "{actor} 举报了“{campaign}”中的一名玩家。" },
  "notifications.message.sessionScheduled": { en: "{campaign}: {session} is planned for {when}.", "zh-CN": "{campaign}：{session} 定于 {when} 举行。" },
  "notifications.message.sessionUpdated": { en: "{campaign}: {session} moved to {when}.", "zh-CN": "{campaign}：{session} 改期至 {when}。" },
  "notifications.message.sessionCancelled": { en: "{campaign}: {session} on {when} was called off.", "zh-CN": "{campaign}：原定于 {when} 举行的{session}已取消。" },
  "notifications.message.rsvpNo": { en: "{actor} can't make {session} in {campaign}.", "zh-CN": "{actor} 无法参加“{campaign}”的{session}。" },
  "notifications.message.sessionSoon": { en: "{campaign}: {session} starts soon, at {when}. See you at the table.", "zh-CN": "{campaign}：{session} 即将于 {when} 开始。游戏桌上见。" },
  "notifications.message.sessionStarting": { en: "{campaign}: {session} is starting now. To the table!", "zh-CN": "{campaign}：{session} 现在开始，快来游戏桌！" },
  "notifications.message.campaignIdle": { en: "The table misses you: {campaign} has been quiet for a few days.", "zh-CN": "游戏桌在等你：“{campaign}”已有几天没有动静了。" },
});
