import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { apiErrorText } from "./api-errors.ts";
import type { AppLocale } from "./locales.ts";
import { OVERWORLD_SIZES, type OverworldSize } from "../overworld/features.ts";

export const REGION_FAILURES = { update: "That did not work.", upload: "That image would not upload.", import: "That map could not be read.", describe: "The model had nothing for that.", network: "Could not reach the table.", files: "Those files could not be read." } as const;
export type RegionImportReport = { cells: number; places: number; routes: number; rivers: number; width: number; height: number };
export function regionTerrainLabel(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const key = Object.entries(catalogFor("en", "regionUi.terrain.")).find(([, value]) => value === source)?.[0];
  return key ? createTranslator(locale)(key as MessageKey) : source;
}
export function regionSizeLabel(size: OverworldSize, locale: AppLocale): string {
  const t = createTranslator(locale), preset = OVERWORLD_SIZES.find(row => row.width === size.width && row.height === size.height);
  return preset ? t("regionUi.size.preset", { ...size, size: t(`regionUi.size.${preset.id}`) }) : t("regionUi.size.custom", size);
}
export function regionImportNote(raw: string, locale: AppLocale, report?: RegionImportReport | null): string {
  return report ? createTranslator(locale)("regionUi.file.report", report) : raw;
}
export function regionErrorText(raw: string, locale: AppLocale, fallback: MessageKey = "regionUi.error.update"): string {
  if (!raw) return "";
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  for (const [key, frame] of Object.entries(catalogFor("en", "regionUi.error."))) {
    if (frame === raw) return t(key as MessageKey);
  }
  const limit = /^Hand over one to (\d+) GeoJSON files\.$/.exec(raw);
  if (limit) return t("regionUi.error.geoLimit", { count: limit[1] });
  // Keep raw diagnostics in state. Opaque errors get a localized operation
  // fallback just like other API surfaces; never rewrite stored/model prose.
  return apiErrorText(locale, { error: raw }, fallback);
}
