// Kokoro voices exposed in campaign settings. The service on :8880 accepts
// any installed voice id; this curated list keeps the picker sane.
export const TTS_VOICES = [
  { id: "af_heart", label: "Heart (warm female)" },
  { id: "af_bella", label: "Bella (bright female)" },
  { id: "af_aoede", label: "Aoede (calm female)" },
  { id: "af_nicole", label: "Nicole (soft female)" },
  { id: "am_michael", label: "Michael (warm male)" },
  { id: "am_fenrir", label: "Fenrir (deep male)" },
  { id: "am_puck", label: "Puck (lively male)" },
  { id: "bf_emma", label: "Emma (British female)" },
  { id: "bm_george", label: "George (British male)" },
  { id: "bm_fable", label: "Fable (British narrator)" },
  { id: "zf_xiaobei", label: "Xiaobei (Mandarin female)" },
  { id: "zf_xiaoni", label: "Xiaoni (Mandarin female)" },
  { id: "zf_xiaoxiao", label: "Xiaoxiao (Mandarin female)" },
  { id: "zf_xiaoyi", label: "Xiaoyi (Mandarin female)" },
  { id: "zm_yunjian", label: "Yunjian (Mandarin male)" },
  { id: "zm_yunxia", label: "Yunxia (Mandarin male)" },
  { id: "zm_yunxi", label: "Yunxi (Mandarin male)" },
  { id: "zm_yunyang", label: "Yunyang (Mandarin male)" },
] as const;

export type TtsVoiceId = (typeof TTS_VOICES)[number]["id"];

// Initial selection, not a quality ranking. The service supplies all remaining
// installed v1.1 Chinese voices. IDs stay visible so choices are reproducible.
export const CHINESE_TTS_VOICES = [
  "zf_001", "zf_003", "zf_004", "zf_006", "zf_008",
  "zm_009", "zm_010", "zm_011", "zm_012", "zm_013",
].map(id => ({ id, label: `★ ${id} ${id.startsWith("zf_") ? "♀" : "♂"}` }));
