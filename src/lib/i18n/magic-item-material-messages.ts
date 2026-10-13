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
  },
  "itemHelp.native.ammunition-1-2-or-3": {
    "en": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition. Once it hits a target, the ammunition is no longer magical.",
    "zh-CN": "使用这枚魔法弹药进行攻击时，攻击检定和伤害掷骰获得加值，数值由弹药的稀有度决定。命中目标后，弹药便失去魔法。"
  },
  "itemHelp.nativeMeta.ammunition-1-2-or-3": {
    "en": "Weapon (any ammunition), uncommon (+1), rare (+2), or very rare (+3)",
    "zh-CN": "武器（任意弹药），非普通（+1）、珍稀（+2）或极珍稀（+3）"
  },
  "itemHelp.native.arrow-of-slaying": {
    "en": "An *arrow of slaying* is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both *arrows of dragon slaying* and *arrows of blue dragon slaying*. If a creature belonging to the type, race, or group associated with an *arrow of slaying* takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.\n\nOnce an *arrow of slaying* deals its extra damage to a creature, it becomes a nonmagical arrow.\n\nOther types of magic ammunition of this kind exist, such as *bolts of slaying* meant for a crossbow, though arrows are most common.",
    "zh-CN": "*杀戮箭*是用于杀死特定生物的魔法武器。有些针对的范围更窄，例如既有*屠龙箭*，也有*蓝龙杀戮箭*。若属于杀戮箭所针对类型、种族或群体的生物受到该箭伤害，它须进行难度为 17 的体质豁免；失败额外受到 6d10 点穿刺伤害，成功则额外伤害减半。\n\n杀戮箭对生物造成额外伤害后，就变为非魔法箭。\n\n也存在同类的其他魔法弹药，例如供弩使用的杀戮弩矢，不过箭最为常见。"
  },
  "itemHelp.nativeMeta.arrow-of-slaying": {
    "en": "Weapon (arrow), very rare",
    "zh-CN": "武器（箭），极珍稀"
  },
  "itemHelp.native.berserker-axe": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.\n\n***Curse***. This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.\n\nWhenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。此外，与它同调期间，你每拥有一级，生命值上限便增加 1。\n\n**诅咒。**这把斧头受到诅咒，同调会将诅咒延伸到你身上。只要仍受诅咒，你就不愿与斧头分离，始终将其留在触及范围内。使用其他武器的攻击检定具有劣势，除非 60 英尺内没有你能看见或听见的敌人。\n\n持有斧头期间，每当敌对生物对你造成伤害，你须进行难度为 15 的感知豁免；失败则陷入狂暴。狂暴时，每轮须用动作以斧头攻击距离最近的生物。若攻击动作允许额外攻击，须使用这些攻击；击倒当前目标后，移动并攻击下一个最近的生物。若有多个可能目标，随机选择。狂暴持续至你的回合开始时，60 英尺内没有你能看见或听见的任何生物。"
  },
  "itemHelp.nativeMeta.berserker-axe": {
    "en": "Weapon (any axe), rare (requires attunement)",
    "zh-CN": "武器（任意斧），珍稀（需要同调）"
  },
  "itemHelp.native.dagger-of-venom": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\nYou can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can't be used this way again until the next dawn.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。\n\n可用一个动作使黏稠黑毒覆满刃面，持续 1 分钟，或直到这件武器的攻击命中生物。该生物须进行难度为 15 的体质豁免；失败受到 2d10 点毒素伤害，并中毒 1 分钟。此特性须等到下一个黎明才能再次使用。"
  },
  "itemHelp.nativeMeta.dagger-of-venom": {
    "en": "Weapon (dagger), rare",
    "zh-CN": "武器（匕首），珍稀"
  },
  "itemHelp.native.dancing-sword": {
    "en": "You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.\n\nWhile the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.\n\nAfter the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
    "zh-CN": "可用附赠动作将魔法剑抛入空中并说出命令词。剑开始悬浮，飞行至多 30 英尺，并攻击你选择的、距它 5 英尺内的一个生物。剑使用你的攻击检定，伤害掷骰使用你的属性调整值。\n\n剑悬浮时，可用附赠动作让它飞行至多 30 英尺，到达距你 30 英尺内的另一个位置；同一个附赠动作还可让它攻击距它 5 英尺内的一个生物。\n\n悬浮的剑完成第四次攻击后，会飞行至多 30 英尺，尝试回到你手中。若没有空闲的手，便落在你脚边；若返回路径被阻挡，它会尽量靠近你，再落地。若你抓住剑，或与它相距超过 30 英尺，剑也会停止悬浮。"
  },
  "itemHelp.nativeMeta.dancing-sword": {
    "en": "Weapon (any sword), very rare (requires attunement)",
    "zh-CN": "武器（任意剑），极珍稀（需要同调）"
  },
  "itemHelp.native.defender": {
    "en": "You gain a +3 bonus to attack and damage rolls made with this magic weapon.\n\nThe first time you attack with the sword on each of your turns, you can transfer some or all of the sword's bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain a +2 bonus to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +3 加值。\n\n每个回合首次用剑攻击时，可将部分或全部武器加值转移到护甲等级，替代该回合攻击所获得的加值。例如，将攻击检定和伤害掷骰的加值降为 +1，换取 +2 护甲等级。调整持续至你的下一回合开始；但必须手持剑，才能获得它提供的护甲等级加值。"
  },
  "itemHelp.nativeMeta.defender": {
    "en": "Weapon (any sword), legendary (requires attunement)",
    "zh-CN": "武器（任意剑），传奇（需要同调）"
  },
  "itemHelp.native.dragon-slayer": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\nWhen you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon's type. For the purpose of this weapon, \"dragon\" refers to any creature with the dragon type, including dragon turtles and wyverns.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。\n\n命中龙时，额外造成 3d6 点武器同类型伤害。对此武器而言，“龙”包括所有龙类生物，例如龙龟和双足飞龙。"
  },
  "itemHelp.nativeMeta.dragon-slayer": {
    "en": "Weapon (any sword), rare",
    "zh-CN": "武器（任意剑），珍稀"
  },
  "itemHelp.native.dwarven-thrower": {
    "en": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 damage or, if the target is a giant, 2d8 damage. Immediately after the attack, the weapon flies back to your hand.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +3 加值。武器具有投掷属性，正常射程为 20 英尺，长射程为 60 英尺。以它进行远程攻击并命中时，额外造成 1d8 点伤害；若目标是巨人，则额外伤害为 2d8。攻击后，武器立即飞回你手中。"
  },
  "itemHelp.nativeMeta.dwarven-thrower": {
    "en": "Weapon (warhammer), very rare (requires attunement by a dwarf)",
    "zh-CN": "武器（战锤），极珍稀（须由矮人同调）"
  },
  "itemHelp.native.flame-tongue": {
    "en": "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
    "zh-CN": "可用附赠动作说出魔法剑的命令词，使剑刃燃起火焰，照亮半径 40 英尺的明亮区域，以及其外再延伸 40 英尺的微光区域。燃烧时，每次命中目标都额外造成 2d6 点火焰伤害。火焰持续至你再次用附赠动作说出命令词、丢下剑或将剑入鞘。"
  },
  "itemHelp.nativeMeta.flame-tongue": {
    "en": "Weapon (any sword), rare (requires attunement)",
    "zh-CN": "武器（任意剑），珍稀（需要同调）"
  },
  "itemHelp.native.frost-brand": {
    "en": "When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.\n\nIn freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.\n\nWhen you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
    "zh-CN": "用这把魔法剑攻击并命中时，目标额外受到 1d6 点寒冷伤害。此外，手持剑时，你对火焰伤害具有抗性。\n\n气温达到冰点以下时，剑刃照亮半径 10 英尺的明亮区域，以及其外再延伸 10 英尺的微光区域。\n\n拔出武器时，可熄灭你 30 英尺内的所有非魔法火焰。此特性每小时至多使用一次。"
  },
  "itemHelp.native.giant-slayer": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\nWhen you hit a giant with it, the giant takes an extra 2d6 damage of the weapon's type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \"giant\" refers to any creature with the giant type, including ettins and trolls.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。\n\n命中巨人时，额外造成 2d6 点武器同类型伤害；巨人还须进行难度为 15 的力量豁免，失败则倒地。对此武器而言，“巨人”包括所有巨人类生物，例如双头巨人和巨魔。"
  },
  "itemHelp.nativeMeta.giant-slayer": {
    "en": "Weapon (any axe or sword), rare",
    "zh-CN": "武器（任意斧或剑），珍稀"
  },
  "itemHelp.native.hammer-of-thunderbolts": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n\n***Giant's Bane (Requires Attunement)***. You must be wearing a *belt of giant strength* (any variety) and *gauntlets of ogre power* to attune to this weapon. The attunement ends if you take off either of those items. While you are attuned to this weapon and holding it, your Strength score increases by 4 and can exceed 20, but not 30. When you roll a 20 on an attack roll made with this weapon against a giant, the giant must succeed on a DC 17 Constitution saving throw or die.\n\nThe hammer also has 5 charges. While attuned to it, you can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the hammer unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it must succeed on a DC 17 Constitution saving throw or be stunned until the end of your next turn. The hammer regains 1d4+1 expended charges daily at dawn.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。\n\n**巨人克星（需要同调）。**必须同时穿戴任意类型的*巨人力量腰带*和*食人魔力量手套*，才能与此武器同调；取下其中任一物品，同调即结束。同调并手持武器时，力量值增加 4，可超过 20，但不得超过 30。用此武器攻击巨人且攻击骰掷出 20 时，巨人须进行难度为 17 的体质豁免；失败则死亡。\n\n战锤还有 5 点充能。同调期间，可消耗 1 点充能并进行一次远程武器攻击，将战锤像具有投掷属性的武器一样掷出，正常射程为 20 英尺，长射程为 60 英尺。命中时，战锤释放可传至 300 英尺外的雷响。目标及距它 30 英尺内的每个生物须进行难度为 17 的体质豁免；失败则震慑，直到你的下一回合结束。每日黎明恢复已消耗的 1d4+1 点充能。"
  },
  "itemHelp.nativeMeta.hammer-of-thunderbolts": {
    "en": "Weapon (maul), legendary",
    "zh-CN": "武器（巨锤），传奇"
  },
  "itemHelp.native.holy-avenger": {
    "en": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.\n\nWhile you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +3 加值。命中邪魔或亡灵时，目标额外受到 2d10 点光耀伤害。\n\n手持出鞘的剑时，它在你周围产生半径 10 英尺的灵光。你及灵光内所有对你友好的生物，抵抗法术和其他魔法效果时，豁免具有优势。若拥有至少 17 级圣武士职业等级，灵光半径扩大至 30 英尺。"
  },
  "itemHelp.nativeMeta.holy-avenger": {
    "en": "Weapon (any sword), legendary (requires attunement by a paladin)",
    "zh-CN": "武器（任意剑），传奇（须由圣武士同调）"
  },
  "itemHelp.native.immovable-rod": {
    "en": "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success.",
    "zh-CN": "这根扁平铁棒的一端有一个按钮。可用一个动作按下，使铁棒以魔法固定在原处。直到你或其他生物再次用一个动作按下按钮，它都不会移动，即使违背重力。铁棒可承受至多 8,000 磅重量，超过则停用并坠落。生物可用一个动作进行难度为 30 的力量检定；成功时，可将固定的铁棒移动至多 10 英尺。"
  },
  "itemHelp.nativeMeta.immovable-rod": {
    "en": "Rod, uncommon",
    "zh-CN": "权杖，非普通"
  },
  "itemHelp.native.javelin-of-lightning": {
    "en": "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.\n\nThe javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.",
    "zh-CN": "这支标枪是魔法武器。掷出并说出命令词时，它变为一道闪电，从你的位置延伸到 120 英尺内的目标，形成宽 5 英尺的线形区域。除你和目标外，区域内每个生物须进行难度为 13 的敏捷豁免；失败受到 4d6 点闪电伤害，成功则伤害减半。闪电抵达目标时变回标枪；对目标进行一次远程武器攻击，命中则造成标枪伤害，另加 4d6 点闪电伤害。\n\n此特性须等到下一个黎明才能再次使用；其间仍可将标枪当作魔法武器使用。"
  },
  "itemHelp.nativeMeta.javelin-of-lightning": {
    "en": "Weapon (javelin), uncommon",
    "zh-CN": "武器（标枪），非普通"
  },
  "itemHelp.native.luck-blade": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.\n\n***Luck***. If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.\n\n***Wish***. The sword has 1d4-1 charges. While holding it, you can use an action to expend 1 charge and cast the *wish* spell from it. This property can't be used again until the next dawn. The sword loses this property if it has no charges.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值。将剑带在身上时，豁免也获得 +1 加值。\n\n**幸运。**将剑带在身上时，可借助它的幸运，重掷一次不满意的攻击检定、属性检定或豁免，无需动作；必须使用第二次结果。此特性须等到下一个黎明才能再次使用。\n\n**祈愿。**剑拥有 1d4-1 点充能。手持时，可用一个动作消耗 1 点充能，通过剑施放*祈愿术*。此特性须等到下一个黎明才能再次使用。充能耗尽后，剑失去此特性。"
  },
  "itemHelp.native.mace-of-disruption": {
    "en": "When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.\n\nWhile you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
    "zh-CN": "以这件魔法武器命中邪魔或亡灵时，目标额外受到 2d6 点光耀伤害。受到伤害后若剩余生命值不超过 25，它须进行难度为 15 的感知豁免；失败则被摧毁，成功则对你陷入恐慌，直到你的下一回合结束。\n\n手持时，武器照亮半径 20 英尺的明亮区域，以及其外再延伸 20 英尺的微光区域。"
  },
  "itemHelp.nativeMeta.mace-of-disruption": {
    "en": "Weapon (mace), rare (requires attunement)",
    "zh-CN": "武器（钉头锤），珍稀（需要同调）"
  },
  "itemHelp.native.mace-of-smiting": {
    "en": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus increases to +3 when you use the mace to attack a construct.\n\nWhen you roll a 20 on an attack roll made with this weapon, the target takes an extra 2d6 bludgeoning damage, or 4d6 bludgeoning damage if it's a construct. If a construct has 25 hit points or fewer after taking this damage, it is destroyed.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +1 加值；攻击构装生物时，加值提高至 +3。\n\n用此武器攻击且攻击骰掷出 20 时，目标额外受到 2d6 点钝击伤害；若目标是构装生物，则为 4d6。构装生物受到伤害后若剩余生命值不超过 25，便被摧毁。"
  },
  "itemHelp.nativeMeta.mace-of-smiting": {
    "en": "Weapon (mace), rare",
    "zh-CN": "武器（钉头锤），珍稀"
  },
  "itemHelp.native.mace-of-terror": {
    "en": "This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.\n\nThe mace regains 1d3 expended charges daily at dawn.",
    "zh-CN": "这件魔法武器拥有 3 点充能。手持时，可用一个动作消耗 1 点充能，释放恐惧波动。以你为中心、半径 30 英尺内，你选择的每个生物须进行难度为 15 的感知豁免；失败则对你陷入恐慌，持续 1 分钟。以此方式恐慌的生物须在回合中尽力远离你，不能自愿移动到你 30 英尺内，也无法使用反应。它的动作只能用于疾走，或尝试挣脱阻止移动的效果；若无处可移，则可执行闪避动作。每个回合结束时可再次进行豁免，成功则结束自身效果。\n\n每日黎明，钉头锤恢复已消耗的 1d3 点充能。"
  },
  "itemHelp.native.nine-lives-stealer": {
    "en": "You gain a +2 bonus to attack and damage rolls made with this magic weapon.\n\nThe sword has 1d8+1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +2 加值。\n\n剑拥有 1d8+1 点充能。对生命值低于 100 的生物造成重击时，目标须进行难度为 15 的体质豁免；失败则被剑抽走生命力，立即死亡，构装生物和亡灵免疫此效果。若目标被杀死，剑消耗 1 点充能。充能耗尽后，剑失去此特性。"
  },
  "itemHelp.native.oathbow": {
    "en": "When you nock an arrow on this bow, it whispers in Elvish, \"Swift defeat to my enemies.\" When you use this weapon to make a ranged attack, you can, as a command phrase, say, \"Swift death to you who have wronged me.\" The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.\n\nWhen you make a ranged attack roll with this weapon against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 piercing damage.\n\nWhile your sworn enemy lives, you have disadvantage on attack rolls with all other weapons.",
    "zh-CN": "将箭搭上弓时，它会用精灵语低声说：“愿我的敌人迅速溃败。”用弓进行远程攻击时，可说出命令：“愿伤害我的你迅速死去。”攻击目标成为你的誓敌，直到死亡，或七天后的黎明。一次只能有一个誓敌；誓敌死亡后，须等到下一个黎明才能选择新的誓敌。\n\n用弓对誓敌进行远程攻击检定时，具有优势。目标无法从完全掩护以外的掩护获益，你也不会因长射程而具有劣势。命中时，誓敌额外受到 3d6 点穿刺伤害。\n\n只要誓敌仍活着，使用所有其他武器的攻击检定都具有劣势。"
  },
  "itemHelp.nativeMeta.oathbow": {
    "en": "Weapon (longbow), very rare (requires attunement)",
    "zh-CN": "武器（长弓），极珍稀（需要同调）"
  },
  "itemHelp.native.rod-of-absorption": {
    "en": "While holding this rod, you can use your reaction to absorb a spell that is targeting only you and not with an area of effect. The absorbed spell's effect is canceled, and the spell's energy-not the spell itself-is stored in the rod. The energy has the same level as the spell when it was cast. The rod can absorb and store up to 50 levels of energy over the course of its existence. Once the rod absorbs 50 levels of energy, it can't absorb more. If you are targeted by a spell that the rod can't store, the rod has no effect on that spell.\n\nWhen you become attuned to the rod, you know how many levels of energy the rod has absorbed over the course of its existence, and how many levels of spell energy it currently has stored.\n\nIf you are a spellcaster holding the rod, you can convert energy stored in it into spell slots to cast spells you have prepared or know. You can create spell slots only of a level equal to or lower than your own spell slots, up to a maximum of 5th level. You use the stored levels in place of your slots, but otherwise cast the spell as normal. For example, you can use 3 levels stored in the rod as a 3rd-level spell slot.\n\nA newly found rod has 1d10 levels of spell energy stored in it already. A rod that can no longer absorb spell energy and has no energy remaining becomes nonmagical.",
    "zh-CN": "手持时，可使用反应吸收只以你为目标、且非区域效果的法术。法术效果被取消；储存的是能量，而非法术本身。能量环阶与该次施放的法术相同。权杖在整个存在期间累计至多吸收并储存 50 环能量；累计吸收 50 环后，便无法继续吸收。无法储存的法术不受权杖影响。\n\n同调时，你会知道权杖累计吸收过多少环能量，以及当前储存着多少环法术能量。\n\n施法者手持权杖时，可将储存能量转化为法术位，用于施放已准备或已知法术。生成的法术位不得高于你自己的法术位，且最高为 5 环。以储存环数代替自己的法术位，其他方面按通常方式施法。例如，可消耗储存的 3 环能量，作为一个 3 环法术位。\n\n新发现的权杖已储存 1d10 环法术能量。无法继续吸收且能量耗尽时，权杖失去魔法。"
  },
  "itemHelp.nativeMeta.rod-of-absorption": {
    "en": "Rod, very rare (requires attunement)",
    "zh-CN": "权杖，极珍稀（需要同调）"
  },
  "itemHelp.native.rod-of-alertness": {
    "en": "This rod has a flanged head and the following properties.\n\n***Alertness***. While holding the rod, you have advantage on Wisdom (Perception) checks and on rolls for initiative.\n\n***Spells***. While holding the rod, you can use an action to cast one of the following spells from it: *detect evil and good*, *detect magic*, *detect poison and disease*, or *see invisibility.*\n\n***Protective Aura***. As an action, you can plant the haft end of the rod in the ground, whereupon the rod's head sheds bright light in a 60-foot radius and dim light for an additional 60 feet. While in that bright light, you and any creature that is friendly to you gain a +1 bonus to AC and saving throws and can sense the location of any invisible hostile creature that is also in the bright light.\n\nThe rod's head stops glowing and the effect ends after 10 minutes, or when a creature uses an action to pull the rod from the ground. This property can't be used again until the next dawn.",
    "zh-CN": "权杖有一个带翼缘的杖头，并具有以下特性。\n\n**警觉。**手持时，感知（察觉）检定和先攻检定具有优势。\n\n**法术。**手持时，可用一个动作通过权杖施放*侦测邪恶与善良*、*侦测魔法*、*侦测毒素与疾病*或*识破隐形*之一。\n\n**防护灵光。**可用一个动作将杖柄插入地面；杖头照亮半径 60 英尺的明亮区域，以及其外再延伸 60 英尺的微光区域。在明亮区域内，你及对你友好的生物，护甲等级和豁免获得 +1 加值，并能感知同在明亮区域内的隐形敌对生物的位置。\n\n10 分钟后，或有生物用一个动作将权杖拔出地面时，杖头停止发光，效果结束。此特性须等到下一个黎明才能再次使用。"
  },
  "itemHelp.native.rod-of-lordly-might": {
    "en": "This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage rolls made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below.\n\n***Six Buttons***. You can press one of the rod's six buttons as a bonus action. A button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form.\n\nIf you press **button 1**, the rod becomes a *flame tongue*, as a fiery blade sprouts from the end opposite the rod's flanged head (you choose the type of sword).\n\nIf you press **button 2**, the rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it.\n\nIf you press **button 3**, the rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a +3 bonus to attack and damage rolls made with it.\n\nIf you press **button 4**, the rod transforms into a climbing pole up to 50 feet long, as you specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form.\n\nIf you press **button 5**, the rod transforms into a handheld battering ram and grants its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers.\n\nIf you press **button 6**, the rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it.\n\n***Drain Life***. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failure, the target takes an extra 4d6 necrotic damage, and you regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn.\n\n***Paralyze***. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn.\n\n***Terrify***. While holding the rod, you can use an action to force each creature you can see within 30 feet of you to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of you for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn.",
    "zh-CN": "权杖有一个带翼缘的杖头，可作为魔法钉头锤使用，攻击检定和伤害掷骰获得 +3 加值。杖柄上排列着六个按钮，对应不同特性；此外还有下述三种特性。\n\n**六个按钮。**可用附赠动作按下任一按钮。效果持续至按下另一个按钮，或再次按下同一按钮，使权杖恢复通常形态。\n\n按下**按钮 1**，权杖变为*焰舌剑*；火焰剑刃从杖头另一端伸出，剑的类型由你选择。\n\n按下**按钮 2**，杖头折起，两片新月形刃弹出，变为魔法战斧，攻击检定和伤害掷骰获得 +3 加值。\n\n按下**按钮 3**，杖头折起，杖尖伸出矛头，柄延长为 6 英尺，变为魔法矛，攻击检定和伤害掷骰获得 +3 加值。\n\n按下**按钮 4**，权杖变为你指定长度、至多 50 英尺的攀爬杆。底端尖刺和顶端三个挂钩可固定在坚硬如花岗岩的表面上。两侧伸出长 3 英寸的横杆，间隔 1 英尺，形成梯子。可承受至多 4,000 磅；超过重量或缺乏牢固固定点时，权杖恢复通常形态。\n\n按下**按钮 5**，权杖变为手持攻城槌，使使用者破开门、路障和其他屏障的力量检定获得 +10 加值。\n\n按下**按钮 6**，权杖变为或保持通常形态，并指向磁北；若所在地点没有磁北，此功能不产生效果。权杖还会让你知道地下的大致深度，或地上的大致高度。\n\n**汲取生命。**以权杖近战攻击命中生物时，可迫使目标进行难度为 17 的体质豁免；失败额外受到 4d6 点黯蚀伤害，你恢复等于该黯蚀伤害一半的生命值。此特性须等到下一个黎明才能再次使用。\n\n**麻痹。**以权杖近战攻击命中生物时，可迫使目标进行难度为 17 的力量豁免；失败则麻痹 1 分钟。目标每个回合结束时可再次进行豁免，成功则结束效果。此特性须等到下一个黎明才能再次使用。\n\n**威吓。**手持时，可用一个动作迫使你能看见的、30 英尺内的每个生物进行难度为 17 的感知豁免；失败则对你陷入恐慌，持续 1 分钟。恐慌目标每个回合结束时可再次进行豁免，成功则结束自身效果。此特性须等到下一个黎明才能再次使用。"
  },
  "itemHelp.nativeMeta.rod-of-lordly-might": {
    "en": "Rod, legendary (requires attunement)",
    "zh-CN": "权杖，传奇（需要同调）"
  },
  "itemHelp.native.rod-of-rulership": {
    "en": "You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn.",
    "zh-CN": "可用一个动作展示权杖，命令你选择的、能看见的、120 英尺内的生物服从。每个目标须进行难度为 15 的感知豁免；失败则被你魅惑 8 小时，并将你视为可信赖的领袖。若被你或同伴伤害，或被命令做违背天性的事，魅惑就会结束。权杖须等到下一个黎明才能再次使用。"
  },
  "itemHelp.nativeMeta.rod-of-rulership": {
    "en": "Rod, rare (requires attunement)",
    "zh-CN": "权杖，珍稀（需要同调）"
  },
  "itemHelp.native.rod-of-security": {
    "en": "While holding this rod, you can use an action to activate it. The rod then instantly transports you and up to 199 other willing creatures you can see to a paradise that exists in an extraplanar space. You choose the form that the paradise takes. It could be a tranquil garden, lovely glade, cheery tavern, immense palace, tropical island, fantastic carnival, or whatever else you can imagine. Regardless of its nature, the paradise contains enough water and food to sustain its visitors. Everything else that can be interacted with inside the extraplanar space can exist only there. For example, a flower picked from a garden in the paradise disappears if it is taken outside the extraplanar space.\n\nFor each hour spent in the paradise, a visitor regains hit points as if it had spent 1 Hit Die. Also, creatures don't age while in the paradise, although time passes normally. Visitors can remain in the paradise for up to 200 days divided by the number of creatures present (round down).\n\nWhen the time runs out or you use an action to end it, all visitors reappear in the location they occupied when you activated the rod, or an unoccupied space nearest that location. The rod can't be used again until ten days have passed.",
    "zh-CN": "手持时，可用一个动作启动权杖，将你及至多 199 个你能看见的、自愿同行的生物立即传送至异次元空间中的乐园。你决定乐园的形态，例如宁静花园、美丽林间空地、欢乐酒馆、宏伟宫殿、热带岛屿、奇妙嘉年华，或其他能想象的事物。无论形态如何，乐园都提供足够的食物和水；其他可互动的事物只能存在于其中，例如从花园摘下的花带离异次元空间就会消失。\n\n每在乐园中度过一小时，访客便恢复如同消耗 1 枚生命骰的生命值。生物在其中不会衰老，但时间正常流逝。可停留的天数为 200 除以在场生物数，向下取整。\n\n时间耗尽或你用一个动作结束效果时，所有访客返回启动权杖时所在的位置，或最近的未占据空间。权杖须在十天过去后才能再次使用。"
  },
  "itemHelp.nativeMeta.rod-of-security": {
    "en": "Rod, very rare",
    "zh-CN": "权杖，极珍稀"
  },
  "itemHelp.native.scimitar-of-speed": {
    "en": "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +2 加值。此外，每个回合可用附赠动作以它攻击一次。"
  },
  "itemHelp.nativeMeta.scimitar-of-speed": {
    "en": "Weapon (scimitar), very rare (requires attunement)",
    "zh-CN": "武器（弯刀），极珍稀（需要同调）"
  },
  "itemHelp.native.staff-of-charming": {
    "en": "While holding this staff, you can use an action to expend 1 of its 10 charges to cast *charm person*, *command*, *or comprehend languages* from it using your spell save DC. The staff can also be used as a magic quarterstaff.\n\nIf you are holding the staff and fail a saving throw against an enchantment spell that targets only you, you can turn your failed save into a successful one. You can't use this property of the staff again until the next dawn. If you succeed on a save against an enchantment spell that targets only you, with or without the staff's intervention, you can use your reaction to expend 1 charge from the staff and turn the spell back on its caster as if you had cast the spell.\n\nThe staff regains 1d8+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
    "zh-CN": "手持时，可用一个动作消耗 10 点充能中的 1 点，通过法杖施放*魅惑人类*、*命令术*或*通晓语言*，使用你的法术豁免难度。法杖也可作为魔法长棍使用。\n\n手持时，若抵抗只以你为目标的惑控法术的豁免失败，可使其改为成功；此特性须等到下一个黎明才能再次使用。若抵抗只以你为目标的惑控法术时豁免成功，不论是否借助法杖，都可使用反应消耗 1 点充能，将法术反射回施法者，视为由你施放。\n\n每日黎明恢复已消耗的 1d8+2 点充能。若消耗最后一点，掷 d20；结果为 1 时，法杖变为非魔法长棍。"
  },
  "itemHelp.nativeMeta.staff-of-charming": {
    "en": "Staff, rare (requires attunement by a bard, cleric, druid, sorcerer, warlock, or wizard)",
    "zh-CN": "法杖，珍稀（须由吟游诗人、牧师、德鲁伊、术士、邪术师或法师同调）"
  },
  "itemHelp.native.staff-of-fire": {
    "en": "You have resistance to fire damage while you hold this staff.\n\nThe staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: *burning hands* (1 charge), *fireball* (3 charges), or *wall of fire* (4 charges).\n\nThe staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff blackens, crumbles into cinders, and is destroyed.",
    "zh-CN": "手持时，你对火焰伤害具有抗性。\n\n法杖拥有 10 点充能。手持时，可用一个动作消耗 1 点或更多充能，使用你的法术豁免难度，施放以下法术之一：*燃烧之手*，消耗 1 点；*火球术*，消耗 3 点；或*火墙术*，消耗 4 点。\n\n每日黎明恢复已消耗的 1d6+4 点充能。若消耗最后一点，掷 d20；结果为 1 时，法杖变黑、碎成余烬并被摧毁。"
  },
  "itemHelp.nativeMeta.staff-of-fire": {
    "en": "Staff, very rare (requires attunement by a druid, sorcerer, warlock, or wizard)",
    "zh-CN": "法杖，极珍稀（须由德鲁伊、术士、邪术师或法师同调）"
  },
  "itemHelp.native.staff-of-frost": {
    "en": "You have resistance to cold damage while you hold this staff.\n\nThe staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: *cone of cold* (5 charges), *fog cloud* (1 charge), *ice storm* (4 charges), or *wall of ice* (4 charges).\n\nThe staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff turns to water and is destroyed.",
    "zh-CN": "手持时，你对寒冷伤害具有抗性。\n\n法杖拥有 10 点充能。手持时，可用一个动作消耗 1 点或更多充能，使用你的法术豁免难度，施放以下法术之一：*寒冰锥*，消耗 5 点；*雾云术*，消耗 1 点；*冰风暴*，消耗 4 点；或*冰墙术*，消耗 4 点。\n\n每日黎明恢复已消耗的 1d6+4 点充能。若消耗最后一点，掷 d20；结果为 1 时，法杖化为水并被摧毁。"
  },
  "itemHelp.native.staff-of-healing": {
    "en": "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability modifier: *cure wounds* (1 charge per spell level, up to 4th), *lesser restoration* (2 charges), or *mass cure wounds* (5 charges).\n\nThe staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff vanishes in a flash of light, lost forever.",
    "zh-CN": "法杖拥有 10 点充能。手持时，可用一个动作消耗 1 点或更多充能，使用你的法术豁免难度和施法属性调整值，施放以下法术之一：*治疗伤口*，每环消耗 1 点，最高 4 环；*次级复原术*，消耗 2 点；或*群体治疗伤口*，消耗 5 点。\n\n每日黎明恢复已消耗的 1d6+4 点充能。若消耗最后一点，掷 d20；结果为 1 时，法杖在闪光中消失，永久失去。"
  },
  "itemHelp.nativeMeta.staff-of-healing": {
    "en": "Staff, rare (requires attunement by a bard, cleric, or druid)",
    "zh-CN": "法杖，珍稀（须由吟游诗人、牧师或德鲁伊同调）"
  },
  "itemHelp.native.staff-of-power": {
    "en": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.\n\nThe staff has 20 charges for the following properties. The staff regains 2d8+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff retains its +2 bonus to attack and damage rolls but loses all other properties. On a 20, the staff regains 1d8+2 charges.\n\n***Power Strike***. When you hit with a melee attack using the staff, you can expend 1 charge to deal an extra 1d6 force damage to the target.\n\n***Spells***. While holding this staff, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: *cone of cold* (5 charges), *fireball* (5th-level version, 5 charges), *globe of invulnerability* (6 charges), *hold monster* (5 charges), *levitate* (2 charges), *lightning bolt* (5th-level version, 5 charges), *magic missile* (1 charge), *ray of enfeeblement* (1 charge), or *wall of force* (5 charges).\n\n***Retributive Strike***. You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot radius sphere centered on it.\n\nYou have a 50 percent chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 × the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.\n\n**Table- Staff of Power**\n\n| Distance from Origin  | Damage                                 |\n|-----------------------|----------------------------------------|\n| 10 ft. away or closer | 8 × the number of charges in the staff |\n| 11 to 20 ft. away     | 6 × the number of charges in the staff |\n| 21 to 30 ft. away     | 4 × the number of charges in the staff |\n|                       |                                        |",
    "zh-CN": "法杖可作为魔法长棍使用，攻击检定和伤害掷骰获得 +2 加值。手持时，护甲等级、豁免和法术攻击检定获得 +2 加值。\n\n法杖拥有 20 点充能，可用于以下特性，每日黎明恢复已消耗的 2d8+4 点。若消耗最后一点，掷 d20：结果为 1 时，保留攻击检定和伤害掷骰的 +2 加值，但失去所有其他特性；结果为 20 时，恢复 1d8+2 点充能。\n\n**强力打击。**以法杖近战攻击命中时，可消耗 1 点充能，对目标额外造成 1d6 点力场伤害。\n\n**法术。**手持时，可用一个动作消耗 1 点或更多充能，使用你的法术豁免难度和法术攻击加值，施放以下法术之一：*寒冰锥*，5 点；*火球术*的 5 环版本，5 点；*无敌法球*，6 点；*定身怪物*，5 点；*浮空术*，2 点；*闪电束*的 5 环版本，5 点；*魔法飞弹*，1 点；*衰弱射线*，1 点；或*力场墙*，5 点。\n\n**报复打击。**可用一个动作在膝盖或坚硬表面上折断法杖。法杖被摧毁，剩余魔法在以它为中心、半径 30 英尺的球形区域中爆炸。\n\n你有 50% 的几率立即前往随机位面，避开爆炸；若未避开，则受到等于法杖剩余充能数乘以 16 的力场伤害。区域内其他生物须进行难度为 17 的敏捷豁免；失败受到由距爆炸中心距离决定的伤害，见下表，成功则伤害减半。\n\n**威力法杖表**\n\n| 距中心距离 | 伤害 |\n|------------|------|\n| 不超过 10 英尺 | 剩余充能数 × 8 |\n| 11 至 20 英尺 | 剩余充能数 × 6 |\n| 21 至 30 英尺 | 剩余充能数 × 4 |"
  },
  "itemHelp.nativeMeta.staff-of-power": {
    "en": "Staff, very rare (requires attunement by a sorcerer, warlock, or wizard)",
    "zh-CN": "法杖，极珍稀（须由术士、邪术师或法师同调）"
  },
  "itemHelp.native.staff-of-striking": {
    "en": "This staff can be wielded as a magic quarterstaff that grants a +3 bonus to attack and damage rolls made with it.\n\nThe staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d6 force damage. The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
    "zh-CN": "法杖可作为魔法长棍使用，攻击检定和伤害掷骰获得 +3 加值。\n\n法杖拥有 10 点充能。以它近战攻击命中时，可消耗至多 3 点；每消耗一点，目标额外受到 1d6 点力场伤害。每日黎明恢复已消耗的 1d6+4 点充能。若消耗最后一点，掷 d20；结果为 1 时，法杖变为非魔法长棍。"
  },
  "itemHelp.nativeMeta.staff-of-striking": {
    "en": "Staff, very rare (requires attunement)",
    "zh-CN": "法杖，极珍稀（需要同调）"
  },
  "itemHelp.native.staff-of-swarming-insects": {
    "en": "This staff has 10 charges and regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, a swarm of insects consumes and destroys the staff, then disperses.\n\n***Spells***. While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC: *giant insect* (4 charges) or *insect plague* (5 charges).\n\n***Insect Cloud***. While holding the staff, you can use an action and expend 1 charge to cause a swarm of harmless flying insects to spread out in a 30-foot radius from you. The insects remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect.",
    "zh-CN": "法杖拥有 10 点充能，每日黎明恢复已消耗的 1d6+4 点。若消耗最后一点，掷 d20；结果为 1 时，一群昆虫啃食并摧毁法杖，随后散去。\n\n**法术。**手持时，可用一个动作消耗充能，使用你的法术豁免难度，施放*巨型昆虫*，消耗 4 点；或*疫病虫群*，消耗 5 点。\n\n**虫云。**手持时，可用一个动作消耗 1 点充能，使一群无害的飞虫散布在以你为中心、半径 30 英尺的区域中，持续 10 分钟。对你以外的生物，该区域形成重度遮蔽。虫群以你为中心，随你移动；时速至少 10 英里的风会驱散虫群并结束效果。"
  },
  "itemHelp.native.staff-of-the-magi": {
    "en": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While you hold it, you gain a +2 bonus to spell attack rolls.\n\nThe staff has 50 charges for the following properties. It regains 4d6+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 20, the staff regains 1d12+1 charges.\n\n***Spell Absorption***. While holding the staff, you have advantage on saving throws against spells. In addition, you can use your reaction when another creature casts a spell that targets only you. If you do, the staff absorbs the magic of the spell, canceling its effect and gaining a number of charges equal to the absorbed spell's level. However, if doing so brings the staff's total number of charges above 50, the staff explodes as if you activated its retributive strike (see below).\n\n***Spells***. While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability: *conjure elemental* (7 charges), *dispel magic* (3 charges), *fireball* (7th-level version, 7 charges), *flaming sphere* (2 charges), *ice storm* (4 charges), *invisibility* (2 charges), *knock* (2 charges), *lightning bolt* (7th-level version, 7 charges), *passwall* (5 charges), *plane shift* (7 charges), *telekinesis* (5 charges), *wall of fire* (4 charges), or *web* (2 charges).\n\nYou can also use an action to cast one of the following spells from the staff without using any charges: *arcane lock*, *detect magic*, *enlarge/reduce*, *light*, *mage hand*, or *protection from evil and good.*\n\n***Retributive Strike***. You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot radius sphere centered on it.\n\nYou have a 50 percent chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 × the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.\n\n**Table- Staff of the Magi**\n\n| Distance from Origin  | Damage                                 |\n|-----------------------|----------------------------------------|\n| 10 ft. away or closer | 8 × the number of charges in the staff |\n| 11 to 20 ft. away     | 6 × the number of charges in the staff |\n| 21 to 30 ft. away     | 4 × the number of charges in the staff |\n|                       |                                        |",
    "zh-CN": "法杖可作为魔法长棍使用，攻击检定和伤害掷骰获得 +2 加值。手持时，法术攻击检定获得 +2 加值。\n\n法杖拥有 50 点充能，可用于以下特性，每日黎明恢复已消耗的 4d6+2 点。若消耗最后一点，掷 d20；结果为 20 时，恢复 1d12+1 点充能。\n\n**法术吸收。**手持时，抵抗法术的豁免具有优势。此外，另一生物施放只以你为目标的法术时，可使用反应，使法杖吸收其魔法，取消法术效果，并获得等于该法术环阶的充能。若充能总数因此超过 50，法杖便如同启动报复打击般爆炸，见下文。\n\n**法术。**手持时，可用一个动作消耗充能，使用你的法术豁免难度和施法属性，施放以下法术之一：*咒唤元素生物*，7 点；*解除魔法*，3 点；*火球术*的 7 环版本，7 点；*炽焰法球*，2 点；*冰风暴*，4 点；*隐身术*，2 点；*敲击术*，2 点；*闪电束*的 7 环版本，7 点；*穿墙术*，5 点；*位面转移*，7 点；*心灵遥控*，5 点；*火墙术*，4 点；或*蛛网术*，2 点。\n\n还可用一个动作施放以下法术之一，无需充能：*奥术锁*、*侦测魔法*、*变大或缩小*、*光亮术*、*法师之手*或*防护邪恶与善良*。\n\n**报复打击。**可用一个动作在膝盖或坚硬表面上折断法杖。法杖被摧毁，剩余魔法在以它为中心、半径 30 英尺的球形区域中爆炸。\n\n你有 50% 的几率立即前往随机位面，避开爆炸；若未避开，则受到等于法杖剩余充能数乘以 16 的力场伤害。区域内其他生物须进行难度为 17 的敏捷豁免；失败受到由距爆炸中心距离决定的伤害，见下表，成功则伤害减半。\n\n**法师之杖表**\n\n| 距中心距离 | 伤害 |\n|------------|------|\n| 不超过 10 英尺 | 剩余充能数 × 8 |\n| 11 至 20 英尺 | 剩余充能数 × 6 |\n| 21 至 30 英尺 | 剩余充能数 × 4 |"
  },
  "itemHelp.nativeMeta.staff-of-the-magi": {
    "en": "Staff, legendary (requires attunement by a sorcerer, warlock, or wizard)",
    "zh-CN": "法杖，传奇（须由术士、邪术师或法师同调）"
  },
  "itemHelp.native.staff-of-the-python": {
    "en": "You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake.\n\nOn your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location.\n\nIf the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them.",
    "zh-CN": "可用一个动作说出命令词，将法杖扔到 10 英尺内的地面上。法杖变为受你控制的巨型蟒蛇，按自己的先攻行动。再次用附赠动作说出命令词，可使它在原先被蟒蛇占据的空间内恢复法杖形态。\n\n你的回合中，只要未失能且蟒蛇位于 60 英尺内，就可用心念指挥它。你决定它下一回合采取的动作和移动位置，也可下达攻击敌人、守卫某地等一般命令。\n\n蟒蛇生命值降至 0 时死亡，变回法杖，随后法杖碎裂并被摧毁。若蟒蛇在生命值耗尽前变回法杖，则恢复全部生命值。"
  },
  "itemHelp.nativeMeta.staff-of-the-python": {
    "en": "Staff, uncommon (requires attunement by a cleric, druid, or warlock)",
    "zh-CN": "法杖，非普通（须由牧师、德鲁伊或邪术师同调）"
  },
  "itemHelp.native.staff-of-the-woodlands": {
    "en": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.\n\nThe staff has 10 charges for the following properties. It regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff loses its properties and becomes a nonmagical quarterstaff.\n\n***Spells***. You can use an action to expend 1 or more of the staff's charges to cast one of the following spells from it, using your spell save DC: *animal friendship* (1 charge), *awaken* (5 charges), *barkskin* (2 charges), *locate animals or plants* (2 charges), *speak with animals* (1 charge), *speak with plants* (3 charges), or *wall of thorns* (6 charges).\n\nYou can also use an action to cast the *pass without trace* spell from the staff without using any charges.\n\n***Tree Form***. You can use an action to plant one end of the staff in fertile earth and expend 1 charge to transform the staff into a healthy tree. The tree is 60 feet tall and has a 5-foot diameter trunk, and its branches at the top spread out in a 20-foot radius.\n\nThe tree appears ordinary but radiates a faint aura of transmutation magic if targeted by *detect magic*. While touching the tree and using another action to speak its command word, you return the staff to its normal form. Any creature in the tree falls when it reverts to a staff.",
    "zh-CN": "法杖可作为魔法长棍使用，攻击检定和伤害掷骰获得 +2 加值；手持时，法术攻击检定也获得 +2 加值。\n\n法杖拥有 10 点充能，可用于以下特性，每日黎明恢复已消耗的 1d6+4 点。若消耗最后一点，掷 d20；结果为 1 时，失去所有特性，变为非魔法长棍。\n\n**法术。**可用一个动作消耗 1 点或更多充能，使用你的法术豁免难度，施放以下法术之一：*动物友谊*，1 点；*启智术*，5 点；*树皮术*，2 点；*定位动植物*，2 点；*动物交谈*，1 点；*植物交谈*，3 点；或*荆棘墙*，6 点。\n\n还可用一个动作通过法杖施放*无踪行走*，无需充能。\n\n**树木形态。**可用一个动作将法杖一端插入肥沃土壤，并消耗 1 点充能，使它变为健康树木。树高 60 英尺，树干直径 5 英尺，顶部树枝伸展至半径 20 英尺。\n\n树木看似普通，但*侦测魔法*会发现微弱的变化系魔法灵光。触碰树木，并再次用一个动作说出命令词，可恢复法杖形态；树上的生物会在变回法杖时坠落。"
  },
  "itemHelp.nativeMeta.staff-of-the-woodlands": {
    "en": "Staff, rare (requires attunement by a druid)",
    "zh-CN": "法杖，珍稀（须由德鲁伊同调）"
  },
  "itemHelp.native.staff-of-thunder-and-lightning": {
    "en": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can't be used again until the next dawn.\n\n***Lightning***. When you hit with a melee attack using the staff, you can cause the target to take an extra 2d6 lightning damage.\n\n***Thunder***. When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder, audible out to 300 feet. The target you hit must succeed on a DC 17 Constitution saving throw or become stunned until the end of your next turn.\n\n***Lightning Strike***. You can use an action to cause a bolt of lightning to leap from the staff's tip in a line that is 5 feet wide and 120 feet long. Each creature in that line must make a DC 17 Dexterity saving throw, taking 9d6 lightning damage on a failed save, or half as much damage on a successful one.\n\n***Thunderclap***. You can use an action to cause the staff to issue a deafening thunderclap, audible out to 600 feet. Each creature within 60 feet of you (not including you) must make a DC 17 Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn't deafened.\n\n***Thunder and Lightning***. You can use an action to use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one.",
    "zh-CN": "法杖可作为魔法长棍使用，攻击检定和伤害掷骰获得 +2 加值。此外具有以下特性；每项使用后，都须等到下一个黎明才能再次使用该项。\n\n**闪电。**以法杖近战攻击命中时，可使目标额外受到 2d6 点闪电伤害。\n\n**雷鸣。**以法杖近战攻击命中时，可发出传至 300 英尺外的雷响。目标须进行难度为 17 的体质豁免；失败则震慑，直到你的下一回合结束。\n\n**闪电打击。**可用一个动作使杖尖射出宽 5 英尺、长 120 英尺的闪电线。线形区域内每个生物须进行难度为 17 的敏捷豁免；失败受到 9d6 点闪电伤害，成功则伤害减半。\n\n**雷响。**可用一个动作发出震耳雷声，可传至 600 英尺外。你以外的、60 英尺内的每个生物须进行难度为 17 的体质豁免；失败受到 2d6 点雷鸣伤害，并耳聋 1 分钟；成功则伤害减半，且不会耳聋。\n\n**雷电齐发。**可用一个动作同时使用闪电打击和雷响；这不会消耗那两项特性的每日使用次数，只消耗雷电齐发本身的次数。"
  },
  "itemHelp.native.staff-of-withering": {
    "en": "This staff has 3 charges and regains 1d3 expended charges daily at dawn.\n\nThe staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to deal an extra 2d10 necrotic damage to the target. In addition, the target must succeed on a DC 15 Constitution saving throw or have disadvantage for 1 hour on any ability check or saving throw that uses Strength or Constitution.",
    "zh-CN": "法杖拥有 3 点充能，每日黎明恢复已消耗的 1d3 点。\n\n法杖可作为魔法长棍使用，命中时造成普通长棍伤害；可消耗 1 点充能，使目标额外受到 2d10 点黯蚀伤害。此外，目标须进行难度为 15 的体质豁免；失败则在 1 小时内，所有使用力量或体质的属性检定和豁免具有劣势。"
  },
  "itemHelp.nativeMeta.staff-of-withering": {
    "en": "Staff, rare (requires attunement by a cleric, druid, or warlock)",
    "zh-CN": "法杖，珍稀（须由牧师、德鲁伊或邪术师同调）"
  },
  "itemHelp.native.sun-blade": {
    "en": "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the *sun blade*.\n\nYou gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.\n\nThe sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
    "zh-CN": "物品看起来像一个长剑剑柄。握住时，可用附赠动作使纯粹光耀组成的剑刃出现或消失。剑刃存在期间，这把魔法长剑具有灵巧属性；熟练短剑或长剑的生物也熟练*阳炎剑*。\n\n用此武器攻击时，攻击检定和伤害掷骰获得 +2 加值；它造成光耀伤害，替代挥砍伤害。命中亡灵时，目标额外受到 1d8 点光耀伤害。\n\n剑刃照亮半径 15 英尺的明亮区域，以及其外再延伸 15 英尺的微光区域；这种光属于阳光。剑刃存在期间，可用一个动作分别将明亮和微光区域的半径增加或减少 5 英尺，各自最大为 30 英尺，最小为 10 英尺。"
  },
  "itemHelp.nativeMeta.sun-blade": {
    "en": "Weapon (longsword), rare (requires attunement)",
    "zh-CN": "武器（长剑），珍稀（需要同调）"
  },
  "itemHelp.native.sword-of-life-stealing": {
    "en": "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 3d6 necrotic damage, provided that the target isn't a construct or an undead. You gain temporary hit points equal to the extra damage dealt.",
    "zh-CN": "用此魔法武器攻击生物且攻击骰掷出 20 时，只要目标并非构装生物或亡灵，便额外受到 3d6 点黯蚀伤害。你获得等于这份额外伤害的临时生命值。"
  },
  "itemHelp.native.sword-of-sharpness": {
    "en": "When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.\n\nWhen you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 4d6 slashing damage. Then roll another d20. If you roll a 20, you lop off one of the target's limbs, with the effect of such loss determined by the GM. If the creature has no limb to sever, you lop off a portion of its body instead.\n\nIn addition, you can speak the sword's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
    "zh-CN": "用此魔法剑攻击物体并命中时，对目标的武器伤害骰取最大值。\n\n攻击生物且攻击骰掷出 20 时，目标额外受到 4d6 点挥砍伤害。随后再掷 d20；若仍为 20，则斩断目标的一条肢体，后果由 DM 决定；若没有可斩断的肢体，则斩下身体的一部分。\n\n此外，可说出命令词，使剑刃照亮半径 10 英尺的明亮区域，以及其外再延伸 10 英尺的微光区域。再次说出命令词，或将剑入鞘，光便熄灭。"
  },
  "itemHelp.nativeMeta.sword-of-sharpness": {
    "en": "Weapon (any sword that deals slashing damage), very rare (requires attunement)",
    "zh-CN": "武器（任意造成挥砍伤害的剑），极珍稀（需要同调）"
  },
  "itemHelp.native.sword-of-wounding": {
    "en": "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.\n\nOnce per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
    "zh-CN": "被此武器伤害而损失的生命值，只能通过短休或长休恢复；再生、魔法或其他手段均无法恢复。\n\n每回合一次，用此魔法武器攻击并命中生物时，可使其受创。目标每个回合开始时，每次你造成的创伤都会使其受到 1d4 点黯蚀伤害；随后可进行难度为 15 的体质豁免，成功则结束自身全部这类创伤效果。目标或其 5 英尺内的另一个生物也可用一个动作进行难度为 15 的感知（医药）检定，成功则结束创伤效果。"
  },
  "itemHelp.native.trident-of-fish-command": {
    "en": "This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast *dominate beast* (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.",
    "zh-CN": "三叉戟是魔法武器，拥有 3 点充能。携带时，可用一个动作消耗 1 点充能，对具有天生游泳速度的野兽施放*支配野兽*，豁免难度为 15。每日黎明恢复已消耗的 1d3 点充能。"
  },
  "itemHelp.nativeMeta.trident-of-fish-command": {
    "en": "Weapon (trident), uncommon (requires attunement)",
    "zh-CN": "武器（三叉戟），非普通（需要同调）"
  },
  "itemHelp.native.vicious-weapon": {
    "en": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type.",
    "zh-CN": "用此魔法武器攻击且攻击骰掷出 20 时，重击额外造成 2d6 点武器同类型伤害。"
  },
  "itemHelp.nativeMeta.vicious-weapon": {
    "en": "Weapon (any), rare",
    "zh-CN": "武器（任意），珍稀"
  },
  "itemHelp.native.vorpal-sword": {
    "en": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage.\n\nWhen you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the GM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得 +3 加值。此外，武器无视挥砍伤害抗性。\n\n攻击至少有一个头的生物且攻击骰掷出 20 时，斩下其中一个头；若无法在失去该头后生存，目标死亡。若生物免疫挥砍伤害、没有头或不需要头、拥有传奇动作，或 DM 判断其体型太大，无法用此武器斩首，则免疫此效果，改为在该次命中中额外受到 6d8 点挥砍伤害。"
  },
  "itemHelp.nativeMeta.vorpal-sword": {
    "en": "Weapon (any sword that deals slashing damage), legendary (requires attunement)",
    "zh-CN": "武器（任意造成挥砍伤害的剑），传奇（需要同调）"
  },
  "itemHelp.native.weapon-1-2-or-3": {
    "en": "You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon's rarity.",
    "zh-CN": "使用这件魔法武器进行攻击时，攻击检定和伤害掷骰获得加值，数值由武器的稀有度决定。"
  },
  "itemHelp.nativeMeta.weapon-1-2-or-3": {
    "en": "Weapon (any), uncommon (+1), rare (+2), or very rare (+3)",
    "zh-CN": "武器（任意），非普通（+1）、珍稀（+2）或极珍稀（+3）"
  }
});
