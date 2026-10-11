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
| DM safety | Per-event engine conclusions with English/Chinese renderers; AI prose separated; one text-only correction and safe fallback; shared localized enemy names in roster/initiative/prose/guard; real Codex combat acceptance | Broader spell/condition/pack coverage; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **125/437** covered files, **3262** pending literal sites, **6691** message keys; scoped AST gate; pending checks, initiative controls, encounter roster, board conditions, structured attack/area/death/check/save/special/initiative/social captions and cinematic owned UI | Remaining play/action/combat/inventory/rest/level-up/save/resume surfaces, full sheet/party dialogs and native feature/reaction names; file fraction is not overall completion or an effort estimate |
| Character creation/material | Identity, ancestry, class introductions, ability allocation, gear, spell book/preparation and finish preview; 517 spell and 228 equipment names; 257-entry contextual terminology policy and lint gate; 415/415 static registered resource names and guidance; original-source review records | Resource names in DM prompts/tool inputs, remaining feature/feat and magic-item material; dynamic free-cast resources and user-authored/pack text remain outside the static resource review |
| Player system logs | Structured rule diagnostics and engine-generated combat conclusions retain English protocol semantics with localized presentation | General player-visible log templates; model-facing English tool results remain independent |
| Resource delivery | UI vs content namespaces; character/campaign boundaries; generated resources checked by lint; production Turbopack build and anonymous bilingual browser switch/reload succeed; home/character/campaign SSR and initial-script payloads measured | Hydrated/lazy network totals, authenticated campaign switching and active-play browser acceptance; route-level JS payload remains large |
| Local Chinese TTS | Locale capability/voice preferences planned | Service not configured; implement/validate Unicode segmentation, voice discovery, locale-sensitive cache, numbers/units/names and real playback |
| Final play flow | Recorded Chinese exploration/social/utility and combat/slot/correction acceptance on Codex | Complete Chinese journey, English regression and real local TTS acceptance |

The concrete UI scope and deferred areas are in
[ui-localization.json](validation/ui-localization.json). The checker rejects new
literal sites in covered files. Run `npm run i18n:inventory` to refresh a local
inventory; do not count deferred files as promised first-release delivery.

## Compatibility contracts

Register each locale's direction, browser tags, generation language, segmentation
locale and TTS capabilities in `src/lib/i18n/locales.ts`. Every source message
must supply every registered locale; adding a language also extends the typed
client loader table. Business logic preserves machine protocols and uses locale
adapters for natural language rather than scattered Chinese-only conditions.

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

Root UI bytes, 12,418 prior bilingual values, 29 prior baselines and original
resource/refill sources remain unchanged. Focused dialog (16), party (12), custom
resource (8), cast-rule (25) and prior-review (5) checks pass. All **530** script
suites pass (322.70 seconds), as do TypeScript, lint and the default production
Turbopack build. The language-specific content chunks are about 333/335 KB
uncompressed (88/96 KB gzip); hydrated browser totals remain unmeasured. No real
model, browser journey or audio acceptance ran here. DM prompts and `use_resource`
still rely on English resource names; feature/feat material, magic-item names and
the wider play flow also remain pending.

1. Connect localized resource names to DM prompts and tool-input resolution,
   providing canonical IDs and rejecting ambiguous names before mutation. Finish
   native feature/reaction names, authored paired-damage frames and full sheet/party
   material, preserving proper/authored names and English render parity.
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
