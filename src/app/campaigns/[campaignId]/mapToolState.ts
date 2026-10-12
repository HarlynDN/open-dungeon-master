import { MAP_MODE_SOURCE, MAP_HOTKEY_TITLES, MAP_EDIT_KEYS } from "@/lib/i18n/map-tool-metadata";
import {
  Armchair,
  Brush as BrushIcon,
  DoorClosed,
  Dices,
  Flame,
  Hand,
  Minus,
  MousePointer2,
  PaintBucket,
  Pipette,
  Shapes,
  Square,
  SquareDashed,
  Sun,
  Tag,
  type LucideIcon,
  Image as ImageIcon,
} from "lucide-react";
import { BRUSH_LABELS, type Brush as BrushName } from "@/lib/battlemap/paint";
import type { ZoneKind } from "@/lib/battlemap/scene";
import type { StampKind } from "@/lib/battlemap/stamp";
import { type ShapeTool } from "@/lib/battlemap/tools";
import type { AmbientLight } from "@/lib/battlemap/types";
import type { CanvasTool } from "@/app/campaigns/[campaignId]/TerrainCanvas";

// The map editor's toolbox: which tool is in hand, and the dials for it.
// The state, the modes and the keys live here, in a module with no JSX and no
// hooks so scripts/test-map-editor.mjs can hold the rail to the ledger under
// Node; the key handler is MapToolbox.tsx, the rail that shows the modes is
// MapRail.tsx and the dials are MapOptions.tsx.
//
// One state shape for the studio and the library, so a DM who picks the
// water brush and then clicks through three maps is still holding the
// water brush. Nothing here touches a map: the toolbox says what the next
// pointer press means, and the canvas reports it.

export type ToolMode =
  | "brush"
  | "line"
  | "rect"
  | "box"
  | "fill"
  | "stamp"
  | "light"
  | "label"
  | "prop"
  | "door"
  | "zone"
  | "pick"
  | "pan"
  | "select"
  | "backdrop"
  // Roll the whole field from a seed. It holds nothing on the canvas: the
  // options column shows the forge controls instead.
  | "roll"
  | "";

export type MapTools = {
  mode: ToolMode;
  brush: BrushName;
  // Square brush, in tiles either side of the centre. 0 paints one tile.
  radius: number;
  stamp: StampKind;
  stampSize: { width: number; height: number };
  light: { brightRadius: number; dimRadius: number };
  label: { text: string; dmOnly: boolean };
  // `stamp` is the painted object the next prop is drawn as, if one was picked.
  prop: { name: string; kind: "prop" | "npc"; stamp?: string };
  zone: AmbientLight;
  // Ordinary light, plain darkness, or magical darkness nothing pierces.
  zoneKind: ZoneKind;
};

export const DEFAULT_MAP_TOOLS: MapTools = {
  mode: "",
  brush: "wall",
  radius: 0,
  stamp: "room",
  stampSize: { width: 5, height: 4 },
  light: { brightRadius: 4, dimRadius: 8 },
  label: { text: "", dmOnly: false },
  prop: { name: "", kind: "prop" },
  zone: "dark",
  zoneKind: "light",
};

// What this surface can hold. The library holds everything; the live board
// holds no props (they are tokens there) and no lights yet.
export type SurfaceCaps = { lights: boolean; props: boolean; scene: boolean };
export const LIBRARY_CAPS: SurfaceCaps = { lights: true, props: true, scene: true };
export const BOARD_CAPS: SurfaceCaps = { lights: false, props: false, scene: true };

export const SHAPE_MODES: ReadonlyArray<ShapeTool> = ["line", "rect", "box", "fill"];

export function isPaintMode(mode: ToolMode): boolean {
  return mode === "brush" || SHAPE_MODES.includes(mode as ShapeTool);
}

export function canvasToolFor(tools: MapTools, caps: SurfaceCaps): CanvasTool | null {
  switch (tools.mode) {
    case "brush":
      return { kind: "brush", brush: tools.brush, radius: tools.radius };
    case "line":
    case "rect":
    case "box":
    case "fill":
      return { kind: "shape", tool: tools.mode, brush: tools.brush };
    case "stamp":
      return { kind: "stamp", stamp: { kind: tools.stamp, ...tools.stampSize } };
    case "light":
      return caps.lights ? { kind: "light", ...tools.light } : null;
    case "label":
      return caps.scene ? { kind: "label" } : null;
    case "prop":
      return caps.props ? { kind: "prop" } : null;
    case "door":
      return caps.scene ? { kind: "door" } : null;
    case "zone":
      return caps.scene ? { kind: "zone", ambient: tools.zone, zoneKind: tools.zoneKind } : null;
    case "pick":
      return { kind: "pick" };
    case "pan":
      return { kind: "pan" };
    case "select":
      return { kind: "select" };
    case "backdrop":
      return { kind: "backdrop" };
    default:
      return null;
  }
}

// The keys, in the order the chips show them. Written for the title text,
// which is how a person on a desk finds out they exist; on a phone the
// chips are the only way in and that is fine.
export type ModeGroup = "paint" | "scene" | "other";
export type ModeEntry = (typeof MODES)[number];

export const MODES: ReadonlyArray<{
  mode: ToolMode;
  label: string;
  key: string;
  icon: LucideIcon;
  hint: string;
  needs?: keyof SurfaceCaps;
  group: ModeGroup;
}> = [
  { mode: "brush", ...MAP_MODE_SOURCE.brush, key: "B", icon: BrushIcon, group: "paint" },
  { mode: "line", ...MAP_MODE_SOURCE.line, key: "L", icon: Minus, group: "paint" },
  { mode: "rect", ...MAP_MODE_SOURCE.rect, key: "R", icon: SquareDashed, group: "paint" },
  { mode: "box", ...MAP_MODE_SOURCE.box, key: "X", icon: Square, group: "paint" },
  { mode: "fill", ...MAP_MODE_SOURCE.fill, key: "F", icon: PaintBucket, group: "paint" },
  { mode: "stamp", ...MAP_MODE_SOURCE.stamp, key: "S", icon: Shapes, group: "paint" },
  { mode: "pick", ...MAP_MODE_SOURCE.pick, key: "I", icon: Pipette, group: "paint" },
  { mode: "select", ...MAP_MODE_SOURCE.select, key: "V", icon: MousePointer2, needs: "scene", group: "scene" },
  { mode: "light", ...MAP_MODE_SOURCE.light, key: "T", icon: Flame, needs: "lights", group: "scene" },
  { mode: "door", ...MAP_MODE_SOURCE.door, key: "D", icon: DoorClosed, needs: "scene", group: "scene" },
  { mode: "label", ...MAP_MODE_SOURCE.label, key: "A", icon: Tag, needs: "scene", group: "scene" },
  { mode: "prop", ...MAP_MODE_SOURCE.prop, key: "P", icon: Armchair, needs: "props", group: "scene" },
  { mode: "zone", ...MAP_MODE_SOURCE.zone, key: "Z", icon: Sun, needs: "scene", group: "scene" },
  { mode: "roll", ...MAP_MODE_SOURCE.roll, key: "N", icon: Dices, group: "other" },
  { mode: "pan", ...MAP_MODE_SOURCE.pan, key: "M", icon: Hand, group: "other" },
  { mode: "backdrop", ...MAP_MODE_SOURCE.backdrop, key: "K", icon: ImageIcon, group: "other" },
];

// The sheet the `?` key opens (src/components/ui/HotkeyOverlay.tsx).
export function mapHotkeyGroups(caps: SurfaceCaps) {
  const chips = MODES.filter((entry) => !entry.needs || caps[entry.needs]);
  return [
    { title: MAP_HOTKEY_TITLES[0], rows: chips.map((entry) => ({ keys: [entry.key], does: entry.label })) },
    {
      title: MAP_HOTKEY_TITLES[1],
      rows: Object.entries(BRUSH_KEYS).map(([key, brush]) => ({ keys: [key], does: BRUSH_LABELS[brush] })),
    },
    {
      title: MAP_HOTKEY_TITLES[2],
      rows: MAP_EDIT_KEYS.map(row => ({ ...row, keys: [...row.keys] })),
    },
  ];
}

export const BRUSH_KEYS: Record<string, BrushName> = {
  "1": "floor",
  "2": "wall",
  "3": "water",
  "4": "difficult",
  "5": "door",
  "6": "lowwall",
  "7": "climb",
};
