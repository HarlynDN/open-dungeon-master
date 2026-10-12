import { defineMessages } from "./catalog.ts";

// Original summaries from zones-spells.ts; no mechanic values are translated.
export const BOARD_ZONE_MESSAGES = /*#__PURE__*/ defineMessages({
  "boardZone.label": {
    "en": "{spell}: {summary}",
    "zh-CN": "{spell}：{summary}"
  },
  "boardZone.name.frigid_air": {
    "en": "frigid air",
    "zh-CN": "寒冷气流"
  },
  "boardZone.name.burning_web": {
    "en": "burning web",
    "zh-CN": "燃烧的蛛网"
  },
  "boardZone.summary.entangle": {
    "en": "difficult terrain",
    "zh-CN": "困难地形"
  },
  "boardZone.summary.grease": {
    "en": "difficult terrain; entering or ending a turn there: DEX save or prone",
    "zh-CN": "困难地形；进入区域或在其中结束回合时：敏捷豁免，失败则倒地"
  },
  "boardZone.summary.fog_cloud": {
    "en": "heavily obscured (blocks sight)",
    "zh-CN": "重度遮蔽（阻挡视线）"
  },
  "boardZone.summary.darkness": {
    "en": "magical darkness: darkvision cannot see into it or through it",
    "zh-CN": "魔法黑暗：黑暗视觉无法看见其中，也无法看穿它"
  },
  "boardZone.summary.silence": {
    "en": "no sound: no spell with a verbal component is cast inside, creatures inside are deafened and immune to thunder damage",
    "zh-CN": "无声区域：其中无法施放需要言语成分的法术；区域内的生物陷入耳聋状态，并免疫雷鸣伤害"
  },
  "boardZone.summary.spike_growth": {
    "en": "difficult terrain; 2d4 piercing for every 5 feet moved in it",
    "zh-CN": "困难地形；在其中每移动 5 尺，受到 2d4 点穿刺伤害"
  },
  "boardZone.summary.web": {
    "en": "difficult terrain, lightly obscured; entering or starting a turn there: DEX save or restrained",
    "zh-CN": "困难地形、轻度遮蔽；进入区域或在其中开始回合时：敏捷豁免，失败则束缚"
  },
  "boardZone.summary.moonbeam": {
    "en": "entering or starting a turn there: CON save, 2d10 radiant (half on a success)",
    "zh-CN": "进入区域或在其中开始回合时：体质豁免，受到 2d10 点光耀伤害（成功则减半）"
  },
  "boardZone.summary.gust_of_wind": {
    "en": "moving toward the caster costs double; starting a turn there: STR save or pushed 15 feet",
    "zh-CN": "向施法者移动的消耗加倍；在区域内开始回合时：力量豁免，失败则被推开 15 尺"
  },
  "boardZone.summary.sleet_storm": {
    "en": "difficult terrain, heavily obscured; entering or starting a turn there: DEX save or prone, and a concentrating creature saves or loses it",
    "zh-CN": "困难地形、重度遮蔽；进入区域或在其中开始回合时：敏捷豁免，失败则倒地；正在专注的生物还需进行豁免，失败则失去专注"
  },
  "boardZone.summary.stinking_cloud": {
    "en": "heavily obscured; starting a turn there: CON save or spend the action retching",
    "zh-CN": "重度遮蔽；在区域内开始回合时：体质豁免，失败则消耗动作干呕"
  },
  "boardZone.summary.spirit_guardians": {
    "en": "hostile creatures move at half speed; entering it: WIS save, 3d8 radiant (half on a success)",
    "zh-CN": "敌对生物的移动速度减半；进入区域时：感知豁免，受到 3d8 点光耀伤害（成功则减半）"
  },
  "boardZone.summary.daylight": {
    "en": "bright light",
    "zh-CN": "明亮光照"
  },
  "boardZone.summary.plant_growth": {
    "en": "overgrowth: every foot moved costs 4",
    "zh-CN": "茂密植物：每移动 1 尺需消耗 4 尺移动力"
  },
  "boardZone.summary.wind_wall": {
    "en": "arrows, bolts and other ranged weapon attacks through it miss; a Small or smaller flyer or a creature in gaseous form cannot pass it; gases stop at it",
    "zh-CN": "穿过风墙的箭矢、弩矢及其他远程武器攻击均未命中；小型或更小的飞行生物及气体形态的生物无法穿过；气体被风墙阻挡"
  },
  "boardZone.summary.black_tentacles": {
    "en": "difficult terrain; entering or starting a turn there: DEX save or 3d6 bludgeoning and restrained",
    "zh-CN": "困难地形；进入区域或在其中开始回合时：敏捷豁免，失败则受到 3d6 点钝击伤害并陷入束缚状态"
  },
  "boardZone.summary.ice_storm": {
    "en": "hail-strewn ground: difficult terrain until the end of the caster's next turn",
    "zh-CN": "遍布冰雹的地面：成为困难地形，持续至施法者下一回合结束"
  },
  "boardZone.summary.guardian_of_faith": {
    "en": "a hostile creature moving within 10 feet: DEX save, 20 radiant (half on a success); gone after 60 damage",
    "zh-CN": "敌对生物移动至 10 尺内时：敏捷豁免，受到 20 点光耀伤害（成功则减半）；累计造成 60 点伤害后消失"
  },
  "boardZone.summary.wall_of_fire": {
    "en": "opaque; entering it, or ending a turn in it or within 10 feet of its burning side: 5d8 fire",
    "zh-CN": "不透明；进入火墙，或在火墙内及其燃烧侧 10 尺内结束回合时：受到 5d8 点火焰伤害"
  },
  "boardZone.summary.cloudkill": {
    "en": "heavily obscured; entering or starting a turn there: CON save, 5d8 poison (half on a success); drifts 10 feet away from the caster each of the caster's turns",
    "zh-CN": "重度遮蔽；进入区域或在其中开始回合时：体质豁免，受到 5d8 点毒素伤害（成功则减半）；施法者的每个回合，云团向远离施法者的方向漂移 10 尺"
  },
  "boardZone.summary.insect_plague": {
    "en": "difficult terrain, lightly obscured; entering or ending a turn there: CON save, 4d10 piercing (half on a success)",
    "zh-CN": "困难地形、轻度遮蔽；进入区域或在其中结束回合时：体质豁免，受到 4d10 点穿刺伤害（成功则减半）"
  },
  "boardZone.summary.wall_of_stone": {
    "en": "a stone wall: nothing walks or sees through it",
    "zh-CN": "石墙：阻挡通行和视线"
  },
  "boardZone.summary.passwall": {
    "en": "a passage through the wall: its squares are open ground",
    "zh-CN": "穿墙通道：其占据的格子可正常通行"
  },
  "boardZone.summary.globe_of_invulnerability": {
    "en": "a spell of 5th level or lower cast from outside has no effect on anything inside (higher from a higher slot)",
    "zh-CN": "从外部施放的五环或更低环法术对区域内的任何事物均无效（以更高环法术位施放时，可阻挡更高环法术）"
  },
  "boardZone.summary.wall_of_force": {
    "en": "an invisible wall: nothing passes through it, sight does",
    "zh-CN": "隐形力墙：阻挡一切通行，但不阻挡视线"
  },
  "boardZone.summary.wall_of_ice": {
    "en": "a wall of ice: nothing walks or sees through it; each 10-foot section (\"Wall of Ice section 1\" from its first end) has AC 12 and 30 hit points, double damage from fire, and breaks with damage_object, leaving frigid air",
    "zh-CN": "冰墙：阻挡通行和视线；每段 10 尺长的墙体从起始端依次编号，护甲等级为 12、生命值为 30，受到的火焰伤害加倍；墙段被破坏后会留下寒冷气流"
  },
  "boardZone.summary.frigid_air": {
    "en": "a sheet of frigid air where the ice broke: moving through it for the first time on a turn, CON save or 5d6 cold (half on a success)",
    "zh-CN": "冰墙破裂后留下的寒冷气流：每回合首次穿过时，进行体质豁免；失败则受到 5d6 点寒冷伤害（成功则减半）"
  },
  "boardZone.summary.earthquake": {
    "en": "difficult terrain; when cast and at the end of each of the caster's turns every creature on the ground makes a DEX save or falls prone, and a concentrating one a CON save or loses it; fissures open at the start of the caster's next turn",
    "zh-CN": "困难地形；施放时及施法者每回合结束时，地面上的每个生物须进行敏捷豁免，失败则倒地；正在专注的生物还须进行体质豁免，失败则失去专注；施法者下一回合开始时出现裂缝"
  },
  "boardZone.summary.forcecage": {
    "en": "an invisible cage of force: no creature inside walks out and none outside walks in; sight passes the bars",
    "zh-CN": "隐形力场牢笼：内部生物无法走出，外部生物无法走入；视线可穿过栅栏"
  },
  "boardZone.summary.antilife_shell": {
    "en": "a barrier around the caster: a creature other than an undead or a construct cannot pass through it or reach through it with a melee attack",
    "zh-CN": "施法者周围的屏障：除亡灵和构装体外，其他生物无法穿过，也无法用近战攻击穿过屏障触及目标"
  },
  "boardZone.summary.antimagic_field": {
    "en": "no spell can be cast inside it, and a spell cast from outside has no effect on a creature inside; magic items and other spells' effects inside are suppressed (the DM's to narrate)",
    "zh-CN": "区域内无法施法，外部施放的法术对其中的生物无效；区域内的魔法物品及其他法术效果被压制（由 DM 描述）"
  },
  "boardZone.summary.wall_of_thorns": {
    "en": "blocks sight; every foot moved through it costs 4; entering it or ending a turn in it: DEX save, 7d8 slashing (half on a success)",
    "zh-CN": "阻挡视线；每穿行 1 尺需消耗 4 尺移动力；进入区域或在其中结束回合时：敏捷豁免，受到 7d8 点挥砍伤害（成功则减半）"
  },
  "boardZone.summary.blade_barrier": {
    "en": "three-quarters cover behind it, difficult terrain; entering or starting a turn there: DEX save, 6d10 slashing (half on a success)",
    "zh-CN": "位于其后获得四分之三掩护，区域为困难地形；进入区域或在其中开始回合时：敏捷豁免，受到 6d10 点挥砍伤害（成功则减半）"
  },
  "boardZone.summary.burning_web": {
    "en": "burning webs: a creature starting its turn here takes 2d4 fire",
    "zh-CN": "燃烧的蛛网：在此处开始回合的生物受到 2d4 点火焰伤害"
  },
  "boardZone.summary.incendiary_cloud": {
    "en": "heavily obscured; entering or ending a turn there: DEX save, 10d8 fire (half on a success); drifts 10 feet away from the caster each of the caster's turns",
    "zh-CN": "重度遮蔽；进入区域或在其中结束回合时：敏捷豁免，受到 10d8 点火焰伤害（成功则减半）；施法者的每个回合，云团向远离施法者的方向漂移 10 尺"
  }
});
