# Chinese combat UI checkpoint — 2026-10-11

Pending-roll instructions, manual/digital/Pixels controls, Inspiration, check
verdicts, the encounter roster, initiative editing and board chrome now use a
typed `combatUi` namespace. Its 183 English/Chinese pairs live in content
resources; the root UI resource files and every pre-existing resource key/value
remain unchanged. Locale adapters keep canonical IDs, dice expressions, API
payloads and stored history independent of display names.

Implementation commit: `c89eec1a` (`feat(i18n): localize pending checks and combat
controls`). The goal remains active; this reviewable unit does not complete the
full release.

## Source comparison and compatibility

The translations are original drafts from the six repository JSX owners and
their API refusal text. The implementation agent reviewed health/death timing,
regeneration, nonlethal unconsciousness, advantage, action economy, distances,
CR fractions and confirmation consequences. This is source comparison, not
independent human approval.

`combat-ui-goldens.json.gz` preserves all 38 actual English component renders
captured before these edits. They were independently rerendered from the six
files at `b7217a84` and matched exactly. The SHA-256 of the uncompressed bytes is
`60b09271195c776a7b291647294e44d85692d41774a1f0a69b675a4446fdcd7a`.
No earlier golden was regenerated. The test renderer compiles the actual JSX;
device discovery, icons and confirmation dialogs are replaced by controlled
fixtures. It does not exercise hydration, shake hardware or Pixels connections.

Seven regression groups check:

- Exact English renders, bilingual controls and visible numeric quantities.
- Role-aware enemy labels, proper/authored names and immutable input data.
- Zero HP versus death, knockout versus dying, and regeneration timing.
- Raw error state that rerenders after language changes, including observer
  fallback controls and unknown-diagnostic handling.
- Actual manual dice, digital fallback, Inspiration and roll-preference button
  callbacks, with unchanged endpoints and payloads.
- Actual initiative reorder/rewind/insert and canonical target-ID callbacks.
- End/force confirmations, response failures and simulated network failures.

The display-only standing count now excludes downed, knocked-out or regenerating
members. This deliberately fixes an old English and Chinese roster error; it
does not alter an encounter, its HP or initiative rules. Network/HTTP failures
ending a fight or changing held-roll preferences are now visible instead of
being swallowed. Failed end attempts retain the existing explicit force-end
confirmation and do not retry a combat tool automatically.

Four owners are added to the covered manifest: `PendingRollCard`,
`SkillCheckCard`, `DmInitiativePanel` and `EncounterPanel`. Child components have
their own coverage states. `BoardChrome` and `RollCard` remain **pending**:
registry effect names/summaries, structured condition duration/source notes,
area/death-save detail variants and identity-safe target display still need work.
Unknown authored condition text remains verbatim rather than being replaced by
an unrelated stock translation. Coverage is now **121/437**, with **3466**
pending literal sites and **4746** total message keys. The AST count is not a
complete inventory of dynamic content or an overall delivery percentage.

## Production verification

The default Next 16.3.8 Turbopack `npm run build` completed successfully; build
ID `UhzioyN9_bcTuzdeDrJ_7` and new prerender/build manifests were inspected.
This supersedes the earlier default-build sandbox failure, without claiming
the alternate webpack path has been repaired.

A production server using a disposable encrypted database returned 200 for
anonymous and authenticated home, character and campaign pages. Header/cookie/
account locale precedence and the SSR content boundary passed. The in-app
browser switched Chinese → English → Chinese through the real picker, with a
reload in each language; page text and `html.lang` agreed. No console errors were
observed in that bounded browser check. The screenshot is outside Git.

[Page measurements](production-locale-pages.json) include Flight/HTML framing and
all initial script URLs per page. Chinese home was 327,210 decoded HTML bytes
and 2,924,069 initial JS bytes; the campaign page was 631,867 HTML bytes and
4,983,071 initial JS bytes. Computed gzip sizes are diagnostic, not measured
browser transfer sizes. These totals include the rest of the application;
they are not a before/after comparison or a claim that the whole app is small.
Hydrated/lazy requests, images/fonts, authenticated campaign switching and
active-play browser acceptance remain separate gates.

## Verification record

TypeScript, lint and generated resources passed. The first sandboxed full test
run could not bind a local HTTP listener (`EPERM`) and was terminated after
confirming the live worker and its waiting test. The first completed run with
local listening allowed passed 519/521 suites; the two failures were the old
`messages.ts` fingerprints in two calling review records. A subsequent run
passed 520/521 and identified the second record that still needed its fingerprint
updated. Every existing English/Chinese catalog value and all 17 previous golden
files/checksums were compared unchanged before updating that shared-entrypoint
fingerprint; reviewed calling source/catalog hashes and test assertions remain
intact. Targeted calling material, game-help and combat-UI suites then passed.
The final full run passed all **521 script suites** in 263.80 seconds. Results
and source hashes are recorded in `chinese-combat-ui-checks.json`.

This checkpoint does not establish real Chinese audio, complete Chinese play,
complete condition/roll detail localization or Chinese narration-guard recall.
The approved Codex backend and local single-narrator TTS requirements remain in
the active goal; TTS is still unconfigured.
