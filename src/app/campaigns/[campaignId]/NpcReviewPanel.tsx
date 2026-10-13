"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { readLoad, type LoadOutcome } from "@/lib/load-state";
import { controlText, npcAttitudeLabel } from "@/lib/i18n/story-control-presentations";
import { Check, Loader2, Merge, Pencil, X } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { MAX_NPC_NAME } from "@/lib/dm/entity-review-logic";

// Lead-only NPC roster hygiene.
//
// entity-logic.ts resolves exact and containment matches on its own and
// refuses to resolve fuzzy ones, on the grounds that "Aldric" and "Alaric"
// are one typo apart and may well be two different people. This is where a
// human settles it. Nothing here is automatic.

type ReviewNpc = {
  id: string;
  name: string;
  aliases: string[];
  attitude: string;
  location: string;
  archived: boolean;
};

type Suggestion = { name: string; matches: string };

export function NpcReviewPanel({ campaignId }: { campaignId: string }) {
  const { locale, t } = useLocale();
  const [npcs, setNpcs] = useState<ReviewNpc[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [loadError, setLoadError] = useState("");

  const url = `/api/campaigns/${campaignId}/npcs/review`;

  const settle = useCallback((outcome: LoadOutcome<{ npcs?: ReviewNpc[]; suggestions?: Suggestion[] }>) => {
    if (outcome.error !== null) {
      setLoadError(outcome.error);
      return;
    }
    setNpcs(outcome.payload.npcs ?? []);
    setSuggestions(outcome.payload.suggestions ?? []);
    setLoaded(true);
    setLoadError("");
  }, []);

  const requestRoster = useCallback(() =>
    readLoad<{ npcs?: ReviewNpc[]; suggestions?: Suggestion[] }>(fetch(url), "The NPC roster"), [url]);
  const load = useCallback(async () => settle(await requestRoster()), [requestRoster, settle]);

  useEffect(() => {
    let active = true;
    void requestRoster().then((outcome) => {
      if (active) settle(outcome);
    });
    return () => { active = false; };
  }, [requestRoster, settle]);

  const act = useCallback(
    async (body: Record<string, unknown>) => {
      setBusy(true);
      setError("");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setError(data.error ?? createTranslator("en")("storyControl.error.action"));
          return false;
        }
        await load();
        return true;
      } catch {
        setError(createTranslator("en")("storyControl.error.action"));
        return false;
      } finally {
        setBusy(false);
      }
    },
    [url, load],
  );

  const byName = (name: string) => npcs.find((npc) => npc.name === name);

  async function submitRename(npcId: string) {
    const name = draft.trim();
    if (!name) {
      return;
    }
    if (await act({ action: "rename", npcId, name })) {
      setRenaming(null);
      setDraft("");
    }
  }

  const loadNotice = loadError ? <div role="alert" className="space-y-1 text-[11px] text-red-400"><p>{controlText(loadError, locale)}</p><button type="button" className={ui.btnSmall} onClick={() => void load()}>{t("storyControl.retry")}</button></div> : null;
  if (!loaded && loadError) return loadNotice;
  if (!loaded) {
    return (
      <p className="flex items-center gap-1 text-[11px] text-stone-500">
        <Loader2 className="size-3 animate-spin" />{t("storyControl.npcLiteral.0")}</p>
    );
  }

  // Unpadded on purpose: this nests inside a card that already pads and
  // indents its expanded content, the same way ArcCard's body does.
  return (
    <div className="space-y-3">
      {/* No heading: the card that owns this panel already titles it. */}
      <p className="text-[11px] leading-4 text-stone-500">{t("storyControl.npcLiteral.1")}</p>

      {loadNotice}
      {error ? <p className="motion-shake text-[11px] text-red-400">{controlText(error, locale)}</p> : null}

      {suggestions.length ? (
        <div className="reveal space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-wide text-stone-600">{t("storyControl.npcLiteral.2")}</p>
          {suggestions.map((suggestion) => {
            const left = byName(suggestion.name);
            const right = byName(suggestion.matches);
            return (
              <div
                key={`${suggestion.name}|${suggestion.matches}`}
                className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5"
              >
                <p className="text-[11px] leading-4 text-stone-200">
                  <span className="font-medium">{suggestion.name}</span>
                  <span className="text-stone-500">{t("storyControl.npcLiteral.3")}</span>
                  <span className="font-medium">{suggestion.matches}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-stone-500">{t("storyControl.npcLiteral.4")}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {left && right ? (
                    <>
                      <button
                        type="button"
                        disabled={busy} aria-busy={busy}
                        onClick={() =>
                          void act({ action: "merge", keepId: left.id, mergeId: right.id })
                        }
                        className={cn(ui.btnSmall, "px-2 py-1 text-[11px]")}
                      >
                        <Merge className="size-3" />{t("storyControl.npc.keep", { name: left.name })}
                      </button>
                      <button
                        type="button"
                        disabled={busy} aria-busy={busy}
                        onClick={() =>
                          void act({ action: "merge", keepId: right.id, mergeId: left.id })
                        }
                        className={cn(ui.btnSmall, "px-2 py-1 text-[11px]")}
                      >
                        <Merge className="size-3" />{t("storyControl.npc.keep", { name: right.name })}
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    disabled={busy} aria-busy={busy}
                    onClick={() =>
                      void act({
                        action: "dismiss",
                        name: suggestion.name,
                        matches: suggestion.matches,
                      })
                    }
                    className={cn(ui.btnSmall, "px-2 py-1 text-[11px]")}
                  >
                    <X className="size-3" />{t("storyControl.npcLiteral.5")}</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-[11px] leading-4 text-stone-600">{t("storyControl.npcLiteral.6")}</p>
      )}

      <div className="space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-wide text-stone-600">{t("storyControl.npcLiteral.7")}</p>
        {!npcs.length ? (
          <p className="reveal text-[11px] text-stone-600">{t("storyControl.npcLiteral.8")}</p>
        ) : (
          <ul className="stagger space-y-1">
            {npcs.map((npc) => (
              <li
                key={npc.id}
                className="group rounded-lg border border-stone-800 bg-stone-950/40 p-2"
              >
                {renaming === npc.id ? (
                  <div>
                    <input
                      value={draft}
                      autoFocus
                      maxLength={MAX_NPC_NAME}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (isComposingInput(event)) return;
                        if (event.key === "Enter") {
                          void submitRename(npc.id);
                        } else if (event.key === "Escape") {
                          setRenaming(null);
                        }
                      }}
                      className={cn(ui.input, "px-2 py-1 text-[11px]")}
                    />
                    <div className="mt-1 flex items-center gap-1">
                      <button
                        type="button"
                        disabled={busy || !draft.trim()}
                        onClick={() => void submitRename(npc.id)}
                        className={cn(ui.btnSmall, "px-2 py-0.5 text-[11px]")}
                      >
                        <Check className="size-3" />{t("storyControl.npcLiteral.9")}</button>
                      <button
                        type="button"
                        onClick={() => setRenaming(null)}
                        className={cn(ui.btnSmall, "px-2 py-0.5 text-[11px]")}
                      >{t("storyControl.npcLiteral.10")}</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-1">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] leading-4 text-stone-200">
                        {npc.name}
                        {npc.archived ? (
                          <span className="ml-1 text-stone-600">{t("storyControl.npcLiteral.11")}</span>
                        ) : null}
                      </p>
                      <p className="text-[11px] leading-4 text-stone-500">
                        {npcAttitudeLabel(npc.attitude, locale)}
                        {npc.location ? ` · ${npc.location}` : ""}
                      </p>
                      {npc.aliases.length ? (
                        <p className="reveal mt-0.5 text-[11px] leading-4 text-stone-600">
                          {t("storyControl.npc.aliases", { aliases: npc.aliases.join(t("storyControl.listSeparator")) })}
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      disabled={busy} aria-busy={busy}
                      onClick={() => {
                        setRenaming(npc.id);
                        setDraft(npc.name);
                        setError("");
                      }}
                      className={cn(ui.iconAction, "p-1")}
                      title={t("storyControl.npcLiteral.12")}
                      aria-label={t("storyControl.npc.rename", { name: npc.name })}
                    >
                      <Pencil className="size-3" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
