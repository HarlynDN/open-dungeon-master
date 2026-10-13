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
  model configuration. Chinese voice work is now deferred by the user.
- Full bundled rulebook text is now in scope under the latest instruction below.
- Defer third-party expansion prose and Chinese voice work; keep earlier speech
  evidence as historical results rather than requirements for the text milestone.

## Latest user scope — text completion, then pause (2026-10-13)

The latest user instruction overrides older deferred/full-acceptance rows below. Finish Chinese text for the game itself and the entire bundled SRD 5.1 rulebook, then pause the active task. Third-party expansion-pack translation and Chinese voice work are deferred and are no longer gates for this text milestone. Preserve their existing implementations and honest evidence, including rejected voice quality. Do not pause before the requested text scope is finished.

Text delivery includes native interface/system/help text and repository-owned materials, plus all 933 bundled rulebook pages (319 spells and 239 magic items included), chapter/part navigation, tables and Chinese search/display. Existing material translations should be reused wherever the full source matches; the remaining rulebook chapters and monster text need original source-bound translations. Keep English available, preserve canonical mechanics/IDs and authored or third-party variants, and retain source/license attribution. Player and DM rulebook views must both use translated presentation; translation does not change model-facing machine protocols. User-authored campaign prose and imported third-party text retain their source.

Before pausing, finish the native dynamic text audit and one bilingual text journey, then run the required full tests/lint/build once at the final boundary. The former voice and third-party acceptance gaps must be recorded as deferred rather than falsely marked passed.

## Current state and remaining work

| Unit | Implemented checkpoint | Remaining gate |
| --- | --- | --- |
| Locale foundation | Registry, persistence, browser fallback, typed complete catalogs, model locale policy, classified token proxy, chapter budget, CJK retrieval, IME protection | Real prompt-usage calibration; keep legacy campaign/history regressions |
| DM safety | Per-event engine conclusions with English/Chinese renderers; AI prose separated; one text-only correction and safe fallback; shared localized enemy names and held-resource names/IDs; scoped resource aliases and ambiguity retries; real Codex combat/resource acceptance | Untracked feature/reaction options and broader spell/condition/pack coverage; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **401/440** covered files, **0** pending literal sites, **18741** message keys; scoped AST gate; earlier play/session surfaces plus hand labels/targets/area selection, campaign-locale action sentences, native previews, basic/reaction rules, common casting refusals, spell selectors, all 113 owned mechanic notes, 103 native technique and 23 maneuver labels, attack/bonus-route and material/ritual refusals, built-in form attack names and verified current-actor labels, correction/multi-picker chrome, native downtime facts and inventory/vitals approval/player-trade controls, guided progression chrome, rest/loot/travel moments and all native option summaries, owned generic feature/feat summaries, feat choice controls, campaign/map entry notices the complete app help walkthrough story/chronicle/arc controls, NPC roster review, campaign model controls market/shelf/trade, party-lead, quest-log/faction controls plus facts, pinned memories, context-trace presentation and passage edit/reroll/action controls and character/companion entry and private-chat/media presentation and audit/timeline controls and dice tray/source controls and board movement/camera/order/area/target/drawing and DM placement/measurement controls | 39 zero-literal owners still require dynamic composition/source-ownership review; locale-sensitive selection thresholds and backend/native messages remain audit items; file fraction is not overall completion or an effort estimate |
| Character creation/material | Identity, ancestry, class introductions, ability allocation, gear, spell book/preparation and finish preview; 517 spell and 228 equipment names plus all 239 SRD magic-item titles and 52 exact variants; 257-entry contextual terminology policy and lint gate; 415/415 static registered resource names and guidance shared with DM references; 135/135 bundled option names/descriptions plus all 20 nonempty requirement frames; 146 shared/class-specific feature summaries, 54 native feat summaries and owned feat choice controls; four native pregen card summaries and backstories; 533/533 authored feature names/short summaries across all 105 expanded subclasses in 13 classes; all 49 bundled background introductions, feature names and help; full display projection for all 105 ODM-authored archetype documents including 42 spell tables; 733/733 source-bound themed feature names/help across all six themes and 36 classes; 239/239 native SRD magic-item bodies with complete source headers, tables and embedded stat blocks; 127/319 complete native SRD spell help bodies (all cantrips, first-level and second-level spells) including higher-level clauses; item help and four pickers; original-source review records | Remaining native dynamic material and imported variant-specific prose stay open; dynamic free-cast display/help now shares scoped DM aliases; user-authored/pack text remains outside the static resource review |
| Player system logs | Structured rule diagnostics, engine-generated combat conclusions and structured audit/timeline presentation retain English protocol semantics with localized display | Typed party-item/coin/banked-XP logs now persist campaign-locale text and original facts; new account notifications have typed display facts and preserve original English/legacy bodies; other player-visible log templates remain pending; model-facing English tool results remain independent |
| Resource delivery | UI/content/help scopes; selected-locale help loads independently on open, with retry; character/campaign boundaries; generated resources checked by lint; production Turbopack build and anonymous bilingual browser switch/reload succeed; home/character/campaign SSR and initial-script payloads measured | Hydrated/lazy network totals, authenticated campaign switching and active-play browser acceptance; route-level JS payload remains large |
| Local Chinese TTS | Locale-driven voice prefixes/defaults, Chinese single narrator, Unicode sentence/hard limits, campaign-language voice discovery and previews, cache isolation and Chinese failure UI implemented; mock transport/queue and English compatibility checks pass | Isolated real CPU service configured; Chinese sample decode and actual DM audio delivery succeed; Arabic numbers/dice/mixed-name and English samples also decode; real preview outage/retry succeeds; Chinese voice quality rejected by user; all further Chinese voice work deferred by latest instruction, not a text-milestone gate |
| Full native rulebook | Reader chrome localized; **379/933 complete Chinese pages** now render via a server-generated display projection, including all 127 cantrip/first-/second-level spell pages, all 239 magic-item pages and thirteen foundational rule pages, with complete headers and reused bodies; original English corpus retained; 127 spell and 239 magic-item bodies are available for further reuse | Remaining full-page rules/monster/high-level spell prose and tables; complete Chinese corpus coverage, authenticated browser search/navigation and English reading regression |
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
name/book/source provenance. All 239 bundled SRD 5.1 item bodies are translated,
including complete tables, embedded creature stats, figurine variants, curses,
alignment/class restrictions, capacities, charge/reset timing and permanent
ability/max changes. The 87 distinct source headers share keys; detailed cards
retain special attunement requirements, while previews begin with effects.
Closed type and rarity frames, including scroll/figurine/horn variants, display
in Chinese. Existing item, spell and rule terms are reused. Percentile 00 notation
is retained with an explanation. Inventory, model protocol, rulebook data and
runtime interfaces stay native. Workshop, other-book, changed and unknown prose
stays original. These are implementation-agent source-compared original drafts,
not independent human approval. The existing magic-item test now compares with
the entire SRD item set rather than selecting partial categories. All 239
source bodies/headers, signed numbers/dice, actual bilingual detail cards and
four picker/callback paths pass, plus all 185 frozen English item cards.
Catalog/types/changed-file lint passed once the final batch; no model, audio,
parser or production build was repeated. Only the affected equipment-help catalog
fingerprint was updated; immutable goldens were preserved. Earlier Unicode
preview/parser evidence remains valid; the legacy parser script needed a temporary
TypeScript TSX loader, not a verified permanent runner. Imported variant-specific
prose and authenticated browser/audio gates remain open.

Item-help loading now resets by canonical slug/name/campaign identity before
new effects run, retaining cached original text when only the viewer locale
changes. In-flight reads cancel on disposal. Manual retry clears prior results
and starts a fresh scoped direct/search attempt; ordinary 404 misses remain
separate from transport/server/JSON failures. Usable bundled fallback facts stay
visible with a retry notice when some reads fail. The existing focused magic-item
script passes scoped requests, miss/search recovery, failure/recovery, partial
facts, actual bilingual retry callbacks and identity/scope keys, alongside all
239 material projections and 185 immutable English cards. Catalog/types and
changed-file lint passed once; no model/audio/build rerun. The affected dialog
fingerprint was source-reviewed, not the original rule helpers or goldens.
Real browser cancellation/timing and authenticated acceptance remain open.

Anonymous browser acceptance used an isolated local test database on port 3005.
It exposed a cold-import failure: spell preparation recognized content templates
at module evaluation before the resource boundary registered them. Recognition
now happens at use time, retaining original text until resources arrive. The
existing spell workflow passes isolated cold import/late resource loading and
38 unchanged English projections. Catalog/types/changed-file lint pass. Actual
homepage English and Chinese switch and refresh both succeed; authenticated
character/campaign/play and voice acceptance are still open. Screenshot evidence
is outside Git at `/tmp/odm-home-locale-proof.png`.

Authenticated browser character creation used an isolated existing test account
and local database (no real user data or signup agreement). The six-step Chinese
hill-dwarf artificer flow covered background languages/tools, skills, standard
array, spell selection, loaded studded-leather help and final preview. It found
that off-list starter recommendations could be submitted and rejected at save.
Suggestions now require the available class pool or canonical checklist; the
no-pack pool also uses the shared supplemented class lists. The focused spell
workflow passes 11 checks, including the new no-pack case and all 38 unchanged
English fixtures. Catalog/types/changed-file lint pass once after the repair.
The same browser flow then saved and reopened the character successfully.
Evidence: `/tmp/odm-character-save-proof.png` outside Git. This proves one actual
creation/save/reopen path, not full character acceptance: reopened TrainingLines
still prints raw language/tool/armor/weapon values, and racial feature chips
still show raw dwarf traits. These two observed gaps are now repaired in the shared sheet components:
registered training labels use existing catalogs, and exact native race traits
require the feature race source plus the owning race identity. Unknown/custom
values and canonical records remain intact. The existing background-flow check
covers actual bilingual training rows, all native race trait chips and story,
wrong-race and custom preservation. Catalog/types/changed-file lint pass.
The saved character page was refreshed and shows these rows and traits in
Chinese; evidence is outside Git at `/tmp/odm-character-sheet-localized.png`.
Campaign-dialog browser behavior, authenticated language switching and broader
character variants remain open. No model or voice requests were made; the test
server's unavailable default model is not the approved Codex CLI backend.

Authenticated campaign browser acceptance completed the six-step Chinese
creation wizard, persisted a new AI-DM campaign with `zh-CN`, and imported the
previously saved character from the library into its lobby. The language menu
shows Simplified Chinese selected after creation and subsequent route loads.
Two concrete entry blockers were repaired: the Pixels dice client directive
was below an import, and unused legacy settings-info exports read translation
resources at module evaluation before registration. The creator and lobby
already call `tableInfo` at render time; removing the unreferenced eager exports
keeps that shared source and English copy unchanged. The existing Chinese table
settings workflow plus catalog/types/changed-file lint pass. Actual campaign
and character-selection routes now load; screenshot is outside Git at
`/tmp/odm-chinese-campaign-lobby.png`. This is creation/lobby acceptance only.
Active play awaits configuring this isolated server's approved Codex CLI
harness backend; its unavailable default Qwen endpoint was not used for a DM
request. Local TTS and final authenticated bilingual journey remain open.

The isolated browser server now uses the Codex CLI subscription harness for
story and utility, with model overrides blank (the user's current default).
Codex CLI reports 0.162.1; a read-only app-server thread/start, without any
additional generation, resolves that default to `gpt-6-sol`. This records the
resolved runtime configuration, not a model field separately captured for
every generation. Actual browser kickoff and a player action asking travellers
about the temple completed as persisted DM turns (3 and 2 calls respectively),
with Chinese narrative and next-action prompts. Screenshot remains outside Git
at `/tmp/odm-chinese-play-codex.png`.

That journey exposed an English kickoff instruction in the player log. New
kickoffs now persist a locale-bound event notice; the model-history projector
reconstructs the original instruction from the event. English text stays exact,
and earlier unkeyed history is untouched, including this test campaign's old
kickoff. The existing survival/localization script checks both human/AI modes,
both locales, event validation/persistence and actual buildDmMessages input,
alongside existing rest/death/reaction cases. Catalog/types/changed-file lint
pass once. No combat reacceptance was repeated. The absent local image service
also exposed a raw English ComfyUI failure diagnostic; its player presentation
is the next concrete play-flow gap. Image generation and local TTS were not
accepted; authenticated English switch, further play/log/material ownership,
local voice and final full checks remain open.

Authenticated language separation now has browser evidence: the test account
switched its interface to English in account settings, revisited the active
campaign, and saw English controls with unchanged Chinese narration and
spotlight text. The account was restored to Chinese. Screenshot outside Git:
`/tmp/odm-english-ui-chinese-story.png`. No new model or combat run was needed.

The complete observed ComfyUI transport failure now projects to a Chinese
player-readable service-unavailable notice. Original diagnostics and English
are preserved, and unknown errors retain their text. The existing chat-display
workflow checks actual bilingual MediaPlaceholder output and immutable status,
alongside its chat/private prose/callback checks. Catalog/types/changed-file
lint pass once. Refresh initially lost the failed map status and showed a continuing render
timer. That recovery gap is now repaired: image/map progress is persisted as
existing table events, and the authorized snapshot restores the latest state
for its included messages and locations. TTS retains its separate status path.
The existing event replay check covers failure behind unrelated history, latest
retry state, target/campaign isolation and separate TTS events. Catalog/types/
changed-file lint pass. A real retry against the confirmed absent local image
service persisted a map failure; the browser refresh now shows the Chinese
failure notice instead of a timer. Evidence outside Git:
`/tmp/odm-map-failure-recovery.png`. No new model request was needed. Voice and final full gates
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

Delivery follows complete player flows: character creation and sheet → campaign
creation and entry → active play and logs → local single-narrator speech.
Finish one flow's concrete gaps before starting another. Source investigation
and settled-name review are not standalone delivery batches. Use one focused
check per flow batch, not a new acceptance cycle for every component. Report
player-visible outcomes and the next flow; remaining owner counts are only an
audit aid. External TTS setup must not hold up independently available UI work.

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
backend. Chinese TTS now has partial real CPU acceptance in [the runtime record](validation/chinese-tts-runtime.json); discover installed voices before
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

### Native spell help and voice-quality boundary (2026-10-13)

Complete source-bound Chinese help now covers **127/319 native SRD spells**, including every cantrip, first-level and second-level spell; **192 third-level and higher bodies remain**. The last second-level batch closes Detect Thoughts, Enhance Ability, Enlarge/Reduce, Enthrall, Find Steed, Flame Blade, Flaming Sphere, Gust of Wind, Heat Metal, Levitate, Magic Mouth, Moonbeam, Rope Trick, Spike Growth, Suggestion, Warding Bond, Web and Zone of Truth. The newest batch adds Acid Arrow, Alter Self, Animal Messenger, Arcane Lock, Arcanist's Magic Aura, Augury, Blindness/Deafness, Branding Smite, Calm Emotions, Continual Flame, Darkness, Find Traps, Gentle Repose, Locate Animals or Plants, Locate Object and Ray of Enfeeblement. The second-level batch covers Aid, Lesser Restoration, Misty Step, Invisibility, Blur, Mirror Image, Hold Person, Silence, Darkvision, See Invisibility, Spider Climb, Knock, Magic Weapon, Scorching Ray, Shatter, Spiritual Weapon, Prayer of Healing, Pass without Trace, Protection from Poison and Barkskin. The latest batch closes Find Familiar, Heroism, Hideous Laughter, Hunter's Mark, Identify, Illusory Script, Inflict Wounds, Jump, Longstrider, Protection from Evil and Good, Purify Food and Drink, Sanctuary, Shield of Faith, Speak with Animals, Unseen Servant and Animal Friendship. This is player-facing content help, not full rulebook translation.

Content help previously omitted the separate higher_level field; spell dialogs now include it in both locales. Complete-source matching preserves homebrew, other-book and modified variants. Canonical spell records and original English source remain unchanged. Prose lives in the selected-language content catalog; the presentation helper imports only thin metadata.

Animal Friendship's bundled English higher-level clause is truncated. Its Chinese meaning was verified against the publisher's [2014 Basic Rules entry](https://www.dndbeyond.com/spells/1993-animal-friendship): a higher spell slot permits one additional beast for each level above first. The full-source key still matches the original bundled text; this correction is confined to the Chinese presentation, with no silent rewrite of English source or protocol data.

The grouped source check covers all registered bodies, requires every native cantrip/first-level/second-level entry, and checks higher-level clauses, numeric/dice retention, English preservation, modified-source/homebrew/other-book preservation and unchanged canonical records. Catalog, TypeScript and changed-file lint passed once for the final batch. Translation review is implementation-agent source review, not independent human proofreading.

The user rejected the current Kokoro Chinese sample as unpleasant. Generation/decode and outage/retry evidence remain valid, but Chinese narrator quality has failed acceptance. Text completion takes priority; further voice acceptance requires an acceptable voice.

### Rulebook full-page presentation (2026-10-13)

The page API accepts an optional locale and returns a separate display object. Canonical page data, page IDs, folios, chapter membership, neighbours and workshop-copy inputs remain English/source-owned. Complete page coverage is now 379/933: all 127 native cantrip, first-level and second-level spell pages, all 239 magic-item pages, and thirteen foundational rule pages (Conditions, Inspiration, Coinage, Selling Treasure, Racial Traits, Beyond 1st Level, Alignment, Languages, Trade Goods, Feats, Armor, Tools and Mounts and Vehicles). Spell header review covers all eight casting-time forms, 11 ranges, 69 component combinations and 18 duration forms, preserving reaction triggers, material costs, consumption requirements and concentration. Item titles, rarity/type/attunement headers, full tables and embedded blocks reuse the already reviewed item catalogs without duplicating prose. Translated headers include school/level, casting time (including Shield's reaction trigger), range, verbal/somatic/material components and duration/concentration; effect and higher-level prose reuse the existing spell-help catalog. No full English or Chinese book corpus is imported by the reader client. Additional locales use the same AppLocale/display interface.

Reader caches are separated by locale and page ID, a locale change refreshes the current page, and stale navigation responses from another locale are discarded. Chinese italic spell references resolve to canonical page IDs. The full-source/header/meta checks preserve modified sources instead of translating by title alone. A focused test renders all 127 real spell-page components in both locales, requires every low-level spell page, checks all 239 complete item projections plus four table/embedded-block pages in the real renderer, cached-display language isolation, English and canonical preservation, changed-source rejection and an actual Chinese link click to Magic Missile. Types, catalog checks and changed-file lint passed. Asynchronous cache refresh and authenticated browser reading/search remain part of the final text journey; this unit does not claim all 933 pages translated.

### Native rules prose and stable anchors (2026-10-13)

Four full rules pages are translated and rendered: Conditions (all 15 states and the six-level exhaustion table), Inspiration, Coinage (complete currency exchange table) and Selling Treasure. Large native prose translations live in a server-only per-locale page catalog, outside the UI/content client chunks. Every record carries a SHA-256 signature over the canonical ID, title, kind, metadata and complete original Markdown; changed sources retain their original display until reviewed. The locale registry can add further page catalogs without special cases in reader components.

Translated headings and sidebars retain native anchors in structural order; duplicate Chinese headings do not collapse quick links. Structural mismatches cannot silently remap headings. The focused renderer/source test verifies all four pages, original anchors including exhaustion/poisoned, unchanged numeric table cells, full-source/title modification rejection and English/canonical preservation. It also exercises invalid anchor-shape rejection. Catalog and types passed. Changed-file lint found a React Compiler memo dependency mismatch; the dependency was corrected and only that affected file was rechecked successfully. These are implementation-agent source reviews; independent human proofreading and final authenticated Chinese search/navigation remain open.

The next prose batch adds six full pages: Racial Traits, Beyond 1st Level, Alignment, Languages, Trade Goods and Feats (including the complete Grappler entry). XP/proficiency values and commodity prices/weights remain exact; full source fingerprints and native heading anchors are checked. Language names match the existing character-training catalog (Goblin: 哥布林语; Deep Speech: 深层语; Sylvan: 林地语; Auran: 气族语), and Neutral (N) uses the character builder's 绝对中立 label. The grouped test now enumerates every registered prose page rather than a fixed four-page list; it renders all ten pages, preserves tables and links, and rejects modified sources. Its initial title assertion was corrected to read visible text rather than raw HTML because numeric title digits are wrapped in spans. The focused check, TypeScript and changed-script lint passed; unchanged UI catalogs were not regenerated or retested for this prose-only batch. Independent human proofreading and final full-suite/browser gates remain open.

### Native Chinese rulebook search (2026-10-13)

Search now builds a cached index for each requested display locale, including the translated full prose and headers, with preserved native heading/sidebar anchors. The original English index and English query behavior remain separate. CJK word runs use adjacent-character terms plus single-character prefix support; Latin stemming and ranking are preserved. Direct Chinese queries and existing canonical/alias queries are searched separately, merged by canonical page/passage identity, and projected into the displayed page's title, chapter, heading and snippet. Untranslated pages intentionally retain source English until their full translations are added. No model or embedding calls are required.

Chinese snippets center on matching text instead of relying on spaces, and overlapping Chinese highlight terms merge into a single visible span. Mixed Latin/number terms retain highlighting and React text escaping. All 239 magic-item page projections now also carry their original anchors, matching both search and reading. The dedicated focused search check covers named rules, full Chinese sentences, mixed currency/numeric queries, single-character typing, English canonical names in a Chinese view, empty/no-hit queries, snippet bounds, real component highlighting and HTML escaping. The initial expectation that 熟练加值 must rank the advancement table first was corrected: the canonical Proficiency Bonus rules passage is legitimately ranked first; the translated advancement table remains among the results. All 21 existing English rulebook checks, the bilingual page projection check, types and changed-file lint passed. Final authenticated search/navigation remains unverified, and overall page coverage remains 376/933.

The equipment prose batch adds Armor, Tools and Mounts and Vehicles in full, including all six source tables. Armor proficiency restrictions, AC/dexterity formulas, strength/speed requirements, shields and don/doff times remain source-faithful. Tool and instrument names match the owned equipment catalog. Mount carrying capacities, drawn-vehicle multipliers and fractional vessel speeds remain unchanged. The existing grouped renderer check now includes all thirteen prose pages and compares signed/multiplied/fractional numeric table tokens, native anchors, source fingerprints and English preservation. That focused check, types and changed-script lint passed. Unchanged UI catalogs/search/model/voice checks were not repeated. Full translation coverage is 379/933 pages; page fraction is not word-volume completion.
