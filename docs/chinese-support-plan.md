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

## Current state and remaining work

| Unit | Implemented checkpoint | Remaining gate |
| --- | --- | --- |
| Locale foundation | Registry, persistence, browser fallback, typed complete catalogs, model locale policy, classified token proxy, chapter budget, CJK retrieval, IME protection | Real prompt-usage calibration; keep legacy campaign/history regressions |
| DM safety | Per-event engine conclusions with English/Chinese renderers; AI prose separated; one text-only correction and safe fallback; shared localized enemy names and held-resource names/IDs; scoped resource aliases and ambiguity retries; real Codex combat/resource acceptance | Untracked feature/reaction options and broader spell/condition/pack coverage; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **401/440** covered files, **0** pending literal sites, **18741** message keys; scoped AST gate across entry, character, play, board, settings and help surfaces | 39 zero-literal owners need dynamic/source-ownership review; locale-sensitive thresholds and backend/native text remain audit items |
| Character creation/material | Source-bound names/help: 517 spell names, 228 equipment names, 239 item bodies, 127/319 spell bodies; 415 registered resources, 135 bundled options, 533 expanded subclass features, 105 archetype documents, 49 backgrounds and 733 themed features; immutable English material baselines | Remaining dynamic material and help/loading paths; third-party, changed and authored variants retain their source |
| Player system logs | Localized structured combat/audit display, party item/coin/XP logs, account facts and kickoff notices; English model/tool semantics stay separate | Other native player-log templates and final history/save/resume audit |
| Resource delivery | UI/content/help scopes and independent retryable lazy help; anonymous bilingual switch/reload, authenticated character/campaign entry and viewer-English/story-Chinese separation observed | Complete authenticated journey and lazy/cache timing; hydrated/network totals and large route JS payload remain unverified |
| Local Chinese TTS | Locale-driven voice prefixes/defaults, Chinese single narrator, Unicode sentence/hard limits, campaign-language voice discovery and previews, cache isolation and Chinese failure UI implemented; mock transport/queue and English compatibility checks pass | Isolated real CPU service configured; Chinese sample decode and actual DM audio delivery succeed; Arabic numbers/dice/mixed-name and English samples also decode; real preview outage/retry succeeds; Chinese voice quality rejected by user; all further Chinese voice work deferred by latest instruction, not a text-milestone gate |
| Full native rulebook | Reader chrome localized; **391/933 complete Chinese pages** now render via a server-generated display projection, including all 127 cantrip/first-/second-level spell pages, all 239 magic-item pages and twenty-five foundational rule pages, with complete headers and reused bodies; original English corpus retained; 127 spell and 239 magic-item bodies are available for further reuse | Remaining full-page rules/monster/high-level spell prose and tables; complete Chinese corpus coverage, authenticated browser search/navigation and English reading regression |
| Final text flow | Recorded Chinese exploration/social/utility and combat/slot/correction acceptance on Codex | Complete Chinese text journey, rulebook reading/search and English regression; full tests/lint/build, then pause |

The concrete UI scope and deferred areas are in
[ui-localization.json](validation/ui-localization.json). The checker rejects new
literal sites in covered files. Run `npm run i18n:inventory` to refresh a local
inventory; do not count deferred files as promised first-release delivery.

## Execution adjustment (2026-10-13)

Keep the existing goal. Change the delivery method and priorities, not the release
scope or acceptance requirements. Prioritize visible completion of whole player
flows. The current manifest has 401 covered and 39 pending owners; zero literal
sites means static caption extraction is complete, not that every dynamic value
or real interaction has passed. Do not restart a static translation campaign.

| Priority | Delivery unit and owners | Stopping point |
| --- | --- | --- |
| 1 | Character creation and character sheet: CallingStep, builder state/derived/picker groups, CatalogBrowser/ContentPicker/MultiContentPicker, shared ContentPick/InfoDialog, SheetParts/SheetGearRow and CharacterSheetDialog | Owned names, descriptions, choices, resource/gear help and failures display in the selected UI locale; selection and grants preserve canonical IDs; custom/pack prose remains authored. Close only owners whose actual remaining gates are resolved. |
| 2 | Battle table and session: Hand and its aim/card/more/reaction children, RollCard, Moments, BoardMoveNotes, ItemProposalBar, SidePanelRouter and stream/state helpers | Native dynamic captions and new player logs have complete localized display paths; campaign-locale actions and engine conclusions remain separate from viewer-locale controls; IDs, HP, rolls and resources retain engine semantics. Audit pure helpers together with consumers rather than opening individual delivery cycles. |
| 3 | Full bundled rulebook text | All native book pages, navigation, tables and search display Chinese, with English switching and source attribution retained. Reuse matching material translations. |
| 4 | One complete bilingual journey | Chinese create/play/combat/rest/save/resume and rulebook reading/search, plus English switching/regression pass; perform the remaining full-suite, full lint and production build at this release boundary. Record failures and genuinely untested gates explicitly. |

## Next delivery unit and interruption checkpoint

- Recovered the interrupted `fa342a50` unit: Diseases, Objects, Artifacts,
  Nonplayer Characters and Legal Information are source-reviewed and included
  with the independent coverage manifest. Focused bilingual/source checks,
  TypeScript and changed-file lint passed. These are not final release acceptance.
- Next unit: group Madness, Poisons, Magic Items and Sentient Magic Items through
  the existing server page catalog, then continue remaining rules/race/class
  pages, spells and monsters. Update delivery data without modifying test logic.
- Native dynamic UI/material/log ownership remains open. Complete its audit
  before the final bilingual journey; combine pure helpers with their consumers.
  Deep Workshop editors, native-shell-only UI, third-party expansion prose,
  Chinese STT and Chinese voice work remain deferred.

## Batch size and execution efficiency (2026-10-13)

Group prose using the same source catalog, renderer and validation path into one
reviewable batch. Combine short related pages; group spells by level/theme and
monsters by family/shared stat-block shape. Choose size by source length,
mechanical complexity and review/context capacity, not page count alone. A long
or complex chapter can remain its own batch. Keep search, cache, persistence and
component behavior changes independently reviewable; explain any adjacent fix
that is necessary for the same Chinese flow.

Each batch has one short gap list, one combined review/check boundary and one
commit. Source investigation and settled-name review are not separate delivery
cycles. Reuse matching translations and existing terminology; inspect only new
or conflicting source. Correctly localized owners need an audit note, not a new
test or behavior change. Do not expand into unrelated refactors, speculative
hardening or new reporting infrastructure.

## Data-driven coverage contract

Implemented in [the coverage manifest](validation/rulebook-translation-coverage.json)
and `scripts/lib/rulebook-coverage.mjs`, consumed by the existing page check.
The focused check also proves duplicate/unknown IDs, stale bindings, missing
translations and omitted manifest entries fail. `--final` refuses partial delivery.
Continue applying this contract to routine prose batches:

- Use a separate data manifest for the required canonical page IDs and source
  identities in the delivered subset. Translation catalogs contain translations;
  they must not define the expected set against which they themselves are tested.
- The initial manifest binds twenty-five reviewed rules pages, all 127 delivered
  low-level spells and all 239 items. Validate IDs against the canonical 933-page corpus;
  reject duplicates, unknown IDs, missing translations and stale source bindings.
- Existing tests read the manifest and iterate registered translations. Normal
  additions update data, not a growing hard-coded ID list in test source.
  Preserve current assertions for complete bodies/headers, tables, numeric/dice
  values, links/anchors, modified-source rejection and canonical immutability.
- Keep English source/render assertions and immutable goldens. A missing or
  invalid translation must fail the check, not disappear from the expected set.
  Do not regenerate the manifest from the available translations to hide a
  regression or remove required IDs merely to make checks pass.
- Derive coverage totals and missing IDs from corpus/manifest/catalog comparison.
  Run `node scripts/test-rulebook-page-locales.mjs --final` at final acceptance
  and require every canonical page in all six kinds
  (rules, race, class, spell, item, monster), not just the delivered subset.
  Until that gate passes, report partial coverage explicitly.

Any import helper should reuse the production source-fingerprint function and
existing catalog format. Add it only if repeated source-binding work warrants
it; no new translation framework or reporting service is required.

## Lightweight verification and progress reporting

Use the following checks once at the final state of each batch. Independent
checks may run together; dependent writes, reviews and commits remain sequential.

| Change | Required batch verification |
| --- | --- |
| Documentation only | Inspect the diff and `git diff --check`; no application checks. |
| Prose/coverage data only, existing delivery path | Reuse one focused material/page check for manifest completeness, source binding, bilingual rendering, numeric/dice/table parity, links/anchors, canonical and English preservation. Run the catalog/AST/terminology/generated-resource gate once if its inputs changed; regenerate resources only when needed. No TypeScript or code lint solely for unchanged code. |
| TypeScript/JavaScript, test logic or runtime behavior | Relevant focused workflow check, TypeScript and changed-file lint; run catalog/AST/terminology/resource checks if their inputs changed. Cover changed interaction, persistence, dynamic display and English behavior. |
| Shared runtime with a concrete broad-regression risk | Broaden tests/build only for the identified affected contracts; record the reason. |
| Final text release | Complete the bilingual journey, then full tests, full lint and production build on the final source boundary. |

After passing, stop verification and commit. Repeat only failed checks or checks
invalidated by later changes. Do not rerun passed naming, real-model, embedding,
build or audio acceptance for ordinary prose/UI work. Preserve assertions and
English goldens; fix failures rather than weakening them. Translation review
still compares the complete source, conditions, quantities, dice, units and
cross-references; a structural check is not independent human proofreading.

Keep the plan's current-state table as the single prose summary of progress.
Use the manifest/check output for detailed coverage. Each batch
updates only changed status, remaining gates and the next unit, with a commit or
existing evidence link when needed. Keep exceptional defects, failed checks and
new runtime evidence in the existing validation reports; do not append another
full batch narrative or repeat unchanged invariants and deferred checks.

Progress questions reuse existing evidence without launching application checks.
Reports state player-visible outcomes, unresolved gaps and the next unit; file
and page fractions are audit aids, not overall completion or remaining effort.
If interrupted, retain a short checkpoint here: last commit, uncommitted unit,
passed/failed checks, remaining operation. Resume from that difference without
reinvestigating settled paths or rerunning unchanged passed checks. Preserve real
model/service versions and failures; local evidence does not imply current
production acceptance.

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

Routine implementation, reversible setup and the checks above continue under
existing authorization. Use the configured Codex CLI subscription; a local-model
comparison is future compatibility work, not this user's release backend. Do not
reopen settled terminology or add model/audio cost boundaries without a reason.
User involvement is required only for inaccessible account/service access or a
proposed change to the approved model/cost scope. Deferred voice work must not
block or restart independently available text delivery.

Remaining acceptance includes other native dynamic and item/feature material,
other new player logs, complete rulebook translation/reading/search, authenticated
switching and save/resume, prompt-usage and narration-guard evidence within the
actual journey, and final full tests/lint/build. Real Chinese audio remains deferred.
Existing bounded DM combat/resource evidence is reused; broader guard recall and
all pack content are not implied by it. Engine-generated decisive combat facts,
one text-only prose correction and safe fallback must never repeat an action,
roll dice again, mutate HP twice or spend resources twice.

Use [the UI manifest](validation/ui-localization.json),
[the combat acceptance report](validation/chinese-combat-narration.md),
[the retrieval calibration report](validation/bilingual-embeddings.md) and
[the local TTS setup guide](setup/chinese-tts.md) as the existing scope/evidence
sources. Do not mark the goal complete until the required release gates above
have actual evidence.

## Source exceptions and retained evidence

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
