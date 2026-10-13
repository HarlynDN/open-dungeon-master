# Simplified Chinese development plan

This is the active delivery plan. Implementation history remains in Git and the
linked validation reports; it is not repeated here. The full playable flow is
still incomplete. Delivery follows the latest approved text scope below.

## Approved scope and boundaries

- Simplified Chinese (`zh-CN`) with an English switch, extensible locale registry.
- User-selected terminology: Goblin is “哥布林”, including “哥布林语” for the
  fictional language. “地精” remains an accepted monster-input alias. Gnomish,
  Bugbear and Hobgoblin remain separate glossary entries.
- Personal `uiLocale` and campaign `locale` stay separate from fictional languages.
  UI captions read the viewer locale through `useLocale`; `content` is a resource
  delivery scope, not a campaign-language override. Generation and explicit
  campaign action boundaries continue to use campaign `locale`.
- Existing URLs, historical messages, canonical IDs/rule names/tool protocols stay
  intact; old campaigns without a locale remain English. New campaign defaults
  follow the creator only when no explicit campaign locale was supplied.
- Initial UI preference uses account, cookie, then browser language. All Chinese
  browser variants map to the only supported Chinese locale, Simplified Chinese.
- Real DM/utility acceptance uses the user's Codex CLI subscription and current
  model configuration. Chinese voice work is now deferred by the user.
- Full bundled rulebook text is now in scope under the latest instruction below.
- Defer third-party expansion prose and Chinese voice work; keep earlier speech
  evidence as historical results rather than requirements for the text milestone.

## Latest user scope — text completion, then pause (2026-10-13)

The latest text-scope instruction governs delivery and acceptance. Finish Chinese text for the game itself and the entire bundled SRD 5.1 rulebook, then pause the active task. Third-party expansion-pack translation and Chinese voice work are deferred and are no longer gates for this text milestone. Preserve their existing implementations and honest evidence, including rejected voice quality. Do not pause before the requested text scope is finished.

Text delivery includes native interface/system/help text and repository-owned materials, plus all 933 bundled rulebook pages (319 spells and 239 magic items included), chapter/part navigation, tables and Chinese search/display. Existing material translations should be reused wherever the full source matches; the remaining rulebook chapters and monster text need original source-bound translations. Keep English available, preserve canonical mechanics/IDs and authored or third-party variants, and retain source/license attribution. Player and DM rulebook views must both use translated presentation; translation does not change model-facing machine protocols. User-authored campaign prose and imported third-party text retain their source.

Before pausing, finish the native dynamic text audit and one bilingual text journey, then run the required full tests/lint/build once at the final boundary. The former voice and third-party acceptance gaps must be recorded as deferred rather than falsely marked passed.

## Terminology alignment — approved 2026-10-13

Use [5etools Chinese terminology lookup](https://5e.kiwee.top/terms.html)
as a terminology reference, prioritizing 2014 / SRD 5.1 and reviewed entries.
Match each candidate by English identity and source edition; do not infer rule
compatibility from a matching Chinese name. The site mixes editions and marks
unreviewed machine translations, so unverified entries remain candidates.

Resolve conflicts in the existing `src/lib/i18n/glossary.zh-CN.ts` policy and
its consumers within each prose delivery unit, with common search/tool-input
aliases where useful. Preserve user-selected exceptions, especially Goblin
“哥布林” with “地精” as an accepted alias. Align high-frequency core terms first;
review remaining terms alongside their source batch. Revisit completed prose
only for confirmed conflicts, not a blanket retranslation.

English repository sources remain authoritative for prose meaning, quantities,
conditions and mechanics. Do not import the site's prose or entire dictionary.
Keep canonical IDs, English/model/tool text and English regression unchanged.
Use existing terminology and focused workflow checks; this adds no separate
report or release gate and does not include a SRD 5.2 rules migration.

## Current state and remaining work

| Unit | Implemented checkpoint | Remaining gate |
| --- | --- | --- |
| Locale foundation | Registry, persistence, browser fallback, typed complete catalogs, model locale policy, classified token proxy, chapter budget, CJK retrieval, IME protection | Real prompt-usage calibration; keep legacy campaign/history regressions |
| DM safety | Per-event engine conclusions with English/Chinese renderers; AI prose separated; one text-only correction and safe fallback; shared localized enemy names and held-resource names/IDs; scoped resource aliases and ambiguity retries; real Codex combat/resource acceptance | Untracked feature/reaction options and broader spell/condition/pack coverage; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **401/440** covered files, **0** pending literal sites, **19317** message keys; scoped AST gate across entry, character, play, board, settings and help surfaces | 39 zero-literal owners need dynamic/source-ownership review; locale-sensitive thresholds and backend/native text remain audit items |
| Character creation/material | Source-bound names/help: 517 spell names, 228 equipment names, 239 item bodies, 319/319 spell bodies; 415 registered resources, 135 bundled options, 533 expanded subclass features, 105 archetype documents, 49 backgrounds and 733 themed features; immutable English material baselines | Remaining dynamic material and help/loading paths; third-party, changed and authored variants retain their source |
| Player system logs | Localized structured combat/audit display, party item/coin/XP logs, account facts and kickoff notices; English model/tool semantics stay separate | Other native player-log templates and final history/save/resume audit |
| Resource delivery | UI/content/help scopes and independent retryable lazy help; anonymous bilingual switch/reload, authenticated character/campaign entry and viewer-English/story-Chinese separation observed | Complete authenticated journey and lazy/cache timing; hydrated/network totals and large route JS payload remain unverified |
| Local Chinese TTS | Implementation and bounded CPU delivery/outage evidence retained in [the runtime record](validation/chinese-tts-runtime.json) | Chinese voice quality rejected by user; further voice work is deferred, not passed, and is not a text-milestone gate |
| Full native rulebook | Reader chrome localized; **933/933 complete Chinese pages** render via a server-generated display projection: all 319 spells, 239 magic items, 36 rules, 9 races, 12 classes and 318 monsters. Exact page IDs and source hashes are maintained in the coverage manifest; original English corpus retained | game-card/help prose reuse, authenticated browser search/navigation and English reading regression |
| Final text flow | Recorded Chinese exploration/social/utility and combat/slot/correction acceptance on Codex | Complete Chinese text journey, rulebook reading/search and English regression; full tests/lint/build, then pause |

## Execution adjustment (2026-10-13)

Keep the existing goal. Change the delivery method and priorities, not the release
scope or acceptance requirements. Prioritize visible completion of whole player
flows. Read exact owners and states from the UI manifest; zero literal sites
means static caption extraction is complete, not that every dynamic value or
real interaction has passed. Do not restart a static translation campaign.

| Priority | Delivery unit (exact owners in the UI manifest) | Stopping point |
| --- | --- | --- |
| 1 | Character creation, pickers/shared help and character sheet | Owned names, descriptions, choices, resource/gear help and failures display in the selected UI locale; selection and grants preserve canonical IDs; custom/pack prose remains authored. Close only owners whose actual remaining gates are resolved. |
| 2 | Battle table, session controls, player logs and their state helpers | Native dynamic captions and new player logs have complete localized display paths; campaign-locale actions and engine conclusions remain separate from viewer-locale controls; IDs, HP, rolls and resources retain engine semantics. Audit pure helpers together with consumers rather than opening individual delivery cycles. |
| 3 | Full bundled rulebook text | All native book pages, navigation, tables and search display Chinese, with English switching and source attribution retained. Reuse matching material translations. |
| 4 | One complete bilingual journey | Chinese create/play/combat/rest/save/resume and rulebook reading/search, plus English switching/regression pass; perform the remaining full-suite, full lint and production build at this release boundary. Record failures and genuinely untested gates explicitly. |

## Next delivery unit and interruption checkpoint

Current checkpoint: 2026-10-14. The data manifests remain the detailed inventory;
this section records current delivery state and acceptance gaps only.

- Native book: 933/933 pages, including 318 monster-kind pages. All 319 bundled
  spell and 239 item bodies use source-bound projections with unchanged English,
  numeric/table checks and refusal of modified sources. Spell help includes
  higher-level paragraphs in reference, lazy help and all four shared pickers.
- Structured monster help: traits/actions/bonus actions/reactions/legendary text
  reuse exact book paragraphs; 13 pack-specific variants have separate exact
  name/source bindings. The 14 checked-in monster fixtures have zero wholly
  English blocks under scripts/audit-monster-prose-locales.mjs. Mixed text and
  the deployed catalog are not accepted by that heuristic. The default
  data/content/open5e.sqlite is absent and .env/.env.local specify no alternative
  CONTENT_DB_PATH; deployed full-catalog coverage remains unverified.
- Requests/cache: browse/search/detail carry viewer locale and separate display
  prose. Locale/source guards protect English switching, authored/third-party
  variants and original model/tool data. Direct-client full-spell and server
  content-display regressions pass. Feature-material regression passes with
  corrected locale-aware mock keys and unchanged English hashes.
- UI source coverage: 412/440 owners, zero pending literal sites, 19317 keys.
  Completed pure-helper/consumer reviews are recorded in
  docs/validation/ui-localization.json. Whole-owner dynamic output and browser
  acceptance remain distinct; stale theme counts were corrected to 733/733.
- Validation: full lint passed before the dice/cache follow-up (0 errors,
  22 ESLint warnings); terminology reports 557 entries, 0 errors and 389 context
  warnings. The sandboxed full test run was terminated after a local mock-server
  listen EPERM. That script passes with elevated execution; the elevated full
  suite completed: 570/585 passed, 15 failed (681 seconds). Gear subsequently
  passed separately. Resource-scope and single-character book-search regressions
  now pass after correcting outdated test assumptions; magic-item locale cache
  fixtures also pass. Reviewed-message tests pass after a verified one-value
  Wild Shape terminology update, with prior hashes retained. Builder background
  help expectations and their source review were corrected; all 11 grouped
  builder-feedback checks now pass. Historical Git versions reproducing old hashes were located and reviewed for
  the smaller source changes (display adapters, opt-in help and typed death/wake
  notices); their review records retain prior hashes and base commits. The larger feat-choice/level-up diffs are now reviewed. Glossary history
  confirms 257 prior entries retained, two explicit term changes and 300 later
  additions. Nine affected regression scripts completed with eight passing; game-help
  then passed separately after replacing its duplicate old-byte lock with an
  explicit audited before/after helper revision check. All 15 original failures
  now have passing focused follow-ups, but the final full suite has not rerun. Picker background tests preserve third-party body
  text while allowing the localized Feature label. Final failures still require
  verification; final full-suite acceptance remains open.
- Build: default Turbopack failed twice on port binding, including elevated retry.
  Webpack exposed Node crypto imported into browser dice validation. Pure
  dice-core now serves browser validation/scoring; server wrappers retain the
  original cryptographic RNG. All 24 dice tests and focused lint pass. Webpack
  production build passed TypeScript and page generation. The subsequent catalog
  count change still needs final validation; this is not a default-build pass.
- Gear regression: old seeded cache state was updated to locale-bound section
  keys without changing frozen English goldens. Diagnosed two intended English deltas: original reference.name enrichment and unfetched-section loading. Tests now assert those deltas explicitly while preserving all frozen files. Eight stale implementation review hashes were refreshed with prior values retained; canonical rule/content hashes are unchanged. The complete gear rerun passes all seven grouped checks; focused lint and the UI inventory check also pass. Unavailable
  or failed catalogs no longer display a misleading confirmed zero-item count.
- Source/terminology caveats: Guardian Naga's conflicting Saving Throws lines
  remain preserved pending source review. Earlier external terminology candidates
  without verified edition/review provenance remain unverified; no external prose
  was imported.
- Next: finish diagnosing full-suite failures, complete remaining dynamic
  UI/material/log owners and real content-data review, then run one complete
  Chinese/English create/play/combat/rest/save/resume/book-search journey. Real
  model/runtime acceptance remains unproven; deferred voice/third-party scope
  is unchanged.

## Batches and review boundaries (2026-10-13)

Combine prose with the same source catalog, renderer and checks into one
reviewable delivery unit. Choose size by full source length, mechanical
complexity and available review/context capacity, not a fixed two-page cadence.
Split only for those limits, a different delivery path or an unresolved defect;
record the reason in one line. Review every source page in full even when drafts
are prepared in smaller chunks. Keep search/cache/persistence/component changes
as independently reviewable units.

| Remaining work | Batch rule |
| --- | --- |
| 119 high-level spells | Group by level/theme and source volume; reuse names, headers and matching game-help bodies. A book-only body does not close the corresponding in-game help gap. |
| 318 monsters | Group families with shared stat-block shapes; review each creature's exceptional actions, quantities and conditions against its full source. |
| Dynamic UI/material/logs | Group producers/helpers with their consumer flow. Mark already-correct owners reviewed without inventing code changes or duplicate tests. |

Each completed unit has one combined review/check boundary and one commit.
Source investigation and settled terminology are part of that unit, not separate
cycles. Reuse matching translations; inspect only new or conflicting source.
Do not expand routine text work into unrelated refactors or new reporting tools.

## Coverage data and regression contracts

Use the existing manifests as the detailed coverage records; the current-state
table above is only their concise prose snapshot. Do not duplicate owner/page
lists in the plan, test code or per-batch reports.

| Coverage | Authoritative data and existing check |
| --- | --- |
| Main-flow UI | [ui-localization.json](validation/ui-localization.json): entrypoints/import closure, deferred reasons, per-file state and dynamic/source review. Existing AST check rejects new literals/unlisted owners; `npm run i18n:final` also rejects pending owners. Zero literals alone cannot close an owner. |
| Entire native rulebook | [rulebook-translation-coverage.json](validation/rulebook-translation-coverage.json): canonical corpus identity and separately required delivered IDs/kinds/source hashes. `scripts/test-rulebook-page-locales.mjs` derives totals/missing IDs and verifies translations. `--final` requires all 933 canonical pages in all six kinds. |
| Material/log regressions | Existing source comparison records and immutable English goldens in `docs/validation/`, consumed by the relevant workflow checks. Reuse them rather than creating another batch report or refreshing expectations. |

Normal additions update translation/coverage data, not hard-coded test ID lists.
Keep failures for duplicate/unknown IDs, stale source bindings, missing required
translations and translations omitted from the manifest. Never derive the
expected delivery set solely from available translations, remove required IDs
to pass a check or regenerate English goldens to hide a regression. Canonical
IDs, complete bodies/headers/tables, numeric/dice values, links/anchors, authored
variants and English rendering remain protected.

Use `node scripts/import-rulebook-translations.mjs <reviewed-drafts.json>` for
reviewed native page drafts. It reuses production source hashes and validates
existing bindings and heading/sidebar shape before updating catalog/manifest.
Update a UI owner to covered only after its dynamic/source paths are reviewed.
Refresh an inventory only for a changed import closure or an actual audit need;
progress questions use existing data. Partial coverage remains explicitly partial.

## Verification and concise reporting

Select checks by changed inputs and run them once on the completed batch state.
Independent checks may run together; dependent writes, reviews and commits stay
sequential. Before touching Next.js code, read the relevant installed local guide.

| Change | Required batch verification |
| --- | --- |
| Documentation only | Review diff and `git diff --check`; no application checks. |
| Prose/coverage data through an unchanged path | One existing focused material/page check covering source bindings, bilingual rendering, quantities/tables, links/anchors and English/canonical preservation; `git diff --check`. Catalog/AST/terminology/generated-resource checks only when their inputs changed; regenerate resources only when needed. No TypeScript/code lint solely for unchanged code. |
| Code, test logic or runtime behavior | Relevant focused workflow check, TypeScript and changed-file lint; catalog/AST/terminology/resource checks if affected. Cover changed interactions, persistence, dynamic display and English behavior. |
| Shared runtime with a concrete wider risk | Broaden checks/build for the affected contracts and state the reason once. |
| Final text release | Complete the bilingual journey; require `npm run i18n:final`, `node scripts/test-rulebook-page-locales.mjs --final`, full tests, full lint and production build on the final source boundary. Full lint already contains AST/catalog-generation/terminology checks; reuse those results. |

After passing, stop verification and commit. Rerun only failed checks or checks
invalidated by later changes. Reuse existing bounded real-model, naming,
embedding and audio evidence when their relevant configuration/contracts are
unchanged; runtime/policy/retrieval changes require affected acceptance again.
No paid/model/audio calls or full build for routine prose. Final acceptance
still includes Chinese create/play/combat/rest/save/resume, rulebook reading/
search and English switching, legacy campaign/history behavior, actual journey
prompt-usage/guard evidence, and honest actual model/service versions. Fixed
bilingual retrieval calibration and English baselines remain required evidence;
rerun calibration when its model/profile/index/retrieval contracts change.

Translation review compares the entire source, conditions, quantities, dice,
units and cross-references; structural checks do not prove prose quality or
independent human approval. Never weaken assertions to shorten verification.

Update only changed state, remaining gates and next operation in this plan.
Each user-facing batch update states outcome, verification and unresolved/next
work in a few lines. Ordinary successful batches need no new report. Preserve
exceptional defects, failed checks and new runtime evidence in existing reports
with one link here; Git carries the implementation history. File/page fractions
are audit aids, not completion or effort estimates.

On interruption, retain only last commit, pending unit, passed/failed checks and
next operation. Resume from that difference; do not reinvestigate settled paths
or rerun unchanged checks. Local evidence does not imply production acceptance;
missing deployment access remains an explicit unaccepted gate, not code-complete
end-to-end delivery. Preserve the latest approved scope and deferred voice work.

## Compatibility contracts

Register each locale's direction, browser tags, generation language, segmentation
locale and TTS capabilities in `src/lib/i18n/locales.ts`. Every source message
must supply every registered locale; adding a language also extends the typed
client loader table. Business logic preserves machine protocols and uses locale
adapters for natural language rather than scattered Chinese-only conditions.

Ask's typed locale adapter follows the campaign locale, with unchanged English
defaults. Chinese sheet questions take priority over rules; Chinese story
questions conservatively use the existing bounded archive pass because names
lack a capitalization cue. Explicit scope selection remains available. The
existing Ask script passed ten scope/retrieval/parsing/privacy checks.

Hand sentence renderers are registered by locale and follow the campaign locale;
card labels and controls follow the viewer's UI locale. English still delegates
to the native sentence helper. Cards, target IDs, spell names, slots, options,
variants and coordinates retain their canonical values in the structured intent.
Localized names apply to presentation only; unknown authored terms stay literal.

Hand material translates complete owned frames and registered complete feat-hint
suffixes, requiring a recognized base refusal; unknown combined text is retained.
Numeric captures are scoped to
their actual role. Preview odds, AC estimates, cover, counters and tones remain
the engine's values. Reaction descriptions must reproduce the native prompt from
the current hit record, and attacker names translate only with a matching enemy
ID/name. Unidentified/player names and stale/unrecognized source frames stay
literal. Registered resource cards reuse reviewed complete Chinese guidance
when their abbreviated native rule matches that source; custom guidance does
not get replaced. All selection callbacks retain native cards and choice values.

New-adventurer notices match complete native frames against identities already
visible to the viewer. Species/class labels translate; names and the original
backstory excerpt remain literal. Unknown/custom, ambiguous or no-longer-matching
old notices retain their source. The intro directive remains English machine
input. Native audio failures preserve HTTP codes, addresses and backend details
in translated wrappers; unknown failures use localized feedback while original
diagnostics remain in state. Audio gestures and speech-recognizer configuration
are unchanged; Chinese speech recognition remains deferred.

Source catalogs remain co-located for review. Browser consumers import the
resource runtime, not the complete server/offline `messages.ts` entry. Root SSR
provides the UI namespace; character and campaign layouts provide content. English
copy in each loaded namespace recognizes unchanged source text. Unknown authored
names/prose remain verbatim. Run `npm run i18n:generate` after changing catalogs;
lint and tests verify that generated language/scope files have not drifted.

The deployment default remains `Xenova/all-MiniLM-L6-v2@fp32`, keeping English
indexes and semantic behavior intact. For Chinese retrieval across English
sources, the administrator explicitly sets in `.env.server`:

```
EMBEDDING_MODEL=Xenova/paraphrase-multilingual-MiniLM-L12-v2
EMBEDDING_DTYPE=q8
```

This choice applies to all campaigns and rebuilds incompatible vectors. Only
384-dimensional models are supported. The multilingual profile keeps the
bounded-corpus-validated lore/scene floors (0.28/0.25), but disables cosine-only
waypoint completion/fact retirement because hard negatives failed calibration.
Exact matches, the waypoint judge, insertion and retrieval remain available.
[Calibration evidence](validation/bilingual-embeddings.md) records the English
Recall@8 and top-1 tradeoff; broader sources are not proven equivalent.

Token estimation uses 1.5 per Han/kana/Hangul code point, the legacy 1/4 rate for
ASCII/Latin/punctuation and 2 for other symbols. This provisional model-independent
proxy is not a guaranteed upper bound or a measured Codex tokenizer. Response
reserves and consistent chapter/history budgeting remain in place.

## Translation provenance and acceptance

Translations are original drafts from repository English source, not copied from
proprietary Chinese rulebooks. Review records distinguish implementation-agent
source comparison from external/human approval. Preserve names, mechanisms,
numbers, dice, units, placeholders and content-pack override boundaries. Retain
source fingerprints and immutable English golden results; never refresh goldens
to hide regressions. The 28 compressed baseline artifacts preserve exact original bytes
and verify SHA-256 when loaded.

Runtime evidence names Codex CLI 0.162.1: earlier exploration/social/utility
acceptance used `gpt-6-astra`, and the latest six-case combat/terminology acceptance
used `gpt-6.1-sol`. Future acceptance follows the user's current subscription
configuration and records the actual model. These runs prove bounded Chinese
exploration/social/tool/utility and combat operation,
not complete play, production guard recall, full English UI parity or local-model capability.
[Combat acceptance](validation/chinese-combat-narration.md) records engine conclusions,
correction fallback, speech-input checks and the actual Codex narratives.
A local-model comparison is future compatibility work, not this user's release
backend. Chinese TTS has partial real CPU acceptance in
[the runtime record](validation/chinese-tts-runtime.json). If deferred voice work
resumes, discover installed voices before assuming `zf_xiaobei`, `lang_code=z` and `misaki[zh]` are available. Test actual
numbers, units, names, closing quotation marks and long unpunctuated text.

The [review repair report](validation/localization-review-repairs.md) records
current fixes, bundle measurement and build limits. Production build success,
full-page size and real audio acceptance are separate from TypeScript/unit checks.

## User involvement and final open gates

Routine implementation, reversible setup and required checks remain authorized.
Ask only for inaccessible account/service access or a proposed model/cost scope
change. Deferred voice work must not block independent text delivery.

Remaining gates are in the current-state table and final verification boundary
above. Bounded DM combat/resource evidence does not imply broader guard recall
or all pack content. Engine-generated decisive combat facts,
one text-only prose correction and safe fallback must never repeat an action,
roll dice again, mutate HP twice or spend resources twice.

Use [the UI manifest](validation/ui-localization.json),
[the combat acceptance report](validation/chinese-combat-narration.md),
[the retrieval calibration report](validation/bilingual-embeddings.md) and
[the local TTS setup guide](setup/chinese-tts.md) as the existing scope/evidence
sources. Do not mark the goal complete until the required release gates above
have actual evidence.

## Source exceptions and retained evidence

- The item-table probe originally failed on merged conversion rows. Reviewed
  against the official SRD PDF (printed pp. 209, 239, 250), Bag of Beans,
  Robe of Useful Items and Wand of Wonder require comparison-only row splits.
  `rulebook-translation-coverage.json:itemTableReviews` binds these to source
  hashes. All 239 item pages now pass table count/shape and per-cell numeric
  checks, with card rank/suit/joker identity preserved. The robe's shared
  width/height quantity has an exact reviewed phrase mapping. Mutation checks
  reject removed rows, altered ranges/dice/signs/dimensions/cards and stale
  review bindings. Focused item regression passed, including 185 frozen English
  item cards; TypeScript and changed-file lint passed. English corpus/goldens
  are unchanged. This structural gate
  does not replace prose meaning review.
- 5etools terminology lookup was inspected through its published
  `docs/terms-20260922-142718.json` data (version
  `bb83b8e4ac003ad2bfda11df0525ec5bef6add68ffb0658fa86e9065c6c8eabe`).
  Huge/Gargantuan agree on 巨型/超巨型; Restrained on 束缚; Goblin's 地精
  remains an alias under the user-selected 哥布林 policy. Many rows have blank
  edition sources: “已确定” alone does not prove 2014 provenance. Euryale has
  both a name and a bestiary ability entry, illustrating why context matching
  is required. No bulk dictionary or prose was imported.
- Animal Friendship's bundled English higher-level clause is truncated. The
  Chinese clause was verified against the publisher's
  [2014 rules entry](https://www.dndbeyond.com/spells/1993-animal-friendship).
  Preserve that correction and its source binding; the English source was not
  rewritten. Spell help includes the separate higher-level field in both locales.
- The bundled travel table reversed Normal/Slow daily distances. Commit
  `9b7c83a6` corrects English and Chinese to 24/18 miles/day using the publisher's
  [2014 rules](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/adventuring),
  retains the import ERRATA and independent expected-value test. Hourly travel
  engine behavior was not changed.
- The equipment conversion split the healing-potion price across columns as
  `Potion of healing 5` / `0 gp`. The publisher's
  [2014 equipment table](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/equipment)
  confirms `Potion of healing` / `50 gp` / `1/2 lb.`. English and Chinese book
  cells, import ERRATA and an independent expected-value check now retain that
  correction. Canonical corpus identity was reviewed for this specific change;
  existing required-page source bindings and English goldens were preserved.
- Monster Statistics conversion omitted CR 9-13 and 26-30 XP rows and joined
  a fifth-level spell-slot example to a truncated spell-substitution sentence.
  The [official 2014 monster rules](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/monsters)
  supplied the missing values and meaning. Both book languages and import ERRATA
  restore them; the English substitution clause is a source-faithful paraphrase.
  A fixed 34-row CR/XP assertion and slot/class/level checks guard the repair.
  Runtime challenge/XP and spell mechanics were not changed.
- Several class sources name additional PHB archetypes as if all were detailed
  on the same page; the bundled SRD pages contain only their included branches
  (Berserker, Lore, Life, Land, Champion, Open Hand, Devotion, Hunter, Thief,
  Draconic Bloodline, Fiend and Evocation).
  Chinese notes retain the choices and clarify the available chapter coverage,
  without adding third-party archetype prose. Fighter's source skill-list typo
  `Animal, Handling` is rendered as the single existing skill 驯兽; canonical
  class data and the English source remain unchanged.
- Rulebook display remains server-generated with complete-source fingerprints;
  canonical records and workshop-copy inputs stay source-owned. Preserve native
  heading/sidebar anchors, Chinese cross-reference links, locale/page cache
  isolation and stale-response rejection. Chinese full-text search/snippets and
  keyword highlighting retain English stemming/ranking and text escaping.
  Chapter-by-chapter implementation and checks remain in Git.
- Authenticated browser evidence covers Chinese character creation/save/reopen,
  campaign creation/lobby, Codex kickoff/player action and English controls with
  unchanged Chinese narration. Media failure state survives refresh. These
  bounded observations do not close the full bilingual journey. Screenshots
  remain outside Git; their historical paths are retained in earlier plan commits.
  This isolated server used Codex CLI 0.162.1 with the existing default resolved
  to `gpt-6-sol`; the model was not independently captured for every generation.
- Preserve unresolved source ambiguity, including the Whispered Names advantage
  clause, rather than inventing a rule during translation. Earlier Unicode
  preview/parser checks used a temporary TSX loader; a permanent legacy parser
  runner remains unverified. Preserve that limitation when reusing the evidence.
- Historical full regression/lint/Next 16.3.8 Turbopack build passed at the
  [combat UI checkpoint](validation/chinese-combat-ui-checks.json).
  Subsequent changes require the final release checks; earlier default-build
  failures are superseded, not erased. The alternate webpack path is unverified.
- Kokoro synthesis, real delivery and outage/retry evidence remain in
  [the runtime record](validation/chinese-tts-runtime.json). The user rejected
  Chinese voice quality. Voice work is deferred, not passed, and is not a gate
  for this text milestone.
