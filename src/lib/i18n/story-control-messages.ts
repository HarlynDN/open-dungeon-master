import { defineMessages } from "./catalog.ts";

// Owned roster/model-control copy; names, settings values and secrets stay raw.
export const STORY_CONTROL_MESSAGES = /*#__PURE__*/ defineMessages({
  "storyControl.npcLiteral.0": {
    "en": " Loading...",
    "zh-CN": " 正在加载……"
  },
  "storyControl.npcLiteral.1": {
    "en": "The DM rarely spells a name the same way twice over fifty turns. Close matches are flagged here rather than merged for you, because two similar names are often two people. Merging keeps the old spelling as an alias, so nothing already written stops resolving.",
    "zh-CN": "DM 在多轮叙述中可能对同一个名字使用不同写法。这里会标出相近的名字，供你核对，不会自动合并，因为两个相似的名字也可能属于不同人物。合并时，旧写法会保留为别名，已有记录仍能找到对应人物。"
  },
  "storyControl.npcLiteral.2": {
    "en": "Possible duplicates",
    "zh-CN": "可能重复的人物"
  },
  "storyControl.npcLiteral.3": {
    "en": " and ",
    "zh-CN": " 与 "
  },
  "storyControl.npcLiteral.4": {
    "en": "Keep one and fold the other into it, or dismiss if they are two people.",
    "zh-CN": "保留一位，将另一位合并到它；若是不同人物，则忽略此建议。"
  },
  "storyControl.npcLiteral.5": {
    "en": " Different people",
    "zh-CN": " 是不同人物"
  },
  "storyControl.npcLiteral.6": {
    "en": "No close matches to review. New ones appear here as the DM names people.",
    "zh-CN": "目前没有相近名字需要核对。DM 提及新人物时，新的建议会显示在这里。"
  },
  "storyControl.npcLiteral.7": {
    "en": "Everyone the campaign is tracking",
    "zh-CN": "战役记录中的所有人物"
  },
  "storyControl.npcLiteral.8": {
    "en": "Nobody yet.",
    "zh-CN": "暂无人物。"
  },
  "storyControl.npcLiteral.9": {
    "en": " Save",
    "zh-CN": " 保存"
  },
  "storyControl.npcLiteral.10": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "storyControl.npcLiteral.11": {
    "en": "(archived)",
    "zh-CN": "（已归档）"
  },
  "storyControl.npcLiteral.12": {
    "en": "Rename",
    "zh-CN": "重命名"
  },
  "storyControl.aiLiteral.0": {
    "en": "Story AI",
    "zh-CN": "故事 AI"
  },
  "storyControl.aiLiteral.1": {
    "en": "Storyteller: ",
    "zh-CN": "主持模型："
  },
  "storyControl.aiLiteral.2": {
    "en": "Utility model: ",
    "zh-CN": "辅助模型："
  },
  "storyControl.aiLiteral.3": {
    "en": "Images: ",
    "zh-CN": "图像："
  },
  "storyControl.aiLiteral.4": {
    "en": "Passage length: ",
    "zh-CN": "旁白长度："
  },
  "storyControl.aiLiteral.5": {
    "en": "Storyteller",
    "zh-CN": "主持模型"
  },
  "storyControl.aiLiteral.6": {
    "en": "Utility",
    "zh-CN": "辅助模型"
  },
  "storyControl.aiLiteral.7": {
    "en": "Story AI is chosen once for this device, and every campaign here follows it.",
    "zh-CN": "此设备统一选择故事 AI，这里的所有战役都会沿用该配置。"
  },
  "storyControl.aiLiteral.8": {
    "en": "App home",
    "zh-CN": "应用首页"
  },
  "storyControl.aiLiteral.9": {
    "en": "Narrated by an agent program on this server's own sign-in, turn by turn, under the same rules and caps as the built-in storyteller. It has none of its own tools.",
    "zh-CN": "由服务器上已登录的智能体逐轮主持，遵循内置主持模型相同的规则和限制，不使用智能体自带的工具。"
  },
  "storyControl.aiLiteral.10": {
    "en": "Model",
    "zh-CN": "模型"
  },
  "storyControl.aiLiteral.11": {
    "en": "Runs on this server's backend. Only an admin can change where it points.",
    "zh-CN": "使用此服务器配置的后端，只有管理员可以更改服务地址。"
  },
  "storyControl.aiLiteral.12": {
    "en": "Base URL",
    "zh-CN": "服务地址"
  },
  "storyControl.aiLiteral.13": {
    "en": "http://127.0.0.1:8080/v1",
    "zh-CN": "http://127.0.0.1:8080/v1"
  },
  "storyControl.aiLiteral.14": {
    "en": "API key",
    "zh-CN": "API 密钥"
  },
  "storyControl.aiLiteral.15": {
    "en": "Clear",
    "zh-CN": "清除"
  },
  "storyControl.aiLiteral.16": {
    "en": "Blank fields fall back to the server's settings.",
    "zh-CN": "留空的字段会沿用服务器设置。"
  },
  "storyControl.aiLiteral.17": {
    "en": "Utility model provider",
    "zh-CN": "辅助模型提供方"
  },
  "storyControl.aiLiteral.18": {
    "en": "Model (blank keeps everything on the storyteller)",
    "zh-CN": "模型（留空则全部交给主持模型）"
  },
  "storyControl.aiLiteral.19": {
    "en": "Utility URL",
    "zh-CN": "辅助模型地址"
  },
  "storyControl.aiLiteral.20": {
    "en": "Images",
    "zh-CN": "图像"
  },
  "storyControl.aiLiteral.21": {
    "en": "Off",
    "zh-CN": "关闭"
  },
  "storyControl.aiLiteral.22": {
    "en": "Square",
    "zh-CN": "方形"
  },
  "storyControl.aiLiteral.23": {
    "en": "Portrait",
    "zh-CN": "竖向"
  },
  "storyControl.aiLiteral.24": {
    "en": "Landscape",
    "zh-CN": "横向"
  },
  "storyControl.aiLiteral.25": {
    "en": "Picture shape",
    "zh-CN": "图像形状"
  },
  "storyControl.aiLiteral.26": {
    "en": "Fast",
    "zh-CN": "快速"
  },
  "storyControl.aiLiteral.27": {
    "en": "Slow (higher quality)",
    "zh-CN": "较慢（画质更高）"
  },
  "storyControl.aiLiteral.28": {
    "en": "Picture speed",
    "zh-CN": "图像生成速度"
  },
  "storyControl.aiLiteral.29": {
    "en": "Auto scenes",
    "zh-CN": "自动生成场景图"
  },
  "storyControl.aiLiteral.30": {
    "en": "The server has no image backend configured; these settings will not take effect until it does.",
    "zh-CN": "服务器尚未配置图像后端，配置后这些设置才会生效。"
  },
  "storyControl.aiLiteral.31": {
    "en": "Passages",
    "zh-CN": "旁白长度"
  },
  "storyControl.aiLiteral.32": {
    "en": "How long each narrated passage runs.",
    "zh-CN": "每段旁白的篇幅。"
  },
  "storyControl.npc.keep": {
    "en": " Keep “{name}”",
    "zh-CN": " 保留“{name}”"
  },
  "storyControl.npc.rename": {
    "en": "Rename {name}",
    "zh-CN": "重命名{name}"
  },
  "storyControl.npc.aliases": {
    "en": "also called {aliases}",
    "zh-CN": "别名：{aliases}"
  },
  "storyControl.retry": {
    "en": "Try again",
    "zh-CN": "重试"
  },
  "storyControl.agentName": {
    "en": "The server's {label}{model}",
    "zh-CN": "服务器的 {label}{model}"
  },
  "storyControl.customFallback": {
    "en": "custom backend",
    "zh-CN": "自定义后端"
  },
  "storyControl.automatic": {
    "en": ", automatic",
    "zh-CN": "，自动生成"
  },
  "storyControl.off": {
    "en": "off",
    "zh-CN": "关闭"
  },
  "storyControl.localModel": {
    "en": "local model",
    "zh-CN": "本地模型"
  },
  "storyControl.deviceHome": {
    "en": "Change it from Story AI on the app's home screen.",
    "zh-CN": "可在应用首页的“故事 AI”中更改。"
  },
  "storyControl.deviceHost": {
    "en": "Change it in the app that hosts this world.",
    "zh-CN": "请在承载此世界的应用中更改。"
  },
  "storyControl.keySet": {
    "en": "•••••••• (set)",
    "zh-CN": "••••••••（已设置）"
  },
  "storyControl.keyUnset": {
    "en": "Not set",
    "zh-CN": "未设置"
  },
  "storyControl.keyOptional": {
    "en": "API key (optional)",
    "zh-CN": "API 密钥（可选）"
  },
  "storyControl.deviceKey": {
    "en": "No OpenAI API key is saved on this device. Add one from Story AI on the app's home screen and it covers narration and pictures in every campaign.",
    "zh-CN": "此设备尚未保存 OpenAI API 密钥。可在应用首页的“故事 AI”中添加，供各战役的旁白和图像生成共用。"
  },
  "storyControl.serverKey": {
    "en": "The OpenAI picture backend has no API key. An admin adds one in Admin > Image generation.",
    "zh-CN": "OpenAI 图像后端尚未设置 API 密钥，请管理员在“管理 → 图像生成”中添加。"
  },
  "storyControl.campaignKey": {
    "en": "The OpenAI picture backend has no API key. Add one in Admin > Image generation, or point this story's text model at OpenAI so its key covers pictures too.",
    "zh-CN": "OpenAI 图像后端尚未设置 API 密钥。可在“管理 → 图像生成”中添加，或将本战役的文本模型指向 OpenAI，以便共用密钥生成图像。"
  },
  "storyControl.error.action": {
    "en": "That did not go through.",
    "zh-CN": "此次操作未能完成。"
  },
  "storyControl.error.settings": {
    "en": "That change was not saved.",
    "zh-CN": "此次修改未保存。"
  },
  "storyControl.error.load": {
    "en": "The NPC roster did not load. {reason}",
    "zh-CN": "NPC 名册加载失败。{reason}"
  },
  "storyControl.error.request": {
    "en": "Invalid request.",
    "zh-CN": "请求内容无效。"
  },
  "storyControl.error.npcMissing": {
    "en": "NPC not found.",
    "zh-CN": "未找到该 NPC。"
  },
  "storyControl.error.bothNamed": {
    "en": "Both NPCs need a name.",
    "zh-CN": "两位 NPC 都需要填写名字。"
  },
  "storyControl.error.sameName": {
    "en": "Those are already the same name.",
    "zh-CN": "这两个名字已经相同。"
  },
  "storyControl.error.emptyName": {
    "en": "A name cannot be empty.",
    "zh-CN": "名字不能为空。"
  },
  "storyControl.error.unchangedName": {
    "en": "That is already their name.",
    "zh-CN": "这已经是该人物的名字。"
  },
  "storyControl.error.collision": {
    "en": "Another NPC is already called \"{name}\". Merge them instead.",
    "zh-CN": "已有另一位 NPC 名为“{name}”。若是同一人物，请使用合并操作。"
  },
  "storyControl.error.merge": {
    "en": "Those two could not be merged.",
    "zh-CN": "无法合并这两位人物。"
  },
  "storyControl.error.invalidSettings": {
    "en": "Invalid story settings.",
    "zh-CN": "故事设置无效。"
  },
  "storyControl.error.agentUnavailable": {
    "en": "The server's agent is not available.",
    "zh-CN": "服务器智能体不可用。"
  },
  "storyControl.error.agentPictures": {
    "en": "The server's agent has not been cleared to make pictures yet.",
    "zh-CN": "服务器尚未允许智能体生成图像。"
  },
  "storyControl.error.noAgent": {
    "en": "This server has no agent program set up.",
    "zh-CN": "此服务器尚未配置智能体。"
  },
  "storyControl.error.agentRestricted": {
    "en": "The server's {label} is kept for campaigns an administrator leads.",
    "zh-CN": "服务器的 {label} 仅供管理员担任队长的战役使用。"
  },
  "storyControl.provider.local": {
    "en": "Local (Ollama)",
    "zh-CN": "本地（Ollama）"
  },
  "storyControl.provider.custom": {
    "en": "Custom backend",
    "zh-CN": "自定义后端"
  },
  "storyControl.provider.none": {
    "en": "No AI storyteller",
    "zh-CN": "不使用 AI 主持"
  },
  "storyControl.provider.harness": {
    "en": "The server's agent",
    "zh-CN": "服务器智能体"
  },
  "storyControl.backend.comfyui": {
    "en": "ComfyUI",
    "zh-CN": "ComfyUI"
  },
  "storyControl.backend.openai": {
    "en": "OpenAI-compatible",
    "zh-CN": "兼容 OpenAI"
  },
  "storyControl.backend.mflux-hs": {
    "en": "MFLUX (home server)",
    "zh-CN": "MFLUX（家庭服务器）"
  },
  "storyControl.backend.sdnq-hs": {
    "en": "SDNQ (home server)",
    "zh-CN": "SDNQ（家庭服务器）"
  },
  "storyControl.backend.harness": {
    "en": "The server's agent",
    "zh-CN": "服务器智能体"
  },
  "storyControl.prose.tiny": {
    "en": "tiny",
    "zh-CN": "极短"
  },
  "storyControl.prose.xsmall": {
    "en": "xsmall",
    "zh-CN": "很短"
  },
  "storyControl.prose.small": {
    "en": "small",
    "zh-CN": "短"
  },
  "storyControl.prose.medium": {
    "en": "medium",
    "zh-CN": "适中"
  },
  "storyControl.prose.large": {
    "en": "large",
    "zh-CN": "长"
  },
  "storyControl.prose.xlarge": {
    "en": "xlarge",
    "zh-CN": "较长"
  },
  "storyControl.prose.xxlarge": {
    "en": "xxlarge",
    "zh-CN": "很长"
  },
  "storyControl.prose.huge": {
    "en": "huge",
    "zh-CN": "超长"
  },
  "storyControl.prose.giant": {
    "en": "giant",
    "zh-CN": "最长"
  },
  "storyControl.attitude.hostile": {
    "en": "hostile",
    "zh-CN": "敌对"
  },
  "storyControl.attitude.indifferent": {
    "en": "indifferent",
    "zh-CN": "冷淡"
  },
  "storyControl.attitude.friendly": {
    "en": "friendly",
    "zh-CN": "友好"
  },
  "storyControl.error.stringLimit": {
    "en": "Too big: expected string to have <={limit} characters",
    "zh-CN": "文字不能超过 {limit} 个字符。"
  },
  "storyControl.listSeparator": {
    "en": ", ",
    "zh-CN": "、"
  }
});
