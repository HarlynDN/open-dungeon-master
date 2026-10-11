import { createTranslator, type MessageKey } from "./translator.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";
import type { Genre } from "../schemas/game-settings-options.ts";
import type { Climate } from "../srd/weather.ts";

const GENRE_KEYS = {
  high_fantasy: "genre.highFantasy", dark_fantasy: "genre.darkFantasy",
  mystery: "genre.mystery", horror: "genre.horror", cyberpunk: "genre.cyberpunk",
  steampunk: "genre.steampunk", post_apocalyptic: "genre.postApocalyptic", custom: "genre.custom",
} satisfies Record<Genre, MessageKey>;

export function genreLabel(genre: Genre, locale: AppLocale = DEFAULT_LOCALE): string {
  return createTranslator(locale)(GENRE_KEYS[genre]);
}

export function climateLabel(climate: Climate, locale: AppLocale = DEFAULT_LOCALE): string {
  return createTranslator(locale)(`world.climate.${climate}`);
}

// Authored defaults follow the campaign's language. An empty custom world
// remains empty; callers protect anything written by a player or a pack.
export function genreTheme(genre: Genre, locale: AppLocale = DEFAULT_LOCALE): string {
  return genre === "custom" ? "" : createTranslator(locale)(`world.${genre}.theme`);
}
