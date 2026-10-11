import type { AppLocale } from '@/lib/i18n/locales';
import { equipmentSearchNames } from '@/lib/i18n/equipment-presentations';
import { bundledGearRows } from '@/lib/workshop/bundled-gear-rows';

// An opt-in player browse/search over the same authorized pack/homebrew rows
// plus native equipment. The legacy API keeps its original query behavior.
// Page the combined result once so later pages do not repeat the native book.
export function nativeEquipmentSearch<T extends { name: string; slug: string }>(input: {
  q: string; kind?: string; locale: AppLocale; offset: number; limit: number;
  search: (q: string, offset: number, limit: number) => T[];
}) {
  const queries = [...new Set([input.q, ...equipmentSearchNames(input.q, input.locale)])];
  const rows = new Map<string, T | ReturnType<typeof bundledGearRows>[number]>();
  for (const q of queries) {
    // Same 1600-row ceiling as the existing player catalog browser.
    for (let offset = 0; offset < 1600; offset += 200) {
      const page = input.search(q, offset, 200);
      for (const row of page) if (!rows.has(row.slug)) rows.set(row.slug, row);
      if (page.length < 200) break;
    }
  }
  // Collect filed rows first, including translated queries, so an SRD pack
  // entry takes precedence even when only a later query finds it.
  const filedNames = new Set([...rows.values()].filter(row => 'documentSlug' in row && row.documentSlug === 'wotc-srd').map(row => row.name.trim().toLowerCase()));
  for (const q of queries) for (const row of bundledGearRows(q, input.kind)) {
    if (!filedNames.has(row.name.trim().toLowerCase()) && !rows.has(row.slug)) rows.set(row.slug, row);
  }
  return [...rows.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .slice(input.offset, input.offset + input.limit);
}
