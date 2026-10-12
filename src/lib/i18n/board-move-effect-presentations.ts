import { createTranslator, registeredMessageTemplate, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { damageListLabel } from "./sheet-play-presentations.ts";
import { combatName } from "./combat-ui-presentations.ts";

type MoveContext = { who: (name: string) => string; spell: (name: string) => string; part: (source: string) => string };
const knownDamageType = (type: string) => registeredMessageTemplate("en", `combatDetail.damage.${type}` as MessageKey) === type;

export function boardMoveSourceLabel(source: string, locale: AppLocale, spell: MoveContext["spell"]): string {
  const t = createTranslator(locale), effect = /^(entering|moving through) (.+)$/.exec(source);
  if (effect) return t(effect[1] === "entering" ? "boardUi.note.entering" : "boardUi.note.through", { spell: spell(effect[2]) });
  const fall = /^falling (\d+) feet into a fissure$/.exec(source);
  return fall ? t("boardEffectsUi.sourceFall", { feet: fall[1] }) : spell(source);
}

export function boardMoveDamageDetails(raw: string, locale: AppLocale, who: MoveContext["who"]): string {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  for (const [pattern, key] of [
    [/^(.+) is immune to ([a-z]+) damage: no damage$/, "boardEffectsUi.immune"],
    [/^(.+) is resistant to ([a-z]+) damage: halved$/, "boardEffectsUi.resist"],
    [/^(.+) is vulnerable to ([a-z]+) damage: doubled$/, "boardEffectsUi.vulnerable"],
    [/^(.+) is resistant and vulnerable to ([a-z]+) damage: halved, then doubled$/, "boardEffectsUi.both"],
  ] as const) {
    const match = pattern.exec(raw);
    if (match) return knownDamageType(match[2]) ? t(key, { name: who(match[1]), type: damageListLabel(match[2], locale) }) : raw;
  }
  const all = /^(.+) is resistant to all damage: halved$/.exec(raw);
  if (all) return t("boardEffectsUi.resistAll", { name: who(all[1]) });
  return raw.split(", ").map(part => {
    const match = /^(\d+(?:\.\d+)?) ([a-z]+)$/.exec(part);
    return match && knownDamageType(match[2]) ? t("boardEffectsUi.damagePart", { amount: match[1], type: damageListLabel(match[2], locale) }) : damageListLabel(part, locale);
  }).join(t("sheet.separator"));
}

// These exact grammar frames belong to spell-aura/zone-quake/zone-triggers.
// A compound is translated only when every attached outcome is recognized.
export function boardMoveEffectText(source: string, locale: AppLocale, ctx: MoveContext): string | null {
  const t = createTranslator(locale), reason = (raw: string) => boardMoveSourceLabel(raw, locale, ctx.spell);
  let m = /^(.+?)'s (.+?) form drops to 0 hit points from (.+?) and its own form returns\.(?: (.+))?$/.exec(source);
  if (m) {
    const tail = m[4] ? ctx.part(m[4]) : "";
    if (m[4] && tail === m[4]) return source;
    const head = t("boardEffectsUi.formReturn", { name: ctx.who(m[1]), form: combatName(m[2], "enemy", locale), source: reason(m[3]) });
    return tail ? `${head} ${tail}` : head;
  }
  m = /^(.+?) falls (\d+) feet into the fissure and lands prone\. (.+)$/.exec(source);
  if (m) {
    const tail = ctx.part(m[3]);
    return tail === m[3] ? source : `${t("boardEffectsUi.quake.enemyFall", { name: ctx.who(m[1]), depth: m[2] })} ${tail}`;
  }
  m = /^(.+) takes (\d+)(?: ([a-z]+))? damage from (.+) and falls\.$/.exec(source);
  if (m) return m[3] && !knownDamageType(m[3]) ? source : t("boardEffectsUi.fallDamage", { name: ctx.who(m[1]), amount: m[2], type: m[3] ? damageListLabel(m[3], locale) : "", source: reason(m[4]) });
  m = /^(.+) takes no damage from (.+)\.$/.exec(source);
  if (m) return t("boardEffectsUi.noDamage", { name: ctx.who(m[1]), source: reason(m[2]) });
  m = /^(.+) drifts 10 feet away from (.+) to \((-?\d+),(-?\d+)\)\.$/.exec(source);
  if (m) return t("boardEffectsUi.quake.drift", { spell: ctx.spell(m[1]), name: ctx.who(m[2]), x: m[3], y: m[4] });
  m = /^The ground heaves under (.+)\.$/.exec(source);
  if (m) return t("boardEffectsUi.quake.ground", { spell: ctx.spell(m[1]) });
  m = /^A fissure (\d+) feet deep opens along (rows|columns) (\d+) to (\d+)\.$/.exec(source);
  if (m) return t(m[2] === "rows" ? "boardEffectsUi.quake.rows" : "boardEffectsUi.quake.columns", { depth: m[1], first: m[3], last: m[4] });
  m = /^(.+) keeps (its|their) footing at the fissure's edge\.$/.exec(source);
  if (m) return t(m[2] === "its" ? "boardEffectsUi.quake.edgeIts" : "boardEffectsUi.quake.edgeTheir", { name: ctx.who(m[1]) });
  m = /^(.+) falls (\d+) feet into the fissure \((\d+) bludgeoning\) and lands prone\.$/.exec(source);
  if (m) return t("boardEffectsUi.quake.pcFall", { name: ctx.who(m[1]), depth: m[2], amount: m[3], type: damageListLabel("bludgeoning", locale) });
  return source === "A fissure opening under a structure brings it down (narrate it); the board keeps the creatures that fell in where they stand, at the fissure's bottom."
    ? t("boardEffectsUi.quake.structure") : null;
}
