import { referenceSearchNames } from "@/lib/i18n/reference-search";
import { APP_LOCALES, type AppLocale } from "@/lib/i18n/locales";
import { DM_ACTION_MESSAGES } from "@/lib/i18n/dm-action-messages";
import { DM_ACTION_KEYWORDS } from "@/lib/i18n/dm-action-keywords";
import { dmActionSource } from "@/lib/i18n/dm-action-presentations";
import type { Campaign } from "@/lib/db/campaigns";
import { spellAuthorsFor } from "@/lib/dm/spell-authors";
import { bestiaryFor, bestiaryForGenre, resolveMonster, suggestEnemies } from "@/lib/bestiary";
import { synthesizeStats } from "@/lib/bestiary/synthesize";
import type { EnemyStats } from "@/lib/bestiary/statblock";
import { listSheets } from "@/lib/db/sheets";
import { arcTextTimeoutMs } from "@/lib/model-client";
import { requestUtilityMessage } from "@/lib/dm/model";
import { ADJUDICATIONS } from "@/lib/dm/invoke-catalog";
import { findAdjudication } from "@/lib/dm/catalog-types";
import {
  parseSuggestionJson,
  rankAdjudications,
  type ParsedSuggestion,
} from "@/lib/dm/assist-logic";
import { parseRollTable, TABLE_MAX_ENTRIES, type RollTableEntry } from "@/lib/dm/roll-table-logic";
import { stripReasoningArtifacts } from "@/lib/story-prompt";

// The DM's assist rail: read-only answers from engines that already exist.
// Nothing here applies anything. Every function returns something the DM
// looks at and then decides about, which is the whole contract of the phase.

// ---- intent to adjudication ----

export type SuggestedAdjudication = {
  name: string;
  label: string;
  summary: string;
  // Prefilled arguments, present only on the model's own pick.
  args?: Record<string, unknown>;
  why?: string;
};

const SUGGEST_SYSTEM =
  'You map a player\'s stated intention onto exactly one action the rules engine can perform. You are given a shortlist of candidate actions with their arguments. Return STRICT JSON only, no code fences, shaped: {"name": string, "args": object, "why": string}. name MUST be one of the candidate names. args fills in what you can infer from the intention and leaves out what you cannot; never invent a character name or an id that is not given to you. why is one short clause saying what the roll or effect is for. If none of the candidates fits, return the closest one with empty args.';

// A keyword shortlist first, always, then one small model call to pick among
// it and prefill. The shortlist is what the DM sees if the model is slow,
// unreachable, or simply wrong.
export async function suggestAdjudication(
  campaign: Campaign,
  intent: string,
  options: { inEncounter: boolean; useModel?: boolean },
): Promise<{ suggestions: SuggestedAdjudication[]; picked: ParsedSuggestion | null }> {
  const ranked = rankAdjudications(intent, ADJUDICATIONS, {
    inEncounter: options.inEncounter,
    limit: 5,
    localizedText: entry => {
      const source = dmActionSource(entry);
      return source ? APP_LOCALES.map(locale => ({ label: DM_ACTION_MESSAGES[locale][source.labelKey], summary: DM_ACTION_MESSAGES[locale][source.summaryKey], keywords: DM_ACTION_KEYWORDS[locale][entry.name] })) : [];
    },
  });
  const suggestions: SuggestedAdjudication[] = ranked.map(({ entry }) => ({
    name: entry.name,
    label: entry.label,
    summary: entry.summary,
  }));
  if (!ranked.length || options.useModel === false) {
    return { suggestions, picked: null };
  }

  const candidates = ranked
    .map(({ entry }) => {
      const fields = entry.fields
        .map((field) => `${field.name} (${field.kind}${field.required ? ", required" : ""})`)
        .join(", ");
      return `- ${entry.name}: ${entry.summary}\n  arguments: ${fields || "none"}`;
    })
    .join("\n");
  const roster = listSheets(campaign.id)
    .map((sheet) => `${sheet.name} (id ${sheet.id})`)
    .join("; ");

  const { message, error } = await requestUtilityMessage(
    campaign.settings,
    [
      { role: "system", content: SUGGEST_SYSTEM },
      {
        role: "user",
        content: [
          `Player's intention: ${intent}`,
          roster ? `The party: ${roster}` : "",
          `Candidate actions:\n${candidates}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      },
    ],
    { locale: campaign.gameSettings.locale, timeoutMs: arcTextTimeoutMs() },
  );
  if (error) {
    return { suggestions, picked: null };
  }
  const parsed = parseSuggestionJson(stripReasoningArtifacts(String(message?.content ?? "")));
  // A pick that names something outside the shortlist is discarded rather
  // than trusted: the console would render a form for an action the DM never
  // saw proposed.
  if (!parsed || !ranked.some(({ entry }) => entry.name === parsed.name)) {
    return { suggestions, picked: null };
  }
  const entry = findAdjudication(ADJUDICATIONS, parsed.name);
  if (entry) {
    const index = suggestions.findIndex((item) => item.name === parsed.name);
    if (index >= 0) {
      suggestions[index] = { ...suggestions[index], args: parsed.args, why: parsed.why };
      // The model's pick leads the list.
      suggestions.unshift(...suggestions.splice(index, 1));
    }
  }
  return { suggestions, picked: parsed };
}

// ---- quick statblock ----

export type StatblockMatch = {
  slug: string;
  name: string;
  cr: number;
  type: string;
  blurb: string;
  // True only for the identical repository genre entry, not a pack reskin.
  ownedName?: boolean;
};

// The genre catalog, filtered by name, blurb or creature type ("undead"
// lists every undead in the roster). With no query it returns the CR-spread
// shortlist the encounter builder already uses, so an empty box is still a
// useful answer.
export function searchStatblocks(campaign: Campaign, query: string, locale?: AppLocale): StatblockMatch[] {
  const setting = campaign.gameSettings;
  const trimmed = query.trim().toLowerCase();
  const originals = bestiaryForGenre(setting.genre);
  const owned = (entry: { slug: string; name: string; cr: number; type: string; blurb: string }) => originals.some(source =>
    source.slug === entry.slug && source.name === entry.name && source.cr === entry.cr && source.type === entry.type && source.blurb === entry.blurb);
  const terms = [trimmed, ...(locale ? referenceSearchNames("monster", query, locale) : [])];
  if (!trimmed) {
    const levels = listSheets(campaign.id).map((sheet) => sheet.level);
    return suggestEnemies(setting, levels, 12).map((entry) => ({
      slug: entry.slug,
      name: entry.name,
      cr: entry.cr,
      type: entry.type,
      blurb: entry.blurb,
      ownedName: owned(entry),
    }));
  }
  return bestiaryFor(setting)
    .filter(
      (entry) =>
        terms.some(term => entry.name.toLowerCase().includes(term) ||
          entry.slug.includes(term) || entry.type === term || entry.blurb.toLowerCase().includes(term)),
    )
    .slice(0, 12)
    .map((entry) => ({
      slug: entry.slug,
      name: entry.name,
      cr: entry.cr,
      type: entry.type,
      blurb: entry.blurb,
      ownedName: owned(entry),
    }));
}

export type StatblockResult = {
  name: string;
  // The catalog's reskin name when the setting renames the base monster.
  reskinName: string | null;
  stats: EnemyStats;
  // True when nothing matched and the numbers came from the DMG's
  // by-CR baseline instead of a real stat block.
  synthesized: boolean;
  ownedName?: boolean;
  baselineName?: boolean;
};

// One monster, resolved the same way the spawner resolves it, so what the DM
// previews is exactly what start_encounter would put on the board. Falls back
// to the DMG baseline at a requested CR, which is what "generate at a target
// CR" means: honest numbers, no invention.
export function quickStatblock(
  campaign: Campaign,
  input: { ref?: string; cr?: number },
): StatblockResult | null {
  const ref = (input.ref ?? "").trim();
  if (ref) {
    const resolved = resolveMonster(ref, campaign.gameSettings, {
      userIds: spellAuthorsFor(campaign),
    });
    if (resolved) {
      const name = resolved.reskinName ?? resolved.baseName;
      const entry = bestiaryFor(campaign.gameSettings).find(row => row.slug === resolved.slug);
      const original = bestiaryForGenre(campaign.gameSettings.genre).find(row => row.slug === resolved.slug);
      const ownedName = Boolean(entry && original && name === original.name && entry.name === original.name && entry.blurb === original.blurb && entry.type === original.type && entry.cr === original.cr);
      return {
        name, ownedName,
        reskinName: resolved.reskinName,
        stats: resolved.stats,
        synthesized: false,
      };
    }
  }
  if (typeof input.cr === "number") {
    return {
      name: ref || `CR ${input.cr} threat`,
      reskinName: null,
      stats: synthesizeStats(input.cr),
      synthesized: true,
      baselineName: !ref,
    };
  }
  return null;
}

// ---- roll table generation ----

const TABLE_SYSTEM =
  "You write random tables for a tabletop RPG session. Output ONLY the rows, one per line, each beginning with its number and a full stop, like '1. A cart has thrown a wheel across the road.' No heading, no commentary, no blank lines. Each row is one concrete thing a Dungeon Master can drop straight into play, under 25 words, in the tone of the setting you are given.";

export async function generateRollTable(
  campaign: Campaign,
  input: { prompt: string; rows: number; context?: string },
): Promise<{ entries: RollTableEntry[]; error?: string }> {
  const rows = Math.max(2, Math.min(TABLE_MAX_ENTRIES, Math.round(input.rows)));
  const { message, error } = await requestUtilityMessage(
    campaign.settings,
    [
      { role: "system", content: TABLE_SYSTEM },
      {
        role: "user",
        content: [
          `Setting: ${campaign.theme || campaign.gameSettings.genre.replace(/_/g, " ")}`,
          input.context ? `Where this happens: ${input.context}` : "",
          `Write a ${rows}-row table: ${input.prompt}`,
        ]
          .filter(Boolean)
          .join("\n"),
      },
    ],
    { locale: campaign.gameSettings.locale, timeoutMs: arcTextTimeoutMs() },
  );
  if (error) {
    return { entries: [], error: "The model could not be reached." };
  }
  const entries = parseRollTable(
    stripReasoningArtifacts(String(message?.content ?? "")),
  ).slice(0, rows);
  if (entries.length < 2) {
    return { entries: [], error: "The model returned nothing usable." };
  }
  return { entries };
}
