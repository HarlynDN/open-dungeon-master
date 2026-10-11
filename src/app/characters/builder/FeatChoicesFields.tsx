"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { abilityLabel, skillLabel, characterLabel } from "@/lib/i18n/character-presentations";
import { featTermLabel } from "@/lib/i18n/feat-presentations";
import { trainingLabel } from "@/lib/i18n/training-presentations";
import { referenceDisplayName } from "@/lib/i18n/references";
import { gearNote } from "@/lib/i18n/gear-ui-presentations";
import { featEngineLabel, featChoiceSpellLabel } from "@/lib/i18n/feat-choice-presentations";
import { skillHelpText } from "@/lib/i18n/game-help-presentations";

import { Select } from "@/components/ui/Select";
import { STANDARD_LANGUAGES } from "@/lib/content/mechanics";

import { SRD_SKILLS } from "@/lib/srd";
import { KNOWN_TOOLS, anyPicksMade, pickSlots, type FeatGrantSpec, type FeatPicks, type PickKind } from "@/lib/srd/feat-grants";
import { featEngineTag } from "@/lib/srd/feat-combat";
import { featAbilityIncrease } from "@/lib/srd/feat-effects";
import { featSpellsAnything, type CastingAbility } from "@/lib/srd/feat-spells";
import { SRD_WEAPONS } from "@/lib/srd/weapons";
import ContentPicker from "./ContentPicker";
import { PickPill } from "./steps/shared";

// What the character already has, so a feat's pick is never one of them.
export type KnownTraining = {
  languages: string[];
  skills: string[];
  expertise: string[];
  weapons: string[];
  tools: string[];
  armor: string[];
};

const lower = (value: string) => value.trim().toLowerCase();

// The builder's training as it stands, for the pickers, known on every
// step (useBuilderDerived's `training` needs no ability score).
export function knownTraining(derived: {
  training: { languages: string[]; skills: string[]; expertise?: string[]; weapons: string[]; tools: string[]; armor?: string[] };
}): KnownTraining {
  const { training } = derived;
  return {
    languages: training.languages,
    skills: training.skills,
    expertise: training.expertise ?? [],
    weapons: training.weapons,
    tools: training.tools,
    armor: training.armor ?? [],
  };
}
// Each word's first letter up ("thieves' tools" to "Thieves' Tools"), the
// letter after a possessive left alone ("Alchemist's Supplies").
const capital = (value: string) => value.replace(/(^|\s)([a-z])/g, (_, before, letter) => `${before}${letter.toUpperCase()}`);
const skillName = (skillId: string) => SRD_SKILLS.find((skill) => skill.id === skillId)?.name ?? skillId;

// The picks a feat leaves to the player, beside the feat (issue #125):
// Linguist's three languages, Skill Expert's skill and the expertise on it,
// Weapon Master's four weapons, a pack feat's tool; a count shared between
// kinds (Skilled's three skills or tools) shrinks each kind's slots as the
// others fill (issue #147). Each list offers only what the character does
// not already have, less this feat's own picks, which stay offered so they
// can be changed. What the feat hands over outright is said under them.
export default function FeatChoicesFields({
  feat,
  spec,
  picks,
  known,
  onChange,
  desc,
}: {
  feat: string;
  spec: FeatGrantSpec;
  picks: FeatPicks | undefined;
  known: KnownTraining;
  onChange: (picks: FeatPicks) => void;
  // The feat's text, for the ability point it names (what the table applies).
  desc?: string;
}) {
  const { locale, t } = useLocale();
  const featName = featTermLabel("feat", feat, locale);
  const skillDisplay = (id: string) => locale === "en" ? skillName(id) : skillLabel(id, locale);
  const armorDisplay = (value: string) => {
    const name = value === "shields" ? "shields" : `${value} armor`;
    return locale === "en" ? name : featTermLabel("armorTraining", name, locale);
  };
  const listSeparator = t("callingUi.featChoice.listSeparator");
  const choiceKind = (kind: PickKind) => t(`callingUi.featChoice.category.${kind}`);
  const mine = {
    languages: picks?.languages ?? [],
    skills: picks?.skills ?? [],
    expertise: picks?.expertise ?? [],
    weapons: picks?.weapons ?? [],
    tools: picks?.tools ?? [],
    armor: picks?.armor ?? [],
  };
  // How many of a kind this feat lets the player name right now: its own
  // count plus what is left of the shared one.
  const slots = (kind: PickKind) => pickSlots(spec, picks, kind);
  const sharedLeft = spec.any - anyPicksMade(spec, picks);
  // Held by someone other than this feat.
  const heldBy = (kind: keyof KnownTraining) => {
    const own = new Set(mine[kind].map(lower));
    return new Set(known[kind].map(lower).filter((entry) => !own.has(entry)));
  };
  const set = (kind: keyof KnownTraining, index: number, value: string) => {
    const next = [...(mine[kind] ?? [])];
    while (next.length < index) {
      next.push("");
    }
    next[index] = value;
    onChange({ ...picks, [kind]: next });
  };
  const toggle = (kind: "skills" | "expertise", value: string, limit: number) => {
    const current = mine[kind];
    const next = current.includes(value)
      ? current.filter((entry) => entry !== value)
      : current.length < limit
        ? [...current, value]
        : current;
    onChange({ ...picks, [kind]: next });
  };
  const heldLanguages = heldBy("languages");
  const heldSkills = heldBy("skills");
  const heldExpertise = heldBy("expertise");
  const heldWeapons = heldBy("weapons");
  const heldTools = heldBy("tools");
  const heldArmor = heldBy("armor");
  // The feat's expertise goes on a skill the character has, the feat's own
  // skill included.
  const expertiseFrom = [...new Set([...known.skills, ...mine.skills])].filter((skill) => !heldExpertise.has(lower(skill)));
  const hasPicks = spec.languages + spec.skills + spec.expertise + spec.weapons + spec.tools + spec.any + spec.damageTypes.length > 0;
  const fixed = [
    ...spec.fixedSkills.map(skillDisplay),
    ...spec.fixedLanguages.map(language => trainingLabel("language", language, locale)),
    ...spec.armor.map(armorDisplay),
    ...spec.fixedWeapons.map(weapon => referenceDisplayName("equipment", weapon, locale)),
    ...spec.fixedTools.map(tool => trainingLabel("tool", tool, locale)),
  ];
  const taught = spec.taught;
  const teaches = featSpellsAnything(taught) && taught.cantrips + taught.spells > 0;
  // What the table applies of this feat, in a sentence, so a player never
  // assumes the rest is on the sheet (issue #147): the ability point, the
  // training and spells read from its text, and the combat rules the
  // engines run; the DM runs whatever is left from the feat's text.
  const increase = desc !== undefined ? featAbilityIncrease(feat, desc) : null;
  const engineTag = featEngineTag(feat);
  const applied = [
    ...(increase ? [increase.from.length === 6 ? t("callingUi.featChoice.increaseAny") : t("callingUi.featChoice.increase", { abilities: increase.from.map(ability => abilityLabel(ability, locale)).join(t("callingUi.featChoice.or")) })] : []),
    ...(spec.languages + spec.fixedLanguages.length ? [t("callingUi.featChoice.category.languages")] : []),
    ...(spec.skills + spec.fixedSkills.length ? [t("callingUi.featChoice.category.skills")] : []),
    ...(spec.expertise ? [t("callingUi.featChoice.category.expertise")] : []),
    ...(spec.armor.length + spec.armorFrom.length ? [t("callingUi.featChoice.applied.armor")] : []),
    ...(spec.weapons + spec.fixedWeapons.length + spec.weaponsFrom.length ? [t("callingUi.featChoice.applied.weapons")] : []),
    ...(spec.tools + spec.fixedTools.length ? [t("callingUi.featChoice.applied.tools")] : []),
    ...(spec.any ? [t("callingUi.featChoice.applied.any", { count: spec.any })] : []),
    ...(teaches || taught.fixedSpells.length || taught.fixedCantrips.length ? [t("callingUi.featChoice.applied.spells")] : []),
    ...(spec.damageTypes.length ? [t("callingUi.featChoice.applied.damage")] : []),
    ...(engineTag ? [t("callingUi.featChoice.applied.combat", { tag: featEngineLabel(engineTag, locale) })] : []),
  ];
  const coverage = applied.length
    ? t("callingUi.featChoice.coverage", { applied: applied.join(listSeparator) })
    : t("callingUi.featChoice.noCoverage");
  if (!hasPicks && !teaches && !fixed.length) {
    return (
      <p className="mt-1 text-[11px] text-stone-500" data-feat-coverage={feat}>
        {coverage}
      </p>
    );
  }
  // A shared pick ("three skills or tools") names no tool list: every tool
  // the table knows is offered, as the server allows.
  const toolsOffered = spec.toolsFrom.length ? spec.toolsFrom : KNOWN_TOOLS;
  const weaponsOffered = spec.weaponsFrom.length
    ? SRD_WEAPONS.filter((weapon) => spec.weaponsFrom.some((offered) => lower(offered) === lower(weapon.name)))
    : SRD_WEAPONS;
  // The spells the feat teaches (src/lib/srd/feat-spells.ts): the class
  // list and casting ability where the feat leaves them open, then one
  // search per cantrip and per spell, held to the feat's level, school and
  // list by the content API's filters.
  const spellPicks = { cantrips: picks?.cantrips ?? [], spells: picks?.spells ?? [] };
  const listPicked = (picks?.list ?? "").trim().toLowerCase();
  const listParam = taught.listChoice ? listPicked : taught.lists.length === 1 ? taught.lists[0] : "";
  const needsList = taught.listChoice && !listPicked;
  const setSpell = (kind: "cantrips" | "spells", index: number, value: string) => {
    const next = [...spellPicks[kind]];
    while (next.length < index) {
      next.push("");
    }
    next[index] = value;
    onChange({ ...picks, [kind]: next.filter((entry, at) => entry || at < index) });
  };
  const spellSlots = (kind: "cantrips" | "spells", count: number, level: number) =>
    Array.from({ length: count }, (_, index) => {
      const chosen = spellPicks[kind][index] ?? "";
      const label = featChoiceSpellLabel(feat, taught, kind, level, index + 1, locale);
      return (
        <div key={`${kind}-${index}`} data-feat-spell={`${feat}:${kind}:${index + 1}`}>
          <span className="mb-1 block text-[11px] text-stone-400">{label}</span>
          {chosen ? (
            <div className="flex items-center gap-2">
              <PickPill label={locale === "en" ? chosen : referenceDisplayName("spell", chosen, locale)} selected onClick={() => setSpell(kind, index, "")}>
                {locale === "en" ? capital(chosen) : referenceDisplayName("spell", chosen, locale)}
              </PickPill>
              <span className="text-[11px] text-stone-500">{t("callingUi.featChoice.change")}</span>
            </div>
          ) : needsList ? (
            <span className="text-xs text-stone-500">{t("callingUi.featChoice.pickList")}</span>
          ) : (
            <ContentPicker
              kind="spells"
              extraParams={{
                level: String(level),
                exact: "1",
                ...(listParam ? { class: listParam } : {}),
                ...(taught.schools.length ? { school: taught.schools.join(",") } : {}),
                ...(kind === "cantrips" && taught.attackCantrip ? { attack: "1" } : {}),
              }}
              placeholder={t(kind === "cantrips" ? "callingUi.featChoice.searchCantrips" : "callingUi.featChoice.searchSpells")}
              onPick={(entry) => setSpell(kind, index, entry.name)}
            />
          )}
        </div>
      );
    });
  return (
    <div className="mt-2 space-y-2 rounded-lg border border-amber-900/40 bg-amber-950/10 p-2.5" data-feat-choices={feat}>
      <p className="text-xs text-amber-200/90">{t("callingUi.featChoice.choices", { feat: featName })}</p>
      {spec.any > 0 ? (
        <p className="text-[11px] text-stone-400" data-feat-shared={feat}>
          {t("callingUi.featChoice.shared", { count: spec.any, kinds: spec.anyKinds.map(choiceKind).join(listSeparator) })}
          {sharedLeft > 0 ? <span className="text-amber-300">{t("callingUi.featChoice.left", { count: sharedLeft })}</span> : null}
        </p>
      ) : null}
      {slots("languages") > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: slots("languages") }, (_, index) => (
            <Select<string>
              key={index}
              value={mine.languages[index] ?? ""}
              onChange={(picked) => set("languages", index, picked)}
              className="w-full"
              label={t("callingUi.featChoice.label.language", { feat: featName, index: index + 1 })}
              placeholder={t("callingUi.featChoice.choose.language")}
              options={[
                { value: "", label: t("callingUi.featChoice.choose.language") },
                ...STANDARD_LANGUAGES.filter(
                  (language) =>
                    !heldLanguages.has(lower(language)) &&
                    (mine.languages[index] === language || !mine.languages.includes(language)),
                ).map((language) => ({ value: language as string, label: trainingLabel("language", language, locale) })),
              ]}
            />
          ))}
        </div>
      ) : null}
      {slots("skills") > 0 ? (
        <div>
          <span className="mb-1 block text-[11px] text-stone-400">
            {t("callingUi.featChoice.skill", { limit: spec.anyKinds.includes("skills") ? t("callingUi.featChoice.upTo", { count: slots("skills") }) : t("callingUi.featChoice.yourChoice", { count: spec.skills }) })}{mine.skills.length < spec.skills ? <span className="text-amber-300">{t("callingUi.featChoice.left", { count: spec.skills - mine.skills.length })}</span> : null}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SRD_SKILLS.filter((skill) => !heldSkills.has(skill.id)).map((skill) => (
              <PickPill
                key={skill.id}
                label={skillDisplay(skill.id)}
                selected={mine.skills.includes(skill.id)}
                onClick={() => toggle("skills", skill.id, slots("skills"))}
                info={{ text: skillHelpText(skill.id, locale) }}
              >
                {skillDisplay(skill.id)}
              </PickPill>
            ))}
          </div>
        </div>
      ) : null}
      {spec.expertise > 0 ? (
        <div>
          <span className="mb-1 block text-[11px] text-stone-400">
            {t("callingUi.featChoice.expertise", { count: spec.expertise })}{mine.expertise.length < spec.expertise ? <span className="text-amber-300">{t("callingUi.featChoice.left", { count: spec.expertise - mine.expertise.length })}</span> : null}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {expertiseFrom.length ? null : <span className="text-xs text-stone-500">{t("callingUi.featChoice.pickSkill")}</span>}
            {expertiseFrom.map((skillId) => (
              <PickPill
                key={skillId}
                label={skillDisplay(skillId)}
                selected={mine.expertise.includes(skillId)}
                onClick={() => toggle("expertise", skillId, spec.expertise)}
                info={{ text: skillHelpText(skillId, locale) }}
              >
                {skillDisplay(skillId)}
              </PickPill>
            ))}
          </div>
        </div>
      ) : null}
      {slots("weapons") > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: slots("weapons") }, (_, index) => (
            <Select<string>
              key={index}
              value={mine.weapons[index] ?? ""}
              onChange={(picked) => set("weapons", index, picked)}
              className="w-full"
              label={t("callingUi.featChoice.label.weapon", { feat: featName, index: index + 1 })}
              placeholder={t("callingUi.featChoice.choose.weapon")}
              options={[
                { value: "", label: t("callingUi.featChoice.choose.weapon") },
                ...weaponsOffered.filter(
                  (weapon) =>
                    !heldWeapons.has(lower(weapon.name)) &&
                    (mine.weapons[index] === weapon.name || !mine.weapons.includes(weapon.name)),
                ).map((weapon) => ({ value: weapon.name, label: referenceDisplayName("equipment", weapon.name, locale), hint: gearNote(weapon.damage, locale) })),
              ]}
            />
          ))}
        </div>
      ) : null}
      {spec.damageTypes.length ? (
        <Select<string>
          value={picks?.damageType ?? ""}
          onChange={(picked) => onChange({ ...picks, damageType: picked })}
          className="w-full sm:w-64"
          label={t("callingUi.featChoice.label.damage", { feat: featName })}
          placeholder={t("callingUi.featChoice.choose.damage")}
          options={[
            { value: "", label: t("callingUi.featChoice.choose.damage") },
            ...spec.damageTypes.map((type) => ({ value: type, label: locale === "en" ? capital(type) : featTermLabel("damage", type, locale) })),
          ]}
        />
      ) : null}
      {teaches && taught.listChoice ? (
        <Select<string>
          value={listPicked}
          onChange={(picked) => onChange({ ...picks, list: picked, cantrips: [], spells: [] })}
          className="w-full sm:w-64"
          label={t("callingUi.featChoice.label.list", { feat: featName })}
          placeholder={t("callingUi.featChoice.choose.list")}
          options={[
            { value: "", label: t("callingUi.featChoice.choose.list") },
            ...taught.lists.map((list) => ({ value: list, label: locale === "en" ? capital(list) : characterLabel("class", list, locale) })),
          ]}
        />
      ) : null}
      {teaches && taught.ability === "choice" ? (
        <Select<CastingAbility | "">
          value={picks?.ability ?? ""}
          onChange={(picked) => onChange({ ...picks, ...(picked ? { ability: picked } : {}) })}
          className="w-full sm:w-64"
          label={t("callingUi.featChoice.label.ability", { feat: featName })}
          placeholder={t("callingUi.featChoice.choose.ability")}
          options={[
            { value: "", label: t("callingUi.featChoice.choose.ability") },
            { value: "int", label: abilityLabel("int", locale) },
            { value: "wis", label: abilityLabel("wis", locale) },
            { value: "cha", label: abilityLabel("cha", locale) },
          ]}
        />
      ) : null}
      {teaches && taught.fixedSpells.length ? (
        <p className="text-[11px] text-stone-400">
          {t("callingUi.featChoice.known", { spells: taught.fixedSpells.map(spell => locale === "en" ? capital(spell) : referenceDisplayName("spell", spell, locale)).join(listSeparator), free: taught.freeCast ? t("callingUi.featChoice.free") : "" })}
        </p>
      ) : null}
      {teaches && taught.cantrips > 0 ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{spellSlots("cantrips", taught.cantrips, 0)}</div> : null}
      {teaches && taught.spells > 0 ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{spellSlots("spells", taught.spells, taught.spellLevel)}</div> : null}
      {slots("armor") > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: slots("armor") }, (_, index) => (
            <Select<string>
              key={index}
              value={mine.armor[index] ?? ""}
              onChange={(picked) => set("armor", index, picked)}
              className="w-full"
              label={t("callingUi.featChoice.label.armor", { feat: featName, index: index + 1 })}
              placeholder={t("callingUi.featChoice.choose.armor")}
              options={[
                { value: "", label: t("callingUi.featChoice.choose.armor") },
                ...spec.armorFrom.filter(
                  (piece) => !heldArmor.has(lower(piece)) && (mine.armor[index] === piece || !mine.armor.includes(piece)),
                ).map((piece) => ({ value: piece, label: locale === "en" ? capital(armorDisplay(piece)) : armorDisplay(piece) })),
              ]}
            />
          ))}
        </div>
      ) : null}
      {slots("tools") > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: slots("tools") }, (_, index) => (
            <Select<string>
              key={index}
              value={mine.tools[index] ?? ""}
              onChange={(picked) => set("tools", index, picked)}
              className="w-full"
              label={t("callingUi.featChoice.label.tool", { feat: featName, index: index + 1 })}
              placeholder={t("callingUi.featChoice.choose.tool")}
              options={[
                { value: "", label: t("callingUi.featChoice.choose.tool") },
                ...toolsOffered.filter(
                  (tool) => !heldTools.has(lower(tool)) && (mine.tools[index] === tool || !mine.tools.includes(tool)),
                ).map((tool) => ({ value: tool, label: locale === "en" ? capital(tool) : trainingLabel("tool", tool, locale) })),
              ]}
            />
          ))}
        </div>
      ) : null}
      {fixed.length ? (
        <p className="text-[11px] text-stone-400" data-feat-fixed={feat}>
          {t("callingUi.featChoice.fixed", { training: fixed.map(capital).join(listSeparator) })}
        </p>
      ) : null}
      <p className="text-[11px] text-stone-500" data-feat-coverage={feat}>
        {coverage}
      </p>
    </div>
  );
}
