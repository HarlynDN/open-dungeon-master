import assert from "node:assert/strict";
import { register } from "node:module";
import { suite } from "./lib/enforce-harness.mjs";
register("./lib/register-alias.mjs", import.meta.url);
const { test, finish } = suite("test-dice-look-sync");
const savedFetch = globalThis.fetch, savedWindow = globalThis.window;
const local = new Map();
const win = new EventTarget();
win.localStorage = { getItem: (key) => local.get(key) ?? null, setItem: (key, value) => local.set(key, value) };
globalThis.window = win;
const store = await import("../src/lib/dice/dice-look-store.ts");
const { DEFAULT_DICE_LOOK, DICE_LOOK_PRESETS } = await import("../src/lib/dice/dice-look.ts");
const look = (id) => DICE_LOOK_PRESETS.find((preset) => preset.id === id).look;
let respond = async () => Response.json({ settings: {} });
const requests = [];
globalThis.fetch = (url, options) => {
  const call = { url, method: options?.method ?? "GET", data: options?.body ? JSON.parse(options.body) : null };
  requests.push(call); return respond(call);
};
const ack = (call) => Response.json({ settings: { diceLook: call.data.settings.diceLook } });
const until = async (condition) => {
  const deadline = Date.now() + 3000;
  while (!condition()) { if (Date.now() > deadline) throw new Error("Timed out waiting for the queued profile write."); await new Promise((resolve) => setTimeout(resolve, 5)); }
};

try {
  await test("failed profile hydration reports a read error without replacing local dice", async () => {
    respond = async () => Response.json({ error: "temporarily unavailable" }, { status: 503 });
    await store.hydrateDiceLook();
    assert.equal(store.readDiceLookSyncStatus(), "load-error");
    assert.deepEqual(store.readDiceLook(), DEFAULT_DICE_LOOK);
    respond = async () => Response.json({ settings: { diceLook: look("ice") } });
    await store.retryDiceLookSync();
    assert.equal(store.readDiceLookSyncStatus(), "synced"); assert.deepEqual(store.readDiceLook(), look("ice"));
  });

  await test("failed writes keep local choices and retry the identical canonical payload", async () => {
    respond = async () => Response.json({ error: "offline" }, { status: 503 });
    store.writeDiceLook(look("fire")); await store.retryDiceLookSync();
    assert.equal(store.readDiceLookSyncStatus(), "save-error"); assert.deepEqual(store.readDiceLook(), look("fire"));
    respond = async (call) => ack(call); await store.retryDiceLookSync();
    assert.equal(store.readDiceLookSyncStatus(), "synced");
    const last = requests.at(-1); assert.equal(last.url, "/api/profile"); assert.equal(last.method, "PATCH");
    assert.deepEqual(last.data, { settings: { diceLook: look("fire") } });
  });

  await test("slow older writes cannot overwrite a newer look or prematurely report synced", async () => {
    const pending = [];
    respond = (call) => new Promise((resolve) => pending.push({ call, resolve }));
    store.writeDiceLook(look("dragon")); const running = store.retryDiceLookSync();
    assert.equal(pending.length, 1);
    store.writeDiceLook(look("onyx")); await store.retryDiceLookSync();
    assert.equal(pending.length, 1, "no overlapping PATCH requests");
    pending[0].resolve(ack(pending[0].call)); await until(() => pending.length === 2);
    assert.equal(store.readDiceLookSyncStatus(), "saving");
    assert.deepEqual(store.readDiceLook(), look("onyx")); assert.deepEqual(pending[1].call.data.settings.diceLook, look("onyx"));
    pending[1].resolve(ack(pending[1].call)); await running;
    assert.equal(store.readDiceLookSyncStatus(), "synced");
  });

  await test("a late hydration result cannot replace a look chosen while it was loading", async () => {
    let resolveGet;
    respond = (call) => call.method === "GET" ? new Promise((resolve) => { resolveGet = resolve; }) : Promise.resolve(ack(call));
    const reading = store.retryDiceLookSync(); await until(() => Boolean(resolveGet));
    store.writeDiceLook(look("bronze"));
    resolveGet(Response.json({ settings: { diceLook: look("ice") } })); await reading;
    assert.deepEqual(store.readDiceLook(), look("bronze")); assert.equal(store.readDiceLookSyncStatus(), "saving");
    await store.retryDiceLookSync(); assert.equal(store.readDiceLookSyncStatus(), "synced");
  });

  await test("unreadable or mismatched success bodies do not falsely acknowledge a save", async () => {
    for (const response of [new Response("<html>proxy</html>", { status: 200 }), Response.json({ settings: { diceLook: look("ice") } })]) {
      respond = async () => response;
      store.writeDiceLook(look("ivory")); await store.retryDiceLookSync();
      assert.equal(store.readDiceLookSyncStatus(), "save-error"); assert.deepEqual(store.readDiceLook(), look("ivory"));
      respond = async (call) => ack(call); await store.retryDiceLookSync(); assert.equal(store.readDiceLookSyncStatus(), "synced");
      store.writeDiceLook(look("bronze")); await store.retryDiceLookSync();
    }
  });

  await test("invalid hydrated dice fail visibly and unavailable storage retains this tab's choice", async () => {
    respond = async () => Response.json({ settings: { diceLook: { texture: "冰" } } });
    await store.retryDiceLookSync();
    assert.equal(store.readDiceLookSyncStatus(), "load-error");
    assert.deepEqual(store.readDiceLook(), look("bronze"));
    const storage = win.localStorage;
    win.localStorage = { getItem: () => { throw new Error("Unavailable"); }, setItem: () => { throw new Error("Unavailable"); } };
    respond = async (call) => ack(call);
    store.writeDiceLook(look("ice"));
    assert.deepEqual(store.readDiceLook(), look("ice"));
    await store.retryDiceLookSync(); assert.equal(store.readDiceLookSyncStatus(), "synced");
    win.localStorage = storage;
  });
} finally {
  globalThis.fetch = savedFetch;
  if (savedWindow === undefined) delete globalThis.window; else globalThis.window = savedWindow;
}
finish();
