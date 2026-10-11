import { GENRE_PRESETS, genrePreset, type GenrePreset } from "@/lib/genres";
import { campaignPlaceholder } from "@/lib/placeholders";
import type { Genre } from "@/lib/schemas/game-settings";
import { createTranslator } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { climateLabel, genreLabel, genreTheme } from "@/lib/i18n/settings";

// The world step's pure half: what a portal card shows, what the DM flavour
// card reads back, and when the theme field may write itself. Kept free of
// JSX so scripts/test-world-portals.mjs can hold it to the presets.

export type PortalCard = {
  id: Genre;
  name: string;
  blurb: string;
  climate: string;
  humansOnly: boolean;
  plate: string;
  chosen: boolean;
  // Stagger for the rise, 40 ms a card as the mockup has it.
  delayMs: number;
};

// A world whose only companion race is human. Post-apocalyptic also allows
// mutants, so it does not wear the chip.
export function isHumansOnly(preset: GenrePreset): boolean {
  return preset.companionRaces.length === 1 && preset.companionRaces[0] === "human";
}

// The plate a genre wears before the campaign has an id to seed a variant
// with. The review cover asks for the same one, so the portal a person
// tapped and the cover they are shown agree.
export function portalPlate(genre: string): string {
  return campaignPlaceholder(genre);
}

export function portalCards(selected: Genre, locale: AppLocale = DEFAULT_LOCALE): PortalCard[] {
  const t = createTranslator(locale);
  return GENRE_PRESETS.map((preset, index) => ({
    id: preset.id,
    name: genreLabel(preset.id, locale),
    blurb: t(`world.${preset.id}.blurb`),
    climate: climateLabel(preset.climate, locale),
    humansOnly: isHumansOnly(preset),
    plate: portalPlate(preset.id),
    chosen: preset.id === selected,
    delayMs: index * 40,
  }));
}

export type WorldFact = { key: string; value: string };

// The four things a preset decides besides the DM's tone. A custom world has
// no name hints of its own, and says so instead of showing an empty chip.
export function worldFacts(genre: string, locale: AppLocale = DEFAULT_LOCALE): WorldFact[] {
  const t = createTranslator(locale);
  const preset = genrePreset(genre);
  return [
    { key: t("world.maps"), value: t(`world.${preset.id}.maps`) },
    { key: t("world.names"), value: t(`world.${preset.id}.names`) },
    { key: t("world.people"), value: t(`world.${preset.id}.people`) },
    { key: t("world.sky"), value: t("world.weatherTable", { climate: climateLabel(preset.climate, locale) }) },
  ];
}

export function dmFlavorText(genre: string, locale: AppLocale = DEFAULT_LOCALE): string {
  return createTranslator(locale)(`world.${genrePreset(genre).id}.tone`);
}

// ---- the theme that writes itself ----

type ThemeSlice = { genre: Genre; theme: string; themeTouched: boolean; worldPack: string; locale?: AppLocale };

// The theme a draft should carry once its genre is settled. A theme the
// person typed is never clobbered, and neither is one a world pack wrote:
// the pack is the more specific of the two. Otherwise the preset's line is
// fair game, which is the same rule applyPack follows for packs.
export function presetTheme<T extends ThemeSlice>(draft: T): T {
  if (draft.themeTouched || draft.worldPack) {
    return draft;
  }
  return { ...draft, theme: genreTheme(draft.genre, draft.locale) };
}

export const TYPE_MS_PER_CHAR = 22;

export type TypeInPlan = { text: string; chars: number; typeMs: number; sweepMs: number };

function planFor(text: string): TypeInPlan {
  const chars = text.length;
  return { text, chars, typeMs: chars * TYPE_MS_PER_CHAR, sweepMs: chars * TYPE_MS_PER_CHAR + 300 };
}

// Whether picking `genre` should play the type-in, and for how long. Null
// when the person owns the theme, when a preset has nothing to write (custom)
// or when the line would not change.
export function typeInPlan(
  draft: { theme: string; themeTouched: boolean; locale?: AppLocale },
  genre: string,
): TypeInPlan | null {
  if (draft.themeTouched) {
    return null;
  }
  const text = genreTheme(genrePreset(genre).id, draft.locale);
  if (!text || text === draft.theme) {
    return null;
  }
  return planFor(text);
}

// The first time the world step comes on screen, the line the preset already
// wrote plays once, so the person sees where it came from. A pack's theme and
// a typed one are left alone.
export function arrivalTypeIn(draft: ThemeSlice): TypeInPlan | null {
  if (draft.themeTouched || draft.worldPack || !draft.theme) {
    return null;
  }
  return draft.theme === genreTheme(draft.genre, draft.locale) ? planFor(draft.theme) : null;
}
