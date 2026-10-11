import { createTranslator } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { Personality } from "../dm/personalities.ts";

export type TableInfo = "livingWorld" | "bonds" | "romance" | "narrationGuard";

export function tableInfo(kind: TableInfo, locale: AppLocale) {
  const t = createTranslator(locale);
  return { label: t(`table.info.${kind}.label`), text: t(`table.info.${kind}.text`) };
}

// English ASCII separators retain their old behavior. Chinese punctuation
// separates actual saved safety boundaries rather than one combined phrase.
export function parseSafetyList(text: string): string[] {
  return text.split(/[,，、]/u).map(entry => entry.trim()).filter(Boolean).slice(0, 12);
}

const STOCK_KINDS = ["storyteller", "referee", "chronicler", "trickster", "courtier"] as const;

// Stock rows predate locale support and have generated IDs. Recognize their
// original source copy, only on server-owned rows; preserve authored presets.
export function personalityPresentation(preset: Pick<Personality, "userId" | "name" | "blurb">, locale: AppLocale) {
  const en = createTranslator("en");
  const kind = preset.userId === null ? STOCK_KINDS.find(kind =>
    preset.name === en(`personality.${kind}.name`) && preset.blurb === en(`personality.${kind}.blurb`),
  ) : undefined;
  if (!kind) return { name: preset.name, blurb: preset.blurb };
  const t = createTranslator(locale);
  return { name: t(`personality.${kind}.name`), blurb: t(`personality.${kind}.blurb`) };
}
