// English compatibility templates for the pure gate's default callers. The
// checker binds each to the existing complete multilingual compose catalog.
export const COMPOSER_GATE_SOURCE = {
  opening: "The Dungeon Master is setting the scene... (OOC still open)",
  enemies: "The enemies are taking their turns... (OOC still open)",
  hold: "The party lead has the floor held for discussion... (OOC still open)",
  turn: "{name}'s turn in combat... (OOC still open)",
  waiting: "Waiting on {names}... (OOC still open)",
  do: "What does {name} do?",
  say: "What does {name} say?",
  narrate: "Narrate the scene. The server still rolls every die.",
  ooc: "Out-of-character note to the table",
  private: "Tell the DM privately what to do with the next turn",
  lead: "Steer the story: a direction the DM must weave in",
} as const;
export type ComposerGatePhase = keyof typeof COMPOSER_GATE_SOURCE;
