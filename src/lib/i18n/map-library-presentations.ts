import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { mapInspectionErrorText } from "./map-inspection-presentations.ts";

export const MAP_LIBRARY_FAILURES = {
  copy: "The copy could not be painted.",
  import: "That file is not a Universal VTT export this can read.",
  remove: "That map could not be removed.",
  picture: "it would not upload.",
} as const;

export type MapImportFeedback = { notes: string[]; pictureError: string | null };

export function mapLibraryErrorText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale), prefix = "The maps did not load. ";
  if (raw.startsWith(prefix)) return t("mapLibraryUi.error.load", { reason: mapLibraryErrorText(raw.slice(prefix.length), locale) });
  const key = Object.entries(catalogFor("en", "mapLibraryUi.error.")).find(([, value]) => value === raw && !/\{\w+\}/.test(value))?.[0];
  if (key) return t(key as MessageKey);
  const status = /^The server answered (\d+)\.$/.exec(raw);
  return status ? t("mapLibraryUi.error.status", { status: status[1] }) : mapInspectionErrorText(raw, locale);
}

// The UVTT importer owns these exact notices. Keep every notice, including
// omitted doors and lights; never translate partial matches or authored prose.
export function mapImportNoteText(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  const key = Object.entries(catalogFor("en", "mapLibraryUi.import.")).find(([, value]) => value === raw && !/\{\w+\}/.test(value))?.[0];
  if (key) return t(key as MessageKey);
  const doors = /^(\d+) of (\d+) doors did not land between two open tiles and were left out\. Paint them in where they belong\.$/.exec(raw);
  if (doors) return t("mapLibraryUi.import.doors", { lost: doors[1], total: doors[2] });
  const lights = /^(\d+) lights? came across, and the map starts dark\.$/.exec(raw);
  return lights ? t(Number(lights[1]) === 1 ? "mapLibraryUi.import.light" : "mapLibraryUi.import.lights", { count: lights[1] }) : raw;
}

export function mapImportFeedbackText(report: MapImportFeedback | null, locale: AppLocale): string {
  if (!report) return "";
  const t = createTranslator(locale);
  const notes = report.notes.length ? report.notes.map(note => mapImportNoteText(note, locale)) : [t("mapLibraryUi.import.done")];
  if (report.pictureError !== null) notes.push(t("mapLibraryUi.import.picture", { reason: mapLibraryErrorText(report.pictureError, locale) }));
  return notes.join(" ");
}
