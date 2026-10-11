"use client";

import { Fragment, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/translator";

// Named slots let each language order links/emphasis naturally. Everything
// is a React node; no HTML from dictionaries or server text is executed.
export function TranslatedText({ messageKey, values }: {
  messageKey: MessageKey;
  values: Record<string, ReactNode>;
}) {
  const { t } = useLocale();
  const placeholders = Object.fromEntries(Object.keys(values).map(key => [key, `{${key}}`]));
  const parts = t(messageKey, placeholders).split(/(\{\w+\})/g);
  return parts.map((part, index) => <Fragment key={index}>{/^\{\w+\}$/.test(part) ? values[part.slice(1, -1)] : part}</Fragment>);
}
