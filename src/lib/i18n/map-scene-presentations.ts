import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { regionErrorText } from "./region-presentations.ts";

export const MAP_SCENE_FAILURES = { populate: "Could not populate that place.", set: "Could not set the map.", queue: "Could not queue the redraw.", clear: "Could not clear the map.", network: "Could not reach the server." } as const;
export type MapPopulateReport = { npcs: number; shops: number; hook: string };
export function mapSceneErrorText(raw: string, locale: AppLocale, fallback: MessageKey = "mapSceneUi.error.set"): string {
  if (!raw || locale === "en") return raw;
  const key = Object.entries(catalogFor("en", "mapSceneUi.error.")).find(([, value]) => value === raw)?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : regionErrorText(raw, locale, fallback);
}
export function mapPopulateNote(note: string | MapPopulateReport, locale: AppLocale): string {
  return typeof note === "string" ? mapSceneErrorText(note, locale, "mapSceneUi.error.populate") : createTranslator(locale)("mapSceneUi.area.result", note);
}
export function mapRenderFailure(reason: string | undefined, locale: AppLocale): string {
  const t = createTranslator(locale), failed = t("mapSceneUi.area.failed");
  if (!reason) return failed;
  const translated = mapSceneErrorText(reason, locale, "mapSceneUi.area.failed");
  return translated === failed ? failed : t("mapSceneUi.area.failedReason", { reason: translated });
}
export function sceneCueLabel(option: { value: string; label: string }, locale: AppLocale): string {
  if (locale === "en") return option.label;
  const key = `mapSceneUi.cue.${option.value}` as MessageKey;
  return catalogFor("en", "mapSceneUi.cue.")[key] === option.label ? createTranslator(locale)(key) : option.label;
}
export function mapRailEntry(entry: { mode: string; label: string; hint: string }, locale: AppLocale): { label: string; hint: string } {
  if (locale === "en") return { label: entry.label, hint: entry.hint };
  const t = createTranslator(locale), labelKey = `mapSceneUi.mode.${entry.mode}` as MessageKey, hintKey = `mapSceneUi.modeHint.${entry.mode}` as MessageKey;
  return { label: catalogFor("en", "mapSceneUi.mode.")[labelKey] === entry.label ? t(labelKey) : entry.label,
    hint: catalogFor("en", "mapSceneUi.modeHint.")[hintKey] === entry.hint ? t(hintKey) : entry.hint };
}
