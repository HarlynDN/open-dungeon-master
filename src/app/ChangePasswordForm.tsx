"use client";

import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/translator";
import { apiErrorText, type ApiUiError } from "@/lib/i18n/api-errors";

// Change-password form shared by account settings and the forced flow after
// an admin reset (there, the temp password is prefilled as the current one).
export function ChangePasswordForm({
  currentPassword: initialCurrent,
  lockCurrent = false,
  submitLabel,
  onChanged,
}: {
  currentPassword?: string;
  lockCurrent?: boolean;
  submitLabel?: string;
  onChanged: () => void;
}) {
  const { t, locale } = useLocale();
  const [currentPassword, setCurrentPassword] = useState(initialCurrent ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<MessageKey | ApiUiError | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== confirm) {
      setError("password.mismatch");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data);
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
      onChanged();
    } catch {
      setError("common.serverUnavailable");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {lockCurrent ? null : (
        <label className="block text-sm">
          <span className="mb-1 block text-stone-400">{t("password.current")}</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            required
            maxLength={100}
            className={ui.input}
          />
        </label>
      )}
      <label className="block text-sm">
        <span className="mb-1 block text-stone-400">{t("password.new")}</span>
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={100}
          className={ui.input}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-stone-400">{t("password.confirm")}</span>
        <input
          type="password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={100}
          className={ui.input}
        />
      </label>
      {error ? <p role="alert" className="motion-shake text-sm text-red-400">{typeof error === "string" ? t(error) : apiErrorText(locale, error, "password.failed")}</p> : null}
      <button type="submit" disabled={busy} aria-busy={busy} className={cn(ui.btnPrimary, "w-full")}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : null}
        {submitLabel ?? t("password.change")}
      </button>
    </form>
  );
}
