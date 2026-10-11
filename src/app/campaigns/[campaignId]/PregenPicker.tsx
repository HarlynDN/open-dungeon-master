"use client";

import { Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { readCharacterResponse, characterRequestError, type CharacterUiError } from "@/lib/i18n/character-presentations";
import { entryCharacterError, pregenText } from "@/lib/i18n/entry-character-presentations";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";

type Hero = { id: string; name: string; tagline: string; blurb: string };

// Ready-made heroes for a seat with no character yet
// (src/lib/starter/pregens.ts). One click seats the hero; the sheet lands
// in the player's library too, so it can be kept, edited or brought to
// another table. Offered in every lobby, not only the starter's: a friend
// who joined with a room code and ten minutes to spare is who it is for.
export function PregenPicker({ campaignId }: { campaignId: string }) {
  const { locale, t } = useLocale();
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState<CharacterUiError | null>(null);

  const [loadError, setLoadError] = useState<CharacterUiError | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    readCharacterResponse<{ pregens: Hero[] }>(fetch("/api/starter"), "entryCharacter.error.heroes")
      .then((data) => {
        if (!Array.isArray(data.pregens) || data.pregens.some((row) => !row || [row.id, row.name, row.tagline, row.blurb].some((value) => typeof value !== "string"))) {
          throw new Error("Malformed pregen response.");
        }
        if (!cancelled) { setHeroes(data.pregens); setLoadError(null); }
      })
      .catch((cause) => { if (!cancelled) setLoadError(characterRequestError(cause, "entryCharacter.error.heroes")); });
    return () => { cancelled = true; };
  }, [reload]);

  async function pick(id: string) {
    setBusyId(id);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/sheet/pregen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError({ data, fallback: "lobby.pregenError" });
      }
    } catch {
      setError({ data: {}, fallback: "lobby.networkError" });
    } finally {
      setBusyId("");
    }
  }

  if (!heroes?.length && !loadError) {
    return null;
  }
  return (
    <div className={cn(ui.card, "space-y-2 px-4 py-3")} data-tour="pregen-picker">
      <p className="text-xs uppercase tracking-wide text-stone-500">{t("lobby.pregen")}</p>
      {loadError ? (
        <div role="alert" className="text-xs text-red-400">
          {entryCharacterError(loadError, locale)}
          <button type="button" onClick={() => setReload((current) => current + 1)} className="ml-2 underline">{t("entryCharacter.retry")}</button>
        </div>
      ) : null}
      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {(heroes ?? []).map((hero) => (
          <li key={hero.id}>
            <button
              type="button"
              onClick={() => pick(hero.id)}
              disabled={busyId !== ""}
              aria-busy={busyId === hero.id}
              className="motion-press flex w-full flex-col items-start rounded-lg border border-stone-800 bg-stone-950/50 px-3 py-2 text-left hover:border-amber-500/40 disabled:opacity-60"
            >
              <span className="flex items-center gap-1.5 text-sm text-stone-100">
                {busyId === hero.id ? <Loader2 className="size-3.5 animate-spin" /> : null}
                {pregenText(hero.id, "tagline", hero.tagline, locale)}
              </span>
              <span className="text-xs text-stone-500">{pregenText(hero.id, "blurb", hero.blurb, locale)}</span>
            </button>
          </li>
        ))}
      </ul>
      {error ? <p className="motion-shake text-xs text-red-400">{entryCharacterError(error, locale)}</p> : null}
    </div>
  );
}
