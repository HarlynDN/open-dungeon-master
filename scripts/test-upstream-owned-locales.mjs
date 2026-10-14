import assert from 'node:assert/strict';
import '../src/lib/i18n/messages.ts';
import { upstreamOwnedText, modelSummaryText } from '../src/lib/i18n/upstream-presentations.ts';
const raw = 'Too big for this machine: 12.5 GB of weights against 8 GB of memory.';
assert.equal(upstreamOwnedText(raw, 'en'), raw);
assert.equal(upstreamOwnedText(raw, 'zh-CN'), '模型过大：权重 12.5 GB，机器可用内存 8 GB。');
assert.equal(upstreamOwnedText(raw.replace(/\.$/, '!'), 'zh-CN'), raw.replace(/\.$/, '!'));
for (const value of ['provider/model:v1.0', 'My authored tool calls', 'Not in the model catalogX', 'Not in the model catalog. extra']) assert.equal(upstreamOwnedText(value, 'zh-CN'), value);
assert.equal(modelSummaryText('tool calls · provider/model:v1.0 · 32K context', 'zh-CN'), '工具调用 · provider/model:v1.0 · 32K 上下文');
console.log('PASS: owned messages translate exact frames, preserve placeholders and unknown model/authored strings.');

const { COMFY_MODELS, ANY_CHECKPOINT } = await import('../src/lib/image-models/catalog.ts');
const { default: verified } = await import('../src/lib/image-models/verified.json', { with: { type: 'json' } });
for (const raw of [...COMFY_MODELS, ANY_CHECKPOINT].map(row => row.blurb).concat(verified.map(row => row.notes).filter(Boolean))) {
  assert.equal(upstreamOwnedText(raw, 'en'), raw);
  assert.notEqual(upstreamOwnedText(raw, 'zh-CN'), raw, raw);
}
