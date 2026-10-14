import { defineMessages } from "./catalog.ts";

export const ACCOUNT_MESSAGES = /*#__PURE__*/ defineMessages({
  "account.version": { "en": "v{version}", "zh-CN": "v{version}" },
  "account.settingsTitle": {
    "en": "Account settings",
    "zh-CN": "账户设置"
  },
  "account.signedIn": {
    "en": "Signed in as {name}",
    "zh-CN": "当前登录为 {name}"
  },
  "account.profilePicture": {
    "en": "Profile picture",
    "zh-CN": "个人头像"
  },
  "account.avatar": {
    "en": "Your avatar",
    "zh-CN": "你的头像"
  },
  "account.changePicture": {
    "en": "Change picture",
    "zh-CN": "更换头像"
  },
  "account.addPicture": {
    "en": "Add picture",
    "zh-CN": "添加头像"
  },
  "account.remove": {
    "en": "Remove",
    "zh-CN": "移除"
  },
  "account.avatarHint": {
    "en": "Shown next to your name in lobbies and at the table. Character portraits are set on each character.",
    "zh-CN": "显示在大厅和游戏桌上的用户名旁。角色立绘请在各自的角色页面设置。"
  },
  "account.dice": {
    "en": "Your dice",
    "zh-CN": "你的骰子"
  },
  "account.diceHint": {
    "en": "The virtual dice that tumble across every table you sit at. Pick a set to start from, then change the colours, pattern and finish; the preview rolls as you go.",
    "zh-CN": "自定义你在各个游戏桌使用的虚拟骰子。先选一套预设，再调整颜色、图案和材质；预览会随调整重新掷骰。"
  },
  "account.setPasswordTitle": {
    "en": "Set a password",
    "zh-CN": "设置密码"
  },
  "account.passwordTitle": {
    "en": "Password",
    "zh-CN": "密码"
  },
  "account.discordPasswordHint": {
    "en": "You sign in with Discord. Set a password to also log in with your username, for example in the desktop and mobile apps.",
    "zh-CN": "你目前使用 Discord 登录。设置密码后，也能用用户名登录，例如在桌面或移动应用中。"
  },
  "account.setPassword": {
    "en": "Set password",
    "zh-CN": "设置密码"
  },
  "account.passwordSaved": {
    "en": "Password saved. Other devices were signed out.",
    "zh-CN": "密码已保存，其他设备已退出登录。"
  },
  "account.discordLinked": {
    "en": "Linked. You can sign in with Discord.",
    "zh-CN": "已关联，可以使用 Discord 登录。"
  },
  "account.linkDiscord": {
    "en": "Link Discord account",
    "zh-CN": "关联 Discord 账户"
  },
  "account.discordSuccess": {
    "en": "Discord account linked.",
    "zh-CN": "Discord 账户已关联。"
  },
  "account.discordTaken": {
    "en": "That Discord account is already linked to another user.",
    "zh-CN": "此 Discord 账户已关联其他用户。"
  },
  "account.deletionTitle": {
    "en": "Deletion scheduled",
    "zh-CN": "已安排注销"
  },
  "account.pending": {
    "en": "Pending",
    "zh-CN": "待执行"
  },
  "account.deletionHint": {
    "en": "This account will be permanently deleted on {date}. Until then everything still works, and you can call it off.",
    "zh-CN": "此账户将于 {date} 永久删除。在此之前仍可正常使用，也可以取消注销。"
  },
  "account.keep": {
    "en": "Keep my account",
    "zh-CN": "保留我的账户"
  },
  "account.delete": {
    "en": "Delete account",
    "zh-CN": "注销账户"
  },
  "account.irreversible": {
    "en": "Irreversible",
    "zh-CN": "不可恢复"
  },
  "account.graceImmediate": {
    "en": "Your account, the campaigns you created, your characters and your pictures are erased immediately.",
    "zh-CN": "你的账户、创建的战役、角色和图片会立即删除。"
  },
  "account.graceOne": {
    "en": "Your account is signed out everywhere and erased after {days} day, together with the campaigns you created, your characters and your pictures. Signing in before then lets you keep it.",
    "zh-CN": "你的账户会在所有设备退出登录，并于 {days} 天后连同创建的战役、角色和图片一起删除。在此之前重新登录，即可选择保留账户。"
  },
  "account.graceMany": {
    "en": "Your account is signed out everywhere and erased after {days} days, together with the campaigns you created, your characters and your pictures. Signing in before then lets you keep it.",
    "zh-CN": "你的账户会在所有设备退出登录，并于 {days} 天后连同创建的战役、角色和图片一起删除。在此之前重新登录，即可选择保留账户。"
  },
  "account.purged": {
    "en": "Your account and everything it owned have been deleted.",
    "zh-CN": "你的账户及其拥有的数据已删除。"
  },
  "account.scheduledFarewell": {
    "en": "Your account is scheduled for deletion on {date}. You have been signed out everywhere. To keep it, sign in again before then and choose \"Keep my account\".",
    "zh-CN": "你的账户将于 {date} 删除，所有设备已退出登录。如需保留，请在此之前重新登录并选择“保留我的账户”。"
  },
  "account.frontDoor": {
    "en": "Back to the front door",
    "zh-CN": "返回首页"
  },
  "account.login": {
    "en": "Log in",
    "zh-CN": "登录"
  },
  "account.loginHint": {
    "en": "to manage your account.",
    "zh-CN": "后即可管理账户。"
  },
  "account.about": {
    "en": "About",
    "zh-CN": "关于"
  },
  "account.rulesReference": {
    "en": "Rules reference",
    "zh-CN": "规则速查"
  },
  "account.terms": {
    "en": "Terms of service",
    "zh-CN": "服务条款"
  },
  "account.privacy": {
    "en": "Privacy policy",
    "zh-CN": "隐私政策"
  },
  "account.licenses": {
    "en": "Licenses and attribution",
    "zh-CN": "许可证与来源声明"
  },
  "account.profileLoadError": {
    "en": "Could not load your account.",
    "zh-CN": "无法读取你的账户，请重试。"
  },
  "account.serverInfoError": {
    "en": "Could not read the server’s account policy. Retry before deleting your account.",
    "zh-CN": "无法读取服务器的账户策略。请先重试，再进行注销操作。"
  },
  "account.loadingPolicy": {
    "en": "Reading server account policy…",
    "zh-CN": "正在读取服务器的账户策略…"
  },
  "account.avatarSaveError": {
    "en": "Could not save your profile picture.",
    "zh-CN": "无法保存个人头像，请重试。"
  },
  "account.deleteError": {
    "en": "Could not delete your account.",
    "zh-CN": "无法注销你的账户，请重试。"
  },
  "account.keepError": {
    "en": "Could not keep your account.",
    "zh-CN": "无法取消注销，请重试。"
  },
  "account.deleteWrongPassword": {
    "en": "Password is wrong.",
    "zh-CN": "密码不正确。"
  },
  "account.deletePasswordRequired": {
    "en": "Password is required.",
    "zh-CN": "请填写密码。"
  },
  "account.invalidDate": {
    "en": "Unknown date",
    "zh-CN": "日期未知"
  },
  "deleteAccount.title": {
    "en": "Delete your account?",
    "zh-CN": "确认注销账户？"
  },
  "deleteAccount.transcripts": {
    "en": "Messages you wrote in other people’s campaigns stay in those transcripts without your name on them. Once the account is erased it cannot be brought back.",
    "zh-CN": "你在他人战役中发送的消息会保留在记录里，但不再显示你的姓名。账户删除后无法恢复。"
  },
  "deleteAccount.password": {
    "en": "Enter your password to confirm",
    "zh-CN": "输入密码以确认"
  },
  "deleteAccount.word": {
    "en": "Type DELETE to confirm",
    "zh-CN": "输入 DELETE 以确认"
  },
  "deleteAccount.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "deleteAccount.forever": {
    "en": "Delete forever",
    "zh-CN": "永久删除"
  },
  "deleteAccount.confirm": {
    "en": "Delete my account",
    "zh-CN": "注销我的账户"
  },
  "appearance.title": {
    "en": "Appearance",
    "zh-CN": "外观"
  },
  "appearance.hint": {
    "en": "Kept on this device. The board and its canvases draw at their own size whatever the scale.",
    "zh-CN": "保存在此设备上。无论界面缩放比例如何，游戏棋盘及画布均按自身尺寸绘制。"
  },
  "appearance.theme": {
    "en": "Theme",
    "zh-CN": "主题"
  },
  "appearance.auto": {
    "en": "Follow the system",
    "zh-CN": "跟随系统"
  },
  "appearance.dark": {
    "en": "Arcane night",
    "zh-CN": "奥术之夜"
  },
  "appearance.light": {
    "en": "Parchment day",
    "zh-CN": "羊皮纸之昼"
  },
  "appearance.scale": {
    "en": "Interface scale",
    "zh-CN": "界面缩放"
  },
  "appearance.reset": {
    "en": "Reset",
    "zh-CN": "重置"
  },
  "avatar.close": {
    "en": "Close",
    "zh-CN": "关闭"
  },
  "avatar.choose": {
    "en": "Choose an image",
    "zh-CN": "选择图片"
  },
  "avatar.different": {
    "en": "Different image",
    "zh-CN": "更换图片"
  },
  "avatar.zoom": {
    "en": "Zoom",
    "zh-CN": "缩放"
  },
  "avatar.cropArea": {
    "en": "Move the crop area with the arrow keys",
    "zh-CN": "使用方向键移动裁剪区域"
  },
  "avatar.image": {
    "en": "Image to crop",
    "zh-CN": "待裁剪的图片"
  },
  "avatar.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "avatar.save": {
    "en": "Save",
    "zh-CN": "保存"
  },
  "avatar.unsupported": {
    "en": "Only PNG, JPEG, and WebP images are supported.",
    "zh-CN": "仅支持 PNG、JPEG 和 WebP 图片。"
  },
  "avatar.tooLarge": {
    "en": "Image is larger than 8MB.",
    "zh-CN": "图片大小超过 8MB。"
  },
  "avatar.readError": {
    "en": "Could not read the image.",
    "zh-CN": "无法读取图片。"
  },
  "avatar.canvasError": {
    "en": "Canvas unavailable.",
    "zh-CN": "此浏览器无法创建图片画布。"
  },
  "avatar.processError": {
    "en": "Could not process the image.",
    "zh-CN": "无法处理图片，请重新选择后重试。"
  },
  "avatar.uploadError": {
    "en": "Upload failed.",
    "zh-CN": "图片上传失败，请重试。"
  },
  "blocks.title": {
    "en": "Blocked players",
    "zh-CN": "已屏蔽的玩家"
  },
  "blocks.hint": {
    "en": "Blocked players' table messages are hidden from you, and neither of you can open a private chat or send a friend request. Block someone from their message or from the party list.",
    "zh-CN": "你将看不到被屏蔽玩家的游戏桌消息，双方也无法私聊或发送好友请求。可从玩家消息或队伍列表中屏蔽对方。"
  },
  "blocks.loading": {
    "en": "Loading blocked players",
    "zh-CN": "正在读取屏蔽列表"
  },
  "blocks.empty": {
    "en": "Nobody blocked.",
    "zh-CN": "尚未屏蔽任何玩家。"
  },
  "blocks.unblock": {
    "en": "Unblock",
    "zh-CN": "取消屏蔽"
  },
  "blocks.loadError": {
    "en": "Could not load blocked players.",
    "zh-CN": "无法读取屏蔽列表，请重试。"
  },
  "blocks.writeError": {
    "en": "Could not unblock this player.",
    "zh-CN": "无法取消屏蔽此玩家，请重试。"
  },
  "agents.title": {
    "en": "Connected agents",
    "zh-CN": "已连接的智能体"
  },
  "agents.hint": {
    "en": "Let your own Claude Code, Codex or other MCP client act as you here: read your campaigns, play your character, or run a table where you are the Dungeon Master. It gets exactly the access your account has, only the parts you tick, and never your password or the server's settings.",
    "zh-CN": "让你的 Claude Code、Codex 或其他 MCP 客户端以你的身份读取战役、扮演角色，或在你担任地下城主的游戏桌主持游戏。它只获得你勾选的权限，并受账户本身的权限限制，无法取得你的密码或服务器设置。"
  },
  "agents.assistantHint": {
    "en": "ChatGPT, Claude, Grok and Meta Muse can too, through the link shown when you connect.",
    "zh-CN": "ChatGPT、Claude、Grok 和 Meta Muse 也可通过连接后显示的链接使用。"
  },
  "agents.ready": {
    "en": "{name} is ready. This is the only time its token is shown; copy the line for your agent now.",
    "zh-CN": "{name} 已就绪。令牌仅在此时显示，请立即复制智能体所需的配置。"
  },
  "agents.copied": {
    "en": "I have copied it",
    "zh-CN": "我已复制"
  },
  "agents.loading": {
    "en": "Loading connected agents",
    "zh-CN": "正在读取已连接的智能体"
  },
  "agents.empty": {
    "en": "No agents connected.",
    "zh-CN": "尚未连接智能体。"
  },
  "agents.scopeSeparator": { "en": ", ", "zh-CN": "、" },
  "agents.details": {
    "en": "{scopes}{campaign} · last used {lastUsed} · expires {expires}",
    "zh-CN": "{scopes}{campaign} · 最近使用：{lastUsed} · 到期：{expires}"
  },
  "agents.oneCampaign": {
    "en": "one campaign",
    "zh-CN": "单个战役"
  },
  "agents.never": {
    "en": "never",
    "zh-CN": "从未"
  },
  "agents.revoke": {
    "en": "Revoke",
    "zh-CN": "撤销授权"
  },
  "agents.name": {
    "en": "Name",
    "zh-CN": "名称"
  },
  "agents.namePlaceholder": {
    "en": "Claude Code on my laptop",
    "zh-CN": "我笔记本上的 Claude Code"
  },
  "agents.mayDo": {
    "en": "What it may do",
    "zh-CN": "允许执行的操作"
  },
  "agents.limit": {
    "en": "Limit to one campaign",
    "zh-CN": "仅限一个战役"
  },
  "agents.anyCampaign": {
    "en": "Any campaign I belong to",
    "zh-CN": "我参与的所有战役"
  },
  "agents.connect": {
    "en": "Connect",
    "zh-CN": "连接"
  },
  "agents.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "agents.connectAnAgent": {
    "en": "Connect an agent",
    "zh-CN": "连接智能体"
  },
  "agents.loadError": {
    "en": "Could not load connected agents.",
    "zh-CN": "无法读取已连接的智能体，请重试。"
  },
  "agents.campaignLoadError": {
    "en": "Could not load the campaign choices.",
    "zh-CN": "无法读取可选战役，请重试后再创建授权。"
  },
  "agents.createError": {
    "en": "Could not connect an agent.",
    "zh-CN": "无法连接智能体，请重试。"
  },
  "agents.revokeError": {
    "en": "Could not revoke this connection.",
    "zh-CN": "无法撤销此连接，请重试。"
  },
  "agents.program": {
    "en": "Your agent program",
    "zh-CN": "你的智能体程序"
  },
  "agents.program.claude": {
    "en": "Claude Code",
    "zh-CN": "Claude Code"
  },
  "agents.program.codex": {
    "en": "Codex",
    "zh-CN": "Codex"
  },
  "agents.program.opencode": {
    "en": "opencode",
    "zh-CN": "opencode"
  },
  "agents.program.other": {
    "en": "Other",
    "zh-CN": "其他"
  },
  "agents.setupLabel": {
    "en": "{program} setup",
    "zh-CN": "{program} 配置"
  },
  "agents.copyThis": {
    "en": "Copy this.",
    "zh-CN": "复制以下配置。"
  },
  "agents.ask": {
    "en": "Ask it something about this server, for example “list my Open Dungeon Master campaigns”.",
    "zh-CN": "请向智能体询问此服务器的信息，例如：“列出我的 Open Dungeon Master 战役”。"
  },
  "agents.firstToolTime": {
    "en": "Connected. Its first call ({tool}) arrived at {time}.",
    "zh-CN": "已连接。首次调用（{tool}）于 {time} 到达。"
  },
  "agents.firstTime": {
    "en": "Connected. Its first call arrived at {time}.",
    "zh-CN": "已连接。首次调用于 {time} 到达。"
  },
  "agents.firstTool": {
    "en": "Connected. Its first call ({tool}) arrived.",
    "zh-CN": "已连接。首次调用（{tool}）已到达。"
  },
  "agents.first": {
    "en": "Connected. Its first call arrived.",
    "zh-CN": "已连接，首次调用已到达。"
  },
  "agents.gaveUp": {
    "en": "No call yet. The connection stays ready; this page just stopped watching for it.",
    "zh-CN": "尚未收到调用。连接仍可使用，此页面只是停止了等待检查。"
  },
  "agents.waiting": {
    "en": "Waiting for its first call…",
    "zh-CN": "正在等待首次调用…"
  },
  "agents.watchError": {
    "en": "Could not check whether the agent has connected.",
    "zh-CN": "无法检查智能体是否已连接，请重试。"
  },
  "assistantLink.title": {
    "en": "ChatGPT, Claude, Grok or Meta Muse (add as a custom connector, no sign-in)",
    "zh-CN": "ChatGPT、Claude、Grok 或 Meta Muse（添加为自定义连接器，无需登录）"
  },
  "assistantLink.label": {
    "en": "assistant link",
    "zh-CN": "助手链接"
  },
  "assistantLink.hint": {
    "en": "It keeps working when this world is shared again at a new address, and answers whenever it is shared.",
    "zh-CN": "此世界再次通过新地址分享后，链接仍然有效，并在世界处于分享状态时提供响应。"
  },
  "copyLine.copy": {
    "en": "Copy {label}",
    "zh-CN": "复制{label}"
  },
  "copyLine.error": {
    "en": "Could not copy. Select the line and copy it manually.",
    "zh-CN": "无法自动复制，请选中这行内容后手动复制。"
  },
  "diceLook.previewError": {
    "en": "The 3D preview needs WebGL. Your choices still apply at the table.",
    "zh-CN": "3D 预览需要 WebGL。你的外观设置仍会应用于游戏桌。"
  },
  "diceLook.start": {
    "en": "Start from",
    "zh-CN": "选择预设"
  },
  "diceLook.presetAria": {
    "en": "{name} dice",
    "zh-CN": "{name}骰子"
  },
  "diceLook.face": {
    "en": "Die colour",
    "zh-CN": "骰面颜色"
  },
  "diceLook.numbers": {
    "en": "Number colour",
    "zh-CN": "数字颜色"
  },
  "diceLook.outline": {
    "en": "Number outline",
    "zh-CN": "数字描边"
  },
  "diceLook.outlineColor": {
    "en": "Outline colour",
    "zh-CN": "描边颜色"
  },
  "diceLook.outlineNumbers": {
    "en": "Outline the numbers",
    "zh-CN": "为数字添加描边"
  },
  "diceLook.pattern": {
    "en": "Pattern",
    "zh-CN": "图案"
  },
  "diceLook.finish": {
    "en": "Finish",
    "zh-CN": "材质"
  },
  "diceLook.accountHint": {
    "en": "Your dice follow your account: every table and every device shows them.",
    "zh-CN": "骰子外观会同步到账户，在各个游戏桌和设备上使用。"
  },
  "diceLook.reset": {
    "en": "Reset",
    "zh-CN": "重置"
  },
  "diceLook.chooseHint": {
    "en": "Choose the colours, pattern and finish of your virtual dice.",
    "zh-CN": "选择虚拟骰子的颜色、图案和材质。"
  },
  "diceLook.customize": {
    "en": "Customise my dice",
    "zh-CN": "自定义我的骰子"
  },
  "diceLook.syncError": {
    "en": "Your dice are saved on this device, but could not be synced to your account.",
    "zh-CN": "骰子外观已保存在此设备，但未能同步到账户。"
  },
  "diceLook.loadError": {
    "en": "Could not read your account’s dice. The local look is still available.",
    "zh-CN": "无法读取账户中的骰子外观，仍可使用本地设置。"
  },
  "diceLook.syncing": {
    "en": "Syncing dice…",
    "zh-CN": "正在同步骰子外观…"
  },
  "diceLook.retry": {
    "en": "Retry sync",
    "zh-CN": "重新同步"
  },
  "diceLook.preset.radiant": {
    "en": "Radiant",
    "zh-CN": "光辉"
  },
  "diceLook.preset.fire": {
    "en": "Fire",
    "zh-CN": "火焰"
  },
  "diceLook.preset.ice": {
    "en": "Ice",
    "zh-CN": "寒冰"
  },
  "diceLook.preset.poison": {
    "en": "Poison",
    "zh-CN": "毒雾"
  },
  "diceLook.preset.acid": {
    "en": "Acid",
    "zh-CN": "强酸"
  },
  "diceLook.preset.thunder": {
    "en": "Thunder",
    "zh-CN": "雷鸣"
  },
  "diceLook.preset.air": {
    "en": "Air",
    "zh-CN": "风"
  },
  "diceLook.preset.water": {
    "en": "Water",
    "zh-CN": "水"
  },
  "diceLook.preset.earth": {
    "en": "Earth",
    "zh-CN": "大地"
  },
  "diceLook.preset.force": {
    "en": "Force",
    "zh-CN": "力场"
  },
  "diceLook.preset.necrotic": {
    "en": "Necrotic",
    "zh-CN": "黯蚀"
  },
  "diceLook.preset.bloodmoon": {
    "en": "Blood moon",
    "zh-CN": "血月"
  },
  "diceLook.preset.starrynight": {
    "en": "Starry night",
    "zh-CN": "星夜"
  },
  "diceLook.preset.glitterparty": {
    "en": "Glitter party",
    "zh-CN": "闪耀派对"
  },
  "diceLook.preset.astralsea": {
    "en": "Astral sea",
    "zh-CN": "星界之海"
  },
  "diceLook.preset.dragon": {
    "en": "Dragon",
    "zh-CN": "巨龙"
  },
  "diceLook.preset.bronze": {
    "en": "Bronze",
    "zh-CN": "青铜"
  },
  "diceLook.preset.onyx": {
    "en": "Onyx",
    "zh-CN": "黑玛瑙"
  },
  "diceLook.preset.ivory": {
    "en": "Ivory",
    "zh-CN": "象牙"
  },
  "diceLook.texture.none": {
    "en": "Plain",
    "zh-CN": "纯色"
  },
  "diceLook.texture.paper": {
    "en": "Paper",
    "zh-CN": "纸"
  },
  "diceLook.texture.marble": {
    "en": "Marble",
    "zh-CN": "大理石"
  },
  "diceLook.texture.cloudy": {
    "en": "Clouds",
    "zh-CN": "云纹"
  },
  "diceLook.texture.speckles": {
    "en": "Speckles",
    "zh-CN": "斑点"
  },
  "diceLook.texture.glitter": {
    "en": "Glitter",
    "zh-CN": "闪光"
  },
  "diceLook.texture.stars": {
    "en": "Stars",
    "zh-CN": "星星"
  },
  "diceLook.texture.stainedglass": {
    "en": "Stained glass",
    "zh-CN": "彩绘玻璃"
  },
  "diceLook.texture.wood": {
    "en": "Wood grain",
    "zh-CN": "木纹"
  },
  "diceLook.texture.metal": {
    "en": "Brushed metal",
    "zh-CN": "拉丝金属"
  },
  "diceLook.texture.fire": {
    "en": "Fire",
    "zh-CN": "火焰"
  },
  "diceLook.texture.ice": {
    "en": "Ice",
    "zh-CN": "寒冰"
  },
  "diceLook.texture.water": {
    "en": "Water",
    "zh-CN": "水"
  },
  "diceLook.texture.astral": {
    "en": "Astral",
    "zh-CN": "星界"
  },
  "diceLook.texture.skulls": {
    "en": "Skulls",
    "zh-CN": "骷髅"
  },
  "diceLook.texture.dragon": {
    "en": "Dragon scale",
    "zh-CN": "龙鳞"
  },
  "diceLook.texture.leopard": {
    "en": "Leopard",
    "zh-CN": "豹纹"
  },
  "diceLook.material.plastic": {
    "en": "Plastic",
    "zh-CN": "塑料"
  },
  "diceLook.material.glass": {
    "en": "Glass",
    "zh-CN": "玻璃"
  },
  "diceLook.material.metal": {
    "en": "Metal",
    "zh-CN": "金属"
  },
  "diceLook.material.wood": {
    "en": "Wood",
    "zh-CN": "木质"
  },
  "diceLook.material.none": {
    "en": "Matte",
    "zh-CN": "哑光"
  },
  "agents.scope.read.label": {
    "en": "Read",
    "zh-CN": "读取"
  },
  "agents.scope.read.hint": {
    "en": "Your campaigns, characters, quests and lore, as you see them.",
    "zh-CN": "读取你能看到的战役、角色、任务和背景资料。"
  },
  "agents.scope.play.label": {
    "en": "Play",
    "zh-CN": "游玩"
  },
  "agents.scope.play.hint": {
    "en": "Act, speak and roll at a table as your character.",
    "zh-CN": "以你的角色在游戏桌行动、发言和掷骰。"
  },
  "agents.scope.characters.label": {
    "en": "Characters",
    "zh-CN": "角色"
  },
  "agents.scope.characters.hint": {
    "en": "Create, edit and delete your library characters.",
    "zh-CN": "创建、编辑和删除角色库中的角色。"
  },
  "agents.scope.campaigns.label": {
    "en": "Campaigns",
    "zh-CN": "战役"
  },
  "agents.scope.campaigns.hint": {
    "en": "Create campaigns and change the ones you lead.",
    "zh-CN": "创建战役，并修改你主持的战役。"
  },
  "agents.scope.dm.label": {
    "en": "Dungeon Master",
    "zh-CN": "地下城主"
  },
  "agents.scope.dm.hint": {
    "en": "Run the rules engine and narrate, only where you hold the DM seat.",
    "zh-CN": "仅在你担任地下城主的战役中运行规则引擎和进行叙事。"
  },
  "agents.setup.claude": {
    "en": "Run it once in a terminal on the computer where Claude Code is installed.",
    "zh-CN": "在安装了 Claude Code 的电脑上，通过终端运行一次。"
  },
  "agents.setup.codex": {
    "en": "Add it to ~/.codex/config.toml (create the file if it is not there), then start Codex again.",
    "zh-CN": "添加到 ~/.codex/config.toml（文件不存在则新建），然后重新启动 Codex。"
  },
  "agents.setup.opencode": {
    "en": "For opencode 2, add it inside opencode.json (in the project, or ~/.config/opencode/opencode.json), then start opencode again.",
    "zh-CN": "opencode 2：添加到项目中的 opencode.json 或 ~/.config/opencode/opencode.json，然后重新启动 opencode。"
  },
  "agents.setup.other": {
    "en": "Any MCP client that speaks streamable HTTP: give it this address and this header.",
    "zh-CN": "将此地址和请求头提供给支持流式 HTTP 的 MCP 客户端。"
  }
});
