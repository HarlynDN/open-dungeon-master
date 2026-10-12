"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { skillHelpText } from "@/lib/i18n/game-help-presentations";

import { abilityLabel, characterLabel, skillLabel, subclassLabel } from "@/lib/i18n/character-presentations";
import { builderOptionName, builderOptionSearchNames } from "@/lib/i18n/builder-picker-presentations";
import { builderTermLabel } from "@/lib/i18n/builder-name-presentations";
import { callingCardFacts, grantingTraitLabel } from "@/lib/i18n/calling-presentations";
import { subclassHelpText } from "@/lib/i18n/calling-material-presentations";
import { nativeFeatureName, nativeFeatureHelp } from "@/lib/i18n/feature-material-presentations";
import { LocalizedText } from "@/lib/i18n/LocalizedText";
import { useMemo, useState } from "react";
import { GameTerm } from "@/components/ui/GameTerm";
import { InfoButton, InfoDialog } from "@/components/ui/InfoDialog";
import { describeFeature } from "@/lib/help";
import { firstSentence } from "@/lib/help/rules-text";
import { SRD_SKILLS } from "@/lib/srd";
import type { Reskinned } from "@/lib/worlds/reskin-logic";
import type { WorldPack } from "@/lib/worlds/types";
import { classArt } from "../lineage";
import { OptionCardGrid, type OptionCardGroup } from "../OptionCardGrid";
import OptionPicker, { type PickerGroup } from "../OptionPicker";
import { classInfoText } from "../usePickerGroups";
import { grantedSkillSources, grantingTrait } from "../reconcile";
import type { ArchetypeOption, BackgroundOption, ClassOption, RaceOption } from "../useBuilderOptions";
import type { BuilderActions, BuilderDerived } from "../useBuilderDerived";
import type { BuilderState } from "../useBuilderState";
import { ClassChoices } from "./ClassChoices";
import { Field, PickPill, StepPanel, inputClass } from "./shared";

// Step 3: the class (painted cards in the picker's groups and order, the
// setting's callings first and badged, each with its emblem and a ? that
// opens its write-up), its subclass once the level allows one, what the pair
// grants at this level, and the class skill picks. Expertise, fighting
// styles and option lists (invocations and the like) follow in ClassChoices.
export function CallingStep({
  state,
  derived,
  actions,
  klass,
  race,
  background,
  pack,
  classes,
  classGroups,
  subclassGroups,
  offersSubclass,
  subclassLockedAt,
  chosenArchetype,
}: {
  state: BuilderState;
  derived: BuilderDerived;
  actions: BuilderActions;
  klass: ClassOption | undefined;
  race: RaceOption | undefined;
  background: BackgroundOption | undefined;
  pack: WorldPack | null;
  classes: Array<Reskinned<ClassOption>>;
  classGroups: PickerGroup[];
  subclassGroups: PickerGroup[];
  offersSubclass: boolean;
  // The level the class picks a subclass at, while this level is below it.
  subclassLockedAt: number | null;
  chosenArchetype: ArchetypeOption | null;
}) {
  const { locale, t } = useLocale();
  const { subclass } = state;
  const { effectiveLevel, grantedFeatures } = derived;
  const { gender } = state;
  const [detailsFor, setDetailsFor] = useState<string | null>(null);
  // The skills already the character's from race or background, and the
  // source each came from: the same map the toggle refuses by, so every
  // greyed pill says why (issue #109).
  const skillSources = useMemo(
    () =>
      grantedSkillSources({
        race,
        background,
        racialSkills: state.racialSkills,
        backgroundSkills: state.backgroundSkills,
      }),
    [race, background, state.racialSkills, state.backgroundSkills],
  );

  const cardGroups = useMemo<OptionCardGroup[]>(
    () =>
      classGroups.map((group) => ({
        label: group.label,
        recommended: group.recommended,
        options: group.options.map((option) => {
          const entry = classes.find((candidate) => candidate.id === option.id);
          // Under a reskin the canonical class name leads the tagline, the
          // same fact the dropdown kept in its meta column.
          const facts = callingCardFacts(entry, option, locale);
          return {
            id: option.id,
            name: option.name,
            searchTerms: [...(entry ? builderOptionSearchNames("class", entry) : []), option.id, option.reference?.name ?? "", characterLabel("class", option.id, "en")],
            meta: facts.canonical,
            art: classArt(option.id, gender),
            // The book leads where the group heading does not say it
            // (issue #116: a Marshal looked like a Core Rules class).
            tagline: facts.tagline,
            chips: facts.chips,
            icon: { kind: "family" as const, key: `class-${option.id}` },
          };
        }),
      })),
    [classGroups, classes, gender, locale],
  );
  const details = detailsFor
    ? classGroups.flatMap((group) => group.options).find((option) => option.id === detailsFor)
    : undefined;

  return (
    <div className="space-y-4">
      <StepPanel title={t("callingUi.chooseClass")} ornate anchor="class">
        <Field label={t("callingUi.class")}>
          {klass ? (
            <span className="mb-3 flex flex-wrap items-center gap-x-1 text-xs text-stone-500">
              <span className="text-amber-200">{builderOptionName("class", klass, locale)}:</span>{" "}
              <GameTerm id="hit_dice">{t("callingUi.hitDie", { die: klass.hitDie })}</GameTerm> ·{" "}
              <GameTerm id="saving_throw">{t("callingUi.saves")}</GameTerm>{" "}
              {klass.saves.map((save) => abilityLabel(save, locale, true)).join(", ")}
              {klass.spellAbility ? (
                <>
                  {" · "}
                  <GameTerm id={klass.spellAbility}>{abilityLabel(klass.spellAbility, locale, true)}</GameTerm>{" "}
                  {t("callingUi.casterWord")}
                  {klass.castingLabel ? t("callingUi.castingFlavor", { kind: builderTermLabel("castingKind", klass.castingLabel, locale) }) : ""}
                </>
              ) : null}
              <InfoButton
                label={builderOptionName("class", klass, locale)}
                text={classInfoText(klass, locale)}
                reference={{ kind: "classes", slug: klass.id }}
              />
            </span>
          ) : null}
          <OptionCardGrid
            groups={cardGroups}
            value={klass?.id ?? ""}
            onChoose={state.changeClass}
            onDetails={setDetailsFor}
            noun="class"
            compact
          />
          {/* The same write-up the dropdown's info button opened: the pack's
              blurb, the catalog blurb or the content pack's entry. */}
          <InfoDialog
            open={Boolean(details)}
            onOpenChange={(open) => (open ? undefined : setDetailsFor(null))}
            title={details?.name ?? ""}
            meta={details?.meta}
            text={details?.infoText}
            reference={details?.reference}
          />
        </Field>
        {offersSubclass ? (
          <Field label={t("callingUi.subclass")} className="mt-3" anchor="subclass">
            <OptionPicker
              value={subclass}
              groups={subclassGroups}
              placeholder={t("callingUi.none")}
              className={inputClass}
              onChange={state.changeSubclass}
            />
            <span className="mt-1 flex items-start gap-1 text-xs text-stone-500">
              {subclass ? (
                <>
                  <span className="grow">
                    {firstSentence(subclassHelpText(klass?.id ?? "", subclass, locale, chosenArchetype?.desc, chosenArchetype ?? undefined)) ??
                      t("callingUi.subclassGeneric")}
                  </span>
                  <InfoButton
                    label={subclassLabel(klass?.id ?? "", subclass, locale)}
                    text={subclassHelpText(klass?.id ?? "", subclass, locale, chosenArchetype?.desc, chosenArchetype ?? undefined) || undefined}
                    reference={
                      chosenArchetype ? { kind: "archetypes", slug: chosenArchetype.id } : undefined
                    }
                  />
                </>
              ) : (
                <span className="grow">
                  <span className="text-amber-300">{t("callingUi.still")}</span>
                  <LocalizedText message="callingUi.subclassAdvice" values={{
                    subclass: <GameTerm id="subclass">{t("callingUi.subclassLower")}</GameTerm>,
                  }} />
                </span>
              )}
            </span>
          </Field>
        ) : subclassLockedAt !== null && klass ? (
          // Below the class's subclass level the menu stays shut and says
          // when the choice comes, instead of listing picks that vanished.
          <Field label={t("callingUi.subclass")} className="mt-3">
            <p className="rounded-lg border border-dashed border-stone-700/70 bg-stone-950/40 px-3 py-2 text-xs text-stone-400">
              <LocalizedText message="callingUi.subclassLocked" values={{
                class: locale === "en" ? klass.name.toLowerCase() : builderOptionName("class", klass, locale),
                subclass: <GameTerm id="subclass">{t("callingUi.subclassLower")}</GameTerm>,
                unlock: subclassLockedAt, level: effectiveLevel,
              }} />
            </p>
          </Field>
        ) : null}
      </StepPanel>

      {grantedFeatures.length ? (
        <StepPanel
          title={t("callingUi.gainTitle", { level: effectiveLevel })}
          help={t("callingUi.gainHelp")}
        >
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {grantedFeatures.map((feature) => {
              const reskin = pack?.features.find(entry => entry.from.trim().toLowerCase() === feature.name.trim().toLowerCase());
              const name = reskin ? reskin.name : nativeFeatureName(feature.name, locale);
              return (
                <span
                  key={`${feature.name}-${feature.level ?? 0}`}
                  className="flex items-center gap-1 text-xs text-stone-300"
                >
                  {name}
                  <InfoButton
                    label={name}
                    meta={feature.level ? t("callingUi.level", { level: feature.level }) : undefined}
                    text={reskin?.blurb || (klass ? nativeFeatureHelp(klass.id, feature.name, describeFeature(klass.id, subclass, feature.name), locale) : null)}
                  />
                </span>
              );
            })}
          </div>
        </StepPanel>
      ) : null}

      {klass ? (
        <StepPanel
          anchor="classSkills"
          title={t("callingUi.skillsTitle", { count: klass.skillChoices.count })}
          help={
            <>
              {klass.skillChoices.count - state.chosenSkills.length > 0 ? (
                <span className="text-amber-300">
                  {t("callingUi.left", { count: klass.skillChoices.count - state.chosenSkills.length })}{" "}
                </span>
              ) : null}
              <LocalizedText message="callingUi.skillsAdvice" values={{
                skill: <GameTerm id="skill">{t("callingUi.skillLower")}</GameTerm>,
                proficiency: <GameTerm id="proficiency_bonus">{t("callingUi.proficiencyLower")}</GameTerm>,
              }} />
            </>
          }
        >
          <div className="flex flex-wrap gap-2">
            {klass.skillChoices.from.map((skillId) => {
              const skill = SRD_SKILLS.find((entry) => entry.id === skillId);
              const canonicalName = skill?.name ?? skillId;
              const name = skillLabel(skillId, locale);
              const source = skillSources.get(skillId.trim().toLowerCase());
              const grantedBy = source === "race" && race ? builderOptionName("race", race, locale)
                : source === "background" && background ? builderOptionName("background", background, locale) : "";
              const trait = source === "race" && race ? grantingTrait(race.id, canonicalName) : null;
              const info = source
                ? t("callingUi.owned", { skill: name, source: t(`callingUi.source.${source}`),
                  by: grantedBy ? t("callingUi.by", { name: grantedBy }) : "",
                  trait: trait ? t("callingUi.through", { trait: grantingTraitLabel(trait, locale) }) : "",
                  help: skillHelpText(skillId, locale) ?? "" }).trim()
                : skillHelpText(skillId, locale);
              return (
                <PickPill
                  key={skillId}
                  label={name}
                  selected={state.chosenSkills.includes(skillId)}
                  disabled={Boolean(source)}
                  onClick={() => actions.toggleSkill(skillId)}
                  info={{ text: info }}
                >
                  {name}
                  {source ? t("callingUi.sourceSuffix", { source: t(`callingUi.source.${source}`) }) : ""}
                </PickPill>
              );
            })}
          </div>
        </StepPanel>
      ) : null}

      <ClassChoices state={state} derived={derived} actions={actions} klass={klass} />
    </div>
  );
}
