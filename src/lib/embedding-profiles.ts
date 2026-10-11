// A model/dtype changes cosine distributions, not merely vector wording.
// Unknown configurations can retrieve, but cannot mutate campaign state
// from an uncalibrated similarity score. See the reproducible measurement
// in docs/validation/bilingual-embeddings.json.
export type EmbeddingProfile = {
  loreFloor: number;
  sceneFloor: number;
  waypointMatch: number | null;
  factDuplicate: number | null;
  evidence: string | null;
};

const PROFILES: Record<string, EmbeddingProfile> = {
  "Xenova/all-MiniLM-L6-v2@fp32": {
    loreFloor: 0.28, sceneFloor: 0.25, waypointMatch: 0.62, factDuplicate: 0.92,
    evidence: "legacy English behavior",
  },
  "Xenova/paraphrase-multilingual-MiniLM-L12-v2@q8": {
    loreFloor: 0.28, sceneFloor: 0.25, waypointMatch: null, factDuplicate: null,
    evidence: "docs/validation/bilingual-embeddings.json",
  },
};

export function embeddingProfile(key: string): EmbeddingProfile {
  return PROFILES[key] ?? { loreFloor: 0.28, sceneFloor: 0.25, waypointMatch: null, factDuplicate: null, evidence: null };
}
