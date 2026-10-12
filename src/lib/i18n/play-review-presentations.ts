import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import type { TourStep } from "../tours/logic.ts";
import { REVIEW_TEXT_KEYS } from "./play-review-metadata.ts";
import { micBlockMessage } from "../secure-context.ts";
import { entryNotice } from "./entry-ui-presentations.ts";
export const REVIEW_NOTICES = { action: "Could not send your action.", check: "The check failed; try again.", accept: "Could not apply the rewrite.", network: "Could not reach the server." } as const;
type FrameKey = Extract<MessageKey, `playReviewUi.frame.${string}`> extends `playReviewUi.frame.${infer Key}` ? Key : never;
export function reviewFrame(key: FrameKey, values: Record<string, string | number>, locale: AppLocale): string { return createTranslator(locale)(`playReviewUi.frame.${key}` as MessageKey, values); }
export function reviewText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const key = Object.hasOwn(REVIEW_TEXT_KEYS, raw) ? REVIEW_TEXT_KEYS[raw as keyof typeof REVIEW_TEXT_KEYS] : undefined;
  return key ? createTranslator(locale)(key) : raw;
}
export function reviewNotice(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  return entryNotice(reviewText(raw, locale), locale);
}
export function dictationHint(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  for (const reason of ["insecure", "unsupported"] as const) if (raw === micBlockMessage(reason)) return createTranslator(locale)(reason === "insecure" ? "voice.micInsecure" : "voice.micUnsupported");
  const kept = /^([\s\S]+) The part before that is in the field\.$/.exec(raw);
  if (kept) return reviewFrame("kept", { reason: dictationHint(kept[1], locale) }, locale);
  const status = /^The transcriber answered (\d{3})\.$/.exec(raw);
  return status ? reviewFrame("transcriberStatus", { status: status[1] }, locale) : reviewNotice(raw, locale);
}
export function tableTourView(kind: "player" | "dm", steps: readonly TourStep[], locale: AppLocale): TourStep[] {
  if (locale === "en") return [...steps];
  const t = createTranslator(locale);
  return steps.map(step => ({ ...step, title: t(`playReviewUi.tour.${kind}.${step.id}.title` as MessageKey), body: t(`playReviewUi.tour.${kind}.${step.id}.body` as MessageKey) }));
}
