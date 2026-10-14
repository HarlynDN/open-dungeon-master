"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";
import { setupAgentMessage } from "@/lib/i18n/setup-guide-presentations";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import { CopyLine } from "@/components/CopyLine";
import { shellHost } from "@/lib/shell-host";
import type { Draft } from "@/app/setup/draft";
import { ModelPicker } from "@/app/setup/SetupParts";
import { BLANK } from "@/app/admin/model-blanks";
import type { HarnessId, HarnessStatus } from "@/lib/harness/types";

type Update = (change: (draft: Draft) => Draft) => void;

const MARKS: Record<HarnessId, string> = { claude: "CC", codex: "Cx", opencode: "oc", grok: "Gk" };

function statusTone(status: HarnessStatus, locale: AppLocale): { tone: "ready" | "warn" | "off"; text: string } {
  const t = createTranslator(locale);
  if (status.availability !== "ok") return { tone: "off", text: t("setupGuide.agent.unavailable") };
  if (!status.installed) return { tone: "off", text: t("setupGuide.agent.notInstalled") };
  if (status.auth.state === "signed-out") return { tone: "warn", text: t("setupGuide.agent.signIn") };
  if (status.auth.state === "unknown") return { tone: "warn", text: t("setupGuide.agent.installed") };
  return { tone: "ready", text: t("setupGuide.agent.ready") };
}

// "An agent you already pay for": each program this server can run, whether
// it is installed and signed in here, and the one command that fixes it when
// it is not. Nothing is saved until the step's Continue; the live test turn
// waits on the last step, once the choice is the server's.
export function AgentPanel({ draft, update }: { draft: Draft; update: Update }) {
  const { locale, t } = useLocale();
  const [statuses, setStatuses] = useState<HarnessStatus[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const phone = shellHost()?.platform === "android";

  const load = useCallback(
    (refresh: boolean) =>
      fetch(`/api/admin/harness?${refresh ? "refresh=1&" : ""}${phone ? "platform=android" : ""}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (Array.isArray(data?.statuses) && data.statuses.every((status: HarnessStatus) => status
            && typeof status.id === "string" && typeof status.label === "string" && typeof status.installed === "boolean"
            && typeof status.availability === "string" && status.auth && typeof status.auth.state === "string"
            && Array.isArray(status.models) && status.models.every(model => model && typeof model.id === "string" && typeof model.label === "string"))) {
            setStatuses(data.statuses as HarnessStatus[]);
            setLoadError(false);
          } else setLoadError(true);
        })
        .catch(() => setLoadError(true)),
    [phone],
  );

  useEffect(() => {
    void load(false);
  }, [load]);

  async function refresh() {
    setRefreshing(true);
    try {
      await load(true);
    } finally {
      setRefreshing(false);
    }
  }

  const setAgent = (patch: Partial<Draft["agent"]>) => update((current) => ({ ...current, agent: { ...current.agent, ...patch } }));

  if (!statuses) {
    if (loadError) return <div role="alert" className="space-y-2"><p className="text-sm text-red-400">{t("setupGuide.error.agent")}</p><button type="button" className={ui.btnSmall} disabled={refreshing} aria-busy={refreshing} onClick={() => void refresh()}>{t("setupGuide.agent.check")}</button></div>;
    return (
      <div className="flex items-center gap-2 text-xs text-stone-400">
        <span className="su-scan" aria-hidden="true" /> {t("setupGuide.agent.looking")}
      </div>
    );
  }

  const chosen = statuses.find((status) => status.id === draft.agent.id) ?? null;
  const unavailable = statuses.every((status) => status.availability !== "ok");

  return (
    <div className="space-y-3">
      {loadError ? <p role="alert" className="text-sm text-red-400">{t("setupGuide.error.agent")}</p> : null}
      {unavailable && statuses[0]?.message ? <p className="su-note">{setupAgentMessage(statuses[0].message, locale)}</p> : null}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-stone-400">{t("setupGuide.agent.choose")}</span>
        <button type="button" onClick={refresh} disabled={refreshing} aria-busy={refreshing} className={ui.btnSmall}>
          <RefreshCw className={refreshing ? "size-3.5 animate-spin" : "size-3.5"} /> {t("setupGuide.agent.check")}
        </button>
      </div>
      <div role="radiogroup" aria-label={t("setupGuide.agent.group")} className="hx-cards stagger">
        {statuses.map((status) => {
          const pill = statusTone(status, locale);
          const picked = draft.agent.id === status.id;
          return (
            <button
              key={status.id}
              type="button"
              role="radio"
              aria-checked={picked}
              data-unavailable={status.availability !== "ok" || !status.installed}
              className="hx-card"
              onClick={() => setAgent({ id: status.id, model: picked ? draft.agent.model : "", utilityModel: picked ? draft.agent.utilityModel : "" })}
            >
              <span className="flex items-center gap-2.5">
                <span className="hx-mark" aria-hidden="true">
                  {MARKS[status.id]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-stone-100">{status.label}</span>
                  <span className="block truncate text-[11px] text-stone-500">
                    {status.version ? t("setupGuide.agent.version", { version: status.version }) : t(status.installed ? "setupGuide.agent.versionInstalled" : "setupGuide.agent.missing")}
                    {status.auth.plan ? ` · ${status.auth.plan}` : ""}
                  </span>
                </span>
              </span>
              <span key={pill.text} className="hx-pill reveal-pop self-start" data-tone={pill.tone}>
                {pill.text}
              </span>
            </button>
          );
        })}
      </div>

      {chosen ? (
        <div key={chosen.id} className="reveal-height space-y-3">
          {chosen.availability === "ok" && !chosen.installed ? (
            <div className="su-row flex-col items-stretch">
              <span className="text-sm text-stone-200">{t("setupGuide.agent.install", { label: chosen.label })}</span>
              <CopyLine text={chosen.installHint ?? ""} label={t("setupGuide.agent.installCommand")} />
              <span className="text-sm text-stone-200">{t("setupGuide.agent.signInStep")}</span>
              <CopyLine text={chosen.signInHint ?? ""} label={t("setupGuide.agent.signInCommand")} />
              <span className="text-xs text-stone-500">{t("setupGuide.agent.runCommands")}</span>
            </div>
          ) : chosen.installed && chosen.auth.state === "signed-out" ? (
            <div className="su-row flex-col items-stretch">
              <span className="text-sm text-stone-200">{t("setupGuide.agent.signInLabel", { label: chosen.label })}</span>
              <CopyLine text={chosen.signInHint ?? ""} label={t("setupGuide.agent.signInCommand")} />
              <span className="text-xs text-stone-500">{t("setupGuide.agent.browserSignIn")}</span>
            </div>
          ) : chosen.message ? (
            <p className="su-note">{setupAgentMessage(chosen.message, locale)}</p>
          ) : null}
          {chosen.installed ? (
            <p className="text-xs text-stone-500">
              {chosen.path}
              {chosen.auth.account ? t("setupGuide.agent.account", { account: chosen.auth.account }) : ""}{t("setupGuide.agent.tools")}
            </p>
          ) : null}
          {chosen.models.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <ModelPicker
                label={t("setupGuide.agent.storyModel")}
                models={[{ id: "", label: t("setupGuide.agent.defaultModel") }, ...chosen.models.map((model) => ({ id: model.id, label: model.label }))]}
                value={draft.agent.model}
                recommended=""
                onChange={(model) => setAgent({ model })}
              />
              <ModelPicker
                label={t("setupGuide.agent.utilityModel")}
                models={[
                  { id: "", label: t("setupGuide.agent.sameModel") },
                  ...[...chosen.models]
                    .sort((a, b) => Number(Boolean(b.cheap)) - Number(Boolean(a.cheap)))
                    .map((model) => ({ id: model.id, label: model.cheap ? t("setupGuide.agent.lightModel", { label: model.label }) : model.label })),
                ]}
                value={draft.agent.utilityModel}
                recommended=""
                onChange={(utilityModel) => setAgent({ utilityModel })}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
