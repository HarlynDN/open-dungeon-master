"use client";

import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { characterLabel, subclassLabel, characterErrorText, characterRequestError, readCharacterResponse, requireCharacter, requireCharacterList, type CharacterUiError } from "@/lib/i18n/character-presentations";
import { EmptyState } from "@/components/EmptyState";
import { appConfirm } from "@/components/ui/ConfirmDialog";
import { PageSkeleton } from "@/components/PageSkeleton";

import { FileUp, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { AvatarCropDialog } from "@/app/settings/AvatarCropDialog";
import { AppHeader } from "@/components/AppHeader";
import { KebabMenu } from "@/components/KebabMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { Ribbon } from "@/components/ui/Ribbon";
import { cn } from "@/lib/cn";
import { CharacterPortrait, ui } from "@/lib/ui";

// Where a character is playing. A library character is a template and each
// campaign holds its own copy, so one entry can be at several tables at once
// (src/lib/db/characters.ts).
type CharacterAssignment = {
  campaignId: string;
  title: string;
  kind: "campaign" | "workshop";
  status: string;
};

type LibraryCharacter = {
  id: string;
  name: string;
  race: string;
  class: string;
  subclass: string;
  background: string;
  level: number;
  updatedAt: string;
  portraitStatus?: "queued" | "generating" | "failed" | null;
  campaigns?: CharacterAssignment[];
  sheet?: { portrait?: { url: string } | null; gender?: string };
};

function portraitPending(character: LibraryCharacter) {
  return character.portraitStatus === "queued" || character.portraitStatus === "generating";
}

// Matches the ComfyUI generation timeout; polling stops even if the server
// never resolves the job.
const PORTRAIT_POLL_LIMIT = 240;

export default function CharactersPage() {
  const { locale, t } = useLocale();
  const [actionError, setActionError] = useState<CharacterUiError | null>(null);
  const [pollError, setPollError] = useState<CharacterUiError | null>(null);
  const [characters, setCharacters] = useState<LibraryCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const [loadError, setLoadError] = useState<CharacterUiError | null>(null);
  const [reloads, setReloads] = useState(0);
  const [croppingId, setCroppingId] = useState("");
  const [cloningId, setCloningId] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<CharacterUiError | null>(null);
  const cropping = characters.find((character) => character.id === croppingId);
  const pollCount = useRef(0);
  const importInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    readCharacterResponse<{ characters: LibraryCharacter[] }>(fetch("/api/characters"), "library.loadError")
      .then(requireCharacterList<LibraryCharacter>)
      .then((rows) => { if (!cancelled) { setCharacters(rows); setAuthed(true); setLoadError(null); setPollError(null); } })
      .catch((cause) => { if (!cancelled) { const error = characterRequestError(cause, "library.loadError"); if (error.status === 401) setAuthed(false); else setLoadError(error); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [reloads]);

  // While a portrait renders in the background, re-fetch until it lands (or
  // fails); the finished image then appears without a reload.
  useEffect(() => {
    if (pollError || !characters.some(portraitPending) || pollCount.current >= PORTRAIT_POLL_LIMIT) return;
    let cancelled = false;
    const id = setTimeout(() => {
      pollCount.current += 1;
      readCharacterResponse<{ characters: LibraryCharacter[] }>(fetch("/api/characters"), "library.pollError")
        .then(requireCharacterList<LibraryCharacter>)
        .then((rows) => { if (!cancelled) setCharacters(rows); })
        .catch((cause) => { if (!cancelled) setPollError(characterRequestError(cause, "library.pollError")); });
    }, 2500);
    return () => { cancelled = true; clearTimeout(id); };
  }, [characters, pollError]);

  async function setPortrait(id: string, url: string): Promise<boolean> {
    setActionError(null);
    try {
      const data = await readCharacterResponse<{ character: LibraryCharacter }>(fetch(`/api/characters/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ portrait: { url } }),
      }), "library.portraitError");
      const saved = requireCharacter(data);
      if (saved.id !== id) throw new Error("Portrait was not acknowledged for this character.");
      setCharacters((current) => current.map((character) => character.id === id ? { ...character, ...saved, portraitStatus: null } : character));
      setCroppingId(""); return true;
    } catch (cause) { setActionError(characterRequestError(cause, "library.portraitError")); return false; }
  }

  // A second copy under a numbered name, sheet and portrait verbatim. The
  // copy belongs to no campaign, which is why it starts with no assignments.
  async function duplicate(id: string) {
    setCloningId(id); setActionError(null);
    try {
      const data = await readCharacterResponse<{ character: LibraryCharacter }>(fetch(`/api/characters/${id}/clone`, { method: "POST" }), "library.cloneError");
      const copy = requireCharacter(data);
      setCharacters((current) => [copy, ...current]);
    } catch (cause) { setActionError(characterRequestError(cause, "library.cloneError")); }
    finally { setCloningId(""); }
  }

  // A character file from this or another server (see
  // src/lib/character-bundle.ts) becomes a new roster entry. The file is
  // parsed here only to fail fast on something that is not JSON; the server
  // does the real validation and reports the first problem it finds.
  async function importFile(file: File) {
    setImporting(true);
    setImportError(null);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        setImportError({ data: { fileName: file.name }, fallback: "library.importJson" });
        return;
      }
      const data = await readCharacterResponse<{ character: LibraryCharacter }>(fetch("/api/characters/import", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed),
      }), "library.importError");
      const imported = requireCharacter(data);
      setCharacters((current) => [imported, ...current]);
    } catch (cause) { setImportError(characterRequestError(cause, "library.importError")); }
    finally {
      setImporting(false);
      if (importInput.current) {
        importInput.current.value = "";
      }
    }
  }

  async function remove(id: string, name: string) {
    if (!await appConfirm(t("library.deleteConfirm", { name }))) return;
    setActionError(null);
    try {
      const data = await readCharacterResponse<{ ok: boolean }>(fetch(`/api/characters/${id}`, { method: "DELETE" }), "library.deleteError");
      if (data.ok !== true) throw new Error("Character deletion was not acknowledged.");
      setCharacters((current) => current.filter((character) => character.id !== id));
    } catch (cause) { setActionError(characterRequestError(cause, "library.deleteError")); }
  }

  if (!authed) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
        <div className={cn(ui.card, "ornate texture-noise flex flex-col items-center gap-3 px-6 py-8 text-center")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ui/empty-notice-board.webp" alt="" className="h-24 w-32 object-contain opacity-90" />
          <p className="font-serif text-sm text-stone-300">
            <Link href="/" className="text-amber-200 hover:text-amber-400">{t("library.login")}</Link>{" "}{t("library.loginHint")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
      <AppHeader />
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <GameIcon icon={{ kind: "glyph", key: "tab-characters" }} size="size-12" className="page-glyph" />
          <div>
            <h1 className="gold-title animate-fade-up font-display text-2xl">{t("library.title")}</h1>
            <p className="text-sm text-stone-500">
              {t("library.hint")}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap">
          <input
            ref={importInput}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void importFile(file);
              }
            }}
          />
          <button
            type="button"
            onClick={() => importInput.current?.click()}
            disabled={importing}
            className={ui.btnSecondary}
            title={t("library.importHint")}
          >
            {importing ? <Loader2 className="size-4 animate-spin" /> : <FileUp className="size-4" />}
            {t("library.import")}
          </button>
          <Link href="/characters/new" className={ui.btnPrimary}>
            <Plus className="size-4" /> {t("library.new")}
          </Link>
        </div>
      </header>
      {importError ? (
        <p role="alert" className="motion-shake mb-4 whitespace-pre-line break-words rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-2 text-sm text-red-300">
          {characterErrorText(importError, locale)}
        </p>
      ) : null}

      {actionError ? <p role="alert" className="mb-3 whitespace-pre-line break-words text-sm text-ember-600">{characterErrorText(actionError, locale)}</p> : null}
      {pollError ? <LoadFailed error={characterErrorText(pollError, locale)} onRetry={() => { pollCount.current = 0; setPollError(null); setReloads((count) => count + 1); }} /> : null}
      {loading ? (
        <PageSkeleton kind="roster" className="px-0 py-2" />
      ) : loadError ? (
        <LoadFailed error={characterErrorText(loadError, locale)} onRetry={() => { setLoading(true); setReloads((current) => current + 1); }} />
      ) : characters.length === 0 ? (
        <div className={cn(ui.tile, "px-6 py-6")}>
          <EmptyState
            art="board"
            title={t("library.empty")}
            hint={t("library.emptyHint")}
            action={
              <Link href="/characters/new" className={ui.btnSecondary}>
                <Plus className="size-4" /> {t("library.new")}
              </Link>
            }
          />
        </div>
      ) : (
        <>
          <Ribbon className="mb-3">
            {t("library.roster", { count: characters.length })}
          </Ribbon>
          <ul className="stagger-up grid grid-cols-1 gap-3 sm:grid-cols-2">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                cloning={cloningId === character.id}
                onDelete={() => remove(character.id, character.name)}
                onUploadPortrait={() => setCroppingId(character.id)}
                onDuplicate={() => duplicate(character.id)}
              />
            ))}
          </ul>
        </>
      )}
      {cropping ? (
        <AvatarCropDialog
          saveFailureKey="library.portraitError"
          title={t("library.portraitTitle", { name: cropping.name })}
          onUploaded={(image) => setPortrait(cropping.id, image.url)}
          onClose={() => setCroppingId("")}
        />
      ) : null}
    </main>
  );
}

// One roster card: portrait (painted, painting, failed or none), name and
// class chip with the class emblem on the portrait's corner, race and
// background, the tables it sits at, and one menu in the corner holding what
// used to be three hover icons (the same list a right-click or long press
// raises).
function CharacterCard({
  character,
  cloning,
  onDelete,
  onUploadPortrait,
  onDuplicate,
}: {
  character: LibraryCharacter;
  cloning: boolean;
  onDelete: () => void;
  onUploadPortrait: () => void;
  onDuplicate: () => void;
}) {
  const router = useRouter();
  const { locale, t } = useLocale();
  // Everything the card can do, once: the kebab in its corner, a right-click
  // and a long press all raise this list.
  const menu: ContextMenuItem[] = [
    { id: "open", label: t("library.open"), glyph: "tab-characters", onSelect: () => router.push(`/characters/${character.id}`) },
    { id: "portrait", label: t("library.upload"), glyph: "tab-handout", onSelect: onUploadPortrait },
    { id: "duplicate", label: t("library.duplicate"), glyph: "tab-notes", disabled: cloning, onSelect: onDuplicate },
    ...(character.campaigns ?? []).map((assignment, index) => ({
      id: `go-${assignment.campaignId}`,
      label: t("library.goTo", { title: assignment.title }),
      glyph: assignment.kind === "workshop" ? "system-storyboard" : "tab-campaigns",
      separated: index === 0,
      onSelect: () =>
        router.push(
          assignment.kind === "workshop" ? `/workshop/${assignment.campaignId}` : `/campaigns/${assignment.campaignId}`,
        ),
    })),
    { id: "delete", label: t("library.delete"), glyph: "quest-failed", tone: "danger", separated: true, onSelect: onDelete },
  ];
  return (
    <ContextMenu as="li" items={menu} label={character.name} className={cn("group relative", ui.cardHover, "p-4")}>
      <Link href={`/characters/${character.id}`} className="block">
        <div className="flex items-center gap-3">
          <span className="relative shrink-0">
          {character.sheet?.portrait?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={character.sheet.portrait.url}
              alt={character.name}
              className="size-12 shrink-0 rounded-lg border border-amber-500/30 object-cover shadow-glow-gold"
            />
          ) : portraitPending(character) ? (
            <span
              title={t("library.paintingPortrait")}
              className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-stone-900"
            >
              <Loader2 className="size-4 animate-spin text-amber-200" />
            </span>
          ) : (
            <span
              title={
                character.portraitStatus === "failed" ? t("library.portraitFailed") : undefined
              }
            >
              <CharacterPortrait
                look={{
                  race: character.race,
                  class: character.class,
                  gender: character.sheet?.gender,
                }}
                alt={character.name}
                size="size-12"
                className="border-amber-500/30 shadow-glow-gold"
              />
            </span>
          )}
            <GameIcon
              icon={{ kind: "family", key: `class-${character.class}` }}
              size="size-6"
              className="pointer-events-none absolute -bottom-1.5 -right-1.5"
            />
          </span>
          <div className="min-w-0 pr-10">
            <span className="block truncate font-display text-base tracking-wide text-amber-50">
              {character.name}
            </span>
            <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-400/10 px-2 py-0.5 text-[11px] text-amber-200">
              {t("library.levelClass", { level: character.level, class: characterLabel("class", character.class, locale) })}
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-stone-400">
          {characterLabel("race", character.race, locale)}
          {character.subclass ? ` (${subclassLabel(character.class, character.subclass, locale)})` : ""}
        </p>
        {character.background ? (
          <p className="reveal text-xs text-stone-500">{characterLabel("background", character.background, locale)}</p>
        ) : null}
      </Link>
      {character.campaigns?.length ? (
        <div className="reveal mt-2 flex flex-wrap gap-1.5 border-t border-stone-700/40 pt-2">
          {character.campaigns.map((assignment) => (
            <Link
              key={assignment.campaignId}
              href={
                assignment.kind === "workshop"
                  ? `/workshop/${assignment.campaignId}`
                  : `/campaigns/${assignment.campaignId}`
              }
              className="inline-flex min-h-7 max-w-full items-center gap-1 rounded-full border border-stone-600/60 bg-stone-900/60 py-0.5 pl-0.5 pr-2 text-[11px] text-stone-300 transition-colors hover:border-amber-500/40 hover:text-amber-100"
            >
              <GameIcon
                icon={{ kind: "glyph", key: assignment.kind === "workshop" ? "system-storyboard" : "tab-campaigns" }}
                size="size-5"
              />
              <span className="truncate">{assignment.title}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-2 border-t border-stone-700/40 pt-2 text-xs text-stone-500">
          {t("library.noCampaign")}
        </p>
      )}
      <KebabMenu
        items={menu}
        label={t("library.actions", { name: character.name })}
        heading={character.name}
        busy={cloning}
        className="absolute right-2 top-2 border-transparent bg-transparent"
      />
    </ContextMenu>
  );
}
