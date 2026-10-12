"use client";

import type { AppLocale } from "@/lib/i18n/locales";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { monsterUiText, monsterUiFrame } from "@/lib/i18n/monster-ui-presentations";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { ui } from "@/lib/ui";
import { RulebookDialog } from "@/components/rulebook/RulebookDialog";
import { cn } from "@/lib/cn";
import type { PrintedAbility, PrintedBlock } from "@/lib/bestiary/statblock";
import type { MonsterDraft } from "@/lib/bestiary/monster-draft";

// The whole block as the book printed it (src/lib/bestiary/statblock.ts
// printedBlockOf), word for word, each entry marked with who runs it: the
// engine, or the DM. A copy keeps it beside the compact lines the fights
// read, so a vampire's weaknesses or a kraken's Freedom of Movement are
// still there to run after the copy is renamed and saved. A copy names the
// entry it came from and opens its rulebook page over the editor.

const sections = (locale: AppLocale): Array<{ key: keyof Omit<PrintedBlock, "legendaryDesc" | "source">; title: string }> => [
  { key: "traits", title: monsterUiText("Traits", locale) },
  { key: "actions", title: monsterUiText("Actions", locale) },
  { key: "reactions", title: monsterUiText("Reactions", locale) },
  { key: "legendary", title: monsterUiText("Legendary actions", locale) },
];

function AbilityRow({ ability }: { ability: PrintedAbility }) {
  const { locale } = useLocale();
  return (
    <li className="space-y-0.5">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display tracking-wide text-amber-100">{ability.name}.</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-px text-[10px] uppercase tracking-wider",
            ability.engine === "runs" ? "bg-emerald-950/60 text-emerald-300" : "bg-amber-950/50 text-amber-300",
          )}
        >
          {ability.engine === "runs" ? monsterUiText("the engine runs it", locale) : monsterUiText("yours to run", locale)}
        </span>
      </p>
      <p className="text-stone-300">{ability.desc}</p>
    </li>
  );
}

export function PrintedBlockView({ draft }: { draft: MonsterDraft }) {
  const { locale } = useLocale();
  const printed = draft.stats.printed;
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState(false);
  if (!printed) {
    return null;
  }
  const total = sections(locale).reduce((sum, section) => sum + printed[section.key].length, 0);
  const unrun = sections(locale).reduce((sum, section) => sum + printed[section.key].filter((ability) => ability.engine === "text").length, 0);
  return (
    <div className="panel rounded-lg text-xs" data-testid="printed-block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="motion-press flex w-full items-center gap-2 px-3 py-2 text-left"
      >
        <span className="font-display tracking-wide text-amber-200/80">{monsterUiText("The printed block", locale)}</span>
        <span className="text-stone-500">
          {monsterUiFrame(total === 1 ? "printedOne" : "printedMany", { total, unrun }, locale)}
        </span>
        <ChevronDown className={cn("ml-auto size-3.5 text-stone-500 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {printed.source ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-stone-800 px-3 py-1.5 text-stone-400" data-testid="printed-source">
          <span>
            {monsterUiFrame("copySource", { name: printed.source.name, document: printed.source.document || monsterUiText("the published books", locale) }, locale)}
          </span>
          {printed.source.rulebook ? (
            <button type="button" onClick={() => setReading(true)} className={cn(ui.btnSmall, "motion-press gap-1")}>
              <BookOpen className="size-3.5" /> {monsterUiText("Read it in the rulebook", locale)}</button>
          ) : null}
          {printed.source.rulebook ? <RulebookDialog open={reading} onOpenChange={setReading} startAt={printed.source.rulebook} /> : null}
        </div>
      ) : null}
      {open ? (
        <div className="reveal space-y-3 border-t border-stone-800 px-3 py-2">
          {sections(locale).filter((section) => printed[section.key].length).map((section) => (
            <section key={section.key} className="space-y-1.5">
              <h4 className="text-[11px] uppercase tracking-wider text-stone-500">{section.title}</h4>
              {section.key === "legendary" && printed.legendaryDesc ? <p className="text-stone-400">{printed.legendaryDesc}</p> : null}
              <ul className="stagger space-y-2">
                {printed[section.key].map((ability) => (
                  <AbilityRow key={`${section.key}:${ability.name}`} ability={ability} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
