"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { characterEventLabel, derivedLabel } from "@/lib/i18n/character-presentations";
import { accountDate } from "@/lib/i18n/account-presentations";
import { EmptyState } from "@/components/EmptyState";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";
import { GameTerm } from "@/components/ui/GameTerm";
import {
  AbilityTiles,
  EquipmentChips,
  FeatChips,
  FeatureChips,
  SkillRows,
  VitalTiles, TrainingLines } from "@/components/sheet/SheetParts";
import { SheetSpells } from "@/components/sheet/SheetSpells";
import { Ribbon } from "@/components/ui/Ribbon";
import { cn } from "@/lib/cn";
import type { CreateSheetInput } from "@/lib/schemas/sheet";
import { computeSheetDerived, formatModifier, speedFor, type DerivedPart } from "@/lib/srd";
import { ui } from "@/lib/ui";

export type CharacterEvent = {
  id: string;
  campaignId: string;
  kind: string;
  summary: string;
  createdAt: string;
};

// A titled block of the read-only sheet: Ribbon rule, then whatever the
// section shows. Same shape as the builder's StepPanel so the detail page
// reads like the wizard that made it.
function SheetPanel({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(ui.card, "p-4", className)}>
      <Ribbon className="mb-3">{title}</Ribbon>
      {children}
    </section>
  );
}

// The six scores, the vitals line, and the lists a library sheet carries:
// spells, equipment, features, feats, backstory. Read-only; editing happens
// through the builder in a campaign lobby.
export function SheetSections({ sheet, level = 1 }: { sheet: CreateSheetInput; level?: number }) {
  const { locale, t } = useLocale();
  // The same working the session sheet shows, from the same function, so a
  // library character reads its saves and skills before it ever sits down.
  const derived = computeSheetDerived({
    abilities: sheet.abilities,
    level,
    proficiencies: sheet.proficiencies,
    spellcasting: sheet.spellcasting ?? null,
    class: sheet.class,
    features: sheet.features,
    feats: sheet.feats,
    equipment: sheet.equipment,
  });
  const explain = (parts: DerivedPart[]) => parts.map((part) => `${formatModifier(part.value)} ${derivedLabel(part.label, locale)}`).join(t("sheet.separator"));
  return (
    <div className="space-y-4">
      <SheetPanel title={t("sheet.abilities")} className="ornate">
        <AbilityTiles
          abilities={sheet.abilities}
          mods={derived.abilityMods}
          saves={derived.saves}
          saveProficiencies={sheet.proficiencies.saves}
          explainSave={(ability) => explain(derived.parts.saves[ability])}
        />
        <div className="mt-3">
          <VitalTiles
            vitals={[
              { glyph: "rest-hp", label: <GameTerm id="hit_points">{t("sheet.hitPoints")}</GameTerm>, value: sheet.maxHp },
              { glyph: "rest-ac", label: <GameTerm id="armor_class">{t("sheet.ac")}</GameTerm>, value: sheet.ac },
              // The speed the engine moves them at: armor and features
              // (speedFor), not the raw base on the sheet.
              {
                glyph: "rest-speed",
                label: t("sheet.speed"),
                value: t("sheet.feet", { value: speedFor(sheet) }),
                title: speedFor(sheet) === sheet.speed ? t("sheet.speedHint") : t("sheet.speedChanged", { value: sheet.speed }),
              },
              { glyph: "coin-gp", label: t("sheet.gold"), value: t("sheet.gp", { value: sheet.gold }) },
              {
                glyph: "rest-initiative",
                label: <GameTerm id="initiative">{t("sheet.initiative")}</GameTerm>,
                value: formatModifier(derived.initiative),
                title: explain(derived.parts.initiative),
              },
              {
                glyph: "sense-passive-perception",
                label: <GameTerm id="passive_perception">{t("sheet.passive")}</GameTerm>,
                value: derived.passivePerception,
                title: explain(derived.parts.passivePerception),
              },
              { glyph: "rest-proficiency", label: t("sheet.proficiency"), value: formatModifier(derived.proficiencyBonus) },
              ...(derived.spellSaveDc
                ? [{ glyph: "rest-spell-slot", label: t("sheet.spellDc"), value: derived.spellSaveDc, title: explain(derived.parts.spellSaveDc) }]
                : []),
            ]}
          />
        </div>
      </SheetPanel>

      <SheetPanel title={<GameTerm id="skill">{t("sheet.skills")}</GameTerm>}>
        <SkillRows
          skills={derived.skills}
          proficient={sheet.proficiencies.skills}
          explain={(skillId) => explain(derived.parts.skills[skillId])}
        />
      </SheetPanel>

      <SheetPanel title={t("sheet.training")}>
        <TrainingLines proficiencies={sheet.proficiencies} />
      </SheetPanel>

      {sheet.spellcasting ? (
        <SheetPanel title={t("sheet.spells")}>
          <SheetSpells sheet={{ ...sheet, level }} />
        </SheetPanel>
      ) : null}

      {sheet.equipment.length ? (
        <SheetPanel title={t("sheet.equipment")}>
          <EquipmentChips equipment={sheet.equipment} />
        </SheetPanel>
      ) : null}

      {sheet.features?.length ? (
        <SheetPanel title={t("sheet.features")}>
          <FeatureChips features={sheet.features} classId={sheet.class} subclass={sheet.subclass} classes={sheet.classes} />
        </SheetPanel>
      ) : null}

      {sheet.feats.length ? (
        <SheetPanel title={t("sheet.feats")}>
          <FeatChips feats={sheet.feats} classId={sheet.class} subclass={sheet.subclass} />
        </SheetPanel>
      ) : null}

      {sheet.backstory ? (
        <SheetPanel title={t("sheet.backstory")}>
          <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-stone-300">
            {sheet.backstory}
          </p>
        </SheetPanel>
      ) : null}
    </div>
  );
}

// Milestones the campaigns recorded for this character, newest first as the
// API returns them, drawn as a timeline down a gold hairline.
export function StorySoFar({ events }: { events: CharacterEvent[] }) {
  const { locale, t } = useLocale();
  return (
    <SheetPanel
      title={
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-3" aria-hidden="true" /> {t("sheet.story")}
        </span>
      }
    >
      {events.length === 0 ? (
        <EmptyState size="md" art="scrolls" title={t("sheet.noEvents")} />
      ) : (
        <ol className="stagger relative ml-2 space-y-3 border-l border-amber-400/20 pl-5">
          {events.map((event) => (
            <li key={event.id} className="relative text-sm">
              <span
                className="absolute -left-[1.45rem] top-1.5 size-2.5 rounded-full border border-amber-300/60 bg-stone-950 shadow-glow-gold"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="eyebrow rounded-sm border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[9px] leading-none text-amber-300">
                  {characterEventLabel(event.kind, locale)}
                </span>
                <span className="text-xs text-stone-500">
                  {accountDate(event.createdAt, locale, "short")}
                </span>
              </div>
              <p className="mt-1 text-stone-200">{event.summary}</p>
            </li>
          ))}
        </ol>
      )}
    </SheetPanel>
  );
}
