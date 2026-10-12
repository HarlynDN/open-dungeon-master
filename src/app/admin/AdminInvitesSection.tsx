"use client";

import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { Check, Copy, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { setupFlowMessage, SETUP_FLOW_ERRORS } from "@/lib/i18n/setup-flow-presentations";
import { EmptyState } from "@/components/EmptyState";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { SectionHead } from "@/components/ui/SectionHead";

type AccountInvite = {
  code: string;
  note: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  createdAt: string;
};

// Management for account invite codes, shown inside the Accounts section
// while the signup mode is invite-only. Codes gate account creation, not
// campaign membership; the campaign room code is a different thing.
export function AdminInvitesSection() {
  const { t, locale } = useLocale();
  const [invites, setInvites] = useState<AccountInvite[] | null>(null);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();
  const [reloads, setReloads] = useState(0);
  const [note, setNote] = useState("");
  const [maxUses, setMaxUses] = useState(1);
  const [creating, setCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    readLoad<{ invites?: AccountInvite[] }>(fetch("/api/admin/invites"), "The invite codes").then((outcome) => {
      settle(outcome);
      if (outcome.payload) {
        setInvites(outcome.payload.invites ?? []);
      }
    });
  }, [reloads, settle]);

  async function create() {
    setCreating(true);
    setError("");
    try {
      const response = await fetch("/api/admin/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, maxUses }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || SETUP_FLOW_ERRORS.inviteCreate);
        return;
      }
      setInvites([data.invite, ...(invites ?? [])]);
      setNote("");
    } catch {
      setError(SETUP_FLOW_ERRORS.network);
    } finally {
      setCreating(false);
    }
  }

  async function remove(code: string) {
    // A revoked code cannot be brought back, and somebody may be holding it.
    const sure = await appConfirm(t("setupFlow.invites.confirm", { code }), {
      title: t("setupFlow.invites.confirmTitle"),
      actionLabel: t("setupFlow.invites.revoke"),
      tone: "danger",
    });
    if (!sure) return;
    const response = await fetch(`/api/admin/invites/${code}`, { method: "DELETE" });
    if (response.ok) {
      setInvites((current) => (current ?? []).filter((invite) => invite.code !== code));
    }
  }

  async function copy(code: string) {
    if (await copyText(code)) {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 1500);
    }
  }

  if (invites === null) {
    return (
      <div className="skeleton-block mt-3 h-16 rounded-xl" aria-label={t("setupFlow.invites.loading")} />
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <SectionHead title={t("setupFlow.invites.title")} glyph="tab-handout" level="h3" aside={<span className="tabular-nums">{invites.length}</span>} />
      <div className="flex flex-wrap items-end gap-2">
        <label className="min-w-40 flex-1 text-sm">
          <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.invites.note")}</span>
          <input
            className={ui.input}
            value={note}
            maxLength={200}
            onChange={(event) => setNote(event.target.value)}
            placeholder={t("setupFlow.invites.noteHint")}
          />
        </label>
        <div className="text-sm">
          <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.invites.uses")}</span>
          <NumberStepper
            label={t("setupFlow.invites.uses")}
            min={1}
            max={1000}
            value={maxUses}
            onChange={(next) => setMaxUses(Math.max(1, Math.min(1000, Number(next) || 1)))}
          />
        </div>
        <button type="button" onClick={create} disabled={creating} aria-busy={creating} className={ui.btnSmall}>
          {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          {t("setupFlow.invites.new")}
        </button>
      </div>
      {error ? <p role="alert" className="motion-shake text-sm text-red-400">{setupFlowMessage(error, locale)}</p> : null}
      {invites.length === 0 ? (
        (loadError ? <LoadFailed error={setupFlowMessage(loadError, locale)} onRetry={() => setReloads((current) => current + 1)} /> : loaded ? <EmptyState art="scrolls" size="sm" title={t("setupFlow.invites.empty")} /> : null)
      ) : (
        <ul className="stagger space-y-2">
          {invites.map((invite) => {
            const exhausted = invite.usedCount >= invite.maxUses;
            return (
              <li
                key={invite.code}
                className="plate-row gap-2"
                data-tone={exhausted ? "muted" : undefined}
              >
                <button
                  type="button"
                  onClick={() => copy(invite.code)}
                  title={t("setupFlow.invites.copy")}
                  className={cn(ui.btnSmall, "font-mono text-amber-200")}
                >
                  {copiedCode === invite.code ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {invite.code}
                </button>
                <span className={exhausted ? "text-xs text-red-400" : "text-xs text-stone-500"}>
                  {t("setupFlow.invites.used", { used: invite.usedCount, max: invite.maxUses })}
                </span>
                {invite.note ? (
                  <span className="truncate text-xs text-stone-500">{invite.note}</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(invite.code)}
                  title={t("setupFlow.invites.revokeTitle")}
                  aria-label={t("setupFlow.invites.revokeLabel", { code: invite.code })}
                  className={cn(ui.btnSmall, "ml-auto px-2 hover:border-red-500/50 hover:text-red-400")}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
