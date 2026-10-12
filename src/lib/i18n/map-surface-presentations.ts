import { createTranslator, registeredMessageTemplate, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { Skin, SkinChar } from "../battlemap/skins.ts";
import type { TileEntry } from "../battlemap/render/painted.ts";
import { materialChoices } from "../../app/campaigns/[campaignId]/mapCatalogue.ts";
import { mapSkinGroup } from "./map-forge-presentations.ts";

export function mapSkinNote(skin: Pick<Skin, "id" | "note">, locale: AppLocale): string {
  if (locale === "en") return skin.note;
  const key = `mapSurfaceUi.skinNote.${skin.id}` as MessageKey;
  return registeredMessageTemplate("en", key) === skin.note ? createTranslator(locale)(key) : skin.note;
}

export function mapMaterialLabel(material: Pick<TileEntry, "id" | "label"> | string, locale: AppLocale): string {
  const id = typeof material === "string" ? material : material.id;
  const raw = typeof material === "string" ? material : material.label ?? id;
  if (locale === "en") return raw;
  const key = `mapSurfaceUi.material.${id}` as MessageKey, source = registeredMessageTemplate("en", key);
  // Binding-only views can name a known native ID before its art loads.
  // A changed/custom label is authored text and always survives literally.
  return source && (typeof material === "string" || material.label === undefined || material.label === source)
    ? createTranslator(locale)(key) : raw;
}

const ROLE_KEYS = { ".": "floor", "#": "wall", "~": "water", ",": "rough", "+": "door", "|": "lowwall" } as const;
export function mapMaterialRole(char: SkinChar, locale: AppLocale): string {
  return createTranslator(locale)(`mapSurfaceUi.role.${ROLE_KEYS[char]}`);
}

export function localizedMaterialChoices(tiles: readonly TileEntry[], char: SkinChar, genre: string | null | undefined, theme: string, query: string, locale: AppLocale) {
  if (locale === "en") return materialChoices(tiles, char, genre, theme, query);
  const needle = query.trim().toLowerCase();
  // Keep native category eligibility, group priority, ordering and tile
  // identity; Chinese search also matches the translated owned display name.
  return materialChoices(tiles, char, genre, theme, "").map(group => ({
    ...group, group: mapSkinGroup(group.group, locale), tiles: group.tiles.filter(tile => !needle
      || mapMaterialLabel(tile, locale).toLowerCase().includes(needle)
      || (tile.label ?? "").toLowerCase().includes(needle) || tile.id.includes(needle)),
  })).filter(group => group.tiles.length);
}
