import type { AppLocale } from "./locales.ts";

// Model-facing correction instructions. The interpolated diagnostics are
// English engine facts; player narration must still follow the locale.
export const GUARD_MESSAGES: Record<AppLocale, { correction: string; encounter: string; unrolled: string }> = {
  en: {
    correction: `[System] Your narration contradicts what the dice and tools actually resolved this turn. The tool results are the truth; the prose is what is wrong.
{lines}
Rewrite the whole narration so it matches the real results exactly. Keep everything else: the same scene, the same length, the same voice, the same closing beat. Change only what contradicts the results. Do not call any tool, do not mention this correction, and reply with the corrected narration only.`,
    encounter: "[System] Your narration announced a fight starting, but you never called start_encounter, so no encounter exists: no enemies, no initiative, no hit points. Combat runs only on server-tracked enemies. Call start_encounter now with the enemies you announced, then narrate the fight breaking out from the tool results. Do not restate enemy counts, CR, or stat-block details in prose; the encounter panel shows the table those.",
    unrolled: `[System] Your narration states a damage or healing figure that no tool rolled this turn ("{clause}"), so it has not happened: no hit points changed, and the sheets the table reads do not show it. If that blow belongs in the story, resolve it now with its tool and narrate from the result: start_encounter first when no fight is running, then the attack or spell tool on the turn of whoever acts; apply_hazard or apply_damage for a trap, a fall or anything outside a fight. Otherwise write the moment again without it. Never state a hit, a miss or a figure the server did not return.`,
  },
  "zh-CN": {
    correction: `[System] 你的叙事与本回合骰子和工具实际判定的结果矛盾。工具结果是真实依据，请修正叙事。
{lines}
请用简体中文重写完整叙事，使其与实际结果一致。保留场景、篇幅、风格和结尾，只修改矛盾的内容。不要调用任何工具，不要重复执行动作，不要提及此次纠正，仅回复修正后的叙事。`,
    encounter: "[System] 你在叙事中宣布战斗开始，却没有调用 start_encounter，因此服务器上并不存在这场遭遇。请先用 start_encounter 创建你宣布的敌人，再根据工具结果用简体中文叙述战斗。不要在叙事中重复敌人数目、CR 或属性数据，这些由遭遇面板展示。",
    unrolled: "[System] 你的叙事给出了本回合工具没有掷出的伤害或治疗数值（{clause}），因此这件事并未发生，生命值也没有改变。如果这是应当发生的行动，请先用工具判定，再用简体中文根据结果叙述。战斗尚未开始时先调用 start_encounter，再使用攻击或法术工具；陷阱、坠落等战斗外伤害使用 apply_hazard 或 apply_damage。否则请删去该数值重写。不要捏造命中、未命中或数值。",
  },
};
