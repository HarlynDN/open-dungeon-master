"use client";

import { useMemo, useState } from "react";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { Select, optionsFrom } from "@/components/ui/Select";
import { DeskCard, FieldLabel } from "@/app/campaigns/[campaignId]/DmConsoleParts";
import { asPercent, forecastAttack, roundsToDrop } from "@/lib/srd/odds";

// The consequence preview: hit chance, expected damage, and how long a target
// lasts. Pure arithmetic from src/lib/srd/odds.ts, so it is instant, always
// available, and needs nothing from the server.

// The only two table rules that change what a crit is worth. Named here so
// the same shape threads down from the panel without dragging the whole
// GameSettings type through three components.
export type CritRules = { powerfulCritical: boolean; criticalDamageMods: boolean };

const DAMAGE_EXAMPLE = "2d6+4";

type Roll = "none" | "advantage" | "disadvantage";
const ROLLS = optionsFrom<Roll>([
  ["none", "Straight"],
  ["advantage", "Advantage"],
  ["disadvantage", "Disadvantage"],
]);

// Hit chance, expected damage, and how long a target lasts. Pure arithmetic
// from src/lib/srd/odds.ts, so it is instant and always available.
export function OddsCalculator({
  variantRules,
}: {
  // The table's optional crit rules. The forecast runs them through the
  // engine's own critDamageExpression, so what it predicts is what the
  // server would actually roll.
  variantRules: CritRules;
}) {
  const { t } = useLocale();
  const [attackBonus, setAttackBonus] = useState(5);
  const [ac, setAc] = useState(15);
  const [damage, setDamage] = useState("1d8+3");
  const [advantage, setAdvantage] = useState<Roll>("none");
  const [hitPoints, setHitPoints] = useState(30);
  const [attacksPerRound, setAttacksPerRound] = useState(1);
  const [extraCritDice, setExtraCritDice] = useState(0);

  const forecast = useMemo(
    () =>
      forecastAttack({
        attackBonus,
        ac,
        damage,
        advantage,
        extraCritDice,
        variantRules: {
          powerfulCritical: variantRules.powerfulCritical,
          multiplyNumeric: variantRules.criticalDamageMods,
        },
      }),
    [attackBonus, ac, damage, advantage, extraCritDice, variantRules],
  );
  const perRound = forecast.perAttack * Math.max(1, attacksPerRound);
  const rounds = roundsToDrop(hitPoints, perRound);

  return (
    <DeskCard glyph="tab-dice" title={t("dmToolsUi.odds.title")}>
      {/* Divs, not labels: a label would press the stepper's minus button
          whenever its caption was tapped. Each control carries its name. */}
      <div className="grid grid-cols-1 gap-x-2 gap-y-2.5 min-[24rem]:grid-cols-2">
        <div>
          <FieldLabel>{t("dmToolsUi.odds.attackBonus")}</FieldLabel>
          <NumberStepper value={attackBonus} onChange={setAttackBonus} label={t("dmToolsUi.odds.attackBonus")} size="sm" />
        </div>
        <div>
          <FieldLabel>{t("dmToolsUi.odds.ac")}</FieldLabel>
          <NumberStepper value={ac} onChange={setAc} label={t("dmToolsUi.odds.ac")} size="sm" />
        </div>
        <div>
          <FieldLabel>{t("dmToolsUi.odds.damage")}</FieldLabel>
          <input
            value={damage}
            onChange={(event) => setDamage(event.target.value)}
            placeholder={DAMAGE_EXAMPLE}
            aria-label={t("dmToolsUi.odds.damage")}
            className={ui.input}
          />
        </div>
        <div>
          <FieldLabel>{t("dmToolsUi.odds.roll")}</FieldLabel>
          <Select value={advantage} onChange={setAdvantage} options={ROLLS.map(option => ({ ...option, label: t(`dmToolsUi.roll.${option.value}`) }))} label={t("dmToolsUi.odds.roll")} />
        </div>
        <div>
          <FieldLabel>{t("dmToolsUi.odds.hp")}</FieldLabel>
          <NumberStepper value={hitPoints} onChange={setHitPoints} label={t("dmToolsUi.odds.hp")} size="sm" />
        </div>
        <div>
          <FieldLabel>{t("dmToolsUi.odds.attacks")}</FieldLabel>
          <NumberStepper value={attacksPerRound} onChange={setAttacksPerRound} min={1} label={t("dmToolsUi.odds.attacks")} size="sm" />
        </div>
        <div title={t("dmToolsUi.odds.critTip")}>
          <FieldLabel>{t("dmToolsUi.odds.extraCrit")}</FieldLabel>
          <NumberStepper value={extraCritDice} onChange={setExtraCritDice} min={0} max={4} label={t("dmToolsUi.odds.extraCrit")} size="sm" />
        </div>
      </div>
      {forecast.exact ? null : (
        <p className="mt-2 text-xs text-amber-300/90">
          {t("dmToolsUi.odds.invalidDice")}
        </p>
      )}
      <dl className="mt-3 rounded-lg border border-amber-500/20 bg-stone-950/50 px-2.5 py-1.5 text-xs">
        <div className="dm-readout flex justify-between gap-3 py-0.5">
          <dt className="text-stone-400">{t("dmToolsUi.odds.hitChance")}</dt>
          <dd className="text-right font-medium text-amber-100">
            {asPercent(forecast.odds.hit)}
            <span className="text-stone-500">{t("dmToolsUi.odds.critChance", { chance: asPercent(forecast.odds.crit) })}</span>
          </dd>
        </div>
        <div className="dm-readout flex justify-between gap-3 py-0.5">
          <dt className="text-stone-400">{t("dmToolsUi.odds.onHit")}</dt>
          <dd className="text-right font-medium text-amber-100">
            {forecast.exact ? (
              <>
                {forecast.onHit.toFixed(1)}
                <span className="text-stone-500">{t("dmToolsUi.odds.critDamage", { amount: forecast.onCrit.toFixed(1) })}</span>
              </>
            ) : (
              t("dmToolsUi.odds.unknown")
            )}
          </dd>
        </div>
        <div className="dm-readout flex justify-between gap-3 py-0.5">
          <dt className="text-stone-400">{t("dmToolsUi.odds.perRound")}</dt>
          <dd className="text-right font-medium text-amber-100">{forecast.exact ? perRound.toFixed(1) : t("dmToolsUi.odds.unknown")}</dd>
        </div>
        <div className="dm-readout flex justify-between gap-3 py-0.5">
          <dt className="text-stone-400">{t("dmToolsUi.odds.rounds")}</dt>
          <dd className="text-right font-medium text-amber-100">
            {!forecast.exact ? t("dmToolsUi.odds.unknown") : rounds === null ? t("dmToolsUi.odds.never") : rounds}
          </dd>
        </div>
      </dl>
    </DeskCard>
  );
}
