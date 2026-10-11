"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { readUiResponse, requestErrorText, loadErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { accountRequestError } from "@/lib/i18n/account-presentations";
import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { ShieldBan } from "lucide-react";
import { useEffect, useState } from "react";
import { UserAvatar, ui } from "@/lib/ui";
import { EmptyState } from "@/components/EmptyState";
import { PageSection } from "@/components/PageShell";

type Blocked = {
  userId: string;
  username: string;
  avatar: { url: string } | null;
  createdAt: string;
};

// Who this account has blocked on this server, with the way back.
export function BlockedPlayersSection() {
  const { locale, t } = useLocale();
  const [writeError, setWriteError] = useState<UiRequestError | null>(null);
  const [blocked, setBlocked] = useState<Blocked[] | null>(null);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();
  const [reloads, setReloads] = useState(0);
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    let cancelled = false;
    readLoad<{ blocked?: Blocked[] }>(fetch("/api/profile/blocks"), "The blocked list").then((outcome) => {
      if (cancelled) return;
      if (outcome.payload && !Array.isArray(outcome.payload.blocked)) {
        settle({ payload: null, error: "The blocked list did not load. The server’s answer could not be read." }); return;
      }
      settle(outcome);
      if (outcome.payload) {
        setBlocked(outcome.payload.blocked ?? []);
      }
    });
    return () => { cancelled = true; };
  }, [reloads, settle]);

  async function unblock(userId: string) {
    setBusyId(userId);
    setWriteError(null);
    try {
      const data = await readUiResponse<{ blocked: Blocked[] }>(fetch("/api/profile/blocks", {
        method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }),
      }), "blocks.writeError");
      if (!Array.isArray(data.blocked)) throw new Error("Malformed blocked players response.");
      setBlocked(data.blocked);
    } catch (cause) { setWriteError(accountRequestError(cause, "blocks.writeError")); }
    finally {
      setBusyId("");
    }
  }

  return (
    <PageSection
      heading={t("blocks.title")}
      glyph="attitude-hostile"
      intro={t("blocks.hint")}
    >
      {loadError ? <LoadFailed error={loadErrorText(locale, loadError, "blocks.loadError")} onRetry={() => setReloads((current) => current + 1)} /> : null}
      {writeError ? <p role="alert" className="mb-2 text-xs text-ember-600">{requestErrorText(locale, writeError)}</p> : null}
      {blocked === null ? (
        !loadError ? <div className="skeleton-block h-12 rounded-xl" aria-label={t("blocks.loading")} /> : null
      ) : blocked.length === 0 ? (
        (!loadError && loaded ? <EmptyState art="board" size="sm" title={t("blocks.empty")} /> : null)
      ) : (
        <ul className="stagger space-y-2">
          {blocked.map((entry) => (
            <li key={entry.userId} className="plate-row">
              <span className="medallion">
                <UserAvatar url={entry.avatar?.url} userId={entry.userId} size="size-9" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-stone-200">
                {entry.username}
              </span>
              <button
                type="button"
                disabled={busyId === entry.userId}
                onClick={() => unblock(entry.userId)}
                className={ui.btnSmall}
              >
                <ShieldBan className="size-3.5" /> {t("blocks.unblock")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
