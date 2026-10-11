import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import {
  checkNarration, announcesEncounterStart, statesUnrolledDamage,
  buildCorrectionPrompt, fakeEncounterPrompt, unrolledDamagePrompt,
} from "../src/lib/dm/engine-boundary.ts";

let passed = 0;
function test(name, run) { run(); passed++; console.log(`ok: ${name}`); }
function conversation(calls) {
  return [
    { role: "assistant", content: "", tool_calls: calls.map((call, i) => ({ id: `c${i}`, function: { name: call.name, arguments: JSON.stringify(call.args ?? {}) } })) },
    ...calls.map((call, i) => ({ role: "tool", tool_call_id: `c${i}`, content: JSON.stringify(call.result) })),
  ];
}
const miss = { name: "pc_attack", result: { target: "Goblin 1", hit: false, rolled: 9 } };
const hit = { name: "pc_attack", result: { target: "Goblin 1", name: "Goblin 1", hit: true, damage: 6, hp: "3/9" } };
const wounded = { name: "damage_enemy", result: { name: "Ogre", hp: "47/59" } };
const check = (narration, calls = [], extra = {}) => checkNarration({ locale: "zh-CN", narration, conversation: conversation(calls), partyNames: ["阿明", "Kara"], ...extra });
function kind(narration, calls, expected, extra) {
  assert.ok(check(narration, calls, extra).some(found => found.kind === expected), narration);
}

test("Chinese hits on resolved misses, including translated numbered targets", () => {
  for (const line of ["Kara击中了Goblin 1。", "阿明命中了哥布林。", "阿明砍中了哥布林1。", "哥布林被阿明击中了。", "阿明刺中了地精。"])
    kind(line, [miss], "hit");
});
test("Chinese explicit misses on resolved hits", () => {
  for (const line of ["阿明没有命中哥布林。", "Kara未击中Goblin 1。", "对哥布林的攻击落空。", "哥布林躲开了这一击。"])
    kind(line, [hit], "miss");
});
test("Chinese death and downed claims use actual live HP", () => {
  for (const line of ["食人魔死了。", "Kara杀死了食人魔。", "食人魔倒地身亡。", "食人魔的尸体倒在地上。"])
    kind(line, [wounded], "death");
  for (const line of ["食人魔失去意识。", "食人魔陷入昏迷。", "食人魔生命值降至0。"])
    kind(line, [wounded], "death");
  kind("阿明昏迷。", [{ name: "enemy_attack", result: { target: "阿明", targetHp: "10/20", hit: true } }], "death");
});
test("Chinese damage and healing numbers include written and fullwidth numerals", () => {
  for (const line of ["阿明造成了19点伤害。", "造成十九点伤害。", "造成１９点伤害。", "阿明恢复了十九点生命值。"])
    kind(line, [hit], "number");
  assert.deepEqual(check("阿明造成了6点伤害。", [hit]), []);
  assert.deepEqual(check("这把武器掷2d6伤害。", [hit]), []);
  assert.deepEqual(check("他们获得19枚金币。", [hit]), []);
  assert.deepEqual(check("阿明没有造成19点伤害。", [hit]), []);
});
test("leveled Chinese spell claims work for two-character party names and book-title punctuation", () => {
  kind("阿明施放了火球术。", [], "spell");
  kind("Kara释放《火球术》。", [], "spell");
  assert.deepEqual(check("阿明施放了火球术。", [{ name: "use_spell_slot", args: { spell: "Fireball" }, result: { ok: true } }]), []);
  assert.deepEqual(check("阿明施放了火球术。", [{ name: "use_spell_slot", args: { spell: "火球术" }, result: { ok: true } }]), []);
  assert.deepEqual(check("阿明施放了火焰箭。"), [], "a cantrip is not evidence of an unspent slot");
  assert.deepEqual(check("哥布林施放了火球术。"), [], "enemy spellcasting is not party slot spending");
});
test("negation, hypotheticals, attempted hits, recaps, quoted lies and different subjects are safe", () => {
  for (const line of [
    "阿明没有击中哥布林。", "阿明朝哥布林挥剑。", "阿明试图击中哥布林。",
    "如果阿明击中了哥布林，哥布林就死了。", "也许食人魔死了。", "食人魔还没有死去。",
    "「阿明击中了哥布林！」Kara说。", "『食人魔死了。』有人喊道。", "“阿明造成19点伤害。”这是吹嘘。",
    "Kara说：「食人魔死了", "阿明曾经施放火球术。", "阿明记得自己施放了火球术。",
    "阿明未能施放火球术。", "小阿明施放了火球术。", "阿明看着哥布林施放火球术。",
    "阿明击中了哥布林王。", "哥布林王被击中了。", "食人魔王死了。",
  ]) assert.deepEqual(check(line, [miss, wounded]), [], line);
  assert.deepEqual(check("阿明并不是未命中哥布林。", [hit]), []);
});
test("Chinese clauses separate actual contradictions from a later negative sentence", () => {
  kind("食人魔死了。哥布林没有死。", [wounded], "death");
  kind("食人魔死了；哥布林没有死。", [wounded], "death");
});
test("unrelated negation across a Chinese comma cannot hide a hit, death, number or spell", () => {
  kind("哥布林没有躲开，阿明击中了哥布林。", [miss], "hit");
  kind("哥布林没有躲开,阿明击中了哥布林。", [miss], "hit");
  kind("阿明没有击中哥布林，食人魔死了。", [miss, wounded], "death");
  kind("哥布林没有倒下，阿明造成十九点伤害。", [hit], "number");
  kind("哥布林没有逃跑，阿明施放火球术。", [], "spell");
  for (const line of ["如果哥布林没有躲开，阿明击中了哥布林。", "阿明记得哥布林没有躲开，阿明击中了哥布林。", "据说食人魔没有躲开，食人魔死了。"])
    assert.deepEqual(check(line, [miss, wounded]), [], line);
});
test("ambiguous creature names remain uncheckable", () => {
  assert.deepEqual(check("阿明击中了哥布林。", [miss], {
    live: { enemies: [{ id: "1", name: "Goblin 1", hp: 8, maxHp: 8, status: "alive" }, { id: "2", name: "Goblin 2", hp: 8, maxHp: 8, status: "alive" }] },
  }), []);
});
test("Chinese encounter announcements are checked, quotes and possibilities are not", () => {
  for (const line of ["战斗开始！", "请投掷先攻。", "**敌人：**哥布林\n**挑战等级：**1\n先攻"]) assert.equal(announcesEncounterStart(line, "zh-CN"), true, line);
  for (const line of ["如果战斗开始，请投掷先攻。", "「战斗开始！」Kara喊道。", "不要开始战斗。", "敌人：哥布林和食人魔。"])
    assert.equal(announcesEncounterStart(line, "zh-CN"), false, line);
});
test("unrolled Chinese damage nudges cannot apply a completed blow again", () => {
  assert.equal(statesUnrolledDamage("造成十九点伤害。", [], "zh-CN"), "造成十九点伤害。");
  assert.equal(statesUnrolledDamage("造成十九点伤害。", conversation([hit]), "zh-CN"), null);
  assert.equal(statesUnrolledDamage("造成十九点伤害。", [{ role: "user", content: "记录：造成十九点伤害。" }], "zh-CN"), null);
  assert.equal(statesUnrolledDamage("准备造成十九点伤害。", [], "zh-CN"), null);
});
test("correction prompts keep machine tool names and require Chinese prose without replay", () => {
  const prompt = buildCorrectionPrompt(check("阿明击中了哥布林。", [miss]), "zh-CN");
  assert.match(prompt, /简体中文/);
  assert.match(prompt, /不要调用任何工具/);
  assert.match(prompt, /不要重复执行动作/);
  assert.match(fakeEncounterPrompt("zh-CN"), /start_encounter/);
  assert.match(unrolledDamagePrompt("十九点伤害", "zh-CN"), /apply_damage/);
});
console.log(`test-chinese-guard: ${passed} passed`);
