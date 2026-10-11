# Character sheet dialog and feature choices

This batch localizes the dialog's owned identity, vitals, derived parts, load,
wild-shape, slots, resource controls, equipment status, owed choices, private
notes and export-button copy. The six native subclass choices display translated
features/options while submitting their original English resource and variant
values. Generated action text follows campaign locale independently of personal
UI locale; the needed content catalog loads before the action is posted.

Known whole usage, attunement and dressing templates receive localized display.
Responses stay English and can rerender after a UI switch. Unknown diagnostics,
authored text, proper names and canonical item keys retain their source values.
Owed-choice matching requires numeric counts and native plural words so authored
sentences cannot be mistaken for a rule template.

There are 227 new `sheetDialog` keys, including 34 source-compared native resource
explanations. Chinese descriptions use player wording; original English model
guidance stays unchanged. The instant-death qualification for Relentless Endurance
was checked against `pc-damage.ts`. This is implementation-agent review of the
project's existing text and rules, not independent human review or copied book
translation. Root UI resources are unchanged.

Validation:

- 26 original English dialog/gear/choice renders frozen from `bf87a494` remain
  equal. All 11,404 prior bilingual values and 28 previous compressed baselines
  retain their values/bytes/checksums.
- Focused checks cover actual UI requests through the real usage handler: one
  slot payment remains paid when the cast resolves, and donning Plate advances
  the clock once by ten minutes. Six choice callbacks retain canonical values;
  proper names, private notes, restrictions and unknown text are checked.
- The initial consolidated batch passed all 530 script suites (329.65 seconds),
  full lint and default Turbopack build. The subsequent cold-client finding was
  reproduced before repair (no action submitted), then verified in an isolated
  process after repair. Final focused dialog checks (12), party checks (12),
  TypeScript, changed-file ESLint and a fresh production build pass. The full
  suite was not repeated after that focused client-loading/copy adjustment.
- Historical whole-file locks on `resource-scope.ts` were retired with their
  original hashes preserved: existing fixed key-to-scope projections still
  verify the old delivery boundaries. Three changed shared component hashes
  were updated only after original render and request comparisons; prior hashes
  remain recorded.

Only SheetChoices joins covered files. Full dialog/gear/party material remains
pending: 34/415 resource explanations are localized, with remaining resource
names/help, magic-item names, feature/feat material and Chinese PDF output still
needed. Browser deployment, complete play/save/resume and local speech are not
proved by these controlled renders and handler checks. Static inventory is
125/437 covered files, 3,262 pending literal sites and 5,929 keys; it is not an
overall completion percentage.
