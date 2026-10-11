import ts from "typescript";

const TEXT_FIELDS = new Set([
  "title", "label", "description", "hint", "help", "text", "message", "question",
  "placeholder", "alt", "aria-label", "aria-description", "content", "emptyLabel",
  "submitLabel", "confirmLabel", "cancelLabel", "loadingLabel", "tooltip",
]);
const TEXT_CALLS = /^(?:set\w*(?:Error|Warning|Notice)|appConfirm|appNotice|toast|notify)$/;
const hasLetters = text => /\p{L}/u.test(text.replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " "));
const normalized = text => text.replace(/\s+/g, " ").trim();

export function parseUiSource(file, source) {
  return ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

// Audit the syntax that actually displays prose. Strings such as routes,
// classes, protocol enums and icon keys are not UI translations. Dynamic
// server text/content still requires the separate manual coverage gate.
export function uiLiterals(file, source, allowed = [], messageKeys = new Set()) {
  const ast = parseUiSource(file, source);
  const exempt = new Set(allowed);
  const found = new Map();
  const add = (node, value, kind) => {
    const text = normalized(value);
    if ((kind === "UI notice" || kind === "LocalizedText message key") && messageKeys.has(text)) return;
    if (!hasLetters(text) || exempt.has(text)) return;
    const position = ast.getLineAndCharacterOfPosition(node.getStart(ast));
    found.set(node.pos, { file, line: position.line + 1, column: position.character + 1, kind, text });
  };
  const parts = (node, kind) => {
    if (!node) return;
    // Translation calls can contain keys and invariant placeholders.
    if (ts.isCallExpression(node)) return;
    if (ts.isStringLiteralLike(node)) { add(node, node.text, kind); return; }
    if (ts.isTemplateExpression(node)) {
      add(node.head, node.head.text, kind);
      node.templateSpans.forEach(span => { parts(span.expression, kind); add(span.literal, span.literal.text, kind); });
      return;
    }
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) return;
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) return;
    if (ts.isConditionalExpression(node)) {
      parts(node.whenTrue, kind); parts(node.whenFalse, kind); return;
    }
    if (ts.isBinaryExpression(node)) {
      // Comparisons select behavior; only concatenations/coalescing render.
      if ([ts.SyntaxKind.PlusToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken].includes(node.operatorToken.kind)) {
        parts(node.left, kind); parts(node.right, kind);
      }
      return;
    }
    if (ts.isObjectLiteralExpression(node)) return;
    ts.forEachChild(node, child => parts(child, kind));
  };
  const visit = node => {
    if (ts.isJsxText(node)) add(node, node.text, "JSX text");
    if (ts.isJsxExpression(node) && !ts.isJsxAttribute(node.parent)) parts(node.expression, "rendered expression");
    if (ts.isJsxAttribute(node) && TEXT_FIELDS.has(node.name.getText(ast))) {
      const isRichKey = node.name.getText(ast) === "message"
        && node.parent.parent.tagName.getText(ast) === "LocalizedText";
      parts(node.initializer, isRichKey ? "LocalizedText message key" : `attribute ${node.name.getText(ast)}`);
    }
    if (ts.isPropertyAssignment(node) && TEXT_FIELDS.has(node.name.getText(ast).replace(/^["']|["']$/g, ""))) {
      parts(node.initializer, `display property ${node.name.getText(ast)}`);
    }
    if (ts.isParameter(node) && TEXT_FIELDS.has(node.name.getText(ast))) parts(node.initializer, "default display prop");
    if (ts.isVariableDeclaration(node) && TEXT_FIELDS.has(node.name.getText(ast))) parts(node.initializer, "display variable");
    if (ts.isCallExpression(node) && TEXT_CALLS.test(node.expression.getText(ast).split(".").at(-1))) {
      node.arguments.forEach(argument => parts(argument, "UI notice"));
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return [...found.values()].sort((a, b) => a.line - b.line || a.column - b.column);
}

export function translationKeys(file, source) {
  const ast = parseUiSource(file, source);
  const keys = [];
  const collect = value => {
    if (!value) return;
    if (ts.isStringLiteralLike(value)) keys.push(value.text);
    else if (ts.isJsxExpression(value)) collect(value.expression);
    else if (ts.isConditionalExpression(value)) { collect(value.whenTrue); collect(value.whenFalse); }
  };
  const visit = node => {
    if (ts.isCallExpression(node) && /^(?:t|.*\.t)$/.test(node.expression.getText(ast))) {
      collect(node.arguments[0]);
    }
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "messageKey" && node.initializer && ts.isStringLiteral(node.initializer)) keys.push(node.initializer.text);
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "message"
      && node.parent.parent.tagName.getText(ast) === "LocalizedText") collect(node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return keys;
}

// Static module references, including lazy(() => import("...")) and Next
// dynamic imports. Computed paths are deliberately not guessed.
export function uiModuleSpecifier(node) {
  if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier)) return node.moduleSpecifier.text;
  if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length >= 1 && ts.isStringLiteralLike(node.arguments[0])) return node.arguments[0].text;
  return null;
}
