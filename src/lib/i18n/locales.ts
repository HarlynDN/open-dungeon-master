// Application locales, separate from the fictional languages on a sheet.
// Register each supported locale here; consumers read capabilities instead
// of assuming that the second language is always Chinese.
export const APP_LOCALES = ["en", "zh-CN"] as const;
export type AppLocale = (typeof APP_LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "en";
export const UI_LOCALE_COOKIE = "odm_ui_locale";

export type LocaleDefinition = {
  nativeName: string;
  generationLanguage: string;
  direction: "ltr" | "rtl";
  segmentationLocale: string;
  browserLanguages: readonly string[];
  tts: { langCode: string; defaultVoice: string; singleNarrator: boolean };
};

export const LOCALE_DEFINITIONS: Record<AppLocale, LocaleDefinition> = {
  en: {
    nativeName: "English",
    generationLanguage: "English",
    direction: "ltr",
    segmentationLocale: "en",
    browserLanguages: ["en"],
    tts: { langCode: "a", defaultVoice: "af_heart", singleNarrator: false },
  },
  "zh-CN": {
    nativeName: "简体中文",
    generationLanguage: "Simplified Chinese (简体中文)",
    direction: "ltr",
    segmentationLocale: "zh-CN",
    browserLanguages: ["zh"],
    tts: { langCode: "z", defaultVoice: "zf_xiaobei", singleNarrator: true },
  },
};

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && (APP_LOCALES as readonly string[]).includes(value);
}

// Persisted settings predate locales. Unknown or missing values always read
// as English; neither opening an old campaign nor choosing a UI locale
// rewrites its historical messages.
export function normalizeLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_LOCALE;
}

// First-visit preference only. All Chinese browser variants currently use
// the sole supported Chinese locale (Simplified); this never changes a save.
export function browserLocale(acceptLanguage: string | null | undefined): AppLocale {
  const ranges = (acceptLanguage ?? "").split(",").map((entry, order) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters.find(value => value.trim().startsWith("q="));
    const q = quality === undefined ? 1 : Number(quality.trim().slice(2));
    return { tag, q, order };
  }).filter(({ tag, q }) => /^[a-z]+(?:-[a-z0-9]+)*$/.test(tag) && Number.isFinite(q) && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.order - b.order);
  for (const { tag } of ranges) {
    const locale = APP_LOCALES.find(locale => locale.toLowerCase() === tag)
      ?? APP_LOCALES.find(locale => LOCALE_DEFINITIONS[locale].browserLanguages.some(range => tag === range || tag.startsWith(`${range}-`)));
    if (locale) return locale;
  }
  return DEFAULT_LOCALE;
}

export function resolveUiLocale(accountLocale: unknown, cookieLocale: unknown, acceptLanguage?: string | null): AppLocale {
  if (accountLocale !== undefined && accountLocale !== null) return normalizeLocale(accountLocale);
  if (isAppLocale(cookieLocale)) return cookieLocale;
  return browserLocale(acceptLanguage);
}

export const localeOptions = APP_LOCALES.map((value) => ({
  value,
  label: LOCALE_DEFINITIONS[value].nativeName,
}));
