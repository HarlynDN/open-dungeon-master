"use client";

import { ExternalLink, Loader2, RefreshCw, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { setupFlowMessage } from "@/lib/i18n/setup-flow-presentations";
import { BackendProbe } from "@/app/admin/BackendProbe";
import { CopyLine } from "@/components/CopyLine";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { AgentPanel } from "@/app/setup/AgentPanel";
import { NO_LIST, type Draft, type ModelList } from "@/app/setup/draft";
import { ChoiceCard, ChoiceCards, FoundRow, ModelPicker, ScanMark, host, type ScanResult } from "@/app/setup/SetupParts";
import {
  KEY_PROVIDERS,
  keyForListing,
  keyProvider,
  normalizeBaseUrl,
  providerForKey,
  type KeyProviderId,
  type ListedModel,
} from "@/lib/setup/discovery-logic";

const STORY_EXAMPLES = { address: "http://192.168.1.20:8080", model: "qwen3.6-35b", provider: "https://api.example.com/v1" } as const;

const MODEL_COMMANDS = {
  llama: "llama-server -m Qwen3.6-35B-A3B-Q8_0.gguf -c 65536 --jinja --flash-attn on --cache-type-k q8_0 --cache-type-v q8_0 --temp 0.7 --top-p 0.95 --top-k 20 --min-p 0.0 --port 8001 --alias qwen3.6-35b",
  container: " --host 0.0.0.0",
  ollama: "ollama pull qwen3.6:35b-a3b-q8_0 && ollama create qwen3.6-dm -f models/qwen3.6-dm.Modelfile",
} as const;

type Update = (change: (draft: Draft) => Draft) => void;

type Listing =
  | { ok: true; baseUrl: string; models: ListedModel[]; recommended: string }
  | { ok: false; baseUrl: string; error: string; needsKey?: boolean };

async function askForModels(body: Record<string, string>): Promise<Listing> {
  try {
    const response = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "models", ...body }),
    });
    const data = await response.json().catch(() => null);
    return data ?? { ok: false, baseUrl: "", error: "The server did not answer." };
  } catch {
    return { ok: false, baseUrl: "", error: "Could not reach this server." };
  }
}

function listFrom(result: Listing): ModelList {
  return result.ok
    ? { state: "ok", models: result.models, recommended: result.recommended, error: "", needsKey: false }
    : { state: "failed", models: [], recommended: "", error: result.error, needsKey: Boolean(result.needsKey) };
}

export function StorytellerStep({
  draft,
  update,
  scan,
  scanning,
  onRescan,
  savedKeyFor,
  savedKeyBase,
  inContainer,
}: {
  draft: Draft;
  update: Update;
  scan: ScanResult | null;
  scanning: boolean;
  onRescan: () => void;
  // Which hosted provider the saved key belongs to, if any; a blank key
  // field keeps it.
  savedKeyFor: KeyProviderId | null;
  // The address a saved key belongs to, when a key is saved at all.
  savedKeyBase: string;
  inContainer: boolean;
}) {
  const { t } = useLocale();
  const found = scan?.text ?? [];
  const pick = (story: Draft["story"]) => update((current) => ({ ...current, story }));
  return (
    <div className="space-y-4">
      <ChoiceCards label={t("setupFlow.story.who")}>
        <ChoiceCard
          picked={draft.story === "local"}
          onPick={() => pick("local")}
          glyph="system-lore"
          title={t("setupFlow.story.local")}
          sub={t("setupFlow.story.localHelp")}
          badge={scanning ? { text: t("setupFlow.local.looking"), tone: "off" } : found.length ? { text: t("setupFlow.local.foundCount", { count: found.length }), tone: "ready" } : null}
        />
        <ChoiceCard
          picked={draft.story === "key"}
          onPick={() => pick("key")}
          glyph="tab-admin"
          title={t("setupFlow.story.key")}
          sub={t("setupFlow.story.keyHelp")}
        />
        <ChoiceCard
          picked={draft.story === "agent"}
          onPick={() => pick("agent")}
          glyph="system-share"
          title={t("setupFlow.story.agent")}
          sub={t("setupFlow.story.agentHelp")}
        />
        <ChoiceCard
          picked={draft.story === "none"}
          onPick={() => pick("none")}
          glyph="tab-characters"
          title={t("setupFlow.story.person")}
          sub={t("setupFlow.story.personHelp")}
        />
      </ChoiceCards>

      {draft.story === "local" ? (
        <div key="local" className="reveal-height">
          <LocalPanel
            draft={draft}
            update={update}
            found={found}
            scanning={scanning}
            onRescan={onRescan}
            savedKeyBase={savedKeyBase}
            inContainer={inContainer}
          />
        </div>
      ) : draft.story === "key" ? (
        <div key="key" className="reveal-height">
          <KeyPanel draft={draft} update={update} savedKeyFor={savedKeyFor} />
        </div>
      ) : draft.story === "agent" ? (
        <div key="agent" className="reveal-height">
          <AgentPanel draft={draft} update={update} />
        </div>
      ) : draft.story === "none" ? (
        <p key="none" className="reveal su-note">
          {t("setupFlow.story.personNote")}
        </p>
      ) : null}
    </div>
  );
}

function LocalPanel({
  draft,
  update,
  found,
  scanning,
  onRescan,
  savedKeyBase,
  inContainer,
}: {
  draft: Draft;
  update: Update;
  found: ScanResult["text"];
  scanning: boolean;
  onRescan: () => void;
  savedKeyBase: string;
  inContainer: boolean;
}) {
  const { t, locale } = useLocale();
  const local = draft.local;
  const [looking, setLooking] = useState(false);
  const setLocal = (patch: Partial<Draft["local"]>) => update((current) => ({ ...current, local: { ...current.local, ...patch } }));
  const chosenFound = !local.typed ? found.find((entry) => entry.baseUrl === normalizeBaseUrl(local.baseUrl)) : undefined;
  // The key saved on this server belongs to this very server: a blank key
  // field keeps it, and the server lists the models with it.
  const keySavedHere = Boolean(savedKeyBase) && keyForListing({ typed: "", savedKey: "saved", savedBaseUrl: savedKeyBase, baseUrl: local.baseUrl }) === "saved";

  async function look() {
    setLooking(true);
    setLocal({ list: { ...NO_LIST, state: "busy" } });
    const result = await askForModels({ baseUrl: local.baseUrl, apiKey: local.apiKey });
    setLooking(false);
    const list = listFrom(result);
    update((current) => ({
      ...current,
      local: {
        ...current.local,
        baseUrl: result.baseUrl || current.local.baseUrl,
        list,
        model: list.models.some((model) => model.id === current.local.model) ? current.local.model : list.recommended || current.local.model,
      },
    }));
  }

  // Running the wizard again: the scan saw the server want its key, and
  // that key is already saved, so the models are listed with it unasked.
  const listedSaved = useRef("");
  useEffect(() => {
    if (local.list.needsKey && keySavedHere && !local.apiKey && listedSaved.current !== local.baseUrl) {
      listedSaved.current = local.baseUrl;
      void look();
    }
    // Only when the chosen server is one the saved key belongs to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local.list.needsKey, keySavedHere, local.baseUrl]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-medium text-stone-400">
          <ScanMark scanning={scanning} found={found.length > 0} />
          {scanning ? t("setupFlow.local.scanning") : found.length ? t("setupFlow.local.found") : t("setupFlow.local.absent")}
        </span>
        <button type="button" className={ui.btnSmall} onClick={onRescan} disabled={scanning} aria-busy={scanning}>
          <RefreshCw className={cn("size-3.5", scanning && "animate-spin")} /> {t("setupFlow.local.again")}
        </button>
      </div>

      <div role="radiogroup" aria-label={t("setupFlow.local.servers")} className="stagger space-y-2">
        {found.map((entry) => (
          <FoundRow
            key={entry.baseUrl}
            picked={Boolean(chosenFound && chosenFound.baseUrl === entry.baseUrl)}
            onPick={() =>
              setLocal({
                baseUrl: entry.baseUrl,
                typed: false,
                model: entry.recommended,
                list: entry.needsKey
                  ? { ...NO_LIST, state: "failed", needsKey: true, error: `${host(entry.baseUrl)} wants its API key.` }
                  : { state: "ok", models: entry.models, recommended: entry.recommended, error: "", needsKey: false },
              })
            }
            title={`${entry.label} · ${host(entry.baseUrl)}`}
            detail={entry.needsKey ? t("setupFlow.local.needsKey") : t(entry.models.length === 1 ? "setupFlow.local.modelOne" : "setupFlow.local.models", { count: entry.models.length, recommended: entry.recommended ? `, ${entry.recommended}` : "" })}
            tone={entry.needsKey ? "warn" : "ok"}
          />
        ))}
        <FoundRow
          picked={local.typed}
          onPick={() => setLocal({ typed: true, list: NO_LIST })}
          title={t("setupFlow.local.elsewhere")}
          detail={t("setupFlow.local.elsewhereHelp")}
          tone="off"
        />
      </div>

      {!scanning && !found.length ? <StartHints inContainer={inContainer} /> : null}

      {local.typed ? (
        <div key="typed" className="reveal flex flex-wrap items-end gap-2">
          <label className="block min-w-0 flex-1">
            <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.local.address")}</span>
            <input
              className={ui.input}
              value={local.baseUrl}
              onChange={(event) => setLocal({ baseUrl: event.target.value, list: NO_LIST })}
              placeholder={STORY_EXAMPLES.address}
            />
          </label>
          <button type="button" className={ui.btnSecondary} onClick={look} disabled={looking || !local.baseUrl.trim()} aria-busy={looking}>
            {looking ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} {t("setupFlow.local.look")}
          </button>
        </div>
      ) : null}

      {local.list.needsKey || local.apiKey ? (
        <div key="key" className="reveal flex flex-wrap items-end gap-2">
          <label className="block min-w-0 flex-1">
            <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.local.apiKey")}</span>
            <input
              type="password"
              className={ui.input}
              value={local.apiKey}
              onChange={(event) => setLocal({ apiKey: event.target.value })}
              placeholder={keySavedHere ? t("setupMedia.key.saved") : t("setupFlow.local.apiKeyHint")}
              autoComplete="off"
            />
          </label>
          <button type="button" className={ui.btnSecondary} onClick={look} disabled={looking || (!local.apiKey.trim() && !keySavedHere)} aria-busy={looking}>
            {looking ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} {t("setupFlow.local.again")}
          </button>
        </div>
      ) : null}

      {local.list.state === "failed" && local.list.error ? (
        <p key={local.list.error} role="alert" className="motion-shake text-sm text-red-400">
          {setupFlowMessage(local.list.error, locale)}
        </p>
      ) : null}

      {local.list.models.length ? (
        <ModelPicker
          label={t("setupFlow.local.model")}
          models={local.list.models}
          value={local.model}
          recommended={local.list.recommended}
          onChange={(model) => setLocal({ model })}
        />
      ) : local.typed || local.baseUrl ? (
        <label className="reveal block">
          <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.local.modelName")}</span>
          <input className={ui.input} value={local.model} onChange={(event) => setLocal({ model: event.target.value })} placeholder={STORY_EXAMPLES.model} />
          <span className="mt-1 block text-[11px] text-stone-500">{t("setupFlow.local.nameHelp")}</span>
        </label>
      ) : null}

      {local.baseUrl && local.model ? (
        <BackendProbe which="story" baseUrl={normalizeBaseUrl(local.baseUrl)} model={local.model} apiKey={local.apiKey} />
      ) : null}
    </div>
  );
}

// What to run when nothing answered. The commands match the README's.
function StartHints({ inContainer }: { inContainer: boolean }) {
  const { t } = useLocale();
  return (
    <details className="reveal rounded-lg border border-stone-800 bg-stone-950/40 px-3 py-2">
      <summary className="cursor-pointer text-sm text-stone-300">{t("setupFlow.hints.start")}</summary>
      <div className="mt-3 space-y-3 text-xs text-stone-400">
        {inContainer ? (
          <p className="su-note">
            {t("setupFlow.hints.container")}
          </p>
        ) : null}
        <div>
          <span className="mb-1 block">{t("setupFlow.hints.llama")}</span>
          <CopyLine
            text={MODEL_COMMANDS.llama + (inContainer ? MODEL_COMMANDS.container : "")}
            label={t("setupFlow.hints.llamaCommand")}
          />
        </div>
        <div>
          <span className="mb-1 block">{t("setupFlow.hints.ollama")}</span>
          <CopyLine text={MODEL_COMMANDS.ollama} label={t("setupFlow.hints.ollamaCommand")} />
        </div>
        <p>
          {t("setupFlow.hints.studio")}
        </p>
      </div>
    </details>
  );
}

function KeyPanel({ draft, update, savedKeyFor }: { draft: Draft; update: Update; savedKeyFor: KeyProviderId | null }) {
  const { t, locale } = useLocale();
  const key = draft.key;
  const provider = keyProvider(key.provider);
  const [checking, setChecking] = useState(false);
  const [switched, setSwitched] = useState<KeyProviderId | null>(null);
  const keptKey = savedKeyFor === key.provider && !key.apiKey.trim();
  const setKey = (patch: Partial<Draft["key"]>) => update((current) => ({ ...current, key: { ...current.key, ...patch } }));

  async function check(next: Draft["key"] = key) {
    setChecking(true);
    setKey({ list: { ...NO_LIST, state: "busy" } });
    const result = await askForModels({
      provider: next.provider,
      baseUrl: next.provider === "other" ? next.baseUrl : "",
      apiKey: next.apiKey,
    });
    setChecking(false);
    const list = listFrom(result);
    update((current) => ({
      ...current,
      key: {
        ...current.key,
        list,
        model: list.models.some((model) => model.id === current.key.model) ? current.key.model : list.recommended,
      },
    }));
  }

  // A saved key lists its models on arrival, so running the wizard again
  // needs no pasting.
  const listedSaved = useRef(false);
  useEffect(() => {
    if (keptKey && key.list.state === "idle" && !listedSaved.current) {
      listedSaved.current = true;
      void check();
    }
    // Only on arrival with a saved key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keptKey]);

  function typeKey(value: string) {
    const guess = providerForKey(value);
    if (guess && guess !== key.provider && key.provider !== "other") {
      setSwitched(guess);
      setKey({ apiKey: value, provider: guess, list: NO_LIST, model: "" });
      return;
    }
    setKey({ apiKey: value, list: NO_LIST });
  }

  return (
    <div className="space-y-3">
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        <SegmentedControl
          options={KEY_PROVIDERS.map((entry) => ({ value: entry.id, label: entry.id === "other" ? t("setupFlow.key.other") : entry.label }))}
          value={key.provider}
          onChange={(next) => {
            setSwitched(null);
            setKey({ provider: next, list: NO_LIST, model: "" });
          }}
          label={t("setupFlow.key.provider")}
          className="w-max"
        />
      </div>
      {switched ? (
        <p key={switched} role="status" className="reveal text-xs text-amber-200">
          {t("setupFlow.key.switched", { provider: keyProvider(switched).label })}
        </p>
      ) : null}
      {key.provider === "other" ? (
        <label key="base" className="reveal block">
          <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.key.address")}</span>
          <input
            className={ui.input}
            value={key.baseUrl}
            onChange={(event) => setKey({ baseUrl: event.target.value, list: NO_LIST })}
            placeholder={STORY_EXAMPLES.provider}
          />
        </label>
      ) : null}
      <div className="flex flex-wrap items-end gap-2">
        <label className="block min-w-0 flex-1">
          <span className="mb-1 flex items-center justify-between gap-2 text-xs font-medium text-stone-400">
            {t("setupFlow.key.apiKey")}
            {provider.keyUrl ? (
              <a href={provider.keyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-amber-200 hover:text-amber-100">
                {t("setupFlow.key.get", { provider: provider.label })} <ExternalLink className="size-3" />
              </a>
            ) : null}
          </span>
          <input
            type="password"
            className={ui.input}
            value={key.apiKey}
            onChange={(event) => typeKey(event.target.value)}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text").trim();
              if (pasted) {
                event.preventDefault();
                typeKey(pasted);
              }
            }}
            placeholder={keptKey ? t("setupMedia.key.saved") : provider.keyPlaceholder}
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          className={ui.btnSecondary}
          onClick={() => void check()}
          disabled={checking || (!key.apiKey.trim() && !keptKey) || (key.provider === "other" && !key.baseUrl.trim())}
          aria-busy={checking}
        >
          {checking ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} {t("setupFlow.key.check")}
        </button>
      </div>
      <p className="text-[11px] leading-4 text-stone-500">
        {t("setupFlow.key.savedHelp")}
      </p>
      {key.list.state === "failed" ? (
        <p key={key.list.error} role="alert" className="motion-shake text-sm text-red-400">
          {setupFlowMessage(key.list.error, locale)}
        </p>
      ) : null}
      {key.list.models.length ? (
        <ModelPicker label={t("setupFlow.local.model")} models={key.list.models} value={key.model} recommended={key.list.recommended} onChange={(model) => setKey({ model })} />
      ) : null}
      {provider.coversMedia ? (
        <p className="su-note">
          {t("setupFlow.key.media")}
        </p>
      ) : null}
      {key.model && key.list.state === "ok" ? (
        <BackendProbe
          which="story"
          baseUrl={normalizeBaseUrl(provider.baseUrl || key.baseUrl)}
          model={key.model}
          apiKey={key.apiKey}
        />
      ) : null}
    </div>
  );
}
