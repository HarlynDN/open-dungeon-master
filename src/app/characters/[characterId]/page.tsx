"use client";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { LoadFailed } from "@/app/campaigns/[campaignId]/PanelKit";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { characterLabel, subclassLabel, characterErrorText, characterRequestError, readCharacterResponse, requireCharacter, type CharacterUiError } from "@/lib/i18n/character-presentations";
import { PageSkeleton } from "@/components/PageSkeleton";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { AvatarCropDialog } from "@/app/settings/AvatarCropDialog";
import { AppHeader } from "@/components/AppHeader";
import { KebabMenu, type KebabItem } from "@/components/KebabMenu";
import { ContextMenu } from "@/components/ui/ContextMenu";
import { GameIcon } from "@/components/ui/GameIcon";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { cn } from "@/lib/cn";
import { downloadBlob, filenameSlug } from "@/lib/download";
import { downloadCharacterSheetPdf } from "@/lib/pdf/download";
import type { CreateSheetInput } from "@/lib/schemas/sheet";
import { CharacterPortrait, ui } from "@/lib/ui";
import { offersImages, useCapabilities } from "@/lib/use-capabilities";
import { SheetSections, StorySoFar, type CharacterEvent } from "./SheetSections";
import { currentQuery, navigateTo, workshopReturnPath } from "@/lib/navigation";
import { UseInCampaignDialog } from "./UseInCampaignDialog";

// Where this character is playing; see src/lib/db/characters.ts.
type CharacterAssignment = {
  campaignId: string;
  title: string;
  kind: "campaign" | "workshop";
  status: string;
};

type LibraryCharacter = {
  id: string;
  name: string;
  // A character somebody plays, or an ally the DM plays.
  role?: "pc" | "companion";
  race: string;
  class: string;
  subclass: string;
  background: string;
  level: number;
  xp: number;
  portraitStatus?: "queued" | "generating" | "failed" | null;
  campaigns?: CharacterAssignment[];
  sheet: CreateSheetInput;
  updatedAt: string;
};

// Matches the ComfyUI generation timeout; polling stops even if the server
// never resolves the job.
const PORTRAIT_POLL_LIMIT = 240;

export default function CharacterDetailPage({ params }: { params: Promise<{ characterId: string }> }) {
  const { characterId } = use(params);
  return <CharacterDetailInner key={characterId} characterId={characterId} />;
}
function CharacterDetailInner({ characterId }: { characterId: string }) {
  const { t: syncT } = useSyncLocale();
  const { locale, t } = useLocale();
  const [loadError, setLoadError] = useState<CharacterUiError | null>(null);
  const [actionError, setActionError] = useState<CharacterUiError | null>(null);
  const [pollError, setPollError] = useState<CharacterUiError | null>(null);
  const [reloads, setReloads] = useState(0);
  const [portraitSaving, setPortraitSaving] = useState(false);
  const [character, setCharacter] = useState<LibraryCharacter | null>(null);
  const [events, setEvents] = useState<CharacterEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [cloning, setCloning] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<CharacterUiError | null>(null);
  const [cropping, setCropping] = useState(false);
  const [seating, setSeating] = useState(false);
  const [painting, setPainting] = useState(false);
  const [portraitError, setPortraitError] = useState<CharacterUiError | null>(null);
  // "Paint one" only where the server has an image model to paint with.
  const canPaint = offersImages(useCapabilities());
  const pollCount = useRef(0);

  async function handleDownloadPdf() {
    if (!character) {
      return;
    }
    setPdfBusy(true); setActionError(null);
    try {
      // The PDF builder (pdf-lib) loads on demand; see lib/pdf/download.
      const { libraryToPdfCharacter } = await import("@/lib/pdf/character-sheet-pdf");
      await downloadCharacterSheetPdf(libraryToPdfCharacter(character), locale);
    } catch (cause) { setActionError(characterRequestError(cause, "characterActions.pdfError")); } finally {
      setPdfBusy(false);
    }
  }

  // The whole character as one JSON file, portrait inlined, for carrying to
  // another device or server (see src/lib/character-bundle.ts).
  async function handleExport() {
    if (!character) {
      return;
    }
    setExporting(true);
    setExportError(null);
    try {
      const response = await fetch(`/api/characters/${characterId}/export`);
      if (!response.ok) {
        setExportError({ data: {}, fallback: "characterActions.exportError" });
        return;
      }
      downloadBlob(`${filenameSlug(character.name)}.odm-character.json`, await response.blob());
    } catch {
      setExportError({ data: {}, fallback: "characterActions.exportError" });
    } finally {
      setExporting(false);
    }
  }

  // Same portrait-only PATCH the library list uses; a manual upload is
  // authoritative and replaces whatever was painted.
  async function savePortrait(portrait: CreateSheetInput["portrait"]): Promise<boolean> {
    setPortraitError(null); setPortraitSaving(true);
    try {
      const data = await readCharacterResponse<{ character: LibraryCharacter }>(fetch(`/api/characters/${characterId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ portrait }),
      }), "library.portraitError");
      const saved = requireCharacter(data);
      if (saved.id !== characterId) throw new Error("Portrait was not acknowledged for this character.");
      setCharacter((current) => current ? { ...current, ...saved, portraitStatus: null } : current);
      return true;
    } catch (cause) { setPortraitError(characterRequestError(cause, "library.portraitError")); return false; }
    finally { setPortraitSaving(false); }
  }
  async function handlePortraitUploaded(portrait: { id: string; name: string; type: string; url: string }) {
    const saved = await savePortrait(portrait);
    if (saved) setCropping(false);
    return saved;
  }
  async function clearToPlaceholder() { await savePortrait(null); }

  // Queues a fresh render; the poll that watches creation renders picks up
  // the result the same way.
  async function paintPortrait() {
    setPortraitError(null); setPainting(true);
    try {
      const queued = await readCharacterResponse<{ ok?: boolean }>(fetch(`/api/characters/${characterId}/portrait`, { method: "POST" }), "characterActions.paintError");
      if (queued.ok !== true) throw new Error("Portrait generation was not acknowledged.");
      pollCount.current = 0; setPollError(null);
      setCharacter((current) => current ? { ...current, portraitStatus: "queued", sheet: { ...current.sheet, portrait: null } } : current);
    } catch (cause) { setPortraitError(characterRequestError(cause, "characterActions.paintError")); }
    finally { setPainting(false); }
  }

  // A second copy under a numbered name, sheet and portrait verbatim. The
  // roster is where copies live, so that is where this lands.
  async function handleDuplicate(edit = false) {
    setCloning(true); setActionError(null);
    try {
      const data = await readCharacterResponse<{ character: LibraryCharacter }>(fetch(`/api/characters/${characterId}/clone`, { method: "POST" }), "library.cloneError");
      requireCharacter(data); navigateTo(edit ? `/characters/${data.character.id}/edit?copyOf=${characterId}` : "/characters");
    } catch (cause) { setActionError(characterRequestError(cause, "library.cloneError")); }
    finally { setCloning(false); }
  }

  useEffect(() => {
    let cancelled = false;
    pollCount.current = 0;
    readCharacterResponse<{ character: LibraryCharacter; events: CharacterEvent[] }>(fetch(`/api/characters/${characterId}`), "library.detailError")
      .then((data) => { const row = requireCharacter(data); if (!row.sheet || !Array.isArray(data.events)) throw new Error("Malformed character detail response."); if (!cancelled) { setCharacter(row); setEvents(data.events); setPollError(null); setLoadError(null); } })
      .catch((cause) => { if (!cancelled) setLoadError(characterRequestError(cause, "library.detailError")); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [characterId, reloads]);

  // While the portrait renders in the background, re-fetch until it lands.
  const portraitPending =
    character?.portraitStatus === "queued" || character?.portraitStatus === "generating";
  useEffect(() => {
    if (pollError || !portraitPending || pollCount.current >= PORTRAIT_POLL_LIMIT) return;
    let cancelled = false;
    const id = setTimeout(() => {
      pollCount.current += 1;
      readCharacterResponse<{ character: LibraryCharacter }>(fetch(`/api/characters/${characterId}`), "library.pollError")
        .then(requireCharacter<LibraryCharacter>)
        .then((row) => { if (!cancelled) setCharacter(row); })
        .catch((cause) => { if (!cancelled) setPollError(characterRequestError(cause, "library.pollError")); });
    }, 2500);
    return () => { cancelled = true; clearTimeout(id); };
  }, [portraitPending, character, characterId, pollError]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
        <AppHeader />
        <PageSkeleton kind="sheet" className="px-0 py-2" />
      </main>
    );
  }

  if (loadError && loadError.status !== 404) return <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6"><AppHeader /><LoadFailed error={characterErrorText(loadError, locale)} onRetry={() => { setLoading(true); setLoadError(null); setReloads((count) => count + 1); }} /></main>;

  if (!character || loadError?.status === 404) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
        <AppHeader />
        <div className={cn(ui.card, "ornate texture-noise flex flex-col items-center gap-3 px-6 py-8 text-center")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ui/empty-notice-board.webp" alt="" className="h-24 w-32 object-contain opacity-90" />
          <p className="font-serif text-sm text-stone-300">{t("library.notFound")}</p>
          <Link href="/characters" className={ui.btnSecondary}>
            {t("library.backLibrary")}
          </Link>
        </div>
      </main>
    );
  }

  const sheet = character.sheet;

  // Everything but the primary action, once, for the kebab and for the
  // right-click or long press on the header. Each hint is the sentence the
  // old button carried as its tooltip.
  const actions: KebabItem[] = [
    {
      id: "pdf",
      label: pdfBusy ? t("characterActions.pdfBusy") : t("characterActions.pdf"),
      hint: t("characterActions.pdfHint"),
      glyph: "ui-export",
      disabled: pdfBusy,
      onSelect: () => void handleDownloadPdf(),
    },
    {
      id: "export",
      label: exporting ? t("characterActions.exportBusy") : t("characterActions.export"),
      hint: t("characterActions.exportHint"),
      glyph: "system-share",
      disabled: exporting,
      onSelect: () => void handleExport(),
    },
    {
      id: "edit",
      label: syncT("upstreamUi.087ff4b27d5d"),
      hint: syncT("upstreamUi.1578114b6645"),
      glyph: "ui-edit",
      onSelect: () => navigateTo(`/characters/${characterId}/edit`),
    },
    {
      id: "duplicate",
      label: cloning ? t("characterActions.copyBusy") : t("library.duplicate"),
      hint: t("characterActions.copyHint"),
      glyph: "ui-duplicate",
      disabled: cloning,
      onSelect: () => void handleDuplicate(),
    },
    {
      id: "duplicate-edit",
      label: syncT("upstreamUi.cef1d2d07ff4"),
      hint: syncT("upstreamUi.096a9cf641e8"),
      glyph: "ui-duplicate",
      disabled: cloning,
      onSelect: () => void handleDuplicate(true),
    },
    {
      id: "portrait",
      label: sheet.portrait ? t("characterActions.replacePortrait") : t("library.upload"),
      hint: sheet.portrait ? t("characterActions.replaceHint") : t("characterActions.uploadHint"),
      glyph: "ui-upload",
      separated: true, disabled: portraitSaving,
      onSelect: () => setCropping(true),
    },
    ...(canPaint
      ? [
          {
            id: "paint",
            label: portraitPending ? t("characterActions.paintBusy") : t("characterActions.paint"),
            hint: t("characterActions.paintHint"),
            glyph: "ui-paint",
            disabled: painting || portraitPending || portraitSaving,
            onSelect: () => void paintPortrait(),
          },
        ]
      : []),
    ...(sheet.portrait
      ? [
          {
            id: "placeholder",
            label: t("characterActions.placeholder"),
            hint: t("characterActions.placeholderHint"),
            glyph: "ui-placeholder",
            disabled: portraitSaving,
            onSelect: () => void clearToPlaceholder(),
          },
        ]
      : []),
  ];
  const working = pdfBusy || exporting || cloning || painting || portraitSaving;
  const backTo = workshopReturnPath(currentQuery().get("from"));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
      <AppHeader />
      <ContextMenu items={actions} label={character.name} className={cn(ui.card, "ornate texture-noise mb-4 p-4 sm:p-5")}>
        <Link href={backTo ?? "/characters"} className="-my-1 inline-flex min-h-10 items-center gap-1.5 text-sm text-stone-400 hover:text-amber-200">
          <ArrowLeft className="size-4" /> {t(backTo ? "library.backWorkshop" : "library.back")}
        </Link>
        <div className="mt-2 flex items-start gap-4">
          <span className="relative shrink-0">
            {sheet.portrait?.url ? (
              <ImageLightbox
                src={sheet.portrait.url}
                alt={character.name}
                caption={character.name}
                className="size-20 shrink-0 rounded-xl border border-amber-500/30 object-cover shadow-glow-gold sm:size-24"
              />
            ) : portraitPending ? (
              <span
                title={t("library.paintingPortrait")}
                className="flex size-20 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-stone-900 sm:size-24"
              >
                <Loader2 className="size-5 animate-spin text-amber-200" />
              </span>
            ) : (
              <CharacterPortrait
                look={{ race: character.race, class: character.class, gender: sheet.gender }}
                alt={character.name}
                size="size-20 sm:size-24"
                rounded="rounded-xl"
                className="border-amber-500/30 shadow-glow-gold"
              />
            )}
            <GameIcon
              icon={{ kind: "family", key: `class-${character.class}` }}
              size="size-8"
              className="pointer-events-none absolute -bottom-2 -right-2"
            />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="gold-title font-display text-2xl tracking-wide sm:text-3xl">
              {character.name}
            </h1>
            <p className="mt-1 text-sm text-stone-400">
              <span className="mr-1.5 inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-400/10 py-0.5 pl-0.5 pr-2 text-[11px] text-amber-200">
                <GameIcon icon={{ kind: "glyph", key: "rest-level-up" }} size="size-5" />
                {t("library.level", { level: character.level })}
              </span>
              {characterLabel("race", character.race, locale)} {characterLabel("class", character.class, locale)}
              {character.subclass ? ` (${subclassLabel(character.class, character.subclass, locale)})` : ""}
              {character.background ? ` · ${characterLabel("background", character.background, locale)}` : ""}
            </p>
            {!sheet.portrait && character.portraitStatus === "failed" ? (
              <p className="reveal mt-1 text-xs text-stone-500">{t("library.portraitFailedHint")}</p>
            ) : null}
            {/* Each campaign holds its own copy of this sheet, so one library
                entry can be at several tables at once. Naming them is what
                makes "which game is this one in?" answerable. */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {character.campaigns?.length ? (
                character.campaigns.map((assignment) => (
                  <Link
                    key={assignment.campaignId}
                    href={
                      assignment.kind === "workshop"
                        ? `/workshop/${assignment.campaignId}`
                        : `/campaigns/${assignment.campaignId}`
                    }
                    className="motion-press inline-flex min-h-8 max-w-full items-center gap-1 rounded-full border border-stone-600/60 bg-stone-900/60 py-0.5 pl-1 pr-2.5 text-xs text-stone-300 transition-colors hover:border-amber-500/40 hover:text-amber-100"
                  >
                    <GameIcon
                      icon={{ kind: "glyph", key: assignment.kind === "workshop" ? "system-storyboard" : "tab-campaigns" }}
                      size="size-6"
                    />
                    <span className="truncate">{assignment.title}</span>
                  </Link>
                ))
              ) : (
                <span className="text-xs text-stone-500">{t("library.noCampaign")}</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-500/15 pt-3">
          <button type="button" onClick={() => setSeating(true)} className={cn(ui.btnPrimary, "min-w-0 flex-1 sm:flex-none")}>
            <GameIcon icon={{ kind: "glyph", key: "tab-campaigns" }} size="size-6" /> {t(character.role === "companion" ? "seat.allyAction" : "seat.action")}
          </button>
          <Link href={`/characters/${characterId}/edit`} className={cn(ui.btnSecondary, "min-w-0 flex-1 sm:flex-none")}>
            <GameIcon icon={{ kind: "glyph", key: "rest-level-up" }} size="size-6" /> {syncT("upstreamUi.087ff4b27d5d")}</Link>
          <KebabMenu
            items={actions}
            label={t("library.moreActions", { name: character.name })}
            heading={character.name}
            busy={working}
          />
          {working || portraitPending ? (
            <span role="status" className="live-in text-xs text-stone-400">
              {pdfBusy
                ? t("characterActions.pdfStatus")
                : exporting
                  ? t("characterActions.exportBusy")
                  : cloning
                    ? t("characterActions.copyBusy")
                    : portraitSaving
                      ? t("characterActions.portraitSaving")
                      : t("characterActions.paintStatus")}
            </span>
          ) : null}
        </div>
        {exportError ? <p role="alert" className="motion-shake mt-2 text-sm text-ember-600">{characterErrorText(exportError, locale)}</p> : null}
        {portraitError ? <p role="alert" className="motion-shake mt-2 text-sm text-ember-600">{characterErrorText(portraitError, locale)}</p> : null}
      </ContextMenu>

      {actionError ? <p role="alert" className="mb-3 text-sm text-ember-600">{characterErrorText(actionError, locale)}</p> : null}
      {pollError ? <LoadFailed error={characterErrorText(pollError, locale)} onRetry={() => { pollCount.current = 0; setPollError(null); setReloads((count) => count + 1); }} /> : null}
      <SheetSections sheet={sheet} level={character.level} />
      <div className="mt-4">
        <StorySoFar events={events} />
      </div>

      {seating ? (
        <UseInCampaignDialog
          characterId={characterId}
          characterName={character.name}
          characterLevel={character.level}
          role={character.role}
          seatedIn={(character.campaigns ?? []).map((assignment) => assignment.campaignId)}
          onClose={() => setSeating(false)}
        />
      ) : null}

      {cropping ? (
        <AvatarCropDialog
          saveFailureKey="library.portraitError"
          title={t("library.portraitTitle", { name: character.name })}
          onUploaded={handlePortraitUploaded}
          onClose={() => setCropping(false)}
        />
      ) : null}
    </main>
  );
}
