// Pure Ask helpers, kept free of alias imports so node test scripts
// (scripts/test-ask.mjs) can load it directly.
//
// Ask lets a player put a question to the DM without spending a turn on it:
// "who was the woman at the shrine three chapters back?", "does my ranger
// read Draconic?", "how does grappling work?". Before this the only options
// were a `do` that derailed the scene or an `ooc` the DM never answers.

import type { AppLocale } from "../i18n/locales.ts";

export const ASK_SCOPES = ["story", "rules", "sheet"] as const;
export type AskScope = (typeof ASK_SCOPES)[number];

export const ASK_VISIBILITIES = ["private", "table"] as const;
export type AskVisibility = (typeof ASK_VISIBILITIES)[number];

export const QUESTION_MAX_CHARS = 500;

export type AskCitation = {
  kind: string;
  ref: string;
  quote: string;
};

export type AskResult = {
  answer: string;
  citations: AskCitation[];
};

export function isAskScope(value: unknown): value is AskScope {
  return ASK_SCOPES.includes(value as AskScope);
}

export function clampQuestion(question: string): string {
  return question.replace(/\s+/g, " ").trim().slice(0, QUESTION_MAX_CHARS);
}

// Rules questions are about the system; sheet questions are about the
// asker's own character; everything else is about the world and the story.
// Deliberately keyword-driven and cheap: this only picks which evidence to
// gather, and gathering slightly wrong evidence costs a worse answer, not a
// broken one.
const RULES_HINT =
  /\b(rule|rules|how do(es)?|mechanic|advantage|disadvantage|grapple|grappling|opportunity attack|concentration|save|saving throw|proficienc|initiative|condition|exhaustion|cover|stealth rules|resistance|attunement|short rest|long rest|spell slot|ritual|counterspell|difficulty class|\bdc\b|\bac\b)\b/i;
const SHEET_HINT =
  /\b(my|mine|i have|do i|can i|am i|my character|my sheet|my spells?|my inventory|my gold|my hp|my ac|my level|know how to|proficient|trained in)\b/i;

type AskLocaleProfile = {
  sheet: RegExp;
  rules: RegExp;
  recall: RegExp;
  // Names in scripts without capitalization cannot use the English proper
  // noun heuristic. Search story questions conservatively, within the same
  // bounded archive pass; rules/sheet questions still skip that expense.
  unmarkedNames: RegExp | null;
};
const ASK_LOCALE_PROFILES: Record<AppLocale, AskLocaleProfile> = {
  en: { sheet: /$^/, rules: /$^/, recall: /$^/, unmarkedNames: null },
  "zh-CN": {
    sheet: /我的|我(?:能否|能不能|可以|会不会|还(?:能|有)|是否(?:会|有|能)|有(?:哪些|多少|几个|什么))|我(?:当前|目前)?的|我(?:懂|会|掌握|熟练)/u,
    rules: /规则|机制|优势|劣势|擒抱|借机攻击|专注|豁免|熟练|先攻|力竭|掩护|抗性|同调|短休|长休|法术位|仪式施法|反制法术|难度等级|护甲等级|附赠动作|反应|怎么(?:判定|计算|掷骰)|如何(?:判定|计算|掷骰)/u,
    recall: /之前|以前|先前|过去|历史|记得|回忆|上次|当时|发生|是谁|谁的|哪里|在哪|何时|什么时候|章节|承诺|欠|说过/u,
    unmarkedNames: /\p{Script=Han}/u,
  },
};

export function inferScope(question: string, locale: AppLocale = "en"): AskScope {
  const profile = ASK_LOCALE_PROFILES[locale] ?? ASK_LOCALE_PROFILES.en;
  // Sheet wins over rules: "how does my Bardic Inspiration work" is best
  // answered from the character who actually has it.
  if (SHEET_HINT.test(question) || profile.sheet.test(question)) {
    return "sheet";
  }
  if (RULES_HINT.test(question) || profile.rules.test(question)) {
    return "rules";
  }
  return "story";
}

// Whether a question is worth spending archive retrieval on. Recall hints
// or a proper noun mean there is probably something on the record to find;
// "how does grappling work" should never cost an embedding pass.
const RECALL_HINT =
  /\b(earlier|previous|previously|before|past|history|remember|recall|happened|ago|last time|back then|who|where|when|whose|lore|chapter|said|promised|owe)\b/i;
const QUESTION_WORDS = new Set([
  "what", "when", "where", "who", "why", "how", "can", "does", "do", "is",
  "are", "was", "were", "tell", "please", "should", "could", "would", "will",
  "may", "did", "the", "and", "but", "my", "our", "their", "his", "her",
]);

export function shouldSearchArchive(question: string, force = false, locale: AppLocale = "en"): boolean {
  if (force) {
    return true;
  }
  const profile = ASK_LOCALE_PROFILES[locale] ?? ASK_LOCALE_PROFILES.en;
  if (RECALL_HINT.test(question) || profile.recall.test(question)) {
    return true;
  }
  // A capitalized word that is not just the sentence opener suggests a name.
  return (profile.unmarkedNames?.test(question) === true && inferScope(question, locale) === "story") || (question.match(/\b[A-Z][a-z]{2,}\b/g) ?? []).some(
    (word) => !QUESTION_WORDS.has(word.toLowerCase()),
  );
}

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Parses the model's JSON reply. Tolerates code fences and surrounding
// prose, because a small utility model will sometimes wrap its JSON.
export function parseAskJson(raw: string): AskResult | null {
  const text = (raw ?? "").trim();
  if (!text) {
    return null;
  }
  const withoutFence = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(withoutFence.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") {
    return null;
  }
  const record = parsed as Record<string, unknown>;
  const answer = asString(record.answer, 4_000);
  if (!answer) {
    return null;
  }
  const rawCitations = Array.isArray(record.citations) ? record.citations : [];
  const citations: AskCitation[] = [];
  for (const entry of rawCitations.slice(0, 8)) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const citation = entry as Record<string, unknown>;
    const quote = asString(citation.quote, 400);
    if (!quote) {
      continue;
    }
    citations.push({
      kind: asString(citation.kind, 40) || "record",
      ref: asString(citation.ref, 120),
      quote,
    });
  }
  return { answer, citations };
}
