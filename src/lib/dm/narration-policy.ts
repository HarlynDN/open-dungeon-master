export type NarrationResolution = { narration: string; status: "unchanged" | "corrected" | "fallback"; reason?: "unavailable" | "empty" | "contradiction" };

// Shared by final narration and alternative takes. This policy cannot roll dice
// or mutate game state; the only optional effect is one text-only rewrite.
export async function resolveNarration(input: {
  narration: string;
  valid: (text: string) => boolean;
  rewrite: () => Promise<string | null>;
  fallback: () => string;
}): Promise<NarrationResolution> {
  if (input.narration.trim() && input.valid(input.narration)) return { narration: input.narration, status: "unchanged" };
  let corrected: string | null;
  try { corrected = await input.rewrite(); }
  catch { return { narration: input.fallback(), status: "fallback", reason: "unavailable" }; }
  if (corrected === null) return { narration: input.fallback(), status: "fallback", reason: "unavailable" };
  if (corrected.trim().length < Math.min(40, Math.floor(input.narration.length / 3)) || !corrected.trim()) return { narration: input.fallback(), status: "fallback", reason: "empty" };
  if (!input.valid(corrected)) return { narration: input.fallback(), status: "fallback", reason: "contradiction" };
  return { narration: corrected, status: "corrected" };
}
