import { defineMessages } from "./catalog.ts";

// Player-facing wording of the existing native guidance. Engine/tool guidance
// stays unchanged, and unknown extension resources keep their own description.
export const SHEET_RESOURCE_HELP_MESSAGES = /*#__PURE__*/ defineMessages({
  "sheetDialog.resourceHelp.rage": {
    "en": "A bonus action. Raging for up to 1 minute: resistance to bludgeoning, piercing, and slashing damage, bonus damage on melee Strength attacks, and advantage on Strength checks and saves, none of it while wearing heavy armor. The server applies all of it; the rage ends early if they end it, fall unconscious, or end a turn without having attacked or taken damage since their last one.",
    "zh-CN": "消耗附赠动作进入狂暴，最多持续 1 分钟。未穿重甲时，对钝击、穿刺和挥砍伤害具有抗性，基于力量的近战攻击获得额外伤害，力量检定和豁免具有优势。这些效果会自动应用。主动结束狂暴、失去意识，或回合结束时自上一回合以来既未攻击也未受到伤害，都会使狂暴提前结束。"
  },
  "sheetDialog.resourceHelp.ki": {
    "en": "Ki fuels Flurry of Blows (a bonus-action pair of unarmed strikes: resolve each with pc_attack), Patient Defense (Dodge), and Step of the Wind (Dash or Disengage, doubled jump).",
    "zh-CN": "气可用于疾风连击（消耗附赠动作，进行两次徒手攻击）、闪避术（采取闪避），以及疾风步（采取疾走或撤离，跳跃距离翻倍）。"
  },
  "sheetDialog.resourceHelp.sorcery_points": {
    "en": "Sorcery points buy Metamagic on a spell being cast (spend with amount), or convert to and from spell slots: call use_resource with variant like 'create a 2nd-level slot' (costs 2/3/5/6/7 points for levels 1-5) or 'convert my 3rd-level slot into points' and the server moves the points and slots. Created slots vanish on a long rest. Quickened Spell: call use_resource with variant 'Quickened Spell' before the cast; the server spends 2 points and the next spell of one action this turn takes the bonus action. The spell itself still goes through use_spell_slot or cast_at_enemy as normal.",
    "zh-CN": "术法点可用于施法时的超魔法，也可与法术位互相转化。创造一至五环法术位分别消耗 2、3、5、6、7 点；将法术位转化为术法点时，会同步调整两者的数量。创造的法术位在长休后消失。法术瞬发在施法前消耗 2 点，使本回合下一次原本需要一个动作的施法改为消耗附赠动作；法术本身仍需正常结算。"
  },
  "sheetDialog.resourceHelp.luck_points": {
    "en": "Lucky (or Level Up's Fortunate): three luck points a long rest. One spent on their own attack roll, ability check or saving throw rolls an extra d20 and keeps the best (pc_attack luck: true, request_roll luck: true; the server spends the point), or on an attack made against them (use_reaction 'lucky' after the hit: the attacker's d20 is rolled again and the lower kept; no reaction is spent).",
    "zh-CN": "幸运（或 Level Up 的 Fortunate）在每次长休后提供 3 点幸运点。自己的攻击掷骰、属性检定或豁免消耗 1 点时，额外掷一个 d20 并取较好的结果，幸运点会自动扣除。敌人攻击命中后，也可用 1 点使攻击者重掷 d20 并取较低的结果；此用途不消耗反应。"
  },
  "sheetDialog.resourceHelp.ki_inner_resilience": {
    "en": "Inner Resilience (Tome of Heroes): 3 ki points for Patient Defense or Step of the Wind, 3 more on a monk's own; back after a short rest.",
    "zh-CN": "内在韧性（Tome of Heroes）提供 3 点气，用于闪避术或疾风步；武僧在自身气的基础上额外获得这 3 点。短休后恢复。"
  },
  "sheetDialog.resourceHelp.superiority_dice_martial_adept": {
    "en": "Martial Adept: one superiority die (a d6) for the two maneuvers the feat taught, one more on a Battle Master's own; back after a short rest.",
    "zh-CN": "武术学徒提供一个 d6 卓越骰，用于该专长教授的两种战技；战斗大师在自身卓越骰的基础上额外获得一个。短休后恢复。"
  },
  "sheetDialog.resourceHelp.sorcery_points_metamagic_adept": {
    "en": "Metamagic Adept: 2 sorcery points for the two Metamagic options the feat taught, on top of a sorcerer's own; back after a long rest.",
    "zh-CN": "超魔法学徒提供 2 点术法点，用于该专长教授的两种超魔法选项；术士在自身术法点的基础上额外获得这 2 点。长休后恢复。"
  },
  "sheetDialog.resourceHelp.second_wind": {
    "en": "A bonus action that restores 1d10 + fighter level hit points to the fighter.",
    "zh-CN": "消耗附赠动作，恢复 1d10＋战士等级的生命值。"
  },
  "sheetDialog.resourceHelp.action_surge": {
    "en": "One additional action this turn, on top of the regular one. Resolve the extra action with its own tool call (a second pc_attack, a cast, a Dash).",
    "zh-CN": "本回合在常规动作之外额外获得一个动作。额外的攻击、施法或疾走会单独结算。"
  },
  "sheetDialog.resourceHelp.channel_divinity": {
    "en": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "zh-CN": "引导神圣力量，产生子职对应的效果。驱散亡灵：30 英尺内的亡灵进行对抗施法难度的感知豁免，失败则被驱散 1 分钟；牧师从 5 级起，可直接摧毁挑战等级不超过摧毁亡灵阈值的目标。神圣武器（奉献之誓）：武器攻击掷骰增加魅力调整值，持续 1 分钟。维持生命（生命领域）：在选定角色之间分配总计 5×牧师等级的治疗，各目标最多恢复至其生命值上限的一半。驱散或恐慌状态以豁免结果为准。"
  },
  "sheetDialog.resourceHelp.bardic_inspiration": {
    "en": "The target keeps the inspiration die for up to 10 minutes and adds it to one ability check, attack roll, or saving throw. The server hands it to them and spends it on their next roll automatically. From bard 5 (Font of Inspiration) the uses come back on a short rest too.",
    "zh-CN": "目标可保留诗人激励骰最多 10 分钟，用于一次属性检定、攻击掷骰或豁免。激励骰会交给目标，并在其下一次掷骰时自动消耗。吟游诗人从 5 级起获得激励之源，使用次数也可在短休后恢复。"
  },
  "sheetDialog.resourceHelp.wild_shape": {
    "en": "The druid takes on a beast's form: its hit points, AC, and natural attacks, keeping their own mind. Damage spills back to their own hit points when the form drops.",
    "zh-CN": "德鲁伊化为野兽，使用野兽的生命值、护甲等级和天生攻击，但保留自身的心智。形态解除时，超出野兽生命值的伤害会转移至自身生命值。"
  },
  "sheetDialog.resourceHelp.lay_on_hands": {
    "en": "A touch that restores hit points straight from the paladin's pool: the amount spent is the amount healed. Spend 5 instead to cure one disease or neutralize one poison.",
    "zh-CN": "通过触碰，从圣武士的圣疗池中直接恢复生命值，消耗多少点就治疗多少点。也可消耗 5 点，治愈一种疾病或中和一种毒素。"
  },
  "sheetDialog.resourceHelp.divine_sense": {
    "en": "Until the end of their next turn the paladin knows the location of any celestial, fiend, or undead within 60 feet that is not behind total cover, and of consecrated or desecrated ground.",
    "zh-CN": "直到下一回合结束，圣武士可感知 60 英尺内未处于全身掩护后的天界生物、邪魔和亡灵的位置，以及受祝圣或亵渎的区域。"
  },
  "sheetDialog.resourceHelp.relentless_endurance": {
    "en": "This is not spent by choice: the server drops them to 1 hit point instead of 0 the next time damage would fell them, and burns the use itself.",
    "zh-CN": "无需主动消耗。当下一次伤害本应使生命值降至 0 且未直接造成死亡时，生命值改为 1，并自动消耗这次使用机会。"
  },
  "sheetDialog.resourceHelp.arcane_recovery": {
    "en": "Once a day, on a short rest, the wizard recovers expended spell slots totalling half their level (rounded up), none of them 6th level or higher.",
    "zh-CN": "每日一次，在短休时恢复已消耗的法术位，总环阶不超过法师等级的一半（向上取整），且不能恢复六环或更高环阶的法术位。"
  },
  "sheetDialog.resourceHelp.natural_recovery": {
    "en": "Once a day, on a short rest, the druid recovers expended spell slots totalling half their druid level (rounded up), none of them 6th level or higher.",
    "zh-CN": "每日一次，在短休时恢复已消耗的法术位，总环阶不超过德鲁伊等级的一半（向上取整），且不能恢复六环或更高环阶的法术位。"
  },
  "sheetDialog.resourceHelp.breath_weapon": {
    "en": "A cone or line of the dragonborn's ancestral damage type. Resolve it with aoe_damage using the dice, save, DC and damage type this call reports (the ancestry sets the type and the save).",
    "zh-CN": "龙裔喷吐先祖对应伤害类型的锥形或线形吐息。伤害骰、豁免属性、难度和伤害类型由血统及本次结算结果决定。"
  },
  "sheetDialog.resourceHelp.indomitable": {
    "en": "The fighter rerolls the saving throw they last failed and must use the new roll. The server rerolls it; on a success the condition that save put on them comes off.",
    "zh-CN": "重掷战士上一次失败的豁免，必须采用新结果。重掷成功时，该次豁免导致的状态会被解除。"
  },
  "sheetDialog.resourceHelp.cleansing_touch": {
    "en": "An action that ends one spell on the paladin or on a willing creature they touch. Clear what the spell left with clear_condition.",
    "zh-CN": "消耗一个动作，结束圣武士自身或其触碰的自愿生物身上的一个法术，并移除该法术留下的效果。"
  },
  "sheetDialog.resourceHelp.stroke_of_luck": {
    "en": "An attack that missed a target in range hits instead, or a failed ability check is treated as a 20 on the d20.",
    "zh-CN": "一次对射程内目标未命中的攻击改为命中，或将一次失败的属性检定的 d20 结果视为 20。"
  },
  "sheetDialog.resourceHelp.inspiration": {
    "en": "Inspiration is spent on a roll, not with use_resource: pass useInspiration on request_roll for advantage on that check, save or attack.",
    "zh-CN": "激励在掷骰时消耗，使该次属性检定、豁免或攻击掷骰具有优势；不能作为单独的资源使用。"
  },
  "sheetDialog.resourceHelp.relentless_rage": {
    "en": "Not spent by choice: while raging, damage that drops them to 0 (and does not kill them outright) forces a CON save, DC 10 plus 5 for every use since their last rest, and a success leaves them at 1 hit point. The server rolls it.",
    "zh-CN": "无需主动消耗。狂暴时，若伤害使生命值降至 0 且未直接造成死亡，则进行体质豁免：初始难度为 10，自上次休息以来每使用一次增加 5。成功时生命值保留为 1，豁免会自动结算。"
  },
  "sheetDialog.resourceHelp.wholeness_of_body": {
    "en": "An action: the monk regains hit points equal to three times their monk level.",
    "zh-CN": "消耗一个动作，恢复相当于武僧等级三倍的生命值。"
  },
  "sheetDialog.resourceHelp.eldritch_master": {
    "en": "One minute spent entreating the patron: every expended Pact Magic slot comes back. The server refills them.",
    "zh-CN": "花费 1 分钟向宗主恳求，恢复全部已消耗的契约魔法法术位。"
  },
  "sheetDialog.resourceHelp.signature_spell_1": {
    "en": "The first spell named on Signature Spells, cast at 3rd level with no slot; the server spends it when the spell is cast.",
    "zh-CN": "招牌法术中的第一个法术可以三环施放，无需消耗法术位。施法时会自动消耗该次使用机会。"
  },
  "sheetDialog.resourceHelp.signature_spell_2": {
    "en": "The second spell named on Signature Spells, cast at 3rd level with no slot; the server spends it when the spell is cast.",
    "zh-CN": "招牌法术中的第二个法术可以三环施放，无需消耗法术位。施法时会自动消耗该次使用机会。"
  },
  "sheetDialog.resourceHelp.overchannel": {
    "en": "Pass overchannel on cast_at_enemy or aoe_damage: the spell deals its maximum damage; after the first use each long rest the wizard takes 2d12 necrotic per spell level (1d12 more per level each further use), which the server rolls.",
    "zh-CN": "使用超限施法，使法术造成最大伤害。每次长休后的首次使用无需额外代价；之后使用时，法师每环受到 2d12 黯蚀伤害，每再使用一次，每环伤害再增加 1d12。这些伤害会自动掷骰结算。"
  },
  "sheetDialog.resourceHelp.dark_ones_own_luck": {
    "en": "The warlock adds a d10 to one ability check or saving throw. The server holds the die on them and adds it to their next check or save.",
    "zh-CN": "邪术师为一次属性检定或豁免增加一个 d10。该骰会保留，并自动加入其下一次属性检定或豁免。"
  },
  "sheetDialog.resourceHelp.hurl_through_hell": {
    "en": "After a hit, the creature vanishes through the lower planes until the end of the warlock's next turn and, unless it is a fiend, takes 10d10 psychic damage when it returns. Resolve the damage with damage_enemy (type psychic); no save is allowed.",
    "zh-CN": "攻击命中后，目标消失于下层位面，直到邪术师的下一回合结束。目标返回时，若不是邪魔，则受到 10d10 心灵伤害，无需进行豁免。"
  },
  "sheetDialog.resourceHelp.mystic_arcanum_6": {
    "en": "The warlock's one 6th level arcanum is cast once without a spell slot, and again only after a long rest. Resolve the spell with its own tool.",
    "zh-CN": "邪术师的六环玄奥秘法可施放一次，无需消耗法术位，长休后才能再次使用。法术本身会单独结算。"
  },
  "sheetDialog.resourceHelp.mystic_arcanum_7": {
    "en": "The warlock's one 7th level arcanum is cast once without a spell slot, and again only after a long rest. Resolve the spell with its own tool.",
    "zh-CN": "邪术师的七环玄奥秘法可施放一次，无需消耗法术位，长休后才能再次使用。法术本身会单独结算。"
  },
  "sheetDialog.resourceHelp.mystic_arcanum_8": {
    "en": "The warlock's one 8th level arcanum is cast once without a spell slot, and again only after a long rest. Resolve the spell with its own tool.",
    "zh-CN": "邪术师的八环玄奥秘法可施放一次，无需消耗法术位，长休后才能再次使用。法术本身会单独结算。"
  },
  "sheetDialog.resourceHelp.mystic_arcanum_9": {
    "en": "The warlock's one 9th level arcanum is cast once without a spell slot, and again only after a long rest. Resolve the spell with its own tool.",
    "zh-CN": "邪术师的九环玄奥秘法可施放一次，无需消耗法术位，长休后才能再次使用。法术本身会单独结算。"
  }
});
