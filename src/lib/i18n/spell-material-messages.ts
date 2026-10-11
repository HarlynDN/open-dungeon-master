// Source-compared translations of ODM original starter and manual-cast guidance.
import type { AppLocale } from "./locales.ts";

export const SPELL_SUPPORT_TEXTS = [
  {
    "name": "alter self",
    "english": "The natural weapons (1d6, magic, +1 to attack and damage) and Aquatic Adaptation's swim speed and water breathing are the DM's to apply.",
    "kind": "partial",
    "key": "spellMaterial.support.1"
  },
  {
    "name": "astral projection",
    "english": "The astral forms, the silver cord and the return to the bodies are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.2"
  },
  {
    "name": "awaken",
    "english": "The awakened creature's INT 10, its language and its 30 days charmed are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.3"
  },
  {
    "name": "clone",
    "english": "The vessel, its 120 days to mature and the soul's move into it are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.4"
  },
  {
    "name": "contact other plane",
    "english": "The server rolls the DC 15 INT save and the 6d6 psychic; the five answers and how long the insanity lasts are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.5"
  },
  {
    "name": "control weather",
    "english": "The weather's stages, how they change over time and what they do are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.6"
  },
  {
    "name": "detect thoughts",
    "english": "The WIS save to probe deeper and the INT check to end the probe are the DM's; the server keeps the concentration.",
    "kind": "partial",
    "key": "spellMaterial.support.7"
  },
  {
    "name": "dimension door",
    "english": "Arriving in an occupied space (4d6 force each, and the spell fails) is the DM's; tokens are moved by hand.",
    "kind": "partial",
    "key": "spellMaterial.support.8"
  },
  {
    "name": "dream",
    "english": "The WIS save against a hostile messenger, the 3d6 psychic and the lost rest are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.9"
  },
  {
    "name": "forbiddance",
    "english": "The 5d10 radiant or necrotic to the chosen creature types entering or starting a turn there is the DM's to deal.",
    "kind": "partial",
    "key": "spellMaterial.support.10"
  },
  {
    "name": "geas",
    "english": "The server rolls the WIS save and keeps the charm for its days; the 5d10 psychic for acting against the command, once a day, is the DM's to deal.",
    "kind": "partial",
    "key": "spellMaterial.support.11"
  },
  {
    "name": "glyph of warding",
    "english": "The trigger, the explosive rune's DEX save and 5d8, or the stored spell, are the DM's when the glyph goes off.",
    "kind": "partial",
    "key": "spellMaterial.support.12"
  },
  {
    "name": "hallow",
    "english": "The extra effect (courage, darkness, energy vulnerability and the rest) and the CHA save against it are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.13"
  },
  {
    "name": "light",
    "english": "A hostile creature holding or wearing the object makes a DEX save to avoid it; that save is the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.14"
  },
  {
    "name": "magic circle",
    "english": "The CHA save to cross, the barrier and the disadvantage on attacks are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.15"
  },
  {
    "name": "magic jar",
    "english": "The CHA save to possess, the host's statistics and the soul's return are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.16"
  },
  {
    "name": "meld into stone",
    "english": "Damage to the stone (6d6 bludgeoning when partly destroyed, 50 force and expulsion when destroyed) is the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.17"
  },
  {
    "name": "planar binding",
    "english": "The CHA save and the bound creature's service are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.18"
  },
  {
    "name": "project image",
    "english": "The illusion's movement, the Investigation check to see through it and sensing through it are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.19"
  },
  {
    "name": "scrying",
    "english": "The WIS save, its modifiers for knowledge and connection, and the sensor are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.20"
  },
  {
    "name": "seeming",
    "english": "The CHA save of an unwilling creature and the Investigation check to see through it are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.21"
  },
  {
    "name": "simulacrum",
    "english": "The copy (half the hit points, no slots regained, 100 gp per hit point to repair), its obedience and the one-at-a-time limit are the DM's; it joins as a companion by hand.",
    "kind": "narrated",
    "key": "spellMaterial.support.22"
  },
  {
    "name": "speak with plants",
    "english": "The plants' answers, the terrain they move and their cooperation are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.23"
  },
  {
    "name": "telekinesis",
    "english": "The contested STR check against the caster's ability modifier and the moving of a creature or object are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.24"
  },
  {
    "name": "teleport",
    "english": "The familiarity table's d100, a mishap's 3d10 force and reroll, and an off-target or similar-area arrival are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.25"
  },
  {
    "name": "time stop",
    "english": "The 1d4 + 1 turns in a row, and the spell ending when an action affects another creature, are the DM's.",
    "kind": "narrated",
    "key": "spellMaterial.support.26"
  },
  {
    "name": "wish",
    "english": "Duplicating a spell of 8th level or lower casts that spell; any other effect, and the stress (2d10 necrotic per spell until a long rest, STR 3 for 2d4 days, a 33 percent chance of never casting Wish again), are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.27"
  },
  {
    "name": "zone of truth",
    "english": "The CHA save on entering or starting a turn there, and each creature's awareness of it, are the DM's.",
    "kind": "partial",
    "key": "spellMaterial.support.28"
  }
] as const;
export const SPELL_STARTER_TEXTS = [
  {
    "classId": "bard",
    "english": "You know a small fixed list of spells and cast with Charisma. Pick a mix of one good damage option and several ways to control a scene.",
    "key": "spellMaterial.starter.bard"
  },
  {
    "classId": "cleric",
    "english": "You prepare spells fresh after each long rest from the whole cleric list, so you can adapt daily. Wisdom is your casting ability.",
    "key": "spellMaterial.starter.cleric"
  },
  {
    "classId": "druid",
    "english": "You prepare spells fresh after each long rest from the whole druid list. Wisdom is your casting ability, and you also have Wild Shape.",
    "key": "spellMaterial.starter.druid"
  },
  {
    "classId": "paladin",
    "english": "You prepare a small list from the paladin spells and cast with Charisma. Most of your damage still comes from your weapon and Divine Smite.",
    "key": "spellMaterial.starter.paladin"
  },
  {
    "classId": "ranger",
    "english": "You know a small fixed list and cast with Wisdom. Your spells mostly sharpen your weapon attacks and your travel.",
    "key": "spellMaterial.starter.ranger"
  },
  {
    "classId": "sorcerer",
    "english": "You know a very small fixed list, so pick versatile spells. Charisma is your casting ability, and Metamagic bends what you cast.",
    "key": "spellMaterial.starter.sorcerer"
  },
  {
    "classId": "warlock",
    "english": "You have very few slots but they come back on a short rest and always cast at their highest level. Charisma is your casting ability.",
    "key": "spellMaterial.starter.warlock"
  },
  {
    "classId": "wizard",
    "english": "You have the largest spell list in the game and prepare fresh each day from your spellbook. Intelligence is your casting ability.",
    "key": "spellMaterial.starter.wizard"
  },
  {
    "classId": "artificer",
    "english": "You prepare a small list and cast with Intelligence, using your tools as a focus. Your infusions matter as much as your spells.",
    "key": "spellMaterial.starter.artificer"
  }
] as const;
const en = {
  "spellMaterial.support.1": "The natural weapons (1d6, magic, +1 to attack and damage) and Aquatic Adaptation's swim speed and water breathing are the DM's to apply.",
  "spellMaterial.support.2": "The astral forms, the silver cord and the return to the bodies are the DM's.",
  "spellMaterial.support.3": "The awakened creature's INT 10, its language and its 30 days charmed are the DM's.",
  "spellMaterial.support.4": "The vessel, its 120 days to mature and the soul's move into it are the DM's.",
  "spellMaterial.support.5": "The server rolls the DC 15 INT save and the 6d6 psychic; the five answers and how long the insanity lasts are the DM's.",
  "spellMaterial.support.6": "The weather's stages, how they change over time and what they do are the DM's.",
  "spellMaterial.support.7": "The WIS save to probe deeper and the INT check to end the probe are the DM's; the server keeps the concentration.",
  "spellMaterial.support.8": "Arriving in an occupied space (4d6 force each, and the spell fails) is the DM's; tokens are moved by hand.",
  "spellMaterial.support.9": "The WIS save against a hostile messenger, the 3d6 psychic and the lost rest are the DM's.",
  "spellMaterial.support.10": "The 5d10 radiant or necrotic to the chosen creature types entering or starting a turn there is the DM's to deal.",
  "spellMaterial.support.11": "The server rolls the WIS save and keeps the charm for its days; the 5d10 psychic for acting against the command, once a day, is the DM's to deal.",
  "spellMaterial.support.12": "The trigger, the explosive rune's DEX save and 5d8, or the stored spell, are the DM's when the glyph goes off.",
  "spellMaterial.support.13": "The extra effect (courage, darkness, energy vulnerability and the rest) and the CHA save against it are the DM's.",
  "spellMaterial.support.14": "A hostile creature holding or wearing the object makes a DEX save to avoid it; that save is the DM's.",
  "spellMaterial.support.15": "The CHA save to cross, the barrier and the disadvantage on attacks are the DM's.",
  "spellMaterial.support.16": "The CHA save to possess, the host's statistics and the soul's return are the DM's.",
  "spellMaterial.support.17": "Damage to the stone (6d6 bludgeoning when partly destroyed, 50 force and expulsion when destroyed) is the DM's.",
  "spellMaterial.support.18": "The CHA save and the bound creature's service are the DM's.",
  "spellMaterial.support.19": "The illusion's movement, the Investigation check to see through it and sensing through it are the DM's.",
  "spellMaterial.support.20": "The WIS save, its modifiers for knowledge and connection, and the sensor are the DM's.",
  "spellMaterial.support.21": "The CHA save of an unwilling creature and the Investigation check to see through it are the DM's.",
  "spellMaterial.support.22": "The copy (half the hit points, no slots regained, 100 gp per hit point to repair), its obedience and the one-at-a-time limit are the DM's; it joins as a companion by hand.",
  "spellMaterial.support.23": "The plants' answers, the terrain they move and their cooperation are the DM's.",
  "spellMaterial.support.24": "The contested STR check against the caster's ability modifier and the moving of a creature or object are the DM's.",
  "spellMaterial.support.25": "The familiarity table's d100, a mishap's 3d10 force and reroll, and an off-target or similar-area arrival are the DM's.",
  "spellMaterial.support.26": "The 1d4 + 1 turns in a row, and the spell ending when an action affects another creature, are the DM's.",
  "spellMaterial.support.27": "Duplicating a spell of 8th level or lower casts that spell; any other effect, and the stress (2d10 necrotic per spell until a long rest, STR 3 for 2d4 days, a 33 percent chance of never casting Wish again), are the DM's.",
  "spellMaterial.support.28": "The CHA save on entering or starting a turn there, and each creature's awareness of it, are the DM's.",
  "spellMaterial.starter.bard": "You know a small fixed list of spells and cast with Charisma. Pick a mix of one good damage option and several ways to control a scene.",
  "spellMaterial.starter.cleric": "You prepare spells fresh after each long rest from the whole cleric list, so you can adapt daily. Wisdom is your casting ability.",
  "spellMaterial.starter.druid": "You prepare spells fresh after each long rest from the whole druid list. Wisdom is your casting ability, and you also have Wild Shape.",
  "spellMaterial.starter.paladin": "You prepare a small list from the paladin spells and cast with Charisma. Most of your damage still comes from your weapon and Divine Smite.",
  "spellMaterial.starter.ranger": "You know a small fixed list and cast with Wisdom. Your spells mostly sharpen your weapon attacks and your travel.",
  "spellMaterial.starter.sorcerer": "You know a very small fixed list, so pick versatile spells. Charisma is your casting ability, and Metamagic bends what you cast.",
  "spellMaterial.starter.warlock": "You have very few slots but they come back on a short rest and always cast at their highest level. Charisma is your casting ability.",
  "spellMaterial.starter.wizard": "You have the largest spell list in the game and prepare fresh each day from your spellbook. Intelligence is your casting ability.",
  "spellMaterial.starter.artificer": "You prepare a small list and cast with Intelligence, using your tools as a focus. Your infusions matter as much as your spells."
} as const;

const zhCN: Record<keyof typeof en, string> = {
  "spellMaterial.support.1": "天然武器（1d6、魔法武器、攻击和伤害 +1）以及水生适应的游泳速度与水下呼吸，由 DM 应用。",
  "spellMaterial.support.2": "星界形体、银线以及返回肉体的过程，由 DM 裁定。",
  "spellMaterial.support.3": "启智生物的智力 10、语言以及持续 30 天的魅惑，由 DM 应用。",
  "spellMaterial.support.4": "容器、成熟所需的 120 天以及灵魂转移，由 DM 裁定。",
  "spellMaterial.support.5": "服务器进行 DC 15 的智力豁免并结算 6d6 心灵伤害；五个问题的回答和疯狂的持续时间，由 DM 裁定。",
  "spellMaterial.support.6": "天气阶段、随时间的变化及其效果，由 DM 裁定。",
  "spellMaterial.support.7": "深入探测所需的感知豁免和结束探测所需的智力检定，由 DM 裁定；服务器维护专注。",
  "spellMaterial.support.8": "抵达已被占据的空间时（各受 4d6 力场伤害，法术失败），由 DM 裁定；棋子需手动移动。",
  "spellMaterial.support.9": "对抗敌意信使的感知豁免、3d6 心灵伤害和无法休息的效果，由 DM 裁定。",
  "spellMaterial.support.10": "指定类型的生物进入区域或在区域内开始回合时，5d10 光耀或黯蚀伤害由 DM 结算。",
  "spellMaterial.support.11": "服务器进行感知豁免并维护持续数日的魅惑；违背命令时每日至多一次的 5d10 心灵伤害，由 DM 结算。",
  "spellMaterial.support.12": "刻文触发时，其触发条件、爆炸刻文的敏捷豁免与 5d8 伤害，或储存的法术，由 DM 裁定。",
  "spellMaterial.support.13": "额外效果（勇气、黑暗、能量易伤等）及对抗效果的魅力豁免，由 DM 裁定。",
  "spellMaterial.support.14": "敌对生物持有或穿戴目标物体时，可进行敏捷豁免来避免效果；该豁免由 DM 裁定。",
  "spellMaterial.support.15": "穿越时的魅力豁免、屏障和攻击劣势，由 DM 裁定。",
  "spellMaterial.support.16": "附身时的魅力豁免、宿主数据和灵魂返回，由 DM 裁定。",
  "spellMaterial.support.17": "石头受损时的伤害（部分损毁时 6d6 钝击伤害；完全损毁时 50 力场伤害并被排出），由 DM 裁定。",
  "spellMaterial.support.18": "魅力豁免和受束缚生物的服役，由 DM 裁定。",
  "spellMaterial.support.19": "幻象的移动、识破幻象的调查检定以及借其感知，由 DM 裁定。",
  "spellMaterial.support.20": "感知豁免、熟悉程度和联系带来的调整，以及探知感应器，由 DM 裁定。",
  "spellMaterial.support.21": "非自愿生物的魅力豁免和识破幻象的调查检定，由 DM 裁定。",
  "spellMaterial.support.22": "复制体（生命值减半、不恢复法术位、每恢复一点生命值花费 100 金币）、服从和同时只能有一个的限制，由 DM 裁定；需手动将其加入为伙伴。",
  "spellMaterial.support.23": "植物的回答、它们移动的地形及配合行为，由 DM 裁定。",
  "spellMaterial.support.24": "目标的力量检定与施法者施法属性调整值的对抗，以及生物或物体的移动，由 DM 裁定。",
  "spellMaterial.support.25": "熟悉程度表的 d100、意外事故的 3d10 力场伤害与重掷，以及偏离目标或抵达相似区域，由 DM 裁定。",
  "spellMaterial.support.26": "连续获得的 1d4 + 1 个回合，以及动作影响其他生物时法术结束的规则，由 DM 裁定。",
  "spellMaterial.support.27": "复制 8 环或更低环阶的法术时，直接施放该法术；其他效果及负担（长休前每次施法受 2d10 黯蚀伤害、力量变为 3 持续 2d4 天、33% 概率再也无法施放祈愿术），由 DM 裁定。",
  "spellMaterial.support.28": "进入区域或在区域内开始回合时的魅力豁免，以及每个生物对效果的知晓，由 DM 裁定。",
  "spellMaterial.starter.bard": "你的已知法术数量较少且固定，使用魅力施法。建议选择一种可靠的伤害手段，再搭配几种控制局面的法术。",
  "spellMaterial.starter.cleric": "每次长休后，你可从完整的牧师法术列表重新准备法术，按每天的需求调整。感知是你的施法属性。",
  "spellMaterial.starter.druid": "每次长休后，你可从完整的德鲁伊法术列表重新准备法术。感知是你的施法属性，你还拥有荒野形态。",
  "spellMaterial.starter.paladin": "你从圣武士法术中准备少量法术，使用魅力施法。大部分伤害仍来自武器和神圣斩。",
  "spellMaterial.starter.ranger": "你的已知法术数量较少且固定，使用感知施法。法术主要用于强化武器攻击和旅行能力。",
  "spellMaterial.starter.sorcerer": "你的已知法术数量很少且固定，应优先选择用途灵活的法术。魅力是你的施法属性，超魔法可调整施法效果。",
  "spellMaterial.starter.warlock": "你的法术位很少，但短休后会恢复，并始终以其最高环阶施法。魅力是你的施法属性。",
  "spellMaterial.starter.wizard": "你的法术列表最为广泛，每天可从法术书重新准备法术。智力是你的施法属性。",
  "spellMaterial.starter.artificer": "你准备少量法术，使用智力施法，并以工具作为法器。你的注魔和法术同样重要。"
};

export const SPELL_MATERIAL_MESSAGES: Record<AppLocale, Record<keyof typeof en, string>> = { en, "zh-CN": zhCN };
