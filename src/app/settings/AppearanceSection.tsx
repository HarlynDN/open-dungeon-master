"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { THEME_CHOICES } from "@/lib/i18n/account-metadata";
import { themeChoiceLabel } from "@/lib/i18n/account-presentations";
import { PageSection } from "@/components/PageShell";
import { GameIcon } from "@/components/ui/GameIcon";
import { Slider } from "@/components/ui/Slider";
import { ui } from "@/lib/ui";
import { UI_SCALE_MAX, UI_SCALE_MIN, useThemePrefs, writeThemeChoice, writeUiScale } from "@/lib/theme-mode";

// Appearance (docs/vtt-parity-implementation-plan.md section 14): the night
// or the day theme, the OS's choice by default, and how large the interface
// reads. Both are kept on this device, not on the account.

export function AppearanceSection() {
  const { locale, t } = useLocale();
  const { choice, scale } = useThemePrefs();
  return (
    <PageSection
      heading={t("appearance.title")}
      glyph="sense-darkvision"
      intro={t("appearance.hint")}
    >
      <div data-pill-group="" role="group" aria-label={t("appearance.theme")} className="flex flex-wrap gap-2">
        {THEME_CHOICES.map((entry) => (
          <button
            data-on={choice === entry.id ? "" : undefined}
            key={entry.id}
            type="button"
            aria-pressed={choice === entry.id}
            onClick={() => writeThemeChoice(entry.id)}
            className="theme-card motion-press"
          >
            <GameIcon icon={{ kind: "glyph", key: entry.glyph }} size="size-8" /> {themeChoiceLabel(entry.id, locale)}
          </button>
        ))}
      </div>
      <div className="mt-4 text-xs text-stone-400">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span>{t("appearance.scale")}</span>
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-stone-300">{Math.round(scale * 100)}%</span>
            {scale !== 1 ? (
              <button type="button" onClick={() => writeUiScale(1)} className={`${ui.btnSmall} reveal-pop px-2 py-1 text-[11px]`}>
                {t("appearance.reset")}
              </button>
            ) : null}
          </span>
        </div>
        <Slider
          label={t("appearance.scale")}
          min={UI_SCALE_MIN}
          max={UI_SCALE_MAX}
          step={0.05}
          value={scale}
          onChange={writeUiScale}
          bubble={(value) => `${Math.round(value * 100)}%`}
        />
      </div>
    </PageSection>
  );
}
