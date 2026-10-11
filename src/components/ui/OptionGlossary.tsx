"use client";

import { InfoButton } from "@/components/ui/InfoDialog";
import type { GlossaryEntry } from "@/lib/help/terms";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { glossaryListText, glossaryTitle } from "@/lib/i18n/closed-game-help-presentations";

// The ⓘ beside a pick list whose options are single words a new DM may not
// know (conditions, schools, weapon properties, damage types). Opens the
// whole list with a sentence per option, because a native <option> cannot
// carry one and a chip row has no room for them.
export function OptionGlossary({
  title,
  entries,
  className,
}: {
  title: string;
  entries: readonly GlossaryEntry[];
  className?: string;
}) {
  const { locale } = useLocale();
  if (!entries.length) return null;
  return <InfoButton label={glossaryTitle(title, locale)} text={glossaryListText(entries, locale)} className={className} />;
}
