// Structured facts for new inbox entries. Old bodies and arbitrary extensions
// stay literal; this module imports no database or translation payload.
export const NOTIFICATION_FIELDS = {
  friendRequest: ["actor"], friendAccepted: ["actor"],
  friendInvite: ["actor", "campaign", "roomCode"],
  reportDm: ["actor", "campaign"], reportPlayer: ["actor", "campaign"],
  sessionScheduled: ["campaign", "session", "startsAt"],
  sessionUpdated: ["campaign", "session", "startsAt"],
  sessionCancelled: ["campaign", "session", "startsAt"],
  rsvpNo: ["actor", "campaign", "session"],
  sessionSoon: ["campaign", "session", "startsAt"],
  sessionStarting: ["campaign", "session"], campaignIdle: ["campaign"],
} as const;
export type NotificationCode = keyof typeof NOTIFICATION_FIELDS;
export type NotificationPresentation = {
  [Code in NotificationCode]: { code: Code; params: Record<(typeof NOTIFICATION_FIELDS)[Code][number], string> }
}[NotificationCode];

export function parseNotificationPresentation(value: unknown): NotificationPresentation | undefined {
  if (!value || typeof value !== "object") return;
  const row = value as Record<string, unknown>;
  if (typeof row.code !== "string" || !Object.hasOwn(NOTIFICATION_FIELDS, row.code)
    || !row.params || typeof row.params !== "object") return;
  const code = row.code as NotificationCode;
  const params = row.params as Record<string, unknown>;
  const fields: readonly string[] = NOTIFICATION_FIELDS[code];
  if (fields.some(field => typeof params[field] !== "string")) return;
  if (fields.includes("startsAt") && !Number.isFinite(Date.parse(params.startsAt as string))) return;
  return { code, params: Object.fromEntries(fields.map(field => [field, params[field]])) } as NotificationPresentation;
}
