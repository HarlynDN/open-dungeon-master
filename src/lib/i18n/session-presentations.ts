import { catalogFor, createTranslator, messageTemplate, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { formatElapsed, type UtilityCallKind } from "../dm/call-tracker-logic.ts";

// Complete native frames only: authored text and technical backend details
// are data, never targets for global word replacement.
export function sessionSourceText(raw: string, locale: AppLocale, prefix: string): string {
  if (!raw || locale === "en") return raw;
  const known = Object.entries(catalogFor("en", prefix)).find(([, source]) => source === raw);
  return known ? createTranslator(locale)(known[0] as MessageKey) : raw;
}

const CALL_KEYS = {
  compaction: "sessionUi.call.compaction", chapter: "sessionUi.call.chapter", world: "sessionUi.call.world",
  lore: "sessionUi.call.lore", ask: "sessionUi.call.ask", beat: "sessionUi.call.beat", map: "sessionUi.call.map",
  act: "sessionUi.call.act", monster: "sessionUi.call.monster",
} satisfies Record<UtilityCallKind, MessageKey>;
export function utilityCallLabel(kind: UtilityCallKind, locale: AppLocale): string {
  return createTranslator(locale)(CALL_KEYS[kind] ?? "sessionUi.call.working");
}
export function utilityElapsed(startedAt: number, now: number, locale: AppLocale): string {
  const original = formatElapsed(startedAt, now);
  if (!original || locale === "en") return original;
  const match = /^(?:(\d+)m )?(\d+)s$/.exec(original);
  if (!match) return original;
  return createTranslator(locale)(match[1] ? "sessionUi.elapsed.minutes" : "sessionUi.elapsed.seconds", {
    minutes: match[1] ?? 0, seconds: match[2],
  });
}

export function sessionSubTabLabel(id: string, label: string, locale: AppLocale): string {
  const key = `sessionUi.sub.${id}` as MessageKey;
  // Custom labels sharing a native tab ID still belong to their author.
  return catalogFor("en", "sessionUi.sub.")[key] === label ? createTranslator(locale)(key) : label;
}

export function dictationHintText(raw: string, locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const suffix = " The part before that is in the field.";
  if (raw.endsWith(suffix)) return createTranslator(locale)("sessionUi.dictation.partial", {
    reason: dictationHintText(raw.slice(0, -suffix.length), locale),
  });
  const own = sessionSourceText(raw, locale, "sessionUi.dictation.");
  if (own !== raw) return own;
  const microphone = sessionSourceText(raw, locale, "voice.");
  return microphone !== raw ? microphone : createTranslator(locale)("sessionUi.dictation.failed");
}

export function speechFailureText(raw: string | undefined, locale: AppLocale): string {
  const reason = raw || messageTemplate("en", "sessionUi.narration.fallback");
  if (locale === "en") return reason;
  const own = sessionSourceText(reason, locale, "sessionUi.error.");
  if (own !== reason) return own;
  if (reason === messageTemplate("en", "sessionUi.narration.fallback")) return createTranslator(locale)("sessionUi.narration.fallback");
  if (reason.startsWith("Narration failed. ")) return speechFailureText(reason.slice(18), locale);
  const frames: Array<[RegExp, MessageKey, string[]]> = [
    [/^(The(?: Kokoro)? speech server) refused the API key \(HTTP (\d+)\)\.$/, "sessionUi.error.key", ["server", "status"]],
    [/^(The(?: Kokoro)? speech server) has no speech endpoint at (.*?) \(HTTP 404\)\.$/, "sessionUi.error.endpoint", ["server", "endpoint"]],
    [/^(The(?: Kokoro)? speech server) answered HTTP (\d+)(.*?)\.$/, "sessionUi.error.http", ["server", "status", "detail"]],
    [/^(The(?: Kokoro)? speech server) took too long to answer\.$/, "sessionUi.error.timeout", ["server"]],
    [/^(The(?: Kokoro)? speech server) answered without any audio\.$/, "sessionUi.error.empty", ["server"]],
    [/^(The(?: Kokoro)? speech server) could not be reached at (.*?)\.$/, "sessionUi.error.unreachable", ["server", "host"]],
  ];
  const t = createTranslator(locale);
  for (const [pattern, key, fields] of frames) {
    const match = pattern.exec(reason);
    if (!match) continue;
    const params = Object.fromEntries(fields.map((field, index) => [field, match[index + 1]]));
    params.server = t(params.server === "The Kokoro speech server" ? "sessionUi.speech.kokoro" : "sessionUi.speech.server");
    return t(key, params);
  }
  return t("sessionUi.error.read");
}

type JoinSheet = { name: string; race: string; class: string; backstory: string };
function joinIdentityLabel(kind: "race" | "class", value: string, locale: AppLocale): string {
  const key = `rule.${kind}.${value.trim().toLowerCase().replace(/[ -]+/g, "_")}` as MessageKey;
  return Object.hasOwn(catalogFor("en", `rule.${kind}.`), key) ? createTranslator(locale)(key) : value;
}
export function newAdventurerText(raw: string, sheets: readonly JoinSheet[], members: readonly { username: string }[], locale: AppLocale): string {
  if (!raw || locale === "en") return raw;
  const t = createTranslator(locale);
  const source = createTranslator("en");
  const matches: Array<Record<string, string>> = [];
  for (const sheet of sheets) {
    for (const member of members) {
      const text = sheet.backstory.slice(0, 200);
      const params = {
        user: member.username, name: sheet.name, race: sheet.race.replaceAll("_", " "), calling: sheet.class,
        backstory: text ? source("sessionUi.join.backstory", { text }) : "",
      };
      // No ambiguous parsing of names containing commas/periods. Match the
      // entire native note using identities this viewer already has.
      if (source("sessionUi.join.note", params) === raw) matches.push({
        ...params, race: joinIdentityLabel("race", sheet.race, locale), calling: joinIdentityLabel("class", sheet.class, locale),
        backstory: text ? t("sessionUi.join.backstory", { text }) : "",
      });
    }
  }
  return matches.length === 1 ? t("sessionUi.join.note", matches[0]) : raw;
}
