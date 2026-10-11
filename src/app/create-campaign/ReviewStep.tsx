"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { CSSProperties, ReactNode } from "react";
import { CampaignCover } from "@/components/CampaignCover";
import { cn } from "@/lib/cn";
import { genreLabel } from "@/lib/i18n/settings";
import type { WorldPackSummary } from "@/lib/worlds/types";
import type { StepProps } from "@/app/create-campaign/draft";
import { coverSheet } from "@/app/create-campaign/cover-sheet";
import { featuresOn } from "@/app/create-campaign/table-sheet";

// Step 6: the cover the campaign will wear, assembled from the choices behind
// it, then the six read-back rows. The cover is CampaignCover with no art, the
// same tile the home screen draws until somebody paints one from the lobby.
// The warnings that block creation live here too, next to the button that
// they block.
export function ReviewStep({
  draft,
  gates,
  active,
  selectedPack,
  error,
}: StepProps & {
  // True while this is the step on screen; the cover assembles on arrival.
  active: boolean;
  selectedPack: WorldPackSummary | null;
  error: string;
}) {
  const { solo, storyKnownMissing } = gates;
  const { locale, t } = useLocale();

  const sheet = coverSheet(draft, gates, selectedPack?.name ?? null, locale);

  return (
    <div className={cn("space-y-4 text-sm", active && "cc-live")}>
      <div className="cc-review">
        <div className="cc-cover">
          <div className="cc-cover-art rounded-xl">
            <CampaignCover cover={null} title={sheet.title} genre={draft.genre} />
            <span className="cc-cover-caption">
              <span className="cc-cover-genre">{genreLabel(draft.genre, locale)}</span>
              <span className="cc-cover-title">{sheet.title}</span>
            </span>
          </div>
          <div className="flex flex-col gap-1 px-1 pb-1 pt-2.5">
            <span className="cc-prose text-[12.5px] leading-snug text-stone-300">{sheet.theme}</span>
            <span className="cc-note">{sheet.meta}</span>
          </div>
          <span className="cc-stamp" aria-hidden="true">
            <span className="cc-stamp-top">{sheet.difficulty}</span>
            <span className="cc-stamp-sub">{sheet.stampSub}</span>
          </span>
        </div>

        <div className="flex min-w-0 flex-[1_1_18rem] flex-col gap-2.5">
          <dl className="cc-readback">
            <Row label={t("review.runsGame")} index={0} gold>
              {t(`setting.dmMode.${draft.dmMode}.label`)}
            </Row>
            <Row label={t("review.setting")} index={1}>
              {sheet.setting}
            </Row>
            <Row label={t("review.party")} index={2}>
              {sheet.party}
            </Row>
            <Row label={t("review.difficulty")} index={3}>
              {sheet.difficulty}
            </Row>
            <Row label={t("review.dice")} index={4}>
              {sheet.dice}
            </Row>
            <Row label={t("review.features")} index={5} gold>
              {t("review.enabledCount", { count: featuresOn(draft, gates) })}
            </Row>
          </dl>
          <p className="text-stone-400">
            {solo
              ? t("review.soloLobby")
              : t("review.tableLobby")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[t(`setting.difficulty.${draft.difficulty}.hint`), ...sheet.chips].map((chip, index) => (
              <span
                key={chip}
                className="cc-review-chip"
                style={{ "--cc-delay": `${420 + index * 60}ms` } as CSSProperties}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {solo && storyKnownMissing ? (
        <p className="rounded-lg border border-amber-900/50 bg-amber-950/30 p-3 text-amber-200">
          {t("review.needsAi")}
        </p>
      ) : null}
      {error ? <p className="motion-shake text-red-400">{error}</p> : null}
    </div>
  );
}

// The rows cascade in at 70 ms steps once the step is on screen.
function Row({
  label,
  index,
  gold = false,
  children,
}: {
  label: string;
  index: number;
  gold?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="cc-readback-row" style={{ "--cc-delay": `${index * 70}ms` } as CSSProperties}>
      <dt>{label}</dt>
      <dd data-ink={gold ? "gold" : undefined}>{children}</dd>
    </div>
  );
}
