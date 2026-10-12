import type { ComposerGatePhase } from "@/lib/i18n/composer-gate-metadata";
import { composerGatePlaceholder } from "@/lib/i18n/compose-presentations";
import type { AppLocale } from "@/lib/i18n/locales";
import { isFloorExempt } from "@/lib/campaign-types";
import type { InputKind } from "@/app/campaigns/[campaignId]/Composer";
import type { Floor } from "@/lib/db/campaigns";
import type { CharacterSheet } from "@/lib/schemas/sheet";

// Whether this player may send right now, and what the box should say while
// they wait. Four things can hold the composer: the opening narration is
// still playing for this user, the lead has the floor held, it is somebody
// else's turn in combat, or the spotlight is on other players. Table talk
// (OOC) and lead directions never wait on the floor, and neither does the
// Ask strip, which does not come through this composer at all.
//
// Pure so the reading is easy to follow in one place; SessionView memoizes
// the lists it hands in.
export function composerGate({
  floor,
  sheets,
  meUserId,
  kind,
  myName,
  leadPrivate,
  openingNarrationPlaying,
  enemyTurns = false,
  locale = "en",
}: {
  floor: Floor;
  sheets: CharacterSheet[];
  meUserId: string;
  kind: InputKind;
  myName: string;
  leadPrivate: boolean;
  // The campaign's first DM passage is being read aloud to this user.
  openingNarrationPlaying: boolean;
  // The fight's floor is held for the enemies' turns (PublicEncounter
  // enemyTurns), not for table talk.
  enemyTurns?: boolean;
  locale?: AppLocale;
}) {
  const exempt = isFloorExempt(kind);
  const spotlighted =
    floor.mode === "spotlight"
      ? sheets.filter((sheet) => floor.userIds.includes(sheet.userId))
      : [];
  const floorBlocked = floor.mode === "spotlight" && !floor.userIds.includes(meUserId) && !exempt;
  // Held responses: the lead has not opened the floor after the last DM
  // narration.
  const holdBlocked = floor.mode === "hold" && !exempt;
  // Combat: only the current-turn player acts; everyone else waits.
  const initiativeBlocked =
    floor.mode === "initiative" && !floor.userIds.includes(meUserId) && !exempt;
  const heldSpotlightNames =
    floor.mode === "hold" && floor.next.mode === "spotlight"
      ? sheets
          .filter(
            (sheet) =>
              floor.mode === "hold" &&
              floor.next.mode === "spotlight" &&
              floor.next.userIds.includes(sheet.userId),
          )
          .map((sheet) => sheet.name)
      : [];
  // The opening narration gets the table's attention. A question about it is
  // exactly the kind of thing someone wants to ask while it plays, and the
  // Ask strip is never blocked, so this only has to spare OOC.
  const narrationBlocked = openingNarrationPlaying && kind !== "ooc";
  const inputBlocked = floorBlocked || holdBlocked || initiativeBlocked || narrationBlocked;
  const phase: ComposerGatePhase = narrationBlocked ? "opening"
    : holdBlocked ? floor.mode === "hold" && floor.next.mode === "initiative" && enemyTurns ? "enemies" : "hold"
    : initiativeBlocked ? "turn"
    : floorBlocked ? "waiting"
    : kind === "do" ? "do" : kind === "say" ? "say" : kind === "narrate" ? "narrate" : kind === "ooc" ? "ooc"
    : leadPrivate ? "private" : "lead";
  const placeholder = composerGatePlaceholder(phase, {
    name: phase === "turn" && floor.mode === "initiative" ? floor.currentName : myName,
    names: spotlighted.map(sheet => sheet.name).join(", "),
  }, locale);
  return { inputBlocked, placeholder, spotlighted, heldSpotlightNames };
}
