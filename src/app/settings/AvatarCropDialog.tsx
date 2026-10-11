"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { readUiResponse, requestErrorText, type UiRequestError } from "@/lib/i18n/api-errors";
import { accountRequestError } from "@/lib/i18n/account-presentations";

import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, Upload, X, ZoomIn } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { ui } from "@/lib/ui";
import { cn } from "@/lib/cn";
import { blobToDataUrl, exportCanvas } from "@/lib/image-encode";
import { Slider } from "@/components/ui/Slider";

// The familiar profile-picture flow: pick a file, pan/zoom a square crop,
// export 512x512, upload through the existing /api/upload route.

export type UploadedImage = {
  id: string;
  name: string;
  type: string;
  url: string;
};

async function cropToSquare(imageSrc: string, area: Area): Promise<{ dataUrl: string; type: string }> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error("Could not read the image."));
    element.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas unavailable.");
  }
  context.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, 512, 512);
  // WebP, or JPEG where the browser cannot write it (src/lib/image-encode.ts).
  const { blob, type } = await exportCanvas(canvas, { quality: 0.9 });
  return { dataUrl: await blobToDataUrl(blob), type };
}

export function AvatarCropDialog({
  title,
  onUploaded,
  onClose,
  saveFailureKey = "account.avatarSaveError",
}: {
  title: string;
  onUploaded: (image: UploadedImage) => void | boolean | Promise<void | boolean>;
  onClose: () => void;
  saveFailureKey?: import("@/lib/i18n/messages").MessageKey;
}) {
  const { locale, t } = useLocale();
  const [source, setSource] = useState("");
  const [fileName, setFileName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UiRequestError | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_area: Area, croppedAreaPixels: Area) => {
    setAreaPixels(croppedAreaPixels);
  }, []);

  async function pickFile(file: File | undefined) {
    if (!file) {
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError({ data: {}, fallback: "avatar.unsupported" });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError({ data: {}, fallback: "avatar.tooLarge" });
      return;
    }
    setError(null);
    try {
      const dataUrl = await blobToDataUrl(file);
      setFileName(file.name); setSource(dataUrl); setCrop({ x: 0, y: 0 }); setZoom(1);
    } catch (cause) { setError(accountRequestError(cause, "avatar.readError")); }
  }

  async function save() {
    if (!source || !areaPixels) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { dataUrl, type } = await cropToSquare(source, areaPixels);
      const data = await readUiResponse<UploadedImage>(fetch("/api/upload", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl, name: fileName || "avatar", type }),
      }), "avatar.uploadError");
      if (typeof data.url !== "string" || !data.url.startsWith("/uploads/")) throw new Error("Malformed upload response.");
      if (await onUploaded(data) === false) setError({ data: {}, fallback: saveFailureKey });
      else onClose();
    } catch (cause) { setError(accountRequestError(cause, "avatar.processError")); }
    finally {
      setBusy(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && !busy && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#05030d]/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(ui.dialog, "fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(92vw,22rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto")}
        >
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="gold-title font-display text-lg tracking-wide">{title}</Dialog.Title>
            <Dialog.Close disabled={busy} aria-label={t("avatar.close")} className="rounded-md p-1.5 text-stone-500 hover:bg-stone-800 hover:text-stone-300">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => pickFile(event.target.files?.[0])}
          />

          {source ? (
            <>
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-stone-950">
                <Cropper
                  image={source}
                  mediaProps={{ alt: t("avatar.image") }}
                  cropperProps={{ "aria-label": t("avatar.cropArea") }}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <ZoomIn className="size-4 text-stone-500" />
                <Slider
                  label={t("avatar.zoom")}
                  min={1}
                  max={4}
                  step={0.05}
                  value={zoom}
                  onChange={setZoom}
                  bubble={(value) => `${value.toFixed(1)}x`}
                  className="flex-1"
                />
              </div>
            </>
          ) : (
            <button
              type="button"
              disabled={busy}
                onClick={() => fileInput.current?.click()}
              className="motion-press flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-amber-500/30 bg-stone-950/40 text-sm text-stone-400 hover:border-amber-500/60 hover:text-amber-100"
            >
              <Upload className="size-5" />
              {t("avatar.choose")}
            </button>
          )}

          {error ? <p role="alert" className="motion-shake mt-2 text-xs text-ember-600">{requestErrorText(locale, error)}</p> : null}

          <div className="mt-4 flex justify-between gap-2">
            {source ? (
              <button
                type="button"
                disabled={busy}
                onClick={() => fileInput.current?.click()}
                className={ui.btnSmall}
              >
                {t("avatar.different")}
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button type="button" disabled={busy} onClick={onClose} className={ui.btnSmall}>
                {t("avatar.cancel")}
              </button>
              <button
                type="button"
                onClick={save}
                disabled={busy || !source || !areaPixels}
                className={ui.btnPrimary}
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : null} {t("avatar.save")}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
