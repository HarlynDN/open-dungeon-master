"use client";

import Link from "next/link";
import { useState } from "react";
import { GoldTitle } from "@/components/ui/GoldTitle";
import { InterfaceLocalePicker } from "@/components/LocalePicker";
import { PIXEL_ICONS, PixelTile } from "@/lib/ui";
import CharacterBuilder, { type BuilderResult } from "../builder/CharacterBuilder";
import { navigateTo } from "@/lib/navigation";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { readCharacterResponse, requireCharacter, characterRequestError, characterErrorText, type CharacterUiError } from "@/lib/i18n/character-presentations";

export default function NewCharacterPage() {
  const { locale, t } = useLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<CharacterUiError | null>(null);
  // The same sheet either way, and the same adaptation on the way into a
  // campaign (src/lib/characters/adapt.ts). What the role decides is which
  // door they come through: a player character joins a table as yours, a
  // companion joins it as an ally the DM plays. The wizard's first step
  // holds the toggle.
  const [role, setRole] = useState<"pc" | "companion">("pc");

  async function submit(result: BuilderResult) {
    setBusy(true);
    setError(null);
    try {
      const data = await readCharacterResponse<{ character: { id: string; name: string } }>(fetch("/api/characters", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...result, role }),
      }), "characterHost.saveError");
      requireCharacter(data); navigateTo("/characters");
    } catch (cause) { setError(characterRequestError(cause, "characterHost.saveError")); }
    finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">
      <header className="mb-5">
        <Link href="/characters" className="text-sm text-stone-500 hover:text-stone-300">
          &larr; {t("library.back")}
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <PixelTile src={PIXEL_ICONS.characters} />
          <div>
            <GoldTitle size="text-2xl">{t("characterHost.new")}</GoldTitle>
            <p className="text-sm text-stone-400">
              {t("characterHost.newHint")}
            </p>
          </div>
        </div>
        <div className="mt-3 max-w-sm">
          <InterfaceLocalePicker />
        </div>
      </header>
      <CharacterBuilder
        submitLabel={t("characterHost.save")}
        onSubmit={submit}
        busy={busy}
        error={characterErrorText(error, locale)}
        role={{ value: role, onChange: setRole }}
      />
    </main>
  );
}
