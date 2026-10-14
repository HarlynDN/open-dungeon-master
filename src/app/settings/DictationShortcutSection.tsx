"use client";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { PageSection } from "@/components/PageShell";
import { DictationShortcutField } from "@/components/DictationShortcutField";

// The hold-to-dictate key (issue 291), on this device like Appearance: the
// apps also offer it under Audio and dice in their own Settings.
export function DictationShortcutSection() {
  const { t } = useLocale();
  return (
    <PageSection
      heading={t("upstreamUi.dictationHeading")}
      glyph="ui-voice"
      intro={t("upstreamUi.dictationIntro")}
    >
      <DictationShortcutField />
    </PageSection>
  );
}
