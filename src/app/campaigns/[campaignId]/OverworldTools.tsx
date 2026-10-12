"use client";

import {
  Brush,
  Download,
  Eraser,
  FileUp,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Move,
  PenLine,
  RefreshCw,
  Trash2,
  Type,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator, type MessageKey } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { REGION_FAILURES, regionTerrainLabel, regionSizeLabel, regionImportNote, regionErrorText, type RegionImportReport } from "@/lib/i18n/region-presentations";
import { cn } from "@/lib/cn";
import { encodeImageForUpload } from "@/lib/image-encode";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { PanelError, kitButtonClass, panelField } from "./PanelKit";
import type { OverworldTile, TileSkin } from "@/lib/overworld/logic";
import {
  MAX_BRUSH_RADIUS,
  OVERWORLD_BRUSHES,
  OVERWORLD_BRUSH_TILES,
  type OverworldBrush,
} from "@/lib/overworld/paint";
import {
  FEATURE_LIMITS,
  OVERWORLD_SIZES,
  PATH_KINDS,
  type LabelSize,
  type OverworldSize,
  type PathKind,
} from "@/lib/overworld/features";

// The region map's toolbars (docs/workshop-parity-audit.md phase 15). Each
// is a small stateless strip; OverworldPanel holds the state and decides
// what a tap on the canvas means under the mode chosen here.

// What the panel's own dialog asks for, by what a tap meant.
export type OverworldAsk =
  | { kind: "pin"; at: { x: number; y: number } }
  | { kind: "rename"; locationId: string }
  | { kind: "label"; at: { x: number; y: number } };

export function askCopy(
  ask: OverworldAsk | null,
  labelSize: LabelSize,
  heldName: string,
  locale: AppLocale = DEFAULT_LOCALE,
): { title: string; label: string; defaultValue: string; maxLength: number; allowEmpty: boolean; submitLabel: string } {
  const t = createTranslator(locale);
  if (ask?.kind === "rename") {
    return {
      title: t("regionUi.ask.rename"),
      label: t("regionUi.ask.name"),
      defaultValue: heldName,
      maxLength: 80,
      allowEmpty: false,
      submitLabel: t("regionUi.ask.renameSubmit"),
    };
  }
  if (ask?.kind === "label") {
    return {
      title: labelSize === "large" ? t("regionUi.ask.region") : t("regionUi.ask.place"),
      label: t("regionUi.ask.words"),
      defaultValue: "",
      maxLength: FEATURE_LIMITS.labelLength,
      allowEmpty: false,
      submitLabel: t("regionUi.ask.write"),
    };
  }
  return {
    title: t("regionUi.ask.pin"),
    label: t("regionUi.ask.pinHelp"),
    defaultValue: "",
    maxLength: 60,
    allowEmpty: true,
    submitLabel: t("regionUi.ask.pinSubmit"),
  };
}

type ImportSummary = { cells: number; places: number; rivers: number; routes: number };

// Sends the GeoJSON texts to the import route and says what it read.
export async function importAzgaarFiles<Data extends { map: { width: number; height: number } }>(
  campaignId: string,
  files: string[],
  size: OverworldSize,
): Promise<{ data: Data; note: string; report: RegionImportReport } | { error: string }> {
  const response = await fetch(`/api/campaigns/${campaignId}/overworld/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files, ...size }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { error: (payload as { error?: string }).error ?? REGION_FAILURES.import };
  }
  const { summary, ...data } = payload as Data & { summary: ImportSummary };
  return {
    data: data as unknown as Data,
    report: { ...summary, width: data.map.width, height: data.map.height },
    note: `Read ${summary.cells} cells into a ${data.map.width} by ${data.map.height} map, with ${summary.places} places, ${summary.routes} roads and ${summary.rivers} rivers.`,
  };
}

export type OverworldMode =
  | "look"
  | "pin"
  | "party"
  | "place"
  | "paint"
  | "line"
  | "label"
  | "erase";

// Every button here is the kit's small button (ui.btnSmall through PanelKit);
// a chosen mode or brush wears the gold on-state over it.
const chip = kitButtonClass("small");
const idle = "";
const active = "border-amber-500/60 bg-amber-400/10 text-amber-100";

const MODES = [
  ["pin", "regionUi.mode.pin", MapPin],
  ["party", "regionUi.mode.party", Users],
  ["place", "regionUi.mode.place", Move],
  ["paint", "regionUi.mode.paint", Brush],
  ["line", "regionUi.mode.line", PenLine],
  ["label", "regionUi.mode.label", Type],
  ["erase", "regionUi.mode.erase", Eraser],
] as const;

export function ModeBar({
  mode,
  onMode,
  partyPlaced,
  onPartyTransit,
  pinsCount,
  onClearPins,
  regenBusy,
  onRegenerate,
}: {
  mode: OverworldMode;
  onMode: (mode: OverworldMode) => void;
  partyPlaced: boolean;
  onPartyTransit: () => void;
  pinsCount: number;
  onClearPins: () => void;
  regenBusy: boolean;
  onRegenerate: () => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    <div className="flex flex-wrap items-center gap-1.5" data-tour="region-modes">
      {MODES.map(([value, label, Icon]) => (
        <button
          key={value}
          type="button"
          aria-pressed={mode === value}
          onClick={() => onMode(mode === value ? "look" : value)}
          className={cn(chip, mode === value ? active : idle)}
        >
          <Icon className="size-3.5" /> {mode === value ? t("regionUi.mode.tap") : t(label)}
        </button>
      ))}
      {partyPlaced ? (
        <button type="button" onClick={onPartyTransit} className={cn(chip, idle)}>
          {t("regionUi.mode.transit")}
        </button>
      ) : null}
      {pinsCount ? (
        <button type="button" onClick={onClearPins} className={cn(chip, idle)}>
          <X className="size-3.5" /> {t("regionUi.mode.clear")}
        </button>
      ) : null}
      <button
        type="button"
        onClick={onRegenerate}
        disabled={regenBusy}
        title={t("regionUi.mode.regenTip")}
        className={cn(chip, idle, "disabled:opacity-50")}
      >
        {regenBusy ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
        {t("regionUi.mode.regen")}
      </button>
    </div>
  );
}

export function TileLegend({ skin }: { skin: Record<OverworldTile, TileSkin> }) {
  const { locale } = useLocale();
  return (
    <div className="stagger-pop flex flex-wrap gap-x-3 gap-y-1">
      {(Object.keys(skin) as OverworldTile[]).map((tile) => (
        <span key={tile} className="flex items-center gap-1 text-[11px] text-stone-400">
          <span className="inline-block size-3 rounded-sm border border-black/30" style={{ backgroundColor: skin[tile].fill }} />
          {regionTerrainLabel(skin[tile].label, locale)}
        </span>
      ))}
    </div>
  );
}

export function PaintTools({
  skin,
  brush,
  onBrush,
  radius,
  onRadius,
  stranded,
  undo,
}: {
  skin: Record<OverworldTile, TileSkin>;
  brush: OverworldBrush;
  onBrush: (brush: OverworldBrush) => void;
  radius: number;
  onRadius: (radius: number) => void;
  stranded: Array<{ id: string; name: string }>;
  undo?: { canUndo: boolean; canRedo: boolean; onUndo: () => void; onRedo: () => void };
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    <div className="panel reveal space-y-2 rounded-lg p-2.5">
      <SectionHead title={t("regionUi.mode.paint")} glyph="climate-temperate" level="h4" />
      <div data-pill-group="" role="group" aria-label={t("regionUi.paint.group")} className="flex flex-wrap items-center gap-1">
        {OVERWORLD_BRUSHES.map((value) => (
          <button data-on={brush === value ? "" : undefined}
            key={value}
            type="button"
            aria-pressed={brush === value}
            onClick={() => onBrush(value)}
            className={cn(chip, brush === value ? active : idle)}
          >
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: skin[OVERWORLD_BRUSH_TILES[value]].fill }}
            />
            {t(`regionUi.brush.${value}`)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
        {t("regionUi.paint.size")}
        <Slider min={0} max={MAX_BRUSH_RADIUS} value={radius} onChange={onRadius} label={t("regionUi.paint.size")} className="pk-w-28" />
        <span className="text-stone-500">{radius === 0 ? t("regionUi.paint.one") : t("regionUi.paint.across", { count: radius * 2 + 1 })}</span>
        {undo ? (
          <span className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={undo.onUndo}
              disabled={!undo.canUndo}
              title={t("regionUi.paint.undoTip")}
              className={cn(chip, undo.canUndo ? idle : "border-stone-800 text-stone-700")}
            >
              {t("regionUi.paint.undo")}
            </button>
            <button
              type="button"
              onClick={undo.onRedo}
              disabled={!undo.canRedo}
              title={t("regionUi.paint.redoTip")}
              className={cn(chip, undo.canRedo ? idle : "border-stone-800 text-stone-700")}
            >
              {t("regionUi.paint.redo")}
            </button>
          </span>
        ) : null}
      </div>
      <p className="text-xs text-stone-500">{t("regionUi.paint.help")}</p>
      {stranded.length ? (
        <p role="status" className="live-in text-xs text-amber-300/90">
          {t("regionUi.paint.stranded", { names: stranded.map(place => place.name).filter(Boolean).join(t("boardUi.list")), verb: t(stranded.length === 1 ? "regionUi.paint.is" : "regionUi.paint.are") })}
        </p>
      ) : null}
    </div>
  );
}

// A road, river or border is drawn one tap at a time and finished on
// purpose, so a mis-tap is an undo rather than a stray line on the map.
export function LineTools({
  kind,
  onKind,
  pendingCount,
  label,
  onLabel,
  onFinish,
  onUndo,
  onCancel,
}: {
  kind: PathKind;
  onKind: (kind: PathKind) => void;
  pendingCount: number;
  label: string;
  onLabel: (label: string) => void;
  onFinish: () => void;
  onUndo: () => void;
  onCancel: () => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    <div className="panel reveal space-y-2 rounded-lg p-2.5">
      <SectionHead title={t("regionUi.mode.line")} glyph="pace-normal" level="h4" />
      <div data-pill-group="" role="group" aria-label={t("regionUi.line.group")} className="flex flex-wrap items-center gap-1">
        {PATH_KINDS.map((value) => (
          <button data-on={kind === value ? "" : undefined}
            key={value}
            type="button"
            aria-pressed={kind === value}
            disabled={pendingCount > 0 && value !== kind}
            onClick={() => onKind(value)}
            className={cn(chip, kind === value ? active : idle, "disabled:opacity-40")}
          >
            {t(`regionUi.path.${value}`)}
          </button>
        ))}
        <input
          value={label}
          maxLength={FEATURE_LIMITS.labelLength}
          onChange={(event) => onLabel(event.target.value)}
          placeholder={t("regionUi.line.name", { kind: t(`regionUi.pathNoun.${kind}`) })}
          aria-label={t("regionUi.line.name", { kind: t(`regionUi.pathNoun.${kind}`) })}
          className={cn(panelField, "w-auto min-w-32 flex-1")}
        />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
        <span>
          {pendingCount === 0
            ? t("regionUi.line.start")
            : t("regionUi.line.points", { count: pendingCount, word: t(pendingCount === 1 ? "regionUi.line.point" : "regionUi.line.manyPoints") })}
        </span>
        <button
          type="button"
          disabled={pendingCount < 2}
          onClick={onFinish}
          className={kitButtonClass("primary", "disabled:opacity-40")}
        >
          {t("regionUi.line.finish", { kind: t(`regionUi.pathNoun.${kind}`) })}
        </button>
        <button type="button" disabled={pendingCount === 0} onClick={onUndo} className={cn(chip, idle, "disabled:opacity-40")}>
          {t("regionUi.line.undo")}
        </button>
        <button type="button" disabled={pendingCount === 0} onClick={onCancel} className={cn(chip, idle, "disabled:opacity-40")}>
          {t("regionUi.line.cancel")}
        </button>
      </div>
    </div>
  );
}

export function LabelTools({ size, onSize }: { size: LabelSize; onSize: (size: LabelSize) => void }) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    <div data-pill-group="" className="panel reveal flex flex-wrap items-center gap-1.5 rounded-lg p-2.5 text-xs text-stone-500">
      <span>{t("regionUi.label.help")}</span>
      <button data-on={size === "small" ? "" : undefined} type="button" aria-pressed={size === "small"} onClick={() => onSize("small")} className={cn(chip, size === "small" ? active : idle)}>
        {t("regionUi.label.place")}
      </button>
      <button data-on={size === "large" ? "" : undefined} type="button" aria-pressed={size === "large"} onClick={() => onSize("large")} className={cn(chip, size === "large" ? active : idle)}>
        {t("regionUi.label.region")}
      </button>
    </div>
  );
}

// The map as a file, either way: a picture in place of the tiles, a map
// drawn in Fantasy Map Generator read into the grid, or the map saved out as
// a PNG to print or hand round.
export function FileTools({
  backdropPath,
  onBackdrop,
  onExport,
  exporting,
  onImport,
  importing,
  importNote,
  importReport,
  mapSize,
}: {
  backdropPath: string;
  onBackdrop: (path: string) => void;
  onExport: () => void;
  exporting: boolean;
  onImport: (files: string[], size: OverworldSize) => void;
  importing: boolean;
  importNote: string;
  importReport?: RegionImportReport | null;
  mapSize: OverworldSize;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  const imageRef = useRef<HTMLInputElement>(null);
  const geoRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [sizeId, setSizeId] = useState("current");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const { dataUrl, type } = await encodeImageForUpload(file);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl, name: file.name, type }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(payload.error || REGION_FAILURES.upload);
        return;
      }
      onBackdrop(payload.url);
    } catch {
      setError(REGION_FAILURES.upload);
    } finally {
      setUploading(false);
    }
  }

  async function pickGeo(files: FileList | null) {
    if (!files?.length) {
      return;
    }
    setError("");
    try {
      const texts = await Promise.all([...files].map((file) => file.text()));
      const preset = OVERWORLD_SIZES.find((entry) => entry.id === sizeId);
      onImport(texts, preset ? { width: preset.width, height: preset.height } : mapSize);
    } catch {
      setError(REGION_FAILURES.files);
    }
  }

  return (
    <div className="panel space-y-2 rounded-lg p-2.5">
      <SectionHead title={t("regionUi.file.title")} glyph="tab-handout" level="h4" />
      <input
        ref={imageRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void upload(file);
          }
          event.target.value = "";
        }}
      />
      <input
        ref={geoRef}
        type="file"
        multiple
        accept=".geojson,.json,application/geo+json,application/json"
        className="hidden"
        onChange={(event) => {
          void pickGeo(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center gap-1.5" data-tour="region-files">
        <button
          type="button"
          disabled={uploading}
          onClick={() => imageRef.current?.click()}
          className={cn(chip, idle, "disabled:opacity-50")}
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <ImageIcon className="size-3.5" />}
          {t(backdropPath ? "regionUi.file.replace" : "regionUi.file.use")}
        </button>
        {backdropPath ? (
          <button type="button" onClick={() => onBackdrop("")} className={cn(chip, idle)}>
            <Trash2 className="size-3.5" /> {t("regionUi.file.tiles")}
          </button>
        ) : null}
        <button
          type="button"
          disabled={exporting}
          onClick={onExport}
          className={cn(chip, idle, "disabled:opacity-50")}
        >
          {exporting ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
          {t("regionUi.file.save")}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          disabled={importing}
          onClick={() => geoRef.current?.click()}
          className={cn(chip, idle, "disabled:opacity-50")}
        >
          {importing ? <Loader2 className="size-3.5 animate-spin" /> : <FileUp className="size-3.5" />}
          {t("regionUi.file.import")}
        </button>
        <Select
          size="sm"
          value={sizeId}
          onChange={setSizeId}
          label={t("regionUi.file.size")}
          options={[
            { value: "current", label: t("regionUi.file.current", mapSize) },
            ...OVERWORLD_SIZES.map((entry) => ({ value: entry.id as string, label: regionSizeLabel(entry, locale) })),
          ]}
          className="min-w-0 max-w-full"
        />
        <span className="text-[11px] leading-4 text-stone-500">
          {t("regionUi.file.help")}
        </span>
      </div>
      {importNote ? <p role="status" className="live-in text-xs text-emerald-300/90">{regionImportNote(importNote, locale, importReport)}</p> : null}
      {error ? <PanelError>{regionErrorText(error, locale, "regionUi.error.upload")}</PanelError> : null}
    </div>
  );
}
