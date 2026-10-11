import React from "react";
import { openBuilder } from "./enforce-builder.mjs";

// Run the real grouping hook, including subclass gates and pack tiers. Only
// React's memo dispatcher is replaced; option order and identifiers are real.
export async function characterPickerUiFixtures(locale) {
  const builder = await openBuilder();
  const { usePickerGroups } = await import("../../src/app/characters/builder/usePickerGroups.ts");
  const fighter = builder.classes.find(row => row.id === "fighter");
  const wizard = builder.classes.find(row => row.id === "wizard");
  const base = { races: builder.races, rawRaces: builder.races, classes: builder.classes, rawClasses: builder.classes, backgrounds: builder.backgrounds, pack: null, klass: fighter, subclass: "", effectiveLevel: 1, archetypes: [] };
  const pack = { name: "云海{pack}\nWorld", alignments: ["LG", "CN", "invalid"], races: [{ id: "human" }], classes: [{ id: "fighter" }], backgrounds: [{ id: "soldier" }] };
  const bookRows = (rows, id) => [...rows, { ...rows.find(row => row.id === id), id: `external-${id}`, documentSlug: "external-book", source: "Authored {book}\nName" }];
  const fixtures = [
    ["core-locked", {}], ["core-unlocked", { effectiveLevel: 3, subclass: "Champion" }],
    ["wizard-unlocked", { klass: wizard, effectiveLevel: 2, subclass: "School of Evocation" }],
    ["pack-preferred", { pack }],
    ["pack-reskin", { pack, races: base.races.map(row => row.id === "human" ? { ...row, name: "云海{race}\nCitizen", packName: "云海{race}\nCitizen", packBlurb: "authored race prose" } : row), classes: base.classes.map(row => row.id === "fighter" ? { ...row, name: "云海{class}\nKeeper", packName: "云海{class}\nKeeper" } : row), backgrounds: base.backgrounds.map(row => row.id === "soldier" ? { ...row, name: "云海{background}\nSoldier", packName: "云海{background}\nSoldier" } : row) }],
    ["pack-no-preferences", { pack: { ...pack, races: [], classes: [], backgrounds: [], alignments: [] } }],
    ["genre-dark", { genre: "dark_fantasy" }], ["genre-mystery", { genre: "mystery" }],
    ["genre-custom", { genre: "custom" }], ["genre-high", { genre: "high_fantasy" }],
    ["book-groups", { races: bookRows(base.races, "human"), classes: bookRows(base.classes, "fighter"), backgrounds: bookRows(base.backgrounds, "soldier") }],
    ["archetypes-locked", { archetypes: [{ id: "cloud", name: "Authored {archetype}\nCloud", desc: "source write-up" }] }],
    ["archetypes-open", { effectiveLevel: 3, subclass: "Champion", archetypes: [{ id: "champion", name: "Champion", desc: "original champion write-up" }, { id: "cloud", name: "Authored {archetype}\nCloud", desc: "source write-up" }] }],
  ];
  const internals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  const previous = internals.H;
  internals.H = { useMemo: compute => compute() };
  try {
    return fixtures.map(([name, overrides]) => {
      const input = { ...base, ...overrides, ...(locale ? { locale } : {}) };
      return { name, input, output: usePickerGroups(input) };
    });
  } finally { internals.H = previous; }
}
