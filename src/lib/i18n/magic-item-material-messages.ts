import { defineMessages } from "./catalog.ts";

// Original translations of SRD 5.1 item bodies. Source text and tables are kept
// whole for display recognition; this does not change rulebook or engine data.
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
  }
});
