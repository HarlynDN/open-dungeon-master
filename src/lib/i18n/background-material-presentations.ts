import { BACKGROUND_MATERIAL } from "./background-material-metadata.ts";
import { createTranslator, registeredMessageTemplate } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { characterLabel } from "./character-presentations.ts";

export type BackgroundHelpEntry = { id?: string; source?: string; documentSlug?: string; packBlurb?: string;
  blurb?: string; desc?: string; feature?: string; featureDesc?: string };

export function backgroundField(entry: BackgroundHelpEntry, field: "blurb" | "feature" | "featureDesc", locale: AppLocale): string | undefined {
  const source = entry[field];
  if (locale === "en" || !source || entry.source === "homebrew"
    || (entry.documentSlug && !["wotc-srd", "odm-expanded"].includes(entry.documentSlug))) return source;
  const row = BACKGROUND_MATERIAL.find(row => row.id === entry.id);
  const key = row?.[`${field}Key`];
  return key && registeredMessageTemplate("en", key) === source ? createTranslator(locale)(key) : source;
}

export function backgroundHelp(entry: BackgroundHelpEntry, locale: AppLocale = "en"): string | undefined {
  const featureName = backgroundField(entry, "feature", locale);
  const featureDesc = backgroundField(entry, "featureDesc", locale);
  const description = featureDesc ? ` ${featureDesc}` : "";
  const feature = featureName ? locale === "en" ? `**Feature: ${featureName}.**${description}`
    : createTranslator(locale)("callingMaterial.background.frame", { feature: featureName, description }) : "";
  const parts = [entry.packBlurb || backgroundField(entry, "blurb", locale), feature, entry.desc].filter(Boolean);
  return parts.length ? parts.join("\n\n") : undefined;
}

// The native admission printer stores "Feature (Background)". Display only
// that exact pair; custom names and modified paragraphs keep their source.
export function backgroundGrantView(name: string, help: string | null, locale: AppLocale): { name: string; help: string | null } {
  if (locale === "en") return { name, help };
  const row = BACKGROUND_MATERIAL.find(row => name === `${registeredMessageTemplate("en", row.featureKey)} (${row.name})`);
  if (!row) return { name, help };
  const t = createTranslator(locale);
  return { name: `${t(row.featureKey)}（${characterLabel("background", row.id, locale)}）`,
    help: registeredMessageTemplate("en", row.featureDescKey) === help ? t(row.featureDescKey) : help };
}
