"use client";
import { rerollDescription } from "@/lib/i18n/reroll-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { InfoButton } from "@/components/ui/InfoDialog";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import {
  REROLL_LOW_DEFAULT,
  rerollBelowFor,
  rerollChoiceOf,
  type RerollChoice,
} from "@/lib/srd/ability-rerolls";
import { useServerRerollBelow } from "@/app/characters/builder/useTableRules";
import {
  CAMPAIGN_DIFFICULTIES,
  type CampaignDifficulty,
} from "@/lib/campaign-types";
import {
  CAMPAIGN_LENGTHS,
  HP_METHODS,
  STARTING_WEALTH,
  type CampaignLengthSetting,
  type HpMethodSetting,
  type StartingWealthSetting,
} from "@/lib/schemas/game-settings-options";
import { FieldLabel, ToggleCard } from "@/app/create-campaign/fields";
import type { StepProps } from "@/app/create-campaign/draft";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Step 3: how many, how strong, how hard, how long, and whose dice. A solo
// table has no player count (maxPlayers is pinned to 1 in the payload), and
// only an AI narrator plans a story arc, so length hides with it.
export function PartyStep({ draft, patch, gates }: StepProps) {
  const { t: syncT } = useSyncLocale();
  const { t, locale } = useLocale();
  const difficultyInfo = [t("create.difficultyInfo"), ...CAMPAIGN_DIFFICULTIES.map(value =>
    `**${t(`campaign.difficulty.${value}`)}**: ${t(`setting.difficulty.${value}.hint`)}`), t("create.difficultyLater")].join("\n\n");
  const { solo, aiNarrates } = gates;
  // Named in the "follow the server" choice, so it says what it means.
  const serverRerollBelow = useServerRerollBelow();
  return (
    <div className="space-y-4 text-sm">
      <div className={cn("grid gap-3", solo ? "grid-cols-2" : "grid-cols-3")}>
        {!solo ? (
          <div className="block">
            <FieldLabel>{t("create.players")}</FieldLabel>
            <NumberStepper min={1} max={8} value={draft.maxPlayers} onChange={(maxPlayers) => patch({ maxPlayers })} label={t("create.players")} />
          </div>
        ) : null}
        <div className="block">
          <FieldLabel>{t("create.startLevel")}</FieldLabel>
          <NumberStepper min={1} max={20} value={draft.startingLevel} onChange={(startingLevel) => patch({ startingLevel })} label={t("create.startLevel")} />
        </div>
        <label className="block">
          <FieldLabel>
            <span className="flex items-center gap-1">
              {t("create.difficulty")}
              <InfoButton label={t("create.difficulty")} text={difficultyInfo} />
            </span>
          </FieldLabel>
          <Select<CampaignDifficulty>
            value={draft.difficulty}
            onChange={(difficulty) => patch({ difficulty })}
            label={t("create.difficulty")}
            className="w-full"
            options={CAMPAIGN_DIFFICULTIES.map((value) => ({ value, label: t(`campaign.difficulty.${value}`) }))}
          />
          {/* The chosen tier says what it means without opening anything. */}
          <p className="mt-1 text-xs text-stone-500">
            {t(`setting.difficulty.${draft.difficulty}.hint`)}
          </p>
        </label>
      </div>

      {/* How heroes are built here. Asked at creation because the first
          characters are built before anyone opens the lobby's settings. */}
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <FieldLabel>{t("create.hitPoints")}</FieldLabel>
          <Select<HpMethodSetting>
            value={draft.hpMethod}
            onChange={(hpMethod) => patch({ hpMethod })}
            label={t("create.hitPoints")}
            className="w-full"
            options={HP_METHODS.map((value) => ({ value, label: t(`setting.hpMethod.${value}`) }))}
          />
          <p className="mt-1 text-xs text-stone-500">
            {t("create.hitPointsHint")}
          </p>
        </label>
        <label className="block">
          <FieldLabel>{t("create.wealth")}</FieldLabel>
          <Select<StartingWealthSetting>
            value={draft.startingWealth}
            onChange={(startingWealth) => patch({ startingWealth })}
            label={t("create.wealth")}
            className="w-full"
            options={STARTING_WEALTH.map((value) => ({ value, label: t(`setting.startingWealth.${value}`) }))}
          />
          <p className="mt-1 text-xs text-stone-500">
            {t("create.wealthHint")}
          </p>
        </label>
        <label className="col-span-2 block">
          <FieldLabel>{syncT("upstreamUi.98903bb2fd86")}</FieldLabel>
          <Select<"server" | RerollChoice>
            value={draft.abilityRerollBelow === null ? "server" : rerollChoiceOf(draft.abilityRerollBelow)}
            onChange={(choice) =>
              patch({
                abilityRerollBelow:
                  choice === "server" ? null : rerollBelowFor(choice, draft.abilityRerollBelow ?? REROLL_LOW_DEFAULT),
              })
            }
            label={syncT("upstreamUi.98903bb2fd86")}
            className="w-full"
            options={[
              { value: "server", label: t("upstreamUi.followReroll", { rule: serverRerollBelow === null ? "" : ` (${rerollDescription(serverRerollBelow, locale).toLowerCase()})` }) },
              { value: "keep", label: syncT("upstreamUi.b8025ffc0181") },
              { value: "low", label: t("upstreamUi.rerollLow", { value: REROLL_LOW_DEFAULT }) },
              { value: "free", label: syncT("upstreamUi.5b64526eef07") },
            ]}
          />
          <p className="mt-1 text-xs text-stone-500">
            {syncT("upstreamUi.79acb842a996")}</p>
        </label>
      </div>

      {aiNarrates ? (
        <label className="block">
          <FieldLabel>
            <span className="flex items-center gap-1">
              {t("create.length")}
              <InfoButton label={t("create.length")} text={t("create.lengthInfo")} />
            </span>
          </FieldLabel>
          <Select<CampaignLengthSetting>
            value={draft.campaignLength}
            onChange={(campaignLength) => patch({ campaignLength })}
            label={t("create.length")}
            className="w-full"
            options={CAMPAIGN_LENGTHS.map((value) => ({ value, label: t(`setting.campaignLength.${value}`) }))}
          />
          <p className="mt-1 text-xs text-stone-500">
            {t("create.lengthHint")}
          </p>
        </label>
      ) : null}

      <div>
        <FieldLabel className="mb-1.5">{t("create.dice")}</FieldLabel>
        <div className="flex gap-2">
          <ToggleCard
            active={draft.dicePolicy === "digital_only"}
            onClick={() => patch({ dicePolicy: "digital_only" })}
            label={t("create.digitalDice")}
            hint={t("create.digitalDiceHint")}
          />
          <ToggleCard
            active={draft.dicePolicy === "real_allowed"}
            onClick={() => patch({ dicePolicy: "real_allowed" })}
            label={t("create.realDice")}
            hint={t(solo ? "create.realDiceSoloHint" : "create.realDiceHint")}
          />
        </div>
      </div>
    </div>
  );
}
