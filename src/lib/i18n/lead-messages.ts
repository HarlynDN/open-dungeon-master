import { defineMessages } from "./catalog.ts";

// Desk labels/errors only; share links, identities and authority stay canonical.
export const LEAD_MESSAGES = /*#__PURE__*/ defineMessages({
  "leadUi.literal.0": {
    "en": "Invites",
    "zh-CN": "邀请"
  },
  "leadUi.literal.1": {
    "en": "Allow new players to join with the invite code mid-game",
    "zh-CN": "允许新玩家使用邀请码在游戏中途加入"
  },
  "leadUi.literal.2": {
    "en": "Copy the invite link",
    "zh-CN": "复制邀请链接"
  },
  "leadUi.literal.3": {
    "en": "Show the invite QR code and share options",
    "zh-CN": "显示邀请二维码与分享选项"
  },
  "leadUi.literal.4": {
    "en": "The lead seat",
    "zh-CN": "队长席位"
  },
  "leadUi.literal.5": {
    "en": "Make lead",
    "zh-CN": "设为队长"
  },
  "leadUi.literal.6": {
    "en": "Nobody else at the table to hand it to.",
    "zh-CN": "桌上没有其他玩家可接任。"
  },
  "leadUi.literal.7": {
    "en": "Notes to approve",
    "zh-CN": "待批准的笔记"
  },
  "leadUi.literal.8": {
    "en": "Nothing waiting for you.",
    "zh-CN": "暂无待处理事项。"
  },
  "leadUi.literal.9": {
    "en": "Direct the story",
    "zh-CN": "引导故事"
  },
  "leadUi.literal.10": {
    "en": "Pick Direct in the composer, then Private for a note only the DM sees.",
    "zh-CN": "在输入框中选择“引导”，再开启“私密”，即可只向 DM 发送指引。"
  },
  "leadUi.literal.11": {
    "en": "Prepared fights and maps",
    "zh-CN": "预备的战斗与地图"
  },
  "leadUi.literal.12": {
    "en": "What came in from a workshop, yours to finish: rosters, maps, rewards. Cue a fight and the storyteller runs it, map and plan included, when the scene reaches it. The players never see this.",
    "zh-CN": "从工坊带入的角色名单、地图和奖励可在此补充完善。安排战斗后，主持者会在剧情到达该场景时，按照地图与计划展开战斗。玩家看不到这些准备内容。"
  },
  "leadUi.literal.13": {
    "en": "The fights and maps this table was given",
    "zh-CN": "查看此战役预备的战斗与地图"
  },
  "leadUi.literal.14": {
    "en": "Campaign details",
    "zh-CN": "战役资料"
  },
  "leadUi.literal.15": {
    "en": "Edit title, premise, setting, difficulty, and player slots",
    "zh-CN": "编辑标题、故事前提、设定、难度和玩家名额"
  },
  "leadUi.literal.16": {
    "en": " Edit details",
    "zh-CN": " 编辑资料"
  },
  "leadUi.joinOpen": {
    "en": "Joining open",
    "zh-CN": "允许中途加入"
  },
  "leadUi.joinClosed": {
    "en": "Joining closed",
    "zh-CN": "已关闭中途加入"
  },
  "leadUi.transferConfirm": {
    "en": "Make {name} the party lead? You will lose this tab.",
    "zh-CN": "将{name}设为队长？转交后你将无法再使用此标签页。"
  },
  "leadUi.asCharacter": {
    "en": " as {name}",
    "zh-CN": "，角色：{name}"
  },
  "leadUi.leadOnly": {
    "en": "Lead only",
    "zh-CN": "队长专用"
  },
  "leadUi.storyControls": {
    "en": "Story controls",
    "zh-CN": "故事控制"
  },
  "leadUi.steer": {
    "en": "You steer this table.",
    "zh-CN": "你负责推动此桌的故事。"
  },
  "leadUi.manage": {
    "en": "You manage invites and campaign details.",
    "zh-CN": "你负责管理邀请与战役资料。"
  },
  "leadUi.prepClose": {
    "en": "Close the prep",
    "zh-CN": "收起预备内容"
  },
  "leadUi.prepOpen": {
    "en": "Open the prep",
    "zh-CN": "打开预备内容"
  },
  "leadUi.details": {
    "en": "Difficulty {difficulty} · Level {level} start · Up to {players} players",
    "zh-CN": "难度：{difficulty} · 起始等级 {level} · 最多 {players} 位玩家"
  },
  "leadUi.error.join": {
    "en": "That change was not saved.",
    "zh-CN": "此次修改未保存。"
  },
  "leadUi.error.transfer": {
    "en": "The lead did not change.",
    "zh-CN": "未能转交队长身份。"
  },
  "leadUi.error.network": {
    "en": "Could not reach the table.",
    "zh-CN": "无法连接游戏桌面。"
  },
  "leadUi.error.permission": {
    "en": "Only the party lead or the owner can transfer the lead.",
    "zh-CN": "只有队长或战役所有者可以转交队长身份。"
  },
  "leadUi.error.notMember": {
    "en": "That user is not in this campaign.",
    "zh-CN": "该用户不是此战役的成员。"
  },
  "leadUi.error.settings": {
    "en": "Invalid game settings.",
    "zh-CN": "游戏设置无效。"
  },
  "leadUi.campaignControls": {
    "en": "Campaign controls",
    "zh-CN": "战役控制"
  },
  "leadUi.roleTools": {
    "en": "Tools available to your current role.",
    "zh-CN": "这里提供与你当前权限相符的管理工具。"
  }
});
