"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { skillLabel } from "@/lib/i18n/character-presentations";
import { builderOptionName } from "@/lib/i18n/builder-picker-presentations";
import { builderToolChoicesText } from "@/lib/i18n/builder-presentations";
import { backgroundField } from "@/lib/i18n/background-material-presentations";
import { UnofficialPackNotice } from "@/components/UnofficialPackNotice";
import { GameTerm } from "@/components/ui/GameTerm";
import { InfoButton } from "@/components/ui/InfoDialog";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import { skillHelpText } from "@/lib/i18n/game-help-presentations";
import type { WorldPack } from "@/lib/worlds/types";
import OptionPicker, { type PickerGroup } from "../OptionPicker";
import { backgroundInfoText } from "../usePickerGroups";
import type { BackgroundOption } from "../useBuilderOptions";
import type { BuilderState } from "../useBuilderState";
import { splitToolGrants } from "@/lib/srd/tool-choices";
import { Field, StepPanel, inputClass } from "./shared";
import { GENDERS, type Gender } from "@/lib/gender";

const CONTENT_IMPORT_COMMAND = "node scripts/import-open5e.mjs";

export type BuilderRole = "pc" | "companion";

// Step 1: the name, who plays them, level, background and alignment. The
// setting notices live here too, so the first thing a player sees under a
// world pack is whose names they are about to choose from.
export function IdentityStep({
  state,
  pack,
  packInstalled,
  fixedLevel,
  role,
  alignmentGroups,
  alignmentInfo,
  backgroundGroups,
  background,
}: {
  state: BuilderState;
  pack: WorldPack | null;
  packInstalled: boolean;
  fixedLevel?: number;
  // Offered by the library page only: a campaign already knows which door
  // the character comes through.
  role?: { value: BuilderRole; onChange: (role: BuilderRole) => void };
  alignmentGroups: PickerGroup[];
  alignmentInfo: string;
  backgroundGroups: PickerGroup[];
  background: BackgroundOption | undefined;
}) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  return (
    <div className="space-y-4">
      {!packInstalled ? (
        <p className="rounded-lg border border-stone-700/60 bg-stone-900/60 p-3 text-xs text-stone-400">
          {t("builderIdentity.packNotice", { command: CONTENT_IMPORT_COMMAND })}
        </p>
      ) : null}
      {pack ? (
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
          <p className="text-xs text-amber-100">
            <span className="font-medium">{pack.name}</span> · {pack.blurb}
          </p>
          <p className="mt-1 text-[11px] text-stone-400">
            {t("builderIdentity.reskin")}
          </p>
          <UnofficialPackNotice
            rightsHolder={pack.rightsHolder}
            inspiredBy={pack.inspiredBy}
            variant="inline"
            className="mt-1"
          />
        </div>
      ) : null}

      <StepPanel title={t("builderIdentity.heroName")} ornate anchor="name">
        <input
          value={state.name}
          onChange={(event) => state.setName(event.target.value)}
          required
          maxLength={60}
          placeholder={pack?.nameHints || t("builderIdentity.nameExample")}
          className={inputClass}
          aria-label={t("builderIdentity.name")}
        />
        {pack?.nameSeeds.people.length ? (
          <span className="mt-2 flex flex-wrap gap-1">
            {pack.nameSeeds.people.slice(0, 8).map((seed) => (
              <button
                key={seed}
                type="button"
                onClick={() => state.setName(seed)}
                className="rounded-md border border-stone-700/70 px-1.5 py-0.5 text-[11px] text-stone-400 transition-colors hover:border-amber-500/40 hover:text-amber-100"
              >
                {seed}
              </button>
            ))}
          </span>
        ) : null}
        {role ? (
          <div className="mt-4">
            <span className="mb-1.5 block text-xs text-stone-400">{t("builderIdentity.place")}</span>
            <SegmentedControl
              label={t("builderIdentity.role")}
              value={role.value}
              onChange={role.onChange}
              options={[
                { value: "pc", label: t("builderIdentity.pc") },
                { value: "companion", label: t("builderIdentity.companion") },
              ]}
              className="w-full"
            />
            <p className="mt-1.5 text-xs text-stone-500">
              {role.value === "companion"
                ? t("builderIdentity.companionHelp")
                : t("builderIdentity.pcHelp")}
            </p>
          </div>
        ) : null}
      </StepPanel>

      <StepPanel title={t("builderIdentity.details")}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={t("builderIdentity.gender")}>
            <Select<Gender>
              value={state.gender}
              onChange={state.setGender}
              label={t("builderIdentity.gender")}
              className="w-full"
              options={[{ value: "", label: t("builderIdentity.unspecified") }, ...GENDERS.map((value) => ({ value, label: t(`builderIdentity.gender.${value}`) }))]}
            />
          </Field>
          <Field label={t("builderIdentity.level")}>
            {fixedLevel ? (
              <span className="block rounded-lg border border-stone-700/70 bg-stone-950/60 px-3 py-2 text-sm text-stone-400">
                {t("builderIdentity.campaignLevel", { level: fixedLevel })}
              </span>
            ) : state.levelLocked ? (
              <>
                <span className="block rounded-lg border border-stone-700/70 bg-stone-950/60 px-3 py-2 text-sm text-stone-400">
                  {state.level} {syncT("upstreamUi.3a8ca059fe92")}</span>
                <span className="mt-1 block text-xs text-stone-500">
                  {syncT("upstreamUi.c35778982268")}</span>
              </>
            ) : (
              <>
                <Select<string>
                  value={String(state.level)}
                  onChange={(next) => state.changeLevel(Number(next))}
                  label={t("builderIdentity.level")}
                  className="w-full"
                  options={Array.from({ length: 21 - state.levelFloor }, (_, index) => ({
                    value: String(index + state.levelFloor),
                    label: String(index + state.levelFloor),
                  }))}
                />
                {state.levelFloor > 1 ? (
                  <span className="mt-1 block text-xs text-stone-500">
                    {t("builderIdentity.levelFloor", { level: state.levelFloor })}
                  </span>
                ) : null}
              </>
            )}
          </Field>
          <Field label={t("builderIdentity.background")}>
            <OptionPicker
              value={background?.id ?? ""}
              groups={backgroundGroups}
              className={inputClass}
              onChange={state.changeBackground}
            />
            {background ? (
              <span className="mt-1 flex items-start gap-1 text-xs text-stone-500">
                <span className="grow">
                  {background.skills.length ? t("builderIdentity.grants") : null}
                  {background.skills.length
                    ? background.skills.map((skillId, index) => {
                        const name = skillLabel(skillId, locale);
                        return (
                          <span key={skillId} className="whitespace-nowrap">
                            {index ? ", " : null}
                            {name}
                            {/* Each granted skill says what it is, so
                                "Grants Deception, Sleight of Hand" is a
                                sentence a new player can read. */}
                            <InfoButton label={name} text={skillHelpText(skillId, locale)} />
                          </span>
                        );
                      })
                    : t("builderIdentity.beforeAdventure")}
                  {background.feature ? (
                    <span className="whitespace-nowrap">
                      {background.skills.length ? " · " : " "}
                      {t("builderIdentity.feature", { feature: backgroundField(background, "feature", locale)! })}
                      <InfoButton
                        label={backgroundField(background, "feature", locale)!}
                        text={backgroundField(background, "featureDesc", locale) || undefined}
                        reference={
                          background.featureDesc ? undefined : { kind: "backgrounds", slug: background.id }
                        }
                      />
                    </span>
                  ) : null}
                </span>
                <InfoButton
                  label={builderOptionName("background", background, locale)}
                  text={backgroundInfoText(background, locale)}
                  reference={{ kind: "backgrounds", slug: background.id }}
                />
              </span>
            ) : null}
            {background?.languages ? (
              // What the background asks for on a later step, said here so
              // the hold on step 2 is no surprise (issue #117).
              <span className="mt-1 block text-xs text-stone-500">
                {t(background.languages === 1 ? "builderIdentity.backgroundLanguagesOne" : "builderIdentity.backgroundLanguages", { count: background.languages })}
              </span>
            ) : null}
            {background?.tools?.length && splitToolGrants(background.tools).choices.length ? (
              // A background's open tool grant ("one type of artisan's
              // tools") is picked on the class step, under the class's own;
              // said here like the languages (issue #117 follow-up).
              <span className="mt-1 block text-xs text-stone-500">
                {t("builderIdentity.backgroundTools", { choices: builderToolChoicesText(splitToolGrants(background.tools).choices, locale) })}
              </span>
            ) : null}
            {background?.skillChoice ? (
              <BackgroundSkillChoice state={state} background={background} choice={background.skillChoice} />
            ) : null}
          </Field>
          <Field
            label={
              <span className="flex items-center gap-1">
                {t("builderIdentity.alignment")}
                <InfoButton label={t("builderIdentity.alignment")} text={alignmentInfo} />
              </span>
            }
          >
            <OptionPicker
              value={state.alignment}
              groups={alignmentGroups}
              className={inputClass}
              onChange={state.setAlignment}
            />
          </Field>
        </div>
      </StepPanel>
    </div>
  );
}

// The skills a content-pack background leaves to the player ("Persuasion,
// and either Insight or History"), one select per pick, the way the race's
// skill choices are asked on the ancestry step.
function BackgroundSkillChoice({
  state,
  background,
  choice,
}: {
  state: BuilderState;
  background: BackgroundOption;
  choice: NonNullable<BackgroundOption["skillChoice"]>;
}) {
  const { locale, t } = useLocale();
  const picks = state.backgroundSkills;
  const taken = new Set([...background.skills, ...state.chosenSkills, ...state.racialSkills]);
  return (
    <div className="mt-2" data-builder-target="backgroundSkills">
      <span className="mb-1 flex flex-wrap items-center gap-1 text-xs text-stone-400">
        <GameTerm id="skill">{t("builderIdentity.skill")}</GameTerm> {t(choice.count === 1 ? "builderIdentity.proficiency" : "builderIdentity.proficiencies")} (
        {t("builderIdentity.choiceCount", { count: choice.count })})
      </span>
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: choice.count }, (_, index) => (
          <span key={index} className="flex items-center gap-1">
            <Select<string>
              value={picks[index] ?? ""}
              onChange={(next) =>
                state.setBackgroundSkills((current) => {
                  const updated = [...current];
                  updated[index] = next;
                  return updated;
                })
              }
              className="min-w-0 grow"
              label={t("builderIdentity.backgroundSkill", { index: index + 1 })}
              placeholder={t("builderIdentity.chooseSkill")}
              options={[
                { value: "", label: t("builderIdentity.chooseSkill") },
                ...choice.from
                  .filter((skill) => picks[index] === skill || (!picks.includes(skill) && !taken.has(skill)))
                  .map((skill) => ({ value: skill, label: skillLabel(skill, locale) })),
              ]}
            />
            {picks[index] ? (
              <InfoButton label={skillLabel(picks[index], locale)} text={skillHelpText(picks[index], locale)} />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
