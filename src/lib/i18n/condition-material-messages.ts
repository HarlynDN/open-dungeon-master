import { defineMessages } from "./catalog.ts";

// Original source-compared translations of all native condition-effect labels
// and brief summaries. Rules, canonical matching terms and tool text stay English.
export const CONDITION_MATERIAL_MESSAGES = /*#__PURE__*/ defineMessages({
  "combatDetail.effect.empty_body.name": {
    "en": "empty body",
    "zh-CN": "空灵体"
  },
  "combatDetail.effect.empty_body.summary": {
    "en": "Empty Body: invisible, and resistant to all damage except force, for a minute.",
    "zh-CN": "空灵体：隐形，并在一分钟内对除力场外的所有伤害具有抗性。"
  },
  "combatDetail.effect.sacred_weapon.name": {
    "en": "sacred weapon",
    "zh-CN": "神圣武器"
  },
  "combatDetail.effect.sacred_weapon.summary": {
    "en": "Sacred Weapon: the paladin's Charisma modifier is added to their weapon attack rolls, and the weapon sheds bright light, for a minute.",
    "zh-CN": "神圣武器：一分钟内，武器攻击掷骰加上圣武士的魅力调整值，武器散发明亮光照。"
  },
  "combatDetail.effect.blessed.name": {
    "en": "blessed",
    "zh-CN": "祝福术"
  },
  "combatDetail.effect.blessed.summary": {
    "en": "Bless: +1d4 on attack rolls and saving throws.",
    "zh-CN": "祝福术：攻击掷骰和豁免获得 +1d4。"
  },
  "combatDetail.effect.baned.name": {
    "en": "baned",
    "zh-CN": "灾祸术"
  },
  "combatDetail.effect.baned.summary": {
    "en": "Bane: -1d4 on attack rolls and saving throws.",
    "zh-CN": "灾祸术：攻击掷骰和豁免受到 -1d4。"
  },
  "combatDetail.effect.shield_of_faith.name": {
    "en": "shield of faith",
    "zh-CN": "信仰之盾"
  },
  "combatDetail.effect.shield_of_faith.summary": {
    "en": "Shield of Faith: +2 AC.",
    "zh-CN": "信仰之盾：护甲等级 +2。"
  },
  "combatDetail.effect.shielded.name": {
    "en": "shielded",
    "zh-CN": "护盾术"
  },
  "combatDetail.effect.shielded.summary": {
    "en": "Shield: +5 AC until the start of their next turn.",
    "zh-CN": "护盾术：护甲等级 +5，持续至其下个回合开始。"
  },
  "combatDetail.effect.mage_armor.name": {
    "en": "mage armor",
    "zh-CN": "法师护甲"
  },
  "combatDetail.effect.mage_armor.summary": {
    "en": "Mage Armor: base AC 13 + DEX while wearing no armor.",
    "zh-CN": "法师护甲：未穿护甲时，基础护甲等级为 13 + 敏捷调整值。"
  },
  "combatDetail.effect.barkskin.name": {
    "en": "barkskin",
    "zh-CN": "树皮术"
  },
  "combatDetail.effect.barkskin.summary": {
    "en": "Barkskin: AC cannot drop below 16.",
    "zh-CN": "树皮术：护甲等级不会低于 16。"
  },
  "combatDetail.effect.hasted.name": {
    "en": "hasted",
    "zh-CN": "加速术"
  },
  "combatDetail.effect.hasted.summary": {
    "en": "Haste: +2 AC, advantage on DEX saves, doubled speed, and one extra action each turn (one weapon attack, Dash, Disengage, Hide, or Use an Object).",
    "zh-CN": "加速术：护甲等级 +2，敏捷豁免具有优势，速度加倍，每回合额外获得一个动作，可用于一次武器攻击、疾走、撤离、躲藏或使用物品。"
  },
  "combatDetail.effect.polymorphed.name": {
    "en": "polymorphed",
    "zh-CN": "变形术"
  },
  "combatDetail.effect.polymorphed.summary": {
    "en": "Polymorph: transformed into a beast; the form's stat block replaces their own (the server tracks it as a transformation), they cannot speak or cast, and damage past the form's hit points reverts them.",
    "zh-CN": "变形术：化为野兽，以该形态的数据替代自身数据；无法说话或施法，超出形态生命值的伤害会使其恢复原形。"
  },
  "combatDetail.effect.slowed.name": {
    "en": "slowed",
    "zh-CN": "缓慢术"
  },
  "combatDetail.effect.slowed.summary": {
    "en": "Slow: -2 AC and DEX saves, speed halved, no reactions, and an action OR a bonus action each turn, not both.",
    "zh-CN": "缓慢术：护甲等级和敏捷豁免 -2，速度减半，无法使用反应，每回合只能使用动作或附赠动作之一。"
  },
  "combatDetail.effect.blade_ward.name": {
    "en": "blade ward",
    "zh-CN": "剑刃防护"
  },
  "combatDetail.effect.blade_ward.summary": {
    "en": "Blade Ward: resistance to bludgeoning, piercing, and slashing damage from weapon attacks until the end of their next turn.",
    "zh-CN": "剑刃防护：对武器攻击造成的钝击、穿刺和挥砍伤害具有抗性，持续至其下个回合结束。"
  },
  "combatDetail.effect.stoneskin.name": {
    "en": "stoneskin",
    "zh-CN": "石肤术"
  },
  "combatDetail.effect.stoneskin.summary": {
    "en": "Stoneskin: resistance to nonmagical bludgeoning, piercing, and slashing damage.",
    "zh-CN": "石肤术：对非魔法钝击、穿刺和挥砍伤害具有抗性。"
  },
  "combatDetail.effect.blurred.name": {
    "en": "blurred",
    "zh-CN": "朦胧术"
  },
  "combatDetail.effect.blurred.summary": {
    "en": "Blur: attack rolls against them are made at disadvantage unless the attacker sees through illusions.",
    "zh-CN": "朦胧术：针对其的攻击掷骰具有劣势，除非攻击者能看穿幻象。"
  },
  "combatDetail.effect.faerie_fire.name": {
    "en": "faerie fire",
    "zh-CN": "精灵之火"
  },
  "combatDetail.effect.faerie_fire.summary": {
    "en": "Faerie Fire: attack rolls against them have advantage, and they cannot benefit from being invisible.",
    "zh-CN": "精灵之火：针对其的攻击掷骰具有优势，且其无法从隐形状态中获益。"
  },
  "combatDetail.effect.guidance.name": {
    "en": "guidance",
    "zh-CN": "指引术"
  },
  "combatDetail.effect.guidance.summary": {
    "en": "Guidance: +1d4 on one ability check, then the spell ends.",
    "zh-CN": "指引术：一次属性检定获得 +1d4，随后法术结束。"
  },
  "combatDetail.effect.resistance_spell.name": {
    "en": "resistance (spell)",
    "zh-CN": "抵抗术"
  },
  "combatDetail.effect.resistance_spell.summary": {
    "en": "Resistance: +1d4 on one saving throw, then the spell ends.",
    "zh-CN": "抵抗术：一次豁免获得 +1d4，随后法术结束。"
  },
  "combatDetail.effect.true_strike.name": {
    "en": "true strike",
    "zh-CN": "克敌先机"
  },
  "combatDetail.effect.true_strike.summary": {
    "en": "True Strike: advantage on their next attack roll against the target, then the spell ends.",
    "zh-CN": "克敌先机：对指定目标的下次攻击掷骰具有优势，随后法术结束。"
  },
  "combatDetail.effect.divine_favor.name": {
    "en": "divine favor",
    "zh-CN": "神恩术"
  },
  "combatDetail.effect.divine_favor.summary": {
    "en": "Divine Favor: weapon attacks deal +1d4 radiant damage.",
    "zh-CN": "神恩术：武器攻击额外造成 +1d4 光耀伤害。"
  },
  "combatDetail.effect.hunters_mark.name": {
    "en": "hunter's mark",
    "zh-CN": "猎人印记"
  },
  "combatDetail.effect.hunters_mark.summary": {
    "en": "Hunter's Mark: +1d6 weapon damage against the marked quarry, and advantage on Perception and Survival checks to find it.",
    "zh-CN": "猎人印记：对标记猎物的武器伤害额外增加 +1d6，寻找该猎物的察觉和求生检定具有优势。"
  },
  "combatDetail.effect.hexed_caster.name": {
    "en": "hexing",
    "zh-CN": "咒缚术"
  },
  "combatDetail.effect.hexed_caster.summary": {
    "en": "Hex: attacks against the hexed target deal +1d6 necrotic damage, and it has disadvantage on checks with the chosen ability.",
    "zh-CN": "咒缚术：攻击被诅咒的目标时额外造成 +1d6 黯蚀伤害，目标指定属性的检定具有劣势。"
  },
  "combatDetail.effect.enlarged.name": {
    "en": "enlarged",
    "zh-CN": "变巨"
  },
  "combatDetail.effect.enlarged.summary": {
    "en": "Enlarged: one size bigger, advantage on Strength checks and saves, and weapon attacks deal +1d4 damage.",
    "zh-CN": "变巨：体型增大一级，力量检定和豁免具有优势，武器攻击额外造成 +1d4 伤害。"
  },
  "combatDetail.effect.reduced.name": {
    "en": "reduced",
    "zh-CN": "缩小"
  },
  "combatDetail.effect.reduced.summary": {
    "en": "Reduced: one size smaller, disadvantage on Strength checks and saves, and weapon attacks deal -1d4 damage.",
    "zh-CN": "缩小：体型减小一级，力量检定和豁免具有劣势，武器攻击伤害减少 -1d4。"
  },
  "combatDetail.effect.branding_smite.name": {
    "en": "branding smite",
    "zh-CN": "烙印斩"
  },
  "combatDetail.effect.branding_smite.summary": {
    "en": "Branding Smite: the next weapon hit deals +2d6 radiant and makes the target visible (it cannot become invisible) until the spell ends; the charge is spent by the hit.",
    "zh-CN": "烙印斩：下次武器命中额外造成 +2d6 光耀伤害，并使目标可见、无法隐形，持续至法术结束；命中会消耗此效果。"
  },
  "combatDetail.effect.guiding_bolt.name": {
    "en": "guiding bolt",
    "zh-CN": "曳光弹"
  },
  "combatDetail.effect.guiding_bolt.summary": {
    "en": "Guiding Bolt: the next attack roll against this creature has advantage, and that attack spends it (it fades as the caster's next turn starts).",
    "zh-CN": "曳光弹：针对该生物的下次攻击掷骰具有优势，该次攻击会消耗此效果；效果也会在施法者下个回合开始时消失。"
  },
  "combatDetail.effect.shocked.name": {
    "en": "shocked",
    "zh-CN": "电爪术"
  },
  "combatDetail.effect.shocked.summary": {
    "en": "Shocking Grasp: the creature cannot take reactions until its next turn starts.",
    "zh-CN": "电爪术：该生物无法使用反应，持续至其下个回合开始。"
  },
  "combatDetail.effect.ray_of_frost.name": {
    "en": "ray of frost",
    "zh-CN": "寒霜射线"
  },
  "combatDetail.effect.ray_of_frost.summary": {
    "en": "Ray of Frost: the creature's speed is 10 feet lower until the caster's next turn starts.",
    "zh-CN": "寒霜射线：该生物速度降低 10 英尺，持续至施法者下个回合开始。"
  },
  "combatDetail.effect.chill_touch.name": {
    "en": "chill touch",
    "zh-CN": "冻寒之触"
  },
  "combatDetail.effect.chill_touch.summary": {
    "en": "Chill Touch: the creature cannot regain hit points until the caster's next turn starts, and an undead one has disadvantage on attack rolls against the caster until then.",
    "zh-CN": "冻寒之触：该生物无法恢复生命值，持续至施法者下个回合开始；不死生物对施法者的攻击掷骰在此期间还具有劣势。"
  },
  "combatDetail.effect.reckless.name": {
    "en": "reckless",
    "zh-CN": "鲁莽攻击"
  },
  "combatDetail.effect.reckless.summary": {
    "en": "Reckless Attack: advantage on melee Strength weapon attacks this turn, and attack rolls against them have advantage until their next turn.",
    "zh-CN": "鲁莽攻击：本回合使用力量的近战武器攻击具有优势，针对其的攻击掷骰具有优势，持续至其下个回合。"
  },
  "combatDetail.effect.frenzied.name": {
    "en": "frenzied",
    "zh-CN": "狂热"
  },
  "combatDetail.effect.frenzied.summary": {
    "en": "Frenzy: while the rage lasts, one melee weapon attack as a bonus action on each of their turns (pc_attack bonusAttack 'frenzy'); one level of exhaustion when the rage ends.",
    "zh-CN": "狂热：狂暴期间，每个回合可用附赠动作进行一次近战武器攻击；狂暴结束时获得一级力竭。"
  },
  "combatDetail.effect.longstrider.name": {
    "en": "longstrider",
    "zh-CN": "大步奔行"
  },
  "combatDetail.effect.longstrider.summary": {
    "en": "Longstrider: +10 feet of speed.",
    "zh-CN": "大步奔行：速度增加 +10 英尺。"
  },
  "combatDetail.effect.stopped.name": {
    "en": "stopped",
    "zh-CN": "止步"
  },
  "combatDetail.effect.stopped.summary": {
    "en": "Stopped: speed 0 for the rest of the turn (Sentinel's opportunity attack hit).",
    "zh-CN": "止步：本回合剩余时间内速度为 0，源于哨兵的借机攻击命中。"
  },
  "combatDetail.effect.hamstrung.name": {
    "en": "hamstrung",
    "zh-CN": "脚步受阻"
  },
  "combatDetail.effect.hamstrung.summary": {
    "en": "Hamstrung: speed reduced by 10 feet until the start of the attacker's next turn (Slasher).",
    "zh-CN": "脚步受阻：速度降低 10 英尺，持续至攻击者下个回合开始，源于挥砍者。"
  },
  "combatDetail.effect.shaken.name": {
    "en": "shaken",
    "zh-CN": "惊惧"
  },
  "combatDetail.effect.shaken.summary": {
    "en": "Shaken: disadvantage on attack rolls until the start of the attacker's next turn (Slasher's critical hit).",
    "zh-CN": "惊惧：攻击掷骰具有劣势，持续至攻击者下个回合开始，源于挥砍者的重击。"
  },
  "combatDetail.effect.exposed.name": {
    "en": "exposed",
    "zh-CN": "破绽暴露"
  },
  "combatDetail.effect.exposed.summary": {
    "en": "Exposed: attack rolls against them have advantage until the start of the attacker's next turn (Crusher's critical hit).",
    "zh-CN": "破绽暴露：针对其的攻击掷骰具有优势，持续至攻击者下个回合开始，源于粉碎者的重击。"
  },
  "combatDetail.effect.protected.name": {
    "en": "protected",
    "zh-CN": "受到保护"
  },
  "combatDetail.effect.protected.summary": {
    "en": "Protected: attack rolls against them are made at disadvantage until the start of their protector's next turn.",
    "zh-CN": "受到保护：针对其的攻击掷骰具有劣势，持续至保护者下个回合开始。"
  },
  "combatDetail.effect.heroism.name": {
    "en": "heroism",
    "zh-CN": "英雄气概"
  },
  "combatDetail.effect.heroism.summary": {
    "en": "Heroism: immune to being frightened, and they gain temporary hit points equal to the caster's spellcasting modifier at the start of each of their turns.",
    "zh-CN": "英雄气概：免疫恐慌，每个回合开始时获得等同于施法者施法属性调整值的临时生命值。"
  },
  "combatDetail.effect.mirror_image.name": {
    "en": "mirror image",
    "zh-CN": "镜像术"
  },
  "combatDetail.effect.mirror_image.summary": {
    "en": "Mirror Image: three duplicates; an attack that would hit may strike a duplicate instead (d20: 6+ with three, 8+ with two, 11+ with one), destroying it.",
    "zh-CN": "镜像术：存在三个分身；本应命中的攻击可能转而击中并摧毁分身。d20 门槛：三个分身时 6+，两个时 8+，一个时 11+。"
  },
  "combatDetail.effect.starry_form_archer.name": {
    "en": "starry form: archer",
    "zh-CN": "星辰形态：弓手"
  },
  "combatDetail.effect.starry_form_archer.summary": {
    "en": "Starry Form (Archer): as a bonus action, a luminous arrow strikes one enemy: a ranged spell attack for 1d8 + WIS radiant (2d8 at druid level 10). Resolve it with pc_attack, weapon 'Starry Form: Archer'.",
    "zh-CN": "星辰形态（弓手）：用附赠动作发射光箭，对一个敌人进行远程法术攻击，造成 1d8 + 感知调整值的光耀伤害；德鲁伊 10 级时为 2d8。"
  },
  "combatDetail.effect.starry_form_chalice.name": {
    "en": "starry form: chalice",
    "zh-CN": "星辰形态：圣杯"
  },
  "combatDetail.effect.starry_form_chalice.summary": {
    "en": "Starry Form (Chalice): whenever they cast a healing spell with a slot, they or a creature within 30 feet also regains 1d8 + WIS hit points.",
    "zh-CN": "星辰形态（圣杯）：消耗法术位施放治疗法术时，自身或 30 英尺内的一个生物额外恢复 1d8 + 感知调整值的生命值。"
  },
  "combatDetail.effect.starry_form_dragon.name": {
    "en": "starry form: dragon",
    "zh-CN": "星辰形态：巨龙"
  },
  "combatDetail.effect.starry_form_dragon.summary": {
    "en": "Starry Form (Dragon): a concentration save or an Intelligence/Wisdom check treats a d20 roll of 9 or lower as a 10.",
    "zh-CN": "星辰形态（巨龙）：专注豁免或智力、感知检定的 d20 结果为 9 或更低时，视为 10。"
  },
  "combatDetail.effect.absorb_elements.name": {
    "en": "absorb elements",
    "zh-CN": "吸收元素"
  },
  "combatDetail.effect.absorb_elements.summary": {
    "en": "Absorb Elements: resistance to the absorbed damage type (named in the condition) until the start of their next turn.",
    "zh-CN": "吸收元素：对状态名称中指定的伤害类型具有抗性，持续至其下个回合开始。"
  },
  "combatDetail.effect.absorbed_strike.name": {
    "en": "absorbed strike",
    "zh-CN": "吸收元素打击"
  },
  "combatDetail.effect.absorbed_strike.summary": {
    "en": "Absorb Elements: the first time they hit with a melee attack on their next turn, the target takes the extra dice of the absorbed type named in the condition, and the spell ends.",
    "zh-CN": "吸收元素：下个回合首次近战命中时，目标额外受到状态名称中指定的骰数和类型的伤害，随后法术结束。"
  },
  "combatDetail.effect.armor_of_agathys.name": {
    "en": "armor of agathys",
    "zh-CN": "阿迦西斯之甲"
  },
  "combatDetail.effect.armor_of_agathys.summary": {
    "en": "Armor of Agathys: while its temporary hit points last, a creature that hits them with a melee attack takes 5 cold damage per slot level (apply with damage_enemy).",
    "zh-CN": "阿迦西斯之甲：法术提供的临时生命值尚在时，近战命中其的生物受到每环法术位 5 点寒冷伤害。"
  },
  "combatDetail.effect.gift_of_alacrity.name": {
    "en": "gift of alacrity",
    "zh-CN": "敏捷之赐"
  },
  "combatDetail.effect.gift_of_alacrity.summary": {
    "en": "Gift of Alacrity: +1d8 on initiative rolls.",
    "zh-CN": "敏捷之赐：先攻掷骰获得 +1d8。"
  },
  "combatDetail.effect.zephyr_strike.name": {
    "en": "zephyr strike",
    "zh-CN": "和风打击"
  },
  "combatDetail.effect.zephyr_strike.summary": {
    "en": "Zephyr Strike: their movement provokes no opportunity attacks; their next weapon attack has advantage and deals +1d8 force, then the charge is spent (the spell's speed burst rides that turn).",
    "zh-CN": "和风打击：移动不引发借机攻击；下次武器攻击具有优势并额外造成 +1d8 力场伤害，随后消耗打击效果；速度提升适用于该回合。"
  },
  "combatDetail.effect.kinetic_jaunt.name": {
    "en": "kinetic jaunt",
    "zh-CN": "动能跃行"
  },
  "combatDetail.effect.kinetic_jaunt.summary": {
    "en": "Kinetic Jaunt: +10 feet of speed, movement provokes no opportunity attacks, and they can move through other creatures' spaces.",
    "zh-CN": "动能跃行：速度增加 +10 英尺，移动不引发借机攻击，并可穿过其他生物的空间。"
  },
  "combatDetail.effect.warding_wind.name": {
    "en": "warding wind",
    "zh-CN": "守护之风"
  },
  "combatDetail.effect.warding_wind.summary": {
    "en": "Warding Wind: a 10-foot wind aura deafens those inside, is difficult terrain for others, and gives ranged weapon attacks into or out of it disadvantage.",
    "zh-CN": "守护之风：10 英尺风之光环使内部生物耳聋，对其他生物形成困难地形，进入或离开光环的远程武器攻击具有劣势。"
  },
  "combatDetail.effect.shadow_blade.name": {
    "en": "shadow blade",
    "zh-CN": "影刃术"
  },
  "combatDetail.effect.shadow_blade.summary": {
    "en": "Shadow Blade: a conjured finesse blade dealing 2d8 psychic; attack with pc_attack, weapon 'Shadow Blade' (advantage against targets in dim light or darkness).",
    "zh-CN": "影刃术：召唤一把灵巧刀刃，造成 2d8 心灵伤害；对微光或黑暗中的目标攻击具有优势。"
  },
  "combatDetail.effect.crusaders_mantle.name": {
    "en": "crusader's mantle",
    "zh-CN": "圣战披风"
  },
  "combatDetail.effect.crusaders_mantle.summary": {
    "en": "Crusader's Mantle: their weapon attacks deal +1d4 radiant damage.",
    "zh-CN": "圣战披风：武器攻击额外造成 +1d4 光耀伤害。"
  },
  "combatDetail.effect.elemental_weapon.name": {
    "en": "elemental weapon",
    "zh-CN": "元素武器"
  },
  "combatDetail.effect.elemental_weapon.summary": {
    "en": "Elemental Weapon: the touched weapon is magical, +1 to attack rolls, and deals +1d4 of the chosen element.",
    "zh-CN": "元素武器：接触的武器成为魔法武器，攻击掷骰 +1，并额外造成 +1d4 指定元素伤害。"
  },
  "combatDetail.effect.flame_arrows.name": {
    "en": "flame arrows",
    "zh-CN": "烈焰箭矢"
  },
  "combatDetail.effect.flame_arrows.summary": {
    "en": "Flame Arrows: ammunition drawn from the quiver deals +1d6 fire damage on a hit (twelve pieces).",
    "zh-CN": "烈焰箭矢：从箭袋取出的弹药命中时额外造成 +1d6 火焰伤害，最多十二发。"
  },
  "combatDetail.effect.spirit_shroud.name": {
    "en": "spirit shroud",
    "zh-CN": "精魂裹身"
  },
  "combatDetail.effect.spirit_shroud.summary": {
    "en": "Spirit Shroud: their hits within 10 feet deal +1d8 radiant, necrotic, or cold damage; enemies starting their turn nearby lose 10 feet of speed and cannot regain hit points.",
    "zh-CN": "精魂裹身：命中 10 英尺内的目标时额外造成 +1d8 光耀、黯蚀或寒冷伤害；附近敌人在回合开始时速度降低 10 英尺，且无法恢复生命值。"
  },
  "combatDetail.effect.thunderous_smite.name": {
    "en": "thunderous smite",
    "zh-CN": "雷鸣斩"
  },
  "combatDetail.effect.thunderous_smite.summary": {
    "en": "Thunderous Smite: the next weapon hit deals +2d6 thunder and forces a STR save or the target is pushed 10 feet and knocked prone; the charge is spent by the hit.",
    "zh-CN": "雷鸣斩：下次武器命中额外造成 +2d6 雷鸣伤害，目标须进行力量豁免，失败则被推开 10 英尺并倒地；命中消耗此效果。"
  },
  "combatDetail.effect.wrathful_smite.name": {
    "en": "wrathful smite",
    "zh-CN": "愤怒斩"
  },
  "combatDetail.effect.wrathful_smite.summary": {
    "en": "Wrathful Smite: the next weapon hit deals +1d6 psychic and forces a WIS save or the target is frightened; the charge is spent by the hit.",
    "zh-CN": "愤怒斩：下次武器命中额外造成 +1d6 心灵伤害，目标须进行感知豁免，失败则恐慌；命中消耗此效果。"
  },
  "combatDetail.effect.searing_smite.name": {
    "en": "searing smite",
    "zh-CN": "炽灼斩"
  },
  "combatDetail.effect.searing_smite.summary": {
    "en": "Searing Smite: the next weapon hit deals +1d6 fire and ignites the target (1d6 fire at the start of its turns, CON save ends); the charge is spent by the hit.",
    "zh-CN": "炽灼斩：下次武器命中额外造成 +1d6 火焰伤害并点燃目标；其每回合开始受到 1d6 火焰伤害，体质豁免成功则结束；命中消耗此效果。"
  },
  "combatDetail.effect.blinding_smite.name": {
    "en": "blinding smite",
    "zh-CN": "致盲斩"
  },
  "combatDetail.effect.blinding_smite.summary": {
    "en": "Blinding Smite: the next weapon hit deals +3d8 radiant and forces a CON save or the target is blinded; the charge is spent by the hit.",
    "zh-CN": "致盲斩：下次武器命中额外造成 +3d8 光耀伤害，目标须进行体质豁免，失败则目盲；命中消耗此效果。"
  },
  "combatDetail.effect.staggering_smite.name": {
    "en": "staggering smite",
    "zh-CN": "震慑斩"
  },
  "combatDetail.effect.staggering_smite.summary": {
    "en": "Staggering Smite: the next weapon hit deals +4d6 psychic and forces a WIS save or the target reels (disadvantage on attacks and checks, no reactions, for a turn); the charge is spent by the hit.",
    "zh-CN": "震慑斩：下次武器命中额外造成 +4d6 心灵伤害，目标须进行感知豁免，失败则在一个回合内踉跄，攻击和检定具有劣势且无法使用反应；命中消耗此效果。"
  },
  "combatDetail.effect.banishing_smite.name": {
    "en": "banishing smite",
    "zh-CN": "放逐斩"
  },
  "combatDetail.effect.banishing_smite.summary": {
    "en": "Banishing Smite: the next weapon hit deals +5d10 force, banishing the target if that leaves it at 50 HP or fewer; the charge is spent by the hit.",
    "zh-CN": "放逐斩：下次武器命中额外造成 +5d10 力场伤害；若目标因此剩余 50 或更少生命值则将其放逐；命中消耗此效果。"
  },
  "combatDetail.effect.blazing_stride.name": {
    "en": "blazing stride",
    "zh-CN": "烈焰步伐"
  },
  "combatDetail.effect.blazing_stride.summary": {
    "en": "Blazing Stride: +20 feet of speed, no opportunity attacks against them, and creatures they pass within 5 feet of take 1d6 fire damage (once each per turn; apply with damage_enemy).",
    "zh-CN": "烈焰步伐：速度增加 +20 英尺，不受借机攻击；移动经过 5 英尺内的生物时，对其造成 1d6 火焰伤害，每个生物每回合至多一次。"
  },
  "combatDetail.effect.aura_of_purity.name": {
    "en": "aura of purity",
    "zh-CN": "纯净灵光"
  },
  "combatDetail.effect.aura_of_purity.summary": {
    "en": "Aura of Purity: resistance to poison damage, immunity to disease, and advantage on saves against blinding, charm, deafness, fright, paralysis, poison, and stunning.",
    "zh-CN": "纯净灵光：对毒素伤害具有抗性，免疫疾病，对目盲、魅惑、耳聋、恐慌、麻痹、中毒和震慑的豁免具有优势。"
  },
  "combatDetail.effect.guardian_primal_beast.name": {
    "en": "guardian of nature: primal beast",
    "zh-CN": "自然守卫：原始野兽"
  },
  "combatDetail.effect.guardian_primal_beast.summary": {
    "en": "Guardian of Nature (Primal Beast): +10 feet of speed, 120-foot darkvision, advantage on Strength checks and saves, and attacks deal +1d6 force.",
    "zh-CN": "自然守卫（原始野兽）：速度增加 +10 英尺，获得 120 英尺黑暗视觉，力量检定和豁免具有优势，攻击额外造成 +1d6 力场伤害。"
  },
  "combatDetail.effect.guardian_great_tree.name": {
    "en": "guardian of nature: great tree",
    "zh-CN": "自然守卫：巨树"
  },
  "combatDetail.effect.guardian_great_tree.summary": {
    "en": "Guardian of Nature (Great Tree): advantage on Constitution saves and on Dexterity- and Wisdom-based attacks, and the ground within 15 feet is difficult terrain for enemies (the temporary hit points were granted at casting).",
    "zh-CN": "自然守卫（巨树）：体质豁免，以及基于敏捷或感知的攻击具有优势；15 英尺内的地面对敌人是困难地形，临时生命值已在施法时获得。"
  },
  "combatDetail.effect.shadow_of_moil.name": {
    "en": "shadow of moil",
    "zh-CN": "昏暗之影"
  },
  "combatDetail.effect.shadow_of_moil.summary": {
    "en": "Shadow of Moil: resistance to radiant damage, attacks against them are at disadvantage, and a melee hit against them costs the attacker 2d8 necrotic (apply with damage_enemy).",
    "zh-CN": "昏暗之影：对光耀伤害具有抗性，针对其的攻击具有劣势；近战命中其的攻击者受到 2d8 黯蚀伤害。"
  },
  "combatDetail.effect.arcane_hand.name": {
    "en": "arcane hand",
    "zh-CN": "奥术之手"
  },
  "combatDetail.effect.arcane_hand.summary": {
    "en": "Arcane Hand: as a bonus action the hand strikes (Clenched Fist via pc_attack, weapon 'Arcane Hand', 4d8 force), shoves, grapples, or blocks.",
    "zh-CN": "奥术之手：用附赠动作让巨手攻击、推撞、擒抱或阻挡；握拳打击造成 4d8 力场伤害。"
  },
  "combatDetail.effect.circle_of_power.name": {
    "en": "circle of power",
    "zh-CN": "威能法阵"
  },
  "combatDetail.effect.circle_of_power.summary": {
    "en": "Circle of Power: advantage on saving throws against spells and magical effects, and a successful save for half damage means none instead.",
    "zh-CN": "威能法阵：对法术和魔法效应的豁免具有优势；成功豁免原本会使伤害减半时，改为不受伤害。"
  },
  "combatDetail.effect.far_step.name": {
    "en": "far step",
    "zh-CN": "远行步"
  },
  "combatDetail.effect.far_step.summary": {
    "en": "Far Step: a bonus action teleports them up to 60 feet each turn.",
    "zh-CN": "远行步：每回合可用附赠动作传送至最多 60 英尺外。"
  },
  "combatDetail.effect.swift_quiver.name": {
    "en": "swift quiver",
    "zh-CN": "迅捷箭袋"
  },
  "combatDetail.effect.swift_quiver.summary": {
    "en": "Swift Quiver: a bonus action makes two attacks with a weapon fed by the quiver (resolve each with pc_attack).",
    "zh-CN": "迅捷箭袋：用附赠动作以该箭袋供弹的武器进行两次攻击。"
  },
  "combatDetail.effect.holy_weapon.name": {
    "en": "holy weapon",
    "zh-CN": "神圣武器"
  },
  "combatDetail.effect.holy_weapon.summary": {
    "en": "Holy Weapon: the weapon is magical, sheds bright light, and deals +2d8 radiant on a hit; it can burst when the spell is ended early.",
    "zh-CN": "神圣武器：武器成为魔法武器、散发明亮光照，命中额外造成 +2d8 光耀伤害；提前结束法术时可释放爆发。"
  },
  "combatDetail.effect.intellect_fortress.name": {
    "en": "intellect fortress",
    "zh-CN": "心智堡垒"
  },
  "combatDetail.effect.intellect_fortress.summary": {
    "en": "Intellect Fortress: resistance to psychic damage and advantage on Intelligence, Wisdom, and Charisma saving throws.",
    "zh-CN": "心智堡垒：对心灵伤害具有抗性，智力、感知和魅力豁免具有优势。"
  },
  "combatDetail.effect.platinum_shield.name": {
    "en": "platinum shield",
    "zh-CN": "白金护盾"
  },
  "combatDetail.effect.platinum_shield.summary": {
    "en": "Platinum Shield: half cover (+2 AC), resistance to acid, cold, fire, lightning, and poison, and Evasion on Dexterity saves.",
    "zh-CN": "白金护盾：获得半身掩护（护甲等级 +2），对强酸、寒冷、火焰、闪电和毒素具有抗性，敏捷豁免获得反射闪避效果。"
  },
  "combatDetail.effect.primordial_ward.name": {
    "en": "primordial ward",
    "zh-CN": "原初防护"
  },
  "combatDetail.effect.primordial_ward.summary": {
    "en": "Primordial Ward: resistance to acid, cold, fire, lightning, and thunder damage; a reaction can trade it all for one turn of immunity to a triggering type.",
    "zh-CN": "原初防护：对强酸、寒冷、火焰、闪电和雷鸣伤害具有抗性；可用反应失去所有这些抗性，换取对触发伤害类型的一个回合免疫。"
  },
  "combatDetail.effect.otherworldly_guise.name": {
    "en": "otherworldly guise",
    "zh-CN": "异界形貌"
  },
  "combatDetail.effect.otherworldly_guise.summary": {
    "en": "Otherworldly Guise: immune to two damage types (fire/poison or radiant/necrotic), immune to charm and fright, flying 40 feet, spellcasting modifier added to AC, and two attacks per Attack action.",
    "zh-CN": "异界形貌：免疫两种伤害类型，火焰/毒素或光耀/黯蚀；免疫魅惑和恐慌，飞行速度 40 英尺，护甲等级加上施法属性调整值，每个攻击动作可攻击两次。"
  },
  "combatDetail.effect.arcane_transformation.name": {
    "en": "arcane transformation",
    "zh-CN": "奥术转化"
  },
  "combatDetail.effect.arcane_transformation.summary": {
    "en": "Arcane Transformation: advantage on weapon attacks, +2d12 force on weapon hits, an extra attack per Attack action, no spellcasting, and a CON save against exhaustion when it ends (the 50 temporary hit points were granted at casting).",
    "zh-CN": "奥术转化：武器攻击具有优势，命中额外造成 +2d12 力场伤害，每个攻击动作增加一次攻击，无法施法；结束时进行体质豁免以避免力竭，50 点临时生命值已在施法时获得。"
  },
  "combatDetail.effect.crown_of_stars.name": {
    "en": "crown of stars",
    "zh-CN": "群星冠冕"
  },
  "combatDetail.effect.crown_of_stars.summary": {
    "en": "Crown of Stars: seven motes; a bonus action hurls one (pc_attack, weapon 'Crown of Stars', 4d12 radiant). Track spent motes in the narration.",
    "zh-CN": "群星冠冕：七颗星点；用附赠动作掷出一颗，造成 4d12 光耀伤害。已消耗的星点由叙事记录。"
  },
  "combatDetail.effect.blade_of_disaster.name": {
    "en": "blade of disaster",
    "zh-CN": "灾厄之刃"
  },
  "combatDetail.effect.blade_of_disaster.summary": {
    "en": "Blade of Disaster: a bonus action moves the rift-blade and makes two melee spell attacks (pc_attack, weapon 'Blade of Disaster', 4d12 force each; crits on 18+ and a crit triples the dice).",
    "zh-CN": "灾厄之刃：用附赠动作移动裂隙之刃并进行两次近战法术攻击，每次造成 4d12 力场伤害；18+ 重击，重击时伤害骰变为三倍。"
  },
  "combatDetail.effect.sanctuary.name": {
    "en": "sanctuary",
    "zh-CN": "庇护术"
  },
  "combatDetail.effect.sanctuary.summary": {
    "en": "Sanctuary: a creature targeting them with an attack or harmful spell must first succeed on a Wisdom save or lose the attempt and pick elsewhere. Ends if the warded creature attacks or casts a harmful spell.",
    "zh-CN": "庇护术：生物攻击受保护者或对其施放有害法术前，须先通过感知豁免，否则失去该次尝试并另选目标；受保护者攻击或施放有害法术时结束。"
  },
  "combatDetail.effect.expeditious_retreat.name": {
    "en": "expeditious retreat",
    "zh-CN": "迅捷撤离"
  },
  "combatDetail.effect.expeditious_retreat.summary": {
    "en": "Expeditious Retreat: they can Dash as a bonus action on each of their turns.",
    "zh-CN": "迅捷撤离：每回合可用附赠动作疾走。"
  },
  "combatDetail.effect.flying.name": {
    "en": "flying",
    "zh-CN": "飞行"
  },
  "combatDetail.effect.flying.summary": {
    "en": "Flying: they can fly (the speed the granting effect states; 60 feet for the Fly spell). If the effect ends aloft, they fall.",
    "zh-CN": "飞行：可按来源效果指定的速度飞行，飞行术为 60 英尺；在空中失去效果时会坠落。"
  },
  "combatDetail.effect.fighting_spirit.name": {
    "en": "fighting spirit",
    "zh-CN": "战斗之魂"
  },
  "combatDetail.effect.fighting_spirit.summary": {
    "en": "Fighting Spirit: advantage on their weapon attack rolls this turn (the temporary hit points were granted when it was spent).",
    "zh-CN": "战斗之魂：本回合武器攻击掷骰具有优势，临时生命值已在消耗此能力时获得。"
  },
  "combatDetail.effect.giants_might.name": {
    "en": "giant's might",
    "zh-CN": "巨人之力"
  },
  "combatDetail.effect.giants_might.summary": {
    "en": "Giant's Might: Large, advantage on Strength checks and saves, and one weapon hit per turn deals +1d6 damage.",
    "zh-CN": "巨人之力：成为大型生物，力量检定和豁免具有优势，每回合一次武器命中额外造成 +1d6 伤害。"
  },
  "combatDetail.effect.bladesong.name": {
    "en": "bladesong",
    "zh-CN": "剑歌"
  },
  "combatDetail.effect.bladesong.summary": {
    "en": "Bladesong: AC increased by their Intelligence modifier, +10 feet of speed, advantage on Acrobatics, and a bonus on concentration saves. Ends if they wear medium/heavy armor or a shield, or use two hands on a weapon.",
    "zh-CN": "剑歌：护甲等级增加智力调整值，速度增加 +10 英尺，特技具有优势，专注豁免获得加值；穿戴中甲、重甲、盾牌或双手使用武器时结束。"
  },
  "combatDetail.effect.tentacle_of_the_deep.name": {
    "en": "tentacle of the deep",
    "zh-CN": "深海触须"
  },
  "combatDetail.effect.tentacle_of_the_deep.summary": {
    "en": "Tentacle of the Deep: a bonus-action spectral tentacle strike (pc_attack, weapon 'Tentacle of the Deep', 1d8 cold); a hit also halves the target's speed until its next turn.",
    "zh-CN": "深海触须：用附赠动作发动幽影触须打击，造成 1d8 寒冷伤害；命中还使目标速度减半，持续至其下个回合。"
  },
  "combatDetail.effect.form_of_dread.name": {
    "en": "form of dread",
    "zh-CN": "恐怖形态"
  },
  "combatDetail.effect.form_of_dread.summary": {
    "en": "Form of Dread: immune to being frightened, and once per turn a creature they hit must pass a WIS save or be frightened until their next turn (resolve via cast_at_enemy).",
    "zh-CN": "恐怖形态：免疫恐慌；每回合一次，命中的生物须通过感知豁免，否则恐慌至其下个回合。"
  },
  "combatDetail.effect.spirit_totem_bear.name": {
    "en": "spirit totem: bear",
    "zh-CN": "灵魂图腾：熊"
  },
  "combatDetail.effect.spirit_totem_bear.summary": {
    "en": "Spirit Totem (Bear): allies in the 30-foot aura got temporary hit points when it rose and have advantage on Strength checks and saves while inside.",
    "zh-CN": "灵魂图腾（熊）：30 英尺光环内的盟友在图腾出现时获得临时生命值；处于光环内时，力量检定和豁免具有优势。"
  },
  "combatDetail.effect.spirit_totem_hawk.name": {
    "en": "spirit totem: hawk",
    "zh-CN": "灵魂图腾：鹰"
  },
  "combatDetail.effect.spirit_totem_hawk.summary": {
    "en": "Spirit Totem (Hawk): the druid's reaction grants advantage on an attack against a creature in the aura; allies inside have advantage on Perception checks.",
    "zh-CN": "灵魂图腾（鹰）：德鲁伊可用反应为一次针对光环内生物的攻击提供优势；光环内盟友的察觉检定具有优势。"
  },
  "combatDetail.effect.spirit_totem_unicorn.name": {
    "en": "spirit totem: unicorn",
    "zh-CN": "灵魂图腾：独角兽"
  },
  "combatDetail.effect.spirit_totem_unicorn.summary": {
    "en": "Spirit Totem (Unicorn): allies have advantage on checks to detect creatures in the aura, and the druid's healing spells also heal aura allies for the spell's level.",
    "zh-CN": "灵魂图腾（独角兽）：盟友侦测光环内生物的检定具有优势；德鲁伊施放治疗法术时，还按法术环阶治疗光环内的盟友。"
  },
  "combatDetail.effect.trance_of_order.name": {
    "en": "trance of order",
    "zh-CN": "秩序恍惚"
  },
  "combatDetail.effect.trance_of_order.summary": {
    "en": "Trance of Order: attacks against them cannot have advantage, and their own attacks, checks, and saves treat a d20 roll of 9 or lower as a 10.",
    "zh-CN": "秩序恍惚：针对其的攻击无法获得优势；自身攻击、检定和豁免的 d20 结果为 9 或更低时，视为 10。"
  },
  "combatDetail.effect.aspect_of_the_wyrm_frighten.name": {
    "en": "aspect of the wyrm: frighten",
    "zh-CN": "巨龙之相：威吓"
  },
  "combatDetail.effect.aspect_of_the_wyrm_frighten.summary": {
    "en": "Aspect of the Wyrm (Frighten): enemies starting their turn in the 10-foot aura must pass a WIS save or be frightened (resolve via cast_at_enemy).",
    "zh-CN": "巨龙之相（威吓）：敌人在 10 英尺光环内开始回合时，须进行感知豁免，失败则恐慌。"
  },
  "combatDetail.effect.aspect_of_the_wyrm_ward.name": {
    "en": "aspect of the wyrm: ward",
    "zh-CN": "巨龙之相：守护"
  },
  "combatDetail.effect.aspect_of_the_wyrm_ward.summary": {
    "en": "Aspect of the Wyrm (Ward): allies in the 10-foot aura have resistance to the monk's chosen draconic damage type.",
    "zh-CN": "巨龙之相（守护）：10 英尺光环内的盟友对武僧选择的龙类伤害类型具有抗性。"
  },
  "combatDetail.effect.protected_from_poison.name": {
    "en": "protected from poison",
    "zh-CN": "防护毒素"
  },
  "combatDetail.effect.protected_from_poison.summary": {
    "en": "Protection from Poison: resistance to poison damage and advantage on saves against being poisoned; one poison afflicting them is neutralized.",
    "zh-CN": "防护毒素：对毒素伤害具有抗性，对中毒的豁免具有优势，并中和一种已有毒素。"
  },
  "combatDetail.effect.false_life.name": {
    "en": "false life",
    "zh-CN": "虚假生命"
  },
  "combatDetail.effect.false_life.summary": {
    "en": "False Life: bolstered by necromantic vigor (the temporary hit points were granted at casting).",
    "zh-CN": "虚假生命：以死灵之力强化自身，临时生命值已在施法时获得。"
  },
  "combatDetail.effect.spiritual_weapon.name": {
    "en": "spiritual weapon",
    "zh-CN": "灵体武器"
  },
  "combatDetail.effect.spiritual_weapon.summary": {
    "en": "Spiritual Weapon: as a bonus action, the floating weapon strikes: a melee spell attack for 1d8 + spellcasting modifier force damage (+1d8 per two slot levels above 2nd). Resolve it with pc_attack, weapon 'Spiritual Weapon'.",
    "zh-CN": "灵体武器：用附赠动作进行近战法术攻击，造成 1d8 + 施法属性调整值的力场伤害；法术位超过二环后，每提高两环额外增加 +1d8。"
  },
  "combatDetail.effect.flame_blade.name": {
    "en": "flame blade",
    "zh-CN": "火焰刀"
  },
  "combatDetail.effect.flame_blade.summary": {
    "en": "Flame Blade: a fiery blade in the free hand; a melee spell attack for 3d6 fire (+1d6 per two slot levels above 2nd). Resolve it with pc_attack, weapon 'Flame Blade' (an action).",
    "zh-CN": "火焰刀：空手中出现火焰刀刃，以动作进行近战法术攻击，造成 3d6 火焰伤害；法术位超过二环后，每提高两环额外增加 +1d6。"
  },
  "combatDetail.effect.aided.name": {
    "en": "aided",
    "zh-CN": "援助术"
  },
  "combatDetail.effect.aided.summary": {
    "en": "Aid: the hit point maximum and current hit points are higher by the amount in the name for 8 hours; they fall back when it ends.",
    "zh-CN": "援助术：生命值上限和当前生命值按状态名称中的数值提高，持续 8 小时，效果结束后恢复原值。"
  },
  "combatDetail.effect.protected_from_evil_and_good.name": {
    "en": "protected from evil and good",
    "zh-CN": "防护邪恶与善良"
  },
  "combatDetail.effect.protected_from_evil_and_good.summary": {
    "en": "Protection from Evil and Good: aberrations, celestials, elementals, fey, fiends and undead have disadvantage on attack rolls against them, and cannot charm, frighten or possess them.",
    "zh-CN": "防护邪恶与善良：异怪、天界、元素、精类、邪魔和不死生物对其的攻击掷骰具有劣势，且无法魅惑、使其恐慌或附身。"
  },
  "combatDetail.effect.magic_weapon_1.name": {
    "en": "magic weapon +1",
    "zh-CN": "魔化武器 +1"
  },
  "combatDetail.effect.magic_weapon_1.summary": {
    "en": "Magic Weapon: the weapon is magical, +1 to attack and damage rolls.",
    "zh-CN": "魔化武器：武器成为魔法武器，攻击和伤害掷骰 +1。"
  },
  "combatDetail.effect.magic_weapon_2.name": {
    "en": "magic weapon +2",
    "zh-CN": "魔化武器 +2"
  },
  "combatDetail.effect.magic_weapon_2.summary": {
    "en": "Magic Weapon: the weapon is magical, +2 to attack and damage rolls.",
    "zh-CN": "魔化武器：武器成为魔法武器，攻击和伤害掷骰 +2。"
  },
  "combatDetail.effect.magic_weapon_3.name": {
    "en": "magic weapon +3",
    "zh-CN": "魔化武器 +3"
  },
  "combatDetail.effect.magic_weapon_3.summary": {
    "en": "Magic Weapon: the weapon is magical, +3 to attack and damage rolls.",
    "zh-CN": "魔化武器：武器成为魔法武器，攻击和伤害掷骰 +3。"
  },
  "combatDetail.effect.death_ward.name": {
    "en": "death ward",
    "zh-CN": "死亡防护"
  },
  "combatDetail.effect.death_ward.summary": {
    "en": "Death Ward: the first time damage would drop them to 0 hit points they drop to 1 instead, and the spell ends; an effect that would kill outright without damage is negated.",
    "zh-CN": "死亡防护：首次因伤害将生命值降至 0 时，改为保留 1 点并结束法术；不造成伤害的直接致死效果也会被抵消。"
  },
  "combatDetail.effect.beacon_of_hope.name": {
    "en": "beacon of hope",
    "zh-CN": "希望灯塔"
  },
  "combatDetail.effect.beacon_of_hope.summary": {
    "en": "Beacon of Hope: advantage on Wisdom saves and death saves, and healing restores its maximum.",
    "zh-CN": "希望灯塔：感知豁免和死亡豁免具有优势，治疗恢复最大值。"
  },
  "combatDetail.effect.protection_from_energy.name": {
    "en": "protection from energy",
    "zh-CN": "防护能量"
  },
  "combatDetail.effect.protection_from_energy.summary": {
    "en": "Protection from Energy: resistance to the damage type in the name.",
    "zh-CN": "防护能量：对状态名称中指定的伤害类型具有抗性。"
  },
  "combatDetail.effect.pass_without_trace.name": {
    "en": "pass without trace",
    "zh-CN": "无踪行走"
  },
  "combatDetail.effect.pass_without_trace.summary": {
    "en": "Pass without Trace: +10 to Dexterity (Stealth) checks, and they leave no tracks.",
    "zh-CN": "无踪行走：敏捷（隐匿）检定 +10，且不会留下踪迹。"
  },
  "combatDetail.effect.warding_bond.name": {
    "en": "warding bond",
    "zh-CN": "守护联结"
  },
  "combatDetail.effect.warding_bond.summary": {
    "en": "Warding Bond: +1 AC and saving throws and resistance to all damage while within 60 feet of the caster, who takes the same damage whenever they do.",
    "zh-CN": "守护联结：在施法者 60 英尺内时，护甲等级和豁免 +1，对所有伤害具有抗性；其受到伤害时，施法者同时受到等量伤害。"
  },
  "combatDetail.effect.enhance_con.name": {
    "en": "enhance ability (bear's endurance)",
    "zh-CN": "增强属性：熊之耐力"
  },
  "combatDetail.effect.enhance_con.summary": {
    "en": "Enhance Ability (Bear's Endurance): advantage on Constitution checks (the temporary hit points were granted at casting).",
    "zh-CN": "增强属性（熊之耐力）：体质检定具有优势，临时生命值已在施法时获得。"
  },
  "combatDetail.effect.enhance_str.name": {
    "en": "enhance ability (bull's strength)",
    "zh-CN": "增强属性：牛之力量"
  },
  "combatDetail.effect.enhance_str.summary": {
    "en": "Enhance Ability (Bull's Strength): advantage on Strength checks, carrying capacity doubled.",
    "zh-CN": "增强属性（牛之力量）：力量检定具有优势，携带能力加倍。"
  },
  "combatDetail.effect.enhance_dex.name": {
    "en": "enhance ability (cat's grace)",
    "zh-CN": "增强属性：猫之优雅"
  },
  "combatDetail.effect.enhance_dex.summary": {
    "en": "Enhance Ability (Cat's Grace): advantage on Dexterity checks, no damage from a fall of 20 feet or less.",
    "zh-CN": "增强属性（猫之优雅）：敏捷检定具有优势，坠落不超过 20 英尺时不受伤害。"
  },
  "combatDetail.effect.enhance_cha.name": {
    "en": "enhance ability (eagle's splendor)",
    "zh-CN": "增强属性：鹰之威仪"
  },
  "combatDetail.effect.enhance_cha.summary": {
    "en": "Enhance Ability (Eagle's Splendor): advantage on Charisma checks.",
    "zh-CN": "增强属性（鹰之威仪）：魅力检定具有优势。"
  },
  "combatDetail.effect.enhance_int.name": {
    "en": "enhance ability (fox's cunning)",
    "zh-CN": "增强属性：狐之狡黠"
  },
  "combatDetail.effect.enhance_int.summary": {
    "en": "Enhance Ability (Fox's Cunning): advantage on Intelligence checks.",
    "zh-CN": "增强属性（狐之狡黠）：智力检定具有优势。"
  },
  "combatDetail.effect.enhance_wis.name": {
    "en": "enhance ability (owl's wisdom)",
    "zh-CN": "增强属性：枭之睿智"
  },
  "combatDetail.effect.enhance_wis.summary": {
    "en": "Enhance Ability (Owl's Wisdom): advantage on Wisdom checks.",
    "zh-CN": "增强属性（枭之睿智）：感知检定具有优势。"
  },
  "combatDetail.effect.holy_aura.name": {
    "en": "holy aura",
    "zh-CN": "神圣灵光"
  },
  "combatDetail.effect.holy_aura.summary": {
    "en": "Holy Aura: advantage on every saving throw, and attack rolls against them have disadvantage.",
    "zh-CN": "神圣灵光：所有豁免具有优势，针对其的攻击掷骰具有劣势。"
  },
  "combatDetail.effect.fire_shield.name": {
    "en": "fire shield",
    "zh-CN": "火焰护盾"
  },
  "combatDetail.effect.fire_shield.summary": {
    "en": "Fire Shield: resistance to the damage type in the name (the warm shield cold, the chill shield fire); a creature within 5 feet that hits them in melee takes 2d8 of the other type.",
    "zh-CN": "火焰护盾：对名称指定的伤害类型具有抗性，暖盾抵抗寒冷、冷盾抵抗火焰；5 英尺内近战命中其的生物受到另一类型的 2d8 伤害。"
  },
  "combatDetail.effect.spirit_guardians.name": {
    "en": "spirit guardians",
    "zh-CN": "灵体守卫"
  },
  "combatDetail.effect.spirit_guardians.summary": {
    "en": "Spirit Guardians: a 15-foot aura; an enemy starting its turn inside saves (WIS) or takes 3d8 radiant, half on a success (the server rolls it), and its speed is halved there.",
    "zh-CN": "灵体守卫：15 英尺光环；敌人在其中开始回合时进行感知豁免，失败受到 3d8 光耀伤害，成功减半，并在光环内速度减半。"
  },
  "combatDetail.effect.confused.name": {
    "en": "confused",
    "zh-CN": "困惑"
  },
  "combatDetail.effect.confused.summary": {
    "en": "Confusion: no reactions; at the start of each turn a d10 decides what it does (1: wanders, 2 to 6: nothing, 7 to 8: attacks a random creature in reach, 9 to 10: acts normally).",
    "zh-CN": "困惑术：无法使用反应；每回合开始掷 d10 决定行动：1 随机游荡，2 至 6 不行动，7 至 8 攻击触及内随机生物，9 至 10 正常行动。"
  },
  "combatDetail.effect.commanded.name": {
    "en": "commanded",
    "zh-CN": "受到命令"
  },
  "combatDetail.effect.commanded.summary": {
    "en": "Command: it follows the one-word command on its next turn.",
    "zh-CN": "命令术：下个回合遵循单词命令。"
  },
  "combatDetail.effect.banished.name": {
    "en": "banished",
    "zh-CN": "被放逐"
  },
  "combatDetail.effect.banished.summary": {
    "en": "Banishment: gone to a harmless demiplane, incapacitated; it cannot be targeted and returns when the spell ends early.",
    "zh-CN": "放逐术：进入无害的半位面、失能且无法被指定为目标；法术提前结束时返回。"
  },
  "combatDetail.effect.dancing.name": {
    "en": "dancing",
    "zh-CN": "奥图迷舞"
  },
  "combatDetail.effect.dancing.summary": {
    "en": "Irresistible Dance: dancing in place with all its movement, disadvantage on Dexterity saves and attack rolls, and attack rolls against it have advantage; its action buys a WIS save to stop.",
    "zh-CN": "奥图迷舞：原地跳舞并消耗所有移动力，敏捷豁免和攻击掷骰具有劣势，针对其的攻击掷骰具有优势；可用动作进行感知豁免来结束。"
  },
  "combatDetail.effect.shillelagh.name": {
    "en": "shillelagh",
    "zh-CN": "橡棍术"
  },
  "combatDetail.effect.shillelagh.summary": {
    "en": "Shillelagh: their club or quarterstaff attacks with the spellcasting ability, deals a d8, and is magical.",
    "zh-CN": "橡棍术：短棒或长棍使用施法属性攻击，伤害骰为 d8，且视为魔法武器。"
  },
  "combatDetail.effect.feather_fall.name": {
    "en": "feather fall",
    "zh-CN": "羽落术"
  },
  "combatDetail.effect.feather_fall.summary": {
    "en": "Feather Fall: they descend 60 feet a round and take no falling damage.",
    "zh-CN": "羽落术：每轮下降 60 英尺，不受坠落伤害。"
  },
  "combatDetail.effect.returned_4.name": {
    "en": "returned from death (-4)",
    "zh-CN": "死而复生（-4）"
  },
  "combatDetail.effect.returned_4.summary": {
    "en": "Back from the dead: -4 to attack rolls and saving throws, one less after each long rest.",
    "zh-CN": "死而复生：攻击掷骰和豁免 -4，每次长休后减少一级减值。"
  },
  "combatDetail.effect.returned_3.name": {
    "en": "returned from death (-3)",
    "zh-CN": "死而复生（-3）"
  },
  "combatDetail.effect.returned_3.summary": {
    "en": "Back from the dead: -3 to attack rolls and saving throws, one less after each long rest.",
    "zh-CN": "死而复生：攻击掷骰和豁免 -3，每次长休后减少一级减值。"
  },
  "combatDetail.effect.returned_2.name": {
    "en": "returned from death (-2)",
    "zh-CN": "死而复生（-2）"
  },
  "combatDetail.effect.returned_2.summary": {
    "en": "Back from the dead: -2 to attack rolls and saving throws, one less after each long rest.",
    "zh-CN": "死而复生：攻击掷骰和豁免 -2，每次长休后减少一级减值。"
  },
  "combatDetail.effect.returned_1.name": {
    "en": "returned from death (-1)",
    "zh-CN": "死而复生（-1）"
  },
  "combatDetail.effect.returned_1.summary": {
    "en": "Back from the dead: -1 to attack rolls and saving throws; gone after the next long rest.",
    "zh-CN": "死而复生：攻击掷骰和豁免 -1，每次长休后减少一级减值，下次长休后消失。"
  },
  "combatDetail.effect.cursed_str.name": {
    "en": "cursed (str)",
    "zh-CN": "诅咒：力量"
  },
  "combatDetail.effect.cursed_str.summary": {
    "en": "Bestow Curse: disadvantage on Strength checks and saving throws.",
    "zh-CN": "施加诅咒：力量检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_dex.name": {
    "en": "cursed (dex)",
    "zh-CN": "诅咒：敏捷"
  },
  "combatDetail.effect.cursed_dex.summary": {
    "en": "Bestow Curse: disadvantage on Dexterity checks and saving throws.",
    "zh-CN": "施加诅咒：敏捷检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_con.name": {
    "en": "cursed (con)",
    "zh-CN": "诅咒：体质"
  },
  "combatDetail.effect.cursed_con.summary": {
    "en": "Bestow Curse: disadvantage on Constitution checks and saving throws.",
    "zh-CN": "施加诅咒：体质检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_int.name": {
    "en": "cursed (int)",
    "zh-CN": "诅咒：智力"
  },
  "combatDetail.effect.cursed_int.summary": {
    "en": "Bestow Curse: disadvantage on Intelligence checks and saving throws.",
    "zh-CN": "施加诅咒：智力检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_wis.name": {
    "en": "cursed (wis)",
    "zh-CN": "诅咒：感知"
  },
  "combatDetail.effect.cursed_wis.summary": {
    "en": "Bestow Curse: disadvantage on Wisdom checks and saving throws.",
    "zh-CN": "施加诅咒：感知检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_cha.name": {
    "en": "cursed (cha)",
    "zh-CN": "诅咒：魅力"
  },
  "combatDetail.effect.cursed_cha.summary": {
    "en": "Bestow Curse: disadvantage on Charisma checks and saving throws.",
    "zh-CN": "施加诅咒：魅力检定和豁免具有劣势。"
  },
  "combatDetail.effect.cursed_attacks.name": {
    "en": "cursed (attacks)",
    "zh-CN": "诅咒：攻击"
  },
  "combatDetail.effect.cursed_attacks.summary": {
    "en": "Bestow Curse: disadvantage on attack rolls against the caster.",
    "zh-CN": "施加诅咒：针对施法者的攻击掷骰具有劣势。"
  },
  "combatDetail.effect.cursed_will.name": {
    "en": "cursed (will)",
    "zh-CN": "诅咒：意志"
  },
  "combatDetail.effect.cursed_will.summary": {
    "en": "Bestow Curse: a WIS save at the start of each of its turns, or it does nothing that turn.",
    "zh-CN": "施加诅咒：每回合开始进行感知豁免，失败则该回合不行动。"
  },
  "combatDetail.effect.cursed_necrotic.name": {
    "en": "cursed (necrotic)",
    "zh-CN": "诅咒：黯蚀"
  },
  "combatDetail.effect.cursed_necrotic.summary": {
    "en": "Bestow Curse: the caster's attacks and spells deal 1d8 necrotic more to it.",
    "zh-CN": "施加诅咒：施法者的攻击和法术对其额外造成 1d8 黯蚀伤害。"
  },
  "combatDetail.effect.dazed.name": {
    "en": "dazed",
    "zh-CN": "茫然"
  },
  "combatDetail.effect.dazed.summary": {
    "en": "Bestow Curse: it wastes its action this turn.",
    "zh-CN": "施加诅咒：本回合浪费其动作。"
  },
  "combatDetail.effect.mocked.name": {
    "en": "mocked",
    "zh-CN": "受到嘲讽"
  },
  "combatDetail.effect.mocked.summary": {
    "en": "Vicious Mockery: disadvantage on the next attack roll it makes before the end of its next turn.",
    "zh-CN": "恶毒嘲讽：下个回合结束前的下一次攻击掷骰具有劣势。"
  },
  "combatDetail.effect.searing_metal.name": {
    "en": "searing metal",
    "zh-CN": "灼热金属"
  },
  "combatDetail.effect.searing_metal.summary": {
    "en": "Heat Metal: it keeps hold of the red-hot object and has disadvantage on attack rolls and ability checks until the caster's next turn.",
    "zh-CN": "灼热金属：继续持握烧红的物品，攻击掷骰和属性检定具有劣势，持续至施法者下个回合。"
  },
  "combatDetail.effect.sickened.name": {
    "en": "sickened",
    "zh-CN": "恶心"
  },
  "combatDetail.effect.sickened.summary": {
    "en": "Eyebite (Sickened): disadvantage on attack rolls and ability checks; a WIS save at the end of each of its turns ends it.",
    "zh-CN": "邪眼术（恶心）：攻击掷骰和属性检定具有劣势，每回合结束时感知豁免成功可结束。"
  },
  "combatDetail.effect.halted.name": {
    "en": "halted",
    "zh-CN": "停步"
  },
  "combatDetail.effect.halted.summary": {
    "en": "Command (Halt): it does not move and takes no action on its turn.",
    "zh-CN": "命令术（停步）：该回合不移动且不使用动作。"
  },
  "combatDetail.effect.retching.name": {
    "en": "retching",
    "zh-CN": "干呕"
  },
  "combatDetail.effect.retching.summary": {
    "en": "Stinking Cloud: it spends its action retching and reeling this turn.",
    "zh-CN": "恶臭云：本回合消耗动作用于干呕与踉跄。"
  },
  "combatDetail.effect.wandering.name": {
    "en": "wandering",
    "zh-CN": "游荡"
  },
  "combatDetail.effect.wandering.summary": {
    "en": "Confusion: it moves in a random direction and takes no action this turn.",
    "zh-CN": "困惑术：本回合沿随机方向移动，不使用动作。"
  },
  "combatDetail.effect.levitating.name": {
    "en": "levitating",
    "zh-CN": "悬浮"
  },
  "combatDetail.effect.levitating.summary": {
    "en": "Levitate: it hangs in the air and can move only by pushing or pulling against something fixed; its speed is 0.",
    "zh-CN": "浮空术：悬在空中，只能借助固定物体推拉移动，速度为 0。"
  },
  "combatDetail.effect.suggested.name": {
    "en": "suggested",
    "zh-CN": "受到暗示"
  },
  "combatDetail.effect.suggested.summary": {
    "en": "Suggestion: it pursues the suggested course of action; damage from the caster or their companions ends it.",
    "zh-CN": "暗示术：执行受到暗示的行动；施法者或其同伴造成伤害时结束。"
  },
  "combatDetail.effect.enclosed.name": {
    "en": "enclosed",
    "zh-CN": "欧提路克弹力法球"
  },
  "combatDetail.effect.enclosed.summary": {
    "en": "Resilient Sphere: sealed in a sphere of force; nothing passes in or out, so it can neither be harmed from outside nor harm anything outside.",
    "zh-CN": "欧提路克弹力法球：封闭于力场球体中，任何东西都无法进出；既无法从外部伤害它，也无法伤害外部。"
  },
  "combatDetail.effect.gaseous_form.name": {
    "en": "gaseous form",
    "zh-CN": "气化形体"
  },
  "combatDetail.effect.gaseous_form.summary": {
    "en": "Gaseous Form: a misty cloud with a 10-foot fly speed, resistance to nonmagical damage and advantage on STR, DEX and CON saves; it cannot attack or cast spells.",
    "zh-CN": "气化形体：化为云雾，飞行速度 10 英尺，对非魔法伤害具有抗性，力量、敏捷和体质豁免具有优势；无法攻击或施法。"
  },
  "combatDetail.effect.heroes_feast.name": {
    "en": "heroes' feast",
    "zh-CN": "英雄盛宴"
  },
  "combatDetail.effect.heroes_feast.summary": {
    "en": "Heroes' Feast: immune to poison and to being frightened, advantage on WIS saves, and 2d10 more hit points for 24 hours.",
    "zh-CN": "英雄盛宴：免疫毒素和恐慌，感知豁免具有优势，生命值增加 2d10，持续 24 小时。"
  },
  "combatDetail.effect.dispel_evil_and_good.name": {
    "en": "dispel evil and good",
    "zh-CN": "驱散邪恶与善良"
  },
  "combatDetail.effect.dispel_evil_and_good.summary": {
    "en": "Dispel Evil and Good: celestials, elementals, fey, fiends and undead have disadvantage on attack rolls against them.",
    "zh-CN": "驱散邪恶与善良：天界、元素、精类、邪魔和不死生物对其的攻击掷骰具有劣势。"
  },
  "combatDetail.effect.enfeebled.name": {
    "en": "enfeebled",
    "zh-CN": "衰弱"
  },
  "combatDetail.effect.enfeebled.summary": {
    "en": "Ray of Enfeeblement: its weapon attacks that use Strength deal half damage; a CON save at the end of each of its turns ends it.",
    "zh-CN": "衰弱射线：使用力量的武器攻击伤害减半，每回合结束时体质豁免成功可结束。"
  },
  "combatDetail.effect.regenerating.name": {
    "en": "regenerating",
    "zh-CN": "再生"
  },
  "combatDetail.effect.regenerating.summary": {
    "en": "Regenerate: 1 hit point back at the start of each of its turns.",
    "zh-CN": "再生术：每个回合开始时恢复 1 点生命值。"
  },
  "combatDetail.effect.mind_blank.name": {
    "en": "mind blank",
    "zh-CN": "心智屏障"
  },
  "combatDetail.effect.mind_blank.summary": {
    "en": "Mind Blank: immune to psychic damage and to being charmed.",
    "zh-CN": "心智屏障：免疫心灵伤害和魅惑。"
  },
  "combatDetail.effect.foresight.name": {
    "en": "foresight",
    "zh-CN": "先见术"
  },
  "combatDetail.effect.foresight.summary": {
    "en": "Foresight: advantage on attack rolls, ability checks and saving throws, and attack rolls against them have disadvantage.",
    "zh-CN": "先见术：攻击掷骰、属性检定和豁免具有优势，针对其的攻击掷骰具有劣势。"
  },
  "combatDetail.effect.acid_arrow_splash.name": {
    "en": "acid arrow",
    "zh-CN": "马友夫强酸箭"
  },
  "combatDetail.effect.acid_arrow_splash.summary": {
    "en": "Acid Arrow: the acid burns again at the end of its next turn.",
    "zh-CN": "马友夫强酸箭：其下个回合结束时，强酸再次造成灼伤。"
  },
  "combatDetail.effect.phantasmal_dread.name": {
    "en": "phantasmal killer",
    "zh-CN": "幻影杀手"
  },
  "combatDetail.effect.phantasmal_dread.summary": {
    "en": "Phantasmal Killer: at the end of each of its turns it saves again or takes psychic damage.",
    "zh-CN": "幻影杀手：每回合结束时再次豁免，失败则受到心灵伤害。"
  },
  "combatDetail.effect.weird_dread.name": {
    "en": "weird",
    "zh-CN": "群体幻影杀手"
  },
  "combatDetail.effect.weird_dread.summary": {
    "en": "Weird: at the end of each of its turns it saves again or takes psychic damage.",
    "zh-CN": "群体幻影杀手：每回合结束时再次豁免，失败则受到心灵伤害。"
  },
  "combatDetail.effect.hardening.name": {
    "en": "flesh to stone",
    "zh-CN": "肉体石化"
  },
  "combatDetail.effect.hardening.summary": {
    "en": "Flesh to Stone: it saves at the end of each of its turns; three failures turn it to stone, three successes free it.",
    "zh-CN": "肉体石化：每回合结束时豁免，失败三次则化为石头，成功三次则脱离效果。"
  },
  "combatDetail.effect.open_hand_reeling.name": {
    "en": "no reactions (open hand)",
    "zh-CN": "散打：无法反应"
  },
  "combatDetail.effect.open_hand_reeling.summary": {
    "en": "Open Hand Technique: it cannot take reactions until the end of the monk's next turn.",
    "zh-CN": "散打技巧：无法使用反应，持续至武僧下个回合结束。"
  },
  "combatDetail.effect.hurled_through_hell.name": {
    "en": "hurled through hell",
    "zh-CN": "坠入地狱"
  },
  "combatDetail.effect.hurled_through_hell.summary": {
    "en": "Hurl Through Hell: gone through the lower planes until the end of the warlock's next turn; it returns to its space and, unless a fiend, takes 10d10 psychic damage.",
    "zh-CN": "坠入地狱：进入下层位面，持续至邪术师下个回合结束；返回原空间时，除邪魔外受到 10d10 心灵伤害。"
  },
  "combatDetail.effect.undead_dread.name": {
    "en": "undead dread (chill touch)",
    "zh-CN": "不死恐惧：寒冷触摸"
  },
  "combatDetail.effect.undead_dread.summary": {
    "en": "Chill Touch: this undead has disadvantage on attack rolls against the caster until the end of the caster's next turn.",
    "zh-CN": "冻寒之触：此不死生物针对施法者的攻击掷骰具有劣势，持续至施法者下个回合结束。"
  },
  "combatDetail.effect.poisoned_weapon.name": {
    "en": "poisoned weapon",
    "zh-CN": "涂毒武器"
  },
  "combatDetail.effect.poisoned_weapon.summary": {
    "en": "Basic poison: the next creature their slashing or piercing weapon hits makes a DC 10 Constitution save or takes 1d4 poison damage.",
    "zh-CN": "基础毒药：挥砍或穿刺武器下次命中的生物须进行难度 10 的体质豁免，失败受到 1d4 毒素伤害。"
  },
  "combatDetail.effect.shrugged_off_presence.name": {
    "en": "unmoved by intimidating presence",
    "zh-CN": "无视威慑气势"
  },
  "combatDetail.effect.shrugged_off_presence.summary": {
    "en": "It saw through the barbarian's Intimidating Presence and cannot be frightened by it again for 24 hours.",
    "zh-CN": "看破了野蛮人的威慑气势，24 小时内不会再因此恐慌。"
  },
  "combatDetail.effect.squeezing.name": {
    "en": "squeezing",
    "zh-CN": "挤行"
  },
  "combatDetail.effect.squeezing.summary": {
    "en": "Squeezing through a space one size too small: its attack rolls and Dexterity saves are at disadvantage, and attack rolls against it have advantage.",
    "zh-CN": "挤过小一级的空间：自身攻击掷骰和敏捷豁免具有劣势，针对其的攻击掷骰具有优势。"
  },
  "combatDetail.effect.holy_nimbus.name": {
    "en": "holy nimbus",
    "zh-CN": "神圣光冕"
  },
  "combatDetail.effect.holy_nimbus.summary": {
    "en": "Holy Nimbus: bright light for 30 feet; an enemy starting its turn in it takes 10 radiant damage, and the paladin has advantage on saves against spells cast by fiends or undead.",
    "zh-CN": "神圣光冕：30 英尺明亮光照；敌人在其中开始回合时受到 10 点光耀伤害，圣武士对邪魔或不死生物施放法术的豁免具有优势。"
  },
  "combatDetail.effect.camouflaged.name": {
    "en": "camouflaged",
    "zh-CN": "伪装"
  },
  "combatDetail.effect.camouflaged.summary": {
    "en": "Hide in Plain Sight: +10 to Dexterity (Stealth) checks while the ranger stays still against the surface they blend into.",
    "zh-CN": "遁入平凡：游侠静止并贴合所融入的表面时，敏捷（隐匿）检定 +10。"
  },
  "combatDetail.effect.peerless_skill.name": {
    "en": "peerless skill",
    "zh-CN": "无双技艺"
  },
  "combatDetail.effect.peerless_skill.summary": {
    "en": "Peerless Skill: the bard's own Bardic Inspiration die rides their next ability check.",
    "zh-CN": "无双技艺：吟游诗人自身的吟游激励骰加在其下次属性检定上。"
  },
  "combatDetail.effect.quivering_palm.name": {
    "en": "quivering palm",
    "zh-CN": "颤震掌"
  },
  "combatDetail.effect.quivering_palm.summary": {
    "en": "Quivering Palm: the monk's vibrations wait in this creature; their action ends them with a CON save, 0 hit points on a failure.",
    "zh-CN": "颤震掌：武僧的震动潜伏在该生物体内；可用动作结束震动，令目标进行体质豁免，失败则生命值降至 0。"
  },
  "combatDetail.effect.symbiotic_entity.name": {
    "en": "symbiotic entity",
    "zh-CN": "共生实体"
  },
  "combatDetail.effect.symbiotic_entity.summary": {
    "en": "Symbiotic Entity: melee weapon hits deal +1d6 necrotic (the temporary hit points came with it) for 10 minutes.",
    "zh-CN": "共生实体：近战武器命中额外造成 +1d6 黯蚀伤害，持续 10 分钟；临时生命值已随效果获得。"
  },
  "combatDetail.effect.kensei_shot.name": {
    "en": "kensei's shot",
    "zh-CN": "剑圣射击"
  },
  "combatDetail.effect.kensei_shot.summary": {
    "en": "Kensei's Shot: ranged weapon hits with a kensei weapon deal +1d4 this turn.",
    "zh-CN": "剑圣射击：本回合剑圣远程武器命中额外造成 +1d4 伤害。"
  },
  "combatDetail.effect.sharpen_the_blade_1.name": {
    "en": "sharpen the blade (+1)",
    "zh-CN": "磨砺锋刃（+1）"
  },
  "combatDetail.effect.sharpen_the_blade_1.summary": {
    "en": "Sharpen the Blade: +1 to attack and damage rolls with a kensei weapon for a minute.",
    "zh-CN": "磨砺锋刃：剑圣武器的攻击和伤害掷骰 +1，持续一分钟。"
  },
  "combatDetail.effect.sharpen_the_blade_2.name": {
    "en": "sharpen the blade (+2)",
    "zh-CN": "磨砺锋刃（+2）"
  },
  "combatDetail.effect.sharpen_the_blade_2.summary": {
    "en": "Sharpen the Blade: +2 to attack and damage rolls with a kensei weapon for a minute.",
    "zh-CN": "磨砺锋刃：剑圣武器的攻击和伤害掷骰 +2，持续一分钟。"
  },
  "combatDetail.effect.sharpen_the_blade_3.name": {
    "en": "sharpen the blade (+3)",
    "zh-CN": "磨砺锋刃（+3）"
  },
  "combatDetail.effect.sharpen_the_blade_3.summary": {
    "en": "Sharpen the Blade: +3 to attack and damage rolls with a kensei weapon for a minute.",
    "zh-CN": "磨砺锋刃：剑圣武器的攻击和伤害掷骰 +3，持续一分钟。"
  },
  "combatDetail.effect.agile_parry.name": {
    "en": "agile parry",
    "zh-CN": "灵活格挡"
  },
  "combatDetail.effect.agile_parry.summary": {
    "en": "Agile Parry: +2 AC until the monk's next turn.",
    "zh-CN": "灵活格挡：护甲等级 +2，持续至武僧下个回合。"
  },
  "combatDetail.effect.defensive_flourish_1.name": {
    "en": "defensive flourish (+1)",
    "zh-CN": "防御剑舞（+1）"
  },
  "combatDetail.effect.defensive_flourish_1.summary": {
    "en": "Defensive Flourish: +1 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +1，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_2.name": {
    "en": "defensive flourish (+2)",
    "zh-CN": "防御剑舞（+2）"
  },
  "combatDetail.effect.defensive_flourish_2.summary": {
    "en": "Defensive Flourish: +2 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +2，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_3.name": {
    "en": "defensive flourish (+3)",
    "zh-CN": "防御剑舞（+3）"
  },
  "combatDetail.effect.defensive_flourish_3.summary": {
    "en": "Defensive Flourish: +3 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +3，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_4.name": {
    "en": "defensive flourish (+4)",
    "zh-CN": "防御剑舞（+4）"
  },
  "combatDetail.effect.defensive_flourish_4.summary": {
    "en": "Defensive Flourish: +4 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +4，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_5.name": {
    "en": "defensive flourish (+5)",
    "zh-CN": "防御剑舞（+5）"
  },
  "combatDetail.effect.defensive_flourish_5.summary": {
    "en": "Defensive Flourish: +5 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +5，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_6.name": {
    "en": "defensive flourish (+6)",
    "zh-CN": "防御剑舞（+6）"
  },
  "combatDetail.effect.defensive_flourish_6.summary": {
    "en": "Defensive Flourish: +6 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +6，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_7.name": {
    "en": "defensive flourish (+7)",
    "zh-CN": "防御剑舞（+7）"
  },
  "combatDetail.effect.defensive_flourish_7.summary": {
    "en": "Defensive Flourish: +7 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +7，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_8.name": {
    "en": "defensive flourish (+8)",
    "zh-CN": "防御剑舞（+8）"
  },
  "combatDetail.effect.defensive_flourish_8.summary": {
    "en": "Defensive Flourish: +8 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +8，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_9.name": {
    "en": "defensive flourish (+9)",
    "zh-CN": "防御剑舞（+9）"
  },
  "combatDetail.effect.defensive_flourish_9.summary": {
    "en": "Defensive Flourish: +9 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +9，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_10.name": {
    "en": "defensive flourish (+10)",
    "zh-CN": "防御剑舞（+10）"
  },
  "combatDetail.effect.defensive_flourish_10.summary": {
    "en": "Defensive Flourish: +10 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +10，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_11.name": {
    "en": "defensive flourish (+11)",
    "zh-CN": "防御剑舞（+11）"
  },
  "combatDetail.effect.defensive_flourish_11.summary": {
    "en": "Defensive Flourish: +11 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +11，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.defensive_flourish_12.name": {
    "en": "defensive flourish (+12)",
    "zh-CN": "防御剑舞（+12）"
  },
  "combatDetail.effect.defensive_flourish_12.summary": {
    "en": "Defensive Flourish: +12 AC until the bard's next turn.",
    "zh-CN": "防御剑舞：护甲等级 +12，持续至吟游诗人下个回合。"
  },
  "combatDetail.effect.awakened_astral_self.name": {
    "en": "awakened astral self",
    "zh-CN": "觉醒星界之躯"
  },
  "combatDetail.effect.awakened_astral_self.summary": {
    "en": "Awakened Astral Self: +2 AC, and a third arms strike with the Attack action (narrated).",
    "zh-CN": "觉醒星界之躯：护甲等级 +2，攻击动作可进行第三次星界臂攻击，此攻击由叙事处理。"
  },
  "combatDetail.effect.arms_of_the_astral_self.name": {
    "en": "arms of the astral self",
    "zh-CN": "星界臂"
  },
  "combatDetail.effect.arms_of_the_astral_self.summary": {
    "en": "Arms of the Astral Self: spectral arms for 10 minutes; unarmed strikes reach 5 feet further and deal force damage.",
    "zh-CN": "星界臂：幽影手臂持续 10 分钟，徒手打击触及增加 5 英尺，并造成力场伤害。"
  },
  "combatDetail.effect.visage_of_the_astral_self.name": {
    "en": "visage of the astral self",
    "zh-CN": "星界面容"
  },
  "combatDetail.effect.visage_of_the_astral_self.summary": {
    "en": "Visage of the Astral Self: darkvision to 120 feet and advantage on Insight and Intimidation checks for 10 minutes.",
    "zh-CN": "星界面容：120 英尺黑暗视觉，洞悉和威吓检定具有优势，持续 10 分钟。"
  },
  "combatDetail.effect.shadow_step.name": {
    "en": "shadow step",
    "zh-CN": "暗影步"
  },
  "combatDetail.effect.shadow_step.summary": {
    "en": "Shadow Step: advantage on the next melee attack this turn.",
    "zh-CN": "暗影步：本回合的下次近战攻击具有优势。"
  },
  "combatDetail.effect.drunkards_luck_attack.name": {
    "en": "drunkard's luck (attack)",
    "zh-CN": "醉汉之运：攻击"
  },
  "combatDetail.effect.drunkards_luck_attack.summary": {
    "en": "Drunkard's Luck: the next attack roll cancels its disadvantage (an advantage that the roll spends).",
    "zh-CN": "醉汉之运：下次攻击掷骰抵消劣势，提供的优势由该次掷骰消耗。"
  },
  "combatDetail.effect.drunkards_luck_check.name": {
    "en": "drunkard's luck (check)",
    "zh-CN": "醉汉之运：检定"
  },
  "combatDetail.effect.drunkards_luck_check.summary": {
    "en": "Drunkard's Luck: the next ability check cancels its disadvantage.",
    "zh-CN": "醉汉之运：下次属性检定抵消劣势。"
  },
  "combatDetail.effect.drunkards_luck_save.name": {
    "en": "drunkard's luck (save)",
    "zh-CN": "醉汉之运：豁免"
  },
  "combatDetail.effect.drunkards_luck_save.summary": {
    "en": "Drunkard's Luck: the next saving throw cancels its disadvantage.",
    "zh-CN": "醉汉之运：下次豁免抵消劣势。"
  },
  "combatDetail.effect.giants_might_1d8.name": {
    "en": "giant's might (1d8)",
    "zh-CN": "巨人之力（1d8）"
  },
  "combatDetail.effect.giants_might_1d8.summary": {
    "en": "Giant's Might: Large, advantage on Strength checks and saves, and one weapon hit per turn deals +1d8 damage.",
    "zh-CN": "巨人之力：成为大型生物，力量检定和豁免具有优势，每回合一次武器命中额外造成 +1d8 伤害。"
  },
  "combatDetail.effect.giants_might_1d10.name": {
    "en": "giant's might (1d10)",
    "zh-CN": "巨人之力（1d10）"
  },
  "combatDetail.effect.giants_might_1d10.summary": {
    "en": "Giant's Might: Large, advantage on Strength checks and saves, and one weapon hit per turn deals +1d10 damage.",
    "zh-CN": "巨人之力：成为大型生物，力量检定和豁免具有优势，每回合一次武器命中额外造成 +1d10 伤害。"
  },
  "combatDetail.effect.blessing_of_the_forge_armor.name": {
    "en": "blessing of the forge (armor)",
    "zh-CN": "熔炉祝福：护甲"
  },
  "combatDetail.effect.blessing_of_the_forge_armor.summary": {
    "en": "Blessing of the Forge: the armor grants +1 AC until the cleric blesses something else.",
    "zh-CN": "熔炉祝福：护甲等级 +1，持续至牧师祝福另一件物品。"
  },
  "combatDetail.effect.blessing_of_the_forge_weapon.name": {
    "en": "blessing of the forge (+1)",
    "zh-CN": "熔炉祝福（+1）"
  },
  "combatDetail.effect.blessing_of_the_forge_weapon.summary": {
    "en": "Blessing of the Forge: the weapon is +1 to attack and damage rolls until the cleric blesses something else.",
    "zh-CN": "熔炉祝福：武器攻击和伤害掷骰 +1，持续至牧师祝福另一件物品。"
  },
  "combatDetail.effect.blessing_of_the_trickster.name": {
    "en": "blessing of the trickster",
    "zh-CN": "诡术祝福"
  },
  "combatDetail.effect.blessing_of_the_trickster.summary": {
    "en": "Blessing of the Trickster: advantage on Stealth checks for an hour.",
    "zh-CN": "诡术祝福：隐匿检定具有优势，持续一小时。"
  },
  "combatDetail.effect.vigilant_blessing.name": {
    "en": "vigilant blessing",
    "zh-CN": "警戒祝福"
  },
  "combatDetail.effect.vigilant_blessing.summary": {
    "en": "Vigilant Blessing: advantage on the next initiative roll.",
    "zh-CN": "警戒祝福：下次先攻掷骰具有优势。"
  },
  "combatDetail.effect.elegant_maneuver.name": {
    "en": "elegant maneuver",
    "zh-CN": "优雅动作"
  },
  "combatDetail.effect.elegant_maneuver.summary": {
    "en": "Elegant Maneuver: advantage on the next Acrobatics or Athletics check this turn.",
    "zh-CN": "优雅动作：本回合下次特技或运动检定具有优势。"
  },
  "combatDetail.effect.corona_of_light.name": {
    "en": "corona of light",
    "zh-CN": "光明之冠"
  },
  "combatDetail.effect.corona_of_light.summary": {
    "en": "Corona of Light: bright light 60 feet around the cleric; enemies in it save at disadvantage against spells for a minute.",
    "zh-CN": "光明之冠：牧师周围 60 英尺明亮光照；一分钟内，敌人在光照中对法术的豁免具有劣势。"
  },
  "combatDetail.effect.unsettled_d6.name": {
    "en": "unsettled (d6)",
    "zh-CN": "动摇（d6）"
  },
  "combatDetail.effect.unsettled_d6.summary": {
    "en": "Unsettling Words: 1d6 comes off this creature's next saving throw.",
    "zh-CN": "动摇之语：该生物的下次豁免减去 1d6。"
  },
  "combatDetail.effect.unsettled_d8.name": {
    "en": "unsettled (d8)",
    "zh-CN": "动摇（d8）"
  },
  "combatDetail.effect.unsettled_d8.summary": {
    "en": "Unsettling Words: 1d8 comes off this creature's next saving throw.",
    "zh-CN": "动摇之语：该生物的下次豁免减去 1d8。"
  },
  "combatDetail.effect.unsettled_d10.name": {
    "en": "unsettled (d10)",
    "zh-CN": "动摇（d10）"
  },
  "combatDetail.effect.unsettled_d10.summary": {
    "en": "Unsettling Words: 1d10 comes off this creature's next saving throw.",
    "zh-CN": "动摇之语：该生物的下次豁免减去 1d10。"
  },
  "combatDetail.effect.unsettled_d12.name": {
    "en": "unsettled (d12)",
    "zh-CN": "动摇（d12）"
  },
  "combatDetail.effect.unsettled_d12.summary": {
    "en": "Unsettling Words: 1d12 comes off this creature's next saving throw.",
    "zh-CN": "动摇之语：该生物的下次豁免减去 1d12。"
  },
  "combatDetail.effect.hound_of_ill_omen.name": {
    "en": "hound of ill omen",
    "zh-CN": "厄运猎犬"
  },
  "combatDetail.effect.hound_of_ill_omen.summary": {
    "en": "Hound of Ill Omen: a shadow hound hunts this creature; it saves at disadvantage against the sorcerer's spells.",
    "zh-CN": "厄运猎犬：暗影猎犬追猎此生物；其对术士法术的豁免具有劣势。"
  },
  "combatDetail.effect.eldritch_strike.name": {
    "en": "eldritch strike",
    "zh-CN": "魔能打击"
  },
  "combatDetail.effect.eldritch_strike.summary": {
    "en": "Eldritch Strike: disadvantage on the next save against the fighter's spell before the end of their next turn.",
    "zh-CN": "魔能打击：战士下个回合结束前，该生物对战士法术的下一次豁免具有劣势。"
  },
  "combatDetail.effect.distracted.name": {
    "en": "distracted",
    "zh-CN": "分心"
  },
  "combatDetail.effect.distracted.summary": {
    "en": "Distracted by a mage hand: the rogue who distracted it has advantage on attacks against it this turn.",
    "zh-CN": "被法师之手分散注意力：本回合使其分心的游荡者针对其的攻击具有优势。"
  },
  "combatDetail.effect.ancestral_protectors.name": {
    "en": "ancestral protectors",
    "zh-CN": "先祖守护"
  },
  "combatDetail.effect.ancestral_protectors.summary": {
    "en": "Ancestral Protectors: disadvantage on attacks against anyone but the barbarian, whose allies resist its damage, until the barbarian's next turn.",
    "zh-CN": "先祖守护：对野蛮人以外目标的攻击具有劣势，野蛮人的盟友对其伤害具有抗性，持续至野蛮人下个回合。"
  },
  "combatDetail.effect.unwavering_mark.name": {
    "en": "unwavering mark",
    "zh-CN": "坚定印记"
  },
  "combatDetail.effect.unwavering_mark.summary": {
    "en": "Unwavering Mark: disadvantage on attacks against anyone but the cavalier until their next turn.",
    "zh-CN": "坚定印记：对骑兵以外目标的攻击具有劣势，持续至骑兵下个回合。"
  },
  "combatDetail.effect.thunder_gauntlets.name": {
    "en": "thunder gauntlets",
    "zh-CN": "雷鸣护手"
  },
  "combatDetail.effect.thunder_gauntlets.summary": {
    "en": "Thunder Gauntlets: disadvantage on attacks against anyone but the armorer until their next turn.",
    "zh-CN": "雷鸣护手：对装甲师以外目标的攻击具有劣势，持续至装甲师下个回合。"
  },
  "combatDetail.effect.ambush_master_mark.name": {
    "en": "ambush master",
    "zh-CN": "伏击大师"
  },
  "combatDetail.effect.ambush_master_mark.summary": {
    "en": "Ambush Master: attack rolls against this creature have advantage until the scout's next turn.",
    "zh-CN": "伏击大师：针对该生物的攻击掷骰具有优势，持续至斥候下个回合。"
  },
  "combatDetail.effect.lit_by_perfected_armor.name": {
    "en": "lit by perfected armor",
    "zh-CN": "完美护甲之光"
  },
  "combatDetail.effect.lit_by_perfected_armor.summary": {
    "en": "Perfected Armor: the next attack roll against this glowing creature has advantage.",
    "zh-CN": "完美护甲：针对该发光生物的下次攻击掷骰具有优势。"
  },
  "combatDetail.effect.orders_wrath.name": {
    "en": "order's wrath",
    "zh-CN": "秩序之怒"
  },
  "combatDetail.effect.orders_wrath.summary": {
    "en": "Order's Wrath: the next ally to hit this creature deals +2d8 psychic.",
    "zh-CN": "秩序之怒：下个命中该生物的盟友额外造成 +2d8 心灵伤害。"
  },
  "combatDetail.effect.planar_warrior.name": {
    "en": "planar warrior",
    "zh-CN": "位面战士"
  },
  "combatDetail.effect.planar_warrior.summary": {
    "en": "Planar Warrior: the next weapon hit this turn deals +1d8 force.",
    "zh-CN": "位面战士：本回合下次武器命中额外造成 +1d8 力场伤害。"
  },
  "combatDetail.effect.planar_warrior_2d8.name": {
    "en": "planar warrior (2d8)",
    "zh-CN": "位面战士（2d8）"
  },
  "combatDetail.effect.planar_warrior_2d8.summary": {
    "en": "Planar Warrior: the next weapon hit this turn deals +2d8 force.",
    "zh-CN": "位面战士：本回合下次武器命中额外造成 +2d8 力场伤害。"
  },
  "combatDetail.effect.slayers_prey.name": {
    "en": "slayer's prey",
    "zh-CN": "屠戮者猎物"
  },
  "combatDetail.effect.slayers_prey.summary": {
    "en": "Slayer's Prey: the first weapon hit each turn deals +1d6.",
    "zh-CN": "屠戮者猎物：每回合首次武器命中额外造成 +1d6 伤害。"
  },
  "combatDetail.effect.umbral_form.name": {
    "en": "umbral form",
    "zh-CN": "幽影形态"
  },
  "combatDetail.effect.umbral_form.summary": {
    "en": "Umbral Form: resistance to all damage but force and radiant, and moving through creatures and objects, for a minute.",
    "zh-CN": "幽影形态：一分钟内，对除力场和光耀外的所有伤害具有抗性，并能穿过生物与物体。"
  },
  "combatDetail.effect.otherworldly_wings.name": {
    "en": "otherworldly wings",
    "zh-CN": "异界之翼"
  },
  "combatDetail.effect.otherworldly_wings.summary": {
    "en": "Otherworldly Wings: a flying speed of 30 feet.",
    "zh-CN": "异界之翼：飞行速度为 30 英尺。"
  },
  "combatDetail.effect.bulwark_of_force.name": {
    "en": "bulwark of force",
    "zh-CN": "力场壁垒"
  },
  "combatDetail.effect.bulwark_of_force.summary": {
    "en": "Bulwark of Force: half cover, +2 AC and +2 on Dexterity saves, for a minute.",
    "zh-CN": "力场壁垒：获得半身掩护、护甲等级 +2、敏捷豁免 +2，持续一分钟。"
  },
  "combatDetail.effect.held_in_place.name": {
    "en": "held in place",
    "zh-CN": "被定在原地"
  },
  "combatDetail.effect.held_in_place.summary": {
    "en": "Held in place (Hold the Line): speed 0 for the rest of the turn.",
    "zh-CN": "坚守阵线：本回合剩余时间内速度为 0。"
  },
  "combatDetail.effect.raging_storm_tundra.name": {
    "en": "raging storm (tundra)",
    "zh-CN": "狂怒风暴：冻原"
  },
  "combatDetail.effect.raging_storm_tundra.summary": {
    "en": "Raging Storm (Tundra): speed halved until the barbarian's next turn.",
    "zh-CN": "狂怒风暴（冻原）：速度减半，持续至野蛮人下个回合。"
  },
  "combatDetail.effect.storm_aura.name": {
    "en": "storm aura",
    "zh-CN": "风暴光环"
  },
  "combatDetail.effect.storm_aura.summary": {
    "en": "Storm Aura: the raging Storm Herald's 10-foot aura (desert, sea or tundra).",
    "zh-CN": "风暴光环：狂暴中的风暴先驱具有 10 英尺光环，类型为沙漠、海洋或冻原。"
  },
  "combatDetail.effect.fanatical_focus_spent.name": {
    "en": "fanatical focus spent",
    "zh-CN": "狂热专注已消耗"
  },
  "combatDetail.effect.fanatical_focus_spent.summary": {
    "en": "Fanatical Focus is spent until this rage ends.",
    "zh-CN": "狂热专注已消耗，持续至本次狂暴结束。"
  },
  "combatDetail.effect.elder_champion.name": {
    "en": "elder champion",
    "zh-CN": "古老勇士"
  },
  "combatDetail.effect.elder_champion.summary": {
    "en": "Elder Champion: 10 hit points at the start of each turn, and enemies within 10 feet save at disadvantage against the paladin.",
    "zh-CN": "古老勇士：每回合开始恢复 10 点生命值，10 英尺内敌人对圣武士的豁免具有劣势。"
  },
  "combatDetail.effect.avenging_angel.name": {
    "en": "avenging angel",
    "zh-CN": "复仇天使"
  },
  "combatDetail.effect.avenging_angel.summary": {
    "en": "Avenging Angel: a 60-foot flying speed, and advantage on attacks against creatures the aura frightened.",
    "zh-CN": "复仇天使：飞行速度 60 英尺，针对被光环恐吓的生物攻击具有优势。"
  },
  "combatDetail.effect.invincible_conqueror.name": {
    "en": "invincible conqueror",
    "zh-CN": "无敌征服者"
  },
  "combatDetail.effect.invincible_conqueror.summary": {
    "en": "Invincible Conqueror: resistance to all damage for a minute; the extra attack and the 19-20 critical are narrated.",
    "zh-CN": "无敌征服者：一分钟内对所有伤害具有抗性；额外攻击和 19-20 重击由叙事处理。"
  },
  "combatDetail.effect.living_legend.name": {
    "en": "living legend",
    "zh-CN": "活着的传奇"
  },
  "combatDetail.effect.living_legend.summary": {
    "en": "Living Legend: advantage on Charisma checks for a minute; the reroll and the turned save are narrated.",
    "zh-CN": "活着的传奇：一分钟内魅力检定具有优势；重掷和改变豁免结果由叙事处理。"
  },
  "combatDetail.effect.mortal_bulwark.name": {
    "en": "mortal bulwark",
    "zh-CN": "凡世壁垒"
  },
  "combatDetail.effect.mortal_bulwark.summary": {
    "en": "Mortal Bulwark: truesight 120 feet and advantage on attacks against aberrations, celestials, elementals, fey and fiends.",
    "zh-CN": "凡世壁垒：120 英尺真实视觉，攻击异怪、天界、元素、精类和邪魔时具有优势。"
  },
  "combatDetail.effect.exalted_champion.name": {
    "en": "exalted champion",
    "zh-CN": "崇高勇士"
  },
  "combatDetail.effect.exalted_champion.summary": {
    "en": "Exalted Champion: resistance to nonmagical weapon damage and advantage on Wisdom saves for an hour.",
    "zh-CN": "崇高勇士：对非魔法武器伤害具有抗性，感知豁免具有优势，持续一小时。"
  },
  "combatDetail.effect.dread_lord.name": {
    "en": "dread lord",
    "zh-CN": "恐怖领主"
  },
  "combatDetail.effect.dread_lord.summary": {
    "en": "Dread Lord: attack rolls against the oathbreaker are at disadvantage, enemies starting a turn within 30 feet take 4d10 psychic, and a bonus-action spectral strike (pc_attack weapon \"Dread Lord's Shadows\") deals 4d10 psychic.",
    "zh-CN": "恐怖领主：针对破誓者的攻击具有劣势；敌人在其 30 英尺内开始回合时受到 4d10 心灵伤害；可用附赠动作发动幽影打击，造成 4d10 心灵伤害。"
  },
  "combatDetail.effect.soul_trinket.name": {
    "en": "soul trinket",
    "zh-CN": "灵魂饰物"
  },
  "combatDetail.effect.soul_trinket.summary": {
    "en": "A soul trinket: advantage on Constitution saves and resistance to poison while it is held.",
    "zh-CN": "灵魂饰物：持有时，体质豁免具有优势，对毒素伤害具有抗性。"
  },
  "combatDetail.effect.adjusted_density_lighter.name": {
    "en": "adjusted density (lighter)",
    "zh-CN": "降低密度"
  },
  "combatDetail.effect.adjusted_density_lighter.summary": {
    "en": "Adjust Density (halved): +10 feet of speed, disadvantage on Strength checks and saves.",
    "zh-CN": "调整密度（减半）：速度增加 +10 英尺，力量检定和豁免具有劣势。"
  },
  "combatDetail.effect.adjusted_density_heavier.name": {
    "en": "adjusted density (heavier)",
    "zh-CN": "提高密度"
  },
  "combatDetail.effect.adjusted_density_heavier.summary": {
    "en": "Adjust Density (doubled): -10 feet of speed, advantage on Strength checks and saves.",
    "zh-CN": "调整密度（加倍）：速度 -10 英尺，力量检定和豁免具有优势。"
  },
  "combatDetail.effect.emissary_lapsed.name": {
    "en": "emissary lapsed",
    "zh-CN": "救赎使者暂失效"
  },
  "combatDetail.effect.emissary_lapsed.summary": {
    "en": "Emissary of Redemption is set aside until a long rest: the paladin attacked or harmed a creature.",
    "zh-CN": "救赎使者暂时失效，持续至长休；圣武士攻击或伤害了生物。"
  },
  "combatDetail.effect.insightful_fighting.name": {
    "en": "insightful fighting",
    "zh-CN": "洞悉战斗"
  },
  "combatDetail.effect.insightful_fighting.summary": {
    "en": "Insightful Fighting: the rogue may Sneak Attack this creature without advantage for a minute.",
    "zh-CN": "洞悉战斗：一分钟内，游荡者可对该生物发动无需优势的偷袭。"
  },
  "combatDetail.effect.wildfire_spirit.name": {
    "en": "wildfire spirit",
    "zh-CN": "野火精魂"
  },
  "combatDetail.effect.wildfire_spirit.summary": {
    "en": "The wildfire spirit is out: the druid's fire and healing spells gain 1d8 (Enhanced Bond).",
    "zh-CN": "野火精魂已召出；增强连结使德鲁伊的火焰与治疗法术增加 1d8。"
  },
  "combatDetail.effect.slayers_prey_marked.name": {
    "en": "slayer's prey (marked)",
    "zh-CN": "屠戮者猎物：已标记"
  },
  "combatDetail.effect.slayers_prey_marked.summary": {
    "en": "The Monster Slayer's prey: the ranger adds 1d6 to saves against its effects (Supernatural Defense).",
    "zh-CN": "怪物猎手的猎物：超自然防御使游侠对其效果的豁免增加 1d6。"
  },
  "combatDetail.effect.struck_as_it_fled.name": {
    "en": "struck as it fled",
    "zh-CN": "逃离时被命中"
  },
  "combatDetail.effect.struck_as_it_fled.summary": {
    "en": "Relentless Avenger: the paladin's opportunity attack hit; they may move up to half their speed with use_reaction, drawing no opportunity attacks.",
    "zh-CN": "不懈复仇者：圣武士的借机攻击命中后，可用反应移动最多半速，不引发借机攻击。"
  },
  "combatDetail.effect.cackle_fever.name": {
    "en": "cackle fever",
    "zh-CN": "狂笑热"
  },
  "combatDetail.effect.cackle_fever.summary": {
    "en": "Cackle Fever: a level of exhaustion no rest removes; great stress (a fight, damage) is a DC 13 CON save or 1d10 psychic and a minute of mad laughter; a DC 13 CON save after each long rest lowers the DC by 1d6, cured at 0.",
    "zh-CN": "狂笑热：获得一级无法通过休息消除的力竭；战斗或受伤等巨大压力下，进行难度 13 的体质豁免，失败受到 1d10 心灵伤害并狂笑一分钟；每次长休后进行难度 13 的体质豁免，成功使难度降低 1d6，降至 0 则痊愈。"
  },
  "combatDetail.effect.sewer_plague.name": {
    "en": "sewer plague",
    "zh-CN": "下水道瘟疫"
  },
  "combatDetail.effect.sewer_plague.summary": {
    "en": "Sewer Plague: spent hit dice heal half, a long rest restores no hit points, and a DC 11 CON save after each long rest adds or removes a level of exhaustion; below 1 it is cured.",
    "zh-CN": "下水道瘟疫：生命骰治疗减半，长休不恢复生命值；每次长休后进行难度 11 的体质豁免，以增加或减少一级力竭，低于 1 级则痊愈。"
  },
  "combatDetail.effect.sight_rot_1.name": {
    "en": "sight rot (-1)",
    "zh-CN": "视腐病（-1）"
  },
  "combatDetail.effect.sight_rot_1.summary": {
    "en": "Sight Rot: -1 to attack rolls and to ability checks that rely on sight; 1 worse after each long rest, blinded at -5.",
    "zh-CN": "视腐病：攻击掷骰和依赖视觉的属性检定 -1；每次长休后再恶化 1 点，达到 -5 时目盲。"
  },
  "combatDetail.effect.sight_rot_2.name": {
    "en": "sight rot (-2)",
    "zh-CN": "视腐病（-2）"
  },
  "combatDetail.effect.sight_rot_2.summary": {
    "en": "Sight Rot: -2 to attack rolls and to ability checks that rely on sight; 1 worse after each long rest, blinded at -5.",
    "zh-CN": "视腐病：攻击掷骰和依赖视觉的属性检定 -2；每次长休后再恶化 1 点，达到 -5 时目盲。"
  },
  "combatDetail.effect.sight_rot_3.name": {
    "en": "sight rot (-3)",
    "zh-CN": "视腐病（-3）"
  },
  "combatDetail.effect.sight_rot_3.summary": {
    "en": "Sight Rot: -3 to attack rolls and to ability checks that rely on sight; 1 worse after each long rest, blinded at -5.",
    "zh-CN": "视腐病：攻击掷骰和依赖视觉的属性检定 -3；每次长休后再恶化 1 点，达到 -5 时目盲。"
  },
  "combatDetail.effect.sight_rot_4.name": {
    "en": "sight rot (-4)",
    "zh-CN": "视腐病（-4）"
  },
  "combatDetail.effect.sight_rot_4.summary": {
    "en": "Sight Rot: -4 to attack rolls and to ability checks that rely on sight; 1 worse after each long rest, blinded at -5.",
    "zh-CN": "视腐病：攻击掷骰和依赖视觉的属性检定 -4；每次长休后再恶化 1 点，达到 -5 时目盲。"
  },
  "combatDetail.effect.sight_rot_5.name": {
    "en": "sight rot (-5)",
    "zh-CN": "视腐病（-5）"
  },
  "combatDetail.effect.sight_rot_5.summary": {
    "en": "Sight Rot: -5 to attack rolls and to ability checks that rely on sight; 1 worse after each long rest, blinded at -5.",
    "zh-CN": "视腐病：攻击掷骰和依赖视觉的属性检定 -5；每次长休后再恶化 1 点，达到 -5 时目盲。"
  },
  "combatDetail.effect.hallucinating.name": {
    "en": "hallucinating",
    "zh-CN": "幻觉"
  },
  "combatDetail.effect.hallucinating.summary": {
    "en": "Madness: vivid hallucinations, disadvantage on ability checks.",
    "zh-CN": "疯狂：出现鲜明幻觉，属性检定具有劣势。"
  },
  "combatDetail.effect.paranoid.name": {
    "en": "paranoid",
    "zh-CN": "偏执"
  },
  "combatDetail.effect.paranoid.summary": {
    "en": "Madness: extreme paranoia, disadvantage on Wisdom and Charisma checks.",
    "zh-CN": "疯狂：极端偏执，感知和魅力检定具有劣势。"
  },
  "combatDetail.effect.tremors.name": {
    "en": "tremors",
    "zh-CN": "颤抖"
  },
  "combatDetail.effect.tremors.summary": {
    "en": "Madness: uncontrollable tremors, disadvantage on attack rolls and on checks and saves that use Strength or Dexterity.",
    "zh-CN": "疯狂：无法控制地颤抖，攻击掷骰以及力量、敏捷检定和豁免具有劣势。"
  },
  "combatDetail.effect.babbling.name": {
    "en": "babbling",
    "zh-CN": "胡言乱语"
  },
  "combatDetail.effect.babbling.summary": {
    "en": "Madness: babbling, incapable of normal speech or spellcasting.",
    "zh-CN": "疯狂：胡言乱语，无法正常说话或施法。"
  },
  "combatDetail.effect.madness_attacks_nearest.name": {
    "en": "madness: attacks the nearest creature",
    "zh-CN": "疯狂：攻击最近生物"
  },
  "combatDetail.effect.madness_attacks_nearest.summary": {
    "en": "Madness: must use their action each round to attack the nearest creature.",
    "zh-CN": "疯狂：每轮必须用动作攻击最近的生物。"
  },
  "combatDetail.effect.madness_obeys.name": {
    "en": "madness: obeys any order",
    "zh-CN": "疯狂：服从命令"
  },
  "combatDetail.effect.madness_obeys.summary": {
    "en": "Madness: does whatever anyone tells them that is not obviously self-destructive.",
    "zh-CN": "疯狂：服从任何人提出的、没有明显自毁性质的命令。"
  },
  "combatDetail.effect.madness_hunger.name": {
    "en": "madness: strange hunger",
    "zh-CN": "疯狂：异食欲"
  },
  "combatDetail.effect.madness_hunger.summary": {
    "en": "Madness: an overpowering urge to eat something strange.",
    "zh-CN": "疯狂：产生无法抗拒的冲动，想吃奇怪的东西。"
  },
  "combatDetail.effect.madness_compulsion.name": {
    "en": "madness: compulsion",
    "zh-CN": "疯狂：强迫行为"
  },
  "combatDetail.effect.madness_compulsion.summary": {
    "en": "Madness: compelled to repeat one activity over and over.",
    "zh-CN": "疯狂：被迫反复进行某种活动。"
  },
  "combatDetail.effect.madness_revulsion.name": {
    "en": "madness: revulsion",
    "zh-CN": "疯狂：强烈厌恶"
  },
  "combatDetail.effect.madness_revulsion.summary": {
    "en": "Madness: intense revulsion toward something, as the antipathy effect of antipathy/sympathy.",
    "zh-CN": "疯狂：对某种事物产生强烈厌恶，类似嫌恶/吸引术的嫌恶效果。"
  },
  "combatDetail.effect.madness_delusion.name": {
    "en": "madness: delusion",
    "zh-CN": "疯狂：妄想"
  },
  "combatDetail.effect.madness_delusion.summary": {
    "en": "Madness: believes they are under the effects of a potion of the DM's choice.",
    "zh-CN": "疯狂：认为自身受到 DM 指定药水的效果影响。"
  },
  "combatDetail.effect.madness_lucky_charm.name": {
    "en": "madness: lucky charm",
    "zh-CN": "疯狂：幸运物"
  },
  "combatDetail.effect.madness_lucky_charm.summary": {
    "en": "Madness: disadvantage on attack rolls, ability checks and saving throws while more than 30 feet from their lucky charm.",
    "zh-CN": "疯狂：距离幸运物超过 30 英尺时，攻击掷骰、属性检定和豁免具有劣势。"
  },
  "combatDetail.effect.madness_amnesia.name": {
    "en": "madness: amnesia",
    "zh-CN": "疯狂：失忆"
  },
  "combatDetail.effect.madness_amnesia.summary": {
    "en": "Madness: partial amnesia, recognizes no one and remembers nothing from before.",
    "zh-CN": "疯狂：部分失忆，认不出任何人，也记不起此前的事情。"
  },
  "combatDetail.effect.madness_confusion.name": {
    "en": "madness: confusion on damage",
    "zh-CN": "疯狂：受伤后困惑"
  },
  "combatDetail.effect.madness_confusion.summary": {
    "en": "Madness: whenever they take damage, a DC 15 Wisdom save or confused for 1 minute (the server rolls it).",
    "zh-CN": "疯狂：每次受到伤害时进行难度 15 的感知豁免，失败则困惑 1 分钟。"
  },
  "combatDetail.effect.indefinite_madness.name": {
    "en": "indefinite madness",
    "zh-CN": "长期疯狂"
  },
  "combatDetail.effect.indefinite_madness.summary": {
    "en": "Indefinite madness: a new flaw, lasting until greater restoration or stronger magic.",
    "zh-CN": "长期疯狂：产生一个新的缺点，持续至高等复原术或更强的魔法消除。"
  },
  "combatDetail.effect.truth_serum.name": {
    "en": "truth serum",
    "zh-CN": "吐真剂"
  },
  "combatDetail.effect.truth_serum.summary": {
    "en": "Truth Serum: cannot knowingly speak a lie.",
    "zh-CN": "吐真剂：无法明知故犯地说谎。"
  },
  "combatDetail.effect.recuperated.name": {
    "en": "recuperated",
    "zh-CN": "休养"
  },
  "combatDetail.effect.recuperated.summary": {
    "en": "Recuperating: advantage on saving throws against a disease or poison for 24 hours.",
    "zh-CN": "休养：24 小时内，对疾病或毒素的豁免具有优势。"
  },
  "combatDetail.effect.eyebright_ointment.name": {
    "en": "eyebright ointment",
    "zh-CN": "明目药膏"
  },
  "combatDetail.effect.eyebright_ointment.summary": {
    "en": "Eyebright ointment on the eyes: sight rot does not worsen after the next long rest.",
    "zh-CN": "眼部涂有明目药膏：下次长休后视腐病不会恶化。"
  },
  "combatDetail.effect.blink.name": {
    "en": "blink",
    "zh-CN": "闪现术"
  },
  "combatDetail.effect.blink.summary": {
    "en": "Blink: at the end of each of their turns the server rolls a d20; on 11 or higher they vanish to the Ethereal Plane until the start of their next turn.",
    "zh-CN": "闪现术：每回合结束时掷 d20，11 或更高则消失至以太位面，持续至其下个回合开始。"
  },
  "combatDetail.effect.blinked.name": {
    "en": "blinked",
    "zh-CN": "已经闪现"
  },
  "combatDetail.effect.blinked.summary": {
    "en": "Blinked away: on the Ethereal Plane until the start of their next turn; nothing on the Material Plane can attack or target them.",
    "zh-CN": "已经闪现：处于以太位面，持续至其下个回合开始；物质位面上的任何事物都无法攻击或指定其为目标。"
  },
  "combatDetail.effect.ethereal.name": {
    "en": "ethereal",
    "zh-CN": "以太形态"
  },
  "combatDetail.effect.ethereal.summary": {
    "en": "Etherealness: on the Border Ethereal; they cannot affect or be affected by creatures on the Material Plane (no attacks either way).",
    "zh-CN": "以太化：处于边界以太位面，无法影响物质位面的生物，也不受其影响，双方无法相互攻击。"
  },
  "combatDetail.effect.see_invisibility.name": {
    "en": "see invisibility",
    "zh-CN": "识破隐形"
  },
  "combatDetail.effect.see_invisibility.summary": {
    "en": "See Invisibility: they see invisible creatures as if they were visible.",
    "zh-CN": "识破隐形：可看见隐形生物，如同其可见。"
  },
  "combatDetail.effect.true_seeing.name": {
    "en": "true seeing",
    "zh-CN": "真知术"
  },
  "combatDetail.effect.true_seeing.summary": {
    "en": "True Seeing: truesight 120 feet: they see invisible creatures and into magical darkness.",
    "zh-CN": "真知术：120 英尺真实视觉，可看见隐形生物及魔法黑暗中的事物。"
  },
  "combatDetail.effect.feebleminded.name": {
    "en": "feebleminded",
    "zh-CN": "弱智"
  },
  "combatDetail.effect.feebleminded.summary": {
    "en": "Feeblemind: Intelligence and Charisma are 1; the creature cannot cast spells, activate magic items, understand language or communicate.",
    "zh-CN": "弱智术：智力和魅力为 1，无法施法、激活魔法物品、理解语言或交流。"
  },
  "combatDetail.effect.mazed.name": {
    "en": "mazed",
    "zh-CN": "迷宫囚禁"
  },
  "combatDetail.effect.mazed.summary": {
    "en": "Maze: banished into a labyrinthine demiplane; it cannot be targeted, and its action buys an Intelligence check against DC 20 to escape (take_action escape).",
    "zh-CN": "迷宫术：被放逐至迷宫般的半位面，无法被指定为目标；可用动作进行难度 20 的智力检定来脱离。"
  },
  "combatDetail.effect.imprisoned.name": {
    "en": "imprisoned",
    "zh-CN": "被禁锢"
  },
  "combatDetail.effect.imprisoned.summary": {
    "en": "Imprisonment: bound by the spell until it is dispelled; it takes no actions and cannot be targeted.",
    "zh-CN": "禁锢术：受法术束缚，持续至被解除，无法使用动作或被指定为目标。"
  },
  "combatDetail.effect.insane_contact.name": {
    "en": "insane (contact other plane)",
    "zh-CN": "异界接触：发疯"
  },
  "combatDetail.effect.insane_contact.summary": {
    "en": "Insane (Contact Other Plane): no actions, no understanding of speech or writing, only gibberish, until a long rest.",
    "zh-CN": "异界接触：无法使用动作或理解语言、文字，只能胡言乱语，持续至长休。"
  },
  "combatDetail.effect.calmed.name": {
    "en": "calmed",
    "zh-CN": "情绪平静"
  },
  "combatDetail.effect.calmed.summary": {
    "en": "Calm Emotions: indifferent to the creatures it was hostile to; it makes no attacks, and the calm ends when it or its allies are harmed.",
    "zh-CN": "安抚情绪：对原先敌对的生物变得冷淡，无法攻击；自身或盟友受到伤害时结束。"
  },
  "combatDetail.effect.fleeing.name": {
    "en": "fleeing",
    "zh-CN": "逃离"
  },
  "combatDetail.effect.fleeing.summary": {
    "en": "Fear: it drops what it holds and must take the Dash action away from the caster on each of its turns; it makes no attacks and casts no spells.",
    "zh-CN": "恐惧术：丢下持有物，每回合必须疾走远离施法者，无法攻击或施法。"
  },
  "combatDetail.effect.freedom_of_movement.name": {
    "en": "freedom of movement",
    "zh-CN": "行动自如"
  },
  "combatDetail.effect.freedom_of_movement.summary": {
    "en": "Freedom of Movement: difficult terrain does not slow them, magic cannot reduce their speed, paralyze or restrain them, and 5 feet of movement frees them from a nonmagical grapple or restraint.",
    "zh-CN": "行动自如：困难地形不降低速度，魔法无法降低速度、麻痹或束缚其；消耗 5 英尺移动力即可脱离非魔法擒抱或束缚。"
  },
  "combatDetail.effect.spider_climb.name": {
    "en": "spider climb",
    "zh-CN": "蛛行术"
  },
  "combatDetail.effect.spider_climb.summary": {
    "en": "Spider Climb: a climbing speed equal to their walking speed; they climb walls and ceilings with their hands free.",
    "zh-CN": "蛛行术：攀爬速度等同于步行速度，可空出双手攀爬墙壁和天花板。"
  },
  "combatDetail.effect.water_walk.name": {
    "en": "water walk",
    "zh-CN": "水上行走"
  },
  "combatDetail.effect.water_walk.summary": {
    "en": "Water Walk: they walk across water and other liquid as if it were solid ground.",
    "zh-CN": "水上行走：可在水与其他液体表面行走，如同坚实地面。"
  },
  "combatDetail.effect.jump_spell.name": {
    "en": "jump (spell)",
    "zh-CN": "跳跃术"
  },
  "combatDetail.effect.jump_spell.summary": {
    "en": "Jump: their jump distance is tripled.",
    "zh-CN": "跳跃术：跳跃距离变为三倍。"
  },
  "combatDetail.effect.wind_walk.name": {
    "en": "wind walk",
    "zh-CN": "风行术"
  },
  "combatDetail.effect.wind_walk.summary": {
    "en": "Wind Walk: a cloud of mist with a flying speed of 300 feet and resistance to nonmagical weapon damage; the only actions are Dash or reverting (a minute).",
    "zh-CN": "风行术：化为云雾，飞行速度 300 英尺，对非魔法武器伤害具有抗性；只能疾走或花一分钟恢复原形。"
  }
});
