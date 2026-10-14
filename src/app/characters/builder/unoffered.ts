import { createTranslator } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";
import { characterLabel } from "@/lib/i18n/character-presentations";
// The stored picks the option lists do not hold (issue 229): a table's own
// species, a pack row the server no longer has. The builder shows the list's
// first row in place of a race, class or background it cannot find, and would
// save that, so the wizard names each one and holds the save until the player
// picks on purpose. A pick the player changed is theirs, so only the stored
// one still selected counts.
import type { CreateSheetInput } from "@/lib/schemas/sheet";
import type { BackgroundOption, ClassOption, RaceOption } from "./useBuilderOptions";
import { findRace } from "./useBuilderState";

export function unofferedPicks(
  initial: CreateSheetInput,
  state: { raceId: string; classId: string; backgroundId: string },
  races: RaceOption[],
  classes: ClassOption[],
  backgrounds: BackgroundOption[],
  locale: AppLocale = "en",
): Array<{ what: string; standIn: string }> {
  const t = createTranslator(locale);
  const words = (id: string) => id.replace(/[-_]/g, " ");
  const missing: Array<{ what: string; standIn: string }> = [];
  if (initial.race && state.raceId === initial.race && !findRace(races, initial.race)) {
    missing.push({ what: t("upstreamUi.unoffered.race", { value: words(initial.race) }), standIn: races[0] ? characterLabel("race", races[0].name, locale) : t("upstreamUi.unoffered.other.race") });
  }
  if (initial.class && state.classId === initial.class && !classes.some((entry) => entry.id === initial.class)) {
    missing.push({ what: t("upstreamUi.unoffered.class", { value: words(initial.class) }), standIn: classes[0] ? characterLabel("class", classes[0].name, locale) : t("upstreamUi.unoffered.other.class") });
  }
  if (
    initial.background &&
    state.backgroundId === initial.background &&
    !backgrounds.some((entry) => entry.id === initial.background)
  ) {
    missing.push({ what: t("upstreamUi.unoffered.background", { value: words(initial.background) }), standIn: backgrounds[0] ? characterLabel("background", backgrounds[0].name, locale) : t("upstreamUi.unoffered.other.background") });
  }
  return missing;
}

export function listWords(items: string[]): string {
  return items.length <= 2 ? items.join(" and ") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
