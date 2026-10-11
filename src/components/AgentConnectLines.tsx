"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { agentConnectionActivity, agentFirstCallText, agentProgramLabel, agentSetupInstructions, accountRequestError } from "@/lib/i18n/account-presentations";
import { readUiResponse, requestErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { AGENT_PROGRAMS, agentSetupLine, type AgentProgram } from "@/lib/agents/setup-line";
export { agentSetupLine, type AgentProgram } from "@/lib/agents/setup-line";

import { useEffect, useState } from "react";
import { CopyLine } from "@/components/CopyLine";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

// The one line an agent needs, for the program the person actually uses,
// then a lamp that lights when the agent's first call arrives. Shared by
// Settings > Connected agents and the guided setup (src/app/setup): both
// used to print every program's line at once and leave the person to guess
// which was theirs, and whether it had worked.


type Activity = { grantId: string; tool: string; ok: boolean; createdAt: string };

// How long the lamp keeps asking before it says so and stops. Polling a
// signed-in route every few seconds is cheap, but not forever.
const WATCH_MS = 10 * 60 * 1000;
const POLL_MS = 3_000;

export function AgentConnectLines({
  grantId,
  token,
  mcpUrl,
  initialProgram = "claude",
}: {
  grantId: string;
  token: string;
  mcpUrl: string;
  initialProgram?: AgentProgram;
}) {
  const { locale, t } = useLocale();
  const [watchError, setWatchError] = useState<UiRequestError | null>(null);
  const [watchAttempt, setWatchAttempt] = useState(0);
  const [program, setProgram] = useState<AgentProgram>(initialProgram);
  const [first, setFirst] = useState<Activity | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const line = agentSetupLine(program, mcpUrl, token);

  useEffect(() => {
    if (first) {
      return;
    }
    let live = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    const look = async () => {
      try {
        const data = await readUiResponse<unknown>(fetch("/api/profile/agents"), "agents.watchError");
        if (!live) return;
        const activity = agentConnectionActivity(data, grantId);
        setWatchError(null);
        if (activity) { setFirst({ grantId, ok: true, ...activity }); return; }
      } catch (cause) { if (live) setWatchError(accountRequestError(cause, "agents.watchError")); }
      if (!live) return;
      if (Date.now() - started > WATCH_MS) {
        setGaveUp(true);
        return;
      }
      timer = setTimeout(look, POLL_MS);
    };
    timer = setTimeout(look, POLL_MS);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [grantId, first, watchAttempt]);

  return (
    <div className="space-y-3">
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        <SegmentedControl options={AGENT_PROGRAMS.map((entry) => ({ value: entry.value, label: agentProgramLabel(entry.value, locale) }))} value={program} onChange={setProgram} label={t("agents.program")} className="w-max" />
      </div>
      <ol className="su-steps space-y-2 text-sm text-stone-300">
        <li>
          <span className="su-step-n">1</span>
          <span className="min-w-0 flex-1">
            {t("agents.copyThis")}
            <span key={program} className="reveal mt-1.5 block">
              <CopyLine text={line.text} label={t("agents.setupLabel", { program: agentProgramLabel(program, locale) })} block={line.block} />
            </span>
          </span>
        </li>
        <li>
          <span className="su-step-n">2</span>
          <span key={program} className="reveal min-w-0 flex-1">{agentSetupInstructions(program, locale)}</span>
        </li>
        <li>
          <span className="su-step-n">3</span>
          <span className="min-w-0 flex-1">
            {t("agents.ask")}
          </span>
        </li>
      </ol>
      {watchError ? <div role="alert" className="flex flex-wrap items-center gap-2 text-xs text-ember-600">
        <span>{requestErrorText(locale, watchError)}</span>
        <button type="button" className="underline" onClick={() => { setGaveUp(false); setWatchAttempt((attempt) => attempt + 1); }}>{t("voicePicker.retry")}</button>
      </div> : null}
      <p
        role="status"
        aria-live="polite"
        className="su-watch flex items-center gap-2 text-sm"
        data-state={first ? "ok" : gaveUp ? "off" : "wait"}
      >
        <span className="su-lamp" data-tone={first ? "ok" : gaveUp ? "off" : "wait"} aria-hidden="true" />
        {first ? (
          <span key="ok" className="reveal-pop text-emerald-300">
            {agentFirstCallText(first, locale)}
          </span>
        ) : gaveUp ? (
          <span key="off" className="reveal text-stone-400">
            {t("agents.gaveUp")}
          </span>
        ) : (
          <span key="wait" className="text-stone-400">{t("agents.waiting")}</span>
        )}
      </p>
    </div>
  );
}
