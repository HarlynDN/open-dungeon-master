// next/headers for route handlers called from a test script
// (register-routes.mjs): the signed-in caller arrives as the bearer token a
// native app would send, and there is never a cookie.
export async function headers() {
  const token = globalThis.__odmTestToken;
  return new Headers(token ? { authorization: `Bearer ${token}` } : {});
}

export async function cookies() {
  // Optional jar for auth-flow suites. Every other suite keeps the old
  // bearer-only behavior; no cookies survive outside that suite's globals.
  const jar = globalThis.__odmTestCookies;
  return {
    get: key => jar?.has(key) ? { name: key, value: jar.get(key) } : undefined,
    set: (key, value) => jar?.set(key, value),
    delete: key => jar?.delete(key),
  };
}
