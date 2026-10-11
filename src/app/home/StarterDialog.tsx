"use client";

import { Loader2, Play, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import { Dialog } from "@/components/ui/Dialog";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { apiErrorText, type ApiUiError } from "@/lib/i18n/api-errors";

type Starter = {
  oneShot: { id: string; title: string; tagline: string; description: string };
  pregens: Array<{ id: string; name: string; tagline: string; blurb: string }>;
};

// The quick start: one evening's adventure with ready-made heroes, for a
// table that wants to play in ten minutes (src/lib/starter/one-shot.ts).
// One click makes the table; the lobby offers the heroes.
export function StarterDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (campaignId: string) => void;
}) {
  const { t, locale } = useLocale();
  const [starter, setStarter] = useState<Starter | null>(null);
  const [busy, setBusy] = useState<"" | "solo" | "friends">("");
  const [error, setError] = useState<ApiUiError | null>(null);
  const [networkError, setNetworkError] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!open || starter) {
      return;
    }
    fetch("/api/starter")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Starter | null) => {
        if (data) {
          setStarter(data);
          setLoadFailed(false);
        } else {
          setLoadFailed(true);
        }
      })
      .catch(() => setLoadFailed(true));
  }, [open, starter]);

  async function start(solo: boolean) {
    setBusy(solo ? "solo" : "friends");
    setError(null);
    setNetworkError(false);
    try {
      const response = await fetch("/api/starter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solo }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data);
        return;
      }
      onOpenChange(false);
      onCreated(data.campaign.id);
    } catch {
      setNetworkError(true);
    } finally {
      setBusy("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={t("starter.quickStart")} icon={<Play className="size-4 text-amber-300" />}>
      <div className="space-y-4">
        <div>
          <p className="font-display text-lg tracking-wide text-amber-50">{starter?.oneShot.title ?? t("starter.oneEvening")}</p>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            {starter?.oneShot.description ?? t(loadFailed ? "starter.loadFailed" : "starter.loading")}
          </p>
        </div>
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-stone-500">{t("starter.heroes")}</p>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {(starter?.pregens ?? []).map((hero) => (
              <li key={hero.id} className="rounded-lg border border-stone-800 bg-stone-950/50 px-3 py-2">
                <p className="text-sm text-stone-100">{hero.tagline}</p>
                <p className="text-xs text-stone-500">{hero.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-stone-500">
          {t("starter.hint")}
        </p>
        {networkError || error ? <p className="motion-shake text-sm text-red-400">{networkError ? t("common.serverUnavailable") : apiErrorText(locale, error!, "starter.failed")}</p> : null}
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => start(true)} className={ui.btnSmall} disabled={busy !== ""} aria-busy={busy === "solo"}>
            {busy === "solo" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            {t("starter.solo")}
          </button>
          <button type="button" onClick={() => start(false)} className={ui.btnPrimary} disabled={busy !== ""} aria-busy={busy === "friends"}>
            {busy === "friends" ? <Loader2 className="size-4 animate-spin" /> : <Users className="size-4" />}
            {t("starter.friends")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
