"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { readCharacterResponse, characterRequestError, type CharacterUiError } from "@/lib/i18n/character-presentations";
import { entryCharacterError } from "@/lib/i18n/entry-character-presentations";
import * as Dialog from "@radix-ui/react-dialog";
import { Bot, Users, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import CharacterBuilder, {
  type BuilderResult,
} from "@/app/characters/builder/CharacterBuilder";
import type { Genre } from "@/lib/schemas/game-settings";

// Whoever steers the story (the party lead in an AI campaign, the DM in a
// human-run one) builds a lasting companion with the full character creator.
// The finished sheet POSTs to /companions/create, which owns it with a bot
// user and, mid-session, nudges the DM to write them in.
export function CompanionBuilderDialog({
  campaignId,
  genre,
  level,
  humanDm = false,
  onClose,
  onCreated,
}: {
  campaignId: string;
  genre?: Genre;
  level: number;
  // A person is running this table, so the ally is theirs to play through the
  // DM console rather than an AI's to voice. Only the sentence below changes;
  // the sheet is the same object either way.
  humanDm?: boolean;
  onClose: () => void;
  onCreated?: () => void;
}) {
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<CharacterUiError | null>(null);
  // Companions filed in this user's own library. An ally worth writing once
  // is worth using twice, and the level adaptation that makes that safe is
  // the same one player characters go through (src/lib/characters/adapt.ts).
  const [library, setLibrary] = useState<Array<{ id: string; name: string; level: number; class: string }>>([]);

  const [libraryError, setLibraryError] = useState<CharacterUiError | null>(null);

  // The state lands in a .then callback rather than after an await, so the
  // fetch reads as "subscribe to an external system" to React and to the
  // effect linter, which is what it is.
  const loadLibrary = useCallback(
    () =>
      readCharacterResponse<{ characters: Array<{ id: string; name: string; level: number; class: string }> }>(fetch("/api/characters?role=companion"), "entryCharacter.error.library")
        .then((data) => {
          if (!Array.isArray(data.characters) || data.characters.some((row) => !row || typeof row.id !== "string" || typeof row.name !== "string" || typeof row.class !== "string" || !Number.isFinite(row.level))) {
            throw new Error("Malformed companion library response.");
          }
          setLibrary(data.characters);
          setLibraryError(null);
        })
        .catch((cause) => setLibraryError(characterRequestError(cause, "entryCharacter.error.library"))),
    [],
  );

  useEffect(() => {
    void loadLibrary();
  }, [loadLibrary]);

  async function post(body: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      await readCharacterResponse(fetch(`/api/campaigns/${campaignId}/companions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }), "entryCharacter.error.create");
      onCreated?.();
      onClose();
    } catch (cause) {
      setError(characterRequestError(cause, "entryCharacter.error.create"));
    } finally {
      setBusy(false);
    }
  }

  async function submit(result: BuilderResult) {
    await post({ sheet: result.sheet });
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            ui.dialog,
            "fixed left-1/2 top-1/2 z-50 max-h-[88dvh] w-[min(48rem,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 font-display text-lg tracking-wide text-amber-50">
              {humanDm ? (
                <Users className="size-4 text-sky-300" />
              ) : (
                <Bot className="size-4 text-sky-300" />
              )}{" "}
              {t("entryCharacter.companion.title")}
            </Dialog.Title>
            <Dialog.Close aria-label={t("entryCharacter.close")} className="text-stone-500 hover:text-stone-300">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <p className="mb-3 text-xs text-stone-500">
            {humanDm
              ? t("entryCharacter.companion.human")
              : t("entryCharacter.companion.ai")}
          </p>

          {libraryError ? (
            <div role="alert" className="mb-3 text-xs text-red-400">
              {entryCharacterError(libraryError, locale)}
              <button type="button" onClick={() => void loadLibrary()} className="ml-2 underline">{t("entryCharacter.retry")}</button>
            </div>
          ) : null}
          {library.length ? (
            <div className="reveal mb-4 space-y-1.5 rounded-lg border border-stone-800 bg-stone-950/40 px-2.5 py-2">
              <p className="text-[11px] uppercase tracking-wide text-stone-500">
                {t("entryCharacter.companion.library")}
              </p>
              <div className="stagger-pop flex flex-wrap gap-1">
                {library.map((companion) => (
                  <button
                    key={companion.id}
                    type="button"
                    disabled={busy} aria-busy={busy}
                    onClick={() => void post({ libraryCharacterId: companion.id })}
                    className="rounded-md border border-stone-700 px-2 py-1 text-xs text-stone-300 hover:bg-stone-900 disabled:opacity-50"
                  >
                    {companion.name}
                    <span className="ml-1 text-stone-600">{t("entryCharacter.companion.level", { level: companion.level })}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-600">
                {t("entryCharacter.companion.adapt", { level })}
              </p>
            </div>
          ) : null}
          <CharacterBuilder
            campaignId={campaignId}
            fixedLevel={level}
            genre={genre}
            submitLabel={t("entryCharacter.companion.add")}
            onSubmit={submit}
            busy={busy}
            error={entryCharacterError(error, locale)}
            onCancel={onClose}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
