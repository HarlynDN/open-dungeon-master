import { CAMPAIGN_DIFFICULTY_HINTS } from "../campaign-types.ts";
import { CAMPAIGN_LENGTH_LABELS, DM_MODE_HINTS, DM_MODE_LABELS, HP_METHOD_LABELS, STARTING_WEALTH_LABELS } from "../schemas/game-settings-options.ts";
import { defineMessages } from "./catalog.ts";

// UI copy only. The stored option values and English model briefings stay
// canonical; creation, review and lobby settings share these message keys.
export const SETTINGS_MESSAGES = /*#__PURE__*/ defineMessages({
  "setting.dmMode.ai.label": { en: DM_MODE_LABELS.ai, "zh-CN": "AI 地下城主" },
  "setting.dmMode.steered.label": { en: DM_MODE_LABELS.steered, "zh-CN": "AI 叙事，我来引导" },
  "setting.dmMode.human.label": { en: DM_MODE_LABELS.human, "zh-CN": "我来主持游戏" },
  "setting.dmMode.assisted.label": { en: DM_MODE_LABELS.assisted, "zh-CN": "我来主持，AI 协助" },
  "setting.dmMode.ai.hint": { en: DM_MODE_HINTS.ai, "zh-CN": "AI 负责叙事、裁定和运行世界，队长负责引导。" },
  "setting.dmMode.steered.hint": { en: DM_MODE_HINTS.steered, "zh-CN": "AI 叙述每个回合。你在幕后查看剧情与控制台，拥有最终裁定权，不扮演角色。" },
  "setting.dmMode.human.hint": { en: DM_MODE_HINTS.human, "zh-CN": "你负责叙事，服务器仍执行所有规则并投掷骰子。" },
  "setting.dmMode.assisted.hint": { en: DM_MODE_HINTS.assisted, "zh-CN": "你掌控故事，可让 AI 处理怪物、润色叙事或接手一段回合。" },
  "setting.difficulty.easy.hint": { en: CAMPAIGN_DIFFICULTY_HINTS.easy, "zh-CN": "战斗较轻松，故事对失误更宽容，适合初次游玩。" },
  "setting.difficulty.normal.hint": { en: CAMPAIGN_DIFFICULTY_HINTS.normal, "zh-CN": "按规则书设计遭遇。队伍若大意，仍可能失去成员。" },
  "setting.difficulty.hard.hint": { en: CAMPAIGN_DIFFICULTY_HINTS.hard, "zh-CN": "战斗更艰难，补救机会更少，资源确实可能耗尽。" },
  "setting.difficulty.deadly.hint": { en: CAMPAIGN_DIFFICULTY_HINTS.deadly, "zh-CN": "以可能失去角色为前提。提前规划撤退，并准备备用角色。" },
  "setting.hpMethod.average": { en: HP_METHOD_LABELS.average, "zh-CN": "每级固定值（平均值向上取整）" },
  "setting.hpMethod.rolled": { en: HP_METHOD_LABELS.rolled, "zh-CN": "每级投骰（由服务器投生命骰）" },
  "setting.hpMethod.max": { en: HP_METHOD_LABELS.max, "zh-CN": "每级取最大值" },
  "setting.startingWealth.equipment": { en: STARTING_WEALTH_LABELS.equipment, "zh-CN": "职业与背景装备，加上背景提供的钱币" },
  "setting.startingWealth.rolled": { en: STARTING_WEALTH_LABELS.rolled, "zh-CN": "按职业投骰决定财富，用于购买装备" },
  "setting.campaignLength.short": { en: CAMPAIGN_LENGTH_LABELS.short, "zh-CN": "短篇（3 幕，围绕一个冒险）" },
  "setting.campaignLength.standard": { en: CAMPAIGN_LENGTH_LABELS.standard, "zh-CN": "标准（4–5 幕）" },
  "setting.campaignLength.epic": { en: CAMPAIGN_LENGTH_LABELS.epic, "zh-CN": "史诗（6–8 幕，规模宏大的长篇）" },
});
