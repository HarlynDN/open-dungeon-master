import "server-only";
import { cookies, headers } from "next/headers";
import { currentUser } from "@/lib/auth";
import { getUserSettings } from "@/lib/db/users";
import { resolveUiLocale, UI_LOCALE_COOKIE } from "./locales";
import type { AppLocale } from "./locales";
import { MESSAGE_CATALOGS } from "./messages";
import { messageScope, type MessageScope } from "./resource-scope";
import type { LocaleCatalogs } from "./translator";

export function getLocaleResources(locale: AppLocale, scope: MessageScope): LocaleCatalogs {
  // English is also used to recognize unchanged source prose before translating.
  return Object.fromEntries([...new Set<AppLocale>(["en", locale])].map(locale => [locale,
    Object.fromEntries(Object.entries(MESSAGE_CATALOGS[locale]).filter(([key]) => messageScope(key) === scope)),
  ]));
}

export async function getUiLocale() {
  const user = await currentUser();
  return resolveUiLocale(
    user ? getUserSettings(user.id).uiLocale : undefined,
    (await cookies()).get(UI_LOCALE_COOKIE)?.value,
    (await headers()).get("accept-language"),
  );
}
