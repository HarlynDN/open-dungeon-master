// Heavy creator/help catalogs belong to the character and campaign routes.
// App chrome and stock identity labels are available on every page.
const CONTENT_PREFIXES = new Set([
  "lineageUi", "lineageMaterial", "racialUi", "gameHelp", "closedHelp", "combatUi", "combatDetail", "combatRoll", "combatCheck", "combatSpecial", "cinematic", "sheetPlay",
  "callingUi", "callingMaterial", "abilityUi", "spellUi", "finishUi",
  "spellName", "spellMaterial", "gearUi", "equipmentName", "itemHelp", "builderPicker",
]);
export type MessageScope = "ui" | "content";
export function messageScope(key: string): MessageScope {
  return CONTENT_PREFIXES.has(key.split(".", 1)[0]) ? "content" : "ui";
}
