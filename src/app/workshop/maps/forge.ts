import { MAP_SIZE, generateBattleMap, type GeneratedMap, type MapTheme } from "@/lib/battlemap/generate";
import type { AmbientLight } from "@/lib/battlemap/types";
import { normalizeMapHintWord, splitMapHintWords } from "@/lib/battlemap/hint-cues";

// The pure half of the Map Forge (docs/visual-overhaul-plan.md 4.1): what a
// roll is, what the history strip remembers, how the reveal floods, and what
// the generator read in the hint. No React and no DOM, so
// scripts/test-map-forge.mjs drives it under Node.
//
// The forge previews with the very generator the server saves with. The two
// agree because they are one function called with one set of arguments, which
// is what `forgeGenerate` pins down: the library asks for a party of four and
// four foes (src/lib/dm/map-library.ts createLibraryMap), so the preview does.

export type ForgeSettings = {
  width: number;
  height: number;
  // "" leaves it to the words in the hint.
  theme: MapTheme | "";
  ambient: AmbientLight | "";
  hint: string;
};

// One roll the history strip can bring back: the seed is all it takes.
export type ForgeRoll = ForgeSettings & { seed: number };

export const FORGE_START: ForgeSettings = { width: 20, height: 15, theme: "", ambient: "", hint: "" };
export const HISTORY_LIMIT = 7;
// How long a restored roll takes to draw itself back in.
export const RESTORE_MS = 900;

export function clampSize(width: number, height: number): { width: number; height: number } {
  const side = (value: number, min: number, max: number, fallback: number) =>
    Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : fallback;
  return {
    width: side(width, MAP_SIZE.minWidth, MAP_SIZE.maxWidth, 20),
    height: side(height, MAP_SIZE.minHeight, MAP_SIZE.maxHeight, 15),
  };
}

export function freshSeed(random: () => number = Math.random): number {
  return Math.floor(random() * 0xffffffff) >>> 0;
}

export function forgeGenerate(roll: ForgeRoll, genre: string | null | undefined): GeneratedMap {
  const hint = roll.hint.trim();
  return generateBattleMap({
    seed: roll.seed >>> 0,
    width: roll.width,
    height: roll.height,
    genre: genre ?? undefined,
    hint: hint || undefined,
    theme: roll.theme || undefined,
    ambient: roll.ambient || undefined,
    pcCount: 4,
    enemyCount: 4,
  });
}

// The body the library's create route takes for this roll, so keeping a map
// saves exactly what was previewed.
export function createBodyFor(roll: ForgeRoll): Record<string, unknown> {
  const hint = roll.hint.trim();
  return {
    do: "create",
    seed: roll.seed >>> 0,
    width: roll.width,
    height: roll.height,
    ...(hint ? { hint } : {}),
    ...(roll.theme ? { theme: roll.theme } : {}),
    ...(roll.ambient ? { ambient: roll.ambient } : {}),
  };
}

function sameRoll(a: ForgeRoll, b: ForgeRoll): boolean {
  return (
    a.seed === b.seed &&
    a.width === b.width &&
    a.height === b.height &&
    a.theme === b.theme &&
    a.ambient === b.ambient &&
    a.hint.trim() === b.hint.trim()
  );
}

// Newest first, seven deep. Bringing an old roll back moves it to the front
// instead of listing it twice.
export function pushHistory(history: readonly ForgeRoll[], roll: ForgeRoll): ForgeRoll[] {
  return [roll, ...history.filter((entry) => !sameRoll(entry, roll))].slice(0, HISTORY_LIMIT);
}

// ---- the reveal ----

export const FLOOD = { ringMs: 26, tileMs: 380 } as const;

// The gold sweep's length, and so the whole reveal's: bigger maps take longer.
export function sweepMs(width: number, height: number): number {
  return 520 + (width + height) * 16;
}

// The die turns once every 700ms (maps.css). This is how many whole turns
// cover the reveal, so it comes to rest upright as the map finishes.
export const DIE_TURN_MS = 700;
export function dieSpins(width: number, height: number, stretch = 1): number {
  return Math.max(1, Math.round((sweepMs(width, height) * stretch) / DIE_TURN_MS));
}

// Chebyshev distance of every tile from the centre, row-major: the ring it
// floods in on.
export function floodRings(width: number, height: number): { rings: number[]; last: number } {
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const rings: number[] = new Array(width * height);
  let last = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const ring = Math.floor(Math.max(Math.abs(x - cx), Math.abs(y - cy)));
      rings[y * width + x] = ring;
      last = Math.max(last, ring);
    }
  }
  return { rings, last };
}

// How far in a tile is, 0 to 1, `elapsed` ms after the roll.
export function floodProgress(ring: number, elapsed: number): number {
  const local = (elapsed - ring * FLOOD.ringMs) / FLOOD.tileMs;
  return local <= 0 ? 0 : local >= 1 ? 1 : local;
}

export function floodTotalMs(width: number, height: number): number {
  return floodRings(width, height).last * FLOOD.ringMs + FLOOD.tileMs;
}

// ---- the read-back ----
//
// The generator reads the hint with regular expressions it keeps to itself
// (src/lib/battlemap/generate.ts pickTheme). Copying them here would let the
// panel and the generator drift apart, so this asks the generator instead:
// each word is rolled on its own at the smallest size, and a word is "the one
// it matched" when it alone produces what the whole sentence produced. The
// quirks come along for free (it reads "cavernous", and "office" as ice).

export type HintHit = "theme" | "light" | "rough";
export type HintRead = {
  theme: MapTheme;
  ambient: AmbientLight;
  themeWord: string | null;
  lightWord: string | null;
  roughWord: string | null;
  // The hint split for display, each word marked with what it decided.
  words: Array<{ text: string; hit: HintHit | null }>;
};

const CAVE_PROBE_THEME: MapTheme = "cave";
const PROBE = { seed: 1, width: MAP_SIZE.minWidth, height: MAP_SIZE.minHeight, pcCount: 0, enemyCount: 0 } as const;

function defaultAmbient(theme: MapTheme): AmbientLight {
  return theme === "cave" ? "dark" : theme === "interior" ? "dim" : "bright";
}

type WordRead = { theme: MapTheme | null; light: AmbientLight | null; rough: boolean };
const wordReads = new Map<string, WordRead>();

function readWord(word: string): WordRead {
  const known = wordReads.get(word);
  if (known) {
    return known;
  }
  const solo = generateBattleMap({ ...PROBE, hint: word });
  const theme = solo.theme === "field" ? null : solo.theme;
  let light: AmbientLight | null = solo.ambient === defaultAmbient(solo.theme) ? null : solo.ambient;
  if (!light) {
    // A word for daylight changes nothing in a field, which is bright anyway;
    // under a cave's dark it shows.
    const under = generateBattleMap({ ...PROBE, hint: `${CAVE_PROBE_THEME} ${word}` });
    light = under.ambient === "bright" ? "bright" : null;
  }
  // The rough-ground words add blobs the same theme would not have had.
  const plain = generateBattleMap({ ...PROBE, theme: solo.theme, ambient: solo.ambient });
  const read = { theme, light, rough: plain.terrain !== solo.terrain };
  if (wordReads.size > 400) {
    wordReads.clear();
  }
  wordReads.set(word, read);
  return read;
}

export function readHint(hint: string, genre?: string | null): HintRead {
  const whole = generateBattleMap({ ...PROBE, hint: hint.trim() || undefined, genre: genre ?? undefined });
  const parts = splitMapHintWords(hint);
  const words: HintRead["words"] = parts.map((text) => ({ text, hit: null }));
  let themeWord: string | null = null;
  let lightWord: string | null = null;
  let roughWord: string | null = null;
  parts.forEach((part, index) => {
    const bare = normalizeMapHintWord(part);
    if (!bare) {
      return;
    }
    const read = readWord(bare);
    if (!themeWord && read.theme && read.theme === whole.theme) {
      themeWord = bare;
      words[index].hit = "theme";
    } else if (!lightWord && read.light && read.light === whole.ambient) {
      lightWord = bare;
      words[index].hit = "light";
    } else if (!roughWord && read.rough) {
      roughWord = bare;
      words[index].hit = "rough";
    }
  });
  return { theme: whole.theme, ambient: whole.ambient, themeWord, lightWord, roughWord, words };
}

export const AMBIENT_LABELS: Record<AmbientLight, string> = { bright: "Daylight", dim: "Dim", dark: "Dark" };

// Structured explanation facts are shared by native English and locale UI
// renderers, so copy changes cannot change which source decided a setting.
export type ForgeExplanation =
  | { kind: "themeOverride" | "setting" | "lightDefault"; theme: MapTheme }
  | { kind: "themeWord"; theme: MapTheme; word: string }
  | { kind: "field" }
  | { kind: "lightOverride"; light: AmbientLight }
  | { kind: "lightWord" | "rough"; word: string };

export function explainReadFacts(read: HintRead, settings: Pick<ForgeSettings, "theme" | "ambient">): ForgeExplanation[] {
  const out: ForgeExplanation[] = [];
  if (settings.theme) out.push({ kind: "themeOverride", theme: settings.theme });
  else if (read.themeWord) out.push({ kind: "themeWord", theme: read.theme, word: read.themeWord });
  else if (read.theme !== "field") out.push({ kind: "setting", theme: read.theme });
  else out.push({ kind: "field" });
  if (settings.ambient) out.push({ kind: "lightOverride", light: settings.ambient });
  else if (read.lightWord) out.push({ kind: "lightWord", word: read.lightWord });
  else out.push({ kind: "lightDefault", theme: settings.theme || read.theme });
  if (read.roughWord) out.push({ kind: "rough", word: read.roughWord });
  return out;
}

// Native callers keep the same English sentences. Player UI renders the same
// facts through locale templates, without translating raw hints or settings.
export function explainRead(read: HintRead, settings: Pick<ForgeSettings, "theme" | "ambient">, themeLabel: (theme: MapTheme) => string): string[] {
  return explainReadFacts(read, settings).map(fact => {
    switch (fact.kind) {
      case "themeOverride": return `You said ${themeLabel(fact.theme).toLowerCase()} outright, so the words do not pick the ground.`;
      case "themeWord": return `“${fact.word}” put this in ${themeLabel(fact.theme).toLowerCase()}.`;
      case "setting": return `The setting put this in ${themeLabel(fact.theme).toLowerCase()}.`;
      case "field": return "Nothing named a kind of place, so it is open ground.";
      case "lightOverride": return `You set the light to ${AMBIENT_LABELS[fact.light].toLowerCase()}.`;
      case "lightWord": return `“${fact.word}” set the light.`;
      case "lightDefault": return `The light is what ${themeLabel(fact.theme).toLowerCase()} usually has.`;
      case "rough": return `“${fact.word}” scattered rough ground.`;
    }
  });
}
