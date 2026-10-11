import { defineMessages } from "./catalog.ts";

// Display wording for the six remaining base counters and generated native
// theme resources. English values retain the original engine guidance.
export const ADDITIONAL_RESOURCE_MESSAGES = /*#__PURE__*/ defineMessages({
  "sheetPlay.resourceName.inspiring_leader": {
    "en": "Inspiring Leader",
    "zh-CN": "鼓舞领袖"
  },
  "sheetDialog.resourceHelp.inspiring_leader": {
    "en": "Inspiring Leader (or Level Up's Rallying Speaker): ten minutes of rallying words give up to six friendly creatures within 30 feet who can hear and understand them temporary hit points equal to the speaker's level plus Charisma modifier; one use per creature (targetCharacterId), and a creature cannot benefit again until it finishes a rest.",
    "zh-CN": "鼓舞领袖（或 Level Up 的振奋演说者）：用 10 分钟的鼓舞话语，使 30 英尺内至多六个能听懂你的友好生物获得等于演说者等级 + 魅力调整值的临时生命值。每次使用指定一个生物；该生物完成休息前不能再次受益。"
  },
  "sheetPlay.resourceName.cyberpunk_adrenal_override": {
    "en": "Adrenal Override",
    "zh-CN": "肾上腺超载"
  },
  "sheetDialog.resourceHelp.cyberpunk_adrenal_override": {
    "en": "1/short rest, take one additional action on your turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：在自己的回合额外获得一个动作。"
  },
  "sheetPlay.resourceName.cyberpunk_backup_frame": {
    "en": "Backup Frame",
    "zh-CN": "备用机体"
  },
  "sheetDialog.resourceHelp.cyberpunk_backup_frame": {
    "en": "Rebuild a destroyed drone on a long rest for free, or in 1 minute once per day.",
    "zh-CN": "长休时可免费重建被摧毁的无人机；或每日一次，花费 1 分钟重建。"
  },
  "sheetPlay.resourceName.cyberpunk_bullet_time": {
    "en": "Bullet Time",
    "zh-CN": "子弹时间"
  },
  "sheetDialog.resourceHelp.cyberpunk_bullet_time": {
    "en": "Reaction: +3 AC against one ranged attack you can see, 3/long rest.",
    "zh-CN": "消耗一个反应，对一次你能看见的远程攻击，护甲等级 +3。每次长休后可使用 3 次。"
  },
  "sheetPlay.resourceName.cyberpunk_daemon_swarm": {
    "en": "Daemon Swarm",
    "zh-CN": "守护程序群"
  },
  "sheetDialog.resourceHelp.cyberpunk_daemon_swarm": {
    "en": "1/long rest, split one single-target damaging program among up to three targets.",
    "zh-CN": "每次长休后可使用 1 次：将一个单体伤害程序分配给至多三个目标。"
  },
  "sheetPlay.resourceName.cyberpunk_deus_in_machina": {
    "en": "Deus in Machina",
    "zh-CN": "机中之神"
  },
  "sheetDialog.resourceHelp.cyberpunk_deus_in_machina": {
    "en": "1/long rest, for 1 minute your drones act independently and you may cast one routine through each.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，无人机独立行动，你可以通过每架无人机施放一个子程序。"
  },
  "sheetPlay.resourceName.cyberpunk_everyone_owes_you": {
    "en": "Everyone Owes You",
    "zh-CN": "人人欠你人情"
  },
  "sheetDialog.resourceHelp.cyberpunk_everyone_owes_you": {
    "en": "1/long rest, the DM tells you one useful secret about a person you converse with.",
    "zh-CN": "每次长休后可使用 1 次：地下城主告知与你交谈者的一个有用秘密。"
  },
  "sheetPlay.resourceName.cyberpunk_ghost_protocol": {
    "en": "Ghost Protocol",
    "zh-CN": "幽灵协议"
  },
  "sheetDialog.resourceHelp.cyberpunk_ghost_protocol": {
    "en": "1/long rest, one drone turns invisible for 1 minute.",
    "zh-CN": "每次长休后可使用 1 次：使一架无人机隐形，持续 1 分钟。"
  },
  "sheetPlay.resourceName.cyberpunk_grease_the_wheels": {
    "en": "Grease the Wheels",
    "zh-CN": "打点关系"
  },
  "sheetDialog.resourceHelp.cyberpunk_grease_the_wheels": {
    "en": "1/short rest, reroll a failed CHA-based check.",
    "zh-CN": "每次短休或长休后可使用 1 次：重掷一次失败的魅力检定。"
  },
  "sheetPlay.resourceName.cyberpunk_indomitable_firmware": {
    "en": "Indomitable Firmware",
    "zh-CN": "不屈固件"
  },
  "sheetDialog.resourceHelp.cyberpunk_indomitable_firmware": {
    "en": "1/long rest, reroll a failed saving throw.",
    "zh-CN": "每次长休后可使用 1 次：重掷一次失败的豁免。"
  },
  "sheetPlay.resourceName.cyberpunk_jury_rig": {
    "en": "Jury-Rig",
    "zh-CN": "临时改装"
  },
  "sheetDialog.resourceHelp.cyberpunk_jury_rig": {
    "en": "2/long rest, 10 minutes of tinkering restores a broken device or gives a tool user +1d4 for 1 hour.",
    "zh-CN": "每次长休后可使用 2 次：花费 10 分钟修理，修复损坏的设备，或使工具使用者获得 +1d4 加值，持续 1 小时。"
  },
  "sheetPlay.resourceName.cyberpunk_kingpin": {
    "en": "Kingpin",
    "zh-CN": "幕后大佬"
  },
  "sheetDialog.resourceHelp.cyberpunk_kingpin": {
    "en": "1/long rest, declare a contact anywhere; one favor within reason simply succeeds.",
    "zh-CN": "每次长休后可使用 1 次：声明在某处有一位熟人，使一个合理范围内的请求直接成功。"
  },
  "sheetPlay.resourceName.cyberpunk_miracle_worker": {
    "en": "Miracle Worker",
    "zh-CN": "奇迹医师"
  },
  "sheetDialog.resourceHelp.cyberpunk_miracle_worker": {
    "en": "1/long rest, an ally at 0 HP within 30 ft instantly regains 3d6 + WIS HP.",
    "zh-CN": "每次长休后可使用 1 次：使 30 英尺内生命值为 0 的盟友立即恢复 3d6 + 感知调整值的生命值。"
  },
  "sheetPlay.resourceName.cyberpunk_nanite_reserve": {
    "en": "Nanite Reserve",
    "zh-CN": "纳米机储备"
  },
  "sheetDialog.resourceHelp.cyberpunk_nanite_reserve": {
    "en": "1/day, regain one expended spell slot of 3rd level or lower on a short rest.",
    "zh-CN": "每日一次，在短休时恢复一个已消耗的三环或更低环阶法术位。"
  },
  "sheetPlay.resourceName.cyberpunk_one_more_dawn": {
    "en": "One More Dawn",
    "zh-CN": "再见黎明"
  },
  "sheetDialog.resourceHelp.cyberpunk_one_more_dawn": {
    "en": "1/long rest, an ally within 30 ft that would drop to 0 HP drops to 1 instead.",
    "zh-CN": "每次长休后可使用 1 次：使 30 英尺内本应降至 0 生命值的盟友保留 1 点生命值。"
  },
  "sheetPlay.resourceName.cyberpunk_oracle_of_the_streets": {
    "en": "Oracle of the Streets",
    "zh-CN": "街头先知"
  },
  "sheetDialog.resourceHelp.cyberpunk_oracle_of_the_streets": {
    "en": "1/long rest, ask the DM three questions about local people, places, or events; get brief true answers.",
    "zh-CN": "每次长休后可使用 1 次：向地下城主询问当地人物、地点或事件的三个问题，获得简短而真实的答案。"
  },
  "sheetPlay.resourceName.cyberpunk_overmind": {
    "en": "Overmind",
    "zh-CN": "超脑"
  },
  "sheetDialog.resourceHelp.cyberpunk_overmind": {
    "en": "1/long rest, regain expended slot levels equal to your CHA modifier.",
    "zh-CN": "每次长休后可使用 1 次：恢复已消耗的法术位，总环阶等于魅力调整值。"
  },
  "sheetPlay.resourceName.cyberpunk_overwatch": {
    "en": "Overwatch",
    "zh-CN": "火力掩护"
  },
  "sheetDialog.resourceHelp.cyberpunk_overwatch": {
    "en": "Reaction: impose disadvantage on an attack against an ally you can see, 2/rest.",
    "zh-CN": "消耗一个反应，使一次针对可见盟友的攻击具有劣势。每次短休或长休后可使用 2 次。"
  },
  "sheetPlay.resourceName.cyberpunk_plague_breaker": {
    "en": "Plague Breaker",
    "zh-CN": "疫病终结者"
  },
  "sheetDialog.resourceHelp.cyberpunk_plague_breaker": {
    "en": "1/short rest, touch cures any disease, poison, blindness, deafness, or paralysis.",
    "zh-CN": "每次短休或长休后可使用 1 次：通过触碰治愈疾病、毒素、目盲、耳聋或麻痹。"
  },
  "sheetPlay.resourceName.cyberpunk_psychic_flight": {
    "en": "Psychic Flight",
    "zh-CN": "灵能飞行"
  },
  "sheetDialog.resourceHelp.cyberpunk_psychic_flight": {
    "en": "1/long rest, fly 30 ft for 10 minutes.",
    "zh-CN": "每次长休后可使用 1 次：获得 30 英尺飞行速度，持续 10 分钟。"
  },
  "sheetPlay.resourceName.cyberpunk_reality_rend": {
    "en": "Reality Rend",
    "zh-CN": "撕裂现实"
  },
  "sheetDialog.resourceHelp.cyberpunk_reality_rend": {
    "en": "1/long rest, your next damaging psionic deals maximum damage.",
    "zh-CN": "每次长休后可使用 1 次：下一次伤害灵能造成最大伤害。"
  },
  "sheetPlay.resourceName.cyberpunk_root_access": {
    "en": "Root Access",
    "zh-CN": "根权限"
  },
  "sheetDialog.resourceHelp.cyberpunk_root_access": {
    "en": "1/long rest, control a construct or networked system for 1 minute (INT save negates).",
    "zh-CN": "每次长休后可使用 1 次：控制一个构装生物或联网系统，持续 1 分钟；智力豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.cyberpunk_self_repair_protocol": {
    "en": "Self-Repair Protocol",
    "zh-CN": "自修复协议"
  },
  "sheetDialog.resourceHelp.cyberpunk_self_repair_protocol": {
    "en": "Each drone regains 2d6 HP at the start of your turn, once per rest each.",
    "zh-CN": "每架无人机在你的回合开始时恢复 2d6 生命值，每次休息之间各可触发一次。"
  },
  "sheetPlay.resourceName.cyberpunk_signal_tap": {
    "en": "Signal Tap",
    "zh-CN": "信号窃听"
  },
  "sheetDialog.resourceHelp.cyberpunk_signal_tap": {
    "en": "1/rest, listen in on any electronic or magical communication within 100 ft.",
    "zh-CN": "每次短休或长休后可使用 1 次：监听 100 英尺内的电子或魔法通信。"
  },
  "sheetPlay.resourceName.cyberpunk_singularity": {
    "en": "Singularity",
    "zh-CN": "奇点"
  },
  "sheetDialog.resourceHelp.cyberpunk_singularity": {
    "en": "1/long rest, cast a psionic of 5th level or lower without a slot at two targets.",
    "zh-CN": "每次长休后可使用 1 次：对两个目标施放一个五环或更低环阶灵能，无需法术位。"
  },
  "sheetPlay.resourceName.cyberpunk_static_shield": {
    "en": "Static Shield",
    "zh-CN": "静电护盾"
  },
  "sheetDialog.resourceHelp.cyberpunk_static_shield": {
    "en": "1/short rest, bonus action: +2 AC until the start of your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：消耗一个附赠动作，护甲等级 +2，持续至下一回合开始。"
  },
  "sheetPlay.resourceName.cyberpunk_stim_injector": {
    "en": "Stim Injector",
    "zh-CN": "兴奋剂注射器"
  },
  "sheetDialog.resourceHelp.cyberpunk_stim_injector": {
    "en": "Bonus action touch: an ally regains 1d6 + WIS HP. Uses per long rest equal WIS modifier.",
    "zh-CN": "消耗一个附赠动作并触碰盟友，使其恢复 1d6 + 感知调整值的生命值。每次长休恢复等于感知调整值的使用次数。"
  },
  "sheetPlay.resourceName.cyberpunk_storm_of_blades": {
    "en": "Storm of Blades",
    "zh-CN": "刀锋风暴"
  },
  "sheetDialog.resourceHelp.cyberpunk_storm_of_blades": {
    "en": "1/long rest, for 1 minute make one additional blade attack on each of your turns.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，在自己的每个回合额外进行一次刀刃攻击。"
  },
  "sheetPlay.resourceName.cyberpunk_street_contacts": {
    "en": "Street Contacts",
    "zh-CN": "街头人脉"
  },
  "sheetDialog.resourceHelp.cyberpunk_street_contacts": {
    "en": "1/long rest, call in a favor: gear, a ride, a name, or entry somewhere (DM adjudicates scope).",
    "zh-CN": "每次长休后可使用 1 次：请求一项援助，如装备、搭车、姓名线索或进入某处；具体范围由地下城主裁定。"
  },
  "sheetPlay.resourceName.cyberpunk_surge_momentum": {
    "en": "Surge Momentum",
    "zh-CN": "涌动势能"
  },
  "sheetDialog.resourceHelp.cyberpunk_surge_momentum": {
    "en": "2/rest, cast a cantrip as a bonus action after casting a leveled psionic.",
    "zh-CN": "每次短休或长休后可使用 2 次：施放有环阶的灵能后，以附赠动作施放一个戏法。"
  },
  "sheetPlay.resourceName.cyberpunk_synaptic_overload": {
    "en": "Synaptic Overload",
    "zh-CN": "突触过载"
  },
  "sheetDialog.resourceHelp.cyberpunk_synaptic_overload": {
    "en": "1/long rest, a creature hit by your psionic saves (WIS) or is stunned until your next turn.",
    "zh-CN": "每次长休后可使用 1 次：被你的灵能命中的生物进行感知豁免，失败则震慑，持续至你的下一回合。"
  },
  "sheetPlay.resourceName.cyberpunk_the_net_remembers": {
    "en": "The Net Remembers",
    "zh-CN": "网络记忆"
  },
  "sheetDialog.resourceHelp.cyberpunk_the_net_remembers": {
    "en": "Regain 4 expended slot levels on a short rest, once per day.",
    "zh-CN": "每日一次，在短休时恢复已消耗的法术位，总环阶为 4。"
  },
  "sheetPlay.resourceName.cyberpunk_wired_soul": {
    "en": "Wired Soul",
    "zh-CN": "接线灵魂"
  },
  "sheetDialog.resourceHelp.cyberpunk_wired_soul": {
    "en": "1/long rest while below half HP, bonus action to regain 10 + level HP.",
    "zh-CN": "每次长休后可使用 1 次：生命值低于上限一半时，以附赠动作恢复 10 + 等级的生命值。"
  },
  "sheetPlay.resourceName.dark_fantasy_apotheosis_of_suffering": {
    "en": "Apotheosis of Suffering",
    "zh-CN": "苦难升华"
  },
  "sheetDialog.resourceHelp.dark_fantasy_apotheosis_of_suffering": {
    "en": "1/long rest, drop yourself to 1 HP: deal the HP paid as radiant damage divided among any creatures within 30 ft (DEX save halves).",
    "zh-CN": "每次长休后可使用 1 次：将自身生命值降至 1，把消耗的生命值作为光耀伤害，分配给 30 英尺内任意生物；敏捷豁免成功则伤害减半。"
  },
  "sheetPlay.resourceName.dark_fantasy_blood_offering": {
    "en": "Blood Offering",
    "zh-CN": "鲜血献祭"
  },
  "sheetDialog.resourceHelp.dark_fantasy_blood_offering": {
    "en": "1/rest, pay 5 HP: one attack this turn becomes an automatic hit if the roll would miss by 3 or less.",
    "zh-CN": "每次短休或长休后可使用 1 次：支付 5 点生命值，若本回合的一次攻击原本以不超过 3 的差距未命中，则改为自动命中。"
  },
  "sheetPlay.resourceName.dark_fantasy_candle_in_the_dark": {
    "en": "Candle in the Dark",
    "zh-CN": "暗中烛火"
  },
  "sheetDialog.resourceHelp.dark_fantasy_candle_in_the_dark": {
    "en": "1/rest, emit bright warding light 20 ft for 10 minutes; hostile undead and fiends in it have disadvantage on attacks against your allies.",
    "zh-CN": "每次短休或长休后可使用 1 次：散发 20 英尺明亮守护光照，持续 10 分钟。光照内的敌对亡灵和邪魔攻击你的盟友时具有劣势。"
  },
  "sheetPlay.resourceName.dark_fantasy_crowsight_network": {
    "en": "Crowsight Network",
    "zh-CN": "鸦眼网络"
  },
  "sheetDialog.resourceHelp.dark_fantasy_crowsight_network": {
    "en": "The guild's birds watch every district; ask the DM once per day where a named person was seen.",
    "zh-CN": "公会的鸟群监视各区。每日可询问地下城主一次，某个指定人物在哪里被看见。"
  },
  "sheetPlay.resourceName.dark_fantasy_deathless_champion": {
    "en": "Deathless Champion",
    "zh-CN": "不死斗士"
  },
  "sheetDialog.resourceHelp.dark_fantasy_deathless_champion": {
    "en": "1/long rest, for 1 minute you cannot drop below 1 HP.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，生命值不会降至 1 以下。"
  },
  "sheetPlay.resourceName.dark_fantasy_deathless_vigor": {
    "en": "Deathless Vigor",
    "zh-CN": "不死活力"
  },
  "sheetDialog.resourceHelp.dark_fantasy_deathless_vigor": {
    "en": "1/long rest, when you drop to 0 HP, drop to 1 instead and gain temp HP equal to your level.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至 0 时改为保留 1，并获得等于等级的临时生命值。"
  },
  "sheetPlay.resourceName.dark_fantasy_elegy_of_echoes": {
    "en": "Elegy of Echoes",
    "zh-CN": "回响挽歌"
  },
  "sheetDialog.resourceHelp.dark_fantasy_elegy_of_echoes": {
    "en": "1/rest, repeat the last dirge you cast this turn at a new target for free (3rd level or lower).",
    "zh-CN": "每次短休或长休后可使用 1 次：对新目标免费重复本回合刚施放的挽歌，须为三环或更低环阶。"
  },
  "sheetPlay.resourceName.dark_fantasy_final_verdict": {
    "en": "Final Verdict",
    "zh-CN": "最终裁决"
  },
  "sheetDialog.resourceHelp.dark_fantasy_final_verdict": {
    "en": "1/long rest, for 1 minute all your attacks against fiends, undead, and cursed creatures deal maximum weapon dice.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，对邪魔、亡灵和受诅生物的所有攻击均造成最大武器骰伤害。"
  },
  "sheetPlay.resourceName.dark_fantasy_flashfire_litany": {
    "en": "Flashfire Litany",
    "zh-CN": "闪焰祷文"
  },
  "sheetDialog.resourceHelp.dark_fantasy_flashfire_litany": {
    "en": "1/rest, when a fiend or undead hits you, it takes 3d8 radiant (CON save halves).",
    "zh-CN": "每次短休或长休后可使用 1 次：邪魔或亡灵命中你时，受到 3d8 光耀伤害；体质豁免成功则减半。"
  },
  "sheetPlay.resourceName.dark_fantasy_garden_of_grief": {
    "en": "Garden of Grief",
    "zh-CN": "悲恸花园"
  },
  "sheetDialog.resourceHelp.dark_fantasy_garden_of_grief": {
    "en": "1/long rest, a 20-ft radius garden of black roses for 1 minute: allies in it regain 1d6 HP per turn, enemies are slowed.",
    "zh-CN": "每次长休后可使用 1 次：召出半径 20 英尺的黑玫瑰花园，持续 1 分钟。区域内盟友每回合恢复 1d6 生命值，敌人则被减速。"
  },
  "sheetPlay.resourceName.dark_fantasy_grave_grip": {
    "en": "Grave Grip",
    "zh-CN": "坟墓之握"
  },
  "sheetDialog.resourceHelp.dark_fantasy_grave_grip": {
    "en": "1/rest, spectral hands erupt in a 15-ft cube: creatures save (STR) or are restrained until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：幽灵手臂涌出 15 英尺立方区域，生物进行力量豁免，失败则束缚，持续至你的下一回合。"
  },
  "sheetPlay.resourceName.dark_fantasy_immolate_the_sin": {
    "en": "Immolate the Sin",
    "zh-CN": "焚罪之火"
  },
  "sheetDialog.resourceHelp.dark_fantasy_immolate_the_sin": {
    "en": "1/long rest, wreathe yourself in gray flame for 1 minute: +2d8 fire on your attacks and immunity to fire.",
    "zh-CN": "每次长休后可使用 1 次：灰色火焰环绕自身 1 分钟，攻击额外造成 2d8 火焰伤害，并免疫火焰伤害。"
  },
  "sheetPlay.resourceName.dark_fantasy_judgment_shot": {
    "en": "Judgment Shot",
    "zh-CN": "审判射击"
  },
  "sheetDialog.resourceHelp.dark_fantasy_judgment_shot": {
    "en": "1/rest, a ranged attack against your brand becomes an automatic critical if it hits.",
    "zh-CN": "每次短休或长休后可使用 1 次：对被你烙印目标的一次远程攻击，命中时自动重击。"
  },
  "sheetPlay.resourceName.dark_fantasy_king_below_the_streets": {
    "en": "King Below the Streets",
    "zh-CN": "地下鼠王"
  },
  "sheetDialog.resourceHelp.dark_fantasy_king_below_the_streets": {
    "en": "1/long rest, summon a giant rat pack: four allied giant-rat-statted beasts serve for 10 minutes.",
    "zh-CN": "每次长休后可使用 1 次：召唤四只具有巨鼠属性的盟军野兽，协助你 10 分钟。"
  },
  "sheetPlay.resourceName.dark_fantasy_lance_the_wound": {
    "en": "Lance the Wound",
    "zh-CN": "剖开伤口"
  },
  "sheetDialog.resourceHelp.dark_fantasy_lance_the_wound": {
    "en": "1/rest, a melee hit also deals 2d8 necrotic and the target cannot regain HP until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：一次近战命中额外造成 2d8 黯蚀伤害，目标直到你的下一回合都无法恢复生命值。"
  },
  "sheetPlay.resourceName.dark_fantasy_martyr_s_endurance": {
    "en": "Martyr's Endurance",
    "zh-CN": "殉道者坚韧"
  },
  "sheetDialog.resourceHelp.dark_fantasy_martyr_s_endurance": {
    "en": "1/long rest, when you drop to 0 HP, drop to 1 instead.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至 0 时，改为保留 1。"
  },
  "sheetPlay.resourceName.dark_fantasy_master_of_the_black_ledger": {
    "en": "Master of the Black Ledger",
    "zh-CN": "黑册之主"
  },
  "sheetDialog.resourceHelp.dark_fantasy_master_of_the_black_ledger": {
    "en": "1/long rest, choose life or death for a touched creature: full HP restored, or 10d10 necrotic (CON save halves).",
    "zh-CN": "每次长休后可使用 1 次：触碰生物，选择生或死；使其生命值完全恢复，或造成 10d10 黯蚀伤害，体质豁免成功则伤害减半。"
  },
  "sheetPlay.resourceName.dark_fantasy_murder_of_crows": {
    "en": "Murder of Crows",
    "zh-CN": "鸦群杀阵"
  },
  "sheetDialog.resourceHelp.dark_fantasy_murder_of_crows": {
    "en": "1/long rest, a wheeling flock blinds enemies in a 20-ft radius for 1 minute (CON save each turn).",
    "zh-CN": "每次长休后可使用 1 次：盘旋的鸦群使半径 20 英尺内敌人目盲，持续 1 分钟，每回合可进行体质豁免。"
  },
  "sheetPlay.resourceName.dark_fantasy_no_rest_for_the_wicked": {
    "en": "No Rest for the Wicked",
    "zh-CN": "恶者不得安息"
  },
  "sheetDialog.resourceHelp.dark_fantasy_no_rest_for_the_wicked": {
    "en": "1/long rest, take an extra full turn immediately after killing your branded quarry.",
    "zh-CN": "每次长休后可使用 1 次：杀死被你烙印的猎物后，立即获得一个完整的额外回合。"
  },
  "sheetPlay.resourceName.dark_fantasy_panacea": {
    "en": "Panacea",
    "zh-CN": "万灵药"
  },
  "sheetDialog.resourceHelp.dark_fantasy_panacea": {
    "en": "1/long rest, touch removes all poison, disease, curse of 5th level or lower, blindness, deafness, and paralysis from one creature.",
    "zh-CN": "每次长休后可使用 1 次：触碰一个生物，移除其全部毒素、疾病、五环或更低环阶诅咒、目盲、耳聋和麻痹。"
  },
  "sheetPlay.resourceName.dark_fantasy_petal_fall": {
    "en": "Petal Fall",
    "zh-CN": "落瓣"
  },
  "sheetDialog.resourceHelp.dark_fantasy_petal_fall": {
    "en": "1/rest, teleport 30 ft in a swirl of dead petals as a bonus action.",
    "zh-CN": "每次短休或长休后可使用 1 次：以附赠动作，在枯萎花瓣的旋流中传送 30 英尺。"
  },
  "sheetPlay.resourceName.dark_fantasy_purging_flame": {
    "en": "Purging Flame",
    "zh-CN": "净化之焰"
  },
  "sheetDialog.resourceHelp.dark_fantasy_purging_flame": {
    "en": "1/rest, your Hunter's Brand target takes 2d10 radiant when you hit it (declared before the roll).",
    "zh-CN": "每次短休或长休后可使用 1 次：命中猎人烙印目标时，额外造成 2d10 光耀伤害，须在掷骰前宣布。"
  },
  "sheetPlay.resourceName.dark_fantasy_quarantine_ring": {
    "en": "Quarantine Ring",
    "zh-CN": "隔离之环"
  },
  "sheetDialog.resourceHelp.dark_fantasy_quarantine_ring": {
    "en": "1/long rest, a 20-ft radius circle for 10 minutes: enemies treat it as difficult terrain and take 2d6 poison entering (CON save halves).",
    "zh-CN": "每次长休后可使用 1 次：形成半径 20 英尺的圆形区域，持续 10 分钟。敌人将其视为困难地形，进入时受到 2d6 毒素伤害，体质豁免成功则减半。"
  },
  "sheetPlay.resourceName.dark_fantasy_rat_tide": {
    "en": "Rat Tide",
    "zh-CN": "鼠潮"
  },
  "sheetDialog.resourceHelp.dark_fantasy_rat_tide": {
    "en": "1/rest, a swarm floods a 15-ft cube: difficult terrain, and creatures inside save (DEX) or take 2d6 piercing and are distracted (disadvantage on their next attack).",
    "zh-CN": "每次短休或长休后可使用 1 次：鼠群充满 15 英尺立方区域，形成困难地形。区域内生物进行敏捷豁免，失败则受到 2d6 穿刺伤害并分心，下一次攻击具有劣势。"
  },
  "sheetPlay.resourceName.dark_fantasy_requiem_inspiration": {
    "en": "Requiem Inspiration",
    "zh-CN": "安魂激励"
  },
  "sheetDialog.resourceHelp.dark_fantasy_requiem_inspiration": {
    "en": "Bonus action: an ally within 60 ft gains a d6 to add to one attack, check, or save; CHA-mod uses per long rest.",
    "zh-CN": "消耗一个附赠动作，为 60 英尺内盟友提供一个 d6，用于一次攻击、检定或豁免。每次长休恢复等于魅力调整值的使用次数。"
  },
  "sheetPlay.resourceName.dark_fantasy_song_that_ends": {
    "en": "Song That Ends",
    "zh-CN": "终结之歌"
  },
  "sheetDialog.resourceHelp.dark_fantasy_song_that_ends": {
    "en": "1/long rest, a killing note: one creature below 50 HP that can hear you saves (CON) or drops to 0.",
    "zh-CN": "每次长休后可使用 1 次：唱出致命音符，使生命值低于 50 且能听见你的一个生物进行体质豁免，失败则降至 0 生命值。"
  },
  "sheetPlay.resourceName.dark_fantasy_squire_of_bones": {
    "en": "Squire of Bones",
    "zh-CN": "骸骨侍从"
  },
  "sheetDialog.resourceHelp.dark_fantasy_squire_of_bones": {
    "en": "1/long rest, raise one slain foe as a loyal skeletal squire for 8 hours (uses its stats, obeys you).",
    "zh-CN": "每次长休后可使用 1 次：将一个被杀死的敌人复生为忠诚的骷髅侍从，使用其原有属性，服从你的命令，持续 8 小时。"
  },
  "sheetPlay.resourceName.dark_fantasy_ten_thousand_eyes": {
    "en": "Ten Thousand Eyes",
    "zh-CN": "万眼"
  },
  "sheetDialog.resourceHelp.dark_fantasy_ten_thousand_eyes": {
    "en": "Your Swarm Sense covers the whole district; ask the DM once per short rest what the rats have seen.",
    "zh-CN": "群体感知覆盖整片城区。每次短休可询问地下城主一次，鼠群看到了什么。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_crown_descends": {
    "en": "The Crown Descends",
    "zh-CN": "王冠降临"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_crown_descends": {
    "en": "1/long rest, for 1 minute every enemy within 30 ft is swarmed: half speed, no reactions, and 1d6 piercing at the start of each of its turns.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，30 英尺内的每个敌人都被虫群包围，速度减半、无法采取反应，每个回合开始时受到 1d6 穿刺伤害。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_flame_that_judges": {
    "en": "The Flame That Judges",
    "zh-CN": "审判之焰"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_flame_that_judges": {
    "en": "1/long rest, mass brand: every enemy within 30 ft is branded at once (WIS save negates each).",
    "zh-CN": "每次长休后可使用 1 次：同时烙印 30 英尺内的每个敌人；各目标感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_flock_remembers": {
    "en": "The Flock Remembers",
    "zh-CN": "鸦群记忆"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_flock_remembers": {
    "en": "1/long rest, when you drop to 0 HP, the flock carries you 60 ft to safety and you stabilize.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至 0 时，鸦群将你带到 60 英尺外的安全地点，并使伤势稳定。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_grave_chorus": {
    "en": "The Grave Chorus",
    "zh-CN": "坟墓合唱"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_grave_chorus": {
    "en": "1/long rest, spectral voices join you for 1 minute: your dirges affect one additional target.",
    "zh-CN": "每次长休后可使用 1 次：幽灵之声与你合唱，持续 1 分钟，使挽歌额外影响一个目标。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_last_rose": {
    "en": "The Last Rose",
    "zh-CN": "最后的玫瑰"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_last_rose": {
    "en": "1/long rest, when an ally within 30 ft dies, they instead drop to 1 HP and your next attack is an automatic critical if it hits.",
    "zh-CN": "每次长休后可使用 1 次：30 英尺内盟友本应死亡时，改为保留 1 点生命值；你的下一次攻击命中时自动重击。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_rite_completed": {
    "en": "The Rite Completed",
    "zh-CN": "仪式完成"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_rite_completed": {
    "en": "1/long rest, sing a fallen ally within a minute of death back to 1 HP without material components.",
    "zh-CN": "每次长休后可使用 1 次：在盟友死亡后 1 分钟内，用歌声使其复生并恢复至 1 点生命值，无需材料成分。"
  },
  "sheetPlay.resourceName.dark_fantasy_the_tomb_provides": {
    "en": "The Tomb Provides",
    "zh-CN": "墓穴馈赠"
  },
  "sheetDialog.resourceHelp.dark_fantasy_the_tomb_provides": {
    "en": "1/long rest, regain expended slot levels equal to your CHA modifier.",
    "zh-CN": "每次长休后可使用 1 次：恢复已消耗的法术位，总环阶等于魅力调整值。"
  },
  "sheetPlay.resourceName.dark_fantasy_threnody": {
    "en": "Threnody",
    "zh-CN": "哀歌"
  },
  "sheetDialog.resourceHelp.dark_fantasy_threnody": {
    "en": "1/rest, all enemies within 30 ft that can hear you save (WIS) or deal half damage on their next attack.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内能听见你的敌人进行感知豁免，失败则下一次攻击伤害减半。"
  },
  "sheetPlay.resourceName.dark_fantasy_vanish_below": {
    "en": "Vanish Below",
    "zh-CN": "遁入地下"
  },
  "sheetDialog.resourceHelp.dark_fantasy_vanish_below": {
    "en": "1/rest, drop through a grate, crack, or shadow as a reaction when targeted; the attack misses and you move 15 ft.",
    "zh-CN": "每次短休或长休后可使用 1 次：成为目标时，以反应穿过栅格、裂缝或阴影，令攻击未命中，并移动 15 英尺。"
  },
  "sheetPlay.resourceName.dark_fantasy_voice_like_embers": {
    "en": "Voice Like Embers",
    "zh-CN": "余烬之声"
  },
  "sheetDialog.resourceHelp.dark_fantasy_voice_like_embers": {
    "en": "1/rest, a scream: creatures in a 15-ft cone save (CON) or take 3d6 fire and are deafened for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：发出尖叫，使 15 英尺锥形区域内生物进行体质豁免，失败则受到 3d6 火焰伤害并耳聋 1 分钟。"
  },
  "sheetPlay.resourceName.horror_adrenaline_surge": {
    "en": "Adrenaline Surge",
    "zh-CN": "肾上腺激发"
  },
  "sheetDialog.resourceHelp.horror_adrenaline_surge": {
    "en": "Dash, Disengage, or Hide as a bonus action, CON-mod uses per short rest.",
    "zh-CN": "以附赠动作疾走、撤离或躲藏。每次短休恢复等于体质调整值的使用次数。"
  },
  "sheetPlay.resourceName.horror_apocrypha": {
    "en": "Apocrypha",
    "zh-CN": "秘典"
  },
  "sheetDialog.resourceHelp.horror_apocrypha": {
    "en": "Learn one 6th-level warlock spell; cast it 1/long rest without a slot.",
    "zh-CN": "学会一个六环邪术师法术，每次长休后可施放一次，无需法术位。"
  },
  "sheetPlay.resourceName.horror_author_of_the_unwritten": {
    "en": "Author of the Unwritten",
    "zh-CN": "未写之书的作者"
  },
  "sheetDialog.resourceHelp.horror_author_of_the_unwritten": {
    "en": "1/long rest, cast any warlock spell of 5th level or lower without a slot, twinned to two targets.",
    "zh-CN": "每次长休后可使用 1 次：对两个目标施放任意五环或更低环阶邪术师法术，无需法术位。"
  },
  "sheetPlay.resourceName.horror_beyond_the_veil": {
    "en": "Beyond the Veil",
    "zh-CN": "帷幕之外"
  },
  "sheetDialog.resourceHelp.horror_beyond_the_veil": {
    "en": "1/long rest, you and up to three allies see and strike into the Ethereal Plane for 1 minute.",
    "zh-CN": "每次长休后可使用 1 次：你和至多三名盟友能看见并攻击以太位面中的目标，持续 1 分钟。"
  },
  "sheetPlay.resourceName.horror_binding_words": {
    "en": "Binding Words",
    "zh-CN": "束缚之言"
  },
  "sheetDialog.resourceHelp.horror_binding_words": {
    "en": "1/long rest, a spirit or fiend that fails against your Rite of Repulsion is also restrained for 1 minute.",
    "zh-CN": "每次长休后可使用 1 次：在驱斥仪式中豁免失败的灵体或邪魔，同时受到束缚，持续 1 分钟。"
  },
  "sheetPlay.resourceName.horror_bitter_endurance": {
    "en": "Bitter Endurance",
    "zh-CN": "苦痛坚韧"
  },
  "sheetDialog.resourceHelp.horror_bitter_endurance": {
    "en": "1/long rest, gain temp HP equal to twice your level when combat starts.",
    "zh-CN": "每次长休后可使用 1 次：战斗开始时，获得等于等级两倍的临时生命值。"
  },
  "sheetPlay.resourceName.horror_bleeding_power": {
    "en": "Bleeding Power",
    "zh-CN": "流血之力"
  },
  "sheetDialog.resourceHelp.horror_bleeding_power": {
    "en": "1/rest, cast a 1st-level stigmata without a slot; take 1d4 necrotic that cannot be reduced.",
    "zh-CN": "每次短休或长休后可使用 1 次：施放一个一环圣痕法术，无需法术位；受到无法减免的 1d4 黯蚀伤害。"
  },
  "sheetPlay.resourceName.horror_blood_ward": {
    "en": "Blood Ward",
    "zh-CN": "鲜血守护"
  },
  "sheetDialog.resourceHelp.horror_blood_ward": {
    "en": "1/rest, reaction when hit: gain resistance to that damage type until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：被命中时消耗一个反应，获得对该伤害类型的抗性，持续至下一回合。"
  },
  "sheetPlay.resourceName.horror_borrowed_eyes": {
    "en": "Borrowed Eyes",
    "zh-CN": "借来的眼睛"
  },
  "sheetDialog.resourceHelp.horror_borrowed_eyes": {
    "en": "1/rest, see through the eyes of a creature you can see for 1 minute (WIS save negates).",
    "zh-CN": "每次短休或长休后可使用 1 次：通过一个可见生物的眼睛观察，持续 1 分钟；感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.horror_called_shot": {
    "en": "Called Shot",
    "zh-CN": "定点射击"
  },
  "sheetDialog.resourceHelp.horror_called_shot": {
    "en": "1/short rest, declare a called shot: on hit, the target also loses one movement mode, attack, or sense until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：宣布一次定点射击，命中后目标还失去一种移动方式、攻击或感官，持续至你的下一回合。"
  },
  "sheetPlay.resourceName.horror_controlled_manifestation": {
    "en": "Controlled Manifestation",
    "zh-CN": "受控显现"
  },
  "sheetDialog.resourceHelp.horror_controlled_manifestation": {
    "en": "1/long rest, compel a spirit within 30 ft to manifest visibly and audibly for 10 minutes.",
    "zh-CN": "每次长休后可使用 1 次：迫使 30 英尺内一个灵体以可见且可听见的形式显现，持续 10 分钟。"
  },
  "sheetPlay.resourceName.horror_final_benediction": {
    "en": "Final Benediction",
    "zh-CN": "最后的祝祷"
  },
  "sheetDialog.resourceHelp.horror_final_benediction": {
    "en": "1/long rest, when an ally within 30 ft drops to 0 HP, they instead drop to WIS-mod x 5 HP.",
    "zh-CN": "每次长休后可使用 1 次：30 英尺内盟友生命值本应降至 0 时，改为保留等于感知调整值 ×5 的生命值。"
  },
  "sheetPlay.resourceName.horror_grounding_rig": {
    "en": "Grounding Rig",
    "zh-CN": "锚定装置"
  },
  "sheetDialog.resourceHelp.horror_grounding_rig": {
    "en": "1/long rest, a 10-minute setup makes a 20-ft radius immune to teleportation and phasing for 1 hour.",
    "zh-CN": "每次长休后可使用 1 次：花费 10 分钟布置，使半径 20 英尺区域内无法传送或穿相，持续 1 小时。"
  },
  "sheetPlay.resourceName.horror_last_one_out": {
    "en": "Last One Out",
    "zh-CN": "最后撤离者"
  },
  "sheetDialog.resourceHelp.horror_last_one_out": {
    "en": "Allies within 10 ft may use your Adrenaline Surge movement options as a reaction when you do, 1/rest each.",
    "zh-CN": "10 英尺内盟友可在你使用肾上腺激发时，以反应采取同样的移动选项；每名盟友每次休息之间可使用 1 次。"
  },
  "sheetPlay.resourceName.horror_observer_effect": {
    "en": "Observer Effect",
    "zh-CN": "观察者效应"
  },
  "sheetDialog.resourceHelp.horror_observer_effect": {
    "en": "1/long rest, force an invisible, ethereal, or shapechanged creature within 60 ft into its true visible form for 1 minute (CHA save negates).",
    "zh-CN": "每次长休后可使用 1 次：迫使 60 英尺内隐形、以太化或变形的生物显露真实可见形态，持续 1 分钟；魅力豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.horror_one_against_the_night": {
    "en": "One Against the Night",
    "zh-CN": "独抗长夜"
  },
  "sheetDialog.resourceHelp.horror_one_against_the_night": {
    "en": "1/long rest, for 1 minute your attacks ignore resistance and immunity to nonmagical damage.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，攻击无视目标对非魔法伤害的抗性和免疫。"
  },
  "sheetPlay.resourceName.horror_pain_tolerance": {
    "en": "Pain Tolerance",
    "zh-CN": "痛觉耐受"
  },
  "sheetDialog.resourceHelp.horror_pain_tolerance": {
    "en": "1/short rest, halve the damage of one hit against you.",
    "zh-CN": "每次短休或长休后可使用 1 次：使一次命中你的攻击伤害减半。"
  },
  "sheetPlay.resourceName.horror_peer_review": {
    "en": "Peer Review",
    "zh-CN": "同行评议"
  },
  "sheetDialog.resourceHelp.horror_peer_review": {
    "en": "1/rest, when an ally fails an INT, WIS, or CHA save within 30 ft, let them reroll with your guidance.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内盟友的智力、感知或魅力豁免失败时，允许其在你的指导下重掷。"
  },
  "sheetPlay.resourceName.horror_predictive_model": {
    "en": "Predictive Model",
    "zh-CN": "预测模型"
  },
  "sheetDialog.resourceHelp.horror_predictive_model": {
    "en": "1/rest, after a creature you have measured attacks, impose disadvantage on that attack.",
    "zh-CN": "每次短休或长休后可使用 1 次：测量过的生物攻击时，使该次攻击具有劣势。"
  },
  "sheetPlay.resourceName.horror_proof": {
    "en": "Proof",
    "zh-CN": "实证"
  },
  "sheetDialog.resourceHelp.horror_proof": {
    "en": "1/long rest, your next apparatus spell is cast at maximum effect and cannot be resisted by legendary resistance.",
    "zh-CN": "每次长休后可使用 1 次：下一个仪器法术以最大效果施放，且无法被传奇抗性抵抗。"
  },
  "sheetPlay.resourceName.horror_quiet_the_voices": {
    "en": "Quiet the Voices",
    "zh-CN": "平息低语"
  },
  "sheetDialog.resourceHelp.horror_quiet_the_voices": {
    "en": "1/rest, an ally within 30 ft ends one charm, fear, or madness effect on itself.",
    "zh-CN": "每次短休或长休后可使用 1 次：使 30 英尺内盟友结束自身一个魅惑、恐慌或疯狂效果。"
  },
  "sheetPlay.resourceName.horror_rite_of_repulsion": {
    "en": "Rite of Repulsion",
    "zh-CN": "驱斥仪式"
  },
  "sheetDialog.resourceHelp.horror_rite_of_repulsion": {
    "en": "Action: fiends, undead, and spirits within 30 ft save (WIS) or must move away from you for 1 minute. WIS-mod uses per long rest.",
    "zh-CN": "消耗一个动作，使 30 英尺内邪魔、亡灵和灵体进行感知豁免，失败则必须远离你，持续 1 分钟。每次长休恢复等于感知调整值的使用次数。"
  },
  "sheetPlay.resourceName.horror_rite_of_severance": {
    "en": "Rite of Severance",
    "zh-CN": "断离仪式"
  },
  "sheetDialog.resourceHelp.horror_rite_of_severance": {
    "en": "1/long rest, a 1-minute ritual expels a possessing entity from a host (contested WIS, you have advantage).",
    "zh-CN": "每次长休后可使用 1 次：进行 1 分钟仪式，将附身实体驱离宿主；进行对抗感知检定，你具有优势。"
  },
  "sheetPlay.resourceName.horror_ritual_echo": {
    "en": "Ritual Echo",
    "zh-CN": "仪式回响"
  },
  "sheetDialog.resourceHelp.horror_ritual_echo": {
    "en": "1/long rest, duplicate a stigmata of 2nd level or lower you just cast at a second target for free.",
    "zh-CN": "每次长休后可使用 1 次：将刚施放的二环或更低环阶圣痕法术免费复制至第二个目标。"
  },
  "sheetPlay.resourceName.horror_s_ance_protocol": {
    "en": "Séance Protocol",
    "zh-CN": "降神协议"
  },
  "sheetDialog.resourceHelp.horror_s_ance_protocol": {
    "en": "1/long rest, a 10-minute session lets the party ask a lingering spirit three questions; it answers truthfully but briefly.",
    "zh-CN": "每次长休后可使用 1 次：进行 10 分钟降神仪式，使队伍可向徘徊的灵体询问三个问题，获得简短而真实的回答。"
  },
  "sheetPlay.resourceName.horror_scrounger_s_instinct": {
    "en": "Scrounger's Instinct",
    "zh-CN": "拾荒本能"
  },
  "sheetDialog.resourceHelp.horror_scrounger_s_instinct": {
    "en": "1/rest, find one mundane useful item nearby (a weapon, keys, bandages); the DM decides what plausibly exists.",
    "zh-CN": "每次短休或长休后可使用 1 次：在附近找到一件有用的普通物品，如武器、钥匙或绷带；地下城主决定合理存在的物品。"
  },
  "sheetPlay.resourceName.horror_seventh_seal": {
    "en": "Seventh Seal",
    "zh-CN": "第七封印"
  },
  "sheetDialog.resourceHelp.horror_seventh_seal": {
    "en": "Learn one 7th-level warlock spell; cast it 1/long rest without a slot.",
    "zh-CN": "学会一个七环邪术师法术，每次长休后可施放一次，无需法术位。"
  },
  "sheetPlay.resourceName.horror_stitch_the_tear": {
    "en": "Stitch the Tear",
    "zh-CN": "缝合裂隙"
  },
  "sheetDialog.resourceHelp.horror_stitch_the_tear": {
    "en": "1/long rest, close a portal, summoning, or breach of CR/level 5 or lower as an action.",
    "zh-CN": "每次长休后可使用 1 次：以一个动作关闭挑战等级或环阶不超过 5 的传送门、召唤或裂口。"
  },
  "sheetPlay.resourceName.horror_terminal_focus": {
    "en": "Terminal Focus",
    "zh-CN": "终极专注"
  },
  "sheetDialog.resourceHelp.horror_terminal_focus": {
    "en": "1/long rest, take two full turns in the first round of combat.",
    "zh-CN": "每次长休后可使用 1 次：战斗第一轮获得两个完整回合。"
  },
  "sheetPlay.resourceName.horror_the_debt_comes_due": {
    "en": "The Debt Comes Due",
    "zh-CN": "债务到期"
  },
  "sheetDialog.resourceHelp.horror_the_debt_comes_due": {
    "en": "1/long rest, when you expend your last spell slot, immediately regain it.",
    "zh-CN": "每次长休后可使用 1 次：消耗最后一个法术位时，立即将其恢复。"
  },
  "sheetPlay.resourceName.horror_the_final_chapter": {
    "en": "The Final Chapter",
    "zh-CN": "最终章节"
  },
  "sheetDialog.resourceHelp.horror_the_final_chapter": {
    "en": "1/long rest, reroll any one die you or a creature within 60 ft just rolled; the reroll stands.",
    "zh-CN": "每次长休后可使用 1 次：重掷你或 60 英尺内生物刚掷出的任意一个骰，必须采用新结果。"
  },
  "sheetPlay.resourceName.horror_the_last_candle": {
    "en": "The Last Candle",
    "zh-CN": "最后的烛火"
  },
  "sheetDialog.resourceHelp.horror_the_last_candle": {
    "en": "1/long rest, when you would drop to 0 HP, drop to 1 instead and your Vigil reignites at double radius.",
    "zh-CN": "每次长休后可使用 1 次：生命值本应降至 0 时，改为保留 1，你的守夜之光重新燃起，范围加倍。"
  },
  "sheetPlay.resourceName.horror_the_one_who_lives": {
    "en": "The One Who Lives",
    "zh-CN": "生还者"
  },
  "sheetDialog.resourceHelp.horror_the_one_who_lives": {
    "en": "Won't Die Here works 2/day, and each use also restores CON-mod x 5 HP.",
    "zh-CN": "绝不死在此地可每日使用两次，每次还恢复等于体质调整值 ×5 的生命值。"
  },
  "sheetPlay.resourceName.horror_the_rite_completed": {
    "en": "The Rite Completed",
    "zh-CN": "仪式完成"
  },
  "sheetDialog.resourceHelp.horror_the_rite_completed": {
    "en": "1/long rest, for 1 minute your stigmata cost no verbal or somatic components and cannot be counterspelled.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，圣痕法术无需语言或姿势成分，且无法被反制。"
  },
  "sheetPlay.resourceName.horror_the_rite_remembers": {
    "en": "The Rite Remembers",
    "zh-CN": "仪式记忆"
  },
  "sheetDialog.resourceHelp.horror_the_rite_remembers": {
    "en": "2/rest, cast a cantrip as a bonus action after casting a leveled stigmata.",
    "zh-CN": "每次短休或长休后可使用 2 次：施放有环阶的圣痕法术后，以附赠动作施放一个戏法。"
  },
  "sheetPlay.resourceName.horror_the_stake_remembers": {
    "en": "The Stake Remembers",
    "zh-CN": "木桩记忆"
  },
  "sheetDialog.resourceHelp.horror_the_stake_remembers": {
    "en": "1/long rest, an attack against a creature at half HP or lower becomes an automatic critical if it hits.",
    "zh-CN": "每次长休后可使用 1 次：对生命值不超过上限一半的生物发动攻击，命中时自动重击。"
  },
  "sheetPlay.resourceName.horror_the_unhosted_word": {
    "en": "The Unhosted Word",
    "zh-CN": "无主之言"
  },
  "sheetDialog.resourceHelp.horror_the_unhosted_word": {
    "en": "1/long rest, banish a fiend, undead, or spirit of CR 15 or lower to its home plane (CHA save negates).",
    "zh-CN": "每次长休后可使用 1 次：将挑战等级不超过 15 的邪魔、亡灵或灵体放逐回原生位面；魅力豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.horror_their_power_your_hands": {
    "en": "Their Power, Your Hands",
    "zh-CN": "借力于手"
  },
  "sheetDialog.resourceHelp.horror_their_power_your_hands": {
    "en": "1/long rest, cast one stigmata of 5th level or lower without a slot at its maximum effect.",
    "zh-CN": "每次长休后可使用 1 次：以最大效果施放一个五环或更低环阶圣痕法术，无需法术位。"
  },
  "sheetPlay.resourceName.horror_unfinished_ritual": {
    "en": "Unfinished Ritual",
    "zh-CN": "未竟仪式"
  },
  "sheetDialog.resourceHelp.horror_unfinished_ritual": {
    "en": "1/long rest, regain expended slot levels equal to your CHA modifier when you drop below half HP.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至上限一半以下时，恢复已消耗的法术位，总环阶等于魅力调整值。"
  },
  "sheetPlay.resourceName.horror_walk_between": {
    "en": "Walk Between",
    "zh-CN": "穿行帷幕"
  },
  "sheetDialog.resourceHelp.horror_walk_between": {
    "en": "1/long rest, step through the Veil: teleport 60 ft to a space you can see.",
    "zh-CN": "每次长休后可使用 1 次：跨过帷幕，传送至 60 英尺内可见位置。"
  },
  "sheetPlay.resourceName.horror_won_t_die_here": {
    "en": "Won't Die Here",
    "zh-CN": "绝不死在此地"
  },
  "sheetDialog.resourceHelp.horror_won_t_die_here": {
    "en": "1/day, when you drop to 0 HP, drop to 1 instead.",
    "zh-CN": "每日一次，生命值降至 0 时改为保留 1。"
  },
  "sheetPlay.resourceName.mystery_anchor_of_the_living": {
    "en": "Anchor of the Living",
    "zh-CN": "生者之锚"
  },
  "sheetDialog.resourceHelp.mystery_anchor_of_the_living": {
    "en": "1/long rest, when a creature within 30 ft dies, hold its spirit: it can be revived within 24 hours as if freshly dead.",
    "zh-CN": "每次长休后可使用 1 次：30 英尺内生物死亡时，留住其灵魂，使其在 24 小时内仍可按刚刚死亡的情况复生。"
  },
  "sheetPlay.resourceName.mystery_archetype_made_flesh": {
    "en": "Archetype Made Flesh",
    "zh-CN": "原型具现"
  },
  "sheetDialog.resourceHelp.mystery_archetype_made_flesh": {
    "en": "1/long rest, your treatments treat one target's saving throw as if it rolled a 1.",
    "zh-CN": "每次长休后可使用 1 次：你的疗法使一个目标的豁免视为掷出 1。"
  },
  "sheetPlay.resourceName.mystery_borrowed_voice": {
    "en": "Borrowed Voice",
    "zh-CN": "借来的声音"
  },
  "sheetDialog.resourceHelp.mystery_borrowed_voice": {
    "en": "1/long rest, let a spirit speak through you: it converses with the party for 10 minutes.",
    "zh-CN": "每次长休后可使用 1 次：让一个灵体借你之口发言，与队伍交谈 10 分钟。"
  },
  "sheetPlay.resourceName.mystery_break_the_delusion": {
    "en": "Break the Delusion",
    "zh-CN": "打破妄想"
  },
  "sheetDialog.resourceHelp.mystery_break_the_delusion": {
    "en": "1/rest, end one charm, fear, or illusion effect on a creature within 30 ft.",
    "zh-CN": "每次短休或长休后可使用 1 次：结束 30 英尺内生物的一个魅惑、恐慌或幻象效果。"
  },
  "sheetPlay.resourceName.mystery_connect_the_threads": {
    "en": "Connect the Threads",
    "zh-CN": "串联线索"
  },
  "sheetDialog.resourceHelp.mystery_connect_the_threads": {
    "en": "1/long rest, the DM tells you how two clues you hold relate, or that they do not.",
    "zh-CN": "每次长休后可使用 1 次：地下城主告知手中两条线索之间的关联，或确认其无关。"
  },
  "sheetPlay.resourceName.mystery_contingency_exit": {
    "en": "Contingency Exit",
    "zh-CN": "应急退路"
  },
  "sheetDialog.resourceHelp.mystery_contingency_exit": {
    "en": "1/long rest, when things go wrong, narrate a prepared escape (a bribed guard, a loose window); the DM makes it viable.",
    "zh-CN": "每次长休后可使用 1 次：情况恶化时，描述一条预先准备的逃生路线，如收买的守卫或松动的窗户，地下城主使其可行。"
  },
  "sheetPlay.resourceName.mystery_deductive_counter": {
    "en": "Deductive Counter",
    "zh-CN": "推理反制"
  },
  "sheetDialog.resourceHelp.mystery_deductive_counter": {
    "en": "Reaction when attacked: your read of the attacker imposes disadvantage, INT-mod uses per long rest.",
    "zh-CN": "被攻击时消耗一个反应，通过洞察攻击者使该次攻击具有劣势。每次长休恢复等于智力调整值的使用次数。"
  },
  "sheetPlay.resourceName.mystery_dream_logic": {
    "en": "Dream Logic",
    "zh-CN": "梦境逻辑"
  },
  "sheetDialog.resourceHelp.mystery_dream_logic": {
    "en": "1/rest, impose disadvantage on a creature's attack or check by voicing its doubt aloud (WIS save negates).",
    "zh-CN": "每次短休或长休后可使用 1 次：说出一个生物心中的疑虑，使其攻击或检定具有劣势；感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.mystery_duck_the_consequences": {
    "en": "Duck the Consequences",
    "zh-CN": "躲避后果"
  },
  "sheetDialog.resourceHelp.mystery_duck_the_consequences": {
    "en": "Reaction: impose disadvantage on one attack against you, CHA-mod uses per long rest.",
    "zh-CN": "消耗一个反应，使一次针对你的攻击具有劣势。每次长休恢复等于魅力调整值的使用次数。"
  },
  "sheetPlay.resourceName.mystery_ectoplasmic_shield": {
    "en": "Ectoplasmic Shield",
    "zh-CN": "灵质护盾"
  },
  "sheetDialog.resourceHelp.mystery_ectoplasmic_shield": {
    "en": "Reaction when hit: gain resistance to that instance of damage, WIS-mod uses per long rest.",
    "zh-CN": "被命中时消耗一个反应，对该次伤害具有抗性。每次长休恢复等于感知调整值的使用次数。"
  },
  "sheetPlay.resourceName.mystery_elementary": {
    "en": "Elementary",
    "zh-CN": "基本演绎"
  },
  "sheetDialog.resourceHelp.mystery_elementary": {
    "en": "1/long rest, name the culprit mechanism or motive; the DM confirms which parts of your theory are right.",
    "zh-CN": "每次长休后可使用 1 次：说出凶手、作案机制或动机，地下城主确认你的推理中哪些部分正确。"
  },
  "sheetPlay.resourceName.mystery_everybody_s_friend": {
    "en": "Everybody's Friend",
    "zh-CN": "众人的朋友"
  },
  "sheetDialog.resourceHelp.mystery_everybody_s_friend": {
    "en": "1/long rest, a creature that can hear you treats you as a trusted friend for 10 minutes (WIS save negates).",
    "zh-CN": "每次长休后可使用 1 次：使能听见你的一个生物视你为可信的朋友，持续 10 分钟；感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.mystery_ferrywoman_s_due": {
    "en": "Ferrywoman's Due",
    "zh-CN": "摆渡人的报酬"
  },
  "sheetDialog.resourceHelp.mystery_ferrywoman_s_due": {
    "en": "1/long rest, lay a spirit to rest or release a possession without a contest; hostile entities get a CHA save.",
    "zh-CN": "每次长休后可使用 1 次：让灵体安息或解除附身，无需对抗检定；敌对实体仍可进行魅力豁免。"
  },
  "sheetPlay.resourceName.mystery_front_page_pressure": {
    "en": "Front Page Pressure",
    "zh-CN": "头版施压"
  },
  "sheetDialog.resourceHelp.mystery_front_page_pressure": {
    "en": "1/long rest, publish or threaten to: a named organization must respond publicly within a day, opening a door for the party.",
    "zh-CN": "每次长休后可使用 1 次：公开报道或以报道相威胁，使指定组织在一天内公开回应，为队伍打开局面。"
  },
  "sheetPlay.resourceName.mystery_general_strike": {
    "en": "General Strike",
    "zh-CN": "全面罢工"
  },
  "sheetDialog.resourceHelp.mystery_general_strike": {
    "en": "1/long rest, you and all allies within 30 ft each gain a reaction attack when any one of you is hit, for 1 minute.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，当你或 30 英尺内任意盟友被命中时，你和区域内所有盟友各获得一次反应攻击。"
  },
  "sheetPlay.resourceName.mystery_guardian_shade": {
    "en": "Guardian Shade",
    "zh-CN": "守护幽影"
  },
  "sheetDialog.resourceHelp.mystery_guardian_shade": {
    "en": "A bound protective spirit follows you: 1/rest, it negates one attack that would hit you.",
    "zh-CN": "一个结契守护灵体跟随你，每次短休或长休后可使用 1 次，抵消一次原本会命中你的攻击。"
  },
  "sheetPlay.resourceName.mystery_hard_to_kill": {
    "en": "Hard to Kill",
    "zh-CN": "难以杀死"
  },
  "sheetDialog.resourceHelp.mystery_hard_to_kill": {
    "en": "1/long rest, when you drop to 0 HP, drop to 1 instead.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至 0 时改为保留 1。"
  },
  "sheetPlay.resourceName.mystery_headline_instinct": {
    "en": "Headline Instinct",
    "zh-CN": "头条直觉"
  },
  "sheetDialog.resourceHelp.mystery_headline_instinct": {
    "en": "1/rest, ask the DM who in the current scene knows something about your story; you get a true pointer.",
    "zh-CN": "每次短休或长休后可使用 1 次：询问地下城主当前场景中谁知道与你的报道有关的事情，获得真实的指引。"
  },
  "sheetPlay.resourceName.mystery_house_of_cards": {
    "en": "House of Cards",
    "zh-CN": "纸牌屋"
  },
  "sheetDialog.resourceHelp.mystery_house_of_cards": {
    "en": "1/long rest, reveal a con at the perfect moment: every enemy who believed it is stunned until their next turn (WIS save negates).",
    "zh-CN": "每次长休后可使用 1 次：在完美时机揭露骗局，所有信以为真的敌人震慑至其下一回合；感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.mystery_hypnotic_induction": {
    "en": "Hypnotic Induction",
    "zh-CN": "催眠引导"
  },
  "sheetDialog.resourceHelp.mystery_hypnotic_induction": {
    "en": "1/long rest, a willing or restrained creature answers three questions truthfully under trance (WIS save resists if unwilling).",
    "zh-CN": "每次长休后可使用 1 次：使自愿或受束缚的生物在恍惚中如实回答三个问题；不自愿者可通过感知豁免抵抗。"
  },
  "sheetPlay.resourceName.mystery_keen_deduction": {
    "en": "Keen Deduction",
    "zh-CN": "敏锐推理"
  },
  "sheetDialog.resourceHelp.mystery_keen_deduction": {
    "en": "1/short rest, after examining a scene, person, or object, ask the DM one pointed question; the answer is a true, useful clue.",
    "zh-CN": "每次短休或长休后可使用 1 次：检查场景、人物或物品后，向地下城主提出一个针对性问题，获得真实而有用的线索。"
  },
  "sheetPlay.resourceName.mystery_menace": {
    "en": "Menace",
    "zh-CN": "威吓"
  },
  "sheetDialog.resourceHelp.mystery_menace": {
    "en": "1/rest, force every hostile creature within 30 ft to save (WIS) or be frightened of you for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内敌对生物进行感知豁免，失败则对你恐慌，持续 1 分钟。"
  },
  "sheetPlay.resourceName.mystery_mind_palace": {
    "en": "Mind Palace",
    "zh-CN": "思维宫殿"
  },
  "sheetDialog.resourceHelp.mystery_mind_palace": {
    "en": "1/long rest, reconstruct a past scene you visited in perfect detail; the DM answers three questions about it.",
    "zh-CN": "每次长休后可使用 1 次：完整重建曾到访场景的细节，地下城主回答与其有关的三个问题。"
  },
  "sheetPlay.resourceName.mystery_pressure_point": {
    "en": "Pressure Point",
    "zh-CN": "施压要害"
  },
  "sheetDialog.resourceHelp.mystery_pressure_point": {
    "en": "1/rest, an interrogation question must be answered truthfully or the subject visibly refuses (WIS save to refuse quietly).",
    "zh-CN": "每次短休或长休后可使用 1 次：审问对象必须如实回答一个问题，或明显拒绝回答；感知豁免成功才可不露声色地拒绝。"
  },
  "sheetPlay.resourceName.mystery_projection": {
    "en": "Projection",
    "zh-CN": "心理投射"
  },
  "sheetDialog.resourceHelp.mystery_projection": {
    "en": "1/long rest, an illusory double of a creature's guilt confronts it: it is frightened of you for 1 minute (WIS save negates).",
    "zh-CN": "每次长休后可使用 1 次：让生物的罪疚化为幻象分身面对它，使其对你恐慌 1 分钟；感知豁免成功则不受影响。"
  },
  "sheetPlay.resourceName.mystery_queen_of_the_quiet_court": {
    "en": "Queen of the Quiet Court",
    "zh-CN": "寂静庭院女王"
  },
  "sheetDialog.resourceHelp.mystery_queen_of_the_quiet_court": {
    "en": "1/long rest, call a procession of spirits: for 1 minute they obscure, terrify (WIS save), and strike (2d8 necrotic) as you direct.",
    "zh-CN": "每次长休后可使用 1 次：召来灵体队列，持续 1 分钟，按你的指挥遮蔽视线、引发恐慌（感知豁免）或攻击（2d8 黯蚀伤害）。"
  },
  "sheetPlay.resourceName.mystery_radical_breakthrough": {
    "en": "Radical Breakthrough",
    "zh-CN": "根本突破"
  },
  "sheetDialog.resourceHelp.mystery_radical_breakthrough": {
    "en": "1/long rest, cure a creature of a long-term madness, phobia, or compulsion, including magical ones.",
    "zh-CN": "每次长休后可使用 1 次：治愈生物的长期疯狂、恐惧症或强迫症，包括魔法造成的情况。"
  },
  "sheetPlay.resourceName.mystery_rally_the_line": {
    "en": "Rally the Line",
    "zh-CN": "振奋阵线"
  },
  "sheetDialog.resourceHelp.mystery_rally_the_line": {
    "en": "1/rest, allies within 30 ft gain temp HP equal to your level + CON mod.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内盟友获得等于你的等级 + 体质调整值的临时生命值。"
  },
  "sheetPlay.resourceName.mystery_read_the_mind_s_wound": {
    "en": "Read the Mind's Wound",
    "zh-CN": "读取心灵创伤"
  },
  "sheetDialog.resourceHelp.mystery_read_the_mind_s_wound": {
    "en": "Double proficiency bonus on Insight; 1/rest, learn whether a creature is lying, afraid, or concealing something.",
    "zh-CN": "洞悉检定的熟练加值翻倍；每次短休或长休后可使用 1 次，获知一个生物是否在说谎、害怕或隐瞒事情。"
  },
  "sheetPlay.resourceName.mystery_second_sight": {
    "en": "Second Sight",
    "zh-CN": "第二视觉"
  },
  "sheetDialog.resourceHelp.mystery_second_sight": {
    "en": "1/rest, glimpse a place, person, or event connected to a held object: one true image.",
    "zh-CN": "每次短休或长休后可使用 1 次：通过持有物品瞥见与其有关的地点、人物或事件，获得一个真实的画面。"
  },
  "sheetPlay.resourceName.mystery_shared_subconscious": {
    "en": "Shared Subconscious",
    "zh-CN": "共享潜意识"
  },
  "sheetDialog.resourceHelp.mystery_shared_subconscious": {
    "en": "1/long rest, link the party's minds for 10 minutes: silent communication and shared Insight results.",
    "zh-CN": "每次长休后可使用 1 次：连接队伍心智 10 分钟，可无声交流并共享洞悉结果。"
  },
  "sheetPlay.resourceName.mystery_silver_tongue": {
    "en": "Silver Tongue",
    "zh-CN": "巧舌"
  },
  "sheetDialog.resourceHelp.mystery_silver_tongue": {
    "en": "1/short rest, reroll a failed Deception or Persuasion check.",
    "zh-CN": "每次短休或长休后可使用 1 次：重掷一次失败的欺瞒或游说检定。"
  },
  "sheetPlay.resourceName.mystery_speak_with_the_departed": {
    "en": "Speak with the Departed",
    "zh-CN": "与逝者交谈"
  },
  "sheetDialog.resourceHelp.mystery_speak_with_the_departed": {
    "en": "1/rest, commune with a spirit tied to a place, object, or body; it answers three brief questions truthfully as it understood things.",
    "zh-CN": "每次短休或长休后可使用 1 次：与依附于地点、物品或尸体的灵体交流，对方按自身理解如实简短回答三个问题。"
  },
  "sheetPlay.resourceName.mystery_spirit_ward": {
    "en": "Spirit Ward",
    "zh-CN": "灵体守护"
  },
  "sheetDialog.resourceHelp.mystery_spirit_ward": {
    "en": "Bonus action: a shielding spirit grants you or an ally +2 AC until your next turn, WIS-mod uses per long rest.",
    "zh-CN": "消耗一个附赠动作，使守护灵体为你或盟友提供护甲等级 +2，持续至你的下一回合。每次长休恢复等于感知调整值的使用次数。"
  },
  "sheetPlay.resourceName.mystery_syndicated": {
    "en": "Syndicated",
    "zh-CN": "联合刊发"
  },
  "sheetDialog.resourceHelp.mystery_syndicated": {
    "en": "Your Front Page Pressure reaches every city on the wire; 2 uses per long rest.",
    "zh-CN": "头版施压可通过通信网覆盖每座城市，每次长休后可使用 2 次。"
  },
  "sheetPlay.resourceName.mystery_the_editor_s_desk": {
    "en": "The Editor's Desk",
    "zh-CN": "编辑台"
  },
  "sheetDialog.resourceHelp.mystery_the_editor_s_desk": {
    "en": "1/long rest, call in the full network: three true answers about any ongoing scheme, no matter how hidden.",
    "zh-CN": "每次长休后可使用 1 次：动用全部人脉网络，获得任何正在进行的阴谋的三个真实答案，无论其多么隐秘。"
  },
  "sheetPlay.resourceName.mystery_the_examined_mind": {
    "en": "The Examined Mind",
    "zh-CN": "剖析心智"
  },
  "sheetDialog.resourceHelp.mystery_the_examined_mind": {
    "en": "1/long rest, cast one treatment of 5th level or lower without a slot; it cannot be resisted by creatures you have a Trauma Map of.",
    "zh-CN": "每次长休后可使用 1 次：施放一个五环或更低环阶疗法，无需法术位；拥有其创伤图谱的生物无法抵抗该疗法。"
  },
  "sheetPlay.resourceName.mystery_the_game_afoot": {
    "en": "The Game Afoot",
    "zh-CN": "追踪开始"
  },
  "sheetDialog.resourceHelp.mystery_the_game_afoot": {
    "en": "1/rest, grant yourself and allies within 30 ft advantage on the next check made in pursuit of a suspect.",
    "zh-CN": "每次短休或长休后可使用 1 次：使你和 30 英尺内盟友在追捕嫌疑人时进行的下一次检定具有优势。"
  },
  "sheetPlay.resourceName.mystery_the_perfect_con": {
    "en": "The Perfect Con",
    "zh-CN": "完美骗局"
  },
  "sheetDialog.resourceHelp.mystery_the_perfect_con": {
    "en": "1/long rest, declare a con you have been running this session; the DM retroactively honors the setup within reason.",
    "zh-CN": "每次长休后可使用 1 次：声明本场游玩期间一直在筹划的骗局，地下城主在合理范围内承认其先前准备。"
  },
  "sheetPlay.resourceName.mystery_the_scene_speaks": {
    "en": "The Scene Speaks",
    "zh-CN": "现场开口"
  },
  "sheetDialog.resourceHelp.mystery_the_scene_speaks": {
    "en": "Keen Deduction has 3 uses per short rest.",
    "zh-CN": "敏锐推理每次短休后可使用 3 次。"
  },
  "sheetPlay.resourceName.mystery_the_story_of_the_century": {
    "en": "The Story of the Century",
    "zh-CN": "世纪报道"
  },
  "sheetDialog.resourceHelp.mystery_the_story_of_the_century": {
    "en": "1/long rest, publish the truth: a named creature's public standing collapses, and its allies must save (WIS) or abandon it.",
    "zh-CN": "每次长休后可使用 1 次：发表真相，使一个指定生物的公众声望崩塌，其盟友须进行感知豁免，失败则抛弃它。"
  },
  "sheetPlay.resourceName.mystery_the_unconscious_speaks": {
    "en": "The Unconscious Speaks",
    "zh-CN": "潜意识开口"
  },
  "sheetDialog.resourceHelp.mystery_the_unconscious_speaks": {
    "en": "1/long rest, read a sleeping or unconscious creature's dreams for three true impressions.",
    "zh-CN": "每次长休后可使用 1 次：读取睡眠或失去意识生物的梦境，获得三个真实的印象。"
  },
  "sheetPlay.resourceName.mystery_trance_of_the_crossing": {
    "en": "Trance of the Crossing",
    "zh-CN": "渡界恍惚"
  },
  "sheetDialog.resourceHelp.mystery_trance_of_the_crossing": {
    "en": "1/long rest, project your spirit up to 1 mile for 10 minutes; your body is helpless but warded.",
    "zh-CN": "每次长休后可使用 1 次：灵体投射至一英里内，持续 10 分钟；身体无法自保，但受到保护。"
  },
  "sheetPlay.resourceName.mystery_unquiet_testimony": {
    "en": "Unquiet Testimony",
    "zh-CN": "不安的证词"
  },
  "sheetDialog.resourceHelp.mystery_unquiet_testimony": {
    "en": "1/long rest, compel a spirit witness to relive its last hour aloud; the DM narrates what it saw.",
    "zh-CN": "每次长休后可使用 1 次：迫使灵体证人出声重现最后一小时的经历，地下城主描述其所见。"
  },
  "sheetPlay.resourceName.mystery_vanish": {
    "en": "Vanish",
    "zh-CN": "消失"
  },
  "sheetDialog.resourceHelp.mystery_vanish": {
    "en": "Hide as a bonus action even in plain sight, 3/long rest.",
    "zh-CN": "即使暴露在视野中也可用附赠动作躲藏，每次长休后可使用 3 次。"
  },
  "sheetPlay.resourceName.mystery_voice_of_the_people": {
    "en": "Voice of the People",
    "zh-CN": "人民之声"
  },
  "sheetDialog.resourceHelp.mystery_voice_of_the_people": {
    "en": "1/long rest, a crowd within earshot acts on your words: blocks a street, boos a villain, shelters a fugitive.",
    "zh-CN": "每次长休后可使用 1 次：让能听见你的群众按你的话语行动，如封堵街道、嘘声斥责恶人或庇护逃亡者。"
  },
  "sheetPlay.resourceName.post_apocalyptic_alpha_s_roar": {
    "en": "Alpha's Roar",
    "zh-CN": "首领怒吼"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_alpha_s_roar": {
    "en": "1/rest, hostile beasts and mutants within 30 ft save (WIS) or cower (no move toward you) for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内敌对野兽和变异生物进行感知豁免，失败则畏缩，1 分钟内无法向你移动。"
  },
  "sheetPlay.resourceName.post_apocalyptic_call_the_wild": {
    "en": "Call the Wild",
    "zh-CN": "呼唤荒野"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_call_the_wild": {
    "en": "1/long rest, summon 1d4 local beasts to aid you for 10 minutes.",
    "zh-CN": "每次长休后可使用 1 次：召来 1d4 只当地野兽，协助你 10 分钟。"
  },
  "sheetPlay.resourceName.post_apocalyptic_chameleon_skin": {
    "en": "Chameleon Skin",
    "zh-CN": "变色龙皮肤"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_chameleon_skin": {
    "en": "Advantage on Stealth; 1/rest, turn near-invisible until you attack or cast.",
    "zh-CN": "隐匿检定具有优势；每次短休或长休后可使用 1 次，变得近乎不可见，持续至你攻击或施法。"
  },
  "sheetPlay.resourceName.post_apocalyptic_collapse_instinct": {
    "en": "Collapse Instinct",
    "zh-CN": "坍塌直觉"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_collapse_instinct": {
    "en": "1/rest, trigger or predict a structural collapse: creatures in a 15-ft cube save (DEX) or take 4d6 bludgeoning and are restrained by rubble.",
    "zh-CN": "每次短休或长休后可使用 1 次：引发或预判结构坍塌，使 15 英尺立方区域内生物进行敏捷豁免，失败则受到 4d6 钝击伤害，并被碎石束缚。"
  },
  "sheetPlay.resourceName.post_apocalyptic_dawnlight": {
    "en": "Dawnlight",
    "zh-CN": "黎明之光"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_dawnlight": {
    "en": "1/rest, your raised hand sheds sunlight in a 30-ft radius for 10 minutes; undead and mutants in it have disadvantage on attacks.",
    "zh-CN": "每次短休或长休后可使用 1 次：举手散发半径 30 英尺的阳光，持续 10 分钟，其中的亡灵和变异生物攻击具有劣势。"
  },
  "sheetPlay.resourceName.post_apocalyptic_deep_pockets": {
    "en": "Deep Pockets",
    "zh-CN": "深口袋"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_deep_pockets": {
    "en": "1/long rest, produce exactly the mundane item the party needs; you scavenged it earlier.",
    "zh-CN": "每次长休后可使用 1 次：拿出队伍所需的普通物品，视为之前拾荒所得。"
  },
  "sheetPlay.resourceName.post_apocalyptic_deliverance": {
    "en": "Deliverance",
    "zh-CN": "解救"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_deliverance": {
    "en": "1/rest, end one fear, charm, or curse effect on a creature within 30 ft.",
    "zh-CN": "每次短休或长休后可使用 1 次：结束 30 英尺内生物的一个恐慌、魅惑或诅咒效果。"
  },
  "sheetPlay.resourceName.post_apocalyptic_emp_coil": {
    "en": "EMP Coil",
    "zh-CN": "电磁脉冲线圈"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_emp_coil": {
    "en": "1/rest, constructs and machines within 15 ft save (CON) or are stunned until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：15 英尺内构装生物和机器进行体质豁免，失败则震慑至你的下一回合。"
  },
  "sheetPlay.resourceName.post_apocalyptic_flock_s_shepherd": {
    "en": "Flock's Shepherd",
    "zh-CN": "群体牧者"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_flock_s_shepherd": {
    "en": "Bonus action: one ally within 30 ft gains temp HP equal to your level + WIS mod, WIS-mod uses per long rest.",
    "zh-CN": "消耗一个附赠动作，使 30 英尺内一个盟友获得等于你的等级 + 感知调整值的临时生命值。每次长休恢复等于感知调整值的使用次数。"
  },
  "sheetPlay.resourceName.post_apocalyptic_halo_of_the_core": {
    "en": "Halo of the Core",
    "zh-CN": "核心光环"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_halo_of_the_core": {
    "en": "1/rest, emit a 10-ft flare: enemies save (CON) or are blinded until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：释放范围 10 英尺的闪光，敌人进行体质豁免，失败则目盲至你的下一回合。"
  },
  "sheetPlay.resourceName.post_apocalyptic_hardened": {
    "en": "Hardened",
    "zh-CN": "坚韧"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_hardened": {
    "en": "1/rest, reduce all damage you take this round by your CON modifier.",
    "zh-CN": "每次短休或长休后可使用 1 次：本轮受到的每次伤害减少等于体质调整值的数值。"
  },
  "sheetPlay.resourceName.post_apocalyptic_hardened_mutation": {
    "en": "Hardened Mutation",
    "zh-CN": "强化变异"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_hardened_mutation": {
    "en": "1/long rest, regain expended slot levels equal to your CHA modifier when you drop below half HP.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至上限一半以下时，恢复已消耗的法术位，总环阶等于魅力调整值。"
  },
  "sheetPlay.resourceName.post_apocalyptic_king_of_the_heap": {
    "en": "King of the Heap",
    "zh-CN": "垃圾堆之王"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_king_of_the_heap": {
    "en": "Scrap Sense always finds two items; 1/day one of them is exactly what you ask for.",
    "zh-CN": "废料感知总能找到两件物品，每日一次，其中一件恰好是你要求的物品。"
  },
  "sheetPlay.resourceName.post_apocalyptic_last_ride_of_the_reaver": {
    "en": "Last Ride of the Reaver",
    "zh-CN": "掠夺者的最后疾驰"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_last_ride_of_the_reaver": {
    "en": "1/long rest, for 1 minute your speed doubles, Ram Speed deals +4d6, and you resist all damage.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，速度翻倍，冲撞加速额外造成 4d6 伤害，并对所有伤害具有抗性。"
  },
  "sheetPlay.resourceName.post_apocalyptic_legend_of_the_pack": {
    "en": "Legend of the Pack",
    "zh-CN": "兽群传说"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_legend_of_the_pack": {
    "en": "1/long rest, your beast grows monstrous for 1 minute: double HP, +10 ft speed, attacks deal +2d8 and frighten (WIS save).",
    "zh-CN": "每次长休后可使用 1 次：你的野兽变为庞大怪兽，持续 1 分钟，生命值翻倍、速度 +10 英尺、攻击额外造成 2d8 伤害，并引发恐慌（感知豁免）。"
  },
  "sheetPlay.resourceName.post_apocalyptic_make_it_work": {
    "en": "Make It Work",
    "zh-CN": "让它运转"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_make_it_work": {
    "en": "1/rest, repair or rig a device, vehicle, or weapon in 1 minute; it works for a scene.",
    "zh-CN": "每次短休或长休后可使用 1 次：花费 1 分钟修复或改装设备、载具或武器，使其可用至本场景结束。"
  },
  "sheetPlay.resourceName.post_apocalyptic_pack_endurance": {
    "en": "Pack Endurance",
    "zh-CN": "兽群坚韧"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_pack_endurance": {
    "en": "When your beast would drop to 0 HP, 1/long rest it drops to 1 instead; the same holds for you while it lives.",
    "zh-CN": "每次长休后可触发 1 次：野兽生命值本应降至 0 时改为保留 1；只要它还活着，你也受到同样保护。"
  },
  "sheetPlay.resourceName.post_apocalyptic_percussive_maintenance": {
    "en": "Percussive Maintenance",
    "zh-CN": "敲击维修"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_percussive_maintenance": {
    "en": "2/rest, whack a machine or construct: restore 1d8 + INT HP to it or clear one malfunction.",
    "zh-CN": "每次短休或长休后可使用 2 次：敲击机器或构装生物，为其恢复 1d8 + 智力调整值的生命值，或清除一个故障。"
  },
  "sheetPlay.resourceName.post_apocalyptic_power_cell_cache": {
    "en": "Power Cell Cache",
    "zh-CN": "能源电池储备"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_power_cell_cache": {
    "en": "1/rest, cast a 1st-level tech effect without expending a slot.",
    "zh-CN": "每次短休或长休后可使用 1 次：施放一个一环科技效果，无需消耗法术位。"
  },
  "sheetPlay.resourceName.post_apocalyptic_prophet_of_the_wastes": {
    "en": "Prophet of the Wastes",
    "zh-CN": "废土先知"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_prophet_of_the_wastes": {
    "en": "1/long rest, receive a true omen about a planned course of action (weal, woe, or both).",
    "zh-CN": "每次长休后可使用 1 次：获得有关计划行动的真实预兆，可能是吉兆、凶兆或两者皆有。"
  },
  "sheetPlay.resourceName.post_apocalyptic_prototype_rig": {
    "en": "Prototype Rig",
    "zh-CN": "原型装置"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_prototype_rig": {
    "en": "Choose one 5th-level tech effect; cast it 1/long rest without a slot.",
    "zh-CN": "选择一个五环科技效果，每次长休后可施放一次，无需法术位。"
  },
  "sheetPlay.resourceName.post_apocalyptic_rapid_adaptation": {
    "en": "Rapid Adaptation",
    "zh-CN": "快速适应"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_rapid_adaptation": {
    "en": "1/long rest, after taking elemental damage, gain resistance to that type until you rest.",
    "zh-CN": "每次长休后可使用 1 次：受到元素伤害后，获得对该类型的抗性，持续至休息。"
  },
  "sheetPlay.resourceName.post_apocalyptic_reactor_heart": {
    "en": "Reactor Heart",
    "zh-CN": "反应堆之心"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_reactor_heart": {
    "en": "1/long rest, for 1 minute your tech effects of 4th level or lower cost no slots; you glow visibly.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，四环或更低环阶科技效果无需法术位，身体散发可见光芒。"
  },
  "sheetPlay.resourceName.post_apocalyptic_regenerative_strain": {
    "en": "Regenerative Strain",
    "zh-CN": "再生变异"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_regenerative_strain": {
    "en": "Spend a hit die as a bonus action to heal, CHA-mod uses per long rest.",
    "zh-CN": "以附赠动作消耗一个生命骰来治疗，每次长休恢复等于魅力调整值的使用次数。"
  },
  "sheetPlay.resourceName.post_apocalyptic_revelation": {
    "en": "Revelation",
    "zh-CN": "启示"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_revelation": {
    "en": "1/long rest, deliver the full sermon: allies within 60 ft regain 5d8 HP and are freed of fear, charm, and exhaustion by one level.",
    "zh-CN": "每次长休后可使用 1 次：完整布道，使 60 英尺内盟友恢复 5d8 生命值，解除恐慌、魅惑，并使力竭等级降低一级。"
  },
  "sheetPlay.resourceName.post_apocalyptic_road_rage": {
    "en": "Road Rage",
    "zh-CN": "公路狂怒"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_road_rage": {
    "en": "1/rest, when an ally within 30 ft drops to 0 HP, immediately move your speed and make one attack.",
    "zh-CN": "每次短休或长休后可使用 1 次：30 英尺内盟友生命值降至 0 时，立即移动至多自身速度的距离，并进行一次攻击。"
  },
  "sheetPlay.resourceName.post_apocalyptic_salvaged_shield_node": {
    "en": "Salvaged Shield Node",
    "zh-CN": "回收护盾节点"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_salvaged_shield_node": {
    "en": "1/long rest, project a 10-ft energy dome for 1 minute: allies inside gain +2 AC and resistance to ranged weapon damage.",
    "zh-CN": "每次长休后可使用 1 次：投射范围 10 英尺的能量罩，持续 1 分钟，罩内盟友护甲等级 +2，且对远程武器伤害具有抗性。"
  },
  "sheetPlay.resourceName.post_apocalyptic_scrap_sense": {
    "en": "Scrap Sense",
    "zh-CN": "废料感知"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_scrap_sense": {
    "en": "1/short rest, search any ruin or wreck for 10 minutes and find one genuinely useful item (the DM decides what plausibly exists).",
    "zh-CN": "每次短休或长休后可使用 1 次：搜寻废墟或残骸 10 分钟，找到一件确实有用的物品，具体合理物品由地下城主决定。"
  },
  "sheetPlay.resourceName.post_apocalyptic_second_sun": {
    "en": "Second Sun",
    "zh-CN": "第二太阳"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_second_sun": {
    "en": "1/long rest, unleash the core: a 30-ft radius burst dealing 8d6 radiant (CON save halves); allies are spared.",
    "zh-CN": "每次长休后可使用 1 次：释放核心能量，在半径 30 英尺内造成 8d6 光耀伤害，体质豁免成功则减半；盟友不受伤害。"
  },
  "sheetPlay.resourceName.post_apocalyptic_shared_fury": {
    "en": "Shared Fury",
    "zh-CN": "共享狂怒"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_shared_fury": {
    "en": "1/rest, you and your beast each gain +2 to damage rolls for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：你和野兽的伤害掷骰各 +2，持续 1 分钟。"
  },
  "sheetPlay.resourceName.post_apocalyptic_splintered_form": {
    "en": "Splintered Form",
    "zh-CN": "碎裂形态"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_splintered_form": {
    "en": "1/long rest, reaction when hit: split into a swarm shape until your next turn, taking half damage from the attack and moving through gaps freely.",
    "zh-CN": "每次长休后可使用 1 次：被命中时消耗一个反应，分裂为群体形态至下一回合，该次攻击伤害减半，并可自由穿过缝隙。"
  },
  "sheetPlay.resourceName.post_apocalyptic_stand_at_the_dawn": {
    "en": "Stand at the Dawn",
    "zh-CN": "立于黎明"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_stand_at_the_dawn": {
    "en": "1/long rest, when an ally within 30 ft drops to 0 HP, they instead drop to WIS-mod x 5 HP.",
    "zh-CN": "每次长休后可使用 1 次：30 英尺内盟友生命值本应降至 0 时，改为保留等于感知调整值 ×5 的生命值。"
  },
  "sheetPlay.resourceName.post_apocalyptic_surge_of_change": {
    "en": "Surge of Change",
    "zh-CN": "变异涌动"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_surge_of_change": {
    "en": "2/rest, cast a cantrip as a bonus action after casting a leveled mutation.",
    "zh-CN": "每次短休或长休后可使用 2 次：施放有环阶的变异法术后，以附赠动作施放一个戏法。"
  },
  "sheetPlay.resourceName.post_apocalyptic_testify": {
    "en": "Testify",
    "zh-CN": "见证布道"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_testify": {
    "en": "1/rest, an audible sermon gives allies within 30 ft advantage on their next save against fear or despair.",
    "zh-CN": "每次短休或长休后可使用 1 次：以可听见的布道，使 30 英尺内盟友下一次对恐慌或绝望的豁免具有优势。"
  },
  "sheetPlay.resourceName.post_apocalyptic_the_good_stuff": {
    "en": "The Good Stuff",
    "zh-CN": "好东西"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_the_good_stuff": {
    "en": "1/long rest, your search turns up something rare: old-world tech, ammo cache, or medicine (DM picks the form).",
    "zh-CN": "每次长休后可使用 1 次：搜寻到稀有物品，如旧世界科技、弹药储备或药物；形式由地下城主决定。"
  },
  "sheetPlay.resourceName.post_apocalyptic_the_next_step": {
    "en": "The Next Step",
    "zh-CN": "下次进化"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_the_next_step": {
    "en": "1/long rest, for 1 minute your mutations of 3rd level or lower cost no slots and your Adaptive Hide grants +2 more AC.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，三环或更低环阶变异法术无需法术位，适应皮肤额外提供护甲等级 +2。"
  },
  "sheetPlay.resourceName.post_apocalyptic_the_old_world_answers": {
    "en": "The Old World Answers",
    "zh-CN": "旧世界的答案"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_the_old_world_answers": {
    "en": "1/long rest, ask the DM one question answerable from pre-Fall records; you recall the answer.",
    "zh-CN": "每次长休后可使用 1 次：向地下城主提出一个灾变前记录能够解答的问题，你回想起答案。"
  },
  "sheetPlay.resourceName.post_apocalyptic_the_pack_provides": {
    "en": "The Pack Provides",
    "zh-CN": "兽群馈赠"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_the_pack_provides": {
    "en": "Call the Wild summons 2d4 beasts and recharges on a short rest 1/day.",
    "zh-CN": "呼唤荒野召唤 2d4 只野兽，每日一次可在短休后恢复使用机会。"
  },
  "sheetPlay.resourceName.post_apocalyptic_water_from_stone": {
    "en": "Water From Stone",
    "zh-CN": "石中取水"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_water_from_stone": {
    "en": "1/day, find or purify enough water and food for six people.",
    "zh-CN": "每日一次，找到或净化足够六个人使用的食物和水。"
  },
  "sheetPlay.resourceName.post_apocalyptic_witnessed": {
    "en": "Witnessed",
    "zh-CN": "见证者"
  },
  "sheetDialog.resourceHelp.post_apocalyptic_witnessed": {
    "en": "1/long rest, when you drop to 0 HP, keep fighting: you remain conscious at 0 for 1 minute, then fall.",
    "zh-CN": "每次长休后可使用 1 次：生命值降至 0 时仍可战斗，在 0 生命值下保持清醒 1 分钟，随后倒下。"
  },
  "sheetPlay.resourceName.steampunk_aether_capacitor": {
    "en": "Aether Capacitor",
    "zh-CN": "以太电容器"
  },
  "sheetDialog.resourceHelp.steampunk_aether_capacitor": {
    "en": "1/long rest, regain expended slot levels equal to your INT modifier.",
    "zh-CN": "每次长休后可使用 1 次：恢复已消耗的法术位，总环阶等于智力调整值。"
  },
  "sheetPlay.resourceName.steampunk_aetheric_battery": {
    "en": "Aetheric Battery",
    "zh-CN": "以太电池"
  },
  "sheetDialog.resourceHelp.steampunk_aetheric_battery": {
    "en": "1/long rest, regain expended slot levels equal to your CHA modifier.",
    "zh-CN": "每次长休后可使用 1 次：恢复已消耗的法术位，总环阶等于魅力调整值。"
  },
  "sheetPlay.resourceName.steampunk_arc_coil": {
    "en": "Arc Coil",
    "zh-CN": "电弧线圈"
  },
  "sheetDialog.resourceHelp.steampunk_arc_coil": {
    "en": "1/rest, your tuned weapon deals +2d8 lightning on one hit; the target cannot take reactions until its next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：调校武器的一次命中额外造成 2d8 闪电伤害，目标直到其下一回合都无法采取反应。"
  },
  "sheetPlay.resourceName.steampunk_backup_rig": {
    "en": "Backup Rig",
    "zh-CN": "备用装置"
  },
  "sheetDialog.resourceHelp.steampunk_backup_rig": {
    "en": "When an effect would destroy or disable a held gadget, it survives; 1/long rest, ignore being disarmed.",
    "zh-CN": "持有的小装置本应被摧毁或禁用时，仍保持完好；每次长休后可忽略缴械 1 次。"
  },
  "sheetPlay.resourceName.steampunk_boarding_action": {
    "en": "Boarding Action",
    "zh-CN": "登船突击"
  },
  "sheetDialog.resourceHelp.steampunk_boarding_action": {
    "en": "1/rest, when combat starts, immediately move your speed and make one attack.",
    "zh-CN": "每次短休或长休后可使用 1 次：战斗开始时，立即移动至多自身速度的距离，并进行一次攻击。"
  },
  "sheetPlay.resourceName.steampunk_broadside": {
    "en": "Broadside",
    "zh-CN": "舷侧齐射"
  },
  "sheetDialog.resourceHelp.steampunk_broadside": {
    "en": "1/rest, fire at up to three targets in a 15-ft cone with a single attack roll each.",
    "zh-CN": "每次短休或长休后可使用 1 次：射击 15 英尺锥形区域内至多三个目标，对每个目标分别进行一次攻击掷骰。"
  },
  "sheetPlay.resourceName.steampunk_capacitor_soul": {
    "en": "Capacitor Soul",
    "zh-CN": "电容之魂"
  },
  "sheetDialog.resourceHelp.steampunk_capacitor_soul": {
    "en": "1/long rest, absorb a lightning or aether effect targeting you: negate it and regain a 1st-level slot.",
    "zh-CN": "每次长休后可使用 1 次：吸收针对你的闪电或以太效果，使其无效，并恢复一个一环法术位。"
  },
  "sheetPlay.resourceName.steampunk_catalyst_stone": {
    "en": "Catalyst Stone",
    "zh-CN": "催化之石"
  },
  "sheetDialog.resourceHelp.steampunk_catalyst_stone": {
    "en": "A prepared stone: 1/rest, add +1d4 to one formula's damage or healing.",
    "zh-CN": "准备好的石头，每次短休或长休后可使用 1 次，为一个配方法术的伤害或治疗增加 1d4。"
  },
  "sheetPlay.resourceName.steampunk_chain_arc": {
    "en": "Chain Arc",
    "zh-CN": "连锁电弧"
  },
  "sheetDialog.resourceHelp.steampunk_chain_arc": {
    "en": "1/rest, a single-target lightning art jumps to a second target within 15 ft for half damage.",
    "zh-CN": "每次短休或长休后可使用 1 次：使单体闪电技艺跃向 15 英尺内第二个目标，造成一半伤害。"
  },
  "sheetPlay.resourceName.steampunk_difference_engine_mind": {
    "en": "Difference Engine Mind",
    "zh-CN": "差分机思维"
  },
  "sheetDialog.resourceHelp.steampunk_difference_engine_mind": {
    "en": "1/rest, take the calculated answer: treat one INT-based check as a natural 20.",
    "zh-CN": "每次短休或长休后可使用 1 次：采用计算所得的答案，将一次智力检定视为自然掷出 20。"
  },
  "sheetPlay.resourceName.steampunk_dissolving_mist": {
    "en": "Dissolving Mist",
    "zh-CN": "溶解之雾"
  },
  "sheetDialog.resourceHelp.steampunk_dissolving_mist": {
    "en": "1/long rest, a 20-ft radius acid fog for 1 minute: 3d6 acid at the start of each creature's turn inside (CON save halves).",
    "zh-CN": "每次长休后可使用 1 次：产生半径 20 英尺的酸雾，持续 1 分钟，其中每个生物在回合开始时受到 3d6 强酸伤害，体质豁免成功则减半。"
  },
  "sheetPlay.resourceName.steampunk_elixir_of_mastery": {
    "en": "Elixir of Mastery",
    "zh-CN": "精通灵药"
  },
  "sheetDialog.resourceHelp.steampunk_elixir_of_mastery": {
    "en": "1/long rest, brew a greater elixir: drinker gains advantage on everything for 1 minute.",
    "zh-CN": "每次长休后可使用 1 次：酿制高等灵药，饮用者在 1 分钟内的检定、攻击掷骰和豁免均具有优势。"
  },
  "sheetPlay.resourceName.steampunk_emergency_release": {
    "en": "Emergency Release",
    "zh-CN": "紧急泄压"
  },
  "sheetDialog.resourceHelp.steampunk_emergency_release": {
    "en": "1/rest, when reduced below half HP, vent: attackers within 10 ft take 3d8 fire (DEX save halves).",
    "zh-CN": "每次短休或长休后可使用 1 次：生命值降至上限一半以下时泄压，使 10 英尺内攻击者受到 3d8 火焰伤害，敏捷豁免成功则减半。"
  },
  "sheetPlay.resourceName.steampunk_field_repair": {
    "en": "Field Repair",
    "zh-CN": "现场维修"
  },
  "sheetDialog.resourceHelp.steampunk_field_repair": {
    "en": "2/rest, 1 minute of work restores 1d8 + INT HP to a construct, machine, or armored ally.",
    "zh-CN": "每次短休或长休后可使用 2 次：花费 1 分钟修复，为构装生物、机器或穿甲盟友恢复 1d8 + 智力调整值的生命值。"
  },
  "sheetPlay.resourceName.steampunk_full_throttle": {
    "en": "Full Throttle",
    "zh-CN": "全速运转"
  },
  "sheetDialog.resourceHelp.steampunk_full_throttle": {
    "en": "1/long rest, double your speed and gain an extra action each turn for 1 minute; take 3d10 fire when it ends.",
    "zh-CN": "每次长休后可使用 1 次：速度翻倍，每回合额外获得一个动作，持续 1 分钟；结束时受到 3d10 火焰伤害。"
  },
  "sheetPlay.resourceName.steampunk_fumes_and_vapors": {
    "en": "Fumes and Vapors",
    "zh-CN": "烟雾蒸气"
  },
  "sheetDialog.resourceHelp.steampunk_fumes_and_vapors": {
    "en": "1/rest, a stinking cloud fills a 10-ft radius for 1 minute: creatures inside save (CON) or retch, losing their action.",
    "zh-CN": "每次短休或长休后可使用 1 次：恶臭云雾充满半径 10 英尺区域，持续 1 分钟，其中生物进行体质豁免，失败则干呕并失去动作。"
  },
  "sheetPlay.resourceName.steampunk_galvanic_discharge": {
    "en": "Galvanic Discharge",
    "zh-CN": "电流放电"
  },
  "sheetDialog.resourceHelp.steampunk_galvanic_discharge": {
    "en": "1/rest, a creature that touches or melee-hits you takes 1d8 lightning.",
    "zh-CN": "每次短休或长休后可使用 1 次：触碰你或近战命中你的生物受到 1d8 闪电伤害。"
  },
  "sheetPlay.resourceName.steampunk_gear_swarm": {
    "en": "Gear Swarm",
    "zh-CN": "齿轮群"
  },
  "sheetDialog.resourceHelp.steampunk_gear_swarm": {
    "en": "1/rest, loose a box of whirring gears: a 15-ft cube becomes difficult terrain and deals 2d6 slashing to creatures entering it, for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：释放一盒旋转齿轮，使 15 英尺立方区域成为困难地形，进入的生物受到 2d6 挥砍伤害，持续 1 分钟。"
  },
  "sheetPlay.resourceName.steampunk_living_dynamo": {
    "en": "Living Dynamo",
    "zh-CN": "活体发电机"
  },
  "sheetDialog.resourceHelp.steampunk_living_dynamo": {
    "en": "1/long rest, for 1 minute your arts of 3rd level or lower cost no slots.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，三环或更低环阶技艺无需法术位。"
  },
  "sheetPlay.resourceName.steampunk_magnum_opus": {
    "en": "Magnum Opus",
    "zh-CN": "巅峰之作"
  },
  "sheetDialog.resourceHelp.steampunk_magnum_opus": {
    "en": "1/long rest, cast one schematic of 6th level or lower without a slot; constructs and machines cannot resist it.",
    "zh-CN": "每次长休后可使用 1 次：施放一个六环或更低环阶设计法术，无需法术位，构装生物和机器无法抵抗。"
  },
  "sheetPlay.resourceName.steampunk_master_schematic": {
    "en": "Master Schematic",
    "zh-CN": "大师设计"
  },
  "sheetDialog.resourceHelp.steampunk_master_schematic": {
    "en": "Choose one 3rd-level schematic; cast it 1/long rest without a slot.",
    "zh-CN": "选择一个三环设计法术，每次长休后可施放一次，无需法术位。"
  },
  "sheetPlay.resourceName.steampunk_one_gadget_for_everything": {
    "en": "One Gadget for Everything",
    "zh-CN": "万能装置"
  },
  "sheetDialog.resourceHelp.steampunk_one_gadget_for_everything": {
    "en": "1/long rest, declare you prepared exactly the right device for this situation; the DM makes it work once.",
    "zh-CN": "每次长休后可使用 1 次：声明已为当前状况准备好恰当装置，地下城主使其成功运作一次。"
  },
  "sheetPlay.resourceName.steampunk_overcharge": {
    "en": "Overcharge",
    "zh-CN": "过度充能"
  },
  "sheetDialog.resourceHelp.steampunk_overcharge": {
    "en": "1/long rest, a damaging art rolls maximum dice; you take 1d10 lightning backlash.",
    "zh-CN": "每次长休后可使用 1 次：一个伤害技艺造成最大骰值伤害，你受到 1d10 闪电反噬伤害。"
  },
  "sheetPlay.resourceName.steampunk_overclock": {
    "en": "Overclock",
    "zh-CN": "超频"
  },
  "sheetDialog.resourceHelp.steampunk_overclock": {
    "en": "1/rest, a gadget or machine you hold works at double effect for 1 minute.",
    "zh-CN": "每次短休或长休后可使用 1 次：持有的小装置或机器以双倍效果运转，持续 1 分钟。"
  },
  "sheetPlay.resourceName.steampunk_overpressure_valve": {
    "en": "Overpressure Valve",
    "zh-CN": "超压阀"
  },
  "sheetDialog.resourceHelp.steampunk_overpressure_valve": {
    "en": "1/rest, cast a 1st-level schematic without expending a slot.",
    "zh-CN": "每次短休或长休后可使用 1 次：施放一个一环设计法术，无需消耗法术位。"
  },
  "sheetPlay.resourceName.steampunk_power_the_works": {
    "en": "Power the Works",
    "zh-CN": "驱动机械"
  },
  "sheetDialog.resourceHelp.steampunk_power_the_works": {
    "en": "Your touch runs any machine without fuel for 1 hour, CHA-mod uses per long rest.",
    "zh-CN": "你的触碰可让任意机器在无燃料情况下运转 1 小时，每次长休恢复等于魅力调整值的使用次数。"
  },
  "sheetPlay.resourceName.steampunk_sabotage": {
    "en": "Sabotage",
    "zh-CN": "破坏"
  },
  "sheetDialog.resourceHelp.steampunk_sabotage": {
    "en": "1/rest, a touched machine, trap, or construct malfunctions at the worst moment for its owner (DM adjudicates).",
    "zh-CN": "每次短休或长休后可使用 1 次：触碰的机器、陷阱或构装生物，在对其主人最不利的时刻发生故障，具体由地下城主裁定。"
  },
  "sheetPlay.resourceName.steampunk_steam_vent": {
    "en": "Steam Vent",
    "zh-CN": "蒸汽排放"
  },
  "sheetDialog.resourceHelp.steampunk_steam_vent": {
    "en": "1/rest, adjacent creatures save (CON) or are blinded by scalding mist until your next turn.",
    "zh-CN": "每次短休或长休后可使用 1 次：邻近生物进行体质豁免，失败则被灼热雾气致盲至你的下一回合。"
  },
  "sheetPlay.resourceName.steampunk_steamvent_burst": {
    "en": "Steamvent Burst",
    "zh-CN": "蒸汽爆发"
  },
  "sheetDialog.resourceHelp.steampunk_steamvent_burst": {
    "en": "1/rest, adjacent creatures save (DEX) or take 3d8 fire and are pushed 10 ft when you vent your armor.",
    "zh-CN": "每次短休或长休后可使用 1 次：护甲泄压时，邻近生物进行敏捷豁免，失败则受到 3d8 火焰伤害并被推开 10 英尺。"
  },
  "sheetPlay.resourceName.steampunk_storm_step": {
    "en": "Storm Step",
    "zh-CN": "风暴步伐"
  },
  "sheetDialog.resourceHelp.steampunk_storm_step": {
    "en": "1/rest, turn to crackling energy and move 30 ft through creatures and objects as a bonus action.",
    "zh-CN": "每次短休或长休后可使用 1 次：以附赠动作化为电能，穿过生物和物体移动 30 英尺。"
  },
  "sheetPlay.resourceName.steampunk_sublimation": {
    "en": "Sublimation",
    "zh-CN": "升华"
  },
  "sheetDialog.resourceHelp.steampunk_sublimation": {
    "en": "1/long rest, cast a formula of 3rd level or lower without expending a slot.",
    "zh-CN": "每次长休后可使用 1 次：施放一个三环或更低环阶配方法术，无需消耗法术位。"
  },
  "sheetPlay.resourceName.steampunk_surge_casting": {
    "en": "Surge Casting",
    "zh-CN": "涌动施法"
  },
  "sheetDialog.resourceHelp.steampunk_surge_casting": {
    "en": "2/rest, cast a cantrip as a bonus action after casting a leveled art.",
    "zh-CN": "每次短休或长休后可使用 2 次：施放有环阶的技艺后，以附赠动作施放一个戏法。"
  },
  "sheetPlay.resourceName.steampunk_tempest_shell": {
    "en": "Tempest Shell",
    "zh-CN": "风暴之壳"
  },
  "sheetDialog.resourceHelp.steampunk_tempest_shell": {
    "en": "1/long rest, a whirling storm shield for 1 minute: +2 AC and melee attackers take 2d8 lightning.",
    "zh-CN": "每次长休后可使用 1 次：旋转风暴护盾持续 1 分钟，护甲等级 +2，近战攻击者受到 2d8 闪电伤害。"
  },
  "sheetPlay.resourceName.steampunk_terror_of_the_trade_winds": {
    "en": "Terror of the Trade Winds",
    "zh-CN": "信风之惧"
  },
  "sheetDialog.resourceHelp.steampunk_terror_of_the_trade_winds": {
    "en": "1/long rest, for 1 minute your Daring Maneuver applies to every attack and enemies who see you save (WIS) or are frightened.",
    "zh-CN": "每次长休后可使用 1 次：持续 1 分钟，果敢战技对每次攻击都生效，看见你的敌人进行感知豁免，失败则恐慌。"
  },
  "sheetPlay.resourceName.steampunk_the_great_work": {
    "en": "The Great Work",
    "zh-CN": "伟大炼成"
  },
  "sheetDialog.resourceHelp.steampunk_the_great_work": {
    "en": "1/long rest, cast one formula of 7th level or lower without a slot; its dice are maximized.",
    "zh-CN": "每次长休后可使用 1 次：施放一个七环或更低环阶配方法术，无需法术位，伤害骰取最大值。"
  },
  "sheetPlay.resourceName.steampunk_the_great_work_walks": {
    "en": "The Great Work Walks",
    "zh-CN": "炼成行者"
  },
  "sheetDialog.resourceHelp.steampunk_the_great_work_walks": {
    "en": "1/long rest, your familiars merge into a brass juggernaut for 10 minutes (double HP, 2d10 + INT slam, you may ride it).",
    "zh-CN": "每次长休后可使用 1 次：魔宠融合为黄铜巨像，持续 10 分钟，生命值翻倍，猛击造成 2d10 + 智力调整值的伤害，你可以骑乘。"
  },
  "sheetPlay.resourceName.steampunk_unbreakable_vanguard": {
    "en": "Unbreakable Vanguard",
    "zh-CN": "不破先锋"
  },
  "sheetDialog.resourceHelp.steampunk_unbreakable_vanguard": {
    "en": "1/long rest, for 1 minute you and adjacent allies have resistance to all damage.",
    "zh-CN": "每次长休后可使用 1 次：你和邻近盟友对所有伤害具有抗性，持续 1 分钟。"
  },
  "sheetPlay.resourceName.steampunk_vitriol_ampoule": {
    "en": "Vitriol Ampoule",
    "zh-CN": "酸蚀安瓿"
  },
  "sheetDialog.resourceHelp.steampunk_vitriol_ampoule": {
    "en": "Reaction when hit in melee: the attacker takes 2d6 acid as an ampoule bursts, INT-mod uses per long rest.",
    "zh-CN": "被近战命中时消耗一个反应，安瓿破裂，对攻击者造成 2d6 强酸伤害。每次长休恢复等于智力调整值的使用次数。"
  },
  "sheetPlay.resourceName.racial_faerie_fire": {
    "en": "Faerie Fire",
    "zh-CN": "精灵之火"
  },
  "sheetDialog.resourceHelp.racial_faerie_fire": {
    "en": "Faerie Fire once, cast as a 1st-level spell, and again after a long rest.",
    "zh-CN": "可施放一次一环精灵之火，长休后恢复使用机会。"
  },
  "sheetPlay.resourceName.racial_darkness": {
    "en": "Darkness",
    "zh-CN": "黑暗术"
  },
  "sheetDialog.resourceHelp.racial_darkness": {
    "en": "Darkness once, cast as a 1st-level spell, and again after a long rest.",
    "zh-CN": "可施放一次黑暗术，长休后恢复使用机会；按该法术的实际环阶结算。"
  },
  "sheetPlay.resourceName.racial_hellish_rebuke": {
    "en": "Hellish Rebuke",
    "zh-CN": "炼狱斥责"
  },
  "sheetDialog.resourceHelp.racial_hellish_rebuke": {
    "en": "Hellish Rebuke once, cast as a 2nd-level spell, and again after a long rest.",
    "zh-CN": "可施放一次二环炼狱斥责，长休后恢复使用机会。"
  },
  "sheetPlay.resourceName.holy_nimbus": {
    "en": "Holy Nimbus",
    "zh-CN": "神圣光冕"
  },
  "sheetDialog.resourceHelp.holy_nimbus": {
    "en": "An action: bright light for 30 feet for a minute. Each enemy that starts its turn in it takes 10 radiant damage (the server deals it), and the paladin has advantage on saves against spells cast by fiends or undead.",
    "zh-CN": "消耗一个动作，散发 30 英尺明亮光照，持续 1 分钟。每个在光照内开始回合的敌人受到 10 点光耀伤害，自动结算；圣武士对邪魔或亡灵施放的法术进行豁免时具有优势。"
  },
  "sheetPlay.resourceName.divine_intervention": {
    "en": "Divine Intervention",
    "zh-CN": "神术干预"
  },
  "sheetDialog.resourceHelp.divine_intervention": {
    "en": "An action: the server rolls percentile dice; at or under the cleric's level (always at 20th) the deity intervenes, and the feature is then unusable for 7 days. On a failure it comes back on a long rest.",
    "zh-CN": "消耗一个动作，自动掷百分骰；结果不超过牧师等级时，神祇施予干预，20 级时必定成功。成功后 7 天内无法再次使用；失败则在长休后恢复。"
  }
});
