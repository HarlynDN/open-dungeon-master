import "../src/lib/i18n/messages.ts";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";

const { test, finish } = suite("test-chinese-prep-panels");
const world = await openWorld({ status: "lobby", gameSettings: { dmMode: "human", locale: "zh-CN" } });
const { joinByInviteCode, setHumanDm } = await import("../src/lib/db/campaigns.ts");
setHumanDm(world.campaignId, world.owner.id);
const player = world.addUser("reader");
const other = world.addUser("another-reader");
for (const user of [player, other]) assert.ok(!("error" in joinByInviteCode(user.id, world.campaign().inviteCode)));
const { CALENDAR_PRESETS, formatDate, describeInstant, toInstant } = await import("../src/lib/dm/calendar.ts");
const { calendarDate, calendarDescription, calendarPresetLabel, calendarMonthLabel, calendarWeekdayLabel, calendarEditedWeekdays } = await import("../src/lib/i18n/calendar-presentations.ts");
const { copyLoreTitle, parseCommaList, sessionWhenLabel, loreCategoryLabel } = await import("../src/lib/i18n/prep-presentations.ts");
const { readUiResponse, uiRequestError, requestErrorText, loadErrorText } = await import("../src/lib/i18n/api-errors.ts");
const context = { params: Promise.resolve({ campaignId: world.campaignId }) };
const request = (method, data) => new Request("http://test/", { method, ...(data === undefined ? {} : { body: JSON.stringify(data) }) });
const clockRoute = await world.route("campaigns/[campaignId]/dm/clock");
const eventRoute = await world.route("campaigns/[campaignId]/calendar/events");
const loreRoute = await world.route("campaigns/[campaignId]/lore");
const rulesRoute = await world.route("campaigns/[campaignId]/rules");
const scheduleRoute = await world.route("campaigns/[campaignId]/schedule");

await test("localized calendar editor preserves canonical values through save and reload", async () => {
  world.signIn(world.owner);
  const original = structuredClone(CALENDAR_PRESETS[0]);
  const display = original.weekdays.map((_, index) => calendarWeekdayLabel(original, index, "zh-CN"));
  assert.ok(display.every(name => /\p{Script=Han}/u.test(name)));
  assert.deepEqual(calendarEditedWeekdays(original, display, "zh-CN"), original.weekdays);
  const draft = structuredClone(original);
  draft.months[0].name = "我的冬月";
  draft.weekdays = calendarEditedWeekdays(original, display.map((name, i) => i === 1 ? "集市日" : name), "zh-CN");
  const saved = await clockRoute.POST(request("POST", { do: "calendar", definition: draft }), context);
  assert.equal(saved.status, 200);
  const reload = (await (await clockRoute.GET(request("GET"), context)).json()).clock.calendar;
  assert.equal(reload.id, original.id);
  assert.equal(reload.months[0].name, "我的冬月");
  assert.equal(calendarMonthLabel(reload, 0, "en"), "我的冬月");
  assert.equal(calendarMonthLabel(reload, 1, "en"), original.months[1].name);
  assert.equal(calendarMonthLabel(reload, 1, "zh-CN"), "霜月");
  assert.equal(calendarWeekdayLabel(reload, 1, "en"), "集市日");
  assert.equal(calendarWeekdayLabel(reload, 0, "en"), original.weekdays[0]);
  assert.equal(calendarWeekdayLabel(reload, 0, "zh-CN"), display[0]);
  await clockRoute.POST(request("POST", { do: "calendar", definition: original }), context);
  const unchanged = (await (await clockRoute.GET(request("GET"), context)).json()).clock.calendar;
  assert.deepEqual(unchanged.months, original.months);
  assert.deepEqual(unchanged.weekdays, original.weekdays);
  assert.equal(unchanged.name, original.name);
});

await test("calendar display preserves engine dates, English tool prose and edited names", () => {
  const before = structuredClone(CALENDAR_PRESETS);
  for (const calendar of CALENDAR_PRESETS) {
    assert.equal(calendarPresetLabel(calendar), calendar.name);
    assert.match(calendarPresetLabel(calendar, "zh-CN"), /\p{Script=Han}/u);
    calendar.months.forEach((month, index) => {
      assert.equal(calendarMonthLabel(calendar, index), month.name);
      assert.notEqual(calendarMonthLabel(calendar, index, "zh-CN"), month.name);
    });
    for (const day of [1, 28, 50, 99]) for (const hour of [0, 5, 8, 12, 16, 19, 23]) {
      const instant = toInstant(calendar, { day, hour });
      assert.equal(calendarDate(calendar, instant), formatDate(calendar, instant));
      assert.equal(calendarDescription(calendar, instant), describeInstant(calendar, instant));
      assert.match(calendarDate(calendar, instant, "zh-CN"), /1 年/);
      assert.doesNotMatch(calendarDescription(calendar, instant, "zh-CN"), /year|morning|afternoon|winter/);
    }
  }
  const custom = { ...structuredClone(CALENDAR_PRESETS[0]), name: "Author's year", months: [{ name: "Mist Moon", days: 30 }, { name: "雾散月", days: 30 }], weekdays: ["市场日"], moons: [{ name: "Reaper's Moon", cycleDays: 28, offset: 0 }], festivals: [{ name: "钟声节", month: 1, day: 1 }], yearSuffix: "纪元" };
  assert.equal(calendarPresetLabel(custom, "zh-CN"), custom.name);
  assert.equal(calendarMonthLabel(custom, 0, "zh-CN"), "Mist Moon");
  const rendered = calendarDescription(custom, 0, "zh-CN");
  for (const name of ["Mist Moon", "市场日", "Reaper's Moon", "钟声节", "纪元"]) assert.ok(rendered.includes(name));
  assert.deepEqual(CALENDAR_PRESETS, before);
});

await test("CJK list delimiters and generated copy titles separate UI syntax from content", () => {
  assert.deepEqual(parseCommaList("钟楼，The Mill、史诗, rules"), ["钟楼", "The Mill", "史诗", "rules"]);
  assert.deepEqual(parseCommaList("一，二、三", 2), ["一", "二"]);
  assert.equal(copyLoreTitle("The Mill", "zh-CN"), "The Mill（副本）");
  assert.equal(copyLoreTitle("磨坊", "en"), "磨坊 (copy)");
  assert.equal(loreCategoryLabel("geography", "zh-CN"), "地理");
  assert.equal(loreCategoryLabel("geography"), "Geography");
  for (const zone of ["Asia/Shanghai", "America/New_York"]) {
    const old = process.env.TZ;
    process.env.TZ = zone;
    const iso = "2030-06-01T23:30:00.000Z";
    assert.match(sessionWhenLabel(iso, "zh-CN"), /[月日]/);
    assert.equal(sessionWhenLabel(iso), sessionWhenLabel(iso, "en"));
    if (old === undefined) delete process.env.TZ; else process.env.TZ = old;
  }
});

await test("failed, unreadable and unreachable requests rerender instead of becoming empty content", async () => {
  let error;
  try { await readUiResponse(Promise.resolve(Response.json({ error: "Only the DM can do that." }, { status: 403 })), "calendar.saveError"); }
  catch (failure) { error = uiRequestError(failure, "calendar.saveError"); }
  assert.equal(requestErrorText("en", error), "Only the DM can do that.");
  assert.match(requestErrorText("zh-CN", error), /未能保存游戏历法/);
  for (const promise of [Promise.resolve(new Response("broken JSON")), Promise.reject(new Error("offline"))]) {
    await assert.rejects(readUiResponse(promise, "lore.saveError"), failure => /未能保存|无法连接/.test(requestErrorText("zh-CN", uiRequestError(failure, "lore.saveError"))));
  }
  assert.deepEqual(await readUiResponse(Promise.resolve(new Response(null, { status: 204 })), "lore.removeError"), {});
  assert.equal(loadErrorText("en", "Reading failed (HTTP 500).", "rules.loadError"), "Reading failed (HTTP 500).");
  assert.match(loadErrorText("zh-CN", "Reading failed (HTTP 500).", "rules.loadError"), /无法读取自定义房规/);
});

await test("real clock and event routes retain DM authority and canonical event values", async () => {
  world.signIn(world.owner);
  const changed = await clockRoute.POST(request("POST", { do: "calendar", preset: "generic" }), context);
  assert.equal(changed.status, 200);
  const instantBefore = world.campaign().clock.instant;
  for (const visibility of ["party", "dm"]) {
    const response = await eventRoute.POST(request("POST", { title: `钟声节-${visibility}`, body: "玩家自写内容", month: 2, day: 7, hour: 8, repeat: "yearly", visibility }), context);
    assert.equal(response.status, 200);
    const { event } = await response.json();
    assert.equal(event.repeat, "yearly");
    assert.equal(event.visibility, visibility);
    assert.equal(event.when, formatDate(world.campaign().clock.calendar, event.atInstant));
    assert.match(calendarDate(world.campaign().clock.calendar, event.atInstant, "zh-CN"), /二月7 日/);
  }
  world.signIn(player);
  assert.equal((await clockRoute.GET(request("GET"), context)).status, 403);
  assert.equal((await eventRoute.POST(request("POST", { title: "拒绝写入" }), context)).status, 403);
  const { events } = await (await eventRoute.GET(request("GET"), context)).json();
  assert.equal(events.length, 1);
  assert.equal(events[0].visibility, "party");
  assert.equal(world.campaign().clock.instant, instantBefore);
  assert.equal(world.campaign().gameSettings.locale, "zh-CN");
});

await test("Chinese lore respects audience, secrets, style and the canonical rules tag", async () => {
  world.signIn(world.owner);
  for (const visibility of ["party", "dm"]) {
    const response = await loreRoute.POST(request("POST", { category: "geography", title: `磨坊-${visibility}`, body: "公开正文\n:::secret\n密道出口\n:::\n", tags: parseCommaList("钟楼，rules、史诗"), visibility, audience: [player.id], style: "parchment" }), context);
    assert.equal(response.status, 200);
    const { entry } = await response.json();
    assert.equal(entry.category, "geography");
    assert.equal(entry.style, "parchment");
    assert.deepEqual(entry.tags, ["钟楼", "rules", "史诗"]);
    assert.deepEqual(entry.audience, [player.id]);
  }
  world.signIn(player);
  const { entries } = await (await loreRoute.GET(request("GET"), context)).json();
  assert.equal(entries.length, 1);
  assert.ok(entries[0].body.includes("公开正文"));
  assert.ok(!entries[0].body.includes("密道出口"));
  assert.equal((await loreRoute.POST(request("POST", { category: "geography", title: "不允许", body: "正文" }), context)).status, 403);
  world.signIn(other);
  assert.equal((await (await loreRoute.GET(request("GET"), context)).json()).entries.length, 0);
});

await test("house-rule writes and pinning keep Chinese originals and permissions", async () => {
  world.signIn(world.owner);
  const text = "饮用药水：\n饮用药水视为附赠动作。\n\n钟楼：\n不要独自进入钟楼。";
  const response = await rulesRoute.PUT(request("PUT", { text }), context);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.text, text);
  assert.ok(data.chunks.length);
  const flags = await rulesRoute.PATCH(request("PATCH", { chunkId: data.chunks[0].id, pinned: true, enabled: false }), context);
  assert.equal(flags.status, 200);
  const { chunk } = await flags.json();
  assert.equal(chunk.pinned, true);
  assert.equal(chunk.enabled, false);
  world.signIn(player);
  assert.equal((await (await rulesRoute.GET(request("GET"), context)).json()).text, text);
  assert.equal((await rulesRoute.PUT(request("PUT", { text: "覆盖" }), context)).status, 403);
});

await test("scheduling and RSVP use ISO instants and protocol enums under a Chinese UI", async () => {
  world.signIn(world.owner);
  const startsAt = new Date(Date.now() + 2 * 86400000).toISOString();
  const response = await scheduleRoute.POST(request("POST", { startsAt, durationMin: 180, title: "钟楼冒险", note: "从桥边继续" }), context);
  assert.equal(response.status, 201);
  const { session } = await response.json();
  assert.equal(session.startsAt, startsAt);
  assert.equal(session.durationMin, 180);
  assert.equal(session.title, "钟楼冒险");
  world.signIn(player);
  assert.equal((await scheduleRoute.POST(request("POST", { startsAt }), context)).status, 403);
  const rsvpRoute = await world.route("campaigns/[campaignId]/schedule/[sessionId]/rsvp");
  const rsvpContext = { params: Promise.resolve({ campaignId: world.campaignId, sessionId: session.id }) };
  const rsvp = await rsvpRoute.POST(request("POST", { response: "yes" }), rsvpContext);
  assert.equal(rsvp.status, 200);
  assert.ok((await rsvp.json()).session.rsvps.some(row => row.userId === player.id && row.response === "yes"));
  assert.equal((await rsvpRoute.POST(request("POST", { response: "参加" }), rsvpContext)).status, 400);
  assert.equal(world.campaign().gameSettings.locale, "zh-CN");
});

await test("UI translations cannot replace machine values in comparisons or wire fields", () => {
  for (const relative of ["src/app/workshop/lore/LoreEditorForm.tsx", "src/app/campaigns/[campaignId]/CalendarSection.tsx", "src/components/ScheduleSection.tsx"]) {
    const file = new URL(`../${relative}`, import.meta.url);
    const ast = ts.createSourceFile(relative, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const comparisons = new Set([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
    const visit = node => {
      if (ts.isBinaryExpression(node) && comparisons.has(node.operatorToken.kind)) assert.ok(!/\bt\(/.test(node.getText(ast)), `${relative}: a translated label must not participate in a machine comparison`);
      if (ts.isPropertyAssignment(node) && ["visibility", "category", "style", "response", "repeat", "preset", "startsAt"].includes(node.name.getText(ast))) assert.ok(!/^t\(/.test(node.initializer.getText(ast)), `${relative}: protocol property must not be a translation`);
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }
});
world.close();
finish();
