"use client";

import { owedChoices } from "@/lib/srd/owed-choices";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import { FileDown, Minus, Plus, PawPrint, Wrench, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { CharacterPortrait, ui } from "@/lib/ui";
import { downloadCharacterSheetPdf } from "@/lib/pdf/download";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import {
  acBreakdownFor,
  computeSheetDerived,
  formatModifier,
  sizeForRace,
} from "@/lib/srd";
import { attunementSlotsFor, matchArmor } from "@/lib/srd/armor";
import { encumbranceFor } from "@/lib/srd/encumbrance";
import { matchMagicItem, magicItemRiders } from "@/lib/srd/magic-items";
import { RESOURCE_DEFS } from "@/lib/srd/class-resources";
import { GameTerm } from "@/components/ui/GameTerm";
import {
  AbilityTiles,
  ConditionChips,
  EquipmentChips,
  FeatChips,
  FeatureChips,
  HpBar,
  PortraitMedallion,
  SheetBlock,
  SkillRows,
  VitalTiles, TrainingLines } from "@/components/sheet/SheetParts";
import { SheetSpells } from "@/components/sheet/SheetSpells";
import { DefensesLine, HitDiceSpend, StateTags } from "@/components/sheet/SheetState";
import { SheetBetween } from "@/components/sheet/SheetBetween";
import { conditionDetail, hitDiceLine, itemStatus, maxHpView, otherSpeedsLine, speedView } from "@/components/sheet/sheet-state";
import { FeatureChoicePicker, OtherSpeeds } from "@/components/sheet/SheetChoices";
import { SheetGearRow } from "@/components/sheet/SheetGearRow";
import { ResourceRow, SlotRow, STEP_BUTTON } from "@/components/sheet/SheetCounters";
import { namesLookup } from "@/lib/battlemap/condition-notes";
import { conditionNamesLookup } from "@/lib/battlemap/condition-presentation";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { abilityLabel } from "@/lib/i18n/character-presentations";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { messageTemplate } from "@/lib/i18n/translator";
import { referenceDisplayName } from "@/lib/i18n/references";
import { damageListLabel, resourceLabel } from "@/lib/i18n/sheet-play-presentations";
import { sheetArmorParts, sheetDerivedParts, sheetIdentity, sheetLoadNote, sheetOwedChoice, sheetResourceHelp, sheetTimePassed, sheetUsageMessage } from "@/lib/i18n/sheet-dialog-presentations";

function titleCase(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const RESOURCE_NAMES = new Map(RESOURCE_DEFS.map((def) => [def.id, def.displayName]));
// Original model guidance remains the English fallback; reviewed player
// explanations are selected only for exact native resource IDs and wording.
const RESOURCE_HELP = new Map(RESOURCE_DEFS.map((def) => [def.id, def.guidance]));

// Full character sheet, opened by selecting any party member. Read-only,
// except the owner may mark counters their class actually has as spent
// (spell slots, hit dice, resource pools) and change which gear they wear or
// are attuned to, via /sheet/usage. Handing a use back is a correction, so
// those controls are drawn only for the DM and the party lead, on any sheet.
// Notes stay private to the sheet's owner.
// Every derived number's working, the way AC has always shown its own.
// computeSheetDerived returns the parts it summed, so a hover can say where a
// +7 came from without this file knowing a single rule.
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export function CharacterSheetDialog({
  sheet,
  mine,
  steersStory,
  corrects = false,
  encumbranceRule = false,
  inCombat = false,
  myTurn = false,
  names = [],
  campaignLocale = DEFAULT_LOCALE,
  portraitFallback,
  onAdjust,
  onClose,
}: {
  sheet: CharacterSheet;
  mine: boolean;
  steersStory: boolean;
  // The viewer is the DM or the party lead: they may hand uses back, on
  // this sheet whoever owns it. A player only ever spends.
  corrects?: boolean;
  // The world pack's picture for this character's class or race, drawn
  // before the generic plate when nobody has painted a portrait.
  portraitFallback?: string | null;
  // The table's optional encumbrance rule.
  encumbranceRule?: boolean;
  // 5e timing, which the server enforces too: in a fight armor does not go
  // on or off and nothing is attuned. A shield costs the action of the turn.
  // (Hit dice belong to a short rest in or out of a fight; see below.)
  inCombat?: boolean;
  // Whether the fight's pointer rests on this character (a shield is handled
  // with the action, on their own turn).
  myTurn?: boolean;
  // Who a condition's "until X's turn" or "from X" may name: the party and
  // the enemies the viewer can see.
  names?: Array<{ id: string; name: string; kind?: string }>;
  campaignLocale?: AppLocale;
  onAdjust?: () => void;
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  const derived = computeSheetDerived(sheet);
  const armor = acBreakdownFor(sheet);
  const attunedCount = sheet.equipment.filter((item) => item.attuned).length;
  // Only gear worth a toggle: armor and shields can be worn, and anything
  // whose name declares a magic bonus can be attuned.
  const wearable = sheet.equipment.filter(
    (item) =>
      matchArmor(item.name) !== null ||
      /\+[123]\b/.test(item.name) ||
      matchMagicItem(item.name) !== null,
  );
  const magic = magicItemRiders(sheet.equipment, sheet);
  // Carried weight is always worth showing once the pack has weights on it;
  // the thresholds and their penalties only mean something when the table
  // turned the variant rule on.
  // The speed the server will actually let them move: armor gates the class
  // bonuses, heavy armor below its Strength minimum costs 10 feet, and a
  // heavy pack costs more when the table plays with encumbrance.
  // speedFor, then the conditions, then exhaustion: the speed the move route
  // lets them walk (src/components/sheet/sheet-state.ts).
  const speedState = speedView(sheet, { encumbrance: encumbranceRule }, locale);
  const speed = speedState.speed;
  const hp = maxHpView(sheet, locale);
  const nameOf = namesLookup(names);
  const displayNameOf = conditionNamesLookup(names.map(entry => ({ ...entry, kind: entry.kind ?? "proper" })));
  const dead = Boolean(sheet.deathSaves?.dead);
  // The same load speedFor weighs (size and a Belt of Giant Strength count),
  // so the tile and the speed beside it agree.
  const load = encumbranceFor({
    strength: sheet.abilities.str,
    equipment: sheet.equipment,
    coins: sheet.gold,
    size: sizeForRace(sheet.race),
    wearer: sheet,
  });
  const anyEquipped = sheet.equipment.some((item) => item.equipped);
  const speedNote = speedState.notes.length ? speedState.notes.join(" ") : t("sheetDialog.walking");
  const [busy, setBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  // The server's reason when it refuses an adjustment, shown under the
  // counters so the player knows what would be accepted.
  // It is kept beside the control that was used (the counters or the gear).
  const [refusal, setRefusal] = useState<{ text: string; at: "usage" | "gear" } | null>(null);
  // The route's line after armor went on or off outside a fight: the minutes
  // it took, already on the clock.
  const [timeNote, setTimeNote] = useState<string | null>(null);
  const spends = mine || corrects;
  // The usage route's own refusal for a dead character's spend.
  const deadNote = dead && !corrects ? t("sheetDialog.error.deadNote", { name: sheet.name }) : null;

  async function handleDownloadPdf() {
    setPdfBusy(true);
    try {
      await downloadCharacterSheetPdf(sheet);
    } finally {
      setPdfBusy(false);
    }
  }

  // Fire-and-forget: the sheet_updated SSE event refreshes the sheet prop,
  // so the new counts render without local reconciliation.
  async function adjustUsage(body: Record<string, unknown>, at: "usage" | "gear" = "usage") {
    setBusy(true);
    setRefusal(null);
    setTimeNote(null);
    try {
      const response = await fetch(`/api/campaigns/${sheet.campaignId}/sheet/usage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // A correction names the sheet; a player is answered on their own.
        body: JSON.stringify(mine ? body : { ...body, characterId: sheet.id }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setRefusal({ text: typeof data?.error === "string" ? data.error : messageTemplate("en", "sheetDialog.error.refused"), at });
      } else if (typeof data?.timePassed === "string") {
        // Out of a fight armor takes minutes to put on or take off, and the
        // route moved the table's clock by them (src/lib/dm/don-doff.ts).
        setTimeNote(data.timePassed);
      }
    } catch {
      setRefusal({ text: messageTemplate("en", "sheetDialog.error.network"), at });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            ui.dialog,
            "fixed left-1/2 top-1/2 z-50 max-h-[88dvh] w-[min(52rem,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <PortraitMedallion classId={sheet.class} level={sheet.level}>
                {sheet.portrait ? (
                  <ImageLightbox
                    src={sheet.portrait.url}
                    alt={sheet.name}
                    caption={sheet.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <CharacterPortrait
                    fallback={portraitFallback}
                    look={{ race: sheet.race, class: sheet.class, gender: sheet.gender }}
                    alt={sheet.name}
                    size="size-full"
                  />
                )}
              </PortraitMedallion>
              <div>
                <Dialog.Title className="gold-title font-display text-2xl tracking-wide">
                  {sheet.name}
                </Dialog.Title>
                <p className="text-xs text-stone-400">
                  {sheetIdentity(sheet, locale)}
                </p>
              </div>
            </div>
            <Dialog.Close className="text-stone-500 hover:text-stone-300">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-1.5">
            <HpBar current={sheet.currentHp} max={hp.max} temp={sheet.tempHp ?? 0} note={hp.note} />
            <VitalTiles
              vitals={[
                {
                  glyph: "rest-ac",
                  label: <GameTerm id="armor_class">{t("sheetDialog.ac")}</GameTerm>,
                  value: sheet.ac,
                  title: sheet.acOverride ? t("sheetDialog.ac.manual") : sheetArmorParts(armor.parts, locale),
                },
                {
                  glyph: "rest-speed",
                  label: t("sheetDialog.speed"),
                  value: t("sheetDialog.feet", { speed }),
                  title: [speedNote, ...otherSpeedsLine(derived.speeds, locale)].join(" "),
                  tone: speed < speedState.base ? "warn" : "plain",
                },
                {
                  glyph: "rest-initiative",
                  label: <GameTerm id="initiative">{t("sheetDialog.initiative")}</GameTerm>,
                  value: formatModifier(derived.initiative),
                  title: sheetDerivedParts(derived.parts.initiative, locale),
                },
                {
                  glyph: "sense-passive-perception",
                  label: <GameTerm id="passive_perception">{t("sheetDialog.passive")}</GameTerm>,
                  value: derived.passivePerception,
                  title: sheetDerivedParts(derived.parts.passivePerception, locale),
                },
                { glyph: "rest-proficiency", label: t("sheetDialog.proficiency"), value: formatModifier(derived.proficiencyBonus) },
                { glyph: "coin-gp", label: t("sheetDialog.gold"), value: t("sheetDialog.goldValue", { gold: sheet.gold }) },
                { glyph: "rest-xp", label: t("sheetDialog.experience"), value: t("sheetDialog.xp", { xp: sheet.xp }) },
                {
                  glyph: `die-${sheet.hitDice.die}`,
                  label: <GameTerm id="hit_dice">{t("sheetDialog.hitDice")}</GameTerm>,
                  // Every pool of a multiclass character, not only the first.
                  value: hitDiceLine(sheet),
                },
                {
                  glyph: "coin-purse",
                  label: t("sheetDialog.carried"),
                  value: t("sheetDialog.pounds", { carried: load.carriedLb, unknown: load.unweighed ? "+" : "", capacity: load.capacityLb }),
                  tone: load.overCapacity || (encumbranceRule && load.tier !== "unencumbered") ? "warn" : "plain",
                  // Past the capacity (Strength x 15) the load can only be
                  // dragged at 5 feet, whatever the table's encumbrance rule
                  // (src/lib/dm/load-rules.ts, speedFor).
                  title: sheetLoadNote(load, encumbranceRule, locale),
                },
              ]}
            />
            <OtherSpeeds speeds={derived.speeds} />
          </div>

          {sheet.wildShape ? (
            <div className="reveal mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-lime-800/60 bg-lime-950/40 px-3 py-2 text-sm text-lime-200">
              <span className="flex items-center gap-1.5 font-medium capitalize">
                <PawPrint className="size-4" /> {t("sheetDialog.shape", { form: referenceDisplayName("monster", sheet.wildShape.form, locale) })}
              </span>
              <span className="font-mono text-xs">
                {t("sheetDialog.shape.hp", { current: sheet.wildShape.beastHp, max: sheet.wildShape.beastMaxHp })}
              </span>
              <span className="font-mono text-xs">{t("sheetDialog.shape.ac", { ac: sheet.wildShape.beastAc })}</span>
              <span className="w-full text-xs text-lime-400/80">
                {t("sheetDialog.shape.note", { current: sheet.currentHp, max: hp.max, name: sheet.name })}
              </span>
            </div>
          ) : null}

          <StateTags sheet={sheet} className="mt-2" />
          <SheetBetween sheet={sheet} className="mt-2" />
          {sheet.conditions.length ? (
            <div className="reveal mt-2">
              <ConditionChips
                conditions={sheet.conditions}
                rounds={sheet.conditionMeta}
                detail={(condition) => conditionDetail(sheet, condition, nameOf, locale, displayNameOf)}
              />
            </div>
          ) : null}
          <DefensesLine sheet={sheet} />

          <SheetBlock
            className="mt-4"
            title={t("sheetDialog.abilities")}
            aside={
              <>
                <GameTerm id="saving_throw">{t("sheetDialog.saves")}</GameTerm>{t("sheetDialog.saves.aside")}
              </>
            }
          >
            <AbilityTiles
              abilities={sheet.abilities}
              mods={derived.abilityMods}
              saves={derived.saves}
              saveProficiencies={sheet.proficiencies.saves}
              explainSave={(ability) => sheetDerivedParts(derived.parts.saves[ability], locale)}
            />
          </SheetBlock>

          <SheetBlock className="mt-4" title={<GameTerm id="skill">{t("sheetDialog.skills")}</GameTerm>}>
            <SkillRows
              skills={derived.skills}
              proficient={sheet.proficiencies.skills}
              explain={(skillId) => sheetDerivedParts(derived.parts.skills[skillId], locale)}
            />
          </SheetBlock>

          <SheetBlock className="mt-4" title={t("sheetDialog.training")}>
            <TrainingLines proficiencies={sheet.proficiencies} />
          </SheetBlock>

          {sheet.spellcasting ? (
            <SheetBlock
              className="mt-4"
              title={t("sheetDialog.casting")}
              hint={
                derived.parts.spellSaveDc.length
                  ? t("sheetDialog.casting.hint", { save: sheetDerivedParts(derived.parts.spellSaveDc, locale), attack: sheetDerivedParts(derived.parts.spellAttack, locale) })
                  : undefined
              }
              aside={
                <>
                  {locale === "en" ? sheet.spellcasting.ability.toUpperCase() : abilityLabel(sheet.spellcasting.ability, locale, true)}
                  {derived.spellSaveDc ? t("sheetDialog.casting.dc", { dc: derived.spellSaveDc }) : ""}
                  {derived.spellAttack !== null ? t("sheetDialog.casting.attack", { attack: formatModifier(derived.spellAttack) }) : ""}
                </>
              }
            >
              {Object.keys(sheet.spellcasting.slots).length || sheet.spellcasting.pact ? (
                <div className="reveal space-y-1.5 text-xs text-stone-300">
                  <p className="flex items-center gap-1 text-stone-400">
                    <GameIcon icon={{ kind: "glyph", key: "rest-spell-slot" }} size="size-5" />
                    <GameTerm id="spell_slot">{t("sheetDialog.slots")}</GameTerm>
                    <span className="text-stone-500">{t("sheetDialog.slots.tail")}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(sheet.spellcasting.slots).map(([slotLevel, slot]) => (
                      <SlotRow
                        key={slotLevel}
                        label={t("sheetDialog.slots.level", { level: locale === "en" ? ROMAN[Number(slotLevel)] ?? slotLevel : slotLevel })}
                        left={slot.max - slot.used}
                        max={slot.max}
                        spends={spends}
                        corrects={corrects}
                        busy={busy || Boolean(deadNote)}
                        onSpend={() => adjustUsage({ slots: { [slotLevel]: slot.used + 1 } })}
                        onRecover={() => adjustUsage({ slots: { [slotLevel]: slot.used - 1 } })}
                      />
                    ))}
                    {sheet.spellcasting.pact ? (
                      <SlotRow
                        label={t("sheetDialog.slots.pact", { level: locale === "en" ? ROMAN[sheet.spellcasting.pact.level] ?? sheet.spellcasting.pact.level : sheet.spellcasting.pact.level })}
                        left={sheet.spellcasting.pact.max - sheet.spellcasting.pact.used}
                        max={sheet.spellcasting.pact.max}
                        spends={spends}
                        corrects={corrects}
                        busy={busy || Boolean(deadNote)}
                        onSpend={() => adjustUsage({ pactUsed: (sheet.spellcasting?.pact?.used ?? 0) + 1 })}
                        onRecover={() => adjustUsage({ pactUsed: (sheet.spellcasting?.pact?.used ?? 0) - 1 })}
                      />
                    ) : null}
                  </div>
                  <p className="text-[11px] leading-snug text-stone-500">
                    {t("sheetDialog.slots.help", {
                      pact: sheet.class === "warlock" || sheet.spellcasting.pact ? t("sheetDialog.slots.pactRest") : "",
                      correction: corrects ? t("sheetDialog.slots.corrects") : mine ? t("sheetDialog.slots.mine") : "",
                    })}
                  </p>
                </div>
              ) : null}
              <div className="reveal mt-3">
                <SheetSpells sheet={sheet} editable={mine} />
              </div>
            </SheetBlock>
          ) : null}

          {spends || Object.keys(sheet.resources).length ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.resources")}>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <span className="w-36 shrink-0 pt-1 text-stone-400">
                    <GameTerm id="hit_dice">{t("sheetDialog.hitDice")}</GameTerm>
                  </span>
                  {/* SRD 5.1: hit dice are spent at the end of a short rest.
                      A player at the table chooses their own while the rest's
                      window is open (POST /sheet/hit-dice, which rolls and
                      heals); the DM seats and the lead correct the count. */}
                  <HitDiceSpend sheet={sheet} mine={mine} inCombat={inCombat} />
                  {corrects && !(sheet.hitDicePools?.length ?? 0) ? (
                    <button
                      type="button"
                      className={STEP_BUTTON}
                      disabled={busy || sheet.hitDice.spent >= sheet.hitDice.total}
                      title={t("sheetDialog.hitDice.spendCorrection")}
                      onClick={() => adjustUsage({ hitDiceSpent: sheet.hitDice.spent + 1 })}
                    >
                      <Minus className="size-3" />
                    </button>
                  ) : null}
                  {corrects && !(sheet.hitDicePools?.length ?? 0) ? (
                    <button
                      type="button"
                      className={STEP_BUTTON}
                      disabled={busy || sheet.hitDice.spent <= 0}
                      title={t("sheetDialog.hitDice.recoverCorrection")}
                      onClick={() => adjustUsage({ hitDiceSpent: sheet.hitDice.spent - 1 })}
                    >
                      <Plus className="size-3" />
                    </button>
                  ) : null}
                </div>
                {Object.entries(sheet.resources).map(([id, pool]) => (
                  <ResourceRow
                    key={id}
                    id={id}
                    pool={pool}
                    name={resourceLabel(id, RESOURCE_NAMES.get(id) ?? titleCase(id), locale)}
                    help={sheetResourceHelp(id, RESOURCE_HELP.get(id), locale)}
                    spends={spends}
                    corrects={corrects}
                    busy={busy}
                    deadNote={deadNote}
                    onSpend={() => adjustUsage({ resources: { [id]: pool.used + 1 } })}
                    onRecover={() => adjustUsage({ resources: { [id]: pool.used - 1 } })}
                  />
                ))}
              </div>
              {spends ? (
                <p className="reveal mt-1.5 text-[11px] text-stone-500">
                  {t(corrects ? "sheetDialog.resources.corrects" : "sheetDialog.resources.mine")}{" "}
                  {t("sheetDialog.resources.log")}
                </p>
              ) : null}
              {refusal?.at === "usage" ? (
                <p role="alert" className="reveal mt-1.5 text-[11px] text-amber-300">
                  {sheetUsageMessage(refusal.text, locale)}
                </p>
              ) : null}
            </SheetBlock>
          ) : null}

          {sheet.equipment.length ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.equipment")} aside={t("sheetDialog.attuned", { count: attunedCount, max: attunementSlotsFor(sheet) })}>
              <EquipmentChips
                equipment={sheet.equipment}
                extra={(index) => {
                  const item = sheet.equipment[index];
                  return item ? itemStatus(sheet, item, locale).charges : null;
                }}
              />
              {mine && wearable.length ? (
                <div className="reveal mt-2 space-y-1">
                  <p className="text-[11px] text-stone-500">
                    {t("sheetDialog.gear.note", { armor: sheet.acOverride ? t("sheetDialog.gear.pinned") : sheetArmorParts(armor.parts, locale), count: attunedCount, max: attunementSlotsFor(sheet) })}
                  </p>
                  {magic.sources.length ? (
                    <p className="reveal text-[11px] text-sky-400/80">
                      {t("sheetDialog.magic", { effects: [
                        magic.acBonus ? t("sheetDialog.magic.ac", { bonus: magic.acBonus }) : null,
                        magic.saveBonus ? t("sheetDialog.magic.saves", { bonus: magic.saveBonus }) : null,
                        ...Object.entries(magic.abilitySet).map(
                          ([ability, score]) => `${locale === "en" ? ability.toUpperCase() : abilityLabel(ability, locale, true)} ${score}`,
                        ),
                        magic.resistances.length ? t("sheetDialog.magic.resist", { types: damageListLabel(magic.resistances.join(", "), locale) }) : null,
                      ]
                        .filter(Boolean)
                        .join(" \u00b7 ") || t("sheetDialog.magic.worn") })}
                    </p>
                  ) : null}
                  {wearable.map((item) => (
                    <SheetGearRow
                      key={item.name}
                      sheet={sheet}
                      item={item}
                      worn={item.equipped ?? !anyEquipped}
                      inCombat={inCombat}
                      myTurn={myTurn}
                      dead={dead}
                      busy={busy}
                      onGear={(change) => adjustUsage({ gear: { [item.name]: change } }, "gear")}
                    />
                  ))}
                  {refusal?.at === "gear" ? (
                    <p role="alert" className="reveal text-[11px] text-amber-300">
                      {sheetUsageMessage(refusal.text, locale)}
                    </p>
                  ) : null}
                  {timeNote ? (
                    <p key={timeNote} role="status" className="animate-fade-up text-[11px] text-sky-200/90">
                      {sheetTimePassed(timeNote, locale)}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </SheetBlock>
          ) : null}

          {owedChoices(sheet).length ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.owed")}>
              <p className="text-sm text-amber-200/90">
                {t("sheetDialog.owed.note", { choices: owedChoices(sheet).map(choice => sheetOwedChoice(choice, locale)).join("; ") })}
              </p>
            </SheetBlock>
          ) : null}
          {sheet.features.length ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.features")}>
              <FeatureChips features={sheet.features} classId={sheet.class} subclass={sheet.subclass} classes={sheet.classes} />
              <FeatureChoicePicker sheet={sheet} mine={mine} inCombat={inCombat} campaignLocale={campaignLocale} />
            </SheetBlock>
          ) : null}

          {sheet.feats.length ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.feats")}>
              <FeatChips feats={sheet.feats} classId={sheet.class} subclass={sheet.subclass} />
            </SheetBlock>
          ) : null}

          {sheet.backstory ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.backstory")}>
              <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-stone-300">{sheet.backstory}</p>
            </SheetBlock>
          ) : null}

          {mine && sheet.notes ? (
            <SheetBlock className="mt-4" title={t("sheetDialog.notes")} aside={t("sheetDialog.notes.private")}>
              <p className="whitespace-pre-wrap text-xs text-stone-300">{sheet.notes}</p>
            </SheetBlock>
          ) : null}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={pdfBusy}
              className={ui.btnSmall}
              title={t("sheetDialog.pdf.tip")}
            >
              <FileDown className="size-3.5" /> {t(pdfBusy ? "sheetDialog.pdf.preparing" : "sheetDialog.pdf.download")}
            </button>
            {steersStory && onAdjust ? (
              <button
                type="button"
                onClick={onAdjust}
                className={ui.btnSmall}
                title={t("sheetDialog.adjust.tip")}
              >
                <Wrench className="size-3.5" /> {t("sheetDialog.adjust")}
              </button>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
