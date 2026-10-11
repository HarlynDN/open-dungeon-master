// Server-side resource references share the reviewed UI labels, keyed by ID.
// Only the acting sheet's counters are candidates for a tool invocation.
import type { AppLocale } from "@/lib/i18n/locales";
import { resolveNamedReference } from "@/lib/i18n/references";
import { resourceDisplayName } from "@/lib/i18n/resource-names";
import { matchResource, resourceDef, type ResourceDef } from "@/lib/srd/class-resources";
import type { CharacterSheet } from "@/lib/schemas/sheet";

export function resourceReference(def: ResourceDef, locale: AppLocale) {
  const displayName = resourceDisplayName(def.id, def.displayName, locale);
  return { id: def.id, name: def.displayName, displayName, aliases: def.match };
}

export function resolveResourceReference(term: string, definitions: readonly ResourceDef[], locale: AppLocale) {
  return resolveNamedReference(term, definitions.map(def => resourceReference(def, locale)), row => [row.displayName]);
}

export function heldResourceDefinitions(sheet: CharacterSheet): ResourceDef[] {
  return Object.keys(sheet.resources ?? {}).flatMap(id => {
    const def = resourceDef(id);
    return def ? [def] : [];
  });
}

export function resourceEngineName(entry: { id: string; name: string }): string {
  // Dedicated feature handlers use English names. Duplicate display names
  // instead need the ID so the generic matcher selects the intended counter.
  return matchResource(entry.name)?.id === entry.id ? entry.name : entry.id;
}

