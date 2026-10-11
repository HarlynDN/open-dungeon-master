# Localization validation artifacts

Committed evidence consists of compact acceptance reports, source comparison
records, the reviewed UI scope and immutable English regression baselines.
Screenshots and verbose run logs belong in a caller-chosen directory outside
Git (or ignored `.local-validation/`), not this directory.

The 17 `*goldens.json.gz` files contain the exact pre-repair JSON bytes. They
were compressed with gzip, not regenerated. `golden-integrity.json` records
their original SHA-256; `scripts/lib/validation-json.mjs` verifies it before
parsing. Keep updating code against those baselines; do not refresh them to
silence a regression.

`review-repair-source-changes.json` records the source fingerprints refreshed
after changing browser imports and marking dictionary construction pure. Every
English and Chinese template was separately compared with the pre-repair
archive and remained identical. Historical mechanics fingerprints were retained.

`locale-bundle-measurement.json` is an isolated, production-minified compilation
of the LocaleProvider graph, plus raw dictionary JSON sizes. It excludes React,
other page dependencies, Flight framing and HTML. It does **not** establish a
successful Next build or whole-page download size. Reproduce with
`node scripts/measure-locale-bundles.mjs <pre-repair-source-directory>`.

See [the repair report](localization-review-repairs.md) and
[current development plan](../chinese-support-plan.md) for scope and limits.
