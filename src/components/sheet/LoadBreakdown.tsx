"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { referenceDisplayName } from "@/lib/i18n/references";
import { useState } from "react";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import { CountPop } from "@/components/ui/Reveal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import {
  coinWeightLb,
  COINS_PER_POUND,
  loadLines,
  sortLoadLines,
  type Encumbrance,
  type LoadOrder,
  type LoadSort,
  type WeightSource,
} from "@/lib/srd/encumbrance";

// What the Carried tile is made of (issue #206): every line of the pack with
// its count, its weight each and its line total, the purse, and the lines
// nothing could weigh. Read-only, for anyone who can open the sheet. The
// lines are the ones the total is summed from (src/lib/srd/encumbrance.ts
// loadLines), so they add up to the tile by construction, and both redraw
// from the same sheet when it changes.

// A weight the line does not carry itself says where it came from.
const SOURCE_NOTE: Record<WeightSource, string | null> = {
  item: null,
  ammunition: "per round",
  armor: "from the SRD armor table",
  gear: "from the SRD gear table",
  weapon: "from the SRD weapon table",
};

function pounds(value: number, places: number): string {
  return `${Number(value.toFixed(places))} lb`;
}

export function LoadBreakdown({
  open,
  onOpenChange,
  name,
  equipment,
  gold,
  load,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  equipment: Array<{ name: string; qty?: number; weight?: number; equipped?: boolean }>;
  // Whole gold pieces: the coins the load weighs, as every caller of
  // encumbranceFor counts them.
  gold: number;
  load: Encumbrance;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const [key, setKey] = useState<LoadSort>("total");
  const [order, setOrder] = useState<LoadOrder>("desc");
  const lines = sortLoadLines(loadLines(equipment), key, order);
  const coins = Math.max(0, gold);
  const floor = load.unweighed > 0;
  const total = `${load.carriedLb}${floor ? "+" : ""} lb`;
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={syncT("upstreamUi.loadTitle", { name })}
      icon={<GameIcon icon={{ kind: "glyph", key: "coin-purse" }} size="size-6" />}
      width="w-[min(94vw,38rem)]"
    >
      <div className="load-breakdown space-y-3 text-sm text-stone-300">
        <p className="text-xs leading-relaxed text-stone-400">
          <CountPop value={total} className="font-display text-sm text-amber-100">
            {total}
          </CountPop>{" "}
          {syncT("upstreamUi.loadCapacity", { capacity: load.capacityLb })}{" "}
          {floor
            ? syncT(load.unweighed === 1 ? "upstreamUi.loadUnknownOne" : "upstreamUi.loadUnknownMany", { count: load.unweighed, lines: load.unweighed === 1 ? "line has" : "lines have", verb: load.unweighed === 1 ? "is" : "are" })
            : syncT("upstreamUi.28958ab853b3")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl
            size="sm"
            label={syncT("upstreamUi.c9129025bd3f")}
            value={key}
            onChange={setKey}
            options={[
              { value: "total", label: syncT("upstreamUi.ab8055a39c03") },
              { value: "each", label: syncT("upstreamUi.8e3124f76797") },
            ]}
          />
          <SegmentedControl
            size="sm"
            label={syncT("upstreamUi.6be090825c99")}
            value={order}
            onChange={setOrder}
            options={[
              { value: "desc", label: syncT("upstreamUi.9c8f331d4118"), icon: ArrowDownWideNarrow },
              { value: "asc", label: syncT("upstreamUi.064c90680a48"), icon: ArrowUpNarrowWide },
            ]}
          />
        </div>
        <table className="load-table">
          <caption className="sr-only">
            {syncT("upstreamUi.loadCaption", { name, sort: syncT(key === "total" ? "upstreamUi.loadSortTotal" : "upstreamUi.loadSortEach"), order: syncT(order === "desc" ? "upstreamUi.loadHeavy" : "upstreamUi.loadLight") })}
          </caption>
          <thead>
            <tr>
              <th scope="col">{syncT("upstreamUi.652bcc3a4784")}</th>
              <th scope="col" className="load-num">
                {syncT("upstreamUi.a9be9c3e9ab6")}</th>
              <th scope="col" className="load-num" aria-sort={key === "each" ? (order === "desc" ? "descending" : "ascending") : undefined}>
                {syncT("upstreamUi.a9531f640279")}</th>
              <th scope="col" className="load-num" aria-sort={key === "total" ? (order === "desc" ? "descending" : "ascending") : undefined}>
                {syncT("upstreamUi.c9b3c38247f7")}</th>
            </tr>
          </thead>
          {/* Keyed by the sort, so a re-sort deals the rows in again. */}
          <tbody key={`${key}-${order}`} className="stagger-up">
            {lines.map((line) => {
              const note = line.source ? (locale === "en" ? SOURCE_NOTE[line.source] : ({ item: null, ammunition: syncT("upstreamUi.loadAmmo"), armor: syncT("upstreamUi.loadArmor"), gear: syncT("upstreamUi.loadGear"), weapon: syncT("upstreamUi.loadWeapon") })[line.source]) : null;
              const worn = equipment[line.index]?.equipped;
              return (
                <tr key={line.index} data-unknown={line.totalLb === null ? "" : undefined}>
                  <th scope="row">
                    <span className="block text-stone-200">{referenceDisplayName("equipment", line.name, locale)}</span>
                    {worn || note ? (
                      <span className="block text-[11px] text-stone-500">{[worn ? syncT("upstreamUi.loadWorn") : null, note].filter(Boolean).join(", ")}</span>
                    ) : null}
                  </th>
                  <td className="load-num">{line.qty}</td>
                  <td className="load-num">{line.eachLb === null ? <span className="load-unknown">{syncT("upstreamUi.b23a6a8439c0")}</span> : pounds(line.eachLb, 3)}</td>
                  <td className="load-num">{line.totalLb === null ? <span className="load-unknown">{syncT("upstreamUi.b23a6a8439c0")}</span> : pounds(line.totalLb, 2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">
                <span className="block text-stone-200">{syncT("upstreamUi.7ae57d9d0e8c")}</span>
                <span className="block text-[11px] text-stone-500">
                  {syncT("upstreamUi.loadCoins", { coins, rate: COINS_PER_POUND })}
                </span>
              </th>
              <td className="load-num">{coins}</td>
              <td className="load-num">{pounds(1 / COINS_PER_POUND, 3)}</td>
              <td className="load-num">{pounds(coinWeightLb(coins), 2)}</td>
            </tr>
            <tr className="load-sum">
              <th scope="row">{syncT("upstreamUi.4014b8870c71")}</th>
              <td className="load-num" colSpan={3}>
                <CountPop value={total}>{total}</CountPop>
                {floor ? (
                  <span className="block text-[11px] font-normal text-amber-300/90">
                    {syncT(load.unweighed === 1 ? "upstreamUi.loadPlusOne" : "upstreamUi.loadPlusMany", { count: load.unweighed, lines: load.unweighed === 1 ? "line" : "lines" })}
                  </span>
                ) : null}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Dialog>
  );
}
