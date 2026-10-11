import { defineMessages } from "./catalog.ts";

// UI projection only; world facts, pin excerpts and prompt diagnostics stay raw.
export const MEMORY_MESSAGES = /*#__PURE__*/ defineMessages({
  "memoryUi.pin.tokens": { "en": "{count}t", "zh-CN": "{count} token" },
  "memoryUi.fact.category.location": {
    "en": "Places",
    "zh-CN": "地点"
  },
  "memoryUi.fact.category.npc": {
    "en": "People",
    "zh-CN": "人物"
  },
  "memoryUi.fact.category.promise": {
    "en": "Promises & debts",
    "zh-CN": "承诺与债务"
  },
  "memoryUi.fact.category.world": {
    "en": "World state",
    "zh-CN": "世界状态"
  },
  "memoryUi.fact.category.party": {
    "en": "The party",
    "zh-CN": "队伍"
  },
  "memoryUi.fact.category.lore": {
    "en": "Lore & rules",
    "zh-CN": "背景与规则"
  },
  "memoryUi.fact.unpin": {
    "en": "Unpin",
    "zh-CN": "取消固定"
  },
  "memoryUi.fact.pinTip": {
    "en": "Pin: always kept in front of the DM, never auto-replaced",
    "zh-CN": "固定：始终提供给 DM，不会被自动替换"
  },
  "memoryUi.fact.edit": {
    "en": "Edit",
    "zh-CN": "编辑"
  },
  "memoryUi.fact.retire": {
    "en": "Retire: the DM stops treating this as true",
    "zh-CN": "归档：DM 不再将其视为有效事实"
  },
  "memoryUi.fact.secret": {
    "en": "DM secret",
    "zh-CN": "DM 秘密"
  },
  "memoryUi.fact.save": {
    "en": "Save",
    "zh-CN": "保存"
  },
  "memoryUi.fact.cancel": {
    "en": " Cancel",
    "zh-CN": " 取消"
  },
  "memoryUi.fact.fact": {
    "en": "Fact",
    "zh-CN": "事实"
  },
  "memoryUi.fact.composer": {
    "en": "Pin a fact",
    "zh-CN": "固定事实"
  },
  "memoryUi.fact.category": {
    "en": "Category",
    "zh-CN": "类别"
  },
  "memoryUi.fact.subjectExample": {
    "en": "Subject (who or what it is about)",
    "zh-CN": "主题（相关人物或事物）"
  },
  "memoryUi.fact.subject": {
    "en": "Subject",
    "zh-CN": "主题"
  },
  "memoryUi.fact.example": {
    "en": "One sentence the DM must never contradict",
    "zh-CN": "用一句话写下 DM 必须遵守的事实"
  },
  "memoryUi.fact.pinned": {
    "en": "Pinned",
    "zh-CN": "已固定"
  },
  "memoryUi.fact.pin": {
    "en": "Pin fact",
    "zh-CN": "固定事实"
  },
  "memoryUi.fact.showSecrets": {
    "en": "Show DM secrets (spoilers)",
    "zh-CN": "显示 DM 秘密（含剧透）"
  },
  "memoryUi.fact.hideSecrets": {
    "en": "Hide DM secrets",
    "zh-CN": "隐藏 DM 秘密"
  },
  "memoryUi.fact.noSecrets": {
    "en": "No DM secrets recorded.",
    "zh-CN": "暂无 DM 秘密记录。"
  },
  "memoryUi.fact.empty": {
    "en": "Nothing recorded yet. The DM writes durable facts here as chapters close.",
    "zh-CN": "暂无记录。章节结束时，DM 会在这里写下需要长期保留的事实。"
  },
  "memoryUi.fact.emptyLead": {
    "en": "Nothing recorded yet. The DM writes durable facts here as chapters close, or pin one yourself above.",
    "zh-CN": "暂无记录。章节结束时，DM 会在这里写下需要长期保留的事实，你也可以在上方自行固定。"
  },
  "memoryUi.error.saveFact": {
    "en": "Could not save the fact.",
    "zh-CN": "未能保存事实。"
  },
  "memoryUi.error.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "memoryUi.error.secrets": {
    "en": "Could not load the DM secrets.",
    "zh-CN": "未能加载 DM 秘密。"
  },
  "memoryUi.pin.jump": {
    "en": "Jump to message",
    "zh-CN": "跳转到消息"
  },
  "memoryUi.pin.full": {
    "en": "Full message",
    "zh-CN": "完整消息"
  },
  "memoryUi.pin.excerpt": {
    "en": "Excerpt",
    "zh-CN": "摘录"
  },
  "memoryUi.pin.less": {
    "en": "Show less",
    "zh-CN": "收起"
  },
  "memoryUi.pin.more": {
    "en": "Show more",
    "zh-CN": "展开"
  },
  "memoryUi.pin.unpin": {
    "en": "Unpin",
    "zh-CN": "取消固定"
  },
  "memoryUi.pin.title": {
    "en": "Pinned memories",
    "zh-CN": "固定记忆"
  },
  "memoryUi.pin.budget": {
    "en": "Pin budget used",
    "zh-CN": "已使用的固定记忆额度"
  },
  "memoryUi.pin.empty": {
    "en": "Nothing pinned. Select text in one of the DM's messages and press the pin icon to put it in front of the DM every turn, whether or not it looks relevant.",
    "zh-CN": "暂无固定记忆。选中 DM 消息中的文字并点击固定图标，即可让 DM 在每个回合都看到这段内容，无论它与当前情节是否相关。"
  },
  "memoryUi.error.unpin": {
    "en": "Could not unpin the memory.",
    "zh-CN": "未能取消固定记忆。"
  },
  "memoryUi.error.pinLoad": {
    "en": "The pins did not load. {reason}",
    "zh-CN": "固定记忆未能加载。{reason}"
  },
  "memoryUi.context.kind.safety": {
    "en": "Lines and veils",
    "zh-CN": "内容边界"
  },
  "memoryUi.context.kind.contract": {
    "en": "Engine boundary",
    "zh-CN": "引擎约束"
  },
  "memoryUi.context.kind.rules": {
    "en": "Rules",
    "zh-CN": "规则"
  },
  "memoryUi.context.kind.sky": {
    "en": "Sky and hour",
    "zh-CN": "天气与时间"
  },
  "memoryUi.context.kind.state": {
    "en": "Game state",
    "zh-CN": "游戏状态"
  },
  "memoryUi.context.kind.factions": {
    "en": "Factions",
    "zh-CN": "势力"
  },
  "memoryUi.context.kind.quests": {
    "en": "Quests",
    "zh-CN": "任务"
  },
  "memoryUi.context.kind.shop": {
    "en": "Shop",
    "zh-CN": "商店"
  },
  "memoryUi.context.kind.retrieval": {
    "en": "Lore and house rules",
    "zh-CN": "背景与自订规则"
  },
  "memoryUi.context.kind.chapters": {
    "en": "Chapters",
    "zh-CN": "章节"
  },
  "memoryUi.context.kind.history": {
    "en": "Transcript",
    "zh-CN": "聊天记录"
  },
  "memoryUi.context.kind.tools": {
    "en": "Tool definitions",
    "zh-CN": "工具定义"
  },
  "memoryUi.context.title": {
    "en": "What the DM was sent",
    "zh-CN": "DM 收到的上下文"
  },
  "memoryUi.context.refresh": {
    "en": "Refresh",
    "zh-CN": "刷新"
  },
  "memoryUi.context.empty": {
    "en": "No turn has been taken yet. Play a round and this will show every block the DM received, what it cost, and anything the budget cut.",
    "zh-CN": "尚未进行任何回合。游玩一个回合后，这里会显示 DM 收到的各块内容、所占额度以及因额度不足而舍弃的内容。"
  },
  "memoryUi.error.leadOnly": {
    "en": "Party lead only.",
    "zh-CN": "仅队长可用。"
  },
  "memoryUi.error.context": {
    "en": "Could not load the context.",
    "zh-CN": "未能加载上下文。"
  },
  "memoryUi.context.last": {
    "en": "Last turn. Token counts are estimates.",
    "zh-CN": "上个回合。token 数量为估算值。"
  },
  "memoryUi.context.lastAt": {
    "en": "Last turn, {time}. Token counts are estimates.",
    "zh-CN": "上个回合，{time}。token 数量为估算值。"
  },
  "memoryUi.context.tokens": {
    "en": "{used} / {limit} tokens",
    "zh-CN": "{used} / {limit} token"
  },
  "memoryUi.context.dropped": {
    "en": "dropped: {reason}",
    "zh-CN": "已舍弃：{reason}"
  },
  "memoryUi.error.factInvalid": {
    "en": "Invalid fact.",
    "zh-CN": "事实内容无效。"
  },
  "memoryUi.error.patchInvalid": {
    "en": "Invalid patch.",
    "zh-CN": "修改内容无效。"
  },
  "memoryUi.error.factMissing": {
    "en": "Fact not found.",
    "zh-CN": "找不到该事实。"
  },
  "memoryUi.error.factAddLead": {
    "en": "Only the party lead can add facts.",
    "zh-CN": "只有队长可以添加事实。"
  },
  "memoryUi.error.factEditLead": {
    "en": "Only the party lead can edit or retire facts.",
    "zh-CN": "只有队长可以编辑或归档事实。"
  },
  "memoryUi.error.pinInvalid": {
    "en": "Invalid unpin.",
    "zh-CN": "取消固定的请求无效。"
  },
  "memoryUi.error.pinOwner": {
    "en": "That pin is not yours to remove.",
    "zh-CN": "你无权取消这条固定记忆。"
  },
  "memoryUi.context.reason.always": {
    "en": "always included",
    "zh-CN": "始终包含"
  },
  "memoryUi.context.reason.fits": {
    "en": "fits",
    "zh-CN": "在额度内"
  },
  "memoryUi.context.reason.kind": {
    "en": "over the {kind} budget ({tokens} > {left} tokens left)",
    "zh-CN": "超出{kind}额度（需要 {tokens} token，剩余 {left} token）"
  },
  "memoryUi.context.reason.total": {
    "en": "over the total context budget ({tokens} > {limit} tokens)",
    "zh-CN": "超出上下文总额度（{tokens} > {limit} token）"
  }
});
