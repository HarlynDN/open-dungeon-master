"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { readUiResponse, requestErrorText, loadErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { accountRequestError, accountDate, agentScopeLabel } from "@/lib/i18n/account-presentations";
import { AGENT_SCOPE_CHOICES } from "@/lib/i18n/account-metadata";
export { AGENT_SCOPE_CHOICES } from "@/lib/i18n/account-metadata";
import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { Loader2, Plug, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import { EmptyState } from "@/components/EmptyState";
import { PageSection } from "@/components/PageShell";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { AgentConnectLines } from "@/components/AgentConnectLines";
import { AssistantLink } from "@/components/AssistantLink";

type Grant = {
  id: string;
  name: string;
  scopes: string[];
  campaignId: string | null;
  createdAt: string;
  expiresAt: string;
  lastUsedAt: string | null;
};

type Campaign = { id: string; title: string };

// Connected agents (docs/harness-mcp-plan.md 7): your own Claude Code, Codex
// or other MCP client acting as you on this server, with exactly what your
// account can do in the browser and nothing more. The token is shown once.
export function ConnectedAgentsSection() {
  const { locale, t } = useLocale();
  const [grants, setGrants] = useState<Grant[] | null>(null);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();
  const [reloads, setReloads] = useState(0);
  const [mcpUrl, setMcpUrl] = useState("");
  const [assistantUrl, setAssistantUrl] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [scopes, setScopes] = useState<string[]>(["read", "play"]);
  const [campaignId, setCampaignId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  const [campaignError, setCampaignError] = useState<UiRequestError | null>(null);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [fresh, setFresh] = useState<{ id: string; token: string; name: string } | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    readLoad<{ grants?: Grant[]; mcpUrl?: string; assistantUrl?: string }>(fetch("/api/profile/agents"), "The connected agents").then((outcome) => {
      if (cancelled) return;
      if (outcome.payload && (!Array.isArray(outcome.payload.grants) || typeof outcome.payload.mcpUrl !== "string")) {
        settle({ payload: null, error: "The connected agents did not load. The server’s answer could not be read." }); return;
      }
      settle(outcome);
      if (outcome.payload) {
        setGrants(outcome.payload.grants ?? []);
        setMcpUrl(outcome.payload.mcpUrl ?? "");
        setAssistantUrl(outcome.payload.assistantUrl ?? "");
      }
    });
    readUiResponse<{ campaigns: Campaign[] }>(fetch("/api/campaigns"), "agents.campaignLoadError")
      .then((data) => {
        if (cancelled) return;
        if (!Array.isArray(data.campaigns)) throw new Error("Malformed campaign list.");
        setCampaigns(data.campaigns.map((campaign) => ({ id: campaign.id, title: campaign.title })));
        setCampaignError(null);
      })
      .catch((cause) => { if (!cancelled) setCampaignError(accountRequestError(cause, "agents.campaignLoadError")); });
    return () => { cancelled = true; };
  }, [reloads, settle]);

  async function create() {
    setBusy(true);
    setError(null);
    try {
      const data = await readUiResponse<{ grant: Grant; token: string; mcpUrl?: string; assistantUrl?: string }>(fetch("/api/profile/agents", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), scopes, campaignId: campaignId || null }),
      }), "agents.createError");
      if (!data.grant?.id || typeof data.token !== "string") throw new Error("Malformed agent connection response.");
      setGrants((current) => [data.grant, ...(current ?? [])]);
      setMcpUrl(data.mcpUrl ?? mcpUrl);
      setAssistantUrl(data.assistantUrl ?? assistantUrl);
      setFresh({ id: data.grant.id, token: data.token, name: data.grant.name });
      setCreating(false);
      setName("");
    } catch (cause) { setError(accountRequestError(cause, "agents.createError")); } finally {
      setBusy(false);
    }
  }

  async function revoke(id: string) {
    setRevoking(id); setError(null);
    try {
      await readUiResponse(fetch(`/api/profile/agents/${id}`, { method: "DELETE" }), "agents.revokeError");
      setLeaving(id);
      if (fresh?.id === id) setFresh(null);
      setTimeout(() => {
        setGrants((current) => (current ?? []).filter((grant) => grant.id !== id)); setLeaving(null);
      }, 180);
    } catch (cause) { setError(accountRequestError(cause, "agents.revokeError")); }
    finally { setRevoking(null); }
  }
  const campaignTitle = (id: string | null) => campaigns?.find((campaign) => campaign.id === id)?.title ?? t("agents.oneCampaign");
  const when = (iso: string | null) => iso ? accountDate(iso, locale, "short") : t("agents.never");

  return (
    <PageSection
      heading={t("agents.title")}
      glyph="system-share"
      intro={<>{t("agents.hint")}{assistantUrl ? <> {t("agents.assistantHint")}</> : null}</>}
    >
      {fresh ? (
        <div className="hx-token mb-4 space-y-2 rounded-xl border border-amber-600/40 bg-amber-950/20 p-3">
          <p className="text-sm text-amber-100">
            {t("agents.ready", { name: fresh.name })}
          </p>
          <AssistantLink base={assistantUrl} token={fresh.token} />
          <AgentConnectLines grantId={fresh.id} token={fresh.token} mcpUrl={mcpUrl} />
          <button type="button" className={ui.btnSmall} onClick={() => setFresh(null)}>
            {t("agents.copied")}
          </button>
        </div>
      ) : null}

      {loadError ? <LoadFailed error={loadErrorText(locale, loadError, "agents.loadError")} onRetry={() => setReloads((current) => current + 1)} /> : null}
      {campaignError ? <LoadFailed error={requestErrorText(locale, campaignError)} onRetry={() => setReloads((current) => current + 1)} /> : null}
      {error ? <p role="alert" className="mt-2 text-sm text-ember-600">{requestErrorText(locale, error)}</p> : null}
      {grants === null ? (
        !loadError ? <div className="skeleton-block h-12 rounded-xl" aria-label={t("agents.loading")} /> : null
      ) : grants.length === 0 && !creating ? (
        (!loadError && loaded ? <EmptyState art="board" size="sm" title={t("agents.empty")} /> : null)
      ) : (
        <ul className="stagger space-y-2">
          {grants.map((grant) => (
            <li key={grant.id} className={leaving === grant.id ? "plate-row reveal-leave" : "plate-row"}>
              <span className="medallion grid size-9 place-items-center">
                <Plug className="size-4 text-amber-200" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-stone-200">{grant.name}</span>
                <span className="block truncate text-[11px] text-stone-500">
                  {t("agents.details", { scopes: grant.scopes.map((scope) => agentScopeLabel(scope, locale)).join(t("agents.scopeSeparator")), campaign: grant.campaignId ? ` · ${campaignTitle(grant.campaignId)}` : "", lastUsed: when(grant.lastUsedAt), expires: when(grant.expiresAt) })}
                </span>
              </span>
              <button type="button" className={ui.btnSmall} disabled={revoking === grant.id || leaving === grant.id} onClick={() => revoke(grant.id)}>
                <Trash2 className="size-3.5" /> {t("agents.revoke")}
              </button>
            </li>
          ))}
        </ul>
      )}

      {creating ? (
        <div className="reveal-height mt-3">
          <div className="space-y-3 rounded-xl border border-stone-800 p-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-stone-400">{t("agents.name")}</span>
              <input
                className={ui.input}
                value={name}
                maxLength={60}
                onChange={(event) => setName(event.target.value)}
                placeholder={t("agents.namePlaceholder")}
              />
            </label>
            <div className="space-y-2">
              <span className="block text-xs font-medium text-stone-400">{t("agents.mayDo")}</span>
              {AGENT_SCOPE_CHOICES.map((scope) => {
                const on = scopes.includes(scope.id);
                return (
                  <label key={scope.id} className="flex items-start gap-3 text-sm text-stone-300">
                    <Switch
                      label={agentScopeLabel(scope.id, locale)}
                      on={on}
                      onChange={(next) =>
                        setScopes((current) => (next ? [...current, scope.id] : current.filter((entry) => entry !== scope.id)))
                      }
                    />
                    <span>
                      {agentScopeLabel(scope.id, locale)}
                      <span className="block text-xs text-stone-500">{agentScopeLabel(scope.id, locale, "hint")}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div role="group" aria-label={t("agents.limit")}>
              <span className="mb-1 block text-xs font-medium text-stone-400">{t("agents.limit")}</span>
              <Select
                value={campaignId}
                onChange={setCampaignId}
                label={t("agents.limit")}
                options={[{ value: "", label: t("agents.anyCampaign") }, ...(campaigns ?? []).map((campaign) => ({ value: campaign.id, label: campaign.title }))]}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={ui.btnPrimary}
                onClick={create}
                disabled={busy || !name.trim() || scopes.length === 0 || campaigns === null || Boolean(campaignError) || Boolean(loadError)}
                aria-busy={busy}
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Plug className="size-4" />} {t("agents.connect")}
              </button>
              <button type="button" className={ui.btnSecondary} disabled={busy} onClick={() => setCreating(false)}>
                {t("agents.cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" className={`${ui.btnSmall} mt-3`} onClick={() => setCreating(true)}>
          <Plug className="size-3.5" /> {t("agents.connectAnAgent")}
        </button>
      )}
    </PageSection>
  );
}
