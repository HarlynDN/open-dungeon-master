"use client";

import { useMemo } from "react";
import OptionPicker, { type PickerGroup } from "@/app/characters/builder/OptionPicker";
import { UnofficialPackNotice } from "@/components/UnofficialPackNotice";
import { DM_MODES } from "@/lib/schemas/game-settings-options";
import type { FranchiseGroup, WorldPackSummary } from "@/lib/worlds/types";
import { FieldLabel, inputClass, ToggleCard } from "@/app/create-campaign/fields";
import type { StepProps } from "@/app/create-campaign/draft";
import { LocalePicker } from "@/components/LocalePicker";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Step 1: the name, who holds the DM seat, and an optional pre-built world.
// The pack select is hidden outright when the server has none installed.
export function PremiseStep({
  draft,
  patch,
  gates,
  packs,
  franchises,
  selectedPack,
  onChoosePack,
  onClearPack,
}: StepProps & {
  packs: WorldPackSummary[];
  franchises: FranchiseGroup[];
  selectedPack: WorldPackSummary | null;
  onChoosePack: (pack: WorldPackSummary) => void;
  onClearPack: () => void;
}) {
  const { t } = useLocale();
  const { storyKnownMissing, storyUnreachable, aiNarrates } = gates;
  // Every pack, each with its own blurb behind a ⓘ, so a world can be read
  // before it is chosen instead of after. A franchise with several eras keeps
  // them grouped under its name, exactly as the old <optgroup> did.
  const packGroups = useMemo<PickerGroup[]>(
    () => [
      {
        label: null,
        options: [
          { id: "", name: t("create.noPack"), infoText: t("create.noPackInfo") },
        ],
      },
      ...franchises.map((group) => ({
        label: group.editions.length === 1 ? null : group.franchise,
        options: group.editions.map((edition) => ({
          id: edition.id,
          name: group.editions.length === 1 ? edition.name : edition.edition || edition.name,
          infoText: edition.blurb,
        })),
      })),
    ],
    [franchises, t],
  );
  return (
    <div className="space-y-4 text-sm">
      <div>
        <FieldLabel>{t("locale.campaign")}</FieldLabel>
        <LocalePicker campaign value={draft.locale} onChange={(locale) => patch({ locale })} />
        <p className="mt-1 text-xs text-stone-500">{t("locale.campaignHint")}</p>
      </div>
      <label className="block">
        <FieldLabel>{t("create.title")}</FieldLabel>
        <input
          value={draft.title}
          onChange={(event) => patch({ title: event.target.value })}
          required
          maxLength={80}
          placeholder={t("create.titlePlaceholder")}
          className={inputClass}
        />
      </label>

      <div>
        <FieldLabel className="mb-1.5">{t("create.whoRuns")}</FieldLabel>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DM_MODES.filter(
            // A server that positively has no AI DM (provider "none")
            // offers only the human seat; "assisted" leans on the same
            // missing backend, so it goes too.
            (mode) => mode === "human" || !storyKnownMissing,
          ).map((mode) => (
            <ToggleCard
              key={mode}
              active={draft.dmMode === mode}
              onClick={() => patch({ dmMode: mode })}
              label={t(`setting.dmMode.${mode}.label`)}
              hint={t(`setting.dmMode.${mode}.hint`)}
            />
          ))}
        </div>
        {storyKnownMissing ? (
          <p className="mt-1.5 text-xs text-stone-500">
            {t("create.noAi")}
          </p>
        ) : null}
        {storyUnreachable && aiNarrates ? (
          <p className="mt-1.5 text-xs text-amber-300">
            {t("create.aiUnreachable")}
          </p>
        ) : null}
        {draft.dmMode === "steered" ? (
          <p className="mt-1.5 text-xs text-stone-500">
            {t("create.steeredSeat")}
          </p>
        ) : draft.dmMode !== "ai" ? (
          <p className="mt-1.5 text-xs text-stone-500">
            {t("create.dmSeat")}
          </p>
        ) : null}
      </div>

      {franchises.length ? (
        <div>
          <FieldLabel>{t("create.packOptional")}</FieldLabel>
          <OptionPicker
            value={draft.worldPack}
            groups={packGroups}
            placeholder={t("create.noPack")}
            className={inputClass}
            onChange={(id) => {
              const next = packs.find((pack) => pack.id === id);
              if (next) {
                onChoosePack(next);
              } else {
                onClearPack();
              }
            }}
          />
          {selectedPack ? (
            <>
              {selectedPack.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedPack.cover}
                  alt=""
                  className="mt-2 aspect-video w-full max-w-sm rounded-lg border border-stone-800 object-cover"
                />
              ) : null}
              <p className="mt-1 text-xs text-stone-500">{selectedPack.blurb}</p>
              <UnofficialPackNotice
                rightsHolder={selectedPack.rightsHolder}
                inspiredBy={selectedPack.inspiredBy}
                className="mt-1.5"
              />
            </>
          ) : (
            <p className="mt-1 text-xs text-stone-500">
              {t("create.packHint")}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
