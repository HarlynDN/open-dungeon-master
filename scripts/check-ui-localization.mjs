import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { createHash } from "node:crypto";
import { parseUiSource, uiLiterals, translationKeys, uiModuleSpecifier } from "./lib/ui-localization.mjs";
import { MESSAGE_CATALOGS } from "../src/lib/i18n/messages.ts";
import { GENRE_PRESETS } from "../src/lib/genres.ts";
import { genreLabel } from "../src/lib/i18n/settings.ts";
import { LOBBY_BLOCKER_MESSAGES } from "../src/lib/dm/viewer.ts";
import { STAGES } from "../src/lib/dm/stages.ts";
import { DELEGATIONS, DELEGATION_LABELS, DELEGATION_HINTS } from "../src/lib/dm/delegation.ts";
import { register } from "node:module";
import { WORLD_LORE_CATEGORIES, LORE_STYLES } from "../src/lib/dm/world-lore-logic.ts";
import { FLOOR_VOICE_LABELS, TRANSMIT_BLOCK_LABELS } from "../src/lib/voice/turn-logic.ts";
import { micBlockMessage } from "../src/lib/secure-context.ts";
import { VOICE_FLOOR_KEYS, VOICE_BLOCK_KEYS } from "../src/lib/i18n/voice-presentations.ts";
import { AGENT_SCOPE_CHOICES, THEME_CHOICES } from "../src/lib/i18n/account-metadata.ts";
import { AGENT_PROGRAMS, agentSetupLine } from "../src/lib/agents/setup-line.ts";
import { DICE_LOOK_PRESETS, DICE_TEXTURES, DICE_MATERIALS } from "../src/lib/dice/dice-look.ts";
import { TTS_VOICES } from "../src/lib/tts-voices.ts";
import { CLASS_OPTION_MATERIAL } from "../src/lib/i18n/class-option-metadata.ts";
import { NATIVE_FEATURE_MATERIAL, NATIVE_FEAT_MATERIAL } from "../src/lib/i18n/feature-material-metadata.ts";
import { HELP_TOPICS, HELP_TOURS } from "../src/lib/i18n/app-help-metadata.ts";
import { COMPOSER_GATE_SOURCE } from "../src/lib/i18n/composer-gate-metadata.ts";
import { DM_TOUR, PLAYER_TOUR } from "../src/lib/tours/table.ts";
import { BOOK_HEADERS, BOOK_TEXT_KEYS } from "../src/lib/i18n/book-ui-metadata.ts";
import { WORKSHOP_GUIDES } from "../src/lib/tours/workshop-guide.ts";
import { SHELF_TOUR } from "../src/lib/tours/workshop.ts";
import { CHARACTER_SUBCLASS_METADATA } from "../src/lib/i18n/character-subclass-metadata.ts";

// Calendar normalization shares pure helpers through the project alias.
register("./lib/register-alias.mjs", import.meta.url);
const { CALENDAR_PRESETS, DAY_PARTS, SEASONS } = await import("../src/lib/dm/calendar.ts");

const root = fileURLToPath(new URL("../", import.meta.url));
const manifestFile = path.join(root, "docs/validation/ui-localization.json");
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const args = new Set(process.argv.slice(2));
const imports = new Set();
function reachable(file) {
  // A shared component used by the main journey belongs to that journey,
  // even if its source directory also contains deferred standalone pages.
  // Route links do not add entrypoints; deep editors remain out of scope.
  if (imports.has(file)) return;
  imports.add(file);
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const ast = parseUiSource(file, source);
  const visit = node => {
    const specifier = uiModuleSpecifier(node);
    if (specifier !== null) {
      const base = specifier.startsWith("@/") ? `src/${specifier.slice(2)}`
        : specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)) : null;
      if (base && (base.startsWith("src/app/") && !base.startsWith("src/app/api/") || base.startsWith("src/components/"))) {
        const target = [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`]
          .find(candidate => fs.existsSync(path.join(root, candidate)) && /\.tsx?$/.test(candidate));
        if (target) reachable(target);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
}
manifest.entrypoints.forEach(reachable);
manifest.additionalSources.forEach(reachable);
const known = new Map(manifest.files.map(entry => [entry.path, entry]));
if (args.has("--sync")) {
  manifest.files = [...imports].sort().map(file => known.get(file) ?? { path: file, state: "pending" });
  fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`UI manifest synchronized: ${manifest.files.length} files. New sources remain pending.`);
  process.exit(0);
}
const problems = [];
const nativeBook = JSON.parse(fs.readFileSync(path.join(root, "src/lib/rulebook/srd-5.1.json"), "utf8"));
for (const [kind, rows] of [["part", nativeBook.parts], ["chapter", nativeBook.chapters]]) for (const row of rows) {
  for (const field of ["title", "blurb"]) if (BOOK_HEADERS[`${kind}:${row.id}`]?.[field] !== row[field] || MESSAGE_CATALOGS.en[`bookUi.${kind}.${row.id}.${field}`] !== row[field]) problems.push(`Rulebook navigation source changed: ${kind}.${row.id}.${field}`);
}

// These are project-written bridge/quick-link captions, not deferred SRD prose.
for (const [file, field] of [["src/lib/rulebook/crosswalk.ts", "where"], ["src/lib/rulebook/book.ts", "label"]]) {
  const ast = parseUiSource(file, fs.readFileSync(path.join(root, file), "utf8"));
  function nativeCaption(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(ast) === field && ts.isStringLiteral(node.initializer) && !Object.hasOwn(BOOK_TEXT_KEYS, node.initializer.text)) problems.push(`Rulebook native caption changed: ${node.initializer.text}`);
    ts.forEachChild(node, nativeCaption);
  }
  nativeCaption(ast);
}

for (const [kind, steps] of [["player", PLAYER_TOUR], ["dm", DM_TOUR]]) for (const step of steps) for (const field of ["title", "body"]) {
  if (MESSAGE_CATALOGS.en[`playReviewUi.tour.${kind}.${step.id}.${field}`] !== step[field]) problems.push(`Table tour source changed: ${kind}.${step.id}.${field}`);
}
for (const [phase, source] of Object.entries(COMPOSER_GATE_SOURCE)) {
  if (MESSAGE_CATALOGS.en[`composeUi.placeholder.${phase}`] !== source) problems.push(`Composer gate source changed: ${phase}`);
}
for (const guide of WORKSHOP_GUIDES) {
  const prefix = `workshopHelp.guide.${guide.id}`;
  for (const [field, source] of [["title", guide.title], ["purpose", guide.purpose], ...guide.steps.map((value, i) => [`step.${i}`, value]), ...guide.tips.map((value, i) => [`tip.${i}`, value])]) {
    if (MESSAGE_CATALOGS.en[`${prefix}.${field}`] !== source) problems.push(`Workshop guide source changed: ${prefix}.${field}`);
  }
}
for (const step of SHELF_TOUR) for (const field of ["title", "body"]) {
  if (MESSAGE_CATALOGS.en[`entryHub.tour.${step.id}.${field}`] !== step[field]) problems.push(`Workshop shelf tour source changed: ${step.id}.${field}`);
}

// Story edit refusals are rendered from English protocol text. New/reworded
// native refusals need an explicit display translation before this owner stays
// covered; count limits use the parameterized frame instead of a fixed number.
const arcEditFile = "src/lib/dm/arc-edit-logic.ts";
const arcEditAst = parseUiSource(arcEditFile, fs.readFileSync(path.join(root, arcEditFile), "utf8"));
const arcErrorSource = Object.entries(MESSAGE_CATALOGS.en).filter(([key]) => key.startsWith("storyUi.error.")).map(([, text]) => text);
function collectArcErrors(node) {
  if (ts.isPropertyAssignment(node) && node.name.getText(arcEditAst) === "error") {
    const source = node.initializer;
    const frame = ts.isStringLiteral(source) ? source.text : ts.isTemplateExpression(source) && source.templateSpans.length === 1 ? `${source.head.text}{count}${source.templateSpans[0].literal.text}` : null;
    if (!frame || !arcErrorSource.includes(frame)) problems.push(`Unreviewed native arc edit refusal: ${frame ?? source.getText(arcEditAst)}`);
  }
  ts.forEachChild(node, collectArcErrors);
}
collectArcErrors(arcEditAst);
const entityReviewFile = "src/lib/dm/entity-review-logic.ts";
const entityReviewAst = parseUiSource(entityReviewFile, fs.readFileSync(path.join(root, entityReviewFile), "utf8"));
const entityErrorSource = Object.entries(MESSAGE_CATALOGS.en).filter(([key]) => key.startsWith("storyControl.error.")).map(([, text]) => text);
function collectEntityErrors(node) {
  if (ts.isPropertyAssignment(node) && node.name.getText(entityReviewAst) === "error" && ts.isStringLiteral(node.initializer) && !entityErrorSource.includes(node.initializer.text)) problems.push(`Unreviewed NPC review refusal: ${node.initializer.text}`);
  ts.forEachChild(node, collectEntityErrors);
}
collectEntityErrors(entityReviewAst);
// Small source bindings support the lazy help scope without downloading a
// second complete language. Reject stale topic/tour bindings on source edits.
for (const topic of HELP_TOPICS) if (MESSAGE_CATALOGS.en[topic.key] !== topic.canonical) problems.push(`Help topic source changed: ${topic.canonical}`);
const sessionFile = "src/app/campaigns/[campaignId]/SessionView.tsx";
const sessionAst = parseUiSource(sessionFile, fs.readFileSync(path.join(root, sessionFile), "utf8"));
const nativeTours = [];
function collectTours(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const properties = new Map(node.properties.filter(ts.isPropertyAssignment).map(property => [property.name.getText(sessionAst), property.initializer]));
    if (properties.has("onStart") && ts.isStringLiteral(properties.get("label") ?? sessionAst) && ts.isStringLiteral(properties.get("detail") ?? sessionAst)) nativeTours.push({ label: properties.get("label").text, detail: properties.get("detail").text });
    if (properties.has("onStart") && !properties.has("label") && !properties.has("detail")) for (const property of node.properties) {
      if (!ts.isSpreadAssignment(property) || !ts.isElementAccessExpression(property.expression)) continue;
      const spread = property.expression;
      if (spread.expression.getText(sessionAst) !== "HELP_TOURS" || !spread.argumentExpression || !ts.isNumericLiteral(spread.argumentExpression)) continue;
      const row = HELP_TOURS[Number(spread.argumentExpression.text)];
      if (row) nativeTours.push({ label: row.label, detail: row.detail });
    }
  }
  ts.forEachChild(node, collectTours);
}
collectTours(sessionAst);
if (nativeTours.length !== HELP_TOURS.length) problems.push("Help tour count changed; review its localized label/detail bindings.");
for (const native of nativeTours) {
  const row = HELP_TOURS.find(row => row.label === native.label && row.detail === native.detail);
  if (!row || MESSAGE_CATALOGS.en[row.labelKey] !== native.label || MESSAGE_CATALOGS.en[row.detailKey] !== native.detail) problems.push(`Unreviewed help tour: ${native.label}`);
}
// These player-facing summaries are reviewed against the exact bundled source.
// Added/edited options cannot silently fall back to English in Chinese play.
const nativeOptions = JSON.parse(fs.readFileSync(path.join(root, "src/lib/srd/options.json"), "utf8")).options;
if (CLASS_OPTION_MATERIAL.length !== nativeOptions.length) problems.push("Native option material count changed; review the new/removed rows.");
for (const native of nativeOptions) {
  const matches = CLASS_OPTION_MATERIAL.filter(row => row.kind === native.k && row.name === native.n);
  const row = matches[0];
  if (matches.length !== 1 || MESSAGE_CATALOGS.en[row?.nameKey] !== native.n || MESSAGE_CATALOGS.en[row?.descriptionKey] !== native.d || (row?.requirementKey ? MESSAGE_CATALOGS.en[row.requirementKey] : row?.emptyRequirement ? "" : undefined) !== native.req) problems.push(`Unreviewed native option material: ${native.k}/${native.n}`);
}

// Whole-source bindings for owned summaries; names alone cannot certify that
// a changed mechanic or added prerequisite has a current translation.
const featureSource = JSON.parse(fs.readFileSync(path.join(root, "src/lib/help/srd-features.json"), "utf8"));
const featureRows = [
  ...Object.entries(featureSource.features).map(([name, description]) => ({ name, description })),
  ...Object.entries(featureSource.byClass).flatMap(([classId, rows]) => Object.entries(rows).map(([name, description]) => ({ classId, name, description }))),
];
if (NATIVE_FEATURE_MATERIAL.length !== featureRows.length) problems.push("Native feature material count changed; review the new/removed rows.");
for (const native of featureRows) {
  const matches = NATIVE_FEATURE_MATERIAL.filter(row => row.name === native.name && row.classId === native.classId);
  const row = matches[0];
  if (matches.length !== 1 || MESSAGE_CATALOGS.en[row?.nameKey] !== native.name || MESSAGE_CATALOGS.en[row?.descriptionKey] !== native.description) problems.push(`Unreviewed native feature summary: ${native.classId ?? "shared"}/${native.name}`);
}
const featRows = JSON.parse(fs.readFileSync(path.join(root, "src/lib/srd/authored-feats.json"), "utf8")).feats;
if (NATIVE_FEAT_MATERIAL.length !== featRows.length) problems.push("Native feat material count changed; review the new/removed rows.");
for (const native of featRows) {
  const matches = NATIVE_FEAT_MATERIAL.filter(row => row.name === native.name);
  const row = matches[0];
  if (matches.length !== 1 || MESSAGE_CATALOGS.en[row?.descriptionKey] !== native.desc || (row?.prerequisiteKey ? MESSAGE_CATALOGS.en[row.prerequisiteKey] : row?.emptyPrerequisite ? "" : undefined) !== native.prerequisite) problems.push(`Unreviewed native feat summary: ${native.name}`);
}

// Native condition material renders indirectly from server-projected metadata.
// A new/changed registry row must be compared before its covered board surface
// can silently fall back to an old translation.
const conditionReview = JSON.parse(fs.readFileSync(path.join(root, "docs/validation/condition-material-translations.json"), "utf8"));
for (const [file, expected] of Object.entries({ ...conditionReview.sourceSha256, ...conditionReview.catalogSha256 })) {
  const current = createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");
  if (current !== expected) problems.push(`Condition material ${file}: review the changed source/translation before refreshing its fingerprint.`);
}
// Presets render through indirect tables, so the JSX audit cannot find a
// changed English source. Require a fresh translation comparison when the
// repository-authored source behind a translated card changes.
const genreReview = JSON.parse(fs.readFileSync(path.join(root, "docs/validation/genre-translations.json"), "utf8"));
const sourceFields = ["name", "blurb", "dmFlavor", "mapStyle", "raceHint", "nameHints", "defaultTheme", "climate"];
for (const preset of GENRE_PRESETS) {
  const review = genreReview.entries.find(entry => entry.id === preset.id);
  const hash = createHash("sha256").update(JSON.stringify(Object.fromEntries(sourceFields.map(field => [field, preset[field]])))).digest("hex");
  if (!review || review.sourceHash !== hash || review.review !== "source-compared") {
    problems.push(`Genre ${preset.id}: translation needs a comparison against its current source; refresh its review record only after reviewing the translation.`);
  }
  if (genreLabel(preset.id, "en") !== preset.name) problems.push(`Genre ${preset.id}: English display name differs from its source.`);
}
// Indirect label tables and database-seeded presets are not JSX literals.
// Compare their current authored source too, so editing an English stock
// description cannot quietly make a covered Chinese surface fall back.
function literalRows(file, variable) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const ast = parseUiSource(file, source);
  let rows = null;
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === variable && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      rows = node.initializer.elements.map(element => {
        if (!ts.isObjectLiteralExpression(element)) return {};
        return Object.fromEntries(element.properties.flatMap(property =>
          ts.isPropertyAssignment(property) && ts.isStringLiteralLike(property.initializer)
            ? [[property.name.getText(ast).replace(/^["']|["']$/g, ""), property.initializer.text]] : [],
        ));
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  if (!rows) problems.push(`${file}: ${variable} source shape changed; update its translation source comparison.`);
  return rows ?? [];
}
for (const row of literalRows("src/lib/i18n/variant-metadata.ts", "VARIANT_TOGGLES")) {
  for (const field of ["label", "tip"]) {
    if (!row[field] || MESSAGE_CATALOGS.en[`variant.${row.key}.${field}`] !== row[field]) {
      problems.push(`Variant rule ${row.key}: ${field} translation needs comparison against its current source.`);
    }
  }
}
const stockNames = Object.keys(MESSAGE_CATALOGS.en).filter(key => /^personality\.\w+\.name$/.test(key));
const stockRows = literalRows("src/lib/dm/personalities.ts", "STOCK");
if (stockNames.length !== stockRows.length) problems.push("Stock DM personalities changed; review all preset translations.");
for (const row of stockRows) {
  const key = stockNames.find(key => MESSAGE_CATALOGS.en[key] === row.name);
  if (!key || MESSAGE_CATALOGS.en[key.replace(/\.name$/, ".blurb")] !== row.blurb) {
    problems.push(`DM personality ${row.name}: translation needs comparison against its current source.`);
  }
}
for (const [reason, english] of Object.entries(LOBBY_BLOCKER_MESSAGES)) {
  if (MESSAGE_CATALOGS.en[`lobby.blocker.${reason}`] !== english) problems.push(`Lobby blocker ${reason}: translation needs comparison against its current source.`);
}
for (const [namespace, rows, fields] of [
  ["stage", STAGES, ["label", "description", "cost"]],
  ["delegation", DELEGATIONS.map(id => ({ id, label: DELEGATION_LABELS[id], hint: DELEGATION_HINTS[id] })), ["label", "hint"]],
]) {
  const keys = Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith(`${namespace}.`) && key.endsWith(`.${fields[0]}`));
  if (keys.length !== rows.length) problems.push(`${namespace} metadata changed; review its display translations.`);
  for (const row of rows) for (const field of fields) {
    if (MESSAGE_CATALOGS.en[`${namespace}.${row.id}.${field}`] !== row[field]) problems.push(`${namespace} ${row.id}: ${field} needs comparison against its current source.`);
  }
}
const voiceKeys = Object.keys(MESSAGE_CATALOGS.en).filter(key => /^voicePicker\.[ab][fm]_/.test(key));
if (voiceKeys.length !== TTS_VOICES.length) problems.push("Stock TTS voices changed; review all display translations.");
for (const voice of TTS_VOICES) {
  if (MESSAGE_CATALOGS.en[`voicePicker.${voice.id}`] !== voice.label) problems.push(`Voice ${voice.id}: label needs comparison against its current source.`);
}
// Account/appearance display metadata never changes the machine identifiers.
for (const [namespace, rows] of [["preset", DICE_LOOK_PRESETS], ["texture", DICE_TEXTURES], ["material", DICE_MATERIALS]]) {
  if (Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith(`diceLook.${namespace}.`)).length !== rows.length) problems.push(`Dice ${namespace}: metadata changed; review its translations.`);
  for (const row of rows) if (MESSAGE_CATALOGS.en[`diceLook.${namespace}.${row.id}`] !== row.label) problems.push(`Dice ${namespace} ${row.id}: translation differs from source.`);
}
for (const row of THEME_CHOICES) if (MESSAGE_CATALOGS.en[`appearance.${row.id}`] !== row.label) problems.push(`Appearance ${row.id}: translation differs from source.`);
const scopeSource = fs.readFileSync(path.join(root, "src/lib/agents/grants.ts"), "utf8").match(/AGENT_SCOPES = (\[[^\]]+\])/);
if (!scopeSource || JSON.stringify(JSON.parse(scopeSource[1])) !== JSON.stringify(AGENT_SCOPE_CHOICES.map(row => row.id))) problems.push("Agent scopes changed; review their UI labels and permissions.");
if (Object.keys(MESSAGE_CATALOGS.en).filter(key => /^agents\.scope\..*\.label$/.test(key)).length !== AGENT_SCOPE_CHOICES.length) problems.push("Agent scope metadata changed; review all display translations.");
for (const scope of AGENT_SCOPE_CHOICES) for (const field of ["label", "hint"]) if (MESSAGE_CATALOGS.en[`agents.scope.${scope.id}.${field}`] !== scope[field]) problems.push(`Agent ${scope.id} ${field}: translation differs from source.`);
if (Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith("agents.program.")).length !== AGENT_PROGRAMS.length) problems.push("Agent program metadata changed; review its display translations.");
for (const program of AGENT_PROGRAMS) {
  if (MESSAGE_CATALOGS.en[`agents.program.${program.value}`] !== program.label || MESSAGE_CATALOGS.en[`agents.setup.${program.value}`] !== agentSetupLine(program.value, "", "").where) problems.push(`Agent program ${program.value}: review its instructions against source.`);
}
// The engine keeps its English floor/diagnostic labels. UI projections must
// be re-reviewed if their source changes, including the stock table name.
for (const [labels, keys] of [[FLOOR_VOICE_LABELS, VOICE_FLOOR_KEYS], [TRANSMIT_BLOCK_LABELS, VOICE_BLOCK_KEYS]]) {
  if (Object.keys(labels).length !== Object.keys(keys).length) problems.push("Voice floor metadata changed; review its translations.");
  for (const [id, label] of Object.entries(labels)) if (MESSAGE_CATALOGS.en[keys[id]] !== label) problems.push(`Voice ${id}: translation differs from its engine source.`);
}
for (const [reason, key] of [["insecure", "voice.micInsecure"], ["unsupported", "voice.micUnsupported"]]) {
  if (MESSAGE_CATALOGS.en[key] !== micBlockMessage(reason)) problems.push(`Microphone ${reason}: translation differs from its source.`);
}
const voiceRoomSource = fs.readFileSync(path.join(root, "src/lib/voice/room.ts"), "utf8");
const voiceStateSource = fs.readFileSync(path.join(root, "src/app/api/campaigns/[campaignId]/voice/route.ts"), "utf8");
if (!voiceRoomSource.includes('TABLE_CHANNEL_ID = "table"') || !voiceRoomSource.includes(`TABLE_CHANNEL_NAME = "${MESSAGE_CATALOGS.en["voice.table"]}"`)) problems.push("Stock voice table changed; review its display projection.");
if (!voiceStateSource.includes(JSON.stringify(MESSAGE_CATALOGS.en["voice.unroutableWarning"]))) problems.push("Voice route warning changed; review its translation.");
// In-world names are authored data unless they exactly match built-ins.
// Check both the values and the total metadata set behind the projections.
const calendarMetadata = {};
for (const preset of CALENDAR_PRESETS) {
  calendarMetadata[`calendar.preset.${preset.id}`] = preset.name;
  preset.months.forEach((month, index) => { calendarMetadata[`calendar.${preset.id}.month.${index + 1}`] = month.name; });
  preset.weekdays.forEach((day, index) => { calendarMetadata[`calendar.${preset.id}.weekday.${index + 1}`] = day; });
}
DAY_PARTS.forEach(part => { calendarMetadata[`calendar.part.${part}`] = part; });
SEASONS.forEach(season => { calendarMetadata[`calendar.season.${season}`] = season; });
const calendarKeys = Object.keys(MESSAGE_CATALOGS.en).filter(key => /^calendar\.(?:preset\.|(?:seasons|generic|daycount)\.(?:month|weekday)\.|part\.|season\.)/.test(key));
if (calendarKeys.length !== Object.keys(calendarMetadata).length) problems.push("Calendar metadata changed; review built-in calendar translations.");
for (const [key, value] of Object.entries(calendarMetadata)) {
  if (MESSAGE_CATALOGS.en[key] !== value) problems.push(`${key}: translation needs comparison against current calendar metadata.`);
}
const categoryLabels = fs.readFileSync(path.join(root, "src/app/workshop/lore/types.ts"), "utf8");
const categoryAst = parseUiSource("types.ts", categoryLabels);
let categories = {};
const readCategories = node => {
  if (ts.isVariableDeclaration(node) && node.name.getText(categoryAst) === "CATEGORY_LABELS" && ts.isObjectLiteralExpression(node.initializer)) {
    categories = Object.fromEntries(node.initializer.properties.map(property => [property.name.getText(categoryAst), property.initializer.text]));
  }
  ts.forEachChild(node, readCategories);
};
readCategories(categoryAst);
for (const [namespace, ids] of [["lore.category", WORLD_LORE_CATEGORIES], ["lore.style", LORE_STYLES]]) {
  if (Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith(`${namespace}.`)).length !== ids.length) problems.push(`${namespace}: option set changed; review translations.`);
  for (const id of ids) {
    if (!MESSAGE_CATALOGS.en[`${namespace}.${id}`] || (namespace === "lore.category" && MESSAGE_CATALOGS.en[`${namespace}.${id}`] !== categories[id])) problems.push(`${namespace}.${id}: display metadata needs review.`);
  }
}

// Only names are covered here, not the much larger class/race descriptions.
// Fail on added or renamed built-ins, rather than silently falling back on
// a previously reviewed Chinese party row.
for (const [kind, collection] of [["class", "classes"], ["race", "races"], ["background", "backgrounds"]]) {
  const rows = JSON.parse(fs.readFileSync(path.join(root, `src/lib/srd/${collection}.json`), "utf8"))[collection];
  const names = Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith(`rule.${kind}.`));
  if (names.length !== rows.length) problems.push(`Built-in ${collection}: name list changed; review all display translations.`);
  for (const row of rows) {
    if (MESSAGE_CATALOGS.en[`rule.${kind}.${row.id}`] !== row.name) problems.push(`Built-in ${kind} ${row.id}: display translation needs comparison against its current source.`);
  }
}
const baseSubclassRows = JSON.parse(fs.readFileSync(path.join(root, "src/lib/srd/class-features.json"), "utf8")).classes;
const authoredSubclassRows = JSON.parse(fs.readFileSync(path.join(root, "src/lib/srd/subclasses.json"), "utf8")).classes;
const subclassCount = Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith("rule.subclass.")).length;
let currentSubclassCount = 0;
for (const classId of new Set([...Object.keys(baseSubclassRows), ...Object.keys(authoredSubclassRows), ...Object.keys(CHARACTER_SUBCLASS_METADATA)])) {
  const source = [...(baseSubclassRows[classId]?.subclasses ?? []), ...(authoredSubclassRows[classId] ?? [])];
  currentSubclassCount += source.length;
  const reviewed = CHARACTER_SUBCLASS_METADATA[classId] ?? [];
  if (JSON.stringify(source.map(row => ({ name: row.name, aliases: row.aliases ?? [] }))) !== JSON.stringify(reviewed.map(row => ({ name: row.name, aliases: [...row.aliases] })))) problems.push(`Built-in ${classId} subclasses changed; review names and exact aliases.`);
  for (const row of reviewed) if (MESSAGE_CATALOGS.en[row.key] !== row.name) problems.push(`Subclass ${classId}/${row.name}: English display differs from its source.`);
}
if (subclassCount !== currentSubclassCount) problems.push("Subclass display catalog has missing or extra source rows.");
const currentSkills = JSON.parse(fs.readFileSync(path.join(root, "src/lib/srd/skills.json"), "utf8")).skills;
if (Object.keys(MESSAGE_CATALOGS.en).filter(key => key.startsWith("sheet.skill.")).length !== currentSkills.length) problems.push("Skill list changed; review sheet labels.");
for (const row of currentSkills) if (MESSAGE_CATALOGS.en[`sheet.skill.${row.id}`] !== row.name) problems.push(`Skill ${row.id}: display label differs from the current source.`);
for (const file of imports) if (!known.has(file)) problems.push(`Unlisted main-flow UI source: ${file}. Run npm run i18n:inventory -- --sync, then review its scope.`);
for (const file of known.keys()) if (!imports.has(file)) problems.push(`Stale UI manifest entry: ${file}. Review scope before removing it.`);
const expectedKeys = new Set(Object.keys(MESSAGE_CATALOGS.en));
// Locales may repeat a parameter a different number of times. Require the
// same available parameter names, without imposing English sentence grammar.
const placeholders = value => [...new Set([...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]))].sort().join(",");
for (const [locale, catalog] of Object.entries(MESSAGE_CATALOGS)) {
  if (Object.keys(catalog).length !== expectedKeys.size) problems.push(`${locale}: dictionary key count differs.`);
  for (const key of expectedKeys) {
    if (!catalog[key]?.trim()) problems.push(`${locale}: missing ${key}`);
    else if (placeholders(catalog[key]) !== placeholders(MESSAGE_CATALOGS.en[key])) problems.push(`${locale}: placeholder mismatch for ${key}`);
  }
}
let literalCount = 0;
const inventory = [];
for (const entry of manifest.files) {
  const source = fs.readFileSync(path.join(root, entry.path), "utf8");
  const literals = uiLiterals(entry.path, source, manifest.invariantText, expectedKeys);
  literalCount += literals.length;
  if (args.has("--inventory")) inventory.push({ ...entry, literals });
  if (entry.state === "covered") {
    problems.push(...literals.map(item => `${item.file}:${item.line}:${item.column}: ${item.kind}: ${item.text}`));
  } else if (args.has("--final")) problems.push(`${entry.path}: main-flow UI still pending.`);
  for (const key of translationKeys(entry.path, source)) if (!expectedKeys.has(key)) problems.push(`${entry.path}: unknown translation key ${key}`);
}
if (args.has("--inventory")) {
  const output = path.join(root, "docs/validation/ui-localization-inventory.json");
  fs.writeFileSync(output, `${JSON.stringify({ note: "Syntax inventory only; dynamic server errors, content and accessibility need manual review before covered status.", files: inventory }, null, 2)}\n`);
}
console.log(`UI localization: ${manifest.files.filter(entry => entry.state === "covered").length}/${manifest.files.length} covered, ${literalCount} pending literal sites, ${expectedKeys.size} keys.`);
if (problems.length) { console.error(problems.join("\n")); process.exitCode = 1; }
