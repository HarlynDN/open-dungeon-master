import { defineMessages } from "./catalog.ts";

export const ABILITY_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "abilityUi.diceFaces": { "en": "Rolled {faces}; the {dropped} is set aside", "zh-CN": "掷出 {faces}；其中点数 {dropped} 的骰子被去掉" },
  "abilityUi.diceEmpty": { "en": "Not rolled yet", "zh-CN": "尚未掷骰" },
  "abilityUi.asiAbility": { "en": "ability score", "zh-CN": "属性值" },
  "abilityUi.gotIt": { "en": "Got it", "zh-CN": "明白了" },
  "abilityUi.scores": {
    "en": "Ability scores",
    "zh-CN": "属性值"
  },
  "abilityUi.standard": {
    "en": "Standard array",
    "zh-CN": "标准数组"
  },
  "abilityUi.pointbuy": {
    "en": "Point buy",
    "zh-CN": "购点法"
  },
  "abilityUi.roll": {
    "en": "Roll 4d6",
    "zh-CN": "掷 4d6"
  },
  "abilityUi.threeWays": {
    "en": "Three ways",
    "zh-CN": "三种分配方式"
  },
  "abilityUi.chosen": {
    "en": "chosen",
    "zh-CN": "已选择"
  },
  "abilityUi.about": {
    "en": "About {method}",
    "zh-CN": "关于{method}"
  },
  "abilityUi.waysFallback": {
    "en": "the three ways",
    "zh-CN": "三种分配方式"
  },
  "abilityUi.standardInfo": {
    "en": "Everyone starts with the same six numbers: {numbers}. You decide which ability gets which. Nothing is left to luck, and no character is accidentally weaker than the rest of the party. This is the safe choice if you are new.",
    "zh-CN": "所有人从同样的六个数值开始：{numbers}。由你决定每项属性使用哪个数值，不依赖运气，也不会因随机结果而让角色明显弱于其他队友。初次游玩时，这是稳妥的选择。"
  },
  "abilityUi.pointbuyInfo": {
    "en": "You spend 27 points raising each score from 8. The higher a score climbs the more each step costs, so a character with one towering ability pays for it with weak ones. Fair like the standard array, but you choose the shape.",
    "zh-CN": "你有 27 点预算，每项属性从 8 开始提升。数值越高，继续提升的花费越大；某项属性特别突出，往往意味着其他属性较弱。它和标准数组一样公平，但分配方式由你决定。"
  },
  "abilityUi.rollInfo": {
    "en": "Roll four six-sided dice six times, dropping the lowest each time, then place the six totals on the abilities you choose. It can hand you a hero far above the standard array, or well below it. {rule} Some tables love the swing; ask yours before choosing it.",
    "zh-CN": "掷四枚六面骰，共掷六次，每次去掉最低的一枚，再将六个总点数分配给各项属性。结果可能远高于标准数组，也可能明显偏低。{rule} 有些团喜欢这种起伏；选择前请和你的团确认。"
  },
  "abilityUi.rerollRuleNone": {
    "en": "The six are yours to keep: this server allows no second throw.",
    "zh-CN": "这六个结果需要保留：本服务器不允许再次掷骰。"
  },
  "abilityUi.rerollRuleAllowed": {
    "en": "The six are yours to keep: you may throw again only if they add up to less than {below}.",
    "zh-CN": "这六个结果需要保留：只有总和低于 {below} 时，才能重新掷骰。"
  },
  "abilityUi.pointsLeft": {
    "en": "{count} points left",
    "zh-CN": "剩余 {count} 点"
  },
  "abilityUi.dropLowest": {
    "en": "4d6 drop lowest",
    "zh-CN": "4d6 去掉最低骰"
  },
  "abilityUi.placed": {
    "en": "{count} / 6 placed",
    "zh-CN": "已分配 {count} / 6"
  },
  "abilityUi.reroll": {
    "en": "Reroll",
    "zh-CN": "重新掷骰"
  },
  "abilityUi.rerollTitleOpen": {
    "en": "These add up to less than {below}, so you may throw again",
    "zh-CN": "总和低于 {below}，可以重新掷骰"
  },
  "abilityUi.rerollTitleNone": {
    "en": "This server allows no second throw",
    "zh-CN": "本服务器不允许再次掷骰"
  },
  "abilityUi.rerollTitleClosed": {
    "en": "A reroll opens only when the six add up to less than {below}",
    "zh-CN": "只有六个结果的总和低于 {below} 时，才能重新掷骰"
  },
  "abilityUi.openPool": {
    "en": "Your rolled six ({numbers}) stay on record until a character uses them. Choose Roll 4d6 to see them.",
    "zh-CN": "已保存你的六个掷骰结果（{numbers}），直到某个角色使用它们为止。选择“掷 4d6”即可查看。"
  },
  "abilityUi.baseHintOne": {
    "en": "These are your base scores, the same at every level. Your level has earned {improvements} on top of them; pick those in the section below, and each Final here counts them.",
    "zh-CN": "这些是基础属性值，不随等级改变。当前等级还允许你获得{improvements}；请在下方选择，这里的最终值会计入它们。"
  },
  "abilityUi.improvementsOne": {
    "en": "{count} ability score improvement",
    "zh-CN": "{count} 次属性值提升"
  },
  "abilityUi.baseHintMany": {
    "en": "These are your base scores, the same at every level. Your level has earned {improvements} on top of them; pick those in the section below, and each Final here counts them.",
    "zh-CN": "这些是基础属性值，不随等级改变。当前等级还允许你获得{improvements}；请在下方选择，这里的最终值会计入它们。"
  },
  "abilityUi.improvementsMany": {
    "en": "{count} ability score improvements",
    "zh-CN": "{count} 次属性值提升"
  },
  "abilityUi.sixThrows": {
    "en": "Your six throws",
    "zh-CN": "你的六个掷骰结果"
  },
  "abilityUi.throwPlaced": {
    "en": "Throw of {total}, on {ability}",
    "zh-CN": "点数 {total}，已分配给{ability}"
  },
  "abilityUi.throwFree": {
    "en": "Throw of {total}, not placed",
    "zh-CN": "点数 {total}，尚未分配"
  },
  "abilityUi.fromSheet": {
    "en": "from your sheet",
    "zh-CN": "来自角色卡"
  },
  "abilityUi.inHand": {
    "en": "in hand",
    "zh-CN": "已选中"
  },
  "abilityUi.free": {
    "en": "free",
    "zh-CN": "未分配"
  },
  "abilityUi.rollingAir": {
    "en": "The dice are in the air…",
    "zh-CN": "骰子正在滚动……"
  },
  "abilityUi.kept": {
    "en": "Your kept roll.",
    "zh-CN": "已保留的掷骰结果。"
  },
  "abilityUi.keptDate": {
    "en": "Your kept roll from {date}.",
    "zh-CN": "已保留 {date} 的掷骰结果。"
  },
  "abilityUi.total": {
    "en": "Total {total}",
    "zh-CN": "总和 {total}"
  },
  "abilityUi.under": {
    "en": "Under {below}: you may throw all six again.",
    "zh-CN": "低于 {below}：可以重新掷全部六次。"
  },
  "abilityUi.noSecond": {
    "en": "This server allows no second throw. These six are yours.",
    "zh-CN": "本服务器不允许再次掷骰。请使用这六个结果。"
  },
  "abilityUi.keptUnder": {
    "en": "It stays until a character uses it; a reroll opens only under {below}.",
    "zh-CN": "结果会保留到某个角色使用为止；只有总和低于 {below} 时才能重掷。"
  },
  "abilityUi.closedUnder": {
    "en": "A reroll opens only under {below}. These six are yours.",
    "zh-CN": "只有总和低于 {below} 时才能重掷。请使用这六个结果。"
  },
  "abilityUi.tapAbility": {
    "en": "Now tap the ability that should get it.",
    "zh-CN": "现在点击要使用这个数值的属性。"
  },
  "abilityUi.tapThrow": {
    "en": "Tap a throw, then an ability, or drag it into place.",
    "zh-CN": "点击一个掷骰结果，再点击属性；也可以拖动分配。"
  },
  "abilityUi.swapPlaced": {
    "en": "Tap or drag a placed score to swap it with another.",
    "zh-CN": "点击或拖动已分配的数值，即可与另一项交换。"
  },
  "abilityUi.poolEmptyTitle": {
    "en": "Six throws of four dice",
    "zh-CN": "四枚骰子，共掷六次"
  },
  "abilityUi.poolEmptyInfo": {
    "en": "Each throw keeps its best three. All six land at once, then you decide which ability gets which.",
    "zh-CN": "每次保留点数最高的三枚。六个结果会一起出现，再由你决定如何分配。"
  },
  "abilityUi.rolling": {
    "en": "Rolling...",
    "zh-CN": "正在掷骰……"
  },
  "abilityUi.rollDice": {
    "en": "Roll the dice",
    "zh-CN": "掷骰"
  },
  "abilityUi.serverKeeps": {
    "en": "The server throws the dice and keeps them, so a rolled hero is one the table can trust.",
    "zh-CN": "由服务器掷骰并保存结果，确保团内可以核实角色的属性来源。"
  },
  "abilityUi.racialBonus": {
    "en": "+{bonus} racial",
    "zh-CN": "+{bonus} 种族加值"
  },
  "abilityUi.final": {
    "en": "Final",
    "zh-CN": "最终值"
  },
  "abilityUi.gain": {
    "en": "+{amount} {source}",
    "zh-CN": "+{amount} {source}"
  },
  "abilityUi.gainCapped": {
    "en": "+{amount} {source} (at its cap)",
    "zh-CN": "+{amount} {source}（已达上限）"
  },
  "abilityUi.gainLevel": {
    "en": "at level {level}",
    "zh-CN": "{level} 级提升"
  },
  "abilityUi.primalChampion": {
    "en": "Primal Champion",
    "zh-CN": "原初勇士"
  },
  "abilityUi.socketHeld": {
    "en": "{ability} holds {score}. {action}",
    "zh-CN": "{ability}为 {score}。{action}"
  },
  "abilityUi.socketReturn": {
    "en": "Tap again to send it back to the tray",
    "zh-CN": "再次点击可将数值放回骰池"
  },
  "abilityUi.socketSwap": {
    "en": "Tap to swap",
    "zh-CN": "点击交换"
  },
  "abilityUi.socketPick": {
    "en": "Tap to pick it up",
    "zh-CN": "点击选取"
  },
  "abilityUi.socketPlace": {
    "en": "Place the held throw on {ability}",
    "zh-CN": "将选中的掷骰结果分配给{ability}"
  },
  "abilityUi.socketEmpty": {
    "en": "{ability} is empty",
    "zh-CN": "{ability}尚未分配"
  },
  "abilityUi.place": {
    "en": "Place",
    "zh-CN": "放置"
  },
  "abilityUi.scoreGroup": {
    "en": "{ability} score",
    "zh-CN": "{ability}属性值"
  },
  "abilityUi.scoreAvailable": {
    "en": "{ability} {score}",
    "zh-CN": "{ability} {score}"
  },
  "abilityUi.scoreTaken": {
    "en": "{ability} {score}, held by another ability",
    "zh-CN": "{ability} {score}，当前由另一项属性使用"
  },
  "abilityUi.lower": {
    "en": "Lower {ability}",
    "zh-CN": "降低{ability}"
  },
  "abilityUi.raise": {
    "en": "Raise {ability}",
    "zh-CN": "提高{ability}"
  },
  "abilityUi.cost": {
    "en": "costs {cost}",
    "zh-CN": "花费 {cost}"
  },
  "abilityUi.yourScores": {
    "en": "Your scores",
    "zh-CN": "你的属性值"
  },
  "abilityUi.head.ability": {
    "en": "Ability",
    "zh-CN": "属性"
  },
  "abilityUi.head.base": {
    "en": "Base",
    "zh-CN": "基础"
  },
  "abilityUi.head.racial": {
    "en": "Racial",
    "zh-CN": "种族"
  },
  "abilityUi.head.added": {
    "en": "Added",
    "zh-CN": "提升"
  },
  "abilityUi.head.final": {
    "en": "Final",
    "zh-CN": "最终"
  },
  "abilityUi.head.mod": {
    "en": "Mod",
    "zh-CN": "调整值"
  },
  "abilityUi.lead.standard": {
    "en": "The same six numbers every hero starts from, placed your way.",
    "zh-CN": "每位英雄都从相同的六个数值开始，由你分配。"
  },
  "abilityUi.lead.pointbuy": {
    "en": "Twenty-seven points, spent your way.",
    "zh-CN": "由你分配二十七点购点预算。"
  },
  "abilityUi.lead.roll": {
    "en": "Six throws of four dice, the lowest set aside, placed your way.",
    "zh-CN": "四枚骰子共掷六次，每次去掉最低的一枚，再由你分配。"
  },
  "abilityUi.summaryWho": {
    "en": "{lead} Your highest is {ability} at {score}. As {who}, that is the shape of the character you just made.",
    "zh-CN": "{lead}最高的是{ability}，最终值为 {score}。这是你刚创建的{who}的属性分布。"
  },
  "abilityUi.summaryNoWho": {
    "en": "{lead} Your highest is {ability} at {score}. That is the shape of the character you just made.",
    "zh-CN": "{lead}最高的是{ability}，最终值为 {score}。这就是刚创建的角色的属性分布。"
  },
  "abilityUi.hpTitle": {
    "en": "How your health is worked out",
    "zh-CN": "生命值如何计算"
  },
  "abilityUi.hpButton": {
    "en": "How is my health worked out?",
    "zh-CN": "我的生命值如何计算？"
  },
  "abilityUi.hpIntro": {
    "en": "At first level you take the best your hit die can give, then add your Constitution modifier.",
    "zh-CN": "1 级时，取生命骰的最大点数，再加上体质调整值。"
  },
  "abilityUi.hpHitMax": {
    "en": "Hit die max",
    "zh-CN": "生命骰最大值"
  },
  "abilityUi.hpConMod": {
    "en": "Con mod",
    "zh-CN": "体质调整值"
  },
  "abilityUi.hpLevels": {
    "en": "Levels 2 to {level}",
    "zh-CN": "2 至 {level} 级"
  },
  "abilityUi.hpMax": {
    "en": "Max hp",
    "zh-CN": "生命值上限"
  },
  "abilityUi.hpStarting": {
    "en": "Starting hp",
    "zh-CN": "初始生命值"
  },
  "abilityUi.hpFull": {
    "en": "full health",
    "zh-CN": "满生命值"
  },
  "abilityUi.hpBonus": {
    "en": "Includes +{bonus} per level from your lineage.",
    "zh-CN": "已计入种族带来的每级 +{bonus} 加值。"
  },
  "abilityUi.hpStep1": {
    "en": "A {class} rolls a d{die} for health. At first level you do not roll it: you take the best it can give.",
    "zh-CN": "{class}使用 d{die} 生命骰。1 级时不掷骰，直接取最大点数。"
  },
  "abilityUi.hpStep2": {
    "en": "Your Constitution of {con} is worth {modifier}, and that applies to every level you gain.",
    "zh-CN": "体质 {con} 对应 {modifier} 调整值，每个等级都会计入。"
  },
  "abilityUi.hpLaterOne": {
    "en": "Each level after the first adds the die's average ({average}) plus that modifier, so {levels} more level adds {later}. You begin on {total}.",
    "zh-CN": "1 级之后，每级增加生命骰平均值（{average}）加上该调整值，因此后续 {levels} 级共增加 {later}。你的初始生命值为 {total}。"
  },
  "abilityUi.hpLaterMany": {
    "en": "Each level after the first adds the die's average ({average}) plus that modifier, so {levels} more levels add {later}. You begin on {total}.",
    "zh-CN": "1 级之后，每级增加生命骰平均值（{average}）加上该调整值，因此后续 {levels} 级共增加 {later}。你的初始生命值为 {total}。"
  },
  "abilityUi.hpFirst": {
    "en": "So you begin on {total}. Rest fully and you are back to it.",
    "zh-CN": "所以初始生命值为 {total}。完成充分休息后可恢复到该数值。"
  },
  "abilityUi.hpOverride": {
    "en": "Your table set a different number: the last step has {override} typed into Max HP, so that is what the sheet will use.",
    "zh-CN": "团里指定了其他数值：最后一步的生命值上限填写了 {override}，角色卡将使用该数值。"
  },
  "abilityUi.hpCanOverride": {
    "en": "Your table can set a different number instead. The last step takes a Max HP override, and the builder stops suggesting once you type one.",
    "zh-CN": "团里也可以指定其他数值。最后一步可填写生命值上限；填写后，创建器会停止自动建议。"
  },
  "abilityUi.asiTitle": {
    "en": "Ability score improvements",
    "zh-CN": "属性值提升"
  },
  "abilityUi.asiEarnedOne": {
    "en": "Level {level}: {count} ability score improvement earned",
    "zh-CN": "{level} 级：获得 {count} 次属性值提升"
  },
  "abilityUi.asiEarnedMany": {
    "en": "Level {level}: {count} ability score improvements earned",
    "zh-CN": "{level} 级：获得 {count} 次属性值提升"
  },
  "abilityUi.toPick": {
    "en": "{count} to pick",
    "zh-CN": "还需选择 {count} 次"
  },
  "abilityUi.allPicked": {
    "en": "All picked",
    "zh-CN": "已全部选择"
  },
  "abilityUi.asiInfo": {
    "en": "This is how higher-level characters raise their stats. Each earned level grants +2 to one {ability}, +1 to two of them, or a feat. Scores cap at {cap}.",
    "zh-CN": "高等级角色通过这种方式提升属性。每次获得提升时，可将一项{ability}提高 +2、两项各提高 +1，或选择一个专长。属性上限为 {cap}。"
  },
  "abilityUi.assignFirst": {
    "en": "Assign all six ability scores first.",
    "zh-CN": "请先分配全部六项属性值。"
  },
  "abilityUi.slot": {
    "en": "Level {level} improvement",
    "zh-CN": "{level} 级属性值提升"
  },
  "abilityUi.taken": {
    "en": "Taken in play",
    "zh-CN": "已在游玩中选择"
  },
  "abilityUi.takenInfo": {
    "en": "Chosen at the table when this character levelled up, so it is already in the scores above. A feat taken with it stays in the feats list.",
    "zh-CN": "该角色在团内升级时已作出选择，效果已计入上方属性值。通过这次提升获得的专长会保留在专长列表中。"
  },
  "abilityUi.mode.plus2": {
    "en": "+2 one ability",
    "zh-CN": "一项属性 +2"
  },
  "abilityUi.mode.plus1x2": {
    "en": "+1 two abilities",
    "zh-CN": "两项属性各 +1"
  },
  "abilityUi.mode.feat": {
    "en": "Feat",
    "zh-CN": "专长"
  },
  "abilityUi.plus2To": {
    "en": "+2 to",
    "zh-CN": "提高 +2 的属性"
  },
  "abilityUi.firstPlus1": {
    "en": "First +1",
    "zh-CN": "第一项 +1"
  },
  "abilityUi.secondPlus1": {
    "en": "Second +1",
    "zh-CN": "第二项 +1"
  },
  "abilityUi.abilityOption": {
    "en": "{ability} ({score}{cap})",
    "zh-CN": "{ability}（{score}{cap}）"
  },
  "abilityUi.atCap": {
    "en": ", at cap",
    "zh-CN": "，已达上限"
  },
  "abilityUi.removeFeat": {
    "en": "Remove {feat}",
    "zh-CN": "移除{feat}"
  },
  "abilityUi.searchFeat": {
    "en": "Search feats (e.g. alert, tough)",
    "zh-CN": "搜索专长（如：警觉、健壮）"
  },
  "abilityUi.browseFeats": {
    "en": "Browse every feat",
    "zh-CN": "浏览所有专长"
  },
  "abilityUi.allFeats": {
    "en": "All feats",
    "zh-CN": "全部专长"
  },
  "abilityUi.featRaises": {
    "en": "{feat} raises by 1",
    "zh-CN": "{feat}提高 1 点的属性"
  },
  "abilityUi.featRaisesLabel": {
    "en": "{feat} raises",
    "zh-CN": "{feat}提升的属性"
  },
  "abilityUi.featSummary": {
    "en": "Feat: {feat}{raise}",
    "zh-CN": "专长：{feat}{raise}"
  },
  "abilityUi.transition": {
    "en": "{ability} {before} to {after} ({modifier})",
    "zh-CN": "{ability}从 {before} 提高至 {after}（{modifier}）"
  },
  "abilityUi.raiseDetail": {
    "en": ", {transition}",
    "zh-CN": "，{transition}"
  },
  "abilityUi.pickAsi": {
    "en": "Pick +2, two +1s, or search a feat above.",
    "zh-CN": "选择一项 +2、两项各 +1，或在上方搜索专长。"
  },
  "abilityUi.errorRoll": {
    "en": "The server could not roll the dice. Try again.",
    "zh-CN": "服务器未能完成掷骰，请重试。"
  },
  "abilityUi.errorNetwork": {
    "en": "Could not reach the server to roll the dice.",
    "zh-CN": "无法连接服务器进行掷骰。"
  },
  "abilityUi.errorKind": {
    "en": "Say which dice to roll: the ability scores, or a class's starting wealth at a table.",
    "zh-CN": "请选择要掷的骰子：属性值，或战役中某职业的初始财富。"
  },
  "abilityUi.errorSession": {
    "en": "Not logged in.",
    "zh-CN": "请先登录。"
  },
  "abilityUi.errorDetails": {
    "en": "{source}",
    "zh-CN": "掷骰失败：{source}"
  }
});
