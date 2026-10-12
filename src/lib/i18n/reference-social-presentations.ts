import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";

export const SOCIAL_NOTICES = { failed: "Something went wrong.", requested: "Request sent.", invited: "Invite sent." } as const;

// Preserve native responses in state and unknown diagnostics in full.
export function socialNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  const entry = Object.entries(catalogFor("en", "socialUi.notice.")).find(([, value]) => value === raw);
  if (entry) return t(entry[0] as MessageKey);
  const throttle = /^Too many requests\. Try again in (\d+)s\.$/.exec(raw);
  return throttle ? t("socialUi.notice.throttle", { seconds: throttle[1] }) : raw;
}
