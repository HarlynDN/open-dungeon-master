import { characterFlowSource } from "@/lib/characters/flow-source";
// What a character sheet shows about the character's state, computed by the
// engine's own functions so the sheet dialog, the party panel and the party
// rail say what the rules engine holds:
//   - hit points against effectiveMaxHp (exhaustion 4 halves the maximum, an
//     Amulet of Health raises it), not the stored maxHp;
//   - speed as the move route counts it: armor and gear (speedFor), then the
//     conditions (effectiveSpeed), then exhaustion (exhaustionSpeed);
//   - the combat state kept beside the conditions: exhaustion with what each
//     level does, concentration, the death track, a readied action and its
//     trigger, Inspiration;
//   - every hit die pool of a multiclass character;
//   - resistances and immunities (pcResistances, pcImmunities);
//   - a magic item's charges, a pending attunement, a curse.
// Pure (no React, no database): scripts/test-hand-engine.mjs drives it.
import {
  describeExhaustion,
  effectiveMaxHp,
  effectiveSpeed,
  exhaustionSpeed,
  incapacitatedBy,
  pcImmunities,
  pcResistances,
} from "@/lib/dm/condition-logic";
import { attunementRefusal } from "@/lib/dm/usage-rules";
import type { CharacterSheet, EquipmentItem } from "@/lib/schemas/sheet";
import { speedFor } from "@/lib/srd";
import { UNLIMITED_USES, resourceDef } from "@/lib/srd/class-resources";
import { chargeMax, chargeRuleOf, chargesLeft } from "@/lib/srd/item-charge-rules";
import { gearDefFor } from "@/lib/srd/magic-gear";
import { matchArmor } from "@/lib/srd/armor";
import { matchMagicItem } from "@/lib/srd/magic-items";
import { conditionNote, conditionNoteLine } from "@/lib/battlemap/condition-notes";
import { conditionPresentation, type ConditionNameLookup } from "@/lib/battlemap/condition-presentation";
import { sheetResourceHelp } from "@/lib/i18n/sheet-dialog-presentations";
import { CONDITION_MATERIAL_INDEX } from "@/lib/i18n/condition-material-index";
import { conditionDisplay, conditionLabel } from "@/lib/i18n/condition-presentations";
import { damageListLabel, exhaustionSummary } from "@/lib/i18n/sheet-play-presentations";
import { referenceDisplayName } from "@/lib/i18n/references";
import { createTranslator } from "@/lib/i18n/translator";
import type { AppLocale } from "@/lib/i18n/locales";

// ---- hit points ----

export function maxHpView(sheet: CharacterSheet, locale: AppLocale = "en"): { max: number; stored: number; note: string | null } {
  const max = effectiveMaxHp(sheet);
  const exhaustion = sheet.exhaustion ?? 0;
  const note =
    max === sheet.maxHp
      ? null
      : exhaustion >= 4 && max < sheet.maxHp
        ? `Hit point maximum halved by exhaustion ${exhaustion} (${sheet.maxHp} without it).`
        : max > sheet.maxHp
          ? `Raised by worn, attuned gear that sets Constitution (${sheet.maxHp} without it).`
          : `The rules put the maximum at ${max} right now (${sheet.maxHp} on the sheet).`;
  if (locale === "en" || !note) return { max, stored: sheet.maxHp, note };
  const key = exhaustion >= 4 && max < sheet.maxHp ? "sheetPlay.hp.exhaustion" : max > sheet.maxHp ? "sheetPlay.hp.gear" : "sheetPlay.hp.other";
  return { max, stored: sheet.maxHp, note: createTranslator(locale)(key, { level: exhaustion, stored: sheet.maxHp, max }) };
}

// ---- speed ----

const ZEROING = ["grappled", "restrained", "incapacitated", "paralyzed", "stunned", "unconscious", "petrified"];

export function speedView(
  sheet: CharacterSheet,
  options: { encumbrance?: boolean } = {},
  locale: AppLocale = "en",
): { speed: number; base: number; notes: string[] } {
  const worn = speedFor(sheet, { encumbrance: options.encumbrance ?? false });
  const conditioned = effectiveSpeed(sheet.conditions, worn);
  const exhaustion = sheet.exhaustion ?? 0;
  const speed = exhaustionSpeed(exhaustion, conditioned);
  const notes: string[] = [];
  if (worn !== sheet.speed) {
    notes.push(`Base ${sheet.speed} ft, ${worn} ft with what they wear and carry.`);
  }
  if (conditioned !== worn) {
    const zeroing = sheet.conditions.find((entry) => ZEROING.includes(entry.trim().toLowerCase()));
    notes.push(zeroing ? `${zeroing}: speed 0.` : `Effects on them change it to ${conditioned} ft.`);
  }
  if (speed !== conditioned) {
    notes.push(`Exhaustion ${exhaustion}: ${exhaustion >= 5 ? "speed 0" : "speed halved"}.`);
  }
  if (locale === "en") return { speed, base: sheet.speed, notes };
  const t = createTranslator(locale);
  const translated: string[] = [];
  if (worn !== sheet.speed) translated.push(t("sheetPlay.speed.gear", { base: sheet.speed, worn }));
  if (conditioned !== worn) {
    const zeroing = sheet.conditions.find(entry => ZEROING.includes(entry.trim().toLowerCase()));
    translated.push(zeroing ? t("sheetPlay.speed.stopped", { condition: conditionLabel(zeroing, locale) }) : t("sheetPlay.speed.effect", { speed: conditioned }));
  }
  if (speed !== conditioned) translated.push(t("sheetPlay.speed.exhaustion", { level: exhaustion, effect: t(exhaustion >= 5 ? "sheetPlay.speed.zero" : "sheetPlay.speed.half") }));
  return { speed, base: sheet.speed, notes: translated };
}

// ---- the state beside the conditions ----

export type StateTag = {
  id: "exhaustion" | "concentration" | "dying" | "stable" | "dead" | "readied" | "inspiration" | "incapacitated";
  label: string;
  tone: "harm" | "ward" | "bless" | "neutral";
  note: string;
};

export function stateTags(sheet: CharacterSheet, locale: AppLocale = "en"): StateTag[] {
  const tags: StateTag[] = [];
  const saves = sheet.deathSaves;
  if (saves?.dead) {
    tags.push({ id: "dead", label: characterFlowSource("sheetPlay.dead"), tone: "harm", note: "Only magic that raises the dead brings them back." });
  } else if (saves && sheet.currentHp <= 0) {
    tags.push(
      saves.stable
        ? { id: "stable", label: characterFlowSource("sheetPlay.stable"), tone: "neutral", note: "Unconscious at 0 hit points, no longer rolling death saves." }
        : {
            id: "dying",
            label: characterFlowSource("sheetPlay.dying.count", { successes: saves.successes, failures: saves.failures }),
            tone: "harm",
            note: `Death saves: ${saves.successes} success${saves.successes === 1 ? "" : "es"}, ${saves.failures} failure${saves.failures === 1 ? "" : "s"}. Three successes stabilize, three failures kill.`,
          },
    );
  }
  const stopped = incapacitatedBy(sheet.conditions);
  if (stopped && sheet.currentHp > 0) {
    tags.push({ id: "incapacitated", label: characterFlowSource("sheetPlay.incapacitated", { condition: stopped }), tone: "harm", note: `${sheet.name} can take no actions or reactions while ${stopped}.` });
  }
  const exhaustion = sheet.exhaustion ?? 0;
  if (exhaustion > 0) {
    tags.push({ id: "exhaustion", label: characterFlowSource("sheetPlay.exhaustion", { level: exhaustion }), tone: "harm", note: `${describeExhaustion(exhaustion)}. A long rest lowers it by one.` });
  }
  if (sheet.concentratingOn) {
    tags.push({
      id: "concentration",
      label: characterFlowSource("sheetPlay.concentration", { spell: sheet.concentratingOn }),
      tone: "bless",
      note: "Damage calls for a CON save (DC 10 or half the damage); another concentration spell, or falling unconscious, ends it.",
    });
  }
  const readied = sheet.conditions.find((entry) => entry.trim().toLowerCase() === "readied");
  if (readied) {
    const trigger = sheet.conditionMeta?.[readied]?.source;
    tags.push({
      id: "readied",
      label: characterFlowSource("sheetPlay.readied"),
      tone: "ward",
      note: trigger ? `When ${trigger}: the readied attack, with the reaction. It lapses when their next turn starts.` : "An action held for its trigger; it lapses when their next turn starts.",
    });
  }
  const inspiration = sheet.resources?.inspiration;
  if (inspiration && inspiration.used < inspiration.max) {
    tags.push({ id: "inspiration", label: characterFlowSource("sheetPlay.inspiration"), tone: "bless", note: "Spend it for advantage on one attack, save or check." });
  }
  if (locale === "en") return tags;
  const t = createTranslator(locale);
  return tags.map(tag => {
    switch (tag.id) {
      case "dead": return { ...tag, label: t("sheetPlay.dead"), note: t("sheetPlay.dead.note") };
      case "stable": return { ...tag, label: t("sheetPlay.stable"), note: t("sheetPlay.stable.note") };
      case "dying": {
        const counts = { successes: saves!.successes, failures: saves!.failures,
          successWord: t(saves!.successes === 1 ? "sheetPlay.success.one" : "sheetPlay.success.many"),
          failureWord: t(saves!.failures === 1 ? "sheetPlay.failure.one" : "sheetPlay.failure.many") };
        return { ...tag, label: t("sheetPlay.dying.count", counts), note: t("sheetPlay.dying.note", counts) };
      }
      case "incapacitated": {
        const condition = conditionLabel(stopped!, locale);
        return { ...tag, label: t("sheetPlay.incapacitated", { condition }), note: t("sheetPlay.incapacitated.note", { name: sheet.name, condition }) };
      }
      case "exhaustion": return { ...tag, label: t("sheetPlay.exhaustion", { level: exhaustion }), note: t("sheetPlay.exhaustion.lower", { effects: exhaustionSummary(exhaustion, locale) }) };
      case "concentration": return { ...tag, label: t("sheetPlay.concentration", { spell: referenceDisplayName("spell", sheet.concentratingOn!, locale) }), note: t("sheetPlay.concentration.note") };
      case "readied": {
        const trigger = readied ? sheet.conditionMeta?.[readied]?.source : undefined;
        return { ...tag, label: t("sheetPlay.readied"), note: t(trigger ? "sheetPlay.readied.trigger" : "sheetPlay.readied.note", { trigger: trigger ?? "" }) };
      }
      case "inspiration": return { ...tag, label: t("sheetPlay.inspiration"), note: t("sheetPlay.inspiration.note") };
    }
  });
}

// A condition's chip tail from its metadata: "until Kael's turn", "save
// ends (WIS 13)", "from Goblin 2", "3 rounds".
export function conditionDetail(sheet: CharacterSheet, condition: string, nameOf: (id: string) => string | null, locale: AppLocale = "en", displayNameOf?: ConditionNameLookup): string {
  const note = conditionNote(condition, sheet.conditionMeta?.[condition], nameOf, sheet.id);
  if (locale === "en") return conditionNoteLine(note);
  // Old callers without identity metadata are treated as proper names. An
  // enemy-looking player name must never become a creature translation.
  const lookup: ConditionNameLookup = displayNameOf ?? (id => { const name = nameOf(id); return name ? { name, kind: "proper" } : null; });
  const effect = CONDITION_MATERIAL_INDEX.find(row => row.match.some(alias => alias === condition.trim().toLowerCase()));
  const projected = conditionDisplay({ label: condition, presentation: conditionPresentation(condition, sheet.conditionMeta?.[condition], lookup, sheet.id, effect?.id) }, locale);
  return [!effect ? note.meaning : null, projected.note].filter(Boolean).join(createTranslator(locale)("combatDetail.separator"));
}

// ---- hit dice ----

export type HitDiceRow = { label: string; die: string; left: number; total: number };

export function hitDiceRows(sheet: CharacterSheet): HitDiceRow[] {
  const pools = sheet.hitDicePools?.length ? sheet.hitDicePools : null;
  if (!pools) {
    return [{ label: sheet.class, die: sheet.hitDice.die, left: sheet.hitDice.total - sheet.hitDice.spent, total: sheet.hitDice.total }];
  }
  return pools.map((pool) => ({ label: pool.classId, die: pool.die, left: pool.total - pool.spent, total: pool.total }));
}

// "2/3d10 + 1/2d8" for a vital tile.
export function hitDiceLine(sheet: CharacterSheet): string {
  return hitDiceRows(sheet)
    .map((row) => `${row.left}/${row.total}${row.die}`)
    .join(" + ");
}

// ---- defenses ----

export function defensesView(sheet: CharacterSheet, locale: AppLocale = "en"): { resist: string; immune: string } {
  return { resist: damageListLabel(pcResistances(sheet), locale), immune: damageListLabel(pcImmunities(sheet), locale) };
}

// ---- gear ----

export type ItemStatus = {
  // "4/7 charges", or null for an item with none.
  charges: string | null;
  // Asked to attune; the next short or long rest completes it.
  attuning: boolean;
  // Attuned and cursed: the wearer cannot end it.
  cursed: boolean;
  // The engine's refusal for pressing the attune toggle now, or null.
  attuneRefusal: string | null;
};

export function itemStatus(sheet: CharacterSheet, item: EquipmentItem, locale: AppLocale = "en"): ItemStatus {
  const rule = chargeRuleOf(item);
  const charges = !rule ? null : locale === "en"
    ? `${chargesLeft(item, rule)}/${chargeMax(rule)} charges`
    : createTranslator(locale)("sheetPlay.charges", { left: chargesLeft(item, rule), max: chargeMax(rule) });
  const cursed = Boolean(item.attuned && gearDefFor(item.name, item.slug)?.cursed);
  const refusal = attunementRefusal(sheet, { [item.name]: { attuned: !(item.attuned || item.attuning) } });
  return { charges, attuning: Boolean(item.attuning), cursed, attuneRefusal: refusal };
}

// ---- counters ----

// How a counter reads on the sheet, by the engine's own table
// (src/lib/srd/class-resources.ts). A counter with no cap (Overchannel)
// counts uses since its rest; a passive one (Signature Spells, Overchannel)
// is spent by the cast itself, so the sheet offers no minus for it.
export type CounterView = { line: string; spendable: boolean; note: string | null };

export function counterView(id: string, pool: { max: number; used: number }, locale: AppLocale = "en"): CounterView {
  const def = resourceDef(id);
  const rest = def?.recharge === "short" ? "a short or long rest" : "a long rest";
  const t = locale === "en" ? null : createTranslator(locale);
  const restLabel = t ? t(def?.recharge === "short" ? "sheetPlay.rest.short" : "sheetPlay.rest.long") : rest;
  if (pool.max >= UNLIMITED_USES) {
    const englishLine = pool.used ? `used ${pool.used} time${pool.used === 1 ? "" : "s"} since ${rest}` : `unused since ${rest}`;
    const line = !t ? englishLine : pool.used
      ? t("sheetPlay.counter.used", { count: pool.used, word: t(pool.used === 1 ? "sheetPlay.counter.time" : "sheetPlay.counter.times"), rest: restLabel })
      : t("sheetPlay.counter.unused", { rest: restLabel });
    return {
      line,
      spendable: false,
      note: sheetResourceHelp(id, def?.guidance, locale) ?? null,
    };
  }
  return {
    line: `${pool.max - pool.used}/${pool.max}`,
    spendable: !def?.passive,
    note: def?.passive ? t ? t("sheetPlay.counter.passive", { rest: restLabel }) : "Spent by the server when it is used; back after " + rest + "." : null,
  };
}

// Flying and swimming speeds beside the walking one (SheetDerived.speeds:
// Stormborn, Wind Soul, a raging eagle, Avenging Angel...).
export function otherSpeedsLine(speeds: { fly?: number; swim?: number } | undefined, locale: AppLocale = "en"): string[] {
  const out: string[] = [];
  if (speeds?.fly) out.push(locale === "en" ? `Fly ${speeds.fly} ft` : createTranslator(locale)("sheetPlay.speed.fly", { speed: speeds.fly }));
  if (speeds?.swim) out.push(locale === "en" ? `Swim ${speeds.swim} ft` : createTranslator(locale)("sheetPlay.speed.swim", { speed: speeds.swim }));
  return out;
}

// ---- worn or carried ----

// Whether a gear row is worn (armor, a shield, a ring, a cloak, boots) or
// wielded (a weapon), and so offers the wear toggle. A wand, a rod, a staff,
// a potion or a scroll is held or carried and never "worn"; an item whose
// own text asks only that it be on the person works from the pack.
const CARRIED_ONLY = /\b(wand|rod|staff|potion|philter|elixir|scroll|oil|dust|ammunition|arrows?|bolts?|bag|pouch|deck|figurine|horn|pipes|drum|lute|harp|candle|orb|stone|feather token|bead)\b/i;

export function isWornGear(item: Pick<EquipmentItem, "name" | "slug">): boolean {
  if (matchArmor(item.name) !== null) return true;
  if (CARRIED_ONLY.test(item.name)) return false;
  return matchMagicItem(item.name, item.slug)?.carried !== true;
}
