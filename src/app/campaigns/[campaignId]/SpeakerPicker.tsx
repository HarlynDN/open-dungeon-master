"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { referenceDisplayName } from "@/lib/i18n/references";
import { GameIcon } from "@/components/ui/GameIcon";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import type { CastMember } from "@/lib/dm/cast";
import type { Speaker } from "@/lib/dm/speech";

// Who the DM is speaking as (docs/vtt-parity-implementation-plan.md 8.1):
// the narrator, anyone in the cast, or a monster on the board. Sits under
// the composer's modes when the seat is narrating.

export function SpeakerPicker({
  speaker,
  onChange,
  cast,
  monsters,
}: {
  speaker: Speaker | null;
  onChange: (speaker: Speaker | null) => void;
  cast: CastMember[];
  monsters: Array<{ id: string; name: string }>;
}) {
  const { locale, t } = useLocale();
  const value = speaker ? `${speaker.kind}:${speaker.id || speaker.name}` : "narrator";
  const face = speaker?.kind === "npc" ? cast.find((member) => member.id === speaker.id)?.portraitUrl : "";
  // The same three groups the browser's select listed: the narrator alone,
  // then the cast, then whatever stands on the board.
  const options: SelectOption<string>[] = [
    { value: "narrator", label: t("composeUi.speaker.narrator"), icon: { kind: "glyph", key: "tab-story" } },
    ...cast.map((member) => ({
      value: `npc:${member.id}`,
      label: member.name,
      group: t("composeUi.speaker.cast"),
      icon: { kind: "glyph" as const, key: "system-cast" },
    })),
    ...monsters.map((monster) => ({
      value: `monster:${monster.id}`,
      label: referenceDisplayName("monster", monster.name, locale),
      group: t("composeUi.speaker.board"),
      icon: { kind: "glyph" as const, key: "system-bestiary" },
    })),
  ];
  function choose(next: string) {
    const [kind, rest] = next.split(":", 2);
    if (kind === "npc") {
      const member = cast.find((entry) => entry.id === rest);
      onChange(member ? { kind: "npc", id: member.id, name: member.name } : null);
    } else if (kind === "monster") {
      const monster = monsters.find((entry) => entry.id === rest);
      onChange(monster ? { kind: "monster", id: monster.id, name: monster.name } : null);
    } else {
      onChange(null);
    }
  }
  return (
    <div className="mb-2 flex items-center gap-1.5 text-[11px] text-stone-400">
      {face ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={face} alt="" className="size-6 rounded-full border border-amber-700/60 object-cover" />
      ) : (
        <GameIcon icon={{ kind: "glyph", key: "cue-horn" }} size="size-5" className="shrink-0" />
      )}
      {t("composeUi.speaker.as")}
      <Select
        value={value}
        onChange={choose}
        options={options}
        label={t("composeUi.speaker.as")}
        size="sm"
        className={cn("w-auto min-w-[9rem] max-w-[14rem]", speaker && "border-amber-500/70 text-amber-100")}
      />
    </div>
  );
}
