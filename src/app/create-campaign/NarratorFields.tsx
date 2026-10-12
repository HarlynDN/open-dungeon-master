"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LOCALE_DEFINITIONS } from "@/lib/i18n/locales";
import { cn } from "@/lib/cn";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { VoicePicker } from "@/components/VoicePicker";
import { VoicePreviewButton } from "@/components/VoicePreviewButton";
import type { GameSettings } from "@/lib/schemas/game-settings";
import { COMPANION_LABELS } from "@/lib/schemas/game-settings-options";
import { FieldLabel } from "@/app/create-campaign/fields";
import type { StepProps } from "@/app/create-campaign/draft";

// The second half of "the feel": who else the AI brings to the table, and
// what its narrator sounds like. Allies only exist when the AI narrates;
// the voice picker only matters once narration is on.
export function NarratorFields({
  draft,
  patch,
  gates,
  className,
}: StepProps & { className?: string }) {
  const { aiNarrates, solo } = gates;
  const { t } = useLocale();
  return (
    <div className={cn("space-y-4", className)}>
      {aiNarrates ? (
        <div>
          <FieldLabel className="mb-1.5">{t("table.allies")}</FieldLabel>
          <Select<GameSettings["companions"]>
            value={draft.companions}
            onChange={(companions) => patch({ companions })}
            label={t("table.allies")}
            className="w-full"
            options={(Object.keys(COMPANION_LABELS) as Array<GameSettings["companions"]>).map((mode) => ({ value: mode, label: t(`setting.companions.${mode}`) }))}
          />
          <p className="mt-1 text-xs text-stone-500">
            {solo
              ? t("table.allies.soloHint")
              : t("table.allies.tableHint")}
          </p>
          {draft.companions !== "off" ? (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {draft.companions !== "guests" ? (
                <label className="block">
                  <span className="mb-1 block text-xs text-stone-500">{t("table.partyMembers")}</span>
                  <Select<string>
                    value={String(draft.maxCompanions)}
                    onChange={(count) => patch({ maxCompanions: Number(count) })}
                    label={t("table.partyMembers")}
                    className="w-full"
                    options={[1, 2, 3, 4].map((count) => ({ value: String(count), label: String(count) }))}
                  />
                </label>
              ) : null}
              <label className="block">
                <span className="mb-1 block text-xs text-stone-500">{t("table.guests")}</span>
                <Select<string>
                  value={String(draft.maxGuests)}
                  onChange={(count) => patch({ maxGuests: Number(count) })}
                  label={t("table.guests")}
                  className="w-full"
                  options={[1, 2, 3, 4].map((count) => ({ value: String(count), label: String(count) }))}
                />
              </label>
            </div>
          ) : null}
        </div>
      ) : null}

      {draft.ttsEnabled ? (
        <div className="block">
          <FieldLabel>{t("table.narratorVoice")}</FieldLabel>
          <div className="flex flex-wrap items-center gap-2">
            <VoicePicker
              speechLocale={draft.locale}
              value={draft.ttsVoice}
              onChange={(ttsVoice) => patch({ ttsVoice })}
              label={t("table.narratorVoice")}
              className="grow"
            />
            <VoicePreviewButton voice={draft.ttsVoice} speechLocale={draft.locale} />
            <span className="flex items-center gap-2 text-xs text-stone-400">
              {t("table.pace")}
              <span className="w-28">
                <Slider
                  label={t("table.narratorPace")}
                  min={0.7}
                  max={1.4}
                  step={0.05}
                  value={draft.ttsSpeed}
                  onChange={(ttsSpeed) => patch({ ttsSpeed })}
                  bubble={(speed) => speed.toFixed(2)}
                />
              </span>
              <span className="w-8 text-stone-500">{draft.ttsSpeed.toFixed(2)}</span>
            </span>
          </div>
          {/* Character voices (issue 97): who reads whose lines is chosen at
              the table, once there are characters to choose for. This is only
              whether the table has to. */}
          {LOCALE_DEFINITIONS[draft.locale].tts.singleNarrator ? <p className="mt-3 text-xs text-stone-400">{t("voicePicker.singleNarrator")}</p> : <div className="mt-3 flex items-start gap-2.5">
            <Switch
              on={draft.ttsAutoCast}
              onChange={(ttsAutoCast) => patch({ ttsAutoCast })}
              label={t("table.autoCast")}
              className="mt-0.5"
            />
            <span className="min-w-0 text-xs">
              <span className="block text-stone-200">{t("table.autoCast")}</span>
              <span className="mt-0.5 block text-stone-500">
                {draft.ttsAutoCast
                  ? t("table.autoCast.onHint")
                  : t("table.autoCast.offHint")}
              </span>
            </span>
          </div>}
        </div>
      ) : null}
    </div>
  );
}
