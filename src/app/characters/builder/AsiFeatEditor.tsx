"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";
import { abilityLabel } from "@/lib/i18n/character-presentations";
import { featTermLabel } from "@/lib/i18n/feat-presentations";
import { LocalizedText } from "@/lib/i18n/LocalizedText";
import { featAbilityIncrease } from "@/lib/srd/feat-effects";
import type { FeatChoices, FeatGrantSpec, FeatPicks } from "@/lib/srd/feat-grants";
import FeatChoicesFields, { type KnownTraining } from "./FeatChoicesFields";
import { X } from "lucide-react";
import { GameTerm } from "@/components/ui/GameTerm";
import { InfoButton } from "@/components/ui/InfoDialog";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { contentSlug } from "@/lib/help";
import { abilityMod, formatModifier } from "@/lib/srd";
import { ABILITY_SCORE_CAP, applyAsiChoices } from "@/lib/srd/asi";
import { halfFeatPicks, scoresWithHalfFeats } from "@/lib/srd/legality/half-feats";
import type { Ability, AbilityScores, AsiChoice } from "@/lib/schemas/sheet";
import { ABILITY_LABELS } from "./AbilityEditor";
import CatalogBrowser from "./CatalogBrowser";
import ContentPicker from "./ContentPicker";

const ABILITY_KEYS = Object.keys(ABILITY_LABELS) as Ability[];

const MODES = [
  ["plus2", "abilityUi.mode.plus2"],
  ["plus1x2", "abilityUi.mode.plus1x2"],
  ["feat", "abilityUi.mode.feat"],
] as const;

// One card per earned Ability Score Improvement (levels 4/8/12/16/19).
// Choices apply in order, so each card's selects reflect the scores after
// every earlier card; abilities already at the 20 cap are disabled.
export default function AsiFeatEditor({
  level,
  slotLevels,
  baseScores,
  choices,
  takenInPlay = [],
  onChange,
  featSpecOf,
  featDescOf,
  featChoices,
  onFeatPicks,
  known,
}: {
  // Character level for the builder's "Level N: X earned" heading; absent in
  // the level-up dialog, which introduces the section with its own copy.
  level?: number;
  slotLevels: number[];
  baseScores: AbilityScores | null;
  choices: Array<AsiChoice | null>;
  // Slots an edited character took at the table: already in the scores, so
  // shown as settled rather than asked for again (asiSlotsTakenInPlay).
  takenInPlay?: boolean[];
  onChange: (choices: Array<AsiChoice | null>) => void;
  // What a feat grants beyond its point and the picks it leaves open
  // (src/lib/srd/feat-grants.ts), picked under the feat's chip.
  featSpecOf?: (name: string) => FeatGrantSpec;
  // The feat's text where known, for a content pack half-feat's score.
  featDescOf?: (name: string) => string;
  featChoices?: FeatChoices;
  onFeatPicks?: (feat: string, picks: FeatPicks) => void;
  known?: KnownTraining;
}) {
  const { locale, t } = useLocale();
  const featLabel = (name: string) => featTermLabel("feat", name, locale);
  function setChoice(index: number, choice: AsiChoice | null) {
    const next = slotLevels.map((_, slot) => choices[slot] ?? null);
    next[index] = choice;
    onChange(next);
  }

  const unresolved = slotLevels.filter((_, index) => !choices[index] && !takenInPlay[index]).length;

  return (
    <section className="panel ornate rounded-xl border-amber-500/30 p-4">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h2 className="eyebrow text-xs text-amber-200/90">
          {level
            ? t(slotLevels.length === 1 ? "abilityUi.asiEarnedOne" : "abilityUi.asiEarnedMany", { level, count: slotLevels.length })
            : t("abilityUi.asiTitle")}
        </h2>
        {unresolved > 0 ? (
          <span className="rounded-full border border-amber-700 bg-amber-950/50 px-2 py-0.5 text-[11px] text-amber-200">
            {t("abilityUi.toPick", { count: unresolved })}
          </span>
        ) : (
          <span className="rounded-full border border-stone-700 bg-stone-900 px-2 py-0.5 text-[11px] text-stone-400">
            {t("abilityUi.allPicked")}
          </span>
        )}
      </div>
      <p className="mb-3 text-xs text-stone-500">
        <LocalizedText message="abilityUi.asiInfo" values={{
          ability: <GameTerm id="ability_score">{t("abilityUi.asiAbility")}</GameTerm>, cap: ABILITY_SCORE_CAP,
        }} />
      </p>
      {!baseScores ? (
        <p className="rounded-md border border-stone-800 bg-stone-900/60 p-3 text-xs text-stone-400">
          {t("abilityUi.assignFirst")}
        </p>
      ) : (
        <div className="space-y-3">
          {slotLevels.map((slotLevel, index) => {
            const choice = choices[index] ?? null;
            // Scores as they stand entering this slot: base plus all
            // earlier choices, a half-feat's point among them.
            const current = scoresEntering(baseScores, choices.slice(0, index), featDescOf);
            if (takenInPlay[index]) {
              return (
                <div
                  key={slotLevel}
                  className="reveal rounded-lg border border-stone-800 bg-stone-950/60 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-stone-300">{t("abilityUi.slot", { level: slotLevel })}</span>
                    <span className="rounded-full border border-stone-700 bg-stone-900 px-2 py-0.5 text-[11px] text-stone-400">
                      {t("abilityUi.taken")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-stone-500">
                    {t("abilityUi.takenInfo")}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={slotLevel}
                className="rounded-lg border border-stone-800 bg-stone-950/60 p-3"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-stone-300">{t("abilityUi.slot", { level: slotLevel })}</span>
                  <div className="flex rounded-md border border-stone-700 p-0.5 text-xs">
                    {MODES.map(([mode, label]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          if (mode === "feat") {
                            // Clears back to the feat search; picking a feat resolves it.
                            setChoice(index, null);
                          } else if (mode === "plus2") {
                            // A score the whole +2 fits under the cap first, so
                            // the default never throws a point away.
                            setChoice(index, { mode: "plus2", ability: firstOpenAbility(current, undefined, 2) });
                          } else {
                            const first = firstOpenAbility(current);
                            const second = firstOpenAbility(current, first);
                            setChoice(index, { mode: "plus1x2", abilities: [first, second] });
                          }
                        }}
                        className={cn(
                          "rounded px-2.5 py-1",
                          choice?.mode === mode
                            ? "bg-amber-900/60 text-amber-200"
                            : "text-stone-400 hover:text-stone-200",
                        )}
                      >
                        {t(label)}
                      </button>
                    ))}
                  </div>
                </div>

                {choice?.mode === "plus2" ? (
                  <label className="block sm:w-64">
                    <span className="mb-1 block text-xs text-stone-500">{t("abilityUi.plus2To")}</span>
                    <Select<Ability>
                      value={choice.ability}
                      onChange={(ability) => setChoice(index, { mode: "plus2", ability })}
                      label={t("abilityUi.plus2To")}
                      className="w-full"
                      options={ABILITY_KEYS.map((ability) => ({
                        value: ability,
                        label: t("abilityUi.abilityOption", { ability: abilityLabel(ability, locale), score: current[ability], cap: current[ability] >= ABILITY_SCORE_CAP ? t("abilityUi.atCap") : "" }),
                        disabled: current[ability] >= ABILITY_SCORE_CAP && ability !== choice.ability,
                      }))}
                    />
                  </label>
                ) : null}

                {choice?.mode === "plus1x2" ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {([0, 1] as const).map((half) => (
                      <label key={half} className="block">
                        <span className="mb-1 block text-xs text-stone-500">
                          {t(half === 0 ? "abilityUi.firstPlus1" : "abilityUi.secondPlus1")}
                        </span>
                        <Select<Ability>
                          value={choice.abilities[half]}
                          onChange={(picked) => {
                            const abilities = [...choice.abilities] as [Ability, Ability];
                            abilities[half] = picked;
                            setChoice(index, { mode: "plus1x2", abilities });
                          }}
                          label={t(half === 0 ? "abilityUi.firstPlus1" : "abilityUi.secondPlus1")}
                          className="w-full"
                          options={ABILITY_KEYS.map((ability) => ({
                            value: ability,
                            label: t("abilityUi.abilityOption", { ability: abilityLabel(ability, locale), score: current[ability], cap: current[ability] >= ABILITY_SCORE_CAP ? t("abilityUi.atCap") : "" }),
                            disabled:
                              (current[ability] >= ABILITY_SCORE_CAP && ability !== choice.abilities[half]) ||
                              ability === choice.abilities[half === 0 ? 1 : 0],
                          }))}
                        />
                      </label>
                    ))}
                  </div>
                ) : null}

                {choice === null || choice.mode === "feat" ? (
                  <div>
                    {choice?.mode === "feat" ? (
                      <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-amber-800 bg-amber-950/40 px-2.5 py-1 text-xs text-amber-200">
                        {featLabel(choice.feat)}
                        <InfoButton
                          label={featLabel(choice.feat)}
                          reference={{
                            kind: "feats",
                            slug: contentSlug(choice.feat),
                            name: choice.feat,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setChoice(index, null)}
                          aria-label={t("abilityUi.removeFeat", { feat: featLabel(choice.feat) })}
                          className="text-stone-500 hover:text-red-400"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ) : (
                      <>
                        <ContentPicker
                          kind="feats"
                          placeholder={t("abilityUi.searchFeat")}
                          onPick={(entry) => setChoice(index, featChoice(entry.name, featDescOf?.(entry.name)))}
                        />
                        {/* Nobody picks a feat they cannot name; the list is
                            here, with what each one does on every row. */}
                        <CatalogBrowser
                          kind="feats"
                          buttonLabel={t("abilityUi.browseFeats")}
                          selectedNames={[]}
                          onPick={(entry) => setChoice(index, featChoice(entry.name))}
                          sections={[{ key: "feats:all", label: t("abilityUi.allFeats") }]}
                        />
                      </>
                    )}
                  </div>
                ) : null}

                {choice?.mode === "feat" && (featAbilityIncrease(choice.feat, featDescOf?.(choice.feat))?.from.length ?? 0) > 1 ? (
                  // A half-feat that offers a choice of score (Resilient,
                  // Athlete) asks which one it raises.
                  <label className="mt-2 block sm:w-64">
                    <span className="mb-1 block text-xs text-stone-500">{t("abilityUi.featRaises", { feat: featLabel(choice.feat) })}</span>
                    <Select<Ability>
                      value={choice.ability ?? featAbilityIncrease(choice.feat, featDescOf?.(choice.feat))!.from[0]}
                      onChange={(ability) => setChoice(index, { ...choice, ability })}
                      label={t("abilityUi.featRaisesLabel", { feat: featLabel(choice.feat) })}
                      className="w-full"
                      options={featAbilityIncrease(choice.feat, featDescOf?.(choice.feat))!.from.map((ability) => ({
                        value: ability,
                        label: t("abilityUi.abilityOption", { ability: abilityLabel(ability, locale), score: current[ability], cap: "" }),
                        disabled: current[ability] >= ABILITY_SCORE_CAP && ability !== choice.ability,
                      }))}
                    />
                  </label>
                ) : null}

                {choice?.mode === "feat" && featSpecOf && onFeatPicks && known ? (
                  <FeatChoicesFields
                    feat={choice.feat}
                    desc={featDescOf?.(choice.feat)}
                    spec={featSpecOf(choice.feat)}
                    picks={featChoices?.[choice.feat.trim().toLowerCase()]}
                    known={known}
                    onChange={(picks) => onFeatPicks(choice.feat, picks)}
                  />
                ) : null}

                {choice ? (
                  <p className="mt-2 text-xs text-stone-500">
                    {choice.mode === "feat"
                      ? t("abilityUi.featSummary", { feat: featLabel(choice.feat), raise: featRaise(current, choice, featDescOf, locale) })
                      : summarizeChoice(current, choice, locale)}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-stone-500">
                    {t("abilityUi.pickAsi")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// A feat pick, with the first score a choosing half-feat offers already set
// so the choice is never left blank.
function featChoice(feat: string, desc?: string): AsiChoice {
  const increase = featAbilityIncrease(feat, desc);
  return increase && increase.from.length > 1
    ? { mode: "feat", feat, ability: increase.from[0] }
    : { mode: "feat", feat };
}

// The scores after these choices, with each half-feat's point added the way
// the server adds it (src/lib/srd/legality/half-feats.ts).
function scoresEntering(base: AbilityScores, earlier: Array<AsiChoice | null>, descOf?: (name: string) => string): AbilityScores {
  const picks = earlier.filter((choice): choice is AsiChoice => choice !== null);
  return scoresWithHalfFeats(applyAsiChoices(base, picks), halfFeatPicks({ asiChoices: picks }, 0, descOf)).abilities;
}

// ", Charisma 15 to 16 (+3)" for a half-feat, nothing for any other feat.
function featRaise(current: AbilityScores, choice: AsiChoice, descOf?: (name: string) => string, locale: AppLocale = "en"): string {
  if (choice.mode !== "feat") {
    return "";
  }
  const after = scoresEntering(current, [choice], descOf);
  const raised = ABILITY_KEYS.find((ability) => after[ability] > current[ability]);
  return raised
    ? createTranslator(locale)("abilityUi.raiseDetail", { transition: transitionText(raised, current[raised], after[raised], locale) })
    : "";
}

function firstOpenAbility(scores: AbilityScores, skip?: Ability, room = 1): Ability {
  const fits = (need: number) =>
    ABILITY_KEYS.find((ability) => ability !== skip && scores[ability] + need <= ABILITY_SCORE_CAP);
  return fits(room) ?? fits(1) ?? ABILITY_KEYS.find((ability) => ability !== skip) ?? "str";
}

function summarizeChoice(current: AbilityScores, choice: AsiChoice, locale: AppLocale = "en"): string {
  const after = applyAsiChoices(current, [choice]);
  const touched =
    choice.mode === "plus2" ? [choice.ability] : choice.mode === "plus1x2" ? choice.abilities : [];
  return touched
    .map(
      (ability) =>
        transitionText(ability, current[ability], after[ability], locale),
    )
    .join(", ");
}

function transitionText(ability: Ability, before: number, after: number, locale: AppLocale): string {
  return createTranslator(locale)("abilityUi.transition", { ability: abilityLabel(ability, locale), before, after, modifier: formatModifier(abilityMod(after)) });
}
