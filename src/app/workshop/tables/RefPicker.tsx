"use client";

import { encounterPrepError } from "@/lib/i18n/encounter-prep-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ROLL_REF_KINDS, type RollRefKind } from "@/lib/dm/roll-table-logic";
import type { RollTable } from "@/lib/db/roll-tables";
import { AddFromList } from "@/components/ui/AddFromList";
import { ContentPick } from "@/components/ui/ContentPick";
import { GameIcon } from "@/components/ui/GameIcon";
import { Select } from "@/components/ui/Select";
import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { readLoad } from "@/lib/load-state";

// A row that IS a thing: "@monster: wolf", "@table: Gems". The table body
// takes them typed, which means knowing the exact name of everything in the
// workshop. This picks instead: choose what kind of thing, then the thing
// itself from what this world actually holds (its tables, the DM's own
// monsters and the catalogue's, the content pack's items, the cast, the
// lore), and the row lands in the body.

const KIND_MESSAGES = {
  table: "encounterPrep.ref.table", monster: "encounterPrep.ref.monster", item: "encounterPrep.ref.item", npc: "encounterPrep.ref.npc", lore: "encounterPrep.ref.lore",
} as const;

const KIND_GLYPHS: Record<RollRefKind, string> = {
  table: "system-tables",
  monster: "system-bestiary",
  item: "tab-loot",
  npc: "system-cast",
  lore: "system-lore",
};

type Named = { name: string };

export function RefPicker({
  campaignId,
  tables,
  editingId,
  onInsert,
}: {
  campaignId: string;
  // The world's tables when the caller already holds them (the tables tool
  // does); otherwise read here the first time that kind is chosen.
  tables?: RollTable[];
  // The table being edited, kept out of its own list.
  editingId: string;
  onInsert: (line: string) => void;
}) {
  const { locale, t } = useLocale();
  const kindOptions = ROLL_REF_KINDS.map(value => ({ value, label: t(KIND_MESSAGES[value]), icon: { kind: "glyph" as const, key: KIND_GLYPHS[value] } }));
  const [kind, setKind] = useState<RollRefKind>("table");
  const [npcs, setNpcs] = useState<Named[] | null>(null);
  const [lore, setLore] = useState<Named[] | null>(null);
  const [monsters, setMonsters] = useState<Named[] | null>(null);
  const [fetchedTables, setFetchedTables] = useState<RollTable[] | null>(null);
  // A list that did not load is said so, by kind, with a way to ask again
  // (issue 140); it is never shown as "nothing of that kind yet".
  const [loadErrors, setLoadErrors] = useState<Partial<Record<RollRefKind, string>>>({});
  const [retries, setRetries] = useState(0);

  // Each list is fetched once, the first time its kind is chosen; the
  // state lands in .then so the effect reads as a subscription.
  useEffect(() => {
    const failed = (which: RollRefKind, error: string) => setLoadErrors((current) => ({ ...current, [which]: error }));
    if (kind === "table" && !tables && fetchedTables === null && !loadErrors.table) {
      readLoad<{ tables?: RollTable[] }>(fetch(`/api/campaigns/${campaignId}/dm/roll-tables`), "The tables").then((outcome) =>
        outcome.payload ? setFetchedTables(outcome.payload.tables ?? []) : failed("table", outcome.error),
      );
    }
    if (kind === "npc" && npcs === null && !loadErrors.npc) {
      readLoad<{ npcs?: Named[] }>(fetch(`/api/campaigns/${campaignId}/dm/npcs`), "The cast").then((outcome) =>
        outcome.payload ? setNpcs(outcome.payload.npcs ?? []) : failed("npc", outcome.error),
      );
    }
    if (kind === "lore" && lore === null && !loadErrors.lore) {
      readLoad<{ entries?: Array<{ title: string }> }>(fetch(`/api/campaigns/${campaignId}/lore`), "The lore").then((outcome) =>
        outcome.payload ? setLore((outcome.payload.entries ?? []).map((entry) => ({ name: entry.title }))) : failed("lore", outcome.error),
      );
    }
    if (kind === "monster" && monsters === null && !loadErrors.monster) {
      readLoad<{ monsters?: Array<{ draft: { name: string } }> }>(fetch(`/api/campaigns/${campaignId}/dm/bestiary`), "The bestiary").then((outcome) =>
        outcome.payload ? setMonsters((outcome.payload.monsters ?? []).map((monster) => ({ name: monster.draft.name }))) : failed("monster", outcome.error),
      );
    }
  }, [kind, campaignId, npcs, lore, monsters, tables, fetchedTables, loadErrors, retries]);
  const retry = () => {
    setLoadErrors((current) => ({ ...current, [kind]: undefined }));
    setRetries((current) => current + 1);
  };

  const insert = (name: string) => onInsert(`@${kind}: ${name}`);

  const listFor = (): Named[] | null => {
    switch (kind) {
      case "table":
        return (tables ?? fetchedTables)?.filter((table) => table.id !== editingId) ?? null;
      case "npc":
        return npcs;
      case "lore":
        return lore;
      case "monster":
        return monsters;
      default:
        return null;
    }
  };
  const list = listFor();

  return (
    <div className="flex flex-wrap items-center gap-1.5" data-tour="tables-ref">
      <GameIcon icon={{ kind: "glyph", key: "tab-reference" }} size="size-6" />
      <span className="w-56">
        <Select<RollRefKind> value={kind} label={t("encounterPrep.ref.kind")} onChange={setKind} options={kindOptions} size="sm" />
      </span>
      {kind === "item" ? (
        <ContentPick
          kind="items"
          label={t("encounterPrep.ref.itemLabel")}
          placeholder={t("encounterPrep.ref.itemHint")}
          onPick={(entry) => insert(entry.name)}
          className="min-w-44 flex-1"
        />
      ) : kind === "monster" ? (
        <>
          <AddFromList
            prompt={t("encounterPrep.ref.mine")}
            options={(list ?? []).map((entry) => entry.name)}
            onPick={insert}
          />
          <ContentPick
            kind="monsters"
            label={t("encounterPrep.ref.monsterLabel")}
            placeholder={t("encounterPrep.ref.monsterHint")}
            onPick={(entry) => insert(entry.name)}
            className="min-w-44 flex-1"
          />
        </>
      ) : list && list.length ? (
        <AddFromList
          prompt={t("encounterPrep.ref.add")}
          options={list.map((entry) => entry.name)}
          onPick={insert}
          className={cn("min-w-44")}
        />
      ) : list === null && loadErrors[kind] ? (
        <LoadFailed error={encounterPrepError(loadErrors[kind] ?? "", locale)} onRetry={retry} className="min-w-44" />
      ) : (
        <span className="text-xs text-stone-500">
          {list === null ? t("encounterPrep.ref.reading") : t("encounterPrep.ref.empty")}
        </span>
      )}
    </div>
  );
}
