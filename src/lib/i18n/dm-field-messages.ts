import { defineMessages } from "./catalog.ts";

export const DM_FIELD_MESSAGES = /*#__PURE__*/ defineMessages({

  "dmField.upstream027.0": {
    "en": "The kind of place the battle map is drawn as. Blank: the current place's.",
    "zh-CN": "战斗地图所呈现的场所类型。留空时使用当前场所的类型。"
  },
  "dmField.upstream027.1": {
    "en": "Enemies come from",
    "zh-CN": "敌人来自"
  },
  "dmField.upstream027.2": {
    "en": "Ahead puts the front of the party's travel formation nearest them; behind, the rear. Blank: ahead.",
    "zh-CN": "前方会让行进队形的前排最靠近敌人；后方则为后排。留空默认为前方。"
  },
  "dmField.upstream027.3": {
    "en": "Ahead of the travel formation",
    "zh-CN": "行进队形前方"
  },
  "dmField.upstream027.4": {
    "en": "Behind it",
    "zh-CN": "行进队形后方"
  },
  "dmField.upstream027.5": {
    "en": "A versatile weapon rolls its bigger die in melee. Not with a shield on the arm. Not for an off-hand attack.",
    "zh-CN": "两用武器在近战中使用较大的伤害骰。手臂上装备盾牌时不可用；副手攻击也不可用。"
  },
  "dmField.upstream027.6": {
    "en": "Readied action",
    "zh-CN": "预备的动作"
  },
  "dmField.upstream027.7": {
    "en": "Ready only: what the trigger releases, off their turn, with their reaction. For a spell, fill Spell instead.",
    "zh-CN": "仅用于预备动作：在自己的回合外，用反应执行触发的动作。若是法术，请改填“法术”。"
  },
  "dmField.upstream027.8": {
    "en": "An attack (release with Attack)",
    "zh-CN": "一次攻击（通过“攻击”执行）"
  },
  "dmField.upstream027.9": {
    "en": "A move up to their speed (release with Move token)",
    "zh-CN": "移动至多等于速度的距离（通过“移动棋子”执行）"
  },
  "dmField.upstream027.10": {
    "en": "Use an item (release with Use item)",
    "zh-CN": "使用物品（通过“使用物品”执行）"
  },
  "dmField.upstream027.11": {
    "en": "Stabilize a creature (release with Stabilize)",
    "zh-CN": "稳定生物伤势（通过“稳定伤势”执行）"
  },
  "dmField.upstream027.12": {
    "en": "A class feature that takes an action",
    "zh-CN": "需要一个动作的职业特性"
  },
  "dmField.upstream027.13": {
    "en": "Escape a grapple",
    "zh-CN": "挣脱擒抱"
  },
  "dmField.upstream027.14": {
    "en": "Or whoever walks",
    "zh-CN": "或按行进位置选择"
  },
  "dmField.upstream027.15": {
    "en": "Instead of naming them: the character first or last in the party's travel formation.",
    "zh-CN": "无需指定姓名：选择队伍行进队形最前方或最后方的角色。"
  },
  "dmField.upstream027.16": {
    "en": "At the front of the formation",
    "zh-CN": "队形最前方"
  },
  "dmField.upstream027.17": {
    "en": "At the rear of the formation",
    "zh-CN": "队形最后方"
  },
  "dmField.upstream027.18": {
    "en": "Another sum, not the one just accepted",
    "zh-CN": "另一笔金额，并非刚接受的那笔"
  },
  "dmField.upstream027.19": {
    "en": "With item offers on, the same amount again within ten minutes of an accepted offer is refused unless it is truly another from a different source.",
    "zh-CN": "开启物品提议时，接受提议后十分钟内再次给予同额金额会被拒绝，除非确实是来自不同来源的另一笔。"
  },
  "dmField.upstream027.20": {
    "en": "Another one, not the one just accepted",
    "zh-CN": "另一个物品，并非刚接受的那个"
  },
  "dmField.upstream027.21": {
    "en": "With item offers on, the same item again within ten minutes of an accepted offer is refused unless it is truly another from a different source.",
    "zh-CN": "开启物品提议时，接受提议后十分钟内再次给予相同物品会被拒绝，除非确实是来自不同来源的另一个。"
  },
  "dmField.upstream027.22": {
    "en": "Gender",
    "zh-CN": "性别"
  },
  "dmField.upstream027.23": {
    "en": "Female",
    "zh-CN": "女性"
  },
  "dmField.upstream027.24": {
    "en": "Male",
    "zh-CN": "男性"
  },
  "dmField.upstream027.25": {
    "en": "Nonbinary",
    "zh-CN": "非二元性别"
  },
  "dmField.upstream027.26": {
    "en": "Unknown",
    "zh-CN": "未知"
  },
  "dmField.upstream027.27": {
    "en": "Kind of place",
    "zh-CN": "场所类型"
  },
  "dmField.upstream027.28": {
    "en": "Sets the place's sound, battle map and picture. Blank keeps what it was.",
    "zh-CN": "设置场所的声音、战斗地图和图片。留空保持原样。"
  },
  "dmField.upstream027.29": {
    "en": "Event id, beat number or title",
    "zh-CN": "事件 ID、剧情节点编号或标题"
  },
  "dmField.upstream027.30": {
    "en": "ev3",
    "zh-CN": "ev3"
  }
,
  "dmField.listSeparator": {"en": ", ", "zh-CN": "、"},
  "dmField.copy.c0000": {
    "en": "Enemies",
    "zh-CN": "敌人"
  },
  "dmField.copy.c0001": {
    "en": "goblin x4\nhobgoblin",
    "zh-CN": "填写怪物原名和数量，每行一个，例如：\ngoblin x4\nhobgoblin"
  },
  "dmField.copy.c0002": {
    "en": "One per line, name or SRD slug, optional xN for a count. Stat blocks come from the content pack.",
    "zh-CN": "每行填写一个名称或 SRD 标识，可用 xN 指定数量。战斗数据取自内容包。"
  },
  "dmField.copy.c0003": {
    "en": "Opening",
    "zh-CN": "开场"
  },
  "dmField.copy.c0004": {
    "en": "Ambush",
    "zh-CN": "伏击"
  },
  "dmField.copy.c0005": {
    "en": "The server rolls the hiders' Stealth against each opponent's passive Perception; only those who notice nothing are surprised.",
    "zh-CN": "隐藏者进行隐匿检定，与每个对手的被动察觉比较；未察觉伏击者才会陷入突袭。"
  },
  "dmField.copy.c0006": {
    "en": "The enemies lie in wait",
    "zh-CN": "敌人埋伏"
  },
  "dmField.copy.c0007": {
    "en": "The party springs it",
    "zh-CN": "队伍发动伏击"
  },
  "dmField.copy.c0008": {
    "en": "Or decide surprise",
    "zh-CN": "或直接指定突袭"
  },
  "dmField.copy.c0009": {
    "en": "Overrides the ambush roll for a whole side.",
    "zh-CN": "为一方直接指定突袭状态，覆盖伏击掷骰结果。"
  },
  "dmField.copy.c0010": {
    "en": "Nobody",
    "zh-CN": "无人"
  },
  "dmField.copy.c0011": {
    "en": "The enemies are surprised",
    "zh-CN": "敌人陷入突袭"
  },
  "dmField.copy.c0012": {
    "en": "The party is surprised",
    "zh-CN": "队伍陷入突袭"
  },
  "dmField.copy.c0013": {
    "en": "Battlefield",
    "zh-CN": "战场"
  },
  "dmField.copy.c0014": {
    "en": "Opening distance (feet)",
    "zh-CN": "开场距离（英尺）"
  },
  "dmField.copy.c0015": {
    "en": "How far the nearest enemy stands from the party. Empty, the sides open across the field.",
    "zh-CN": "最近的敌人与队伍的距离。留空时，双方分处战场两侧。"
  },
  "dmField.copy.c0016": {
    "en": "In a legendary creature's lair",
    "zh-CN": "位于传奇生物的巢穴"
  },
  "dmField.copy.c0017": {
    "en": "The lair acts on initiative 20 each round (Lair action).",
    "zh-CN": "巢穴在每轮先攻 20 时执行巢穴动作。"
  },
  "dmField.copy.c0018": {
    "en": "wolf x2",
    "zh-CN": "狼 x2"
  },
  "dmField.copy.c0019": {
    "en": "Reason",
    "zh-CN": "举报原因"
  },
  "dmField.copy.c0020": {
    "en": "Short in-fiction cause",
    "zh-CN": "简短说明故事中的原因"
  },
  "dmField.copy.c0021": {
    "en": "Attacker",
    "zh-CN": "攻击者"
  },
  "dmField.copy.c0022": {
    "en": "Target",
    "zh-CN": "目标"
  },
  "dmField.copy.c0023": {
    "en": "Weapon",
    "zh-CN": "武器"
  },
  "dmField.copy.c0024": {
    "en": "From their equipment. Blank uses the best weapon they carry.",
    "zh-CN": "从其装备中选择；留空使用携带的最佳武器。"
  },
  "dmField.copy.c0025": {
    "en": "Attack spell",
    "zh-CN": "攻击法术"
  },
  "dmField.copy.c0026": {
    "en": "An attack-roll spell instead of a weapon, such as Fire Bolt. It takes the whole action.",
    "zh-CN": "用需要攻击检定的法术代替武器，例如火焰箭。消耗整个动作。"
  },
  "dmField.copy.c0027": {
    "en": "Spell damage",
    "zh-CN": "法术伤害"
  },
  "dmField.copy.c0028": {
    "en": "1d10",
    "zh-CN": "1d10"
  },
  "dmField.copy.c0029": {
    "en": "Only for a spell the content pack does not know.",
    "zh-CN": "仅用于内容包中没有的法术。"
  },
  "dmField.copy.c0030": {
    "en": "Spell damage type",
    "zh-CN": "法术伤害类型"
  },
  "dmField.copy.c0031": {
    "en": "Another damage type",
    "zh-CN": "其他伤害类型"
  },
  "dmField.copy.c0032": {
    "en": "sonic, holy",
    "zh-CN": "声波、神圣"
  },
  "dmField.copy.c0033": {
    "en": "Acid",
    "zh-CN": "强酸"
  },
  "dmField.copy.c0034": {
    "en": "Bludgeoning",
    "zh-CN": "钝击"
  },
  "dmField.copy.c0035": {
    "en": "Cold",
    "zh-CN": "寒冷"
  },
  "dmField.copy.c0036": {
    "en": "Fire",
    "zh-CN": "火焰"
  },
  "dmField.copy.c0037": {
    "en": "Force",
    "zh-CN": "力场"
  },
  "dmField.copy.c0038": {
    "en": "Lightning",
    "zh-CN": "闪电"
  },
  "dmField.copy.c0039": {
    "en": "Necrotic",
    "zh-CN": "黯蚀"
  },
  "dmField.copy.c0040": {
    "en": "Piercing",
    "zh-CN": "穿刺"
  },
  "dmField.copy.c0041": {
    "en": "Poison",
    "zh-CN": "毒素"
  },
  "dmField.copy.c0042": {
    "en": "Psychic",
    "zh-CN": "心灵"
  },
  "dmField.copy.c0043": {
    "en": "Radiant",
    "zh-CN": "光耀"
  },
  "dmField.copy.c0044": {
    "en": "Slashing",
    "zh-CN": "挥砍"
  },
  "dmField.copy.c0045": {
    "en": "Thunder",
    "zh-CN": "雷鸣"
  },
  "dmField.copy.c0046": {
    "en": "Spell slot level",
    "zh-CN": "法术位环阶"
  },
  "dmField.copy.c0047": {
    "en": "An attack spell of 1st level or higher: the slot cast from. Empty uses the spell's own level.",
    "zh-CN": "一环及以上攻击法术使用的法术位。留空使用法术本身的环阶。"
  },
  "dmField.copy.c0048": {
    "en": "Roll",
    "zh-CN": "掷骰"
  },
  "dmField.copy.c0049": {
    "en": "Only for what the server cannot see. Conditions, cover, light, flanking and features are applied already.",
    "zh-CN": "仅填写游戏无法自动判断的因素。状态、掩护、光照、夹击和特性已自动计入。"
  },
  "dmField.copy.c0050": {
    "en": "Straight",
    "zh-CN": "正常"
  },
  "dmField.copy.c0051": {
    "en": "Advantage",
    "zh-CN": "优势"
  },
  "dmField.copy.c0052": {
    "en": "Disadvantage",
    "zh-CN": "劣势"
  },
  "dmField.copy.c0053": {
    "en": "Why",
    "zh-CN": "异议原因"
  },
  "dmField.copy.c0054": {
    "en": "the ogre is tangled in the curtain",
    "zh-CN": "食人魔被窗帘缠住了"
  },
  "dmField.copy.c0055": {
    "en": "Kept with the roll as your ruling, so the table can see why.",
    "zh-CN": "随掷骰保存你的裁定理由，供玩家查看。"
  },
  "dmField.copy.c0056": {
    "en": "In both hands",
    "zh-CN": "双手持握"
  },
  "dmField.copy.c0057": {
    "en": "A versatile weapon rolls its bigger die. Not with a shield on the arm.",
    "zh-CN": "多用武器使用较大的伤害骰；装备盾牌时不能使用。"
  },
  "dmField.copy.c0058": {
    "en": "Off-hand attack",
    "zh-CN": "副手攻击"
  },
  "dmField.copy.c0059": {
    "en": "The bonus action of two-weapon fighting, after an attack with a light weapon.",
    "zh-CN": "用轻型武器攻击后，进行双武器战斗的附赠动作攻击。"
  },
  "dmField.copy.c0060": {
    "en": "Divine Smite slot",
    "zh-CN": "至圣斩法术位"
  },
  "dmField.copy.c0061": {
    "en": "Paladin only. The slot is spent if the attack hits.",
    "zh-CN": "仅限圣武士；攻击命中时才消耗法术位。"
  },
  "dmField.copy.c0062": {
    "en": "Maneuver",
    "zh-CN": "战技"
  },
  "dmField.copy.c0063": {
    "en": "Battle Master only. The Superiority Die is spent on a hit (on the roll for Precision Attack).",
    "zh-CN": "仅限战斗大师；命中时消耗卓越骰，精准攻击则在攻击检定时消耗。"
  },
  "dmField.copy.c0064": {
    "en": "Bonus-action attack",
    "zh-CN": "附赠动作攻击"
  },
  "dmField.copy.c0065": {
    "en": "Martial Arts' unarmed strike after the Attack action, or a raging Berserker's frenzy. Spends the bonus action.",
    "zh-CN": "攻击动作后的武艺徒手打击，或狂暴中狂战士的狂乱攻击。消耗附赠动作。"
  },
  "dmField.copy.c0066": {
    "en": "Martial Arts strike",
    "zh-CN": "武艺打击"
  },
  "dmField.copy.c0067": {
    "en": "Frenzy",
    "zh-CN": "狂乱"
  },
  "dmField.copy.c0068": {
    "en": "Subclass feature",
    "zh-CN": "子职业特性"
  },
  "dmField.copy.c0069": {
    "en": "Stunning Strike",
    "zh-CN": "震慑拳"
  },
  "dmField.copy.c0070": {
    "en": "Monk 5+. One ki on a melee hit; the target saves CON or is stunned.",
    "zh-CN": "五级及以上武僧：近战命中后消耗 1 点气，目标体质豁免失败则震慑。"
  },
  "dmField.copy.c0071": {
    "en": "Power attack",
    "zh-CN": "强力攻击"
  },
  "dmField.copy.c0072": {
    "en": "Great Weapon Master (heavy melee) or Sharpshooter (ranged): -5 to hit for +10 damage. Powerful Attacker: disadvantage for +10. Deadeye: the proficiency bonus off the roll for twice it on the damage.",
    "zh-CN": "巨武器大师（重型近战）或神射手（远程）：命中 -5、伤害 +10。强力攻击者：以劣势换取伤害 +10。神准射手：攻击检定减去熟练加值，伤害增加其两倍。"
  },
  "dmField.copy.c0073": {
    "en": "Spend a luck point",
    "zh-CN": "消耗幸运点"
  },
  "dmField.copy.c0074": {
    "en": "Lucky: an extra d20 on this attack roll, the best kept; the point is spent.",
    "zh-CN": "幸运：额外掷 1 个 d20，保留最佳结果，并消耗幸运点。"
  },
  "dmField.copy.c0075": {
    "en": "Stun on a crit (Stunning Sniper)",
    "zh-CN": "重击时震慑（震慑狙击手）"
  },
  "dmField.copy.c0076": {
    "en": "A ranged weapon critical hit stuns the target until the shooter's next turn instead of doubling the damage.",
    "zh-CN": "远程武器重击改为震慑目标至射手下回合，而不是加倍伤害。"
  },
  "dmField.copy.c0077": {
    "en": "Charged 10 ft straight (Charger)",
    "zh-CN": "直线冲锋 10 英尺（冲锋者）"
  },
  "dmField.copy.c0078": {
    "en": "Charger's bonus-action attack after a Dash: +5 damage when they ran at least 10 feet straight at the target.",
    "zh-CN": "冲锋者疾走后的附赠动作攻击：若向目标直线移动至少 10 英尺，伤害 +5。"
  },
  "dmField.copy.c0079": {
    "en": "Reckless Attack",
    "zh-CN": "鲁莽攻击"
  },
  "dmField.copy.c0080": {
    "en": "Barbarian 2+, first attack of the turn. Attacks against them have advantage until their next turn.",
    "zh-CN": "二级及以上野蛮人，每回合第一次攻击使用。直到其下回合，对其攻击具有优势。"
  },
  "dmField.copy.c0081": {
    "en": "Knock out",
    "zh-CN": "击昏"
  },
  "dmField.copy.c0082": {
    "en": "Melee only. A creature dropped to 0 falls unconscious instead of dying.",
    "zh-CN": "仅限近战；目标生命值降至 0 时失去意识，而不是死亡。"
  },
  "dmField.copy.c0083": {
    "en": "Horde Breaker",
    "zh-CN": "破敌斩"
  },
  "dmField.copy.c0084": {
    "en": "Hunter ranger, once a turn: an extra attack on a different creature within 5 feet of one already attacked.",
    "zh-CN": "猎人游侠，每回合一次：额外攻击一个位于已攻击目标 5 英尺内的其他生物。"
  },
  "dmField.copy.c0085": {
    "en": "Spend their Inspiration",
    "zh-CN": "消耗激励"
  },
  "dmField.copy.c0086": {
    "en": "Advantage on this attack roll. Refused when they hold none.",
    "zh-CN": "本次攻击检定具有优势；没有激励时不能使用。"
  },
  "dmField.copy.c0087": {
    "en": "Stroke of Luck",
    "zh-CN": "幸运一击"
  },
  "dmField.copy.c0088": {
    "en": "Rogue 20: a miss becomes a hit and spends the use (once a short rest); a hit spends nothing.",
    "zh-CN": "二十级游荡者：未命中变为命中并消耗一次使用机会（短休恢复）；原本命中则不消耗。"
  },
  "dmField.copy.c0089": {
    "en": "Open Hand Technique",
    "zh-CN": "散打技巧"
  },
  "dmField.copy.c0090": {
    "en": "Way of the Open Hand, on a Flurry of Blows strike only. The server rolls the target's save against the ki DC.",
    "zh-CN": "仅限散打宗武僧的疾风连击打击。目标对气的豁免 DC 进行豁免。"
  },
  "dmField.copy.c0091": {
    "en": "Knock prone (DEX save)",
    "zh-CN": "击倒（敏捷豁免）"
  },
  "dmField.copy.c0092": {
    "en": "Push 15 feet (STR save)",
    "zh-CN": "推开 15 英尺（力量豁免）"
  },
  "dmField.copy.c0093": {
    "en": "No reactions until the monk's next turn ends",
    "zh-CN": "目标不能使用反应，直到武僧下回合结束"
  },
  "dmField.copy.c0094": {
    "en": "Hurl Through Hell",
    "zh-CN": "投入地狱"
  },
  "dmField.copy.c0095": {
    "en": "Fiend warlock 14, on a hit: gone until the end of the warlock's next turn, then 10d10 psychic unless a fiend. Once a long rest.",
    "zh-CN": "十四级邪魔宗主邪术师：命中后目标消失至邪术师下回合结束；非邪魔目标随后受到 10d10 心灵伤害。每次长休一次。"
  },
  "dmField.copy.c0096": {
    "en": "Rapid Strike",
    "zh-CN": "迅捷打击"
  },
  "dmField.copy.c0097": {
    "en": "Samurai 15, once a turn: an attack with advantage gives it up for one more attack of the Attack action.",
    "zh-CN": "十五级武士，每回合一次：放弃一次攻击的优势，换取攻击动作中的额外一次攻击。"
  },
  "dmField.copy.c0098": {
    "en": "Whirlwind Attack",
    "zh-CN": "旋风攻击"
  },
  "dmField.copy.c0099": {
    "en": "Hunter 11: the action makes one melee attack against each creature within 5 feet; send one call per creature.",
    "zh-CN": "十一级猎人：用动作对 5 英尺内每个生物各进行一次近战攻击；每个生物单独调用。"
  },
  "dmField.copy.c0100": {
    "en": "Volley",
    "zh-CN": "齐射"
  },
  "dmField.copy.c0101": {
    "en": "Hunter 11: the action makes one ranged attack against each creature within 10 feet of the first; send one call per creature.",
    "zh-CN": "十一级猎人：用动作对首个目标 10 英尺内每个生物各进行一次远程攻击；每个生物单独调用。"
  },
  "dmField.copy.c0102": {
    "en": "Attack",
    "zh-CN": "攻击"
  },
  "dmField.copy.c0103": {
    "en": "Blank picks from the stat block.",
    "zh-CN": "留空从战斗数据中选择。"
  },
  "dmField.copy.c0104": {
    "en": "Enemy",
    "zh-CN": "敌人"
  },
  "dmField.copy.c0105": {
    "en": "Damage",
    "zh-CN": "伤害"
  },
  "dmField.copy.c0106": {
    "en": "Leave empty for a fall.",
    "zh-CN": "坠落伤害时留空。"
  },
  "dmField.copy.c0107": {
    "en": "Or dice",
    "zh-CN": "或填写骰子"
  },
  "dmField.copy.c0108": {
    "en": "4d10: the server rolls them.",
    "zh-CN": "4d10：自动掷骰。"
  },
  "dmField.copy.c0109": {
    "en": "Falls (feet)",
    "zh-CN": "坠落距离（英尺）"
  },
  "dmField.copy.c0110": {
    "en": "The server rolls 1d6 per 10 feet and lays it prone.",
    "zh-CN": "每坠落 10 英尺掷 1d6，并使目标倒地。"
  },
  "dmField.copy.c0111": {
    "en": "Type",
    "zh-CN": "类型"
  },
  "dmField.copy.c0112": {
    "en": "From a spell or a magic weapon",
    "zh-CN": "来自法术或魔法武器"
  },
  "dmField.copy.c0113": {
    "en": "Resistance to nonmagical attacks does not apply to it.",
    "zh-CN": "对非魔法攻击的抗性不适用。"
  },
  "dmField.copy.c0114": {
    "en": "Source",
    "zh-CN": "来源"
  },
  "dmField.copy.c0115": {
    "en": "The AI DM must name one; the console's own hand may leave it empty.",
    "zh-CN": "AI DM 必须说明来源；手动操作时可以留空。"
  },
  "dmField.copy.c0116": {
    "en": "A hazard (a trap, a falling object)",
    "zh-CN": "危险（陷阱、坠落物）"
  },
  "dmField.copy.c0117": {
    "en": "The environment (fire, lava, acid)",
    "zh-CN": "环境（火焰、熔岩、酸液）"
  },
  "dmField.copy.c0118": {
    "en": "Caster",
    "zh-CN": "施法者"
  },
  "dmField.copy.c0119": {
    "en": "Spell",
    "zh-CN": "法术"
  },
  "dmField.copy.c0120": {
    "en": "Save",
    "zh-CN": "保存"
  },
  "dmField.copy.c0121": {
    "en": "A known spell brings its own save; set it for one the server does not know.",
    "zh-CN": "已知法术自带豁免类型；未知法术需在此指定。"
  },
  "dmField.copy.c0122": {
    "en": "Strength",
    "zh-CN": "力量"
  },
  "dmField.copy.c0123": {
    "en": "Dexterity",
    "zh-CN": "敏捷"
  },
  "dmField.copy.c0124": {
    "en": "Constitution",
    "zh-CN": "体质"
  },
  "dmField.copy.c0125": {
    "en": "Intelligence",
    "zh-CN": "智力"
  },
  "dmField.copy.c0126": {
    "en": "Wisdom",
    "zh-CN": "感知"
  },
  "dmField.copy.c0127": {
    "en": "Charisma",
    "zh-CN": "魅力"
  },
  "dmField.copy.c0128": {
    "en": "Slot level",
    "zh-CN": "法术位环阶"
  },
  "dmField.copy.c0129": {
    "en": "Leave empty for a cantrip or the spell's own level.",
    "zh-CN": "戏法或使用法术自身环阶时留空。"
  },
  "dmField.copy.c0130": {
    "en": "3d8",
    "zh-CN": "3d8"
  },
  "dmField.copy.c0131": {
    "en": "Damage type",
    "zh-CN": "伤害类型"
  },
  "dmField.copy.c0132": {
    "en": "Half on a save",
    "zh-CN": "豁免成功伤害减半"
  },
  "dmField.copy.c0133": {
    "en": "Condition on a failed save",
    "zh-CN": "豁免失败施加的状态"
  },
  "dmField.copy.c0134": {
    "en": "A known spell applies its own; name the one chosen for Blindness/Deafness.",
    "zh-CN": "已知法术自动施加状态；目盲／耳聋术需指定选用的状态。"
  },
  "dmField.copy.c0135": {
    "en": "A story condition",
    "zh-CN": "自定义剧情状态"
  },
  "dmField.copy.c0136": {
    "en": "cursed, marked, soaked",
    "zh-CN": "诅咒、标记、湿透"
  },
  "dmField.copy.c0137": {
    "en": "Blinded",
    "zh-CN": "目盲"
  },
  "dmField.copy.c0138": {
    "en": "Charmed",
    "zh-CN": "魅惑"
  },
  "dmField.copy.c0139": {
    "en": "Deafened",
    "zh-CN": "耳聋"
  },
  "dmField.copy.c0140": {
    "en": "Exhaustion",
    "zh-CN": "力竭"
  },
  "dmField.copy.c0141": {
    "en": "Frightened",
    "zh-CN": "恐慌"
  },
  "dmField.copy.c0142": {
    "en": "Grappled",
    "zh-CN": "擒抱"
  },
  "dmField.copy.c0143": {
    "en": "Incapacitated",
    "zh-CN": "失能"
  },
  "dmField.copy.c0144": {
    "en": "Invisible",
    "zh-CN": "隐形"
  },
  "dmField.copy.c0145": {
    "en": "Paralyzed",
    "zh-CN": "麻痹"
  },
  "dmField.copy.c0146": {
    "en": "Petrified",
    "zh-CN": "石化"
  },
  "dmField.copy.c0147": {
    "en": "Poisoned",
    "zh-CN": "中毒"
  },
  "dmField.copy.c0148": {
    "en": "Prone",
    "zh-CN": "倒地"
  },
  "dmField.copy.c0149": {
    "en": "Restrained",
    "zh-CN": "束缚"
  },
  "dmField.copy.c0150": {
    "en": "Stunned",
    "zh-CN": "震慑"
  },
  "dmField.copy.c0151": {
    "en": "Unconscious",
    "zh-CN": "昏迷"
  },
  "dmField.copy.c0152": {
    "en": "Rounds it lasts",
    "zh-CN": "持续轮数"
  },
  "dmField.copy.c0153": {
    "en": "Magic Missile darts",
    "zh-CN": "魔法飞弹数量"
  },
  "dmField.copy.c0154": {
    "en": "How many of the casting's darts strike this enemy. The rest can go to others with no second slot.",
    "zh-CN": "本次施法有多少枚飞弹击中该敌人。其余可打向其他目标，不重复消耗法术位。"
  },
  "dmField.copy.c0155": {
    "en": "Dispel Magic ends",
    "zh-CN": "解除魔法移除的法术"
  },
  "dmField.copy.c0156": {
    "en": "The one spell to end when it holds several; empty ends them all.",
    "zh-CN": "目标具有多个法术时指定其中一个；留空移除全部。"
  },
  "dmField.copy.c0157": {
    "en": "Overchannel",
    "zh-CN": "超限施法"
  },
  "dmField.copy.c0158": {
    "en": "An evoker's maximum damage; the server rolls what a second use costs.",
    "zh-CN": "塑能师将伤害取最大值；再次使用时自动掷骰计算代价。"
  },
  "dmField.copy.c0159": {
    "en": "Improved Reaper's second enemy",
    "zh-CN": "强化收割者的第二个敌人"
  },
  "dmField.copy.c0160": {
    "en": "A Death cleric 17: a second enemy within 5 feet of the first, struck by the same necromancy spell from the same slot.",
    "zh-CN": "十七级死亡领域牧师：同一法术位的死灵法术同时命中首个目标 5 英尺内的第二个敌人。"
  },
  "dmField.copy.c0161": {
    "en": "Polymorph's beast",
    "zh-CN": "变形术的野兽形态"
  },
  "dmField.copy.c0162": {
    "en": "Polymorph or True Polymorph: what the creature becomes on a failed WIS save, no higher in CR than it.",
    "zh-CN": "变形术或完全变形术：目标感知豁免失败后变成的生物，其挑战等级不能高于目标。"
  },
  "dmField.copy.c0163": {
    "en": "Wolf",
    "zh-CN": "狼"
  },
  "dmField.copy.c0164": {
    "en": "Dire Wolf",
    "zh-CN": "恐狼"
  },
  "dmField.copy.c0165": {
    "en": "Black Bear",
    "zh-CN": "黑熊"
  },
  "dmField.copy.c0166": {
    "en": "Brown Bear",
    "zh-CN": "棕熊"
  },
  "dmField.copy.c0167": {
    "en": "Panther",
    "zh-CN": "豹"
  },
  "dmField.copy.c0168": {
    "en": "Boar",
    "zh-CN": "野猪"
  },
  "dmField.copy.c0169": {
    "en": "Elk",
    "zh-CN": "麋鹿"
  },
  "dmField.copy.c0170": {
    "en": "Ape",
    "zh-CN": "猿"
  },
  "dmField.copy.c0171": {
    "en": "Crocodile",
    "zh-CN": "鳄鱼"
  },
  "dmField.copy.c0172": {
    "en": "Giant Spider",
    "zh-CN": "巨蜘蛛"
  },
  "dmField.copy.c0173": {
    "en": "Giant Eagle",
    "zh-CN": "巨鹰"
  },
  "dmField.copy.c0174": {
    "en": "Giant Octopus",
    "zh-CN": "巨章鱼"
  },
  "dmField.copy.c0175": {
    "en": "Giant Constrictor Snake",
    "zh-CN": "巨蟒"
  },
  "dmField.copy.c0176": {
    "en": "Mammoth",
    "zh-CN": "猛犸象"
  },
  "dmField.copy.c0177": {
    "en": "Giant Ape",
    "zh-CN": "巨猿"
  },
  "dmField.copy.c0178": {
    "en": "Tyrannosaurus Rex",
    "zh-CN": "霸王龙"
  },
  "dmField.copy.c0179": {
    "en": "Area centre, column",
    "zh-CN": "区域中心所在列"
  },
  "dmField.copy.c0180": {
    "en": "An area that stays on the map (Web, Fog Cloud, Moonbeam): its centre square, or a wall's first square. Empty lays it around the creatures caught, or on the caster.",
    "zh-CN": "持续留在地图上的区域（蛛网术、云雾术、月华之光）的中心格，或墙的起点格。留空则围绕命中的生物或施法者设置。"
  },
  "dmField.copy.c0181": {
    "en": "Area centre, row",
    "zh-CN": "区域中心行号"
  },
  "dmField.copy.c0182": {
    "en": "Runs toward, column",
    "zh-CN": "指向位置所在列"
  },
  "dmField.copy.c0183": {
    "en": "A wall or Gust of Wind's line: the square it runs toward. Empty sets a wall across the caster's view.",
    "zh-CN": "墙或造风术直线延伸的方向格。留空时，墙横跨施法者的视野。"
  },
  "dmField.copy.c0184": {
    "en": "Runs toward, row",
    "zh-CN": "延伸方向行号"
  },
  "dmField.copy.c0185": {
    "en": "Save DC",
    "zh-CN": "豁免 DC"
  },
  "dmField.copy.c0186": {
    "en": "2d6",
    "zh-CN": "2d6"
  },
  "dmField.copy.c0187": {
    "en": "Give damage, a condition, or both.",
    "zh-CN": "填写伤害、状态，或两者。"
  },
  "dmField.copy.c0188": {
    "en": "Enemy doing it",
    "zh-CN": "行动的敌人"
  },
  "dmField.copy.c0189": {
    "en": "Spends its action; its block or spell sets the save, DC and dice.",
    "zh-CN": "消耗其动作；战斗数据或法术决定豁免、DC 和骰子。"
  },
  "dmField.copy.c0190": {
    "en": "Its ability",
    "zh-CN": "敌人的能力"
  },
  "dmField.copy.c0191": {
    "en": "Poison Spit",
    "zh-CN": "喷吐毒液（Poison Spit）"
  },
  "dmField.copy.c0192": {
    "en": "With an enemy: the name as its block lists it.",
    "zh-CN": "敌人能力须按其战斗数据中的名称填写。"
  },
  "dmField.copy.c0193": {
    "en": "Or its spell",
    "zh-CN": "或使用其法术"
  },
  "dmField.copy.c0194": {
    "en": "With an enemy: one on its list. Its slot is spent and its concentration tracked.",
    "zh-CN": "从敌人的法术列表中选择，消耗法术位并追踪专注。"
  },
  "dmField.copy.c0195": {
    "en": "a poisoned needle",
    "zh-CN": "一根淬毒针"
  },
  "dmField.copy.c0196": {
    "en": "Targets",
    "zh-CN": "目标"
  },
  "dmField.copy.c0197": {
    "en": "Empty targets the caster.",
    "zh-CN": "留空以施法者为目标。"
  },
  "dmField.copy.c0198": {
    "en": "Empty for a cantrip or the spell's own level.",
    "zh-CN": "戏法或使用法术自身环阶时留空。"
  },
  "dmField.copy.c0199": {
    "en": "Hunter's Mark and Hex: the quarry. Dispel Magic: whose spells end. Polymorph: the creature to turn into the beast below. Other buffs refuse an enemy.",
    "zh-CN": "猎人印记和灾祸术：指定猎物。解除魔法：指定移除谁的法术。变形术：指定变成下方野兽的生物。其他增益法术不能指定敌人。"
  },
  "dmField.copy.c0200": {
    "en": "Choice",
    "zh-CN": "选项"
  },
  "dmField.copy.c0201": {
    "en": "A summoning spell's creature, Find Familiar's form, Polymorph's, Animal Shapes' or Shapechange's beast; or type Enlarge/Reduce, Protection from Energy's type, Enhance Ability, Fire Shield.",
    "zh-CN": "召唤法术的生物、寻获魔宠的形态、变形术／群体变形术／形体变化的野兽；或输入变巨／缩小、能量防护的类型、强化属性、火焰护盾的选项。"
  },
  "dmField.copy.c0202": {
    "en": "Another choice",
    "zh-CN": "其他选项"
  },
  "dmField.copy.c0203": {
    "en": "enlarge",
    "zh-CN": "增大（enlarge）"
  },
  "dmField.copy.c0204": {
    "en": "Air Elemental",
    "zh-CN": "气元素"
  },
  "dmField.copy.c0205": {
    "en": "Animated Object (Huge)",
    "zh-CN": "活化物体（巨型）"
  },
  "dmField.copy.c0206": {
    "en": "Animated Object (Large)",
    "zh-CN": "活化物体（大型）"
  },
  "dmField.copy.c0207": {
    "en": "Animated Object (Medium)",
    "zh-CN": "活化物体（中型）"
  },
  "dmField.copy.c0208": {
    "en": "Animated Object (Small)",
    "zh-CN": "活化物体（小型）"
  },
  "dmField.copy.c0209": {
    "en": "Animated Object (Tiny)",
    "zh-CN": "活化物体（微型）"
  },
  "dmField.copy.c0210": {
    "en": "Arcane Hand",
    "zh-CN": "奥术之手"
  },
  "dmField.copy.c0211": {
    "en": "Azer",
    "zh-CN": "火矮人"
  },
  "dmField.copy.c0212": {
    "en": "Bat",
    "zh-CN": "蝙蝠"
  },
  "dmField.copy.c0213": {
    "en": "Blink Dog",
    "zh-CN": "闪现犬"
  },
  "dmField.copy.c0214": {
    "en": "Camel",
    "zh-CN": "骆驼"
  },
  "dmField.copy.c0215": {
    "en": "Cat",
    "zh-CN": "猫"
  },
  "dmField.copy.c0216": {
    "en": "Couatl",
    "zh-CN": "羽蛇"
  },
  "dmField.copy.c0217": {
    "en": "Dryad",
    "zh-CN": "树精"
  },
  "dmField.copy.c0218": {
    "en": "Dust Mephit",
    "zh-CN": "尘魔蝠"
  },
  "dmField.copy.c0219": {
    "en": "Earth Elemental",
    "zh-CN": "土元素"
  },
  "dmField.copy.c0220": {
    "en": "Faithful Hound",
    "zh-CN": "忠犬"
  },
  "dmField.copy.c0221": {
    "en": "Fire Elemental",
    "zh-CN": "火元素"
  },
  "dmField.copy.c0222": {
    "en": "Frog",
    "zh-CN": "青蛙"
  },
  "dmField.copy.c0223": {
    "en": "Gargoyle",
    "zh-CN": "石像鬼"
  },
  "dmField.copy.c0224": {
    "en": "Ghast",
    "zh-CN": "妖鬼"
  },
  "dmField.copy.c0225": {
    "en": "Ghoul",
    "zh-CN": "食尸鬼"
  },
  "dmField.copy.c0226": {
    "en": "Giant Centipede",
    "zh-CN": "巨蜈蚣"
  },
  "dmField.copy.c0227": {
    "en": "Giant Scorpion",
    "zh-CN": "巨蝎"
  },
  "dmField.copy.c0228": {
    "en": "Giant Wasp",
    "zh-CN": "巨蜂"
  },
  "dmField.copy.c0229": {
    "en": "Hawk",
    "zh-CN": "鹰"
  },
  "dmField.copy.c0230": {
    "en": "Ice Mephit",
    "zh-CN": "冰魔蝠"
  },
  "dmField.copy.c0231": {
    "en": "Imp",
    "zh-CN": "小魔鬼"
  },
  "dmField.copy.c0232": {
    "en": "Invisible Stalker",
    "zh-CN": "隐形追猎者"
  },
  "dmField.copy.c0233": {
    "en": "Magma Mephit",
    "zh-CN": "岩浆魔蝠"
  },
  "dmField.copy.c0234": {
    "en": "Magmin",
    "zh-CN": "熔岩人"
  },
  "dmField.copy.c0235": {
    "en": "Mastiff",
    "zh-CN": "獒犬"
  },
  "dmField.copy.c0236": {
    "en": "Mud Mephit",
    "zh-CN": "泥魔蝠"
  },
  "dmField.copy.c0237": {
    "en": "Mummy",
    "zh-CN": "木乃伊"
  },
  "dmField.copy.c0238": {
    "en": "Owl",
    "zh-CN": "猫头鹰"
  },
  "dmField.copy.c0239": {
    "en": "Pegasus",
    "zh-CN": "飞马"
  },
  "dmField.copy.c0240": {
    "en": "Pony",
    "zh-CN": "矮种马"
  },
  "dmField.copy.c0241": {
    "en": "Pseudodragon",
    "zh-CN": "伪龙"
  },
  "dmField.copy.c0242": {
    "en": "Quasit",
    "zh-CN": "夸塞魔"
  },
  "dmField.copy.c0243": {
    "en": "Rat",
    "zh-CN": "老鼠"
  },
  "dmField.copy.c0244": {
    "en": "Raven",
    "zh-CN": "渡鸦"
  },
  "dmField.copy.c0245": {
    "en": "Riding Horse",
    "zh-CN": "骑乘马"
  },
  "dmField.copy.c0246": {
    "en": "Salamander",
    "zh-CN": "火蜥蜴"
  },
  "dmField.copy.c0247": {
    "en": "Satyr",
    "zh-CN": "萨堤尔"
  },
  "dmField.copy.c0248": {
    "en": "Skeleton",
    "zh-CN": "骷髅"
  },
  "dmField.copy.c0249": {
    "en": "Smoke Mephit",
    "zh-CN": "烟魔蝠"
  },
  "dmField.copy.c0250": {
    "en": "Snake",
    "zh-CN": "蛇"
  },
  "dmField.copy.c0251": {
    "en": "Spider",
    "zh-CN": "蜘蛛"
  },
  "dmField.copy.c0252": {
    "en": "Sprite",
    "zh-CN": "小妖精"
  },
  "dmField.copy.c0253": {
    "en": "Steam Mephit",
    "zh-CN": "蒸汽魔蝠"
  },
  "dmField.copy.c0254": {
    "en": "Unicorn",
    "zh-CN": "独角兽"
  },
  "dmField.copy.c0255": {
    "en": "Unseen Servant",
    "zh-CN": "隐形仆役"
  },
  "dmField.copy.c0256": {
    "en": "Warhorse",
    "zh-CN": "战马"
  },
  "dmField.copy.c0257": {
    "en": "Water Elemental",
    "zh-CN": "水元素"
  },
  "dmField.copy.c0258": {
    "en": "Weasel",
    "zh-CN": "鼬"
  },
  "dmField.copy.c0259": {
    "en": "Wight",
    "zh-CN": "尸妖"
  },
  "dmField.copy.c0260": {
    "en": "Xorn",
    "zh-CN": "索尔石怪"
  },
  "dmField.copy.c0261": {
    "en": "Zombie",
    "zh-CN": "僵尸"
  },
  "dmField.copy.c0262": {
    "en": "How many",
    "zh-CN": "数量"
  },
  "dmField.copy.c0263": {
    "en": "A summoning spell: fewer creatures than the slot allows; empty for the most.",
    "zh-CN": "召唤法术可选择少于法术位允许的数量；留空使用最大数量。"
  },
  "dmField.copy.c0264": {
    "en": "The one spell to end when the target holds several; empty ends them all.",
    "zh-CN": "目标具有多个法术时指定其中一个；留空移除全部。"
  },
  "dmField.copy.c0265": {
    "en": "Cast by character",
    "zh-CN": "施法角色"
  },
  "dmField.copy.c0266": {
    "en": "A player's spell: the server spends the slot once and derives the dice, save and DC.",
    "zh-CN": "玩家施法：法术位仅消耗一次，伤害骰、豁免类型和 DC 自动确定。"
  },
  "dmField.copy.c0267": {
    "en": "Fireball",
    "zh-CN": "火球术"
  },
  "dmField.copy.c0268": {
    "en": "Upcasting scales the dice.",
    "zh-CN": "升环会增加伤害骰。"
  },
  "dmField.copy.c0269": {
    "en": "Or an enemy's",
    "zh-CN": "或由敌人施放"
  },
  "dmField.copy.c0270": {
    "en": "Its action; the block or its spell sets the numbers.",
    "zh-CN": "消耗敌人动作；数值由战斗数据或法术决定。"
  },
  "dmField.copy.c0271": {
    "en": "Fire Breath",
    "zh-CN": "火焰吐息（Fire Breath）"
  },
  "dmField.copy.c0272": {
    "en": "8d6",
    "zh-CN": "8d6"
  },
  "dmField.copy.c0273": {
    "en": "Empty for a spell that deals none (Entangle); a known spell rolls its own.",
    "zh-CN": "无伤害法术（如纠缠术）可留空；已知法术自动掷伤害骰。"
  },
  "dmField.copy.c0274": {
    "en": "Needed when no spell is named (a trap); a character's or an enemy's spell brings its own.",
    "zh-CN": "未指定法术（如陷阱）时必须填写；角色或敌人的法术自带豁免类型。"
  },
  "dmField.copy.c0275": {
    "en": "DC",
    "zh-CN": "DC"
  },
  "dmField.copy.c0276": {
    "en": "Needed with Save when no spell is named.",
    "zh-CN": "未指定法术时，需与豁免类型一起填写。"
  },
  "dmField.copy.c0277": {
    "en": "Players caught",
    "zh-CN": "受影响的玩家角色"
  },
  "dmField.copy.c0278": {
    "en": "Enemies caught",
    "zh-CN": "受影响的敌人"
  },
  "dmField.copy.c0279": {
    "en": "Anyone else, by name",
    "zh-CN": "其他生物姓名"
  },
  "dmField.copy.c0280": {
    "en": "the cultist, Brother Aldo",
    "zh-CN": "教徒、奥尔多兄弟"
  },
  "dmField.copy.c0281": {
    "en": "Comma separated, for a creature the pickers do not show.",
    "zh-CN": "选择器中没有的生物，用逗号分隔姓名。"
  },
  "dmField.copy.c0282": {
    "en": "Sculpted allies",
    "zh-CN": "塑形法术保护的盟友"
  },
  "dmField.copy.c0283": {
    "en": "An evoker's Sculpt Spells: they succeed and take nothing. Empty spares every character caught.",
    "zh-CN": "塑能师的塑形法术：这些盟友豁免成功且不受伤害。留空保护所有受影响的角色。"
  },
  "dmField.copy.c0284": {
    "en": "Damage rolled",
    "zh-CN": "掷出的伤害"
  },
  "dmField.copy.c0285": {
    "en": "8d6: the server rolls the total once.",
    "zh-CN": "8d6：总伤害仅掷一次。"
  },
  "dmField.copy.c0286": {
    "en": "Who takes what",
    "zh-CN": "各目标的伤害份额"
  },
  "dmField.copy.c0287": {
    "en": "Each creature at full, half, double or none. Resistances still apply on top.",
    "zh-CN": "每个生物承担全额、一半、双倍或不受伤害，再额外应用其抗性。"
  },
  "dmField.copy.c0288": {
    "en": "Condition",
    "zh-CN": "状态"
  },
  "dmField.copy.c0289": {
    "en": "Exhaustion level",
    "zh-CN": "力竭等级"
  },
  "dmField.copy.c0290": {
    "en": "Exhaustion only: the level it now has.",
    "zh-CN": "仅用于力竭：指定当前力竭等级。"
  },
  "dmField.copy.c0291": {
    "en": "Rounds",
    "zh-CN": "轮数"
  },
  "dmField.copy.c0292": {
    "en": "Save to end",
    "zh-CN": "解除状态的豁免"
  },
  "dmField.copy.c0293": {
    "en": "Caused by character",
    "zh-CN": "由角色造成"
  },
  "dmField.copy.c0294": {
    "en": "The grappler, the charmer, the source of the fear.",
    "zh-CN": "擒抱者、魅惑者或恐惧的来源。"
  },
  "dmField.copy.c0295": {
    "en": "Or by enemy",
    "zh-CN": "或由敌人造成"
  },
  "dmField.copy.c0296": {
    "en": "Character",
    "zh-CN": "角色"
  },
  "dmField.copy.c0297": {
    "en": "Blank only for an enemy escaping a grapple.",
    "zh-CN": "仅在敌人挣脱擒抱时可以留空。"
  },
  "dmField.copy.c0298": {
    "en": "Action",
    "zh-CN": "动作"
  },
  "dmField.copy.c0299": {
    "en": "Dodge",
    "zh-CN": "闪避"
  },
  "dmField.copy.c0300": {
    "en": "Dash",
    "zh-CN": "疾走"
  },
  "dmField.copy.c0301": {
    "en": "Disengage",
    "zh-CN": "撤离"
  },
  "dmField.copy.c0302": {
    "en": "Hide",
    "zh-CN": "躲藏"
  },
  "dmField.copy.c0303": {
    "en": "Help",
    "zh-CN": "协助"
  },
  "dmField.copy.c0304": {
    "en": "Grapple",
    "zh-CN": "擒抱"
  },
  "dmField.copy.c0305": {
    "en": "Shove",
    "zh-CN": "推撞"
  },
  "dmField.copy.c0306": {
    "en": "Ready",
    "zh-CN": "已准备"
  },
  "dmField.copy.c0307": {
    "en": "Search",
    "zh-CN": "搜索"
  },
  "dmField.copy.c0308": {
    "en": "Use an Object",
    "zh-CN": "使用物件"
  },
  "dmField.copy.c0309": {
    "en": "Escape a grapple or a spell's hold",
    "zh-CN": "挣脱擒抱或法术束缚"
  },
  "dmField.copy.c0310": {
    "en": "As a bonus action",
    "zh-CN": "作为附赠动作"
  },
  "dmField.copy.c0311": {
    "en": "Cunning Action, Step of the Wind, Patient Defense.",
    "zh-CN": "灵巧动作、疾步如风、坚强防御。"
  },
  "dmField.copy.c0312": {
    "en": "Ally",
    "zh-CN": "盟友"
  },
  "dmField.copy.c0313": {
    "en": "Readied trigger",
    "zh-CN": "预备触发条件"
  },
  "dmField.copy.c0314": {
    "en": "when the ogre comes through the door",
    "zh-CN": "当食人魔穿过门口时"
  },
  "dmField.copy.c0315": {
    "en": "Readied spell",
    "zh-CN": "预备法术"
  },
  "dmField.copy.c0316": {
    "en": "Fire Bolt",
    "zh-CN": "火焰箭"
  },
  "dmField.copy.c0317": {
    "en": "Ready only: a one-action spell cast now (slot and concentration) and released with the reaction when the trigger comes.",
    "zh-CN": "仅限预备动作：现在施放一个施法时间为动作的法术（消耗法术位并保持专注），触发时使用反应释放。"
  },
  "dmField.copy.c0318": {
    "en": "Readied spell's slot",
    "zh-CN": "预备法术的法术位"
  },
  "dmField.copy.c0319": {
    "en": "Empty for the spell's own level.",
    "zh-CN": "使用法术自身环阶时留空。"
  },
  "dmField.copy.c0320": {
    "en": "Search with",
    "zh-CN": "搜索使用的技能"
  },
  "dmField.copy.c0321": {
    "en": "Perception",
    "zh-CN": "察觉"
  },
  "dmField.copy.c0322": {
    "en": "Investigation",
    "zh-CN": "调查"
  },
  "dmField.copy.c0323": {
    "en": "Object",
    "zh-CN": "物件"
  },
  "dmField.copy.c0324": {
    "en": "Enemy escaping",
    "zh-CN": "正在挣脱的敌人"
  },
  "dmField.copy.c0325": {
    "en": "Escape only, with no character: an enemy breaking a character's grapple, or the spell that holds it (Web, Entangle, Maze's INT check against 20, Irresistible Dance's WIS save).",
    "zh-CN": "仅用于无角色指定的挣脱：敌人挣脱角色擒抱或法术束缚（蛛网术、纠缠术、迷宫术的智力检定 DC 20、不可抗拒之舞的感知豁免）。"
  },
  "dmField.copy.c0326": {
    "en": "Shove to",
    "zh-CN": "推撞效果"
  },
  "dmField.copy.c0327": {
    "en": "Knock prone",
    "zh-CN": "击倒"
  },
  "dmField.copy.c0328": {
    "en": "Push away",
    "zh-CN": "推开"
  },
  "dmField.copy.c0329": {
    "en": "Feature",
    "zh-CN": "特性"
  },
  "dmField.copy.c0330": {
    "en": "Answers the last attack against them: a hit that already landed is re-resolved.",
    "zh-CN": "回应最近一次对其进行的攻击；已命中的攻击将重新结算。"
  },
  "dmField.copy.c0331": {
    "en": "Another feature",
    "zh-CN": "其他特性"
  },
  "dmField.copy.c0332": {
    "en": "Sentinel",
    "zh-CN": "哨卫"
  },
  "dmField.copy.c0333": {
    "en": "Shield",
    "zh-CN": "护盾术"
  },
  "dmField.copy.c0334": {
    "en": "Uncanny Dodge",
    "zh-CN": "直觉闪避"
  },
  "dmField.copy.c0335": {
    "en": "Deflect Missiles",
    "zh-CN": "拨挡飞弹"
  },
  "dmField.copy.c0336": {
    "en": "Cutting Words",
    "zh-CN": "切割之语"
  },
  "dmField.copy.c0337": {
    "en": "Protection",
    "zh-CN": "保护"
  },
  "dmField.copy.c0338": {
    "en": "Slow Fall",
    "zh-CN": "轻身坠"
  },
  "dmField.copy.c0339": {
    "en": "Feather Fall",
    "zh-CN": "羽落术"
  },
  "dmField.copy.c0340": {
    "en": "Hellish Rebuke",
    "zh-CN": "炼狱斥责"
  },
  "dmField.copy.c0341": {
    "en": "Counterspell",
    "zh-CN": "反制法术"
  },
  "dmField.copy.c0342": {
    "en": "Opportunity attack (off the map)",
    "zh-CN": "借机攻击（脱离地图）"
  },
  "dmField.copy.c0343": {
    "en": "Ally covered",
    "zh-CN": "保护的盟友"
  },
  "dmField.copy.c0344": {
    "en": "Protection, Cutting Words, Feather Fall.",
    "zh-CN": "防护、尖酸刻薄、羽落术。"
  },
  "dmField.copy.c0345": {
    "en": "Enemy answered",
    "zh-CN": "回应的敌人"
  },
  "dmField.copy.c0346": {
    "en": "Hellish Rebuke, Counterspell, Deflect Missiles' throw back.",
    "zh-CN": "炼狱叱喝、反制法术、拨挡飞弹的反投。"
  },
  "dmField.copy.c0347": {
    "en": "Spell countered",
    "zh-CN": "被反制的法术"
  },
  "dmField.copy.c0348": {
    "en": "Counterspell only: the enemy's spell as its block names it.",
    "zh-CN": "仅限反制法术：按敌人战斗数据中的名称填写法术。"
  },
  "dmField.copy.c0349": {
    "en": "A reaction spell cast from a higher slot; Song of Defense's slot.",
    "zh-CN": "用更高环法术位施放反应法术，或防御之歌使用的法术位。"
  },
  "dmField.copy.c0350": {
    "en": "Move to column",
    "zh-CN": "移动至列号"
  },
  "dmField.copy.c0351": {
    "en": "Skirmisher, Relentless Avenger: the square they move to, drawing no opportunity attacks.",
    "zh-CN": "散兵、无情复仇者：移动到该格，不触发借机攻击。"
  },
  "dmField.copy.c0352": {
    "en": "Move to row",
    "zh-CN": "移动至行号"
  },
  "dmField.copy.c0353": {
    "en": "Hazard",
    "zh-CN": "危险环境"
  },
  "dmField.copy.c0354": {
    "en": "Falling",
    "zh-CN": "坠落"
  },
  "dmField.copy.c0355": {
    "en": "Trap",
    "zh-CN": "陷阱"
  },
  "dmField.copy.c0356": {
    "en": "Something else",
    "zh-CN": "其他原因"
  },
  "dmField.copy.c0357": {
    "en": "Suffocation",
    "zh-CN": "窒息"
  },
  "dmField.copy.c0358": {
    "en": "Drowning",
    "zh-CN": "溺水"
  },
  "dmField.copy.c0359": {
    "en": "Extreme cold",
    "zh-CN": "极寒"
  },
  "dmField.copy.c0360": {
    "en": "Extreme heat",
    "zh-CN": "酷热"
  },
  "dmField.copy.c0361": {
    "en": "Caught in it",
    "zh-CN": "受影响的生物"
  },
  "dmField.copy.c0362": {
    "en": "Feet fallen",
    "zh-CN": "坠落英尺数"
  },
  "dmField.copy.c0363": {
    "en": "Trap severity",
    "zh-CN": "陷阱严重程度"
  },
  "dmField.copy.c0364": {
    "en": "Sets the save DC and the damage for each victim's level.",
    "zh-CN": "按每个受害者的等级确定豁免 DC 和伤害。"
  },
  "dmField.copy.c0365": {
    "en": "Setback: a nuisance",
    "zh-CN": "轻微：造成困扰"
  },
  "dmField.copy.c0366": {
    "en": "Dangerous: can drop a careless character",
    "zh-CN": "危险：可能击倒疏忽的角色"
  },
  "dmField.copy.c0367": {
    "en": "Deadly: can kill",
    "zh-CN": "致命：可能造成死亡"
  },
  "dmField.copy.c0368": {
    "en": "A trap by name",
    "zh-CN": "陷阱名称"
  },
  "dmField.copy.c0369": {
    "en": "Runs the trap's own numbers instead of the severity table: an SRD sample trap, or a trap from this table's workshop.",
    "zh-CN": "使用陷阱本身的数据，覆盖严重程度表；可选 SRD 示例陷阱或本战役工坊中的陷阱。"
  },
  "dmField.copy.c0370": {
    "en": "One of this table's traps",
    "zh-CN": "本战役中的陷阱"
  },
  "dmField.copy.c0371": {
    "en": "Scything Blade",
    "zh-CN": "镰刃陷阱"
  },
  "dmField.copy.c0372": {
    "en": "Collapsing Roof",
    "zh-CN": "坍塌屋顶"
  },
  "dmField.copy.c0373": {
    "en": "Falling Net",
    "zh-CN": "落网陷阱"
  },
  "dmField.copy.c0374": {
    "en": "Fire-Breathing Statue",
    "zh-CN": "喷火雕像"
  },
  "dmField.copy.c0375": {
    "en": "Simple Pit",
    "zh-CN": "普通坑洞"
  },
  "dmField.copy.c0376": {
    "en": "Hidden Pit",
    "zh-CN": "隐蔽坑洞"
  },
  "dmField.copy.c0377": {
    "en": "Spiked Pit",
    "zh-CN": "尖刺坑洞"
  },
  "dmField.copy.c0378": {
    "en": "Spiked Pit (poisoned)",
    "zh-CN": "尖刺坑洞（淬毒）"
  },
  "dmField.copy.c0379": {
    "en": "Poison Darts",
    "zh-CN": "毒镖陷阱"
  },
  "dmField.copy.c0380": {
    "en": "Poison Needle",
    "zh-CN": "毒针陷阱"
  },
  "dmField.copy.c0381": {
    "en": "Rolling Sphere",
    "zh-CN": "滚石陷阱"
  },
  "dmField.copy.c0382": {
    "en": "Hours of exposure",
    "zh-CN": "暴露时长（小时）"
  },
  "dmField.copy.c0383": {
    "en": "Extreme cold or heat: one CON save an hour, a level of exhaustion for each failure.",
    "zh-CN": "极寒或酷热：每小时进行一次体质豁免，失败则增加一级力竭。"
  },
  "dmField.copy.c0384": {
    "en": "Only for a hazard of your own.",
    "zh-CN": "仅用于自定义危险。"
  },
  "dmField.copy.c0385": {
    "en": "Resistances apply.",
    "zh-CN": "会应用抗性。"
  },
  "dmField.copy.c0386": {
    "en": "Rounds without air",
    "zh-CN": "无法呼吸的轮数"
  },
  "dmField.copy.c0387": {
    "en": "Whose turn",
    "zh-CN": "轮到谁"
  },
  "dmField.copy.c0388": {
    "en": "End the fight now? XP is awarded and the board clears; it cannot be reopened.",
    "zh-CN": "现在结束战斗吗？将授予经验值并清空战斗地图；结束后无法重新开启这场战斗。"
  },
  "dmField.copy.c0389": {
    "en": "Outcome",
    "zh-CN": "结果"
  },
  "dmField.copy.c0390": {
    "en": "The party held the bridge",
    "zh-CN": "队伍守住了桥"
  },
  "dmField.copy.c0391": {
    "en": "Owner",
    "zh-CN": "拥有者"
  },
  "dmField.copy.c0392": {
    "en": "Kind",
    "zh-CN": "类型"
  },
  "dmField.copy.c0393": {
    "en": "Familiar",
    "zh-CN": "魔宠"
  },
  "dmField.copy.c0394": {
    "en": "Beast companion",
    "zh-CN": "野兽伙伴"
  },
  "dmField.copy.c0395": {
    "en": "Drake",
    "zh-CN": "幼龙"
  },
  "dmField.copy.c0396": {
    "en": "A pet the story gave them",
    "zh-CN": "剧情获得的宠物"
  },
  "dmField.copy.c0397": {
    "en": "Creature",
    "zh-CN": "生物"
  },
  "dmField.copy.c0398": {
    "en": "owl",
    "zh-CN": "猫头鹰"
  },
  "dmField.copy.c0399": {
    "en": "Name",
    "zh-CN": "名称"
  },
  "dmField.copy.c0400": {
    "en": "Blank uses the creature's own.",
    "zh-CN": "留空使用生物本来的名称。"
  },
  "dmField.copy.c0401": {
    "en": "Hit points",
    "zh-CN": "生命值"
  },
  "dmField.copy.c0402": {
    "en": "Only for a pet the story gave them.",
    "zh-CN": "仅用于剧情获得的宠物。"
  },
  "dmField.copy.c0403": {
    "en": "Armor Class",
    "zh-CN": "护甲等级"
  },
  "dmField.copy.c0404": {
    "en": "Pet",
    "zh-CN": "宠物"
  },
  "dmField.copy.c0405": {
    "en": "Empty when they have only one.",
    "zh-CN": "只有一只宠物时可留空。"
  },
  "dmField.copy.c0406": {
    "en": "Send the pet away? Its hit points and place on the board are gone with it.",
    "zh-CN": "送走宠物？它的生命值和地图位置也会被移除。"
  },
  "dmField.copy.c0407": {
    "en": "Who moves",
    "zh-CN": "移动的生物"
  },
  "dmField.copy.c0408": {
    "en": "An enemy, or a character being pushed or carried.",
    "zh-CN": "敌人，或被推拉、搬运的角色。"
  },
  "dmField.copy.c0409": {
    "en": "A piece by name",
    "zh-CN": "按名称指定棋子"
  },
  "dmField.copy.c0410": {
    "en": "Goblin 2",
    "zh-CN": "哥布林 2"
  },
  "dmField.copy.c0411": {
    "en": "Column",
    "zh-CN": "列号"
  },
  "dmField.copy.c0412": {
    "en": "Row",
    "zh-CN": "行号"
  },
  "dmField.copy.c0413": {
    "en": "Against their will",
    "zh-CN": "被迫移动"
  },
  "dmField.copy.c0414": {
    "en": "On for a shove or a drag; players walk their own tokens otherwise.",
    "zh-CN": "推撞或拖拽时开启；其他情况下玩家自行移动棋子。"
  },
  "dmField.copy.c0415": {
    "en": "Disengages first",
    "zh-CN": "先撤离"
  },
  "dmField.copy.c0416": {
    "en": "An enemy leaving reach without opportunity attacks: its bonus action with Nimble Escape, its action otherwise.",
    "zh-CN": "敌人离开触及范围而不触发借机攻击：灵巧脱逃消耗附赠动作，否则消耗动作。"
  },
  "dmField.copy.c0417": {
    "en": "Drags who it grapples",
    "zh-CN": "拖拽擒抱的目标"
  },
  "dmField.copy.c0418": {
    "en": "An enemy hauls the character it grapples along at half speed; the grapple holds.",
    "zh-CN": "敌人以半速拖动被擒抱的角色，擒抱保持。"
  },
  "dmField.copy.c0419": {
    "en": "Who",
    "zh-CN": "对象"
  },
  "dmField.copy.c0420": {
    "en": "A character, an enemy, or a piece you placed.",
    "zh-CN": "角色、敌人，或你放置的棋子。"
  },
  "dmField.copy.c0421": {
    "en": "the statue",
    "zh-CN": "雕像"
  },
  "dmField.copy.c0422": {
    "en": "Spell or ability",
    "zh-CN": "法术或能力"
  },
  "dmField.copy.c0423": {
    "en": "Misty Step",
    "zh-CN": "迷雾步"
  },
  "dmField.copy.c0424": {
    "en": "With a caster below: the server casts it and refuses a jump past its range.",
    "zh-CN": "指定下方施法者时，会自动施法并拒绝超出法术射程的传送。"
  },
  "dmField.copy.c0425": {
    "en": "Spends their slot and the casting time.",
    "zh-CN": "消耗其法术位和施法时间。"
  },
  "dmField.copy.c0426": {
    "en": "Or used by enemy",
    "zh-CN": "或由敌人使用"
  },
  "dmField.copy.c0427": {
    "en": "Or no spell",
    "zh-CN": "或不使用法术"
  },
  "dmField.copy.c0428": {
    "en": "A trap door, a portal or another hazard",
    "zh-CN": "活板门、传送门或其他危险"
  },
  "dmField.copy.c0429": {
    "en": "Spell range (feet)",
    "zh-CN": "法术射程（英尺）"
  },
  "dmField.copy.c0430": {
    "en": "For a spell the server does not know, so a jump past its range is refused.",
    "zh-CN": "未知法术需填写，超出射程的传送将被拒绝。"
  },
  "dmField.copy.c0431": {
    "en": "Wing Attack",
    "zh-CN": "振翼攻击"
  },
  "dmField.copy.c0432": {
    "en": "Plans to",
    "zh-CN": "准备采取的行动"
  },
  "dmField.copy.c0433": {
    "en": "Longsword",
    "zh-CN": "长剑"
  },
  "dmField.copy.c0434": {
    "en": "Mark",
    "zh-CN": "指定目标"
  },
  "dmField.copy.c0435": {
    "en": "Leave empty when there is no single mark.",
    "zh-CN": "没有单一目标时留空。"
  },
  "dmField.copy.c0436": {
    "en": "Expected damage",
    "zh-CN": "预计伤害"
  },
  "dmField.copy.c0437": {
    "en": "Empty uses the named attack's average. Only seats that see enemy numbers are shown it.",
    "zh-CN": "留空使用指定攻击的平均伤害，仅向可查看敌人数值的玩家显示。"
  },
  "dmField.copy.c0438": {
    "en": "What the lair does",
    "zh-CN": "巢穴的行动"
  },
  "dmField.copy.c0439": {
    "en": "The floor tilts and grinds",
    "zh-CN": "地板倾斜并发出摩擦声"
  },
  "dmField.copy.c0440": {
    "en": "Wyvern",
    "zh-CN": "双足飞龙"
  },
  "dmField.copy.c0441": {
    "en": "Now",
    "zh-CN": "现在"
  },
  "dmField.copy.c0442": {
    "en": "On foot",
    "zh-CN": "步行"
  },
  "dmField.copy.c0443": {
    "en": "Flying",
    "zh-CN": "飞行"
  },
  "dmField.copy.c0444": {
    "en": "Burrowing",
    "zh-CN": "掘地"
  },
  "dmField.copy.c0445": {
    "en": "2d6+3: the server rolls them.",
    "zh-CN": "2d6+3：自动掷骰。"
  },
  "dmField.copy.c0446": {
    "en": "Resistance, immunity and vulnerability read it.",
    "zh-CN": "据此应用抗性、免疫和易伤。"
  },
  "dmField.copy.c0447": {
    "en": "2d4+2: the server rolls them.",
    "zh-CN": "2d4+2：自动掷骰。"
  },
  "dmField.copy.c0448": {
    "en": "Cure Wounds, Healing Word... the server rolls it.",
    "zh-CN": "疗伤术、治愈真言……自动掷骰。"
  },
  "dmField.copy.c0449": {
    "en": "Temporary hit points",
    "zh-CN": "临时生命值"
  },
  "dmField.copy.c0450": {
    "en": "Tended by",
    "zh-CN": "救治者"
  },
  "dmField.copy.c0451": {
    "en": "How",
    "zh-CN": "救治方式"
  },
  "dmField.copy.c0452": {
    "en": "The server rolls the check; a kit or the spell needs none.",
    "zh-CN": "自动进行检定；使用医疗工具或法术则无需检定。"
  },
  "dmField.copy.c0453": {
    "en": "Medicine check, DC 10",
    "zh-CN": "医药检定，DC 10"
  },
  "dmField.copy.c0454": {
    "en": "A use of their healer's kit",
    "zh-CN": "消耗一次医疗工具使用次数"
  },
  "dmField.copy.c0455": {
    "en": "Spare the Dying",
    "zh-CN": "维生术"
  },
  "dmField.copy.c0456": {
    "en": "Characters",
    "zh-CN": "角色"
  },
  "dmField.copy.c0457": {
    "en": "XP each",
    "zh-CN": "每人获得的经验值"
  },
  "dmField.copy.c0458": {
    "en": "Do",
    "zh-CN": "行动"
  },
  "dmField.copy.c0459": {
    "en": "Put an item in the pack",
    "zh-CN": "放入物品"
  },
  "dmField.copy.c0460": {
    "en": "Take an item from the pack",
    "zh-CN": "移除物品"
  },
  "dmField.copy.c0461": {
    "en": "Put money in the purse",
    "zh-CN": "放入钱币"
  },
  "dmField.copy.c0462": {
    "en": "Take money from the purse",
    "zh-CN": "取出钱币"
  },
  "dmField.copy.c0463": {
    "en": "Whose hands",
    "zh-CN": "持有者"
  },
  "dmField.copy.c0464": {
    "en": "Item",
    "zh-CN": "物品"
  },
  "dmField.copy.c0465": {
    "en": "Money",
    "zh-CN": "钱币"
  },
  "dmField.copy.c0466": {
    "en": "3 gp 4 sp",
    "zh-CN": "3 gp 4 sp"
  },
  "dmField.copy.c0467": {
    "en": "Or gold",
    "zh-CN": "或填写金币"
  },
  "dmField.copy.c0468": {
    "en": "Who shares it",
    "zh-CN": "分配给谁"
  },
  "dmField.copy.c0469": {
    "en": "Gold in total",
    "zh-CN": "金币总额"
  },
  "dmField.copy.c0470": {
    "en": "Split evenly; the remainder goes to the first share.",
    "zh-CN": "平均分配；余数归第一位领取者。"
  },
  "dmField.copy.c0471": {
    "en": "Goes to the first character listed.",
    "zh-CN": "归列表中的第一位角色。"
  },
  "dmField.copy.c0472": {
    "en": "Change in gold",
    "zh-CN": "金币变化量"
  },
  "dmField.copy.c0473": {
    "en": "Or in coins",
    "zh-CN": "或指定钱币"
  },
  "dmField.copy.c0474": {
    "en": "340 silver",
    "zh-CN": "340 银币"
  },
  "dmField.copy.c0475": {
    "en": "Overrides the amount above; the sign of the change still says gain or spend.",
    "zh-CN": "覆盖上方数额；变化量的正负仍决定获得或支出。"
  },
  "dmField.copy.c0476": {
    "en": "They cannot tell what it is",
    "zh-CN": "尚未辨认的物品"
  },
  "dmField.copy.c0477": {
    "en": "Type the description they would use, not the real name. Reveal it later with Name a mystery item.",
    "zh-CN": "填写角色所见的描述，而非真实名称；之后可用“辨认神秘物品”揭晓。"
  },
  "dmField.copy.c0478": {
    "en": "Called on the sheet",
    "zh-CN": "角色卡上的名称"
  },
  "dmField.copy.c0479": {
    "en": "Actually",
    "zh-CN": "真实名称"
  },
  "dmField.copy.c0480": {
    "en": "Ring of Protection",
    "zh-CN": "防护戒指"
  },
  "dmField.copy.c0481": {
    "en": "Used on",
    "zh-CN": "使用目标"
  },
  "dmField.copy.c0482": {
    "en": "Charges spent",
    "zh-CN": "消耗充能"
  },
  "dmField.copy.c0483": {
    "en": "A wand or a staff: the item stays and the count drops. It refills at dawn.",
    "zh-CN": "魔杖或法杖：保留物品并扣除充能，黎明时恢复。"
  },
  "dmField.copy.c0484": {
    "en": "Spell cast from it",
    "zh-CN": "通过物品施放的法术"
  },
  "dmField.copy.c0485": {
    "en": "A wand or staff's spell: the charges set its level, and the spell's own form then spends no slot.",
    "zh-CN": "魔杖或法杖的法术：充能决定环阶，不消耗角色法术位。"
  },
  "dmField.copy.c0486": {
    "en": "Buy",
    "zh-CN": "购买"
  },
  "dmField.copy.c0487": {
    "en": "Sell",
    "zh-CN": "出售"
  },
  "dmField.copy.c0488": {
    "en": "Gold each",
    "zh-CN": "单价（金币）"
  },
  "dmField.copy.c0489": {
    "en": "Resource",
    "zh-CN": "资源"
  },
  "dmField.copy.c0490": {
    "en": "How much",
    "zh-CN": "消耗数量"
  },
  "dmField.copy.c0491": {
    "en": "Points from a pool: Lay on Hands, Ki. One use when left empty.",
    "zh-CN": "圣疗、气等资源池消耗的点数；留空消耗一次使用机会。"
  },
  "dmField.copy.c0492": {
    "en": "Option",
    "zh-CN": "特性选项"
  },
  "dmField.copy.c0493": {
    "en": "For a feature with choices.",
    "zh-CN": "用于有多个选项的特性。"
  },
  "dmField.copy.c0494": {
    "en": "Enemy aimed at",
    "zh-CN": "指向的敌人"
  },
  "dmField.copy.c0495": {
    "en": "Intimidating Presence and the subclass features aimed at a creature: the server rolls its save.",
    "zh-CN": "威吓气势等指向生物的子职业特性：自动进行目标豁免。"
  },
  "dmField.copy.c0496": {
    "en": "Beast form",
    "zh-CN": "野兽形态"
  },
  "dmField.copy.c0497": {
    "en": "Wild Shape: the beast's name. The server reads its stat block.",
    "zh-CN": "荒野形态：填写野兽名称，自动读取其战斗数据。"
  },
  "dmField.copy.c0498": {
    "en": "Form's hit points",
    "zh-CN": "形态生命值"
  },
  "dmField.copy.c0499": {
    "en": "Form's armor class",
    "zh-CN": "形态护甲等级"
  },
  "dmField.copy.c0500": {
    "en": "Form's challenge rating",
    "zh-CN": "形态挑战等级"
  },
  "dmField.copy.c0501": {
    "en": "For a beast the server has no stat block for; the druid's level limits it.",
    "zh-CN": "仅用于没有战斗数据的野兽；受德鲁伊等级限制。"
  },
  "dmField.copy.c0502": {
    "en": "The form flies",
    "zh-CN": "形态可飞行"
  },
  "dmField.copy.c0503": {
    "en": "The form swims",
    "zh-CN": "形态可游泳"
  },
  "dmField.copy.c0504": {
    "en": "Or minutes",
    "zh-CN": "或填写分钟"
  },
  "dmField.copy.c0505": {
    "en": "Or hours",
    "zh-CN": "或填写小时"
  },
  "dmField.copy.c0506": {
    "en": "Or days",
    "zh-CN": "或填写天数"
  },
  "dmField.copy.c0507": {
    "en": "Caused by enemy",
    "zh-CN": "由敌人造成"
  },
  "dmField.copy.c0508": {
    "en": "Who they are frightened of, charmed or grappled by; it ends when that enemy falls.",
    "zh-CN": "造成恐惧、魅惑或擒抱的敌人；该敌人倒下时效果结束。"
  },
  "dmField.copy.c0509": {
    "en": "Or by character",
    "zh-CN": "或由角色造成"
  },
  "dmField.copy.c0510": {
    "en": "Or enemy",
    "zh-CN": "或指定敌人"
  },
  "dmField.copy.c0511": {
    "en": "Called",
    "zh-CN": "效果名称"
  },
  "dmField.copy.c0512": {
    "en": "Bless",
    "zh-CN": "祝福术"
  },
  "dmField.copy.c0513": {
    "en": "From",
    "zh-CN": "效果来源"
  },
  "dmField.copy.c0514": {
    "en": "Aldric's spell",
    "zh-CN": "奥德里克的法术"
  },
  "dmField.copy.c0515": {
    "en": "Changes",
    "zh-CN": "影响的数值"
  },
  "dmField.copy.c0516": {
    "en": "Attack rolls",
    "zh-CN": "攻击检定"
  },
  "dmField.copy.c0517": {
    "en": "Damage rolls",
    "zh-CN": "伤害掷骰"
  },
  "dmField.copy.c0518": {
    "en": "Saving throws",
    "zh-CN": "豁免"
  },
  "dmField.copy.c0519": {
    "en": "Ability checks",
    "zh-CN": "属性检定"
  },
  "dmField.copy.c0520": {
    "en": "Initiative",
    "zh-CN": "先攻"
  },
  "dmField.copy.c0521": {
    "en": "Speed",
    "zh-CN": "速度"
  },
  "dmField.copy.c0522": {
    "en": "Maximum hit points",
    "zh-CN": "生命值上限"
  },
  "dmField.copy.c0523": {
    "en": "By an amount",
    "zh-CN": "增加或减少"
  },
  "dmField.copy.c0524": {
    "en": "Set it to",
    "zh-CN": "设为固定值"
  },
  "dmField.copy.c0525": {
    "en": "Amount",
    "zh-CN": "数值"
  },
  "dmField.copy.c0526": {
    "en": "Reaches (feet)",
    "zh-CN": "范围（英尺）"
  },
  "dmField.copy.c0527": {
    "en": "Set when the effect surrounds its target; the board draws the ring at this radius.",
    "zh-CN": "效果围绕目标时设置；地图按此半径绘制光环。"
  },
  "dmField.copy.c0528": {
    "en": "Ring reads as",
    "zh-CN": "光环类型"
  },
  "dmField.copy.c0529": {
    "en": "Protective",
    "zh-CN": "防护"
  },
  "dmField.copy.c0530": {
    "en": "Hostile",
    "zh-CN": "敌对"
  },
  "dmField.copy.c0531": {
    "en": "Blessing",
    "zh-CN": "祝福"
  },
  "dmField.copy.c0532": {
    "en": "Neutral",
    "zh-CN": "中立"
  },
  "dmField.copy.c0533": {
    "en": "Lasts",
    "zh-CN": "持续时间"
  },
  "dmField.copy.c0534": {
    "en": "rounds",
    "zh-CN": "轮数"
  },
  "dmField.copy.c0535": {
    "en": "minutes",
    "zh-CN": "分钟"
  },
  "dmField.copy.c0536": {
    "en": "until the fight ends",
    "zh-CN": "直到战斗结束"
  },
  "dmField.copy.c0537": {
    "en": "until removed",
    "zh-CN": "直到移除"
  },
  "dmField.copy.c0538": {
    "en": "The party can tell",
    "zh-CN": "队伍可察觉"
  },
  "dmField.copy.c0539": {
    "en": "Concentration",
    "zh-CN": "专注"
  },
  "dmField.copy.c0540": {
    "en": "Cast as a ritual",
    "zh-CN": "作为仪式施放"
  },
  "dmField.copy.c0541": {
    "en": "Creatures, corpses or Hit Dice",
    "zh-CN": "生物、尸体或生命骰数量"
  },
  "dmField.copy.c0542": {
    "en": "For a material priced per one (Astral Projection, Create Undead, Imprisonment).",
    "zh-CN": "用于按数量定价的材料（星界投影、创造不死生物、禁锢术）。"
  },
  "dmField.copy.c0543": {
    "en": "Learn or forget",
    "zh-CN": "学习或遗忘"
  },
  "dmField.copy.c0544": {
    "en": "Learn it",
    "zh-CN": "学习"
  },
  "dmField.copy.c0545": {
    "en": "Forget it",
    "zh-CN": "删除地图"
  },
  "dmField.copy.c0546": {
    "en": "Field",
    "zh-CN": "原野"
  },
  "dmField.copy.c0547": {
    "en": "Race",
    "zh-CN": "种族"
  },
  "dmField.copy.c0548": {
    "en": "Class",
    "zh-CN": "职业"
  },
  "dmField.copy.c0549": {
    "en": "Subclass",
    "zh-CN": "子职业"
  },
  "dmField.copy.c0550": {
    "en": "Background",
    "zh-CN": "背景"
  },
  "dmField.copy.c0551": {
    "en": "Alignment",
    "zh-CN": "阵营"
  },
  "dmField.copy.c0552": {
    "en": "Level",
    "zh-CN": "等级"
  },
  "dmField.copy.c0553": {
    "en": "Experience points",
    "zh-CN": "经验值"
  },
  "dmField.copy.c0554": {
    "en": "Current hit points",
    "zh-CN": "当前生命值"
  },
  "dmField.copy.c0555": {
    "en": "Armor class",
    "zh-CN": "护甲等级"
  },
  "dmField.copy.c0556": {
    "en": "Gold",
    "zh-CN": "金币"
  },
  "dmField.copy.c0557": {
    "en": "Conditions",
    "zh-CN": "状态"
  },
  "dmField.copy.c0558": {
    "en": "Becomes",
    "zh-CN": "修改为"
  },
  "dmField.copy.c0559": {
    "en": "A whole number for a number. Conditions as a list (poisoned, prone), or none to clear them.",
    "zh-CN": "数值需填写整数。状态用列表（中毒、倒地）表示，填写 none 清除全部。"
  },
  "dmField.copy.c0560": {
    "en": "Rest",
    "zh-CN": "休息"
  },
  "dmField.copy.c0561": {
    "en": "Short rest",
    "zh-CN": "短休"
  },
  "dmField.copy.c0562": {
    "en": "Long rest",
    "zh-CN": "长休"
  },
  "dmField.copy.c0563": {
    "en": "Hit dice to spend",
    "zh-CN": "消耗的生命骰"
  },
  "dmField.copy.c0564": {
    "en": "Short rest, for a character with no player at the table. A connected player spends their own on their sheet.",
    "zh-CN": "用于短休时没有玩家在场的角色；在线玩家在自己的角色卡上选择生命骰。"
  },
  "dmField.copy.c0565": {
    "en": "Draconic ancestry",
    "zh-CN": "龙族血统"
  },
  "dmField.copy.c0566": {
    "en": "For a dragonborn; rolled on the SRD table when left unset.",
    "zh-CN": "用于龙裔；留空时按 SRD 表掷骰选择。"
  },
  "dmField.copy.c0567": {
    "en": "Black",
    "zh-CN": "黑龙"
  },
  "dmField.copy.c0568": {
    "en": "Blue",
    "zh-CN": "蓝龙"
  },
  "dmField.copy.c0569": {
    "en": "Brass",
    "zh-CN": "黄铜龙"
  },
  "dmField.copy.c0570": {
    "en": "Bronze",
    "zh-CN": "青铜"
  },
  "dmField.copy.c0571": {
    "en": "Copper",
    "zh-CN": "赤铜龙"
  },
  "dmField.copy.c0572": {
    "en": "Green",
    "zh-CN": "绿龙"
  },
  "dmField.copy.c0573": {
    "en": "Red",
    "zh-CN": "红龙"
  },
  "dmField.copy.c0574": {
    "en": "Silver",
    "zh-CN": "银龙"
  },
  "dmField.copy.c0575": {
    "en": "White",
    "zh-CN": "白龙"
  },
  "dmField.copy.c0576": {
    "en": "The party's average when left empty.",
    "zh-CN": "留空使用队伍平均值。"
  },
  "dmField.copy.c0577": {
    "en": "Party member",
    "zh-CN": "队伍成员"
  },
  "dmField.copy.c0578": {
    "en": "Scene ally",
    "zh-CN": "场景盟友"
  },
  "dmField.copy.c0579": {
    "en": "Personality",
    "zh-CN": "性格"
  },
  "dmField.copy.c0580": {
    "en": "Spells they know",
    "zh-CN": "已知法术"
  },
  "dmField.copy.c0581": {
    "en": "Cure Wounds, Bless",
    "zh-CN": "疗伤术、祝福术"
  },
  "dmField.copy.c0582": {
    "en": "For a caster, comma separated; the server keeps what their level allows.",
    "zh-CN": "施法者的法术用逗号分隔；自动保留等级允许的法术。"
  },
  "dmField.copy.c0583": {
    "en": "Dismiss this companion? They leave the party and the board.",
    "zh-CN": "遣散这个伙伴？其将离开队伍和地图。"
  },
  "dmField.copy.c0584": {
    "en": "Companion",
    "zh-CN": "伙伴"
  },
  "dmField.copy.c0585": {
    "en": "Place",
    "zh-CN": "地点"
  },
  "dmField.copy.c0586": {
    "en": "Layout",
    "zh-CN": "布局"
  },
  "dmField.copy.c0587": {
    "en": "Rooms, exits, landmarks. This is what the map is drawn from.",
    "zh-CN": "房间、出口和地标；地图根据这些信息绘制。"
  },
  "dmField.copy.c0588": {
    "en": "Leads to",
    "zh-CN": "通往"
  },
  "dmField.copy.c0589": {
    "en": "Other place names, comma separated.",
    "zh-CN": "其他地点名称，用逗号分隔。"
  },
  "dmField.copy.c0590": {
    "en": "They can see it",
    "zh-CN": "队伍可看见"
  },
  "dmField.copy.c0591": {
    "en": "Off in darkness or fog: no map is drawn.",
    "zh-CN": "处于黑暗或浓雾中时关闭，不绘制地图。"
  },
  "dmField.copy.c0592": {
    "en": "Off in darkness or fog: the map is not redrawn.",
    "zh-CN": "处于黑暗或浓雾中时关闭，不重绘地图。"
  },
  "dmField.copy.c0593": {
    "en": "Hours",
    "zh-CN": "小时"
  },
  "dmField.copy.c0594": {
    "en": "Give hours or miles.",
    "zh-CN": "填写小时数或英里数。"
  },
  "dmField.copy.c0595": {
    "en": "Or miles",
    "zh-CN": "或填写英里"
  },
  "dmField.copy.c0596": {
    "en": "The server works out the hours the pace and the ground need.",
    "zh-CN": "根据速度和地形自动计算时长。"
  },
  "dmField.copy.c0597": {
    "en": "Ground",
    "zh-CN": "地面"
  },
  "dmField.copy.c0598": {
    "en": "Normal",
    "zh-CN": "普通"
  },
  "dmField.copy.c0599": {
    "en": "Difficult (half the distance)",
    "zh-CN": "困难地形（距离减半）"
  },
  "dmField.copy.c0600": {
    "en": "Pace",
    "zh-CN": "行进速度"
  },
  "dmField.copy.c0601": {
    "en": "Slow",
    "zh-CN": "慢速"
  },
  "dmField.copy.c0602": {
    "en": "Fast",
    "zh-CN": "快速"
  },
  "dmField.copy.c0603": {
    "en": "Who travels",
    "zh-CN": "旅行者"
  },
  "dmField.copy.c0604": {
    "en": "Leave empty for the whole party.",
    "zh-CN": "留空选择整个队伍。"
  },
  "dmField.copy.c0605": {
    "en": "Water to be found",
    "zh-CN": "可获取的水源"
  },
  "dmField.copy.c0606": {
    "en": "Supplies variant only; holds until set to plenty.",
    "zh-CN": "仅用于补给变体；设为充足前持续生效。"
  },
  "dmField.copy.c0607": {
    "en": "Plenty",
    "zh-CN": "充足"
  },
  "dmField.copy.c0608": {
    "en": "Half (DC 15 CON a day)",
    "zh-CN": "一半（每天体质豁免 DC 15）"
  },
  "dmField.copy.c0609": {
    "en": "None",
    "zh-CN": "无"
  },
  "dmField.copy.c0610": {
    "en": "The journey",
    "zh-CN": "旅途"
  },
  "dmField.copy.c0611": {
    "en": "Toward the pass, by the old road",
    "zh-CN": "沿旧道前往山口"
  },
  "dmField.copy.c0612": {
    "en": "Exploration",
    "zh-CN": "探索"
  },
  "dmField.copy.c0613": {
    "en": "Negotiation",
    "zh-CN": "谈判"
  },
  "dmField.copy.c0614": {
    "en": "Chase",
    "zh-CN": "追逐"
  },
  "dmField.copy.c0615": {
    "en": "Ritual or task",
    "zh-CN": "仪式或任务"
  },
  "dmField.copy.c0616": {
    "en": "Successes needed",
    "zh-CN": "所需成功次数"
  },
  "dmField.copy.c0617": {
    "en": "Failures allowed",
    "zh-CN": "允许失败次数"
  },
  "dmField.copy.c0618": {
    "en": "If they win it",
    "zh-CN": "成功的结果"
  },
  "dmField.copy.c0619": {
    "en": "If they lose it",
    "zh-CN": "失败的结果"
  },
  "dmField.copy.c0620": {
    "en": "Who is in it",
    "zh-CN": "参与者"
  },
  "dmField.copy.c0621": {
    "en": "What they tried",
    "zh-CN": "尝试的行动"
  },
  "dmField.copy.c0622": {
    "en": "Skill",
    "zh-CN": "技能"
  },
  "dmField.copy.c0623": {
    "en": "persuasion",
    "zh-CN": "游说"
  },
  "dmField.copy.c0624": {
    "en": "Or ability",
    "zh-CN": "或使用属性"
  },
  "dmField.copy.c0625": {
    "en": "Difficulty",
    "zh-CN": "难度"
  },
  "dmField.copy.c0626": {
    "en": "Very easy (DC 5)",
    "zh-CN": "极易（DC 5）"
  },
  "dmField.copy.c0627": {
    "en": "Easy (DC 10)",
    "zh-CN": "简单（DC 10）"
  },
  "dmField.copy.c0628": {
    "en": "Moderate (DC 15)",
    "zh-CN": "适中（DC 15）"
  },
  "dmField.copy.c0629": {
    "en": "Hard (DC 20)",
    "zh-CN": "困难（DC 20）"
  },
  "dmField.copy.c0630": {
    "en": "Very hard (DC 25)",
    "zh-CN": "极难（DC 25）"
  },
  "dmField.copy.c0631": {
    "en": "Nearly impossible (DC 30)",
    "zh-CN": "几乎不可能（DC 30）"
  },
  "dmField.copy.c0632": {
    "en": "Or an exact DC",
    "zh-CN": "或填写具体 DC"
  },
  "dmField.copy.c0633": {
    "en": "That was the last of them",
    "zh-CN": "这是最后一名参与者"
  },
  "dmField.copy.c0634": {
    "en": "Mount",
    "zh-CN": "坐骑"
  },
  "dmField.copy.c0635": {
    "en": "warhorse",
    "zh-CN": "战马"
  },
  "dmField.copy.c0636": {
    "en": "Or write one",
    "zh-CN": "或自行填写"
  },
  "dmField.copy.c0637": {
    "en": "Its speed",
    "zh-CN": "坐骑速度"
  },
  "dmField.copy.c0638": {
    "en": "Its size",
    "zh-CN": "坐骑体型"
  },
  "dmField.copy.c0639": {
    "en": "Small",
    "zh-CN": "小型"
  },
  "dmField.copy.c0640": {
    "en": "Medium",
    "zh-CN": "中型"
  },
  "dmField.copy.c0641": {
    "en": "Large",
    "zh-CN": "大型"
  },
  "dmField.copy.c0642": {
    "en": "Huge",
    "zh-CN": "巨型"
  },
  "dmField.copy.c0643": {
    "en": "Trained to be ridden",
    "zh-CN": "受过骑乘训练"
  },
  "dmField.copy.c0644": {
    "en": "They chose to",
    "zh-CN": "主动下马"
  },
  "dmField.copy.c0645": {
    "en": "The mount was moved",
    "zh-CN": "坐骑被移动"
  },
  "dmField.copy.c0646": {
    "en": "The mount went down",
    "zh-CN": "坐骑倒下"
  },
  "dmField.copy.c0647": {
    "en": "They were knocked prone",
    "zh-CN": "骑手被击倒"
  },
  "dmField.copy.c0648": {
    "en": "Sky",
    "zh-CN": "天气"
  },
  "dmField.copy.c0649": {
    "en": "Clear",
    "zh-CN": "晴朗"
  },
  "dmField.copy.c0650": {
    "en": "Overcast",
    "zh-CN": "阴天"
  },
  "dmField.copy.c0651": {
    "en": "Rain",
    "zh-CN": "雨声"
  },
  "dmField.copy.c0652": {
    "en": "Storm",
    "zh-CN": "风暴"
  },
  "dmField.copy.c0653": {
    "en": "Snow",
    "zh-CN": "雪"
  },
  "dmField.copy.c0654": {
    "en": "Fog",
    "zh-CN": "雾"
  },
  "dmField.copy.c0655": {
    "en": "Wind",
    "zh-CN": "风"
  },
  "dmField.copy.c0656": {
    "en": "Air",
    "zh-CN": "风"
  },
  "dmField.copy.c0657": {
    "en": "Frigid (a hazard on a long march)",
    "zh-CN": "严寒（长途行军的危险）"
  },
  "dmField.copy.c0658": {
    "en": "Mild",
    "zh-CN": "温和"
  },
  "dmField.copy.c0659": {
    "en": "Warm",
    "zh-CN": "温暖"
  },
  "dmField.copy.c0660": {
    "en": "Hot (a hazard on a long march)",
    "zh-CN": "炎热（长途行军的危险）"
  },
  "dmField.copy.c0661": {
    "en": "Calm",
    "zh-CN": "平静"
  },
  "dmField.copy.c0662": {
    "en": "Breeze",
    "zh-CN": "微风"
  },
  "dmField.copy.c0663": {
    "en": "Gale (ranged attacks past 30 ft at disadvantage)",
    "zh-CN": "强风（超过 30 英尺的远程攻击具有劣势）"
  },
  "dmField.copy.c0664": {
    "en": "How heavy",
    "zh-CN": "强度"
  },
  "dmField.copy.c0665": {
    "en": "0 none to 3 heavy. Two or more cuts visibility to 60 ft in rain or snow.",
    "zh-CN": "0 为无，3 为强。雨雪强度达到 2 时，能见度降至 60 英尺。"
  },
  "dmField.copy.c0666": {
    "en": "The storm the fisherfolk warned of",
    "zh-CN": "渔民警告过的风暴"
  },
  "dmField.copy.c0667": {
    "en": "Of",
    "zh-CN": "数量"
  },
  "dmField.copy.c0668": {
    "en": "hours",
    "zh-CN": "小时"
  },
  "dmField.copy.c0669": {
    "en": "days",
    "zh-CN": "天"
  },
  "dmField.copy.c0670": {
    "en": "weeks",
    "zh-CN": "周"
  },
  "dmField.copy.c0671": {
    "en": "Challenge rating",
    "zh-CN": "挑战等级"
  },
  "dmField.copy.c0672": {
    "en": "Split between",
    "zh-CN": "分配对象"
  },
  "dmField.copy.c0673": {
    "en": "Individual treasure",
    "zh-CN": "个人财宝"
  },
  "dmField.copy.c0674": {
    "en": "Off rolls a hoard.",
    "zh-CN": "关闭时生成宝藏。"
  },
  "dmField.copy.c0675": {
    "en": "The object",
    "zh-CN": "物体"
  },
  "dmField.copy.c0676": {
    "en": "the oak door",
    "zh-CN": "橡木门"
  },
  "dmField.copy.c0677": {
    "en": "Named, it keeps its damage between blows. A Wall of Ice is struck a section at a time: \"Wall of Ice section 2\", the numbers on the board.",
    "zh-CN": "命名后保留每次攻击造成的伤害。冰墙术按区段攻击，例如“Wall of Ice section 2”，编号见地图。"
  },
  "dmField.copy.c0678": {
    "en": "Material",
    "zh-CN": "材质"
  },
  "dmField.copy.c0679": {
    "en": "Cloth",
    "zh-CN": "布料"
  },
  "dmField.copy.c0680": {
    "en": "Paper",
    "zh-CN": "纸"
  },
  "dmField.copy.c0681": {
    "en": "Rope",
    "zh-CN": "绳索"
  },
  "dmField.copy.c0682": {
    "en": "Crystal",
    "zh-CN": "水晶墙"
  },
  "dmField.copy.c0683": {
    "en": "Glass",
    "zh-CN": "玻璃"
  },
  "dmField.copy.c0684": {
    "en": "Ice",
    "zh-CN": "寒冰"
  },
  "dmField.copy.c0685": {
    "en": "Wood",
    "zh-CN": "木质"
  },
  "dmField.copy.c0686": {
    "en": "Bone",
    "zh-CN": "骨白色"
  },
  "dmField.copy.c0687": {
    "en": "Stone",
    "zh-CN": "石材"
  },
  "dmField.copy.c0688": {
    "en": "Iron",
    "zh-CN": "铁"
  },
  "dmField.copy.c0689": {
    "en": "Steel",
    "zh-CN": "钢"
  },
  "dmField.copy.c0690": {
    "en": "Mithral",
    "zh-CN": "秘银"
  },
  "dmField.copy.c0691": {
    "en": "Adamantine",
    "zh-CN": "精金"
  },
  "dmField.copy.c0692": {
    "en": "Size",
    "zh-CN": "体型"
  },
  "dmField.copy.c0693": {
    "en": "Tiny (a bottle, a lock)",
    "zh-CN": "微型（瓶子、锁）"
  },
  "dmField.copy.c0694": {
    "en": "Small (a chest, a lute)",
    "zh-CN": "小型（箱子、鲁特琴）"
  },
  "dmField.copy.c0695": {
    "en": "Medium (a barrel, a chandelier)",
    "zh-CN": "中型（桶、吊灯）"
  },
  "dmField.copy.c0696": {
    "en": "Large (a cart, a 10 ft window)",
    "zh-CN": "大型（推车、10 英尺窗户）"
  },
  "dmField.copy.c0697": {
    "en": "Struck by",
    "zh-CN": "攻击者"
  },
  "dmField.copy.c0698": {
    "en": "The server rolls their weapon attack against its AC and their damage.",
    "zh-CN": "用角色武器自动对物体的护甲等级进行攻击检定，并掷伤害骰。"
  },
  "dmField.copy.c0699": {
    "en": "With",
    "zh-CN": "使用武器"
  },
  "dmField.copy.c0700": {
    "en": "warhammer",
    "zh-CN": "战锤"
  },
  "dmField.copy.c0701": {
    "en": "From their equipment.",
    "zh-CN": "从其装备中选择。"
  },
  "dmField.copy.c0702": {
    "en": "Or damage",
    "zh-CN": "或直接指定伤害"
  },
  "dmField.copy.c0703": {
    "en": "Something other than a character's weapon.",
    "zh-CN": "来自角色武器以外的伤害。"
  },
  "dmField.copy.c0704": {
    "en": "Objects shrug off poison and psychic.",
    "zh-CN": "物体免疫毒素和心灵伤害。"
  },
  "dmField.copy.c0705": {
    "en": "Fragile",
    "zh-CN": "易碎"
  },
  "dmField.copy.c0706": {
    "en": "Its armor class",
    "zh-CN": "物体护甲等级"
  },
  "dmField.copy.c0707": {
    "en": "Overrides the material's.",
    "zh-CN": "覆盖材料默认值。"
  },
  "dmField.copy.c0708": {
    "en": "Its hit points",
    "zh-CN": "物体生命值"
  },
  "dmField.copy.c0709": {
    "en": "Overrides the size's.",
    "zh-CN": "覆盖体型默认值。"
  },
  "dmField.copy.c0710": {
    "en": "Damage threshold",
    "zh-CN": "伤害阈值"
  },
  "dmField.copy.c0711": {
    "en": "A castle wall's or a ship's: a blow below it does nothing.",
    "zh-CN": "用于城墙或船体：低于该阈值的单次伤害无效。"
  },
  "dmField.copy.c0712": {
    "en": "Acrobatics",
    "zh-CN": "特技"
  },
  "dmField.copy.c0713": {
    "en": "Animal Handling",
    "zh-CN": "驯兽"
  },
  "dmField.copy.c0714": {
    "en": "Arcana",
    "zh-CN": "奥秘"
  },
  "dmField.copy.c0715": {
    "en": "Athletics",
    "zh-CN": "运动"
  },
  "dmField.copy.c0716": {
    "en": "Deception",
    "zh-CN": "欺瞒"
  },
  "dmField.copy.c0717": {
    "en": "History",
    "zh-CN": "历史"
  },
  "dmField.copy.c0718": {
    "en": "Insight",
    "zh-CN": "洞悉"
  },
  "dmField.copy.c0719": {
    "en": "Intimidation",
    "zh-CN": "威吓"
  },
  "dmField.copy.c0720": {
    "en": "Medicine",
    "zh-CN": "医药"
  },
  "dmField.copy.c0721": {
    "en": "Nature",
    "zh-CN": "自然"
  },
  "dmField.copy.c0722": {
    "en": "Performance",
    "zh-CN": "表演"
  },
  "dmField.copy.c0723": {
    "en": "Persuasion",
    "zh-CN": "游说"
  },
  "dmField.copy.c0724": {
    "en": "Religion",
    "zh-CN": "宗教"
  },
  "dmField.copy.c0725": {
    "en": "Sleight of Hand",
    "zh-CN": "巧手"
  },
  "dmField.copy.c0726": {
    "en": "Stealth",
    "zh-CN": "隐匿"
  },
  "dmField.copy.c0727": {
    "en": "Survival",
    "zh-CN": "求生"
  },
  "dmField.copy.c0728": {
    "en": "Who rolls",
    "zh-CN": "掷骰者"
  },
  "dmField.copy.c0729": {
    "en": "Sense",
    "zh-CN": "感官"
  },
  "dmField.copy.c0730": {
    "en": "Noticed by",
    "zh-CN": "察觉者"
  },
  "dmField.copy.c0731": {
    "en": "Perception only.",
    "zh-CN": "仅用于察觉。"
  },
  "dmField.copy.c0732": {
    "en": "Sight (the light counts)",
    "zh-CN": "视觉（受光照影响）"
  },
  "dmField.copy.c0733": {
    "en": "Hearing (the light does not)",
    "zh-CN": "听觉（不受光照影响）"
  },
  "dmField.copy.c0734": {
    "en": "Light there",
    "zh-CN": "该处光照"
  },
  "dmField.copy.c0735": {
    "en": "Off the board; left empty, the current location and the hour decide.",
    "zh-CN": "脱离地图时使用；留空按当前地点和时间确定。"
  },
  "dmField.copy.c0736": {
    "en": "Bright",
    "zh-CN": "亮光"
  },
  "dmField.copy.c0737": {
    "en": "Dim (-5)",
    "zh-CN": "微光（-5）"
  },
  "dmField.copy.c0738": {
    "en": "Dark",
    "zh-CN": "黑暗"
  },
  "dmField.copy.c0739": {
    "en": "Hiding (enemy)",
    "zh-CN": "隐藏的敌人"
  },
  "dmField.copy.c0740": {
    "en": "The server rolls its Stealth (or Deception for Insight) as the DC.",
    "zh-CN": "掷其隐匿检定作为 DC；使用洞悉时，改用其欺瞒检定。"
  },
  "dmField.copy.c0741": {
    "en": "Hiding (stat block)",
    "zh-CN": "隐藏生物的战斗数据"
  },
  "dmField.copy.c0742": {
    "en": "goblin",
    "zh-CN": "哥布林"
  },
  "dmField.copy.c0743": {
    "en": "Out of a fight: the creature's stat block by name.",
    "zh-CN": "战斗外：按名称指定生物战斗数据。"
  },
  "dmField.copy.c0744": {
    "en": "Who might notice",
    "zh-CN": "可能察觉的角色"
  },
  "dmField.copy.c0745": {
    "en": "Attitude",
    "zh-CN": "态度"
  },
  "dmField.copy.c0746": {
    "en": "Indifferent",
    "zh-CN": "冷淡"
  },
  "dmField.copy.c0747": {
    "en": "Friendly",
    "zh-CN": "友好"
  },
  "dmField.copy.c0748": {
    "en": "Trait",
    "zh-CN": "显著特征"
  },
  "dmField.copy.c0749": {
    "en": "Found at",
    "zh-CN": "常驻地点"
  },
  "dmField.copy.c0750": {
    "en": "Wants",
    "zh-CN": "即时目标"
  },
  "dmField.copy.c0751": {
    "en": "Long game",
    "zh-CN": "长期目标"
  },
  "dmField.copy.c0752": {
    "en": "NPC",
    "zh-CN": "NPC"
  },
  "dmField.copy.c0753": {
    "en": "Modifier",
    "zh-CN": "调整值"
  },
  "dmField.copy.c0754": {
    "en": "Approach",
    "zh-CN": "交涉方式"
  },
  "dmField.copy.c0755": {
    "en": "Persuade",
    "zh-CN": "说服"
  },
  "dmField.copy.c0756": {
    "en": "Deceive",
    "zh-CN": "欺骗"
  },
  "dmField.copy.c0757": {
    "en": "Intimidate",
    "zh-CN": "威吓"
  },
  "dmField.copy.c0758": {
    "en": "NPC or companion",
    "zh-CN": "NPC 或伙伴"
  },
  "dmField.copy.c0759": {
    "en": "Their name as the table tracks it.",
    "zh-CN": "使用战役中记录的姓名。"
  },
  "dmField.copy.c0760": {
    "en": "What happened",
    "zh-CN": "发生的事"
  },
  "dmField.copy.c0761": {
    "en": "helped",
    "zh-CN": "提供帮助"
  },
  "dmField.copy.c0762": {
    "en": "kept word",
    "zh-CN": "信守承诺"
  },
  "dmField.copy.c0763": {
    "en": "generosity",
    "zh-CN": "慷慨"
  },
  "dmField.copy.c0764": {
    "en": "mercy",
    "zh-CN": "仁慈"
  },
  "dmField.copy.c0765": {
    "en": "courage",
    "zh-CN": "勇敢"
  },
  "dmField.copy.c0766": {
    "en": "honesty",
    "zh-CN": "诚实"
  },
  "dmField.copy.c0767": {
    "en": "defended",
    "zh-CN": "保护对方"
  },
  "dmField.copy.c0768": {
    "en": "shared peril",
    "zh-CN": "共历险境"
  },
  "dmField.copy.c0769": {
    "en": "confided",
    "zh-CN": "倾诉秘密"
  },
  "dmField.copy.c0770": {
    "en": "gift",
    "zh-CN": "赠送礼物"
  },
  "dmField.copy.c0771": {
    "en": "broke word",
    "zh-CN": "违背承诺"
  },
  "dmField.copy.c0772": {
    "en": "cruelty",
    "zh-CN": "残酷"
  },
  "dmField.copy.c0773": {
    "en": "greed",
    "zh-CN": "贪婪"
  },
  "dmField.copy.c0774": {
    "en": "deceit",
    "zh-CN": "欺骗"
  },
  "dmField.copy.c0775": {
    "en": "cowardice",
    "zh-CN": "怯懦"
  },
  "dmField.copy.c0776": {
    "en": "endangered",
    "zh-CN": "使对方陷入危险"
  },
  "dmField.copy.c0777": {
    "en": "ignored",
    "zh-CN": "忽视对方"
  },
  "dmField.copy.c0778": {
    "en": "insult",
    "zh-CN": "侮辱"
  },
  "dmField.copy.c0779": {
    "en": "betrayal",
    "zh-CN": "背叛"
  },
  "dmField.copy.c0780": {
    "en": "flirt",
    "zh-CN": "调情"
  },
  "dmField.copy.c0781": {
    "en": "compliment",
    "zh-CN": "赞美"
  },
  "dmField.copy.c0782": {
    "en": "grand gesture",
    "zh-CN": "隆重示爱"
  },
  "dmField.copy.c0783": {
    "en": "intimacy",
    "zh-CN": "亲密相处"
  },
  "dmField.copy.c0784": {
    "en": "One short line for the record",
    "zh-CN": "简短记录一句话"
  },
  "dmField.copy.c0785": {
    "en": "The next step only; the server refuses a skipped one.",
    "zh-CN": "只能推进到下一阶段，不能跳过阶段。"
  },
  "dmField.copy.c0786": {
    "en": "Interested",
    "zh-CN": "有意"
  },
  "dmField.copy.c0787": {
    "en": "Courting",
    "zh-CN": "追求中"
  },
  "dmField.copy.c0788": {
    "en": "Together",
    "zh-CN": "恋爱中"
  },
  "dmField.copy.c0789": {
    "en": "Betrothed",
    "zh-CN": "已订婚"
  },
  "dmField.copy.c0790": {
    "en": "Married",
    "zh-CN": "已婚"
  },
  "dmField.copy.c0791": {
    "en": "Record this death? The relationship closes for good.",
    "zh-CN": "记录这次死亡？这段关系将永久结束。"
  },
  "dmField.copy.c0792": {
    "en": "How it ends",
    "zh-CN": "结束方式"
  },
  "dmField.copy.c0793": {
    "en": "Falling out",
    "zh-CN": "失和"
  },
  "dmField.copy.c0794": {
    "en": "Parting",
    "zh-CN": "离别"
  },
  "dmField.copy.c0795": {
    "en": "Breakup",
    "zh-CN": "分手"
  },
  "dmField.copy.c0796": {
    "en": "Betrayal",
    "zh-CN": "背叛"
  },
  "dmField.copy.c0797": {
    "en": "Death",
    "zh-CN": "死亡"
  },
  "dmField.copy.c0798": {
    "en": "Empty only for an NPC's attack, damage or custom roll with its dice below.",
    "zh-CN": "仅在 NPC 使用下方骰子进行攻击、伤害或自定义掷骰时可留空。"
  },
  "dmField.copy.c0799": {
    "en": "Skill check",
    "zh-CN": "技能检定"
  },
  "dmField.copy.c0800": {
    "en": "Saving throw",
    "zh-CN": "豁免"
  },
  "dmField.copy.c0801": {
    "en": "Ability check",
    "zh-CN": "属性检定"
  },
  "dmField.copy.c0802": {
    "en": "Ability",
    "zh-CN": "属性"
  },
  "dmField.copy.c0803": {
    "en": "the rope is slick with rain",
    "zh-CN": "绳子被雨水打湿，十分滑溜"
  },
  "dmField.copy.c0804": {
    "en": "Kept with the roll as your ruling. Your pick stands either way; the AI DM's needs a circumstance the server cannot see.",
    "zh-CN": "随掷骰保存裁定理由。手动裁定始终采用你的选择；AI DM 需说明游戏无法自动判断的情境。"
  },
  "dmField.copy.c0805": {
    "en": "Who sees it",
    "zh-CN": "谁可以看见"
  },
  "dmField.copy.c0806": {
    "en": "Your screen. The dice are still the server's, and the number is still real.",
    "zh-CN": "仅在你的界面显示；骰子仍由服务端掷出，结果真实有效。"
  },
  "dmField.copy.c0807": {
    "en": "Everyone (default)",
    "zh-CN": "所有人（默认）"
  },
  "dmField.copy.c0808": {
    "en": "Blind: they know they rolled, not what",
    "zh-CN": "盲骰：只知道已掷骰，不知道结果"
  },
  "dmField.copy.c0809": {
    "en": "The roller and you",
    "zh-CN": "掷骰者和你"
  },
  "dmField.copy.c0810": {
    "en": "You alone",
    "zh-CN": "仅你"
  },
  "dmField.copy.c0811": {
    "en": "Dice",
    "zh-CN": "骰子"
  },
  "dmField.copy.c0812": {
    "en": "For an attack, damage or something else: 1d20+5, 2d6+3. Checks and saves come from the sheet.",
    "zh-CN": "攻击、伤害等骰式，例如 1d20+5、2d6+3；检定和豁免取自角色卡。"
  },
  "dmField.copy.c0813": {
    "en": "For a damage roll: the target's resistances apply.",
    "zh-CN": "伤害掷骰会应用目标抗性。"
  },
  "dmField.copy.c0814": {
    "en": "With a tool",
    "zh-CN": "使用工具"
  },
  "dmField.copy.c0815": {
    "en": "thieves' tools",
    "zh-CN": "盗贼工具"
  },
  "dmField.copy.c0816": {
    "en": "An ability check made with a tool: proficiency is added when they have it.",
    "zh-CN": "用工具进行属性检定：熟练使用该工具时加上熟练加值。"
  },
  "dmField.copy.c0817": {
    "en": "Advantage on this roll; refused when they hold none.",
    "zh-CN": "此次掷骰具有优势；没有激励时不能使用。"
  },
  "dmField.copy.c0818": {
    "en": "Lucky: an extra d20 on this roll, the best kept; the point is spent. Ignored without the feat or a point left.",
    "zh-CN": "幸运：额外掷 1 个 d20，保留最佳结果并消耗幸运点；没有该专长或幸运点时忽略。"
  },
  "dmField.copy.c0819": {
    "en": "Contested by (enemy)",
    "zh-CN": "对抗的敌人"
  },
  "dmField.copy.c0820": {
    "en": "A contest: the server rolls the enemy's opposing check (Insight against a lie, Perception against a sneak) as the DC.",
    "zh-CN": "进行对抗时，将敌人的相应检定作为 DC，例如用洞悉对抗谎言、用察觉对抗潜行。"
  },
  "dmField.copy.c0821": {
    "en": "Contested by (stat block)",
    "zh-CN": "对抗生物的战斗数据"
  },
  "dmField.copy.c0822": {
    "en": "guard",
    "zh-CN": "守卫"
  },
  "dmField.copy.c0823": {
    "en": "Out of a fight: the creature's stat block by name; its check is rolled as the DC.",
    "zh-CN": "战斗外：按名称指定生物战斗数据，其检定结果作为 DC。"
  },
  "dmField.copy.c0824": {
    "en": "Their skill",
    "zh-CN": "对方的技能"
  },
  "dmField.copy.c0825": {
    "en": "insight",
    "zh-CN": "洞悉"
  },
  "dmField.copy.c0826": {
    "en": "The creature's skill, when the usual pairing is not the one.",
    "zh-CN": "默认技能配对不适用时，指定生物使用的技能。"
  },
  "dmField.copy.c0827": {
    "en": "Damage lands on",
    "zh-CN": "伤害目标"
  },
  "dmField.copy.c0828": {
    "en": "For a damage roll in a fight: the server applies the total to this enemy.",
    "zh-CN": "战斗中的伤害掷骰：将总伤害应用于此敌人。"
  },
  "dmField.copy.c0829": {
    "en": "The save resists",
    "zh-CN": "豁免抵抗的效果"
  },
  "dmField.copy.c0830": {
    "en": "frightened, poison, a fireball",
    "zh-CN": "恐惧、毒素、火球术"
  },
  "dmField.copy.c0831": {
    "en": "So a trait that helps against it is applied.",
    "zh-CN": "据此应用抵抗该效果的特性。"
  },
  "dmField.copy.c0832": {
    "en": "What they are trying",
    "zh-CN": "尝试做什么"
  },
  "dmField.copy.c0833": {
    "en": "What you need",
    "zh-CN": "需要什么"
  },
  "dmField.copy.c0834": {
    "en": "To",
    "zh-CN": "接收者"
  },
  "dmField.copy.c0835": {
    "en": "Message",
    "zh-CN": "消息"
  },
  "dmField.copy.c0836": {
    "en": "Achievement",
    "zh-CN": "成就"
  },
  "dmField.copy.c0837": {
    "en": "Treasure",
    "zh-CN": "宝物"
  },
  "dmField.copy.c0838": {
    "en": "Bond",
    "zh-CN": "羁绊"
  },
  "dmField.copy.c0839": {
    "en": "Level up",
    "zh-CN": "升级"
  },
  "dmField.copy.c0840": {
    "en": "Story beat",
    "zh-CN": "故事节点"
  },
  "dmField.copy.c0841": {
    "en": "One sentence",
    "zh-CN": "一句话"
  },
  "dmField.copy.c0842": {
    "en": "Beat number",
    "zh-CN": "节拍编号"
  },
  "dmField.copy.c0843": {
    "en": "Title",
    "zh-CN": "标题"
  },
  "dmField.copy.c0844": {
    "en": "Optional; the note stands on its body.",
    "zh-CN": "可选；不填标题也会保留笔记正文。"
  },
  "dmField.copy.c0845": {
    "en": "Note",
    "zh-CN": "笔记"
  },
  "dmField.copy.c0846": {
    "en": "Chapter number",
    "zh-CN": "章节编号"
  },
  "dmField.copy.c0847": {
    "en": "Leave blank to search by what you remember instead.",
    "zh-CN": "留空按记得的内容搜索。"
  },
  "dmField.copy.c0848": {
    "en": "What you remember",
    "zh-CN": "记得的内容"
  },
  "dmField.copy.c0849": {
    "en": "the burned mill",
    "zh-CN": "烧毁的磨坊"
  },
  "dmField.copy.c0850": {
    "en": "Query",
    "zh-CN": "搜索词"
  },
  "dmField.copy.c0851": {
    "en": "Category",
    "zh-CN": "类别"
  },
  "dmField.copy.c0852": {
    "en": "any",
    "zh-CN": "任意"
  },
  "dmField.copy.c0853": {
    "en": "Blank searches every category.",
    "zh-CN": "留空搜索全部类别。"
  },
  "dmField.copy.c0854": {
    "en": "What to draw",
    "zh-CN": "画面内容"
  },
  "dmField.copy.c0855": {
    "en": "a flooded stone stair descending into black water, lit by one lantern",
    "zh-CN": "被水淹没的石阶伸入漆黑的水中，仅一盏灯笼照亮"
  },
  "dmField.copy.c0856": {
    "en": "Two at most: their portraits are passed as references.",
    "zh-CN": "最多两人，其肖像会作为参考图传入。"
  },
  "dmField.copy.c0857": {
    "en": "Where they are",
    "zh-CN": "所处环境"
  },
  "dmField.copy.c0858": {
    "en": "Blank keeps whatever is already playing.",
    "zh-CN": "留空保留当前播放的内容。"
  },
  "dmField.copy.c0859": {
    "en": "Silence",
    "zh-CN": "沉默术"
  },
  "dmField.copy.c0860": {
    "en": "Dungeon",
    "zh-CN": "地下城"
  },
  "dmField.copy.c0861": {
    "en": "Cave",
    "zh-CN": "洞穴"
  },
  "dmField.copy.c0862": {
    "en": "Crypt",
    "zh-CN": "墓穴"
  },
  "dmField.copy.c0863": {
    "en": "Sewer",
    "zh-CN": "下水道"
  },
  "dmField.copy.c0864": {
    "en": "Mine",
    "zh-CN": "矿洞"
  },
  "dmField.copy.c0865": {
    "en": "Ruins",
    "zh-CN": "废墟"
  },
  "dmField.copy.c0866": {
    "en": "Temple",
    "zh-CN": "神殿"
  },
  "dmField.copy.c0867": {
    "en": "Forest",
    "zh-CN": "森林"
  },
  "dmField.copy.c0868": {
    "en": "Night forest",
    "zh-CN": "夜间森林"
  },
  "dmField.copy.c0869": {
    "en": "Jungle",
    "zh-CN": "丛林"
  },
  "dmField.copy.c0870": {
    "en": "Swamp",
    "zh-CN": "沼泽"
  },
  "dmField.copy.c0871": {
    "en": "Desert",
    "zh-CN": "沙漠"
  },
  "dmField.copy.c0872": {
    "en": "Mountains",
    "zh-CN": "山脉"
  },
  "dmField.copy.c0873": {
    "en": "Frozen waste",
    "zh-CN": "冰冻荒原"
  },
  "dmField.copy.c0874": {
    "en": "Open country",
    "zh-CN": "开阔地"
  },
  "dmField.copy.c0875": {
    "en": "River",
    "zh-CN": "河流"
  },
  "dmField.copy.c0876": {
    "en": "Waterfall",
    "zh-CN": "瀑布"
  },
  "dmField.copy.c0877": {
    "en": "Coast",
    "zh-CN": "海岸"
  },
  "dmField.copy.c0878": {
    "en": "Aboard ship",
    "zh-CN": "船上"
  },
  "dmField.copy.c0879": {
    "en": "Underwater",
    "zh-CN": "水下"
  },
  "dmField.copy.c0880": {
    "en": "Village",
    "zh-CN": "村落"
  },
  "dmField.copy.c0881": {
    "en": "City street",
    "zh-CN": "城市街道"
  },
  "dmField.copy.c0882": {
    "en": "Market",
    "zh-CN": "集市"
  },
  "dmField.copy.c0883": {
    "en": "Crowd",
    "zh-CN": "人群"
  },
  "dmField.copy.c0884": {
    "en": "Tavern",
    "zh-CN": "酒馆"
  },
  "dmField.copy.c0885": {
    "en": "Camp",
    "zh-CN": "营地"
  },
  "dmField.copy.c0886": {
    "en": "Great hall",
    "zh-CN": "大厅"
  },
  "dmField.copy.c0887": {
    "en": "Library",
    "zh-CN": "图书馆"
  },
  "dmField.copy.c0888": {
    "en": "Forge",
    "zh-CN": "锻造坊"
  },
  "dmField.copy.c0889": {
    "en": "Graveyard",
    "zh-CN": "墓地"
  },
  "dmField.copy.c0890": {
    "en": "Arcane",
    "zh-CN": "奥术"
  },
  "dmField.copy.c0891": {
    "en": "Bare wind",
    "zh-CN": "空旷处的风声"
  },
  "dmField.copy.c0892": {
    "en": "Night",
    "zh-CN": "夜晚"
  },
  "dmField.copy.c0893": {
    "en": "Mood",
    "zh-CN": "氛围"
  },
  "dmField.copy.c0894": {
    "en": "Wonder",
    "zh-CN": "惊奇"
  },
  "dmField.copy.c0895": {
    "en": "Mystery",
    "zh-CN": "神秘"
  },
  "dmField.copy.c0896": {
    "en": "Tension",
    "zh-CN": "紧张"
  },
  "dmField.copy.c0897": {
    "en": "Dread",
    "zh-CN": "恐惧"
  },
  "dmField.copy.c0898": {
    "en": "Battle",
    "zh-CN": "战斗"
  },
  "dmField.copy.c0899": {
    "en": "The big one",
    "zh-CN": "强敌来袭"
  },
  "dmField.copy.c0900": {
    "en": "Triumph",
    "zh-CN": "胜利"
  },
  "dmField.copy.c0901": {
    "en": "Sorrow",
    "zh-CN": "悲伤"
  },
  "dmField.copy.c0902": {
    "en": "On the road",
    "zh-CN": "旅途"
  },
  "dmField.copy.c0903": {
    "en": "Festival",
    "zh-CN": "庆典"
  },
  "dmField.copy.c0904": {
    "en": "Hold it here",
    "zh-CN": "保持不变"
  },
  "dmField.copy.c0905": {
    "en": "Stops the engine changing this on its own when the party moves.",
    "zh-CN": "阻止游戏随队伍移动自动更换该设置。"
  },
  "dmField.copy.c0906": {
    "en": "The Sunken Chapel",
    "zh-CN": "沉没的礼拜堂"
  },
  "dmField.copy.c0907": {
    "en": "Under it",
    "zh-CN": "副标题"
  },
  "dmField.copy.c0908": {
    "en": "Where the bells still ring",
    "zh-CN": "钟声仍在回荡之处"
  },
  "dmField.copy.c0909": {
    "en": "Tone",
    "zh-CN": "色调"
  },
  "dmField.copy.c0910": {
    "en": "Gold (wonder, a chapter)",
    "zh-CN": "金色（奇观、章节）"
  },
  "dmField.copy.c0911": {
    "en": "Ember (danger)",
    "zh-CN": "余烬（危险）"
  },
  "dmField.copy.c0912": {
    "en": "Dawn (relief)",
    "zh-CN": "晨光（释然）"
  },
  "dmField.copy.c0913": {
    "en": "Plain",
    "zh-CN": "纯色"
  },
  "dmField.copy.c0914": {
    "en": "Sound",
    "zh-CN": "音效"
  },
  "dmField.copy.c0915": {
    "en": "Thunderclap",
    "zh-CN": "雷霆震击"
  },
  "dmField.copy.c0916": {
    "en": "Door slams",
    "zh-CN": "关门巨响"
  },
  "dmField.copy.c0917": {
    "en": "Door creaks open",
    "zh-CN": "门轴吱呀"
  },
  "dmField.copy.c0918": {
    "en": "Monster roar",
    "zh-CN": "怪物咆哮"
  },
  "dmField.copy.c0919": {
    "en": "Wolves",
    "zh-CN": "群狼"
  },
  "dmField.copy.c0920": {
    "en": "War horn",
    "zh-CN": "战号"
  },
  "dmField.copy.c0921": {
    "en": "Bell",
    "zh-CN": "铃铛"
  },
  "dmField.copy.c0922": {
    "en": "Gong",
    "zh-CN": "锣声"
  },
  "dmField.copy.c0923": {
    "en": "Scream",
    "zh-CN": "尖叫"
  },
  "dmField.copy.c0924": {
    "en": "Steel on steel",
    "zh-CN": "兵刃交击"
  },
  "dmField.copy.c0925": {
    "en": "A spell lands",
    "zh-CN": "法术击中"
  },
  "dmField.copy.c0926": {
    "en": "Coin",
    "zh-CN": "钱币"
  },
  "dmField.copy.c0927": {
    "en": "Crows",
    "zh-CN": "鸦鸣"
  },
  "dmField.copy.c0928": {
    "en": "Heartbeat",
    "zh-CN": "心跳"
  },
  "dmField.copy.c0929": {
    "en": "Chains",
    "zh-CN": "锁链"
  },
  "dmField.copy.c0930": {
    "en": "Splash",
    "zh-CN": "水花"
  },
  "dmField.copy.c0931": {
    "en": "Blade lands",
    "zh-CN": "刀刃命中"
  },
  "dmField.copy.c0932": {
    "en": "Arrow strikes",
    "zh-CN": "箭矢命中"
  },
  "dmField.copy.c0933": {
    "en": "Critical hit",
    "zh-CN": "重击"
  },
  "dmField.copy.c0934": {
    "en": "Swing and a miss",
    "zh-CN": "挥击落空"
  },
  "dmField.copy.c0935": {
    "en": "Fire spell",
    "zh-CN": "火焰法术"
  },
  "dmField.copy.c0936": {
    "en": "Cold spell",
    "zh-CN": "寒冷法术"
  },
  "dmField.copy.c0937": {
    "en": "Lightning spell",
    "zh-CN": "闪电法术"
  },
  "dmField.copy.c0938": {
    "en": "Radiant spell",
    "zh-CN": "光耀法术"
  },
  "dmField.copy.c0939": {
    "en": "Dark spell",
    "zh-CN": "黑暗法术"
  },
  "dmField.copy.c0940": {
    "en": "Healing",
    "zh-CN": "治疗"
  },
  "dmField.copy.c0941": {
    "en": "A death",
    "zh-CN": "死亡"
  },
  "dmField.copy.c0942": {
    "en": "Locked door",
    "zh-CN": "上锁的门"
  },
  "dmField.copy.c0943": {
    "en": "Secret door",
    "zh-CN": "暗门"
  },
  "dmField.copy.c0944": {
    "en": "Thud",
    "zh-CN": "沉闷撞击"
  },
  "dmField.copy.c0945": {
    "en": "Your turn",
    "zh-CN": "你的回合"
  },
  "dmField.copy.c0946": {
    "en": "Lore entry id",
    "zh-CN": "资料条目 ID"
  },
  "dmField.copy.c0947": {
    "en": "Paste from the binder, or use Show this now there",
    "zh-CN": "从资料集粘贴，或在资料集中使用“立即展示”"
  },
  "dmField.copy.c0948": {
    "en": "Or an uploaded picture",
    "zh-CN": "或使用上传的图片"
  },
  "dmField.copy.c0949": {
    "en": "/uploads/...",
    "zh-CN": "/uploads/..."
  },
  "dmField.copy.c0950": {
    "en": "Caption",
    "zh-CN": "图注"
  },
  "dmField.copy.c0951": {
    "en": "Found in the abbot's desk",
    "zh-CN": "在修道院长的书桌中发现"
  },
  "dmField.copy.c0952": {
    "en": "Handout id (blank for the current one)",
    "zh-CN": "展示资料 ID（留空使用当前资料）"
  },
  "dmField.copy.c0953": {
    "en": "Quest id (to change one)",
    "zh-CN": "任务 ID（用于修改现有任务）"
  },
  "dmField.copy.c0954": {
    "en": "Find the miller's daughter",
    "zh-CN": "寻找磨坊主的女儿"
  },
  "dmField.copy.c0955": {
    "en": "Objectives, one per line",
    "zh-CN": "目标，每行一项"
  },
  "dmField.copy.c0956": {
    "en": "Ask at the mill\nSearch the weir",
    "zh-CN": "询问磨坊的人\n搜索堰坝"
  },
  "dmField.copy.c0957": {
    "en": "Status",
    "zh-CN": "状态"
  },
  "dmField.copy.c0958": {
    "en": "Active",
    "zh-CN": "进行中"
  },
  "dmField.copy.c0959": {
    "en": "Done",
    "zh-CN": "已完成"
  },
  "dmField.copy.c0960": {
    "en": "Failed",
    "zh-CN": "失败"
  },
  "dmField.copy.c0961": {
    "en": "Who reads it",
    "zh-CN": "阅读权限"
  },
  "dmField.copy.c0962": {
    "en": "The party",
    "zh-CN": "队伍"
  },
  "dmField.copy.c0963": {
    "en": "Only me",
    "zh-CN": "仅我"
  },
  "dmField.copy.c0964": {
    "en": "Quest id",
    "zh-CN": "任务 ID"
  },
  "dmField.copy.c0965": {
    "en": "Objective id",
    "zh-CN": "目标 ID"
  },
  "dmField.copy.c0966": {
    "en": "Faction",
    "zh-CN": "势力"
  },
  "dmField.copy.c0967": {
    "en": "The Reed Court",
    "zh-CN": "芦苇宫廷"
  },
  "dmField.copy.c0968": {
    "en": "Change",
    "zh-CN": "变化量"
  },
  "dmField.copy.c0969": {
    "en": "They returned the abbot's seal",
    "zh-CN": "他们归还了修道院长的印章"
  },
  "dmField.copy.c0970": {
    "en": "The fact",
    "zh-CN": "事实内容"
  },
  "dmField.copy.c0971": {
    "en": "DM only for now",
    "zh-CN": "暂时仅 DM 可见"
  },
  "dmField.copy.c0972": {
    "en": "Thorp",
    "zh-CN": "小聚落"
  },
  "dmField.copy.c0973": {
    "en": "Hamlet",
    "zh-CN": "小村落"
  },
  "dmField.copy.c0974": {
    "en": "Town",
    "zh-CN": "城镇"
  },
  "dmField.copy.c0975": {
    "en": "City",
    "zh-CN": "城市"
  },
  "dmField.copy.c0976": {
    "en": "Terrain",
    "zh-CN": "地形"
  },
  "dmField.copy.c0977": {
    "en": "Plains",
    "zh-CN": "平原"
  },
  "dmField.copy.c0978": {
    "en": "Hills",
    "zh-CN": "丘陵"
  },
  "dmField.copy.c0979": {
    "en": "Marla's Sundries",
    "zh-CN": "玛拉杂货铺"
  },
  "dmField.copy.c0980": {
    "en": "General store",
    "zh-CN": "杂货铺"
  },
  "dmField.copy.c0981": {
    "en": "Smith",
    "zh-CN": "铁匠铺"
  },
  "dmField.copy.c0982": {
    "en": "Apothecary",
    "zh-CN": "药剂店"
  },
  "dmField.copy.c0983": {
    "en": "Outfitter",
    "zh-CN": "冒险用品店"
  },
  "dmField.copy.c0984": {
    "en": "Curiosities",
    "zh-CN": "奇珍店"
  },
  "dmField.copy.c0985": {
    "en": "Settlement",
    "zh-CN": "聚居地"
  },
  "dmField.copy.c0986": {
    "en": "Keeper",
    "zh-CN": "店主"
  },
  "dmField.copy.c0987": {
    "en": "An NPC's name",
    "zh-CN": "NPC 的姓名"
  },
  "dmField.copy.c0988": {
    "en": "Shop",
    "zh-CN": "商店"
  },
  "dmField.copy.c0989": {
    "en": "Price each (copper)",
    "zh-CN": "单价（铜币）"
  },
  "dmField.copy.c0990": {
    "en": "Only for an item the content pack has no price for.",
    "zh-CN": "仅用于内容包没有标价的物品。"
  },
  "dmField.copy.c0991": {
    "en": "Weight (lb)",
    "zh-CN": "重量（磅）"
  },
  "dmField.copy.c0992": {
    "en": "Lift",
    "zh-CN": "举起"
  },
  "dmField.copy.c0993": {
    "en": "Push",
    "zh-CN": "推"
  },
  "dmField.copy.c0994": {
    "en": "Drag",
    "zh-CN": "拖拽"
  },
  "dmField.copy.c0995": {
    "en": "Lifestyle",
    "zh-CN": "生活方式"
  },
  "dmField.copy.c0996": {
    "en": "Wretched",
    "zh-CN": "赤贫"
  },
  "dmField.copy.c0997": {
    "en": "Squalid",
    "zh-CN": "污秽"
  },
  "dmField.copy.c0998": {
    "en": "Poor",
    "zh-CN": "贫寒"
  },
  "dmField.copy.c0999": {
    "en": "Modest",
    "zh-CN": "简朴"
  },
  "dmField.copy.c1000": {
    "en": "Comfortable",
    "zh-CN": "舒适"
  },
  "dmField.copy.c1001": {
    "en": "Wealthy",
    "zh-CN": "富裕"
  },
  "dmField.copy.c1002": {
    "en": "Aristocratic",
    "zh-CN": "贵族"
  },
  "dmField.copy.c1003": {
    "en": "None (on the road)",
    "zh-CN": "无（在路上）"
  },
  "dmField.copy.c1004": {
    "en": "Days",
    "zh-CN": "天"
  },
  "dmField.copy.c1005": {
    "en": "Activity",
    "zh-CN": "活动"
  },
  "dmField.copy.c1006": {
    "en": "Crafting",
    "zh-CN": "制作"
  },
  "dmField.copy.c1007": {
    "en": "Practicing a profession",
    "zh-CN": "从事职业"
  },
  "dmField.copy.c1008": {
    "en": "Recuperating",
    "zh-CN": "休养"
  },
  "dmField.copy.c1009": {
    "en": "Researching",
    "zh-CN": "研究"
  },
  "dmField.copy.c1010": {
    "en": "Training",
    "zh-CN": "训练"
  },
  "dmField.copy.c1011": {
    "en": "Item to craft",
    "zh-CN": "制作的物品"
  },
  "dmField.copy.c1012": {
    "en": "Crafting: a nonmagical item; 5 gp of its value a day per crafter.",
    "zh-CN": "制作非魔法物品；每名制作者每天完成价值 5 金币的进度。"
  },
  "dmField.copy.c1013": {
    "en": "Tools",
    "zh-CN": "工具"
  },
  "dmField.copy.c1014": {
    "en": "Crafting: the artisan's tools; every crafter must be proficient.",
    "zh-CN": "制作所需的工匠工具；每名制作者都必须熟练使用。"
  },
  "dmField.copy.c1015": {
    "en": "Helping crafters",
    "zh-CN": "协助制作的角色"
  },
  "dmField.copy.c1016": {
    "en": "Language or tool to learn",
    "zh-CN": "学习的语言或工具"
  },
  "dmField.copy.c1017": {
    "en": "Training: 250 days at 1 gp a day.",
    "zh-CN": "训练需 250 天，每天花费 1 金币。"
  },
  "dmField.copy.c1018": {
    "en": "Training in",
    "zh-CN": "训练类型"
  },
  "dmField.copy.c1019": {
    "en": "A language",
    "zh-CN": "语言"
  },
  "dmField.copy.c1020": {
    "en": "A tool",
    "zh-CN": "工具"
  },
  "dmField.copy.c1021": {
    "en": "Research topic",
    "zh-CN": "研究主题"
  },
  "dmField.copy.c1022": {
    "en": "Research: 1 gp a day; what is found is yours to tell.",
    "zh-CN": "每天研究花费 1 金币；发现的内容由你描述。"
  },
  "dmField.copy.c1023": {
    "en": "Recuperating for",
    "zh-CN": "休养目的"
  },
  "dmField.copy.c1024": {
    "en": "Advantage against their disease or poison",
    "zh-CN": "对疾病或毒素的豁免具有优势"
  },
  "dmField.copy.c1025": {
    "en": "End what stops their healing",
    "zh-CN": "结束阻碍恢复生命值的效果"
  },
  "dmField.copy.c1026": {
    "en": "Employed by an organization",
    "zh-CN": "受雇于组织"
  },
  "dmField.copy.c1027": {
    "en": "Profession: covers a comfortable lifestyle.",
    "zh-CN": "从事职业可维持舒适的生活方式。"
  },
  "dmField.copy.c1028": {
    "en": "Performing",
    "zh-CN": "表演"
  },
  "dmField.copy.c1029": {
    "en": "Profession: a proficient performer covers a wealthy lifestyle.",
    "zh-CN": "熟练的表演者可维持富裕的生活方式。"
  },
  "dmField.copy.c1030": {
    "en": "What",
    "zh-CN": "效果类型"
  },
  "dmField.copy.c1031": {
    "en": "Disease",
    "zh-CN": "疾病"
  },
  "dmField.copy.c1032": {
    "en": "Madness",
    "zh-CN": "疯狂"
  },
  "dmField.copy.c1033": {
    "en": "Which",
    "zh-CN": "具体效果"
  },
  "dmField.copy.c1034": {
    "en": "One of this table's diseases or poisons",
    "zh-CN": "本战役中的疾病或毒素"
  },
  "dmField.copy.c1035": {
    "en": "Marsh Fever",
    "zh-CN": "沼泽热"
  },
  "dmField.copy.c1036": {
    "en": "Disease: Cackle Fever",
    "zh-CN": "疾病：狂笑热"
  },
  "dmField.copy.c1037": {
    "en": "Disease: Sewer Plague",
    "zh-CN": "疾病：下水道瘟疫"
  },
  "dmField.copy.c1038": {
    "en": "Disease: Sight Rot",
    "zh-CN": "疾病：目腐症"
  },
  "dmField.copy.c1039": {
    "en": "Madness: short-term",
    "zh-CN": "疯狂：短期"
  },
  "dmField.copy.c1040": {
    "en": "Madness: long-term",
    "zh-CN": "疯狂：长期"
  },
  "dmField.copy.c1041": {
    "en": "Madness: indefinite",
    "zh-CN": "疯狂：永久"
  },
  "dmField.copy.c1042": {
    "en": "Poison: Assassin's Blood (ingested)",
    "zh-CN": "毒素：刺客之血（摄入）"
  },
  "dmField.copy.c1043": {
    "en": "Poison: Burnt Othur Fumes (inhaled)",
    "zh-CN": "毒素：燃烧奥瑟烟（吸入）"
  },
  "dmField.copy.c1044": {
    "en": "Poison: Crawler Mucus (contact)",
    "zh-CN": "毒素：爬行者黏液（接触）"
  },
  "dmField.copy.c1045": {
    "en": "Poison: Drow Poison (injury)",
    "zh-CN": "毒素：卓尔毒药（伤口）"
  },
  "dmField.copy.c1046": {
    "en": "Poison: Essence of Ether (inhaled)",
    "zh-CN": "毒素：以太精华（吸入）"
  },
  "dmField.copy.c1047": {
    "en": "Poison: Malice (inhaled)",
    "zh-CN": "毒素：恶意（吸入）"
  },
  "dmField.copy.c1048": {
    "en": "Poison: Midnight Tears (ingested)",
    "zh-CN": "毒素：午夜之泪（摄入）"
  },
  "dmField.copy.c1049": {
    "en": "Poison: Oil of Taggit (contact)",
    "zh-CN": "毒素：塔吉特油（接触）"
  },
  "dmField.copy.c1050": {
    "en": "Poison: Pale Tincture (ingested)",
    "zh-CN": "毒素：苍白酊剂（摄入）"
  },
  "dmField.copy.c1051": {
    "en": "Poison: Purple Worm Poison (injury)",
    "zh-CN": "毒素：紫虫毒液（伤口）"
  },
  "dmField.copy.c1052": {
    "en": "Poison: Serpent Venom (injury)",
    "zh-CN": "毒素：蛇毒（伤口）"
  },
  "dmField.copy.c1053": {
    "en": "Poison: Torpor (ingested)",
    "zh-CN": "毒素：迟钝（摄入）"
  },
  "dmField.copy.c1054": {
    "en": "Poison: Truth Serum (ingested)",
    "zh-CN": "毒素：吐真剂（摄入）"
  },
  "dmField.copy.c1055": {
    "en": "Poison: Wyvern Poison (injury)",
    "zh-CN": "毒素：飞龙毒液（伤口）"
  },
  "dmField.copy.c1056": {
    "en": "Roll the save",
    "zh-CN": "进行豁免"
  },
  "dmField.copy.c1057": {
    "en": "Untick when they are already infected or have no save.",
    "zh-CN": "已感染或无需豁免时关闭。"
  },
  "dmField.copy.c1058": {
    "en": "Infection DC",
    "zh-CN": "感染 DC"
  },
  "dmField.copy.c1059": {
    "en": "Disease: when the source sets its own DC.",
    "zh-CN": "疾病来源具有自己的 DC 时填写。"
  },
  "dmField.copy.c1060": {
    "en": "Madness save DC",
    "zh-CN": "疯狂豁免 DC"
  },
  "dmField.copy.c1061": {
    "en": "Madness save",
    "zh-CN": "疯狂豁免"
  },
  "dmField.copy.c1062": {
    "en": "Symptoms now",
    "zh-CN": "立即出现症状"
  },
  "dmField.copy.c1063": {
    "en": "Disease: skip the incubation.",
    "zh-CN": "疾病：跳过潜伏期。"
  },
  "dmField.run": {
    "en": "Run",
    "zh-CN": "执行"
  },
  "dmField.runConfirm": {
    "en": "Run it",
    "zh-CN": "执行"
  },
  "dmField.blocked": {
    "en": "Needs a fight running. Start one first.",
    "zh-CN": "需要先开始一场战斗。"
  },
  "dmField.refused": {
    "en": "The engine refused that.",
    "zh-CN": "这次操作未能生效。"
  },
  "dmField.network": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "dmField.full": {
    "en": "Full",
    "zh-CN": "全额"
  },
  "dmField.half": {
    "en": "Half",
    "zh-CN": "一半"
  },
  "dmField.double": {
    "en": "Double",
    "zh-CN": "双倍"
  },
  "dmField.none": {
    "en": "None",
    "zh-CN": "无"
  },
  "dmField.enemies": {
    "en": "Enemies",
    "zh-CN": "敌人"
  },
  "dmField.characters": {
    "en": "Characters",
    "zh-CN": "角色"
  },
  "dmField.share": {
    "en": "Share for {name}",
    "zh-CN": "{name} 的伤害份额"
  },
  "dmField.takeOff": {
    "en": "Take {name} off",
    "zh-CN": "移除 {name}"
  },
  "dmField.addCreature": {
    "en": "Add a creature",
    "zh-CN": "添加生物"
  },
  "dmField.addTo": {
    "en": "Add to {field}",
    "zh-CN": "添加至{field}"
  },
  "dmField.diceLeft": {
    "en": "{left} left, {die}",
    "zh-CN": "剩余 {left} 个 {die}"
  },
  "dmField.noDice": {
    "en": "No hit dice left",
    "zh-CN": "没有可用的生命骰"
  },
  "dmField.diceFor": {
    "en": "Hit dice for {name}",
    "zh-CN": "{name} 的生命骰"
  },
  "dmField.pickCharacter": {
    "en": "Pick a character",
    "zh-CN": "选择角色"
  },
  "dmField.noCharacters": {
    "en": "Nobody has a character yet.",
    "zh-CN": "尚无角色。"
  },
  "dmField.noEnemy": {
    "en": "No enemy is standing.",
    "zh-CN": "没有站立的敌人。"
  },
  "dmField.pickEnemy": {
    "en": "Pick an enemy",
    "zh-CN": "选择敌人"
  },
  "dmField.pickWho": {
    "en": "Pick who",
    "zh-CN": "选择对象"
  },
  "dmField.notSet": {
    "en": "Not set",
    "zh-CN": "未设置"
  },
  "dmField.other": {
    "en": "{label}...",
    "zh-CN": "{label}……"
  },
  "dmField.dismiss": {
    "en": "Dismiss the result",
    "zh-CN": "关闭结果"
  },
  "dmField.needs": {
    "en": "{action} needs {field}.",
    "zh-CN": "{action}需要填写{field}。"
  },
  "dmField.number": {
    "en": "{field} must be a number.",
    "zh-CN": "{field}必须为数值。"
  },
  "dmField.boolean": {
    "en": "{field} must be true or false.",
    "zh-CN": "{field}必须为是或否。"
  },
  "dmField.rows": {
    "en": "{field} must be a list of rows.",
    "zh-CN": "{field}必须为条目列表。"
  },
  "dmField.oneOf": {
    "en": "{field} must be one of: {choices}.",
    "zh-CN": "{field}必须从这些选项中选择：{choices}。"
  }
});
