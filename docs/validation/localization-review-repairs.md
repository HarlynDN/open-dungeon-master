# Localization review repairs — 2026-10-11

The review's compatibility and failure-path concerns are addressed in code.
This checkpoint does not complete the larger Chinese-play goal.

| Concern | Resolution | Evidence / remaining limit |
| --- | --- | --- |
| Uncommitted work on main | Complete worktree archive made before edits; development moved to `codex/chinese-support`; dice sync separated and remaining changes grouped into dependent review commits | Archive and original patch preserved outside the checkout; no push or deployment |
| Embedding default changes English deployments | Restored `all-MiniLM-L6-v2@fp32`; multilingual MiniLM is explicit deployment-wide env opt-in | Default-install/index/duplicate-retirement regressions restored; separate multilingual policy suite retains unsafe mutation protection |
| Untuned retrieval floors | Documented bounded calibration evidence separately from tuning | Existing 0.28/0.25 floors passed the frozen small bilingual corpus; broad content-pack quality remains unproven |
| All dictionaries in root client graph | Browser consumers use resource runtime; root sends UI scope, character/campaign layouts send content scope; selected-language chunks load before switching | Complete key/placeholder and generated-resource checks; English source recognition also receives its namespace's English copy |
| Runtime translation throw | Development/test remain strict; production logs the missing parameter and displays its placeholder | Production child-process regression; missing resources also produce an observable safe fallback |
| No system message | Prepend a legal locale system message without changing original messages | Empty/history/tool-wire, retry and language-switch regressions |
| Every non-ASCII character costs 2 tokens | ASCII/Latin/typography use the legacy rate; Han/kana/Hangul use 1.5; rare symbols/emoji retain 2 | Classification and chapter/history-budget regressions; 1.5 is a provisional heuristic, **not Codex-usage calibration** |
| Chinese denial suppresses another claim | Separate independent comma clauses; conditional, reported and recalled sentences retain their scope | 12 guard test groups, including hits/deaths/numbers/spells after unrelated denials; original English guard suite retained |
| Accept-Language missing | Saved account > explicit device cookie > browser preference; registered Chinese variants map to the supported Simplified locale | Weighted ranges, malformed/q=0/tie cases; saved campaigns keep their own locale |
| Oversized validation output | 17 exact English baselines losslessly compressed with original checksums; all screenshots and the long ledger archived outside Git | Validation directory reduced from about 8.66 MB to about 0.82 MB; no baseline outputs regenerated |
| Scope/claims ambiguous | Current plan now states measured UI coverage, approved Codex backend and pending runtime work | 117/437 UI files, 3596 pending literal sites; file coverage is not a time estimate |

## Package measurement and build status

The isolated LocaleProvider graph decreased from 512,906 bytes / 169,209 gzip
bytes to roughly 7 KB / 3 KB. The four dictionaries are separate async chunks.
English root UI JSON is 143,543 bytes / 43,824 gzip bytes; Chinese root UI plus
English source recognition is 289,129 bytes / 93,616 gzip bytes. Content JSON is
provided only on character/campaign routes at initial SSR; an explicit language
switch also preloads deferred content before updating the interface. Those data costs still exist and
must be included in a future full-page measurement; the JS reduction is not a
claim that all pages became 98% smaller.

`npm run build` was attempted, including escalation. Turbopack failed while
binding its local PostCSS worker port (`Operation not permitted`). The alternate
webpack application build also failed on the pre-existing client path
`reference/page.tsx → reference/compare.ts → srd/odds.ts → dice.ts → node:crypto`.
Neither failure establishes that the repaired app built successfully. No source
changes were made to hide those failures or force a different bundler.

Later continuation: the default Turbopack production build succeeded on
2026-10-11, including the new combat UI unit. The
[combat UI checkpoint](chinese-combat-ui.md) records the successful build,
production-server SSR, bounded browser switching and full-page/initial-script
measurements. The failure paragraph above describes this earlier repair run;
it is no longer a current default-build blocker. The alternate webpack path
has not been independently repaired or revalidated.

## Runtime acceptance boundaries

Recorded real DM evidence is Codex CLI 0.162.1, subscription sign-in, the current
`gpt-6-astra` configuration: two Chinese exploration/social turns and one utility
call. They contain no eligible combat contradictions, so they cannot measure
Chinese guard recall. The guard additions above are labeled synthetic regressions,
not a production precision/recall claim. Pronouns, nuanced tense and other
unmatched language still exceed the conservative rule-based guard's coverage.

Codex token usage has not calibrated the new character coefficient. The current
adapter does not forward token-usage events; future calibration needs complete
prompt/tool/framing accounting, not only the rendered reply's length.

Chinese TTS is unconfigured. Real voice availability, pronunciation and playback
acceptance remain part of the larger play-flow goal. Local DM-model comparison
is a future compatibility exercise; the user approved Codex subscription for
this release and it is not replaced or made conditional on local-model approval.

## Checks

Final validation on frozen source passed: **516/516 script suites** in 254.60 s,
TypeScript, lint (zero errors; 12 existing warnings), localization scope and
generated-resource parity. The first full run's seven failures were repaired;
all eight focused suites passed before the final complete rerun. Original
English/Chinese catalogs remain identical to the pre-repair archive, and all
17 golden byte checksums remain unchanged. Build/runtime limits above are
separate from these passed checks.

Final diff cleanup removed two extra EOF blank lines in setup-line.ts and
variant-metadata.ts. Their emitted JavaScript was compared byte-for-byte equal;
targeted lint and the final diff check passed. The full regression source-freeze
above remains the original tested record.
