"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { STORYBOARD_NOTICES, storyboardText, storyboardFrame, storyboardNotice } from "@/lib/i18n/storyboard-ui-presentations";

import { Send } from "lucide-react";
import { isComposingInput } from "@/lib/input-composition";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { DisclosureHead } from "@/app/campaigns/[campaignId]/DmConsoleParts";
import type { InboxWhisper } from "@/lib/db/dm-whispers";

// The DM seat's side of the players' private line, at a person's table.
// The AI reads these from GAME STATE and answers with send_whisper; a person
// had nowhere to read them, so a player's whisper went unseen and, after
// two, the player could send no more. A reply goes through the same
// send_whisper the console offers, which marks the whisper answered.
export function DmInboxPanel({
  campaignId,
  inbox,
  refreshWhispers,
}: {
  campaignId: string;
  inbox: InboxWhisper[];
  refreshWhispers: () => Promise<void>;
}) {
  const { locale } = useLocale();
  const waiting = inbox.filter((whisper) => !whisper.answered).length;
  const [open, setOpen] = useState(waiting > 0);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function formatWhen(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? ""
      : date.toLocaleString(locale, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  async function reply(characterId: string) {
    const message = draft.trim();
    if (!message || sending) {
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/dm/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "send_whisper", args: { characterIds: [characterId], message } }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? STORYBOARD_NOTICES.whisper);
        return;
      }
      setDraft("");
      setReplyTo(null);
      await refreshWhispers();
    } catch {
      setError(STORYBOARD_NOTICES.table);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={cn(ui.card, "border-amber-500/40 p-1")}>
      <DisclosureHead
        open={open}
        onToggle={() => setOpen((current) => !current)}
        glyph="tab-dm"
        title={storyboardText("Whispers to you", locale)}
        aside={
          waiting > 0 ? (
            <span key={waiting} className="count-pop rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-1.5 text-[10px] font-semibold text-amber-950 shadow-glow-gold">
              {waiting}
            </span>
          ) : null
        }
      />
      {open ? (
        <div className="reveal space-y-2 border-t border-amber-500/20 px-2 py-2">
          <p className="text-[11px] leading-4 text-amber-200/70">
            {storyboardText("Private messages from the players. Only you and the sender see them; a player can have two waiting on you at a time.", locale)}</p>
          {inbox.length ? (
            <ul className="stagger space-y-2">
              {inbox.map((whisper) => (
                <li
                  key={whisper.id}
                  className={cn(
                    "rounded-lg border bg-stone-900/70 px-3 py-2 transition-colors duration-[260ms]",
                    whisper.answered ? "border-stone-700/60" : "border-amber-400/60",
                  )}
                >
                  <p className="text-[11px] font-medium text-amber-200">{whisper.characterName}</p>
                  <p className="whitespace-pre-wrap text-sm leading-5 text-stone-200">{whisper.content}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-stone-500">
                    <span>
                      {formatWhen(whisper.createdAt)}
                      {" | "}
                      {whisper.answered ? storyboardText("Answered", locale) : storyboardText("Waiting on you", locale)}
                    </span>
                    {whisper.characterId && replyTo !== whisper.id ? (
                      <button
                        type="button"
                        onClick={() => {
                          setReplyTo(whisper.id);
                          setDraft("");
                          setError("");
                        }}
                        className="ml-auto text-amber-300 underline decoration-dotted underline-offset-2 motion-press"
                      >
                        {storyboardText("Reply", locale)}</button>
                    ) : null}
                  </div>
                  {replyTo === whisper.id && whisper.characterId ? (
                    <div className="reveal mt-1.5 flex items-end gap-1.5">
                      <textarea
                        value={draft}
                        autoFocus
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (isComposingInput(event)) return;
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void reply(whisper.characterId as string);
                          }
                        }}
                        maxLength={1000}
                        rows={2}
                        disabled={sending}
                        placeholder={storyboardFrame("whisper", { name: whisper.characterName }, locale)}
                        aria-label={storyboardFrame("reply", { name: whisper.characterName }, locale)}
                        className={cn(ui.input, "min-h-[3rem] flex-1 resize-none disabled:opacity-60")}
                      />
                      <button
                        type="button"
                        onClick={() => void reply(whisper.characterId as string)}
                        disabled={!draft.trim() || sending}
                        className={cn(ui.btnSecondary, "size-10 shrink-0 px-0 text-amber-200")}
                        aria-label={storyboardFrame("send", { name: whisper.characterName }, locale)}
                      >
                        <Send className="size-4" />
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-500">{storyboardText("No whispers yet.", locale)}</p>
          )}
          {error ? <p className="motion-shake text-[11px] text-red-400">{storyboardNotice(error, locale)}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
