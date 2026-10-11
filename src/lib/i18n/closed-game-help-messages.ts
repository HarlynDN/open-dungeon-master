import { defineMessages } from "./catalog.ts";

export const CLOSED_GAME_HELP_MESSAGES = /*#__PURE__*/ defineMessages({
  "closedHelp.condition.blinded.name": {
    "en": "blinded",
    "zh-CN": "目盲"
  },
  "closedHelp.condition.blinded.blurb": {
    "en": "Cannot see. Fails any check that needs sight; attacks against it have advantage, its own attacks have disadvantage.",
    "zh-CN": "无法看见。所有需要视觉的检定都会失败；其他生物攻击它时具有优势，它的攻击具有劣势。"
  },
  "closedHelp.condition.charmed.name": {
    "en": "charmed",
    "zh-CN": "魅惑"
  },
  "closedHelp.condition.charmed.blurb": {
    "en": "Cannot attack the charmer or target them with harmful effects; the charmer has advantage on social checks against it.",
    "zh-CN": "不能攻击魅惑者，也不能以有害效果将其选为目标；魅惑者对它进行社交检定时具有优势。"
  },
  "closedHelp.condition.deafened.name": {
    "en": "deafened",
    "zh-CN": "耳聋"
  },
  "closedHelp.condition.deafened.blurb": {
    "en": "Cannot hear. Fails any check that needs hearing.",
    "zh-CN": "无法听见。所有需要听觉的检定都会失败。"
  },
  "closedHelp.condition.exhaustion.name": {
    "en": "exhaustion",
    "zh-CN": "力竭"
  },
  "closedHelp.condition.exhaustion.blurb": {
    "en": "Six worsening levels, from disadvantage on checks to death. Usually one level clears per long rest.",
    "zh-CN": "六个逐渐加重的等级，从检定劣势到死亡。通常每次长休消除一级。"
  },
  "closedHelp.condition.frightened.name": {
    "en": "frightened",
    "zh-CN": "恐慌"
  },
  "closedHelp.condition.frightened.blurb": {
    "en": "Disadvantage on checks and attacks while the source of fear is in sight, and cannot willingly move closer to it.",
    "zh-CN": "恐惧来源在视线内时，检定和攻击具有劣势；不能主动靠近恐惧来源。"
  },
  "closedHelp.condition.grappled.name": {
    "en": "grappled",
    "zh-CN": "擒抱"
  },
  "closedHelp.condition.grappled.blurb": {
    "en": "Speed becomes 0. Ends if the grappler is incapacitated or the two are forced apart.",
    "zh-CN": "速度变为 0。擒抱者失能或双方被迫分开时结束。"
  },
  "closedHelp.condition.incapacitated.name": {
    "en": "incapacitated",
    "zh-CN": "失能"
  },
  "closedHelp.condition.incapacitated.blurb": {
    "en": "Cannot take actions or reactions.",
    "zh-CN": "不能使用动作或反应。"
  },
  "closedHelp.condition.invisible.name": {
    "en": "invisible",
    "zh-CN": "隐形"
  },
  "closedHelp.condition.invisible.blurb": {
    "en": "Cannot be seen without magic or a special sense. Attacks against it have disadvantage, its attacks have advantage.",
    "zh-CN": "没有魔法或特殊感官就无法看见它。其他生物攻击它时具有劣势，它的攻击具有优势。"
  },
  "closedHelp.condition.paralyzed.name": {
    "en": "paralyzed",
    "zh-CN": "麻痹"
  },
  "closedHelp.condition.paralyzed.blurb": {
    "en": "Incapacitated and cannot move or speak. Auto-fails Strength and Dexterity saves; attacks against it have advantage and hit within 5 feet are critical.",
    "zh-CN": "失能，不能移动或说话。力量和敏捷豁免自动失败；其他生物攻击它时具有优势，在 5 英尺内命中它的攻击会造成重击。"
  },
  "closedHelp.condition.petrified.name": {
    "en": "petrified",
    "zh-CN": "石化"
  },
  "closedHelp.condition.petrified.blurb": {
    "en": "Turned to stone: incapacitated, unaware, weighs ten times as much, resists all damage, immune to poison and disease.",
    "zh-CN": "变为石头：失能、无法感知周围，重量增至十倍，抵抗所有伤害，并免疫毒素和疾病。"
  },
  "closedHelp.condition.poisoned.name": {
    "en": "poisoned",
    "zh-CN": "中毒"
  },
  "closedHelp.condition.poisoned.blurb": {
    "en": "Disadvantage on attack rolls and ability checks.",
    "zh-CN": "攻击掷骰和属性检定具有劣势。"
  },
  "closedHelp.condition.prone.name": {
    "en": "prone",
    "zh-CN": "倒地"
  },
  "closedHelp.condition.prone.blurb": {
    "en": "Must crawl or spend half its movement to stand. Disadvantage on attacks; melee attacks against it have advantage, ranged ones disadvantage.",
    "zh-CN": "必须爬行，或消耗一半移动起身。攻击具有劣势；近战攻击它具有优势，远程攻击它具有劣势。"
  },
  "closedHelp.condition.restrained.name": {
    "en": "restrained",
    "zh-CN": "束缚"
  },
  "closedHelp.condition.restrained.blurb": {
    "en": "Speed 0. Attacks against it have advantage, its attacks have disadvantage, and it has disadvantage on Dexterity saves.",
    "zh-CN": "速度为 0。其他生物攻击它时具有优势，它的攻击具有劣势，敏捷豁免也具有劣势。"
  },
  "closedHelp.condition.stunned.name": {
    "en": "stunned",
    "zh-CN": "震慑"
  },
  "closedHelp.condition.stunned.blurb": {
    "en": "Incapacitated, cannot move, speaks falteringly. Auto-fails Strength and Dexterity saves; attacks against it have advantage.",
    "zh-CN": "失能、无法移动，说话断断续续。力量和敏捷豁免自动失败；其他生物攻击它时具有优势。"
  },
  "closedHelp.condition.unconscious.name": {
    "en": "unconscious",
    "zh-CN": "昏迷"
  },
  "closedHelp.condition.unconscious.blurb": {
    "en": "Incapacitated, unaware, drops what it holds and falls prone. Auto-fails Strength and Dexterity saves; attacks have advantage and hit within 5 feet are critical.",
    "zh-CN": "失能、无法感知周围，放开所持物品并倒地。力量和敏捷豁免自动失败；攻击它具有优势，在 5 英尺内命中它的攻击会造成重击。"
  },
  "closedHelp.school.abjuration.name": {
    "en": "abjuration",
    "zh-CN": "防护"
  },
  "closedHelp.school.abjuration.blurb": {
    "en": "Protection and banishment: wards, shields, dispelling, and sending things back where they came from.",
    "zh-CN": "保护与放逐：结界、护盾、解除魔法，以及将事物送回原处。"
  },
  "closedHelp.school.conjuration.name": {
    "en": "conjuration",
    "zh-CN": "咒法"
  },
  "closedHelp.school.conjuration.blurb": {
    "en": "Bringing things into being or across distance: summoned creatures, conjured objects, teleportation.",
    "zh-CN": "创造事物或使其跨越距离：召唤生物、创造物品、传送。"
  },
  "closedHelp.school.divination.name": {
    "en": "divination",
    "zh-CN": "预言"
  },
  "closedHelp.school.divination.blurb": {
    "en": "Knowing: seeing far, reading thoughts, finding what is hidden, glimpsing what is to come.",
    "zh-CN": "获取知识：远视、读心、寻找隐藏事物、窥见未来。"
  },
  "closedHelp.school.enchantment.name": {
    "en": "enchantment",
    "zh-CN": "惑控"
  },
  "closedHelp.school.enchantment.blurb": {
    "en": "Influencing minds: charm, fear, sleep, suggestion, and commands the target cannot refuse.",
    "zh-CN": "影响心智：魅惑、恐惧、睡眠、暗示，以及目标无法拒绝的命令。"
  },
  "closedHelp.school.evocation.name": {
    "en": "evocation",
    "zh-CN": "塑能"
  },
  "closedHelp.school.evocation.blurb": {
    "en": "Raw energy: fire, lightning, cold and force, most of the blasting spells and the healing ones.",
    "zh-CN": "原始能量：火焰、闪电、寒冷与力场，大多数轰击法术和治疗法术。"
  },
  "closedHelp.school.illusion.name": {
    "en": "illusion",
    "zh-CN": "幻术"
  },
  "closedHelp.school.illusion.blurb": {
    "en": "Deceiving the senses: images, sounds, disguises and phantasms that are not really there.",
    "zh-CN": "欺骗感官：并不存在的影像、声音、伪装和幻象。"
  },
  "closedHelp.school.necromancy.name": {
    "en": "necromancy",
    "zh-CN": "死灵"
  },
  "closedHelp.school.necromancy.blurb": {
    "en": "Life and death: draining vitality, raising the dead, speaking with them, and undoing death.",
    "zh-CN": "生与死：汲取生命力、唤起死者、与死者交谈，以及逆转死亡。"
  },
  "closedHelp.school.transmutation.name": {
    "en": "transmutation",
    "zh-CN": "变化"
  },
  "closedHelp.school.transmutation.blurb": {
    "en": "Changing what is: shape, size, substance or speed of creatures and things.",
    "zh-CN": "改变事物：生物和物体的形状、大小、材质或速度。"
  },
  "closedHelp.property.ammunition.name": {
    "en": "ammunition",
    "zh-CN": "弹药"
  },
  "closedHelp.property.ammunition.blurb": {
    "en": "Needs arrows, bolts or stones to attack at range; the ammunition is spent as it is fired.",
    "zh-CN": "远程攻击需要箭、弩矢或石子；射击会消耗弹药。"
  },
  "closedHelp.property.double-headed.name": {
    "en": "double-headed",
    "zh-CN": "双头"
  },
  "closedHelp.property.double-headed.blurb": {
    "en": "A weapon with a striking end at each side; the second end can make the extra light-weapon attack, doing the die in brackets.",
    "zh-CN": "两端都能打击的武器；另一端可以进行额外的轻型武器攻击，使用括号中的伤害骰。"
  },
  "closedHelp.property.finesse.name": {
    "en": "finesse",
    "zh-CN": "灵巧"
  },
  "closedHelp.property.finesse.blurb": {
    "en": "Attack and damage may use Dexterity instead of Strength, whichever is better.",
    "zh-CN": "攻击和伤害可以使用敏捷代替力量，取较有利者。"
  },
  "closedHelp.property.gunpowder.name": {
    "en": "gunpowder",
    "zh-CN": "火药"
  },
  "closedHelp.property.gunpowder.blurb": {
    "en": "Fires with black powder, which it consumes along with the shot; wet or missing powder means it cannot fire.",
    "zh-CN": "射击消耗黑火药和弹丸；火药受潮或缺失时无法开火。"
  },
  "closedHelp.property.heavy.name": {
    "en": "heavy",
    "zh-CN": "重型"
  },
  "closedHelp.property.heavy.blurb": {
    "en": "Too big for Small creatures to use well: they attack with disadvantage.",
    "zh-CN": "对小型生物而言过大，使用时攻击具有劣势。"
  },
  "closedHelp.property.light.name": {
    "en": "light",
    "zh-CN": "轻型"
  },
  "closedHelp.property.light.blurb": {
    "en": "Small enough to fight with one in each hand (two-weapon fighting).",
    "zh-CN": "小巧到可以双手各持一件作战，即双武器战斗。"
  },
  "closedHelp.property.loading.name": {
    "en": "loading",
    "zh-CN": "装填"
  },
  "closedHelp.property.loading.blurb": {
    "en": "Slow to reload: only one shot per action, bonus action or reaction, however many attacks you have.",
    "zh-CN": "重新装填很慢：无论有多少次攻击，每个动作、附赠动作或反应都只能射击一次。"
  },
  "closedHelp.property.magazine.name": {
    "en": "magazine",
    "zh-CN": "弹匣"
  },
  "closedHelp.property.magazine.blurb": {
    "en": "Holds the number of shots in brackets; once they are spent, an action reloads it.",
    "zh-CN": "可容纳括号所示数量的弹药；耗尽后需要一个动作重新装填。"
  },
  "closedHelp.property.reach.name": {
    "en": "reach",
    "zh-CN": "长柄"
  },
  "closedHelp.property.reach.blurb": {
    "en": "Strikes 5 feet further than usual, so 10 feet away instead of 5.",
    "zh-CN": "比通常多触及 5 英尺，因此可以攻击 10 英尺外，而非 5 英尺外的目标。"
  },
  "closedHelp.property.special.name": {
    "en": "special",
    "zh-CN": "特殊"
  },
  "closedHelp.property.special.blurb": {
    "en": "Has its own rules beyond the usual attack; the DM applies them when it is used.",
    "zh-CN": "具有通常攻击之外的专属规则，由地下城主在使用时应用。"
  },
  "closedHelp.property.thrown.name": {
    "en": "thrown",
    "zh-CN": "投掷"
  },
  "closedHelp.property.thrown.blurb": {
    "en": "Can be thrown to make a ranged attack, using the same ability as a melee swing with it.",
    "zh-CN": "可以投掷进行远程攻击，使用与该武器近战攻击相同的属性。"
  },
  "closedHelp.property.two-handed.name": {
    "en": "two-handed",
    "zh-CN": "双手"
  },
  "closedHelp.property.two-handed.blurb": {
    "en": "Needs both hands to attack with, so no shield or second weapon.",
    "zh-CN": "攻击时需要双手，不能同时持盾或另一件武器。"
  },
  "closedHelp.property.versatile.name": {
    "en": "versatile",
    "zh-CN": "多用"
  },
  "closedHelp.property.versatile.blurb": {
    "en": "Usable in one hand or two; the two-handed grip does the larger damage die in brackets.",
    "zh-CN": "可单手或双手使用；双手握持时使用括号中较大的伤害骰。"
  },
  "closedHelp.damage.acid.name": {
    "en": "acid",
    "zh-CN": "强酸"
  },
  "closedHelp.damage.acid.blurb": {
    "en": "Corrosive: sprays, oozes and dissolving breath.",
    "zh-CN": "腐蚀：酸液喷射、泥怪和溶解性的吐息。"
  },
  "closedHelp.damage.bludgeoning.name": {
    "en": "bludgeoning",
    "zh-CN": "钝击"
  },
  "closedHelp.damage.bludgeoning.blurb": {
    "en": "Blunt force: clubs, hammers, fists, falling.",
    "zh-CN": "钝器冲击：棍棒、锤子、拳头和坠落。"
  },
  "closedHelp.damage.cold.name": {
    "en": "cold",
    "zh-CN": "寒冷"
  },
  "closedHelp.damage.cold.blurb": {
    "en": "Freezing: ice breath, rays of frost, winter magic.",
    "zh-CN": "冰冻：寒冰吐息、冷冻射线和寒冬魔法。"
  },
  "closedHelp.damage.fire.name": {
    "en": "fire",
    "zh-CN": "火焰"
  },
  "closedHelp.damage.fire.blurb": {
    "en": "Burning: dragon fire, fireballs, torches.",
    "zh-CN": "燃烧：龙焰、火球和火把。"
  },
  "closedHelp.damage.force.name": {
    "en": "force",
    "zh-CN": "力场"
  },
  "closedHelp.damage.force.blurb": {
    "en": "Pure magical energy; almost nothing resists it (magic missile, eldritch blast).",
    "zh-CN": "纯粹的魔法能量，几乎没有东西能抵抗，例如魔法飞弹和魔能爆。"
  },
  "closedHelp.damage.lightning.name": {
    "en": "lightning",
    "zh-CN": "闪电"
  },
  "closedHelp.damage.lightning.blurb": {
    "en": "Electricity: bolts, blue dragons, storm magic.",
    "zh-CN": "电流：闪电、蓝龙和风暴魔法。"
  },
  "closedHelp.damage.necrotic.name": {
    "en": "necrotic",
    "zh-CN": "黯蚀"
  },
  "closedHelp.damage.necrotic.blurb": {
    "en": "Withering life force: undead touches, life drain, most death magic.",
    "zh-CN": "侵蚀生命力：不死生物的触碰、生命汲取和多数死亡魔法。"
  },
  "closedHelp.damage.piercing.name": {
    "en": "piercing",
    "zh-CN": "穿刺"
  },
  "closedHelp.damage.piercing.blurb": {
    "en": "Puncture: arrows, spears, fangs.",
    "zh-CN": "刺穿：箭、矛和獠牙。"
  },
  "closedHelp.damage.poison.name": {
    "en": "poison",
    "zh-CN": "毒素"
  },
  "closedHelp.damage.poison.blurb": {
    "en": "Venom and toxins: stings, poisoned blades, poison breath.",
    "zh-CN": "毒液与毒物：蜇刺、淬毒刀刃和毒素吐息。"
  },
  "closedHelp.damage.psychic.name": {
    "en": "psychic",
    "zh-CN": "心灵"
  },
  "closedHelp.damage.psychic.blurb": {
    "en": "Mental assault: mind flayers, some enchantments, telepathic damage.",
    "zh-CN": "精神攻击：夺心魔、某些惑控效果和心灵感应伤害。"
  },
  "closedHelp.damage.radiant.name": {
    "en": "radiant",
    "zh-CN": "光耀"
  },
  "closedHelp.damage.radiant.blurb": {
    "en": "Holy light and searing brilliance: celestials, clerics' spells, the sun.",
    "zh-CN": "神圣光芒与灼亮辉光：天界生物、牧师法术和太阳。"
  },
  "closedHelp.damage.slashing.name": {
    "en": "slashing",
    "zh-CN": "挥砍"
  },
  "closedHelp.damage.slashing.blurb": {
    "en": "Cutting: swords, axes, claws.",
    "zh-CN": "切割：剑、斧和爪。"
  },
  "closedHelp.damage.thunder.name": {
    "en": "thunder",
    "zh-CN": "雷鸣"
  },
  "closedHelp.damage.thunder.blurb": {
    "en": "Concussive sound: thunderwave, shatter, a giant's shout.",
    "zh-CN": "冲击性的声音：雷鸣波、粉碎音波和巨人的吼声。"
  },
  "closedHelp.size.tiny.name": {
    "en": "tiny",
    "zh-CN": "微型"
  },
  "closedHelp.size.tiny.blurb": {
    "en": "About the size of a cat or smaller; occupies a 2.5 foot square.",
    "zh-CN": "大约猫的大小或更小，占据边长 2.5 英尺的方格。"
  },
  "closedHelp.size.small.name": {
    "en": "small",
    "zh-CN": "小型"
  },
  "closedHelp.size.small.blurb": {
    "en": "Halfling-sized; fills a 5 foot square but wields heavy weapons badly.",
    "zh-CN": "半身人的大小，占据边长 5 英尺的方格，但不擅长使用重型武器。"
  },
  "closedHelp.size.medium.name": {
    "en": "medium",
    "zh-CN": "中型"
  },
  "closedHelp.size.medium.blurb": {
    "en": "Human-sized; the default 5 foot square.",
    "zh-CN": "人类的大小，默认占据边长 5 英尺的方格。"
  },
  "closedHelp.size.large.name": {
    "en": "large",
    "zh-CN": "大型"
  },
  "closedHelp.size.large.blurb": {
    "en": "Horse or ogre sized; fills a 10 foot square.",
    "zh-CN": "马或食人魔的大小，占据边长 10 英尺的方格。"
  },
  "closedHelp.size.huge.name": {
    "en": "huge",
    "zh-CN": "巨型"
  },
  "closedHelp.size.huge.blurb": {
    "en": "Giant or young dragon sized; fills a 15 foot square.",
    "zh-CN": "巨人或青年龙的大小，占据边长 15 英尺的方格。"
  },
  "closedHelp.size.gargantuan.name": {
    "en": "gargantuan",
    "zh-CN": "超巨型"
  },
  "closedHelp.size.gargantuan.blurb": {
    "en": "Ancient dragons, krakens; 20 feet or more on a side.",
    "zh-CN": "古龙或克拉肯等，所占空间每边至少 20 英尺。"
  },
  "closedHelp.conditions": {
    "en": "Conditions",
    "zh-CN": "状态"
  },
  "closedHelp.schools": {
    "en": "Schools of magic",
    "zh-CN": "法术学派"
  },
  "closedHelp.properties": {
    "en": "Weapon properties",
    "zh-CN": "武器属性"
  },
  "closedHelp.damage": {
    "en": "Damage types",
    "zh-CN": "伤害类型"
  },
  "closedHelp.sizes": {
    "en": "Sizes",
    "zh-CN": "体型"
  },
  "closedHelp.skills": {
    "en": "Skills",
    "zh-CN": "技能"
  },
  "closedHelp.alignments": {
    "en": "Alignments",
    "zh-CN": "阵营"
  },
  "closedHelp.line": {
    "en": "{name}: {blurb}",
    "zh-CN": "{name}：{blurb}"
  }
});

export const CLOSED_GAME_HELP_METADATA = [
  {
    "kind": "condition",
    "name": "blinded",
    "nameKey": "closedHelp.condition.blinded.name",
    "blurbKey": "closedHelp.condition.blinded.blurb"
  },
  {
    "kind": "condition",
    "name": "charmed",
    "nameKey": "closedHelp.condition.charmed.name",
    "blurbKey": "closedHelp.condition.charmed.blurb"
  },
  {
    "kind": "condition",
    "name": "deafened",
    "nameKey": "closedHelp.condition.deafened.name",
    "blurbKey": "closedHelp.condition.deafened.blurb"
  },
  {
    "kind": "condition",
    "name": "exhaustion",
    "nameKey": "closedHelp.condition.exhaustion.name",
    "blurbKey": "closedHelp.condition.exhaustion.blurb"
  },
  {
    "kind": "condition",
    "name": "frightened",
    "nameKey": "closedHelp.condition.frightened.name",
    "blurbKey": "closedHelp.condition.frightened.blurb"
  },
  {
    "kind": "condition",
    "name": "grappled",
    "nameKey": "closedHelp.condition.grappled.name",
    "blurbKey": "closedHelp.condition.grappled.blurb"
  },
  {
    "kind": "condition",
    "name": "incapacitated",
    "nameKey": "closedHelp.condition.incapacitated.name",
    "blurbKey": "closedHelp.condition.incapacitated.blurb"
  },
  {
    "kind": "condition",
    "name": "invisible",
    "nameKey": "closedHelp.condition.invisible.name",
    "blurbKey": "closedHelp.condition.invisible.blurb"
  },
  {
    "kind": "condition",
    "name": "paralyzed",
    "nameKey": "closedHelp.condition.paralyzed.name",
    "blurbKey": "closedHelp.condition.paralyzed.blurb"
  },
  {
    "kind": "condition",
    "name": "petrified",
    "nameKey": "closedHelp.condition.petrified.name",
    "blurbKey": "closedHelp.condition.petrified.blurb"
  },
  {
    "kind": "condition",
    "name": "poisoned",
    "nameKey": "closedHelp.condition.poisoned.name",
    "blurbKey": "closedHelp.condition.poisoned.blurb"
  },
  {
    "kind": "condition",
    "name": "prone",
    "nameKey": "closedHelp.condition.prone.name",
    "blurbKey": "closedHelp.condition.prone.blurb"
  },
  {
    "kind": "condition",
    "name": "restrained",
    "nameKey": "closedHelp.condition.restrained.name",
    "blurbKey": "closedHelp.condition.restrained.blurb"
  },
  {
    "kind": "condition",
    "name": "stunned",
    "nameKey": "closedHelp.condition.stunned.name",
    "blurbKey": "closedHelp.condition.stunned.blurb"
  },
  {
    "kind": "condition",
    "name": "unconscious",
    "nameKey": "closedHelp.condition.unconscious.name",
    "blurbKey": "closedHelp.condition.unconscious.blurb"
  },
  {
    "kind": "school",
    "name": "abjuration",
    "nameKey": "closedHelp.school.abjuration.name",
    "blurbKey": "closedHelp.school.abjuration.blurb"
  },
  {
    "kind": "school",
    "name": "conjuration",
    "nameKey": "closedHelp.school.conjuration.name",
    "blurbKey": "closedHelp.school.conjuration.blurb"
  },
  {
    "kind": "school",
    "name": "divination",
    "nameKey": "closedHelp.school.divination.name",
    "blurbKey": "closedHelp.school.divination.blurb"
  },
  {
    "kind": "school",
    "name": "enchantment",
    "nameKey": "closedHelp.school.enchantment.name",
    "blurbKey": "closedHelp.school.enchantment.blurb"
  },
  {
    "kind": "school",
    "name": "evocation",
    "nameKey": "closedHelp.school.evocation.name",
    "blurbKey": "closedHelp.school.evocation.blurb"
  },
  {
    "kind": "school",
    "name": "illusion",
    "nameKey": "closedHelp.school.illusion.name",
    "blurbKey": "closedHelp.school.illusion.blurb"
  },
  {
    "kind": "school",
    "name": "necromancy",
    "nameKey": "closedHelp.school.necromancy.name",
    "blurbKey": "closedHelp.school.necromancy.blurb"
  },
  {
    "kind": "school",
    "name": "transmutation",
    "nameKey": "closedHelp.school.transmutation.name",
    "blurbKey": "closedHelp.school.transmutation.blurb"
  },
  {
    "kind": "property",
    "name": "ammunition",
    "nameKey": "closedHelp.property.ammunition.name",
    "blurbKey": "closedHelp.property.ammunition.blurb"
  },
  {
    "kind": "property",
    "name": "double-headed",
    "nameKey": "closedHelp.property.double-headed.name",
    "blurbKey": "closedHelp.property.double-headed.blurb"
  },
  {
    "kind": "property",
    "name": "finesse",
    "nameKey": "closedHelp.property.finesse.name",
    "blurbKey": "closedHelp.property.finesse.blurb"
  },
  {
    "kind": "property",
    "name": "gunpowder",
    "nameKey": "closedHelp.property.gunpowder.name",
    "blurbKey": "closedHelp.property.gunpowder.blurb"
  },
  {
    "kind": "property",
    "name": "heavy",
    "nameKey": "closedHelp.property.heavy.name",
    "blurbKey": "closedHelp.property.heavy.blurb"
  },
  {
    "kind": "property",
    "name": "light",
    "nameKey": "closedHelp.property.light.name",
    "blurbKey": "closedHelp.property.light.blurb"
  },
  {
    "kind": "property",
    "name": "loading",
    "nameKey": "closedHelp.property.loading.name",
    "blurbKey": "closedHelp.property.loading.blurb"
  },
  {
    "kind": "property",
    "name": "magazine",
    "nameKey": "closedHelp.property.magazine.name",
    "blurbKey": "closedHelp.property.magazine.blurb"
  },
  {
    "kind": "property",
    "name": "reach",
    "nameKey": "closedHelp.property.reach.name",
    "blurbKey": "closedHelp.property.reach.blurb"
  },
  {
    "kind": "property",
    "name": "special",
    "nameKey": "closedHelp.property.special.name",
    "blurbKey": "closedHelp.property.special.blurb"
  },
  {
    "kind": "property",
    "name": "thrown",
    "nameKey": "closedHelp.property.thrown.name",
    "blurbKey": "closedHelp.property.thrown.blurb"
  },
  {
    "kind": "property",
    "name": "two-handed",
    "nameKey": "closedHelp.property.two-handed.name",
    "blurbKey": "closedHelp.property.two-handed.blurb"
  },
  {
    "kind": "property",
    "name": "versatile",
    "nameKey": "closedHelp.property.versatile.name",
    "blurbKey": "closedHelp.property.versatile.blurb"
  },
  {
    "kind": "damage",
    "name": "acid",
    "nameKey": "closedHelp.damage.acid.name",
    "blurbKey": "closedHelp.damage.acid.blurb"
  },
  {
    "kind": "damage",
    "name": "bludgeoning",
    "nameKey": "closedHelp.damage.bludgeoning.name",
    "blurbKey": "closedHelp.damage.bludgeoning.blurb"
  },
  {
    "kind": "damage",
    "name": "cold",
    "nameKey": "closedHelp.damage.cold.name",
    "blurbKey": "closedHelp.damage.cold.blurb"
  },
  {
    "kind": "damage",
    "name": "fire",
    "nameKey": "closedHelp.damage.fire.name",
    "blurbKey": "closedHelp.damage.fire.blurb"
  },
  {
    "kind": "damage",
    "name": "force",
    "nameKey": "closedHelp.damage.force.name",
    "blurbKey": "closedHelp.damage.force.blurb"
  },
  {
    "kind": "damage",
    "name": "lightning",
    "nameKey": "closedHelp.damage.lightning.name",
    "blurbKey": "closedHelp.damage.lightning.blurb"
  },
  {
    "kind": "damage",
    "name": "necrotic",
    "nameKey": "closedHelp.damage.necrotic.name",
    "blurbKey": "closedHelp.damage.necrotic.blurb"
  },
  {
    "kind": "damage",
    "name": "piercing",
    "nameKey": "closedHelp.damage.piercing.name",
    "blurbKey": "closedHelp.damage.piercing.blurb"
  },
  {
    "kind": "damage",
    "name": "poison",
    "nameKey": "closedHelp.damage.poison.name",
    "blurbKey": "closedHelp.damage.poison.blurb"
  },
  {
    "kind": "damage",
    "name": "psychic",
    "nameKey": "closedHelp.damage.psychic.name",
    "blurbKey": "closedHelp.damage.psychic.blurb"
  },
  {
    "kind": "damage",
    "name": "radiant",
    "nameKey": "closedHelp.damage.radiant.name",
    "blurbKey": "closedHelp.damage.radiant.blurb"
  },
  {
    "kind": "damage",
    "name": "slashing",
    "nameKey": "closedHelp.damage.slashing.name",
    "blurbKey": "closedHelp.damage.slashing.blurb"
  },
  {
    "kind": "damage",
    "name": "thunder",
    "nameKey": "closedHelp.damage.thunder.name",
    "blurbKey": "closedHelp.damage.thunder.blurb"
  },
  {
    "kind": "size",
    "name": "tiny",
    "nameKey": "closedHelp.size.tiny.name",
    "blurbKey": "closedHelp.size.tiny.blurb"
  },
  {
    "kind": "size",
    "name": "small",
    "nameKey": "closedHelp.size.small.name",
    "blurbKey": "closedHelp.size.small.blurb"
  },
  {
    "kind": "size",
    "name": "medium",
    "nameKey": "closedHelp.size.medium.name",
    "blurbKey": "closedHelp.size.medium.blurb"
  },
  {
    "kind": "size",
    "name": "large",
    "nameKey": "closedHelp.size.large.name",
    "blurbKey": "closedHelp.size.large.blurb"
  },
  {
    "kind": "size",
    "name": "huge",
    "nameKey": "closedHelp.size.huge.name",
    "blurbKey": "closedHelp.size.huge.blurb"
  },
  {
    "kind": "size",
    "name": "gargantuan",
    "nameKey": "closedHelp.size.gargantuan.name",
    "blurbKey": "closedHelp.size.gargantuan.blurb"
  }
] as const;
