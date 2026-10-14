"use client";
import { upstreamOwnedText } from "@/lib/i18n/upstream-presentations";
import type { AppLocale } from "@/lib/i18n/locales";
import { useLocale as useSyncLocale } from "@/lib/i18n/LocaleProvider";

import { useEffect, useState } from "react";
import { ui } from "@/lib/ui";
import { PageSection } from "@/components/PageShell";
import type { ComfyModelReport, ComfyStatus } from "@/lib/comfyui";
import { CHECKPOINT_PRESET, comfyModel } from "@/lib/image-models/catalog";
import { checkpointModel, obviousComfyChoice, paintsHere } from "@/lib/image-models/curate";
import { listWords, measuredLine } from "@/lib/image-models/describe";
import { honoursNegative } from "@/lib/image-models/workflow";
import { ComfyModelCatalog } from "@/app/admin/ComfyModelCatalog";
import { ModelChoiceField } from "@/app/admin/ModelChoice";
import { BLANK, fromEnv } from "@/app/admin/model-blanks";
import {
  Field,
  SECRET_KEPT,
  SecretField,
  SelectField,
  type EnvDefaults,
  type MaskedConfig,
} from "@/app/admin/AdminSettingsFields";

// Image generation. The picker names the backend new campaigns start on; a
// campaign may still pick any backend that is set up here, so each backend
// keeps its own block of fields (address, model, key), the chosen one open
// and first, the rest folded away under it (issue 89: the fields used to sit
// in one flat grid, and nothing said which belonged to which backend).

type Images = MaskedConfig["images"];
type Group = "comfyui" | "flux" | "openai";
const PRESET_PREFIX = "preset:";
const CHECKPOINT_PREFIX = "checkpoint:";

// What the last check of this ComfyUI found (src/lib/comfyui.ts comfyStatus).
export type ComfyDiscovery = Pick<ComfyStatus, "checkpoints" | "models" | "hardware" | "device"> & { error: string | null };

type Discovery = ComfyDiscovery & { url: string; revision: number };

const fileName = (name: string) => name.split(/[\\/]/).pop() || name;

// A catalog model loaded from a checkpoint is offered as that checkpoint;
// the others as models of their own.
const loadsCheckpoint = (id: string) => {
  const model = comfyModel(id);
  return Boolean(model && "checkpoint" in model.graph.load);
};

// The picker: "None", the catalog models this ComfyUI has every file for
// (measured ones first), then its picture checkpoints, the obvious one marked
// recommended (never picked for the admin). The saved choice stays listed
// when the check no longer finds it. `discovery` is null until a check has
// answered.
export function comfyModelOptions(saved: { checkpoint: string; preset: string }, discovery: ComfyDiscovery | null, locale: AppLocale = "en") {
  const display = (text: string) => upstreamOwnedText(text, locale);
  const succeeded = Boolean(discovery && !discovery.error);
  const hardware = discovery?.hardware?.label ?? null;
  const reports = discovery?.models ?? [];
  const checkpoints = discovery?.checkpoints ?? [];
  // The picker offers what runs here; the saved model stays whatever its
  // verdict, flagged, never swapped.
  const installed = reports.filter((report) => !report.missing.length && !loadsCheckpoint(report.id) && (paintsHere(report) || report.id === saved.preset));
  const savedModel = saved.preset !== CHECKPOINT_PRESET ? comfyModel(saved.preset) : undefined;
  const models = [
    ...installed.map((report) => ({ id: report.id, report })),
    ...(savedModel && !installed.some((report) => report.id === savedModel.id) ? [{ id: savedModel.id, report: null }] : []),
  ];
  const checkpointHint = (name: string) => {
    if (name === saved.checkpoint && succeeded && !checkpoints.includes(name)) return display("Saved selection; not reported by this ComfyUI.");
    const known = checkpointModel(name);
    if (!known) return undefined;
    const report = reports.find((entry) => entry.id === known.id);
    return report?.verified ? `${known.label}. ${display(measuredLine(report, hardware))}` : display(`${known.label} settings.`);
  };
  const unpicked = saved.preset === CHECKPOINT_PRESET && !saved.checkpoint;
  const obvious = unpicked && discovery && succeeded ? obviousComfyChoice(discovery) : null;
  const recommended = (label: string, isIt: boolean) => (isIt ? display(`${label} (recommended)`) : label);
  return [
    // Nothing is painted in checkpoint mode until a checkpoint is picked:
    // no file is named in code, and none is taken from ComfyUI's list.
    { value: CHECKPOINT_PREFIX, label: display(BLANK.checkpoint) },
    ...models.map(({ id, report }) => ({
      value: `${PRESET_PREFIX}${id}`,
      label: recommended(comfyModel(id)?.label ?? id, obvious?.preset === id),
      group: display("Models"),
      ...(report ? { hint: display(measuredLine(report, hardware)) } : succeeded ? { hint: display("Its files are not all on this ComfyUI.") } : {}),
    })),
    ...[saved.checkpoint, ...checkpoints]
      .filter((name, index, names) => name && names.indexOf(name) === index)
      .map((name) => {
        const hint = checkpointHint(name);
        return { value: `${CHECKPOINT_PREFIX}${name}`, label: recommended(name, obvious?.checkpoint === name), group: display("Checkpoints"), ...(hint ? { hint } : {}) };
      }),
  ];
}

export function comfyModelPatch(value: string, options: ReturnType<typeof comfyModelOptions>): Partial<Images> | null {
  if (!options.some((option) => option.value === value)) return null;
  if (value.startsWith(PRESET_PREFIX)) return { comfyWorkflowPreset: value.slice(PRESET_PREFIX.length) };
  if (value.startsWith(CHECKPOINT_PREFIX)) {
    return { comfyWorkflowPreset: CHECKPOINT_PRESET, comfyCheckpoint: value.slice(CHECKPOINT_PREFIX.length) };
  }
  return null;
}

export async function fetchComfyModels(url: string, signal: AbortSignal): Promise<ComfyDiscovery> {
  const response = await fetch("/api/comfy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
    signal,
  });
  const result = (await response.json()) as Partial<ComfyStatus>;
  if (!response.ok || !result.ok) {
    return { checkpoints: [], models: [], hardware: null, device: null, error: result.error || "Could not check ComfyUI." };
  }
  return {
    checkpoints: Array.isArray(result.checkpoints) ? result.checkpoints.filter((name): name is string => typeof name === "string") : [],
    models: Array.isArray(result.models) ? result.models.filter((entry): entry is ComfyModelReport => Boolean(entry && typeof entry.id === "string")) : [],
    hardware: result.hardware ?? null,
    device: result.device ?? null,
    error: null,
  };
}

// The line under the picker: what the check found for the model chosen.
export function comfyModelStatus(discovery: ComfyDiscovery | null, preset: string) {
  if (!discovery) return "Checking installed models…";
  if (discovery.error) return discovery.error;
  const model = preset === CHECKPOINT_PRESET ? undefined : comfyModel(preset);
  if (!model) {
    return discovery.checkpoints.length ? "Installed checkpoints from ComfyUI." : "No checkpoints reported by ComfyUI.";
  }
  const report = discovery.models.find((entry) => entry.id === model.id);
  if (!report || report.missing.length) {
    return `This ComfyUI is missing ${report ? listWords(report.missing.map((file) => file.what)) : `the ${model.label} files`}.`;
  }
  const files = listWords(Object.values(report.files).map(fileName));
  return `Paints every campaign's ComfyUI pictures with ${files}.${
    honoursNegative(model) ? "" : " It runs without a negative prompt, so a table's boundary cannot keep anything out of its pictures."
  }`;
}

// Said under a picture backend whose model is blank. No model is named in
// code, so it paints nothing until one is picked; an upgrade from a version
// that named one lands here.
function NoPictureModel() {
  const { t: syncT } = useSyncLocale();
  return (
    <p role="status" className="text-[11px] leading-4 text-amber-300 sm:col-span-2" data-needs-model>
      {syncT("upstreamUi.689c0f1155bb")}</p>
  );
}

function ComfyModelField({
  images,
  env,
  onChange,
}: {
  images: Images;
  env: EnvDefaults;
  onChange: (patch: Partial<Images>) => void;
}) {
  const { t: syncT, locale } = useSyncLocale();
  const url = images.comfyUrl || env.comfyUrl;
  const [revision, setRevision] = useState(0);
  const [discovery, setDiscovery] = useState<Discovery | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const result = await fetchComfyModels(url, controller.signal);
        if (!controller.signal.aborted) setDiscovery({ url, revision, ...result });
      } catch {
        if (!controller.signal.aborted) {
          setDiscovery({ url, revision, checkpoints: [], models: [], hardware: null, device: null, error: "Could not check ComfyUI. Check the server URL." });
        }
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [url, revision]);

  const current = discovery?.url === url && discovery.revision === revision ? discovery : null;
  const preset = images.comfyWorkflowPreset;
  const options = comfyModelOptions({ checkpoint: images.comfyCheckpoint, preset }, current, locale);
  const selected = preset !== CHECKPOINT_PRESET ? `${PRESET_PREFIX}${preset}` : `${CHECKPOINT_PREFIX}${images.comfyCheckpoint}`;
  const report = current?.models.find((entry) => entry.id === preset);
  const missing = Boolean(current && !current.error && preset !== CHECKPOINT_PRESET && (!report || report.missing.length));
  // Said once ComfyUI has answered, when there is something to pick from.
  const unpicked = Boolean(current && !current.error) && preset === CHECKPOINT_PRESET && !images.comfyCheckpoint.trim();

  // The picker sits beside the address; the catalog spans the row under both.
  return (
    <>
      <div>
        <SelectField<string>
          label={syncT("upstreamUi.c1329b9fbe25")}
          value={selected}
          onChange={(value) => {
            const patch = comfyModelPatch(value, options);
            if (patch) onChange(patch);
          }}
          options={options}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          <p role={current?.error || missing ? "alert" : "status"} className="text-[11px] leading-4 text-stone-500">
            {upstreamOwnedText(comfyModelStatus(current, preset), locale)}
          </p>
          <button type="button" className="shrink-0 text-[11px] text-amber-300 hover:text-amber-200" onClick={() => setRevision((value) => value + 1)}>
            {syncT("upstreamUi.0e9161011702")}</button>
        </div>
      </div>
      {unpicked ? <NoPictureModel /> : null}
      {current && !current.error ? (
        <div className="sm:col-span-2">
          <ComfyModelCatalog discovery={current} preset={preset} checkpoint={images.comfyCheckpoint} onPick={onChange} />
        </div>
      ) : null}
    </>
  );
}

function groupOf(backend: string): Group | null {
  if (backend === "comfyui") return "comfyui";
  if (backend === "mflux-hs" || backend === "sdnq-hs") return "flux";
  if (backend === "openai") return "openai";
  return null;
}

const GROUP_TITLE: Record<Group, string> = {
  comfyui: "ComfyUI",
  flux: "FLUX worker",
  openai: "OpenAI-compatible images API",
};

export function AdminImagesSection({
  images,
  env,
  harness,
  phoneWorld,
  openaiKey,
  onImages,
  onOpenaiKey,
}: {
  images: Images;
  env: EnvDefaults;
  harness: MaskedConfig["harness"];
  // A phone cannot run ComfyUI or a FLUX worker.
  phoneWorld: boolean;
  openaiKey: string;
  onImages: (images: Images) => void;
  onOpenaiKey: (value: string) => void;
}) {
  const { t: syncT } = useSyncLocale();
  const set = (patch: Partial<Images>) => onImages({ ...images, ...patch });
  // The backend "Auto" resolves to, so its fields are the ones shown open.
  const effective = images.defaultBackend || env.imageBackend || "comfyui";
  const active = groupOf(effective);

  const blocks: Record<Group, React.ReactNode> = {
    comfyui: (
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={syncT("upstreamUi.22f5ebc3ad3f")} hint={syncT("upstreamUi.imageEnv", { value: env.comfyUrl })}>
          <input
            className={ui.input}
            value={images.comfyUrl}
            onChange={(event) => set({ comfyUrl: event.target.value })}
            placeholder={env.comfyUrl}
          />
        </Field>
        <ComfyModelField images={images} env={env} onChange={set} />
      </div>
    ),
    flux: (
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={syncT("upstreamUi.79de1abc9613")} hint={syncT("upstreamUi.imageFluxEnv", { value: env.fluxWorkerUrl })}>
          <input
            className={ui.input}
            value={images.fluxWorkerUrl}
            onChange={(event) => set({ fluxWorkerUrl: event.target.value })}
            placeholder={env.fluxWorkerUrl}
          />
        </Field>
      </div>
    ),
    openai: (
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label={syncT("upstreamUi.19a2455e9ca1")}
          hint={syncT("upstreamUi.010648e5997a")}
        >
          <input
            className={ui.input}
            value={images.openaiBaseUrl}
            onChange={(event) => set({ openaiBaseUrl: event.target.value })}
            placeholder="https://api.openai.com/v1"
          />
        </Field>
        <ModelChoiceField
          label={syncT("upstreamUi.5e2c614c23f0")}
          hint={syncT("upstreamUi.a0395d2cafbe")}
          role="image"
          provider="images"
          baseUrl={images.openaiBaseUrl}
          apiKey={openaiKey === SECRET_KEPT ? "" : openaiKey}
          value={images.openaiModel}
          onChange={(openaiModel) => set({ openaiModel })}
          blankLabel={env.openaiImageModel ? fromEnv(env.openaiImageModel, "OPENAI_IMAGE_MODEL") : BLANK.picture}
        />
        <SecretField
          label={syncT("upstreamUi.16f0ee47f993")}
          isSet={images.hasOpenaiApiKey}
          value={openaiKey}
          onChange={onOpenaiKey}
          hint={
            env.hasOpenaiImageApiKey
              ? syncT("upstreamUi.8c556fb0d927")
              : syncT("upstreamUi.6fcf0818e101")
          }
        />
        {!images.openaiModel.trim() && !env.openaiImageModel ? <NoPictureModel /> : null}
      </div>
    ),
  };

  const offered = (["comfyui", "flux", "openai"] as Group[]).filter((group) => !phoneWorld || group === "openai");
  const others = offered.filter((group) => group !== active);
  // A folded backend's fields are drawn once it is opened, so its pickers
  // do not ask a server (with the saved key) the admin is not using.
  const [opened, setOpened] = useState<Group[]>([]);

  return (
    <PageSection id="admin-images" heading="Image generation" glyph="ui-paint">
      <div className="mb-3">
        <SelectField<Images["defaultBackend"]>
          label={syncT("upstreamUi.861bcd854c7e")}
          hint={
            phoneWorld
              ? syncT("upstreamUi.f307867c22ba")
              : syncT("upstreamUi.9ed7cf36ecaf")
          }
          value={images.defaultBackend}
          onChange={(defaultBackend) => set({ defaultBackend })}
          options={[
            { value: "", label: syncT("upstreamUi.imageAuto", { backend: env.imageBackend || "ComfyUI" }) },
            ...(phoneWorld ? [] : [{ value: "comfyui" as const, label: syncT("upstreamUi.41fc85ad680e") }]),
            { value: "openai", label: syncT("upstreamUi.982ea3687458") },
            ...(phoneWorld
              ? []
              : [
                  { value: "mflux-hs" as const, label: syncT("upstreamUi.3434a7b5d41e") },
                  { value: "sdnq-hs" as const, label: syncT("upstreamUi.0c3ba0c77f22") },
                ]),
            // Only once the agent program has painted a real test picture.
            ...(harness?.images === "native" && harness.imagesVerifiedAt
              ? [{ value: "harness" as const, label: syncT("upstreamUi.32ab54d0fc3c") }]
              : []),
          ]}
        />
      </div>
      {active && offered.includes(active) ? (
        // Keyed, so picking another backend brings its block in.
        <div key={active} className="reveal">
          <h3 className="mb-2 text-sm font-medium text-stone-200">{GROUP_TITLE[active]}</h3>
          {blocks[active]}
        </div>
      ) : effective === "harness" ? (
        <p className="reveal text-xs text-stone-500">
          {syncT("upstreamUi.fbe6f2e01c6b")}</p>
      ) : null}
      {others.length ? (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-stone-500">{syncT("upstreamUi.3c62c1dfd039")}</p>
          {others.map((group) => (
            <details
              key={group}
              className="rounded-lg border border-stone-800 bg-stone-950/40 px-3 py-2"
              onToggle={(event) => {
                if (event.currentTarget.open && !opened.includes(group)) setOpened([...opened, group]);
              }}
            >
              <summary className="cursor-pointer text-sm text-stone-300">{GROUP_TITLE[group]}</summary>
              {opened.includes(group) ? <div className="mt-3">{blocks[group]}</div> : null}
            </details>
          ))}
        </div>
      ) : null}
    </PageSection>
  );
}
