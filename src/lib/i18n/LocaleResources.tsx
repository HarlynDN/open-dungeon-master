"use client";
import type { LocaleCatalogs } from "./translator";
import { registerLocaleScope } from "./client-catalogs";

export function LocaleResources({ catalogs, children }: { catalogs: LocaleCatalogs; children: React.ReactNode }) {
  registerLocaleScope(catalogs, "content");
  return children;
}
