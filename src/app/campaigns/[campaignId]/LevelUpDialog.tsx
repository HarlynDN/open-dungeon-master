"use client";

import { classOptionView, classOptionFeatureName, classOptionHelp } from "@/lib/i18n/class-option-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { trainingLabel } from "@/lib/i18n/training-presentations";
import { characterLabel, subclassLabel, skillLabel } from "@/lib/i18n/character-presentations";
import { referenceDisplayName } from "@/lib/i18n/references";
import { builderTermLabel } from "@/lib/i18n/builder-name-presentations";
import { fightingStyleDescription } from "@/lib/i18n/calling-presentations";
import { sheetFeatureChoice } from "@/lib/i18n/sheet-dialog-presentations";
import { levelUpNotice, levelUpPrerequisite, levelUpGrants, levelUpClassLine } from "@/lib/i18n/level-up-presentations";
import { skillHelpText } from "@/lib/i18n/game-help-presentations";
import { subclassHelpText } from "@/lib/i18n/calling-material-presentations";

import { isThievesTools, THIEVES_TOOLS } from "@/lib/srd/features";
import * as Dialog from "@radix-ui/react-dialog";
import { Dices, Loader2, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { InfoButton, InfoChipList } from "@/components/ui/InfoDialog";
import { describeFeature } from "@/lib/help";
import {
  findOptionByFeatureName,
  openOptionSlots,
  optionFeatureName,
  optionSlotsFor,
  type OptionSlot,
} from "@/lib/srd/options";
import {
  ALL_CLASSES,
  SRD_SKILLS,
  XP_THRESHOLDS,
  abilityMod,
  findClass,
  levelForXp,
} from "@/lib/srd";
import { asiLevelsFor } from "@/lib/srd/asi";
import { asiOwed } from "@/lib/srd/asi-ledger";
import { fixedDieValue, type HpMethod } from "@/lib/srd/hit-points";
import {
  MULTICLASS_CAP,
  canMulticlassInto,
  classListFor,
  describePrereq,
  multiclassGrantsFor,
} from "@/lib/srd/multiclass";
import {
  populateFeaturesForClasses,
  subclassLevelFor,
  subclassNamesFor,
  subclassSpellsFor,
} from "@/lib/srd/features";
import {
  FIGHTING_STYLES,
  chosenFightingStyles,
  fightingStyleFeatureName,
  fightingStyleSlots,
  type FightingStyleId,
} from "@/lib/srd/feature-effects";
import { spellStyleFor, spellbookAllowance } from "@/lib/srd/spell-prep";
import { isThirdCaster } from "@/lib/srd/third-caster";
import {
  abilitiesAfterLevel,
  casterPreview,
  expertiseOpen,
  freeCantripsIn,
  levelUpHpPreview,
  thirdCasterPickRefusal,
} from "./level-up-preview";
import { SpellBook, type SpellTile } from "@/components/sheet/SpellBook";
import { useSpellPool } from "@/components/sheet/useSpellPool";
import AsiFeatEditor from "@/app/characters/builder/AsiFeatEditor";
import { useFeatDescs } from "@/app/characters/builder/useFeatDescs";
import { authoredFeatDesc, featAbilityIncrease } from "@/lib/srd/feat-effects";
import { featGrantSpec, featOwed, type FeatChoices, type FeatPicks } from "@/lib/srd/feat-grants";
import { useArchetypes } from "@/app/characters/builder/useBuilderOptions";
import type { AsiChoice, CharacterSheet } from "@/lib/schemas/sheet";


// Guided level-up, one level at a time. The dialog gathers the CHOICES the
// rules leave to the player (the class taking the level, an Ability Score
// Improvement or feat the class owes, a subclass at the class's subclass
// level, expertise, a fighting style or other class pick, new spells) and the
// server builds the level from them (src/lib/srd/level-up.ts): hit points by
// the table's method, features, slots and counters. What the server answers
// (the hit points gained, the die it rolled) is shown before the dialog
// closes, and a refusal is shown in its words.
export function LevelUpDialog({
  campaignId,
  sheet,
  multiclassAllowed = true,
  hpMethod = "average",
  onDone,
}: {
  campaignId: string;
  sheet: CharacterSheet;
  // The level on offer. A level-up takes the next level only; the dialog
  // opens again for the one after.
  targetLevel?: number;
  // Campaign setting: offers the class step's new-class options only when
  // the table allows multiclassing (already-split sheets keep theirs).
  multiclassAllowed?: boolean;
  // The table's hit point method (a campaign setting).
  hpMethod?: HpMethod;
  onDone: () => void;
}) {
  // Held from the moment the dialog opens: the sheet the server sends back
  // after the level is already at it.
  const { locale, t } = useLocale();
  const [startLevel] = useState(sheet.level);
  const targetLevel = Math.min(20, startLevel + 1);
  // Under "rolled" the player may still take the fixed value; the server
  // rolls the die otherwise.
  const [hpChoice, setHpChoice] = useState<"roll" | "average">("roll");
  // The server's answer to a level taken: shown before the dialog closes.
  const [result, setResult] = useState<{
    hpGained: number;
    rolled: number | null;
    die: number;
    classLine: string;
  } | null>(null);
  // A caster who knows their spells may give one up for another.
  const [forgetPick, setForgetPick] = useState("");
  const [asiChoices, setAsiChoices] = useState<Array<AsiChoice | null>>([]);
  // The picks a feat taken this level leaves open (Linguist's languages),
  // by feat name; the server applies them (src/lib/srd/feat-grants.ts).
  const [featChoices, setFeatChoices] = useState<FeatChoices>({});
  const featsPicked = asiChoices.flatMap((choice) => (choice?.mode === "feat" ? [choice.feat] : []));
  const featDescs = useFeatDescs(featsPicked);
  const featDescOf = (name: string) => featDescs[name.trim().toLowerCase()] ?? authoredFeatDesc(name) ?? "";
  const featSpecOf = (name: string) => featGrantSpec(featDescOf(name));
  // A half-feat with a choice of score raises the first it offers when the
  // player left the choice (a content pack feat's text arrives after the
  // pick; the editor shows that same first score).
  const settled = (choice: AsiChoice): AsiChoice => {
    if (choice.mode !== "feat" || choice.ability) {
      return choice;
    }
    const from = featAbilityIncrease(choice.feat, featDescOf(choice.feat))?.from ?? [];
    return from.length > 1 ? { ...choice, ability: from[0] } : choice;
  };
  const setFeatPicks = (feat: string, picks: FeatPicks) =>
    setFeatChoices((current) => ({ ...current, [feat.trim().toLowerCase()]: picks }));
  const featPicksSent = Object.fromEntries(
    featsPicked
      .map((feat) => [feat.trim().toLowerCase(), featChoices[feat.trim().toLowerCase()]] as const)
      .filter((entry): entry is readonly [string, FeatPicks] => Boolean(entry[1])),
  );
  const featPicksOpen = featsPicked.some((feat) => featOwed(feat, featSpecOf(feat), featChoices[feat.trim().toLowerCase()]));
  const [subclassChoice, setSubclassChoice] = useState("");
  const [expertisePicks, setExpertisePicks] = useState<string[]>([]);
  const [spellPicks, setSpellPicks] = useState<string[]>([]);
  // Cantrips picked this level, kept apart: they have their own allowance.
  const [cantripPicks, setCantripPicks] = useState<string[]>([]);
  const [stylePicks, setStylePicks] = useState<FightingStyleId[]>([]);
  const [spellNote, setSpellNote] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Which class takes the level: an existing one advances, or an eligible
  // new class starts at 1 (multiclassing). Defaults to the primary class so
  // single-class characters keep their one-click flow.
  const classList = useMemo(() => classListFor(sheet), [sheet]);
  const [classChoice, setClassChoice] = useState(classList[0].id);
  const [skillPick, setSkillPick] = useState("");

  const levelsGained = 1;
  const chosenEntry = classList.find(
    (entry) => entry.id.toLowerCase() === classChoice.toLowerCase(),
  );
  const chosenKlass = findClass(classChoice);
  const isNewClass = !chosenEntry;
  const classLevelAfter = (chosenEntry?.level ?? 0) + levelsGained;
  // Anything beyond leveling a lone class in place goes through the
  // server's multiclass path (levelUpClass + server-built class array).
  const isMulticlassPath = (sheet.classes?.length ?? 0) > 0 || isNewClass;
  const nextClasses = useMemo(() => {
    const next = classList.map((entry) => ({ ...entry }));
    const mine = next.find((entry) => entry.id.toLowerCase() === classChoice.toLowerCase());
    if (mine) {
      mine.level += levelsGained;
    } else {
      next.push({ id: classChoice, subclass: "", level: levelsGained });
    }
    return next;
  }, [classList, classChoice, levelsGained]);

  // Eligible-first list of classes the character could multiclass into.
  const newClassOptions = useMemo(() => {
    if (!multiclassAllowed || classList.length >= MULTICLASS_CAP) {
      return [];
    }
    return ALL_CLASSES.filter(
      (candidate) => !classList.some((entry) => entry.id.toLowerCase() === candidate.id),
    )
      .map((candidate) => ({ option: candidate, check: canMulticlassInto(sheet, candidate.id) }))
      .sort((a, b) => Number(b.check.ok) - Number(a.check.ok));
  }, [classList, sheet, multiclassAllowed]);
  const needsClassStep = classList.length > 1 || newClassOptions.some((entry) => entry.check.ok);

  // Some multiclass grants include one class-skill pick (rogue, ranger,
  // bard); offered right in the class step and validated server-side.
  const chosenGrant = isNewClass ? multiclassGrantsFor(classChoice) : null;
  const skillOptions = chosenGrant?.skillChoice
    ? (chosenGrant.skillChoice.from.length
        ? chosenGrant.skillChoice.from
        : SRD_SKILLS.map((skill) => skill.id)
      ).filter((id) => !sheet.proficiencies.skills.includes(id))
    : [];
  const needsSkillPick = skillOptions.length > 0;

  // Picking a subclass keeps only the option picks it has slots for: three
  // Battle Master maneuvers do not survive a switch to Champion, and the
  // fighting styles are asked again since the subclass decides how many.
  function chooseSubclass(name: string) {
    setSubclassChoice(name);
    setStylePicks([]);
    setOptionPicks((current) =>
      current.filter((pick) => {
        const option = findOptionByFeatureName(pick);
        return option !== null && optionSlotsFor(classChoice, name, classLevelAfter, option.k) > 0;
      }),
    );
  }

  function resetClassPicks() {
    setSubclassChoice("");
    setExpertisePicks([]);
    setSpellPicks([]);
    setCantripPicks([]);
    setStylePicks([]);
    setOptionPicks([]);
    setSkillPick("");
    setAsiChoices([]);
    setForgetPick("");
  }

  const klass = chosenKlass ?? findClass(sheet.class);
  const hitDie = chosenKlass?.hitDie ?? Number(sheet.hitDice.die.replace("d", "")) ?? 8;
  // The scores after this level's improvements (and Primal Champion at
  // barbarian 20), as the server applies them before it counts hit points
  // and the spell allowance (U:UB5, UB6).
  const pickedChoices = asiChoices.filter((choice): choice is AsiChoice => choice !== null).map(settled);
  const after = abilitiesAfterLevel(sheet, pickedChoices, { id: classChoice, level: classLevelAfter }, featDescOf);
  const conMod = abilityMod(after.abilities.con);

  // The improvements the class list earns at the new level, less those the
  // sheet has taken: a fighter's 6th, a rogue's 10th, and an improvement an
  // older character is owed by the per-class table. Counted by CLASS level.
  const asiOwedNow = asiOwed(sheet, nextClasses);
  const asiLevels = asiLevelsFor(classChoice)
    .filter((level) => level <= classLevelAfter)
    .slice(-Math.max(1, asiOwedNow));
  while (asiOwedNow && asiLevels.length < asiOwedNow) {
    asiLevels.unshift(asiLevels[0] ?? classLevelAfter);
  }
  if (!asiOwedNow) {
    asiLevels.length = 0;
  }

  // Expertise: rogue 1/6 and bard 3/10 double proficiency in two skills
  // each; the step appears when the new level grants unspent picks. Scales
  // by the chosen class's own level, so a rogue dip never grants bard picks.
  const currentExpertise = sheet.proficiencies.expertise ?? [];
  // Summed over every class the character holds, as the server sums it
  // (U:UB4): a rogue 6 taking bard 3 has bard's two on top of the rogue's.
  const expertiseToPick = expertiseOpen(sheet, nextClasses);
  // A rogue may take thieves' tools in place of a skill (features.ts).
  const toolExpertise =
    nextClasses.some((entry) => entry.id === "rogue") && (sheet.proficiencies.tools ?? []).some(isThievesTools) && !currentExpertise.some(isThievesTools)
      ? [THIEVES_TOOLS]
      : [];
  const expertiseOptions = [
    ...sheet.proficiencies.skills.filter((skill) => !currentExpertise.includes(skill)),
    ...toolExpertise,
  ];
  const needsExpertise = expertiseToPick > 0 && expertiseOptions.length > 0;

  // Fighting styles: the class grants the slot, the player picks which one,
  // and the pick is stored as a "choice"-sourced feature the regrant keeps.
  // Independent of the subclass, so it can be resolved before one is chosen.
  const styleSlots = fightingStyleSlots(
    populateFeaturesForClasses(sheet.features, nextClasses, sheet.race),
  );
  const currentStyles = chosenFightingStyles(sheet.features);
  const stylesToPick = Math.max(0, styleSlots - currentStyles.length);
  const needsStyle = stylesToPick > 0;
  const styleOptions = FIGHTING_STYLES.filter(
    (style) => !currentStyles.some((name) => name.toLowerCase() === style.name.toLowerCase()),
  );

  // Pick-lists that gained slots at this level: invocations, maneuvers,
  // metamagic, pact boons, infusions, runes, disciplines. Uses the subclass
  // being chosen this level-up if there is one, so a fighter who picks Battle
  // Master here is offered maneuvers in the same flow.
  const [optionPicks, setOptionPicks] = useState<string[]>([]);
  const subclassLevel = subclassLevelFor(classChoice);
  const entrySubclass = chosenEntry?.subclass ?? "";
  const needsSubclass =
    subclassLevel !== null &&
    !entrySubclass.trim() &&
    (chosenEntry?.level ?? 0) < subclassLevel &&
    subclassLevel <= classLevelAfter;
  const builtInSubclasses = subclassNamesFor(classChoice);
  // Fetched for the class levelled either way: a workshop or pack subclass
  // the sheet already holds has its features in these rows, and the preview
  // below grants them from here (src/lib/srd/features.ts browser extras).
  const fetchedArchetypes = useArchetypes(entrySubclass.trim() || needsSubclass ? classChoice : "");
  const archetypes = needsSubclass ? fetchedArchetypes : [];
  // The subclasses with real feature tables come first; content-pack
  // archetypes are prose only and fill in behind them.
  const subclassOptions = [...builtInSubclasses];
  for (const archetype of archetypes) {
    if (!subclassOptions.some((name) => name.toLowerCase() === archetype.name.toLowerCase())) {
      subclassOptions.push(archetype.name);
    }
  }

  const openSlots = openOptionSlots({
    classId: classChoice,
    subclass: subclassChoice || entrySubclass,
    level: classLevelAfter,
    features: [...sheet.features, ...optionPicks.map((name) => ({ name }))],
    feats: [...sheet.feats, ...featsPicked],
  });
  const needsOptions = openSlots.some((slot) => slot.remaining > 0);

  function toggleOption(slot: OptionSlot, name: string) {
    const featureName = optionFeatureName(slot.kind, name);
    setOptionPicks((current) => {
      if (current.includes(featureName)) {
        return current.filter((entry) => entry !== featureName);
      }
      return slot.remaining > 0 ? [...current, featureName] : current;
    });
  }

  // Spellcasting for the CHOSEN class: on the multiclass path each caster
  // class keeps its own list, so the picker reads (and the server writes)
  // that class's entry rather than the legacy shared fields.
  const casterEntry = sheet.spellcasting?.casters?.find(
    (caster) => caster.classId.toLowerCase() === classChoice.toLowerCase(),
  );
  const effectiveSubclass = subclassChoice || entrySubclass;
  // The chosen class's casting at its new level, from the engine's tables:
  // an Eldritch Knight or Arcane Trickster casts from the wizard's list
  // (U:UB1), which the class row alone (no spell ability) never showed.
  const caster = casterPreview({
    classId: classChoice,
    subclass: effectiveSubclass,
    level: classLevelAfter,
    abilitiesAfter: after.abilities,
  });
  const showSpells = caster.casts || (!isMulticlassPath && Boolean(sheet.spellcasting));
  // The hit points, the per-level bonuses and Draconic Resilience included.
  const classesAfter = nextClasses.map((entry) =>
    entry.id.toLowerCase() === classChoice.toLowerCase()
      ? { ...entry, subclass: effectiveSubclass || entry.subclass }
      : entry,
  );
  const hpPreview = levelUpHpPreview({
    sheet,
    hitDie,
    method: hpMethod,
    abilitiesAfter: after.abilities,
    featsAfter: after.feats,
    classesAfter,
    targetLevel,
  });
  const fixedGain = hpPreview.fixed;

  const steps = [
    ...(needsClassStep ? ["class"] : []),
    "hp",
    ...(asiLevels.length ? ["asi"] : []),
    ...(needsExpertise ? ["expertise"] : []),
    ...(needsStyle ? ["style"] : []),
    ...(needsSubclass ? ["subclass"] : []),
    ...(needsOptions ? ["options"] : []),
    ...(showSpells ? ["spells"] : []),
  ];
  const step = steps[stepIndex];
  const lastStep = stepIndex === steps.length - 1;

  const newFeatureNames = useMemo(() => {
    const current = new Set(sheet.features.map((feature) => feature.name.toLowerCase()));
    const withSubclass = nextClasses.map((entry) =>
      entry.id.toLowerCase() === classChoice.toLowerCase()
        ? { ...entry, subclass: subclassChoice || entry.subclass }
        : entry,
    );
    return populateFeaturesForClasses(sheet.features, withSubclass, sheet.race)
      .filter((feature) => !current.has(feature.name.toLowerCase()))
      .map((feature) => feature.name);
  }, [sheet.features, nextClasses, classChoice, subclassChoice, sheet.race]);

  // The class's real spell list at the levels this character can now cast,
  // so nobody has to know 5e spell lists by heart. Multiclass, per RAW: the
  // learnable levels come from the class's OWN table at its class level.
  const maxCastable = caster.maxLevel || null;

  // The class's whole list up to what it can now cast (the old search
  // stopped at sixty rows, cantrips first, which could leave a wizard with
  // nothing but cantrips to look at).
  const { pool: spellPool, loading: poolLoading } = useSpellPool(
    caster.list,
    maxCastable ?? 0,
    step === "spells",
  );

  // A wizard learns into the spellbook: two spells a level (a whole starting
  // book for a first wizard level), whatever they have prepared.
  const bookStyle = spellStyleFor(classChoice) === "spellbook";
  const knownList = useMemo(() => {
    const listOf = (entry: { known: string[]; prepared: string[]; spellbook?: string[] }) =>
      entry.known.length
        ? entry.known
        : bookStyle
          ? [...new Set([...(entry.spellbook ?? []), ...entry.prepared])]
          : entry.prepared;
    if (isMulticlassPath) {
      // The chosen class's own list; a caster class being started fresh
      // knows nothing yet. Lead-built multiclass sheets without a casters
      // array fall back to the legacy fields when leveling their first
      // caster class.
      const entry =
        casterEntry ??
        (sheet.spellcasting && !sheet.spellcasting.casters?.length && !isNewClass
          ? sheet.spellcasting
          : null);
      return entry ? listOf(entry) : [];
    }
    return sheet.spellcasting ? listOf(sheet.spellcasting) : [];
  }, [sheet.spellcasting, isMulticlassPath, casterEntry, isNewClass, bookStyle]);
  // Spells chosen for preparation that wait for the long rest. They already
  // hold a place in the allowance (the sheet's counter counts them), so the
  // picks offered here must leave room for them too.
  const pendingList = useMemo(() => {
    if (isMulticlassPath) {
      if (casterEntry) {
        return casterEntry.pending ?? [];
      }
      return sheet.spellcasting && !sheet.spellcasting.casters?.length && !isNewClass
        ? (sheet.spellcasting.pending ?? [])
        : [];
    }
    return sheet.spellcasting?.pending ?? [];
  }, [sheet.spellcasting, isMulticlassPath, casterEntry, isNewClass]);
  const cantripList = useMemo(() => {
    if (isMulticlassPath) {
      if (casterEntry) {
        return casterEntry.cantrips ?? [];
      }
      return sheet.spellcasting && !sheet.spellcasting.casters?.length && !isNewClass
        ? (sheet.spellcasting.cantrips ?? [])
        : [];
    }
    return sheet.spellcasting?.cantrips ?? [];
  }, [sheet.spellcasting, isMulticlassPath, casterEntry, isNewClass]);
  const alreadyKnown = useMemo(
    () => new Set([...knownList, ...pendingList, ...cantripList].map((name) => name.toLowerCase())),
    [knownList, pendingList, cantripList],
  );
  // Read with the scores after this level's improvement (U:UB6).
  const allowance = showSpells ? caster.spellCap : null;
  // The subclass's always-prepared spells never count against the allowance.
  const grantedFree = useMemo(
    () =>
      new Set(
        subclassSpellsFor(classChoice, effectiveSubclass, classLevelAfter).map((name) =>
          name.toLowerCase(),
        ),
      ),
    [classChoice, effectiveSubclass, classLevelAfter],
  );
  const heldSpells = [...new Set([...knownList, ...pendingList].map((name) => name.toLowerCase()))].filter(
    (name) => !grantedFree.has(name),
  ).length;
  const bookGain = bookStyle
    ? isNewClass
      ? spellbookAllowance(classLevelAfter)
      : 2 * levelsGained
    : null;
  // A spell given up makes room for one more.
  const remainingPicks =
    bookGain ?? (allowance ? Math.max(0, allowance.count - heldSpells) + (forgetPick ? 1 : 0) : null);
  const cantripAllowance = showSpells ? caster.cantripCap : null;
  // The race's cantrips (a high elf's pick, a tiefling's Thaumaturgy) are
  // known on top of the class's and leave its count alone (U:UB2), as the
  // level-up route counts them.
  const freeCantrips = freeCantripsIn(sheet, cantripList);
  const remainingCantrips =
    cantripAllowance !== null
      ? Math.max(0, cantripAllowance - Math.max(0, cantripList.length - freeCantrips))
      : null;
  const levelStyle = caster.style;
  // Why a spell not yet picked cannot be picked now: every new spell or
  // cantrip for the level is chosen, or an Eldritch Knight's or Arcane
  // Trickster's school rule (as the server judges it). `short` is the tile's
  // state line, so a full list reads as full before anyone taps; `long` is
  // the note a tap shows (issue 66).
  const schoolOf = (name: string) =>
    spellPool.find((spell) => spell.name === name)?.data?.school;
  function pickRefusal(name: string, level: number | null): { short: string; long: string } | null {
    if (level === 0) {
      return remainingCantrips !== null && cantripPicks.length >= remainingCantrips
        ? { short: t("sessionUi.level.spell.fullCantrips"), long: `That is every new cantrip for this level. Untick one to choose ${name}.` }
        : null;
    }
    if (remainingPicks !== null && spellPicks.length >= remainingPicks) {
      return { short: t("sessionUi.level.spell.fullSpells"), long: `That is every new spell for this level. Untick one to choose ${name}.` };
    }
    if (!isThirdCaster(classChoice, effectiveSubclass)) {
      return null;
    }
    const offSchool = thirdCasterPickRefusal({
      classId: classChoice,
      subclass: effectiveSubclass,
      level: classLevelAfter,
      known: knownList,
      picks: spellPicks,
      adding: name,
      schoolOf,
    });
    return offSchool ? { short: t("sessionUi.level.spell.school"), long: offSchool } : null;
  }
  // What can still be learned: the class list minus what is already held,
  // cantrips only while there is a cantrip to choose.
  const levelUpTiles: SpellTile[] = spellPool
    .filter((spell) => !alreadyKnown.has(spell.name.toLowerCase()))
    .filter((spell) => spell.level > 0 || Boolean(remainingCantrips))
    .map((spell) => {
      const picked =
        spell.level === 0 ? cantripPicks.includes(spell.name) : spellPicks.includes(spell.name);
      // Domain, oath and circle spells arrive on their own and cost nothing:
      // shown, locked, never a pick that eats the allowance.
      const granted = grantedFree.has(spell.name.toLowerCase());
      return {
        name: spell.name,
        level: spell.level,
        state: granted ? ("granted" as const) : picked ? ("ready" as const) : ("available" as const),
        note: granted ? t("sessionUi.level.spell.free") : picked ? t("sessionUi.level.spell.new") : undefined,
        blocked: granted || picked ? undefined : pickRefusal(spell.name, spell.level)?.short,
        data: spell.data,
        slug: spell.slug,
        homebrew: spell.source === "homebrew",
      };
    });

  function toggleSpell(name: string, level?: number) {
    if (level === 0) {
      setCantripPicks((current) =>
        current.includes(name) ? current.filter((pick) => pick !== name) : [...current, name],
      );
      return;
    }
    setSpellPicks((current) =>
      current.includes(name) ? current.filter((pick) => pick !== name) : [...current, name],
    );
  }

  // Only the choices go to the server; it builds the level from them and
  // from nothing else in the request.
  async function apply() {
    setBusy(true);
    setError("");
    try {
      const choices = asiChoices.filter((choice): choice is AsiChoice => choice !== null).map(settled);
      const response = await fetch(`/api/campaigns/${campaignId}/sheet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: targetLevel,
          levelUpClass: classChoice,
          ...(hpMethod === "rolled" ? { hpChoice } : {}),
          ...(skillPick ? { levelUpSkill: skillPick } : {}),
          ...(choices.length ? { asiChoices: choices } : {}),
          ...(Object.keys(featPicksSent).length ? { featChoices: featPicksSent } : {}),
          ...(needsSubclass && subclassChoice ? { subclass: subclassChoice } : {}),
          ...(expertisePicks.length ? { expertise: [...currentExpertise, ...expertisePicks] } : {}),
          ...(spellPicks.length || cantripPicks.length
            ? { levelUpSpells: [...spellPicks, ...cantripPicks] }
            : {}),
          ...(forgetPick ? { levelUpForget: forgetPick } : {}),
          ...(stylePicks.length || optionPicks.length
            ? {
                features: [
                  ...stylePicks.map((id) => ({
                    name: fightingStyleFeatureName(id),
                    source: "choice" as const,
                  })),
                  ...optionPicks.map((name) => ({ name, source: "choice" as const })),
                ],
              }
            : {}),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data?.error === "string" ? data.error : "The level-up was refused.");
        return;
      }
      setResult({
        hpGained: typeof data?.hpGained === "number" ? data.hpGained : 0,
        rolled: typeof data?.rolled?.hp === "number" ? data.rolled.hp : null,
        die: hitDie,
        classLine: isMulticlassPath ? ` (${chosenKlass?.name ?? classChoice} ${classLevelAfter})` : "",
      });
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  // The server takes a level with any of these picks left open (they stay
  // open for a later level), so the dialog does not hold the level back for
  // them; it only says so.
  const stepOpen =
    step === "class"
      ? needsSkillPick && !skillPick
      : step === "asi"
        ? asiLevels.some((_, index) => !asiChoices[index]) || featPicksOpen
        : step === "expertise"
          ? expertisePicks.length < Math.min(expertiseToPick, expertiseOptions.length)
          : step === "style"
            ? stylePicks.length < Math.min(stylesToPick, styleOptions.length)
            : step === "subclass"
              ? !subclassChoice && subclassOptions.length > 0
              : step === "options"
                ? openSlots.some((slot) => slot.remaining > 0)
                : false;
  const stepReady = Boolean(classChoice);

  function nextOrApply() {
    if (lastStep) {
      void apply();
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  // Why this character cannot take a level now, in the rules' words.
  const reachedLevel = levelForXp(sheet.xp);
  const blocked = sheet.deathSaves?.dead
    ? `${sheet.name} is dead, and the dead gain no levels.`
    : sheet.currentHp <= 0
      ? `${sheet.name} is at 0 hit points. A character levels up once they are back on their feet.`
      : startLevel >= 20
        ? "No character passes level 20."
        : reachedLevel < targetLevel
          ? `Level ${targetLevel} takes ${XP_THRESHOLDS[targetLevel - 1]} experience points and ${sheet.name} has ${sheet.xp}. A level is earned in play, or granted by whoever runs the table.`
          : "";

  const wideStep = step !== "hp" && !blocked && !result;

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onDone()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 panel ornate rounded-xl border-amber-500/40 p-6",
            wideStep
              ? "max-h-[85vh] w-[min(92vw,32rem)] overflow-y-auto"
              : "w-[min(92vw,26rem)]",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 font-display text-lg tracking-wide text-amber-100">
              <Sparkles className="size-5 text-amber-200" />
              {locale === "en" ? <>Level {targetLevel}!</> : t("sessionUi.level.title", { level: targetLevel })}
            </Dialog.Title>
            <Dialog.Close className="rounded p-1 text-stone-400 hover:bg-stone-900">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {result ? (
            <div className="reveal space-y-4 text-sm" role="status">
              <p className="text-stone-300">
                {locale === "en" ? <>{sheet.name} is level {targetLevel}
                {result.classLine}.</> : t("sessionUi.level.atLevel", { name: sheet.name, level: targetLevel, classLine: levelUpClassLine(result.classLine, locale) })}
              </p>
              <div className="flex items-center justify-between rounded-md border border-amber-900/50 bg-stone-950/60 px-4 py-3">
                <span className="flex items-center gap-2 text-stone-300">
                  {result.rolled !== null ? <Dices className="size-4 text-amber-300" /> : null}
                  {result.rolled !== null
                    ? t("sessionUi.level.rollResult", { roll: result.rolled, die: result.die })
                    : hpMethod === "max"
                      ? t("sessionUi.level.maxResult", { die: result.die })
                      : t("sessionUi.level.averageResult", { die: result.die, average: fixedDieValue(result.die) })}
                </span>
                <span className="motion-pop font-mono text-lg text-amber-300">{t("sessionUi.level.hpGain", { amount: result.hpGained })}</span>
              </div>
              {reachedLevel > targetLevel && targetLevel < 20 ? (
                <p className="text-xs text-stone-400">
                  {locale === "en" ? <>The experience already earns level {targetLevel + 1} too; take it next, one level at a time.</> : t("sessionUi.level.nextEarned", { level: targetLevel + 1 })}
                </p>
              ) : null}
              <button
                type="button"
                onClick={onDone}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-2.5 text-sm font-medium text-stone-950 hover:bg-amber-100"
              >
                {t("sessionUi.level.done")}
              </button>
            </div>
          ) : blocked ? (
            <div className="reveal space-y-4 text-sm">
              <p role="alert" className="text-stone-300">
                {levelUpNotice(blocked, locale)}
              </p>
              <button
                type="button"
                onClick={onDone}
                className="w-full rounded-md border border-stone-700 px-4 py-2.5 text-sm text-stone-300 hover:bg-stone-900"
              >
                {t("sessionUi.level.close")}
              </button>
            </div>
          ) : (
            // Keyed by the step, so each step arrives with the kit's fade-up
            // instead of its content swapping in place.
            <div key={step} className="reveal space-y-4 text-sm">
              {step === "hp" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>{sheet.name} advances to level {targetLevel}
                    {isMulticlassPath
                      ? ` as a ${chosenKlass?.name ?? classChoice} (${chosenKlass?.name ?? classChoice} level ${classLevelAfter})`
                      : ""}
                    .</> : t("sessionUi.level.advance", { name: sheet.name, level: targetLevel, classLine: isMulticlassPath ? t("sessionUi.level.advanceClass", { class: characterLabel("class", chosenKlass?.name ?? classChoice, locale), level: classLevelAfter }) : "" })}
                  </p>
                  {newFeatureNames.length ? (
                    <div className="reveal rounded-md border border-amber-900/50 bg-stone-950/60 px-3 py-2">
                      <p className="mb-1 text-xs text-amber-200">{locale === "en" ? <>New at level {targetLevel}:</> : t("sessionUi.level.newFeatures", { level: targetLevel })}</p>
                      <InfoChipList
                        items={newFeatureNames.map((name) => ({
                          id: name,
                          name: classOptionFeatureName(sheetFeatureChoice(name, locale), locale),
                          text: classOptionHelp(name, describeFeature(classChoice, effectiveSubclass, name), locale),
                        }))}
                      />
                    </div>
                  ) : null}
                  {hpMethod === "rolled" ? (
                    <>
                      <p className="text-stone-300">
                        {locale === "en" ? <>Hit points: this table rolls them. The server rolls the d{hitDie} when you
                        confirm{conMod ? `, and adds ${conMod > 0 ? "+" : ""}${conMod} for Constitution` : ""}; every level adds at least 1.</> : t("sessionUi.level.rollHelp", { die: hitDie, constitution: conMod ? t("sessionUi.level.conAdd", { modifier: `${conMod > 0 ? "+" : ""}${conMod}` }) : "" })}
                      </p>
                      <div className="stagger space-y-1.5" role="radiogroup" aria-label={t("sessionUi.level.hp")}>
                        {(
                          [
                            ["roll", t("sessionUi.level.rollChoice", { die: hitDie }), t("sessionUi.level.range", { min: hpPreview.min, max: hpPreview.max })],
                            ["average", t("sessionUi.level.averageChoice"), t("sessionUi.level.hpGain", { amount: fixedGain })],
                          ] as const
                        ).map(([value, label, note]) => (
                          <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={hpChoice === value}
                            onClick={() => setHpChoice(value)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md border px-4 py-2.5 text-sm",
                              hpChoice === value
                                ? "border-amber-600 bg-stone-900 text-amber-100"
                                : "border-stone-700 hover:border-amber-700 hover:bg-stone-900",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {value === "roll" ? <Dices className="size-4" /> : null}
                              {label}
                            </span>
                            <span className="font-mono text-amber-400">{note}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between rounded-md border border-stone-700 px-4 py-2.5">
                      <span className="text-stone-300">
                        {hpMethod === "max"
                          ? t("sessionUi.level.maxHelp", { die: hitDie })
                          : t("sessionUi.level.averageHelp", { die: hitDie, average: fixedDieValue(hitDie) })}
                        {conMod ? t("sessionUi.level.conFixed", { modifier: `${conMod > 0 ? "+" : ""}${conMod}` }) : ""}
                      </span>
                      <span className="font-mono text-amber-400">{t("sessionUi.level.hpGain", { amount: fixedGain })}</span>
                    </div>
                  )}
                  {hpPreview.extras.length || after.primalChampion ? (
                    // What rides on top of the die, each counted in the
                    // numbers above as the server counts it.
                    <ul className="stagger space-y-0.5 text-xs text-stone-400" aria-label={t("sessionUi.level.also")}>
                      {hpPreview.extras.map((line) => (
                        <li key={line}>{levelUpNotice(line, locale)}</li>
                      ))}
                      {after.primalChampion ? (
                        <li className="text-amber-200">{t("sessionUi.level.primal")}</li>
                      ) : null}
                    </ul>
                  ) : null}
                </>
              ) : null}
              {step === "class" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>Which class takes level {targetLevel}? Advance one {sheet.name} already has,
                    or multiclass into a new one.</> : t("sessionUi.level.chooseClass", { level: targetLevel, name: sheet.name })}
                  </p>
                  <div className="stagger space-y-1.5">
                    {classList.map((entry) => {
                      const held = findClass(entry.id);
                      const picked = classChoice.toLowerCase() === entry.id.toLowerCase();
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => {
                            if (!picked) {
                              setClassChoice(entry.id);
                              resetClassPicks();
                            }
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm",
                            picked
                              ? "border-amber-600 bg-stone-900 text-amber-100"
                              : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                          )}
                        >
                          <span>
                            {characterLabel("class", held?.name ?? entry.id, locale)}
                            {entry.subclass ? (
                              <span className="text-xs text-stone-500"> · {subclassLabel(entry.id, entry.subclass, locale)}</span>
                            ) : null}
                          </span>
                          <span className="font-mono text-xs text-amber-400">
                            {entry.level} → {entry.level + levelsGained}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {newClassOptions.length ? (
                    <>
                      <p className="text-xs uppercase tracking-wide text-amber-200/80">
                        {t("sessionUi.level.multiclass")}
                      </p>
                      <p className="text-xs text-stone-500">
                        {locale === "en" ? <>A new class starts at level 1 with SOME of its training: no saving
                        throws, and only the proficiencies the multiclass rules grant.</> : t("sessionUi.level.multiclassHelp")}
                      </p>
                      <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                        {newClassOptions.map(({ option, check }) => {
                          const picked = classChoice.toLowerCase() === option.id.toLowerCase();
                          return (
                            <button
                              key={option.id}
                              type="button"
                              disabled={!check.ok}
                              onClick={() => {
                                if (!picked) {
                                  setClassChoice(option.id);
                                  resetClassPicks();
                                }
                              }}
                              className={cn(
                                "block w-full rounded-lg border px-3 py-2 text-left",
                                picked
                                  ? "border-amber-600 bg-stone-900 text-amber-100"
                                  : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                                !check.ok && "cursor-not-allowed opacity-50 hover:border-stone-700 hover:bg-transparent",
                              )}
                            >
                              <span className="flex items-center justify-between text-sm">
                                <span>{characterLabel("class", option.name, locale)}</span>
                                <span className="text-xs text-stone-500">d{option.hitDie}</span>
                              </span>
                              <span className="block text-xs text-stone-400">
                                {check.ok
                                  ? t("sessionUi.level.grants", { grants: levelUpGrants(multiclassGrantsFor(option.id), locale) })
                                  : levelUpNotice(check.error ?? "", locale)}
                              </span>
                              <span className="block text-[11px] text-stone-600">
                                {locale === "en" ? <>Requires {describePrereq(option.id)}</> : t("sessionUi.level.requires", { requirements: levelUpPrerequisite(option.id, locale) })}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                  {needsSkillPick ? (
                    <>
                      <p className="text-stone-300">
                        {locale === "en" ? <>{chosenKlass?.name ?? classChoice} grants one new skill. Pick it:</> : t("sessionUi.level.skill", { class: characterLabel("class", chosenKlass?.name ?? classChoice, locale) })}
                      </p>
                      <div className="stagger-pop flex flex-wrap gap-1.5">
                        {skillOptions.map((skillId) => {
                          const picked = skillPick === skillId;
                          const name = isThievesTools(skillId) ? trainingLabel("tool", skillId, locale) : skillLabel(skillId, locale);
                          return (
                            <span
                              key={skillId}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm",
                                picked
                                  ? "border-amber-600 bg-stone-900 text-amber-100"
                                  : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                              )}
                            >
                              <button
                                type="button"
                                aria-pressed={picked}
                                onClick={() => setSkillPick(picked ? "" : skillId)}
                              >
                                {referenceDisplayName("spell", name, locale)}
                              </button>
                              <InfoButton label={name} text={skillHelpText(skillId, locale)} />
                            </span>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}

              {step === "asi" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>{sheet.name} is owed
                    {asiLevels.length === 1 ? " an ability score improvement" : ` ${asiLevels.length} ability score improvements`}
                    {" "}by {klass?.name ?? classChoice} level {classLevelAfter}: two points, or a feat, each.</> : t(asiLevels.length === 1 ? "sessionUi.level.asiOne" : "sessionUi.level.asiMany", { name: sheet.name, class: characterLabel("class", klass?.name ?? classChoice, locale), level: classLevelAfter, count: asiLevels.length })}
                  </p>
                  <AsiFeatEditor
                    slotLevels={asiLevels}
                    baseScores={sheet.abilities}
                    choices={asiLevels.map((_, index) => asiChoices[index] ?? null)}
                    onChange={setAsiChoices}
                    featSpecOf={featSpecOf}
                    featDescOf={featDescOf}
                    featChoices={featChoices}
                    onFeatPicks={setFeatPicks}
                    known={{
                      armor: sheet.proficiencies.armor,
                      languages: sheet.proficiencies.languages,
                      skills: sheet.proficiencies.skills,
                      expertise: sheet.proficiencies.expertise ?? [],
                      weapons: sheet.proficiencies.weapons,
                      tools: sheet.proficiencies.tools,
                    }}
                  />
                </>
              ) : null}

              {step === "expertise" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>Expertise: pick {Math.min(expertiseToPick, expertiseOptions.length)} of{" "}
                    {sheet.name}&apos;s proficient skills to DOUBLE their proficiency bonus in:</> : t("sessionUi.level.expertise", { count: Math.min(expertiseToPick, expertiseOptions.length), name: sheet.name })}
                  </p>
                  <div className="stagger-pop flex flex-wrap gap-1.5">
                    {expertiseOptions.map((skillId) => {
                      const picked = expertisePicks.includes(skillId);
                      const name = isThievesTools(skillId) ? trainingLabel("tool", skillId, locale) : skillLabel(skillId, locale);
                      return (
                        <span
                          key={skillId}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm",
                            picked
                              ? "border-amber-600 bg-stone-900 text-amber-100"
                              : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                          )}
                        >
                          <button
                            type="button"
                            aria-pressed={picked}
                            onClick={() =>
                              setExpertisePicks((current) =>
                                picked
                                  ? current.filter((entry) => entry !== skillId)
                                  : current.length < expertiseToPick
                                    ? [...current, skillId]
                                    : current,
                              )
                            }
                          >
                            {name}
                          </button>
                          <InfoButton label={name} text={skillHelpText(skillId, locale)} />
                        </span>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {step === "options" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>New abilities for {sheet.name} to choose. These are real powers, not flavour,
                    so read them before picking.</> : t("sessionUi.level.options", { name: sheet.name })}
                  </p>
                  {openSlots
                    .filter((slot) => slot.remaining > 0 || slot.chosen.length > 0)
                    .map((slot) => (
                      <div key={slot.kind}>
                        <p className="mb-1 mt-2 text-xs uppercase tracking-wide text-amber-200/80">
                          {locale === "en" ? <>{slot.label}: {slot.chosen.length}/{slot.total} chosen</> : t("sessionUi.level.chosen", { label: builderTermLabel("optionCategory", slot.label, locale), chosen: slot.chosen.length, total: slot.total })}
                        </p>
                        <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
                          {slot.options.map((option) => {
                            const view = classOptionView(option, locale);
                            const picked = slot.chosen.some(
                              (name) => name.toLowerCase() === option.n.toLowerCase(),
                            );
                            const already =
                              picked &&
                              !optionPicks.includes(optionFeatureName(slot.kind, option.n));
                            return (
                              <div
                                key={option.n}
                                className={cn(
                                  "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
                                  picked
                                    ? "border-amber-600 bg-stone-900 text-amber-100"
                                    : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                                  already && "opacity-60",
                                )}
                              >
                                <button
                                  type="button"
                                  disabled={already}
                                  onClick={() => toggleOption(slot, option.n)}
                                  className="grow text-left"
                                >
                                  <span className="block">{view.name}</span>
                                  <span className="block text-[11px] text-stone-500">
                                    {already ? t("sessionUi.level.already") : ""}
                                    {option.req ? t("sessionUi.level.optionReq", { requirements: view.requirement ?? option.req }) : ""}
                                    {view.description}
                                  </span>
                                </button>
                                <InfoButton
                                  label={view.name}
                                  meta={option.req ? t("sessionUi.level.requires", { requirements: view.requirement ?? option.req }) : undefined}
                                  text={view.description}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </>
              ) : null}

              {step === "style" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>Fighting Style: pick {stylesToPick} for {sheet.name}. The server applies it
                    to every attack from here on.</> : t("sessionUi.level.style", { count: stylesToPick, name: sheet.name })}
                  </p>
                  <div className="stagger space-y-1.5">
                    {styleOptions.map((style) => {
                      const picked = stylePicks.includes(style.id);
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() =>
                            setStylePicks((current) =>
                              picked
                                ? current.filter((entry) => entry !== style.id)
                                : current.length < stylesToPick
                                  ? [...current, style.id]
                                  : current,
                            )
                          }
                          className={cn(
                            "block w-full rounded-lg border px-3 py-2 text-left",
                            picked
                              ? "border-amber-600 bg-stone-900 text-amber-100"
                              : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                          )}
                        >
                          <span className="block text-sm">{builderTermLabel("fightingStyle", style.name, locale)}</span>
                          <span className="block text-xs text-stone-400">{fightingStyleDescription(style, locale)}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {step === "subclass" ? (
                <>
                  <p className="text-stone-300">
                    {locale === "en" ? <>At level {subclassLevel}, every {klass?.name ?? sheet.class} chooses a
                    specialization. Pick one for {sheet.name}:</> : t("sessionUi.level.subclass", { level: subclassLevel ?? 0, class: characterLabel("class", klass?.name ?? sheet.class, locale), name: sheet.name })}
                  </p>
                  <p className="text-xs text-stone-500">
                    {locale === "en" ? <>This choice shapes how {sheet.name} plays for the rest of the campaign. Read
                    each one before deciding.</> : t("sessionUi.level.subclassHelp", { name: sheet.name })}
                  </p>
                  <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                    {subclassOptions.map((name) => {
                      const archetype = archetypes.find(
                        (entry) => entry.name.toLowerCase() === name.toLowerCase(),
                      );
                      return (
                        <div
                          key={name}
                          className={cn(
                            "flex items-center gap-2 rounded-md border px-2 text-sm",
                            subclassChoice === name
                              ? "border-amber-600 bg-stone-900 text-amber-100"
                              : "border-stone-700 hover:border-amber-800 hover:bg-stone-900",
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => chooseSubclass(name)}
                            className="flex grow items-center justify-between gap-2 py-2 text-left"
                          >
                            <span>{subclassLabel(classChoice, name, locale)}</span>
                            {builtInSubclasses.some(
                              (entry) => entry.toLowerCase() === name.toLowerCase(),
                            ) ? (
                              <span className="text-xs text-stone-500">{t("sessionUi.level.full")}</span>
                            ) : (
                              <span className="text-xs text-stone-600">{t("sessionUi.level.prose")}</span>
                            )}
                          </button>
                          <InfoButton
                            label={subclassLabel(classChoice, name, locale)}
                            text={subclassHelpText(classChoice, name, locale, archetype?.desc) || undefined}
                            reference={
                              archetype ? { kind: "archetypes", slug: archetype.id, name } : undefined
                            }
                          />
                        </div>
                      );
                    })}
                    {!subclassOptions.length ? (
                      <p className="reveal text-xs text-stone-500">
                        {locale === "en" ? <>No known specializations for this class; the party lead can set one on
                        the sheet later.</> : t("sessionUi.level.noSubclass")}
                      </p>
                    ) : null}
                  </div>
                </>
              ) : null}

              {step === "spells" ? (
                <>
                  <p className="text-stone-300">{locale === "en" ? <>New spells for {sheet.name} at level {classLevelAfter}:</> : t("sessionUi.level.newSpells", { name: sheet.name, level: classLevelAfter })}</p>
                  <ul className="space-y-1 text-xs text-stone-400">
                    {remainingCantrips ? (
                      <li>
                        <span className="text-amber-200">{locale === "en" ? <>Cantrips: choose {remainingCantrips}.</> : t("sessionUi.level.cantrips", { count: remainingCantrips })}</span>{" "}
                        {t("sessionUi.level.cantripHelp")}
                      </li>
                    ) : null}
                    {remainingPicks ? (
                      <li>
                        {bookGain !== null ? (
                          <>
                            <span className="text-amber-200">{locale === "en" ? <>Spellbook: write {remainingPicks} new spells.</> : t("sessionUi.level.book", { count: remainingPicks })}</span>{" "}
                            {locale === "en" ? <>They are prepared right away while your limit has room; the rest you
                            prepare from your sheet, ready after a long rest.</> : t("sessionUi.level.bookHelp")}
                          </>
                        ) : levelStyle === "known" ? (
                          <>
                            <span className="text-amber-200">{locale === "en" ? <>Spells known: choose up to {remainingPicks}.</> : t("sessionUi.level.known", { count: remainingPicks })}</span>{" "}
                            {t("sessionUi.level.knownHelp")}
                          </>
                        ) : (
                          <>
                            <span className="text-amber-200">{locale === "en" ? <>Prepared spells: prepare up to {remainingPicks} more.</> : t("sessionUi.level.prepared", { count: remainingPicks })}</span>{" "}
                            {t("sessionUi.level.preparedHelp")}
                          </>
                        )}
                      </li>
                    ) : null}
                    {!remainingCantrips && !remainingPicks ? (
                      <li>{t("sessionUi.level.noPicks")}</li>
                    ) : null}
                  </ul>
                  {levelStyle === "known" && !isNewClass && knownList.length ? (
                    <div className="reveal">
                      <p className="mb-1 text-xs text-stone-400">
                        {t("sessionUi.level.swap")}
                      </p>
                      <div className="stagger-pop flex flex-wrap gap-1.5">
                        {knownList
                          .filter((name) => !grantedFree.has(name.toLowerCase()))
                          .map((name) => {
                            const picked = forgetPick === name;
                            return (
                              <button
                                key={name}
                                type="button"
                                aria-pressed={picked}
                                onClick={() => {
                                  setSpellNote("");
                                  // Giving the swap back takes back the room it made.
                                  if (picked && remainingPicks !== null && spellPicks.length >= remainingPicks) {
                                    setSpellPicks((current) => current.slice(0, -1));
                                  }
                                  setForgetPick(picked ? "" : name);
                                }}
                                className={cn(
                                  "rounded-full border px-3 py-1 text-xs",
                                  picked
                                    ? "border-red-700 bg-red-950/40 text-red-200 line-through"
                                    : "border-stone-700 text-stone-300 hover:border-amber-800 hover:bg-stone-900",
                                )}
                              >
                                {referenceDisplayName("spell", name, locale)}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ) : null}
                  <SpellBook
                    tiles={levelUpTiles}
                    maxLevel={maxCastable ?? 0}
                    counters={[
                      ...(remainingCantrips
                        ? [{ label: t("sessionUi.level.counter.cantrips"), value: cantripPicks.length, max: remainingCantrips }]
                        : []),
                      ...(remainingPicks !== 0
                        ? [
                            {
                              label: bookGain !== null ? t("sessionUi.level.counter.book") : levelStyle === "known" ? t("sessionUi.level.counter.known") : t("sessionUi.level.counter.prepared"),
                              value: spellPicks.length,
                              max: remainingPicks,
                            },
                          ]
                        : []),
                    ]}
                    onTile={(tile) => {
                      setSpellNote("");
                      const picked =
                        tile.level === 0 ? cantripPicks.includes(tile.name) : spellPicks.includes(tile.name);
                      const refusal = picked ? null : pickRefusal(tile.name, tile.level);
                      if (refusal) {
                        setSpellNote(refusal.long);
                        return;
                      }
                      toggleSpell(tile.name, tile.level ?? undefined);
                    }}
                    notice={spellNote ? levelUpNotice(spellNote, locale) : undefined}
                    emptyText={poolLoading ? t("sessionUi.level.loading") : t("sessionUi.level.noSpells")}
                  />
                  {spellPicks.length || cantripPicks.length ? (
                    <p className="reveal text-xs text-stone-400">
                      {t("sessionUi.level.learning")}{locale === "en" ? " " : ""}
                      <span className="text-amber-200">
                        {[...cantripPicks.map((name) => t("sessionUi.level.learningCantrip", { name: referenceDisplayName("spell", name, locale) })), ...spellPicks.map(name => referenceDisplayName("spell", name, locale))].join(t("sessionUi.level.list"))}
                      </span>
                    </p>
                  ) : null}
                </>
              ) : null}

              {stepOpen ? (
                <p className="reveal text-xs text-stone-500">
                  {locale === "en" ? <>You can leave this open and take the level now; it stays open for a later level.</> : t("sessionUi.level.open")}
                </p>
              ) : null}
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busy || stepIndex === 0} aria-busy={busy}
                  onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
                  className="rounded-md border border-stone-700 px-4 py-2.5 text-sm text-stone-300 hover:bg-stone-900 disabled:opacity-50"
                >
                  {t("sessionUi.level.back")}
                </button>
                <button
                  type="button"
                  disabled={busy || !stepReady}
                  onClick={nextOrApply}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-2.5 text-sm font-medium text-stone-950 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : lastStep ? (
                    t("sessionUi.level.confirm")
                  ) : (
                    t("sessionUi.level.next")
                  )}
                </button>
              </div>
            </div>
          )}
          {error ? (
            <p role="alert" className="motion-shake mt-3 text-sm text-red-400">
              {levelUpNotice(error, locale)}
            </p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
