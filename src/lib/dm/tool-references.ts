// Translate only fields that select rules entries. Narrative names, reasons,
// NPCs, protocol enums and IDs remain the caller's original values. Both
// turn.ts and invoke-dispatch.ts enter here before any rules mutation.
import type { Campaign } from "@/lib/db/campaigns";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { allPackSpells, searchSpells, searchItems } from "@/lib/content";
import { bundledSpellNames, bundledSpellFacts } from "@/lib/srd/spell-facts";
import { SRD_WEAPONS } from "@/lib/srd/weapons";
import { resolveMonster } from "@/lib/bestiary";
import { spellAuthorsFor } from "@/lib/dm/spell-authors";
import { getSheetById } from "@/lib/db/sheets";
import { getParty } from "@/lib/db/party";
import { getShop, findShopNear } from "@/lib/db/shops";
import { getCurrentLocation } from "@/lib/db/locations";
import { listNpcs } from "@/lib/db/npcs";
import { resolveReference, translatedReferenceNames, type ReferenceCandidate } from "@/lib/i18n/references";
import type { ReferenceKind } from "@/lib/i18n/reference-names";
import { RESOURCE_DEFS } from "@/lib/srd/class-resources";
import { heldResourceDefinitions, resolveResourceReference, resourceEngineName } from "@/lib/dm/resource-references";

type Outcome = { args: string } | { result: Record<string, unknown> };
type Context = { campaign: Campaign; sheets: CharacterSheet[]; sheetsById: Map<string, CharacterSheet> };

const SPELL_TOOLS = new Set([
  "pc_attack", "cast_at_enemy", "cast_at_player", "cast_buff", "aoe_damage",
  "use_spell_slot", "learn_spell", "heal", "use_item", "take_action",
  "use_reaction", "teleport_token", "set_condition",
]);

function candidates(names: readonly string[]): ReferenceCandidate[] {
  return [...new Set(names)].map(name => ({ id: name, name }));
}

function spellCandidates(campaign: Campaign): ReferenceCandidate[] {
  const pack = allPackSpells();
  const byName = new Map(pack.map(row => [row.name.toLowerCase(), { id: row.slug, name: row.name, aliases: row.aliases }]));
  for (const name of bundledSpellNames()) {
    if (!byName.has(name.toLowerCase())) {
      byName.set(name.toLowerCase(), { id: name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, "-"), name, aliases: bundledSpellFacts(name)?.aliases ?? [] });
    }
  }
  for (const row of searchSpells({ userIds: spellAuthorsFor(campaign), includeArchived: true, limit: 200 })) {
    if (row.source === "homebrew") byName.set(row.name.toLowerCase(), { id: row.slug, name: row.name, aliases: row.aliases });
  }
  return [...byName.values()];
}

export function canonicalizeToolReferences(name: string, sentArguments: string, context: Context): Outcome {
  let args: Record<string, unknown>;
  try {
    args = JSON.parse(sentArguments || "{}");
  } catch {
    return { args: sentArguments };
  }
  if (!args || typeof args !== "object" || Array.isArray(args)) return { args: sentArguments };
  const { campaign } = context;
  const locale = campaign.gameSettings.locale;
  let failure: Record<string, unknown> | undefined;
  let changed = false;
  const put = (record: Record<string, unknown>, field: string, value: string) => {
    if (record[field] !== value) { record[field] = value; changed = true; }
  };
  const resolve = (record: Record<string, unknown>, field: string, kind: ReferenceKind, rows: ReferenceCandidate[]) => {
    const term = record[field];
    if (typeof term !== "string" || !term.trim() || failure) return;
    const found = resolveReference(kind, term, rows, locale);
    if (found.kind === "matched") {
      // Existing names/aliases must retain the old engine spelling. Some
      // bundled rules distinguish the SRD title from a book's named title
      // (Faithful Hound / Mordenkainen's Faithful Hound). Only an ID or a
      // localized alias needs rewriting at this new ingress.
      const alreadyNamed = [found.entry.name, ...(found.entry.aliases ?? [])]
        .some(value => value.trim().toLowerCase() === term.trim().toLowerCase());
      if (!alreadyNamed) put(record, field, found.entry.name);
    } else if (found.kind === "ambiguous") {
      failure = { error: `Ambiguous ${kind} reference "${term}" in ${field}; choose ${found.choices.map(row => `${row.name} (${row.id})`).join(", ")}.`, retry: true, choices: found.choices.map(row => ({ id: row.id, name: row.name })) };
    } else if (translatedReferenceNames(kind, term, locale).length) {
      failure = { error: `"${term}" does not select a ${kind} available to this action. Use a canonical name or ID from the current game state.`, retry: true };
    }
    // Unknown/invented names retain the engine's existing validation; a
    // homebrew canonical name may itself be Chinese.
  };
  const sheetRef = typeof args.characterId === "string" ? args.characterId.trim() : undefined;
  const snapshot = typeof sheetRef === "string"
    ? context.sheetsById.get(sheetRef) ?? context.sheets.find(sheet => sheet.name.toLowerCase() === sheetRef.toLowerCase())
    : undefined;
  const fresh = snapshot ? getSheetById(snapshot.id) ?? snapshot : undefined;
  const equipment = fresh?.campaignId === campaign.id ? candidates(fresh.equipment.map(item => item.name)) : [];

  if (name === "use_resource" && fresh?.campaignId === campaign.id) {
    const field = args.resource !== undefined && args.resource !== null ? "resource" : "name";
    const term = args[field];
    if (typeof term === "string" && term.trim()) {
      const found = resolveResourceReference(term, heldResourceDefinitions(fresh), locale);
      if (found.kind === "matched") put(args, field, resourceEngineName(found.entry));
      else if (found.kind === "ambiguous") {
        failure = {
          error: `Ambiguous resource reference "${term}"; choose a resource ID from this character's Resources list.`,
          retry: true,
          choices: found.choices.map(({ id, name, displayName }) => ({ id, name, displayName })),
        };
      } else if (resolveResourceReference(term, RESOURCE_DEFS, locale).kind !== "unknown") {
        failure = { error: `"${term}" is not a tracked resource available to this character. Use a canonical name or ID from their Resources list.`, retry: true };
      }
      // Untracked named feature spends still enter their dedicated handlers.
      // Unknown terms retain ordinary engine validation, never fuzzy CJK matches.
    }
  }

  if (SPELL_TOOLS.has(name)) {
    const fields = name === "use_spell_slot" || name === "learn_spell" ? ["spell", "name"] : ["spell"];
    if (fields.some(field => typeof args[field] === "string" && args[field])) {
      const rows = spellCandidates(campaign);
      for (const field of fields) resolve(args, field, "spell", rows);
    }
  }
  if (name === "pc_attack" || name === "damage_object") {
    // A published but unowned weapon stays unowned in resolveAttackWeapon.
    // A carried item always wins over the corresponding published name.
    const rows = [...equipment, ...candidates(SRD_WEAPONS.map(weapon => weapon.name)).filter(row => !equipment.some(owned => owned.name === row.name)), { id: "unarmed", name: "Unarmed strike", aliases: ["unarmed", "fist", "punch", "kick"] }];
    resolve(args, "weapon", "equipment", rows);
  }
  const carriedFields = name === "use_item" ? ["item", "name"]
    : name === "remove_item" || name === "reveal_item" ? ["name"]
    : name === "sell_item" || name === "take_action" || (name === "purchase" && args.action === "sell") ? ["item"] : [];
  for (const field of carriedFields) resolve(args, field, "equipment", equipment);
  if (name === "party_stash") {
    resolve(args, "name", "equipment", args.do === "take" ? candidates(getParty(campaign.id).inventory.map(item => item.name)) : equipment);
  }
  if (name === "buy_item" && typeof args.shop === "string") {
    const direct = getShop(args.shop);
    const shop = direct?.campaignId === campaign.id ? direct : findShopNear(campaign.id, getCurrentLocation(campaign.id), args.shop);
    if (shop) resolve(args, "item", "equipment", candidates(shop.stock.map(item => item.itemName)));
  }
  if (name === "grant_item" || name === "purchase" && args.action !== "sell") {
    const field = name === "grant_item" ? "name" : "item";
    const term = args[field];
    if (typeof term === "string") {
      const rows = translatedReferenceNames("equipment", term, locale).flatMap(canonical => {
        const found = searchItems({ q: canonical, userIds: spellAuthorsFor(campaign), limit: 200 });
        return found.filter(row => row.name.toLowerCase() === canonical).map(row => ({ id: row.slug, name: row.name }));
      });
      // The SRD tables/price engine still work without a downloaded pack.
      resolve(args, field, "equipment", rows.length ? rows : candidates(translatedReferenceNames("equipment", term, locale)));
    }
  }
  const monster = (record: Record<string, unknown>, field: string) => {
    const term = record[field];
    if (typeof term !== "string" || !term.trim() || failure) return;
    const translated = translatedReferenceNames("monster", term, locale);
    if (!translated.length) return;
    // Named campaign NPCs and exact canonical references keep priority over
    // a glossary alias; do not replace a table's NPC called 地精 with Goblin.
    const npc = listNpcs(campaign.id).find(entry => entry.name.toLowerCase() === term.toLowerCase() || entry.aliases.some(alias => alias.toLowerCase() === term.toLowerCase()));
    if (npc) return;
    const authors = spellAuthorsFor(campaign);
    const exact = resolveMonster(term, campaign.gameSettings, { userIds: authors });
    if (exact && [exact.slug, exact.baseName, exact.reskinName].some(value => value?.toLowerCase() === term.toLowerCase())) return;
    const rows = translated.flatMap(canonical => {
      const entry = resolveMonster(canonical, campaign.gameSettings, { userIds: authors });
      return entry ? [{ id: entry.slug, name: entry.baseName, aliases: [term] }] : [];
    });
    const found = resolveReference("monster", term, rows, locale);
    if (found.kind === "matched") put(record, field, found.entry.id);
    else if (found.kind === "ambiguous") failure = { error: `Ambiguous monster reference "${term}"; choose ${found.choices.map(row => `${row.name} (${row.id})`).join(", ")}.`, retry: true, choices: found.choices };
    else failure = { error: `Unknown monster "${term}" in this catalog. Use a canonical monster ID.`, retry: true };
  };
  if (name === "start_encounter" || name === "add_enemies") {
    monster(args, "monster");
    if (Array.isArray(args.enemies)) for (const enemy of args.enemies) {
      if (enemy && typeof enemy === "object" && !Array.isArray(enemy)) monster(enemy, "monster");
    }
  }
  if (name === "request_roll" || name === "group_check") monster(args, "againstMonster");
  if (name === "use_resource" || name === "summon_pet") monster(args, "form");
  if (name === "cast_buff" || name === "cast_at_enemy") {
    // variant also holds non-creature choices (e.g. Command): only treat it
    // as a monster for transformation spells, never rewrite narrative text.
    if (typeof args.spell === "string" && /^(?:true )?polymorph$/i.test(args.spell)) monster(args, "variant");
  }
  // Keep the exact wire arguments for unchanged calls and in the caller's
  // conversation/audit. The normalized copy alone reaches the engine.
  return failure ? { result: failure } : { args: changed ? JSON.stringify(args) : sentArguments };
}
