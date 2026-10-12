// Native compatibility captions, bound to the existing translated rail/help catalogs.
export const MAP_MODE_SOURCE = {
  "brush": {
    "label": "Brush",
    "hint": "Drag to paint, one tile or a square of them."
  },
  "line": {
    "label": "Line",
    "hint": "Drag from one tile to another; the brush follows the straight line between them."
  },
  "rect": {
    "label": "Outline",
    "hint": "Drag a corner to the opposite corner; the brush draws the edge only."
  },
  "box": {
    "label": "Box",
    "hint": "Drag a corner to the opposite corner; the brush fills the whole box."
  },
  "fill": {
    "label": "Fill",
    "hint": "Tap once; every connected tile of the same kind takes the brush."
  },
  "stamp": {
    "label": "Stamp",
    "hint": "Rooms and corridors in one tap."
  },
  "pick": {
    "label": "Pick",
    "hint": "Tap a tile to pick up the brush that painted it."
  },
  "select": {
    "label": "Select",
    "hint": "Tap a placed thing to edit, move, copy or delete it. Shift-tap adds to the selection."
  },
  "light": {
    "label": "Light",
    "hint": "Tap a tile to put a light there, or take one away."
  },
  "door": {
    "label": "Door",
    "hint": "Tap a door: open, locked, secret."
  },
  "label": {
    "label": "Label",
    "hint": "Tap a tile to name it."
  },
  "prop": {
    "label": "Prop",
    "hint": "Tap a tile to put furniture or a bystander there."
  },
  "zone": {
    "label": "Light zone",
    "hint": "Drag a box of light or dark."
  },
  "roll": {
    "label": "Roll",
    "hint": "Roll the whole field from a seed. It lands in the history, so undo puts the old one back."
  },
  "pan": {
    "label": "Move",
    "hint": "Drag to move the map. Two fingers or the wheel zoom it."
  },
  "backdrop": {
    "label": "Align picture",
    "hint": "Drag the picture's corners into register with the grid."
  }
} as const;
export const MAP_HOTKEY_TITLES = ["Tools","Brushes","Editing"] as const;
export const MAP_EDIT_KEYS = [
  {
    "keys": [
      "Ctrl",
      "Z"
    ],
    "does": "Undo"
  },
  {
    "keys": [
      "Ctrl",
      "Shift",
      "Z"
    ],
    "does": "Redo"
  },
  {
    "keys": [
      "Esc"
    ],
    "does": "Put the tool down, or clear the selection"
  },
  {
    "keys": [
      "Del"
    ],
    "does": "Delete the selection"
  },
  {
    "keys": [
      "?"
    ],
    "does": "This sheet"
  }
];
