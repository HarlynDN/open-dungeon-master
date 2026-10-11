"use client";

import { classOptionView } from "@/lib/i18n/class-option-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { skillHelpText } from "@/lib/i18n/game-help-presentations";
import { LocalizedText } from "@/lib/i18n/LocalizedText";
import { trainingLabel, toolGrantCategoryLabel } from "@/lib/i18n/training-presentations";
import { skillLabel } from "@/lib/i18n/character-presentations";
import { builderTermLabel } from "@/lib/i18n/builder-name-presentations";
import { fightingStyleDescription } from "@/lib/i18n/calling-presentations";

import { GameTerm } from "@/components/ui/GameTerm";
import { InfoButton } from "@/components/ui/InfoDialog";
import { cn } from "@/lib/cn";

import { SRD_SKILLS } from "@/lib/srd";
import { expertiseAllowed, expertiseSlotsFor, THIEVES_TOOLS } from "@/lib/srd/features";
import { FIGHTING_STYLES } from "@/lib/srd/feature-effects";
import type { ClassOption } from "../useBuilderOptions";
import type { BuilderActions, BuilderDerived } from "../useBuilderDerived";
import type { BuilderState } from "../useBuilderState";
import { PickPill, StepPanel } from "./shared";

const optionCard = (selected: boolean) =>
  cn(
    "rounded-lg border px-3 py-2 text-left transition-colors duration-150",
    selected
      ? "border-amber-500/60 bg-amber-400/10 text-amber-100"
      : "border-stone-600/60 text-stone-300 hover:border-amber-500/40 hover:bg-stone-900/70",
  );

// The class-specific pick lists that only appear when the class and level
// earn them: expertise, fighting styles, and the option slots (invocations,
// maneuvers, metamagic, pact boons, infusions, runes, disciplines).
export function ClassChoices({
  state,
  derived,
  actions,
  klass,
}: {
  state: BuilderState;
  derived: BuilderDerived;
  actions: BuilderActions;
  klass: ClassOption | undefined;
}) {
  const { locale, t } = useLocale();
  const { effectiveLevel, proficientSkills, styleSlots, optionSlots, toolGrants } = derived;
  const expertiseSlots = klass ? expertiseSlotsFor(klass.id, effectiveLevel) : 0;
  // Only picks in a skill the character still has count: dropping a class
  // skill takes its expertise with it, here and in the step's gate.
  const expertiseChosen = state.expertisePicks.filter((skillId) =>
    expertiseAllowed(skillId, proficientSkills, klass ? [klass.id] : []),
  );
  // A rogue may take thieves' tools in place of a skill.
  const expertiseOptions = klass?.id === "rogue" ? [...proficientSkills, THIEVES_TOOLS] : proficientSkills;
  return (
    <>
      {/* "Three musical instruments of your choice", "one gaming set": the
          sheet names the tools, so each open grant is a row of pills the
          player picks from. Nothing is picked for them; the step waits. */}
      {toolGrants.choices.map((choice, index) => {
        const mine = toolGrants.chosen.filter((tool) => choice.from.includes(tool));
        const left = toolGrants.left[index] ?? 0;
        return (
          <StepPanel
            key={`${choice.label}-${index}`}
            anchor="tools"
            title={t("callingUi.toolTitle", { count: choice.count, label: toolGrantCategoryLabel(choice.label, choice.count, locale) })}
            help={
              left > 0 ? <span className="text-amber-300">{t("callingUi.left", { count: left })}</span> : undefined
            }
          >
            <div className="flex flex-wrap gap-2">
              {choice.from.map((tool) => {
                const selected = mine.includes(tool);
                return (
                  <PickPill
                    key={tool}
                    label={trainingLabel("tool", tool, locale)}
                    selected={selected}
                    onClick={() => {
                      if (selected) {
                        state.setToolPicks(() => toolGrants.chosen.filter((entry) => entry !== tool));
                        return;
                      }
                      if (left > 0) {
                        state.setToolPicks(() => [...toolGrants.chosen, tool]);
                        return;
                      }
                      // A single pick swaps; a full set of several waits for
                      // one to be let go, as expertise does.
                      if (choice.count === 1 && mine[0]) {
                        state.setToolPicks(() => [
                          ...toolGrants.chosen.filter((entry) => entry !== mine[0]),
                          tool,
                        ]);
                      }
                    }}
                  >
                    {trainingLabel("tool", tool, locale)}
                  </PickPill>
                );
              })}
            </div>
          </StepPanel>
        );
      })}

      {/* Drawn from the skills alone, never from the sheet preview: that waits
          on ability scores, which are the NEXT step, and this step cannot be
          left until its expertise is picked. */}
      {klass && expertiseSlots > 0 ? (
        <StepPanel
          anchor="expertise"
          title={t("callingUi.expertiseTitle", { count: expertiseSlots })}
          help={
            <>
              {expertiseSlots - expertiseChosen.length > 0 ? (
                <span className="text-amber-300">
                  {t("callingUi.left", { count: expertiseSlots - expertiseChosen.length })}{" "}
                </span>
              ) : null}
              <LocalizedText message="callingUi.expertiseHelp" values={{
                expertise: <GameTerm id="expertise">{t("callingUi.expertiseWord")}</GameTerm>,
                proficiency: <GameTerm id="proficiency_bonus">{t("callingUi.proficiencyLower")}</GameTerm>,
              }} />
            </>
          }
        >
          <div className="flex flex-wrap gap-2">
            {proficientSkills.length === 0 ? (
              <span className="text-xs text-stone-500">{t("callingUi.skillsFirst")}</span>
            ) : null}
            {expertiseOptions.map((skillId) => {
              const skill = SRD_SKILLS.find((entry) => entry.id === skillId);
              const selected = expertiseChosen.includes(skillId);
              return (
                <PickPill
                  key={skillId}
                  label={skill ? skillLabel(skillId, locale) : skillId === THIEVES_TOOLS ? t("callingUi.thievesLabel") : skillId}
                  selected={selected}
                  info={{ text: skill ? skillHelpText(skillId, locale) : t("callingUi.thievesHelp") }}
                  onClick={() =>
                    state.setExpertisePicks((current) => {
                      // Picks whose skill has since been dropped are swept
                      // out here, so they never hold a slot they cannot use.
                      const live = current.filter((entry) => expertiseOptions.includes(entry));
                      return selected
                        ? live.filter((entry) => entry !== skillId)
                        : live.length < expertiseSlots
                          ? [...live, skillId]
                          : live;
                    })
                  }
                >
                  {skill ? skillLabel(skillId, locale) : skillId === THIEVES_TOOLS && locale !== "en" ? t("callingUi.thievesLabel") : skillId}
                </PickPill>
              );
            })}
          </div>
        </StepPanel>
      ) : null}

      {styleSlots > 0 ? (
        <StepPanel
          anchor="styles"
          title={t("callingUi.styleTitle", { count: styleSlots })}
          help={
            styleSlots - state.stylePicks.length > 0 ? (
              <span className="text-amber-300">
                {t("callingUi.styleHelp", { count: styleSlots - state.stylePicks.length })}
              </span>
            ) : undefined
          }
        >
          <div className="grid gap-1.5 sm:grid-cols-2">
            {FIGHTING_STYLES.map((style) => {
              const selected = state.stylePicks.includes(style.id);
              return (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    state.setStylePicks((current) =>
                      selected
                        ? current.filter((entry) => entry !== style.id)
                        : current.length < styleSlots
                          ? [...current, style.id]
                          : current,
                    )
                  }
                  className={optionCard(selected)}
                >
                  <span className="block text-xs">{builderTermLabel("fightingStyle", style.name, locale)}</span>
                  <span className="block text-[11px] text-stone-500">{fightingStyleDescription(style, locale)}</span>
                </button>
              );
            })}
          </div>
        </StepPanel>
      ) : null}

      {optionSlots.map((slot) => (
        <StepPanel
          key={slot.kind}
          anchor="options"
          title={t("callingUi.optionsTitle", { label: builderTermLabel("optionCategory", slot.label, locale), count: slot.total })}
          help={
            <>
              {slot.remaining > 0 ? (
                <span className="text-amber-300">{t("callingUi.left", { count: slot.remaining })}{" "}</span>
              ) : null}
              {t("callingUi.optionsHelp")}
            </>
          }
        >
          <div className="grid gap-1.5 sm:grid-cols-2">
            {slot.options.map((option) => {
              const view = classOptionView(option, locale);
              const selected = slot.chosen.some(
                (chosenName) => chosenName.toLowerCase() === option.n.toLowerCase(),
              );
              return (
                <div key={option.n} className={cn(optionCard(selected), "flex items-start gap-1")}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => actions.toggleOption(slot, option.n)}
                    className="grow text-left"
                  >
                    <span className="block text-xs">{view.name}</span>
                    <span className="block text-[11px] text-stone-500">
                      {option.req ? t("callingUi.requiresSentence", { requirement: view.requirement ?? option.req }) : ""}
                      {view.description}
                    </span>
                  </button>
                  <InfoButton
                    label={view.name}
                    meta={option.req ? t("callingUi.requires", { requirement: view.requirement ?? option.req }) : undefined}
                    text={view.description}
                  />
                </div>
              );
            })}
          </div>
        </StepPanel>
      ))}
    </>
  );
}
