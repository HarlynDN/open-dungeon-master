"use client";

import { Loader2, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { registerOutput, releaseOutput } from "@/lib/audio-devices";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { Tooltip } from "@/components/ui/Tooltip";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { apiErrorText, type ApiUiError } from "@/lib/i18n/api-errors";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";
import { speechFailureText } from "@/lib/i18n/session-presentations";

// Plays a short sample of a narrator voice next to the voice pickers. The
// first play for a voice waits on the speech server rendering it (about a
// second); after that the clip is cached server-side and starts immediately.
// A sample that cannot be made says why, where it can be read without a
// hover (issue 88).
export function VoicePreviewButton({ voice, className, speechLocale = DEFAULT_LOCALE }: { voice: string; className?: string; speechLocale?: AppLocale }) {
  const { locale, t } = useLocale();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const source = `/api/tts/preview?voice=${encodeURIComponent(voice)}${speechLocale === DEFAULT_LOCALE ? "" : `&locale=${encodeURIComponent(speechLocale)}`}`;
  const [failure, setFailure] = useState<{ source: string; data: ApiUiError } | null>(null);
  const failed = failure?.source === source ? speechFailureText(apiErrorText(locale, failure.data, "voice.previewFailed"), locale) : "";

  // Stops the clip and lets the output router forget it; the next play
  // builds a fresh element, so nothing is kept between plays.
  function stop() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      releaseOutput(audio);
      audioRef.current = null;
    }
    setPlaying(false);
    setLoading(false);
  }

  // Switching voices (or unmounting) must not leave the old clip talking.
  useEffect(() => stop, [voice, speechLocale]);

  async function toggle() {
    if (playing || loading) {
      stop();
      return;
    }
    setFailure(null);
    setLoading(true);
    // Built and configured before it reaches the ref: the clip element is
    // never mutated after the component holds on to it.
    const audio = registerOutput(new Audio(source));
    const done = () => {
      if (audioRef.current !== audio) return;
      setPlaying(false);
      releaseOutput(audio);
    };
    audio.onended = done;
    audio.onerror = done;
    audioRef.current = audio;
    try {
      await audio.play();
      if (audioRef.current !== audio) return;
      setPlaying(true);
    } catch {
      if (audioRef.current !== audio) return;
      // The element only knows that it failed; the route knows why.
      const reason = await fetch(source)
        .then((response) => (response.ok ? null : response.json()))
        .then((data: ApiUiError | null) => data ?? {})
        .catch(() => ({}));
      if (audioRef.current !== audio) return;
      setFailure({ source, data: reason });
      releaseOutput(audio);
    } finally {
      if (audioRef.current === audio) setLoading(false);
    }
  }

  const Icon = loading ? Loader2 : playing ? Square : Play;
  return (
    <>
      <Tooltip content={failed || t("voice.sampleHint")}>
        <button
          type="button"
          onClick={toggle}
          aria-label={t("voice.preview")}
          className={cn(ui.btnSmall, "shrink-0 px-2", failed && "border-red-800/70", className)}
        >
          <Icon className={cn("size-4", loading && "animate-spin")} />
        </button>
      </Tooltip>
      {failed ? (
        <span role="alert" className="live-in basis-full text-[11px] leading-4 text-red-400">
          {failed}
        </span>
      ) : null}
    </>
  );
}
