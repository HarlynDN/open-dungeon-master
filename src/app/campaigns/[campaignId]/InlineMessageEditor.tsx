"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { passageText } from "@/lib/i18n/passage-presentations";
import { Check, X } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { DictateField } from "@/components/DictateField";
import { appendDictation } from "@/lib/dictation";

// Inline narration editor, ported from NE-P's InlineMessageEditor
// (src/components/message/InlineMessageEditor.tsx, MIT, Copyright (c) 2026
// Sagesheep): autofocus and auto-grow on mount, Enter saves, Escape cancels,
// with a small toolbar mirroring both for anyone not reaching for the keys.
//
// Shift+Enter inserts a newline rather than saving, because DM narration is
// multi-paragraph and losing a draft to a stray Enter is the obvious failure.

const MIN_HEIGHT = 160;

function grow(element: HTMLTextAreaElement) {
  element.style.height = "auto";
  element.style.height = `${Math.max(element.scrollHeight, MIN_HEIGHT)}px`;
}

export function InlineMessageEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: string;
  onSave: (content: string) => Promise<string | null>;
  onCancel: () => void;
}) {
  const { locale, t } = useLocale();
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [draft, setDraft] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.focus();
    // Deferred a frame so the textarea has its final width before
    // scrollHeight is measured, otherwise it opens at the wrong height.
    const raf = requestAnimationFrame(() => grow(element));
    return () => cancelAnimationFrame(raf);
  }, []);

  async function save() {
    if (busy) {
      return;
    }
    setBusy(true);
    // The server owns the roll-marker rule; whatever it refuses is shown here
    // rather than guessed at in the client.
    setError("");
    try {
      const failure = await onSave(draft);
      if (failure) setError(failure);
    } catch {
      setError(createTranslator("en")("passageUi.error.network"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-1.5">
      <DictateField
        label={t("passageUi.editor.narration")}
        disabled={busy}
        onTranscript={(text) => {
          setDraft((current) => appendDictation(current, text));
          setError("");
          requestAnimationFrame(() => {
            if (ref.current) {
              grow(ref.current);
            }
          });
        }}
      >
        <textarea
          ref={ref}
          value={draft}
          disabled={busy}
          onChange={(event) => {
            setDraft(event.target.value);
            setError("");
            grow(event.currentTarget);
          }}
          onKeyDown={(event) => {
            if (isComposingInput(event)) return;
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void save();
            } else if (event.key === "Escape") {
              event.preventDefault();
              onCancel();
            }
          }}
          className={cn(ui.input, "resize-none p-3 font-serif text-base leading-relaxed disabled:opacity-60")}
        />
      </DictateField>
      {error ? <p className="motion-shake text-xs text-red-400">{passageText(error, locale)}</p> : null}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => void save()}
          disabled={busy}
          className={cn(ui.btnPrimary, "h-8 px-3 text-[11px]")}
        >
          <Check className="size-3" />{t("passageUi.editor.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy} aria-busy={busy}
          className={cn(ui.btnSmall, "px-3 py-1.5 text-[11px]")}
        >
          <X className="size-3" />{t("passageUi.editor.cancel")}
        </button>
        <span className="text-[10px] text-stone-600">
          {t("passageUi.editor.keys")}
        </span>
      </div>
    </div>
  );
}
