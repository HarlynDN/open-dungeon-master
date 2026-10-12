"use client";

import type { AppLocale } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { monsterUiText, monsterClosedTerm, monsterTypedValue } from "@/lib/i18n/monster-ui-presentations";

import { useId } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { CONDITIONS, DAMAGE_TYPES } from "@/lib/bestiary/kit";
import { BLOCK_LIMITS, SAVE_ABILITY_IDS } from "@/lib/bestiary/block-check";
import { SIZES } from "@/lib/bestiary/monster-draft";
import type { EnemyAttack } from "@/lib/bestiary/statblock";
import type { OnHitRider } from "@/lib/bestiary/attack-text";
import { Field, FieldLabel, OptionalStepper, addChip, rowIcon } from "@/app/workshop/kit";

// The half of an attack line the engine reads besides its bonus and dice
// (src/lib/dm/enemy-profile.ts, enemy-attack.ts, enemy-hit.ts): whether it
// is a melee or ranged swing, its reach and range in feet, the dice that
// ride the hit under their own damage type, and what a hit does besides
// damage, a save, a condition, a grapple's escape DC. Opened from the attack
// row; everything is optional and an attack without any of it swings as
// before.

const modeOptions = (locale: AppLocale) => [
  { value: "", label: monsterUiText("Unstated", locale) },
  { value: "melee", label: monsterUiText("Melee", locale) },
  { value: "ranged", label: monsterUiText("Ranged", locale) },
  { value: "both", label: monsterUiText("Melee or thrown", locale) },
];

const saveOptions = (locale: AppLocale) => [
  { value: "", label: monsterUiText("No save", locale) },
  ...SAVE_ABILITY_IDS.map((ability) => ({ value: ability as string, label: monsterUiText(`${ability.toUpperCase()} save`, locale) })),
];

const sizeOptions = (locale: AppLocale) => [{ value: "", label: monsterUiText("Any size", locale) }, ...SIZES.map((size) => ({ value: size as string, label: monsterUiText(`${size} or smaller`, locale) }))];

type Patch = Partial<EnemyAttack>;

function withoutUnset<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")) as T;
}

export function AttackDetails({ attack, onChange }: { attack: EnemyAttack; onChange: (next: EnemyAttack) => void }) {
  const { locale } = useLocale();
  const conditionList = useId();
  const typeList = useId();
  const set = (patch: Patch) => onChange(withoutUnset({ ...attack, ...patch }));
  const onHit = attack.onHit ?? {};
  const setOnHit = (patch: Partial<OnHitRider>) => {
    const next = withoutUnset({ ...onHit, ...patch });
    set({ onHit: Object.keys(next).length ? next : undefined });
  };
  const riders = attack.riders ?? [];
  const setRiders = (next: typeof riders) => set({ riders: next.length ? next : undefined });

  return (
    <div className="reveal grid gap-3 rounded-lg border border-stone-800 bg-stone-950/50 p-3">
      <datalist id={conditionList}>
        {CONDITIONS.map((condition) => (
          <option key={condition} value={monsterClosedTerm("condition", condition, locale)} />
        ))}
      </datalist>
      <datalist id={typeList}>
        {DAMAGE_TYPES.map((type) => (
          <option key={type} value={monsterClosedTerm("damage", type, locale)} />
        ))}
      </datalist>

      <div className="flex flex-wrap items-end gap-3">
        <Field label={monsterUiText("Kind", locale)}>
          <span className="block w-40">
            <Select
              label={monsterUiText("Melee or ranged", locale)}
              size="sm"
              value={attack.mode ?? ""}
              onChange={(mode) => set({ mode: (mode || undefined) as EnemyAttack["mode"] })}
              options={modeOptions(locale)}
            />
          </span>
        </Field>
        <Field label={monsterUiText("Spell attack", locale)}>
          <Switch label={monsterUiText("A spell attack", locale)} on={attack.spellAttack === true} onChange={(on) => set({ spellAttack: on || undefined })} />
        </Field>
        <Field label={monsterUiText("Reach", locale)}>
          <OptionalStepper label={monsterUiText("Reach in feet", locale)} min={5} max={60} step={5} suffix={monsterUiText("ft", locale)} fallback={5} value={attack.reach} onChange={(reach) => set({ reach: reach === "" ? undefined : reach })} />
        </Field>
        <Field label={monsterUiText("Range", locale)}>
          <span className="flex items-center gap-1">
            <OptionalStepper
              label={monsterUiText("Normal range in feet", locale)}
              min={5}
              max={1000}
              step={5}
              suffix={monsterUiText("ft", locale)}
              fallback={30}
              value={attack.range?.normal}
              onChange={(normal) =>
                set({ range: normal === "" ? undefined : { normal, long: Math.max(normal, attack.range?.long ?? normal * 4) } })
              }
            />
            {attack.range ? (
              <>
                <span className="text-[11px] text-stone-500">/</span>
                <OptionalStepper
                  label={monsterUiText("Long range in feet", locale)}
                  min={attack.range.normal}
                  max={2000}
                  step={5}
                  suffix={monsterUiText("ft", locale)}
                  fallback={attack.range.normal}
                  value={attack.range.long}
                  onChange={(long) => set({ range: { normal: attack.range!.normal, long: long === "" ? attack.range!.normal : long } })}
                />
              </>
            ) : null}
          </span>
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <FieldLabel>{monsterUiText("Extra dice on a hit", locale)}</FieldLabel>
        {riders.map((rider, index) => (
          <div key={index} className="live-in flex flex-wrap items-center gap-1.5">
            <input
              value={rider.dice}
              aria-label={monsterUiText("Rider dice", locale)}
              placeholder={monsterUiText("2d6", locale)}
              onChange={(event) => setRiders(riders.map((row, at) => (at === index ? { ...row, dice: event.target.value } : row)))}
              className={cn(ui.input, "w-24")}
            />
            <input
              list={typeList}
              value={monsterClosedTerm("damage", rider.type, locale)}
              aria-label={monsterUiText("Rider damage type", locale)}
              placeholder={monsterUiText("fire", locale)}
              onChange={(event) => setRiders(riders.map((row, at) => (at === index ? { ...row, type: monsterTypedValue("damage", event.target.value, locale) } : row)))}
              className={cn(ui.input, "w-28")}
            />
            <button type="button" aria-label={monsterUiText("Remove rider", locale)} onClick={() => setRiders(riders.filter((_, at) => at !== index))} className={cn(ui.iconAction, rowIcon, "hover:text-red-300")}>
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
        {riders.length < BLOCK_LIMITS.riders ? (
          <button type="button" onClick={() => setRiders([...riders, { dice: "1d6", type: "fire" }])} className={cn(ui.btnSmall, addChip, "w-fit")}>
            <Plus className="size-3" /> {monsterUiText("Rider dice", locale)}</button>
        ) : null}
        <span className="text-[11px] text-stone-500">{monsterUiText("Each rider meets its own resistance: a fire rider on a bite is halved by fire resistance, not by piercing.", locale)}</span>
      </div>

      <div className="grid gap-2">
        <FieldLabel>{monsterUiText("What a hit does besides damage", locale)}</FieldLabel>
        <div className="flex flex-wrap items-end gap-3">
          <Field label={monsterUiText("Save", locale)}>
            <span className="block w-32">
              <Select label={monsterUiText("Save against the hit", locale)} size="sm" value={onHit.save ?? ""} onChange={(save) => setOnHit({ save: (save || undefined) as OnHitRider["save"], dc: save ? onHit.dc ?? 13 : undefined })} options={saveOptions(locale)} />
            </span>
          </Field>
          {onHit.save ? (
            <Field label={monsterUiText("DC", locale)}>
              <OptionalStepper label={monsterUiText("Save DC", locale)} min={1} max={30} fallback={13} value={onHit.dc} onChange={(dc) => setOnHit({ dc: dc === "" ? 13 : dc })} />
            </Field>
          ) : null}
          <Field as="label" label={monsterUiText("Condition", locale)}>
            <input list={conditionList} value={monsterClosedTerm("condition", onHit.condition ?? "", locale)} placeholder={monsterUiText("grappled", locale)} onChange={(event) => setOnHit({ condition: monsterTypedValue("condition", event.target.value.toLowerCase(), locale) || undefined })} className={cn(ui.input, "w-32")} />
          </Field>
          <Field as="label" label={monsterUiText("And also", locale)}>
            <input list={conditionList} value={monsterClosedTerm("condition", onHit.alsoCondition ?? "", locale)} placeholder={monsterUiText("restrained", locale)} onChange={(event) => setOnHit({ alsoCondition: monsterTypedValue("condition", event.target.value.toLowerCase(), locale) || undefined })} className={cn(ui.input, "w-32")} />
          </Field>
          <Field label={monsterUiText("Escape DC", locale)}>
            <OptionalStepper label={monsterUiText("Escape DC", locale)} min={1} max={30} fallback={13} value={onHit.escapeDc} onChange={(escapeDc) => setOnHit({ escapeDc: escapeDc === "" ? undefined : escapeDc })} />
          </Field>
          <Field label={monsterUiText("Rounds", locale)}>
            <OptionalStepper label={monsterUiText("Rounds the condition lasts", locale)} min={1} max={100} fallback={10} value={onHit.rounds} onChange={(rounds) => setOnHit({ rounds: rounds === "" ? undefined : rounds })} />
          </Field>
          <Field label={monsterUiText("Save again each turn", locale)}>
            <Switch label={monsterUiText("Repeat the save at the end of each turn", locale)} on={onHit.repeatSave === true} onChange={(on) => setOnHit({ repeatSave: on || undefined })} />
          </Field>
          <Field label={monsterUiText("Works on", locale)}>
            <span className="block w-40">
              <Select label={monsterUiText("Largest size it works on", locale)} size="sm" value={onHit.maxSize ?? ""} onChange={(maxSize) => setOnHit({ maxSize: maxSize || undefined })} options={sizeOptions(locale)} />
            </span>
          </Field>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Field as="label" label={monsterUiText("Damage on a failed save", locale)}>
            <input value={onHit.damage ?? ""} placeholder={monsterUiText("3d6", locale)} onChange={(event) => setOnHit({ damage: event.target.value || undefined, damageType: event.target.value ? onHit.damageType ?? "poison" : undefined })} className={cn(ui.input, "w-24")} />
          </Field>
          {onHit.damage ? (
            <>
              <Field as="label" label={monsterUiText("Type", locale)}>
                <input list={typeList} value={monsterClosedTerm("damage", onHit.damageType ?? "", locale)} placeholder={monsterUiText("poison", locale)} onChange={(event) => setOnHit({ damageType: monsterTypedValue("damage", event.target.value, locale) || undefined })} className={cn(ui.input, "w-28")} />
              </Field>
              <Field label={monsterUiText("Half on a success", locale)}>
                <Switch label={monsterUiText("Half damage on a successful save", locale)} on={onHit.halfOnSave === true} onChange={(on) => setOnHit({ halfOnSave: on || undefined })} />
              </Field>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
