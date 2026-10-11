# Simplified Chinese development plan

This is the current plan, not a chronological execution ledger. The original
100 KB ledger, screenshots, complete pre-repair checkout and binary patch were
preserved outside Git during the 2026-10-11 repair checkpoint. The larger play
flow remains incomplete; the review-repair checkpoint is a separate scoped task.

## Approved scope and boundaries

- Simplified Chinese (`zh-CN`) with an English switch, extensible locale registry.
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
| DM safety | Chinese adapter/corrections, scoped tool aliases and canonical protocol instructions | Full combat/tool/correction flow on configured Codex; conservative regex coverage is not full language understanding |
| Embeddings | Original English deployment default retained; explicit multilingual opt-in; fixed bilingual calibration/holdout and hard-negative policy | Broader pack quality; opt-in affects English campaigns and rebuilds indexes |
| UI | **117/437** covered files, **3596** pending literal sites, **4563** message keys; scoped AST gate | Remaining play/action/combat/inventory/rest/level-up/save/resume surfaces and dynamic import warnings; file fraction is not overall completion or an effort estimate |
| Character creation/material | Identity, ancestry, class introductions, ability allocation, gear, spell book/preparation and finish preview; 517 spell and 228 equipment names; original-source review records | Remaining material beyond reviewed names/creator snippets; authored/pack text retains original language |
| Player system logs | Structured rule diagnostics retain English semantics and add presentation metadata | General player-visible log templates; model-facing English tool results remain independent |
| Resource delivery | UI vs content namespaces; character/campaign boundaries; locale chunks loaded before switching; generated resources checked by lint | Full production page payload/first-load measurement and browser switching smoke test |
| Local Chinese TTS | Locale capability/voice preferences planned | Service not configured; implement/validate Unicode segmentation, voice discovery, locale-sensitive cache, numbers/units/names and real playback |
| Final play flow | Recorded two Chinese Codex exploration/social turns plus utility call | Complete Chinese journey, English regression and real local TTS acceptance |

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
to hide regressions. The 17 compressed baselines preserve exact original bytes
and verify SHA-256 when loaded.

Runtime evidence names Codex CLI 0.162.1 and current `gpt-6-astra` subscription
configuration. It proves basic Chinese exploration/social/tool/utility operation,
not complete play, combat guard recall, English parity or local-model capability.
A local-model comparison is future compatibility work, not this user's release
backend. Chinese TTS is still unconfigured; discover installed voices before
assuming `zf_xiaobei`, `lang_code=z` and `misaki[zh]` are available. Test actual
numbers, units, names, closing quotation marks and long unpunctuated text.

The [review repair report](validation/localization-review-repairs.md) records
current fixes, bundle measurement and build limits. Production build success,
full-page size and real audio acceptance are separate from TypeScript/unit checks.

## Next execution order and user involvement

1. Finish and commit this compatibility/stability review checkpoint.
2. Continue the remaining main play UI and parameterized player logs in bounded
   commits, each with relevant English regression and translation-source review.
3. Complete configured Codex Chinese combat/tools/compaction/save-resume and
   English regression; collect useful prompt-usage and narration-guard evidence.
4. Configure and validate local Chinese single-narrator TTS, then perform the
   complete Chinese journey and bilingual switch/save-resume acceptance.

Routine implementation, reversible setup, calibration and tests do not require
repeated approval. User involvement is needed for inaccessible account/service
credentials or a proposed change to the approved model/cost boundary. Terminology
and single voice can use stated defaults until the user supplies preferences.
