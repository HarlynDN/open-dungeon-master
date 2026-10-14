import type { AppLocale } from "./locales.ts";
import { createTranslator } from "./translator.ts";
import { placeWords, sequenceOf, type CoordinationPhase } from "../dm/coordination-logic.ts";
export function coordinationPlace(phase: Pick<CoordinationPhase, "entries">, id: string, locale: AppLocale): string {
  if (locale === "en") return placeWords(phase, id);
  const t = createTranslator(locale), sequence = sequenceOf(phase);
  if (!sequence) return t("upstreamUi.coord.everyone");
  const at = sequence.findIndex(step => step.includes(id));
  if (at < 0) return "";
  const name = (id: string) => phase.entries.find(entry => entry.characterId === id)?.name ?? t("upstreamUi.coord.someone");
  const before = at > 0 ? sequence[at - 1].map(name) : [], alongside = sequence[at].filter(other => other !== id).map(name);
  return [t("upstreamUi.coord.place", { step: at + 1, total: sequence.length }), before.length ? t("upstreamUi.coord.afterNames", { names: before.join("、") }) : t("upstreamUi.coord.first"), ...(alongside.length ? [t("upstreamUi.coord.alongside", { names: alongside.join("、") })] : [])].join("，");
}
