# Chinese direct-save and special-roll captions

This checkpoint adds player-facing Chinese captions for direct consumable,
maneuver, travel, downtime, poison/disease and madness saves; healing/rest,
magic-item charge, special spell and authored special-roll purposes. English
stored `detail`, tools, dice, outcomes, DCs, action/resource/HP/inventory behavior
and public/DM-only visibility stay intact. It is not completion of the full
Chinese play-flow goal.

## Behavior and source comparison

- `RollSpecialContext` is locale-neutral presentation data with explicit types
  for treatment amounts, temporary HP, maximum-HP increments, spell HP pools,
  charges, thresholds, durations and effects. It carries no roll result or entity
  ID. Persisted parsing clones the permitted fields, rejects malformed variants,
  and leaves legacy/freeform records on their existing literal fallback.
- Direct save helpers accept the same original strings or an additive caption.
  Native callers now supply the actual purpose, source and typed identity. The
  enemy spell escape check keeps its original allowed ability choice and best
  modifier; it does not become a saving throw.
- Chinese healing captions describe rolled treatment amounts rather than net
  HP gain. Long madness retains the original multiplier: each duration point is
  10 hours. Mirror Image remains “at least the threshold”; Divine Intervention
  remains “at or below cleric level”. Neither caption adjudicates a new outcome.
- Proper names and explicitly authored feature/reaction/disease/poison names
  remain literal, including names identical to a catalog label. Native names use
  exact catalog references. Goblin remains 哥布林. Twenty-seven native terms join
  the contextual terminology policy; these are original project translations.
- All 10,936 existing bilingual key/value pairs and all 23 previous compressed
  baseline artifacts match `d0b8f879`. Two small new compressed baselines capture
  94 original engine call contracts and 52 original English RollCard renders.
  They were captured using the original commit, not by accepting new output.
  [Source review](special-caption-translations.json) records current fingerprints
  and the older reviews retain their prior fingerprints/integration explanation.

## Validation

The new script uses real engine handlers and a scratch database. Its checks cover
one inventory/resource spend, refused second use, poison damage then save,
above-level scroll failure without a slot spend, HP ceiling, short-rest hit dice
and Song of Rest/Chef extras, automatic no-roll failure, per-hour DC/exhaustion,
madness duration, Mirror Image state transition, DM-only redaction, enemy escape
and persisted captions after reopening the database. The JSX renderer uses actual
owned components with transport/device discovery stubbed; this is not an
authenticated browser or real AI/TTS acceptance run.

- Eight relevant script suites pass, including the new suite and existing save,
  check/cinematic, roll, consumable, inventory, damage-card and short-rest suites.
- Independent `npx tsc --noEmit` passes.
- `npm run lint` passes: 0 errors; the existing 12 ESLint warnings remain.
  Terminology: 257 entries, 0 errors, 72 context warnings. The extra warning is
  the explicit Confusion behavior purpose versus its plain spell label.
- `npm test` passes all **526** script suites in **273.27 seconds**. These are
  top-level script checks under Vitest; the “no tests” summary does not mean the
  scripts skipped their own assertions.
- The default `npm run build` completes successfully with Turbopack. The existing
  24 dynamic-filesystem tracing warnings remain; no build workaround was used.

## Remaining release work

RollCard remains pending: native initiative/ambush/social/shop captions,
counterspell DC details, authored paired damage names and other feature text
still need source-aware presentation. Remaining play/action/inventory/rest/
level-up and condition sheet/party surfaces, general player logs and material
also remain. The checker still reports 123/437 covered files and 3,436 pending
literal sites, with 5,545 message keys; this checkpoint advances dynamic captions,
not the static UI file fraction.

Configured Codex complete-journey/save-resume/English regression and local Chinese
single-narrator TTS playback remain required release gates. No credential or model
configuration changes, cloud costs or user campaign migrations were introduced.
