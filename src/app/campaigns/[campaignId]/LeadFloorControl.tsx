"use client";

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/SectionHead";
import { PanelError, kitButtonClass, panelField } from "./PanelKit";
import type { Floor } from "@/lib/db/campaigns";
import type { PublicEncounter } from "@/lib/db/encounter-view";
import { orderRowKey } from "@/lib/battlemap/initiative-rows";
import type { CharacterSheet } from "@/lib/schemas/sheet";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { UiRequestError } from "@/lib/i18n/api-errors";
import { combatName } from "@/lib/i18n/combat-ui-presentations";
import { turnControlErrorText } from "@/lib/i18n/turn-control-presentations";

// Who may speak right now, from the lead's desk. The same route the DM
// console's FloorControl and the composer banners call, with the one thing
// neither of them offers: choosing who gets the spotlight. The banners
// above the composer only ever release; the console only opens and holds.
//
// The floor_changed event is the source of truth for what shows here. A
// click that the server refuses (a fight running, no character picked)
// leaves the floor where it was, so the refusal is surfaced inline rather
// than trusted to be noticed by its absence.

type FloorRequest =
  | { set: "open" | "hold" }
  | { set: "spotlight"; characterIds: string[]; prompt: string }
  | Record<string, never>;

// The kit's small button (ui.btnSmall through PanelKit); the mode in force wears gold.
const chip = kitButtonClass("small", "disabled:opacity-40");
const chipOn = "border-amber-500/60 bg-amber-400/10 text-amber-100 disabled:opacity-100";
const chipOff = "";

export function LeadFloorControl({
  campaignId,
  floor,
  sheets,
  encounter,
}: {
  campaignId: string;
  floor: Floor;
  sheets: CharacterSheet[];
  encounter?: PublicEncounter | null;
}) {
  const { t, locale } = useLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  const errorText = turnControlErrorText(error, locale);
  // Character ids, which is what the route takes; it resolves them to the
  // players behind them and drops companions itself.
  const [picked, setPicked] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");

  // Companions have no player to wait on, so they cannot hold the floor.
  const players = sheets.filter((sheet) => !sheet.isCompanion);
  const spotlighted =
    floor.mode === "spotlight"
      ? players.filter((sheet) => floor.userIds.includes(sheet.userId))
      : [];

  async function post(body: FloorRequest): Promise<boolean> {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/floor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError({ data, fallback: "turnUi.error.floor" });
        return false;
      }
      return true;
    } catch {
      setError({ data: {}, fallback: "turnUi.error.table" });
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function spotlight() {
    if (await post({ set: "spotlight", characterIds: picked, prompt: prompt.trim() })) {
      setPicked([]);
      setPrompt("");
    }
  }

  function togglePick(id: string) {
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  return (
    <div className="panel mb-3 rounded-lg p-3">
      <SectionHead title={t("turnUi.floor")} glyph="rest-initiative" />
      <p className="text-xs text-stone-300">{t(`turnUi.mode.${floor.mode}`)}</p>

      {floor.mode === "initiative" ? (
        <div className="reveal mt-2 space-y-1.5">
          <p className="text-xs text-stone-500">
            {t("turnUi.round", { round: floor.round })}
            {encounter?.orderReady && encounter.order.length ? (
              <>
                {" · "}
                {encounter.order.map((entry, index) => (
                  // Keyed by position: a thief's second round-1 turn repeats the id.
                  <span
                    key={orderRowKey(entry, index)}
                    title={entry.reflex ? t("turnUi.reflex") : undefined}
                    className={cn(
                      "transition-colors duration-200",
                      index === encounter.turnIndex ? "font-medium text-amber-200" : undefined,
                    )}
                  >
                    {index > 0 ? " > " : ""}
                    {combatName(entry.name, entry.kind, locale)}
                    {entry.reflex ? <sup className="motion-pop ml-0.5 text-[9px] text-amber-300">{t("turnUi.second")}</sup> : null}
                  </span>
                ))}
              </>
            ) : (
              <> · {t("turnUi.current", { name: floor.currentName })}</>
            )}
          </p>
          <button
            type="button"
            disabled={busy} aria-busy={busy}
            onClick={() => post({})}
            title={t("turnUi.skipHint")}
            className={cn(chip, chipOff)}
          >
            {t("turnUi.skip")}
          </button>
        </div>
      ) : (
        <>
          <div data-pill-group="" role="group" aria-label={t("turnUi.modeLabel")} className="mt-2 flex flex-wrap gap-1.5">
            <button data-on={floor.mode === "open" ? "" : undefined}
              type="button"
              disabled={busy || floor.mode === "open"}
              onClick={() => post({ set: "open" })}
              title={t("turnUi.openHint")}
              className={cn(chip, floor.mode === "open" ? chipOn : chipOff)}
            >
              {t("turnUi.open")}
            </button>
            <button data-on={floor.mode === "hold" ? "" : undefined}
              type="button"
              disabled={busy || floor.mode === "hold"}
              onClick={() => post({ set: "hold" })}
              title={t("turnUi.holdHint")}
              className={cn(chip, floor.mode === "hold" ? chipOn : chipOff)}
            >
              {t("turnUi.hold")}
            </button>
          </div>

          {floor.mode === "hold" && floor.next.mode === "spotlight" ? (
            <p className="reveal mt-1.5 text-xs text-stone-500">
              {t("turnUi.releaseSpotlight", { names: players
                .filter(
                  (sheet) =>
                    floor.next.mode === "spotlight" && floor.next.userIds.includes(sheet.userId),
                )
                .map((sheet) => sheet.name)
                .join(", ") || t("turnUi.someone") })}
            </p>
          ) : null}

          {floor.mode === "spotlight" ? (
            <div className="panel ornate reveal mt-2 rounded-lg border-amber-500/40 px-2.5 py-2">
              {floor.prompt ? (
                <p className="reveal mb-1 font-serif text-xs italic text-amber-200/80">{floor.prompt}</p>
              ) : null}
              <ul className="space-y-0.5 text-xs">
                {spotlighted.map((sheet) => {
                  const answered = floor.respondedUserIds.includes(sheet.userId);
                  return (
                    <li
                      key={sheet.id}
                      className={cn(
                        "flex items-center gap-1.5",
                        answered ? "text-stone-500" : "text-amber-200",
                      )}
                    >
                      {answered ? (
                        <Check className="size-3 text-emerald-400" />
                      ) : (
                        <span className="inline-block size-3 text-center text-[10px] leading-3">
                          ...
                        </span>
                      )}
                      {sheet.name}
                      <span className="text-[11px] text-stone-500">
                        {t(answered ? "turnUi.answered" : "turnUi.waiting")}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                disabled={busy} aria-busy={busy}
                onClick={() => post({})}
                title={t("turnUi.releaseHint")}
                className={cn(chip, chipOff, "mt-1.5")}
              >
                {t("turnUi.release")}
              </button>
            </div>
          ) : null}

          <SectionHead title={t("turnUi.give")} glyph="tab-party" level="h4" className="mt-3" aside={picked.length ? t("turnUi.picked", { count: picked.length }) : null} />
          <div className="flex flex-wrap gap-1.5">
            {players.length ? (
              players.map((sheet) => {
                const on = picked.includes(sheet.id);
                return (
                  <button
                    key={sheet.id}
                    type="button"
                    disabled={busy} aria-busy={busy}
                    onClick={() => togglePick(sheet.id)}
                    aria-pressed={on}
                    data-on={on ? "" : undefined}
                    className="pk-pill pk-tap motion-press py-0.5 pl-0.5"
                  >
                    {sheet.portrait ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sheet.portrait.url}
                        alt=""
                        className="size-6 rounded-full border border-amber-500/30 object-cover"
                      />
                    ) : (
                      <span className="flex size-6 items-center justify-center rounded-full bg-stone-800 text-[10px] font-medium text-stone-300">
                        {sheet.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    {sheet.name}
                  </button>
                );
              })
            ) : (
              <span className="text-xs text-stone-500">{t("turnUi.noPlayers")}</span>
            )}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              maxLength={300}
              placeholder={t("turnUi.question")}
              aria-label={t("turnUi.question")}
              className={cn(panelField, "w-auto min-w-0 flex-1")}
            />
            <button
              type="button"
              disabled={busy || !picked.length}
              onClick={spotlight}
              title={t("turnUi.spotlightHint")}
              className={kitButtonClass("primary", "shrink-0")}
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : null}
              {t("turnUi.spotlight")}
            </button>
          </div>
        </>
      )}

      {errorText ? <PanelError className="mt-1.5">{errorText}</PanelError> : null}
    </div>
  );
}
