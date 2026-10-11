"use client";

import { GameIcon } from "@/components/ui/GameIcon";
import { cn } from "@/lib/cn";
import { isWornGear, itemStatus } from "@/components/sheet/sheet-state";
import { armorChangeMinutes } from "@/lib/dm/don-doff";
import { matchArmor } from "@/lib/srd/armor";
import { matchMagicItem } from "@/lib/srd/magic-items";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { referenceDisplayName } from "@/lib/i18n/references";
import { sheetTimePassed, sheetUsageMessage } from "@/lib/i18n/sheet-dialog-presentations";
import type { CharacterSheet, EquipmentItem } from "@/lib/schemas/sheet";

// One wearable item on the character sheet: its charges, whether it is
// attuning or cursed, and the wear and attune toggles with the engine's
// reasons on them (who may, when, and what the clock is charged). Split from
// CharacterSheetDialog.tsx, which posts the change.
export function SheetGearRow({
  sheet,
  item,
  worn,
  inCombat,
  myTurn,
  dead,
  busy,
  onGear,
}: {
  sheet: CharacterSheet;
  item: EquipmentItem;
  worn: boolean;
  inCombat: boolean;
  myTurn: boolean;
  dead: boolean;
  busy: boolean;
  onGear: (change: { equipped?: boolean; attuned?: boolean }) => void;
}) {
  const { locale, t } = useLocale();
  // Magic gear works only while worn, so every row here can
  // be put on; only body armor is barred in a fight.
  const isArmor = matchArmor(item.name) !== null;
  const isShield = matchArmor(item.name)?.category === "shield";
  const armorLocked = inCombat && isArmor && !isShield;
  // A shield takes the action, on the character's own turn.
  const shieldLocked = inCombat && isShield && !myTurn;
  const status = itemStatus(sheet, item, locale);
  // Only an item that asks for attunement offers it; plain
  // armor and "+1" gear work without one, and the server
  // refuses the rest (srd/magic-items.ts attunementProblem).
  // One already attuned keeps the control so it can end.
  const def = matchMagicItem(item.name, item.slug);
  const attunable =
    Boolean(item.attuned) ||
    Boolean(item.gear?.magic?.requiresAttunement) ||
    Boolean(def?.requiresAttunement);
  return (
    <div className="flex items-center gap-2 text-xs text-stone-300">
      <GameIcon icon={{ kind: "item", key: item.name, family: "item-gear" }} size="size-6" />
      <span className="min-w-0 grow truncate">{referenceDisplayName("equipment", item.name, locale)}</span>
      {status.charges ? (
        <span key={status.charges} className="motion-pop shrink-0 font-mono text-[10px] text-sky-300">
          {status.charges}
        </span>
      ) : null}
      {status.attuning ? (
        <span className="motion-pop shrink-0 rounded-full border border-sky-800/60 px-1.5 text-[10px] text-sky-300" title={t("sheetDialog.gear.attuningTip")}>
          {t("sheetDialog.gear.attuning")}
        </span>
      ) : null}
      {status.cursed ? (
        <span className="motion-pop shrink-0 rounded-full border border-red-800/60 px-1.5 text-[10px] text-red-300" title={status.attuneRefusal ? sheetUsageMessage(status.attuneRefusal, locale) : t("sheetDialog.gear.cursedTip")}>
          {t("sheetDialog.gear.cursed")}
        </span>
      ) : null}
      {/* Only what is worn or wielded offers it: a wand is held, a potion carried. */}
      {isWornGear(item) ? (
      <button
        type="button"
        disabled={busy || armorLocked || shieldLocked || dead}
        aria-busy={busy}
        title={
          dead
            ? t("sheetDialog.gear.dead", { name: sheet.name })
            : !inCombat
              ? // What the route will charge the clock (don-doff.ts), before the press.
                sheetTimePassed(armorChangeMinutes(sheet.equipment, { [item.name]: { equipped: !worn } }).lines.join(" "), locale) || undefined
              : !isArmor
                ? undefined
                : isShield
                  ? shieldLocked
                    ? t("sheetDialog.gear.shieldLocked")
                    : t("sheetDialog.gear.shield")
                  : t("sheetDialog.gear.armorLocked")
        }
        onClick={() => onGear({ equipped: !worn })}
        className={cn(
          "motion-press rounded border px-1.5 py-0.5",
          worn
            ? "border-amber-700/70 bg-amber-950/40 text-amber-200"
            : "border-stone-700 text-stone-400",
        )}
      >
        {t(worn ? "sheetDialog.gear.worn" : "sheetDialog.gear.wear")}
      </button>
      ) : null}
      {attunable ? (
      <button
        type="button"
        disabled={busy || inCombat || dead || Boolean(status.attuneRefusal)}
        // The engine's refusal (attunementRefusal: a curse,
        // the three-item cap, who may attune).
        title={
          inCombat
            ? t("sheetDialog.gear.attuneLocked")
            : (status.attuneRefusal ? sheetUsageMessage(status.attuneRefusal, locale) :
              // Ending it on purpose moves the clock an hour (don-doff.ts).
              (item.attuned
                ? sheetTimePassed(armorChangeMinutes(sheet.equipment, { [item.name]: { attuned: false } }).lines.join(" "), locale)
                : undefined))
        }
        onClick={() => onGear({ attuned: !(item.attuned || item.attuning) })}
        className={cn(
          "motion-press rounded border px-1.5 py-0.5 disabled:opacity-40",
          item.attuned
            ? "border-sky-800/70 bg-sky-950/40 text-sky-200"
            : "border-stone-700 text-stone-400",
        )}
      >
        {t(item.attuned ? "sheetDialog.gear.attuned" : item.attuning ? "sheetDialog.gear.cancel" : "sheetDialog.gear.attune")}
      </button>
      ) : null}
    </div>
  );
}
