import { APP_LOCALES, LOCALE_DEFINITIONS, normalizeLocale, type AppLocale } from "./locales.ts";

export function generationLocaleRule(locale: AppLocale): string {
  const selected = normalizeLocale(locale);
  return [
    `[ODM output locale: ${selected}]`,
    `Write player-facing narration, dialogue, summaries, descriptions, answers and natural-language JSON values in ${LOCALE_DEFINITIONS[selected].generationLanguage}.`,
    "This is an application output locale, not a character's in-world language. Preserve fictional languages, names and established facts.",
    "Keep tool names, JSON keys, enum values, IDs, dice notation and all machine protocols unchanged. For spell, item, monster, class and other rules references in tool arguments, use the canonical English name or ID supplied by the catalog, never a translated display name.",
    "Keep verbatim quotations and citation excerpts in their original language. Tool results and source documents may be English; explain them to players in the output locale. Do not translate or rewrite existing history.",
  ].join("\n");
}

// Works for direct, utility and harness calls. Merge into the first system
// message to retain the single-system-message shape used by Ask and agents.
// Do not mutate the stored conversation; retry/fallback must be idempotent.
type LocaleSystemMessage = { role: "system"; content: string };

export function withGenerationLocale<T extends { role: string; content?: unknown }>(
  messages: T[],
  locale: AppLocale,
): Array<T | LocaleSystemMessage> {
  const rule = generationLocaleRule(locale);
  const marker = rule.split("\n", 1)[0];
  const systemIndex = messages.findIndex((message) => message.role === "system");
  if (systemIndex < 0) {
    return [{ role: "system", content: rule }, ...messages];
  }
  const system = messages[systemIndex];
  if (typeof system.content !== "string") {
    throw new Error("Campaign system messages must contain text.");
  }
  const systemContent = system.content;
  const priorRules = APP_LOCALES.filter(previous => previous !== locale).map(generationLocaleRule);
  if (systemContent.includes(marker) && !priorRules.some(rule => systemContent.includes(rule))) return messages;
  const content = [...priorRules, rule].reduce((text, previous) => text.replace(previous, ""), systemContent).trim();
  return messages.map((message, index) => index === systemIndex
    ? { ...message, content: `${content}\n\n${rule}` }
    : message);
}
