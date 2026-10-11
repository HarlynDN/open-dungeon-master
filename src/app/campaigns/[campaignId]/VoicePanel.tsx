"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import {
  HeadphoneOff,
  Hand,
  Headphones,
  Loader2,
  Mic,
  MicOff,
  PhoneOff,
  Radio,
  Settings2,
  ShieldBan,
  WifiOff,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { readUiResponse, requestErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { VOICE_FLOOR_KEYS, VOICE_BLOCK_KEYS, parseVoiceChannels, voiceRequestError, voiceWarningText } from "@/lib/i18n/voice-presentations";
import { LoadFailed, PanelLoading } from "./PanelKit";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { VoiceRooms, VoiceSettings } from "@/app/campaigns/[campaignId]/VoicePanelParts";
import { useVoiceRoom } from "@/app/campaigns/[campaignId]/useVoiceRoom";
import { VoicePeerRow } from "@/app/campaigns/[campaignId]/VoicePeerRow";
import {
  mayTransmit,
  type TurnEnforcement,
  type VoiceFloorMode,
} from "@/lib/voice/turn-logic";
import type { VoiceChannelView, VoiceRosterEntry } from "@/lib/voice/types";

// The voice menu. Shown in the lobby while people pick characters and in the
// session side panel during play, from the same component, because "who is on
// the call" is the same question in both places.
export function VoicePanel({
  campaignId,
  meUserId,
  roster,
  speaking,
  floorMode = "open",
  floorUserIds = [],
  turnEnforcement = "soft",
  adjudicates = false,
  steersStory = false,
  sayRangeRule = false,
  audibilityVersion = 0,
  meshSignal = null,
  compact = false,
  transcribe = false,
}: {
  campaignId: string;
  meUserId: string;
  // From the campaign SSE stream; null until the first roster event.
  roster: VoiceRosterEntry[] | null;
  speaking?: { userId: string; at: number } | null;
  floorMode?: VoiceFloorMode;
  floorUserIds?: string[];
  turnEnforcement?: TurnEnforcement;
  adjudicates?: boolean;
  // Gates the breakout-room controls. Separate from adjudicates because the
  // channels route asks for story authority, which an AI campaign's lead
  // holds without ever holding the DM seat.
  steersStory?: boolean;
  // Whether the say-range rule is on, which is the only thing that makes the
  // whisper/shout selector meaningful.
  sayRangeRule?: boolean;
  audibilityVersion?: number;
  // Mesh signaling nudge from the stream, threaded to the hook.
  meshSignal?: { to: string; version: number } | null;
  compact?: boolean;
  // The table's transcription switch (13.3).
  transcribe?: boolean;
}) {
  const { locale, t } = useLocale();
  const voice = useVoiceRoom(campaignId, roster, meUserId, audibilityVersion, meshSignal, { transcribe });
  const [channels, setChannels] = useState<VoiceChannelView[]>([]);
  const [channelsError, setChannelsError] = useState<UiRequestError | null>(null);
  const [channelWriteError, setChannelWriteError] = useState<UiRequestError | null>(null);
  const [channelPending, setChannelPending] = useState(false);
  const [channelAttempt, setChannelAttempt] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  // Whose volume slider is open. One at a time, so a busy table does not turn
  // the roster into a mixing desk.
  const [volumeFor, setVolumeFor] = useState<string | null>(null);

  // Breakout rooms are in-memory and change only when the DM acts, so the
  // roster event is a good enough trigger to refetch the list. Written as a
  // promise chain rather than an awaited helper so the state update plainly
  // happens in a callback rather than in the effect body.
  useEffect(() => {
    if (!voice.available || voice.availabilityStatus !== "ready") return;
    let cancelled = false;
    readUiResponse<{ channels: VoiceChannelView[] }>(fetch(`/api/campaigns/${campaignId}/voice/channels`), "voice.channelsLoadError")
      .then((data) => {
        if (!cancelled) {
          setChannels(parseVoiceChannels(data));
          setChannelsError(null);
        }
      })
      .catch((cause) => {
        if (!cancelled) setChannelsError(voiceRequestError(cause, "voice.channelsLoadError"));
      });
    return () => { cancelled = true; };
  }, [campaignId, roster, channelAttempt, voice.available, voice.availabilityStatus]);

  const channelAction = useCallback(
    async (body: Record<string, unknown>): Promise<boolean> => {
      setChannelPending(true);
      setChannelWriteError(null);
      try {
        const data = await readUiResponse<{ channels: VoiceChannelView[] }>(fetch(`/api/campaigns/${campaignId}/voice/channels`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }), "voice.channelsWriteError");
        setChannels(parseVoiceChannels(data));
        setChannelsError(null);
        return true;
      } catch (cause) {
        setChannelWriteError(voiceRequestError(cause, "voice.channelsWriteError"));
        return false;
      } finally { setChannelPending(false); }
    },
    [campaignId],
  );

  if (voice.availabilityStatus === "loading") return <div className="panel rounded-xl p-4"><PanelLoading label={t("voice.loading")} rows={1} /></div>;
  if (voice.availabilityStatus === "error") return <div className="panel rounded-xl p-4"><LoadFailed error={requestErrorText(locale, voice.availabilityError)} onRetry={voice.retryAvailability} /></div>;

  if (!voice.available) {
    return (
      <div className="panel flex items-start gap-3 rounded-xl px-4 py-3">
        <GameIcon icon={{ kind: "glyph", key: "cue-turn" }} size="size-9" className="opacity-60 grayscale" />
        <div className="min-w-0">
          <p className="font-display text-sm tracking-wide text-stone-300">{t("voice.off")}</p>
          <p className="mt-0.5 text-xs text-stone-500">
            {voice.unavailableReason === "server"
              ? t("voice.serverOff")
              : t("voice.campaignOff")}
          </p>
        </div>
      </div>
    );
  }

  // The server draws both edges of this (src/lib/voice/room.ts): it sends a
  // userId when somebody starts and an empty one when they stop, so there is
  // no clock to run here.
  const isSpeaking = (userId: string) => speaking?.userId === userId;

  // The same rule the server enforces, asked here only to label the UI. The
  // server is what actually pauses a producer; this never gates anything on
  // its own (src/lib/voice/turn-logic.ts).
  const myVerdict = mayTransmit(
    floorMode,
    floorUserIds,
    { userId: meUserId, adjudicates },
    turnEnforcement,
  );
  const floorNote =
    turnEnforcement === "off" || floorMode === "open" ? "" : t(VOICE_FLOOR_KEYS[floorMode]);
  const control = cn(ui.btnSmall, "session-voice-btn");

  return (
    <div className={cn("panel rounded-xl", compact ? "p-3" : "p-4")}>
      <SectionHead
        title={t("voice.title")}
        glyph="cue-turn"
        level="h3"
        className="mb-2"
        aside={
          voice.peers.length ? (
            <span key={voice.peers.length} className="count-pop text-xs text-stone-400">
              {t("voice.onCall", { count: voice.peers.length })}
            </span>
          ) : null
        }
      />
      <div className="flex flex-wrap items-center justify-end gap-1.5">
        {voice.connected ? (
          <>
            {/* Asking for the floor without talking over whoever holds it.
                Hidden for the DM, who never has to queue for their own
                floor. */}
            {!adjudicates && !myVerdict.mayTransmit ? (
              <button
                type="button"
                onClick={() => void voice.toggleHand()}
                aria-label={voice.handRaised ? t("voice.lowerHand") : t("voice.askSpeak")}
                title={voice.handRaised ? t("voice.lowerHand") : t("voice.askSpeak")}
                data-tone={voice.handRaised ? "on" : undefined}
                className={control}
              >
                <Hand className="size-4" />
              </button>
            ) : null}
            {/* How far your voice carries. Only meaningful while the rule
                is on, so it is hidden otherwise rather than being a control
                that does nothing. */}
            {sayRangeRule ? (
              <Select
                value={voice.sayRange}
                onChange={(next) => void voice.setSayRange(next)}
                label={t("voice.range")}
                size="sm"
                align="end"
                className="w-28"
                options={[
                  { value: "whisper", label: t("voice.whisper") },
                  { value: "normal", label: t("voice.normal") },
                  { value: "shout", label: t("voice.shout") },
                ]}
              />
            ) : null}
            {/* Deafen. Sits next to mute because that is the pair every
                voice app puts together, but it only silences what arrives:
                your microphone keeps transmitting, which is why the icon
                and the label both say headphones rather than mic. */}
            <button
              type="button"
              onClick={voice.toggleDeafen}
              aria-label={voice.deafened ? t("voice.undeafen") : t("voice.deafen")}
              title={
                voice.deafened
                  ? t("voice.undeafen")
                  : t("voice.deafenHint")
              }
              data-tone={voice.deafened ? "off" : undefined}
              className={control}
            >
              {voice.deafened ? <HeadphoneOff className="size-4" /> : <Headphones className="size-4" />}
            </button>
            {/* In push-to-talk the same slot becomes a hold control, so
                there is never both a mute button and a talk button arguing
                about who owns the microphone. */}
            {voice.micMode === "ptt" ? (
              <button
                type="button"
                onPointerDown={(event) => {
                  event.preventDefault();
                  voice.setTalking(true);
                }}
                onPointerUp={() => voice.setTalking(false)}
                onPointerLeave={() => voice.setTalking(false)}
                onContextMenu={(event) => event.preventDefault()}
                title={t("voice.holdHint")}
                data-tone={voice.talking ? "live" : undefined}
                className={cn(control, "select-none touch-none gap-1 px-3 text-xs")}
              >
                <Radio className={cn("size-3.5", voice.talking && "animate-pulse")} />
                {voice.talking ? t("voice.talking") : t("voice.hold")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void voice.toggleMute()}
                aria-label={voice.muted ? t("voice.unmute") : t("voice.mute")}
                title={voice.muted ? t("voice.unmute") : t("voice.mute")}
                data-tone={voice.muted ? "off" : undefined}
                className={control}
              >
                {voice.muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowSettings((open) => !open)}
              aria-label={t("voice.micSettings")}
              title={t("voice.micSettings")}
              aria-expanded={showSettings}
              data-tone={showSettings ? "on" : undefined}
              className={control}
            >
              <Settings2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => void voice.leave()}
              aria-label={t("voice.leave")}
              title={t("voice.leave")}
              className={control}
            >
              <PhoneOff className="size-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={voice.status === "connecting"}
            onClick={() => void voice.join()}
            className={cn(ui.btnPrimary, "w-full sm:w-auto")}
          >
            {voice.status === "connecting" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Mic className="size-4" />
            )}
            {t("voice.join")}
          </button>
        )}
      </div>

      {/* Whose turn it is. Shown under soft enforcement too, because saying so
          is the entire point of soft: the table is told, not policed. */}
      {floorNote ? (
        <p className="reveal mt-2 flex flex-wrap items-center gap-x-1.5 text-xs text-amber-200/80">
          <ShieldBan className="size-3.5 shrink-0" />
          {floorNote}
          {voice.connected && !myVerdict.mayTransmit && myVerdict.block ? (
            <span className="text-stone-500">
              · {turnEnforcement === "strict" ? t("voice.forceMuted") : t(VOICE_BLOCK_KEYS[myVerdict.block])}
            </span>
          ) : null}
        </p>
      ) : null}

      {/* A dropped candidate pair is recovered by an ICE restart rather than
          by rejoining, so this is a passing state and not a failure. */}
      {voice.reconnecting ? (
        <p className="live-in mt-2 flex items-center gap-1.5 text-xs text-amber-300">
          <WifiOff className="size-3.5 shrink-0" />
          {t("voice.reconnecting")}
        </p>
      ) : null}

      {voice.availabilityWarning ? <p role="status" className="mt-2 text-xs text-amber-300">{voiceWarningText(voice.availabilityWarning, locale)}</p> : null}
      {voice.error ? <p role="alert" className="motion-shake mt-2 text-xs text-ember-600">{requestErrorText(locale, voice.error)}</p> : null}

      {showSettings && voice.connected ? (
        <VoiceSettings
          masterVolume={voice.masterVolume}
          deafened={voice.deafened}
          onMasterVolume={voice.setMasterVolume}
          micId={voice.micId}
          micDevices={voice.micDevices}
          onSelectMic={(deviceId) => void voice.selectMic(deviceId)}
          micMode={voice.micMode}
          onSelectMicMode={voice.selectMicMode}
        />
      ) : null}

      {/* Breakout rooms. Everyone can see the list and who is in each: a side
          room nobody can see reads as a bug rather than a secret. Only story
          authority can open one or move anybody. */}
      {channelsError ? <LoadFailed error={requestErrorText(locale, channelsError)} onRetry={() => setChannelAttempt((attempt) => attempt + 1)} /> : null}
      {channelWriteError ? <p role="alert" className="mt-2 text-xs text-ember-600">{requestErrorText(locale, channelWriteError)}</p> : null}
      {channels.length > 1 || steersStory ? (
        <VoiceRooms
          channels={channels}
          occupants={(channelId) => voice.peers.filter((peer) => peer.channelId === channelId).length}
          steersStory={steersStory}
          onAction={channelAction}
          pending={channelPending}
        />
      ) : null}

      {transcribe && voice.connected ? (
        <p className="reveal mt-2 flex items-center gap-1 text-[11px] text-amber-300/80">
          <Radio className="size-3" /> {t("voice.transcribing")}
        </p>
      ) : null}
      {voice.peers.length ? (
        <ul className="stagger mt-3 space-y-1.5">
          {voice.peers.map((peer) => (
            <VoicePeerRow
              key={peer.userId}
              peer={peer}
              isMe={peer.userId === meUserId}
              speaking={isSpeaking(peer.userId)}
              volume={voice.peerVolume(peer.userId)}
              expanded={volumeFor === peer.userId}
              channels={channels}
              // The row's flag only gates its move-to-room select, and moving
              // somebody POSTs to the channels route, which asks for story
              // authority rather than the DM seat.
              adjudicates={steersStory}
              onToggleVolume={() =>
                setVolumeFor((open) => (open === peer.userId ? null : peer.userId))
              }
              onVolume={(value) => voice.setPeerVolume(peer.userId, value)}
              onToggleMute={() => voice.togglePeerMute(peer.userId)}
              onReset={() => voice.resetPeerVolume(peer.userId)}
              onMove={(channelId) =>
                void channelAction({ action: "move", userId: peer.userId, channelId })
              }
            />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-stone-500">{t("voice.empty")}</p>
      )}
    </div>
  );
}
