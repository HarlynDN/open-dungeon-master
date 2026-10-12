import { characterLabel } from "./character-presentations.ts";
import { APP_LOCALES, type AppLocale } from "./locales.ts";

// A registered stock ID is insufficient on its own: content packs can reuse
// it with their own name. Translate only the unchanged repository name.
export function builderOptionName(kind: "race" | "class" | "background", entry: {
  id: string; name: string; packName?: string; documentSlug?: string; source?: string;
}, locale: AppLocale): string {
  if (locale === "en" || entry.packName || entry.source === "homebrew" || (entry.documentSlug && !["wotc-srd", "odm-expanded"].includes(entry.documentSlug))) return entry.name;
  return characterLabel(kind, entry.id, "en") === entry.name
    ? characterLabel(kind, entry.id, locale) : entry.name;
}

// Search does not depend on the current display locale. New registered
// locales participate automatically; authored names keep their own text.
export function builderOptionSearchNames(kind: "race" | "class" | "background", entry: {
  id: string; name: string; packName?: string; documentSlug?: string; source?: string;
}): string[] {
  return [...new Set(APP_LOCALES.map(locale => builderOptionName(kind, entry, locale)))];
}
