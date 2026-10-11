"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { memoryText } from "@/lib/i18n/memory-presentations";
import { readLoad, useLoadStatus } from "@/lib/load-state";
import { EmptyState } from "@/components/EmptyState";
import { Pin, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ContextMenu, type ContextMenuItem } from "@/components/ui/ContextMenu";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { KitButton, LoadFailed, panelRow, RowMenu } from "./PanelKit";
import { PIN_TOKEN_CAP, pinTokens, totalPinTokens } from "@/lib/dm/pin-logic";

// Pinned memories: excerpts that ride in every prompt, unconditionally.
//
// The gauge is the point of the panel, following NE-P's PinnedMemoriesPanel:
// pins are the one memory mechanism with no eviction, so the table needs to
// see how much of the budget they have spent before the next pin is refused.
// NE-P colours it amber at 70 percent and red at 90; same thresholds here.

type PinRow = {
  id: string;
  messageId: string;
  text: string;
  isFullMessage: boolean;
  createdAt: string;
};

const COLLAPSE_AT = 160;

function PinItem({ pin, onUnpin }: { pin: PinRow; onUnpin: (id: string) => void }) {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const long = pin.text.length > COLLAPSE_AT;
  const shown = !expanded && long ? `${pin.text.slice(0, COLLAPSE_AT)}...` : pin.text;

  const jump = () => {
    document.querySelector(`[data-message-id="${pin.messageId}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const items: ContextMenuItem[] = [
    { id: "jump", label: t("memoryUi.pin.jump"), glyph: "tab-log", onSelect: jump },
    ...(long ? [{ id: "expand", label: expanded ? t("memoryUi.pin.less") : t("memoryUi.pin.more"), glyph: "tab-notes", onSelect: () => setExpanded((value) => !value) }] : []),
    { id: "unpin", label: t("memoryUi.pin.unpin"), glyph: "quest-failed", tone: "danger", separated: true, onSelect: () => onUnpin(pin.id) },
  ];

  return (
    <ContextMenu as="li" items={items} label={pin.isFullMessage ? t("memoryUi.pin.full") : t("memoryUi.pin.excerpt")} className={panelRow}>
      <div className="mb-1 flex items-center gap-1.5">
        <Pin className="size-3.5 shrink-0 text-amber-400" />
        <span className="eyebrow text-[10px] text-amber-300/80">
          {pin.isFullMessage ? t("memoryUi.pin.full") : t("memoryUi.pin.excerpt")}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[11px] text-stone-500">
          {t("memoryUi.pin.tokens", { count: pinTokens(pin.text) })}
        </span>
        <KitButton tone="iconDanger" onClick={() => onUnpin(pin.id)} aria-label={t("memoryUi.pin.unpin")} className="-my-1 shrink-0">
          <Trash2 className="size-3.5" />
        </KitButton>
        <RowMenu items={items} label={pin.isFullMessage ? t("memoryUi.pin.full") : t("memoryUi.pin.excerpt")} className="-my-1" />
      </div>
      <p className="whitespace-pre-wrap break-words text-xs leading-relaxed text-stone-300">
        {shown}
      </p>
      <div className="mt-1 flex gap-3">
        {long ? (
          <KitButton tone="link" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
            {expanded ? t("memoryUi.pin.less") : t("memoryUi.pin.more")}
          </KitButton>
        ) : null}
        <KitButton tone="link" onClick={jump}>
          {t("memoryUi.pin.jump")}
        </KitButton>
      </div>
    </ContextMenu>
  );
}

export function PinsPanel({ campaignId, version }: { campaignId: string; version: number }) {
  const { locale, t } = useLocale();
  const [mutationError, setMutationError] = useState("");
  const [pins, setPins] = useState<PinRow[]>([]);
  // A refused or failed read is shown in the server's words with a way to
  // ask again, never as "nothing here yet" (issue 140).
  const { loaded, loadError, settle } = useLoadStatus();

  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void readLoad<{ pins?: PinRow[] }>(fetch(`/api/campaigns/${campaignId}/pins`), "The pins").then((outcome) => {
      if (cancelled) {
        return;
      }
      settle(outcome);
      if (outcome.payload) {
        setPins(outcome.payload.pins ?? []);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [campaignId, reload, version, settle]);

  const unpin = useCallback(
    async (pinId: string) => {
      setMutationError("");
      try {
        const response = await fetch(`/api/campaigns/${campaignId}/pins`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinId }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          setMutationError(typeof data.error === "string" ? data.error : createTranslator("en")("memoryUi.error.unpin"));
          return;
        }
        setReload((count) => count + 1);
      } catch {
        setMutationError(createTranslator("en")("memoryUi.error.network"));
      }
    },
    [campaignId],
  );

  const used = totalPinTokens(pins);
  const pct = Math.min(100, Math.round((used / PIN_TOKEN_CAP) * 100));

  return (
    <div className="space-y-2">
      {mutationError ? <p role="alert" className="text-xs text-red-300">{memoryText(mutationError, locale)}</p> : null}
      {pins.length > 0 && loaded && loadError ? <LoadFailed error={memoryText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} /> : null}
      <SectionHead
        title={t("memoryUi.pin.title")}
        glyph="tab-facts"
        aside={
          <span
            className={cn(
              "font-mono text-[11px]",
              used >= PIN_TOKEN_CAP * 0.9 ? "text-red-400" : used >= PIN_TOKEN_CAP * 0.7 ? "text-amber-400" : "text-stone-500",
            )}
          >
            {used.toLocaleString()} / {PIN_TOKEN_CAP.toLocaleString()}
          </span>
        }
      />
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-800" role="meter" aria-label={t("memoryUi.pin.budget")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div
          className={cn(
            "bar-ease h-full rounded-full",
            used >= PIN_TOKEN_CAP * 0.9
              ? "bg-red-500"
              : used >= PIN_TOKEN_CAP * 0.7
                ? "bg-amber-400"
                : "bg-amber-500/60",
          )}
          style={{ width: `${Math.max(1, pct)}%` }}
        />
      </div>

      {pins.length ? (
        <ul className="stagger space-y-1.5">
          {pins.map((pin) => (
            <PinItem key={pin.id} pin={pin} onUnpin={unpin} />
          ))}
        </ul>
      ) : (
        (loadError ? <LoadFailed error={memoryText(loadError, locale)} onRetry={() => setReload((current) => current + 1)} /> : loaded ? <EmptyState size="sm" art="board" title={t("memoryUi.pin.empty")} /> : null)
      )}
    </div>
  );
}
