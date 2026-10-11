// Stable topic identities, separate from lazy translated payloads.
export const HELP_TOPICS = [
  {
    "canonical": "Guided tours",
    "key": "appHelp.fragment.1",
    "glyph": "pace-normal"
  },
  {
    "canonical": "Getting started",
    "key": "appHelp.fragment.3",
    "glyph": "tab-context"
  },
  {
    "canonical": "The lobby",
    "key": "appHelp.fragment.10",
    "glyph": "tab-party"
  },
  {
    "canonical": "Talking to the DM",
    "key": "appHelp.fragment.12",
    "glyph": "tab-chat"
  },
  {
    "canonical": "Your hand in a fight",
    "key": "appHelp.fragment.34",
    "glyph": "tab-battle"
  },
  {
    "canonical": "When the DM gets it wrong",
    "key": "appHelp.fragment.42",
    "glyph": "rest-concentration-break"
  },
  {
    "canonical": "What the DM remembers",
    "key": "appHelp.fragment.55",
    "glyph": "tab-facts"
  },
  {
    "canonical": "The side panel",
    "key": "appHelp.fragment.66",
    "glyph": "tab-session"
  },
  {
    "canonical": "Dice",
    "key": "appHelp.fragment.83",
    "glyph": "die-d20"
  },
  {
    "canonical": "Voice and narration",
    "key": "appHelp.fragment.94",
    "glyph": "tab-story"
  },
  {
    "canonical": "Live voice chat",
    "key": "appHelp.fragment.96",
    "glyph": "cue-horn"
  },
  {
    "canonical": "Ambience and music",
    "key": "appHelp.fragment.105",
    "glyph": "tab-ambience"
  },
  {
    "canonical": "Playing with a human DM",
    "key": "appHelp.fragment.108",
    "glyph": "tab-dm"
  },
  {
    "canonical": "Party lead",
    "key": "appHelp.fragment.120",
    "glyph": "tab-lead"
  },
  {
    "canonical": "Campaign plugins",
    "key": "appHelp.fragment.125",
    "glyph": "system-plugin"
  },
  {
    "canonical": "New to D&D?",
    "key": "appHelp.fragment.131",
    "glyph": "tab-story"
  },
  {
    "canonical": "About",
    "key": "appHelp.fragment.138",
    "glyph": "system-lore"
  }
] as const;

// Small source bindings avoid loading an entire second help language.
export const HELP_TOURS = [
  {
    "label": "Tour the table",
    "detail": "How a player takes a turn, asks the DM, and finds the party, the story and the maps.",
    "labelKey": "appHelp.tour.table.label",
    "detailKey": "appHelp.tour.table.detail"
  },
  {
    "label": "Tour the DM console",
    "detail": "The floor, story beats, hand-over switches, the queue and the tools.",
    "labelKey": "appHelp.tour.dm.label",
    "detailKey": "appHelp.tour.dm.detail"
  }
] as const;
