import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { describeReroll, describeTableReroll, rerollChoiceOf } from "../srd/ability-rerolls.ts";

export function rerollDescription(value: number, locale: AppLocale): string {
  if (locale === "en") return describeReroll(value);
  const t = createTranslator(locale), choice = rerollChoiceOf(value);
  return choice === "low" ? t("upstreamUi.rerollLow", { value }) : t(choice === "keep" ? "upstreamUi.rerollKeep" : "upstreamUi.rerollFree");
}
export function tableRerollDescription(value: number | null | undefined, server: number | null, locale: AppLocale): string {
  if (locale === "en") return describeTableReroll(value, server);
  if (typeof value === "number") return rerollDescription(value, locale);
  const t = createTranslator(locale);
  return server === null ? t("upstreamUi.rerollServer") : t("upstreamUi.rerollServerKnown", { rule: rerollDescription(server, locale) });
}
