"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { finishRulesErrorText, localizedHitPointsLine } from "@/lib/i18n/finish-ui-presentations";
import { gearCoin, gearWealthDiceText, localizedArmorClassLine, localizedPurseView } from "@/lib/i18n/gear-ui-presentations";
import { builderOptionName } from "@/lib/i18n/builder-picker-presentations";
import { featTermLabel } from "@/lib/i18n/feat-presentations";
import { Camera, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { contentSlug } from "@/lib/help";
import type { CreateSheetInput } from "@/lib/schemas/sheet";
import { formatModifier, proficiencyBonus } from "@/lib/srd";
import { racialFeatCount } from "@/lib/srd/race-id";
import { ui } from "@/lib/ui";
import { HpExplainerButton } from "../AbilityExplainers";
import type { BackgroundOption, ClassOption, RaceOption } from "../useBuilderOptions";
import type { TableRulesState } from "../useTableRules";
import type { BuilderDerived } from "../useBuilderDerived";
import type { BuilderState } from "../useBuilderState";
import { hpExplainerInput } from "./AbilitiesStep";
import { Chip, Field, StepPanel, inputClass } from "./shared";

// Step 6: the portrait, how they look, their story, extra feats, and the
// numbers the sheet will open with. The save button is the wizard footer.
export function FinishStep({
  state,
  derived,
  race,
  klass,
  background,
  table,
  initial,
  paintsPortraits,
  onUploadPortrait,
  error,
}: {
  state: BuilderState;
  derived: BuilderDerived;
  race: RaceOption | undefined;
  klass: ClassOption | undefined;
  background: BackgroundOption | undefined;
  table: TableRulesState;
  initial?: CreateSheetInput;
  // Whether this server can paint a portrait at all. Without an image
  // backend the section offers the upload alone and stops promising a
  // painting that would never arrive.
  paintsPortraits: boolean;
  onUploadPortrait: () => void;
  error: string;
}) {
  const { locale, t } = useLocale();
  const { portrait, setPortrait } = state;
  const { preview, acInfo, ac, effectiveLevel } = derived;
  const keptSaved = Boolean(initial?.portrait && portrait?.url === initial.portrait.url);
  const hp = hpExplainerInput(state, derived, race, klass, locale);
  // Hit points, armor class and coin are the server's to work out, so they
  // are shown with their reasons and never typed.
  const hpLine =
    preview && klass
      ? localizedHitPointsLine({
          hitDie: klass.hitDie,
          level: effectiveLevel,
          maxHp: preview.maxHp,
          range: preview.hpRange,
          method: preview.hpMethod,
          kept: state.hpOverride !== null,
          atTable: Boolean(table.rules),
        }, locale)
      : null;
  const acLine = localizedArmorClassLine(acInfo?.ac ?? ac, acInfo?.parts, locale, derived.fullEquipment.filter(item => item.slug?.startsWith("homebrew:")).map(item => item.name));
  const purse = localizedPurseView({
    purse: derived.purse,
    keepsStoredGear: state.keepsStoredGear,
    backgroundName: background?.name ?? "chosen",
    backgroundPurse: background?.purse ?? 0,
    classId: klass?.id ?? "",
    className: klass?.name ?? "character",
    table,
  }, locale, {
    backgroundName: background ? builderOptionName("background", background, locale) : "chosen",
    className: klass ? builderOptionName("class", klass, locale) : "character",
  });
  // Feats come with Ability Score Improvements (picked on the Abilities
  // step) or, for a variant human, with the race (picked on the Ancestry
  // step, issue #124). What is left here is what the character already
  // holds from play, shown so an edit does not lose it unseen.
  const racialFeat = race ? racialFeatCount(race.id) > 0 : false;
  return (
    <div className="space-y-4">
      <StepPanel title={t("finishUi.portrait")} ornate>
        <div className="flex items-center gap-3">
          {portrait?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait.url}
              alt={t("finishUi.portraitAlt")}
              className="size-16 shrink-0 rounded-lg border border-amber-500/30 object-cover"
            />
          ) : (
            <span className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-stone-700/60 bg-stone-950 text-stone-600">
              <UserRound className="size-6" />
            </span>
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {/* The upload is offered everywhere, whether or not a painter
                  exists: a photo is always a way to give a hero a face. */}
              <button type="button" onClick={onUploadPortrait} className={ui.btnSmall}>
                <Camera className="size-3.5" />
                {t(portrait ? "finishUi.replacePhoto" : "finishUi.uploadPhoto")}
              </button>
              {/* Clearing the saved portrait means "paint me a new one", which
                  only makes sense where a painter exists. A freshly uploaded
                  photo can always be taken back. */}
              {portrait && (paintsPortraits || !keptSaved) ? (
                <button type="button" onClick={() => setPortrait(null)} className={ui.btnSmall}>
                  {t(keptSaved ? "finishUi.regenerate" : "finishUi.removePhoto")}
                </button>
              ) : null}
            </div>
            <p className="mt-1.5 text-xs text-stone-500">
              {portrait
                ? paintsPortraits
                  ? t("finishUi.photoAsIsWithPainter")
                  : t("finishUi.photoAsIs")
                : paintsPortraits
                  ? t("finishUi.photoOrPaint")
                  : t("finishUi.photoHelp")}
            </p>
          </div>
        </div>
        <Field label={t("finishUi.appearance")} className="mt-4">
          <p className="mb-2 text-xs text-stone-500">
            {paintsPortraits
              ? t("finishUi.paintAppearance")
              : t("finishUi.appearanceHelp")}
          </p>
          <textarea
            value={state.appearance}
            onChange={(event) => state.setAppearance(event.target.value)}
            rows={2}
            maxLength={500}
            placeholder={t("finishUi.appearancePlaceholder")}
            className={cn(inputClass, "resize-y")}
          />
        </Field>
      </StepPanel>

      <StepPanel
        title={t("finishUi.backstoryOptional")}
        help={t("finishUi.backstoryHelp")}
      >
        <textarea
          value={state.backstory}
          onChange={(event) => state.setBackstory(event.target.value)}
          rows={4}
          maxLength={2000}
          placeholder={t("finishUi.backstoryPlaceholder")}
          className={cn(inputClass, "resize-y")}
          aria-label={t("finishUi.backstory")}
        />
      </StepPanel>

      {!racialFeat && state.feats.length ? (
        <StepPanel
          title={t("finishUi.feats")}
          help={t("finishUi.featsHelp")}
        >
          <div className="mt-2 flex flex-wrap gap-1.5">
            {state.feats.map((feat) => (
              <Chip
                key={feat}
                label={featTermLabel("feat", feat, locale)}
                info={{ reference: { kind: "feats", slug: contentSlug(feat), name: feat } }}
                onRemove={() => state.setFeats((current) => current.filter((entry) => entry !== feat))}
              />
            ))}
          </div>
        </StepPanel>
      ) : null}

      {table.rulesError ? (
        <p role="alert" className="reveal flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-xs text-amber-100">
          {finishRulesErrorText(table.rulesError, locale)}
          <button type="button" onClick={table.retryRules} className={ui.btnSmall}>
            {t("finishUi.retry")}
          </button>
        </p>
      ) : null}
      {preview && race ? (
        <StepPanel title={t("finishUi.stats")} ornate className="border-amber-500/30">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-stone-300 sm:grid-cols-4">
            <Field
              label={
                <span className="flex items-center gap-0.5">
                  {t("finishUi.maxHp")}
                  {hp ? <HpExplainerButton hp={hp} compact /> : null}
                </span>
              }
            >
              <span key={hpLine?.value} className="reveal font-mono text-base text-amber-100">
                {hpLine?.value}
              </span>
              <span className="mt-1 block text-[11px] text-stone-500">{hpLine?.reason}</span>
            </Field>
            <Field label={t("finishUi.ac")}>
              <span key={acLine.value} className="reveal font-mono text-base text-amber-100">
                {acLine.value}
              </span>
              <span className="mt-1 block text-[11px] text-stone-500">{acLine.reason}</span>
            </Field>
            <Field label={t("finishUi.gold")} className="col-span-2">
              <span key={`${purse.gold}-${purse.copper}`} className="reveal font-mono text-base text-amber-100">
                {gearCoin(purse.gold, purse.copper, locale)}
              </span>
              <span className="mt-1 block text-[11px] text-stone-500">
                {purse.wealth?.rolled
                  ? t("finishUi.rolledWealth", { gold: purse.wealth.rolled.gold, dice: gearWealthDiceText(purse.wealth.dice, locale) })
                  : ""}
                {purse.source}
              </span>
            </Field>
            <span className="self-end">{t("finishUi.speed", { speed: race.speed })}</span>
            <span className="self-end">{t("finishUi.proficiency", { bonus: formatModifier(proficiencyBonus(effectiveLevel)) })}</span>
            <span>{t("finishUi.initiative", { bonus: formatModifier(preview.derived.initiative) })}</span>
            <span>{t("finishUi.perception", { value: preview.derived.passivePerception })}</span>
            {preview.derived.spellSaveDc ? <span>{t("finishUi.spellDc", { value: preview.derived.spellSaveDc })}</span> : null}
            {preview.derived.spellAttack !== null ? (
              <span>{t("finishUi.spellAttack", { bonus: formatModifier(preview.derived.spellAttack) })}</span>
            ) : null}
          </div>
        </StepPanel>
      ) : null}

      {error ? (
        // Every reason the server gave, not just the first (U:UB8).
        error.includes("\n") ? (
          <div className="motion-shake text-sm text-red-400" role="alert">
            <p>{t("finishUi.saveRefused")}</p>
            <ul className="stagger mt-1 list-disc space-y-0.5 pl-5">
              {error.split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="motion-shake text-sm text-red-400" role="alert">
            {error}
          </p>
        )
      ) : null}
    </div>
  );
}
