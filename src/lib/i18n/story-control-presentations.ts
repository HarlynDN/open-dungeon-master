import { catalogFor, createTranslator, type MessageKey } from "./translator.ts";
import { storyText } from "./story-presentations.ts";
import type { AppLocale } from "./locales.ts";
import type { TextProvider } from "../text-models.ts";
import type { ImageBackend, ProseSize } from "../types.ts";
import type { Attitude } from "../db/npcs.ts";

// Order and canonical values match the existing settings selectors.
export const STORY_PROVIDER_KEYS = {
  local: "storyControl.provider.local", custom: "storyControl.provider.custom",
  none: "storyControl.provider.none", harness: "storyControl.provider.harness",
} as const satisfies Record<TextProvider, MessageKey>;
export const STORY_BACKEND_KEYS = {
  comfyui: "storyControl.backend.comfyui", openai: "storyControl.backend.openai",
  "mflux-hs": "storyControl.backend.mflux-hs", "sdnq-hs": "storyControl.backend.sdnq-hs",
  harness: "storyControl.backend.harness",
} as const satisfies Record<ImageBackend, MessageKey>;
const PROSE_KEYS = {
  tiny: "storyControl.prose.tiny", xsmall: "storyControl.prose.xsmall", small: "storyControl.prose.small",
  medium: "storyControl.prose.medium", large: "storyControl.prose.large", xlarge: "storyControl.prose.xlarge",
  xxlarge: "storyControl.prose.xxlarge", huge: "storyControl.prose.huge", giant: "storyControl.prose.giant",
} as const satisfies Record<ProseSize, MessageKey>;
const ATTITUDE_KEYS = {
  hostile: "storyControl.attitude.hostile", indifferent: "storyControl.attitude.indifferent", friendly: "storyControl.attitude.friendly",
} as const satisfies Record<Attitude, MessageKey>;
function display(keys: Partial<Record<string, MessageKey>>, value: string, locale: AppLocale): string {
  const key = Object.hasOwn(keys, value) ? keys[value] : undefined;
  return key ? createTranslator(locale)(key) : value;
}
export const storyProviderLabel = (value: TextProvider, locale: AppLocale) => display(STORY_PROVIDER_KEYS, value, locale);
export const storyBackendLabel = (value: ImageBackend, locale: AppLocale) => display(STORY_BACKEND_KEYS, value, locale);
export const proseSizeLabel = (value: ProseSize, locale: AppLocale) => display(PROSE_KEYS, value, locale);
export const npcAttitudeLabel = (value: string, locale: AppLocale) => display(ATTITUDE_KEYS, value, locale);

// Display projection never resends a mutation or rewrites stored protocol text.
export function controlText(source: string, locale: AppLocale): string {
  if (locale === "en") return source;
  const t = createTranslator(locale);
  const prefix = "The NPC roster did not load. ";
  if (source.startsWith(prefix)) return t("storyControl.error.load", { reason: controlText(source.slice(prefix.length), locale) });
  const row = Object.entries(catalogFor("en", "storyControl.error.")).find(([, text]) => text === source && !/\{\w+\}/.test(text));
  if (row) return t(row[0] as MessageKey);
  const stringLimit = /^Too big: expected string to have <=([0-9]+) characters$/.exec(source);
  if (stringLimit) return t("storyControl.error.stringLimit", { limit: stringLimit[1] });
  const collision = /^Another NPC is already called "([\s\S]+)"\. Merge them instead\.$/.exec(source);
  if (collision) return t("storyControl.error.collision", { name: collision[1] });
  const restricted = /^The server's ([\s\S]+) is kept for campaigns an administrator leads\.$/.exec(source);
  return restricted ? t("storyControl.error.agentRestricted", { label: restricted[1] }) : storyText(source, locale);
}
