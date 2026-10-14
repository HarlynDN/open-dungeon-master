"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import type { AppLocale } from "@/lib/i18n/locales";
import { createTranslator } from "@/lib/i18n/translator";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useState } from "react";
import { comfyModel } from "@/lib/image-models/catalog";
import { HARDWARE_PROFILES, type VerifiedRow } from "@/lib/image-models/curate";
import { seconds } from "@/lib/image-models/describe";
import { VERIFIED_ROWS } from "@/lib/image-models/verified";
import type { ComfyModelReport } from "@/lib/comfyui";
import type { ComfyDiscovery } from "@/app/admin/AdminImagesSection";
import { paintsHere } from "@/lib/image-models/curate";
import type { MaskedConfig } from "@/app/admin/AdminSettingsFields";

// Every image model ODM can run on ComfyUI, curated for the machine this
// ComfyUI runs on: what its hardware made of each one (verified.json), what
// is installed, and for the rest, the files to add and where they download
// from. Under the Image model picker in Admin > Images.

type Images = MaskedConfig["images"];

const hardwareLabel = (id: string) => HARDWARE_PROFILES.find((profile) => profile.id === id)?.label ?? id;

function measured(row: VerifiedRow, locale: AppLocale = "en"): string {
  const syncT = createTranslator(locale);
  return [
    syncT("upstreamUi.comfyMeasured", { portrait: seconds(row.seconds.square), scene: seconds(row.seconds.landscape) }),
    syncT("upstreamUi.comfyCold", { time: seconds(row.coldSeconds) }),
    syncT("upstreamUi.comfyPeak", { gb: row.peakGb }),
    syncT("upstreamUi.comfySteps", { count: row.steps }),
  ].join(" · ");
}

function ModelRow({
  report,
  hardware,
  inUse,
  onPick,
}: {
  report: ComfyModelReport;
  hardware: string | null;
  inUse: boolean;
  onPick: () => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const model = comfyModel(report.id);
  if (!model) return null;
  const row = report.verified;
  // Unmeasured here: what other hardware saw, as a guide.
  const elsewhere = row ? null : VERIFIED_ROWS.find((entry) => entry.model === report.id && entry.verdict !== "fails") ?? null;
  const installed = report.missing.length === 0;
  return (
    <li className="rounded-lg border border-stone-800 bg-stone-950/40 px-3 py-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-sm text-stone-200">
          {model.label}
          {row?.verdict === "recommended" ? <span className="ml-2 text-[10px] uppercase tracking-wide text-amber-300">{syncT("upstreamUi.d70604e84304")}</span> : null}
          {model.style === "anime" ? <span className="ml-2 text-[10px] uppercase tracking-wide text-stone-500">{syncT("upstreamUi.3eac161518fc")}</span> : null}
        </span>
        <span className="text-[11px] text-stone-500">
          {inUse ? syncT("upstreamUi.750af77aa42e") : installed ? syncT("upstreamUi.f8b32f4e92bd") : syncT("upstreamUi.comfyDownload", { gb: report.downloadGb })}
        </span>
      </div>
      <p className="text-[11px] leading-4 text-stone-400">{upstreamOwnedText(model.blurb, locale)}</p>
      <p className="text-[11px] leading-4 text-stone-500">
        {row && row.verdict !== "fails"
          ? measured(row, locale)
          : row
            ? syncT("upstreamUi.comfyFailed", { hardware: hardware ?? syncT("upstreamUi.thisHardware") })
            : elsewhere
              ? syncT("upstreamUi.comfyElsewhere", { hardware: hardwareLabel(elsewhere.hardware), measurement: measured(elsewhere, locale) })
              : syncT("upstreamUi.b25b0e621bc9")}
        {report.fits === false ? syncT("upstreamUi.comfyTooBig", { gb: report.needGb ?? "?" }) : ""}
      </p>
      {row?.notes ? <p className="text-[11px] leading-4 text-stone-500">{upstreamOwnedText(row.notes, locale)}</p> : null}
      <p className="text-[11px] leading-4 text-stone-600">
        {model.maker}. {model.license}.
      </p>
      {!installed ? (
        <details className="mt-1">
          <summary className="cursor-pointer text-[11px] text-amber-300 hover:text-amber-200">{syncT("upstreamUi.418d4f5af0df")}</summary>
          <ul className="mt-1 space-y-0.5">
            {report.missing.map((file) => (
              <li key={file.name} className="text-[11px] leading-4 text-stone-400">
                <a href={file.url} target="_blank" rel="noreferrer" className="text-amber-200 underline">
                  {file.name}
                </a>{" "}
                {syncT("upstreamUi.comfyFolder", { folder: file.folder, gb: file.sizeGb })}
              </li>
            ))}
          </ul>
        </details>
      ) : !inUse && row?.verdict !== "fails" ? (
        <button type="button" className="mt-1 text-[11px] text-amber-300 hover:text-amber-200" onClick={onPick}>
          {syncT("upstreamUi.1f2ba25aaafe")}</button>
      ) : null}
    </li>
  );
}

export function ComfyModelCatalog({
  discovery,
  preset,
  checkpoint,
  onPick,
}: {
  discovery: ComfyDiscovery;
  preset: string;
  checkpoint: string;
  onPick: (patch: Partial<Images>) => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const hardware = discovery.hardware?.label ?? null;
  // The models that cannot paint here (did not run, or want more GPU
  // memory than this one has) and the ones that painted poorly are kept
  // off the list; one click shows them, each saying why.
  const [showUnfit, setShowUnfit] = useState(false);
  const unfit = discovery.models.filter((report) => !paintsHere(report) || report.verified?.verdict === "poor");
  const reports = showUnfit ? discovery.models : discovery.models.filter((report) => !unfit.includes(report));
  const groups = [
    {
      key: "measured",
      title: syncT("upstreamUi.comfyMeasuredOn", { hardware: hardware ?? "" }),
      items: reports.filter((report) => report.verified && report.verified.verdict !== "fails" && report.verified.verdict !== "poor" && paintsHere(report)),
    },
    { key: "unmeasured", title: hardware ? syncT("upstreamUi.comfyNotMeasured", { hardware }) : syncT("upstreamUi.d17d2d78d76e"), items: reports.filter((report) => !report.verified && paintsHere(report)) },
    { key: "poor", title: syncT("upstreamUi.comfyPoor", { hardware: hardware ?? "" }), items: reports.filter((report) => report.verified?.verdict === "poor" && paintsHere(report)) },
    { key: "too-big", title: syncT("upstreamUi.51cb6a5eff02"), items: reports.filter((report) => report.verified?.verdict !== "fails" && !paintsHere(report)) },
    { key: "failed", title: syncT("upstreamUi.comfyDidNotRun", { hardware: hardware ?? "" }), items: reports.filter((report) => report.verified?.verdict === "fails") },
  ].filter((group) => group.items.length);
  const measuredCount = groups.find((group) => group.key === "measured")?.items.length ?? 0;
  const installedCount = reports.filter((report) => !report.missing.length).length;
  const device = discovery.device;

  const slotOf = (report: ComfyModelReport) => {
    const load = comfyModel(report.id)?.graph.load;
    return load && "checkpoint" in load ? load.checkpoint : null;
  };
  const inUse = (report: ComfyModelReport) => {
    const slot = slotOf(report);
    return slot
      ? preset === "checkpoint" && Boolean(report.files[slot]) && checkpoint === report.files[slot]
      : preset === report.id;
  };
  const pick = (report: ComfyModelReport) => {
    const slot = slotOf(report);
    onPick(slot ? { comfyWorkflowPreset: "checkpoint", comfyCheckpoint: report.files[slot] } : { comfyWorkflowPreset: report.id });
  };

  return (
    <details className="rounded-lg border border-stone-800 bg-stone-950/30 px-3 py-2">
      <summary className="cursor-pointer text-sm text-stone-300">
        {syncT("upstreamUi.61e01c4bcdfa")}<span className="ml-2 text-[11px] text-stone-500">
          {device ? syncT("upstreamUi.comfyDevice", { device: hardware ? `${hardware}, ${device.name}` : device.name, gb: device.memoryGb }) : ""}
          {syncT("upstreamUi.comfyInstalled", { count: installedCount })}{hardware ? syncT("upstreamUi.comfyMeasuredCount", { count: measuredCount }) : ""}
        </span>
      </summary>
      <p className="mt-2 text-[11px] leading-4 text-stone-500">
        {syncT("upstreamUi.0cfd98a25571")}</p>
      {unfit.length ? (
        <p className="mt-2 text-[11px] leading-4 text-stone-500">
          {syncT(unfit.length === 1 ? "upstreamUi.comfyUnfitOne" : "upstreamUi.comfyUnfitMany", { count: unfit.length, models: unfit.length === 1 ? "model" : "models", reason: syncT(showUnfit ? "upstreamUi.comfyUnfitShown" : unfit.length === 1 ? "upstreamUi.comfyUnfitHiddenOne" : "upstreamUi.comfyUnfitHiddenMany") })}
          <button type="button" className="underline hover:text-stone-300" onClick={() => setShowUnfit((on) => !on)}>
            {showUnfit ? syncT("upstreamUi.2012d97a1eb9") : syncT("upstreamUi.cab88e281cc4")}
          </button>
        </p>
      ) : null}
      <div className="reveal mt-2 space-y-3">
        {groups.map((group) => (
          <section key={group.key}>
            <h4 className="mb-1 text-xs font-medium text-stone-400">{group.title}</h4>
            <ul className="space-y-1.5">
              {group.items.map((report) => (
                <ModelRow key={report.id} report={report} hardware={hardware} inUse={inUse(report)} onPick={() => pick(report)} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
