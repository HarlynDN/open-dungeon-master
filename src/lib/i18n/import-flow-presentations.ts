import type { AppLocale } from "./locales.ts";
import { createTranslator, type MessageKey } from "./translator.ts";
import type { ImportNoticeValues } from "../workshop/import-notices.ts";
import type { ImportWarning } from "../workshop/import-kinds.ts";
import { storyboardSummary } from "./storyboard-ui-presentations.ts";
import { entryNotice } from "./entry-ui-presentations.ts";

// Every native planner code has a display key. More locales use the same
// metadata; authored titles, reference IDs and the original diagnostic survive.
const NOTICE_KEYS = {
  houseRules: "importFlow.houseRules", arcExisting: "importFlow.arcExisting",
  worldRecords: "importFlow.worldRecords", regionMap: "importFlow.regionMap",
  renamed: "importFlow.renamed", kept: "importFlow.kept", copyAgain: "importFlow.copyAgain",
  encountersUnbound: "importFlow.encountersUnbound", locationsUnbound: "importFlow.locationsUnbound",
  homebrew: "importFlow.homebrew", markers: "importFlow.markers",
  shopsUnplaced: "importFlow.shopsUnplaced", shopsUnkept: "importFlow.shopsUnkept", shopsStock: "importFlow.shopsStock",
  boardLinks: "importFlow.boardLinks", boardMissing: "importFlow.boardMissing", boardFights: "importFlow.boardFights",
  shared: "importFlow.shared", moments: "importFlow.moments", arcProblem: "importFlow.arcProblem",
  arcFull: "importFlow.arcFull", arcRepeated: "importFlow.arcRepeated", arcRoom: "importFlow.arcRoom", arcAppend: "importFlow.arcAppend",
} as const satisfies Record<keyof ImportNoticeValues, MessageKey>;

export function importWarningText(warning: ImportWarning, locale: AppLocale): string {
  const notice = warning.presentation;
  if (locale === "en" || !notice || !Object.hasOwn(NOTICE_KEYS, notice.code)) return warning.message;
  const t = createTranslator(locale);
  let values: Record<string, string | number>;
  switch (notice.code) {
    case "arcExisting": values = { add: notice.values.add ? t("importFlow.addArc") : "" }; break;
    case "worldRecords": values = { kinds: notice.values.kinds.map(kind => t(`import.kind.${kind}`)).join(t("importFlow.list")) }; break;
    case "renamed": case "kept": case "copyAgain": case "boardLinks":
      values = { ...notice.values, kind: t(`import.kind.${notice.values.kind}`) }; break;
    case "shared": {
      const { title, copied, reused } = notice.values;
      values = { title, items: [copied ? t("importFlow.sharedCopied", { count: copied }) : "", reused ? t("importFlow.sharedReused", { count: reused }) : ""].filter(Boolean).join(t("importFlow.list")) };
      break;
    }
    case "arcProblem": values = { reason: storyboardSummary({ lines: [], arcRefusal: notice.values.reason, total: 0 }, locale).refusal }; break;
    default: values = notice.values;
  }
  return t(NOTICE_KEYS[notice.code], values);
}

export const IMPORT_ERRORS = {
  loadFailed: "Could not load import sources.", planFailed: "Could not preview this import.",
  failed: "Could not import.", network: "Could not reach the server.",
} as const;
const ERROR_KEYS = {
  [IMPORT_ERRORS.loadFailed]: "importFlow.loadFailed", [IMPORT_ERRORS.planFailed]: "importFlow.planFailed",
  [IMPORT_ERRORS.failed]: "importFlow.failed", [IMPORT_ERRORS.network]: "importFlow.network",
  "Not found.": "importFlow.notFound", "Source not found.": "importFlow.notFound",
  "Nothing can import into itself.": "importFlow.self",
  "Invalid preview.": "importFlow.planFailed", "Invalid import.": "importFlow.failed",
  "Only the person steering the story can import prep.": "importFlow.authority",
} as const satisfies Record<string, MessageKey>;
export function importErrorText(raw: string, locale: AppLocale): string {
  const key = Object.hasOwn(ERROR_KEYS, raw) ? ERROR_KEYS[raw as keyof typeof ERROR_KEYS] : undefined;
  return key ? createTranslator(locale)(key) : entryNotice(raw, locale);
}

export type ImportReceipt = { copied: number; kept?: number; beatsAdded?: number; unresolved?: string[]; worldConflicts?: string[] };
function conflictText(raw: string, locale: AppLocale): string {
  if (locale === "en") return raw;
  const t = createTranslator(locale);
  // Match only the full native suffix; the relationship and optional rank
  // before it are authored, so neither is translated or scanned for keywords.
  const gone = /^([\s\S]+): gone from the import, but changed here; yours was kept\.$/.exec(raw);
  if (gone) return t("importFlow.conflictGone", { link: gone[1] });
  const changed = /^([\s\S]+): changed here and in the import \(which says (known|hidden|believed)((?:, [\s\S]+)?)\); yours was kept\.$/.exec(raw);
  if (changed) {
    const directional = changed[3].endsWith(", one way");
    const rank = (directional ? changed[3].slice(0, -9) : changed[3]).replace(/^, /, "");
    return t("importFlow.conflictChanged", { link: changed[1], veracity: t(`importFlow.veracity.${changed[2]}` as MessageKey), rank: rank ? t("importFlow.rank", { rank }) : "", oneway: directional ? t("importFlow.oneway") : "" });
  }
  return raw;
}
export function importReceiptText(receipt: ImportReceipt, locale: AppLocale): string {
  const t = createTranslator(locale);
  return [
    t(receipt.copied === 1 ? "importFlow.copiedOne" : "importFlow.copied", { count: receipt.copied }),
    receipt.kept ? t("importFlow.receiptKept", { count: receipt.kept }) : "",
    receipt.beatsAdded ? t(receipt.beatsAdded === 1 ? "importFlow.beatsAddedOne" : "importFlow.beatsAdded", { count: receipt.beatsAdded }) : "",
    receipt.unresolved?.length ? t("importFlow.unresolved", { names: receipt.unresolved.join(", ") }) : "",
    receipt.worldConflicts?.length ? t("importFlow.conflicts", { items: receipt.worldConflicts.map(raw => conflictText(raw, locale)).join(" ") }) : "",
  ].filter(Boolean).join(" ");
}
