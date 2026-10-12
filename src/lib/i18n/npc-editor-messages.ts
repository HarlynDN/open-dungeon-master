import { defineMessages } from "./catalog.ts";

export const NPC_EDITOR_MESSAGES = /*#__PURE__*/ defineMessages({
  "npcEditor.surface": {
    "en": "On the surface",
    "zh-CN": "外在印象"
  },
  "npcEditor.name": {
    "en": "Their name",
    "zh-CN": "姓名"
  },
  "npcEditor.role": {
    "en": "What they do",
    "zh-CN": "身份或职业"
  },
  "npcEditor.roleLabel": {
    "en": "Role: pick one or type your own",
    "zh-CN": "身份：选择已有选项或自行输入"
  },
  "npcEditor.roleTip": {
    "en": "Pick a role or type your own. It chooses their stand-in face until a portrait exists.",
    "zh-CN": "选择身份或自行输入；生成肖像前，会按身份显示占位头像。"
  },
  "npcEditor.attitude": {
    "en": "Attitude to the party",
    "zh-CN": "对队伍的态度"
  },
  "npcEditor.hostile": {
    "en": "Hostile to the party",
    "zh-CN": "对队伍怀有敌意"
  },
  "npcEditor.friendly": {
    "en": "Friendly to the party",
    "zh-CN": "对队伍友好"
  },
  "npcEditor.indifferent": {
    "en": "Indifferent",
    "zh-CN": "冷淡"
  },
  "npcEditor.location": {
    "en": "Where they are usually found",
    "zh-CN": "通常出现的地点"
  },
  "npcEditor.locationLabel": {
    "en": "Location: pick a place on the map or type your own",
    "zh-CN": "地点：选择地图上的地点或自行输入"
  },
  "npcEditor.aliases": {
    "en": "Other names they answer to, separated by commas",
    "zh-CN": "其他称呼，用逗号分隔"
  },
  "npcEditor.traitLabel": {
    "en": "What a player notices first",
    "zh-CN": "玩家最先注意到的特征"
  },
  "npcEditor.trait": {
    "en": "What a player notices about them first",
    "zh-CN": "玩家第一眼会注意到什么"
  },
  "npcEditor.faction": {
    "en": "Faction",
    "zh-CN": "势力"
  },
  "npcEditor.noFaction": {
    "en": "No faction",
    "zh-CN": "不属于任何势力"
  },
  "npcEditor.fightsAs": {
    "en": "Fights as",
    "zh-CN": "战斗数据"
  },
  "npcEditor.ownStat": {
    "en": "your own stat block",
    "zh-CN": "自定义战斗数据"
  },
  "npcEditor.clearStat": {
    "en": "Clear the stat block",
    "zh-CN": "清除战斗数据"
  },
  "npcEditor.pickStat": {
    "en": "Pick the stat block they fight with",
    "zh-CN": "选择使用的战斗数据"
  },
  "npcEditor.anotherStat": {
    "en": "Another stat block...",
    "zh-CN": "其他战斗数据……"
  },
  "npcEditor.statHint": {
    "en": "Veteran, Bandit Captain, Priest...",
    "zh-CN": "老兵、强盗队长、祭司……"
  },
  "npcEditor.voice": {
    "en": "Voice",
    "zh-CN": "语音"
  },
  "npcEditor.narrator": {
    "en": "The narrator's voice",
    "zh-CN": "旁白语音"
  },
  "npcEditor.pace": {
    "en": "Pace",
    "zh-CN": "语速"
  },
  "npcEditor.identity": {
    "en": "Who they are",
    "zh-CN": "内在性格"
  },
  "npcEditor.goals": {
    "en": "What they want",
    "zh-CN": "目标与愿望"
  },
  "npcEditor.goal.scene": {
    "en": "Right now, in the next scene",
    "zh-CN": "接下来这一幕想要什么"
  },
  "npcEditor.goal.session": {
    "en": "Working toward over a few sessions",
    "zh-CN": "未来几次游戏中努力实现的目标"
  },
  "npcEditor.goal.ambition": {
    "en": "What they would give up everything for",
    "zh-CN": "愿为之放弃一切的抱负"
  },
  "npcEditor.goalNote": {
    "en": "The middle one advances on background dice at the end of a chapter, so its progress is the engine's to move, not yours.",
    "zh-CN": "中期目标会在章节结束时通过后台掷骰推进，进度由游戏自动更新。"
  },
  "npcEditor.relations": {
    "en": "How they feel about other people",
    "zh-CN": "与其他人物的关系"
  },
  "npcEditor.personalityNote": {
    "en": "These drift on their own as the party treats them well or badly. Neither is a real answer, and most people are unremarkable on most of it.",
    "zh-CN": "队伍对他们的态度会逐渐影响这些倾向。居中也是有效选择；大多数人在多数方面并不极端。"
  },
  "npcEditor.neither": {
    "en": "neither",
    "zh-CN": "居中"
  },
  "npcEditor.very": {
    "en": "very {word}",
    "zh-CN": "非常{word}"
  },
  "npcEditor.traitJoin": {
    "en": ", ",
    "zh-CN": "、"
  },
  "npcEditor.summaryJoin": {
    "en": ". ",
    "zh-CN": "。"
  },
  "npcEditor.relationLabel": {
    "en": "How they stand with {name}",
    "zh-CN": "与 {name} 的关系"
  },
  "npcEditor.why": {
    "en": "why",
    "zh-CN": "原因"
  },
  "npcEditor.dangling": {
    "en": "nobody by that name yet",
    "zh-CN": "尚未记录这个人物"
  },
  "npcEditor.mutual": {
    "en": "they say {relation}",
    "zh-CN": "对方的态度：{relation}"
  },
  "npcEditor.oneSided": {
    "en": "one-sided",
    "zh-CN": "单方面的关系"
  },
  "npcEditor.removeRelation": {
    "en": "Remove relationship with {name}",
    "zh-CN": "移除与 {name} 的关系"
  },
  "npcEditor.graphEmpty": {
    "en": "Write two people who know each other and the map draws itself.",
    "zh-CN": "记录两个相识的人物后，关系图会自动生成。"
  },
  "npcEditor.graph": {
    "en": "Who knows whom",
    "zh-CN": "人物关系图"
  },
  "npcEditor.open": {
    "en": "Open {name}",
    "zh-CN": "打开 {name}"
  },
  "npcEditor.unwritten": {
    "en": "{name} (unwritten)",
    "zh-CN": "{name}（尚未记录）"
  },
  "npcEditor.cast": {
    "en": "The cast",
    "zh-CN": "登场人物"
  },
  "npcEditor.new": {
    "en": "Someone new",
    "zh-CN": "新人物"
  },
  "npcEditor.empty": {
    "en": "Nobody written yet. Everything here also fills itself in as the party meets people.",
    "zh-CN": "尚未记录人物。队伍在冒险中遇到的人物也会自动加入这里。"
  },
  "npcEditor.search": {
    "en": "Search the cast",
    "zh-CN": "搜索人物"
  },
  "npcEditor.searchLabel": {
    "en": "Search the cast by name or alias",
    "zh-CN": "按姓名或别名搜索人物"
  },
  "npcEditor.person": {
    "en": "person",
    "zh-CN": "个人物"
  },
  "npcEditor.people": {
    "en": "people",
    "zh-CN": "个人物"
  },
  "npcEditor.archived": {
    "en": "set aside",
    "zh-CN": "已归档"
  },
  "npcEditor.relationshipOne": {
    "en": "{count} relationship",
    "zh-CN": "{count} 段关系"
  },
  "npcEditor.relationshipMany": {
    "en": "{count} relationships",
    "zh-CN": "{count} 段关系"
  },
  "npcEditor.wants": {
    "en": " · wants: {goal}",
    "zh-CN": " · 目标：{goal}"
  },
  "npcEditor.notFound": {
    "en": "Nobody by that name or alias.",
    "zh-CN": "没有姓名或别名匹配的人物。"
  },
  "npcEditor.axis.drive.name": {
    "en": "Drive",
    "zh-CN": "进取心"
  },
  "npcEditor.axis.drive.low": {
    "en": "content",
    "zh-CN": "安于现状"
  },
  "npcEditor.axis.drive.high": {
    "en": "driven",
    "zh-CN": "积极进取"
  },
  "npcEditor.axis.diligence.name": {
    "en": "Diligence",
    "zh-CN": "细致程度"
  },
  "npcEditor.axis.diligence.low": {
    "en": "slapdash",
    "zh-CN": "粗心"
  },
  "npcEditor.axis.diligence.high": {
    "en": "meticulous",
    "zh-CN": "细致"
  },
  "npcEditor.axis.boldness.name": {
    "en": "Boldness",
    "zh-CN": "胆量"
  },
  "npcEditor.axis.boldness.low": {
    "en": "cautious",
    "zh-CN": "谨慎"
  },
  "npcEditor.axis.boldness.high": {
    "en": "bold",
    "zh-CN": "大胆"
  },
  "npcEditor.axis.warmth.name": {
    "en": "Warmth",
    "zh-CN": "亲和力"
  },
  "npcEditor.axis.warmth.low": {
    "en": "cold",
    "zh-CN": "冷淡"
  },
  "npcEditor.axis.warmth.high": {
    "en": "warm",
    "zh-CN": "热情"
  },
  "npcEditor.axis.empathy.name": {
    "en": "Empathy",
    "zh-CN": "同理心"
  },
  "npcEditor.axis.empathy.low": {
    "en": "callous",
    "zh-CN": "冷漠"
  },
  "npcEditor.axis.empathy.high": {
    "en": "understanding",
    "zh-CN": "善解人意"
  },
  "npcEditor.axis.composure.name": {
    "en": "Composure",
    "zh-CN": "沉着程度"
  },
  "npcEditor.axis.composure.low": {
    "en": "volatile",
    "zh-CN": "情绪多变"
  },
  "npcEditor.axis.composure.high": {
    "en": "unflappable",
    "zh-CN": "镇定自若"
  },
  "npcEditor.relation.-3": {
    "en": "sworn enemy",
    "zh-CN": "死敌"
  },
  "npcEditor.relation.-2": {
    "en": "hostile",
    "zh-CN": "敌对"
  },
  "npcEditor.relation.-1": {
    "en": "wary",
    "zh-CN": "戒备"
  },
  "npcEditor.relation.0": {
    "en": "neutral",
    "zh-CN": "中立"
  },
  "npcEditor.relation.1": {
    "en": "friendly",
    "zh-CN": "友好"
  },
  "npcEditor.relation.2": {
    "en": "close",
    "zh-CN": "亲近"
  },
  "npcEditor.relation.3": {
    "en": "devoted",
    "zh-CN": "忠诚"
  },
  "npcEditor.graphRelation.close": {
    "en": "close",
    "zh-CN": "亲近"
  },
  "npcEditor.graphRelation.friendly": {
    "en": "friendly",
    "zh-CN": "友好"
  },
  "npcEditor.graphRelation.hates": {
    "en": "hates",
    "zh-CN": "憎恨"
  },
  "npcEditor.graphRelation.wary": {
    "en": "wary",
    "zh-CN": "戒备"
  },
  "npcEditor.graphRelation.knows": {
    "en": "knows",
    "zh-CN": "相识"
  },
  "npcEditor.roleName.merchant": {
    "en": "Merchant",
    "zh-CN": "商人"
  },
  "npcEditor.roleName.guard": {
    "en": "Guard",
    "zh-CN": "守卫"
  },
  "npcEditor.roleName.innkeeper": {
    "en": "Innkeeper",
    "zh-CN": "旅店老板"
  },
  "npcEditor.roleName.noble": {
    "en": "Noble",
    "zh-CN": "贵族"
  },
  "npcEditor.roleName.priest": {
    "en": "Priest",
    "zh-CN": "祭司"
  },
  "npcEditor.roleName.scholar": {
    "en": "Scholar",
    "zh-CN": "学者"
  },
  "npcEditor.roleName.thief": {
    "en": "Thief",
    "zh-CN": "窃贼"
  },
  "npcEditor.roleName.soldier": {
    "en": "Soldier",
    "zh-CN": "士兵"
  },
  "npcEditor.roleName.commoner": {
    "en": "Commoner",
    "zh-CN": "平民"
  },
  "npcEditor.roleName.mercenary": {
    "en": "Mercenary",
    "zh-CN": "佣兵"
  },
  "npcEditor.roleName.ruler": {
    "en": "Ruler",
    "zh-CN": "统治者"
  },
  "npcEditor.roleName.outcast": {
    "en": "Outcast",
    "zh-CN": "流放者"
  },
  "npcEditor.roleName.cyberpunk-fixer": {
    "en": "Fixer",
    "zh-CN": "中间人"
  },
  "npcEditor.roleName.cyberpunk-corp-exec": {
    "en": "Corporate exec",
    "zh-CN": "企业高管"
  },
  "npcEditor.roleName.cyberpunk-street-doc": {
    "en": "Street doc",
    "zh-CN": "街头医生"
  },
  "npcEditor.roleName.steampunk-foreman": {
    "en": "Works foreman",
    "zh-CN": "工厂领班"
  },
  "npcEditor.roleName.steampunk-airship-captain": {
    "en": "Airship captain",
    "zh-CN": "飞艇船长"
  },
  "npcEditor.roleName.steampunk-inventor": {
    "en": "Inventor",
    "zh-CN": "发明家"
  },
  "npcEditor.roleName.post-apocalyptic-elder": {
    "en": "Settlement elder",
    "zh-CN": "聚落长老"
  },
  "npcEditor.roleName.post-apocalyptic-water-baron": {
    "en": "Water baron",
    "zh-CN": "水源大亨"
  },
  "npcEditor.roleName.post-apocalyptic-caravan-guard": {
    "en": "Caravan guard",
    "zh-CN": "商队护卫"
  },
  "npcEditor.roleName.horror-cult-elder": {
    "en": "Cult elder",
    "zh-CN": "教团长老"
  },
  "npcEditor.roleName.horror-priest": {
    "en": "Village priest",
    "zh-CN": "村庄祭司"
  },
  "npcEditor.roleName.horror-warden": {
    "en": "Asylum warden",
    "zh-CN": "精神病院院长"
  },
  "npcEditor.roleName.mystery-inspector": {
    "en": "Inspector",
    "zh-CN": "探员"
  },
  "npcEditor.roleName.mystery-socialite": {
    "en": "Socialite",
    "zh-CN": "社交名流"
  },
  "npcEditor.roleName.mystery-informant": {
    "en": "Informant",
    "zh-CN": "线人"
  }
});
