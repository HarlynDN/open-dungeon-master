"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { SectionHead } from "@/components/ui/SectionHead";
import { DM_HALTED_PREFIX } from "@/lib/campaign-types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { UiRequestError } from "@/lib/i18n/api-errors";
import { turnControlErrorText } from "@/lib/i18n/turn-control-presentations";

// A DM turn that threw. Everything the turn had (its conversation, tool calls
// and tool results) is still on the dm_turns row, so the lead can send the DM
// back in where it stopped instead of retyping the action, which would leave
// the same action in the transcript twice.
//
// The retry itself is durable server state: the moment it is claimed the
// notice loses its dmTurnId and this banner disappears for every client via
// message_updated. Local state here only covers the request in flight.
export function HaltedTurnBanner({
  campaignId,
  turnId,
  content,
  canRetry,
}: {
  campaignId: string;
  turnId: string;
  content: string;
  canRetry: boolean;
}) {
  const { t, locale } = useLocale();
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  const errorText = turnControlErrorText(error, locale);
  const reason = content.startsWith(DM_HALTED_PREFIX)
    ? content.slice(DM_HALTED_PREFIX.length)
    : content;

  async function retry() {
    if (retrying) {
      return;
    }
    setRetrying(true);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm-turn/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turnId }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError({ data: payload ?? {}, fallback: "turnUi.error.retry" });
      }
      // On success nothing is done here: the banner goes away when the
      // message_updated event lands, and the narration streams in as usual.
    } catch {
      setError({ data: {}, fallback: "turnUi.error.server" });
    } finally {
      setRetrying(false);
    }
  }

  return (
    <div className="panel ornate session-banner-card reveal-banner rounded-xl">
      <SectionHead title={t("turnUi.halted")} glyph="cue-bell" level="h4" className="mb-1.5" />
      <p className="text-sm text-stone-400">{reason}</p>
      {canRetry ? (
        <button
          type="button"
          onClick={retry}
          disabled={retrying}
          title={t("turnUi.retryHint")}
          className={cn(ui.btnSmall, "mt-2.5")}
        >
          {retrying ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <RotateCcw className="size-3.5" />
          )}
          {t(retrying ? "turnUi.retryBusy" : "turnUi.retry")}
        </button>
      ) : (
        <p className="mt-1 text-xs text-stone-500">
          {t("turnUi.retryLead")}
        </p>
      )}
      {errorText ? <p className="motion-shake mt-1 text-xs text-red-400">{errorText}</p> : null}
    </div>
  );
}
