"use client";

import { skillHelpText } from "@/lib/i18n/game-help-presentations";

import CatalogBrowser from "@/app/characters/builder/CatalogBrowser";
import ContentPicker from "@/app/characters/builder/ContentPicker";
import type { RaceOption } from "@/app/characters/builder/useBuilderOptions";
import { GameTerm } from "@/components/ui/GameTerm";
import { InfoButton } from "@/components/ui/InfoDialog";
import { Select } from "@/components/ui/Select";
import { ALL_SKILLS } from "@/lib/content/mechanics";
import { contentSlug } from "@/lib/help";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { abilityLabel, characterLabel, skillLabel } from "@/lib/i18n/character-presentations";
import { builderOptionName } from "@/lib/i18n/builder-picker-presentations";
import { featTermLabel } from "@/lib/i18n/feat-presentations";
import { referenceDisplayName } from "@/lib/i18n/references";
import { trainingLabel } from "@/lib/i18n/training-presentations";
import { spellGearTermLabel } from "@/lib/i18n/spell-gear-presentations";
import { draconicAncestryLabel } from "@/lib/i18n/racial-presentations";
import { ABILITIES, type Ability } from "@/lib/schemas/sheet";
import { featAbilityIncrease } from "@/lib/srd/feat-effects";
import type { FeatChoices, FeatGrantSpec, FeatPicks } from "@/lib/srd/feat-grants";
import FeatChoicesFields, { type KnownTraining } from "./FeatChoicesFields";
import { racialFeatCount } from "@/lib/srd/race-id";
import { DRACONIC_ANCESTRIES, takesDraconicAncestry } from "@/lib/srd/racial-grants";
import { Chip } from "./steps/shared";

// The picks a race offers instead of fixing: half-elf's two +1 ability
// bumps and two skills, high elf's wizard cantrip, hill dwarf's tool, the
// variant human's feat. Until these existed the grants were silently
// dropped, leaving those characters weaker than the rules allow.
export function RacialChoicesSection({
  race,
  grantedSkills,
  asi,
  onAsiChange,
  skills,
  onSkillsChange,
  cantrip,
  onCantripChange,
  tool,
  onToolChange,
  ancestry = "",
  onAncestryChange,
  repeated = [],
  repeatSkills = [],
  onRepeatChange,
  feats = [],
  onFeatsChange,
  featAbility = "",
  onFeatAbilityChange,
  featSpecOf,
  featDescOf,
  featChoices,
  onFeatPicks,
  known,
}: {
  race: RaceOption;
  // Skills already granted by class and background, so they are not offered
  // twice (a duplicate pick would waste the racial choice).
  grantedSkills: string[];
  asi: Array<Ability | "">;
  onAsiChange: (index: number, ability: Ability | "") => void;
  skills: string[];
  onSkillsChange: (index: number, skill: string) => void;
  cantrip: string;
  onCantripChange: (spell: string) => void;
  tool: string;
  onToolChange: (tool: string) => void;
  // A dragonborn's draconic ancestry, by id.
  ancestry?: string;
  onAncestryChange?: (ancestry: string) => void;
  // Skills the race and the background both give, and the ones chosen in
  // their place.
  repeated?: string[];
  repeatSkills?: string[];
  onRepeatChange?: (index: number, skill: string) => void;
  // The variant human's feat, picked here with the race's other choices
  // (issue #124: it sat four steps away and no gate asked for it), and the
  // score a half-feat raises where it offers one (Resilient, Athlete).
  feats?: string[];
  onFeatsChange?: (feats: string[]) => void;
  featAbility?: Ability | "";
  onFeatAbilityChange?: (ability: Ability | "") => void;
  // What the feat grants beyond its point and the picks it leaves open
  // (src/lib/srd/feat-grants.ts), picked right under the feat.
  featSpecOf?: (name: string) => FeatGrantSpec;
  // The feat's text where known, for a content pack half-feat's score.
  featDescOf?: (name: string) => string;
  featChoices?: FeatChoices;
  onFeatPicks?: (feat: string, picks: FeatPicks) => void;
  known?: KnownTraining;
  inputClass: string;
}) {
  const { locale, t } = useLocale();
  const raceName = builderOptionName("race", race, locale);
  const skillName = (id: string) => skillLabel(id, locale);
  const featName = (name: string) => featTermLabel("feat", name, locale);
  const draconic = takesDraconicAncestry(race.id);
  const racialFeats = onFeatsChange ? racialFeatCount(race.id) : 0;
  const hasChoices = Boolean(
    race.asiChoice || race.skillChoice || race.cantripChoice || race.toolChoice || draconic || repeated.length || racialFeats,
  );
  // The half-feat's choice of score, offered once the feat is picked.
  const featScores = racialFeats ? (featAbilityIncrease(feats[0] ?? "", featDescOf?.(feats[0] ?? ""))?.from ?? []) : [];
  const pickFeat = (name: string) => {
    if (!onFeatsChange || feats.includes(name) || feats.length >= racialFeats) {
      return;
    }
    onFeatsChange([...feats, name]);
  };
  if (!hasChoices) {
    return null;
  }

  // A half-elf's +1s go to abilities other than the one the race already
  // raises, per the SRD.
  const fixedAbilities = new Set(Object.keys(race.asi) as Ability[]);
  // An either-or increase ("Strength or Dexterity") offers only its two.
  const asiFrom = race.asiChoice?.from;

  return (
    <div className="space-y-3 rounded-lg border border-amber-900/40 bg-amber-950/10 p-3">
      <p className="text-xs text-amber-200/90">{t("racialUi.choices", { race: raceName })}</p>

      {race.asiChoice ? (
        <div data-builder-target="racialAsi">
          <span className="mb-1 flex flex-wrap items-center gap-1 text-stone-400">
            <GameTerm id="ability_score">{t("racialUi.ability")}</GameTerm> {t("racialUi.increases", {
              amount: race.asiChoice.amount,
              targets: asiFrom
                ? (locale === "en" ? asiFrom.map(value => abilityLabel(value, locale)).join(" or ") : new Intl.ListFormat(locale, { type: "disjunction" }).format(asiFrom.map(value => abilityLabel(value, locale))))
                : t("racialUi.anyAbilities", { count: race.asiChoice.count }),
            })}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: race.asiChoice.count }, (_, index) => (
              <span key={index} className="flex items-center gap-1">
                <Select<Ability | "">
                  value={asi[index] ?? ""}
                  onChange={(next) => onAsiChange(index, next)}
                  className="min-w-0 grow"
                  label={t("racialUi.abilityLabel", { index: index + 1 })}
                  placeholder={t("racialUi.chooseAbility")}
                  options={[
                    // Still a row of its own, so a pick can be taken back.
                    { value: "" as const, label: t("racialUi.chooseAbility") },
                    ...ABILITIES.filter(
                      (ability) =>
                        !fixedAbilities.has(ability) &&
                        (!asiFrom || asiFrom.includes(ability)) &&
                        (asi[index] === ability || !asi.includes(ability)),
                    ).map((ability) => ({ value: ability, label: abilityLabel(ability, locale) })),
                  ]}
                />
                {asi[index] ? (
                  <GameTerm id={asi[index] as Ability} className="shrink-0 text-xs text-stone-500">
                    {t("racialUi.what")}
                  </GameTerm>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {race.skillChoice ? (
        <div data-builder-target="racialSkills">
          <span className="mb-1 flex flex-wrap items-center gap-1 text-stone-400">
            <GameTerm id="skill">{t("racialUi.skill")}</GameTerm> {t("racialUi.skillCount", { count: race.skillChoice.count })}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: race.skillChoice.count }, (_, index) => (
              <span key={index} className="flex items-center gap-1">
                <Select<string>
                  value={skills[index] ?? ""}
                  onChange={(next) => onSkillsChange(index, next)}
                  className="min-w-0 grow"
                  label={t("racialUi.skillLabel", { index: index + 1 })}
                  placeholder={t("racialUi.chooseSkill")}
                  options={[
                    { value: "", label: t("racialUi.chooseSkill") },
                    ...ALL_SKILLS.filter(
                      (skill) => skills[index] === skill || (!skills.includes(skill) && !grantedSkills.includes(skill)),
                    ).map((skill) => ({ value: skill as string, label: skillName(skill) })),
                  ]}
                />
                {skills[index] ? (
                  <InfoButton
                    label={skillName(skills[index])}
                    text={skillHelpText(skills[index], locale)}
                  />
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {draconic && onAncestryChange ? (
        <label className="block" data-builder-target="ancestry">
          <span className="mb-1 block text-stone-400">
            {t("racialUi.dragonHelp")}
          </span>
          <Select<string>
            value={ancestry}
            onChange={onAncestryChange}
            className="w-full"
            label={t("racialUi.dragon")}
            placeholder={t("racialUi.chooseDragon")}
            options={[
              { value: "", label: t("racialUi.chooseDragon") },
              ...DRACONIC_ANCESTRIES.map((entry) => ({
                value: entry.id,
                label: draconicAncestryLabel(entry, locale),
              })),
            ]}
          />
        </label>
      ) : null}

      {repeated.length && onRepeatChange ? (
        <div data-builder-target="repeatSkills">
          <span className="mb-1 flex flex-wrap items-center gap-1 text-stone-400">
            {t(repeated.length === 1 ? "racialUi.repeatOne" : "racialUi.repeatMany", {
              skills: locale === "en" ? repeated.map(skillName).join(" and ") : new Intl.ListFormat(locale, { type: "conjunction" }).format(repeated.map(skillName)), count: repeated.length,
            })}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {repeated.map((_, index) => (
              <span key={index} className="flex items-center gap-1">
                <Select<string>
                  value={repeatSkills[index] ?? ""}
                  onChange={(next) => onRepeatChange(index, next)}
                  className="min-w-0 grow"
                  label={t("racialUi.repeatLabel", { index: index + 1 })}
                  placeholder={t("racialUi.chooseSkill")}
                  options={[
                    { value: "", label: t("racialUi.chooseSkill") },
                    ...ALL_SKILLS.filter(
                      (skill) =>
                        repeatSkills[index] === skill ||
                        (!repeatSkills.includes(skill) && !grantedSkills.includes(skill) && !skills.includes(skill)),
                    ).map((skill) => ({ value: skill as string, label: skillName(skill) })),
                  ]}
                />
                {repeatSkills[index] ? (
                  <InfoButton label={skillName(repeatSkills[index])} text={skillHelpText(repeatSkills[index], locale)} />
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {racialFeats > 0 && onFeatsChange ? (
        <div data-builder-target="racialFeat">
          <span className="mb-1 flex flex-wrap items-center gap-1 text-stone-400">
            {t("racialUi.featCount", { count: racialFeats === 1 ? t("racialUi.one") : racialFeats })}
          </span>
          <p className="mb-1.5 text-xs text-stone-500">
            {t("racialUi.featIntro", { race: raceName })}
          </p>
          {feats.length ? (
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {feats.map((feat) => (
                <Chip
                  key={feat}
                  label={featName(feat)}
                  info={{ reference: { kind: "feats", slug: contentSlug(feat), name: feat } }}
                  onRemove={() => onFeatsChange(feats.filter((entry) => entry !== feat))}
                />
              ))}
            </div>
          ) : null}
          {feats.length < racialFeats ? (
            <>
              <CatalogBrowser
                kind="feats"
                buttonLabel={t("racialUi.browseFeats")}
                selectedNames={feats}
                onPick={(entry) => pickFeat(entry.name)}
                onUnpick={(featName) => onFeatsChange(feats.filter((entry) => entry !== featName))}
                sections={[{ key: "feats:all", label: t("racialUi.allFeats") }]}
              />
              <p className="mt-2 mb-1 text-xs text-stone-500">{t("racialUi.searchName")}</p>
              <ContentPicker
                kind="feats"
                placeholder={t("racialUi.searchFeats")}
                onPick={(entry) => pickFeat(entry.name)}
              />
            </>
          ) : null}
          {featSpecOf && onFeatPicks && known
            ? feats.slice(0, racialFeats).map((feat) => (
                <FeatChoicesFields
                  key={feat}
                  feat={feat}
                  desc={featDescOf?.(feat)}
                  spec={featSpecOf(feat)}
                  picks={featChoices?.[feat.trim().toLowerCase()]}
                  known={known}
                  onChange={(picks) => onFeatPicks(feat, picks)}
                />
              ))
            : null}
          {featScores.length > 1 && onFeatAbilityChange ? (
            <label className="mt-2 block sm:w-64">
              <span className="mb-1 block text-xs text-stone-500">{t("racialUi.featRaises", { feat: featName(feats[0]) })}</span>
              <Select<Ability>
                value={featScores.includes(featAbility as Ability) ? (featAbility as Ability) : featScores[0]}
                onChange={(ability) => onFeatAbilityChange(ability)}
                label={t("racialUi.featRaisesLabel", { feat: featName(feats[0]) })}
                className="w-full"
                options={featScores.map((ability) => ({ value: ability, label: abilityLabel(ability, locale) }))}
              />
            </label>
          ) : null}
        </div>
      ) : null}

      {race.toolChoice ? (
        <label className="block" data-builder-target="racialTool">
          <span className="mb-1 block text-stone-400">{t("racialUi.tool")}</span>
          <Select<string>
            value={tool}
            onChange={onToolChange}
            className="w-full"
            label={t("racialUi.tool")}
            placeholder={t("racialUi.chooseTool")}
            options={[{ value: "", label: t("racialUi.chooseTool") }, ...race.toolChoice.from.map((entry) => ({ value: entry, label: trainingLabel("tool", entry, locale) }))]}
          />
        </label>
      ) : null}

      {race.cantripChoice ? (
        <div data-builder-target="racialCantrip">
          <span className="mb-1 flex flex-wrap items-center gap-1 text-stone-400">
            {t("racialUi.bonus")} <GameTerm id="cantrip">{t("racialUi.cantrip")}</GameTerm> {t("racialUi.cantripScope", { class: characterLabel("class", race.cantripChoice.list, locale) })}
          </span>
          <p className="mb-1.5 text-xs text-stone-500">
            {t("racialUi.cantripIntro")}
          </p>
          {cantrip ? (
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-amber-800 bg-amber-950/40 px-2.5 py-1 text-xs text-amber-200">
                {referenceDisplayName("spell", cantrip, locale)}
                <InfoButton
                  label={referenceDisplayName("spell", cantrip, locale)}
                  reference={{ kind: "spells", slug: contentSlug(cantrip), name: cantrip }}
                />
              </span>
              <button
                type="button"
                onClick={() => onCantripChange("")}
                className="text-xs text-stone-500 hover:text-stone-300"
              >
                {t("racialUi.change")}
              </button>
            </div>
          ) : (
            <>
              {/* Nobody can search for a cantrip they have never heard of.
                  Every one this race may take is listed from the start, each
                  with the ⓘ that says what it does; the search is second. */}
              <CatalogBrowser
                kind="spells"
                buttonLabel={t("racialUi.everyCantrip", { class: characterLabel("class", race.cantripChoice.list, locale) })}
                defaultOpen
                openSections={[`cantrips:${race.cantripChoice.list}`]}
                selectedNames={cantrip ? [cantrip] : []}
                onPick={(entry) => onCantripChange(entry.name)}
                sections={[
                  {
                    key: `cantrips:${race.cantripChoice.list}`,
                    label: t("racialUi.everyCantrip", { class: characterLabel("class", race.cantripChoice.list, locale) }),
                    params: { class: race.cantripChoice.list, level: "0" },
                  },
                ]}
                metaOf={(entry) => spellGearTermLabel("school", entry.school ?? "", locale)}
              />
              <p className="mt-2 mb-1 text-xs text-stone-500">{t("racialUi.searchName")}</p>
              <ContentPicker
                kind="spells"
                extraParams={{ class: race.cantripChoice.list, level: "0" }}
                placeholder={t("racialUi.searchCantrips")}
                onPick={(entry) => onCantripChange(entry.name)}
              />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
