import { DM_FIELD_COPY, DM_FIELD_IDENTITIES } from "./dm-field-metadata.ts";
import { createTranslator } from "./translator.ts";
import { dmActionSource, dmActionView } from "./dm-action-presentations.ts";
import { dmToolsText } from "./dm-tools-presentations.ts";
import type { AppLocale } from "./locales.ts";
import type { CatalogEntry, CatalogField } from "../dm/catalog-types.ts";

export const DM_ACTION_NETWORK_FAILURE = "Could not reach the server.";
export const DM_ACTION_REFUSED = "The engine refused that.";

// This projector is exclusively for repository-owned catalog metadata, never
// authored descriptions, submitted values or natural-language tool results.
export function dmCatalogText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const key = Object.hasOwn(DM_FIELD_COPY, source) ? DM_FIELD_COPY[source as keyof typeof DM_FIELD_COPY] : undefined;
  return key ? createTranslator(locale)(key) : source;
}
export function dmFieldView(action: string, field: CatalogField, locale: AppLocale): CatalogField {
  if (locale === "en" || !Object.hasOwn(DM_FIELD_IDENTITIES, action) || !DM_FIELD_IDENTITIES[action]?.some(source =>
    source.name === field.name && source.kind === field.kind && source.label === field.label)) return field;
  const text = (value: string) => dmCatalogText(value, locale);
  return { ...field, label: text(field.label),
    ...(field.help ? { help: text(field.help) } : {}),
    ...(field.placeholder ? { placeholder: text(field.placeholder) } : {}),
    ...(field.options ? { options: field.options.map(option => ({ ...option, label: text(option.label) })) } : {}),
    ...(field.other ? { other: { ...field.other, label: text(field.other.label),
      ...(field.other.placeholder ? { placeholder: text(field.other.placeholder) } : {}) } } : {}),
  };
}
export function dmActionError(source: string, entry: CatalogEntry, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  if (source === "The engine refused that.") return t("dmField.refused");
  if (source === "Could not reach the server.") return t("dmField.network");
  if (dmActionSource(entry)) {
    const action = dmActionView(entry, locale).label;
    for (const field of entry.fields) {
      const view = dmFieldView(entry.name, field, locale);
      if (source === `${entry.label} needs ${field.label.toLowerCase()}.`) return t("dmField.needs", { action, field: view.label });
      if (source === `${field.label} must be a number.`) return t("dmField.number", { field: view.label });
      if (source === `${field.label} must be true or false.`) return t("dmField.boolean", { field: view.label });
      if (source === `${field.label} must be a list of rows.`) return t("dmField.rows", { field: view.label });
      if (field.options && source === `${field.label} must be one of: ${field.options.map(option => option.value).join(", ")}.`) {
        return t("dmField.oneOf", { field: view.label, choices: view.options!.map(option => option.label).join(t("dmField.listSeparator")) });
      }
    }
  }
  return dmToolsText(source, locale);
}
