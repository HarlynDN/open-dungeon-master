"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { entryText, entryFrame, entryNotice, ENTRY_NOTICES, bundleFileTooLarge } from "@/lib/i18n/entry-ui-presentations";

import { appNotice } from "@/components/ui/ConfirmDialog";
import { Check, FileUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/SectionHead";
import { chip, chipOn, chipRow } from "@/app/workshop/kit";
import type { AppLocale } from "@/lib/i18n/locales";
import { useRef, useState } from "react";
import { ui } from "@/lib/ui";
import { UnofficialPackNotice } from "@/components/UnofficialPackNotice";
import { Select } from "@/components/ui/Select";
import { BUNDLE_KIND_LABELS, MAX_BUNDLE_BYTES, type BundleDependency } from "@/lib/workshop/bundle";
import { navigateTo } from "@/lib/navigation";

// Opening somebody else's workshop, or a world from WorldForge: its JSON
// export opens the same way, its world landing in the new workshop's
// WorldForge (src/lib/db/world-forge-io.ts).
//
// Two steps on purpose. The preview reads the file and validates it without
// writing anything, so what a DM agrees to is a named thing with counts and
// a licensing notice rather than a filename. The second press is what
// creates the workshop.
//
// The ticks say what an untick costs: a card that picks an NPC loses that
// pick when the NPCs stay behind, and the preview says so for whatever is
// ticked right now (#158). A chapter bundle offers to link its shared
// records to the importer's own copy of the shared workshop (#159).

type SharedHome = { id: string; title: string; found: number; total: number };

type Preview = {
  manifest: { name: string; blurb: string; author: string; inspiredBy: string; rightsHolder: string };
  counts: Record<string, number>;
  houseRules?: boolean;
  plugin?: boolean;
  overworld?: boolean;
  dependencies?: BundleDependency[];
  dependsOn?: { name: string } | null;
  sharedHomes?: SharedHome[];
  warnings: string[];
};

// The kinds a preview offers, in the order the counts came: every kind with
// something in it, then the house rules, the region map and the world pack
// draft when the bundle carries them.
function kindsOf(preview: Preview): string[] {
  const kinds = Object.entries(preview.counts)
    .filter(([, count]) => count > 0)
    .map(([kind]) => kind);
  return [
    ...kinds,
    ...(preview.houseRules ? ["rules"] : []),
    ...(preview.overworld ? ["overworld"] : []),
    ...(preview.plugin ? ["plugin"] : []),
  ];
}

// What the current ticks drop: every link from a ticked kind into an
// unticked one.
function droppedLinks(preview: Preview, kinds: string[], locale: AppLocale): string[] {
  return (preview.dependencies ?? [])
    .filter((dependency) => kinds.includes(dependency.from) && !kinds.includes(dependency.to))
    .map(
      (dependency) =>
        entryFrame(dependency.count === 1 ? "droppedOne" : "droppedMany", { count: dependency.count, from: entryText(BUNDLE_KIND_LABELS[dependency.from] ?? dependency.from, locale), to: entryText(BUNDLE_KIND_LABELS[dependency.to] ?? dependency.to, locale) }, locale),
    );
}

// `label` and `className` let the hub header show the same control as a
// small "Import a bundle" action; the shelf keeps the defaults.
export function ImportBundleButton({
  label,
  className = ui.btnSecondary,
}: {
  label?: string;
  className?: string;
} = {}) {
  const { locale } = useLocale();
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  // Which kinds to take. Everything the bundle offers, until unticked.
  const [kinds, setKinds] = useState<string[]>([]);
  // The importer's workshop a chapter's shared records link to, or "" to
  // bring them in as this workshop's own.
  const [sharedWorkshopId, setSharedWorkshopId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function post(body: Record<string, unknown>) {
    const response = await fetch("/api/workshops/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => { throw new Error(ENTRY_NOTICES.network); });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error ?? ENTRY_NOTICES.read);
    }
    return data;
  }

  async function pick(file: File | undefined) {
    if (!file) {
      return;
    }
    setError("");
    setPreview(null);
    // Checked here as well as on the server: reading a gigabyte into memory
    // to be told no is a bad experience even when the answer is correct.
    if (file.size > MAX_BUNDLE_BYTES) {
      setError(bundleFileTooLarge(MAX_BUNDLE_BYTES / 1024 / 1024));
      return;
    }
    setBusy(true);
    try {
      const contents = await file.text();
      const data = await post({ text: contents, preview: true });
      setText(contents);
      setPreview(data);
      setKinds(kindsOf(data));
      setSharedWorkshopId((data as Preview).sharedHomes?.[0]?.id ?? "");
    } catch (thrown) {
      setError(thrown instanceof Error ? thrown.message : ENTRY_NOTICES.read);
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    setBusy(true);
    setError("");
    try {
      const data = await post({ text, kinds, sharedWorkshopId });
      // Arrivals kept beside the importer's own entries of the same name,
      // said before the new workshop opens (workshop-bundle-shelf.ts).
      const renamed = ((data as { shelf?: { renamed?: string[] } }).shelf?.renamed ?? []).filter(Boolean);
      if (renamed.length) {
        await appNotice(entryFrame("renameNotice", { items: renamed.map(line => entryNotice(line, locale)).join(" ") }, locale), entryText("Kept beside your own", locale));
      }
      navigateTo(`/workshop/${data.workshopId}`);
    } catch (thrown) {
      setError(thrown instanceof Error ? thrown.message : ENTRY_NOTICES.import);
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(event) => void pick(event.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={busy}
        className={className}
        title={entryText("A workshop bundle, or a world exported from WorldForge", locale)}
      >
        {busy && !preview ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileUp className="size-4" />
        )}
        {entryText(label ?? "Open a bundle", locale)}
      </button>

      {error ? <p className="motion-shake mt-2 text-sm text-red-300">{entryNotice(error, locale)}</p> : null}

      {preview ? (
        <div className={`${ui.card} mt-3 p-4`}>
          <SectionHead title={preview.manifest.name} glyph="system-share" />
          <p className="text-sm text-stone-400">{preview.manifest.blurb}</p>
          {preview.manifest.author ? (
            <p className="reveal mt-0.5 text-xs text-stone-500">{entryFrame("author", { name: preview.manifest.author }, locale)}</p>
          ) : null}

          {/* Each kind is a tick: a DM who only wants the monsters takes the
              monsters. Unticking every one leaves an empty workshop, which
              the button below says out loud. */}
          <ul className={cn("stagger mt-3", chipRow)}>
            {kindsOf(preview).map((kind) => {
              const ticked = kinds.includes(kind);
              return (
                <li key={kind}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={ticked}
                    onClick={() =>
                      setKinds((current) => (ticked ? current.filter((entry) => entry !== kind) : [...current, kind]))
                    }
                    className={cn(ui.btnSmall, chip, "rounded-full normal-case", ticked ? chipOn : "text-stone-500")}
                  >
                    <Check className={cn("size-3.5", ticked ? "text-amber-300" : "opacity-20")} aria-hidden="true" />
                    {preview.counts[kind] === undefined ? "" : `${preview.counts[kind]} `}
                    {entryText(BUNDLE_KIND_LABELS[kind] ?? kind, locale)}
                  </button>
                </li>
              );
            })}
          </ul>

          {droppedLinks(preview, kinds, locale).length ? (
            <ul className="stagger mt-2 space-y-1">
              {droppedLinks(preview, kinds, locale).map((line) => (
                <li key={line} className="reveal text-xs text-amber-300/90">
                  {line}
                </li>
              ))}
            </ul>
          ) : null}

          {preview.dependsOn ? (
            <div className="reveal mt-3">
              {preview.sharedHomes?.length ? (
                <>
                  <p className="mb-1 text-xs text-stone-400">
                    {entryFrame("sharedRecords", { name: preview.dependsOn.name }, locale)}
                  </p>
                  <Select
                    label={entryText("Shared records", locale)}
                    value={sharedWorkshopId}
                    onChange={setSharedWorkshopId}
                    options={[
                      ...preview.sharedHomes.map((home) => ({
                        value: home.id,
                        label: entryFrame("linkHome", { name: home.title }, locale),
                        hint: entryFrame("sharedFound", { found: home.found, total: home.total }, locale),
                      })),
                      { value: "", label: entryText("Bring them in as this workshop's own", locale) },
                    ]}
                  />
                </>
              ) : (
                <p className="text-xs text-stone-400">
                  {entryFrame("ownShared", { name: preview.dependsOn.name }, locale)}
                </p>
              )}
            </div>
          ) : null}

          <UnofficialPackNotice
            rightsHolder={preview.manifest.rightsHolder}
            inspiredBy={preview.manifest.inspiredBy}
            className="mt-3"
          />

          {preview.warnings.length ? (
            <ul className="stagger mt-3 space-y-1">
              {preview.warnings.map((warning) => (
                <li key={warning} className="text-xs text-amber-200/80">
                  {entryNotice(warning, locale)}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-3 text-xs text-stone-500">
            {entryText("This creates a new workshop of your own. Nothing is written into any campaign you already have.", locale)}</p>

          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => void confirm()} disabled={busy} className={ui.btnPrimary}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : null}{" "}
              {kinds.length === 0
                ? entryText("Import an empty workshop", locale)
                : kinds.length === kindsOf(preview).length
                  ? entryText("Import it", locale)
                  : entryFrame("importKinds", { count: kinds.length, total: kindsOf(preview).length }, locale)}
            </button>
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setText("");
              }}
              className={ui.btnSecondary}
            >
              {entryText("Cancel", locale)}</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
