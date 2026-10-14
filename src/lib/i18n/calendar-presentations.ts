import { CALENDAR_PRESETS, breakDown, formatDate, describeInstant, formatClock, dayPart, seasonOf, festivalsOn, moonsAt, type CalendarDefinition } from "../dm/calendar.ts";
import { DEFAULT_LOCALE, type AppLocale } from "./locales.ts";
import { createTranslator, type MessageKey } from "./translator.ts";

// Translate only exact built-in metadata. An edited name, even on a preset,
// remains authored world data. The engine's English tool results stay intact.
function stock(calendar: Pick<CalendarDefinition, "id">) {
  return CALENDAR_PRESETS.find(preset => preset.id === calendar.id);
}
export function calendarPresetLabel(preset: { id: string; name: string }, locale: AppLocale = DEFAULT_LOCALE): string {
  return stock(preset)?.name === preset.name
    ? createTranslator(locale)(`calendar.preset.${preset.id}` as MessageKey) : preset.name;
}
export function calendarMonthLabel(calendar: CalendarDefinition, index: number, locale: AppLocale = DEFAULT_LOCALE): string {
  const name = calendar.months[index]?.name ?? "";
  return stock(calendar)?.months[index]?.name === name
    ? createTranslator(locale)(`calendar.${calendar.id}.month.${index + 1}` as MessageKey) : name;
}
export function calendarWeekdayLabel(calendar: CalendarDefinition, index: number, locale: AppLocale = DEFAULT_LOCALE): string {
  const name = calendar.weekdays[index] ?? "";
  return name && stock(calendar)?.weekdays[index] === name
    ? createTranslator(locale)(`calendar.${calendar.id}.weekday.${index + 1}` as MessageKey) : name;
}
// Keep untouched displayed translations as canonical values when editing the list.
export function calendarEditedWeekdays(calendar: CalendarDefinition, names: string[], locale: AppLocale): string[] {
  return names.map((name, index) => name === calendarWeekdayLabel(calendar, index, locale)
    ? calendar.weekdays[index] : name);
}
export function calendarDate(calendar: CalendarDefinition, instant: number, locale: AppLocale = DEFAULT_LOCALE): string {
  if (locale === "en") return formatDate(calendar, instant);
  const t = createTranslator(locale);
  const date = breakDown(calendar, instant);
  const weekdayIndex = calendar.weekdays.indexOf(date.weekday);
  const weekday = stock(calendar)?.weekdays[weekdayIndex] === date.weekday && date.weekday
    ? t(`calendar.${calendar.id}.weekday.${weekdayIndex + 1}` as MessageKey) : date.weekday;
  const number = new Intl.NumberFormat(locale, { useGrouping: false });
  return t(calendar.months.length === 1 ? "calendar.dateDaycount" : "calendar.date", {
    weekday: weekday ? t("calendar.weekdayInDate", { name: weekday }) : "",
    month: calendarMonthLabel(calendar, date.month - 1, locale),
    day: number.format(date.day), year: number.format(date.year),
    suffix: calendar.yearSuffix ? ` ${calendar.yearSuffix}` : "", time: formatClock(date),
  });
}
export function calendarDescription(calendar: CalendarDefinition, instant: number, locale: AppLocale = DEFAULT_LOCALE): string {
  if (locale === "en") return describeInstant(calendar, instant);
  const t = createTranslator(locale);
  const date = breakDown(calendar, instant);
  const parts = [t("calendar.describe", {
    date: calendarDate(calendar, instant, locale),
    part: t(`calendar.part.${dayPart(date.hour)}`), season: t(`calendar.season.${seasonOf(calendar, date.month)}`),
  })];
  parts.push(...festivalsOn(calendar, instant).map(festival => t("calendar.festivalDate", { name: festival.name })));
  for (const { moon, phase } of moonsAt(calendar, instant)) {
    if (phase === "full" || phase === "new") parts.push(t(`calendar.moonDate.${phase}`, { name: moon.name }));
  }
  return parts.join(t("calendar.join"));
}
