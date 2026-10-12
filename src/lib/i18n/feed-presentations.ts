import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { AUDIT_FIELD_KEYS, AUDIT_KIND_KEYS } from "./feed-metadata.ts";
import { conditionLabel } from "./condition-presentations.ts";
import { damageListLabel } from "./sheet-play-presentations.ts";
import { nativeFeatureName } from "./feature-material-presentations.ts";
import { referenceDisplayName } from "./references.ts";
import { controlText } from "./story-control-presentations.ts";
import { calendarDate, calendarDescription } from "./calendar-presentations.ts";
import type { CalendarDefinition } from "../dm/calendar.ts";
import type { TimelineKind, TimelineRow } from "../dm/timeline-logic.ts";
import type { AuditEntry } from "../../app/campaigns/[campaignId]/useCampaignStream.ts";
import type { AppLocale } from "./locales.ts";

function label(keys: Partial<Record<string, MessageKey>>, value: string, locale: AppLocale): string {
  const key = Object.hasOwn(keys, value) ? keys[value] : undefined;
  return key ? createTranslator(locale)(key) : value;
}
export const auditFieldLabel = (value: string, locale: AppLocale) => label(AUDIT_FIELD_KEYS, value, locale);
export const auditKindLabel = (value: string, locale: AppLocale) => label(AUDIT_KIND_KEYS, value, locale);
function resourceTerm(value: unknown, locale: AppLocale): string {
  const source = String(value);
  const row = Object.entries(catalogFor("en", "sheetPlay.resourceName.")).find(([, name]) => name === source);
  return row ? createTranslator(locale)(row[0] as MessageKey) : nativeFeatureName(source, locale);
}
// Only display projection: the delta and its numbers never change. Whole
// templates keep English wording while allowing different word order elsewhere.
export function describeAuditEntry(entry: Pick<AuditEntry, "kind" | "delta">, name: string, locale: AppLocale): string {
  const d = entry.delta, t = createTranslator(locale), raw = (v: unknown) => String(v);
  const item = (v: unknown) => referenceDisplayName("equipment", raw(v), locale);
  const qty = (v: unknown) => Number(v) > 1 ? t("feedUi.audit.qty", { qty: raw(v) }) : "";
  const fields = (keys: string[]) => keys.length ? t("feedUi.audit.fields", { fields: keys.map(k => auditFieldLabel(k, locale)).join(t("feedUi.separator")) }) : "";
  switch (entry.kind) {
    case "apply_damage":
      if (d.form) {
        const form = referenceDisplayName("monster", raw(d.form), locale);
        return d.reverted
          ? t("feedUi.audit.formBreak", { name, form, carryover: Number(d.carryover) > 0 ? t("feedUi.audit.carryover", { amount: raw(d.carryover) }) : "" })
          : t("feedUi.audit.formDamage", { name, form, amount: raw(d.amount), hp: raw(d.beastHp) });
      }
      // These native outcomes carry a protection flag, not a damage amount.
      if (d.deathWard || d.relentlessEndurance || d.relentlessRage) {
        const feature = d.deathWard ? referenceDisplayName("spell", "Death Ward", locale) : resourceTerm(d.relentlessEndurance ? "Relentless Endurance" : "Relentless Rage", locale);
        return t("feedUi.audit.endurance", { name, feature });
      }
      return t("feedUi.audit.damage", { name, amount: raw(d.amount), type: d.type ? t("feedUi.audit.damageType", { type: damageListLabel(raw(d.type), locale) }) : "", hp: raw(d.currentHp) });
    case "heal": return t("feedUi.audit.heal", { name, amount: raw(d.amount), hp: raw(d.newHp) });
    case "award_xp": return t("feedUi.audit.xp", { name, amount: raw(d.amount), total: raw(d.newXp) });
    case "modify_gold": return t(Number(d.delta) >= 0 ? "feedUi.audit.goldGain" : "feedUi.audit.goldLose", { name, amount: Math.abs(Number(d.delta)), gold: raw(d.gold) });
    case "grant_item": return t("feedUi.audit.itemGrant", { name, item: item(d.name), qty: qty(d.qty) });
    case "remove_item": return t("feedUi.audit.itemRemove", { name, item: item(d.name), qty: qty(d.removed) });
    case "set_condition": return t("feedUi.audit.conditionSet", { name, condition: conditionLabel(raw(d.condition), locale) });
    case "clear_condition": return t("feedUi.audit.conditionClear", { name, condition: conditionLabel(raw(d.condition), locale) });
    case "use_spell_slot": return t("feedUi.audit.slot", { name, level: raw(d.level) });
    case "use_item": return t("feedUi.audit.itemUse", { name, item: item(d.item) });
    case "purchase": return t(d.action === "sell" ? "feedUi.audit.sell" : "feedUi.audit.buy", { name, item: item(d.item), qty: qty(d.qty), price: Number(d.price) * Number(d.qty ?? 1) });
    case "use_resource": return d.from
      ? t("feedUi.audit.resourceReceive", { name, resource: resourceTerm(d.resource, locale), from: raw(d.from) })
      : t("feedUi.audit.resourceSpend", { name, uses: Number(d.spent) > 1 ? t("feedUi.audit.uses", { count: raw(d.spent) }) : "", resource: resourceTerm(d.resource, locale) });
    case "grant_temp_hp": return t("feedUi.audit.tempHp", { name, amount: raw(d.tempHp) });
    case "learn_spell": return t(d.action === "remove" ? "feedUi.audit.spellRemove" : "feedUi.audit.spellLearn", { name, spell: referenceDisplayName("spell", raw(d.spell), locale) });
    case "update_sheet": return t("feedUi.audit.update", { name, fields: fields(Object.keys(d)) });
    case "undo": return t("feedUi.audit.undo", { name });
    case "lead_edit": return t("feedUi.audit.leadEdit", { name, fields: fields(Object.keys(d).filter(k => k !== "reason")) });
    case "player_adjust": return t("feedUi.audit.playerAdjust", { name, fields: fields(Object.keys(d)) });
    default: return t("feedUi.audit.fallback", { name, kind: auditKindLabel(entry.kind, locale) });
  }
}
export function feedText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale), prefix = "The timeline did not load. ";
  if (source.startsWith(prefix)) return t("feedUi.error.timeline", { reason: feedText(source.slice(prefix.length), locale) });
  const row = Object.entries(catalogFor("en", "feedUi.error.")).find(([, text]) => text === source);
  if (row) return t(row[0] as MessageKey);
  const warning = /^A newer ([a-z_]+) change \(([\s\S]*)\) also touched: ([\s\S]+)\.$/.exec(source);
  return warning ? t("feedUi.warning", {
    kind: auditKindLabel(warning[1], locale), reason: warning[2] === "no reason" ? t("feedUi.warning.noReason") : warning[2],
    fields: warning[3].split(", ").map(k => auditFieldLabel(k, locale)).join(t("feedUi.separator")),
  }) : controlText(source, locale);
}
export const timelineKindLabel = (kind: TimelineKind, locale: AppLocale) => createTranslator(locale)(`feedUi.timeline.kind.${kind}`);
export function timelineRowView(row: TimelineRow, locale: AppLocale, calendar: CalendarDefinition | null = null): Pick<TimelineRow, "title" | "detail" | "when"> {
  const view = { title: row.title, detail: row.detail, when: row.when };
  if (locale === "en") return view;
  const t = createTranslator(locale), p = row.presentation, title = p?.title;
  if (title?.kind === "chapter") view.title = t("feedUi.timeline.chapterTitle", { index: title.index });
  if (title?.kind === "act") view.title = t("feedUi.timeline.actTitle", { numeral: title.numeral, name: title.name ? t("feedUi.timeline.actName", { name: title.name }) : "" });
  if (title?.kind === "session") view.title = t("feedUi.timeline.sessionTitle");
  if (title?.kind === "now") view.title = t("feedUi.timeline.nowTitle");
  if (p?.sessionDate && Number.isFinite(Date.parse(p.sessionDate))) view.detail = new Date(p.sessionDate).toLocaleString(locale);
  if (calendar && p?.instant !== undefined) {
    view.when = calendarDate(calendar, p.instant, locale);
    if (row.kind === "now") view.detail = calendarDescription(calendar, p.instant, locale);
  }
  return view;
}
