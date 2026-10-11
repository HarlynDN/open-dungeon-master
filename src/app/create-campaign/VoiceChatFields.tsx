"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Select } from "@/components/ui/Select";
import type { GameSettings } from "@/lib/schemas/game-settings";
import { FieldLabel, ToggleCard } from "@/app/create-campaign/fields";

type VoiceSettings = GameSettings["voice"];

// Live voice for a multiplayer table: the master switch, then the turn
// floor and the proximity rules that only mean something once it is on.
// A solo table never mounts this block; there is nobody to talk to.
export function VoiceChatFields({
  value,
  onChange,
}: {
  value: VoiceSettings;
  onChange: (next: VoiceSettings) => void;
}) {
  const { t } = useLocale();
  const setRule = (rules: Partial<VoiceSettings["rules"]>) =>
    onChange({ ...value, rules: { ...value.rules, ...rules } });
  return (
    <div>
      <FieldLabel className="mb-1.5">{t("table.voiceChat")}</FieldLabel>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <ToggleCard
          active={value.enabled}
          onClick={() => onChange({ ...value, enabled: !value.enabled })}
          label={t("table.voiceChat")}
          hint={t("table.voiceChat.hint")}
        />
        {value.enabled ? (
          <>
            <label className="block">
              <span className="mb-1 block text-xs text-stone-500">{t("table.turnFloor")}</span>
              <Select<VoiceSettings["turnEnforcement"]>
                value={value.turnEnforcement}
                onChange={(turnEnforcement) => onChange({ ...value, turnEnforcement })}
                label={t("table.turnFloor")}
                className="w-full"
                options={[
                  { value: "off", label: t("table.turn.off") },
                  { value: "soft", label: t("table.turn.soft") },
                  { value: "strict", label: t("table.turn.strict") },
                ]}
              />
            </label>
            <ToggleCard
              active={value.rules.proximity}
              onClick={() => setRule({ proximity: !value.rules.proximity })}
              label={t("table.proximity")}
              hint={t("table.proximity.hint")}
            />
            {value.rules.proximity ? (
              <>
                <label className="block">
                  <span className="mb-1 block text-xs text-stone-500">{t("table.hearingRange")}</span>
                  <Select<string>
                    value={String(value.rules.hearingRangeFeet)}
                    onChange={(feet) => setRule({ hearingRangeFeet: Number(feet) })}
                    label={t("table.hearingRange")}
                    className="w-full"
                    options={[15, 30, 60, 120].map((feet) => ({ value: String(feet), label: t("table.feet", { feet }) }))}
                  />
                </label>
                <ToggleCard
                  active={value.rules.sayRange}
                  onClick={() => setRule({ sayRange: !value.rules.sayRange })}
                  label={t("table.sayRange")}
                  hint={t("table.sayRange.hint")}
                />
                <ToggleCard
                  active={value.rules.wallsAttenuate}
                  onClick={() => setRule({ wallsAttenuate: !value.rules.wallsAttenuate })}
                  label={t("table.walls")}
                  hint={t("table.walls.hint")}
                />
              </>
            ) : null}
            <ToggleCard
              active={value.rules.downedGoDeaf}
              onClick={() => setRule({ downedGoDeaf: !value.rules.downedGoDeaf })}
              label={t("table.downed")}
              hint={t("table.downed.hint")}
            />
          </>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-stone-500">
        {t("table.voiceChat.serverHint")}
      </p>
    </div>
  );
}
