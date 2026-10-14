"use client";

import { ChevronLeft, Plus, UserRound } from "lucide-react";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { PageSkeleton } from "@/components/PageSkeleton";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { IconChip, PIXEL_ICONS, PixelTile, ui } from "@/lib/ui";
import CharacterBuilder, {
  type BuilderResult,
} from "@/app/characters/builder/CharacterBuilder";
import type { Genre } from "@/lib/schemas/game-settings";
import type { CreateSheetInput } from "@/lib/schemas/sheet";
import { navigateTo } from "@/lib/navigation";
import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { characterLabel, subclassLabel, characterCreationData, readCharacterResponse, characterRequestError, characterErrorText, type CharacterUiError } from "@/lib/i18n/character-presentations";

type LibraryCharacter = {
  id: string;
  name: string;
  // A character somebody plays, or an ally the DM plays; only the former
  // takes a player's seat (issue 192).
  role?: "pc" | "companion";
  race: string;
  class: string;
  subclass: string;
  level: number;
  sheet?: CreateSheetInput;
};

// Join a campaign with a character: pick one from your library (adapted to
// the campaign's starting level) or build a new one (also saved to your
// library). ?mode=edit reopens the builder prefilled with the current
// character; ?mode=replace swaps it for another (both lobby-only, both
// clearing the ready flag; an edit keeps the existing portrait unless the
// builder's regenerate control cleared it).
function CampaignCharacterPageInner({ campaignId, requested }: { campaignId: string; requested: string | null }) {
  const { locale, t } = useLocale();
  const [loadError, setLoadError] = useState<CharacterUiError | null>(null);
  const [reloads, setReloads] = useState(0);
  // join = first character; edit = rebuild the current one in place;
  // replace = switch to another or a brand-new one.
  const flow: "join" | "edit" | "replace" =
    requested === "edit" || requested === "replace" ? requested : "join";
  const [level, setLevel] = useState<number | null>(null);
  const [genre, setGenre] = useState<Genre | undefined>(undefined);
  const [worldPackId, setWorldPackId] = useState("");
  const [library, setLibrary] = useState<LibraryCharacter[]>([]);
  // How many of the library's entries are allies the DM plays: they are not
  // offered here, and the page says where they go instead.
  const [companionCount, setCompanionCount] = useState(0);
  const [mode, setMode] = useState<"choose" | "create">(
    flow === "edit" ? "create" : "choose",
  );
  const [currentLibraryId, setCurrentLibraryId] = useState<string | null>(null);
  // The linked library character's level, from a host that keeps an edit at
  // a table of another level to that table; null from one that does not.
  const [libraryLevel, setLibraryLevel] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<CharacterUiError | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      readCharacterResponse<{ campaign: { startingLevel: number; gameSettings: { genre?: Genre; worldPack?: string } } }>(fetch(`/api/campaigns/${campaignId}`), "characterHost.loadError"),
      readCharacterResponse<{ characters: LibraryCharacter[] }>(fetch("/api/characters"), "library.loadError"),
      readCharacterResponse<{ sheet: { libraryCharacterId?: string } | null; libraryLevel?: number | null }>(fetch(`/api/campaigns/${campaignId}/sheet`), "characterHost.loadError"),
    ]).then(([campaignData, charactersData, sheetData]) => {
      if (cancelled) return;
      const data = characterCreationData(campaignData, charactersData, sheetData);
      setLevel(data.level); setGenre(data.genre); setWorldPackId(data.worldPackId);
      const characters = data.library.filter(character => character.role !== "companion");
      setLibrary(characters); setCompanionCount(data.library.length - characters.length); setCurrentLibraryId(data.currentLibraryId); setLibraryLevel(data.libraryLevel);
      if (!characters.length) setMode("create");
    }).catch((cause) => { if (!cancelled) setLoadError(characterRequestError(cause, "characterHost.loadError")); });
    return () => {
      cancelled = true;
    };
  }, [campaignId, reloads]);

  const editCharacter =
    flow === "edit" && currentLibraryId
      ? (library.find((character) => character.id === currentLibraryId) ?? null)
      : null;

  async function send(body: unknown, method: "POST" | "PUT") {
    setBusy(true);
    setError(null);
    try {
      const data = await readCharacterResponse<{ sheet: { id: string } }>(fetch(`/api/campaigns/${campaignId}/sheet`, {
        method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      }), "characterHost.saveError");
      if (typeof data?.sheet?.id !== "string") throw new Error("Character save was not acknowledged.");
      navigateTo(`/campaigns/${campaignId}`);
    } catch (cause) { setError(characterRequestError(cause, "characterHost.saveError")); }
    finally {
      setBusy(false);
    }
  }

  function pickFromLibrary(characterId: string) {
    send({ libraryCharacterId: characterId }, flow === "join" ? "POST" : "PUT");
  }

  function submitNew(result: BuilderResult) {
    if (flow === "edit" && editCharacter) {
      send({ editLibraryCharacterId: editCharacter.id, sheet: result.sheet }, "PUT");
      return;
    }
    send(result.sheet, flow === "join" ? "POST" : "PUT");
  }

  if (loadError) return <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6"><LoadFailed error={characterErrorText(loadError, locale)} onRetry={() => { setLevel(null); setLoadError(null); setReloads((count) => count + 1); }} /></main>;

  if (level === null) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
        <PageSkeleton kind="flat" className="px-0 py-2" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
      <header className="mb-5">
        <a href={`/campaigns/${campaignId}`} className={cn(ui.btnSmall, "text-xs")}>
          <ChevronLeft className="size-3.5" /> {t("characterHost.backLobby")}
        </a>
        <div className="mt-2 flex items-center gap-3">
          <PixelTile src={PIXEL_ICONS.characters} />
          <div>
            <h1 className="gold-title font-display text-2xl">
              {flow === "edit"
                ? t("characterHost.edit")
                : flow === "replace"
                  ? t("characterHost.switch")
                  : mode === "choose"
                    ? t("characterHost.choose")
                    : t("characterHost.create")}
            </h1>
            <p className="text-sm text-stone-400">
              {t("characterHost.level", { level })}
              {flow !== "join" ? ` ${t("characterHost.clearReady")}` : ""}
            </p>
            {flow === "edit" && editCharacter && libraryLevel !== null && libraryLevel !== level ? (
              <p className="reveal mt-1 text-xs text-amber-200">
                {t("characterHost.keepLevel", { name: editCharacter.name, level: libraryLevel })}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {mode === "choose" ? (
        <section className="reveal space-y-4">
          <SectionHead title={t("characterHost.fromLibrary")} glyph="tab-characters" level="h2" aside={<span className="text-xs text-stone-400">{library.length}</span>} />
          {companionCount > 0 ? <p className="reveal text-xs text-stone-400">{t("characterHost.alliesHidden", { count: companionCount })}</p> : null}
          <ul className="stagger-up grid grid-cols-1 gap-3 sm:grid-cols-2">
            {library.map((character) => (
              <li key={character.id}>
                <button
                  type="button"
                  disabled={busy} aria-busy={busy}
                  onClick={() => pickFromLibrary(character.id)}
                  className={cn(ui.cardHover, "w-full p-4 text-left disabled:opacity-50")}
                >
                  <div className="flex items-center gap-2">
                    {character.sheet?.portrait?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={character.sheet.portrait.url}
                        alt={character.name}
                        className="size-8 shrink-0 rounded-lg border border-amber-500/30 object-cover"
                      />
                    ) : (
                      <IconChip icon={UserRound} size="size-8" iconSize="size-4" />
                    )}
                    <span className="min-w-0 truncate font-display tracking-wide text-stone-100">{character.name}</span>
                    <GameIcon icon={{ kind: "family", key: `class-${character.class.toLowerCase()}` }} size="size-7" className="ml-auto" />
                    {character.id === currentLibraryId ? (
                      <span className="rounded-full border border-amber-500/30 bg-amber-400/10 px-2 py-0.5 text-[11px] text-amber-200">
                        {t("characterHost.current")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-stone-400">
                    {t("library.level", { level: character.level })} {characterLabel("race", character.race, locale)}{" "}
                    {characterLabel("class", character.class, locale)}
                    {character.subclass ? ` (${subclassLabel(character.class, character.subclass, locale)})` : ""}
                  </p>
                  {character.level !== level ? (
                    <p className="reveal mt-1 text-xs text-amber-200">
                      {t("characterHost.adapt", { level })}
                    </p>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setMode("create")}
            className={cn(ui.btnSecondary, "w-full border-dashed")}
          >
            <Plus className="size-4" /> {t("characterHost.newInstead")}
          </button>
          {error ? <p className="motion-shake whitespace-pre-line text-sm text-ember-600" role="alert">{characterErrorText(error, locale)}</p> : null}
        </section>
      ) : (
        <>
          {library.length ? (
            <button
              type="button"
              onClick={() => setMode("choose")}
              className={cn(ui.btnSmall, "mb-4")}
            >
              <ChevronLeft className="size-3.5" /> {t("characterHost.pickInstead")}
            </button>
          ) : null}
          <CharacterBuilder
            campaignId={campaignId}
            fixedLevel={level}
            genre={genre}
            worldPackId={worldPackId}
            initial={flow === "edit" ? editCharacter?.sheet : undefined}
            initialLevel={flow === "edit" ? editCharacter?.level : undefined}
            submitLabel={
              flow === "edit"
                ? t("characterHost.saveChanges")
                : flow === "replace"
                  ? t("characterHost.replace")
                  : t("characterHost.join")
            }
            onSubmit={submitNew}
            busy={busy}
            error={characterErrorText(error, locale)}
            onCancel={() => navigateTo(`/campaigns/${campaignId}`)}
          />
        </>
      )}
    </main>
  );
}

function CampaignCharacterRoute({ campaignId }: { campaignId: string }) {
  const requested = useSearchParams().get("mode");
  return <CampaignCharacterPageInner key={`${campaignId}:${requested}`} campaignId={campaignId} requested={requested} />;
}

// useSearchParams needs a Suspense boundary during prerender in Next 16.
export default function CampaignCharacterPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
          <PageSkeleton kind="flat" className="px-0 py-2" />
        </main>
      }
    >
      <CampaignCharacterRoute campaignId={campaignId} />
    </Suspense>
  );
}
