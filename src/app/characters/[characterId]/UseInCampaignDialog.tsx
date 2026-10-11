"use client";

import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { seatCampaigns, characterErrorText, characterRequestError, readCharacterResponse, type CharacterUiError } from "@/lib/i18n/character-presentations";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { Dialog } from "@/components/ui/Dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import { navigateTo } from "@/lib/navigation";
import { ui } from "@/lib/ui";

// The detail page's one primary action (docs/visual-overhaul-plan.md 8c.2):
// take this library character to a table. It lists the campaigns the player
// belongs to and sends the same request the campaign's own "pick from your
// library" page sends, so the campaign's multi-character setting and the
// server's lobby/gameplay rules are the ones that answer.

type CampaignRow = {
  id: string;
  title: string;
  status?: string;
  kind?: string;
  isWorkshop?: boolean;
  // The level every character plays at on this table.
  startingLevel?: number;
};

export function UseInCampaignDialog({
  characterId,
  characterName,
  characterLevel,
  seatedIn,
  onClose,
}: {
  characterId: string;
  characterName: string;
  characterLevel?: number;
  // Campaign ids that already hold a copy of this character.
  seatedIn: string[];
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  const [campaigns, setCampaigns] = useState<CampaignRow[] | null>(null);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const [loadError, setLoadError] = useState<CharacterUiError | null>(null);
  const [reloads, setReloads] = useState(0);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState<{ campaignId: string; detail: CharacterUiError; taken: boolean } | null>(null);

  useEffect(() => {
    let cancelled = false;
    readCharacterResponse<{ campaigns: CampaignRow[] }>(fetch("/api/campaigns"), "seat.loadError")
      .then(seatCampaigns)
      .then((rows) => { if (!cancelled) { setCampaigns(rows); setLoadError(null); } })
      .catch((cause) => { if (!cancelled) setLoadError(characterRequestError(cause, "seat.loadError")); });
    return () => {
      cancelled = true;
    };
  }, [reloads]);

  async function seat(campaign: CampaignRow) {
    setBusyId(campaign.id);
    setError(null);
    try {
      const data = await readCharacterResponse<{ sheet: { id: string } }>(fetch(`/api/campaigns/${campaign.id}/sheet`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ libraryCharacterId: characterId }),
      }), "seat.error");
      if (typeof data?.sheet?.id !== "string") throw new Error("Character seat was not acknowledged.");
      navigateTo(`/campaigns/${campaign.id}`);
    } catch (cause) {
      const detail = characterRequestError(cause, "seat.error");
      setError({ campaignId: campaign.id, detail, taken: detail.status === 409 });
    } finally {
      setBusyId("");
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => !open && !busyId && onClose()}
      title={t("seat.title", { name: characterName })}
      icon={<GameIcon icon={{ kind: "glyph", key: "tab-campaigns" }} size="size-7" />}
      width="w-[min(92vw,30rem)]"
    >
      <p className="mb-3 text-xs leading-5 text-stone-400">
        {t("seat.hint")}
      </p>
      {loadError ? (
        <LoadFailed error={characterErrorText(loadError, locale)} onRetry={() => setReloads((current) => current + 1)} />
      ) : campaigns === null ? (
        <div className="skeleton-block h-24 rounded-xl" aria-label={t("seat.loading")} />
      ) : campaigns.length === 0 ? (
        <EmptyState
          art="map"
          size="sm"
          title={t("seat.empty")}
          hint={t("seat.emptyHint")}
          action={
            <Link href="/" className={ui.btnSecondary}>
              {t("seat.home")}
            </Link>
          }
        />
      ) : (
        <ul className="stagger space-y-2">
          {campaigns.map((campaign) => {
            const seated = seatedIn.includes(campaign.id);
            return (
              <li key={campaign.id} className="plate-row">
                <GameIcon icon={{ kind: "glyph", key: "tab-campaigns" }} size="size-8" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-sm tracking-wide text-amber-100">{campaign.title}</span>
                  <span className="block text-[11px] text-stone-500">
                    {seated ? t("seat.already") : campaign.status === "lobby" ? t("seat.lobby") : t("seat.play")}
                    {campaign.startingLevel ? t("seat.level", { level: campaign.startingLevel }) : ""}
                  </span>
                  {!seated &&
                  characterLevel !== undefined &&
                  campaign.startingLevel &&
                  campaign.startingLevel !== characterLevel ? (
                    <span className="block text-[11px] text-amber-300">
                      {t(campaign.startingLevel < characterLevel ? "seat.down" : "seat.up", { name: characterName, level: campaign.startingLevel, old: characterLevel })}
                    </span>
                  ) : null}
                </span>
                {seated ? (
                  <Link href={`/campaigns/${campaign.id}`} className={ui.btnSmall}>
                    {t("library.open")}
                  </Link>
                ) : (
                  <button type="button" disabled={Boolean(busyId)} onClick={() => void seat(campaign)} className={ui.btnSmall}>
                    {busyId === campaign.id ? <Loader2 className="size-3.5 animate-spin" /> : null} {t("seat.take")}
                  </button>
                )}
                {error?.campaignId === campaign.id ? (
                  <p role="alert" className="motion-shake w-full text-xs text-ember-600">
                    {characterErrorText(error.detail, locale)}{" "}
                    {error.taken ? (
                      <Link href={`/campaigns/${campaign.id}/character?mode=replace`} className="text-amber-200 underline underline-offset-2">
                        {t("seat.swap")}
                      </Link>
                    ) : null}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </Dialog>
  );
}
