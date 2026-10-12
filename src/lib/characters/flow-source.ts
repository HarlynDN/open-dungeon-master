import type { MessageKey } from "../i18n/translator.ts";

// Native rules/compatibility results still expose the original English. The
// source binding is checked against the same keys used by their UI projections.
// Keep this small metadata table free of runtime catalogs and active locale.
export const CHARACTER_FLOW_SOURCE = {
  "builderGate.name": "Give your character a name.",
  "builderGate.scores": "Assign all six ability scores first.",
  "builderGate.roll": "Rolled scores are the six totals thrown, each placed on one ability. Roll the dice, then place all six.",
  "builderGate.spellWarning": "{name} has no {casting} selected and will start unable to cast. Press again to continue anyway.",
  "builder.character": "This character",
  "abilityUi.errorRoll": "The server could not roll the dice. Try again.",
  "abilityUi.errorNetwork": "Could not reach the server to roll the dice.",
  "finishUi.rulesReadError": "This table's rules could not be read, so the numbers shown are the defaults.",
  "finishUi.rulesNetworkError": "Could not reach the server for this table's rules, so the numbers shown are the defaults.",
  "gearUi.errorWealth": "The server could not roll your starting wealth. Try again.",
  "gearUi.errorWealthNetwork": "Could not reach the server to roll your starting wealth.",
  "sheetPlay.dead": "Dead",
  "sheetPlay.stable": "Stable",
  "sheetPlay.dying.count": "Dying {successes}/{failures}",
  "sheetPlay.incapacitated": "Cannot act ({condition})",
  "sheetPlay.exhaustion": "Exhaustion {level}",
  "sheetPlay.concentration": "Concentrating: {spell}",
  "sheetPlay.readied": "Readied",
  "sheetPlay.inspiration": "Inspiration",
  "sheetDialog.edit.error.save": "Could not save the correction.",
  "sheetDialog.edit.error.network": "Could not reach the server.",
  "lineageUi.allAbilities": "ALL"
} as const satisfies Partial<Record<MessageKey, string>>;
export function characterFlowSource(key: keyof typeof CHARACTER_FLOW_SOURCE, values: Record<string, string | number> = {}): string {
  return CHARACTER_FLOW_SOURCE[key].replace(/\{(\w+)\}/g, (slot, name: string) => Object.hasOwn(values, name) ? String(values[name]) : slot);
}
