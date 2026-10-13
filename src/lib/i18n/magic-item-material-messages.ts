import { defineMessages } from "./catalog.ts";

// Original translations of SRD 5.1 item bodies and source headers. Whole source
// matching is for display; rulebook, inventory and engine data remain native.
export const MAGIC_ITEM_MATERIAL_MESSAGES = /*#__PURE__*/ defineMessages({
  "itemHelp.native.oil-of-etherealness": {
    "en": "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the *etherealness* spell for 1 hour.",
    "zh-CN": "这种浑浊灰油会在容器外凝成油珠，并迅速蒸发。油量足够涂覆一个中型或更小的生物及其穿戴、携带的装备；体型每比中型大一级，就需额外一瓶。涂油需要 10 分钟，随后该生物获得*以太化*法术的效果，持续 1 小时。"
  },
  "itemHelp.native.oil-of-sharpness": {
    "en": "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.",
    "zh-CN": "这种透明胶状油中闪烁着细小而极薄的银片。油量足够涂覆一件挥砍或穿刺武器，或至多 5 枚挥砍或穿刺弹药。涂油需要 1 分钟。接下来 1 小时内，涂油物品具有魔法，其攻击检定和伤害掷骰获得 +3 加值。"
  },
  "itemHelp.native.oil-of-slipperiness": {
    "en": "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a *freedom of movement* spell for 8 hours.\n\nAlternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the *grease* spell in that area for 8 hours.",
    "zh-CN": "这种黏稠黑色油膏在容器中厚重，倒出时却流得很快。油量足够涂覆一个中型或更小的生物及其穿戴、携带的装备；体型每比中型大一级，就需额外一瓶。涂油需要 10 分钟，随后该生物获得*行动自如*法术的效果，持续 8 小时。\n\n也可用一个动作将油倒在地面上，覆盖边长 10 英尺的正方形区域，使该区域产生*油腻术*的效果，持续 8 小时。"
  },
  "itemHelp.native.potion-of-animal-friendship": {
    "en": "When you drink this potion, you can cast the *animal friendship* spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.",
    "zh-CN": "饮用后，你可随意施放*动物友谊*法术，豁免难度为 13，持续 1 小时。晃动这种泥浊液体，会看到鱼鳞、蜂鸟舌头、猫爪或松鼠毛等小碎片。"
  },
  "itemHelp.native.potion-of-clairvoyance": {
    "en": "When you drink this potion, you gain the effect of the *clairvoyance* spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.",
    "zh-CN": "饮用后，你获得*千里感知*法术的效果。淡黄色液体中浮着一颗眼球，打开药水时它便消失。"
  },
  "itemHelp.native.potion-of-climbing": {
    "en": "When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.",
    "zh-CN": "饮用后，你获得等于步行速度的攀爬速度，持续 1 小时。在此期间，为攀爬而进行的力量（运动）检定具有优势。药水分成棕、银、灰三层，如同岩石的条带；摇晃瓶子也无法混合这些颜色。"
  },
  "itemHelp.native.potion-of-diminution": {
    "en": "When you drink this potion, you gain the \"reduce\" effect of the *enlarge/reduce* spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
    "zh-CN": "饮用后，你获得*变大或缩小*法术的“缩小”效果，持续 1d4 小时，无需专注。液体中的红色不断收缩为一颗小珠，随后扩散，将周围透明液体染红；摇晃瓶子也无法打断这个过程。"
  },
  "itemHelp.native.potion-of-flying": {
    "en": "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.",
    "zh-CN": "饮用后，你获得等于步行速度的飞行速度，并可悬浮，持续 1 小时。药效结束时，若你仍在空中且没有其他保持飞行的手段，就会坠落。透明药液浮在容器顶部，其中飘着云雾般的白色杂质。"
  },
  "itemHelp.native.potion-of-gaseous-form": {
    "en": "When you drink this potion, you gain the effect of the *gaseous form* spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.",
    "zh-CN": "饮用后，你获得*气化形体*法术的效果，持续 1 小时，无需专注；也可用附赠动作提前结束效果。容器里仿佛装着雾气，却像水一样流动并可倒出。"
  },
  "itemHelp.native.potion-of-giant-strength": {
    "en": "When you drink this potion, your Strength score changes for 1 hour. The type of giant determines the score (see the table below). The potion has no effect on you if your Strength is equal to or greater than that score.\n\nThis potion's transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The *potion of frost giant strength* and the *potion of stone giant strength* have the same effect.\n\n**Table- Potion of Giant Strength**\n\n| Type of Giant     | Strength | Rarity    |\n|-------------------|----------|-----------|\n| Hill giant        | 21       | Uncommon  |\n| Frost/stone giant | 23       | Rare      |\n| Fire giant        | 25       | Rare      |\n| Cloud giant       | 27       | Very rare |\n| Storm giant       | 29       | Legendary |\n|                   |          |           |",
    "zh-CN": "饮用后，你的力量值改变，持续 1 小时；数值由巨人的类型决定，见下表。若你的力量已等于或高于该数值，药水对你无效。\n\n透明药液中浮着对应巨人类型的一小片指甲。*霜巨人力量药水*和*石巨人力量药水*效果相同。\n\n**巨人力量药水表**\n\n| 巨人类型 | 力量 | 稀有度 |\n|----------|------|--------|\n| 山丘巨人 | 21 | 非普通 |\n| 霜巨人／石巨人 | 23 | 珍稀 |\n| 火巨人 | 25 | 珍稀 |\n| 云巨人 | 27 | 极珍稀 |\n| 风暴巨人 | 29 | 传奇 |"
  },
  "itemHelp.native.potion-of-growth": {
    "en": "When you drink this potion, you gain the \"enlarge\" effect of the *enlarge/reduce* spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.",
    "zh-CN": "饮用后，你获得*变大或缩小*法术的“变大”效果，持续 1d4 小时，无需专注。液体中的红色不断从一颗小珠扩散，将周围透明液体染红，随后又收缩；摇晃瓶子也无法打断这个过程。"
  },
  "itemHelp.native.potion-of-healing": {
    "en": "You regain hit points when you drink this potion. The number of hit points depends on the potion's rarity, as shown in the Potions of Healing table. Whatever its potency, the potion's red liquid glimmers when agitated.\n\n**Table- Potions of Healing**\n\n| Potion of ...    | Rarity    | HP Regained |\n|------------------|-----------|-------------|\n| Healing          | Common    | 2d4+2       |\n| Greater healing  | Uncommon  | 4d4+4       |\n| Superior healing | Rare      | 8d4+8       |\n| Supreme healing  | Very rare | 10d4+20     |\n|                  |           |             |",
    "zh-CN": "饮用后，你恢复生命值；恢复量由药水的稀有度决定，见治疗药水表。无论效力强弱，红色药液晃动时都会闪光。\n\n**治疗药水表**\n\n| 药水 | 稀有度 | 恢复生命值 |\n|------|--------|------------|\n| 治疗药水 | 普通 | 2d4+2 |\n| 强效治疗药水 | 非普通 | 4d4+4 |\n| 高效治疗药水 | 珍稀 | 8d4+8 |\n| 极效治疗药水 | 极珍稀 | 10d4+20 |"
  },
  "itemHelp.native.potion-of-heroism": {
    "en": "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the *bless* spell (no concentration required). This blue potion bubbles and steams as if boiling.",
    "zh-CN": "饮用后获得 10 点临时生命值，持续 1 小时。在同一持续时间内，你还受到*祝福术*的效果，无需专注。这种蓝色药水冒着气泡和蒸汽，仿佛正在沸腾。"
  },
  "itemHelp.native.potion-of-invisibility": {
    "en": "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell.",
    "zh-CN": "容器看起来是空的，摸起来却像装有液体。饮用后，你隐形 1 小时，穿戴和携带的物品也一同隐形。若你攻击或施放法术，效果会提前结束。"
  },
  "itemHelp.native.potion-of-mind-reading": {
    "en": "When you drink this potion, you gain the effect of the *detect thoughts* spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it.",
    "zh-CN": "饮用后，你获得*侦测思想*法术的效果，豁免难度为 13。浓稠的紫色药液中浮着一团卵形粉色云雾。"
  },
  "itemHelp.native.potion-of-poison": {
    "en": "This concoction looks, smells, and tastes like a *potion of healing* or other beneficial potion. However, it is actually poison masked by illusion magic. An *identify* spell reveals its true nature.\n\nIf you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be poisoned. At the start of each of your turns while you are poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0.",
    "zh-CN": "这种药剂的外观、气味和味道都像*治疗药水*或其他有益药水，实际上却是被幻术掩饰的毒药。*鉴定术*可揭示其真实本质。\n\n饮用后，你受到 3d6 点毒素伤害，并须进行难度为 13 的体质豁免；失败则陷入中毒。以此方式中毒期间，每个回合开始时你都受到 3d6 点毒素伤害。每个回合结束时，可再次进行豁免；成功时，之后回合受到的毒素伤害减少 1d6。当伤害减少至 0 时，中毒结束。"
  },
  "itemHelp.native.potion-of-resistance": {
    "en": "When you drink this potion, you gain resistance to one type of damage for 1 hour. The GM chooses the type or determines it randomly from the options below.\n\n**Table- Potion of Resistance**\n\n| d10 | Damage Type |\n|-----|-------------|\n| 1   | Acid        |\n| 2   | Cold        |\n| 3   | Fire        |\n| 4   | Force       |\n| 5   | Lightning   |\n| 6   | Necrotic    |\n| 7   | Poison      |\n| 8   | Psychic     |\n| 9   | Radiant     |\n| 10  | Thunder     |\n|     |             |",
    "zh-CN": "饮用后，你对一种伤害类型具有抗性，持续 1 小时。DM 可选择类型，或按下表随机决定。\n\n**抗性药水表**\n\n| d10 | 伤害类型 |\n|-----|----------|\n| 1 | 强酸 |\n| 2 | 寒冷 |\n| 3 | 火焰 |\n| 4 | 力场 |\n| 5 | 闪电 |\n| 6 | 黯蚀 |\n| 7 | 毒素 |\n| 8 | 心灵 |\n| 9 | 光耀 |\n| 10 | 雷鸣 |"
  },
  "itemHelp.native.potion-of-speed": {
    "en": "When you drink this potion, you gain the effect of the *haste* spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own.",
    "zh-CN": "饮用后，你获得*加速术*法术的效果，持续 1 分钟，无需专注。黄色药液中夹杂着黑色条纹，会自行旋转。"
  },
  "itemHelp.native.potion-of-water-breathing": {
    "en": "You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
    "zh-CN": "饮用后，你可在水下呼吸，持续 1 小时。浑浊的绿色药液带有海洋气味，其中浮着一颗水母状气泡。"
  },
  "itemHelp.native.adamantine-armor": {
    "en": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.",
    "zh-CN": "这套护甲以精金加固；精金是世上最坚硬的物质之一。穿戴时，针对你的任何重击都会变为普通命中。"
  },
  "itemHelp.native.animated-shield": {
    "en": "While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free.",
    "zh-CN": "手持盾牌时，可用附赠动作说出命令词，使它自行活动。盾牌跃入空中，悬浮在你所在空间，像被你持用一样保护你，同时让双手空出来。效果持续 1 分钟，或直到你用附赠动作结束效果、陷入失能或死亡。效果结束时，盾牌落到地面；若你有一只空闲的手，则落入手中。"
  },
  "itemHelp.native.armor-of-invulnerability": {
    "en": "You have resistance to nonmagical damage while you wear this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
    "zh-CN": "穿戴时，你对非魔法伤害具有抗性。此外，可用一个动作使自己免疫非魔法伤害，持续 10 分钟，或直到不再穿戴护甲。使用这个特殊动作后，须等到下一个黎明才能再次使用。"
  },
  "itemHelp.native.armor-of-resistance": {
    "en": "You have resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly from the options below.\n\n**Table- Armor of Resistance**\n\n| d10 | Damage Type |\n|-----|-------------|\n| 1   | Acid        |\n| 2   | Cold        |\n| 3   | Fire        |\n| 4   | Force       |\n| 5   | Lightning   |\n| 6   | Necrotic    |\n| 7   | Poison      |\n| 8   | Psychic     |\n| 9   | Radiant     |\n| 10  | Thunder     |\n|     |             |",
    "zh-CN": "穿戴时，你对一种伤害类型具有抗性。DM 可选择类型，或按下表随机决定。\n\n**抗性护甲表**\n\n| d10 | 伤害类型 |\n|-----|----------|\n| 1 | 强酸 |\n| 2 | 寒冷 |\n| 3 | 火焰 |\n| 4 | 力场 |\n| 5 | 闪电 |\n| 6 | 黯蚀 |\n| 7 | 毒素 |\n| 8 | 心灵 |\n| 9 | 光耀 |\n| 10 | 雷鸣 |"
  },
  "itemHelp.native.armor-of-vulnerability": {
    "en": "While wearing this armor, you have resistance to one of the following damage types: bludgeoning, piercing, or slashing. The GM chooses the type or determines it randomly.\n\n***Curse***. This armor is cursed, a fact that is revealed only when an *identify* spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the *remove curse* spell or similar magic; removing the armor fails to end the curse. While cursed, you have vulnerability to two of the three damage types associated with the armor (not the one to which it grants resistance).",
    "zh-CN": "穿戴时，你对钝击、穿刺或挥砍中的一种伤害具有抗性，由 DM 选择或随机决定。\n\n**诅咒。**这套护甲受到诅咒；只有对它施放*鉴定术*，或与它同调时，才会发现这一点。同调会使你受到诅咒，直到你成为*移除诅咒*或类似魔法的目标；脱下护甲不会结束诅咒。受诅咒期间，你对上述三种伤害中的另外两种具有易伤，也就是它未提供抗性的两种。"
  },
  "itemHelp.native.armor-1-2-or-3": {
    "en": "You have a bonus to AC while wearing this armor. The bonus is determined by its rarity.",
    "zh-CN": "穿戴时，你的护甲等级获得加值，数值由护甲的稀有度决定。"
  },
  "itemHelp.native.arrow-catching-shield": {
    "en": "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
    "zh-CN": "持用时，你对抗远程攻击的护甲等级额外获得 +2 加值，叠加于盾牌通常提供的护甲等级加值。此外，每当攻击者对你 5 英尺内的目标进行远程攻击时，你可使用反应代替它成为攻击目标。"
  },
  "itemHelp.native.demon-armor": {
    "en": "While wearing this armor, you gain a +1 bonus to AC, and you can understand and speak Abyssal. In addition, the armor's clawed gauntlets turn unarmed strikes with your hands into magic weapons that deal slashing damage, with a +1 bonus to attack rolls and damage rolls and a damage die of 1d8.\n\n***Curse***. Once you don this cursed armor, you can't doff it unless you are targeted by the *remove curse* spell or similar magic. While wearing the armor, you have disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.",
    "zh-CN": "穿戴时，护甲等级获得 +1 加值，并可理解和说深渊语。此外，带爪护手使你用双手进行的徒手打击视为魔法武器，造成挥砍伤害，伤害骰为 1d8，攻击检定和伤害掷骰获得 +1 加值。\n\n**诅咒。**穿上这套受诅咒的护甲后，除非成为*移除诅咒*或类似魔法的目标，否则无法脱下。穿戴时，对恶魔的攻击检定，以及抵抗恶魔法术和特殊能力的豁免，均具有劣势。"
  },
  "itemHelp.native.dragon-scale-mail": {
    "en": "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued.\n\nWhile wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table).\n\nAdditionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.\n\n**Table- Dragon Scale Mail**\n\n| Dragon | Resistance |\n|:-------|:-----------|\n| Black  | Acid       |\n| Blue   | Lightning  |\n| Brass  | Fire       |\n| Bronze | Lightning  |\n| Copper | Acid       |\n| Gold   | Fire       |\n| Green  | Poison     |\n| Red    | Fire       |\n| Silver | Cold       |\n| White  | Cold       |",
    "zh-CN": "龙鳞甲由同一种龙的鳞片制成。有时龙会收集脱落的鳞片，赠予类人生物；也有猎人仔细剥取并保存死龙的皮。不论来源如何，龙鳞甲都极为珍贵。\n\n穿戴时，护甲等级获得 +1 加值；抵抗龙的骇人威仪和吐息武器时，豁免具有优势；还会获得一种伤害抗性，由鳞片来源的龙种决定，见下表。\n\n此外，可用一个动作集中感官，以魔法辨明 30 英里内与你护甲龙种相同、距离最近的龙的方位和距离。这个特殊动作须等到下一个黎明才能再次使用。\n\n**龙鳞甲表**\n\n| 龙种 | 抗性 |\n|------|------|\n| 黑龙 | 强酸 |\n| 蓝龙 | 闪电 |\n| 黄铜龙 | 火焰 |\n| 青铜龙 | 闪电 |\n| 赤铜龙 | 强酸 |\n| 金龙 | 火焰 |\n| 绿龙 | 毒素 |\n| 红龙 | 火焰 |\n| 银龙 | 寒冷 |\n| 白龙 | 寒冷 |"
  },
  "itemHelp.native.dwarven-plate": {
    "en": "While wearing this armor, you gain a +2 bonus to AC. In addition, if an effect moves you against your will along the ground, you can use your reaction to reduce the distance you are moved by up to 10 feet.",
    "zh-CN": "穿戴时，护甲等级获得 +2 加值。此外，若某种效果违背你的意愿使你沿地面移动，可使用反应使移动距离减少至多 10 英尺。"
  },
  "itemHelp.native.elven-chain": {
    "en": "You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.",
    "zh-CN": "穿戴时，护甲等级获得 +1 加值。即使你不熟练中甲，也视为熟练这套护甲。"
  },
  "itemHelp.native.glamoured-studded-leather": {
    "en": "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor.",
    "zh-CN": "穿戴时，护甲等级获得 +1 加值。还可用附赠动作说出命令词，使护甲呈现为普通衣服或另一种护甲。你决定其颜色、款式和配饰等外观，但护甲仍保留原有的体积和重量。幻象外观持续至你再次使用此特性，或脱下护甲。"
  },
  "itemHelp.native.mithral-armor": {
    "en": "Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
    "zh-CN": "秘银是一种轻巧而柔韧的金属。秘银链甲衫或胸甲可穿在普通衣服下面。若原护甲会使敏捷（隐匿）检定具有劣势，或具有力量要求，秘银版本便不再有这些限制。"
  },
  "itemHelp.native.plate-armor-of-etherealness": {
    "en": "While you're wearing this armor, you can speak its command word as an action to gain the effect of the *etherealness* spell, which last for 10 minutes or until you remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn.",
    "zh-CN": "穿戴时，可用一个动作说出命令词，获得*以太化*法术的效果，持续 10 分钟，或直到脱下护甲、再次用一个动作说出命令词。此特性须等到下一个黎明才能再次使用。"
  },
  "itemHelp.native.ring-of-animal-influence": {
    "en": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 of its charges to cast one of the following spells:\n\n- Animal friendship (save DC 13)\n- Fear (save DC 13), targeting only beasts that have an Intelligence of 3 or lower\n- Speak with animals",
    "zh-CN": "戒指拥有 3 点充能，每日黎明恢复已消耗的 1d3 点。佩戴时，可用一个动作消耗 1 点充能，施放以下法术之一：\n\n- 动物友谊，豁免难度 13。\n- 恐惧术，豁免难度 13；只能指定智力不高于 3 的野兽。\n- 动物交谈。"
  },
  "itemHelp.native.ring-of-djinni-summoning": {
    "en": "While wearing this ring, you can speak its command word as an action to summon a particular djinni from the Elemental Plane of Air. The djinni appears in an unoccupied space you choose within 120 feet of you. It remains as long as you concentrate (as if concentrating on a spell), to a maximum of 1 hour, or until it drops to 0 hit points. It then returns to its home plane.\n\nWhile summoned, the djinni is friendly to you and your companions. It obeys any commands you give it, no matter what language you use. If you fail to command it, the djinni defends itself against attackers but takes no other actions.\n\nAfter the djinni departs, it can't be summoned again for 24 hours, and the ring becomes nonmagical if the djinni dies.",
    "zh-CN": "佩戴时，可用一个动作说出命令词，从气元素位面召唤一位特定的巨灵。巨灵出现在你选择的、120 英尺内的未占据空间中。只要你维持专注，如同专注于法术，它就会留下，至多 1 小时，或直到生命值降至 0；随后返回原属位面。\n\n被召唤期间，巨灵对你和同伴友好。不论你使用什么语言，它都会服从你的命令。若你不下令，它只会抵御攻击者，不进行其他动作。\n\n巨灵离开后，24 小时内无法再次召唤；若巨灵死亡，戒指会失去魔法。"
  },
  "itemHelp.native.ring-of-elemental-command": {
    "en": "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane.\n\nWhile wearing this ring, you have advantage on attack rolls against elementals from the linked plane, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the linked plane.\n\nThe ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n\n***Ring of Air Elemental Command***. You can expend 2 of the ring's charges to cast *dominate monster* on an air elemental. In addition, when you fall, you descend 60 feet per round and take no damage from falling. You can also speak and understand Auran.\n\nIf you help slay an air elemental while attuned to the ring, you gain access to the following additional properties:\n\n- You have resistance to lightning damage.\n- You have a flying speed equal to your walking speed and can hover.\n- You can cast the following spells from the ring, expending the necessary number of charges: *chain lightning* (3 charges), *gust of wind* (2 charges), or *wind wall* (1 charge).\n\n***Ring of Earth Elemental Command***. You can expend 2 of the ring's charges to cast *dominate monster* on an earth elemental. In addition, you can move in difficult terrain that is composed of rubble, rocks, or dirt as if it were normal terrain. You can also speak and understand Terran.\n\nIf you help slay an earth elemental while attuned to the ring, you gain access to the following additional properties:\n\n- You have resistance to acid damage.\n- You can move through solid earth or rock as if those areas were difficult terrain. If you end your turn there, you are shunted out to the nearest unoccupied space you last occupied.\n- You can cast the following spells from the ring, expending the necessary number of charges: *stone shape* (2 charges), *stoneskin* (3 charges), or *wall of stone* (3 charges).\n\n***Ring of Fire Elemental Command***. You can expend 2 of the ring's charges to cast *dominate monster* on a fire elemental. In addition, you have resistance to fire damage. You can also speak and understand Ignan.\n\nIf you help slay a fire elemental while attuned to the ring, you gain access to the following additional properties:\n\n- You are immune to fire damage.\n- You can cast the following spells from the ring, expending the necessary number of charges: *burning hands* (1 charge), *fireball* (2 charges), and *wall of fire* (3 charges).\n\n***Ring of Water Elemental Command***. You can expend 2 of the ring's charges to cast *dominate monster* on a water elemental. In addition, you can stand on and walk across liquid surfaces as if they were solid ground. You can also speak and understand Aquan.\n\nIf you help slay a water elemental while attuned to the ring, you gain access to the following additional properties:\n\n- You can breathe underwater and have a swimming speed equal to your walking speed.\n- You can cast the following spells from the ring, expending the necessary number of charges: *create or destroy water* (1 charge), *control water* (3 charges), *ice storm* (2 charges), or *wall of ice* (3 charges).",
    "zh-CN": "戒指与四个元素位面之一相连，由 DM 选择或随机决定。\n\n佩戴时，你对来自关联位面的元素生物进行攻击检定具有优势，它们对你的攻击检定则具有劣势。此外，你可使用关联位面对应的特性。\n\n戒指拥有 5 点充能，每日黎明恢复已消耗的 1d4+1 点。通过戒指施放的法术，其豁免难度为 17。\n\n**气元素统御戒指。**可消耗 2 点充能，对气元素施放*支配怪物*。此外，坠落时每轮下降 60 英尺，且不受坠落伤害。你也能理解和说气族语。\n\n与戒指同调期间，若你协助杀死一个气元素，还会获得以下特性：\n\n- 对闪电伤害具有抗性。\n- 获得等于步行速度的飞行速度，并可悬浮。\n- 可通过戒指施放*连锁闪电*，消耗 3 点充能；*造风术*，消耗 2 点；或*风墙术*，消耗 1 点。\n\n**土元素统御戒指。**可消耗 2 点充能，对土元素施放*支配怪物*。此外，可将碎石、岩块或泥土构成的困难地形视为普通地形。你也能理解和说土族语。\n\n与戒指同调期间，若你协助杀死一个土元素，还会获得以下特性：\n\n- 对强酸伤害具有抗性。\n- 可穿过坚实的泥土或岩石，将其视为困难地形。若在其中结束回合，会被挤到距离最近、你此前曾占据且目前未被占据的空间。\n- 可通过戒指施放*塑石术*，消耗 2 点充能；*石肤术*，消耗 3 点；或*石墙术*，消耗 3 点。\n\n**火元素统御戒指。**可消耗 2 点充能，对火元素施放*支配怪物*。此外，你对火焰伤害具有抗性，也能理解和说火族语。\n\n与戒指同调期间，若你协助杀死一个火元素，还会获得以下特性：\n\n- 免疫火焰伤害。\n- 可通过戒指施放*燃烧之手*，消耗 1 点充能；*火球术*，消耗 2 点；或*火墙术*，消耗 3 点。\n\n**水元素统御戒指。**可消耗 2 点充能，对水元素施放*支配怪物*。此外，你可站在液体表面并在上面行走，如同实地，也能理解和说水族语。\n\n与戒指同调期间，若你协助杀死一个水元素，还会获得以下特性：\n\n- 可在水下呼吸，并获得等于步行速度的游泳速度。\n- 可通过戒指施放*造水或毁水*，消耗 1 点充能；*控制水体*，消耗 3 点；*冰风暴*，消耗 2 点；或*冰墙术*，消耗 3 点。"
  },
  "itemHelp.native.ring-of-evasion": {
    "en": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead.",
    "zh-CN": "戒指拥有 3 点充能，每日黎明恢复已消耗的 1d3 点。佩戴时，若敏捷豁免失败，可使用反应消耗 1 点充能，使该次豁免改为成功。"
  },
  "itemHelp.native.ring-of-feather-falling": {
    "en": "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.",
    "zh-CN": "佩戴时，坠落每轮下降 60 英尺，且不受坠落伤害。"
  },
  "itemHelp.native.ring-of-free-action": {
    "en": "While you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained.",
    "zh-CN": "佩戴时，困难地形不消耗额外移动力。此外，魔法无法降低你的速度，也无法使你陷入麻痹或束缚。"
  },
  "itemHelp.native.ring-of-invisibility": {
    "en": "While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a spell, or until you use a bonus action to become visible again.",
    "zh-CN": "佩戴时，可用一个动作使自己隐形，穿戴和携带的物品也一同隐形。效果持续至取下戒指、攻击、施放法术，或用附赠动作使自己重新显形。"
  },
  "itemHelp.native.ring-of-jumping": {
    "en": "While wearing this ring, you can cast the *jump* spell from it as a bonus action at will, but can target only yourself when you do so.",
    "zh-CN": "佩戴时，可随意用附赠动作通过戒指施放*跳跃术*，但只能以自己为目标。"
  },
  "itemHelp.native.ring-of-mind-shielding": {
    "en": "While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.\n\nYou can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die.\n\nIf you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication.",
    "zh-CN": "佩戴时，你免疫能让其他生物读取思想、判断你是否说谎、得知你的阵营或生物类型的魔法。只有经你允许，生物才能与你进行心灵感应交流。\n\n可用一个动作使戒指隐形，直到你再次用一个动作使其显形、取下戒指，或死亡。\n\n佩戴时若你死亡，灵魂会进入戒指，除非其中已有一个灵魂。你可留在戒指中，也可前往来世。只要灵魂仍在戒指中，你就能与佩戴者进行心灵感应交流，佩戴者无法阻止这种交流。"
  },
  "itemHelp.native.ring-of-protection": {
    "en": "You gain a +1 bonus to AC and saving throws while wearing this ring.",
    "zh-CN": "佩戴时，护甲等级和豁免均获得 +1 加值。"
  },
  "itemHelp.native.ring-of-regeneration": {
    "en": "While wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6+1 days if you have at least 1 hit point the whole time.",
    "zh-CN": "佩戴时，只要你至少有 1 点生命值，每 10 分钟恢复 1d6 点生命值。若失去身体部位，且在整个再生期间始终至少有 1 点生命值，缺失部位会在 1d6+1 天后长回并恢复全部功能。"
  },
  "itemHelp.native.ring-of-resistance": {
    "en": "You have resistance to one damage type while wearing this ring. The gem in the ring indicates the type, which the GM chooses or determines randomly.\n\n**Table- Ring of Resistance**\n\n| d10 | Damage Type | Gem        |\n|-----|-------------|------------|\n| 1   | Acid        | Pearl      |\n| 2   | Cold        | Tourmaline |\n| 3   | Fire        | Garnet     |\n| 4   | Force       | Sapphire   |\n| 5   | Lightning   | Citrine    |\n| 6   | Necrotic    | Jet        |\n| 7   | Poison      | Amethyst   |\n| 8   | Psychic     | Jade       |\n| 9   | Radiant     | Topaz      |\n| 10  | Thunder     | Spinel     |\n|     |             |            |",
    "zh-CN": "佩戴时，你对一种伤害类型具有抗性。戒指上的宝石标示该类型，由 DM 选择或随机决定。\n\n**抗性戒指表**\n\n| d10 | 伤害类型 | 宝石 |\n|-----|----------|------|\n| 1 | 强酸 | 珍珠 |\n| 2 | 寒冷 | 碧玺 |\n| 3 | 火焰 | 石榴石 |\n| 4 | 力场 | 蓝宝石 |\n| 5 | 闪电 | 黄水晶 |\n| 6 | 黯蚀 | 煤玉 |\n| 7 | 毒素 | 紫水晶 |\n| 8 | 心灵 | 玉石 |\n| 9 | 光耀 | 黄玉 |\n| 10 | 雷鸣 | 尖晶石 |"
  },
  "itemHelp.native.ring-of-shooting-stars": {
    "en": "While wearing this ring in dim light or darkness, you can cast *dancing lights* and *light* from the ring at will. Casting either spell from the ring requires an action.\n\nThe ring has 6 charges for the following other properties. The ring regains 1d6 expended charges daily at dawn.\n\n***Faerie Fire***. You can expend 1 charge as an action to cast *faerie fire* from the ring.\n\n***Ball Lightning***. You can expend 2 charges as an action to create one to four 3-foot diameter spheres of lightning. The more spheres you create, the less powerful each sphere is individually.\n\nEach sphere appears in an unoccupied space you can see within 120 feet of you. The spheres last as long as you concentrate (as if concentrating on a spell), up to 1 minute. Each sphere sheds dim light in a 30-foot radius.\n\nAs a bonus action, you can move each sphere up to 30 feet, but no farther than 120 feet away from you. When a creature other than you comes within 5 feet of a sphere, the sphere discharges lightning at that creature and disappears. That creature must make a DC 15 Dexterity saving throw. On a failed save, the creature takes lightning damage based on the number of spheres you created.\n\n**Table- Ring of Shooting Stars**\n\n| Spheres | Lightning Damage |\n|---------|------------------|\n| 4       | 2d4              |\n| 3       | 2d6              |\n| 2       | 5d4              |\n| 1       | 4d12             |\n|         |                  |\n\n***Shooting Stars***. You can expend 1 to 3 charges as an action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of you. Each creature within a 15-foot cube originating from that point is showered in sparks and must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one.",
    "zh-CN": "佩戴戒指且处于微光或黑暗中时，可随意通过戒指施放*舞光术*和*光亮术*；每次施法需要一个动作。\n\n戒指拥有 6 点充能，可用于以下其他特性，每日黎明恢复已消耗的 1d6 点。\n\n**精灵之火。**可用一个动作消耗 1 点充能，通过戒指施放*精灵之火*。\n\n**闪电球。**可用一个动作消耗 2 点充能，创造一至四个直径 3 英尺的闪电球。创造的球越多，每个球的威力越弱。\n\n每个球出现在你能看见的、120 英尺内的未占据空间。只要你维持专注，如同专注于法术，它们就会留下，至多 1 分钟。每个球照亮半径 30 英尺的微光区域。\n\n可用附赠动作使每个球移动至多 30 英尺，但不能远离你超过 120 英尺。当你以外的生物接近某个球至 5 英尺内时，球会对它放电并消失。该生物须进行难度为 15 的敏捷豁免；失败则受到闪电伤害，数值由创造的球数决定。\n\n**流星戒指表**\n\n| 球数 | 闪电伤害 |\n|------|----------|\n| 4 | 2d4 |\n| 3 | 2d6 |\n| 2 | 5d4 |\n| 1 | 4d12 |\n\n**流星。**可用一个动作消耗 1 至 3 点充能。每消耗 1 点，就从戒指发射一团发光光点，射向你能看见的、60 英尺内的一点。以该点为起点、边长 15 英尺的立方体内，每个生物都被火花笼罩，须进行难度为 15 的敏捷豁免；失败受到 5d4 点火焰伤害，成功则伤害减半。"
  },
  "itemHelp.native.ring-of-spell-storing": {
    "en": "This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 - 1 levels of stored spells chosen by the GM.\n\nAny creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n\nWhile wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.",
    "zh-CN": "戒指可储存施放进其中的法术，直到与它同调的佩戴者使用。可同时储存总计至多 5 环的法术。发现时，其中已有总计 1d6 - 1 环、由 DM 选择的法术。\n\n任何生物都可在施法时触碰戒指，将一个 1 至 5 环法术存入其中。除储存外，该次施法不产生效果。若戒指容量不足，法术仍会被消耗且不产生效果。施法所用法术位的环阶决定占用的容量。\n\n佩戴时，可施放其中任何已储存的法术。法术使用原施法者的法术位环阶、法术豁免难度、法术攻击加值和施法关键属性，其他方面则视为由你施放。法术施放后不再储存在戒指中，腾出对应容量。"
  },
  "itemHelp.native.ring-of-spell-turning": {
    "en": "While wearing this ring, you have advantage on saving throws against any spell that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on you and instead targets the caster, using the slot level, spell save DC, attack bonus, and spellcasting ability of the caster.",
    "zh-CN": "佩戴时，抵抗只以你为目标、且非区域效果的法术时，豁免具有优势。此外，若豁免掷出 20，且法术为 7 环或更低，它对你无效，改为以原施法者为目标，并使用原施法者的法术位环阶、法术豁免难度、攻击加值和施法关键属性。"
  },
  "itemHelp.native.ring-of-swimming": {
    "en": "You have a swimming speed of 40 feet while wearing this ring.",
    "zh-CN": "佩戴时，你获得 40 英尺游泳速度。"
  },
  "itemHelp.native.ring-of-telekinesis": {
    "en": "While wearing this ring, you can cast the *telekinesis* spell at will, but you can target only objects that aren't being worn or carried.",
    "zh-CN": "佩戴时，可随意施放*心灵遥控*，但只能指定未被穿戴或携带的物体。"
  },
  "itemHelp.native.ring-of-the-ram": {
    "en": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you.\n\nAlternatively, you can expend 1 to 3 of the ring's charges as an action to try to break an object you can see within 60 feet of you that isn't being worn or carried. The ring makes a Strength check with a +5 bonus for each charge you spend.",
    "zh-CN": "戒指拥有 3 点充能，每日黎明恢复已消耗的 1d3 点。佩戴时，可用一个动作消耗 1 至 3 点充能，攻击你能看见的、60 英尺内的一个生物。戒指产生幽灵般的公羊头，以 +7 加值进行攻击检定。命中时，每消耗 1 点充能，目标受到 2d10 点力场伤害，并被推离你 5 英尺。\n\n也可用一个动作消耗 1 至 3 点充能，尝试破坏你能看见的、60 英尺内未被穿戴或携带的物体。每消耗 1 点充能，戒指的力量检定就获得 +5 加值。"
  },
  "itemHelp.native.ring-of-three-wishes": {
    "en": "While wearing this ring, you can use an action to expend 1 of its 3 charges to cast the *wish* spell from it. The ring becomes nonmagical when you use the last charge.",
    "zh-CN": "佩戴时，可用一个动作消耗戒指 3 点充能中的 1 点，通过它施放*祈愿术*。最后一点充能耗尽后，戒指失去魔法。"
  },
  "itemHelp.native.ring-of-warmth": {
    "en": "While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.",
    "zh-CN": "佩戴时，你对寒冷伤害具有抗性。此外，你及穿戴、携带的一切物品不会被低至华氏 -50 度的气温伤害。"
  },
  "itemHelp.native.ring-of-water-walking": {
    "en": "While wearing this ring, you can stand on and move across any liquid surface as if it were solid ground.",
    "zh-CN": "佩戴时，你可站在任何液体表面并在上面移动，如同实地。"
  },
  "itemHelp.native.ring-of-x-ray-vision": {
    "en": "While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet. To you, solid objects within that radius appear transparent and don't prevent light from passing through them. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead.\n\nWhenever you use the ring again before taking a long rest, you must succeed on a DC 15 Constitution saving throw or gain one level of exhaustion.",
    "zh-CN": "佩戴时，可用一个动作说出命令词，透视固体物质，持续 1 分钟。此视力的半径为 30 英尺；范围内的固体物体对你而言是透明的，也不会阻挡光线。可透视 1 英尺厚的石头、1 英寸厚的普通金属，或至多 3 英尺厚的木材、泥土。更厚的材料或一层薄铅片都会阻挡视线。\n\n长休之前每次再次使用戒指，都须进行难度为 15 的体质豁免；失败则获得一级力竭。"
  },
  "itemHelp.native.shield-of-missile-attraction": {
    "en": "While holding this shield, you have resistance to damage from ranged weapon attacks.\n\n***Curse***. This shield is cursed. Attuning to it curses you until you are targeted by the *remove curse* spell or similar magic. Removing the shield fails to end the curse on you. Whenever a ranged weapon attack is made against a target within 10 feet of you, the curse causes you to become the target instead.",
    "zh-CN": "手持时，你对远程武器攻击造成的伤害具有抗性。\n\n**诅咒。**这面盾牌受到诅咒。同调会使你受到诅咒，直到成为*移除诅咒*或类似魔法的目标；移除盾牌不会结束诅咒。每当攻击者对你 10 英尺内的目标进行远程武器攻击时，诅咒都会使你代替它成为目标。"
  },
  "itemHelp.native.shield-1-2-or-3": {
    "en": "While holding this shield, you have a bonus to AC determined by the shield's rarity. This bonus is in addition to the shield's normal bonus to AC.",
    "zh-CN": "手持时，护甲等级获得由盾牌稀有度决定的加值，叠加于盾牌通常提供的护甲等级加值。"
  },
  "itemHelp.native.spellguard-shield": {
    "en": "While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you.",
    "zh-CN": "手持时，抵抗法术及其他魔法效果的豁免具有优势，针对你的法术攻击具有劣势。"
  },
  "itemHelp.native.wand-of-binding": {
    "en": "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n\n***Spells***. While holding the wand, you can use an action to expend some of its charges to cast one of the following spells (save DC 17): *hold monster* (5 charges) or *hold person* (2 charges).\n\n***Assisted Escape***. While holding the wand, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple.",
    "zh-CN": "魔杖拥有 7 点充能，可用于以下特性，每日黎明恢复已消耗的 1d6+1 点。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。\n\n**法术。**手持时，可用一个动作消耗充能，施放以下法术之一，豁免难度为 17：*定身怪物*，消耗 5 点；或*定身人类*，消耗 2 点。\n\n**协助脱身。**手持时，可使用反应消耗 1 点充能，使抵抗麻痹或束缚的一次豁免具有优势；也可消耗 1 点充能，使挣脱擒抱的任意一次检定具有优势。"
  },
  "itemHelp.native.wand-of-enemy-detection": {
    "en": "This wand has 7 charges. While holding it, you can use an action and expend 1 charge to speak its command word. For the next minute, you know the direction of the nearest creature hostile to you within 60 feet, but not its distance from you. The wand can sense the presence of hostile creatures that are ethereal, invisible, disguised, or hidden, as well as those in plain sight. The effect ends if you stop holding the wand.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点充能，并说出命令词。接下来一分钟内，你知道 60 英尺内最近的敌对生物的方位，但不知道距离。魔杖可感知以太、隐形、伪装、躲藏或直接暴露在视野中的敌对生物。不再手持魔杖时，效果结束。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-fear": {
    "en": "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n\n***Command***. While holding the wand, you can use an action to expend 1 charge and command another creature to flee or grovel, as with the *command* spell (save DC 15).\n\n***Cone of Fear***. While holding the wand, you can use an action to expend 2 charges, causing the wand's tip to emit a 60-foot cone of amber light. Each creature in the cone must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.",
    "zh-CN": "魔杖拥有 7 点充能，可用于以下特性，每日黎明恢复已消耗的 1d6+1 点。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。\n\n**命令。**手持时，可用一个动作消耗 1 点充能，命令另一生物逃跑或伏地，如同*命令术*的效果，豁免难度为 15。\n\n**恐惧锥。**手持时，可用一个动作消耗 2 点充能，使杖尖射出长 60 英尺的琥珀色锥形光芒。锥形内每个生物须进行难度为 15 的感知豁免；失败则对你陷入恐慌，持续 1 分钟。以此方式恐慌的生物须在回合中尽力远离你，不能自愿移动到你 30 英尺内，也无法使用反应。它的动作只能用于疾走，或尝试挣脱阻止移动的效果；若无处可移，则可执行闪避动作。每个回合结束时可再次进行豁免，成功则结束自身效果。"
  },
  "itemHelp.native.wand-of-fireballs": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the *fireball* spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点或更多充能，通过它施放*火球术*，豁免难度为 15。消耗 1 点时施放 3 环版本；每额外消耗一点，法术位环阶提高一环。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-lightning-bolts": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the *lightning bolt* spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点或更多充能，通过它施放*闪电束*，豁免难度为 15。消耗 1 点时施放 3 环版本；每额外消耗一点，法术位环阶提高一环。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-magic-detection": {
    "en": "This wand has 3 charges. While holding it, you can expend 1 charge as an action to cast the *detect magic* spell from it. The wand regains 1d3 expended charges daily at dawn.",
    "zh-CN": "魔杖拥有 3 点充能。手持时，可用一个动作消耗 1 点充能，通过它施放*侦测魔法*。每日黎明恢复已消耗的 1d3 点充能。"
  },
  "itemHelp.native.wand-of-magic-missiles": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the *magic missile* spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点或更多充能，通过它施放*魔法飞弹*。消耗 1 点时施放 1 环版本；每额外消耗一点，法术位环阶提高一环。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-paralysis": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a thin blue ray to streak from the tip toward a creature you can see within 60 feet of you. The target must succeed on a DC 15 Constitution saving throw or be paralyzed for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the effect on itself on a success.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点充能，让一束细长蓝光从杖尖射向你能看见的、60 英尺内的一个生物。目标须进行难度为 15 的体质豁免；失败则陷入麻痹，持续 1 分钟。目标每个回合结束时可再次进行豁免，成功则结束自身效果。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-polymorph": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the *polymorph* spell (save DC 15) from it.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点充能，通过它施放*变形术*，豁免难度为 15。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-secrets": {
    "en": "The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn.",
    "zh-CN": "魔杖拥有 3 点充能。手持时，可用一个动作消耗 1 点充能；若你 30 英尺内有密门或陷阱，魔杖会震动并指向最近的一处。每日黎明恢复已消耗的 1d3 点充能。"
  },
  "itemHelp.native.wand-of-the-war-mage-1-2-or-3": {
    "en": "While holding this wand, you gain a bonus to spell attack rolls determined by the wand's rarity. In addition, you ignore half cover when making a spell attack.",
    "zh-CN": "手持时，你的法术攻击检定获得由魔杖稀有度决定的加值。此外，进行法术攻击时无视半身掩护。"
  },
  "itemHelp.native.wand-of-web": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the *web* spell (save DC 15) from it.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点充能，通过它施放*蛛网术*，豁免难度为 15。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为灰烬并被摧毁。"
  },
  "itemHelp.native.wand-of-wonder": {
    "en": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges and choose a target within 120 feet of you. The target can be a creature, an object, or a point in space. Roll d100 and consult the following table to discover what happens.\n\nIf the effect causes you to cast a spell from the wand, the spell's save DC is 15. If the spell normally has a range expressed in feet, its range becomes 120 feet if it isn't already.\n\nIf an effect covers an area, you must center the spell on and include the target. If an effect has multiple possible subjects, the GM randomly determines which ones are affected.\n\nThe wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into dust and is destroyed.\n\n**Table- Wand of Wonder**\n\n| d100   | Effect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |\n|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| 01-05  | You cast slow. 06-10 You cast faerie fire.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |\n| 11-15  | You are stunned until the start of your next turn, believing something awesome just happened. 16-20 You cast gust of wind.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |\n| 21-25  | You cast detect thoughts on the target you chose. If you didn't target a creature, you instead take 1d6 psychic damage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |\n| 26-30  | You cast stinking cloud.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |\n| 31-33  | Heavy rain falls in a 60-foot radius centered on the target. The area becomes lightly obscured. The rain falls until the start of your next turn.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |\n| 34-36  | An animal appears in the unoccupied space nearest the target. The animal isn't under your control and acts as it normally would. Roll a d100 to determine which animal appears. On a 01-25, a rhinoceros appears; on a 26-50, an elephant appears; and on a 51-100, a rat appears.                                                                                                                                                                                                                                                                                                                       |\n| 37-46  | You cast lightning bolt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |\n| 47-49  | A cloud of 600 oversized butterflies fills a 30-foot radius centered on the target. The area becomes heavily obscured. The butterflies remain for 10 minutes.                                                                                                                                                                                                                                                                                                                                                                                                                                            |\n| 50-53  | You enlarge the target as if you had cast enlarge/reduce. If the target can't be affected by that spell, or if you didn't target a creature, you become the target.                                                                                                                                                                                                                                                                                                                                                                                                                                      |\n| 54-58  | You cast darkness.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |\n| 59-62  | Grass grows on the ground in a 60-foot radius centered on the target. If grass is already there, it grows to ten times its normal size and remains overgrown for 1 minute.                                                                                                                                                                                                                                                                                                                                                                                                                               |\n| 63-65  | An object of the GM's choice disappears into the Ethereal Plane. The object must be neither worn nor carried, within 120 feet of the target, and no larger than 10 feet in any dimension.                                                                                                                                                                                                                                                                                                                                                                                                                |\n| 66-69  | You shrink yourself as if you had cast enlarge/reduce on yourself.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |\n| 70-79  | You cast fireball.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |\n| 80-84  | You cast invisibility on yourself.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |\n| 85-87  | Leaves grow from the target. If you chose a point in space as the target, leaves sprout from the creature nearest to that point. Unless they are picked off, the leaves turn brown and fall off after 24 hours.                                                                                                                                                                                                                                                                                                                                                                                          |\n| 88-90  | A stream of 1d4 × 10 gems, each worth 1 gp, shoots from the wand's tip in a line 30 feet long and 5 feet wide. Each gem deals 1 bludgeoning damage, and the total damage of the gems is divided equally among all creatures in the line.                                                                                                                                                                                                                                                                                                                                                                 |\n| 91-95  | A burst of colorful shimmering light extends from you in a 30-foot radius. You and each creature in the area that can see must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.                                                                                                                                                                                                                                                                            |\n| 96-97  | The target's skin turns bright blue for 1d10 days. If you chose a point in space, the creature nearest to that point is affected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |\n| 98-100 | If you targeted a creature, it must make a DC 15 Constitution saving throw. If you didn't target a creature, you become the target and must make the saving throw. If the saving throw fails by 5 or more, the target is instantly petrified. On any other failed save, the target is restrained and begins to turn to stone. While restrained in this way, the target must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the target is freed by the greater restoration spell or similar magic. |\n|        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |",
    "zh-CN": "魔杖拥有 7 点充能。手持时，可用一个动作消耗 1 点充能，并选择 120 英尺内的一个生物、物体或空间中的一点为目标。掷 d100，查下表决定效果。\n\n若效果使你通过魔杖施放法术，其豁免难度为 15。若法术通常以英尺表示射程，且射程并非 120 英尺，则射程改为 120 英尺。\n\n若效果覆盖区域，须以目标为中心，且将目标包含在内。若效果可能影响多个对象，由 DM 随机决定受影响者。\n\n每日黎明，魔杖恢复已消耗的 1d6+1 点充能。若消耗最后一点充能，掷 d20；结果为 1 时，魔杖化为粉尘并被摧毁。\n\n**奇迹魔杖表**\n\n| d100 | 效果 |\n|------|------|\n| 01–05 | 施放缓慢术。 |\n| 06–10 | 施放精灵之火。 |\n| 11–15 | 你陷入震慑，直到你的下一回合开始，并相信刚发生了一件惊人的事。 |\n| 16–20 | 施放造风术。 |\n| 21–25 | 对所选目标施放侦测思想；若未指定生物，则改为由你受到 1d6 点心灵伤害。 |\n| 26–30 | 施放恶臭云。 |\n| 31–33 | 以目标为中心、半径 60 英尺的区域下起大雨，形成轻度遮蔽；雨持续至你的下一回合开始。 |\n| 34–36 | 一只动物出现在离目标最近的未占据空间。它不受你控制，按正常行为行动。再掷 d100：01–25 为犀牛，26–50 为大象，51–100 为老鼠。 |\n| 37–46 | 施放闪电束。 |\n| 47–49 | 600 只巨大的蝴蝶充满以目标为中心、半径 30 英尺的区域，形成重度遮蔽，持续 10 分钟。 |\n| 50–53 | 使目标变大，如同施放变大或缩小；若目标无法被该法术影响，或未指定生物，则改为以你为目标。 |\n| 54–58 | 施放黑暗术。 |\n| 59–62 | 以目标为中心、半径 60 英尺的地面长出青草；若已有草，则长至通常的十倍大小，并保持茂盛 1 分钟。 |\n| 63–65 | DM 选择的一个物体消失进入以太位面。它须未被穿戴或携带、位于目标 120 英尺内，且各边尺寸均不超过 10 英尺。 |\n| 66–69 | 使自己缩小，如同对自己施放变大或缩小。 |\n| 70–79 | 施放火球术。 |\n| 80–84 | 对自己施放隐身术。 |\n| 85–87 | 目标长出树叶；若选择的是空间中的一点，则从距离该点最近的生物身上长出。除非被摘掉，树叶会在 24 小时后变褐并脱落。 |\n| 88–90 | 杖尖射出 1d4 × 10 颗宝石，每颗价值 1 金币，形成长 30 英尺、宽 5 英尺的线形区域。每颗宝石造成 1 点钝击伤害；总伤害由线形区域内所有生物均分。 |\n| 91–95 | 以你为中心、半径 30 英尺内爆发五彩闪光。你及范围内每个能看见的生物须进行难度为 15 的体质豁免；失败则目盲 1 分钟。每个回合结束时可再次进行豁免，成功则结束自身效果。 |\n| 96–97 | 目标皮肤变为鲜蓝色，持续 1d10 天；若选择的是空间中的一点，则影响距离该点最近的生物。 |\n| 98–100 | 若目标是生物，它须进行难度为 15 的体质豁免；若未指定生物，则由你成为目标并进行豁免。失败差值达到 5 或更多时，目标立即石化；其他失败则使目标陷入束缚，并开始变成石头。以此方式束缚时，目标须在其下一回合结束时再次进行豁免；失败则石化，成功则结束效果。石化持续至高等复原术或类似魔法将目标解救。 |"
  },
  "itemHelp.nativeMeta.oil-of-etherealness": {
    "en": "Potion, rare",
    "zh-CN": "药水，珍稀"
  },
  "itemHelp.nativeMeta.oil-of-sharpness": {
    "en": "Potion, very rare",
    "zh-CN": "药水，极珍稀"
  },
  "itemHelp.nativeMeta.oil-of-slipperiness": {
    "en": "Potion, uncommon",
    "zh-CN": "药水，非普通"
  },
  "itemHelp.nativeMeta.potion-of-climbing": {
    "en": "Potion, common",
    "zh-CN": "药水，普通"
  },
  "itemHelp.nativeMeta.potion-of-giant-strength": {
    "en": "Potion, rarity varies",
    "zh-CN": "药水，稀有度不一"
  },
  "itemHelp.nativeMeta.adamantine-armor": {
    "en": "Armor (medium or heavy, but not hide), uncommon",
    "zh-CN": "护甲（中甲或重甲，兽皮甲除外），非普通"
  },
  "itemHelp.nativeMeta.animated-shield": {
    "en": "Armor (shield), very rare (requires attunement)",
    "zh-CN": "护甲（盾牌），极珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.armor-of-invulnerability": {
    "en": "Armor (plate), legendary (requires attunement)",
    "zh-CN": "护甲（板甲），传奇（需要同调）"
  },
  "itemHelp.nativeMeta.armor-of-resistance": {
    "en": "Armor (light, medium, or heavy), rare (requires attunement)",
    "zh-CN": "护甲（轻甲、中甲或重甲），珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.armor-of-vulnerability": {
    "en": "Armor (plate), rare (requires attunement)",
    "zh-CN": "护甲（板甲），珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.armor-1-2-or-3": {
    "en": "Armor (light, medium, or heavy), rare (+1), very rare (+2), or legendary (+3)",
    "zh-CN": "护甲（轻甲、中甲或重甲），珍稀（+1）、极珍稀（+2）或传奇（+3）"
  },
  "itemHelp.nativeMeta.arrow-catching-shield": {
    "en": "Armor (shield), rare (requires attunement)",
    "zh-CN": "护甲（盾牌），珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.demon-armor": {
    "en": "Armor (plate), very rare (requires attunement)",
    "zh-CN": "护甲（板甲），极珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.dragon-scale-mail": {
    "en": "Armor (scale mail), very rare (requires attunement)",
    "zh-CN": "护甲（鳞甲），极珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.dwarven-plate": {
    "en": "Armor (plate), very rare",
    "zh-CN": "护甲（板甲），极珍稀"
  },
  "itemHelp.nativeMeta.elven-chain": {
    "en": "Armor (chain shirt), rare",
    "zh-CN": "护甲（链甲衫），珍稀"
  },
  "itemHelp.nativeMeta.glamoured-studded-leather": {
    "en": "Armor (studded leather), rare",
    "zh-CN": "护甲（镶钉皮甲），珍稀"
  },
  "itemHelp.nativeMeta.ring-of-animal-influence": {
    "en": "Ring, rare",
    "zh-CN": "戒指，珍稀"
  },
  "itemHelp.nativeMeta.ring-of-djinni-summoning": {
    "en": "Ring, legendary (requires attunement)",
    "zh-CN": "戒指，传奇（需要同调）"
  },
  "itemHelp.nativeMeta.ring-of-evasion": {
    "en": "Ring, rare (requires attunement)",
    "zh-CN": "戒指，珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.ring-of-jumping": {
    "en": "Ring, uncommon (requires attunement)",
    "zh-CN": "戒指，非普通（需要同调）"
  },
  "itemHelp.nativeMeta.ring-of-regeneration": {
    "en": "Ring, very rare (requires attunement)",
    "zh-CN": "戒指，极珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.ring-of-shooting-stars": {
    "en": "Ring, very rare (requires attunement outdoors at night)",
    "zh-CN": "戒指，极珍稀（需要在夜间户外同调）"
  },
  "itemHelp.nativeMeta.ring-of-swimming": {
    "en": "Ring, uncommon",
    "zh-CN": "戒指，非普通"
  },
  "itemHelp.nativeMeta.ring-of-three-wishes": {
    "en": "Ring, legendary",
    "zh-CN": "戒指，传奇"
  },
  "itemHelp.nativeMeta.shield-1-2-or-3": {
    "en": "Armor (shield), uncommon (+1), rare (+2), or very rare (+3)",
    "zh-CN": "护甲（盾牌），非普通（+1）、珍稀（+2）或极珍稀（+3）"
  },
  "itemHelp.nativeMeta.wand-of-binding": {
    "en": "Wand, rare (requires attunement by a spellcaster)",
    "zh-CN": "魔杖，珍稀（须由施法者同调）"
  },
  "itemHelp.nativeMeta.wand-of-enemy-detection": {
    "en": "Wand, rare (requires attunement)",
    "zh-CN": "魔杖，珍稀（需要同调）"
  },
  "itemHelp.nativeMeta.wand-of-magic-detection": {
    "en": "Wand, uncommon",
    "zh-CN": "魔杖，非普通"
  },
  "itemHelp.nativeMeta.wand-of-polymorph": {
    "en": "Wand, very rare (requires attunement by a spellcaster)",
    "zh-CN": "魔杖，极珍稀（须由施法者同调）"
  },
  "itemHelp.nativeMeta.wand-of-the-war-mage-1-2-or-3": {
    "en": "Wand, uncommon (+1), rare (+2), or very rare (+3) (requires attunement by a spellcaster)",
    "zh-CN": "魔杖，非普通（+1）、珍稀（+2）或极珍稀（+3）（须由施法者同调）"
  },
  "itemHelp.nativeMeta.wand-of-web": {
    "en": "Wand, uncommon (requires attunement by a spellcaster)",
    "zh-CN": "魔杖，非普通（须由施法者同调）"
  }
});
