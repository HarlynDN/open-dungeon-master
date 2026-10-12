"use client";

import { Loader2, Plug } from "lucide-react";
import { useState } from "react";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Switch } from "@/components/ui/Switch";
import { AgentConnectLines } from "@/components/AgentConnectLines";
import { AGENT_SCOPE_CHOICES } from "@/lib/i18n/account-metadata";
import { agentScopeLabel } from "@/lib/i18n/account-presentations";
import { setupFlowMessage, SETUP_FLOW_ERRORS } from "@/lib/i18n/setup-flow-presentations";

export type MadeConnection = { id: string; token: string; mcpUrl: string };

// Optional: the admin's own Claude Code, Codex or opencode connected to this
// server over MCP, acting as them. One button makes the connection, then
// the guide shows the single line for their program and lights up when the
// agent's first call arrives. Settings > Connected agents does the same for
// every player.
export function YourAgentStep({
  made,
  onMade,
}: {
  made: MadeConnection | null;
  onMade: (connection: MadeConnection) => void;
}) {
  const { t, locale } = useLocale();
  const [name, setName] = useState(t("setupFlow.agent.defaultName"));
  const [scopes, setScopes] = useState<string[]>(["read", "play", "dm"]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function connect() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/profile/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || t("setupFlow.agent.defaultName"), scopes, campaignId: null }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? SETUP_FLOW_ERRORS.connection);
        return;
      }
      onMade({ id: data.grant.id, token: data.token, mcpUrl: data.mcpUrl });
    } catch {
      setError(SETUP_FLOW_ERRORS.unreachable);
    } finally {
      setBusy(false);
    }
  }

  if (made) {
    return (
      <div className="hx-token space-y-3">
        <p className="text-sm text-amber-100">
          {t("setupFlow.agent.made")}
        </p>
        <AgentConnectLines grantId={made.id} token={made.token} mcpUrl={made.mcpUrl} />
        <p className="text-[11px] text-stone-500">{t("setupFlow.agent.settings")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-300">
        {t("setupFlow.agent.help")}
      </p>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.agent.name")}</span>
        <input className={ui.input} value={name} maxLength={60} onChange={(event) => setName(event.target.value)} />
      </label>
      <div className="space-y-2">
        <span className="block text-xs font-medium text-stone-400">{t("setupFlow.agent.mayDo")}</span>
        {AGENT_SCOPE_CHOICES.map((scope) => {
          const on = scopes.includes(scope.id);
          return (
            <label key={scope.id} className="flex items-start gap-3 text-sm text-stone-300">
              <Switch
                label={agentScopeLabel(scope.id, locale)}
                on={on}
                onChange={(next) => setScopes((current) => (next ? [...current, scope.id] : current.filter((entry) => entry !== scope.id)))}
              />
              <span>
                {agentScopeLabel(scope.id, locale)}
                <span className="block text-xs text-stone-500">{agentScopeLabel(scope.id, locale, "hint")}</span>
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p key={setupFlowMessage(error, locale)} role="alert" className="motion-shake text-sm text-red-400">
          {setupFlowMessage(error, locale)}
        </p>
      ) : null}
      <button type="button" className={ui.btnSecondary} onClick={connect} disabled={busy || scopes.length === 0} aria-busy={busy}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Plug className="size-4" />} {t("setupFlow.agent.connect")}
      </button>
    </div>
  );
}
