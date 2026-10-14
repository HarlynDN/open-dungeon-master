import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import { register } from "node:module";
import { APP_LOCALES, normalizeLocale } from "../src/lib/i18n/locales.ts";
import { MESSAGE_CATALOGS, createTranslator } from "../src/lib/i18n/messages.ts";
import { withGenerationLocale } from "../src/lib/i18n/generation.ts";
import { estimateTokens, fitHistory } from "../src/lib/dm/context-budget.ts";
import { estimateLodTokens, firstSentence, renderChapterLod } from "../src/lib/dm/chapter-lod.ts";
import { tokenize, computeIdf, lexicalScore } from "../src/lib/dm/fusion-logic.ts";
import { isComposingInput } from "../src/lib/input-composition.ts";

register("./lib/register-alias.mjs", import.meta.url);
const { normalizeGameSettings, gameSettingsSchema } = await import("../src/lib/schemas/game-settings.ts");

let passed = 0;
function test(name, run) { run(); passed++; console.log(`ok: ${name}`); }

test("old or unknown campaign locales retain English without discarding other settings", () => {
  assert.equal(normalizeGameSettings({}).locale, "en");
  assert.equal(normalizeGameSettings({ locale: "fr", mapsEnabled: false }).locale, "en");
  assert.equal(normalizeGameSettings({ locale: "fr", mapsEnabled: false }).mapsEnabled, false);
  assert.equal(normalizeGameSettings({ locale: "zh-CN" }).locale, "zh-CN");
  assert.equal(gameSettingsSchema.safeParse({ locale: "中文" }).success, false);
  assert.equal(normalizeLocale(null), "en");
});

test("every registered locale has the same message keys and placeholders", () => {
  const keys = Object.keys(MESSAGE_CATALOGS.en).sort();
  const placeholders = (text) => [...new Set([...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]))].sort();
  for (const locale of APP_LOCALES) {
    assert.deepEqual(Object.keys(MESSAGE_CATALOGS[locale]).sort(), keys);
    for (const key of keys) {
      const params = Object.fromEntries(placeholders(MESSAGE_CATALOGS.en[key]).map(name => [name, `test-${name}`]));
      assert.ok(createTranslator(locale)(key, params));
      assert.deepEqual(placeholders(MESSAGE_CATALOGS[locale][key]), placeholders(MESSAGE_CATALOGS.en[key]));
    }
  }
});

test("output locale preserves history, tool arguments, citations and one system message", () => {
  const source = [
    { role: "system", content: "Only answer from evidence. Return answer and quote as JSON." },
    { role: "user", content: "Old English history. 法师现在做什么？" },
    { role: "assistant", content: "", tool_calls: [{ function: { name: "cast_spell", arguments: '{"spell":"Fireball"}' } }] },
    { role: "tool", tool_call_id: "roll-1", content: '{"hit":false,"damage":0}' },
  ];
  const copy = structuredClone(source);
  const result = withGenerationLocale(source, "zh-CN");
  assert.deepEqual(source, copy, "must not modify the persisted conversation");
  assert.equal(result.filter(m => m.role === "system").length, 1);
  assert.match(result[0].content, /Simplified Chinese/);
  assert.match(result[0].content, /canonical English name or ID/);
  assert.match(result[0].content, /citation excerpts in their original language/);
  assert.deepEqual(result.slice(1), source.slice(1));
  assert.equal(withGenerationLocale(result, "zh-CN"), result, "utility fallback cannot append the rule twice");
  const switched = withGenerationLocale(result, "en");
  assert.equal((switched[0].content.match(/\[ODM output locale:/g) ?? []).length, 1);
  assert.match(switched[0].content, /ODM output locale: en/);
  const withoutSystem = [{ role: "user", content: "hi" }];
  const appended = withGenerationLocale(withoutSystem, "en");
  assert.equal(appended.length, 2);
  assert.equal(appended[0].role, "system");
  assert.deepEqual(appended.slice(1), withoutSystem);
  assert.equal(withGenerationLocale(appended, "en"), appended);
});

test("Chinese token budgets trim history and chapters instead of counting four characters per token", () => {
  assert.equal(estimateTokens("abcd"), 1);
  assert.equal(estimateTokens("火球术"), 5);
  const mixed = "Fireball 火球术，造成 8d6 damage。";
  assert.ok(estimateTokens(mixed) > Math.ceil(mixed.length / 4));
  assert.equal(estimateLodTokens(mixed), estimateTokens(mixed));
  const entries = [1, 2, 3].map(id => ({ id: String(id), text: "旧故事。".repeat(15) }));
  const fit = fitHistory(entries, 130);
  assert.equal(fit.kept.length, 1);
  assert.equal(fit.kept[0].id, "3");
  assert.equal(firstSentence("他们到了城门。「守卫是谁？」无人回答。"), "他们到了城门。");
  assert.equal(firstSentence("「停下！」守卫喊道。"), "「停下！」");
  const result = renderChapterLod([
    { id: "1", index: 1, title: "渡口", summary: "他们到了渡口。" + "新的细节。".repeat(100) },
  ], 80);
  assert.equal(result.tierById["1"], "synopsis");
  assert.ok(result.tokens <= 80);
});

test("Chinese short terms, mixed English references and proper names survive lexical retrieval", () => {
  assert.deepEqual(tokenize("The party was in the vault"), ["parti", "vault"]);
  const terms = tokenize("法师施放法术，掷骰子。Kara 使用 Fireball。");
  for (const term of ["法术", "骰子", "kara", ...tokenize("Fireball")]) assert.ok(terms.includes(term), term);
  const corpus = ["他们在城门等待守卫。", "法师研究法术，准备掷骰子。", "Kara 使用 Fireball。"];
  const idf = computeIdf(corpus);
  assert.ok(lexicalScore("法术", corpus[1], idf) > lexicalScore("法术", corpus[0], idf));
  assert.ok(lexicalScore("骰子", corpus[1], idf) > 0);
});

test("IME confirmation is not an action, including Safari's keyCode 229", () => {
  assert.equal(isComposingInput({ nativeEvent: { isComposing: true }, keyCode: 13 }), true);
  assert.equal(isComposingInput({ isComposing: true }), true);
  assert.equal(isComposingInput({ nativeEvent: { isComposing: false, keyCode: 229 } }), true);
  assert.equal(isComposingInput({ nativeEvent: { isComposing: false, keyCode: 13 } }), false);
});

console.log(`test-chinese-foundation: ${passed} passed`);
