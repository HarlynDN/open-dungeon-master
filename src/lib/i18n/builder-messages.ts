import { defineMessages } from "./catalog.ts";

export const BUILDER_MESSAGES = /*#__PURE__*/ defineMessages({
  "builderGate.name": {
    "en": "Give your character a name.",
    "zh-CN": "请为角色起一个名字。"
  },
  "builderGate.backgroundSkills": {
    "en": "Pick your {background} skill proficiencies first.",
    "zh-CN": "请先选择{background}提供的技能熟练项。"
  },
  "builderGate.race": {
    "en": "Pick a race.",
    "zh-CN": "请选择一个种族。"
  },
  "builderGate.languages": {
    "en": "Pick {count} more languages first.",
    "zh-CN": "请先再选择 {count} 门语言。"
  },
  "builderGate.racialAsi": {
    "en": "Pick which abilities your {race} bonus raises first.",
    "zh-CN": "请先选择{race}的种族加值提升哪些属性。"
  },
  "builderGate.racialSkills": {
    "en": "Pick your {race} skill proficiencies first.",
    "zh-CN": "请先选择{race}提供的技能熟练项。"
  },
  "builderGate.racialTool": {
    "en": "Pick your {race} tool proficiency first.",
    "zh-CN": "请先选择{race}提供的工具熟练项。"
  },
  "builderGate.racialCantrip": {
    "en": "Pick your {race} cantrip first.",
    "zh-CN": "请先选择{race}提供的戏法。"
  },
  "builderGate.racialFeat": {
    "en": "Pick your {race} feat first.",
    "zh-CN": "请先选择{race}提供的专长。"
  },
  "builderGate.ancestry": {
    "en": "Pick your {race}'s draconic ancestry first.",
    "zh-CN": "请先选择{race}的龙族血统。"
  },
  "builderGate.repeatedSkills": {
    "en": "Your race and background both give the same skill; pick {count} other skills in its place.",
    "zh-CN": "种族与背景提供了重复的技能；请另选 {count} 项技能替代重复项。"
  },
  "builderGate.class": {
    "en": "Pick a class.",
    "zh-CN": "请选择一个职业。"
  },
  "builderGate.classSkills": {
    "en": "Pick {count} more class skills.",
    "zh-CN": "请再选择 {count} 项职业技能。"
  },
  "builderGate.tools": {
    "en": "Pick {count} more {category} for your tool proficiency.",
    "zh-CN": "请再选择 {count} 项{category}作为工具熟练项。"
  },
  "builderGate.subclass": {
    "en": "Pick a subclass: a {class} chooses one at level {level}.",
    "zh-CN": "请选择一个子职业：{class}在 {level} 级时需要选择子职业。"
  },
  "builderGate.styles": {
    "en": "Pick {count} fighting styles.",
    "zh-CN": "请选择 {count} 个战斗风格。"
  },
  "builderGate.expertise": {
    "en": "Pick {count} more expertise skills.",
    "zh-CN": "请再选择 {count} 项专精技能。"
  },
  "builderGate.options": {
    "en": "Pick {count} more {category}.",
    "zh-CN": "请再选择 {count} 项{category}。"
  },
  "builderGate.cantripMore": {
    "en": "Pick {count} more cantrips.",
    "zh-CN": "请再选择 {count} 个戏法。"
  },
  "builderGate.cantripLess": {
    "en": "Remove {count} cantrips: a {class} knows {limit} at this level.",
    "zh-CN": "请移除 {count} 个戏法：{class}在当前等级最多掌握 {limit} 个戏法。"
  },
  "builderGate.bookMore": {
    "en": "Write {count} more spells in your spellbook.",
    "zh-CN": "请再将 {count} 个法术加入法术书。"
  },
  "builderGate.bookLess": {
    "en": "Remove {count} spells from your spellbook: a level {level} wizard starts with {limit}.",
    "zh-CN": "请从法术书移除 {count} 个法术：{level} 级法师创建时的法术书包含 {limit} 个法术。"
  },
  "builderGate.prepareBook": {
    "en": "Prepare {count} more spells from your spellbook.",
    "zh-CN": "请从法术书中再准备 {count} 个法术。"
  },
  "builderGate.spellMore": {
    "en": "Pick {count} more spells ({category}).",
    "zh-CN": "请再选择 {count} 个法术（{category}）。"
  },
  "builderGate.spellLess": {
    "en": "Remove {count} spells: the limit is {limit} {category}.",
    "zh-CN": "请移除 {count} 个法术：{category}的数量上限为 {limit}。"
  },
  "builderGate.scores": {
    "en": "Assign all six ability scores first.",
    "zh-CN": "请先分配全部六项属性值。"
  },
  "builderGate.standard": {
    "en": "The standard array is {scores}, each used once. Place each number on one ability.",
    "zh-CN": "标准数组为 {scores}，每个数值只能使用一次。请将每个数值分配给一项属性。"
  },
  "builderGate.pointRange": {
    "en": "A point buy score runs from {minimum} to {maximum}; {score} is outside it.",
    "zh-CN": "购点法的基础属性值必须在 {minimum} 至 {maximum} 之间；{score} 超出了范围。"
  },
  "builderGate.pointBudget": {
    "en": "Point buy is {over} points over its {budget}. Lower a score first.",
    "zh-CN": "购点法已超出 {budget} 点预算，共超出 {over} 点。请先降低一项属性值。"
  },
  "builderGate.roll": {
    "en": "Rolled scores are the six totals thrown, each placed on one ability. Roll the dice, then place all six.",
    "zh-CN": "掷骰属性使用实际掷出的六个总值，每个总值分配给一项属性。请先掷骰，再分配全部六个总值。"
  },
  "builderGate.asi": {
    "en": "Resolve your level {level} ability score improvement first.",
    "zh-CN": "请先完成 {level} 级的属性值提升选择。"
  },
  "builderGate.spellWarning": {
    "en": "{name} has no {casting} selected and will start unable to cast. Press again to continue anyway.",
    "zh-CN": "{name}尚未选择任何{casting}，开始游玩时将无法施法。若仍要继续，请再次点击提交。"
  },
  "builder.feedbackPending": {
    "en": "Untranslated builder instruction: {source}",
    "zh-CN": "向导提示（中文翻译待补）：{source}"
  },
  "builder.moreEquipmentProblems": {
    "en": "{first} ({count} more listed under Equipment.)",
    "zh-CN": "{first}（装备区域还列出了 {count} 条问题。）"
  },
  "builder.character": {
    "en": "This character",
    "zh-CN": "这个角色"
  },
  "builder.newCharacter": {
    "en": "New character",
    "zh-CN": "新建角色"
  },
  "builder.yourCharacter": {
    "en": "your character",
    "zh-CN": "你的角色"
  },
  "builder.summary": {
    "en": "{race} {class} · level {level} · d{die}",
    "zh-CN": "{race} {class} · {level} 级 · d{die}"
  },
  "builder.portrait": {
    "en": "Portrait for {name}",
    "zh-CN": "{name}的肖像"
  },
  "builder.loading": {
    "en": "Loading character options",
    "zh-CN": "正在加载角色选项"
  },
  "builder.identity": {
    "en": "Identity",
    "zh-CN": "身份"
  },
  "builder.identityTitle": {
    "en": "Who is this?",
    "zh-CN": "这是谁？"
  },
  "builder.ancestry": {
    "en": "Ancestry",
    "zh-CN": "种族"
  },
  "builder.ancestryBlurb": {
    "en": "Where are they from, and what does that grant?",
    "zh-CN": "角色来自哪个种族，能获得哪些能力？"
  },
  "builder.continueRace": {
    "en": "Continue as {race}",
    "zh-CN": "以{race}身份继续"
  },
  "builder.calling": {
    "en": "Calling",
    "zh-CN": "职业"
  },
  "builder.callingBlurb": {
    "en": "The class decides how this character plays.",
    "zh-CN": "职业决定角色的主要能力与游玩方式。"
  },
  "builder.abilities": {
    "en": "Ability scores",
    "zh-CN": "属性值"
  },
  "builder.abilitiesBlurb": {
    "en": "How do you roll?",
    "zh-CN": "如何生成属性值？"
  },
  "builder.spellsGear": {
    "en": "Spells and gear",
    "zh-CN": "法术与装备"
  },
  "builder.gear": {
    "en": "Gear",
    "zh-CN": "装备"
  },
  "builder.spellsGearBlurb": {
    "en": "Pick what they can cast, then arm your hero.",
    "zh-CN": "先选择能施放的法术，再为角色配备装备。"
  },
  "builder.gearBlurb": {
    "en": "Arm your hero.",
    "zh-CN": "为角色配备装备。"
  },
  "builder.finish": {
    "en": "Finishing touches",
    "zh-CN": "最后完善"
  },
  "builder.finishBlurb": {
    "en": "Who have you made?",
    "zh-CN": "看看你创造的角色。"
  },
  "builder.choose": {
    "en": "Choose...",
    "zh-CN": "请选择…"
  },
  "builder.recommended": {
    "en": "Recommended for this setting",
    "zh-CN": "推荐用于此世界设定"
  },
  "builder.remove": {
    "en": "Remove {label}",
    "zh-CN": "移除{label}"
  },
  "builder.dropEntry": {
    "en": "{kind} {name}",
    "zh-CN": "{kind}：{name}"
  },
  "builder.droppedStored": {
    "en": "Stored picks are no longer on offer: {picks}.{where}",
    "zh-CN": "已保存的选项不再符合当前条件：{picks}。{where}"
  },
  "builder.droppedPack": {
    "en": "The content pack's rows set aside {picks}.{where}",
    "zh-CN": "资料包更新后，以下选择已被移除：{picks}。{where}"
  },
  "builder.droppedChange": {
    "en": "Changing the {reason} set aside {picks}: they no longer fit.{where}",
    "zh-CN": "更改{reason}后，以下选择不再符合条件，已被移除：{picks}。{where}"
  },
  "builder.droppedWhere": {
    "en": " Anything still owed is asked for on the {step} step.",
    "zh-CN": "若仍有待选项，请前往“{step}”步骤完成选择。"
  },
  "builder.dropKind.0": {
    "en": "background skill",
    "zh-CN": "背景技能"
  },
  "builder.dropKind.1": {
    "en": "class skill",
    "zh-CN": "职业技能"
  },
  "builder.dropKind.2": {
    "en": "racial skill",
    "zh-CN": "种族技能"
  },
  "builder.dropKind.3": {
    "en": "racial ability bump",
    "zh-CN": "种族属性加值"
  },
  "builder.dropKind.4": {
    "en": "racial tool",
    "zh-CN": "种族工具"
  },
  "builder.dropKind.5": {
    "en": "racial cantrip",
    "zh-CN": "种族戏法"
  },
  "builder.dropKind.6": {
    "en": "bonus language",
    "zh-CN": "额外语言"
  },
  "builder.dropKind.7": {
    "en": "subclass",
    "zh-CN": "子职业"
  },
  "builder.dropKind.8": {
    "en": "expertise",
    "zh-CN": "专精"
  },
  "builder.dropKind.9": {
    "en": "fighting style",
    "zh-CN": "战斗风格"
  },
  "builder.dropKind.10": {
    "en": "class option",
    "zh-CN": "职业选项"
  },
  "builder.dropKind.11": {
    "en": "cantrip",
    "zh-CN": "戏法"
  },
  "builder.dropKind.12": {
    "en": "spell",
    "zh-CN": "法术"
  },
  "builder.dropKind.13": {
    "en": "prepared",
    "zh-CN": "准备的法术"
  },
  "builder.dropReason.race": {
    "en": "race",
    "zh-CN": "种族"
  },
  "builder.dropReason.class": {
    "en": "class",
    "zh-CN": "职业"
  },
  "builder.dropReason.background": {
    "en": "background",
    "zh-CN": "背景"
  },
  "builder.dropReason.subclass": {
    "en": "subclass",
    "zh-CN": "子职业"
  },
  "builder.dropReason.level": {
    "en": "level",
    "zh-CN": "等级"
  },
  "builder.term.0": {
    "en": "Eldritch Invocation",
    "zh-CN": "魔能祈唤"
  },
  "builder.term.1": {
    "en": "Maneuver",
    "zh-CN": "战技"
  },
  "builder.term.2": {
    "en": "Metamagic",
    "zh-CN": "超魔法"
  },
  "builder.term.3": {
    "en": "Pact Boon",
    "zh-CN": "契约恩赐"
  },
  "builder.term.4": {
    "en": "Infusion",
    "zh-CN": "灌注"
  },
  "builder.term.5": {
    "en": "Rune",
    "zh-CN": "符文"
  },
  "builder.term.6": {
    "en": "Elemental Discipline",
    "zh-CN": "元素技法"
  },
  "builder.term.7": {
    "en": "Hunter's Prey",
    "zh-CN": "猎人之猎物"
  },
  "builder.term.8": {
    "en": "Defensive Tactics",
    "zh-CN": "防御战术"
  },
  "builder.term.9": {
    "en": "Hunter's Multiattack",
    "zh-CN": "猎人多重攻击"
  },
  "builder.term.10": {
    "en": "Superior Hunter's Defense",
    "zh-CN": "高等猎人防御"
  },
  "builder.term.11": {
    "en": "spells",
    "zh-CN": "法术"
  },
  "builder.term.12": {
    "en": "powers",
    "zh-CN": "异能"
  },
  "builder.term.13": {
    "en": "techniques",
    "zh-CN": "技法"
  },
  "builder.term.14": {
    "en": "Archery",
    "zh-CN": "箭术"
  },
  "builder.term.15": {
    "en": "Defense",
    "zh-CN": "防御"
  },
  "builder.term.16": {
    "en": "Dueling",
    "zh-CN": "决斗"
  },
  "builder.term.17": {
    "en": "Great Weapon Fighting",
    "zh-CN": "巨武器战斗"
  },
  "builder.term.18": {
    "en": "Protection",
    "zh-CN": "保护"
  },
  "builder.term.19": {
    "en": "Two-Weapon Fighting",
    "zh-CN": "双武器战斗"
  },
  "builder.term.20": {
    "en": "Aetheric Arts",
    "zh-CN": "以太术"
  },
  "builder.term.21": {
    "en": "Airs",
    "zh-CN": "曲调"
  },
  "builder.term.22": {
    "en": "Apparatus",
    "zh-CN": "器械"
  },
  "builder.term.23": {
    "en": "Bonds",
    "zh-CN": "羁绊"
  },
  "builder.term.24": {
    "en": "Dirges",
    "zh-CN": "挽歌"
  },
  "builder.term.25": {
    "en": "Drone Routines",
    "zh-CN": "无人机程序"
  },
  "builder.term.26": {
    "en": "Fittings",
    "zh-CN": "配装"
  },
  "builder.term.27": {
    "en": "Formulae",
    "zh-CN": "配方"
  },
  "builder.term.28": {
    "en": "Invocations",
    "zh-CN": "祈唤"
  },
  "builder.term.29": {
    "en": "Litanies",
    "zh-CN": "祷文"
  },
  "builder.term.30": {
    "en": "Marshcraft",
    "zh-CN": "沼泽术"
  },
  "builder.term.31": {
    "en": "Mutations",
    "zh-CN": "变异"
  },
  "builder.term.32": {
    "en": "Nanomeds",
    "zh-CN": "纳米医疗"
  },
  "builder.term.33": {
    "en": "Oaths",
    "zh-CN": "誓言"
  },
  "builder.term.34": {
    "en": "Programs",
    "zh-CN": "程序"
  },
  "builder.term.35": {
    "en": "Psionics",
    "zh-CN": "灵能"
  },
  "builder.term.36": {
    "en": "Reclaimed Tech",
    "zh-CN": "回收科技"
  },
  "builder.term.37": {
    "en": "Remedies",
    "zh-CN": "疗法"
  },
  "builder.term.38": {
    "en": "Rites",
    "zh-CN": "仪式"
  },
  "builder.term.39": {
    "en": "Schematics",
    "zh-CN": "构装图"
  },
  "builder.term.40": {
    "en": "Seances",
    "zh-CN": "降灵术"
  },
  "builder.term.41": {
    "en": "Sermons",
    "zh-CN": "布道"
  },
  "builder.term.42": {
    "en": "Stigmata",
    "zh-CN": "圣痕"
  },
  "builder.term.43": {
    "en": "Terms",
    "zh-CN": "契约条款"
  },
  "builder.term.44": {
    "en": "Tide-lore",
    "zh-CN": "潮汐术"
  },
  "builder.term.45": {
    "en": "Treatments",
    "zh-CN": "治疗法"
  },
  "builder.term.46": {
    "en": "Vows",
    "zh-CN": "誓约"
  },
  "builder.term.47": {
    "en": "Workings",
    "zh-CN": "术式"
  }
});

export type BuilderGateCode = Extract<keyof typeof BUILDER_MESSAGES.en, `builderGate.${string}`>;
export const BUILDER_GATE_CODES = Object.keys(BUILDER_MESSAGES.en).filter((key): key is BuilderGateCode => key.startsWith("builderGate."));
export const BUILDER_DROP_KINDS = [
  {
    "name": "background skill",
    "key": "builder.dropKind.0"
  },
  {
    "name": "class skill",
    "key": "builder.dropKind.1"
  },
  {
    "name": "racial skill",
    "key": "builder.dropKind.2"
  },
  {
    "name": "racial ability bump",
    "key": "builder.dropKind.3"
  },
  {
    "name": "racial tool",
    "key": "builder.dropKind.4"
  },
  {
    "name": "racial cantrip",
    "key": "builder.dropKind.5"
  },
  {
    "name": "bonus language",
    "key": "builder.dropKind.6"
  },
  {
    "name": "subclass",
    "key": "builder.dropKind.7"
  },
  {
    "name": "expertise",
    "key": "builder.dropKind.8"
  },
  {
    "name": "fighting style",
    "key": "builder.dropKind.9"
  },
  {
    "name": "class option",
    "key": "builder.dropKind.10"
  },
  {
    "name": "cantrip",
    "key": "builder.dropKind.11"
  },
  {
    "name": "spell",
    "key": "builder.dropKind.12"
  },
  {
    "name": "prepared",
    "key": "builder.dropKind.13"
  }
] as const;
export const BUILDER_TERMS = [
  {
    "kind": "optionCategory",
    "name": "Eldritch Invocation",
    "key": "builder.term.0"
  },
  {
    "kind": "optionCategory",
    "name": "Maneuver",
    "key": "builder.term.1"
  },
  {
    "kind": "optionCategory",
    "name": "Metamagic",
    "key": "builder.term.2"
  },
  {
    "kind": "optionCategory",
    "name": "Pact Boon",
    "key": "builder.term.3"
  },
  {
    "kind": "optionCategory",
    "name": "Infusion",
    "key": "builder.term.4"
  },
  {
    "kind": "optionCategory",
    "name": "Rune",
    "key": "builder.term.5"
  },
  {
    "kind": "optionCategory",
    "name": "Elemental Discipline",
    "key": "builder.term.6"
  },
  {
    "kind": "optionCategory",
    "name": "Hunter's Prey",
    "key": "builder.term.7"
  },
  {
    "kind": "optionCategory",
    "name": "Defensive Tactics",
    "key": "builder.term.8"
  },
  {
    "kind": "optionCategory",
    "name": "Hunter's Multiattack",
    "key": "builder.term.9"
  },
  {
    "kind": "optionCategory",
    "name": "Superior Hunter's Defense",
    "key": "builder.term.10"
  },
  {
    "kind": "castingKind",
    "name": "spells",
    "key": "builder.term.11"
  },
  {
    "kind": "castingKind",
    "name": "powers",
    "key": "builder.term.12"
  },
  {
    "kind": "castingKind",
    "name": "techniques",
    "key": "builder.term.13"
  },
  {
    "kind": "fightingStyle",
    "name": "Archery",
    "key": "builder.term.14"
  },
  {
    "kind": "fightingStyle",
    "name": "Defense",
    "key": "builder.term.15"
  },
  {
    "kind": "fightingStyle",
    "name": "Dueling",
    "key": "builder.term.16"
  },
  {
    "kind": "fightingStyle",
    "name": "Great Weapon Fighting",
    "key": "builder.term.17"
  },
  {
    "kind": "fightingStyle",
    "name": "Protection",
    "key": "builder.term.18"
  },
  {
    "kind": "fightingStyle",
    "name": "Two-Weapon Fighting",
    "key": "builder.term.19"
  },
  {
    "kind": "castingKind",
    "name": "Aetheric Arts",
    "key": "builder.term.20"
  },
  {
    "kind": "castingKind",
    "name": "Airs",
    "key": "builder.term.21"
  },
  {
    "kind": "castingKind",
    "name": "Apparatus",
    "key": "builder.term.22"
  },
  {
    "kind": "castingKind",
    "name": "Bonds",
    "key": "builder.term.23"
  },
  {
    "kind": "castingKind",
    "name": "Dirges",
    "key": "builder.term.24"
  },
  {
    "kind": "castingKind",
    "name": "Drone Routines",
    "key": "builder.term.25"
  },
  {
    "kind": "castingKind",
    "name": "Fittings",
    "key": "builder.term.26"
  },
  {
    "kind": "castingKind",
    "name": "Formulae",
    "key": "builder.term.27"
  },
  {
    "kind": "castingKind",
    "name": "Invocations",
    "key": "builder.term.28"
  },
  {
    "kind": "castingKind",
    "name": "Litanies",
    "key": "builder.term.29"
  },
  {
    "kind": "castingKind",
    "name": "Marshcraft",
    "key": "builder.term.30"
  },
  {
    "kind": "castingKind",
    "name": "Mutations",
    "key": "builder.term.31"
  },
  {
    "kind": "castingKind",
    "name": "Nanomeds",
    "key": "builder.term.32"
  },
  {
    "kind": "castingKind",
    "name": "Oaths",
    "key": "builder.term.33"
  },
  {
    "kind": "castingKind",
    "name": "Programs",
    "key": "builder.term.34"
  },
  {
    "kind": "castingKind",
    "name": "Psionics",
    "key": "builder.term.35"
  },
  {
    "kind": "castingKind",
    "name": "Reclaimed Tech",
    "key": "builder.term.36"
  },
  {
    "kind": "castingKind",
    "name": "Remedies",
    "key": "builder.term.37"
  },
  {
    "kind": "castingKind",
    "name": "Rites",
    "key": "builder.term.38"
  },
  {
    "kind": "castingKind",
    "name": "Schematics",
    "key": "builder.term.39"
  },
  {
    "kind": "castingKind",
    "name": "Seances",
    "key": "builder.term.40"
  },
  {
    "kind": "castingKind",
    "name": "Sermons",
    "key": "builder.term.41"
  },
  {
    "kind": "castingKind",
    "name": "Stigmata",
    "key": "builder.term.42"
  },
  {
    "kind": "castingKind",
    "name": "Terms",
    "key": "builder.term.43"
  },
  {
    "kind": "castingKind",
    "name": "Tide-lore",
    "key": "builder.term.44"
  },
  {
    "kind": "castingKind",
    "name": "Treatments",
    "key": "builder.term.45"
  },
  {
    "kind": "castingKind",
    "name": "Vows",
    "key": "builder.term.46"
  },
  {
    "kind": "castingKind",
    "name": "Workings",
    "key": "builder.term.47"
  }
] as const;
