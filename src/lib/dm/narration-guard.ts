import { getEnemy } from "@/lib/db/encounters";
import { combatFallback, COMBAT_PRESENTATIONS } from "@/lib/dm/combat-narration";
import { normalizeLocale } from "@/lib/i18n/locales";
export { liveStateFor, leveledSpellNames } from "@/lib/dm/claims";
import { buildLinePrompt } from "@/lib/dm/safety-logic";
import { lineViolations } from "@/lib/dm/safety-lines-logic";
import type { Campaign } from "@/lib/db/campaigns";
import type { DmTurn } from "@/lib/db/dm-turns";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { requestDmMessage } from "@/lib/dm/model";
import { extractStoryText } from "@/lib/story-prompt";
import { stripToolText } from "@/lib/dm/tool-text";
import {
  buildCorrectionPrompt,
  checkNarration,
  guardOutcomes,
  ruleClaims,
  type Contradiction,
  type ResolvedOutcomes,
} from "@/lib/dm/engine-boundary";
import { claimKindsFor, type ClaimKind, type PartRead } from "@/lib/dm/claims-logic";
import { hasQuotedLine, type SpokenLine } from "@/lib/dm/speech";
import { guardGate, liveStateFor, readClaims } from "@/lib/dm/claims";

// The DB/model rim of the engine-boundary guard. The ruling lives in
// dm/engine-boundary.ts (pure) and the reading in dm/claims.ts; this file
// only decides what to do about a detection, and its answer is deliberately
// small: ask the model to fix its own prose, once.
//
// That one call is held in reserve outside the turn's four-call budget
// (GUARD_RESERVED_CALLS). The turns most likely to contradict their results
// are the busy ones (an attack, the extra attack, end_turn and the enemies),
// and those are exactly the turns that end with the budget spent; a guard
// that could only log there would miss the turns it exists for.
//
// Never touches mechanical state. The dice, the hit points, and the slots
// already resolved through their tools before the narration existed; a
// contradiction is a prose bug, so only prose is ever changed. When the
// rewrite is no better, engine conclusions replace the contradictory prose. The correction never
// replays mechanics or changes any resolved outcome.
//
// Its reads also say who speaks each quoted line of the narration that
// stands, which the turn stores with the message (src/lib/dm/speech.ts).

export const GUARD_RESERVED_CALLS = 1;

// The claim kinds the guard rules on for this turn, from engine state alone.
export function guardKinds(
  campaign: Campaign,
  outcomes: ResolvedOutcomes,
  sheets: readonly CharacterSheet[],
): ClaimKind[] {
  return claimKindsFor({
    ...guardGate(campaign, outcomes, sheets),
    rollAsk: false,
    fightStart: false,
    unrolled: false,
    speech: false,
  });
}

// What the narration contradicts, and who speaks its quoted lines: the
// claims already read with each part (the turn loop reads every reply it
// keeps), plus one read of the parts no read covered, ruled against the
// turn's outcomes and the encounter as it now stands.
async function readNarration(
  campaign: Campaign,
  turn: DmTurn,
  sheets: readonly CharacterSheet[],
  parts: readonly string[],
  partReads: ReadonlyMap<string, PartRead>,
): Promise<{ contradictions: Contradiction[]; lines: SpokenLine[] }> {
  const outcomes = guardOutcomes(turn.conversation, liveStateFor(campaign.id));
  const kinds = guardKinds(campaign, outcomes, sheets);
  const wanted = (part: string): ClaimKind[] => (hasQuotedLine(part) ? [...kinds, "speaker"] : kinds);
  // A part read before this turn's outcomes gave the guard more to check (an
  // attack resolved after its prose was read) was never asked those kinds,
  // so it is read again with all of them, and that read replaces its own.
  const covered = (part: string) => {
    const read = partReads.get(part);
    return read && wanted(part).every((kind) => read.kinds.includes(kind)) ? read : null;
  };
  const known = parts.flatMap((part) => covered(part)?.claims ?? []);
  const unread = parts.filter((part) => !covered(part));
  const read = await readClaims(campaign, {
    label: `turn ${turn.id}`,
    text: unread.join("\n\n"),
    kinds: [...new Set(unread.flatMap(wanted))],
    outcomes,
    sheets,
  });
  const claims = [...known, ...read];
  const deterministic = campaign.gameSettings.narrationGuard && campaign.gameSettings.locale === "zh-CN"
    ? checkNarration({ conversation: turn.conversation, narration: parts.join("\n\n"), locale: "zh-CN", partyNames: sheets.map(sheet => sheet.name), live: liveStateFor(campaign.id) })
    : [];
  return {
    contradictions: [...deterministic, ...ruleClaims(
      claims.filter((claim) => kinds.includes(claim.kind)),
      outcomes,
    )],
    lines: claims.flatMap((claim) => (claim.kind === "speaker" ? [{ line: claim.line, speaker: claim.speaker }] : [])),
  };
}

export async function enforceEngineBoundary(
  campaign: Campaign,
  turn: DmTurn,
  sheets: readonly CharacterSheet[],
  // What each kept reply was read for, by its persisted text.
  partReads: ReadonlyMap<string, PartRead> = new Map(),
): Promise<SpokenLine[]> {
  const narration = turn.narrationParts.join("\n\n").trim();
  const locale = normalizeLocale(campaign.gameSettings.locale);
  const fallback = (): SpokenLine[] => {
    const text = combatFallback(turn.conversation, locale, {
      names: Object.fromEntries(sheets.map(sheet => [sheet.id, sheet.name])),
      live: liveStateFor(campaign.id), resolveName: (id: string) => getEnemy(id)?.displayName,
    });
    turn.narrationParts.splice(0, turn.narrationParts.length,
      lineViolations(text, campaign.gameSettings.safety?.lines ?? [], campaign.gameSettings.tableLanguage).length ? COMBAT_PRESENTATIONS[locale].fallback : text);
    return [];
  };
  if (!narration) return fallback();
  // A line crossed is refused the same way a hit written on a miss is
  // (docs/vtt-parity-implementation-plan.md 9.1), whether or not the
  // outcome check is on: safety is not a setting.
  const lines = campaign.gameSettings.safety?.lines ?? [];
  const crossed = lineViolations(narration, lines, campaign.gameSettings.tableLanguage);
  const { contradictions, lines: spoken } = await readNarration(campaign, turn, sheets, turn.narrationParts, partReads);
  if (!contradictions.length && !crossed.length) {
    return spoken;
  }

  const summary = [...contradictions.map((entry) => entry.detail), ...crossed.map((line) => `line crossed: ${line}`)].join("; ");

  // The narration is echoed back explicitly: a turn that ended on a pure
  // narration call never pushed that assistant message into the conversation,
  // so without this the model would be asked to rewrite prose it cannot see and
  // would invent a fresh scene instead.
  const { message, error } = await requestDmMessage(
    campaign.settings,
    [
      ...turn.conversation,
      { role: "assistant", content: narration },
      {
        role: "user",
        content: [contradictions.length ? buildCorrectionPrompt(contradictions, locale) : "", crossed.length ? buildLinePrompt(crossed) : ""]
          .filter(Boolean)
          .join("\n\n"),
      },
    ],
    // No tools: this call exists to rewrite prose, and a tool call here would
    // resolve mechanics a second time. It is the reserved call, so it is
    // made whatever the turn's budget has left.
    { locale, tools: [], toolChoice: "none", thinking: false },
  );
  turn.callIndex += 1;
  if (error) {
    console.warn(`[engine-boundary] turn ${turn.id}: correction call failed (${summary})`);
    return fallback();
  }

  // Tool text the rewrite wrote out (a call it was not offered, as brackets,
  // XML or bare JSON) is stripped like every other narration path does;
  // stripToolText also drops hand-written roll markers.
  const corrected = stripToolText(extractStoryText(message?.content)).trim();
  // A stub reply cannot replace the scene: fall back to verified engine facts.
  if (corrected.length < Math.min(locale === "zh-CN" ? 40 : 120, Math.floor(narration.length / 3))) {
    console.warn(
      `[engine-boundary] turn ${turn.id}: correction came back too short to use (${summary})`,
    );
    return fallback();
  }
  // Keep a rewrite only when it removes all detected contradictions; otherwise
  // use verified engine facts instead of persisting either invalid version.
  const { contradictions: remaining, lines: respoken } = await readNarration(campaign, turn, sheets, [corrected], new Map());
  const stillCrossed = lineViolations(corrected, lines, campaign.gameSettings.tableLanguage);
  if (remaining.length > 0 || stillCrossed.length > 0) {
    console.warn(
      `[engine-boundary] turn ${turn.id}: correction did not resolve the contradiction (${summary})`,
    );
    return fallback();
  }
  // finalize() renders the turn's dice cards between the last narration part
  // and the ones before it, so a multi-part turn keeps that shape: the rewrite
  // splits back at its final paragraph break rather than collapsing to one
  // block and pushing every roll card above the whole message.
  const multiPart = turn.narrationParts.length > 1;
  const paragraphs = corrected.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  turn.narrationParts.length = 0;
  if (multiPart && paragraphs.length > 1) {
    turn.narrationParts.push(
      paragraphs.slice(0, -1).join("\n\n"),
      paragraphs[paragraphs.length - 1],
    );
    return respoken;
  }
  turn.narrationParts.push(corrected);
  return respoken;
}
