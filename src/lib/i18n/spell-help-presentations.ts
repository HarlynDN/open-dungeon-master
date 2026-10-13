import type { AppLocale } from "./locales.ts";
import { SPELL_HELP } from "./spell-help-metadata.ts";
import { registeredMessageTemplate } from "./translator.ts";
import { normalizeRulesText } from "../help/rules-text.ts";

// Name alone cannot establish ownership: preserve authored/other-book variants
// and only project the complete, unchanged native source into the chosen locale.
export function nativeSpellHelp(identity: { name?: string; source?: string; documentSlug?: string }, source: string | null, locale: AppLocale): string | null {
  if (!source || locale === "en" || identity.source === "homebrew"
    || (identity.documentSlug && identity.documentSlug !== "wotc-srd")) return source;
  const row = SPELL_HELP.find(row => row.name === identity.name);
  if (!row) return source;
  const original = registeredMessageTemplate("en", row.key);
  const translated = registeredMessageTemplate(locale, row.key);
  return original && translated && normalizeRulesText(source) === normalizeRulesText(original)
    ? translated : source;
}
