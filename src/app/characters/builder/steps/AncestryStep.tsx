"use client";

import { repeatedGrants } from "@/lib/srd/racial-grants";
import { useMemo, useState } from "react";
import { InfoButton } from "@/components/ui/InfoDialog";
import { Select } from "@/components/ui/Select";
import { STANDARD_LANGUAGES } from "@/lib/content/mechanics";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { builderOptionName, builderOptionSearchNames } from "@/lib/i18n/builder-picker-presentations";
import { lineageChipViews, lineageDescription, lineageHelpText, lineageLanguageHelp, lineageTaglineView } from "@/lib/i18n/lineage-presentations";
import { trainingLabel } from "@/lib/i18n/training-presentations";
import type { Reskinned } from "@/lib/worlds/reskin-logic";
import { LineageCarousel, type LineageSlide } from "../LineageCarousel";
import { srdRaceFor, flattenGroups, lineageArt } from "../lineage";
import { OptionCardGrid, type OptionCardGroup } from "../OptionCardGrid";
import type { PickerGroup } from "../OptionPicker";
import { knownTraining } from "../FeatChoicesFields";
import { RacialChoicesSection } from "../RacialChoicesSection";
import type { BackgroundOption, RaceOption } from "../useBuilderOptions";
import type { BuilderDerived } from "../useBuilderDerived";
import type { BuilderState } from "../useBuilderState";
import { bonusLanguageCount } from "../submit";
import { StepPanel, inputClass } from "./shared";

// Step 2: where they are from. The lineage grid (every race the picker
// offered, in the picker's groups and order, the setting's peoples first and
// badged), the detail carousel behind each card's "?", then every choice the
// race leaves to the player: bonus languages, ability bumps, skills, tool,
// cantrip.
export function AncestryStep({
  state,
  derived,
  race,
  background,
  races,
  raceGroups,
}: {
  state: BuilderState;
  derived: BuilderDerived;
  race: RaceOption | undefined;
  background: BackgroundOption | undefined;
  races: Array<Reskinned<RaceOption>>;
  raceGroups: PickerGroup[];
}) {
  const { locale, t } = useLocale();
  const raceName = race ? builderOptionName("race", race, locale) : "";
  // The race's bonus languages plus the background's (an acolyte or a sage
  // learns two more), which used to be loaded and never asked for.
  const languageCount = bonusLanguageCount(race, background);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const { gender } = state;

  // One slide per picker row, in the picker's order, so the carousel walks
  // exactly what the grid shows.
  const slides = useMemo<LineageSlide[]>(
    () =>
      flattenGroups(raceGroups).flatMap(({ option, group, recommended }) => {
        const entry = races.find((candidate) => candidate.id === option.id);
        if (!entry) {
          return [];
        }
        return [
          {
            ...entry,
            displayName: option.name,
            art: lineageArt(entry.id, `${srdRaceFor(entry.id)?.name ?? option.meta ?? ""} ${entry.name}`, gender),
            canonical: option.meta,
            // Named on the card only where the group heading is not the book.
            sourceOnCard: option.source,
            group,
            recommended,
            info: { text: option.infoText, reference: option.reference },
          },
        ];
      }),
    [raceGroups, races, gender],
  );

  const cardGroups = useMemo<OptionCardGroup[]>(
    () =>
      raceGroups.map((group) => ({
        label: group.label,
        recommended: group.recommended,
        options: group.options.flatMap((option) => {
          const slide = slides.find((candidate) => candidate.id === option.id);
          if (!slide) {
            return [];
          }
          return [
            {
              id: slide.id,
              name: slide.displayName ?? slide.name,
              searchTerms: [...builderOptionSearchNames("race", slide), slide.id, srdRaceFor(slide.id)?.name ?? "", option.reference?.name ?? ""],
              meta: slide.canonical,
              art: slide.art,
              // Under a reskin the canonical name leads, so a player always
              // knows which SRD race they are actually taking; then the
              // book, where the heading does not say it (issue #116).
              tagline: [slide.canonical, slide.sourceOnCard, lineageTaglineView(slide, locale)].filter(Boolean).join(" · "),
              chips: lineageChipViews(slide, locale)
                .slice(0, 2)
                .map((chip) => chip.label),
            },
          ];
        }),
      })),
    [raceGroups, slides, locale],
  );

  return (
    <div className="space-y-4">
      <StepPanel
        title={t("lineageUi.where")}
        ornate
        anchor="race"
        help={
          race
            ? t("lineageUi.chosenHelp", { race: raceName })
            : t("lineageUi.chooseHelp")
        }
      >
        {race?.note ? (
          <span className="mb-3 flex items-start gap-1 text-xs text-stone-500">
            <span className="line-clamp-2 grow">
              <span className="text-amber-200">{raceName}</span>
              {race.source ? <span className="font-mono text-[10px] text-stone-500"> · {race.source}</span> : null}
              <span className="text-amber-200">: </span>
              {locale === "en" || !srdRaceFor(race.id) ? race.note : lineageDescription(race, locale)}
            </span>
            <InfoButton
              label={raceName}
              text={lineageHelpText(race.id, locale) ?? race.note}
              reference={{ kind: "races", slug: race.slug ?? race.id }}
            />
          </span>
        ) : null}
        <OptionCardGrid
          groups={cardGroups}
          value={race?.id ?? ""}
          onChoose={state.changeRace}
          onDetails={(id) => setDetailIndex(slides.findIndex((slide) => slide.id === id))}
          noun="lineage"
        />
        <LineageCarousel
          slides={slides}
          index={detailIndex !== null && detailIndex >= 0 ? detailIndex : null}
          onIndexChange={setDetailIndex}
          chosenId={race?.id ?? ""}
          onChoose={state.changeRace}
        />
      </StepPanel>

      {race && languageCount > 0 ? (
        <StepPanel
          title={
            <span className="flex items-center gap-1">
              {t(languageCount === 1 ? "lineageUi.bonusOne" : "lineageUi.bonusMany")}
              <InfoButton
                label={t("lineageUi.languages")}
                text={t("lineageUi.languageInfo")}
              />
            </span>
          }
          help={lineageLanguageHelp(race, background, locale)}
          anchor="languages"
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: languageCount }, (_, index) => (
              <Select<string>
                key={index}
                value={state.bonusLanguages[index] ?? ""}
                onChange={(picked) =>
                  state.setBonusLanguages((current) => {
                    const next = [...current];
                    next[index] = picked;
                    return next;
                  })
                }
                className="w-full"
                label={t("lineageUi.bonusLabel", { index: index + 1 })}
                placeholder={t("lineageUi.chooseLanguage")}
                options={[
                  { value: "", label: t("lineageUi.chooseLanguage") },
                  // A race that offers "your choice of Common or Undercommon"
                  // fills its first slots from that list only.
                  ...(race.languageChoice && index < race.languageChoice.count
                    ? race.languageChoice.from
                    : STANDARD_LANGUAGES
                  ).filter(
                    (language) =>
                      !race.languages.includes(language) &&
                      !(background?.knownLanguages ?? []).includes(language) &&
                      (state.bonusLanguages[index] === language || !state.bonusLanguages.includes(language)),
                  ).map((language) => ({ value: language as string, label: trainingLabel("language", language as string, locale) })),
                ]}
              />
            ))}
          </div>
        </StepPanel>
      ) : null}

      {race ? (
        <RacialChoicesSection
          race={race}
          grantedSkills={[
            ...state.chosenSkills,
            ...(background?.skills ?? []),
            ...state.backgroundSkills,
            ...(race.skills ?? []),
          ]}
          asi={state.racialAsi}
          onAsiChange={(index, ability) =>
            state.setRacialAsi((current) => {
              const next = [...current];
              next[index] = ability;
              return next;
            })
          }
          skills={state.racialSkills}
          onSkillsChange={(index, skill) =>
            state.setRacialSkills((current) => {
              const next = [...current];
              next[index] = skill;
              return next;
            })
          }
          cantrip={state.racialCantrip}
          onCantripChange={state.setRacialCantrip}
          tool={state.racialTool}
          onToolChange={state.setRacialTool}
          ancestry={state.racialAncestry}
          onAncestryChange={state.setRacialAncestry}
          repeated={repeatedGrants(background?.skills, race.skills)}
          repeatSkills={state.repeatSkills}
          onRepeatChange={(index, skill) =>
            state.setRepeatSkills((current) => {
              const next = [...current];
              next[index] = skill;
              return next;
            })
          }
          feats={state.feats}
          onFeatsChange={state.setFeats}
          featAbility={state.racialFeatAbility}
          onFeatAbilityChange={state.setRacialFeatAbility}
          featSpecOf={derived.featSpecOf}
          featDescOf={derived.featDescOf}
          featChoices={state.featChoices}
          onFeatPicks={state.setFeatPicks}
          known={knownTraining(derived)}
          inputClass={inputClass}
        />
      ) : null}
    </div>
  );
}
