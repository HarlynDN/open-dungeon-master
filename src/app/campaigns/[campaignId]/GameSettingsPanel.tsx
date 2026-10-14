"use client";

import { gameSettingsSummary, hpMethodLabel, wealthLabel } from "@/lib/i18n/game-settings-presentations";
import { genreLabel } from "@/lib/i18n/settings";
import { requestErrorText, type ApiUiError, type UiRequestError } from "@/lib/i18n/api-errors";
import { tableInfo } from "@/lib/i18n/settings-presentations";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { STAGES, isStageEnabled } from "@/lib/dm/stages";
import {
  DELEGATIONS,
} from "@/lib/dm/delegation";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { Tooltip } from "@/components/ui/Tooltip";
import { PanelError, SettingToggle, panelField } from "./PanelKit";
import { InfoButton } from "@/components/ui/InfoDialog";
import { GENRE_PRESETS } from "@/lib/genres";
import type { WorldPackSummary } from "@/lib/worlds/types";
import { WorldPackGallery } from "@/components/WorldPackGallery";
import { useTtsVoices, voiceLabel, VoicePicker } from "@/components/VoicePicker";
import { NarrationNote } from "@/app/campaigns/[campaignId]/NarrationNote";
import { CharacterVoices } from "@/app/campaigns/[campaignId]/CharacterVoices";
import { VoicePreviewButton } from "@/components/VoicePreviewButton";
import { SafetyToneFields } from "@/components/SafetyToneFields";
import type { GameSettings } from "@/lib/schemas/game-settings";
import { LocalePicker } from "@/components/LocalePicker";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LOCALE_DEFINITIONS } from "@/lib/i18n/locales";
import {
  CAMPAIGN_LENGTHS,
  COMPANION_LABELS,
  HP_METHODS,
  STARTING_WEALTH,
  type CampaignLengthSetting,
  type DicePolicy,
  type Genre,
} from "@/lib/schemas/game-settings-options";

// Lobby game-settings section: the party lead edits live (PATCHes propagate to
// everyone over SSE); other players see a read-only summary.
export function GameSettingsPanel({
  campaignId,
  settings,
  steersStory,
}: {
  campaignId: string;
  settings: GameSettings;
  steersStory: boolean;
}) {
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState(false);
  const voices = useTtsVoices(settings.locale);
  // Every control here renders the server's settings, so a refused PATCH
  // changes nothing on screen; without this line it changes nothing silently.
  const [error, setError] = useState<UiRequestError | null>(null);
  const [packs, setPacks] = useState<WorldPackSummary[]>([]);
  // Whether any ambience audio is actually on disk. The library ships empty
  // (public/ambience is gitignored and filled by npm run fetch-ambience), so
  // a lead can switch ambience on and hear nothing with no clue why; this
  // powers the hint on the Ambience row. Defaults to true so the hint never
  // flashes on installs that are fine while the answer is in flight.
  const [ambienceInstalled, setAmbienceInstalled] = useState(true);

  // Installed world packs, so the lead can switch worlds after creation. An
  // empty list simply hides the row.
  useEffect(() => {
    let cancelled = false;
    void fetch("/api/worlds")
      .then((response) => (response.ok ? response.json() : { packs: [] }))
      .then((data) => {
        if (!cancelled) {
          setPacks(Array.isArray(data.packs) ? data.packs : []);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  // Asked lazily like the world packs above, and only when the answer could
  // matter: the hint renders for the lead with ambience switched on, so
  // nobody else pays for the request.
  useEffect(() => {
    if (!steersStory || !settings.ambienceEnabled) {
      return;
    }
    let cancelled = false;
    void fetch("/api/ambience")
      .then((response) => (response.ok ? response.json() : { tracks: {} }))
      .then((data) => {
        if (!cancelled) {
          setAmbienceInstalled(Object.keys(data.tracks ?? {}).length > 0);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [steersStory, settings.ambienceEnabled]);

  async function patch(update: Partial<GameSettings>) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as ApiUiError;
        setError({ data, fallback: "panel.saveError" });
      }
    } catch {
      setError({ data: {}, fallback: "panel.networkError" });
    } finally {
      setBusy(false);
    }
  }


  const selectedPack = packs.find((entry) => entry.id === settings.worldPack) ?? null;
  // A table running its own game keeps the rules engine, the dice, the maps
  // and the bonds. What it does not keep is a second author, so the settings
  // that exist only to steer one are hidden rather than shown switched off
  // with no explanation.
  const aiNarrates = settings.dmMode !== "human";
  // A select is as wide as its longest option, and a flex item will not
  // shrink below that on its own, so a world pack with a long name used to
  // push the whole panel sideways on a phone. Capped at the row's width and
  // ellipsised instead.
  const selectClass =
    "min-w-0 max-w-full";

  const summary = gameSettingsSummary(settings, voiceLabel(voices, settings.ttsVoice, locale, settings.locale), selectedPack?.name, locale);
  const livingInfo = tableInfo("livingWorld", locale);

  if (!steersStory) {
    return (
      <section className="panel mb-6 rounded-xl p-4">
        <SectionHead title={t("panel.title")} glyph="tab-settings" level="h2" />
        <div className="stagger flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone-300">
          <span>{t("locale.campaign")}: {LOCALE_DEFINITIONS[settings.locale].nativeName}</span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "system-region" }} size="size-5" />
            {summary.world}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-dice" }} size="size-5" />
            {summary.dice}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "cue-bell" }} size="size-5" />
            {summary.narration}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-ambience" }} size="size-5" />
            {summary.ambience}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-map" }} size="size-5" />
            {summary.maps}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "rest-level-up" }} size="size-5" />
            {summary.multiclassing}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "rest-hp" }} size="size-5" />
            {summary.hp}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "coin-gp" }} size="size-5" />
            {summary.wealth}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-friends" }} size="size-5" />
            {summary.joining}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "rest-initiative" }} size="size-5" />
            {summary.responses}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "system-storyboard" }} size="size-5" />
            {summary.worldSimulation}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-loot" }} size="size-5" />
            {summary.approvals}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "tab-bonds" }} size="size-5" />
            {summary.bonds}
          </span>
          <span className="flex items-center gap-1.5">
            <GameIcon icon={{ kind: "glyph", key: "system-party" }} size="size-5" />
            {summary.companions}
          </span>
        </div>
        {settings.ttsEnabled ? <CharacterVoices campaignId={campaignId} settings={settings} steersStory={false} /> : null}
      </section>
    );
  }

  return (
    <section className="panel mb-6 rounded-xl p-4">
      <SectionHead title={t("panel.title")} glyph="tab-settings" level="h2" />
      {error ? <PanelError className="mb-2">{requestErrorText(locale, error)}</PanelError> : null}
      <div className={cn("space-y-3 text-xs", busy && "opacity-70")}>
        <div className="space-y-1">
          <span className="pk-rowlabel">{t("locale.campaign")}</span>
          <LocalePicker campaign value={settings.locale} onChange={(locale) => void patch({ locale })} disabled={busy} />
          <p className="text-stone-500">{t("locale.campaignHint")}</p>
        </div>
        {settings.dmMode === "assisted" ? (
          // Only in the middle setting. A table the AI runs has nothing to
          // delegate and a table running itself has chosen not to, so showing
          // three switched-off switches in either would be noise.
          <div className="flex flex-wrap items-center gap-2">
            <span className="pk-rowlabel">{t("panel.aiHelps")}</span>
            {DELEGATIONS.map((which) => (
              <Tooltip key={which} content={t(`delegation.${which}.hint`)}>
                <SettingToggle on={settings.dmAssist[which]} onToggle={() =>
                    patch({
                      dmAssist: { ...settings.dmAssist, [which]: !settings.dmAssist[which] },
                    })}>
                  {t(`delegation.${which}.label`)}
                </SettingToggle>
              </Tooltip>
            ))}
          </div>
        ) : null}
        {packs.length ? (
          <div className="reveal flex flex-wrap items-center gap-2">
            <span className="pk-rowlabel">{t("panel.world")}</span>
            <Select
              size="sm"
              label={t("panel.worldPack")}
              value={settings.worldPack}
              placeholder={t("panel.noPack")}
              onChange={(value) => {
                const next = packs.find((entry) => entry.id === value);
                // Genre moves with the pack, so a campaign never ends up in a
                // world whose base genre contradicts it.
                patch(next ? { worldPack: next.id, genre: next.baseGenre } : { worldPack: "" });
              }}
              options={[{ value: "", label: t("panel.noPack") }, ...packs.map((entry) => ({ value: entry.id, label: entry.name, hint: entry.inspiredBy }))]}
              className={selectClass}
            />
            <span className="text-stone-500">
              {selectedPack
                ? selectedPack.inspiredBy
                : t("panel.packHint")}
            </span>
          </div>
        ) : null}
        {selectedPack?.cover ? (
          <div className="reveal flex flex-wrap items-center gap-2">
            <span className="pk-rowlabel" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPack.cover}
              alt=""
              className="h-20 w-36 rounded-md border border-amber-500/30 object-cover shadow-[0_2px_8px_rgba(4,2,12,0.5)]"
            />
          </div>
        ) : null}
        {selectedPack ? <WorldPackGallery packId={selectedPack.id} /> : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.setting")}</span>
          <Select<Genre>
            size="sm"
            label={t("panel.setting")}
            value={settings.genre}
            onChange={(genre) =>
              // Changing the genre by hand drops the pack, for the same reason
              // the creation dialog does: a pack IS its baseGenre plus
              // overrides, so the two must never disagree.
              patch({ genre, ...(settings.worldPack ? { worldPack: "" } : {}) })
            }
            options={GENRE_PRESETS.map((entry) => ({ value: entry.id as Genre, label: genreLabel(entry.id as Genre, locale) }))}
            className={selectClass}
          />
          <span className="text-stone-500">{t(`world.${settings.genre}.blurb`)}</span>
        </div>
        {settings.genre === "custom" ? (
          <div className="reveal flex items-start gap-2">
            <span className="pk-rowlabel pt-1">{t("panel.world")}</span>
            <textarea
              defaultValue={settings.customGenreText}
              rows={2}
              maxLength={500}
              onBlur={(event) => patch({ customGenreText: event.target.value })}
              placeholder={t("panel.customWorld")}
              aria-label={t("panel.customWorldLabel")}
              className={cn(panelField, "w-auto flex-1")}
            />
          </div>
        ) : null}
        {aiNarrates ? (
        <div className="reveal flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.length")}</span>
          <Tooltip content={t("panel.lengthTip")}>
            <span className="inline-flex min-w-0 max-w-full">
              <Select<CampaignLengthSetting>
                size="sm"
                label={t("panel.campaignLength")}
                value={settings.campaignLength}
                onChange={(campaignLength) => patch({ campaignLength })}
                options={CAMPAIGN_LENGTHS.map((value) => ({ value, label: t(`setting.campaignLength.${value}`) }))}
                className={selectClass}
              />
            </span>
          </Tooltip>
        </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.dice")}</span>
          <Tooltip content={t("panel.diceTip")}>
            <span className="inline-flex min-w-0 max-w-full">
              <Select<DicePolicy>
                size="sm"
                label={t("panel.dicePolicy")}
                value={settings.dicePolicy}
                onChange={(dicePolicy) => patch({ dicePolicy })}
                options={[
                  { value: "digital_only", label: t("panel.digitalOnly"), icon: { kind: "glyph", key: "tab-dice" } },
                  { value: "real_allowed", label: t("panel.realAllowed"), icon: { kind: "glyph", key: "die-d20" } },
                ]}
                className={selectClass}
              />
            </span>
          </Tooltip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.narration")}</span>
          <SettingToggle label={t("panel.narration")} on={settings.ttsEnabled} onToggle={() => patch({ ttsEnabled: !settings.ttsEnabled })}>
            {settings.ttsEnabled ? t("panel.on") : t("panel.off")}
          </SettingToggle>
          {settings.ttsEnabled ? (
            <>
              <VoicePicker
                speechLocale={settings.locale}
                size="sm"
                label={t("panel.narrationVoice")}
                value={settings.ttsVoice}
                onChange={(ttsVoice) => patch({ ttsVoice })}
              />
              <VoicePreviewButton voice={settings.ttsVoice} speechLocale={settings.locale} />
            </>
          ) : null}
        </div>
        {settings.ttsEnabled ? (
          <CharacterVoices campaignId={campaignId} settings={settings} steersStory patch={patch} />
        ) : null}
        {settings.ttsEnabled ? <NarrationNote /> : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.faces")}</span>
          <Tooltip content={t("panel.theatreTip")}>
            <SettingToggle on={settings.presentation === "theatre"} onToggle={() => patch({ presentation: settings.presentation === "theatre" ? "plain" : "theatre" })}>
              {settings.presentation === "theatre" ? t("panel.theatreOn") : t("panel.theatreOff")}
            </SettingToggle>
          </Tooltip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.ambience")}</span>
          <SettingToggle label={t("panel.ambience")} on={settings.ambienceEnabled} onToggle={() => patch({ ambienceEnabled: !settings.ambienceEnabled })}>
            {settings.ambienceEnabled ? t("panel.on") : t("panel.off")}
          </SettingToggle>
          {settings.ambienceEnabled ? (
            <Tooltip content={t("panel.ambienceTip")}>
              <SettingToggle on={settings.ambienceAuto} onToggle={() => patch({ ambienceAuto: !settings.ambienceAuto })}>
                {settings.ambienceAuto ? t("panel.followsScene") : t("panel.dmSets")}
              </SettingToggle>
            </Tooltip>
          ) : null}
          <Tooltip content={t("panel.drawingTip")}>
            <SettingToggle on={settings.boardDrawing} onToggle={() => patch({ boardDrawing: !settings.boardDrawing })}>
              {settings.boardDrawing ? t("panel.playerDraw") : t("panel.dmDraw")}
            </SettingToggle>
          </Tooltip>
          <Tooltip content={t("panel.enemyTip")}>
            <SettingToggle on={settings.enemyIntent} onToggle={() => patch({ enemyIntent: !settings.enemyIntent })}>
              {t(settings.enemyIntent ? "panel.enemyOn" : "panel.enemyOff")}
            </SettingToggle>
          </Tooltip>
          {settings.ambienceEnabled && !ambienceInstalled ? (
            // The catalog knows the cues but no audio is on disk, so the
            // toggle above is currently a promise of silence. Say so where
            // it is being switched on rather than letting the table wonder.
            <span className="text-stone-500">
              {t("panel.ambienceMissing")}</span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.extras")}</span>
          {aiNarrates ? (
            <SettingToggle on={settings.aiStorySetup} onToggle={() => patch({ aiStorySetup: !settings.aiStorySetup })}>
              {t(settings.aiStorySetup ? "panel.aiSetupOn" : "panel.aiSetupOff")}
            </SettingToggle>
          ) : null}
          <SettingToggle on={settings.mapsEnabled} onToggle={() => patch({ mapsEnabled: !settings.mapsEnabled })}>
            {t(settings.mapsEnabled ? "panel.mapsOn" : "panel.mapsOff")}
          </SettingToggle>
          <Tooltip content={t("panel.multiclassTip")}>
            <SettingToggle on={settings.multiclassingEnabled} onToggle={() => patch({ multiclassingEnabled: !settings.multiclassingEnabled })}>
              {t(settings.multiclassingEnabled ? "panel.multiOn" : "panel.multiOff")}
            </SettingToggle>
          </Tooltip>
          <Tooltip content={t("panel.joinTip")}>
            <SettingToggle on={settings.midGameJoinOpen} onToggle={() => patch({ midGameJoinOpen: !settings.midGameJoinOpen })}>
              {t(settings.midGameJoinOpen ? "panel.joinOpen" : "panel.joinClosed")}
            </SettingToggle>
          </Tooltip>
          <Tooltip content={t("panel.heldTip")}>
            <SettingToggle on={settings.holdSubmissions} onToggle={() => patch({ holdSubmissions: !settings.holdSubmissions })}>
              {t(settings.holdSubmissions ? "panel.heldOn" : "panel.heldOff")}
            </SettingToggle>
          </Tooltip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.heroes")}</span>
          <Tooltip content={t("panel.hpTip")}>
            <span className="inline-flex min-w-0 max-w-full">
              <Select
                size="sm"
                label={t("panel.hp")}
                value={settings.hpMethod ?? "average"}
                onChange={(value) => patch({ hpMethod: value as GameSettings["hpMethod"] })}
                options={HP_METHODS.map((method) => ({ value: method, label: hpMethodLabel(method, locale) }))}
                className={selectClass}
              />
            </span>
          </Tooltip>
          <Tooltip content={t("panel.wealthTip")}>
            <span className="inline-flex min-w-0 max-w-full">
              <Select
                size="sm"
                label={t("panel.wealth")}
                value={settings.startingWealth ?? "equipment"}
                onChange={(value) => patch({ startingWealth: value as GameSettings["startingWealth"] })}
                options={STARTING_WEALTH.map((method) => ({ value: method, label: wealthLabel(method, locale) }))}
                className={selectClass}
              />
            </span>
          </Tooltip>
        </div>
        {settings.dmMode !== "ai" ? (
          // Only the DM seat is ever nudged, so this row does not exist for a
          // table the AI narrates: there, the story is typed by definition.
          <div className="flex flex-wrap items-center gap-2">
            <span className="pk-rowlabel">{t("panel.remind")}</span>
            <Tooltip content={t("panel.reminderTip")}>
              <span className="inline-flex min-w-0 max-w-full">
                <Select
                  size="sm"
                  label={t("panel.actionReminder")}
                  value={String(settings.beatReminder.messages)}
                  onChange={(value) => patch({ beatReminder: { ...settings.beatReminder, messages: Number(value) } })}
                  options={[0, 5, 10, 20, 40].map((count) => ({ value: String(count), label: count === 0 ? t("panel.noActionReminder") : t("panel.afterActions", { count }) }))}
                  className={selectClass}
                />
              </span>
            </Tooltip>
            <span className="inline-flex min-w-0 max-w-full" title={t("panel.rollReminderTip")}>
              <Select
                size="sm"
                label={t("panel.rollReminder")}
                value={String(settings.beatReminder.rolls)}
                onChange={(value) => patch({ beatReminder: { ...settings.beatReminder, rolls: Number(value) } })}
                options={[0, 6, 12, 24, 48].map((count) => ({ value: String(count), label: count === 0 ? t("panel.noRollReminder") : t("panel.afterRolls", { count }) }))}
                className={selectClass}
              />
            </span>
          </div>
        ) : null}
        {aiNarrates ? (
        <div className="reveal flex flex-wrap items-start gap-2">
          <span className="pk-rowlabel pt-1">{t("panel.stages")}</span>
          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
            {STAGES.map((stage) => {
              const on = isStageEnabled(settings.stages, stage.id);
              return (
                <Tooltip
                  key={stage.id}
                  content={`${t(`stage.${stage.id}.description`)} ${t(`stage.${stage.id}.cost`)}`}
                >
                  <SettingToggle on={on} onToggle={() =>
                      patch({ stages: { ...settings.stages, [stage.id]: !on } })}>
                    {t(on ? "panel.stageOn" : "panel.stageOff", { name: t(`stage.${stage.id}.label`) })}
                    {/* Only a model-call stage buys back GPU time; saying so
                        stops an operator disabling recall expecting a speedup. */}
                    <span className="ml-1 text-[11px] text-stone-500">
                      {stage.callsModel ? t("panel.model") : t("panel.engine")}
                    </span>
                  </SettingToggle>
                </Tooltip>
              );
            })}
          </div>
        </div>
        ) : null}
        {aiNarrates ? (
        <div className="reveal flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.world")}</span>
          <Tooltip content={t("panel.livingTip")}>
            <SettingToggle on={settings.worldSimulation} onToggle={() => patch({ worldSimulation: !settings.worldSimulation })}>
              {t(settings.worldSimulation ? "panel.livingOn" : "panel.livingOff")}
            </SettingToggle>
          </Tooltip>
          <InfoButton label={livingInfo.label} ariaLabel={livingInfo.label} text={livingInfo.text} />
          <span className="text-stone-500">
            {settings.worldSimulation
              ? t("panel.livingHintOn")
              : t("panel.livingHintOff")}
          </span>
        </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.items")}</span>
          <Tooltip content={t("panel.itemsTip")}>
            <SettingToggle on={settings.inventoryApprovals} onToggle={() => patch({ inventoryApprovals: !settings.inventoryApprovals })}>
              {t(settings.inventoryApprovals ? "panel.itemOn" : "panel.itemOff")}
            </SettingToggle>
          </Tooltip>
          <span className="text-stone-500">
            {settings.inventoryApprovals
              ? t("panel.itemsHintOn")
              : t("panel.itemsHintOff")}
          </span>
        </div>
        <div className="pk-row">
          <span className="pk-rowlabel">{t("panel.vitals")}</span>
          <Tooltip content={t("panel.vitalsTip")}>
            <SettingToggle on={settings.vitalsApprovals} onToggle={() => patch({ vitalsApprovals: !settings.vitalsApprovals })}>
              {t(settings.vitalsApprovals ? "panel.vitalsOn" : "panel.vitalsOff")}
            </SettingToggle>
          </Tooltip>
          <span className="text-stone-500">
            {settings.vitalsApprovals
              ? t("panel.vitalsHintOn")
              : t("panel.vitalsHintOff")}
          </span>
        </div>
        <div className="rounded-lg border border-amber-500/15 bg-stone-950/40 p-2.5">
          <SafetyToneFields
            speechLocale={settings.locale}
            safety={settings.safety}
            gm={settings.gm}
            ttsVoice={settings.ttsVoice}
            onSafety={(safety) => patch({ safety })}
            onGm={(gm) => patch({ gm })}
            onVoice={(ttsVoice) => patch({ ttsVoice })}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.prose")}</span>
          <Tooltip content={t("panel.proseTip")}>
            {aiNarrates ? (
              <SettingToggle on={settings.narrationGuard} onToggle={() => patch({ narrationGuard: !settings.narrationGuard })}>
                {t(settings.narrationGuard ? "panel.outcomeOn" : "panel.outcomeOff")}
              </SettingToggle>
            ) : null}
          </Tooltip>
          <span className="text-stone-500">
            {settings.narrationGuard
              ? t("panel.proseHintOn")
              : t("panel.proseHintOff")}
          </span>
        </div>
        {/* Live voice chat. The rules below are a list rather than a single
            proximity checkbox on purpose: "players only hear people within 30
            feet" is one table's house rule, and the next table will want a
            different one. They are all inputs to one function
            (src/lib/voice/audibility.ts). */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.voice")}</span>
          <Tooltip content={t("panel.voiceTip")}>
            <SettingToggle on={settings.voice.enabled} onToggle={() =>
                patch({ voice: { ...settings.voice, enabled: !settings.voice.enabled } })}>
              {t(settings.voice.enabled ? "panel.voiceOn" : "panel.voiceOff")}
            </SettingToggle>
          </Tooltip>
          {settings.voice.enabled ? (
            <>
              <Tooltip content={t("panel.turnTip")}>
                <span className="inline-flex min-w-0 max-w-full">
                  <Select<"off" | "soft" | "strict">
                    size="sm"
                    label={t("panel.turnFloor")}
                    value={settings.voice.turnEnforcement}
                    onChange={(turnEnforcement) => patch({ voice: { ...settings.voice, turnEnforcement } })}
                    options={[
                      { value: "off", label: t("panel.turnOff") },
                      { value: "soft", label: t("panel.turnSoft") },
                      { value: "strict", label: t("panel.turnStrict") },
                    ]}
                    className={selectClass}
                  />
                </span>
              </Tooltip>
              <Tooltip content={t("panel.transcriptionTip")}>
                <SettingToggle on={settings.voice.transcribe} onToggle={() => patch({ voice: { ...settings.voice, transcribe: !settings.voice.transcribe } })}>
                  {t(settings.voice.transcribe ? "panel.transcribeOn" : "panel.transcribeOff")}
                </SettingToggle>
              </Tooltip>
              <Tooltip content={t("panel.proximityTip")}>
                <SettingToggle on={settings.voice.rules.proximity} onToggle={() =>
                    patch({
                      voice: {
                        ...settings.voice,
                        rules: { ...settings.voice.rules, proximity: !settings.voice.rules.proximity },
                      },
                    })}>
                  {t(settings.voice.rules.proximity ? "panel.proximityOn" : "panel.proximityOff")}
                </SettingToggle>
              </Tooltip>
              {settings.voice.rules.proximity ? (
                <>
                  <span className="inline-flex min-w-0 max-w-full" title={t("panel.hearingRange")}>
                    <Select
                      size="sm"
                      label={t("panel.hearingRange")}
                      value={String(settings.voice.rules.hearingRangeFeet)}
                      onChange={(value) =>
                        patch({ voice: { ...settings.voice, rules: { ...settings.voice.rules, hearingRangeFeet: Number(value) } } })
                      }
                      options={[15, 30, 60, 120].map((feet) => ({ value: String(feet), label: t("table.feet", { feet }) }))}
                      className={selectClass}
                    />
                  </span>
                  <Tooltip content={t("panel.sayRangeTip")}>
                    <SettingToggle on={settings.voice.rules.sayRange} onToggle={() =>
                        patch({
                          voice: {
                            ...settings.voice,
                            rules: { ...settings.voice.rules, sayRange: !settings.voice.rules.sayRange },
                          },
                        })}>
                      {t(settings.voice.rules.sayRange ? "panel.sayOn" : "panel.sayOff")}
                    </SettingToggle>
                  </Tooltip>
                  <Tooltip content={t("panel.wallsTip")}>
                    <SettingToggle on={settings.voice.rules.wallsAttenuate} onToggle={() =>
                        patch({
                          voice: {
                            ...settings.voice,
                            rules: {
                              ...settings.voice.rules,
                              wallsAttenuate: !settings.voice.rules.wallsAttenuate,
                            },
                          },
                        })}>
                      {t(settings.voice.rules.wallsAttenuate ? "panel.wallsOn" : "panel.wallsOff")}
                    </SettingToggle>
                  </Tooltip>
                </>
              ) : null}
              <Tooltip content={t("panel.downedTip")}>
                <SettingToggle on={settings.voice.rules.downedGoDeaf} onToggle={() =>
                    patch({
                      voice: {
                        ...settings.voice,
                        rules: {
                          ...settings.voice.rules,
                          downedGoDeaf: !settings.voice.rules.downedGoDeaf,
                        },
                      },
                    })}>
                  {t(settings.voice.rules.downedGoDeaf ? "panel.downedOn" : "panel.downedOff")}
                </SettingToggle>
              </Tooltip>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.bonds")}</span>
          <Tooltip content={t("panel.bondsTip")}>
            <SettingToggle on={settings.relationships !== "off"} onToggle={() =>
                patch({ relationships: settings.relationships === "off" ? "on" : "off" })}>
              {t(settings.relationships !== "off" ? "panel.bondsOn" : "panel.bondsOff")}
            </SettingToggle>
          </Tooltip>
          {settings.relationships !== "off" ? (
            <Tooltip content={t("panel.romanceTip")}>
              <SettingToggle on={settings.romance !== "off"} onToggle={() => patch({ romance: settings.romance === "off" ? "on" : "off" })}>
                {t(settings.romance !== "off" ? "panel.romanceOn" : "panel.romanceOff")}
              </SettingToggle>
            </Tooltip>
          ) : null}
          <span className="text-stone-500">
            {settings.relationships === "off"
              ? t("panel.bondsHintOff")
              : settings.romance !== "off"
                ? t("panel.romanceHintOn")
                : t("panel.romanceHintOff")}
          </span>
        </div>
        {aiNarrates ? (
        <div className="reveal flex flex-wrap items-center gap-2">
          <span className="pk-rowlabel">{t("panel.allies")}</span>
          <Tooltip content={t("panel.companionsTip")}>
            <span className="inline-flex min-w-0 max-w-full">
              <Select<GameSettings["companions"]>
                size="sm"
                label={t("panel.companions")}
                value={settings.companions}
                onChange={(companions) => patch({ companions })}
                options={(Object.keys(COMPANION_LABELS) as Array<GameSettings["companions"]>).map((mode) => ({ value: mode, label: t(`setting.companions.${mode}`) }))}
                className={selectClass}
              />
            </span>
          </Tooltip>
          {settings.companions !== "off" ? (
            <>
              {settings.companions !== "guests" ? (
                <span className="inline-flex min-w-0 max-w-full" title={t("panel.maxPartyLabel")}>
                  <Select
                    size="sm"
                    label={t("panel.maxPartyLabel")}
                    value={String(settings.maxCompanions)}
                    onChange={(value) => patch({ maxCompanions: Number(value) })}
                    options={[1, 2, 3, 4].map((count) => ({ value: String(count), label: t("panel.maxParty", { count }) }))}
                    className={selectClass}
                  />
                </span>
              ) : null}
              <span className="inline-flex min-w-0 max-w-full" title={t("panel.maxGuestsLabel")}>
                <Select
                  size="sm"
                  label={t("panel.maxGuestsLabel")}
                  value={String(settings.maxGuests)}
                  onChange={(value) => patch({ maxGuests: Number(value) })}
                  options={[1, 2, 3, 4].map((count) => ({ value: String(count), label: t(count === 1 ? "panel.maxGuest" : "panel.maxGuests", { count }) }))}
                  className={selectClass}
                />
              </span>
            </>
          ) : null}
        </div>
        ) : null}
      </div>
    </section>
  );
}
