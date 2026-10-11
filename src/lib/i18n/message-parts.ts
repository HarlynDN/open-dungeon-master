// Interpolate once. Values may be UI nodes or authored strings containing
// braces; they never become another template or interpreted HTML.
export function messageParts<T>(template: string, values: Record<string, T>): Array<string | T> {
  const out: Array<string | T> = [];
  let from = 0;
  for (const match of template.matchAll(/\{([a-zA-Z]\w*)\}/g)) {
    if (match.index > from) out.push(template.slice(from, match.index));
    out.push(Object.hasOwn(values, match[1]) ? values[match[1]] : match[0]);
    from = match.index + match[0].length;
  }
  if (from < template.length) out.push(template.slice(from));
  return out;
}
