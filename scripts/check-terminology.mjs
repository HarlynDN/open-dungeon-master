import { MESSAGE_CATALOGS } from "../src/lib/i18n/messages.ts";
import { auditTerminology } from "../src/lib/i18n/terminology-audit.ts";
import { TERMINOLOGY } from "../src/lib/i18n/terminology.ts";
for (const locale of Object.keys(TERMINOLOGY).filter(locale => locale !== "en")) {
  const result = auditTerminology(MESSAGE_CATALOGS.en, MESSAGE_CATALOGS[locale], locale);
  for (const issue of result.errors) console.error(`ERROR ${locale}: ${issue.detail} (${issue.keys.join(", ")})`);
  const shown = process.argv.includes("--verbose") ? result.warnings : result.warnings.slice(0, 5);
  for (const issue of shown) console.warn(`WARN ${locale}: ${issue.detail}`);
  console.log(`Terminology ${locale}: ${TERMINOLOGY[locale].length} entries, ${result.errors.length} errors, ${result.warnings.length} context warnings${shown.length < result.warnings.length ? " (--verbose to list all)" : ""}.`);
  if (result.errors.length) throw new Error(`Terminology policy failed for ${locale}`);
}
