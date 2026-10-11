import { proposalSummary, PROPOSAL_TOOL_NAMES, VITALS_PROPOSAL_TOOL_NAMES, type ProposalArgs } from "./proposal-logic.ts";

// Read-only presentation metadata. Never passed to a mutation or persisted in
// args_json. The original English summary binds it to this exact proposal.
export type ProposalSummaryDetail = {
  version: 1;
  toolName: string;
  english: string;
  characterName: string;
  args: ProposalArgs;
};
const fields = ["name", "item", "qty", "delta", "price", "action", "amount", "type", "temp", "spell", "condition", "rounds"] as const;
const numbers = new Set(["qty", "delta", "price", "amount", "rounds"]);
function safeArgs(raw: unknown): ProposalArgs | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>, out: Record<string, unknown> = {};
  for (const field of fields) {
    const value = input[field];
    if (value === undefined || value === null) continue;
    if (numbers.has(field)) {
      if (typeof value !== "number" && typeof value !== "string") return null;
      const n = Number(value);
      if (!Number.isFinite(n)) return null;
      out[field] = n;
    } else if (field === "temp") {
      if (typeof value !== "boolean") return null;
      out[field] = value;
    } else {
      if (typeof value !== "string") return null;
      out[field] = value;
    }
  }
  // Native products must remain finite too (e.g. price times quantity).
  if (!Number.isFinite(Number(out.price ?? 0) * Math.max(1, Number(out.qty ?? 1)))) return null;
  return out;
}
const known = (tool: string) => PROPOSAL_TOOL_NAMES.has(tool) || VITALS_PROPOSAL_TOOL_NAMES.has(tool);

export function proposalSummaryDetail(toolName: string, raw: unknown, english: string): ProposalSummaryDetail | null {
  if (!known(toolName)) return null;
  const args = safeArgs(raw);
  if (!args) return null;
  // All eight native summaries contain one actor. Match exact known argument
  // text on both sides; names containing English prepositions are not parsed.
  const marker = "{{odm-proposal-actor}}";
  const parts = proposalSummary(toolName, args, marker).split(marker);
  if (parts.length !== 2 || !english.startsWith(parts[0]) || !english.endsWith(parts[1])) return null;
  const characterName = english.slice(parts[0].length, parts[1].length ? -parts[1].length : undefined);
  if (!characterName.trim() || proposalSummary(toolName, args, characterName) !== english) return null;
  return { version: 1, toolName, english, characterName, args };
}

export function validProposalSummaryDetail(raw: unknown, english: string, toolName: string): ProposalSummaryDetail | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const detail = raw as Record<string, unknown>;
  if (detail.version !== 1 || detail.toolName !== toolName || detail.english !== english || typeof detail.characterName !== "string") return null;
  const checked = proposalSummaryDetail(toolName, detail.args, english);
  return checked?.characterName === detail.characterName ? checked : null;
}
