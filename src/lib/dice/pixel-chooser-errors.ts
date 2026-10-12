// Stable signal emitted only by the Bluetooth chooser, not later GATT work.
export const PIXEL_SELECTION_CANCELLED = "PixelSelectionCancelled";
export function pixelChooserFailure(cause: unknown): unknown {
  const name = cause && typeof cause === "object" && "name" in cause ? cause.name : "";
  if (name !== "NotFoundError" && name !== "AbortError") return cause;
  const cancelled = new Error("The die selection was cancelled.");
  cancelled.name = PIXEL_SELECTION_CANCELLED;
  return cancelled;
}
