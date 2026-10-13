import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { APP_LOCALES, browserLocale, resolveUiLocale } from "../src/lib/i18n/locales.ts";
import { withGenerationLocale } from "../src/lib/i18n/generation.ts";
import { estimateTokens } from "../src/lib/dm/context-budget.ts";
import { MESSAGE_CATALOGS } from "../src/lib/i18n/messages.ts";
import { messageScope, MESSAGE_SCOPES } from "../src/lib/i18n/resource-scope.ts";
register("./lib/register-alias.mjs", import.meta.url);

assert.equal(browserLocale("en-US;q=0.6,zh-Hans-CN;q=0.9"), "zh-CN");
assert.equal(browserLocale("zh-TW, en;q=0.8"), "zh-CN");
assert.equal(browserLocale("zh;q=0,en;q=0.8"), "en");
assert.equal(browserLocale("fr,zh;q=broken,en;q=0.5"), "en");
assert.equal(browserLocale("en;q=0.8,zh;q=0.8"), "en");
assert.equal(browserLocale("*,zh;q=0.8"), "zh-CN");
assert.equal(resolveUiLocale("en", "zh-CN", "zh"), "en");
assert.equal(resolveUiLocale(undefined, "en", "zh"), "en");
assert.equal(resolveUiLocale(undefined, undefined, "zh"), "zh-CN");
assert.equal(resolveUiLocale("unsupported-saved-value", "zh-CN", "zh"), "en");

const history = [{ role: "user", content: "旧历史" }, { role: "assistant", content: "", tool_calls: [{ function: { name: "cast_spell", arguments: '{"spell":"Shield"}' } }] }];
const result = withGenerationLocale(history, "zh-CN");
assert.deepEqual(result.slice(1), history);
assert.equal(result[0].role, "system");
assert.equal(withGenerationLocale(result, "zh-CN"), result);
assert.equal(withGenerationLocale([], "en").length, 1);
assert.equal(estimateTokens("“hello”—"), 2);
assert.equal(estimateTokens("café résumé"), Math.ceil("café résumé".length / 4));
assert.equal(estimateTokens("火球术"), 5);
assert.ok(estimateTokens("法师使用 Fireball。") > Math.ceil("法师使用 Fireball。".length / 4));

const prod = spawnSync(process.execPath, ["--input-type=module", "-e", `
  import {createTranslator} from ${JSON.stringify(new URL("../src/lib/i18n/messages.ts", import.meta.url).href)};
  console.log(createTranslator("zh-CN")("library.copyName"));
`], { env: { ...process.env, NODE_ENV: "production" }, encoding: "utf8" });
assert.equal(prod.status, 0, prod.stderr);
assert.match(prod.stdout, /\{name\}/);
assert.match(prod.stderr, /Missing translation parameter/);

// A fresh client-shaped runtime starts with UI copy alone. Registering one
// language cannot make another language or deferred content silently ready.
const isolated = spawnSync(process.execPath, ["--input-type=module", "-e", `
  import assert from "node:assert/strict";
  import {registerMessages,createTranslator} from ${JSON.stringify(new URL("../src/lib/i18n/translator.ts", import.meta.url).href)};
  import en from ${JSON.stringify(new URL("../src/lib/i18n/resources/en.ui.json", import.meta.url).href)} with {type:"json"};
  import zh from ${JSON.stringify(new URL("../src/lib/i18n/resources/zh-CN.ui.json", import.meta.url).href)} with {type:"json"};
  registerMessages({en});
  assert.equal(createTranslator("en")("nav.characters"), "Characters");
  assert.throws(()=>createTranslator("en")("spellName.1"), /Missing translation resource/);
  assert.throws(()=>createTranslator("zh-CN")("nav.characters"), /Missing translation resource/);
  registerMessages({"zh-CN":zh});
  assert.equal(createTranslator("en")("nav.characters"), "Characters");
  assert.equal(createTranslator("zh-CN")("nav.characters"), "角色");
`], { env: { ...process.env, NODE_ENV: "test" }, encoding: "utf8" });
assert.equal(isolated.status, 0, isolated.stderr);

for (const locale of APP_LOCALES) {
  const merged = {};
  for (const scope of MESSAGE_SCOPES) {
    const resource = JSON.parse(readFileSync(new URL(`../src/lib/i18n/resources/${locale}.${scope}.json`, import.meta.url), "utf8"));
    assert.ok(Object.keys(resource).every(key => messageScope(key) === scope));
    Object.assign(merged, resource);
  }
  assert.deepEqual(merged, MESSAGE_CATALOGS[locale]);
}
const provider = readFileSync(new URL("../src/lib/i18n/LocaleProvider.tsx", import.meta.url), "utf8");
assert.ok(!provider.includes('from "./messages"'));
const { loadLocaleMessages } = await import("../src/lib/i18n/client-catalogs.ts");
await Promise.all(APP_LOCALES.flatMap(locale => MESSAGE_SCOPES.map(scope => loadLocaleMessages(locale, scope))));
console.log("test-localization-review-repairs: preference precedence, protocol, token classification, production fallback and scoped locale resources passed");
