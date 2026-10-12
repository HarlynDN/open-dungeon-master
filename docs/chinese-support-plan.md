# Simplified Chinese development plan

This is the current plan, not a chronological execution ledger. The original
100 KB ledger, screenshots, complete pre-repair checkout and binary patch were
preserved outside Git during the 2026-10-11 repair checkpoint. The larger play
flow remains incomplete; the review-repair checkpoint is a separate scoped task.

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
| UI | **335/440** covered files, **0** pending literal sites, **15323** message keys; scoped AST gate; earlier play/session surfaces plus hand labels/targets/area selection, campaign-locale action sentences, native previews, basic/reaction rules, common casting refusals, spell selectors, all 113 owned mechanic notes, 103 native technique and 23 maneuver labels, attack/bonus-route and material/ritual refusals, built-in form attack names and verified current-actor labels, correction/multi-picker chrome, native downtime facts and inventory/vitals approval/player-trade controls, guided progression chrome, rest/loot/travel moments and all native option summaries, owned generic feature/feat summaries, feat choice controls, campaign/map entry notices the complete app help walkthrough story/chronicle/arc controls, NPC roster review, campaign model controls market/shelf/trade, party-lead, quest-log/faction controls plus facts, pinned memories, context-trace presentation and passage edit/reroll/action controls and character/companion entry and private-chat/media presentation and audit/timeline controls and dice tray/source controls and board movement/camera/order/area/target/drawing and DM placement/measurement controls | 105 zero-literal owners still require dynamic composition/source-ownership review; locale-sensitive selection thresholds and backend/native messages remain audit items; file fraction is not overall completion or an effort estimate |
| Character creation/material | Identity, ancestry, class introductions, ability allocation, gear, spell book/preparation and finish preview; 517 spell and 228 equipment names; 257-entry contextual terminology policy and lint gate; 415/415 static registered resource names and guidance shared with DM references; 135/135 bundled option names/descriptions plus all 20 nonempty requirement frames; 146 shared/class-specific feature summaries, 54 native feat summaries and owned feat choice controls; four native pregen card summaries and backstories; original-source review records | Remaining specific/themed feature and magic-item material; dynamic free-cast resources and user-authored/pack text remain outside the static resource review |
| Player system logs | Structured rule diagnostics, engine-generated combat conclusions and structured audit/timeline presentation retain English protocol semantics with localized display | General player-visible log templates; model-facing English tool results remain independent |
| Resource delivery | UI/content/help scopes; selected-locale help loads independently on open, with retry; character/campaign boundaries; generated resources checked by lint; production Turbopack build and anonymous bilingual browser switch/reload succeed; home/character/campaign SSR and initial-script payloads measured | Hydrated/lazy network totals, authenticated campaign switching and active-play browser acceptance; route-level JS payload remains large |
| Local Chinese TTS | Locale capability/voice preferences planned | Service not configured; implement/validate Unicode segmentation, voice discovery, locale-sensitive cache, numbers/units/names and real playback |
| Final play flow | Recorded Chinese exploration/social/utility and combat/slot/correction acceptance on Codex | Complete Chinese journey, English regression and real local TTS acceptance |

The concrete UI scope and deferred areas are in
[ui-localization.json](validation/ui-localization.json). The checker rejects new
literal sites in covered files. Run `npm run i18n:inventory` to refresh a local
inventory; do not count deferred files as promised first-release delivery.

## Lightweight verification policy

The user explicitly requested that verification not slow delivery. Delivery units
are complete pages or player flows, grouping ordinary copy across their components.
Run catalog/coverage/terminology and types once per batch; add a focused interaction
check only for changed behavior or shared dynamic display logic. Reuse established
name/source evidence. Do not create exhaustive render snapshots or separate test
scripts for each static component. Keep unrelated fixes outside copy batches unless
they block the translated flow. Record and commit at flow/phase checkpoints, with
full regression, lint and production builds at meaningful phase boundaries and
final acceptance. Once relevant checks pass, stop validation and continue delivery.
Repeat only after a new change, failure or specific unresolved concern; progress
reports reuse existing logs instead of starting another check.

Delivery priority is remaining main-play UI by complete workflows, followed by
local single-narrator TTS and the final real journey. Work proceeds in grouped
workflow batches, with one translation/type gate and one necessary focused
interaction check at the end of the batch. Do not create a separate acceptance
cycle or commit for every label or file. Report completed workflows and open
acceptance gates; file coverage alone does not measure delivery progress.
Inventory pending owners once per batch and handle static captions together;
audit their dynamic messages in the same pass. A new adjacent fix must unblock
that workflow. Optional refactors and unrelated hardening wait. Whole-suite,
production build, real DM and audio checks stay at their relevant phase/final
boundary; repeat a passed check only after a relevant change or failure. Completed name/terminology
work is not reopened without a new defect. Keep each UI batch bounded to its
own owners and fix adjacent behavior only when it prevents that workflow from
working in Chinese; do not expand into unrelated infrastructure or deep editors.

Turn controls passed six focused interaction scenarios, 32 exact pre-edit English
renders, relevant existing floor/hand/retry regressions, types and changed-file
lint. Root UI payloads and all existing translation values/goldens are unchanged.
One new terminology warning distinguishes the menu action Message from the spell
Message (传讯术); those are different contexts. Current default Turbopack build
attempts were blocked at its internal port binding by the execution environment,
including the escalated attempt; this batch does not claim a passing production
build. Keep that gate for the next phase boundary rather than retrying per batch.

The latest shared-surface checkpoint closes nine remaining literal owners in
one batch: the session column, board effects, terrain canvas, trade quantities,
shared prompts and admin secret fields, root metadata, plus native budget/forge
helpers whose machine tokens had been counted as captions. It adds 27 UI keys.
All native FX captions (miss, fumble, saved, half, critical, condition/end,
death and five door states) now follow viewer locale; event enums, visibility,
amounts, queue timing, animations, sounds and haptics stay native. Hit/fail still
have no caption. Unknown condition labels remain literal. Zoom controls, secret
kept/unset/clear controls and default prompt buttons localize; secret sentinels,
field values and authored titles/custom actions do not. Prompts protect
composition-confirming Enter without changing trim, length or empty rules.

Generic report targets now carry role metadata, so locale switching re-projects
both target and completed-report/block text without mistaking a real name for
that role. Requests contain the original IDs/reason/details only. Four owned
message-action failures are source-bound and recognized by composer/passage
renderers; five action callbacks catch network failures. A refused canon-pin
write retains an error and does not call refreshFacts as if it succeeded.
Root generateMetadata follows the same request-local account/cookie/browser
preference as the page; Open Dungeon Master/Open DM remain invariant brands.
Budget ceiling/theme cave identifiers remain fixed machine data, with their
actual display owners reviewed separately. This checkpoint does not claim
Chinese natural-language inference by the forge classifier.

Validation: translation/AST/terminology and types passed; one grouped mock
check (`/tmp/odm-surface-ui-check.log`) compares 17 actual English FX renders to
the pre-edit renderer and exercises Chinese captions, prompt IME/submit,
masked-secret callbacks, authored-name versus generic report targets, completed
receipt switching, original message request bodies and failure recovery, and
request-local root descriptions. Test fixtures were corrected to use the
existing action:select protocol and to inspect the report title instead of
expecting an unnamed success message to include a target. No source behavior
was changed to accommodate those fixture errors. Changed-file lint also passed. No model/audio/full-suite/build acceptance was repeated.
Current UI: 335/440 reviewed, 0 pending literal sites, 15323 message keys.
The 105 zero-literal owners and dynamic backend/owned material still need review;
zero literals is a syntax milestone, not completion of UI or the full goal.

The latest character-flow checkpoint closes six owners after reviewing the live
builder/sheet/correction display paths: submission gates, server roll/table-rule
feedback, sheet state, native lineage helpers, lead correction and shared image
lightbox. Existing typed BuilderPresentation and RuleProblem paths already
localize the builder's blockers; this batch source-binds their native English
compatibility strings to those same display keys. It does not claim new
translations for already translated gates. The metadata lives in the characters
module and has no runtime catalog or active-locale dependency, preserving the
pure submission boundary. The AST gate checks all 22 source bindings against
the existing English catalog. HP/speed/state/defense/charge/counter call sites
pass viewer locale; hit-die class IDs and attunement refusals are projected at
their actual sheet callers. Stored names, ready triggers and unknown condition
or spell text stay raw. ALL retains its native ASI sentinel and numeric values.
The original source-review records were refreshed only for the four inspected
changed source files, with the new shared source dependency recorded for builder
feedback; existing catalog values and frozen outputs were not regenerated.

Three new UI keys cover image enlargement, download and close. Authored caption,
alt and asset URL are unchanged. Filename generation now retains Unicode letters
and numbers, so a Chinese portrait caption yields a Chinese filename; English
slugs and extension handling remain the same.

Validation: translation/AST/terminology and types passed; the existing builder
feedback check passed after restoring its required pure-module import boundary
and refreshing the reviewed source fingerprint (11 enforced checks, including
all 32 real gate codes and 13 frozen picker outputs). One grouped mock check
compares six actual sheet-state scenarios to the pre-edit English result and
checks bilingual image controls, Unicode filenames and authored text/URL
preservation (`/tmp/odm-character-flow-ui-check.log`). No model, audio, full-suite
or production build was repeated. Current UI: 326/440, 17 pending literal sites,
15296 message keys. Remaining zero-literal owners still require dynamic review;
these figures are not whole-goal completion.

The latest content-import checkpoint completes the picker from source selection
through preview and the immediate import receipt. Its 24 native planner notice
codes carry typed facts beside unchanged English diagnostics, so future locales
can project the same result. All 51 new captions/templates stay in UI scope for
campaign creation as well as the lobby; no content bundle is required for the
picker's own chrome. Authored names, link labels, ranks and missing monster
references remain literal. Receipts are held as data and re-rendered on a language
switch without another POST. The API now forwards the native producer's existing
unresolved references and world conflicts instead of dropping those diagnostics.
Source and preview failures show retry controls; empty results are a separate
state. An aborted/old selection cannot replace a newer preview, and pending or
failed previews block the immediate-import button. Failed mutations keep the
selection and settle to an error, not a success notice. Campaign creation still
passes the original selection to its existing post-creation import helper.
One adjacent dynamic sheet gap is closed: unlimited-use resource notes use the
existing exact native-ID/source-bound translation instead of raw guidance.

Validation reuses the 28 native planner assertions once and groups 21 actual
bilingual planner notices with receipt/request/failure/cancellation mock checks
(`/tmp/odm-import-flow-check.log`). Translation/AST/terminology and types are the
batch gates; this is source and mocked-interaction evidence, not real browser,
model or audio acceptance. Current UI: 320/440 covered, 39 pending literal sites,
15293 keys. The sheet-state owner stays pending for its remaining source captions.
No completed monster terminology or combat runtime acceptance was repeated.

The latest monster/map checkpoint closes three owners: DM monster hand, battle-map
panel and pure map tool state. It adds 85 content keys for hand chrome, generic
mechanism labels, structured routine/ability/flee notes, selected-target/HP/AC
frames and native eligibility/recharge/use refusals. Unknown custom mechanism names
and printed/manual trait prose remain original; broader owned-material review is
still a separate gate. Source-bound rule segments and original swing names are
optional display metadata; original attack/ability names and complete intents,
dice/conditions/advantage/target IDs remain canonical. Party targets explicitly
retain character-name provenance independently from their AC-known preview kind.
Raw adjudication receipts retain contemporaneous name provenance and reproject
on a viewer-language switch without another action. Both HTTP and 200 engine
refusals leave the raised card/aim intact. Initiative forwarding bodies stay native.
Map compatibility captions are keyed source metadata bound to existing translated
rail/hotkey catalogs, including actual shape descriptions. Keyboard sequences,
capability filtering and CanvasTool outputs stay unchanged, with fresh edit rows
per help call. Board native notices use source-bound constants consumed by the
existing display adapter; geometry, prompt/condition semantics and requests stay
unchanged. The literal keyboard key esc is invariant.
Checks: 12 existing monster-hand regressions and one grouped mocked bilingual
hand/card/material/receipt/refusal/initiative check, raw custom text and character-
name provenance, both map capability sets, localized mode/help captions and
unchanged shortcut keys; catalog/AST/terms (zero errors, 357 contextual warnings)
and types. No real model/audio/browser or full suite/build was repeated.
Current UI: 319/440, 39 pending sites, 15242 keys. Low literal count does not prove
remaining dynamic ownership or content/TTS/end-to-end completion.

The preceding review/session checkpoint closes eight owners: lore-check dialog,
session settings, side-panel shell, dictation field, handout stage, Markdown,
composer gate and session orchestration. It adds 151 UI keys, including the
native player/DM first-use tours and known dictation/lore diagnostics. Typed
composer phases select display templates; eligibility, spotlight/held names and
English default remain native, with a source-binding gate. SessionView uses
memoized viewer-localized tour steps and existing lazy-help metadata; canonical
routes, submit bodies, authority and independent child-owner scope stay intact.
Lore evidence quotes/refs and generated explanation/rewrite stay raw; acceptance
still splices only the selected original passage. Known labels/errors project at
render time. Settings preserve authored title/theme and raw difficulty enum;
only its display label and numeric summary change. Both width captions localize.
Dictation localizes chrome, timestamps/chunk progress and native hint/partial
retention diagnostics, while leaving recognizer language/provider, speech text
and recording/transcription callbacks unchanged. Chinese STT remains deferred.
Handout binder fields require the current lore ID, preventing stale text/image/
attachment reuse. Markdown preserves source/links and DM-only secret filtering;
failed or missing rolls settle visibly, clear stale results and invoke once.
Checks: one grouped mocked bilingual interaction pass covers evidence/rewrite/
source Markdown/handout/transcript, read-only permissions, run/accept payload and
splice, refused acceptance, failed roll, stale binder provenance, dictation callback
and retained-text hint, tour IDs/anchors/prepare callbacks, and 25 gate/default-
English comparisons against the actual pre-edit source. Catalog/AST/terms pass
(zero errors, 344 contextual warnings) and types pass. No real model/audio/browser
or full suite/build was repeated. Current UI: 316/440, 114 pending sites, 15157 keys.

The preceding reading-flow checkpoint closes seven owners: rulebook route, reader,
contents, page, embedded dialog, workshop-copy bridge and shared story book. It
adds 171 UI keys for chrome, numeric counters, native quick links, 20 part/chapter
headers/blurbs and project-written rule-to-game bridge explanations. Body Markdown,
entry titles/meta, snippets, italic xrefs, source/legal URLs and story entries stay
original; full rulebook translation remains deferred. Native navigation/header and
bridge/quick-link source bindings are gated. CC-BY-4.0 is an invariant license name.
Optional search locale expands registered names/terms as independent canonical
queries; this preserves the native exact-title boost and avoids requiring several
unrelated aliases in the same passage. Omitted/en locale uses the old query path;
IDs/anchors/source text stay unchanged. Search transport failures show retry,
not zero results; failed page navigation keeps the held page and retries the
failed ID. Workshop-copy refusal/network failure is distinct from an empty list;
original newest-workshop/editor/page routing and bookmark storage keys stay native.
Checks: 21 existing rulebook regressions, grouped mocked bilingual reader/page/book
and search/IME/copy/refusal/retry checks, English search parity, Chinese name/term
retrieval, raw bodies/custom metadata, catalog/AST/terms (zero errors, 334 contextual
warnings) and types. No real model/audio/browser or full suite/build was repeated.
Current UI: 308/440, 185 pending sites, 15006 keys.

The preceding entry-flow checkpoint closes five owners: invitation landing, workshop
shelf, bundle preview/confirm, workshop help and shared tour chrome. It adds 282
keys, with long help/13 native tool guides in the selected-locale help scope and
shelf/entry captions in UI. Guide and shelf-tour source bindings are checked.
Invitation failures use existing stable auth codes; uppercase invite code, source
names and join POST semantics remain intact. Bundle text, kind IDs, shared-home
IDs and authored manifests stay raw; only bounded native dependency, warning,
refusal and rename frames project. Malformed schema detail remains an original
technical diagnostic after the translated field context; unknown extensions stay
literal. Empty/read-failed workshop lists now render their actual branches;
create/clone/delete failures surface without discarding held rows. Help has an
open-only loader with translated retry; tour IDs/anchors/prepare actions stay native.
Three obsolete English/Chinese help claims were corrected against the existing
bundle exporter: the whole account shelf or only used entries may travel, rather
than claiming self-built monsters never travel. Export behavior is unchanged.
Validation: one grouped mocked bilingual flow check for 13 guides, shelf tour,
join/shelf/help/bundle rendering, original names/extension strings, load failure
vs empty, create/import/join payloads, rename notice, refused delete and network
settlement; catalog/AST/terms and types. No real model/audio/browser or full
suite/build was repeated. Current UI: 301/440, 240 pending sites, 14835 keys.

The preceding storyboard/inbox checkpoint closes five owners: both DM storyboard
layouts, the shared card editor, card board, suggestions/compiler/shared-workshop
asides and private inbox. It adds 133 content keys. Native kind/link/route enums,
IDs, graph operations and request bodies stay unchanged; authored card titles,
body/route conditions, private messages and inventory/workshop names stay literal.
Suggestion display requires the original producer's exact title/reason frames;
unknown extension strings stay raw. Clicking a native suggestion inserts its
localized proposed title explicitly, without changing saved card history.
Compile previews project only native bounded count/refusal frames. Add/save/share
transport failures now settle visibly. Refused deletes retain the open editor
and board, with a retryable error and released busy state.
Checks: catalog/AST/terminology and types (zero errors, 327 contextual warnings); one grouped mocked check for bilingual
rendering, 39 producer suggestions, raw authored/extension text, kind/link/route
callbacks, POST/send_whisper bodies, composition guard, refused-delete retention
and shared-workshop network settlement. No real model/audio/browser acceptance or
full suite/build was repeated. Current UI: 296/440, 332 pending sites, 14553 keys.

The preceding grouped console/table checkpoint closes seven owners: console
floor/tabs/queue/action rail, command palette, beat capture, temporary AI cover,
enemy HP correction, random-table rows and statblock lookup. It adds 143 content
keys and reuses all 99 source-bound action captions plus registered lexical
hints. Palette labels/groups switch locale while English action names/captions
stay searchable; command/tab/action IDs and callbacks remain native. Floor and
lookup HTTP/network failures now surface raw retryable notices without optimistic
state changes. Beat/history/table text and chains stay raw; an explicit
missingResult flag projects only a native absence notice. HP receipts retain
structured raw fields for display-language changes and preserve alive/min/max
rules. Cover/beat/floor/correction request bodies are unchanged.
Statblock search optionally accepts viewer locale for aliases, preserving legacy
English/empty-query ordering, slugs and source fields. Additive provenance marks
only the identical native genre row; pack/custom names remain literal and
synthetic default names are distinguished. Native genre names not yet registered
in the material glossary remain a content gate, rather than being guessed.
Types/catalog/AST/terms passed (zero errors, 319 contextual warnings), 11 existing
palette regressions and grouped mocked UI/lookup checks for bilingual command
search, IME selection, floor/beat/cover/HP bodies, raw receipts and table prose,
lookup locale/refusals, native-vs-pack provenance and baseline-name handling.
Current UI: 291/440, 408 pending sites, 14420 keys. No real model/audio/browser
journey or whole build was repeated for this UI batch.

The preceding monster-editor tail checkpoint closes the remaining three shared
field owners: structured actions/regeneration/routines, spellcasting and printed
stats/skills/senses/languages/alignment/habitat/trait sections. It adds 104 content
keys while reusing existing ability/skill/fictional-language/alignment/spell and
condition/damage projections. Canonical recharge/cost/save values, numeric slots
and daily limits, raw attack/routine/spell references, score/skill/sense keys,
environment/section values and English section prefixes remain unchanged.
Fictional-language labels resolve uniquely back to rule names while unknown
names stay authored text; Chinese spell aliases resolve against canonical
source records, preserving ambiguous/unknown terms. Chinese comma inputs are
accepted without changing the model protocol. Book prose stays outside this
field checkpoint; the shared editor's imported controls now have their own
coverage records instead of being left pending under a translated shell.
Types/catalog/AST/terms passed (zero errors, 307 contextual warnings), six existing
block-section regressions and a focused mock interaction/integration check for
recharge/cost/damage/regeneration/routine/slot/day/score/skill/sense/language/
alignment/environment/section callbacks and the complete shared editor render.
Current UI: 284/440, 504 pending sites, 14277 keys. No real browser/model/audio or
whole-suite/build acceptance was added to this ordinary UI batch.

The preceding grouped bestiary checkpoint closes nine owned UI surfaces: the
panel, builder, rows, editor shell, basic stat/attack/defence/movement fields,
catalogue controls, attack details, borrowing and printed-block chrome. It adds
221 content-scope keys. Existing source-bound class/ancestry/subclass/equipment
names, feature summaries, owned monster names and CR math display frames are
reused. Closed damage/condition inputs display locale labels and resolve uniquely
back to canonical values; custom text stays raw. Class/weapon/armour operations,
ranges, saves, booleans, movement strings, source-book prose and numeric CR
results retain original semantics. Optional tagLabel passes through shared list
chrome while keeping type-filter IDs native. Copy suffixes/default owned copy
names follow viewer locale, and search opts into the already-implemented locale
alias path. Failed create/save transport now returns a visible native notice and
releases busy state; errors and readouts remain raw until rendered.
Types/catalog/AST/terms passed (zero errors, 302 contextual warnings), 23 existing
monster-draft assertions and a grouped mocked workflow check for damage/custom
roundtrips, save/range/speed/weapon protocols, native tag filters, raw book prose,
create/search bodies and network recovery. Current UI: 281/440, 619 pending sites,
14173 keys. Stat/action/spellcasting children keep independent pending coverage;
this does not claim a fully translated editor, book or real browser/model/audio
acceptance. Passed checks were not broadened to a full suite/build for this batch.

The preceding encounter-preparation checkpoint closes five shared owners: the
form, placement/hidden/override/reward/phase extras, encounter rows and budget
bar, monster roster picker and reward/table reference picker. Ninety selected-
locale content keys cover owned chrome and numeric/caption frames. Saved roster
syntax, names, battlefield/map names, notes/rewards/phases, @kind reference lines,
slot indices, coordinates, selected IDs and budget geometry remain native.
Roster search opts into the existing registered-locale alias search on the
bestiary GET endpoint, keeping its CR filter and original English default.
Additive source/document metadata gates translated names; homebrew retains first
priority and its authored name, while picks append canonical references. A
single CJK character can search, failed reads show retry instead of an empty
result, and shortened queries clear stale loading. UI/search adapters use viewer
locale independently of campaign generation locale.
Types/catalog/AST/terms passed (zero errors, 285 contextual warnings), 18 existing
encounter-template regressions and focused mocked workflow/API checks for raw
roster/reference callbacks, map/slot/override values, budget geometry, source
provenance, CJK query parameters, CR-filter preservation, English query parity,
existing refusal branch and failure/loading recovery. Current UI: 272/440,
805 pending sites, 13952 keys. This is not real browser/model/audio acceptance.

The preceding shared DM-action checkpoint closes the form, field-input and held
board-result owners. All 99 native actions / 565 fields have source-bound
projections for 1064 unique labels, options, examples, help and confirmations;
1188 new content-scope keys include form controls and structured result frames.
Canonical action/field names, defaults, ranges, selected values, target IDs,
conditional-confirm gates and invoke request bodies remain unchanged. Unknown
custom metadata and authored narrative remain literal; typed lists additionally
accept Chinese commas. Raw results are held in form/banner state so a locale
switch changes only their display. An optional locale adapter formats engine
roll/HP/save/concentration/area-row conclusions while default English output and
model-facing handler results stay native. General engine/pack sentence coverage
remains an independent player-log gate rather than being declared complete.
Types/catalog/AST/terms passed (zero errors, 280 contextual warnings). The 36
invoke-catalog regressions include native field coverage/value parity and a
Chinese miss/result contract; one focused mocked UI check covers requests,
shares, typed lists, result tones/name provenance and held-result language
projection. Current UI: 267/440, 878 pending sites, 13862 keys. No real model,
audio or browser journey and no whole build were repeated for this batch.

The preceding NPC workflow checkpoint closes four shared editor/list/graph owners
with 116 content-scope keys. Numeric axes and relationships render in the viewer
locale; stock role labels resolve uniquely back to canonical IDs, while authored
names, roles, places, goals and notes remain editable original text. Alias input
accepts Chinese commas. SVG portrait IDs now retain distinct Chinese names and
an instance prefix instead of collapsing all Chinese names into one ASCII slug.
Personality generation requests strict canonical numeric JSON independent of
locale, validates complete integer axes before returning a usable suggestion,
and retains legacy English adjective compatibility. Other narrative fields keep
the campaign locale; malformed suggestions do not overwrite the draft.
Catalog/AST/terms and types passed (zero errors, 273 contextual warnings), plus
50 existing/extended forge assertions and a focused mock interaction check for
role roundtrips/custom ambiguity, Chinese aliases, session progress and distinct
Chinese portrait references. Current UI: 264/440, 903 pending sites, 12674 keys.
No real model/audio/browser acceptance is claimed for this copy batch.

The preceding grouped DM-tools checkpoint covers seven console owners: assist,
odds, workbench, prepared encounters, NPC forge shell, random tables and shared
clear/close controls. It adds 391 content-scope keys including source-bound
labels/summaries for all 99 native adjudications. Generation bodies/model reasons,
authored text/reference syntax and raw readouts stay native; owned numeric frames
and known diagnostics project at render time. Duplicate suffixes follow viewer
locale; an explicit ephemeral missing-result flag distinguishes a missing table
answer from an authored row with identical text. Shared form/picker/editor/row
owners still have independent pending coverage.

Candidate ranking reuses CJK tokens and accepts injected registered-locale
captions/keywords. Canonical action/field names, model prompt shortlist, encounter
gates, request bodies, crit rules, cues and private-roll visibility stay intact.
Types/catalog/AST/terms passed (zero errors, 264 contextual warnings), plus 8 assist
and 17 workbench regressions and one grouped fixture: 99 caption bindings, six
Chinese intents with English ranking parity, three native readouts and key
callbacks/table-result provenance. Current UI: 260/440, 954 pending sites, 12558
keys. No real model/media/social request, browser journey or full build acceptance.

The preceding reference metrics checkpoint closes the compare/calculator owners.
All five calculators have translated metadata, choices, results, units and notes;
190 content-scope keys project complete owned numeric frames without recomputing
anything. Context separates encounter Medium from body-size Medium and spell
levels from character levels. Comparison chrome/rows/known facts and derive-CR
notes translate; material/trait and unknown pack prose retain original text.
Additive documentSlug provenance gates header/chip names without changing native
slugs, comparison arithmetic, raw cells/diff flags, inputs, defaults or callbacks.

Types, catalog/AST/terms (zero errors, 253 contextual warnings), 40 existing desk
checks and one focused suite passed: 10 calculator cases preserve English/numeric
values, plus source-gated comparison facts/prose and native choice/remove callbacks.
Current UI: 253/440 files, 1122 pending sites, 12167 keys. This is source/fixture
acceptance, not a real browser/model/audio journey or a full regression/build.

The preceding grouped reference/social checkpoint adds 153 keys, with reference
copy in content scope and social/about chrome in UI scope. Six UI owners and the
new reference resource boundary are covered: 251/440 files, 1135 pending sites,
11977 keys. Browse/desk reuse reviewed glossary/name/summary display; authored
rules, extended book/pack prose and citation quotes retain their original text.
Open dialogs retain source identity for locale switching; about clipboard reports
retain their English diagnostic format. Compare/calculator owners remain pending.

Reference spell/monster queries opt into registered alias search with deduped,
stable pack offsets; equipment reuses its native search with an opt-in separate
homebrew offset contract. Legacy callers keep their original behavior. Desk
retrieval reuses CJK tokens and registered name/glossary aliases while the question,
evidence text, citation checking and existing model configuration remain native.
Types, catalog/AST/terms (zero errors, 241 contextual warnings), 40 existing desk
checks and one focused display/retrieval/paging fixture suite passed. No real
model/social/network/clipboard/browser journey or full regression/build claimed.

The preceding grouped setup-flow checkpoint adds 268 global UI keys and closes 12
owners (11 UI owners plus the unchanged source-only draft module). Entry/welcome,
wizard steps/blockers/save feedback, storyteller selection, joining/invite controls,
personal-agent permissions and backend/agent/image/speech test presentation now
follow viewer uiLocale. Native IDs/defaults/requests and external diagnostics stay
literal; the editable personal-agent default name is initialized in viewer locale.
One shared focused check covers dynamic source frames, bilingual provider-switch
state, canonical key/provider callbacks, picture names/counts and the personal-agent
request with mock transport. Types and catalog/AST/terms passed once: 244/439,
1241 pending sites, 11824 keys, zero errors and 233 contextual warnings. No real
services/downloads/auth, full regression/build or Chinese STT/TTS acceptance.

The preceding setup-media checkpoint adds 60 global UI keys for picture/voice
choices, discovery captions, saved-key hints and preview feedback. Native defaults,
provider/model/voice IDs, URLs, keys and request bodies remain unchanged. Owned
speech failures translate while upstream details remain literal. One intentional
bilingual copy correction requires a workflow-compatible checkpoint. Refused,
unreadable or missing-audio replies cannot report a successful preview.

Existing checks passed: 14 English renders (generated accessibility IDs and the
explicit copy correction normalized), 14 native speech-failure frames, provider/
voice/key/request callbacks with mock fetch/audio, types and catalog/AST/terms:
232/439 covered, 1431 pending sites, 11556 keys, zero terminology errors and 227
context warnings. No real media service/playback or Chinese STT acceptance; the
preview's locale and local Chinese TTS runtime remain future work. These passed
checks are reused; they were not repeated for documentation or this status report.

The preceding setup-guide checkpoint adds 76 global UI keys. Agent program/auth/
install/default/story/utility selection, capability recap and shared recommended/
context captions now follow viewer uiLocale. Native program/model IDs, default
values, cheap-first ordering, paths, versions, masked accounts/plans, commands,
configured/reachable decisions and wizard step/jump values remain unchanged.
Only complete owned harness status frames translate; external diagnostics stay
literal. Three owners are newly covered; storyteller/media/test-panel owners
remain independent and pending.

Agent discovery now reports failed/unreadable responses with retry, retaining
previous statuses until a successful reply. Capability failures report unknown
status instead of perpetual asking; malformed consumed capability fields cannot
crash the recap. Both checks release busy and clear failure after a valid reply,
without automatic retry. No configuration defaults or stored settings changed.

Thirteen English renders matched with generated accessibility IDs normalized,
plus Chinese chrome/status/source frames, native model/default/order/command/
path/account/jump callbacks and mock discovery failure/recovery. Types and
catalog/AST/terms passed: 231/439 covered, 1483 pending sites, 11496 keys, zero
errors and 225 contextual warnings. No real CLI/auth/model/media service, full
suite, lint or build was run. These rows report configuration/connectivity,
not Chinese model/TTS acceptance; related checks stopped after passing.

The preceding move-effect checkpoint adds 19 content-scope keys. Whole zero-damage,
fall, form-return/overflow and quake notices now project to viewer uiLocale.
Compound frames precede atomic damage frames; an unrecognized attached outcome
preserves the entire raw source. Shared source/mitigation display handles fissure
fall distances, native damage-type amounts and all five damageAdjust notes.
Opportunity text explicitly describes the raw damage roll, preserving its number
without claiming the same HP deduction after resistance/immunity.

Movement notices capture copied name/kind context before refresh. Token removal
or rename cannot lose that ephemeral projection; locale changes still redraw
from the original English note. Timers, IDs, tones, stack size, raw response body,
rules and model/tool results remain unchanged. No new UI owner is marked complete;
BattleMapPanel still awaits the broader diagnostic/remaining-owner closure.

Sixteen outcome frames/exact English renders, five actual native mitigation
notes, roll-versus-HP distinction, unknown compound preservation and removed/
renamed actor snapshots passed with mocked timers. Types and catalog/AST/terms
passed: 228/439 covered, 1558 pending sites, 11420 keys, zero errors and 222
contextual warnings. No live combat/model/audio, full suite, lint or build was
run; verification stopped after these related gates.

The preceding board-operation checkpoint adds 50 content-scope keys. Forty-two
owned move/jump/drag/draw/placement refusal frames now project to viewer uiLocale,
retaining raw English results, numbers, coordinates and typed token-name context.
Unknown diagnostics and authored conditions remain literal. Exact displayed
Chinese mechanic names resolve to native condition names before invocation;
ambiguous names refuse locally rather than guessing, while English inputs keep
their previous values. The prompt's example is localized.

Failed HTTP invokes without an error field now refuse. Erase/measure network
failures expose feedback and release busy state without retry; a failed measure
retains its origin. Roll-tool chrome is newly covered with native hint/size/seed/
callback behavior unchanged. BattleMapPanel remains pending for full special
move-effect notes and broader diagnostic closure, despite its translated chrome.

Focused checks passed 42 refusal frames, eight actual native jump refusals,
15 basic Chinese condition aliases, authored/English inputs, five exact English
renders, canonical condition request and ambiguous-input block, HTTP refusal and
erase/measure recovery with mocked stage/transport. Types and catalog/AST/terms
passed: 228/439 covered, 1558 pending sites, 11401 keys, zero errors and 222
contextual warnings. No live engine/model/audio, full suite, lint or build was
run; settled material/name checks were not repeated.

The preceding gallery/tileset checkpoint adds 402 keys (399 content-scope and three
global list-control keys). Map cards, tileset/view/override/picker chrome, six
terrain roles, 27 native style notes and all 346 owned material names use viewer
uiLocale. Exact native ID/source matching preserves changed/custom names; known
binding IDs can display translated names before their art loads. Original tags,
notes, dimensions, styles, art paths, asset IDs and map data remain unchanged.

Chinese material search matches translated owned names plus native labels/IDs,
keeping native category eligibility, group priority, ordering and tile identity.
Selection still writes the native ID, including clearing an override when the
style's own material is selected. Shared list chrome localizes its default hint
and sort titles while preserving supplied hints, tags and filter/sort values.
An additive direct catalog lookup avoids filtering all messages per material.

Three UI owners are newly covered. Native mapCatalogue metadata now has only
localized UI consumers; its explicit additional-source entry preserves review
scope after the direct UI import moved behind display helpers. It is also marked
reviewed, retaining English source metadata for native consumers. File coverage
therefore includes this metadata review, not four new pages.

Source checks passed all 346 material names, 27 notes, six roles and 33 native
set labels. Focused checks passed eleven exact English renders, Chinese/custom
search, native order/identity and material/bind/view/map/list callbacks. Types and
catalog/AST/terms passed: 227/439 covered, 1567 pending sites, 11351 keys, zero
errors and 221 contextual warnings. No live art/browser/model/server, full suite,
lint or build was run; verification stopped after the changed-surface gates.

The preceding forge checkpoint adds 96 content-scope keys. Library/studio controls,
preview/history/seed/light/spawn captions and 27 native skin names now use viewer
uiLocale. Authored names/hints, customized skin labels, seed/history rules, native
enums, save/capture/import payloads and preview geometry remain unchanged. The
forge, preview and thin create wrapper are newly covered; gallery and tileset
owners remain pending.

The generator previously recognized only English hint keywords. Shared typed
locale cue adapters now add Chinese terrain/light/rough-ground keywords, used by
both the native generator and forge read-back. Unspaced Chinese exposes matched
spans while retaining the user's original text. Structured explanation facts
feed native English and translated UI templates through the same decision
branches. Further locales add adapters/templates; hints are never LLM-translated.
This is keyword recognition, not arbitrary semantic interpretation.

Focused checks passed 18 seeded English map comparisons, nine Chinese/English
cue and DM-layout equivalents, English read-back quirks, unspaced Chinese facts,
five exact English UI renders and native keep/blank/roll/import/skin/delegate
callbacks. The existing seven native forge checks (including preview/save
agreement) also passed. Types and catalog/AST/terms passed: 223/439 covered,
1592 pending sites, 10949 keys, zero errors and 214 contextual warnings. No live
browser/animation, model/audio call, full suite, lint or build was run. Checks
stopped after the changed-surface gates passed.

The preceding library/editor-shell checkpoint adds 47 content-scope keys. Narrow/
wide shell controls, tool/layers sheets, name/tag/notes captions and library
parent chrome use viewer uiLocale. Authored values, autosave, IDs, resize logic,
zoom/undo/tool callbacks and canonical request bodies remain unchanged. Only a
new duplicate's generated suffix changes with locale; its original remains raw.

All native UVTT notices are retained, including omitted doors and imported
lights. The note list and image failure are stored separately for locale redraw;
unknown notes stay literal. Image-upload failure permits geometry import, while
refused/network deletes keep the selected editor open. Network failures settle
with feedback, without retries. Three owners are newly covered; gallery, forge,
tileset and other child panes remain separately pending.

Eight exact English renders, relevant shell/details and library callbacks,
refused/successful delete, copy payload preservation, UVTT upload-failure recovery
and network feedback passed using mock transport. Types and catalog/AST/terms
passed: 220/439 covered, 1642 pending sites, 10853 keys, zero errors and 212
contextual warnings. No real browser/map mutation, model/audio call, full suite,
lint or build was run. Verification stopped after the relevant checks passed.

The preceding map-inspection checkpoint adds 128 keys (118 content-scope and ten
global selection-control keys), using viewer uiLocale. Inspector, layers,
selection/edit prompts, studio/editor controls, five save states and two owned
completion notices are localized. Object details use native kinds, coordinates,
light radii and privacy flags; authored names and labels remain literal. Native
selection IDs, edit values, geometry and request bodies remain unchanged. Studio
network failures now produce feedback and clear busy state without retries.

Seven owners are newly covered; independently owned library, forge, details and
tileset panels remain pending. Focused checks passed eight exact English renders,
all five bilingual save states, structured object facts and selection/studio
callbacks with mock transport. Types and catalog/AST/terminology passed:
217/439 covered, 1678 pending sites, 10806 keys, zero errors and 211 contextual
warnings. No real map mutation, model/audio call, settled-name repetition, full
regression, lint or build was run.

The preceding editor-palette checkpoint adds 102 keys (100 content-scope and two
global shared-hotkey keys). Options, seven brush names/effects, six stamp names/
effects, nib/distance/backdrop controls, asset picker chrome and all 33 owned
asset-set names now use viewer uiLocale. Second-Story Work reuses the reviewed
feature terminology. Native brush/stamp IDs, geometry previews, radius/size
limits, image paths and transform fields remain unchanged.

Asset search matches translated owned set names alongside original labels/IDs/
set text, keeping native order, own-set priority and object identity. Custom
asset/set names remain literal, and the Chinese search hint states the original
object-name/asset-set contract rather than promising translated third-party
object names. Selection still passes the original object.

The empty-tool hint now derives its digit-key range from actual BRUSH_KEYS;
1–7 corrects the stale English 1–6. Shared hotkey chrome uses global UI resources,
while studio/library map owners pass localized group text with unchanged native
key arrays. The native mapToolState ledger and key handler are untouched.
MapTools, MapOptions, StampPicker and HotkeyOverlay are newly covered; studio/
library editor owners remain pending for other controls and diagnostics.

Focused component checks passed eight exact English renders against 75b00666,
the explicit 1–7 hint correction, native brush/stamp effects, Chinese set search
with raw assets, palette/options/backdrop callbacks, upload payloads/transforms
and unchanged key groups using mock transport. Types and catalog/AST/terminology
passed: 210/439 covered, 1760 pending sites, 10678 keys, zero errors and 203
contextual warnings. No actual map/key engine mutation, image/model/audio call,
settled-name repetition, full regression, lint or build was run.

The preceding location/scene checkpoint adds 159 content keys. Area-map menus,
placeholder/render/loading/history/route captions and population summaries now
use locale templates; generated population counts are held as structured facts
so display can switch locale. Authored location/layout/hook text stays raw.
Population network failure now shows localizable feedback and clears busy state.
Upload/redraw/clear/populate requests keep their endpoints and payloads.

Scene light presets/radius descriptions, labels/privacy, props, light zones,
door instructions, private overlays and all 47 native bed/music cue labels are
localized. Limits, light clamping, sound IDs and visibility flags stay native.
Custom cue/asset labels remain literal. The rail uses a text-only projection
of the unchanged native mode ledger; shortcuts, modes, icons and capabilities
are intact. MapPanel, MapSceneTools and MapRail are newly covered.

A source check caught a preceding door-caption error: S represents the actual
`secret` state, not an invented `stuck` state. The Chinese glyph/title now says
“暗/暗门”; English L/S and stored locked/secret values are unchanged. The previous
fixture's invalid state has been corrected. A focused door check reads native
DOOR_STATES and validates the actual grid display; no door engine rule changed.

Focused component checks passed 11 exact English renders against e17c1e8d,
all native sound/tool labels, preserved authored data, light/privacy/zone/sound/
mode and populate/upload/clear callbacks and population network recovery, using
mock assets/transport. The corrected door check, types and catalog/AST/terminology
passed: 206/439 covered, 1795 pending sites, 10576 keys, zero errors and 198
contextual warnings. No settled-name repetition, sound/model/image generation,
actual map mutation, engine suite, full regression, lint or build was run.

The preceding region-tools checkpoint adds 168 campaign content keys. Region
modes/prompts, brushes, all 29 owned themed terrain labels, painting/lines/labels,
file controls, size presets, generation dials, private-note labels and known
native refusal frames now follow campaign locale. User/model place names,
labels, description, plan prose and private notes remain literal.

The Azgaar helper keeps its original data/raw-English note and adds a structured
report solely for display. Its counts/dimensions are read from the response;
FileTools rerenders the report after locale changes. Modes, terrain/path types,
size values, uploaded paths, JSON texts and API schemas remain native. No turn
or rule engine uses a translated display value.

File text failures and rejected network requests now show localizable feedback;
patch/describe/import busy state releases and failed manual-place forms retain
unsaved input. No automatic retry was added. Raw server diagnostics remain in
state; known frames are translated, opaque failures use a localized operation
fallback. The existing region describe utility already receives campaign locale.

OverworldTools, OverworldAuthoring and OverworldPanel are newly covered. Focused
actual-component checks passed nine exact English renders against a90de75a,
default-English prompt metadata, Chinese captions, canonical modes/brush/path/
size/JSON/upload/import/place/describe callbacks and read/network failure paths
with mock transport. Types and catalog/AST/terminology passed: 203/439 covered,
1874 pending sites, 10417 keys, zero errors and 190 contextual warnings. No real
canvas/clipboard/map generation/import/model/audio, settled-name repetition,
geometry/engine suite, full regression, lint or build was run.

The preceding guided-level checkpoint consolidates 25 duplicated English-only JSX
branches into the already reviewed complete locale catalog. HP/class/ASI/
expertise/options/style/subclass/spell/result copy now has one locale interface.
Native choices, step readiness, computed HP, feature/spell IDs and PATCH payloads
are unchanged. Canonical local network/refusal diagnostics remain raw in state
and use named shared constants, then the existing display renderer.

LevelUpDialog is newly covered. Its existing focused check passed 26 English
render fingerprints and bilingual guided progression, rolled/ASI/spell choice
callbacks and network recovery with mocked content/transport. Types and catalog/
AST/terminology passed: 200/439 covered, 1967 pending sites, 10249 keys, zero
errors and 186 contextual warnings. The 52-site reduction is consolidation of
existing reviewed translations and local diagnostic sources, not 52 newly
translated Chinese strings; no catalog keys or values changed. No real level
mutation, engine suite, settled-name repetition, model/audio, full regression,
lint or build was run. Character sheet/party owners remain pending for their
remaining dynamic content review.

The preceding board-tools checkpoint adds 47 campaign content keys. The DM tool
rail, ad hoc placement, shape/range/caught-target measurements and token cards
now follow campaign locale. Measurements copy original enemy IDs and retain
native shape/size values. Only unambiguous enemy-typed caught names are localized;
PC/custom names and name input remain literal.

Intent captions use whole locale frames and typed actor/target/resource names;
unknown authored intent verbs remain literal. Visibility/round filtering and
badge numbers still come from the native projection. The current engine emits
no intents, and this display work does not implement that server feature.

TokenFigure initial/accessibility display now shares native monster, health and
condition renderers; authored notes survive, while English title formatting is
preserved. Native condition IDs/glyphs, health colors, HP values and coordinates
are intact. Grid accessibility and locked/secret door glyphs/titles are localized;
English L/S remains. No turn matching uses translated names.

DmBoardControls, BoardIntent, BoardStage and BattleMapGrid are newly covered.
Focused component/presentation checks passed seven exact English pre-edit renders
against checkpoint 51a839a6, canonical tool/type/shape/size/visibility callbacks,
clipboard IDs, projected-intent filtering, protected PC/custom names, token
condition titles and bilingual door markers. Types passed; catalog/AST/terminology
passed: 199/439 covered, 2019 pending sites, 10249 keys, zero errors and 186
contextual warnings. Camera/animation/clipboard transport was mocked; no real
movement/engine/model/audio, settled-name repetition, full regression, lint or
build was run.

The preceding board-panel checkpoint adds 83 campaign content keys. Main board
turn/target/prompt/drawing/camera/accessibility captions and known local error
frames now follow campaign locale; raw diagnostics remain in state. Native
player/DM shortcut builders accept an optional locale with their old English
default. Player target callbacks compose Chinese using typed display names;
custom PC/NPC names remain literal. Drawing enum values and React keys stay
canonical. The free-text condition editor still asks for a canonical rule name
and now states this explicitly; its alias support remains pending.

Hand area hints reuse the existing spell/pick renderer. The native two console
column labels are recognized at display; unknown labels remain literal. The
square picker still emits original IDs, role, field labels, coordinates and
caster/spell data. Only BoardAreaAim, DmSquarePick and TokenHud are newly covered;
BattleMapPanel remains pending for broader engine refusals/board owners and
special effects.

Focused actual-component checks passed player target/shortcut callbacks,
Chinese/English captions, blocked-action handling, native visibility values,
area/console events, drawing values and raw authored names/diagnostics using a
mock stage/camera and no server mutation. Types passed. Catalog/AST/terminology
passed: 195/439 covered, 2044 pending sites, 10202 keys, zero errors and 185
contextual warnings. No engine/geometry suite, settled-name repetition, model/
audio, full regression, lint or build was run for this display batch.

The preceding board-control checkpoint adds 89 campaign content keys. Movement
modes/hints, camera controls, keyboard help, turn order and distance labels now
follow campaign locale. Known complete jump, opportunity and zone-effect notices
are localized from raw engine facts; authored/ambiguous names and unknown effects
remain literal. Distances, costs, coordinates, mode values and camera commands
are unchanged. English note text remains raw and existing helper defaults remain
English.

Only BoardMoveModes and BoardPanelParts are marked covered. BattleMapPanel and
BoardMoveNotes retain pending ownership for other controls, area hints, damage
modifiers and special quake/fissure/drift effects. Focused actual-component/
presentation checks passed mode/camera callbacks, names, ruler labels and known
notices with mocked callbacks; the completed incremental type-check artifact has
no diagnostics. Catalog/AST/terminology passed: 192/439 covered, 2104 pending
sites, 10119 keys, zero errors and 180 contextual warnings. No real move,
settled-name repetition, geometry/engine regression, model/audio, full regression,
lint or build was run for this display batch.

The preceding dice-control checkpoint adds 54 keys (32 campaign tray keys and 22
global source keys). Tray controls, secret-audience/result labels and native
parser failures are localized; source assignment/device controls and diagnostics
are global UI because standalone app settings also mount that panel. Expressions,
manual/digital/Pixel preferences, device IDs/names, secret flags and scores remain
canonical. Mathematical d notation and the fixed browser-setting URI are explicit
invariants; their removal from pending counts is classification, not translation.

Localized browser chooser cancellation now becomes a stable signal only around
the chooser call. Later GATT failures with the same browser error names remain
visible. Raw diagnostics are retained for locale rerendering; typed diagnostic
values containing catalog-like braces are interpolated literally, without being
misclassified as a no-argument template.

Focused actual-component/presentation checks passed Chinese tray/source labels,
standalone resource scope, four unchanged seat-audience protocols, canonical
expression/secret-roll requests, source/device IDs, chooser-only cancellation
and retained rejected-roll history using fake devices/transport. Types and
catalog/AST/terminology passed: 190/439 covered, 2135 pending sites, 10030 keys,
zero errors and 174 contextual warnings. The AST gate was rerun after declaring
the two protocol invariants; no physical die, real roll, dice-engine regression,
model/audio, full regression, lint or build was run.

The preceding audit/timeline checkpoint adds 127 content keys. Structured damage,
healing, resources, slots, spells, items/gold, field changes and undo descriptions
now use whole locale templates, with 25 native kind and 30 sheet-field labels.
Original deltas, actor names, authored reasons and milestone summaries stay raw.
Protection-only damage records now show their engine-confirmed 1 HP protection
instead of an undefined damage amount. This is display, not a sheet mutation.

Undo errors/conflict warnings and confirmation controls are localized; retries
keep the existing confirm flag and endpoint. Confirmation exposes busy state and
blocks cancellation while the retry runs. No real undo/revert was performed.

Timeline rows carry optional language-neutral display metadata for generated
fallback/act/now titles and current calendar/session dates. Authored titles that
resemble defaults remain literal; old clock labels and historical prose remain
unchanged. The route returns the public calendar once for viewer-locale display.
Chinese sentence punctuation now bounds timeline recaps, including a closing
Chinese quote; sorting and secret visibility are intact. Failed reloads retain
rows and expose retry.

Focused component/presentation checks passed representative English audit
wording, Chinese structured facts, authored-title/reason protection, unchanged
source objects, Chinese recap/calendar display and canonical two-step undo/
turn-revert requests with mocked transport. All three existing timeline sorting/
visibility checks, types and catalog/AST/terminology passed: 188/439 covered,
2182 pending sites, 9976 keys, zero errors and 174 contextual terminology
warnings. No live model/audio, settled-name repetition or full regression/lint/
build was run for this batch; general system-log templates remain pending.

The preceding private-chat/media checkpoint adds 35 content keys. Private chat
lists/forms, chime controls, send/load/native errors, image queue/failure copy
and default narrator role labels now follow viewer locale. English privacy copy
now explicitly identifies the AI DM; a participating human DM is a chat member.
Authored thread titles, names, private bodies, speech identities and roll IDs
stay literal. Prose is a reviewed copy-free Markdown renderer; speech attribution
and voice casting keep their separate scope.

Incremental read failures now retain messages with retry. Malformed successful
send replies keep the draft rather than appending an invalid row; repeated sends
while busy are suppressed. Request kinds, member IDs, message payloads and read
markers remain canonical. Media diagnostics use the shared generic projection,
so an external image error cannot acquire a private-chat-specific explanation.

Focused actual-component validation passed Chinese chat/media/role copy,
Unicode proper names, unchanged prose/roll IDs, canonical group/send requests,
busy-send suppression and retained rows/drafts on failure with mocked transport.
Types and catalog/AST/terminology passed: 186/439 covered, 2197 pending sites,
9849 keys, zero errors and 169 contextual terminology warnings. The localized
media-error binding received a focused follow-up check; no real private message,
chime/model/audio, settled-name check, full regression, lint or build occurred.

The preceding character-entry checkpoint adds 33 content keys: mid-game character
entry, companion builder/library explanations and errors, and all 12 original
text fields of the four native preset heroes (tagline, blurb, backstory). Card
projections match exact native source text, preserving authored/pack overrides.
Only a newly admitted pregen's native backstory follows campaign locale; all
mechanical fields, proper names, canonical IDs and existing sheets stay intact.
Personal UI locale affects the cards, independently of the new sheet's language.

Companion and pregen library reads now expose failures/retry and retain known
rows. Companion creation preserves full structured rule diagnostics and the
existing library/sheet request bodies. The copy-free English refusal aggregator
is explicitly retained in the scope because it remains used indirectly by the
character locale adapter; removing the last direct UI import had hidden that
edge from the import walk. This is a reviewed protocol helper, not another page.

Focused mocked validation passed entry/companion controls, all four exact-source
projections and unchanged pregen mechanics, authored overrides, full problem
lines, canonical hero/library/sheet requests and failed-library retry retention.
Types and catalog/AST/terminology passed: 182/439 covered, 2224 pending sites,
9814 keys, zero terminology errors and 168 contextual warnings. The scope gate
was rerun after declaring the indirect refusal dependency. No new live hero/
companion, portrait/model/audio, full regression, lint or build was run.

The preceding transcript-action checkpoint adds 102 content keys: DM/player
copy/dispute/report menus, reroll/continue/edit/pin/lore/picture/read actions,
variant selection, inline-editor shortcuts/native roll-marker refusals, reroll
version/guidance controls and known media/voice errors. Authored names, old
prose, roll markers, action IDs and request bodies remain intact. Ordinary
system-log templates keep MessageParts pending; content/media children retain
independent coverage. The shared MessageActions owner has no owned copy and
renders caller-provided localized labels through its existing action interface.

Guidance presets show localized labels/input values while preserving original
preset text in the reroll request. Hand-written guidance remains literal across
UI languages. An unexpectedly rejected inline save now restores controls and
shows a failure instead of leaving the editor busy.

One focused actual-component check passed localized passage/player actions,
unchanged authored prose and marker diagnostics, composition-safe edits,
recovered save failure, canonical variant/preset/reroll/upload callbacks and
retained authored guidance using mock transport only. Types and catalog/AST/
terminology passed: 178/439 covered, 2236 pending sites, 9781 keys, zero errors
and 165 contextual terminology warnings. The AST gate found one retry label
with an ellipsis; it was migrated and the gate rerun. No live model/audio,
settled-name repetition, full regression, lint or build was run for this batch.

The preceding facts/pins/context checkpoint adds 73 content keys. Fact categories,
pinning/editing/retirement, composer and secret controls, pinned excerpt actions
and memory budget labels, and context block labels/native budget reasons now
follow viewer locale. Authored facts, subjects, excerpts and trace IDs/reasons
remain raw in storage; budgets, category IDs and model-facing prompts are intact.
Unknown diagnostic text remains literal. Imported owners retain their own scope.

Refused fact edits stay open with a reason. Failed unpins preserve known rows;
later pin-load failures display retry alongside existing content. Refreshing an
already-open secret list now explicitly rereads the scoped endpoint instead of
accidentally hiding it. The server's visibility/authority checks are unchanged.

One focused actual-component display/callback check passed Chinese displays,
English native labels, canonical pin/retire/create/unpin requests, held drafts
on failure and explicit filtered secret refetch using mock transport only.
Types and catalog/AST/terminology passed: 174/439 covered, 2299 pending sites,
9679 keys, zero terminology errors and 157 contextual warnings. An uncovered
single-letter token suffix found by the AST gate was catalogued, then that gate
was rerun; no full-suite/lint/build, settled-name, model or audio rerun occurred.

The preceding quest/faction checkpoint adds 74 content keys. Task status/options,
objective checkboxes, quest source/privacy labels, faction attitude/reputation,
private goals/power and native error/loading frames now render in the viewer's
locale. Factions consistently display as 势力, separate from character alignment.
Authored titles, objectives, descriptions, member names and tags stay literal;
status/attitude enums, reputation values, IDs and request bodies stay canonical.

Refused writes show a diagnostic and retain drafts/rows. A failed quest deletion
no longer removes the row locally, and later failed quest loads keep existing
rows while exposing retry. Permission gates and model-facing faction text are
unchanged. Imported image/dictation owners retain independent coverage.

One focused actual-component display/interaction check passed Chinese labels,
English native enum labels, preserved authored values, canonical status/objective/
reputation/create requests, deletion cancellation and failed-write preservation
with mocked transport only. Types and catalog/AST/terminology passed: 171/439
covered, 2350 pending sites, 9606 keys, zero terminology errors and 154 contextual
warnings. No frozen render artifact, live model/audio, settled-name repetition or
full-suite/lint/build run was added to this batch.

The preceding party-lead checkpoint adds 36 content keys: invitation state and
sharing controls, transfer confirmation/errors, campaign difficulty summary,
notes/direction/preparation headings and role captions. Human-table captions
now describe the existing authority correctly; permission gates and canonical
PATCH/POST requests are unchanged. Authored names and invitation addresses stay
raw. Imported children retain their own coverage; no end-campaign controls were
part of this owner.

One focused check passed nine frozen English displays, Chinese role labels,
transfer cancellation/request shape, joining toggle and unchanged invitation
addresses using mock transport. Types and catalog/AST/terminology passed:
169/439 covered, 2404 pending sites, 9532 keys, zero terminology errors and 151
context warnings. No settled-name/model/audio/full-suite/lint/build recheck ran.

The preceding market checkpoint adds 122 keys (120 content and two small shared
picker labels): market/create/trade/haggle/close and shop/shelf/restock controls,
native shop kinds/settlement sizes, price markup and currency display, recognized
trade/refusal/load frames. Registered equipment names display in the viewer's
locale; original item names, IDs, keys, stock notes, quantities and copper-based
arithmetic remain intact. Unknown/authored names and diagnostics stay literal.

The price editor accepts registered locale coin names plus existing English
codes. A localized input adapter normalizes to the existing engine denominations;
it rejects unknown/partial units instead of treating their numbers as gold.
Chinese decimals/fullwidth digits and all five denominations round-trip to
integer copper. A draft remembers its input locale across a UI-language switch.
English valid formatting/parsing is retained. Failed market reloads keep shops;
failed mutations now show a diagnostic. Closing still asks before issuing DELETE.

The shared catalog picker now sends viewer locale to the existing item-alias
search, projects registered item/spell/feat labels where content resources exist,
and preserves source entries/references in callbacks. Its other kind/material
coverage remains pending; neither external descriptions nor absent deferred
editor resource boundaries are counted as finished.

Lightweight validation passed: 16 frozen English market/editor/picker states,
localized currency round-trips/invalid inputs/held input locale, actual Chinese
buy/sell/haggle/create/save/restock requests and catalog selection/query metadata,
confirmation cancellation and retained stock on failed reload (mocked transport
only), types and catalog/AST/terminology. English fingerprints occupy 1397 bytes.
Current coverage is 168/439 files, 2444 pending literal sites, 9496 keys, zero
terminology errors and 150 contextual warnings. No real trade, shop deletion,
model/audio, settled-name check or full tests/lint/build ran for this batch.

The preceding roster/model-control checkpoint adds 102 content-only keys. NPC
review now localizes manual merge/dismiss/rename controls, archived/alias status,
three native attitudes, native refusal/load messages and retry. Names, aliases,
merge direction/IDs and historical prose stay raw. A failed first read no longer
claims the roster is empty; later failures preserve known rows with retry. The
checker rejects changed native entity-review refusal strings until reviewed.

Campaign model controls now localize all provider/backend/prose labels and
read-only/device/server-managed summaries, agent/image/key notes and recognized
policy/field-length failures. Enum mappings are typed against source interfaces.
Model IDs, URLs, selector values and PATCH shapes remain canonical; the secret
sentinel stays private and unchanged. Empty untouched key fields still issue no
write. This is UI delivery, not a new backend choice or real model/service change.

Lightweight validation passed: 20 frozen English roster/settings states, Chinese
canonical selection and merge/dismiss/rename/model/image PATCH callbacks, source
name/history preservation, masked/kept keys, IME blur/submit handling, installed
Zod string-limit wording and initial/later load failure/retry (mocked transport
only), types and catalog/AST/terminology. English fingerprints occupy 1777 bytes.
Current coverage is 166/439 files, 2535 pending literal sites, 9374 keys, zero
terminology errors and 147 contextual warnings. No real NPC/model mutation,
model/audio call, settled-name check or full tests/lint/build ran for this batch.

The preceding story checkpoint adds 114 content-only keys: chapter/chronicle
controls, secret arc/sketch/cast/event/thread headings, six waypoint and seven
event kinds, native edit refusals and rollback consequences. Recorded titles,
prose, names, IDs and server/tool payloads remain raw; display errors/warnings
rerender by viewer locale. Kind mappings are checked against native enum types;
the checker rejects new/reworded native arc-edit refusal sources until reviewed.

The empty StoryPanel branch had a JSX conditional written as bare text. It now
shows no empty/error plate before a result, the empty plate after an empty read,
and the refusal with retry after a failed read. A later failed reload keeps known
chapters visible with a retry notice. Those corrected states intentionally have
no parity fingerprint of the preceding corrupted UI. The rewind flow still
requests consequences with `confirm:false`, then submits `confirm:true` only
after the existing confirmation action; no live campaign was rewound in checks.

Lightweight validation passed: 17 frozen English chapter/arc/book/confirmation
states, Chinese authored-data preservation, canonical edit/save/waypoint requests,
IME Enter protection, native refusal/consequence projection, empty/load/retry and
two-step rewind callbacks (mocked transport only), types and catalog/AST/terminology.
English fingerprints occupy 1663 bytes. Current coverage is 164/439 files, 2608
pending literal sites, 9272 keys, zero terminology errors and 139 contextual
warnings. StoryPanel's child owners retain independent pending coverage. No
model/audio, settled-name check or full tests/lint/build ran for this batch.

The preceding help checkpoint translates the complete project-owned app walkthrough
and its contents/search/accessibility labels, with 151 new keys (149 help-only
and two short UI loading-failure controls). Existing English copy/formatting,
links, section anchors, painted glyph identities and tour callbacks are preserved.
Chinese help covers input modes, asking, combat cards, narration corrections,
memory, side panels, dice, voice/music, human DM, lead powers and world packs.
It translates app instructions, not external rulebook prose or an assertion that
Chinese voice input/full-rulebook support has been delivered.

Help opens from home without a campaign resource boundary. A new typed `help`
scope loads only the selected language on open. The generator shares the scope
registry with runtime types; English/Chinese JSON imports are literal paths for
separate chunks. Loading, failed-download retry and a locale transition gate
prevent missing or stale-language help rendering. Tiny metadata source bindings
translate the two native tours without downloading a second complete help
language. Authored tour labels/details remain literal; checker source bindings
reject stale topic/tour copy when the native caller changes.

Lightweight validation passed: five frozen English render states, all 17 Chinese
contents targets and scroll actions, bilingual search, original links/tour
callbacks, authored copy, loading/retry and independent selected-language imports
in a fresh process; types and catalog/AST/terminology. Five English fingerprints
occupy 462 bytes. Current coverage is 163/439 files, 2699 pending literal sites,
9158 keys, zero terminology errors and 131 contextual warnings. This is source/
render/import verification, not a browser network-total or full-play acceptance.
No model/audio calls, settled name recheck or full tests/lint/build ran here.

The preceding choice/entry checkpoint adds 71 content-only keys. Native feat
selection now displays localized skills/expertise, fictional languages, weapons,
tools, armor training, damage types, class lists, casting abilities and chosen
spells. Spell captions and the explanation of automatically applied effects
localize too; Chinese coverage text shows player-readable actions rather than
machine tool tags. Canonical IDs/names, source descriptions, shared limits,
choice resets and content filters are unchanged. Unknown authored names remain
literal; deferred pack prose is not counted as translated.

Campaign and table entry fallbacks, responding origin, return link, recognized
snapshot/network/password errors and map-lore loading/missing notices localize
at render time. Stream state stays raw; map/lore titles and bodies remain authored.
Child lobby/session/board/map owners retain their independent pending status.
These four owners are now covered; the AST gate protects their own chrome.

Lightweight validation passed: 60 frozen English choice states (54 native feats
plus six selected/mixed-grant fixtures), four English map-entry states, actual
Chinese canonical selection/reset/filter callbacks, shared-count limits, authored
content/error preservation, types and catalog/AST/terminology. The two aggregate
English fingerprints occupy 258 bytes. Current coverage is 161/439 files, 2844
pending literal sites, 9007 keys, zero terminology errors and 128 contextual
warnings. No model/audio calls, settled name recheck or full tests/lint/build ran.

The preceding feature-material checkpoint adds 355 content-only keys: 144 shared
feature names/summaries, two class-specific Timeless Body summaries, and all
54 project-owned feat descriptions plus nine distinct prerequisite templates.
Sources are `src/lib/help/srd-features.json` and
`src/lib/srd/authored-feats.json`; native wording was compared directly and
existing spell/equipment/skill terms reused. Primal Champion now consistently
uses “原初勇士”. This translates the owned short summaries, not full rulebooks.

Sheet and level-up feature chips, native feat picker/browse help and lazy feat
help use whole-source display adapters. English source, parser inputs, stored
names, icon keys and content references remain unchanged. Story features and
modified/unknown descriptions stay literal. Class-specific/themed help has
higher resolution precedence and remains pending unless its whole text matches
a reviewed summary; this batch does not claim all feature help is translated.
The metadata/checker requires review whenever an owned source or prerequisite
changes. Translated payloads remain in content resources, separate from metadata.

Lightweight validation passed: the focused material check (146 feature rows,
54 feat rows, class overrides, raw parser inputs, stable references and loaded
feat help), three frozen English render fingerprints (298 bytes), the existing
26 guided progression states/callback paths, types, catalog/AST/terminology.
Current coverage is 157/439 files, 2902 pending literal sites and 8936 keys;
terminology has zero errors and 124 contextual warnings. File coverage did not
increase because the affected owners still contain other pending material.
No model/audio calls, settled Goblin recheck or full tests/lint/build ran here.

The preceding option-material checkpoint adds 292 content-only keys for all
135 bundled choices: names, short descriptions, 20 nonempty requirements and
two display frames. The source is `src/lib/srd/options.json`; translations were
written against its complete English summaries and reuse existing spell/skill/
condition terminology without importing an external Chinese rulebook. This is
material translation, not end-to-end acceptance of every ability implementation.

Creation, guided level-up and selected-feature chips share the source-bound
view. Original kind/name/requirement fields remain in selection callbacks,
feature IDs and icon keys. Chips accept an optional stable ID, so translated
names are not used as identity when switching locale. Canonical native option
help localizes; authored/story names and changed or unknown descriptions stay
literal. Metadata is separate from translated payloads; root UI resources are
unchanged. The main checker now rejects added/changed native option material
until its exact source has been reviewed, including the literal empty requirement.
Two preceding HP notes now reuse “强健” and “龙族体魄”; Evasion is “反射闪避”,
keeping it distinct from the Dodge action.

`ClassChoices` and the pure `level-up-preview` helper are covered within their
owned scope. General feature/feat help, other level-up refusal material and full
magic-item names remain pending. The focused option check passes all 135 source
bindings, English render parity, authored overrides, actual Chinese builder
callbacks with canonical picks, selected help and stable feature/icon IDs. Its
two frozen English fingerprints occupy 313 bytes. The existing guided check
also passes its 26 English states and rolled/ASI/spell/network paths. Types and
catalog/AST/terminology checks pass: 157/439 covered, 2902 pending literal sites,
8581 keys, zero terminology errors and 122 contextual warnings. No model/audio
calls, settled Goblin check or full regression/build ran for this batch.

The preceding progression checkpoint adds 125 content-only keys: level-up
navigation, class/subclass/skill/style/spell labels, XP/dead/zero-HP blockers,
fixed/max/rolled HP choices and results, native multiclass prerequisites/grants/
refusals, and rest/loot/travel moments. Original choice payloads, engine math,
audit/history text, timers and icon keys are unchanged. Raw server/spell notices
rerender by viewer locale. The Chinese long-rest caption says the rest ended;
it does not incorrectly promise full restoration under affliction rules.
Registered grant names reuse equipment/tool translations, with 15 additional
native terms; proper/authored names stay literal. Complete option descriptions,
requirements and native feature help remain pending, as do full magic-item names.

The main-flow checker now follows literal lazy/dynamic imports, including import
options and non-interpolated template strings. It does not guess computed paths.
This adds `LevelUpDialog` and its preview helper, previously omitted, as pending;
the corrected denominator is 439. Its small parser/actual-import check passes.
The progression check passes 26 frozen pre-edit English JSX states, Chinese
progression/moments, native multiclass/school refusals, actual rolled/ASI/spell
PATCH callbacks and network recovery (about one second). Catalog/AST/terminology
and types pass: 155/439 covered, 2903 pending literal sites, 8289 keys, zero
terminology errors and 122 contextual warnings. The pending-site count now
includes the formerly omitted level-up source; it is not comparable to the old
2861 count without adjusting that scope. No model/audio calls, repeated Goblin
checks or full regression/build were run for this batch.

The preceding approval/trade checkpoint adds 55 content-only keys. Item/gold,
purchase, damage/healing and condition confirmations use read-only metadata
bound to the exact original native summary; canonical mutation arguments and
stored English history are unchanged. Trade item/coin refusals carry optional
source-bound display details, and network failures now clear busy state and
show a localized retryable error. Proper/authored names, reasons and unknown,
stale or truncated source frames retain their original text. Full magic-item
and complex-condition names keep both UI owners pending.

One focused check (under one second) covers 16 native summary branches, public
metadata privacy, four actual trade refusals, six frozen English JSX renders,
Chinese approve/decline/withdraw/trade callbacks and network failure. Catalog/
AST/terminology and types pass: 155/437 covered, 2861 pending literal sites,
8164 keys, zero terminology errors and 118 contextual warnings. No live model,
audio, repeated Goblin check or full regression/build was run for this batch.

The preceding correction checkpoint adds 117 content-only keys for lead corrections,
inventory flags and quantities, spell/feat lists and slot edits, multi-picker
selection/admission controls and native downtime facts. Standard Chinese
condition labels and Chinese commas are accepted by the editor; its draft keeps
canonical English so switching UI locale cannot store translated mechanic IDs.
Native casing, unknown authored effects, item/spell names and PATCH fields remain
intact. Picker provenance stays internal, keeps custom names literal and is
removed from callbacks. An exact translated catalog name no longer offers a
duplicate custom row. Backend lookup references retain the canonical name.

Disease/poison labels reuse existing terminology. Complete lifestyle/crafting/
training/research/recuperating and affliction frames project prices, progress,
time and conditions for the viewer; the narrator's original English lines and
server secrecy filter are unchanged. Complex conditions, remaining magic-item
names and generic source descriptions keep the correction/picker owners pending.
`LeadEditParts` and `SheetBetween` are fully covered within their owned scope.

The focused `scripts/test-play-edit-locales.mjs` passes in under one second:
actual correction-limit outputs, reversible condition editing, native downtime
frames including empty madness conditions, canonical Chinese selection/removal/
slot/PATCH callbacks and five frozen pre-edit English JSX renders. The frozen
fingerprints occupy 599 bytes. Types and catalog/AST/terminology checks pass:
155/437 covered, 2878 pending literal sites, 8109 keys, zero terminology errors
and 117 contextual warnings (including short-term vs short prose, currency PP
vs passive perception and save vs saving throw). No model/audio calls, settled
Goblin checks or full test/lint/build run was repeated.

The prior Hand checkpoint localizes all 22 built-in beast-form attacks with
verified source metadata; custom weapons/forms and stale metadata keep their
names. Display names and campaign-locale action sentences share the same labels;
canonical attack intent remains English. Turn headers, waiting notes and refusals
use an unambiguous visible enemy identity rather than indexing the filtered
public order. A server-projected concealment marker localizes the anonymous
placeholder without exposing the hidden name or enemy ID. PC/NPC names,
ambiguous identities and old/absent metadata retain their original names.

The focused `scripts/test-hand-actor-locales.mjs` passed in under one second,
including the real filtered/hidden encounter projection and JSX callback. Types
and catalog/AST/terminology checks passed: 7992 keys, zero errors, 113 context
warnings. File coverage and pending literal counts are unchanged. No full suite,
lint/build, model/audio call or settled Goblin check was repeated.

The material checkpoint adds 114 content-only keys: all 80 bundled material
descriptions, 15 special priced-component nouns, and native quantity/value/
consumption, ritual, long-casting and form frames. Missing/partial material,
insufficient-gold and target-Hit-Die refusals now display reviewed Chinese facts.
Prices, quantities and consumption flags remain native. Inventory examples stay
verbatim and are explicitly labeled as names to copy, because the existing
material matcher recognizes those canonical English words; no item/protocol or
stored name is rewritten. Unknown authored material descriptions stay literal.

The focused `scripts/test-hand-casting-locales.mjs` passed in one second: 95
material descriptions and 167 real material/ritual/casting refusals, unchanged
numbers/examples, partial-component shortages and copying the example back into
a successful native plan. Types and catalog/AST/terminology checks passed with
zero errors and 112 context warnings. The added warning is a quantified material
“一个圣徽” versus focus label “圣徽”, with the same noun. No settled Goblin,
model/audio call, full regression, lint or build was repeated. HandSpells is a
reviewed lookup hook with no owned UI copy; marking it covered makes file coverage
153/437 while pending literal sites stay 2935. Hand surfaces still need remaining native dynamic fields and broader authored
content; reaction attack names are a separate remaining source path. Earlier spell
and technique contracts remain in Git.

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

## Development and validation workflow

Batch work by playable feature chain. Pure copy changes use affected key/value,
placeholder and mapping checks. UI changes add affected English renders and
button payload regressions, plus TypeScript when types or interfaces change.
Preserve meaningful checks for dice, HP, resources, secrets, proper names,
persisted history and English behavior. Never regenerate a golden or weaken an
assertion to hide a failure.

`npm run lint` includes repository-wide ESLint, UI coverage, generated-resource
consistency and terminology. It is a full gate, not cheap file-level lint.
Run full tests, full lint and production build at meaningful stage boundaries,
shared infrastructure changes needing broad regression, or a concrete failure
requiring wider investigation. During a batch, use focused ESLint and related
scripts. Keep progress notes short; do not add checkpoint systems or layers of
guards without an actual need.

Six legacy reviews now check their fixed reviewed message keys, bilingual values,
parameters and delivery scopes through `scripts/lib/reviewed-messages.mjs` and
`docs/validation/reviewed-message-scopes.json`. Their baseline is committed,
verified `bf87a494`, rather than current in-progress output. Unrelated imports,
formatting and new unreviewed keys cannot invalidate an old review. Reviewed
value/removal/parameter changes and stale generated values still fail. Private
source/mapping checks and original English golden integrity remain. The old UI
fingerprint differed only by the two approved Goblin terms; its original evidence
is retained without reinstating a whole-file lock.

## Next execution order and user involvement

The active goal can continue with its approved release scope. It does not need
to be recreated or reduced: the combat-safety and terminology corrections fit
the original playable-flow requirement. The successful default production build
removes the earlier build blocker. Local TTS remains an unverified release gate,
not a reason to stop independent UI/log work. Keep each checkpoint distinct from
completion of the full goal.

The [combat UI checkpoint](validation/chinese-combat-ui.md) now covers pending
checks, initiative controls and the encounter roster, with frozen English
renders and actual button-payload regression. The prior compatibility/stability
and terminology checkpoints are committed; this combat UI implementation is
committed separately as `c89eec1a` and passes all 521 script suites.

The [condition UI checkpoint](validation/chinese-condition-ui.md) adds structured,
visibility-filtered condition metadata, 274 native effect labels/summaries and
322 frozen English renders. BoardChrome now passes the dynamic display review;
all 522 script suites, TypeScript, lint and the production Turbopack build pass.

The [roll caption checkpoint](validation/chinese-roll-presentations.md) adds
identity-safe target arrays and optional persisted presentation data for attacks,
area damage, death saves and stable recovery. Physical attack/damage stages keep
their captions across restart; 25 original English RollCard renders stay exact.
RollCard remains pending for other engine-generated captions and special rolls.
All 523 script suites, TypeScript, lint and the production Turbopack build pass.

The [check and cinematic checkpoint](validation/chinese-check-cinematic.md)
adds typed group/opposing/grapple/search/spell-check purposes, ordinary requested
check captions and source/concentration display for the principal PC save paths.
Cinematic owned UI and accessibility now pass the literal gate; 30 original
English renders remain exact. Unknown feature/tracker prose stays literal,
and other forced-save and special-roll producers still need explicit contexts.
All 524 script suites pass (265.04 seconds), as do TypeScript, lint and the
default production Turbopack build. This checkpoint does not complete the
remaining UI, real-model journey or local audio acceptance gates.

The [save caption checkpoint](validation/chinese-save-captions.md) adds source
and purpose metadata to 47 existing forced-save caption producers and three
feature-save context callers. All 60 original save calls retain their original
rule inputs and record/no-record choices; 23 original English renders stay exact.
Five native feature terms join the glossary. Authored names stay literal; these
enemy save records remain DM-only. All 525 script suites pass (261.10 seconds),
as do independent TypeScript, lint and the default production Turbopack build.

The [direct-save and special-roll checkpoint](validation/chinese-special-captions.md)
adds explicit captions for direct maneuver/consumable/downtime/endurance saves,
healing/rest/charges/affliction/special-spell rolls and enemy spell escape checks.
It preserves 94 original call contracts and 52 original English component renders.
There are 5,545 catalog keys and 257 contextual terminology entries. Static UI
file coverage remains 123/437; broad play/browser/TTS acceptance is still pending.
All 526 script suites pass (273.27 seconds), as do independent TypeScript, lint
and the default production Turbopack build.

The [initiative and social caption checkpoint](validation/chinese-initiative-social.md)
adds typed captions for initiative (including physical dice and arrivals), both
ambush sides, social/relationship/shop checks and enemy Counterspell. It retains
22 original producer call contracts and 27 original English component renders;
all 11,090 existing bilingual resource values and 25 previous compressed English
baselines remain unchanged. There are now 5,552 message keys. Static UI coverage
remains 123/437, because this checkpoint fixes dynamic engine captions.
All 527 script suites pass (270.56 seconds), as do independent TypeScript, lint
and the default production Turbopack build.

The [sheet and party checkpoint](validation/chinese-sheet-party.md) adds localized
state/defense/hit-die controls, owned party-card copy, typed condition notes,
34 core resource names and level-up HP-die captions. It preserves 32 original
English renders, 11 state views and the original level-up roll call. Only
SheetState joins covered files; full dialogs and remaining dynamic material stay
pending. All 528 script suites pass (274.65 seconds), as do independent
TypeScript, lint and the default production Turbopack build. Validation outcomes
are recorded in its adjacent review JSON.

The [sheet dialog batch](validation/chinese-sheet-dialog.md) adds owned dialog and
gear copy, six native feature choices, 34 resource explanations and independent
campaign/UI locale handling for generated choice actions, including cold resource
loading. The original 26 dialog renders and 28 earlier compressed baselines are
retained. SheetChoices joins covered files; remaining native material keeps full
sheet/gear/party flows pending. Focused checks and consolidated gate sequencing
are recorded in the linked note.

The native resource display now covers **415/415 static registered** names and
explanations. This completes the remaining 241 entries: six base counters and
235 project-native counters across six themes. English values retain the original
engine source; Chinese wording was written from that source, with dice and shared
labels checked. The 69 new reminders with short-rest recharge explicitly say
short or long rest. Unknown or overridden guidance retains its source text.
Dynamic free-cast resources and user-authored/pack text are outside this count.

All 415 resource rows render names/help in both locales; actual counter callbacks
for each theme post canonical IDs once, and real short-rest handling retains each
counter's recharge category. These checks do not demonstrate complete theme-class
play. The existing Darkness reminder incorrectly calls it a first-level spell;
Chinese display avoids that claim, and the real spell planner still rejects a
first-level slot. Its original English reminder and innate-casting data are
unchanged, so this is not acceptance of that separate legacy casting path.

Tracked resources now also reach the DM as localized display names paired with
canonical names and IDs. Tool resolution uses the acting character's freshly
loaded counters. Same-named counters require an explicit ID before mutation;
dedicated effect handlers still receive their required English names. Engine
conclusions localize resource names and IDs; unknown authored names stay literal.
The shared resolver accepts locale alias adapters for future languages. An empty
ASCII-normalized fragment can no longer make an unknown Chinese/numeric resource
name select the first counter. This source-only matching repair retains the prior
condition-review fingerprint and leaves definitions, guidance and refill data intact.

All 13,382 existing bilingual values, root UI bytes and 29 frozen baselines remain
unchanged. The resource-reference checks enforce 17 cases, including the actual
DM loop's ambiguity/retry path, one real counter spend, canonical wire-history
retention, Second Wind healing and Holy Nimbus's dedicated effect. Class-resource
(22), resource-spend (25), condition (6), prior-review (5), combat narration and
localized-prompt checks pass. TypeScript, lint and the default production Turbopack
build pass; the final consolidated run passes all **530** script suites (294.93
seconds). The earlier run's only failure was the prior condition-source
fingerprint; it was refreshed after reviewing the matching-only diff, with the
old fingerprint and frozen renders retained.

[Real resource acceptance](validation/chinese-resource-runtime.json) used the
current Codex subscription default, `gpt-6-astra` / CLI `0.162.1`. From a Chinese
request in combat, it selected `second_wind`; the engine rolled one d10, spent one
use and restored HP from 1 to 8. Final prose/conclusions used “回气” and “哥布林”.
This single case does not accept every resource, an authenticated browser journey
or audio. The language-specific content chunks remain about 333/335 KB
uncompressed (88/96 KB gzip); hydrated browser totals remain unmeasured.

1. Finish the remaining main-play UI by whole pages/flows in bounded commits.
   Work through the pending manifest; do not reopen passed translation checks.
   Check catalog/AST/terms and types once per batch, with one focused check only
   where interaction or shared dynamic projection changes.
2. Close remaining native feature/reaction names and options, dynamic free-cast
   text, player logs and owned material, preserving authored names, canonical
   tool arguments and English behavior. Reuse existing term/name evidence.
3. Complete configured Codex Chinese combat/tools/compaction/save-resume and
   English regression; collect useful prompt-usage and narration-guard evidence.
   Decisive combat facts come from the engine; AI supplies descriptive prose.
   Contradictory prose gets one text-only correction, then a safe fallback if the
   correction fails, remains contradictory or returns no text. Neither path may
   repeat an action, roll dice, change HP or spend a resource a second time.
4. Configure and validate local Chinese single-narrator TTS, then perform the
   complete Chinese journey and bilingual switch/save-resume acceptance.

Routine implementation, reversible setup, calibration and tests do not require
repeated approval. User involvement is needed for inaccessible account/service
credentials or a proposed change to the approved model/cost boundary. Terminology
and single voice can use stated defaults until the user supplies preferences.
