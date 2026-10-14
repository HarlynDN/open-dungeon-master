"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { Check, Loader2, Music, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAmbienceInstall } from "@/app/admin/useAmbienceInstall";
import type { AmbienceAudio } from "@/app/campaigns/[campaignId]/useAmbienceAudio";
import { HeaderGlyph } from "@/app/campaigns/[campaignId]/SessionGlyph";
import { headerButtonClass } from "@/app/campaigns/[campaignId]/headerButton";
import { Dialog } from "@/components/ui/Dialog";
import { GameIcon } from "@/components/ui/GameIcon";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Tooltip } from "@/components/ui/Tooltip";
import { cueById, cuesForLayer, type AmbienceLayer } from "@/lib/ambience/catalog";
import type { AmbienceLayerName } from "@/lib/ambience/player";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";

// The sound panel: what the table is hearing, this listener's hand on how
// loud, and, for whoever steers the story, the hand on what plays.
//
// Before this the header had one speaker button and nobody could tell what
// was playing, why it was silent, or change it without the DM console (a
// human DM) or asking the model (an AI table). Now the button opens this:
// the room and the music by name with the take that is on, a level for
// each, Next for a long fight, and the pickers. Every cue has a painting
// (public/assets/icons/glyph/cue-*), so picking is pointing, not typing.

export type SoundSteering = {
  campaignId: string;
  // The DM at a table a person runs, the party lead at an AI table.
  canSteer: boolean;
  // The engine follows the scene on its own (gameSettings.ambienceAuto).
  auto: boolean;
  isAdmin: boolean;
};


async function steer(campaignId: string, body: Record<string, unknown>): Promise<string | null> {
  try {
    const response = await fetch(`/api/campaigns/${campaignId}/ambience`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      return data.error ?? "That did not take.";
    }
    return null;
  } catch {
    return "The server could not be reached.";
  }
}

// One looping layer as the listener sees it: the painting, the cue, the
// take, and the level slider under it.
function LayerRow({ layer, ambience }: { layer: AmbienceLayerName; ambience: AmbienceAudio }) {
  const { t: syncT, locale } = useSyncLocale();
  const cueId = ambience.state[layer];
  const cue = cueId ? cueById(cueId) : null;
  const snapshot = ambience.playing[layer];
  const takes = cueId ? ambience.tracks[cueId] ?? [] : [];
  const take = snapshot.take ? takes[snapshot.take - 1] : null;
  const held = ambience.state.held.includes(layer);
  const noFile = Boolean(cue) && !takes.length;
  const level = layer === "bed" ? ambience.bedLevel : ambience.musicLevel;
  const setLevel = layer === "bed" ? ambience.setBedLevel : ambience.setMusicLevel;
  return (
    <div className="sound-layer" data-playing={snapshot.playing ? "" : undefined}>
      <div className="flex items-center gap-3">
        <span className="sound-layer-art">
          {cue ? (
            <GameIcon icon={{ kind: "glyph", key: `cue-${cue.id}` }} size="size-11" />
          ) : (
            <GameIcon icon={{ kind: "glyph", key: "tab-ambience" }} size="size-11" className="opacity-40" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className={ui.sectionEyebrow}>{syncT(layer === "bed" ? "upstreamUi.soundLayerBed" : "upstreamUi.soundLayerMusic")}</span>
            {held ? (
              <Tooltip content={syncT("upstreamUi.79f13b5b5116")}>
                <span className="sound-held">{syncT("upstreamUi.85cd61f8c3c8")}</span>
              </Tooltip>
            ) : null}
          </div>
          <div className="truncate font-display text-base text-amber-100">{cue ? upstreamOwnedText(cue.label, locale) : syncT("upstreamUi.6c61fe498281")}</div>
          <div className="sound-take truncate">
            {noFile
              ? syncT("upstreamUi.0f7667c26e82")
              : take
                ? `${take.title}${takes.length > 1 ? syncT("upstreamUi.soundTake", { take: snapshot.take, count: takes.length }) : ""}`
                : cue
                  ? upstreamOwnedText(cue.blurb, locale)
                  : syncT("upstreamUi.bfea5a135221")}
          </div>
        </div>
        {takes.length > 1 ? (
          <button type="button" onClick={() => ambience.skip(layer)} className={ui.btnSmall} aria-label={syncT(layer === "bed" ? "upstreamUi.soundNextBed" : "upstreamUi.soundNextMusic")}>
            {syncT("upstreamUi.1ff57a29d7c9")}</button>
        ) : null}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="sound-caption">{syncT("upstreamUi.1709305c9fa9")}</span>
        <Slider
          label={syncT(layer === "bed" ? "upstreamUi.soundBedLevel" : "upstreamUi.soundMusicLevel")}
          value={level}
          min={0}
          max={1}
          step={0.05}
          onChange={setLevel}
          bubble={(value) => `${Math.round(value * 100)}%`}
          disabled={!cue}
          className="flex-1"
        />
        <span className="sound-caption w-9 text-right tabular-nums">{Math.round(level * 100)}%</span>
      </div>
    </div>
  );
}

// A cue to point at. Dimmed, not hidden, when this server has no file for
// it: the catalog is the same everywhere and a missing painting would read
// as a missing feature.
function CueTile({
  glyph,
  label,
  on,
  available,
  busy,
  onPick,
}: {
  // A painting from the glyph set, or null for the one tile that is not a
  // cue: silence, which has no picture because there is nothing to hear.
  glyph: string | null;
  label: string;
  on: boolean;
  available: boolean;
  busy: boolean;
  onPick: () => void;
}) {
  const { t: syncT } = useSyncLocale();
  return (
    <Tooltip content={available ? label : syncT("upstreamUi.soundNoAudio", { label })}>
      <button
        type="button"
        onClick={onPick}
        disabled={!available || busy}
        aria-pressed={on}
        data-on={on ? "" : undefined}
        className={cn("sound-tile motion-press", !available && "sound-tile-missing")}
      >
        {glyph ? (
          <GameIcon icon={{ kind: "glyph", key: glyph }} size="size-10" />
        ) : (
          <span className="flex size-10 items-center justify-center rounded-full border border-stone-600/60 text-stone-400">
            <VolumeX className="size-5" aria-hidden="true" />
          </span>
        )}
        <span className="sound-tile-label">{label}</span>
      </button>
    </Tooltip>
  );
}

function Pickers({ ambience, steering }: { ambience: AmbienceAudio; steering: SoundSteering }) {
  const { t: syncT, locale } = useSyncLocale();
  const [tab, setTab] = useState<AmbienceLayer>("bed");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const cues = useMemo(() => cuesForLayer(tab), [tab]);
  const current = tab === "sting" ? null : ambience.state[tab];
  const held = tab !== "sting" && ambience.state.held.includes(tab);

  const send = async (body: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    const failure = await steer(steering.campaignId, body);
    if (failure) {
      setError(failure);
    }
    setBusy(false);
  };

  return (
    <section className="mt-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className={ui.sectionEyebrow}>{syncT("upstreamUi.a1d116e6a0e6")}</span>
        <SegmentedControl
          size="sm"
          label={syncT("upstreamUi.3ec9177dabb3")}
          value={tab}
          onChange={setTab}
          options={[
            { value: "bed", label: syncT("upstreamUi.911ea89c43d9") },
            { value: "music", label: syncT("upstreamUi.6eb00b4b2614") },
            { value: "sting", label: syncT("upstreamUi.6f305c4b1874") },
          ]}
        />
      </div>
      {tab !== "sting" ? (
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2">
            <Switch
              label={syncT(tab === "bed" ? "upstreamUi.soundHoldBed" : "upstreamUi.soundHoldMusic")}
              on={held}
              disabled={!current || busy}
              onChange={(on) => void send({ [tab]: current, hold: on })}
            />
            <span className="text-sm text-stone-300">{syncT("upstreamUi.8e685d5409b3")}</span>
          </span>
          <span className="text-xs text-stone-500">
            {steering.auto
              ? held
                ? syncT("upstreamUi.9bb71f8207f6")
                : syncT("upstreamUi.c5ece8d6bf9d")
              : syncT("upstreamUi.d1f104711b0d")}
          </span>
        </div>
      ) : (
        <p className="mb-2 text-xs text-stone-500">{syncT("upstreamUi.053a23a9d89c")}</p>
      )}
      <div key={tab} className="motion-tab sound-grid">
        {tab !== "sting" ? (
          <CueTile
            glyph={null}
            label={syncT("upstreamUi.6c61fe498281")}
            on={current === null}
            available
            busy={busy}
            onPick={() => void send({ [tab]: "none" })}
          />
        ) : null}
        {cues.map((cue) => (
          <CueTile
            key={cue.id}
            glyph={`cue-${cue.id}`}
            label={upstreamOwnedText(cue.label, locale)}
            on={tab !== "sting" && current === cue.id}
            available={Boolean(ambience.tracks[cue.id]?.length)}
            busy={busy}
            onPick={() => void send(tab === "sting" ? { sting: cue.id } : { [tab]: cue.id })}
          />
        ))}
      </div>
      {error ? <p className="mt-2 text-sm text-red-300">{upstreamOwnedText(error, locale)}</p> : null}
    </section>
  );
}

function LibraryNote({ ambience, steering }: { ambience: AmbienceAudio; steering: SoundSteering }) {
  const { t: syncT, locale } = useSyncLocale();
  const counts = ambience.counts;
  if (!ambience.installed) {
    return steering.isAdmin ? (
      <LibraryInstall ambience={ambience} />
    ) : (
      <p className="sound-note">{syncT("upstreamUi.363714b20050")}</p>
    );
  }
  if (!counts || !steering.canSteer) {
    return null;
  }
  return (
    <p className="sound-note">
      {syncT("upstreamUi.soundCounts", { beds: counts.bed.installed, bedTotal: counts.bed.total, music: counts.music.installed, musicTotal: counts.music.total, stings: counts.sting.installed, stingTotal: counts.sting.total })}
    </p>
  );
}

// The library missing, seen by an admin: the apps ship without it to stay
// small, so the download is offered here, where the silence is noticed,
// and the table hears the first cue the moment it lands.
function LibraryInstall({ ambience }: { ambience: AmbienceAudio }) {
  const { t: syncT, locale } = useSyncLocale();
  const { status, error, installing, percent, install } = useAmbienceInstall();
  const landed = status?.status === "ready";
  useEffect(() => {
    if (landed) {
      ambience.refresh();
    }
  }, [landed, ambience]);
  return (
    <div className="sound-note">
      <p>
        {syncT("upstreamUi.3ca20f901376")}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => install()} disabled={!status || installing} className={ui.btnSmall}>
          {installing ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {installing ? syncT("upstreamUi.soundDownloading", { percent }) : syncT("upstreamUi.92a46851201e")}
        </button>
        {landed && status.result ? (
          <span className="inline-flex items-center gap-1 text-emerald-300">
            <Check className="size-4" aria-hidden="true" />
            {syncT("upstreamUi.soundInstalled", { count: status.result.installed })}
          </span>
        ) : null}
        {status?.status === "error" ? <span className="text-red-300">{upstreamOwnedText(status.error, locale)}</span> : null}
        {error ? <span className="text-red-300">{upstreamOwnedText(error, locale)}</span> : null}
      </div>
    </div>
  );
}

export function SoundDialog({
  open,
  onOpenChange,
  ambience,
  steering,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ambience: AmbienceAudio;
  steering: SoundSteering;
}) {
  const { t: syncT, locale } = useSyncLocale();
  // Ask again when the panel opens; the page gesture listener also retries
  // during the click itself, while the browser's audio gesture is active.
  const { unlock } = ambience;
  useEffect(() => {
    if (open) {
      unlock();
    }
  }, [open, unlock]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={syncT("upstreamUi.46124e023603")} icon={<Music className="size-5 text-amber-300" />} width="w-[min(94vw,38rem)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Switch label={syncT("upstreamUi.8c477e13ad00")} on={!ambience.muted} onChange={(on) => ambience.setMuted(!on)} />
          <span className="text-sm text-stone-300">{ambience.muted ? syncT("upstreamUi.cef52cd9c332") : syncT("upstreamUi.8c477e13ad00")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="sound-caption">{syncT("upstreamUi.b10fb966d720")}</span>
          <Slider
            label={syncT("upstreamUi.30b92ce79166")}
            value={ambience.volume}
            min={0}
            max={1}
            step={0.05}
            onChange={ambience.setVolume}
            bubble={(value) => `${Math.round(value * 100)}%`}
            disabled={ambience.muted}
            className="w-32 sm:w-40"
          />
          <span className="sound-caption w-9 text-right tabular-nums">{Math.round(ambience.volume * 100)}%</span>
        </div>
      </div>
      {ambience.playing.blocked ? (
        <p className="sound-note text-amber-200">{syncT("upstreamUi.cda1a1d78ef0")}</p>
      ) : null}
      <div className="mt-4 space-y-3">
        <LayerRow layer="bed" ambience={ambience} />
        <LayerRow layer="music" ambience={ambience} />
      </div>
      <LibraryNote ambience={ambience} steering={steering} />
      {steering.canSteer ? <Pickers ambience={ambience} steering={steering} /> : null}
    </Dialog>
  );
}

// The header's sound control: the painting opens the panel; on sm+ the
// master slider sits beside it, as it always did, for the listener who
// only ever wanted it quieter.
export function SoundControl({ ambience, steering }: { ambience: AmbienceAudio; steering: SoundSteering }) {
  const { t: syncT, locale } = useSyncLocale();
  const [open, setOpen] = useState(false);
  const quiet = ambience.muted || !ambience.unlocked;
  const bed = ambience.state.bed ? cueById(ambience.state.bed)?.label : null;
  const music = ambience.state.music ? cueById(ambience.state.music)?.label : null;
  const playing = [bed ? upstreamOwnedText(bed, locale) : bed, music ? syncT("upstreamUi.soundPlayingMusic", { music: upstreamOwnedText(music, locale) }) : null].filter(Boolean).join(", ");
  const tip = !ambience.installed
    ? syncT("upstreamUi.soundNoLibrary")
    : quiet
      ? syncT("upstreamUi.soundOff")
      : playing
        ? syncT("upstreamUi.soundPlaying", { playing })
        : syncT("upstreamUi.soundIdle");
  return (
    <>
      <div className="flex items-center">
        <Tooltip content={tip} side="bottom">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={syncT("upstreamUi.46124e023603")}
            aria-haspopup="dialog"
            data-tour="header-sound"
            className={headerButtonClass(!quiet && Boolean(playing))}
          >
            <HeaderGlyph glyph="tab-ambience" off={quiet} />
          </button>
        </Tooltip>
        {ambience.unlocked && !ambience.muted ? (
          <div className="hidden sm:block">
            <Tooltip content={syncT("upstreamUi.30b92ce79166")} side="bottom">
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={ambience.volume}
                onChange={ambience.setVolume}
                label={syncT("upstreamUi.30b92ce79166")}
                bubble={(value) => `${Math.round(value * 100)}%`}
                className="session-volume"
              />
            </Tooltip>
          </div>
        ) : null}
      </div>
      <SoundDialog open={open} onOpenChange={setOpen} ambience={ambience} steering={steering} />
    </>
  );
}
