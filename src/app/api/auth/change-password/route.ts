import { z } from "zod";
import {
  currentSessionTokenHash,
  currentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import {
  NO_PASSWORD_SENTINEL,
  deleteSessionsForUser,
  getUserByUsername,
  setUserPassword,
} from "@/lib/db/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const changeSchema = z.object({
  // Empty for a Discord-only account setting its first password; there is
  // nothing to verify against yet.
  currentPassword: z.string().max(100).optional(),
  newPassword: z.string().min(8).max(100),
});

// Changes the caller's password (also the only way out of the
// must_change_password gate after an admin reset). Every other session is
// revoked so a stolen cookie dies with the old password.
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Not logged in.", errorCode: "session_expired" }, { status: 401 });
  }
  const raw = await request.json().catch(() => ({}));
  const parsed = changeSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message || "Invalid input.", errorCode: "password_rules" },
      { status: 400 },
    );
  }

  const account = getUserByUsername(user.username);
  if (!account) {
    return Response.json({ error: "Not logged in.", errorCode: "session_expired" }, { status: 401 });
  }
  // A Discord-only account has no current password to verify: the
  // authenticated session is the proof, and setting one enables username
  // login here and in the apps.
  if (account.passwordHash !== NO_PASSWORD_SENTINEL) {
    if (!verifyPassword(parsed.data.currentPassword ?? "", account.passwordHash)) {
      return Response.json({ error: "Current password is wrong.", errorCode: "wrong_current_password" }, { status: 403 });
    }
  }

  setUserPassword(user.id, hashPassword(parsed.data.newPassword), false);
  const keep = await currentSessionTokenHash();
  deleteSessionsForUser(user.id, keep ?? undefined);
  return Response.json({ ok: true });
}
