import { defineMessages } from "./catalog.ts";

// Original source-compared display translations. Canonical names and kit labels
// remain untouched in the rule engine and saved choices.
export const CHARACTER_SPELL_GEAR_NAMES = [
  {
    "type": "school",
    "name": "abjuration",
    "key": "rule.school.abjuration"
  },
  {
    "type": "school",
    "name": "conjuration",
    "key": "rule.school.conjuration"
  },
  {
    "type": "school",
    "name": "divination",
    "key": "rule.school.divination"
  },
  {
    "type": "school",
    "name": "enchantment",
    "key": "rule.school.enchantment"
  },
  {
    "type": "school",
    "name": "evocation",
    "key": "rule.school.evocation"
  },
  {
    "type": "school",
    "name": "illusion",
    "key": "rule.school.illusion"
  },
  {
    "type": "school",
    "name": "necromancy",
    "key": "rule.school.necromancy"
  },
  {
    "type": "school",
    "name": "transmutation",
    "key": "rule.school.transmutation"
  },
  {
    "type": "spellKind",
    "name": "cantrip",
    "key": "rule.spellKind.cantrip"
  },
  {
    "type": "spellKind",
    "name": "attack cantrip",
    "key": "rule.spellKind.attack_cantrip"
  },
  {
    "type": "spellKind",
    "name": "spell",
    "key": "rule.spellKind.spell"
  },
  {
    "type": "spellKind",
    "name": "ritual spell",
    "key": "rule.spellKind.ritual_spell"
  },
  {
    "type": "spellCountKind",
    "name": "spells known",
    "key": "rule.spellCountKind.spells_known"
  },
  {
    "type": "spellCountKind",
    "name": "spells prepared",
    "key": "rule.spellCountKind.spells_prepared"
  },
  {
    "type": "kitOption",
    "name": "a greataxe",
    "key": "rule.kitOption.0"
  },
  {
    "type": "kitOption",
    "name": "any martial melee weapon",
    "key": "rule.kitOption.1"
  },
  {
    "type": "kitOption",
    "name": "two handaxes",
    "key": "rule.kitOption.2"
  },
  {
    "type": "kitOption",
    "name": "any simple weapon",
    "key": "rule.kitOption.3"
  },
  {
    "type": "kitOption",
    "name": "an explorer's pack and four javelins",
    "key": "rule.kitOption.4"
  },
  {
    "type": "kitOption",
    "name": "a rapier",
    "key": "rule.kitOption.5"
  },
  {
    "type": "kitOption",
    "name": "a longsword",
    "key": "rule.kitOption.6"
  },
  {
    "type": "kitOption",
    "name": "a diplomat's pack",
    "key": "rule.kitOption.7"
  },
  {
    "type": "kitOption",
    "name": "an entertainer's pack",
    "key": "rule.kitOption.8"
  },
  {
    "type": "kitOption",
    "name": "a lute",
    "key": "rule.kitOption.9"
  },
  {
    "type": "kitOption",
    "name": "any other musical instrument",
    "key": "rule.kitOption.10"
  },
  {
    "type": "kitOption",
    "name": "leather armor and a dagger",
    "key": "rule.kitOption.11"
  },
  {
    "type": "kitOption",
    "name": "a mace",
    "key": "rule.kitOption.12"
  },
  {
    "type": "kitOption",
    "name": "a warhammer (if proficient)",
    "key": "rule.kitOption.13"
  },
  {
    "type": "kitOption",
    "name": "scale mail",
    "key": "rule.kitOption.14"
  },
  {
    "type": "kitOption",
    "name": "leather armor",
    "key": "rule.kitOption.15"
  },
  {
    "type": "kitOption",
    "name": "chain mail (if proficient)",
    "key": "rule.kitOption.16"
  },
  {
    "type": "kitOption",
    "name": "a light crossbow and 20 bolts",
    "key": "rule.kitOption.17"
  },
  {
    "type": "kitOption",
    "name": "a priest's pack",
    "key": "rule.kitOption.18"
  },
  {
    "type": "kitOption",
    "name": "an explorer's pack",
    "key": "rule.kitOption.19"
  },
  {
    "type": "kitOption",
    "name": "a shield and a holy symbol",
    "key": "rule.kitOption.20"
  },
  {
    "type": "kitOption",
    "name": "a wooden shield",
    "key": "rule.kitOption.21"
  },
  {
    "type": "kitOption",
    "name": "a scimitar",
    "key": "rule.kitOption.22"
  },
  {
    "type": "kitOption",
    "name": "any simple melee weapon",
    "key": "rule.kitOption.23"
  },
  {
    "type": "kitOption",
    "name": "leather armor, an explorer's pack and a druidic focus",
    "key": "rule.kitOption.24"
  },
  {
    "type": "kitOption",
    "name": "chain mail",
    "key": "rule.kitOption.25"
  },
  {
    "type": "kitOption",
    "name": "leather armor, a longbow and 20 arrows",
    "key": "rule.kitOption.26"
  },
  {
    "type": "kitOption",
    "name": "a martial weapon and a shield",
    "key": "rule.kitOption.27"
  },
  {
    "type": "kitOption",
    "name": "two martial weapons",
    "key": "rule.kitOption.28"
  },
  {
    "type": "kitOption",
    "name": "a dungeoneer's pack",
    "key": "rule.kitOption.29"
  },
  {
    "type": "kitOption",
    "name": "a shortsword",
    "key": "rule.kitOption.30"
  },
  {
    "type": "kitOption",
    "name": "10 darts",
    "key": "rule.kitOption.31"
  },
  {
    "type": "kitOption",
    "name": "five javelins",
    "key": "rule.kitOption.32"
  },
  {
    "type": "kitOption",
    "name": "chain mail and a holy symbol",
    "key": "rule.kitOption.33"
  },
  {
    "type": "kitOption",
    "name": "two shortswords",
    "key": "rule.kitOption.34"
  },
  {
    "type": "kitOption",
    "name": "two simple melee weapons",
    "key": "rule.kitOption.35"
  },
  {
    "type": "kitOption",
    "name": "a longbow and a quiver of 20 arrows",
    "key": "rule.kitOption.36"
  },
  {
    "type": "kitOption",
    "name": "a shortbow and a quiver of 20 arrows",
    "key": "rule.kitOption.37"
  },
  {
    "type": "kitOption",
    "name": "a burglar's pack",
    "key": "rule.kitOption.38"
  },
  {
    "type": "kitOption",
    "name": "leather armor, two daggers and thieves' tools",
    "key": "rule.kitOption.39"
  },
  {
    "type": "kitOption",
    "name": "a component pouch",
    "key": "rule.kitOption.40"
  },
  {
    "type": "kitOption",
    "name": "an arcane focus",
    "key": "rule.kitOption.41"
  },
  {
    "type": "kitOption",
    "name": "two daggers",
    "key": "rule.kitOption.42"
  },
  {
    "type": "kitOption",
    "name": "a scholar's pack",
    "key": "rule.kitOption.43"
  },
  {
    "type": "kitOption",
    "name": "leather armor, any simple weapon and two daggers",
    "key": "rule.kitOption.44"
  },
  {
    "type": "kitOption",
    "name": "a quarterstaff",
    "key": "rule.kitOption.45"
  },
  {
    "type": "kitOption",
    "name": "a dagger",
    "key": "rule.kitOption.46"
  },
  {
    "type": "kitOption",
    "name": "a spellbook",
    "key": "rule.kitOption.47"
  },
  {
    "type": "kitOption",
    "name": "any two simple weapons",
    "key": "rule.kitOption.48"
  },
  {
    "type": "kitOption",
    "name": "studded leather armor",
    "key": "rule.kitOption.49"
  },
  {
    "type": "kitOption",
    "name": "thieves' tools and a dungeoneer's pack",
    "key": "rule.kitOption.50"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a pistol with 20 rounds and a hacking rig",
    "key": "rule.kitOption.51"
  },
  {
    "type": "kitOption",
    "name": "a monoblade, a pistol with 20 rounds and an armorweave vest",
    "key": "rule.kitOption.52"
  },
  {
    "type": "kitOption",
    "name": "a pistol with 20 rounds, an armorweave vest and drone controls",
    "key": "rule.kitOption.53"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a pistol with 20 rounds, an armorweave vest and a forgery kit",
    "key": "rule.kitOption.54"
  },
  {
    "type": "kitOption",
    "name": "a machete and two daggers",
    "key": "rule.kitOption.55"
  },
  {
    "type": "kitOption",
    "name": "a pistol with 20 rounds, an armorweave vest and a medic's kit",
    "key": "rule.kitOption.56"
  },
  {
    "type": "kitOption",
    "name": "a longsword, a pistol with 20 rounds, a chain shirt and manacles",
    "key": "rule.kitOption.57"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a pistol with 20 rounds, leather armor and a herbalism kit",
    "key": "rule.kitOption.58"
  },
  {
    "type": "kitOption",
    "name": "a longsword, a shield, a chain shirt and a dagger",
    "key": "rule.kitOption.59"
  },
  {
    "type": "kitOption",
    "name": "a flail and a whip",
    "key": "rule.kitOption.60"
  },
  {
    "type": "kitOption",
    "name": "a dagger, leather armor and a lute",
    "key": "rule.kitOption.61"
  },
  {
    "type": "kitOption",
    "name": "a club, a sawed-off scattergun with 20 rounds, leather armor and a poisoner's kit",
    "key": "rule.kitOption.62"
  },
  {
    "type": "kitOption",
    "name": "a censer mace, two silvered stakes, leather armor and a holy symbol",
    "key": "rule.kitOption.63"
  },
  {
    "type": "kitOption",
    "name": "a dagger, three hurled vials and a component pouch",
    "key": "rule.kitOption.64"
  },
  {
    "type": "kitOption",
    "name": "a machete, a revolver with 20 rounds and leather armor",
    "key": "rule.kitOption.65"
  },
  {
    "type": "kitOption",
    "name": "a longsword, a hunting rifle with 20 rounds and a chain shirt",
    "key": "rule.kitOption.66"
  },
  {
    "type": "kitOption",
    "name": "a revolver with 20 rounds, leather armor and field instruments",
    "key": "rule.kitOption.67"
  },
  {
    "type": "kitOption",
    "name": "two daggers and two hurled vials",
    "key": "rule.kitOption.68"
  },
  {
    "type": "kitOption",
    "name": "a club, a revolver with 20 rounds, leather armor and an investigator's kit",
    "key": "rule.kitOption.69"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a quarterstaff and a medic's kit",
    "key": "rule.kitOption.70"
  },
  {
    "type": "kitOption",
    "name": "a sword cane, a pistol with 20 rounds, leather armor and a disguise kit",
    "key": "rule.kitOption.71"
  },
  {
    "type": "kitOption",
    "name": "a warhammer, a sawed-off scattergun with 20 rounds and studded leather",
    "key": "rule.kitOption.72"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a revolver with 20 rounds and a photographer's kit",
    "key": "rule.kitOption.73"
  },
  {
    "type": "kitOption",
    "name": "a dagger, a silvered stake, leather armor and a seance kit",
    "key": "rule.kitOption.74"
  },
  {
    "type": "kitOption",
    "name": "a crowbar, a hunting rifle with 20 rounds, leather armor and tinker's tools",
    "key": "rule.kitOption.75"
  },
  {
    "type": "kitOption",
    "name": "a battleaxe, a sawed-off scattergun with 20 rounds and hide armor",
    "key": "rule.kitOption.76"
  },
  {
    "type": "kitOption",
    "name": "a spear and a dagger",
    "key": "rule.kitOption.77"
  },
  {
    "type": "kitOption",
    "name": "a shock baton, a pistol with 20 rounds, leather armor and tinker's tools",
    "key": "rule.kitOption.78"
  },
  {
    "type": "kitOption",
    "name": "a mace, hide armor and a herbalism kit",
    "key": "rule.kitOption.79"
  },
  {
    "type": "kitOption",
    "name": "a spear, a shortbow with a quiver of 20 arrows and hide armor",
    "key": "rule.kitOption.80"
  },
  {
    "type": "kitOption",
    "name": "a light hammer, a pistol with 20 rounds, a brass carapace and tinker's tools",
    "key": "rule.kitOption.81"
  },
  {
    "type": "kitOption",
    "name": "a rapier, a pistol with 20 rounds, leather armor and navigator's tools",
    "key": "rule.kitOption.82"
  },
  {
    "type": "kitOption",
    "name": "a dagger, three hurled vials, leather armor and alchemist's supplies",
    "key": "rule.kitOption.83"
  },
  {
    "type": "kitOption",
    "name": "a quarterstaff and a dagger",
    "key": "rule.kitOption.84"
  },
  {
    "type": "kitOption",
    "name": "a warhammer, a shield and chain mail",
    "key": "rule.kitOption.85"
  }
] as const;

export const CHARACTER_SPELL_GEAR_NAME_MESSAGES = /*#__PURE__*/ defineMessages({
  "rule.school.abjuration": {
    "en": "abjuration",
    "zh-CN": "防护"
  },
  "rule.school.conjuration": {
    "en": "conjuration",
    "zh-CN": "咒法"
  },
  "rule.school.divination": {
    "en": "divination",
    "zh-CN": "预言"
  },
  "rule.school.enchantment": {
    "en": "enchantment",
    "zh-CN": "惑控"
  },
  "rule.school.evocation": {
    "en": "evocation",
    "zh-CN": "塑能"
  },
  "rule.school.illusion": {
    "en": "illusion",
    "zh-CN": "幻术"
  },
  "rule.school.necromancy": {
    "en": "necromancy",
    "zh-CN": "死灵"
  },
  "rule.school.transmutation": {
    "en": "transmutation",
    "zh-CN": "变化"
  },
  "rule.spellKind.cantrip": {
    "en": "cantrip",
    "zh-CN": "戏法"
  },
  "rule.spellKind.attack_cantrip": {
    "en": "attack cantrip",
    "zh-CN": "攻击戏法"
  },
  "rule.spellKind.spell": {
    "en": "spell",
    "zh-CN": "法术"
  },
  "rule.spellKind.ritual_spell": {
    "en": "ritual spell",
    "zh-CN": "仪式法术"
  },
  "rule.spellCountKind.spells_known": {
    "en": "spells known",
    "zh-CN": "已知法术"
  },
  "rule.spellCountKind.spells_prepared": {
    "en": "spells prepared",
    "zh-CN": "准备法术（含待长休的法术）"
  },
  "rule.kitOption.0": {
    "en": "a greataxe",
    "zh-CN": "一把巨斧"
  },
  "rule.kitOption.1": {
    "en": "any martial melee weapon",
    "zh-CN": "任意一件军用近战武器"
  },
  "rule.kitOption.2": {
    "en": "two handaxes",
    "zh-CN": "两把手斧"
  },
  "rule.kitOption.3": {
    "en": "any simple weapon",
    "zh-CN": "任意一件简易武器"
  },
  "rule.kitOption.4": {
    "en": "an explorer's pack and four javelins",
    "zh-CN": "一套探索者装备包和四支标枪"
  },
  "rule.kitOption.5": {
    "en": "a rapier",
    "zh-CN": "一把刺剑"
  },
  "rule.kitOption.6": {
    "en": "a longsword",
    "zh-CN": "一把长剑"
  },
  "rule.kitOption.7": {
    "en": "a diplomat's pack",
    "zh-CN": "一套外交官装备包"
  },
  "rule.kitOption.8": {
    "en": "an entertainer's pack",
    "zh-CN": "一套艺人装备包"
  },
  "rule.kitOption.9": {
    "en": "a lute",
    "zh-CN": "一把鲁特琴"
  },
  "rule.kitOption.10": {
    "en": "any other musical instrument",
    "zh-CN": "任意一件其他乐器"
  },
  "rule.kitOption.11": {
    "en": "leather armor and a dagger",
    "zh-CN": "一件皮甲和一把匕首"
  },
  "rule.kitOption.12": {
    "en": "a mace",
    "zh-CN": "一把钉头锤"
  },
  "rule.kitOption.13": {
    "en": "a warhammer (if proficient)",
    "zh-CN": "一把战锤（须熟练）"
  },
  "rule.kitOption.14": {
    "en": "scale mail",
    "zh-CN": "一件鳞甲"
  },
  "rule.kitOption.15": {
    "en": "leather armor",
    "zh-CN": "一件皮甲"
  },
  "rule.kitOption.16": {
    "en": "chain mail (if proficient)",
    "zh-CN": "一件链甲（须熟练）"
  },
  "rule.kitOption.17": {
    "en": "a light crossbow and 20 bolts",
    "zh-CN": "一把轻弩和20支弩矢"
  },
  "rule.kitOption.18": {
    "en": "a priest's pack",
    "zh-CN": "一套祭司装备包"
  },
  "rule.kitOption.19": {
    "en": "an explorer's pack",
    "zh-CN": "一套探索者装备包"
  },
  "rule.kitOption.20": {
    "en": "a shield and a holy symbol",
    "zh-CN": "一面盾牌和一枚圣徽"
  },
  "rule.kitOption.21": {
    "en": "a wooden shield",
    "zh-CN": "一面木盾"
  },
  "rule.kitOption.22": {
    "en": "a scimitar",
    "zh-CN": "一把弯刀"
  },
  "rule.kitOption.23": {
    "en": "any simple melee weapon",
    "zh-CN": "任意一件简易近战武器"
  },
  "rule.kitOption.24": {
    "en": "leather armor, an explorer's pack and a druidic focus",
    "zh-CN": "一件皮甲、一套探索者装备包和一件德鲁伊法器"
  },
  "rule.kitOption.25": {
    "en": "chain mail",
    "zh-CN": "一件链甲"
  },
  "rule.kitOption.26": {
    "en": "leather armor, a longbow and 20 arrows",
    "zh-CN": "一件皮甲、一把长弓和20支箭矢"
  },
  "rule.kitOption.27": {
    "en": "a martial weapon and a shield",
    "zh-CN": "一件军用武器和一面盾牌"
  },
  "rule.kitOption.28": {
    "en": "two martial weapons",
    "zh-CN": "两件军用武器"
  },
  "rule.kitOption.29": {
    "en": "a dungeoneer's pack",
    "zh-CN": "一套地城探险装备包"
  },
  "rule.kitOption.30": {
    "en": "a shortsword",
    "zh-CN": "一把短剑"
  },
  "rule.kitOption.31": {
    "en": "10 darts",
    "zh-CN": "10支飞镖"
  },
  "rule.kitOption.32": {
    "en": "five javelins",
    "zh-CN": "五支标枪"
  },
  "rule.kitOption.33": {
    "en": "chain mail and a holy symbol",
    "zh-CN": "一件链甲和一枚圣徽"
  },
  "rule.kitOption.34": {
    "en": "two shortswords",
    "zh-CN": "两把短剑"
  },
  "rule.kitOption.35": {
    "en": "two simple melee weapons",
    "zh-CN": "两件简易近战武器"
  },
  "rule.kitOption.36": {
    "en": "a longbow and a quiver of 20 arrows",
    "zh-CN": "一把长弓和装有20支箭矢的箭袋"
  },
  "rule.kitOption.37": {
    "en": "a shortbow and a quiver of 20 arrows",
    "zh-CN": "一把短弓和装有20支箭矢的箭袋"
  },
  "rule.kitOption.38": {
    "en": "a burglar's pack",
    "zh-CN": "一套盗贼装备包"
  },
  "rule.kitOption.39": {
    "en": "leather armor, two daggers and thieves' tools",
    "zh-CN": "一件皮甲、两把匕首和一套盗贼工具"
  },
  "rule.kitOption.40": {
    "en": "a component pouch",
    "zh-CN": "一套施法材料包"
  },
  "rule.kitOption.41": {
    "en": "an arcane focus",
    "zh-CN": "一件奥术法器"
  },
  "rule.kitOption.42": {
    "en": "two daggers",
    "zh-CN": "两把匕首"
  },
  "rule.kitOption.43": {
    "en": "a scholar's pack",
    "zh-CN": "一套学者装备包"
  },
  "rule.kitOption.44": {
    "en": "leather armor, any simple weapon and two daggers",
    "zh-CN": "一件皮甲、任意一件简易武器和两把匕首"
  },
  "rule.kitOption.45": {
    "en": "a quarterstaff",
    "zh-CN": "一根长棍"
  },
  "rule.kitOption.46": {
    "en": "a dagger",
    "zh-CN": "一把匕首"
  },
  "rule.kitOption.47": {
    "en": "a spellbook",
    "zh-CN": "一本法术书"
  },
  "rule.kitOption.48": {
    "en": "any two simple weapons",
    "zh-CN": "任意两件简易武器"
  },
  "rule.kitOption.49": {
    "en": "studded leather armor",
    "zh-CN": "一件镶钉皮甲"
  },
  "rule.kitOption.50": {
    "en": "thieves' tools and a dungeoneer's pack",
    "zh-CN": "一套盗贼工具和一套地城探险装备包"
  },
  "rule.kitOption.51": {
    "en": "a dagger, a pistol with 20 rounds and a hacking rig",
    "zh-CN": "一把匕首、一把附带20发弹药的手枪和一套黑客设备"
  },
  "rule.kitOption.52": {
    "en": "a monoblade, a pistol with 20 rounds and an armorweave vest",
    "zh-CN": "一把单分子刀、一把附带20发弹药的手枪和一件织甲背心"
  },
  "rule.kitOption.53": {
    "en": "a pistol with 20 rounds, an armorweave vest and drone controls",
    "zh-CN": "一把附带20发弹药的手枪、一件织甲背心和一套无人机控制器"
  },
  "rule.kitOption.54": {
    "en": "a dagger, a pistol with 20 rounds, an armorweave vest and a forgery kit",
    "zh-CN": "一把匕首、一把附带20发弹药的手枪、一件织甲背心和一套伪造工具"
  },
  "rule.kitOption.55": {
    "en": "a machete and two daggers",
    "zh-CN": "一把砍刀和两把匕首"
  },
  "rule.kitOption.56": {
    "en": "a pistol with 20 rounds, an armorweave vest and a medic's kit",
    "zh-CN": "一把附带20发弹药的手枪、一件织甲背心和一套医疗工具"
  },
  "rule.kitOption.57": {
    "en": "a longsword, a pistol with 20 rounds, a chain shirt and manacles",
    "zh-CN": "一把长剑、一把附带20发弹药的手枪、一件链甲衫和一副镣铐"
  },
  "rule.kitOption.58": {
    "en": "a dagger, a pistol with 20 rounds, leather armor and a herbalism kit",
    "zh-CN": "一把匕首、一把附带20发弹药的手枪、一件皮甲和一套草药工具"
  },
  "rule.kitOption.59": {
    "en": "a longsword, a shield, a chain shirt and a dagger",
    "zh-CN": "一把长剑、一面盾牌、一件链甲衫和一把匕首"
  },
  "rule.kitOption.60": {
    "en": "a flail and a whip",
    "zh-CN": "一把链枷和一条鞭子"
  },
  "rule.kitOption.61": {
    "en": "a dagger, leather armor and a lute",
    "zh-CN": "一把匕首、一件皮甲和一把鲁特琴"
  },
  "rule.kitOption.62": {
    "en": "a club, a sawed-off scattergun with 20 rounds, leather armor and a poisoner's kit",
    "zh-CN": "一根短棒、一把附带20发弹药的短管霰弹枪、一件皮甲和一套制毒工具"
  },
  "rule.kitOption.63": {
    "en": "a censer mace, two silvered stakes, leather armor and a holy symbol",
    "zh-CN": "一把香炉钉头锤、两支镀银木桩、一件皮甲和一枚圣徽"
  },
  "rule.kitOption.64": {
    "en": "a dagger, three hurled vials and a component pouch",
    "zh-CN": "一把匕首、三个投掷药瓶和一套施法材料包"
  },
  "rule.kitOption.65": {
    "en": "a machete, a revolver with 20 rounds and leather armor",
    "zh-CN": "一把砍刀、一把附带20发弹药的左轮手枪和一件皮甲"
  },
  "rule.kitOption.66": {
    "en": "a longsword, a hunting rifle with 20 rounds and a chain shirt",
    "zh-CN": "一把长剑、一把附带20发弹药的猎枪和一件链甲衫"
  },
  "rule.kitOption.67": {
    "en": "a revolver with 20 rounds, leather armor and field instruments",
    "zh-CN": "一把附带20发弹药的左轮手枪、一件皮甲和一套野外仪器"
  },
  "rule.kitOption.68": {
    "en": "two daggers and two hurled vials",
    "zh-CN": "两把匕首和两个投掷药瓶"
  },
  "rule.kitOption.69": {
    "en": "a club, a revolver with 20 rounds, leather armor and an investigator's kit",
    "zh-CN": "一根短棒、一把附带20发弹药的左轮手枪、一件皮甲和一套调查工具"
  },
  "rule.kitOption.70": {
    "en": "a dagger, a quarterstaff and a medic's kit",
    "zh-CN": "一把匕首、一根长棍和一套医疗工具"
  },
  "rule.kitOption.71": {
    "en": "a sword cane, a pistol with 20 rounds, leather armor and a disguise kit",
    "zh-CN": "一根剑杖、一把附带20发弹药的手枪、一件皮甲和一套易容工具"
  },
  "rule.kitOption.72": {
    "en": "a warhammer, a sawed-off scattergun with 20 rounds and studded leather",
    "zh-CN": "一把战锤、一把附带20发弹药的短管霰弹枪和一件镶钉皮甲"
  },
  "rule.kitOption.73": {
    "en": "a dagger, a revolver with 20 rounds and a photographer's kit",
    "zh-CN": "一把匕首、一把附带20发弹药的左轮手枪和一套摄影工具"
  },
  "rule.kitOption.74": {
    "en": "a dagger, a silvered stake, leather armor and a seance kit",
    "zh-CN": "一把匕首、一支镀银木桩、一件皮甲和一套通灵工具"
  },
  "rule.kitOption.75": {
    "en": "a crowbar, a hunting rifle with 20 rounds, leather armor and tinker's tools",
    "zh-CN": "一根撬棍、一把附带20发弹药的猎枪、一件皮甲和一套修补工具"
  },
  "rule.kitOption.76": {
    "en": "a battleaxe, a sawed-off scattergun with 20 rounds and hide armor",
    "zh-CN": "一把战斧、一把附带20发弹药的短管霰弹枪和一件兽皮甲"
  },
  "rule.kitOption.77": {
    "en": "a spear and a dagger",
    "zh-CN": "一支矛和一把匕首"
  },
  "rule.kitOption.78": {
    "en": "a shock baton, a pistol with 20 rounds, leather armor and tinker's tools",
    "zh-CN": "一根电击棍、一把附带20发弹药的手枪、一件皮甲和一套修补工具"
  },
  "rule.kitOption.79": {
    "en": "a mace, hide armor and a herbalism kit",
    "zh-CN": "一把钉头锤、一件兽皮甲和一套草药工具"
  },
  "rule.kitOption.80": {
    "en": "a spear, a shortbow with a quiver of 20 arrows and hide armor",
    "zh-CN": "一支矛、一把附带20支箭矢及箭袋的短弓和一件兽皮甲"
  },
  "rule.kitOption.81": {
    "en": "a light hammer, a pistol with 20 rounds, a brass carapace and tinker's tools",
    "zh-CN": "一把轻锤、一把附带20发弹药的手枪、一件黄铜甲壳和一套修补工具"
  },
  "rule.kitOption.82": {
    "en": "a rapier, a pistol with 20 rounds, leather armor and navigator's tools",
    "zh-CN": "一把刺剑、一把附带20发弹药的手枪、一件皮甲和一套领航工具"
  },
  "rule.kitOption.83": {
    "en": "a dagger, three hurled vials, leather armor and alchemist's supplies",
    "zh-CN": "一把匕首、三个投掷药瓶、一件皮甲和一套炼金工具"
  },
  "rule.kitOption.84": {
    "en": "a quarterstaff and a dagger",
    "zh-CN": "一根长棍和一把匕首"
  },
  "rule.kitOption.85": {
    "en": "a warhammer, a shield and chain mail",
    "zh-CN": "一把战锤、一面盾牌和一件链甲"
  }
});
