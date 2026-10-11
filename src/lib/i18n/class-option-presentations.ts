import { CLASS_OPTION_MATERIAL } from "./class-option-metadata.ts";
import { catalogFor, createTranslator } from "./translator.ts";
import { builderTermLabel } from "./builder-name-presentations.ts";
import { findOptionByFeatureName, optionFeatureName, optionKindMeta, type OptionDef } from "../srd/options.ts";
import type { AppLocale } from "./locales.ts";

function materialFor(option: OptionDef) {
  const row = CLASS_OPTION_MATERIAL.find(entry => entry.kind === option.k && entry.name === option.n);
  if (!row) return null;
  const source = catalogFor("en", "callingMaterial.option");
  const requirement = "requirementKey" in row ? source[row.requirementKey] : "emptyRequirement" in row ? "" : undefined;
  return source[row.nameKey] === option.n && source[row.descriptionKey] === option.d && requirement === option.req ? row : null;
}

// Explicit display fields keep the canonical n/k/d/req available to callbacks.
// A pack or authored replacement is never translated just because it reuses a name.
export function classOptionView(option: OptionDef, locale: AppLocale): { name: string; description: string; requirement?: string } {
  const original = { name: option.n, description: option.d, requirement: option.req };
  if (locale === "en") return original;
  const row = materialFor(option);
  if (!row) return original;
  const t = createTranslator(locale);
  return { name: t(row.nameKey), description: t(row.descriptionKey), requirement: "requirementKey" in row ? t(row.requirementKey) : original.requirement };
}

// Native choice features carry a canonical prefix. Authored/case-altered labels
// and mismatched help text retain the original; this never changes the sheet.
export function classOptionFeatureName(name: string, locale: AppLocale): string {
  if (locale === "en") return name;
  const option = findOptionByFeatureName(name);
  if (!option || optionFeatureName(option.k, option.n) !== name || !materialFor(option)) return name;
  return createTranslator(locale)("callingMaterial.optionFeature", { category: builderTermLabel("optionCategory", optionKindMeta(option.k).label, locale), name: classOptionView(option, locale).name });
}
export function classOptionHelp(name: string, source: string | null | undefined, locale: AppLocale): string | null | undefined {
  if (locale === "en" || !source) return source;
  const option = findOptionByFeatureName(name);
  if (!option || optionFeatureName(option.k, option.n) !== name || !materialFor(option)) return source;
  const original = option.req ? `${option.d} (Requires ${option.req}.)` : option.d;
  if (source !== original) return source;
  const view = classOptionView(option, locale);
  return view.requirement ? createTranslator(locale)("callingMaterial.optionHelp", { description: view.description, requirement: view.requirement }) : view.description;
}
