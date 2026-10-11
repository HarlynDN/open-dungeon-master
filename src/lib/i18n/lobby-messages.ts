import { defineMessages } from "./catalog.ts";

// UI copy and stable gate reasons; campaign and character text stay verbatim.
export const LOBBY_MESSAGES = /*#__PURE__*/ defineMessages({
  "lobby.noDmCharacter": { en: "No character needed", "zh-CN": "无需创建角色" },
  "lobby.edit": {
    "en": "Edit",
    "zh-CN": "编辑"
  },
  "lobby.switch": {
    "en": "Switch",
    "zh-CN": "更换"
  },
  "lobby.remove": {
    "en": "Remove",
    "zh-CN": "移除"
  },
  "lobby.startByOwner": {
    "en": "The owner or the DM starts the adventure once everyone is ready.",
    "zh-CN": "所有人准备好后，由战役拥有者或地下城主开始冒险。"
  },
  "lobby.begin": {
    "en": "Begin the adventure",
    "zh-CN": "开始冒险"
  },
  "lobby.running": {
    "en": "You are running this game.",
    "zh-CN": "你是本场游戏的地下城主。"
  },
  "lobby.dmHint": {
    "en": "No character, no party slot. Ready up when the table is set and the adventure is yours to open.",
    "zh-CN": "地下城主无需创建角色，也不占玩家名额。大家就绪后，点击准备，即可开始冒险。"
  },
  "lobby.notReadyAction": {
    "en": "Not ready",
    "zh-CN": "取消准备"
  },
  "lobby.readyAction": {
    "en": "Ready",
    "zh-CN": "准备"
  },
  "lobby.needsHero": {
    "en": "Your adventure needs a hero.",
    "zh-CN": "冒险需要一位英雄。"
  },
  "lobby.createCharacter": {
    "en": "Create your character",
    "zh-CN": "创建你的角色"
  },
  "lobby.addCharacter": {
    "en": "Add another character",
    "zh-CN": "添加另一个角色"
  },
  "lobby.unready": {
    "en": "Un-ready",
    "zh-CN": "取消准备"
  },
  "lobby.readyUp": {
    "en": "Ready up",
    "zh-CN": "准备就绪"
  },
  "lobby.characterClearsReady": {
    "en": "Changing your character clears your ready status.",
    "zh-CN": "更换角色后，需要重新确认准备。"
  },
  "lobby.delete": {
    "en": "Delete this campaign",
    "zh-CN": "删除此战役"
  },
  "lobby.waiting": {
    "en": "Waiting in the lobby",
    "zh-CN": "在大厅等待"
  },
  "lobby.editSettings": {
    "en": "Edit campaign settings",
    "zh-CN": "编辑战役设置"
  },
  "lobby.startLevel": {
    "en": "Level {level} start",
    "zh-CN": "从 {level} 级开始"
  },
  "lobby.physicalDice": {
    "en": "I roll physical dice",
    "zh-CN": "我使用实体骰子"
  },
  "lobby.physicalDiceHint": {
    "en": "The game pauses for you to enter your real rolls instead of rolling digitally.",
    "zh-CN": "游戏会暂停，等待你输入实体骰子的结果。"
  },
  "lobby.realDice": {
    "en": "Real dice",
    "zh-CN": "实体骰子"
  },
  "lobby.digitalDice": {
    "en": "Digital",
    "zh-CN": "数字骰子"
  },
  "lobby.partyTitle": {
    "en": "Party · {count}/{max}",
    "zh-CN": "队伍 · {count}/{max}"
  },
  "lobby.dm": {
    "en": "DM",
    "zh-CN": "地下城主"
  },
  "lobby.coDm": {
    "en": "co-DM",
    "zh-CN": "协助地下城主"
  },
  "lobby.partyLead": {
    "en": "party lead",
    "zh-CN": "队长"
  },
  "lobby.owner": {
    "en": "owner",
    "zh-CN": "拥有者"
  },
  "lobby.noCharacter": {
    "en": "No character yet",
    "zh-CN": "尚未创建角色"
  },
  "lobby.mutedTip": {
    "en": "Muted by the party lead",
    "zh-CN": "已被队长禁言"
  },
  "lobby.muted": {
    "en": "muted",
    "zh-CN": "已禁言"
  },
  "lobby.realDiceTip": {
    "en": "Rolls physical dice: the DM waits for this player to enter real rolls",
    "zh-CN": "使用实体骰子：地下城主会等待这名玩家输入投骰结果"
  },
  "lobby.realDiceBadge": {
    "en": "real dice",
    "zh-CN": "实体骰子"
  },
  "lobby.readyBadge": {
    "en": "ready",
    "zh-CN": "已准备"
  },
  "lobby.notReadyBadge": {
    "en": "not ready",
    "zh-CN": "未准备"
  },
  "lobby.makeLeadTip": {
    "en": "Hand the party lead to this player",
    "zh-CN": "将队长身份交给这名玩家"
  },
  "lobby.makeLead": {
    "en": "make lead",
    "zh-CN": "设为队长"
  },
  "lobby.makeDmTip": {
    "en": "Hand this player the DM seat and the game",
    "zh-CN": "将地下城主身份和游戏主持权交给这名玩家"
  },
  "lobby.makeDm": {
    "en": "make DM",
    "zh-CN": "设为地下城主"
  },
  "lobby.removeCoDmTip": {
    "en": "Take back the co-DM seat",
    "zh-CN": "收回协助地下城主身份"
  },
  "lobby.removeCoDm": {
    "en": "remove co-DM",
    "zh-CN": "移除协助地下城主"
  },
  "lobby.makeCoDmTip": {
    "en": "Seat this player as co-DM: every DM power except handing out seats",
    "zh-CN": "设为协助地下城主：拥有地下城主权限，但无法分配主持身份"
  },
  "lobby.makeCoDm": {
    "en": "make co-DM",
    "zh-CN": "设为协助地下城主"
  },
  "lobby.unmuteTip": {
    "en": "Let this player speak at the table again",
    "zh-CN": "允许这名玩家重新发言"
  },
  "lobby.muteTip": {
    "en": "Mute: this player reads along but cannot act, ask or side-chat",
    "zh-CN": "禁言后，这名玩家仍可阅读记录，但无法行动、提问或私聊"
  },
  "lobby.unmute": {
    "en": "unmute",
    "zh-CN": "解除禁言"
  },
  "lobby.mute": {
    "en": "mute",
    "zh-CN": "禁言"
  },
  "lobby.openSeat": {
    "en": "{count} open seat. Share the room code to fill it.",
    "zh-CN": "还可加入 {count} 名玩家。分享房间码，邀请好友加入。"
  },
  "lobby.openSeats": {
    "en": "{count} open seats. Share the room code to fill them.",
    "zh-CN": "还可加入 {count} 名玩家。分享房间码，邀请好友加入。"
  },
  "lobby.companions": {
    "en": "Companions",
    "zh-CN": "同伴"
  },
  "lobby.removeCompanionTip": {
    "en": "Remove this companion",
    "zh-CN": "移除此同伴"
  },
  "lobby.removeNamed": {
    "en": "Remove {name}",
    "zh-CN": "移除 {name}"
  },
  "lobby.addCompanion": {
    "en": "Add a companion",
    "zh-CN": "添加同伴"
  },
  "lobby.companionsFull": {
    "en": "The party has its full number of companions.",
    "zh-CN": "队伍的同伴人数已达上限。"
  },
  "lobby.characterSummary": {
    "en": "{race} {class} {level}",
    "zh-CN": "{race} · {class} · {level} 级"
  },
  "lobby.rulesLore": {
    "en": "Rules and lore",
    "zh-CN": "规则与背景资料"
  },
  "lobby.bringPrep": {
    "en": "Bring in prep",
    "zh-CN": "导入准备资料"
  },
  "lobby.tableSettings": {
    "en": "Table settings",
    "zh-CN": "本桌设置"
  },
  "lobby.transcribed": {
    "en": "This table is transcribed: while voice is on, what each person says is written down with their name for the story log. Turn it off in campaign settings.",
    "zh-CN": "本桌已开启语音转写：语音开启时，每个人的发言会连同姓名写入故事记录。可在战役设置中关闭。"
  },
  "lobby.removeCharacterConfirm": {
    "en": "Remove {name} from this campaign? You can create or pick another afterwards.",
    "zh-CN": "要从此战役移除 {name} 吗？之后可以创建或选择其他角色。"
  },
  "lobby.yourCharacter": {
    "en": "your character",
    "zh-CN": "你的角色"
  },
  "lobby.deleteConfirm": {
    "en": "Delete \"{title}\" for everyone? All characters, messages, and story progress are lost. This cannot be undone.",
    "zh-CN": "要为所有人删除“{title}”吗？全部角色、消息和故事进度都将丢失。此操作无法撤销。"
  },
  "lobby.readyError": {
    "en": "Could not change your ready state.",
    "zh-CN": "未能更改准备状态，请重试。"
  },
  "lobby.startError": {
    "en": "Could not start the adventure.",
    "zh-CN": "未能开始冒险，请检查准备状态后重试。"
  },
  "lobby.startCampaignError": {
    "en": "Could not start the campaign.",
    "zh-CN": "未能开始战役，请检查准备状态后重试。"
  },
  "lobby.seatError": {
    "en": "Could not move that seat.",
    "zh-CN": "未能更改主持身份，请检查权限后重试。"
  },
  "lobby.removeCharacterError": {
    "en": "Could not remove the character.",
    "zh-CN": "未能移除角色，请重试。"
  },
  "lobby.removeCompanionError": {
    "en": "Could not remove the companion.",
    "zh-CN": "未能移除同伴，请重试。"
  },
  "lobby.deleteError": {
    "en": "Could not delete the campaign.",
    "zh-CN": "未能删除战役，请重试。"
  },
  "lobby.networkError": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器，请检查连接后重试。"
  },
  "lobby.leadError": {
    "en": "Could not change the party lead.",
    "zh-CN": "未能更改队长，请重试。"
  },
  "lobby.muteError": {
    "en": "Could not change that player’s speaking permissions.",
    "zh-CN": "未能更改这名玩家的发言权限，请重试。"
  },
  "lobby.diceError": {
    "en": "Could not change your dice preference.",
    "zh-CN": "未能更改骰子偏好，请重试。"
  },
  "lobby.blocker.empty": {
    "en": "The table is empty.",
    "zh-CN": "本桌尚无人加入。"
  },
  "lobby.blocker.no_player": {
    "en": "Waiting for a player to join.",
    "zh-CN": "正在等待玩家加入。"
  },
  "lobby.blocker.no_character": {
    "en": "Every player needs a character before the adventure starts.",
    "zh-CN": "开始冒险前，每名玩家都需要创建角色。"
  },
  "lobby.blocker.not_ready": {
    "en": "Waiting for everyone to ready up.",
    "zh-CN": "正在等待所有人准备就绪。"
  },
  "lobby.pregen": {
    "en": "Or take a ready-made hero",
    "zh-CN": "或选择一个预设英雄"
  },
  "lobby.pregenError": {
    "en": "Could not seat that hero.",
    "zh-CN": "未能选择此英雄，请重试。"
  },
  "invite.roomCode": {
    "en": "Room code",
    "zh-CN": "房间码"
  },
  "invite.scan": {
    "en": "Scan to join",
    "zh-CN": "扫码加入"
  },
  "invite.copied": {
    "en": "Copied",
    "zh-CN": "已复制"
  },
  "invite.code": {
    "en": "Code",
    "zh-CN": "房间码"
  },
  "invite.link": {
    "en": "Link",
    "zh-CN": "链接"
  },
  "invite.share": {
    "en": "Share",
    "zh-CN": "分享"
  },
  "invite.codeCopied": {
    "en": "Room code copied.",
    "zh-CN": "已复制房间码。"
  },
  "invite.linkCopied": {
    "en": "Invite link copied.",
    "zh-CN": "已复制邀请链接。"
  },
  "invite.qrAlt": {
    "en": "QR code for invite link {url}",
    "zh-CN": "邀请链接的二维码：{url}"
  },
  "invite.qrDrawing": {
    "en": "Drawing the QR code",
    "zh-CN": "正在生成二维码"
  },
  "invite.codeSpelled": {
    "en": "Room code {code}",
    "zh-CN": "房间码 {code}"
  },
  "invite.codeHeld": {
    "en": "Another device holds this room code",
    "zh-CN": "此房间码已被另一台设备占用"
  },
  "invite.wrongTable": {
    "en": "A friend who types it will not find this table.",
    "zh-CN": "好友输入此房间码，将无法找到本桌。"
  },
  "invite.newCodeHint": {
    "en": "Make a new code and share that one.",
    "zh-CN": "请生成新房间码，并分享新码。"
  },
  "invite.askLead": {
    "en": "Ask the table's lead for a new code.",
    "zh-CN": "请向队长索取新房间码。"
  },
  "invite.getNewCode": {
    "en": "Get a new code",
    "zh-CN": "生成新房间码"
  },
  "invite.copyError": {
    "en": "Copying failed. Select the text and copy it by hand.",
    "zh-CN": "复制失败。请选中文字后手动复制。"
  },
  "invite.myCampaign": {
    "en": "my campaign",
    "zh-CN": "我的战役"
  },
  "invite.joinTitle": {
    "en": "Join {title}",
    "zh-CN": "加入 {title}"
  },
  "invite.joinText": {
    "en": "Join {title} on Open Dungeon Master",
    "zh-CN": "在 Open Dungeon Master 加入 {title}"
  },
  "invite.rotateConfirm": {
    "en": "Generate a new invite code? Every link and QR shared so far stops working.",
    "zh-CN": "要生成新邀请码吗？之前分享的全部链接和二维码都将失效。"
  },
  "invite.rotateError": {
    "en": "Could not regenerate the invite code.",
    "zh-CN": "未能生成新邀请码，请重试。"
  },
  "invite.title": {
    "en": "Invite players",
    "zh-CN": "邀请玩家"
  },
  "invite.whileSharing": {
    "en": "While you are sharing, a friend can type this code into the app and land here.",
    "zh-CN": "分享开启期间，好友可在应用中输入此房间码，加入本桌。"
  },
  "invite.copyLink": {
    "en": "Copy link",
    "zh-CN": "复制链接"
  },
  "invite.copyCode": {
    "en": "Copy code",
    "zh-CN": "复制房间码"
  },
  "invite.rotateTip": {
    "en": "Invalidate every shared link and QR by rotating the code",
    "zh-CN": "更换房间码会使之前分享的全部链接和二维码失效"
  },
  "invite.rotate": {
    "en": "New code (kills old links)",
    "zh-CN": "生成新码（旧链接失效）"
  },
  "invite.starting": {
    "en": "Opening a public address so friends anywhere can join...",
    "zh-CN": "正在开启公开访问地址，让各地好友都能加入…"
  },
  "invite.online": {
    "en": "Shared online",
    "zh-CN": "已开启在线分享"
  },
  "invite.stop": {
    "en": "Stop sharing",
    "zh-CN": "停止分享"
  },
  "invite.runningHint": {
    "en": "Friends anywhere can join with the link below while the app runs.",
    "zh-CN": "应用运行期间，各地好友都可以通过下方链接加入。"
  },
  "invite.failed": {
    "en": "Sharing online failed",
    "zh-CN": "在线分享失败"
  },
  "invite.off": {
    "en": "Not shared online",
    "zh-CN": "尚未开启在线分享"
  },
  "invite.retry": {
    "en": "Try again",
    "zh-CN": "重试"
  },
  "invite.start": {
    "en": "Share online",
    "zh-CN": "在线分享"
  },
  "invite.lanOnly": {
    "en": "Only friends on your Wi-Fi can reach {url} until you share online.",
    "zh-CN": "开启在线分享前，只有同一 Wi-Fi 网络中的好友能访问 {url}。"
  },
  "invite.startHint": {
    "en": "Share online and friends anywhere can join with the link below.",
    "zh-CN": "开启在线分享后，各地好友都可以通过下方链接加入。"
  },
  "invite.failureHint": {
    "en": "Could not open a public address. Try sharing again.",
    "zh-CN": "未能开启公开访问地址，请重试。"
  },
  "editCampaign.title": {
    "en": "Edit campaign",
    "zh-CN": "编辑战役"
  },
  "editCampaign.story": {
    "en": "The story",
    "zh-CN": "故事"
  },
  "editCampaign.name": {
    "en": "Title",
    "zh-CN": "标题"
  },
  "editCampaign.premise": {
    "en": "Premise",
    "zh-CN": "冒险背景"
  },
  "editCampaign.notes": {
    "en": "World or theme notes",
    "zh-CN": "世界或主题备注"
  },
  "editCampaign.table": {
    "en": "The table",
    "zh-CN": "本桌"
  },
  "editCampaign.players": {
    "en": "Players",
    "zh-CN": "玩家人数"
  },
  "editCampaign.level": {
    "en": "Start level",
    "zh-CN": "起始等级"
  },
  "editCampaign.difficulty": {
    "en": "Difficulty",
    "zh-CN": "难度"
  },
  "editCampaign.cover": {
    "en": "Cover art",
    "zh-CN": "封面"
  },
  "editCampaign.upload": {
    "en": "Upload",
    "zh-CN": "上传"
  },
  "editCampaign.painting": {
    "en": "Painting",
    "zh-CN": "正在绘制"
  },
  "editCampaign.paint": {
    "en": "Paint one",
    "zh-CN": "生成封面"
  },
  "editCampaign.save": {
    "en": "Save changes",
    "zh-CN": "保存更改"
  },
  "editCampaign.paintFailed": {
    "en": "The cover did not paint. Try again, or upload one.",
    "zh-CN": "封面未能生成。请重试，或上传图片。"
  },
  "editCampaign.coverError": {
    "en": "Could not change the cover.",
    "zh-CN": "未能更改封面，请重试。"
  },
  "editCampaign.uploadError": {
    "en": "That image would not upload.",
    "zh-CN": "未能上传图片，请检查文件后重试。"
  },
  "editCampaign.saveError": {
    "en": "Could not save the campaign settings.",
    "zh-CN": "未能保存战役设置，请重试。"
  }
});
