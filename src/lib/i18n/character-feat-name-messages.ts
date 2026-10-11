import { defineMessages } from "./catalog.ts";

// Project-authored display labels; canonical mechanism names stay unchanged.
export const CHARACTER_FEAT_NAMES = [
  {
    "type": "feat",
    "name": "Athlete",
    "key": "rule.feat.athlete"
  },
  {
    "type": "feat",
    "name": "Actor",
    "key": "rule.feat.actor"
  },
  {
    "type": "feat",
    "name": "Charger",
    "key": "rule.feat.charger"
  },
  {
    "type": "feat",
    "name": "Crossbow Expert",
    "key": "rule.feat.crossbow_expert"
  },
  {
    "type": "feat",
    "name": "Defensive Duelist",
    "key": "rule.feat.defensive_duelist"
  },
  {
    "type": "feat",
    "name": "Dual Wielder",
    "key": "rule.feat.dual_wielder"
  },
  {
    "type": "feat",
    "name": "Dungeon Delver",
    "key": "rule.feat.dungeon_delver"
  },
  {
    "type": "feat",
    "name": "Durable",
    "key": "rule.feat.durable"
  },
  {
    "type": "feat",
    "name": "Elven Accuracy",
    "key": "rule.feat.elven_accuracy"
  },
  {
    "type": "feat",
    "name": "Elemental Adept",
    "key": "rule.feat.elemental_adept"
  },
  {
    "type": "feat",
    "name": "Great Weapon Master",
    "key": "rule.feat.great_weapon_master"
  },
  {
    "type": "feat",
    "name": "Healer",
    "key": "rule.feat.healer"
  },
  {
    "type": "feat",
    "name": "Heavily Armored",
    "key": "rule.feat.heavily_armored"
  },
  {
    "type": "feat",
    "name": "Heavy Armor Master",
    "key": "rule.feat.heavy_armor_master"
  },
  {
    "type": "feat",
    "name": "Inspiring Leader",
    "key": "rule.feat.inspiring_leader"
  },
  {
    "type": "feat",
    "name": "Keen Mind",
    "key": "rule.feat.keen_mind"
  },
  {
    "type": "feat",
    "name": "Lightly Armored",
    "key": "rule.feat.lightly_armored"
  },
  {
    "type": "feat",
    "name": "Linguist",
    "key": "rule.feat.linguist"
  },
  {
    "type": "feat",
    "name": "Lucky",
    "key": "rule.feat.lucky"
  },
  {
    "type": "feat",
    "name": "Magic Initiate",
    "key": "rule.feat.magic_initiate"
  },
  {
    "type": "feat",
    "name": "Mage Slayer",
    "key": "rule.feat.mage_slayer"
  },
  {
    "type": "feat",
    "name": "Martial Adept",
    "key": "rule.feat.martial_adept"
  },
  {
    "type": "feat",
    "name": "Medium Armor Master",
    "key": "rule.feat.medium_armor_master"
  },
  {
    "type": "feat",
    "name": "Mobile",
    "key": "rule.feat.mobile"
  },
  {
    "type": "feat",
    "name": "Moderately Armored",
    "key": "rule.feat.moderately_armored"
  },
  {
    "type": "feat",
    "name": "Mounted Combatant",
    "key": "rule.feat.mounted_combatant"
  },
  {
    "type": "feat",
    "name": "Observant",
    "key": "rule.feat.observant"
  },
  {
    "type": "feat",
    "name": "Polearm Master",
    "key": "rule.feat.polearm_master"
  },
  {
    "type": "feat",
    "name": "Resilient",
    "key": "rule.feat.resilient"
  },
  {
    "type": "feat",
    "name": "Ritual Caster",
    "key": "rule.feat.ritual_caster"
  },
  {
    "type": "feat",
    "name": "Sentinel",
    "key": "rule.feat.sentinel"
  },
  {
    "type": "feat",
    "name": "Sharpshooter",
    "key": "rule.feat.sharpshooter"
  },
  {
    "type": "feat",
    "name": "Shield Master",
    "key": "rule.feat.shield_master"
  },
  {
    "type": "feat",
    "name": "Skulker",
    "key": "rule.feat.skulker"
  },
  {
    "type": "feat",
    "name": "Spell Sniper",
    "key": "rule.feat.spell_sniper"
  },
  {
    "type": "feat",
    "name": "Tavern Brawler",
    "key": "rule.feat.tavern_brawler"
  },
  {
    "type": "feat",
    "name": "Tough",
    "key": "rule.feat.tough"
  },
  {
    "type": "feat",
    "name": "War Caster",
    "key": "rule.feat.war_caster"
  },
  {
    "type": "feat",
    "name": "Weapon Master",
    "key": "rule.feat.weapon_master"
  },
  {
    "type": "feat",
    "name": "Fey Touched",
    "key": "rule.feat.fey_touched"
  },
  {
    "type": "feat",
    "name": "Shadow Touched",
    "key": "rule.feat.shadow_touched"
  },
  {
    "type": "feat",
    "name": "Telekinetic",
    "key": "rule.feat.telekinetic"
  },
  {
    "type": "feat",
    "name": "Telepathic",
    "key": "rule.feat.telepathic"
  },
  {
    "type": "feat",
    "name": "Eldritch Adept",
    "key": "rule.feat.eldritch_adept"
  },
  {
    "type": "feat",
    "name": "Metamagic Adept",
    "key": "rule.feat.metamagic_adept"
  },
  {
    "type": "feat",
    "name": "Skill Expert",
    "key": "rule.feat.skill_expert"
  },
  {
    "type": "feat",
    "name": "Chef",
    "key": "rule.feat.chef"
  },
  {
    "type": "feat",
    "name": "Crusher",
    "key": "rule.feat.crusher"
  },
  {
    "type": "feat",
    "name": "Piercer",
    "key": "rule.feat.piercer"
  },
  {
    "type": "feat",
    "name": "Slasher",
    "key": "rule.feat.slasher"
  },
  {
    "type": "feat",
    "name": "Poisoner",
    "key": "rule.feat.poisoner"
  },
  {
    "type": "feat",
    "name": "Gunner",
    "key": "rule.feat.gunner"
  },
  {
    "type": "feat",
    "name": "Alert",
    "key": "rule.feat.alert"
  },
  {
    "type": "feat",
    "name": "Skilled",
    "key": "rule.feat.skilled"
  },
  {
    "type": "armorTraining",
    "name": "light",
    "key": "rule.armorTraining.light"
  },
  {
    "type": "armorTraining",
    "name": "medium",
    "key": "rule.armorTraining.medium"
  },
  {
    "type": "armorTraining",
    "name": "heavy",
    "key": "rule.armorTraining.heavy"
  },
  {
    "type": "armorTraining",
    "name": "shields",
    "key": "rule.armorTraining.shields"
  },
  {
    "type": "damage",
    "name": "acid",
    "key": "rule.damage.acid"
  },
  {
    "type": "damage",
    "name": "bludgeoning",
    "key": "rule.damage.bludgeoning"
  },
  {
    "type": "damage",
    "name": "cold",
    "key": "rule.damage.cold"
  },
  {
    "type": "damage",
    "name": "fire",
    "key": "rule.damage.fire"
  },
  {
    "type": "damage",
    "name": "force",
    "key": "rule.damage.force"
  },
  {
    "type": "damage",
    "name": "lightning",
    "key": "rule.damage.lightning"
  },
  {
    "type": "damage",
    "name": "necrotic",
    "key": "rule.damage.necrotic"
  },
  {
    "type": "damage",
    "name": "piercing",
    "key": "rule.damage.piercing"
  },
  {
    "type": "damage",
    "name": "poison",
    "key": "rule.damage.poison"
  },
  {
    "type": "damage",
    "name": "psychic",
    "key": "rule.damage.psychic"
  },
  {
    "type": "damage",
    "name": "radiant",
    "key": "rule.damage.radiant"
  },
  {
    "type": "damage",
    "name": "slashing",
    "key": "rule.damage.slashing"
  },
  {
    "type": "damage",
    "name": "thunder",
    "key": "rule.damage.thunder"
  },
  {
    "type": "featureSource",
    "name": "story",
    "key": "rule.featureSource.story"
  },
  {
    "type": "featureSource",
    "name": "feat",
    "key": "rule.featureSource.feat"
  },
  {
    "type": "tool",
    "name": "poisoner's kit",
    "key": "rule.tool.poisoners_kit"
  }
] as const;

export const CHARACTER_FEAT_NAME_MESSAGES = /*#__PURE__*/ defineMessages({
  "rule.feat.athlete": {
    "en": "Athlete",
    "zh-CN": "运动健将"
  },
  "rule.feat.actor": {
    "en": "Actor",
    "zh-CN": "表演达人"
  },
  "rule.feat.charger": {
    "en": "Charger",
    "zh-CN": "冲锋者"
  },
  "rule.feat.crossbow_expert": {
    "en": "Crossbow Expert",
    "zh-CN": "弩械专家"
  },
  "rule.feat.defensive_duelist": {
    "en": "Defensive Duelist",
    "zh-CN": "防御剑客"
  },
  "rule.feat.dual_wielder": {
    "en": "Dual Wielder",
    "zh-CN": "双持者"
  },
  "rule.feat.dungeon_delver": {
    "en": "Dungeon Delver",
    "zh-CN": "地城探险者"
  },
  "rule.feat.durable": {
    "en": "Durable",
    "zh-CN": "坚韧体魄"
  },
  "rule.feat.elven_accuracy": {
    "en": "Elven Accuracy",
    "zh-CN": "精灵精准"
  },
  "rule.feat.elemental_adept": {
    "en": "Elemental Adept",
    "zh-CN": "元素专精"
  },
  "rule.feat.great_weapon_master": {
    "en": "Great Weapon Master",
    "zh-CN": "重型武器大师"
  },
  "rule.feat.healer": {
    "en": "Healer",
    "zh-CN": "医护能手"
  },
  "rule.feat.heavily_armored": {
    "en": "Heavily Armored",
    "zh-CN": "重甲训练"
  },
  "rule.feat.heavy_armor_master": {
    "en": "Heavy Armor Master",
    "zh-CN": "重甲大师"
  },
  "rule.feat.inspiring_leader": {
    "en": "Inspiring Leader",
    "zh-CN": "鼓舞领袖"
  },
  "rule.feat.keen_mind": {
    "en": "Keen Mind",
    "zh-CN": "敏锐头脑"
  },
  "rule.feat.lightly_armored": {
    "en": "Lightly Armored",
    "zh-CN": "轻甲训练"
  },
  "rule.feat.linguist": {
    "en": "Linguist",
    "zh-CN": "语言学家"
  },
  "rule.feat.lucky": {
    "en": "Lucky",
    "zh-CN": "幸运"
  },
  "rule.feat.magic_initiate": {
    "en": "Magic Initiate",
    "zh-CN": "初学施法者"
  },
  "rule.feat.mage_slayer": {
    "en": "Mage Slayer",
    "zh-CN": "法师杀手"
  },
  "rule.feat.martial_adept": {
    "en": "Martial Adept",
    "zh-CN": "战技入门"
  },
  "rule.feat.medium_armor_master": {
    "en": "Medium Armor Master",
    "zh-CN": "中甲大师"
  },
  "rule.feat.mobile": {
    "en": "Mobile",
    "zh-CN": "灵活移动"
  },
  "rule.feat.moderately_armored": {
    "en": "Moderately Armored",
    "zh-CN": "中甲训练"
  },
  "rule.feat.mounted_combatant": {
    "en": "Mounted Combatant",
    "zh-CN": "骑战专家"
  },
  "rule.feat.observant": {
    "en": "Observant",
    "zh-CN": "敏锐观察"
  },
  "rule.feat.polearm_master": {
    "en": "Polearm Master",
    "zh-CN": "长柄武器大师"
  },
  "rule.feat.resilient": {
    "en": "Resilient",
    "zh-CN": "顽强"
  },
  "rule.feat.ritual_caster": {
    "en": "Ritual Caster",
    "zh-CN": "仪式施法者"
  },
  "rule.feat.sentinel": {
    "en": "Sentinel",
    "zh-CN": "哨卫"
  },
  "rule.feat.sharpshooter": {
    "en": "Sharpshooter",
    "zh-CN": "神射手"
  },
  "rule.feat.shield_master": {
    "en": "Shield Master",
    "zh-CN": "盾牌大师"
  },
  "rule.feat.skulker": {
    "en": "Skulker",
    "zh-CN": "潜伏者"
  },
  "rule.feat.spell_sniper": {
    "en": "Spell Sniper",
    "zh-CN": "法术狙击手"
  },
  "rule.feat.tavern_brawler": {
    "en": "Tavern Brawler",
    "zh-CN": "酒馆斗士"
  },
  "rule.feat.tough": {
    "en": "Tough",
    "zh-CN": "强健"
  },
  "rule.feat.war_caster": {
    "en": "War Caster",
    "zh-CN": "战场施法者"
  },
  "rule.feat.weapon_master": {
    "en": "Weapon Master",
    "zh-CN": "武器大师"
  },
  "rule.feat.fey_touched": {
    "en": "Fey Touched",
    "zh-CN": "妖精触碰"
  },
  "rule.feat.shadow_touched": {
    "en": "Shadow Touched",
    "zh-CN": "暗影触碰"
  },
  "rule.feat.telekinetic": {
    "en": "Telekinetic",
    "zh-CN": "念动力"
  },
  "rule.feat.telepathic": {
    "en": "Telepathic",
    "zh-CN": "心灵传讯"
  },
  "rule.feat.eldritch_adept": {
    "en": "Eldritch Adept",
    "zh-CN": "魔能入门"
  },
  "rule.feat.metamagic_adept": {
    "en": "Metamagic Adept",
    "zh-CN": "超魔入门"
  },
  "rule.feat.skill_expert": {
    "en": "Skill Expert",
    "zh-CN": "技能专家"
  },
  "rule.feat.chef": {
    "en": "Chef",
    "zh-CN": "厨艺大师"
  },
  "rule.feat.crusher": {
    "en": "Crusher",
    "zh-CN": "粉碎者"
  },
  "rule.feat.piercer": {
    "en": "Piercer",
    "zh-CN": "穿刺者"
  },
  "rule.feat.slasher": {
    "en": "Slasher",
    "zh-CN": "劈砍者"
  },
  "rule.feat.poisoner": {
    "en": "Poisoner",
    "zh-CN": "制毒者"
  },
  "rule.feat.gunner": {
    "en": "Gunner",
    "zh-CN": "火器专家"
  },
  "rule.feat.alert": {
    "en": "Alert",
    "zh-CN": "警觉"
  },
  "rule.feat.skilled": {
    "en": "Skilled",
    "zh-CN": "多才多艺"
  },
  "rule.armorTraining.light": {
    "en": "light armor",
    "zh-CN": "轻甲"
  },
  "rule.armorTraining.medium": {
    "en": "medium armor",
    "zh-CN": "中甲"
  },
  "rule.armorTraining.heavy": {
    "en": "heavy armor",
    "zh-CN": "重甲"
  },
  "rule.armorTraining.shields": {
    "en": "shields",
    "zh-CN": "盾牌"
  },
  "rule.damage.acid": {
    "en": "acid",
    "zh-CN": "强酸"
  },
  "rule.damage.bludgeoning": {
    "en": "bludgeoning",
    "zh-CN": "钝击"
  },
  "rule.damage.cold": {
    "en": "cold",
    "zh-CN": "寒冷"
  },
  "rule.damage.fire": {
    "en": "fire",
    "zh-CN": "火焰"
  },
  "rule.damage.force": {
    "en": "force",
    "zh-CN": "力场"
  },
  "rule.damage.lightning": {
    "en": "lightning",
    "zh-CN": "闪电"
  },
  "rule.damage.necrotic": {
    "en": "necrotic",
    "zh-CN": "黯蚀"
  },
  "rule.damage.piercing": {
    "en": "piercing",
    "zh-CN": "穿刺"
  },
  "rule.damage.poison": {
    "en": "poison",
    "zh-CN": "毒素"
  },
  "rule.damage.psychic": {
    "en": "psychic",
    "zh-CN": "心灵"
  },
  "rule.damage.radiant": {
    "en": "radiant",
    "zh-CN": "光耀"
  },
  "rule.damage.slashing": {
    "en": "slashing",
    "zh-CN": "挥砍"
  },
  "rule.damage.thunder": {
    "en": "thunder",
    "zh-CN": "雷鸣"
  },
  "rule.featureSource.story": {
    "en": "story",
    "zh-CN": "故事"
  },
  "rule.featureSource.feat": {
    "en": "feat",
    "zh-CN": "专长"
  },
  "rule.tool.poisoners_kit": {
    "en": "poisoner's kit",
    "zh-CN": "制毒工具"
  }
});
