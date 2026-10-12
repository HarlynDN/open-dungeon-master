import type { ImportKind, LinkKind } from "./import-kinds.ts";

// Structured display metadata travels beside the original English diagnostic.
// Numeric facts and reference kinds stay native; the viewer supplies the locale.
export type ImportNoticeValues = {
  houseRules: Record<string, never>;
  arcExisting: { add: boolean };
  worldRecords: { kinds: ImportKind[] };
  regionMap: Record<string, never>;
  renamed: { count: number; kind: ImportKind };
  kept: { count: number; kind: ImportKind };
  copyAgain: { kind: ImportKind };
  encountersUnbound: { count: number };
  locationsUnbound: { count: number };
  homebrew: { count: number };
  markers: Record<string, never>;
  shopsUnplaced: { count: number };
  shopsUnkept: { count: number };
  shopsStock: { count: number; lines: number };
  boardLinks: { count: number; kind: LinkKind };
  boardMissing: { count: number };
  boardFights: { count: number };
  shared: { title: string; copied: number; reused: number };
  moments: { count: number };
  arcProblem: { reason: string };
  arcFull: Record<string, never>;
  arcRepeated: { count: number };
  arcRoom: { room: number; lost: number };
  arcAppend: { count: number; act: number; oldCount: number };
};
export type ImportNotice = {
  [Code in keyof ImportNoticeValues]: { code: Code; values: ImportNoticeValues[Code] }
}[keyof ImportNoticeValues];
