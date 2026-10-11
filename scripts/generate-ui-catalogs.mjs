// Source catalogs remain co-located and compile-time complete. Generate the
// language/scope payloads for SSR and lazy language switching, or check drift.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { MESSAGE_CATALOGS } from "../src/lib/i18n/messages.ts";
import { messageScope, MESSAGE_SCOPES } from "../src/lib/i18n/resource-scope.ts";
const check = process.argv.includes("--check");
const dir = new URL("../src/lib/i18n/resources/", import.meta.url);
if (!check) mkdirSync(dir, { recursive: true });
for (const [locale, messages] of Object.entries(MESSAGE_CATALOGS)) {
  for (const scope of MESSAGE_SCOPES) {
    const content = JSON.stringify(Object.fromEntries(Object.entries(messages).filter(([key]) => messageScope(key) === scope))) + "\n";
    const file = new URL(`${locale}.${scope}.json`, dir);
    if (check) {
      if (readFileSync(file, "utf8") !== content) throw new Error(`Stale locale resource: ${file.pathname}`);
    } else writeFileSync(file, content);
  }
}
console.log(`Locale resources ${check ? "verified" : "generated"}.`);
