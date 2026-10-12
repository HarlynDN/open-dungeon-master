import type { AppLocale } from "./locales.ts";
import { createTranslator, type MessageKey } from "./translator.ts";
import type { FxOutcome } from "../battlemap/fx-plan.ts";

// Original native defaults stay in state. Only these owned frames are
// projected at render time, never a scan of a player's or model's prose.
export const SURFACE_SOURCE = {
  "journalUi.report.dmLabel": "the Dungeon Master",
  "journalUi.error.network": "Could not reach the server.",
  "surfaceUi.thisPlayer": "this player",
  "surfaceUi.error.continue": "Could not continue the scene.",
  "surfaceUi.error.switch": "Could not switch takes.",
  "surfaceUi.error.edit": "Could not save that edit.",
  "surfaceUi.error.pin": "Could not pin that."
} as const satisfies Partial<Record<MessageKey, string>>;
const ERROR_KEYS = new Map<string, MessageKey>(
  (Object.entries(SURFACE_SOURCE) as [keyof typeof SURFACE_SOURCE, string][])
    .filter(([key]) => key.startsWith("surfaceUi.error.") || key === "journalUi.error.network")
    .map(([key, source]) => [source, key]),
);
export function surfaceErrorText(raw: string, locale: AppLocale): string {
  const key = ERROR_KEYS.get(raw);
  return key ? createTranslator(locale)(key) : raw;
}
const FX_KEYS = {
  miss: "surfaceUi.fx.miss", fumble: "surfaceUi.fx.fumble", save: "surfaceUi.fx.save",
  half: "surfaceUi.fx.half", crit: "surfaceUi.fx.crit",
} as const satisfies Partial<Record<FxOutcome, MessageKey>>;
export function fxOutcomeCaption(outcome: FxOutcome | undefined, locale: AppLocale): string {
  const key = outcome && Object.hasOwn(FX_KEYS, outcome) ? FX_KEYS[outcome as keyof typeof FX_KEYS] : undefined;
  return key ? createTranslator(locale)(key) : "";
}
export type GenericReportLabel = "dm" | "player";
export function reportLabelText(value: { label: string; authorType?: "dm" | "player"; genericLabel?: GenericReportLabel }, locale: AppLocale): string {
  const generic = value.genericLabel ?? (value.authorType === "dm" && value.label === SURFACE_SOURCE["journalUi.report.dmLabel"] ? "dm" : undefined);
  return generic ? createTranslator(locale)(generic === "dm" ? "journalUi.report.dmLabel" : "surfaceUi.thisPlayer") : value.label;
}
