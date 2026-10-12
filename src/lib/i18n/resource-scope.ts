// Heavy creator/help catalogs belong to the character and campaign routes.
// App chrome and stock identity labels are available on every page.
const CONTENT_PREFIXES = new Set([
  "monsterHandUi", "storyboardUi", "dmConsoleUi", "monsterUi", "encounterPrep", "dmField", "dmResult", "npcEditor", "dmAction", "dmToolsUi", "referenceMetrics", "referenceUi", "lineageUi", "lineageMaterial", "racialUi", "gameHelp", "closedHelp", "combatUi", "combatDetail", "combatRoll", "combatCheck", "combatSpecial", "cinematic", "sheetPlay", "sheetDialog",
  "boardUi", "boardOpsUi", "boardEffectsUi", "boardTools", "regionUi", "mapSceneUi", "mapEditorUi", "mapInspectUi", "mapLibraryUi", "mapForgeUi", "mapSurfaceUi", "diceTrayUi", "feedUi", "chatUi", "entryCharacter", "passageUi", "memoryUi", "recordUi", "leadUi", "marketUi", "storyControl", "storyUi", "callingUi", "callingMaterial", "abilityUi", "spellUi", "finishUi", "turnUi", "journalUi", "composeUi", "sessionUi", "handUi", "handMaterial",
  "spellName", "spellMaterial", "gearUi", "equipmentName", "magicItemName", "itemHelp", "builderPicker",
]);
export const MESSAGE_SCOPES = ["ui", "content", "help"] as const;
export type MessageScope = typeof MESSAGE_SCOPES[number];
export function messageScope(key: string): MessageScope {
  if (key.startsWith("appHelp.") || key.startsWith("workshopHelp.")) return "help";
  return CONTENT_PREFIXES.has(key.split(".", 1)[0]) ? "content" : "ui";
}
