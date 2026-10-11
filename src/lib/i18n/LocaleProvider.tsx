"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createTranslator, type LocaleCatalogs } from "./translator";
import { loadLocaleMessages, registerLocaleScope } from "./client-catalogs";
import { DEFAULT_LOCALE, LOCALE_DEFINITIONS, normalizeLocale, UI_LOCALE_COOKIE, type AppLocale } from "./locales";

type LocaleContextValue = {
  locale: AppLocale;
  t: ReturnType<typeof createTranslator>;
  setLocale: (locale: AppLocale) => Promise<void>;
  loadAccountLocale: () => Promise<void>;
  saving: boolean;
  error: boolean;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  t: createTranslator(DEFAULT_LOCALE),
  setLocale: async () => {},
  loadAccountLocale: async () => {},
  saving: false,
  error: false,
});

function rememberLocale(locale: AppLocale) {
  // An anonymous visitor can choose a language before signing in. The
  // account value takes precedence on the next authenticated server render.
  document.cookie = `${UI_LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  document.documentElement.lang = locale;
  document.documentElement.dir = LOCALE_DEFINITIONS[locale].direction;
}

export function LocaleProvider({ initialLocale, initialCatalogs, children }: {
  initialLocale: AppLocale;
  initialCatalogs?: LocaleCatalogs;
  children: React.ReactNode;
}) {
  if (initialCatalogs) registerLocaleScope(initialCatalogs, "ui");
  const [locale, updateLocale] = useState(initialLocale);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const revision = useRef(0);
  const currentLocale = useRef(locale);

  useEffect(() => {
    currentLocale.current = locale;
    rememberLocale(locale);
  }, [locale]);

  const setLocale = useCallback(async (next: AppLocale) => {
    const currentRevision = ++revision.current;
    setSaving(true);
    setError(false);
    try {
      await Promise.all([loadLocaleMessages(next, "ui"), loadLocaleMessages(next, "content"), loadLocaleMessages("en", "content")]);
      if (currentRevision !== revision.current) return;
      currentLocale.current = next;
      updateLocale(next);
      rememberLocale(next);
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { uiLocale: next } }),
      });
      // Before login only the device cookie is available. That is a valid
      // preference and does not need an account error banner.
      if (!response.ok && response.status !== 401) throw new Error("Locale save failed");
    } catch {
      if (currentRevision === revision.current) setError(true);
    } finally {
      if (currentRevision === revision.current) setSaving(false);
    }
  }, []);

  // Login can replace the home screen in place without remounting the root
  // layout. Read the new account instead of inheriting the previous user's
  // cached preference. A user choice made during this fetch takes priority.
  const loadAccountLocale = useCallback(async () => {
    const startedRevision = ++revision.current;
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) return;
      const data = await response.json();
      const next = data.settings?.uiLocale === undefined ? currentLocale.current : normalizeLocale(data.settings.uiLocale);
      await Promise.all([loadLocaleMessages(next, "ui"), loadLocaleMessages(next, "content"), loadLocaleMessages("en", "content")]);
      if (startedRevision === revision.current) {
        updateLocale(next);
        setError(false);
      }
    } catch {
      // Offline: keep the language currently shown.
    }
  }, []);

  const value = useMemo(() => ({ locale, t: createTranslator(locale), setLocale, loadAccountLocale, saving, error }),
    [locale, setLocale, loadAccountLocale, saving, error]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
