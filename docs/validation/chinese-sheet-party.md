# Sheet state and party controls

This checkpoint advances the Chinese play flow. Full character-sheet and party
dialog flows, browser acceptance and local speech remain incomplete.

## Display and rule boundaries

- Sheet state chips, defenses, movement notes, HP-limit notes, charges, hit-die
  controls and known refusal messages have locale-aware presentation.
- Owned party-card copy, accessibility labels, native race/class names,
  concentration, typed condition references, 34 core resource names, beast-form
  names and light timers display in Chinese.
- Visible enemy references use their creature display names. `Goblin` means
  `哥布林`; the fictional language is `哥布林语`. A player or proper NPC named
  `Goblin`, authored triggers and unfamiliar resource names remain literal.
  Hidden identities cannot be disclosed by translating a condition note.
- Rolled level-up HP dice receive an optional public caption context containing
  level and die size. Original English details, expressions, results and
  progression checks stay intact. Historical rolls are not reinterpreted.
- Display changes preserve numeric HP, movement, death counts, resources and
  slots. Actual controls send the original IDs and payloads. Hit-die results
  stay structured or retain the source response, so switching UI language can
  rerender an existing result without repeating a request.

The new 149 `sheetPlay` templates and one level-up template belong to content
resources; root UI resources are unchanged. All 11,104 prior bilingual resource
values and all 27 previous compressed baselines remain exact.

## Evidence and limits

`sheet-party-translations.json` records source comparison by the implementation
agent, rather than independent human approval. Chinese copy was compared to
the original component/helper/route wording and existing terminology. No
proprietary translated rulebook prose was used.

The 6,867-byte compressed baseline from `5599665c` preserves 32 original English
renders, 11 state views and the original rolled-level call contract. It has an
immutable SHA-256 entry in `golden-integrity.json`; it was not regenerated from
the localized implementation.

`test-chinese-sheet-party.mjs` adds 12 checks. Actual JSX controls exercise
callbacks, disabled states, canonical payloads, locale switching and Chinese
IME protection. Scratch-database tests use the real hit-die and level-up routes,
verify one roll/heal/progression, reject an unearned level and reopen persisted
caption data. Unrelated dialogs, tooltips and hardware discovery are stubbed;
these renders do not prove their full behavior or an authenticated browser flow.
No real Codex narrative or audio request is made by this checkpoint.

All 528 script suites pass (274.65 seconds). Independent TypeScript, lint and
the default Next 16.3.8 Turbopack production build pass. Lint retains 12 existing
ESLint warnings; terminology has 257 entries, no errors and 73 contextual
warnings requiring review. The build retains 24 existing dynamic filesystem
warnings. Commands and results are recorded in the adjacent JSON review record.

## Remaining gates

Only `SheetState.tsx` joins the covered UI manifest. `PartyPanel`, the full
`CharacterSheetDialog`, `SheetCounters`, `SheetChoices`, `SheetParts` and the
remaining sheet helpers stay pending for their untranslated native resource
guidance, caller-owned names/disabled-action notes, feature choices, dialog copy
or other dynamic material. The 415 native resource definitions include many
subclass/genre entries beyond the 34 names reviewed here.

Static UI coverage is **124/437** files, with **3354** pending literal sites and
**5702** message keys. File coverage is not overall completion or an estimate of
remaining effort. Native attack/reaction frames, wider play UI/player logs,
configured Codex full-play/save-resume and English regression, and real local
single-narrator Chinese TTS remain part of the active goal.
