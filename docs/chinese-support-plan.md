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
| UI | **190/439** covered files, **2135** pending literal sites, **10030** message keys; scoped AST gate; earlier play/session surfaces plus hand labels/targets/area selection, campaign-locale action sentences, native previews, basic/reaction rules, common casting refusals, spell selectors, all 113 owned mechanic notes, 103 native technique and 23 maneuver labels, attack/bonus-route and material/ritual refusals, built-in form attack names and verified current-actor labels, correction/multi-picker chrome, native downtime facts and inventory/vitals approval/player-trade controls, guided progression chrome, rest/loot/travel moments and all native option summaries, owned generic feature/feat summaries, feat choice controls, campaign/map entry notices the complete app help walkthrough story/chronicle/arc controls, NPC roster review, campaign model controls market/shelf/trade, party-lead, quest-log/faction controls plus facts, pinned memories, context-trace presentation and passage edit/reroll/action controls and character/companion entry and private-chat/media presentation and audit/timeline controls and dice tray/source controls | Remaining dynamic text keeps hand files pending; general play/inventory/rest/level-up/save/resume surfaces and full sheet/party dialogs; file fraction is not overall completion or an effort estimate |
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

The user explicitly requested that verification not slow delivery. For routine
copy batches, check catalog/coverage/terminology once and use a focused interaction
check only where behavior or shared display logic changed. Do not repeatedly test
settled names such as Goblin unless their parsing/display implementation changed.
Type checks apply to code changes; full regression, lint and production builds
belong at meaningful phase boundaries and final acceptance, not every copy batch.

Turn controls passed six focused interaction scenarios, 32 exact pre-edit English
renders, relevant existing floor/hand/retry regressions, types and changed-file
lint. Root UI payloads and all existing translation values/goldens are unchanged.
One new terminology warning distinguishes the menu action Message from the spell
Message (传讯术); those are different contexts. Current default Turbopack build
attempts were blocked at its internal port binding by the execution environment,
including the escalated attempt; this batch does not claim a passing production
build. Keep that gate for the next phase boundary rather than retrying per batch.

The latest dice-control checkpoint adds 54 keys (32 campaign tray keys and 22
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

1. Finish native feature/reaction names and options, dynamic free-cast text,
   authored paired-damage frames and full sheet/party material, preserving
   proper/authored names, canonical tool arguments and English render parity.
2. Continue the remaining main play UI and parameterized player logs in bounded
   commits, each with relevant English regression and translation-source review.
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
