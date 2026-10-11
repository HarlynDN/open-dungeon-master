import { defineMessages } from "./catalog.ts";

// Technique names from AUTHORED_TABLE spends/reactions/bonus routes.
// Existing condition/choice labels are reused by handTermLabel; these are
// the remaining native names. Canonical feature/spend identifiers stay English.
export const HAND_FEATURE_MESSAGES = defineMessages({
  "handMaterial.term.maneuver.ambush": { "en": "Ambush", "zh-CN": "伏击" },
  "handMaterial.term.maneuver.baitSwitch": { "en": "Bait and Switch", "zh-CN": "诱敌换位" },
  "handMaterial.term.maneuver.brace": { "en": "Brace", "zh-CN": "迎击" },
  "handMaterial.term.maneuver.commanderStrike": { "en": "Commander's Strike", "zh-CN": "指挥官之击" },
  "handMaterial.term.maneuver.commandingPresence": { "en": "Commanding Presence", "zh-CN": "指挥气势" },
  "handMaterial.term.maneuver.distractingStrike": { "en": "Distracting Strike", "zh-CN": "分心打击" },
  "handMaterial.term.maneuver.evasiveFootwork": { "en": "Evasive Footwork", "zh-CN": "闪避步法" },
  "handMaterial.term.maneuver.feintingAttack": { "en": "Feinting Attack", "zh-CN": "佯攻" },
  "handMaterial.term.maneuver.grapplingStrike": { "en": "Grappling Strike", "zh-CN": "擒抱打击" },
  "handMaterial.term.maneuver.lungingAttack": { "en": "Lunging Attack", "zh-CN": "突刺攻击" },
  "handMaterial.term.maneuver.maneuveringAttack": { "en": "Maneuvering Attack", "zh-CN": "策应攻击" },
  "handMaterial.term.maneuver.parry": { "en": "Parry", "zh-CN": "招架" },
  "handMaterial.term.maneuver.precisionAttack": { "en": "Precision Attack", "zh-CN": "精准攻击" },
  "handMaterial.term.maneuver.quickToss": { "en": "Quick Toss", "zh-CN": "迅捷投掷" },
  "handMaterial.term.maneuver.rally": { "en": "Rally", "zh-CN": "振奋" },
  "handMaterial.term.maneuver.riposte": { "en": "Riposte", "zh-CN": "还击" },
  "handMaterial.term.maneuver.sweepingAttack": { "en": "Sweeping Attack", "zh-CN": "横扫攻击" },
  "handMaterial.term.maneuver.tacticalAssessment": { "en": "Tactical Assessment", "zh-CN": "战术评估" },
  "handMaterial.term.feature.spirit_shield": {
    "en": "Spirit Shield",
    "zh-CN": "灵体护盾"
  },
  "handMaterial.term.feature.raging_storm": {
    "en": "Raging Storm",
    "zh-CN": "狂怒风暴"
  },
  "handMaterial.term.feature.fanatical_focus": {
    "en": "Fanatical Focus",
    "zh-CN": "狂热专注"
  },
  "handMaterial.term.feature.mighty_impel": {
    "en": "Mighty Impel",
    "zh-CN": "强力投掷"
  },
  "handMaterial.term.feature.elemental_fury": {
    "en": "Elemental Fury",
    "zh-CN": "元素狂怒"
  },
  "handMaterial.term.feature.combat_inspiration": {
    "en": "Combat Inspiration",
    "zh-CN": "战斗激励"
  },
  "handMaterial.term.feature.battle_magic": {
    "en": "Battle Magic",
    "zh-CN": "战斗魔法"
  },
  "handMaterial.term.feature.mantle_of_inspiration": {
    "en": "Mantle of Inspiration",
    "zh-CN": "激励披风"
  },
  "handMaterial.term.feature.blade_flourish": {
    "en": "Blade Flourish",
    "zh-CN": "剑刃华舞"
  },
  "handMaterial.term.feature.psychic_blades": {
    "en": "Psychic Blades",
    "zh-CN": "心灵之刃"
  },
  "handMaterial.term.feature.unsettling_words": {
    "en": "Unsettling Words",
    "zh-CN": "扰心言辞"
  },
  "handMaterial.term.feature.dampen_elements": {
    "en": "Dampen Elements",
    "zh-CN": "削弱元素"
  },
  "handMaterial.term.feature.blessing_of_the_forge": {
    "en": "Blessing of the Forge",
    "zh-CN": "锻造祝福"
  },
  "handMaterial.term.feature.voice_of_authority": {
    "en": "Voice of Authority",
    "zh-CN": "权威之声"
  },
  "handMaterial.term.feature.protective_bond": {
    "en": "Protective Bond",
    "zh-CN": "守护纽带"
  },
  "handMaterial.term.feature.halo_of_spores": {
    "en": "Halo of Spores",
    "zh-CN": "孢子光环"
  },
  "handMaterial.term.feature.summon_wildfire_spirit": {
    "en": "Summon Wildfire Spirit",
    "zh-CN": "召唤野火精魂"
  },
  "handMaterial.term.feature.war_magic": {
    "en": "War Magic",
    "zh-CN": "战争魔法"
  },
  "handMaterial.term.feature.curving_shot": {
    "en": "Curving Shot",
    "zh-CN": "曲射"
  },
  "handMaterial.term.feature.hold_the_line": {
    "en": "Hold the Line",
    "zh-CN": "坚守防线"
  },
  "handMaterial.term.feature.protective_field": {
    "en": "Protective Field",
    "zh-CN": "防护力场"
  },
  "handMaterial.term.feature.telekinetic_adept": {
    "en": "Telekinetic Adept",
    "zh-CN": "念动能手"
  },
  "handMaterial.term.feature.great_stature": {
    "en": "Great Stature",
    "zh-CN": "巨大身躯"
  },
  "handMaterial.term.feature.runic_juggernaut": {
    "en": "Runic Juggernaut",
    "zh-CN": "符文巨人"
  },
  "handMaterial.term.feature.inspiring_surge": {
    "en": "Inspiring Surge",
    "zh-CN": "鼓舞激增"
  },
  "handMaterial.term.feature.opportunist": {
    "en": "Opportunist",
    "zh-CN": "伺机者"
  },
  "handMaterial.term.feature.tipsy_sway": {
    "en": "Tipsy Sway",
    "zh-CN": "醉步摇摆"
  },
  "handMaterial.term.feature.drunkard_s_luck": {
    "en": "Drunkard's Luck",
    "zh-CN": "醉者之运"
  },
  "handMaterial.term.feature.path_of_the_kensei": {
    "en": "Path of the Kensei",
    "zh-CN": "剑圣之道"
  },
  "handMaterial.term.feature.sharpen_the_blade": {
    "en": "Sharpen the Blade",
    "zh-CN": "磨砺锋刃"
  },
  "handMaterial.term.feature.searing_arc_strike": {
    "en": "Searing Arc Strike",
    "zh-CN": "灼热弧击"
  },
  "handMaterial.term.feature.searing_sunburst": {
    "en": "Searing Sunburst",
    "zh-CN": "灼热日爆"
  },
  "handMaterial.term.feature.touch_of_the_long_death": {
    "en": "Touch of the Long Death",
    "zh-CN": "长死之触"
  },
  "handMaterial.term.feature.body_of_the_astral_self": {
    "en": "Body of the Astral Self",
    "zh-CN": "星界之躯"
  },
  "handMaterial.term.feature.ascendant_aspect": {
    "en": "Ascendant Aspect",
    "zh-CN": "升华之相"
  },
  "handMaterial.term.feature.relentless_avenger": {
    "en": "Relentless Avenger",
    "zh-CN": "无情复仇者"
  },
  "handMaterial.term.feature.soul_of_vengeance": {
    "en": "Soul of Vengeance",
    "zh-CN": "复仇之魂"
  },
  "handMaterial.term.feature.aura_of_the_guardian": {
    "en": "Aura of the Guardian",
    "zh-CN": "守护者灵光"
  },
  "handMaterial.term.feature.vigilant_rebuke": {
    "en": "Vigilant Rebuke",
    "zh-CN": "警戒反斥"
  },
  "handMaterial.term.feature.divine_allegiance": {
    "en": "Divine Allegiance",
    "zh-CN": "神圣效忠"
  },
  "handMaterial.term.feature.shadowy_dodge": {
    "en": "Shadowy Dodge",
    "zh-CN": "幽影闪避"
  },
  "handMaterial.term.feature.spectral_defense": {
    "en": "Spectral Defense",
    "zh-CN": "幽灵防御"
  },
  "handMaterial.term.feature.slayer_s_counter": {
    "en": "Slayer's Counter",
    "zh-CN": "屠戮者反击"
  },
  "handMaterial.term.feature.gathered_swarm": {
    "en": "Gathered Swarm",
    "zh-CN": "集群虫群"
  },
  "handMaterial.term.feature.versatile_trickster": {
    "en": "Versatile Trickster",
    "zh-CN": "百变诡术师"
  },
  "handMaterial.term.feature.master_of_tactics": {
    "en": "Master of Tactics",
    "zh-CN": "战术大师"
  },
  "handMaterial.term.feature.misdirection": {
    "en": "Misdirection",
    "zh-CN": "误导"
  },
  "handMaterial.term.feature.eye_for_detail": {
    "en": "Eye for Detail",
    "zh-CN": "细节洞察"
  },
  "handMaterial.term.feature.skirmisher": {
    "en": "Skirmisher",
    "zh-CN": "游击手"
  },
  "handMaterial.term.feature.sudden_strike": {
    "en": "Sudden Strike",
    "zh-CN": "突袭"
  },
  "handMaterial.term.feature.tokens_of_the_departed": {
    "en": "Tokens of the Departed",
    "zh-CN": "亡者信物"
  },
  "handMaterial.term.feature.bend_luck": {
    "en": "Bend Luck",
    "zh-CN": "扭转运气"
  },
  "handMaterial.term.feature.shadow_walk": {
    "en": "Shadow Walk",
    "zh-CN": "暗影行走"
  },
  "handMaterial.term.feature.tempestuous_magic": {
    "en": "Tempestuous Magic",
    "zh-CN": "暴风魔法"
  },
  "handMaterial.term.feature.storm_s_fury": {
    "en": "Storm's Fury",
    "zh-CN": "风暴之怒"
  },
  "handMaterial.term.feature.beguiling_defenses": {
    "en": "Beguiling Defenses",
    "zh-CN": "惑心防御"
  },
  "handMaterial.term.feature.guardian_coil": {
    "en": "Guardian Coil",
    "zh-CN": "守护盘绕"
  },
  "handMaterial.term.feature.elemental_flight": {
    "en": "Elemental Flight",
    "zh-CN": "元素飞行"
  },
  "handMaterial.term.feature.projected_ward": {
    "en": "Projected Ward",
    "zh-CN": "投射防护"
  },
  "handMaterial.term.feature.arcane_deflection": {
    "en": "Arcane Deflection",
    "zh-CN": "奥术偏斜"
  },
  "handMaterial.term.feature.song_of_defense": {
    "en": "Song of Defense",
    "zh-CN": "防御之歌"
  },
  "handMaterial.term.feature.convergent_future": {
    "en": "Convergent Future",
    "zh-CN": "收束未来"
  },
  "handMaterial.term.feature.adjust_density": {
    "en": "Adjust Density",
    "zh-CN": "调节密度"
  },
  "handMaterial.term.feature.explosive_cannon": {
    "en": "Explosive Cannon",
    "zh-CN": "爆炸炮台"
  },
  "handMaterial.term.feature.steel_defender": {
    "en": "Steel Defender",
    "zh-CN": "钢铁守卫"
  }
});
