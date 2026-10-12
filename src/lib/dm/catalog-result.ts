// What the console shows after an adjudication runs.
//
// The engine answers each call with whatever its handler returns, written
// for the model to narrate from: `hp: "12/30"`, `resistance: "Tharn is
// resistant to fire"`, `tempHpAbsorbed: 5`, `concentrationBroken: "Bless"`,
// a `results` row per creature caught in an area. The console used to read
// four of those keys and print "Done." for everything else, so a person
// running the table learned less from the engine than the model did (U:UD3).
// This turns any result into short lines a person reads: the numbers that
// changed first, then the engine's own sentences, then one line per
// creature an area touched.
//
// Pure: no I/O, so scripts/test-invoke-catalog.mjs drives it directly.

export type ResultTone = "good" | "bad" | "info";
export type ResultLine = { text: string; tone: ResultTone };

// Optional display adapter; the default still yields the original English
// protocol-derived readout. It never changes handler results or verdicts.
export type ResultPresentation = {
  frame: (source: string, values: Record<string, string | number>) => string;
  term: (kind: string, value: string) => string;
  native: (source: string, key: string) => string;
  label: (key: string, fallback: string) => string;
  join: (parts: string[], separator: string) => string;
};
function frame(p: ResultPresentation | undefined, source: string, values: Record<string, string | number> = {}): string {
  return p ? p.frame(source, values) : source.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
const term = (p: ResultPresentation | undefined, kind: string, value: string) => p?.term(kind, value) ?? value;
const native = (p: ResultPresentation | undefined, text: string, key: string) => p?.native(forAPerson(text), key) ?? text;
const join = (p: ResultPresentation | undefined, parts: string[], separator = ", ") => p?.join(parts, separator) ?? parts.join(separator);

type Row = Record<string, unknown>;

const isRecord = (value: unknown): value is Row =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

// Keys that only make sense to software: ids, flags already said another
// way, and the bookkeeping a handler returns for the turn loop.
const QUIET = new Set([
  "ok", "_parked", "campaignId", "turnId", "stage", "seq", "id",
  "halfOnSave", "saveAbility", "noSave", "ranged",
  // The lair's printed options, which the DM has just chosen among.
  "lairActions",
]);

// Sentences a handler writes for the narrator, shown as they are.
const SENTENCE_KEYS = [
  "note", "combat", "summary", "resistance", "wildShape", "rageEnded", "prone",
  "relentlessRage", "deathWard", "form", "released", "duration", "spellNote",
  "damageNote", "corrected", "outcome",
  // Where a spell's area was laid and what it does (src/lib/dm/zone-cast.ts).
  "area",
];

// Lists of the engine's sentences, one line each: what a walk met on the way
// (a spell area's spikes or hold, an opportunity attack).
const SENTENCE_LISTS: Array<{ key: string; tone: ResultTone }> = [
  { key: "opportunityAttacks", tone: "bad" },
  { key: "zoneEffects", tone: "bad" },
];

// The same results carry orders written for the model ("Now call
// request_roll ...", "Narrate the ambush landing", "positions appear in GAME
// STATE on your next call") and the ids it needs for its next call. A person
// at the console needs neither: the orders are dropped, the ids cut, and the
// initiative order turned into who the table is waiting on.
const MODEL_ORDER = /^(now call|call |narrate|telegraph)|game state|your next call/i;

function forAPerson(text: string): string {
  const waiting = text.match(/^Now call request_roll with kind=initiative for EACH character: (.+?)\.\s/i);
  const plain = waiting ? `Waiting on initiative from ${waiting[1]}. ${text.slice(waiting[0].length)}` : text;
  return plain
    .replace(/\s*\((?:character|enemy|token|sheet)Id=[^)]*\)/g, "")
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.trim() && !MODEL_ORDER.test(sentence.trim()))
    .join(" ")
    .trim();
}

function words(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/_/g, " ").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function scalar(value: unknown): string | null {
  if (typeof value === "string") {
    return value.trim() || null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  if (Array.isArray(value) && value.every((entry) => typeof entry === "string" || typeof entry === "number")) {
    return value.length ? value.join(", ") : null;
  }
  return null;
}

// One creature an area or a split touched: "Goblin 1: failed the save (8), 14 damage, dead".
function describeRow(row: Row, p?: ResultPresentation): ResultLine | null {
  const who = scalar(row.target) ?? scalar(row.name) ?? scalar(row.character) ?? scalar(row.enemy);
  if (!who) {
    return null;
  }
  const parts: string[] = [];
  if (typeof row.success === "boolean") {
    const rolled = typeof row.save === "number" ? ` (${row.save})` : "";
    parts.push(frame(p, row.success ? "made the save{rolled}" : "failed the save{rolled}", { rolled }));
  }
  if (typeof row.autoFailed === "string") {
    parts.push(frame(p, "failed automatically: {reason}", { reason: native(p, row.autoFailed, "autoFailed") }));
  }
  const damage = typeof row.damage === "number" ? row.damage : typeof row.amount === "number" ? row.amount : null;
  if (damage !== null) {
    parts.push(frame(p, "{damage} damage", { damage }));
  }
  for (const key of ["hp", "health", "conditionApplied", "note", "resistance"]) {
    const text = scalar(row[key]);
    if (text) {
      parts.push(key === "hp" ? frame(p, "HP {hp}", { hp: text }) : native(p, text, key));
    }
  }
  // Prismatic Spray: the rays each creature drew and what each did
  // (src/lib/dm/prismatic.ts), the engine's own words.
  const rays = scalar(row.rays);
  if (rays) {
    parts.push(frame(p, Array.isArray(row.rays) && row.rays.length > 1 ? "rays {rays}" : "ray {rays}", { rays: Array.isArray(row.rays) ? join(p, row.rays.map(ray => term(p, "color", String(ray)))) : term(p, "color", rays) }));
  }
  if (Array.isArray(row.effects)) {
    parts.push(...row.effects.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "").map(text => native(p, text, "effects")));
  }
  if (typeof row.tempHpAbsorbed === "number" && row.tempHpAbsorbed > 0) {
    parts.push(frame(p, "temp HP absorbed {amount}", { amount: row.tempHpAbsorbed }));
  }
  if (typeof row.concentrationBroken === "string") {
    parts.push(frame(p, "concentration on {spell} broken", { spell: term(p, "spell", row.concentrationBroken) }));
  }
  if (row.dead === true) {
    parts.push(frame(p, "dead"));
  } else if (row.dropped === true) {
    parts.push(frame(p, "down at 0 HP"));
  }
  const bad = row.dead === true || row.dropped === true || typeof row.concentrationBroken === "string";
  // A row can say the same thing twice (its health word "dead" and its dead
  // flag): each part is said once.
  const said = new Set<string>();
  const once = parts.filter((part) => {
    const key = part.trim().toLowerCase();
    if (said.has(key)) return false;
    said.add(key);
    return true;
  });
  return { text: frame(p, "{who}: {effects}", { who: term(p, "name", who), effects: join(p, once) || frame(p, "no effect") }), tone: bad ? "bad" : "info" };
}

function concentrationLine(value: unknown, p?: ResultPresentation): ResultLine | null {
  if (!isRecord(value)) {
    return null;
  }
  const spell = scalar(value.spell) ? term(p, "spell", scalar(value.spell)!) : frame(p, "their spell");
  const rolled = typeof value.rolled === "number" ? frame(p, "rolled {total}", { total: value.rolled }) : null;
  const dc = typeof value.dc === "number" ? frame(p, "DC {dc}", { dc: value.dc }) : null;
  const held = value.held === true || value.kept === true || value.broken === false;
  const broken = value.held === false || value.kept === false || value.broken === true;
  const verdict = held ? frame(p, "held") : broken ? frame(p, "broken") : null;
  const detail = join(p, [rolled && dc ? frame(p, "{rolled} against {dc}", { rolled, dc }) : rolled ?? dc, verdict].filter((part): part is string => Boolean(part)));
  return {
    text: frame(p, detail ? "Concentration on {spell}: {detail}" : "Concentration on {spell}", { spell, detail }),
    tone: broken ? "bad" : "info",
  };
}

export function describeAdjudicationResult(result: unknown, p?: ResultPresentation): ResultLine[] {
  if (!isRecord(result)) {
    return [{ text: frame(p, "Done."), tone: "good" }];
  }
  const lines: ResultLine[] = [];
  const used = new Set<string>();
  const take = (key: string) => {
    used.add(key);
    return result[key];
  };

  // The roll, when there was one.
  const total = take("total");
  const success = take("success");
  if (typeof total === "number") {
    const verdict = typeof success === "boolean" ? frame(p, success ? ", success" : ", failure") : "";
    lines.push({ text: frame(p, "Rolled {total}{verdict}", { total, verdict }), tone: success === false ? "bad" : "info" });
  } else if (typeof success === "boolean") {
    lines.push({ text: frame(p, success ? "Success" : "Failure"), tone: success ? "good" : "bad" });
  }
  const hit = take("hit");
  if (typeof hit === "boolean") {
    const crit = take("crit") === true;
    lines.push({ text: frame(p, hit ? (crit ? "Critical hit" : "Hit") : "Miss"), tone: hit ? "good" : "info" });
  }

  // What the hit points did.
  const damage = take("damage") ?? take("damageApplied") ?? take("damageRolled");
  used.add("damageApplied");
  used.add("damageRolled");
  if (typeof damage === "number") {
    lines.push({ text: frame(p, "{damage} damage", { damage }), tone: "info" });
  }
  const hp = scalar(take("hp"));
  if (hp) {
    lines.push({ text: frame(p, "HP now {hp}", { hp }), tone: "info" });
  }
  const health = scalar(take("health"));
  if (health) {
    lines.push({ text: native(p, health, "health"), tone: "info" });
  }
  const absorbed = take("tempHpAbsorbed");
  if (typeof absorbed === "number" && absorbed > 0) {
    lines.push({ text: frame(p, "Temporary hit points absorbed {amount}", { amount: absorbed }), tone: "info" });
  }
  const broken = take("concentrationBroken");
  if (typeof broken === "string" && broken) {
    lines.push({ text: frame(p, "Concentration on {spell} broken", { spell: term(p, "spell", broken) }), tone: "bad" });
  }
  const concentration = concentrationLine(take("concentration"), p);
  if (concentration) {
    lines.push(concentration);
  }
  const enemyConcentration = concentrationLine(take("enemyConcentration"), p);
  if (enemyConcentration) {
    lines.push(enemyConcentration);
  }
  if (take("dead") === true) {
    lines.push({ text: frame(p, "Dead"), tone: "bad" });
  } else if (take("dropped") === true) {
    lines.push({ text: frame(p, "Down at 0 HP"), tone: "bad" });
  }
  const dying = scalar(take("dying"));
  if (dying) {
    lines.push({ text: frame(p, "Dying: {detail}", { detail: native(p, dying, "dying") }), tone: "bad" });
  }

  // The save the effect forced, in the words a table uses: "DEX save, DC 15".
  const dc = take("dc");
  if (typeof dc === "number") {
    const ability = scalar(result.saveAbility);
    lines.push({ text: ability ? frame(p, "{ability} save, DC {dc}", { ability: term(p, "ability", ability.toUpperCase()), dc }) : frame(p, "Save DC {dc}", { dc }), tone: "info" });
  }

  // The engine's own sentences.
  for (const key of SENTENCE_KEYS) {
    const text = scalar(take(key));
    if (text) {
      lines.push({ text: native(p, text, key), tone: "info" });
    }
  }

  for (const { key, tone } of SENTENCE_LISTS) {
    const list = take(key);
    if (Array.isArray(list)) {
      for (const text of list) {
        if (typeof text === "string" && text.trim()) {
          lines.push({ text: native(p, text.trim(), key), tone });
        }
      }
    }
  }

  // One line per creature an area or a split touched.
  for (const key of ["results", "targets", "hits", "rows"]) {
    const rows = take(key);
    if (Array.isArray(rows)) {
      for (const row of rows) {
        const line = isRecord(row) ? describeRow(row, p) : null;
        if (line) {
          lines.push(line);
        }
      }
    }
  }
  if (take("encounterOver") === true) {
    lines.push({ text: frame(p, "The fight is over."), tone: "good" });
  }
  // A round number on its own reads as a label; with a sentence that already
  // names the round it is said once.
  const round = take("round");
  if (typeof round === "number" && !lines.some((line) => line.text.toLowerCase().includes(frame(p, "Round {round}", { round }).toLowerCase()))) {
    lines.push({ text: frame(p, "Round {round}", { round }), tone: "info" });
  }

  // Anything else a handler said in words, labelled by its key.
  for (const [key, value] of Object.entries(result)) {
    if (used.has(key) || QUIET.has(key) || /Ids?$/.test(key)) {
      continue;
    }
    const text = scalar(value);
    if (text) {
      lines.push({ text: typeof value === "string" && /\s/.test(value) ? native(p, text, key) : frame(p, "{label}: {value}", { label: p?.label(key, words(key)) ?? words(key), value: term(p, key, text) }), tone: "info" });
    } else if (value === true) {
      lines.push({ text: p?.label(key, words(key)) ?? words(key), tone: "info" });
    }
  }
  const readable = lines
    .map((line) => ({ ...line, text: forAPerson(line.text) }))
    .filter((line) => line.text);
  return readable.length ? readable : [{ text: frame(p, "Done."), tone: "good" }];
}
