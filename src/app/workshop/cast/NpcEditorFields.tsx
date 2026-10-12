"use client";

import { npcGoalLabel, npcRoleInput, npcRoleFromInput, npcRoleOptionLabel } from "@/lib/i18n/npc-editor-presentations";
import { useLocale } from "@/lib/i18n/LocaleProvider";

import { useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { ContentPick } from "@/components/ui/ContentPick";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { VoicePicker } from "@/components/VoicePicker";
import { VoicePreviewButton } from "@/components/VoicePreviewButton";
import {
  ATTITUDES,
  type GeneratableField,
  type NpcDraft,
  type RelationGraph,
} from "@/lib/npcs/forge";
import { npcRoleOptions } from "@/lib/placeholders";
import {
  GOAL_FIELDS,
  PersonalitySliders,
  RelationEditor,
  goalText,
  setGoal,
} from "@/app/campaigns/[campaignId]/NpcFields";
import { DictateField } from "@/components/DictateField";
import { appendDictation } from "@/lib/dictation";

// The four sections of the NPC form: who they are on the surface, who they
// are underneath, what they want, and how they feel about everyone else.
// Moved here unchanged from DmNpcForgePanel, which keeps the requests and
// the buttons; the panel renders these inline in the console and inside a
// sheet in the workshop.
//
// `suggest` renders the per-field Suggest button, or nothing on a server
// with no text model. The panel owns it because it owns the request.
//
// `genre` orders the role picker: the setting's own roles (a fixer, a street
// doc) come before the twelve every table gets. The picker is a datalist, so
// a role the catalog does not know can still be typed and kept.

export function NpcEditorFields({
  draft,
  onChange,
  graph,
  others,
  suggest,
  genre,
  places = [],
  factions = [],
}: {
  draft: NpcDraft;
  onChange: (draft: NpcDraft) => void;
  graph: RelationGraph;
  others: string[];
  suggest: (field: GeneratableField) => ReactNode;
  genre?: string | null;
  // The named places this world already has (the overworld's locations and
  // the geography lore), offered under the location field.
  places?: readonly string[];
  // The world's factions, for the membership picker.
  factions?: ReadonlyArray<{ id: string; name: string }>;
}) {
  const { locale, t } = useLocale();
  const roleListId = useId();
  const placeListId = useId();
  const roles = npcRoleOptions(genre);
  return (
    <>
      <section
        className="panel space-y-2 rounded-xl p-3"
        data-tour="cast-fields"
      >
        <SectionHead title={t("npcEditor.surface")} glyph="system-cast" className="mb-0" />
        <div className="flex flex-wrap items-center gap-1.5">
          <input
            value={draft.name}
            onChange={(event) => onChange({ ...draft, name: event.target.value })}
            placeholder={t("npcEditor.name")}
            className={cn(ui.input, "min-w-32 flex-1")}
          />
          <input
            list={roleListId}
            value={npcRoleInput(draft.role, roles, locale)}
            onChange={(event) => onChange({ ...draft, role: npcRoleFromInput(event.target.value, roles, locale) })}
            placeholder={t("npcEditor.role")}
            aria-label={t("npcEditor.roleLabel")}
            title={t("npcEditor.roleTip")}
            className={cn(ui.input, "w-full sm:w-40")}
          />
          <datalist id={roleListId}>
            {roles.map((role) => (
              <option key={role.id} value={npcRoleInput(role.id, roles, locale)}>
                {npcRoleOptionLabel(role, locale)}
              </option>
            ))}
          </datalist>
          <span className="w-full sm:w-60">
          <Select<NpcDraft["attitude"]>
            label={t("npcEditor.attitude")}
            value={draft.attitude}
            onChange={(attitude) => onChange({ ...draft, attitude })}
            options={ATTITUDES.map((attitude) => ({
              value: attitude,
              label:
                attitude === "hostile"
                  ? t("npcEditor.hostile")
                  : attitude === "friendly"
                    ? t("npcEditor.friendly")
                    : t("npcEditor.indifferent"),
              icon: {
                kind: "glyph" as const,
                key: attitude === "hostile" ? "attitude-hostile" : attitude === "friendly" ? "attitude-friendly" : "attitude-neutral",
              },
            }))}
          />
          </span>
        </div>

        <input
          value={draft.location}
          list={places.length ? placeListId : undefined}
          onChange={(event) => onChange({ ...draft, location: event.target.value })}
          placeholder={t("npcEditor.location")}
          aria-label={t("npcEditor.locationLabel")}
          className={ui.input}
        />
        {places.length ? (
          <datalist id={placeListId}>
            {places.map((place) => (
              <option key={place} value={place} />
            ))}
          </datalist>
        ) : null}

        <input
          value={draft.aliases.join(", ")}
          onChange={(event) =>
            onChange({
              ...draft,
              aliases: event.target.value.split(/[,，]/).map((alias) => alias.trim()).filter(Boolean),
            })
          }
          placeholder={t("npcEditor.aliases")}
          className={ui.input}
        />

        <div className="flex items-start gap-1.5">
          <DictateField
            label={t("npcEditor.traitLabel")}
            className="min-w-0 flex-1"
            onTranscript={(text) => onChange({ ...draft, trait: appendDictation(draft.trait, text) })}
          >
            <textarea
              value={draft.trait}
              onChange={(event) => onChange({ ...draft, trait: event.target.value })}
              rows={2}
              placeholder={t("npcEditor.trait")}
              className={ui.input}
            />
          </DictateField>
          {suggest("trait")}
        </div>

        {factions.length ? (
          <Select
            label={t("npcEditor.faction")}
            value={draft.factionId}
            onChange={(factionId) => onChange({ ...draft, factionId })}
            options={[
              { value: "", label: t("npcEditor.noFaction") },
              ...factions.map((faction) => ({ value: faction.id, label: faction.name, icon: { kind: "glyph" as const, key: "system-factions" } })),
            ]}
          />
        ) : null}

        {/* The stat block they fight with: start_encounter with their name
            brings them in as it, under their own name. */}
        <div className="flex flex-wrap items-center gap-1.5">
          <GameIcon icon={{ kind: "glyph", key: "system-bestiary" }} size="size-7" />
          <span className="text-xs text-stone-400">{t("npcEditor.fightsAs")}</span>
          {draft.statBlock ? (
            <span className="pop-in inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-stone-900/60 py-0.5 pl-2.5 pr-1 text-xs text-stone-200">
              {draft.statBlock.startsWith("homebrew:") ? t("npcEditor.ownStat") : draft.statBlock.replace(/-/g, " ")}
              <button
                type="button"
                aria-label={t("npcEditor.clearStat")}
                onClick={() => onChange({ ...draft, statBlock: "" })}
                className={cn(ui.iconAction, "rounded-full p-1 opacity-100 hover:text-red-300")}
              >
                <X className="size-3" />
              </button>
            </span>
          ) : null}
          <ContentPick
            kind="monsters"
            label={t("npcEditor.pickStat")}
            placeholder={draft.statBlock ? t("npcEditor.anotherStat") : t("npcEditor.statHint")}
            className="min-w-48 flex-1"
            onPick={(entry) => onChange({ ...draft, statBlock: entry.slug ?? entry.name })}
          />
        </div>

        {/* Their own read-aloud voice (docs/vtt-parity-implementation-plan.md
            8.2): a voice from the server's speech backend and a pace, previewed here, heard on every
            line attributed to them. */}
        <div className="flex flex-wrap items-center gap-1.5">
          <GameIcon icon={{ kind: "glyph", key: "tab-ambience" }} size="size-7" />
          <span className="min-w-0 flex-1 sm:max-w-72">
          <VoicePicker
            label={t("npcEditor.voice")}
            value={draft.voice?.voiceId ?? ""}
            onChange={(voiceId) =>
              onChange({
                ...draft,
                voice: voiceId ? { voiceId, speed: draft.voice?.speed ?? 1 } : null,
              })
            }
            noneLabel={t("npcEditor.narrator")}
            className="w-full"
          />
          </span>
          {draft.voice ? (
            <>
              <VoicePreviewButton voice={draft.voice.voiceId} />
              <span className="flex items-center gap-2 text-xs text-stone-400">
                {t("npcEditor.pace")}
                <span className="w-28">
                <Slider
                  label={t("npcEditor.pace")}
                  min={0.7}
                  max={1.4}
                  step={0.05}
                  value={draft.voice.speed}
                  onChange={(speed) => onChange({ ...draft, voice: { voiceId: draft.voice!.voiceId, speed } })}
                  bubble={(speed) => speed.toFixed(2)}
                />
                </span>
                <span className="w-8 text-stone-500">{draft.voice.speed.toFixed(2)}</span>
              </span>
            </>
          ) : null}
        </div>
      </section>

      <section className="panel space-y-2 rounded-xl p-3">
        <SectionHead title={t("npcEditor.identity")} glyph="tab-bonds" className="mb-0" aside={suggest("personality")} />
        <PersonalitySliders draft={draft} onChange={onChange} />
      </section>

      <section className="panel space-y-2 rounded-xl p-3">
        <SectionHead title={t("npcEditor.goals")} glyph="quest-active" className="mb-0" />
        {GOAL_FIELDS.map(([field]) => (
          <div key={field} className="flex items-center gap-1.5">
            <input
              value={goalText(draft, field)}
              onChange={(event) => onChange(setGoal(draft, field, event.target.value))}
              placeholder={npcGoalLabel(field, locale)}
              className={cn(ui.input, "min-w-0 flex-1")}
            />
            {field === "session" && draft.goals.session ? (
              <span className="shrink-0 text-[11px] text-stone-500">
                {draft.goals.session.progress}/{draft.goals.session.target}
              </span>
            ) : null}
            {suggest(field)}
          </div>
        ))}
        <p className="text-[11px] text-stone-500">
          {t("npcEditor.goalNote")}
        </p>
      </section>

      <section className="panel space-y-2 rounded-xl p-3">
        <SectionHead title={t("npcEditor.relations")} glyph="attitude-wary" className="mb-0" />
        <RelationEditor draft={draft} graph={graph} others={others} onChange={onChange} />
      </section>
    </>
  );
}
