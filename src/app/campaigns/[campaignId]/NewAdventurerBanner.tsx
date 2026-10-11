"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { newAdventurerText } from "@/lib/i18n/session-presentations";
import { composeErrorText } from "@/lib/i18n/compose-presentations";
import { messageTemplate } from "@/lib/i18n/translator";
import { NEW_ADVENTURER_INTRO_DIRECTION } from "@/lib/dm/director-logic";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { SessionBanner, bannerButtonClass } from "@/app/campaigns/[campaignId]/SessionBanner";

// Lead-only banner after a mid-game joiner creates their character: write
// the introduction as a Direct, or let the DM improvise one now.
export function NewAdventurerBanner({
  campaignId,
  text,
  sheets = [],
  members = [],
  onWriteIntro,
  onDismiss,
}: {
  campaignId: string;
  text: string;
  sheets?: readonly { name: string; race: string; class: string; backstory: string }[];
  members?: readonly { username: string }[];
  onWriteIntro: () => void;
  onDismiss: () => void;
}) {
  const { locale, t } = useLocale();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function letDmIntroduce() {
    if (sending) {
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/lead-note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: NEW_ADVENTURER_INTRO_DIRECTION,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || messageTemplate("en", "sessionUi.join.error"));
        return;
      }
      onDismiss();
    } catch {
      setError(messageTemplate("en", "composeUi.error.network"));
    } finally {
      setSending(false);
    }
  }

  return (
    <SessionBanner
      glyph="system-party"
      title={t("sessionUi.join.title")}
      actions={
        <>
          <button type="button" onClick={onWriteIntro} className={bannerButtonClass(true)}>
            {t("sessionUi.join.write")}
          </button>
          <button
            type="button"
            onClick={letDmIntroduce}
            disabled={sending}
            className={bannerButtonClass()}
          >
            {t("sessionUi.join.dm")}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            title={t("sessionUi.dismiss")}
            aria-label={t("sessionUi.dismiss")}
            className={cn(ui.iconAction, "opacity-100")}
          >
            <X className="size-4" />
          </button>
        </>
      }
    >
      <span className="block sm:truncate">{newAdventurerText(text, sheets, members, locale)}</span>
      {error ? <p role="alert" className="mt-1 text-red-400">{composeErrorText(error, locale, "sessionUi.join.error")}</p> : null}
    </SessionBanner>
  );
}
