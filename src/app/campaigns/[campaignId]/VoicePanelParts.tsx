"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { DoorOpen } from "lucide-react";
import { useState } from "react";
import { microphoneLabel, voiceChannelLabel } from "@/lib/i18n/voice-presentations";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { MASTER_VOLUME_MAX, VOLUME_STEP } from "@/lib/voice/volume";
import type { VoiceChannelView } from "@/lib/voice/types";

// The two folding blocks of the voice menu, lifted out of VoicePanel.tsx so
// that file stays about the call itself.

type MicMode = "open" | "ptt";

// Everyone at once, the microphone and its mode. Lives in here rather than in
// the header because the dock is 320px wide and the header has no room, and
// because this block already says these settings are per browser. Per-player
// sliders are on each row of the roster.
export function VoiceSettings({
  masterVolume,
  deafened,
  onMasterVolume,
  micId,
  micDevices,
  onSelectMic,
  micMode,
  onSelectMicMode,
}: {
  masterVolume: number;
  deafened: boolean;
  onMasterVolume: (value: number) => void;
  micId: string;
  micDevices: Array<{ deviceId: string; label: string }>;
  onSelectMic: (deviceId: string) => void;
  micMode: MicMode;
  onSelectMicMode: (mode: MicMode) => void;
}) {
  const { locale, t } = useLocale();
  return (
    <div className="reveal panel mt-2 space-y-2.5 rounded-lg p-2.5">
      <div>
        <span className="session-field-label">{t("voice.everyoneVolume")}</span>
        <Slider
          min={0}
          max={MASTER_VOLUME_MAX}
          step={VOLUME_STEP}
          value={masterVolume}
          disabled={deafened}
          onChange={onMasterVolume}
          label={t("voice.callVolume")}
          bubble={(value) => `${Math.round(value * 100)}%`}
          className="w-full"
        />
      </div>
      <div>
        <span className="session-field-label">{t("voice.microphone")}</span>
        <Select
          value={micId}
          onChange={onSelectMic}
          label={t("voice.microphone")}
          size="sm"
          className="w-full"
          options={[
            { value: "", label: t("voice.systemDefault") },
            ...micDevices.map((device, index) => ({ value: device.deviceId, label: microphoneLabel(device.label, index, locale) })),
          ]}
        />
      </div>
      <div>
        <span className="session-field-label">
          {t(micMode === "ptt" ? "voice.modeHold" : "voice.mode")}
        </span>
        <Select<MicMode>
          value={micMode}
          onChange={onSelectMicMode}
          label={t("voice.micMode")}
          size="sm"
          className="w-full"
          options={[
            { value: "open", label: t("voice.openMic") },
            { value: "ptt", label: t("voice.pushToTalk") },
          ]}
        />
      </div>
      <p className="text-[11px] text-stone-500">{t("voice.savedBrowser")}</p>
    </div>
  );
}

export function VoiceRooms({
  channels,
  occupants,
  steersStory,
  onAction,
  pending = false,
}: {
  channels: VoiceChannelView[];
  occupants: (channelId: string) => number;
  steersStory: boolean;
  onAction: (body: Record<string, unknown>) => Promise<boolean>;
  pending?: boolean;
}) {
  const { locale, t } = useLocale();
  const [newRoom, setNewRoom] = useState("");
  return (
    <div className="reveal mt-3">
      <SectionHead title={t("voice.rooms")} glyph="tab-campaigns" level="h4" className="mb-1.5" />
      <div className="space-y-1">
        {channels.map((channel) => (
          <div key={channel.id} className="flex min-h-8 items-center gap-2 text-xs">
            <GameIcon icon={{ kind: "glyph", key: channel.id === "table" ? "tab-session" : "system-party" }} size="size-6" />
            <span className="truncate text-stone-300">{voiceChannelLabel(channel, locale)}</span>
            <span key={occupants(channel.id)} className="count-pop text-stone-500">
              {occupants(channel.id)}
            </span>
            {steersStory && channel.id !== "table" ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => void onAction({ action: "close", channelId: channel.id })}
                aria-label={t("voice.closeRoom", { name: voiceChannelLabel(channel, locale) })}
                title={t("voice.closeRoomHint")}
                className={cn(ui.btnSmall, "session-voice-mini ml-auto hover:border-red-500/50 hover:text-red-300")}
              >
                <DoorOpen className="size-3.5" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {steersStory ? (
        <div className="reveal flex gap-1.5 pt-1.5">
          <input
            value={newRoom}
            maxLength={40}
            onChange={(event) => setNewRoom(event.target.value)}
            placeholder={t("voice.newRoom")}
            aria-label={t("voice.newRoom")}
            className={cn(ui.input, "min-w-0 flex-1 py-1.5 text-xs")}
          />
          <button
            type="button"
            disabled={pending || !newRoom.trim()}
            onClick={async () => {
              const draft = newRoom;
              if (await onAction({ action: "open", name: draft.trim() })) setNewRoom((current) => current === draft ? "" : current);
            }}
            className={cn(ui.btnSmall, "text-xs")}
          >
            {t("voice.openRoom")}
          </button>
          {channels.length > 1 ? (
            <button
              type="button"
              disabled={pending}
              onClick={() => void onAction({ action: "recall" })}
              title={t("voice.recallHint")}
              className={cn(ui.btnSmall, "text-xs")}
            >
              {t("voice.recall")}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
