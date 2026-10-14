import { existsSync, readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import path from "node:path";

// Golden bytes are losslessly compressed, never regenerated from new code.
// Their pre-repair SHA-256 is checked every time a compressed baseline loads.
// Reviewed upstream snapshots are separate, versioned and checksum-bound;
// the original archive stays intact and is verified before selecting one.
export function readValidationJson(file) {
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const bytes = gunzipSync(readFileSync(`${file}.gz`));
  const manifest = JSON.parse(readFileSync(path.join(path.dirname(file), "golden-integrity.json"), "utf8"));
  if (createHash("sha256").update(bytes).digest("hex") !== manifest[path.basename(file)]) {
    throw new Error(`Original golden checksum mismatch: ${file}`);
  }
  const reviewFile = path.join(path.dirname(file), "upstream-027-goldens.json");
  const review = existsSync(reviewFile) ? JSON.parse(readFileSync(reviewFile, "utf8")).snapshots[path.basename(file)] : null;
  if (review) {
    if (createHash("sha256").update(bytes).digest("hex") !== review.originalSha256) throw new Error(`Upstream review original mismatch: ${file}`);
    const updated = gunzipSync(readFileSync(path.join(path.dirname(file), review.file)));
    if (createHash("sha256").update(updated).digest("hex") !== review.sha256) throw new Error(`Reviewed upstream golden checksum mismatch: ${file}`);
    return JSON.parse(updated.toString("utf8"));
  }
  return JSON.parse(bytes.toString("utf8"));
}
