// English source metadata. UI labels are projected without changing scope IDs.
export const AGENT_SCOPE_CHOICES: Array<{ id: string; label: string; hint: string }> = [
  { id: "read", label: "Read", hint: "Your campaigns, characters, quests and lore, as you see them." },
  { id: "play", label: "Play", hint: "Act, speak and roll at a table as your character." },
  { id: "characters", label: "Characters", hint: "Create, edit and delete your library characters." },
  { id: "campaigns", label: "Campaigns", hint: "Create campaigns and change the ones you lead." },
  { id: "dm", label: "Dungeon Master", hint: "Run the rules engine and narrate, only where you hold the DM seat." },
];


export const THEME_CHOICES = [
  { id: "auto", label: "Follow the system", glyph: "daypart-dusk" },
  { id: "dark", label: "Arcane night", glyph: "daypart-night" },
  { id: "light", label: "Parchment day", glyph: "daypart-day" },
] as const;
