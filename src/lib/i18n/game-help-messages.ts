import { defineMessages } from "./catalog.ts";

export const GAME_HELP_MESSAGES = /*#__PURE__*/ defineMessages({
  "gameHelp.ability_score.term": {
    "en": "Ability score",
    "zh-CN": "属性值"
  },
  "gameHelp.ability_score.short": {
    "en": "One of six numbers describing what your character is naturally good at.",
    "zh-CN": "描述角色天生擅长什么的六项数值之一。"
  },
  "gameHelp.ability_score.long": {
    "en": "The six are Strength, Dexterity, Constitution, Intelligence, Wisdom and Charisma. Most scores land between 8 and 18 at first level. What actually gets added to your rolls is the modifier derived from the score: 10 or 11 gives +0, every 2 points above that adds +1, every 2 below subtracts 1.",
    "zh-CN": "六项属性分别是力量、敏捷、体质、智力、感知和魅力。1 级角色的大部分属性值在 8 到 18 之间。实际加到掷骰结果上的是由属性值换算出的调整值：10 或 11 对应 +0，此后每增加 2 点就增加 +1，每减少 2 点就减去 1。"
  },
  "gameHelp.modifier.term": {
    "en": "Modifier",
    "zh-CN": "调整值"
  },
  "gameHelp.modifier.short": {
    "en": "The bonus or penalty an ability score adds to your rolls.",
    "zh-CN": "属性值为掷骰结果提供的加值或减值。"
  },
  "gameHelp.modifier.long": {
    "en": "Work it out by subtracting 10 from the score and halving the result, rounding down. A score of 16 gives +3, a score of 8 gives -1. You will see modifiers written with a sign, like +3, everywhere on your sheet.",
    "zh-CN": "计算方式是将属性值减去 10，再除以 2，向下取整。属性值 16 对应 +3，属性值 8 对应 -1。角色卡上的调整值通常带有正负号，例如 +3。"
  },
  "gameHelp.str.term": {
    "en": "Strength",
    "zh-CN": "力量"
  },
  "gameHelp.str.short": {
    "en": "Raw physical power: hitting things with heavy weapons, shoving, climbing, lifting.",
    "zh-CN": "身体的力量：使用重型武器攻击、推撞、攀爬和举重。"
  },
  "gameHelp.str.long": {
    "en": "Most melee weapons use Strength for their attack and damage rolls. It also covers the Athletics skill, and the saving throw against being pushed or restrained.",
    "zh-CN": "大多数近战武器使用力量进行攻击和伤害掷骰。力量也用于运动技能，以及抵抗推离或束缚的豁免。"
  },
  "gameHelp.dex.term": {
    "en": "Dexterity",
    "zh-CN": "敏捷"
  },
  "gameHelp.dex.short": {
    "en": "Agility and precision: light weapons, bows, armor class, dodging.",
    "zh-CN": "灵活与精准：轻型武器、弓、防御等级和闪避。"
  },
  "gameHelp.dex.long": {
    "en": "Dexterity adds to your armor class in light and medium armor, decides your initiative, and powers finesse and ranged weapons. Its saving throw is the one you make to dodge fireballs and traps.",
    "zh-CN": "敏捷可增加穿着轻甲或中甲时的防御等级，决定先攻，并用于灵巧武器与远程武器。敏捷豁免用于躲避火球和陷阱。"
  },
  "gameHelp.con.term": {
    "en": "Constitution",
    "zh-CN": "体质"
  },
  "gameHelp.con.short": {
    "en": "Toughness and stamina. It raises your hit points at every level.",
    "zh-CN": "坚韧与耐力。每次升级时，它都会增加你的生命值。"
  },
  "gameHelp.con.long": {
    "en": "You never roll a Constitution check, but its saving throw comes up constantly: resisting poison, surviving exhaustion, and holding concentration on a spell when you take damage.",
    "zh-CN": "你不会进行体质检定，但经常需要体质豁免：抵抗毒素、承受力竭，以及受伤时维持法术专注。"
  },
  "gameHelp.int.term": {
    "en": "Intelligence",
    "zh-CN": "智力"
  },
  "gameHelp.int.short": {
    "en": "Reasoning and recall. The casting ability for wizards.",
    "zh-CN": "推理与记忆。法师的施法属性。"
  },
  "gameHelp.int.long": {
    "en": "It covers Arcana, History, Investigation, Nature and Religion. Its saving throw resists illusions and effects that attack the mind directly.",
    "zh-CN": "智力用于奥秘、历史、调查、自然和宗教技能。智力豁免用于抵抗幻术和直接攻击心智的效果。"
  },
  "gameHelp.wis.term": {
    "en": "Wisdom",
    "zh-CN": "感知"
  },
  "gameHelp.wis.short": {
    "en": "Perceptiveness and judgement. The casting ability for clerics, druids and rangers.",
    "zh-CN": "观察力与判断力。牧师、德鲁伊和游侠的施法属性。"
  },
  "gameHelp.wis.long": {
    "en": "It covers Perception, Insight, Medicine, Survival and Animal Handling, and sets your passive Perception. Its saving throw resists charms, fear and mind control, which makes it one of the most valuable saves in the game.",
    "zh-CN": "感知用于察觉、洞悉、医药、生存和驯兽技能，并决定被动察觉值。感知豁免用于抵抗魅惑、恐惧与心灵控制，因此是游戏中很重要的豁免之一。"
  },
  "gameHelp.cha.term": {
    "en": "Charisma",
    "zh-CN": "魅力"
  },
  "gameHelp.cha.short": {
    "en": "Force of personality. The casting ability for bards, sorcerers, warlocks and paladins.",
    "zh-CN": "人格与气势。吟游诗人、术士、契术师和圣武士的施法属性。"
  },
  "gameHelp.cha.long": {
    "en": "It covers Persuasion, Deception, Intimidation and Performance. Its saving throw resists banishment and possession.",
    "zh-CN": "魅力用于游说、欺瞒、威吓和表演技能。魅力豁免用于抵抗放逐和附身。"
  },
  "gameHelp.armor_class.term": {
    "en": "Armor Class (AC)",
    "zh-CN": "防御等级（AC）"
  },
  "gameHelp.armor_class.short": {
    "en": "How hard you are to hit. An attacker must roll this number or higher to land a hit.",
    "zh-CN": "衡量你有多难被击中。攻击者的掷骰结果必须等于或高于此值才能命中。"
  },
  "gameHelp.armor_class.long": {
    "en": "Your AC comes from your armor, your shield, your Dexterity, and any magic or class feature that adds to it. The app works it out for you from what you are wearing. Higher is better, and most characters sit between 12 and 20.",
    "zh-CN": "防御等级由护甲、盾牌、敏捷，以及增加防御的魔法或职业特性决定。应用会根据你的穿戴自动计算。数值越高越好，大多数角色的防御等级在 12 到 20 之间。"
  },
  "gameHelp.hit_points.term": {
    "en": "Hit points (HP)",
    "zh-CN": "生命值（HP）"
  },
  "gameHelp.hit_points.short": {
    "en": "How much damage you can take before you drop.",
    "zh-CN": "衡量你倒下之前能承受多少伤害。"
  },
  "gameHelp.hit_points.long": {
    "en": "At 0 hit points you fall unconscious and start making death saving throws. Healing brings you back. Your maximum grows every level, based on your class's hit die and your Constitution modifier.",
    "zh-CN": "生命值降到 0 时，你会失去意识并开始进行死亡豁免。治疗能让你重新醒来。生命值上限随等级增长，取决于职业的生命骰和体质调整值。"
  },
  "gameHelp.temp_hp.term": {
    "en": "Temporary hit points",
    "zh-CN": "临时生命值"
  },
  "gameHelp.temp_hp.short": {
    "en": "A buffer that soaks damage before your real hit points do.",
    "zh-CN": "在实际生命值之前吸收伤害的缓冲。"
  },
  "gameHelp.temp_hp.long": {
    "en": "They are not healing and do not stack: a new source replaces the old one rather than adding to it. They vanish on a long rest, and any left over when the effect ends are simply lost.",
    "zh-CN": "临时生命值不属于治疗，也不会叠加：新的来源会替换旧的，而不是相加。长休会使其消失；效果结束时剩余的临时生命值也会失去。"
  },
  "gameHelp.hit_dice.term": {
    "en": "Hit Dice",
    "zh-CN": "生命骰"
  },
  "gameHelp.hit_dice.short": {
    "en": "A pool of dice you spend during a short rest to heal yourself.",
    "zh-CN": "可在短休时消耗、为自己恢复生命值的一组骰子。"
  },
  "gameHelp.hit_dice.long": {
    "en": "You have one per character level, of the size your class uses. Spend one on a short rest to roll it and regain that many hit points plus your Constitution modifier. You get half of them back on a long rest, so they are a resource to ration across a day of adventuring.",
    "zh-CN": "每个角色等级提供 1 枚生命骰，骰子的大小由职业决定。短休时消耗 1 枚并掷骰，恢复掷骰结果加体质调整值的生命值。长休会恢复一半生命骰，因此需要在一天的冒险中合理分配。"
  },
  "gameHelp.ability_check.term": {
    "en": "Ability check",
    "zh-CN": "属性检定"
  },
  "gameHelp.ability_check.short": {
    "en": "A d20 roll plus a modifier, made when the outcome of something is uncertain.",
    "zh-CN": "当一件事的结果不确定时，掷 d20 并加上调整值。"
  },
  "gameHelp.ability_check.long": {
    "en": "The DM sets a difficulty number and you try to meet or beat it. Climbing a wall is a Strength check, spotting an ambush is a Wisdom check. If you are proficient in a relevant skill you add your proficiency bonus too.",
    "zh-CN": "地下城主设定难度，你需要达到或超过它。攀墙使用力量检定，发现埋伏使用感知检定。如果你熟练掌握相关技能，还会加上熟练加值。"
  },
  "gameHelp.saving_throw.term": {
    "en": "Saving throw",
    "zh-CN": "豁免"
  },
  "gameHelp.saving_throw.short": {
    "en": "A d20 roll to resist something happening to you, rather than to make something happen.",
    "zh-CN": "掷 d20 来抵抗作用于你的效果，而不是主动完成一件事。"
  },
  "gameHelp.saving_throw.long": {
    "en": "A dragon breathes fire and you make a Dexterity save to take half damage. A vampire tries to charm you and you make a Wisdom save to shrug it off. Each class is proficient in two of the six saves, adding its proficiency bonus to those.",
    "zh-CN": "巨龙喷火时，你进行敏捷豁免以承受一半伤害；吸血鬼试图魅惑你时，你进行感知豁免来抵抗。每个职业熟练掌握六项豁免中的两项，进行这些豁免时可加上熟练加值。"
  },
  "gameHelp.proficiency_bonus.term": {
    "en": "Proficiency bonus",
    "zh-CN": "熟练加值"
  },
  "gameHelp.proficiency_bonus.short": {
    "en": "A bonus you add to anything you are trained in. It grows from +2 to +6 as you level.",
    "zh-CN": "加到你受过训练的行动上的加值，随等级从 +2 增长到 +6。"
  },
  "gameHelp.proficiency_bonus.long": {
    "en": "It applies to attacks with weapons you are proficient with, skills you are proficient in, your two saving throw proficiencies, and your spell save DC. It is +2 at levels 1 to 4 and rises by 1 every four levels after that.",
    "zh-CN": "它用于熟练武器的攻击、熟练技能、两项豁免熟练，以及法术豁免难度等级。1 到 4 级时为 +2，此后每四级增加 1。"
  },
  "gameHelp.advantage.term": {
    "en": "Advantage",
    "zh-CN": "优势"
  },
  "gameHelp.advantage.short": {
    "en": "Roll two d20s and keep the higher one.",
    "zh-CN": "掷两枚 d20，取较高的结果。"
  },
  "gameHelp.advantage.long": {
    "en": "You get it when circumstances favour you: attacking an unaware enemy, or acting on information an ally gave you. Advantage and disadvantage cancel out exactly, no matter how many sources of each you have, and they never stack with themselves.",
    "zh-CN": "有利条件可以带来优势，例如攻击未察觉你的敌人，或利用盟友提供的信息行动。优势和劣势会相互抵消，无论各自有多少来源；同类效果也不会叠加。"
  },
  "gameHelp.disadvantage.term": {
    "en": "Disadvantage",
    "zh-CN": "劣势"
  },
  "gameHelp.disadvantage.short": {
    "en": "Roll two d20s and keep the lower one.",
    "zh-CN": "掷两枚 d20，取较低的结果。"
  },
  "gameHelp.disadvantage.long": {
    "en": "You get it when circumstances work against you: attacking at long range, fighting blind, or acting while poisoned or frightened. It cancels out with advantage exactly.",
    "zh-CN": "不利条件可以带来劣势，例如远距离攻击、看不见时战斗，或在中毒、恐慌时行动。劣势会与优势相互抵消。"
  },
  "gameHelp.initiative.term": {
    "en": "Initiative",
    "zh-CN": "先攻"
  },
  "gameHelp.initiative.short": {
    "en": "A Dexterity roll at the start of a fight that sets the turn order.",
    "zh-CN": "战斗开始时进行的敏捷掷骰，用来决定行动顺序。"
  },
  "gameHelp.initiative.long": {
    "en": "Everyone rolls once, and the round then runs from highest to lowest. The order holds until the fight ends.",
    "zh-CN": "每人掷骰一次，每轮按结果从高到低行动。这个顺序持续到战斗结束。"
  },
  "gameHelp.action.term": {
    "en": "Action",
    "zh-CN": "动作"
  },
  "gameHelp.action.short": {
    "en": "The main thing you do on your turn: attack, cast a spell, dash, hide, help an ally.",
    "zh-CN": "你在回合中做的主要事情：攻击、施法、疾走、躲藏或帮助盟友。"
  },
  "gameHelp.action.long": {
    "en": "Each turn you get one action, one bonus action, your movement, and one reaction that you can use before your next turn. Most turns are an action plus movement; bonus actions only exist when a feature or spell specifically grants one.",
    "zh-CN": "每回合你可以使用 1 个动作、1 个附赠动作和移动，并可在下回合之前使用 1 次反应。大多数回合是动作加移动；只有特性或法术明确提供时，才有附赠动作可用。"
  },
  "gameHelp.bonus_action.term": {
    "en": "Bonus action",
    "zh-CN": "附赠动作"
  },
  "gameHelp.bonus_action.short": {
    "en": "A quick extra thing on your turn, but only when something specifically grants one.",
    "zh-CN": "回合中额外的快速行动，只有效果明确提供时才能使用。"
  },
  "gameHelp.bonus_action.long": {
    "en": "You cannot invent a bonus action: a class feature, a spell or a weapon has to say it uses one. You get at most one per turn, so features that compete for it force a real choice.",
    "zh-CN": "不能随意创造附赠动作：职业特性、法术或武器必须明确写明使用附赠动作。每回合最多使用 1 个，因此多个效果竞争它时，你需要作出选择。"
  },
  "gameHelp.reaction.term": {
    "en": "Reaction",
    "zh-CN": "反应"
  },
  "gameHelp.reaction.short": {
    "en": "One response you can make between your turns, triggered by something specific.",
    "zh-CN": "由特定事件触发、可以在两次自己的回合之间使用的一次应对。"
  },
  "gameHelp.reaction.long": {
    "en": "The most common one is an opportunity attack when an enemy walks out of your reach. Spells like shield and features like Uncanny Dodge also use it. You get one and it comes back at the start of your turn.",
    "zh-CN": "最常见的是敌人离开你的触及范围时进行借机攻击。护盾术等法术和直觉闪避等特性也使用反应。你只有 1 次反应，并在自己的回合开始时恢复。"
  },
  "gameHelp.attack_roll.term": {
    "en": "Attack roll",
    "zh-CN": "攻击掷骰"
  },
  "gameHelp.attack_roll.short": {
    "en": "A d20 plus your ability modifier and proficiency bonus, against the target's AC.",
    "zh-CN": "掷 d20，加上属性调整值和熟练加值，与目标的防御等级比较。"
  },
  "gameHelp.attack_roll.long": {
    "en": "Meet or beat the AC and you hit, then roll the weapon or spell's damage. A natural 20 always hits and doubles the damage dice, and a natural 1 always misses.",
    "zh-CN": "结果达到或超过防御等级就命中，随后掷武器或法术的伤害。骰面为 20 时必定命中，伤害骰数量翻倍；骰面为 1 时必定未命中。"
  },
  "gameHelp.critical_hit.term": {
    "en": "Critical hit",
    "zh-CN": "重击"
  },
  "gameHelp.critical_hit.short": {
    "en": "A natural 20 on an attack roll. You roll all the damage dice twice.",
    "zh-CN": "攻击掷骰的骰面为 20。所有伤害骰都掷两次。"
  },
  "gameHelp.critical_hit.long": {
    "en": "Only the dice double, not the flat modifiers. Some features widen the range so a 19 counts too.",
    "zh-CN": "只有伤害骰翻倍，固定调整值不会翻倍。某些特性会扩大重击范围，让骰面 19 也能造成重击。"
  },
  "gameHelp.spell_slot.term": {
    "en": "Spell slot",
    "zh-CN": "法术位"
  },
  "gameHelp.spell_slot.short": {
    "en": "The fuel for casting a spell. You have a limited number of each level per day.",
    "zh-CN": "施放法术需要消耗的资源。每天各环法术位的数量有限。"
  },
  "gameHelp.spell_slot.long": {
    "en": "Casting a 1st-level spell spends a 1st-level slot or higher. Casting a spell with a bigger slot than it needs often makes it stronger, which is called upcasting. Most casters get their slots back on a long rest; warlocks get theirs back on a short one.",
    "zh-CN": "施放 1 环法术需要消耗 1 环或更高环的法术位。使用高于法术本身环级的法术位往往能增强效果，这称为升环施法。大多数施法者在长休后恢复法术位；契术师在短休后恢复。"
  },
  "gameHelp.cantrip.term": {
    "en": "Cantrip",
    "zh-CN": "戏法"
  },
  "gameHelp.cantrip.short": {
    "en": "A level 0 spell you can cast as often as you like, with no slot.",
    "zh-CN": "0 环法术，可以随意施放，无需法术位。"
  },
  "gameHelp.cantrip.long": {
    "en": "Cantrips get stronger on their own at character levels 5, 11 and 17, which is why an attack cantrip stays useful all game.",
    "zh-CN": "戏法会在角色等级达到 5、11 和 17 时自行增强，因此攻击戏法在整个游戏中都能发挥作用。"
  },
  "gameHelp.spell_save_dc.term": {
    "en": "Spell save DC",
    "zh-CN": "法术豁免难度等级"
  },
  "gameHelp.spell_save_dc.short": {
    "en": "The number an enemy must beat to resist your spell.",
    "zh-CN": "敌人抵抗你的法术时，豁免需要达到的难度。"
  },
  "gameHelp.spell_save_dc.long": {
    "en": "It is 8 plus your proficiency bonus plus your spellcasting ability modifier. The app calculates it for you and shows it on your sheet.",
    "zh-CN": "数值为 8 + 熟练加值 + 施法属性调整值。应用会自动计算，并显示在角色卡上。"
  },
  "gameHelp.concentration.term": {
    "en": "Concentration",
    "zh-CN": "专注"
  },
  "gameHelp.concentration.short": {
    "en": "Some spells only last while you keep concentrating, and you can only concentrate on one at a time.",
    "zh-CN": "某些法术仅在你维持专注时持续，而且同时只能专注于一个法术。"
  },
  "gameHelp.concentration.long": {
    "en": "Casting a second concentration spell ends the first. Taking damage forces a Constitution saving throw against 10 or half the damage, whichever is higher, and failing it ends the spell. Being knocked unconscious ends it too.",
    "zh-CN": "施放第二个需要专注的法术会结束第一个。受到伤害时，必须进行体质豁免，难度为 10 或伤害的一半，取较高者；失败会结束法术。失去意识也会结束专注。"
  },
  "gameHelp.ritual.term": {
    "en": "Ritual",
    "zh-CN": "仪式施法"
  },
  "gameHelp.ritual.short": {
    "en": "A spell you can cast without spending a slot by taking 10 extra minutes over it.",
    "zh-CN": "额外花费 10 分钟施法，可以不消耗法术位。"
  },
  "gameHelp.ritual.long": {
    "en": "Only spells marked as rituals can be cast this way, and only if your class supports ritual casting. It is free but far too slow for combat.",
    "zh-CN": "只有带仪式标记的法术才能这样施放，而且职业必须支持仪式施法。它不消耗法术位，但对战斗而言太慢。"
  },
  "gameHelp.prepared_spells.term": {
    "en": "Prepared and known spells",
    "zh-CN": "准备与已知法术"
  },
  "gameHelp.prepared_spells.short": {
    "en": "Which spells you actually have available today.",
    "zh-CN": "你今天实际可以使用哪些法术。"
  },
  "gameHelp.prepared_spells.long": {
    "en": "Some classes know a fixed short list forever, like bards and sorcerers. Others, like clerics and wizards, choose a fresh set after each long rest from a much bigger pool. Either way you can only cast what is on the list, and only while you have slots left.",
    "zh-CN": "某些职业一直掌握固定的少量法术，例如吟游诗人和术士。其他职业如牧师和法师，会在每次长休后从更大的法术池中重新选择。无论哪种情况，你只能施放列表中的法术，而且需要剩余法术位。"
  },
  "gameHelp.short_rest.term": {
    "en": "Short rest",
    "zh-CN": "短休"
  },
  "gameHelp.short_rest.short": {
    "en": "About an hour of downtime. You can spend Hit Dice to heal and recover some abilities.",
    "zh-CN": "约 1 小时的休息。你可以消耗生命骰恢复生命值，并恢复部分能力。"
  },
  "gameHelp.short_rest.long": {
    "en": "Features that say short rest come back, including warlock spell slots, monk ki, and a fighter's Second Wind and Action Surge. You can take several in a day.",
    "zh-CN": "标明短休恢复的特性会恢复，包括契术师法术位、武僧的气，以及战士的回气和动作如潮。一天中可以进行多次短休。"
  },
  "gameHelp.long_rest.term": {
    "en": "Long rest",
    "zh-CN": "长休"
  },
  "gameHelp.long_rest.short": {
    "en": "About eight hours of sleep. You regain all hit points and almost everything else.",
    "zh-CN": "约 8 小时的睡眠。恢复全部生命值和几乎所有其他资源。"
  },
  "gameHelp.long_rest.long": {
    "en": "You get all your spell slots and long-rest features back and half your spent Hit Dice. You only benefit from one per 24 hours.",
    "zh-CN": "恢复全部法术位、长休恢复的特性，以及一半已消耗的生命骰。每 24 小时只能从一次长休中获益。"
  },
  "gameHelp.death_save.term": {
    "en": "Death saving throw",
    "zh-CN": "死亡豁免"
  },
  "gameHelp.death_save.short": {
    "en": "At 0 hit points you roll a d20 each turn to see whether you stabilize or die.",
    "zh-CN": "生命值为 0 时，每回合掷 d20，判断你会稳定还是死亡。"
  },
  "gameHelp.death_save.long": {
    "en": "10 or higher is a success, under 10 is a failure. Three successes and you stabilize; three failures and you die. A natural 20 puts you back up at 1 hit point, a natural 1 counts as two failures, and any healing at all wakes you immediately.",
    "zh-CN": "结果为 10 或更高算成功，低于 10 算失败。累计三次成功会稳定，三次失败会死亡。骰面为 20 时恢复到 1 点生命值，骰面为 1 时算两次失败，任何治疗都能让你立即醒来。"
  },
  "gameHelp.condition.term": {
    "en": "Condition",
    "zh-CN": "状态"
  },
  "gameHelp.condition.short": {
    "en": "A status effect that changes what you can do, like poisoned, frightened or stunned.",
    "zh-CN": "改变你能做什么的状态效果，例如中毒、恐慌或震慑。"
  },
  "gameHelp.condition.long": {
    "en": "Most conditions let you repeat a saving throw at the end of your turns to shake them off. The app tracks the ones you have and applies their effects to your rolls automatically.",
    "zh-CN": "大多数状态允许你在回合结束时再次进行豁免以摆脱效果。应用会记录你的状态，并自动将其影响应用到掷骰。"
  },
  "gameHelp.exhaustion.term": {
    "en": "Exhaustion",
    "zh-CN": "力竭"
  },
  "gameHelp.exhaustion.short": {
    "en": "A stacking penalty from six levels of increasing severity. Level 6 is death.",
    "zh-CN": "可累积的惩罚，共六级，程度逐渐加重。第 6 级会死亡。"
  },
  "gameHelp.exhaustion.long": {
    "en": "It comes from forced marches, going without sleep, and a few powerful abilities that trade stamina for effect. A long rest with food and drink removes one level.",
    "zh-CN": "强行军、缺乏睡眠，以及一些以体力换取效果的强大能力都会带来力竭。获得食物和饮水的长休可减少一级。"
  },
  "gameHelp.attunement.term": {
    "en": "Attunement",
    "zh-CN": "同调"
  },
  "gameHelp.attunement.short": {
    "en": "A bond with a magic item, formed over a short rest. You can hold three at once.",
    "zh-CN": "通过短休与魔法物品建立的联系，同时最多维持三个。"
  },
  "gameHelp.attunement.long": {
    "en": "Items that require attunement do nothing until you attune to them, so the three-slot limit is a real choice about which magic you carry.",
    "zh-CN": "需要同调的物品在完成同调之前不会发挥作用，因此三个名额的限制会影响你选择携带哪些魔法。"
  },
  "gameHelp.difficult_terrain.term": {
    "en": "Difficult terrain",
    "zh-CN": "困难地形"
  },
  "gameHelp.difficult_terrain.short": {
    "en": "Ground that costs double movement: rubble, deep snow, undergrowth, a crowd.",
    "zh-CN": "需要消耗双倍移动的地面，例如碎石、深雪、灌木或拥挤人群。"
  },
  "gameHelp.difficult_terrain.long": {
    "en": "Moving 10 feet through it uses 20 feet of your speed. Some features let you ignore it.",
    "zh-CN": "在困难地形中移动 10 英尺会消耗 20 英尺速度。某些特性允许忽略困难地形。"
  },
  "gameHelp.cover.term": {
    "en": "Cover",
    "zh-CN": "掩护"
  },
  "gameHelp.cover.short": {
    "en": "Something between you and an attacker makes you harder to hit.",
    "zh-CN": "你与攻击者之间的障碍物会让你更难被击中。"
  },
  "gameHelp.cover.long": {
    "en": "Half cover gives +2 AC and +2 on Dexterity saves, three-quarters cover gives +5, and total cover means you cannot be targeted directly at all.",
    "zh-CN": "半身掩护提供 +2 防御等级和 +2 敏捷豁免，四分之三掩护提供 +5；完全掩护使你无法被直接选为目标。"
  },
  "gameHelp.opportunity_attack.term": {
    "en": "Opportunity attack",
    "zh-CN": "借机攻击"
  },
  "gameHelp.opportunity_attack.short": {
    "en": "A free swing when an enemy walks out of your reach.",
    "zh-CN": "敌人离开你的触及范围时，你可进行的一次攻击。"
  },
  "gameHelp.opportunity_attack.long": {
    "en": "It uses your reaction and happens as they leave. Taking the Disengage action avoids provoking it, which is why rogues get Disengage as a bonus action.",
    "zh-CN": "它消耗反应，并在敌人离开时发生。撤离动作可以避免触发借机攻击，因此游荡者可以用附赠动作撤离。"
  },
  "gameHelp.passive_perception.term": {
    "en": "Passive Perception",
    "zh-CN": "被动察觉"
  },
  "gameHelp.passive_perception.short": {
    "en": "A standing score for what you notice without looking. 10 plus your Perception bonus.",
    "zh-CN": "衡量你不主动寻找时能发现什么的固定数值，为 10 + 察觉加值。"
  },
  "gameHelp.passive_perception.long": {
    "en": "The DM checks it against hidden things so nobody has to keep rolling. A higher passive Perception means traps and ambushes are spotted before they matter.",
    "zh-CN": "地下城主将它与隐藏事物比较，无需反复掷骰。被动察觉越高，越可能在陷阱或埋伏造成影响之前发现它们。"
  },
  "gameHelp.skill.term": {
    "en": "Skill",
    "zh-CN": "技能"
  },
  "gameHelp.skill.short": {
    "en": "A narrow area of expertise attached to an ability, like Stealth or Persuasion.",
    "zh-CN": "与某项属性相关的专门领域，例如隐匿或游说。"
  },
  "gameHelp.skill.long": {
    "en": "Being proficient in a skill adds your proficiency bonus to checks that use it. You do not need proficiency to try, only to be reliably good at it.",
    "zh-CN": "熟练掌握技能会让相关检定加上熟练加值。即使不熟练也能尝试，只是熟练能让你更可靠地完成。"
  },
  "gameHelp.expertise.term": {
    "en": "Expertise",
    "zh-CN": "专精"
  },
  "gameHelp.expertise.short": {
    "en": "Doubled proficiency bonus on a chosen skill, so you rarely fail at it.",
    "zh-CN": "对选定技能使用双倍熟练加值，让你更少失败。"
  },
  "gameHelp.expertise.long": {
    "en": "Rogues and bards get it. On a skill you already have proficiency in, it makes you the party's clear specialist.",
    "zh-CN": "游荡者和吟游诗人可以获得专精。对已经熟练掌握的技能取得专精，会让你成为队伍中这方面的专家。"
  },
  "gameHelp.level.term": {
    "en": "Level",
    "zh-CN": "等级"
  },
  "gameHelp.level.short": {
    "en": "How experienced your character is, from 1 to 20. Higher levels bring more hit points, features and spells.",
    "zh-CN": "角色的经验程度，从 1 到 20。更高等级带来更多生命值、特性和法术。"
  },
  "gameHelp.level.long": {
    "en": "Levelling happens between sessions or at a milestone in the story. The app walks you through each choice a new level gives you.",
    "zh-CN": "升级发生在游戏场次之间或故事的里程碑。应用会引导你完成新等级提供的每项选择。"
  },
  "gameHelp.subclass.term": {
    "en": "Subclass",
    "zh-CN": "子职业"
  },
  "gameHelp.subclass.short": {
    "en": "A specialization within your class, chosen at level 1, 2 or 3 depending on the class.",
    "zh-CN": "职业内的专门方向，因职业不同而在 1、2 或 3 级选择。"
  },
  "gameHelp.subclass.long": {
    "en": "Two fighters can play completely differently based on this one choice: a Battle Master spends dice on tactical maneuvers, an Eldritch Knight casts wizard spells. It is the biggest single decision about how your character plays.",
    "zh-CN": "两名战士可能因为这一项选择而有完全不同的玩法：战斗大师消耗骰子执行战术招式，奥法骑士则施放法师法术。它是决定角色玩法的最重要的单项选择。"
  },
  "gameHelp.skillUses": {
    "en": "{skill} uses {ability}. {description}",
    "zh-CN": "{skill}使用{ability}。{description}"
  },
  "gameHelp.pending": {
    "en": "Translation pending: {source}",
    "zh-CN": "翻译待补：{source}"
  }
});

export const GAME_HELP_METADATA = [
  {
    "id": "ability_score",
    "termKey": "gameHelp.ability_score.term",
    "shortKey": "gameHelp.ability_score.short",
    "longKey": "gameHelp.ability_score.long"
  },
  {
    "id": "modifier",
    "termKey": "gameHelp.modifier.term",
    "shortKey": "gameHelp.modifier.short",
    "longKey": "gameHelp.modifier.long"
  },
  {
    "id": "str",
    "termKey": "gameHelp.str.term",
    "shortKey": "gameHelp.str.short",
    "longKey": "gameHelp.str.long"
  },
  {
    "id": "dex",
    "termKey": "gameHelp.dex.term",
    "shortKey": "gameHelp.dex.short",
    "longKey": "gameHelp.dex.long"
  },
  {
    "id": "con",
    "termKey": "gameHelp.con.term",
    "shortKey": "gameHelp.con.short",
    "longKey": "gameHelp.con.long"
  },
  {
    "id": "int",
    "termKey": "gameHelp.int.term",
    "shortKey": "gameHelp.int.short",
    "longKey": "gameHelp.int.long"
  },
  {
    "id": "wis",
    "termKey": "gameHelp.wis.term",
    "shortKey": "gameHelp.wis.short",
    "longKey": "gameHelp.wis.long"
  },
  {
    "id": "cha",
    "termKey": "gameHelp.cha.term",
    "shortKey": "gameHelp.cha.short",
    "longKey": "gameHelp.cha.long"
  },
  {
    "id": "armor_class",
    "termKey": "gameHelp.armor_class.term",
    "shortKey": "gameHelp.armor_class.short",
    "longKey": "gameHelp.armor_class.long"
  },
  {
    "id": "hit_points",
    "termKey": "gameHelp.hit_points.term",
    "shortKey": "gameHelp.hit_points.short",
    "longKey": "gameHelp.hit_points.long"
  },
  {
    "id": "temp_hp",
    "termKey": "gameHelp.temp_hp.term",
    "shortKey": "gameHelp.temp_hp.short",
    "longKey": "gameHelp.temp_hp.long"
  },
  {
    "id": "hit_dice",
    "termKey": "gameHelp.hit_dice.term",
    "shortKey": "gameHelp.hit_dice.short",
    "longKey": "gameHelp.hit_dice.long"
  },
  {
    "id": "ability_check",
    "termKey": "gameHelp.ability_check.term",
    "shortKey": "gameHelp.ability_check.short",
    "longKey": "gameHelp.ability_check.long"
  },
  {
    "id": "saving_throw",
    "termKey": "gameHelp.saving_throw.term",
    "shortKey": "gameHelp.saving_throw.short",
    "longKey": "gameHelp.saving_throw.long"
  },
  {
    "id": "proficiency_bonus",
    "termKey": "gameHelp.proficiency_bonus.term",
    "shortKey": "gameHelp.proficiency_bonus.short",
    "longKey": "gameHelp.proficiency_bonus.long"
  },
  {
    "id": "advantage",
    "termKey": "gameHelp.advantage.term",
    "shortKey": "gameHelp.advantage.short",
    "longKey": "gameHelp.advantage.long"
  },
  {
    "id": "disadvantage",
    "termKey": "gameHelp.disadvantage.term",
    "shortKey": "gameHelp.disadvantage.short",
    "longKey": "gameHelp.disadvantage.long"
  },
  {
    "id": "initiative",
    "termKey": "gameHelp.initiative.term",
    "shortKey": "gameHelp.initiative.short",
    "longKey": "gameHelp.initiative.long"
  },
  {
    "id": "action",
    "termKey": "gameHelp.action.term",
    "shortKey": "gameHelp.action.short",
    "longKey": "gameHelp.action.long"
  },
  {
    "id": "bonus_action",
    "termKey": "gameHelp.bonus_action.term",
    "shortKey": "gameHelp.bonus_action.short",
    "longKey": "gameHelp.bonus_action.long"
  },
  {
    "id": "reaction",
    "termKey": "gameHelp.reaction.term",
    "shortKey": "gameHelp.reaction.short",
    "longKey": "gameHelp.reaction.long"
  },
  {
    "id": "attack_roll",
    "termKey": "gameHelp.attack_roll.term",
    "shortKey": "gameHelp.attack_roll.short",
    "longKey": "gameHelp.attack_roll.long"
  },
  {
    "id": "critical_hit",
    "termKey": "gameHelp.critical_hit.term",
    "shortKey": "gameHelp.critical_hit.short",
    "longKey": "gameHelp.critical_hit.long"
  },
  {
    "id": "spell_slot",
    "termKey": "gameHelp.spell_slot.term",
    "shortKey": "gameHelp.spell_slot.short",
    "longKey": "gameHelp.spell_slot.long"
  },
  {
    "id": "cantrip",
    "termKey": "gameHelp.cantrip.term",
    "shortKey": "gameHelp.cantrip.short",
    "longKey": "gameHelp.cantrip.long"
  },
  {
    "id": "spell_save_dc",
    "termKey": "gameHelp.spell_save_dc.term",
    "shortKey": "gameHelp.spell_save_dc.short",
    "longKey": "gameHelp.spell_save_dc.long"
  },
  {
    "id": "concentration",
    "termKey": "gameHelp.concentration.term",
    "shortKey": "gameHelp.concentration.short",
    "longKey": "gameHelp.concentration.long"
  },
  {
    "id": "ritual",
    "termKey": "gameHelp.ritual.term",
    "shortKey": "gameHelp.ritual.short",
    "longKey": "gameHelp.ritual.long"
  },
  {
    "id": "prepared_spells",
    "termKey": "gameHelp.prepared_spells.term",
    "shortKey": "gameHelp.prepared_spells.short",
    "longKey": "gameHelp.prepared_spells.long"
  },
  {
    "id": "short_rest",
    "termKey": "gameHelp.short_rest.term",
    "shortKey": "gameHelp.short_rest.short",
    "longKey": "gameHelp.short_rest.long"
  },
  {
    "id": "long_rest",
    "termKey": "gameHelp.long_rest.term",
    "shortKey": "gameHelp.long_rest.short",
    "longKey": "gameHelp.long_rest.long"
  },
  {
    "id": "death_save",
    "termKey": "gameHelp.death_save.term",
    "shortKey": "gameHelp.death_save.short",
    "longKey": "gameHelp.death_save.long"
  },
  {
    "id": "condition",
    "termKey": "gameHelp.condition.term",
    "shortKey": "gameHelp.condition.short",
    "longKey": "gameHelp.condition.long"
  },
  {
    "id": "exhaustion",
    "termKey": "gameHelp.exhaustion.term",
    "shortKey": "gameHelp.exhaustion.short",
    "longKey": "gameHelp.exhaustion.long"
  },
  {
    "id": "attunement",
    "termKey": "gameHelp.attunement.term",
    "shortKey": "gameHelp.attunement.short",
    "longKey": "gameHelp.attunement.long"
  },
  {
    "id": "difficult_terrain",
    "termKey": "gameHelp.difficult_terrain.term",
    "shortKey": "gameHelp.difficult_terrain.short",
    "longKey": "gameHelp.difficult_terrain.long"
  },
  {
    "id": "cover",
    "termKey": "gameHelp.cover.term",
    "shortKey": "gameHelp.cover.short",
    "longKey": "gameHelp.cover.long"
  },
  {
    "id": "opportunity_attack",
    "termKey": "gameHelp.opportunity_attack.term",
    "shortKey": "gameHelp.opportunity_attack.short",
    "longKey": "gameHelp.opportunity_attack.long"
  },
  {
    "id": "passive_perception",
    "termKey": "gameHelp.passive_perception.term",
    "shortKey": "gameHelp.passive_perception.short",
    "longKey": "gameHelp.passive_perception.long"
  },
  {
    "id": "skill",
    "termKey": "gameHelp.skill.term",
    "shortKey": "gameHelp.skill.short",
    "longKey": "gameHelp.skill.long"
  },
  {
    "id": "expertise",
    "termKey": "gameHelp.expertise.term",
    "shortKey": "gameHelp.expertise.short",
    "longKey": "gameHelp.expertise.long"
  },
  {
    "id": "level",
    "termKey": "gameHelp.level.term",
    "shortKey": "gameHelp.level.short",
    "longKey": "gameHelp.level.long"
  },
  {
    "id": "subclass",
    "termKey": "gameHelp.subclass.term",
    "shortKey": "gameHelp.subclass.short",
    "longKey": "gameHelp.subclass.long"
  }
] as const;
