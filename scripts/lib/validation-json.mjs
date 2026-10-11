import { existsSync, readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import path from "node:path";

// Golden bytes are losslessly compressed, never regenerated from new code.
// Their pre-repair SHA-256 is checked every time a compressed baseline loads.
export function readValidationJson(file) {
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const bytes = gunzipSync(readFileSync(`${file}.gz`));
  const manifest = JSON.parse(readFileSync(path.join(path.dirname(file), "golden-integrity.json"), "utf8"));
  if (createHash("sha256").update(bytes).digest("hex") !== manifest[path.basename(file)]) {
    throw new Error(`Original golden checksum mismatch: ${file}`);
  }
  return JSON.parse(bytes.toString("utf8"));
}
