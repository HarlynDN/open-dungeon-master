import "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translator";
import { combatName, combatTermLabel } from "@/lib/i18n/combat-ui-presentations";
import { dmResultPresentation } from "@/lib/i18n/dm-result-presentations";
import { nativeFeatureName } from "@/lib/i18n/feature-material-presentations";
import { featTermLabel } from "@/lib/i18n/feat-presentations";
import type { OpportunityEventData, SystemEvent } from "@/lib/system-events";

const DAMAGE_TYPES = new Set(["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]);
function opportunityFeatureName(name: string, locale: SystemEvent["locale"]): string {
  if (name === "Sneak Attack") return createTranslator(locale)("playerLog.detail.sneakName");
  return featTermLabel("feat", nativeFeatureName(name, locale), locale);
}
// Only the exact frames emitted by the native damage/rider producers. An
// unknown extension note stays literal; player/model prose is never scanned.
export function opportunityDetailText(source: string, locale: SystemEvent["locale"], depth = 0): string {
  if (locale === "en" || depth > 2) return source;
  const t = createTranslator(locale);
  const view = dmResultPresentation(locale, { characters: [], enemies: [] });
  if (source === "resistant to all damage: halved") return t("playerLog.detail.resistAll");
  if (source === "Sentinel: its speed is 0 for the rest of the turn") return t("playerLog.detail.sentinel");
  const patterns = [
    [/^immune to ([a-z]+) damage: no damage$/, "playerLog.detail.immune"],
    [/^resistant to ([a-z]+) damage: halved$/, "playerLog.detail.resist"],
    [/^vulnerable to ([a-z]+) damage: doubled$/, "playerLog.detail.vulnerable"],
    [/^resistant and vulnerable to ([a-z]+) damage: halved, then doubled$/, "playerLog.detail.both"],
  ] as const;
  for (const [pattern, key] of patterns) {
    const m = pattern.exec(source);
    if (m && DAMAGE_TYPES.has(m[1])) return t(key, { type: view?.term("damageType", m[1]) ?? m[1] });
  }
  const part = /^(\d+) ([a-z]+)(?: \((.+)\))?$/.exec(source);
  if (part && DAMAGE_TYPES.has(part[2])) return t("playerLog.detail.part", { amount: part[1], type: view?.term("damageType", part[2]) ?? part[2], note: part[3] ? t("playerLog.opportunity.details", { notes: opportunityDetailText(part[3], locale, depth + 1) }) : "" });
  const sneak = /^Sneak Attack: \+(\d+)d6(?: \((.+): \+(\d+)d6\))?$/.exec(source);
  if (sneak) return t("playerLog.detail.sneak", { feature: opportunityFeatureName("Sneak Attack", locale), dice: sneak[1], bonus: sneak[2] ? t("playerLog.detail.sneakBonus", { feature: opportunityFeatureName(sneak[2], locale), dice: sneak[3] }) : "" });
  const used = /^(.+) already used this turn: no extra dice$/.exec(source);
  if (used) return t("playerLog.detail.spent", { feature: opportunityFeatureName(used[1], locale) });
  const great = /^Great Weapon Fighting: rerolling damage dice of (\d+) or less$/.exec(source);
  if (great) return t("playerLog.detail.greatWeapon", { threshold: great[1] });
  return view?.native(source, "notes") ?? source;
}

export function opportunityEventText(event: OpportunityEventData & Pick<SystemEvent, "locale">): string {
  if (event.locale === "en") return event.english;
  const t = createTranslator(event.locale);
  const enemyActs = event.mode.startsWith("enemy") || event.mode === "evaded";
  const actor = enemyActs ? combatName(event.actor, "enemy", event.locale) : event.actor;
  const target = enemyActs ? event.target : combatName(event.target, "enemy", event.locale);
  const view = dmResultPresentation(event.locale, { characters: [enemyActs ? event.target : event.actor], enemies: [enemyActs ? event.actor : event.target] });
  const details = event.details?.map(source => opportunityDetailText(source, event.locale)).join("；") ?? "";
  const state = event.dropped ? t("playerLog.opportunity.dropped", { target }) : event.health ? t("playerLog.opportunity.health", { health: view?.term("health", event.health) ?? event.health }) : "";
  return t(`playerLog.opportunity.${event.mode}`, {
    actor, target, total: event.total ?? 0, ac: event.ac ?? 0, damage: event.damage ?? 0,
    critical: event.critical ? t("playerLog.opportunity.critical") : "",
    feature: event.feature ? opportunityFeatureName(event.feature, event.locale) : "",
    parry: event.parryBonus ? t("playerLog.opportunity.parry", { target, bonus: event.parryBonus }) : "",
    details: details ? t("playerLog.opportunity.details", { notes: details }) : "",
    conditions: event.conditions?.length ? t("playerLog.opportunity.conditions", { target, conditions: event.conditions.map(condition => combatTermLabel("condition", condition, event.locale)).join("、") }) : "",
    state,
  });
}
