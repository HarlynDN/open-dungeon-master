"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { referenceNotice, REFERENCE_NOTICES, referenceSourceName, referenceOrigin } from "@/lib/i18n/reference-ui-presentations";
import type { MessageKey } from "@/lib/i18n/translator";
import { Loader2, Quote, Send } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { DESK_QUESTION_MAX, type DeskAnswer } from "@/lib/reference/desk-logic";

// The fact-checking desk: a rules question, answered from what the server
// actually has, with the sources shown BEFORE the answer is asked for.
//
// Showing the retrieval first is the honest part of the interface. A DM can
// see that a question found three spell rows and one of their own house
// rules, or that it found nothing, and decide whether an answer built on
// that is worth waiting for. Citations come back checked: anything the model
// cited that was never supplied has already been dropped server side.

type PreviewSource = { kind: string; ref: string; name: string; origin: string };

const KIND_LABELS: Record<string, MessageKey> = {
  spell: "referenceUi.source.spell",
  monster: "referenceUi.source.monster",
  item: "referenceUi.source.item",
  condition: "referenceUi.source.condition",
  feat: "referenceUi.source.feat",
  glossary: "referenceUi.source.glossary",
  ruling: "referenceUi.source.ruling",
  variant: "referenceUi.source.variant",
};

export function DeskPanel() {
  const { t, locale } = useLocale();
  const [question, setQuestion] = useState("");
  const [sources, setSources] = useState<PreviewSource[]>([]);
  const [answer, setAnswer] = useState<DeskAnswer | null>(null);
  const [error, setError] = useState("");
  const [asking, setAsking] = useState(false);

  // The preview is a search, not a model call, so it can follow typing the
  // same way the browse tab's search does.
  useEffect(() => {
    const trimmed = question.trim();
    let cancelled = false;
    // Every setState lives inside the timeout, never in the effect body: the
    // lint rule bans a synchronous one there, and the browse tab debounces
    // its own search the same way.
    const timer = setTimeout(async () => {
      if (!trimmed) {
        setSources([]);
        return;
      }
      try {
        const response = await fetch(`/api/reference/ask?q=${encodeURIComponent(trimmed)}`);
        if (!response.ok || cancelled) {
          return;
        }
        const data = await response.json();
        if (!cancelled) {
          setSources(data.sources ?? []);
        }
      } catch {
        // A failed preview is not worth telling anyone about; the ask itself
        // reports properly.
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [question]);

  async function ask() {
    const trimmed = question.trim();
    if (!trimmed || asking) {
      return;
    }
    setAsking(true);
    setError("");
    setAnswer(null);
    try {
      const response = await fetch("/api/reference/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? REFERENCE_NOTICES.desk);
        return;
      }
      setAnswer(data.result);
    } catch {
      setError(REFERENCE_NOTICES.desk);
    } finally {
      setAsking(false);
    }
  }

  return (
    <div>
      <p className="mb-3 text-sm text-stone-400">
        {t("referenceUi.deskHelp")}
      </p>

      <div className="mb-3 flex gap-2">
        <input
          value={question}
          maxLength={DESK_QUESTION_MAX}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (isComposingInput(event)) return;
            if (event.key === "Enter") {
              void ask();
            }
          }}
          placeholder={t("referenceUi.questionHint")}
          aria-label={t("referenceUi.question")}
          className={cn(ui.input, "h-10 min-w-0 flex-1")}
        />
        <button
          type="button"
          onClick={() => void ask()}
          disabled={asking || !question.trim()}
          className={ui.btnSecondary}
        >
          {asking ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {t("referenceUi.askButton")}
        </button>
      </div>

      {question.trim() ? (
        <div className="reveal mb-4 rounded-lg border border-amber-500/15 bg-stone-950/40 p-3">
          <p className="section-head-title mb-2 whitespace-normal">
            {sources.length
              ? t(sources.length === 1 ? "referenceUi.sourcesOne" : "referenceUi.sourcesMany", { count: sources.length })
              : t("referenceUi.noSources")}
          </p>
          {sources.length ? (
            <ul className="stagger flex flex-wrap gap-1.5">
              {sources.map((source) => (
                <li
                  key={source.ref}
                  className="rounded-full border border-amber-500/25 bg-amber-400/5 px-2.5 py-0.5 text-xs text-stone-400"
                  title={referenceOrigin(source.origin, locale)}
                >
                  <span className="text-stone-300">{referenceSourceName(source, locale)}</span>
                  <span className="ml-1.5 text-stone-500">
                    {KIND_LABELS[source.kind] ? t(KIND_LABELS[source.kind]) : source.kind}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-500">
              {t("referenceUi.general")}
            </p>
          )}
        </div>
      ) : null}

      {error ? <p role="alert" className="motion-shake text-sm text-red-300">{referenceNotice(error, locale)}</p> : null}

      {answer ? (
        <div className="reveal panel ornate rounded-xl p-4">
          <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-stone-200">
            {answer.answer}
          </p>
          {answer.citations.length ? (
            <ul className="stagger mt-4 space-y-2 border-t border-amber-500/15 pt-3">
              {answer.citations.map((citation) => (
                <li key={citation.ref} className="text-xs">
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <Quote className="size-3 shrink-0 text-amber-600/70" />
                    {referenceSourceName(citation, locale)}
                    <span className="text-stone-500">{referenceOrigin(citation.origin ?? "", locale)}</span>
                  </span>
                  <span className="mt-0.5 block border-l border-stone-800 pl-3 text-stone-500">
                    {citation.quote}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border-t border-amber-500/15 pt-3 text-xs text-amber-200/80">
              {t("referenceUi.ungrounded")}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
