"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { leadErrorText } from "@/lib/i18n/lead-presentations";
import { appConfirm } from "@/components/ui/ConfirmDialog";

import { Check, Crown, Link as LinkIcon, Pencil, QrCode } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { copyText } from "@/lib/clipboard";
import { buildShareLinks } from "@/lib/share-link";
import { InviteShareDialog } from "@/components/InviteShareDialog";
import { Ribbon } from "@/components/ui/Ribbon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Switch } from "@/components/ui/Switch";
import { KitButton, PanelError } from "./PanelKit";
import { EditCampaignDialog } from "@/app/campaigns/[campaignId]/EditCampaignDialog";
import { LeadFloorControl } from "@/app/campaigns/[campaignId]/LeadFloorControl";
import { DmEncounterPrepPanel } from "@/app/campaigns/[campaignId]/DmEncounterPrepPanel";
import { DmMapLibraryPanel } from "@/app/campaigns/[campaignId]/DmMapLibraryPanel";
import {
  DirectorArmedBanner,
  DirectorPresets,
} from "@/app/campaigns/[campaignId]/DirectorPanel";
import {
  PendingNotesList,
  pendingCampaignNotes,
} from "@/app/campaigns/[campaignId]/NotesPanel";
import type { CampaignMember } from "@/lib/campaign-types";
import type { Floor } from "@/lib/db/campaigns";
import type { PublicEncounter } from "@/lib/db/encounter-view";
import type { Note } from "@/lib/db/notes";
import type { GameSettings } from "@/lib/schemas/game-settings";
import type { CharacterSheet } from "@/lib/schemas/sheet";

// The lead's desk. Everything the party lead can do to the table, in one
// tab, rather than an invite block on Party, an approval queue on Notes,
// floor buttons in the DM console and a transfer item in a character menu.
//
// Two authorities meet here and the sections follow them exactly
// (src/lib/dm/viewer.ts). `isLead` owns the table: invites, the lead seat,
// campaign details. `steersStory` owns the story: the floor, note approvals,
// directions to the AI. In an AI campaign the lead holds both; at a human-DM
// table the lead keeps the first set and the DM has the second, and this tab
// simply shows fewer cards.
//
// The prep the lead brought in from a workshop lives here too at an
// AI-narrated table (#154): the prepared fights and the map library, the
// same panels the DM console shows, behind the same prep authority
// (src/lib/campaign-api.ts requirePrepAuthority). A fight is cued rather
// than deployed, because the storyteller runs the fights there.

export type LeadCampaign = Parameters<typeof EditCampaignDialog>[0]["campaign"] & {
  dmUserId?: string | null;
  assistantDmUserId?: string | null;
  gameSettings?: GameSettings;
};

function Card({
  glyph,
  title,
  aside,
  children,
}: {
  // A painted glyph under public/assets/icons/glyph.
  glyph: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="panel mb-3 rounded-lg p-3">
      <SectionHead title={title} glyph={glyph} aside={aside} />
      {children}
    </div>
  );
}

// Mid-game invites. The toggle PATCHes game settings, so it follows story
// authority; the invite link itself stays with the lead, who owns who sits
// at the table.
function InvitesCard({
  campaignId,
  inviteCode,
  midGameJoinOpen,
  steersStory,
}: {
  campaignId: string;
  inviteCode: string;
  midGameJoinOpen: boolean;
  steersStory: boolean;
}) {
  const { locale, t } = useLocale();
  const [inviteCopied, setInviteCopied] = useState(false);
  const [inviteSharing, setInviteSharing] = useState(false);
  // The joining toggle has no optimistic state (midGameJoinOpen rides the
  // stream), so a refused PATCH changes nothing on screen; this is the only
  // trace it leaves.
  const [joinToggleError, setJoinToggleError] = useState("");
  // For the copied invite link: a tunnel host plays on 127.0.0.1, an address
  // guests cannot reach, so prefer the server's publicUrl.
  const [publicOrigin, setPublicOrigin] = useState("");
  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/providers")
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: { publicUrl?: string }) => {
        if (!cancelled && typeof data.publicUrl === "string") {
          setPublicOrigin(data.publicUrl);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleMidGameJoin() {
    setJoinToggleError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ midGameJoinOpen: !midGameJoinOpen }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setJoinToggleError(data.error ?? createTranslator("en")("leadUi.error.join"));
      }
    } catch {
      setJoinToggleError(createTranslator("en")("leadUi.error.network"));
    }
  }

  async function copyInviteLink() {
    // The /j interstitial link works for both app and browser recipients.
    const links = buildShareLinks({ publicOrigin, inviteCode });
    if (await copyText(links.appUrl || links.joinUrl)) {
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 1500);
    }
  }

  return (
    <Card glyph="tab-friends" title={t("leadUi.literal.0")}>
      <div className="flex flex-wrap items-center gap-1.5">
        {steersStory ? (
          <span className="flex items-center gap-2 text-xs text-stone-300" title={t("leadUi.literal.1")}>
            <Switch on={midGameJoinOpen} onChange={() => void toggleMidGameJoin()} label={t("leadUi.literal.1")} />
            {t(midGameJoinOpen ? "leadUi.joinOpen" : "leadUi.joinClosed")}
          </span>
        ) : (
          // A lead at a human-DM table shares the code but the setting is
          // the DM's, so the state shows without a control the server would
          // refuse.
          <span className="pk-chip px-2 text-xs text-stone-400">
            {t(midGameJoinOpen ? "leadUi.joinOpen" : "leadUi.joinClosed")}
          </span>
        )}
        {midGameJoinOpen ? (
          <>
            <KitButton onClick={copyInviteLink} title={t("leadUi.literal.2")} className="font-mono">
              {inviteCopied ? <Check className="motion-pop size-3.5 text-emerald-400" /> : <LinkIcon className="size-3.5" />}
              {inviteCode}
            </KitButton>
            <KitButton onClick={() => setInviteSharing(true)} title={t("leadUi.literal.3")} aria-label={t("leadUi.literal.3")}>
              <QrCode className="size-3.5" />
            </KitButton>
          </>
        ) : null}
      </div>
      {joinToggleError ? <PanelError className="mt-1.5">{leadErrorText(joinToggleError, locale)}</PanelError> : null}
      <InviteShareDialog
        open={inviteSharing}
        onOpenChange={setInviteSharing}
        campaignId={campaignId}
        inviteCode={inviteCode}
        canRegenerate
      />
    </Card>
  );
}

// Handing the seat over. The route lets the lead or the owner do this; the
// list leaves out the current lead (nothing to hand) and the DM seats (the
// DM runs the story, not a character, and the lead seat is a player's).
function LeadSeatCard({
  campaignId,
  members,
  sheets,
  leadUserId,
  dmUserIds,
}: {
  campaignId: string;
  members: CampaignMember[];
  sheets: CharacterSheet[];
  leadUserId: string;
  dmUserIds: string[];
}) {
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const candidates = members.filter(
    (member) => member.userId !== leadUserId && !dmUserIds.includes(member.userId),
  );
  const characterFor = (userId: string) =>
    sheets.find((sheet) => sheet.userId === userId && !sheet.isCompanion)?.name;

  async function makeLead(member: CampaignMember) {
    if (!await appConfirm(t("leadUi.transferConfirm", { name: member.username }))) {
      return;
    }
    setBusy(member.userId);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: member.userId }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? createTranslator("en")("leadUi.error.transfer"));
      }
    } catch {
      setError(createTranslator("en")("leadUi.error.network"));
    } finally {
      setBusy("");
    }
  }

  return (
    <Card glyph="tab-lead" title={t("leadUi.literal.4")}>
      {candidates.length ? (
        <ul className="stagger space-y-1">
          {candidates.map((member) => {
            const character = characterFor(member.userId);
            return (
              <li key={member.userId} className="flex min-h-9 items-center gap-2 text-xs">
                <span className="min-w-0 flex-1 truncate text-stone-300">
                  {member.username}
                  {character ? (
                    <span className="text-stone-500">{t("leadUi.asCharacter", { name: character })}</span>
                  ) : null}
                </span>
                <KitButton disabled={busy !== ""} busy={busy === member.userId} onClick={() => makeLead(member)} className="shrink-0 disabled:opacity-40">{t("leadUi.literal.5")}</KitButton>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-stone-500">{t("leadUi.literal.6")}</p>
      )}
      {error ? <PanelError className="mt-1.5">{leadErrorText(error, locale)}</PanelError> : null}
    </Card>
  );
}

export function LeadPanel({
  campaignId,
  campaign,
  floor,
  sheets,
  members,
  notes,
  refreshNotes,
  meUserId,
  inviteCode,
  midGameJoinOpen,
  canTransferLead,
  leadUserId,
  steersStory,
  isLead,
  encounter,
  directorArm,
}: {
  campaignId: string;
  campaign: LeadCampaign;
  floor: Floor;
  sheets: CharacterSheet[];
  members: CampaignMember[];
  notes: Note[];
  refreshNotes: () => Promise<void>;
  meUserId: string;
  inviteCode?: string;
  midGameJoinOpen: boolean;
  canTransferLead: boolean;
  leadUserId: string;
  steersStory: boolean;
  isLead: boolean;
  encounter?: PublicEncounter | null;
  // The stream's armed flag, so the banner here refetches the directive on
  // the same beat as the one above the composer.
  directorArm?: Parameters<typeof DirectorArmedBanner>[0]["armed"];
}) {
  const { locale, t } = useLocale();
  const [editing, setEditing] = useState(false);
  const [prepOpen, setPrepOpen] = useState(false);
  const pending = pendingCampaignNotes(notes);
  // The director route accepts any story authority, but Direct only exists
  // in the composer for a lead steering an AI narrator: a human DM has
  // replaced the thing a direction would steer, so the card follows the
  // composer rather than the route.
  const mode = campaign.gameSettings?.dmMode ?? "ai";
  const directsAi = steersStory && (mode === "ai" || mode === "steered");
  const dmUserIds = [campaign.dmUserId, campaign.assistantDmUserId].filter(
    (id): id is string => typeof id === "string" && id.length > 0,
  );

  return (
    <div className="text-sm">
      {/* Ember rather than the DM console's gold: the two seats are not the
          same thing, and the composer's Direct pill already wears this. */}
      <div className="mb-3">
        <Ribbon tone="ember">
          <Crown className="mr-1 inline size-3" aria-hidden="true" />
          {t(isLead ? "leadUi.leadOnly" : steersStory ? "leadUi.storyControls" : "leadUi.campaignControls")}
        </Ribbon>
        <p className="mt-1.5 text-xs text-stone-400">{t(steersStory ? "leadUi.steer" : isLead ? "leadUi.manage" : "leadUi.roleTools")}</p>
      </div>

      {steersStory ? (
        <LeadFloorControl
          campaignId={campaignId}
          floor={floor}
          sheets={sheets}
          encounter={encounter}
        />
      ) : null}

      {steersStory ? (
        <Card
          glyph="tab-notes"
          title={t("leadUi.literal.7")}
          aside={
            pending.length ? (
              <span key={pending.length} className="count-pop rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-1.5 text-[11px] font-semibold text-amber-950">
                {pending.length}
              </span>
            ) : null
          }
        >
          {pending.length ? (
            <PendingNotesList
              campaignId={campaignId}
              notes={pending}
              members={members}
              meUserId={meUserId}
              refreshNotes={refreshNotes}
            />
          ) : (
            <p className="text-xs text-stone-500">{t("leadUi.literal.8")}</p>
          )}
        </Card>
      ) : null}

      {directsAi ? (
        <Card glyph="system-cast" title={t("leadUi.literal.9")}>
          <p className="mb-2 text-xs text-stone-500">{t("leadUi.literal.10")}</p>
          <DirectorArmedBanner campaignId={campaignId} steersStory armed={directorArm} />
          <div className="flex flex-wrap gap-1.5">
            <DirectorPresets campaignId={campaignId} />
          </div>
        </Card>
      ) : null}

      {steersStory && mode === "ai" ? (
        <Card glyph="system-encounters" title={t("leadUi.literal.11")}>
          <p className="text-xs text-stone-500">{t("leadUi.literal.12")}</p>
          {/* In the body, not the header: the panel is narrow and the title
              long, and an aside there was pushed past the card's edge. */}
          <KitButton
            onClick={() => setPrepOpen((open) => !open)}
            title={t("leadUi.literal.13")}
            className="mt-2"
          >
            {t(prepOpen ? "leadUi.prepClose" : "leadUi.prepOpen")}
          </KitButton>
          {prepOpen ? (
            <div className="reveal mt-3 space-y-4">
              <DmEncounterPrepPanel campaignId={campaignId} cue />
              <DmMapLibraryPanel campaignId={campaignId} />
            </div>
          ) : null}
        </Card>
      ) : null}

      {isLead && inviteCode && campaign.maxPlayers > 1 ? (
        <InvitesCard
          campaignId={campaignId}
          inviteCode={inviteCode}
          midGameJoinOpen={midGameJoinOpen}
          steersStory={steersStory}
        />
      ) : null}

      {canTransferLead ? (
        <LeadSeatCard
          campaignId={campaignId}
          members={members}
          sheets={sheets}
          leadUserId={leadUserId}
          dmUserIds={dmUserIds}
        />
      ) : null}

      {isLead ? (
        <Card
          glyph="tab-campaigns"
          title={t("leadUi.literal.14")}
          aside={
            <KitButton onClick={() => setEditing(true)} title={t("leadUi.literal.15")}>
              <Pencil className="size-3" />{t("leadUi.literal.16")}</KitButton>
          }
        >
          <p className="gold-title truncate font-display">{campaign.title}</p>
          <p className="mt-1 text-xs text-stone-500">
            {t("leadUi.details", { difficulty: locale === "en" ? campaign.difficulty : t(`campaign.difficulty.${campaign.difficulty}`), level: campaign.startingLevel, players: campaign.maxPlayers })}
          </p>
        </Card>
      ) : null}

      {editing ? (
        <EditCampaignDialog campaign={campaign} onClose={() => setEditing(false)} />
      ) : null}
    </div>
  );
}
