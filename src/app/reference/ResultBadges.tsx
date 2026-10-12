"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { referenceBadgeText } from "@/lib/i18n/reference-ui-presentations";
import { GameIcon } from "@/components/ui/GameIcon";

// What a reference result is, at a glance: its kind, its level or rarity or
// challenge, and where it came from, as chips. A chip wears a painted family
// icon where one exists (a spell's school, an item's kind); GameIcon draws
// nothing when the painting is missing, so a chip never shows a broken image.

export type BadgeRow = {
  source: string;
  documentSlug?: string;
  data: Record<string, unknown>;
  level?: number;
  school?: string;
  ritual?: boolean;
  concentration?: boolean;
  kind?: string;
  rarity?: string;
  cost?: string;
};

type Tone = "neutral" | "gold" | "green" | "blue" | "violet" | "orange" | "red";

type Badge = { key: string; text: string; tone: Tone; family?: string };

// Native badge output is retained for callers/tests; only ResultBadges
// applies viewer-localized display through referenceBadgeText.
const RAW_BADGE_LABELS = { cantrip: "cantrip", level: "level", ritual: "ritual", concentration: "concentration", challenge: "CR", homebrew: "homebrew" } as const;

const ITEM_KIND_LABEL: Record<string, string> = {
  weapon: "Weapon",
  armor: "Armor",
  gear: "Gear",
  magic_item: "Magic item",
};

function rarityTone(rarity: string): Tone {
  const value = rarity.toLowerCase();
  if (value.includes("artifact")) return "red";
  if (value.includes("legendary")) return "orange";
  if (value.includes("very rare")) return "violet";
  if (value.includes("rare")) return "blue";
  if (value.includes("uncommon")) return "green";
  return "neutral";
}

function text(value: unknown): string {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

export function badgesFor(category: string, row: BadgeRow): Badge[] {
  const badges: Badge[] = [];
  if (category === "spells") {
    if (typeof row.level === "number") {
      badges.push({ key: "level", text: row.level === 0 ? RAW_BADGE_LABELS.cantrip : `${RAW_BADGE_LABELS.level} ${row.level}`, tone: "gold" });
    }
    const school = text(row.school);
    if (school) {
      badges.push({ key: "school", text: school.toLowerCase(), tone: "violet", family: `spell-${school}` });
    }
    if (row.ritual) badges.push({ key: "ritual", text: RAW_BADGE_LABELS.ritual, tone: "neutral" });
    if (row.concentration) badges.push({ key: "conc", text: RAW_BADGE_LABELS.concentration, tone: "neutral" });
  } else if (category === "items") {
    const kind = text(row.kind);
    if (kind) {
      badges.push({ key: "kind", text: ITEM_KIND_LABEL[kind] ?? kind, tone: "neutral", family: `item-${kind}` });
    }
    const rarity = text(row.rarity);
    if (rarity) badges.push({ key: "rarity", text: rarity.toLowerCase(), tone: rarityTone(rarity) });
    const cost = text(row.cost);
    if (cost) badges.push({ key: "cost", text: cost, tone: "gold" });
  } else if (category === "monsters") {
    const cr = text(row.data.challenge_rating ?? row.data.cr);
    if (cr) badges.push({ key: "cr", text: `${RAW_BADGE_LABELS.challenge} ${cr}`, tone: "red" });
    const type = text(row.data.type);
    if (type) badges.push({ key: "type", text: type.toLowerCase(), tone: "neutral" });
  }
  if (row.source === "homebrew") {
    badges.push({ key: "source", text: RAW_BADGE_LABELS.homebrew, tone: "gold" });
  } else if (row.documentSlug) {
    badges.push({ key: "source", text: row.documentSlug, tone: "neutral" });
  }
  return badges;
}

export function ResultBadges({ category, row }: { category: string; row: BadgeRow }) {
  const { locale } = useLocale();
  const badges = badgesFor(category, row);
  if (!badges.length) {
    return null;
  }
  return (
    <span className="flex shrink-0 flex-wrap items-center justify-end gap-1">
      {badges.map((badge) => (
        <span key={badge.key} className="ref-badge" data-tone={badge.tone}>
          {badge.family ? <GameIcon icon={{ kind: "family", key: badge.family }} size="size-4" /> : null}
          {referenceBadgeText(category, row, badge, locale)}
        </span>
      ))}
    </span>
  );
}
