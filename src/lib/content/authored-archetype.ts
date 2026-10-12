export type AuthoredArchetype = {
  desc: string;
  levels: Record<string, Array<{ n: string; d: string }>>;
  spells?: Record<string, string[]>;
};

// The published English source, shared by the importer and display recognition.
// Locale projections never alter the imported content or mechanical tables.
export function authoredArchetypeDescription(entry: AuthoredArchetype): string {
  const levels = Object.entries(entry.levels)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([level, features]) => `**Level ${level}.** ` +
      features.map(feature => `*${feature.n}.* ${feature.d}`).join(" "))
    .join("\n\n");
  const spells = entry.spells
    ? "\n\n**Always-prepared spells.** " + Object.entries(entry.spells)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([level, names]) => `Level ${level}: ${names.join(", ")}.`).join(" ")
    : "";
  return `${entry.desc}\n\n${levels}${spells}`;
}
