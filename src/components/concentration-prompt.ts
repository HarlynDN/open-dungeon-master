"use client";

import type { AppLocale } from "@/lib/i18n/locales";
import { createTranslator } from "@/lib/i18n/translator";
import { referenceDisplayName } from "@/lib/i18n/references";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import type { ConcentrationSwap } from "@/lib/dm/concentration-confirm-logic";

// The actions route's question before a cast ends a running concentration
// spell (issue 252), asked in the table's own dialog. Resolves to the
// acknowledgment to send again with the same action, or null when the
// player keeps the spell they hold (nothing was posted or spent).
export async function askConcentrationSwap(data: unknown, locale: AppLocale = "en"): Promise<ConcentrationSwap | null> {
  const swap = (data as { confirmConcentration?: ConcentrationSwap & { characterName?: string } } | null)?.confirmConcentration;
  if (!swap?.characterId || !swap.current || !swap.next) {
    return null;
  }
  const t = createTranslator(locale);
  const who = swap.characterName ? t("upstreamUi.concentrationWho", { name: swap.characterName }) : t("upstreamUi.concentrationYou");
  const current = referenceDisplayName("spell", swap.current, locale);
  const next = referenceDisplayName("spell", swap.next, locale);
  const yes = await appConfirm(t("upstreamUi.concentrationBody", { who, current, next }), {
    title: t("upstreamUi.concentrationTitle", { current }),
    actionLabel: t("upstreamUi.concentrationCast", { next }), tone: "plain",
  });
  return yes ? { characterId: swap.characterId, current: swap.current, next: swap.next } : null;
}

// Whether a refusal from the actions route is that question.
export function isConcentrationQuestion(status: number, data: unknown): boolean {
  return status === 409 && Boolean((data as { confirmConcentration?: unknown } | null)?.confirmConcentration);
}
