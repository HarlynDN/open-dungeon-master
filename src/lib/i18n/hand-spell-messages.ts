import { defineMessages } from "./catalog.ts";

// Owned mechanic notes copied from spellMechFor / MECH_OVERRIDES and
// authored-spells.json. Only player guidance is localized; engine protocols
// and the original note text stay unchanged. Full spell prose is separate.
export const HAND_SPELL_MESSAGES = defineMessages({
  "handMaterial.rules.spell.contact_other_plane": {
    "en": "The server rolls the caster's DC 15 INT save as the casting is paid: a failure is 6d6 psychic and insanity until a long rest. The five answers are the DM's.",
    "zh-CN": "结算施法消耗时，施法者进行难度 15 的智力豁免；失败则受到 6d6 点心灵伤害，并陷入疯狂，直到完成长休。五个问题的答案由地下城主叙述。"
  },
  "handMaterial.rules.spell.contagion": {
    "en": "On a hit the creature is afflicted with the disease the caster picks (afflict); it deals no damage of its own.",
    "zh-CN": "命中后，目标感染施法者选择的疾病；法术本身不造成伤害。"
  },
  "handMaterial.rules.spell.plane_shift": {
    "en": "On a hit the creature makes a Charisma save or is sent to the plane the caster names; it deals no damage.",
    "zh-CN": "命中后，目标进行魅力豁免；失败则被送往施法者指定的位面。本法术不造成伤害。"
  },
  "handMaterial.rules.spell.bless": {
    "en": "Up to three creatures, one more per slot level above 1st; concentration.",
    "zh-CN": "至多影响三个生物；法术位高于一环时，每高一环多影响一个生物。需要专注。"
  },
  "handMaterial.rules.spell.bane": {
    "en": "Up to three targets, one more per slot level above 1st; concentration.",
    "zh-CN": "至多影响三个目标；法术位高于一环时，每高一环多影响一个目标。需要专注。"
  },
  "handMaterial.rules.spell.mage_armor": {
    "en": "Ends early if the target dons armor.",
    "zh-CN": "目标穿上护甲时，法术提前结束。"
  },
  "handMaterial.rules.spell.haste": {
    "en": "When the spell ends the target cannot move or act until after its next turn; the server applies the lethargy.",
    "zh-CN": "法术结束后，目标直到下一回合结束都无法移动或行动；届时会施加迟滞效果。"
  },
  "handMaterial.rules.spell.polymorph": {
    "en": "Pass variant with the beast form (e.g. 'giant ape', 'tyrannosaurus rex'); the server applies the form's full stat block. The beast's CR must not exceed the target's level. Concentration; ends early at 0 beast HP.",
    "zh-CN": "选择野兽形态，例如巨猿或霸王龙；变形后采用该形态的完整数据。野兽的挑战等级不能超过目标等级。需要专注；野兽形态生命值降至 0 时提前结束。"
  },
  "handMaterial.rules.spell.slow": {
    "en": "Up to six creatures in a 40-foot cube; each saves again at the end of its turns. Concentration.",
    "zh-CN": "影响 40 英尺立方区域内至多六个生物；目标在每个回合结束时再次进行豁免。需要专注。"
  },
  "handMaterial.rules.spell.dominate_person": {
    "en": "The caster commands the charmed creature; it saves again each time it takes damage (the server rolls it). Concentration.",
    "zh-CN": "施法者指挥被魅惑的生物；目标每次受到伤害时再次进行豁免。需要专注。"
  },
  "handMaterial.rules.spell.dominate_beast": {
    "en": "The caster commands the charmed beast; it saves again each time it takes damage (the server rolls it). Concentration.",
    "zh-CN": "施法者指挥被魅惑的野兽；目标每次受到伤害时再次进行豁免。需要专注。"
  },
  "handMaterial.rules.spell.sleep": {
    "en": "No saving throw: one roll of the pool for the casting, spent from the lowest hit points up. Undead and creatures immune to being charmed are not affected. A sleeper wakes when it takes damage (the server ends it) or is shaken awake.",
    "zh-CN": "无需豁免：每次施法只掷一次生命值总额，从生命值最低的生物起依次扣除。不死生物和免疫魅惑的生物不受影响。沉睡者受到伤害或被摇醒时醒来。"
  },
  "handMaterial.rules.spell.color_spray": {
    "en": "No saving throw: one roll of the pool for the casting, spent from the lowest hit points up; blinded until the end of the caster's next turn.",
    "zh-CN": "无需豁免：每次施法只掷一次生命值总额，从生命值最低的生物起依次扣除。目标目盲，直到施法者的下一回合结束。"
  },
  "handMaterial.rules.spell.eldritch_blast": {
    "en": "One pc_attack call for each beam: two beams at 5th level, three at 11th, four at 17th, all from the one action. Each beam is 1d10 force.",
    "zh-CN": "每道射线分别进行一次攻击：5 级时两道，11 级时三道，17 级时四道，均来自同一个动作。每道造成 1d10 点力场伤害。"
  },
  "handMaterial.rules.spell.scorching_ray": {
    "en": "One pc_attack call for each ray: three rays, one more per slot level above 2nd, all from the one slot.",
    "zh-CN": "每道射线分别进行一次攻击：基础三道，法术位高于二环时，每高一环多一道；只消耗一个法术位。"
  },
  "handMaterial.rules.spell.wall_of_fire": {
    "en": "Concentration. A creature that ends its turn within 10 feet of the hot side, or enters the wall, takes the same damage again: aoe_damage with the spell again spends no slot.",
    "zh-CN": "需要专注。生物在火墙炽热一侧 10 英尺内结束回合，或进入火墙时，再次受到相同伤害；后续结算不再消耗法术位。"
  },
  "handMaterial.rules.spell.hunter_s_mark": {
    "en": "Name the quarry in the condition, e.g. \"hunter's mark (the ogre)\".",
    "zh-CN": "指定被追踪的猎物。"
  },
  "handMaterial.rules.spell.hex": {
    "en": "Name the target in the condition; it also has disadvantage on checks with one chosen ability.",
    "zh-CN": "指定目标，并选择一种属性；目标以该属性进行检定时具有劣势。"
  },
  "handMaterial.rules.spell.heroism": {
    "en": "The server grants the temporary hit points at the start of each of the target's turns.",
    "zh-CN": "目标在每个回合开始时获得临时生命值。"
  },
  "handMaterial.rules.spell.invisibility": {
    "en": "Ends when the target attacks or casts a spell.",
    "zh-CN": "目标攻击或施法时，隐形结束。"
  },
  "handMaterial.rules.spell.spiritual_weapon": {
    "en": "Attack with it via pc_attack, weapon 'Spiritual Weapon' (a bonus action).",
    "zh-CN": "使用灵体武器攻击需要一个附赠动作。"
  },
  "handMaterial.rules.spell.faerie_fire": {
    "en": "Each creature in a 20-foot cube saves; concentration.",
    "zh-CN": "20 英尺立方区域内的每个生物进行豁免。需要专注。"
  },
  "handMaterial.rules.spell.magic_missile": {
    "en": "Three darts, 1d4+1 each, +1 dart per slot level above 1st; they always hit. Name darts on cast_at_enemy to split them: the next target the same turn takes the darts left, with no second slot.",
    "zh-CN": "三枚飞弹，每枚造成 1d4+1 点伤害；法术位高于一环时，每高一环多一枚，必定命中。可以分配飞弹攻击不同目标；同一回合内，下一目标承受剩余飞弹，不再消耗法术位。"
  },
  "handMaterial.rules.spell.sanctuary": {
    "en": "Attackers must first pass a WIS save or pick a new target; ends if the warded creature attacks.",
    "zh-CN": "攻击者须先通过感知豁免，否则必须另选目标；受保护者攻击时，法术结束。"
  },
  "handMaterial.rules.spell.hypnotic_pattern": {
    "en": "Charmed and incapacitated with a speed of 0 for the duration, no repeat save; it ends for a creature that takes damage (the server ends it) or is shaken out of it with an action.",
    "zh-CN": "目标被魅惑且失能，速度为 0，持续期间不再进行豁免。受到伤害，或另一生物用动作将其唤醒时，该目标的效果结束。"
  },
  "handMaterial.rules.spell.blindness_deafness": {
    "en": "The caster chooses blinded or deafened (pass condition); the target saves again at the end of each of its turns.",
    "zh-CN": "选择使目标目盲或耳聋；目标在每个回合结束时再次进行豁免。"
  },
  "handMaterial.rules.spell.web": {
    "en": "Restrained until it breaks free: an action and a Strength check against the caster's DC (clear_enemy_condition on a success). Fire burns the web: 2d4 fire to a creature starting its turn in the burning strands.",
    "zh-CN": "目标受束缚，直到挣脱：消耗一个动作，进行力量检定对抗施法者的豁免难度，成功则解除束缚。火焰会烧毁蛛网；在燃烧蛛丝中开始回合的生物受到 2d4 点火焰伤害。"
  },
  "handMaterial.rules.spell.entangle": {
    "en": "Restrained until the spell ends, or until it frees itself with an action and a Strength check against the caster's DC.",
    "zh-CN": "目标受束缚，直到法术结束；也可消耗一个动作，进行力量检定对抗施法者的豁免难度，成功则挣脱。"
  },
  "handMaterial.rules.spell.fear": {
    "en": "A frightened creature drops what it holds and must Dash away each turn; it saves again only when it ends a turn out of the caster's sight.",
    "zh-CN": "恐慌的生物丢下手持物件，每回合必须疾跑远离；只有在施法者视线之外结束回合时，才能再次进行豁免。"
  },
  "handMaterial.rules.spell.confusion": {
    "en": "A confused creature rolls a d10 at the start of each turn for what it does (narrate the result) and cannot take reactions.",
    "zh-CN": "困惑的生物在每个回合开始时掷 d10 决定行动，由地下城主叙述结果；目标无法使用反应。"
  },
  "handMaterial.rules.spell.hideous_laughter": {
    "en": "Prone and incapacitated, unable to stand; it saves again at the end of each of its turns and each time it takes damage, with advantage then. A creature with Intelligence 4 or less is unaffected.",
    "zh-CN": "目标倒地且失能，无法起身；在每个回合结束时以及每次受到伤害时再次进行豁免，受到伤害时的豁免具有优势。智力为 4 或更低的生物不受影响。"
  },
  "handMaterial.rules.spell.calm_emotions": {
    "en": "The other choice, suppressing charm and fear on the creatures in the area, is the caster's to narrate.",
    "zh-CN": "另一个选项是压制区域内生物的魅惑和恐慌，由施法者叙述。"
  },
  "handMaterial.rules.spell.banishment": {
    "en": "Gone from the fight for the duration, with no repeat save; it returns to its space when concentration ends before a minute passes.",
    "zh-CN": "目标在持续期间离开战斗，不再进行豁免；若专注在一分钟内结束，目标返回原处。"
  },
  "handMaterial.rules.spell.power_word_stun": {
    "en": "No save: a creature with 150 hit points or fewer is stunned; it makes a CON save at the end of each of its turns.",
    "zh-CN": "施法时无需豁免：生命值不超过 150 的生物被震慑；在每个回合结束时进行体质豁免。"
  },
  "handMaterial.rules.spell.irresistible_dance": {
    "en": "No save when cast; the dancer dances in place (no movement), and may spend its action on a WIS save to stop (take_action escape). Creatures immune to being charmed are immune.",
    "zh-CN": "施法时无需豁免。目标在原地跳舞，无法移动；可消耗动作进行感知豁免，成功则停止。免疫魅惑的生物不受影响。"
  },
  "handMaterial.rules.spell.geas": {
    "en": "Charmed for 30 days; acting against the command deals 5d10 psychic, once a day.",
    "zh-CN": "目标被魅惑 30 天；违背命令时受到 5d10 点心灵伤害，每天至多一次。"
  },
  "handMaterial.rules.spell.spirit_guardians": {
    "en": "An enemy that starts its turn within 15 feet makes a WIS save or takes 3d8 radiant (half on a success); the server rolls it at the start of that enemy's turn on the battle map. Speed is halved inside.",
    "zh-CN": "在 15 英尺内开始回合的敌人进行感知豁免，失败受到 3d8 点光耀伤害，成功减半；战斗地图会在敌人回合开始时结算。区域内速度减半。"
  },
  "handMaterial.rules.spell.aid": {
    "en": "Up to three creatures; each one's hit point maximum and current hit points rise by 5 (+5 a slot level above 2nd) for 8 hours.",
    "zh-CN": "至多影响三个生物；每个目标的生命值上限和当前生命值增加 5，持续 8 小时。法术位高于二环时，每高一环再增加 5。"
  },
  "handMaterial.rules.spell.protection_from_energy": {
    "en": "Pass variant with the damage type: acid, cold, fire, lightning or thunder.",
    "zh-CN": "选择伤害类型：强酸、寒冷、火焰、闪电或雷鸣。"
  },
  "handMaterial.rules.spell.warding_bond": {
    "en": "Each time the warded creature takes damage the caster takes the same amount (apply_damage); it ends if the two are more than 60 feet apart.",
    "zh-CN": "受保护者每次受到伤害时，施法者也承受相同伤害；两者相距超过 60 英尺时结束。"
  },
  "handMaterial.rules.spell.enhance_ability": {
    "en": "Pass variant with the chosen effect; Bear's Endurance also grants 2d6 temporary hit points.",
    "zh-CN": "选择强化效果；熊之耐力还提供 2d6 点临时生命值。"
  },
  "handMaterial.rules.spell.fire_shield": {
    "en": "The warm shield resists cold, the chill shield fire (pass variant). A creature within 5 feet that hits with a melee attack takes 2d8 of the other type (damage_enemy).",
    "zh-CN": "选择暖盾或寒盾：暖盾抵抗寒冷，寒盾抵抗火焰。5 英尺内的生物以近战攻击命中时，受到另一种类型的 2d8 点伤害。"
  },
  "handMaterial.rules.spell.shillelagh": {
    "en": "The club or quarterstaff uses the caster's spellcasting ability for attack and damage, its damage die a d8, and it is magical (a bonus action).",
    "zh-CN": "以附赠动作施放：短棒或长棍的攻击和伤害改用施法属性，伤害骰变为 d8，且视为魔法武器。"
  },
  "handMaterial.rules.spell.feather_fall": {
    "en": "Up to five falling creatures descend 60 feet a round and take no falling damage when they land.",
    "zh-CN": "至多五个正在坠落的生物每轮下降 60 英尺，落地时不受坠落伤害。"
  },
  "handMaterial.rules.spell.spike_growth": {
    "en": "Difficult terrain; a creature takes 2d4 piercing for every 5 feet it moves through the area (damage_enemy).",
    "zh-CN": "区域视为困难地形；生物在其中每移动 5 英尺，受到 2d4 点穿刺伤害。"
  },
  "handMaterial.rules.spell.call_lightning": {
    "en": "Each later turn the caster's action calls another bolt with no slot: aoe_damage with the spell again.",
    "zh-CN": "之后每回合可用动作召来一道新雷电，不再消耗法术位。"
  },
  "handMaterial.rules.spell.moonbeam": {
    "en": "A creature entering the beam or starting its turn there saves again (aoe_damage with the spell again spends no slot); moving the beam takes the caster's action.",
    "zh-CN": "生物进入光束或在其中开始回合时再次进行豁免，不再消耗法术位；移动光束需要施法者的动作。"
  },
  "handMaterial.rules.spell.flaming_sphere": {
    "en": "A bonus action rams the sphere into a creature on later turns with no slot: cast_at_enemy with the spell again.",
    "zh-CN": "之后每回合可用附赠动作将火球撞向生物，不再消耗法术位。"
  },
  "handMaterial.rules.spell.flame_blade": {
    "en": "Attack with it via pc_attack, weapon 'Flame Blade' (an action each time, no slot).",
    "zh-CN": "使用火焰刀攻击，每次需要一个动作，不再消耗法术位。"
  },
  "handMaterial.rules.spell.mass_heal": {
    "en": "700 hit points divided among any number of creatures: one heal call per creature with its amount, the same turn, one slot.",
    "zh-CN": "将 700 点生命值分配给任意数量的生物；分别指定各目标的治疗量，同一回合内只消耗一个法术位。"
  },
  "handMaterial.rules.spell.dispel_magic": {
    "en": "Ends every spell of the slot's level or lower on the target; a higher one needs a spellcasting check against DC 10 + its level (the server rolls it).",
    "zh-CN": "解除目标身上环级不高于所用法术位的所有法术；解除更高环法术需进行施法属性检定，难度为 10 加该法术环级。"
  },
  "handMaterial.rules.spell.detect_thoughts": {
    "en": "Its effect is the table's to narrate; cast it with use_spell_slot.",
    "zh-CN": "法术效果由桌上叙述；施放时仍需正常消耗法术位。"
  },
  "handMaterial.rules.spell.forcecage": {
    "en": "The cage is laid on the battle map at atX/atY (else around the nearest creatures): no creature inside walks out, none outside walks in. Teleporting out takes a CHA save (the DM's to call).",
    "zh-CN": "牢笼放置在战斗地图指定位置；未指定时，围住最近的生物。笼内生物无法走出，笼外生物无法走入。传送离开需要魅力豁免，由地下城主发起。"
  },
  "handMaterial.rules.spell.thunderwave": {
    "en": "A creature that fails is pushed 10 feet away from the caster; the server moves its token on a battle map.",
    "zh-CN": "豁免失败的生物被推离施法者 10 英尺；战斗地图上的标记会随之移动。"
  },
  "handMaterial.rules.spell.gust_of_wind": {
    "en": "A creature in the line that fails its Strength save is pushed 15 feet away (the server moves its token); a bonus action each later turn blows again with no slot.",
    "zh-CN": "直线区域内的生物若力量豁免失败，被推开 15 英尺；战斗地图上的标记会随之移动。之后每回合可用附赠动作再次吹风，不再消耗法术位。"
  },
  "handMaterial.rules.spell.vicious_mockery": {
    "en": "On a failed save it has disadvantage on the next attack roll it makes before the end of its next turn; the server spends it on that roll.",
    "zh-CN": "豁免失败后，目标在下一回合结束前进行的下一次攻击掷骰具有劣势；该次攻击会消耗此效果。"
  },
  "handMaterial.rules.spell.harm": {
    "en": "Harm cannot take the target below 1 hit point; a failed save shrinks its hit point maximum by the necrotic damage taken, for an hour.",
    "zh-CN": "伤害不会使目标生命值降至 1 以下；豁免失败时，生命值上限减少，减少量等于所受黯蚀伤害，持续一小时。"
  },
  "handMaterial.rules.spell.heat_metal": {
    "en": "The damage is automatic. The holder makes a CON save or drops a held object; one that keeps it (armor it wears: pass condition \"armor\") has disadvantage on attacks and checks until the caster's next turn. The server rolls it. Each later turn a bonus action repeats the damage with no slot.",
    "zh-CN": "自动造成伤害。持有者进行体质豁免，失败则丢下手持物件；若仍持有物件或穿着该护甲，其攻击和检定具有劣势，直到施法者的下一回合。之后每回合可用附赠动作重复伤害，不再消耗法术位。"
  },
  "handMaterial.rules.spell.charm_person": {
    "en": "A creature the party is fighting saves with advantage (the server rolls it so). Charmed for an hour, or until the party harms it.",
    "zh-CN": "与队伍交战的生物进行豁免时具有优势。魅惑持续一小时，或直到队伍伤害目标。"
  },
  "handMaterial.rules.spell.command": {
    "en": "Name the word in condition: grovel lays it prone, halt stops it for its next turn (the server applies both); approach, drop and flee are narrated on its turn. No effect on undead.",
    "zh-CN": "选择命令词：伏地使目标倒地，止步使其下一回合停止行动；靠近、放下和逃离由目标在回合内执行并叙述。不死生物不受影响。"
  },
  "handMaterial.rules.spell.suggestion": {
    "en": "It pursues the suggested course for up to 8 hours; damage from the caster or the party ends it (the server ends it on damage). A creature that cannot be charmed is immune.",
    "zh-CN": "目标遵循建议的行动，至多 8 小时；施法者或队伍造成伤害时结束。免疫魅惑的生物不受影响。"
  },
  "handMaterial.rules.spell.mass_suggestion": {
    "en": "Up to twelve creatures pursue the course for 24 hours; damage from the caster or the party ends it for the one hurt.",
    "zh-CN": "至多十二个生物遵循建议的行动，持续 24 小时；施法者或队伍造成伤害时，受伤目标的效果结束。"
  },
  "handMaterial.rules.spell.levitate": {
    "en": "It rises up to 20 feet and can move only by pushing or pulling on something fixed: its speed is 0 while the spell lasts.",
    "zh-CN": "目标升高至多 20 英尺，只能借助固定物件推拉移动；法术持续期间速度为 0。"
  },
  "handMaterial.rules.spell.modify_memory": {
    "en": "Charmed and incapacitated while the caster reshapes its memory; what it remembers is narrated.",
    "zh-CN": "施法者重塑目标记忆时，目标被魅惑且失能；修改后的记忆由叙述确定。"
  },
  "handMaterial.rules.spell.stinking_cloud": {
    "en": "A creature that fails spends its action retching on its turn (the server holds it to that); creatures that need no breath or are immune to poison succeed. A creature starting its turn in the cloud saves again: aoe_damage with the spell again, no slot.",
    "zh-CN": "豁免失败的生物在自己的回合用动作干呕；无需呼吸或免疫毒素的生物自动成功。在云中开始回合时再次进行豁免，不再消耗法术位。"
  },
  "handMaterial.rules.spell.sleet_storm": {
    "en": "A creature that fails falls prone, and a concentrating creature caught makes a CON save or loses its concentration (the server rolls both). Entering or starting a turn in the storm saves again: aoe_damage with the spell again, no slot.",
    "zh-CN": "豁免失败的生物倒地；处于区域内且正在专注的生物进行体质豁免，失败则失去专注。进入区域或在其中开始回合时再次进行豁免，不再消耗法术位。"
  },
  "handMaterial.rules.spell.earthquake": {
    "en": "Each creature on the ground saves or falls prone, and a concentrating one makes a CON save or loses it. Fissures and collapsing buildings are narrated (their 5d6 through damage_enemy with source environment).",
    "zh-CN": "地面上的每个生物进行豁免，失败则倒地；正在专注的生物另进行体质豁免，失败则失去专注。裂隙与建筑坍塌由叙述确定，造成的 5d6 点伤害作为环境伤害结算。"
  },
  "handMaterial.rules.spell.blight": {
    "en": "No effect on undead or constructs; a plant creature saves with disadvantage and takes the maximum damage (the server applies both).",
    "zh-CN": "不死生物和构装体不受影响；植物生物的豁免具有劣势，并承受最大伤害。"
  },
  "handMaterial.rules.spell.chain_lightning": {
    "en": "The target and up to three more creatures within 30 feet of it, one more per slot level above 6th: one aoe_damage call naming them all, one slot.",
    "zh-CN": "影响目标及其 30 英尺内至多三个其他生物；法术位高于六环时，每高一环多一个目标。所有目标一起结算，只消耗一个法术位。"
  },
  "handMaterial.rules.spell.acid_splash": {
    "en": "One creature, or two standing within 5 feet of each other.",
    "zh-CN": "影响一个生物，或彼此相距不超过 5 英尺的两个生物。"
  },
  "handMaterial.rules.spell.bestow_curse": {
    "en": "Name the curse in condition: an ability (str to cha: disadvantage on its checks and saves), attacks (disadvantage on attack rolls against the caster), will (a WIS save at the start of each of its turns or it wastes its action), or necrotic (the caster's attacks and spells deal 1d8 necrotic more to it). The server holds each.",
    "zh-CN": "选择诅咒：某种属性的检定和豁免具有劣势；对施法者的攻击掷骰具有劣势；每回合开始时进行感知豁免，失败则浪费动作；或施法者的攻击和法术额外造成 1d8 点黯蚀伤害。所选效果按规则结算。"
  },
  "handMaterial.rules.spell.black_tentacles": {
    "en": "A creature that fails takes 3d6 bludgeoning and is restrained; one it holds takes 3d6 at the start of each of its turns (the server rolls it). It escapes with its action and a Strength or Dexterity check against the caster's DC (take_action escape).",
    "zh-CN": "豁免失败的生物受到 3d6 点钝击伤害并受束缚；被束缚者在每个回合开始时再受到 3d6 点伤害。可消耗动作，以力量或敏捷检定对抗施法者的豁免难度，成功则挣脱。"
  },
  "handMaterial.rules.spell.weird": {
    "en": "Frightened; at the end of each of its turns it saves again or takes 4d10 psychic, a success ending the spell for it. The server rolls it.",
    "zh-CN": "目标恐慌；在每个回合结束时再次进行豁免，失败受到 4d10 点心灵伤害，成功则该目标的法术效果结束。"
  },
  "handMaterial.rules.spell.phantasmal_killer": {
    "en": "At the end of each of its turns the target saves again or takes 4d10 psychic (+1d10 a slot level above 4th); a success ends the spell. The server rolls it.",
    "zh-CN": "目标在每个回合结束时再次进行豁免，失败受到 4d10 点心灵伤害；法术位高于四环时，每高一环增加 1d10。豁免成功则法术结束。"
  },
  "handMaterial.rules.spell.flesh_to_stone": {
    "en": "Restrained; it saves at the end of each of its turns: three successes end the spell, three failures turn it to stone (the server keeps the count).",
    "zh-CN": "目标受束缚，在每个回合结束时进行豁免；累计三次成功则法术结束，累计三次失败则石化。"
  },
  "handMaterial.rules.spell.eyebite": {
    "en": "Pass condition: unconscious (Asleep: ends on damage), frightened (Panicked: it Dashes away) or sickened (disadvantage on attacks and checks, a WIS save at the end of each turn). Each later turn the caster's action targets another creature with no slot.",
    "zh-CN": "选择效果：昏迷并沉睡，受到伤害时醒来；恐慌并疾跑逃离；或恶心，使攻击和检定具有劣势，在每个回合结束时进行感知豁免。之后每回合可用动作选择另一个生物，不再消耗法术位。"
  },
  "handMaterial.rules.spell.sunbeam": {
    "en": "Blinded until the caster's next turn on a failed save; undead and oozes save with disadvantage. Each later turn the caster's action sends another beam with no slot.",
    "zh-CN": "豁免失败的目标目盲，直到施法者的下一回合；不死生物和软泥的豁免具有劣势。之后每回合可用动作发出另一道光束，不再消耗法术位。"
  },
  "handMaterial.rules.spell.disintegrate": {
    "en": "A creature this drops to 0 hit points is disintegrated: dead, with nothing left to raise but by True Resurrection or Wish.",
    "zh-CN": "生命值因此降至 0 的生物被解离并死亡，尸体不复存在；只有完全复活术或祈愿术能使其复活。"
  },
  "handMaterial.rules.spell.divine_word": {
    "en": "By its hit points on a failed save: 20 or fewer killed, 30 or fewer blinded, deafened and stunned for an hour, 40 or fewer deafened and blinded for 10 minutes, 50 or fewer deafened for a minute; a celestial, elemental, fey or fiend that fails is sent home and leaves the fight. The server applies it.",
    "zh-CN": "豁免失败时按生命值决定效果：不超过 20 则死亡；不超过 30 则目盲、耳聋和震慑一小时；不超过 40 则耳聋和目盲 10 分钟；不超过 50 则耳聋一分钟。豁免失败的天界、元素、精类或邪魔被遣返原位面并离开战斗。"
  },
  "handMaterial.rules.spell.resilient_sphere": {
    "en": "Enclosed in the sphere: nothing passes in or out, so it cannot be attacked or harmed from outside, and harms nothing outside.",
    "zh-CN": "目标被封入球体，任何事物都无法进出；外部无法攻击或伤害目标，目标也无法伤害外部。"
  },
  "handMaterial.rules.spell.incendiary_cloud": {
    "en": "A creature entering the cloud or ending its turn there saves again: aoe_damage with the spell again, no slot. The cloud drifts 10 feet each turn.",
    "zh-CN": "生物进入云中或在其中结束回合时再次进行豁免，不再消耗法术位。云每回合漂移 10 英尺。"
  },
  "handMaterial.rules.spell.blade_barrier": {
    "en": "A creature entering the wall or starting its turn there saves again: aoe_damage with the spell again, no slot. The wall gives three-quarters cover and is difficult terrain.",
    "zh-CN": "生物进入墙体或在其中开始回合时再次进行豁免，不再消耗法术位。墙体提供四分之三掩护，并视为困难地形。"
  },
  "handMaterial.rules.spell.ray_of_enfeeblement": {
    "en": "On a hit its Strength weapon attacks deal half damage; it makes a CON save at the end of each round to end it (the server holds both). pc_attack with the spell and no damage.",
    "zh-CN": "命中后，目标使用力量的武器攻击伤害减半；在每轮结束时进行体质豁免，成功则结束。以法术攻击命中，不造成直接伤害。"
  },
  "handMaterial.rules.spell.gaseous_form": {
    "en": "A misty cloud: resistance to nonmagical damage, advantage on STR, DEX and CON saves, a 10-foot fly speed; it cannot attack or cast spells (the server refuses both).",
    "zh-CN": "变为雾云：抵抗非魔法伤害，力量、敏捷和体质豁免具有优势，飞行速度 10 英尺；无法攻击或施法。"
  },
  "handMaterial.rules.spell.heroes_feast": {
    "en": "Up to twelve diners: immune to poison and to being frightened, advantage on WIS saves, and their hit point maximum and hit points rise by 2d10 for 24 hours (the server rolls it once for each).",
    "zh-CN": "至多十二人享用：免疫毒素和恐慌，感知豁免具有优势，生命值上限和当前生命值各增加 2d10，持续 24 小时；每名目标分别掷骰。"
  },
  "handMaterial.rules.spell.dispel_evil_and_good": {
    "en": "Celestials, elementals, fey, fiends and undead have disadvantage on attacks against the caster (the server applies it). Break Enchantment and Dismissal are narrated.",
    "zh-CN": "天界、元素、精类、邪魔和不死生物对施法者的攻击具有劣势；破除附魔和遣返效果由叙述确定。"
  },
  "handMaterial.rules.spell.lesser_restoration": {
    "en": "Ends one of blinded, deafened, paralyzed or poisoned on the target, one disease, or a short- or long-term madness (name it in variant: disease, madness); with none held, nothing is cast.",
    "zh-CN": "解除目标的目盲、耳聋、麻痹或中毒之一，一种疾病，或一种短期、长期疯狂。请指定要解除的效果；若目标没有该效果，则不施法。"
  },
  "handMaterial.rules.spell.greater_restoration": {
    "en": "Ends one: a level of exhaustion, charmed, petrified, a curse, or an indefinite madness (name it in variant). Reduced ability scores and hit point maximums are narrated back.",
    "zh-CN": "解除一个效果：一级力竭、魅惑、石化、诅咒或永久疯狂。属性值和生命值上限的降低通过叙述恢复。"
  },
  "handMaterial.rules.spell.remove_curse": {
    "en": "Ends every curse on the target; a cursed magic item's attunement is broken (narrated).",
    "zh-CN": "解除目标身上的所有诅咒；受诅咒魔法物品的同调被解除，由叙述确定。"
  },
  "handMaterial.rules.spell.power_word_kill": {
    "en": "No save: a creature with 100 hit points or fewer dies; one with more is untouched.",
    "zh-CN": "无需豁免：生命值不超过 100 的生物死亡，超过 100 则不受影响。"
  },
  "handMaterial.rules.spell.mind_blank": {
    "en": "Immune to psychic damage and to being charmed for 24 hours (the server refuses both); divination and mind reading are narrated.",
    "zh-CN": "免疫心灵伤害和魅惑，持续 24 小时；预言和读心受到阻挡，由叙述确定。"
  },
  "handMaterial.rules.spell.foresight": {
    "en": "Advantage on attack rolls, checks and saves, and attacks against it have disadvantage, for 8 hours (the server applies all of it).",
    "zh-CN": "攻击掷骰、检定和豁免具有优势，针对目标的攻击具有劣势，持续 8 小时。"
  },
  "handMaterial.rules.spell.animate_objects": {
    "en": "Up to ten objects become creatures under the caster's command: bring them in with add_companion; their slams are their own attacks.",
    "zh-CN": "至多十个物件变为听从施法者指挥的生物，作为伙伴加入；它们分别进行自己的挥击攻击。"
  },
  "handMaterial.rules.spell.regenerate": {
    "en": "The target regains 1 hit point at the start of each of its turns for an hour (the server adds it); a severed limb regrows in two minutes.",
    "zh-CN": "目标在每个回合开始时恢复 1 点生命值，持续一小时；断肢在两分钟内再生。"
  },
  "handMaterial.rules.spell.etherealness": {
    "en": "Up to eight hours; three more willing creatures per slot level above 7th (cast again for each).",
    "zh-CN": "持续至多 8 小时；法术位高于七环时，每高一环可多影响三个自愿生物，分别施放。"
  },
  "handMaterial.rules.spell.mislead": {
    "en": "An illusory double appears where the caster stands; the invisibility ends if they attack or cast a spell.",
    "zh-CN": "施法者原处出现幻象替身；施法者攻击或施法时，隐形结束。"
  },
  "handMaterial.rules.spell.antimagic_field": {
    "en": "The field moves with the caster on the battle map: no spell is cast inside it and none from outside affects a creature in it. Magic items, summoned creatures and other spells' areas inside are suppressed; narrate them.",
    "zh-CN": "反魔法区域在战斗地图上随施法者移动；区域内无法施法，外部法术无法影响区域内生物。魔法物品、召唤生物及其他法术的区域效果在其中受到压制，由叙述确定。"
  },
  "handMaterial.rules.spell.antilife_shell": {
    "en": "The barrier moves with the caster on the battle map: no creature but an undead or a construct passes it or reaches through it in melee.",
    "zh-CN": "屏障在战斗地图上随施法者移动；除不死生物和构装体外，其他生物无法穿过屏障，也无法通过近战越过屏障触及目标。"
  },
  "handMaterial.rules.spell.animal_shapes": {
    "en": "Each willing creature takes a Large or smaller beast form of CR 4 or lower (variant), keeping its Intelligence, Wisdom and Charisma; damage past the form's hit points returns it to its own.",
    "zh-CN": "自愿生物变为挑战等级不超过 4、体型为大型或更小的野兽，保留智力、感知和魅力；超出野兽形态生命值的伤害使其恢复原形。"
  },
  "handMaterial.rules.spell.shapechange": {
    "en": "The caster takes a beast form (variant) of CR up to their level, keeping their Intelligence, Wisdom and Charisma. A form that is not a beast is the DM's to run.",
    "zh-CN": "施法者选择挑战等级不超过自身等级的野兽形态，保留智力、感知和魅力。非野兽形态由地下城主处理。"
  },
  "handMaterial.rules.spell.imprisonment": {
    "en": "The chosen prison (burial, chaining, hedged prison, minimus containment, slumber) is the caster's to narrate; the creature is out of the fight until the spell is dispelled.",
    "zh-CN": "选择囚禁方式：深埋、锁链、迷宫、微型禁锢或沉睡，由施法者叙述；目标离开战斗，直到法术被解除。"
  },
  "handMaterial.rules.spell.prismatic_spray": {
    "en": "Each creature caught rolls a d8 for its ray (the server rolls): 1-5 10d6 fire, acid, lightning, poison or cold (half on a made DEX save); 6 indigo, restrained and petrified after three failed CON saves; 7 violet, blinded and sent to another plane on a failed WIS save at the caster's next turn; 8 two rays.",
    "zh-CN": "每个受影响的生物掷 d8 决定射线：1 至 5 分别造成 10d6 点火焰、强酸、闪电、毒素或寒冷伤害，敏捷豁免成功减半；6 为靛蓝，目标受束缚，三次体质豁免失败后石化；7 为紫色，目标目盲，在施法者下一回合进行感知豁免，失败则被送往另一位面；8 受到两道射线。"
  },
  "handMaterial.rules.spell.booming_blade": {
    "en": "A melee WEAPON attack: resolve with pc_attack and the caster's weapon. On a hit the target takes 1d8 thunder (cantrip scaling) if it willingly moves before the caster's next turn.",
    "zh-CN": "进行一次近战武器攻击，使用施法者的武器。命中后，若目标在施法者下一回合之前自愿移动，受到 1d8 点雷鸣伤害，随戏法等级提升。"
  },
  "handMaterial.rules.spell.green_flame_blade": {
    "en": "A melee WEAPON attack via pc_attack. On a hit, a second creature within 5 feet takes fire damage equal to the spellcasting modifier (apply with damage_enemy).",
    "zh-CN": "进行一次近战武器攻击。命中后，5 英尺内的另一个生物受到火焰伤害，数值等于施法属性调整值。"
  },
  "handMaterial.rules.spell.magic_stone": {
    "en": "Charged pebbles: ranged spell attacks for 1d6 + spellcasting modifier bludgeoning.",
    "zh-CN": "为小石子充能；使用远程法术攻击，造成 1d6 加施法属性调整值的钝击伤害。"
  },
  "handMaterial.rules.spell.absorb_elements": {
    "en": "Cast as a reaction to elemental damage; pick the variant matching the triggering type.",
    "zh-CN": "受到元素伤害时以反应施放；选择与触发伤害相同的元素类型。"
  },
  "handMaterial.rules.spell.silvery_barbs": {
    "en": "A reaction: the triggering creature rerolls its d20 and takes the lower; another creature gains advantage on one d20 roll within a minute.",
    "zh-CN": "使用反应：触发生物重掷 d20 并取较低结果；另一生物在一分钟内的一次 d20 掷骰获得优势。"
  },
  "handMaterial.rules.spell.cloud_of_daggers": {
    "en": "4d4 slashing (no save) when a creature enters the cube or starts its turn there; apply per-turn with cast_at_enemy.",
    "zh-CN": "生物进入立方区域或在其中开始回合时，受到 4d4 点挥砍伤害，无需豁免；每回合分别结算。"
  },
  "handMaterial.rules.spell.draconic_mischief": {
    "en": "Roll the mischief table each round; resolve each forced save with cast_at_enemy or cast_at_player.",
    "zh-CN": "每轮掷恶作剧表；随结果分别结算每次强制豁免。"
  },
  "handMaterial.rules.spell.life_transference": {
    "en": "The caster takes 4d8 necrotic damage that cannot be reduced (apply_damage), and the target regains twice the total (heal).",
    "zh-CN": "施法者受到 4d8 点无法减少的黯蚀伤害，目标恢复等于实际伤害总额两倍的生命值。"
  },
  "handMaterial.rules.spell.guardian_of_nature": {
    "en": "Great Tree also grants 10 temporary hit points; set them with update_sheet.",
    "zh-CN": "巨树形态还提供 10 点临时生命值，记录在角色卡上。"
  },
  "handMaterial.rules.spell.wrath_of_nature": {
    "en": "Resolve each lash, restraint, trip, and rock volley with aoe_damage or cast_at_enemy as it happens.",
    "zh-CN": "每次鞭打、束缚、绊倒和岩石齐射发生时分别结算。"
  },
  "handMaterial.rules.spell.ravenous_void": {
    "en": "Creatures in the sphere are restrained and take 5d10 force at the start of each of their turns.",
    "zh-CN": "球体内的生物受束缚，并在每个回合开始时受到 5d10 点力场伤害。"
  }
});
