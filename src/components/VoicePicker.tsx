"use client";

import { useEffect, useState } from "react";
import { isComposingInput } from "@/lib/input-composition";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { voiceDisplayLabel } from "@/lib/i18n/media-presentations";
import { DEFAULT_LOCALE, LOCALE_DEFINITIONS, type AppLocale } from "@/lib/i18n/locales";
import { CHINESE_TTS_VOICES, TTS_VOICES } from "@/lib/tts-voices";
import { localeNarratorVoice, voiceSupportsLocale } from "@/lib/tts-locale";

// The narrator voice pickers (campaign settings, the campaign creator, the
// cast editor) offer what this server's speech backend really has, asked of
// it once per page (issue 89), and always let a voice be typed: many speech
// servers take blends ("af_heart(30)+af_bella(70)") and described voices that
// no list could hold. Until the server answers, and on a server older than
// the endpoint, the list is the shipped Kokoro one, as it always was.

type Voice = { id: string; label: string };
type VoiceList = { voices: Voice[]; provider: string; defaultVoice: string; listed: boolean };

function shipped(locale: AppLocale): VoiceList {
  return { voices: (locale === "zh-CN" ? CHINESE_TTS_VOICES : TTS_VOICES).filter(voice => voiceSupportsLocale(voice.id, locale)), provider: "kokoro", defaultVoice: localeNarratorVoice("af_heart", locale), listed: false };
}
const cached = new Map<AppLocale, { at: number; list: VoiceList }>();
const inflight = new Map<AppLocale, Promise<VoiceList>>();
function cachedList(locale: AppLocale) {
  const hit = cached.get(locale);
  return hit && Date.now() - hit.at < 60_000 ? hit.list : undefined;
}
function loadVoices(locale: AppLocale): Promise<VoiceList> {
  const hit = cachedList(locale);
  if (hit) return Promise.resolve(hit);
  const running = inflight.get(locale);
  if (running) return running;
  const fallback = shipped(locale);
  const request = fetch(`/api/tts/voices?locale=${encodeURIComponent(locale)}`, { cache: "no-store" })
    .then(response => response.ok ? response.json() : null)
    .then((data: Partial<VoiceList> | null) => {
      if (!data || !Array.isArray(data.voices)) return fallback;
      const list = { ...fallback, ...data, voices: data.voices };
      cached.set(locale, { at: Date.now(), list });
      return list;
    }).catch(() => fallback).finally(() => inflight.delete(locale));
  inflight.set(locale, request);
  return request;
}
export function useTtsVoices(speechLocale: AppLocale = DEFAULT_LOCALE): VoiceList {
  const [state, setState] = useState(() => ({ locale: speechLocale, list: cachedList(speechLocale) ?? shipped(speechLocale) }));
  useEffect(() => {
    let live = true;
    void loadVoices(speechLocale).then(list => { if (live) setState({ locale: speechLocale, list }); });
    return () => { live = false; };
  }, [speechLocale]);
  return state.locale === speechLocale ? state.list : cachedList(speechLocale) ?? shipped(speechLocale);
}

// The name a voice goes by in a summary line.
export function voiceLabel(list: VoiceList, voice: string, locale: AppLocale = DEFAULT_LOCALE, speechLocale: AppLocale = DEFAULT_LOCALE): string {
  const selected = localeNarratorVoice(voice, speechLocale, list.defaultVoice);
  const entry = list.voices.find((entry) => entry.id === selected);
  return entry ? voiceDisplayLabel(entry, locale) : selected;
}

const CUSTOM = "\u0000custom";

export function VoicePicker({
  value,
  onChange,
  label,
  size,
  className,
  // An entry ahead of the voices, for a picker that may also choose none
  // ("The narrator's voice" in the cast editor). Its value is "".
  noneLabel,
  speechLocale = DEFAULT_LOCALE,
}: {
  value: string;
  onChange: (voice: string) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
  noneLabel?: string;
  speechLocale?: AppLocale;
}) {
  const { locale, t } = useLocale();

  const list = useTtsVoices(speechLocale);
  const effectiveValue = value === "" && noneLabel ? "" : localeNarratorVoice(value, speechLocale, list.defaultVoice);
  const listed = list.voices.some((voice) => voice.id === effectiveValue);
  // Typing is open when asked for, and whenever the saved voice is one the
  // server did not list (a custom one, or a voice from another server).
  const [typing, setTyping] = useState(false);
  const custom = typing || (effectiveValue !== "" && !listed);
  const [draft, setDraft] = useState(effectiveValue);
  const [draftFor, setDraftFor] = useState(effectiveValue);
  // The field follows the saved value when it changes from outside.
  if (draftFor !== effectiveValue) {
    setDraftFor(effectiveValue);
    setDraft(effectiveValue);
  }

  const options: SelectOption<string>[] = [
    ...(noneLabel ? [{ value: "", label: noneLabel }] : []),
    ...list.voices.map((voice) => ({ value: voice.id, label: voiceDisplayLabel(voice, locale) })),
    { value: CUSTOM, label: t("voicePicker.custom"), hint: t("voicePicker.customHint") },
  ];

  function commit() {
    const next = draft.trim().slice(0, 120);
    if (next && next !== effectiveValue) {
      onChange(next);
    }
  }

  return (
    <span className={cn("inline-flex min-w-0 max-w-full flex-wrap items-center gap-1.5", className)}>
      <Select<string>
        size={size}
        label={label}
        value={custom ? CUSTOM : effectiveValue}
        onChange={(next) => {
          if (next === CUSTOM) {
            setTyping(true);
            return;
          }
          setTyping(false);
          onChange(next);
        }}
        options={options}
        className="min-w-0 grow"
      />
      {list.listed && !list.voices.length ? <span role="status" className="basis-full text-xs text-amber-300">{t("voicePicker.localeUnavailable")}</span> : null}
      {custom ? (
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (isComposingInput(event)) return;
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          maxLength={120}
          aria-label={t("voicePicker.customLabel", { label })}
          placeholder={list.provider === "openai" ? t("voicePicker.exampleOpenai") : speechLocale === DEFAULT_LOCALE ? t("voicePicker.exampleKokoro") : LOCALE_DEFINITIONS[speechLocale].tts.defaultVoice}
          className={cn(ui.input, "reveal min-w-0 grow basis-40", size === "sm" && "px-2 py-1 text-xs")}
        />
      ) : null}
    </span>
  );
}
