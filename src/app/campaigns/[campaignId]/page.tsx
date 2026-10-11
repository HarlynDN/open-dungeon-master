"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { campaignEntryError } from "@/lib/i18n/campaign-entry-presentations";
import { PageSkeleton } from "@/components/PageSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ui } from "@/lib/ui";

import { use } from "react";
import { Lobby } from "@/app/campaigns/[campaignId]/Lobby";
import { SessionView } from "@/app/campaigns/[campaignId]/SessionView";
import { useCampaignStream } from "@/app/campaigns/[campaignId]/useCampaignStream";
import { ContentScopeProvider } from "@/lib/content-scope";

export default function CampaignPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { locale, t } = useLocale();
  const { campaignId } = use(params);
  const {
    state,
    refresh,
    refreshNotes,
    refreshSideChat,
    refreshWhispers,
    refreshAsks,
    refreshFacts,
    refreshBattleMap,
    markFxPlayed,
    markCameraDone,
    markTitleCardShown,
    playSting,
  } = useCampaignStream(campaignId);

  if (state.loading) {
    return (
      <PageSkeleton kind="table" />
    );
  }

  if (state.error || !state.campaign || !state.me) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
        <EmptyState
          art="map"
          title={state.error ? campaignEntryError(state.error, locale) : t("sessionUi.open.missing")}
          hint={state.answeredBy ? t("sessionUi.open.answered", { origin: state.answeredBy }) : undefined}
          action={
            <Link href="/" className={ui.btnSecondary}>
              {t("sessionUi.open.back")}
            </Link>
          }
        />
      </main>
    );
  }

  // Every content request made at this table is its own (src/lib/content-scope.tsx).
  return (
    <ContentScopeProvider campaignId={campaignId}>
      {state.campaign.status === "lobby" ? (
        <Lobby state={state} refresh={refresh} />
      ) : (
        <SessionView
      state={state}
      refreshNotes={refreshNotes}
      refreshFacts={refreshFacts}
      refreshSideChat={refreshSideChat}
      refreshWhispers={refreshWhispers}
      refreshAsks={refreshAsks}
      refreshBattleMap={refreshBattleMap}
      markFxPlayed={markFxPlayed}
      markCameraDone={markCameraDone}
      markTitleCardShown={markTitleCardShown}
      playSting={playSting}
        />
      )}
    </ContentScopeProvider>
  );
}
