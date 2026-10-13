// Display prose only: never modify the structured fields the engine reads.
export const MONSTER_PROSE_SECTIONS = [
  ["special_abilities", "Traits"], ["actions", "Actions"],
  ["bonus_actions", "Bonus Actions"], ["reactions", "Reactions"],
  ["legendary_actions", "Legendary Actions"],
] as const;
export function monsterProse(data: Record<string, unknown>): string {
  const blocks: string[] = [];
  for (const [field, label] of MONSTER_PROSE_SECTIONS) {
    const rows = data[field];
    const entries = Array.isArray(rows) ? rows.filter((row): row is { name: string; desc: string } =>
      !!row && typeof row === "object" && typeof row.name === "string" && typeof row.desc === "string" && !!row.desc.trim()) : [];
    const intro = field === "legendary_actions" && typeof data.legendary_desc === "string" ? data.legendary_desc.trim() : "";
    if (!entries.length && !intro) continue;
    blocks.push(`###### ${label}`);
    if (intro) blocks.push(intro);
    for (const row of entries) blocks.push(`***${row.name.replace(/\.$/, "")}***. ${row.desc}`);
  }
  return blocks.join("\n\n");
}
