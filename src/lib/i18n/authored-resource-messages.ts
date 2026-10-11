import { defineMessages } from "./catalog.ts";

// Original project-authored subclass and lineage counter wording. English
// guidance remains the model-facing source; translations are display-only.
export const AUTHORED_RESOURCE_MESSAGES = /*#__PURE__*/ defineMessages({
  "sheetPlay.resourceName.sub_superiority_dice": {
    "en": "Superiority Dice",
    "zh-CN": "卓越骰"
  },
  "sheetDialog.resourceHelp.sub_superiority_dice": {
    "en": "Spent on a maneuver attached to an attack: Trip, Disarm, Riposte, Precision, Menacing, Commander's Strike and the rest. The die is added to the damage or to the roll the maneuver names, and its save DC is 8 + proficiency + Strength or Dexterity.",
    "zh-CN": "用于附加在攻击上的战技，如绊摔、缴械、反击、精准、恐吓、指挥官打击等。卓越骰加入伤害或该战技指定的掷骰；豁免难度为 8 + 熟练加值 + 力量或敏捷调整值。"
  },
  "sheetPlay.resourceName.sub_psionic_energy": {
    "en": "Psionic Energy Dice",
    "zh-CN": "灵能骰"
  },
  "sheetDialog.resourceHelp.sub_psionic_energy": {
    "en": "The shared pool behind every psionic feature of this subclass. One die returns on a short rest; the rest on a long rest. The die size grows with level: d6, then d8 at 5th, d10 at 11th and d12 at 17th.",
    "zh-CN": "该子职业所有灵能特性共用的骰池。短休恢复一个骰，长休恢复其余骰。骰子随等级增长：起初为 d6，5 级为 d8，11 级为 d10，17 级为 d12。"
  },
  "sheetPlay.resourceName.sub_fighting_spirit": {
    "en": "Fighting Spirit",
    "zh-CN": "战斗之魂"
  },
  "sheetDialog.resourceHelp.sub_fighting_spirit": {
    "en": "A bonus action granting advantage on weapon attacks this turn plus temporary hit points: 5 at 3rd level, 10 at 10th, 15 at 15th.",
    "zh-CN": "消耗一个附赠动作，使本回合的武器攻击具有优势，并获得临时生命值：3 级为 5 点，10 级为 10 点，15 级为 15 点。"
  },
  "sheetPlay.resourceName.sub_giants_might": {
    "en": "Giant's Might",
    "zh-CN": "巨人之力"
  },
  "sheetDialog.resourceHelp.sub_giants_might": {
    "en": "A bonus action for 1 minute: become Large, advantage on Strength checks and saves, and one extra damage die per turn.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟：体型变为大型，力量检定和力量豁免具有优势，每回合额外造成一个伤害骰的伤害。"
  },
  "sheetPlay.resourceName.sub_runic_shield": {
    "en": "Runic Shield",
    "zh-CN": "符文之盾"
  },
  "sheetDialog.resourceHelp.sub_runic_shield": {
    "en": "A reaction forcing an attacker to reroll a hit against an ally within 60 feet.",
    "zh-CN": "消耗一个反应，迫使攻击者重掷一次对 60 英尺内盟友命中的攻击。"
  },
  "sheetPlay.resourceName.sub_unleash_incarnation": {
    "en": "Unleash Incarnation",
    "zh-CN": "释放化身"
  },
  "sheetDialog.resourceHelp.sub_unleash_incarnation": {
    "en": "One extra melee attack made from the echo's space when taking the Attack action. Resolve it with pc_attack like any other.",
    "zh-CN": "采取攻击动作时，可从回响所在位置额外进行一次近战攻击，按普通攻击结算。"
  },
  "sheetPlay.resourceName.sub_reclaim_potential": {
    "en": "Reclaim Potential",
    "zh-CN": "回收潜能"
  },
  "sheetDialog.resourceHelp.sub_reclaim_potential": {
    "en": "When the echo is destroyed by damage, gain 2d6 + Constitution modifier temporary hit points.",
    "zh-CN": "回响因伤害被摧毁时，获得 2d6 + 体质调整值的临时生命值。"
  },
  "sheetPlay.resourceName.sub_shadow_martyr": {
    "en": "Shadow Martyr",
    "zh-CN": "影之殉身"
  },
  "sheetDialog.resourceHelp.sub_shadow_martyr": {
    "en": "A reaction making the echo the target of an attack aimed at another creature.",
    "zh-CN": "消耗一个反应，使回响代替另一生物成为攻击目标。"
  },
  "sheetPlay.resourceName.sub_warding_maneuver": {
    "en": "Warding Maneuver",
    "zh-CN": "防护战技"
  },
  "sheetDialog.resourceHelp.sub_warding_maneuver": {
    "en": "A reaction adding 1d8 to an ally's AC against one attack, halving the damage if it still hits.",
    "zh-CN": "消耗一个反应，使盟友对一次攻击的护甲等级增加 1d8；若仍被命中，该次伤害减半。"
  },
  "sheetPlay.resourceName.sub_strength_before_death": {
    "en": "Strength before Death",
    "zh-CN": "临终之力"
  },
  "sheetDialog.resourceHelp.sub_strength_before_death": {
    "en": "A reaction on taking damage that grants a full extra turn before the damage lands.",
    "zh-CN": "受到伤害时消耗一个反应，在该伤害生效前获得一个完整的额外回合。"
  },
  "sheetPlay.resourceName.sub_arcane_shot": {
    "en": "Arcane Shot",
    "zh-CN": "奥术射击"
  },
  "sheetDialog.resourceHelp.sub_arcane_shot": {
    "en": "An arrow's magical rider, chosen from the options known and applied on a hit: Banishing, Beguiling, Bursting, Enfeebling, Grasping, Piercing, Seeking or Shadow. Its save DC is 8 + proficiency + Intelligence.",
    "zh-CN": "箭矢命中时，附加一个已知的魔法效果：放逐、惑心、爆裂、衰弱、缠缚、穿透、追踪或暗影。豁免难度为 8 + 熟练加值 + 智力调整值。"
  },
  "sheetPlay.resourceName.sub_warding_flare": {
    "en": "Warding Flare",
    "zh-CN": "守护闪光"
  },
  "sheetDialog.resourceHelp.sub_warding_flare": {
    "en": "A reaction imposing disadvantage on one attack roll, against the cleric and, from 6th level, an ally within 30 feet.",
    "zh-CN": "消耗一个反应，使一次针对牧师的攻击掷骰具有劣势；从 6 级起，也可保护 30 英尺内的盟友。"
  },
  "sheetPlay.resourceName.sub_wrath_of_the_storm": {
    "en": "Wrath of the Storm",
    "zh-CN": "风暴之怒"
  },
  "sheetDialog.resourceHelp.sub_wrath_of_the_storm": {
    "en": "A reaction dealing 2d8 lightning or thunder damage to a creature that hit the cleric in melee, halved on a Dexterity save.",
    "zh-CN": "消耗一个反应，对近战命中牧师的生物造成 2d8 闪电或雷鸣伤害，敏捷豁免成功则伤害减半。"
  },
  "sheetPlay.resourceName.sub_war_priest": {
    "en": "War Priest",
    "zh-CN": "战争祭司"
  },
  "sheetDialog.resourceHelp.sub_war_priest": {
    "en": "A bonus-action weapon attack after taking the Attack action. Resolve it with pc_attack.",
    "zh-CN": "采取攻击动作后，可用一个附赠动作进行一次武器攻击。"
  },
  "sheetPlay.resourceName.sub_eyes_of_the_grave": {
    "en": "Eyes of the Grave",
    "zh-CN": "墓地之眼"
  },
  "sheetDialog.resourceHelp.sub_eyes_of_the_grave": {
    "en": "An action sensing undead within 60 feet, through walls but not a foot of stone or thin metal.",
    "zh-CN": "消耗一个动作，感知 60 英尺内的亡灵。可穿透墙壁，但无法穿透一英尺厚的石墙或薄金属层。"
  },
  "sheetPlay.resourceName.sub_sentinel_at_deaths_door": {
    "en": "Sentinel at Death's Door",
    "zh-CN": "死门守卫"
  },
  "sheetDialog.resourceHelp.sub_sentinel_at_deaths_door": {
    "en": "A reaction turning a critical hit against a creature within 30 feet into an ordinary hit.",
    "zh-CN": "消耗一个反应，将对 30 英尺内生物的一次重击变为普通命中。"
  },
  "sheetPlay.resourceName.sub_eyes_of_night": {
    "en": "Eyes of Night",
    "zh-CN": "夜之眼"
  },
  "sheetDialog.resourceHelp.sub_eyes_of_night": {
    "en": "Share the cleric's 300-foot darkvision with willing creatures within 10 feet for an hour.",
    "zh-CN": "将牧师的 300 英尺黑暗视觉分享给 10 英尺内的自愿生物，持续 1 小时。"
  },
  "sheetPlay.resourceName.sub_steps_of_night": {
    "en": "Steps of Night",
    "zh-CN": "夜之步"
  },
  "sheetDialog.resourceHelp.sub_steps_of_night": {
    "en": "A bonus action in dim light or darkness granting a flying speed equal to the walking speed for 1 minute.",
    "zh-CN": "在微光或黑暗中消耗一个附赠动作，获得等于步行速度的飞行速度，持续 1 分钟。"
  },
  "sheetPlay.resourceName.sub_balm_of_the_summer_court": {
    "en": "Balm of the Summer Court",
    "zh-CN": "夏庭香膏"
  },
  "sheetDialog.resourceHelp.sub_balm_of_the_summer_court": {
    "en": "A pool of d6s equal to the druid's level. Spend any number as a bonus action to heal a creature within 120 feet that many d6, plus 1 temporary hit point per die.",
    "zh-CN": "拥有等于德鲁伊等级数量的 d6 骰池。用一个附赠动作消耗任意数量的骰，为 120 英尺内的生物恢复相应 d6 的生命值，每个骰还提供 1 点临时生命值。"
  },
  "sheetPlay.resourceName.sub_hidden_paths": {
    "en": "Hidden Paths",
    "zh-CN": "隐秘路径"
  },
  "sheetDialog.resourceHelp.sub_hidden_paths": {
    "en": "A bonus action teleporting the druid 60 feet, or a willing creature they touch 30 feet.",
    "zh-CN": "消耗一个附赠动作，将德鲁伊传送 60 英尺，或将触碰的自愿生物传送 30 英尺。"
  },
  "sheetPlay.resourceName.sub_spirit_totem": {
    "en": "Spirit Totem",
    "zh-CN": "精魂图腾"
  },
  "sheetDialog.resourceHelp.sub_spirit_totem": {
    "en": "A bonus action raising a 30-foot Bear, Hawk or Unicorn spirit aura for 1 minute.",
    "zh-CN": "消耗一个附赠动作，召出范围为 30 英尺的熊、鹰或独角兽精魂灵光，持续 1 分钟。"
  },
  "sheetPlay.resourceName.sub_faithful_summons": {
    "en": "Faithful Summons",
    "zh-CN": "忠诚召唤"
  },
  "sheetDialog.resourceHelp.sub_faithful_summons": {
    "en": "Triggers on its own when the druid drops to 0 hit points: four dire wolves appear and defend them for an hour.",
    "zh-CN": "德鲁伊生命值降至 0 时自动触发：四只凶暴狼出现，保护德鲁伊 1 小时。"
  },
  "sheetPlay.resourceName.sub_fungal_infestation": {
    "en": "Fungal Infestation",
    "zh-CN": "真菌侵染"
  },
  "sheetDialog.resourceHelp.sub_fungal_infestation": {
    "en": "A reaction reanimating a beast or humanoid that just died within 10 feet as a zombie under the druid's command for an hour.",
    "zh-CN": "消耗一个反应，将 10 英尺内刚刚死亡的野兽或类人生物复生为受德鲁伊控制的僵尸，持续 1 小时。"
  },
  "sheetPlay.resourceName.sub_star_map": {
    "en": "Star Map",
    "zh-CN": "星图"
  },
  "sheetDialog.resourceHelp.sub_star_map": {
    "en": "Free castings of guiding bolt from the map, without a spell slot. Resolve the attack with cast_at_enemy.",
    "zh-CN": "通过星图施放曳光弹，无需消耗法术位；攻击单独结算。"
  },
  "sheetPlay.resourceName.sub_cosmic_omen": {
    "en": "Cosmic Omen",
    "zh-CN": "宇宙征兆"
  },
  "sheetDialog.resourceHelp.sub_cosmic_omen": {
    "en": "A reaction adding a d6 (Weal) or subtracting one (Woe) on an attack, check or save by a creature within 30 feet. The omen is chosen after each long rest and does not change until the next one.",
    "zh-CN": "消耗一个反应，为 30 英尺内生物的一次攻击、检定或豁免掷一个 d6：吉兆时加入该结果，凶兆时减去该结果。每次长休后确定征兆，直到下次长休才会改变。"
  },
  "sheetPlay.resourceName.sub_blazing_revival": {
    "en": "Blazing Revival",
    "zh-CN": "烈焰复苏"
  },
  "sheetDialog.resourceHelp.sub_blazing_revival": {
    "en": "Triggers when the druid drops to 0 hit points while the wildfire spirit is out: the spirit is destroyed and the druid returns at half their hit point maximum.",
    "zh-CN": "野火精魂存在时，若德鲁伊生命值降至 0，则精魂被摧毁，德鲁伊恢复至生命值上限的一半。"
  },
  "sheetPlay.resourceName.sub_walker_in_dreams": {
    "en": "Walker in Dreams",
    "zh-CN": "梦境行者"
  },
  "sheetDialog.resourceHelp.sub_walker_in_dreams": {
    "en": "A free casting of dream, scrying or teleportation circle after a short rest, without a slot.",
    "zh-CN": "短休后可施放一次托梦术、探知术或传送法阵，无需消耗法术位。"
  },
  "sheetPlay.resourceName.sub_enthralling_performance": {
    "en": "Enthralling Performance",
    "zh-CN": "迷人表演"
  },
  "sheetDialog.resourceHelp.sub_enthralling_performance": {
    "en": "After a minute of performance, up to a proficiency-bonus number of humanoids within 60 feet are charmed for an hour on a failed Wisdom save.",
    "zh-CN": "表演 1 分钟后，可使 60 英尺内至多等于熟练加值数量的类人生物进行感知豁免；失败者被魅惑 1 小时。"
  },
  "sheetPlay.resourceName.sub_mantle_of_majesty": {
    "en": "Mantle of Majesty",
    "zh-CN": "威严斗篷"
  },
  "sheetDialog.resourceHelp.sub_mantle_of_majesty": {
    "en": "A bonus action granting a minute of free command castings, with listeners unable to attack the bard while charmed.",
    "zh-CN": "消耗一个附赠动作，在 1 分钟内可免费施放命令术；听众被魅惑期间无法攻击吟游诗人。"
  },
  "sheetPlay.resourceName.sub_unbreakable_majesty": {
    "en": "Unbreakable Majesty",
    "zh-CN": "不破威严"
  },
  "sheetDialog.resourceHelp.sub_unbreakable_majesty": {
    "en": "A bonus action for 1 minute: an attacker must pass a Charisma save or lose the attack and be unable to target the bard that turn.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟：攻击者必须通过魅力豁免，否则失去该次攻击，且本回合无法再以吟游诗人为目标。"
  },
  "sheetPlay.resourceName.sub_words_of_terror": {
    "en": "Words of Terror",
    "zh-CN": "恐惧之言"
  },
  "sheetDialog.resourceHelp.sub_words_of_terror": {
    "en": "A minute of private conversation frightens a humanoid for an hour on a failed Wisdom save.",
    "zh-CN": "私下交谈 1 分钟后，使一个类人生物进行感知豁免；失败者陷入恐慌，持续 1 小时。"
  },
  "sheetPlay.resourceName.sub_mantle_of_whispers": {
    "en": "Mantle of Whispers",
    "zh-CN": "低语斗篷"
  },
  "sheetDialog.resourceHelp.sub_mantle_of_whispers": {
    "en": "A reaction capturing the shadow of a humanoid that died within 30 feet, wearable as their identity for an hour.",
    "zh-CN": "消耗一个反应，捕获 30 英尺内死亡的类人生物的影子，可披上该影子扮成对方，持续 1 小时。"
  },
  "sheetPlay.resourceName.sub_shadow_lore": {
    "en": "Shadow Lore",
    "zh-CN": "暗影秘闻"
  },
  "sheetDialog.resourceHelp.sub_shadow_lore": {
    "en": "A whispered secret charms a creature within 30 feet for 8 hours on a failed Wisdom save, and it obeys reasonable requests.",
    "zh-CN": "低声说出的秘密使 30 英尺内生物进行感知豁免；失败者被魅惑 8 小时，并服从合理的请求。"
  },
  "sheetPlay.resourceName.sub_infectious_inspiration": {
    "en": "Infectious Inspiration",
    "zh-CN": "激励传递"
  },
  "sheetDialog.resourceHelp.sub_infectious_inspiration": {
    "en": "A reaction copying a successful Bardic Inspiration die onto another creature within 60 feet, without spending an inspiration use.",
    "zh-CN": "消耗一个反应，将一个成功使用的吟游激励骰复制给 60 英尺内的另一生物，无需再消耗激励次数。"
  },
  "sheetPlay.resourceName.sub_performance_of_creation": {
    "en": "Performance of Creation",
    "zh-CN": "造物演奏"
  },
  "sheetDialog.resourceHelp.sub_performance_of_creation": {
    "en": "An action creating a nonmagical item worth up to 20 times the bard's level. A spell slot buys extra uses.",
    "zh-CN": "消耗一个动作，创造价值不超过吟游诗人等级 20 倍的非魔法物品。可消耗法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_animating_performance": {
    "en": "Animating Performance",
    "zh-CN": "赋生演奏"
  },
  "sheetDialog.resourceHelp.sub_animating_performance": {
    "en": "An action animating a Large or smaller object as a dancing item that acts on the bard's turn. A spell slot buys extra uses.",
    "zh-CN": "消耗一个动作，将大型或更小的物体赋生为舞动物品，在吟游诗人的回合行动。可消耗法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_spirit_session": {
    "en": "Spirit Session",
    "zh-CN": "精魂降临"
  },
  "sheetDialog.resourceHelp.sub_spirit_session": {
    "en": "An hour-long seance granting one divination or necromancy spell, castable until the next long rest.",
    "zh-CN": "进行 1 小时的降神仪式，获得一个预言或死灵学派法术，可施放至下次长休。"
  },
  "sheetPlay.resourceName.sub_zealous_presence": {
    "en": "Zealous Presence",
    "zh-CN": "狂热威仪"
  },
  "sheetDialog.resourceHelp.sub_zealous_presence": {
    "en": "A bonus action granting up to ten allies within 60 feet advantage on attacks and saves until the barbarian's next turn.",
    "zh-CN": "消耗一个附赠动作，使 60 英尺内至多十名盟友的攻击和豁免具有优势，持续至野蛮人的下一回合。"
  },
  "sheetPlay.resourceName.sub_consult_the_spirits": {
    "en": "Consult the Spirits",
    "zh-CN": "请教精魂"
  },
  "sheetDialog.resourceHelp.sub_consult_the_spirits": {
    "en": "A free casting of augury or clairvoyance using Wisdom, with no slot or components.",
    "zh-CN": "以感知为施法属性施放兆示术或千里感知，无需法术位或施法成分。"
  },
  "sheetPlay.resourceName.sub_magic_awareness": {
    "en": "Magic Awareness",
    "zh-CN": "魔法感知"
  },
  "sheetDialog.resourceHelp.sub_magic_awareness": {
    "en": "An action sensing spells and magic items within 60 feet, through most barriers.",
    "zh-CN": "消耗一个动作，感知 60 英尺内的法术与魔法物品，可穿透大多数障碍。"
  },
  "sheetPlay.resourceName.sub_bolstering_magic": {
    "en": "Bolstering Magic",
    "zh-CN": "增援魔法"
  },
  "sheetDialog.resourceHelp.sub_bolstering_magic": {
    "en": "Touch an ally to grant a bonus d3 on attacks and ability checks for 10 minutes, or restore one expended spell slot of 3rd level or lower.",
    "zh-CN": "触碰盟友，使其攻击和属性检定获得一个 d3 加值，持续 10 分钟；或恢复一个已消耗的三环或更低环阶法术位。"
  },
  "sheetPlay.resourceName.sub_infectious_fury": {
    "en": "Infectious Fury",
    "zh-CN": "狂怒传染"
  },
  "sheetDialog.resourceHelp.sub_infectious_fury": {
    "en": "A natural-weapon hit forces a Wisdom save: the target either attacks a creature of the barbarian's choice or takes 2d12 psychic damage.",
    "zh-CN": "天生武器命中时，目标进行感知豁免；失败后，目标攻击野蛮人指定的生物，或受到 2d12 心灵伤害。"
  },
  "sheetPlay.resourceName.sub_call_the_hunt": {
    "en": "Call the Hunt",
    "zh-CN": "狩猎号召"
  },
  "sheetDialog.resourceHelp.sub_call_the_hunt": {
    "en": "A bonus action when raging: up to five allies each add a weapon damage die to one hit per turn, and the barbarian gains 5 temporary hit points per ally who accepts.",
    "zh-CN": "狂暴时消耗一个附赠动作：至多五名盟友每回合的一次命中可额外造成一个武器伤害骰的伤害；每有一名盟友接受号召，野蛮人获得 5 点临时生命值。"
  },
  "sheetPlay.resourceName.sub_hexblades_curse": {
    "en": "Hexblade's Curse",
    "zh-CN": "咒剑诅咒"
  },
  "sheetDialog.resourceHelp.sub_hexblades_curse": {
    "en": "A bonus action cursing a creature for 1 minute: bonus damage equal to the warlock's proficiency bonus, critical hits on a 19 or 20 against it, and hit points back when it dies.",
    "zh-CN": "消耗一个附赠动作，诅咒一个生物 1 分钟：对其额外造成等于邪术师熟练加值的伤害，攻击掷出 19 或 20 时重击，并在其死亡时恢复生命值。"
  },
  "sheetPlay.resourceName.sub_fey_presence": {
    "en": "Fey Presence",
    "zh-CN": "妖精威仪"
  },
  "sheetDialog.resourceHelp.sub_fey_presence": {
    "en": "An action charming or frightening every creature in a 10-foot cube that fails a Wisdom save, until the end of the warlock's next turn.",
    "zh-CN": "消耗一个动作，使 10 英尺立方区域内感知豁免失败的生物被魅惑或陷入恐慌，持续至邪术师的下一回合结束。"
  },
  "sheetPlay.resourceName.sub_misty_escape": {
    "en": "Misty Escape",
    "zh-CN": "迷雾遁逃"
  },
  "sheetDialog.resourceHelp.sub_misty_escape": {
    "en": "A reaction on taking damage that turns the warlock invisible and teleports them 60 feet.",
    "zh-CN": "受到伤害时消耗一个反应，使邪术师隐形并传送 60 英尺。"
  },
  "sheetPlay.resourceName.sub_entropic_ward": {
    "en": "Entropic Ward",
    "zh-CN": "熵能守护"
  },
  "sheetDialog.resourceHelp.sub_entropic_ward": {
    "en": "A reaction imposing disadvantage on an attack; if it then misses, the warlock has advantage on their next attack against that creature.",
    "zh-CN": "消耗一个反应，使一次攻击具有劣势；若该攻击未命中，邪术师下一次对该生物的攻击具有优势。"
  },
  "sheetPlay.resourceName.sub_healing_light": {
    "en": "Healing Light",
    "zh-CN": "治愈之光"
  },
  "sheetDialog.resourceHelp.sub_healing_light": {
    "en": "A pool of d6s equal to 1 + the warlock's level. Spend up to their Charisma modifier of them as a bonus action to heal a creature within 60 feet.",
    "zh-CN": "拥有等于 1 + 邪术师等级数量的 d6 骰池。用一个附赠动作消耗至多等于魅力调整值数量的骰，为 60 英尺内生物恢复生命值。"
  },
  "sheetPlay.resourceName.sub_searing_vengeance": {
    "en": "Searing Vengeance",
    "zh-CN": "灼热复仇"
  },
  "sheetDialog.resourceHelp.sub_searing_vengeance": {
    "en": "Instead of rolling a death save, rise at half hit points, blinding enemies within 30 feet and dealing 2d8 + Charisma radiant damage to them.",
    "zh-CN": "以复仇代替死亡豁免：恢复至生命值上限的一半并起身，使 30 英尺内敌人目盲，并对其造成 2d8 + 魅力调整值的光耀伤害。"
  },
  "sheetPlay.resourceName.sub_accursed_specter": {
    "en": "Accursed Specter",
    "zh-CN": "受诅幽魂"
  },
  "sheetDialog.resourceHelp.sub_accursed_specter": {
    "en": "A humanoid the warlock kills rises as an obedient specter with extra temporary hit points until the next long rest.",
    "zh-CN": "邪术师杀死的一个类人生物化为服从命令的幽魂，获得额外临时生命值，持续至下次长休。"
  },
  "sheetPlay.resourceName.sub_tentacle_of_the_deep": {
    "en": "Tentacle of the Deep",
    "zh-CN": "深海触须"
  },
  "sheetDialog.resourceHelp.sub_tentacle_of_the_deep": {
    "en": "A bonus action summoning a spectral tentacle for 1 minute: a 10-foot reach attack for 1d8 cold damage that also halves the target's speed.",
    "zh-CN": "消耗一个附赠动作，召出幽灵触须，持续 1 分钟。触须可攻击 10 英尺内目标，造成 1d8 寒冷伤害，并使目标速度减半。"
  },
  "sheetPlay.resourceName.sub_fathomless_plunge": {
    "en": "Fathomless Plunge",
    "zh-CN": "深海潜遁"
  },
  "sheetDialog.resourceHelp.sub_fathomless_plunge": {
    "en": "Teleport the warlock and up to five willing creatures to a body of water within a mile.",
    "zh-CN": "将邪术师及至多五个自愿生物传送至一英里内的一片水域。"
  },
  "sheetPlay.resourceName.sub_form_of_dread": {
    "en": "Form of Dread",
    "zh-CN": "恐怖形态"
  },
  "sheetDialog.resourceHelp.sub_form_of_dread": {
    "en": "A bonus action for 1 minute: 1d10 + warlock level temporary hit points, immunity to being frightened, and one creature hit each turn is frightened on a failed Wisdom save.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟：获得 1d10 + 邪术师等级的临时生命值，免疫恐慌；每回合可使一个被命中的生物进行感知豁免，失败则陷入恐慌。"
  },
  "sheetPlay.resourceName.sub_necrotic_husk": {
    "en": "Necrotic Husk",
    "zh-CN": "黯蚀躯壳"
  },
  "sheetDialog.resourceHelp.sub_necrotic_husk": {
    "en": "Instead of dropping to 0 hit points, stay at 1 and deal necrotic damage equal to the warlock's level to each creature within 30 feet.",
    "zh-CN": "生命值本应降至 0 时，改为保留 1 点，并对 30 英尺内的每个生物造成等于邪术师等级的黯蚀伤害。"
  },
  "sheetPlay.resourceName.sub_spirit_projection": {
    "en": "Spirit Projection",
    "zh-CN": "灵体投射"
  },
  "sheetDialog.resourceHelp.sub_spirit_projection": {
    "en": "An hour of spirit form: resistance to most damage, movement through solid matter, and necrotic and psychic spell damage that heals the warlock.",
    "zh-CN": "进入灵体形态 1 小时：对多数伤害具有抗性，可穿过实体物质，造成的黯蚀和心灵法术伤害可治疗邪术师。"
  },
  "sheetPlay.resourceName.sub_defy_death": {
    "en": "Defy Death",
    "zh-CN": "抗拒死亡"
  },
  "sheetDialog.resourceHelp.sub_defy_death": {
    "en": "Regain 1d8 + Constitution modifier hit points on succeeding at a death save or stabilizing a creature.",
    "zh-CN": "死亡豁免成功或使一个生物伤势稳定时，恢复 1d8 + 体质调整值的生命值。"
  },
  "sheetPlay.resourceName.sub_indestructible_life": {
    "en": "Indestructible Life",
    "zh-CN": "不灭生命"
  },
  "sheetDialog.resourceHelp.sub_indestructible_life": {
    "en": "A bonus action healing 1d8 + warlock level and reattaching severed body parts.",
    "zh-CN": "消耗一个附赠动作，恢复 1d8 + 邪术师等级的生命值，并接回断肢。"
  },
  "sheetPlay.resourceName.sub_genies_vessel": {
    "en": "Bottled Respite",
    "zh-CN": "瓶中小憩"
  },
  "sheetDialog.resourceHelp.sub_genies_vessel": {
    "en": "Retreat inside the vessel for up to 10 minutes; from 10th level up to five companions come too and gain temporary hit points on a short rest inside.",
    "zh-CN": "进入容器内休息，至多 10 分钟。从 10 级起，可携带至多五名同伴，其在容器内短休时获得临时生命值。"
  },
  "sheetPlay.resourceName.sub_limited_wish": {
    "en": "Limited Wish",
    "zh-CN": "有限祈愿"
  },
  "sheetDialog.resourceHelp.sub_limited_wish": {
    "en": "Replicate any spell of 6th level or lower without components. In the fiction this needs several days to recharge, so grant it sparingly.",
    "zh-CN": "复制任意六环或更低环阶法术，无需施法成分。故事中需要数天才能恢复使用，应由地下城主谨慎授予。"
  },
  "sheetPlay.resourceName.sub_tides_of_chaos": {
    "en": "Tides of Chaos",
    "zh-CN": "混沌潮汐"
  },
  "sheetDialog.resourceHelp.sub_tides_of_chaos": {
    "en": "Advantage on one attack, ability check or saving throw. The DM may trigger a Wild Magic Surge afterwards to restore the use.",
    "zh-CN": "使一次攻击、属性检定或豁免具有优势。之后地下城主可触发一次狂野魔法浪涌，恢复该使用次数。"
  },
  "sheetPlay.resourceName.sub_favored_by_the_gods": {
    "en": "Favored by the Gods",
    "zh-CN": "众神眷顾"
  },
  "sheetDialog.resourceHelp.sub_favored_by_the_gods": {
    "en": "Add 2d4 to a failed saving throw or a missed attack, possibly turning it into a success.",
    "zh-CN": "为一次失败的豁免或未命中的攻击增加 2d4，可能使其转为成功。"
  },
  "sheetPlay.resourceName.sub_unearthly_recovery": {
    "en": "Unearthly Recovery",
    "zh-CN": "超凡复原"
  },
  "sheetDialog.resourceHelp.sub_unearthly_recovery": {
    "en": "A bonus action at half hit points or less, restoring hit points equal to half the sorcerer's maximum.",
    "zh-CN": "生命值不超过上限一半时，消耗一个附赠动作，恢复等于术士生命值上限一半的生命值。"
  },
  "sheetPlay.resourceName.sub_strength_of_the_grave": {
    "en": "Strength of the Grave",
    "zh-CN": "坟墓之力"
  },
  "sheetDialog.resourceHelp.sub_strength_of_the_grave": {
    "en": "A Charisma save against 5 + the damage leaves the sorcerer at 1 hit point instead of 0.",
    "zh-CN": "进行难度为 5 + 所受伤害的魅力豁免；成功时生命值保留为 1，而非降至 0。"
  },
  "sheetPlay.resourceName.sub_restore_balance": {
    "en": "Restore Balance",
    "zh-CN": "恢复平衡"
  },
  "sheetDialog.resourceHelp.sub_restore_balance": {
    "en": "A reaction cancelling advantage or disadvantage on a roll by a creature within 60 feet.",
    "zh-CN": "消耗一个反应，取消 60 英尺内生物一次掷骰的优势或劣势。"
  },
  "sheetPlay.resourceName.sub_trance_of_order": {
    "en": "Trance of Order",
    "zh-CN": "秩序恍惚"
  },
  "sheetDialog.resourceHelp.sub_trance_of_order": {
    "en": "A minute during which attacks against the sorcerer cannot have advantage and any d20 of 9 or lower counts as a 10 on their attacks, checks and saves.",
    "zh-CN": "持续 1 分钟：针对术士的攻击无法具有优势；术士攻击、检定和豁免中 d20 掷出 9 或更低时，结果视为 10。"
  },
  "sheetPlay.resourceName.sub_clockwork_cavalcade": {
    "en": "Clockwork Cavalcade",
    "zh-CN": "发条巡游"
  },
  "sheetDialog.resourceHelp.sub_clockwork_cavalcade": {
    "en": "A 30-foot cube healing 100 hit points among creatures in it, ending spells of 6th level or lower and repairing objects.",
    "zh-CN": "在 30 英尺立方区域内，为生物分配共计 100 点治疗，结束六环或更低环阶法术，并修复物体。"
  },
  "sheetPlay.resourceName.sub_warping_implosion": {
    "en": "Warping Implosion",
    "zh-CN": "扭曲内爆"
  },
  "sheetDialog.resourceHelp.sub_warping_implosion": {
    "en": "Teleport 120 feet, pulling creatures toward the vacated space for 3d10 force damage on a failed Strength save.",
    "zh-CN": "传送 120 英尺，将生物拉向原先位置；力量豁免失败者受到 3d10 力场伤害。"
  },
  "sheetPlay.resourceName.sub_lunar_phenomenon": {
    "en": "Lunar Phenomenon",
    "zh-CN": "月相奇观"
  },
  "sheetDialog.resourceHelp.sub_lunar_phenomenon": {
    "en": "A 30-foot burst matching the current moon phase: healing, blinding radiance or a burst of speed.",
    "zh-CN": "在 30 英尺范围内释放与当前月相对应的效果：治疗、致盲光辉或加速爆发。"
  },
  "sheetPlay.resourceName.sub_portent": {
    "en": "Portent Dice",
    "zh-CN": "预兆骰"
  },
  "sheetDialog.resourceHelp.sub_portent": {
    "en": "Rolled after each long rest and kept as fixed numbers. Spend one to replace the result of an attack, check or save by the wizard or a creature they can see, declared before the roll.",
    "zh-CN": "每次长休后掷骰，将结果保存为固定数值。掷骰前宣布消耗其中一个，替换法师或其可见生物的一次攻击、检定或豁免结果。"
  },
  "sheetPlay.resourceName.sub_illusory_self": {
    "en": "Illusory Self",
    "zh-CN": "幻象分身"
  },
  "sheetDialog.resourceHelp.sub_illusory_self": {
    "en": "A reaction interposing an illusory duplicate so an attack that would hit misses instead.",
    "zh-CN": "消耗一个反应，以幻象分身挡下攻击，使原本会命中的攻击未命中。"
  },
  "sheetPlay.resourceName.sub_instinctive_charm": {
    "en": "Instinctive Charm",
    "zh-CN": "本能魅惑"
  },
  "sheetDialog.resourceHelp.sub_instinctive_charm": {
    "en": "A reaction redirecting an attack aimed at the wizard onto another creature within the attacker's reach, on a failed Wisdom save.",
    "zh-CN": "消耗一个反应，使攻击者进行感知豁免；失败则将针对法师的攻击转移至攻击者触及范围内的另一生物。"
  },
  "sheetPlay.resourceName.sub_hypnotic_gaze": {
    "en": "Hypnotic Gaze",
    "zh-CN": "催眠凝视"
  },
  "sheetDialog.resourceHelp.sub_hypnotic_gaze": {
    "en": "An action charming and incapacitating a creature within 5 feet until the end of the wizard's next turn, extendable each turn as an action.",
    "zh-CN": "消耗一个动作，使 5 英尺内生物被魅惑且失能，持续至法师的下一回合结束；每回合可再消耗一个动作延长效果。"
  },
  "sheetPlay.resourceName.sub_benign_transposition": {
    "en": "Benign Transposition",
    "zh-CN": "良性移位"
  },
  "sheetDialog.resourceHelp.sub_benign_transposition": {
    "en": "Teleport 30 feet or swap places with a willing creature. Also recharges whenever the wizard casts a conjuration spell of 1st level or higher.",
    "zh-CN": "传送 30 英尺，或与自愿生物交换位置。每当法师施放一环或更高环阶的咒法学派法术时，也会恢复使用次数。"
  },
  "sheetPlay.resourceName.sub_shapechanger": {
    "en": "Shapechanger",
    "zh-CN": "变形者"
  },
  "sheetDialog.resourceHelp.sub_shapechanger": {
    "en": "A free self-polymorph into a beast of challenge rating 1 or lower, without a spell slot.",
    "zh-CN": "对自身施放变形术，化为挑战等级不超过 1 的野兽，无需消耗法术位。"
  },
  "sheetPlay.resourceName.sub_bladesong": {
    "en": "Bladesong",
    "zh-CN": "剑歌"
  },
  "sheetDialog.resourceHelp.sub_bladesong": {
    "en": "A bonus action for 1 minute: add the Intelligence modifier to AC, 10 feet of speed, advantage on Acrobatics, and a bonus on concentration saves. It ends if the wizard wears medium or heavy armor or a shield, or is incapacitated.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟：护甲等级增加智力调整值，速度增加 10 英尺，特技检定具有优势，专注豁免获得加值。穿戴中型或重型护甲、持盾或失能时结束。"
  },
  "sheetPlay.resourceName.sub_chronal_shift": {
    "en": "Chronal Shift",
    "zh-CN": "时序偏移"
  },
  "sheetDialog.resourceHelp.sub_chronal_shift": {
    "en": "A reaction forcing a creature within 30 feet to reroll an attack, check or save, before or after the result is known.",
    "zh-CN": "消耗一个反应，迫使 30 英尺内生物重掷一次攻击、检定或豁免，可在得知结果前或后使用。"
  },
  "sheetPlay.resourceName.sub_momentary_stasis": {
    "en": "Momentary Stasis",
    "zh-CN": "瞬时静止"
  },
  "sheetDialog.resourceHelp.sub_momentary_stasis": {
    "en": "A Large or smaller creature within 60 feet is incapacitated and frozen in time until the end of the wizard's next turn on a failed Constitution save.",
    "zh-CN": "使 60 英尺内的大型或更小生物进行体质豁免；失败者失能，时间被冻结，持续至法师的下一回合结束。"
  },
  "sheetPlay.resourceName.sub_arcane_abeyance": {
    "en": "Arcane Abeyance",
    "zh-CN": "奥术暂存"
  },
  "sheetDialog.resourceHelp.sub_arcane_abeyance": {
    "en": "Store a spell of 4th level or lower in a bead that any creature can break to cast it, using the wizard's spellcasting numbers.",
    "zh-CN": "将四环或更低环阶法术储存在珠子内。任何生物都可打碎珠子，按法师的施法数值施放该法术。"
  },
  "sheetPlay.resourceName.sub_violent_attraction": {
    "en": "Violent Attraction",
    "zh-CN": "强烈引力"
  },
  "sheetDialog.resourceHelp.sub_violent_attraction": {
    "en": "A reaction adding 1d10 to a weapon damage roll or 2d10 per 10 feet to falling damage within 60 feet.",
    "zh-CN": "消耗一个反应，为 60 英尺内的一次武器伤害掷骰增加 1d10，或为坠落伤害每 10 英尺增加 2d10。"
  },
  "sheetPlay.resourceName.sub_event_horizon": {
    "en": "Event Horizon",
    "zh-CN": "事件视界"
  },
  "sheetDialog.resourceHelp.sub_event_horizon": {
    "en": "A minute of crushing gravity in a 30-foot radius: 2d10 force damage and no movement on a failed Strength save. A 4th-level slot buys extra uses.",
    "zh-CN": "在半径 30 英尺内施加重力，持续 1 分钟。力量豁免失败者受到 2d10 力场伤害且无法移动。可消耗四环法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_manifest_mind": {
    "en": "Manifest Mind",
    "zh-CN": "心智显现"
  },
  "sheetDialog.resourceHelp.sub_manifest_mind": {
    "en": "A bonus action projecting the spellbook's spirit up to 300 feet, letting the wizard cast from its position. A spell slot buys extra uses.",
    "zh-CN": "消耗一个附赠动作，将法术书的精魂投射至 300 英尺内，法师可从其位置施法。可消耗法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_master_scrivener": {
    "en": "Master Scrivener",
    "zh-CN": "抄写大师"
  },
  "sheetDialog.resourceHelp.sub_master_scrivener": {
    "en": "After a long rest, create a spell scroll of a 1st or 2nd-level spell from the book, cast at maximum effect.",
    "zh-CN": "长休后，将法术书中的一个一环或二环法术制成卷轴，以最大效果施放。"
  },
  "sheetPlay.resourceName.sub_one_with_the_word": {
    "en": "One with the Word",
    "zh-CN": "与书合一"
  },
  "sheetDialog.resourceHelp.sub_one_with_the_word": {
    "en": "Avoid death by destroying the book's magic, which then takes days of study to rebuild.",
    "zh-CN": "摧毁法术书的魔力以免于死亡；之后需要数天的研习才能重建魔力。"
  },
  "sheetPlay.resourceName.sub_hunters_sense": {
    "en": "Hunter's Sense",
    "zh-CN": "猎人感知"
  },
  "sheetDialog.resourceHelp.sub_hunters_sense": {
    "en": "An action revealing a creature's damage immunities, resistances and vulnerabilities, or that it has none.",
    "zh-CN": "消耗一个动作，获知一个生物的伤害免疫、抗性和易伤，或确认它不具有这些能力。"
  },
  "sheetPlay.resourceName.sub_magic_users_nemesis": {
    "en": "Magic-User's Nemesis",
    "zh-CN": "施法者克星"
  },
  "sheetDialog.resourceHelp.sub_magic_users_nemesis": {
    "en": "A reaction forcing a caster or teleporter within 60 feet to make a Wisdom save or lose the spell and the action.",
    "zh-CN": "消耗一个反应，迫使 60 英尺内施法或传送的生物进行感知豁免；失败则失去法术和该动作。"
  },
  "sheetPlay.resourceName.sub_ethereal_step": {
    "en": "Ethereal Step",
    "zh-CN": "以太步伐"
  },
  "sheetDialog.resourceHelp.sub_ethereal_step": {
    "en": "A bonus-action etherealness lasting a single turn.",
    "zh-CN": "消耗一个附赠动作，进入以太化状态，持续一个回合。"
  },
  "sheetPlay.resourceName.sub_detect_portal": {
    "en": "Detect Portal",
    "zh-CN": "侦测传送门"
  },
  "sheetDialog.resourceHelp.sub_detect_portal": {
    "en": "Sense the distance and direction to the closest planar portal within a mile.",
    "zh-CN": "感知一英里内最近位面传送门的距离和方向。"
  },
  "sheetPlay.resourceName.sub_writhing_tide": {
    "en": "Writhing Tide",
    "zh-CN": "翻涌虫潮"
  },
  "sheetDialog.resourceHelp.sub_writhing_tide": {
    "en": "A bonus action granting a 10-foot flying speed for 1 minute, carried by the swarm.",
    "zh-CN": "消耗一个附赠动作，由虫群托举，获得 10 英尺飞行速度，持续 1 分钟。"
  },
  "sheetPlay.resourceName.sub_swarming_dispersal": {
    "en": "Swarming Dispersal",
    "zh-CN": "虫群散逸"
  },
  "sheetDialog.resourceHelp.sub_swarming_dispersal": {
    "en": "A reaction granting resistance to the damage just taken and teleporting the ranger 30 feet.",
    "zh-CN": "消耗一个反应，对刚刚受到的伤害具有抗性，并将游侠传送 30 英尺。"
  },
  "sheetPlay.resourceName.sub_misty_wanderer": {
    "en": "Misty Wanderer",
    "zh-CN": "迷雾漫游者"
  },
  "sheetDialog.resourceHelp.sub_misty_wanderer": {
    "en": "A free misty step that can bring one willing creature within 5 feet along.",
    "zh-CN": "施放迷雾步，无需消耗法术位，并可携带 5 英尺内的一个自愿生物。"
  },
  "sheetPlay.resourceName.sub_fey_reinforcements": {
    "en": "Fey Reinforcements",
    "zh-CN": "妖精援军"
  },
  "sheetDialog.resourceHelp.sub_fey_reinforcements": {
    "en": "A free casting of summon fey without a spell slot; the summoned fey can turn invisible.",
    "zh-CN": "施放召唤妖精，无需消耗法术位；召出的妖精可以隐形。"
  },
  "sheetPlay.resourceName.sub_drake_companion": {
    "en": "Drake Companion",
    "zh-CN": "幼龙伙伴"
  },
  "sheetDialog.resourceHelp.sub_drake_companion": {
    "en": "Summon the bonded drake for an hour. It acts on the ranger's turn, adds their proficiency bonus to its rolls, and can be resummoned with a spell slot.",
    "zh-CN": "召出结契幼龙，持续 1 小时。它在游侠的回合行动，掷骰加入游侠的熟练加值，并可消耗法术位再次召唤。"
  },
  "sheetPlay.resourceName.sub_drakes_breath": {
    "en": "Drake's Breath",
    "zh-CN": "幼龙吐息"
  },
  "sheetDialog.resourceHelp.sub_drakes_breath": {
    "en": "The drake exhales a 30-foot cone for 8d6 of its damage type, halved on a Dexterity save. A 3rd-level slot buys extra uses.",
    "zh-CN": "幼龙喷出 30 英尺锥形吐息，造成 8d6 对应类型的伤害，敏捷豁免成功则减半。可消耗三环法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_wails_from_the_grave": {
    "en": "Wails from the Grave",
    "zh-CN": "坟墓哀嚎"
  },
  "sheetDialog.resourceHelp.sub_wails_from_the_grave": {
    "en": "After a sneak attack, a second creature within 30 feet takes half the sneak attack dice in necrotic damage.",
    "zh-CN": "偷袭后，30 英尺内的第二个生物受到相当于一半偷袭骰的黯蚀伤害。"
  },
  "sheetPlay.resourceName.sub_ghost_walk": {
    "en": "Ghost Walk",
    "zh-CN": "幽魂漫步"
  },
  "sheetDialog.resourceHelp.sub_ghost_walk": {
    "en": "A bonus action granting 10 minutes of spectral form: a 10-foot fly speed and movement through creatures and objects. A soul trinket buys extra uses.",
    "zh-CN": "消耗一个附赠动作，进入幽灵形态 10 分钟：获得 10 英尺飞行速度，并可穿过生物和物体。可消耗灵魂饰物获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_psychic_veil": {
    "en": "Psychic Veil",
    "zh-CN": "心灵帷幕"
  },
  "sheetDialog.resourceHelp.sub_psychic_veil": {
    "en": "An hour of invisibility, ending early if the rogue deals damage or forces a saving throw. A Psionic Energy die buys extra uses.",
    "zh-CN": "隐形 1 小时；游荡者造成伤害或迫使他人进行豁免时提前结束。可消耗一个灵能骰获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_rend_mind": {
    "en": "Rend Mind",
    "zh-CN": "撕裂心智"
  },
  "sheetDialog.resourceHelp.sub_rend_mind": {
    "en": "A sneak attack with Psychic Blades stuns a creature for 1 minute on a failed Wisdom save. Three Psionic Energy dice buy extra uses.",
    "zh-CN": "用心灵之刃偷袭时，目标进行感知豁免；失败则震慑 1 分钟。可消耗三个灵能骰获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_spell_thief": {
    "en": "Spell Thief",
    "zh-CN": "法术窃贼"
  },
  "sheetDialog.resourceHelp.sub_spell_thief": {
    "en": "A reaction stealing a spell cast at the rogue on a failed save by the caster, denying it to them for 8 hours and letting the rogue cast it once.",
    "zh-CN": "消耗一个反应，偷取针对游荡者施放的法术；施法者豁免失败后，8 小时内无法施放该法术，游荡者则可施放一次。"
  },
  "sheetPlay.resourceName.sub_unerring_eye": {
    "en": "Unerring Eye",
    "zh-CN": "无误之眼"
  },
  "sheetDialog.resourceHelp.sub_unerring_eye": {
    "en": "An action sensing illusions, shapechangers and other magical deception within 30 feet, without learning what is hidden.",
    "zh-CN": "消耗一个动作，感知 30 英尺内的幻象、变形者和其他魔法欺骗，但不会揭示其中隐藏的内容。"
  },
  "sheetPlay.resourceName.sub_master_duelist": {
    "en": "Master Duelist",
    "zh-CN": "决斗大师"
  },
  "sheetDialog.resourceHelp.sub_master_duelist": {
    "en": "Reroll a missed attack, with advantage.",
    "zh-CN": "以优势重掷一次未命中的攻击。"
  },
  "sheetPlay.resourceName.sub_wholeness_of_body_mercy": {
    "en": "Hand of Ultimate Mercy",
    "zh-CN": "终极慈悲之手"
  },
  "sheetDialog.resourceHelp.sub_wholeness_of_body_mercy": {
    "en": "Spend 5 ki to return a creature dead no more than 24 hours to life with 4d10 + Wisdom hit points, free of every condition it died with.",
    "zh-CN": "消耗 5 点气，使死亡不超过 24 小时的生物复生，恢复 4d10 + 感知调整值的生命值，并解除其死亡时的所有状态。"
  },
  "sheetPlay.resourceName.sub_breath_of_the_dragon": {
    "en": "Breath of the Dragon",
    "zh-CN": "龙之吐息"
  },
  "sheetDialog.resourceHelp.sub_breath_of_the_dragon": {
    "en": "Replace one Attack-action attack with a 20-foot cone or 30-foot line dealing the martial arts die in the monk's chosen damage type, halved on a Dexterity save. Ki buys extra uses.",
    "zh-CN": "用吐息替换攻击动作中的一次攻击：20 英尺锥形或 30 英尺线形，造成武僧所选类型的一个武艺骰伤害，敏捷豁免成功则减半。可消耗气点获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_wings_unfurled": {
    "en": "Wings Unfurled",
    "zh-CN": "展翼"
  },
  "sheetDialog.resourceHelp.sub_wings_unfurled": {
    "en": "While airborne, gain a flying speed equal to the walking speed for that turn.",
    "zh-CN": "在空中时，获得等于步行速度的飞行速度，持续该回合。"
  },
  "sheetPlay.resourceName.sub_aspect_of_the_wyrm": {
    "en": "Aspect of the Wyrm",
    "zh-CN": "巨龙法相"
  },
  "sheetDialog.resourceHelp.sub_aspect_of_the_wyrm": {
    "en": "A bonus action raising a 10-foot aura for 1 minute that either frightens enemies or grants allies resistance to the monk's damage type. Three ki buys extra uses.",
    "zh-CN": "消耗一个附赠动作，展开 10 英尺灵光，持续 1 分钟：使敌人恐慌，或使盟友对武僧的伤害类型具有抗性。可消耗三个气点获得额外使用次数。"
  },
  "sheetPlay.resourceName.sub_glorious_defense": {
    "en": "Glorious Defense",
    "zh-CN": "荣耀防御"
  },
  "sheetDialog.resourceHelp.sub_glorious_defense": {
    "en": "A reaction adding the paladin's Charisma modifier to the AC of themselves or an ally within 10 feet; if the attack then misses, they may attack the attacker.",
    "zh-CN": "消耗一个反应，为圣武士自身或 10 英尺内盟友的护甲等级增加圣武士的魅力调整值；若攻击因此未命中，可反击攻击者。"
  },
  "sheetPlay.resourceName.sub_undying_sentinel": {
    "en": "Undying Sentinel",
    "zh-CN": "不死哨兵"
  },
  "sheetDialog.resourceHelp.sub_undying_sentinel": {
    "en": "Triggers on its own: drop to 1 hit point instead of 0.",
    "zh-CN": "自动触发：生命值保留为 1，而非降至 0。"
  },
  "sheetPlay.resourceName.race_stones_endurance": {
    "en": "Stone's Endurance",
    "zh-CN": "石之坚韧"
  },
  "sheetDialog.resourceHelp.race_stones_endurance": {
    "en": "A reaction reducing incoming damage by 1d12 + the goliath's Constitution modifier.",
    "zh-CN": "消耗一个反应，将即将受到的伤害减少 1d12 + 歌利亚的体质调整值。"
  },
  "sheetPlay.resourceName.race_healing_hands": {
    "en": "Healing Hands",
    "zh-CN": "治愈之手"
  },
  "sheetDialog.resourceHelp.race_healing_hands": {
    "en": "Touch a creature to restore hit points equal to the aasimar's level.",
    "zh-CN": "触碰一个生物，为其恢复等于阿斯莫等级的生命值。"
  },
  "sheetPlay.resourceName.race_celestial_revelation": {
    "en": "Celestial Revelation",
    "zh-CN": "天界显现"
  },
  "sheetDialog.resourceHelp.race_celestial_revelation": {
    "en": "A minute of transformation from 3rd level: spectral wings granting flight, and extra radiant damage once per turn.",
    "zh-CN": "从 3 级起，可变身 1 分钟：幽灵翅膀赋予飞行能力，每回合可额外造成一次光耀伤害。"
  },
  "sheetPlay.resourceName.race_hidden_step": {
    "en": "Hidden Step",
    "zh-CN": "隐秘步伐"
  },
  "sheetDialog.resourceHelp.race_hidden_step": {
    "en": "A bonus action turning the firbolg invisible until the start of their next turn, or until they attack, cast or force a save.",
    "zh-CN": "消耗一个附赠动作，使菲尔伯格隐形，持续至其下一回合开始；攻击、施法或迫使他人进行豁免时提前结束。"
  },
  "sheetPlay.resourceName.race_firbolg_magic": {
    "en": "Firbolg Magic",
    "zh-CN": "菲尔博格魔法"
  },
  "sheetDialog.resourceHelp.race_firbolg_magic": {
    "en": "A free casting of detect magic or disguise self, using Wisdom, without a slot. Disguise self can change the firbolg's size between Medium and Small.",
    "zh-CN": "以感知为施法属性施放侦测魔法或自我伪装，无需法术位。自我伪装可将菲尔伯格的体型在中型和小型之间改变。"
  },
  "sheetPlay.resourceName.race_fury_of_the_small": {
    "en": "Fury of the Small",
    "zh-CN": "小者之怒"
  },
  "sheetDialog.resourceHelp.race_fury_of_the_small": {
    "en": "Extra damage equal to the goblin's level on a hit against a creature larger than them.",
    "zh-CN": "命中体型比自身更大的生物时，额外造成等于哥布林等级的伤害。"
  },
  "sheetPlay.resourceName.race_hungry_jaws": {
    "en": "Hungry Jaws",
    "zh-CN": "饥渴巨颚"
  },
  "sheetDialog.resourceHelp.race_hungry_jaws": {
    "en": "A bonus-action bite that, on a hit, also grants temporary hit points equal to the lizardfolk's Constitution modifier.",
    "zh-CN": "消耗一个附赠动作啮咬，命中时还获得等于蜥蜴人体质调整值的临时生命值。"
  },
  "sheetPlay.resourceName.race_genasi_magic": {
    "en": "Elemental Legacy",
    "zh-CN": "元素传承"
  },
  "sheetDialog.resourceHelp.race_genasi_magic": {
    "en": "The genasi's inherited spell, cast without a slot: burning hands, create or destroy water, levitate or pass without trace depending on their element. The matching cantrip is at will and does not use this counter.",
    "zh-CN": "施放元素裔继承的法术，无需法术位：根据元素，施放燃烧之手、造水或毁水、浮空术或无踪行走。对应的戏法可任意施放，不消耗该计数。"
  },
  "sheetPlay.resourceName.art_flash_of_genius": {
    "en": "Flash of Genius",
    "zh-CN": "灵光一闪"
  },
  "sheetDialog.resourceHelp.art_flash_of_genius": {
    "en": "A reaction adding the artificer's Intelligence modifier to an ability check or saving throw by them or an ally within 30 feet.",
    "zh-CN": "消耗一个反应，为奇械师自身或 30 英尺内盟友的一次属性检定或豁免增加奇械师的智力调整值。"
  },
  "sheetPlay.resourceName.art_right_tool": {
    "en": "The Right Tool for the Job",
    "zh-CN": "得心应手的工具"
  },
  "sheetDialog.resourceHelp.art_right_tool": {
    "en": "An hour with tinker's tools conjures any set of artisan's tools needed, lasting until the next use.",
    "zh-CN": "花费 1 小时使用修理工具，召出所需的一套工匠工具，持续至下次使用该能力。"
  },
  "sheetPlay.resourceName.art_experimental_elixir": {
    "en": "Experimental Elixir",
    "zh-CN": "实验灵药"
  },
  "sheetDialog.resourceHelp.art_experimental_elixir": {
    "en": "Elixirs brewed on a long rest, each with a random effect: healing, swiftness, resilience, boldness, flight or transformation. Extra elixirs can be brewed by spending a spell slot.",
    "zh-CN": "长休时酿制灵药，各具有一种随机效果：治疗、迅捷、韧性、勇气、飞行或变形。可消耗法术位酿制额外灵药。"
  },
  "sheetPlay.resourceName.art_eldritch_cannon": {
    "en": "Eldritch Cannon",
    "zh-CN": "魔能炮"
  },
  "sheetDialog.resourceHelp.art_eldritch_cannon": {
    "en": "A bonus action builds a flamethrower, force ballista or protector cannon that acts on the artificer's command. A spell slot buys extra uses.",
    "zh-CN": "消耗一个附赠动作，建造喷火器、力场弩炮或防护炮，按奇械师的指挥行动。可消耗法术位获得额外使用次数。"
  },
  "sheetPlay.resourceName.art_spell_storing_item": {
    "en": "Spell-Storing Item",
    "zh-CN": "储法物品"
  },
  "sheetDialog.resourceHelp.art_spell_storing_item": {
    "en": "After a long rest, store a 1st or 2nd-level artificer spell in an item; the holder can cast it twice the artificer's Intelligence modifier in times.",
    "zh-CN": "长休后，将一个一环或二环奇械师法术储存在物品中。持有者可施放的次数为奇械师智力调整值的两倍。"
  },
  "sheetPlay.resourceName.art_arcane_jolt": {
    "en": "Arcane Jolt",
    "zh-CN": "奥术震击"
  },
  "sheetDialog.resourceHelp.art_arcane_jolt": {
    "en": "Once per turn, a magic-weapon or Steel Defender hit deals an extra 2d6 force damage, or heals a creature within 30 feet 2d6. Rises to 4d6 at 15th level.",
    "zh-CN": "每回合一次，魔法武器或钢铁守卫命中时，额外造成 2d6 力场伤害，或为 30 英尺内生物恢复 2d6 生命值。15 级时提升至 4d6。"
  },
  "sheetPlay.resourceName.art_restorative_reagents": {
    "en": "Restorative Reagents",
    "zh-CN": "复原试剂"
  },
  "sheetDialog.resourceHelp.art_restorative_reagents": {
    "en": "Free castings of lesser restoration without a spell slot.",
    "zh-CN": "施放次级复原术，无需消耗法术位。"
  },
  "sheetPlay.resourceName.sub_starry_form": {
    "en": "Starry Form",
    "zh-CN": "星辰形态"
  },
  "sheetDialog.resourceHelp.sub_starry_form": {
    "en": "A bonus action spends one Wild Shape use to take a starry form for 10 minutes: Archer (a bonus-action luminous arrow, resolved by the server), Chalice (healing spells also heal a second creature 1d8 + WIS), or Dragon (concentration saves treat a low d20 as a 10). Pass variant to choose; the constellation's mechanics apply automatically. This counter mirrors Wild Shape uses.",
    "zh-CN": "消耗一个附赠动作和一次荒野形态，变为星辰形态，持续 10 分钟：弓手可用附赠动作射出光箭；圣杯使治疗法术额外为第二个生物恢复 1d8 + 感知调整值的生命值；巨龙使专注豁免中较低的 d20 结果视为 10。选择星座后，其机制自动生效；该计数与荒野形态共享使用次数。"
  },
  "sheetPlay.resourceName.sub_embodiment_of_the_law": {
    "en": "Embodiment of the Law",
    "zh-CN": "律法化身"
  },
  "sheetDialog.resourceHelp.sub_embodiment_of_the_law": {
    "en": "Casting an enchantment spell of 1st level or higher as a bonus action instead of an action. Spend it with use_resource, then cast the spell with its own tool.",
    "zh-CN": "将一个一环或更高环阶惑控学派法术的施法动作改为附赠动作。先消耗该资源，再施放法术。"
  },
  "sheetPlay.resourceName.sub_cauterizing_flames": {
    "en": "Cauterizing Flames",
    "zh-CN": "灼疗之焰"
  },
  "sheetDialog.resourceHelp.sub_cauterizing_flames": {
    "en": "A reaction when a creature dies near the druid or the Wildfire Spirit: the flame heals an ally (variant 'heal', targetCharacterId) or burns an enemy (variant 'burn', targetEnemyId) for 2d10 + WIS. The server rolls and applies it.",
    "zh-CN": "德鲁伊或野火精魂附近有生物死亡时，可消耗一个反应，以火焰治疗盟友或灼烧敌人，数值为 2d10 + 感知调整值，自动掷骰并生效。"
  },
  "sheetPlay.resourceName.sub_unwavering_mark": {
    "en": "Unwavering Mark",
    "zh-CN": "坚定印记"
  },
  "sheetDialog.resourceHelp.sub_unwavering_mark": {
    "en": "The bonus-action attack against a marked creature that attacked someone else; the mark itself the server lays on every melee hit.",
    "zh-CN": "对攻击过他人的受标记生物进行一次附赠动作攻击；每次近战命中都会自动施加标记。"
  },
  "sheetPlay.resourceName.sub_bulwark_of_force": {
    "en": "Bulwark of Force",
    "zh-CN": "力场壁垒"
  },
  "sheetDialog.resourceHelp.sub_bulwark_of_force": {
    "en": "A bonus action: the psi warrior and up to INT-modifier allies within 30 feet gain half cover (+2 AC, +2 DEX saves) for a minute. Once per long rest, or by spending a Psionic Energy die. The server applies it.",
    "zh-CN": "消耗一个附赠动作，使灵能武士和 30 英尺内至多等于智力调整值数量的盟友获得半身掩护（护甲等级 +2、敏捷豁免 +2），持续 1 分钟。每次长休可使用一次，也可消耗一个灵能骰再次使用，效果自动施加。"
  },
  "sheetPlay.resourceName.sub_telekinetic_master": {
    "en": "Telekinetic Master",
    "zh-CN": "心灵遥控大师"
  },
  "sheetDialog.resourceHelp.sub_telekinetic_master": {
    "en": "Telekinesis once without a slot; while concentrating on it, a weapon attack as a bonus action (pc_attack bonusAttack 'feature').",
    "zh-CN": "施放心灵遥控一次，无需法术位；专注于该法术期间，可用附赠动作进行一次武器攻击。"
  },
  "sheetPlay.resourceName.sub_elder_champion": {
    "en": "Elder Champion",
    "zh-CN": "古老勇士"
  },
  "sheetDialog.resourceHelp.sub_elder_champion": {
    "en": "An action: for a minute, 10 hit points at the start of each turn and enemies within 10 feet save at disadvantage against the paladin's spells. The server applies both.",
    "zh-CN": "消耗一个动作，持续 1 分钟：每回合开始时恢复 10 点生命值；10 英尺内敌人对圣武士法术的豁免具有劣势。两种效果自动生效。"
  },
  "sheetPlay.resourceName.sub_avenging_angel": {
    "en": "Avenging Angel",
    "zh-CN": "复仇天使"
  },
  "sheetDialog.resourceHelp.sub_avenging_angel": {
    "en": "An action: for an hour, a 60-foot flying speed; enemies within 30 feet save (WIS) or are frightened, and attacks against the frightened have advantage. The server rolls the saves.",
    "zh-CN": "消耗一个动作，持续 1 小时：获得 60 英尺飞行速度；30 英尺内敌人进行感知豁免，失败则恐慌，针对恐慌者的攻击具有优势。豁免自动结算。"
  },
  "sheetPlay.resourceName.sub_invincible_conqueror": {
    "en": "Invincible Conqueror",
    "zh-CN": "无敌征服者"
  },
  "sheetDialog.resourceHelp.sub_invincible_conqueror": {
    "en": "An action: resistance to all damage for a minute (the server applies it); the extra attack and the 19-20 critical are narrated.",
    "zh-CN": "消耗一个动作，持续 1 分钟，对所有伤害具有抗性，自动生效；额外攻击和掷出 19–20 时重击由地下城主另行处理。"
  },
  "sheetPlay.resourceName.sub_living_legend": {
    "en": "Living Legend",
    "zh-CN": "活着的传奇"
  },
  "sheetDialog.resourceHelp.sub_living_legend": {
    "en": "A bonus action: advantage on Charisma checks for a minute (the server applies it); the reroll of a miss and the turned save are narrated.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟，魅力检定具有优势，自动生效；重掷未命中的攻击和改变豁免结果由地下城主另行处理。"
  },
  "sheetPlay.resourceName.sub_mortal_bulwark": {
    "en": "Mortal Bulwark",
    "zh-CN": "凡世壁垒"
  },
  "sheetDialog.resourceHelp.sub_mortal_bulwark": {
    "en": "A bonus action: truesight 120 feet and advantage on attacks against aberrations, celestials, elementals, fey and fiends for a minute. The server applies the advantage.",
    "zh-CN": "消耗一个附赠动作，持续 1 分钟：获得 120 英尺真实视觉，对异怪、天界生物、元素生物、妖精和邪魔的攻击具有优势。优势自动生效。"
  },
  "sheetPlay.resourceName.sub_exalted_champion": {
    "en": "Exalted Champion",
    "zh-CN": "崇高勇士"
  },
  "sheetDialog.resourceHelp.sub_exalted_champion": {
    "en": "An action: for an hour, resistance to nonmagical weapon damage and advantage on Wisdom saves. The server applies both to the paladin.",
    "zh-CN": "消耗一个动作，持续 1 小时，对非魔法武器伤害具有抗性，感知豁免具有优势。两种效果自动施加于圣武士。"
  },
  "sheetPlay.resourceName.sub_dread_lord": {
    "en": "Dread Lord",
    "zh-CN": "恐怖领主"
  },
  "sheetDialog.resourceHelp.sub_dread_lord": {
    "en": "An action: for a minute, attacks against the oathbreaker are at disadvantage, enemies starting a turn within 30 feet take 4d10 psychic, and a bonus-action spectral strike deals 4d10 psychic (pc_attack weapon \"Dread Lord's Shadows\"). The server applies all of it.",
    "zh-CN": "消耗一个动作，持续 1 分钟：针对破誓者的攻击具有劣势；在 30 英尺内开始回合的敌人受到 4d10 心灵伤害；还可用附赠动作进行幽影打击，造成 4d10 心灵伤害。所有效果自动生效。"
  },
  "sheetPlay.resourceName.sub_wind_soul": {
    "en": "Wind Soul",
    "zh-CN": "风之魂"
  },
  "sheetDialog.resourceHelp.sub_wind_soul": {
    "en": "An action: the sorcerer and up to 3 + CHA-modifier creatures within 30 feet gain a flying speed for an hour. The server marks them flying.",
    "zh-CN": "消耗一个动作，使术士及 30 英尺内至多 3 + 魅力调整值数量的生物获得飞行速度，持续 1 小时；飞行状态自动施加。"
  },
  "sheetPlay.resourceName.sub_elemental_gift": {
    "en": "Elemental Gift",
    "zh-CN": "元素赠礼"
  },
  "sheetDialog.resourceHelp.sub_elemental_gift": {
    "en": "A bonus action: a 30-foot flying speed for 10 minutes (use_resource 'Elemental Flight'). The resistance is chosen once with use_resource 'Elemental Gift' and the patron's type as the variant.",
    "zh-CN": "消耗一个附赠动作，获得 30 英尺飞行速度，持续 10 分钟。抗性在获得元素赠礼时按宗主类型选择一次，与飞行使用分开。"
  },
  "sheetPlay.resourceName.sub_defensive_field": {
    "en": "Defensive Field",
    "zh-CN": "防御力场"
  },
  "sheetDialog.resourceHelp.sub_defensive_field": {
    "en": "A bonus action in Guardian armor: temporary hit points equal to the artificer level (use_resource 'Defensive Field').",
    "zh-CN": "穿戴守护者护甲时，消耗一个附赠动作，获得等于奇械师等级的临时生命值。"
  },
  "sheetPlay.resourceName.sub_perfected_armor": {
    "en": "Perfected Armor",
    "zh-CN": "完美护甲"
  },
  "sheetDialog.resourceHelp.sub_perfected_armor": {
    "en": "A reaction in Guardian armor: a Large or smaller creature within 30 feet makes a Strength save or is pulled in and knocked prone. The server rolls it (use_reaction 'Perfected Armor').",
    "zh-CN": "穿戴守护者护甲时，消耗一个反应，使 30 英尺内的大型或更小生物进行力量豁免；失败者被拉近并倒地。豁免自动结算。"
  },
  "sheetPlay.resourceName.sub_arcane_ward": {
    "en": "Arcane Ward",
    "zh-CN": "奥术结界"
  },
  "sheetDialog.resourceHelp.sub_arcane_ward": {
    "en": "The ward's hit points: twice the wizard level plus the Intelligence modifier. The first abjuration spell of 1st level or higher after a long rest raises it at full strength, damage to the wizard lands on it first, and each later abjuration spell restores twice its level. The server keeps it; nobody spends it by hand.",
    "zh-CN": "结界生命值为法师等级的两倍 + 智力调整值。长休后首次施放一环或更高环阶防护学派法术时，以完整生命值建立结界；法师受到的伤害先由结界承担，之后每次施放防护法术，为结界恢复等于法术环阶两倍的生命值。结界自动维护，不能手动消耗。"
  },
  "sheetPlay.resourceName.sub_arcane_ward_raised": {
    "en": "Arcane Ward raised",
    "zh-CN": "奥术结界（已建立）"
  },
  "sheetDialog.resourceHelp.sub_arcane_ward_raised": {
    "en": "Whether the Arcane Ward has been raised since the last long rest (it is raised once a day, by the first abjuration spell of 1st level or higher). The server keeps it.",
    "zh-CN": "记录自上次长休以来是否已建立奥术结界。每天仅能通过首次施放一环或更高环阶防护学派法术建立一次；此状态自动维护。"
  }
});
