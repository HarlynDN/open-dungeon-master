# Initiative and social captions

This checkpoint completes another part of the playable Chinese flow. It does
not claim full UI, browser journey, real-model or local speech acceptance.

## Scope

- Locale-neutral initiative metadata reaches opening/requested/physical rolls,
  reset, deadlock recovery, reinforcements, new companions and summoned groups.
- Both ambush sides display their Stealth purpose in Chinese.
- Social influence, relationship overtures, consent and shop haggling have typed
  purposes. NPC/player/shop names stay literal, including an NPC named `Goblin`.
- Enemy Counterspell captions show the casting ability, catalog spell and the
  original threshold. The threshold was already part of the English detail;
  redaction still conceals results and dice. The roll API's DC remains unchanged.
- Native creature display names continue to use the selected glossary, including
  `Goblin` → `哥布林`. IDs, English tool results and previous history stay intact.

## Evidence

`initiative-social-translations.json` records source comparison by the
implementation agent, with fingerprints. It is not independent human approval.
Two small compressed baselines were captured from commit `b478a558`:

- 22 producer calls preserve English detail, dice expression, DC, result and
  visibility inputs after projecting away additive caption metadata.
- 27 original English RollCard/cinematic renders remain exact. Chinese renders
  check purpose, proper-name boundaries, numeric thresholds and hidden results.

`test-chinese-initiative-social.mjs` adds 16 checks, using a scratch database and
the real engine and submission route. These cover initiative ordering/modifiers,
reset/recovery, physical submission, Alert and passive surprise comparisons,
one attitude shift per exchange, relationship refusal, one haggle per shop,
reaction/slot consumption, reinforcements, companion arrival, one group summon
roll and persistence across reopening. Related enforcement suites additionally
cover the broader existing mechanic paths.

All 11,090 prior bilingual resource values and all 25 previous compressed
baselines remain unchanged. Existing review fingerprints were updated only for
the additive caption integration, retaining their previous hashes.
All 527 script suites pass (270.56 seconds). Independent TypeScript, lint and
the default Next 16.3.8 Turbopack production build pass; lint retains 12 existing
warnings, and the build retains 24 existing dynamic filesystem warnings.

## Remaining gates

Static UI coverage is still **123/437**, with **3436** pending literal sites and
**5552** message keys. RollCard remains pending for native reaction/attack frames,
level-up HP dice and missing material names. Authored/freeform prose remains
literal. Broader player logs/UI, authenticated Chinese play/save/resume, configured
Codex real-model acceptance and local single-narrator Chinese TTS still require
completion. Validation commands and outcomes are recorded in the adjacent JSON
review record.
