"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { reviewText, reviewNotice, REVIEW_NOTICES } from "@/lib/i18n/play-review-presentations";

import { askCitationLabel } from "@/lib/i18n/compose-presentations";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { KitButton, PanelError } from "./PanelKit";
import type { CampaignMessage } from "@/lib/db/messages";
import {
  LORE_CATEGORY_LABELS,
  LORE_CHECK_CATEGORIES,
  type LoreCheckCategory,
  type LoreCheckResult,
} from "@/lib/dm/lore-logic";

// The lore-check flow: pick a complaint category, the server cross-checks
// the flagged passage against its whole record (facts, chapters, verbatim
// scenes, NPC state) and returns a verdict with citations and a suggested
// rewrite. The party lead can accept the rewrite, replacing the message.

const VERDICT_STYLES: Record<LoreCheckResult["verdict"], string> = {
  consistent: "border-emerald-900 bg-emerald-950/40 text-emerald-300",
  unsupported: "border-amber-900 bg-amber-950/40 text-amber-300",
  contradicts: "border-red-900 bg-red-950/40 text-red-300",
};

const VERDICT_LABELS: Record<LoreCheckResult["verdict"], string> = {
  consistent: "Consistent with the record",
  unsupported: "Unsupported by the record",
  contradicts: "Contradicts the record",
};

export function LoreCheckDialog({
  campaignId,
  message,
  selection,
  steersStory,
  onClose,
}: {
  campaignId: string;
  message: CampaignMessage;
  // The text the user had selected when opening the dialog ("" = whole message).
  selection: string;
  steersStory: boolean;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const [category, setCategory] = useState<LoreCheckCategory | null>(null);
  const [running, setRunning] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<LoreCheckResult | null>(null);

  const excerpt = (selection || message.content).trim();

  async function run(picked: LoreCheckCategory) {
    setCategory(picked);
    setRunning(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/lore-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "run",
          messageId: message.id,
          selection: selection.slice(0, 2000),
          category: picked,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || REVIEW_NOTICES.check);
        return;
      }
      setResult(data.result as LoreCheckResult);
    } catch {
      setError(REVIEW_NOTICES.network);
    } finally {
      setRunning(false);
    }
  }

  async function accept() {
    if (!result?.rewrite) {
      return;
    }
    setAccepting(true);
    setError("");
    try {
      // The rewrite covers the flagged passage; when only a selection was
      // flagged, splice it into the full message text.
      const content =
        selection && message.content.includes(selection)
          ? message.content.replace(selection, result.rewrite)
          : result.rewrite;
      const response = await fetch(`/api/campaigns/${campaignId}/lore-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept", messageId: message.id, content }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || REVIEW_NOTICES.accept);
        return;
      }
      setAccepted(true);
    } catch {
      setError(REVIEW_NOTICES.network);
    } finally {
      setAccepting(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            ui.dialog,
            "fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 font-display text-lg tracking-wide">
              <GameIcon icon={{ kind: "glyph", key: "system-lore" }} size="size-7" />
              <span className="gold-title">{reviewText("Lore check", locale)}</span>
            </Dialog.Title>
            <Dialog.Close aria-label={reviewText("Close", locale)} className="pk-tap rounded p-1 text-stone-500 hover:text-amber-200 motion-nudge">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <blockquote className="panel mb-3 max-h-32 overflow-y-auto rounded-lg p-2.5 font-serif text-xs italic leading-5 text-stone-400">
            {excerpt.slice(0, 600)}
            {excerpt.length > 600 ? "..." : ""}
          </blockquote>

          {!result ? (
            <div className="reveal space-y-2">
              <p className="text-xs text-stone-400">
                 {reviewText("What seems off? The server checks the passage against everything on record: facts, chapter archives, past scenes, and NPC states.", locale)} </p>
              <div data-pill-group="" role="group" aria-label={reviewText("What seems off", locale)} className="flex flex-wrap gap-1.5">
                {LORE_CHECK_CATEGORIES.map((value) => (
                  <button data-on={category === value ? "" : undefined}
                    key={value}
                    type="button"
                    disabled={running}
                    onClick={() => run(value)}
                    aria-pressed={category === value}
                    className="pk-pill pk-tap motion-press"
                  >
                    {reviewText(LORE_CATEGORY_LABELS[value], locale)}
                  </button>
                ))}
              </div>
              {running ? (
                <p role="status" className="reveal flex items-center gap-2 text-xs text-stone-500">
                  <Loader2 className="size-3.5 animate-spin" />
                   {reviewText("Cross-referencing the record (queued behind the DM)...", locale)} </p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <p
                className={cn(
                  "motion-pop rounded-lg border px-2.5 py-1.5 text-xs font-medium",
                  VERDICT_STYLES[result.verdict],
                )}
              >
                {reviewText(VERDICT_LABELS[result.verdict], locale)}
              </p>
              {result.explanation ? (
                <p className="reveal text-xs leading-5 text-stone-300">{result.explanation}</p>
              ) : null}
              {result.citations.length ? (
                <div className="reveal space-y-1">
                  <SectionHead title={reviewText("Evidence", locale)} glyph="tab-log" level="h4" aside={result.citations.length} />
                  {result.citations.map((citation, index) => (
                    <p
                      key={index}
                      className="panel rounded-md p-2 text-[11px] leading-4 text-stone-400"
                    >
                      <span className="eyebrow mr-1 rounded bg-stone-800 px-1 text-[9px] text-amber-300/80">
                        {askCitationLabel(citation.kind, locale)}
                        {citation.ref ? ` ${citation.ref}` : ""}
                      </span>
                      {citation.quote}
                    </p>
                  ))}
                </div>
              ) : null}
              {result.rewrite ? (
                <div className="reveal space-y-1.5">
                  <SectionHead title={reviewText("Suggested rewrite", locale)} glyph="tab-notes" level="h4" />
                  <p className="panel whitespace-pre-wrap rounded-lg p-2.5 font-serif text-xs leading-5 text-stone-200">
                    {result.rewrite}
                  </p>
                  {accepted ? (
                    <p className="reveal flex items-center gap-1.5 text-xs text-emerald-400">
                      <Check className="size-3.5" />  {reviewText("Applied; the message has been updated.", locale)} </p>
                  ) : steersStory && message.authorType === "dm" ? (
                    <KitButton tone="primary" disabled={accepting} busy={accepting} onClick={accept}>
                      {accepting ? null : <Check className="size-3.5" />}
                       {reviewText("Accept rewrite", locale)} </KitButton>
                  ) : (
                    <p className="text-xs text-stone-500">
                      {message.authorType === "dm"
                        ? reviewText("The party lead can accept this rewrite.", locale)
                        : reviewText("Only DM narration can be rewritten.", locale)}
                    </p>
                  )}
                </div>
              ) : null}
              <KitButton
                tone="link"
                onClick={() => {
                  setResult(null);
                  setAccepted(false);
                  setCategory(null);
                }}
              >
                 {reviewText("Check a different category", locale)} </KitButton>
            </div>
          )}
          {error ? <PanelError className="mt-2">{reviewNotice(error, locale)}</PanelError> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
