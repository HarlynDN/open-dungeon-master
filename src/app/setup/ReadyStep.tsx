"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator, type MessageKey } from "@/lib/i18n/translator";

import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import { BackendProbe } from "@/app/admin/BackendProbe";
import { HarnessTestPanel } from "@/app/admin/HarnessTestPanel";
import type { Capabilities } from "@/lib/capabilities";
import type { Draft } from "@/app/setup/draft";
import { Lamp, type Tone } from "@/app/setup/SetupParts";

type Row = { key: string; title: string; tone: Tone; text: string; step: number };

const SIGNUPS: Record<Draft["signupMode"], MessageKey> = {
  invite: "setupGuide.ready.invite",
  open: "setupGuide.ready.open",
  closed: "setupGuide.ready.closed",
};

const STT_WORDS: Record<string, MessageKey> = {
  whisper: "setupGuide.ready.sttWhisper",
  builtin: "setupGuide.ready.sttBuiltin",
  openai: "setupGuide.ready.sttOpenai",
};

function rows(input: {
  draft: Draft;
  caps: Capabilities | null;
  address: string;
  agentConnected: boolean;
  steps: Record<string, number>;
  failed: boolean;
}, t: ReturnType<typeof createTranslator>): Row[] {
  const { draft, caps, steps } = input;
  const wait = !caps;
  const waitingTone = input.failed ? "bad" : "wait";
  const waitingText = t(input.failed ? "setupGuide.ready.unknown" : "setupGuide.ready.ask");
  const story: Row =
    draft.story === "none"
      ? { key: "story", title: t("setupGuide.ready.story"), tone: "off", text: t("setupGuide.ready.human"), step: steps.story }
      : wait
        ? { key: "story", title: t("setupGuide.ready.story"), tone: waitingTone, text: input.failed ? waitingText : t("setupGuide.ready.askStory"), step: steps.story }
        : caps.story.configured && caps.story.reachable
          ? { key: "story", title: t("setupGuide.ready.story"), tone: "ok", text: t("setupGuide.ready.answering", { model: caps.story.model ? ` · ${caps.story.model}` : "" }), step: steps.story }
          : {
              key: "story",
              title: t("setupGuide.ready.story"),
              tone: "bad",
              text:
                draft.story === "agent"
                  ? t("setupGuide.ready.agentNotReady")
                  : t("setupGuide.ready.serverNotReady"),
              step: steps.story,
            };
  const pictures: Row =
    draft.pictures === "none"
      ? { key: "pictures", title: t("setupGuide.ready.pictures"), tone: "off", text: t("setupGuide.ready.placeholders"), step: steps.pictures }
      : wait
        ? { key: "pictures", title: t("setupGuide.ready.pictures"), tone: waitingTone, text: waitingText, step: steps.pictures }
        : caps.images.configured && caps.images.reachable
          ? { key: "pictures", title: t("setupGuide.ready.pictures"), tone: "ok", text: draft.pictures === "comfyui" ? t("setupGuide.ready.comfy") : draft.pictures === "openai" ? t("setupGuide.ready.openaiPictures") : t("setupGuide.ready.agentPictures"), step: steps.pictures }
          : caps.images.needsModel ? { key: "pictures", title: t("setupGuide.ready.pictures"), tone: "warn", text: t("setupGuide.ready.picturesModelMissing"), step: steps.pictures }
          : { key: "pictures", title: t("setupGuide.ready.pictures"), tone: "warn", text: t("setupGuide.ready.picturesWaiting"), step: steps.pictures };
  const narration: Row =
    draft.narration === "off"
      ? { key: "narration", title: t("setupGuide.ready.narration"), tone: "off", text: t("setupGuide.ready.text"), step: steps.voice }
      : wait
        ? { key: "narration", title: t("setupGuide.ready.narration"), tone: waitingTone, text: waitingText, step: steps.voice }
        : caps.tts.configured && caps.tts.reachable
          ? { key: "narration", title: t("setupGuide.ready.narration"), tone: "ok", text: draft.narration === "kokoro" ? t("setupGuide.ready.kokoro") : t("setupGuide.ready.openaiVoice"), step: steps.voice }
          : caps.tts.needsModel ? { key: "narration", title: t("setupGuide.ready.narration"), tone: "warn", text: t("setupGuide.ready.voiceModelMissing"), step: steps.voice }
          : { key: "narration", title: t("setupGuide.ready.narration"), tone: "warn", text: t("setupGuide.ready.waiting"), step: steps.voice };
  const dictation: Row = wait
    ? { key: "dictation", title: t("setupGuide.ready.dictation"), tone: waitingTone, text: waitingText, step: steps.voice }
    : caps.stt.configured
      ? { key: "dictation", title: t("setupGuide.ready.dictation"), tone: "ok", text: t(STT_WORDS[caps.stt.backend] ?? "setupGuide.ready.available"), step: steps.voice }
      : { key: "dictation", title: t("setupGuide.ready.dictation"), tone: "off", text: t("setupGuide.ready.sttOff"), step: steps.voice };
  const players: Row = {
    key: "players",
    title: t("setupGuide.ready.players"),
    tone: "ok",
    text: `${t(SIGNUPS[draft.signupMode])}${input.address ? ` · ${input.address}` : ""}`,
    step: steps.players,
  };
  const agent: Row = input.agentConnected
    ? { key: "agent", title: t("setupGuide.ready.agent"), tone: "ok", text: t("setupGuide.ready.connected"), step: steps.agent }
    : { key: "agent", title: t("setupGuide.ready.agent"), tone: "off", text: t("setupGuide.ready.optional"), step: steps.agent };
  return [story, pictures, narration, dictation, players, agent];
}

// The last step: what the server can do now, asked live, each line with a
// way back to the step that sets it, and one real test of the storyteller.
export function ReadyStep({
  active,
  draft,
  address,
  agentConnected,
  steps,
  onJump,
}: {
  active: boolean;
  draft: Draft;
  address: string;
  agentConnected: boolean;
  steps: Record<string, number>;
  onJump: (step: number) => void;
}) {
  const { t } = useLocale();
  const [caps, setCaps] = useState<Capabilities | null>(null);
  const [checking, setChecking] = useState(false);
  const [failed, setFailed] = useState(false);

  const ask = useCallback(
    () =>
      fetch("/api/capabilities")
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null)
        .then((data) => {
          const readable = data && ["story", "images", "tts", "stt"].every(key => typeof data[key]?.configured === "boolean")
            && ["story", "images", "tts"].every(key => typeof data[key]?.reachable === "boolean");
          setCaps(readable ? data as Capabilities : null);
          setFailed(!readable);
          setChecking(false);
        }),
    [],
  );

  // Asked on each arrival (the wizard remounts this step with a new key):
  // the steps before it have just saved.
  useEffect(() => {
    if (active) void ask();
  }, [active, ask]);

  function check() {
    setChecking(true);
    setCaps(null);
    setFailed(false);
    void ask();
  }

  const list = rows({ draft, caps, address, agentConnected, steps, failed }, t);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-stone-400">{t("setupGuide.ready.heading")}</span>
        <button type="button" className={ui.btnSmall} onClick={check} disabled={checking} aria-busy={checking}>
          <RefreshCw className={checking ? "size-3.5 animate-spin" : "size-3.5"} /> {t("setupGuide.agent.check")}
        </button>
      </div>
      {failed ? <p role="alert" className="text-sm text-red-400">{t("setupGuide.error.capabilities")}</p> : null}
      <ul className="stagger space-y-2" aria-live="polite">
        {list.map((row) => (
          <li key={row.key} className="su-row">
            <Lamp tone={row.tone} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-stone-100">{row.title}</span>
              <span key={row.text} className="live-in block text-xs text-stone-400">
                {row.text}
              </span>
            </span>
            <button type="button" className={ui.btnSmall} onClick={() => onJump(row.step)}>
              {t("setupGuide.ready.change")}
            </button>
          </li>
        ))}
      </ul>

      {draft.story === "local" || draft.story === "key" ? (
        <div className="su-row flex-col items-stretch">
          <span className="text-sm text-stone-200">{t("setupGuide.ready.tryStory")}</span>
          <BackendProbe which="story" baseUrl="" model="" />
        </div>
      ) : draft.story === "agent" && draft.agent.id ? (
        <div className="su-row flex-col items-stretch">
          <span className="text-sm text-stone-200">{t("setupGuide.ready.tryAgent")}</span>
          <HarnessTestPanel saved paints={false} picturesVerified={false} onVerified={check} />
        </div>
      ) : null}
    </div>
  );
}
