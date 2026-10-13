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
  }
});
