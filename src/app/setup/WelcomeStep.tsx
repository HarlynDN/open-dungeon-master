"use client";

import { ui } from "@/lib/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { GameIcon } from "@/components/ui/GameIcon";
import type { Draft } from "@/app/setup/draft";
import { Lamp, ScanMark, host, type ScanResult } from "@/app/setup/SetupParts";

type Update = (change: (draft: Draft) => Draft) => void;

const STOPS = [
  { glyph: "system-lore", titleKey: "setupFlow.welcome.stop.0", lineKey: "setupFlow.welcome.line.0" },
  { glyph: "sense-truesight", titleKey: "setupFlow.welcome.stop.1", lineKey: "setupFlow.welcome.line.1" },
  { glyph: "tab-ambience", titleKey: "setupFlow.welcome.stop.2", lineKey: "setupFlow.welcome.line.2" },
  { glyph: "tab-characters", titleKey: "setupFlow.welcome.stop.3", lineKey: "setupFlow.welcome.line.3" },
  { glyph: "system-share", titleKey: "setupFlow.welcome.stop.4", lineKey: "setupFlow.welcome.line.4" },
] as const;

// The first step: a name, what the wizard is about to ask, and what the scan
// has already found on this computer while the admin reads.
export function WelcomeStep({
  draft,
  update,
  scan,
  scanning,
}: {
  draft: Draft;
  update: Update;
  scan: ScanResult | null;
  scanning: boolean;
}) {
  const { t } = useLocale();
  const found: Array<{ key: string; text: string }> = [
    ...(scan?.text ?? []).map((entry) => ({
      key: entry.baseUrl,
      text: t("setupFlow.welcome.server", { label: entry.label, host: host(entry.baseUrl), models: entry.models.length ? t(entry.models.length === 1 ? "setupFlow.welcome.modelOne" : "setupFlow.welcome.modelMany", { count: entry.models.length }) : "" }),
    })),
    ...(scan?.comfyui ? [{ key: "comfy", text: t("setupFlow.welcome.comfy", { host: host(scan.comfyui.url) }) }] : []),
    ...(scan?.kokoro ? [{ key: "kokoro", text: t("setupFlow.welcome.kokoro", { host: host(scan.kokoro.url) }) }] : []),
    ...(scan?.whisper ? [{ key: "whisper", text: t("setupFlow.welcome.whisper", { host: host(scan.whisper.url) }) }] : []),
  ];
  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-stone-400">{t("setupFlow.welcome.name")}</span>
        <input
          className={ui.input}
          value={draft.serverName}
          maxLength={100}
          onChange={(event) => update((current) => ({ ...current, serverName: event.target.value }))}
          placeholder="Open Dungeon Master"
        />
        <span className="mt-1 block text-[11px] text-stone-500">{t("setupFlow.welcome.nameHelp")}</span>
      </label>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-stone-200">{t("setupFlow.welcome.setup")}</h4>
        <ul className="stagger space-y-1.5">
          {STOPS.map((stop) => (
            <li key={stop.titleKey} className="flex items-start gap-3">
              <GameIcon icon={{ kind: "glyph", key: stop.glyph }} size="size-7" />
              <span className="min-w-0 flex-1 text-sm">
                <span className="text-stone-100">{t(stop.titleKey)}</span>
                <span className="block text-xs text-stone-500">{t(stop.lineKey)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2" aria-live="polite">
        <h4 className="flex items-center gap-2 text-sm font-medium text-stone-200">
          <ScanMark scanning={scanning} found={found.length > 0} />
          {scanning ? t("setupFlow.welcome.scanning") : found.length ? t("setupFlow.welcome.found") : t("setupFlow.welcome.absent")}
        </h4>
        {found.length ? (
          <ul className="stagger flex flex-wrap gap-2">
            {found.map((entry) => (
              <li key={entry.key} className="hx-pill reveal-pop" data-tone="ready">
                <Lamp tone="ok" /> {entry.text}
              </li>
            ))}
          </ul>
        ) : !scanning ? (
          <p className="text-xs text-stone-500">
            {t("setupFlow.welcome.none")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
