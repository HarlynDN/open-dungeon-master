"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { abilityHpSteps } from "@/lib/i18n/ability-ui-presentations";
import { useState, type CSSProperties } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Ribbon } from "@/components/ui/Ribbon";
import { cn } from "@/lib/cn";
import { formatModifier } from "@/lib/srd";
import { ui } from "@/lib/ui";
import { hpBreakdown } from "./abilityDice";

const stagger = (index: number, ms: number) => ({ "--i": index, "--stagger": `${ms}ms` }) as CSSProperties;

// The two gold corners an explainer draws out after its panel lands.
const Brackets = () => (
  <>
    <span className="creator-bracket" data-corner="tl" aria-hidden="true" />
    <span className="creator-bracket" data-corner="br" aria-hidden="true" />
  </>
);

// The small round "?" that opens an explainer, sized for a thumb.
export function HelpDot({ label, onClick, className }: { label: string; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-[var(--ease-spring)] active:scale-90",
        className,
      )}
    >
      <span className="flex size-[18px] items-center justify-center rounded-full border border-amber-500/45 font-mono text-[10px] leading-none text-amber-300 transition-[border-color,box-shadow,color] duration-[var(--dur-quick)] group-hover:border-amber-500/90 group-hover:text-amber-100 group-hover:shadow-glow-gold group-focus-visible:border-amber-500/90">
        ?
      </span>
    </button>
  );
}

// Which of the three ways to use is the question a first character actually
// gets stuck on, so all three answers sit side by side with the chosen one lit.
export function MethodInfoDialog({
  open,
  onOpenChange,
  methods,
  current,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  methods: Array<{ id: string; label: string; info: string }>;
  current: string;
}) {
  const { t } = useLocale();
  const chosen = methods.find((entry) => entry.id === current) ?? methods[0];
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={chosen.label} width="w-[min(94vw,26rem)]">
      <Brackets />
      <Ribbon className="mb-3">{t("abilityUi.threeWays")}</Ribbon>
      <div className="flex flex-col gap-2">
        {methods.map((entry, index) => {
          const isCurrent = entry.id === current;
          return (
            <div
              key={entry.id}
              style={stagger(index, 120)}
              className={cn(
                "creator-cascade rounded-[10px] border px-3 py-2.5",
                isCurrent ? "border-amber-500/50 bg-amber-950/35" : "border-stone-700/50 bg-stone-950/60",
              )}
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className={cn("font-display text-[13px] font-semibold", isCurrent ? "text-amber-100" : "text-stone-200")}>
                  {entry.label}
                </span>
                {isCurrent ? (
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-amber-300">{t("abilityUi.chosen")}</span>
                ) : null}
              </div>
              <p className="font-serif text-[12.5px] leading-normal text-stone-300">{entry.info}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => onOpenChange(false)} className={ui.btnPrimary}>
          {t("common.close")}
        </button>
      </div>
    </Dialog>
  );
}

// What the health explainer needs to show its working. The builder suggests
// Max HP from these (suggestedStartingHp); `override` is the number typed on
// the last step, which wins when present.
export type HpExplainerInput = {
  className: string;
  hitDie: number;
  con: number;
  level: number;
  bonusPerLevel?: number;
  override?: number | null;
};

function FormulaChip({
  label,
  value,
  note,
  tone = "plain",
  index,
}: {
  label: string;
  value: string;
  note: string;
  tone?: "plain" | "result";
  index: number;
}) {
  return (
    <span
      style={stagger(index, 70)}
      className={cn(
        "creator-chip-in flex min-w-[82px] flex-col items-center gap-0.5 rounded-[9px] border px-3 py-2",
        tone === "result" ? "border-ember-600/50 bg-ember-600/10" : "border-stone-600/45 bg-stone-950/70",
      )}
    >
      <span
        className={cn(
          "text-center font-display text-[8px] font-semibold uppercase tracking-[0.16em]",
          tone === "result" ? "text-ember-300" : "text-stone-500",
        )}
      >
        {label}
      </span>
      <span className={cn("font-display text-xl font-bold leading-tight", tone === "result" ? "text-ember-300" : "text-amber-100")}>
        {value}
      </span>
      <span className="text-center font-mono text-[9px] text-stone-500">{note}</span>
    </span>
  );
}

const Op = ({ children }: { children: string }) => (
  <span className="font-display text-lg font-bold text-stone-500" aria-hidden="true">
    {children}
  </span>
);

export function HpExplainerDialog({
  open,
  onOpenChange,
  hp,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hp: HpExplainerInput;
}) {
  const { locale, t } = useLocale();
  const parts = hpBreakdown(hp);
  const later = hp.level > 1;
  const signed = (value: number) => `${value >= 0 ? "+" : "-"} ${Math.abs(value)}`;
  const sum = later
    ? `${parts.firstLevel} + ${hp.level - 1} x ${parts.perLevel} = ${parts.total}`
    : `${parts.hitDie} ${signed(parts.conMod)}${parts.bonusPerLevel ? ` + ${parts.bonusPerLevel}` : ""} = ${parts.total}`;
  const steps = abilityHpSteps(hp, locale);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={t("abilityUi.hpTitle")} width="w-[min(94vw,26rem)]">
      <Brackets />
      <p className="mb-4 font-serif text-[13.5px] leading-normal text-stone-300">
        {t("abilityUi.hpIntro")}
      </p>
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <FormulaChip index={0} label={t("abilityUi.hpHitMax")} value={`d${parts.hitDie}`} note={hp.className} />
        <Op>+</Op>
        <FormulaChip index={1} label={t("abilityUi.hpConMod")} value={formatModifier(parts.conMod)} note={`(${hp.con})`} />
        {later ? (
          <>
            <Op>+</Op>
            <FormulaChip
              index={2}
              label={t("abilityUi.hpLevels", { level: hp.level })}
              value={String(parts.laterLevels)}
              note={`${hp.level - 1} x ${parts.perLevel}`}
            />
          </>
        ) : null}
        <Op>=</Op>
        <FormulaChip
          index={later ? 3 : 2}
          tone="result"
          label={t(later ? "abilityUi.hpMax" : "abilityUi.hpStarting")}
          value={String(parts.total)}
          note={t("abilityUi.hpFull")}
        />
      </div>
      <p className="mb-3.5 text-center font-mono text-[13px] text-amber-300">{sum}</p>
      {parts.bonusPerLevel ? (
        <p className="mb-3 text-center font-mono text-[10.5px] text-stone-500">
          {t("abilityUi.hpBonus", { bonus: parts.bonusPerLevel })}
        </p>
      ) : null}
      <ol className="flex flex-col gap-[7px]">
        {steps.map((text, index) => (
          <li
            key={index}
            style={stagger(index, 80)}
            className="creator-cascade flex items-start gap-2.5 rounded-[9px] border border-stone-700/50 bg-stone-950/60 px-2.5 py-2"
          >
            <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full border border-amber-500/40 font-mono text-[9.5px] text-amber-300">
              {index + 1}
            </span>
            <span className="font-serif text-[12.5px] leading-snug text-stone-300">{text}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => onOpenChange(false)} className={ui.btnPrimary}>
          {t("abilityUi.gotIt")}
        </button>
      </div>
    </Dialog>
  );
}

// The labelled button under the abilities summary, and the bare "?" beside
// the Max HP field on the last step: two doors to the same explainer.
export function HpExplainerButton({ hp, compact = false }: { hp: HpExplainerInput; compact?: boolean }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  return (
    <>
      {compact ? (
        <HelpDot label={t("abilityUi.hpTitle")} onClick={() => setOpen(true)} className="-my-2" />
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={cn(ui.btnSmall, "text-xs")}>
          <span className="flex size-[15px] items-center justify-center rounded-full border border-amber-500/50 font-mono text-[9px] text-amber-300">
            ?
          </span>
          {t("abilityUi.hpButton")}
        </button>
      )}
      <HpExplainerDialog open={open} onOpenChange={setOpen} hp={hp} />
    </>
  );
}
