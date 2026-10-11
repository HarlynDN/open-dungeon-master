import type { CampaignSummary, HomeGlance } from "@/lib/campaign-types";
import { createTranslator } from "@/lib/i18n/translator";
import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/locales";

// What GET /api/campaigns hands the home screen: the summary row plus the
// name of the character this user plays there, or null when they have no
// sheet yet (a fresh lobby) or hold the DM seat instead, and the title
// screen's glance at the table (last narration, chapter, scene, faces).
// Local to the home screen because no other page lists campaigns with a
// "playing as".
export type HomeCampaign = CampaignSummary & { playingAs: string | null; glance?: HomeGlance };

// Copying prep out of a campaign follows story authority, exactly as
// /api/campaigns/[id]/clone demands: the seated DM if there is one, the party
// lead otherwise. Mirrored here only to decide whether to draw the button;
// the server decides whether it works.
export function steersStory(campaign: CampaignSummary, userId: string): boolean {
  return campaign.dmUserId
    ? campaign.dmUserId === userId || campaign.assistantDmUserId === userId
    : campaign.leadUserId === userId;
}

// Whether this user narrates the table rather than playing at it, which is
// why the hero has no "playing as" for them.
export function holdsDmSeat(campaign: CampaignSummary, userId: string): boolean {
  return campaign.dmUserId === userId || campaign.assistantDmUserId === userId;
}

// The table to put on the title screen: the most recently touched campaign
// that is still going. When every table has ended, the newest of those, so
// an account with only finished tales still opens on a painting rather than
// an empty stage; the title block says it is finished.
export function pickContinue(campaigns: HomeCampaign[]): HomeCampaign | null {
  let best: HomeCampaign | null = null;
  let lastEnded: HomeCampaign | null = null;
  for (const campaign of campaigns) {
    if (campaign.status === "ended") {
      if (!lastEnded || campaign.updatedAt > lastEnded.updatedAt) {
        lastEnded = campaign;
      }
      continue;
    }
    if (!best || campaign.updatedAt > best.updatedAt) {
      best = campaign;
    }
  }
  return best ?? lastEnded;
}

// "2 days ago" for the recap and the save slots. Coarse on purpose: a title
// screen is not a log.
export function agoLabel(iso: string | null | undefined, now = Date.now(), locale: AppLocale = DEFAULT_LOCALE): string {
  if (!iso) {
    return "";
  }
  const then = Date.parse(iso);
  if (Number.isNaN(then)) {
    return "";
  }
  const minutes = Math.max(0, Math.round((now - then) / 60_000));
  // Keep the original English title-screen wording. Other locales use the
  // runtime's grammatical relative-time data, including future languages.
  if (locale !== "en") {
    if (minutes < 2) return createTranslator(locale)("home.justNow");
    const units: Array<[Intl.RelativeTimeFormatUnit, number, number]> = [
      ["minute", minutes, 60], ["hour", Math.round(minutes / 60), 24],
      ["day", Math.round(minutes / 1440), 7], ["week", Math.round(minutes / 10080), 5],
      ["month", Math.round(minutes / 43200), 12], ["year", Math.max(1, Math.round(minutes / 525600)), Infinity],
    ];
    const [unit, value] = units.find(([, count, limit]) => count < limit)!;
    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-value, unit);
  }
  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return days === 1 ? "yesterday" : `${days} days ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  const months = Math.round(days / 30);
  if (months < 12) return months <= 1 ? "a month ago" : `${months} months ago`;
  const years = Math.round(days / 365);
  return years <= 1 ? "a year ago" : `${years} years ago`;
}

// Roman numerals for chapter headings ("Chapter III"). Chapters are small
// integers; anything beyond the table's reach falls back to digits.
export function romanNumeral(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    return String(value);
  }
  const table: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let rest = value;
  let out = "";
  for (const [num, glyph] of table) {
    while (rest >= num) {
      out += glyph;
      rest -= num;
    }
  }
  return out;
}

// One line under a table's name: who you are there and how full it is.
export function seatLine(campaign: HomeCampaign, userId: string, locale: AppLocale = DEFAULT_LOCALE): string {
  const t = createTranslator(locale);
  const count = { count: campaign.playerCount, max: campaign.maxPlayers };
  const seats = t("home.seatCount", count);
  if (campaign.status === "lobby") {
    return t("home.lobbySeats", { seats });
  }
  const party = campaign.maxPlayers === 1 ? t("home.solo") : seats;
  if (campaign.playingAs) {
    return t("home.playingAs", { name: campaign.playingAs, party });
  }
  if (holdsDmSeat(campaign, userId)) {
    return t("home.runningParty", { party });
  }
  return t("home.noCharacter", { party });
}

// The chapter line: "Act II, Chapter III · The Drowned Lantern" (the act
// only once the arc has one), the act's name when the chapter has none yet,
// the scene after that, or the campaign's own description.
export function chapterLine(campaign: HomeCampaign, locale: AppLocale = DEFAULT_LOCALE): string {
  const t = createTranslator(locale);
  const chapter = campaign.glance?.chapter;
  const scene = (campaign as HomeCampaign & { scene?: string }).scene?.trim() || "";
  if (chapter) {
    const number = (value: number) => locale === "en" ? romanNumeral(value) : new Intl.NumberFormat(locale).format(value);
    const head = chapter.act
      ? t("home.actChapter", { act: number(chapter.act), chapter: number(chapter.index) })
      : t("home.chapter", { chapter: number(chapter.index) });
    const title = chapter.title.trim();
    if (title) return `${head} · ${title}`;
    const actTitle = chapter.actTitle?.trim() || "";
    if (actTitle) return `${head} · ${actTitle}`;
    if (scene) return `${head} · ${scene}`;
    return head;
  }
  if (scene) return scene;
  return campaign.description.trim();
}

// The save slot's one line: what state the table is in, in a few words.
export function slotLine(campaign: HomeCampaign, userId: string, locale: AppLocale = DEFAULT_LOCALE): string {
  const t = createTranslator(locale);
  if (campaign.status === "lobby") {
    return t("home.seatCount", { count: campaign.playerCount, max: campaign.maxPlayers });
  }
  if (campaign.status === "ended") {
    const ago = agoLabel(campaign.updatedAt, Date.now(), locale);
    return ago ? t("home.finishedAgo", { ago }) : t("home.finished");
  }
  if (holdsDmSeat(campaign, userId)) {
    return t("home.running");
  }
  const ago = agoLabel(campaign.glance?.recapAt ?? campaign.updatedAt, Date.now(), locale);
  return ago ? t("home.lastPlayed", { ago }) : t("home.inPlay");
}
