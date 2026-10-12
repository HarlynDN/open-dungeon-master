import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { listObjects, type MapObjects, type ObjectRef } from "../battlemap/objects.ts";
import { doorKey } from "../battlemap/scene.ts";
import { TILE_FEET } from "../battlemap/types.ts";
import { mapSceneErrorText, mapRailEntry } from "./map-scene-presentations.ts";
import { MODES, isPaintMode, type MapTools } from "../../app/campaigns/[campaignId]/mapToolState.ts";

export const MAP_INSPECT_FAILURES = { refused: "That was refused." } as const;
export function mapInspectionErrorText(raw: string, locale: AppLocale): string {
  if (locale !== "en") {
    const t = createTranslator(locale);
    if (raw === MAP_INSPECT_FAILURES.refused) return t("mapInspectUi.error.refused");
    const key = Object.entries(catalogFor("en", "mapLibraryUi.error.")).find(([, value]) => value === raw && !/\{\w+\}/.test(value))?.[0];
    if (key) return t(key as MessageKey);
  }
  return mapSceneErrorText(raw, locale);
}
export function localizedMapObjects(objects: MapObjects, locale: AppLocale) {
  const rows = listObjects(objects);
  if (locale === "en") return rows;
  const t = createTranslator(locale);
  return rows.map(row => {
    const ref = row.ref;
    switch (ref.kind) {
      case "labels": {
        const label = objects.labels.find(entry => entry.x === ref.x && entry.y === ref.y);
        if (!label) return row;
        return { ...row, detail: t("mapInspectUi.object.labelAt", { x: ref.x, y: ref.y,
          link: label.ref ? t("mapInspectUi.object.link", { kind: t(`mapInspectUi.link.${label.ref.kind}`) }) : "" }) };
      }
      case "props": {
        const prop = objects.props.find(entry => entry.x === ref.x && entry.y === ref.y);
        return prop ? { ...row, detail: t(prop.kind === "npc" ? "mapInspectUi.object.npcAt" : "mapInspectUi.object.propAt", { x: ref.x, y: ref.y }) } : row;
      }
      case "lights": {
        const light = objects.lights.find(entry => entry.x === ref.x && entry.y === ref.y);
        return light ? { ...row, name: t("mapInspectUi.object.lightName", { feet: light.brightRadius * TILE_FEET }),
          detail: t("mapInspectUi.object.lightAt", { x: ref.x, y: ref.y, feet: light.dimRadius * TILE_FEET }) } : row;
      }
      case "doors": {
        const state = objects.doors[doorKey(ref.x, ref.y)];
        return state ? { ...row, name: t(state === "locked" ? "mapInspectUi.object.locked" : "mapInspectUi.object.secret"), detail: t("mapInspectUi.object.at", { x: ref.x, y: ref.y }) } : row;
      }
      case "zones": {
        const zone = objects.zones[ref.index];
        return zone ? { ...row, name: zone.kind === "light" ? t("mapInspectUi.object.zone", { ambient: t(`mapSceneUi.zone.${zone.ambient}`) })
          : t(zone.kind === "darkness" ? "mapSceneUi.zone.darkness" : "mapSceneUi.zone.magical"), detail: t("mapInspectUi.object.zoneRect", { x0: zone.x0, y0: zone.y0, x1: zone.x1, y1: zone.y1 }) } : row;
      }
      case "drawings": {
        const drawing = objects.drawings.find(entry => entry.id === ref.id);
        return drawing ? { ...row, name: t("mapInspectUi.object.drawing", { kind: t(`boardUi.draw.${drawing.kind}`), tone: t(`boardUi.tone.${drawing.tone}`) }), detail: t("mapInspectUi.object.points", { count: drawing.points.length }) } : row;
      }
    }
  });
}
export function mapObjectTitle(ref: ObjectRef, name: string | undefined, locale: AppLocale): string {
  const t = createTranslator(locale), kind = t(`mapInspectUi.object.${ref.kind}`);
  return name !== undefined ? t("mapInspectUi.object.title", { kind, name }) : kind;
}
export function mapHoldingText(tools: MapTools, locale: AppLocale): string {
  const held = MODES.find(entry => entry.mode === tools.mode), t = createTranslator(locale);
  if (!held) return t("mapInspectUi.status.nothing");
  const label = mapRailEntry(held, locale).label;
  return isPaintMode(tools.mode) ? `${label} · ${t(`mapEditorUi.brushName.${tools.brush}`)}` : label;
}
export function mapToastText(raw: string, tone: "refused" | "done", locale: AppLocale): string {
  if (tone === "refused") return mapInspectionErrorText(raw, locale);
  // Keep arbitrary completion/authored notes literal; exact owned messages
  // may use an existing template without rewriting part of a sentence.
  const key = Object.entries(catalogFor("en", "mapInspectUi.toast.")).find(([, text]) => text === raw)?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : raw;
}
