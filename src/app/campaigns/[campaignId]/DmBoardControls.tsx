"use client";

import { Box, Eye, EyeOff, Hand, MapPin, Pencil, Ruler, Trash2, UserPlus } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator, type MessageKey } from "@/lib/i18n/translator";
import { combatName } from "@/lib/i18n/combat-ui-presentations";
import { boardCaughtName } from "@/lib/i18n/board-tool-presentations";
import { cn } from "@/lib/cn";
import { Slider } from "@/components/ui/Slider";
import { ADHOC_NAME_MAX } from "@/lib/dm/board-logic";
import { SHAPE_MEASURES, TEMPLATE_SHAPES } from "@/lib/battlemap/template";
import type { TemplateShape } from "@/lib/battlemap/template";
import type { AdhocTokenKind } from "@/lib/battlemap/types";
import type { PlayerMapView } from "@/lib/battlemap/view";

// The DM's rail above the tactical board, and the small card that opens on a
// token. Presentational only: BattleMapPanel owns the state and does the
// talking, so the two can be read separately.

export type BoardTool = "handle" | "place" | "measure" | "point" | "draw";

const TOOL_LABELS: Record<BoardTool, MessageKey> = {
  handle: "boardTools.rail.handle",
  place: "boardTools.rail.place",
  measure: "boardTools.rail.measure",
  point: "boardTools.rail.point",
  draw: "boardTools.rail.draw",
};

const ADHOC_KEYS = { npc: "boardTools.kind.npc", prop: "boardTools.kind.prop" } satisfies Record<AdhocTokenKind, MessageKey>;

const TOOL_ICONS: Record<BoardTool, typeof Hand> = {
  handle: Hand,
  place: Box,
  measure: Ruler,
  point: MapPin,
  draw: Pencil,
};

export function BoardToolRail({
  tool,
  onTool,
  disabled,
}: {
  tool: BoardTool;
  onTool: (tool: BoardTool) => void;
  disabled: boolean;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    // board-tools: in a fixed window the row keeps to one line and scrolls
    // sideways, so it never takes the board's height (world.css, issue 87).
    <div data-pill-group="" className="board-tools flex flex-wrap gap-1">
      {(Object.keys(TOOL_LABELS) as BoardTool[]).map((option) => {
        const Icon = TOOL_ICONS[option];
        return (
          <button data-on={tool === option ? "" : undefined}
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onTool(option)}
            title={t(TOOL_LABELS[option])}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs disabled:opacity-40",
              tool === option
                ? "border-amber-700 bg-amber-950/50 text-amber-100"
                : "border-stone-700 text-stone-400 hover:text-stone-200",
            )}
          >
            <Icon className="size-3.5" />
            {t(TOOL_LABELS[option])}
          </button>
        );
      })}
    </div>
  );
}

export function PlaceTokenForm({
  kind,
  name,
  onKind,
  onName,
}: {
  kind: AdhocTokenKind;
  name: string;
  onKind: (kind: AdhocTokenKind) => void;
  onName: (name: string) => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  return (
    <div className="space-y-1.5 rounded-lg border border-stone-800 bg-stone-950/60 px-2.5 py-2">
      <div data-pill-group="" className="flex gap-1">
        {(Object.keys(ADHOC_KEYS) as AdhocTokenKind[]).map((option) => (
          <button data-on={kind === option ? "" : undefined}
            key={option}
            type="button"
            onClick={() => onKind(option)}
            title={t(option === "npc" ? "boardTools.place.npcHint" : "boardTools.place.propHint")}
            className={cn(
              "rounded-md border px-2 py-1 text-xs",
              kind === option
                ? "border-amber-700 bg-amber-950/50 text-amber-100"
                : "border-stone-700 text-stone-400 hover:text-stone-200",
            )}
          >
            {t(ADHOC_KEYS[option])}
          </button>
        ))}
      </div>
      <input
        value={name}
        onChange={(event) => onName(event.target.value)}
        maxLength={ADHOC_NAME_MAX}
        placeholder={t(kind === "npc" ? "boardTools.place.npcPlaceholder" : "boardTools.place.propPlaceholder")}
        className="w-full rounded-md border border-stone-700 bg-stone-950 px-2 py-1 text-xs text-stone-200 placeholder:text-stone-600"
      />
      <p className="text-[11px] text-stone-500">
        {name.trim()
          ? t("boardTools.place.ready")
          : t("boardTools.place.empty")}
      </p>
    </div>
  );
}

export type CaughtToken = { name: string; characterId?: string; enemyId?: string };

export function MeasureControls({
  shape,
  sizeFeet,
  caught,
  onShape,
  onSize,
  onClear,
}: {
  shape: TemplateShape;
  sizeFeet: number;
  caught: CaughtToken[];
  onShape: (shape: TemplateShape) => void;
  onSize: (feet: number) => void;
  onClear: () => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  const enemyIds = caught.map((entry) => entry.enemyId).filter(Boolean).join(", ");
  return (
    <div className="space-y-1.5 rounded-lg border border-stone-800 bg-stone-950/60 px-2.5 py-2">
      <div data-pill-group="" className="flex flex-wrap gap-1">
        {TEMPLATE_SHAPES.map((option) => (
          <button data-on={shape === option ? "" : undefined}
            key={option}
            type="button"
            onClick={() => onShape(option)}
            className={cn(
              "rounded-md border px-2 py-1 text-xs",
              shape === option
                ? "border-amber-700 bg-amber-950/50 text-amber-100"
                : "border-stone-700 text-stone-400 hover:text-stone-200",
            )}
          >
            {t(`boardTools.shape.${option}`)}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-[11px] text-stone-400">
        <span className="w-16 capitalize">{t(`boardTools.measure.${SHAPE_MEASURES[shape]}` as MessageKey)}</span>
        <Slider
          min={5}
          max={60}
          step={5}
          value={sizeFeet}
          onChange={onSize}
          label={t("boardTools.measure.slider", { measure: t(`boardTools.measure.${SHAPE_MEASURES[shape]}` as MessageKey) })}
          bubble={(feet) => t("boardTools.measure.feet", { feet })}
          className="min-w-0 flex-1"
        />
        <span className="w-12 text-right tabular-nums text-stone-300">{t("boardTools.measure.feet", { feet: sizeFeet })}</span>
      </label>
      <p className="text-[11px] leading-4 text-stone-500">
        {t("boardTools.measure.help")}
      </p>
      {caught.length ? (
        <p className="text-[11px] leading-4 text-amber-300">
          {t("boardTools.measure.caught", { names: caught.map(entry => boardCaughtName(entry, locale)).join(t("boardUi.list")) })}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          onClick={onClear}
          className="rounded-md border border-stone-700 px-2 py-1 text-xs text-stone-400 hover:text-stone-200"
        >
          {t("boardTools.measure.clear")}
        </button>
        {/* The console's Area of effect takes enemy ids as comma-separated
            text, so measuring and resolving are two steps rather than one
            long form filled in by eye. */}
        {enemyIds ? (
          <button
            type="button"
            onClick={() => void navigator.clipboard?.writeText(enemyIds)}
            title={enemyIds}
            className="rounded-md border border-stone-700 px-2 py-1 text-xs text-stone-400 hover:text-stone-200"
          >
            {t("boardTools.measure.copy")}
          </button>
        ) : null}
      </div>
    </div>
  );
}

// The card that opens on a token: what it is, how it is doing, and the three
// things a DM does to a piece mid-fight.
export function TokenCard({
  token,
  hp,
  held,
  busy,
  onHold,
  onVisibility,
  onRemove,
  onClose,
}: {
  token: PlayerMapView["tokens"][number];
  hp?: { current: number; max: number };
  held: boolean;
  busy: boolean;
  onHold: () => void;
  onVisibility: (hidden: boolean) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const t = createTranslator(locale);
  const adhoc = token.kind === "npc" || token.kind === "prop";
  return (
    <div className="space-y-1.5 rounded-lg border border-amber-900/60 bg-stone-950/90 px-2.5 py-2">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs font-medium text-stone-200">{combatName(token.name, token.kind, locale)}</p>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] text-stone-500 hover:text-stone-300"
        >
          {t("boardTools.card.close")}
        </button>
      </div>
      <p className="text-[11px] text-stone-500">
        {token.kind === "pc"
          ? t("boardTools.kind.pc")
          : token.kind === "enemy"
            ? t("boardTools.kind.enemy")
            : t(ADHOC_KEYS[token.kind as AdhocTokenKind])}
        {hp ? t("boardTools.card.hp", { current: hp.current, max: hp.max }) : ""}
        {token.hidden ? t("boardTools.card.hidden") : ""}
      </p>
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          disabled={busy} aria-busy={busy}
          onClick={onHold}
          className={cn(
            "flex items-center gap-1 rounded-md border px-2 py-1 text-xs disabled:opacity-40",
            held
              ? "border-amber-700 bg-amber-950/50 text-amber-100"
              : "border-stone-700 text-stone-400 hover:text-stone-200",
          )}
        >
          <Hand className="size-3.5" />
          {t(held ? "boardTools.card.put" : "boardTools.card.pick")}
        </button>
        {token.kind === "pc" ? null : (
          <button
            type="button"
            disabled={busy} aria-busy={busy}
            onClick={() => onVisibility(!token.hidden)}
            className="flex items-center gap-1 rounded-md border border-stone-700 px-2 py-1 text-xs text-stone-400 hover:text-stone-200 disabled:opacity-40"
          >
            {token.hidden ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            {t(token.hidden ? "boardTools.card.reveal" : "boardTools.card.hide")}
          </button>
        )}
        {adhoc ? (
          <button
            type="button"
            disabled={busy} aria-busy={busy}
            onClick={onRemove}
            className="flex items-center gap-1 rounded-md border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:bg-red-950/40 disabled:opacity-40"
          >
            <Trash2 className="size-3.5" />
            {t("boardTools.card.remove")}
          </button>
        ) : null}
      </div>
      {token.kind !== "pc" && !adhoc ? (
        <p className="flex items-center gap-1 text-[11px] text-stone-600">
          <UserPlus className="size-3" />
          {t("boardTools.card.enemyHelp")}
        </p>
      ) : null}
    </div>
  );
}
