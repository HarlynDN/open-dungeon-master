import { genrePreset } from "@/lib/genres";
import { createTranslator } from "../../lib/i18n/translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "../../lib/i18n/locales.ts";
import { climateLabel, genreLabel } from "../../lib/i18n/settings.ts";
import type { CampaignDraft, WizardGates } from "@/app/create-campaign/draft";

// The review step's pure half: every line on the cover and in the read-back,
// worked out from the draft. Nothing here is a constant standing in for a
// choice, which is what scripts/test-world-portals.mjs checks.

// An AI narrator plans the arc, so only then is its length a fact worth a
// stamp. The wording matches LENGTH_INFO on the party step.
export type CoverSheet = {
  title: string;
  theme: string;
  meta: string;
  difficulty: string;
  stampSub: string;
  setting: string;
  party: string;
  dice: string;
  chips: string[];
};

export function coverSheet(
  draft: CampaignDraft,
  gates: Pick<WizardGates, "solo" | "aiNarrates">,
  packName: string | null,
  locale: AppLocale = DEFAULT_LOCALE,
): CoverSheet {
  const t = createTranslator(locale);
  const { solo, aiNarrates } = gates;
  const preset = genrePreset(draft.genre);
  const genreName = genreLabel(draft.genre, locale);
  const party = solo
    ? t("review.soloLevel", { level: draft.startingLevel })
    : t("review.partyLevel", { count: draft.maxPlayers, level: draft.startingLevel });
  const dice = t(draft.dicePolicy === "digital_only" ? "review.digital" : "review.real");
  const chips = [t("review.sky", { climate: locale === "en" ? preset.climate : climateLabel(preset.climate, locale) })];
  if (aiNarrates) {
    chips.push(t("review.lengthChip", { length: t(`review.length.${draft.campaignLength}`), acts: t(`review.acts.${draft.campaignLength}`) }));
  }
  return {
    // The wizard will not reach this step without a title; the fallback is
    // for the cover that is mounted, off screen, before one is typed.
    title: draft.title.trim() || t(solo ? "review.untitledAdventure" : "review.untitledCampaign"),
    theme: draft.theme.trim() || t("review.ownWorld"),
    meta: t(draft.dicePolicy === "digital_only" ? "review.metaDigital" : "review.metaReal", { party: locale === "en" ? party.toLowerCase() : party }),
    difficulty: t(`review.difficulty.${draft.difficulty}`),
    stampSub: aiNarrates ? t(`review.acts.${draft.campaignLength}`) : t("review.level", { level: draft.startingLevel }),
    setting: packName ? t("review.packSetting", { pack: packName, genre: genreName }) : genreName,
    party,
    dice,
    chips,
  };
}
