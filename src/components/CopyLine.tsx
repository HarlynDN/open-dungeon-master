"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

// One line of text to copy: a command to run, a token shown once, a setup
// line. The tick draws itself in when the copy lands.
export function CopyLine({ text, label, block = false }: { text: string; label: string; block?: boolean }) {
  const { t } = useLocale();
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div>
    <div className={block ? "hx-code items-start whitespace-pre" : "hx-code"}>
      <code className="select-all">{text}</code>
      <button
        type="button"
        aria-label={t("copyLine.copy", { label })}
        className="motion-press shrink-0 rounded p-1 text-stone-400 hover:text-amber-200"
        onClick={async () => {
          setFailed(false);
          try {
            if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable.");
            await navigator.clipboard.writeText(text);
            setCopied(true); setTimeout(() => setCopied(false), 1600);
          } catch { setFailed(true); }
        }}
      >
        {copied ? <Check key="done" className="tick-in size-4 text-emerald-400" /> : <Copy className="size-4" />}
      </button>
    </div>
    {failed ? <p role="alert" className="mt-1 text-xs text-ember-600">{t("copyLine.error")}</p> : null}
    </div>
  );
}
