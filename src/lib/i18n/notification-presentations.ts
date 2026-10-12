import { parseNotificationPresentation } from "../notification-presentations.ts";
import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export function notificationText(item: { body: string; presentation?: unknown }, locale: AppLocale): string {
  if (locale === "en") return item.body;
  const data = parseNotificationPresentation(item.presentation);
  if (!data) return item.body;
  const t = createTranslator(locale);
  const params: Record<string, string> = { ...data.params };
  if (Object.hasOwn(params, "session") && !params.session) params.session = t("notifications.defaultSession");
  if (params.startsAt) {
    // The schedule's existing printer explicitly uses UTC. Localize its date
    // presentation without silently changing the scheduled clock/time zone.
    params.when = new Intl.DateTimeFormat(locale, { timeZone: "UTC", year: "numeric", month: "2-digit",
      day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(params.startsAt)) + " UTC";
  }
  return t(`notifications.message.${data.code}`, params);
}
