"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { monsterUiText, monsterUiFrame, monsterUiError } from "@/lib/i18n/monster-ui-presentations";

import { PrintedBlockView } from "@/app/workshop/bestiary/PrintedBlockView";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { Select } from "@/components/ui/Select";
import { SectionHead } from "@/components/ui/SectionHead";
import { Field } from "@/app/workshop/kit";
import { MAX_SWINGS, MONSTER_NAME_MAX, type MonsterDraft, type MonsterReadout } from "@/lib/bestiary/monster-draft";
import { crLabel } from "@/lib/bestiary/derive-cr";
import {
  AttackEditor,
  NumberField,
  RatingLine,
  SaveEditor,
  SizeAndDefences,
  Working,
} from "@/app/campaigns/[campaignId]/MonsterFields";
import { MonsterKitPanel } from "@/app/campaigns/[campaignId]/MonsterKitFields";
import {
  AbilityScores,
  LanguagesAndHabitat,
  SectionedTraitEditor,
  SkillsAndSenses,
} from "@/app/workshop/bestiary/StatBlockFields";
import { CR_CHOICES } from "@/app/workshop/bestiary/types";
import { AbilitiesEditor, RegenerationEditor, RoutineEditor } from "@/app/workshop/bestiary/BlockActionFields";
import { SpellcastingEditor } from "@/app/workshop/bestiary/SpellcastingFields";
import { BorrowParts } from "@/app/workshop/bestiary/BorrowParts";

const CR_OPTIONS = CR_CHOICES.map((cr) => ({ value: String(cr), label: crLabel(cr) }));

// One built monster, open for editing: the block's numbers, the catalogue
// over them, its attacks, saves, traits and defences, what it is, and the
// rating the numbers support with the working shown. Split out of
// DmBestiaryPanel so the workshop can show the same editor inside a sheet;
// the console still renders it inline under the monster's row, unchanged.
//
// "inline" is that console layout: fields wrap in a row under a border.
// "sheet" is the workshop's: the six core stats in a grid so a phone shows
// them two abreast, and from lg up two columns, the numbers and what they
// produce on the left and the catalogue and the defences on the right. The
// attack list stays under the stats rather than beside them so a phone,
// which reads the columns top to bottom, still meets the attacks before the
// catalogue that adds to them.

export function MonsterEditor({
  draft,
  desc,
  readout,
  busy,
  error,
  onDraft,
  onDesc,
  onSave,
  layout = "inline",
}: {
  draft: MonsterDraft;
  desc: string;
  readout: MonsterReadout | null;
  busy: boolean;
  error: string;
  onDraft: (draft: MonsterDraft) => void;
  onDesc: (desc: string) => void;
  onSave: () => void;
  layout?: "inline" | "sheet";
}) {
  const { locale } = useLocale();
  const sheet = layout === "sheet";
  const setStats = (patch: Partial<MonsterDraft["stats"]>) =>
    onDraft({ ...draft, stats: { ...draft.stats, ...patch } });

  const coreStats = (
    <div
      className={cn(
        sheet ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap items-end gap-2",
      )}
    >
      <Field as="label" label={monsterUiText("Name", locale)} className={cn(sheet && "col-span-2 sm:col-span-3")}>
        <input
          value={draft.name}
          onChange={(event) =>
            onDraft({ ...draft, name: event.target.value.slice(0, MONSTER_NAME_MAX) })
          }
          className={cn(ui.input, sheet ? "w-full" : "w-48")}
        />
      </Field>
      <Field label={monsterUiText("Challenge", locale)}>
        <span className={cn("block", !sheet && "w-24")}>
          <Select
            label={monsterUiText("Challenge", locale)}
            value={String(draft.stats.cr)}
            onChange={(next) => setStats({ cr: Number(next) })}
            options={CR_OPTIONS}
          />
        </span>
      </Field>
      <NumberField label={monsterUiText("AC", locale)} value={draft.stats.ac} min={1} max={30} onChange={(ac) => setStats({ ac })} />
      <NumberField
        label={monsterUiText("Hit points", locale)}
        value={draft.stats.maxHp}
        min={1}
        max={2000}
        onChange={(maxHp) => setStats({ maxHp })}
      />
      <NumberField
        label={monsterUiText("Swings", locale)}
        value={draft.stats.attacksPerTurn ?? 1}
        min={1}
        max={MAX_SWINGS}
        onChange={(attacksPerTurn) => setStats({ attacksPerTurn })}
      />
      <NumberField
        label={monsterUiText("Dex mod", locale)}
        value={draft.stats.dexMod}
        min={-5}
        max={10}
        onChange={(dexMod) => setStats({ dexMod })}
      />
    </div>
  );

  const extraDamage = (
    <NumberField
      label={monsterUiText("Extra damage a round", locale)}
      value={draft.extraDamagePerRound}
      min={0}
      max={400}
      onChange={(extraDamagePerRound) => onDraft({ ...draft, extraDamagePerRound })}
      hint={monsterUiText("A breath weapon or a round of spellcasting, averaged. The rating cannot see it otherwise.", locale)}
    />
  );

  const description = (
    <Field as="label" label={monsterUiText("What it is", locale)}>
      <textarea
        value={desc}
        onChange={(event) => onDesc(event.target.value)}
        rows={2}
        placeholder={monsterUiText("A knight's armour walking with nobody inside it.", locale)}
        className={cn(ui.input, "resize-y")}
      />
    </Field>
  );

  const rating = readout ? (
    <>
      <SectionHead title={monsterUiText("The rating the numbers support", locale)} glyph="rest-xp" className="mb-0" />
      <RatingLine readout={readout} />
      <Working parts={readout.derived.parts} notes={readout.derived.notes} />
      <div className="stagger-pop flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
        {readout.against.map((row) => (
          <span key={monsterUiText(row.label, locale)} className="text-stone-500">
            {monsterUiText(row.label, locale)}{" "}
            <span
              className={cn(row.verdict === "as expected" ? "text-stone-400" : "text-amber-300/80")}
            >
              {monsterUiText(row.stat, locale)}
            </span>{" "}
            <span className="text-stone-600">
              {monsterUiFrame("comparison", { verdict: monsterUiText(row.verdict, locale), cr: crLabel(readout.statedCr), expected: monsterUiText(row.expected, locale) }, locale)}
            </span>
          </span>
        ))}
      </div>
    </>
  ) : null;

  const footer = (
    <>
      {error ? <p className="motion-shake text-[11px] text-red-400">{monsterUiError(error, locale)}</p> : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={onSave}
          className={ui.btnPrimary}
        >
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : null}
          {monsterUiText("Save the block", locale)}</button>
        <span className="text-[11px] text-stone-500">
          {monsterUiText("Saving recalculates the rating from what is on screen.", locale)}</span>
      </div>
    </>
  );

  if (sheet) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-3">
            <SectionHead title={monsterUiText("The block", locale)} glyph="system-bestiary" className="mb-0" />
            {coreStats}
            <AbilityScores draft={draft} onChange={onDraft} />
            <AttackEditor draft={draft} onChange={onDraft} />
            <RoutineEditor draft={draft} onChange={onDraft} />
            <SaveEditor draft={draft} onChange={onDraft} />
            <AbilitiesEditor draft={draft} onChange={onDraft} />
            <SpellcastingEditor draft={draft} onChange={onDraft} />
            <SectionedTraitEditor draft={draft} onChange={onDraft} />
            <PrintedBlockView draft={draft} />
          </div>
          <div className="flex flex-col gap-3">
            <SectionHead title={monsterUiText("Catalogue and defences", locale)} glyph="rest-ac" className="mb-0" />
            <MonsterKitPanel draft={draft} onChange={onDraft} />
            <BorrowParts draft={draft} onChange={onDraft} />
            <SizeAndDefences draft={draft} onChange={onDraft} />
            <RegenerationEditor draft={draft} onChange={onDraft} />
            <SkillsAndSenses draft={draft} onChange={onDraft} />
            <LanguagesAndHabitat draft={draft} onChange={onDraft} />
            {extraDamage}
            {description}
          </div>
        </div>
        {rating}
        {footer}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 border-t border-stone-800 p-3">
      <SectionHead title={monsterUiText("The block", locale)} glyph="system-bestiary" className="mb-0" />
      {coreStats}
      <AbilityScores draft={draft} onChange={onDraft} />
      <MonsterKitPanel draft={draft} onChange={onDraft} />
      <BorrowParts draft={draft} onChange={onDraft} />
      <AttackEditor draft={draft} onChange={onDraft} />
      <RoutineEditor draft={draft} onChange={onDraft} />
      <SaveEditor draft={draft} onChange={onDraft} />
      <AbilitiesEditor draft={draft} onChange={onDraft} />
      <SpellcastingEditor draft={draft} onChange={onDraft} />
      <SectionedTraitEditor draft={draft} onChange={onDraft} />
      <PrintedBlockView draft={draft} />
      <SizeAndDefences draft={draft} onChange={onDraft} />
      <RegenerationEditor draft={draft} onChange={onDraft} />
      <SkillsAndSenses draft={draft} onChange={onDraft} />
      <LanguagesAndHabitat draft={draft} onChange={onDraft} />
      {extraDamage}
      {description}
      {rating}
      {footer}
    </div>
  );
}
