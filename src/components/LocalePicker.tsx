"use client";

import { Select } from "@/components/ui/Select";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { localeOptions, type AppLocale } from "@/lib/i18n/locales";

export function LocalePicker({ value, onChange, disabled, campaign = false }: {
  value: AppLocale;
  onChange: (locale: AppLocale) => void;
  disabled?: boolean;
  campaign?: boolean;
}) {
  const { t } = useLocale();
  const label = t(campaign ? "locale.campaign" : "locale.interface");
  return <Select label={label} value={value} options={localeOptions} onChange={onChange} disabled={disabled} />;
}

export function InterfaceLocalePicker() {
  const { locale, setLocale, t, saving, error } = useLocale();
  return (
    <div className="space-y-2">
      <LocalePicker value={locale} onChange={(next) => void setLocale(next)} disabled={saving} />
      <p className="text-xs text-stone-500">{t("locale.interfaceHint")}</p>
      {saving ? <p role="status" className="text-xs text-stone-400">{t("locale.saving")}</p> : null}
      {error ? <p role="alert" className="text-xs text-amber-300">{t("locale.saveError")}</p> : null}
    </div>
  );
}
