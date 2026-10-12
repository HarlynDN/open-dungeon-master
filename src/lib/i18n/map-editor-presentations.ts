import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { nativeFeatureName } from "./feature-material-presentations.ts";
import { mapRailEntry } from "./map-scene-presentations.ts";
import { BRUSH_KEYS, MODES } from "../../app/campaigns/[campaignId]/mapToolState.ts";
import { groupStamps } from "../../app/campaigns/[campaignId]/mapCatalogue.ts";
import type { ObjectEntry } from "../battlemap/render/painted.ts";
import type { Brush } from "../battlemap/paint.ts";

export function mapBrushEffect(brush: Brush, locale: AppLocale): string {
  return createTranslator(locale)(`mapEditorUi.brushEffect.${brush}`, { feature: nativeFeatureName("Second-Story Work", locale) });
}
export function localizedStampGroups(objects: readonly ObjectEntry[], ownSets: readonly string[], query: string, locale: AppLocale) {
  if (locale === "en") return groupStamps(objects, ownSets, query);
  const t = createTranslator(locale), source = catalogFor("en", "mapEditorUi.set."), needle = query.trim().toLowerCase();
  // Native ordering and object identities stay intact. Match both native
  // asset text and a translated owned set name; custom names remain literal.
  return groupStamps(objects, ownSets, "").map(group => {
    const key = `mapEditorUi.set.${group.set}` as MessageKey;
    const label = source[key] === group.label ? t(key) : group.label;
    const wholeSet = !needle || label.toLowerCase().includes(needle) || group.label.toLowerCase().includes(needle);
    return { ...group, label, objects: wholeSet ? group.objects : group.objects.filter(object =>
      (object.label ?? "").toLowerCase().includes(needle) || object.id.includes(needle)) };
  }).filter(group => group.objects.length);
}
type KeyGroup = { title: string; rows: Array<{ keys: string[]; does: string }> };
export function localizedMapHotkeyGroups(groups: KeyGroup[], locale: AppLocale): KeyGroup[] {
  if (locale === "en") return groups;
  const t = createTranslator(locale), titles = { Tools: "mapEditorUi.hotkeys.tools", Brushes: "mapEditorUi.hotkeys.brushes", Editing: "mapEditorUi.hotkeys.editing" } satisfies Record<string, MessageKey>;
  const edits = catalogFor("en", "mapEditorUi.hotkeys.");
  return groups.map(group => ({ ...group, title: Object.hasOwn(titles, group.title) ? t(titles[group.title as keyof typeof titles]) : group.title,
    rows: group.rows.map(row => {
      if (group.title === "Tools") {
        const mode = MODES.find(entry => entry.key === row.keys[0] && entry.label === row.does);
        if (mode) return { ...row, does: mapRailEntry(mode, locale).label };
      }
      if (group.title === "Brushes") {
        const brush = BRUSH_KEYS[row.keys[0]];
        const key = `mapEditorUi.brushName.${brush}` as MessageKey;
        if (brush && catalogFor("en", "mapEditorUi.brushName.")[key] === row.does) return { ...row, does: t(key) };
      }
      const key = Object.entries(edits).find(([, text]) => text === row.does)?.[0];
      return key ? { ...row, does: t(key as MessageKey) } : row;
    }),
  }));
}
