"use client";

import { loadErrorText, readUiResponse, requestErrorText, uiRequestError, type UiRequestError } from "@/lib/i18n/api-errors";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { readLoad, useLoadStatus } from "@/lib/load-state";
import { EmptyState } from "@/components/EmptyState";
import { Pin, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";
import { KitButton, LoadFailed, panelField, PanelLoading } from "./PanelKit";
import { CalendarSection } from "@/app/campaigns/[campaignId]/CalendarSection";
import type { GameSettings } from "@/lib/schemas/game-settings";

type RuleChunkView = {
  id: string;
  heading: string;
  text: string;
  enabled: boolean;
  pinned: boolean;
};

import { VARIANT_TOGGLES, REST_LABELS } from "@/lib/i18n/variant-metadata";
export { VARIANT_TOGGLES, REST_LABELS } from "@/lib/i18n/variant-metadata";

// The variant-rule controls on their own, so the campaign-creation dialog can
// offer the same choices this panel does without the lead having to open the
// lobby afterwards to find them.
type RestVariant = GameSettings["variantRules"]["restVariant"];
const REST_OPTIONS = (Object.keys(REST_LABELS) as RestVariant[]).map((variant) => ({
  value: variant,
  label: REST_LABELS[variant],
  icon: { kind: "glyph" as const, key: variant === "standard" ? "rest-short" : "rest-long" },
}));

// One variant rule: the kit switch, its name, and the word that says which
// way it is set (a player reads "on" or "off", not the knob's position).
function VariantSwitch({ label, tip, on, onChange }: { label: string; tip: string; on: boolean; onChange: (next: boolean) => void }) {
  const { t } = useLocale();
  return (
    <Tooltip content={tip}>
      <span className="flex min-h-9 items-center gap-2 text-xs text-stone-300">
        <Switch on={on} onChange={onChange} label={label} />
        <span className="min-w-0 flex-1">{label}</span>
        <span className={on ? "text-amber-200" : "text-stone-500"}>{t(on ? "common.on" : "common.off")}</span>
      </span>
    </Tooltip>
  );
}

export function VariantRulesFields({
  value,
  onChange,
}: {
  value: GameSettings["variantRules"];
  onChange: (next: GameSettings["variantRules"]) => void;
}) {
  const { t } = useLocale();
  return (
    <div>
      <SectionHead title={t("variant.heading")} glyph="system-rules" level="h4" />
      <div className="stagger-pop grid gap-x-4 gap-y-0.5 sm:grid-cols-2">
        {VARIANT_TOGGLES.map((toggle) => (
          <VariantSwitch key={toggle.key} label={t(`variant.${toggle.key}.label`)} tip={t(`variant.${toggle.key}.tip`)} on={Boolean(value[toggle.key])} onChange={(next) => onChange({ ...value, [toggle.key]: next })} />
        ))}
      </div>
      <Select<RestVariant>
        value={value.restVariant}
        onChange={(restVariant) => onChange({ ...value, restVariant })}
        options={REST_OPTIONS.map(option => ({ ...option, label: t(`variant.rest.${option.value}`) }))}
        label={t("variant.restHeading")}
        className="mt-2 w-full"
      />
    </div>
  );
}

// Rules manager: 5e variant toggles plus lead-authored house rules. The
// house-rules text is chunked server-side; each chunk can be silenced or
// pinned into every DM prompt, and the rest are retrieved per turn by
// relevance.
export function RulesPanel({
  campaignId,
  settings,
  steersStory,
  isDm,
}: {
  campaignId: string;
  settings: GameSettings;
  steersStory: boolean;
  // Holds the DM seat. The calendar's routes are DM-only, so the AI
  // campaign's lead steers the story but does not get the almanac.
  isDm: boolean;
}) {
  const { locale, t } = useLocale();
  const [loading, setLoading] = useState(true);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();
  const [reloads, setReloads] = useState(0);
  const [text, setText] = useState("");
  const [savedText, setSavedText] = useState("");
  const [chunks, setChunks] = useState<RuleChunkView[]>([]);
  const [saving, setSaving] = useState(false);
  const [settingsBusy, setSettingsBusy] = useState(false);
  // A refused change says why, instead of the switch quietly snapping back.
  const [settingsError, setSettingsError] = useState<UiRequestError | null>(null);
  const [ruleError, setRuleError] = useState<UiRequestError | null>(null);

  useEffect(() => {
    let cancelled = false;
    readLoad<{ text?: unknown; chunks?: unknown }>(fetch(`/api/campaigns/${campaignId}/rules`), "The house rules").then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      const data = outcome.payload;
      if (data) {
        setText(String(data.text ?? ""));
        setSavedText(String(data.text ?? ""));
        setChunks(Array.isArray(data.chunks) ? (data.chunks as RuleChunkView[]) : []);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, reloads, settle]);

  async function saveText() {
    setSaving(true); setRuleError(null);
    try {
      const data = await readUiResponse<{ text?: string; chunks?: RuleChunkView[] }>(fetch(`/api/campaigns/${campaignId}/rules`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }), "rules.saveError");
      setSavedText(String(data.text ?? text));
      setChunks(Array.isArray(data.chunks) ? data.chunks : []);
    } catch (failure) { setRuleError(uiRequestError(failure, "rules.saveError")); }
    finally { setSaving(false); }
  }
  async function patchChunk(chunkId: string, flags: { enabled?: boolean; pinned?: boolean }) {
    setRuleError(null);
    try {
      const data = await readUiResponse<{ chunk?: Partial<RuleChunkView> }>(fetch(`/api/campaigns/${campaignId}/rules`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chunkId, ...flags }) }), "rules.chunkError");
      setChunks(current => current.map(chunk => chunk.id === chunkId ? { ...chunk, ...data.chunk } : chunk));
    } catch (failure) { setRuleError(uiRequestError(failure, "rules.chunkError")); }
  }
  async function patchVariant(update: Partial<GameSettings["variantRules"]>) {
    setSettingsBusy(true); setSettingsError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/settings`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ variantRules: { ...settings.variantRules, ...update } }) }), "rules.variantError");
    } catch (failure) { setSettingsError(uiRequestError(failure, "rules.variantError")); }
    finally { setSettingsBusy(false); }
  }

  const variant = settings.variantRules;

  return (
    <div className="space-y-3">
      <div className="panel rounded-lg p-3" data-tour="rules-variants">
        <SectionHead title={t("variant.heading")} glyph="system-rules" />
        {steersStory ? (
          <div className={cn("reveal space-y-0.5", settingsBusy && "opacity-70")}>
            {VARIANT_TOGGLES.map((toggle) => (
              <VariantSwitch key={toggle.key} label={t(`variant.${toggle.key}.label`)} tip={t(`variant.${toggle.key}.tip`)} on={Boolean(variant[toggle.key])} onChange={(next) => patchVariant({ [toggle.key]: next })} />
            ))}
            <Tooltip content={t("variant.restHint")}>
              <span className="block pt-1.5">
                <Select<RestVariant>
                  size="sm"
                  value={variant.restVariant}
                  onChange={(restVariant) => patchVariant({ restVariant })}
                  options={REST_OPTIONS.map(option => ({ ...option, label: t(`variant.rest.${option.value}`) }))}
                  label={t("variant.restHeading")}
                  className="w-full"
                />
              </span>
            </Tooltip>
            {settingsError ? (
              <p role="alert" className="motion-shake pt-1 text-[11px] text-red-300">
                {requestErrorText(locale, settingsError)}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-xs leading-5 text-stone-400">
            {[
              ...VARIANT_TOGGLES.filter((toggle) => variant[toggle.key]).map(
                (toggle) => t(`variant.${toggle.key}.label`),
              ),
              ...(variant.restVariant !== "standard" ? [t(`variant.rest.${variant.restVariant}`)] : []),
            ].join(" · ") || t("variant.none")}
          </p>
        )}
      </div>

      <div className="panel rounded-lg p-3" data-tour="rules-house">
        <SectionHead title={t("rules.house")} glyph="system-homebrew" />
        {loadError ? <LoadFailed error={loadErrorText(locale, loadError, "rules.loadError")} onRetry={() => { setLoading(true); setReloads(current => current + 1); }} /> : null}
        {ruleError ? <p role="alert" className="text-xs text-red-300">{requestErrorText(locale, ruleError)}</p> : null}
        {loading ? (
          <PanelLoading label={t("prep.loading")} rows={2} />
        ) : steersStory && loaded ? (
          <>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={8}
              maxLength={20_000}
              placeholder={t("rules.placeholder")}
              aria-label={t("rules.house")}
              className={cn(panelField, "leading-5")}
            />
            <div className="mt-1.5 flex items-center gap-2">
              <KitButton tone="primary" onClick={saveText} disabled={saving || text === savedText} busy={saving}>
                {saving ? null : <Save className="size-3.5" />}
                 {t("rules.save")} </KitButton>
              {text !== savedText ? (
                <span className="live-in text-xs text-amber-300/80">{t("prep.unsaved")}</span>
              ) : null}
            </div>
          </>
        ) : savedText ? (
          <p className="reveal whitespace-pre-wrap text-xs leading-5 text-stone-400">{savedText}</p>
        ) : (
          (loaded && !loadError ? <EmptyState size="sm" art="board" title={t("rules.empty")} /> : null)
        )}
      </div>

      {steersStory && chunks.length ? (
        <div className="panel reveal rounded-lg p-3">
          <SectionHead title={t("rules.sections")} glyph="system-rulesets" aside={chunks.length} />
          <p className="mb-2 text-xs leading-5 text-stone-500">
             {t("rules.sectionsHint")} </p>
          <ul className="stagger space-y-1.5">
            {chunks.map((chunk) => (
              <li
                key={chunk.id}
                className={cn("flex items-start gap-2 rounded-md border border-stone-700/50 bg-stone-950/40 p-2", !chunk.enabled && "opacity-60")}
              >
                <span className="mt-0.5 shrink-0" title={t(chunk.enabled ? "rules.sectionOff" : "rules.sectionOn")}>
                  <Switch on={chunk.enabled} onChange={(enabled) => patchChunk(chunk.id, { enabled })} label={t(chunk.enabled ? "rules.sectionOff" : "rules.sectionOn")} />
                </span>
                <KitButton
                  tone="icon"
                  always
                  onClick={() => patchChunk(chunk.id, { pinned: !chunk.pinned })}
                  aria-pressed={chunk.pinned}
                  aria-label={t(chunk.pinned ? "prep.unpinHint" : "prep.pinHint")}
                  title={t(chunk.pinned ? "prep.unpinHint" : "prep.pinHint")}
                  className={cn("shrink-0", chunk.pinned && "text-amber-300")}
                >
                  <Pin className={cn("size-3.5", chunk.pinned && "fill-current")} />
                </KitButton>
                <span className="min-w-0 text-xs leading-5 text-stone-400">
                  {chunk.heading ? (
                    <span className="font-medium text-stone-300">{chunk.heading}: </span>
                  ) : null}
                  {chunk.text.length > 160 ? `${chunk.text.slice(0, 160)}...` : chunk.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {isDm ? <CalendarSection campaignId={campaignId} campaignLocale={settings.locale} /> : null}
    </div>
  );
}
