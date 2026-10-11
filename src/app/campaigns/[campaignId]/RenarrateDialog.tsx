"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { createTranslator } from "@/lib/i18n/translator";
import { passageText, renarratePresetLabel } from "@/lib/i18n/passage-presentations";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/ui";
import { GameIcon } from "@/components/ui/GameIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Slider } from "@/components/ui/Slider";
import type { CampaignMessage } from "@/lib/db/messages";
import {
  MAX_GUIDANCE_LENGTH,
  MAX_VARIANTS,
  REROLL_TEMP_OFFSET,
} from "@/lib/dm/renarrate-logic";

// Reroll the DM's latest narration. The server replays only the final
// narration call of that turn, so the dice, the damage and the world state
// stay exactly as they landed; the guidance line steers this take alone and
// is never remembered. Party lead only.

const GUIDANCE_PRESETS = ["darker", "more dialogue", "shorter", "more sensory detail"];

export function RenarrateDialog({
  campaignId,
  message,
  onClose,
}: {
  campaignId: string;
  message: CampaignMessage;
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  const [guidance, setGuidance] = useState("");
  // NE-P opens its regenerate sheet at base + 0.1 and remembers a dragged
  // offset for the rest of the browse session. This dialog is per-reroll, so
  // the offset simply defaults back each time it opens.
  const [tempOffset, setTempOffset] = useState(REROLL_TEMP_OFFSET);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  // Presets keep their original request value; editable prose remains authored text.
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const taken = message.variants?.length ?? 1;
  const capped = taken >= MAX_VARIANTS;

  async function reroll() {
    setRunning(true);
    setError("");
    try {
      const response = await fetch(
        `/api/campaigns/${campaignId}/messages/${message.id}/renarrate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reroll", guidance: selectedPreset ?? guidance, tempOffset }),
        },
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : createTranslator("en")("passageUi.error.reroll"));
        return;
      }
      onClose();
    } catch {
      setError(createTranslator("en")("passageUi.error.network"));
    } finally {
      setRunning(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && !running && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            ui.dialog,
            "fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2.5 font-display text-lg">
              <GameIcon icon={{ kind: "glyph", key: "die-d20" }} size="size-8" />
              <span className="gold-title">{t("passageUi.reroll.title")}</span>
            </Dialog.Title>
            <Dialog.Close aria-label={t("passageUi.close")} className={cn(ui.iconAction, "opacity-100")}>
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <p className="mb-3 text-xs leading-5 text-stone-400">
            {t("passageUi.reroll.description", { taken, max: MAX_VARIANTS })}
            {capped ? t("passageUi.reroll.capped") : ""}
          </p>

          <SectionHead
            title={t("passageUi.reroll.variation")}
            glyph="sky-wind"
            level="h4"
            aside={
              <span key={tempOffset} className="count-pop font-mono text-xs text-amber-200">
                +{tempOffset.toFixed(2)}
              </span>
            }
          />
          <Slider
            min={0}
            max={0.6}
            step={0.05}
            value={tempOffset}
            disabled={running}
            onChange={setTempOffset}
            label={t("passageUi.reroll.drift")}
            bubble={(value) => `+${value.toFixed(2)}`}
            className="mb-4 w-full"
          />

          <SectionHead title={t("passageUi.reroll.guidance")} glyph="tab-log" level="h4" />
          <input
            aria-label={t("passageUi.reroll.guidance")}
            value={selectedPreset ? renarratePresetLabel(selectedPreset, locale) : guidance}
            onChange={(event) => { setSelectedPreset(null); setGuidance(event.target.value); }}
            maxLength={MAX_GUIDANCE_LENGTH}
            disabled={running}
            placeholder={t("passageUi.reroll.placeholder")}
            className={ui.input}
          />
          <div data-pill-group="" className="mt-2 flex flex-wrap gap-1.5">
            {GUIDANCE_PRESETS.map((preset) => (
              <button data-on={selectedPreset === preset ? "" : undefined}
                key={preset}
                type="button"
                disabled={running}
                onClick={() => setSelectedPreset(preset)}
                className="session-subtab session-subtab-plain motion-press"
              >
                {renarratePresetLabel(preset, locale)}
              </button>
            ))}
          </div>

          {error ? <p className="motion-shake mt-3 text-xs text-red-400">{passageText(error, locale)}</p> : null}

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} disabled={running} className={ui.btnSmall}>
              {t("passageUi.reroll.cancel")}
            </button>
            <button
              type="button"
              onClick={reroll}
              disabled={running || capped}
              className={ui.btnPrimary}
            >
              {running ? (
                <>
                  <Loader2 className="size-4 animate-spin" />{t("passageUi.reroll.writing")}
                </>
              ) : (
                t("passageUi.reroll.name")
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
