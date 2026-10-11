"use client";

import { Fragment, type ReactNode } from "react";
import { useLocale } from "./LocaleProvider";
import { messageTemplate, type MessageKey } from "./translator";
import { messageParts } from "./message-parts";

// Complete sentences can put interactive terms wherever each locale needs
// them, without translating a rule ID or parsing an HTML string.
export function LocalizedText({ message, values }: {
  message: MessageKey; values: Record<string, ReactNode>;
}) {
  const { locale } = useLocale();
  return messageParts(messageTemplate(locale, message), values).map((part, index) => <Fragment key={index}>{part}</Fragment>);
}
