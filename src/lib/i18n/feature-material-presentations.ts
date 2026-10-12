import { NATIVE_FEATURE_MATERIAL, NATIVE_FEAT_MATERIAL } from "./feature-material-metadata.ts";
import { CORE_FEATURE_NAMES, CORE_FEATURE_HELP } from "./core-feature-metadata.ts";
import { SUBCLASS_FEATURE_MATERIAL } from "./subclass-feature-metadata.ts";
import { classOptionFeatureName, classOptionHelp } from "./class-option-presentations.ts";
import { catalogFor, createTranslator, registeredMessageTemplate } from "./translator.ts";
import { normalizeRulesText } from "../help/rules-text.ts";
import type { AppLocale } from "./locales.ts";

// Display adapters only: rule parsers and saved sheets retain English source.
// Translate a known whole summary, never a name-based replacement of homebrew.
export function nativeFeatureName(name: string, locale: AppLocale): string {
  if (locale === "en") return name;
  const option = classOptionFeatureName(name, locale);
  if (option !== name) return option;
  const core = CORE_FEATURE_NAMES.find(entry => entry.name === name);
  if (core) return createTranslator(locale)(core.key);
  const subclass = SUBCLASS_FEATURE_MATERIAL.find(entry => entry.name === name);
  if (subclass) return createTranslator(locale)(subclass.nameKey);
  const row = NATIVE_FEATURE_MATERIAL.find(entry => entry.name === name);
  return row ? createTranslator(locale)(row.nameKey) : name;
}

export function nativeFeatureHelp(classId: string, name: string, source: string | null | undefined, locale: AppLocale): string | null | undefined {
  if (locale === "en" || !source) return source;
  const option = classOptionHelp(name, source, locale);
  if (option !== source) return option;
  const core = CORE_FEATURE_HELP.find(entry => entry.classId === classId.trim().toLowerCase()
    && entry.name === name && entry.description === source);
  if (core) return createTranslator(locale)(core.descriptionKey);
  const subclass = SUBCLASS_FEATURE_MATERIAL.find(entry => entry.classId === classId.trim().toLowerCase()
    && entry.name === name && registeredMessageTemplate("en", entry.descriptionKey) === source);
  if (subclass) return createTranslator(locale)(subclass.descriptionKey);
  const en = { ...catalogFor("en", "callingMaterial.nativeFeature."), ...catalogFor("en", "callingMaterial.featureOverride.") };
  const row = NATIVE_FEATURE_MATERIAL.find(entry => {
    if (entry.name !== name || ("classId" in entry && entry.classId !== classId.trim().toLowerCase())) return false;
    const original = en[entry.descriptionKey];
    if (!original) return false;
    // describeFeature removes a redundant leading label in help dialogs.
    const prefix = `${name}:`;
    const help = original.trim().toLowerCase().startsWith(prefix.toLowerCase()) ? original.trim().slice(prefix.length).trim() : original;
    return source === help;
  });
  return row ? createTranslator(locale)(row.descriptionKey) : source;
}

export function nativeFeatHelp(name: string | undefined, source: string | null | undefined, locale: AppLocale): string | null | undefined {
  if (locale === "en" || !source) return source;
  const row = NATIVE_FEAT_MATERIAL.find(entry => entry.name === name);
  const original = row && catalogFor("en", "callingMaterial.featHelp.")[row.descriptionKey];
  // Content descriptions normalize markdown/newlines before display. Extra
  // pack effects or a replacement paragraph must keep their original text.
  return row && original && source === normalizeRulesText(original) ? createTranslator(locale)(row.descriptionKey) : source;
}

export function nativeFeatPrerequisite(name: string, source: string | undefined, locale: AppLocale): string | undefined {
  if (locale === "en" || !source) return source;
  const row = NATIVE_FEAT_MATERIAL.find(entry => entry.name === name);
  if (!row || !("prerequisiteKey" in row)) return source;
  return catalogFor("en", "callingMaterial.featRequirement.")[row.prerequisiteKey] === source ? createTranslator(locale)(row.prerequisiteKey) : source;
}
