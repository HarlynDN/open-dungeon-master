"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { localizedMapObjects } from "@/lib/i18n/map-inspection-presentations";
import { mapBrushEffect } from "@/lib/i18n/map-editor-presentations";
import { type Brush as BrushName } from "@/lib/battlemap/paint";
import { objectAt, refKey, sameRef, type MapObjects, type ObjectRef } from "@/lib/battlemap/objects";
import { TERRAIN, TILE_FEET, tileAt, type XY } from "@/lib/battlemap/types";
import { PanelHead } from "@/app/campaigns/[campaignId]/mapUi";

// The inspector and the status line (docs/visual-overhaul-plan.md 4.4): what
// is selected, else what is under the pointer, else a sentence. The pointer's
// tile lives in a small store of its own, outside React state, so moving the
// mouse across the map repaints these two readouts and nothing else in the
// editor.

export type HoverStore = {
  get: () => XY | null;
  set: (at: XY | null) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createHoverStore(): HoverStore {
  let at: XY | null = null;
  const listeners = new Set<() => void>();
  return {
    get: () => at,
    set: (next) => {
      if (next?.x === at?.x && next?.y === at?.y) {
        return;
      }
      at = next;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

function useHover(store: HoverStore): XY | null {
  return useSyncExternalStore(store.subscribe, store.get, () => null);
}

const CHAR_TO_BRUSH = Object.fromEntries(Object.entries(TERRAIN).map(([brush, char]) => [char, brush])) as Record<string, BrushName>;

function Fact({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-[11px]">
      <dt className="font-display text-[9px] uppercase tracking-[0.16em] text-stone-500">{name}</dt>
      <dd className="min-w-0 truncate text-right text-stone-200">{children}</dd>
    </div>
  );
}

export function MapInspector({
  store,
  terrain,
  width,
  height,
  objects,
  refs,
  selectionTitle,
  selectionBar,
}: {
  store: HoverStore;
  terrain: string;
  width: number;
  height: number;
  objects: MapObjects;
  refs: ObjectRef[];
  selectionTitle: string;
  // The selection's actions (edit, move, duplicate, DM only, delete).
  selectionBar: ReactNode;
}) {
  const { locale, t } = useLocale();
  const hover = useHover(store);
  const rows = useMemo(() => localizedMapObjects(objects, locale), [objects, locale]);
  const first = refs[0] ?? null;
  const selected = first ? rows.find((row) => sameRef(row.ref, first)) : undefined;

  let body: ReactNode;
  if (first) {
    body = (
      // Keyed by the thing, so the facts rise again when the selection moves on.
      <div key={refKey(first)} className="map-inspect-in space-y-2">
        <p className="truncate text-[12px] text-amber-100">{refs.length > 1 ? t("mapInspectUi.inspector.many", { count: refs.length }) : selectionTitle}</p>
        {refs.length === 1 && selected ? (
          <dl className="space-y-1">
            <Fact name={t("mapInspectUi.inspector.where")}>{selected.detail}</Fact>
            <Fact name={t("mapInspectUi.inspector.seen")}>{t(selected.dmOnly ? "mapInspectUi.inspector.you" : "mapInspectUi.inspector.everyone")}</Fact>
          </dl>
        ) : null}
        {selectionBar}
      </div>
    );
  } else if (hover && hover.x < width && hover.y < height) {
    const brush = CHAR_TO_BRUSH[tileAt(terrain, width, hover.x, hover.y)];
    const under = objectAt(objects, hover.x, hover.y);
    const thing = under ? rows.find((row) => sameRef(row.ref, under)) : undefined;
    body = (
      <dl className="space-y-1">
        <Fact name={t("mapInspectUi.inspector.tile")}>
          {hover.x}, {hover.y}
        </Fact>
        <Fact name={t("mapInspectUi.inspector.ground")}>{brush ? t(`mapEditorUi.brushName.${brush}`) : t("mapInspectUi.inspector.unknown")}</Fact>
        <Fact name={t("mapInspectUi.inspector.on")}>{thing ? thing.name : t("mapInspectUi.inspector.empty")}</Fact>
        {brush ? <p className="pt-1 font-mono text-[9px] leading-snug text-stone-500">{mapBrushEffect(brush, locale)}</p> : null}
      </dl>
    );
  } else {
    body = (
      <p className="font-serif text-[12px] italic leading-snug text-stone-500">
        {t("mapInspectUi.inspector.help")}
      </p>
    );
  }

  return (
    <section className="space-y-1.5">
      <PanelHead>{t("mapInspectUi.inspector.title")}</PanelHead>
      {body}
    </section>
  );
}

// The line under the canvas: where the pointer is, what is under it, how big
// the map is, and what is in hand.
export function MapStatusLine({
  store,
  terrain,
  width,
  height,
  holding,
  extra,
}: {
  store: HoverStore;
  terrain: string;
  width: number;
  height: number;
  holding: string;
  extra?: ReactNode;
}) {
  const { locale, t } = useLocale();
  const hover = useHover(store);
  const brush = hover && hover.x < width && hover.y < height ? CHAR_TO_BRUSH[tileAt(terrain, width, hover.x, hover.y)] : undefined;
  const cell = (name: string, value: ReactNode) => (
    <span className="flex shrink-0 items-baseline gap-1.5">
      <span className="font-display text-[8px] uppercase tracking-[0.16em] text-stone-600">{name}</span>
      <span className="font-mono text-[10px] text-stone-300">{value}</span>
    </span>
  );
  return (
    <div className="flex shrink-0 items-center gap-4 overflow-x-auto border-t border-stone-800 bg-stone-950/60 px-3 py-1.5 [scrollbar-width:none]">
      {cell(t("mapInspectUi.inspector.tile"), hover ? `${hover.x}, ${hover.y}` : "·")}
      {cell(t("mapInspectUi.status.under"), brush ? t(`mapEditorUi.brushName.${brush}`) : "·")}
      {cell(t("mapInspectUi.status.size"), t("mapInspectUi.status.value", { width, height, feetWidth: width * TILE_FEET, feetHeight: height * TILE_FEET }))}
      {cell(t("mapInspectUi.status.holding"), <span className="text-amber-200">{holding}</span>)}
      {extra}
    </div>
  );
}
