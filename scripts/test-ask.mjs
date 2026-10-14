// Ask: reply parsing (with the scope an "auto" answer names), and a
// source-level guard that the evidence builder cannot leak DM secrets.
// The evidence an "auto" question gets, and the archive search the model may
// ask for, are pinned against a fake model in test-table-language-calls.mjs.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  QUESTION_MAX_CHARS,
  inferScope,
  shouldSearchArchive,
  clampQuestion,
  filedScope,
  isAskScope,
  parseAskJson,
  questionLength,
  questionProblem,
} from "../src/lib/dm/ask-logic.ts";

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
}

test("clampQuestion collapses whitespace and bounds length", () => {
  assert.equal(clampQuestion("  who   is\n\nMarla?  "), "who is Marla?");
  assert.equal(clampQuestion("x".repeat(QUESTION_MAX_CHARS + 400)).length, QUESTION_MAX_CHARS);
  assert.equal(clampQuestion("   "), "");
});

// Issue 207: a 500-character limit turned away questions that carried their
// scene, with only "Invalid question." and nothing on screen to warn.
test("a question may carry its scene, and over the limit it hears the limit", () => {
  assert.equal(QUESTION_MAX_CHARS, 2_000);
  assert.equal(questionLength("  who   is\n\nMarla?  "), "who is Marla?".length);
  assert.equal(questionProblem("   "), "Ask a question first.");
  assert.equal(questionProblem("x".repeat(QUESTION_MAX_CHARS)), null);
  // Whitespace is folded before it is counted, as it is stored.
  assert.equal(questionProblem(`${"word ".repeat(400)}${" ".repeat(600)}`), null);
  const over = questionProblem("x".repeat(QUESTION_MAX_CHARS + 1));
  assert.match(over, /up to 2,000 characters/);
  assert.match(over, /this one has 2,001/);
});

test("isAskScope rejects anything unexpected", () => {
  assert.ok(isAskScope("story") && isAskScope("rules") && isAskScope("sheet"));
  assert.ok(!isAskScope("auto"));
  assert.ok(!isAskScope(""));
  assert.ok(!isAskScope(undefined));
});

test("inferScope routes the three kinds of question", () => {
  assert.equal(inferScope("who was the woman at the shrine three chapters back?"), "story");
  assert.equal(inferScope("what happened to the vault?"), "story");
  assert.equal(inferScope("how does grappling work?"), "rules");
  assert.equal(inferScope("does my ranger read Draconic?"), "sheet");
  assert.equal(inferScope("what is my AC?"), "sheet");
  // Sheet beats rules: answer from the character who actually has the feature.
  assert.equal(inferScope("how does my Bardic Inspiration work?"), "sheet");
});

test("shouldSearchArchive spends retrieval only when there is something to find", () => {
  assert.ok(shouldSearchArchive("what did Marla promise us?"));
  assert.ok(shouldSearchArchive("what happened earlier with the vault?"));
  assert.ok(shouldSearchArchive("who owns the mill?"));
  // Pure rules lookups must not cost an embedding pass.
  assert.ok(!shouldSearchArchive("how does grappling work"));
  assert.ok(!shouldSearchArchive("what is my armor class"));
  // Forced by the caller.
  assert.ok(shouldSearchArchive("how does grappling work", true));
});

test("Chinese auto scope uses the campaign locale and retains English questions", () => {
  for (const question of ["我的护甲等级是多少？", "我还有几个法术位？", "我能否施放这个法术？", "我的吟游激励如何运作？"]) {
    assert.equal(inferScope(question, "zh-CN"), "sheet", question);
  }
  for (const question of ["擒抱规则是什么？", "优势怎么计算？", "专注豁免如何判定？", "借机攻击会消耗反应吗？"]) {
    assert.equal(inferScope(question, "zh-CN"), "rules", question);
    assert.ok(!shouldSearchArchive(question, false, "zh-CN"), question);
  }
  for (const question of ["祭坛旁的女人是谁？", "阿明答应了什么？", "雾港", "我想知道城堡在哪里"]) {
    assert.equal(inferScope(question, "zh-CN"), "story", question);
    assert.ok(shouldSearchArchive(question, false, "zh-CN"), question);
  }
  assert.equal(inferScope("what is my AC?", "zh-CN"), "sheet");
  assert.equal(inferScope("how does grappling work?", "zh-CN"), "rules");
  assert.ok(!shouldSearchArchive("how does grappling work", false, "zh-CN"));
  assert.ok(shouldSearchArchive("优势怎么计算？", true, "zh-CN"));
  // Existing callers default to the unchanged English heuristic.
  assert.equal(inferScope("我的护甲等级是多少？"), "story");
  assert.ok(!shouldSearchArchive("雾港"));
});

test("parseAskJson reads a clean reply", () => {
  const parsed = parseAskJson(
    '{"answer":"Marla is the steward.","citations":[{"kind":"fact","ref":"fact:ab12","quote":"Marla holds the vault key."}]}',
    "story",
  );
  assert.equal(parsed.answer, "Marla is the steward.");
  assert.equal(parsed.citations.length, 1);
  assert.equal(parsed.citations[0].kind, "fact");
});

test("parseAskJson survives code fences and surrounding prose", () => {
  // A small utility model wraps its JSON more often than a large one.
  const fenced = parseAskJson('```json\n{"answer":"Yes.","citations":[]}\n```', "rules");
  assert.equal(fenced.answer, "Yes.");
  const chatty = parseAskJson('Sure! {"answer":"Yes.","citations":[]} Hope that helps.', "rules");
  assert.equal(chatty.answer, "Yes.");
});

test("parseAskJson rejects unusable replies", () => {
  assert.equal(parseAskJson("", "story"), null);
  assert.equal(parseAskJson("no json at all", "story"), null);
  assert.equal(parseAskJson("{not valid json}", "story"), null);
  assert.equal(parseAskJson('{"citations":[]}', "story"), null, "an answerless reply is unusable");
  assert.equal(parseAskJson('{"answer":"   "}', "story"), null);
});

test("parseAskJson drops malformed citations but keeps the answer", () => {
  const parsed = parseAskJson(
    '{"answer":"Yes.","citations":[{"kind":"fact"},{"quote":"kept"},"junk",null]}',
    "story",
  );
  assert.equal(parsed.answer, "Yes.");
  assert.equal(parsed.citations.length, 1);
  assert.equal(parsed.citations[0].quote, "kept");
  // A citation with no kind still gets a usable label.
  assert.equal(parsed.citations[0].kind, "record");
});

test("an answer keeps the scope asked for; an auto answer takes the one it names, else the story's", () => {
  assert.equal(parseAskJson('{"answer":"Yes.","scope":"rules"}', "sheet").scope, "sheet");
  assert.equal(parseAskJson('{"answer":"Sì.","scope":"rules","citations":[]}', "auto").scope, "rules");
  // The label only files the ask: an answer without a usable one is kept.
  assert.deepEqual(parseAskJson('{"answer":"Sì.","citations":[]}', "auto"), { answer: "Sì.", citations: [], scope: "story" });
  assert.equal(parseAskJson('{"answer":"Sì.","scope":"weather"}', "auto").scope, "story");
  // A failed ask is filed the same way: under what was asked, an auto one
  // under the story.
  assert.equal(filedScope("rules"), "rules");
  assert.equal(filedScope("auto"), "story");
});

// A real end-to-end redaction test would need a seeded encrypted database,
// which nothing else in scripts/ does. This checks the same property at the
// source level instead, and it guards the exact edit that would leak: the
// difference between listFactsVisibleTo (scoped) and listActiveFacts (all
// facts, DM-only included) is one identifier.
test("the evidence builder cannot reach DM-only material", () => {
  const source = readFileSync(new URL("../src/lib/dm/ask.ts", import.meta.url), "utf8");
  const code = source
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");

  assert.ok(
    code.includes("listFactsVisibleTo"),
    "facts must be read through the visibility-scoped helper",
  );
  assert.ok(
    !code.includes("listActiveFacts"),
    "listActiveFacts returns DM-only secrets and must never be used here",
  );
  assert.ok(
    /listFactsVisibleTo\([^)]*false\s*\)/s.test(code),
    "includeDmSecrets must be passed false",
  );
  for (const forbidden of ["dmOutline", "storyArc", "worldArcs", "enemies", "agency"]) {
    assert.ok(
      !code.includes(forbidden),
      `${forbidden} is DM-side material and must not reach an Ask answer`,
    );
  }
});

console.log(`test-ask: ${passed} tests passed`);
