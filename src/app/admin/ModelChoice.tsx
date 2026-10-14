"use client";
import { upstreamOwnedText, modelSummaryText } from "@/lib/i18n/upstream-presentations";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import type { AppLocale } from "@/lib/i18n/locales";
import { Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Field } from "@/app/admin/AdminSettingsFields";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import type { ModelChoices, RegistryModel, RegistryProvider } from "@/lib/model-registry/registry";
import type { ModelRole } from "@/lib/model-registry/catalog-logic";
import { ui } from "@/lib/ui";

// A model field that lists what the backend serves (POST /api/admin/models):
// the server's own list, each row with the catalog's word on it, and the
// model already chosen kept on the list even when the server no longer
// names it. A model the server does not list can still be typed: the list
// is help, not a gate. The chosen model is never changed by a listing: the
// obvious pick is listed first as recommended, and only the guided setup
// fills it in (`preselect`), where the field is in front of the admin and
// saved with its step.

const TYPE_OWN = "\u0000type";
const BLANK = "\u0000blank";

export type ModelChoiceProps = {
  label: string;
  hint?: string;
  role: ModelRole;
  provider: RegistryProvider;
  baseUrl?: string;
  // A freshly typed key, for this listing only; "" sends the saved key for
  // the saved host.
  apiKey?: string;
  harnessId?: string;
  value: string;
  onChange: (value: string) => void;
  // What a blank runs, or that it runs nothing (src/app/admin/model-blanks.ts);
  // a function of the listing when the answer depends on it.
  blankLabel?: string | ((choices: ModelChoices | null) => string);
  // What is shown first, the rest one click away: a display filter, never
  // what is sent (the speech fields, whose servers list every kind).
  narrow?: { keep: (id: string) => boolean; kind: string };
  // Fill a blank value with the listing's recommended model: the guided
  // setup only, where the field is in front of the admin and saved with its
  // step. A blank chosen on purpose looks the same as one never chosen, so
  // the admin panel, which anyone returns to, never fills one. A function
  // decides from the listing (a Whisper service's only model runs a blank).
  preselect?: boolean | ((choices: ModelChoices) => boolean);
  // Told each listing as it lands (null when it failed), for a section that
  // says something about what a blank runs.
  onListing?: (choices: ModelChoices | null) => void;
};

export function modelTone(model: RegistryModel | undefined): string {
  if (!model) return "text-stone-500";
  if (model.verdict.fit === "unfit") return "text-red-400";
  if (model.verdict.fit === "warn") return "text-amber-300";
  return "text-stone-500";
}

// The one line under the field: what is known of the chosen model.
export function modelLine(model: RegistryModel | undefined, locale: AppLocale = "en"): string {
  if (!model) return "";
  const parts = [...model.verdict.warnings.map(s => upstreamOwnedText(s, locale)), modelSummaryText(model.verdict.summary, locale)];
  if (model.tested) {
    parts.push(
      model.tested.ok
        ? `Tested here ${model.tested.at.slice(0, 10)}: runs the storyteller loop.`
        : `Tested here ${model.tested.at.slice(0, 10)}: failed (${[
            !model.tested.stages.streaming && upstreamOwnedText("no stream", locale),
            !model.tested.stages.toolCall && upstreamOwnedText("no tool call", locale),
            !model.tested.stages.toolContinuation && upstreamOwnedText("no continuation", locale),
          ]
            .filter(Boolean)
            .join(", ")}).`,
    );
  }
  return parts.map(s => upstreamOwnedText(s, locale)).join(" ");
}

export function ModelChoiceField(props: ModelChoiceProps) {
  const { t: syncT, locale } = useSyncLocale();
  const { label, hint, role, provider, baseUrl = "", apiKey = "", harnessId, value, onChange, blankLabel, narrow, preselect, onListing } = props;
  const [choices, setChoices] = useState<ModelChoices | null>(null);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  // The models that cannot do the role's work are kept off the list; one
  // click shows them, named with why.
  const [showUnfit, setShowUnfit] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const latest = useRef(0);
  // The value and the fill rule as they are when a listing lands, which may
  // be after a pick.
  const picked = useRef(value);
  const fills = useRef(preselect);
  const told = useRef(onListing);
  useEffect(() => {
    picked.current = value;
    fills.current = preselect;
    told.current = onListing;
  }, [value, preselect, onListing]);

  const load = useCallback(async () => {
    const ticket = (latest.current += 1);
    setLoading(true);
    try {
      const response = await fetch("/api/admin/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list", role, provider, baseUrl, apiKey, model: value, harnessId }),
      });
      const data = (await response.json().catch(() => null)) as ModelChoices | null;
      if (ticket === latest.current) {
        const listed = data && Array.isArray(data.models) ? data : null;
        setChoices(listed);
        told.current?.(listed);
        const rule = fills.current;
        const fill = typeof rule === "function" ? Boolean(listed && rule(listed)) : rule;
        if (fill && !picked.current.trim() && listed?.recommended) onChange(listed.recommended);
      }
    } catch {
      if (ticket === latest.current) {
        setChoices(null);
        told.current?.(null);
      }
    } finally {
      if (ticket === latest.current) setLoading(false);
    }
    // The chosen model is sent so it is on the list; it never triggers a reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, provider, baseUrl, apiKey, harnessId]);

  // Listed on arrival and when the address changes, a moment after typing
  // stops. A typed key is not sent until "Look again": a half-typed key
  // should not be tried against the server.
  useEffect(() => {
    const timer = setTimeout(() => void load(), choices ? 600 : 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, provider, baseUrl, harnessId]);

  const rawBlank = typeof blankLabel === "function" ? blankLabel(choices) : blankLabel;
  const blank = rawBlank ? upstreamOwnedText(rawBlank, locale) : rawBlank;
  const all = choices?.models ?? [];
  const chosen = all.find((model) => model.id === value);
  const unfit = all.filter((model) => model.verdict.fit === "unfit" && model.id !== value);
  const fit = showUnfit ? all : all.filter((model) => model.verdict.fit !== "unfit" || model.id === value);
  const recommended = choices?.recommended ?? "";
  const narrowed = narrow && !showAll ? fit.filter((model) => narrow.keep(model.id) || model.id === value || model.id === recommended) : fit;
  // A server none of whose models reads as the kind shows them all.
  const models = narrowed.length ? narrowed : fit;
  const hidden = fit.length - models.length;
  const listable = models.length > 0 && !typing;

  const options: SelectOption<string>[] = [
    ...(blank ? [{ value: BLANK, label: blank }] : []),
    ...[...models.filter((model) => model.id === recommended), ...models.filter((model) => model.id !== recommended)].map((model) => ({
      value: model.id,
      label: `${model.label}${model.id === recommended ? syncT("upstreamUi.1185133b5b89") : ""}${model.listed === false ? syncT("upstreamUi.99087a0baccc") : ""}${model.verdict.fit === "unfit" ? syncT("upstreamUi.974fe3cc2ab7") : ""}`,
      hint: [upstreamOwnedText(model.note, locale), modelSummaryText(model.verdict.summary, locale)].filter(Boolean).join(" · "),
    })),
    { value: TYPE_OWN, label: syncT("upstreamUi.9cb913980117") },
  ];

  return (
    <Field label={label} hint={hint} group>
      <div className="flex items-start gap-2">
        {listable ? (
          <Select
            value={value || (blank ? BLANK : "")}
            onChange={(next) => {
              if (next === TYPE_OWN) {
                setTyping(true);
                return;
              }
              onChange(next === BLANK ? "" : next);
            }}
            options={options}
            label={label}
            className="w-full"
          />
        ) : (
          <input
            className={ui.input}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={() => {
              if (models.length) setTyping(false);
            }}
            placeholder={blank}
            aria-label={label}
          />
        )}
        <button
          type="button"
          onClick={() => {
            setTyping(false);
            void load();
          }}
          disabled={loading}
          aria-busy={loading}
          title={syncT("upstreamUi.c89710d5b5b0")}
          className={cn(ui.btnSmall, "shrink-0")}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          {syncT("upstreamUi.d36feef04807")}</button>
      </div>
      {choices && choices.reachable === false ? (
        <p className="mt-1 text-[11px] leading-4 text-amber-300">{upstreamOwnedText(choices.error, locale) || syncT("upstreamUi.b12ef70e22b6")}</p>
      ) : null}
      {chosen ? (
        <p className={cn("mt-1 text-[11px] leading-4", modelTone(chosen))}>{modelLine(chosen, locale)}</p>
      ) : value && choices && !loading ? (
        <p className="mt-1 text-[11px] leading-4 text-stone-500">{syncT("upstreamUi.f3a231e9dac9")}</p>
      ) : null}
      {unfit.length ? (
        <p className="mt-1 text-[11px] leading-4 text-stone-500">
          {syncT(unfit.length === 1 ? "upstreamUi.modelUnfitOne" : "upstreamUi.modelUnfitMany", { count: unfit.length, models: unfit.length === 1 ? "model" : "models", role: syncT(role === "image" ? "upstreamUi.roleImage" : "upstreamUi.roleStory"), hidden: showUnfit ? "" : syncT(unfit.length === 1 ? "upstreamUi.modelHiddenOne" : "upstreamUi.modelHiddenMany") })}
          <button type="button" className="underline hover:text-stone-300" onClick={() => setShowUnfit((on) => !on)}>
            {showUnfit ? syncT("upstreamUi.2012d97a1eb9") : syncT("upstreamUi.cab88e281cc4")}
          </button>
        </p>
      ) : null}
      {narrow && (hidden || showAll) ? (
        <p className="mt-1 text-[11px] leading-4 text-stone-500">
          {showAll ? syncT("upstreamUi.b25ce8a5e68e") : syncT(hidden === 1 ? "upstreamUi.modelNarrowHiddenOne" : "upstreamUi.modelNarrowHiddenMany", { count: hidden, models: hidden === 1 ? "model" : "models", verb: hidden === 1 ? "does" : "do", kind: upstreamOwnedText(narrow.kind, locale) })}
          <button type="button" className="underline hover:text-stone-300" onClick={() => setShowAll((on) => !on)}>
            {showAll ? syncT("upstreamUi.modelOnly", { kind: upstreamOwnedText(narrow.kind, locale) }) : syncT("upstreamUi.2150d8df37e4")}
          </button>
        </p>
      ) : null}
      {choices ? (
        <p className="mt-1 text-[11px] leading-4 text-stone-600">
          {choices.hardware ? syncT("upstreamUi.modelHardware", { hardware: choices.hardware.summary }) : ""}
          {choices.reachable === true ? syncT("upstreamUi.modelListed", { count: all.filter((model) => model.listed).length }) : ""}
          {syncT("upstreamUi.35ef0314cf88")}{" "}{syncT("upstreamUi.modelCatalogCount", { count: choices.catalog.models })}
          {choices.catalog.fetchedAt ? syncT("upstreamUi.modelAsOf", { date: choices.catalog.fetchedAt.slice(0, 10) }) : ""}
          {choices.catalog.source === "snapshot" ? syncT("upstreamUi.215571c33ea7") : ""}
          {choices.catalog.error ? syncT("upstreamUi.modelRefreshError", { error: choices.catalog.error }) : ""}.
        </p>
      ) : null}
    </Field>
  );
}
