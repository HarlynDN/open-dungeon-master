"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { reviewText, reviewFrame } from "@/lib/i18n/play-review-presentations";

import { Flag, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import type { CampaignDifficulty, CampaignStatus } from "@/lib/campaign-types";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import {
  ContentImportPicker,
  EMPTY_SELECTION,
  type ImportSelection,
} from "@/app/workshop/ContentImportPicker";
import type { GameSettings } from "@/lib/schemas/game-settings";
import type { StorySettings } from "@/lib/types";
import { EditCampaignDialog } from "@/app/campaigns/[campaignId]/EditCampaignDialog";
import { GameSettingsPanel } from "@/app/campaigns/[campaignId]/GameSettingsPanel";
import { RulesPanel } from "@/app/campaigns/[campaignId]/RulesPanel";
import { StoryAiPanel } from "@/app/campaigns/[campaignId]/StoryAiPanel";

// Setup tab of the session side panel. Two authorities meet here: campaign
// details belong to the lead (the PATCH /api/campaigns/[id] gate), while game
// settings and house rules follow story authority, which a human DM takes
// over from the lead. Everyone else sees a read-only summary.
//
// Two things that used to exist only in the lobby live here too, because a
// table in play has no lobby to go back to: bringing in more prep (story
// authority, the same gate as the import route), and ending the campaign
// (the owner or the DM, the same pair that could start it).
export function SessionSettings({
  campaign,
  isLead,
  steersStory,
  isDm,
  canEnd = false,
}: {
  campaign: {
    id: string;
    title: string;
    description: string;
    theme: string;
    maxPlayers: number;
    startingLevel: number;
    difficulty: CampaignDifficulty;
    status?: CampaignStatus;
    gameSettings?: GameSettings;
    // Scrubbed of API keys before it ever reaches a browser (publicCampaign);
    // the panel learns key existence from the story-settings route.
    settings?: StorySettings;
  };
  isLead: boolean;
  steersStory: boolean;
  isDm: boolean;
  // The campaign owner or the DM proper: who the PATCH route lets end it.
  canEnd?: boolean;
}) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  const [editing, setEditing] = useState(false);
  const [prep, setPrep] = useState<ImportSelection>(EMPTY_SELECTION);
  const ended = campaign.status === "ended";

  return (
    <div className="text-sm">
      <div className="mb-3 rounded-lg border border-stone-800 bg-stone-950/40 p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-medium text-stone-400">{reviewText("Campaign", locale)}</p>
          {isLead && !ended ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              title={reviewText("Edit title, premise, setting, difficulty, and player slots", locale)}
              className="flex items-center gap-1 rounded-md border border-stone-700 px-2 py-1 text-xs text-stone-300 hover:bg-stone-900"
            >
              <Pencil className="size-3" />  {reviewText("Edit details", locale)} </button>
          ) : null}
        </div>
        <p className="truncate text-stone-200">{campaign.title}</p>
        <p className="mt-1 text-xs text-stone-500">
          {reviewFrame("campaign", { difficulty: t(`campaign.difficulty.${campaign.difficulty}`), level: campaign.startingLevel, players: campaign.maxPlayers }, locale)}
        </p>
        {campaign.theme ? (
          <p className="reveal mt-1 line-clamp-2 text-xs text-stone-500">{reviewFrame("setting", { theme: campaign.theme }, locale)}</p>
        ) : null}
      </div>

      {/* Every seat at the table reloads when this lands (the import
          route's prep_imported ping), so nothing here needs refreshing. */}
      {steersStory && !ended ? (
        <div data-setup-prep className="reveal mb-3 rounded-lg border border-stone-800 bg-stone-950/40 p-3">
          <p className="mb-1 text-xs font-medium text-stone-400">{syncT("upstreamUi.280109143d47")}</p>
          <p className="mb-2 text-xs text-stone-500">
            {syncT("upstreamUi.50161f9bb184")}</p>
          <ContentImportPicker campaignId={campaign.id} selection={prep} onChange={setPrep} />
        </div>
      ) : null}

      {campaign.gameSettings ? (
        <GameSettingsPanel
          campaignId={campaign.id}
          settings={campaign.gameSettings}
          steersStory={steersStory}
        />
      ) : null}

      {campaign.settings ? (
        <StoryAiPanel
          campaignId={campaign.id}
          settings={campaign.settings}
          steersStory={steersStory}
        />
      ) : null}

      {campaign.gameSettings ? (
        <div className="reveal mt-3">
          <RulesPanel
            campaignId={campaign.id}
            settings={campaign.gameSettings}
            steersStory={steersStory}
            isDm={isDm}
          />
        </div>
      ) : null}

      {canEnd ? <EndCampaign campaignId={campaign.id} title={campaign.title} ended={ended} /> : null}

      {editing ? <EditCampaignDialog campaign={campaign} onClose={() => setEditing(false)} /> : null}
    </div>
  );
}

// Closing the book. The route writes each sheet's progress back to the
// library character it came from (level, XP, gold, gear, spells), refuses new turns, and
// shuts the room code; the transcript stays to be read. There is no way back
// to "active", so the confirm says so plainly.
function EndCampaign({ campaignId, title, ended }: { campaignId: string; title: string; ended: boolean }) {
  const { t: syncT } = useSyncLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (ended) {
    return (
      <div data-campaign-ended className="reveal mt-3 rounded-lg border border-stone-800 bg-stone-950/40 p-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-stone-400">
          <Flag className="size-3.5" /> {syncT("upstreamUi.b6dc05c45f5d")}</p>
        <p className="mt-1 text-xs text-stone-500">
          {syncT("upstreamUi.40cd0376b71a")}</p>
      </div>
    );
  }

  async function end() {
    const ok = await appConfirm(
      syncT("upstreamUi.endCampaignConfirm", { title }),
      { title: syncT("upstreamUi.1e5673d84950"), actionLabel: syncT("upstreamUi.endCampaign"), tone: "danger" },
    );
    if (!ok) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ended" }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || syncT("upstreamUi.2ded6d2c265d"));
      }
      // On success the campaign_updated event flips every seat to ended.
    } catch {
      setError(syncT("upstreamUi.111ff6e1879b"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="reveal mt-3 rounded-lg border border-red-900/50 bg-stone-950/40 p-3">
      <p className="mb-1 text-xs font-medium text-stone-400">{syncT("upstreamUi.1e5673d84950")}</p>
      <p className="mb-2 text-xs text-stone-500">
        {syncT("upstreamUi.e315efc6244e")}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void end()}
          disabled={busy}
          data-end-campaign
          className={cn(ui.btnSmall, "text-red-300")}
        >
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Flag className="size-3.5" />}
          {syncT("upstreamUi.1e5673d84950")}</button>
        {error ? <span className="live-in text-xs text-red-300">{error}</span> : null}
      </div>
    </div>
  );
}
