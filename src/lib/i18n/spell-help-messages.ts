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
  }
});
