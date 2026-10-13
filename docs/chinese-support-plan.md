# Simplified Chinese development plan

This is the active delivery plan. Implementation history remains in Git and the
linked validation reports; it is not repeated here. The full playable flow is
still incomplete. The approved goal remains active with its original scope.

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
  model configuration. TTS prefers the existing local Kokoro-compatible path.
- Defer Chinese speech input, full rulebook, third-party expansion prose, deep
  Workshop/native shell editors and multiple character voices.

## Current state and remaining work

| Unit | Implemented checkpoint | Remaining gate |
| --- | --- | --- |
| Locale foundation | Registry, persistence, browser fallback, typed complete catalogs, model locale policy, classified token proxy, chapter budget, CJK retrieval, IME protection | Real prompt-usage calibration; keep legacy campaign/history regressions |
| DM safety | Per-event engine conclusions with English/Chinese renderers; AI prose separated; one text-only correction and safe fallback; shared localized enemy names and held-resource names/IDs; scoped resource aliases and ambiguity retries; real Codex combat/resource acceptance | Untracked feature/reaction options and broader spell/condition/pack coverage; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **401/440** covered files, **0** pending literal sites, **18112** message keys; scoped AST gate; earlier play/session surfaces plus hand labels/targets/area selection, campaign-locale action sentences, native previews, basic/reaction rules, common casting refusals, spell selectors, all 113 owned mechanic notes, 103 native technique and 23 maneuver labels, attack/bonus-route and material/ritual refusals, built-in form attack names and verified current-actor labels, correction/multi-picker chrome, native downtime facts and inventory/vitals approval/player-trade controls, guided progression chrome, rest/loot/travel moments and all native option summaries, owned generic feature/feat summaries, feat choice controls, campaign/map entry notices the complete app help walkthrough story/chronicle/arc controls, NPC roster review, campaign model controls market/shelf/trade, party-lead, quest-log/faction controls plus facts, pinned memories, context-trace presentation and passage edit/reroll/action controls and character/companion entry and private-chat/media presentation and audit/timeline controls and dice tray/source controls and board movement/camera/order/area/target/drawing and DM placement/measurement controls | 39 zero-literal owners still require dynamic composition/source-ownership review; locale-sensitive selection thresholds and backend/native messages remain audit items; file fraction is not overall completion or an effort estimate |
| Character creation/material | Identity, ancestry, class introductions, ability allocation, gear, spell book/preparation and finish preview; 517 spell and 228 equipment names plus all 239 SRD magic-item titles and 52 exact variants; 257-entry contextual terminology policy and lint gate; 415/415 static registered resource names and guidance shared with DM references; 135/135 bundled option names/descriptions plus all 20 nonempty requirement frames; 146 shared/class-specific feature summaries, 54 native feat summaries and owned feat choice controls; four native pregen card summaries and backstories; 533/533 authored feature names/short summaries across all 105 expanded subclasses in 13 classes; all 49 bundled background introductions, feature names and help; full display projection for all 105 ODM-authored archetype documents including 42 spell tables; 733/733 source-bound themed feature names/help across all six themes and 36 classes; 71/239 native magic-item bodies with source headers and tables: all potions/oils, rings, wands and armor; item help and four pickers; original-source review records | 168 other SRD magic-item bodies and remaining native dynamic material stay open; dynamic free-cast display/help now shares scoped DM aliases; user-authored/pack text remains outside the static resource review |
| Player system logs | Structured rule diagnostics, engine-generated combat conclusions and structured audit/timeline presentation retain English protocol semantics with localized display | Typed party-item/coin/banked-XP logs now persist campaign-locale text and original facts; new account notifications have typed display facts and preserve original English/legacy bodies; other player-visible log templates remain pending; model-facing English tool results remain independent |
| Resource delivery | UI/content/help scopes; selected-locale help loads independently on open, with retry; character/campaign boundaries; generated resources checked by lint; production Turbopack build and anonymous bilingual browser switch/reload succeed; home/character/campaign SSR and initial-script payloads measured | Hydrated/lazy network totals, authenticated campaign switching and active-play browser acceptance; route-level JS payload remains large |
| Local Chinese TTS | Locale-driven voice prefixes/defaults, Chinese single narrator, Unicode sentence/hard limits, campaign-language voice discovery and previews, cache isolation and Chinese failure UI implemented; mock transport/queue and English compatibility checks pass | Service not configured; actual model/voice/dependency versions, numeric/name pronunciation, browser/native playback, stream/replay/mute/retry and final bilingual journey acceptance remain open |
| Final play flow | Recorded Chinese exploration/social/utility and combat/slot/correction acceptance on Codex | Complete Chinese journey, English regression and real local TTS acceptance |

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
| 3 | Local single-narrator Chinese TTS: existing locale-aware service, preview and narration playback | Configure the local service; record actual dependencies/model/voice and accept pronunciation, streamed narration, replay, mute and failure/retry once in the real client. Mock bytes and source inspection do not close real audio gates. |
| 4 | One complete bilingual journey | Chinese create/play/combat/rest/save/resume/voice and English switching/regression pass; perform the remaining full-suite, full lint and production build at this release boundary. Record failures and genuinely untested gates explicitly. |

The shared builder/sheet material path is the next implementation priority. It
already has complete source-bound background and expanded-feature tables; review
remaining imported class descriptions and dynamic material rather than
retranslating those tables. The unchanged full ODM-authored archetype documents
now reuse those resources in creation, upgrade and lazy help. Third-party, changed
and homebrew documents retain their prose; raw cached descriptions and native IDs
remain intact. Catalog/type/changed-file lint and focused material-flow checks
cover source parity, bilingual display and English renders; real browser
acceptance remains open. This does not close the full creation/sheet workflow.

Dynamic free-cast resources now share generated English source, Chinese names and
help across sheet, hand and actor-scoped DM references. Library preview uses
native resource population; a story label needs matching mechanic context before
projection. The focused sheet script passes 18 cases, including the 26 original
English renders, library/table display, canonical requests and actual free-cast
payment/refusal/rest recharge. The check also distinguishes spell 黑暗术 from
zone lighting 黑暗. Only failed or changed-file checks were repeated; no model,
audio or full build was run. Remaining material and real browser gates stay open.

Themed feature display covers all 733 repository-authored entries across six
themes and 36 classes. Exact existing name/help bindings are reused; the remaining
411 entries add 799 scoped messages. These are original Chinese translations of
the repository's short summaries, reviewed against source names, numbers, dice,
units, conditions and cross-referenced resource terminology. The model/rule JSON
and English baseline render artifacts remain unchanged. Whole-source matching
preserves changed, third-party and authored prose; class identity scopes names.
The existing focused material script passes all 733 source projections and all
36 actual bilingual creation/sheet render flows, alongside prior archetype and
multiclass checks. Catalog, types and changed-file lint also pass in one batch.
This is component evidence, not authenticated browser or real audio acceptance.
The ambiguous original Whispered Names advantage clause is preserved rather than
silently changing a rule during translation. Other material/browser gates remain
open; no model, audio or production build was repeated for this copy batch.

Native item help has a locale-extensible, whole-source projection with
name/book/source provenance. It covers 71 of the 239 SRD item bodies: all 19
potions/oils, 22 rings, 13 wands and 17 armor/shields. Original limits, timings,
flavor, curses, spell references and full random-effect tables are translated.
The 32 distinct source headers share scoped keys and retain special attunement
restrictions in detailed cards; picker previews still begin with effects. Exact
closed armor-type and rarity-variant frames also display in Chinese. Inventory,
rulebook and engine data stay native. Workshop, other-book, changed and unknown
prose stays original. These original drafts reuse existing spell, damage,
language and rarity terminology. The existing magic-item script passes all 71
source bodies/headers, signed numbers/dice, actual bilingual detail cards and four
picker/callback paths, plus all 185 frozen English item cards. Catalog, types and
changed-file lint pass once this batch; no model, audio or full build was rerun.
Only the two affected gear-review fingerprints were updated after source review;
immutable goldens were preserved. The other 168 SRD magic-item bodies,
variant-specific imported prose, item-help failure/retry and real browser gates
remain open.

Pure state, audio plumbing and glyph helpers can be audited within the session
batch; their file count must not displace player-visible work.
Shared Workshop types remain in the manifest's import closure; deep editors
remain deferred and must not become new release work.

A batch begins with one short list of concrete player-visible gaps and ends with
an independently reviewable commit. Fix adjacent behavior only if it prevents the
same Chinese flow. Do not expand into unrelated refactors, speculative hardening,
new reporting infrastructure or repeated source investigations of settled paths.
If an owner is already correctly localized, record the source/consumer audit and
move on without writing redundant tests or changing behavior to raise coverage.

## Lightweight verification and progress reporting

- At batch end, run the catalog/AST/terminology gate once. Run TypeScript and
  changed-file lint for code batches; documentation-only updates do not need
  application checks.
- Add or reuse one focused workflow check when interaction, persistence or shared
  dynamic display changes. Ordinary copy does not need a new test script,
  exhaustive snapshots or a separate acceptance cycle for each file.
- After passing, stop verification and commit. Repeat only a failed check or a
  check affected by a subsequent change. Do not rerun passed Goblin, naming,
  real-model, embedding, build or audio acceptance for ordinary UI batches.
- Keep full tests/lint/build at the final boundary, or an earlier shared-runtime
  change with a concrete need for broad regression. Do not weaken assertions or
  refresh English goldens to hide failures.
- Report completed player flows, remaining gaps and the next delivery unit.
  Keep UI file coverage separate from overall completion and remaining effort.
  Progress questions reuse existing evidence instead of launching checks.

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
backend. Chinese TTS is still unconfigured; discover installed voices before
assuming `zf_xiaobei`, `lang_code=z` and `misaki[zh]` are available. Test actual
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
proposed change to the approved model/cost scope. Local TTS setup can proceed
independently where access permits; missing service access does not stop UI work.

Remaining acceptance includes other native dynamic and item/feature material,
other new player logs, authenticated switching and save/resume, prompt-usage and
narration-guard evidence within the actual journey, and real local Chinese audio.
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
