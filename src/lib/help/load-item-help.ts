import { buildItemSheet, type ItemSheet } from "./item-sheet.ts";
import { describeContentEntry } from "./index.ts";
import type { ItemMaterialIdentity } from "../i18n/magic-item-material-presentations.ts";

type Entry = ItemMaterialIdentity & { data?: Record<string, unknown> };
type Reply = { entry?: Entry; results?: Entry[] };
export type ItemHelpResult = {
  sheet: ItemSheet | null;
  descriptionOwner?: ItemMaterialIdentity;
  failed: boolean;
};

// Cache original text independently of the viewer language. Missing slugs are
// normal; transport errors stay visible even with usable bundled fallback facts.
export async function loadItemHelp(
  reference: { slug: string; name?: string },
  campaignId: string | null,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<ItemHelpResult> {
  const name = (reference.name ?? reference.slug).trim();
  const scope = campaignId ? `campaign=${encodeURIComponent(campaignId)}` : "";
  const read = async (url: string): Promise<{ reply: Reply; failed: boolean }> => {
    try {
      const response = await fetcher(url, { signal });
      if (!response.ok) return { reply: {}, failed: response.status !== 404 };
      const reply = await response.json() as Reply;
      return { reply: reply ?? {}, failed: false };
    } catch {
      return { reply: {}, failed: true };
    }
  };
  const [direct, search] = await Promise.all([
    read(`/api/content/items/${encodeURIComponent(reference.slug)}${scope ? `?${scope}` : ""}`),
    read(`/api/content/items?q=${encodeURIComponent(name.toLowerCase())}&limit=20&native=1${scope ? `&${scope}` : ""}`),
  ]);
  const hits = (search.reply.results ?? []).filter(entry => entry.name?.trim().toLowerCase() === name.toLowerCase());
  const entries = [direct.reply.entry, ...hits];
  const sheet = buildItemSheet(name, entries.map(entry => entry?.data));
  const owner = entries.find(entry => describeContentEntry(entry?.data));
  return { sheet, failed: direct.failed || search.failed, descriptionOwner: owner ? {
    name: owner.name, source: owner.source, documentSlug: owner.documentSlug,
  } : undefined };
}
