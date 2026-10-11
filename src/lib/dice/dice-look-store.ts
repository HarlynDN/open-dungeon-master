"use client";

// The account's dice look, cached on this device. Same shape as the audio
// preferences (src/lib/audio-prefs.ts): localStorage is what the tray
// reads, synchronously and offline; the account copy exists so a second
// device shows the same dice. Hydrate once per page load, write every
// change through on a short debounce (colour pickers fire continuously),
// and retain local choices when a fetch fails. The editor observes sync
// status separately so a failed account write is not a silent success.

import { useSyncExternalStore } from "react";
import {
  DEFAULT_DICE_LOOK,
  isValidDiceLook,
  parseDiceLook,
  sameDiceLook,
  type DiceLook,
} from "@/lib/dice/dice-look";

export const DICE_LOOK_KEY = "odm:diceLook";
export const DICE_LOOK_EVENT = "odm-dice-look";

const FLUSH_DELAY_MS = 600;

let cached: DiceLook | null = null;
let cachedRaw: string | null = null;
let pending: DiceLook | null = null;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let hydration: Promise<void> | null = null;
let locallyWritten = false;
export type DiceLookSyncStatus = "idle" | "loading" | "saving" | "synced" | "load-error" | "save-error";
let syncStatus: DiceLookSyncStatus = "idle";
let revision = 0;
let flushing = false;
function publishSync(status: DiceLookSyncStatus) {
  syncStatus = status;
  window.dispatchEvent(new Event(DICE_LOOK_EVENT));
}

// Parsed once per distinct stored string so useSyncExternalStore sees a
// stable object between changes.
export function readDiceLook(): DiceLook {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(DICE_LOOK_KEY);
  } catch {
    // Storage unavailable: retain this tab's last choice.
    return cached ?? DEFAULT_DICE_LOOK;
  }
  if (raw === cachedRaw && cached) {
    return cached;
  }
  cachedRaw = raw;
  cached = raw ? parseDiceLook(safeJson(raw)) : DEFAULT_DICE_LOOK;
  return cached;
}

function safeJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function store(look: DiceLook) {
  const raw = JSON.stringify(look);
  try {
    window.localStorage.setItem(DICE_LOOK_KEY, raw);
    cachedRaw = raw;
  } catch {
    // Keep the old storage witness so reads retain the in-memory choice
    // until another tab changes the stored value.
  }
  cached = look;
  window.dispatchEvent(new Event(DICE_LOOK_EVENT));
}

async function flush() {
  if (flushing || !pending) return;
  flushing = true;
  try {
    while (pending) {
      const look = pending;
      const attemptedRevision = revision;
      pending = null;
      try {
        publishSync("saving");
        const response = await fetch("/api/profile", {
          method: "PATCH", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ settings: { diceLook: look } }),
        });
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        if (!isValidDiceLook(data?.settings?.diceLook) || !sameDiceLook(data.settings.diceLook, look)) throw new Error("Dice look was not acknowledged.");
        // Requests are serialized, so an older look cannot arrive last.
        if (!pending && attemptedRevision === revision) publishSync("synced");
      } catch {
        if (attemptedRevision !== revision) continue;
        if (!pending) pending = look;
        publishSync("save-error");
        break;
      }
    }
  } finally { flushing = false; }
}

// Local write plus debounced write-through: the only setter, so the cache
// and the account can never drift apart on purpose.
export function writeDiceLook(look: DiceLook) {
  if (sameDiceLook(look, readDiceLook())) {
    return;
  }
  locallyWritten = true;
  revision += 1;
  store(look);
  pending = look;
  publishSync("saving");
  if (flushTimer) {
    clearTimeout(flushTimer);
  }
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, FLUSH_DELAY_MS);
}

// Pulls the account copy into localStorage once per page load. A look
// changed here while the fetch was in flight wins over the account's.
export function hydrateDiceLook() {
  if (hydration) {
    return hydration;
  }
  const startedRevision = revision;
  publishSync("loading");
  hydration = fetch("/api/profile")
    .then((response) => { if (!response.ok) throw new Error(String(response.status)); return response.json(); })
    .then((data) => {
      if (!data || typeof data !== "object" || !data.settings || typeof data.settings !== "object") throw new Error("Malformed profile response.");
      if (data.settings.diceLook !== undefined && !isValidDiceLook(data.settings.diceLook)) throw new Error("Malformed dice look response.");
      if (startedRevision === revision) publishSync("synced");
      const remote = data?.settings?.diceLook;
      if (!remote || locallyWritten) {
        return;
      }
      const look = parseDiceLook(remote);
      if (!sameDiceLook(look, readDiceLook())) {
        store(look);
      }
    })
    .catch(() => {
      // The local copy stands.
      if (startedRevision === revision) publishSync("load-error");
    });
  return hydration;
}

export async function retryDiceLookSync() {
  if (pending) {
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
    await flush();
  } else {
    hydration = null;
    await hydrateDiceLook();
  }
}
export function readDiceLookSyncStatus(): DiceLookSyncStatus { return syncStatus; }
export function useDiceLookSyncStatus(): DiceLookSyncStatus {
  return useSyncExternalStore(subscribe, readDiceLookSyncStatus, () => "idle");
}

function subscribe(listener: () => void) {
  window.addEventListener(DICE_LOOK_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(DICE_LOOK_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

// The look as this device holds it, live across tabs and after hydration.
export function useDiceLook(): DiceLook {
  return useSyncExternalStore(subscribe, readDiceLook, () => DEFAULT_DICE_LOOK);
}
