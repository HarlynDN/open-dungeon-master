"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { monsterUiText, monsterUiFrame, monsterUiError } from "@/lib/i18n/monster-ui-presentations";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { ContentPick } from "@/components/ui/ContentPick";
import { SectionHead } from "@/components/ui/SectionHead";
import { parseMonster, type EnemyStats } from "@/lib/bestiary/statblock";
import { draftFromData, type MonsterDraft } from "@/lib/bestiary/monster-draft";
import { borrowBlocked, borrowInto, borrowParts, type BorrowPart } from "@/lib/bestiary/borrow";
import { addChip, chipRow } from "@/app/workshop/kit";

// Take one part of any monster in the books onto this one: the attack with
// its reach and riders, the breath with its DC and recharge, the whole
// spellcasting block, the regeneration. Pick, do not type: what lands is
// what the engine already runs for the published monster.

const KIND_WORDS: Record<BorrowPart["kind"], string> = {
  attack: "Attack",
  ability: "Action",
  trait: "Trait",
  spellcasting: "Spells",
  regeneration: "Regeneration",
};

function statsOf(entry: { source: string; name: string; data: Record<string, unknown> }): EnemyStats {
  if (entry.source === "homebrew") {
    return draftFromData(entry.name, entry.data).stats;
  }
  const cr = typeof entry.data.cr === "number" ? entry.data.cr : 0;
  return parseMonster(entry.data, cr);
}

export function BorrowParts({ draft, onChange }: { draft: MonsterDraft; onChange: (draft: MonsterDraft) => void }) {
  const { locale } = useLocale();
  const [source, setSource] = useState<{ name: string; parts: BorrowPart[] } | null>(null);
  const [taken, setTaken] = useState<Set<string>>(() => new Set());
  return (
    <div className="flex flex-col gap-2">
      <SectionHead title={monsterUiText("Borrow from the books", locale)} glyph="tab-reference" className="mb-0" />
      <ContentPick
        kind="monsters"
        label={monsterUiText("Find a monster to borrow a part from", locale)}
        placeholder={monsterUiText("Borrow from... adult red dragon, ghoul, mage", locale)}
        onPick={(entry) => {
          setSource({ name: entry.name, parts: borrowParts(statsOf(entry)) });
          setTaken(new Set());
        }}
      />
      {source ? (
        <div className="reveal flex flex-col gap-1 rounded-lg border border-stone-800 bg-stone-950/50 p-2">
          <span className="flex items-center justify-between gap-2 text-xs text-stone-300">
            {monsterUiText("From", locale)}{source.name}
            <button type="button" aria-label={monsterUiText("Close the borrowed monster", locale)} onClick={() => setSource(null)} className={ui.iconAction}>
              <X className="size-3.5" />
            </button>
          </span>
          {source.parts.length ? (
            <ul className="stagger-up flex flex-col gap-1">
              {source.parts.map((part) => {
                const blocked = borrowBlocked(draft, part);
                const done = taken.has(part.key);
                return (
                  <li key={part.key} className={cn(chipRow, "flex-nowrap items-start")}>
                    <button
                      type="button"
                      disabled={Boolean(blocked) && !done}
                      title={blocked ? monsterUiError(blocked, locale) : undefined}
                      onClick={() => {
                        onChange(borrowInto(draft, part));
                        setTaken((current) => new Set(current).add(part.key));
                      }}
                      className={cn(ui.btnSmall, addChip, "shrink-0", done && "border-emerald-500/40 text-emerald-200")}
                    >
                      {done ? <Check className="size-3" /> : <Plus className="size-3" />}
                      {monsterUiText(KIND_WORDS[part.kind], locale)}
                    </button>
                    <span className="min-w-0 text-[11px] leading-snug text-stone-400">{part.label}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[11px] text-stone-500">{monsterUiText("Nothing on this block travels on its own.", locale)}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
