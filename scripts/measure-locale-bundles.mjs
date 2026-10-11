// Diagnostic production compilation of the LocaleProvider dependency graph.
// This is not a successful Next application build or a page download metric.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { gzipSync } from "node:zlib";
const require = createRequire(import.meta.url);
const { webpack } = require("next/dist/compiled/webpack/webpack");
const { minify } = require("next/dist/compiled/terser");
const root = path.resolve(import.meta.dirname, "..");
const before = process.argv[2];
if (!before) throw new Error("Usage: node scripts/measure-locale-bundles.mjs <pre-repair source directory>");
const output = fs.mkdtempSync(path.join(os.tmpdir(), "odm-locale-bundles-"));
const loader = path.join(output, "typescript-loader.cjs");
fs.writeFileSync(loader, `const ts = require(${JSON.stringify(require.resolve("typescript"))}); module.exports = function(source) {
  return ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX}}).outputText;
};`);
const results = {};
for (const [label, directory] of [["before", path.resolve(before)], ["after", root]]) {
  const out = path.join(output, label);
  const stats = await new Promise((resolve, reject) => {
    const compiler = webpack({ mode: "production", target: "web", context: directory,
      entry: path.join(directory, "src/lib/i18n/LocaleProvider.tsx"), optimization: { minimize: false },
      output: { path: out, filename: "locale.js", chunkFilename: "[id].js", library: { type: "commonjs2" } },
      externals: { react: "commonjs react", "react/jsx-runtime": "commonjs react/jsx-runtime" },
      resolve: { extensions: [".ts", ".tsx", ".js", ".json"], alias: { "@": path.join(directory, "src") }, modules: [path.join(root, "node_modules")] },
      module: { rules: [{ test: /\.tsx?$/, use: loader }] },
    });
    compiler.run((error, stats) => compiler.close(() => {
      if (error) reject(error);
      else if (stats.hasErrors()) reject(new Error(stats.toString({ all: false, errors: true })));
      else resolve(stats.toJson({ all: false, entrypoints: true, assets: true }));
    }));
  });
  const initial = new Set(stats.entrypoints.main.assets.map(asset => asset.name));
  const assets = await Promise.all(stats.assets.filter(asset => asset.name.endsWith(".js")).map(async asset => {
    const compiled = fs.readFileSync(path.join(out, asset.name), "utf8");
    const bytes = Buffer.from((await minify(compiled)).code);
    return { name: asset.name, initial: initial.has(asset.name), bytes: bytes.length, gzipBytes: gzipSync(bytes).length };
  }));
  results[label] = { initialBytes: assets.filter(a => a.initial).reduce((sum, a) => sum + a.bytes, 0),
    initialGzipBytes: assets.filter(a => a.initial).reduce((sum, a) => sum + a.gzipBytes, 0), assets };
}
const payloads = {};
for (const locale of ["en", "zh-CN"]) {
  for (const scope of ["ui", "content"]) {
    const locales = [...new Set(["en", locale])];
    const payload = Buffer.from(JSON.stringify(Object.fromEntries(locales.map(locale => [locale,
      JSON.parse(fs.readFileSync(path.join(root, `src/lib/i18n/resources/${locale}.${scope}.json`), "utf8")),
    ]))));
    payloads[`${locale}.${scope}`] = { jsonBytes: payload.length, gzipBytes: gzipSync(payload).length };
  }
}
const report = { method: "Next bundled webpack, production minification, isolated LocaleProvider graph; React external; JSON payloads exclude Flight/HTML framing", results, payloads };
fs.writeFileSync(path.join(root, "docs/validation/locale-bundle-measurement.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
