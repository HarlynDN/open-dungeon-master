import { defineMessages } from "./catalog.ts";
export const IMPORT_FLOW_MESSAGES = /*#__PURE__*/ defineMessages({
  "importFlow.list": { "en": ", ", "zh-CN": "、" },
  "importFlow.authority": {"en": "Only the person steering the story can import prep.", "zh-CN": "只有负责推进剧情的人才能导入备团内容。"},
  "importFlow.houseRules": {
    "en": "This campaign already has house rules. Importing replaces them unless you choose to add.",
    "zh-CN": "这个战役已有自定义规则。导入会替换现有规则，除非选择追加。"
  },
  "importFlow.arcExisting": {
    "en": "This campaign already has a story arc. The board's places, quests, fights and notes still land; its beats do not overwrite the spine the table has been playing.{add}",
    "zh-CN": "这个战役已有剧情主线。故事板中的地点、任务、战斗和笔记仍会导入，剧情节点不会覆盖正在进行的主线。{add}"
  },
  "importFlow.addArc": {
    "en": " Add them as the next act to keep them.",
    "zh-CN": "可选择作为下一幕追加，保留这些节点。"
  },
  "importFlow.worldRecords": {
    "en": "WorldForge's links, secrets and pins for {kinds} stay behind with them.",
    "zh-CN": "未勾选{kinds}，因此世界编辑器中与这些资料相关的关系、秘密和标记也不会导入。"
  },
  "importFlow.regionMap": {
    "en": "This campaign already has a region map. Importing replaces it.",
    "zh-CN": "这个战役已有区域地图，导入会替换它。"
  },
  "importFlow.renamed": {
    "en": "{count} {kind} entries already exist here by name and will be numbered.",
    "zh-CN": "{count} 条{kind}与现有内容重名，导入时会添加编号。"
  },
  "importFlow.kept": {
    "en": "{count} {kind} entries came in from here before and stay as this campaign has them.",
    "zh-CN": "{count} 条{kind}曾从此来源导入，将保留战役中的现有版本。"
  },
  "importFlow.copyAgain": {
    "en": "{kind} that came in from here before arrive again as second copies.",
    "zh-CN": "已从此来源导入的{kind}会再复制一份。"
  },
  "importFlow.encountersUnbound": {
    "en": "{count} prepared encounters arrive without their battle maps; tick Battle maps to keep them bound.",
    "zh-CN": "{count} 场预设遭遇的战斗地图未勾选。导入后将解除地图关联，并按遭遇设置生成地图；勾选“战斗地图”可保留关联。"
  },
  "importFlow.locationsUnbound": {
    "en": "{count} places arrive without their battle maps; tick Battle maps to keep them.",
    "zh-CN": "{count} 个地点关联的战斗地图未勾选。导入后将解除地图关联；勾选“战斗地图”可保留关联。"
  },
  "importFlow.homebrew": {
    "en": "{count} prepared encounters name hand-built monsters; these only resolve for the same bestiary owner.",
    "zh-CN": "{count} 场预设遭遇引用了自制怪物。这些怪物属于作者的怪物图鉴，不会随内容导入；战役拥有者与怪物作者相同时才能找到它们。"
  },
  "importFlow.markers": {
    "en": "Places are not included, so the region map arrives without its markers. It will place them again as the party travels.",
    "zh-CN": "未勾选地点，因此区域地图不会携带地点标记。队伍旅行时会重新放置标记。"
  },
  "importFlow.shopsUnplaced": {
    "en": "{count} shops arrive unplaced; tick Places to keep their locations.",
    "zh-CN": "{count} 家商店的地点未勾选。导入后暂不关联地点，会在同名地点开放；勾选“地点”可保留关联。"
  },
  "importFlow.shopsUnkept": {
    "en": "{count} shops arrive without their keepers; tick NPCs to bring them.",
    "zh-CN": "{count} 家商店的店主未勾选。导入后柜台后将没有店主；勾选“NPC”可一并导入。"
  },
  "importFlow.shopsStock": {
    "en": "{count} shops with {lines} stock lines arrive as authored. Purchases, sales and haggles at a shop already here are never reset by an import.",
    "zh-CN": "将按作者设置导入 {count} 家商店及 {lines} 条库存。已有商店的买卖和议价记录不会因导入而重置。"
  },
  "importFlow.boardLinks": {
    "en": "{count} of the board's {kind} are not coming along; tick {kind} to keep those links.",
    "zh-CN": "故事板引用的 {count} 条{kind}未勾选，相关卡片不会保留这些关联。勾选“{kind}”可一并导入。"
  },
  "importFlow.boardMissing": {
    "en": "{count} card links point at something no longer in the workshop and are dropped.",
    "zh-CN": "{count} 处卡片关联指向工作坊中已不存在的内容，将移除这些关联。"
  },
  "importFlow.boardFights": {
    "en": "{count} fight cards bring their prepared fights (roster, map settings, rewards) even though Prepared encounters is not ticked.",
    "zh-CN": "即使未勾选“预设遭遇”，{count} 张战斗卡引用的遭遇仍会导入，包括敌人名单、地图设置和奖励。"
  },
  "importFlow.shared": {
    "en": "From the shared workshop \"{title}\": {items}.",
    "zh-CN": "来自共享工作坊“{title}”：{items}。"
  },
  "importFlow.sharedCopied": {
    "en": "{count} records copied in",
    "zh-CN": "复制 {count} 条资料"
  },
  "importFlow.sharedReused": {
    "en": "{count} already in this campaign and reused",
    "zh-CN": "复用战役中已有的 {count} 条资料"
  },
  "importFlow.moments": {
    "en": "{count} scenes on alternative or optional routes arrive as planned moments, rather than required beats.",
    "zh-CN": "{count} 个分支或可选路线场景将作为预设事件导入。队伍到达时，DM 可触发或舍弃它们；这些场景不是必须经历的剧情节点。"
  },
  "importFlow.arcProblem": {
    "en": "{reason} Until then the board's beats are left out.",
    "zh-CN": "{reason}在解决之前，不会导入故事板的剧情节点。"
  },
  "importFlow.arcFull": {
    "en": "This arc is already as long as an arc gets, so the board's beats cannot join it.",
    "zh-CN": "剧情主线已达到长度上限，无法追加故事板的剧情节点。"
  },
  "importFlow.arcRepeated": {
    "en": "{count} of the board's beats are already in the arc and are not added twice.",
    "zh-CN": "主线中已有 {count} 个相同的剧情节点，不会重复添加。"
  },
  "importFlow.arcRoom": {
    "en": "The arc has room for {room} more beats; the last {lost} of the board's are left out.",
    "zh-CN": "主线还可容纳 {room} 个剧情节点；故事板最后的 {lost} 个节点不会导入。"
  },
  "importFlow.arcAppend": {
    "en": "{count} beats arrive as act {act}, after the {oldCount} already in the arc. Played and skipped beats, and the acts already recapped, are untouched.",
    "zh-CN": "将追加 {count} 个剧情节点作为第 {act} 幕，排在已有的 {oldCount} 个节点之后。已完成或跳过的节点，以及已有的幕总结均会保留。"
  },
  "importFlow.copied": {
    "en": "Brought {count} items across.",
    "zh-CN": "已导入 {count} 项内容。"
  },
  "importFlow.receiptKept": {
    "en": "Kept {count} already here.",
    "zh-CN": "保留了 {count} 项已有内容。"
  },
  "importFlow.beatsAdded": {
    "en": "{count} beats joined the arc.",
    "zh-CN": "向剧情主线追加了 {count} 个节点。"
  },
  "importFlow.copiedOne": {
    "en": "Brought {count} item across.",
    "zh-CN": "已导入 {count} 项内容。"
  },
  "importFlow.beatsAddedOne": {
    "en": "{count} beat joined the arc.",
    "zh-CN": "向剧情主线追加了 {count} 个节点。"
  },
  "importFlow.unresolved": {
    "en": "No monster here answers to {names}: add them to your bestiary, or point those NPCs and fights at another.",
    "zh-CN": "怪物图鉴中找不到：{names}。请添加这些怪物，或为相关 NPC 和战斗选择其他怪物。"
  },
  "importFlow.conflicts": {
    "en": "Kept as you had them: {items}",
    "zh-CN": "保留现有设置：{items}"
  },
  "importFlow.conflictChanged": {
    "en": "{link}: changed here and in the import (which says {veracity}{rank}{oneway}); yours was kept.",
    "zh-CN": "{link}：战役和导入来源都做了修改（来源设为{veracity}{rank}{oneway}），已保留战役中的版本。"
  },
  "importFlow.conflictGone": {
    "en": "{link}: gone from the import, but changed here; yours was kept.",
    "zh-CN": "{link}：来源已删除此关系，但战役中已有修改，已保留现有版本。"
  },
  "importFlow.oneway": {
    "en": ", one way",
    "zh-CN": "，单向"
  },
  "importFlow.rank": {
    "en": ", {rank}",
    "zh-CN": "，{rank}"
  },
  "importFlow.loadFailed": {
    "en": "Could not load import sources.",
    "zh-CN": "无法读取导入来源。"
  },
  "importFlow.planFailed": {
    "en": "Could not preview this import.",
    "zh-CN": "无法预览本次导入。"
  },
  "importFlow.planning": {
    "en": "Checking what this import will bring…",
    "zh-CN": "正在检查将导入的内容……"
  },
  "importFlow.failed": {
    "en": "Could not import.",
    "zh-CN": "导入失败。"
  },
  "importFlow.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "importFlow.retry": {
    "en": "Retry",
    "zh-CN": "重试"
  },
  "importFlow.notFound": {
    "en": "Not found.",
    "zh-CN": "找不到该内容。"
  },
  "importFlow.self": {
    "en": "Nothing can import into itself.",
    "zh-CN": "不能将内容导入到它自身。"
  },
  "importFlow.veracity.known": {
    "en": "known",
    "zh-CN": "已知事实"
  },
  "importFlow.veracity.hidden": {
    "en": "hidden",
    "zh-CN": "隐藏事实"
  },
  "importFlow.veracity.believed": {
    "en": "believed",
    "zh-CN": "传闻"
  }
});
