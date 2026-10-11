"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { storyCadenceText } from "@/lib/i18n/compose-presentations";
import { SessionBanner, bannerButtonClass } from "@/app/campaigns/[campaignId]/SessionBanner";
import type { BeatCadence } from "@/lib/dm/beat-cadence";

// The reminder, above the composer and DM-only. It escalates from nothing to
// a quiet line to a lit banner, and it is never a modal: the remedy travels
// with the interruption, so the button that fixes it is right there.
export function StoryNudge({
  cadence,
  onCapture,
  onSnooze,
}: {
  cadence: BeatCadence;
  // Opens the DM console, where the beat composer lives.
  onCapture: () => void;
  onSnooze: () => void;
}) {
  const { locale, t } = useLocale();
  if (cadence.level === "quiet") {
    return null;
  }
  const overdue = cadence.level === "overdue";
  return (
    <SessionBanner
      glyph="tab-log"
      tone={overdue ? "gold" : "quiet"}
      title={overdue ? t("composeUi.story.title") : undefined}
      actions={
        <>
          <button type="button" onClick={onCapture} className={bannerButtonClass(overdue)}>
            {t("composeUi.story.capture")}
          </button>
          <button type="button" onClick={onSnooze} className={bannerButtonClass()}>
            {t("composeUi.story.later")}
          </button>
        </>
      }
    >
      <span className="block sm:truncate">
        {storyCadenceText(cadence.reason, locale)}
        {overdue ? t("composeUi.story.help") : ""}
      </span>
    </SessionBanner>
  );
}
