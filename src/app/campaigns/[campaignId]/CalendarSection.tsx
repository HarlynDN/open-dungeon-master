"use client";

import { createTranslator } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { calendarDate, calendarDescription, calendarMonthLabel, calendarPresetLabel } from "@/lib/i18n/calendar-presentations";
import { parseCommaList } from "@/lib/i18n/prep-presentations";
import { loadErrorText, readUiResponse, requestErrorText, uiRequestError, type UiRequestError } from "@/lib/i18n/api-errors";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { readLoad, useLoadStatus } from "@/lib/load-state";
import { EmptyState } from "@/components/EmptyState";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { GameIcon } from "@/components/ui/GameIcon";
import { NumberStepper } from "@/components/ui/NumberStepper";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { KitButton, LoadFailed, panelField, PanelLoading } from "./PanelKit";
import type { CalendarDefinition, CampaignClock } from "@/lib/dm/calendar";
import { DictateField } from "@/components/DictateField";
import { appendDictation } from "@/lib/dictation";

// The Calendar section of the Rules panel (docs/vtt-parity-implementation-plan.md
// 7.1 and 7.2): the year's months, the week's days, the sky's moons and the
// year's festivals, picked from a preset and then edited by hand; below
// them, the events the clock will bring round.

type Preset = { id: string; name: string };
type EventView = { id: string; title: string; body: string; when: string; atInstant: number; visibility: "party" | "dm"; repeat: "none" | "yearly" | "monthly"; fired: boolean };
type EventDraft = { title: string; body: string; month: number; day: number; hour: number; visibility: "party" | "dm"; repeat: "none" | "yearly" | "monthly" };

const field = cn(panelField, "w-auto");
const REPEAT_OPTIONS: Array<{ value: EventDraft["repeat"]; }> = [
  { value: "none" },
  { value: "monthly" },
  { value: "yearly" },
];
const VISIBILITY_OPTIONS: Array<{ value: EventDraft["visibility"]; }> = [
  { value: "party" },
  { value: "dm" },
];

function blankEvent(): EventDraft {
  return { title: "", body: "", month: 1, day: 1, hour: 8, visibility: "party", repeat: "none" };
}

export function CalendarSection({ campaignId, campaignLocale = DEFAULT_LOCALE }: { campaignId: string; campaignLocale?: AppLocale }) {
  const { locale, t } = useLocale();
  const [clock, setClock] = useState<CampaignClock | null>(null);
  const contentT = createTranslator(campaignLocale);
  const [error, setError] = useState<UiRequestError | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [draft, setDraft] = useState<CalendarDefinition | null>(null);
  const [saving, setSaving] = useState(false);
  const [events, setEvents] = useState<EventView[]>([]);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();
  const [reloads, setReloads] = useState(0);
  const [eventDraft, setEventDraft] = useState<EventDraft>(blankEvent());
  const [addingEvent, setAddingEvent] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      readLoad<{ clock?: CampaignClock; reads?: string; presets?: Preset[] }>(fetch(`/api/campaigns/${campaignId}/dm/clock`), "The clock"),
      readLoad<{ events?: EventView[] }>(fetch(`/api/campaigns/${campaignId}/calendar/events`), "The calendar"),
    ]).then(([clockLoad, eventLoad]) => {
      if (cancelled) {
        return;
      }
      settle(clockLoad.error ? clockLoad : eventLoad);
      const clockData = clockLoad.payload ?? {};
      if (clockLoad.payload) {
        setClock(clockData.clock ?? null);
        setPresets(clockData.presets ?? []);
        setDraft(clockData.clock ? { ...clockData.clock.calendar, moons: clockData.clock.calendar.moons ?? [], festivals: clockData.clock.calendar.festivals ?? [] } : null);
      }
      if (eventLoad.payload) {
        setEvents(eventLoad.payload.events ?? []);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, reload, reloads, settle]);

  async function changeCalendar(body: object) {
    setSaving(true);
    setError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/dm/clock`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }), "calendar.saveError");
      setReload(current => current + 1);
    } catch (failure) { setError(uiRequestError(failure, "calendar.saveError")); }
    finally { setSaving(false); }
  }
  async function applyPreset(preset: string) { await changeCalendar({ do: "calendar", preset }); }
  async function saveDefinition() {
    if (!draft || !draft.months.length) return;
    await changeCalendar({ do: "calendar", definition: { ...draft, id: "custom", name: draft.name || contentT("calendar.customName") } });
  }
  async function addEvent() {
    if (!eventDraft.title.trim()) return;
    setAddingEvent(true);
    setError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/calendar/events`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eventDraft) }), "calendar.eventError");
      setEventDraft(blankEvent());
      setReload(current => current + 1);
    } catch (failure) { setError(uiRequestError(failure, "calendar.eventError")); }
    finally { setAddingEvent(false); }
  }
  async function removeEvent(id: string) {
    setError(null);
    try {
      await readUiResponse(fetch(`/api/campaigns/${campaignId}/calendar/events/${id}`, { method: "DELETE" }), "calendar.removeError");
      setReload(current => current + 1);
    } catch (failure) { setError(uiRequestError(failure, "calendar.removeError")); }
  }

  if (!clock || !draft) {
    return loadError ? <LoadFailed error={loadErrorText(locale, loadError, "calendar.loadError")} onRetry={() => setReloads(current => current + 1)} /> : <PanelLoading label={t("calendar.loading")} rows={2} />;
  }
  const moons = draft.moons ?? [];
  const festivals = draft.festivals ?? [];
  const update = (patch: Partial<CalendarDefinition>) => setDraft({ ...draft, ...patch });
  const monthOptions = draft.months.map((month, at) => ({ value: String(at + 1), label: calendarMonthLabel(draft, at, locale) }));

  return (
    <div className="panel space-y-3 rounded-lg p-3">
      <SectionHead title={t("calendar.heading")} glyph="daypart-day" />
      {loadError ? <LoadFailed error={loadErrorText(locale, loadError, "calendar.loadError")} onRetry={() => setReloads(current => current + 1)} /> : null}
      {error ? <p role="alert" className="text-xs text-red-300">{requestErrorText(locale, error)}</p> : null}
      <p className="flex items-center gap-1.5 text-xs text-stone-400">
        <GameIcon icon={{ kind: "glyph", key: "daypart-dawn" }} size="size-5" /> {t("calendar.now", { date: calendarDescription(clock.calendar, clock.instant, locale) })}
      </p>
      <div data-pill-group="" role="group" aria-label={t("calendar.startFrom")} className="flex flex-wrap items-center gap-1">
        <span className="eyebrow mr-1 text-[10px] text-amber-400/80">{t("calendar.startFrom")}</span>
        {presets.map((preset) => (
          <button key={preset.id} type="button" disabled={saving} aria-busy={saving} data-on={clock.calendar.id === preset.id ? "" : undefined} aria-pressed={clock.calendar.id === preset.id} onClick={() => void applyPreset(preset.id)} className="pk-pill pk-tap motion-press">
            {calendarPresetLabel(preset, locale)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-stone-400">
        <label className="flex min-w-[9rem] flex-1 items-center gap-1.5">
           {t("calendar.name")} <input value={draft.name} onChange={(event) => update({ name: event.target.value })} maxLength={60} className={cn(field, "min-w-0 flex-1")} />
        </label>
        <label className="flex items-center gap-1.5">
          <span className="text-stone-500">{t("calendar.yearSuffix")}</span>
          <input value={draft.yearSuffix} onChange={(event) => update({ yearSuffix: event.target.value })} maxLength={20} className={cn(field, "w-20")} />
        </label>
      </div>
      <div className="space-y-1.5">
        <SectionHead title={t("calendar.months")} glyph="daypart-morning" level="h4" aside={draft.months.length} />
        {draft.months.map((month, index) => (
          <div key={index} className="group flex items-center gap-1.5">
            <input value={month.name} aria-label={t("calendar.monthName", { index: index + 1 })} onChange={(event) => update({ months: draft.months.map((entry, at) => (at === index ? { ...entry, name: event.target.value } : entry)) })} maxLength={40} className={cn(field, "min-w-0 flex-1")} />
            <NumberStepper size="sm" min={1} max={400} value={month.days} label={t("calendar.daysIn", { name: calendarMonthLabel(draft, index, locale) || t("calendar.monthFallback", { index: index + 1 }) })} onChange={(days) => update({ months: draft.months.map((entry, at) => (at === index ? { ...entry, days: days || 1 } : entry)) })} />
            <KitButton tone="iconDanger" always aria-label={t("calendar.removeMonth")} disabled={draft.months.length <= 1} onClick={() => update({ months: draft.months.filter((_, at) => at !== index) })} className="disabled:opacity-30">
              <Trash2 className="size-3.5" />
            </KitButton>
          </div>
        ))}
        {draft.months.length < 24 ? (
          <KitButton onClick={() => update({ months: [...draft.months, { name: contentT("calendar.newMonth", { index: draft.months.length + 1 }), days: 30 }] })}>
            <Plus className="size-3.5" />  {t("calendar.month")} </KitButton>
        ) : null}
      </div>
      <label className="block text-xs text-stone-400">
         {t("calendar.weekdays")} <input value={draft.weekdays.join(", ")} onChange={(event) => update({ weekdays: parseCommaList(event.target.value, 12) })} className={cn(panelField, "mt-1")} />
      </label>
      <div className="space-y-1.5">
        <SectionHead title={t("calendar.moons")} glyph="daypart-night" level="h4" aside={moons.length || null} />
        {moons.map((moon, index) => (
          <div key={index} className="flex flex-wrap items-center gap-1.5">
            <input value={moon.name} placeholder={t("calendar.name")} aria-label={t("calendar.moonName")} onChange={(event) => update({ moons: moons.map((entry, at) => (at === index ? { ...entry, name: event.target.value } : entry)) })} maxLength={40} className={cn(field, "min-w-[7rem] flex-1")} />
            <span title={t("calendar.moonCycle")}>
              <NumberStepper size="sm" min={2} max={400} value={moon.cycleDays} label={t("calendar.moonCycle")} onChange={(cycleDays) => update({ moons: moons.map((entry, at) => (at === index ? { ...entry, cycleDays: cycleDays || 28 } : entry)) })} />
            </span>
            <span title={t("calendar.moonOffset")}>
              <NumberStepper size="sm" min={0} max={400} value={moon.offset} label={t("calendar.moonOffset")} onChange={(offset) => update({ moons: moons.map((entry, at) => (at === index ? { ...entry, offset: offset || 0 } : entry)) })} />
            </span>
            <KitButton tone="iconDanger" always aria-label={t("calendar.removeMoon")} onClick={() => update({ moons: moons.filter((_, at) => at !== index) })}>
              <Trash2 className="size-3.5" />
            </KitButton>
          </div>
        ))}
        {moons.length < 6 ? (
          <KitButton onClick={() => update({ moons: [...moons, { name: contentT("calendar.moon"), cycleDays: 28, offset: 0 }] })}>
            <Plus className="size-3.5" />  {t("calendar.moon")} </KitButton>
        ) : null}
      </div>
      <div className="space-y-1.5">
        <SectionHead title={t("calendar.festivals")} glyph="cue-festive" level="h4" aside={festivals.length || null} />
        {festivals.map((festival, index) => (
          <div key={index} className="flex flex-wrap items-center gap-1.5">
            <Select size="sm" label={t("calendar.festivalMonth")} value={String(festival.month)} options={monthOptions} onChange={(value) => update({ festivals: festivals.map((entry, at) => (at === index ? { ...entry, month: Number(value) } : entry)) })} className="pk-w-28" />
            <NumberStepper size="sm" min={1} max={400} value={festival.day} label={t("calendar.festivalDay")} onChange={(day) => update({ festivals: festivals.map((entry, at) => (at === index ? { ...entry, day: day || 1 } : entry)) })} />
            <input value={festival.name} placeholder={t("calendar.name")} aria-label={t("calendar.festivalName")} onChange={(event) => update({ festivals: festivals.map((entry, at) => (at === index ? { ...entry, name: event.target.value } : entry)) })} maxLength={60} className={cn(field, "min-w-[7rem] flex-1")} />
            <KitButton tone="iconDanger" always aria-label={t("calendar.removeFestival")} onClick={() => update({ festivals: festivals.filter((_, at) => at !== index) })}>
              <Trash2 className="size-3.5" />
            </KitButton>
          </div>
        ))}
        {festivals.length < 40 ? (
          <KitButton onClick={() => update({ festivals: [...festivals, { month: 1, day: 1, name: "" }] })}>
            <Plus className="size-3.5" />  {t("calendar.festival")} </KitButton>
        ) : null}
      </div>
      <KitButton tone="primary" disabled={saving} busy={saving} onClick={() => void saveDefinition()}>
        {saving ? null : <Save className="size-3.5" />}  {t("calendar.save")} </KitButton>

      <div className="space-y-1.5 pt-1">
        <SectionHead title={t("calendar.events")} glyph="tab-timeline" level="h4" aside={events.length || null} />
        {events.length ? (
          <ul className="stagger space-y-1">
            {events.map((event) => (
              <li key={event.id} className="group flex items-start gap-1.5 text-xs">
                <GameIcon icon={{ kind: "glyph", key: event.fired ? "quest-done" : "quest-active" }} size="size-5" className="mt-0.5 shrink-0" />
                <span className="min-w-0 flex-1 leading-5">
                  <span className={cn("font-medium", event.fired ? "text-stone-500 line-through" : "text-stone-200")}>{event.title}</span>
                  <span className="text-stone-500"> {calendarDate(clock.calendar, event.atInstant, locale)}</span>
                  {event.repeat !== "none" ? <span className="pk-chip ml-1 px-1.5">{t(`calendar.repeat.${event.repeat}`)}</span> : null}
                  {event.visibility === "dm" ? <span className="pk-chip ml-1 border-violet-500/40 px-1.5 text-violet-300">{t("calendar.dmOnly")}</span> : null}
                </span>
                <KitButton tone="iconDanger" always aria-label={t("prep.removeName", { name: event.title })} onClick={() => void removeEvent(event.id)}>
                  <Trash2 className="size-3.5" />
                </KitButton>
              </li>
            ))}
          </ul>
        ) : (
          (loadError ? <LoadFailed error={loadErrorText(locale, loadError, "calendar.loadError")} onRetry={() => setReloads((current) => current + 1)} /> : loaded ? <EmptyState size="sm" art="scrolls" title={t("calendar.empty")} /> : null)
        )}
        <div className="flex flex-wrap items-center gap-1.5">
          <input value={eventDraft.title} placeholder={t("calendar.what")} aria-label={t("calendar.what")} onChange={(event) => setEventDraft({ ...eventDraft, title: event.target.value })} maxLength={120} className={cn(field, "min-w-[9rem] flex-1")} />
          <Select size="sm" label={t("calendar.eventMonth")} value={String(eventDraft.month)} options={monthOptions} onChange={(value) => setEventDraft({ ...eventDraft, month: Number(value) })} className="pk-w-28" />
          <NumberStepper size="sm" min={1} max={400} value={eventDraft.day} label={t("calendar.eventDay")} onChange={(day) => setEventDraft({ ...eventDraft, day: day || 1 })} />
          <Select size="sm" label={t("calendar.repeat")} value={eventDraft.repeat} options={REPEAT_OPTIONS.map(option => ({ ...option, label: t(`calendar.repeat.${option.value}`) }))} onChange={(repeat) => setEventDraft({ ...eventDraft, repeat })} className="pk-w-24" />
          <Select size="sm" label={t("calendar.visibility")} value={eventDraft.visibility} options={VISIBILITY_OPTIONS.map(option => ({ ...option, label: t(option.value === "dm" ? "calendar.dmOnly" : "calendar.visibility.party") }))} onChange={(visibility) => setEventDraft({ ...eventDraft, visibility })} className="pk-w-24" />
          <KitButton disabled={addingEvent || !eventDraft.title.trim()} busy={addingEvent} onClick={() => void addEvent()}>
            {addingEvent ? null : <Plus className="size-3.5" />}  {t("prep.add")} </KitButton>
        </div>
        <DictateField label={t("calendar.learns")} onTranscript={(text) => setEventDraft((current) => ({ ...current, body: appendDictation(current.body, text, 600) }))}>
          <textarea value={eventDraft.body} placeholder={t("calendar.body")} aria-label={t("calendar.body")} rows={2} maxLength={600} onChange={(event) => setEventDraft({ ...eventDraft, body: event.target.value })} className={panelField} />
        </DictateField>
      </div>
    </div>
  );
}
