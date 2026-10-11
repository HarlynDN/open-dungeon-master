import { createTranslator, type MessageKey } from "./translator.ts";
import type { AppLocale } from "./locales.ts";
import { uiRequestError, type UiRequestError } from "./api-errors.ts";
import { micBlockMessage, type MicBlockReason } from "../secure-context.ts";
import type { TransmitBlock, VoiceFloorMode } from "../voice/turn-logic.ts";
import type { VoiceChannelView, VoiceRosterEntry } from "../voice/types.ts";

export const VOICE_FLOOR_KEYS = {
  open: "voice.floor.open", hold: "voice.floor.hold", spotlight: "voice.floor.spotlight", initiative: "voice.floor.initiative",
} satisfies Record<VoiceFloorMode, MessageKey>;
export const VOICE_BLOCK_KEYS = {
  dm_holds_floor: "voice.block.dm_holds_floor", not_your_turn: "voice.block.not_your_turn", spotlight_elsewhere: "voice.block.spotlight_elsewhere",
} satisfies Record<Exclude<TransmitBlock, "">, MessageKey>;

// Project stock names only. Authored room names, usernames and device labels
// remain source data even if they happen to resemble an English stock label.
export function voiceChannelLabel(channel: VoiceChannelView, locale: AppLocale): string {
  return channel.id === "table" && channel.name === "The Table" ? createTranslator(locale)("voice.table") : channel.name;
}
export function microphoneLabel(label: string, index: number, locale: AppLocale): string {
  return label || createTranslator(locale)("voice.microphoneNumber", { number: index + 1 });
}
export function voiceDockTip(onCall: boolean, count: number, locale: AppLocale): string {
  const t = createTranslator(locale);
  return onCall ? t(count === 1 ? "voice.dockJoinedOne" : "voice.dockJoinedMany", { count })
    : count ? t("voice.dockOthers", { count }) : t("voice.chat");
}

export const VOICE_ERROR_KEYS = {
  "Nobody is on the call.": "voice.noCall", "Name the room.": "voice.roomNameRequired",
  "That is enough side rooms.": "voice.roomsLimit", "That room cannot be renamed.": "voice.roomRenameBlocked",
  "The table cannot be closed.": "voice.tableCloseBlocked", "They are not on the call.": "voice.peerGone",
  "No such room.": "voice.roomMissing", "You are not on the call.": "voice.notOnCall",
  "Not on the call anymore.": "voice.reaped", "The party lead has muted you at this table.": "voice.leadMuted",
  "Voice chat is switched off on this server.": "voice.serverOff",
  "Voice chat is switched off for this campaign.": "voice.campaignOff",
} satisfies Record<string, MessageKey>;
const MIC_ERROR_KEYS: Record<string, MessageKey> = {
  NotAllowedError: "voice.micDenied", SecurityError: "voice.micDenied",
  NotFoundError: "voice.micMissing", OverconstrainedError: "voice.micMissing",
  NotReadableError: "voice.micBusy", AbortError: "voice.micBusy",
};
export function voiceRequestError(error: unknown, fallback: MessageKey): UiRequestError {
  const parsed = uiRequestError(error, fallback);
  const diagnostic = parsed.data.error ?? (error instanceof Error && error.message !== parsed.fallback ? error.message : "");
  const key = VOICE_ERROR_KEYS[diagnostic as keyof typeof VOICE_ERROR_KEYS]
    ?? (error instanceof Error ? MIC_ERROR_KEYS[error.name] : undefined);
  return { data: { ...parsed.data, ...(diagnostic ? { error: diagnostic } : {}) }, fallback: key ?? parsed.fallback };
}
export function microphoneBlockError(reason: Exclude<MicBlockReason, "">): UiRequestError {
  return { data: { error: micBlockMessage(reason) }, fallback: reason === "insecure" ? "voice.micInsecure" : "voice.micUnsupported" };
}

export type VoiceAvailabilityView = {
  available: boolean;
  unavailableReason: "" | "server" | "campaign";
  mode: "mesh" | "sfu";
  peers: VoiceRosterEntry[];
  warning: string | null;
};
// An unreadable or malformed probe is a load failure, never an "off" verdict.
export function parseVoiceAvailability(data: unknown): VoiceAvailabilityView {
  if (!data || typeof data !== "object" || !("available" in data) || typeof data.available !== "boolean"
    || !("mode" in data) || (data.mode !== "mesh" && data.mode !== "sfu")
    || !("unavailableReason" in data) || !["", "server", "campaign"].includes(String(data.unavailableReason))
    || !("peers" in data) || !Array.isArray(data.peers)
    || !data.peers.every((peer) => peer && typeof peer === "object"
      && [peer.userId, peer.username, peer.channelId, peer.joinedAt].every((value) => typeof value === "string")
      && [peer.muted, peer.forceMuted, peer.producing].every((value) => typeof value === "boolean")
      && (peer.handRaisedAt === null || typeof peer.handRaisedAt === "string")
      && ["whisper", "normal", "shout"].includes(peer.sayRange))
    || (data.available ? data.unavailableReason !== "" : data.unavailableReason === "")) {
    throw new Error("Malformed voice availability response.");
  }
  return {
    available: data.available, mode: data.mode, unavailableReason: data.unavailableReason as VoiceAvailabilityView["unavailableReason"],
    peers: data.peers, warning: "warning" in data && typeof data.warning === "string" ? data.warning : null,
  };
}
export function parseVoiceChannels(data: { channels?: unknown }): VoiceChannelView[] {
  if (!Array.isArray(data.channels) || !data.channels.every((channel) => channel && typeof channel === "object"
    && typeof channel.id === "string" && typeof channel.name === "string")) throw new Error("Malformed voice rooms response.");
  return data.channels;
}
export function voiceWarningText(warning: string | null, locale: AppLocale): string {
  if (!warning) return "";
  if (locale === "en") return warning;
  const key = warning === "Voice will connect but stay silent for remote players: set an announced address or domain." ? "voice.unroutableWarning" : "voice.warning";
  return createTranslator(locale)(key);
}
