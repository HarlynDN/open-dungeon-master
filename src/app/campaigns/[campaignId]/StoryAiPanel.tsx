"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { STORY_PROVIDER_KEYS, STORY_BACKEND_KEYS, storyProviderLabel, storyBackendLabel, proseSizeLabel, controlText } from "@/lib/i18n/story-control-presentations";
import { AlignLeft, Bot, Image as ImageIcon, Wrench } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ImagesNote } from "@/app/campaigns/[campaignId]/NarrationNote";
import { ModelNote } from "@/components/ModelNote";
import { Select } from "@/components/ui/Select";
import type { MaskedStorySettings } from "@/lib/db/settings";
import type { HarnessOffer } from "@/lib/harness/policy";
import { endpointKind } from "@/lib/dm/sampling-logic";
import { shellHost } from "@/lib/shell-host";
import type { TextProvider } from "@/lib/text-models";
import {
  PROSE_SIZE_VALUES,
  type ImageBackend,
  type StorySettings,
} from "@/lib/types";

// A secret field never receives its stored value; SECRET_KEPT means "leave it
// as is" and the field is simply omitted from the PATCH. Same contract as the
// admin settings panel.
const SECRET_KEPT = "\u0000keep";

// Per-campaign AI settings for the Setup tab. The values render from the
// campaign snapshot (kept live by campaign_updated over SSE); only the
// key-existence booleans come from the story-settings GET, because the
// snapshot is scrubbed of keys for everyone.
export function StoryAiPanel({
  campaignId,
  settings,
  steersStory,
}: {
  campaignId: string;
  settings: StorySettings;
  steersStory: boolean;
}) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState(false);
  // Every control renders the server's settings, so a refused PATCH changes
  // nothing on screen; without this line it changes nothing silently.
  const [error, setError] = useState("");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [hasUtilityKey, setHasUtilityKey] = useState(false);
  // Defaults to true so the warning never flashes while the answer is in
  // flight on servers that are fine.
  const [imagesConfigured, setImagesConfigured] = useState(true);
  // This campaign's own backend, which for a table on its own OpenAI key is
  // ready even when the server has no image backend of its own.
  const [imagesReady, setImagesReady] = useState(true);
  // Its backend is there but has no model picked, so it paints nothing
  // (src/lib/db/settings.ts); the server's own ComfyUI said the same.
  const [imagesNeedModel, setImagesNeedModel] = useState(false);
  const [serverImagesNeedModel, setServerImagesNeedModel] = useState(false);
  // A world an app hosts: the backend is chosen once for the device and every
  // campaign follows it, so this panel shows it instead of editing it. null
  // until the answer lands, so the editable rows never flash on a device.
  const [deviceManaged, setDeviceManaged] = useState<boolean | null>(null);
  // Only an admin points the server at an address or holds its keys, so for
  // anyone else the URL and key fields are left out and the campaign runs on
  // the server's own backends (src/lib/db/settings.ts).
  const [serverManaged, setServerManaged] = useState(false);
  // Whether the server's agent program may narrate (and paint for) this
  // campaign; the admin decides (src/lib/harness/policy.ts). Hidden until
  // the answer lands, so the choice never flashes on and off.
  const [harness, setHarness] = useState<HarnessOffer | null>(null);
  // Text fields commit on blur or Enter, so a half-typed URL never PATCHes.
  const [drafts, setDrafts] = useState({
    customBaseUrl: settings.customBaseUrl,
    customModel: settings.customModel,
    customApiKey: SECRET_KEPT,
    utilityBaseUrl: settings.utilityBaseUrl,
    utilityModel: settings.utilityModel,
    utilityApiKey: SECRET_KEPT,
  });

  useEffect(() => {
    if (!steersStory) {
      return;
    }
    let cancelled = false;
    void fetch(`/api/campaigns/${campaignId}/story-settings`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { settings?: MaskedStorySettings; harness?: HarnessOffer } | null) => {
        if (!cancelled && data?.settings) {
          setHasCustomKey(data.settings.hasCustomApiKey);
          setHasUtilityKey(data.settings.hasUtilityApiKey);
          setImagesReady(data.settings.imagesReady);
          setImagesNeedModel(data.settings.imagesNeedModel === true);
          setServerManaged(data.settings.serverManaged === true);
        }
        if (!cancelled && data?.harness) {
          setHarness(data.harness);
        }
        if (!cancelled) {
          // A server older than this field, or a failed read, edits as before.
          setDeviceManaged(data?.settings?.deviceManaged === true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDeviceManaged(false);
        }
      });
    void fetch("/api/capabilities")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { images?: { configured?: boolean; needsModel?: boolean } } | null) => {
        if (!cancelled && data?.images) {
          setImagesConfigured(data.images.configured !== false);
          setServerImagesNeedModel(data.images.needsModel === true);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [steersStory, campaignId]);

  async function patch(update: Partial<StorySettings>) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/story-settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        settings?: MaskedStorySettings;
        harness?: HarnessOffer;
      };
      if (!response.ok) {
        setError(data.error ?? createTranslator("en")("storyControl.error.settings"));
        return;
      }
      if (data.settings) {
        setHasCustomKey(data.settings.hasCustomApiKey);
        setHasUtilityKey(data.settings.hasUtilityApiKey);
        setImagesReady(data.settings.imagesReady);
        setImagesNeedModel(data.settings.imagesNeedModel === true);
      }
      if (data.harness) {
        setHarness(data.harness);
      }
      if (update.customApiKey !== undefined) {
        setDrafts((prev) => ({ ...prev, customApiKey: SECRET_KEPT }));
      }
      if (update.utilityApiKey !== undefined) {
        setDrafts((prev) => ({ ...prev, utilityApiKey: SECRET_KEPT }));
      }
    } catch {
      setError(createTranslator("en")("common.serverUnavailable"));
    } finally {
      setBusy(false);
    }
  }

  function commitText(field: "customBaseUrl" | "customModel" | "utilityBaseUrl" | "utilityModel") {
    const value = drafts[field].trim();
    if (value !== settings[field]) {
      void patch({ [field]: value });
    }
  }

  function commitKey(field: "customApiKey" | "utilityApiKey") {
    const value = drafts[field];
    if (value !== SECRET_KEPT) {
      void patch({ [field]: value.trim() });
    }
  }

  const harnessName = harness?.label
    ? t("storyControl.agentName", { label: harness.label, model: harness.model ? ` (${harness.model})` : "" })
    : storyProviderLabel("harness", locale);
  const storytellerSummary =
    settings.textProvider === "custom"
      ? settings.customModel || t("storyControl.customFallback")
      : settings.textProvider === "harness"
        ? harnessName
        : storyProviderLabel(settings.textProvider, locale);
  const imagesSummary = settings.imageGenerationEnabled
    ? `${storyBackendLabel(settings.imageBackend, locale)}${settings.autoImages ? t("storyControl.automatic") : ""}`
    : t("storyControl.off");

  if (!steersStory) {
    return (
      <section className="rounded-lg border border-stone-800 bg-stone-950/60 p-4">
        <h2 className="mb-2 text-sm font-medium text-stone-300">{t("storyControl.aiLiteral.0")}</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <Bot className="size-3.5 text-amber-200" />{t("storyControl.aiLiteral.1")}{storytellerSummary}
          </span>
          <span className="flex items-center gap-1.5">
            <Wrench className="size-3.5 text-amber-200" />{t("storyControl.aiLiteral.2")}{settings.utilityModel || t("storyControl.off")}
          </span>
          <span className="flex items-center gap-1.5">
            <ImageIcon className="size-3.5 text-amber-200" />{t("storyControl.aiLiteral.3")}{imagesSummary}
          </span>
          <span className="flex items-center gap-1.5">
            <AlignLeft className="size-3.5 text-amber-200" />{t("storyControl.aiLiteral.4")}{proseSizeLabel(settings.proseSize, locale)}
          </span>
        </div>
      </section>
    );
  }

  const shell = shellHost();
  const backendName = { openai: "OpenAI", openrouter: "OpenRouter", local: t("storyControl.localModel") }[
    endpointKind(settings.customBaseUrl)
  ];
  const deviceStoryteller =
    settings.textProvider === "custom"
      ? `${settings.customModel || t("storyControl.customFallback")} (${backendName})`
      : settings.textProvider === "harness"
        ? harnessName
        : storyProviderLabel(settings.textProvider, locale);
  // The agent is offered only where the admin allows it, but a campaign that
  // already chose it keeps seeing its own choice.
  const providerChoices = (Object.keys(STORY_PROVIDER_KEYS) as TextProvider[]).filter(
    (provider) => provider !== "harness" || harness?.offered || settings.textProvider === "harness",
  );

  const selectClass =
    "rounded-md border border-stone-700 bg-stone-900 px-2 py-1 text-xs outline-none focus:border-amber-600";
  const inputClass = cn(selectClass, "w-64 max-w-full");
  const labelClass = "w-20 shrink-0 text-stone-500";
  const blurOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposingInput(event)) return;
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <section className="rounded-lg border border-stone-800 bg-stone-950/60 p-4">
      <h2 className="mb-3 text-sm font-medium text-stone-300">{t("storyControl.aiLiteral.0")}</h2>
      {error ? <p className="motion-shake mb-2 text-xs text-red-400">{controlText(error, locale)}</p> : null}
      <div className={cn("space-y-3 text-xs", busy && "opacity-70")}>
        {deviceManaged === null ? null : deviceManaged ? (
          <div className="reveal space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={labelClass}>{t("storyControl.aiLiteral.5")}</span>
              <span className="text-stone-300">{deviceStoryteller}</span>
            </div>
            {settings.textProvider !== "none" && settings.utilityModel ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className={labelClass}>{t("storyControl.aiLiteral.6")}</span>
                <span className="text-stone-300">{settings.utilityModel}</span>
              </div>
            ) : null}
            <p className="text-stone-500">{t("storyControl.aiLiteral.7")}{" "}
              {shell
                ? t("storyControl.deviceHome")
                : t("storyControl.deviceHost")}
            </p>
            {shell ? (
              <button
                type="button"
                onClick={() => shell.showServers()}
                className="motion-press rounded-md border border-stone-700 px-2 py-1 text-stone-300 hover:border-amber-700 hover:text-amber-200"
              >{t("storyControl.aiLiteral.8")}</button>
            ) : null}
          </div>
        ) : (
          <div className="reveal space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={labelClass}>{t("storyControl.aiLiteral.5")}</span>
              <Select
                value={settings.textProvider}
                onChange={(textProvider) => patch({ textProvider })}
                options={providerChoices.map((provider) => ({
                  value: provider,
                  label: provider === "harness" ? harnessName : storyProviderLabel(provider, locale),
                }))}
                label={t("storyControl.aiLiteral.5")}
                size="sm"
              />
            </div>
            {settings.textProvider === "harness" ? (
              <p className="reveal text-stone-500">{t("storyControl.aiLiteral.9")}</p>
            ) : null}
            {settings.textProvider === "custom" && serverManaged ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={labelClass}>{t("storyControl.aiLiteral.10")}</span>
                  <input
                    value={drafts.customModel}
                    onChange={(event) =>
                      setDrafts((prev) => ({ ...prev, customModel: event.target.value }))
                    }
                    onBlur={() => commitText("customModel")}
                    onKeyDown={blurOnEnter}
                    className={inputClass}
                  />
                </div>
                <ModelNote role="story" baseUrl="" model={settings.customModel} />
                <p className="text-stone-500">{t("storyControl.aiLiteral.11")}</p>
              </>
            ) : settings.textProvider === "custom" ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={labelClass}>{t("storyControl.aiLiteral.12")}</span>
                  <input
                    value={drafts.customBaseUrl}
                    onChange={(event) =>
                      setDrafts((prev) => ({ ...prev, customBaseUrl: event.target.value }))
                    }
                    onBlur={() => commitText("customBaseUrl")}
                    onKeyDown={blurOnEnter}
                    placeholder={t("storyControl.aiLiteral.13")}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={labelClass}>{t("storyControl.aiLiteral.10")}</span>
                  <input
                    value={drafts.customModel}
                    onChange={(event) =>
                      setDrafts((prev) => ({ ...prev, customModel: event.target.value }))
                    }
                    onBlur={() => commitText("customModel")}
                    onKeyDown={blurOnEnter}
                    className={inputClass}
                  />
                </div>
                <ModelNote role="story" baseUrl={settings.customBaseUrl} model={settings.customModel} />
                <div className="flex flex-wrap items-center gap-2">
                  <span className={labelClass}>{t("storyControl.aiLiteral.14")}</span>
                  <input
                    type="password"
                    value={drafts.customApiKey === SECRET_KEPT ? "" : drafts.customApiKey}
                    onChange={(event) =>
                      setDrafts((prev) => ({ ...prev, customApiKey: event.target.value }))
                    }
                    onBlur={() => commitKey("customApiKey")}
                    onKeyDown={blurOnEnter}
                    placeholder={hasCustomKey ? t("storyControl.keySet") : t("storyControl.keyUnset")}
                    className={inputClass}
                  />
                  {hasCustomKey ? (
                    <button
                      type="button"
                      onClick={() => patch({ customApiKey: "" })}
                      className="rounded-md border border-stone-700 px-2 py-1 text-stone-400 hover:text-red-400"
                    >{t("storyControl.aiLiteral.15")}</button>
                  ) : null}
                </div>
                <p className="text-stone-500">{t("storyControl.aiLiteral.16")}</p>
              </>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 border-t border-stone-800/60 pt-3">
              <span className={labelClass}>{t("storyControl.aiLiteral.6")}</span>
              <Select
                value={settings.utilityProvider}
                onChange={(utilityProvider) => patch({ utilityProvider })}
                options={(["local", "custom"] as TextProvider[]).map((provider) => ({ value: provider, label: storyProviderLabel(provider, locale) }))}
                label={t("storyControl.aiLiteral.17")}
                size="sm"
              />
              <input
                value={drafts.utilityModel}
                onChange={(event) =>
                  setDrafts((prev) => ({ ...prev, utilityModel: event.target.value }))
                }
                onBlur={() => commitText("utilityModel")}
                onKeyDown={blurOnEnter}
                placeholder={t("storyControl.aiLiteral.18")}
                className={inputClass}
              />
            </div>
            {settings.utilityModel ? (
              <ModelNote role="utility" baseUrl={settings.utilityProvider === "custom" ? settings.utilityBaseUrl : ""} model={settings.utilityModel} />
            ) : null}
            {settings.utilityProvider === "custom" && settings.utilityModel && !serverManaged ? (
              <div className="reveal flex flex-wrap items-center gap-2">
                <span className={labelClass}>{t("storyControl.aiLiteral.19")}</span>
                <input
                  value={drafts.utilityBaseUrl}
                  onChange={(event) =>
                    setDrafts((prev) => ({ ...prev, utilityBaseUrl: event.target.value }))
                  }
                  onBlur={() => commitText("utilityBaseUrl")}
                  onKeyDown={blurOnEnter}
                  placeholder={t("storyControl.aiLiteral.13")}
                  className={inputClass}
                />
                <input
                  type="password"
                  value={drafts.utilityApiKey === SECRET_KEPT ? "" : drafts.utilityApiKey}
                  onChange={(event) =>
                    setDrafts((prev) => ({ ...prev, utilityApiKey: event.target.value }))
                  }
                  onBlur={() => commitKey("utilityApiKey")}
                  onKeyDown={blurOnEnter}
                  placeholder={hasUtilityKey ? t("storyControl.keySet") : t("storyControl.keyOptional")}
                  className={cn(selectClass, "w-40")}
                />
                {hasUtilityKey ? (
                  <button
                    type="button"
                    onClick={() => patch({ utilityApiKey: "" })}
                    className="rounded-md border border-stone-700 px-2 py-1 text-stone-400 hover:text-red-400"
                  >{t("storyControl.aiLiteral.15")}</button>
                ) : null}
              </div>
            ) : null}

          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-stone-800/60 pt-3">
          <span className={labelClass}>{t("storyControl.aiLiteral.20")}</span>
          <Select<ImageBackend | "off">
            value={settings.imageGenerationEnabled ? settings.imageBackend : "off"}
            label={t("storyControl.aiLiteral.20")}
            size="sm"
            options={[
              { value: "off", label: t("storyControl.aiLiteral.21") },
              // On a device the backend follows the device; only on and off
              // are this campaign's to choose.
              ...(deviceManaged
                ? [settings.imageBackend]
                : (Object.keys(STORY_BACKEND_KEYS) as ImageBackend[]).filter(
                    (backend) => backend !== "harness" || harness?.pictures || settings.imageBackend === "harness",
                  )
              ).map((backend) => ({ value: backend, label: storyBackendLabel(backend, locale) })),
            ]}
            onChange={(value) => {
              // "Off" is imageGenerationEnabled, not a backend: picking a
              // backend again switches images back on in the same PATCH.
              void patch(
                value === "off"
                  ? { imageGenerationEnabled: false }
                  : { imageBackend: value, imageGenerationEnabled: true },
              );
            }}
          />
          {settings.imageGenerationEnabled ? (
            <>
              <Select<StorySettings["aspect"]>
                value={settings.aspect}
                onChange={(aspect) => patch({ aspect })}
                options={[
                  { value: "square", label: t("storyControl.aiLiteral.22") },
                  { value: "portrait", label: t("storyControl.aiLiteral.23") },
                  { value: "landscape", label: t("storyControl.aiLiteral.24") },
                ]}
                label={t("storyControl.aiLiteral.25")}
                size="sm"
              />
              <Select<StorySettings["imageMode"]>
                value={settings.imageMode}
                onChange={(imageMode) => patch({ imageMode })}
                options={[
                  { value: "fast", label: t("storyControl.aiLiteral.26") },
                  { value: "slow", label: t("storyControl.aiLiteral.27") },
                ]}
                label={t("storyControl.aiLiteral.28")}
                size="sm"
              />
              <button
                type="button"
                onClick={() => patch({ autoImages: !settings.autoImages })}
                className={cn(
                  "rounded-md border px-2 py-1",
                  settings.autoImages
                    ? "border-amber-700 bg-amber-950/50 text-amber-200"
                    : "border-stone-700 text-stone-400",
                )}
              >{t("storyControl.aiLiteral.29")}</button>
            </>
          ) : null}
        </div>
        {settings.imageGenerationEnabled &&
        imagesNeedModel &&
        (settings.imageBackend === "openai" || (settings.imageBackend === "comfyui" && serverImagesNeedModel)) ? (
          <p className="reveal text-amber-400/90">
            {deviceManaged && settings.imageBackend === "openai"
              ? syncT("upstreamUi.3c868309896f")
              : serverManaged
                ? syncT("upstreamUi.efb7dc26117e")
                : syncT("upstreamUi.aa80bd7cf371")}
          </p>
        ) : settings.imageGenerationEnabled && settings.imageBackend === "openai" && !imagesReady ? (
          <p className="reveal text-amber-400/90">
            {deviceManaged
              ? t("storyControl.deviceKey")
              : serverManaged
                ? t("storyControl.serverKey")
                : t("storyControl.campaignKey")}
          </p>
        ) : settings.imageGenerationEnabled && !imagesConfigured && imagesReady ? (
          <p className="reveal text-amber-400/90">{t("storyControl.aiLiteral.30")}</p>
        ) : settings.imageGenerationEnabled && !deviceManaged ? (
          <ImagesNote backend={settings.imageBackend} />
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-stone-800/60 pt-3">
          <span className={labelClass}>{t("storyControl.aiLiteral.31")}</span>
          <Select<StorySettings["proseSize"]>
            value={settings.proseSize}
            onChange={(proseSize) => patch({ proseSize })}
            options={PROSE_SIZE_VALUES.map((size) => ({ value: size, label: proseSizeLabel(size, locale) }))}
            label={t("storyControl.aiLiteral.31")}
            size="sm"
          />
          <span className="text-stone-500">{t("storyControl.aiLiteral.32")}</span>
        </div>
      </div>
    </section>
  );
}
