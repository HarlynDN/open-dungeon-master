import { defineMessages } from "./catalog.ts";

export const CALLING_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "callingUi.chooseClass": {
    "en": "Choose a class",
    "zh-CN": "选择职业"
  },
  "callingUi.class": {
    "en": "Class",
    "zh-CN": "职业"
  },
  "callingUi.subclass": {
    "en": "Subclass",
    "zh-CN": "子职业"
  },
  "callingUi.none": {
    "en": "None yet",
    "zh-CN": "尚未选择"
  },
  "callingUi.hitDie": {
    "en": "d{die} hit die",
    "zh-CN": "d{die} 生命骰"
  },
  "callingUi.saves": {
    "en": "saves",
    "zh-CN": "豁免"
  },
  "callingUi.cardSaves": {
    "en": "Saves {abilities}",
    "zh-CN": "豁免：{abilities}"
  },
  "callingUi.caster": {
    "en": "{ability} caster",
    "zh-CN": "{ability}施法"
  },
  "callingUi.casterWord": {
    "en": "caster",
    "zh-CN": "施法者"
  },
  "callingUi.castingFlavor": {
    "en": " (spells flavored as {kind})",
    "zh-CN": "（法术以{kind}的形式呈现）"
  },
  "callingUi.subclassGeneric": {
    "en": "A specialization within your class.",
    "zh-CN": "职业内的专门方向。"
  },
  "callingUi.still": {
    "en": "Still to choose. ",
    "zh-CN": "尚需选择。"
  },
  "callingUi.subclassLower": {
    "en": "subclass",
    "zh-CN": "子职业"
  },
  "callingUi.skillLower": {
    "en": "skill",
    "zh-CN": "技能"
  },
  "callingUi.proficiencyLower": {
    "en": "proficiency bonus",
    "zh-CN": "熟练加值"
  },
  "callingUi.expertiseWord": {
    "en": "Expertise",
    "zh-CN": "专精"
  },
  "callingUi.subclassAdvice": {
    "en": "Your {subclass} is the biggest choice about how this character plays. Tap the info icon next to any option to read what it does before choosing.",
    "zh-CN": "{subclass}是决定角色玩法的最重要选择。选择之前，可以点击选项旁的信息图标了解其效果。"
  },
  "callingUi.subclassLocked": {
    "en": "A {class} chooses a {subclass} at level {unlock}; there is nothing to pick at level {level}. The choice comes with that level-up.",
    "zh-CN": "{class}在 {unlock} 级选择{subclass}，因此 {level} 级时没有需要选择的项目。达到对应等级时再完成选择。"
  },
  "callingUi.gainTitle": {
    "en": "What you gain at level {level}",
    "zh-CN": "{level} 级获得的能力"
  },
  "callingUi.gainHelp": {
    "en": "Tap any name to read what it does. Racial traits and background perks are added on top when the character is saved.",
    "zh-CN": "点击名称了解效果。保存角色时，还会加入种族特性和背景能力。"
  },
  "callingUi.level": {
    "en": "Level {level}",
    "zh-CN": "{level} 级"
  },
  "callingUi.skillsTitle": {
    "en": "Class skills (pick {count})",
    "zh-CN": "职业技能（选择 {count} 项）"
  },
  "callingUi.left": {
    "en": "{count} still to choose.",
    "zh-CN": "还需选择 {count} 项。"
  },
  "callingUi.skillsAdvice": {
    "en": "A {skill} you are proficient in adds your {proficiency} to rolls that use it. Tap any ⓘ to see which ability a skill leans on. A greyed skill is already yours from your race or background, so a class pick on it would be wasted.",
    "zh-CN": "熟练掌握一项{skill}，就会在相关掷骰中加上{proficiency}。点击 ⓘ 查看技能使用的属性。灰色技能已经由种族或背景提供，无需重复占用职业选择。"
  },
  "callingUi.owned": {
    "en": "{skill} is already yours: your {source}{by} grants it{trait}, so it is not offered as a class pick here.\n\n{help}",
    "zh-CN": "你已经掌握{skill}：{source}{by}{trait}提供了这项熟练，因此这里不能再将其作为职业技能选择。\n\n{help}"
  },
  "callingUi.by": {
    "en": " ({name})",
    "zh-CN": "（{name}）"
  },
  "callingUi.through": {
    "en": " through {trait}",
    "zh-CN": "通过{trait}"
  },
  "callingUi.source.race": {
    "en": "race",
    "zh-CN": "种族"
  },
  "callingUi.source.background": {
    "en": "background",
    "zh-CN": "背景"
  },
  "callingUi.sourceSuffix": {
    "en": " ({source})",
    "zh-CN": "（{source}）"
  },
  "callingUi.toolTitle": {
    "en": "Tool proficiency: {count} {label}",
    "zh-CN": "工具熟练：选择 {count} 项{label}"
  },
  "callingUi.expertiseTitle": {
    "en": "Expertise (pick {count})",
    "zh-CN": "专精（选择 {count} 项）"
  },
  "callingUi.expertiseHelp": {
    "en": "{expertise} doubles your {proficiency} on the chosen skills.",
    "zh-CN": "{expertise}让你对选定技能使用双倍{proficiency}。"
  },
  "callingUi.skillsFirst": {
    "en": "Pick your class skills above first.",
    "zh-CN": "请先在上方选择职业技能。"
  },
  "callingUi.thievesLabel": {
    "en": "Thieves' tools",
    "zh-CN": "盗贼工具"
  },
  "callingUi.thievesHelp": {
    "en": "Your proficiency bonus is doubled for ability checks you make with thieves' tools.",
    "zh-CN": "使用盗贼工具进行属性检定时，熟练加值翻倍。"
  },
  "callingUi.styleTitle": {
    "en": "Fighting style (pick {count})",
    "zh-CN": "战斗风格（选择 {count} 项）"
  },
  "callingUi.styleHelp": {
    "en": "{count} still to choose. A fighting style is a permanent edge with one kind of weapon or armour; read each card before picking.",
    "zh-CN": "还需选择 {count} 项。战斗风格提供使用某类武器或护甲时的长期优势；选择前请阅读各张卡片。"
  },
  "callingUi.optionsTitle": {
    "en": "{label} (pick {count})",
    "zh-CN": "{label}（选择 {count} 项）"
  },
  "callingUi.optionsHelp": {
    "en": "These are real abilities your character gets. Tap the info button on any one to read what it does.",
    "zh-CN": "这些是角色实际获得的能力。点击各项的信息按钮了解其效果。"
  },
  "callingUi.requiresSentence": {
    "en": "Requires {requirement}. ",
    "zh-CN": "需求：{requirement}。"
  },
  "callingUi.requires": {
    "en": "Requires {requirement}",
    "zh-CN": "需求：{requirement}"
  },
  "callingUi.styleDescription.archery": {
    "en": "+2 to attack rolls with ranged weapons.",
    "zh-CN": "使用远程武器时，攻击掷骰获得 +2。"
  },
  "callingUi.styleDescription.defense": {
    "en": "+1 AC while wearing armor.",
    "zh-CN": "穿着护甲时，防御等级获得 +1。"
  },
  "callingUi.styleDescription.dueling": {
    "en": "+2 damage with a one-handed melee weapon and no other weapon in hand.",
    "zh-CN": "单手使用近战武器，且另一只手没有武器时，伤害获得 +2。"
  },
  "callingUi.styleDescription.great_weapon_fighting": {
    "en": "Reroll 1s and 2s on damage with a two-handed or versatile melee weapon.",
    "zh-CN": "使用双手或多用近战武器时，可以重掷伤害骰的 1 和 2。"
  },
  "callingUi.styleDescription.protection": {
    "en": "Reaction: impose disadvantage on an attack against an ally within 5 ft, using your shield.",
    "zh-CN": "反应：使用盾牌，让针对 5 英尺内盟友的一次攻击具有劣势。"
  },
  "callingUi.styleDescription.two_weapon_fighting": {
    "en": "Add your ability modifier to the damage of your off-hand attack.",
    "zh-CN": "副手攻击的伤害加上属性调整值。"
  }
});

export const CALLING_STYLE_METADATA = [
  {
    "id": "archery",
    "key": "callingUi.styleDescription.archery"
  },
  {
    "id": "defense",
    "key": "callingUi.styleDescription.defense"
  },
  {
    "id": "dueling",
    "key": "callingUi.styleDescription.dueling"
  },
  {
    "id": "great_weapon_fighting",
    "key": "callingUi.styleDescription.great_weapon_fighting"
  },
  {
    "id": "protection",
    "key": "callingUi.styleDescription.protection"
  },
  {
    "id": "two_weapon_fighting",
    "key": "callingUi.styleDescription.two_weapon_fighting"
  }
] as const;
