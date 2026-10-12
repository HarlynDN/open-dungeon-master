import { defineMessages } from "./catalog.ts";

export const BOARD_MOVE_EFFECT_MESSAGES = /*#__PURE__*/ defineMessages({
  "boardEffectsUi.noDamage": {"en": "{name} takes no damage from {source}.", "zh-CN": "{name}未受到{source}的伤害。"},
  "boardEffectsUi.fallDamage": {"en": "{name} takes {amount}{type} damage from {source} and falls.", "zh-CN": "{name}受到{source}的 {amount} 点{type}伤害并倒下。"},
  "boardEffectsUi.formReturn": {"en": "{name}'s {form} form drops to 0 hit points from {source} and its own form returns.", "zh-CN": "{name}的{form}形态因{source}生命值降至 0，恢复原形。"},
  "boardEffectsUi.sourceFall": {"en": "falling {feet} feet into a fissure", "zh-CN": "坠入 {feet} 英尺深的裂缝"},
  "boardEffectsUi.damagePart": {"en": "{amount} {type}", "zh-CN": "{amount} 点{type}伤害"},
  "boardEffectsUi.immune": {"en": "{name} is immune to {type} damage: no damage", "zh-CN": "{name}免疫{type}伤害：不受伤害"},
  "boardEffectsUi.resist": {"en": "{name} is resistant to {type} damage: halved", "zh-CN": "{name}对{type}伤害具有抗性：伤害减半"},
  "boardEffectsUi.vulnerable": {"en": "{name} is vulnerable to {type} damage: doubled", "zh-CN": "{name}对{type}伤害具有易伤：伤害加倍"},
  "boardEffectsUi.both": {"en": "{name} is resistant and vulnerable to {type} damage: halved, then doubled", "zh-CN": "{name}同时对{type}伤害具有抗性和易伤：先减半，再加倍"},
  "boardEffectsUi.resistAll": {"en": "{name} is resistant to all damage: halved", "zh-CN": "{name}对所有伤害具有抗性：伤害减半"},
  "boardEffectsUi.quake.drift": {"en": "{spell} drifts 10 feet away from {name} to ({x},{y}).", "zh-CN": "{spell}远离{name}漂移 10 英尺至坐标（{x}，{y}）。"},
  "boardEffectsUi.quake.ground": {"en": "The ground heaves under {spell}.", "zh-CN": "{spell}使地面剧烈起伏。"},
  "boardEffectsUi.quake.rows": {"en": "A fissure {depth} feet deep opens along rows {first} to {last}.", "zh-CN": "第 {first} 至 {last} 行裂开一条 {depth} 英尺深的裂缝。"},
  "boardEffectsUi.quake.columns": {"en": "A fissure {depth} feet deep opens along columns {first} to {last}.", "zh-CN": "第 {first} 至 {last} 列裂开一条 {depth} 英尺深的裂缝。"},
  "boardEffectsUi.quake.enemyFall": {"en": "{name} falls {depth} feet into the fissure and lands prone.", "zh-CN": "{name}坠入 {depth} 英尺深的裂缝，倒地落在底部。"},
  "boardEffectsUi.quake.pcFall": {"en": "{name} falls {depth} feet into the fissure ({amount} {type}) and lands prone.", "zh-CN": "{name}坠入 {depth} 英尺深的裂缝，受到 {amount} 点{type}伤害并倒地。"},
  "boardEffectsUi.quake.structure": {"en": "A fissure opening under a structure brings it down (narrate it); the board keeps the creatures that fell in where they stand, at the fissure's bottom.", "zh-CN": "建筑物下方出现的裂缝会使其坍塌。坠入裂缝的生物仍显示在原来的格子上，但实际位于裂缝底部。"},
  "boardEffectsUi.quake.edgeIts": {"en": "{name} keeps its footing at the fissure's edge.", "zh-CN": "{name}在裂缝边缘站稳。"},
  "boardEffectsUi.quake.edgeTheir": {"en": "{name} keeps their footing at the fissure's edge.", "zh-CN": "{name}在裂缝边缘站稳。"},
});
