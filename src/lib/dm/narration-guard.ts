import { buildLinePrompt, lineViolations } from "@/lib/dm/safety-logic";
import type { Campaign } from "@/lib/db/campaigns";
import type { DmTurn } from "@/lib/db/dm-turns";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { requestDmMessage } from "@/lib/dm/model";
import { extractStoryText } from "@/lib/story-prompt";
import { stripToolText } from "@/lib/dm/tool-text";
import {
  buildCorrectionPrompt,
  checkNarration,
  normalizeSpellName,
  type LiveState,
} from "@/lib/dm/engine-boundary";
import { getActiveEncounter, getEnemy, listEnemies } from "@/lib/db/encounters";
import { combatConclusions, combatFallback, combatNarrationPrompt, COMBAT_PRESENTATIONS } from "@/lib/dm/combat-narration";
import { resolveNarration } from "@/lib/dm/narration-policy";
import { normalizeLocale } from "@/lib/i18n/locales";
import spellManifest from "@/lib/srd/manifest/spells.json";

// The DB/model rim of the engine-boundary guard. All the matching lives in
// dm/engine-boundary.ts (pure); this file only decides what to do about a
// detection, and its answer is deliberately small: ask the model to fix its
// own prose, once.
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
// rewrite is invalid or unavailable, only engine-confirmed conclusions are
// published. Incorrect prose must never become the final text or TTS input.

export const GUARD_RESERVED_CALLS = 1;

type ManifestSpell = { n: string; l: number; a?: string[] };

let leveled: string[] | null = null;

// Every leveled spell in the bundled spell checklist, with its aliases,
// normalized the way the guard compares names. Cantrips are left out:
// casting one spends nothing, so a missing tool call proves nothing.
export function leveledSpellNames(): string[] {
  if (!leveled) {
    leveled = [
      ...new Set(
        (spellManifest as { spells: ManifestSpell[] }).spells
          .filter((spell) => spell.l >= 1)
          .flatMap((spell) => [spell.n, ...(spell.a ?? [])])
          .map(normalizeSpellName)
          .filter((name) => name.length >= 3),
      ),
    ];
  }
  return leveled;
}

// The running fight's enemies as they stand now, after every call this
// turn made: what a tool-less kill or a refused attack is checked against.
export function liveStateFor(campaignId: string): LiveState | null {
  const encounter = getActiveEncounter(campaignId);
  if (!encounter) {
    return null;
  }
  return {
    enemies: listEnemies(encounter.id).map((enemy) => ({
      id: enemy.id,
      name: enemy.displayName,
      hp: enemy.currentHp,
      maxHp: enemy.maxHp,
      status: enemy.status,
    })),
  };
}

export async function enforceEngineBoundary(
  campaign: Campaign,
  turn: DmTurn,
  sheets: readonly CharacterSheet[],
): Promise<void> {
  const narration = turn.narrationParts.join("\n\n").trim();
  const locale = normalizeLocale(campaign.gameSettings.locale);
  const lines = campaign.gameSettings.safety?.lines ?? [];
  const partyNames = sheets.map(sheet => sheet.name);
  const live = liveStateFor(campaign.id);
  const leveledSpells = leveledSpellNames();
  const factsOptions = { names: Object.fromEntries(sheets.map(sheet => [sheet.id, sheet.name])), live, resolveName: (id: string) => getEnemy(id)?.displayName };
  const conclusions = combatConclusions(turn.conversation, locale, factsOptions);
  if (!narration && !conclusions) return;
  const contradictionsFor = (text: string) => campaign.gameSettings.narrationGuard
    ? checkNarration({ locale, conversation: turn.conversation, narration: text, partyNames, live, leveledSpells })
    : [];
  const contradictions = contradictionsFor(narration);
  const crossed = lineViolations(narration, lines);
  const fallback = () => {
    const content = combatFallback(turn.conversation, locale, factsOptions);
    // A player-supplied name may itself cross a table's line.
    return lineViolations(content, lines).length ? COMBAT_PRESENTATIONS[locale].fallback : content;
  };
  const resolved = !narration ? { narration: fallback(), status: "fallback" as const } : await resolveNarration({
    narration,
    valid: text => !contradictionsFor(text).length && !lineViolations(text, lines).length,
    fallback,
    rewrite: async () => {
      turn.callIndex += 1;
      const { message, error } = await requestDmMessage(campaign.settings, [
        ...turn.conversation,
        { role: "assistant", content: narration },
        { role: "user", content: [
          contradictions.length ? buildCorrectionPrompt(contradictions, locale) : "",
          crossed.length ? buildLinePrompt(crossed) : "",
          combatNarrationPrompt(turn.conversation, locale, factsOptions),
        ].filter(Boolean).join("\n\n") },
      ], { locale, tools: [], toolChoice: "none", thinking: false });
      return error ? null : stripToolText(extractStoryText(message?.content)).trim();
    },
  });
  if (resolved.status === "fallback") console.warn(`[engine-boundary] turn ${turn.id}: using engine conclusions (${"reason" in resolved ? resolved.reason : "empty narration"})`);
  // The immutable conclusions are composed by the final message writer, not
  // stored as AI prose; alternative takes can preserve them byte for byte.
  const content = resolved.narration;
  const multiPart = turn.narrationParts.length > 1;
  const paragraphs = content.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  turn.narrationParts.length = 0;
  if (multiPart && paragraphs.length > 1) {
    turn.narrationParts.push(paragraphs.slice(0, -1).join("\n\n"), paragraphs[paragraphs.length - 1]);
  } else {
    turn.narrationParts.push(content);
  }
}
