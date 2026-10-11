"use client";

import { Flag, Loader2, ShieldBan } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { Dialog } from "@/components/ui/Dialog";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { messageTemplate } from "@/lib/i18n/translator";
import { journalErrorText } from "@/lib/i18n/journal-presentations";

export type ReportTarget = {
  // The message being flagged, or nothing when a player is reported as such.
  messageId?: string;
  // The author, when there is one to block. DM passages have no user.
  userId?: string;
  authorType: "player" | "dm";
  // What the dialog calls the thing: a character name, or "the Dungeon Master".
  label: string;
  // Open straight on the block confirmation, no report.
  mode?: "report" | "block";
};

const REASONS = ["harassment", "sexual", "hate", "violence", "spam", "other"] as const;

type ReportDone = { key: "journalUi.report.blocked" | "journalUi.report.both" | "journalUi.report.sent"; name: string };

// Flags a passage, a message or a player to this server's admins, with the
// option to block the player at the same time. There is no central service,
// so the operator of the server the player chose is who reads the report.
export function ReportDialog({
  campaignId,
  target,
  onClose,
  onBlocked,
}: {
  campaignId: string;
  target: ReportTarget | null;
  onClose: () => void;
  // The block landed; the caller hides that player's messages at once.
  onBlocked?: (userId: string) => void;
}) {
  const { t, locale } = useLocale();
  const [reason, setReason] = useState("harassment");
  const [details, setDetails] = useState("");
  const [block, setBlock] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<ReportDone | null>(null);
  const blockOnly = target?.mode === "block";
  const targetLabel = target?.authorType === "dm" && target.label === messageTemplate("en", "journalUi.report.dmLabel")
    ? t("journalUi.report.dmLabel") : target?.label ?? "";

  function close() {
    setReason("harassment");
    setDetails("");
    setBlock(false);
    setError("");
    setDone(null);
    onClose();
  }

  async function blockUser(userId: string): Promise<boolean> {
    const response = await fetch("/api/profile/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || messageTemplate("en", "journalUi.error.block"));
      return false;
    }
    onBlocked?.(userId);
    return true;
  }

  async function submit() {
    if (!target) return;
    setBusy(true);
    setError("");
    try {
      if (blockOnly) {
        if (target.userId && (await blockUser(target.userId))) {
          setDone({ key: "journalUi.report.blocked", name: target.label });
        }
        return;
      }
      const response = await fetch(`/api/campaigns/${campaignId}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: target.messageId,
          userId: target.userId,
          reason,
          details,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || messageTemplate("en", "journalUi.error.report"));
        return;
      }
      if (block && target.userId && !(await blockUser(target.userId))) {
        return;
      }
      setDone({ key: block && target.userId ? "journalUi.report.both" : "journalUi.report.sent", name: target.label });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={Boolean(target)}
      onOpenChange={(open) => !open && close()}
      title={t(blockOnly ? "journalUi.report.blockTitle" : "journalUi.report.title", { name: targetLabel })}
      icon={blockOnly ? <ShieldBan className="size-4 text-red-300" /> : <Flag className="size-4 text-amber-300" />}
    >
      {done ? (
        <div className="reveal space-y-4">
          <p className="text-sm text-stone-300">{t(done.key, { name: done.name })}</p>
          <div className="flex justify-end">
            <button type="button" onClick={close} className={ui.btnPrimary}>
              {t("journalUi.report.done")}
            </button>
          </div>
        </div>
      ) : blockOnly ? (
        <div className="reveal space-y-4">
          <p className="text-sm leading-6 text-stone-400">
            {t("journalUi.report.blockHint", { name: targetLabel })}
          </p>
          {error ? <p className="motion-shake text-sm text-red-400">{journalErrorText(error, locale, "journalUi.error.block")}</p> : null}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={close} className={ui.btnSmall} disabled={busy} aria-busy={busy}>
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={busy} aria-busy={busy}
              className={cn(ui.btnPrimary, "from-red-200 via-red-300 to-red-500 text-red-950")}
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <ShieldBan className="size-4" />}
              {t("journalUi.report.block")}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm leading-6 text-stone-400">
            {t(target?.authorType === "dm" ? "journalUi.report.dmHint" : "journalUi.report.playerHint")}
          </p>
          <fieldset className="space-y-1.5">
            <legend className="mb-1 text-xs uppercase tracking-wide text-stone-500">{t("journalUi.report.reason")}</legend>
            {REASONS.map((entry) => (
              <label
                key={entry}
                className="flex cursor-pointer items-center gap-2 text-sm text-stone-300"
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={entry}
                  checked={reason === entry}
                  onChange={() => setReason(entry)}
                  className="accent-amber-400"
                />
                {t(`journalUi.report.reason.${entry}`)}
              </label>
            ))}
          </fieldset>
          <label className="block text-xs text-stone-400">
            {t("journalUi.report.details")}
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              rows={3}
              maxLength={2000}
              className={cn(ui.input, "mt-1 resize-y")}
            />
          </label>
          {target?.userId ? (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-300">
              <input
                type="checkbox"
                checked={block}
                onChange={(event) => setBlock(event.target.checked)}
                className="accent-amber-400"
              />
              {t("journalUi.report.alsoBlock", { name: targetLabel })}
            </label>
          ) : null}
          {error ? <p className="motion-shake text-sm text-red-400">{journalErrorText(error, locale, "journalUi.error.report")}</p> : null}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={close} className={ui.btnSmall} disabled={busy} aria-busy={busy}>
              {t("common.cancel")}
            </button>
            <button type="button" onClick={submit} disabled={busy} aria-busy={busy} className={ui.btnPrimary}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Flag className="size-4" />}
              {t("journalUi.report.send")}
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
