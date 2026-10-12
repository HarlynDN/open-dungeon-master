import { defineMessages } from "./catalog.ts";

export const STORYBOARD_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "storyboardUi.copy.missing": {"en": "missing", "zh-CN": "已失效"},
  "storyboardUi.copy.leads": {"en": "leads to", "zh-CN": "引向"},
  "storyboardUi.copy.titleRequired": {"en": "A card needs a title, even a bad one.", "zh-CN": "请先为卡片填写标题。"},
  "storyboardUi.copy.noCard": {"en": "No such card.", "zh-CN": "该卡片不存在。"},
  "storyboardUi.copy.workshopMissing": {"en": "Workshop not found.", "zh-CN": "找不到工坊。"},
  "storyboardUi.copy.invalidChange": {"en": "Invalid change.", "zh-CN": "更改内容无效。"},
  "storyboardUi.copy.self": {"en": "A workshop cannot draw on itself.", "zh-CN": "工坊不能引用自身作为共享工坊。"},
  "storyboardUi.copy.notYours": {"en": "That workshop is not one of yours.", "zh-CN": "你没有权限使用该工坊。"},
  "storyboardUi.copy.chapters": {"en": "Other chapters draw on this workshop, so it cannot draw on another one itself.", "zh-CN": "已有其他章节使用此工坊，因此它不能再引用另一个共享工坊。"},
  "storyboardUi.frame.boardFull": {"en": "A board holds {count} cards. Split this into a second workshop.", "zh-CN": "每个分镜板最多容纳 {count} 张卡片。请将其余内容拆分到另一个工坊。"},
  "storyboardUi.frame.nested": {"en": "\"{name}\" draws on a shared workshop itself. Pick the one it draws on instead.", "zh-CN": "“{name}”已引用另一个共享工坊。请直接选择它所引用的工坊。"},
  "storyboardUi.loadFailed": { "en": "The storyboard did not load. {reason}", "zh-CN": "未能加载分镜板。{reason}" },
  "storyboardUi.copy.m000": {
    "en": "Loading the storyboard",
    "zh-CN": "正在加载分镜板"
  },
  "storyboardUi.copy.m001": {
    "en": "Card",
    "zh-CN": "卡片"
  },
  "storyboardUi.copy.m002": {
    "en": "In a few words",
    "zh-CN": "简短概括"
  },
  "storyboardUi.copy.m003": {
    "en": "The miller's daughter has not come home",
    "zh-CN": "磨坊主的女儿还没回家"
  },
  "storyboardUi.copy.m004": {
    "en": "Add",
    "zh-CN": "添加"
  },
  "storyboardUi.copy.m005": {
    "en": "Add a card",
    "zh-CN": "添加卡片"
  },
  "storyboardUi.copy.m006": {
    "en": "What this board is missing",
    "zh-CN": "分镜板还缺什么"
  },
  "storyboardUi.copy.m007": {
    "en": "Counted, not guessed. Nothing here asked a model what your story needs.",
    "zh-CN": "根据已有内容统计得出，没有调用 AI 推测故事需要什么。"
  },
  "storyboardUi.copy.m008": {
    "en": "Nothing on the board. Start with a reason the party would go somewhere.",
    "zh-CN": "分镜板还是空的。先写一个让队伍愿意出发的理由。"
  },
  "storyboardUi.copy.m009": {
    "en": "What this becomes",
    "zh-CN": "导入后会生成什么"
  },
  "storyboardUi.copy.m010": {
    "en": "Nothing yet. Cards become lore, quests, prepared fights, DM notes and the story arc.",
    "zh-CN": "还没有内容。卡片可以生成背景资料、任务、预设战斗、DM 笔记和故事线。"
  },
  "storyboardUi.copy.m011": {
    "en": "Whispers to you",
    "zh-CN": "发给你的私信"
  },
  "storyboardUi.copy.m012": {
    "en": "Private messages from the players. Only you and the sender see them; a player can have two waiting on you at a time.",
    "zh-CN": "玩家发来的私密消息，仅你和发送者可见。每位玩家最多可有两条等待你回复的消息。"
  },
  "storyboardUi.copy.m013": {
    "en": "Answered",
    "zh-CN": "已回复"
  },
  "storyboardUi.copy.m014": {
    "en": "Waiting on you",
    "zh-CN": "等待你回复"
  },
  "storyboardUi.copy.m015": {
    "en": "Reply",
    "zh-CN": "回复"
  },
  "storyboardUi.copy.m016": {
    "en": "No whispers yet.",
    "zh-CN": "暂无私信。"
  },
  "storyboardUi.copy.m017": {
    "en": "Save the card",
    "zh-CN": "保存卡片"
  },
  "storyboardUi.copy.m018": {
    "en": "The card",
    "zh-CN": "卡片内容"
  },
  "storyboardUi.copy.m019": {
    "en": "Kind of card",
    "zh-CN": "卡片类型"
  },
  "storyboardUi.copy.m020": {
    "en": "Title",
    "zh-CN": "标题"
  },
  "storyboardUi.copy.m021": {
    "en": "What happens",
    "zh-CN": "发生什么"
  },
  "storyboardUi.copy.m022": {
    "en": "What actually happens, and what it means if the party is not there.",
    "zh-CN": "具体会发生什么，以及队伍不在场时会有什么影响。"
  },
  "storyboardUi.copy.m023": {
    "en": "Who and where",
    "zh-CN": "人物与地点"
  },
  "storyboardUi.copy.m024": {
    "en": "nobody in particular",
    "zh-CN": "不指定"
  },
  "storyboardUi.copy.m025": {
    "en": "Missing: no longer in this workshop or its shared one",
    "zh-CN": "已失效：当前工坊及其共享工坊中已无此项"
  },
  "storyboardUi.copy.m026": {
    "en": "What this card picked is gone. Pick again, or clear it.",
    "zh-CN": "这张卡片关联的内容已不存在。请重新选择或清除关联。"
  },
  "storyboardUi.copy.m027": {
    "en": "Leads to",
    "zh-CN": "引向"
  },
  "storyboardUi.copy.m028": {
    "en": "An arrow is \"then\" unless you say otherwise. Mark the routes the party chooses between, or a scene that only happens if something holds; those arrive in a campaign as moments the storyteller can run or drop, not as beats it waits on.",
    "zh-CN": "箭头默认表示“接着发生”。你可以标出队伍可选的路线，或满足条件才会发生的场景。导入战役后，它们会成为 DM 可以采用或跳过的预设场景，而不会阻塞故事推进。"
  },
  "storyboardUi.copy.m029": {
    "en": "if they side with the guild",
    "zh-CN": "如果他们支持公会"
  },
  "storyboardUi.copy.m030": {
    "en": "if they search the cellar",
    "zh-CN": "如果他们搜查地窖"
  },
  "storyboardUi.copy.m031": {
    "en": "Delete",
    "zh-CN": "删除"
  },
  "storyboardUi.copy.m032": {
    "en": "(shared)",
    "zh-CN": "（共享）"
  },
  "storyboardUi.copy.m033": {
    "en": "Shared workshop",
    "zh-CN": "共享工坊"
  },
  "storyboardUi.copy.m034": {
    "en": "Write the recurring cast, places, maps and fights once in one workshop, and let each chapter's cards pick from it. Picks follow the shared rows as they change. A campaign that imports this chapter brings what its cards pick, once, and later chapters reuse it.",
    "zh-CN": "在一个工坊中编写反复出现的人物、地点、地图和战斗，各章节的卡片便可引用它们。选择列表会随共享内容更新。导入章节时，只导入其卡片引用的共享内容；后续章节会复用这些内容。"
  },
  "storyboardUi.copy.m035": {
    "en": "Draws on",
    "zh-CN": "使用共享内容"
  },
  "storyboardUi.copy.m036": {
    "en": "Nothing shared",
    "zh-CN": "不使用共享内容"
  },
  "storyboardUi.copy.m037": {
    "en": "Place",
    "zh-CN": "地点"
  },
  "storyboardUi.copy.m038": {
    "en": "What happened before",
    "zh-CN": "过往经历"
  },
  "storyboardUi.copy.m039": {
    "en": "Something happens",
    "zh-CN": "事件"
  },
  "storyboardUi.copy.m040": {
    "en": "A fight",
    "zh-CN": "战斗"
  },
  "storyboardUi.copy.m041": {
    "en": "A reason to go",
    "zh-CN": "出发的理由"
  },
  "storyboardUi.copy.m042": {
    "en": "Something hidden",
    "zh-CN": "秘密"
  },
  "storyboardUi.copy.m043": {
    "en": "Somebody's moment",
    "zh-CN": "人物场景"
  },
  "storyboardUi.copy.m044": {
    "en": "Somewhere the party can stand. Becomes a lore entry.",
    "zh-CN": "队伍可以到达的地点。导入后成为背景资料。"
  },
  "storyboardUi.copy.m045": {
    "en": "What is already true when the campaign opens. Becomes a lore entry.",
    "zh-CN": "战役开始前就已发生的事情。导入后成为背景资料。"
  },
  "storyboardUi.copy.m046": {
    "en": "A thing that happens, whether or not the party is there. Becomes an arc beat.",
    "zh-CN": "无论队伍是否在场都会发生的事件。导入后成为故事节点。"
  },
  "storyboardUi.copy.m047": {
    "en": "A fight worth preparing. Becomes a prepared encounter, or the one it picks, and a beat when the arrows run through it.",
    "zh-CN": "值得提前准备的战斗。导入后成为预设遭遇，或引用所选的预设战斗；若主线经过此处，也会成为故事节点。"
  },
  "storyboardUi.copy.m048": {
    "en": "Why the party would walk toward any of this. Becomes a quest.",
    "zh-CN": "队伍愿意参与其中的理由。导入后成为任务。"
  },
  "storyboardUi.copy.m049": {
    "en": "What the party is not told. Becomes a DM-only note.",
    "zh-CN": "尚未告知队伍的信息。导入后成为仅 DM 可见的笔记。"
  },
  "storyboardUi.copy.m050": {
    "en": "The scene somebody has been waiting for. Becomes an arc beat.",
    "zh-CN": "某位人物期待已久的场景。导入后成为故事节点。"
  },
  "storyboardUi.copy.m051": {
    "en": "Then",
    "zh-CN": "接着发生"
  },
  "storyboardUi.copy.m052": {
    "en": "One route of several",
    "zh-CN": "多条可选路线之一"
  },
  "storyboardUi.copy.m053": {
    "en": "Only if...",
    "zh-CN": "满足条件才发生…"
  },
  "storyboardUi.copy.m054": {
    "en": "Who",
    "zh-CN": "人物"
  },
  "storyboardUi.copy.m055": {
    "en": "On which map",
    "zh-CN": "所在地图"
  },
  "storyboardUi.copy.m056": {
    "en": "Which prepared fight",
    "zh-CN": "预设战斗"
  },
  "storyboardUi.copy.m057": {
    "en": "Where",
    "zh-CN": "地点"
  },
  "storyboardUi.copy.m058": {
    "en": "who",
    "zh-CN": "人物"
  },
  "storyboardUi.copy.m059": {
    "en": "map",
    "zh-CN": "地图"
  },
  "storyboardUi.copy.m060": {
    "en": "fight",
    "zh-CN": "战斗"
  },
  "storyboardUi.copy.m061": {
    "en": "place",
    "zh-CN": "地点"
  },
  "storyboardUi.copy.m062": {
    "en": "That card could not be added.",
    "zh-CN": "未能添加卡片。"
  },
  "storyboardUi.copy.m063": {
    "en": "That card could not be saved.",
    "zh-CN": "未能保存卡片。"
  },
  "storyboardUi.copy.m064": {
    "en": "That card could not be deleted.",
    "zh-CN": "未能删除卡片。"
  },
  "storyboardUi.copy.m065": {
    "en": "That could not be changed.",
    "zh-CN": "未能更改共享工坊。"
  },
  "storyboardUi.copy.m066": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "storyboardUi.copy.m067": {
    "en": "The whisper did not go through.",
    "zh-CN": "私信未能发送。"
  },
  "storyboardUi.copy.m068": {
    "en": "Could not reach the table.",
    "zh-CN": "无法连接战役。"
  },
  "storyboardUi.copy.m069": {
    "en": "Why would they go?",
    "zh-CN": "他们为什么出发？"
  },
  "storyboardUi.copy.m070": {
    "en": "Where this happens",
    "zh-CN": "事情发生在哪里"
  },
  "storyboardUi.copy.m071": {
    "en": "What it leads to",
    "zh-CN": "接下来会发生什么"
  },
  "storyboardUi.copy.m072": {
    "en": "There is nothing on the board a party would walk toward. Everything here happens whether they turn up or not.",
    "zh-CN": "分镜板上还没有能吸引队伍参与的事情。无论他们是否出现，这些事都会发生。"
  },
  "storyboardUi.copy.m073": {
    "en": "Nothing on the board is anywhere. The first question at the table is where they are.",
    "zh-CN": "分镜板上的事情还没有发生地点。游玩时首先需要知道队伍在哪里。"
  },
  "storyboardUi.copy.m074": {
    "en": "There is history here and nothing happening. Backstory the party never collides with is backstory they never learn.",
    "zh-CN": "这里只有过往经历，没有正在发生的事件。队伍若不与这些经历产生联系，就无从了解它们。"
  },
  "storyboardUi.copy.m075": {
    "en": "The board has nothing that happens on its main line, so there is no act to add.",
    "zh-CN": "分镜板主线上没有事件，因此暂无可追加的篇章。"
  },
  "storyboardUi.copy.m076": {
    "en": "This campaign already has a story arc the table has been playing, so the board's beats are left here rather than written over it.",
    "zh-CN": "战役已有正在游玩的故事线，因此这些节点会留在分镜板上，不会覆盖现有故事线。"
  },
  "storyboardUi.copy.m077": {
    "en": "The arc needs something that says what this world is. Add a place or a piece of history and it can be written.",
    "zh-CN": "故事线需要世界背景。添加一个地点或一段历史后即可生成。"
  },
  "storyboardUi.frame.from": {
    "en": "From {name}",
    "zh-CN": "来自 {name}"
  },
  "storyboardUi.frame.follow": {
    "en": "How \"{name}\" follows",
    "zh-CN": "如何引向“{name}”"
  },
  "storyboardUi.frame.when": {
    "en": "When the party takes the route to \"{name}\"",
    "zh-CN": "队伍何时走向“{name}”"
  },
  "storyboardUi.frame.delete": {
    "en": "Delete {name}",
    "zh-CN": "删除 {name}"
  },
  "storyboardUi.frame.open": {
    "en": "Open {name}",
    "zh-CN": "打开 {name}"
  },
  "storyboardUi.frame.leads": {
    "en": "leads to {count}",
    "zh-CN": "引向 {count} 张卡片"
  },
  "storyboardUi.frame.choiceOne": {
    "en": " · {count} route to choose",
    "zh-CN": " · {count} 条可选路线"
  },
  "storyboardUi.frame.choiceMany": {
    "en": " · {count} routes to choose",
    "zh-CN": " · {count} 条可选路线"
  },
  "storyboardUi.frame.optional": {
    "en": " · {count} only if",
    "zh-CN": " · {count} 个条件场景"
  },
  "storyboardUi.frame.missingOne": {
    "en": "{count} pick is missing",
    "zh-CN": "{count} 项关联已失效"
  },
  "storyboardUi.frame.missingMany": {
    "en": "{count} picks are missing",
    "zh-CN": "{count} 项关联已失效"
  },
  "storyboardUi.frame.routeChoice": {
    "en": "{name} (one route)",
    "zh-CN": "{name}（可选路线）"
  },
  "storyboardUi.frame.routeOptional": {
    "en": "{name} (only if)",
    "zh-CN": "{name}（满足条件才发生）"
  },
  "storyboardUi.frame.chaptersOne": {
    "en": "One chapter draws on this workshop: {names}. Its cast, places, maps and fights show in their pickers.",
    "zh-CN": "一个章节使用此工坊：{names}。其人物、地点、地图和战斗会出现在该章节的选择列表中。"
  },
  "storyboardUi.frame.chaptersMany": {
    "en": "{count} chapters draw on this workshop: {names}. Its cast, places, maps and fights show in their pickers.",
    "zh-CN": "{count} 个章节使用此工坊：{names}。其人物、地点、地图和战斗会出现在这些章节的选择列表中。"
  },
  "storyboardUi.frame.whisper": {
    "en": "Whisper to {name}...",
    "zh-CN": "给 {name} 发私信…"
  },
  "storyboardUi.frame.reply": {
    "en": "Reply privately to {name}",
    "zh-CN": "私下回复 {name}"
  },
  "storyboardUi.frame.send": {
    "en": "Send the reply to {name}",
    "zh-CN": "发送给 {name}"
  },
  "storyboardUi.frame.import": {
    "en": "Imported into a campaign, this board becomes {items}.",
    "zh-CN": "导入战役后，此分镜板会生成{items}。"
  },
  "storyboardUi.frame.arcShort": {
    "en": "An arc needs at least {min} things that happen; the board has {count}.",
    "zh-CN": "故事线至少需要 {min} 个事件；分镜板目前有 {count} 个。"
  },
  "storyboardUi.frame.lore": {
    "en": "{count} lore entries",
    "zh-CN": "{count} 条背景资料"
  },
  "storyboardUi.frame.quests": {
    "en": "{count} quests",
    "zh-CN": "{count} 个任务"
  },
  "storyboardUi.frame.encounters": {
    "en": "{count} prepared encounters",
    "zh-CN": "{count} 个预设遭遇"
  },
  "storyboardUi.frame.notes": {
    "en": "{count} DM-only notes",
    "zh-CN": "{count} 条仅 DM 可见的笔记"
  },
  "storyboardUi.frame.moments": {
    "en": "{count} planned moments on routes that may not be taken",
    "zh-CN": "{count} 个可选路线上的预设场景"
  },
  "storyboardUi.frame.act": {
    "en": "a new act of up to {count} beats",
    "zh-CN": "一个最多包含 {count} 个节点的新篇章"
  },
  "storyboardUi.frame.arc": {
    "en": "a story arc of {count} beats",
    "zh-CN": "一条包含 {count} 个节点的故事线"
  },
  "storyboardUi.frame.payoffTitle": {
    "en": "What happens when they follow \"{name}\"",
    "zh-CN": "沿着“{name}”会发生什么"
  },
  "storyboardUi.frame.payoffReason": {
    "en": "\"{name}\" is a reason to go somewhere, and nothing on the board is what they find.",
    "zh-CN": "“{name}”给了队伍出发的理由，但分镜板还没有说明他们会发现什么。"
  },
  "storyboardUi.frame.reasonTitle": {
    "en": "Why they are at \"{name}\"",
    "zh-CN": "他们为何来到“{name}”"
  },
  "storyboardUi.frame.reasonReason": {
    "en": "\"{name}\" is a fight with nothing leading into it.",
    "zh-CN": "“{name}”是一场战斗，却没有任何事情引向它。"
  },
  "storyboardUi.frame.revealTitle": {
    "en": "How they find out about \"{name}\"",
    "zh-CN": "他们如何得知“{name}”"
  },
  "storyboardUi.frame.revealReason": {
    "en": "Nothing on the board reveals \"{name}\". A secret with no way in is one the table never learns.",
    "zh-CN": "分镜板上没有揭示“{name}”的线索。没有发现途径的秘密，队伍永远无从得知。"
  },
  "storyboardUi.frame.choiceTitle": {
    "en": "The other way out of \"{name}\"",
    "zh-CN": "从“{name}”出发的另一条路线"
  },
  "storyboardUi.frame.choiceReason": {
    "en": "\"{name}\" offers one route of several, and \"{other}\" is the only one drawn.",
    "zh-CN": "“{name}”应有多条可选路线，但目前只画出了“{other}”这一条。"
  },
  "storyboardUi.frame.contextTitle": {
    "en": "What sets up \"{name}\"",
    "zh-CN": "什么引出“{name}”"
  },
  "storyboardUi.frame.contextReason": {
    "en": "\"{name}\" is somebody's big scene with nothing on either side of it.",
    "zh-CN": "“{name}”是某位人物的重要场景，却没有前因或后续。"
  },
  "storyboardUi.frame.unusedNpc": {
    "en": "{name} never appears in anything on the board.",
    "zh-CN": "{name} 尚未出现在分镜板上的任何事情中。"
  },
  "storyboardUi.frame.unusedMap": {
    "en": "{name} is a map nobody visits.",
    "zh-CN": "{name} 这张地图还没有安排队伍前往。"
  },
  "storyboardUi.frame.unusedEncounter": {
    "en": "{name} is a prepared fight nothing leads to.",
    "zh-CN": "{name} 是一场预设战斗，却没有任何事情引向它。"
  },
  "storyboardUi.frame.unusedLocation": {
    "en": "{name} is a place nothing happens in.",
    "zh-CN": "{name} 这个地点还没有安排事件。"
  },
  "storyboardUi.frame.linkReason": {
    "en": "\"{name}\" is not connected to anything else on the board.",
    "zh-CN": "“{name}”未与分镜板上的其他内容相连。"
  },
  "storyboardUi.frame.list": {
    "en": ", ",
    "zh-CN": "、"
  }
});
