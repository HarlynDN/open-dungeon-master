import { defineMessages } from "./catalog.ts";

export const ENCOUNTER_PREP_MESSAGES = /*#__PURE__*/ defineMessages({
  "encounterPrep.retry": {"en": "Retry", "zh-CN": "重试"},
  "encounterPrep.fight": {
    "en": "The fight",
    "zh-CN": "遭遇"
  },
  "encounterPrep.nameHint": {
    "en": "Ambush at the ford",
    "zh-CN": "浅滩伏击"
  },
  "encounterPrep.name": {
    "en": "Encounter name",
    "zh-CN": "遭遇名称"
  },
  "encounterPrep.participants": {
    "en": "Who is in it",
    "zh-CN": "参战生物"
  },
  "encounterPrep.rosterHint": {
    "en": "goblin x4\nhobgoblin",
    "zh-CN": "哥布林 x4\n大地精"
  },
  "encounterPrep.roster": {
    "en": "Roster",
    "zh-CN": "敌人队列"
  },
  "encounterPrep.rosterHelp": {
    "en": "One per line, name or slug, optional xN. The same shorthand Start a fight takes, so picking above and typing here are the same thing.",
    "zh-CN": "每行填写一个名称或标识，可用 xN 指定数量。与“开始战斗”使用相同格式，上方选择和直接输入均可。"
  },
  "encounterPrep.where": {
    "en": "Where it happens",
    "zh-CN": "战斗地点"
  },
  "encounterPrep.battlefieldHint": {
    "en": "a rope bridge over a gorge",
    "zh-CN": "横跨峡谷的绳桥"
  },
  "encounterPrep.battlefield": {
    "en": "Battlefield",
    "zh-CN": "战场"
  },
  "encounterPrep.map": {
    "en": "On which map",
    "zh-CN": "使用的地图"
  },
  "encounterPrep.generator": {
    "en": "Generator's choice",
    "zh-CN": "自动生成"
  },
  "encounterPrep.notes": {
    "en": "Notes",
    "zh-CN": "笔记"
  },
  "encounterPrep.noteLabel": {
    "en": "Encounter notes",
    "zh-CN": "遭遇笔记"
  },
  "encounterPrep.noteHint": {
    "en": "Tactics, what they want, when they run.",
    "zh-CN": "战术、目标，以及何时撤退。"
  },
  "encounterPrep.plan": {
    "en": "The plan",
    "zh-CN": "部署计划"
  },
  "encounterPrep.partyEnters": {
    "en": "Party enters",
    "zh-CN": "队伍入口"
  },
  "encounterPrep.placeTip": {
    "en": "Then tap the map where it starts",
    "zh-CN": "随后点击地图上的起点"
  },
  "encounterPrep.linkTip": {
    "en": "Link a prepared map to place it",
    "zh-CN": "关联一张预备地图后即可放置"
  },
  "encounterPrep.slotNameHint": {
    "en": "name",
    "zh-CN": "姓名"
  },
  "encounterPrep.slotName": {
    "en": "{name} name",
    "zh-CN": "{name} 的姓名"
  },
  "encounterPrep.slotHp": {
    "en": "{name} hit points",
    "zh-CN": "{name} 的生命值"
  },
  "encounterPrep.hp": {
    "en": "hp",
    "zh-CN": "生命值"
  },
  "encounterPrep.hiddenTip": {
    "en": "Hidden when the fight opens",
    "zh-CN": "战斗开始时隐藏"
  },
  "encounterPrep.hidden": {
    "en": "Hidden",
    "zh-CN": "隐藏"
  },
  "encounterPrep.seen": {
    "en": "Seen",
    "zh-CN": "可见"
  },
  "encounterPrep.partyEntry": {
    "en": "Where the party comes in",
    "zh-CN": "队伍进入的位置"
  },
  "encounterPrep.slotsEmpty": {
    "en": "Write the roster above and each creature gets a line here.",
    "zh-CN": "填写上方队列后，每个生物会在这里显示一行。"
  },
  "encounterPrep.placeHelp": {
    "en": "Pick a creature above, then tap where it starts. The party goes where the flag says.",
    "zh-CN": "先选择上方的生物，再点击其起点。旗帜标记队伍入口。"
  },
  "encounterPrep.tileHelp": {
    "en": "Tap the tile. Tap the same tile again to clear it.",
    "zh-CN": "点击格子放置，再次点击同一格子可清除。"
  },
  "encounterPrep.noMap": {
    "en": "Link a prepared map above to place each creature on it. Without one the generator seats them.",
    "zh-CN": "关联上方的预备地图后，可逐个放置生物；未关联时自动安排位置。"
  },
  "encounterPrep.worth": {
    "en": "What the fight is worth",
    "zh-CN": "遭遇奖励"
  },
  "encounterPrep.rewards": {
    "en": "Rewards",
    "zh-CN": "奖励"
  },
  "encounterPrep.rewardHint": {
    "en": "120 gp in a locked chest, the captain's signet ring, roll once on Marsh treasure.",
    "zh-CN": "锁箱里的 120 金币、队长的印章戒指，以及一次沼泽宝藏表掷骰。"
  },
  "encounterPrep.phases": {
    "en": "What happens when",
    "zh-CN": "阶段事件"
  },
  "encounterPrep.phaseHint": {
    "en": "When the shaman drops, the wolves flee.",
    "zh-CN": "萨满倒下时，群狼逃离。"
  },
  "encounterPrep.phase": {
    "en": "Phase {count}",
    "zh-CN": "阶段 {count}"
  },
  "encounterPrep.removePhase": {
    "en": "Remove phase",
    "zh-CN": "移除阶段"
  },
  "encounterPrep.addPhase": {
    "en": "Add a phase",
    "zh-CN": "添加阶段"
  },
  "encounterPrep.privateNote": {
    "en": "Rewards and phases land as a note only you can read when the fight is deployed.",
    "zh-CN": "部署遭遇时，奖励和阶段事件会写入仅你可见的笔记。"
  },
  "encounterPrep.unknown": {
    "en": "unknown monster",
    "zh-CN": "未知怪物"
  },
  "encounterPrep.unknownHelp": {
    "en": "Nothing in this world is called \"{name}\", so this cannot be costed.",
    "zh-CN": "此世界中没有名为“{name}”的生物，无法估算难度。"
  },
  "encounterPrep.budgetLabel": {
    "en": "{xp} adjusted XP against a {ceiling} ceiling",
    "zh-CN": "调整后经验值 {xp}，上限 {ceiling}"
  },
  "encounterPrep.budgetOne": {
    "en": "{count} creature, {xp} XP against a {ceiling} ceiling",
    "zh-CN": "{count} 个生物，调整后经验值 {xp}，上限 {ceiling}"
  },
  "encounterPrep.budgetMany": {
    "en": "{count} creatures, {xp} XP against a {ceiling} ceiling",
    "zh-CN": "{count} 个生物，调整后经验值 {xp}，上限 {ceiling}"
  },
  "encounterPrep.thresholds": {
    "en": ". Easy {easy}, medium {medium}, hard {hard}, deadly {deadly}.",
    "zh-CN": "。简单 {easy}、适中 {medium}、困难 {hard}、致命 {deadly}。"
  },
  "encounterPrep.period": {
    "en": ".",
    "zh-CN": "。"
  },
  "encounterPrep.refused": {
    "en": " The engine will refuse this as written.",
    "zh-CN": " 当前难度超出允许上限，无法部署。"
  },
  "encounterPrep.missingMap": {
    "en": "a map no longer in the drawer",
    "zh-CN": "关联的地图已被移除"
  },
  "encounterPrep.fightOne": {
    "en": "fight",
    "zh-CN": "场遭遇"
  },
  "encounterPrep.fightMany": {
    "en": "fights",
    "zh-CN": "场遭遇"
  },
  "encounterPrep.find": {
    "en": "Find a fight",
    "zh-CN": "查找遭遇"
  },
  "encounterPrep.open": {
    "en": "Open",
    "zh-CN": "打开"
  },
  "encounterPrep.deploy": {
    "en": "Deploy",
    "zh-CN": "部署"
  },
  "encounterPrep.duplicate": {
    "en": "Duplicate",
    "zh-CN": "复制"
  },
  "encounterPrep.delete": {
    "en": "Delete",
    "zh-CN": "删除"
  },
  "encounterPrep.onBattlefield": {
    "en": "On {name}",
    "zh-CN": "战场：{name}"
  },
  "encounterPrep.new": {
    "en": "New encounter",
    "zh-CN": "新建遭遇"
  },
  "encounterPrep.empty": {
    "en": "Nothing prepared. Write a roster and it is one button at the table.",
    "zh-CN": "尚无预备遭遇。写好队列后，游戏时即可一键部署。"
  },
  "encounterPrep.searchHint": {
    "en": "Search monsters to add: goblin, owlbear, the boss you built...",
    "zh-CN": "搜索要添加的怪物：哥布林、枭熊或自定义首领……"
  },
  "encounterPrep.searchLabel": {
    "en": "Search monsters for this roster",
    "zh-CN": "搜索队列中的怪物"
  },
  "encounterPrep.searchEmpty": {
    "en": "No monsters matched.",
    "zh-CN": "没有匹配的怪物。"
  },
  "encounterPrep.cr": {
    "en": "CR {cr}",
    "zh-CN": "CR {cr}"
  },
  "encounterPrep.tick.easy": {
    "en": "easy",
    "zh-CN": "简单"
  },
  "encounterPrep.tick.medium": {
    "en": "medium",
    "zh-CN": "适中"
  },
  "encounterPrep.tick.hard": {
    "en": "hard",
    "zh-CN": "困难"
  },
  "encounterPrep.tick.deadly": {
    "en": "deadly",
    "zh-CN": "致命"
  },
  "encounterPrep.tick.ceiling": {
    "en": "ceiling",
    "zh-CN": "上限"
  },
  "encounterPrep.ref.table": {
    "en": "Another table",
    "zh-CN": "另一张随机表"
  },
  "encounterPrep.ref.monster": {
    "en": "A monster",
    "zh-CN": "怪物"
  },
  "encounterPrep.ref.item": {
    "en": "An item",
    "zh-CN": "物品"
  },
  "encounterPrep.ref.npc": {
    "en": "Someone from the cast",
    "zh-CN": "登场人物"
  },
  "encounterPrep.ref.lore": {
    "en": "A lore entry",
    "zh-CN": "资料条目"
  },
  "encounterPrep.ref.kind": {
    "en": "What kind of thing the row is",
    "zh-CN": "此行引用的类型"
  },
  "encounterPrep.ref.itemLabel": {
    "en": "Find an item to add as a row",
    "zh-CN": "查找要引用的物品"
  },
  "encounterPrep.ref.itemHint": {
    "en": "Potion of Healing",
    "zh-CN": "治疗药水"
  },
  "encounterPrep.ref.mine": {
    "en": "One of yours",
    "zh-CN": "你的自定义怪物"
  },
  "encounterPrep.ref.monsterLabel": {
    "en": "Find a monster in the catalogue to add as a row",
    "zh-CN": "查找要引用的内置怪物"
  },
  "encounterPrep.ref.monsterHint": {
    "en": "wolf",
    "zh-CN": "狼"
  },
  "encounterPrep.ref.add": {
    "en": "Add a row for",
    "zh-CN": "添加引用行"
  },
  "encounterPrep.ref.reading": {
    "en": "Reading...",
    "zh-CN": "正在读取……"
  },
  "encounterPrep.ref.empty": {
    "en": "Nothing of that kind in this workshop yet.",
    "zh-CN": "工坊中尚无此类条目。"
  },
  "encounterPrep.loadFailed": {
    "en": "{what} did not load. {reason}",
    "zh-CN": "{what}加载失败。{reason}"
  },
  "encounterPrep.load.tables": {
    "en": "The tables",
    "zh-CN": "随机表"
  },
  "encounterPrep.load.cast": {
    "en": "The cast",
    "zh-CN": "登场人物"
  },
  "encounterPrep.load.lore": {
    "en": "The lore",
    "zh-CN": "资料"
  },
  "encounterPrep.load.bestiary": {
    "en": "The bestiary",
    "zh-CN": "怪物图鉴"
  },
  "encounterPrep.load.monsterSearch": {
    "en": "The monster search",
    "zh-CN": "怪物搜索"
  },
  "encounterPrep.status": {
    "en": "The server answered {status}.",
    "zh-CN": "服务器返回 {status}。"
  }
});
