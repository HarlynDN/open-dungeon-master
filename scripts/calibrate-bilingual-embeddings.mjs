// Explicit/offline-capable evaluation; not part of npm test. Loads real ONNX
// weights and writes a report. Holdout does not tune the selected thresholds.
import path from "node:path";
import { mkdirSync, writeFileSync, readFileSync, renameSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { pipeline, env } from "@huggingface/transformers";
import { retrievalDocuments, retrievalQueries, mutationPairs } from "./fixtures/bilingual-retrieval.mjs";
import { mutationChallenge } from "./fixtures/bilingual-mutation-challenge.mjs";
import { computeIdf, lexicalScore, fuseRanked } from "../src/lib/dm/fusion-logic.ts";

env.cacheDir = path.join(process.cwd(), "models", "embeddings");
const outDir = path.join(process.cwd(), "docs", "validation");
mkdirSync(outDir, { recursive: true });
const score = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const configurations = [
  { model: "Xenova/all-MiniLM-L6-v2", dtype: "fp32" },
  { model: "Xenova/paraphrase-multilingual-MiniLM-L12-v2", dtype: "q8" },
];
const reports = [];
for (const config of configurations) {
  const key = `${config.model}@${config.dtype}`;
  const cacheName = `${config.model.split("/").pop()}-${config.dtype}-fixture-vectors.json`;
  const cacheDirectory = path.join(env.cacheDir, "calibration");
  mkdirSync(cacheDirectory, { recursive: true });
  const vectorsFile = path.join(cacheDirectory, cacheName);
  if (existsSync(path.join(outDir, cacheName))) renameSync(path.join(outDir, cacheName), vectorsFile);
  const texts = [...new Set([...retrievalDocuments.flatMap(row => [row.en, row.zh]), ...retrievalQueries.flatMap(row => [row.en, row.zh]), ...[...mutationPairs, ...mutationChallenge].flatMap(row => [row.a, row.b])])];
  let vectors;
  try {
    const cached = JSON.parse(readFileSync(vectorsFile, "utf8"));
    if (JSON.stringify(cached.texts) === JSON.stringify(texts) && cached.key === key) vectors = cached.vectors;
  } catch { /* A changed fixture is recomputed. */ }
  if (!vectors) {
    console.log(`[calibration] loading ${key}`);
    const embedder = await pipeline("feature-extraction", config.model, { dtype: config.dtype, device: "cpu" });
    vectors = [];
    for (let index = 0; index < texts.length; index += 16) {
      const batch = await embedder(texts.slice(index, index + 16), { pooling: "mean", normalize: true });
      vectors.push(...batch.tolist());
    }
    await embedder.dispose();
    writeFileSync(vectorsFile, JSON.stringify({ key, texts, vectors }));
  }
  const byText = new Map(texts.map((text, index) => [text, vectors[index]]));
  const retrieval = [];
  for (const split of ["calibration", "holdout"]) for (const [queryLocale, documentLocale] of [["en", "en"], ["zh", "en"], ["zh", "zh"]]) {
    const idf = computeIdf(retrievalDocuments.map(row => row[documentLocale]));
    const details = retrievalQueries.filter(row => row.split === split).map(row => {
      const ranked = retrievalDocuments.map(doc => ({ id: doc.id, similarity: score(byText.get(row[queryLocale]), byText.get(doc[documentLocale])) })).sort((a, b) => b.similarity - a.similarity);
      const fused = {};
      for (const [use, floor] of [["lore", 0.28], ["scene", 0.25]]) {
        fused[use] = fuseRanked(ranked.map(doc => ({ ...doc, lexical: lexicalScore(row[queryLocale], retrievalDocuments.find(entry => entry.id === doc.id)[documentLocale], idf) })), { similarityFloor: floor, limit: 8 });
      }
      return { id: row.id, expected: row.expected, rank: ranked.findIndex(doc => doc.id === row.expected) + 1, relevantSimilarity: ranked.find(doc => doc.id === row.expected).similarity, top8: ranked.slice(0, 8), fused };
    });
    retrieval.push({ split, queryLocale, documentLocale, recall8: details.filter(row => row.rank <= 8).length / details.length, recall1: details.filter(row => row.rank === 1).length / details.length, fusedLoreRecall8: details.filter(row => row.fused.lore.includes(row.expected)).length / details.length, fusedSceneRecall8: details.filter(row => row.fused.scene.includes(row.expected)).length / details.length, details });
  }
  const pairs = mutationPairs.map(pair => ({ ...pair, similarity: score(byText.get(pair.a), byText.get(pair.b)) }));
  const mutations = ["waypoint", "fact"].map(use => {
    const calibration = pairs.filter(pair => pair.use === use && pair.split === "calibration");
    const negatives = calibration.filter(pair => !pair.same);
    const positives = calibration.filter(pair => pair.same);
    const threshold = Math.max(...negatives.map(pair => pair.similarity)) + 0.02;
    // If no separation exists for all positive fixtures, cosine cannot
    // establish identity; disable this shortcut rather than tune on holdout.
    const separatesCalibration = threshold <= Math.min(...positives.map(pair => pair.similarity));
    const holdout = pairs.filter(pair => pair.use === use && pair.split === "holdout");
    const challenge = mutationChallenge.filter(pair => pair.use === use).map(pair => ({ ...pair, similarity: score(byText.get(pair.a), byText.get(pair.b)) }));
    const challengeFalsePositives = separatesCalibration ? challenge.filter(pair => pair.similarity >= threshold).length : 0;
    const holdoutFalsePositivesAtThreshold = separatesCalibration ? holdout.filter(pair => !pair.same && pair.similarity >= threshold).length : 0;
    const enabled = separatesCalibration && challengeFalsePositives === 0 && holdoutFalsePositivesAtThreshold === 0;
    return { use, enabled, calibratedThreshold: threshold, positiveMinimum: Math.min(...positives.map(pair => pair.similarity)), negativeMaximum: threshold - 0.02, challengeFalsePositivesAtThreshold: challengeFalsePositives, holdoutFalsePositivesAtThreshold, holdoutFalsePositives: enabled ? holdoutFalsePositivesAtThreshold : 0, holdoutTruePositives: enabled ? holdout.filter(pair => pair.same && pair.similarity >= threshold).length : 0, previousThreshold: use === "waypoint" ? 0.62 : 0.92, previousThresholdFalsePositives: holdout.filter(pair => !pair.same && pair.similarity >= (use === "waypoint" ? 0.62 : 0.92)).length, pairs: pairs.filter(pair => pair.use === use), supplementalChallenge: challenge };
  });
  const assets = ["config.json", "tokenizer.json", "tokenizer_config.json", `onnx/${config.dtype === "q8" ? "model_quantized.onnx" : "model.onnx"}`].map(file => ({ file, sha256: createHash("sha256").update(readFileSync(path.join(env.cacheDir, config.model, file))).digest("hex") }));
  const report = { key, dimensions: vectors[0].length, assets, retrieval, mutations };
  reports.push(report);
  console.log(JSON.stringify({ key, retrieval: retrieval.map(row => ({ split: row.split, queryLocale: row.queryLocale, documentLocale: row.documentLocale, recall8: row.recall8, fusedLoreRecall8: row.fusedLoreRecall8, fusedSceneRecall8: row.fusedSceneRecall8 })), mutations: mutations.map(row => ({ use: row.use, enabled: row.enabled, threshold: row.calibratedThreshold, challengeFalsePositivesAtThreshold: row.challengeFalsePositivesAtThreshold })) }));
}
const baseline = reports[0].retrieval.find(row => row.split === "holdout" && row.queryLocale === "en" && row.documentLocale === "en");
const candidate = reports[1];
const english = candidate.retrieval.find(row => row.split === "holdout" && row.queryLocale === "en" && row.documentLocale === "en");
const chinese = candidate.retrieval.filter(row => row.split === "holdout" && row.queryLocale === "zh");
const acceptance = { englishRecall8: english.recall8 >= baseline.recall8 && english.fusedLoreRecall8 >= baseline.fusedLoreRecall8 && english.fusedSceneRecall8 >= baseline.fusedSceneRecall8, chineseRecall8: chinese.every(row => row.recall8 >= 0.95 && row.fusedLoreRecall8 >= 0.95 && row.fusedSceneRecall8 >= 0.95), mutationFalsePositives: candidate.mutations.every(row => row.holdoutFalsePositives === 0) };
const fixtures = ["scripts/fixtures/bilingual-retrieval.mjs", "scripts/fixtures/bilingual-mutation-challenge.mjs"].map(file => ({ file, sha256: createHash("sha256").update(readFileSync(file)).digest("hex") }));
writeFileSync(path.join(outDir, "bilingual-embeddings.json"), JSON.stringify({ generatedAt: new Date().toISOString(), fixtures, transformersVersion: JSON.parse(readFileSync("node_modules/@huggingface/transformers/package.json", "utf8")).version, reports, acceptance, limitation: "Synthetic bounded corpus; not a universal retrieval or identity guarantee. Semantic mutation shortcuts disabled when calibration cannot separate negatives or the supplemental challenge fails." }, null, 2) + "\n");
if (!Object.values(acceptance).every(Boolean)) throw new Error("Bilingual embedding acceptance failed; see docs/validation/bilingual-embeddings.json");
console.log("[calibration] acceptance passed");
