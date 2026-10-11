# Bilingual embedding evaluation

The deployment default remains `Xenova/all-MiniLM-L6-v2@fp32`, preserving
existing English indexes, waypoint matching and fact deduplication. For Chinese
retrieval, explicitly opt in to `Xenova/paraphrase-multilingual-MiniLM-L12-v2@q8`
with `EMBEDDING_MODEL` and `EMBEDDING_DTYPE` in `.env.server`.
Model selection is deployment-wide, including English campaigns. The existing
model-stamp reconciliation clears incompatible vectors before serving requests
and rebuilds them in the background; old messages and facts are not rewritten.

`bilingual-embeddings.json` records the measured vectors' model/tokenizer hashes,
Transformers.js version, fixed fixture results and acceptance gates. Reproduce
it with `node scripts/calibrate-bilingual-embeddings.mjs`. Weights and cached
fixture vectors live in the ignored `models/embeddings` directory. No DM model
or paid backend is used for this evaluation.

The corpus has 32 independently authored bilingual synthetic documents. There
are 16 calibration queries and 16 held-out queries in each language. Queries
are tested against English documents and against Chinese memory, both by
cosine ranking and the production lexical/RRF helpers at the lore/scene floors.
This is a small diagnostic corpus, not a guarantee for arbitrary source packs.

| Held-out queries → documents | Original English model Recall@8 | Multilingual model Recall@8 | Original fused Recall@8 | Multilingual fused Recall@8 |
| --- | --- | --- | --- | --- |
| English → English | 100% | 100% | 100% | 100% |
| Chinese → English | 37.5% | 100% | 0% | 100% |
| Chinese → Chinese | 93.75% | 100% | 100% | 100% |

The two production floors (lore 0.28, scene 0.25) retain these held-out recall
results. English top-1 cosine recall declines from 93.75% to 87.5%; the table
above reports the agreed Recall@8 gate and does not imply identical ordering.
Calibration fused Chinese → Chinese recall is 93.75%, exposing one lexical/
semantic ranking conflict even though the held-out results pass.

Cosine is unsuitable as a sole test for mutating state. The old waypoint
threshold 0.62 misclassifies five of the multilingual held-out hard negatives.
No threshold separates all calibration paraphrases from distinct targets such
as east/west gates, so the new profile disables semantic waypoint ticks.
Exact CJK names can still tick objectives, and the existing judge remains.

Fact calibration initially admits threshold 0.862567, but three supplemental
negative examples exceed it: a different payment amount or a negated transfer
inside an otherwise identical sentence. These challenge examples were authored
after the first measurement, kept separate from the frozen holdout and never
used to tune a new threshold. Their failure disables semantic fact retirement.
Facts are still embedded and retrieved; insertion, exact duplicate handling
and explicit subject supersession retain their existing behavior. Automatic
fact retirement by cosine is also disabled for uncalibrated configurations.
