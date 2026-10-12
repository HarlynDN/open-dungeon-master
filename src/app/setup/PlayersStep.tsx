"use client";

import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CopyLine } from "@/components/CopyLine";
import { AdminInvitesSection } from "@/app/admin/AdminInvitesSection";
import type { Draft } from "@/app/setup/draft";
import { ChoiceCard, ChoiceCards, Lamp } from "@/app/setup/SetupParts";

const PUBLIC_URL_EXAMPLE = "https://dungeon.example.org";

type Update = (change: (draft: Draft) => Draft) => void;

// How players reach the server and who may make an account there. The
// addresses are this machine's own (GET /api/admin/setup), so the admin
// copies a working link instead of working one out.
export function PlayersStep({
  draft,
  update,
  lanUrls,
}: {
  draft: Draft;
  update: Update;
  lanUrls: string[];
}) {
  const { t } = useLocale();
  const set = (patch: Partial<Draft>) => update((current) => ({ ...current, ...patch }));
  const internet = Boolean(draft.publicUrl.trim());
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-stone-200">{t("setupFlow.players.where")}</h4>
        <div className="stagger space-y-2">
          {lanUrls.length ? (
            lanUrls.slice(0, 3).map((url) => (
              <div key={url} className="su-row flex-col items-stretch">
                <span className="flex items-center gap-2 text-xs text-stone-400">
                  <Lamp tone="ok" /> {t("setupFlow.players.network")}
                </span>
                <CopyLine text={url} label={t("setupFlow.players.copy")} />
              </div>
            ))
          ) : (
            <div className="su-row text-xs text-stone-400">
              <Lamp tone="off" /> {t("setupFlow.players.noNetwork")}
            </div>
          )}
          <div className="su-row flex-col items-stretch">
            <span className="flex items-center gap-2 text-xs text-stone-400">
              <Lamp tone={internet ? "ok" : "off"} /> {t("setupFlow.players.internet")}
            </span>
            <input
              className={ui.input}
              value={draft.publicUrl}
              onChange={(event) => set({ publicUrl: event.target.value })}
              placeholder={PUBLIC_URL_EXAMPLE}
              aria-label={t("setupFlow.players.public")}
            />
            <span className="text-[11px] leading-4 text-stone-500">
              {t("setupFlow.players.urlHelp")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-stone-200">{t("setupFlow.players.who")}</h4>
        <ChoiceCards label={t("setupFlow.players.who")}>
          <ChoiceCard
            picked={draft.signupMode === "invite"}
            onPick={() => set({ signupMode: "invite" })}
            glyph="tab-handout"
            title={t("setupFlow.players.invite")}
            sub={t("setupFlow.players.inviteHelp")}
            badge={internet ? { text: t("setupFlow.players.recommended"), tone: "ready" } : null}
          />
          <ChoiceCard
            picked={draft.signupMode === "open"}
            onPick={() => set({ signupMode: "open" })}
            glyph="tab-characters"
            title={t("setupFlow.players.open")}
            sub={t("setupFlow.players.openHelp")}
            badge={!internet ? { text: t("setupFlow.players.home"), tone: "ready" } : null}
          />
          <ChoiceCard
            picked={draft.signupMode === "closed"}
            onPick={() => set({ signupMode: "closed" })}
            glyph="tab-admin"
            title={t("setupFlow.players.closed")}
            sub={t("setupFlow.players.closedHelp")}
          />
        </ChoiceCards>
        {draft.signupMode === "open" && internet ? (
          <p key="warn" className="reveal su-note">
            {t("setupFlow.players.warning")}
          </p>
        ) : null}
        {draft.signupMode === "invite" ? (
          <div key="invites" className="reveal-height">
            <AdminInvitesSection />
          </div>
        ) : null}
        <p className="text-[11px] text-stone-500">
          {t("setupFlow.players.room")}
        </p>
      </div>
    </div>
  );
}
