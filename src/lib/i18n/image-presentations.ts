import { createTranslator } from "./translator.ts";
import { controlText } from "./story-control-presentations.ts";
import type { AppLocale } from "./locales.ts";

// Presentation only: the original failure stays available in media status.
// Match the complete native transport diagnostic, not arbitrary authored text.
export function imageFailureText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  if (/^Could not reach ComfyUI at https?:\/\/\S+\. Start ComfyUI and check the URL\.$/.test(source)) {
    return createTranslator(locale)("imageUi.serviceUnavailable");
  }
  return controlText(source, locale);
}
