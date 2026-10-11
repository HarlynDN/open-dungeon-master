import { defineMessages } from "./catalog.ts";

// Guided progression and engine-driven moments; no mutation protocol strings.
export const LEVEL_UP_MESSAGES = defineMessages({
  "sessionUi.level.title": {
    "en": "Level {level}!",
    "zh-CN": "{level} 级！"
  },
  "sessionUi.level.done": {
    "en": "Done",
    "zh-CN": "完成"
  },
  "sessionUi.level.close": {
    "en": "Close",
    "zh-CN": "关闭"
  },
  "sessionUi.level.back": {
    "en": "Back",
    "zh-CN": "上一步"
  },
  "sessionUi.level.next": {
    "en": "Next",
    "zh-CN": "下一步"
  },
  "sessionUi.level.confirm": {
    "en": "Confirm level up",
    "zh-CN": "确认升级"
  },
  "sessionUi.level.refused": {
    "en": "The level-up was refused.",
    "zh-CN": "未能完成升级。"
  },
  "sessionUi.level.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "sessionUi.level.atLevel": {
    "en": "{name} is level {level}{classLine}.",
    "zh-CN": "{name}已升至 {level} 级{classLine}。"
  },
  "sessionUi.level.advance": {
    "en": "{name} advances to level {level}{classLine}.",
    "zh-CN": "{name}将升至 {level} 级{classLine}。"
  },
  "sessionUi.level.advanceClass": {
    "en": " as a {class} ({class} level {level})",
    "zh-CN": "，本次提升{class}等级（{class} {level} 级）"
  },
  "sessionUi.level.classLine": {
    "en": " ({class} {level})",
    "zh-CN": "（{class} {level} 级）"
  },
  "sessionUi.level.rollResult": {
    "en": "The server rolled {roll} on the d{die}",
    "zh-CN": "d{die} 的投掷结果为 {roll}"
  },
  "sessionUi.level.maxResult": {
    "en": "The d{die}'s highest face",
    "zh-CN": "d{die} 的最大值"
  },
  "sessionUi.level.averageResult": {
    "en": "The d{die}'s average, {average}",
    "zh-CN": "d{die} 的固定平均值 {average}"
  },
  "sessionUi.level.hpGain": {
    "en": "+{amount} HP",
    "zh-CN": "+{amount} 生命值"
  },
  "sessionUi.level.nextEarned": {
    "en": "The experience already earns level {level} too; take it next, one level at a time.",
    "zh-CN": "现有经验也已足够升至 {level} 级；完成本次后可继续逐级升级。"
  },
  "sessionUi.level.newFeatures": {
    "en": "New at level {level}:",
    "zh-CN": "{level} 级新增能力："
  },
  "sessionUi.level.hp": {
    "en": "Hit points",
    "zh-CN": "生命值"
  },
  "sessionUi.level.also": {
    "en": "Also added",
    "zh-CN": "额外增加"
  },
  "sessionUi.level.rollHelp": {
    "en": "Hit points: this table rolls them. The server rolls the d{die} when you confirm{constitution}; every level adds at least 1.",
    "zh-CN": "本战役通过投骰决定生命值增长。确认升级时投掷 d{die}{constitution}；每级至少增加 1 点。"
  },
  "sessionUi.level.conAdd": {
    "en": ", and adds {modifier} for Constitution",
    "zh-CN": "，再加上体质调整值 {modifier}"
  },
  "sessionUi.level.conFixed": {
    "en": ", {modifier} Constitution",
    "zh-CN": "，体质调整值 {modifier}"
  },
  "sessionUi.level.rollChoice": {
    "en": "Roll the d{die}",
    "zh-CN": "投掷 d{die}"
  },
  "sessionUi.level.range": {
    "en": "{min} to {max} HP",
    "zh-CN": "{min} 至 {max} 点生命值"
  },
  "sessionUi.level.averageChoice": {
    "en": "Take the average instead",
    "zh-CN": "改用固定平均值"
  },
  "sessionUi.level.maxHelp": {
    "en": "Hit points: the d{die}'s highest face, as this table plays",
    "zh-CN": "本战役使用 d{die} 的最大值增加生命值"
  },
  "sessionUi.level.averageHelp": {
    "en": "Hit points: the d{die}'s average, {average}, as this table plays",
    "zh-CN": "本战役使用 d{die} 的固定平均值 {average} 增加生命值"
  },
  "sessionUi.level.primal": {
    "en": "Primal Champion: +4 Strength and Constitution (to 24)",
    "zh-CN": "原初冠军：力量和体质各 +4（上限 24）"
  },
  "sessionUi.level.chooseClass": {
    "en": "Which class takes level {level}? Advance one {name} already has, or multiclass into a new one.",
    "zh-CN": "{level} 级要提升哪个职业？可提升{name}已有的职业，或兼职一个新职业。"
  },
  "sessionUi.level.multiclass": {
    "en": "Multiclass into a new class",
    "zh-CN": "兼职新职业"
  },
  "sessionUi.level.multiclassHelp": {
    "en": "A new class starts at level 1 with SOME of its training: no saving throws, and only the proficiencies the multiclass rules grant.",
    "zh-CN": "新职业从 1 级开始，只获得部分熟练项：不获得豁免熟练，仅获得兼职规则规定的熟练项。"
  },
  "sessionUi.level.grants": {
    "en": "Grants: {grants}",
    "zh-CN": "获得：{grants}"
  },
  "sessionUi.level.requires": {
    "en": "Requires {requirements}",
    "zh-CN": "要求：{requirements}"
  },
  "sessionUi.level.skill": {
    "en": "{class} grants one new skill. Pick it:",
    "zh-CN": "{class}提供一项新技能熟练，请选择："
  },
  "sessionUi.level.asiOne": {
    "en": "{name} is owed an ability score improvement by {class} level {level}: two points, or a feat, each.",
    "zh-CN": "{name}在{class} {level} 级应获得一次属性值提升：可分配 2 点属性，或选择一项专长。"
  },
  "sessionUi.level.asiMany": {
    "en": "{name} is owed {count} ability score improvements by {class} level {level}: two points, or a feat, each.",
    "zh-CN": "{name}在{class} {level} 级应获得 {count} 次属性值提升：每次可分配 2 点属性，或选择一项专长。"
  },
  "sessionUi.level.expertise": {
    "en": "Expertise: pick {count} of {name}'s proficient skills to DOUBLE their proficiency bonus in:",
    "zh-CN": "专精：从{name}已熟练的技能中选择 {count} 项，其熟练加值将翻倍："
  },
  "sessionUi.level.options": {
    "en": "New abilities for {name} to choose. These are real powers, not flavour, so read them before picking.",
    "zh-CN": "为{name}选择新的能力。这些能力会影响实际规则效果，请阅读后再选择。"
  },
  "sessionUi.level.chosen": {
    "en": "{label}: {chosen}/{total} chosen",
    "zh-CN": "{label}：已选 {chosen}/{total}"
  },
  "sessionUi.level.already": {
    "en": "Already known. ",
    "zh-CN": "已掌握。"
  },
  "sessionUi.level.optionReq": {
    "en": "Requires {requirements}. ",
    "zh-CN": "要求：{requirements}。"
  },
  "sessionUi.level.style": {
    "en": "Fighting Style: pick {count} for {name}. The server applies it to every attack from here on.",
    "zh-CN": "战斗风格：为{name}选择 {count} 项。今后的攻击将按所选风格计算。"
  },
  "sessionUi.level.subclass": {
    "en": "At level {level}, every {class} chooses a specialization. Pick one for {name}:",
    "zh-CN": "{class}在 {level} 级选择子职。请为{name}选择："
  },
  "sessionUi.level.subclassHelp": {
    "en": "This choice shapes how {name} plays for the rest of the campaign. Read each one before deciding.",
    "zh-CN": "这个选择会影响{name}之后的玩法。请阅读各子职说明后再决定。"
  },
  "sessionUi.level.full": {
    "en": "full features",
    "zh-CN": "完整能力"
  },
  "sessionUi.level.prose": {
    "en": "description only",
    "zh-CN": "仅有说明"
  },
  "sessionUi.level.noSubclass": {
    "en": "No known specializations for this class; the party lead can set one on the sheet later.",
    "zh-CN": "此职业暂无可选子职；主持人可稍后在角色卡中设置。"
  },
  "sessionUi.level.newSpells": {
    "en": "New spells for {name} at level {level}:",
    "zh-CN": "{name}在职业 {level} 级的新法术："
  },
  "sessionUi.level.cantrips": {
    "en": "Cantrips: choose {count}.",
    "zh-CN": "戏法：选择 {count} 个。"
  },
  "sessionUi.level.cantripHelp": {
    "en": "Small spells you know for good and cast as often as you like.",
    "zh-CN": "掌握后可反复施放的小型法术，不消耗法术位。"
  },
  "sessionUi.level.book": {
    "en": "Spellbook: write {count} new spells.",
    "zh-CN": "法术书：写入 {count} 个新法术。"
  },
  "sessionUi.level.bookHelp": {
    "en": "They are prepared right away while your limit has room; the rest you prepare from your sheet, ready after a long rest.",
    "zh-CN": "准备上限仍有空位时会立即准备；其余法术可在角色卡中准备，并在长休后生效。"
  },
  "sessionUi.level.known": {
    "en": "Spells known: choose up to {count}.",
    "zh-CN": "已知法术：最多选择 {count} 个。"
  },
  "sessionUi.level.knownHelp": {
    "en": "You keep them for good and always have them ready.",
    "zh-CN": "掌握后会保留，并始终可以施放。"
  },
  "sessionUi.level.prepared": {
    "en": "Prepared spells: prepare up to {count} more.",
    "zh-CN": "准备法术：最多再准备 {count} 个。"
  },
  "sessionUi.level.preparedHelp": {
    "en": "They are ready now; after any long rest you can swap them from your sheet.",
    "zh-CN": "这些法术立即可用；每次长休后都可在角色卡中更换。"
  },
  "sessionUi.level.noPicks": {
    "en": "Nothing new to choose at this level: your spells stay as they are.",
    "zh-CN": "本级无需选择新法术，保留现有法术。"
  },
  "sessionUi.level.swap": {
    "en": "Optional: give up one spell you know to learn another in its place.",
    "zh-CN": "可选：放弃一个已知法术，改学另一个。"
  },
  "sessionUi.level.counter.cantrips": {
    "en": "Cantrips",
    "zh-CN": "戏法"
  },
  "sessionUi.level.counter.book": {
    "en": "Spellbook",
    "zh-CN": "法术书"
  },
  "sessionUi.level.counter.known": {
    "en": "Known",
    "zh-CN": "已知"
  },
  "sessionUi.level.counter.prepared": {
    "en": "Prepared",
    "zh-CN": "已准备"
  },
  "sessionUi.level.loading": {
    "en": "Loading the spell list...",
    "zh-CN": "正在加载法术列表……"
  },
  "sessionUi.level.noSpells": {
    "en": "No new spells at this level.",
    "zh-CN": "本级没有新法术。"
  },
  "sessionUi.level.learning": {
    "en": "Learning: ",
    "zh-CN": "正在学习："
  },
  "sessionUi.level.learningCantrip": {
    "en": "{name} (cantrip)",
    "zh-CN": "{name}（戏法）"
  },
  "sessionUi.level.list": {
    "en": ", ",
    "zh-CN": "、"
  },
  "sessionUi.level.open": {
    "en": "You can leave this open and take the level now; it stays open for a later level.",
    "zh-CN": "可暂不完成这个选择，直接升级；之后升级时仍可补选。"
  },
  "sessionUi.level.spell.fullCantrips": {
    "en": "Cantrips full",
    "zh-CN": "戏法已选满"
  },
  "sessionUi.level.spell.cantripRefusal": {
    "en": "That is every new cantrip for this level. Untick one to choose {name}.",
    "zh-CN": "本级的新戏法已选满。如要选择{name}，请先取消一个已选戏法。"
  },
  "sessionUi.level.spell.fullSpells": {
    "en": "All new spells chosen",
    "zh-CN": "新法术已选满"
  },
  "sessionUi.level.spell.spellRefusal": {
    "en": "That is every new spell for this level. Untick one to choose {name}.",
    "zh-CN": "本级的新法术已选满。如要选择{name}，请先取消一个已选法术。"
  },
  "sessionUi.level.spell.school": {
    "en": "Outside your two schools",
    "zh-CN": "不属于规定的两种学派"
  },
  "sessionUi.level.spell.free": {
    "en": "Free with your subclass",
    "zh-CN": "子职额外赠予"
  },
  "sessionUi.level.spell.new": {
    "en": "New",
    "zh-CN": "新增"
  },
  "sessionUi.level.block.dead": {
    "en": "{name} is dead, and the dead gain no levels.",
    "zh-CN": "{name}已死亡，死亡状态下无法升级。"
  },
  "sessionUi.level.block.zero": {
    "en": "{name} is at 0 hit points. A character levels up once they are back on their feet.",
    "zh-CN": "{name}的生命值为 0。恢复后才能升级。"
  },
  "sessionUi.level.block.cap": {
    "en": "No character passes level 20.",
    "zh-CN": "角色最高为 20 级。"
  },
  "sessionUi.level.block.xp": {
    "en": "Level {level} takes {required} experience points and {name} has {xp}. A level is earned in play, or granted by whoever runs the table.",
    "zh-CN": "升至 {level} 级需要 {required} 点经验，{name}目前有 {xp} 点。可在游戏中获得经验，或由主持人授予等级。"
  },
  "sessionUi.level.extra.dwarf": {
    "en": "+1 hill dwarf toughness",
    "zh-CN": "+1 山丘矮人坚韧"
  },
  "sessionUi.level.extra.tough": {
    "en": "+{amount} Tough",
    "zh-CN": "+{amount} 健壮"
  },
  "sessionUi.level.extra.backpay": {
    "en": "+{amount} for the levels already held",
    "zh-CN": "+{amount} 已有等级的补增生命值"
  },
  "sessionUi.level.extra.draconic": {
    "en": "+{amount} Draconic Resilience",
    "zh-CN": "+{amount} 龙族韧性"
  },
  "sessionUi.level.grant.none": {
    "en": "no new proficiencies",
    "zh-CN": "不获得新熟练项"
  },
  "sessionUi.level.grant.classSkill": {
    "en": "one skill from its class list",
    "zh-CN": "一项本职业列表中的技能"
  },
  "sessionUi.level.grant.anySkill": {
    "en": "one skill of your choice",
    "zh-CN": "一项自选技能"
  },
  "sessionUi.level.error.unknown": {
    "en": "Unknown class \"{class}\".",
    "zh-CN": "未知职业“{class}”。"
  },
  "sessionUi.level.error.already": {
    "en": "They already have levels in {class}.",
    "zh-CN": "角色已有{class}等级。"
  },
  "sessionUi.level.error.cap": {
    "en": "At most {count} classes per character.",
    "zh-CN": "每个角色最多拥有 {count} 个职业。"
  },
  "sessionUi.level.error.enter": {
    "en": "Multiclassing into {class} requires {requirements}.",
    "zh-CN": "兼职{class}要求：{requirements}。"
  },
  "sessionUi.level.error.leave": {
    "en": "Leaving {class} for another class requires {requirements} (RAW checks both directions).",
    "zh-CN": "从{class}兼职其他职业要求：{requirements}（兼职前后的职业要求均须满足）。"
  },
  "sessionUi.moment.level": {
    "en": "Level up",
    "zh-CN": "升级"
  },
  "sessionUi.moment.reaches": {
    "en": "{name} reaches level {level}",
    "zh-CN": "{name}升至 {level} 级"
  },
  "sessionUi.moment.long": {
    "en": "A long rest",
    "zh-CN": "长休"
  },
  "sessionUi.moment.short": {
    "en": "A short rest",
    "zh-CN": "短休"
  },
  "sessionUi.moment.restored": {
    "en": "fully restored",
    "zh-CN": "长休结束"
  },
  "sessionUi.moment.hp": {
    "en": "{hp}/{max} hit points",
    "zh-CN": "生命值 {hp}/{max}"
  },
  "sessionUi.moment.rested": {
    "en": "rested",
    "zh-CN": "休息结束"
  },
  "sessionUi.moment.return": {
    "en": "Select anywhere to return to the table",
    "zh-CN": "点击任意位置返回游戏"
  },
  "sessionUi.moment.treasure": {
    "en": "A treasure",
    "zh-CN": "发现珍宝"
  },
  "sessionUi.moment.rare": {
    "en": "A rare find",
    "zh-CN": "发现稀有物品"
  },
  "sessionUi.moment.pack": {
    "en": "Added to your pack",
    "zh-CN": "已放入背包"
  },
  "sessionUi.moment.qty": {
    "en": " x{qty}",
    "zh-CN": " ×{qty}"
  },
  "sessionUi.moment.newPlace": {
    "en": "New place discovered",
    "zh-CN": "发现新地点"
  },
  "sessionUi.moment.arrives": {
    "en": "The party arrives",
    "zh-CN": "队伍抵达"
  },
  "sessionUi.level.grant.simple": {
    "en": "simple weapons",
    "zh-CN": "简易武器"
  },
  "sessionUi.level.grant.martial": {
    "en": "martial weapons",
    "zh-CN": "军用武器"
  },
  "sessionUi.level.grant.instrument": {
    "en": "one musical instrument",
    "zh-CN": "一种乐器"
  },
  "sessionUi.level.schoolRefusal": {
    "en": "A level {level} {subclass} learns {first} and {second} spells, with {limit} other-school spells; this would make {count}. Pick a {first} or {second} spell instead.",
    "zh-CN": "{level} 级{subclass}学习{first}和{second}学派的法术，另可学习 {limit} 个其他学派法术；本次选择后其他学派法术将有 {count} 个。请改选{first}或{second}学派的法术。"
  },
  "sessionUi.level.grantTerm.0": {
    "en": "shortswords",
    "zh-CN": "短剑"
  },
  "sessionUi.level.grantTerm.1": {
    "en": "electronics kit",
    "zh-CN": "电子工具包"
  },
  "sessionUi.level.grantTerm.2": {
    "en": "cybernetics maintenance kit",
    "zh-CN": "义体维护工具包"
  },
  "sessionUi.level.grantTerm.3": {
    "en": "mechanic's tools",
    "zh-CN": "机械师工具"
  },
  "sessionUi.level.grantTerm.4": {
    "en": "chemist's supplies",
    "zh-CN": "化学工具"
  },
  "sessionUi.level.grantTerm.5": {
    "en": "gunsmith's tools",
    "zh-CN": "枪匠工具"
  },
  "sessionUi.level.grantTerm.6": {
    "en": "two musical instruments of your choice",
    "zh-CN": "两种自选乐器"
  },
  "sessionUi.level.grantTerm.7": {
    "en": "trapper's tools",
    "zh-CN": "捕猎工具"
  },
  "sessionUi.level.grantTerm.8": {
    "en": "holy kit",
    "zh-CN": "圣仪工具包"
  },
  "sessionUi.level.grantTerm.9": {
    "en": "improvised repair kit",
    "zh-CN": "简易维修工具包"
  },
  "sessionUi.level.grantTerm.10": {
    "en": "ritual implements",
    "zh-CN": "仪式器具"
  },
  "sessionUi.level.grantTerm.11": {
    "en": "typewriter",
    "zh-CN": "打字机"
  },
  "sessionUi.level.grantTerm.12": {
    "en": "séance kit",
    "zh-CN": "降神会工具包"
  },
  "sessionUi.level.grantTerm.13": {
    "en": "vehicles (air)",
    "zh-CN": "空中载具"
  },
  "sessionUi.level.grantTerm.14": {
    "en": "aether calipers",
    "zh-CN": "以太卡尺"
  }
});
