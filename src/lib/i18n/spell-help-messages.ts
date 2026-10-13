import { defineMessages } from "./catalog.ts";

// Original source-bound SRD 5.1 translations; canonical mechanics remain untouched.
export const SPELL_HELP_MESSAGES = defineMessages({
  "spellHelp.native.fire-bolt": {
    "en": "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.\n\nThis spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
    "zh-CN": "你向施法距离内的一个生物或物体掷出一团火焰。对目标进行一次远程法术攻击。命中时，目标受到 1d10 点火焰伤害。被此法术命中的易燃物体若未被穿戴或携带，便会燃烧。\n\n此法术的伤害在你达到 5 级时增加 1d10（2d10），11 级时增加至 3d10，17 级时增加至 4d10。"
  },
  "spellHelp.native.light": {
    "en": "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.\n\nIf you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
    "zh-CN": "你触碰一个任一方向尺寸都不超过 10 英尺的物体。法术结束前，该物体在 20 英尺半径内发出明亮光照，并在其外侧另一个 20 英尺范围内发出微光。光的颜色由你决定。用不透明物体完全遮住目标即可挡住光。你再次施放此法术，或以一个动作解除它时，法术结束。\n\n如果目标物体被一个敌对生物持握或穿戴，该生物必须成功通过一次敏捷豁免，才能避开此法术。"
  },
  "spellHelp.native.mage-hand": {
    "en": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.\n\nYou can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.\n\nThe hand can't attack, activate magic items, or carry more than 10 pounds.",
    "zh-CN": "一只幽灵般的漂浮手掌出现在施法距离内你选定的一点。它在法术持续时间内存在，或直到你以一个动作解除它。如果它距离你超过 30 英尺，或你再次施放此法术，手掌便会消失。\n\n你可以用一个动作控制手掌，使其操作物体、打开未上锁的门或容器、从打开的容器中取出或放入物品，或倒出小瓶中的东西。每次使用手掌时，你可以使其移动至多 30 英尺。\n\n手掌不能攻击、启动魔法物品，也不能携带超过 10 磅的物品。"
  },
  "spellHelp.native.cure-wounds": {
    "en": "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.",
    "zh-CN": "你触碰的一个生物恢复生命值，数值等于 1d8 + 你的施法属性调整值。此法术对不死生物和构装体无效。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，治疗量便增加 1d8。"
  },
  "spellHelp.native.detect-magic": {
    "en": "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "zh-CN": "在法术持续时间内，你能感知自身周围 30 英尺内是否存在魔法。如果以此方式感知到魔法，你可以用一个动作，看见区域内带有魔法且你能看见的生物或物体周围的微弱灵光，并得知其魔法学派（如果有）。\n\n此法术能穿透大多数障碍，但会被 1 英尺厚的石头、1 英寸厚的普通金属、一层薄铅板，或 3 英尺厚的木材或泥土阻挡。"
  },
  "spellHelp.native.mage-armor": {
    "en": "You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.",
    "zh-CN": "你触碰一个未穿着护甲且自愿接受法术的生物。一股具有保护作用的魔法力量环绕着它，直到法术结束。目标的基础护甲等级变为 13 + 其敏捷调整值。如果目标穿上护甲，或你以一个动作解除此法术，法术便会结束。"
  },
  "spellHelp.native.magic-missile": {
    "en": "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st.",
    "zh-CN": "你创造出三枚发光的魔法力场飞弹。每枚飞弹都会命中施法距离内你选定且能看见的一个生物。每枚飞弹对目标造成 1d4 + 1 点力场伤害。所有飞弹同时命中，你可以让它们击中同一个生物，也可以分配给多个生物。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，便额外产生一枚飞弹。"
  },
  "spellHelp.native.shield": {
    "en": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from *magic missile*.",
    "zh-CN": "一道无形的魔法力场屏障出现并保护你。直到你的下一回合开始，你的护甲等级获得 +5 加值，包括对触发此法术的那次攻击生效；你也不会受到*魔法飞弹*的伤害。"
  },
  "spellHelp.native.druidcraft": {
    "en": "Whispering to the spirits of nature, you create one of the following effects within range:\n\n- You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.\n- You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.\n- You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.\n- You instantly light or snuff out a candle, a torch, or a small campfire.",
    "zh-CN": "你向自然之灵低声祈语，在施法距离内创造以下效果之一：\n\n- 创造一个微小、无害的感官效果，预测你所在地点未来 24 小时的天气。例如，金色光球代表晴天，云朵代表雨天，飘落的雪花代表下雪。此效果持续 1 轮。\n- 使一朵花立刻绽放、一个种荚打开，或一个叶芽展开。\n- 创造一个瞬间、无害的感官效果，例如落叶、一阵微风、小动物的叫声，或淡淡的臭鼬气味。效果必须容纳在边长 5 英尺的立方体内。\n- 立刻点燃或熄灭一支蜡烛、一根火把或一小堆篝火。"
  },
  "spellHelp.native.guidance": {
    "en": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.",
    "zh-CN": "你触碰一个自愿接受法术的生物。法术结束前，目标可以在自己选择的一次属性检定中掷 1d4，并将结果加到该检定上，仅限一次。目标可以在进行属性检定之前或之后掷这枚骰子。随后法术结束。"
  },
  "spellHelp.native.mending": {
    "en": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.\n\nThis spell can physically repair a magic item or construct, but the spell can't restore magic to such an object.",
    "zh-CN": "此法术修复你触碰的物体上的一处断裂或撕裂，例如断开的链环、断成两半的钥匙、撕破的斗篷或漏酒的酒囊。只要损坏处在任何方向上都不超过 1 英尺，你就能将其修复，不留原先损坏的痕迹。\n\n此法术能修复魔法物品或构装体的实体损伤，但不能恢复其魔法。"
  },
  "spellHelp.native.poison-spray": {
    "en": "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage.\n\nThis spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
    "zh-CN": "你向施法距离内一个能看见的生物伸出手，从掌心喷出一团毒气。该生物必须成功通过一次体质豁免，否则受到 1d12 点毒素伤害。\n\n此法术的伤害在你达到 5 级时增加 1d12（2d12），11 级时增加至 3d12，17 级时增加至 4d12。"
  },
  "spellHelp.native.prestidigitation": {
    "en": "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within Range:\n\n- You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.\n- You instantaneously light or snuff out a candle, a torch, or a small campfire.\n- You instantaneously clean or soil an object no larger than 1 cubic foot.\n- You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.\n- You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.\n- You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.\n\nIf you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "zh-CN": "这是初学施法者练习时使用的小魔法。你在施法距离内创造以下魔法效果之一：\n\n- 创造一个瞬间、无害的感官效果，例如一阵火花、一股微风、微弱的音符或奇怪的气味。\n- 立刻点燃或熄灭一支蜡烛、一根火把或一小堆篝火。\n- 立刻清洁或弄脏一个体积不超过 1 立方英尺的物体。\n- 使至多 1 立方英尺的非生命物质变冷、变暖或改变味道，持续 1 小时。\n- 使一个物体或表面出现颜色、小记号或符号，持续 1 小时。\n- 创造一个能放在手中的非魔法小饰物或幻影，持续到你的下一回合结束。\n\n多次施放此法术时，你可以同时维持至多 3 个非瞬间效果，并能以一个动作解除其中一个。"
  },
  "spellHelp.native.ray-of-frost": {
    "en": "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.\n\nThe spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "zh-CN": "一道寒冷的蓝白色光束射向施法距离内的一个生物。对目标进行一次远程法术攻击。命中时，目标受到 1d8 点冷冻伤害，速度降低 10 英尺，持续到你的下一回合开始。\n\n此法术的伤害在你达到 5 级时增加 1d8（2d8），11 级时增加至 3d8，17 级时增加至 4d8。"
  },
  "spellHelp.native.resistance": {
    "en": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.",
    "zh-CN": "你触碰一个自愿接受法术的生物。法术结束前，目标可以在自己选择的一次豁免中掷 1d4，并将结果加到该豁免上，仅限一次。目标可以在进行豁免之前或之后掷这枚骰子。随后法术结束。"
  },
  "spellHelp.native.sacred-flame": {
    "en": "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.\n\nThe spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "zh-CN": "火焰般的光辉降临到施法距离内一个你能看见的生物身上。目标必须成功通过一次敏捷豁免，否则受到 1d8 点光耀伤害。目标在这次豁免中不能获得掩护带来的好处。\n\n此法术的伤害在你达到 5 级时增加 1d8（2d8），11 级时增加至 3d8，17 级时增加至 4d8。"
  },
  "spellHelp.native.shocking-grasp": {
    "en": "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can't take reactions until the start of its next turn.\n\nThe spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "zh-CN": "闪电从你手中迸发，电击你试图触碰的生物。对目标进行一次近战法术攻击。如果目标穿着金属制成的护甲，你的攻击检定具有优势。命中时，目标受到 1d8 点闪电伤害，并且直到它的下一回合开始前都不能执行反应。\n\n此法术的伤害在你达到 5 级时增加 1d8（2d8），11 级时增加至 3d8，17 级时增加至 4d8。"
  },
  "spellHelp.native.thaumaturgy": {
    "en": "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within Range:\n\n- Your voice booms up to three times as loud as normal for 1 minute.\n- You cause flames to flicker, brighten, dim, or change color for 1 minute.\n- You cause harmless tremors in the ground for 1 minute.\n- You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers.\n- You instantaneously cause an unlocked door or window to fly open or slam shut.\n- You alter the appearance of your eyes for 1 minute. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.",
    "zh-CN": "你在施法距离内显现一项小奇迹，展露超自然力量。你创造以下魔法效果之一：\n\n- 使你的声音变得洪亮，音量至多为平常的 3 倍，持续 1 分钟。\n- 使火焰闪烁、变亮、变暗或改变颜色，持续 1 分钟。\n- 使地面产生无害的震动，持续 1 分钟。\n- 使施法距离内你选定的一点瞬间发出声音，例如雷鸣、渡鸦的叫声或不祥的低语。\n- 使一扇未上锁的门或窗立刻打开或砰然关上。\n- 改变你的双眼外观，持续 1 分钟。多次施放此法术时，你可以同时维持至多 3 个持续 1 分钟的效果，并能以一个动作解除其中一个。"
  },
  "spellHelp.native.bane": {
    "en": "Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "zh-CN": "施法距离内至多 3 个你选定且能看见的生物必须进行魅力豁免。未通过豁免的目标在法术结束前，每次进行攻击检定或豁免时，都必须掷 1d4，并从该攻击检定或豁免中减去结果。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就能额外指定一个目标。"
  },
  "spellHelp.native.bless": {
    "en": "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "zh-CN": "你祝福施法距离内至多 3 个你选定的生物。法术结束前，目标每次进行攻击检定或豁免时，都可以掷 1d4，并将结果加到该攻击检定或豁免上。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就能额外指定一个目标。"
  },
  "spellHelp.native.burning-hands": {
    "en": "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.\n\nThe fire ignites any flammable objects in the area that aren't being worn or carried.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "zh-CN": "你将双手拇指相抵、其余手指张开，一片火焰从伸出的指尖喷出。15 英尺锥形区域内的每个生物都必须进行敏捷豁免。豁免失败的生物受到 3d6 点火焰伤害；豁免成功则受到一半伤害。\n\n火焰会点燃区域内未被穿戴或携带的易燃物体。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，伤害便增加 1d6。"
  },
  "spellHelp.native.charm-person": {
    "en": "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "zh-CN": "你试图魅惑施法距离内一个能看见的类人生物。它必须进行感知豁免；如果你或你的同伴正在与它战斗，它在这次豁免中具有优势。豁免失败时，它被你魅惑，直到法术结束，或你及你的同伴对它做出任何有害行为。被魅惑的生物将你视为友善的熟人。法术结束时，该生物会知道自己曾被你魅惑。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就能额外指定一个目标。指定目标时，这些生物彼此之间的距离必须在 30 英尺以内。"
  },
  "spellHelp.native.command": {
    "en": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn't understand your language, or if your command is directly harmful to it.\n\nSome typical commands and their effects follow. You might issue a command other than one described here. If you do so, the GM determines how the target behaves. If the target can't follow your command, the spell ends.\n\n***Approach***. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.\n\n***Drop***. The target drops whatever it is holding and then ends its turn.\n\n***Flee***. The target spends its turn moving away from you by the fastest available means.\n\n***Grovel***. The target falls prone and then ends its turn.\n\n***Halt***. The target doesn't move and takes no actions.\n\nA flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "zh-CN": "你向施法距离内一个能看见的生物发出一个词的命令。目标必须成功通过一次感知豁免，否则在它的下一回合服从命令。如果目标是不死生物、不理解你的语言，或命令会直接伤害它，此法术无效。\n\n下面列出一些常见命令及其效果。你也可以发出其他命令，由 DM 决定目标如何行动。如果目标无法服从命令，法术结束。\n\n***靠近。*** 目标沿最短、最直接的路线向你移动；进入你周围 5 英尺内后，它的回合结束。\n\n***丢下。*** 目标丢下手中持握的东西，随后结束回合。\n\n***逃跑。*** 目标以可用的最快方式，在它的回合里远离你。\n\n***趴下。*** 目标倒地，随后结束回合。\n\n***停止。*** 目标不移动，也不执行动作。\n\n飞行生物若能停留在空中，就会保持飞行。如果必须移动才能维持飞行，它会飞行保持在空中所需的最短距离。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就能额外影响一个生物。指定目标时，这些生物彼此之间的距离必须在 30 英尺以内。"
  },
  "spellHelp.native.disguise-self": {
    "en": "You make yourself-including your clothing, armor, weapons, and other belongings on your person- look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.\n\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.\n\nTo discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC.",
    "zh-CN": "你使自己以及身上的衣服、护甲、武器和其他物品呈现不同的外观，直到法术结束，或你以一个动作解除它。你可以看起来比实际矮或高 1 英尺，也可以显得瘦、胖或介于两者之间。你不能改变身体类型，因此采用的形态必须具有相同的基本肢体结构。除此之外，幻象的具体外观由你决定。\n\n此法术造成的变化无法经受实体接触检验。例如，如果你用它在装束上增加一顶帽子，物体会穿过帽子；触碰帽子的人会摸不到东西，或摸到你的头和头发。如果你让自己显得更瘦，伸手触碰你的人会在手看起来仍悬在半空时碰到你的身体。\n\n一个生物可以用一个动作检查你的外观，并以你的法术豁免 DC 为难度进行智力（调查）检定。检定成功便能识破你的伪装。"
  },
  "spellHelp.native.entangle": {
    "en": "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain.\n\nA creature in the area when you cast the spell must succeed on a Strength saving throw or be restrained by the entangling plants until the spell ends. A creature restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself.\n\nWhen the spell ends, the conjured plants wilt away.",
    "zh-CN": "抓握的杂草和藤蔓从地面长出，覆盖以施法距离内一点为起点、边长 20 英尺的正方形区域。在法术持续时间内，这些植物使区域内的地面成为困难地形。\n\n施放法术时位于区域内的生物必须成功通过一次力量豁免，否则被植物束缚，直到法术结束。被植物束缚的生物可以用一个动作，以你的法术豁免 DC 为难度进行力量检定；成功便能挣脱。\n\n法术结束时，召来的植物枯萎消失。"
  },
  "spellHelp.native.faerie-fire": {
    "en": "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.\n\nAny attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can't benefit from being invisible.",
    "zh-CN": "施法距离内一个边长 20 英尺的立方体中的每个物体，都被蓝色、绿色或紫色的光勾勒出轮廓，颜色由你选择。施放法术时位于区域内的生物若未通过敏捷豁免，也会被光勾勒。在法术持续时间内，物体和受影响的生物在周围 10 英尺半径内发出微光。\n\n只要攻击者能看见受影响的生物或物体，对其进行的任何攻击检定都具有优势；受影响的生物或物体也不能获得隐形带来的好处。"
  },
  "spellHelp.native.feather-fall": {
    "en": "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature.",
    "zh-CN": "选择施法距离内至多 5 个正在坠落的生物。直到法术结束，它们的下落速度减慢至每轮 60 英尺。如果一个生物在法术结束前落地，它不会受到坠落伤害，并能双脚着地；随后此法术对该生物结束。"
  },
  "spellHelp.native.goodberry": {
    "en": "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day.\n\nThe berries lose their potency if they have not been consumed within 24 hours of the casting of this spell.",
    "zh-CN": "至多 10 颗浆果出现在你手中，并在有效期内蕴含魔法。一个生物可以用一个动作吃下一颗浆果。食用一颗浆果可恢复 1 点生命值，并提供足够维持该生物一天的营养。\n\n施放此法术后 24 小时内未被吃掉的浆果会失去效力。"
  },
  "spellHelp.native.healing-word": {
    "en": "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st.",
    "zh-CN": "施法距离内一个你选定且能看见的生物恢复生命值，数值等于 1d4 + 你的施法属性调整值。此法术对不死生物和构装体无效。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，治疗量便增加 1d4。"
  },
  "spellHelp.native.silent-image": {
    "en": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.\n\nYou can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.\n\nPhysical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.",
    "zh-CN": "你创造一个物体、生物或其他可见现象的影像，其尺寸不能超过边长 15 英尺的立方体。影像出现在施法距离内的一点，并在法术持续时间内存在。影像只有视觉效果，不伴随声音、气味或其他感官效果。\n\n你可以用一个动作，使影像移动到施法距离内的任意一点。移动时，你可以改变影像的外观，使其移动显得自然。例如，移动一个生物的影像时，可以让它看起来正在行走。\n\n与影像发生实体接触会暴露它是幻象，因为物体可以穿过它。一个生物可以用一个动作检查影像，并以你的法术豁免 DC 为难度进行智力（调查）检定；成功便能识破幻象。识破幻象的生物可以看穿影像。"
  },
  "spellHelp.native.sleep": {
    "en": "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).\n\nStarting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.\n\nUndead and creatures immune to being charmed aren't affected by this spell.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st.",
    "zh-CN": "此法术使生物陷入魔法沉睡。掷 5d8，结果总和决定此法术可以影响的生物生命值总量。以施法距离内你选定的一点为中心，20 英尺内的生物按当前生命值从低到高依次受到影响，忽略已经失去意识的生物。\n\n从当前生命值最低的生物开始，每个受影响的生物都失去意识，直到法术结束、受到伤害，或有人用一个动作摇晃或拍打它，将其唤醒。影响一个生物后，从剩余总量中减去该生物的生命值，再考虑生命值次低的生物。一个生物的生命值必须不超过剩余总量，才能受到影响。\n\n不死生物以及免疫魅惑的生物不受此法术影响。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就额外掷 2d8。"
  },
  "spellHelp.native.thunderwave": {
    "en": "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn't pushed.\n\nIn addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, and the spell emits a thunderous boom audible out to 300 feet.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "zh-CN": "一股雷鸣般的冲击力从你身上向外扫出。以你为起点、边长 15 英尺的立方体内，每个生物都必须进行体质豁免。豁免失败时，生物受到 2d8 点雷鸣伤害，并被推离你 10 英尺；豁免成功时，受到一半伤害，且不会被推动。\n\n此外，完全位于效果区域内且未被固定的物体，会自动被推离你 10 英尺。此法术还会发出雷鸣般的巨响，在 300 英尺外都能听见。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，伤害便增加 1d8。"
  },
  "spellHelp.native.acid-splash": {
    "en": "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.\n\nThis spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "zh-CN": "你掷出一团酸液。选择施法距离内一个能看见的生物，或选择两个你能看见且彼此相距不超过 5 英尺的生物。目标必须成功通过一次敏捷豁免，否则受到 1d6 点强酸伤害。\n\n此法术的伤害在你达到 5 级时增加 1d6（2d6），11 级时增加至 3d6，17 级时增加至 4d6。"
  },
  "spellHelp.native.chill-touch": {
    "en": "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target.\n\nIf you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.\n\nThis spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "zh-CN": "你在施法距离内一个生物所在的位置创造一只幽灵般的骷髅手。对该生物进行一次远程法术攻击，以墓穴的寒意侵袭它。命中时，目标受到 1d8 点黯蚀伤害，并且直到你的下一回合开始前都不能恢复生命值。在此之前，骷髅手一直附着在目标身上。\n\n如果命中的是不死生物，它对你的攻击检定还会具有劣势，持续到你的下一回合结束。\n\n此法术的伤害在你达到 5 级时增加 1d8（2d8），11 级时增加至 3d8，17 级时增加至 4d8。"
  },
  "spellHelp.native.dancing-lights": {
    "en": "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.\n\nAs a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell's range.",
    "zh-CN": "你在施法距离内创造至多 4 个火把大小的光源，使其呈现为火把、提灯或发光球体，并在法术持续时间内悬浮于空中。你也可以将这 4 个光源组合成一个大致呈类人形态的中型发光形体。无论选择何种形态，每个光源都会在 10 英尺半径内发出微光。\n\n在你的回合，你可以用一个附赠动作，将光源移动至多 60 英尺，到达施法距离内的新位置。每个光源都必须位于此法术创造的另一个光源周围 20 英尺以内；超出施法距离的光源会熄灭。"
  },
  "spellHelp.native.eldritch-blast": {
    "en": "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\n\nThe spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.",
    "zh-CN": "一道噼啪作响的能量束射向施法距离内的一个生物。对目标进行一次远程法术攻击。命中时，目标受到 1d10 点力场伤害。\n\n达到更高等级后，此法术会创造多道能量束：5 级时为 2 道，11 级时为 3 道，17 级时为 4 道。你可以让它们攻击同一目标或不同目标，每道能量束分别进行攻击检定。"
  },
  "spellHelp.native.message": {
    "en": "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.\n\nYou can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings.",
    "zh-CN": "你用手指指向施法距离内的一个生物，低声传递一条讯息。只有目标能听见，并且它可以低声回复，回复只有你能听见。\n\n如果你熟悉目标，并知道它位于障碍物另一侧，就可以隔着实体物体施放此法术。魔法造成的寂静、1 英尺厚的石头、1 英寸厚的普通金属、一层薄铅板或 3 英尺厚的木材会阻挡法术。讯息不必沿直线传递，可以自由绕过转角或穿过开口。"
  },
  "spellHelp.native.minor-illusion": {
    "en": "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.\n\nIf you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.\n\nIf you create an image of an object-such as a chair, muddy footprints, or a small chest-it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.\n\nIf a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.",
    "zh-CN": "你在施法距离内创造一个声音或一个物体的影像，在法术持续时间内存在。你以一个动作解除幻象或再次施放此法术时，幻象也会结束。\n\n创造声音时，其音量可以从耳语到尖叫。声音可以是你或他人的嗓音、狮吼、鼓声或其他你选择的声音。它可以在整个持续时间内连续响起，也可以在法术结束前的不同时刻分别发声。\n\n创造物体影像时，例如椅子、泥泞脚印或小箱子，其尺寸不能超过边长 5 英尺的立方体。影像不能产生声音、光、气味或其他感官效果。与影像发生实体接触会暴露它是幻象，因为物体可以穿过它。\n\n一个生物可以用一个动作检查声音或影像，并以你的法术豁免 DC 为难度进行智力（调查）检定；成功便能识破幻象。识破幻象的生物会觉得幻象变得模糊微弱。"
  },
  "spellHelp.native.produce-flame": {
    "en": "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.\n\nYou can also attack with the flame, although doing so ends the spell. When you cast this spell, or as an action on a later turn, you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 fire damage.\n\nThis spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "zh-CN": "一团摇曳的火焰出现在你手中，在法术持续时间内存在，不会伤害你或你的装备。火焰在 10 英尺半径内发出明亮光照，并在其外侧另一个 10 英尺范围内发出微光。你以一个动作解除法术或再次施放它时，法术结束。\n\n你也可以用火焰攻击，但这样会结束法术。施放此法术时，或在之后的回合用一个动作，你可以将火焰掷向周围 30 英尺内的一个生物。进行一次远程法术攻击；命中时，目标受到 1d8 点火焰伤害。\n\n此法术的伤害在你达到 5 级时增加 1d8（2d8），11 级时增加至 3d8，17 级时增加至 4d8。"
  },
  "spellHelp.native.shillelagh": {
    "en": "The wood of a club or quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn't already. The spell ends if you cast it again or if you let go of the weapon.",
    "zh-CN": "你持握的一根木棒或长棍的木材被注入自然之力。在法术持续时间内，使用该武器进行近战攻击时，你可以用施法属性替代力量，计算攻击检定和伤害掷骰；武器的伤害骰变为 1d8。如果武器原本不是魔法武器，它也会成为魔法武器。你再次施放此法术或松开武器时，法术结束。"
  },
  "spellHelp.native.spare-the-dying": {
    "en": "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
    "zh-CN": "你触碰一个生命值为 0 的活着的生物，使其伤势稳定。此法术对不死生物和构装体无效。"
  },
  "spellHelp.native.true-strike": {
    "en": "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended.",
    "zh-CN": "你伸出手，用手指指向施法距离内的一个目标。魔法使你短暂洞悉目标的防御。只要此法术尚未结束，你在下一回合对该目标进行的第一次攻击检定便具有优势。"
  },
  "spellHelp.native.vicious-mockery": {
    "en": "You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn.\n\nThis spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
    "zh-CN": "你对施法距离内一个能看见的生物发出一连串暗藏魔法的辱骂。如果目标能听见你，即使不理解你的话，也必须成功通过一次感知豁免，否则受到 1d4 点心灵伤害，并在它的下一回合结束前进行的下一次攻击检定中具有劣势。\n\n此法术的伤害在你达到 5 级时增加 1d4（2d4），11 级时增加至 3d4，17 级时增加至 4d4。"
  },
  "spellHelp.native.alarm": {
    "en": "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.\n\nA mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.\n\nAn audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.",
    "zh-CN": "你设置一道警报，防范不受欢迎的闯入者。选择施法距离内的一扇门、一扇窗，或一个尺寸不超过边长 20 英尺立方体的区域。法术结束前，只要微型或更大的生物触碰或进入受保护区域，警报就会提醒你。施法时，你可以指定不会触发警报的生物，并选择心灵警报或声音警报。\n\n如果你位于受保护区域周围 1 英里以内，心灵警报会在你脑海中响起提示。熟睡时，这个提示也会唤醒你。\n\n声音警报会发出手铃声，持续 10 秒，周围 60 英尺内都能听见。"
  },
  "spellHelp.native.color-spray": {
    "en": "A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can't see).\n\nStarting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the end of your next turn. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st.",
    "zh-CN": "耀眼的彩色闪光从你手中迸发。掷 6d10，结果总和决定此法术可以影响的生物生命值总量。以你为起点的 15 英尺锥形区域内，生物按当前生命值从低到高依次受到影响，忽略已经失去意识或无法看见的生物。\n\n从当前生命值最低的生物开始，每个受影响的生物都目盲，直到你的下一回合结束。影响一个生物后，从剩余总量中减去它的生命值，再考虑生命值次低的生物。一个生物的生命值必须不超过剩余总量，才能受到影响。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，就额外掷 2d10。"
  },
  "spellHelp.native.comprehend-languages": {
    "en": "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.\n\nThis spell doesn't decode secret messages in a text or a glyph, such as an arcane sigil, that isn't part of a written language.",
    "zh-CN": "在法术持续时间内，你能理解听到的任何口语的字面含义。你也能理解看见的任何书面语言，但必须触碰写有文字的表面。阅读一页文字大约需要 1 分钟。\n\n此法术不能破解文字中的秘密讯息，也不能解读不属于书面语言的符文，例如奥术印记。"
  },
  "spellHelp.native.create-or-destroy-water": {
    "en": "You either create or destroy water.\n\n***Create Water***. You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area.\n\n***Destroy Water***. You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.",
    "zh-CN": "你可以创造或销毁水。\n\n***造水。*** 你在施法距离内一个敞开的容器中创造至多 10 加仑干净的水。也可以让水以雨的形式降在施法距离内一个边长 30 英尺的立方体区域中，熄灭区域内暴露的火焰。\n\n***销水。*** 你销毁施法距离内一个敞开的容器中至多 10 加仑的水。也可以消除施法距离内一个边长 30 英尺的立方体区域中的雾。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，创造或销毁的水便增加 10 加仑，或立方体的边长增加 5 英尺。"
  },
  "spellHelp.native.detect-evil-and-good": {
    "en": "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "zh-CN": "在法术持续时间内，你能知道周围 30 英尺内是否存在异怪、天界生物、元素生物、精类、邪魔或不死生物，以及它们的位置。同样，你能知道周围 30 英尺内是否存在被魔法祝圣或亵渎的地点或物体。\n\n此法术能穿透大多数障碍，但会被 1 英尺厚的石头、1 英寸厚的普通金属、一层薄铅板，或 3 英尺厚的木材或泥土阻挡。"
  },
  "spellHelp.native.detect-poison-and-disease": {
    "en": "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "zh-CN": "在法术持续时间内，你能感知周围 30 英尺内的毒素、有毒生物和疾病是否存在，以及它们的位置。你还能辨认每种毒素、有毒生物或疾病的种类。\n\n此法术能穿透大多数障碍，但会被 1 英尺厚的石头、1 英寸厚的普通金属、一层薄铅板，或 3 英尺厚的木材或泥土阻挡。"
  },
  "spellHelp.native.divine-favor": {
    "en": "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.",
    "zh-CN": "你的祈祷使你获得神圣光辉的力量。法术结束前，你的武器攻击命中时额外造成 1d4 点光耀伤害。"
  },
  "spellHelp.native.expeditious-retreat": {
    "en": "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action.",
    "zh-CN": "此法术使你能以惊人的速度移动。施放此法术时，以及法术结束前你的每个回合，你都可以用一个附赠动作执行疾走动作。"
  },
  "spellHelp.native.false-life": {
    "en": "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st.",
    "zh-CN": "你以死灵魔法模拟生命，强化自身，获得 1d4 + 4 点临时生命值，在法术持续时间内有效。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，获得的临时生命值便增加 5 点。"
  },
  "spellHelp.native.floating-disk": {
    "en": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.\n\nThe disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 10-foot deep pit, nor could it leave such a pit if it was created at the bottom.\n\nIf you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends.",
    "zh-CN": "此法术在施法距离内一个你能看见且未被占据的位置，创造一个水平的圆形力场盘。圆盘直径 3 英尺、厚 1 英寸，悬浮在离地 3 英尺的高度。它在法术持续时间内存在，能承载至多 500 磅。如果放置的重量超过上限，法术结束，盘上的一切都会掉到地上。\n\n你位于圆盘周围 20 英尺以内时，它保持不动。你离开超过 20 英尺后，它会跟随你，使自身保持在你周围 20 英尺以内。圆盘可以越过不平整的地面、上下楼梯和斜坡等，但不能跨越 10 英尺或更大的高度差。例如，它不能越过一个深 10 英尺的坑；如果在坑底被创造出来，也不能离开这个坑。\n\n你距离圆盘超过 100 英尺时，法术结束。这通常发生在圆盘无法绕过障碍物跟随你时。"
  },
  "spellHelp.native.fog-cloud": {
    "en": "You create a 20-foot radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st.",
    "zh-CN": "你以施法距离内的一点为中心，创造一个半径 20 英尺的球形雾区。雾会绕过转角扩散，其区域属于重度遮蔽。雾在法术持续时间内存在，或直到被中等或更强的风吹散，即风速至少每小时 10 英里。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，雾区半径便增加 20 英尺。"
  },
  "spellHelp.native.grease": {
    "en": "Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration.\n\nWhen the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.",
    "zh-CN": "以施法距离内一点为中心、边长 10 英尺的正方形地面被滑腻的油脂覆盖，在法术持续时间内成为困难地形。\n\n油脂出现时，站在区域内的每个生物都必须成功通过一次敏捷豁免，否则倒地。进入区域或在区域内结束回合的生物，也必须成功通过一次敏捷豁免，否则倒地。"
  },
  "spellHelp.native.guiding-bolt": {
    "en": "A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage, thanks to the mystical dim light glittering on the target until then.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "zh-CN": "一道闪光射向施法距离内你选定的一个生物。对目标进行一次远程法术攻击。命中时，目标受到 4d6 点光耀伤害；目标身上闪烁的神秘微光还会使你的下一回合结束前，对它进行的下一次攻击检定具有优势。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，伤害便增加 1d6。"
  },
  "spellHelp.native.hellish-rebuke": {
    "en": "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one.\n\n**At Higher Levels.** When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
    "zh-CN": "你伸出手指，伤害你的生物瞬间被地狱烈焰包围。该生物必须进行敏捷豁免。豁免失败时受到 2d10 点火焰伤害；豁免成功则受到一半伤害。\n\n**升环施法。** 当你使用二环或更高环阶的法术位施放此法术时，法术位每比一环高一环，伤害便增加 1d10。"
  }
});
